import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

import NieZnaleziono from "../not-found";

/**
 * B2 — prerenderowana strona 404 per język (pełny HTML bez JS,
 * wewnątrz layoutu [locale]: html lang + Nawigacja + Stopka).
 * Middleware przepisuje tu KAŻDĄ ścieżkę spoza rejestru istniejących
 * stron ze statusem 404 (adres nie pojawia się w pasku przeglądarki —
 * rewrite, nie redirect). Treść 1:1 z granicą not-found segmentu
 * [locale] — ten sam komponent, zero rozjazdu.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Strona404({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NieZnaleziono />;
}
