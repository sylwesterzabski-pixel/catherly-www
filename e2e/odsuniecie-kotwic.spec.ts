import { test, expect } from "@playwright/test";

/**
 * Strażnik JEDNEJ recepty odsunięcia od sticky nagłówka
 * (`html { scroll-padding-block-start: 5rem }` w `globals.css`;
 * decyzja właściciela 2026-08-14 — naprawa 2.4.11 u korzenia).
 *
 * Powstał, bo naprawa bez strażnika jest niesprawdzona, a niesprawdzona
 * liczy się jak niedziałająca (ADR-018). Dziedziczone testy kotwic
 * (`funkcje-indeks.spec.ts`, `funkcje-pozyskiwanie.spec.ts`) pilnują
 * DOLNEJ granicy — „cel poniżej nagłówka" — i były zielone także wtedy,
 * gdy zakrytych przystanków fokusu było 23. Tu dochodzą dwie rzeczy,
 * których nie pilnował nikt:
 *
 *  (A) GÓRNA granica odsunięcia. Gdyby ktoś dopisał z powrotem lokalny
 *      `scroll-margin-block-start: 5rem` obok reguły korzenia, obie
 *      wartości SUMUJĄ SIĘ — zmierzone 80,2 px → 160,2 px pustki nad
 *      nagłówkiem, przy testach dolnej granicy dalej zielonych.
 *  (B) WĘDRÓWKA FOKUSU (2.4.11 Focus Not Obscured). scroll-margin celu
 *      nie dotyczy elementu, do którego przewija Shift+Tab. Pomiar
 *      2026-08-14 przed naprawą: 23 zakryte przystanki na ośmiu
 *      stronach × dwa kadry, wszystkie przy Shift+Tab, 0 przy Tab
 *      w przód. Po naprawie: 0.
 *
 * Asercja (B) jest OSTRZEJSZA niż AA: kryterium 2.4.11 (Minimum) pyta
 * o zakrycie CAŁKOWITE, a tu czerwieni się już zakrycie górnej krawędzi
 * (bliżej 2.4.12, AAA). Wybrane świadomie — pomiar pokazał, że serwis
 * ostrzejszy próg spełnia, więc pilnujemy tego, co mamy, nie minimum.
 */

/** Górny limit odsunięcia celu kotwicy od krawędzi kadru. Zmierzone
 *  maksimum po naprawie: 80,5 px (mobile) i 80,0 px (desktop).
 *  96 px = 6rem zostawia zapas, a podwojenie (160,2 px) łapie. */
const LIMIT_ODSUNIECIA = 96;

/** Strony z kotwicami wewnątrzstronowymi. Podstrona filarowa jest tu
 *  celowo: naprawa rusza strony wdrożone w Etapach B–C, więc regresja
 *  ma być widoczna TAM, nie tylko na dwóch stronach Etapu D. */
const STRONY = ["/funkcje", "/dla-kogo", "/funkcje/pozyskiwanie"] as const;

for (const sciezka of STRONY) {
  test(`kotwice ${sciezka}: cel pod nagłówkiem i nie dalej niż ${LIMIT_ODSUNIECIA} px od kadru`, async ({
    page,
  }) => {
    await page.goto(sciezka);

    // Kotwice zbierane ZE STRONY, nie z listy w teście: nowa kotwica
    // wchodzi pod strażnika sama, bez pamiętania o dopisaniu jej tutaj.
    //
    // Zbierane są CELE (id nagłówków i main), nie odnośniki na tej
    // stronie. Pierwsza wersja szła po `a[href*="#"]` i na indeksie
    // widziała jedną kotwicę zamiast pięciu: pozycje indeksu linkują
    // do kotwic PODSTRON, a własne kotwice bloków (#pozyskiwanie,
    // #tresci, #zespol, #wyniki) są celem linków Z ZEWNĄTRZ. Kotwica
    // niesprawdzana przez nikogo to dokładnie ten przypadek, którego
    // ten plik ma pilnować.
    const fragmenty = await page.evaluate(() => {
      const cele = new Set<string>();
      const main = document.querySelector("main");
      if (main?.id) cele.add(main.id);
      for (const el of document.querySelectorAll("main [id]")) {
        if (/^H[1-3]$/.test(el.tagName)) cele.add(el.id);
      }
      return [...cele];
    });

    expect(
      fragmenty.length,
      `${sciezka} ma kotwice do sprawdzenia`,
    ).toBeGreaterThan(0);

    for (const frag of fragmenty) {
      // Nawigacja fragmentem jak u użytkowniczki — nie scrollIntoView,
      // bo to inna ścieżka kodu przeglądarki niż skok w kotwicę.
      await page.goto(`${sciezka}#${frag}`);

      const pomiar = await page.evaluate((f) => {
        const el = document.getElementById(f)!;
        const r = el.getBoundingClientRect();
        const naglowek = document.querySelector("header")!;
        return {
          gora: r.top,
          dolNaglowka: naglowek.getBoundingClientRect().bottom,
        };
      }, frag);

      expect(
        pomiar.gora,
        `#${frag}: cel poniżej dolnej krawędzi sticky nagłówka`,
      ).toBeGreaterThanOrEqual(pomiar.dolNaglowka);
      expect(
        pomiar.gora,
        `#${frag}: odsunięcie nie zsumowane (scroll-padding + scroll-margin)`,
      ).toBeLessThanOrEqual(LIMIT_ODSUNIECIA);
    }
  });

  test(`2.4.11 ${sciezka}: żaden przystanek Shift+Tab nie zakryty przez sticky nagłówek`, async ({
    page,
  }) => {
    await page.goto(sciezka);

    const ileFokusowalnych = await page.evaluate(
      () =>
        document.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
        ).length,
    );
    // Zapas na przystanki przeglądarki (pasek adresu wraca do dokumentu).
    const kroki = ileFokusowalnych + 3;

    // Na koniec dokumentu, potem wstecz — bo zakrycie powstaje przy
    // wędrówce W TYŁ: przeglądarka przewija do elementu ponad kadrem
    // i zatrzymuje go dokładnie pod sticky nagłówkiem.
    for (let i = 0; i < kroki; i += 1) await page.keyboard.press("Tab");

    const zakryte: string[] = [];
    for (let i = 0; i < kroki; i += 1) {
      await page.keyboard.press("Shift+Tab");
      const stan = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body || el === document.documentElement) {
          return null;
        }
        // Element W nagłówku nie jest przez nagłówek zakryty.
        if (el.closest("header")) return null;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return null;
        const trafiony = document.elementFromPoint(
          Math.max(1, r.left + Math.min(r.width / 2, 80)),
          Math.max(1, r.top + Math.min(r.height / 2, 8)),
        );
        if (!trafiony || !trafiony.closest("header")) return null;
        return (el.textContent ?? "").trim().slice(0, 40) || el.tagName;
      });
      if (stan) zakryte.push(stan);
    }

    expect(
      zakryte,
      `przystanki zakryte sticky nagłówkiem na ${sciezka}`,
    ).toEqual([]);
  });
}
