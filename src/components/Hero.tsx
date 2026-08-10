import { useTranslations } from "next-intl";

import { adresWJezyku, type Locale } from "@/i18n/sciezki";

import { PasekPotwierdzen } from "./PasekPotwierdzen";
import styles from "./Hero.module.css";

type Props = {
  locale: Locale;
};

/**
 * K2 — hero strony głównej (markup wg HF docs/faza-3/hf/k2-hero.html,
 * po panelu 2026-08-10 — werdykt przyjęty przez właściciela).
 * Element LCP = tekst H1 (jedyny h1 strony); zero obrazu nad foldem,
 * zero JS, system-ui (ADR-026 — data ważności: etap F).
 * CTA → /funkcje per locale (ADR-023 — zero obietnicy rejestracji);
 * pary kontrastowe CTA udokumentowane przy rolach w tokenach.
 * Prawa kolumna desktopu celowo pusta — obraz wejdzie pipeline'em
 * obrazów w etapie D (Playwright, poza foldem LCP).
 */
export function Hero({ locale }: Props) {
  const t = useTranslations("Hero");
  return (
    <section className={styles.hero} aria-labelledby="hero-h1">
      <div className={styles.wnetrze}>
        <div className={styles.kolumny}>
          <div>
            <h1 id="hero-h1" className={styles.naglowek}>
              {t("naglowek")}
            </h1>
            <p className={styles.podtytul}>{t("podtytul")}</p>
            <a className={styles.cta} href={adresWJezyku(locale, "/funkcje")}>
              {t("cta")}
            </a>
            <PasekPotwierdzen
              pozycje={[t("potwierdzenieUE"), t("potwierdzenieRezygnacja")]}
              klasa={styles.potwierdzenia}
            />
          </div>
          <div aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
