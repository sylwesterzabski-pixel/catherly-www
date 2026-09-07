import { readFileSync } from "node:fs";
import { join } from "node:path";

import { test, expect } from "@playwright/test";



import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";

/**
 * K4 filary (S5–S8) + S9 Dbanie o siebie (handoff-k4-filary.md,
 * po panelu 2026-08-11, DECYZJE 9/10): parytet treści z messages,
 * struktura nagłówków (1×h1 + 4×h2 widoczne + 1×h2 sr-only),
 * zebra przez order (tylko ≥48rem; DOM zawsze tekst przed obrazem),
 * marker konkretów w roli akcentu (empirycznie — axe nie testuje
 * ::marker), strażnik „znak w znak" messages ↔ content, no-JS.
 */
const PRZYPADKI = [
  { adres: "/", jezyk: "pl", komunikaty: pl },
  { adres: "/en", jezyk: "en", komunikaty: en },
  { adres: "/de", jezyk: "de", komunikaty: de },
] as const;

/* ⚠ TRZY FILARY NA GŁÓWNEJ, NIE CZTERY (ADR-067, WWW/094 krok 1) —
   i jest to DECYZJA WŁAŚCICIELA (WWW/091), nie zawężenie strażnika.

   Filar „Wyniki" zszedł z głównej: jego nagłówek i zdanie niesie odtąd
   BLOK „WZROST", a pełna sekcja stoi na `/funkcje/wyniki`. Gdyby zostały
   oba, strona miałaby dwa identyczne `h2` — bo blok wzrostu używa
   dokładnie `Filary.filar4.naglowek`.

   ⚠ TA LISTA JEST MECHANIZMEM: koduje, ile filarów stoi na głównej.
   Wyprowadzenie jej ze zbioru kluczy (`Object.keys(Filary)`) zdjęłoby
   właśnie tę własność — czwarty filar wróciłby na główną bez decyzji
   i bez czerwieni. Zostaje wypisana. */
/* ⚠ CZTERY FILARY NA GŁÓWNEJ — DECYZJA WŁAŚCICIELA (ADR-069,
   WWW/096 v4 pkt 1, werdykt z piętnastu zrzutów). Historia tej listy
   jest jej własnym ostrzeżeniem i dlatego zostaje wypisana w całości:
   · do WWW/094 — cztery,
   · WWW/094 — trzy, bo filar „Wyniki" oddał swój nagłówek blokowi
     „wzrost" i strona miałaby dwa identyczne `h2`,
   · WWW/096 v4 — znowu cztery, a kolizja nagłówków rozwiązana od
     drugiej strony: blok „wzrost" bierze `FunkcjeWyniki.mod2_nazwa`.
   Dwie zmiany w dwie doby, w przeciwnych kierunkach — i obie były
   decyzją, nie dryfem. Właśnie dlatego ta lista jest WYPISANA.

   ⚠ NIE WYPROWADZAĆ JEJ Z `Object.keys(Filary)`: czerpana ze zbioru
   przepuściłaby piąty filar na główną bez ani jednej czerwieni, a to
   jest rzecz, o której rozstrzyga właściciel. */
const KLUCZE_FILAROW = ["filar1", "filar2", "filar3", "filar4"] as const;

// BARWA CZERPANA ZE ŹRÓDŁA, NIE PRZEPISANA (WWW/056 pkt 2, ADR-043).
// Literał `rgb(...)` przepisany z ręki starzeje się przy każdej zmianie
// palety — a poprawiało się go wtedy PRZEPISANIEM NOWEJ LICZBY, czyli
// odtworzeniem tej samej konstrukcji. `rolaRgb` czyta `design/tokens.json`.
//
// CO TA ASERCJA PILNUJE PO ZMIANIE — bo to nie jest to samo:
//   · przedtem: „element ma barwę X",
//   · teraz:    „element nosi rolę R zadeklarowaną w tokenach".
// PRZEPIĘCIE elementu na inną rolę nadal daje czerwień (dowiedzione
// mutacją). Zmiana WARTOŚCI roli — już nie, i tak ma być: tamta idzie
// przez ADR i pilnuje jej strażnik tokenów.
// Marker filaru nosi rolę `akcent`. Rodowód wartości: terakota-500
// (Etap A) → mosiądz kancelarii (ADR-031) → złoto jasne w inwersji
// (natura, ADR-032) → limonka wzorca (ADR-038). Warstwy inwersji nie ma
// od ADR-038, więc akcent nie jest już nigdzie przemapowywany.

for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
  test(`filary (${jezyk}): treść z messages i struktura nagłówków na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    /* STRUKTURA NAGŁÓWKÓW TREŚCI: 1×h1 (hero) + 9×h2 w main —
       definicja („pamięć") + CZTERY filary + rytm dnia + blok „wzrost"
       + cennik w skrócie + zamknięcie. Nagłówki stopki są poza `main`.

       ⚠ 11 → 9 (ADR-069, WWW/096 v4) i to jest przeliczenie SKŁADU,
       nie poprawka liczby. Ubyły trzy nagłówki: „problem" (sekcja
       przeniesiona na `/dla-kogo`), „dbanie o siebie" (sekcja zdjęta)
       i „sześć obaw" (sekcja przeniesiona na `/cennik`). Doszedł jeden:
       czwarty filar wrócił. 11 − 3 + 1 = 9.

       ⚠ POPRZEDNIE BRZMIENIE ZOSTAWIAM JAKO ŚLAD, bo niosło ostrzeżenie,
       które nadal obowiązuje: „LICZBA NIE DRGNĘŁA, A SKŁAD SIĘ ZMIENIŁ
       (WWW/094): ubył czwarty filar, doszedł blok «wzrost». Zapisuję to,
       bo zielona liczba przy zmienionym składzie wygląda jak brak zmiany
       — a tym, co naprawdę pilnuje kolejności, jest zlozenie.spec.ts."
       Tym razem liczba drgnęła, ale ostrzeżenie zostaje w mocy.

       ⚠ RZĄD TRZECH KART GRAFITOWYCH NIE DOKŁADA NAGŁÓWKA — niesie
       `aria-label`, a tytuły kart są akapitami. Gdyby dostał `h2`,
       ta liczba zapali i słusznie: to byłaby zmiana zarysu dokumentu.

       ⚠ TA LICZBA JEST MECHANIZMEM, NIE DRYFEM: koduje SKŁAD strony,
       więc jej zmiana ma być decyzją i ma zapalać czerwień, gdy ktoś
       doda albo zdejmie sekcję bez rozstrzygnięcia. Nie wyprowadzać
       jej ze zbioru — czerpana z DOM-u zgadzałaby się zawsze. */
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main h2")).toHaveCount(9);

    for (const klucz of KLUCZE_FILAROW) {
      const filar = komunikaty.Filary[klucz];
      const sekcja = page.locator("section", {
        has: page.getByRole("heading", { name: filar.naglowek, exact: true }),
      });
      await expect(sekcja.getByRole("heading", { level: 2 })).toHaveText(
        filar.naglowek,
      );
      await expect(sekcja.getByText(filar.korzysc, { exact: true })).toBeVisible();
      // Dokładnie 3 konkrety w liście (semantyka natywna ul —
      // list-style ≠ none, bez potrzeby role="list").
      const lista = sekcja.getByRole("list");
      await expect(lista.getByRole("listitem")).toHaveCount(3);
      for (const konkret of [filar.konkret1, filar.konkret2, filar.konkret3]) {
        await expect(lista.getByText(konkret, { exact: true })).toBeVisible();
      }
    }

    /* ⚠ SEKCJA S9 „DBANIE O SIEBIE" ZDJĘTA Z GŁÓWNEJ (ADR-069,
       WWW/096 v4 pkt 1). Stała tu jej asercja: treść widoczna, `h2`
       sr-only obecny dla czytników i wizualnie ukryty (ramka ≤ 2 px,
       czyli clip-path, nie display:none). Komponent `DbanieOSiebie`
       NIE ZOSTAŁ skasowany — zszedł ze składu strony.

       ⚠ NIE MA DOKĄD PRZENIEŚĆ TEGO STRAŻNIKA, bo sekcja nie ma dziś
       drugiego miejsca — i to jest realny UBYTEK POKRYCIA, który
       zgłaszam zamiast zasypać: własność „sr-only h2 jest w drzewie
       dostępności, ale ma ramkę ≤ 2 px" nie jest dziś sprawdzana
       nigdzie. Pozycja rejestru T77.

       ⚠ ASERCJA NEGATYWNA ZOSTAJE — jedyna rzecz, jaką da się tu
       uczciwie sprawdzić: że sekcja naprawdę zeszła i nie wróciła. */
    await expect(
      page.getByText(komunikaty.DbanieOSiebie.tresc, { exact: true }),
      "sekcja dbanie o siebie zeszła z głównej",
    ).toHaveCount(0);
  });
}

test("K4: tekst po LEWEJ na wszystkich filarach; DOM zawsze tekst przed obrazem", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  /* ⚠ TEN STRAŻNIK PILNOWAŁ ZEBRY L-P-L-P I PILNUJE TERAZ JEJ BRAKU —
     przedmiot się zmienił, bo zmienił się POMIAR, nie dlatego, że test
     przeszkadzał. Pomiar celowany wzorca (ADR-055) pokazał, że wszystkie
     CZTERY jego bloki feature mają tekst po lewej, na każdym kadrze;
     zebra była naszym przyzwyczajeniem z wzorca `WWW/050-FINAL`.

     ⚠ LUSTRO WRÓCIŁO 2026-09-07 (ADR-071, WWW/098 v2 pkt 4b) — DECYZJĄ
     WŁAŚCICIELA, nie pomiarem. Nie unieważnia to pomiaru z ADR-055:
     tamten wzorzec naprawdę nie miał zebry i nadal jej nie ma. Zmienił
     się mandat, nie fakt. Asercja idzie za mandatem: filary 1 i 3 mają
     tekst po LEWEJ, filary 2 i 4 — po PRAWEJ; wzór jest WYPISANY, bo
     jego zmiana ma być decyzją, nie skutkiem dołożenia piątego filaru.

     Poprzednia asercja czytała `order` obrazu i wymagała wzoru 0-1-0-1.
     Nowa NIE czyta `order` — czyta POŁOŻENIE, czyli rzecz, o którą
     naprawdę chodzi. Jest przez to MOCNIEJSZA: łapie każdy sposób
     odwrócenia kolumn (order, direction, kolejność w znaczniku,
     `grid-column`), a nie jeden wybrany mechanizm.

     ⚠ KOMUNIKAT NIESIE NAZWĘ PROJEKTU, NIE SŁOWO „desktop". Od dołożenia
     kadru szerokiego (ADR-056) projekty desktopowe są DWA, a etykieta
     wpisana na sztywno meldowałaby „desktop" przy upadku na 1440 —
     czyli kierowałaby szukającego na zły kadr. Zauważone przy pierwszym
     przebiegu mutacyjnym w nowym projekcie.

     ⚠ CO ZOSTAJE BEZ ZMIAN: kolejność w DOM. Tekst ma stać przed obrazem
     w toku dokumentu — to jest własność czytana przez czytniki ekranu
     i przez kadr wąski, niezależna od tego, którą stroną leży kolumna. */
  const KLUCZE = KLUCZE_FILAROW;
  /* Wzór lustra: `false` = tekst po lewej, `true` = tekst po PRAWEJ.
     Wypisany, nie liczony z parzystości indeksu — parzystość zgadzałaby
     się sama także po dołożeniu filaru, a wtedy nikt by nie zauważył,
     że nowy wpadł w lustro bez rozstrzygnięcia. */
  const LUSTRO: Record<string, boolean> = {
    filar1: false,
    filar2: true,
    filar3: false,
    filar4: true,
  };

  for (const klucz of KLUCZE) {
    const sekcja = page.locator("section", {
      has: page.getByRole("heading", {
        name: pl.Filary[klucz].naglowek,
        exact: true,
      }),
    });
    const uklad = sekcja.locator("div > div").first();
    const tekst = uklad.locator("> div").first();
    const obraz = uklad.locator("> div").last();

    const displayUkladu = await uklad.evaluate((el) => getComputedStyle(el).display);
    const rt = await tekst.boundingBox();
    const ro = await obraz.boundingBox();
    expect(rt, `${klucz}: kolumna tekstu ma ramkę`).not.toBeNull();

    /* ⚠ SLOT MOŻE BYĆ ZWINIĘTY — i to jest STAN ZAMIERZONY (ADR-059).
       Dopóki nie ma fotografii, pusta ramka schodzi z układu (`:empty`),
       więc nie ma prostokąta do zmierzenia. Test nie może wtedy pytać
       o jej położenie; pyta o rzecz, która ma wtedy obowiązywać:
       czy kolumna tekstu zajmuje PEŁNĄ miarę wnętrza. Zwinięcie slotu,
       które zostawia tekst na jednej trzeciej, jest defektem — i tę
       właśnie różnicę ta gałąź mierzy. */
    if (ro === null) {
      const pelnaMiara = await uklad.evaluate((el) => {
        const dz = [...el.children].find((c) => (c as HTMLElement).offsetParent !== null);
        if (!dz) return null;
        return { tekst: Math.round(dz.getBoundingClientRect().width),
          uklad: Math.round(el.getBoundingClientRect().width) };
      });
      expect(pelnaMiara, `${klucz}: przy zwiniętym slocie widać kolumnę tekstu`).not.toBeNull();
      expect(
        pelnaMiara!.tekst,
        `${klucz}: slot zwinięty → tekst na PEŁNEJ mierze (${pelnaMiara!.tekst} z ${pelnaMiara!.uklad})`,
      ).toBeGreaterThanOrEqual(pelnaMiara!.uklad - 1);
      continue;
    }

    /* DOM: tekst przed obrazem — na obu kadrach, bez wyjątku. */
    const tekstPierwszyWDom = await uklad.evaluate((el) => {
      const dz = [...el.children];
      return dz.length >= 2 && dz[0].textContent!.trim().length > dz[dz.length - 1].textContent!.trim().length;
    });
    expect(tekstPierwszyWDom, `${klucz}: w DOM tekst przed obrazem`).toBe(true);

    if (testInfo.project.name === "mobile-390") {
      expect(displayUkladu, `${testInfo.project.name} (${klucz}): bez siatki`).toBe("block");
      /* Na wąskim kadrze kolumny stoją JEDNA POD DRUGĄ, tekst wyżej. */
      expect(rt!.y, `${testInfo.project.name} (${klucz}): tekst nad obrazem`).toBeLessThan(ro!.y);
    } else {
      expect(displayUkladu, `${testInfo.project.name} (${klucz}): siatka`).toBe("grid");
      /* ⚠ POŁOŻENIE, NIE `order` — asercja czyta rzecz, o którą chodzi,
         więc łapie każdy sposób odwrócenia kolumn (order, direction,
         kolejność w znaczniku, `grid-column`), a nie jeden mechanizm. */
      if (LUSTRO[klucz]) {
        expect(
          rt!.x,
          `${testInfo.project.name} (${klucz}): tekst po PRAWEJ (lustro)`,
        ).toBeGreaterThan(ro!.x);
      } else {
        expect(
          rt!.x,
          `${testInfo.project.name} (${klucz}): tekst po LEWEJ`,
        ).toBeLessThan(ro!.x);
      }
    }
  }
});

test("K4: marker konkretów w roli akcentu (decyzja panelu a)", async ({
  page,
}) => {
  await page.goto("/");
  /* LOKATOR ZAWĘŻONY DO SEKCJI FILARU (2.3, ADR-047). Stało tu
     `page.getByRole("listitem")` — wyszukiwanie po CAŁEJ stronie. Od
     chwili, w której blok sześciu kart funkcji zaczął cytować to samo
     zatwierdzone zdanie, filtr trafiał w DWA elementy i Playwright
     przerywał na trybie ścisłym.

     To nie jest usterka kart ani filarów: obie listy niosą ten sam
     ciąg, bo taka była decyzja o zerze nowej treści. Przedmiotem tej
     asercji jest MARKER LISTY FILARU, więc lokator ma wskazywać filar.
     Piąty przypadek klasy „strażnik zerodowany przez zmianę otoczenia"
     w tym zleceniu — i pierwszy, w którym zderzenie robi nie nowy
     ELEMENT, tylko powtórzony TEKST. */
  const pierwszyKonkret = page
    .locator('section[aria-labelledby="filar-1-h2"]')
    .getByRole("listitem")
    .filter({ hasText: pl.Filary.filar1.konkret1 });
  const { kolorMarkera, rolaWSekcji } = await pierwszyKonkret.evaluate((el) => ({
    kolorMarkera: getComputedStyle(el, "::marker").color,
    /* ⚠ ROLA CZYTANA Z TEJ SEKCJI, NIE Z PLIKU TOKENÓW (ADR-050).
       Do 2026-09-03 asercja porównywała marker z GLOBALNĄ wartością
       `--kolor-rola-akcent`, bo wszystkie sekcje były ciemne i globalna
       była jedyną. Od wprowadzenia stref tonalnych filar leży w strefie
       jasnej, gdzie ta sama rola rozwiązuje się na `akcent-na-jasnym`
       (limonka ma na jasnym 1,43:1 i nie może nieść tekstu).

       To NIE JEST złagodzenie: przedmiot asercji zostaje ten sam —
       „marker jest w roli akcentu" — a zmienia się miejsce odczytu roli
       ze ŹRÓDŁA GLOBALNEGO na ŹRÓDŁO OBOWIĄZUJĄCE W TYM MIEJSCU.
       Po zmianie asercja jest MOCNIEJSZA: łapie też sytuację, w której
       strefa przestawi rolę, a marker zostanie przy dawnej barwie —
       czego wersja z globalną wartością nie widziała. */
    rolaWSekcji: getComputedStyle(
      el.closest("[data-ton]") ?? document.documentElement,
    )
      .getPropertyValue("--kolor-rola-akcent")
      .trim(),
  }));

  /* Kontrola, że rola w sekcji w ogóle się rozwiązała — pusty ciąg
     przepuściłby wszystko. */
  expect(rolaWSekcji, "rola akcentu rozwiązana w sekcji filaru").not.toBe("");
  expect(kolorMarkera, "::marker w --kolor-rola-akcent (rola z tej sekcji)").toBe(
    await pierwszyKonkret.evaluate(
      (el, wartosc) => {
        /* Zamiana zapisu roli na `rgb(...)` tym samym silnikiem, który
           liczy `::marker` — inaczej porównywalibyśmy „#4f6f06" z
           „rgb(79, 111, 6)" i test padałby na ZAPISIE, nie na barwie. */
        const sonda = document.createElement("span");
        sonda.style.color = wartosc;
        document.body.appendChild(sonda);
        const rgb = getComputedStyle(sonda).color;
        sonda.remove();
        return rgb;
      },
      rolaWSekcji,
    ),
  );
});

for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
  test(`filary bez JS (${jezyk}): treść w surowym HTML`, async ({
    request,
  }) => {
    const odpowiedz = await request.get(adres);
    expect(odpowiedz.status()).toBe(200);
    const html = await odpowiedz.text();
    expect(html, "H2 filaru 1 w HTML bez JS").toContain(
      komunikaty.Filary.filar1.naglowek,
    );
    expect(html, "konkret filaru 4 w HTML bez JS").toContain(
      komunikaty.Filary.filar4.konkret3,
    );
    /* ⚠ TREŚCI S9 W TYM HTML JUŻ NIE MA — sekcja zeszła ze składu
       (ADR-069). Zamiast asercji pozytywnej stoi negatywna, żeby
       powrót sekcji bez decyzji dał czerwień. */
    expect(html, "treść S9 nie stoi już w HTML głównej").not.toContain(
      komunikaty.DbanieOSiebie.tresc,
    );
  });
}

// Strażnik „znak w znak": messages ↔ content/*/filary.md (treść
// OBOWIĄZUJE; wzorzec hero.spec — adwersarz Etapu C, ustalenie 1).
// Normalizowane wyłącznie białe znaki (md zawija wiersze).
test("treść filarów i S9: messages znak w znak z content/*/filary.md", () => {
  for (const { jezyk, komunikaty } of PRZYPADKI) {
    const zrodlo = readFileSync(
      join(__dirname, "..", "content", jezyk, "filary.md"),
      "utf8",
    ).replace(/\s+/g, " ");
    for (const klucz of KLUCZE_FILAROW) {
      for (const [pole, tresc] of Object.entries(komunikaty.Filary[klucz])) {
        expect(
          zrodlo,
          `content/${jezyk}/filary.md zawiera ${klucz}.${pole}`,
        ).toContain(tresc);
      }
    }
    for (const [pole, tresc] of Object.entries(komunikaty.DbanieOSiebie)) {
      expect(
        zrodlo,
        `content/${jezyk}/filary.md zawiera DbanieOSiebie.${pole}`,
      ).toContain(tresc);
    }
  }
});
