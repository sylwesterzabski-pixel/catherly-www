import styles from "./NaglowekPodstrony.module.css";

type Props = {
  /** H1 podstrony — jedyny h1 (F2 wireframe'u K12). */
  naglowek: string;
  /** Jedno zdanie korzyści pod H1. */
  zdanie: string;
};

/**
 * F2 — nagłówek podstrony (markup wg HF
 * docs/faza-4/hf/k12-funkcje-pozyskiwanie.html, po panelu 2026-08-12):
 * H1 (clamp, miara 22ch) + zdanie korzyści. Treść z content przez
 * messages (D-B1). Zero JS.
 */
export function NaglowekPodstrony({ naglowek, zdanie }: Props) {
  return (
    <section className={styles.sekcja} aria-labelledby="podstrona-h1">
      {/* Nośnik ducha USUNIĘTY 2026-08-26 razem z blokiem eksperymentu
          przezroczystości (ADR-031, zadanie 2 zlecenia WWW/038-bis) —
          patrz bliźniaczy nośnik w SekcjaRytmu.tsx. */}
      <div className={styles.wnetrze}>
        <h1 id="podstrona-h1" className={styles.naglowek}>
          {naglowek}
        </h1>
        <p className={styles.zdanie}>{zdanie}</p>
      </div>
    </section>
  );
}
