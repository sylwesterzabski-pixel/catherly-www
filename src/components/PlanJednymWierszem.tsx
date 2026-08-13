import styles from "./PlanJednymWierszem.module.css";

type Props = {
  linkEtykieta: string;
  linkHref: string;
} & (
  | {
      /** Zdanie planu (liczby WYŁĄCZNIE z facts.json — brief K12;
       *  na wzorcowej podstronie zdanie bez liczb). */
      zdanie: string;
      zdania?: undefined;
    }
  | {
      /** F8 wieloczęściowy (brief K12, Uzupełnienie Etapu C, rejestr
       *  poz. 11 — /funkcje/zespol i /wyniki): zdania VERBATIM
       *  z content, każde w osobnym <p> (pełne formy „W planie
       *  Growth…" — każde zdanie niesie kwalifikator samodzielnie). */
      zdania: readonly string[];
      zdanie?: undefined;
    }
);

/**
 * F8 — plan jednym wierszem (markup wg HF
 * docs/faza-4/hf/k12-funkcje-pozyskiwanie.html, po panelu 2026-08-12):
 * zdanie (lub zdania — Etap C) + link do /cennik. Kolor linku
 * z globals (rola link). Zero JS.
 */
export function PlanJednymWierszem({
  zdanie,
  zdania,
  linkEtykieta,
  linkHref,
}: Props) {
  const lista = zdania ?? [zdanie];
  return (
    <section className={styles.sekcja}>
      <div className={styles.wnetrze}>
        {lista.map((tresc) => (
          <p key={tresc}>{tresc}</p>
        ))}
        <p>
          <a href={linkHref}>{linkEtykieta}</a>
        </p>
      </div>
    </section>
  );
}
