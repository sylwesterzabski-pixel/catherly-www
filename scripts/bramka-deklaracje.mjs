#!/usr/bin/env node
/**
 * ZAPADKA nad bramką deklaracji długości — trzeci kształt (właściciel, WWW/026,
 * 2026-08-24, rozstrzygnięcie pozycji T44).
 *
 * DLACZEGO ISTNIEJE. Tor 9 przysłał zadanie CI w kształcie ŻÓŁTYM
 * (`continue-on-error: true`). Uzasadnienie było trafne — linter jest czerwony
 * na dziesięciu istniejących rozjazdach, więc bramka blokująca od pierwszego
 * dnia zatrzymałaby każdy commit, także dokumentacyjny, czyli „uczyłaby, jak ją
 * obchodzić". Ale `continue-on-error` wymienia z nazwy ZAKAZ 3 kanonu strony
 * jako zamianę czerwieni na ciszę. Dwa dostępne kształty łamały coś istotnego;
 * ten jest trzecim i nie łamie żadnego:
 *   · zero `continue-on-error` — zadanie jest zwyczajnie czerwone albo zielone;
 *   · zielone dziś, więc nie uczy obchodzenia;
 *   · REGRES BLOKOWANY OD PIERWSZEGO DNIA — jedenaste naruszenie zapala czerwień.
 *
 * CZEGO TA ZAPADKA NIE ROBI — granica zadeklarowana wprost, żeby nikt nie
 * odczytał zieleni szerzej, niż wolno:
 *   · NIE mówi, że deklaracje są poprawne. Mówi, że NIE JEST GORZEJ NIŻ BYŁO.
 *     Dziesięć rozjazdów stoi i jest wypisane w `deklaracje-baseline.json`
 *     oraz w rejestrze (T44) jako kolejka napraw. Zapadka bez kolejki napraw
 *     byłaby konserwowaniem długu.
 *   · NIE pilnuje niczego, czego nie pilnuje `lint-deklaracje.mjs` — jego
 *     cztery granice (próg znaków, sąsiedztwo deklaracji, sumy kluczy, podmiana
 *     brzmienia o tej samej długości) obowiązują tu bez zmian.
 *
 * SPADEK PONIŻEJ PROGU TEŻ JEST CZERWIENIĄ — i to jest mechanizm, nie
 * niedoróbka. Gdyby naprawa zostawiała próg nietknięty, próg zostałby zapasem,
 * w który wolno wrócić: ktoś naprawia dwa rozjazdy, a ktoś inny dokłada dwa
 * nowe i bramka milczy. Czerwień przy spadku wymusza obniżenie progu W TYM
 * SAMYM COMMICIE co naprawa — inaczej zapadka zapada się tylko z jednej strony.
 *
 * SKRYPTU `lint-deklaracje.mjs` NIE MODYFIKUJĘ. Przyszedł z toru 9 i wróci tam
 * przy następnym imporcie; rozjazd kopii kosztowałby więcej niż to opakowanie.
 */
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const KATALOG = dirname(fileURLToPath(import.meta.url));
const PLIK_PROGU = join(KATALOG, "deklaracje-baseline.json");
const LINTER = join(KATALOG, "lint-deklaracje.mjs");

function stop(powod) {
  console.error(`\n✗ Bramka deklaracji (zapadka) CZERWONA: ${powod}`);
  process.exit(1);
}

let prog;
try {
  const dane = JSON.parse(readFileSync(PLIK_PROGU, "utf8"));
  prog = dane.naruszen;
} catch (e) {
  stop(`nie da się odczytać progu z ${PLIK_PROGU} — ${e.message}`);
}
if (!Number.isInteger(prog) || prog < 0) {
  stop(`próg w ${PLIK_PROGU} nie jest liczbą całkowitą nieujemną (odczytano: ${JSON.stringify(prog)})`);
}

const wynik = spawnSync(process.execPath, [LINTER], { encoding: "utf8" });
if (wynik.error) stop(`nie udało się uruchomić lintera — ${wynik.error.message}`);

const wyjscie = `${wynik.stdout ?? ""}${wynik.stderr ?? ""}`;
process.stdout.write(wyjscie);

// Liczba naruszeń: 0 przy kodzie 0, inaczej odczytana z komunikatu lintera.
// Gdy kod jest niezerowy, a liczby nie da się odczytać — CZERWIEŃ, nigdy cisza.
let naruszen;
if (wynik.status === 0) {
  naruszen = 0;
} else {
  const m = wyjscie.match(/CZERWONA:\s*(\d+)\s+naruszeń/);
  if (!m) {
    stop(
      `linter zakończył się kodem ${wynik.status}, ale liczby naruszeń nie da się odczytać z jego wyjścia.\n` +
        `  To NIE jest zieleń — zapadka nie potrafi porównać czegoś, czego nie zmierzyła.\n` +
        `  Prawdopodobna przyczyna: zmiana formatu komunikatu w lint-deklaracje.mjs.`
    );
  }
  naruszen = Number(m[1]);
}

console.log(`\n── ZAPADKA ─────────────────────────────────────────────────`);
console.log(`  naruszeń teraz : ${naruszen}`);
console.log(`  próg (baseline): ${prog}  ← ${PLIK_PROGU.replace(/.*\/(?=scripts\/)/, "")}`);

if (naruszen > prog) {
  console.error(
    `\n  REGRES: ${naruszen - prog} naruszeń ponad próg.\n` +
      `  Napraw nowe rozjazdy albo — jeśli deklaracja opisuje sumę kluczy —\n` +
      `  dodaj wpis do content/deklaracje-zlozone.json.\n` +
      `  Podniesienie progu NIE JEST rozwiązaniem: zapadka chodzi tylko w dół.`
  );
  stop(`${naruszen} naruszeń przy progu ${prog}`);
}

if (naruszen < prog) {
  console.error(
    `\n  POSTĘP NIEZAPISANY: naprawiono ${prog - naruszen}, a próg nadal stoi na ${prog}.\n` +
      `  Obniż "naruszen" do ${naruszen} w ${PLIK_PROGU.replace(/.*\/(?=scripts\/)/, "")}\n` +
      `  i usuń naprawione pozycje z listy — W TYM SAMYM COMMICIE co naprawa.\n` +
      `  Próg zostawiony wyżej niż stan faktyczny jest zapasem, w który wolno wrócić:\n` +
      `  ktoś naprawia dwa rozjazdy, ktoś inny dokłada dwa nowe, a bramka milczy.`
  );
  stop(`próg ${prog} jest wyższy niż stan faktyczny ${naruszen}`);
}

console.log(`  werdykt        : ZIELONA — nie jest gorzej niż było.`);
console.log(
  `\n  UWAGA, ŻEBY NIE CZYTAĆ TEJ ZIELENI SZERZEJ: ${prog} rozjazdów NADAL STOI.\n` +
    `  To nie jest „deklaracje są poprawne", tylko „nie przybyło nowych".\n` +
    `  Kolejka napraw: scripts/deklaracje-baseline.json oraz rejestr, poz. T44.`
);
