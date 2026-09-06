import type { ReactNode } from "react";

import styles from "./BlokWzrostu.module.css";

type Props = {
  /** H2 sekcji — z `Filary.filar4.naglowek` (mapowanie WWW/093). */
  naglowek: string;
  /** Identyfikator H2 — cel `aria-labelledby` sekcji. */
  idNaglowka: string;
  /** Zdanie pod nagłówkiem — z `Filary.filar4.korzysc`. */
  zdanie: string;
  /** Karta „Twój Wrapped" (ADR-069). Pominięta = blok bez karty, czyli
   *  stan, w którym blok wszedł w `WWW/094`, gdy danych nie było. */
  children?: ReactNode;
};

/**
 * Blok „wzrost" — trzecia wyspa klamry grafitowej na stronie głównej
 * (ADR-067, zlecenie WWW/094 krok 1), obok paska nawigacji i stopki.
 *
 * ⚠ TREŚĆ JEST W CAŁOŚCI ISTNIEJĄCA, ANI JEDNO SŁOWO NOWE. Nagłówek to
 * `Filary.filar4.naglowek` („Widzisz wzrost nawet po trudnym dniu"),
 * zdanie to `Filary.filar4.korzysc` — oba wskazane mapowaniem z `WWW/093`.
 * Zlecenie `WWW/090` oznaczało ten nagłówek jako NOWY; przeszukanie 345
 * kluczy pokazało, że istnieje znak w znak, więc niczego nie dopisuję.
 *
 * ⚠ KARTA „TWÓJ WRAPPED" WESZŁA W `WWW/096 v4` — a przez dwa zlecenia
 * jej tu NIE BYŁO i ten ślad zostaje, bo mówi, jak się takie rzeczy
 * domyka. `WWW/094` żądało karty z danymi „wyłącznie z content/";
 * przeszukanie z kontrolą pozytywną pokazało, że serii ośmiu tygodni
 * w `content/` nie ma, więc blok wszedł BEZ karty i z pozycją T72
 * rejestru — zamiast wejść z jedenastoma liczbami bez pokrycia.
 * Warunek zamknięcia brzmiał: najpierw rozstrzygnij, CZYM te liczby
 * są. `WWW/096 v4` rozstrzygnęło (dana przykładowa) i dopiero wtedy
 * karta mogła powstać. Kolejność była treścią, nie zwłoką.
 */
export function BlokWzrostu({ naglowek, idNaglowka, zdanie, children }: Props) {
  return (
    <section
      className={styles.sekcja}
      aria-labelledby={idNaglowka}
      data-ton="ciemny"
    >
      <div className={styles.wnetrze}>
        <h2 id={idNaglowka} className={styles.naglowek}>
          {naglowek}
        </h2>
        <p className={styles.zdanie}>{zdanie}</p>
        {children === undefined ? null : (
          <div className={styles.karta}>{children}</div>
        )}
      </div>
    </section>
  );
}
