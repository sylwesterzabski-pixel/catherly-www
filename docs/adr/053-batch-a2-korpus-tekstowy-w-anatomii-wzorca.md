# ADR-053: Batch A2 — korpus tekstowy w anatomii wzorca (problem · definicja · pas ścieżek · rytm dnia)

Data: 2026-09-04. Status: **PRZYJĘTY** (zlecenie `WWW/078`, krok 1;
wznowione zleceniem `WWW/078-WZNOWIENIE` po zerwaniu połączenia).

Przenosi anatomię wzorca na cztery sekcje korpusu tekstowego. Wszystkie
wartości pochodzą z **pomiaru wykonanego 2026-09-04** (Playwright,
`getComputedStyle` + `getBoundingClientRect`, kadry 1440 / 810 / 390),
nie z pamięci i nie z odczytu cudzego arkusza.

**Tożsamość przedmiotu pomiaru:** wysokość strony wzorca wyszła
**12 467 px** — co do piksela ta sama, którą podał pomiar `WWW/073`
z 03.09. Wzorzec się nie zmienił, więc obie serie liczb opisują ten sam
przedmiot i wolno je zestawiać.

---

## Rozstrzygnięcie 0 — SKAŻENIE WŁASNEGO NARZĘDZIA, ZŁAPANE PRZED WYCIĄGNIĘCIEM WNIOSKU

Dwa pierwsze przebiegi pomiarowe podawały kadr przez klucz
`viewportSize` do `browser.newPage()`. Playwright przyjmuje tam
`viewport`; **klucz nieznany jest ignorowany MILCZĄCO**, bez ostrzeżenia
i bez błędu. Oba przebiegi zmierzyły więc domyślne 1280 × 720 i podały
wynik jako **trzy różne kadry**.

**Co to wykryło — kontrola tożsamości, nie czujność.** Wysokość strony
i szerokość H1 wyszły **identyczne** na „1440", „810" i „390". Strona
responsywna nie może dać tej samej wysokości na kadrze 1440 i 390;
sprzeczność była w danych, nie w przeczuciu.

⚠ **To jest ta sama klasa, którą ADR-052 zapisał dobę wcześniej pod
nazwą „reuse serwera z poprzedniego builda", i wraca w drugiej postaci:
narzędzie odpowiada na pytanie, którego nie zadałem, i nie mówi o tym.**
Tam odpowiadał stary serwer, tu — domyślny kadr. Wniosek wykonawczy jest
wspólny i został wpisany do przebiegu poprawionego: **pomiar drukuje
TOŻSAMOŚĆ przedmiotu obok wyniku**. Trzeci przebieg wypisuje
`window.innerWidth` × `window.innerHeight` przy każdym kadrze, więc
następne takie skażenie zobaczy każdy, kto spojrzy na wynik.

Żaden wniosek nie został wyciągnięty ze skażonych przebiegów — cała
reszta tego ADR-a stoi na przebiegu trzecim i czwartym.

## Rozstrzygnięcie 1 — skala H2: DWA STOPNIE, KROK 2,00×, PRÓG ZNALEZIONY BISEKCJĄ

Zlecenie: *„H2 na skali wzorca (relacja do H1 96 z pomiaru — zmierz krok
skali, nie zgaduj)"*. Zmierzone:

| | wzorzec | nasze do 04.09 |
| --- | --- | --- |
| H1 (≥ 1440) | 96 px | 96 px (ADR-052) |
| **H2 (≥ 768)** | **48 px**, interlinia 60 (1,25), tracking −1,2 px | 60 / 42 px, interlinia 1,20, tracking −3 px |
| **H2 (< 768)** | **30 px**, interlinia 36 (1,20), tracking −0,75 px | 38 px, interlinia 1,40, tracking −0,6 px |

**Krok skali wynosi dokładnie 2,00× (96 → 48).** Nasza relacja wynosiła
1,60× — czyli po podniesieniu H1 w batchu A1 skala nagłówków nie
odpowiadała żadnej relacji wzorca.

**PRÓG ZNALEZIONY BISEKCJĄ CO 1 PIKSEL, NIE ZAŁOŻONY.** Sprawdzone
szerokości: 700 · 760 · **767** · **768** · 769 · 800 · 1023 · 1024 ·
1025 · 1100. Wynik: 30 px do 767 włącznie, 48 px od 768 w górę, i ta
sama liczba 48 przez wszystkie szersze kadry. **Wzorzec ma DWA rozmiary
H2, nie trzy** — dlatego token `tekst.h2-srednie` i nadpisanie przy
90rem zostały **usunięte**, a nie zrównane wartością. Dwa tokeny o równej
wartości to nie zapas, tylko zaproszenie do cichego rozjazdu.

⚠ **ROZMIAR, INTERLINIA I TRACKING WCHODZĄ JAKO JEDNA DECYZJA — sam
rozmiar byłby zmianą NA GORSZE.** H2 brało na szerokim kadrze
`tracking.naglowek` = −3 px, czyli wartość zmierzoną dla H1 o rozmiarze
70 px w POMIARZE 0.4/0.7. Na nagłówku 48 px daje to −0,0625em wobec
−0,025em u wzorca — ponad dwa i pół raza ciaśniej. Wzorzec ma tracking
**stały w `em`** (−0,025em przy 96, przy 48 i przy 30 px), więc osobną
decyzją jest u niego rozmiar, a nie tracking.

### ⚠ ZASIĘG TEJ ZMIANY WYCHODZI POZA CZTERY SEKCJE ZLECENIA — I JEST POLICZONY

Skala H2 mieszka od ADR-044 w **jednej regule globalnej**, świadomie:
osiem modułów powtarzało kiedyś tę samą parę wartości i to był defekt,
który tamten ADR zamknął. Skutek jest taki, że zmiana skali **nie da się
zamknąć w czterech sekcjach** — dosięga każdego H2 w serwisie.

Zmierzone na dziesięciu trasach `pl`: **94 nagłówki H2 razem, z czego 51
niesie nową skalę 48 px**. Z tych 51 **trzy** to nagłówki sekcji z tego
batcha; pozostałe 48 to filary, karty funkcji, cennik w skrócie, „Sześć
obaw", „Dbanie o siebie" i sekcje podstron. Resztę stanowią nagłówki
o rozmiarze własnym (stopka, mapa strony), których reguła globalna nie
dotyczy.

**Alternatywa była gorsza i dlatego jej nie wybrałem:** lokalne
nadpisanie skali w czterech modułach odtworzyłoby dokładnie ten stan,
który ADR-044 rozmontował — dwie żywe skale H2, rozjeżdżające się przy
pierwszej następnej zmianie. **Zgłaszam to jako wyjście poza literę
zlecenia, zgodnie z regułą, że oznacza się także wejścia korzystne.**

## Rozstrzygnięcie 2 — miary tekstu: 1024 i 896, a „384" z `1f` było miarą KARTY

| | wzorzec | nasze do 04.09 |
| --- | --- | --- |
| kontener sekcji tekstowej | — (miary centrowane w kadrze) | — |
| **miara nagłówka** | **1024 px** (5 z 5 nagłówków sekcji) | `miara-kolumny` 800 px |
| **miara akapitu** | **896 px** (4 z 5 akapitów pod nagłówkiem) | `miara-akapitu` 65ch |
| kontener siatki kart | **1280 px** | wcięcie progowe → 1170 px przy 1440 |

⚠ **SPROSTOWANIE WŁASNEJ ZWROTKI `WWW/073`.** Punkt `1f` podał drabinę
szerokości i opisał szczebel **384 px (45 wystąpień)** jako „miarę
akapitu". Liczba jest prawdziwa, ale opisuje **akapit w KARCIE**. Pomiar
celowany — wykonany teraz pod nagłówkami sekcji, a nie po całym drzewie —
rozdziela dwie miary, które jeden szczebel drabiny mieszał: **karta 384,
sekcja 896**. Obie leżą na tej samej drabinie 1f, więc żadna nie jest
„z oka"; różni je **przedmiot**, nie rzetelność.

**Klasa: pomiar po całym dokumencie odpowiada na pytanie „jakie wartości
występują", a nie „jaka wartość pełni tę rolę".** Dominanta zbioru
mieszanego jest dominantą zbioru, nie roli — a 45 wystąpień kartowych
przebija 4 sekcyjne bez trudu.

### Sprawdzian geometryczny — dwa niezależne odczyty tej samej wielkości

Deklaracja w cudzym arkuszu mówi, co ma być. **Położenie mówi, co jest.**

| | wzorzec | u nas po zmianie |
| --- | --- | --- |
| lewa krawędź nagłówka sekcji przy 1440 | **x = 208** | **x = 208** |
| rachunek | (1440 − 1024) / 2 = 208 | 20 + (1400 − 1024) / 2 = 208 |
| lewa krawędź akapitu | x = 272 | x = 208 (patrz niżej) |

## Rozstrzygnięcie 3 — WYRÓWNANIE: wzorzec CENTRUJE, my zostajemy przy lewej

Zmierzone: `text-align: center` na **nagłówku i akapicie** w 4 z 5 sekcji
tekstowych wzorca; akapit 896 wyśrodkowany w mierze nagłówka 1024, stąd
jego x = 272.

**Bierzemy SZEROKOŚĆ, zostawiamy POŁOŻENIE.** Zlecenie mówi
o kontenerach i mierze akapitu, nie o wyrównaniu, a nasza proza jest
równana do lewej. Przy równaniu do lewej wcięcie akapitu o 64 px wobec
własnego nagłówka **łamie pionową krawędź, która jest całym sensem tego
równania** — dlatego akapit stoi u nas na tym samym x co nagłówek.

⚠ **Zapisane jako RÓŻNICA LICENCJONOWANA, nie jako niedoróbka.** Gdyby
kiedyś padła decyzja o centrowaniu sekcji tekstowych, to jest osobna
decyzja redakcyjna i typograficzna, nie „doprowadzenie do zgodności
z pomiarem". **Do rozstrzygnięcia koordynatora.**

## Rozstrzygnięcie 4 — rytm 160/80 i drabina wewnętrzna

| odstęp | do 04.09 | po zmianie | źródło |
| --- | --- | --- | --- |
| sekcja, kadr wąski | 48 px | **80 px** | 1g, rytm progowany |
| sekcja, od progu | 48 px | **160 px** | 1g, rytm najwyższego poziomu (5 wystąpień) |
| nagłówek → akapit | 16 px | **16 px** (token zamiast literału) | zmierzone 5 z 5 par, wszystkie kadry |
| gap kroków, kadr wąski | 20 px | **40 px** | 1g / 1i |
| gap kroków, od progu | 32 px | **16 px** | 1g / 1i |
| nazwa kroku → treść | 4 px | **8 px** | 1g, najgęstszy szczebel (72 wystąpienia) |

Dwie wartości sprzed zmiany — **20 px** i **4 px** — nie leżały na
drabinie wzorca (8 · 16 · 32 · 40 · 80 · 160 · 240) w ogóle.

### Lustro L1 zachowane — i to jest liczba, nie deklaracja

`e2e/zlozenie.spec.ts` pilnuje, że kropki S3 i S10 stoją na desktopie
w tej samej kolumnie (Δx ≤ 1 px). Po przebudowie obu sekcji zmierzone:
**kropka S3 x = 208, kropka S10 x = 208, Δx = 0** przy 1440 px.
Geometria wychodzi z dwóch różnych konstrukcji — S3 ma wnętrze 1024
wyśrodkowane, S10 wnętrze 1280 z nagłówkiem i kropką ograniczonymi do
1024 — i mimo to trafia w ten sam piksel, bo obie liczby pochodzą z tego
samego tokena.

## Rozstrzygnięcie 5 — pas ścieżek: szkło malowane w trzech warstwach

| warstwa | wzorzec | u nas |
| --- | --- | --- |
| płyta | najjaśniejsza powierzchnia palety przy alfie płyty | `powierzchnia-szklo` (rola z ADR-049) |
| obrys | biel przy alfie obrysu | **`kreska-mocna`** — różnica licencjonowana |
| cień | jedna warstwa bieli WEWNĄTRZ (30 wystąpień) | `cien.karta` |
| promień | 12 px (dominanta, 37 wystąpień) | `promien-sredni` — bez zmian |
| gest | uniesienie 2 px, 200 ms | `ruch.gest-uniesienia` + zegar `ruch.*` |
| kontener | 1280 px | `kontener-waski` |

⚠ **ROLA `powierzchnia-szklo` DOSTAJE PIERWSZE UŻYCIE.** ADR-049
wprowadził ją z pomiaru i zapisał wprost, że ma zniknąć, jeśli nie
znajdzie zastosowania. Znalazła je tutaj.

⚠ **OBRYS JEST RÓŻNICĄ LICENCJONOWANĄ I MA ZOSTAĆ.** Szkło wzorca ma
obrys bielą przy alfie obrysu, czyli ledwie widoczną kreską. Karta
ścieżki jest **linkiem w całości** i podlega progowi 3:1 z WCAG 1.4.11 —
ADR-049 nadał jej `kreska-mocna` właśnie dlatego. Kto kiedyś „doprowadzi
szkło do zgodności z pomiarem", zdejmie elementowi jedyną granicę
spełniającą normę. **Szkło daje MATERIAŁ, dostępność daje KRAWĘDŹ.**

### ⚠ WYJŚCIE POZA LITERĘ ADR-048, ROZSTRZYGNIĘCIE 4 — zgłoszone, nie schowane

ADR-048 R4 mówi: cień karty **wyłącznie** w `:hover` i `:focus-within`.
Trzecia warstwa szkła jest u wzorca cieniem **w spoczynku**, więc bez
niej „szkło malowane" jest płytą z obrysem.

**Litera tamtej reguły zostaje złamana; jej uzasadnienie — nie.** ADR-048
wymienia trzy zdania, których R4 miało bronić, i **wszystkie trzy dotyczą
kart rozdzielanych KOMPOZYCJĄ**: pomiaru „bez obrysu, bez cienia" przy
`KartyFunkcji`, zdania „cień nie jest w systemie" przy `.karta`
w `globals.css`, oraz trzeciego mechanizmu ADR-038. **Karta ścieżki nie
należy do żadnego z tych trzech** — rozdziela ją obrys, nadany jej
w ADR-049 dokładnie dlatego, że kompozycja nie jest afordancją. Żadne
z trzech chronionych zdań nie przestaje być prawdziwe, a `KartyFunkcji`
i karty planów nie zmieniają się o piksel.

**Rozstrzygnięcie do potwierdzenia przez koordynatora.** Gdyby miało
zostać cofnięte, cofa się jedna deklaracja `box-shadow` i pas wraca do
dwóch warstw.

### Gest uniesienia — dlaczego akurat uniesienie

ADR-049 R3 zapisał rozdział gestów jako **pomiar**: rzecz klikana unosi
się o 2 px, rzecz będąca powierzchnią robi odwrotnie — od razu docisk,
bez uniesienia. Pomylenie ich odwraca komunikat. Karta ścieżki jest
linkiem, więc bierze uniesienie.

⚠ Ruch idzie przez `translate`, nie przez `transform` i nie przez
margines: `e2e/ruch.spec.ts` zabrania animowania własności ruszających
układ. Całość siedzi w `prefers-reduced-motion: no-preference`.

## Rozstrzygnięcie 6 — styki stref bez mostów: STAN ZASTANY, nic do zrobienia

Zlecenie: *„na styku sekcji WYŁĄCZNIE zmiana powierzchni (bez
gradientów-mostów)"*. Sprawdzone odczytem z kontrolą pozytywną (`grep`
po `gradient` w `src/` zwraca 15 trafień, więc narzędzie widzi): **żaden
z nich nie stoi na styku stref**. Blok `[data-ton="jasny"]` maluje tło
płaską rolą, a jedyny gradient przy sekcji ciemnej to poświata
dekoracyjna **wewnątrz** sekcji zamknięcia, pod treścią, `aria-hidden`.

Warunek zlecenia był więc spełniony **przed** tym batchem — ADR-050
zapisał go wprost jako „przejście czystą zmianą powierzchni, krawędź
w krawędź". Odnotowuję jako sprawdzone, nie jako zrobione.

## Rozstrzygnięcie 7 — PODRÓŻE: anatomia ich NIE rozciągnęła, i to jest kontrola negatywna w jednym przebiegu

Zlecenie kazało zmierzyć, czy anatomia nie rozciągnęła dróg „ponad
miarę", i **podać liczby, nie korygować samemu**. Pomiar wykonany
metodą kontroli negatywnej: ten sam kod pomiarowy, ta sama maszyna, ta
sama sesja, dwa stany rozdzielone `git stash` i przebudową.

| kadr 390, ekran = 844 px | PRZED (`35284c0`) | PO (batch A2) | różnica |
| --- | --- | --- | --- |
| wysokość strony | 10 869 px | **10 647 px** | **−222 px** |
| ekranów | 12,88 | **12,61** | **−0,27** |
| ból SAMA | 1,94 | 1,98 | +0,04 |
| ból LIDERKA | 6,72 | **6,59** | −0,13 |
| ból STRUKTURA | 1,33 | 1,33 | 0,00 |
| **największa luka bez wyjścia** | 3,31 | **3,28** | **−0,03** |

**Strona SIĘ SKRÓCIŁA mimo potrojenia odstępu sekcji** (48 → 160 px od
progu, 48 → 80 px poniżej). Rachunek na kadrze 390: rytm dołożył
+64 px na każdą z trzech sekcji i +40 px na gapy kroków, czyli około
+232 px — a zysk z niższego H2 (30 zamiast 38 px przy interlinii 1,20
zamiast 1,40) **na wszystkich 51 nagłówkach nowej skali** przeważył go
o dwie długości. To jest ta sama liczba, która w rozstrzygnięciu 1 stoi
jako zasięg wychodzący poza zlecenie: **tu widać jej drugą stronę**.

## Pomiary domykające

| | wynik |
| --- | --- |
| pełny zestaw e2e | **666 passed · 4 skipped · 0 failed** |
| axe | **60 passed** |
| bramki statyczne | tokeny · liczby · parytet · kotwice · linki · no-JS · **deklaracje** — ZIELONE |
| zastane czerwienie | ESLint · kontrakt ΔE — bez zmian |
| LCP (1440, lokalnie) | **48 ms**, element **bez zmian**: `span.Hero_duch__` |
| kontrast: tekst karty × płyta szkła | **18,14:1** |
| kontrast: obrys karty × płyta szkła | **10,59:1** (próg 3) |
| kontrast: obrys karty × tło strony | **11,71:1** (próg 3) |
| kontrast: strzałka × płyta szkła | **11,37:1** |
| plama: płyta szkła × tło strony | 1,11:1 — **rozdziela obrys, nie plama** |

⚠ **LCP: 48 ms wobec 32 ms z ADR-052 to NIE JEST regres — i nie jest też
dowodem braku regresu.** Jedna wartość na kadrze lokalnym nie ustala
zapasu, bo nie widać z niej rozrzutu; element LCP jest **ten sam**
(`span.Hero_duch__`), więc przedmiot pomiaru się nie zmienił. Właściwy
pomiar należy do pozycji **T55**, która czeka na transport produkcyjny.

## Czego ten ADR NIE rozstrzyga

- **Wyrazu lustra L1 na jasnym** — pozycja ADR-051 stoi otwarta. Batch
  wniósł do S10 **anatomię**, zgodnie ze zleceniem; osobna rola
  „powierzchnia ciemniejsza od jasnej" i osobna decyzja nadal czekają.
- **Wyrównania sekcji tekstowych** — wzorzec centruje, my zostajemy przy
  lewej; do rozstrzygnięcia koordynatora (rozstrzygnięcie 3).
- **Wyjścia poza literę ADR-048 R4** — cień szkła w spoczynku na karcie
  ścieżki; uzasadnienie wyżej, potwierdzenie należy do koordynatora.
- **Martwej deklaracji odstępu kropki** — zmierzone `margin-top: 0` przy
  deklarowanych 20 px w obu lustrach; pozycja **T56**, nie naprawiana
  (zakaz 8), bo widoczny odstęp wynosi dziś 16 px i leży na drabinie.
- **Miar `miara-kolumny` i `miara-akapitu`** — stare tokeny zostają
  nietknięte i obsługują szesnaście pozostałych modułów. Ich migracja na
  miary wzorca to przyszłe batche, nie ten.
- **Progu 768 kontra 769** — wzorzec przełącza H2 o piksel niżej niż
  nasz próg układu. Przesunięcie globalnego progu ruszyłoby każdy
  `@media` w serwisie; różnica zapisana, nie zasypana.
