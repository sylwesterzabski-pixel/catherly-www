import styles from "./SpisTresci.module.css";

type Pozycja = {
  /** Etykieta pozycji spisu = nazwa modułu H2 (messages modN_nazwa). */
  etykieta: string;
  /** Kotwica modułu bez „#" (slug z content — id nagłówka H2). */
  kotwica: string;
};

type Props = {
  /** Etykieta spisu „Na tej stronie" — WIDOCZNA i identyczna
   *  w aria-label nav-u (sankcja panelu D-C4, jedna etykieta ×4
   *  podstrony; protokół tresci-trzy-podstrony-po-panelach.md). */
  etykieta: string;
  pozycje: readonly Pozycja[];
};

/**
 * SPIS TREŚCI — standardowy element szablonu K12 (brief, Uzupełnienie
 * Etapu C; retroaktywnie także /funkcje/pozyskiwanie): lista linków do
 * kotwic modułów, nad pierwszym modułem. nav[aria-label] > ol > li > a.
 * Zakres: wyłącznie moduły (sekcja kierunku poza spisem — litera
 * briefu „lista linków do kotwic modułów"). Widoczna etykieta niesie
 * aria-hidden — accessible name daje aria-label nav-u z tą samą
 * treścią (bez podwójnego ogłaszania). Styl skromny: kolumna zawsze,
 * kolor linku z globals, tokeny. Zero JS.
 */
export function SpisTresci({ etykieta, pozycje }: Props) {
  return (
    <nav className={styles.spis} aria-label={etykieta}>
      <div className={styles.wnetrze}>
        <p className={styles.etykieta} aria-hidden="true">
          {etykieta}
        </p>
        <ol className={styles.lista}>
          {pozycje.map((pozycja) => (
            <li key={pozycja.kotwica}>
              <a href={`#${pozycja.kotwica}`}>{pozycja.etykieta}</a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
