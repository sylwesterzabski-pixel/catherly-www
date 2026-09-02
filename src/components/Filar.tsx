import {
  FORMATY_ZRODEL,
  SZEROKOSC_ZRODLA,
  SZEROKOSCI_RENDEROWANIA,
  WYSOKOSC_ZRODLA,
  srcSet,
  srcZapasowy,
} from "@/obrazy/zrzuty";

import styles from "./Filar.module.css";

type Props = {
  /** H2 z treści (content/filary.md przez messages). */
  naglowek: string;
  /** Identyfikator H2 — cel aria-labelledby sekcji. */
  idNaglowka: string;
  /** Zdanie korzyści (duet 1.125/600 — W6). */
  korzysc: string;
  /** Dokładnie trzy konkrety (treść OBOWIĄZUJE). */
  konkrety: readonly [string, string, string];
  /** Zebra desktopu (handoff: filary 2 i 4 mają obraz po lewej);
   *  na 390 px zawsze tekst nad obrazem (order tylko ≥48rem). */
  obrazPoLewej?: boolean;
  /** Zrzut Z6 przypisany filarowi: prefiks plików z rejestru
   *  (design/pipeline-obrazow.json) + alt z messages ×3 języki.
   *  Pominięty = filar pokazuje pustą ramkę (patrz nagłówek). */
  obraz?: {
    baza: string;
    alt: string;
  };
};

/**
 * K4 — sekcja filara (markup wg HF docs/faza-3/hf/k4-filary.html,
 * po panelu 2026-08-11, DECYZJE 9/10). DOM: tekst PRZED obrazem
 * (czytniki i 390 px czytają tekst najpierw; zebra wyłącznie
 * wizualna przez order). Zero JS.
 *
 * Filar ma DWA stany kadru i oba są celowe:
 *
 * 1. Z propem `obraz` — realny zrzut z dostawy Z6: <img>
 *    INFORMACYJNY z altem ×3 języki, BEZ aria-hidden na obrazie ani
 *    na kontenerze (W2). Priorytet ładowania NIŻSZY niż treść
 *    (polecenie odbioru Z6, pkt 5): loading="lazy" + fetchPriority
 *    ="low" — wszystkie cztery filary są pod foldem, elementem LCP
 *    pozostaje h1 hero. Rezerwacja miejsca z width/height realnych
 *    plików (W3), więc układ nie skacze po dociągnięciu (CLS).
 *
 * 2. Bez propu `obraz` — SLOT-FOTO-FILAR: ramka z aria-hidden,
 *    czekająca na kadr FOTOGRAFICZNY. To NIE jest stan „zapomnieliśmy
 *    obrazu" i od 2026-09-02 nie jest też stanem „oszczędzamy LCP".
 *
 *    ⚠ POWÓD TEGO STANU SIĘ ZMIENIŁ — stary zapis zostawiam jako ślad,
 *    bo sam był prawdziwy i mógłby zmylić: do 2026-09-02 stało tu, że
 *    strona jest bez kadrów ŚWIADOMIE, bo cztery zrzuty kosztują
 *    +150 ms LCP przy zapasie 96 ms (pomiar 2026-08-16, wariant 4:
 *    „najpierw odzyskać zapas na «/», potem włączyć"). Dziś powodem
 *    jest DECYZJA O MATERIALE: właściciel, WWW/072 pkt 1 — „ZERO
 *    zrzutów aplikacji i mockupów urządzeń na stronie głównej"
 *    (ADR-048). Odzyskanie zapasu LCP samo w sobie NIE wystarczy już
 *    do włączenia zrzutów z powrotem.
 *
 *    Przełącza to JEDNA flaga w rejestrze
 *    (design/pipeline-obrazow.json → osadzenieNaGlownej.wlaczone),
 *    którą czyta zarówno ta ścieżka, jak i strażnik
 *    e2e/zrzuty-filarow.spec.ts — nie da się włączyć markupu bez
 *    włączenia asercji ani odwrotnie.
 *
 * Kod gałęzi 1 zostaje kompletny mimo wyłączenia: skasowanie go
 * i odtwarzanie po odzyskaniu budżetu znaczyłoby przechodzić
 * weryfikację całej ścieżki (sumy, warianty, alty, dostępność)
 * drugi raz — a to właśnie ta weryfikacja była kosztem tego etapu.
 */
export function Filar({
  naglowek,
  idNaglowka,
  korzysc,
  konkrety,
  obrazPoLewej = false,
  obraz,
}: Props) {
  const klasyUkladu = obrazPoLewej
    ? `${styles.uklad} ${styles.obrazPoLewej}`
    : styles.uklad;
  return (
    <section className={styles.filar} aria-labelledby={idNaglowka} data-ton="ciemny-oliwka">
      <div className={styles.wnetrze}>
        <div className={klasyUkladu}>
          <div className={styles.tekst}>
            <h2 id={idNaglowka} className={styles.naglowek}>
              {naglowek}
            </h2>
            <p className={styles.korzysc}>{korzysc}</p>
            <ul className={styles.konkrety}>
              {konkrety.map((konkret, indeks) => (
                <li key={indeks}>{konkret}</li>
              ))}
            </ul>
          </div>
          {obraz === undefined ? (
            <div className={styles.obraz} aria-hidden="true" />
          ) : (
            <div className={styles.obraz}>
              <picture>
                {FORMATY_ZRODEL.map((format) => (
                  <source
                    key={format}
                    type={`image/${format}`}
                    srcSet={srcSet(obraz.baza, format)}
                    sizes={SZEROKOSCI_RENDEROWANIA}
                  />
                ))}
                {/* Surowy <img> zamiast next/image — świadomie, nie
                    z niewiedzy (reguła @next/next/no-img-element sama
                    milczy wewnątrz <picture>, więc nie ma tu czego
                    wyciszać):
                    optymalizator Nexta PRZEKODOWUJE plik na żądanie,
                    więc na produkcji lądowałby obraz o innej sumie niż
                    ten, który przeszedł weryfikację SHA-256 z dostawy
                    Z6 (instrukcja przekazania, sekcja „Integralność").
                    Tu publikujemy dokładnie te bajty, które
                    sprawdziliśmy, a warianty robi jawny pipeline
                    z commitowanym artefaktem
                    (scripts/obrazy-pipeline.mjs). */}
                <img
                  src={srcZapasowy(obraz.baza)}
                  alt={obraz.alt}
                  width={SZEROKOSC_ZRODLA}
                  height={WYSOKOSC_ZRODLA}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </picture>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
