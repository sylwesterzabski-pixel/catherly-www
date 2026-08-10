import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Bramka: Dostępność — axe: zero błędów (ADR-002; PLAN.md sekcja 5).
 * Skan każdej istniejącej trasy; nowe trasy dopisuje się do listy
 * w ramach Definition of Done sekcji (PLAN.md 4.2).
 */
const TRASY = [
  "/",
  "/en",
  "/de",
  // B1(a) — strony placeholderowe (pl bez prefiksu, /en, /de).
  "/funkcje",
  "/cennik",
  "/dla-kogo",
  "/login",
  "/en/funkcje",
  "/en/cennik",
  "/en/dla-kogo",
  "/en/login",
  "/de/funkcje",
  "/de/cennik",
  "/de/dla-kogo",
  "/de/login",
];

for (const trasa of TRASY) {
  test(`axe: zero błędów na ${trasa}`, async ({ page }) => {
    await page.goto(trasa);
    const wyniki = await new AxeBuilder({ page }).analyze();
    expect(wyniki.violations).toEqual([]);
  });
}
