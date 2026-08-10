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

/**
 * Rejestr ścieżek, pod którymi ISTNIEJE strona (względem języka).
 * Middleware przepisuje KAŻDĄ inną ścieżkę na prerenderowaną stronę
 * 404 ze statusem 404 (B2 — patrz src/middleware.ts oraz
 * src/app/[locale]/nie-znaleziono/page.tsx). Każda nowa strona MUSI
 * zostać tu dopisana w swoim PR — inaczej będzie serwowana jako 404
 * (testy nowej strony wykryją to natychmiast, głośna awaria zamiast
 * cichej). Celowo NIE ma tu "/nie-znaleziono": bezpośrednie wejście
 * na ten adres też ma dostać status 404, nie 200.
 * Ścieżki pozycji menu pochodzą z POZYCJE_MENU (jedno źródło);
 * "/login" — strona przekaźnika logowania (B1a; docelowo szew do
 * aplikacji w Fazie 5 — ADR-022/ADR-023).
 */
export const ISTNIEJACE_SCIEZKI: readonly string[] = [
  "/",
  ...POZYCJE_MENU.map((pozycja) => pozycja.sciezka),
  "/login",
];
