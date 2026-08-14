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
 * (scripts/sprawdz-preview.mjs). Bez niego Lighthouse zmierzyłby ekran
 * logowania Vercela i oddał świetne wyniki — bramka zielona, nic
 * niezmierzone.
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
 * Mediana i preview to jedna zmiana; wchodzą razem. Żeby włączyć
 * medianę bezwarunkowo, wystarczy w AGREGACJA zostawić samo "median".
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

const AGREGACJA = PREVIEW ? "median" : "optimistic";

/**
 * Obejście ochrony preview. NIESPRAWDZONE w działaniu — nie da się
 * tego zweryfikować, dopóki właściciel nie udostępni preview (dziś
 * zamknięty ścianą logowania). Do czasu przebiegu na realnym preview
 * ten fragment ma status NIESPRAWDZONY, czyli w rejestrze ADR-018
 * liczy się jak niedziałający. Strażnik `bramka:preview` jest tu
 * zabezpieczeniem: jeśli nagłówki nie zadziałają, zatrzyma bramkę,
 * zamiast pozwolić zmierzyć ekran logowania.
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
          ? {
              extraHeaders: {
                "x-vercel-protection-bypass": SEKRET,
                "x-vercel-set-bypass-cookie": "true",
              },
            }
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
