# Brief Etapu D: /funkcje jako indeks + /dla-kogo (Faza 4)

Status: BRIEF. Podstawa: PLAN-FAZY-4.md (Etap D), STRATEGIA pkt 27
i 33, architektura Etapu A (A-1/A-2/A-3), szablon K12 po Etapach B/C.
Polecenie właściciela 2026-08-13: „na szablonach, pipeline bez zmian,
push per etap".

Obie strony zastępują placeholdery `StronaWBudowie`. Ścieżki
`/funkcje` i `/dla-kogo` SĄ już w rejestrze `src/i18n/sciezki.ts` —
bramka linków ich nie blokuje, linki z nawigacji już działają.

---

## Czym te dwie strony różnią się od podstron filarowych

Podstrony filarowe (B/C) opisują FUNKCJE. Te dwie strony niczego
nowego nie obiecują — **rozdzielają ruch**. To ma konsekwencję
twardą: żadna z nich nie wprowadza obietnicy, której nie ma już na
podstronie filarowej albo w tabeli obietnic. Zdanie, które na
indeksie brzmi jak nowa funkcja, jest błędem indeksu, nie nową
funkcją.

Z tego wynika reguła gramatyczna etapu: **indeks i ścieżki cytują
poziom obietnicy z podstrony docelowej.** Funkcja opisana na
podstronie w trybie dokonanym może być w trybie dokonanym tutaj;
Studio i asystent AI (wariant kierunku) zostają w języku kierunku
także tutaj. Zero podnoszenia poziomu obietnicy przez skrót.

---

## A. /funkcje — indeks wg zadań dnia (pkt 27)

### Struktura (I1–I6)

- **I1** Nawigacja współdzielona. Pozycja „Funkcje" z
  `aria-current="page"` — to jest ta strona, nie rodzic (różnica
  wobec A-1 na podstronach, gdzie rodzic dostaje `"true"`).
  **BEZ okruszków** — ścieżka jednopoziomowa, okruszek „Funkcje"
  bez linku nie niesie nawigacji, a dodaje szum (D-D2).
- **I2** `NaglowekPodstrony` — H1 + jedno zdanie korzyści.
- **I3** **Cztery bloki wg ZADAŃ DNIA, nie wg architektury.**
  Kolejność jak w rejestrze przejść: pozyskiwanie → treści →
  zespół → wyniki. Blok zawiera:
  1. H2 z id-kotwicą — nazwa ZADANIA DNIA („rano wiesz, do kogo
     się odezwać"), nie nazwa filaru z dokumentu wewnętrznego;
  2. 1–2 zdania: po co ten kawałek dnia istnieje;
  3. **lista funkcji jako linki do kotwic podstrony** — to jest
     sedno indeksu i wypłata z projektu kotwic z Etapu B
     (`/funkcje/tresci#tarcza` itd.);
  4. link wejściowy do podstrony („Zobacz wszystko →").
- **I4** MILCZENIE o filarze 5 (rozliczenia — zero funkcji DZIAŁA).
  Cztery bloki, nie pięć; słowo „rozliczenia" nie pada.
- **I5** Plan jednym wierszem + link do /cennik (`PlanJednymWierszem`
  — reużycie). **BEZ kopii tabeli porównawczej** (D-D1).
- **I6** `Zamkniecie` (wariant krótki) + Stopka z layoutu.

### Ile funkcji wymienić w bloku

Kompletność listy w bloku = kompletność modułów podstrony (10/9/6/6
— razem 31 pozycji + 2 sekcje kierunku). Skracanie listy do „3
najważniejszych" wprowadza ciche wartościowanie i rozjeżdża indeks
z podstroną przy każdej zmianie. Jeśli panel uzna 10 pozycji za
za dużo na 390 px — rozstrzygnięciem jest układ (kolumny, gęstość),
nie ucięcie treści.

## B. /dla-kogo — trzy ścieżki rozpoznania siebie (pkt 33)

### Struktura (S1–S6)

- **S1** Nawigacja, `aria-current="page"`, bez okruszków (jak I1).
- **S2** `NaglowekPodstrony` — H1 + jedno zdanie.
- **S3** `SpisTresci` — trzy pozycje. Krótko, ale wchodzi:
  szablon jest standardem od Uzupełnienia C, a kotwice ścieżek będą
  celem linków z zewnątrz (kampanie, /pomoc w Etapie E).
- **S4** **Trzy sekcje ścieżek.** Kolejność wg drogi wzrostu:
  startująca → budująca zespół → prowadząca strukturę. Sekcja:
  1. H2 z id-kotwicą — **zdanie rozpoznania siebie**, nie etykieta
     segmentu. Użytkowniczka ma powiedzieć „to ja", a nie
     zaklasyfikować się do szuflady marketingowej;
  2. **CO BOLI** — 1–2 zdania. Opis sytuacji, nie historia osoby.
     Zero wymyślonych bohaterek, imion, cytatów, liczb;
  3. **CO CATHERLY Z TYM ROBI** — z linkami do kotwic funkcji;
     poziom obietnicy cytowany z podstrony docelowej;
  4. **OD KTÓREGO PLANU** — fakt z bramek planów (raport Z1).
     Puls zespołu i drzewo struktury: wyłącznie pełna forma
     „W planie Growth…" (rejestr warunków powrotu, poz. 11);
  5. **CZEGO TA ŚCIEŻKA NIE ZAŁATWIA** — 1 zdanie, OBOWIĄZKOWE
     (D-D3). Strona, która trzy razy z rzędu mówi „to jest dla
     ciebie", bez granicy staje się ulotką. Wzorzec CZEGO NIE ROBI
     z K12 działa tu tak samo.
- **S5** Zamknięcie (wariant krótki) + Stopka.

### Granice materiału dla ścieżki trzeciej

„Prowadząca dużą strukturę" jest ścieżką najbardziej narażoną na
obietnicę bez pokrycia: raporty struktury i sponsora, Liga zespołu,
Benchmarki, Hive Coach są za bramką GROWTH, ale **milczą na stronie**
(rejestr poz. 12 — każde wejście do narracji to nowa obietnica,
panel + decyzja właściciela). Materiał z pokryciem dla tej ścieżki:
Ranking (PRO), klucze API i webhooki (PRO), czysty eksport (PRO),
drzewo struktury i Puls zespołu (GROWTH, pełna forma), zatwierdzanie,
Paszport zgodności, Akademia, Pierwsze 90 Dni.

---

## Wymagania twarde (obie strony)

- **Parytet ×3 od pierwszego commita treści.** Nowe pliki:
  `content/{pl,en,de}/funkcje.md` i `content/{pl,en,de}/dla-kogo.md`
  — 6 plików, drzewa 12 → 14 pozycji. Bramka parytetu porównuje
  drzewa; plik bez rodzeństwa = czerwień.
- **Nowe przestrzenie messages:** `FunkcjeIndeks`, `DlaKogo` —
  strażnik znak w znak messages ↔ content dla każdej z nich,
  wzorzec K12 (porównanie po normalizacji białych znaków).
- **Zero JS**, mobile-first 390 px, reflow 320 px bez panoramy,
  kotwice ze `scroll-margin` (sticky nav — precedens #tresc).
- **Kontrasty:** wyłącznie istniejące pary tokenów; zero nowych
  par bez wyliczenia w HF.
- **Liczby:** wyłącznie z `content/facts.json` przez komponent
  liczby — literał w JSX nie przejdzie lintera.
- **Strażnik milczenia** dla obu stron: sumaryczna lista fraz
  z czterech podstron filarowych (indeks agreguje ich zakres),
  plus pozycje rejestru poz. 12 dla /dla-kogo. Literały EN/DE
  pozostają zabezpieczeniem częściowym do odpowiedzi na Z7.

## NOWA BRAMKA: kotwice (blokująca, wchodzi w tym etapie)

`scripts/check-linki.mjs` odcina fragment przed sprawdzeniem
(`/href="(\/[^"#?]*)/g`) — dziś `/funkcje/tresci#nie-ma-takiej`
przechodzi bramkę na zielono. Cały indeks Etapu D stoi na linkach
do kotwic, więc ta dziura przestaje być teoretyczna.

`scripts/check-kotwice.mjs` — dla każdego linku z fragmentem
w zbudowanym HTML: strona docelowa istnieje ORAZ element o tym `id`
jest w jej HTML. Sprawdzenie na wszystkich trzech językach (kotwice
są wspólne — slug PL — więc rozjazd per język to realny błąd).
Bramka wchodzi do `npm run bramki` i do pre-commit obok pozostałych.

**Dowód działania bramki jest częścią etapu:** mutacja (podmiana
jednej kotwicy w treści indeksu na nieistniejącą) musi dać czerwień.
Bramka bez dowodu ma status niesprawdzonej, a niesprawdzona liczy
się jak niedziałająca (ADR-018).

## Komponenty

Reużycie bez zmian: `Nawigacja`, `Stopka`, `NaglowekPodstrony`,
`SpisTresci`, `PlanJednymWierszem`, `Zamkniecie`.

Nowe (HF + panel projektu rozstrzygają wygląd):
- **`BlokZadaniaDnia`** — blok indeksu: H2+id, zdanie, lista linków
  do kotwic, link wejściowy. BEZ slotu obrazu (indeks nie obiecuje
  ekranu; F4-3 dotyczy podstron).
- **`SciezkaRozpoznania`** — sekcja /dla-kogo: H2+id, co boli,
  co robi (z linkami), wiersz planu, granica.

## Pipeline (bez zmian — polecenie właściciela)

Brief (ten dokument) → fan-out treści (workflow: /funkcje + /dla-kogo
osobno, autorzy równolegle) → panel treści (Prawo 2 — panel nie jest
autorem) → **DECYZJE WŁAŚCICIELA D-D1…D-D5** → adaptacje EN/DE przez
panele (wzorzec Fazy 2) → HF obu stron → panel projektu → handoff →
implementacja → bramki (w tym nowa bramka kotwic z dowodem mutacji) →
adwersarz etapu → akcept właściciela → push.

## PUNKTY DECYZJI WŁAŚCICIELA (D-D)

- **D-D1 — tabela „co jest w którym planie" na /funkcje** (STRATEGIA
  pkt 27 ją przewiduje). (a) REKOMENDACJA: bez tabeli — jeden wiersz
  planu + link do /cennik. Tabela z limitami żyje w jednym miejscu;
  kopia to drugie źródło prawdy dla liczb, podwójne utrzymanie ×3
  języki i pewny rozjazd przy pierwszej zmianie cennika.
  (b) Pełna kopia tabeli porównawczej na indeksie.
- **D-D2 — okruszki na stronach jednopoziomowych.** (a) REKOMENDACJA:
  brak (nawigacja z `aria-current="page"` wystarcza); (b) są, dla
  spójności wizualnej z podstronami filarowymi.
- **D-D3 — granica w każdej ścieżce /dla-kogo.** (a) REKOMENDACJA:
  obowiązkowa, jedno zdanie; (b) wystarczy wiersz „od którego planu".
- **D-D4 — brzmienia nagłówków ścieżek** (rozpoznanie siebie zamiast
  etykiet segmentów) — fan-out proponuje, panel rozstrzyga,
  właściciel sankcjonuje.
- **D-D5 — głębokie linkowanie z /dla-kogo do kotwic funkcji.**
  (a) REKOMENDACJA: tak — ścieżka prowadzi do konkretu, nie do
  podstrony ogólnej; (b) linki tylko do podstron filarowych.
