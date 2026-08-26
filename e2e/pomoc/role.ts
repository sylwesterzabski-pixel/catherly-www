import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * ODCZYT WARTOŚCI ROLI ZE ŹRÓDŁA PRAWDY (`design/tokens.json`).
 *
 * Powstał, bo cztery testy trzymały barwy palety jako literały `rgb(...)`
 * przepisane z ręki. Przy przejściu na paletę wzorca (ADR-038) wszystkie
 * cztery zapaliły się naraz — poprawnie, bo pilnowały wartości, której już
 * nie było, ale poprawka polegała na PRZEPISANIU LICZBY, czyli na powtórzeniu
 * tej samej konstrukcji. Zlecenie `WWW/056` pkt 2 zamyka to regułą: test
 * czyta źródło, nie pamięta wartości.
 *
 * ┌── SKĄD CZYTA — I DLACZEGO NIE ZE STRONY ──────────────────────────────┐
 * │ Czyta `design/tokens.json`, a NIE `getComputedStyle(document          │
 * │ .documentElement).getPropertyValue("--kolor-rola-...")`.              │
 * │                                                                       │
 * │ Odczyt zmiennej z badanej strony zamieniłby te asercje w TAUTOLOGIĘ:  │
 * │ element bierze barwę z `var(--rola)`, więc porównanie „element ==     │
 * │ var(--rola)" jest prawdziwe z konstrukcji i przestaje cokolwiek       │
 * │ mierzyć. Zwłaszcza przestałoby wykrywać PRZEPIĘCIE elementu na INNĄ   │
 * │ rolę — czyli dokładnie to, czego te testy pilnują.                    │
 * │                                                                       │
 * │ To ta sama granica, którą opisuje nagłówek `kontrast-stanow.spec.ts`: │
 * │ import jest dozwolony tam, gdzie wyznacza ZASIĘG, a zakazany tam,     │
 * │ gdzie jest PRZEDMIOTEM asercji. Tu przedmiotem jest „czy ten element  │
 * │ nosi TĘ rolę", a `tokens.json` jest niezależną deklaracją tej roli.   │
 * └───────────────────────────────────────────────────────────────────────┘
 *
 * CO TE ASERCJE PILNUJĄ PO ZMIANIE — bo to nie jest to samo, co przedtem:
 *   · przedtem: „element ma barwę X" (X przepisane z ręki),
 *   · teraz:    „element ma barwę roli R zadeklarowaną w tokenach".
 * Przepięcie elementu na inną rolę nadal daje czerwień. Zmiana WARTOŚCI
 * roli w tokenach — już nie, i tak ma być: ta zmiana idzie przez ADR
 * i pilnuje jej strażnik tokenów, nie te testy.
 *
 * ⚠ CZEGO NIE ZŁAPIE: rozjazdu między `design/tokens.json` a wygenerowanym
 * `src/styles/generated/tokeny.css`, jeśli ktoś zmieni token bez przebudowy —
 * wtedy strona pokaże starą barwę, a ten helper poda nową i test zapali się
 * z komunikatem wskazującym na element zamiast na brak przebudowy. Odróżnia
 * to `npm run tokeny:build` uruchomiony przed testem; `prebuild` robi to
 * przy każdym `npm run build`, więc bramka CI tej dziury nie ma.
 */
const KORZEN = join(__dirname, "..", "..");
const TOKENY = JSON.parse(
  readFileSync(join(KORZEN, "design", "tokens.json"), "utf8"),
) as Record<string, unknown>;

const GLEBOKOSC_ODWOLAN = 8;

function wezel(sciezka: string): unknown {
  return sciezka
    .split(".")
    .reduce<unknown>(
      (o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined),
      TOKENY,
    );
}

/** Rozwija łańcuch `{kolor.tlo}` do wartości dosłownej. */
function rozwin(wartosc: unknown, slad: string[]): string {
  for (let i = 0; i < GLEBOKOSC_ODWOLAN; i += 1) {
    if (typeof wartosc !== "string") break;
    const odwolanie = wartosc.match(/^\{([^}]+)\}$/);
    if (!odwolanie) return wartosc;
    const sciezka = odwolanie[1].replace(/\.value$/, "");
    slad.push(sciezka);
    const cel = wezel(sciezka) as { value?: unknown } | undefined;
    if (!cel || cel.value === undefined) {
      throw new Error(
        `design/tokens.json: odwołanie ${wartosc} nie prowadzi do wartości (ślad: ${slad.join(" → ")})`,
      );
    }
    wartosc = cel.value;
  }
  if (typeof wartosc !== "string") {
    throw new Error(`design/tokens.json: nie rozwinięto odwołania (ślad: ${slad.join(" → ")})`);
  }
  return wartosc;
}

/** Wartość roli jako zapis szesnastkowy, np. `#a0e00d`. Rzuca, gdy roli nie ma. */
export function rolaHex(nazwa: string): string {
  const wpis = wezel(`kolor.rola.${nazwa}`) as { value?: unknown } | undefined;
  if (!wpis || wpis.value === undefined) {
    /* RZUCA, nie zwraca `undefined`. Rola, której nie ma, musi zatrzymać
       przebieg z nazwą w komunikacie — cicha wartość pusta zamieniłaby
       asercję w porównanie dwóch niewiadomych. */
    throw new Error(
      `design/tokens.json: brak roli „${nazwa}" w kolor.rola. ` +
        `Dostępne: ${Object.keys((wezel("kolor.rola") ?? {}) as object).join(", ")}`,
    );
  }
  const hex = rozwin(wpis.value, [`kolor.rola.${nazwa}`]);
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
    throw new Error(`design/tokens.json: rola „${nazwa}" ma wartość „${hex}", oczekiwano #rrggbb`);
  }
  return hex.toLowerCase();
}

/** Wartość roli w zapisie, jakim posługuje się `getComputedStyle`: `rgb(r, g, b)`. */
export function rolaRgb(nazwa: string): string {
  const hex = rolaHex(nazwa).slice(1);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgb(${r}, ${g}, ${b})`;
}
