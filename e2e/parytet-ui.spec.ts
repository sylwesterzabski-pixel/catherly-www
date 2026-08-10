import { test, expect } from "@playwright/test";

import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";

/**
 * Bramka: Parytet pl/en/de w UI (ADR-008) — nawigacja i stopka
 * renderują się we wszystkich trzech wersjach językowych z etykietami
 * z src/i18n/messages (kontrakt K1: pl bez prefiksu, /en, /de).
 */
const PRZYPADKI = [
  { adres: "/", jezyk: "pl", prefiks: "", komunikaty: pl },
  { adres: "/en", jezyk: "en", prefiks: "/en", komunikaty: en },
  { adres: "/de", jezyk: "de", prefiks: "/de", komunikaty: de },
] as const;

// Ścieżki pozycji menu i mapy strony — ZAPISANE WPROST (niezależnie
// od src/i18n/sciezki.ts): parytet hrefów per język to kontrakt K1
// (pl bez prefiksu: /funkcje…; en: /en/funkcje…; de: /de/funkcje…).
const POZYCJE = [
  { klucz: "funkcje", sciezka: "/funkcje" },
  { klucz: "cennik", sciezka: "/cennik" },
  { klucz: "dlaKogo", sciezka: "/dla-kogo" },
] as const;

// Liczba linków w stopce: mapa strony (3 pozycje) + języki (3) —
// dokumenty i kontakt to TEKST „(wkrótce)", bez linków (kontrakt K1).
const LICZBA_LINKOW_STOPKI = 6;

for (const { adres, jezyk, prefiks, komunikaty } of PRZYPADKI) {
  test(`parytet UI (${jezyk}): nawigacja i stopka z etykietami messages na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    // html lang zgodny z wersją językową.
    await expect(page.locator("html")).toHaveAttribute("lang", jezyk);

    // Skip-link: pierwszy element body, etykieta z messages.
    await expect(page.locator("body > a").first()).toHaveText(
      komunikaty.Nawigacja.przejdzDoTresci,
    );

    // Nagłówek: logo + trzy pozycje menu + Logowanie.
    const naglowek = page.locator("header");
    await expect(
      naglowek.getByRole("link", { name: "Catherly", exact: true }),
    ).toBeVisible();
    for (const { klucz, sciezka } of POZYCJE) {
      const link = naglowek.getByRole("link", {
        name: komunikaty.Nawigacja[klucz],
        exact: true,
      });
      await expect(link).toBeVisible();
      // Parytet hrefów per język: pl bez prefiksu, /en i /de z prefiksem.
      await expect(link).toHaveAttribute("href", `${prefiks}${sciezka}`);
    }
    await expect(
      naglowek.getByRole("link", {
        name: komunikaty.Nawigacja.logowanie,
        exact: true,
      }),
    ).toBeVisible();

    // Stopka: cztery sekcje z nagłówkami z messages.
    const stopka = page.locator("footer");
    for (const klucz of ["mapaStrony", "jezyk", "dokumenty", "kontakt"] as const) {
      await expect(
        stopka.getByRole("heading", {
          name: komunikaty.Stopka[klucz],
          exact: true,
        }),
      ).toBeVisible();
    }

    // Mapa strony: te same trzy pozycje co menu, hrefy per język
    // (parytet hrefów — kontrakt K1).
    const mapaStrony = stopka.locator("section", {
      has: page.getByRole("heading", {
        name: komunikaty.Stopka.mapaStrony,
        exact: true,
      }),
    });
    for (const { klucz, sciezka } of POZYCJE) {
      await expect(
        mapaStrony.getByRole("link", {
          name: komunikaty.Nawigacja[klucz],
          exact: true,
        }),
      ).toHaveAttribute("href", `${prefiks}${sciezka}`);
    }

    // Języki jako linki; bieżący oznaczony aria-current="true".
    for (const [jezykLinku, adresLinku] of [
      ["pl", "/"],
      ["en", "/en"],
      ["de", "/de"],
    ] as const) {
      const link = stopka.locator(`a[lang="${jezykLinku}"]`);
      await expect(link).toHaveAttribute("href", adresLinku);
    }
    await expect(stopka.locator('a[aria-current="true"]')).toHaveAttribute(
      "lang",
      jezyk,
    );

    // Dokumenty: cztery NAZWY z messages jako TEKST „Nazwa (wkrótce)"
    // (I4 — decyzja właściciela 2026-08-10); kontakt: tekst „(wkrótce)".
    // ZERO linków do nieistniejących stron — łącznie tylko mapa strony
    // + języki.
    for (const nazwa of Object.values(komunikaty.Stopka.dokumentyPozycje)) {
      await expect(
        stopka.getByText(`${nazwa} ${komunikaty.Stopka.wkrotce}`),
      ).toBeVisible();
    }
    await expect(
      stopka.getByText(komunikaty.Stopka.wkrotce).first(),
    ).toBeVisible();
    await expect(stopka.locator("a")).toHaveCount(LICZBA_LINKOW_STOPKI);

    // Treść placeholdera w main#tresc z messages.
    await expect(page.locator("main#tresc")).toContainText(
      komunikaty.StronaGlowna.szkielet,
    );
  });
}
