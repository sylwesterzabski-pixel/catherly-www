#!/usr/bin/env node
/**
 * Strażnik prowieniencji PO POMIARZE (rozstrzygnięcie właściciela
 * 2026-08-19, T22 b).
 *
 * ── Czego pilnuje ─────────────────────────────────────────────────
 * Do 2026-08-19 bramka wydajności sprawdzała `x-catherly-wydanie`
 * WYŁĄCZNIE przed pomiarem: raz w `sprawdz-preview.mjs` („/"), raz
 * w `rozgrzewka-preview.mjs` (wszystkie trasy). Obie kontrole są
 * prawdziwe i obie mówią o JEDNEJ CHWILI. Alias preview jest tymczasem
 * przestawialny w każdej sekundzie: wystarczy push tej samej gałęzi,
 * żeby w połowie pomiaru pod tym samym adresem stanęło inne wdrożenie.
 * Strażnik przechodził wtedy zielono, a Lighthouse mierzył dalej — część
 * przebiegów na jednym commicie, część na drugim — i log meldował liczbę
 * przypisaną do commita, którego ta liczba nie dotyczy.
 *
 * To jest ta sama klasa, którą projekt zna z ADR-018 pod hasłem
 * „strażnik przeszedł, potem otoczenie się zmieniło": warunek sprawdzony
 * w jednym momencie i milcząco uznany za trwający. Komentarz przy kroku
 * strażnika w bramki.yml nazywał mutowalność aliasu wprost — i osłaniał
 * wyłącznie start.
 *
 * ── Co robi ──────────────────────────────────────────────────────
 * Po `lhci collect` odpytuje KAŻDĄ mierzoną trasę i porównuje wydanie
 * z OCZEKIWANY_COMMIT. Porównanie z oczekiwanym jest równoważne
 * porównaniu „przed ↔ po", bo rozgrzewka wymusiła równość na wszystkich
 * trasach przed pomiarem: jeśli PO ≠ OCZEKIWANY, to PO ≠ PRZED. Nie ma
 * więc pliku stanu do zgubienia ani drugiego źródła prawdy.
 *
 * Rozjazd = POMIAR UNIEWAŻNIONY, wyjście 1, jawny komunikat. Nie „ostrzeżenie
 * w logu": zielony werdykt po podmianie wdrożenia jest zielenią bez pokrycia,
 * a czerwony — czerwienią nieprzypisywalną. Oba są bezużyteczne i oba muszą
 * o tym powiedzieć.
 *
 * ── Czego ten strażnik NIE zamyka (spisane, bo niesprawdzone = niedziałające)
 * Klamra „przed ↔ po" nie wykryje podmiany, która zdarzyła się i cofnęła
 * WEWNĄTRZ pomiaru (alias na obce wdrożenie i z powrotem). Zamknięcie tej
 * szczeliny wymaga sprawdzenia MIĘDZY przebiegami Lighthouse'a, a `lhci
 * collect` przechodzi wszystkie trasy × wszystkie przebiegi w jednym
 * procesie i nie daje w to wejść. Blok `concurrency` w bramki.yml zabiera
 * tej szczelinie główną przyczynę (drugi przebieg tej samej gałęzi zostaje
 * anulowany), ale jej nie usuwa: alias przestawia Vercel, nie GitHub.
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const ARGI = process.argv.slice(2);
const RECZNY = ARGI.includes("--reczny");
const BAZA = (process.env.LHCI_BAZA || "").trim().replace(/\/+$/, "");
const SEKRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const OCZEKIWANY = (process.env.OCZEKIWANY_COMMIT || "").trim();
/** `success` / `failure` kroku pomiaru — decyduje o BRZMIENIU komunikatu. */
const WYNIK_POMIARU = (process.env.WYNIK_POMIARU || "").trim();
const KRESKA = "─".repeat(68);

// Tryb lokalny: mierzony jest build na localhoście, nie preview — nie ma
// aliasu, który mógłby się przestawić, i nie ma nagłówka wydania. Wyjście
// zerem, jak w rozgrzewce.
if (!BAZA) {
  console.log(
    "\nProwieniencja po pomiarze pominięta: LHCI_BAZA nieustawione\n" +
      "(tryb lokalny — mierzony jest build z tego katalogu).\n",
  );
  process.exit(0);
}

/** @param {string} powod @param {string} [szczegol] */
function uniewaznij(powod, szczegol) {
  console.error("");
  console.error(KRESKA);
  console.error(`✖ POMIAR UNIEWAŻNIONY: ${powod}`);
  console.error(KRESKA);
  if (szczegol) console.error(szczegol);
  console.error(
    "\n  W trakcie pomiaru pod mierzonym adresem stanęło INNE wdrożenie.\n" +
      (WYNIK_POMIARU === "failure"
        ? "  Krok pomiaru skończył się czerwienią, ale ta czerwień jest\n" +
          "  NIEPRZYPISYWALNA: nie wiadomo, którego commita dotyczy.\n"
        : WYNIK_POMIARU === "success"
          ? "  Krok pomiaru skończył się zielenią, ale ta zieleń jest BEZ\n" +
            "  POKRYCIA: nie wiadomo, którego commita dotyczy.\n"
          : "  Wynik pomiaru — jakikolwiek — nie daje się przypisać do commita.\n") +
      "  Liczba, której nie da się przypisać do commita, nie jest pomiarem\n" +
      "  (ADR-018: brak dowodu = brak zabezpieczenia).\n\n" +
      "  Najczęstsza przyczyna: push tej samej gałęzi w trakcie pomiaru.\n" +
      "  Od 2026-08-19 blokuje to blok `concurrency` w bramki.yml — jeśli\n" +
      "  ta czerwień zapaliła się mimo niego, przyczyna jest po stronie\n" +
      "  Vercela (alias przestawiony ręcznie albo przez wdrożenie z innego\n" +
      "  źródła) i trzeba ją znaleźć, zanim ktokolwiek uwierzy w tę tabelę.\n",
  );
  process.exit(1);
}

if (!OCZEKIWANY && !RECZNY) {
  uniewaznij(
    "nie wiadomo, który commit miał być zmierzony",
    "  Zmienna OCZEKIWANY_COMMIT jest pusta, więc nie ma z czym porównać\n" +
      "  wydania stojącego pod adresem po pomiarze. Zielony meldunek tego\n" +
      "  strażnika byłby wtedy pustym gestem.\n" +
      "  Uruchomienie diagnostyczne z laptopa: dopisz --reczny.",
  );
}

/** Adresy stąd, skąd bierze je pomiar — nie z drugiej listy. */
const ADRESY = require("../lighthouserc.cjs")?.ci?.collect?.url ?? [];
if (ADRESY.length === 0) {
  uniewaznij(
    "lighthouserc.cjs nie podaje żadnego adresu",
    "  Nie ma czego sprawdzić po pomiarze, więc nie ma czego potwierdzić.",
  );
}

const naglowki = SEKRET ? { "x-vercel-protection-bypass": SEKRET } : {};

console.log("");
console.log(KRESKA);
console.log(`PROWIENIENCJA PO POMIARZE — ${ADRESY.length} tras`);
console.log(KRESKA);
console.log(
  RECZNY
    ? "Prowieniencja NIE sprawdzana (--reczny) — to diagnostyka, nie dowód."
    : `Wydanie oczekiwane na każdej trasie: ${OCZEKIWANY.slice(0, 12)}`,
);

const rozjazdy = [];
for (const adres of ADRESY) {
  const sciezka = new URL(adres).pathname;
  let odp;
  try {
    odp = await fetch(adres, { redirect: "manual", headers: naglowki });
  } catch (e) {
    rozjazdy.push({ sciezka, opis: `adres nieosiągalny (${e?.message || e})` });
    console.log(`  ${sciezka.padEnd(24)} ✖ nieosiągalny`);
    continue;
  }
  // Nagłówka Location NIE wypisujemy w całości: przy ścianie logowania
  // Vercel odsyła Set-Cookie _vercel_jwt, którego ładunek niesie sekret
  // obejścia otwartym tekstem (ta sama ostrożność co w rozgrzewce).
  if (odp.status !== 200) {
    rozjazdy.push({ sciezka, opis: `HTTP ${odp.status} zamiast 200` });
    console.log(`  ${sciezka.padEnd(24)} ✖ HTTP ${odp.status}`);
    continue;
  }
  const wydanie = odp.headers.get("x-catherly-wydanie");
  if (!wydanie) {
    rozjazdy.push({ sciezka, opis: "brak nagłówka x-catherly-wydanie" });
    console.log(`  ${sciezka.padEnd(24)} ✖ brak nagłówka wydania`);
    continue;
  }
  const zgodne = RECZNY || wydanie === OCZEKIWANY;
  if (!zgodne) {
    rozjazdy.push({
      sciezka,
      opis: `wydanie ${wydanie.slice(0, 12)} zamiast ${OCZEKIWANY.slice(0, 12)}`,
    });
  }
  console.log(
    `  ${sciezka.padEnd(24)} ${zgodne ? "✔" : "✖"} ${wydanie.slice(0, 12)}`,
  );
}

if (rozjazdy.length) {
  uniewaznij(
    `wydanie rozjechało się na ${rozjazdy.length} z ${ADRESY.length} tras`,
    rozjazdy.map((r) => `  ${r.sciezka.padEnd(24)} ${r.opis}`).join("\n"),
  );
}

console.log("");
console.log(
  `✔ Wydanie po pomiarze zgodne na ${ADRESY.length}/${ADRESY.length} tras` +
    (RECZNY ? " (prowieniencja niesprawdzana)." : ` — ${OCZEKIWANY.slice(0, 12)}.`),
);
console.log(
  "  Klamra domknięta: to samo wdrożenie stało pod adresem przed pomiarem\n" +
    "  (rozgrzewka, wszystkie trasy) i po nim. Werdykt jest przypisywalny.",
);
console.log(KRESKA);
console.log("");
