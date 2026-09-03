import { useTranslations } from "next-intl";

import { adresWJezyku, type Locale } from "@/i18n/sciezki";

import styles from "./PasSciezek.module.css";

type Props = {
  locale: Locale;
};

/**
 * R1 — ROZJAZD POD HERO (ADR-049, zlecenie WWW/074 krok 2).
 *
 * Powstał z pomiaru, nie z pomysłu. Audyt trzech podróży na kadrze
 * 390 px (WWW/073 krok 3) pokazał trzy rzeczy naraz:
 *   · między CTA hero (ekran 0,12) a linkiem cennika (ekran 10,04) nie
 *     było ANI JEDNEGO linku wychodzącego — dziewięć i pół ekranu bez
 *     wyjścia, a w tym przedziale leżą oba bóle, które strona nazywa;
 *   · dwanaście kotwic istniało jako CEL BEZ DROGI — zero linków na
 *     stronie do nich prowadziło;
 *   · podróż STRUKTURA nie miała na głównej ani jednego zdania.
 * Ten pas odpowiada na wszystkie trzy jednym elementem.
 *
 * ⚠ ZERO NOWEJ TREŚCI — i to jest warunek, nie ambicja. Etykiety to
 * PIERWSZE ZDANIA istniejących nagłówków `DlaKogo.s1_h2 … s3_h2`,
 * ucięte MECHANICZNIE (patrz `pierwszeZdanie`), nie zredagowane.
 * Nazwa pasa to istniejący klucz `Nawigacja.dlaKogo`. Nie napisano tu
 * ani jednego nowego wyrazu w żadnym z trzech języków.
 *
 * ⚠ CELOWO NIE UŻYTO `DlaKogo.naglowek` jako nazwy pasa, choć pasuje
 * znaczeniowo najlepiej („Pracujesz sama, budujesz zespół albo
 * prowadzisz strukturę"). Ten klucz niesie formę rodzajową („sama"),
 * a krok 3 tego samego zlecenia rodzaj ze strony głównej ZDEJMUJE —
 * wciągnięcie go tutaj dokładałoby to, co obok usuwamy.
 *
 * ⚠ TRZECI ADRES JEST INNY NIŻ DWA PIERWSZE i to nie jest niedoróbka.
 * Ból podróży SAMA i LIDERKA strona główna nazywa u siebie (S3 i filar
 * 3), więc ich drogi są kotwicami. Bólu podróży STRUKTURA na głównej
 * NIE MA — jedyne zdanie o wąskim gardle decyzji żyje na `/dla-kogo`,
 * więc tam prowadzi jej droga. Symetryczne trzy kotwice wyglądałyby
 * lepiej i kłamałyby o tym, gdzie ta treść jest.
 *
 * Zero JS: trzy zwykłe linki.
 */

/**
 * Ucina do pierwszego zdania. MECHANICZNIE — bez wyjątków i bez
 * osądu redakcyjnego, bo osąd byłby pisaniem treści.
 *
 * Reguła: wszystko do pierwszej kropki, wykrzyknika albo pytajnika
 * włącznie. Sprawdzona na wszystkich trzech językach: skraca wyłącznie
 * `s2_h2` (dwa zdania w pl/en/de), pozostałe dwa nagłówki są
 * jednozdaniowe i przechodzą w całości. Brak kropki → całość, żeby
 * reguła nigdy nie zwróciła pustego napisu.
 */
function pierwszeZdanie(zdanie: string): string {
  const dopasowanie = zdanie.match(/^.*?[.!?](\s|$)/);
  return dopasowanie ? dopasowanie[0].trim() : zdanie;
}

export function PasSciezek({ locale }: Props) {
  const t = useTranslations("DlaKogo");
  const tNawigacja = useTranslations("Nawigacja");

  const SCIEZKI = [
    { klucz: "s1_h2", adres: "#problem-h2" },
    { klucz: "s2_h2", adres: "#filar-3-h2" },
    {
      klucz: "s3_h2",
      adres: `${adresWJezyku(locale, "/dla-kogo")}#prowadzisz-strukture`,
    },
  ] as const;

  return (
    <nav className={styles.pas} aria-label={tNawigacja("dlaKogo")}>
      <ul className={styles.lista} role="list">
        {SCIEZKI.map(({ klucz, adres }) => (
          <li key={klucz}>
            <a className={styles.sciezka} href={adres}>
              {pierwszeZdanie(t(klucz))}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
