#!/usr/bin/env node
/**
 * Bramka: Prawdziwość — linter liczb (Prawo 1; PLAN.md sekcja 2).
 * Każda liczba widoczna na stronie pochodzi z content/facts.json przez
 * import. Literalna liczba w tekście JSX = naruszenie.
 *
 * Tryby: --staged (hook pre-commit) | pełny (CI, całe src/).
 * Heurystyka: cyfry w tekstowych węzłach JSX (fragmenty między > a <).
 * Fałszywe alarmy rozstrzyga się przez przeniesienie wartości do
 * facts.json — nie przez osłabienie lintera.
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const STAGED = process.argv.includes("--staged");
const ROOT = process.cwd();
const SCAN_EXT = new Set([".tsx", ".jsx"]);

function plikiDoSkanowania() {
  if (STAGED) {
    const out = execSync("git diff --cached --name-only --diff-filter=ACM", {
      encoding: "utf8",
    });
    return out
      .split("\n")
      .filter((f) => f.startsWith("src/") && SCAN_EXT.has(extname(f)))
      .filter((f) => existsSync(join(ROOT, f)));
  }
  const wynik = [];
  const idz = (dir) => {
    if (!existsSync(dir)) return;
    for (const nazwa of readdirSync(dir)) {
      const pelna = join(dir, nazwa);
      if (statSync(pelna).isDirectory()) idz(pelna);
      else if (SCAN_EXT.has(extname(nazwa))) wynik.push(relative(ROOT, pelna));
    }
  };
  idz(join(ROOT, "src"));
  return wynik;
}

// Tekst JSX: fragment między ">" a "<" zawierający cyfrę.
const TEKST_Z_CYFRA = />[^<>{}]*\d[^<>{}]*</g;

let naruszenia = 0;
for (const plik of plikiDoSkanowania()) {
  const tresc = readFileSync(join(ROOT, plik), "utf8");
  tresc.split("\n").forEach((linia, i) => {
    TEKST_Z_CYFRA.lastIndex = 0;
    const trafienia = linia.match(TEKST_Z_CYFRA);
    if (trafienia) {
      for (const t of trafienia) {
        console.error(
          `✗ ${plik}:${i + 1} — literalna liczba w tekście JSX: ${t}\n` +
            `  Przenieś wartość do content/facts.json (wartość + źródło + data pomiaru) i importuj.`
        );
        naruszenia++;
      }
    }
  });
}

if (naruszenia > 0) {
  console.error(`\nLinter liczb: ${naruszenia} naruszeń. Bramka CZERWONA.`);
  process.exit(1);
}
console.log("Linter liczb: zielony.");
