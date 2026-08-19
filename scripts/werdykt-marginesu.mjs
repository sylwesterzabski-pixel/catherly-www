#!/usr/bin/env node
/**
 * WERDYKT MARGINESU — „margines pozorny" (rozstrzygnięcie właściciela
 * 2026-08-19, T22 c).
 *
 * ── Skąd się wziął ────────────────────────────────────────────────
 * `podsumowanie-pomiaru.mjs` od 2026-08-16 wypisywało w logu linijkę
 * „⚠ rozrzut większy niż zapas — ta trasa może spaść przy niezmienionym
 * kodzie". 2026-08-19 okazało się, że wypisał ją dla trasy „/"
 * w OBU przebiegach doby, także w tym ZIELONYM (rozrzut 1017 i 1235 ms
 * przy zapasie ~300 ms) — i nikt jej nie przeczytał, bo siedziała
 * w kilkuset linijkach logu zielonego zadania. Zieleń przebiegu
 * 32300222841 nie była dowodem stabilnego marginesu, tylko jedną stroną
 * monety; następny przebieg pokazał drugą.
 *
 * Klasa nazwana przez właściciela: „raport, którego nikt nie czyta,
 * przestaje być raportem" — rodzina z ADR-018, bo ostrzeżenie widziane
 * wyłącznie po fakcie działa jak jego brak, z tą różnicą, że pozwala
 * powiedzieć „przecież było napisane".
 *
 * ── Co ten skrypt robi inaczej ────────────────────────────────────
 * To WERDYKT, nie adnotacja: ma własny kod wyjścia i własne miejsce
 * w interfejsie GitHuba (`::warning` + $GITHUB_STEP_SUMMARY), czyli na
 * stronie podsumowania przebiegu, nad listą zadań — nie w logu.
 *
 * Reguła: trasa, która stoi POD progiem, ale ma rozrzut większy niż
 * zapas do progu, ma margines POZORNY. O jej werdykcie decyduje wtedy
 * losowanie przebiegu, nie stan strony — a zieleń, która jutro spadnie
 * bez zmiany kodu, uczy ignorowania czerwieni tak samo jak fałszywy alarm.
 * Trasy POWYŻEJ progu pomija: te są już czerwone i mówi o nich pomiar.
 *
 * ── Czego tu nie ma ───────────────────────────────────────────────
 * Progów ani reguły wyboru reprezentanta. Progi czytamy z lighthouserc.cjs,
 * regułę z scripts/reprezentant.mjs, a to KTÓRY przebieg poszedł pod osąd —
 * ze śladu `.lighthouseci/regula-werdyktu.json`. Trzecia kopia którejkolwiek
 * z tych rzeczy rozjechałaby się cicho z bramką.
 */
import { appendFileSync, readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";

import { liczba, mediana, wybierzReprezentanta } from "./reprezentant.mjs";

const require = createRequire(import.meta.url);
const KATALOG = new URL("../.lighthouseci/", import.meta.url);
const KRESKA = "─".repeat(68);

/** Pominięcie ≠ zieleń: mówimy głośno, czego NIE osądziliśmy. */
function pominiete(powod) {
  console.log(`\nWerdykt marginesu POMINIĘTY: ${powod}.`);
  console.log(
    "  To nie jest „margines w porządku" +
      "” — to brak danych do osądu. Sam pomiar\n" +
      "  mówi o sobie osobno.\n",
  );
  process.exit(0);
}

let pliki;
try {
  pliki = readdirSync(KATALOG)
    .filter((n) => /^lhr-\d+\.json$/.test(n))
    .sort();
} catch (e) {
  pominiete(`nie da się odczytać .lighthouseci/ (${e.code || e.message})`);
}
if (pliki.length === 0) pominiete("brak raportów lhr-*.json");

const { ci } = require("../lighthouserc.cjs");
const ASERCJE = ci?.assert?.assertions ?? {};

const METRYKI = [
  { klucz: "largest-contentful-paint", etykieta: "LCP", jednostka: "ms", cyfry: 0 },
  { klucz: "total-blocking-time", etykieta: "TBT", jednostka: "ms", cyfry: 0 },
  { klucz: "cumulative-layout-shift", etykieta: "CLS", jednostka: "", cyfry: 3 },
];

const trasy = new Map();
const zPliku = new Map();
for (const nazwa of pliki) {
  let lhr;
  try {
    lhr = JSON.parse(readFileSync(new URL(nazwa, KATALOG), "utf8"));
  } catch {
    continue;
  }
  const url = lhr.requestedUrl || lhr.finalDisplayedUrl || lhr.finalUrl;
  if (!url) continue;
  if (!trasy.has(url)) trasy.set(url, []);
  trasy.get(url).push(lhr);
  zPliku.set(lhr, nazwa);
}
if (trasy.size === 0) pominiete("żaden raport nie dał się odczytać");

const SLAD = (() => {
  try {
    return JSON.parse(readFileSync(new URL("regula-werdyktu.json", KATALOG), "utf8"));
  } catch {
    return null;
  }
})();
const WYBOR_BRAMKI = new Map((SLAD?.wybrane || []).map((w) => [w.url, w.plik]));

const BAZA = (process.env.LHCI_BAZA || "").trim().replace(/\/+$/, "");
const skroc = (u) => (BAZA && u.startsWith(BAZA) ? u.slice(BAZA.length) || "/" : u);

/** @type {{trasa:string, etykieta:string, zapas:number, rozrzut:number, wartosc:number, prog:number, cyfry:number, jednostka:string, przebiegi:number[]}[]} */
const pozorne = [];
let osadzonych = 0;

for (const [url, raporty] of trasy) {
  if (raporty.length < 2) continue; // rozrzut jednego przebiegu nie istnieje
  const zapisany = WYBOR_BRAMKI.get(url);
  let wybrany = zapisany ? raporty.find((r) => zPliku.get(r) === zapisany) : null;
  if (!wybrany) {
    try {
      wybrany = wybierzReprezentanta(raporty).raport;
    } catch {
      wybrany = raporty[0];
    }
  }

  for (const m of METRYKI) {
    const prog = ASERCJE[m.klucz]?.[1]?.maxNumericValue;
    if (typeof prog !== "number") continue;
    const wartosci = raporty.map((r) => liczba(r, m.klucz)).filter((v) => v !== null);
    if (wartosci.length < 2) continue;
    const w = liczba(wybrany, m.klucz) ?? mediana(wartosci);
    osadzonych += 1;
    const zapas = prog - w;
    if (zapas < 0) continue; // już czerwone — o tym mówi pomiar, nie ten skrypt
    const rozrzut = Math.max(...wartosci) - Math.min(...wartosci);
    if (rozrzut <= zapas) continue;
    pozorne.push({
      trasa: skroc(url),
      etykieta: m.etykieta,
      zapas,
      rozrzut,
      wartosc: w,
      prog,
      cyfry: m.cyfry,
      jednostka: m.jednostka,
      przebiegi: wartosci,
    });
  }
}

const fmt = (v, p) => v.toFixed(p.cyfry) + (p.jednostka ? " " + p.jednostka : "");

console.log("");
console.log(KRESKA);
console.log("WERDYKT MARGINESU — czy zieleń tej bramki jest powtarzalna");
console.log(KRESKA);
console.log(
  `Osądzono ${osadzonych} par (trasa × metryka z progiem) z ${trasy.size} tras.\n` +
    "Margines POZORNY = trasa stoi pod progiem, ale rozrzut przebiegów jest\n" +
    "większy niż zapas do progu, więc o werdykcie decyduje losowanie przebiegu.",
);

if (pozorne.length === 0) {
  console.log("");
  console.log("✔ Żadna trasa nie ma marginesu pozornego — zieleń jest powtarzalna.");
  console.log(KRESKA);
  console.log("");
  process.exit(0);
}

console.log("");
for (const p of pozorne) {
  console.log(
    `  ✖ ${p.trasa}  ${p.etykieta}: margines pozorny, rozrzut ${fmt(p.rozrzut, p)} ` +
      `przy zapasie ${fmt(p.zapas, p)}`,
  );
  console.log(
    `      werdykt ${fmt(p.wartosc, p)} · próg ${fmt(p.prog, p)} · ` +
      `przebiegi ${p.przebiegi.map((v) => v.toFixed(p.cyfry)).join(" · ")}`,
  );
}

// Adnotacja GitHuba: strona podsumowania przebiegu, NAD listą zadań — czyli
// tam, gdzie patrzy człowiek, który nie otworzył logu. To jest cała różnica
// między tym werdyktem a linijką, którą zastąpił.
for (const p of pozorne) {
  console.log(
    `::warning title=Margines pozorny ${p.trasa} (${p.etykieta})::` +
      `rozrzut ${fmt(p.rozrzut, p)} przy zapasie ${fmt(p.zapas, p)} — ` +
      `werdykt ${fmt(p.wartosc, p)} wobec progu ${fmt(p.prog, p)}; ` +
      `ta trasa może spaść przy NIEZMIENIONYM kodzie`,
  );
}

const PODSUMOWANIE = process.env.GITHUB_STEP_SUMMARY;
if (PODSUMOWANIE) {
  const wiersze = pozorne
    .map(
      (p) =>
        `| \`${p.trasa}\` | ${p.etykieta} | ${fmt(p.wartosc, p)} | ${fmt(p.prog, p)} | ` +
        `${fmt(p.zapas, p)} | **${fmt(p.rozrzut, p)}** |`,
    )
    .join("\n");
  appendFileSync(
    PODSUMOWANIE,
    `\n### ⚠ Margines pozorny — ${pozorne.length} przypadk(ów)\n\n` +
      "Trasa stoi pod progiem, ale **rozrzut przebiegów przekracza zapas**: " +
      "o werdykcie decyduje losowanie przebiegu, nie stan strony. " +
      "Ta zieleń spadnie przy niezmienionym kodzie.\n\n" +
      "| trasa | metryka | werdykt | próg | zapas | rozrzut |\n" +
      "|---|---|---:|---:|---:|---:|\n" +
      `${wiersze}\n`,
  );
}

console.log("");
console.log(
  `✖ ${pozorne.length} margines(ów) pozornych. Werdykt bramki wydajności\n` +
    "  jest w tych trasach niepowtarzalny — liczba mówi o wylosowanym\n" +
    "  przebiegu, nie o stronie.",
);
console.log(KRESKA);
console.log("");
process.exit(1);
