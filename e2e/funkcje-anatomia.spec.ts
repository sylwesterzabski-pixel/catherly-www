import { test, expect } from "@playwright/test";

/**
 * ANATOMIA /funkcje i podstron filarowych (ADR-058, zlecenie `WWW/083`).
 *
 * ⚠ ASERCJE PISANE OD RAZU NA TRZY PROJEKTY — mobile-390, desktop (1280)
 * i desktop-wide (1440). Nauka z T57: reguły progu 90rem nie były przez
 * lata pilnowane przez żaden przebieg, a mutacja w tym bloku milczała.
 */

const PODSTRONY = [
  "/funkcje/pozyskiwanie",
  "/funkcje/tresci",
  "/funkcje/zespol",
  "/funkcje/wyniki",
] as const;

test("anatomia /funkcje: H1 w roli PODSTRONY (skala nagłówka sekcji)", async ({
  page,
}, testInfo) => {
  await page.goto("/funkcje");
  const zmierzone = await page.locator("h1").first().evaluate((el) => {
    const s = getComputedStyle(el);
    const k = getComputedStyle(document.documentElement);
    const px = (n: string) => Math.round(parseFloat(k.getPropertyValue(n)) * 16);
    return {
      rozmiar: Math.round(parseFloat(s.fontSize)),
      h2: px("--tekst-h2"),
      h2Male: px("--tekst-h2-male"),
      h1Hero: px("--tekst-h1"),
    };
  });
  const oczekiwany =
    testInfo.project.name === "mobile-390" ? zmierzone.h2Male : zmierzone.h2;
  expect(
    zmierzone.rozmiar,
    `${testInfo.project.name}: H1 indeksu = skala H2 (${oczekiwany} px), nie hero (${zmierzone.h1Hero} px)`,
  ).toBe(oczekiwany);
});

for (const trasa of PODSTRONY) {
  test(`anatomia ${trasa}: ZERO zrzutów w treści, a treść JEST`, async ({
    page,
  }, testInfo) => {
    await page.goto(trasa);
    /* ⚠ KONTROLA POZYTYWNA WPISANA W ASERCJĘ. Samo „zero obrazów" jest
       spełnione także przez stronę pustą albo niewczytaną — dlatego obok
       zera stoi dowód, że treść się wyrenderowała. Bez tego zdanie
       „zrzutów nie ma" mierzyłoby stan strony, nie decyzję. */
    const modulow = await page.locator('[class*="ModulFunkcji_modul__"]').count();
    expect(modulow, `${trasa}: moduły się wyrenderowały`).toBeGreaterThan(0);

    await expect(
      page.locator("main img"),
      `${trasa} (${testInfo.project.name}): zero zrzutów w treści — ` +
        `decyzja właściciela „zero zrzutów aplikacji" obejmuje cały serwis (WWW/083)`,
    ).toHaveCount(0);
  });

  test(`anatomia ${trasa}: KAŻDY moduł ma zdanie „Czego NIE robi"`, async ({
    page,
  }) => {
    await page.goto(trasa);
    /* ⚠ TO ZDANIE JEST OBOWIĄZKOWE (uczciwa granica, brief K12) i zlecenie
       WWW/083 ostrzega wprost, żeby nie zgubić go przy przebudowie.
       Asercja liczy PARAMI: tyle granic, ile modułów — sama obecność
       „co najmniej jednej" przepuściłaby zgubienie dziewięciu z dziesięciu. */
    const modulow = await page.locator('[class*="ModulFunkcji_modul__"]').count();
    expect(modulow, `${trasa}: moduły istnieją`).toBeGreaterThan(0);
    await expect(
      page.locator('[class*="ModulFunkcji_granica__"]'),
      `${trasa}: granica „Czego NIE robi" przy KAŻDYM z ${modulow} modułów`,
    ).toHaveCount(modulow);
  });
}

test("anatomia modułów: tekst po LEWEJ na wszystkich, zebra zdjęta", async ({
  page,
}, testInfo) => {
  await page.goto("/funkcje/pozyskiwanie");
  const uklady = page.locator('[class*="ModulFunkcji_uklad__"]');
  const ile = await uklady.count();
  expect(ile, "układy modułów istnieją").toBeGreaterThan(0);

  for (let i = 0; i < ile; i += 1) {
    const u = uklady.nth(i);
    const tekst = u.locator("> div").first();
    const slot = u.locator("> div").last();
    const rt = await tekst.boundingBox();
    const rs = await slot.boundingBox();
    expect(rt, `moduł ${i}: kolumna tekstu ma ramkę`).not.toBeNull();
    expect(rs, `moduł ${i}: slot ma ramkę`).not.toBeNull();
    if (testInfo.project.name === "mobile-390") {
      /* Kadr wąski: kolumny jedna pod drugą, tekst wyżej. */
      expect(rt!.y, `${testInfo.project.name} moduł ${i}: tekst NAD slotem`).toBeLessThan(rs!.y);
    } else {
      /* ⚠ POŁOŻENIE, NIE `order` — asercja łapie każdy sposób odwrócenia
         kolumn, nie jeden wybrany mechanizm (nauka z ADR-055). */
      expect(rt!.x, `${testInfo.project.name} moduł ${i}: tekst po LEWEJ`).toBeLessThan(rs!.x);
    }
  }
});
