# ADR-044: Sprostowanie krojów i skali po pomiarze wzorca

Data: 2026-08-26. Status: **PRZYJĘTY** (KROK 2 zlecenia `WWW/056`).
**Prostuje ADR-040 i ADR-041** — oba wypchnięte, więc korekta idzie
osobnym ADR-em, nie przepisaniem tamtych.

## Skąd ta korekta

`WWW/056` pkt 3 kazał wykonać POMIAR 0.4 i 0.7 **przed** sekcjami,
których dotyczą. Pomiar zrobił coś więcej: **obalił trzy ustalenia,
na których stały ADR-040 i ADR-041** — wszystkie odziedziczone po
POMIARZE 0.1 albo po domyśle oznaczonym wtedy jako pozycja otwarta.

To jest argument za kolejnością ze zlecenia. Gdyby sekcje powstały
przed pomiarem, stanęłyby na trzech błędnych wartościach.

## Korekta 1 — role krojów były ODWROTNE

**POMIAR 0.1 zapisał:** *„Satoshi → nagłówki (H1, H2), duże napisy;
Inter → proza, nawigacja, przyciski"*. **ADR-040 to wdrożył.**

**Pomiar CDP na wzorcu mówi co innego:**

| rodzina zadeklarowana | elementów z tekstem | krój faktyczny (CDP) |
| --- | ---: | --- |
| `Inter` | **137** | Inter Medium [własny] |
| `Inter-Medium` | **93** | Inter Medium [własny] |
| `Inter-Bold` | **24** | Inter [własny] |
| `Inter-SemiBold` | **3** | Inter SemiBold [własny] |
| **`Satoshi`** | **2** | — |

**Inter niesie 257 elementów tekstu, w tym wszystkie H1 i H2.** Satoshi
występuje na **dokładnie dwóch**: „Get 3 Free month" i „on Pro plan",
oba **12 px, waga 700, barwa `#070806`**.

**To jest ta sama plakietka**, którą POMIAR 0.1 opisał w swojej tabeli
skali („plakietka górna 12 px / 700 / interlinia 1,20 / `#070806`").
Pomiar widział Satoshi i **przypisał je do niewłaściwej warstwy**.

**Kontrola pozytywna dwójki:** 2 elementy w Satoshi wobec **257**
w Interze, policzone w tym samym przebiegu tą samą pętlą. Dwójka jest
wynikiem, nie zerem narzędzia.

### Skutki

- `--kroj-naglowek` → **Inter** (token zostaje osobny mimo równej
  wartości: nagłówki i proza to dwie różne decyzje i mają móc się
  rozejść bez przeszukiwania arkuszy).
- **`--kroj-plakietka` → Satoshi**, nowy token.
- **PRELOAD PRZEPIĘTY Z SATOSHI NA INTER.** ADR-040 uzasadniał preload
  zdaniem *„jedyne `h1` jest elementem LCP, a składa je Satoshi"*.
  Druga połowa była nieprawdą. Preload wskazywał więc plik, którego
  element LCP **w ogóle nie używa** — czyli robił dokładnie to, przed
  czym miał chronić: zajmował pasmo krojem, którego LCP nie mierzy.

## Korekta 2 — tracking JEST progowy

ADR-041 wdrożył **−3 px na wszystkich progach** i **uczciwie oznaczył
to jako niezmierzone**: *„Czy wzorzec trzyma −3 px także przy 53 i 34 px
— nie wiadomo"*. Nie trzyma.

| zakres | tracking H1 | w `em` |
| --- | ---: | ---: |
| ≥ 1440 px | **−3 px** | −0,043em |
| 810–1280 px | **−1,6 px** | −0,030em |
| ≤ 768 px | **−1 px** | −0,029em |

**Ani stały w px, ani stały w em — trzy osobne wartości.** Gdyby ADR-041
wybrał `em` zamiast `rem` (co POMIAR 0.1 stawiał jako otwartą
alternatywę), wynik byłby błędny tak samo, tylko inaczej.

## Korekta 3 — H2 ma własne progi i NIE idzie za H1

ADR-041 zostawił H2 bez progów, bo miał pomiar tylko przy 1440, i
zapisał: *„nadanie mu progów H1 byłoby domysłem podanym składnią
pomiaru"*. **Ta ostrożność się opłaciła** — H2 nie idzie za H1
w **żadnej** z trzech własności:

| własność | H1 | H2 |
| --- | --- | --- |
| rozmiar | 70 → 53 → **34** (×0,49) | 60 → 42 → **38** (×0,63) |
| interlinia | 1,20 na wszystkich progach | 1,20 · 1,20 · **1,40** |
| tracking ≤ 768 | −1 px | **−0,6 px** |

**Trzy razy założyłem, że H2 jest pomniejszonym H1, i trzy razy pomiar
to obalił.** Wniosek zapisany w tokenach i w arkuszu: **na wąskim
kadrze nagłówek sekcji jest we wzorcu osobną decyzją typograficzną.**
Dlatego H2 dostaje własne tokeny na każdą z trzech własności, a nie
współdzielone z H1.

## Siedem nadpisań komponentowych zdjętych

`--tekst-h2` był martwy tak samo, jak wcześniej `--tekst-h1`: **siedem**
modułów powtarzało `font-size: var(--tekst-l); line-height: 1.25` na
nagłówkach sekcji. Zdjęte; margines, miara wiersza i `text-wrap`
zostają — to układ, nie skala. Ósme wystąpienie `--tekst-l` (`.cena`
w `SekcjaPlanow`) **zostawione**: to cena, nie nagłówek.

## Zgodność po korekcie — zmierzona, nie zadeklarowana

Odczyt `getComputedStyle` na **naszej stronie i na wzorcu w tym samym
przebiegu**, sześć szerokości:

| szerokość | H1 (my / wzorzec) | H2 (my / wzorzec) | krój |
| --- | --- | --- | --- |
| 1600 | 70 / 84 / −3px ✔ | 60 / 72 ✔ | Inter / Inter |
| 1440 | 70 / 84 / −3px ✔ | 60 / 72 ✔ | Inter / Inter |
| 1280 | 53 / 63,6 / −1,6px ✔ | 42 / 50,4 ✔ | Inter / Inter |
| 810 | 53 / 63,6 / −1,6px ✔ | 42 / 50,4 ✔ | Inter / Inter |
| 768 | 34 / 40,8 / −1px ✔ | 38 / 53,2 / −0,6px ✔ | Inter / Inter |
| 390 | 34 / 40,8 / −1px ✔ | 38 / 53,2 / −0,6px ✔ | Inter / Inter |

**Rozmiar, interlinia, tracking i krój zgodne we wszystkich
kombinacjach.**

## Jedno odstępstwo od wzorca — i dlaczego nim nie jest

Skala wzorca **złamała reflow na 320 px**: `/funkcje/tresci` panoramowało
o **2 px**, `/funkcje/pozyskiwanie` o **8 px**. Przyczyna zmierzona —
polskie słowa w H2 przy 38 px na kolumnie 288 px: „przypomnieniami"
(15 znaków), „wersjonowaniem" (14). **Wzorzec tego nie ma, bo składa po
angielsku**, gdzie najdłuższe słowo nagłówka ma 10 znaków.

Dodane `overflow-wrap: break-word` + `hyphens: auto` na nagłówkach.

**To nie jest odstępstwo od skali:** żadna zmierzona wartość nie została
ruszona. Zmienia się wyłącznie zachowanie słowa, które **i tak się nie
mieści** — bez reguły wychodzi poza kadr, z regułą łamie się w środku.
Odstępstwem byłoby zmniejszenie pisma, i tego nie zrobiono. WCAG 1.4.10
i ADR-018 („w konflikcie przegrywa wygląd, nigdy nieodwracalne")
rozstrzygają to jednoznacznie.

**Sprawdzone na 24 adresach** (8 tras × 3 języki) przy 320 px: **zero
nadmiaru**. Kontrola pozytywna pochodzi z tego samego przebiegu — ten
sam skrypt minutę wcześniej wykrył 2 px i 8 px, więc zero jest wynikiem,
nie ślepotą narzędzia.

## Stan

Pełny e2e **672 passed / 4 skipped / 0 failed**; bramki skryptowe
zielone poza `kontrakt` (stan przejściowy, ADR-042).

## Co ten ADR NIE zamyka

- **Satoshi kosztuje 17,3 kB i niesie dwie plakietki po 12 px.** Zostaje,
  bo wzorzec go używa, a zlecenie mówi o odwzorowaniu w 100%. Gdyby
  plakietka nie weszła do naszej strony w KROKU 2, ten plik trzeba
  będzie usunąć — **token bez użycia to ta sama wada, co token martwy**.
- Punkty przełamania leżą w szczelinach **769–809** i **1281–1439**;
  progi postawione na krańcach zgodnych ze wszystkimi odczytami. To
  wybór spośród zakresu dopuszczalnego, nie odczyt.
