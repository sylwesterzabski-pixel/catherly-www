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
        {/* PRELOAD JEDNEGO PLIKU — INTERA (ADR-044 prostuje ADR-040).
            ⚠ ADR-040 preładował Satoshi z uzasadnieniem „h1 jest elementem
            LCP, a składa je Satoshi". Druga połowa tego zdania była
            nieprawdą: h1 składa INTER. Preload wskazywał więc na plik,
            którego element LCP w ogóle nie używa — czyli robił dokładnie
            to, przed czym miał chronić: zajmował pasmo krojem, którego
            LCP nie mierzy. Satoshi niesie dwie plakietki po 12 px
            i dojedzie na `font-display: swap`.
            Jeden, nie dwa: preload dwóch plików zamienia priorytet
            w jego brak — proza dojedzie `font-display: swap`, mając
            dostrojoną rodzinę zapasową, która trzyma szerokość
            (size-adjust 107,4%), więc podmiana nie przesuwa układu.
            `crossOrigin` jest wymagane nawet przy pliku z własnego
            serwera: bez niego przeglądarka pobiera plik DRUGI RAZ,
            bo żądanie fontu zawsze idzie w trybie CORS. */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
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
