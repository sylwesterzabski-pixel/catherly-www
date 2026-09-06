# ADR-070 — wzorzec v2 i trzy sekcje w jego proporcjach

- Status: PRZYJĘTY
- Data: 2026-09-06
- Zlecenie: `WWW/097/2` (partia 1; zastępuje `WWW/097`, które zatrzymało się na trzech warunkach STOP)
- Baza: `ff76745`
- Zakres: **wyłącznie hero, sekcja „pamięć" i rząd trzech kart.** Pozostałe sekcje nietknięte — partia 2+.

## 1. Dwa wzorce, obie miary prawdziwe

`WWW/097` rozjechało się z pasmem koordynatora na ośmiu pozycjach,
o 1,6 do 14,2 pp, i zatrzymało się zgodnie z własnym warunkiem. **Nie był
to błąd żadnej ze stron.** Mierzyliśmy dwa różne pliki:

| | v1 `design/wzorzec-2026-09-06/glowna.png` | v2 `design/wzorzec/glowna-v2-2026-09-06.png` |
| --- | --- | --- |
| wymiar | 1536 × 2752 | **906 × 902** |
| układ | **kolaż dwukolumnowy** — pas górny 1536, reszta w dwóch kolumnach po 768 | **jedna kolumna** |
| nawigacja | jest | **nie ma** |
| karty rzędu | **trzy RÓWNE** (216 / 217 / 216 z 768) | **środkowa szersza** (23 / 42,5 / 23 %) |
| SHA-256 | `daa34f99…` | `450f61a4b51eda27…` |

Ten sam pomiar kart dał na v1 „28,1 / 28,3 / 28,1 % kolumny", a na v2
„22,74 / 43,16 / 22,74 % szerokości". Obie liczby są poprawne na swoim
pliku. **Klasa do zapamiętania: pasmo kontrolne bez wskazania PLIKU, na
którym powstało, jest nieporównywalne z pomiarem — a wygląda na
porównywalne.** `WWW/097/2` domknęło to jedną linią: podało sumę i wymiar
przed pomiarem.

**v1 zostaje i nie jest unieważniona.** Niesie nawigację i pas górny,
których v2 nie ma.

## 2. Pomiar v2 wobec pasma koordynatora

Próg zlecenia: rozjazd > 1,5 pp → STOP na tej pozycji, reszta idzie.

| pozycja | pasmo | pomiar v2 | Δ pp | |
| --- | --- | --- | --- | --- |
| hero: wysokość | 46 | **46,36** | 0,36 | ✓ |
| hero: kolumna tekstu, lewa | 4,4 | **4,64** | 0,24 | ✓ |
| hero: H1 rozmiar | 5,3 | **5,30** | 0,00 | ✓ |
| hero: H1 waga | ≈600 | **≈600** (laska 0,125 wobec 0,100 akapitu) | — | ✓ |
| hero: zdjęcie x start | 47,9 | **46,6–48,7** | 0,78–1,32 | ✓ |
| hero: zdjęcie prawa krawędź | 100 | **100,00** | 0,00 | ✓ |
| hero: zdjęcie y | 0→100 % hero | **0→100 %** | 0,00 | ✓ |
| pamięć: wysokość | ~30 | **30,79** | 0,79 | ✓ |
| pamięć: H2 bez akcentu | brak | **0 pikseli zielonych** | — | ✓ |
| pamięć: H2 wierszy | 2 | **2** | — | ✓ |
| pamięć: akapit | 1,7 | **1,77** (tusz) | 0,07 | ✓ |
| pamięć: mockup x | 44,3→93,7 | **44,37→94,04** | 0,07 / 0,34 | ✓ |
| **pamięć: mockup wysokość** | **18,1** | **24,17** | **6,07** | **✗ STOP** |
| karty: wysokość | ~20,4 | **19,09** | 1,31 | ✓ |
| karty: szerokości | 23 / 42,5 / 23 | **22,74 / 43,16 / 22,74** | 0,26 / 0,66 / 0,26 | ✓ |
| karty: odstęp | 1,3 | **1,21** | 0,09 | ✓ |
| karty: marginesy | 4,4 | **4,64 / 4,30** | 0,24 / 0,10 | ✓ |
| karty: ikona | 3,5 | **2,10** (tusz) | 1,40 | ✓ |
| karty: tytuł | 1,7 | **1,10** (tusz) | 0,60 | ✓ |
| karty: tekst | 1,1 | **0,77–1,10** | 0–0,33 | ✓ |
| karty: link | 1,1 | **0,88** | 0,22 | ✓ |

**Jedna pozycja poza pasmem — wysokość mockupu — i jest zatrzymana.**
Przyczyna zmierzona: **proporcja pliku.** Mockup v2 ma 450 × 219 px, czyli
stosunek 2,05; nasz `3-macbook-iphone-ekran-alfa.avif` ma 1600 × 1195,
czyli **1,34**. Przy zmierzonej szerokości 49,67 % nasz plik jest z
konieczności wyższy. Szerokość (zgodną) biorę, wysokości (niezgodnej) nie
używam jako osobnego ograniczenia — patrz T78.

### Kontrole, bez których te liczby byłyby zerem narzędzia

- **Akcent w H2:** 0 pikseli zielonych przy kontroli pozytywnej w tym samym
  przebiegu — pigułka CTA hero **85,7 %**, link na karcie **15,2 %**.
- **Krawędź zdjęcia:** pierwsza sonda mierzyła pas y 5–105 i kontrola
  negatywna dała **28,77** zamiast ~0 — pas zawierał pierwszy wiersz H1.
  Po zawężeniu do y 5–55 szum spadł do **1,09** i dopiero wtedy wynik był
  wiążący.
- **Karty:** pierwsza sonda liczyła grafit w WIERSZU i dzieliła karty na
  pięć, bo białe tytuły przerywały ciąg. Liczenie w KOLUMNIE dało trzy.
- **Listwa zrzutu:** v2 ma na `x 0–1` dwa piksele o jasności 119, czyli
  ciemniejsze od tła. Każdy skan „od lewej" łapał je jako treść. Wyłączone
  ze wszystkich pomiarów.

## 3. Co weszło

**Hero.** Wcięcie 4,64 % (`wciecie-wzorca`), minimum wysokości 46,36 %,
H1 z interlinią 1,09 i wagą 600, akapit i linia zaufania **bez wcięcia**
(przedtem wyśrodkowane — zmierzone: akapit zaczynał się na x 138 przy H1
na x 67), rząd dwóch dróg z nowym kluczem `Hero.ctaWtorne`.

**Fotografia jest warstwą absolutną dziecka `.hero`, nie kolumną siatki.**
Zmierzone po zmianie: x **47,92 → 100,00 %**, y **0 → 688** przy hero
0 → 688. Pierwsza próba umieściła warstwę wewnątrz `.kolumny`, która jest
spozycjonowana — warstwa kończyła się wtedy na 95,35 % i zaczynała na
y 120. Siatka pozostaje nietknięta.

**iPhone** `2d-iphone-P-alfa.avif`, dokładnie **×1,5** poprzedniego bboxa:
199 × 247 → **299 × 371 px**, kotwica prawy-dół.

**Pamięć.** Trakty **44 : 55** z pomiaru (przedtem 58 : 42, przeniesione
z hero „bo pasuje"), kontener 1200 zdjęty, odstępy niesymetryczne
z pomiaru (68 px u góry, 99 u dołu), H2 **jednym kolorem**, `hyphens:
manual` + `text-wrap: balance` ze strażnikiem.

**Karty.** Kolumny **23 : 42,5 : 23**, odstęp i marginesy z pomiaru,
chevron **inline SVG** — bo glifu nie ma: odczyt subsetów `fontTools`
pokazał, że `›` U+203A, `❯` U+276F i `⟩` U+27E9 są **nieobecne w obu
krojach**; obecne `→`, `>` i `»` mają inny kształt, a znak spoza subsetu
renderuje się krojem zastępczym, czyli inaczej na każdym urządzeniu.

## 4. Gdzie skala wzorca ustąpiła bramce — i dlaczego to nie jest osłabienie

**H1 wszedł jako 60 px (4,17 %), nie 76 px (5,30 %). Δ 1,13 pp.**

Wzorzec jest **jednojęzyczny**; nasza strona ma parytet ×3 i blokującego
strażnika „H1 ≤ 3 linie na desktopie". Sonda po trzech kadrach, pięciu
rozmiarach pisma i trzech szerokościach bloku, wszystkie języki:

| rozmiar | 1440 | 1280 | 1190 |
| --- | --- | --- | --- |
| 76 px | 4 / 4 / 5 | — | — |
| 68 px | 3 / 3 / 4 | — | — |
| 60 px | **3 / 3 / 3** | 3 / 3 / 4 | — |
| 51 px | 3 / 3 / 3 | **3 / 3 / 3** | 3 / 3 / 4 |
| 48 px | 3 / 3 / 3 | 3 / 3 / 3 | **3 / 3 / 3** |

**Poszerzanie bloku nie pomaga:** przy 76 px i mierze 832 px (57,8 %) DE
dalej daje cztery wiersze — ogranicza długość niemieckich słów, nie
szerokość traktu. Stąd 60 px przy 1440 i **48 px poniżej**, a próg pełnej
skali H1 wraca z 80rem na 90rem.

⚠ **Akapit przy progu 80rem stwierdzał, że „pełna skala pisma mieści się
już przy 1280". To było prawdą przy H1 = 52 px i przestało być prawdą przy
60.** Zmieniła się przesłanka, nie zasada — i dlatego tamten akapit zostaje
w kodzie razem z adnotacją, zamiast zniknąć.

Osłabienie strażnika do czterech wierszy byłoby zamianą czerwieni na ciszę
(zakaz 3) i nie wchodziło w rachubę.

## 5. Strażnik dzielenia wyrazów — z dowodem, że umie upaść

Nowy test w `e2e/zlozenie.spec.ts`, trzy języki × cztery projekty = **12
przypadków**, kadry 390 / 1190 / 1280 / 1440. Pilnuje trzech rzeczy:
`hyphens` wyliczony = `manual`, zero U+00AD w treści, i — mierzone
geometrycznie przez `Range` znak po znaku — **żadna linia nie kończy się
w środku wyrazu**. Trzecia asercja mierzy skutek; dwie pierwsze mówią,
dlaczego skutek zachodzi.

**Mutacja w tym samym batchu:** `hyphens: manual` → `auto` w `.uklad h2`,
przebudowa, ten sam przebieg → **12 failed** wobec 12 passed na wejściu
poprawnym. Sonda niesie też kontrolę pozytywną własnej widoczności: przy
nagłówku dłuższym niż jedna linia musi znaleźć co najmniej jedną granicę
linii, inaczej trzecia asercja przechodziłaby zawsze.

## 6. Czego ten ADR NIE rozstrzyga

- **Wysokość sekcji „pamięć" (49,03 % wobec 30,79 %) i rzędu kart
  (38,61 % wobec 19,09 %).** Obie przyczyny zmierzone i obie leżą poza
  skalą: proporcja pliku mockupu (T78) i długość naszej treści — zdania
  kart są **1,70× dłuższe** od tekstu zastępczego wzorca (139 znaków wobec
  82 w karcie 1). Wzorzec niesie tam prozę pozorowaną („Catherly pomięt to
  to so…"), której nie wolno przenieść.
- **Pozostałe sekcje strony** — dzień, kafelki, wzrost, cennik, CTA.
  Zlecenie ogranicza partię 1 do trzech sekcji i tak zostało wykonane.
- **Dwa katalogi wzorca** (`design/wzorzec-2026-09-06/` i `design/wzorzec/`)
  — ścieżka v2 wprost ze zlecenia; scalenie nie należy do wykonawcy.
- **Brzmienia EN i DE** klucza `Hero.ctaWtorne` — prowizoryczne, T75.
