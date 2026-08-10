import { test, expect } from "@playwright/test";

import pl from "../src/i18n/messages/pl.json";

/**
 * Bramka: Dostępność — pełne przejście klawiaturą: fokus widoczny,
 * kolejność logiczna (ADR-002; PLAN.md 4.2 pkt 4; brief K1: porządek
 * fokusa jest pierwszą cechą nawigacji, nie testem na końcu).
 * Kolejność (kontrakt K1): skip-link → logo → Funkcje → Cennik →
 * Dla kogo → Logowanie. Wskaźnik fokusa: obrys niepusty (token obrysu).
 */
const KOLEJNOSC = [
  pl.Nawigacja.przejdzDoTresci,
  "Catherly",
  pl.Nawigacja.funkcje,
  pl.Nawigacja.cennik,
  pl.Nawigacja.dlaKogo,
  pl.Nawigacja.logowanie,
] as const;

// Wyliczony kolor --kolor-rola-fokus = śliwka-700 (#5e4775) — asercja
// I2: obrys fokusa ma DOKŁADNIE kolor roli fokusa z tokenów, nie
// jakikolwiek niepusty obrys. Wartość oczekiwana testu, nie wizualna.
const KOLOR_FOKUSA = "rgb(94, 71, 117)";

test("klawiatura: skip-link pierwszy, potem logo → menu → Logowanie; fokus widoczny", async ({
  page,
}) => {
  await page.goto("/");

  for (const etykieta of KOLEJNOSC) {
    await page.keyboard.press("Tab");
    const aktywny = page.locator(":focus");

    await expect(aktywny, `kolejność fokusa: „${etykieta}"`).toHaveText(
      etykieta,
    );
    await expect(aktywny).toBeVisible();

    if (etykieta === pl.Nawigacja.przejdzDoTresci) {
      // Skip-link: przed fokusem schowany nad kadrem, po fokusie
      // odsłonięty (kontrakt K1: odsłona przez :focus).
      const ramka = await aktywny.boundingBox();
      expect(ramka, "skip-link ma ramkę po fokusie").not.toBeNull();
      expect(
        ramka!.y,
        "skip-link odsłonięty po fokusie (nie nad kadrem)",
      ).toBeGreaterThanOrEqual(0);
    }

    // Fokus widoczny: obrys niepusty (rola-fokus, nigdy usunięty)
    // w kolorze roli fokusa (śliwka-700) — nie dowolnym.
    const obrys = await aktywny.evaluate((el) => {
      const styl = getComputedStyle(el);
      return {
        styl: styl.outlineStyle,
        szerokosc: styl.outlineWidth,
        kolor: styl.outlineColor,
      };
    });
    expect(obrys.styl, `obrys fokusa na „${etykieta}"`).not.toBe("none");
    expect(
      parseFloat(obrys.szerokosc),
      `szerokość obrysu fokusa na „${etykieta}"`,
    ).toBeGreaterThan(0);
    expect(obrys.kolor, `kolor obrysu fokusa na „${etykieta}"`).toBe(
      KOLOR_FOKUSA,
    );
  }
});

test("skip-link: przed fokusem poza kadrem; fokus + Enter prowadzi do #tresc", async ({
  page,
}) => {
  await page.goto("/");
  const skipLink = page.getByRole("link", {
    name: pl.Nawigacja.przejdzDoTresci,
    exact: true,
  });

  // PRZED fokusem: schowany w całości NAD kadrem (inset-block-start
  // ujemny) — dolna krawędź ramki nie sięga viewportu.
  const przed = await skipLink.boundingBox();
  expect(przed, "skip-link ma ramkę przed fokusem").not.toBeNull();
  expect(
    przed!.y,
    "skip-link nad kadrem przed fokusem (y ujemny)",
  ).toBeLessThan(0);
  expect(
    przed!.y + przed!.height,
    "skip-link W CAŁOŚCI poza kadrem przed fokusem",
  ).toBeLessThanOrEqual(0);

  // Aktywacja: pierwszy Tab → fokus na skip-linku; Enter → przeskok
  // do celu #tresc (kotwica; location.hash po nawigacji).
  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#tresc$/);
  // Cel przeskoku istnieje i jest treścią strony (main#tresc).
  await expect(page.locator("main#tresc")).toBeVisible();
});
