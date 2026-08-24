/**
 * Bramka: Deklaracje długości — content/{pl,en,de}/*.md ↔ src/i18n/messages/*.json
 *
 * CZEGO PILNUJE. Pliki treści deklarują długość ciągów w znakach — „*(42 zn)*"
 * albo „**107 znaków.**". Te liczby są TWIERDZENIAMI O TREŚCI i nie pilnowało
 * ich dotąd NIC: strażniki „znak w znak" (hero.spec.ts:179, cennik.spec.ts:326
 * i pięć dalszych) porównują TEKST z TEKSTEM, a `bramka:liczby` czyta warstwę
 * kodu i src/i18n/messages/*.json — content/*.md jest poza jej zasięgiem.
 * Kategoria nie miała bramki, nie miała luki w bramce (tor 9, 2026-08-21).
 *
 * DLACZEGO POWSTAŁA. Panel rundy drugiej przepisuje zdania, a każde przepisane
 * zdanie zmienia liczbę znaków. Warunek odrzucenia O-1 żąda od autora trzech
 * liczb (pl/en/de) — bramka musi istnieć w chwili, w której te liczby zaczną
 * powstawać. Wprowadzona po fakcie łapałaby to, czemu miała zapobiec.
 *
 * DWA PRZEBIEGI:
 *   1. DEKLARACJA ↔ DŁUGOŚĆ — czy liczba w pliku treści zgadza się z ciągiem.
 *   2. DEKLARACJA ↔ DEKLARACJA — ten sam ciąg deklarowany w DWÓCH plikach musi
 *      mieć tę samą liczbę. Dziś dotyczy jednej pary: „Dane przechowywane w UE"
 *      (Hero.potwierdzenieUE = Cennik.potwierdzenie3) stoi w naglowek.md
 *      i cennik.md ×3 języki. Przebieg wchodzi ZIELONY i ma taki zostać —
 *      dowodem jego działania jest mutacja, nie dzisiejsza czerwień.
 *
 * GRANICE ZADEKLAROWANE WPROST (bramka mówi, czego NIE pilnuje):
 *   - ciągi < PROG_ZNAKOW znaków są poza zasięgiem: krótkie ciągi trafiają jako
 *     podciąg w środek cudzych zdań i produkują fałszywą czerwień;
 *   - deklaracja musi stać BEZPOŚREDNIO po ciągu (tylko interpunkcja i markdown
 *     pomiędzy). Luźniejsze dopasowanie dało w pomiarze 56 zapaleń, w większości
 *     fałszywych;
 *   - deklaracje opisujące SUMĘ dwóch kluczy wymagają wpisu w
 *     content/deklaracje-zlozone.json. Bez notacji bramka byłaby czerwona
 *     w dniu wprowadzenia na sześciu legalnych konstrukcjach (T21 pkt 3);
 *   - przebieg 2 nie widzi podmiany brzmienia o TEJ SAMEJ długości (półpauza
 *     za myślnik — mutacja `c` adwersarza Etapu C, hero.spec.ts:175-177).
 *     Szew Hero↔Cennik NIE JEST tym domknięty; domknięcie wymaga asercji
 *     krzyżowej w warstwie messages, której nie ma nic.
 *
 * RAPORTUJE POKRYCIE, NIE SAMĄ ZIELEŃ. Bramka milczy z trzech różnych powodów:
 * M-1 sprawdziła i przeszło · M-2 nie ma czego porównać · M-3 przedmiot poza
 * zasięgiem · M-4 ciąg nieobecny w pliku treści. Tylko M-1 jest zielenią;
 * M-2, M-3 i M-4 to cisza. Zieleń bez liczby
 * sprawdzonych pozycji jest twierdzeniem o stanie, którego nikt nie zmierzył.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename, extname } from "node:path";

const ROOT = process.cwd();
const KAT_MESSAGES = "src/i18n/messages";
const KAT_CONTENT = "content";
const REJESTR_ZLOZONYCH = "content/deklaracje-zlozone.json";
const PROG_ZNAKOW = 12;

// Deklaracja tuż po ciągu. Oba formaty obecne w repozytorium:
//   „…tekst. *(42 zn)*"      — cennik.md, filary.md, obawy.md
//   „…tekst.\n\n**107 znaków.**" — naglowek.md, definicja.md, filary.md
const DEKLARACJA = /^[\s*.)„"”—–-]{0,10}\*?\(?\*{0,2}(\d{1,4})\s*(?:zn\b|znak)/;

const zwin = (s) => s.replace(/\s+/g, " ");

function splaszcz(obiekt, prefiks = "") {
  const out = [];
  for (const [k, v] of Object.entries(obiekt)) {
    const nazwa = prefiks ? `${prefiks}.${k}` : k;
    if (v && typeof v === "object") out.push(...splaszcz(v, nazwa));
    else if (typeof v === "string") out.push([nazwa, v]);
  }
  return out;
}

const zlozone = existsSync(join(ROOT, REJESTR_ZLOZONYCH))
  ? JSON.parse(readFileSync(join(ROOT, REJESTR_ZLOZONYCH), "utf8")).zlozone
  : [];

const jezyki = readdirSync(join(ROOT, KAT_MESSAGES))
  .filter((f) => extname(f) === ".json")
  .map((f) => basename(f, ".json"))
  .sort();

const naruszenia = [];
let sprawdzone = 0;
const krotkie = new Set(); // M-3 — per klucz, nie per para klucz×plik
let bezDeklaracji = 0;
// M-4 — klucz nieodnaleziony w ŻADNYM pliku treści swojego języka.
// Liczy się per KLUCZ, nie per para klucz×plik: ten sam ciąg nie występuje
// w kilkunastu plikach z definicji, więc para dawałaby liczbę bez znaczenia.
const kluczeSzukane = new Set();
const kluczeZnalezione = new Set();
const wgKlucza = new Map(); // `${jezyk}|${klucz}` → [{plik, wartosc}]

for (const jezyk of jezyki) {
  const komunikaty = JSON.parse(
    readFileSync(join(ROOT, KAT_MESSAGES, `${jezyk}.json`), "utf8"),
  );
  const pary = splaszcz(komunikaty);
  const dlugosc = new Map(pary.map(([k, v]) => [k, v.length]));
  const katalog = join(ROOT, KAT_CONTENT, jezyk);
  if (!existsSync(katalog)) continue;

  for (const nazwa of readdirSync(katalog).filter((f) => extname(f) === ".md")) {
    const zrodlo = zwin(readFileSync(join(katalog, nazwa), "utf8"));

    // Suma oczekiwana dla deklaracji złożonej kończącej się tym kluczem.
    const sumaZlozona = (klucz) => {
      const wpis = zlozone.find(
        (z) => z.plik === nazwa && z.klucze[z.klucze.length - 1] === klucz,
      );
      if (!wpis) return null;
      const czesci = wpis.klucze.map((k) => dlugosc.get(k));
      if (czesci.some((c) => c === undefined)) return null;
      const sep = (wpis.laczenie ?? " ").length * (czesci.length - 1);
      return { suma: czesci.reduce((a, b) => a + b, 0) + sep, wpis };
    };

    // Dopasowania: pozycja KOŃCA ciągu → najdłuższy klucz kończący się tam.
    // Najdłuższy, bo Cennik.faq.o4 (80 zn) jest sufiksem Obawy.o3 (106 zn)
    // i bez tej reguły przejąłby cudzą deklarację.
    const wKoncu = new Map();
    for (const [klucz, tresc] of pary) {
      if (tresc.length < PROG_ZNAKOW) {
        krotkie.add(`${jezyk}|${klucz}`);
        continue;
      }
      const igla = zwin(tresc);
      kluczeSzukane.add(`${jezyk}|${klucz}`);
      let od = 0;
      for (;;) {
        const i = zrodlo.indexOf(igla, od);
        if (i < 0) {
          // M-4: ciąg NIE WYSTĘPUJE w tym pliku treści. Do 2026-08-21 nie
          // zwiększał żadnego z trzech liczników — czyli cisza bez śladu.
          // Wykryte przez agenta A0-R2 (D-K7) na 7 kluczach `DlaKogo.sN_robi_*`
          // ×3 języki: ich wartość niesie znaczniki rich i `{minuty}`, których
          // plik treści nie ma. Cisza bez licznika jest gorsza od ciszy
          // policzonej, bo wygląda jak brak przedmiotu.
          break;
        }
        kluczeZnalezione.add(`${jezyk}|${klucz}`);
        od = i + 1;
        const koniec = i + igla.length;
        const poprzedni = wKoncu.get(koniec);
        if (!poprzedni || igla.length > zwin(poprzedni.tresc).length) {
          wKoncu.set(koniec, { klucz, tresc });
        }
      }
    }

    for (const [koniec, { klucz, tresc }] of wKoncu) {
      const m = DEKLARACJA.exec(zrodlo.slice(koniec, koniec + 40));
      if (!m) {
        bezDeklaracji += 1;
        continue;
      }
      const zadeklarowano = Number.parseInt(m[1], 10);
      sprawdzone += 1;

      const zlozona = sumaZlozona(klucz);
      const oczekiwano = zlozona ? zlozona.suma : tresc.length;
      const opis = zlozona
        ? `złożona: ${zlozona.wpis.klucze.join(" + ")}`
        : klucz;

      if (zadeklarowano !== oczekiwano) {
        naruszenia.push(
          `✗ ${KAT_CONTENT}/${jezyk}/${nazwa} — ${opis}\n` +
            `  deklaracja: ${zadeklarowano} · faktycznie: ${oczekiwano} (${
              oczekiwano - zadeklarowano > 0 ? "+" : ""
            }${oczekiwano - zadeklarowano})\n` +
            `  Popraw deklarację albo — jeśli opisuje sumę kluczy — dodaj wpis\n` +
            `  do ${REJESTR_ZLOZONYCH}. KANON: korekta licznika obejmuje CAŁY PLIK.`,
        );
      }

      const id = `${jezyk}|${klucz}`;
      if (!wgKlucza.has(id)) wgKlucza.set(id, []);
      wgKlucza.get(id).push({ plik: nazwa, wartosc: zadeklarowano });
    }
  }
}

// ── Przebieg 2: deklaracja ↔ deklaracja ─────────────────────────────────────
let porownaneMiedzyplikowo = 0;
for (const [id, lista] of wgKlucza) {
  const plikiRozne = new Set(lista.map((x) => x.plik));
  if (plikiRozne.size < 2) continue;
  porownaneMiedzyplikowo += 1;
  const wartosci = new Set(lista.map((x) => x.wartosc));
  if (wartosci.size > 1) {
    const [jezyk, klucz] = id.split("|");
    naruszenia.push(
      `✗ ${jezyk} — ${klucz}: ten sam ciąg zadeklarowany RÓŻNIE w dwóch plikach\n` +
        lista.map((x) => `    ${x.plik}: ${x.wartosc}`).join("\n") +
        `\n  Jedna z deklaracji jest nieprawdziwa. Ciąg jest łańcuchowy —\n` +
        `  zmiana brzmienia w jednym pliku jest zmianą we wszystkich jego miejscach.`,
    );
  }
}

// POKRYCIE drukuje się ZAWSZE — na zielono i na czerwono. Do 2026-08-21
// stało wyłącznie w gałęzi zielonej, więc w dniu wprowadzenia (bramka
// czerwona na dziesięciu rozjazdach) nie pokazywało się ani razu — czyli
// wymóg „raportuj pokrycie, nie samą zieleń" nie działał dokładnie wtedy,
// gdy był potrzebny. Wykryte przez agenta A0-R2 (D-K8).
const pokrycie =
  `  POKRYCIE: ${sprawdzone} deklaracji sprawdzonych w ${jezyki.length} językach` +
  ` (M-1) · ${porownaneMiedzyplikowo} ciągów porównanych MIĘDZY plikami\n` +
  `  CISZA — NIE ZIELEŃ: ${bezDeklaracji} wystąpień bez deklaracji obok (M-2)` +
  ` · ${kluczeSzukane.size - kluczeZnalezione.size} kluczy nieobecnych w żadnym pliku treści (M-4)` +
  ` · ${krotkie.size} kluczy poniżej progu ${PROG_ZNAKOW} zn (M-3)`;

if (naruszenia.length > 0) {
  console.error(naruszenia.join("\n\n"));
  console.error(`\n✗ Bramka deklaracji CZERWONA: ${naruszenia.length} naruszeń.`);
  console.error(pokrycie);
  process.exit(1);
}

console.log(`Bramka deklaracji: zielona.\n${pokrycie}`);
