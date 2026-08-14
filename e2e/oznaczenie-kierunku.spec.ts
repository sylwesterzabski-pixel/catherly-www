import { test, expect } from "@playwright/test";

import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";

/**
 * OZNACZENIE POZYCJI KIERUNKU — strażnicy S-NAZWY i S-SYMETRIA
 * (panel projektu 2026-08-14, forma L1-A; rozstrzygnięcie właściciela
 * tego samego dnia: struktura TAK, odpowiednik na podstronach TAK
 * wymuszony S-SYMETRIA, S-NAZWY do przeszczepu).
 *
 * NAZWY: panel i rozstrzygnięcie właściciela mówiły „S3" i „S4".
 * Te dwie nazwy są w tym repozytorium ZAJĘTE i znaczą co innego —
 * „sekcja N układu strony" (brief-etap-d-indeks-i-dla-kogo.md:70-91,
 * src/app/[locale]/page.tsx:19-20, dla-kogo/page.tsx:125,
 * SciezkaRozpoznania.tsx:46). Strażnik nazwany S4 czytałoby się
 * w tym kodzie jako sekcję, nie jako test, dlatego przemianowane na
 * S-NAZWY (dawne S3) i S-SYMETRIA (dawne S4). Mapowanie odnotowane
 * w handoffie — nazwa zmieniona, zakres ani jedno, ani drugie.
 *
 * DLACZEGO OSOBNY PLIK, a nie dopisek do funkcje-indeks.spec.ts:
 * przedmiotem obu strażników jest relacja MIĘDZY pięcioma stronami
 * (indeks + cztery podstrony filarowe), a nie zawartość którejkolwiek
 * z nich. Strażnik trzymany przy jednej stronie zzielenieje, gdy druga
 * strona rozjedzie się bez niej.
 *
 * DLACZEGO W OGÓLE: dwie pozycje list na /funkcje niosą tę samą
 * etykietę — „asystent AI" ×2 (pl), „AI assistant" ×2 (en),
 * „KI-Assistent" ×2 (de) — i celują w różne strony. Pozostałe 31 nazw
 * jest unikalnych. Lista linków czytnika ekranu i rotor VoiceOver
 * pokazują oraz SORTUJĄ po nazwie, więc dwie pozycje o tej samej
 * nazwie są tam nie do rozróżnienia. Oznaczenie niesie nazwę obszaru,
 * bo obszar jest jedynym różnicownikiem: identyczny sufiks na obu
 * pozycjach zostawiłby dokładnie ten sam problem.
 *
 * CZEGO NIE PILNUJE AXE, i dlatego te testy istnieją: e2e/axe.spec.ts
 * woła `new AxeBuilder({ page }).analyze()` bez withTags/withRules,
 * a reguła `identical-links-same-purpose` jest w axe-core 4.12.1
 * DOMYŚLNIE WYŁĄCZONA (`enabled: false`; sprawdzone u źródła
 * 2026-08-14). Zieleń bramki dostępności nie jest więc dowodem na
 * unikalność nazw i nigdy nim nie była.
 */

const PRZYPADKI = [
  { adres: "/funkcje", jezyk: "pl", prefiks: "", komunikaty: pl },
  { adres: "/en/funkcje", jezyk: "en", prefiks: "/en", komunikaty: en },
  { adres: "/de/funkcje", jezyk: "de", prefiks: "/de", komunikaty: de },
] as const;

/**
 * LUSTRO tablicy BLOKI z src/app/[locale]/funkcje/page.tsx — przepisane,
 * nie zaimportowane (ta sama zasada, co w funkcje-indeks.spec.ts).
 *
 * Ta tablica opisuje JEDNOCZEŚNIE dwie rzeczy, i to nie jest przypadek:
 * kolejność pozycji indeksu JEST kolejnością sekcji podstrony docelowej
 * (rozstrzygnięcie 1 panelu Etapu D — dlatego lista jest <ol>). Dzięki
 * temu ta sama tablica służy do sprawdzenia obu stron relacji, a test
 * (a) jawnie weryfikuje to założenie na sekwencji identyfikatorów h2 —
 * gdyby przestało obowiązywać, S-SYMETRIA ma paść głośno, a nie po cichu
 * przestać cokolwiek mierzyć.
 */
const BLOKI = [
  {
    klucz: "blok1",
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
      {
        klucz: "aiNaglowek",
        kotwica: "asystent-ai",
        oznaczenie: "blok1Oznaczenie",
      },
    ],
  },
  {
    klucz: "blok2",
    sciezka: "/funkcje/tresci",
    przestrzen: "FunkcjeTresci",
    pozycje: [
      // Studio: na podstronie ma FORMĘ karty kierunku (wyjątek F4-2,
      // D-C5 — brak zrzutu do przebudowy), ale status obietnicy DZIAŁA
      // (K-D5). Dlatego BEZ oznaczenia po obu stronach. Dopisanie go
      // tutaj albo w tresci/page.tsx:84 czerwieni S-SYMETRIA.
      { klucz: "mod1_nazwa", kotwica: "studio" },
      { klucz: "mod2_nazwa", kotwica: "szablony" },
      { klucz: "mod3_nazwa", kotwica: "hashtagi" },
      { klucz: "mod4_nazwa", kotwica: "kalendarz-publikacji" },
      { klucz: "mod5_nazwa", kotwica: "zatwierdzanie" },
      { klucz: "mod6_nazwa", kotwica: "tarcza" },
      { klucz: "mod7_nazwa", kotwica: "pieczec-etyczna" },
      { klucz: "mod8_nazwa", kotwica: "uczenie-glosu" },
      { klucz: "mod9_nazwa", kotwica: "tablica-postow" },
      {
        klucz: "aiNaglowek",
        kotwica: "asystent-ai",
        oznaczenie: "blok2Oznaczenie",
      },
    ],
  },
  {
    klucz: "blok3",
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

const LICZBA_POZYCJI = BLOKI.reduce((n, b) => n + b.pozycje.length, 0);

/**
 * KOMPLET celów, które MAJĄ być oznaczone — wyprowadzony z lustra,
 * nie wpisany ręcznie.
 *
 * Ta stała istnieje z jednego, konkretnego powodu: sama symetria dwóch
 * zbiorów jest zielona także wtedy, gdy oznaczenie zniknie z OBU stron
 * naraz (zbiór pusty = zbiór pusty). To najbardziej prawdopodobny
 * sposób, w jaki ta decyzja mogłaby kiedyś po cichu wyparować —
 * i dlatego oba zbiory porównujemy z konkretem, a nie ze sobą.
 */
const OCZEKIWANE_OZNACZONE = BLOKI.flatMap((blok) =>
  blok.pozycje
    .filter((pozycja) => "oznaczenie" in pozycja)
    .map((pozycja) => `${blok.sciezka}#${pozycja.kotwica}`),
);

// ───────────────────────────────────────────────────────────────────
// S-NAZWY — UNIKALNOŚĆ NAZW DOSTĘPNYCH
// ───────────────────────────────────────────────────────────────────

for (const { adres, jezyk } of PRZYPADKI) {
  test(`S-NAZWY (${jezyk}): ${LICZBA_POZYCJI} nazw dostępnych w listach indeksu jest unikalnych na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    // ZAKRES ŚWIADOMIE ZAWĘŻONY do czterech list w <main>. W nawigacji
    // i stopce duplikaty nazw istnieją legalnie (np. „Funkcje" w menu
    // i w mapie strony), więc asercja na całej stronie byłaby czerwona
    // od pierwszego dnia — a wtedy pierwszym odruchem byłoby jej
    // OSŁABIENIE. Zawężamy zakres RAZ, świadomie i z uzasadnieniem.
    const listy = page.locator('main ol[role="list"]');
    await expect(listy).toHaveCount(BLOKI.length);

    const linki = listy.locator("> li > a");
    await expect(linki).toHaveCount(LICZBA_POZYCJI);

    // Żaden link tych list nie nadpisuje swojej nazwy. To jedyny
    // warunek, przy którym tekst widoczny JEST nazwą dostępną — a bez
    // tego równania S-NAZWY mierzyłby co innego, niż deklaruje. Zamyka też
    // furtkę na wariant z członem ukrytym: gdyby ktoś w przyszłości
    // przeniósł różnicownik do warstwy niewidocznej, ten test padnie
    // i wymusi rozmowę, zamiast zzielenieć na cichej regresji.
    await expect(
      listy.locator("> li > a[aria-label], > li > a[aria-labelledby]"),
    ).toHaveCount(0);

    const nazwy = (await linki.allTextContents()).map((t) =>
      t.replace(/\s+/g, " ").trim(),
    );
    expect(nazwy, "komplet nazw zebrany").toHaveLength(LICZBA_POZYCJI);
    expect(
      nazwy.filter((n) => n === ""),
      "żadna nazwa nie jest pusta",
    ).toEqual([]);

    // (1) Zbiór nazw jest tak liczny jak lista — czyli bez powtórzeń.
    // Komunikat wypisuje SAME duplikaty, bo przy 33 pozycjach różnica
    // liczb („32 ≠ 33") nie mówi, gdzie szukać.
    const powtorzone = nazwy.filter((n, i) => nazwy.indexOf(n) !== i);
    expect(powtorzone, "nazwy powtórzone w listach indeksu").toEqual([]);
    expect(new Set(nazwy).size, "nazwy unikalne").toBe(LICZBA_POZYCJI);

    // (2) Każda nazwa trafia w DOKŁADNIE JEDEN link — tym razem przez
    // wyliczanie nazwy dostępnej Playwrighta, nie przez textContent.
    // Punkt (1) i punkt (2) mierzą to samo dwiema różnymi drogami:
    // (1) padnie na duplikacie tekstu, (2) padnie także wtedy, gdy
    // tekst i nazwa dostępna się rozjadą.
    for (const nazwa of nazwy) {
      await expect(
        listy.getByRole("link", { name: nazwa, exact: true }),
        `nazwa „${nazwa}" wskazuje dokładnie jeden link`,
      ).toHaveCount(1);
    }
  });
}

// ───────────────────────────────────────────────────────────────────
// S-SYMETRIA — SYMETRIA INDEKS ⇔ PODSTRONA
// ───────────────────────────────────────────────────────────────────

/**
 * Warunek panelu Etapu D brzmiał: „decyzja obowiązuje na pięciu
 * stronach naraz". Dwa osobne testy — jeden na indeksie, drugi na
 * podstronie — tego nie dają: obie strony mogą być zielone osobno
 * i rozjechane razem. Dlatego jeden test zbiera oznaczone cele z OBU
 * źródeł i porównuje zbiory.
 *
 * Powód rzeczowy, nie estetyczny: `#asystent-ai` jest kontraktem
 * publicznym (slug wspólny ×3 języki, pilnowany bramką kotwic), więc
 * wejście bezpośrednie fragmentem OMIJA indeks. Gdyby oznaczenie
 * istniało wyłącznie na indeksie, czytelniczka wchodząca z zewnątrz
 * dostałaby sekcję, która swojego statusu nie nazywa.
 *
 * Wykrywanie po obu stronach jest MECHANICZNE i nie zna nazw sekcji:
 * tekst albo jest równy samej nazwie (pozycja nieoznaczona), albo musi
 * być równy „nazwa + spacja + oznaczenie Z i18n" (pozycja oznaczona).
 * Trzeciej możliwości test nie dopuszcza — dopisany na sztywno sufiks
 * czerwieni się tak samo jak brak oznaczenia.
 */
for (const { adres, jezyk, prefiks, komunikaty } of PRZYPADKI) {
  const kIndeks = komunikaty.FunkcjeIndeks as Record<string, string>;

  test(`S-SYMETRIA (${jezyk}): oznaczenie niosą DOKŁADNIE te pozycje, które celują w oznaczone sekcje podstron`, async ({
    page,
  }) => {
    // (a) STRONA PODSTRONY — które sekcje niosą oznaczenie.
    const zPodstron: string[] = [];

    for (const blok of BLOKI) {
      const przestrzen = komunikaty[blok.przestrzen] as Record<string, string>;
      const oznaczeniePodstrony = przestrzen.aiOznaczenie;

      await page.goto(`${prefiks}${blok.sciezka}`);
      const naglowki = page.locator("main h2");
      await expect(
        naglowki,
        `${blok.sciezka}: tyle sekcji, ile pozycji na indeksie`,
      ).toHaveCount(blok.pozycje.length);

      // Założenie, na którym stoi całe porównanie: sekwencja sekcji
      // podstrony = sekwencja pozycji bloku indeksu. Sprawdzane, nie
      // przyjmowane — po identyfikatorach, bo to one są kontraktem.
      expect(
        await naglowki.evaluateAll((wezly) => wezly.map((w) => w.id)),
        `${blok.sciezka}: identyfikatory sekcji w kolejności pozycji`,
      ).toEqual(blok.pozycje.map((pozycja) => pozycja.kotwica));

      const teksty = (await naglowki.allTextContents()).map((t) =>
        t.replace(/\s+/g, " ").trim(),
      );

      for (const [indeks, pozycja] of blok.pozycje.entries()) {
        const nazwa = przestrzen[pozycja.klucz];
        const tekst = teksty[indeks];
        if (tekst === nazwa) continue;

        expect(
          oznaczeniePodstrony,
          `${blok.sciezka}#${pozycja.kotwica}: nagłówek odbiega od nazwy, więc przestrzeń ${blok.przestrzen} musi mieć klucz aiOznaczenie`,
        ).toBeTruthy();
        expect(
          tekst,
          `${blok.sciezka}#${pozycja.kotwica}: nagłówek to nazwa + oznaczenie z i18n albo sama nazwa — nic pomiędzy`,
        ).toBe(`${nazwa} ${oznaczeniePodstrony}`);
        zPodstron.push(`${blok.sciezka}#${pozycja.kotwica}`);
      }
    }

    // (b) STRONA INDEKSU — które pozycje niosą oznaczenie.
    const zIndeksu: string[] = [];

    await page.goto(adres);
    const listy = page.locator('main ol[role="list"]');
    await expect(listy).toHaveCount(BLOKI.length);

    for (const [indeksBloku, blok] of BLOKI.entries()) {
      const przestrzen = komunikaty[blok.przestrzen] as Record<string, string>;
      // Każdy blok ma WŁASNY klucz oznaczenia — nie jeden wspólny.
      // Podmiana oznaczenia bloku 1 na oznaczenie bloku 2 czerwieni się
      // tu, a nie dopiero w oczach czytelniczki.
      const oznaczenieBloku = kIndeks[`${blok.klucz}Oznaczenie`];

      const linki = listy.nth(indeksBloku).locator("> li > a");
      await expect(linki).toHaveCount(blok.pozycje.length);
      const teksty = (await linki.allTextContents()).map((t) =>
        t.replace(/\s+/g, " ").trim(),
      );

      for (const [indeks, pozycja] of blok.pozycje.entries()) {
        const nazwa = przestrzen[pozycja.klucz];
        const tekst = teksty[indeks];
        // Cel zapisujemy BEZ prefiksu językowego: kontraktem jest para
        // (ścieżka, kotwica), wspólna dla pl/en/de.
        const cel = `${blok.sciezka}#${pozycja.kotwica}`;
        await expect(
          linki.nth(indeks),
          `${cel}: pozycja celuje w swoją kotwicę`,
        ).toHaveAttribute("href", `${prefiks}${cel}`);

        if (tekst === nazwa) continue;

        expect(
          oznaczenieBloku,
          `${cel}: etykieta odbiega od nazwy, więc FunkcjeIndeks musi mieć klucz ${blok.klucz}Oznaczenie`,
        ).toBeTruthy();
        expect(
          tekst,
          `${cel}: etykieta to nazwa + oznaczenie bloku albo sama nazwa — nic pomiędzy`,
        ).toBe(`${nazwa} ${oznaczenieBloku}`);
        zIndeksu.push(cel);
      }
    }

    // (c) SYMETRIA — i to, że w ogóle jest co porównywać.
    //
    // Kolejność asercji jest celowa: najpierw każdy zbiór z osobna
    // przeciw KONKRETOWI, dopiero potem zbiory ze sobą. Odwrotna
    // kolejność zostawiałaby dziurę: zdjęcie oznaczenia z obu stron
    // naraz daje dwa zbiory puste, czyli symetrię idealną i zieleń.
    expect(
      OCZEKIWANE_OZNACZONE,
      "lustro BLOKI zna pozycje kierunku (K-D5: dwie, nie trzy — Studio ma status DZIAŁA)",
    ).toHaveLength(2);
    expect(
      [...zIndeksu].sort(),
      "oznaczone pozycje na /funkcje",
    ).toEqual([...OCZEKIWANE_OZNACZONE].sort());
    expect(
      [...zPodstron].sort(),
      "oznaczone sekcje na podstronach filarowych",
    ).toEqual([...OCZEKIWANE_OZNACZONE].sort());
    expect(
      [...zIndeksu].sort(),
      "indeks i podstrony wskazują TE SAME cele",
    ).toEqual([...zPodstron].sort());
  });
}
