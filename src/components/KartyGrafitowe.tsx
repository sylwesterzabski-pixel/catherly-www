import { IKONY_RZEDU } from "./IkonyKafelkow";
import styles from "./KartyGrafitowe.module.css";

type Karta = {
  /** Identyfikator ikony w `IKONY_RZEDU`. */
  id: string;
  /** Tytuł karty — nazwa filaru. */
  tytul: string;
  /** Jedno zdanie pod tytułem. */
  zdanie: string;
  /** Droga dalej: etykieta i adres. */
  etykieta: string;
  adres: string;
};

type Props = {
  /** Dokładnie trzy karty — tyle stoi w rzędzie wzorca. */
  karty: readonly [Karta, Karta, Karta];
  /** Nazwa listy dla czytnika ekranu (region nie ma nagłówka). */
  aria: string;
};

/**
 * RZĄD TRZECH KART GRAFITOWYCH (ADR-069, zlecenie WWW/096 v4 pkt 1).
 *
 * Zmierzone w kolumnie odniesienia, pas `y 1045–1501`: trzy prostokąty
 * o szerokości 430 · 432 · 430 px przy pasie 1536, odstęp 37 px,
 * promień 27 px, barwa mediany RGB 46 · 47 · 50. Po przeliczeniu
 * ×0,9375 na kadr 1440: karta 403 px, odstęp 35 px, promień 25 px.
 * Wewnątrz karty (pomiar pasm treści): ikona na wysokości 52–151 px od
 * góry karty, tytuł 201–252, zdanie 287–364, link 374–408; wcięcie
 * boczne 38/39 px, górne 52, dolne 48.
 *
 * ⚠ ZERO NOWEJ TREŚCI — WSZYSTKIE SZEŚĆ CIĄGÓW TO CYTATY. Tytuły to
 * `Funkcje<Nazwa>.okruszek` („Pozyskiwanie", „Treści", „Zespół"),
 * zdania to `FunkcjeIndeks.blokNWprowadzenie`, etykiety dróg dalej to
 * `FunkcjeIndeks.blokNLink`. Ani jeden ciąg nie powstał przy tej
 * sekcji; mapa karta → klucz stoi w `page.tsx` i tam się ją podmienia.
 *
 * ⚠ TO NIE JEST DUPLIKAT SEKCJI FILARÓW, choć mówi o tych samych
 * czterech rzeczach. Wzorzec ma OBA bloki i mają różne role: rząd kart
 * jest SPISEM — trzy nazwy, po zdaniu, droga dalej; sekcje filarów są
 * ROZWINIĘCIEM — nagłówek zdaniowy, korzyść, trzy konkrety, zdjęcie.
 * Kto szuka nazwy, znajduje ją w rzędzie; kto chce zrozumieć, czyta
 * niżej. Zdania w obu miejscach są RÓŻNE (`blokNWprowadzenie` wobec
 * `Filary.filarN.korzysc`), więc nie ma powtórzenia ciągu.
 *
 * ⚠ RZĄD LICZY TRZY KARTY, A FILARÓW JEST CZTERY — i to nie jest
 * przeoczenie. Trzy karty ma wzorzec, cztery filary są decyzją
 * właściciela (WWW/096 v4). Czwarta rzecz („Wyniki") ma na głównej
 * własną sekcję filaru i blok „wzrost"; w rzędzie by się dublowała.
 */
export function KartyGrafitowe({ karty, aria }: Props) {
  return (
    <section className={styles.sekcja} aria-label={aria} data-ton="ciemny">
      <div className={styles.wnetrze}>
        <ul className={`${styles.rzad} ruch-stagger`}>
          {karty.map((k) => (
            <li key={k.id} className={styles.karta}>
              <span className={styles.ikona}>{IKONY_RZEDU[k.id]}</span>
              <p className={styles.tytul}>{k.tytul}</p>
              <p className={styles.zdanie}>{k.zdanie}</p>
              <a className={styles.dalej} href={k.adres}>
                {k.etykieta}
                {/* Chevron — rysunek, nie znak: glifu nie ma w subsecie
                    (sprawdzone, patrz komentarz w arkuszu). `aria-hidden`,
                    bo to strzałka kierunku, a nie treść linku. */}
                <svg
                  className={styles.chevron}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable={false}
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
