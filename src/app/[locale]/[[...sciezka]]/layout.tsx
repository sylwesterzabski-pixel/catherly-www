import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { Nawigacja } from "@/components/Nawigacja";
import { Stopka } from "@/components/Stopka";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/sciezki";

import "../../globals.css";

export const metadata: Metadata = {
  title: "Catherly",
  robots: { index: false, follow: false },
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string; sciezka?: string[] }>;
};

/**
 * Layout per język: html lang zgodny z locale; renderuje K1
 * (Nawigacja + Stopka) wokół treści strony. Segment [[...sciezka]]
 * daje layoutowi bieżącą ścieżkę z parametrów trasy — aria-current
 * wyznaczany po stronie serwera, bez JS klienckiego i bez dynamizacji
 * renderu (strony pozostają prerenderowane — bramka No-JS).
 */
export default async function LayoutJezyka({ children, params }: Props) {
  const { locale, sciezka } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const biezacaSciezka = `/${(sciezka ?? []).join("/")}`;

  return (
    <html lang={locale}>
      <body>
        <Nawigacja locale={locale as Locale} biezacaSciezka={biezacaSciezka} />
        {children}
        <Stopka locale={locale as Locale} />
      </body>
    </html>
  );
}
