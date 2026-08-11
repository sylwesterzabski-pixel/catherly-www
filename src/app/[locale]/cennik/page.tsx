import { getTranslations, setRequestLocale } from "next-intl/server";

import { Faq } from "@/components/Faq";
import { Nawigacja } from "@/components/Nawigacja";
import { PasekPotwierdzen } from "@/components/PasekPotwierdzen";
import { SekcjaPlanow } from "@/components/SekcjaPlanow";
import { TabelaPorownawcza } from "@/components/TabelaPorownawcza";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/sciezki";

import styles from "./cennik.module.css";

/**
 * /cennik C2–C7 (Etap E; markup wg HF docs/faza-3/hf/cennik.html po
 * panelu 2026-08-11): H1+wstęp, K6+K5 (SekcjaPlanow), K7 tabela,
 * K8 FAQ, K9 potwierdzenia ×3. C8 zamknięcie (K11) — Etap F.
 * Prerender SSG per locale; hierarchia: h1 → h2 plany → h2 sr-only
 * FAQ; tabela etykietowana caption. Zero JS.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaCennik({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Cennik");

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/cennik" />
      <main id="tresc">
        <section className={styles.naglowek} aria-labelledby="cennik-h1">
          <div className={styles.wnetrze}>
            <h1 id="cennik-h1">{t("naglowek")}</h1>
            <p>{t("wstep")}</p>
          </div>
        </section>

        <SekcjaPlanow locale={locale as Locale} />
        <TabelaPorownawcza />
        <Faq
          naglowek={t("faqNaglowek")}
          idNaglowka="faq-h2"
          pary={[
            { pytanie: t("faq.p1"), odpowiedz: t("faq.o1") },
            { pytanie: t("faq.p2"), odpowiedz: t("faq.o2") },
            { pytanie: t("faq.p3"), odpowiedz: t("faq.o3") },
            { pytanie: t("faq.p4"), odpowiedz: t("faq.o4") },
          ]}
        />

        <section
          className={styles.potwierdzenia}
          aria-label={t("potwierdzeniaAria")}
        >
          <div className={styles.wnetrze}>
            <PasekPotwierdzen
              pozycje={[
                t("potwierdzenie1"),
                t("potwierdzenie2"),
                t("potwierdzenie3"),
              ]}
            />
          </div>
        </section>
      </main>
    </>
  );
}
