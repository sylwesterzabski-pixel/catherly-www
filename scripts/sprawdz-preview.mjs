#!/usr/bin/env node
/**
 * Strażnik CELU POMIARU bramki wydajności (ADR-018).
 *
 * Powód istnienia: pomiar przeniesiony na preview Vercel może cicho
 * mierzyć NIE TĘ STRONĘ. Preview jest domyślnie chroniony logowaniem
 * (Deployment Protection) i na żądanie bez uprawnień oddaje ekran
 * logowania Vercela. Lighthouse zmierzyłby ten ekran i zwrócił świetne
 * wyniki — bramka byłaby zielona, nie mierząc niczego. To ta sama klasa
 * dziury co spece poza workflow: zielono, bo pusto.
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
 * Wyjście 0 = cel pomiaru potwierdzony. Wyjście 1 = bramka NIE MIERZY
 * i ma o tym krzyczeć, zamiast świecić na zielono.
 */
import { readFileSync } from "node:fs";

const BAZA = (process.argv[2] || process.env.LHCI_BAZA || "").replace(
  /\/+$/,
  "",
);

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

if (!BAZA) {
  blad(
    "brak adresu do sprawdzenia",
    "Podaj adres argumentem albo w zmiennej LHCI_BAZA.",
  );
}

const SEKRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const naglowki = SEKRET
  ? {
      "x-vercel-protection-bypass": SEKRET,
      "x-vercel-set-bypass-cookie": "true",
    }
  : {};

console.log(`Cel pomiaru: ${BAZA}`);
console.log(
  `Obejście ochrony preview: ${SEKRET ? "sekret obecny" : "BRAK SEKRETU"}`,
);

let odp;
try {
  odp = await fetch(`${BAZA}/`, { redirect: "manual", headers: naglowki });
} catch (e) {
  blad("adres nieosiągalny", String(e && e.message ? e.message : e));
}

if (odp.status >= 300 && odp.status < 400) {
  const cel = odp.headers.get("location") || "(brak nagłówka Location)";
  if (/vercel\.com\/(sso-api|login)/.test(cel)) {
    blad(
      "preview zamknięty ścianą logowania Vercela",
      `HTTP ${odp.status} → ${cel.slice(0, 120)}…\n` +
        "  Odblokowanie jest po stronie właściciela — jedno z dwojga:\n" +
        "  (a) Vercel → Project → Settings → Deployment Protection: wyłączyć\n" +
        "      ochronę dla Preview, albo\n" +
        "  (b) włączyć Protection Bypass for Automation i wstawić wartość\n" +
        "      jako sekret GitHuba VERCEL_AUTOMATION_BYPASS_SECRET.",
    );
  }
  blad("przekierowanie zamiast strony", `HTTP ${odp.status} → ${cel}`);
}

if (odp.status !== 200) {
  blad("nieoczekiwany status odpowiedzi", `HTTP ${odp.status}`);
}

const html = await odp.text();
const naglowek = JSON.parse(
  readFileSync(new URL("../src/i18n/messages/pl.json", import.meta.url), "utf8"),
).Hero.naglowek;

const MARKERY = [
  ['atrybut językowy dokumentu', '<html lang="pl"'],
  ["identyfikator H1 hero", 'id="hero-h1"'],
  ["nagłówek H1 z komunikatów", naglowek],
];

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

console.log(
  `✔ Cel pomiaru potwierdzony: HTTP 200, ${html.length} B, ` +
    `${MARKERY.length}/${MARKERY.length} markerów obecnych.`,
);
