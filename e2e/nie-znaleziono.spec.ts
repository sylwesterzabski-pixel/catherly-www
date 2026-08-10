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
  // Nieistniejąca ścieżka POD prefiksem języka domyślnego — nie jest
  // kanonizowana redirectem, tylko dostaje pełne 404 jak pozostałe.
  { adres: "/pl/nie-ma-takiej-strony", jezyk: "pl", komunikaty: pl },
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

    // Komunikat 404 z messages (nagłówek, treść, link do strony głównej
    // — etykieta linku ze wspólnego klucza Wspolne.stronaGlowna).
    expect(html).toContain(komunikaty.NieZnaleziono.naglowek);
    expect(html).toContain(komunikaty.NieZnaleziono.wroc);
    expect(html).toContain(komunikaty.Wspolne.stronaGlowna);

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

/**
 * Kanonizacja prefiksu języka domyślnego (next-intl "as-needed"):
 * /pl z ISTNIEJĄCĄ ścieżką to NIE 404, tylko redirect na wersję
 * bez prefiksu (znalezisko adwersarza, runda 3 — N1).
 */
test("kanonizacja: /pl → redirect (3xx) na /", async ({ request }) => {
  const odpowiedz = await request.get("/pl", { maxRedirects: 0 });
  expect(odpowiedz.status(), "status 3xx").toBeGreaterThanOrEqual(300);
  expect(odpowiedz.status(), "status 3xx").toBeLessThan(400);
  const location = odpowiedz.headers()["location"];
  expect(location, "nagłówek Location obecny").toBeTruthy();
  expect(new URL(location, "http://localhost:3000").pathname).toBe("/");
});

test("kanonizacja: /pl/ → docelowo / ze statusem 200", async ({ page }) => {
  const odpowiedz = await page.goto("/pl/");
  expect(odpowiedz?.status(), "status HTTP 200").toBe(200);
  expect(new URL(page.url()).pathname, "finalny URL bez prefiksu").toBe("/");
});

/**
 * Bezpośrednie wejście na adres strony 404 też ma status 404, nie 200
 * — rejestr celowo NIE zawiera "/nie-znaleziono" (src/i18n/sciezki.ts).
 */
for (const adres of ["/nie-znaleziono", "/en/nie-znaleziono"]) {
  test(`bezpośrednie ${adres} → status 404`, async ({ request }) => {
    const odpowiedz = await request.get(adres);
    expect(odpowiedz.status(), "status HTTP 404").toBe(404);
  });
}
