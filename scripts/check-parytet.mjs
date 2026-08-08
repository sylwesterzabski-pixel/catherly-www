#!/usr/bin/env node
/**
 * Bramka: Parytet językowy (ADR-008; PLAN.md sekcja 5).
 * Struktura content/pl, content/en i content/de musi być identyczna:
 * te same drzewa plików. Strona bez któregokolwiek języka nie zbuduje się.
 * Puste drzewa = czerwień (brak treści to nie parytet, to brak strony).
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const JEZYKI = ["pl", "en", "de"];

function drzewo(dir, prefix = "") {
  if (!existsSync(dir)) return null;
  const wynik = [];
  for (const nazwa of readdirSync(dir).sort()) {
    if (nazwa === ".gitkeep") continue;
    const pelna = join(dir, nazwa);
    const wzgledna = prefix ? `${prefix}/${nazwa}` : nazwa;
    if (statSync(pelna).isDirectory()) wynik.push(...drzewo(pelna, wzgledna));
    else wynik.push(wzgledna);
  }
  return wynik;
}

const drzewa = {};
let blad = false;
for (const jezyk of JEZYKI) {
  const d = drzewo(join(ROOT, "content", jezyk));
  if (d === null) {
    console.error(`✗ Brak katalogu content/${jezyk}`);
    blad = true;
  } else {
    drzewa[jezyk] = d;
  }
}

if (!blad) {
  const wzorzec = JSON.stringify(drzewa.pl);
  for (const jezyk of ["en", "de"]) {
    if (JSON.stringify(drzewa[jezyk]) !== wzorzec) {
      console.error(`✗ Drzewo content/${jezyk} różni się od content/pl:`);
      const wPl = new Set(drzewa.pl);
      const wJezyku = new Set(drzewa[jezyk]);
      for (const p of drzewa.pl) if (!wJezyku.has(p)) console.error(`  brakuje: ${jezyk}/${p}`);
      for (const p of drzewa[jezyk]) if (!wPl.has(p)) console.error(`  nadmiarowe: ${jezyk}/${p}`);
      blad = true;
    }
  }
  if (!blad && drzewa.pl.length === 0) {
    console.error(
      "✗ Drzewa treści są puste — parytet pustki nie jest parytetem.\n" +
        "  Treść powstaje w Fazie 2. Czerwona bramka na tym etapie to stan oczekiwany."
    );
    blad = true;
  }
}

if (blad) {
  console.error("\nParytet językowy: bramka CZERWONA.");
  process.exit(1);
}
console.log(`Parytet językowy: zielony (${drzewa.pl.length} plików w każdym z trzech drzew).`);
