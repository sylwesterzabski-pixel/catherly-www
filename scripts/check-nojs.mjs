#!/usr/bin/env node
/**
 * Bramka: No-JS — treść każdej podstrony czytelna bez JavaScriptu
 * (zasada 2 strategii; PLAN.md sekcja 5).
 * Sprawdza prerenderowany HTML z builda: każda strona musi zawierać
 * element <main> z niepustą treścią tekstową już w HTML-u (bez wykonania JS).
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
/* L-OPS-04 (WWW/089 krok 0b): katalog budowania pochodzi ze zmiennej
   WWW_DIST, domyślnie `.next` — ta sama, którą czyta `next.config.ts`.
   Bez tego wiersza bramka czytałaby `.next` także po budowaniu
   pomiarowym i czerwieniałaby z powodu, który NIE MA NIC WSPÓLNEGO
   z kodem — czyli byłaby czerwienią mylącą, gorszą od żadnej.
   Wykryte pomiarem: po pierwszym budowaniu do `.next-pomiar` bramki
   „Linki" i „No-JS" zapaliły się, choć zmiana ich nie dotyczyła. */
const KATALOG_BUDOWANIA = process.env.WWW_DIST || ".next";
const HTML_DIR = join(ROOT, KATALOG_BUDOWANIA, "server", "app");

if (!existsSync(HTML_DIR)) {
  console.error(
    "✗ Brak zbudowanej strony (${KATALOG_BUDOWANIA}/server/app) — uruchom `npm run build`.\n" +
      "  Bramka No-JS bez builda jest CZERWONA."
  );
  process.exit(1);
}

const pliki = [];
const idz = (dir) => {
  for (const nazwa of readdirSync(dir)) {
    const pelna = join(dir, nazwa);
    if (statSync(pelna).isDirectory()) idz(pelna);
    else if (nazwa.endsWith(".html") && !nazwa.startsWith("_")) pliki.push(pelna);
  }
};
idz(HTML_DIR);

if (pliki.length === 0) {
  console.error("✗ Build nie wygenerował żadnej prerenderowanej strony HTML.");
  process.exit(1);
}

let blad = 0;
for (const plik of pliki) {
  const html = readFileSync(plik, "utf8");
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const tekst = main ? main[1].replace(/<[^>]+>/g, "").trim() : "";
  if (!main || tekst.length === 0) {
    console.error(`✗ ${relative(ROOT, plik)} — brak czytelnej treści w <main> bez JS.`);
    blad++;
  }
}

if (blad > 0) {
  console.error(`\nNo-JS: ${blad} stron bez czytelnej treści. Bramka CZERWONA.`);
  process.exit(1);
}
console.log(`No-JS: zielone (${pliki.length} stron z treścią czytelną bez JavaScriptu).`);
