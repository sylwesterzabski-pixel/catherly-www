import type { ReactNode } from "react";

import styles from "./SekcjaTekstowa.module.css";

type Props = {
  /** Wariant tonalny (brief K3): "neutralna" — tło strony;
   *  "akcentowa" — rola powierzchni akcentowej (ADR-025). */
  wariant?: "neutralna" | "akcentowa";
  /** H2 pochodzi z treści (content/); jeden H1 na stronę.
   *  ReactNode, nie string, od ADR-033 (R-AKCENT-03): nagłówek może
   *  nieść fragment w akcencie, składany przez `t.rich` z klucza i18n.
   *  Słowa pozostają dokładnie te same — znacznik `<akcent>` jest
   *  wyłącznie nośnikiem podziału, nie treścią. */
  naglowek: ReactNode;
  /** Identyfikator H2 — cel aria-labelledby sekcji. */
  idNaglowka: string;
  /** „Słyszalna kropka": ostatni akapit sekcji wyeksponowany
   *  w osobnej linii (semantyka akapitu, nie span) — handoff K3. */
  kropka?: string;
  /** Akapity prozy (elementy <p>). */
  children?: ReactNode;
  /** KADR POD PROZĄ (ADR-067, zlecenie WWW/094 krok 2) — pojedynczy
   *  plik pod stałą ścieżką, bez rejestru srcset, ten sam kształt, jakim
   *  `Filar` niesie kadry tymczasowe. Pominięty = sekcja bez kadru,
   *  czyli stan wszystkich pozostałych sekcji tekstowych. */
  kadr?: {
    zrodlo: string;
    alt: string;
    szerokosc: number;
    wysokosc: number;
  };
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
  kadr,
}: Props) {
  const klasy =
    wariant === "akcentowa"
      ? `${styles.sekcja} ${styles.akcentowa}`
      : styles.sekcja;
  return (
    <section className={klasy} aria-labelledby={idNaglowka} data-ton="jasny">
      <div className={styles.wnetrze}>
        <h2 id={idNaglowka}>{naglowek}</h2>
        {children}
        {kropka === undefined ? null : (
          <p className={styles.kropka}>{kropka}</p>
        )}
      </div>
      {/* ⚠ KADR POZA `.wnetrze` — CELOWO. Wnętrze sekcji tekstowej trzyma
          miarę czytelną prozy (ok. 65 znaków); kadr ma we wzorcu 85,9 %
          szerokości kolumny, czyli 1237 px przy 1440. Wstawiony do
          wnętrza dostałby miarę akapitu i skurczył się do jednej trzeciej
          zmierzonej szerokości. */}
      {kadr === undefined ? null : (
        <div className={styles.kadr}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={kadr.zrodlo}
            alt={kadr.alt}
            width={kadr.szerokosc}
            height={kadr.wysokosc}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
    </section>
  );
}
