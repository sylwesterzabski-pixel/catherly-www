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
     0. czy KOMPLET 20 ról w ogóle istnieje  (patrz LICZBA_ROL niżej)
     1. kontrasty par ról wobec progów WCAG 2.x
     1b. rozdział karty od tła — PRZENIESIONE do e2e (ADR-038)
     2. akcent na każdej powierzchni ≥ 4,5:1            (R-AKCENT-01)
     3a. etykieta na polu akcentu ≥ 4,5:1            (R-AKCENT-02a)
     3b. obwódka fokusu wobec powierzchni ≥ 3:1      (R-AKCENT-02b)
     4. czy nie wróciła limonka i waga 100

   ⚠ Punkty 2–3 mierzą KONTRAST, a do 2026-08-26 zakazywały BARWY
   (ADR-039). Nagłówek wyżej opisuje przypadek źródłowy z JASNEJ palety;
   zostaje, bo to nadal ten sam cel — zmienił się tylko mechanizm.

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
const KSZTALT_HEX = /^#[0-9a-f]{3,8}$/i;
const kontrast = (a, b) => {
  /* ODMOWA ZAMIAST CICHEJ LICZBY. Gdyby tu wpadła barwa z alfą, wzór
     policzyłby ją tak, jakby była nieprzezroczysta — i zwrócił liczbę
     wyglądającą na pomiar. Rzucenie zatrzymuje bramkę z nazwą
     przyczyny; NaN albo wartość zmyślona przeszłyby dalej. */
  for (const v of [a, b])
    if (!KSZTALT_HEX.test(String(v)))
      throw new Error(
        `kontrast(): wartość „${v}" nie jest zapisem szesnastkowym. ` +
          "Barwy z alfą nie mają kontrastu bez wiedzy o tle — mierzy je " +
          "sonda rastrowa w e2e/kontrast-stanow.spec.ts (ADR-045)."
      );
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
  if (/^#[0-9a-f]{3,8}$/i.test(v)) return v.toUpperCase();
  /* ROLA Z ALFĄ (ADR-045). Rozpoznawana, żeby LICZYŁA SIĘ DO KOMPLETU —
     bez tego nowa rola byłaby dla punktu 0 niewidzialna i strażnik
     meldowałby brak, choć rola istnieje. Zwracana w postaci surowej;
     `kontrast()` niżej ODMAWIA jej przyjęcia, bo kontrast barwy
     półprzezroczystej zależy od tego, co pod nią leży, a tego strażnik
     tokenów nie wie. Mierzy to sonda rastrowa w e2e. */
  if (/^rgba?\([\d\s.,%/]+\)$/i.test(v)) return v.replace(/\s+/g, " ").trim();
  return null;
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
const LICZBA_ROL = 28;
const nazwyRol = Object.keys(role);
if (nazwyRol.length !== LICZBA_ROL) {
  bledy.push(
    `KOMPLETNOŚĆ: odczytano ${nazwyRol.length} ról o wartości barwnej, ADR-050 wylicza ${LICZBA_ROL}. ` +
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
  /* KORPUS JASNY (ADR-049). Role weszły bez użycia — decyzja
     właściciela WWW/074 pkt 1g — ale pary wchodzą OD RAZU. Rola bez
     pary jest w zbiorze i poza sprawdzaniem, czyli dokładnie furtką,
     przed którą broni sprawdzenie 0. */
  ["tekst-na-jasnym",     "powierzchnia-jasna", 4.5, "tekst czytany na korpusie jasnym"],
  ["tekst-2-na-jasnym",   "powierzchnia-jasna", 4.5, "tekst drugorzędny na korpusie jasnym"],
  ["tekst-na-jasnym",     "powierzchnia-karty-na-jasnym", 4.5, "tekst na karcie korpusu jasnego"],
  ["tekst-2-na-jasnym",   "powierzchnia-karty-na-jasnym", 4.5, "tekst drugorzędny na karcie korpusu jasnego"],
  ["akcent-na-jasnym",    "powierzchnia-jasna", 4.5, "fragment nagłówka w akcencie na korpusie jasnym"],
  ["akcent-na-jasnym",    "powierzchnia-karty-na-jasnym", 4.5, "akcent niosący tekst na karcie korpusu jasnego"],
];

/* ─── WYŁĄCZENIA Z PAR — Z WŁASNYM LICZNIKIEM ──────────────────
   Kanon: „wyłączenie ze sprawdzania ma własnego strażnika liczebności".
   Bez tego licznika nowa rola może wpaść w lukę między „sprawdzana"
   a „wyłączona" i zniknąć — a wyłączenie może przeżyć rolę, której
   dotyczyło. Dwa wymogi: sprawdzane + wyłączone = komplet ról, oraz
   każda wyłączona rola nadal w komplecie istnieje.

   Do 2026-09-03 wyłączona była JEDNA rola i licznika nie było, bo
   przy jednej pozycji luka jest widoczna gołym okiem. Od ADR-049 są
   DWIE — i to jest moment, w którym napis przestaje wystarczać. */
const ROLE_BEZ_PARY = {
  "tlo-przezroczyste":
    "alfa — kontrast liczy się na barwie wynikowej, mierzy go sonda rastrowa w e2e (ADR-045)",
  "powierzchnia-szklo":
    "alfa — j.w.; płyta szkła leży na różnych powierzchniach (ADR-049)",
  "powierzchnia-2":
    "powierzchnia pomocnicza — pary niosą jej sąsiadki, nie ma własnej roli tekstowej",
  "powierzchnia-akcentowa":
    "j.w. — separator i pole wyróżnione, nie nosi prozy",
  "kreska":
    "dekoracja — próg 1,30 z ADR-038 mierzy e2e/rozdzial-kart, nie ten strażnik",
  "link":
    "równa tekst-podstawowy; recepta podkreślenia pilnowana przez e2e/podkreslenia",
  "obrys-cta-na-jasnym":
    "pokryty przez R-AKCENT-01b — obrys sprawdzany wobec powierzchni ORAZ wobec akcentu, który otacza",
  "fokus-na-jasnym":
    "pokryty przez R-AKCENT-02(b) — obwódka fokusu na powierzchni jasnej",
  "akcent":
    "pokryty przez R-AKCENT-01 — osobna pętla po WSZYSTKICH powierzchniach, surowsza niż jedna para",
  "link-aktywny":
    "równa akcent — pokryte przez R-AKCENT-01 na wszystkich powierzchniach",
  "interakcja-aktywna":
    "pokryta przez R-AKCENT-02(a) razem z etykietą",
  "stan-sukces": "pokryty osobną pętlą stanów niżej",
  "stan-ostrzezenie": "j.w.",
  "stan-blad": "j.w.",
  "stan-wylaczony":
    "stan nieaktywny — z definicji stłumiony, próg 4,5 go nie dotyczy (WCAG 1.4.3)",
  "powierzchnia-jasna":
    "występuje jako TŁO w parach korpusu jasnego, nie jako barwa mierzona",
  "powierzchnia-karty-na-jasnym":
    "j.w. — tło par kartowych korpusu jasnego; własnej plamy pilnuje e2e/rozdzial-kart (kompozycja)",
  "tlo-strony":
    "występuje jako TŁO w parach, nie jako barwa mierzona",
  "powierzchnia":
    "j.w. — tło par tekstowych i stanów",
};

const wPARACH = new Set(PARY.flatMap(([a, b]) => [a, b]));
const wyłączone = Object.keys(ROLE_BEZ_PARY);
const pokryte = new Set([...wPARACH, ...wyłączone]);
const nieObjete = nazwyRol.filter((r) => !pokryte.has(r));
if (nieObjete.length) {
  bledy.push(
    `LUKA W POKRYCIU: role ani w PARY, ani w ROLE_BEZ_PARY: ${nieObjete.sort().join(", ")}. ` +
      `Każda rola musi być albo sprawdzana, albo JAWNIE wyłączona z powodem.`
  );
}
const wyłączoneWidma = wyłączone.filter((r) => !role[r]);
if (wyłączoneWidma.length) {
  bledy.push(
    `WYŁĄCZENIE PRZETERMINOWANE: ${wyłączoneWidma.sort().join(", ")} — ` +
      `wyłączenie opisuje rolę, której już nie ma. Usuń je razem z rolą.`
  );
}

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

/* OSTRZEŻENIE „akcent poniżej 3:1 na tle" USUNIĘTE (ADR-039) — nie
   dlatego, że przestało być prawdą, tylko dlatego, że przestało być
   OSIĄGALNE: R-AKCENT-01 niżej daje BŁĄD już poniżej 4,5:1 na tej samej
   parze, więc gałąź poniżej 3:1 nie wykona się nigdy. Zostawiona
   wyglądałaby jak druga warstwa ochrony, a była martwym kodem — czyli
   dokładnie tym, przed czym broni reguła „napis zamiast mechanizmu". */

/* ─── R-AKCENT-01 i R-AKCENT-02 PRZEPISANE (ADR-039) ───────────
   Do 2026-08-26 obie reguły zakazywały BARWY. Od ADR-039 obie mierzą
   KONTRAST — bo to kontrast był ich celem, a zakaz barwy tylko jego
   przybliżeniem, dobranym pod jasne tło.

   R-AKCENT-01 (było: „akcent NIGDY nie niesie tekstu"):
     akcent może nieść tekst i glify, jeśli kontrast na danej
     powierzchni wynosi ≥ 4,5:1 (tekst normalny) albo ≥ 3:1 (duży
     tekst i glify UI). Reguła powstała z pomiaru **2,87:1 na JASNYM
     tle**; na tle wzorca akcent ma 12,58:1, więc przeszkody nie ma.
     Zakaz barwy znika, POMIAR zostaje strażnikiem.

   R-AKCENT-03 ZNIKA jako osobna reguła — była słabszym przypadkiem
   tej samej rzeczy (fragment nagłówka ≥ 3:1). Próg 4,5 poniżej jest
   od niej surowszy, więc osobne sprawdzenie byłoby duplikatem, który
   przy zmianie progu rozjechałby się po cichu.

   R-AKCENT-02 (było: „fokus ≠ akcent ≠ interakcja"):
     wymóg rozdzielności trójki USUNIĘTY — `akcent == interakcja` to
     konstrukcja wzorca, nie nasz błąd. Cel reguły — żeby stany dało
     się rozróżnić — niosą teraz DWA CZŁONY, oba mierzone:
       (a) etykieta na polu akcentu jest CIEMNA i ma ≥ 4,5:1;
       (b) obwódka fokusu ma ≥ 3:1 wobec POWIERZCHNI, NA KTÓRĄ PADA.
     Człon (b) zapisuje mechanizm wprost: dzięki `outline-offset`
     obwódka pada na TŁO, nie na wypełnienie przycisku. Dlatego para
     fokus × interakcja (1,60:1) jest tu bez znaczenia i celowo NIE
     jest sprawdzana — sprawdzanie jej dawałoby czerwień na stanie
     poprawnym. Gdyby ktoś zdjął `outline-offset`, złapie to
     `e2e/kontrast-stanow.spec.ts`, nie ten strażnik. */
/* ✅ `powierzchnia-jasna` WESZŁA DO LISTY (ADR-050) — blokada z ADR-049
   zdjęta, ale NIE przez złagodzenie progu, tylko przez dodanie ról,
   których brakowało.

   Historia w dwóch krokach, zostawiona w całości, bo sam ten komentarz
   jest przykładem tego, co zapisuje się przy nierozstrzygniętej
   sprzeczności:
   (1) ADR-049: rola weszła do palety, ale POZA tę listę, bo dopisanie
       jej dałoby czerwień na stanie, w którym nic jeszcze nie było
       zepsute — korpusu jasnego nie było w żadnej sekcji. Liczby były
       już wtedy znane: akcent 1,43:1, fokus 1,12:1.
   (2) ADR-050: doszły dwie role — `obrys-cta-na-jasnym` (14,56:1)
       i `fokus-na-jasnym` (16,31:1) — i dopiero one czynią tę
       powierzchnię sprawdzalną. Lista rośnie o jedną pozycję i JEST
       ZIELONA, a nie wyciszona.

   ⚠ LISTA JEST LITERALNA, NIE CZERPANA ZE ZBIORU RÓL — i to zostaje.
   Zlecenie WWW/074 zakładało, że nowa powierzchnia wejdzie tu „z
   automatu"; nie wchodzi. Literał jest tu MECHANIZMEM: dodanie
   powierzchni do systemu ma wymagać ruszenia tej linii, bo każda nowa
   powierzchnia niesie pytanie „co na niej wolno akcentowi", a na to
   nie ma odpowiedzi wyprowadzalnej z samej wartości barwy. */
const POWIERZCHNIE = [
  "tlo-strony",
  "powierzchnia",
  "powierzchnia-2",
  "powierzchnia-akcentowa",
  "powierzchnia-jasna",
];
const PROG_AKCENT_TEKST = 4.5;
const PROG_FOKUS = 3.0;

/* ─── AKCENT: DWA REGULAMINY, ZALEŻNE OD POWIERZCHNI (ADR-050) ──
   Na powierzchniach ciemnych akcent MOŻE nieść tekst — ma tam 12,58:1.
   Na jasnej NIE MOŻE (1,43:1) i wolno mu tam być wyłącznie
   WYPEŁNIENIEM CTA Z OBRYSEM. Zamiast progu tekstowego sprawdzany jest
   więc OBRYS, bo to on niesie kształt kontrolki.

   Mapa wiąże powierzchnię z rolą obrysu. Powierzchnia bez wpisu podlega
   regule domyślnej (akcent musi umieć nieść tekst). */
const AKCENT_TYLKO_PLAMA = {
  "powierzchnia-jasna": "obrys-cta-na-jasnym",
};

for (const p of POWIERZCHNIE) {
  if (!role["akcent"] || !role[p]) { bledy.push(`BRAK ROLI: --akcent lub --${p}`); continue; }
  const w = kontrast(role["akcent"], role[p]);
  const rolaObrysu = AKCENT_TYLKO_PLAMA[p];

  if (!rolaObrysu) {
    if (w < PROG_AKCENT_TEKST) {
      bledy.push(
        `R-AKCENT-01: --akcent na --${p} = ${w.toFixed(2)}:1, wymagane ${PROG_AKCENT_TEKST}:1 — ` +
          `akcent nie może tam nieść tekstu`
      );
    }
    continue;
  }

  /* R-AKCENT-01b — powierzchnia z akcentem tylko jako plama.
     Sprawdzamy DWIE rzeczy, bo jedna bez drugiej jest furtką. */
  if (!role[rolaObrysu]) {
    bledy.push(`BRAK ROLI: --${rolaObrysu} (obrys CTA wymagany na --${p})`);
    continue;
  }
  const wObrys = kontrast(role[rolaObrysu], role[p]);
  if (wObrys < PROG_FOKUS) {
    bledy.push(
      `R-AKCENT-01b: obrys CTA --${rolaObrysu} na --${p} = ${wObrys.toFixed(2)}:1, ` +
        `wymagane ${PROG_FOKUS}:1 — bez tego wypełniony przycisk nie ma widocznej granicy`
    );
  }
  const wObrysDoAkcentu = kontrast(role[rolaObrysu], role["akcent"]);
  if (wObrysDoAkcentu < PROG_FOKUS) {
    bledy.push(
      `R-AKCENT-01b: obrys CTA --${rolaObrysu} wobec --akcent = ${wObrysDoAkcentu.toFixed(2)}:1, ` +
        `wymagane ${PROG_FOKUS}:1 — obrys musi odcinać się także od wypełnienia, które otacza`
    );
  }

  /* WYJĄTEK MA MIEĆ TERMIN WAŻNOŚCI. Gdyby akcent kiedyś przeszedł na
     tej powierzchni próg tekstowy (zmiana barwy akcentu albo
     powierzchni), wyjątek opisywałby problem, którego już nie ma —
     a wyjątek przeterminowany wygląda jak decyzja i chroni przed
     niczym. Ta sama klasa co „wyłączenie przeterminowane" wyżej. */
  if (w >= PROG_AKCENT_TEKST) {
    bledy.push(
      `WYJĄTEK ZBĘDNY: --akcent na --${p} = ${w.toFixed(2)}:1 ≥ ${PROG_AKCENT_TEKST}:1, ` +
        `więc akcent UMIE tam nieść tekst — zdejmij wpis z AKCENT_TYLKO_PLAMA razem z powodem`
    );
  }
}

for (const [e, i] of [["tekst-na-interakcji", "interakcja"], ["tekst-na-interakcji", "interakcja-aktywna"]]) {
  if (!role[e] || !role[i]) { bledy.push(`BRAK ROLI: --${e} lub --${i}`); continue; }
  const w = kontrast(role[e], role[i]);
  if (w < 4.5) bledy.push(`R-AKCENT-02(a): etykieta --${e} na --${i} = ${w.toFixed(2)}:1, wymagane 4.5:1`);
}

/* ─── FOKUS: JEDNA BARWA NIE WYSTARCZA NA DWA KLIMATY (ADR-050) ──
   Do 2026-09-03 fokus był jedną rolą (biel) i to działało, bo wszystkie
   powierzchnie były ciemne. Korpus jasny łamie to założenie: biel na
   `powierzchnia-jasna` daje 1,12:1. Mapa wiąże powierzchnię z rolą
   obwódki; powierzchnia bez wpisu używa roli domyślnej `fokus`. */
const FOKUS_NA_POWIERZCHNI = {
  "powierzchnia-jasna": "fokus-na-jasnym",
};

for (const p of POWIERZCHNIE) {
  const rolaFokusu = FOKUS_NA_POWIERZCHNI[p] ?? "fokus";
  if (!role[rolaFokusu] || !role[p]) {
    bledy.push(`BRAK ROLI: --${rolaFokusu} lub --${p}`);
    continue;
  }
  const w = kontrast(role[rolaFokusu], role[p]);
  if (w < PROG_FOKUS) {
    bledy.push(
      `R-AKCENT-02(b): obwódka --${rolaFokusu} na --${p} = ${w.toFixed(2)}:1, wymagane ${PROG_FOKUS}:1`
    );
  }
}

/* ─── 4. powroty: barwy z usuniętych palet i waga 100 ─────────── */
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
    /* Skan „akcent jako kolor tekstu" USUNIĘTY (ADR-039): zakaz barwy
       ustąpił warunkowi kontrastowemu wyżej. Zostaje skan powrotów —
       limonki z usuniętej palety i wagi 100 — bo te dwie rzeczy nie są
       kwestią kontrastu, tylko zamkniętych decyzji. */
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
  "  CZEGO NIE SPRAWDZA, żeby zieleń nie była czytana szerzej:\n" +
    "  · pary fokus × interakcja (1,60:1) — CELOWO, bo obwódka pada na tło,\n" +
    "    nie na wypełnienie; ale TEGO, ŻE outline-offset naprawdę istnieje,\n" +
    "    ten strażnik nie widzi — sprawdza to e2e/kontrast-stanow.spec.ts\n" +
    "    i na tym założeniu stoi cały człon R-AKCENT-02(b);\n" +
    "  · par ról spoza listy PARY;\n" +
    "  · barw wyliczonych na stronie (gradienty, przezroczystości, obrazy);\n" +
    "  · tego, czy rola jest UŻYWANA zgodnie ze swoim przeznaczeniem."
);
