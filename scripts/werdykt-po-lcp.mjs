#!/usr/bin/env node
/**
 * WERDYKT BRAMKI WYDAJNOŚCI — wybiera reprezentanta trasy i oddaje go
 * pod osąd `lhci assert`.
 *
 * Krok wstawiony między `lhci collect` a `lhci assert` (rozstrzygnięcie
 * właściciela 2026-08-16). `lhci autorun` robi jedno i drugie w tym samym
 * procesie, więc nie da się tam niczego wstawić — stąd rozbicie pomiaru
 * na dwa polecenia w `npm run bramka:pomiar`.
 *
 * ── Co ten skrypt robi, a czego NIE robi ──────────────────────────────
 * NIE ocenia niczego sam. Nie zna progów, nie porównuje liczb z budżetem,
 * nie potrafi zamienić czerwieni w zieleń. Jedyne, co robi, to wskazanie
 * PRZEBIEGU: dla każdej trasy wybiera ten o medianowym LCP
 * (scripts/reprezentant.mjs) i kopiuje go do osobnego katalogu roboczego.
 * Wyrok wydaje `lhci assert` na progach z lighthouserc.cjs — dokładnie
 * ten sam kod asercji co wcześniej, tylko karmiony jednym przebiegiem
 * na trasę zamiast pięcioma. Progi mają jedno źródło i ten skrypt go
 * nie dotyka.
 *
 * ── Dlaczego osobny katalog, a nie kasowanie zbędnych raportów ────────
 * Skasowanie czterech z pięciu raportów dałoby ten sam werdykt i zniszczyło
 * dowód: tabela zapasów pokazuje rozrzut ze WSZYSTKICH przebiegów, a bez
 * rozrzutu nie widać, że trasa wisi na włosku. `.lighthouseci/` zostaje
 * nietknięte; kopie idą do `.lighthouseci/werdykt/.lighthouseci/`, bo lhci
 * czyta raporty wyłącznie z `.lighthouseci` w bieżącym katalogu
 * (@lhci/utils/src/saved-reports.js:10) — sterujemy tym przez cwd procesu
 * potomnego. Przekazanie własnego katalogu przez `--lhr` NIE zadziała:
 * `loadSavedLHRs` czyta nazwy z podanego katalogu, ale skleja je ze ścieżką
 * LHCI_DIR (saved-reports.js:39), więc czytałoby cudze pliki.
 *
 * ── Ślad dla tabeli ───────────────────────────────────────────────────
 * Zapisujemy `.lighthouseci/regula-werdyktu.json` z listą wybranych
 * przebiegów. Tabela zapasów czyta ten plik zamiast odtwarzać wybór
 * własnym kodem. Poprzednia wersja tabeli miała RĘCZNĄ KOPIĘ reguły lhci
 * i to jest klasa błędu, nie szczegół: dwie implementacje tej samej reguły
 * rozjeżdżają się cicho, a tabela pokazywałaby wtedy przebieg inny niż ten,
 * który bramka osądziła. Brak pliku tabela zgłasza wprost.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  KRYTERIUM,
  odchyleniaKontrolne,
  wybierzReprezentanta,
  zlamanaRegula,
} from "./reprezentant.mjs";

const KORZEN = fileURLToPath(new URL("../", import.meta.url));
const KATALOG = `${KORZEN}.lighthouseci`;
const ROBOCZY = `${KATALOG}/werdykt`;
const SLAD = `${KATALOG}/regula-werdyktu.json`;
const KONFIG = `${KORZEN}lighthouserc.cjs`;
const LHCI = `${KORZEN}node_modules/.bin/lhci`;
const KRESKA = "─".repeat(68);

/** Bramka nie ma prawa przejść „bo czegoś nie znalazła". Brak danych = czerwień. */
function padnij(powod) {
  console.error(`\n✖ WERDYKT NIEROZSTRZYGNIĘTY: ${powod}`);
  console.error("  Bramka nie przepuszcza pomiaru, którego nie umie osądzić.\n");
  process.exit(1);
}

// Ślad po poprzednim pomiarze idzie do kosza ZANIM cokolwiek policzymy.
// `lhci collect` czyści tylko lhr-*.json i lhr-*.html (saved-reports.js:68–76),
// więc bez tego padnięcie tego skryptu zostawiłoby tabeli stary plik i tabela
// wypisałaby wybór z poprzedniego przebiegu jako werdykt bieżącego.
rmSync(SLAD, { force: true });

let pliki;
try {
  pliki = readdirSync(KATALOG)
    .filter((n) => /^lhr-\d+\.json$/.test(n))
    .sort(); // nazwa niesie znacznik czasu → kolejność przebiegów
} catch (e) {
  padnij(`nie da się odczytać .lighthouseci/ (${e.code || e.message})`);
}
if (pliki.length === 0) padnij("brak raportów lhr-*.json — pomiar nic nie zostawił");

/** @type {Map<string, {plik:string, lhr:any}[]>} */
const trasy = new Map();
for (const plik of pliki) {
  let lhr;
  try {
    lhr = JSON.parse(readFileSync(`${KATALOG}/${plik}`, "utf8"));
  } catch (e) {
    padnij(`raport ${plik} nie daje się odczytać (${e.message})`);
  }
  const url = lhr.requestedUrl || lhr.finalDisplayedUrl || lhr.finalUrl;
  if (!url) padnij(`raport ${plik} nie mówi, jaki adres mierzył`);
  if (!trasy.has(url)) trasy.set(url, []);
  trasy.get(url).push({ plik, lhr });
}

const BAZA = (process.env.LHCI_BAZA || "").trim().replace(/\/+$/, "");
const skroc = (u) => (BAZA && u.startsWith(BAZA) ? u.slice(BAZA.length) || "/" : u);

rmSync(ROBOCZY, { recursive: true, force: true });
mkdirSync(`${ROBOCZY}/.lighthouseci`, { recursive: true });

console.log("");
console.log(KRESKA);
console.log("WYBÓR PRZEBIEGU REPREZENTATYWNEGO");
console.log(KRESKA);
console.log(
  `Reguła: ${KRYTERIUM.opis(undefined)} (scripts/reprezentant.mjs).\n` +
    "Asercje zapadają na tym jednym przebiegu — progi z lighthouserc.cjs.\n" +
    "„odchylenia” to odległość reprezentanta od median POZOSTAŁYCH metryk;\n" +
    "FCP i TTI są tam po to, żeby podmiana kryterium była widoczna z zewnątrz.",
);

const wybrane = [];
for (const [url, wpisy] of trasy) {
  let wybor;
  try {
    wybor = wybierzReprezentanta(wpisy.map((w) => w.lhr));
  } catch (e) {
    padnij(`${skroc(url)}: ${e.message}`);
  }
  const wpis = wpisy[wybor.indeks];
  const zlamana = zlamanaRegula(
    wpisy.map((w) => w.lhr),
    wpis.lhr,
  );

  console.log("");
  console.log(
    `  ${skroc(url)}   →  przebieg #${wybor.indeks + 1} z ${wpisy.length}` +
      `   ${KRYTERIUM.etykieta} ${wybor.wartosc.toFixed(0)} ms`,
  );
  if (zlamana !== null) {
    // Nie może się zdarzyć przy nieuszkodzonym kryterium — jeśli się zdarzy,
    // znaczy że ktoś podmienił regułę wyboru i werdykt stoi na czymś innym,
    // niż mówi dokumentacja.
    console.log(
      `    ⚠  REGUŁA ZŁAMANA: to nie jest przebieg o medianowym LCP` +
        ` (mediana: ${zlamana.toFixed(0)} ms)`,
    );
  }
  const odch = odchyleniaKontrolne(
    wpisy.map((w) => w.lhr),
    wpis.lhr,
  );
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

  copyFileSync(`${KATALOG}/${wpis.plik}`, `${ROBOCZY}/.lighthouseci/${wpis.plik}`);
  wybrane.push({
    url,
    plik: wpis.plik,
    numer: wybor.indeks + 1,
    zPrzebiegow: wpisy.length,
    lcp: wybor.wartosc,
    regulaZlamana: zlamana !== null,
  });
}

writeFileSync(
  SLAD,
  JSON.stringify(
    { kryterium: KRYTERIUM.id, metryka: KRYTERIUM.metryka, wybrane },
    null,
    2,
  ),
);

console.log("");
console.log(
  `Do osądu idzie ${wybrane.length} przebiegów (po jednym na trasę)` +
    ` z ${pliki.length} zmierzonych.`,
);
console.log(KRESKA);
console.log("");

const wynik = spawnSync(LHCI, ["assert", `--config=${KONFIG}`], {
  cwd: ROBOCZY,
  stdio: "inherit",
  env: process.env,
});
if (wynik.error) padnij(`nie udało się uruchomić lhci assert (${wynik.error.message})`);
process.exit(wynik.status === null ? 1 : wynik.status);
