import { adresWJezyku, ISTNIEJACE_SCIEZKI, type Locale } from "@/i18n/sciezki";

import styles from "./PrzejsciaFilarow.module.css";

type Przejscie = {
  /** Etykieta linku z messages (np. „Dalej: Treści →"). */
  etykieta: string;
  /** Ścieżka celu względem języka (np. "/funkcje/tresci"). */
  sciezka: string;
};

type Props = {
  locale: Locale;
  /** Przejście do poprzedniego filara (wzorcowa podstrona go nie ma —
   *  pierwszy filar). */
  wstecz?: Przejscie;
  /** Przejście do następnego filara. */
  dalej?: Przejscie;
};

/**
 * F9 — przejścia poziome między filarami (markup wg HF
 * docs/faza-4/hf/k12-funkcje-pozyskiwanie.html, po panelu 2026-08-12,
 * rozstrzygnięcie 4): link renderuje się WYŁĄCZNIE, gdy cel istnieje
 * w rejestrze ścieżek (bramka linków — ISTNIEJACE_SCIEZKI; middleware
 * serwuje 404 dla reszty). Gdy żaden cel nie istnieje, sekcja jest
 * NIEOBECNA w DOM (nie „tekst nieaktywny"). W Etapie B cel
 * /funkcje/tresci nie istnieje → komponent zwraca null; strony
 * Etapu C odblokują przejścia samym wpisem do rejestru. Zero JS.
 */
export function PrzejsciaFilarow({ locale, wstecz, dalej }: Props) {
  const wsteczIstnieje =
    wstecz !== undefined && ISTNIEJACE_SCIEZKI.includes(wstecz.sciezka);
  const dalejIstnieje =
    dalej !== undefined && ISTNIEJACE_SCIEZKI.includes(dalej.sciezka);
  if (!wsteczIstnieje && !dalejIstnieje) return null;
  return (
    <section className={styles.sekcja}>
      <div className={styles.przejscia}>
        {wsteczIstnieje ? (
          <a className={styles.wstecz} href={adresWJezyku(locale, wstecz.sciezka)}>
            {wstecz.etykieta}
          </a>
        ) : null}
        {dalejIstnieje ? (
          <a href={adresWJezyku(locale, dalej.sciezka)}>{dalej.etykieta}</a>
        ) : null}
      </div>
    </section>
  );
}
