import styles from "./SekcjaKierunku.module.css";

type Props = {
  /** H2 sekcji kierunku (nazwa ze słownika; wielkość liter za
   *  content — PL „asystent AI" małą literą). */
  naglowek: string;
  /** Id H2 = kotwica (#asystent-ai — rozstrzygnięcie 5 panelu:
   *  kotwica wchodzi) i cel aria-labelledby sekcji. */
  idNaglowka: string;
  /** Zdanie kierunku — BEZ trybu dokonanego (D-B2). */
  tresc: string;
  /** Granica — 1 zdanie (wyróżnienie tekstowe, bez kreski). */
  granica: string;
  /** OZNACZENIE statusu kierunku (przestrzeń podstrony,
   *  `aiOznaczenie`) doklejane do H2 jako JEDEN węzeł tekstowy.
   *  OPCJONALNE ŚWIADOMIE, bo ten sam komponent renderuje na
   *  /funkcje/tresci także moduł Studio (tresci/page.tsx:84) —
   *  Studio ma formę karty kierunku wyłącznie z powodu przebudowy
   *  zrzutu (wyjątek F4-2, D-C5), a jego status obietnicy to DZIAŁA
   *  (K-D5). Gdyby oznaczenie było wbudowane w komponent zamiast
   *  wchodzić propem, Studio dostałoby fałszywy status.
   *  BEZ oznaczenia: człon w H2 nie pojawia się w ogóle — nie ma
   *  pustego separatora. */
  oznaczenie?: string;
};

/**
 * Sekcja kierunku AI (markup wg HF
 * docs/faza-4/hf/k12-funkcje-pozyskiwanie.html, po panelu 2026-08-12;
 * D-B2 — po module 10, przed F8). WARIANT KIERUNKU modułu: karta na
 * powierzchni, BEZ slotu zrzutu, bez trybu dokonanego; odróżnienie
 * wizualne od modułów DZIAŁA. Kotwica z odsunięciem od sticky
 * nagłówka z globals.css (W2+W4). Zero JS.
 */
export function SekcjaKierunku({
  naglowek,
  idNaglowka,
  tresc,
  granica,
  oznaczenie,
}: Props) {
  return (
    <section className={styles.sekcja} aria-labelledby={idNaglowka}>
      <div className={styles.wnetrze}>
        {/* Jeden węzeł tekstowy — ten sam powód, co w
            BlokZadaniaDnia: H2 jest celem aria-labelledby sekcji,
            więc jego tekst JEST nazwą dostępną sekcji. Sklejenie
            w szablonie zamiast dwóch węzłów inline gwarantuje
            odstęp, którego obliczanie nazwy dostępnej nie
            gwarantuje. */}
        <h2 id={idNaglowka} className={styles.naglowek}>
          {oznaczenie === undefined ? naglowek : `${naglowek} ${oznaczenie}`}
        </h2>
        <div className={styles.karta}>
          <p>{tresc}</p>
          <p>{granica}</p>
        </div>
      </div>
    </section>
  );
}
