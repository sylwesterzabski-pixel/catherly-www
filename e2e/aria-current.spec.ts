import { test, expect } from "@playwright/test";

import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";

/**
 * I1 — aria-current="page" wskazuje bieżącą pozycję menu (kontrakt K1:
 * wyznaczana serwerowo przez stronę, zero JS): na stronie pozycji
 * DOKŁADNIE JEDEN element na całej stronie ma aria-current="page" i jest
 * to link tej pozycji w nawigacji nagłówka — żaden inny link go nie ma.
 * (Linki języków w stopce używają aria-current="true" — inna wartość,
 * poza zakresem tej asercji.)
 * ZAKRES asercji page-wide: wyłącznie strony BEZ okruszków — na
 * podstronach sekcji (Faza 4) "page" niesie także ostatni okruszek,
 * a pozycja-rodzic menu dostaje aria-current="true" (A-1); ten
 * scenariusz pilnowany per nagłówek w e2e/funkcje-pozyskiwanie.spec.ts.
 */
const PRZYPADKI = [
  // Faza 4, Etap D: /funkcje i /dla-kogo to strony właściwe (nie
  // StronaWBudowie) i OBIE są bez okruszków (D-D2a) — pozycja menu
  // niesie „page", nie „true" (T8 handoffu Etapu D).
  { adres: "/funkcje", etykieta: pl.Nawigacja.funkcje },
  { adres: "/dla-kogo", etykieta: pl.Nawigacja.dlaKogo },
  { adres: "/de/dla-kogo", etykieta: de.Nawigacja.dlaKogo },
  { adres: "/en/cennik", etykieta: en.Nawigacja.cennik },
] as const;

for (const { adres, etykieta } of PRZYPADKI) {
  test(`aria-current="page": na ${adres} wyłącznie link „${etykieta}"`, async ({
    page,
  }) => {
    await page.goto(adres);

    // Dokładnie jeden element z aria-current="page" na całej stronie…
    const biezace = page.locator('[aria-current="page"]');
    await expect(biezace).toHaveCount(1);
    // …jest linkiem bieżącej pozycji w nawigacji nagłówka.
    await expect(page.locator('header nav a[aria-current="page"]')).toHaveText(
      etykieta,
    );
  });
}
