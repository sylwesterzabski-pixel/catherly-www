# ZWROTKA DO KOORDYNATORA — zapisy dla plików wspólnych strony

**Powód istnienia tego pliku:** rozstrzygnięcie właściciela **TOR9/023 (24.08.2026)** —
`CLAUDE.md` strony, `.github/workflows/bramki.yml` i `docs/faza-2/rejestr-warunkow-powrotu.md`
**pisze wyłącznie okno WWW**. Wpisy toru 9 idą **zwrotką**, nie zapisem.

> **Zasada ogólna z tego samego rozstrzygnięcia, przyjęta:**
> **ZAPIS DO PLIKU WSPÓLNEGO ZACZYNA SIĘ OD `git fetch` I ŻYWEJ BAZY.**
> Zapis z bazy 374 wiersze w tyle to nadpisywanie cudzej pracy w ciemno,
> niezależnie od intencji.

---

## CZĘŚĆ 0 — MÓJ CAŁY ŚLAD W PLIKACH WSPÓLNYCH, ZMIERZONY

Nie tylko dzisiejszy dopisek. **Pełny stan `69c2dab` → gałąź `tor9-ustalenia`,
po wycofaniu dzisiejszego bloku:**

| plik | `git diff --numstat` | co z tym zrobić |
|---|---|---|
| `CLAUDE.md` | **+612 / −0** | **do przeniesienia przez okno WWW.** Same dopisy, zero usunięć — ale na bazie sprzed 20 commitów |
| `.github/workflows/bramki.yml` | **+32 / −0** | zadanie `bramka-deklaracje` (ŻÓŁTE, `continue-on-error`) — jw., dopis bez usunięć |
| `docs/faza-2/rejestr-decyzji-stojacych.md` | **+40 / −0** | jw. |
| `package.json` | **+1 / −0** | linia `"bramka:deklaracje"`. **Uwaga: wcięcie 2 spacje przy 4 u sąsiadów** — defekt mój, niepoprawiony |
| `docs/faza-2/rejestr-warunkow-powrotu.md` | **+1 / −1** | **JEDYNE MIEJSCE, GDZIE NADPISAŁEM CUDZY WIERSZ.** Poz. 20 → `~~20~~ PRZENIESIONE`. Okno WWW dopisało tam od tego czasu **+104 / −2** — **ta zmiana wymaga ręcznego przeniesienia, nie scalenia** |

> **Dzisiejszy dopisek do `CLAUDE.md` wycofałem z drzewa roboczego jeszcze przed
> commitem. Potwierdzenie SUMĄ, nie komunikatem:**
> `git rev-parse HEAD~1:CLAUDE.md` = `da31446848…` = `git hash-object CLAUDE.md`. **Zgodne.**

---

## CZĘŚĆ 1 — ZAPISY DO KANONU (treść do przeniesienia przez okno WWW)


---

### Blok zlecony w TOR9/022


### LICZBA STARZEJE SIĘ W TRANZYCIE NAWET PRZY JEDNYM OGNIWIE I W TEJ SAMEJ DOBIE

> ## **Nie trzeba łańcucha pośredników ani upływu dni, żeby liczba przestała być
> ## prawdziwa. Wystarczy JEDNO przekazanie i TA SAMA doba.**

Nadrzędne nad wszystkimi regułami o liczbach w tym pliku, razem ze zdaniem
„żadna nie była fałszywa w chwili powstania". Wynika z tego wymóg wykonawczy,
nie postawa: **liczba przekazywana dalej niesie datę i godzinę pomiaru albo nie
jest liczbą, tylko wspomnieniem liczby.**

**Wariant bez tranzytu, zmierzony tego samego dnia — LICZBA STARZEJE SIĘ W MIEJSCU.**
Bilans pod tabelą rejestru przepływu brzmiał „12 · 6 · 2 · 3", a przeliczenie ze
statusów w wierszach dawało „10 · 8 · 2 · 3". Nikt go nie przekazywał — **postarzał
się przez to, że edytowano wiersze, a nie spojrzano w dół.** Stąd forma wymuszająca:

> ## **KAŻDY LICZNIK POD TABELĄ JEST LICZONY ZE ŹRÓDŁA PRZY KAŻDEJ EDYCJI TABELI
> ## ALBO NIE MA GO WCALE. Licznik przepisywany ręcznie jest datą, nie liczbą.**

### OGRANICZENIE ZDOLNOŚCI ODBIORCY PODANE JAKO FAKT, BEZ ZAPYTANIA GO

*(do rejestru przesłanek — klasa nazwana przez właściciela 24.08.2026:
„Kosztowało to dwie doby")*

> ## **Nadawca orzeka o tym, czego odbiorca NIE MOŻE — i podaje to jako stan
> ## świata, nie jako własne przypuszczenie. Odbiorca przyjmuje, bo nie ma powodu
> ## kwestionować zdania o samym sobie.**

Odmiana najkosztowniejsza jest **odruchowa**: odbiorca sam o sobie orzeka
niemożność („nie mam dostępu do repozytorium aplikacji") i **nikt tego nie sprawdza,
bo brzmi jak wiedza z pierwszej ręki.** Zdanie o własnych ograniczeniach jest
**najsłabiej weryfikowanym zdaniem w całym obiegu** — nadawca jest jednocześnie
jedynym świadkiem.

**Forma wymuszająca — R-H zastosowane do siebie:**

> ## **KAŻDE ZDANIE O NIEDOSTĘPNOŚCI NIESIE KOMENDĘ I JEJ WYNIK ALBO NIE WCHODZI
> ## DO SPRAWOZDANIA.** Twierdzenie „nie mam dostępu do X" jest twierdzeniem
> ## o nieistnieniu i podlega R-H bez wyjątku — **także wtedy, gdy dotyczy mnie.**

### GRANICA PRZYJĘTA Z PRZEKONANIA UTRZYMUJE SIĘ DŁUŻEJ NIŻ ZMIERZONA — BO NIE MA CZEGO ODŚWIEŻAĆ

Granica zmierzona ma datę, więc się starzeje i ktoś ją w końcu przelicza.
Granica przyjęta z przekonania **nie ma daty**, więc nie ma momentu, w którym
wypada ją sprawdzić. **Żyje, dopóki ktoś przypadkiem nie spróbuje.**

**I domknięcie, bez którego to jest tylko opis klasy:** sprostowanie JEDNEGO
przypadku granicy **nie jest domknięciem klasy**. 23.08 tor 9 sprostował „nie mam
dostępu do kodu aplikacji" — i uznał sprawę za zamkniętą. 24.08 ta sama klasa
wróciła **w dwóch nowych miejscach** (gałąź robocza strony uznana za stan bieżący
przy działającym `fetch`; zły adres gałęzi podany dalej jako źródło cudzego dorobku).

> ## **PO SPROSTOWANIU PRZYPADKU NALEŻY PRZELICZYĆ WSZYSTKIE ZDANIA TEJ SAMEJ
> ## FORMY, A NIE ODNOTOWAĆ PRZYPADEK. Kto poprawił jedno zdanie o granicy, ma
> ## POCZUCIE domknięcia i jest przez to bardziej narażony, nie mniej.**

### `P-22` — DOMKNIĘCIE OD STRONY TREŚCI

`P-22` (tor 8): *„przekaz poprawny bez drogi weryfikacji — odbiorca dostał prawdę,
której nie umie sprawdzić"*. Rozbicie toru 9 na **TREŚĆ** i **KANAŁ** zostaje;
domknięcie od strony treści brzmi:

> ## **DROGĄ WERYFIKACJI JEST KOMENDA, KTÓRĄ ODBIORCA MOŻE URUCHOMIĆ U SIEBIE,
> ## I WYNIK, KTÓRY MA ZOBACZYĆ. Nie jest nią wskazanie pliku, nazwa gałęzi ani
> ## zdanie „sprawdzone".**

Wskazanie samo w sobie **nie jest drogą** — i ma to dziś pomiar: przekazałem dalej
`feat/cs-build` jako miejsce dorobku toru 10. Adres brzmiał konkretnie, więc nikt
go nie sprawdzał. **Katalogu tam nie ma** (`git ls-tree -r origin/feat/cs-build --
docs/weryfikacja-obietnic/` → pusto). **Wskazanie było fałszywe przez trzy dni
i wyglądało dokładnie tak samo jak prawdziwe.**

---

### Blok zlecony w TOR9/023 — dwie figury i jedno rodzeństwo

#### ADRES KONKRETNY ≠ ADRES ZMIERZONY

> ## **KONKRETNOŚĆ BRZMIENIA DZIAŁA JAK DOWÓD, NIE BĘDĄC NIM.**
> ## Nazwa gałęzi, ścieżka pliku, numer wiersza — im dokładniej wyglądają,
> ## tym mniej prawdopodobne, że ktokolwiek je uruchomi.

Rodzeństwo wczorajszego **„im mniej dowodu niesie przekaz, tym bardziej gotowy
wygląda"**. Pomiar: podałem dorobek toru 10 na `feat/cs-build`. Adres brzmiał
konkretnie — **przez trzy dni nikt go nie sprawdził.** `git ls-tree -r
origin/feat/cs-build -- docs/weryfikacja-obietnic/` zwraca **pusto**.

**Zbieżność odnotowana przez właściciela:** WWW/019 zmierzyło **niezależnie te same
lokalizacje**, wynik identyczny; mapa wznowienia poprawiona u koordynatora.
**Dwie drogi, jeden wynik — to jest różnica między adresem konkretnym a zmierzonym.**

#### LICZNIK STARZEJE SIĘ W MIEJSCU — trzeci sposób starzenia się liczby

Dotąd rejestr znał **starzenie w tranzycie** (przy przekazywaniu) i **w oczekiwaniu**
(gdy liczba czeka na użycie). **Trzeci jest w domu:** wiersze tabeli są edytowane,
a suma pod nią — nie. Nikt nic nie przekazuje, nikt nie czeka, a liczba przestaje
być prawdziwa.

Pomiar: bilans rejestru przepływu brzmiał **12 · 6 · 2 · 3**, przeliczenie ze statusów
dawało **10 · 8 · 2 · 3**.

> ## **KAŻDY LICZNIK POD TABELĄ JEST LICZONY ZE ŹRÓDŁA PRZY KAŻDEJ EDYCJI TABELI
> ## ALBO NIE MA GO WCALE. Licznik przepisywany ręcznie jest datą, nie liczbą.**

#### LICZBA NAPISANA O RUCH WCZEŚNIEJ, NIŻ ZMIERZONA

> ## **PROGNOZA PODANA SKŁADNIĄ ODCZYTU.** Zdanie ma formę wyniku („bilans wynosi
> ## 7 · 11"), a jest przewidywaniem tego, co wynik pokaże. **Czytelnik nie ma jak
> ## odróżnić jednego od drugiego — obie formy wyglądają identycznie.**

Pomiar: wpisałem **7 · 11** w zdaniu, którym ogłaszałem, że bilans jest **liczony
skryptem, a nie przepisywany**. Skrypt dał **8 · 10**.

**Wzorzec postępowania, zatwierdzony przez właściciela:**
> ## **KOREKTA BEZ ZAMAZANIA ŚLADU — obie liczby zostają widoczne.**
> Reguła toru 10 („nieważna próba zostaje z opisem, JAK WYGLĄDAŁ wynik")
> **obowiązuje także wtedy, gdy nieważną próbą jest własne zdanie sprzed minuty.**

---

## CZĘŚĆ 2 — CZEGO TA ZWROTKA NIE ZAWIERA (R-D)

1. **Nie zawiera treści `bramka-deklaracje`** — zadanie CI leży w `bramki.yml` na mojej
   gałęzi i jest do przeniesienia w całości, nie do przepisania tutaj.
2. **Nie rozstrzyga, czy `bramka-deklaracje` ma zostać ŻÓŁTA** — warunek przejścia
   na czerwoną jest zapisany w komentarzu zadania, nie w niczyjej pamięci.
3. **Nie wie, czy okno WWW dopisało do `CLAUDE.md` coś, co jest z moimi zapisami
   sprzeczne.** Porównałem tylko rozmiar zmiany (+374 / −8), nie treść.

---

### Blok zlecony w TOR9/025 — cztery zapisy

#### ARTEFAKT RATUNKOWY SPRAWDZA SIĘ ODTWORZENIEM DO PUSTEGO, NIE WERYFIKACJĄ

> ## **`verify` mierzy spójność wobec NADAWCY. Odtworzenie mierzy ją wobec świata,
> ## w którym nadawcy już nie ma — a tylko taki świat uzasadnia istnienie kopii.**

**Trzecia odsłona tej samej klasy w trzy doby:** `git status` jako dowód przywrócenia ·
`git checkout --` biorące z indeksu · `git bundle verify` na klonie płytkim.
**Za każdym razem komenda raportuje sukces, a scenariusz docelowy jest niemożliwy.**

**Zasada towarzysząca, przy artefaktach ratunkowych:**
> ## **JEDEN PLIK, NIE TRZY O ZBLIŻONYCH NAZWACH.** W chwili, gdy kopia jest potrzebna,
> ## nikt nie czyta tabeli różnic — sięga po pierwszy z brzegu.

#### ODCZYT CZĘŚCIOWY ZGŁASZA SIĘ JAKO KOMPLETNY WYNIK Z MNIEJSZEJ DZIEDZINY

Narzędzie czytające źródło wybiórczo **nie mówi „przeczytałem połowę"** — mówi
„oto wynik". Brak wygląda wtedy na **brak w źródle**, a nie na brak w odczycie.
Pomiar: parser czytał `c[0], c[1], c[2]` słownika nazw i pomijał `c[3]` — kolumnę,
w której leżały rozstrzygnięcia odraczane trzykrotnie.

**Druga strona tego samego zapisu — rozstrzygnięcie właściciela 24.08:**
> **Trzecie odroczenie wymusiło zlecenie, zlecenie znalazło przyczynę.
> Reguła o powtórzonych odroczeniach potwierdzona DZIAŁANIEM: sygnał był prawdziwy
> i wskazywał NARZĘDZIE, nie materiał.**
>
> ## **„Zawstydzający" jest niewłaściwym słowem dla przyczyny, którą system złapał
> ## własną regułą.** Powtórzone odroczenie nie jest zaniedbaniem do wyrzucenia sobie —
> ## jest **czujnikiem, który zadziałał.**

#### LICZBA MIERZYŁA REGUŁĘ, NIE STRONĘ

Cztery reguły rdzeniowania na jednym materiale dały **69 · 49 · 47 · 39**.

> ## **LICZBA WCHODZI DO DOKUMENTU WYŁĄCZNIE Z REGUŁĄ WYPISANĄ OBOK I ZE ŚLEPOTĄ
> ## NAZWANĄ PRZY NIEJ.** Bez tego mierzy narzędzie i podaje się za pomiar świata.

#### PRZYCZYNY PROSTE SPRAWDZA SIĘ PRZED WYRAFINOWANYMI

Wielkość liter · białe znaki · kodowanie · flagi wyrażenia regularnego · szyk wyrazów.

> ## **IM DŁUŻEJ ROZWAŻANA BYŁA PRZYCZYNA ZŁOŻONA, TYM TRUDNIEJSZY POWRÓT DO PROSTEJ** —
> ## hipoteza wyrafinowana zajmuje miejsce, na którym stałaby banalna.

**I zapis o zerze, wyprowadzony z tego samego dnia:**
> ## **ZERO BEZ KONTROLI POZYTYWNEJ JEST ZEREM NARZĘDZIA, NIE WYNIKIEM.**
> Pomiar „0 nazw kanonicznych małą literą" wolno było ogłosić **dopiero** dlatego,
> że ta sama komenda znajdowała opisową „bazę kontaktów" małą literą w trzech miejscach.

---

### Blok zlecony w TOR9/026 — pięć zapisów

#### WERDYKT SPRAWDZIANU OBOWIĄZUJE W JEGO ZADEKLAROWANEJ DZIEDZINIE; POZA NIĄ NIE MA WERDYKTU, JEST MILCZENIE

> ## Kolumna **„spełnia"** bez wypisanych wyłączeń **staje się kolumną „czyste"
> ## w pierwszym cytowaniu.** Nie w drugim, nie po miesiącu — w pierwszym.

Pomiar: sprawdzian warunku §168 orzekł „spełnia" o `D-1` i `D-2` — czyli o **sprawie,
dla której ten warunek powstał**. Orzekł **dobrze**: pokrycie `Cennik.tabela.zakres`
jest prozą, a proza była zadeklarowanym wyłączeniem `W1`. **Werdykt był prawdziwy
w swojej dziedzinie i pusty poza nią.**

**Forma wymuszająca:** nazwa kolumny niesie dziedzinę.
Nie „SPEŁNIAJĄ", tylko **„SPEŁNIAJĄ w warstwie klucz↔klucz"**.

#### LICZEBNOŚĆ STRAŻNIK BIERZE Z PLIKU ŹRÓDŁOWEGO, NIE Z RĘKI

*(wymóg projektowy dla wszystkich przyszłych strażników liczebności)*

> ## **LISTA WYPISANA RĘCZNIE STARZEJE SIĘ W MIEJSCU JAK KAŻDY LICZNIK.**

Pomiar: `e2e/cennik.spec.ts` wymienia **dziesięć** etykiet tabeli literałem;
`Cennik.tabela.*` ma **czternaście** kluczy. Poza strażnikiem: `zakres`, `caption`,
`wPlanie`, `pozaPlanem`. **Trzecie wystąpienie tej klasy w torze** (po `toHaveCount(6)`
przy siedmiu parach obaw) — **do wejścia przyszłej mapy klas → strażników.**

#### RÓŻNICA LICENCJONOWANA WYGLĄDA IDENTYCZNIE JAK DEFEKT I JEST JEGO PRZECIWIEŃSTWEM

> ## **UJEDNOLICENIE „BO SIĘ RÓŻNI" ZEPSUŁOBY ZGODNOŚĆ, NIE NAPRAWIŁO JEJ.**

Pomiar: słownik licencjonuje skrót „Pieczęć/Seal/Siegel" na kafelku. PL i DE z licencji
korzystają, EN nie. **Oba stany są poprawne.** Ten zapis jest **szczepionką przeciw
przyszłemu „porządkowaniu"** — bo porządkujący zobaczy trzy języki mówiące inaczej
i uzna, że znalazł defekt.

#### KLASA OPISANA NIE JEST KLASĄ UNIKANĄ — OPIS I ODRUCH TO DWA RÓŻNE STANY WIEDZY

Pomiar: dopasowanie napisane pod szyk polski (kwalifikator **za** głową) puszczone
na trzy języki — **pięć sekcji po tym, jak tę samą klasę opisałem przy przebiegu 2.**
W angielskim kwalifikator stoi **przed** głową, więc „Ethical Seal" wyszło jako skrót
i wyglądało na najciekawsze znalezisko sekcji.

> **To domyka DOMKNIĘCIE KANONU od strony praktycznej: „kto właśnie opisał klasę,
> jest bardziej narażony" nie jest przestrogą moralną — jest opisem tego, że opis
> zapisuje się w innym miejscu niż odruch, a kod pisze odruch.**

#### TEST ARTEFAKTU RATUNKOWEGO DRUKUJE TOŻSAMOŚĆ PRZEDMIOTU, NIE SAM WERDYKT

> ## **„OK" BEZ IDENTYFIKATORA POTWIERDZA ISTNIENIE CZEGOKOLWIEK, NIE TEGO.**
> Test drukuje **czubek i liczność** — inaczej potwierdza sam siebie.

Pomiar: `cp` nie wykonał się (zła ścieżka bazowa), łańcuch poszedł dalej i wypisał
„odtworzenie do PUSTEGO: OK" — **na poprzednim bundlu**. Widoczne wyłącznie dlatego,
że obok „OK" stał czubek `9a15f26` zamiast `6ec17d2` i licznik sekcji `0` zamiast `2`.

**RODZINA — wspólny wpis, cztery odsłony w trzy doby:**

| # | komenda | co raportowała | co było prawdą |
|---|---|---|---|
| 1 | `git status` | brak zmian | **nie jest dowodem przywrócenia** — potrzebna suma SHA |
| 2 | `git checkout --` | przywrócono | brało **z indeksu**, nie z `HEAD` |
| 3 | `git bundle verify` | „records a complete history" | na klonie **płytkim** — do pustego repo nie wchodzi |
| 4 | łańcuch `cp && test` | „odtworzenie: OK" | `cp` nie wykonał się; test poszedł na **starym** pliku |

> ## **KOMENDA RAPORTUJE SUKCES SWOJEJ OPERACJI, NIE OSIĄGNIĘCIE TWOJEGO CELU.**
> ## Między jednym a drugim mieści się cała ta rodzina.
