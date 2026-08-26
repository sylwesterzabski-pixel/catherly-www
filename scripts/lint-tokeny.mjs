#!/usr/bin/env node
/**
 * Bramka: Kontrakt tokenów — linter wartości wizualnych (ADR-004, ADR-015).
 * Wartości wizualne (kolory, wymiary px, cienie) wolno brać wyłącznie
 * z design/tokens.json (przez wygenerowane zmienne CSS).
 *
 * Tryby:
 *   --staged  → skanuje tylko pliki w indeksie gita (hook pre-commit);
 *               pilnuje, żeby commit nie WPROWADZAŁ naruszeń.
 *   (pełny)   → skanuje całe src/ I public/ ORAZ wymaga istnienia
 *               design/tokens.json (bramka CI; czerwona do czasu Fazy 1 —
 *               stan oczekiwany).
 *
 * DLACZEGO TAKŻE public/ (2026-08-17). Linter pilnował wyłącznie src/, więc
 * najtańszym sposobem ominięcia go było przeniesienie pliku o katalog obok:
 * arkusz próbny w `public/` serwuje się pod własnym adresem (matcher
 * middleware wypuszcza wszystko z kropką w nazwie), wchodzi do builda i nie
 * podlegał niczemu. Warunek właściciela brzmi „nie przenoś eksperymentu
 * w inne miejsce, żeby go ominąć" — zamykam więc drogę, zamiast obiecywać,
 * że z niej nie skorzystam. Zakres: pliki tekstowe, w których w ogóle da się
 * zapisać wartość wizualną (.html/.css/.svg/.js). Dziś `public/` nie zawiera
 * ani jednego takiego pliku, więc rozszerzenie nie zmienia wyniku bramki —
 * zaczyna działać przy pierwszym, który powstanie.
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const STAGED = process.argv.includes("--staged");
const ROOT = process.cwd();
const SCAN_EXT = new Set([".tsx", ".ts", ".jsx", ".css", ".scss"]);
/** Rozszerzenia skanowane w public/ — patrz nagłówek. */
const SCAN_EXT_PUBLIC = new Set([".html", ".css", ".svg", ".js"]);
/** Katalogi skanowane wraz z rozszerzeniami, które w nich obowiązują. */
const KORZENIE = [
  { katalog: "src", rozszerzenia: SCAN_EXT },
  { katalog: "public", rozszerzenia: SCAN_EXT_PUBLIC },
];
// Plik generowany przez Style Dictionary jest JEDYNYM miejscem, gdzie
// surowe wartości są legalne (to artefakt źródła prawdy, nie ręczny wpis).
const GENERATED = /src\/styles\/generated\//;

const WZORCE = [
  { re: /#[0-9a-fA-F]{3,8}\b/g, opis: "kolor hex poza tokenami" },
  { re: /\brgba?\(/g, opis: "kolor rgb()/rgba() poza tokenami" },
  { re: /\bhsla?\(/g, opis: "kolor hsl()/hsla() poza tokenami" },
  { re: /(?<![\w-])\d+(\.\d+)?px\b/g, opis: "wymiar w px poza tokenami" },
];

/* ─────────────────────────────────────────────────────────────────────────
   WYJĄTEK EKSPERYMENTU PALETY I JEGO TERMIN — USUNIĘTE 2026-08-26
   (ADR-031, decyzja właściciela ②, zadanie 2 zlecenia WWW/038-bis).

   Co tu stało do tej doby: osłona pozwalająca na surowe hexy wewnątrz
   bloku „EKSPERYMENT PALETY" w src/app/globals.css, data 31 sierpnia 2026
   jako strażnik istnienia trzech bloków eksperymentu, oraz kontrola
   zgodności dat w ich nagłówkach.

   DLACZEGO USUNIĘCIE NIE JEST OSŁABIENIEM BRAMKI. Mechanizm był
   WYJĄTKIEM — jedynym miejscem w src/, gdzie surowa barwa przechodziła
   przez lintera. Zdjęcie wyjątku razem z blokiem, który osłaniał, czyni
   lintera SUROWSZYM: od tej zmiany w src/app/globals.css nie ma ani
   jednego miejsca, w którym hex jest legalny. Osłabieniem byłoby
   zostawienie osłony bez bloku — wtedy pierwszy hex wpisany między
   znaczniki przeszedłby bez słowa.

   Dowód mutacyjny (2026-08-26, ten sam przebieg, kontrola negatywna):
   surowy hex wpisany do globals.css → CZERWIEŃ; po cofnięciu → zieleń,
   suma SHA-256 pliku identyczna. Zapisany w rejestrze, poz. T15.

   Warianty palet nie wracają (ADR-031). Ewentualny tryb ciemny będzie
   osobną decyzją i osobnym zestawem ról, więc nie zostawiam tu
   mechanizmu „na wszelki wypadek": martwy wyjątek czekający na powrót
   eksperymentu jest furtką, nie zapobiegliwością.
   ───────────────────────────────────────────────────────────────────────── */

function plikiDoSkanowania() {
  if (STAGED) {
    const out = execSync("git diff --cached --name-only --diff-filter=ACM", {
      encoding: "utf8",
    });
    return out
      .split("\n")
      .filter((f) => {
        if (GENERATED.test(f)) return false;
        if (f.startsWith("src/")) return SCAN_EXT.has(extname(f));
        if (f.startsWith("public/")) return SCAN_EXT_PUBLIC.has(extname(f));
        return false;
      })
      .filter((f) => existsSync(join(ROOT, f)));
  }
  const wynik = [];
  const idz = (dir, rozszerzenia) => {
    if (!existsSync(dir)) return;
    for (const nazwa of readdirSync(dir)) {
      const pelna = join(dir, nazwa);
      if (statSync(pelna).isDirectory()) idz(pelna, rozszerzenia);
      else if (rozszerzenia.has(extname(nazwa)) && !GENERATED.test(pelna))
        wynik.push(relative(ROOT, pelna));
    }
  };
  for (const { katalog, rozszerzenia } of KORZENIE) idz(join(ROOT, katalog), rozszerzenia);
  return wynik;
}

let naruszenia = 0;
for (const plik of plikiDoSkanowania()) {
  const tresc = readFileSync(join(ROOT, plik), "utf8");
  const linie = tresc.split("\n");

  linie.forEach((linia, i) => {
    for (const { re, opis } of WZORCE) {
      re.lastIndex = 0;
      if (re.test(linia)) {
        console.error(`✗ ${plik}:${i + 1} — ${opis}: ${linia.trim()}`);
        naruszenia++;
      }
    }
  });
}

if (!STAGED && !existsSync(join(ROOT, "design/tokens.json"))) {
  console.error(
    "✗ Brak design/tokens.json — jedynego źródła prawdy wyglądu (ADR-004/ADR-015).\n" +
      "  Powstaje w Fazie 1. Czerwona bramka na tym etapie to stan oczekiwany."
  );
  naruszenia++;
}

if (naruszenia > 0) {
  console.error(`\nLinter tokenów: ${naruszenia} naruszeń. Bramka CZERWONA.`);
  process.exit(1);
}
console.log("Linter tokenów: zielony.");
