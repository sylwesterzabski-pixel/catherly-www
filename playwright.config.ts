import { defineConfig, devices } from "@playwright/test";

/**
 * ADRES BADANEGO SERWERA — parametryzowany, z domyślną wartością.
 *
 * Domyślnie `http://localhost:3000`, czyli bez zmian dla CI i dla
 * zwykłego `npx playwright test`. Zmienna `WWW_BAZA` pozwala skierować
 * przebieg na inny port BEZ EDYTOWANIA TEGO PLIKU.
 *
 * Powstało z realnej potrzeby, nie z upodobania do konfigurowalności:
 * port 3000 bywa zajęty przez proces właściciela (zakaz 7 zabrania go
 * zabijać), a gdy taki proces serwuje starą kompilację, KAŻDY przebieg
 * — łącznie z hakiem pre-commit — mierzy stronę bez arkuszy i sypie
 * fałszywymi błędami dostępności. Do 2026-08-27 obchodziło się to
 * ręczną podmianą dwóch linijek tutaj i przywróceniem ich po przebiegu.
 *
 * To była gorsza droga i warto zapisać dlaczego: podmiana pliku
 * śledzonego przez gita ZALEŻY OD TEGO, ŻE KTOŚ PAMIĘTA go przywrócić.
 * Jedno zapomnienie i konfiguracja z portem roboczym wchodzi do commita,
 * a CI zaczyna mierzyć adres, którego tam nie ma. Zmienna środowiskowa
 * nie zostawia śladu w drzewie roboczym, więc nie ma czego zapomnieć.
 *
 * Użycie:  WWW_BAZA=http://localhost:3100 npx playwright test
 *          WWW_BAZA=http://localhost:3100 git commit -m "…"
 */
const BAZA = process.env.WWW_BAZA ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0, // flaki naprawia się, nie maskuje powtórkami (PLAN.md sekcja 9)
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BAZA,
    trace: "retain-on-failure",
  },
  projects: [
    {
      // Mobile-first od 390 px (CLAUDE.md; STRATEGIA.md pkt 14)
      name: "mobile-390",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run start",
    url: BAZA,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
