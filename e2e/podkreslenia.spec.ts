import { test, expect } from "@playwright/test";

/**
 * Strażnik JEDNEJ recepty podkreślenia linku
 * (`a { text-decoration-line: underline; text-underline-offset: 0.2em }`
 * w `globals.css`; decyzja właściciela 2026-08-14).
 *
 * Powstał, bo rozjazd, który ta decyzja zamyka, powstał BEZ niczyjej złej
 * woli: nawigacja dostała odsunięcie 0.2em w swoim module, a stopka
 * i treść zostały na `auto` przeglądarki — i przez cztery fazy nikt tego
 * nie zauważył, bo żaden test nie porównywał linków MIĘDZY obszarami.
 * Pomiar 2026-08-14 na dziewięciu stronach: 224 linki, OSIEM receptur.
 * Po ujednoliceniu: jedna.
 *
 * Mierzone w `em`, nie w pikselach. `0.2em` przy 16 px treści daje 3,2 px,
 * a przy drobniejszej stopce mniej — to TA SAMA recepta, więc próg
 * pikselowy czerwieniłby się na poprawnym kodzie. Odsunięcie ma skalować
 * się z pismem i test pilnuje właśnie tego.
 *
 * Test NIE pilnuje, KTÓRE linki są podkreślone — to decyzja projektowa
 * poszczególnych komponentów (CTA, logo i przełącznik języka podkreślenia
 * nie mają). Pilnuje, że każdy link — podkreślony czy nie — niesie to samo
 * odsunięcie, więc zdjęcie `text-decoration: none` z dowolnego z nich
 * nigdy nie odsłoni obcej receptury.
 */

/** Wszystkie strony serwisu w jednym przebiegu: rozjazd receptur jest
 *  z definicji zjawiskiem MIĘDZY stronami i obszarami, więc próbka
 *  z jednej strony niczego by nie dowiodła. */
const STRONY = [
  "/",
  "/cennik",
  "/funkcje",
  "/dla-kogo",
  "/funkcje/pozyskiwanie",
  "/funkcje/tresci",
  "/funkcje/zespol",
  "/funkcje/wyniki",
  "/login",
] as const;

const RECEPTA = "0.20em";

test("jedna recepta podkreślenia na wszystkie linki serwisu", async ({
  page,
}) => {
  const obce: string[] = [];
  let zbadane = 0;

  for (const sciezka of STRONY) {
    await page.goto(sciezka);

    const linki = await page.evaluate(() => {
      const wynik: { odsuniecie: string; tekst: string }[] = [];
      for (const a of document.querySelectorAll("a")) {
        const s = getComputedStyle(a);
        const odsunieciePx = parseFloat(s.textUnderlineOffset);
        const pismoPx = parseFloat(s.fontSize);
        wynik.push({
          // `auto` nie parsuje się na liczbę i wpada tu jako „auto" —
          // czyli dokładnie ta wartość, którą decyzja zastąpiła.
          odsuniecie: Number.isFinite(odsunieciePx)
            ? `${(odsunieciePx / pismoPx).toFixed(2)}em`
            : String(s.textUnderlineOffset),
          tekst: (a.textContent || "").trim().slice(0, 30),
        });
      }
      return wynik;
    });

    expect(linki.length, `${sciezka} ma linki do sprawdzenia`).toBeGreaterThan(
      0,
    );
    zbadane += linki.length;

    for (const l of linki) {
      if (l.odsuniecie !== RECEPTA) {
        obce.push(`${sciezka} „${l.tekst}" → ${l.odsuniecie}`);
      }
    }
  }

  // Próg na liczbę zbadanych linków: gdyby selektor przestał je łapać,
  // pusta lista „obcych" fałszywie zazieleniłaby test.
  expect(zbadane, "łączna liczba zbadanych linków").toBeGreaterThan(200);
  expect(obce, `linki poza receptą ${RECEPTA}`).toEqual([]);
});
