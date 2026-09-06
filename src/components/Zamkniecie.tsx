import styles from "./Zamkniecie.module.css";

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
  /** Nagłówek sekcji (ADR-067). Opcjonalny — `/cennik` go nie ma. */
  naglowek?: string;
  /** Identyfikator nagłówka dla `aria-labelledby` sekcji. */
  idNaglowka?: string;
  /** Zdanie prowadzące NAD CTA (C8 /cennik: §7 treści cennika);
   *  główna go nie ma — werdykt panelu pkt 25. */
  zdaniePrzed?: string;
  ctaEtykieta: string;
  ctaHref: string;
  /** Zdanie o braku zobowiązania POD CTA (S13 główna). */
  zdaniePo?: string;
};

/**
 * K11 — zamknięcie strony (markup wg HF
 * docs/faza-3/hf/zlozenie-glowna.html, po panelu 2026-08-11).
 * Sekcja CELOWO bez h2 i bez aria-label (decyzja panelu, kandydat 3:
 * sekcja generyczna — sankcji dla wymyślonej etykiety odmówiono).
 * CTA parą ról interakcja/interakcja-aktywna (jak K2). Zero JS.
 */
export function Zamkniecie({
  naglowek,
  idNaglowka,
  zdaniePrzed,
  ctaEtykieta,
  ctaHref,
  zdaniePo,
  ton,
}: Props) {
  /* ⚠ TON ZDJĘTY (ADR-066). Sekcja zamykająca była ciemną wyspą na
     ciemnym korpusie; we wzorcu finalnym jest JASNA — zmierzone w kolumnie
     wzorca: blok „Zacznij prowadzić kontakty…" leży na tle jasnym, a jedyne
     ciemne miejsca to pasek, stopka, karty filarów i blok wzrostu.
     Bez atrybutu sekcja bierze korpus. */
  return (
    <section className={styles.sekcja} aria-labelledby={idNaglowka} data-tlo={ton}>
      <div className={styles.wnetrze}>
        {/* ⚠ NAGŁÓWEK WCHODZI (ADR-067, WWW/093 krok 3). Wzorzec finalny
            zamyka stronę zdaniem „Zacznij prowadzić kontakty i wyniki
            w Catherly” nad przyciskiem; u nas sekcja miała dotąd sam
            przycisk i zdanie pod nim. Klucz jest OPCJONALNY, bo ten sam
            komponent zamyka też `/cennik`, gdzie nagłówka nie ma — brak
            propsa nie renderuje pustego `h2`. */}
        {naglowek === undefined ? null : (
          <h2 id={idNaglowka} className={styles.naglowek}>
            {naglowek}
          </h2>
        )}
        {zdaniePrzed === undefined ? null : (
          <p className={styles.zdanieProwadzace}>{zdaniePrzed}</p>
        )}
        <a className={styles.cta} href={ctaHref}>
          {ctaEtykieta}
        </a>
        {zdaniePo === undefined ? null : (
          <p className={styles.zdanie}>{zdaniePo}</p>
        )}
      </div>
    </section>
  );
}
