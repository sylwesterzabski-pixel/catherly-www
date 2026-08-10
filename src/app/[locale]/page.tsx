import { getTranslations, setRequestLocale } from "next-intl/server";

import { Nawigacja } from "@/components/Nawigacja";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/sciezki";

/**
 * Strona główna (/, /en, /de) — placeholder treści (main#tresc).
 * Prerenderowana statycznie (generateStaticParams — bramka No-JS).
 * Nawigacja renderowana przez stronę z jej ścieżką ("/") — aria-current
 * wyznaczany serwerowo, bez JS. Nieznane ścieżki obsługuje segment
 * [...sciezka] (zawsze 404 przez granicę not-found w [locale]).
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
  const t = await getTranslations("StronaGlowna");

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/" />
      <main id="tresc">
        <h1>Catherly</h1>
        <p>{t("szkielet")}</p>
      </main>
    </>
  );
}
