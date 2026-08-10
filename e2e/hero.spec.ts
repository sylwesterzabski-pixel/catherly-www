import { test, expect } from "@playwright/test";

import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";

/**
 * K2 hero + K9 pasek potwierdzeń (handoff-k2-hero.md, po panelu
 * 2026-08-10): parytet treści z messages, jedyny h1 (element LCP),
 * CTA do /funkcje per język (ADR-023), empiryczne asercje pary
 * hover CTA (rola interakcja-aktywna) i przełączenia układu K9
 * (pion bez separatorów poniżej 48rem — decyzja właściciela).
 */
const PRZYPADKI = [
  { adres: "/", jezyk: "pl", prefiks: "", komunikaty: pl },
  { adres: "/en", jezyk: "en", prefiks: "/en", komunikaty: en },
  { adres: "/de", jezyk: "de", prefiks: "/de", komunikaty: de },
] as const;

// Wyliczone kolory ról CTA (asercja empiryczna jak I2 w klawiatura.spec
// — dokładny kolor roli, nie „jakikolwiek inny"): spoczynek
// rola-interakcja = terakota-600 #bb351d; hover/active
// rola-interakcja-aktywna = terakota-700 #a21c0a (para 7,02:1 — panel K2).
const KOLOR_CTA = "rgb(187, 53, 29)";
const KOLOR_CTA_AKTYWNY = "rgb(162, 28, 10)";

for (const { adres, jezyk, prefiks, komunikaty } of PRZYPADKI) {
  test(`hero (${jezyk}): treść z messages, jedyny h1, CTA → /funkcje na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    // Jedyny h1 strony = H1 hero (kontrakt K2: element LCP).
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText(komunikaty.Hero.naglowek);

    // Sekcja hero opisana nagłówkiem (aria-labelledby → h1).
    const hero = page.locator('section[aria-labelledby="hero-h1"]');
    await expect(hero).toContainText(komunikaty.Hero.podtytul);

    // CTA: link (nie button — zero JS), href per język.
    const cta = hero.getByRole("link", {
      name: komunikaty.Hero.cta,
      exact: true,
    });
    await expect(cta).toHaveAttribute("href", `${prefiks}/funkcje`);

    // K9: lista potwierdzeń — dokładnie dwie pozycje z messages.
    const potwierdzenia = hero.getByRole("list");
    await expect(potwierdzenia.getByRole("listitem")).toHaveCount(2);
    await expect(potwierdzenia).toContainText(komunikaty.Hero.potwierdzenieUE);
    await expect(potwierdzenia).toContainText(
      komunikaty.Hero.potwierdzenieRezygnacja,
    );
  });
}

test("hero: CTA hover/active przechodzi na rolę interakcja-aktywna", async ({
  page,
}) => {
  await page.goto("/");
  const cta = page.getByRole("link", { name: pl.Hero.cta, exact: true });

  const spoczynek = await cta.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  expect(spoczynek, "CTA w spoczynku: rola-interakcja").toBe(KOLOR_CTA);

  await cta.hover();
  const najechany = await cta.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  expect(najechany, "CTA po najechaniu: rola-interakcja-aktywna").toBe(
    KOLOR_CTA_AKTYWNY,
  );
});

test("K9: pion bez separatorów na 390 px, poziom z kreską od 48rem", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const lista = page
    .locator('section[aria-labelledby="hero-h1"]')
    .getByRole("list");
  const kierunek = await lista.evaluate(
    (el) => getComputedStyle(el).flexDirection,
  );
  // border-inline-start w LTR = border-left; na mobile separator ZNIKA
  // (osierocona kreska po zawinięciu — blokujący 3 panelu K2).
  const drugaPozycja = lista.getByRole("listitem").nth(1);
  const szerokoscKreski = await drugaPozycja.evaluate((el) =>
    parseFloat(getComputedStyle(el).borderLeftWidth),
  );

  if (testInfo.project.name === "mobile-390") {
    expect(kierunek, "K9 na 390 px: układ pionowy").toBe("column");
    expect(szerokoscKreski, "K9 na 390 px: bez separatora").toBe(0);
  } else {
    expect(kierunek, "K9 na desktopie: układ poziomy").toBe("row");
    expect(szerokoscKreski, "K9 na desktopie: separator rola-kreska")
      .toBeGreaterThan(0);
  }
});

test("hero bez JS: H1 i potwierdzenia w surowym HTML (LCP = tekst)", async ({
  request,
}) => {
  const odpowiedz = await request.get("/");
  expect(odpowiedz.status()).toBe(200);
  const html = await odpowiedz.text();
  expect(html, "H1 w HTML bez JS").toContain(pl.Hero.naglowek);
  expect(html, "potwierdzenia w HTML bez JS").toContain(
    pl.Hero.potwierdzenieUE,
  );
});
