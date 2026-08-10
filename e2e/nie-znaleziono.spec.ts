import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";

/**
 * B2 — strona 404 renderuje się WEWNĄTRZ layoutu języka: poprawny
 * html lang, Nawigacja + Stopka i komunikat z messages już w HTML-u
 * z serwera (pełny render bez JS), status HTTP 404. Dodatkowo axe:
 * zero błędów w trzech językach (ADR-002; progi CLAUDE.md).
 */
const PRZYPADKI = [
  { adres: "/nie-ma-takiej-strony", jezyk: "pl", komunikaty: pl },
  { adres: "/en/nie-ma-takiej-strony", jezyk: "en", komunikaty: en },
  { adres: "/de/nie-ma-takiej-strony", jezyk: "de", komunikaty: de },
] as const;

/** React escapuje apostrof w HTML-u (&#x27;) — normalizacja przed
 *  porównaniem z tekstem z messages (np. EN „doesn't"). */
const odkodujHtml = (html: string) => html.replace(/&#x27;|&#39;/g, "'");

for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
  test(`404 (${jezyk}): pełny HTML z serwera bez JS na ${adres}`, async ({
    request,
  }) => {
    // Surowa odpowiedź serwera — bez przeglądarki, więc bez wykonania
    // JS: wszystko poniżej musi być w HTML-u już z serwera.
    const odpowiedz = await request.get(adres);
    expect(odpowiedz.status(), "status HTTP 404").toBe(404);

    const html = odkodujHtml(await odpowiedz.text());

    // Render wewnątrz layoutu języka: poprawny lang na <html>.
    expect(html, "html lang zgodny z językiem").toContain(
      `<html lang="${jezyk}"`,
    );

    // Komunikat 404 z messages (nagłówek, treść, link do strony głównej).
    expect(html).toContain(komunikaty.NieZnaleziono.naglowek);
    expect(html).toContain(komunikaty.NieZnaleziono.wroc);
    expect(html).toContain(komunikaty.NieZnaleziono.stronaGlowna);

    // Nawigacja i stopka w HTML-u (K1 wokół treści 404).
    expect(html).toContain(komunikaty.Nawigacja.przejdzDoTresci);
    expect(html).toContain(komunikaty.Nawigacja.funkcje);
    expect(html).toContain(komunikaty.Nawigacja.logowanie);
    expect(html).toContain(komunikaty.Stopka.mapaStrony);
  });

  test(`404 (${jezyk}): axe zero błędów + lang na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);
    await expect(page.locator("html")).toHaveAttribute("lang", jezyk);
    const wyniki = await new AxeBuilder({ page }).analyze();
    expect(wyniki.violations).toEqual([]);
  });
}
