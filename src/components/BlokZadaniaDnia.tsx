import styles from "./BlokZadaniaDnia.module.css";

type Pozycja = {
  /** Etykieta pozycji = nazwa modułu podstrony docelowej, REUŻYTA
   *  z JEJ przestrzeni messages (D-D12) — np.
   *  tTresci("mod6_nazwa"). Nigdy nowy ciąg, nigdy kopia
   *  w FunkcjeIndeks. */
  etykieta: string;
  /** Pełny adres celu z fragmentem, w języku strony:
   *  `${adresWJezyku(locale, "/funkcje/tresci")}#tarcza`.
   *  Slug kotwicy jest WSPÓLNY dla trzech języków (kontrakt
   *  publiczny; bramka kotwic sprawdza ×3). */
  href: string;
  /** OZNACZENIE pozycji kierunku (FunkcjeIndeks.blokNOznaczenie) —
   *  obecne WYŁĄCZNIE przy pozycjach, których cel na podstronie ma
   *  status KIERUNKU, nieobecne przy pozostałych 31 (panel projektu
   *  2026-08-14, forma L1-A; strażnik S-SYMETRIA pilnuje symetrii w obie
   *  strony). Człon niesie rodzaj I OBSZAR, bo obszar jest jedynym
   *  różnicownikiem: obie pozycje kierunku mają dziś tę samą
   *  etykietę („asystent AI"), więc identyczny sufiks nie zamknąłby
   *  problemu duplikatu nazwy dostępnej. */
  oznaczenie?: string;
};

type Props = {
  /** H2 bloku — nazwa ZADANIA DNIA, nie nazwa filaru
   *  (FunkcjeIndeks.blokNNaglowek). */
  naglowek: string;
  /** Id H2 = KOTWICA bloku (pozyskiwanie | tresci | zespol | wyniki)
   *  i cel aria-labelledby sekcji. Slug wspólny ×3 języki. */
  idNaglowka: string;
  /** 1–2 zdania: po co ten kawałek dnia istnieje
   *  (FunkcjeIndeks.blokNWprowadzenie). */
  wprowadzenie: string;
  /** KOMPLET pozycji podstrony docelowej, w JEJ kolejności modułów
   *  (11 / 10 / 6 / 6). Skrócenie listy jest zmianą treści, nie
   *  decyzją układu — brief, „Ile funkcji wymienić w bloku". */
  pozycje: readonly Pozycja[];
  /** Etykieta linku wejściowego (FunkcjeIndeks.blokNLink) —
   *  BEZ strzałki: „→" dokłada CSS ::after z PUSTYM tekstem
   *  alternatywnym (D-D10, rozstrzygnięcie 7 panelu). */
  linkEtykieta: string;
  /** Adres podstrony filarowej w języku strony. */
  linkHref: string;
};

/**
 * I3 — blok zadania dnia (markup wg HF
 * docs/faza-4/hf/d-funkcje-indeks.html, po panelu 2026-08-13).
 * SEKCJA na tle strony, rozdzielona kreską — BEZ karty
 * (rozstrzygnięcie 3: karta na powierzchni znaczy na serwisie
 * „wariant kierunku", SekcjaKierunku). BEZ slotu obrazu (brief:
 * indeks nie obiecuje ekranu). Lista: <ol role="list"> bez cyfr,
 * JEDNA KOLUMNA ZAWSZE (rozstrzygnięcia 1 i 4). Cel dotykowy
 * budowany paddingiem samego <a> (rozstrzygnięcie 6). Kotwica: h2
 * z id, odsunięcie od sticky nagłówka z globals.css (W4). Zero JS.
 */
export function BlokZadaniaDnia({
  naglowek,
  idNaglowka,
  wprowadzenie,
  pozycje,
  linkEtykieta,
  linkHref,
}: Props) {
  return (
    <section className={styles.blok} aria-labelledby={idNaglowka}>
      <div className={styles.blok__wnetrze}>
        {/* H2 i linki list BEZ własnej klasy — makieta stylizuje je
            selektorami „.blok h2" i „.blok__lista a", a CSS 1:1
            z makiety jest silniejszy niż szkielet handoffu. */}
        <h2 id={idNaglowka}>{naglowek}</h2>
        <p className={styles.blok__wprowadzenie}>{wprowadzenie}</p>
        {/* role="list" JEST WARUNKIEM, nie ozdobą: przy
            list-style: none Safari i VoiceOver zdejmują semantykę
            listy razem z liczbą pozycji, a liczba pozycji jest
            jedynym słyszalnym dowodem kompletności listy
            (precedens PasekPotwierdzen.tsx:14). */}
        <ol className={styles.blok__lista} role="list">
          {pozycje.map((pozycja) => (
            <li key={pozycja.href}>
              {/* Oznaczenie sklejane w JEDEN węzeł tekstowy, a nie
                  w dwa sąsiadujące elementy inline: obliczanie nazwy
                  dostępnej NIE gwarantuje odstępu między sąsiednimi
                  węzłami inline, więc „asystent AIkierunek" byłoby
                  błędem niewidocznym na ekranie. Przy jednym węźle nie
                  ma czego sklejać, a nazwa dostępna jest znak w znak
                  tekstem widocznym (2.5.3 spełnione trywialnie,
                  sterowanie głosem i Ctrl+F trafiają). Bez span, bez
                  CSS i bez aria-* — nie ma czego wyłączyć. */}
              <a href={pozycja.href}>
                {pozycja.oznaczenie === undefined
                  ? pozycja.etykieta
                  : `${pozycja.etykieta} ${pozycja.oznaczenie}`}
              </a>
            </li>
          ))}
        </ol>
        <p className={styles.blok__wejscie}>
          <a href={linkHref}>{linkEtykieta}</a>
        </p>
      </div>
    </section>
  );
}
