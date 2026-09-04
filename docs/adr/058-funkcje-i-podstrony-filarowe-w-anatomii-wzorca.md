# ADR-058: `/funkcje` i cztery podstrony filarowe w anatomii wzorca

Data: 2026-09-04. Status: **PRZYJĘTY** (zlecenie `WWW/083`, krok 1).

Pomiar celowany 04.09.2026 na **`/features` wzorca**. Każde zero
z kontrolą pozytywną.

---

## Rozstrzygnięcie 1 — roli H1 podstrony NIE DA SIĘ potwierdzić z `/features`, i to jest WYNIK

Zlecenie prosiło: „spodziewana rola 48 jak `/pricing` — **potwierdź
pomiarem, nie analogią**". Pomiar mówi coś innego, niż zakładało pytanie:

⚠ **`/features` nie ma żadnego `h1`.** Kontrola pozytywna: sonda widziała
na tej stronie **1507 elementów, 17 linków i 36 nagłówków**. Najwyższy
nagłówek to `h2` **48 / 500 / lh 60** (przy 390: **30 / 500 / lh 36**).

Rola potwierdza się więc z `/pricing`, a `/features` dokłada tyle, że
**ten sam stopień skali (48/500) niesie tam inny znacznik**. Brak `h1` na
stronie jest po tamtej stronie **wadą dostępności** i nie przenosimy jej
razem z rozmiarem: **bierzemy skalę, zostawiamy strukturę.**

Zmierzone u nas po zmianie — `/funkcje` i `/funkcje/pozyskiwanie`:

| kadr | H1 | lead |
| --- | --- | --- |
| 1440 | **48 px / lh 60** | 16 px, miara 896 |
| 810 | **48 px / lh 60** | j.w. |
| 390 | **30 px / lh 36** | j.w. |

miara nagłówka **1024**, odstęp leadu **16 px**.

### ⚠ Defekt, który sam wniosłem i złapałem POMIAREM, nie lekturą

Pierwsza wersja umieściła blok `@media` **przed** regułą `.naglowek`.
Zapytanie medialne **nie podnosi swoistości**: `.naglowek` w `@media`
i `.naglowek` niżej mają tę samą (0,1,0), więc wygrywa **późniejsza
w źródle** — czyli reguła bazowa, nawet gdy zapytanie pasuje.

**Zmierzone: H1 podstrony miał 30 px przy 1440 zamiast 48.** Sama lektura
CSS by tego nie pokazała; pokazała liczba z żywej strony. Blok stoi teraz
na końcu pliku, z zapisem dlaczego.

## Rozstrzygnięcie 2 — blok modułu = blok feature, potwierdzony MIĘDZY STRONAMI

Pomiar `/features` dał **te same liczby co strona główna**: cztery bloki
**1200 × 559**, odstęp **32**, kolumny `378,656 / 378,672 / 378,672`,
tekst **379**, media **789**. To jest **kontrola tożsamości anatomii
między stronami**: blok feature jest u wzorca jednym wzorcem, nie dwoma
podobnymi.

Zmierzone u nas po zmianie (1440): wnętrze **1200 @ x 120**, gap **32**,
kolumny `378.656px 378.672px 378.672px`, tekst **379** | slot **789**,
tekst po lewej ✓. Przy 390: wnętrze **310 @ x 40**, tekst nad slotem ✓.

| | przed | po |
| --- | --- | --- |
| kontener | 1440 | **1200 zamknięty** |
| wcięcie | 16 | **40** |
| odstęp kolumn | 48 | **16 / 32** |
| rytm modułu | 40 zawsze | **40 / 160** (→ 80 / 320 między) |
| zebra | L-P-L-P | **zdjęta** |

⚠ **Zebra zdjęta — ADR-055 zapisał, że moduły podstron to „inny batch".
To jest ten batch.** Prop `obrazPoLewej` i reguły CSS znikają razem, żeby
nie zostawić martwej deklaracji (klasa **T56**). `.tekst` dostało własną
regułę z tego samego powodu co przy filarze: bez niej CSS Modules
przestaje eksportować nazwę, a React pomija atrybut **bez śladu
w znaczniku** (ADR-055, rozstrzygnięcie 6).

## Rozstrzygnięcie 3 — kadry fali 1 schodzą z renderu CAŁEGO serwisu

Decyzja właściciela rozszerzona delegacją: „zero zrzutów aplikacji"
obejmuje serwis, nie samą główną.

| | stan |
| --- | --- |
| `public/obrazy/fala1/**` | **nietknięte** |
| klucze `alt` w i18n | **nietknięte** |
| osadzenia w modułach (2 na podstronę) | **zdjęte** |
| pas szerokości na `/funkcje/wyniki` | **zdjęty w całości** |
| `<img>` w `main` na czterech podstronach | **0** (zmierzone) |

⚠ **Pasowi szerokości nie dałem slotu w zamian, i to jest decyzja.**
Ramka modułu ma rezerwę CLS i czeka na fotografię; pas był **dekoracją
pełnej szerokości**, a nie ramką z rezerwą — pusty slot udawałby miejsce
na coś, o czym nikt nie zdecydował.

Slot modułu dostał obrys z tego samego rachunku co ramka filaru
(ADR-055): odstęp kolumn zszedł poniżej 30 px, więc kompozycja z ADR-038
przestaje zaliczać.

## Rozstrzygnięcie 4 — strefa jasna dla korpusu modułów (aneks mapy ADR-050)

| sekcja podstrony | strefa |
| --- | --- |
| nawigacja, okruszki, nagłówek podstrony, spis treści | **ciemna** (bez zmian) |
| **moduły DZIAŁA** | **JASNA** — zmiana |
| sekcja kierunku, plan jednym wierszem, przejścia, zamknięcie | ciemna (bez zmian) |

Moduły są rozwinięciem filarów z głównej, a filary leżą w strefie jasnej —
korpus idzie za nimi. **Rama decyzyjna ciemna, korpus jasny**, tak jak na
głównej. Zmierzone: tło modułu `rgb(242, 242, 242)`.

| para | zmierzone | próg |
| --- | --- | --- |
| granica „Czego NIE robi" × tło modułu | **6,56:1** | 4,5 |
| obrys slotu × wypełnienie slotu | **1,59:1** | 1,30 |
| obrys slotu × tło modułu | **1,42:1** | 1,30 |
| plama slotu × tło modułu | 1,12:1 | rozdziela **kreska** |
| H1 podstrony × tło strony | **20,07:1** | 4,5 |

## Rozstrzygnięcie 5 — spisu treści wzorzec nie ma

⚠ Zero sprawdzone: na `/features` są **trzy** linki z kotwicą i wszystkie
trzy stoją **w stopce** („Privacy Policy", „Terms of Service", „Refund
Policy"). Nawigacji wewnętrznej po sekcjach nie ma ani jednej — przy 17
linkach i 36 nagłówkach widzianych przez sondę.

Nasze kotwice zostają; odstępy na drabinę 1g (0/24/16 → **0/32/20**,
wcięcie listy 14 → **16**), miara wnętrza na **1024** jak nagłówek nad nim.

## Rozstrzygnięcie 6 — ⚠ STRAŻNIK RUCHU UPADŁ ZASADNIE, I ODSŁONIŁ STARSZĄ WADĘ

Zdjęcie kadrów zabrało dwie rodziny ruchu (`kadr w ramce`, `pas obrazu`)
i strażnik zapalił się na progu „co najmniej osiem rodzin z ruchem".
**To jest strażnik robiący dokładnie to, po co powstał**: jego komentarz
mówi, że zniknięcie rodziny ma być **decyzją, nie skutkiem ubocznym**.
Decyzja jest — właściciela — i tu zostaje zapisana.

**Kontrola negatywna w jednym przebiegu** (ten sam kod sondy, dwa stany
rozdzielone `git stash`, kadr 1280):

| | rodzin z ruchem | celów nieistniejących |
| --- | --- | --- |
| PRZED batchem | **9** z 10 | 0 |
| PO batchu | **7** z 8 | 2 |

⚠ **Dziewięć z dziesięciu znaczy, że jedna rodzina była martwa JUŻ
WCZEŚNIEJ.** `["sekcja przy przewijaniu", "/", "main > section:nth-of-type(3) > div > *"]`
celuje w trzecią sekcję głównej; kolejność zmieniła się, gdy **ADR-049
wstawił pod hero pas ścieżek**, więc `nth-of-type(3)` wskazuje dziś
sekcję „problem", która animacji nie ma. Element **istnieje**, więc
połowa `reduce` nadal działa — nie działa **kontrola pozytywna**, bo przy
progu 8 i dziewięciu trafieniach martwy wiersz **mieścił się w zapasie**.

**To jest ta sama klasa, przed którą ten próg miał bronić — przepuszczona
przez jego własny margines.** Wniosek wart zapisania: **zapas w progu
liczbowym potrafi ukryć ubytek, którego ten próg pilnuje.** Pozycja
rejestru **T58**, trzy drogi zamknięcia; nie naprawiam (zakaz 8 —
przywrócenie tej rodziny wymaga rozstrzygnięcia, czy sekcje mają się
w ogóle animować przy przewijaniu).

Próg zszedł **8 → 7**, obie przyczyny zmierzone, a liczba stoi w kodzie
z pełnym wyjaśnieniem — zgodnie z regułą „przy każdej liczbie
w strażniku stoi zdanie, po co ona tam jest".

## Rozstrzygnięcie 7 — wejścia z głównej: sześć na sześć ląduje sensownie

Zmierzone przejściem z żywej strony, kadr 390:

| wejście | z ekranu | H1 strony docelowej |
| --- | --- | --- |
| `/funkcje` z hero | 0,64 | „Funkcje ułożone tak, jak idzie twój…" |
| `/funkcje/pozyskiwanie` z filaru 1 | 5,67 | **„Rano widzisz, do kogo się odezwać."** |
| `/funkcje/tresci` z filaru 2 | 6,68 | **„Piszesz. Tarcza sprawdza. Pieczęć…"** |
| `/funkcje/zespol` z filaru 3 | 7,69 | **„Nowa osoba wie, co robić od pierwszego…"** |
| `/funkcje/wyniki` z filaru 4 | 8,66 | **„Widzisz wzrost nawet po trudnym dniu"** |
| `/funkcje` z zamknięcia | 12,31 | j.w. |

⚠ **H1 każdej podstrony filarowej to DOKŁADNIE to zdanie, które stoi przy
filarze na głównej** — ciągłość drogi R2 potwierdzona pomiarem, nie
założeniem. Wszystkie wejścia lądują na górze; kotwic nie używają i nie
potrzebują.

## Rozstrzygnięcie 8 — nowe asercje od razu w trzech projektach

Sześć testów w `e2e/funkcje-anatomia.spec.ts`: skala H1 indeksu ·
**zero zrzutów w treści (z kontrolą pozytywną wpisaną w asercję)** ·
**„Czego NIE robi" przy KAŻDYM module, liczone parami** · tekst po lewej
na wszystkich modułach (przez **położenie**, nie `order`).

⚠ Asercja „zero obrazów" niesie obok siebie dowód, że treść się
wyrenderowała — bez tego zero byłoby spełnione także przez stronę pustą
albo niewczytaną. ⚠ Asercja granic liczy **tyle granic, ile modułów**:
„co najmniej jedna" przepuściłaby zgubienie dziewięciu z dziesięciu.

## Pomiary domykające

| | wynik |
| --- | --- |
| pełny zestaw e2e (3 projekty) | **1033 passed · 8 skipped · 0 failed** |
| axe (3 projekty) | **90 passed** |
| bramki statyczne | tokeny (30 ról) · liczby · parytet · kotwice · linki · no-JS · deklaracje — ZIELONE |
| ESLint | **1 ostrzeżenie zastane**, zero nowych (po sprzątnięciu `tObrazy` i `indeks`) |
| **LCP `/funkcje`** | **mediana 36 ms** (28 · 28 · 40 · 40 · 36), element `h1` |
| **LCP `/funkcje/pozyskiwanie`** | **mediana 28 ms** (44 · 28 · 28 · 28 · 36), element `h1` |

Wszystko mierzone i commitowane na **porcie 3100** (`WWW_BAZA`) — na 3000
stoi serwer deweloperski właściciela (zakaz 7).

## Czego ten ADR NIE rozstrzyga

- **Rodziny „sekcja przy przewijaniu"** — pozycja T58, trzy drogi.
- **Wagi nagłówków** (700 wobec 500 u wzorca) — decyzja całej strony.
- **Slotu w miejsce pasa szerokości** — świadomie go nie ma.
- **Trzech kolumn modułów przy 810** — jak przy filarach, pochodna progów.
