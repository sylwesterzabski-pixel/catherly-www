#!/usr/bin/env node
/**
 * Bramka: Kontrakt tokenów — linter wartości wizualnych (ADR-004, ADR-015).
 * Wartości wizualne (kolory, wymiary px, cienie) wolno brać wyłącznie
 * z design/tokens.json (przez wygenerowane zmienne CSS).
 *
 * Tryby:
 *   --staged  → skanuje tylko pliki w indeksie gita (hook pre-commit);
 *               pilnuje, żeby commit nie WPROWADZAŁ naruszeń.
 *   (pełny)   → skanuje całe src/ ORAZ wymaga istnienia design/tokens.json
 *               (bramka CI; czerwona do czasu Fazy 1 — stan oczekiwany).
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const STAGED = process.argv.includes("--staged");
const ROOT = process.cwd();
const SCAN_EXT = new Set([".tsx", ".ts", ".jsx", ".css", ".scss"]);
// Plik generowany przez Style Dictionary jest JEDYNYM miejscem, gdzie
// surowe wartości są legalne (to artefakt źródła prawdy, nie ręczny wpis).
const GENERATED = /src\/styles\/generated\//;

const WZORCE = [
  { re: /#[0-9a-fA-F]{3,8}\b/g, opis: "kolor hex poza tokenami" },
  { re: /\brgba?\(/g, opis: "kolor rgb()/rgba() poza tokenami" },
  { re: /\bhsla?\(/g, opis: "kolor hsl()/hsla() poza tokenami" },
  { re: /(?<![\w-])\d+(\.\d+)?px\b/g, opis: "wymiar w px poza tokenami" },
];

function plikiDoSkanowania() {
  if (STAGED) {
    const out = execSync("git diff --cached --name-only --diff-filter=ACM", {
      encoding: "utf8",
    });
    return out
      .split("\n")
      .filter((f) => f.startsWith("src/") && SCAN_EXT.has(extname(f)) && !GENERATED.test(f))
      .filter((f) => existsSync(join(ROOT, f)));
  }
  const wynik = [];
  const idz = (dir) => {
    if (!existsSync(dir)) return;
    for (const nazwa of readdirSync(dir)) {
      const pelna = join(dir, nazwa);
      if (statSync(pelna).isDirectory()) idz(pelna);
      else if (SCAN_EXT.has(extname(nazwa)) && !GENERATED.test(pelna))
        wynik.push(relative(ROOT, pelna));
    }
  };
  idz(join(ROOT, "src"));
  return wynik;
}

let naruszenia = 0;
for (const plik of plikiDoSkanowania()) {
  const tresc = readFileSync(join(ROOT, plik), "utf8");
  tresc.split("\n").forEach((linia, i) => {
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
