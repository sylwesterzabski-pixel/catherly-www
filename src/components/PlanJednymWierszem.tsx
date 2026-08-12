import styles from "./PlanJednymWierszem.module.css";

type Props = {
  /** Zdanie planu (liczby WYŁĄCZNIE z facts.json — brief K12;
   *  na wzorcowej podstronie zdanie bez liczb). */
  zdanie: string;
  linkEtykieta: string;
  linkHref: string;
};

/**
 * F8 — plan jednym wierszem (markup wg HF
 * docs/faza-4/hf/k12-funkcje-pozyskiwanie.html, po panelu 2026-08-12):
 * zdanie + link do /cennik. Kolor linku z globals (rola link). Zero JS.
 */
export function PlanJednymWierszem({ zdanie, linkEtykieta, linkHref }: Props) {
  return (
    <section className={styles.sekcja}>
      <div className={styles.wnetrze}>
        <p>{zdanie}</p>
        <p>
          <a href={linkHref}>{linkEtykieta}</a>
        </p>
      </div>
    </section>
  );
}
