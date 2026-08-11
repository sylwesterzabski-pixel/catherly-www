import { readFileSync } from "node:fs";
import { join } from "node:path";

import { test, expect } from "@playwright/test";

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

// Wyliczone tło S10: rola-powierzchnia-akcentowa = terakota-100
// (#ffe2da) — warunek lustra L1 (DECYZJA 6; handoff Etapu F).
const KOLOR_LUSTRA = "rgb(255, 226, 218)";

// LUSTRO L1 (test kluczowy): S10 na tle akcentowym; kropka S3
// („…liczysz…") i kropka S10 („…widzisz…") obecne znak w znak
// i mówią tym samym duetem 1.125rem/600 (18px computed).
test("LUSTRO L1: tło akcentowe S10; kropki S3/S10 wspólnym duetem", async ({
  page,
}) => {
  await page.goto("/");

  const rytm = page.locator('section[aria-labelledby="rytm-h2"]');
  const tlo = await rytm.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(tlo, "S10 na rola-powierzchnia-akcentowa (terakota-100)").toBe(
    KOLOR_LUSTRA,
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
    expect(duet.rozmiar, `kropka ${nazwa}: font-size duetu`).toBe("18px");
  }
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
      k.Problem.naglowek,
      k.Definicja.naglowek,
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
    ).toHaveText(k.Problem.naglowek);
    await expect(problem.getByText(k.Problem.tresc, { exact: true })).toBeVisible();
    await expect(
      problem.getByText(k.Problem.kropka, { exact: true }),
    ).toBeVisible();

    // S4 — definicja: H2 i treść, bez kropki.
    const definicja = page.locator('section[aria-labelledby="definicja-h2"]');
    await expect(
      definicja.getByRole("heading", { level: 2 }),
    ).toHaveText(k.Definicja.naglowek);
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

    const problem = znorm("problem.md");
    for (const [pole, tresc] of Object.entries(komunikaty.Problem)) {
      expect(
        problem,
        `content/${jezyk}/problem.md zawiera Problem.${pole}`,
      ).toContain(tresc);
    }

    const definicja = znorm("definicja.md");
    for (const [pole, tresc] of Object.entries(komunikaty.Definicja)) {
      expect(
        definicja,
        `content/${jezyk}/definicja.md zawiera Definicja.${pole}`,
      ).toContain(tresc);
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

    // Obawy: 6 par + naglowek sr-only = część opisowa tytułu „# …"
    // pliku (case-insensitive, bez „— PL/EN/DE…") — pochodna treści
    // pkt 24; sankcja właściciela na koniec etapu.
    const obawy = znorm("obawy.md");
    for (const numer of [1, 2, 3, 4, 5, 6] as const) {
      for (const pole of [`p${numer}`, `o${numer}`] as const) {
        expect(
          obawy,
          `content/${jezyk}/obawy.md zawiera Obawy.${pole}`,
        ).toContain(komunikaty.Obawy[pole]);
      }
    }
    const pierwszaLinia = readFileSync(
      join(__dirname, "..", "content", jezyk, "obawy.md"),
      "utf8",
    ).split("\n")[0];
    const tytul = pierwszaLinia.match(/^# (.+?) — (?:PL|EN|DE)\b/)?.[1];
    expect(
      tytul?.toLowerCase(),
      `Obawy.naglowek (${jezyk}) = tytuł content/${jezyk}/obawy.md`,
    ).toBe(komunikaty.Obawy.naglowek.toLowerCase());

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
