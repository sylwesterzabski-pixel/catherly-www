import { test, expect } from "@playwright/test";

/**
 * Bramka: ROZDZIAŁ KARTY OD TŁA — trzy mechanizmy (ADR-038).
 *
 * „Kartę odcina PLAMA ≥ 1,30 ALBO KRESKA ≥ 1,30 ALBO — w motywie
 * ciemnym — KOMPOZYCJA (odstęp ≥ 30 px zmierzone we wzorcu + promień)."
 *
 * DLACZEGO TA REGUŁA MIESZKA TU, A NIE W STRAŻNIKU TOKENÓW.
 * Do 2026-08-26 liczyła WARTOŚCI TOKENÓW i miała dwa mechanizmy. Trzeci —
 * kompozycja — jest własnością UKŁADU, nie palety: strażnik tokenów nie
 * widzi ani `gap`, ani geometrii siatki, więc nie ma jak go zmierzyć.
 * Zostawienie tam dwóch z trzech dawałoby CZERWIEŃ NA STANIE POPRAWNYM
 * (wzorzec nie obrysowuje kart i rozdziela je przestrzenią), czyli
 * strażnika nadgorliwego; „przymknięcie" reguły dawałoby CISZĘ NA STANIE
 * ZŁYM. Dopiero na wyrenderowanej stronie widać jedno i drugie naraz.
 *
 * Progi: 1,30 — nasza reguła wewnętrzna z audytu (NIE WCAG).
 * 30 px — odstęp ZMIERZONY we wzorcu ze zlecenia WWW/050-FINAL
 * (trzy siatki po trzy karty, `gap: 30px`, odstępy potwierdzone
 * geometrycznie, nie odczytane z deklaracji).
 */

const PROG_KONTRASTU = 1.3;
const PROG_ODSTEPU = 30; // px — zmierzone we wzorcu, patrz docs/design/POMIAR-WZORCA.md

const kanal = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
const luminancja = ([r, g, b]: number[]) => {
  const [R, G, B] = [r, g, b].map((x) => kanal(x / 255));
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};
const kontrast = (a: number[], b: number[]) => {
  const x = luminancja(a), y = luminancja(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
/** Odróżnia barwę od przezroczystości — `rgba(0,0,0,0)` to nie czerń. */
function parsuj(s: string): number[] | null {
  const n = (s.match(/[\d.]+/g) ?? []).map(Number);
  if (n.length === 4 && n[3] === 0) return null;
  if (n.length < 3) return null;
  return n.slice(0, 3);
}

/* ⚠ SELEKTOR „karta FAQ" ZAWĘŻONY DO `main details` (2.1, ADR-045).
   Stało tu samo `details`. Od chwili, w której nawigacja dostała własny
   `details` (hamburger bez JS), lokator łapał NAJPIERW hamburgera —
   a ten z definicji nie odcina się od tła żadnym z trzech mechanizmów,
   bo kartą nie jest. Zmierzone: „plama 0.00 · kreska 0.00 · odstęp 6 px".
   Klasa: strażnik zerodowany przez zmianę otoczenia. Naprawa polega na
   wskazaniu miejsca, nie na złagodzeniu progu. */

/** Rodziny kart w serwisie — selektory po wzorcu nazw CSS Modules. */
const RODZINY: Array<[string, string, string]> = [
  ["karta planu", "/cennik", '[class*="SekcjaPlanow_karta__"]'],
  ["karta FAQ", "/cennik", "main details"],
  ["blok funkcji", "/funkcje", '[class*="BlokZadaniaDnia_blok__wnetrze"]'],
  ["ramka kadru", "/", '[class*="Filar_obraz__"]'],
  /* PIĄTA RODZINA — karty funkcji (ADR-053, batch A3). Weszła razem ze
     zmianą, która przestawiła ich mechanizm rozdziału z KOMPOZYCJI na
     OBRYS: odstęp siatki zszedł z 24–30 px na 16 px z pomiaru wzorca,
     czyli poniżej progu, na którym kompozycja stoi. Rodzina bez
     strażnika to dokładnie „brak dowodu = brak zabezpieczenia", a tu
     dowód jest potrzebny właśnie dlatego, że mechanizm się zmienił. */
  ["karta funkcji", "/", '[class*="KartyFunkcji_karta__"]'],
];

for (const [nazwa, trasa, sel] of RODZINY) {
  test(`rozdział karty — ${nazwa}`, async ({ page }) => {
    await page.goto(trasa);
    const karta = page.locator(sel).first();
    await expect(karta, `${nazwa}: element istnieje (inaczej test nic nie mierzy)`).toBeAttached();

    const pomiar = await karta.evaluate((el) => {
      const c = getComputedStyle(el);
      /* ⚠ TŁO LICZONE OD NAJBLIŻSZEGO MALOWANEGO PRZODKA, NIE OD `body`.
         Do 04.09.2026 stało tu `getComputedStyle(document.body)` i było
         to prawdą dokładnie tak długo, jak długo cała strona miała jedno
         tło. Od ADR-050 połowa sekcji leży w STREFIE JASNEJ, która maluje
         własne tło — a `body` zostaje ciemne. Zmierzone w jednym
         przebiegu, obie liczby dla tej samej ramki kadru: wobec `body`
         plama 20,07, wobec sekcji, w której ta ramka naprawdę leży —
         1,12. Pierwsza liczba jest osiemnastokrotnie zawyżona i opisuje
         tło, którego pod elementem NIE MA.

         To czwarte wystąpienie tej samej klasy w tym repozytorium
         („asercja porównująca z GLOBALNĄ wartością przestaje mierzyć swój
         przedmiot, gdy rola staje się zależna od kontekstu" — marker
         konkretów w ADR-050, lustro L1 w ADR-051, i te dwa). Naprawa jak
         poprzednio: przenieść odczyt do miejsca użycia.

         ⚠ ŻADNA RODZINA NIE ZMIENIŁA WERDYKTU PRZY TEJ NAPRAWIE —
         sprawdzone sondą przed zmianą, wszystkie pięć liczone OBOMA
         sposobami w jednym przebiegu. Zmieniło się to, CZYM zieleń jest
         uzasadniona, nie to, czy jest. */
      const tloStrony = (() => {
        let p = el.parentElement;
        while (p) {
          const t = getComputedStyle(p).backgroundColor;
          if (t && t !== "rgba(0, 0, 0, 0)" && t !== "transparent") return t;
          p = p.parentElement;
        }
        return getComputedStyle(document.body).backgroundColor;
      })();
      const rodzenstwo = el.parentElement
        ? [...el.parentElement.children].filter((x) => x !== el)
        : [];
      let najmniejszyOdstep = Infinity;
      const r = el.getBoundingClientRect();
      for (const s of rodzenstwo) {
        const rs = s.getBoundingClientRect();
        if (rs.width === 0 || rs.height === 0) continue;
        const poziomo = rs.left >= r.right ? rs.left - r.right : r.left - rs.right;
        const pionowo = rs.top >= r.bottom ? rs.top - r.bottom : r.top - rs.bottom;
        const d = Math.max(poziomo, pionowo);
        if (d >= 0 && d < najmniejszyOdstep) najmniejszyOdstep = d;
      }
      return {
        wypelnienie: c.backgroundColor,
        obrys: c.borderTopWidth !== "0px" && c.borderTopStyle !== "none" ? c.borderTopColor : null,
        promien: parseFloat(c.borderRadius) || 0,
        tloStrony,
        odstep: najmniejszyOdstep === Infinity ? null : +najmniejszyOdstep.toFixed(1),
        /* CZWARTY MECHANIZM: WYPEŁNIENIE OBRAZEM. Ile procent pola
           elementu zajmuje obraz potomny. Liczone z prostokątów, nie
           z deklaracji — obraz, który się nie wczytał, ma zerowy
           prostokąt i nie zaliczy się jako rozdział. */
        pokrycieObrazem: (() => {
          const pole = r.width * r.height;
          if (pole <= 0) return 0;
          let naj = 0;
          for (const im of el.querySelectorAll("img")) {
            const ri = im.getBoundingClientRect();
            naj = Math.max(naj, (ri.width * ri.height) / pole);
          }
          return +naj.toFixed(3);
        })(),
      };
    });

    const tlo = parsuj(pomiar.tloStrony);
    expect(tlo, `${nazwa}: tło strony da się zmierzyć`).not.toBeNull();
    const wyp = parsuj(pomiar.wypelnienie);
    const obr = pomiar.obrys ? parsuj(pomiar.obrys) : null;

    const plama = wyp ? kontrast(wyp, tlo!) : 0;
    const kreska = obr ? kontrast(obr, tlo!) : 0;
    const kompozycja =
      pomiar.odstep !== null && pomiar.odstep >= PROG_ODSTEPU && pomiar.promien > 0;
    /* MECHANIZM CZWARTY — OBRAZ (2.4, ADR-047).
       Ramka, którą wypełnia zrzut od krawędzi do krawędzi, odcina się
       od tła WŁASNYMI PIKSELAMI: widać zrzut, nie powierzchnię pod nim.
       Reguła trzech mechanizmów mierzy barwę TŁA elementu i o obrazie
       nie wie — więc po zdjęciu obrysu (wzorzec ramek nie obrysowuje)
       meldowała „plama 1.09 · kreska 0.00" dla elementu, który na
       ekranie jest wyraźnym prostokątem zrzutu.

       ⚠ TO NIE JEST ZŁAGODZENIE. Próg 90% pola jest wysoki celowo:
       obrazek ozdobny w rogu karty go nie osiągnie, a niewczytany kadr
       ma prostokąt zerowy i też nie. Zalicza się WYŁĄCZNIE ramka, którą
       obraz naprawdę wypełnia — czyli ta, w której powierzchnia i tak
       jest niewidoczna. Dowiedzione mutacją: po podmianie zrzutu na
       obraz zajmujący ćwierć pola mechanizm przestaje zaliczać. */
    const PROG_POKRYCIA = 0.9;
    const obrazem = pomiar.pokrycieObrazem >= PROG_POKRYCIA;

    const opis =
      `plama ${plama.toFixed(2)} · kreska ${kreska.toFixed(2)} · ` +
      `odstęp ${pomiar.odstep ?? "brak"} px, promień ${pomiar.promien} px · ` +
      `pokrycie obrazem ${(pomiar.pokrycieObrazem * 100).toFixed(0)}%`;

    expect(
      plama >= PROG_KONTRASTU || kreska >= PROG_KONTRASTU || kompozycja || obrazem,
      `${nazwa}: karta nie odcina się od tła ŻADNYM z czterech mechanizmów — ${opis}`,
    ).toBe(true);
  });
}
