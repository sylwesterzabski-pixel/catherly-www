import { test, expect } from "@playwright/test";

import {
  ISTNIEJACE_SCIEZKI,
  MAPA_STOPKI,
  POZYCJE_MENU,
  WYLACZONE_Z_MAPY,
  adresWJezyku,
} from "../src/i18n/sciezki";

/**
 * Etap E — spójność trzech stałych, które od inwersji rejestru zależą
 * od siebie nawzajem (src/i18n/sciezki.ts).
 *
 * DLACZEGO TEN PLIK IMPORTUJE PRODUKCJĘ, choć pozostałe strażniki
 * przepisują stałe z ręki (konwencja lustra — e2e/parytet-ui.spec.ts,
 * e2e/oznaczenie-kierunku.spec.ts): tamte sprawdzają, czy STRONA zgadza
 * się z deklaracją, więc import robiłby z nich tautologię. Ten sprawdza
 * RELACJĘ MIĘDZY DWIEMA stałymi produkcyjnymi — obie muszą być
 * prawdziwe, bo o ich rozjechanie się właśnie chodzi. Lustro byłoby tu
 * trzecią kopią, która sama mogłaby się rozjechać z obiema.
 *
 * Ten plik nie otwiera przeglądarki (brak fikstury `page`): to
 * asercje na module, a repo nie ma osobnego biegacza testów
 * jednostkowych — Playwright jest jedynym, jaki jest.
 */

const wMapie = MAPA_STOPKI.flatMap((wpis) =>
  "dzieci" in wpis
    ? [wpis.sciezka, ...wpis.dzieci.map((dziecko) => dziecko.sciezka)]
    : [wpis.sciezka],
);

test("menu główne jest podzbiorem PIERWSZEGO poziomu mapy stopki", () => {
  // Dryf, który otwiera Etap E: stopka przestała czytać POZYCJE_MENU,
  // więc od teraz nic w kompilatorze nie łączy trzech pozycji nagłówka
  // z ośmioma adresami mapy. Pozycja dopisana do menu bez wiersza
  // w mapie zniknęłaby ze spisu treści serwisu po cichu.
  const pierwszyPoziom = MAPA_STOPKI.map((wpis) => wpis.sciezka);
  for (const pozycja of POZYCJE_MENU) {
    expect(
      pierwszyPoziom,
      `pozycja menu ${pozycja.sciezka} musi być wpisem 1. poziomu mapy stopki`,
    ).toContain(pozycja.sciezka);
  }
});

test("rejestr ścieżek = mapa + wyłączenia, bez powtórzeń", () => {
  // Powtórzenie oznaczałoby adres jednocześnie W mapie i WYŁĄCZONY
  // z niej — sprzeczność, której .includes() w middleware nie zauważy
  // (rejestr działałby dalej, a intencja byłaby dwuznaczna).
  expect(
    [...new Set(ISTNIEJACE_SCIEZKI)].length,
    "brak powtórzeń w rejestrze",
  ).toBe(ISTNIEJACE_SCIEZKI.length);

  expect([...ISTNIEJACE_SCIEZKI].sort()).toEqual(
    [...wMapie, ...WYLACZONE_Z_MAPY].sort(),
  );
});

test("każdy adres z mapy i wyłączeń jest w rejestrze (a więc nie jest 404)", () => {
  // Odwrotny kierunek: gdyby spłaszczanie zgubiło poziom dzieci,
  // cztery filary zostałyby w stopce jako linki, ale middleware
  // odpowiadałby na nie stroną 404 (src/middleware.ts:41).
  for (const sciezka of [...wMapie, ...WYLACZONE_Z_MAPY]) {
    expect(ISTNIEJACE_SCIEZKI, `${sciezka} w rejestrze`).toContain(sciezka);
  }
  expect(wMapie.length, "osiem adresów treściowych (DECYZJA F4-5)").toBe(8);
});

test("mapa stopki serwuje 200 pod każdym adresem, w każdym języku", async ({
  request,
}) => {
  // Jedyny test w tym pliku, który dotyka serwera: deklaracja mapy jest
  // spójna wewnętrznie (testy wyżej), ale to jeszcze nie dowód, że pod
  // tymi adresami COKOLWIEK stoi. Zero przekierowań — mapa ma prowadzić
  // do adresu docelowego, nie do kanonizacji.
  for (const jezyk of ["pl", "en", "de"] as const) {
    for (const sciezka of wMapie) {
      const adres = adresWJezyku(jezyk, sciezka);
      const odpowiedz = await request.get(adres, { maxRedirects: 0 });
      expect(odpowiedz.status(), `${adres} → 200`).toBe(200);
    }
  }
});
