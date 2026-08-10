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
      <body>
        {children}
        <Stopka locale={locale as Locale} />
      </body>
    </html>
  );
}
