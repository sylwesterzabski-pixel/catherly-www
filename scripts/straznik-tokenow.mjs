#!/usr/bin/env node
/* ============================================================
   Bramka: STRAŻNIK TOKENÓW — pilnuje decyzji ADR-031 na WARTOŚCIACH.

   Powstał, bo reguły palety zapisane słowami nie przetrwały. Wzorzec
   źródłowy jest w tym repozytorium i jest mierzony, nie opowiedziany:
   w bloku eksperymentu palety reguła „fokus nigdy nie używa akcentu"
   była **spełniona z nazwy i złamana z wartości** — role `fokus`,
   `akcent` i `interakcja` miały tę samą limonkę, więc obwódka fokusu
   na przycisku CTA miała kontrast 1:1 i osoba nawigująca klawiaturą
   traciła z pola widzenia jedyne CTA konwersji na stronie.

   Sprawdza:
     0. czy KOMPLET 19 ról w ogóle istnieje  (patrz LICZBA_ROL niżej)
     1. kontrasty par ról wobec progów WCAG 2.x
     1b. rozdział karty od tła — plama ALBO kreska (ADR-033)
     2. rozdzielność fokus / akcent / interakcja        (R-AKCENT-02)
     3. czy akcent nie niesie tekstu w regułach CSS     (R-AKCENT-01)
     4. czy nie wróciła limonka i waga 100

   Wdrożony: zlecenie WWW/038-bis, korekta K6, 2026-08-26.
   Rodowód: 05-straznik-tokenow.mjs z paczki zewnętrznej, przepisany
   pod realia tego repozytorium — różnice wypisane niżej, żeby nikt
   nie musiał ich odgadywać z diffa.

   ┌────────────────────────────────────────────────────────────────┐
   │ SKĄD CZYTA WARTOŚCI — I DLACZEGO STĄD, a nie z tokens.json.    │
   │ K6 zostawiło ten wybór wykonawcy z obowiązkiem zapisania go.   │
   │                                                                │
   │ Czyta PLIK GENEROWANY (src/styles/generated/tokeny.css), bo to │
   │ jest artefakt, który dostaje przeglądarka. design/tokens.json  │
   │ opisuje ZAMIAR; gdyby generator się zepsuł albo ktoś tknął     │
   │ plik wynikowy ręcznie, strażnik czytający źródło byłby na to   │
   │ ślepy i świeciłby na zielono przy złych barwach na stronie.    │
   │ To ta sama różnica co „wynikanie z kodu to nie pomiar".        │
   │                                                                │
   │ Koszt tego wyboru: plik generowany niesie odwołania            │
   │ (`--kolor-rola-tlo-strony: var(--kolor-tlo)`), bo konfiguracja │
   │ ma outputReferences: true. Dlatego strażnik ROZWIĄZUJE łańcuch │
   │ var() zamiast zakładać, że po dwukropku stoi hex — założenie   │
   │ z oryginału paczki dawałoby tutaj ciche „BRAK ROLI".           │
   └────────────────────────────────────────────────────────────────┘

   Różnice wobec wersji z paczki, wszystkie wymuszone realiami repo:
     · nazwy ról mają przedrostek `--kolor-rola-` (14 nazw było
       niezmienionych od Etapu B i komponenty ich używają);
     · katalog CSS to `src`, nie `app`;
     · dochodzi sprawdzenie 0 (kompletność) — bez niego rola usunięta
       albo przemianowana wypadałaby ze sprawdzania po cichu, o ile
       nie stoi akurat w którejś parze;
     · sprawdzenie wagi 100 odróżnia UŻYCIE (`font-weight: 100;`) od
       ZAKRESU OSI fontu zmiennego (`font-weight: 100 900;` w
       @font-face, nakazane przez K2). Wersja z paczki zapalałaby się
       na tym drugim — byłby to fałszywy alarm, a strażnik nadgorliwy
       przestaje być czytany.

   Użycie:  node scripts/straznik-tokenow.mjs [ścieżka/do/tokeny.css]
   ============================================================ */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const PLIK_TOKENOW = process.argv[2] ?? "src/styles/generated/tokeny.css";
const KATALOG_CSS = "src";
const PRZEDROSTEK = "--kolor-rola-";

/* ─── kontrast WCAG 2.x ─────────────────────────────────────── */
const kanal = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
const luminancja = (hex) => {
  const h = hex.replace("#", "");
  const p = h.length === 3 ? h.split("").map((c) => c + c) : h.match(/.{2}/g);
  const [r, g, b] = p.map((x) => kanal(parseInt(x, 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const kontrast = (a, b) => {
  const x = luminancja(a), y = luminancja(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

/* ─── odczyt ról z pliku generowanego, z rozwiązaniem var() ──── */
if (!existsSync(PLIK_TOKENOW)) {
  console.error(`✗ Brak ${PLIK_TOKENOW} — uruchom najpierw \`npm run tokeny:build\`.`);
  console.error("\nStrażnik tokenów: bramka CZERWONA.");
  process.exit(1);
}
const zrodlo = readFileSync(PLIK_TOKENOW, "utf8");

/** Wszystkie zmienne z pliku — także bazowe, bo do nich prowadzą odwołania. */
const surowe = new Map();
for (const m of zrodlo.matchAll(/^\s*(--[a-z0-9-]+):\s*([^;]+);/gim)) {
  surowe.set(m[1], m[2].trim());
}

/** Rozwiązuje `var(--x)` w łańcuchu. Cykl kończy się błędem, nie pętlą. */
function rozwiaz(nazwa, widziane = new Set()) {
  if (widziane.has(nazwa)) return null;
  widziane.add(nazwa);
  const v = surowe.get(nazwa);
  if (v === undefined) return null;
  const odwolanie = v.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/i);
  if (odwolanie) return rozwiaz(odwolanie[1], widziane);
  return /^#[0-9a-f]{3,8}$/i.test(v) ? v.toUpperCase() : null;
}

const role = {};
for (const nazwa of surowe.keys()) {
  if (!nazwa.startsWith(PRZEDROSTEK)) continue;
  const wartosc = rozwiaz(nazwa);
  if (wartosc) role[nazwa.slice(PRZEDROSTEK.length)] = wartosc;
}

const bledy = [];
const ostrzezenia = [];

/* ─── 0. KOMPLETNOŚĆ ──────────────────────────────────────────
   LICZBA_ROL jest literałem CELOWO i jest MECHANIZMEM, nie dryfem.
   Rozstrzyga o tym jedno pytanie z kanonu: czy zmiana tej liczby ma
   być DECYZJĄ. Ma — ADR-031 wylicza dokładnie 19 ról z wartościami
   i uzasadnieniem każdej, a dołożenie kolejnej albo skasowanie
   którejś jest zmianą systemu barw, nie porządkiem. Gdyby liczba
   pochodziła z pliku, nowa rola weszłaby do palety BEZ decyzji
   i bez przeliczenia kontrastów — czyli strażnik straciłby to,
   po co istnieje. Czerwień na tej liczbie jest sygnałem „ktoś rusza
   rzecz wymagającą ADR-a", a nie usterką do wyciszenia.
   ─────────────────────────────────────────────────────────────── */
const LICZBA_ROL = 19;
const nazwyRol = Object.keys(role);
if (nazwyRol.length !== LICZBA_ROL) {
  bledy.push(
    `KOMPLETNOŚĆ: odczytano ${nazwyRol.length} ról o wartości barwnej, ADR-038 wylicza ${LICZBA_ROL}. ` +
      `Odczytane: ${nazwyRol.sort().join(", ")}. ` +
      `Zmiana liczby ról wymaga ADR-a — jeśli decyzja zapadła, zmień LICZBA_ROL razem z nim.`
  );
}

/* ─── 1. progi kontrastu ────────────────────────────────────── */
const PARY = [
  ["tekst-podstawowy",    "tlo-strony",   4.5, "tekst czytany na tle strony"],
  ["tekst-podstawowy",    "powierzchnia", 4.5, "tekst czytany na karcie"],
  ["tekst-drugorzedny",   "tlo-strony",   4.5, "tekst drugorzędny na tle strony"],
  ["tekst-na-interakcji", "interakcja",   4.5, "etykieta na przycisku CTA"],
  ["interakcja",          "tlo-strony",   3.0, "plama przycisku CTA na tle"],
  ["kreska-mocna",        "powierzchnia", 3.0, "obrys pola formularza"],
  ["fokus",               "tlo-strony",   3.0, "obwódka fokusu na tle strony"],
];

for (const [a, b, prog, opis] of PARY) {
  if (!role[a] || !role[b]) { bledy.push(`BRAK ROLI: --${a} lub --${b} (${opis})`); continue; }
  const w = kontrast(role[a], role[b]);
  if (w < prog) {
    bledy.push(`KONTRAST: --${a} na --${b} = ${w.toFixed(2)}:1, wymagane ${prog}:1 — ${opis}`);
  }
}

/* ─── WARSTWA INWERSJI — PARY USUNIĘTE 2026-08-26 (ADR-038) ─────
   Stało tu osiem par kontrastu warstwy inwersji plus sprawdzenie
   wykonalności obwódki złotego CTA. Zniknęły razem z rolami: wzorzec
   jest jednolicie ciemny, więc inwersji nie ma. Gdyby wróciła, wracają
   z nią pary — rola bez pary jest w zbiorze, ale poza sprawdzaniem,
   czyli dokładnie furtką, przed którą broni sprawdzenie 0. */

/* Stany: każdy musi być czytelny na powierzchni. */
for (const s of ["stan-sukces", "stan-ostrzezenie", "stan-blad"]) {
  if (!role[s]) { bledy.push(`BRAK ROLI: --${s}`); continue; }
  const w = kontrast(role[s], role["powierzchnia"]);
  if (w < 4.5) bledy.push(`KONTRAST: --${s} na --powierzchnia = ${w.toFixed(2)}:1, wymagane 4.5:1`);
}

/* ─── ROZDZIAŁ KARTY — PRZENIESIONY DO WARSTWY E2E (ADR-038) ────
   Reguła dwumechanizmowa z ADR-033 („plama ALBO kreska ≥ 1,30") stała
   tutaj i liczyła WARTOŚCI TOKENÓW. Od ADR-038 mechanizmów jest trzy,
   a trzeci — KOMPOZYCJA (odstęp między kartami, promień) — jest
   własnością UKŁADU, nie palety. Strażnik tokenów nie ma jak go
   zmierzyć: nie widzi ani `gap`, ani geometrii siatki.

   Zostawienie tu dwóch mechanizmów z trzech dałoby czerwień na stanie
   POPRAWNYM (wzorzec nie obrysowuje kart i rozdziela je przestrzenią),
   a więc strażnika nadgorliwego, którego po tygodniu nikt nie czyta.
   Zostawienie tu reguły „przymkniętej" dałoby ciszę na stanie ZŁYM.

   Dlatego cała reguła — wszystkie trzy mechanizmy — mieszka teraz
   w `e2e/rozdzial-kart.spec.ts`, gdzie mierzy się ją na WYRENDEROWANEJ
   stronie i widać zarówno barwy, jak i odstępy. Próg 1,30 i odstęp
   30 px (zmierzony we wzorcu) bez zmiany. */

/* Akcent jest dekoracją, ale poniżej 3:1 przestaje być widoczny jako punktor. */
if (role["akcent"] && role["tlo-strony"]) {
  const w = kontrast(role["akcent"], role["tlo-strony"]);
  if (w < 3.0) ostrzezenia.push(`AKCENT: --akcent na tle = ${w.toFixed(2)}:1 — punktory będą niewidoczne`);
}

/* ─── 2. rozdzielność ról (R-AKCENT-02) ─────────────────────── */
const ROZDZIELNE = [["fokus", "akcent"], ["fokus", "interakcja"], ["akcent", "interakcja"]];
for (const [a, b] of ROZDZIELNE) {
  if (role[a] && role[b] && role[a] === role[b]) {
    bledy.push(`ROZDZIELNOŚĆ: --${a} i --${b} mają tę samą wartość ${role[a]} — R-AKCENT-02`);
  }
}

/* ─── R-AKCENT-03: akcent na fragmencie nagłówka (ADR-033) ─────
   ROZGRANICZENIE, bo bez niego R-AKCENT-01 i R-AKCENT-03 wyglądają
   na sprzeczne: R-AKCENT-01 obowiązuje BEZ ZMIAN dla tekstu
   AKAPITOWEGO, R-AKCENT-03 dopuszcza akcent na SPÓJNYM FRAGMENCIE
   NAGŁÓWKA — pod dwoma warunkami łącznie: rozmiar dużego tekstu wg
   WCAG i kontrast ≥ 3:1 na SWOJEJ powierzchni. Przy dużym tekście
   WCAG 1.4.3 stawia próg 3:1, więc zmienia się próg, nie rygor.

   Strażnik pilnuje tu WARUNKU BARWNEGO. Rozmiaru nie mierzy — nie ma
   go w wartościach tokenów; pilnuje go `e2e/kontrast-stanow.spec.ts`
   przez próg zależny od rozmiaru na wyrenderowanej stronie. To jest
   granica tego sprawdzenia i dlatego stoi wypisana.

   POWIERZCHNIE OBJĘTE: te, na których nagłówek FAKTYCZNIE stoi.
   `powierzchnia-akcentowa` jest tu celowo — akcent ma na niej 2,94:1
   i dlatego nagłówek sekcji rytmu akcentu NIE DOSTAŁ. Gdyby ktoś go
   tam wstawił, ta pozycja ma zapalić czerwień, a nie milczeć. */
const KLASA_AKCENTU_NAGLOWKA = "akcent-naglowka";
const PARY_AKCENTU_NAGLOWKA = [
  ["akcent",             "tlo-strony",             "fragment nagłówka na tle strony"],
  ["akcent",             "powierzchnia",           "fragment nagłówka na karcie"],
  ["akcent",             "powierzchnia-2",         "fragment nagłówka na pasie sekcyjnym"],
  /* Pary inwersji usunięte 2026-08-26 razem z rolami (ADR-038) —
     wzorzec jest jednolicie ciemny, więc nie ma czego odwracać. */
];
const PROG_AKCENTU_NAGLOWKA = 3.0;
for (const [a, b, opis] of PARY_AKCENTU_NAGLOWKA) {
  if (!role[a] || !role[b]) { bledy.push(`BRAK ROLI: --${a} lub --${b} (${opis})`); continue; }
  const w = kontrast(role[a], role[b]);
  if (w < PROG_AKCENTU_NAGLOWKA) {
    bledy.push(
      `R-AKCENT-03: --${a} na --${b} = ${w.toFixed(2)}:1, wymagane ${PROG_AKCENTU_NAGLOWKA.toFixed(1)}:1 — ${opis}`
    );
  }
}
/* Powierzchnia akcentowa NIE jest na liście wyżej i to jest decyzja,
   nie przeoczenie: akcent ma na niej 2,94:1, więc nagłówka w akcencie
   tam być NIE MOŻE. Zamiast dopuszczać wyjątek, strażnik pilnuje, żeby
   nikt nie liczył na to, że się zmieści. */
if (role["akcent"] && role["powierzchnia-akcentowa"]) {
  const w = kontrast(role["akcent"], role["powierzchnia-akcentowa"]);
  if (w >= PROG_AKCENTU_NAGLOWKA) {
    ostrzezenia.push(
      `R-AKCENT-03: --akcent na --powierzchnia-akcentowa urósł do ${w.toFixed(2)}:1 — ` +
        `nagłówek w akcencie na tej powierzchni PRZESTAŁ być zakazany, można wrócić do pozycji z WWW/041 krok 3`
    );
  }
}

/* ─── 3. akcent nie niesie tekstu + 4. powroty ──────────────── */
const plikiCss = [];
const zbierz = (dir) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) zbierz(p);
    else if (extname(p) === ".css") plikiCss.push(p);
  }
};
try { zbierz(KATALOG_CSS); } catch { /* katalog może nie istnieć w innym układzie repo */ }

/* KONTEKST SELEKTORA, NIE SAMA LINIA — naprawa defektu wykrytego przy
   pierwszym przebiegu tego strażnika (2026-08-26).

   Wersja z paczki sprawdzała wyjątek `::marker` w TEJ SAMEJ linii, co
   deklaracja `color`. W tym repozytorium reguły są łamane na wiele linii:

       .konkrety li::marker {      ← tu stoi ::marker
         color: var(--kolor-rola-akcent);   ← a tu deklaracja

   więc wyjątek nigdy się nie trafiał i strażnik zgłaszał trzy fałszywe
   naruszenia R-AKCENT-01 na regułach, które tę regułę SPEŁNIAJĄ. To jest
   klasa „grep czyta liniami": fraza złamana na dwie przestaje istnieć dla
   narzędzia, które ogląda linię naraz. Dlatego niżej pamiętany jest
   ostatni selektor otwierający blok. */
for (const p of plikiCss) {
  const tresc = readFileSync(p, "utf8").split("\n");
  let selektor = "";
  tresc.forEach((linia, i) => {
    const otwarcie = linia.match(/^([^{}]*)\{\s*$/);
    if (otwarcie) selektor = otwarcie[1].trim();
    else if (/^\s*\}/.test(linia)) selektor = "";

    const kontekst = `${selektor}\n${linia}`;
    if (new RegExp(`(^|[^-])color:\\s*var\\(${PRZEDROSTEK}akcent\\)`).test(linia)
        && !/::marker|text-decoration/.test(kontekst)
        && !new RegExp(KLASA_AKCENTU_NAGLOWKA).test(kontekst)) {
      bledy.push(`R-AKCENT-01: ${p}:${i + 1} — --akcent użyty jako kolor tekstu (selektor: ${selektor || "?"})`);
    }
    if (/#a3e635|#c7f04a|#d4f55c/i.test(linia)) {
      bledy.push(`LIMONKA: ${p}:${i + 1} — kolor z usuniętej palety`);
    }
    /* Waga 100 jako UŻYCIE, nie jako zakres osi fontu zmiennego.
       `font-weight: 100 900` w @font-face deklaruje, co plik potrafi,
       i jest nakazane przez K2; `font-weight: 100` wybiera wagę
       usuniętą ze skali (ADR-031). Wzorzec wymaga końca deklaracji
       zaraz po liczbie, więc odróżnia jedno od drugiego. */
    if (/font-weight:\s*100\s*(;|$|!)/.test(linia)) {
      bledy.push(`WAGA 100: ${p}:${i + 1} — usunięta ze skali (ADR-031)`);
    }
  });
}

/* ─── wynik ─────────────────────────────────────────────────── */
console.log(`Strażnik tokenów — odczytano ${nazwyRol.length} ról z ${PLIK_TOKENOW}`);
console.log(`  zakres: wartości ról + ${plikiCss.length} arkuszy w ${KATALOG_CSS}/`);
for (const o of ostrzezenia) console.log("  ostrzeżenie: " + o);
if (bledy.length) {
  console.error(`\n${bledy.length} błąd(ów):`);
  for (const b of bledy) console.error("  " + b);
  console.error("\nStrażnik tokenów: bramka CZERWONA.");
  process.exit(1);
}
console.log("  wszystkie reguły spełnione");
console.log(
  "  CZEGO NIE SPRAWDZA, żeby zieleń nie była czytana szerzej: par ról spoza listy\n" +
    "  (np. akcent × powierzchnia-akcentowa = 2,53:1 — granica opisana w ADR-031),\n" +
    "  barw wyliczonych na stronie (od tego jest e2e/kontrast-stanow.spec.ts)\n" +
    "  ani tego, czy rola jest UŻYWANA zgodnie ze swoim przeznaczeniem."
);
