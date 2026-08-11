import styles from "./Filar.module.css";

type Props = {
  /** H2 z treści (content/filary.md przez messages). */
  naglowek: string;
  /** Identyfikator H2 — cel aria-labelledby sekcji. */
  idNaglowka: string;
  /** Zdanie korzyści (duet 1.125/600 — W6). */
  korzysc: string;
  /** Dokładnie trzy konkrety (treść OBOWIĄZUJE). */
  konkrety: readonly [string, string, string];
  /** Zebra desktopu (handoff: filary 2 i 4 mają obraz po lewej);
   *  na 390 px zawsze tekst nad obrazem (order tylko ≥48rem). */
  obrazPoLewej?: boolean;
};

/**
 * K4 — sekcja filara (markup wg HF docs/faza-3/hf/k4-filary.html,
 * po panelu 2026-08-11, DECYZJE 9/10). DOM: tekst PRZED obrazem
 * (czytniki i 390 px czytają tekst najpierw; zebra wyłącznie
 * wizualna przez order). Ramka obrazu z aria-hidden WYŁĄCZNIE do
 * czasu dostawy Z6 — docelowy <img> jest INFORMACYJNY: alt opisowy
 * ×3 języki z handoffu, BEZ aria-hidden (W2). Zero JS.
 */
export function Filar({
  naglowek,
  idNaglowka,
  korzysc,
  konkrety,
  obrazPoLewej = false,
}: Props) {
  const klasyUkladu = obrazPoLewej
    ? `${styles.uklad} ${styles.obrazPoLewej}`
    : styles.uklad;
  return (
    <section className={styles.filar} aria-labelledby={idNaglowka}>
      <div className={styles.wnetrze}>
        <div className={klasyUkladu}>
          <div className={styles.tekst}>
            <h2 id={idNaglowka} className={styles.naglowek}>
              {naglowek}
            </h2>
            <p className={styles.korzysc}>{korzysc}</p>
            <ul className={styles.konkrety}>
              {konkrety.map((konkret) => (
                <li key={konkret}>{konkret}</li>
              ))}
            </ul>
          </div>
          <div className={styles.obraz} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
