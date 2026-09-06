import styles from "./BlokWzrostu.module.css";

type Props = {
  /** H2 sekcji — z `Filary.filar4.naglowek` (mapowanie WWW/093). */
  naglowek: string;
  /** Identyfikator H2 — cel `aria-labelledby` sekcji. */
  idNaglowka: string;
  /** Zdanie pod nagłówkiem — z `Filary.filar4.korzysc`. */
  zdanie: string;
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
 * ⚠ CZEGO TU NIE MA: karty „Twój Wrapped". Wzorzec stawia w tym bloku
 * wykres ośmiu tygodni z trzema liczbami podsumowania. Zlecenie żąda,
 * żeby dane szły WYŁĄCZNIE z `content/` — a tych liczb w `content/` nie
 * ma i dopisanie ich jest osobną robotą: jedenaście liczb w warstwie
 * treści wymaga wpisów w `content/liczby-w-tresci.json` z kategorią
 * i pokryciem, w trzech językach. Blok wchodzi bez karty, zamiast wejść
 * z liczbami bez pokrycia.
 */
export function BlokWzrostu({ naglowek, idNaglowka, zdanie }: Props) {
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
      </div>
    </section>
  );
}
