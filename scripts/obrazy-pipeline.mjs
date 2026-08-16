#!/usr/bin/env node
/**
 * Pipeline obrazów Z6 — PNG źródłowy → AVIF + WebP (warianty srcset)
 * + zapasowy PNG. Rejestr: design/pipeline-obrazow.json (jedno źródło
 * prawdy wspólne z src/obrazy/zrzuty.ts).
 *
 * ── Kolejność, która nie jest kosmetyczna ─────────────────────────
 * Instrukcja przekazania (design/obrazy-robocze/z6/PRZEKAZANIE-DO-WWW.md,
 * sekcja „Integralność") mówi wprost: „Konwersja do AVIF/WebP odbywa się
 * po stronie strony Z TEGO ŹRÓDŁA, nie z pliku o innej sumie". Dlatego
 * suma SHA-256 KAŻDEGO pliku źródłowego jest sprawdzana PRZED pierwszą
 * konwersją, a nie po niej ani obok niej. Rozjazd = padnij(), zero
 * plików wyjściowych, prośba o ponowną dostawę — nie „przecież widać,
 * że to ten obraz".
 *
 * ── Czego ten skrypt NIE robi ─────────────────────────────────────
 * Nie retuszuje, nie kadruje, nie zmienia proporcji (ADR-011 i sekcja
 * „NIE ROBI" instrukcji). Jedyna operacja to zmiana rozmiaru (Lanczos
 * przez sharp) i kompresja. Wymiar źródłowy z rejestru jest WERYFIKOWANY
 * na realnym pliku — deklaracja w JSON-ie nie wystarcza za dowód.
 *
 * Uruchomienie: npm run obrazy:pipeline
 * Artefakty są COMMITOWANE (public/), więc build i CI nie zależą od
 * sharpa — skrypt jest narzędziem, nie krokiem budowania.
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REJESTR = JSON.parse(
  readFileSync(join(ROOT, "design/pipeline-obrazow.json"), "utf8"),
);

function padnij(powod) {
  console.error(`✗ ${powod}`);
  console.error("\nPipeline obrazów PRZERWANY — żaden plik nie został opublikowany.");
  process.exit(1);
}

/** Sumy z SUMY-KONTROLNE.sha256 dostawy: { nazwaPliku: suma }. */
function sumyDostawy(katalogZrodla) {
  const surowe = readFileSync(join(katalogZrodla, REJESTR.sumy), "utf8");
  const mapa = new Map();
  for (const linia of surowe.split("\n")) {
    if (!linia.trim()) continue;
    // Format shasum: "<suma>  <nazwa>" (dwie spacje) albo "<suma> *<nazwa>".
    const m = linia.match(/^([0-9a-f]{64})\s+\*?(.+)$/);
    if (!m) padnij(`Nieczytelny wiersz w ${REJESTR.sumy}: ${linia}`);
    mapa.set(m[2].trim(), m[1]);
  }
  return mapa;
}

const katalogZrodla = join(ROOT, REJESTR.zrodlo);
const katalogWyjscia = join(ROOT, REJESTR.wyjscie);
const sumy = sumyDostawy(katalogZrodla);

// ── 1. Integralność źródła (przed czymkolwiek) ───────────────────
for (const obraz of REJESTR.obrazy) {
  const oczekiwana = sumy.get(obraz.plik);
  if (!oczekiwana) {
    padnij(
      `${obraz.plik} nie ma sumy w ${REJESTR.sumy} — plik spoza dostawy albo niekompletna paczka.`,
    );
  }
  const bajty = readFileSync(join(katalogZrodla, obraz.plik));
  const zmierzona = createHash("sha256").update(bajty).digest("hex");
  if (zmierzona !== oczekiwana) {
    padnij(
      `${obraz.plik}: suma SHA-256 się nie zgadza.\n` +
        `  oczekiwana: ${oczekiwana}\n  zmierzona:  ${zmierzona}\n` +
        `  Plik został po drodze przekonwertowany albo zmodyfikowany.\n` +
        `  Instrukcja przekazania: NIE PUBLIKUJ — poproś o ponowną dostawę.`,
    );
  }
  console.log(`✓ suma OK: ${obraz.plik}`);
}

// Sumy zgodne — a czy paczka ma dokładnie te pliki, których używamy?
const nadmiarowe = [...sumy.keys()].filter(
  (n) => !REJESTR.obrazy.some((o) => o.plik === n),
);
if (nadmiarowe.length > 0) {
  padnij(
    `Dostawa zawiera pliki spoza rejestru: ${nadmiarowe.join(", ")}.\n` +
      `  Albo rejestr jest niepełny, albo wymieszały się dostawy — rozstrzygnij, nie zgaduj.`,
  );
}

// ── 2. Generowanie wariantów ─────────────────────────────────────
// Katalog wyjściowy jest odtwarzany od zera: plik po zmianie nazwy
// w rejestrze zostawałby inaczej jako sierota i mógłby udawać aktualny.
rmSync(katalogWyjscia, { recursive: true, force: true });
mkdirSync(katalogWyjscia, { recursive: true });

const wygenerowane = [];
for (const obraz of REJESTR.obrazy) {
  const zrodlo = join(katalogZrodla, obraz.plik);
  const meta = await sharp(zrodlo).metadata();
  if (
    meta.width !== REJESTR.szerokoscZrodla ||
    meta.height !== REJESTR.wysokoscZrodla
  ) {
    padnij(
      `${obraz.plik}: wymiar ${meta.width}×${meta.height}, rejestr deklaruje ` +
        `${REJESTR.szerokoscZrodla}×${REJESTR.wysokoscZrodla}. ` +
        `Odbiór odrzuca inny wymiar (kontrakt obrazów, handoff K4).`,
    );
  }

  for (const format of REJESTR.formaty) {
    for (const szerokosc of REJESTR.szerokosci) {
      const nazwa = `${obraz.baza}-${szerokosc}.${format}`;
      const cel = join(katalogWyjscia, nazwa);
      const potok = sharp(zrodlo).resize({ width: szerokosc, withoutEnlargement: true });
      // Jakość dobrana pod zrzuty interfejsu (ostre krawędzie tekstu),
      // nie pod fotografię: AVIF 60 i WebP 82 to wartości, przy których
      // przy 1280 px nie widać artefaktów na cienkich liniach tabel.
      const zapisany =
        format === "avif"
          ? await potok.avif({ quality: 60, effort: 6 }).toFile(cel)
          : await potok.webp({ quality: 82, effort: 6 }).toFile(cel);
      wygenerowane.push({ nazwa, bajty: zapisany.size, szerokosc: zapisany.width });
    }
  }

  // Zapasowy PNG: KOPIA BAJT W BAJT pliku źródłowego. Ponowne
  // zakodowanie dałoby te same piksele, ale inną sumę — a wtedy plik
  // publikowany przestałby być tym, który przeszedł weryfikację.
  const nazwaZapasowa = `${obraz.baza}.${REJESTR.zapasowy}`;
  const bajty = readFileSync(zrodlo);
  writeFileSync(join(katalogWyjscia, nazwaZapasowa), bajty);
  wygenerowane.push({
    nazwa: nazwaZapasowa,
    bajty: bajty.length,
    szerokosc: REJESTR.szerokoscZrodla,
  });
}

// ── 3. Raport (waga ma być widoczna, nie domyślna) ───────────────
const suma = wygenerowane.reduce((a, w) => a + w.bajty, 0);
for (const w of [...wygenerowane].sort((a, b) => a.nazwa.localeCompare(b.nazwa))) {
  console.log(`  ${w.nazwa.padEnd(34)} ${String(Math.round(w.bajty / 1024)).padStart(5)} kB`);
}
console.log(
  `\nPipeline obrazów: ${wygenerowane.length} plików, razem ` +
    `${Math.round(suma / 1024)} kB w ${REJESTR.wyjscie}.`,
);

// Kontrola na wyjściu: tyle plików, ile deklaruje rejestr.
const oczekiwanaLiczba =
  REJESTR.obrazy.length * (REJESTR.formaty.length * REJESTR.szerokosci.length + 1);
const naDysku = readdirSync(katalogWyjscia).length;
if (naDysku !== oczekiwanaLiczba) {
  padnij(`Na dysku ${naDysku} plików, rejestr wymaga ${oczekiwanaLiczba}.`);
}
