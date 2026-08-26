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

/** Rodziny kart w serwisie — selektory po wzorcu nazw CSS Modules. */
const RODZINY: Array<[string, string, string]> = [
  ["karta planu", "/cennik", '[class*="SekcjaPlanow_karta__"]'],
  ["karta FAQ", "/cennik", "details"],
  ["blok funkcji", "/funkcje", '[class*="BlokZadaniaDnia_blok__wnetrze"]'],
  ["ramka kadru", "/", '[class*="Filar_obraz__"]'],
];

for (const [nazwa, trasa, sel] of RODZINY) {
  test(`rozdział karty — ${nazwa}`, async ({ page }) => {
    await page.goto(trasa);
    const karta = page.locator(sel).first();
    await expect(karta, `${nazwa}: element istnieje (inaczej test nic nie mierzy)`).toBeAttached();

    const pomiar = await karta.evaluate((el) => {
      const c = getComputedStyle(el);
      const tloStrony = getComputedStyle(document.body).backgroundColor;
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

    const opis =
      `plama ${plama.toFixed(2)} · kreska ${kreska.toFixed(2)} · ` +
      `odstęp ${pomiar.odstep ?? "brak"} px, promień ${pomiar.promien} px`;

    expect(
      plama >= PROG_KONTRASTU || kreska >= PROG_KONTRASTU || kompozycja,
      `${nazwa}: karta nie odcina się od tła ŻADNYM z trzech mechanizmów — ${opis}`,
    ).toBe(true);
  });
}
