# Pomiar wzorca — KROK 0 zlecenia `WWW/050-FINAL`

Data pomiaru: **2026-08-26**. Narzędzie: Playwright + CDP, Chromium,
`getComputedStyle` na wyrenderowanej stronie. Commit w chwili pomiaru:
`187f366` (osiągalny).

**Wzorzec** = strona wskazana adresem w zleceniu `WWW/050-FINAL`.
Nazwy szablonu ani autora ten dokument nie wymienia — zakaz właściciela
z 2026-08-26. Adres źródłowy stoi w treści zlecenia i tam zostaje.

**Wszystkie liczby pochodzą z ODCZYTU, nie z oka.** Tam, gdzie czegoś
nie dało się zmierzyć tą drogą, jest to napisane wprost jako granica
pomiaru, a nie pominięte.

---

## 0.1 KRÓJ

### Rodziny faktycznie użyte

> ⚠ **TABELA PONIŻEJ BYŁA BŁĘDNA I ZOSTAŁA ZASTĄPIONA (2026-08-26,
> ADR-044). Zostaje jako ślad, bo to na niej stanął ADR-040.**
>
> Brzmienie źródłowe: *„`Satoshi` → nagłówki (H1, H2), duże napisy;
> `Inter` → proza, nawigacja, przyciski, etykiety"*.
>
> **Role są odwrotne.** Pomiar CDP (`CSS.getPlatformFontsForNode`)
> na wzorcu, liczony po elementach niosących tekst:

| rodzina zadeklarowana | elementów | krój faktyczny | gdzie |
|---|---:|---|---|
| `Inter` | **137** | Inter Medium [własny] | **H1**, proza, etykiety |
| `Inter-Medium` | **93** | Inter Medium [własny] | **H2**, nawigacja, przyciski |
| `Inter-Bold` | **24** | Inter [własny] | nazwiska w opiniach |
| `Inter-SemiBold` | **3** | Inter SemiBold [własny] | drobne podpisy |
| **`Satoshi`** | **2** | — | **wyłącznie plakietka** |

**Inter niesie 257 elementów tekstu, Satoshi dwa** — „Get 3 Free month"
i „on Pro plan", oba **12 px / waga 700 / `#070806`**. To jest ta sama
plakietka, którą tabela skali niżej opisuje jako „plakietka górna".
Pierwotny odczyt trafił w Satoshi i **przypisał je do niewłaściwej
warstwy**.

**Kontrola pozytywna dwójki:** 2 wobec 257, policzone w tym samym
przebiegu tą samą pętlą — dwójka jest wynikiem, nie zerem narzędzia.

Pliki poszły z sieci jako **7 osobnych żądań `woff2`** — dwa dla kroju
nagłówkowego (z CDN autora wzorca) i pięć dla `Inter` (z CDN Framera).
**Plików autora nie pobieramy** (zasada rzemiosła ze zlecenia): krój
bierzemy z oficjalnego źródła i hostujemy u siebie.

### Skala zmierzona (1440 px)

| element | rozmiar | waga | interlinia | tracking | barwa |
|---|---|---|---|---|---|
| H1 | **70 px** | 500 | 84 px (1,20) | **−3 px** | `#ffffff` |
| H2 | **60 px** | 500 | 72 px (1,20) | **−3 px** | `#ffffff` |
| nawigacja / proza | **16 px** | 500 | 28,8 px (1,80) | normal | `#c6c7c6` |
| plakietka górna | **12 px** | 700 | 14,4 px (1,20) | normal | `#070806` |

Interlinia nagłówków to **równo 1,20**, prozy — **1,80**. Tracking
nagłówków jest **ujemny i podany w pikselach** (−3 px), czyli zależny od
rozmiaru: przy 70 px to −0,043em, przy 34 px byłoby −0,088em. Przy
przenoszeniu trzeba wybrać: albo px (wierność), albo em (skalowalność).
**To jest decyzja, nie szczegół** — zapisana jako otwarta.

### Warunki twarde ze zlecenia — SPRAWDZONE NA PLIKACH

Zlecenie kazało zatrzymać się, gdyby licencja nie pozwalała na self-host.
**STOP nie zachodzi** — oba kroje pobrane i zmierzone.

| warunek | stan |
|---|---|
| pokrycie `ąćęłńóśźżĄĆĘŁŃÓŚŹŻ` | **KOMPLET w obu krojach ✔** |
| pokrycie `äöüÄÖÜß` | **KOMPLET w obu krojach ✔** |
| budżet ≤ 120 kB łącznie | **59,2 kB ✔** — z zapasem 60,8 kB |
| self-host | do wykonania w KROKU 1.2 |
| `font-display: swap` + dostrojony fallback | do wykonania w KROKU 1.2 |

**Krój nagłówkowy:** 431 glifów, waga 500, **25,0 kB**, statyczny.
Kontrola pozytywna metody: znaki spoza latin-ext (`Ж`, `漢`) nieobecne,
czyli test odróżnia brak od obecności.

**`Inter`: 34,2 kB jako JEDEN PLIK ZMIENNY** (oś `wght` 100–900), 206
znaków — subset zbudowany dokładnie pod nasz zestaw, nie pobrany gotowy.

⚠ **DROGA „GOTOWE PODZBIORY" NIE MIEŚCI SIĘ W BUDŻECIE i to jest
ustalenie, nie przypuszczenie.** Google serwuje `Inter` w podzbiorach
`latin` (47,3 kB) i `latin-ext` (83,3 kB) — **razem 130,6 kB, czyli ponad
budżet już bez kroju nagłówkowego**. Sprawdzone sumami SHA-256: cztery
„wagi" `latin-ext` to **jeden i ten sam plik** (font zmienny powtórzony
w CSS), a podzbiór `latin-ext` **nie zawiera nawet `ó` ani liter
podstawowych** — te siedzą w `latin`, więc trzeba obu.

Własny subset schodzi z 130,6 kB do **34,2 kB**, czyli do **26%**, i to
jest cała różnica między „mieści się" a „nie mieści się".

---

## 0.2 KOLORY

Zmierzone z elementów o niezerowej powierzchni; liczba w nawiasie to
liczba wystąpień, czyli waga danej barwy w kompozycji.

### Powierzchnie

| rola (nasza nazwa) | wartość | wystąpień |
|---|---|---|
| tło strony | `#070806` | podkład całej strony |
| powierzchnia karty | `#131412` | 56 |
| powierzchnia karty, półprzezroczysta | `rgba(19, 20, 18, 0.4)` | 24 |
| powierzchnia podniesiona | `#20211f` | 6 |
| powierzchnia obrysu / separatora | `#393938` | 3 |
| przyciemnienie warstwowe | `rgba(7, 8, 6, 0.6)`, `rgba(34, 34, 34, 0.8)` | 3 |

### Tekst

| rola | wartość | wystąpień |
|---|---|---|
| tekst podstawowy | `#c5c6c5` | **116** |
| tekst mocny / nagłówki | `#ffffff` | **101** |
| tekst drugorzędny | `#c6c7c6` | 9 |
| tekst przygaszony | `#dfdfdf` | 3 |
| tekst na akcencie | `#231f20` / `#070806` | 9 |

### Akcent

| rola | wartość | wystąpień |
|---|---|---|
| **akcent** | **`#a0e00d`** (limonka) | 16 tekst + 7 tło |
| akcent, wariant jaśniejszy | `#a5e219` | 1 |

### Gradienty

| zastosowanie | wartość |
|---|---|
| tło hero | `linear-gradient(144deg, rgba(23,26,23,0.2) 0%, #070806 100%)` |
| linia akcentu pozioma | `linear-gradient(90deg, rgba(160,224,13,0) 0%, #a0e00d 52.86%, rgba(160,224,13,0) 100%)` |
| linia akcentu pionowa | `linear-gradient(rgba(160,224,13,0) 0%, #a0e00d 100%)` |
| przygaszenie karty | `linear-gradient(#131412 0%, rgba(0,0,0,0.05) 100%)` |
| połysk (mockup) | `linear-gradient(283deg, #ffffff 12%, rgba(255,255,255,0.3) 109%)` |

---

## 0.3 GEOMETRIA

| rzecz | wartość | uwaga |
|---|---|---|
| kontener treści | **1440 px** (16×), **1280 px** (3×), **800 px** (8×) | 800 px to kolumna prozy |
| padding sekcji (1440) | **160 px** / 160 px; wariant **135 px** / 0; **130 px** / 160; **80 px** / 80 | |
| gap siatek | **10 px** (66×), **12 px** (58×), **24 px** (55×), 8 px (41×), **32 px** (38×), 4, 16 | skala co 4 px |
| border-radius | **8 px** (88×) dominujący, **12 px** (35×), **50 px** (11×, pigułki), 40 px (8×), 9/15/16/10 px | |
| obramowanie | `2px inset #767676` (11×) | to obramowania kontrolek formularza, nie ozdoba |
| cień karty | `rgba(0,0,0,0.1) 0 2px 4px, rgba(0,0,0,0.05) 0 1px 0, rgba(255,255,255,0.15) 0 …` | |
| cień miękki (mockup) | `rgba(0,0,0,0.17) 0 0.6px 1.57px −1.5px, rgba(0,0,0,0.14) 0 2.29px 5.95px −3px, …` | wielowarstwowy |

---

## 0.4 RUCH

### Co widać w stylu wyliczonym

| własność | czas | krzywa |
|---|---|---|
| `transform` | **0,1 s** | `cubic-bezier(0.2, 0, 0, 1)` |
| `opacity` | **0,4 s** | `ease-out` |
| `background, box-shadow` | 0 s | `ease` (czyli bez przejścia) |
| `@keyframes` | **ZERO** | — |

### GRANICA POMIARU — BYŁA, ZOSTAŁA ZDJĘTA 2026-08-26

Do 2026-08-26 stało tu, że *„czasów, progów scrolla i prędkości marquee
nie da się odczytać z CSS — trzeba je wyznaczyć z nagrań klatka po
klatce"*, i że ten pomiar jest **zaplanowany i jeszcze nie wykonany**.
Diagnoza była trafna: wzorzec animuje stylami nadawanymi z JavaScriptu,
więc `@keyframes` naprawdę jest zero.

**Wykonano go inaczej, niż zapowiadano — i to jest ustalenie samo w
sobie.** Zamiast klatek wideo: **próbkowanie `requestAnimationFrame`
ze znacznikami czasu**, odczytujące styl wyliczony i prostokąt
w każdej klatce. Mierzy to, co przeglądarka **naprawdę rysuje**, więc
obejmuje ruch nadawany z JavaScriptu — a daje liczby, nie oszacowanie
z dekodowania wideo. Klatka ~16,7 ms.

### ⚠ TRZY RAZY SONDA MIERZYŁA NIE TO, CO TRZEBA — i za każdym razem meldowała ZERO

Zapisane, bo to najgroźniejszy tryb awarii tego pomiaru: **sonda
celowana zwraca zero tak samo, gdy nic się nie rusza, jak wtedy, gdy
patrzy nie tam.**

| próba | co zrobiono | wynik | przyczyna |
| --- | --- | --- | --- |
| 1 | uchwyt do elementu wzięty RAZ, na starcie | zero | element menu **powstaje** dopiero po kliknięciu; sonda spadła na element zastępczy |
| 2 | odpytywanie celu co klatkę | zero | pozycja menu pojawia się **gotowa**; ruch był na panelu, nie na niej |
| 3 | odczyt `transform` marquee | 0 px/s | marquee przesuwa **przodka**, nie mierzony element |

Stąd narzędzie użyte dalej: **skaner**, który nie zgaduje elementu, tylko
snapshotuje prostokąt, przezroczystość i transform **wszystkich**
elementów co klatkę i raportuje te, które się zmieniły. Pusta lista
znaczy wtedy naprawdę pusto — a liczba skanowanych elementów jest
wypisywana jako kontrola.

### Kontrola negatywna: ruch ciągły przy górze strony

`1200 skanowanych elementów · 91 klatek · **ruchomych 0**` — na **obu**
kadrach (1440 i 390), bez interakcji. Zero jest tu wynikiem, bo ten sam
skaner na tej samej stronie po kliknięciu daje 13 elementów ruchomych.

### Menu mobilne — otwarcie (390 px)

Trzy różne czasy w jednym geście, mierzone w jednym przebiegu:

| co | czas | klatek | opis zmiany |
| --- | ---: | ---: | --- |
| **panel** | **177,2 ms** | 13 | wysokość nagłówka `80 → 684,8` px |
| **kreski hamburgera** | **392,8 ms** | 26 | obrót do ±45° (`matrix(0.707…)`), zbieżne do środka |
| **kreska środkowa** | **610 ms** | 39 | szerokość `24 → 2` px, przezroczystość `1 → 0` |

### Wejście sekcji przy przewijaniu

Mierzone **wyłącznie** na przezroczystości i macierzy transformacji —
położenie prostokąta zmienia też samo przewinięcie, więc jako miara
animacji jest artefaktem.

| własność | 1440 px | 390 px |
| --- | --- | --- |
| przezroczystość `0 → 1` | **334,9 ms** (21 kl.) | **348,1 ms** (22 kl.) |
| przesunięcie Y `20 px → 0` | **251,0 ms** (16 kl.) | **266,7 ms** (17 kl.) |
| skala | **bez zmian** | **bez zmian** |

**Krzywa: wyraźne `ease-out`.** Udział drogi po połowie czasu wynosi
**0,72–0,76** dla przezroczystości (przy liniowej byłoby 0,50) i
**0,61–0,68** dla przesunięcia. Zgadza się to z `cubic-bezier(0.2, 0, 0, 1)`
odczytanym ze stylu wyliczonego — dla niej udział po połowie to ok. 0,79.

**Fade i przesunięcie mają RÓŻNE czasy** (~340 wobec ~260 ms), więc nie
jest to jedno przejście na dwóch własnościach.

### Marquee — prędkości, wszystkie z regresji liniowej

Prędkość liczona **regresją po wszystkich próbkach**, nie różnicą dwóch
punktów: różnica nie odróżnia ruchu jednostajnego od zrywanego, a
marquee restartuje się w pętli — skok wsteczny zafałszowałby wynik.
Skoki pętli odcinane, brany najdłuższy ciąg monotoniczny.

| pas | 1440 px | 390 px | R² |
| --- | ---: | ---: | ---: |
| logotypy | **−75 px/s** | **−75,1 px/s** | **1,0** |
| opinie, pas górny | **−50 px/s** | **−50 px/s** | **1,0** |
| opinie, pas dolny | **+50 px/s** | **+50 px/s** | **1,0** |

**R² = 1,0 znaczy ruch idealnie jednostajny** — bez przyspieszania,
bez zatrzymań. **Prędkości są niezależne od szerokości okna**: te same
liczby na obu kadrach. Pasy opinii **biegną przeciwnie** względem siebie.

Elementy, które skaner wskazał jako ruchome przy `framer-1j21v3c`
i `framer-16hwuca`, **marquee NIE SĄ**: regresja daje im ≈ 0 px/s przy
R² 0,006–0,06, czyli drganie w zakresie 8–29 px, nie przesuw.

---

## 0.5 BREAKPOINTY

Zmierzone przez zwężanie okna od 1600 do 320 px i odczyt H1:

| zakres | H1 | interlinia | tracking H1 | H2 | interlinia H2 | tracking H2 |
|---|---|---|---|---|---|---|
| **≥ 1440 px** | 70 px | 84 px (1,20) | **−3 px** | **60 px** | 72 px (1,20) | −3 px |
| **810–1280 px** | **53 px** | 63,6 px (1,20) | **−1,6 px** | **42 px** | 50,4 px (1,20) | −1,6 px |
| **≤ 768 px** | **34 px** | 40,8 px (1,20) | **−1 px** | **38 px** | **53,2 px (1,40)** | **−0,6 px** |

⚠ **UZUPEŁNIONE 2026-08-26 o kolumny tracking i H2** (ADR-044). Pierwsza
wersja tej tabeli miała wyłącznie H1 i interlinię, a tracking podawała
jednym zdaniem („−3 px") **zmierzonym tylko przy 1440** — co ADR-041
wdrożył na wszystkich progach. Pomiar na dziewięciu szerokościach
(320…1600) pokazuje trzy rzeczy:

1. **Tracking jest progowy** — ani stały w px, ani w em
   (−3/70 = −0,043em, −1,6/53 = −0,030em, −1/34 = −0,029em).
2. **H2 nie idzie za H1**: rozmiar spada ×0,63, gdy H1 ×0,49.
3. **H2 na wąskim kadrze ma interlinię 1,40 i tracking −0,6 px** —
   jedyne dwa odstępstwa w całej skali nagłówków.

Razem: **na wąskim kadrze nagłówek sekcji jest osobną decyzją
typograficzną, nie pomniejszonym H1.**

Punkty przełamania: **między 1440 a 1280** oraz **między 810 a 768**.
Skok 70 → 53 → 34 px jest **skokowy, nie płynny** — wzorzec nie używa
`clamp()`, tylko progów. Nasza obecna skala robi odwrotnie (`clamp`),
więc to jest różnica konstrukcyjna, nie kosmetyczna.

Liczba widocznych linków spada z 33 (≥1440) na 26 (1280–810) i 25
(≤768) — czyli nawigacja i stopka gubią pozycje przy zwężaniu.

---

## 0.6 MATERIAŁ REFERENCYJNY

Zrzuty pełnych stron w trzech kadrach — **poza repozytorium**, w katalogu
roboczym pomiaru: `wzorzec/zrzuty/wzorzec-{1440,768,390}.png`.
Nagrania ruchu: **do wykonania razem z pomiarem 0.4**.

---

## 0.7 MOBILE 390 px — **ZMIERZONE 2026-08-26** (`WWW/056` pkt 3)

Rozdział powstał 2026-08-26 jako pozycja otwarta i **tego samego dnia
został wypełniony**. Poniżej pomiar; zapowiedź „do zmierzenia" zdjęta.

### (a) Nawigacja mobilna

**Hamburger JEST.** Kwadrat **32 × 32 px**, prawa strona nagłówka
(`x = 314` przy kadrze 390), trzy kreski jako trzy elementy potomne.

**Nagłówek strony jest PIGUŁKĄ, nie paskiem** — i to samo na desktopie:

| własność | ≤ 768 px | 810–1280 px | ≥ 1440 px |
| --- | --- | --- | --- |
| wcięcie od krawędzi | **20 px** | **40 px** | **120 px** |
| wysokość | **80 px** | 80 px | 80 px |
| promień | **50 px** | 50 px | 50 px |
| tło | `rgba(7, 8, 6, 0.6)` | j.w. | j.w. |
| rozmycie tła | `blur(10px)` | j.w. | j.w. |
| pozycja | `relative` — **NIE sticky** | j.w. | j.w. |

Wysokość **80 px na dziewięciu zmierzonych szerokościach, rozrzut zero**.

**Postać otwarcia: panel rozwijany z nagłówka**, nie pełny ekran i nie
wysuwka z boku. Nagłówek **rośnie w miejscu** z 80 na **684,8 px**
(177,2 ms), a treść strony zostaje pod nim — nie jest przykryta
nakładką i **przewijanie strony NIE jest blokowane** (`body overflow`
pozostaje `visible` w obu stanach).

**Geometria pozycji menu:**

| co | wartość |
| --- | --- |
| pierwsza pozycja | `y = 136` px |
| skok między pozycjami | **84,8 px**, równy dla wszystkich |
| pismo | **16 px / waga 500**, wyśrodkowane |
| pozycja bieżąca | limonka `#a0e00d`; pozostałe biel |
| CTA obrysowe | `y = 548`, **310 × 46,4 px**, promień 50 px |
| CTA wypełnione | `y = 618,4`, 310 × 46,4 px, tło limonkowe |
| odstęp między CTA | **24 px** |
| margines boczny CTA | **40 px** (310 = 390 − 2 × 40) |
| zamknięcie | krzyżyk w limonce, prawy górny róg |

### (b) Nagrania ruchu — patrz 0.4

Ruch zmierzony **próbkowaniem rAF**, nie klatkami wideo, i **na obu
kadrach**: wejścia sekcji, marquee i menu mobilne mają w 0.4 liczby dla
1440 **i** 390. Prędkości marquee i czasy wejść okazały się **niezależne
od kadru**. Pary nagrań do odbioru KROKU 2 — do wykonania przy STOP-ie.

### (c) Sekcje na 390 px

**Padding boczny sekcji: 135 px na 1440 → 20 px na 390.** To jedyna
wielkość geometrii, która zmienia się drastycznie z kadrem.

**Rytm pionowy jest niemal niezależny od kadru** — te same warianty
paddingu góra/dół na obu:

| sekcja | 1440 | 390 |
| --- | --- | --- |
| pierwsza po hero | 135 / 0 | **120 / 0** |
| główna galeria funkcji | 160 / 160 | 160 / 160 |
| integracje | 0 / 0 | 0 / 135 |
| cennik | 130 / 160 | 130 / 160 |
| FAQ | 0 / 160 | 0 / 160 |
| zamknięcie | 0 / 135 | 0 / 135 |

**Karty i pasy zachowują wewnętrzny padding 10 px na obu kadrach**;
szerokość karty opinii `1170 → 350` px, karty integracji **304 px na
obu** — czyli ta akurat karta ma stałą szerokość, nie płynną.

**Dokument rośnie z 10 301 px (1440) do 14 798 px (390)** — ×1,44.

⚠ **Czego ten rozdział NIE mierzy:** zachowania hero-mockupu przy
zwężaniu (chowa się czy skaluje) — wymaga porównania kadrowania obrazu,
nie odczytu prostokąta, i zostaje do sekcji hero w KROKU 2.

## Co ten pomiar ZMIENIA w naszym stanie — cztery rzeczy, nie jedna

1. **Motyw odwraca się z jasnego na ciemny.** Tło `#070806` wobec
   naszego kremu `#f0efe8`. To nie jest zmiana odcienia, tylko zamiana
   warstwy jasnej z inwersją miejscami — a mamy 26 ról zbudowanych pod
   jasną warstwę podstawową.
2. **Akcent wraca do limonki.** `#a0e00d` należy do tej samej rodziny co
   `#a3e635` — barwa, którą kasowaliśmy 2026-08-26 razem z blokiem
   eksperymentu. Wtedy zmierzono, że limonka na jasnym tle ma 1,12–1,28:1
   i sama plama nie rysuje przycisku; **na tle `#070806` ta przeszkoda
   znika**, bo kontrast liczy się wobec czerni.
3. **Krój ustępuje.** Onest schodzi; wchodzą dwie rodziny zamiast jednej,
   a warunek 120 kB robi się ciasny przy `latin-ext`.
4. **Skala przestaje być płynna.** `clamp()` ustępuje progom.
5. **Wchodzą dwie rodziny zamiast jednej**, ale budżet nie jest
   przeszkodą: 59,2 kB wobec 120 kB. Warunkiem jest **własny subset** —
   gotowe podzbiory Google dają 130,6 kB i przekraczają limit same
   z siebie.
