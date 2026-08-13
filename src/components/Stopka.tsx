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

/** Nazwy dokumentów prawnych w stopce (I4 — zatwierdzone przez
 *  właściciela 2026-08-10; handoff K1/K3). Klucze wskazują etykiety
 *  w messages (Stopka.dokumentyPozycje). DE „Auftragsverarbeitung" =
 *  umowa powierzenia (RODO Art. 28) — weryfikacja intencji w handoffie. */
const DOKUMENTY = [
  "regulamin",
  "prywatnosc",
  "ciasteczka",
  "przetwarzanieDanych",
] as const;

/**
 * K1 — stopka (markup wg HF docs/faza-3/hf/k1-nawigacja.html; od
 * rundy 4 sekcja Dokumenty rozszerzona względem HF o NAZWY czterech
 * dokumentów prawnych — I4). Mapa strony i języki jako LINKI;
 * dokumenty prawne jako TEKST „Nazwa (wkrótce)" i kontakt jako TEKST
 * „(wkrótce)" — ŻADNYCH linków do nieistniejących stron (bramka
 * linków; linki wchodzą wraz ze stronami dokumentów).
 */
export function Stopka({ locale }: Props) {
  const t = useTranslations("Stopka");
  const tNaw = useTranslations("Nawigacja");
  return (
    <footer className={styles.stopka}>
      <div className={styles.kolumny}>
        <section>
          <h2>{t("mapaStrony")}</h2>
          {/* role="list" — CSS zdejmuje punktory (Stopka.module.css),
              a Safari z VoiceOver odbiera wtedy liście semantykę. */}
          <ul role="list">
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
          <ul role="list">
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
          <ul className={styles.martwe} role="list">
            {DOKUMENTY.map((dokument) => (
              <li key={dokument}>
                {t(`dokumentyPozycje.${dokument}`)} {t("wkrotce")}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>{t("kontakt")}</h2>
          <ul className={styles.martwe} role="list">
            <li>{t("wkrotce")}</li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
