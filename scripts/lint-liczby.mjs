#!/usr/bin/env node
/**
 * Bramka: Prawdziwość — linter liczb (Prawo 1; PLAN.md sekcja 2).
 *
 * Dwa przebiegi, bo liczba trafia na stronę dwiema drogami:
 *
 *  1. WARSTWA KODU — literalna cyfra w tekście JSX (src/**.tsx|jsx).
 *     Wartość ma pochodzić z content/facts.json przez import.
 *
 *  2. WARSTWA TREŚCI — src/i18n/messages/*.json, czyli praktycznie cała
 *     kopia serwisu. Przebiegu 2 NIE BYŁO do 2026-08-16: skan czytał
 *     wyłącznie .tsx/.jsx i tylko tekst POZA klamrami (`/>[^<>{}]*\d…/`),
 *     więc każdy ciąg renderowany przez `{t("…")}` był poza bramką,
 *     a liczebniki słowne („cztery fazy”, „sześć kroków”) były niewidoczne
 *     wszędzie. Rejestr warunków powrotu, poz. T6.
 *
 * Przebieg 2 nie kończy się nakazem „przenieś do facts.json”, bo strona
 * ma liczby, które faktem pomiarowym nie są: nazwę własną („Pierwsze
 * 90 Dni”), identyfikator („SHA-256”), cechę funkcji z tabeli obietnic
 * („cztery fazy” — decyzja D-D16). Każdy taki ciąg ma ROZSTRZYGNIĘCIE
 * zapisane w content/liczby-w-tresci.json: kategorię, pokrycie i komplet
 * znalezionych liczb per język.
 *
 * Rozstrzygnięcie NIE JEST wieczyste (CLAUDE.md: strażnik wygasa cicho,
 * gdy zmieni się otoczenie). Rejestr trzyma listę liczb, dla których
 * zgodę wydano — zmiana „sześć” na „osiem” zapala czerwień, mimo że
 * klucz i kategoria zostają te same. Poprawka literówki obok liczby —
 * nie zapala, bo zgoda dotyczyła liczby, nie akapitu.
 *
 * Tryby: --staged (hook pre-commit; ogranicza TYLKO przebieg 1)
 *        --inwentarz (wypisuje szkielet wpisów rejestru, nic nie zmienia)
 *        pełny (CI, całe src/)
 *
 * Fałszywe alarmy rozstrzyga się przez przeniesienie wartości do
 * facts.json albo przez WPIS w rejestrze — nie przez osłabienie lintera.
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative, basename } from "node:path";

const STAGED = process.argv.includes("--staged");
const INWENTARZ = process.argv.includes("--inwentarz");
const ROOT = process.cwd();
const SCAN_EXT = new Set([".tsx", ".jsx"]);
const KAT_MESSAGES = "src/i18n/messages";
const REJESTR = "content/liczby-w-tresci.json";

/* ─────────────────────── PRZEBIEG 1: warstwa kodu ─────────────────────── */

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
const zglos = (tekst) => {
  console.error(tekst);
  naruszenia++;
};

if (!INWENTARZ) {
  for (const plik of plikiDoSkanowania()) {
    const tresc = readFileSync(join(ROOT, plik), "utf8");
    tresc.split("\n").forEach((linia, i) => {
      TEKST_Z_CYFRA.lastIndex = 0;
      const trafienia = linia.match(TEKST_Z_CYFRA);
      if (trafienia) {
        for (const t of trafienia) {
          zglos(
            `✗ ${plik}:${i + 1} — literalna liczba w tekście JSX: ${t}\n` +
              `  Przenieś wartość do content/facts.json (wartość + źródło + data pomiaru) i importuj.`,
          );
        }
      }
    });
  }
}

/* ─────────────────────── PRZEBIEG 2: warstwa treści ────────────────────── */

/**
 * Liczebniki słowne → wartość. `null` = ilość nieokreślona („setki”,
 * „half”) — wykrywana, ale bez wartości do porównania.
 *
 * Rodzina „jeden / one / ein” JEST ŚWIADOMIE POZA listą: w każdym z tych
 * trzech języków bywa rodzajnikiem albo idiomem („w jednym miejscu”,
 * „one click”, „ein Klick”), więc jej wykrywanie dałoby ~76 kluczy
 * rozstrzygnięć bez jednej realnej obietnicy ilościowej (skan
 * 2026-08-16 — wszystkie trafienia idiomatyczne). Granica jest zapisana
 * tutaj i w karcie tonu pkt 5, żeby nikt nie wziął ciszy za pokrycie.
 */
const LICZEBNIKI = {
  pl: {
    dwa: 2, dwie: 2, dwóch: 2, dwom: 2, dwoma: 2, dwiema: 2, dwoje: 2, dwojga: 2,
    oba: 2, obie: 2, obu: 2, obydwa: 2, obydwie: 2, obojga: 2,
    trzy: 3, trzech: 3, trzem: 3, trzema: 3, troje: 3, trojga: 3,
    cztery: 4, czterech: 4, czterem: 4, czterema: 4, czworo: 4, czworga: 4,
    pięć: 5, pięciu: 5, pięcioma: 5, pięcioro: 5,
    sześć: 6, sześciu: 6, sześcioma: 6, sześcioro: 6,
    siedem: 7, siedmiu: 7, siedmioma: 7, siedmioro: 7,
    osiem: 8, ośmiu: 8, ośmioma: 8, ośmioro: 8,
    dziewięć: 9, dziewięciu: 9, dziewięcioma: 9,
    dziesięć: 10, dziesięciu: 10, dziesięcioma: 10,
    jedenaście: 11, jedenastu: 11, dwanaście: 12, dwunastu: 12,
    dwadzieścia: 20, dwudziestu: 20, trzydzieści: 30, trzydziestu: 30,
    czterdzieści: 40, czterdziestu: 40, pięćdziesiąt: 50, pięćdziesięciu: 50,
    sześćdziesiąt: 60, sześćdziesięciu: 60, siedemdziesiąt: 70, siedemdziesięciu: 70,
    osiemdziesiąt: 80, osiemdziesięciu: 80, dziewięćdziesiąt: 90, dziewięćdziesięciu: 90,
    sto: 100, stu: 100, tysiąc: 1000, tysiąca: 1000, tysiące: 1000, tysięcy: 1000,
    setki: null, setek: null, dziesiątki: null, dziesiątek: null,
    kilkanaście: null, kilkunastu: null, kilkadziesiąt: null, kilkudziesięciu: null,
    kilkaset: null, połowa: null, połowę: null, połowie: null, połowy: null,
    dwukrotnie: null, trzykrotnie: null, podwójny: null, podwójne: null,
  },
  en: {
    two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    ten: 10, eleven: 11, twelve: 12, both: 2, dozen: 12,
    twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
    eighty: 80, ninety: 90, hundred: 100, thousand: 1000,
    hundreds: null, thousands: null, dozens: null, half: null,
    double: null, triple: null, twice: null,
  },
  de: {
    zwei: 2, drei: 3, vier: 4, fünf: 5, sechs: 6, sieben: 7, acht: 8, neun: 9,
    zehn: 10, elf: 11, zwölf: 12,
    beide: 2, beiden: 2, beider: 2, beides: 2, dutzend: 12,
    zwanzig: 20, dreißig: 30, vierzig: 40, fünfzig: 50, sechzig: 60,
    siebzig: 70, achtzig: 80, neunzig: 90, hundert: 100, tausend: 1000,
    hunderte: null, tausende: null, hälfte: null,
    doppelt: null, dreifach: null, zweimal: null,
  },
};

const KATEGORIE = {
  "cecha-funkcji":
    "liczba jest cechą funkcji zapisaną w content/tabela-obietnic.md (decyzja D-D16)",
  "nazwa-wlasna": "liczba jest częścią nazwy własnej programu lub funkcji",
  identyfikator: "liczba jest częścią identyfikatora technicznego (np. SHA-256)",
  samoopis: "liczba opisuje elementy obecne na tej samej stronie",
  idiom: "słowo z listy liczebników użyte niezliczbowo (np. „beides” = „jedno i drugie”)",
};

/** Liczby znalezione w ciągu: cyfry + liczebniki słowne danego języka. */
function liczbyWCiagu(tekst, jezyk) {
  const znalezione = new Set();
  for (const c of tekst.match(/\d+/g) || []) znalezione.add(c);
  for (const slowo of Object.keys(LICZEBNIKI[jezyk])) {
    const re = new RegExp(`(^|[^\\p{L}])${slowo}([^\\p{L}]|$)`, "iu");
    if (re.test(tekst)) znalezione.add(slowo);
  }
  return [...znalezione].sort();
}

/** Wszystkie liście tekstowe pliku komunikatów, spłaszczone do „A.b.c”. */
function splaszcz(obiekt, prefiks = "", wynik = {}) {
  for (const [k, v] of Object.entries(obiekt)) {
    const sciezka = prefiks ? `${prefiks}.${k}` : k;
    if (typeof v === "string") wynik[sciezka] = v;
    else if (v && typeof v === "object") splaszcz(v, sciezka, wynik);
  }
  return wynik;
}

/**
 * Kontrole dodatkowe: rozstrzygnięcie, które da się sprawdzić maszynowo,
 * ma być sprawdzane maszynowo (ADR-018: dowodem jest wykonany test).
 * Klucz kontroli deklaruje wpis w rejestrze.
 */
const KONTROLE = {
  // „Sześć obaw” ma się zgadzać z liczbą par pytanie/odpowiedź na stronie.
  "obawy-liczba-par": (komunikaty, liczby) => {
    const ile = Object.keys(komunikaty.pl.Obawy || {}).filter((k) =>
      /^o\d+$/.test(k),
    ).length;
    const bledy = [];
    for (const [jezyk, tokeny] of Object.entries(liczby)) {
      const wartosci = tokeny
        .map((t) => (/^\d+$/.test(t) ? Number(t) : LICZEBNIKI[jezyk][t]))
        .filter((w) => w !== null && w !== undefined);
      if (!wartosci.includes(ile)) {
        bledy.push(
          `${jezyk}: nagłówek mówi ${tokeny.join(", ")}, a par „Obawy.oN” jest ${ile}`,
        );
      }
    }
    return bledy;
  },
};

const plikiJezykow = existsSync(join(ROOT, KAT_MESSAGES))
  ? readdirSync(join(ROOT, KAT_MESSAGES)).filter((f) => extname(f) === ".json")
  : [];

const komunikaty = {};
const plaskie = {};
for (const plik of plikiJezykow) {
  const jezyk = basename(plik, ".json");
  const surowe = JSON.parse(readFileSync(join(ROOT, KAT_MESSAGES, plik), "utf8"));
  komunikaty[jezyk] = surowe;
  plaskie[jezyk] = splaszcz(surowe);
}

// Nowy język bez listy liczebników przeszedłby CICHO jako „brak trafień”.
// To dokładnie ten sposób, w jaki strażnik wygasa przez zmianę otoczenia.
for (const jezyk of Object.keys(plaskie)) {
  if (!LICZEBNIKI[jezyk]) {
    zglos(
      `✗ ${KAT_MESSAGES}/${jezyk}.json — język bez listy liczebników słownych.\n` +
        `  Skan cyfr by zadziałał, ale „cztery fazy” w tym języku byłoby\n` +
        `  niewidoczne. Dopisz LICZEBNIKI.${jezyk} w scripts/lint-liczby.mjs.`,
    );
  }
}

// Klucze z liczbą, zebrane przez wszystkie języki naraz — jedno
// rozstrzygnięcie na klucz, nie trzy (ten sam ciąg w trzech przekładach).
const znalezioneWTresci = {};
for (const [jezyk, mapa] of Object.entries(plaskie)) {
  if (!LICZEBNIKI[jezyk]) continue;
  for (const [klucz, tekst] of Object.entries(mapa)) {
    const liczby = liczbyWCiagu(tekst, jezyk);
    if (liczby.length === 0) continue;
    znalezioneWTresci[klucz] = znalezioneWTresci[klucz] || {};
    znalezioneWTresci[klucz][jezyk] = liczby;
  }
}

if (INWENTARZ) {
  const szkielet = {};
  for (const klucz of Object.keys(znalezioneWTresci).sort()) {
    szkielet[klucz] = {
      liczby: znalezioneWTresci[klucz],
      kategorie: ["<" + Object.keys(KATEGORIE).join(" | ") + ">"],
      pokrycie: "<plik i wiersz, z którego liczba pochodzi>",
      uzasadnienie: "<dlaczego ten ciąg ma prawo nieść liczbę>",
    };
  }
  console.log(JSON.stringify({ wpisy: szkielet }, null, 2));
  process.exit(0);
}

const sciezkaRejestru = join(ROOT, REJESTR);
if (!existsSync(sciezkaRejestru)) {
  zglos(
    `✗ brak pliku ${REJESTR} — rejestr rozstrzygnięć dla liczb w warstwie\n` +
      `  treści. Wygeneruj szkielet: npm run bramka:liczby -- --inwentarz`,
  );
} else {
  const rejestr = JSON.parse(readFileSync(sciezkaRejestru, "utf8"));
  const wpisy = rejestr.wpisy || {};

  for (const klucz of Object.keys(znalezioneWTresci).sort()) {
    const znalezione = znalezioneWTresci[klucz];
    const wpis = wpisy[klucz];
    const opis = Object.entries(znalezione)
      .map(([j, l]) => `${j}: ${l.join(", ")}`)
      .join(" · ");

    if (!wpis) {
      zglos(
        `✗ ${KAT_MESSAGES}/*.json → ${klucz} — liczba w treści bez rozstrzygnięcia.\n` +
          `  Znalezione: ${opis}\n` +
          `  Albo wartość pochodzi z pomiaru — wtedy content/facts.json\n` +
          `  i interpolacja przez zmienną, nigdy cyfra wpisana w komunikat.\n` +
          `  Albo to nazwa własna / identyfikator / cecha funkcji z tabeli\n` +
          `  obietnic — wtedy wpis w ${REJESTR} z kategorią i pokryciem.`,
      );
      continue;
    }

    // Liczby: zgoda dotyczyła KONKRETNYCH liczb, nie klucza.
    for (const jezyk of Object.keys(znalezione)) {
      const teraz = znalezione[jezyk].join(", ");
      const zapisane = (wpis.liczby?.[jezyk] || []).join(", ");
      if (teraz !== zapisane) {
        zglos(
          `✗ ${klucz} (${jezyk}) — liczby w treści rozjechały się z rejestrem.\n` +
            `  w rejestrze: ${zapisane || "(brak)"}\n` +
            `  w komunikacie: ${teraz}\n` +
            `  Rozstrzygnięcie z ${REJESTR} dotyczyło poprzedniej liczby.\n` +
            `  Potwierdź pokrycie dla nowej i dopiero wtedy popraw rejestr.`,
        );
      }
    }
    for (const jezyk of Object.keys(wpis.liczby || {})) {
      if (!znalezione[jezyk]) {
        zglos(
          `✗ ${klucz} (${jezyk}) — rejestr wymienia liczby ${wpis.liczby[jezyk].join(", ")},\n` +
            `  a w komunikacie nie ma już żadnej. Jeśli liczba wypadła celowo,\n` +
            `  usuń język z wpisu w ${REJESTR}; martwe rozstrzygnięcie milczy.`,
        );
      }
    }

    const kategorie = wpis.kategorie || [];
    if (kategorie.length === 0) {
      zglos(`✗ ${klucz} — wpis w ${REJESTR} bez kategorii.`);
    }
    for (const kat of kategorie) {
      if (!KATEGORIE[kat]) {
        zglos(
          `✗ ${klucz} — nieznana kategoria „${kat}”.\n` +
            `  Dozwolone: ${Object.keys(KATEGORIE).join(", ")}.`,
        );
      }
    }
    if (!wpis.pokrycie || !wpis.uzasadnienie) {
      zglos(
        `✗ ${klucz} — wpis w ${REJESTR} bez pola „pokrycie” lub „uzasadnienie”.\n` +
          `  Rozstrzygnięcie bez źródła jest przekonaniem, nie dowodem (ADR-018).`,
      );
    }
    if (wpis.kontrola) {
      const kontrola = KONTROLE[wpis.kontrola];
      if (!kontrola) {
        zglos(
          `✗ ${klucz} — wpis wskazuje kontrolę „${wpis.kontrola}”, której nie ma\n` +
            `  w scripts/lint-liczby.mjs (KONTROLE).`,
        );
      } else {
        for (const blad of kontrola(komunikaty, znalezione)) {
          zglos(`✗ ${klucz} — kontrola „${wpis.kontrola}” nie przeszła.\n  ${blad}`);
        }
      }
    }
  }

  // Wpis bez ciągu = rozstrzygnięcie, które przeżyło swój tekst.
  for (const klucz of Object.keys(wpisy)) {
    if (klucz.startsWith("_")) continue;
    if (!znalezioneWTresci[klucz]) {
      zglos(
        `✗ ${REJESTR} → ${klucz} — rozstrzygnięcie bez ciągu.\n` +
          `  Klucz nie istnieje albo nie ma już w nim liczby. Usuń wpis:\n` +
          `  martwe zgody uśpią następną osobę, która je przeczyta.`,
      );
    }
  }
}

/* ────────────────────────────── werdykt ───────────────────────────────── */

if (naruszenia > 0) {
  console.error(`\nLinter liczb: ${naruszenia} naruszeń. Bramka CZERWONA.`);
  process.exit(1);
}
console.log(
  `Linter liczb: zielony (warstwa kodu + ${Object.keys(znalezioneWTresci).length} ` +
    `rozstrzygniętych ciągów w warstwie treści, ${plikiJezykow.length} języki).`,
);
