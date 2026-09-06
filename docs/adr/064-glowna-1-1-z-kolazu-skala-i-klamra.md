# ADR-064: Główna 1:1 z kolażu — wzorzec-kolumna, skala i klamra

Data: 2026-09-06. Status: **PRZYJĘTY W CZĘŚCI** (zlecenie `WWW/090` krok 3 v2:
**3a i 3b wykonane w całości, 3c w części** — patrz §5).

⚠ **NUMER NIŻSZY OD POPRZEDNIEGO, I TAK MA BYĆ.** ADR-065 powstał wcześniej
(kroki 0–2 tego samego zlecenia); zlecenie `WWW/090 krok 3 v2` domyka lukę
numeracji, nadając temu dokumentowi **064**. Kolejność numerów nie jest tu
kolejnością czasu i jest to zapisane, żeby nikt nie szukał zaginionego pliku.

---

## 1. KROK 3a — wzorzec-kolumna

Kolaż złożony w jedną kolumnę: pas górny (pełne 1536 × 1036) + kolumna lewa
(768 × 1716 → ×2, LANCZOS) + kolumna prawa (768 × 1716 → ×2, LANCZOS).

| | |
| --- | --- |
| plik | `design/wzorzec-2026-09-06/glowna-kolumna.png` |
| wymiary | **1536 × 7900** |
| SHA-256 | `d518a9df0517dbac512913c15c47f1ac3f716424880518c7eee68177f9d6a08f` |

**Szew ustalony pomiarem, nie na oko:** y = **1036** — pierwszy długi pas,
w którym mediany lewej i prawej połowy rozchodzą się o więcej niż 8/255 po
zakończeniu hero. Złożenie czyta się jako strona liniowa i odtwarza
kolejność sekcji ze zlecenia.

⚠ **Artefakt złożenia, zapisany żeby nie brać go za defekt:** obraz laptopa
z sekcji „pamięć" sięga we wzorcu do y 1154, czyli **przecina szew** — w
kolumnie jego dolna część wraca jako pierwszy element prawej kolumny.

## 2. KROK 3b — skala typografii przeliczona

**Reguła, w trzech krokach** (do powtórzenia przy każdej przyszłej zmianie):

1. **Kotwica**: proza 16 px, interlinia 1,625 → **odstęp wierszy 26 px**.
2. **Stosunek z pomiaru wzorca**, mierzony **odstępem wierszy, nie wysokością
   tuszu** — tusz waha się o kilkanaście procent zależnie od tego, czy
   w wierszu trafi się wydłużenie górne albo znak diakrytyczny (zmierzone:
   50 px i 32 px w dwóch wierszach tego samego H2).
3. **font-size = docelowy odstęp wierszy ÷ nasza interlinia tej roli.**

**Stosunki zmierzone na OBU końcach**, każdy w obszarze kolażu o właściwej
szerokości kontenera:

| | kontener 1536 (szeroki) | kontener 768 (wąski) |
| --- | --- | --- |
| nagłówek duży ÷ proza | **74 / 30,5 = 2,43** | **47 / 24 = 1,96** |
| nagłówek sekcji ÷ proza | **59 / 30,5 = 1,93** | **36 / 24 = 1,50** |

**Wynik — i nie jest to podmiana dwóch liczb, tylko przeliczenie sześciu:**

| token | było | **jest** | rachunek |
| --- | --- | --- | --- |
| `tekst.h1` | 96 px | **52 px** | 26 × 2,43 ÷ 1,2 |
| `tekst.h1-srednie` | 72 px | **44 px** | interpolacja progów |
| `tekst.h1-male` | 48 px | **36 px** | 26 × 1,96 ÷ 1,4 |
| `tekst.h2` | 48 px | **40 px** | 26 × 1,93 ÷ 1,25 |
| `tekst.h2-srednie` | 36 px | **34 px** | interpolacja progów |
| `tekst.h2-male` | 30 px | **28 px** | 26 × 1,50 ÷ 1,4 |

**Tracking przeliczony razem z rozmiarami**, żeby zachować dotychczasowy
stosunek `em` każdej roli (H1 −0,03125em, reszta −0,025em): −0,1015625 ·
−0,06875 · −0,046875 · −0,0625 · −0,053125 · −0,04375 rem.

⚠ **`clamp()` NIE WSZEDŁ, choć zlecenie o nim wspomina** („nasze progi
390/810/1190 przez clamp"). ADR-041 odrzucił `clamp()` **z pomiaru**:
produkuje rozmiary pośrednie, których wzorzec nigdy nie pokazuje, a nasza
skala jest sprawdzana na trzech progach. Zamiana mechanizmu progów na
płynny byłaby cofnięciem tamtej decyzji **bez pomiaru, który by ją
podważał** — a stosunki wyliczone wyżej działają na progach tak samo dobrze.
Zgłaszam jako rozjazd, nie wykonuję po cichu.

**Lead sprawdzony i NIE zmieniony:** rachunek daje 26 × 32/30,5 ÷ 1,5556 =
**17,5 px** wobec naszych 18 — różnica 0,5 px mieści się w niepewności
kolażu (T66), a zlecenie mówi o **nagłówkach**.

## 3. KROK 3c — klamra grafitowa

| | było | **jest** |
| --- | --- | --- |
| pasek nawigacji | pigułka 1280 px, tło strony przy alfie 0,92, promień 50, odsunięcie 16 px | **pas pełnej szerokości, grafit klamr, kant, przy krawędzi** |
| stopka | tło strony + kreska | **grafit klamr + kreska** |

Obie zmiany dają nowej roli `grafit-klamr` (ADR-065) jej konsumenta, więc
odstępstwo od ADR-048 zapisane tam jako warunkowe **zostaje zamknięte**.

### ⚠ POŁOWA ZMIANY BYŁA GORSZA OD ŻADNEJ — i wykrył to pomiar, nie oko

Sama zamiana powierzchni paska na grafit **pogorszyła** zgodność z wzorcem:

| stan | nakładka pasa nawigacji |
| --- | --- |
| wyjściowy (pigułka półprzezroczysta) | **27,7 %** |
| po samej zmianie barwy | **32,4 %** ← gorzej |
| po dołożeniu pełnej szerokości | **31,6 %** |

Przyczyna jest mechaniczna: wzorzec ma pas **jednolicie** grafitowy, a
u nas grafit stał się wyspą pływającą w ciemnym tle — kontrast WEWNĄTRZ
naszego pasa urósł, a wzorzec go nie ma. To ta sama klasa co „mechanizm
zbudowany do połowy" (ADR-063), tym razem zmierzona w pikselach.

**Wysokość pasa zostaje nasza (84 px), nie wzorcowa (≈110 px przy 1440)** —
110 px złamałoby pułap strażnika `odsuniecie-kotwic` (**96 px**), a
podniesienie pułapu jest osłabieniem bramki, nie dostrojeniem.

## 4. ⚠ USTALENIE NAJWAŻNIEJSZE: WZORZEC JEST STRONĄ JASNĄ, NASZA JEST POŁOWICZNA

Zmierzone na całych obrazach (reguła: jasność piksela > 180 = jasny, < 80 =
ciemny):

| | jasne | ciemne | pośrednie |
| --- | --- | --- | --- |
| **wzorzec (kolumna)** | **70,9 %** | 22,5 % | 6,6 % |
| nasza strona @1440 (po tym batchu) | **47,4 %** | 46,4 % | 6,2 % |
| nasza strona @1440 (przed) | 48,3 % | 45,6 % | 6,2 % |

**To jest największa różnica strukturalna między nami a wzorcem i wyjaśnia,
dlaczego nakładka całości stoi na 50,2 % mimo poprawnej klamry, poprawnej
skali i poprawnych barw.** Wzorzec to **strona JASNA z klamrami
grafitowymi**; nasza to strona ciemna ze strefami jasnymi — dokładna
odwrotność. Klamra i skala mogą być co do piksela, a strona i tak będzie
wyglądać inaczej, dopóki ta relacja się nie odwróci.

⚠ **NIE ODWRACAM JEJ W TYM BATCHU.** Odwrócenie tonu domyślnego to zmiana
`kolor.tlo` i całego zbioru ról korpusu ciemnego (dziś: `tlo-strony`,
`powierzchnia`, `powierzchnia-2`, `powierzchnia-akcentowa`,
`tekst-podstawowy`, `tekst-drugorzedny`, `kreska`, `kreska-mocna`, `link`,
`fokus` — dziesięć ról) plus mechanizmu `[data-ton="jasny"]`, który
z **wyjątku stałby się regułą**. To jest decyzja palety, nie krok batcha.
Pozycja rejestru **T68**.

## 5. Czego krok 3c NIE zrobił — i dlaczego, po kolei

| element wzorca | powód |
| --- | --- |
| sekcja „pamięć" i sekcja „wzrost" | **brak treści**: nagłówki („Catherly to pamięć twojej sprzedaży", „Widzisz wzrost nawet po trudnym dniu") nie istnieją w `content/`. Implementacja treści nie pisze (zakaz 9), a parytet ×3 jest bramką blokującą |
| ekrany w ramach MacBooka i iPhone'a | **przesłanka fałszywa**: „zrzuty fali 1" nie istnieją. Fala 1 to **fotografie** (sprawdzone: pusty pokój z krzesłem, paleta „natura"), a `MANIFEST-HIGGSFIELD-FALA1.md` sam mówi, że schodzą ze stron. Zrzutów aplikacji w repozytorium **nie ma** — zdjęła je decyzja właściciela `WWW/072` i `WWW/083` („zero zrzutów aplikacji i mockupów urządzeń", rozszerzone na cały serwis). Wstawienie ich teraz **odwraca dwie zapisane decyzje** i wymaga jego słowa |
| trzy karty filarów zamiast czterech | wzorzec pokazuje **3** (Pozyskiwanie, Treści, Zespół), mamy **4**. Zdjęcie filaru „Wyniki" jest decyzją o treści |
| zdjęcie z głównej czterech sekcji | pas ścieżek, pas możliwości, dbanie o siebie, obawy/FAQ. **Obawy są związane decyzją O-7** („jednym pakietem albo wcale") i pilnowane przez `toHaveCount(6)`; usunięcie ich z głównej bez rozstrzygnięcia łamie tamten pakiet |
| hero dwukolumnowe, sloty dnia, sześć kafelków z ikonami SVG, karta „Wrapped" | nie zaczęte — po pięciu poprzednich pozycjach zostałby fragment, a fragment jest tu gorszy od braku (§3) |

## 6. Bramki

| | wynik |
| --- | --- |
| komplet e2e (4 kadry) | **1376 passed · 12 skipped · 0 failed** |
| tokeny · liczby · parytet · deklaracje | ZIELONE |
| linki · kotwice · No-JS (z `WWW_DIST`) | ZIELONE |
| strażnik tokenów | ZIELONY, 31 ról |
| dev właściciela na 3000 | **200 przez cały batch** |

⚠ **Linter tokenów złapał mnie na własnym komentarzu** — wpisałem zmierzoną
barwę heksadecymalnie do komentarza CSS, a linter czyta komentarze (to
szósty raz w historii tych plików). Poprawione; kontrola pozytywna
potwierdziła, że linter nadal widzi hex w komentarzu (plik próbny: 1
trafienie).
