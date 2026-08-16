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
 * Progi i regułę agregacji CZYTAMY z lighthouserc.cjs, nie przepisujemy.
 * Tabela, która miałaby własną kopię progu, po pierwszej zmianie progu
 * kłamałaby cicho — a cicha nieprawda w logu bramki jest gorsza niż jej
 * brak (ADR-018).
 */
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";

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
const AGREGACJA = ci?.assert?.aggregationMethod ?? "median";

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

/** Mediana przy 3 przebiegach to środek; dla parzystej liczby — dolny środek. */
const mediana = (w) => [...w].sort((a, b) => a - b)[Math.floor((w.length - 1) / 2)];
const agreguj = (w) => (AGREGACJA === "optimistic" ? Math.min(...w) : mediana(w));

const trasy = new Map();
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
}
if (trasy.size === 0) koniec("żaden raport nie dał się odczytać");

const BAZA = (process.env.LHCI_BAZA || "").trim().replace(/\/+$/, "");
const skroc = (u) => (BAZA && u.startsWith(BAZA) ? u.slice(BAZA.length) || "/" : u);

console.log("");
console.log(KRESKA);
console.log("LICZBY ZE WSZYSTKICH TRAS — pełny wynik pomiaru");
console.log(KRESKA);
console.log(
  `Werdykt bramki liczy ${AGREGACJA === "optimistic" ? "wartość najkorzystniejszą" : "MEDIANĘ"}` +
    " z przebiegów (lighthouserc.cjs).\n" +
    "Kolumna „zapas" +
    "” to odległość od progu: dodatnia = pod progiem.\n" +
    "Poniżej także wszystkie surowe przebiegi — mediana nie zasłania rozrzutu.",
);

let najciasniej = null;

for (const [url, raporty] of trasy) {
  console.log("");
  console.log(`  ${skroc(url)}   (${raporty.length} przebieg(ów))`);
  for (const m of METRYKI) {
    const prog = ASERCJE[m.klucz]?.[1]?.maxNumericValue;
    const wartosci = raporty
      .map((r) => r.audits?.[m.klucz]?.numericValue)
      .filter((v) => typeof v === "number");
    if (wartosci.length === 0) {
      console.log(`    ${m.etykieta.padEnd(5)} — brak audytu w raportach`);
      continue;
    }
    const w = agreguj(wartosci);
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
      const zapas = prog - agreguj(wartosci);
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
  // czcionka, czy sam render. Bierzemy przebieg o medianowym LCP.
  const posort = [...raporty]
    .filter((r) => typeof r.audits?.["largest-contentful-paint"]?.numericValue === "number")
    .sort(
      (a, b) =>
        a.audits["largest-contentful-paint"].numericValue -
        b.audits["largest-contentful-paint"].numericValue,
    );
  const srodek = posort[Math.floor((posort.length - 1) / 2)];
  const elAudyt = srodek?.audits?.["largest-contentful-paint-element"]?.details?.items;
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
