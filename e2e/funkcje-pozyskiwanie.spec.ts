import { readFileSync } from "node:fs";
import { join } from "node:path";

import { test, expect } from "@playwright/test";

import fakty from "../content/facts.json";
import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";

/**
 * K12 — wzorcowa podstrona /funkcje/pozyskiwanie (Faza 4, Etap B;
 * HF docs/faza-4/hf/k12-funkcje-pozyskiwanie.html po panelu
 * 2026-08-12; treść content/{pl,en,de}/funkcje-pozyskiwanie.md —
 * D-B1/D-B2). Strażnicy: parytet ×3, kotwice pod sticky nav (W4),
 * aria-current rodzica (A-1), MILCZENIE filara 1, znak w znak
 * messages ↔ content, no-JS, brak przejść F9 (bramka linków —
 * rozstrzygnięcie 4), reflow 320 px, struktura nagłówków.
 */
const PRZYPADKI = [
  { adres: "/funkcje/pozyskiwanie", jezyk: "pl", prefiks: "", komunikaty: pl },
  {
    adres: "/en/funkcje/pozyskiwanie",
    jezyk: "en",
    prefiks: "/en",
    komunikaty: en,
  },
  {
    adres: "/de/funkcje/pozyskiwanie",
    jezyk: "de",
    prefiks: "/de",
    komunikaty: de,
  },
] as const;

const NUMERY_MODULOW = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

// Kotwice modułów — sluggi z content (kontrakt z page.tsx; cele
// linków z indeksu /funkcje w Etapie D).
const KOTWICE = [
  "formularz",
  "kalendarz",
  "subskrypcja-kalendarza",
  "eksport-vcard",
  "qr-polecajacy",
  "program-polecen",
  "dmo",
  "zadania",
  "sala-treningowa",
  "plany-rozmow",
] as const;

// „30 minut" modułu 2 — z facts.json (D-B3), jak na stronie.
const MINUTY = String(fakty.fakty["przypomnienie-kalendarza-minuty"].wartosc);

/** mod2_poco niesie placeholder ICU {minuty} — porównania z DOM
 *  i content wykonuje się PO podstawieniu wartości z facts.json. */
function podstawMinuty(tekst: string): string {
  return tekst.replace("{minuty}", MINUTY);
}

// (a) Parytet ×3: okruszki, H1+zdanie, 10 modułów (h2+poco+granica
// znak w znak), sekcja AI, F8, zamknięcie.
for (const { adres, jezyk, prefiks, komunikaty } of PRZYPADKI) {
  const k = komunikaty.FunkcjePozyskiwanie;

  test(`K12 (${jezyk}): okruszki, nagłówek i 10 modułów z messages na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    // Okruszki: nav[aria-label z messages] > ol; link „Funkcje" per
    // język; bieżący okruszek TEKSTEM z aria-current="page".
    const okruszki = page.locator(`nav[aria-label="${k.okruszkiAria}"]`);
    await expect(okruszki).toHaveCount(1);
    const linkFunkcje = okruszki.getByRole("link", {
      name: komunikaty.Nawigacja.funkcje,
      exact: true,
    });
    await expect(linkFunkcje).toHaveAttribute("href", `${prefiks}/funkcje`);
    const biezacyOkruszek = okruszki.locator('li[aria-current="page"]');
    await expect(biezacyOkruszek).toHaveText(k.okruszek);
    await expect(biezacyOkruszek.locator("a")).toHaveCount(0);

    // F2: jedyny h1 + zdanie korzyści.
    await expect(page.locator("h1")).toHaveText(k.naglowek);
    await expect(page.getByText(k.zdanie, { exact: true })).toBeVisible();

    // F3–F7: 10 modułów — h2 z kotwicą, PO CO TO i granica exact.
    for (const [indeks, numer] of NUMERY_MODULOW.entries()) {
      const sekcja = page.locator(
        `section[aria-labelledby="${KOTWICE[indeks]}"]`,
      );
      await expect(sekcja.getByRole("heading", { level: 2 })).toHaveText(
        k[`mod${numer}_nazwa`],
      );
      await expect(
        sekcja.getByText(podstawMinuty(k[`mod${numer}_poco`]), {
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        sekcja.getByText(k[`mod${numer}_nie`], { exact: true }),
      ).toBeVisible();
    }
  });

  test(`K12 (${jezyk}): sekcja AI, F8 i zamknięcie z messages na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    // Sekcja kierunku AI: kotwica #asystent-ai; treść bez trybu
    // dokonanego + granica (D-B2).
    const kierunek = page.locator('section[aria-labelledby="asystent-ai"]');
    await expect(kierunek.getByRole("heading", { level: 2 })).toHaveText(
      k.aiNaglowek,
    );
    await expect(
      kierunek.getByText(k.aiTresc, { exact: true }),
    ).toBeVisible();
    await expect(
      kierunek.getByText(k.aiGranica, { exact: true }),
    ).toBeVisible();

    // F8: zdanie planu + link do cennika per język.
    await expect(page.getByText(k.f8, { exact: true })).toBeVisible();
    const linkCennika = page.getByRole("link", {
      name: k.f8link,
      exact: true,
    });
    await expect(linkCennika).toHaveAttribute("href", `${prefiks}/cennik`);

    // F10: zamknięcie (K11 krótki) — CTA → /login per język + zdanie.
    const zamkniecie = page.locator("main > section").last();
    const cta = zamkniecie.getByRole("link", {
      name: k.zamkniecieCta,
      exact: true,
    });
    await expect(cta).toHaveAttribute("href", `${prefiks}/login`);
    await expect(
      zamkniecie.getByText(k.zamkniecieZdanie, { exact: true }),
    ).toBeVisible();
  });
}

// (i) Struktura nagłówków: 1×h1; main h2 = 11 (10 modułów + AI)
// w porządku treści — toHaveText(tablica) pilnuje liczby I kolejności.
for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
  const k = komunikaty.FunkcjePozyskiwanie;
  test(`K12 (${jezyk}): struktura nagłówków (1×h1, 11×h2 w porządku) na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main h2")).toHaveText([
      ...NUMERY_MODULOW.map((numer) => k[`mod${numer}_nazwa`]),
      k.aiNaglowek,
    ]);
  });
}

// (b) Kotwice pod sticky nav (W4): wejście fragmentem #sala-treningowa
// stawia h2 W PEŁNI pod nagłówkiem — pomiar geometryczny (scroll-margin
// 5rem vs zmierzone 4.625rem nagłówka na 390 px), nie założenie.
test("W4: kotwica #sala-treningowa w pełni widoczna pod sticky nav", async ({
  page,
}) => {
  await page.goto("/funkcje/pozyskiwanie#sala-treningowa");
  const h2 = page.locator("#sala-treningowa");
  await expect(h2).toBeVisible();
  const ramkaNaglowka = await page.locator("header").boundingBox();
  const ramkaH2 = await h2.boundingBox();
  expect(ramkaNaglowka, "sticky nagłówek ma ramkę").not.toBeNull();
  expect(ramkaH2, "h2 kotwicy ma ramkę").not.toBeNull();
  expect(
    ramkaH2!.y,
    "górna krawędź h2 poniżej dolnej krawędzi sticky nagłówka",
  ).toBeGreaterThanOrEqual(ramkaNaglowka!.y + ramkaNaglowka!.height);
});

// Kotwica sekcji kierunku (rozstrzygnięcie 5: #asystent-ai wchodzi).
test("W4: kotwica #asystent-ai w pełni widoczna pod sticky nav", async ({
  page,
}) => {
  await page.goto("/funkcje/pozyskiwanie#asystent-ai");
  const h2 = page.locator("#asystent-ai");
  await expect(h2).toBeVisible();
  const ramkaNaglowka = await page.locator("header").boundingBox();
  const ramkaH2 = await h2.boundingBox();
  expect(ramkaNaglowka).not.toBeNull();
  expect(ramkaH2).not.toBeNull();
  expect(ramkaH2!.y).toBeGreaterThanOrEqual(
    ramkaNaglowka!.y + ramkaNaglowka!.height,
  );
});

// (c) A-1: na podstronie pozycja-rodzic „Funkcje" ma aria-current="true"
// (i tylko ona w nawigacji nagłówka); "page" wskazuje wyłącznie okruszek.
// Uwaga zakresu: link języka w stopce też niesie aria-current="true"
// (inny kontrakt — K1 stopka), stąd asercje PER NAGŁÓWEK, nie page-wide.
test('A-1: na /funkcje/pozyskiwanie „Funkcje" ma aria-current="true", okruszek — "page"', async ({
  page,
}) => {
  await page.goto("/funkcje/pozyskiwanie");
  const wNaglowku = page.locator('header a[aria-current="true"]');
  await expect(wNaglowku).toHaveCount(1);
  await expect(wNaglowku).toHaveText(pl.Nawigacja.funkcje);
  // Żaden link nagłówka nie jest „bieżącą stroną"…
  await expect(page.locator('header a[aria-current="page"]')).toHaveCount(0);
  // …bieżącą stronę wskazuje wyłącznie ostatni okruszek (jedyny
  // element aria-current="page" na całej stronie).
  const biezace = page.locator('[aria-current="page"]');
  await expect(biezace).toHaveCount(1);
  await expect(biezace).toHaveText(pl.FunkcjePozyskiwanie.okruszek);
});

// (c) Regresja: dokładne /funkcje nadal oznaczone "page", bez "true".
test('A-1 regresja: na /funkcje „Funkcje" nadal aria-current="page"', async ({
  page,
}) => {
  await page.goto("/funkcje");
  const biezaca = page.locator('header nav a[aria-current="page"]');
  await expect(biezaca).toHaveCount(1);
  await expect(biezaca).toHaveText(pl.Nawigacja.funkcje);
  await expect(page.locator('header nav a[aria-current="true"]')).toHaveCount(
    0,
  );
});

// (d) STRAŻNIK MILCZENIA (brief K12; ekstrakcja Etapu A, filar 1):
// żadna NAZWA funkcji z listy milczenia nie występuje w surowym HTML.
// Frazy dobrane jednoznacznie per język; celowo BEZ gołego „SMS" —
// granica modułu 2 legalnie mówi „ani SMS-em"/„per SMS" (uczciwa
// odmowa to nie obietnica); „e-mail" analogicznie legalny w granicach
// modułów 1 i 8.
const FRAZY_MILCZENIA = [
  // Sekwencje kontaktowe (silnik gotowy, brak przycisku UI).
  "sekwencje kontaktowe",
  "contact sequences",
  "kontaktsequenzen",
  // Granica — blokada osoby (brak przycisku UI).
  "blokada osoby",
  // WhatsApp (brak zgody platformy / SZKIELET).
  "whatsapp",
  // Integracje z kontami social do pozyskiwania (brak zgody platformy).
  "integracje z kontami social",
  "instagram",
  "tiktok",
  "facebook",
  "pinterest",
] as const;

for (const { adres, jezyk } of PRZYPADKI) {
  test(`MILCZENIE (${jezyk}): nazwy funkcji milczenia nieobecne w HTML na ${adres}`, async ({
    request,
  }) => {
    const odpowiedz = await request.get(adres);
    expect(odpowiedz.status()).toBe(200);
    const html = (await odpowiedz.text()).toLowerCase();
    for (const fraza of FRAZY_MILCZENIA) {
      expect(html, `HTML nie zawiera „${fraza}"`).not.toContain(fraza);
    }
  });
}

// (g) F9 — przejścia NIEOBECNE w Etapie B (rozstrzygnięcie 4 panelu:
// cel /funkcje/tresci nie istnieje w rejestrze → bramka linków
// w PrzejsciaFilarow zwraca null; sekcja nieobecna, nie „nieaktywna").
for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
  const k = komunikaty.FunkcjePozyskiwanie;
  test(`F9 (${jezyk}): sekcja przejść nieobecna w DOM na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);
    await expect(
      page.getByRole("link", { name: k.dalej, exact: true }),
    ).toHaveCount(0);
    await expect(page.locator('a[href$="/funkcje/tresci"]')).toHaveCount(0);
    // Stos main bez F9: nagłówek podstrony + 10 modułów + kierunek
    // + F8 + zamknięcie = 14 sekcji (okruszki to nav, nie section).
    await expect(page.locator("main > section")).toHaveCount(14);
  });
}

// (f) no-JS ×3: h1, moduł 1, granica modułu 10 i sekcja AI w surowym
// HTML (bramka: treść czytelna bez JS).
for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
  const k = komunikaty.FunkcjePozyskiwanie;
  test(`K12 bez JS (${jezyk}): h1, moduł 1, granica 10 i AI w surowym HTML`, async ({
    request,
  }) => {
    const odpowiedz = await request.get(adres);
    expect(odpowiedz.status()).toBe(200);
    const html = await odpowiedz.text();
    expect(html, "H1 w HTML bez JS").toContain(k.naglowek);
    expect(html, "nazwa modułu 1 w HTML bez JS").toContain(k.mod1_nazwa);
    expect(html, "PO CO TO modułu 1 w HTML bez JS").toContain(k.mod1_poco);
    expect(html, "granica modułu 10 w HTML bez JS").toContain(k.mod10_nie);
    expect(html, "treść sekcji AI w HTML bez JS").toContain(k.aiTresc);
  });
}

// (h) Reflow 320 px (WCAG 1.4.10): strona nie panoramuje poziomo —
// strażnik behawioralny (wzorzec cennik.spec). Kadr wymuszony
// niezależnie od projektu.
test.describe("reflow 320 px", () => {
  test.use({ viewport: { width: 320, height: 700 } });

  test("K12 nie panoramuje na 320 px; h1 w kadrze", async ({ page }) => {
    await page.goto("/funkcje/pozyskiwanie");
    const ramkaH1 = await page.locator("h1").boundingBox();
    expect(ramkaH1, "h1 ma ramkę").not.toBeNull();
    expect(
      ramkaH1!.x + ramkaH1!.width,
      "h1 w kadrze 320 px",
    ).toBeLessThanOrEqual(320);
    const przesuniecie = await page.evaluate(() => {
      window.scrollTo(300, 0);
      return window.scrollX;
    });
    expect(przesuniecie, "brak panoramy na 320 px").toBe(0);
  });
});

// (e) Strażnik „znak w znak": messages ↔ content/*/funkcje-pozyskiwanie.md
// (treść OBOWIĄZUJE; wzorzec filary/zlozenie.spec — normalizowane
// WYŁĄCZNIE białe znaki). Wyjątki udokumentowane:
// - mod2_poco: placeholder {minuty} porównywany PO podstawieniu
//   wartości z facts.json (D-B3);
// - okruszek: etykieta pochodzi z nagłówka filara 1
//   w content/*/filary.md (część opisowa „## Filar 1 — …"; nagłówek
//   stoi wersalikami, stąd porównanie bez rozróżniania wielkości).
test("K12: messages znak w znak z content (Etap B Fazy 4)", () => {
  for (const { jezyk, komunikaty } of PRZYPADKI) {
    const zrodlo = readFileSync(
      join(__dirname, "..", "content", jezyk, "funkcje-pozyskiwanie.md"),
      "utf8",
    ).replace(/\s+/g, " ");
    const filary = readFileSync(
      join(__dirname, "..", "content", jezyk, "filary.md"),
      "utf8",
    ).replace(/\s+/g, " ");

    for (const [pole, tresc] of Object.entries(
      komunikaty.FunkcjePozyskiwanie,
    )) {
      if (pole === "okruszek") {
        expect(
          filary.toLowerCase(),
          `content/${jezyk}/filary.md zawiera nazwę filara 1 „${tresc}"`,
        ).toContain(tresc.toLowerCase());
        continue;
      }
      const oczekiwane = pole === "mod2_poco" ? podstawMinuty(tresc) : tresc;
      expect(
        zrodlo,
        `content/${jezyk}/funkcje-pozyskiwanie.md zawiera FunkcjePozyskiwanie.${pole}`,
      ).toContain(oczekiwane);
    }
  }
});
