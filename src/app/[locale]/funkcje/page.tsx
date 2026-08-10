import { setRequestLocale } from "next-intl/server";

import { StronaWBudowie } from "@/components/StronaWBudowie";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/sciezki";

/**
 * B1(a) — placeholder strony /funkcje (prerender SSG per locale;
 * wpis w ISTNIEJACE_SCIEZKI — src/i18n/sciezki.ts). Treść docelowa
 * powstanie w dalszych komponentach Fazy 3.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaFunkcje({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StronaWBudowie locale={locale as Locale} sciezka="/funkcje" />;
}
