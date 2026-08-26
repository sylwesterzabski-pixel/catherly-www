import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { Stopka } from "@/components/Stopka";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/sciezki";

import "../globals.css";

export const metadata: Metadata = {
  title: "Catherly",
  robots: { index: false, follow: false },
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * Layout per język: html lang zgodny z locale; Stopka (K1) wspólna dla
 * wszystkich stron i dla 404. Nawigację (K1) renderują strony oraz
 * not-found — strona zna własną ścieżkę i wyznacza aria-current po
 * stronie serwera (layout w segmencie [locale] nie dostaje parametrów
 * segmentów podrzędnych — mechanika Next). Layout przeniesiony tu
 * z [[...sciezka]] w ramach B2 — uzasadnienie: not-found.tsx.
 */
export default async function LayoutJezyka({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        {/* PRELOAD JEDNEGO PLIKU — nagłówkowego, nie prozy (ADR-040).
            Wybór nie jest dowolny: jedyne `h1` strony jest elementem LCP
            (kontrakt K2), a składa je Satoshi. Preload prozy przyspieszyłby
            tekst, którego LCP nie mierzy, i konkurowałby o pasmo z tym,
            który mierzy.
            Jeden, nie dwa: preload dwóch plików zamienia priorytet
            w jego brak — proza dojedzie `font-display: swap`, mając
            dostrojoną rodzinę zapasową, która trzyma szerokość
            (size-adjust 107,4%), więc podmiana nie przesuwa układu.
            `crossOrigin` jest wymagane nawet przy pliku z własnego
            serwera: bez niego przeglądarka pobiera plik DRUGI RAZ,
            bo żądanie fontu zawsze idzie w trybie CORS. */}
        <link
          rel="preload"
          href="/fonts/satoshi-medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <Stopka locale={locale as Locale} />
      </body>
    </html>
  );
}
