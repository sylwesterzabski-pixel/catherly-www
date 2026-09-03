import { useTranslations } from "next-intl";

import styles from "./KartyFunkcji.module.css";

/**
 * 2.3 — SZEŚĆ KART FUNKCJI (WWW/059, ADR-047).
 *
 * ┌── ZERO NOWEJ TREŚCI — I TO JEST CAŁA KONSTRUKCJA TEGO PLIKU ──────┐
 * │ Rozstrzygnięcie `WWW/059`: tytuł karty = CYTAT z istniejącego     │
 * │ klucza nazwy funkcji, opis = jedno zatwierdzone zdanie. Nic tu    │
 * │ nie jest napisane na potrzeby tej sekcji.                         │
 * │                                                                   │
 * │ Nazwy funkcji mają w każdym języku WŁASNE brzmienie i są już      │
 * │ w `messages` jako samodzielne klucze `*_nazwa` — więc cytat jest  │
 * │ dosłowny, bez wycinania z dłuższych zdań. DE bierze swoje         │
 * │ „Täglicher Aktionsplan (DMO)", EN swoje „DMO — Daily Action Plan".│
 * └───────────────────────────────────────────────────────────────────┘
 *
 * DLACZEGO NIE MA GRUPY `KartyFunkcji` W `messages`, choć zlecenie na
 * nią pozwalało: przeniesienie ciągów do nowych kluczy zrobiłoby DWA
 * miejsca z tym samym zdaniem. Dwa miejsca rozjeżdżają się przy
 * pierwszej korekcie treści — a wtedy karta pokazywałaby inne zdanie
 * niż podstrona, z której je wzięto, i nikt by tego nie zauważył, bo
 * oba wyglądałyby poprawnie. Mapa poniżej wskazuje KLUCZE; podmiana
 * pojedynczej karty przy oglądzie to zmiana jednej linii tutaj.
 *
 * ⚠ BLOK NIE MA WŁASNEGO NAGŁÓWKA. Wzorzec ma nad kartami widoczne H2;
 * u nas każdy zatwierdzony nagłówek jest już zajęty przez inną sekcję,
 * a napisanie nowego byłoby autorstwem treści. Blok jest więc listą
 * bez nagłówka — dzięki temu nie psuje też porządku nagłówków strony.
 * Zgłoszone jako luka do decyzji.
 *
 * ⚠ KARTY SĄ BEZ IKON. Zlecenie mówi „6 kart ikonowych", a wzorzec ma
 * w każdej karcie ikonę po lewej (svg 18 × 10 w polu ~60 px). Nie mamy
 * zestawu ikon i dorysowanie go to decyzja o materiale graficznym,
 * nie implementacja. Geometria karty jest wzorca; miejsce po ikonie
 * zajmuje tekst.
 */

/** Karta → klucz tytułu → klucz zdania. Kolejność jak w zleceniu 2.3. */
const KARTY = [
  { id: "dmo", tytul: "FunkcjePozyskiwanie.mod7_nazwa", opis: "Filary.filar1.konkret1" },
  { id: "tarcza", tytul: "FunkcjeTresci.mod6_nazwa", opis: "Filary.filar2.konkret2" },
  { id: "pieczec", tytul: "FunkcjeTresci.mod7_nazwa", opis: "Filary.filar2.konkret3" },
  { id: "dziewiecdziesiat", tytul: "FunkcjeZespol.mod3_nazwa", opis: "Filary.filar3.konkret2" },
  /* ⚠ PULPIT — jedyne odstępstwo od litery „zdanie konkret z dwunastu".
     Wśród dwunastu zdań `konkret` NIE MA ani jednego, które wymienia
     Pulpit (sprawdzone we wszystkich trzech językach). Wchodzi więc
     `Filary.filar4.korzysc` — zdanie zatwierdzone, z tej samej sekcji,
     nazywające Pulpit wprost. Duch rozstrzygnięcia (zero autorstwa)
     zachowany; litera („z dwunastu") nie mogła być, bo takiego zdania
     tam nie ma. */
  { id: "pulpit", tytul: "FunkcjeWyniki.mod1_nazwa", opis: "Filary.filar4.korzysc" },
  { id: "swiadectwo", tytul: "FunkcjeWyniki.mod5_nazwa", opis: "Filary.filar4.konkret3" },
] as const;

export function KartyFunkcji() {
  /* Jedno wywołanie na cały katalog komunikatów — klucze niosą pełną
     ścieżkę, więc nie ma potrzeby sześciu przestrzeni nazw. */
  const t = useTranslations();

  return (
    <div className={styles.sekcja} data-ton="jasny">
      <div className={styles.wnetrze}>
        {/* role="list" JAWNIE — CSS zdejmuje punktory, a Safari
            z VoiceOver odbiera wtedy liście semantykę (ten sam powód
            co przy pasku potwierdzeń w hero). */}
        <ul className={styles.siatka} role="list">
          {KARTY.map((k) => (
            <li key={k.id} className={styles.karta}>
              <p className={styles.tytul}>{t(k.tytul)}</p>
              <p className={styles.opis}>{t(k.opis)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
