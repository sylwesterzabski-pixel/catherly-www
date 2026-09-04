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
    {
      /* KADR SZEROKI — zamknięcie pozycji T57 (ADR-056).
         ⚠ TEN PROJEKT ISTNIEJE, BO MUTACJA MILCZAŁA. Przy dowodzeniu
         strażnika układu filarów (WWW/080) wstawiono `order: 2` do bloku
         `@media (min-width: 90rem)` i spodziewano się czerwieni — suita
         dała 18 passed. Ta sama mutacja w bloku 48,0625rem zapaliła
         strażnika natychmiast. Powód: `devices["Desktop Chrome"]` to
         kadr 1280 × 720, a nasz górny próg układu to 90rem = 1440 px,
         więc ŻADEN przebieg nigdy nie wchodził w reguły tego progu.

         Milcząca mutacja jest sygnałem o ZASIĘGU POMIARU, nie o
         strażniku — i dopóki tego kadru nie było, każde zdanie „strażnik
         udowodniony" dotyczyło innej szerokości niż ta, o której mowa.

         1440 × 900, nie więcej: to kadr, na którym mierzony jest wzorzec
         i na którym robione są zrzuty odbioru, więc bramka pilnuje tego
         samego stanu, który się ogląda. */
      name: "desktop-wide",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command: "npm run start",
    url: BAZA,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
