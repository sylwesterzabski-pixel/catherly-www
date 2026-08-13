import styles from "./Okruszki.module.css";

type Pozycja = {
  /** Etykieta okruszka (messages). */
  etykieta: string;
  /** Adres linku; brak = okruszek bieżącej strony (tekst,
   *  aria-current="page" — rozstrzygnięcie 1 panelu HF K12). */
  href?: string;
};

type Props = {
  /** aria-label nawigacji okruszkowej — mikrotekst „Jesteś tutaj"
   *  (sankcja: panel projektu HF K12, 2026-08-12; ×3 z messages). */
  ariaEtykieta: string;
  pozycje: readonly Pozycja[];
};

/**
 * F1b — okruszki podstrony (markup wg HF
 * docs/faza-4/hf/k12-funkcje-pozyskiwanie.html, po panelu 2026-08-12,
 * rozstrzygnięcie 1): nav[aria-label] > ol > li; ostatni okruszek to
 * TEKST z aria-current="page", nie link. Separator „→" wyłącznie w CSS
 * z pustym tekstem alternatywnym (W3: content: "→" / "" — czytniki
 * czytają listę, nie strzałki). Zero JS.
 */
export function Okruszki({ ariaEtykieta, pozycje }: Props) {
  return (
    <nav className={styles.okruszki} aria-label={ariaEtykieta}>
      {/* role="list" — ten sam powód co w SpisTresci: przy
          list-style: none Safari i VoiceOver zdejmują semantykę listy
          razem z liczbą pozycji (panel projektu D, 2026-08-13). */}
      <ol role="list">
        {pozycje.map((pozycja) =>
          pozycja.href === undefined ? (
            <li key={pozycja.etykieta} aria-current="page">
              {pozycja.etykieta}
            </li>
          ) : (
            <li key={pozycja.etykieta}>
              <a href={pozycja.href}>{pozycja.etykieta}</a>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
