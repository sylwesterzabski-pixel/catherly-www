import { notFound } from "next/navigation";

/**
 * B2 — trasa nieznanych ścieżek: zawsze notFound() → granica
 * not-found segmentu [locale]. W żądaniach HTTP nieznane ścieżki
 * przechwytuje WCZEŚNIEJ middleware (rewrite na prerenderowaną
 * stronę /[locale]/nie-znaleziono ze statusem 404 — jedyna droga do
 * pełnego HTML-a 404 bez JS; szczegóły w ../not-found.tsx). Ten
 * catch-all to obrona w głąb: nawigacje klienckie i ścieżki, które
 * ominęłyby middleware, dostają 404 (status poprawny; treść przez
 * granicę not-found). force-dynamic świadomie: bez niego render
 * on-demand SSG nieznanego parametru dodatkowo zapisywałby wpisy
 * w cache. Strony kolejnych komponentów Fazy 3 dostaną własne
 * segmenty statyczne NAD tym catch-allem + wpis w ISTNIEJACE_SCIEZKI.
 */
export const dynamic = "force-dynamic";

export default function NieznanaSciezka(): never {
  notFound();
}
