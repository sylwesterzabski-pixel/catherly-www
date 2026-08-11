import { getTranslations, setRequestLocale } from "next-intl/server";

import { DbanieOSiebie } from "@/components/DbanieOSiebie";
import { Filar } from "@/components/Filar";
import { Hero } from "@/components/Hero";
import { Nawigacja } from "@/components/Nawigacja";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/sciezki";

/**
 * Strona główna (/, /en, /de) — hero K2 + filary K4 (S5–S8) + S9
 * (main#tresc; jedyny h1 strony = element LCP). Prerenderowana
 * statycznie (generateStaticParams — bramka No-JS). Nawigacja
 * renderowana przez stronę z jej ścieżką ("/") — aria-current
 * serwerowo, bez JS. Nieznane ścieżki obsługuje segment [...sciezka].
 * S3/S4 (instancje K3) i S10–S13 wchodzą przy złożeniu w etapie F —
 * do tego czasu filary sąsiadują z hero (ryzyko W4 handoffu K4:
 * pomiar LCP przy integracji obrazów).
 */
const FILARY = [
  { klucz: "filar1", id: "filar-1-h2", obrazPoLewej: false },
  { klucz: "filar2", id: "filar-2-h2", obrazPoLewej: true },
  { klucz: "filar3", id: "filar-3-h2", obrazPoLewej: false },
  { klucz: "filar4", id: "filar-4-h2", obrazPoLewej: true },
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaGlowna({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Filary");

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/" />
      <main id="tresc">
        <Hero locale={locale as Locale} />
        {FILARY.map(({ klucz, id, obrazPoLewej }) => (
          <Filar
            key={klucz}
            idNaglowka={id}
            naglowek={t(`${klucz}.naglowek`)}
            korzysc={t(`${klucz}.korzysc`)}
            konkrety={[
              t(`${klucz}.konkret1`),
              t(`${klucz}.konkret2`),
              t(`${klucz}.konkret3`),
            ]}
            obrazPoLewej={obrazPoLewej}
          />
        ))}
        <DbanieOSiebie />
      </main>
    </>
  );
}
