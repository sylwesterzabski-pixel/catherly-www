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

// Wyliczony kolor --kolor-rola-akcent = terakota-500 (#e65b3d) —
// decyzja wiążąca panelu K4 (a): marker ul jako dekoracja.
const KOLOR_MARKERA = "rgb(230, 91, 61)";

for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
  test(`filary (${jezyk}): treść z messages i struktura nagłówków na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);

    // Struktura nagłówków treści: 1×h1 (hero) + 5×h2 w main
    // (4 filary + S9 sr-only); nagłówki sekcji stopki poza main.
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main h2")).toHaveCount(5);

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

test("K4: zebra przez order — tylko na desktopie, DOM zawsze tekst przed obrazem", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const filar2 = page.locator("section", {
    has: page.getByRole("heading", {
      name: pl.Filary.filar2.naglowek,
      exact: true,
    }),
  });
  // Obraz (ramka aria-hidden) to ostatnie dziecko układu — w DOM
  // ZAWSZE po tekście (czytniki i 390 px czytają tekst najpierw).
  const uklad = filar2.locator("div > div").first();
  const obraz = uklad.locator("> div").last();
  const orderObrazu = await obraz.evaluate(
    (el) => getComputedStyle(el).order,
  );
  const displayUkladu = await uklad.evaluate(
    (el) => getComputedStyle(el).display,
  );

  if (testInfo.project.name === "mobile-390") {
    expect(displayUkladu, "390 px: bez siatki — naturalny przepływ").toBe(
      "block",
    );
    expect(orderObrazu, "390 px: order nieaktywny").toBe("0");
  } else {
    expect(displayUkladu, "desktop: siatka dwukolumnowa").toBe("grid");
    expect(orderObrazu, "desktop: filar 2 z obrazem po lewej (order 1)").toBe(
      "1",
    );
  }
});

test("K4: marker konkretów w roli akcentu (decyzja panelu a)", async ({
  page,
}) => {
  await page.goto("/");
  const pierwszyKonkret = page
    .getByRole("listitem")
    .filter({ hasText: pl.Filary.filar1.konkret1 });
  const kolorMarkera = await pierwszyKonkret.evaluate(
    (el) => getComputedStyle(el, "::marker").color,
  );
  expect(kolorMarkera, "::marker w --kolor-rola-akcent").toBe(KOLOR_MARKERA);
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
