#!/usr/bin/env node
/**
 * Hook pre-commit, krok axe (PLAN.md sekcja 5: „axe + linter tokenów
 * + linter liczb"). Uruchamiany, gdy commit zmienia src/.
 * Wymaga zbudowanej strony i przeglądarki Playwright — bez nich commit
 * zmian w src/ jest zablokowany (bramka nie jest pomijana po cichu).
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

/* L-OPS-04 (WWW/089 krok 0b): katalog budowania pochodzi ze zmiennej
   WWW_DIST, domyślnie `.next` — ta sama, którą czyta `next.config.ts`.
   Bez tego wiersza bramka czytałaby `.next` także po budowaniu
   pomiarowym i czerwieniałaby z powodu, który NIE MA NIC WSPÓLNEGO
   z kodem — czyli byłaby czerwienią mylącą, gorszą od żadnej.
   Wykryte pomiarem: po pierwszym budowaniu do `.next-pomiar` bramki
   „Linki" i „No-JS" zapaliły się, choć zmiana ich nie dotyczyła. */
const KATALOG_BUDOWANIA = process.env.WWW_DIST || ".next";

if (!existsSync(join(ROOT, KATALOG_BUDOWANIA))) {
  console.error(
    "✗ axe (pre-commit): brak builda. Zmieniasz src/ — uruchom najpierw:\n" +
      "    npm run build\n" +
      "  Commit zablokowany do czasu przejścia axe na zbudowanej stronie."
  );
  process.exit(1);
}

try {
  execSync("npx playwright test e2e/axe.spec.ts", { stdio: "inherit" });
} catch {
  console.error(
    "✗ axe (pre-commit): błędy dostępności albo brak przeglądarki Playwright.\n" +
      "  Przeglądarka: npx playwright install chromium\n" +
      "  Błędy dostępności naprawia się, nie omija (CLAUDE.md)."
  );
  process.exit(1);
}
console.log("axe (pre-commit): zielony.");
