import styles from "./ModulFunkcji.module.css";

type Props = {
  /** Nazwa funkcji ze słownika (H2; wielkość liter za content). */
  naglowek: string;
  /** Id H2 = KOTWICA (slug modułu — cel linków z indeksu /funkcje
   *  w Etapie D) i cel aria-labelledby sekcji. */
  idNaglowka: string;
  /** PO CO TO — 1–2 zdania (tryb dokonany; treść OBOWIĄZUJE). */
  poCo: string;
  /** CZEGO NIE ROBI — 1 zdanie, OBOWIĄZKOWE (uczciwa granica);
   *  bez etykiety, wyróżnienie kreską — rozstrzygnięcie 2 panelu. */
  granica: string;
  /** Zebra desktopu jak K4 (rozstrzygnięcie 3 panelu: moduły
   *  parzyste obraz po lewej); na 390 px zawsze tekst nad obrazem
   *  (order tylko ≥48rem). */
  obrazPoLewej?: boolean;
};

/**
 * F3–F7 — moduł funkcji (markup wg HF
 * docs/faza-4/hf/k12-funkcje-pozyskiwanie.html, po panelu 2026-08-12;
 * wzorzec K4). DOM: tekst PRZED obrazem (czytniki i 390 px czytają
 * tekst najpierw; zebra wyłącznie wizualna przez order). Ramka 16/10
 * z aria-hidden WYŁĄCZNIE do dostawy Z9+ — docelowy zrzut jest
 * INFORMACYJNY z alt (brief K12). Kotwica: h2 z id, odsunięcie od
 * sticky nagłówka z globals.css (W4). Zero JS.
 */
export function ModulFunkcji({
  naglowek,
  idNaglowka,
  poCo,
  granica,
  obrazPoLewej = false,
}: Props) {
  const klasyUkladu = obrazPoLewej
    ? `${styles.uklad} ${styles.obrazPoLewej}`
    : styles.uklad;
  return (
    <section className={styles.modul} aria-labelledby={idNaglowka}>
      <div className={styles.wnetrze}>
        <div className={klasyUkladu}>
          <div className={styles.tekst}>
            <h2 id={idNaglowka} className={styles.naglowek}>
              {naglowek}
            </h2>
            <p className={styles.poCo}>{poCo}</p>
            <p className={styles.granica}>{granica}</p>
          </div>
          <div className={styles.obraz} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
