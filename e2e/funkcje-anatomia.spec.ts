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
  /* ⚠ PORÓWNANIE Z ŻYWYM `h2` NA TEJ SAMEJ STRONIE, NIE Z TOKENEM.
     Pierwsza wersja brała oczekiwany rozmiar z `--tekst-h2` albo
     `--tekst-h2-male` — czyli z DWÓCH szczebli. Gdy ADR-059 dołożył
     stopień pośredni dla pasma 768–1279, model skali wpisany w test
     przestał odpowiadać rzeczywistości i test zaczął upadać na kadrze
     1190 przy poprawnej stronie. To jest ta sama klasa co „asercja
     porównująca z wartością GLOBALNĄ": test powtarzał skalę zamiast
     mierzyć RELACJĘ.

     Przedmiotem jest zdanie „tytuł podstrony ma rozmiar nagłówka
     SEKCJI, a nie hero" — więc obie strony porównania czytamy
     z wyrenderowanej strony: H1 i pierwszy widoczny `h2`. Taki test
     przeżyje każdą zmianę skali i upadnie dokładnie wtedy, gdy relacja
     się złamie. */
  const zmierzone = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    /* ⚠ NAJWIĘKSZY widoczny `h2`, nie pierwszy. Pierwszy `h2` na
       `/cennik` to nagłówek KARTY PLANU (16 px), a nie nagłówek sekcji —
       porównanie z nim dawało „H1 = 16 px" i upadało przy poprawnej
       stronie. Rolę nagłówka sekcji niesie największy stopień skali, więc
       to jego szukamy; ta sama metoda, którą mierzony był wzorzec. */
    const h2 = [...document.querySelectorAll("h2")]
      .filter((e) => e.getBoundingClientRect().height > 0)
      .sort(
        (a, b) =>
          parseFloat(getComputedStyle(b).fontSize) -
          parseFloat(getComputedStyle(a).fontSize),
      )[0];
    const korzen = getComputedStyle(document.documentElement);
    return {
      h1: h1 ? Math.round(parseFloat(getComputedStyle(h1).fontSize)) : null,
      h2: h2 ? Math.round(parseFloat(getComputedStyle(h2).fontSize)) : null,
      h1Hero: Math.round(parseFloat(korzen.getPropertyValue("--tekst-h1")) * 16),
    };
  });
  expect(zmierzone.h1, "H1 istnieje").not.toBeNull();
  expect(zmierzone.h2, "nagłówek sekcji istnieje (inaczej nie ma z czym porównać)").not.toBeNull();
  expect(
    zmierzone.h1,
    `${testInfo.project.name}: H1 podstrony = rozmiar nagłówka sekcji (${zmierzone.h2} px)`,
  ).toBe(zmierzone.h2);
  expect(
    zmierzone.h1,
    `${testInfo.project.name}: H1 podstrony NIE bierze skali hero (${zmierzone.h1Hero} px)`,
  ).not.toBe(zmierzone.h1Hero);
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

    /* ⚠ SLOT ZWINIĘTY = STAN ZAMIERZONY (ADR-059) — patrz ta sama gałąź
       w `filary.spec.ts`. Gdy nie ma fotografii, pusta ramka schodzi
       z układu, a asercją staje się PEŁNA MIARA kolumny tekstu. */
    if (rs === null) {
      const m = await u.evaluate((el) => {
        const dz = [...el.children].find((c) => (c as HTMLElement).offsetParent !== null);
        return dz ? { tekst: Math.round(dz.getBoundingClientRect().width),
          uklad: Math.round(el.getBoundingClientRect().width) } : null;
      });
      expect(m, `moduł ${i}: przy zwiniętym slocie widać kolumnę tekstu`).not.toBeNull();
      expect(
        m!.tekst,
        `moduł ${i}: slot zwinięty → tekst na PEŁNEJ mierze (${m!.tekst} z ${m!.uklad})`,
      ).toBeGreaterThanOrEqual(m!.uklad - 1);
      continue;
    }
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
