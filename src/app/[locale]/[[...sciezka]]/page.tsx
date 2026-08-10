import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

/**
 * Jedyna istniejąca trasa: strona główna (/, /en, /de) — placeholder
 * treści (main#tresc). Sekcje treściowe (K3+) wchodzą w kolejnych
 * komponentach Fazy 3; nieznane ścieżki → 404.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale, sciezka: [] }));
}

type Props = {
  params: Promise<{ locale: string; sciezka?: string[] }>;
};

export default async function StronaGlowna({ params }: Props) {
  const { locale, sciezka } = await params;
  if (sciezka?.length) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("StronaGlowna");

  return (
    <main id="tresc">
      <h1>Catherly</h1>
      <p>{t("szkielet")}</p>
    </main>
  );
}
