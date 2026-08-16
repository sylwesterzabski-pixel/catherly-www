#!/usr/bin/env node
/**
 * Adnotacja przy bramce wydajności — na czym mierzymy i jak czytać
 * wynik. Nie jest strażnikiem: NIGDY nie kończy się kodem różnym od 0.
 * Jego jedynym zadaniem jest, żeby czerwień na „/” nie została wzięta
 * za czerwień strony.
 *
 * Powód istnienia (rozstrzygnięcie właściciela 2026-08-16, po rozbiorze
 * render delay — docs/faza-4/render-delay-glowna.md): „strona zdrowa,
 * termometr zły". Bramka mierzy dziś przez HTTP/1.1 + gzip na
 * localhoście, gdzie każdy zasób to osobna runda na jednym połączeniu,
 * a symulacja Lighthouse dolicza te rundy do LCP mimo że strona realnie
 * maluje się w 88–97 ms. Na transporcie produkcyjnym (HTTP/2 + brotli,
 * tak serwuje Vercel) ten sam kod daje 1276 ms zamiast 1703 ms, a cztery
 * zrzuty Z6 kosztują 0 ms zamiast 153 ms.
 *
 * Bez tej adnotacji następna osoba przy czerwonym „/” zaczęłaby ciąć
 * stronę pod złe narzędzie — i to jest koszt, przed którym ten plik
 * stoi. Liczby pochodzą z rejestru (design/pipeline-obrazow.json →
 * osadzenieNaGlownej.pomiarTransportu), nie z tego pliku; jedno źródło
 * dla dokumentu, rejestru i logu CI.
 *
 * Wywołanie z `--po-czerwieni` powtarza interpretację pod nieudanym
 * pomiarem, żeby czytający log miał ją obok wyniku, a nie kilkaset
 * linii wyżej.
 */
import { readFileSync } from "node:fs";

const PO_CZERWIENI = process.argv.includes("--po-czerwieni");
const BAZA = (process.env.LHCI_BAZA || "").trim();
const PREVIEW = Boolean(BAZA);

const rejestr = JSON.parse(
  readFileSync(new URL("../design/pipeline-obrazow.json", import.meta.url), "utf8"),
);
const OSADZENIE = rejestr.osadzenieNaGlownej;
const P = OSADZENIE.pomiarTransportu;

const KRESKA = "─".repeat(68);

// Kontrakt tego pliku: adnotacja NIGDY nie zapala czerwieni. Gdyby
// rejestr stracił blok pomiarowy, wypisujemy o tym i wychodzimy zerem —
// inaczej komentarz zamieniłby się w bramkę i przesłonił prawdziwy wynik.
if (!P) {
  console.log(
    "\nBRAMKA WYDAJNOŚCI: brak bloku osadzenieNaGlownej.pomiarTransportu\n" +
      "w design/pipeline-obrazow.json — adnotacja o transporcie pomiaru\n" +
      "pominięta. Kontekst: docs/faza-4/render-delay-glowna.md.\n",
  );
  process.exit(0);
}

/** @param {string} etykieta @param {{bez:number,zZ6:number}} w */
function wiersz(etykieta, w) {
  const koszt = w.zZ6 - w.bez;
  const zapas = P.budzet - (OSADZENIE.wlaczone ? w.zZ6 : w.bez);
  return (
    "  " +
    etykieta.padEnd(24) +
    `${w.bez} ms`.padStart(9) +
    `${w.zZ6} ms`.padStart(10) +
    `${koszt >= 0 ? "+" : ""}${koszt} ms`.padStart(10) +
    `${zapas} ms`.padStart(11)
  );
}

console.log("");
console.log(KRESKA);
console.log(
  PREVIEW
    ? "BRAMKA WYDAJNOŚCI — TRYB PREVIEW (transport produkcyjny)"
    : "BRAMKA WYDAJNOŚCI — TRYB LOKALNY (HTTP/1.1 + gzip, localhost)",
);
console.log(KRESKA);

if (PREVIEW) {
  console.log(`Cel pomiaru: ${BAZA}`);
  console.log(
    "Zmienna LHCI_BAZA jest ustawiona, więc mierzymy wdrożenie Vercela\n" +
      "(HTTP/2 + brotli), a werdyktem jest MEDIANA z 3 przebiegów.\n" +
      "Strażnik celu pomiaru potwierdził wcześniej, że pod tym adresem\n" +
      "stoi strona Catherly z TEGO commita — inaczej ten krok by nie ruszył.",
  );
} else {
  console.log(
    "Zmienna repozytorium LHCI_BAZA nie jest ustawiona, więc mierzymy\n" +
      "build produkcyjny przez `npm run start` na runnerze. To NIE jest\n" +
      "transport produkcyjny: Vercel serwuje HTTP/2 + brotli, gdzie\n" +
      "multipleksowanie zdejmuje rundy sieciowe. Koszt to rundy, nie\n" +
      "kilobajty — brotli na HTTP/1.1 dał +3 ms, dopiero na HTTP/2 −150 ms.",
  );
}

console.log("");
console.log(
  "  " +
    "transport".padEnd(24) +
    "bez Z6".padStart(9) +
    "z Z6".padStart(10) +
    "koszt Z6".padStart(10) +
    "zapas".padStart(11),
);
console.log(wiersz("HTTP/1.1 + gzip", P.http1gzip));
console.log(wiersz("HTTP/2 + gzip", P.http2gzip));
console.log(wiersz("HTTP/2 + brotli (Vercel)", P.http2brotli));
console.log(
  `  (mediany LCP dla „/”, budżet ${P.budzet} ms; „zapas” liczony dla stanu` +
    ` osadzenia: ${OSADZENIE.wlaczone ? "WŁĄCZONE" : "wyłączone"})`,
);
if (!PREVIEW) {
  console.log(
    "  Liczby z rozbioru na laptopie. Runner GitHuba jest WOLNIEJSZY:\n" +
      "  wynik poniżej będzie wyższy niż w kolumnie HTTP/1.1 i to nie jest\n" +
      "  sprzeczność — 2026-08-16 na runnerze nawet trasa BEZ zrzutów Z6\n" +
      "  (/funkcje/pozyskiwanie) wypadła na 1800,08 ms. Przenoszalna jest\n" +
      "  RÓŻNICA między transportami, nie wartość bezwzględna.",
  );
}
console.log("");
console.log(
  `Osadzenie zrzutów Z6 na „/”: ${OSADZENIE.wlaczone ? "WŁĄCZONE" : "wyłączone"}` +
    " (design/pipeline-obrazow.json → osadzenieNaGlownej).",
);

if (!PREVIEW && OSADZENIE.wlaczone) {
  console.log("");
  console.log("⚠  CZERWIEŃ TERMOMETRU, NIE STRONY.");
  console.log(
    "   W tym trybie LCP na „/” przekroczy próg — i to jest stan\n" +
      "   OCZEKIWANY, przewidziany przez właściciela 2026-08-16. Strona\n" +
      "   maluje się realnie w 88–97 ms; z 1703 ms symulacji 795 ms to\n" +
      "   baseline Next + React (dwa chunki, zero kodu aplikacji), a 758 ms\n" +
      "   to podłoga protokołu HTTP/1.1.\n" +
      "\n" +
      "   NIE „naprawiaj” strony pod ten pomiar. Naprawą jest przeniesienie\n" +
      "   pomiaru na preview: docs/faza-4/bramka-na-preview.md.\n" +
      "   Rozbiór z liczbami: docs/faza-4/render-delay-glowna.md.",
  );
}

if (PO_CZERWIENI) {
  console.log("");
  console.log(KRESKA);
  console.log(
    PREVIEW
      ? "Pomiar na transporcie produkcyjnym nie przeszedł progu. Tu czerwień\n" +
          "dotyczy STRONY — instrument jest właściwy. Czytaj wynik dosłownie."
      : "Pomiar nie przeszedł progu w trybie lokalnym. Zanim cokolwiek\n" +
          "zmienisz w stronie: sprawdź w tabeli wyżej, czy różnica nie mieści\n" +
          "się w koszcie transportu. Termometr jest zły, dopóki LHCI_BAZA\n" +
          "jest puste.",
  );
  console.log(KRESKA);
  console.log("");
  process.exit(0);
}

console.log(KRESKA);
console.log("");
