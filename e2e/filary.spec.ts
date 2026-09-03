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

    // Struktura nagłówków treści po złożeniu Etapu F: 1×h1 (hero)
    // + 10×h2 w main (S3 problem + S4 definicja + 4 filary + S9
    // sr-only + S10 rytm + S11 sr-only + S12 sr-only; S13 zamknięcie
    // bez h2 — decyzja panelu); nagłówki sekcji stopki poza main.
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main h2")).toHaveCount(10);

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

    // S9: treść widoczna, H2 sr-only obecny dla czytników,
    // ale wizualnie ukryty (ramka ≤ 2 px — clip-path, nie display:none).
    await expect(
      page.getByText(komunikaty.DbanieOSiebie.tresc, { exact: true }),
    ).toBeVisible();
    const h2Ukryty = page.getByRole("heading", {
      name: komunikaty.DbanieOSiebie.naglowek,
      exact: true,
    });
    await expect(h2Ukryty).toHaveCount(1);
    const ramka = await h2Ukryty.boundingBox();
    expect(ramka, "sr-only H2 ma ramkę (nie display:none)").not.toBeNull();
    expect(ramka!.width, "sr-only H2 wizualnie ukryty").toBeLessThanOrEqual(2);
  });
}

test("K4: zebra L-P-L-P przez order na WSZYSTKICH filarach; DOM zawsze tekst przed obrazem", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  // Pełny wzór zebry (adwersarz Etapu D, ustalenie 1 — pilnowanie
  // samego filaru 2 przepuszczało mutację L-L-P-L): desktop
  // filary 1/3 obraz po prawej (order 0), 2/4 po lewej (order 1);
  // 390 px — order nieaktywny wszędzie, bez siatki.
  const WZOR_ZEBRY = [
    { klucz: "filar1", orderObrazu: "0" },
    { klucz: "filar2", orderObrazu: "1" },
    { klucz: "filar3", orderObrazu: "0" },
    { klucz: "filar4", orderObrazu: "1" },
  ] as const;

  for (const { klucz, orderObrazu } of WZOR_ZEBRY) {
    const sekcja = page.locator("section", {
      has: page.getByRole("heading", {
        name: pl.Filary[klucz].naglowek,
        exact: true,
      }),
    });
    // Obraz (ramka aria-hidden) to ostatnie dziecko układu — w DOM
    // ZAWSZE po tekście (czytniki i 390 px czytają tekst najpierw).
    const uklad = sekcja.locator("div > div").first();
    const obraz = uklad.locator("> div").last();
    const zmierzonyOrder = await obraz.evaluate(
      (el) => getComputedStyle(el).order,
    );
    const displayUkladu = await uklad.evaluate(
      (el) => getComputedStyle(el).display,
    );

    if (testInfo.project.name === "mobile-390") {
      expect(displayUkladu, `390 px (${klucz}): bez siatki`).toBe("block");
      expect(zmierzonyOrder, `390 px (${klucz}): order nieaktywny`).toBe("0");
    } else {
      expect(displayUkladu, `desktop (${klucz}): siatka dwukolumnowa`).toBe(
        "grid",
      );
      expect(zmierzonyOrder, `desktop (${klucz}): zebra L-P-L-P`).toBe(
        orderObrazu,
      );
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
    expect(html, "treść S9 w HTML bez JS").toContain(
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
