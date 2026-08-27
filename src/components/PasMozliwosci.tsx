import { useTranslations } from "next-intl";

import styles from "./PasMozliwosci.module.css";

/**
 * 2.5 — PAS MOŻLIWOŚCI (WWW/059, ADR-047).
 *
 * Odpowiednik pasa integracji ze wzorca. Wzorzec przesuwa tam
 * LOGOTYPY partnerów; u nas logotypy firm są zakazem bezwzględnym
 * (`CLAUDE.md`, „Zakazy bezwzględne"), więc pas niesie NAZWY NASZYCH
 * MOŻLIWOŚCI — osiem, dokładnie te, które wymienia zlecenie.
 *
 * ZERO NOWEJ TREŚCI: każda pozycja to cytat z istniejącego klucza
 * `*_nazwa`, w brzmieniu właściwym dla języka. Ta sama zasada, co przy
 * kartach 2.3.
 *
 * ⚠ PAS JEST DEKORACJĄ I DLATEGO NIE NIESIE INFORMACJI UNIKALNEJ.
 * Wszystkie osiem nazw pada gdzie indziej na stronie — w kartach 2.3
 * albo na podstronach funkcji. Gdyby pas był jedynym miejscem, w którym
 * coś się pojawia, jego ukrycie przed czytnikiem ekranu zabierałoby
 * treść; tak nie jest. Kopia użyta do zapętlenia ma `aria-hidden`,
 * bo powtarza to samo dwa razy.
 */
const POZYCJE = [
  "FunkcjePozyskiwanie.mod7_nazwa",
  "FunkcjeTresci.mod1_nazwa",
  "FunkcjeTresci.mod6_nazwa",
  "FunkcjeTresci.mod7_nazwa",
  "FunkcjeZespol.mod3_nazwa",
  "FunkcjeWyniki.mod2_nazwa",
  "FunkcjeWyniki.mod5_nazwa",
  "FunkcjeWyniki.mod6_nazwa",
] as const;

export function PasMozliwosci() {
  const t = useTranslations();
  const nazwy = POZYCJE.map((k) => t(k));

  return (
    <div className={styles.pas}>
      {/* Maszt przesuwany w całości; dwie kopie listy dają zapętlenie
          bez skoku — po przejechaniu jednej szerokości kopia stoi
          dokładnie tam, gdzie start. */}
      <div className={styles.maszt}>
        <ul className={styles.lista} role="list">
          {nazwy.map((n) => (
            <li key={n} className={styles.pozycja}>
              {n}
            </li>
          ))}
        </ul>
        <ul className={styles.lista} role="list" aria-hidden="true">
          {nazwy.map((n) => (
            <li key={`kopia-${n}`} className={styles.pozycja}>
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
