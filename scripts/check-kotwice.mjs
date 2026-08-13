#!/usr/bin/env node
/**
 * Bramka: Kotwice — 0 linków do nieistniejących kotwic (Faza 4, Etap D).
 *
 * Powód istnienia: bramka linków (check-linki.mjs) odcina fragment
 * PRZED sprawdzeniem — wzorzec /href="(\/[^"#?]*)/g. Adres
 * /funkcje/tresci#nie-ma-takiej-kotwicy przechodzi tam na zielono,
 * bo strona docelowa istnieje. Indeks /funkcje stoi w całości na
 * linkach do kotwic modułów, więc od Etapu D ta dziura jest realna.
 *
 * Sprawdzane są OBA rodzaje linków z fragmentem:
 *   href="/funkcje/tresci#tarcza"  → kotwica na innej stronie,
 *   href="#tarcza"                 → kotwica na tej samej stronie
 *                                     (spis treści, przejścia).
 *
 * Działa na wyrenderowanym HTML z builda. Bez builda bramka jest
 * czerwona — nie ma czego sprawdzić.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const HTML_DIR = join(ROOT, ".next", "server", "app");

if (!existsSync(HTML_DIR)) {
  console.error(
    "✗ Brak zbudowanej strony (.next/server/app) — uruchom `npm run build`.\n" +
      "  Bramka kotwic bez builda jest CZERWONA."
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

// trasa → ścieżka pliku HTML (odwrotnie niż w bramce linków, bo tu
// trzeba OTWORZYĆ stronę docelową i poszukać w niej id).
const trasaDoPliku = new Map();
for (const plik of pliki) {
  const wzgledna = relative(HTML_DIR, plik).replace(/\.html$/, "");
  const trasa =
    wzgledna === "index" ? "/" : `/${wzgledna.replace(/\/index$/, "")}`;
  trasaDoPliku.set(trasa, plik);
}

// Routing next-intl "as-needed": pl bez prefiksu (patrz check-linki.mjs).
const DOMYSLNY_JEZYK = "pl";
for (const [trasa, plik] of [...trasaDoPliku]) {
  if (trasa === `/${DOMYSLNY_JEZYK}`) trasaDoPliku.set("/", plik);
  else if (trasa.startsWith(`/${DOMYSLNY_JEZYK}/`)) {
    trasaDoPliku.set(trasa.slice(DOMYSLNY_JEZYK.length + 1), plik);
  }
}

// Zbiór id danej strony — liczony raz na plik, nie raz na link.
const pamiecId = new Map();
const idStrony = (plik) => {
  if (!pamiecId.has(plik)) {
    const html = readFileSync(plik, "utf8");
    const zbior = new Set();
    for (const m of html.matchAll(/\sid="([^"]+)"/g)) zbior.add(m[1]);
    pamiecId.set(plik, zbior);
  }
  return pamiecId.get(plik);
};

const odkoduj = (fragment) => {
  try {
    return decodeURIComponent(fragment);
  } catch {
    return fragment;
  }
};

let sprawdzone = 0;
let bledy = 0;

for (const plik of pliki) {
  const html = readFileSync(plik, "utf8");
  const wzgledna = relative(HTML_DIR, plik).replace(/\.html$/, "");
  const trasaTejStrony =
    wzgledna === "index" ? "/" : `/${wzgledna.replace(/\/index$/, "")}`;

  for (const m of html.matchAll(/href="([^"]*#[^"]*)"/g)) {
    const [sciezkaSurowa, fragmentSurowy] = (() => {
      const i = m[1].indexOf("#");
      return [m[1].slice(0, i), m[1].slice(i + 1)];
    })();

    // href="#" (bez fragmentu) nie jest kotwicą do sprawdzenia.
    if (fragmentSurowy === "") continue;
    // Linki zewnętrzne i mailto z fragmentem — poza zakresem bramki.
    if (/^[a-z]+:/i.test(sciezkaSurowa)) continue;

    const fragment = odkoduj(fragmentSurowy);
    const trasaCelu =
      sciezkaSurowa === ""
        ? trasaTejStrony
        : sciezkaSurowa === "/"
          ? "/"
          : sciezkaSurowa.replace(/\/$/, "");

    const plikCelu = trasaDoPliku.get(trasaCelu);
    sprawdzone++;

    if (!plikCelu) {
      // Martwą TRASĘ zgłasza bramka linków; tutaj zgłaszamy ją tylko
      // dlatego, że bez strony docelowej nie da się sprawdzić kotwicy.
      console.error(
        `✗ ${relative(ROOT, plik)} — link #${fragment}: brak strony docelowej ${trasaCelu}`
      );
      bledy++;
      continue;
    }

    if (!idStrony(plikCelu).has(fragment)) {
      console.error(
        `✗ ${relative(ROOT, plik)} — kotwica nie istnieje: ${trasaCelu}#${fragment}\n` +
          `  (strona docelowa: ${relative(ROOT, plikCelu)} — brak elementu o tym id)`
      );
      bledy++;
    }
  }
}

if (bledy > 0) {
  console.error(`\nKotwice: ${bledy} martwych z ${sprawdzone}. Bramka CZERWONA.`);
  process.exit(1);
}
console.log(
  `Kotwice: zielone (${sprawdzone} linków z fragmentem, 0 martwych kotwic).`
);
