import styles from "./Zamkniecie.module.css";

type Props = {
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
}: Props) {
  /* ⚠ TON ZDJĘTY (ADR-066). Sekcja zamykająca była ciemną wyspą na
     ciemnym korpusie; we wzorcu finalnym jest JASNA — zmierzone w kolumnie
     wzorca: blok „Zacznij prowadzić kontakty…" leży na tle jasnym, a jedyne
     ciemne miejsca to pasek, stopka, karty filarów i blok wzrostu.
     Bez atrybutu sekcja bierze korpus. */
  return (
    <section className={styles.sekcja} aria-labelledby={idNaglowka}>
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
