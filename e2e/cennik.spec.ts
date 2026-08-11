import { readFileSync } from "node:fs";
import { join } from "node:path";

import { test, expect } from "@playwright/test";

import migawka from "../content/cennik-snapshot.json";
import fakty from "../content/facts.json";
import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";

/**
 * Etap E — /cennik C2–C7 (handoff-etap-e-cennik.md, po panelu
 * 2026-08-11): parytet treści ×3, ceny liczone NIEZALEŻNIE
 * z migawki (rozjazd DOM↔migawka = czerwień), przełącznik K6
 * wariant A empirycznie, no-JS z oboma cenami, tabela = facts.json,
 * strażnik znak w znak messages ↔ content.
 */
const PRZYPADKI = [
  { adres: "/cennik", jezyk: "pl", prefiks: "", komunikaty: pl },
  { adres: "/en/cennik", jezyk: "en", prefiks: "/en", komunikaty: en },
  { adres: "/de/cennik", jezyk: "de", prefiks: "/de", komunikaty: de },
] as const;

// Niezależny rachunek z migawki (nie z helpera src/lib/cennik.ts —
// duplikacja celowa: test i strona liczą osobno z tego samego źródła).
const WALUTA = { pl: "pln", en: "eur", de: "eur" } as const;
const LOCALE_FORMATU = { pl: "pl-PL", en: "en-IE", de: "de-DE" } as const;

function kwotaZMigawki(
  plan: string,
  waluta: string,
  interwal: string,
): number {
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

const PLANY = ["Starter", "Growth", "Pro"] as const;

for (const { adres, jezyk, prefiks, komunikaty } of PRZYPADKI) {
  const c = komunikaty.Cennik;

  test(`cennik (${jezyk}): treść, karty równorzędne, CTA, FAQ, potwierdzenia na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(c.naglowek);
    await expect(page.getByText(c.wstep, { exact: true })).toBeVisible();

    // Trzy karty planów: h2, „dla kogo", pozycje (5/2/4), CTA → /login.
    const licznikiPozycji = { starter: 5, growth: 2, pro: 4 } as const;
    for (const plan of PLANY) {
      const karta = page.locator("article", {
        has: page.getByRole("heading", { name: plan, exact: true }),
      });
      await expect(karta).toHaveCount(1);
      const klucz = plan.toLowerCase() as keyof typeof licznikiPozycji;
      await expect(
        karta.getByText(c.plany[klucz].dlaKogo, { exact: true }),
      ).toBeVisible();
      await expect(karta.getByRole("listitem")).toHaveCount(
        licznikiPozycji[klucz],
      );
      const cta = karta.getByRole("link", { name: c.cta, exact: true });
      await expect(cta).toHaveAttribute("href", `${prefiks}/login`);
    }

    // FAQ: 4 pary details/summary; otwarcie ujawnia odpowiedź.
    const faq = page.locator("details");
    await expect(faq).toHaveCount(4);
    await expect(
      page.getByText(c.faq.o1, { exact: true }),
    ).not.toBeVisible();
    await page.getByText(c.faq.p1, { exact: true }).click();
    await expect(page.getByText(c.faq.o1, { exact: true })).toBeVisible();

    // Potwierdzenia ×3 (K9).
    const potwierdzenia = page.locator('ul[role="list"]');
    await expect(potwierdzenia.getByRole("listitem")).toHaveCount(3);
    for (const tekst of [
      c.potwierdzenie1,
      c.potwierdzenie2,
      c.potwierdzenie3,
    ]) {
      await expect(potwierdzenia.getByText(tekst, { exact: true })).toBeVisible();
    }

    // aria-current: dokładnie jedna pozycja menu bieżąca — Cennik.
    const biezaca = page.locator('header a[aria-current="page"]');
    await expect(biezaca).toHaveCount(1);
    await expect(biezaca).toHaveText(komunikaty.Nawigacja.cennik);
  });

  test(`cennik (${jezyk}): ceny z migawki — rachunek niezależny (DOM ↔ snapshot)`, async ({
    page,
  }) => {
    await page.goto(adres);
    for (const plan of PLANY) {
      const karta = page.locator("article", {
        has: page.getByRole("heading", { name: plan, exact: true }),
      });
      const mies = kwotaZMigawki(plan, WALUTA[jezyk], "month");
      const rok = kwotaZMigawki(plan, WALUTA[jezyk], "year");
      // Pełny tekst akapitu ceny (kwota + słowo interwału) — exact,
      // bo w formacie DE „25 €" jest podciągiem „225 €".
      await expect(
        karta.getByText(`${formatuj(mies, jezyk)} ${c.miesiecznie}`, {
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        karta.getByText(`${formatuj(rok, jezyk)} ${c.rocznie}`, {
          exact: true,
        }),
      ).toBeAttached();
      // Oszczędność = 12×mies − rok, w zdaniu z messages.
      const oszczednosc = formatuj(mies * 12 - rok, jezyk);
      const zdanie = c.oszczedzasz.replace("{kwota}", oszczednosc);
      await expect(karta.getByText(zdanie, { exact: true })).toBeAttached();
    }
  });

  test(`cennik bez JS (${jezyk}): OBIE ceny i tabela w surowym HTML`, async ({
    request,
  }) => {
    const odpowiedz = await request.get(adres);
    expect(odpowiedz.status()).toBe(200);
    const html = await odpowiedz.text();
    for (const plan of PLANY) {
      const mies = formatuj(kwotaZMigawki(plan, WALUTA[jezyk], "month"), jezyk);
      const rok = formatuj(kwotaZMigawki(plan, WALUTA[jezyk], "year"), jezyk);
      // Kwota jako KOMPLETNY węzeł tekstowy „>kwota<" — granice
      // eliminują podciągi (DE: „25 €" ⊂ „225 €") i separator
      // <!-- --> wstawiany przez Reacta między wyrażeniami JSX.
      expect(html, `${plan}: cena miesięczna w HTML`).toContain(`>${mies}<`);
      expect(html, `${plan}: cena roczna w HTML`).toContain(`>${rok}<`);
    }
    expect(html, "wiersz tabeli w HTML").toContain(c.tabela.kontakty);
    expect(html, "FAQ w HTML").toContain(c.faq.p1);
  });
}

test("K6: przełącznik — domyślnie miesięcznie; rocznie odsłania cenę roczną i oszczędność", async ({
  page,
}) => {
  await page.goto("/cennik");
  const starter = page.locator("article", {
    has: page.getByRole("heading", { name: "Starter", exact: true }),
  });
  const mies = formatuj(kwotaZMigawki("Starter", "pln", "month"), "pl");
  const rok = formatuj(kwotaZMigawki("Starter", "pln", "year"), "pl");

  // Stan domyślny: miesięczna widoczna, roczna ukryta (:has() wspierane
  // w Chromium suity — przełącznik widoczny).
  const radioRocznie = page.getByRole("radio", {
    name: pl.Cennik.rocznie,
    exact: true,
  });
  await expect(radioRocznie).toBeVisible();
  await expect(starter.getByText(mies, { exact: false })).toBeVisible();
  await expect(starter.getByText(rok, { exact: false })).not.toBeVisible();

  // Zmiana na „rocznie": roczna + oszczędność widoczne, miesięczna znika.
  await radioRocznie.check();
  await expect(starter.getByText(rok, { exact: false })).toBeVisible();
  await expect(starter.getByText(mies, { exact: false })).not.toBeVisible();
  const oszczednosc = formatuj(
    kwotaZMigawki("Starter", "pln", "month") * 12 -
      kwotaZMigawki("Starter", "pln", "year"),
    "pl",
  );
  await expect(
    starter.getByText(
      pl.Cennik.oszczedzasz.replace("{kwota}", oszczednosc),
      { exact: true },
    ),
  ).toBeVisible();
});

test("K7: liczby tabeli = facts.json (import, nie literały)", async ({
  page,
}) => {
  await page.goto("/cennik");
  const f = fakty.fakty;
  const wiersze = [
    {
      etykieta: pl.Cennik.tabela.kontakty,
      starter: f["limit-kontakty-starter"].wartosc,
      growth: f["limit-kontakty-growth"].wartosc,
    },
    {
      etykieta: pl.Cennik.tabela.zespol,
      starter: f["limit-zespol-starter"].wartosc,
      growth: f["limit-zespol-growth"].wartosc,
    },
    {
      etykieta: pl.Cennik.tabela.posty,
      starter: f["limit-posty-starter"].wartosc,
      growth: f["limit-posty-growth"].wartosc,
    },
    {
      etykieta: pl.Cennik.tabela.sesje,
      starter: f["limit-sesje-treningowe-starter"].wartosc,
      growth: f["limit-sesje-treningowe-growth"].wartosc,
    },
  ];
  for (const { etykieta, starter, growth } of wiersze) {
    const wiersz = page.locator("tr", {
      has: page.getByRole("rowheader", { name: etykieta, exact: true }),
    });
    const komorki = wiersz.locator("td");
    await expect(komorki.nth(0)).toHaveText(String(starter));
    await expect(komorki.nth(1)).toHaveText(String(growth));
    await expect(komorki.nth(2)).toHaveText(pl.Cennik.tabela.bezLimitu);
  }
  // Strona nie panoramuje poziomo — asercja BEHAWIORALNA (próba
  // przesunięcia), nie arytmetyka scrollWidth: w emulacji mobilnej
  // Chromium documentElement.scrollWidth raportuje też wewnętrzny
  // overflow kontenera przewijanego (artefakt zmierzony sondą
  // 2026-08-11: scrollWidth 506 przy scrollX trwale 0).
  const przesuniecie = await page.evaluate(() => {
    window.scrollTo(300, 0);
    return window.scrollX;
  });
  expect(
    przesuniecie,
    "strona nie panoramuje poziomo (scroll wyłącznie w kontenerze tabeli)",
  ).toBe(0);
});

// Strażnik „znak w znak": messages ↔ content/<jezyk>/cennik.md
// (pola literalne; szablon oszczędności i mikro-teksty rusztowania
// usankcjonowane przez panel — poza strażnikiem, pilnowane wyżej).
// Etykiety tabeli porównywane bez rozróżniania wielkości pierwszej
// litery (content prowadzi je w prozie §4).
test("treść cennika: messages znak w znak z content/*/cennik.md", () => {
  for (const { jezyk, komunikaty } of PRZYPADKI) {
    const zrodlo = readFileSync(
      join(__dirname, "..", "content", jezyk, "cennik.md"),
      "utf8",
    ).replace(/\s+/g, " ");
    const zrodloMale = zrodlo.toLowerCase();
    const c = komunikaty.Cennik;

    const literalne: string[] = [
      c.naglowek,
      c.wstep,
      c.miesiecznie,
      c.rocznie,
      c.cta,
      c.plany.starter.dlaKogo,
      ...[1, 2, 3, 4, 5].map(
        (n) => c.plany.starter[`pozycja${n}` as "pozycja1"],
      ),
      c.plany.growth.dlaKogo,
      c.plany.growth.dopisek,
      c.plany.growth.pozycja1,
      c.plany.growth.pozycja2,
      c.plany.pro.dlaKogo,
      c.plany.pro.dopisek,
      ...[1, 2, 3, 4].map((n) => c.plany.pro[`pozycja${n}` as "pozycja1"]),
      c.faq.p1,
      c.faq.o1,
      c.faq.p2,
      c.faq.o2,
      c.faq.p3,
      c.faq.o3,
      c.faq.p4,
      c.faq.o4,
      c.potwierdzenie1,
      c.potwierdzenie2,
      c.potwierdzenie3,
    ];
    for (const tresc of literalne) {
      expect(zrodlo, `content/${jezyk}/cennik.md zawiera: „${tresc}"`).toContain(
        tresc,
      );
    }

    const etykietyTabeli = [
      c.tabela.kontakty,
      c.tabela.zespol,
      c.tabela.posty,
      c.tabela.sesje,
      c.tabela.kalendarz,
      c.tabela.puls,
      c.tabela.drzewo,
      c.tabela.ranking,
      c.tabela.bezLimitu,
      c.tabela.wKazdymPlanie,
    ];
    for (const etykieta of etykietyTabeli) {
      expect(
        zrodloMale,
        `content/${jezyk}/cennik.md zawiera etykietę tabeli: „${etykieta}"`,
      ).toContain(etykieta.toLowerCase());
    }
  }
});
