import type { ReactNode } from "react";

import styles from "./SekcjaTekstowa.module.css";

type Props = {
  /** TON SEKCJI JASNEJ (ADR-069, WWW/096 v4 pkt 4): "1" = rola
   *  `tlo-strony` (zmierzona, 28,4 % pikseli jasnych wzorca), "2" = rola
   *  `powierzchnia`, czyli biel (zmierzona, 21,0 %), "3" = rola `tlo-3`
   *  (wyprowadzona, jasność o 3,5 pp niżej od tonu 1). Pominięty = ton
   *  strony, czyli stan wszystkich pozostałych stron.
   *  ⚠ Ton "2" jest tą samą barwą co rola `powierzchnia`, więc NIE WOLNO
   *  go dać sekcji z białymi kartami — plama karty by zniknęła, a jest
   *  jednym z czterech mechanizmów rozdziału ADR-038.
   *  (Barwy słowami, nie zapisem szesnastkowym: linter tokenów czyta
   *  także komentarze i hex w prozie zaczerwieniłby bramkę.) */
  ton?: "1" | "2" | "3";
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
  ton,
}: Props) {
  const klasy =
    wariant === "akcentowa"
      ? `${styles.sekcja} ${styles.akcentowa}`
      : styles.sekcja;
  const tresc = (
    <div className={styles.wnetrze}>
      <h2 id={idNaglowka}>{naglowek}</h2>
      {children}
      {kropka === undefined ? null : (
        <p className={styles.kropka}>{kropka}</p>
      )}
    </div>
  );

  return (
    <section className={klasy} aria-labelledby={idNaglowka} data-tlo={ton} data-ton="jasny">
      {kadr === undefined ? (
        tresc
      ) : (
        /* ⚠ DWIE KOLUMNY, KADR PO PRAWEJ — POPRAWKA POMIARU (ADR-069,
           WWW/096 v4 pkt 3). Do 06.09 kadr stał POD prozą na szerokość
           kontenera filaru (1200 px), a komentarz w tym miejscu powoływał
           się na pomiar „85,9 % szerokości kolumny, czyli 1237 px" —
           i ten pomiar był PRAWDZIWY, tylko dotyczył innego przedmiotu.
           Mierzył on OBRYS OBUDOWY laptopa w pasie y 1560–2149 kolumny
           odniesienia, czyli osobny, duży kadr niżej w kompozycji.
           Mockup sekcji „pamięć" to co innego: pas y 700–1020, x 878–1416
           przy 1536 — czyli 538 px, po przeliczeniu ×0,9375 **504 px**,
           35,0 % szerokości pasa, i stoi PO PRAWEJ od prozy, nie pod nią.
           Zmierzone przed poprawką na naszej stronie: kadr zajmował
           1,5 wysokości okna.

           Zapisuję to jako klasę, nie jako pomyłkę arytmetyczną: liczba
           z pomiaru wygląda tak samo wiarygodnie niezależnie od tego, czy
           mierzono nią ten przedmiot, o który chodzi. */
        <div className={styles.uklad}>
          {tresc}
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
        </div>
      )}
    </section>
  );
}
