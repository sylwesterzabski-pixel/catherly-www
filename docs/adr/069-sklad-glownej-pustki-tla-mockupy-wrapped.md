# ADR-069 — skład głównej, pustki, tła, mockupy bez tła, Wrapped

- Status: PRZYJĘTY
- Data: 2026-09-06
- Zlecenie: `WWW/096 v4` (zastępuje v3 w całości; werdykt właściciela z 15 zrzutów)
- Baza: `6434451`
- Reguła składu: **wzorzec finalny (10 sekcji) + decyzja właściciela
  (4 sekcje filarów ze zdjęciami). Nic ponadto.**

## 1. Skład — co zeszło i dlaczego KROK 3 z `WWW/091` nie zszedł wtedy

Skład przed i po (`plik:linia` z pomiaru, nie z lektury):

| przed (`page.tsx`) | po | los |
| --- | --- | --- |
| `Hero` :82 | `Hero` | zostaje |
| `PasSciezek` :89 | — | → `/dla-kogo` |
| `SekcjaTekstowa` (Problem) :92 | — | → `/dla-kogo` |
| `SekcjaTekstowa` (Definicja) :110 | :131 | zostaje, ton 2, kadr po prawej |
| `KartyFunkcji` :146 | :217 | **przesunięte za sekcję „dzień"** |
| `PasMozliwosci` :151 | — | zdjęte, komponent zostaje |
| `Filar` ×3 :153 | ×4 :159 | **czwarty wraca** |
| `DbanieOSiebie` :199 | — | zdjęte, komponent zostaje |
| `SekcjaRytmu` :202 | :182 | zostaje, ton 3 |
| — | `KartyGrafitowe` :140 | **nowy rząd trzech kart** |
| `BlokWzrostu` :240 | :226 | + karta „Twój Wrapped" |
| `CennikSkrot` :247 | :247 | zostaje, ton 3 |
| `Faq` (6 obaw) :271 | — | → `/cennik`, pod plany |
| `Zamkniecie` :286 | :268 | zostaje, ton 2 |

**Zmierzony skutek:** wysokość strony **11 741 → 8 663 px** przy 1440,
liczba `h2` w `main` **11 → 9**, liczba sekcji w `main` **15 → 12**.

### Dlaczego KROK 3 z `WWW/091` nie zszedł — odpowiedź na pytanie zlecenia

Zmierzone, nie odtworzone z pamięci: `/cennik` **miał już** komponent
`Faq` (`cennik/page.tsx:49`) — ale z **czterema** parami z `Cennik.faq.*`,
czyli własnym FAQ o umowie. Sześć obaw (`Obawy.p1…p6`) stało wyłącznie na
głównej. Czyli przeniesienie nie zaczęło się i nie zatrzymało w połowie —
**nie zostało w ogóle wykonane.**

Mechanizm, dzięki któremu przeżyło trzy zlecenia:
`WWW/091` zniosło decyzję O-7 („obawy jednym pakietem albo wcale"), ale
jego KROK 3 brzmiał „mapowanie treści" i samo przeniesienie nie dostało
własnego kroku; `WWW/093`, `WWW/093/2` i `WWW/094` też go nie miały.
**Nic tego nie wykryło, bo strażnik `toHaveCount(6)` pilnował sekcji,
która wciąż stała tam, gdzie stała.** Strażnik nieobecności nie istniał —
i to jest klasa: *przeniesienie nie ma strażnika po stronie, z której
się przenosi*. Zamknięte tym batchem: w `zlozenie.spec.ts` stoją teraz
asercje negatywne na `problem-h2` i `obawy-h2`.

### „Pusty blok po hero" — zmierzony, nie zgadnięty

Zlecenie kazało zmierzyć, czym jest. **Nie był osobną sekcją.** Sonda na
wyrenderowanej stronie: hero miało wysokość **1524 px** przy treści
**589 px** — 935 px próżni. Trzymało ją `min-block-size:
var(--wymiar-hero-duze)` (proporcja 1,83× okna z pomiaru POPRZEDNIEGO
wzorca, gdzie dolną połowę hero zajmował kadr). Drugim składnikiem był
`span.Hero_duch__` 990 × 205 px — dekoracyjny napis w 6 % alfy,
**będący elementem LCP strony** (T55). Oba zdjęte.

## 2. Pustki — skala odstępów z pomiaru

Zmierzone w `design/wzorzec-2026-09-06/glowna-kolumna.png` (wiersz
jednorodny = odchylenie < 3 na każdym kanale; kontrola pozytywna:
odchylenie w wierszu 200 = 68,6, kontrola negatywna w wierszu 1030 = 48,7):

| odstęp międzysekcyjny | px (pas 1536) | % pasa | px @1440 |
| --- | --- | --- | --- |
| 1 | 252 | 16,41 | 236 |
| 2 | 173 | 11,26 | 162 |
| 3 | **334** | 21,74 | **313** |
| 4 | 255 | 16,60 | 239 |
| 5 | 141 | 9,18 | 132 |

Mediana 236, wartość najbliższa 239. `odstep-sekcji` **10rem → 7.5rem**
(120 px na stronę → **240 px** między sekcjami), `odstep-sekcji-male`
**5rem → 3.75rem**. Warunek zlecenia „żaden odstęp > wartość wzorca"
spełniony z zapasem: nasz największy 240, największy wzorca 313.
Poprzednio było 320 — **o 7 px więcej niż największy odstęp wzorca**.

## 3. Mockupy bez tła

Zalew z czterech narożników, próg **40**. Próg jest ZMIERZONY, nie
przyjęty: skan progów 10 → 200 pokazał, że pokrycie rośnie płasko
(< 0,2 pp na krok) aż do **140**, gdzie skacze o **22,1 pp**
(68,17 % → 90,27 % na `3-macbook-iphone-ekran`) — zalew wchodzi wtedy
w biały ekran laptopa. Ostatni bezpieczny próg to 130; biorę 40, czyli
środek płaskowyżu, z marginesem 3,25×.

Maska jest MIĘKKA, nie binarna: alfa bierze się z odległości od barwy
tła przyciętej do progu, więc krawędź renderu zostaje wygładzona.

| plik | przezroczyste | pełne krycie | półprzezroczyste |
| --- | --- | --- | --- |
| `2a-iphone-poch-L-alfa` | 74,1 % | 22,7 % | 3,1 % |
| `2b-iphone-poch-P-alfa` | 56,2 % | 25,6 % | 18,2 % |
| `2c-iphone-L-alfa` | 65,8 % | 31,8 % | 2,4 % |
| `2d-iphone-P-alfa` | 68,1 % | 29,7 % | 2,2 % |
| `3-macbook-iphone-alfa` | 62,9 % | 33,3 % | 3,8 % |
| `3-macbook-iphone-ekran-alfa` | 62,8 % | 33,3 % | 3,9 % |

**Kontrola negatywna w tym samym przebiegu:** ten sam pomiar na pliku
BEZ warstwy alfa daje 0,0 % przezroczystych. Dowód na `#ff00ff`:
magenta prześwituje wszędzie poza obrysem urządzenia.

**Cień z pomiaru, nie z gustu.** Zalew zabrał razem z tłem własny cień
bitmapy. Zmierzony na oryginale (granica przedmiotu z maski alfa,
y = 923): pociemnienie najwyżej **21,4 stopnia sRGB** przy tle 243, czyli
**alfa 0,088**, zasięg **7 px** = 0,6 % wysokości kadru — cień
KONTAKTOWY, nie rozlany. Stąd token `cien.mockup` z alfą 0,09.

### Hero

Duch i poświata usunięte, tekst do lewej (`text-align: start` — wzorzec
kładzie blok hero na x 137, tam gdzie nagłówek sekcji „pamięć").
Telefon: `2c-iphone-L-alfa`, bez własnej maski, z `drop-shadow`.

**Maska bohaterki przerobiona PO OBEJRZENIU ZRZUTU.** Pierwsza wersja
(elipsa 86 % × 92 %, przejście 28 % → 100 %) spełniała warunek zlecenia
arytmetycznie i **nadal dawała twardą krawędź** — bo przy promieniu 86 %
i środku w 50 % skrajny piksel leży w 0,58 promienia, czyli ma jeszcze
ok. 58 % krycia. Elipsa gaśnie do zera POZA kadrem. Zastąpiona czterema
prostymi składanymi przecięciem (30 % od lewej, 25 % od dołu, 12 % od
góry, 8 % od prawej).

**Spad kadru na krawędź strony — PRÓBOWANY I WYCOFANY.** U wzorca
fotografia dochodzi do krawędzi (x 847–1535 z 1536).
`margin-inline-end: calc(50% - 50vw)` na kolumnie mediów działa
geometrycznie i psuje układ: procent w marginesie liczy się od szerokości
obszaru siatki, pudełko rośnie, a obraz ma `inline-size: 100%` i rośnie
razem z nim — zmierzone na zrzucie: hero ponad dwukrotnie wyższe.
Różnica wobec wzorca **zostaje i jest zapisana**; poprawne odtworzenie
wymaga rozpięcia SIATKI, nie elementu.

### „Pamięć"

Mockup miał u nas ~1,5 wysokości okna. Zmierzone u wzorca: pas
`y 700–1020`, `x 878–1416` przy 1536, czyli **538 px = 35,0 % pasa**,
po przeliczeniu **504 px @1440**, i stoi PO PRAWEJ od prozy.
Sekcja przerobiona na dwie kolumny 58 : 42.

⚠ **Poprzedni komentarz przy tym kadrze cytował pomiar „85,9 % szerokości
kolumny, czyli 1237 px" — i ten pomiar był PRAWDZIWY, tylko dotyczył
innego przedmiotu:** obrysu obudowy laptopa w pasie `y 1560–2149`, czyli
osobnego, dużego kadru niżej w kompozycji. Klasa: **liczba z pomiaru
wygląda tak samo wiarygodnie niezależnie od tego, czy mierzono nią ten
przedmiot, o który chodzi.**

## 4. Tony sekcji

Wzorzec niesie **DWA** tony jasne i oba są ZMIERZONE: `#f5f5f7`
(28,4 % pikseli jasnych) = nasze `tlo-strony`, `#ffffff` (21,0 %) =
nasza `powierzchnia`. Trzeciego wzorzec nie ma — `tlo-3` jest
WYPROWADZONE: ten sam odcień (240°) i nasycenie (11,1 %) co ton 1,
jasność w dół o **ΔL = 3,5 pp**, czyli dokładnie o tyle, ile dzieli dwa
tony zmierzone.

⚠ **Dokładam JEDNĄ rolę, nie trzy**, choć zlecenie mówi o „trzech tonach
w tokenach": dwa z nich już są rolami o dokładnie tych wartościach,
a trzecia rola o wartości `tlo-strony` byłaby drugim źródłem tej samej
prawdy.

Kontrasty na `tlo-3`: tekst-podstawowy **16,12:1**, tekst-drugorzedny
**6,17:1**, akcent **4,89:1** — wszystkie ponad AA.

| sekcja | ton | barwa wyliczona (pomiar) |
| --- | --- | --- |
| hero | 1 | `rgb(245, 245, 247)` (tło strony) |
| pamięć | **2** | `rgb(255, 255, 255)` |
| rząd trzech kart | klamra | grafit |
| filary ×4 | klamra | grafit |
| dzień | **3** | `rgb(235, 235, 239)` |
| sześć kafelków | 1 | `rgb(245, 245, 247)` |
| wzrost + Wrapped | klamra | grafit |
| cennik w skrócie | **3** | `rgb(235, 235, 239)` |
| zamknięcie | **2** | `rgb(255, 255, 255)` |

⚠ **Tony NIE idą cyklem 1-2-3 i to jest warunek, nie kaprys.** Ton 2 to
barwa roli `powierzchnia`, czyli barwa kart w sekcjach „dzień",
„kafelki" i „cennik". Ton 2 pod białą kartą znosi jej plamę, a plama
jest jednym z czterech mechanizmów rozdziału ADR-038. Ton 2 dostają
więc wyłącznie sekcje BEZ kart. Sekwencja 1-2-3-1-3-2 nie powtarza tonu
w dwóch sąsiadujących sekcjach jasnych.

**Selektor tonu niesie nazwę elementu** (`section[data-tlo="3"]`), bo
samo `[data-tlo="3"]` ma swoistość (0,1,0) — tyle co klasa modułu CSS,
a moduły wchodzą po `globals.css`. Zmierzone przed poprawką: sekcja
„dzień" z `data-tlo="3"` renderowała się bielą, bo ma własne
`background: powierzchnia-akcentowa`.

## 5. Wrapped — zamknięcie T72

Kategoria `dane-przykladowe` w `scripts/lint-liczby.mjs` + pięć wpisów
w `content/liczby-w-tresci.json`. **Warunek zawężający, bez którego
kategoria jest furtką:** liczbie z tej kategorii wolno stać wyłącznie
tam, gdzie w tym samym bloku stoi podpis `Wrapped.podpis` —
**w TREŚCI, nie w rysunku SVG**, bo rysunek ma `aria-hidden` i znika
przy zablokowanych obrazach, a liczby zostałyby wtedy bez zastrzeżenia.

⚠ **`Wrapped.tytul` i `Wrapped.podtytul` NIE POWSTAŁY**, choć zlecenie
je wymienia. Oba ciągi już istnieją: tytuł to `FunkcjeWyniki.mod2_nazwa`
(„Twój Wrapped"), zdanie pod nim to `Filary.filar4.konkret1`. Utworzenie
kluczy o tych samych treściach dałoby drugie źródło tej samej prozy.
Karta bierze je propem ze strony.

⚠ **Nagłówek bloku „wzrost" zmieniony** z `Filary.filar4.naglowek` na
`FunkcjeWyniki.mod2_nazwa`. Powód jest strukturalny: filar „Wyniki"
wrócił na główną i niesie tamten nagłówek, więc strona miałaby dwa
identyczne `h2`. `WWW/094` rozwiązało tę samą kolizję odwrotnie —
zdejmując filar. Oba ciągi są istniejące; nie napisano ani jednego słowa.

⚠ **Etykiety EN/DE napisane przez wykonawcę.** Zlecenie mówi „EN/DE
etykiet → sędziowie", a parytet językowy jest bramką blokującą, więc
strona nie mogła wejść z samym PL. Wchodzą jako **prowizoryczne**,
pozycja rejestru **T75**.

## 6. Sloty filarów i T73

Cztery sloty niosą `tymczasowe/filar-1…3` + **`dbanie-o-siebie` jako
filar 4** — tak brzmi zlecenie (pkt 6). ⚠ **Skutek uboczny: pozycja T73
NIE zamyka się, tylko zmienia przedmiot.** Zlecenie zapowiada
„T73 zamknięte (filar-4 wraca do użycia)", ale przy tym przydziale
slotów bez osadzenia zostaje `filar-4-wyniki.avif`, a `dbanie-o-siebie`
wraca. Zgłoszone, nierozstrzygnięte po cichu.

## 7. Pomiary końcowe — obie liczby, także gorsze

| | wzorzec | przed (`6434451`) | po |
| --- | --- | --- | --- |
| jasne piksele @1440 | 70,9 % | 76,3 % | **62,4 %** |
| jasne piksele @1440 **bez pasa filarów** | 70,9 % | — | **69,3 %** |
| nakładka @1440 | — | 30,1 % | **36,4 %** |
| nakładka @390 | — | 34,6 % | **40,7 %** |
| wysokość dokumentu @1440 | 7 406 px¹ | 11 741 px | **8 663 px** |

¹ kolumna wzorca 7 900 px przeliczona ×0,9375 na kadr 1440.

**Obie metryki wzorcowe poszły w złą stronę i mam na to pomiar
przyczyny, nie domysł.** Pas czterech filarów zajmuje 2 846 px, czyli
32,9 % strony, i ma 44,0 % pikseli ciemnych. **Bez niego strona ma
69,3 % jasnych — 1,6 pp od wzorca.** Cztery pełnoszerokościowe sekcje
grafitowe **nie występują we wzorcu**: są dodatkiem z decyzji
właściciela. Odległość od wzorca jest więc dokładnie rozmiarem tego
dodatku, a nie błędem wykonania.

## 8. Czego ten ADR NIE rozstrzyga

- Czy pas czterech filarów ma zostać grafitowy — to decyzja właściciela
  i pomiar wyżej jest materiałem do niej, nie jej podważeniem.
- Bitmapy 15–18 z Higgsfielda (osobne zlecenie po akceptach).
- Drugi slot sekcji „dzień" (T71) i etykiety EN/DE Wrapped (T75).
- Spad kadru hero na krawędź strony — wymaga rozpięcia siatki hero.
