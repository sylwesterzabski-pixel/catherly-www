# ADR-059: Pas piksela — kadr właściciela 1190, stopień pośredni typografii, życie bez zdjęć

Data: 2026-09-04. Status: **PRZYJĘTY** (zlecenie `WWW/084` v3, kroki 1–4).

Batch porządkujący: nie przenosi nowej anatomii, tylko domyka to, co
audyt na żywo pokazał jako kolizje na czterech szerokościach — w tym na
**1190**, którym pracuje właściciel.

---

## Rozstrzygnięcie 1 — czwarty projekt e2e: 1190 × 900

⚠ **1190 leży w paśmie, którego żaden z trzech projektów nie
reprezentuje.** `desktop` (1280) jest po drugiej stronie progu
typografii (80rem), `desktop-wide` (1440) po drugiej stronie progu
układu (90rem), `mobile-390` poniżej obu. **Kadr, na którym się patrzy,
ma być kadrem, na którym się mierzy** — to samo, czego nauczyła pozycja
T57, tylko od strony pasma zamiast progu.

**Dowód mutacyjny UNIKALNY dla tego projektu.** Mutacja
`tekst.h2-srednie` 2,25rem → 2,5rem dotyka wyłącznie pasma 768–1279:

| projekt | wynik |
| --- | --- |
| `mobile-390` | zielony |
| `desktop` (1280) | zielony |
| `desktop-wide` (1440) | zielony |
| **`wlasciciel-1190`** | **CZERWONY** |

Cofnięcie → 4 passed. Żaden inny projekt tej zmiany nie widzi.

**Koszt bramki:** 3 projekty **73,6 s / 1,2 min**; 4 projekty
**102,2 s / 110,7 s / 102,4 s**, 1376 przypadków. Przyrost około
**jednej trzeciej**, nie dwukrotność — czwarty projekt jest tańszy od
trzeciego, bo suita rozkłada się na te same rdzenie.

### ⚠ Ta sama mutacja, w pierwszym podejściu, MILCZAŁA — i to było ustalenie

Pierwsza próba dowodu nie zapaliła niczego. Przyczyna nie leżała
w projekcie, tylko w tym, że **H1 podstron omijał stopień pośredni**:
`NaglowekPodstrony` i `/cennik` ustawiały od progu 48,0625rem od razu
`--tekst-h2` (48 px), więc na kadrze 1190 tytuł podstrony miał 48, gdy
nagłówki sekcji miały 36. Luka wyszła **wyłącznie dlatego, że mutacja
nie zadziałała** — drugi raz w tej serii milcząca mutacja okazała się
sygnałem o zasięgu, nie o strażniku (pierwszy: T57).

## Rozstrzygnięcie 2 — audyt kolizji na żywo: tabela defekt → naprawa → pomiar

Sonda mierzyła na **1190 · 1440 · 810 · 390**, na czterech trasach, przy
trzech pozycjach przewinięcia.

| co mierzone | przed | po |
| --- | --- | --- |
| elementy **poza kadrem** | **0** | **0** |
| **nakładki** sąsiadów w toku | **0** | **0** |
| **panorama** strony (`scrollWidth` > kadr) | **brak** | **brak** |
| odstęp siatek kart (desktop) | **16 px** | **32 px** |
| odstęp siatek kart (390) | 40 px | 40 px |
| karta ucięta przy krawędzi | **brak na żadnej szerokości** | brak |

**Progi kolumn `/cennik` bisekcją:** 700 → 1 · **767 → 1** · **768 → 3** ·
900 · 1023 · 1024 · 1189 · **1190 → 3** · 1279 · 1280 · 1440 → 3.
Prawa krawędź kart: 680 ≤ 700 · 747 ≤ 767 · 748 ≤ 768 · **1169 ≤ 1189** ·
**1170 ≤ 1190** · 1259 ≤ 1279 · 1360 ≤ 1440. **Nic nie wystaje.**

**Styk kart funkcji × pas marquee:** karty mają dolne wypełnienie 0, pas
górne **160 / 80** — czyli odstęp sekcji jest egzekwowany w całości przez
pas. Zmierzona odległość pudełek wynosi 0, bo pudełka przylegają;
widoczny odstęp to 160 px.

## Rozstrzygnięcie 3 — pasek: prześwit, nie kolizja

⚠ **Wzorzec tego problemu nie ma i mieć nie może.** Zmierzone: jego pasek
jest **całkowicie przezroczysty** (`rgba` zerowe, `backdrop-filter: none`)
— wystarcza mu to, bo cała jego strona jest ciemna. **U nas połowa sekcji
leży w strefie jasnej od ADR-050**, więc pod ciemną, półprzezroczystą
pigułkę wjeżdża jasna treść i prześwituje.

**Przeniesienie wartości wzorca POGŁĘBIŁOBY wadę.** To przypadek,
w którym wierność pomiarowi jest błędem, bo warunek brzegowy jest inny.

Alfa **0,60 → 0,92**. Rachunek na barwach **zmierzonych** (pasek, tło
sekcji jasnej, barwa tekstu na jasnym):

| | tło pod paskiem | tekst pod paskiem | kontrast |
| --- | --- | --- | --- |
| przed (0,60) | rgb(101, 102, 100) | rgb(13, 13, 12) | **3,37:1** — czytelne przez pasek |
| po (0,92) | rgb(26, 27, 25) | rgb(8, 9, 7) | **1,15:1** — nieczytelne |

⚠ **Miara „ile elementów przecina pasek" nie może dojść do zera** przy
pasku pływającym — treść z definicji pod nim przechodzi. Mierzalnym
przedmiotem jest **prześwit**, i ten spadł z czytelnego do niewidocznego.

## Rozstrzygnięcie 4 — odstęp siatek: 16 → 32, jedną decyzją w tokenie

⚠ **To jest decyzja właściciela, nie pomiar** — i tak stoi w tokenie.
Pomiar wzorca daje 16 px. Zlecenie żąda co najmniej 24 px z drabiny 1g,
a **24 na tej drabinie nie występuje** (8 · 16 · 32 · 40 · 80 · 160 ·
240), więc **32 jest jedyną wartością spełniającą oba warunki**.

⚠ **Skutek uboczny, który jest zyskiem:** 32 px przekracza próg 30 px
trzeciego mechanizmu ADR-038 — karty **odzyskują rozdział kompozycją**,
którego nie miały przy 16 px (to właśnie brak kompozycji wymusił obrys
w ADR-054).

Jeden token `wymiar.odstep-siatki-kart` obsługuje cztery siatki: karty
funkcji, skrót cennika, plany na `/cennik`, pas ścieżek.

## Rozstrzygnięcie 5 — stopień pośredni typografii dla 768–1279

⚠ **To pasmo jest NASZE — wzorzec go nie pokazuje.** Jego próg leży przy
1024 i od niego trzyma pełne 96/48; nasz układ dochodzi do pełnej skali
przy 1280. Między 768 a 1279 mieliśmy 80/48 — H1 o krok niżej, a H2 już
w pełni, czyli na kadrze właściciela nagłówek sekcji był niemal połową
H1 zamiast **zmierzonej połowy dokładnej**.

**Rachunek:** pasmo bierze **trzy czwarte** skali pełnej —
96 × 0,75 = **72**, 48 × 0,75 = **36**. Relacja H1 : H2 wynosi wtedy
dokładnie **2,00**, czyli krok skali zmierzony u wzorca obowiązuje także
tam, gdzie wzorca nie ma. Wariant 64 łamałby relację albo wymuszał H2 32,
poza żądanym zakresem 36–40. Tracking idzie za regułą wzorca (stały
−0,025em): **−1,8 px** przy 72 i **−0,9 px** przy 36.

⚠ **Próg pełnej skali zszedł z 90rem na 80rem — tylko dla typografii.**
Progi układu zostają przy 90rem; rozdzielenie jest celowe i zapisane,
żeby nikt ich potem nie „ujednolicił".

Zmierzone po zmianie:

| kadr | H1 | H2 |
| --- | --- | --- |
| 390 | **48** | **30** |
| 810 | **72** | **36** |
| **1190** | **72** | **36** |
| 1440 | **96** | **48** |

## Rozstrzygnięcie 6 — życie bez zdjęć: slot ZWIJA SIĘ, mechanika zostaje

`:empty` na czterech slotach (hero, filar, dbanie, moduł). **Mechanika
zostaje w całości** — proporcja, gradient, promień, obrys i rezerwa CLS
czekają nietknięte; znika wyłącznie **stan pusty**.

⚠ **`:empty` jest tu narzędziem właściwym**, bo pyta o to, co naprawdę
rozstrzyga: czy w ramce cokolwiek jest. Warunek na propie trzeba by
powtórzyć w czterech komponentach i w każdym można go zapomnieć; selektor
pyta DOM, więc **w dniu, w którym kadr wejdzie, ramka wróci sama**.

Tekst przechodzi na **pełną miarę**, gdy slot zwinięty — przez
`:has(.obraz:empty)` pod `@supports`. ⚠ Pierwsza wersja postawiła tę
regułę wyłącznie w bloku 90rem i **strażnik złapał to na kadrach 1190
i 1280**: tekst zostawał na **547 z 1110** i **592 z 1200** — pusty
prostokąt znikał, a jego miejsce zostawało.

**Skutek zmierzony na wysokości strony:**

| trasa (kadr) | przed | po | różnica |
| --- | --- | --- | --- |
| `/` (1190) | 10 413 | **9 079** | −1 334 |
| `/` (1440) | 10 631 | **8 930** | −1 701 |
| `/funkcje/pozyskiwanie` (1440) | 10 464 | **7 696** | −2 768 |
| `/funkcje/pozyskiwanie` (390) | 8 901 | **6 564** | −2 337 |

## Rozstrzygnięcie 7 — mapa stref i limonka: AUDYT CZYSTY

Audyt na żywo, wszystkie sekcje strony głównej:

| sekcja | `data-ton` | zmierzone tło | zmierzony akcent |
| --- | --- | --- | --- |
| Hero · PasSciezek · PasMozliwosci · CennikSkrot · Faq | brak | przezroczyste (dziedziczy ciemne) | **#a0e00d** |
| SekcjaTekstowa ×2 · KartyFunkcji · Filar ×4 · DbanieOSiebie | `jasny` | rgb(242,242,242) | #4f6f06 |
| SekcjaRytmu | `jasny` | rgb(255,255,255) | #4f6f06 |
| Zamkniecie | `ciemny` | rgb(7,8,6) | **#a0e00d** |

⚠ **Żadna sekcja ciemna nie pokazuje oliwki.** Oliwka występuje wyłącznie
tam, gdzie strefa jasna ją przestawia — i **musi tam być**: limonka na
jasnym ma 1,43:1, czyli jest nieczytelna. Zlecenie spodziewało się
defektu; pomiar go nie potwierdza.

⚠ **Ciemna strefa działa przez DZIEDZICZENIE, nie przez deklarację** —
ciemne jest domyślne, jasne jest nadpisaniem (ADR-050). To nie luka, to
mechanizm; dopisanie `data-ton="ciemny"` pięciu sekcjom **dołożyłoby im
poświatę dekoracyjną**, której nie mają mieć.

## Rozstrzygnięcie 8 — brązowa smuga i duch hero

⚠ Smuga przy CTA była zmierzona jako `color(srgb 0,565 0,373 0,278 /
0,35)` — **wyraźnie ciepły brąz**, poza paletą, która po ADR-038 jest
neutralna i limonkowa. Czytała się jako zabrudzenie, nie głębia.

Token poświaty schodzi na **neutralną biel** (tę samą, którą niesie rdzeń
poświaty hero), a mieszanie z **35% na 8%** — tyle, ile ma poświata hero
z pomiaru wzorca. Obie dekoracje mówią odtąd jednym językiem: **czysta
głębia, bez barwy własnej**.

**Duch hero zmierzony i BEZ ZMIAN:** `color(srgb 1 1 1 / 0,06)`, 256 px —
biel przy 6%, czyli już czysta głębia. Nie było czego korygować;
odnotowuję pomiar, żeby nie wyglądało na pominięcie.

## Rozstrzygnięcie 9 — puste przebiegi ramy końcowej

Stopka miała odstępy **160/48** i **80/48**; **48 nie występuje na
drabinie 1g**, więc dół strony oddychał inaczej niż wszystko nad nim.
Wchodzi **80 px** — ten sam szczebel, który niesie rytm sekcji na kadrze
wąskim. Sekcja zamknięcia: **160/160** (od ADR-056).

## Pomiary domykające

| | wynik |
| --- | --- |
| pełny zestaw e2e (**4 projekty**) | **1376 passed · 12 skipped · 0 failed**, 102,4 s |
| axe (4 projekty) | **120 passed** |
| bramki statyczne | wszystkie ZIELONE (30 ról) |
| ESLint | **1 ostrzeżenie zastane**, zero nowych |
| **podróże** (390) | strona **11 246 → 10 106 px**, **13,32 → 11,97 ekranu**; ból LIDERKI 7,08 → **6,53**; luka 3,91 |
| **LCP** (1190) | **mediana 28 ms** (28 · 32 · 28 · 28 · 28) |
| prześwit przez pasek | **3,37:1 → 1,15:1** |

## Trzy strażniki przepisane, żaden nie osłabiony

1. **`@supports` przełącznika** — asercja kroiła arkusz na **pierwszym**
   `@supports selector` w pakiecie; gdy sloty dołożyły drugi blok,
   „pierwszy" przestał znaczyć „ten". Naprawa celuje w **relację**: baza
   przed blokiem **dotyczącym przełącznika**. Ta sama klasa, którą
   `ruch.spec.ts` zapisał przy hamburgerze.
2. **`filary` i `funkcje-anatomia`** — slot zwinięty nie ma pudełka, więc
   asercja o jego położeniu nie ma przedmiotu. Gałąź dla stanu
   zwiniętego pyta o rzecz, która ma wtedy obowiązywać: **pełną miarę
   kolumny tekstu**. To ona złapała lukę w paśmie 768–1279.
3. **Rola H1 podstrony** — test porównywał z **tokenem**, czyli powtarzał
   model skali; po dołożeniu trzeciego szczebla model się rozjechał.
   Teraz porównuje **z żywym `h2`** na tej samej stronie (największym
   widocznym — pierwszy na `/cennik` to nagłówek karty planu, 16 px).
   Taki test przeżyje każdą zmianę skali.

## Czego ten ADR NIE rozstrzyga

- **Wagi nagłówków** (700 wobec 500 u wzorca) — decyzja całej strony.
- **Pozycji T58** (martwa rodzina ruchu) — nietknięta.
- **Odstępu 24 px** — na drabinie nie istnieje; jeśli ma obowiązywać
  dosłownie, trzeba rozszerzyć drabinę osobną decyzją.
