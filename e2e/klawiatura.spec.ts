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

    // Fokus widoczny: obrys niepusty (rola-fokus, nigdy usunięty).
    const obrys = await aktywny.evaluate((el) => {
      const styl = getComputedStyle(el);
      return { styl: styl.outlineStyle, szerokosc: styl.outlineWidth };
    });
    expect(obrys.styl, `obrys fokusa na „${etykieta}"`).not.toBe("none");
    expect(
      parseFloat(obrys.szerokosc),
      `szerokość obrysu fokusa na „${etykieta}"`,
    ).toBeGreaterThan(0);
  }
});
