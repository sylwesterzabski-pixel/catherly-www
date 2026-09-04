# ADR-054: Batch A3 — karty funkcji, pas możliwości, dbanie o siebie

Data: 2026-09-04. Status: **PRZYJĘTY** (zlecenie `WWW/079`, krok 1).

Trzecia partia anatomii wzorca. Wszystkie wartości z **pomiaru celowanego
04.09.2026** (Playwright, kadry 1440 / 810 / 390, klucz `viewport` —
skażenie z ADR-053 nie wróciło, każdy przebieg drukuje kadr zmierzony).

**Pomiar CELOWANY, nie po dokumencie — i to jest cała różnica.** Zlecenie
żądało tego wprost, bo poprzedni batch pokazał, po co: dominanta zbioru
mieszanego jest dominantą **zbioru**, nie **roli**. Próbka tutaj to
21 kart wybranych warunkiem `promień 12 px + wypełnienie 32 px + obrys`,
a nie „wszystko, co ma tło".

---

## Rozstrzygnięcie 1 — anatomia karty

| | wzorzec (21 kart) | nasze do 04.09 | po zmianie |
| --- | --- | --- | --- |
| wypełnienie | **32 px** (21/21) | 24 px | **32** ✓ |
| promień | **12 px** | 9 px | **12** ✓ |
| obrys | **1 px** (21/21) | brak | **1 px** ✓ |
| cień w spoczynku | jedna warstwa wewnątrz (21/21) | brak | **brak** — patrz niżej |
| tytuł | **18 px / 600 / lh 28** | 24 px / 500 / lh 1,40 | **18 / 600 / 28** ✓ |
| opis | **14 px / 400 / lh 20** | 16 px / 500 / lh 1,60 | **14 / 500 / 20** |
| miara opisu | **384 px** | 65ch | **384** ✓ |
| pudełko ikony | **64 × 64 px, promień 8** | brak | **64 × 64, promień 8**, puste |

⚠ **CIEŃ ZOSTAJE WYŁĄCZNIE POD WSKAŹNIKIEM — zlecenie mówi wprost
„R4 pełne".** Wzorzec ma cień w spoczynku na wszystkich 21 kartach,
ale ADR-048 R4 obowiązuje tu bez wyjątku: wyjątek imienny, przyznany
w ADR-053, dotyczy **karty ścieżki**, i tylko jej. Rozstrzygnięcie
koordynatora z 04.09 potwierdziło to imiennie.

⚠ **WAGA OPISU ZOSTAJE 500, WZORZEC MA 400 — różnica licencjonowana.**
Opis karty bierze `waga.tekst`, czyli wagę prozy całego serwisu. Zejście
do 400 w jednym komponencie rozjechałoby kartę z resztą strony; zmiana
wagi prozy to decyzja systemowa, nie kartowa. Zapisane, żeby nikt nie
uznał tego za przeoczenie pomiaru — pomiar jest, wynosi 400.

## Rozstrzygnięcie 2 — siatka: progi znalezione bisekcją, i jeden kształt, którego wzorzec nie ma

Liczba kolumn liczona **z położenia kart**, nie z `grid-template-columns`
— ta druga wartość nie zmienia się przy zwężaniu i kłamie o kolumnach.

| kadr | 390 | 700 | **767** | **768** | 810 | **1023** | **1024** | 1280 | 1440 | 1600 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| kolumn | 1 | 1 | **1** | **2** | 2 | **2** | **4** | 4 | 4 | 4 |

Progi wzorca: **768 i 1024**. Nasze: 48,0625rem i 90rem — więc w paśmie
**1024–1439 pokazujemy dwie kolumny tam, gdzie wzorzec pokazuje cztery**.
To znana różnica progów (ADR-049: „nasze zostają 48rem/90rem"), zapisana,
nie zasypana.

**Zgodność wychodzi z rachunku, nie z dopasowania:** kontener 1280,
cztery kolumny, odstęp 16 → (1280 − 3 × 16) / 4 = **308 px**, czyli
dokładnie szerokość karty zmierzona u wzorca. Nasz pomiar po zmianie:
**308 px przy 1440**.

⚠ **KSZTAŁT „4 + 2" JEST U WZORCA NIEOBECNY — zgłaszam, nie rozstrzygam.**
Wzorzec pokazuje w siatce czterokolumnowej **szesnaście** kart, czyli
cztery pełne rzędy; rzędu niepełnego nie ma ani razu. Naszych kart jest
**sześć**, więc od 1440 px ostatni rząd ma dwie. Liczba kolumn pochodzi
z pomiaru, ten rząd — nie. **Trzy wyjścia, wszystkie należą do
koordynatora:** (a) zostaje 4 + 2; (b) trzy kolumny, czyli 2 × 3 —
kształt spoza pomiaru, ale bez rzędu niepełnego; (c) osiem kart, czyli
dwa pełne rzędy — zmiana treści, nie układu.

## Rozstrzygnięcie 3 — MECHANIZM ROZDZIAŁU KARTY ZMIENIA SIĘ Z KOMPOZYCJI NA OBRYS

To nie jest ozdoba, tylko warunek, bez którego batch wprowadziłby wadę.

**Rachunek, nie przeczucie.** Karty przeszły w ADR-050 do strefy jasnej,
gdzie ich plama wobec tła sekcji wynosi **1,12:1** — poniżej progu 1,30
z ADR-038. Rozdzielała je wtedy **kompozycja**, a ta wymaga odstępu
≥ 30 px. Odstęp wzorca to **16 px**. Po samej zmianie odstępu karta
zostawałaby **bez żadnego z czterech mechanizmów**.

⚠ **Obrys nie jest obejściem, tylko drugim odczytem tego samego wzorca:
21 z 21 zmierzonych kart MA obrys jednopikselowy.** Zapis „BEZ obrysu,
tak jak we wzorcu" z poprzedniej wersji `KartyFunkcji.module.css`
opisywał wzorzec `WWW/050-FINAL`, nie ten.

### Nowa rola `kreska-na-jasnym` — wartość odtwarza relację, nie jest dobrana

Ta sama metoda, którą ADR-052 wyprowadził obrys pola formularza: na
korpusie ciemnym `kreska` wobec powierzchni karty daje **1,60:1**;
wartość przyjęta daje **1,59:1** wobec karty białej i **1,42:1** wobec
tła sekcji. Oba progi ADR-038 spełnione, relacja ta sama co po ciemnej
stronie. `LICZBA_ROL` idzie **29 → 30** — decyzja, nie dryf.

Rola weszła też do `PARY` strażnika tokenów z progiem **1,30** (nie 3,0
ani 4,5 — próg pochodzi z ADR-038, nie z WCAG). ⚠ **Wyłączenia jej
ciemnej siostry NIE przepisano bez sprawdzenia:** `kreska` stoi w
wyłączeniach z powodem „próg 1,30 mierzy `e2e/rozdzial-kart`", a rodzina
kart funkcji weszła do tamtego strażnika dopiero w tym samym zleceniu.
Przepisanie powodu byłoby wyłączeniem, które **wygląda na decyzję,
a jest przeoczeniem**.

### Dowód mutacyjny — dwa stany, ten sam przebieg

Obrys zdjęty, przebudowa, ten sam spec:

| | wynik |
| --- | --- |
| **bez obrysu, desktop 1440** | `plama 1.12 · kreska 0.00 · odstęp 16 px, promień 12 px · pokrycie 0%` → **1 failed** |
| **z obrysem** | **10 passed** |

⚠ **MOBILE-390 PRZESZŁO NAWET W MUTACJI — i to jest precyzyjna, nie
przypadkowa informacja:** tam odstęp wynosi 40 px, czyli ≥ 30, więc
kompozycja nadal działa. **Wada istnieje dokładnie od progu układu w
górę**, czyli tam, gdzie odstęp schodzi do 16 px. Mutacja pokazała nie
tylko, że strażnik widzi defekt, ale i **gdzie ten defekt sięga**.

## Rozstrzygnięcie 4 — STRAŻNIK ROZDZIAŁU LICZYŁ TŁO OD `body`. CZWARTE WYSTĄPIENIE TEJ SAMEJ KLASY

`e2e/rozdzial-kart.spec.ts` porównywał wypełnienie karty z tłem
`document.body`. Było to prawdą dokładnie tak długo, jak długo cała
strona miała jedno tło. **Od ADR-050 połowa sekcji leży w strefie
jasnej, która maluje własne tło — a `body` zostaje ciemne.**

Zmierzone w jednym przebiegu, obie liczby dla tej samej ramki kadru:

| | wobec `body` | wobec sekcji, w której element leży |
| --- | --- | --- |
| ramka kadru — plama | **20,07** | **1,12** |
| karta funkcji — plama | 20,07 | 1,12 |
| karta funkcji — kreska | 12,62 | **1,42** |

Pierwsza kolumna jest osiemnastokrotnie zawyżona i opisuje tło, którego
pod elementem **nie ma**.

**Klasa znana i policzona: to CZWARTE wystąpienie** wzorca „asercja
porównująca z GLOBALNĄ wartością przestaje mierzyć swój przedmiot, gdy
kontekst staje się lokalny" (marker konkretów — ADR-050; lustro L1 —
ADR-051; te dwa — tutaj). Naprawa jak poprzednio: **przenieść odczyt do
miejsca użycia** — tłem jest najbliższy malowany przodek.

⚠ **ŻADNA RODZINA NIE ZMIENIŁA WERDYKTU** — sprawdzone sondą **przed**
zmianą, wszystkie pięć liczone obiema metodami w jednym przebiegu.
Zmieniło się to, **czym zieleń jest uzasadniona**, nie to, czy jest.
Bez tej naprawy nowa rodzina przechodziłaby na plamie 20,07 wobec
ciemnego `body`, czyli **na fałszywej zieleni** — a fałszywa zieleń jest
gorsza od braku strażnika.

## Rozstrzygnięcie 5 — DEFEKT TEGO BATCHA ZŁAPANY WŁASNYM POMIAREM BARW

Slot ikony wziął rolę `powierzchnia-2` i wyszedł **ciemnym blokiem na
białej karcie**: zmierzone **16,17:1** tam, gdzie u wzorca ta sama
relacja wynosi **1,22:1** (pudełko ikony wobec płyty karty).

Wzorzec robi pudełko ikony **odrobinę jaśniejsze** od płyty; na korpusie
jasnym odpowiednikiem jest odrobinę **ciemniejsze**, czyli powierzchnia
sekcji na karcie białej. Po przemapowaniu `powierzchnia-2` w strefie
jasnej: **1,12:1** — ten sam szept.

⚠ **Defekt nie miał strażnika i wyszedł WYŁĄCZNIE z pomiaru barw po
zmianie.** Gdyby pomiar objął tylko geometrię — a geometria była
poprawna od pierwszego przebiegu: 64 × 64, promień 8 — pojechałby dalej.
**Pomiar geometrii i pomiar barwy to dwa różne pomiary tej samej
zmiany.**

## Rozstrzygnięcie 6 — pas możliwości: odpowiednik ISTNIEJE, tempo było z innego wzorca

| | wzorzec (zmierzone) | nasze do 04.09 | po zmianie |
| --- | --- | --- | --- |
| odpowiednik | **jest** — maszt z animacją liniową, nieskończoną, przesuw o −100% własnej szerokości | — | — |
| tempo | **50,0 px/s** (1312 px / 26,24 s) | 75 px/s | **50,0** ✓ |
| wysokość pozycji | **56 px** | 36 px | **56** ✓ |
| maski krawędzi | **BRAK** | brak | **brak** ✓ |

**Czas wyliczony z drogi i tempa, nie dobrany:** maszt polski ma
**2480,8 px** (przemierzone — ta sama liczba co przy poprzednim
wyliczeniu, więc treść pasa się nie zmieniła), droga jednego cyklu to
połowa plus odstęp kopii = **1264,4 px**, więc 1264,4 / 50 = **25,29 s**.

⚠ **ZERO MASEK JEST WYNIKIEM POMIARU, NIE JEGO LUKĄ — z kontrolą
pozytywną.** Sonda szukała `mask-image` **oraz** `-webkit-mask-image` na
maszcie i na **czterech poziomach przodków**, na trzech kadrach —
i **znalazła maskę gdzie indziej** na tej samej stronie (radialną, przy
innym elemencie). Narzędzie umie je znaleźć, więc zero przy pasie jest
zerem bytu. Masek nie dokładamy: byłyby naszym wymysłem podanym jako
anatomia wzorca.

⚠ **Granica konstrukcji bez zmian:** CSS nie zna szerokości masztu, więc
czas jest stały, a tempo zależy od długości treści. Przy 25,29 s
zmierzone maszty dają **50,0 px/s dla pl, 45,2 dla en, 47,4 dla de**.

### Reduced-motion — pas STOI, nie znika. Zmierzone

| co | wynik |
| --- | --- |
| `animation-name` masztu | **`none`** |
| `transform` masztu | **`none`** |
| pas widoczny | **tak**, 1440 × 216 px |
| pozycja: `visibility` / `opacity` | **`visible` / `1`** |
| treść pierwszej pozycji | **odczytana, niepusta** |

To jest dokładnie rozróżnienie, o które prosiło zlecenie: **zatrzymana
animacja, nie ukryty pas**. Sam brak animacji tego nie dowodzi — pas
schowany też nie ma animacji, a wymiar i krycie odróżniają jedno od
drugiego.

## Rozstrzygnięcie 7 — dbanie o siebie: anatomia sekcji jasnej z A2

Rytm **160 / 80**, miara nagłówka **1024**, miara akapitu **896** — te
same trzy wielkości co sekcje tekstowe z ADR-053. Zmierzone po zmianie:
wnętrze **1024 @ x 208** przy 1440, wcięcie **160/160**, akapit
`max 896px`. Slot foto bez zmian.

Powód, dla którego nie dostała własnych wartości: jest sąsiadką filarów
i sekcji tekstowych, a „oddech, nie piąty filar" znosi wszystko oprócz
oddychania w innym rytmie niż otoczenie.

## Rozstrzygnięcie 8 — styki stref bez zmian

Brak gradientów-mostów potwierdzony ponownie; przejścia zostają czystą
zmianą powierzchni. Jedyny gradient w okolicy to placeholder slotu foto
**wewnątrz** sekcji „Dbanie o siebie" (ADR-048), nie na styku.

## Podróże — anatomia ROZCIĄGNĘŁA drogi. Liczby, bez korekty

Kontrola negatywna w jednym przebiegu (`git stash` + przebudowa, ten sam
kod pomiarowy, kadr 390, ekran 844 px):

| | PRZED (`9fb8370`) | PO (A3) | różnica |
| --- | --- | --- | --- |
| wysokość strony | 10 647 px | **11 195** | **+548 px** |
| ekranów | 12,61 | **13,26** | **+0,65** |
| ból SAMA | 1,98 | 1,98 | 0,00 |
| ból LIDERKA | 6,59 | **7,17** | **+0,58** |
| ból STRUKTURA | 1,33 | 1,33 | 0,00 |
| **największa luka** | 3,28 | **3,85** | **+0,57** |

**Przyczyna jest policzalna i leży w karcie:** na kadrze 390 każda
z sześciu kart urosła o wypełnienie (24 → 32 px, dwa boki) i o slot
ikony z odstępem (64 + 16 px), czyli **+96 px na kartę, +576 razem**,
plus odstęp siatki 30 → 40 px (**+50**); w drugą stronę poszedł niższy
tytuł. Netto **+548 px**.

⚠ **NIE KORYGUJĘ — zlecenie mówi „podaj liczby, nie koryguj sam".**
Odnotowuję natomiast, że **cały przyrost pochodzi ze slotu ikony i
wypełnienia**, czyli z rzeczy, które są rezerwacją miejsca pod przyszłą
decyzję. Gdyby ikony nie miały wejść, 576 px wraca.

## Pomiary domykające

| | wynik |
| --- | --- |
| pełny zestaw e2e | **668 passed · 4 skipped · 0 failed** (o dwa więcej — nowa rodzina strażnika) |
| axe | **60 passed** |
| bramki statyczne | tokeny (30 ról) · liczby · parytet · kotwice · linki · no-JS · deklaracje — ZIELONE |
| zastane czerwienie | ESLint · kontrakt ΔE · Nieodwracalne · Wydajność — bez zmian |
| **LCP** | **mediana 36 ms** z pięciu przebiegów (36 · 44 · 36 · 52 · 36), element bez zmian |
| tytuł karty × wypełnienie | **18,26:1** |
| opis karty × wypełnienie | **7,34:1** |
| obrys karty × wypełnienie | **1,59:1** (próg 1,30) |
| obrys karty × tło sekcji | **1,42:1** (próg 1,30) |
| slot ikony × wypełnienie | **1,12:1** (wzorzec: 1,22:1) |

⚠ **LCP: pojedynczy przebieg dał 128 ms i BYŁ ODSTAJĄCY.** Gdyby stanął
w zwrotce sam, mówiłby o czterokrotnym regresie wobec 32 ms z ADR-052.
Pięć przebiegów daje medianę **36 ms**. To jest ta sama reguła, którą
kanon zapisał przy zapasie: **jedna wartość wielkości z rozrzutem nie
ustala niczego** — i pierwszy raz zadziałała tu na wartość, która
wyglądała na złą wiadomość.

## Czego ten ADR NIE rozstrzyga

- **Rzędu „4 + 2"** — kształt spoza wzorca; trzy wyjścia opisane wyżej,
  decyzja koordynatora.
- **Zawartości slotów ikon** — pudełka wchodzą puste na wyraźne
  polecenie; ikony to osobna decyzja właściciela i osobne zlecenie.
- **Wagi opisu karty** — wzorzec 400, my 500; zmiana wagi prozy jest
  decyzją systemową.
- **Pasma 1024–1439** — cztery kolumny wzorca kontra nasze dwa; to
  pochodna progów układu, nie tej sekcji.
- **Migracji dwóch literałów wagi 600** (duet wyróżnienia, nazwa kroku
  rytmu) na nowy token — pliki poza zakresem zlecenia.
- **Przyrostu podróży** — zmierzony i zgłoszony, bez korekty.
