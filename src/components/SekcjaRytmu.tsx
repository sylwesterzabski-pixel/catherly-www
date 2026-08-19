import styles from "./SekcjaRytmu.module.css";

type Krok = {
  nazwa: string;
  tresc: string;
};

type Props = {
  /** H2 pochodzi z treści (content/); jeden H1 na stronę. */
  naglowek: string;
  /** Identyfikator H2 — cel aria-labelledby sekcji. */
  idNaglowka: string;
  /** Trzy kroki rytmu (Rano / W ciągu dnia / Wieczorem) — treść
   *  przychodzi z messages; komponent nie zna treści. Nazwy kroków
   *  to FRAZY sekwencji (span 600), NIE h3 — decyzja panelu Etapu F
   *  (kandydat 1: sekwencja, nie podsekcje). */
  kroki: readonly Krok[];
  /** Kotwica jako „słyszalna kropka" — odpowiedź lustra na kropkę S3
   *  (ten sam duet 1.125/600; W4: strażnik porównuje konkatenację
   *  kroku wieczornego z kotwicą przeciw content). */
  kropka: string;
};

/**
 * S10 — rytm dnia, LUSTRO L1 (markup wg HF
 * docs/faza-3/hf/zlozenie-glowna.html, po panelu 2026-08-11).
 * Ten sam szkielet i skala typograficzna co K3; różni je wyłącznie
 * tło (rola-powierzchnia-akcentowa) i czasownik kropki. role="list"
 * jawnie: Safari/VoiceOver zdejmuje semantykę listy przy
 * list-style: none. Zero JS, zero ruchu.
 */
export function SekcjaRytmu({ naglowek, idNaglowka, kroki, kropka }: Props) {
  return (
    <section className={styles.sekcja} aria-labelledby={idNaglowka}>
      {/* Duch eksperymentu przezroczystości (część B2, 2026-08-17).
          Nośnik jest PUSTY — napis rysuje `content: attr(data-duch)`
          z globals.css, więc nie wchodzi do drzewa tekstu i nie dubluje
          H2 dla wyszukiwarek tekstu ani dla asercji liczących wystąpienia.
          Łańcuch jest ten sam, co widoczny nagłówek: duch nie może
          nieść informacji, której nie ma w normalnym tekście.
          Bez atrybutu data-paleta na <html> reguła `.duch` gasi go
          w całości (display: none). Znika razem z blokiem eksperymentu. */}
      <span className="duch" aria-hidden="true" data-duch={naglowek} />
      <div className={styles.wnetrze}>
        <h2 id={idNaglowka}>{naglowek}</h2>
        <ul className={styles.kroki} role="list">
          {kroki.map(({ nazwa, tresc }) => (
            <li key={nazwa}>
              <span className={styles.nazwa}>{nazwa}</span>
              <p>{tresc}</p>
            </li>
          ))}
        </ul>
        <p className={styles.kropka}>{kropka}</p>
      </div>
    </section>
  );
}
