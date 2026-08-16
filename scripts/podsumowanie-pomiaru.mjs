#!/usr/bin/env node
/**
 * Liczby ze WSZYSTKICH tras po pomiarze. Adnotacja, nie strażnik:
 * NIGDY nie kończy się kodem różnym od 0 — werdykt należy do `lhci
 * assert` i nic tu go nie dubluje ani nie osłabia.
 *
 * Powód istnienia (2026-08-16): `lhci assert` drukuje wyłącznie to, co
 * NIE przeszło. Pierwszy przebieg bramki na preview (e2ac0f3) skończył
 * się jedną linijką o `/funkcje` — a pytanie właściciela brzmiało „LCP
 * wszystkich 7 tras". Odpowiedzi nie dało się udzielić: liczby tras
 * zielonych nie trafiały nigdzie poza katalog runnera, który ginie
 * razem z maszyną. Bramka umiała powiedzieć „która trasa spadła", nigdy
 * „z jakim zapasem stoją pozostałe" — więc nie dało się odróżnić trasy
 * stojącej 400 ms pod progiem od takiej, która ociera się o niego
 * i spadnie przy następnym przebiegu bez żadnej zmiany w kodzie.
 *
 * Progi CZYTAMY z lighthouserc.cjs, regułę werdyktu ze scripts/
 * reprezentant.mjs, a to KTÓRY przebieg poszedł pod osąd — ze śladu
 * `.lighthouseci/regula-werdyktu.json`, zostawionego przez skrypt werdyktu.
 * Nic z tych trzech rzeczy nie jest tu przepisane. Tabela, która ma własną
 * kopię progu albo własną kopię reguły, po pierwszej zmianie kłamie cicho
 * — a cicha nieprawda w logu bramki jest gorsza niż jej brak (ADR-018).
 * Do 2026-08-16 stała tu ręczna kopia reguły `median-run` z lhci; poszła
 * razem z tą regułą.
 */
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";

import {
  KRYTERIUM,
  liczba,
  mediana,
  odchyleniaKontrolne,
  wybierzReprezentanta,
  zlamanaRegula,
} from "./reprezentant.mjs";

const require = createRequire(import.meta.url);
const KATALOG = new URL("../.lighthouseci/", import.meta.url);
const KRESKA = "─".repeat(68);

/** Adnotacja nie ma prawa zapalić czerwieni — każde wyjście jest zerem. */
function koniec(powod) {
  console.log(`\nPodsumowanie pomiaru pominięte: ${powod}.\n`);
  process.exit(0);
}

// Czytamy raporty `lhr-*.json`, nie manifest: manifest powstaje dopiero
// przy `lhci upload`, którego ta bramka nie uruchamia. Nazwa pliku niesie
// znacznik czasu, więc sortowanie po niej odtwarza kolejność przebiegów.
let pliki;
try {
  pliki = readdirSync(KATALOG)
    .filter((n) => /^lhr-\d+\.json$/.test(n))
    .sort();
} catch (e) {
  koniec(`nie da się odczytać .lighthouseci/ (${e.code || e.message})`);
}
if (pliki.length === 0) koniec("brak raportów lhr-*.json");

const { ci } = require("../lighthouserc.cjs");
const ASERCJE = ci?.assert?.assertions ?? {};

/**
 * Ślad po skrypcie werdyktu: KTÓRY przebieg każdej trasy poszedł pod
 * osąd. Czytamy go zamiast odtwarzać wybór własnym kodem — poprzednia
 * wersja tej tabeli miała ręczną kopię reguły lhci i to jest klasa błędu:
 * dwie implementacje tej samej reguły rozjeżdżają się cicho, a tabela
 * pokazywałaby wtedy inny przebieg niż ten, który bramka osądziła.
 */
const SLAD = (() => {
  try {
    return JSON.parse(readFileSync(new URL("regula-werdyktu.json", KATALOG), "utf8"));
  } catch {
    return null;
  }
})();

/**
 * Metryki w kolejności czytania. `zrodlo` mówi, skąd w raporcie brać
 * liczbę — audyt numeryczny czy wynik kategorii; klucz jest DOKŁADNIE
 * tym, czym asercja nazywa się w lighthouserc.cjs, żeby próg dopiąć bez
 * tłumaczenia nazw.
 */
const METRYKI = [
  { klucz: "largest-contentful-paint", etykieta: "LCP", jednostka: "ms", cyfry: 0 },
  { klucz: "total-blocking-time", etykieta: "TBT", jednostka: "ms", cyfry: 0 },
  { klucz: "cumulative-layout-shift", etykieta: "CLS", jednostka: "", cyfry: 3 },
];

const trasy = new Map();
/** raport → nazwa pliku, żeby dało się dopiąć wybór zapisany przez bramkę */
const zPliku = new Map();
for (const nazwa of pliki) {
  let lhr;
  try {
    lhr = JSON.parse(readFileSync(new URL(nazwa, KATALOG), "utf8"));
  } catch {
    continue; // brak jednego raportu nie może uciszyć pozostałych
  }
  const url = lhr.requestedUrl || lhr.finalDisplayedUrl || lhr.finalUrl;
  if (!url) continue;
  if (!trasy.has(url)) trasy.set(url, []);
  trasy.get(url).push(lhr);
  zPliku.set(lhr, nazwa);
}
if (trasy.size === 0) koniec("żaden raport nie dał się odczytać");

const BAZA = (process.env.LHCI_BAZA || "").trim().replace(/\/+$/, "");
const skroc = (u) => (BAZA && u.startsWith(BAZA) ? u.slice(BAZA.length) || "/" : u);

console.log("");
console.log(KRESKA);
console.log("LICZBY ZE WSZYSTKICH TRAS — pełny wynik pomiaru");
console.log(KRESKA);
console.log(
  `Werdykt bramki bierze ${KRYTERIUM.opis(undefined)} (scripts/reprezentant.mjs).\n` +
    "Kolumna „zapas" +
    "” to odległość od progu: dodatnia = pod progiem.\n" +
    "Poniżej także wszystkie surowe przebiegi — werdykt nie zasłania rozrzutu.",
);
if (!SLAD) {
  // Bez śladu tabela pokazuje przebieg, który bramka BY wybrała — a nie
  // ten, na którym zapadł wynik wypisany wyżej w logu. Różnica jest istotna
  // i musi być powiedziana wprost, inaczej tabela cicho przypisze sobie
  // cudzy werdykt (ADR-018: cicha nieprawda w logu bramki jest gorsza niż
  // jej brak).
  console.log(
    "\n⚠  Brak .lighthouseci/regula-werdyktu.json — pomiar NIE przeszedł przez\n" +
      "   `npm run bramka:pomiar`. Tabela pokazuje przebieg, który wybrałaby\n" +
      "   bramka; wynik powyżej mógł zapaść inną regułą.",
  );
}

/** url → nazwa pliku przebiegu, który bramka rzeczywiście osądziła */
const WYBOR_BRAMKI = new Map((SLAD?.wybrane || []).map((w) => [w.url, w.plik]));

// Ślad z POPRZEDNIEGO pomiaru przeżywa `lhci collect`: czyszczenie lhci kasuje
// wyłącznie lhr-*.json i lhr-*.html (saved-reports.js:68–76), naszego pliku nie
// dotyka. Nazwy raportów niosą znacznik czasu, więc stary ślad wskazuje pliki,
// których już nie ma — i to jest test na jego świeżość. Cichy odwrót do
// własnego liczenia byłby tu tą samą klasą błędu co ręczna kopia reguły:
// tabela mówiłaby o innym przebiegu niż ten, na którym zapadł wyrok.
const OBECNE = new Set(zPliku.values());
if (SLAD && [...WYBOR_BRAMKI.values()].some((p) => !OBECNE.has(p))) {
  console.log(
    "\n⚠  .lighthouseci/regula-werdyktu.json wskazuje raporty, których w tym\n" +
      "   pomiarze nie ma — ślad jest z POPRZEDNIEGO przebiegu. Tabela liczy\n" +
      "   wybór sama; wynik powyżej mógł zapaść na innym przebiegu.",
  );
}

let najciasniej = null;

for (const [url, raporty] of trasy) {
  // Cała trasa sądzona jest z JEDNEGO przebiegu; bierzemy go raz, żeby każda
  // metryka i rozbiór faz LCP mówiły o tym samym ładowaniu, które osądziła
  // bramka. Pierwszeństwo ma wybór ZAPISANY przez skrypt werdyktu; własne
  // liczenie jest tylko awaryjne i wtedy tabela mówi o tym wyżej.
  const zapisany = WYBOR_BRAMKI.get(url);
  let wybrany = zapisany ? raporty.find((r) => zPliku.get(r) === zapisany) : null;
  if (!wybrany) {
    try {
      wybrany = wybierzReprezentanta(raporty).raport;
    } catch {
      wybrany = raporty[0];
    }
  }
  const agreguj = (wartosci, klucz) => {
    const v = liczba(wybrany, klucz);
    return v === null ? mediana(wartosci) : v;
  };

  console.log("");
  console.log(`  ${skroc(url)}   (${raporty.length} przebieg(ów))`);
  {
    const nr = raporty.indexOf(wybrany) + 1;
    const zlamana = zlamanaRegula(raporty, wybrany);
    console.log(
      `    werdykt z przebiegu #${nr}` +
        (zlamana === null
          ? `  (${KRYTERIUM.etykieta} = mediana trasy)`
          : `  (⚠ REGUŁA ZŁAMANA: to NIE jest przebieg o medianowym LCP` +
            ` — mediana LCP: ${zlamana.toFixed(0)} ms)`),
    );
    // Odwrotność dawnego ostrzeżenia: skoro reprezentant jest z definicji
    // medianowy w LCP, audytowalne jest to, jak daleko odstaje w metrykach,
    // które w wyborze NIE brały udziału. FCP i TTI są tu kryterium starej
    // reguły — po podmianie kryterium ich odchylenia spadają do zera i widać
    // to w tabeli, nie tylko w kodzie.
    const odch = odchyleniaKontrolne(raporty, wybrany);
    if (odch.length) {
      console.log(
        "    odchylenia od median: " +
          odch
            .map((o) => {
              const znak = o.odchylenie > 0 ? "+" : o.odchylenie < 0 ? "−" : "";
              const v = Math.abs(o.odchylenie).toFixed(o.cyfry);
              return `${o.etykieta} ${znak}${v}${o.jednostka ? " " + o.jednostka : ""}`;
            })
            .join(" · "),
      );
    }
  }
  for (const m of METRYKI) {
    const prog = ASERCJE[m.klucz]?.[1]?.maxNumericValue;
    const wartosci = raporty
      .map((r) => r.audits?.[m.klucz]?.numericValue)
      .filter((v) => typeof v === "number");
    if (wartosci.length === 0) {
      console.log(`    ${m.etykieta.padEnd(5)} — brak audytu w raportach`);
      continue;
    }
    const w = agreguj(wartosci, m.klucz);
    const fmt = (v) => v.toFixed(m.cyfry) + (m.jednostka ? " " + m.jednostka : "");
    let wiersz = `    ${m.etykieta.padEnd(5)}${fmt(w).padStart(11)}`;
    if (typeof prog === "number") {
      const zapas = prog - w;
      wiersz +=
        `   próg ${fmt(prog)}`.padEnd(18) +
        `zapas ${zapas >= 0 ? "+" : ""}${fmt(zapas)}`.padStart(18) +
        (zapas < 0 ? "   ✗ PONAD PRÓG" : "");
      if (m.klucz === "largest-contentful-paint" && zapas >= 0) {
        // Kandydatkę na następną czerwień wybiera ZAPAS MINUS ROZRZUT, nie
        // sam zapas. Przebieg 31952572831: /funkcje/tresci miało najmniejszy
        // zapas (+297 ms), ale rozrzut 156 ms — a /funkcje/pozyskiwanie
        // zapas +302 ms przy rozrzucie 1023 ms. Ranking po samym zapasie
        // wskazywał tę pierwszą, choć to druga wisi na włosku. Tabela nie
        // ma prawa przeczyć liczbom, które sama wypisuje.
        const rozrzutLCP = Math.max(...wartosci) - Math.min(...wartosci);
        const luz = zapas - rozrzutLCP;
        if (!najciasniej || luz < najciasniej.luz) {
          najciasniej = { url: skroc(url), zapas, rozrzut: rozrzutLCP, luz };
        }
      }
    }
    console.log(wiersz);
    const rozrzut = Math.max(...wartosci) - Math.min(...wartosci);
    console.log(
      `           przebiegi: ${wartosci.map((v) => v.toFixed(m.cyfry)).join(" · ")}` +
        (wartosci.length > 1 ? `   (rozrzut ${fmt(rozrzut)})` : ""),
    );
    // Rozrzut większy od zapasu znaczy, że o werdykcie decyduje losowanie
    // przebiegu, nie stan strony. Bramka jest wtedy niepowtarzalna i trzeba
    // to widzieć w logu, a nie odkrywać przy trzecim przebiegu z rzędu.
    if (typeof prog === "number" && wartosci.length > 1) {
      const zapas = prog - agreguj(wartosci, m.klucz);
      if (zapas >= 0 && rozrzut > zapas) {
        console.log(
          `           ⚠  rozrzut większy niż zapas — ta trasa może spaść` +
            ` przy niezmienionym kodzie`,
        );
      }
    }
  }
  const a11y = raporty
    .map((r) => r.categories?.accessibility?.score)
    .filter((v) => typeof v === "number");
  if (a11y.length) {
    console.log(`    a11y ${a11y.map((v) => v.toFixed(2)).join(" · ")}`);
  }
  // Czym jest LCP na tej trasie i z czego składa się jego czas. Bez tego
  // diagnoza czerwieni zaczyna się od zgadywania, czy winien jest obraz,
  // czcionka, czy sam render. Rozbiór bierzemy z TEGO SAMEGO przebiegu,
  // z którego zapada werdykt — inaczej fazy tłumaczyłyby ładowanie, którego
  // bramka nie sądziła.
  const elAudyt = wybrany?.audits?.["largest-contentful-paint-element"]?.details?.items;
  const wezel = elAudyt?.[0]?.items?.[0]?.node;
  if (wezel) {
    console.log(
      `    element LCP: ${(wezel.nodeLabel || wezel.snippet || "?").replace(/\s+/g, " ").slice(0, 52)}`,
    );
  }
  const fazy = elAudyt?.[1]?.items;
  if (fazy) {
    console.log(
      `    fazy LCP:    ${fazy.map((f) => `${f.phase} ${Math.round(f.timing)} ms`).join(" · ")}`,
    );
  }
  // benchmarkIndex to zmierzona szybkość MASZYNY, na której szedł pomiar.
  // Przy throttlingMethod "simulate" Lighthouse mnoży zaobserwowaną pracę
  // procesora przez cpuSlowdownMultiplier, więc zadyszka współdzielonego
  // runnera wchodzi do wyniku zwielokrotniona. Gdy przebiegi rozjadą się
  // bez zmiany w kodzie, ta liczba mówi, czy winna była maszyna — i jest
  // to jedyny sposób, żeby tego NIE zgadywać po fakcie.
  const bench = raporty
    .map((r) => r.environment?.benchmarkIndex)
    .filter((v) => typeof v === "number");
  if (bench.length) {
    console.log(`    benchmarkIndex (szybkość maszyny): ${bench.map(Math.round).join(" · ")}`);
  }
}

if (najciasniej) {
  console.log("");
  console.log(
    `Najbliżej przerzutu wśród tras pod progiem: ${najciasniej.url} — ` +
      `zapas +${najciasniej.zapas.toFixed(0)} ms przy rozrzucie ` +
      `${najciasniej.rozrzut.toFixed(0)} ms.`,
  );
  console.log(
    najciasniej.luz < 0
      ? "  Rozrzut przekracza zapas: ta trasa spadnie przy niezmienionym\n" +
          "  kodzie, gdy tylko trafi na wolniejszy przebieg."
      : `  Do progu brakuje jeszcze ${najciasniej.luz.toFixed(0)} ms ponad rozrzut.`,
  );
}

console.log("");
console.log(KRESKA);
console.log("");
