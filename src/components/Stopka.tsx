import { useTranslations } from "next-intl";

import { adresWJezyku, MAPA_STOPKI, type Locale } from "@/i18n/sciezki";

import styles from "./Stopka.module.css";

/** Linki języków w stopce: /, /en, /de (handoff K1). Nazwy języków są
 *  nazwami własnymi — identyczne we wszystkich wersjach (atrybut lang). */
const JEZYKI = [
  { locale: "pl", nazwa: "Polski", adres: "/" },
  { locale: "en", nazwa: "English", adres: "/en" },
  { locale: "de", nazwa: "Deutsch", adres: "/de" },
] as const;

type Props = {
  locale: Locale;
};

/** Nazwy dokumentów prawnych w stopce (I4 — zatwierdzone przez
 *  właściciela 2026-08-10; handoff K1/K3). Klucze wskazują etykiety
 *  w messages (Stopka.dokumentyPozycje). DE „Auftragsverarbeitung" =
 *  umowa powierzenia (RODO Art. 28) — weryfikacja intencji w handoffie. */
const DOKUMENTY = [
  "regulamin",
  "prywatnosc",
  "ciasteczka",
  "przetwarzanieDanych",
] as const;

/**
 * K1 — stopka (markup wg HF docs/faza-3/hf/k1-nawigacja.html; od
 * rundy 4 sekcja Dokumenty rozszerzona względem HF o NAZWY czterech
 * dokumentów prawnych — I4). Mapa strony i języki jako LINKI;
 * dokumenty prawne jako TEKST „Nazwa (wkrótce)" i kontakt jako TEKST
 * „(wkrótce)" — ŻADNYCH linków do nieistniejących stron (bramka
 * linków; linki wchodzą wraz ze stronami dokumentów).
 *
 * Etap E: mapa strony to pełny, DWUPOZIOMOWY spis treści serwisu
 * (osiem adresów, MAPA_STOPKI w src/i18n/sciezki.ts), a nie odbicie
 * menu głównego. Stopka celowo NIE importuje już POZYCJE_MENU —
 * gdyby importowała, każde rozszerzenie mapy rozdymałoby menu.
 *
 * KOMPONENT ZOSTAJE SYNCHRONICZNY. Przestrzenie z mapy rozwiązuje
 * `useTranslations()` BEZ przestrzeni + pełny klucz „Przestrzeń.klucz"
 * — zasada D-D12 („jedno źródło ciągu na serwis") mówi o ŹRÓDLE
 * etykiety, nie o mechanizmie jej pobrania. Wariant asynchroniczny
 * (getTranslations, jak w funkcje/page.tsx:145-147) też by zadziałał,
 * bo jedyny rodzic — layout.tsx:40 — jest już async; odrzucony, bo
 * uzależniałby stopkę od asynchroniczności KAŻDEGO przyszłego rodzica
 * (granice błędu, not-found), a nic w zamian nie daje.
 */
export function Stopka({ locale }: Props) {
  const t = useTranslations("Stopka");
  // Bez przestrzeni: mapa trzyma przestrzeń jako DANE, więc klucz jest
  // składany („Wspolne.stronaGlowna", „FunkcjeWyniki.okruszek").
  const tPelne = useTranslations();
  const etykieta = (wpis: { przestrzen: string; klucz: string }) =>
    tPelne(`${wpis.przestrzen}.${wpis.klucz}`);
  return (
    <footer className={styles.stopka}>
      <div className={styles.kolumny}>
        <section>
          <h2>{t("mapaStrony")}</h2>
          {/* role="list" — CSS zdejmuje punktory (Stopka.module.css),
              a Safari z VoiceOver odbiera wtedy liście semantykę.
              Dotyczy TAKŻE podlisty filarów niżej.

              ŻADNEGO aria-current w mapie — w ŻADNEJ wartości. Bieżące
              położenie oznacza wyłącznie nagłówek (Nawigacja.tsx:52-58,
              A-1). Duplikat w stopce nie tylko powtarza informację dwa
              razy, ale rozbija strażników: "page" łamie toHaveCount(1)
              w e2e/aria-current.spec.ts:36, a "true" — tryb ścisły
              lokatora w e2e/parytet-ui.spec.ts:103.

              Na stronie głównej KAŻDEGO języka wychodzą dwa linki pod
              ten sam adres (mapa „Strona główna" + własny język na
              liście języków: „/" w pl, „/en" w en, „/de" w de —
              sprawdzone w artefaktach builda). To świadome: różne
              nazwy dostępne, ten sam cel — WCAG tego nie zabrania,
              a axe i tak jest tu ślepe (reguła identical-links-
              same-purpose jest w axe-core domyślnie wyłączona —
              patrz e2e/oznaczenie-kierunku.spec.ts:37-43). */}
          <ul role="list">
            {MAPA_STOPKI.map((wpis) => (
              <li key={wpis.sciezka}>
                <a href={adresWJezyku(locale, wpis.sciezka)}>
                  {etykieta(wpis)}
                </a>
                {/* `in` zamiast `?.` — unia literałów z `as const` nie
                    ma pola „dzieci" do zawężenia (sciezki.ts:108-111).
                    Podlista SIEDZI W <li> rodzica, nie obok niego:
                    zagnieżdżenie ma być faktem drzewa dostępności,
                    a nie samym wcięciem w CSS. */}
                {"dzieci" in wpis && (
                  <ul role="list">
                    {wpis.dzieci.map((dziecko) => (
                      <li key={dziecko.sciezka}>
                        <a href={adresWJezyku(locale, dziecko.sciezka)}>
                          {etykieta(dziecko)}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.jezyki}>
          <h2>{t("jezyk")}</h2>
          <ul role="list">
            {JEZYKI.map((jezyk) => (
              <li key={jezyk.locale}>
                <a
                  href={jezyk.adres}
                  lang={jezyk.locale}
                  aria-current={jezyk.locale === locale ? "true" : undefined}
                >
                  {jezyk.nazwa}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>{t("dokumenty")}</h2>
          <ul className={styles.martwe} role="list">
            {DOKUMENTY.map((dokument) => (
              <li key={dokument}>
                {t(`dokumentyPozycje.${dokument}`)} {t("wkrotce")}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>{t("kontakt")}</h2>
          <ul className={styles.martwe} role="list">
            <li>{t("wkrotce")}</li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
