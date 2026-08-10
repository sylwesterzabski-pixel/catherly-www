import { useTranslations } from "next-intl";

import { adresWJezyku, POZYCJE_MENU, type Locale } from "@/i18n/sciezki";

import styles from "./Nawigacja.module.css";

type Props = {
  locale: Locale;
  /** Ścieżka bieżącej strony względem języka (np. "/", "/cennik") —
   *  podaje ją strona (render serwerowy, zero JS); pusty string =
   *  żadna pozycja nie jest bieżąca (404). */
  biezacaSciezka: string;
};

/**
 * K1 — nagłówek sticky + skip-link (markup wg HF
 * docs/faza-3/hf/k1-nawigacja.html, po panelu 2026-08-10; od rundy 4
 * link Logowanie per locale + aria-current — B1a).
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
          {/* /login to strona przekaźnika per locale (B1a) — nav
              linkuje wersją językową; docelowo szew do aplikacji
              (ADR-022/ADR-023, rewrite w Fazie 5). Zwykły <a> jest
              celowy (zero JS klienckiego nawigacji). */}
          <a
            className={styles.logowanie}
            href={adresWJezyku(locale, "/login")}
            aria-current={biezacaSciezka === "/login" ? "page" : undefined}
          >
            {t("logowanie")}
          </a>
        </div>
      </header>
    </>
  );
}
