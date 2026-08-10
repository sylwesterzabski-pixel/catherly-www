import { test, expect } from "@playwright/test";

import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";

/**
 * I1 — aria-current="page" wskazuje bieżącą pozycję menu (kontrakt K1:
 * wyznaczana serwerowo przez stronę, zero JS): na stronie pozycji
 * DOKŁADNIE JEDEN link na całej stronie ma aria-current="page" i jest
 * to link tej pozycji w nawigacji nagłówka — żaden inny link go nie ma.
 * (Linki języków w stopce używają aria-current="true" — inna wartość,
 * poza zakresem tej asercji.)
 */
const PRZYPADKI = [
  { adres: "/funkcje", etykieta: pl.Nawigacja.funkcje },
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
