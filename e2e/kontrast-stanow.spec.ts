import { test, expect } from "@playwright/test";

import { routing } from "../src/i18n/routing";
import {
  ISTNIEJACE_SCIEZKI,
  PRERENDEROWANE_BEZ_ADRESU,
  adresWJezyku,
} from "../src/i18n/sciezki";
import {
  ocenElement,
  odciskWygladu,
  stanZmieniaWyglad,
  zmierzStrone,
  rozstrzygnijRastrem,
  STANY,
} from "./pomoc/sonda-stanow.mjs";

/**
 * Bramka: KONTRAST W STANACH INTERAKTYWNYCH (rozstrzygnięcie właściciela
 * 2026-08-17).
 *
 * DLACZEGO POWSTAŁA. `e2e/axe.spec.ts` skanuje wyłącznie stan spoczynku —
 * axe-core nie wymusza `:hover`, `:active` ani `:focus`, więc reguła stanu
 * mogła zepsuć kontrast etykiety CTA do 1,34:1 na 18 wystąpieniach i przejść
 * przez zieloną bramkę. Przeszła. To luka klasy „strażnik nie patrzy tam,
 * gdzie boli": pilnowaliśmy obrazu, którego użytkownik nie ogląda przez
 * większość czasu spędzonego przy przycisku.
 *
 * CO SPRAWDZA, w czterech stanach (spoczynek, hover, active, fokus) i w obu
 * kadrach, na KAŻDYM adresie w trzech językach:
 *   1.4.3  tekst każdego elementu klikalnego i jego potomków niosących tekst;
 *   2.4.11 istnienie śladu fokusa na każdym przystanku klawiatury;
 *   1.4.11 widoczność śladu fokusa i granicy kontrolki (patrz W-GRANICA-01
 *          w e2e/pomoc/sonda-stanow.mjs).
 * Stan WYŁĄCZONY mierzy się progiem elementu UI. WCAG wyłącza nieaktywne
 * kontrolki spod 1.4.3 i 1.4.11 — próg 3:1 jest DECYZJĄ tego projektu ponad
 * normę, wprost z obietnicy „kontrast AA wszędzie" (CLAUDE.md). Dziś serwis
 * nie ma ani jednej wyłączonej kontrolki, więc ten próg nie blokuje niczego;
 * zacznie obowiązywać od pierwszej, która powstanie.
 *
 * SKĄD BIERZE TRASY. Z rejestru produkcyjnego (`src/i18n/sciezki.ts`), nie
 * z listy przepisanej ręcznie. Konwencja lustra z tego repozytorium każe
 * strażnikom przepisywać stałe z ręki, ale dotyczy strażników sprawdzających
 * ZGODNOŚĆ strony z deklaracją — import robiłby z nich tautologię. Tu
 * przedmiotem asercji są kolory, a rejestr wyznacza wyłącznie ZASIĘG; lista
 * przepisana z ręki dałaby stronę bez pokrycia przy pierwszym zapomnieniu.
 * Rejestr jest wyprowadzony z mapy stopki, więc nowa strona nie ma drogi,
 * którą mogłaby ominąć tę bramkę.
 *
 * CZEGO NIE OBEJMUJE — świadomie i głośno:
 *   · rysunku widżetów przeglądarki (kółko radia, ptaszek pola wyboru) — nie
 *     ma go w stylu wyliczonym, więc nie da się go zmierzyć tą drogą;
 *   · reguł postaci `X:hover Y`, gdzie stan stoi na innym elemencie niż
 *     stylowany — takie w ogóle nie istnieją i pilnuje tego asercja niżej,
 *     żeby dziura nie powstała po cichu.
 */

const MIN_KLIKALNYCH = 10;

/* Adresy: rejestr istniejących ścieżek + trzecia kategoria (strona 404 jest
   prerenderowana i skanowana, choć serwuje status 404 — tak samo robi
   axe.spec.ts). Iloczyn z językami daje pełne pokrycie pl/en/de. */
const SCIEZKI = [...ISTNIEJACE_SCIEZKI, ...PRERENDEROWANE_BEZ_ADRESU];

for (const jezyk of routing.locales) {
  for (const sciezka of SCIEZKI) {
    const adres = adresWJezyku(jezyk, sciezka);

    test(`kontrast stanów: ${adres}`, async ({ page, context, browserName }, info) => {
      // Wymuszanie pseudoklas idzie przez CDP — mechanizm Chromium.
      test.skip(browserName !== "chromium", "CSS.forcePseudoState wymaga CDP");

      const cdp = await context.newCDPSession(page);
      await cdp.send("DOM.enable");
      await cdp.send("CSS.enable");
      await page.goto(adres);

      const { elementy, podejrzaneReguly } = await zmierzStrone(page, cdp);

      /* Dziura zamiast ciszy: reguła stanu na innym elemencie niż stylowany
         wypada poza zasięg sondy, więc jej powstanie ma zatrzymać bramkę. */
      expect(
        podejrzaneReguly,
        "reguła stanu poza zasięgiem sondy — rozszerz sondę albo przepisz regułę",
      ).toEqual([]);

      /* Zabezpieczenie przed zerowaniem: pusty wynik selektora dałby zieleń
         bez ani jednego pomiaru. */
      expect(
        elementy.length,
        `${adres}: znaleziono ${elementy.length} elementów klikalnych`,
      ).toBeGreaterThanOrEqual(MIN_KLIKALNYCH);

      /* Zabezpieczenie przed zerowaniem, część druga: dowód, że wymuszanie
         stanów realnie działa. Gdyby przestało, wszystkie stany zrównałyby
         się ze spoczynkiem i każda strona byłaby „poprawna". */
      const zmienione = elementy.filter(stanZmieniaWyglad).length;
      expect(
        zmienione,
        `${adres}: żaden element nie zmienił wyglądu pod wymuszeniem stanu ` +
          "— wymuszanie pseudoklas przestało działać",
      ).toBeGreaterThan(0);

      const naruszenia: ReturnType<typeof ocenElement>["naruszenia"] = [];
      const nieoznaczalne: ReturnType<typeof ocenElement>["nieoznaczalne"] = [];
      for (const pomiary of elementy) {
        const o = ocenElement(adres, info.project.name, pomiary);
        naruszenia.push(...o.naruszenia);
        nieoznaczalne.push(...o.nieoznaczalne);
      }

      /* ROZSTRZYGNIĘCIE RASTREM (ADR-033, krok 2). Punkt nad tłem
         niejednolitym nie jest już porzucany jako niemierzalny — tło
         czytamy z RENDERU i liczymy kontrast z najgorszej próbki na
         obwodzie. Naprawiamy POMIAR, nie scenę: poświata zostaje.

         Kolejność ma znaczenie: raster dostaje WYŁĄCZNIE to, czego
         składanie stosu nie umiało policzyć, więc ścieżka mierzalna
         pozostaje pierwszeństwem i nic nie traci na dokładności. */
      const raster = await rozstrzygnijRastrem(page, nieoznaczalne);
      naruszenia.push(...raster.naruszenia);

      /* Brak dowodu = brak zabezpieczenia (ADR-018). To, czego nie
         policzył ANI stos, ANI raster, nie jest zielone — jest
         niezmierzone i ma zatrzymać bramkę. */
      expect(
        raster.nadalNieoznaczalne.map(
          (n) => `${n.stan} ${n.selektor} — ${n.powod} („${n.probka}")`,
        ),
        "punkty niemożliwe do zmierzenia — kontrast w nich jest NIEZNANY",
      ).toEqual([]);

      expect(
        naruszenia.map(
          (n) =>
            `[${n.stan}] ${n.typ} ${n.wartosc}:1 < ${n.prog}:1 — ${n.selektor} ` +
            `— ${n.opis}${n.szczegol ? ` — ${n.szczegol}` : ""}`,
        ),
        `${adres} (${info.project.name}): kontrast poniżej progu w stanie interaktywnym`,
      ).toEqual([]);
    });
  }
}

/**
 * Czujnik żywy dla stanu WYŁĄCZONEGO. Serwis nie ma dziś ani jednej wyłączonej
 * kontrolki, więc gałąź `wylaczony` w ocenie nigdy się nie wykonuje — a kod
 * niesprawdzony liczy się jak niedziałający (ADR-018). Ten test wyłącza jedno
 * PRAWDZIWE pole przełącznika okresu i sprawdza, że sonda to rozpoznaje
 * i mierzy. Nie ocenia wyglądu — dowodzi, że przyrząd nie jest ślepy.
 */
test("stan wyłączony: sonda go rozpoznaje i mierzy", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium", "CSS.forcePseudoState wymaga CDP");

  const cdp = await context.newCDPSession(page);
  await cdp.send("DOM.enable");
  await cdp.send("CSS.enable");
  await page.goto("/cennik");

  const przed = await zmierzStrone(page, cdp);
  const wylaczonePrzed = przed.elementy.filter((p) => p.spoczynek?.wylaczony).length;
  expect(wylaczonePrzed, "produkcja nie ma dziś wyłączonych kontrolek").toBe(0);

  await page.evaluate(() => {
    const pole = document.querySelector('input[type="radio"]');
    if (!pole) throw new Error("brak pola przełącznika okresu");
    pole.setAttribute("disabled", "");
  });

  const po = await zmierzStrone(page, cdp);
  const wylaczonePo = po.elementy.filter((p) => p.spoczynek?.wylaczony);
  expect(wylaczonePo.length, "sonda musi zobaczyć wyłączoną kontrolkę").toBe(1);
  for (const stan of STANY) {
    expect(
      wylaczonePo[0][stan]?.wylaczony,
      `stan ${stan} wyłączonej kontrolki musi być zmierzony`,
    ).toBe(true);
  }
});

/**
 * Czujnik żywy dla wymuszania stanów — na konkretnej, nazwanej parze kolorów.
 * Asercja wyżej („cokolwiek się zmieniło") jest ogólna; ta przybija mechanizm
 * do faktu, który da się przeczytać w CSS: CTA ma na `:hover` zmienić
 * wypełnienie z roli `interakcja` na `interakcja-aktywna`.
 */
test("wymuszanie stanów zmienia wygląd CTA (czujnik żywy)", async ({
  page,
  context,
  browserName,
}) => {
  test.skip(browserName !== "chromium", "CSS.forcePseudoState wymaga CDP");

  const cdp = await context.newCDPSession(page);
  await cdp.send("DOM.enable");
  await cdp.send("CSS.enable");
  await page.goto("/");

  const { elementy } = await zmierzStrone(page, cdp);
  const cta = elementy.filter((p) => /_cta__/.test(p.spoczynek?.selektor ?? ""));
  expect(cta.length, "strona główna ma dwa CTA").toBe(2);

  for (const pomiary of cta) {
    expect(
      odciskWygladu(pomiary.hover),
      "hover musi zmieniać wygląd CTA — inaczej sonda niczego nie wymusza",
    ).not.toBe(odciskWygladu(pomiary.spoczynek));
    expect(
      pomiary.fokus?.slad,
      "fokus musi rysować ślad na CTA",
    ).toBeTruthy();
  }
});
