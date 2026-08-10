import { useTranslations } from "next-intl";

import { adresWJezyku, POZYCJE_MENU, type Locale } from "@/i18n/sciezki";

import styles from "./Stopka.module.css";

/** Linki języków w stopce: /, /en, /de (handoff K1). Nazwy języków są
 *  nazwami własnymi — identyczne we wszystkich wersjach (atrybut lang). */
const JEZYKI = [
  { locale: "pl", nazwa: "Polski", adres: "/" },
  { locale: "en", nazwa: "English", adres: "/en" },
  { locale: "de", nazwa: "Deutsch", adres: "/de" },
] as const;

type Props = {
  locale: Locale;
};

/**
 * K1 — stopka (markup 1:1 z HF docs/faza-3/hf/k1-nawigacja.html).
 * Mapa strony i języki jako LINKI; dokumenty prawne i kontakt jako
 * TEKST „(wkrótce)" — ŻADNYCH linków do nieistniejących stron
 * (bramka linków; linki wchodzą wraz ze stronami).
 */
export function Stopka({ locale }: Props) {
  const t = useTranslations("Stopka");
  const tNaw = useTranslations("Nawigacja");
  return (
    <footer className={styles.stopka}>
      <div className={styles.kolumny}>
        <section>
          <h2>{t("mapaStrony")}</h2>
          <ul>
            {POZYCJE_MENU.map((pozycja) => (
              <li key={pozycja.sciezka}>
                <a href={adresWJezyku(locale, pozycja.sciezka)}>
                  {tNaw(pozycja.klucz)}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.jezyki}>
          <h2>{t("jezyk")}</h2>
          <ul>
            {JEZYKI.map((jezyk) => (
              <li key={jezyk.locale}>
                <a
                  href={jezyk.adres}
                  lang={jezyk.locale}
                  aria-current={jezyk.locale === locale ? "true" : undefined}
                >
                  {jezyk.nazwa}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>{t("dokumenty")}</h2>
          <ul className={styles.martwe}>
            <li>{t("wkrotce")}</li>
          </ul>
        </section>
        <section>
          <h2>{t("kontakt")}</h2>
          <ul className={styles.martwe}>
            <li>{t("wkrotce")}</li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
