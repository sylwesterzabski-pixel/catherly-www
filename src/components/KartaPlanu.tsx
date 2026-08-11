import styles from "./SekcjaPlanow.module.css";

type Props = {
  /** Nazwa planu (h2 karty) — wzorzec: migawka Stripe. */
  nazwa: string;
  idNaglowka: string;
  /** Kwoty sformatowane per locale (src/lib/cennik.ts — migawka). */
  cenaMiesiecznie: string;
  cenaRocznie: string;
  /** Pełne zdanie oszczędności („oszczędzasz 298 zł" — messages
   *  + rachunek z migawki). Widoczne tylko przy „rocznie". */
  zdanieOszczednosci: string;
  /** Słowa interwału przy kwotach (sankcja panelu — filar decyzji
   *  o świadomym braku aria-live: kwota nigdy bez okresu). */
  etykietaMiesiecznie: string;
  etykietaRocznie: string;
  dlaKogo: string;
  /** „Wszystko ze Startera, a do tego:" — Growth/Pro. */
  dopisek?: string;
  pozycje: readonly string[];
  ctaEtykieta: string;
  ctaHref: string;
};

/**
 * K5 — karta planu (markup wg HF docs/faza-3/hf/cennik.html, po
 * panelu 2026-08-11). Trzy karty RÓWNORZĘDNE (ADR-003 — zakaz
 * plakietek i wyróżnień). OBIE ceny zawsze w DOM (no-JS: obie
 * widoczne; widocznością steruje K6 przez :has() w module sekcji).
 * CTA → /login (ADR-023). Zero JS.
 */
export function KartaPlanu({
  nazwa,
  idNaglowka,
  cenaMiesiecznie,
  cenaRocznie,
  zdanieOszczednosci,
  etykietaMiesiecznie,
  etykietaRocznie,
  dlaKogo,
  dopisek,
  pozycje,
  ctaEtykieta,
  ctaHref,
}: Props) {
  return (
    <article className={styles.karta} aria-labelledby={idNaglowka}>
      <h2 id={idNaglowka}>{nazwa}</h2>
      <p className={`${styles.cena} ${styles.cenaMiesiecznie}`}>
        {cenaMiesiecznie}{" "}
        <span className={styles.interwal}>{etykietaMiesiecznie}</span>
      </p>
      <p className={`${styles.cena} ${styles.cenaRocznie}`}>
        {cenaRocznie}{" "}
        <span className={styles.interwal}>{etykietaRocznie}</span>
      </p>
      <p className={`${styles.oszczednosc} ${styles.cenaRocznie}`}>
        {zdanieOszczednosci}
      </p>
      <p className={styles.dlaKogo}>{dlaKogo}</p>
      {dopisek === undefined ? null : (
        <p className={styles.dopisek}>{dopisek}</p>
      )}
      <ul className={styles.lista}>
        {pozycje.map((pozycja, indeks) => (
          <li key={indeks}>{pozycja}</li>
        ))}
      </ul>
      <a className={styles.cta} href={ctaHref}>
        {ctaEtykieta}
      </a>
    </article>
  );
}
