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
  /* ⚠ PRZEDMIOT TEJ ASERCJI ZMIENIŁ NOŚNIK, NIE TREŚĆ (ADR-069,
     WWW/096 v4 pkt 4). Do 06.09 pytała: „czy S10 nosi rolę
     `powierzchnia-akcentowa`". Rola ta rozwiązuje się na biel, a od
     wprowadzenia trzech tonów sekcji S10 dostała ton 3 — decyzją
     właściciela o naprzemienności, i musiała ją dostać, bo ton 2 (biel)
     jest barwą jej WŁASNYCH kart i zniósłby ich plamę.

     Pytanie zostaje to samo: **czy lustro L1 stoi na powierzchni
     WYRÓŻNIONEJ, a nie na tle strony.** Zmienia się mechanizm, którym
     wyróżnienie jest robione — i asercja idzie za mechanizmem.

     ⚠ TO NIE JEST ZŁAGODZENIE, bo pyta o DWIE rzeczy naraz, nie o jedną:
     (1) tło sekcji różni się od tła strony — czyli wyróżnienie w ogóle
         istnieje;
     (2) tło sekcji jest DOKŁADNIE jednym ze zgłoszonych tonów, czytanym
         ze zmiennej w TEJ sekcji — czyli nie jest dowolną barwą, którą
         ktoś wpisał ręcznie.
     Wersja poprzednia pytała tylko o (2), w jednej roli. Ta łapie
     dodatkowo przepięcie S10 na zwykłe tło strony.

     ⚠ CZEGO NIE MIERZY, żeby zieleń nie była czytana szerzej: SIŁY
     wyróżnienia. Ton 3 wobec tła strony daje 1,09:1 — tyle samo, ile
     dawała biel (1,09:1) i znacznie mniej niż 5,9:1 z czasów korpusu
     ciemnego. To jest zapisany UBYTEK (ADR-051), niezmieniony tą
     zmianą, i żaden strażnik go nie pilnuje. */
  const { tlo, tloStrony, tonSekcji } = await rytm.evaluate((el) => ({
    tlo: getComputedStyle(el).backgroundColor,
    tloStrony: getComputedStyle(document.body).backgroundColor,
    tonSekcji: getComputedStyle(el).getPropertyValue("--kolor-rola-tlo-3").trim(),
  }));
  expect(tonSekcji, "rola tonu 3 rozwiązana w S10").not.toBe("");
  const tonRgb = await rytm.evaluate((el, wartosc) => {
    const sonda = document.createElement("span");
    sonda.style.color = wartosc;
    el.appendChild(sonda);
    const rgb = getComputedStyle(sonda).color;
    sonda.remove();
    return rgb;
  }, tonSekcji);
  expect(tlo, "S10 stoi na tonie 3 (rola czytana z tej sekcji)").toBe(tonRgb);
  expect(tlo, "S10 stoi na powierzchni WYRÓŻNIONEJ, nie na tle strony").not.toBe(
    tloStrony,
  );

  /* ⚠ KROPKA S3 JEST TERAZ NA INNEJ STRONIE — I DLATEGO TEN STRAŻNIK
     CHODZI PO DWÓCH ADRESACH, a nie stracił połowy przedmiotu
     (ADR-069, WWW/096 v4). Sekcja „problem" zeszła z głównej na
     `/dla-kogo`; lustro L1 mówi, że OBIE kropki — otwierająca i
     zamykająca — mówią tym samym duetem typograficznym. Ta własność
     nie zależy od tego, czy sekcje stoją na jednej stronie: duet ma
     być jeden w całym serwisie.

     Gdyby zawęzić test do samego S10, zieleń dalej by świeciła,
     a strażnik przestałby pilnować rzeczy, dla której powstał —
     „ta sama para wartości po obu stronach lustra". To jest wprost
     zamiana czerwieni na ciszę. */
  for (const [nazwa, tekst, adresKropki] of [
    ["S3", pl.Problem.kropka, "/dla-kogo"],
    ["S10", pl.RytmDnia.kropka, "/"],
  ] as const) {
    await page.goto(adresKropki);
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
  /* ⚠ DWA ADRESY, JEDNA SIATKA (ADR-069). Sekcja „problem" stoi od
     2026-09-06 na `/dla-kogo`, rytm dnia został na głównej. Asercja
     „ta sama kolumna" ma sens także w poprzek stron i JEST WTEDY
     MOCNIEJSZA: mierzy, że obie strony trzymają tę samą siatkę treści,
     a nie tylko że dwie sekcje jednej strony są ze sobą zgodne.
     Kadr jest ten sam (projekt `desktop`), więc kontener ma tę samą
     szerokość na obu adresach — inaczej porównanie byłoby bez sensu. */
  await page.goto("/dla-kogo");
  const ramkaS3 = await page
    .getByText(pl.Problem.kropka, { exact: true })
    .boundingBox();
  await page.goto("/");
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
    /* ⚠ TA TABLICA JEST MECHANIZMEM, NIE ODWZOROWANIEM STANU. Koduje
       SKŁAD strony głównej: `toHaveText(tablica)` pilnuje naraz liczby,
       treści i porządku, więc każda dołożona, zdjęta albo przestawiona
       sekcja z nagłówkiem zapala tu czerwień. Dlatego jest wypisana,
       a nie czerpana z DOM-u — czerpana zgadzałaby się zawsze.

       ⚠ PRZELICZONA 2026-09-06 (ADR-069, WWW/096 v4) razem ze zmianą
       składu. Zeszły stąd trzy pozycje i wszystkie trzy z powodem:
       · `Problem.naglowek` — sekcja przeniesiona na `/dla-kogo`,
       · `DbanieOSiebie.naglowek` — sekcja zdjęta z głównej,
       · `Obawy.naglowek` — sześć obaw przeniesione na `/cennik`.
       Doszedł `Filary.filar4.naglowek` z powrotem PRZED rytmem dnia
       (filar „Wyniki" wrócił decyzją właściciela), a blok „wzrost"
       bierze odtąd `FunkcjeWyniki.mod2_nazwa` — więc nagłówek filaru 4
       znów występuje na stronie dokładnie RAZ, tylko w innym miejscu
       niż w `WWW/094`.

       ⚠ RZĄD TRZECH KART GRAFITOWYCH NIE MA TU POZYCJI — bo nie ma
       nagłówka. To decyzja składu, nie przeoczenie: rząd jest spisem
       pod prozą sekcji „pamięć", niesie `aria-label`, a trzy tytuły
       kart są akapitami. Gdyby kiedyś dostał `h2`, ta tablica zapali. */
    await expect(page.locator("main h2")).toHaveText([
      bezZnacznikow(k.Definicja.naglowek),
      k.Filary.filar1.naglowek,
      k.Filary.filar2.naglowek,
      k.Filary.filar3.naglowek,
      k.Filary.filar4.naglowek,
      k.RytmDnia.naglowek,
      k.FunkcjeWyniki.mod2_nazwa,
      k.CennikSkrot.naglowek,
      /* ⚠ `toHaveText(tablica)` pilnuje LICZBY I PORZĄDKU naraz, więc ten
         wiersz jest jednocześnie asercją, że nagłówek zamknięcia stoi
         NA KOŃCU — gdyby ktoś wstawił sekcję za nim, test zapali. */
      k.ZamkniecieGlowna.naglowek,
    ]);
  });
}

// Parytet ×3: S3/S4/S10/S11/S12/S13 z messages na złożonej głównej.
for (const { adres, jezyk, prefiks, komunikaty } of PRZYPADKI) {
  const k = komunikaty;

  test(`złożenie (${jezyk}): definicja i rytm dnia z messages na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    /* ⚠ SEKCJI „PROBLEM" NA GŁÓWNEJ NIE MA OD 2026-09-06 (ADR-069,
       WWW/096 v4) — stała tu jej asercja i schodzi razem z sekcją.
       Nie znika jednak z zestawu: przeniesiona sekcja jest sprawdzana
       tam, gdzie teraz stoi, w `e2e/dla-kogo.spec.ts`. Skasowanie
       asercji bez przeniesienia byłoby zamianą czerwieni na ciszę —
       dokładnie tym, czego zakazuje ADR-020.

       ⚠ ASERCJA NEGATYWNA ZOSTAJE TUTAJ, i to jest cała wartość tej
       zmiany: bez niej nic nie zauważyłoby powrotu sekcji na główną. */
    await expect(
      page.locator('section[aria-labelledby="problem-h2"]'),
      "sekcja problem zeszła z głównej na /dla-kogo",
    ).toHaveCount(0);

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

  test(`złożenie (${jezyk}): zamknięcie → /funkcje na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    /* ⚠ SZEŚĆ OBAW ZESZŁO Z GŁÓWNEJ NA /cennik (ADR-069, WWW/096 v4) —
       i CAŁY strażnik poszedł za nimi, nie został tutaj. Asercja
       `toHaveCount(6)`, pętla po sześciu pytaniach i sprawdzenie
       rozwijania stoją teraz w `e2e/cennik.spec.ts`, przy sekcji, którą
       opisują. To jest wykonanie zdania ze zlecenia: „strażnik
       toHaveCount za nimi".

       Strażnik zostawiony przy pustym miejscu pilnowałby nieobecności,
       a szóstka — która jest MECHANIZMEM decyzji O-7, nie odwzorowaniem
       zbioru — przestałaby cokolwiek chronić. Powód, dla którego jest
       mechanizmem, przeniesiono razem z nią i tam go należy czytać.

       ⚠ ASERCJA NEGATYWNA ZOSTAJE, bo bez niej nic nie zauważy powrotu
       sekcji na główną i strona miałaby te same sześć par dwa razy. */
    await expect(
      page.locator('section[aria-labelledby="obawy-h2"]'),
      "sekcja obaw zeszła z głównej na /cennik",
    ).toHaveCount(0);

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
    /* ⚠ DWIE POZYCJE PRZENIESIONE NA INNE ADRESY (ADR-069, WWW/096 v4),
       a nie skasowane: kropka S3 idzie z sekcją „problem" na
       `/dla-kogo`, pierwsze pytanie obaw — na `/cennik`. Sprawdzam je
       tam, gdzie teraz są, w TYM SAMYM przebiegu i tym samym sposobem
       (surowy HTML z żądania, bez JS). Skasowanie ich stąd bez
       przeniesienia zdjęłoby pokrycie bramki „treść czytelna bez JS"
       z dwóch sekcji naraz. */
    expect(html, "kotwica S10 w HTML bez JS").toContain(
      komunikaty.RytmDnia.kropka,
    );
    expect(html, "zdanie różnicy S11 w HTML bez JS").toContain(
      komunikaty.CennikSkrot.roznica,
    );
    expect(html, "CTA zamknięcia w HTML bez JS").toContain(
      komunikaty.ZamkniecieGlowna.cta,
    );
    /* Karta „Twój Wrapped" — podpis i seria w surowym HTML. Podpis jest
       WARUNKIEM kategorii `dane-przykladowe` w linterze liczb, więc
       jego zniknięcie bez JS byłoby ubytkiem, nie kosmetyką. */
    expect(html, "podpis dane-przykladowe w HTML bez JS").toContain(
      komunikaty.Wrapped.podpis,
    );

    const bezPrefiksu = adres === "/" ? "" : adres;
    const dlaKogo = await request.get(`${bezPrefiksu}/dla-kogo`);
    expect(dlaKogo.status()).toBe(200);
    expect(await dlaKogo.text(), "kropka S3 w HTML bez JS na /dla-kogo").toContain(
      komunikaty.Problem.kropka,
    );
    const cennik = await request.get(`${bezPrefiksu}/cennik`);
    expect(cennik.status()).toBe(200);
    expect(await cennik.text(), "pytanie 1 obaw w HTML bez JS na /cennik").toContain(
      komunikaty.Obawy.p1,
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
