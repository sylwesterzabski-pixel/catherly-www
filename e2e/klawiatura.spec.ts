import { test, expect } from "@playwright/test";

/**
 * Bramka: Dostępność — pełne przejście klawiaturą: fokus widoczny,
 * kolejność logiczna (ADR-002; PLAN.md 4.2 pkt 4).
 * Test bazowy: po Tab fokus musi wylądować na elemencie interaktywnym
 * i być widoczny. Rozbudowa per sekcja w Definition of Done (Faza 4).
 */
test("klawiatura: Tab przenosi widoczny fokus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const aktywny = page.locator(":focus");
  // Na stronie z jakimkolwiek elementem interaktywnym fokus musi istnieć
  // i być widoczny. Strona bez żadnego fokusowalnego elementu nie jest
  // stroną — nagłówek z nawigacją powstaje w Fazie 4.
  await expect(aktywny).toBeVisible();
});
