import type { Page } from "@playwright/test";

/**
 * OTWIERA MENU MOBILNE, JEŚLI JEST ZWINIĘTE (2.1, ADR-045).
 *
 * Od przebudowy nawigacji na stylistykę wzorca nagłówek na kadrze
 * ≤ 768 px pokazuje wyłącznie logo i hamburgera; pozycje i CTA siedzą
 * w zwiniętym panelu. To NIE jest usterka — tak zachowuje się wzorzec,
 * zmierzony i odtworzony co do wartości (skok pozycji 84,8 px, CTA
 * 310 × 46,4 px, panel rozwijany z nagłówka, przewijanie strony
 * niezablokowane).
 *
 * Testy, które asertują widoczność pozycji nawigacji, muszą więc na
 * wąskim kadrze najpierw menu OTWORZYĆ. Ta funkcja nie osłabia żadnej
 * asercji — przenosi tylko stronę do stanu, w którym pytanie „czy
 * pozycja jest widoczna" w ogóle ma sens.
 *
 * Na kadrze szerokim hamburgera nie ma (`display: none`), więc funkcja
 * nic nie robi i asercje biegną jak dotąd. Rozróżnienia dokonuje
 * WIDOCZNOŚĆ kontrolki, nie nazwa projektu Playwrighta — dzięki temu
 * działa też przy nowym kadrze, którego nikt jeszcze nie dodał.
 */
export async function otworzMenuJesliZwiniete(page: Page): Promise<boolean> {
  const hamburger = page.locator("header summary");
  if ((await hamburger.count()) === 0) return false;
  if (!(await hamburger.isVisible())) return false;
  const juzOtwarte = await page
    .locator("header details")
    .evaluate((el) => (el as HTMLDetailsElement).open);
  if (juzOtwarte) return true;
  await hamburger.click();
  return true;
}
