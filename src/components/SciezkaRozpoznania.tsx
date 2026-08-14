import type { ReactNode } from "react";

import styles from "./SciezkaRozpoznania.module.css";

type Akapit = {
  /** Klucz messages tego akapitu (s1_robi_1 …) — stabilny key
   *  Reacta; lista jest statyczna i nigdy nie zmienia kolejności. */
  klucz: string;
  /** Akapit CO ROBI zbudowany przez t.rich(...) na stronie:
   *  1–2 linki wplecione w zdanie (D-D21 — etykieta linku jest
   *  dokładnym podciągiem akapitu). Komponent go NIE interpretuje. */
  tresc: ReactNode;
};

type Props = {
  /** H2 ścieżki — zdanie ROZPOZNANIA SIEBIE, nie etykieta segmentu
   *  (D-D4; DlaKogo.sN_h2). */
  naglowek: string;
  /** Id H2 = KOTWICA ścieżki. Kontrakt publiczny D-D14, wspólny ×3
   *  języki: pracujesz-sama | budujesz-zespol | prowadzisz-strukture.
   *  Cel aria-labelledby sekcji ORAZ cel linku ze spisu treści. */
  idNaglowka: string;
  /** CO BOLI — ZAWSZE pierwszy akapit po H2. Pozycja jest częścią
   *  kontraktu, nie składu: razem ze stopniem 1.125rem niesie
   *  rozdział bólu od działania BEZ etykiety leksykalnej i BEZ
   *  koloru (rozstrzygnięcie 1 panelu — kolor jako jedyny nośnik
   *  znika w forced-colors: active). */
  boli: string;
  /** CO CATHERLY Z TYM ROBI — 3 / 2 / 2 akapity wg ścieżki. */
  akapity: readonly Akapit[];
  /** OD KTÓREGO PLANU — zdania sankcjonowane, 1 / 2 / 3 wg ścieżki,
   *  KAŻDE w osobnym <p>: pełna forma „W planie Growth…" musi zostać
   *  własnym zdaniem (rejestr warunków powrotu, poz. 11). */
  zdaniaPlanu: readonly string[];
  /** Etykieta linku do cennika (DlaKogo.cennikLink). */
  linkCennikaEtykieta: string;
  /** Adres /cennik w języku strony. */
  linkCennikaHref: string;
  /** CZEGO TA ŚCIEŻKA NIE ZAŁATWIA — 1 zdanie, OBOWIĄZKOWE (D-D3a).
   *  Rejestr wizualny granicy identyczny jak w ModulFunkcji:
   *  kreska inline-start + tekst drugorzędny (rozstrzygnięcie 2). */
  granica: string;
};

/**
 * S4 — ścieżka rozpoznania (markup wg HF
 * docs/faza-4/hf/d-dla-kogo.html, po panelu 2026-08-13). SEKCJA na
 * tle strony, bez karty (rozstrzygnięcie 4: karta zamyka ścieżkę jak
 * ofertę dla segmentu, brief chce rozpoznania „to ja"); wnętrze na
 * --wymiar-kontener-strony jak każda sekcja serwisu, a długość
 * wiersza trzyma --wymiar-miara-akapitu NA KAŻDYM akapicie. PIĘĆ
 * członów o różnym statusie bez ani jednej widocznej etykiety —
 * rozdział niosą pozycja, stopień i krawędź, nie kolor. Wiersz planu
 * jest CZŁONEM ścieżki, NIE komponentem PlanJednymWierszem
 * (rozstrzygnięcie 3 — brief w tym punkcie się nie utrzymał).
 * Linki w prozie biorą domyślne podkreślenie z globals.css, bez
 * lokalnej receptury (rozstrzygnięcie 5). Kotwica: h2 z id +
 * odsunięcie od sticky nagłówka z globals.css (W4). Zero JS.
 *
 * Nazwy klas idą 1:1 z makietą (.sciezka__…), dlatego H2 nie ma
 * własnej klasy — makieta stylizuje go selektorem `.sciezka h2`.
 */
export function SciezkaRozpoznania({
  naglowek,
  idNaglowka,
  boli,
  akapity,
  zdaniaPlanu,
  linkCennikaEtykieta,
  linkCennikaHref,
  granica,
}: Props) {
  return (
    <section className={styles.sciezka} aria-labelledby={idNaglowka}>
      <div className={styles.sciezka__wnetrze}>
        <h2 id={idNaglowka}>{naglowek}</h2>
        {/* CO BOLI — pierwszy akapit po H2 z kontraktu, nie ze składu:
            zmiana kolejności kasuje jedyny nośnik rozdziału bólu od
            działania, bo etykiety ani koloru tu nie ma. */}
        <p className={styles.sciezka__boli}>{boli}</p>
        {akapity.map((akapit) => (
          <p key={akapit.klucz} className={styles.sciezka__robi}>
            {akapit.tresc}
          </p>
        ))}
        {/* OD KTÓREGO PLANU — człon ścieżki, nie PlanJednymWierszem
            (rozstrzygnięcie 3). Każde zdanie sankcjonowane własnym
            <p>, link do cennika osobnym <p> na końcu. */}
        <div className={styles.sciezka__plan}>
          {zdaniaPlanu.map((zdanie) => (
            <p key={zdanie}>{zdanie}</p>
          ))}
          <p>
            <a href={linkCennikaHref}>{linkCennikaEtykieta}</a>
          </p>
        </div>
        <p className={styles.sciezka__granica}>{granica}</p>
      </div>
    </section>
  );
}
