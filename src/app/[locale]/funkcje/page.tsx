import { getTranslations, setRequestLocale } from "next-intl/server";

import { BlokZadaniaDnia } from "@/components/BlokZadaniaDnia";
import { NaglowekPodstrony } from "@/components/NaglowekPodstrony";
import { Nawigacja } from "@/components/Nawigacja";
import { PlanJednymWierszem } from "@/components/PlanJednymWierszem";
import { Zamkniecie } from "@/components/Zamkniecie";
import { routing } from "@/i18n/routing";
import { adresWJezyku, type Locale } from "@/i18n/sciezki";

/**
 * /funkcje — INDEKS wg zadań dnia (Faza 4, Etap D; treść
 * content/{pl,en,de}/funkcje.md — D-D1…D-D21, protokół
 * docs/faza-4/tresci-etap-d-po-panelach.md; markup wg HF
 * docs/faza-4/hf/d-funkcje-indeks.html po panelu projektu 2026-08-13,
 * handoff docs/faza-4/komponenty/handoff-etap-d.md).
 *
 * Stos I1–I6: nawigacja (BEZ okruszków — D-D2a: ścieżka jednopoziomowa)
 * → nagłówek podstrony → CZTERY bloki zadań dnia (BEZ spisu treści —
 * D-D20 doprecyzowane: „Na tej stronie" jest stałą PODSTRON funkcji,
 * a indeks sam jest nawigacją) → F8 plan jednym wierszem, wariant
 * jednozdaniowy → I6 zamknięcie (K11 krótki); stopka z layoutu.
 *
 * I4 — MILCZENIE: cztery bloki, nie pięć. Filar 5 (rozliczenia) nie ma
 * bloku i słowo nie pada w żadnym ciągu widocznym.
 *
 * Prerender SSG per locale; hierarchia 1×h1 + 4×h2. Zero JS.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Cztery bloki indeksu. Etykiety pozycji są REUŻYTE znak w znak
 * z przestrzeni podstron docelowych (D-D12) — w FunkcjeIndeks ich nie
 * ma i mieć nie będzie. Kolejność pozycji NIE jest redakcyjna: jest
 * kolejnością tablic MODULY w czterech src/app/[locale]/funkcje/
 * (rozstrzygnięcie 1 panelu — dlatego lista jest <ol>, nie <ul>).
 * Kotwice to slugi wspólne dla pl/en/de (kontrakt publiczny).
 *
 * OZNACZENIE pozycji kierunku (panel projektu 2026-08-14, forma L1-A;
 * rozstrzygnięcie właściciela tego samego dnia). Dwie pozycje — i tylko
 * dwie — celują w sekcje o statusie KIERUNKU i niosą klucz `oznaczenie`.
 * Klucz mieszka w FunkcjeIndeks, a NIE w przestrzeni podstrony, i nie
 * jest to obejście D-D12: D-D12 dotyczy ETYKIETY pozycji (ta nadal jest
 * reużyta znak w znak), a oznaczenie jest wypowiedzią INDEKSU o statusie
 * celu i niesie dodatkowo nazwę obszaru, której odpowiednik na podstronie
 * nie ma i mieć nie może (na podstronie obszar wynika z kontekstu).
 * Obszar jest tu jedynym różnicownikiem: obie pozycje mają tę samą
 * etykietę („asystent AI" ×2), więc identyczny sufiks zostawiłby dwie
 * nierozróżnialne nazwy dostępne. Symetrii indeks ⇔ podstrona pilnuje
 * strażnik S-SYMETRIA (e2e/oznaczenie-kierunku.spec.ts) — w obie strony.
 */
const BLOKI = [
  {
    klucz: "blok1",
    kotwica: "pozyskiwanie",
    sciezka: "/funkcje/pozyskiwanie",
    przestrzen: "FunkcjePozyskiwanie",
    pozycje: [
      { klucz: "mod1_nazwa", kotwica: "formularz" },
      { klucz: "mod2_nazwa", kotwica: "kalendarz" },
      { klucz: "mod3_nazwa", kotwica: "subskrypcja-kalendarza" },
      { klucz: "mod4_nazwa", kotwica: "eksport-vcard" },
      { klucz: "mod5_nazwa", kotwica: "qr-polecajacy" },
      { klucz: "mod6_nazwa", kotwica: "program-polecen" },
      { klucz: "mod7_nazwa", kotwica: "dmo" },
      { klucz: "mod8_nazwa", kotwica: "zadania" },
      { klucz: "mod9_nazwa", kotwica: "sala-treningowa" },
      { klucz: "mod10_nazwa", kotwica: "plany-rozmow" },
      // Sekcja kierunku AI stoi poza tablicą MODULY podstrony, więc
      // jej nazwa mieszka pod kluczem aiNaglowek, nie modN_nazwa.
      {
        klucz: "aiNaglowek",
        kotwica: "asystent-ai",
        oznaczenie: "blok1Oznaczenie",
      },
    ],
  },
  {
    klucz: "blok2",
    kotwica: "tresci",
    sciezka: "/funkcje/tresci",
    przestrzen: "FunkcjeTresci",
    pozycje: [
      { klucz: "mod1_nazwa", kotwica: "studio" },
      { klucz: "mod2_nazwa", kotwica: "szablony" },
      { klucz: "mod3_nazwa", kotwica: "hashtagi" },
      { klucz: "mod4_nazwa", kotwica: "kalendarz-publikacji" },
      { klucz: "mod5_nazwa", kotwica: "zatwierdzanie" },
      { klucz: "mod6_nazwa", kotwica: "tarcza" },
      { klucz: "mod7_nazwa", kotwica: "pieczec-etyczna" },
      { klucz: "mod8_nazwa", kotwica: "uczenie-glosu" },
      { klucz: "mod9_nazwa", kotwica: "tablica-postow" },
      // Moduł 1 (studio) NIE dostaje oznaczenia: na podstronie ma formę
      // karty kierunku wyłącznie z powodu przebudowy zrzutu (wyjątek
      // F4-2, D-C5), a status obietnicy ma DZIAŁA (K-D5).
      {
        klucz: "aiNaglowek",
        kotwica: "asystent-ai",
        oznaczenie: "blok2Oznaczenie",
      },
    ],
  },
  {
    klucz: "blok3",
    kotwica: "zespol",
    sciezka: "/funkcje/zespol",
    przestrzen: "FunkcjeZespol",
    pozycje: [
      { klucz: "mod1_nazwa", kotwica: "kreator-wdrozeniowy" },
      { klucz: "mod2_nazwa", kotwica: "zatwierdzanie-zespolu" },
      { klucz: "mod3_nazwa", kotwica: "pierwsze-90-dni" },
      { klucz: "mod4_nazwa", kotwica: "osiagniecia" },
      { klucz: "mod5_nazwa", kotwica: "paszport-zgodnosci" },
      { klucz: "mod6_nazwa", kotwica: "akademia" },
    ],
  },
  {
    klucz: "blok4",
    kotwica: "wyniki",
    sciezka: "/funkcje/wyniki",
    przestrzen: "FunkcjeWyniki",
    pozycje: [
      { klucz: "mod1_nazwa", kotwica: "pulpit" },
      { klucz: "mod2_nazwa", kotwica: "twoj-wrapped" },
      { klucz: "mod3_nazwa", kotwica: "cel" },
      { klucz: "mod4_nazwa", kotwica: "sciana-sukcesow" },
      { klucz: "mod5_nazwa", kotwica: "swiadectwo" },
      { klucz: "mod6_nazwa", kotwica: "wall-of-proof" },
    ],
  },
] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaFunkcje({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("FunkcjeIndeks");
  // Etykiety pozycji pobierane z przestrzeni podstron docelowych —
  // jedno źródło ciągu na serwis (D-D12). Kolejność zgodna z BLOKI.
  const etykiety = await Promise.all(
    BLOKI.map((blok) => getTranslations(blok.przestrzen)),
  );

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/funkcje" />
      <main id="tresc">
        {/* I2 — nagłówek podstrony; id="podstrona-h1" jest w komponencie
            na sztywno (NaglowekPodstrony.tsx). BEZ okruszków (D-D2a). */}
        <NaglowekPodstrony naglowek={t("h1")} zdanie={t("zdanie")} />
        {BLOKI.map((blok, indeks) => (
          <BlokZadaniaDnia
            key={blok.kotwica}
            naglowek={t(`${blok.klucz}Naglowek`)}
            idNaglowka={blok.kotwica}
            wprowadzenie={t(`${blok.klucz}Wprowadzenie`)}
            pozycje={blok.pozycje.map((pozycja) => ({
              etykieta: etykiety[indeks](pozycja.klucz),
              href: `${adresWJezyku(locale as Locale, blok.sciezka)}#${pozycja.kotwica}`,
              // `in` zamiast `?.`: pozycje bez oznaczenia nie mają tego
              // pola W OGÓLE, więc unia literałów z `as const` nie ma go
              // do zawężenia. Brak pola = brak członu, nie pusty człon.
              ...("oznaczenie" in pozycja
                ? { oznaczenie: t(pozycja.oznaczenie) }
                : {}),
            }))}
            linkEtykieta={t(`${blok.klucz}Link`)}
            linkHref={adresWJezyku(locale as Locale, blok.sciezka)}
          />
        ))}
        {/* I5 — F8 wariant jednozdaniowy (indeks agreguje zakres
            czterech podstron, więc zdanie jest jedno: „od Startera"). */}
        {/* F8 rozbite na dwa zdania 2026-08-14 (rozstrzygnięcie
            właściciela + mini-panel treści): „wszystko powyżej" nie
            może kwantyfikować pozycji kierunku, bo asystenta AI nie
            ma w żadnym planie (content/pl/cennik.md — wiersz
            WYKLUCZONE, „wywołania AI (klucz pusty)"). f8_1 zostaje
            ZNAK W ZNAK formułą korpusu stojącą w pięciu nietkniętych
            miejscach; f8_2 wyłącza pozycję z imienia. Gałąź `zdania`
            istniała wcześniej — /funkcje/zespol i /funkcje/wyniki. */}
        <PlanJednymWierszem
          zdania={[t("f8_1"), t("f8_2")]}
          linkEtykieta={t("f8link")}
          linkHref={adresWJezyku(locale as Locale, "/cennik")}
        />
        {/* I6 — K11 wariant krótki: CTA → /login (ADR-023). */}
        <Zamkniecie
          ctaEtykieta={t("zamkniecieCta")}
          ctaHref={adresWJezyku(locale as Locale, "/login")}
          zdaniePo={t("zamkniecieZdanie")}
        />
      </main>
    </>
  );
}
