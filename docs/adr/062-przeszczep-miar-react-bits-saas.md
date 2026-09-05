# ADR-062: Przeszczep miar React Bits SaaS

Data: 2026-09-05. Status: **PRZYJĘTY** (zlecenie `WWW/088`, kroki 0.5–4;
decyzja właściciela z 05.09: „droga 1 — miary React Bits SaaS do naszych
tokenów; zero cudzego kodu, bramki nietknięte").

Źródło liczb: **wyłącznie tabele `WWW/087-R`** (kroki 2–3) oraz dołożony
przez właściciela **krok 0.5** (Lighthouse ×3, statystyka arkusza, tracing).
Zero cudzego kodu w repozytorium; przeniesione zostały **wartości**, nie
implementacje.

---

## 0. Co ten ADR przenosi, a czego nie

| | |
| --- | --- |
| **przeniesione** | tło korpusu jasnego · tekst mocny na jasnym · drabina promieni (3 szczeble) · chrom i szerokość karty cennika · interlinia prozy |
| **odrzucone po pomiarze** | tekst przygaszony R · kreska R · pigułka→24 px · czwarty szczebel promieni (32 px) |
| **niezmienione z decyzji** | akcent (właściciel) · cała strefa CIEMNA (pochodzi z pomiaru Proactiva, natywnie ciemnego) |

## 1. Dwie niezależne metody dały te same liczby

`WWW/087-R` mierzył R przez `getComputedStyle` na żywej stronie. Krok 0.5
dołożył **drugą, niezależną drogę**: odczyt arkusza (Tailwind v4, jeden plik
48 647 znaków, 236 własności własnych). Obie zgadzają się co do jednej
wartości na wszystkich sześciu rolach, o które pytało zlecenie:

| rola | pomiar strony | odczyt arkusza |
| --- | --- | --- |
| tło strony | `rgb(245,245,245)` | `--background: #f5f5f5` |
| tło karty | `rgb(255,255,255)` | `--frame: #fff` |
| kreska | `rgb(229,229,229)` | `--border: #e5e5e5` |
| tekst | `rgb(10,10,10)` | `--foreground: #0a0a0a` |
| tekst przygaszony | `rgb(115,115,115)` | `--muted-foreground: #737373` |
| akcent przygaszony | `rgb(232,245,200)` | `--card-secondary: #e8f5c8` |

⚠ **PIERWSZA STATYSTYKA ARKUSZA BYŁA ZEREM NARZĘDZIA I ZOSTAŁA ODRZUCONA.**
Licznik deklaracji dał „4 odstępy, 3 promienie, 1 rozmiar pisma" — nieprawdę
o wzorcu, bo Tailwind v4 trzyma skalę w **własnościach własnych**, a
deklaracje tylko je składają. Właściwa skala wyszła dopiero z odczytu
`--radius-*`, `--text-*`, `--leading-*`. Zapisuję to, bo pierwsza liczba
wyglądała jak wynik i dała się zacytować.

## 2. TRZY PREMISY ZLECENIA, KTÓRE POMIAR OBALIŁ

Zgłaszam je zamiast rozstrzygać po cichu — wszystkie trzy dotyczą **naszego**
stanu, opisanego w zleceniu inaczej, niż jest.

| zlecenie mówi | zmierzone u nas | skutek |
| --- | --- | --- |
| „nasza drabina promieni (z P: 6·8·12·16)" | **4 · 8 · 12 · 50** | to jest drabina Proactiva, nie nasza; mapowanie wykonane po ROLACH |
| „interlinia akapitu 16/24" | **dwie naraz: 28,8 px z tokena i 25,6 px z literału w 4 modułach** | literały wchodzą do kroku 4, inaczej byłby prawdziwy w części sekcji |
| „lead 18/28, jeśli mamy rolę lead" | mamy i **już jest 18/28** | różnica zero, nie ma czego przenosić |

## 3. R-TYPO-03 W TYM REPOZYTORIUM NIE ISTNIEJE

Zlecenie żąda, żeby „R-TYPO-03 (skrajniki ×3 języki) został zielony".
**Takiego strażnika tu nie ma** — i jest to zero sprawdzone, nie zero
narzędzia:

| szukane | trafień | kontrola pozytywna |
| --- | --- | --- |
| `R-TYPO` w `*.ts/*.mjs/*.js/*.md` | **0** | `R-AKCENT` tym samym poleceniem: **28** |
| `skrajnik` / `skrajn` | **0** | — |
| identyfikatory `R-*` w `e2e/` | `R-AKCENT-02`, `R-AKCENT-03` | — |
| identyfikatory `R-*` w strażniku tokenów | `R-AKCENT-01`, `-01b`, `-02` | — |

To jest **pytanie zerowe kanonu**: zanim spytasz, czy strażnik upada, spytaj,
czy istnieje — i odpowiedz odczytem konfiguracji. Odpowiedź brzmi NIE.
W jego miejsce dowód mutacyjny dostała **bramka parytetu 14×3**, jako
najbliższy istniejący mechanizm „×3 języki"; jest to **zamiennik zgłoszony
jako zamiennik**, nie wykonanie żądania.

## 4. KROK 1 — chrom i szerokość karty cennika

Rodzina `karta-cennik` odkleja się od kart funkcji. Powód nie jest
porządkowy: ten sam batch przesuwa `promien-sredni` na 24 px, a karty cennika
do tamtej rodziny nigdy nie należały (sprostowanie ADR-056 stoi
w `SekcjaPlanow.module.css` od `WWW/082`).

| | PRZED | **PO** | R |
| --- | --- | --- | --- |
| promień | 12 px | **16 px** | 16 px |
| wypełnienie | 32 px | 32 px (bez zmian) | 32 px |
| kreska | 1 px, rola strefy | 1 px, rola strefy | 1 px |
| cień | none | none | none |
| szerokość @1440 (główna / cennik) | 369 / 405 | **320 / 320** | 320 |
| szerokość @1190 | 349 / 362 | **320 / 320** | 320 |
| szerokość @810 | 203 / 235 | 222 / 235 | — |
| szerokość @390 | 350 / 350 | 350 / 350 (pełna kolumna) | — |

⚠ **PRZY OKAZJI WYSZEDŁ DEFEKT, KTÓREGO NIKT NIE SZUKAŁ.** Karty na stronie
głównej były przy 810 px **nierówne**: 203 · **261** · 203. Przyczyna jest
w składni: `1fr` to `minmax(auto, 1fr)`, a `auto` ma minimum `min-content` —
najdłuższa nazwa planu rozpychała swoją kolumnę kosztem sióstr. `minmax(0, …)`
zdejmuje to minimum i trzy karty stoją równo: **222 · 222 · 222**. Naprawa
jest skutkiem ubocznym kroku 1, nie osobnym działaniem.

⚠ **DLACZEGO `minmax(0, 20rem)`, A NIE SZTYWNE 320 px.** Trzy kolumny po 320
z dwoma odstępami po 32 to 1024 px; kadr 810 daje po wcięciach 730 px
wnętrza. Sztywna wartość przelałaby siatkę poza kadr — sprawdzone rachunkiem
przed zapisem, nie po czerwieni.

**Tła i kreski krok 1 NIE DUPLIKUJE.** Karty cennika stoją w strefie ciemnej
na obu trasach (zmierzone: tło `rgb(19,20,18)`, kreska `rgb(57,57,56)`), a role
strefy dają poprawną wartość w obu tonach bez osobnych tokenów. Warunek
zlecenia „tło karty strefy: jasny biel, ciemny nasz" jest spełniony
dziedziczeniem.

## 5. KROK 2 — mapa ról strefy jasnej

| rola | nasze PRZED | R | Δ | **decyzja** |
| --- | --- | --- | --- | --- |
| tło strony | `#f2f2f2` | `#f5f5f5` | jest | **przyjęte** |
| tło karty | `#ffffff` | `#ffffff` | **0** | bez działania |
| tekst | `#151515` | `#0a0a0a` | jest | **przyjęte** |
| tekst przygaszony | `#565656` | `#737373` | jest | **ODRZUCONE** |
| kreska | `#cdcdcd` | `#e5e5e5` | jest | **ODRZUCONE** |
| akcent | `#4f6f06` | `#a8d946` | jest | zostaje nasz (właściciel) |
| akcent przygaszony | **rola nie istnieje** | `#e8f5c8` | nieokreślone | nie tworzona |

### Dlaczego dwie role odrzucone — liczbami

Zlecenie w jednym akapicie każe przyjąć wartości R, a w drugim stawia progi.
Dla tych dwóch ról **te zdania są sprzeczne** i rozstrzyga próg:

| para | nasze | po przyjęciu R | próg | werdykt |
| --- | --- | --- | --- | --- |
| przygaszony / tło | **6,73:1** | **4,35:1** | 4,5:1 (zlecenie) | R **poniżej** |
| kreska / karta | **1,59:1** | **1,26:1** | 1,30 (ADR-038) | R **poniżej** |
| kreska / tło | **1,46:1** | **1,16:1** | 1,30 (ADR-038) | R **poniżej** |

Nie jest to podejrzenie, tylko zmierzona własność wzorca: **axe na R znalazł
30 węzłów `color-contrast` o wadze serious** na obu kadrach (`WWW/087-R`).
Przeniesienie tych dwóch liczb zamieniłoby cudzą wadę na naszą czerwień —
a zakaz 3 kanonu nie zna wyjątku dla czerwieni uzasadnionej.

### Co przyjęcie poprawiło — zmierzone na żywej stronie po zmianie

| para | PRZED | **PO** | próg |
| --- | --- | --- | --- |
| tekst / tło strefy | 16,31:1 | **18,16:1** | 4,5 |
| tekst / karta | 18,26:1 | **19,80:1** | 4,5 |
| przygaszony / karta | 7,34:1 | **7,34:1** | 4,5 |
| przygaszony / tło strefy | 6,56:1 | **6,73:1** | 4,5 |
| kreska / karta | 1,59:1 | **1,59:1** | 1,30 |
| kreska / tło strefy | 1,42:1 | **1,46:1** | 1,30 |
| akcent na jasnym / tło | 5,20:1 | **5,34:1** | 4,5 |
| obwódka fokusu / tło | 16,31:1 | **16,75:1** | 3,0 |
| obrys pola / tło | 6,56:1 | **6,73:1** | 3,0 |

⚠ **JEDNA RELACJA SIĘ POGARSZA I NIE PRZEMILCZAM JEJ:** karta biała wobec tła
sekcji schodzi **1,12 → 1,09:1**, razem z nią pudełko ikony w karcie. Obie były
poniżej progu 1,30 **już przed zmianą**, więc karty rozdziela obrys (1,59:1,
bez zmian) i kompozycja (odstęp 32 px ≥ 30 px, trzeci mechanizm ADR-038).
Żaden mechanizm nie znika; to ubytek wyrazu o 0,03, nie utrata rozdziału.

### Strefa ciemna bez zmian — i to jest decyzja, nie pominięcie

Nasza strefa ciemna pochodzi z pomiaru Proactiva, wzorca **natywnie
ciemnego**. R ma tryb ciemny pełny (przemapowanie wszystkich ról, zmierzone
w `WWW/087-R`), ale jest wzorcem **natywnie jasnym** — jego ciemny to
odbicie, nasz to oryginał. Mieszanie dwóch źródeł w jednej strefie dałoby
paletę bez rodowodu.

## 6. KROK 3 — drabina promieni

| szczebel | nasze PRZED | **PO** | R | konsumenci |
| --- | --- | --- | --- | --- |
| mały | 4 px | **12 px** | `--radius-xl` 12 | skip-link, kreska paska |
| karty | 8 px | **16 px** | `--radius-2xl` 16 | pudełko ikony, obraz modułu, karta kierunku, blok dnia, 2 × CTA |
| sekcji | 12 px | **24 px** | `--radius-3xl` 24 | karta funkcji, obraz filaru, kadr „dbania", pas ścieżek, FAQ |
| duży | — | **nie wszedł** | `--radius-4xl` 32 | **brak konsumenta** |
| pigułka | 50 px | **50 px** | `9999px` | pasek, CTA hero, logowanie, przełącznik |
| karta cennika | — | **16 px** | 16 | dwie siatki cennika |

Rozkład na żywej stronie po zmianie: **24×20 · 16×4 · 12×1 · 50×4** (główna,
1440) — drabina R odtworzona, pigułka zachowana.

⚠ **„PIGUŁKA → 24 px" NIE ZOSTAŁO WYKONANE, I POWSTRZYMUJE TO SAM WZORZEC.**
Najczęstszym promieniem R jest `33554400 px`, czyli przycięte `9999px`: R ma
pigułkę **obok** drabiny 12·16·24·32, nie zamiast niej. Sprowadzenie naszej
pigułki do 24 px byłoby odejściem od wzorca w imię wierności wzorcowi.
Dotyczyłoby naraz paska nawigacji, przycisku hero, przycisku logowania
i przełącznika okresu — czeka na rozstrzygnięcie właściciela.

⚠ **CZWARTY SZCZEBEL (32 px) NIE WSZEDŁ**, bo w `src/` nie ma dziś elementu,
któremu przypadałaby rola „duży": przejrzane wszystkie **21 wystąpień**
`border-radius` i każde ma rolę na trzech niższych szczeblach. Token bez
konsumenta jest dokładnie tym, przed czym broni ADR-048.

## 7. KROK 4 — proza

| | PRZED | **PO** | R |
| --- | --- | --- | --- |
| interlinia prozy | 1,8 (**28,8 px**) i 1,6 (**25,6 px**) w 4 modułach | **1,625 = 26 px, jednolicie** | `--leading-relaxed` 1,625 = 26 px |
| lead | 18/28 | 18/28 (bez zmian) | 18/28 |

Cztery literały `line-height: 1.6` (`CennikSkrot`, `Zamkniecie`, `SekcjaRytmu`,
`SekcjaTekstowa`) schodzą na token. Gdyby zostały, krok 4 byłby prawdziwy
w części sekcji, a w czterech innych proza stałaby na 25,6 px. Po zmianie
w `src/` nie ma **ani jednego** literału `line-height: 1.6` (kontrola
pozytywna: 29 deklaracji `line-height` razem).

⚠ **SKUTEK UBOCZNY, KTÓRY ZGŁASZAM:** pismo 20 px dziedziczy ten sam token,
więc jego interlinia zeszła **36 → 32,5 px**. Zlecenie mówiło o akapicie;
akapit i to pismo dzielą jedną rolę.

Liczba linii bez zmian tam, gdzie miara akapitu je trzyma (główna: 53 linie
przy 390 przed i po), wysokość prozy krótsza: 1454 → 1400 px.

## 8. Dowody mutacyjne — trzy, każdy z powrotem po sumie SHA

| strażnik | mutacja | wynik | powrót |
| --- | --- | --- | --- |
| strażnik tokenów (R-AKCENT-01) | `akcent-na-jasnym` = akcent R | **CZERWONY**: 1,52:1 na tle jasnym, 1,66:1 na karcie, wymagane 4,5:1 | SHA identyczna, znów zielony |
| parytet 14×3 (zamiennik R-TYPO-03) | usunięty `content/en/cennik.md` | **CZERWONA**: „brakuje: en/cennik.md" | SHA identyczna, znów zielona |
| „zero dywergencji" (`e2e/cennik.spec.ts`) | karta na `/cennik` wraca na 24 px | **CZERWONY na 4 kadrach**: `"promien": "16px"` → `"24px"` | SHA identyczna |

Pierwsza mutacja robi coś więcej niż dowód działania strażnika: **zamienia
decyzję właściciela o akcencie w liczbę**. Akcent R na naszym korpusie jasnym
daje 1,52:1 — decyzja „akcent zostaje nasz" jest po tym pomiarze wymuszona,
a nie tylko preferowana.

## 9. Bramki i pomiary

| | wynik |
| --- | --- |
| komplet e2e (4 kadry) | **1376 passed · 12 skipped · 0 failed** |
| axe (4 kadry) | **120 passed** |
| strażnik tokenów | ZIELONY, **30 ról** (liczba bez zmian — żadna rola nie doszła) |
| linter tokenów · liczby · parytet · linki · kotwice · no-JS · deklaracje | wszystkie ZIELONE |
| kontrakt ΔE | **CZERWONY, 93,9 — identycznie przed i po** (zmierzone na obu stanach, nie wywnioskowane) |
| ESLint | 1 ostrzeżenie zastane (`straznik-tokenow.mjs:494`, plik nietknięty), zero nowych |
| zamiatanie 320→2560 co 32, świeże wejście | **22/22 czyste na obu trasach** |

## 10. Wysokości i podróże (port 3100, budowanie produkcyjne)

| | PRZED | PO | różnica |
| --- | --- | --- | --- |
| główna @1440 | 10 563 | 10 447 | **−116** |
| główna @1190 | 10 056 | 9 957 | **−99** |
| główna @810 | 10 409 | 10 254 | **−155** |
| główna @390 | 10 855 | 10 639 | **−216** |
| cennik @1440 | 3 568 | 3 616 | **+48** |
| cennik @1190 | 3 582 | 3 601 | **+19** |
| cennik @810 | 3 956 | 3 809 | −147 |
| cennik @390 | 4 952 | 4 739 | −213 |
| ekranów @390 (główna) | 12,86 | **12,61** | −0,25 |
| ból LIDERKA | 6,51 | **6,43** | −0,08 |
| ból SAMA / STRUKTURA | 1,98 / 1,33 | 1,98 / 1,33 | 0 |
| największa luka | 3,34 | **3,31** | −0,03 |

⚠ **`/cennik` URÓSŁ NA KADRACH SZEROKICH I JEST TO SKUTEK ZAMIERZONY:** karta
zwężona do 320 px łamie tekst na więcej wierszy (611 → 730 px wysokości).
Zysk to jedna karta zamiast trzech różnych; koszt to 48 px strony.

## 11. Krok 0.5 — pomiar dołożony przez właściciela

**Lighthouse mobile ×3, mediana:**

| | R | nasze (3100) |
| --- | --- | --- |
| wydajność | 81 | **99** |
| dostępność | 91 | **100** |
| dobre praktyki | 96 | 96 |
| SEO | **100** | 50 |
| LCP | 4 538 ms | **2 256 ms** |
| FCP | 1 747 ms | **906 ms** |
| TBT | 52 ms | **0 ms** |
| waga strony | 750 KB | **237 KB** |

SEO 50 po naszej stronie to **artefakt localhosta**: `is-crawlable`,
`robots-txt` i `meta-description`. Pierwsze dwa nie istnieją poza wdrożeniem;
trzecie jest realne i idzie do rejestru, nie do tego batcha (zakaz 8).

**Rozjazd wobec `WWW/087-R`** — próg zgłoszenia 20 %, żaden nieprzekroczony:

| | 087-R | krok 0.5 | rozjazd |
| --- | --- | --- | --- |
| LCP R | 4 236 ms | 4 538 ms | **7,1 %** |
| waga R | 729 KB | 750 KB | **2,9 %** |

**Tracing 5 s przewijania @390, 4× CPU:** obie strony **0 klatek porzuconych**,
301 klatek, 60 fps, zero rozstępów rAF > 25 ms.

⚠ **TO ZERO MA KONTROLĘ POZYTYWNĄ** — bez niej byłoby zerem narzędzia, bo
headless rysuje programowo (`SoftwareRenderer` w śladzie), a przy renderowaniu
programowym kompozytor raczej czeka, niż porzuca. Ten sam przebieg z blokadą
wątku głównego 120 ms co ~15 klatek dał **`DroppedFrame` 0 → 85** i **rozstępy
0 → 14**. Oba liczniki umieją zapalić, więc oba zera są prawdziwe.

## 12. Czego ten ADR NIE rozstrzyga

- **Pigułki** — mapowanie „sekcja/pigułka → 24 px" wstrzymane, uzasadnienie
  w §6; czeka na właściciela.
- **Czwartego szczebla promieni (32 px)** — wchodzi z pierwszym konsumentem.
- **Roli „akcent przygaszony"** — R ją ma, my nie; nie tworzę roli bez
  konsumenta i bez pary kontrastowej.
- **Tekstu przygaszonego i kreski** — odrzucone progiem; gdyby miały wejść,
  musi wejść razem z nimi decyzja o zejściu poniżej 4,5:1 i poniżej 1,30.
- **Braku strażnika interlinii** — po zmianie **nic nie pilnuje** wartości
  prozy: jedyne wystąpienie `lineHeight` w `e2e/` liczy z niej wiersze,
  a nie asertuje. Pozycja rejestru, nie naprawa w tym batchu.
- **2 px przepełnienia po zmianie rozmiaru okna** — zamiatanie ze zmianą
  kadru w jednej karcie pokazuje od 1344 px nadmiar 2 px na obu trasach;
  **świeże wejście na tych samych kadrach daje zero**. Nie ustaliłem, czy
  jest starsze od tego batcha — do rejestru.
- **Bramki cennika** — czerwona lokalnie wyłącznie z braku
  `STRIPE_TEST_SECRET_KEY` w środowisku; w CI zielona.
