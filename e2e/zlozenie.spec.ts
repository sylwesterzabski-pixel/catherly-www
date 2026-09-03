import { readFileSync } from "node:fs";
import { join } from "node:path";

import { test, expect } from "@playwright/test";



import { bezZnacznikow, sprawdzZnaczniki } from "./pomoc/tekst";
import migawka from "../content/cennik-snapshot.json";
import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";

/**
 * Etap F — złożenie stron (brief-etap-f-zlozenie.md; HF
 * docs/faza-3/hf/zlozenie-glowna.html, po panelu 2026-08-11):
 * lustro L1 (S3↔S10 — tło akcentowe, wspólny duet kropek),
 * kolejność sekcji, parytet ×3 (S3/S4/S10/S11/S12/S13 + C8),
 * ceny skrótu z NIEZALEŻNEGO rachunku z migawki (wzorzec
 * cennik.spec), strażnik znak w znak messages ↔ content, no-JS.
 */
const PRZYPADKI = [
  { adres: "/", jezyk: "pl", prefiks: "", komunikaty: pl },
  { adres: "/en", jezyk: "en", prefiks: "/en", komunikaty: en },
  { adres: "/de", jezyk: "de", prefiks: "/de", komunikaty: de },
] as const;

// Niezależny rachunek z migawki (nie z helpera src/lib/cennik.ts —
// duplikacja celowa: test i strona liczą osobno z tego samego źródła).
const WALUTA = { pl: "pln", en: "eur", de: "eur" } as const;
const LOCALE_FORMATU = { pl: "pl-PL", en: "en-IE", de: "de-DE" } as const;

function kwotaZMigawki(plan: string, waluta: string, interwal: string): number {
  const wpis = migawka.plany
    .find((p) => p.nazwa === plan)!
    .ceny.find((c) => c.waluta === waluta && c.interwal === interwal);
  if (!wpis) throw new Error(`brak ceny ${plan}/${waluta}/${interwal}`);
  return wpis.kwota_brutto;
}

function formatuj(grosze: number, jezyk: keyof typeof WALUTA): string {
  return new Intl.NumberFormat(LOCALE_FORMATU[jezyk], {
    style: "currency",
    currency: WALUTA[jezyk].toUpperCase(),
    minimumFractionDigits: grosze % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(grosze / 100);
}

// W5: kolejność deterministyczna Starter→Growth→Pro — migawka
// prowadzi plany w INNEJ kolejności (Pro/Starter/Growth).
const PLANY = ["Starter", "Growth", "Pro"] as const;

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
// Tło S10 nosi rolę `powierzchnia-akcentowa` — warunek lustra L1
// (DECYZJA 6; handoff Etapu F). Rodowód: terakota-100 → kancelaria →
// natura → wzorzec (ADR-038).
//
// ⚠ POZYCJA S10 POZOSTAJE OTWARTA. `WWW/050-FINAL` przewiduje ustalenie
// przypisania powierzchni akcentowej POMIAREM odpowiadającej sekcji
// wzorca w KROKU 2. Wartość poniżej jest dzisiejszą rolą, nie wynikiem
// tamtego pomiaru — i ma się zmienić, jeśli pomiar pokaże inną.

// LUSTRO L1 (test kluczowy): S10 na tle akcentowym; kropka S3
// („…liczysz…") i kropka S10 („…widzisz…") obecne znak w znak
// i mówią tym samym duetem --tekst-m/600 (20px computed po migracji
// skali z ADR-031; do 2026-08-26 było 1.125rem/18px).
test("LUSTRO L1: tło akcentowe S10; kropki S3/S10 wspólnym duetem", async ({
  page,
}) => {
  await page.goto("/");

  const rytm = page.locator('section[aria-labelledby="rytm-h2"]');
  /* ⚠ ROLA CZYTANA Z TEJ SEKCJI, NIE Z PLIKU TOKENÓW (ADR-051).
     Do 2026-09-03 asercja porównywała tło S10 z GLOBALNĄ wartością
     `--kolor-rola-powierzchnia-akcentowa`, bo wszystkie sekcje były
     ciemne i globalna była jedyną. Od domknięcia stref rytm dnia leży
     w strefie jasnej, gdzie ta sama rola rozwiązuje się na powierzchnię
     karty (biel) — asercja upadała na ZAPISIE, nie na wadzie.

     PRZEDMIOT ZOSTAJE TEN SAM: „S10 nosi rolę powierzchni akcentowej",
     czyli lustro L1 dalej stoi na WYRÓŻNIONEJ powierzchni, a nie na
     tle sekcji. Zmienia się miejsce odczytu roli — ze źródła globalnego
     na źródło OBOWIĄZUJĄCE W TYM MIEJSCU. Po zmianie strażnik jest
     MOCNIEJSZY: łapie też przepięcie S10 na zwykłe tło strony, czego
     wersja z wartością globalną nie widziała w strefie jasnej.

     ⚠ CZEGO TA ASERCJA NIE MIERZY, żeby zieleń nie była czytana szerzej:
     SIŁY wyróżnienia. Na ciemnym pas miał wobec tła 5,9:1, na jasnym ma
     1,12:1 — rola ta sama, wyraz słabszy. To jest zapisany UBYTEK
     (ADR-051), nie równoważna zamiana, i żaden strażnik go nie pilnuje. */
  const { tlo, rolaWSekcji } = await rytm.evaluate((el) => ({
    tlo: getComputedStyle(el).backgroundColor,
    rolaWSekcji: getComputedStyle(el)
      .getPropertyValue("--kolor-rola-powierzchnia-akcentowa")
      .trim(),
  }));
  expect(rolaWSekcji, "rola powierzchni akcentowej rozwiązana w S10").not.toBe("");
  const rolaRgbWSekcji = await rytm.evaluate((el, wartosc) => {
    const sonda = document.createElement("span");
    sonda.style.color = wartosc;
    el.appendChild(sonda);
    const rgb = getComputedStyle(sonda).color;
    sonda.remove();
    return rgb;
  }, rolaWSekcji);
  expect(tlo, "S10 nosi rolę powierzchnia-akcentowa (rola z tej sekcji)").toBe(
    rolaRgbWSekcji,
  );

  for (const [nazwa, tekst] of [
    ["S3", pl.Problem.kropka],
    ["S10", pl.RytmDnia.kropka],
  ] as const) {
    const kropka = page.getByText(tekst, { exact: true });
    await expect(kropka, `kropka ${nazwa} widoczna`).toBeVisible();
    const duet = await kropka.evaluate((el) => {
      const styl = getComputedStyle(el);
      return { waga: styl.fontWeight, rozmiar: styl.fontSize };
    });
    expect(duet.waga, `kropka ${nazwa}: font-weight duetu`).toBe("600");
    // Rozmiar duetu = --tekst-m = 1.25rem = 20 px (skala ADR-031,
    // migracja zadania 5: 1.125rem/18px -> var(--tekst-m)). Asercja
    // pilnuje nadal DOKŁADNEGO rozmiaru i tego, że obie kropki mówią
    // TYM SAMYM duetem — zmieniła się wartość skali, nie siła strażnika.
    expect(duet.rozmiar, `kropka ${nazwa}: font-size duetu`).toBe("20px");
  }
});

// Strażnik W2 panelu złożenia (adwersarz F, ISTOTNE 1: mutacja
// zdejmująca ogranicznik miara-kolumny z H2/kropki S10 przechodziła
// suitę przy Δx = 256 px): na desktopie kropki luster S3/S10 stoją
// w TEJ SAMEJ kolumnie — „ta sama siatka" z DECYZJI 6 mierzona
// geometrycznie, nie zakładana.
test("W2: kropki luster S3/S10 w tej samej kolumnie (desktop)", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "poniżej 48rem obie sekcje mają jedną kolumnę z natury",
  );
  await page.goto("/");
  const ramkaS3 = await page
    .getByText(pl.Problem.kropka, { exact: true })
    .boundingBox();
  const ramkaS10 = await page
    .getByText(pl.RytmDnia.kropka, { exact: true })
    .boundingBox();
  expect(ramkaS3, "kropka S3 ma ramkę").not.toBeNull();
  expect(ramkaS10, "kropka S10 ma ramkę").not.toBeNull();
  expect(
    Math.abs(ramkaS3!.x - ramkaS10!.x),
    "kropki luster w jednej kolumnie (Δx ≤ 1 px)",
  ).toBeLessThanOrEqual(1);
});

// Kolejność sekcji: h2 w main w porządku złożenia (S3→S12; S13 bez
// h2 — decyzja panelu). toHaveText(tablica) pilnuje liczby I porządku.
for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
  test(`kolejność sekcji (${jezyk}): h2 w main w porządku złożenia na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);
    const k = komunikaty;
    await expect(page.locator("main h2")).toHaveText([
      bezZnacznikow(k.Problem.naglowek),
      bezZnacznikow(k.Definicja.naglowek),
      k.Filary.filar1.naglowek,
      k.Filary.filar2.naglowek,
      k.Filary.filar3.naglowek,
      k.Filary.filar4.naglowek,
      k.DbanieOSiebie.naglowek,
      k.RytmDnia.naglowek,
      k.CennikSkrot.naglowek,
      k.Obawy.naglowek,
    ]);
  });
}

// Parytet ×3: S3/S4/S10/S11/S12/S13 z messages na złożonej głównej.
for (const { adres, jezyk, prefiks, komunikaty } of PRZYPADKI) {
  const k = komunikaty;

  test(`złożenie (${jezyk}): problem, definicja i rytm dnia z messages na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    // S3 — problem: H2, treść, kropka.
    const problem = page.locator('section[aria-labelledby="problem-h2"]');
    await expect(
      problem.getByRole("heading", { level: 2 }),
    ).toHaveText(bezZnacznikow(k.Problem.naglowek));
    await expect(problem.getByText(k.Problem.tresc, { exact: true })).toBeVisible();
    await expect(
      problem.getByText(k.Problem.kropka, { exact: true }),
    ).toBeVisible();

    // S4 — definicja: H2 i treść, bez kropki.
    const definicja = page.locator('section[aria-labelledby="definicja-h2"]');
    await expect(
      definicja.getByRole("heading", { level: 2 }),
    ).toHaveText(bezZnacznikow(k.Definicja.naglowek));
    await expect(
      definicja.getByText(k.Definicja.tresc, { exact: true }),
    ).toBeVisible();

    // S10 — rytm dnia: 3 kroki w liście (nazwy jako frazy, nie h3 —
    // decyzja panelu) + kotwica jako kropka.
    const rytm = page.locator('section[aria-labelledby="rytm-h2"]');
    await expect(rytm.getByRole("heading", { level: 2 })).toHaveText(
      k.RytmDnia.naglowek,
    );
    const kroki = rytm.getByRole("list");
    await expect(kroki).toHaveAttribute("role", "list");
    // TRÓJKA — źródła nie ustalono (polecenie WWW/030: „nie badaj teraz").
    // Zapisane jako nieustalone, nie jako jedno z dwojga: wpisanie tu klasy
    // na oko byłoby zgadywaniem statusu, a od tego zależy, czy literał jest
    // defektem, czy mechanizmem. Pozycja: docs/faza-2/mapa-klas-straznikow.md
    await expect(kroki.getByRole("listitem")).toHaveCount(3);
    await expect(rytm.locator("h3"), "nazwy kroków to frazy, nie h3").toHaveCount(
      0,
    );
    for (const [nazwa, tresc] of [
      [k.RytmDnia.krok1Nazwa, k.RytmDnia.krok1Tresc],
      [k.RytmDnia.krok2Nazwa, k.RytmDnia.krok2Tresc],
      [k.RytmDnia.krok3Nazwa, k.RytmDnia.krok3Tresc],
    ] as const) {
      await expect(kroki.getByText(nazwa, { exact: true })).toBeVisible();
      await expect(kroki.getByText(tresc, { exact: true })).toBeVisible();
    }
    await expect(rytm.getByText(k.RytmDnia.kropka, { exact: true })).toBeVisible();
  });

  test(`złożenie (${jezyk}): cennik w skrócie — ceny z migawki, jeden link na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);
    const skrot = page.locator('section[aria-labelledby="skrot-h2"]');

    // Trzy wiersze planów w kolejności W5 (Starter→Growth→Pro),
    // każdy z ceną miesięczną z NIEZALEŻNEGO rachunku z migawki.
    const wiersze = skrot.getByRole("listitem");
    // TRÓJKA — źródła nie ustalono formalnie (polecenie WWW/030), ale widać
    // je linijkę niżej: pętla chodzi po `PLANY`, więc kandydatem jest
    // `PLANY.length`. Zapisane jako KANDYDAT, nie jako ustalenie — sprawdzenie,
    // czy liczba planów ma zmieniać się sama, czy decyzją, nie zostało
    // wykonane. Pozycja: docs/faza-2/mapa-klas-straznikow.md
    await expect(wiersze).toHaveCount(3);
    for (const [indeks, plan] of PLANY.entries()) {
      const wiersz = wiersze.nth(indeks);
      await expect(wiersz.getByText(plan, { exact: true })).toBeVisible();
      const mies = formatuj(kwotaZMigawki(plan, WALUTA[jezyk], "month"), jezyk);
      await expect(
        wiersz.getByText(`${mies} ${k.Cennik.miesiecznie}`, { exact: true }),
      ).toBeVisible();
      // Wiersz NIEINTERAKTYWNY (ADR-003) — zero linków w wierszu.
      await expect(wiersz.locator("a")).toHaveCount(0);
    }

    // Zdanie różnicy + JEDEN link → /cennik per język (decyzja panelu).
    await expect(
      skrot.getByText(k.CennikSkrot.roznica, { exact: true }),
    ).toBeVisible();
    const linki = skrot.locator("a");
    await expect(linki).toHaveCount(1);
    const link = skrot.getByRole("link", {
      name: k.CennikSkrot.link,
      exact: true,
    });
    await expect(link).toHaveAttribute("href", `${prefiks}/cennik`);
  });

  test(`złożenie (${jezyk}): obawy (6 par) i zamknięcie → /funkcje na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    // S12 — sześć par details/summary (K8); otwarcie 1. pary.
    //
    // SZÓSTKA JEST MECHANIZMEM, NIE DEFEKTEM — nie wyprowadzać jej z pliku.
    // Zbiór źródłowy istnieje (`Obawy.p*` liczy dziś 6) i właśnie dlatego
    // pokusa jest realna, ale liczba czerpana ze źródła przepuściłaby siódmą
    // parę BEZ POZOSTAŁYCH TRZECH CZŁONÓW pakietu: decyzja O-7 wiąże treść,
    // `toHaveCount(6)→7`, `STRATEGIA.md` pkt 24 i `Obawy.naglowek`
    // („Sześć"→„Siedem" ×3 języki) — „jednym pakietem albo wcale"
    // (`docs/redakcja/LISTA-WYKONAWCZA-R2.md:30`). Czerwień tego literału jest
    // sygnałem, że ktoś rusza rzecz wymagającą pakietu, i ma nim zostać.
    const obawy = page.locator('section[aria-labelledby="obawy-h2"]');
    await expect(obawy.locator("details")).toHaveCount(6);
    for (const numer of [1, 2, 3, 4, 5, 6] as const) {
      await expect(
        obawy.getByText(k.Obawy[`p${numer}`], { exact: true }),
      ).toBeVisible();
    }
    await expect(obawy.getByText(k.Obawy.o1, { exact: true })).not.toBeVisible();
    await obawy.getByText(k.Obawy.p1, { exact: true }).click();
    await expect(obawy.getByText(k.Obawy.o1, { exact: true })).toBeVisible();

    // S13 — zamknięcie (ostatnia sekcja main; bez h2 i aria-label —
    // decyzja panelu): CTA → /funkcje per język + zdanie po CTA.
    const zamkniecie = page.locator("main > section").last();
    const cta = zamkniecie.getByRole("link", {
      name: k.ZamkniecieGlowna.cta,
      exact: true,
    });
    await expect(cta).toHaveAttribute("href", `${prefiks}/funkcje`);
    await expect(
      zamkniecie.getByText(k.ZamkniecieGlowna.zdanie, { exact: true }),
    ).toBeVisible();
  });

  test(`złożenie (${jezyk}): C8 zamknięcie cennika — §7 i CTA → /login na ${prefiks}/cennik`, async ({
    page,
  }) => {
    await page.goto(`${prefiks}/cennik`);
    const zamkniecie = page.locator("main > section").last();
    await expect(
      zamkniecie.getByText(k.ZamkniecieCennik.zdanie, { exact: true }),
    ).toBeVisible();
    const cta = zamkniecie.getByRole("link", {
      name: k.ZamkniecieCennik.cta,
      exact: true,
    });
    await expect(cta).toHaveAttribute("href", `${prefiks}/login`);
  });
}

// no-JS ×3: treść nowych sekcji w surowym HTML (bramka: treść
// czytelna bez JS).
for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
  test(`złożenie bez JS (${jezyk}): kropki, różnica, obawa i CTA w surowym HTML`, async ({
    request,
  }) => {
    const odpowiedz = await request.get(adres);
    expect(odpowiedz.status()).toBe(200);
    const html = await odpowiedz.text();
    expect(html, "kropka S3 w HTML bez JS").toContain(komunikaty.Problem.kropka);
    expect(html, "kotwica S10 w HTML bez JS").toContain(
      komunikaty.RytmDnia.kropka,
    );
    expect(html, "zdanie różnicy S11 w HTML bez JS").toContain(
      komunikaty.CennikSkrot.roznica,
    );
    expect(html, "pytanie 1 obaw w HTML bez JS").toContain(komunikaty.Obawy.p1);
    expect(html, "CTA zamknięcia w HTML bez JS").toContain(
      komunikaty.ZamkniecieGlowna.cta,
    );
  });
}

// Strażnik „znak w znak": nowe przestrzenie messages ↔ content
// (wzorzec hero.spec/filary.spec — normalizowane WYŁĄCZNIE białe
// znaki; litery, pauzy i apostrofy muszą być identyczne).
test("złożenie: messages znak w znak z content (Etap F)", () => {
  for (const { jezyk, komunikaty } of PRZYPADKI) {
    const znorm = (plik: string) =>
      readFileSync(join(__dirname, "..", "content", jezyk, plik), "utf8").replace(
        /\s+/g,
        " ",
      );

    /* Porównanie idzie po SŁOWACH, nie po zapisie: od ADR-033 dwa
       nagłówki niosą w kluczu znacznik `<akcent>`, który jest nośnikiem
       podziału, a nie treścią, i w `content/` go nie ma. `bezZnacznikow`
       przywraca porównaniu jego przedmiot — zmiana JEDNEJ litery dalej
       daje czerwień, bo normalizowane są wyłącznie znaczniki i białe
       znaki. Parzystości i umiejscowienia samych znaczników pilnuje
       osobny test niżej, żeby ta normalizacja nie stała się furtką. */
    const problem = znorm("problem.md");
    for (const [pole, tresc] of Object.entries(komunikaty.Problem)) {
      expect(
        problem,
        `content/${jezyk}/problem.md zawiera Problem.${pole}`,
      ).toContain(bezZnacznikow(tresc));
    }

    const definicja = znorm("definicja.md");
    for (const [pole, tresc] of Object.entries(komunikaty.Definicja)) {
      expect(
        definicja,
        `content/${jezyk}/definicja.md zawiera Definicja.${pole}`,
      ).toContain(bezZnacznikow(tresc));
    }

    // RytmDnia: krok wieczorny stoi w content JEDNYM akapitem
    // (krok3Tresc + kotwica) — strażnik porównuje KONKATENACJĘ (W4),
    // żeby podmiana szwu krok/kotwica nie przeszła niezauważona.
    const rytm = znorm("rytm-dnia.md");
    const r = komunikaty.RytmDnia;
    for (const [pole, tresc] of [
      ["naglowek", r.naglowek],
      ["krok1Nazwa", r.krok1Nazwa],
      ["krok1Tresc", r.krok1Tresc],
      ["krok2Nazwa", r.krok2Nazwa],
      ["krok2Tresc", r.krok2Tresc],
      ["krok3Nazwa", r.krok3Nazwa],
    ] as const) {
      expect(
        rytm,
        `content/${jezyk}/rytm-dnia.md zawiera RytmDnia.${pole}`,
      ).toContain(tresc);
    }
    expect(
      rytm,
      `content/${jezyk}/rytm-dnia.md zawiera konkatenację krok3Tresc + kropka (W4)`,
    ).toContain(`${r.krok3Tresc} ${r.kropka}`);

    // Obawy: 6 par + naglowek sr-only — tytuł sekcyjny S12 wpisany
    // do content ×3 (panel tytułów + decyzja właściciela 2026-08-12:
    // EN „Six worries", DE „Sechs Sorgen"; odmowa tytułu PL na EN/DE)
    // — strażnik zwykłym „zawiera", jak pozostałe pola.
    const obawy = znorm("obawy.md");
    for (const numer of [1, 2, 3, 4, 5, 6] as const) {
      for (const pole of [`p${numer}`, `o${numer}`] as const) {
        expect(
          obawy,
          `content/${jezyk}/obawy.md zawiera Obawy.${pole}`,
        ).toContain(komunikaty.Obawy[pole]);
      }
    }
    expect(
      obawy,
      `content/${jezyk}/obawy.md zawiera tytuł sekcyjny S12`,
    ).toContain(komunikaty.Obawy.naglowek);

    const zamkniecie = znorm("zamkniecie.md");
    for (const [pole, tresc] of Object.entries(komunikaty.ZamkniecieGlowna)) {
      expect(
        zamkniecie,
        `content/${jezyk}/zamkniecie.md zawiera ZamkniecieGlowna.${pole}`,
      ).toContain(tresc);
    }

    // CennikSkrot + ZamkniecieCennik ↔ content/<jezyk>/cennik.md
    // (sekcja „Cennik w skrócie" + §7).
    const cennik = znorm("cennik.md");
    for (const [pole, tresc] of Object.entries(komunikaty.CennikSkrot)) {
      expect(
        cennik,
        `content/${jezyk}/cennik.md zawiera CennikSkrot.${pole}`,
      ).toContain(tresc);
    }
    expect(
      cennik,
      `content/${jezyk}/cennik.md zawiera ZamkniecieCennik.zdanie (§7)`,
    ).toContain(komunikaty.ZamkniecieCennik.zdanie);
    expect(
      cennik,
      `content/${jezyk}/cennik.md zawiera ZamkniecieCennik.cta`,
    ).toContain(komunikaty.ZamkniecieCennik.cta);
  }
});

/* ═══════════════════════════════════════════════════════════════════════
   PARYTET ZNACZNIKÓW AKCENTU (R-AKCENT-03, ADR-033).

   Powstał razem z normalizacją `bezZnacznikow` i to nie jest zbieg
   okoliczności: normalizacja zdejmuje znaczniki z porównań treści, więc
   BEZ tego testu nikt by nie zauważył, że znacznik zniknął, rozjechał
   się między językami albo objął inny fragment. Furtka zamykana w tym
   samym commicie, w którym powstaje.

   Pilnuje trzech rzeczy naraz:
     · zapis znaczników jest poprawny (domknięty, niezagnieżdżony, niepusty);
     · LICZBA par jest IDENTYCZNA we wszystkich trzech językach — parytet
       jest ważniejszy od ozdoby (warunek zlecenia WWW/041);
     · akcent stoi WYŁĄCZNIE tam, gdzie rozstrzygnął właściciel.
   ═══════════════════════════════════════════════════════════════════════ */
test("R-AKCENT-03: znaczniki akcentu w parytecie ×3 i tylko w miejscach z decyzji", () => {
  /* Miejsca z decyzji WWW/041 krok 3. Nagłówek sekcji rytmu jest tu
     NIEOBECNY ŚWIADOMIE: granica frazowa istniała we wszystkich trzech
     językach, ale akcent ma na powierzchni akcentowej 2,94:1 przy progu
     3:1 — zabrakło kontrastu, nie języka (ADR-033). */
  const Z_AKCENTEM = ["Problem", "Definicja"] as const;
  const BEZ_AKCENTU = ["RytmDnia", "CennikSkrot", "Obawy", "DbanieOSiebie"] as const;

  const pary: Record<string, number> = {};
  for (const { jezyk, komunikaty } of PRZYPADKI) {
    for (const klucz of Z_AKCENTEM) {
      const wartosc = (komunikaty as unknown as Record<string, Record<string, string>>)[klucz]
        .naglowek;
      const w = sprawdzZnaczniki(wartosc);
      expect(w.poprawny, `${jezyk}/${klucz}: zapis znaczników (${w.powod ?? ""})`).toBe(
        true,
      );
      expect(w.pary, `${jezyk}/${klucz}: dokładnie jedna para akcentu`).toBe(1);
      pary[`${klucz}`] = (pary[`${klucz}`] ?? 0) + w.pary;
    }
    for (const klucz of BEZ_AKCENTU) {
      const grupa = (komunikaty as unknown as Record<string, Record<string, string>>)[klucz];
      if (!grupa?.naglowek) continue;
      expect(
        sprawdzZnaczniki(grupa.naglowek).pary,
        `${jezyk}/${klucz}: nagłówek BEZ akcentu (decyzja WWW/041)`,
      ).toBe(0);
    }
  }
  /* Parytet: suma par na klucz = 3 (po jednej na język). Rozjazd w jednym
     języku daje tu czerwień, nawet gdy każdy język z osobna jest poprawny. */
  for (const klucz of Z_AKCENTEM) {
    expect(pary[klucz], `${klucz}: ta sama liczba par we wszystkich trzech językach`).toBe(3);
  }
});
