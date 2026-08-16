#!/usr/bin/env node
/**
 * Strażnik CELU POMIARU bramki wydajności (ADR-018).
 *
 * Powód istnienia: pomiar przeniesiony na preview Vercel może cicho
 * mierzyć NIE TĘ STRONĘ. Są dwa niezależne sposoby, na które to się
 * dzieje, i strażnik zamyka oba.
 *
 * ── (1) Nie ta strona ─────────────────────────────────────────────
 * Preview jest domyślnie chroniony logowaniem (Deployment Protection)
 * i na żądanie bez uprawnień oddaje ekran logowania Vercela. Lighthouse
 * zmierzyłby ten ekran i zwrócił świetne wyniki — bramka byłaby
 * zielona, nie mierząc niczego. To ta sama klasa dziury co spece poza
 * workflow: zielono, bo pusto.
 *
 * Naiwne sprawdzenia, które NIE działają (zmierzone 2026-08-14 na
 * realnym preview catherly-9s8us771y…vercel.app):
 *   - status HTTP: z podążaniem za przekierowaniem ekran logowania
 *     oddaje **200**;
 *   - obecność słowa „Catherly" w treści: ekran logowania zawiera je
 *     **dwa razy**, bo adres preview siedzi w parametrze `next=`.
 *
 * Działa dopiero para: brak przekierowania (redirect: manual) plus
 * markery, których logowanie wyprodukować nie może — atrybut językowy
 * dokumentu, identyfikator H1 hero i dosłowny nagłówek z komunikatów
 * (źródło prawdy: src/i18n/messages/pl.json).
 *
 * ── (2) Ta strona, ale NIE TEN COMMIT ─────────────────────────────
 * Adres w LHCI_BAZA jest stały, wdrożenie pod nim — nie. Bramka rusza
 * przy pushu równolegle z buildem Vercela, więc trafia na wdrożenie
 * poprzedniego commita, dopóki nowe się nie zbuduje; alias może też
 * wskazywać inną gałąź. Wtedy pomiar jest prawdziwy, tylko cudzy —
 * zieleń bez pokrycia, dokładnie ta klasa, którą punkt (1) miał
 * zamknąć. Markery tego nie wykryją: obie wersje wyglądają tak samo.
 *
 * Rozstrzyga nagłówek `x-catherly-wydanie` (next.config.ts), w którym
 * wdrożenie podaje własny commit. Strażnik porównuje go z commitem, na
 * którym stoi CI (OCZEKIWANY_COMMIT), i CZEKA, aż wdrożenie się dogoni
 * — bo rozjazd tuż po pushu jest normalny, a nie błędny. Po upływie
 * okna czekania jest czerwień, nie pomiar.
 *
 * Wyjście 0 = cel pomiaru potwierdzony. Wyjście 1 = bramka NIE MIERZY
 * i ma o tym krzyczeć, zamiast świecić na zielono.
 *
 * Uruchomienie ręczne (z laptopa, bez CI): dopisz `--reczny`. Wtedy
 * prowieniencja NIE jest sprawdzana i strażnik mówi o tym wprost —
 * taki przebieg jest diagnostyką, nie dowodem.
 */
import { readFileSync } from "node:fs";

const ARGI = process.argv.slice(2);
const RECZNY = ARGI.includes("--reczny");
const BAZA = (
  ARGI.find((a) => !a.startsWith("--")) ||
  process.env.LHCI_BAZA ||
  ""
).replace(/\/+$/, "");

const OCZEKIWANY = (process.env.OCZEKIWANY_COMMIT || "").trim();
const OKNO_S = Number(process.env.CZEKANIE_NA_WDROZENIE_S || 300);
const ODSTEP_S = Number(process.env.ODSTEP_PROBY_S || 10);

/** @param {string} powod @param {string} [szczegol] */
function blad(powod, szczegol) {
  console.error(`\n✖ CEL POMIARU NIEPOTWIERDZONY: ${powod}`);
  if (szczegol) console.error(`  ${szczegol}`);
  console.error(
    "\n  Bramka wydajności NIE zmierzy właściwej strony. Zielony wynik\n" +
      "  byłby fałszywy, więc bramka jest czerwona (ADR-018: brak dowodu\n" +
      "  = brak zabezpieczenia).\n",
  );
  process.exit(1);
}

/** @param {number} s */
const odczekaj = (s) => new Promise((ok) => setTimeout(ok, s * 1000));

if (!BAZA) {
  blad(
    "brak adresu do sprawdzenia",
    "Podaj adres argumentem albo w zmiennej LHCI_BAZA.",
  );
}

if (!OCZEKIWANY && !RECZNY) {
  blad(
    "nie wiadomo, który commit ma być zmierzony",
    "Zmienna OCZEKIWANY_COMMIT jest pusta. W CI ustawia ją workflow\n" +
      "  (.github/workflows/bramki.yml, job bramka-wydajnosc) z sha gałęzi.\n" +
      "  Bez niej strażnik nie odróżni wdrożenia tego commita od cudzego,\n" +
      "  a pomiar cudzego wdrożenia jest zielenią bez pokrycia.\n" +
      "  Uruchomienie diagnostyczne z laptopa: dopisz --reczny.",
  );
}

/**
 * Obejście ochrony preview: JEDEN nagłówek, świadomie.
 *
 * Dokumentacja Vercela wymienia obok niego drugi —
 * `x-vercel-set-bypass-cookie` — i tak było tu do 2026-08-16. Zmierzone
 * na realnym preview (alias gałęzi faza-4/podstrony, wydanie 083d9f0):
 *
 *   sam `x-vercel-protection-bypass`             → HTTP 200, strona
 *   + `x-vercel-set-bypass-cookie: true`         → HTTP 307 → `/`
 *                                                  z Set-Cookie _vercel_jwt
 *
 * To przekierowanie jest uzgodnieniem ciastka, nie ścianą logowania —
 * ale strażnik czyta KAŻDE przekierowanie jako „nie ta strona" i kończy
 * czerwienią. Para nagłówków zamykała więc bramkę, zanim cokolwiek
 * zostało zmierzone: czerwień prawdziwa co do statusu, fałszywa co do
 * przyczyny. `fetch` i tak nie przenosi ciastek między wywołaniami, więc
 * drugi nagłówek nie dawał tu nic; to samo w drugą stronę w pomiarze
 * (lighthouserc.cjs — tam kosztował rundę doliczaną do LCP).
 *
 * Wykrywanie ściany logowania NIE słabnie: bez ważnego obejścia Vercel
 * oddaje 302 na vercel.com/sso-api, co niżej jest osobną czerwienią.
 */
const SEKRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const naglowki = SEKRET ? { "x-vercel-protection-bypass": SEKRET } : {};

const NAGLOWEK_H1 = JSON.parse(
  readFileSync(new URL("../src/i18n/messages/pl.json", import.meta.url), "utf8"),
).Hero.naglowek;

const MARKERY = [
  ["atrybut językowy dokumentu", '<html lang="pl"'],
  ["identyfikator H1 hero", 'id="hero-h1"'],
  ["nagłówek H1 z komunikatów", NAGLOWEK_H1],
];

/** Statusy, które w trakcie wdrażania są przejściowe — warto poczekać. */
const PRZEJSCIOWE = new Set([404, 429, 500, 502, 503, 504]);

console.log(`Cel pomiaru: ${BAZA}`);
console.log(
  `Obejście ochrony preview: ${SEKRET ? "sekret obecny" : "BRAK SEKRETU"}`,
);
console.log(
  RECZNY
    ? "Prowieniencja: NIE SPRAWDZANA (--reczny) — to diagnostyka, nie dowód."
    : `Oczekiwane wydanie: ${OCZEKIWANY}`,
);

/**
 * Jedna próba. Zwraca `null`, gdy trzeba poczekać i spróbować ponownie,
 * albo opis sukcesu. Sytuacje, których czekanie nie naprawi (ściana
 * logowania, obca strona, brak nagłówka wydania), kończą bieg od razu —
 * czekanie na nie tylko odsuwałoby czerwień w czasie.
 *
 * @param {number} numer
 * @returns {Promise<null | {rozmiar: number, wydanie: string}>}
 */
let ostatniePodejscie = "brak prób";

async function proba(numer) {
  let odp;
  try {
    odp = await fetch(`${BAZA}/`, { redirect: "manual", headers: naglowki });
  } catch (e) {
    const powod = String(e && e.message ? e.message : e);
    ostatniePodejscie = `adres nieosiągalny (${powod})`;
    console.log(`  próba ${numer}: ${ostatniePodejscie}`);
    return null;
  }

  if (odp.status >= 300 && odp.status < 400) {
    const cel = odp.headers.get("location") || "(brak nagłówka Location)";
    if (/vercel\.com\/(sso-api|login)/.test(cel)) {
      blad(
        "preview zamknięty ścianą logowania Vercela",
        `HTTP ${odp.status} → ${cel.slice(0, 120)}…\n` +
          // Sekret JEST, a ściana stoi — więc wysłana wartość nie jest
          // żadnym z żyjących kluczy projektu. Zdarzyło się 2026-08-16
          // (przebiegi 31954973660 i 31955442686), po rotacji: wartość
          // w GitHubie została podmieniona, ale nie na tę, która żyje.
          // Poprzedni komunikat kazał wtedy „włączyć Protection Bypass",
          // czyli szukać wyłączonej funkcji, która była włączona.
          (SEKRET
            ? "  Sekret JEST ustawiony, więc funkcja działa — nie zgadza się\n" +
                "  WARTOŚĆ. Wysłany klucz nie jest żadnym z żyjących kluczy\n" +
                "  projektu. Najczęstsze przyczyny, od najczęstszej:\n" +
                "  (a) po rotacji w panelu Vercela do sekretu GitHuba trafiła\n" +
                "      wartość SPRZED regeneracji — klucz przypisany do\n" +
                "      zmiennej systemowej można wymienić tylko przez\n" +
                "      regenerację, a ta unieważnia poprzednik natychmiast;\n" +
                "  (b) wartość wklejona ze spacją albo znakiem końca wiersza\n" +
                "      — porównanie jest dosłowne, klucz ma równo 32 znaki;\n" +
                "  (c) sekret ustawiony w innym repozytorium lub środowisku.\n" +
                "  Naprawa: Vercel → Settings → Deployment Protection →\n" +
                "  Protection Bypass for Automation → skopiuj bieżącą wartość\n" +
                "  → GitHub → Settings → Secrets → Actions →\n" +
                "  VERCEL_AUTOMATION_BYPASS_SECRET. Stan kluczy da się\n" +
                "  sprawdzić bez ich wynoszenia: docs/faza-4/bramka-na-preview.md §2a."
            : "  Sekretu NIE MA w środowisku. Odblokowanie jest po stronie\n" +
                "  właściciela — jedno z dwojga:\n" +
                "  (a) Vercel → Project → Settings → Deployment Protection:\n" +
                "      wyłączyć ochronę dla Preview, albo\n" +
                "  (b) włączyć Protection Bypass for Automation i wstawić\n" +
                "      wartość jako sekret GitHuba\n" +
                "      VERCEL_AUTOMATION_BYPASS_SECRET."),
      );
    }
    blad("przekierowanie zamiast strony", `HTTP ${odp.status} → ${cel}`);
  }

  if (odp.status !== 200) {
    if (PRZEJSCIOWE.has(odp.status)) {
      ostatniePodejscie = `HTTP ${odp.status} (status przejściowy)`;
      console.log(`  próba ${numer}: HTTP ${odp.status} — wdrożenie w toku?`);
      return null;
    }
    blad("nieoczekiwany status odpowiedzi", `HTTP ${odp.status}`);
  }

  const html = await odp.text();
  const brakujace = MARKERY.filter(([, wzor]) => !html.includes(wzor));
  if (brakujace.length) {
    blad(
      "odpowiedź nie jest stroną Catherly",
      `HTTP 200, ${html.length} B, ale bez markerów: ` +
        brakujace.map(([opis]) => opis).join(", ") +
        "\n  (ekran logowania Vercela też oddaje 200 i też zawiera słowo\n" +
        "  „Catherly" +
        '" — dlatego sprawdzamy markery, nie samą nazwę).',
    );
  }

  const wydanie = odp.headers.get("x-catherly-wydanie");
  if (!wydanie) {
    blad(
      "wdrożenie nie podaje, z jakiego commita pochodzi",
      "Brak nagłówka x-catherly-wydanie (next.config.ts). Bez niego nie\n" +
        "  da się odróżnić wdrożenia tego commita od poprzedniego ani od\n" +
        "  cudzej gałęzi — a pomiar cudzego wdrożenia jest zielenią bez\n" +
        "  pokrycia. Najczęstsza przyczyna: pod tym adresem stoi wdrożenie\n" +
        "  SPRZED wprowadzenia nagłówka. Wypchnij gałąź i poczekaj na deploy.",
    );
  }

  if (!RECZNY && wydanie !== OCZEKIWANY) {
    ostatniePodejscie = `pod adresem stoi wydanie ${wydanie}`;
    console.log(
      `  próba ${numer}: pod adresem stoi wydanie ${wydanie.slice(0, 12)}, ` +
        `czekam na ${OCZEKIWANY.slice(0, 12)}`,
    );
    return null;
  }

  return { rozmiar: html.length, wydanie };
}

const koniec = Date.now() + OKNO_S * 1000;
let numer = 0;
let wynik = null;

for (;;) {
  numer += 1;
  wynik = await proba(numer);
  if (wynik) break;
  if (Date.now() + ODSTEP_S * 1000 >= koniec) break;
  await odczekaj(ODSTEP_S);
}

if (!wynik) {
  blad(
    `cel pomiaru nie ustalił się w ${OKNO_S} s (${numer} prób)`,
    `Na czym stanęła ostatnia próba: ${ostatniePodejscie}\n` +
      `  Oczekiwany commit: ${OCZEKIWANY}\n` +
      "  Możliwe przyczyny, od najczęstszej:\n" +
      "  (a) build Vercela trwa dłużej niż okno czekania — podnieś\n" +
      "      CZEKANIE_NA_WDROZENIE_S w workflow;\n" +
      "  (b) LHCI_BAZA wskazuje alias INNEJ gałęzi niż mierzona;\n" +
      "  (c) deploy dla tej gałęzi w ogóle nie powstał (vercel.json\n" +
      "      wyłącza deploye z main — na main to jest stan OCZEKIWANY\n" +
      "      i przyjęty świadomie do Fazy 7: ADR-030. Zdejmuje go\n" +
      "      włączenie wdrożenia produkcyjnego, nie wyjątek w bramce).\n" +
      "  Bramka NIE mierzy zastanego wdrożenia „bo jakieś jest”: pomiar\n" +
      "  cudzego commita byłby zielenią bez pokrycia.",
  );
}

console.log(
  `✔ Cel pomiaru potwierdzony: HTTP 200, ${wynik.rozmiar} B, ` +
    `${MARKERY.length}/${MARKERY.length} markerów obecnych` +
    (RECZNY ? ` (wydanie ${wynik.wydanie}, niesprawdzane).` : "."),
);
if (!RECZNY) {
  console.log(`  Wydanie pod adresem = commit CI: ${wynik.wydanie}`);
}
