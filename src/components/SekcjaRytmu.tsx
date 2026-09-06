import styles from "./SekcjaRytmu.module.css";

type Krok = {
  nazwa: string;
  tresc: string;
  /** Etykieta na kadrze — chip ze wzorca finalnego (ADR-067). */
  chip: string;
  /** Kadr pory dnia; brak = slot pusty z ramką (patrz komentarz niżej). */
  kadr?: string;
  /** Tekst alternatywny kadru. Wymagany razem z kadrem. */
  kadrAlt?: string;
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
    <section className={styles.sekcja} aria-labelledby={idNaglowka} data-ton="jasny">
      {/* Nośnik ducha USUNIĘTY 2026-08-26 razem z blokiem eksperymentu
          przezroczystości (ADR-031, zadanie 2 zlecenia WWW/038-bis).
          Zapowiedź „znika razem z blokiem eksperymentu" z komentarza
          sprzed zmiany została wykonana dosłownie. Nowa dekoracja tła
          nagłówków (`.tekst-duch`) to zadanie 10 checklisty — POZA
          zakresem tego zlecenia; nie zostawiam pustego nośnika, żeby
          nie udawał, że coś go stylizuje. */}
      <div className={styles.wnetrze}>
        <h2 id={idNaglowka}>{naglowek}</h2>
        <ul className={styles.kroki} role="list">
          {kroki.map(({ nazwa, tresc, chip, kadr, kadrAlt }) => (
            <li key={nazwa}>
              <span className={styles.nazwa}>{nazwa}</span>
              {/* ⚠ SLOT KADRU Z CHIPEM (ADR-067, WWW/094 krok 3).
                  Chip jest HTML-em NA kadrze, nie częścią bitmapy —
                  dzięki temu tłumaczy się razem z resztą strony i czyta
                  go czytnik ekranu. Wzorzec ma go wypalonego w obrazie;
                  u nas nie może być, bo mamy parytet ×3.

                  ⚠ SLOT BEZ KADRU ZOSTAJE WIDOCZNY — ramka i chip, bez
                  obrazu. To jedyne miejsce na stronie, gdzie pusty slot
                  NIE zwija się przez `:empty` (ADR-060), i jest to
                  decyzja zlecenia: trzy pory dnia są sekwencją, więc
                  zniknięcie środkowej złamałoby rytm bardziej niż jej
                  pustka. Pozycja rejestru czeka na kadr. */}
              <div className={styles.kadr}>
                {kadr === undefined ? null : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={kadr} alt={kadrAlt} width={1200} height={805} loading="lazy" decoding="async" />
                )}
                <span className={styles.chip}>{chip}</span>
              </div>
              <p>{tresc}</p>
            </li>
          ))}
        </ul>
        <p className={styles.kropka}>{kropka}</p>
      </div>
    </section>
  );
}
