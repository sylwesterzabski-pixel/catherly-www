# ADR-041: Skala typograficzna progami i geometria wzorca w tokenach

Data: 2026-08-26. Status: **PRZYJĘTY** (KROK 1.3 zlecenia
`WWW/050-FINAL`). Uzupełnia ADR-040 (kroje); razem domykają KROK 1.

## Decyzja 1 — skala nagłówków idzie PROGAMI, nie `clamp()`

To jest **różnica konstrukcyjna, nie kosmetyczna**, i dlatego stoi jako
pierwsza. Wzorzec skacze **70 → 53 → 34 px** na dwóch progach; nasza
dotychczasowa skala szła płynnie przez `clamp()`. `clamp()` produkuje
rozmiary pośrednie, **których wzorzec nigdy nie pokazuje** — wierność
tego nie znosi.

| zakres | H1 | interlinia | tracking |
| --- | ---: | ---: | ---: |
| ≥ 1440 px | **70 px** | 84 px (1,20) | −3 px |
| 810–1280 px | **53 px** | 63,6 px | −3 px |
| ≤ 768 px | **34 px** | 40,8 px | −3 px |

**Zmierzone po wdrożeniu, nie założone** — odczyt `getComputedStyle`
na zbudowanym wydaniu, sześć szerokości okna:

| szerokość | rozmiar / interlinia / tracking |
| --- | --- |
| 1600 px | 70 px / 84 px / −3 px |
| 1440 px | 70 px / 84 px / −3 px |
| 1280 px | 53 px / 63,6 px / −3 px |
| 810 px | 53 px / 63,6 px / −3 px |
| 768 px | 34 px / 40,8 px / −3 px |
| 390 px | 34 px / 40,8 px / −3 px |

Zgodność ze wzorcem **co do piksela na wszystkich trzech zmierzonych
zakresach**.

### Czego NIE zmierzono, a co i tak trzeba było wybrać

**Zakresy 1281–1439 i 769–809 nie były mierzone.** Pomiar dał krańce
przedziałów, nie miejsce cięcia — punkty przełamania leżą gdzieś w
środku tych dwóch szczelin. Progi postawiono na **769** i **1440**,
czyli na krańcach zgodnych ze wszystkimi trzema odczytami.

**To jest wybór spośród zakresu dopuszczalnego, nie odczyt** — i dlatego
jest napisany w kodzie, a nie tylko tutaj.

### H2 celowo BEZ progów

H2 zmierzono **wyłącznie przy 1440 px** (60 px). Nadanie mu progów H1
byłoby domysłem podanym składnią pomiaru — a to osobna klasa błędu, nie
drobiazg. H2 dostaje jeden rozmiar; progi doda pomiar 0.7.

## Decyzja 2 — tracking w `rem`, i to jest wierność, nie obejście

Wzorzec podaje tracking nagłówków **w pikselach: −3 px**, czyli jako
odstęp **niezależny od stopnia pisma**. Nasza dotychczasowa wartość
`-0.02em` była **proporcjonalna** — przy 70 px dawała −1,4 px zamiast −3.

`px` w tym repozytorium nie przechodzą lintera, więc wartość zapisano
jako **`-0.1875rem`**. `rem` liczy się od korzenia, nie od stopnia
elementu, więc daje **dokładnie to samo zachowanie co px** — stały
odstęp. Wybór nie jest kompromisem.

⚠ **Granica: zmierzone wyłącznie przy 1440 px.** Czy wzorzec trzyma
−3 px także przy 53 i 34 px, czy przelicza — **nie wiadomo**. Przy
stałych −3 px tracking rośnie względnie: −0,043em przy 70 px, ale
−0,088em przy 34 px. Pozycja otwarta z POMIARU 0.1, do zamknięcia
pomiarem 0.7.

## Decyzja 3 — trzy nadpisania komponentowe zdjęte

Tokeny `--tekst-h1*` istniały **i nie były przez nikogo czytane**: H1
brał rozmiar z `clamp()` wpisanego wprost w trzech arkuszach modułów
(`Hero`, `NaglowekPodstrony`, `cennik`). Zmierzone: po wprowadzeniu
progów H1 **nadal renderował się po staremu**.

**Token, którego nikt nie czyta, jest gorszy niż jego brak — wygląda na
źródło prawdy.** Z trzech reguł zdjęto **wyłącznie** rozmiar, interlinię
i tracking; margines, miara wiersza i `text-wrap` zostają, bo są
własnościami układu tych komponentów, nie skali. Stare wartości
przepisane w komentarzach jako ślad.

## Decyzja 4 — geometria z pomiaru do tokenów

| token | wartość | źródło |
| --- | --- | --- |
| `kontener-strony` | 90rem (1440 px) | POMIAR 0.3, 16 wystąpień |
| `kontener-waski` | 80rem (1280 px) | 3 wystąpienia |
| `miara-kolumny` | 50rem (800 px) | 8 wystąpień, kolumna prozy |
| `odstep-sekcji` | 10rem (160 px) | wariant dominujący |
| `odstep-1…7` | 0,25 / 0,5 / 0,625 / 0,75 / 1 / 1,5 / 2rem | siatka co 4 px |
| `promien` | 0,5rem (8 px) | 88 wystąpień — **bez zmiany** |
| `promien-sredni` | 0,75rem (12 px) | 35 wystąpień |
| `promien-pigulki` | 3,125rem (50 px) | 11 wystąpień |

`promien` trafił we wzorzec **niezależnie** — nasza skala miała 8 px,
zanim wzorzec zmierzono. Odnotowane, bo zbieżność łatwo wziąć za
przeniesienie.

Pozostałe warianty paddingu sekcji (135/0, 130/160, 80/80) **nie wchodzą
jako tokeny**, dopóki KROK 2 nie pokaże, które sekcje ich używają.
Token bez znanego miejsca użycia to ta sama wada co token martwy.

## Skutek uboczny, który wyszedł dopiero na testach

Interlinia prozy poszła z **1,6 na 1,80** (pomiar wzorca) i podniosła
sticky nagłówek z **80,59 px na 87,797 px**. `scroll-padding-block-start`
wynosił 5.5rem = 88 px, więc zapas zszedł do **0,20 px** — i to pękło
**nie na wysokości, tylko na zaokrągleniu przewijania**: cel lądował
0,06 px za wysoko. Sześć upadków `W4` i `odsuniecie-kotwic` na kadrze
390 px.

**Wartość dodatnia, ale mniejsza od błędu zaokrąglenia, jest w praktyce
wartością ujemną.**

Powtórzono **ten sam rozrzut**, którym dobrano poprzednią wartość — 42
kombinacje (7 adresów pl/en/de × 6 kadrów poniżej 48rem): wysokość
**87,797 px wszędzie, rozrzut 0,000 px**. Nowa wartość **5.75rem =
92 px**, zapas **4,20 px**.

**`6rem = 96 px` odrzucone mimo większego zapasu** — siadłoby dokładnie
na pułapie 96 px, którego pilnuje `odsuniecie-kotwic`, czyli
powtórzyłoby tę samą pomyłkę w drugą stronę: margines zerowy wobec
granicy, tyle że górnej.

## Stan po wdrożeniu

Pełny e2e: **668 passed, 4 skipped, 0 failed** (desktop + mobile-390).
Bramki skryptowe zielone poza `kontrakt` (ΔE szwu — decyzja właściciela,
patrz ADR-039 i przekazanie).

## Co zostaje otwarte

- **Tracking na węższych kadrach** — patrz decyzja 2.
- **Progi i skala H2** — patrz decyzja 1.
- **Nawigacja mobilna, ruch i składanie sekcji na 390 px** — POMIAR 0.7,
  dopisek do `WWW/050-FINAL` z 2026-08-26; **odbiór KROKU 2 obejmuje
  parę nagrań DESKTOP i parę MOBILE**.
- **Ruch wzorca klatka po klatce** — POMIAR 0.4 nadal niewykonany;
  do tego czasu żadna liczba o czasach wzorca nie jest cytowana.
