import styles from "./Faq.module.css";

type Para = {
  pytanie: string;
  odpowiedz: string;
};

type Props = {
  /** sr-only H2 sekcji (mikro-tekst usankcjonowany przez panel). */
  naglowek: string;
  idNaglowka: string;
  /** Pary pytanie/odpowiedź — treść przychodzi z messages
   *  (komponent nie zna treści; reużycie: obawy na głównej, Etap F). */
  pary: readonly Para[];
};

/**
 * K8 — FAQ na natywnych details/summary (markup wg HF
 * docs/faza-3/hf/cennik.html, po panelu 2026-08-11). No-JS
 * z definicji; klawiatura darmowa; fokus z globalnego
 * :focus-visible. Zero JS.
 */
export function Faq({ naglowek, idNaglowka, pary }: Props) {
  return (
    <section className={styles.sekcja} aria-labelledby={idNaglowka}>
      <div className={styles.wnetrze}>
        <h2 id={idNaglowka} className={styles.srOnly}>
          {naglowek}
        </h2>
        <div className={styles.lista}>
          {pary.map(({ pytanie, odpowiedz }, indeks) => (
            <details key={indeks}>
              <summary>{pytanie}</summary>
              <p>{odpowiedz}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
