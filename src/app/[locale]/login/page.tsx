import { getTranslations, setRequestLocale } from "next-intl/server";

import { Nawigacja } from "@/components/Nawigacja";
import { routing } from "@/i18n/routing";
import { adresWJezyku, type Locale } from "@/i18n/sciezki";

/**
 * B1(a) — przekaźnik logowania (placeholder do Fazy 5).
 *
 * ADR-022/ADR-023: /login to docelowo SZEW do aplikacji — konto
 * powstaje przy pierwszym logowaniu w aplikacji, a CTA cennika
 * prowadzi właśnie tu. W Fazie 5 tę stronę zastąpi rewrite do
 * aplikacji (wtedy /login wraca do wyjątków matchera middleware —
 * patrz src/middleware.ts). Do tego czasu routing SPÓJNY z resztą
 * stron: per locale (/login, /en/login, /de/login — decyzja
 * właściciela 2026-08-10), nav linkuje wersją językową.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaLogowania({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNaw = await getTranslations("Nawigacja");
  const t = await getTranslations("StronaLogowania");
  const tWspolne = await getTranslations("Wspolne");

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/login" />
      <main id="tresc">
        <h1>{tNaw("logowanie")}</h1>
        <p>{t("tresc")}</p>
        <p>
          <a href={adresWJezyku(locale as Locale, "/")}>
            {tWspolne("stronaGlowna")}
          </a>
        </p>
      </main>
    </>
  );
}
