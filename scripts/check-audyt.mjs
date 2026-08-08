#!/usr/bin/env node
/**
 * Bramka: Nieodwracalne (ADR-018 — nadrzędny wobec wszystkich ADR-ów).
 * Wdrożenie produkcyjne wymaga aktualnego raportu audytu nieodwracalnych
 * w docs/audyt/ dla audytowanego commita, z zerem statusów NIESPEŁNIONE
 * i NIESPRAWDZONE (NIESPRAWDZONE liczy się jak NIESPEŁNIONE).
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const AUDYT_DIR = join(ROOT, "docs", "audyt");
const commit = execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();

if (!existsSync(AUDYT_DIR)) {
  console.error("✗ Brak katalogu docs/audyt/ (artefakt obowiązkowy per ADR-018).");
  process.exit(1);
}

const raporty = readdirSync(AUDYT_DIR).filter((f) => f.endsWith(".md"));
const dlaCommita = raporty.filter((f) =>
  readFileSync(join(AUDYT_DIR, f), "utf8").includes(commit)
);

if (dlaCommita.length === 0) {
  console.error(
    `✗ Brak raportu audytu nieodwracalnych dla commita ${commit.slice(0, 12)}…\n` +
      "  Bez aktualnego raportu wdrożenie produkcyjne jest zablokowane (ADR-018 pkt 4).\n" +
      "  Bramka CZERWONA."
  );
  process.exit(1);
}

let blokady = 0;
for (const plik of dlaCommita) {
  const tresc = readFileSync(join(AUDYT_DIR, plik), "utf8");
  for (const status of ["NIESPEŁNIONE", "NIESPRAWDZONE"]) {
    // Linia stwierdzająca status pozycji audytu (nie nagłówek legendy).
    const trafienia = tresc.split("\n").filter((l) => l.includes(`status: ${status}`));
    if (trafienia.length > 0) {
      console.error(`✗ ${plik}: ${trafienia.length} pozycji ze statusem ${status}.`);
      blokady += trafienia.length;
    }
  }
}

if (blokady > 0) {
  console.error(
    "\nNieodwracalne: bramka CZERWONA. NIESPRAWDZONE liczy się jak NIESPEŁNIONE.\n" +
      "Wyjątek wymaga zapisanej decyzji o przyjęciu ryzyka z podpisem właściciela\n" +
      "produktu i terminem powrotu (ADR-018 pkt 4)."
  );
  process.exit(1);
}
console.log(`Nieodwracalne: zielone (raport dla ${commit.slice(0, 12)}… bez blokad).`);
