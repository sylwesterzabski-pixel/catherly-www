# ADR-055: Siatka kart 2 × 3 i batch A4 — filary w anatomii wzorca

Data: 2026-09-04. Status: **PRZYJĘTY** (zlecenie `WWW/080`, kroki 1–2).

Pomiar celowany 04.09.2026 (Playwright, kadry 390 / 768 / 810 / 1023 /
1024 / 1025 / 1280 / 1440 / 1600; klucz `viewport`, każdy przebieg drukuje
kadr zmierzony). Próbka bloku feature: **cztery bloki dwukolumnowe**
rozpoznane po treści, nie po klasach.

---

## Rozstrzygnięcie 1 — siatka kart 2 × 3: liczba kolumn jest DECYZJĄ, nie pomiarem

ADR-054 zgłosił, że pomiar daje na szerokim kadrze **cztery** kolumny,
a przy sześciu kartach ostatni rząd ma dwie — kształt, którego wzorzec
nie pokazuje ani razu (jego siatka czterokolumnowa niesie szesnaście
kart, czyli cztery pełne rzędy).

Rozstrzygnięcie koordynatora 04.09: **pełne rzędy ważniejsze niż liczba
kolumn** → 3 / 2 / 1.

| | przed | po | rachunek |
| --- | --- | --- | --- |
| kolumny @1440 | 4 | **3** | — |
| szerokość karty | 308 px | **416 px** | (1280 − 2 × 16) / 3 = 416 |
| rzędy | 4 + 2 | **3 + 3** | — |

Zmierzone po zmianie: **416 px, rzędy [3, 3]**. Reszta anatomii karty
(wypełnienie, promień, obrys, typografia, miara, pudełko ikony) pochodzi
z pomiaru bez zmian — rozstrzygnięcie dotyczy **wyłącznie liczby kolumn**
i tak jest opisane w arkuszu, żeby następny czytający nie wziął jej za
liczbę zmierzoną.

### Dowód mutacyjny na NOWEJ siatce

Geometria się zmieniła (416 zamiast 308), więc dowód powtórzony:

| | wynik |
| --- | --- |
| bez obrysu | `plama 1.12 · kreska 0.00 · odstęp 16 px, promień 12 px` → **czerwień** |
| z obrysem | **10 passed** |

## Rozstrzygnięcie 2 — anatomia bloku feature

| | wzorzec | nasze do 04.09 | po zmianie |
| --- | --- | --- | --- |
| kontener | **1200 px, zamknięty** | brak ograniczenia | **1200** ✓ |
| wcięcie boczne | **40 px** | 20 / 40 / 135 | **40** ✓ |
| proporcja tekst : media | **1 : 2** od 1024 | 1 : 1 | **1 : 2** od 1440 |
| poniżej progu | **1 : 1** | 1 : 1 | **1 : 1** ✓ |
| odstęp kolumn | **32 px** / 16 px | 100 px | **32 / 16** ✓ |
| kolejność | **tekst po LEWEJ, 4 z 4** | zebra L-P-L-P | **tekst po lewej** ✓ |
| kadr wąski | tekst NAD mediami | tekst nad | ✓ bez zmian |
| odstęp między blokami | **320 px** / 80 px | 320 / 160 | **320 / 80** ✓ |
| wyrównanie pionowe | `normal` | `center` | **`center`** — patrz niżej |

**Zgodność zmierzona po zmianie, przy 1440:** wnętrze **1200 @ x 120**,
kolumny `378.656px 378.672px 378.672px`, tekst **379 @ x 120**, media
**789 @ x 531**. Wzorzec: kolumny `378.656px 378.672px 378.672px`, tekst
379 @ x 120, media 789 @ x 531. **Identyczne co do cyfry.**

⚠ **TRZY KOLUMNY, NIE `1fr 2fr` — i ta różnica jest widoczna w liczbach.**
Wzorzec ma siatkę **trzykolumnową** z odstępem 32, w której media zajmują
dwie kolumny **razem z odstępem między nimi**: (1200 − 2 × 32) / 3 =
378,67, więc media mają 2 × 378,67 + 32 = 789,33. Zapis `1fr 2fr` z jednym
odstępem daje 389,33 i 778,67 — **dziesięć pikseli obok**. Pierwsza wersja
tego bloku miała właśnie `1fr 2fr`; obalił ją pomiar po zmianie, nie
lektura.

⚠ **PRÓG: wzorzec przełącza się na 1024, my na 1440.** W paśmie 1024–1439
mamy kolumny równe tam, gdzie wzorzec ma już 1 : 2. Ta sama znana różnica
progów co przy siatce kart (ADR-049: „nasze zostają 48rem/90rem").

⚠ **`align-items: center` ZOSTAJE mimo `normal` u wzorca — różnica
licencjonowana.** U wzorca kolumna mediów ma stałą wysokość, więc
rozciąganie jest nieszkodliwe. U nas slot trzyma rezerwę CLS przez
`aspect-ratio`, a `stretch` tę rezerwę nadpisuje. Przeniesienie wartości
zepsułoby gwarancję, której wzorzec nie ma.

## Rozstrzygnięcie 3 — NAPRZEMIENNOŚCI WZORZEC NIE STOSUJE

Zlecenie kazało to **potwierdzić pomiarem, nie przyzwyczajeniem**.
Zmierzone: **wszystkie cztery bloki mają tekst po lewej**, na wszystkich
trzech kadrach, a w toku dokumentu tekst stoi pierwszy.

Zebra L-P-L-P była naszym nawykiem z wzorca `WWW/050-FINAL`. Reguły
`.obrazPoLewej` usunięte razem z propem komponentu i flagami w tablicy
`FILARY` — prop, który nic nie robi, jest dokładnie martwą deklaracją
z pozycji **T56**.

⚠ **Zakres: TYLKO `Filar` (strona główna).** `ModulFunkcji` na czterech
podstronach funkcji nadal stosuje zebrę i **zostaje nietknięty** — to inny
komponent i inny batch.

### Strażnik przepisany, nie usunięty — i wyszedł MOCNIEJSZY

`e2e/filary.spec.ts` pilnował wzoru zebry przez odczyt `order` obrazu
(0-1-0-1). Nowa asercja **nie czyta `order`** — czyta **położenie**:
lewa krawędź tekstu musi leżeć na lewo od lewej krawędzi mediów, na
każdym z czterech filarów. Kolejność w DOM (tekst przed obrazem) zostaje
bez zmian, bo to własność czytników ekranu, niezależna od strony.

**Dowód mutacyjny — i to jest dowód mocniejszy niż zwykły:** kolumny
odwrócono `direction: rtl`, czyli mechanizmem, **którego stara asercja
nie widziała w ogóle**. Nowa zapaliła się natychmiast
(`desktop (filar1): tekst po LEWEJ`), przywrócenie → 18 passed.

## Rozstrzygnięcie 4 — typografia filaru

| | wzorzec | nasze do 04.09 | po zmianie |
| --- | --- | --- | --- |
| nagłówek | 36 px / 700 / lh 40 | 48 / 500 (globalne) | **48 / 500** — decyzja |
| odstęp nagłówek → lead | **8 px** | 12 px | **8** ✓ |
| zdanie prowadzące | **18 px / 700 / lh 28** | 20 / 600 (duet) | **18 / 700 / 28** ✓ |
| trzy konkrety | **NIE ISTNIEJE** | 16 px, lista | bez zmian |

⚠ **NAGŁÓWEK BLOKU U WZORCA (36/700) TO INNA ROLA NIŻ JEGO NAGŁÓWEK
SEKCJI (48/500)** — wzorzec je rozdziela. U nas nagłówek filaru jest `h2`
i bierze skalę globalną, zgodnie z rozstrzygnięciem „H2 już globalne".
Różnica zapisana, żeby nie wyglądała na przeoczenie pomiaru.

⚠ **TRZECH KONKRETÓW NIE MA CZEGO PRZENIEŚĆ.** Na całej stronie wzorca
jest **zero** elementów `ul li` / `ol li` — policzone, nie oszacowane.
Blok feature niesie tam wyłącznie nagłówek i jedno zdanie. Nasza lista
zostaje **nie z przyzwyczajenia, tylko dlatego, że pomiar nie ma dla niej
odpowiednika**.

### ⚠ DUET Z KROPKĄ K3 ZERWANY — koszt, nie skutek uboczny

Zdanie prowadzące filaru komponowało dotąd `duet` (20 px / 600) wspólnie
z „kropką" sekcji problemu i rytmu dnia; zapis z handoffu K4 mówił wprost,
że obie rzeczy mają mówić **jednym głosem z jednego miejsca**. Pomiar daje
18 / 700 / 28, więc zlecenie („z pomiaru celowanego") i tamten zapis nie
mogą obowiązywać naraz.

Wybrano pomiar, bo tego żąda zlecenie — ale **kropka zostaje nietknięta**
(20 px, pilnowane literałem w `e2e/zlozenie.spec.ts`, który jest
mechanizmem, nie dryfem). Skutek: dwie rzeczy, które miały mówić jednym
głosem, mówią odtąd dwoma. **Zgłoszone koordynatorowi; przywrócenie duetu
to przywrócenie jednej linijki `composes`.**

## Rozstrzygnięcie 5 — RAMKA FILARU TRACI MECHANIZM ROZDZIAŁU I ODZYSKUJE GO OBRYSEM

Odstęp kolumn zszedł ze 100 px na 16 (poniżej progu górnego) i 32
(powyżej), a kompozycja z ADR-038 zalicza dopiero od 30 px. Plama slotu
w strefie jasnej wynosi **1,12:1** przy progu 1,30, kreski nie było,
obrazu w pustym slocie też nie.

**Strażnik złapał to natychmiast po zmianie siatki** — i złapał
**wyłącznie dlatego, że w ADR-054 zaczął liczyć tło od sekcji, a nie od
`body`**: przy starym pomiarze plama wychodziła 20,07 i rodzina
przeszłaby na fałszywej zieleni. Naprawa strażnika z poprzedniego batcha
zapracowała na siebie w następnym.

Obrys jest przy tym **zgodny z pomiarem**: panel mediów wzorca ma obrys
jednopikselowy o barwie jaśniejszej od własnego wypełnienia, promień
i cień zewnętrzny. Zapis „wzorzec ramki nie obrysowuje" pochodził
z `WWW/050-FINAL` i został odwrócony przez pomiar.

Zmierzone po zmianie: obrys × wypełnienie **1,59:1**, obrys × tło sekcji
**1,42:1**, plama 1,12:1 — próg 1,30 spełniony **kreską**, nie plamą.

## Rozstrzygnięcie 6 — DEFEKT WŁASNY: usunięcie zebry zabrało klasę `.tekst`

Po skasowaniu reguł `.obrazPoLewej .tekst` nazwa `.tekst` przestała
występować w arkuszu. **CSS Modules eksportuje wyłącznie klasy, które
w arkuszu są**, więc `styles.tekst` zaczęło zwracać `undefined` — a React
pomija wtedy atrybut, **nie zostawiając w znaczniku żadnego śladu po
błędzie**.

Wykryte pomiarem z kontrolą pozytywną na zbudowanym HTML:
`Filar_obraz__` **jest**, `Filar_tekst__` **nie ma**. Naprawione regułą
`.tekst`, która przy okazji przydała się na progu górnym
(`grid-column: span 1`).

**Klasa T56 widziana od drugiej strony:** tam znikał skutek deklaracji,
tu znika **sam uchwyt** — i to bez jednego sygnału, bo `class="undefined"`
w znaczniku się nie pojawia.

## Rozstrzygnięcie 7 — T57: PEŁNY ZESTAW e2e NIE MA KADRU SZEROKIEGO

**Wykryte mutacją, KTÓRA NIE ZADZIAŁAŁA.** Przy dowodzeniu nowego
strażnika układu wstawiłem `order: 2` do bloku `@media (min-width: 90rem)`
i spodziewałem się czerwieni — suita dała **18 passed**. Ta sama mutacja
w bloku 48,0625rem zapaliła strażnika natychmiast.

Odczyt konfiguracji: projekty to `mobile-390` (390 × 844) i `desktop`,
który bierze `devices["Desktop Chrome"]`, czyli **1280 × 720**. Nasz
górny próg to 1440, więc **żaden przebieg suity nigdy nie wchodzi w blok
90rem**.

⚠ **Milcząca mutacja jest sygnałem o ZASIĘGU POMIARU, nie o strażniku.**
Bez tego sprawdzenia zapisałbym „strażnik przepisany i udowodniony", a
dowód dotyczyłby innego kadru niż ten, o którym mowa.

Bez dowodu bramkowego zostają: trzykolumnowa siatka kart, proporcja 1 : 2
kolumn filaru z odstępem 32 px, i każda przyszła reguła progu 90rem.
Wszystko to zmierzone **własną sondą przy 1440**, nie przez bramkę.
Pozycja **T57**, z trzema drogami zamknięcia; nie naprawiam (zakaz 8 —
trzeci projekt to decyzja o koszcie bramki).

## Podróże — anatomia SKRÓCIŁA drogi

Kontrola negatywna w jednym przebiegu (`git stash` + przebudowa, kadr 390,
ekran 844 px):

| | PRZED (`20bbc20`) | PO (A4) | różnica |
| --- | --- | --- | --- |
| wysokość strony | 11 195 px | **10 944** | **−251 px** |
| ekranów | 13,26 | **12,97** | −0,29 |
| ból SAMA | 1,98 | 1,98 | 0,00 |
| ból LIDERKA | 7,17 | **7,02** | −0,15 |
| ból STRUKTURA | 1,33 | 1,33 | 0,00 |
| największa luka | 3,85 | 3,89 | +0,04 |

Batch **odzyskał blisko połowę** przyrostu, który dołożył A3 (+548 px):
odstęp między filarami na kadrze wąskim zszedł ze 160 na 80 px, zgodnie
z pomiarem. Największa luka bez wyjścia praktycznie bez zmian.

## Pomiary domykające

| | wynik |
| --- | --- |
| pełny zestaw e2e | **668 passed · 4 skipped · 0 failed** |
| axe | **60 passed** |
| bramki statyczne | tokeny (30 ról) · liczby · parytet · kotwice · linki · no-JS · deklaracje — ZIELONE |
| zastane czerwienie | ESLint · kontrakt ΔE · Nieodwracalne · Wydajność |
| **LCP** | **mediana 36 ms** z pięciu przebiegów (32 · 48 · 36 · 36 · 36), element bez zmian |
| obrys ramki × wypełnienie | **1,59:1** (próg 1,30) |
| obrys ramki × tło sekcji | **1,42:1** (próg 1,30) |
| plama ramki × tło sekcji | 1,12:1 — rozdziela **kreska**, nie plama |

## Czego ten ADR NIE rozstrzyga

- **Duetu K3 / K4** — zerwany zgodnie ze zleceniem; przywrócenie to jedna
  linijka, decyzja koordynatora.
- **Zebry w `ModulFunkcji`** — cztery podstrony funkcji nadal ją mają;
  inny komponent, inny batch.
- **Pasma 1024–1439** — wzorzec ma tam już 1 : 2, my kolumny równe;
  pochodna progów układu.
- **Kadru szerokiego w bramce** — pozycja T57, trzy drogi, decyzja
  właściciela.
- **Nagłówka bloku 36 / 700** — wzorzec rozdziela nagłówek bloku od
  nagłówka sekcji; u nas jeden `h2` i skala globalna z rozstrzygnięcia.
