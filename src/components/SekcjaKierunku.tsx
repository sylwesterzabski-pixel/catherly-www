import styles from "./SekcjaKierunku.module.css";

type Props = {
  /** H2 sekcji kierunku (nazwa ze słownika; wielkość liter za
   *  content — PL „asystent AI" małą literą). */
  naglowek: string;
  /** Id H2 = kotwica (#asystent-ai — rozstrzygnięcie 5 panelu:
   *  kotwica wchodzi) i cel aria-labelledby sekcji. */
  idNaglowka: string;
  /** Zdanie kierunku — BEZ trybu dokonanego (D-B2). */
  tresc: string;
  /** Granica — 1 zdanie (wyróżnienie tekstowe, bez kreski). */
  granica: string;
};

/**
 * Sekcja kierunku AI (markup wg HF
 * docs/faza-4/hf/k12-funkcje-pozyskiwanie.html, po panelu 2026-08-12;
 * D-B2 — po module 10, przed F8). WARIANT KIERUNKU modułu: karta na
 * powierzchni, BEZ slotu zrzutu, bez trybu dokonanego; odróżnienie
 * wizualne od modułów DZIAŁA. Kotwica z scroll-margin 5rem (W2+W4).
 * Zero JS.
 */
export function SekcjaKierunku({ naglowek, idNaglowka, tresc, granica }: Props) {
  return (
    <section className={styles.sekcja} aria-labelledby={idNaglowka}>
      <div className={styles.wnetrze}>
        <h2 id={idNaglowka} className={styles.naglowek}>
          {naglowek}
        </h2>
        <div className={styles.karta}>
          <p>{tresc}</p>
          <p>{granica}</p>
        </div>
      </div>
    </section>
  );
}
