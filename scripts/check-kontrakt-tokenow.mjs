#!/usr/bin/env node
/**
 * Bramka: Kontrakt tokenów strona↔aplikacja (ADR-004, zawężenie ADR-022).
 * Zakres MINIMALNY: szew przejścia strona → aplikacja (ekrany logowania).
 * Bramka chroni szew przed dryfem palety STRONY; zmian po stronie
 * aplikacji nie widzi — kontrakt-aplikacji.json aktualizuje ręcznie
 * właściciel. Pełny kontrakt wraca osobnym ADR-em, gdy aplikacja zyska
 * eksport tokenów (ADR-022).
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const WYMAGANE = [
  ["design/tokens.json", "źródło prawdy wyglądu (Faza 1)"],
  ["design/style-dictionary.config.mjs", "konfiguracja generowania (Faza 1)"],
  ["design/kontrakt-aplikacji.json", "artefakt szwu do porównania (ADR-022, dostarcza właściciel)"],
];

let blad = false;
for (const [plik, opis] of WYMAGANE) {
  if (!existsSync(join(ROOT, plik))) {
    console.error(`✗ Brak ${plik} — ${opis}`);
    blad = true;
  }
}
if (blad) {
  console.error("\nKontrakt tokenów: bramka CZERWONA (brak artefaktów).");
  process.exit(1);
}

const HEX = /^#[0-9a-f]{6}$/i;
const tokeny = JSON.parse(readFileSync(join(ROOT, "design/tokens.json"), "utf8"));
const kontrakt = JSON.parse(readFileSync(join(ROOT, "design/kontrakt-aplikacji.json"), "utf8"));

const czerwien = (powod) => {
  console.error(`✗ ${powod}\n\nKontrakt tokenów: bramka CZERWONA.`);
  process.exit(1);
};

// --- walidacja schematu kontraktu (ADR-022) ---
if (!String(kontrakt._zakres ?? "").includes("MINIMALNY"))
  czerwien("Kontrakt nie deklaruje zakresu MINIMALNEGO (_zakres) — schemat niezgodny z ADR-022.");
const tloSzwu = kontrakt.szew_logowania?.tlo;
if (!HEX.test(tloSzwu ?? ""))
  czerwien("Brak poprawnego szew_logowania.tlo w kontrakcie.");
const wymaganie = kontrakt.wymaganie_szwu ?? {};
const odniesienie = wymaganie.strona_tlo_odniesienia;
const prog = wymaganie.prog;
if (!HEX.test(odniesienie ?? "") || typeof prog !== "number" || prog <= 0)
  czerwien("Brak poprawnego wymaganie_szwu (strona_tlo_odniesienia + prog) w kontrakcie.");

// --- tło strony z tokenów ---
const tloStrony = tokeny?.kolor?.tlo?.value;
if (!HEX.test(tloStrony ?? ""))
  czerwien("Brak poprawnego kolor.tlo.value w design/tokens.json.");
if (tloStrony.toLowerCase() !== odniesienie.toLowerCase())
  czerwien(
    `Tło strony (${tloStrony}) ≠ odniesienie kontraktu (${odniesienie}).\n` +
      "  Zmiana palety strony wymaga świadomej aktualizacji kontraktu (ADR), nie przejdzie bokiem."
  );

// --- deltaE CIE76 w CIELAB (D65) — ta sama matematyka co generuj-skale.mjs ---
const hexNaRgb = (hex) => [0, 2, 4].map((i) => parseInt(hex.replace("#", "").slice(i, i + 2), 16));
const lin = (c) => (c / 255 <= 0.04045 ? c / 255 / 12.92 : Math.pow((c / 255 + 0.055) / 1.055, 2.4));
const f = (t) => (t > Math.pow(6 / 29, 3) ? Math.cbrt(t) : t / (3 * Math.pow(6 / 29, 2)) + 4 / 29);
function hexNaLab(hex) {
  const [R, G, B] = hexNaRgb(hex).map(lin);
  const x = 0.4124564 * R + 0.3575761 * G + 0.1804375 * B;
  const y = 0.2126729 * R + 0.7151522 * G + 0.072175 * B;
  const z = 0.0193339 * R + 0.119192 * G + 0.9503041 * B;
  const BIALY = [0.95047, 1.0, 1.08883];
  const [fx, fy, fz] = [f(x / BIALY[0]), f(y / BIALY[1]), f(z / BIALY[2])];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}
const [a, b] = [hexNaLab(tloStrony), hexNaLab(tloSzwu)];
const deltaE = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

if (deltaE > prog)
  czerwien(
    `Szew przekracza próg: deltaE(tło strony ${tloStrony}, tło logowania ${tloSzwu}) = ` +
      `${deltaE.toFixed(1)} > ${prog} (ADR-022).`
  );

// --- zieleń z pełną etykietą zakresu (warunek uczciwości nr 2, ADR-022) ---
console.log(
  `Kontrakt tokenów: zielony w zakresie MINIMALNYM (szew logowania, ADR-022).\n` +
    `  deltaE(tło strony ${tloStrony}, tło logowania ${tloSzwu}) = ${deltaE.toFixed(1)} ≤ próg ${prog}.\n` +
    `  Pełny kontrakt strona↔aplikacja ODROCZONY do uporządkowania DS aplikacji.\n` +
    `  Detekcja zmian aplikacji: BRAK — kontrakt-aplikacji.json aktualizuje ręcznie właściciel.`
);
