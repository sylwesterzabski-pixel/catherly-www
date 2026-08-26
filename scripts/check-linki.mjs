#!/usr/bin/env node
/**
 * Bramka: Linki — 0 martwych linków wewnętrznych (PLAN.md sekcja 5)
 * ORAZ uzgodnienie builda z rejestrem ścieżek w OBIE strony (E-10).
 *
 * CO SIĘ ZMIENIŁO W ETAPIE E i dlaczego. Do Etapu E bramka budowała
 * zbiór „adresów żywych" z LISTINGU PLIKÓW `.next/server/app/*.html`.
 * Pytała więc: „czy build wytworzył plik pod tym adresem?", a to nie
 * jest pytanie o link martwy. O tym, czy adres ODPOWIADA, decyduje
 * ISTNIEJACE_SCIEZKI w src/i18n/sciezki.ts: middleware przepisuje
 * KAŻDY adres spoza rejestru na stronę 404 (B2). Artefakt mógł więc
 * istnieć, a adres i tak zwracać 404 — bramka nazywała taki link
 * żywym. Rozjazd nie był hipotetyczny: bramka nosiła własną łatę na
 * regexpie (`/nie-znaleziono`), bo dokładnie ten przypadek już
 * zachodził, tylko wiedza o nim mieszkała TUTAJ, a nie w rejestrze.
 *
 * Teraz źródłem prawdy jest rejestr, a build jest z nim UZGADNIANY
 * w obie strony. Artefakty muszą się rozłożyć bez reszty na trzy
 * zadeklarowane kategorie (wszystkie z src/i18n/sciezki.ts):
 *   A. ISTNIEJACE_SCIEZKI        — adresy żywe, legalne cele linków;
 *   B. PRERENDEROWANE_BEZ_ADRESU — artefakt jest, adres zwraca 404;
 *   C. artefakty ramy Next       — nie są naszymi trasami (_not-found).
 * Artefakt, który nie pasuje do żadnej z nich, to strona zbudowana
 * i niedostępna — cicha strata, i dlatego jest to CZERWIEŃ, nie
 * ostrzeżenie.
 *
 * Bez builda bramka jest czerwona — nie ma czego sprawdzić.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const ROOT = process.cwd();
const HTML_DIR = join(ROOT, ".next", "server", "app");

/** Artefakty ramy Next — nie są trasami serwisu (kategoria C). */
const ARTEFAKTY_RAMY = new Set(["/_not-found"]);

const padnij = (powod) => {
  console.error(`✗ ${powod}`);
  console.error("\nLinki: bramka CZERWONA.");
  process.exit(1);
};

if (!existsSync(HTML_DIR)) {
  padnij(
    "Brak zbudowanej strony (.next/server/app) — uruchom `npm run build`.\n" +
      "  Bramka linków bez builda jest CZERWONA.",
  );
}

/**
 * Rejestr jest w TypeScripcie, a bramka to zwykły skrypt node — więc
 * moduł jest tu TRANSPILOWANY i WYKONYWANY, nie parsowany regexpem.
 * To różnica merytoryczna: regexp czytałby zapis, a wykonanie czyta
 * WARTOŚĆ — łącznie ze spłaszczeniem mapy stopki, które regexp musiałby
 * odtwarzać po swojemu (czyli zawiązać drugie źródło prawdy).
 *
 * Podmieniany jest wyłącznie import routingu: `next-intl/routing` nie
 * ładuje się poza Nextem, a rejestr potrzebuje z niego tylko listy
 * języków — czytanej z src/i18n/routing.ts, więc nadal jednego źródła.
 */
async function wczytajRejestr() {
  const zrodloRoutingu = readFileSync(join(ROOT, "src/i18n/routing.ts"), "utf8");
  const dopasowanieJezykow = zrodloRoutingu.match(/locales:\s*(\[[^\]]*\])/);
  const dopasowanieDomyslnego = zrodloRoutingu.match(/defaultLocale:\s*"([^"]+)"/);
  if (!dopasowanieJezykow || !dopasowanieDomyslnego) {
    padnij(
      "src/i18n/routing.ts zmieniło kształt — bramka nie odczytała listy języków.\n" +
        "  Napraw odczyt tutaj; NIE wpisuj języków na sztywno (byłoby to drugie źródło prawdy).",
    );
  }
  const locales = JSON.parse(dopasowanieJezykow[1].replace(/'/g, '"'));
  const defaultLocale = dopasowanieDomyslnego[1];

  const zrodlo = readFileSync(join(ROOT, "src/i18n/sciezki.ts"), "utf8");
  const WZORZEC_IMPORTU = /^import \{ routing \} from "\.\/routing";$/m;
  if (!WZORZEC_IMPORTU.test(zrodlo)) {
    padnij(
      "src/i18n/sciezki.ts nie zaczyna się od znanego importu routingu —\n" +
        "  bramka nie umie go podmienić i NIE ZGADUJE. Zaktualizuj wzorzec w tym pliku.",
    );
  }
  const podmieniony = zrodlo.replace(
    WZORZEC_IMPORTU,
    `const routing = ${JSON.stringify({ locales, defaultLocale })};`,
  );
  const { outputText } = ts.transpileModule(podmieniony, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const plik = join(tmpdir(), `catherly-sciezki-${process.pid}.mjs`);
  writeFileSync(plik, outputText);
  return { modul: await import(pathToFileURL(plik).href), locales, defaultLocale };
}

const { modul, locales, defaultLocale } = await wczytajRejestr();
const { ISTNIEJACE_SCIEZKI, PRERENDEROWANE_BEZ_ADRESU, adresWJezyku } = modul;

if (!Array.isArray(ISTNIEJACE_SCIEZKI) || ISTNIEJACE_SCIEZKI.length === 0) {
  padnij("Rejestr ISTNIEJACE_SCIEZKI jest pusty albo nie jest tablicą — nie ma czego uzgadniać.");
}

// ── Artefakty builda ────────────────────────────────────────────────
const pliki = [];
const idz = (dir) => {
  for (const nazwa of readdirSync(dir)) {
    const pelna = join(dir, nazwa);
    if (statSync(pelna).isDirectory()) idz(pelna);
    else if (nazwa.endsWith(".html")) pliki.push(pelna);
  }
};
idz(HTML_DIR);

const trasyArtefaktow = new Set();
for (const plik of pliki) {
  const wzgledna = relative(HTML_DIR, plik).replace(/\.html$/, "");
  trasyArtefaktow.add(
    wzgledna === "index" ? "/" : `/${wzgledna.replace(/\/index$/, "")}`,
  );
}

// ── Trzy kategorie, rozpisane na adresy z prefiksem języka ──────────
const trasaZPrefiksem = (jezyk, sciezka) =>
  sciezka === "/" ? `/${jezyk}` : `/${jezyk}${sciezka}`;

const oczekiwaneZRejestru = new Set();
const zywe = new Set();
for (const jezyk of locales) {
  for (const sciezka of ISTNIEJACE_SCIEZKI) {
    oczekiwaneZRejestru.add(trasaZPrefiksem(jezyk, sciezka));
    // Adres, pod którym strona faktycznie ODPOWIADA (routing "as-needed":
    // język domyślny bez prefiksu) — jedyne legalne cele linków.
    zywe.add(adresWJezyku(jezyk, sciezka));
  }
}
const prerenderowaneBezAdresu = new Set(
  locales.flatMap((jezyk) =>
    PRERENDEROWANE_BEZ_ADRESU.map((sciezka) => trasaZPrefiksem(jezyk, sciezka)),
  ),
);

let bledy = 0;
const zglos = (linia) => {
  console.error(`✗ ${linia}`);
  bledy++;
};

// ── Kierunek 1: rejestr → build ─────────────────────────────────────
// Rejestr obiecuje stronę; build musi ją mieć. Brak = middleware
// wpuszcza ruch pod adres, pod którym nic nie stoi.
for (const trasa of oczekiwaneZRejestru) {
  if (!trasyArtefaktow.has(trasa)) {
    zglos(`rejestr obiecuje adres bez artefaktu w buildzie: ${trasa}`);
  }
}

// ── Kierunek 2: build → rejestr ─────────────────────────────────────
// Każdy artefakt musi należeć do jednej z trzech zadeklarowanych
// kategorii. Nadmiar = strona zbudowana, ale przez middleware
// niedostępna — koszt poniesiony, pożytku zero, i nikt tego nie widzi.
for (const trasa of trasyArtefaktow) {
  if (oczekiwaneZRejestru.has(trasa)) continue;
  if (prerenderowaneBezAdresu.has(trasa)) continue;
  if (ARTEFAKTY_RAMY.has(trasa)) continue;
  zglos(
    `artefakt builda poza wszystkimi kategoriami: ${trasa}\n` +
      "   → dopisz ścieżkę do MAPA_STOPKI albo WYLACZONE_Z_MAPY (adres żywy),\n" +
      "     albo do PRERENDEROWANE_BEZ_ADRESU (świadomie nieosiągalny) — src/i18n/sciezki.ts",
  );
}

// ── Kierunek 3: linki w HTML → adresy żywe ──────────────────────────
// Zbiór celów pochodzi z REJESTRU, nie z listingu plików: o tym, czy
// adres odpowiada, decyduje middleware, a nie obecność pliku.
let martwe = 0;
for (const plik of pliki) {
  const html = readFileSync(plik, "utf8");
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const cel = m[1] === "/" ? "/" : m[1].replace(/\/$/, "");
    if (cel.startsWith("/_next")) continue;
    /* ZASÓB STATYCZNY TO NIE TRASA (dopisane 2026-08-26, WWW/045).
       Ta pętla zakładała, że każdy `href="/…"` wskazuje adres z rejestru,
       i było to prawdą dopóki żaden zasób nie trafiał do `href`. React 19
       emituje `<link rel="preload" href="/obrazy/…">` dla obrazu ładowanego
       zachłannie — plik LEŻY w `public/`, więc zgłoszenie go jako martwego
       linku było FAŁSZYWYM ALARMEM, nie wykryciem.
       Sprawdzenie zostaje SPRAWDZENIEM, nie wyjątkiem: cel musi istnieć
       na dysku pod `public/`. Zmyślona ścieżka do zasobu daje czerwień —
       zmierzone mutacją 2026-08-26: `/obrazy/fala1/NIE-ISTNIEJE.avif`
       zapaliło bramkę w trzech językach naraz.

       ⚠ ZASIĘG WĘŻSZY, NIŻ SIĘ WYDAJE — i wyszedł dopiero z pomiaru.
       Ta pętla czyta WYŁĄCZNIE `href`, a obrazy trafiają do `href` tylko
       wtedy, gdy React wystawi im `<link rel="preload">` — czyli przy
       ładowaniu ZACHŁANNYM. Kadr `loading="lazy"` nie ma tu żadnego
       śladu i zmyślona ścieżka w nim PRZEJDZIE BEZ SŁOWA: pierwsza próba
       mutacji poszła właśnie na taki kadr i bramka została zielona.
       Kadry leniwe pilnuje zamiast tego suita e2e (istnienie i niepusty
       `alt`) — ale nie ta bramka i nie tutaj. */
    if (existsSync(join(ROOT, "public", cel.replace(/^\//, "")))) continue;
    if (!zywe.has(cel)) {
      console.error(
        `✗ ${relative(ROOT, plik)} — martwy link wewnętrzny: ${m[1]}`,
      );
      martwe++;
    }
  }
}

if (bledy > 0 || martwe > 0) {
  console.error(
    `\nLinki: ${martwe} martwych, ${bledy} rozjazdów build↔rejestr. Bramka CZERWONA.`,
  );
  process.exit(1);
}
console.log(
  `Linki: zielone (${pliki.length} artefaktów, ${ISTNIEJACE_SCIEZKI.length} ścieżek rejestru × ${locales.length} języki, ` +
    `0 martwych linków, 0 rozjazdów build↔rejestr; język domyślny: ${defaultLocale}).`,
);
