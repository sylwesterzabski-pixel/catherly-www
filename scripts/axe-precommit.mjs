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

if (!existsSync(join(ROOT, ".next"))) {
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
