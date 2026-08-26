import { readFileSync } from "node:fs";
import { join } from "node:path";

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
// — dokładny kolor roli, nie „jakikolwiek inny"). Kolejno: terakota-600/700
// (Etap A) → granat kancelarii (ADR-031) → wartości poniżej.
// ADR-032: hero stoi w tonie `data-ton="ciemny"`, więc CTA bierze rolę
// z warstwy inwersji — wypełnienie --interakcja-inwersji (złoto #7e6425).
// ADR-034: hover to --interakcja-aktywna-inwersji (złoto PRZYCIEMNIONE
// #6e5220), nie złoto jasne. Poprzednia wartość dawała kremowej etykiecie
// 2,07:1 przy progu 4,5:1 — jasne na jasnym; teraz 6,30:1. Kierunek:
// interakcja pod palcem CIEMNIEJE w obu warstwach.
const KOLOR_CTA = "rgb(126, 100, 37)";
const KOLOR_CTA_AKTYWNY = "rgb(110, 82, 32)";

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
    // role="list" JAWNIE w atrybucie (kontrakt Safari/VoiceOver przy
    // list-style: none — handoff K2/K9; getByRole łapie też rolę
    // niejawną, więc atrybut pilnowany osobno — adwersarz Etapu C,
    // mutacja b).
    const potwierdzenia = hero.getByRole("list");
    await expect(potwierdzenia).toHaveAttribute("role", "list");
    // DWÓJKA — STATUS NIEROZSTRZYGNIĘTY, i to jest tu zapisane zamiast
    // domysłu. Zbiór źródłowy istnieje (`Hero.potwierdzenie*` liczy 2), ale
    // nie ma zapisanego rozstrzygnięcia w rodzaju O-7, które mówiłoby, czy
    // trzecie potwierdzenie ma wchodzić DECYZJĄ, czy samo za treścią. Do
    // czasu odpowiedzi literał zostaje: nierozstrzygnięte zamienione na
    // liczbę z pliku przepuściłoby zmianę, która może wymagać decyzji.
    // Pozycja: docs/faza-2/mapa-klas-straznikow.md
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
  // Zawężenie do sekcji hero (Etap F): S13 zamknięcie niesie CTA
  // o tej samej etykiecie i hrefie — bez zawężenia locator łapał
  // dwa elementy (strict mode). Asercje pary hover bez zmian.
  const cta = page
    .locator('section[aria-labelledby="hero-h1"]')
    .getByRole("link", { name: pl.Hero.cta, exact: true });

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

for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
  test(`hero bez JS (${jezyk}): H1, potwierdzenia i role=list w surowym HTML`, async ({
    request,
  }) => {
    const odpowiedz = await request.get(adres);
    expect(odpowiedz.status()).toBe(200);
    const html = await odpowiedz.text();
    expect(html, "H1 w HTML bez JS").toContain(komunikaty.Hero.naglowek);
    expect(html, "potwierdzenia w HTML bez JS").toContain(
      komunikaty.Hero.potwierdzenieUE,
    );
    // Atrybut w surowym HTML — strażnik semantyki listy bez DOM-u
    // (adwersarz Etapu C, mutacja b). Od przeglądu role="list"
    // (Etap D) jawną rolę mają też listy nagłówka i stopki, więc
    // samo toContain('role="list"') przeszłoby nawet PO zdjęciu roli
    // z K9 — nie potrafiłoby już zaczerwienić. Sprawdzamy więc
    // znacznik <ul>, który FAKTYCZNIE otacza potwierdzenia.
    const doPotwierdzenia = html.slice(
      0,
      html.indexOf(komunikaty.Hero.potwierdzenieUE),
    );
    const otwarcieListy = doPotwierdzenia.slice(
      doPotwierdzenia.lastIndexOf("<ul"),
    );
    expect(otwarcieListy, "role=list na liście potwierdzeń K9").toContain(
      'role="list"',
    );
  });
}

// Strażnik INTENCJI panelu K2 (decyzja właściciela 2026-08-11):
// H1 ≤ 3 linie na desktopie we wszystkich językach. Pilnuje skutku,
// nie wartości 22ch — złapie też przyszłą zmianę treści (content)
// lub kroju pisma (ADR-027), która przełamie H1 na 4 linie.
// Wireframe glowna.md S2: „H1 (2–3 linie)". Na 390 px EN/DE mają
// 4 linie (dewiacja odnotowana w handoffie) — test tylko desktop.
for (const { adres, jezyk } of PRZYPADKI) {
  test(`hero (${jezyk}): H1 ≤ 3 linie na desktopie`, async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "intencja panelu dotyczy desktopu (mobile: dewiacja w handoffie)",
    );
    await page.goto(adres);
    const linie = await page.locator("h1").evaluate((el) => {
      const styl = getComputedStyle(el);
      return Math.round(
        el.getBoundingClientRect().height / parseFloat(styl.lineHeight),
      );
    });
    expect(linie, `H1 (${jezyk}) ma ≤ 3 linie`).toBeLessThanOrEqual(3);
  });
}

// Strażnik „znak w znak": messages ↔ content/naglowek.md (treść
// OBOWIĄZUJE). Adwersarz Etapu C, mutacja c: podmiana półpauzy DE
// w messages była niewykrywalna — testy porównywały DOM z messages
// (samoodniesienie). Normalizowane są WYŁĄCZNIE białe znaki (md
// zawija wiersze); litery, pauzy i interpunkcja muszą być identyczne.
test("treść hero: messages znak w znak z content/*/naglowek.md", () => {
  for (const { jezyk, komunikaty } of PRZYPADKI) {
    const zrodlo = readFileSync(
      join(__dirname, "..", "content", jezyk, "naglowek.md"),
      "utf8",
    ).replace(/\s+/g, " ");
    for (const [pole, tresc] of Object.entries(komunikaty.Hero)) {
      expect(
        zrodlo,
        `content/${jezyk}/naglowek.md zawiera treść pola „${pole}"`,
      ).toContain(tresc);
    }
  }
});
