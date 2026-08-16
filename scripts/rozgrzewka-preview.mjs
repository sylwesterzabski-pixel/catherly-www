#!/usr/bin/env node
/**
 * Rozgrzewka celu pomiaru — O3 (decyzja właściciela 2026-08-16).
 *
 * ── Co naprawia ───────────────────────────────────────────────────
 * `lhci collect` pętli przebiegami WEWNĄTRZ adresu
 * (@lhci/cli/src/collect/collect.js:130), więc przebieg #1 każdej trasy
 * trafia w zimną krawędź CDN, a przebiegi 2..n w rozgrzaną. To nie jest
 * teoria: w przebiegu 31953862971 na czterech z siedmiu tras przebieg #1
 * był najwolniejszy, a trzy z nich malały monotonicznie
 * (/funkcje/tresci 1984 · 1641 · 1140; /funkcje/zespol 2029 · 1892 · 972;
 * / 2482 · 2077 · 1605). Przy `median-run` jeden zimny przebieg nie
 * ginie — potrafi zostać REPREZENTANTEM, jeśli jego FCP i TTI wypadną
 * blisko median, i wtedy bramka sądzi trasę po koszcie chybienia
 * w cache Vercela.
 *
 * Rozgrzewka pobiera każdą mierzoną trasę RAZEM Z JEJ ZASOBAMI (chunki
 * JS, arkusze, fonty, obrazy `/_next/image`) zanim ruszy Lighthouse.
 * Pobranie samego HTML-a nie wystarcza: LCP wisi na zasobach, nie na
 * dokumencie, a `fetch` — inaczej niż przeglądarka — nie pociąga
 * niczego, do czego HTML się odwołuje.
 *
 * ── Czego ta rozgrzewka NIE mierzy, czyli koszt decyzji ────────────
 * Po rozgrzewce bramka przestaje widzieć koszt ZIMNEGO wejścia. To jest
 * świadome zawężenie, nie ulepszenie: gdyby nasz build kiedyś urósł tak,
 * że pierwsze pobranie z krawędzi robi się wolne, ta bramka tego NIE
 * pokaże. Zamieniamy jedną klasę czułości (koszt chybienia w cache
 * Vercela, na który nie mamy wpływu i którego prawdziwy odwiedzający na
 * produkcji zwykle nie płaci, bo ruch trzyma krawędź ciepłą) na
 * powtarzalność werdyktu. Wpisane tutaj, żeby nikt nie odkrył tego jako
 * niespodzianki.
 *
 * ── Dlaczego to strażnik, nie adnotacja ───────────────────────────
 * Skoro i tak dotykamy wszystkich siedmiu tras, to widzimy ich statusy
 * i nagłówek wydania. Strażnik `bramka:preview` sprawdza WYŁĄCZNIE „/",
 * więc do dziś sześć pozostałych tras mogło oddawać 404 albo wdrożenie
 * innego commita, a bramka zmierzyłaby to zielono — ta sama klasa dziury
 * („zielono, bo nie to"), którą tamten strażnik zamyka dla jednej trasy.
 * Odwracanie wzroku od statusu, który już mamy w ręku, byłoby wyborem.
 * Czerwień tutaj znaczy dokładnie jedno: pod którymś z mierzonych
 * adresów NIE STOI to, co ma być zmierzone.
 *
 * Zasoby są wyjątkiem — ich niepowodzenia są LICZONE I WYPISANE, ale nie
 * zapalają czerwieni. Kontraktem tego pliku są dokumenty tras; o brakach
 * w zasobach i tak mówi sam raport Lighthouse, a zgadywanie, które
 * odwołanie w HTML-u jest obowiązkowe, wpuściłoby tu czerwień losową.
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const BAZA = (process.env.LHCI_BAZA || "").trim();
const SEKRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const OCZEKIWANY = (process.env.OCZEKIWANY_COMMIT || "").trim();
const PRZEBIEGI_ROZGRZEWKI = Number(process.env.ROZGRZEWKA_PRZEBIEGI || 2);
const PROBY = Number(process.env.ROZGRZEWKA_PROBY || 3);
const ODSTEP_S = Number(process.env.ROZGRZEWKA_ODSTEP_S || 5);

const KRESKA = "─".repeat(68);

/**
 * Tryb lokalny nie ma czego rozgrzewać: serwer podnosi dopiero
 * `lhci autorun` (startServerCommand), więc ten krok byłby strzałem
 * w nieistniejący port. Wyjście zerem, nie czerwienią.
 */
if (!BAZA) {
  console.log(
    "\nRozgrzewka pominięta: LHCI_BAZA nieustawione (tryb lokalny —\n" +
      "serwer podnosi dopiero `lhci autorun`).\n",
  );
  process.exit(0);
}

/** Adresy bierzemy STĄD, gdzie bierze je pomiar — nie z drugiej listy. */
const ADRESY = require("../lighthouserc.cjs")?.ci?.collect?.url ?? [];
if (ADRESY.length === 0) {
  console.error(
    "\n✖ ROZGRZEWKA: lighthouserc.cjs nie podaje żadnego adresu do pomiaru.\n",
  );
  process.exit(1);
}

const naglowki = SEKRET ? { "x-vercel-protection-bypass": SEKRET } : {};
const PRZEJSCIOWE = new Set([404, 429, 500, 502, 503, 504]);
const odczekaj = (s) => new Promise((ok) => setTimeout(ok, s * 1000));

/**
 * Zasoby wyłuskane z HTML-a. Bierzemy tylko ścieżki tego samego
 * pochodzenia i tylko takie, które wyglądają na zasób, a nie na łącze do
 * podstrony — `href="/funkcje"` to nawigacja, nie plik do rozgrzania.
 */
const ZASOB = /\.(js|mjs|css|woff2?|ttf|otf|svg|png|jpe?g|webp|avif|ico|json|txt)(\?|$)/i;

/** @param {string} html @returns {string[]} */
function zasobyZHtml(html) {
  const znalezione = new Set();
  const dodaj = (surowy) => {
    if (!surowy) return;
    const sciezka = surowy.trim().replace(/&amp;/g, "&");
    // Tylko własne pochodzenie: „/coś", nigdy „//host" ani „https://".
    if (!sciezka.startsWith("/") || sciezka.startsWith("//")) return;
    if (!sciezka.startsWith("/_next/") && !ZASOB.test(sciezka)) return;
    znalezione.add(sciezka);
  };

  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) dodaj(m[1]);
  // srcset/imagesrcset: „adres 1x, adres 2x" — adres jest pierwszym słowem.
  for (const m of html.matchAll(/(?:imagesrcset|srcset)="([^"]+)"/g)) {
    for (const wpis of m[1].split(",")) dodaj(wpis.trim().split(/\s+/)[0]);
  }
  return [...znalezione];
}

/** Pobranie z ograniczoną równoległością — jak przeglądarka, nie jak młot. */
async function pobierzZasoby(baza, sciezki, rownolegle = 6) {
  let ok = 0;
  let bledy = 0;
  let bajty = 0;
  const kolejka = [...sciezki];
  const robotnik = async () => {
    for (;;) {
      const sciezka = kolejka.shift();
      if (!sciezka) return;
      try {
        const odp = await fetch(baza + sciezka, { headers: naglowki });
        const buf = await odp.arrayBuffer();
        if (odp.ok) {
          ok += 1;
          bajty += buf.byteLength;
        } else {
          bledy += 1;
        }
      } catch {
        bledy += 1;
      }
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(rownolegle, kolejka.length) }, robotnik),
  );
  return { ok, bledy, bajty };
}

/**
 * Jedno pobranie dokumentu trasy, z ponowieniami na statusach
 * przejściowych. Zwraca opis albo kończy bieg czerwienią.
 *
 * @param {string} adres
 * @returns {Promise<{ms:number, bajty:number, html:string, wydanie:string|null}>}
 */
async function dokument(adres) {
  let ostatni = "brak prób";
  for (let proba = 1; proba <= PROBY; proba += 1) {
    const start = performance.now();
    let odp;
    try {
      odp = await fetch(adres, { redirect: "manual", headers: naglowki });
    } catch (e) {
      ostatni = `adres nieosiągalny (${e && e.message ? e.message : e})`;
      if (proba < PROBY) await odczekaj(ODSTEP_S);
      continue;
    }

    if (odp.status >= 300 && odp.status < 400) {
      const cel = odp.headers.get("location") || "(brak nagłówka Location)";
      // Wartości nagłówka Location NIE skracamy do zera, ale i nie
      // wypisujemy całej odpowiedzi: przy ścianie logowania Vercel
      // odsyła Set-Cookie _vercel_jwt, którego ładunek niesie sekret
      // obejścia otwartym tekstem.
      przerwij(
        adres,
        `przekierowanie HTTP ${odp.status} → ${cel.slice(0, 120)}`,
        /vercel\.com\/(sso-api|login)/.test(cel)
          ? "To ściana logowania Vercela: obejście nie działa. Sekret\n" +
              "  VERCEL_AUTOMATION_BYPASS_SECRET w GitHubie musi być tym\n" +
              "  kluczem Protection Bypass, który Vercel wstrzykuje do wdrożeń."
          : "Mierzona trasa ma oddawać stronę, nie przekierowanie —\n" +
              "  runda przekierowania doliczyłaby się do LCP.",
      );
    }

    if (odp.status !== 200) {
      if (PRZEJSCIOWE.has(odp.status) && proba < PROBY) {
        ostatni = `HTTP ${odp.status}`;
        await odczekaj(ODSTEP_S);
        continue;
      }
      przerwij(
        adres,
        `HTTP ${odp.status}`,
        "Lighthouse zmierzyłby tę odpowiedź i oddał wynik — najpewniej\n" +
          "  dobry, bo strona błędu jest lekka. Zieleń bez pokrycia.",
      );
    }

    const html = await odp.text();
    return {
      ms: Math.round(performance.now() - start),
      bajty: html.length,
      html,
      wydanie: odp.headers.get("x-catherly-wydanie"),
    };
  }
  przerwij(adres, ostatni, `Wyczerpane ${PROBY} próby.`);
}

/** @param {string} adres @param {string} powod @param {string} [szczegol] */
function przerwij(adres, powod, szczegol) {
  console.error(`\n✖ ROZGRZEWKA ZATRZYMAŁA BRAMKĘ: ${powod}`);
  console.error(`  Trasa: ${adres}`);
  if (szczegol) console.error(`  ${szczegol}`);
  console.error(
    "\n  Pod mierzonym adresem nie stoi to, co ma zostać zmierzone.\n" +
      "  Bramka jest czerwona, zamiast mierzyć cokolwiek (ADR-018).\n",
  );
  process.exit(1);
}

console.log("");
console.log(KRESKA);
console.log(
  `ROZGRZEWKA CELU POMIARU — ${ADRESY.length} tras × ${PRZEBIEGI_ROZGRZEWKI} przebiegi`,
);
console.log(KRESKA);
console.log(
  "Lighthouse pętli przebiegami wewnątrz adresu, więc przebieg #1 każdej\n" +
    "trasy płaci za zimną krawędź CDN. Pobieramy tu każdą trasę razem\n" +
    "z jej zasobami, żeby ten koszt nie wszedł do werdyktu.",
);
console.log(
  OCZEKIWANY
    ? `Prowieniencja sprawdzana na KAŻDEJ trasie: ${OCZEKIWANY.slice(0, 12)}`
    : "Prowieniencja NIE sprawdzana (brak OCZEKIWANY_COMMIT) — to diagnostyka.",
);
console.log("");

const pomiary = new Map();
let zasobowOk = 0;
let zasobowBledow = 0;

for (let przebieg = 1; przebieg <= PRZEBIEGI_ROZGRZEWKI; przebieg += 1) {
  console.log(`  przebieg ${przebieg}/${PRZEBIEGI_ROZGRZEWKI}`);
  for (const adres of ADRESY) {
    const d = await dokument(adres);

    if (!d.wydanie) {
      przerwij(
        adres,
        "brak nagłówka x-catherly-wydanie",
        "Bez niego nie da się odróżnić wdrożenia tego commita od cudzego.",
      );
    }
    if (OCZEKIWANY && d.wydanie !== OCZEKIWANY) {
      przerwij(
        adres,
        `pod adresem stoi wydanie ${d.wydanie.slice(0, 12)}, oczekiwane ${OCZEKIWANY.slice(0, 12)}`,
        "Strażnik celu pomiaru potwierdził stronę główną, ale ta trasa\n" +
          "  serwuje INNY commit. Pomiar cudzego kodu jest zielenią bez\n" +
          "  pokrycia — i strażnik „/” sam z siebie by tego nie zobaczył.",
      );
    }

    const sciezka = new URL(adres).pathname;
    const zasoby = zasobyZHtml(d.html);
    const z = await pobierzZasoby(BAZA.replace(/\/+$/, ""), zasoby);
    zasobowOk += z.ok;
    zasobowBledow += z.bledy;

    const poprzedni = pomiary.get(sciezka);
    pomiary.set(sciezka, [...(poprzedni || []), d.ms]);

    console.log(
      `    ${sciezka.padEnd(24)} ${String(d.ms).padStart(5)} ms  ` +
        `${String(d.bajty).padStart(6)} B  zasoby ${String(z.ok).padStart(2)}` +
        (z.bledy ? ` (${z.bledy} nieudanych)` : "") +
        `  ${(z.bajty / 1024).toFixed(0)} kB`,
    );
  }
}

console.log("");
if (PRZEBIEGI_ROZGRZEWKI > 1) {
  console.log("  dokument: pierwszy → ostatni przebieg rozgrzewki");
  for (const [sciezka, czasy] of pomiary) {
    const roznica = czasy[czasy.length - 1] - czasy[0];
    console.log(
      `    ${sciezka.padEnd(24)} ${czasy.join(" → ")} ms` +
        `   ${roznica > 0 ? "+" : ""}${roznica} ms`,
    );
  }
  console.log(
    "\n  Te liczby to czas pobrania SAMEGO dokumentu przez fetch, nie LCP.\n" +
      "  Mówią, czy krawędź się rozgrzała — nie, jak szybka jest strona.",
  );
}
console.log("");
console.log(
  `✔ Rozgrzane: ${ADRESY.length}/${ADRESY.length} tras, ` +
    `${zasobowOk} pobrań zasobów` +
    (zasobowBledow ? `, ${zasobowBledow} nieudanych (nie blokują)` : "") +
    (OCZEKIWANY ? `. Wydanie zgodne na każdej trasie.` : "."),
);
console.log(KRESKA);
console.log("");
