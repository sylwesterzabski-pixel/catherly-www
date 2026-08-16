/**
 * REGUŁA WERDYKTU BRAMKI WYDAJNOŚCI — jedno źródło dla wszystkich, którzy
 * o niej mówią: skryptu werdyktu, tabeli zapasów i adnotacji w logu CI.
 *
 * ── Co wybieramy ──────────────────────────────────────────────────────
 * Reprezentantem trasy jest PRZEBIEG O MEDIANOWYM LCP. Wszystkie asercje
 * zapadają na tym jednym, prawdziwym przebiegu.
 *
 * ── Dlaczego nie `median-run` z lhci (rozstrzygnięcie właściciela 2026-08-16)
 * `median-run` też bierze jeden prawdziwy przebieg, ale wybiera go po
 * odległości od median FCP i TTI (@lhci/utils/src/representative-runs.js
 * :17–22) — LCP nie bierze w tym wyborze udziału. Werdykt stoi na LCP,
 * a reprezentanta wybierała metryka, której werdykt nie dotyczy.
 *
 * Koszt tej rozbieżności jest zmierzony, nie przewidziany. Przebieg
 * 31955831699 (attempt 2, 7 tras × 5 przebiegów, runner GitHuba):
 * na 5 z 7 tras reprezentant `median-run` NIE był przebiegiem
 * o medianowym LCP, a na `/dla-kogo` wybrał NAJGORSZY z pięciu:
 *
 *     /dla-kogo   przebiegi LCP: 1504 · 1374 · 1934 · 1486 · 1488
 *                 mediana LCP  : 1488 ms  (zapas +312 ms)
 *                 median-run   : 1934 ms  → BRAMKA CZERWONA (−134 ms)
 *
 * Bramka zapaliła czerwień na trasie, której mediana stoi 312 ms pod
 * progiem. To fałszywy alarm, a bramka fałszywie alarmująca uczy
 * ignorowania czerwieni — czyli kosztuje dokładnie to, co ma chronić.
 *
 * ── Czego ta zmiana NIE robi ──────────────────────────────────────────
 * Nie rusza progu (1800 ms stoi) i nie wraca do `median`, czyli mediany
 * KAŻDEJ metryki osobno. `median` zszywa LCP z przebiegu A z TBT
 * z przebiegu B i opisuje ładowanie, którego nigdy nie było — chimerę
 * zabitą świadomie 2026-08-16 (O1). Zysk O1 zostaje: dalej sądzimy jeden
 * prawdziwy przebieg, tylko wybrany po metryce, na której stoi werdykt.
 *
 * ── Jak to zostaje audytowalne ────────────────────────────────────────
 * Sama reguła nie jest dowodem, że działa. Tabela zapasów wypisuje więc
 * przy każdym reprezentancie ODCHYLENIA od median pozostałych metryk
 * (METRYKI_KONTROLNE) — w tym FCP i TTI, czyli dokładnie tych, po których
 * wybierał stary `median-run`. Podmiana kryterium z powrotem na FCP+TTI
 * odwraca ten obraz: odchylenia FCP/TTI spadają do zera, a odchylenie LCP
 * przestaje być zerem i zapala ostrzeżenie „REGUŁA ZŁAMANA". Mutacja jest
 * widoczna w tabeli, a nie tylko w kodzie.
 */

/** Metryka, na której stoi werdykt — i po której wybieramy reprezentanta. */
export const KRYTERIUM = {
  id: "median-lcp",
  metryka: "largest-contentful-paint",
  etykieta: "LCP",
  /** @param {number|undefined} n liczba przebiegów, jeśli znana */
  opis: (n) =>
    n
      ? `JEDEN przebieg o MEDIANOWYM LCP z ${n} przebiegów`
      : "JEDEN przebieg o MEDIANOWYM LCP",
};

/**
 * Metryki, których odchylenie od własnej mediany pokazujemy przy
 * reprezentancie. FCP i TTI są tu nie dla ozdoby: to kryterium starej
 * reguły, więc ich odchylenia są testem, czy nowa reguła nadal obowiązuje.
 */
export const METRYKI_KONTROLNE = [
  { klucz: "first-contentful-paint", etykieta: "FCP", jednostka: "ms", cyfry: 0 },
  { klucz: "interactive", etykieta: "TTI", jednostka: "ms", cyfry: 0 },
  { klucz: "total-blocking-time", etykieta: "TBT", jednostka: "ms", cyfry: 0 },
  { klucz: "cumulative-layout-shift", etykieta: "CLS", jednostka: "", cyfry: 3 },
];

/** Wartość audytu numerycznego; `null`, gdy audytu w raporcie nie ma. */
export function liczba(lhr, klucz) {
  const v = lhr?.audits?.[klucz]?.numericValue;
  return typeof v === "number" ? v : null;
}

/**
 * Mediana: nieparzysta liczba przebiegów → środek, parzysta → DOLNY
 * środek. Dolny, a nie średnia z dwóch — reprezentantem musi być
 * istniejący przebieg, a średnia dwóch przebiegów nie jest przebiegiem.
 * Ta sama reguła w tabeli i w wyborze reprezentanta, więc przy
 * nieuszkodzonym kryterium „mediana LCP" z tabeli równa się LCP
 * reprezentanta CO DO WARTOŚCI — i właśnie na tym stoi ostrzeżenie.
 */
export function mediana(wartosci) {
  const s = [...wartosci].sort((a, b) => a - b);
  return s[Math.floor((s.length - 1) / 2)];
}

/**
 * Wybiera reprezentanta trasy: przebieg o medianowym LCP.
 *
 * Remisy rozstrzyga pierwotna kolejność przebiegów (stabilnie), więc
 * wynik jest deterministyczny — ta sama piątka raportów zawsze daje tego
 * samego reprezentanta, niezależnie od kolejności czytania plików.
 *
 * @param {any[]} raporty raporty LHR jednej trasy, w kolejności przebiegów
 * @returns {{raport:any, indeks:number, wartosc:number}}
 * @throws gdy któryś raport nie niesie metryki werdyktu — brak danych
 *         o metryce, na której zapada wyrok, nie jest stanem do przemilczenia
 */
export function wybierzReprezentanta(raporty) {
  if (!Array.isArray(raporty) || raporty.length === 0) {
    throw new Error("brak raportów dla trasy");
  }
  const pary = raporty.map((raport, indeks) => ({
    raport,
    indeks,
    wartosc: liczba(raport, KRYTERIUM.metryka),
  }));
  const bez = pary.filter((p) => p.wartosc === null);
  if (bez.length) {
    throw new Error(
      `${bez.length} z ${pary.length} przebiegów nie ma audytu ` +
        `„${KRYTERIUM.metryka}" — nie da się wybrać reprezentanta po metryce, ` +
        "której w raporcie nie ma",
    );
  }
  pary.sort((a, b) => a.wartosc - b.wartosc || a.indeks - b.indeks);
  return pary[Math.floor((pary.length - 1) / 2)];
}

/**
 * Odchylenia reprezentanta od median pozostałych metryk — adnotacja,
 * dzięki której nowa reguła daje się sprawdzić z zewnątrz.
 *
 * @param {any[]} raporty wszystkie przebiegi trasy
 * @param {any} wybrany raport reprezentanta
 */
export function odchyleniaKontrolne(raporty, wybrany) {
  const wynik = [];
  for (const m of METRYKI_KONTROLNE) {
    const wartosci = raporty.map((r) => liczba(r, m.klucz)).filter((v) => v !== null);
    const wart = liczba(wybrany, m.klucz);
    if (wartosci.length === 0 || wart === null) continue;
    const med = mediana(wartosci);
    wynik.push({ ...m, wartosc: wart, mediana: med, odchylenie: wart - med });
  }
  return wynik;
}

/**
 * Czy reguła nadal obowiązuje: LCP reprezentanta MUSI być medianowym LCP
 * trasy. Zwraca `null`, gdy jest w porządku, albo medianę, gdy nie jest.
 * Nie jest to ozdoba — to jedyny automatyczny test na podmianę kryterium.
 */
export function zlamanaRegula(raporty, wybrany) {
  const wartosci = raporty.map((r) => liczba(r, KRYTERIUM.metryka)).filter((v) => v !== null);
  if (wartosci.length === 0) return null;
  const med = mediana(wartosci);
  return liczba(wybrany, KRYTERIUM.metryka) === med ? null : med;
}
