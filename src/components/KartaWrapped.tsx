import styles from "./KartaWrapped.module.css";

type Props = {
  /** Tytuł karty — cytat z `FunkcjeWyniki.mod2_nazwa`.
   *  ⚠ OPCJONALNY I NA GŁÓWNEJ POMINIĘTY: blok „wzrost" niesie ten sam
   *  ciąg jako `h2` sekcji, więc powtórzony w karcie dałby go dwa razy
   *  pod rząd — raz w zarysie dokumentu, raz obok. */
  tytul?: string;
  /** Zdanie pod tytułem — cytat z `Filary.filar4.konkret1`. */
  podtytul: string;
  /** Osiem wartości tygodniowych, ciągiem z `Wrapped.tygodnie`. */
  tygodnie: string;
  /** Etykieta osi poziomej — `Wrapped.tygodnieEtykieta`. */
  tygodnieEtykieta: string;
  /** Etykieta ostatniego słupka — `Wrapped.ostatni`. */
  ostatni: string;
  /** Trzy liczby podsumowania z etykietami, wszystkie z `Wrapped.*`. */
  podsumowanie: readonly { wartosc: string; etykieta: string }[];
  /** Zastrzeżenie — `Wrapped.podpis`. NIGDY nie jest puste. */
  podpis: string;
};

/**
 * KARTA „TWÓJ WRAPPED" (ADR-069, zlecenie WWW/096 v4 pkt 5) —
 * przerysowana z wzoru `design/obrazy-robocze/wzorzec-2026-09-06/
 * 8-wrapped.png` (SHA-256 `cf2f6ebb12e35303`).
 *
 * ⚠ ZAMKNIĘCIE POZYCJI T72 REJESTRU. Zlecenie `WWW/094` żądało tej
 * karty z danymi „wyłącznie z content/"; przeszukanie z kontrolą
 * pozytywną pokazało, że serii ośmiu tygodni w `content/` NIE MA, więc
 * blok „wzrost" wszedł wtedy BEZ karty — zamiast wejść z jedenastoma
 * liczbami bez pokrycia. Warunek zamknięcia brzmiał: rozstrzygnąć,
 * czym te liczby są. Rozstrzygnięte: są DANĄ PRZYKŁADOWĄ. Stąd
 * kategoria `dane-przykladowe` w `scripts/lint-liczby.mjs`, pięć
 * wpisów w `content/liczby-w-tresci.json` i podpis niżej.
 *
 * ⚠ PODPIS STOI W TREŚCI, NIE W RYSUNKU — I TO JEST CAŁY MECHANIZM,
 * NIE OZDOBA. Gdyby „dane przykładowe" było napisem wewnątrz `<svg>`,
 * zniknęłoby wszędzie tam, gdzie rysunek nie dociera: przy czytniku
 * ekranu (SVG ma `aria-hidden`), przy zablokowanych obrazach, przy
 * zaznaczeniu i skopiowaniu tekstu. Liczby zostałyby wtedy bez
 * zastrzeżenia — czyli wyglądałyby na twierdzenie o produkcie.
 * Warunek zawężający kategorii lintera mówi to samo od drugiej strony.
 *
 * ⚠ RYSUNEK MA `aria-hidden`, A DANE SĄ POD NIM TEKSTEM. Wykres nie
 * niesie ani jednej informacji, której nie ma w tekście karty: osiem
 * wartości stoi w `Wrapped.tygodnie` jako czytelny ciąg, trzy liczby
 * podsumowania jako osobne akapity. Czytnik ekranu dostaje więc pełną
 * treść bez opisywania geometrii słupków.
 *
 * ⚠ ANI JEDNEJ LICZBY WPISANEJ W TEN PLIK. Wysokości słupków, podziałka
 * osi i etykiety T1…T8 są WYLICZANE z przekazanego ciągu — literał
 * wartości w kodzie byłby drugim źródłem tej samej prawdy i rozjechałby
 * się z `content/` bezgłośnie. Jedyne liczby tutaj to współrzędne
 * geometrii rysunku, które nie są treścią.
 */
export function KartaWrapped({
  tytul,
  podtytul,
  tygodnie,
  tygodnieEtykieta,
  ostatni,
  podsumowanie,
  podpis,
}: Props) {
  const wartosci = tygodnie
    .split(",")
    .map((s) => Number.parseInt(s.trim(), 10))
    .filter((n) => Number.isFinite(n));

  /* Geometria rysunku w jednostkach viewBox. Skala pionowa zaokrągla
     szczyt w górę do pełnej dziesiątki, tak jak wzór: przy maksimum 27
     oś kończy się na 30. */
  const SZER = 320;
  const WYS = 150;
  const GORA = 8;
  const DOL = 128;
  const LEWA = 26;
  const szczyt = Math.max(10, Math.ceil(Math.max(...wartosci) / 10) * 10);
  const pas = (SZER - LEWA) / wartosci.length;
  const slupek = pas * 0.62;
  const y = (v: number) => DOL - ((DOL - GORA) * v) / szczyt;
  const x = (i: number) => LEWA + pas * i + (pas - slupek) / 2;
  const podzialka = Array.from({ length: szczyt / 10 + 1 }, (_, i) => i * 10);
  const linia = wartosci
    .map((v, i) => `${x(i) + slupek / 2},${y(v)}`)
    .join(" ");

  return (
    <div className={styles.karta}>
      {tytul === undefined ? null : <p className={styles.tytul}>{tytul}</p>}
      <p className={styles.podtytul}>{podtytul}</p>

      <svg
        className={styles.wykres}
        viewBox={`0 0 ${SZER} ${WYS}`}
        aria-hidden="true"
        focusable="false"
      >
        {podzialka.map((v) => (
          <g key={v}>
            <line
              className={styles.siatka}
              x1={LEWA}
              x2={SZER}
              y1={y(v)}
              y2={y(v)}
            />
            <text className={styles.os} x={LEWA - 5} y={y(v) + 2.6} fontSize={7}>
              {v}
            </text>
          </g>
        ))}

        {wartosci.map((v, i) => {
          const ostatniSlupek = i === wartosci.length - 1;
          return (
            <rect
              key={i}
              className={ostatniSlupek ? styles.slupekOstatni : styles.slupek}
              x={x(i)}
              y={y(v)}
              width={slupek}
              height={DOL - y(v)}
              rx="1.5"
            />
          );
        })}

        <polyline className={styles.krzywa} points={linia} />
        {wartosci.map((v, i) => (
          <circle
            key={i}
            className={styles.punkt}
            cx={x(i) + slupek / 2}
            cy={y(v)}
            r="2.4"
          />
        ))}

        {wartosci.map((v, i) => (
          <text
            key={i}
            className={styles.etykietaOsi}
            x={x(i) + slupek / 2}
            y={DOL + 10}
            fontSize={7}
          >
            {i === wartosci.length - 1
              ? ostatni
              : `${ostatni.slice(0, 1)}${i + 1}`}
          </text>
        ))}
      </svg>

      {/* Dane rysunku w postaci czytelnej — patrz nagłówek pliku. */}
      <p className={styles.seria}>
        <span className={styles.seriaEtykieta}>{tygodnieEtykieta}:</span>{" "}
        {tygodnie}
      </p>

      <ul className={styles.podsumowanie}>
        {podsumowanie.map((p) => (
          <li key={p.etykieta}>
            <span className={styles.wartosc}>{p.wartosc}</span>
            <span className={styles.etykieta}>{p.etykieta}</span>
          </li>
        ))}
      </ul>

      <p className={styles.podpis}>{podpis}</p>
    </div>
  );
}
