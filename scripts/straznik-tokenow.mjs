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
const LICZBA_ROL = 25;
const nazwyRol = Object.keys(role);
if (nazwyRol.length !== LICZBA_ROL) {
  bledy.push(
    `KOMPLETNOŚĆ: odczytano ${nazwyRol.length} ról o wartości barwnej, ADR-032 wylicza ${LICZBA_ROL}. ` +
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

/* ─── WARSTWA INWERSJI (ADR-032) ───────────────────────────────
   Dołożone razem z sześcioma rolami. Bez tych par nowe role byłyby
   w zbiorze, ale POZA sprawdzaniem — czyli dokładnie furtka, przed
   którą broni kanon („wyłączenie ze sprawdzania ma własnego strażnika
   liczebności"). Zasięg par idzie za tym, co NAPRAWDĘ występuje
   w kompozycji z referencji `glowna-natura.html`:
   złoty CTA stoi wyłącznie na espresso (hero, zamknięcie), a na
   oliwkowym brązie CTA jest grafitowe — dlatego pary
   `interakcja-inwersji × tlo-inwersji-2` tu NIE MA. Gdyby złoty CTA
   trafił kiedyś na oliwkę, miałby 1,46:1 i ta para musi wtedy wejść. */
const PARY_INWERSJI = [
  ["tekst-na-inwersji",    "tlo-inwersji",        4.5, "proza na espresso"],
  ["tekst-2-na-inwersji",  "tlo-inwersji",        4.5, "tekst drugorzędny na espresso"],
  ["tekst-na-inwersji",    "tlo-inwersji-2",      4.5, "proza na oliwkowym brązie"],
  ["tekst-2-na-inwersji",  "tlo-inwersji-2",      4.5, "tekst drugorzędny na oliwkowym"],
  ["tekst-na-inwersji",    "interakcja-inwersji", 4.5, "etykieta na złotym CTA"],
  ["tekst-na-inwersji",    "interakcja",          4.5, "etykieta na grafitowym CTA (stopka, filary)"],
  ["akcent-na-inwersji",   "tlo-inwersji",        3.0, "złoto jasne na espresso"],
  ["akcent-na-inwersji",   "tlo-inwersji-2",      3.0, "złoto jasne na oliwkowym"],
];
for (const [a, b, prog, opis] of PARY_INWERSJI) {
  if (!role[a] || !role[b]) { bledy.push(`BRAK ROLI: --${a} lub --${b} (${opis})`); continue; }
  const w = kontrast(role[a], role[b]);
  if (w < prog) {
    bledy.push(`KONTRAST (inwersja): --${a} na --${b} = ${w.toFixed(2)}:1, wymagane ${prog}:1 — ${opis}`);
  }
}

/* GRANICA ZŁOTEGO CTA — sprawdzana OSOBNO, bo nie jest parą kontrastu,
   tylko warunkiem istnienia mechanizmu. Samo wypełnienie ma wobec
   espresso 2,67:1, czyli poniżej 3:1 z WCAG 1.4.11, i doborem złota
   nie da się tego naprawić: przy jasnej etykiecie okno luminancji nie
   istnieje (wymagane L ≥ 0,1598 i L ≤ 0,1524). Granicę niesie więc
   OBWÓDKA, a ten strażnik pilnuje, żeby barwa obwódki dawała 3:1
   wobec obu stron. Gdyby ktoś zdjął obwódkę z CTA, tego ten strażnik
   NIE wykryje — od tego jest e2e/kontrast-stanow.spec.ts; tutaj
   pilnowana jest WYKONALNOŚĆ mechanizmu, nie jego obecność. */
if (role["tekst-na-inwersji"] && role["interakcja-inwersji"] && role["tlo-inwersji"]) {
  const doTla = kontrast(role["tekst-na-inwersji"], role["tlo-inwersji"]);
  const doWypelnienia = kontrast(role["tekst-na-inwersji"], role["interakcja-inwersji"]);
  if (doTla < 3.0 || doWypelnienia < 3.0) {
    bledy.push(
      `GRANICA CTA: obwódka w --tekst-na-inwersji ma ${doTla.toFixed(2)}:1 wobec espresso ` +
        `i ${doWypelnienia.toFixed(2)}:1 wobec wypełnienia; 1.4.11 wymaga 3:1 wobec OBU — ` +
        `bez tego złoty CTA nie ma perceptowalnej granicy`
    );
  }
}

/* Stany: każdy musi być czytelny na powierzchni. */
for (const s of ["stan-sukces", "stan-ostrzezenie", "stan-blad"]) {
  if (!role[s]) { bledy.push(`BRAK ROLI: --${s}`); continue; }
  const w = kontrast(role[s], role["powierzchnia"]);
  if (w < 4.5) bledy.push(`KONTRAST: --${s} na --powierzchnia = ${w.toFixed(2)}:1, wymagane 4.5:1`);
}

/* ─── ROZDZIAŁ KARTY OD TŁA — REGUŁA DWUMECHANIZMOWA (ADR-033) ──
   „Kartę odcina PLAMA ≥ 1,30 ALBO KRESKA ≥ 1,30 — jeden z dwóch,
   MIERZONY." Rozstrzygnięcie właściciela `WWW/041`, krok 1.

   DLACZEGO DWA MECHANIZMY, A NIE POLUZOWANIE PROGU. Do 2026-08-26
   reguła znała jeden sposób: różnicę jasności wypełnień. Wystarczał
   w palecie „kancelaria", gdzie karta była biała na owsianym tle.
   W palecie „natura" (ADR-032) tło to krem #f0efe8 i przy tej jasności
   progu 1,30 NIE DA SIĘ osiągnąć żadną powierzchnią — czysta biel daje
   1,153. Ograniczeniem jest jasność TŁA, nie dobór karty, a tło jest
   decyzją właściciela z oglądu i pozostaje nietykalne.

   Reguła nie została więc rozluźniona: PRÓG ZOSTAJE 1,30, zmienia się
   to, CO wolno zmierzyć. Rozdział niosą w tej palecie dwie różne
   rzeczy w zależności od powierzchni — i obie są sprawdzane, więc
   zniknięcie OBU dalej daje czerwień. Osłabieniem byłoby sprawdzanie
   tylko tej, która akurat przechodzi.

   ZASIĘG PO OBU STRONACH. Karty stoją także na tonach ciemnych
   (kremowe karty na espresso i oliwce), gdzie mechanizm jest odwrotny
   niż na jasnym: plama robi wszystko, a kreska bywa niewidoczna.
   Zmierzone 2026-08-26 na `e6f8134` — każda powierzchnia przechodzi
   INNYM mechanizmem, co jest najlepszym dowodem, że jeden by nie
   wystarczył:
     krem   → plama 1,08 ✘ · kreska 1,31 ✔
     espresso → plama 14,04 ✔ · kreska 1,83 ✔
     oliwka   → plama 7,65 ✔ · kreska 1,00 ✘ (kreska = tło)

   KRESKA NA TONACH CIEMNYCH to `tlo-inwersji-2` — tak przemapowuje ją
   blok `[data-ton]` w globals.css. Strażnik czyta wartości tokenów,
   nie kaskadę, więc to przypisanie jest tu wpisane WPROST; gdyby blok
   tonów zmienił mapowanie, ta tabela musi pójść razem z nim. */
const PROG_ROZDZIALU = 1.3;
const POWIERZCHNIE_KART = [
  { tlo: "tlo-strony",     kreska: "kreska",         opis: "karta na kremie (warstwa jasna)" },
  { tlo: "tlo-inwersji",   kreska: "tlo-inwersji-2", opis: "karta kremowa na espresso (ton ciemny)" },
  { tlo: "tlo-inwersji-2", kreska: "tlo-inwersji-2", opis: "karta kremowa na oliwce (ton ciemny-oliwka)" },
];
for (const { tlo, kreska, opis } of POWIERZCHNIE_KART) {
  if (!role["powierzchnia"] || !role[tlo] || !role[kreska]) {
    bledy.push(`BRAK ROLI przy rozdziale karty: --powierzchnia, --${tlo} lub --${kreska} (${opis})`);
    continue;
  }
  const plama = kontrast(role["powierzchnia"], role[tlo]);
  const linia = kontrast(role[kreska], role[tlo]);
  const najmocniejszy = Math.max(plama, linia);
  if (Number(najmocniejszy.toFixed(2)) < PROG_ROZDZIALU) {
    bledy.push(
      `ROZDZIAŁ KARTY: ${opis} — plama ${plama.toFixed(2)}:1 ORAZ kreska ${linia.toFixed(2)}:1, ` +
        `oba poniżej ${PROG_ROZDZIALU.toFixed(2)}:1. Karta nie odcina się od tła ŻADNYM mechanizmem.`
    );
  }
}

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
        && !/::marker|text-decoration/.test(kontekst)) {
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
