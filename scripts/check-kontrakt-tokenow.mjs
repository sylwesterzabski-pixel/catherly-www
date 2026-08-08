#!/usr/bin/env node
/**
 * Bramka: Kontrakt tokenów strona↔aplikacja (ADR-004; PLAN.md sekcja 5).
 * design/tokens.json → Style Dictionary → artefakty strony i eksport dla
 * aplikacji; ten test porównuje wygenerowane artefakty obu stron (0 rozjazdów).
 *
 * Faza 1 dostarcza tokens.json i konfigurację Style Dictionary oraz artefakt
 * porównawczy aplikacji (dostarczany przez właściciela — agent nie sięga do
 * repozytorium aplikacji). Do tego czasu bramka jest czerwona — stan oczekiwany.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const WYMAGANE = [
  ["design/tokens.json", "źródło prawdy wyglądu (Faza 1)"],
  ["design/style-dictionary.config.mjs", "konfiguracja generowania (Faza 1)"],
  ["design/kontrakt-aplikacji.json", "artefakt aplikacji do porównania (Faza 1, dostarcza właściciel)"],
];

let blad = false;
for (const [plik, opis] of WYMAGANE) {
  if (!existsSync(join(ROOT, plik))) {
    console.error(`✗ Brak ${plik} — ${opis}`);
    blad = true;
  }
}

if (blad) {
  console.error("\nKontrakt tokenów: bramka CZERWONA (artefakty Fazy 1 nie istnieją — stan oczekiwany).");
  process.exit(1);
}

// Właściwe porównanie artefaktów zostanie dopisane w Fazie 1 razem
// z konfiguracją Style Dictionary (bez niej nie ma czego porównywać).
console.error("✗ Artefakty istnieją, ale porównanie kontraktu nie jest jeszcze zaimplementowane (Faza 1).");
process.exit(1);
