import { routing } from "./routing";

export type Locale = (typeof routing.locales)[number];

/**
 * Pozycje menu głównego (STRATEGIA pkt 16; brief K1).
 * `klucz` wskazuje etykietę w messages (przestrzeń "Nawigacja").
 *
 * Od Etapu E ta stała ma DOKŁADNIE JEDNEGO konsumenta: Nawigacja.tsx.
 * Stopka czyta MAPA_STOPKI (niżej), a nie tę tablicę — granica „menu
 * główne zostaje trzypozycyjne" przestała być umową, a stała się faktem
 * kompilacyjnym. Zgodność menu z mapą pilnuje e2e/rejestr-mapy.spec.ts.
 */
export const POZYCJE_MENU = [
  { sciezka: "/funkcje", klucz: "funkcje" },
  { sciezka: "/cennik", klucz: "cennik" },
  { sciezka: "/dla-kogo", klucz: "dlaKogo" },
] as const;

/**
 * Adres ścieżki w danym języku: pl bez prefiksu, en/de z prefiksem
 * (/en, /de) — spójnie z routing.localePrefix "as-needed".
 */
export function adresWJezyku(locale: Locale, sciezka: string): string {
  if (locale === routing.defaultLocale) return sciezka;
  return sciezka === "/" ? `/${locale}` : `/${locale}${sciezka}`;
}

/**
 * MAPA STRONY W STOPCE (DECYZJA F4-5, Etap E) — spis TREŚCI serwisu.
 * Osiem adresów treściowych w dwóch poziomach: cztery filary są
 * DZIEĆMI /funkcje. Hierarchia nie jest ozdobą — kod mówi o tej
 * relacji w trzech miejscach naraz: fizyczne zagnieżdżenie tras
 * (src/app/[locale]/funkcje/*), dwa poziomy okruszków na każdej
 * podstronie i Nawigacja.tsx:52-58, gdzie /funkcje dostaje
 * aria-current="true" (nie "page") pod ścieżką dziecka. Mapa płaska
 * zaprzeczałaby wszystkim trzem.
 *
 * ETYKIETY SĄ REUŻYTE ZNAK W ZNAK z istniejących przestrzeni (D-D12,
 * jak indeks /funkcje) — `przestrzen` + `klucz` rozwiązywane w czasie
 * wykonania przez getTranslations w Stopka.tsx. ZERO nowych ciągów
 * w messages, zero duplikacji.
 *
 * KONTROLA NA PRZYSZŁOŚĆ — nie „poprawiać" filara 1 na
 * „Kontakty"/„Contacts"/„Kontakte". Wygląda to kusząco, bo zrównałoby
 * mapę z wyliczeniem w Hero.podtytul (filary 2-4 zgadzają się tam
 * słowo w słowo, filar 1 rozjeżdża się we wszystkich trzech językach)
 * — ale zbudowałoby DRUGĄ kolizję dokładnie tego typu co „Zespół"/
 * „Team": Cennik.tabela.kontakty to dokładnie „Kontakty"|„Contacts"|
 * „Kontakte" (messages :95). Właściciel rozstrzygnął 2026-08-15:
 * różnica ZOSTAJE, rejestr prozy ≠ rejestr nawigacji.
 *
 * `/login` NIE JEST tu celowo — mapa to spis treści, logowanie to
 * AKCJA obecna w nagłówku każdej strony (ADR-023). Patrz
 * WYLACZONE_Z_MAPY niżej: to jedyna droga ominięcia mapy.
 *
 * Ten plik importuje middleware (runtime Edge) — żadnych importów
 * z src/components.
 */
export const MAPA_STOPKI = [
  { sciezka: "/", klucz: "stronaGlowna", przestrzen: "Wspolne" },
  {
    sciezka: "/funkcje",
    klucz: "funkcje",
    przestrzen: "Nawigacja",
    // Kolejność filarów: pozyskiwanie → tresci → zespol → wyniki
    // (protokół tresci-trzy-podstrony-po-panelach.md) — ta sama, co
    // w łańcuchu przejść F9 i w indeksie /funkcje.
    dzieci: [
      {
        sciezka: "/funkcje/pozyskiwanie",
        klucz: "okruszek",
        przestrzen: "FunkcjePozyskiwanie",
      },
      {
        sciezka: "/funkcje/tresci",
        klucz: "okruszek",
        przestrzen: "FunkcjeTresci",
      },
      {
        sciezka: "/funkcje/zespol",
        klucz: "okruszek",
        przestrzen: "FunkcjeZespol",
      },
      {
        sciezka: "/funkcje/wyniki",
        klucz: "okruszek",
        przestrzen: "FunkcjeWyniki",
      },
    ],
  },
  { sciezka: "/cennik", klucz: "cennik", przestrzen: "Nawigacja" },
  { sciezka: "/dla-kogo", klucz: "dlaKogo", przestrzen: "Nawigacja" },
] as const;

/**
 * Adresy, które ISTNIEJĄ, ale świadomie NIE wchodzą do mapy stopki.
 * Jedyna droga ominięcia mapy — patrz ISTNIEJACE_SCIEZKI niżej.
 */
export const WYLACZONE_Z_MAPY = [
  // ADR-023: przekaźnik logowania to akcja z nagłówka, nie treść.
  "/login",
] as const;

/**
 * Spłaszczenie mapy do listy adresów (rodzice + dzieci).
 *
 * `in` zamiast `?.`: wpisy bez dzieci nie mają tego pola W OGÓLE,
 * więc unia literałów z `as const` nie ma go do zawężenia — `?.` to
 * tam błąd TS2339, nie bezpieczny dostęp. Ta sama pułapka i to samo
 * lekarstwo co w src/app/[locale]/funkcje/page.tsx:165-167.
 *
 * DEKLARACJA funkcji, nie `const` — jest wołana w inicjalizatorze
 * ISTNIEJACE_SCIEZKI poniżej, więc musi być wyniesiona (hoisting).
 * Wyrażenie funkcyjne dałoby ReferenceError z TDZ przy inicjalizacji
 * modułu, czyli 500 na KAŻDYM żądaniu (middleware importuje ten plik).
 */
function splaszczMape(mapa: typeof MAPA_STOPKI): string[] {
  return mapa.flatMap((wpis) =>
    "dzieci" in wpis
      ? [wpis.sciezka, ...wpis.dzieci.map((dziecko) => dziecko.sciezka)]
      : [wpis.sciezka],
  );
}

/**
 * Rejestr ścieżek, pod którymi ISTNIEJE strona (względem języka).
 * Middleware przepisuje KAŻDĄ inną ścieżkę na prerenderowaną stronę
 * 404 ze statusem 404 (B2 — patrz src/middleware.ts oraz
 * src/app/[locale]/nie-znaleziono/page.tsx). Celowo NIE ma tu
 * "/nie-znaleziono": bezpośrednie wejście na ten adres też ma dostać
 * status 404, nie 200.
 *
 * REJESTR JEST WYPROWADZONY Z MAPY (Etap E), nie pisany obok niej.
 * Skutek jest celowy: nowa strona nie może wejść do rejestru bez
 * świadomej decyzji „do mapy albo do WYLACZONE_Z_MAPY". Trzeciej drogi
 * nie ma, więc „dodałem stronę i zapomniałem o mapie" nie jest już
 * błędem do WYKRYCIA — jest stanem NIEWYRAŻALNYM.
 *
 * Kolejność wpisów jest tu bez znaczenia: obaj konsumenci rejestru
 * (middleware.ts:41, PrzejsciaFilarow.tsx:33/:35) używają .includes().
 */
export const ISTNIEJACE_SCIEZKI: readonly string[] = [
  ...splaszczMape(MAPA_STOPKI),
  ...WYLACZONE_Z_MAPY,
];

/**
 * TRZECIA KATEGORIA (E-10): adresy, dla których build WYTWARZA artefakt
 * HTML, ale które celowo NIE są osiągalne — wejście wprost ma zwrócić
 * 404, a link do nich jest linkiem martwym.
 *
 * Dziś jest tu jedna pozycja: strona 404 jest prerenderowana, bo
 * middleware przepisuje na nią nieznane adresy (B2), ale sama nie ma
 * być adresem. Do Etapu E ta wiedza siedziała jako wyjątek na regexpie
 * WEWNĄTRZ scripts/check-linki.mjs — bramka znała fakt, którego nie
 * znał rejestr, i była to jedyna łata trzymająca ją w zgodzie
 * z rzeczywistością. Teraz kategoria jest ZADEKLAROWANA obok dwóch
 * pozostałych, a bramka tylko ją czyta: trzy kategorie razem muszą
 * pokryć komplet artefaktów builda, co do jednego.
 */
export const PRERENDEROWANE_BEZ_ADRESU = ["/nie-znaleziono"] as const;
