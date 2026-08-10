import type { ReactNode } from "react";

import styles from "./SekcjaTekstowa.module.css";

type Props = {
  /** Wariant tonalny (brief K3): "neutralna" — tło strony;
   *  "akcentowa" — rola powierzchni akcentowej (ADR-025). */
  wariant?: "neutralna" | "akcentowa";
  /** H2 pochodzi z treści (content/); jeden H1 na stronę. */
  naglowek: string;
  /** Identyfikator H2 — cel aria-labelledby sekcji. */
  idNaglowka: string;
  /** „Słyszalna kropka": ostatni akapit sekcji wyeksponowany
   *  w osobnej linii (semantyka akapitu, nie span) — handoff K3. */
  kropka?: string;
  /** Akapity prozy (elementy <p>). */
  children?: ReactNode;
};

/**
 * K3 — sekcja tekstowa (markup 1:1 z HF
 * docs/faza-3/hf/k3-sekcja-tekstowa.html, po panelu 2026-08-10).
 * Sekcje renderują się w landmarku main strony. Zero JS, zero ruchu.
 */
export function SekcjaTekstowa({
  wariant = "neutralna",
  naglowek,
  idNaglowka,
  kropka,
  children,
}: Props) {
  const klasy =
    wariant === "akcentowa"
      ? `${styles.sekcja} ${styles.akcentowa}`
      : styles.sekcja;
  return (
    <section className={klasy} aria-labelledby={idNaglowka}>
      <div className={styles.wnetrze}>
        <h2 id={idNaglowka}>{naglowek}</h2>
        {children}
        {kropka === undefined ? null : (
          <p className={styles.kropka}>{kropka}</p>
        )}
      </div>
    </section>
  );
}
