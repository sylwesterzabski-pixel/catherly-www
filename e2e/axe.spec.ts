import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Bramka: Dostępność — axe: zero błędów (ADR-002; PLAN.md sekcja 5).
 * Skan każdej istniejącej trasy; nowe trasy dopisuje się do listy
 * w ramach Definition of Done sekcji (PLAN.md 4.2).
 */
const TRASY = [
  "/nie-znaleziono",
  "/en/nie-znaleziono",
  "/de/nie-znaleziono",
  "/",
  "/en",
  "/de",
  // B1(a) — pl bez prefiksu, /en, /de. Faza 4, Etap D: /funkcje
  // i /dla-kogo NIE są już placeholderami (StronaWBudowie) — to
  // strony właściwe, skanowane tym samym wpisem.
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
  // Faza 4, Etap B — wzorcowa podstrona funkcji (K12).
  "/funkcje/pozyskiwanie",
  "/en/funkcje/pozyskiwanie",
  "/de/funkcje/pozyskiwanie",
  // Faza 4, Etap C — pozostałe podstrony funkcji (szablon K12).
  "/funkcje/tresci",
  "/en/funkcje/tresci",
  "/de/funkcje/tresci",
  "/funkcje/zespol",
  "/en/funkcje/zespol",
  "/de/funkcje/zespol",
  "/funkcje/wyniki",
  "/en/funkcje/wyniki",
  "/de/funkcje/wyniki",
];

for (const trasa of TRASY) {
  test(`axe: zero błędów na ${trasa}`, async ({ page }) => {
    await page.goto(trasa);
    const wyniki = await new AxeBuilder({ page }).analyze();
    expect(wyniki.violations).toEqual([]);
  });
}
