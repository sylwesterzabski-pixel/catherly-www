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
 * 2.1 NAV — pigułka w stylistyce wzorca (WWW/057, ADR-045).
 * Geometria, barwy i typografia z pomiaru; hamburger na kadrze ≤ 768 px
 * przez `details`/`summary`, czyli BEZ JS. Odstępstwo świadome i jedno:
 * `position: sticky` zostaje, choć wzorzec ma `relative` — uzasadnienie
 * w arkuszu, decyzja czeka na właściciela.
 *
 * Poprzedni opis, zachowany bo opisuje niezmienione części:
 * K1 — nagłówek sticky + skip-link (markup wg HF
 * docs/faza-3/hf/k1-nawigacja.html, po panelu 2026-08-10; od rundy 4
 * link Logowanie per locale + aria-current — B1a; od Fazy 4 Etapu B
 * pozycja-rodzic sekcji z aria-current="true" — A-1).
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
          {/* ROZWIJANIE BEZ JS (2.1, ADR-045). `details`/`summary` daje
              natywną semantykę ujawniania i dostępną obsługę klawiaturą
              bez ani jednej linii JavaScriptu — a serwis ma „treść
              czytelna bez JS" w progach. Ten sam mechanizm niesie FAQ.

              Na kadrze ≥ 769 px `summary` znika, a `.panel` dostaje
              `display: contents`, więc pozycje i CTA wchodzą wprost do
              paska. Drzewo DOM jest JEDNO dla obu kadrów — dwa drzewa
              znaczyłyby dwa miejsca do zmiany i jedno do przeoczenia. */}
          {/* PANEL JEST RODZEŃSTWEM `details`, NIE JEGO DZIECKIEM — i to
              jest wymuszone przez przeglądarkę, nie preferencja.
              Chromium chowa treść zamkniętego `details` przez anonimowe
              pudełko treści; autorska reguła `display` postawiona na
              panelu do niego NIE sięga. Zmierzone: na kadrze ≥ 769 px,
              gdzie panel ma być widoczny bez otwierania, wszystkie linki
              nawigacji znikały. `::details-content` rozwiązałoby to
              jednym wierszem, ale nie ma go poza najnowszym Chromium,
              więc nawigacja przepadłaby w Safari i Firefoksie.

              Przy tej konstrukcji widocznością steruje wyłącznie CSS:
              `[open] ~ .panel` na wąskim kadrze, `display: contents`
              na szerokim. `aria-controls` wiąże przycisk z regionem,
              którego już nie zawiera. */}
          <details className={styles.rozwijane}>
            <summary aria-label={t("nawGlowna")} aria-controls="menu-glowne">
              <span className={styles.kreska} />
              <span className={styles.kreska} />
              <span className={styles.kreska} />
            </summary>
          </details>
          <div className={styles.panel} id="menu-glowne">
              {/* aria-label — na podstronach filarowych są TRZY landmarki
                  nav (główna, okruszki, spis treści). Bezimienny landmark
                  w liście czytnika ekranu jest nierozróżnialny. */}
              <nav className={styles.naw} aria-label={t("nawGlowna")}>
                {/* role="list" — CSS zdejmuje punktory, a Safari
                    z VoiceOver odbiera wtedy liście semantykę. */}
                <ul role="list">
                  {POZYCJE_MENU.map((pozycja) => (
                    <li key={pozycja.sciezka}>
                      {/* A-1: dokładna ścieżka → "page"; podstrona sekcji
                          → "true" (pozycja jest rodzicem sekcji, nie
                          bieżącą stroną — tę wskazuje ostatni okruszek). */}
                      <a
                        href={adresWJezyku(locale, pozycja.sciezka)}
                        aria-current={
                          biezacaSciezka === pozycja.sciezka
                            ? "page"
                            : biezacaSciezka.startsWith(`${pozycja.sciezka}/`)
                              ? "true"
                              : undefined
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
                  (ADR-022/ADR-023). Zwykły <a> jest celowy. */}
              <a
                className={styles.logowanie}
                href={adresWJezyku(locale, "/login")}
                aria-current={biezacaSciezka === "/login" ? "page" : undefined}
              >
                {t("logowanie")}
              </a>
          </div>
        </div>
      </header>
    </>
  );
}
