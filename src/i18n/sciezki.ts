import { routing } from "./routing";

export type Locale = (typeof routing.locales)[number];

/**
 * Pozycje menu głównego i mapy strony (STRATEGIA pkt 16; brief K1).
 * `klucz` wskazuje etykietę w messages (przestrzeń "Nawigacja").
 * Strony docelowe powstają w kolejnych komponentach Fazy 3.
 */
export const POZYCJE_MENU = [
  { sciezka: "/funkcje", klucz: "funkcje" },
  { sciezka: "/cennik", klucz: "cennik" },
  { sciezka: "/dla-kogo", klucz: "dlaKogo" },
] as const;

/**
 * Adres ścieżki w danym języku: pl bez prefiksu, en/de z prefiksem
 * (/en, /de) — spójnie z routing.localePrefix "as-needed".
 */
export function adresWJezyku(locale: Locale, sciezka: string): string {
  if (locale === routing.defaultLocale) return sciezka;
  return sciezka === "/" ? `/${locale}` : `/${locale}${sciezka}`;
}
