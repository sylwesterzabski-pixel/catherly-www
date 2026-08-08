#!/usr/bin/env node
/**
 * Bramka: Linki — 0 martwych linków wewnętrznych (PLAN.md sekcja 5).
 * Działa na wyrenderowanym HTML z builda (.next/server/app/*.html).
 * Bez builda bramka jest czerwona — nie ma czego sprawdzić.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const HTML_DIR = join(ROOT, ".next", "server", "app");

if (!existsSync(HTML_DIR)) {
  console.error(
    "✗ Brak zbudowanej strony (.next/server/app) — uruchom `npm run build`.\n" +
      "  Bramka linków bez builda jest CZERWONA."
  );
  process.exit(1);
}

const pliki = [];
const idz = (dir) => {
  for (const nazwa of readdirSync(dir)) {
    const pelna = join(dir, nazwa);
    if (statSync(pelna).isDirectory()) idz(pelna);
    else if (nazwa.endsWith(".html")) pliki.push(pelna);
  }
};
idz(HTML_DIR);

// Zbiór istniejących tras z plików HTML: index.html → "/", cennik.html → "/cennik"
const trasy = new Set();
for (const plik of pliki) {
  const wzgledna = relative(HTML_DIR, plik).replace(/\.html$/, "");
  trasy.add(wzgledna === "index" ? "/" : `/${wzgledna.replace(/\/index$/, "")}`);
}

let martwe = 0;
for (const plik of pliki) {
  const html = readFileSync(plik, "utf8");
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const cel = m[1] === "/" ? "/" : m[1].replace(/\/$/, "");
    if (cel.startsWith("/_next")) continue;
    if (!trasy.has(cel)) {
      console.error(`✗ ${relative(ROOT, plik)} — martwy link wewnętrzny: ${m[1]}`);
      martwe++;
    }
  }
}

if (martwe > 0) {
  console.error(`\nLinki: ${martwe} martwych. Bramka CZERWONA.`);
  process.exit(1);
}
console.log(`Linki: zielone (${pliki.length} stron, 0 martwych linków wewnętrznych).`);
