import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/Hero";
import { Nawigacja } from "@/components/Nawigacja";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/sciezki";

/**
 * Strona główna (/, /en, /de) — hero K2 (main#tresc; jedyny h1 strony
 * = element LCP). Prerenderowana statycznie (generateStaticParams —
 * bramka No-JS). Nawigacja renderowana przez stronę z jej ścieżką ("/")
 * — aria-current wyznaczany serwerowo, bez JS. Nieznane ścieżki
 * obsługuje segment [...sciezka] (zawsze 404 przez granicę not-found
 * w [locale]). Kolejne sekcje (S3–S13) wchodzą etapami C–E.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaGlowna({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/" />
      <main id="tresc">
        <Hero locale={locale as Locale} />
      </main>
    </>
  );
}
