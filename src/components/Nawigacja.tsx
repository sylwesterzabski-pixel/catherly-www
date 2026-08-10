import { useTranslations } from "next-intl";

import { adresWJezyku, POZYCJE_MENU, type Locale } from "@/i18n/sciezki";

import styles from "./Nawigacja.module.css";

type Props = {
  locale: Locale;
  /** Ścieżka bieżącej strony względem języka (np. "/", "/cennik") —
   *  wyznaczana po stronie serwera z parametrów trasy (zero JS). */
  biezacaSciezka: string;
};

/**
 * K1 — nagłówek sticky + skip-link (markup 1:1 z HF
 * docs/faza-3/hf/k1-nawigacja.html, po panelu 2026-08-10).
 * DOM: skip-link → logo → nav (Funkcje·Cennik·Dla kogo) → Logowanie
 * (/login — ADR-023). Na 390 px Logowanie wizualnie w wierszu 1,
 * fokusowo ostatnie — DECYZJA BRIEFU, nie usterka. Zero JS klienckiego.
 */
export function Nawigacja({ locale, biezacaSciezka }: Props) {
  const t = useTranslations("Nawigacja");
  return (
    <>
      <a className={styles.skipLink} href="#tresc">
        {t("przejdzDoTresci")}
      </a>
      <header className={styles.naglowek}>
        <div className={styles.nawCaly}>
          <a className={styles.logo} href={adresWJezyku(locale, "/")}>
            Catherly
          </a>
          <nav className={styles.naw}>
            <ul>
              {POZYCJE_MENU.map((pozycja) => (
                <li key={pozycja.sciezka}>
                  <a
                    href={adresWJezyku(locale, pozycja.sciezka)}
                    aria-current={
                      biezacaSciezka === pozycja.sciezka ? "page" : undefined
                    }
                  >
                    {t(pozycja.klucz)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* /login to szew do aplikacji (ADR-022/ADR-023) — rewrite
              w Fazie 5, nie strona Nexta; zwykły <a> jest tu celowy
              (zero JS klienckiego nawigacji). */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className={styles.logowanie} href="/login">
            {t("logowanie")}
          </a>
        </div>
      </header>
    </>
  );
}
