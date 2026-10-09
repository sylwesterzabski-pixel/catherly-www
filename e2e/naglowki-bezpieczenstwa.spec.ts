import { test, expect } from "@playwright/test";

import {
  DYREKTYWY_CSP,
  NAGLOWKI_BEZPIECZENSTWA,
  NAZWY_NAGLOWKOW,
} from "../src/naglowki-bezpieczenstwa";
import {
  ISTNIEJACE_SCIEZKI,
  PRERENDEROWANE_BEZ_ADRESU,
  adresWJezyku,
} from "../src/i18n/sciezki";
import { routing } from "../src/i18n/routing";

/**
 * STRAŻNIK KOMPLETU NAGŁÓWKÓW (zlecenie WWW/102 KROK 3: „każda trasa
 * zwraca komplet nagłówków — lista z jednego miejsca").
 *
 * ──────────────────────────────────────────────────────────────────────
 * DLACZEGO TEN PLIK IMPORTUJE PRODUKCJĘ, a nie przepisuje listy z ręki.
 *
 * Konwencja lustra (e2e/parytet-ui.spec.ts, e2e/oznaczenie-kierunku.spec.ts)
 * każe przepisywać stałe, bo tamte strażniki sprawdzają, czy STRONA zgadza
 * się z DEKLARACJĄ — import czyniłby z nich tautologię. Tu jest inaczej
 * i tak nakazuje wprost treść zlecenia: lista nagłówków ma być W JEDNYM
 * MIEJSCU. Druga, przepisana kopia rozjechałaby się przy pierwszej zmianie
 * i rozjazd byłby NIEMY w obie strony — strażnik albo pilnowałby nagłówka,
 * którego konfiguracja już nie wysyła, albo przestałby pilnować nowego.
 *
 * ⚠ CZEGO TEN IMPORT NIE SPRAWDZA — GRANICA WERDYKTU, nie przeoczenie.
 * Werdykt obowiązuje w zadeklarowanej dziedzinie: ten plik orzeka
 * „ODPOWIEDŹ NIESIE TO, CO DEKLARUJE LISTA", a NIE „lista jest słuszna".
 * Gdyby ktoś usunął nagłówek z `src/naglowki-bezpieczenstwa.ts`, komplet
 * skurczyłby się po obu stronach i ten test zostałby ZIELONY. Dlatego
 * poniżej stoi druga warstwa — asercje na TREŚCI wiążącej ze zlecenia,
 * wypisane W TYM PLIKU literałami. Tamte z importem rozjechać się nie mogą,
 * bo nie czerpią z niego wartości, tylko ją kontrolują.
 *
 * Trzecią warstwą jest sonda spoza repozytorium (`sonda-naglowki.mjs`),
 * która ma własną, niezależną listę sześciu nazw — zero wspólnego źródła
 * z tym plikiem. Przy KROKU 3 zgodziły się co do liczby: 30/30 adresów.
 *
 * ──────────────────────────────────────────────────────────────────────
 * ZAKRES: 30 ADRESÓW, ZERO WYŁĄCZEŃ. Zbiór tras czerpany ze źródła
 * (`src/i18n/sciezki.ts`), nie wypisany tutaj — i jego liczebność jest
 * sprawdzana osobnym testem, bo lista wyłączeń bez strażnika liczebności
 * jest furtką: nowa trasa mogłaby wpaść w lukę między „sprawdzana"
 * a „wyłączona" i zniknąć z pomiaru po cichu.
 *
 * ⚠ `/nie-znaleziono` ODDAJE 404 I MIMO TO MUSI NIEŚĆ KOMPLET. Strona 404
 * jest pokazywana odwiedzającej jak każda inna — nagłówek bezpieczeństwa
 * pominięty na niej byłby luką dokładnie tam, gdzie trafia ruch z błędnych
 * i podrobionych adresów.
 *
 * ZAKAZ 6 W KONSTRUKCJI, NIE W DYSCYPLINIE CZYTAJĄCEGO: ten plik czyta
 * nagłówki WYŁĄCZNIE PO NAZWIE (`headers()[nazwa]`) i nigdzie nie zrzuca
 * całej mapy. Mapa wydrukowana w logu przebiegu wypisałaby `set-cookie`,
 * a przy pomiarze na preview niosłaby jawnie wartość Protection Bypass.
 * Nie ma tu trybu, w którym dałoby się to zrobić przez nieuwagę.
 */

const JEZYKI = ["pl", "en", "de"] as const;

/** Komplet tras serwisu: osiągalne + prerenderowana 404. Oba zbiory ze
 *  źródła — gdy w `sciezki.ts` dojdzie adres, dojdzie i tutaj sam. */
const TRASY = [...ISTNIEJACE_SCIEZKI, ...PRERENDEROWANE_BEZ_ADRESU];

/** Nagłówek, którego nie ma nigdzie — KONTROLA NEGATYWNA CZYTNIKA.
 *  Bez niej „wszystkie obecne" mogłoby znaczyć „czytnik zwraca coś na
 *  każdą nazwę", a to wygląda identycznie jak komplet. */
const NAGLOWEK_WIDMO = "x-naglowek-ktorego-nie-ma-nigdzie";

test("zakres pomiaru = komplet tras ze źródła, zero wyłączeń", () => {
  expect(
    TRASY.length,
    "sprawdzane + wyłączone musi równać się liczbie tras w źródle",
  ).toBe(ISTNIEJACE_SCIEZKI.length + PRERENDEROWANE_BEZ_ADRESU.length);

  // DZIESIĄTKA JEST ZE ZBIORU, NIE Z DECYZJI — i dlatego NIE jest tu
  // literałem. Liczba adresów ma rosnąć razem z serwisem bez niczyjej
  // zgody; mechanizmem jest to, że KAŻDY z nich wchodzi do pomiaru.
  //
  // Druga strona tej samej luki, po stronie JĘZYKÓW: `JEZYKI` jest tu
  // wypisane z ręki (jak w pozostałych strażnikach domu), więc czwarty
  // język dodany w `routing.ts` wypadłby z pomiaru PO CICHU — nagłówki
  // byłyby niesprawdzone na całej jego gałęzi, a ten plik zostałby
  // zielony. Porównanie ze źródłem zamienia to przeoczenie w czerwień.
  expect([...JEZYKI].sort(), "zbiór języków pomiaru = języki routingu").toEqual(
    [...routing.locales].sort(),
  );
});

test("czytnik nagłówków widzi obecność I brak (kontrole w tym samym przebiegu)", async ({
  request,
}) => {
  const odpowiedz = await request.get(adresWJezyku("pl", "/"), {
    maxRedirects: 0,
  });
  const naglowki = odpowiedz.headers();

  // POZYTYWNA: nagłówek, który stoi tam od prowieniencji wydania (ADR-018)
  // i nie ma nic wspólnego z tym krokiem — jego obecność dowodzi, że
  // czytnik w ogóle sięga do nagłówków odpowiedzi.
  expect(
    naglowki["x-catherly-wydanie"],
    "kontrola pozytywna czytnika",
  ).toBeDefined();

  // NEGATYWNA: nazwa nieistniejąca musi czytać się jako brak.
  expect(naglowki[NAGLOWEK_WIDMO], "kontrola negatywna czytnika").toBeUndefined();
});

test("każda trasa w każdym języku niesie KOMPLET nagłówków bezpieczeństwa", async ({
  request,
}) => {
  const braki: string[] = [];

  for (const jezyk of JEZYKI) {
    for (const sciezka of TRASY) {
      const adres = adresWJezyku(jezyk, sciezka);
      // Zero przekierowań: nagłówki mają stać na odpowiedzi POD TYM
      // adresem, a nie na celu kanonizacji. Przy `maxRedirects` domyślnym
      // komplet na 301 zamaskowałby brak na stronie docelowej.
      const odpowiedz = await request.get(adres, { maxRedirects: 0 });
      const naglowki = odpowiedz.headers();

      // Status NIE jest tu warunkiem pomiaru — jest jego tożsamością.
      // 404 pod /nie-znaleziono jest zachowaniem POPRAWNYM (B2), więc
      // dopuszczone wprost; cokolwiek innego niż 200/404 znaczy, że
      // mierzę nie to, co myślę.
      expect([200, 404], `${adres} → status pomiaru`).toContain(
        odpowiedz.status(),
      );

      for (const nazwa of NAZWY_NAGLOWKOW) {
        if (naglowki[nazwa] === undefined) braki.push(`${adres} → ${nazwa}`);
      }
    }
  }

  // Zbiorczo, nie na pierwszym braku: lista wszystkich brakujących par
  // mówi, czy wypadł JEDEN nagłówek wszędzie (zmiana w jednym źródle),
  // czy WSZYSTKIE na jednej trasie (trasa poza zasięgiem `source`).
  // Te dwie awarie wymagają różnych napraw, a przerwanie na pierwszej
  // asercji nie odróżniłoby ich od siebie.
  expect(braki, `braki nagłówków (${braki.length})`).toEqual([]);
});

test("wartości nagłówków są JEDNĄ postacią na wszystkich trasach", async ({
  request,
}) => {
  // Rozjazd wartości między trasami znaczyłby, że nagłówki powstają
  // w więcej niż jednym miejscu — czyli dokładnie to, czemu ten krok ma
  // zapobiec. Komplet obecności tego nie wykryje: sześć nazw może być
  // wszędzie i mieć dwie różne treści.
  const postacie = new Map<string, Set<string>>(
    NAZWY_NAGLOWKOW.map((n) => [n, new Set<string>()]),
  );

  for (const jezyk of JEZYKI) {
    for (const sciezka of TRASY) {
      const naglowki = (
        await request.get(adresWJezyku(jezyk, sciezka), { maxRedirects: 0 })
      ).headers();
      for (const nazwa of NAZWY_NAGLOWKOW) {
        const wartosc = naglowki[nazwa];
        if (wartosc !== undefined) postacie.get(nazwa)!.add(wartosc);
      }
    }
  }

  for (const [nazwa, zbior] of postacie) {
    expect(zbior.size, `${nazwa}: liczba różnych postaci`).toBe(1);
  }
});

/**
 * ──────────────────────────────────────────────────────────────────────
 * WARSTWA DRUGA — TREŚĆ WIĄŻĄCA ZE ZLECENIA, LITERAŁAMI.
 *
 * Każda liczba i każdy ciąg poniżej jest MECHANIZMEM, nie defektem do
 * wyprowadzenia ze źródła: ich zmiana ma być DECYZJĄ, a nie skutkiem
 * edycji listy. Czerwień tutaj znaczy „ktoś rusza rzecz, która wymaga
 * zgody właściciela", i to jest jej całe zadanie. Dlatego te asercje
 * czerpią z ODPOWIEDZI SERWERA, a nie z importu — import dałby
 * tautologię, która ucieszyłaby oko i nie pilnowała niczego.
 */

test("CSP jest WYŁĄCZNIE w trybie Report-Only (WWW/102-W)", async ({
  request,
}) => {
  const naglowki = (
    await request.get(adresWJezyku("pl", "/"), { maxRedirects: 0 })
  ).headers();

  expect(
    naglowki["content-security-policy-report-only"],
    "polityka raportująca obecna",
  ).toBeDefined();

  // Zlecenie WWW/102-W: „CSP tylko Report-Only — bez trybu wymuszającego".
  // Przełączenie na egzekwowanie jest PROPOZYCJĄ do zgody właściciela,
  // a nie krokiem technicznym — przy 476 skryptach inline bez nonce
  // zablokowałoby dziś ładunek RSC na wszystkich trasach.
  expect(
    naglowki["content-security-policy"],
    "tryb EGZEKWOWANY wymaga osobnej zgody właściciela",
  ).toBeUndefined();
});

test("CSP nie zawiera żadnego osłabienia 'unsafe-*'", async ({ request }) => {
  const polityka = (
    await request.get(adresWJezyku("pl", "/"), { maxRedirects: 0 })
  ).headers()["content-security-policy-report-only"];

  // Dopisanie 'unsafe-inline' dałoby „zero naruszeń w konsoli" — i byłoby
  // zamianą czerwieni na ciszę (zakaz 3). Zero kupione osłabieniem miary
  // nie jest zerem, a ten strażnik istnieje po to, żeby taka zamiana nie
  // przeszła po cichu pod hasłem „naprawiłem CSP".
  expect(polityka, "brak 'unsafe-inline'").not.toContain("unsafe-inline");
  expect(polityka, "brak 'unsafe-eval'").not.toContain("unsafe-eval");
});

test("dyrektywy nazwane w zleceniu stoją w polityce DOSŁOWNIE", async ({
  request,
}) => {
  const polityka = (
    await request.get(adresWJezyku("pl", "/"), { maxRedirects: 0 })
  ).headers()["content-security-policy-report-only"];

  // Te trzy wymienia treść zlecenia WWW/102 KROK 3 wprost, więc ich
  // brzmienie jest decyzją spoza tego pliku.
  expect(polityka, "frame-ancestors 'none' (zlecenie)").toContain(
    "frame-ancestors 'none'",
  );
  expect(polityka, "default-src 'self'").toContain("default-src 'self'");
  expect(polityka, "object-src 'none'").toContain("object-src 'none'");

  // Spójność z mapą dyrektyw: każda zadeklarowana dyrektywa musi dojść
  // w nagłówku. To łapie błąd w samym sklejaniu — mapa może być poprawna,
  // a `join` zgubić element.
  for (const dyrektywa of Object.keys(DYREKTYWY_CSP)) {
    expect(polityka, `dyrektywa ${dyrektywa} w nagłówku`).toContain(
      `${dyrektywa} `,
    );
  }
});

test("HSTS bez 'preload' i bez 'includeSubDomains' — oba są decyzją właściciela", async ({
  request,
}) => {
  const hsts = (
    await request.get(adresWJezyku("pl", "/"), { maxRedirects: 0 })
  ).headers()["strict-transport-security"];

  expect(hsts, "max-age obecny").toContain("max-age=");

  // PRYMAT NIEODWRACALNEGO (ADR-018). `preload` wpisuje domenę na listę
  // wbudowaną w przeglądarki i zdjęcie jej stamtąd trwa miesiącami —
  // to zmiana nieodwracalna w sensie ADR-018, więc nie wchodzi bez zgody.
  // `includeSubDomains` wiąże WSZYSTKIE poddomeny, a inwentarza poddomen
  // ta strona repozytorium nie widzi (konfiguracja domen jest w panelu
  // Vercela) — niepewność się zgłasza, nie zasypuje.
  expect(hsts, "'preload' wymaga zgody — nieodwracalne").not.toContain(
    "preload",
  );
  expect(
    hsts,
    "'includeSubDomains' wymaga spisu poddomen",
  ).not.toContain("includeSubDomains");

  // ⚠ GRANICA POMIARU: na lokalnym stojaku po http HSTS jest BEZCZYNNY —
  // przeglądarki ignorują go na połączeniu nieszyfrowanym. Ten test
  // mierzy OBECNOŚĆ i KSZTAŁT nagłówka, nie jego SKUTEK. Skutek daje się
  // zmierzyć wyłącznie na https i tam go nie zmierzono.
});

test("komplet ma DOKŁADNIE sześć nagłówków — siódmy wymaga decyzji", () => {
  // SZÓSTKA JEST Z DECYZJI, NIE ZE ZBIORU — i dlatego jest literałem
  // (odwrotnie niż liczba tras wyżej). Zlecenie WWW/102 KROK 3 wymienia
  // pięć nagłówków po nazwie plus CSP: HSTS, X-Frame-Options,
  // Referrer-Policy, Permissions-Policy, X-Content-Type-Options,
  // Content-Security-Policy-Report-Only. Dopisanie siódmego albo
  // usunięcie jednego z sześciu ma zapalić czerwień, bo zmienia zakres
  // zlecenia — a nie przejść jako „aktualizacja listy".
  expect(NAGLOWKI_BEZPIECZENSTWA.length, "sześć nagłówków (WWW/102 KROK 3)").toBe(
    6,
  );
  expect([...NAZWY_NAGLOWKOW].sort()).toEqual(
    [
      "content-security-policy-report-only",
      "permissions-policy",
      "referrer-policy",
      "strict-transport-security",
      "x-content-type-options",
      "x-frame-options",
    ].sort(),
  );
});
