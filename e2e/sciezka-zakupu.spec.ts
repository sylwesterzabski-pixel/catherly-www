import { test, expect } from "@playwright/test";

/**
 * Bramka: E2E — cennik → płatność (test mode) → konto → zalogowana
 * aplikacja (PLAN.md sekcja 5; STRATEGIA.md pkt 48).
 * Ścieżka powstaje w Fazach 4–5. Test opisuje docelową drogę i jest
 * CZERWONY, dopóki ścieżka nie istnieje — stan oczekiwany, nie do
 * pominięcia (żadnych test.skip: bramka albo nie istnieje).
 */
test("ścieżka zakupu: cennik → płatność → konto → aplikacja", async ({ page }) => {
  const odpowiedz = await page.goto("/cennik");
  expect(odpowiedz?.status(), "istnieje strona /cennik").toBe(200);

  // Kroki płatności testowej Stripe, utworzenia konta i wejścia do
  // aplikacji zostaną dopisane w Fazie 5 (wymagają środowiska testowego
  // Stripe i decyzji o app.catherly.com).
  await expect(page.getByRole("link", { name: /wybierz plan/i }).first()).toBeVisible();
});
