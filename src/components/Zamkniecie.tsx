import styles from "./Zamkniecie.module.css";

type Props = {
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
  zdaniePrzed,
  ctaEtykieta,
  ctaHref,
  zdaniePo,
}: Props) {
  return (
    <section className={styles.sekcja} data-ton="ciemny">
      <div className={styles.wnetrze}>
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
