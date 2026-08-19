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
   WYJĄTEK EKSPERYMENTU PALETY — rozstrzygnięcie właściciela 2026-08-17.
   Wąski i z datą. Warunki (wszystkie obowiązujące łącznie):
     (a) obejmuje WYŁĄCZNIE blok między znacznikami, w jednym pliku;
     (b) wygasa w dniu WYJATEK_WYGASA — po tej dacie linter zapala się na
         samym ISTNIENIU bloku, nie na hexach w nim; data jest strażnikiem,
         nie komentarzem;
     (c) hex poza blokiem = czerwień jak dotąd;
     (d) znacznik otwarcia w JAKIMKOLWIEK innym pliku = czerwień — inaczej
         wyjątek dałoby się przenieść tam, gdzie jest wygodnie;
     (e) blok niedomknięty, zdublowany albo odwrócony = czerwień — inaczej
         samo otwarcie znacznika osłaniałoby resztę pliku.
   Uzasadnienie, data i dowody mutacyjne: docs/faza-2/rejestr-warunkow-powrotu.md,
   pozycja T15.
   ───────────────────────────────────────────────────────────────────────── */
const WYJATEK_PLIK = "src/app/globals.css";
const WYJATEK_OTWARCIE = "/* === EKSPERYMENT PALETY — DO USUNIĘCIA === */";
const WYJATEK_ZAMKNIECIE = "/* === KONIEC EKSPERYMENTU PALETY === */";
const WYJATEK_WYGASA = "2026-08-31";

const dzisiajLokalnie = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

/**
 * Zwraca zbiór numerów linii (0-indeksowanych) osłoniętych wyjątkiem
 * oraz listę błędów samego wyjątku. Błąd wyjątku jest naruszeniem.
 */
function oslonaWyjatku(plik, linie) {
  const bledy = [];
  const otwarcia = [];
  const zamkniecia = [];
  linie.forEach((l, i) => {
    const t = l.trim();
    if (t === WYJATEK_OTWARCIE) otwarcia.push(i);
    if (t === WYJATEK_ZAMKNIECIE) zamkniecia.push(i);
  });

  if (otwarcia.length === 0 && zamkniecia.length === 0) return { osloniete: null, bledy };

  if (plik !== WYJATEK_PLIK) {
    bledy.push(
      `znacznik eksperymentu palety poza ${WYJATEK_PLIK} — wyjątek nie jest przenośny`
    );
    return { osloniete: null, bledy };
  }
  if (otwarcia.length !== 1 || zamkniecia.length !== 1) {
    bledy.push(
      `blok eksperymentu palety musi wystąpić dokładnie raz ` +
        `(otwarć: ${otwarcia.length}, zamknięć: ${zamkniecia.length})`
    );
    return { osloniete: null, bledy };
  }
  if (zamkniecia[0] < otwarcia[0]) {
    bledy.push("znacznik zamknięcia eksperymentu palety przed znacznikiem otwarcia");
    return { osloniete: null, bledy };
  }

  const dzis = dzisiajLokalnie();
  if (dzis > WYJATEK_WYGASA) {
    bledy.push(
      `blok eksperymentu palety wygasł ${WYJATEK_WYGASA} (dziś ${dzis}) — ` +
        `usuń blok razem z public/fonts/eksperyment/; wyjątek nie obowiązuje`
    );
    return { osloniete: null, bledy };
  }

  const osloniete = new Set();
  for (let i = otwarcia[0]; i <= zamkniecia[0]; i++) osloniete.add(i);
  return { osloniete, bledy };
}

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

  const { osloniete, bledy } = oslonaWyjatku(plik, linie);
  for (const blad of bledy) {
    console.error(`✗ ${plik} — ${blad}`);
    naruszenia++;
  }

  linie.forEach((linia, i) => {
    if (osloniete?.has(i)) return;
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
