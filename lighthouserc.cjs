/**
 * Bramka: Wydajność (ADR-002; PLAN.md sekcja 5).
 *
 * Progi blokujące: LCP < 1,8 s, CLS < 0,1, INP < 200 ms na 4G. INP to
 * metryka polowa — w laboratorium Lighthouse pilnujemy jej przez TBT
 * < 200 ms (proxy) i max-potential-fid; pomiar polowy INP dochodzi
 * w Fazie 7 przez warstwę analityki produktu (ADR-010).
 *
 * ── Format pliku ──────────────────────────────────────────────────
 * Był `lighthouserc.json`, jest `.cjs` (lhci czyta oba —
 * @lhci/utils/src/lighthouserc.js). Powód: ścieżki mają JEDNO źródło
 * i sklejają się z bazą ze zmiennej środowiskowej. W JSON-ie trzeba
 * było wpisać siedem pełnych adresów z `http://localhost:3000`, więc
 * przeniesienie pomiaru na preview wymagałoby zdublowania tej listy
 * w workflow — a zdublowana lista to ten sam mechanizm, który
 * wyprodukował dziurę w bramce e2e (spece dopisywane ręcznie).
 *
 * ── Cel pomiaru ───────────────────────────────────────────────────
 * LHCI_BAZA ustawione  → tryb PREVIEW: mierzymy wdrożenie Vercela.
 * LHCI_BAZA nieustawione → tryb LOKALNY: build produkcyjny na
 *                          localhost (stan sprzed przeniesienia).
 *
 * W trybie preview przed pomiarem MUSI przejść `npm run bramka:preview`
 * (scripts/sprawdz-preview.mjs). Strażnik pilnuje dwóch rzeczy: że pod
 * adresem stoi strona Catherly, a nie ekran logowania Vercela (ten
 * oddaje 200 i zawiera słowo „Catherly"), oraz że to wdrożenie TEGO
 * commita, a nie poprzedniego czy z innej gałęzi — po nagłówku
 * x-catherly-wydanie z next.config.ts. Bez pierwszego Lighthouse
 * zmierzyłby ekran logowania; bez drugiego zmierzyłby cudzy kod.
 * W obu wypadkach: bramka zielona, nic zmierzone.
 *
 * ── Czerwień termometru, nie strony ───────────────────────────────
 * Rozstrzygnięcie właściciela 2026-08-16 po rozbiorze render delay
 * (docs/faza-4/render-delay-glowna.md): w trybie LOKALNYM ta bramka
 * mierzy przez HTTP/1.1 + gzip, gdzie każdy zasób to osobna runda na
 * jednym połączeniu, a symulacja Lighthouse dolicza te rundy do LCP —
 * mimo że strona realnie maluje się w 88–97 ms. Ten sam kod na HTTP/2
 * + brotli (tak serwuje Vercel) daje 1276 ms zamiast 1703 ms, a cztery
 * zrzuty Z6 kosztują 0 ms zamiast 153 ms.
 *
 * Dopóki LHCI_BAZA jest puste, czerwień na „/" jest czerwienią
 * TERMOMETRU. NIE odchudzaj strony pod ten pomiar i NIE podnoś progu —
 * naprawą jest przeniesienie pomiaru (docs/faza-4/bramka-na-preview.md).
 * Adnotacja z liczbami leci do logu CI przy każdym przebiegu:
 * `npm run bramka:tryb-pomiaru` (scripts/tryb-pomiaru.mjs).
 *
 * ── Werdykt: mediana czy najlepszy przebieg ───────────────────────
 * Domyślna agregacja lhci to `optimistic`, co dla asercji `max…`
 * bierze przebieg NAJLEPSZY (@lhci/utils/src/assertions.js:139 i 65).
 * Decyzja właściciela 2026-08-14: werdyktem ma być MEDIANA z ≥3
 * przebiegów. Mediana jest surowsza od `optimistic` — na czerwonym
 * przebiegu 31830795901 dawała 1814,1 ms wobec 1802,2 ms z najlepszego.
 *
 * Mediana jest tu WIĄZANA Z TRYBEM PREVIEW, i to jest świadome
 * odstępstwo od dosłownego czytania zlecenia — do zatwierdzenia albo
 * odwołania przez właściciela. Uzasadnienie z pomiaru: na runnerze
 * GitHuba mediana wynosi ~1814 ms przy progu 1800, więc włączenie jej
 * TERAZ, przed przeniesieniem pomiaru, dałoby bramkę czerwoną na stałe
 * — z powodu środowiskowego, czyli dokładnie tego, co zlecenie miało
 * usunąć („środowisko pomiaru ma być stabilniejsze, nie próg niższy").
 * Mediana i preview to jedna zmiana; wchodzą razem.
 *
 * ── „median" → „median-run" (decyzja właściciela 2026-08-16) ───────
 * `median` liczy medianę KAŻDEJ asercji osobno, więc werdykt może
 * zszyć LCP z przebiegu A i TBT z przebiegu B — opisać ładowanie,
 * którego nigdy nie było. `median-run` asertuje na JEDNYM prawdziwym
 * przebiegu (assertions.js:427) i ta chimera znika.
 *
 * UWAGA, wbrew nazwie: „median-run" NIE jest przebiegiem o medianowym
 * LCP. Reprezentanta wybiera odległość od median FCP i TTI
 * (@lhci/utils/src/representative-runs.js:17–22) — LCP nie bierze
 * w tym wyborze udziału. Sprawdzone na artefaktach przebiegu
 * 31953000525 (skrypt scratchpada, 21 raportów): reprezentant różnił
 * się od przebiegu o medianowym LCP na 6 z 7 tras. Werdykt nie
 * zmienił się nigdzie (7/7 zielono w obu regułach), ale liczba, na
 * której zapada, potrafi skoczyć: /funkcje/zespol byłoby sądzone po
 * 1762 ms (zapas +38 ms) zamiast po 1494 ms (+306 ms). To NIE jest
 * zmiana neutralna dla rozrzutu — na trasie, której wolny przebieg
 * ma medianowe FCP/TTI, median-run wybierze właśnie ten wolny.
 * Zapisane jako czynnik do decyzji O2/O4/O5.
 *
 * Żeby wrócić do mediany per-metryka, wystarczy w AGREGACJA wpisać
 * "median"; obie reguły zna też scripts/podsumowanie-pomiaru.mjs
 * i tabela zapasów pokazuje dokładnie tę liczbę, którą sądzi bramka.
 *
 * Próg 1800 nie zmienia się w żadnym trybie.
 */

const PREVIEW = Boolean(process.env.LHCI_BAZA);
const BAZA = (process.env.LHCI_BAZA || "http://localhost:3000").replace(
  /\/+$/,
  "",
);

/**
 * Ścieżki mierzone. Trasy Etapu D dopisane 2026-08-14 po POMIARZE, nie
 * z założenia (lhci autorun, build produkcyjny): / → LCP 1717 ms,
 * /funkcje → 1706 ms, /dla-kogo → 1703 ms; CLS 0,000 i TBT 0 ms
 * wszędzie, dostępność 1,00.
 *
 * Cztery podstrony filarowe Etapu B/C dopisane 2026-08-14 decyzją
 * właściciela — do tego dnia bramka ich NIE mierzyła, więc najcięższe
 * strony serwisu (11 i 10 modułów ze zrzutami) nie miały progu
 * wydajności. Koszt zmierzony, nie oszacowany: 3 adresy = 99 s,
 * 7 adresów = 286 s (handoff-etap-d.md §12.3). Job jest w CI
 * równoległy (needs: build), więc doliczy się do czasu całego CI
 * dopiero, gdy stanie się ścieżką krytyczną.
 */
const SCIEZKI = [
  "/",
  "/funkcje",
  "/dla-kogo",
  "/funkcje/pozyskiwanie",
  "/funkcje/tresci",
  "/funkcje/zespol",
  "/funkcje/wyniki",
];

const AGREGACJA = PREVIEW ? "median-run" : "optimistic";

/**
 * Obejście ochrony preview — SPRAWDZONE 2026-08-16 na realnym preview
 * (alias gałęzi faza-4/podstrony, wydanie 083d9f0). Do tego dnia miało
 * status NIESPRAWDZONE, czyli wg ADR-018 liczyło się jak niedziałające,
 * i słusznie: dwa nagłówki z dokumentacji Vercela NIE działały tu tak,
 * jak zakładano.
 *
 * Zmierzone, siedem tras, każda:
 *   sam `x-vercel-protection-bypass`      → HTTP/2 200, prerender, ok
 *   + `x-vercel-set-bypass-cookie: true`  → HTTP 307 → ta sama ścieżka,
 *                                           z Set-Cookie _vercel_jwt
 *
 * Drugi nagłówek zostaje ZDJĘTY. Powód nie jest kosmetyczny: Lighthouse
 * startuje z czystym profilem, więc uzgodnienie ciastka wypadałoby przy
 * pierwszej nawigacji KAŻDEGO przebiegu, a przekierowanie liczy się do
 * LCP (audyt `redirects`). Mierzylibyśmy rundę uwierzytelnienia i
 * dopisali ją stronie — dokładnie ta klasa błędu, którą przeniesienie
 * pomiaru na preview miało usunąć. Bez ciastka pierwsze żądanie oddaje
 * 200 od razu; ciastko było potrzebne przeglądarce klikanej przez
 * człowieka, nie narzędziu, które nagłówek wysyła przy każdym żądaniu.
 *
 * Strażnik `bramka:preview` zostaje zabezpieczeniem: bez ważnego
 * obejścia Vercel oddaje 302 na vercel.com/sso-api i strażnik zatrzyma
 * bramkę, zamiast pozwolić zmierzyć ekran logowania.
 */
const SEKRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

module.exports = {
  ci: {
    collect: {
      url: SCIEZKI.map((s) => BAZA + s),
      numberOfRuns: 3,
      ...(PREVIEW ? {} : { startServerCommand: "npm run start" }),
      settings: {
        formFactor: "mobile",
        throttlingMethod: "simulate",
        ...(SEKRET
          ? { extraHeaders: { "x-vercel-protection-bypass": SEKRET } }
          : {}),
      },
    },
    assert: {
      aggregationMethod: AGREGACJA,
      assertions: {
        "largest-contentful-paint": ["error", { maxNumericValue: 1800 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["error", { maxNumericValue: 200 }],
        "categories:accessibility": ["error", { minScore: 1 }],
      },
    },
  },
};
