import { test, expect } from "@playwright/test";

import { otworzMenuJesliZwiniete } from "./pomoc/menu";

import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";
// Importowana jest FUNKCJA kształtu adresu, nigdy DANE mapy — mapa jest
// przepisana niżej jako lustro. Powód: mapa zawiera korzeń „/", a jego
// adres w danym języku to jedyne miejsce, gdzie reguła prefiksu ma
// wyjątek (sciezki.ts:26). Przepisanie tego wyjątku po raz drugi
// w teście dawałoby drugą kopię tej samej pułapki, nie drugi dowód.
import { adresWJezyku } from "../src/i18n/sciezki";

/**
 * Bramka: Parytet pl/en/de w UI (ADR-008) — nawigacja i stopka
 * renderują się we wszystkich trzech wersjach językowych z etykietami
 * z src/i18n/messages (kontrakt K1: pl bez prefiksu, /en, /de).
 */
const PRZYPADKI = [
  { adres: "/", jezyk: "pl", prefiks: "", komunikaty: pl },
  { adres: "/en", jezyk: "en", prefiks: "/en", komunikaty: en },
  { adres: "/de", jezyk: "de", prefiks: "/de", komunikaty: de },
] as const;

// Ścieżki pozycji menu — ZAPISANE WPROST (niezależnie od
// src/i18n/sciezki.ts): parytet hrefów per język to kontrakt K1
// (pl bez prefiksu: /funkcje…; en: /en/funkcje…; de: /de/funkcje…).
// To jedyne miejsce w tym pliku, gdzie oczekiwanie hrefa powstaje
// przez KONKATENACJĘ — i tak zostaje, bo tu leży dowód reguły
// prefiksu. Mapa stopki (niżej) konkatenować nie może: zawiera
// korzeń „/", dla którego `${prefiks}${sciezka}` daje "" (pl) i
// "/en/" (en) zamiast "/" i "/en".
const POZYCJE = [
  { klucz: "funkcje", sciezka: "/funkcje" },
  { klucz: "cennik", sciezka: "/cennik" },
  { klucz: "dlaKogo", sciezka: "/dla-kogo" },
] as const;

type Komunikaty = typeof pl;

/**
 * LUSTRO stałej MAPA_STOPKI z src/i18n/sciezki.ts (Etap E) —
 * PRZEPISANE, nie zaimportowane. Import robiłby ze strażnika tautologię:
 * mapa zmieniona w produkcji zmieniałaby jednocześnie oczekiwanie testu
 * i bramka zostałaby zielona przy KAŻDEJ zmianie. Ma paść, gdy stopka
 * zmieni skład, kolejność, poziom albo klucz etykiety — wtedy człowiek
 * świadomie przepisuje lustro (konwencja domu: e2e/oznaczenie-kierunku
 * .spec.ts:51-53, e2e/funkcje-indeks.spec.ts:37-39).
 *
 * `etykieta` jako funkcja, bo etykiety pochodzą z SZEŚCIU przestrzeni
 * messages (D-D12, zero nowych ciągów) — indeksowanie po zmiennej
 * nie dałoby się otypować.
 */
const MAPA_LUSTRO = [
  { sciezka: "/", etykieta: (m: Komunikaty) => m.Wspolne.stronaGlowna },
  { sciezka: "/funkcje", etykieta: (m: Komunikaty) => m.Nawigacja.funkcje },
  {
    sciezka: "/funkcje/pozyskiwanie",
    etykieta: (m: Komunikaty) => m.FunkcjePozyskiwanie.okruszek,
    filar: true,
  },
  {
    sciezka: "/funkcje/tresci",
    etykieta: (m: Komunikaty) => m.FunkcjeTresci.okruszek,
    filar: true,
  },
  {
    sciezka: "/funkcje/zespol",
    etykieta: (m: Komunikaty) => m.FunkcjeZespol.okruszek,
    filar: true,
  },
  {
    sciezka: "/funkcje/wyniki",
    etykieta: (m: Komunikaty) => m.FunkcjeWyniki.okruszek,
    filar: true,
  },
  { sciezka: "/cennik", etykieta: (m: Komunikaty) => m.Nawigacja.cennik },
  { sciezka: "/dla-kogo", etykieta: (m: Komunikaty) => m.Nawigacja.dlaKogo },
] as const;

// Linki języków w stopce (K1) — też lustro, wobec Stopka.tsx:9-13.
const JEZYKI = [
  { jezyk: "pl", adres: "/" },
  { jezyk: "en", adres: "/en" },
  { jezyk: "de", adres: "/de" },
] as const;

// Liczba linków w stopce = mapa strony + języki. WYPROWADZONA z luster
// powyżej, nie wpisana ręcznie: liczba wpisana ręcznie mierzy tylko
// „czy ktoś pamiętał ją zaktualizować", a wyprowadzona z lustra mierzy
// „czy stopka renderuje dokładnie to, co lustro deklaruje" — każdy link
// NADMIAROWY (np. dokument prawny podlinkowany przed czasem, kontrakt
// K1/I4) nadal wywraca asercję. Dokumenty i kontakt to TEKST „(wkrótce)".
// Etap E: 8 + 3 = 11 (przed Etapem E było 3 + 3 = 6).
const LICZBA_LINKOW_STOPKI = MAPA_LUSTRO.length + JEZYKI.length;

for (const { adres, jezyk, prefiks, komunikaty } of PRZYPADKI) {
  test(`parytet UI (${jezyk}): nawigacja i stopka z etykietami messages na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    // html lang zgodny z wersją językową.
    await expect(page.locator("html")).toHaveAttribute("lang", jezyk);

    // Skip-link: pierwszy element body, etykieta z messages.
    await expect(page.locator("body > a").first()).toHaveText(
      komunikaty.Nawigacja.przejdzDoTresci,
    );

    // Nagłówek: logo + trzy pozycje menu + Logowanie.
    /* Na kadrze ≤ 768 px pozycje siedzą w zwiniętym panelu — tak jak we
       wzorcu. Otwarcie menu NIE osłabia asercji: wszystkie sprawdzenia
       poniżej (widoczność, href, parytet ×3) zostają bez zmian; zmienia
       się wyłącznie to, że pytanie o widoczność zadajemy w stanie,
       w którym ma sens. Patrz `e2e/pomoc/menu.ts`. */
    await otworzMenuJesliZwiniete(page);
    const naglowek = page.locator("header");
    await expect(
      naglowek.getByRole("link", { name: "Catherly", exact: true }),
    ).toBeVisible();
    for (const { klucz, sciezka } of POZYCJE) {
      const link = naglowek.getByRole("link", {
        name: komunikaty.Nawigacja[klucz],
        exact: true,
      });
      await expect(link).toBeVisible();
      // Parytet hrefów per język: pl bez prefiksu, /en i /de z prefiksem.
      await expect(link).toHaveAttribute("href", `${prefiks}${sciezka}`);
    }
    await expect(
      naglowek.getByRole("link", {
        name: komunikaty.Nawigacja.logowanie,
        exact: true,
      }),
    ).toBeVisible();

    // Stopka: cztery sekcje z nagłówkami z messages.
    const stopka = page.locator("footer");
    for (const klucz of ["mapaStrony", "jezyk", "dokumenty", "kontakt"] as const) {
      await expect(
        stopka.getByRole("heading", {
          name: komunikaty.Stopka[klucz],
          exact: true,
        }),
      ).toBeVisible();
    }

    // Mapa strony: pełny spis treści serwisu — osiem adresów, hrefy
    // per język (parytet hrefów — kontrakt K1).
    const mapaStrony = stopka.locator("section", {
      has: page.getByRole("heading", {
        name: komunikaty.Stopka.mapaStrony,
        exact: true,
      }),
    });
    for (const wpis of MAPA_LUSTRO) {
      await expect(
        mapaStrony.getByRole("link", {
          name: wpis.etykieta(komunikaty),
          exact: true,
        }),
      ).toHaveAttribute("href", adresWJezyku(jezyk, wpis.sciezka));
    }

    // HIERARCHIA, nie samo wcięcie: cztery filary muszą siedzieć
    // w podliście WEWNĄTRZ <li> pozycji „Funkcje". Selektor z jawnymi
    // kombinatorami dziecka pada, gdy podlista zostanie wystawiona obok
    // rodzica albo mapa zostanie spłaszczona — czego sama lista ośmiu
    // hrefów wyżej by nie zauważyła.
    const filary = MAPA_LUSTRO.filter((wpis) => "filar" in wpis);
    const gniazdoFilarow = mapaStrony.locator(
      `li:has(> a[href="${adresWJezyku(jezyk, "/funkcje")}"]) > ul > li > a`,
    );
    await expect(gniazdoFilarow).toHaveCount(filary.length);
    await expect(gniazdoFilarow).toHaveText(
      filary.map((wpis) => wpis.etykieta(komunikaty)),
    );

    // Wcięcie podlisty jest NOŚNIKIEM informacji o zagnieżdżeniu dla
    // widzących (Stopka.module.css — świadomie BEZ pionowej kreski,
    // bo w roli kreski kontrast to 1,34:1 przy progu 3:1). Skoro niesie
    // informację, musi mieć strażnika: `.stopka ul` to selektor POTOMKA,
    // więc trafia też w podlistę i bez reguły o swoistości (0,1,2)
    // narzuciłby jej `padding: 0` (wcięcie znika, hierarchia znika
    // z ekranu) oraz `margin: 0 0 1.25rem` (odstęp sekcji WEWNĄTRZ
    // listy). Mierzony jest STYL WYLICZONY, więc reguła przegrana
    // na swoistości wygląda tu identycznie jak reguła usunięta.
    const podlista = mapaStrony.locator(
      `li:has(> a[href="${adresWJezyku(jezyk, "/funkcje")}"]) > ul`,
    );
    const stylPodlisty = await podlista.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        wciecie: parseFloat(s.paddingInlineStart),
        odstepDolem: parseFloat(s.marginBlockEnd),
      };
    });
    expect(stylPodlisty.wciecie, "wcięcie podlisty filarów > 0").toBeGreaterThan(
      0,
    );
    expect(
      stylPodlisty.odstepDolem,
      "podlista bez odstępu sekcji na dole",
    ).toBe(0);

    // ŻADNEGO oznaczenia bieżącej pozycji w mapie — w żadnej wartości.
    // Bieżące położenie oznacza wyłącznie nagłówek (A-1, Nawigacja.tsx
    // :52-58); asercja na sekcji mapy, a nie na całej stopce, bo w sekcji
    // języków aria-current="true" jest wymagane (niżej).
    await expect(mapaStrony.locator("a[aria-current]")).toHaveCount(0);

    // Języki jako linki; bieżący oznaczony aria-current="true".
    // Lokator ZAWĘŻONY do sekcji języków przez jej nagłówek: wersja
    // szukająca aria-current="true" w całej stopce trafiała tam
    // przypadkiem (jedyny nosiciel), więc przy każdym rozroście stopki
    // wpadałaby w tryb ścisły i padała nie z tego powodu, z którego
    // powstała. Klasy CSS Modules są haszowane w buildzie, więc `.jezyki`
    // jako selektor testu nie działa — zawężamy przez nagłówek (wzorzec
    // domu, ten sam co dla mapy wyżej).
    const sekcjaJezykow = stopka.locator("section", {
      has: page.getByRole("heading", {
        name: komunikaty.Stopka.jezyk,
        exact: true,
      }),
    });
    for (const { jezyk: jezykLinku, adres: adresLinku } of JEZYKI) {
      const link = sekcjaJezykow.locator(`a[lang="${jezykLinku}"]`);
      await expect(link).toHaveAttribute("href", adresLinku);
    }
    await expect(
      sekcjaJezykow.locator('a[aria-current="true"]'),
    ).toHaveAttribute("lang", jezyk);

    // Dokumenty: cztery NAZWY z messages jako TEKST „Nazwa (wkrótce)"
    // (I4 — decyzja właściciela 2026-08-10); kontakt: tekst „(wkrótce)".
    // ZERO linków do nieistniejących stron — łącznie tylko mapa strony
    // + języki.
    for (const nazwa of Object.values(komunikaty.Stopka.dokumentyPozycje)) {
      await expect(
        stopka.getByText(`${nazwa} ${komunikaty.Stopka.wkrotce}`),
      ).toBeVisible();
    }
    await expect(
      stopka.getByText(komunikaty.Stopka.wkrotce).first(),
    ).toBeVisible();
    await expect(stopka.locator("a")).toHaveCount(LICZBA_LINKOW_STOPKI);

    // Hero (K2) w main#tresc: H1 z messages — parytet szczegółowy
    // (podtytuł, CTA, potwierdzenia): e2e/hero.spec.ts.
    await expect(page.locator("main#tresc h1")).toHaveText(
      komunikaty.Hero.naglowek,
    );
  });
}
