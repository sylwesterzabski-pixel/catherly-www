# TOR 9 — USTALENIA NIEZALEŻNE OD BRZMIENIA

> **Zmierzyłem wprost i pozytywnie mniej niż 3% twierdzeń serwisu.**
> Wszystko powyżej tego progu w tym dokumencie jest albo pomiarem **formalnym**
> (długość ciągu, obecność strażnika, zieleń bramki), albo raportem agenta,
> którego nie odtworzyłem. Zdanie stoi na początku, nie na końcu, bo na końcu
> czyta się je jako skromność, a na początku jako zakres.
> *(rozstrzygnięcie właściciela 2026-08-21)*

**Data:** 2026-08-20
**Commit strony, na którym pracowano:** `d9a01d7` (gałąź `faza-4/podstrony`)
**Status:** USTALENIA — nie są to propozycje treści. Każda pozycja poniżej stoi
niezależnie od tego, czy jakakolwiek propozycja redakcyjna zostanie przyjęta.
**Propozycje treści:** NIE WCHODZĄ do tego dokumentu. Synteza rundy pierwszej
została obalona przez adwersarzy (53 zarzuty, 25 nieodpartych) i nie jest przedstawiana.

---

## 0. PODSTAWA METODY — dlaczego jednostką pracy jest sześć tras, nie jedna

Trasa `/` nie jest redakcyjnie samodzielna. Szesnaście ciągów treści jest
współdzielonych między sześcioma trasami panelu — ten sam ciąg renderuje się
w kilku miejscach naraz, jako świadoma decyzja (D-D9,
`docs/faza-4/tresci-etap-d-po-panelach.md:1044`: *„każde przeredagowanie tworzy
CZWARTY wariant tej samej obietnicy"*).

Skutek: **redakcja `/` w oderwaniu od podstron jest technicznie niewykonalna.**
Zmiana nagłówka filaru na stronie głównej jest jednocześnie zmianą H1 podstrony
i H2 indeksu.

Droga tańsza — redakcja samego `/` z zakazem tykania ciągów łańcuchowych —
została odrzucona przez właściciela z uzasadnieniem: zostawia nietkniętą połowę
nieprawd z listy Z-1…Z-24, bo te siedzą w nagłówkach filarów, a nagłówki są
zablokowane łańcuchami. **Tańsza wersja nie jest tą samą pracą.**

---

## 1. MAPA ŁAŃCUCHÓW VERBATIM — komplet

Metoda: spłaszczenie `src/i18n/messages/pl.json`, grupowanie po wartości,
próg 12 znaków. Wynik zweryfikowany odczytem.
**Ciągów współdzielonych ogółem: 20. Łańcuchów wewnątrz sześciu tras panelu: 16.**

### 1.1 Łańcuchy o wysokim rozgałęzieniu (stałe serwisu)

| ciąg | miejsc | klucze |
|---|---|---|
| „Sprawdź, jak działa" | **8** | `Hero.cta` · `ZamkniecieGlowna.cta` · `FunkcjeIndeks.zamkniecieCta` · `FunkcjePozyskiwanie.zamkniecieCta` · `FunkcjeTresci.zamkniecieCta` · `FunkcjeZespol.zamkniecieCta` · `FunkcjeWyniki.zamkniecieCta` · `DlaKogo.cta` *(poza panelem)* |
| „Wszystko powyżej działa od planu Starter." | **8** | `FunkcjeIndeks.f8_1` · `FunkcjePozyskiwanie.f8_1` · `FunkcjeTresci.f8_1` · `FunkcjeZespol.f8_1` · `FunkcjeWyniki.f8_1` · `DlaKogo.s1_plan`, `s2_plan_1`, `s3_plan_1` *(poza)* |
| „Rezygnujesz w każdej chwili." | **7** | `ZamkniecieGlowna.zdanie` · `FunkcjeIndeks.zamkniecieZdanie` · `FunkcjePozyskiwanie.zamkniecieZdanie` · `FunkcjeTresci.zamkniecieZdanie` · `FunkcjeZespol.zamkniecieZdanie` · `FunkcjeWyniki.zamkniecieZdanie` · `DlaKogo.ctaZdanie` *(poza)* |
| „Zobacz cennik" | **6** | `*.f8link` ×5 · `DlaKogo.cennikLink` *(poza)* |
| „Na tej stronie" | **5** | `FunkcjePozyskiwanie/Tresci/Zespol/Wyniki.spisEtykieta` · `DlaKogo.spisEtykieta` — **poprawione 2026-08-21 (§109): `FunkcjeIndeks.spisEtykieta` NIE ISTNIEJE** |
| „Jesteś tutaj" | **4** | `FunkcjePozyskiwanie/Tresci/Zespol/Wyniki.okruszkiAria` — **poprawione 2026-08-21 (§109): `FunkcjeIndeks` i `DlaKogo` NIE MAJĄ tego klucza** |

### 1.2 Łańcuchy filarowe — kręgosłup D-D9

| ciąg | miejsc | klucze |
|---|---|---|
| „Rano widzisz, do kogo się odezwać." | **3** | `Filary.filar1.naglowek` = `FunkcjeIndeks.blok1Naglowek` = `FunkcjePozyskiwanie.naglowek` |
| „Masz plan działania i bazę, która rośnie…" | 2 | `Filary.filar1.korzysc` = `FunkcjePozyskiwanie.zdanie` |
| „Piszesz. Tarcza sprawdza. Pieczęć potwierdza." | 2 | `Filary.filar2.naglowek` = `FunkcjeTresci.naglowek` |
| „Studio uczy się twojego głosu i pilnuje…" | 2 | `Filary.filar2.korzysc` = `FunkcjeTresci.zdanie` |
| „Nowa osoba wie, co robić od pierwszego dnia" | 2 | `Filary.filar3.naglowek` = `FunkcjeZespol.naglowek` |
| „Zamiast tłumaczyć od nowa każdemu…" | 2 | `Filary.filar3.korzysc` = `FunkcjeZespol.zdanie` |
| „Widzisz wzrost nawet po trudnym dniu" | 2 | `Filary.filar4.naglowek` = `FunkcjeWyniki.naglowek` |
| „Pulpit pokazuje dzisiejszy stan…" | 2 | `Filary.filar4.korzysc` = `FunkcjeWyniki.zdanie` |

### 1.3 Łańcuchy pozycji kierunku i planów

| ciąg | miejsc |
|---|---|
| „Asystenta AI nie dostajesz w żadnym planie." | 3 (`FunkcjeIndeks.f8_2`, `FunkcjePozyskiwanie.f8_2`, `FunkcjeTresci.f8_2`) |
| „W planie Growth widzisz sygnały ryzyka odejścia…" | 3 (`FunkcjeZespol.f8_2`, `FunkcjeWyniki.f8_2`, `DlaKogo.s2_plan_2` *poza*) |
| „W planie Growth masz widok całego drzewa struktury." | 2 (`FunkcjeZespol.f8_3`, `DlaKogo.s3_plan_2` *poza*) |

### 1.4 Łańcuchy `/` ↔ `/cennik` (jedna noga poza panelem)

| ciąg | klucze |
|---|---|
| „Dane przechowywane w UE" | `Hero.potwierdzenieUE` · `Cennik.potwierdzenie3` |
| „Rezygnacja w każdej chwili" | `Hero.potwierdzenieRezygnacja` · `Cennik.potwierdzenie1` |

### 1.5 ZASADA WIĄŻĄCA DLA AUTORÓW RUNDY DRUGIEJ

> Zmiana ciągu łańcuchowego jest zmianą we **wszystkich** jego miejscach naraz
> i musi być oceniona we **wszystkich** kontekstach naraz.
> Zdanie, które działa na `/` i nie działa jako H1 podstrony, jest **odrzucone**.
> Mapa z sekcji 1 idzie do fundamentu A0 i do każdego autora **przed pierwszym zdaniem**.

---

## 2. OGRANICZENIA KODU — twarde wejście dla autorów

### 2.1 Typ krotki — jedyny w komponentach sześciu tras

`src/components/Filar.tsx:20`
```
konkrety: readonly [string, string, string];
```
**Dokładnie trzy konkrety.** Czwarty konkret dla któregokolwiek filaru wywala
build na `TS2322`, zanim ruszy jakikolwiek test. Autor proponujący czwarty
konkret proponuje **zmianę kodu, nie treści** (dodatkowo `src/app/[locale]/page.tsx:84-88`
przekazuje sztywną trójkę `t()` dla wszystkich czterech filarów).

Sprawdzone i **bez ograniczenia krotkowego**: `ModulFunkcji`, `PasekPotwierdzen`,
`SekcjaRytmu`, `Faq`, `SpisTresci`, `PrzejsciaFilarow`, `Okruszki`,
`NaglowekPodstrony`, `SekcjaKierunku`, `Zamkniecie`, `SekcjaTekstowa` — wszystkie
przyjmują `readonly X[]`.

### 2.2 Limity liczbowe egzekwowane przez strażników

| strażnik | limit | czego dotyczy |
|---|---|---|
| `e2e/hero.spec.ts:38` | `h1` = 1 | jeden H1 na stronie |
| `e2e/hero.spec.ts:59` | listitem = **2** | pasek potwierdzeń pod hero |
| `e2e/filary.spec.ts:41` | `main h2` = **10** | liczba sekcji na `/` |
| `e2e/filary.spec.ts:55` | listitem = **3** | konkrety w każdym filarze |
| `e2e/zlozenie.spec.ts:170` | listitem = **3** | kroki rytmu dnia |
| `e2e/zlozenie.spec.ts:194` | wiersze = **3** | plany w cenniku w skrócie |
| `e2e/zlozenie.spec.ts:226` | `details` = **6** | pary obaw |
| `e2e/funkcje-indeks.spec.ts:463` | `main h2` = **4**, `main h3` = **0** | struktura `/funkcje` |
| `e2e/funkcje-pozyskiwanie.spec.ts:337` | `main > section` = **15** | struktura podstrony wzorcowej |

### 2.3 `PasekPotwierdzen` — nie filtruje pustych pozycji

`src/components/PasekPotwierdzen.tsx:23-25` mapuje całą tablicę bez filtra.
`src/components/Hero.tsx:37` przekazuje tablicę **dwóch** pozycji.
Skutek: „luka celowa" w pasku potwierdzeń nie zwija paska do jednej pozycji —
daje pusty `<li>` albo błąd `next-intl`, i **zapala `e2e/hero.spec.ts:59`**.

Komponent jest **współdzielony z `/cennik`** (własny komentarz: „K9 jest reużywany").

### 2.4 Weryfikacja: czy fałszywe twierdzenie syntezy o kodzie było jedyne

Synteza rundy pierwszej postawiła **jedno** twierdzenie o kodzie —
„przy pustym slocie pasek renderuje jedną [pozycję]" — i było **nieprawdziwe**
(sekcja 2.3). Innych twierdzeń o kodzie nie postawiła. Pozostałe jej ustalenia
pomiarowe sprawdzone i **zgodne co do znaku**: H1 44 zn, podtytuł 141 zn,
wariant zapasowy 70 zn.

---

## 3. WEZWANIA DO DZIAŁANIA — audyt celu

Pytanie właściciela: ile wezwań obiecuje czynność, której `/login` dziś nie umożliwia.

`/login` mówi ×3 języki:
- PL: „Logowanie będzie dostępne przy premierze aplikacji."
- EN: „Log-in will be available when the app launches."
- DE: „Die Anmeldung ist verfügbar, sobald die App startet."

| trasa | cel wezwania zamknięcia |
|---|---|
| `/` | `/funkcje` — nawigacja, bezpieczne |
| `/funkcje` | **`/login`** |
| `/funkcje/pozyskiwanie` | **`/login`** |
| `/funkcje/tresci` | **`/login`** |
| `/funkcje/zespol` | **`/login`** |
| `/funkcje/wyniki` | **`/login`** |
| `/cennik` | **`/login`** |
| `/dla-kogo` | **`/login`** |

**Siedem wezwań z ośmiu prowadzi na stronę, która mówi, że nic jeszcze nie działa.**
×3 języki = **21 wezwań**. Na pięciu z siedmiu etykieta brzmi „Sprawdź, jak działa" —
czyli zaprasza do sprawdzenia działania i ląduje na komunikacie o niedziałaniu.

To nie jest jedno zdanie do poprawy. To jest **stan przedpremierowy całego serwisu**
i pozycja checklisty premiery (rejestr T7), nie pozycja redakcyjna.

---

## 4. NIEPRAWDY P0 NA TRASIE `/`

### P0-1 — zamknięcie obiecuje start, którego nie ma
Propozycja „Zaczynasz, kiedy będziesz gotowa." jest **nieprawdziwa wobec własnego
serwisu**: `/login` mówi, że logowanie będzie dostępne dopiero przy premierze.
Nikt dziś nie zaczyna. Dodatkowo `content/tabela-obietnic.md:164` — „ŻADNA funkcja
rozliczeniowa nie działa end-to-end"; `:171` — „Stripe atrapa".
**Dotyczy też każdego zdania, które sugeruje, że można dziś zacząć.**

### P0-2 — `Obawy.o4` obiecuje wyłączność dostępu bez pokrycia
Dzisiejsze: „Do twojego konta masz dostęp **tylko ty**."
Brak wiersza w tabeli obietnic (`grep` po „konto/koncie" w wierszach obietnic: 0).
Napięcie z `TO:76` i `TO:111` — liderka widzi treści w workflow zatwierdzania,
a `TO:111` mówi wprost „widoczne w czasie rzeczywistym **w całej strukturze**".
Odpowiedź udziela zapewnienia w miejscu, w którym strona ma najmniej dowodów.

### P0-3 — Akademia: „szkolenia" w podtytule hero
`content/tabela-obietnic.md:115` pozwala wyłącznie na: „Akademia z sekwencyjnym
odblokowaniem modułów jest gotowa — treści szkoleniowe dodaje administrator."
`:133-134` — milczenie: „Treści szkoleniowe — baza pusta; można pisać
o infrastrukturze Akademii, **nie o treściach**."
`content/inwentarz-funkcji.md:162` — „Nie ma treści szkoleniowych — infrastruktura
kompletna, baza pusta."

**ROZSTRZYGNIĘCIE WŁAŚCICIELA 2026-08-20:** człon „szkolenia" znika z podtytułu
w całości. Akademia zostaje w S7 z granicą mówiącą prawdę: infrastruktura
sekwencyjnego odblokowywania istnieje, treści dodaje właścicielka konta.
Podtytuł hero po zmianie ma **trzy człony, nie cztery**. Świadoma nieprawda
odrzucona bez dyskusji.

**Ustalenie panelu, które musi wejść do briefu rundy drugiej:** trzy niezależne
brzmienia członu Akademii i trzy warianty syntezy **wszystkie upadły z tego samego
powodu** — opisywały MECHANIZM OTWIERANIA, a mechanizm otwierania presuponuje
zawartość. Czytelniczka nie czyta tego, czego zdanie nie mówi; czyta „jest kurs,
tylko dają go po kawałku". Autorzy sprawdzali, czego zdanie nie mówi — to jest
niewłaściwy test.

---

## 5. MECHANIZM: dlaczego usunięcie brzmienia nie usuwa twierdzenia

Trzy defekty ogłoszone przez syntezę jako usunięte wróciły w innej konstrukcji.
To ta sama klasa błędu, którą repozytorium zna po stronie technicznej:
**naprawa punktowa zostawia rodzinę przy życiu.**

| defekt | usunięte brzmienie | twierdzenie wróciło jako |
|---|---|---|
| **Z-1** odwrócone sprawstwo planu | „DMO układa kolejność rozmów" | „kolejność kroków **jest już ustalona**" — imiesłów bierny ukrywa sprawcę; ten sam odczyt, brak podmiotu do zakwestionowania |
| **Z-6** kreator działa za nią | „kreator robi to za ciebie" / „bez twojej pomocy" | „**Pierwsze 90 Dni prowadzi ją** przez cztery fazy" — podmiotem znowu jest system, choć `TO:112` stawia w podmiocie ją |
| **Z-9** wyłączność dostępu | „Do twojego konta masz dostęp tylko ty" | „**Kontakty prowadzisz w swoim koncie**" — to samo twierdzenie powiedziane słabiej, postawione jako odpowiedź na „Kto jeszcze je widzi?" |

**Wniosek dla rundy drugiej:** kryterium przyjęcia nie może brzmieć „czy zakazane
brzmienie zniknęło". Musi brzmieć: **„czy czytelniczka wyjdzie z tym samym
przekonaniem"**. Bez tego runda druga popełni ten sam błąd trzeci raz.

---

## 6. POZYCJA P-REG — dokumenty prawne, których nie ma

### 6.1 Zakaz odsyłania
Stopka jest zbudowana uczciwie: `src/components/Stopka.tsx:119-127` renderuje
dokumenty jako **tekst, nie link**. Komentarz `:63-66`: „ŻADNYCH linków
do nieistniejących stron (bramka linków; linki wchodzą wraz ze stronami dokumentów)".

**Żadna propozycja nie może odsyłać do regulaminu ani orzekać, co w nim stoi.**
Runda pierwsza zawierała takie odesłanie — odrzucone jako naruszenie krytyczne.

### 6.2 Pełna lista miejsc odsyłających do dokumentów nieistniejących
Pięć wystąpień na **każdej** z ośmiu tras, ×3 języki = **120 wystąpień widocznych**.
Źródło: `src/components/Stopka.tsx:21-26` (`DOKUMENTY`), render `:119-127` i `:131-133`.

| # | element | klucz | PL | EN | DE |
|---|---|---|---|---|---|
| 1 | dokument | `Stopka.dokumentyPozycje.regulamin` | Regulamin | Terms of Service | Nutzungsbedingungen |
| 2 | dokument | `Stopka.dokumentyPozycje.prywatnosc` | Prywatność | Privacy | Datenschutz |
| 3 | dokument | `Stopka.dokumentyPozycje.ciasteczka` | Ciasteczka | Cookies | Cookies |
| 4 | dokument | `Stopka.dokumentyPozycje.przetwarzanieDanych` | Przetwarzanie danych | Data Processing | Auftragsverarbeitung |
| 5 | kontakt | `Stopka.kontakt` + `Stopka.wkrotce` | Kontakt (wkrótce) | Contact (coming soon) | Kontakt (folgt in Kürze) |

Znacznik `Stopka.wkrotce`: `(wkrótce)` / `(coming soon)` / `(folgt in Kürze)`.

**Szóste zdanie przedpremierowe, poza stopką:** `StronaLogowania.tresc` ×3 języki
(pozycja **T7** rejestru).

**Poza stopką — czysto.** Przeszukanie całej warstwy `messages` ×3 języki: zero
odesłań do dokumentów prawnych. Jedyne inne wystąpienie słowa „regulamin"
to `Obawy.p6` („Moja firma ma regulaminy") — mowa o regulaminach jej firmy.

### 6.3 Czego brakuje przed pierwszą płatnością — lista, bez rozstrzygania
Kwalifikacja prawna należy do kogoś innego. Stan faktyczny:

Nie istnieje **żaden** z czterech nazwanych dokumentów — ani jako trasa
(build daje 8 tras treściowych, żadnej prawnej), ani jako plik treści.

| czego brak | stan |
|---|---|
| dane sprzedawcy (nazwa, adres, NIP) | zero trafień w `messages` i `content` |
| informacja o prawie odstąpienia (14 dni) | zero trafień |
| informacja o odnowieniu subskrypcji i anulowaniu | zero — ta sama luka co pozycja 14 rejestru |
| mechanizm zgody na ciasteczka | nie istnieje |

**Odnotowanie na plus:** strona **nie ustawia dziś żadnych ciasteczek** —
`src/i18n/routing.ts:14-16`: `localeDetection: false`, `localeCookie: false`,
komentarz „zero ciasteczek bez potrzeby — ADR-003". Brak banera nie jest
zaniechaniem, tylko konsekwencją braku ciasteczek. Zmieni się to w dniu, w którym
wejdzie płatność albo analityka.

**Zapis bez łagodzenia:** cztery nazwy dokumentów prawnych stoją w stopce
na każdej trasie serwisu, a wezwania siedmiu tras prowadzą w stronę zakupu.
To pozycja premierowa, nie redakcyjna.

---

## 7. PUNKT DECYZJI S9 — „świętujesz", trzy warianty

### Stan faktyczny
`content/pl/filary.md:106-108` **sankcjonuje** sformułowanie („mandat świętowania
z tej mini-sekcji"), status pliku: OBOWIĄZUJE, DECYZJA właściciela 2026-08-09.
Ale mandat pochodzi z `docs/faza-2/panel-filary.md:52-55`, gdzie opierał się
na **dwóch** funkcjach: *„operuje na pokrytym: Wall of Proof, **Ściana sukcesów** —
przestrzeń na świętowanie"*. **DECYZJA 10** (`filary.md:110-119`) później
wyprosiła Ścianę sukcesów z tej sekcji.

Czasownik „świętujesz" jest czasownikiem wiersza wyproszonej funkcji —
`TO:147`: „Rejestrujesz i **świętujesz** sukcesy swoje i zespołu".
Wiersz Wall of Proof (`TO:149`) mówi wyłącznie „Zbierasz dowody swojej pracy".

**Kluczowa różnica między trasami:** `/funkcje/wyniki` (`mod6_poco`,
`content/pl/funkcje-wyniki.md:93`) niesie to samo zdanie **z kotwicą, której `/` nie ma** —
„Wall of Proof — **osobistej osi czasu sukcesów**". Tam „świętujesz" ma poprzednik.
Na `/` z kondensacji wypadło słowo „sukcesów" i predykat zawisł.
`funkcje-wyniki.md:97` domyka to jawnie: „wspólne świętowanie ma swoje miejsce
na Ścianie sukcesów" — czyli podstrona rozdziela świętowanie osobiste od wspólnego
i jest wewnętrznie spójna.

### Warianty

| | wariant | co robi | koszt |
|---|---|---|---|
| **A** | ZOSTAJE WSZĘDZIE bez zmian | `/` i `/funkcje/wyniki` bez ruchu | Zero pracy. Na `/` predykat wisi bez poprzednika i wróci przy każdym przyszłym adwersarzu. Zostaje nieaktualne odniesienie w `filary.md:106` („w. 146" — dziś Wall of Proof stoi w 149, a 147 to Ściana sukcesów) |
| **B** | ZNIKA WSZĘDZIE | usunięcie z `/` oraz z `mod6_poco` i `mod6_nie`, ×3 języki | Najdroższy. Uchyla sankcję na dwóch trasach, zabiera modułowi jedyny ładunek emocjonalny, a `mod6_nie` **traci sens** — ta granica istnieje wyłącznie po to, by oddzielić świętowanie wspólne od osobistego. Zmienia trasę, której panel nie przeszedł |
| **C** | UJEDNOLICENIE — przywrócenie kotwicy na `/` | `/funkcje/wyniki` bez zmian; na `/` wraca poprzednik „sukcesów" | Najtańszy w prawdzie, średni w procesie: nowa sankcja dla brzmienia `/`, ale dotyka jednej trasy i **usuwa rozjazd zamiast go tworzyć**. Wymaga poprawienia numeru wiersza w `filary.md:106` |

**Rekomendacja: C.** Jako jedyny opisuje to, co się faktycznie stało: nikt nie
napisał nieprawdy — z kondensacji na stronę główną wypadło słowo, które trzymało
resztę zdania. Wariant B karze podstronę za defekt strony głównej.

---

## 8. POZYCJA T1 — teza wiersza rejestru jest nieprawdziwa wobec dzisiejszego builda

`docs/faza-2/rejestr-warunkow-powrotu.md`, wiersz **T1**, twierdzi:
> „`next-intl` serializuje KOMPLET komunikatów do ładunku każdej strony"

**Pomiar na artefakcie builda `.next/server/app/pl.html`:**

| szukany ciąg | wystąpień |
|---|---|
| „Puls zespołu" | **0** |
| „Logowanie będzie dostępne przy premierze aplikacji." (`StronaLogowania.tresc`) | **0** |
| „FunkcjeZespol" (nazwa przestrzeni) | **0** |
| „Drzewo struktury" | **0** |
| „Paszport zgodności" (kontrola pozytywna — jest legalnie na `/`) | 1 |

`src/app/[locale]/layout.tsx` **nie montuje** `NextIntlClientProvider`; wszystkie
komponenty są serwerowe.

**Wiersz T1 należy sprostować.** Jego dzisiejsze brzmienie usypia dokładnie
w tym miejscu: sugeruje, że każda strona niesie komplet obcych przestrzeni,
więc strażnik milczenia musiałby obchodzić przeciek, którego nie ma.

---

## 9. DRYF DEKLAROWANYCH DŁUGOŚCI ZNAKÓW

Liczby znaków w plikach treści są wpisywane ręcznie i nikt ich nie przelicza
po korekcie. Bramka `liczby` tego nie widzi — pilnuje liczb **w treści**,
nie liczb **o treści**.

Sprawdzone jedenaście deklaracji na trasie `/`. Dziewięć zgodnych. Dwie nie:

| klucz | deklarowane | faktyczne | |
|---|---|---|---|
| `Hero.naglowek` | 62 | **58** | −4 |
| `Filary.filar1.naglowek` | 32 | **34** | +2 |

**Rozjazd w H1 daje się zrekonstruować co do znaku.** Panel wybrał Pakiet A:
„…kontakty i **rozliczenia**." i podał 63 zn — **prawda**. Korekta A2 zamieniła
„rozliczenia" na „wyniki", czyli **−5 znaków**. Deklarację zmniejszono o **jeden**
(63 → 62). Powinno być 58.

**Znaczenie:** przez cały panel punktem odniesienia było „dziś 62 znaki".
Linia bazowa to 58. Wobec zmierzonego progu trzech linii (≈50 zn na 390 px)
dzisiejszy H1 przekracza go o osiem znaków, nie o dwanaście.

---

## 10. LUKA STRAŻNIKA MILCZENIA NA `/` I `/cennik`

**Potwierdzone gremem:** asercja negatywna (`not.toContain`) istnieje w **dokładnie
czterech** plikach — `funkcje-indeks.spec.ts:406`, `funkcje-podstrony.spec.ts:357`,
`dla-kogo.spec.ts:386`, `funkcje-pozyskiwanie.spec.ts:316`.
**`/` i `/cennik` nie mają żadnej listy fraz milczenia.**

Skan dzisiejszej treści (dwa niezależne przebiegi — agent rejestrowy i orkiestrator):

| trasa | trafień z 58 fraz | które |
|---|---|---|
| `/` `/en` `/de` | **0** | — |
| `/pl/cennik` | 2 | `puls zespołu`, `rozliczenia` |
| `/en/cennik` | 1 | `team pulse` |
| `/de/cennik` | 1 | `team-puls` |

Trzy trafienia na `/cennik` to **treść legalna**: `Cennik.okresLegenda` = „Okres
rozliczenia" (etykieta okresu płatności, nie filar 5) oraz karta Growth
i wiersz tabeli (pozycja 11 rejestru).

### Warunek konstrukcyjny (rozstrzygnięcie właściciela)
**Lista dla `/cennik` MUSI BYĆ PER JĘZYK.** Jedna wspólna lista 58 fraz zapaliłaby
się pierwszego dnia na trzech frazach legalnych, a strażnik fałszywie alarmujący
**uczy wyłączania bramek**. Wykreślenie tych trzech fraz z listy globalnej
rozbroiłoby je równocześnie na `/`.

### Kryterium przyjęcia
1. Strażnik **milczy** na dzisiejszym `/cennik` ×3 języki.
2. Strażnik **zapala się** na frazie z listy wstawionej do dowolnej sekcji.
   Próba wzorcowa: `rozliczenia` w `Hero.podtytul` → czerwień na `/` (pl),
   zieleń na `/en` i `/de` (dowód, że lista działa per literał, nie per przekład).
   Symulacja na artefakcie builda wykonana: mechanizm łapie.

### Trzy wektory cichego wygaśnięcia (CLAUDE.md)
1. **Rozerwanie frazy znacznikiem lub encją** — `not.toContain("puls zespołu")`
   nie widzi `<em>Puls</em> zespołu` ani `Puls&nbsp;zespołu`.
2. **Strażnik zgadniętego brzmienia** — repozytorium samo to nazywa
   (`zlecenie-Z7.md:14-18`): „strażnik oparty na zgadniętym brzmieniu to strażnik pozorny".
3. **Efekt odwrotny na elemencie współdzielonym** — dopisanie do `MAPA_STOPKI`
   etykiety z którymkolwiek literałem zapali naraz sześć strażników.

Środek: asercja **podwójna** — na surowym ciele i na tekście znormalizowanym.
Wektor 2 zamyka wyłącznie odpowiedź na Z7; kodem się go nie zamknie.

### Luki językowe — werdykty
| zgłoszenie | werdykt | dowód |
|---|---|---|
| „import wyciągu" bez DE | **POTWIERDZONE** | `zlecenie-Z7.md:80` — wiersz z **myślnikiem** w kolumnie DE |
| „integracje z kontami social" bez EN i DE | **POTWIERDZONE** | literał PL samotnie w trzech plikach; pozycja **w ogóle nie trafiła** do zlecenia Z7 |
| literały EN/DE = przekład zachowawczy | **POTWIERDZONE** | `dla-kogo.spec.ts:102`, `funkcje-indeks.spec.ts:151-152`, `funkcje-podstrony.spec.ts:139-142`, `:183-185`. Zlecenie Z7 istnieje i **nie ma odpowiedzi w repozytorium** |

**Luki dodatkowe, nieodkryte wcześniej:**
- **Pokrycie per język:** 58 literałów pokrywa 28 pojęć. `pl` **28/28** ·
  `en` **27/28** · `de` **26/28**. `/de` jest chronione w 26 z 28 obszarów,
  a lista wygląda na kompletną.
- **Sześć par EN/DE nigdy nie zgłoszonych do weryfikacji:** `structure report`/
  `strukturbericht`, `sponsor report`/`sponsorbericht`, `team league`/`team-liga`,
  `quiz`, `benchmark`, `magic wrapped`.
- **Odmiana polska omija dopasowanie po podciągu.** Asercja to `not.toContain`
  na literale **mianownikowym**. „sekwencji kontaktowych", „importu wyciągu",
  „pulsu zespołu", „rozkładu dochodów", „uczciwego lustra", „partnera biegu" —
  **żadna nie zapali czerwieni**.
- **`team-puls` (DE) trafi tylko w pisownię z dywizem;** `Team Puls` przejdzie.

---

## 11. TWIERDZENIA ROZSTRZYGANE W TYM PANELU, ŻYJĄCE POZA SZEŚCIOMA TRASAMI

`/cennik` i `/dla-kogo` są **poza** panelem — nie zmieniamy ich teraz.
Poniższe idzie jako wsad do ich panelu, żeby nie powstał rozjazd między panelami.

| twierdzenie | gdzie poza panelem | status w tym panelu |
|---|---|---|
| „DMO — Dzienny Plan Działania, **który mówi, co dziś zrobić**" | `Cennik.plany.starter.pozycja2`, `content/pl/cennik.md:34` | **odwrócone sprawstwo** — `TO:42` mówi „**Planujesz** dzień". Nieprawda już dziś, niezależnie od panelu |
| „Eksportujesz kontakty do vCard, pobierasz CSV z rejestrem — **wszystko jest twoje**." | `Cennik.faq.o4` | kwantyfikator bez pokrycia — eksport nie obejmuje projektów Studia ani postów |
| „Eksport danych **zawsze**: vCard i CSV" | `Cennik.potwierdzenie2` | kwantyfikator w napięciu z `TO:12-13` (bez aktywnej subskrypcji żadna funkcja API niedostępna) |
| „Rezygnujesz kiedy chcesz. **Nie musisz podawać powodu**." | `Cennik.faq.o3` | pozycja **14** rejestru — warunek powrotu niespełniony; fraza zostaje na `/cennik` z wcześniejszej sankcji, ale `content/pl/zamkniecie.md:44-46` przyznaje, że prawdziwość jest **twierdzeniem właściciela, nie dowodem wykonanym** |

---

## 12. KOLIZJA O ZDANIU O BRAKU ZOBOWIĄZANIA

Trzy źródła, sprzeczne, wszystkie obowiązujące:

| źródło | co mówi |
|---|---|
| `content/tabela-obietnic.md` | **ZERO wierszy** o rezygnacji, anulowaniu, wypowiedzeniu (grep: 0 trafień na 271 linii) |
| `docs/STRATEGIA.md:133` (pkt 25) | zamknięcie ma zawierać „Powtórzone główne wezwanie **+ zdanie o braku zobowiązania**" |
| `docs/STRATEGIA.md:129` (pkt 24) | jedna z sześciu obowiązkowych obaw brzmi wprost: „**co gdy zrezygnuję**" |
| `content/karta-tonu.md:87` | naprzeciw fałszywej pilności, w kolumnie „Mówimy": „**zdanie o braku zobowiązania**" |
| `content/pl/zamkniecie.md:17` | zdanie jest **sankcjonowane**: „Zdanie o braku zobowiązania: Rezygnujesz w każdej chwili. *(28 zn)*" |
| `content/pl/zamkniecie.md:44-46` | **ta sama sankcja przyznaje**: prawdziwość jest „**twierdzeniem właściciela**, nie dowodem wykonanym w tym repozytorium" |

### Doprecyzowanie zakresu pozycji 14 rejestru
Pozycja 14 dotyczy **wyłącznie frazy „bez podawania powodu"** — nie frazy
„Rezygnujesz w każdej chwili".

**Zapis wprost, bo brak pozycji rejestru łatwo wziąć za brak problemu:**
„Rezygnujesz w każdej chwili" nie ma **ani wiersza w tabeli obietnic, ani pozycji
w rejestrze warunków powrotu**. Jest więc w sytuacji **GORSZEJ** niż fraza objęta
pozycją 14, nie lepszej — tamta ma przynajmniej zapisany warunek powrotu.

### Zasięg
Fraza „Rezygnujesz w każdej chwili." stoi w **siedmiu** kluczach (sekcja 1.1),
a jej wariant rzeczownikowy „Rezygnacja w każdej chwili" w dwóch (`Hero`, `Cennik`).
Usunięcie z `/` zostawia ją w sześciu innych miejscach.

### Decyzja tymczasowa właściciela (2026-08-20)
Zdanie o braku zobowiązania **nie wchodzi** do propozycji w żadnym z trzech miejsc.
Miejsce w dokumencie zostaje z adnotacją **„czeka na wiersz tabeli obietnic"**.
Werdykt **NIESPRAWDZONE = NIESPEŁNIONE** zostaje w dokumencie **nawet jeśli odczyt
przepływu anulowania wróci pozytywny** — bo zdanie stało na stronie przez tygodnie
bez dowodu i to jest osobna pozycja.

### Zamówienie odczytu (zdjęte z tego toru, przekazane do sesji aplikacji)
Pozycja 14 żąda: weryfikacja przepływu anulowania (czy nie wymusza powodu — dowód)
+ wpis do tabeli obietnic. **Jeden fakt zamyka trzy miejsca naraz** — hero, `o3`
i zamknięcie.

---

## 13. DWADZIEŚCIA TRZY NIEZNANE NAZWY WŁASNE

Policzone przez adwersarza czytającego jako klientka, która nie zna kategorii narzędzi:

Catherly · Dzienny Plan Działania · Studio · Pierwsze 90 Dni · Tarcza ·
Pieczęć Etyczna · kreator wdrożeniowy · Akademia · Twój Wrapped · Świadectwo ·
Pulpit · Wall of Proof · Sala Treningowa · Growth · vCard · CSV · SHA-256 ·
żeton łaski · odznaki · serie · kamienie milowe · drzewo struktury · Paszport zgodności

Werdykt adwersarza: *„Nie znam z tego ani jednej. To nie jest strona, to jest
lista rzeczy do nauczenia się."*

### Rozstrzygnięcia szczegółowe
- **„drzewo struktury" — kontekst tłumaczy.** To **jej** żargon, nie nasz;
  w jej branży mówi się „struktura". Jedyne miejsce, gdzie żargon działa
  na naszą korzyść.
- **„Pulpit" — nazwa przechwycona.** Zna „pulpit" z Windowsa; kontekst ratuje
  funkcję, nie nazwę. ~~Trasa `/` używa dwóch pisowni.~~ **BŁĄD, SPROSTOWANY
  2026-08-20:** na `/` obie instancje są wielką literą (`Filary.filar4.korzysc`,
  `RytmDnia.krok3Tresc`). Pisownia małą literą występuje wyłącznie jako znacznik
  składni linku `<pulpit>…</pulpit>` w `DlaKogo.s2_robi_1` — **poza panelem
  i poza tekstem widocznym**. Rozjazdu pisowni nie ma.
- ~~**„Sala Treningowa"** pada wyłącznie w cenniku w skrócie…~~ **BŁĄD, SPROSTOWANY
  2026-08-20.** Na trasie `/` nazwa **nie pada w ogóle** (0 wystąpień w widocznym HTML).
  `CennikSkrot.tsx:30-56` czyta z przestrzeni `Cennik` jeden klucz (`miesiecznie`).
  Nazwa stoi na `/cennik` (`Cennik.plany.starter.pozycja4`) i na
  `/funkcje/pozyskiwanie` (`FunkcjePozyskiwanie.mod9_*`). Zarzut „sprzedajemy limit
  rzeczy, której ona nie zna" **dotyczy `/cennik`, nie `/`**.
  Źródło błędu: nazwa pochodziła z **propozycji syntezy** dla S11, nie z dzisiejszej treści.
- **Wzorzec do zastosowania:** czynność po polsku, nazwa techniczna w nawiasie —
  „przeniesiesz je do telefonu jednym kliknięciem (vCard)". Do zastosowania
  wszędzie, gdzie pada vCard, CSV, SHA-256.
- **„Akademia" nie ma pozycji w słowniku nazw** — `docs/faza-2/slownik-nazw.md`
  (30 wierszy) nie zawiera hasła, mimo że nazwa jest używana jako własna ×3 języki.
  Zgłoszone w `zlecenie-Z7.md:101,107` (Akademia / Academy / Akademie).

### Nazwy używane na trasie bez pozycji w słowniku (komplet)
Akademia · Kalendarz · vCard · CSV · drzewo struktury · odznaki · serie ·
żetony łaski · Growth · zadanie · plan rozmowy · notatka · konto

Cztery ostatnie figurują w rejestrze warunków powrotu (pozycja 18) jako nazwy
opisowe bez pozycji słownika — z zastrzeżeniem, że **kolumna „Gdzie" pomija `/`**,
choć trasa używa dwóch z nich.

---

## 14. ROZJAZDY W DOKUMENTACH ROZSTRZYGAJĄCYCH

| # | dokument | co jest nie tak |
|---|---|---|
| 1 | `docs/faza-2/panel-naglowek.md:105` | zapisuje DECYZJĘ 3 z podtytułem **ze słowem „rozliczenia"**. `content/pl/naglowek.md:24` niesie późniejszą korektę lustrzaną, która je wycięła. **Protokół jest historią, nie źródłem** — nikt nie może przywrócić rozliczeń powołaniem się na panel |
| 2 | `content/pl/filary.md:106` | powołuje się na „tabela obietnic **w. 146**". Dziś Wall of Proof stoi w **149**, a 147 to Ściana sukcesów. Dokument rozdzielający obie ściany wskazuje cudze wiersze |
| 3 | `docs/faza-2/rejestr-warunkow-powrotu.md` poz. 18 i 20 | kolumna „Gdzie" pomija trasę `/`, choć trasa niesie objęte nimi twierdzenia |
| 4 | `docs/faza-2/raport-zlecen-z1-z4.md:164-168` | dowód „Dane w UE" cytuje `vercel.json:4` → `"regions":["fra1"]` oraz `docs/ODSTEPSTWA.md`, `docs/OPERATIONS.md`, `docs/ZADANIA_RECZNE.md`. **Żaden z tych artefaktów nie istnieje w `catherly-www`**; `vercel.json:4` w tym repozytorium to `"deploymentEnabled": {`. Dowód leży w repozytorium aplikacji — cytowanie *wygląda* na sprawdzalne tutaj |
| 5 | `docs/faza-2/rejestr-warunkow-powrotu.md` wiersz T1 | teza nieprawdziwa wobec dzisiejszego builda (sekcja 8) |

**Ustalenie pochodne, dotyczące twierdzenia z hero:** „Dane przechowywane w UE"
ma pokrycie **mocniejsze** niż zachowawcza odpowiedź `o4` — raport Z4 rozdziela
REGION (**FAKT**, eu-central-1) od SZYFROWANIA (**NIE WIEM**, dashboard-only)
i wprost **odblokowuje** twierdzenie o UE (`:208-210`). Zachowawczość `o4` dotyczy
szyfrowania i dostępu, nie lokalizacji — **sprzeczności nie ma**.
Ale w tym repozytorium twierdzenie ma status **NIEWERYFIKOWALNE**: opiera się
na sankcjonowanym raporcie odczytu, nie na artefakcie sprawdzalnym tutaj.

---

## 15. BRAK, KTÓRY ZATRZYMAŁ PRACĘ, I JAK GO ZAMKNIĘTO

**Lista słów zakazanych z 26.07** („towarzysz, lustro, świadek, asystent, bot,
AI companion") — podana w briefie jako obowiązująca. **Nie istnieje w repozytorium**:
zero trafień w `docs/`, `content/`, ADR-ach, `PLAN.md`, `STRATEGIA.md`, `CLAUDE.md`.

Dowód rozstrzygający: zakaz słowa **„asystent"** wyciąłby wiersz języka kierunku
Anthropic (`content/tabela-obietnic.md:85` i `:53`), czyli **zmieniłby ZAKRES
OBIETNIC, nie brzmienie** — a to jest wprost naruszenie ADR-018. Fraza stoi też
w opublikowanej treści filarów (`content/pl/funkcje-tresci.md:151,153`,
`funkcje-pozyskiwanie.md:24`).

**Rozstrzygnięcie właściciela 2026-08-19: lista UCHYLONA.** Pochodziła
z dokumentów drugiej linii projektu (aplikacja), nigdy nie została przeniesiona
ani zweryfikowana wobec strony; brief podał ją jako obowiązującą przez pomyłkę autora.

**Obowiązuje wyłącznie `content/karta-tonu.md:80` (sekcja 5).**
Kryterium prawdy panelu: tabela obietnic + karta tonu + słownik nazw +
strażniki milczenia w kodzie. Nic ponadto.

*Zapisane w dokumencie celowo — ktoś tę listę kiedyś znowu przyniesie.*

---

## 16. ZAKRES TORU — sprostowanie wobec briefu

| brief zakładał | stan faktyczny |
|---|---|
| trasa `/pomoc` w rejestrze, jako trasa 9 panelu | **NIE ISTNIEJE.** Brak w `ISTNIEJACE_SCIEZKI`, brak pliku, brak w mapie stopki, brak w buildzie. Właściciel uchylił ją 2026-08-15 (E-1: *„Krótkość była cechą, pustka nie jest"*), ADR-014 doprecyzowanie III, rejestr **T8** z potrójnym warunkiem powrotu |
| panel `/pomoc` z Fazy 3 jako wzorzec | panel był w **Fazie 4, Etap E** |

**Zakres obowiązujący: osiem tras treściowych.** Build: `/` · `/funkcje` ·
`/funkcje/{pozyskiwanie,tresci,zespol,wyniki}` · `/cennik` · `/dla-kogo`,
plus `/login` (przekaźnik, ADR-023) i `/nie-znaleziono` (prerender bez adresu).

**Jednostka pracy rundy drugiej: sześć tras** — `/` + `/funkcje` + cztery podstrony
filarów, jeden cykl, ×3 języki.

---

## 17. NARZĘDZIA — stan

**LanguageTool: NIEDOSTĘPNY.** W kontenerze jest Java (`/usr/bin/java`), nie ma
LanguageTool ani w systemie, ani w `package.json`. Decyzja właściciela: **nie pobierać**
(250 MB w efemerycznym kontenerze za jednorazowe sprawdzenie to zły interes).
Hero EN/DE dostarczane ze statusem **NIESPRAWDZONE** przy każdym wariancie, jawnie.
Weryfikacja językowa EN/DE — jedno zlecenie na końcu, dla całości.

**Jasnopis:** po stronie właściciela. Akapity zaznaczane, wyniku nie deklarujemy.

**Kod aplikacji:** niedostępny w tej sesji. Odczyt przepływu anulowania przekazany
do sesji aplikacji, która ma kod lokalnie.

---

## 18. REGUŁY OGÓLNE TORU 9 — ustanowione w rundzie pierwszej

Poniższe nie są kryteriami jednego zadania. Są regułami toru, wywiedzionymi
z błędów, które runda pierwsza popełniła i które adwersarze wykryli.

### R-A — Usunięcie twierdzenia sprawdza się po SKUTKU U ODBIORCY, nie po zniknięciu ciągu

**Powód ustanowienia.** Runda pierwsza ogłosiła usunięcie trzech defektów
(Z-1, Z-6, Z-9) i wszystkie trzy wróciły w innej konstrukcji (sekcja 5).
Kryterium brzmiało „czy zakazane brzmienie zniknęło" i przepuściło te same
twierdzenia trzeci raz.

**Reguła.** Kryterium przyjęcia brzmi: **czy czytelniczka wyjdzie z tym samym
przekonaniem.** Zniknięcie ciągu jest warunkiem koniecznym, nigdy wystarczającym.

**Rodzina błędu.** To jest ta sama klasa, którą repozytorium zna po stronie
technicznej: **narzędzie potwierdza kształt zamiast skutku.** Strażnik zielony,
bo ciąg zniknął; obietnica żywa, bo twierdzenie zostało. Analogia jest dokładna
i celowa — CLAUDE.md opisuje ten sam mechanizm dla asercji na podciągu globalnego
artefaktu („wygasa CICHO, zostając zielona").

### R-B — Przy konflikcie ról ciągu łańcuchowego wygrywa rola na trasie, na której czytelniczka jest DALEJ W DECYZJI

**Powód ustanowienia.** Szesnaście ciągów renderuje się w kilku rolach naraz
(sekcja 1). Ten sam ciąg bywa nagłówkiem sekcji na `/` i H1 podstrony —
a to są **dwa różne obowiązki**: nagłówek sekcji zaprasza, H1 podstrony musi
ustanowić temat całej strony. Bez reguły rozstrzygającej autorzy dostają
wymagania sprzeczne i wybierają arbitralnie.

**Reguła (decyzja właściciela 2026-08-20).** Wygrywa rola na trasie, na której
czytelniczka jest dalej w decyzji. **H1 podstrony czyta ktoś, kto już kliknął —
jego obowiązek informacyjny jest większy niż obowiązek zapraszania na `/`.
Zaproszenie można ponieść zdaniem obok; brak tematu na podstronie zostawia ją
bez kotwicy.**

**Zastosowanie.** Każda karta łańcucha w fundamencie niesie kolumnę „która rola
jest nadrzędna przy konflikcie" z jawnym wynikiem zastosowania tej reguły.

### R-C — Fakt spoza tego repozytorium ma status NIEWERYFIKOWALNY, choćby cytowanie wyglądało na sprawdzalne

**Powód ustanowienia.** Raport Z4 opiera twierdzenie „Dane w UE" na czterech
artefaktach, z których **żaden nie istnieje w `catherly-www`** (sekcja 14, poz. 4).
Cytowanie `vercel.json:4` wygląda na sprawdzalne tutaj i wskazuje inną linię.

**Reguła.** Odnośnik do artefaktu spoza tego repozytorium musi być **oznaczony
jako zewnętrzny**. Twierdzenie oparte wyłącznie na nim ma status NIEWERYFIKOWALNE
w tym repozytorium — niezależnie od tego, jak wiarygodny jest raport odczytu.

**Wzmocnienie niezależne (odnotowane 2026-08-20).** Ta sama klasa błędu —
*odwołanie do stanu, którego nie da się sprawdzić stąd* — została tego samego dnia
zamknięta niezależnie po stronie technicznej w `catherly-www`: skróty commitów
wskazujące na obiekty nieosiągalne z gałęzi. **Dwie linie pracy, jedna rodzina,
wykryta osobno.** Zbieżność wzmacnia regułę, nie duplikuje jej: reguła nie jest
uogólnieniem z jednego przypadku redakcyjnego, tylko opisem wzorca, który
w tym repozytorium występuje w co najmniej dwóch warstwach.


---

## 19. AKADEMIA — STAN ROZSTRZYGNIĘCIA NA 2026-08-20

| element | status |
|---|---|
| **ZAKRES** | **ROZSTRZYGNIĘTY.** Człon „szkolenia" znika z hero w całości. Podtytuł ma **trzy człony, nie cztery**. Akademia żyje w S7 z granicą. Świadoma nieprawda odrzucona bez dyskusji |
| **ROLA** (kto dodaje treści) | **WYCOFANE Z ROZSTRZYGNIĘCIA.** Właściciel podał „właścicielka konta" jako doprecyzowanie językowe, nie wiedząc, że nazwanie roli jest osobną decyzją produktową, że trzy źródła podają trzy różne role, ani że `/funkcje/zespol` milczy celowo |

**Stan bezpieczny do czasu decyzji:** autorzy piszą człon Akademii **bez nazwania
roli**, konstrukcją neutralną — tak jak `content/pl/funkcje-zespol.md:97` dziś.
Uzasadnienie właściciela: *„nie tworzy rozjazdu, którego nie umiem uzasadnić"*.

**Wsad wymagany przed decyzją (zamówiony u fundamentu rundy drugiej):**
1. trzy źródła, trzy role — brzmienie verbatim, plik:linia, **data i tryb powstania**
   (panel? decyzja właściciela? przekład? kopia?), z rozstrzygnięciem: rozjazd
   czy trzy świadome wybory w trzech kontekstach;
2. neutralność na `/funkcje/zespol` — uzasadnienie w protokołach, **a jeśli go nie ma
   nigdzie — jawne stwierdzenie, że neutralność jest zwyczajem, nie decyzją**;
3. kto faktycznie ma uprawnienie w aplikacji — przy braku rozstrzygnięcia w tabeli
   i inwentarzu: status NIEWERYFIKOWALNE i **zamówienie odczytu w torze aplikacji**;
4. koszt trzech wariantów (nazwać wszędzie / milczeć wszędzie / nazwać na jednej
   i milczeć na drugiej): ile miejsc do ruszenia, czy dotyka łańcuchów verbatim.

**Ustalenie panelu wiążące dla autorów:** człon Akademii **nie może opisywać
mechanizmu otwierania**. Trzy niezależne brzmienia autorskie i trzy warianty
syntezy upadły z tego samego powodu — mechanizm otwierania presuponuje zawartość,
a czytelniczka czyta „jest kurs, tylko dają go po kawałku".

---

## 20. DECYZJA WARUNKOWA — neutralność roli przy Akademii

Właściciel podał rozstrzygnięcie **z góry**, zależne od wyniku odczytu, żeby tor
nie czekał na drugą turę.

| gałąź | co obowiązuje |
|---|---|
| **Powód JEST zapisany** w protokołach albo dokumentach fazowych | obowiązuje ten powód. Fundament przynosi go verbatim z plikiem i linią; właściciel rozstrzyga mając go przed oczami |
| **Powodu NIE MA nigdzie** | neutralność staje się **decyzją właścicielską z datą 2026-08-19**, w brzmieniu: *„strona nie nazywa roli osoby dodającej treści do Akademii, dopóki uprawnienie nie jest zweryfikowane w aplikacji i wpisane do tabeli obietnic"*. Zapis z jawną adnotacją: **„stan zastany był zwyczajem; sankcjonowany decyzją 2026-08-19 po ustaleniu braku podstawy"** |

Uzasadnienie właściciela: *„Nie dlatego, że tak było — dlatego, że tak ma być,
i z powodem, który mogę obronić."*

**W obu gałęziach treść nie zmienia się ani o jedno zdanie.** Zmienia się to,
czy stoi na podstawie, czy na przypadku.

---

## 21. AUDYT „ZWYCZAJ CZY DECYZJA" — zadanie otwarte

**Powód powstania.** Jeśli w sprawie roli przy Akademii zwyczaj udawał decyzję,
prawdopodobnie nie jest to jedyne takie miejsce.

**Zakres.** Każde miejsce na sześciu trasach, gdzie treść **celowo czegoś nie mówi**,
w trzech postaciach:
- **neutralność** — konstrukcja unikająca nazwania podmiotu, roli albo sprawcy,
- **milczenie** — funkcja ma wiersz w tabeli obietnic, ale trasa o niej nie mówi,
- **konstrukcja opisowa zamiast nazwy** — np. „kreator wdrożeniowy" małą literą.

**Wynik w trzech kubłach:** DECYZJA (z odnośnikiem plik:linia) · ZWYCZAJ (brak
podstawy) · NIEUSTALONE (nie sprawdzono — wymienione wprost, nie schowane
w „decyzji").

**Produktem zadania jest kubeł ZWYCZAJ.** Każda pozycja z niego idzie do właściciela
— albo zostanie usankcjonowana, albo zmieniona.

**Uzasadnienie właściciela:**
> *„Milczenie, którego nikt nie umie uzasadnić, jest tak samo kruche jak twierdzenie
> bez pokrycia: pierwszy autor, który zapyta «dlaczego tu nic nie ma?», je złamie."*

**Kandydaci na start** (lista otwarta): neutralność roli przy Akademii
(`funkcje-zespol.md:97`) · nieobecność Akademii w S7 na `/` mimo wiersza `TO:115` ·
„kreator wdrożeniowy" opisowo małą literą (`SN:23`) · nieobecność Ściany sukcesów
w S9 · nieobecność nazwy „Formularze & Import" na www (panel F6) · brak nazwy
„Leady" (anglicyzm) · brak Pulsu na `/` mimo **spełnionej** pozycji 11 rejestru.

Wykonywane **przy okazji** sześciu tras, nie jako osobny cykl.

---

## 22. R-D — Narzędzie badające defekt nie może zostawiać drogi, którą ten defekt do niego wejdzie

**Powód ustanowienia.** Audyt „zwyczaj czy decyzja" zaprojektowany o **dwóch**
kubłach (DECYZJA / ZWYCZAJ) zmuszałby badającego do zaokrąglenia pozycji
niesprawdzonej do jednego z nich — w praktyce do DECYZJI, bo brak dowodu na
zwyczaj czyta się jak dowód na decyzję. Narzędzie mające wykrywać zwyczaj
udający decyzję **samo produkowałoby zwyczaj udający decyzję**.

**Reguła.** Każda klasyfikacja budowana w tym torze musi mieć kubeł
**„nie sprawdzono"**. Kubeł niesprawdzonego nie jest brakiem staranności —
jest elementem konstrukcji, bez którego narzędzie kłamie o własnym zasięgu.

**Zastosowania w tym torze:**
- audyt zwyczaj/decyzja → trzeci kubeł **NIEUSTALONE**;
- inwentarz twierdzeń → status **NIEWERYFIKOWALNE** obok PRAWDA / NIEPRAWDA;
- pozycje rejestru → **NIEWERYFIKOWALNE W TYM REPOZYTORIUM** obok
  SPEŁNIONY / NIESPEŁNIONY.

---

## 23. KLASA NIENAZWANA DOTĄD: WARUNEK POWROTU SPEŁNIONY, POWRÓT NIEWYKONANY

**Odkrycie.** Rejestr warunków powrotu pilnuje **jednej strony**: żeby strona
nie mówiła bez pokrycia. **W drugą stronę nie pilnuje niczego.** Pozycja może
zostać odblokowana — klucz aktywowany, panel rozstrzygnięty, bramka domknięta —
i nikt po nią nie wróci. Nie istnieje mechanizm, który by o tym przypomniał.

**Dlaczego to nie jest ciekawostka.** Uzasadnienie właściciela:
> *„Każda pozycja SPEŁNIONY–NIE WRÓCIŁ to obietnica, którą wolno złożyć,
> a strona jej nie składa."*

Pozycje odblokowywano **stopniowo** (Stripe, klucze, panele, bramki),
a przeglądu wstecznego nikt nie wykonał.

**Zadanie (otwarte, wykonywane przy okazji sześciu tras).** Przejść wszystkie
pozycje rejestru i rozdzielić na dwa kubły: **SPEŁNIONY–WRÓCIŁ** /
**SPEŁNIONY–NIE WRÓCIŁ**. Przy każdej pozycji drugiego kubła: czego dotyczy,
na której trasie mogłaby wejść, jakim brzmieniem, co blokowało ją wcześniej.

**Zakres — sprostowanie sprostowania (2026-08-20).** Właściciel podał „24 pozycje
treściowe + T1–T18". Mój pierwszy odczyt dał T1–T10 i zgłosiłem rozjazd.
**Obie liczby były nieaktualne.** Pracowałem na migawce `d9a01d7` (2026-08-16);
gałąź `faza-4/podstrony` została w międzyczasie przepisana (**forced update**)
i jej czubek to dziś `69c2dab` (2026-08-19). Odczyt na aktualnym czubku:
pozycji treściowych **24**, pozycji technicznych **T1–T22**.
**Zakres zadania to 46 pozycji.**

Trzy liczby, trzy momenty w czasie: T10 (16.08, moja migawka) → T18
(17.08, raport właściciela) → T22 (19.08, stan faktyczny). Żadna nie była
błędem — każda opisywała inny stan repozytorium.

**Stan wiedzy z rundy pierwszej** — pozycje o warunku SPEŁNIONYM:

| pozycja | czego dotyczy | czy otwiera treść |
|---|---|---|
| **11** | fraza Pulsu poza kartą Growth — zawsze pełna forma „W planie Growth…" | **TAK — i nie została wykorzystana** |
| 20 | „cyfrowy odcisk SHA-256" na podstronach funkcji | nie — twierdzenie już stoi |
| T3 | pomiar wydajności na preview (7/7 tras zielonych na `26c38f2`) | nie |
| T6 | `bramka:liczby` czyta warstwę `messages` | nie — skutek wyłącznie na przyszłość |

**Jedna pozycja z czterech otwiera treść i nie została wykorzystana.**
Czy jest jedyna — do ustalenia.

---

## 24. PULS NA `/` — pytanie otwarte, świadomie nierozstrzygnięte

**Dlaczego osobno.** Spośród milczeń zebranych w audycie (sekcja 21) to jedyne,
przy którym **warunek jest spełniony**. Pozostałe milczą, bo mówić nie wolno —
i są poprawne z definicji. To milczy, **chociaż wolno**.

**Rozstrzygnięcie właściciela: kierunek badania, nie sam przypadek.**
Fundament ma ustalić fakt, zanim padnie decyzja:

| gałąź | co obowiązuje |
|---|---|
| **Jawne rozstrzygnięcie „Puls nie wchodzi na główną" ISTNIEJE** w protokołach paneli `/` | obowiązuje, sprawa zamknięta; przynieść verbatim z plikiem i linią |
| **NIE ISTNIEJE** | to przeoczenie. Pytanie brzmi: czy Puls ma na `/` miejsce, biorąc pod uwagę, że pełna forma jest długa, a hero i tak traci człon Akademii. Panel dostaje to jako **otwartą pozycję do rozważenia, nie jako polecenie wstawienia** |

**Zakaz zaokrąglania (obie strony).** Brak rozstrzygnięcia nie jest „widocznie
zdecydowano". Istnienie rozstrzygnięcia nie jest „pewnie chodziło o coś innego".

---

## 25. MIGAWKA, NA KTÓREJ PRACOWAŁ PANEL — sprostowanie i skutki

**Fakt.** Cały panel rundy pierwszej przeszedł na migawce `d9a01d7` (2026-08-16).
Gałąź `faza-4/podstrony` została w międzyczasie **przepisana** (`forced update`);
jej dzisiejszy czubek to `69c2dab` (2026-08-19). `d9a01d7` **nie jest przodkiem**
nowego czubka.

**Skutek dla ustaleń panelu: ŻADEN.** Zweryfikowane różnicą drzew:

| obszar | stan między `d9a01d7` a `69c2dab` |
|---|---|
| `content/` (treść ×3 języki, tabela obietnic, inwentarz, karta tonu) | **BEZ ZMIAN** |
| `src/i18n/messages/` (warstwa renderowana ×3 języki) | **BEZ ZMIAN** |
| `docs/faza-2/slownik-nazw.md` | **BEZ ZMIAN** |

Substrat redakcyjny jest **identyczny co do bajtu**. Każde pokrycie, każdy
numer wiersza, każda nieprawda i cała mapa 16 łańcuchów stoją bez rewizji.

**Co się zmieniło:** rejestr warunków powrotu (+12 pozycji, T11–T22), `CLAUDE.md`
(+41 wierszy), bramka kontrastu stanów, linter tokenów, eksperyment kroju pisma,
`globals.css`. Czyli **druga linia pracy — techniczna**, nie redakcyjna.

**Praca toru przeniesiona na aktualny czubek.** Dokument ustaleń stał na historii,
która przestała istnieć — czyli dokładnie w defekcie **T21** rejestru
(„odwołanie do stanu, który przestał istnieć"). Naprawione przez przeniesienie
na `69c2dab`.

### 25.1 Dwie zbieżności z linią techniczną, wykryte niezależnie tego samego dnia

**T21 — bliźniak R-C.** Pozycja rejestru dopisana przez linię techniczną brzmi:
*„Nic nie pilnuje, że skróty commitów w dokumentacji wskazują na commity, które
istnieją. Klasa «odwołanie do stanu, który przestał istnieć»"*.
Reguła **R-C** tego dokumentu (sekcja 18) opisuje tę samą klasę po stronie
redakcyjnej: odnośnik do artefaktu spoza tego repozytorium wygląda na sprawdzalny
i nie jest. **Dwie warstwy, jedna rodzina, nazwane osobno.**

**T12 — bliźniak pomiaru sędziego rzemiosła.** Pozycja rejestru brzmi:
*„`max-width: 24ch` na H1 hero — defekt produkcyjny, nie artefakt eksperymentu.
`ch` to szerokość cyfry zero, więc ta sama liczba wyznacza inną [szerokość]…"*.
Sędzia rzemiosła tego panelu zmierzył **dokładnie ten sam defekt** niezależnie:
przy 390 px `24ch` daje ~426 px przy kolumnie 358 px, więc **miara jest
na telefonie bezczynna** — a `Hero.module.css:23-24` sam odnotowuje, że próba
`22ch → 24ch` „NIE ZADZIAŁAŁA". Panel redakcyjny i linia techniczna doszły do
tego samego wniosku tego samego dnia, z dwóch stron.

**Wniosek metodyczny.** Zbieżność dwóch niezależnych linii pracy na tej samej
klasie defektu jest mocniejszym dowodem niż dwa przykłady wewnątrz jednej linii.
Reguła oparta na jednym przykładzie jest hipotezą; na dwóch warstwach wykrytych
osobno — obserwacją.

### 25.2 Obserwacja metodyczna — nazywanie praktyki, która już działa

**R-D** („narzędzie badające defekt nie może zostawiać drogi, którą ten defekt
do niego wejdzie") była stosowana w tym torze **od pierwszego dnia, bez nazwy**:
status NIEWERYFIKOWALNE w inwentarzu twierdzeń, NIEWERYFIKOWALNE W TYM
REPOZYTORIUM przy pozycjach rejestru, kubeł NIEUSTALONE w audycie.

**Reguła postępowania (właściciel, 2026-08-20):** przy ustanawianiu każdej
kolejnej reguły sprawdzić **najpierw**, czy tor już tak robi. Jeśli tak —
zapisujemy istniejące, nie zmieniamy zachowania. Nazwanie praktyki, która
już działa, jest **tańsze i pewniejsze** niż wprowadzenie nowej: nie trzeba jej
egzekwować, tylko rozpoznać.

---

## 26. BŁĘDY W TYM DOKUMENCIE — sprostowane 2026-08-20

Dokument jest wejściem dla wszystkich autorów, więc błąd w nim propaguje się dalej
niż błąd w treści. Trzy wykryte, wszystkie **jednej klasy: propozycja wzięta
za stan obecny.**

| # | twierdzenie | stan faktyczny | czyj błąd |
|---|---|---|---|
| **B1** | §13: „Sala Treningowa" pada na `/` w cenniku w skrócie i nie jest wyjaśniona | **Na `/` nie pada w ogóle** (0 wystąpień). Nazwa stoi na `/cennik` i `/funkcje/pozyskiwanie`. Pochodziła z **propozycji syntezy** dla S11 | orkiestrator |
| **B2** | §13: trasa `/` używa dwóch pisowni („pulpicie"/„Pulpicie") | **Na `/` obie instancje wielką literą.** Małe „pulpit" to znacznik składni linku w `DlaKogo.s2_robi_1` — poza panelem i poza tekstem widocznym | orkiestrator |
| **B3** | fundament rundy drugiej: `Hero.podtytul` renderowany ma 141 zn, a `naglowek.md:22` deklaruje 107 | **Renderowany ma 107 zn, deklaracja mówi 107 — zgadzają się.** 141 to długość **propozycji syntezy**, nie dzisiejszej treści | fundament rundy drugiej |

**Wniosek metodyczny.** Trzy niezależne pomyłki tej samej klasy w jednym cyklu
oznaczają, że klasa jest systemowa, nie przypadkowa. Materiał propozycji i materiał
stanu obecnego krążą w tym torze **w tych samych dokumentach** i mieszają się,
gdy ktoś cytuje z pamięci zamiast z odczytu.

**Reguła R-E:** każde twierdzenie o **stanie obecnym** wymaga odczytu z warstwy
renderowanej albo z pliku treści — nigdy z dokumentu panelu, protokołu ani
propozycji. Dokumenty panelu opisują, **co ma być**; wyłącznie `content/`
i `src/i18n/messages/` mówią, **co jest**.

---

## 27. P0-4 — `/` OBIECUJE BRAMKĘ, KTÓREJ NIE MA, I PRZECZY WŁASNEJ PODSTRONIE

Znalezione przez fundament rundy drugiej, potwierdzone odczytem warstwy renderowanej.

**Trasa `/`, sekcja S11** (`CennikSkrot.roznica`):
> „Wszystkie plany prowadzą twoje kontakty i wyniki — Growth dodaje do tego
> **widok całego zespołu**."

**Trasa `/funkcje/zespol`, F8** (`FunkcjeZespol.f8_1`), o sześciu modułach zespołu:
> „Wszystko powyżej działa **od planu Starter**."

**Co jest naprawdę bramkowane** (`tabela-obietnic.md:121-122`, `:229-230`):
Puls zespołu (GROWTH) i **drzewo struktury** (GROWTH). **„Widok zespołu" nie jest
bramkowany w żadnym wierszu.** Przeciwnie: `TO:144` stawia „aktywność zespołu"
na Pulpicie bez bramki, a `TO:250` daje Starterowi limit 10 osób w zespole.

**Skutek.** Czytelniczka czyta na stronie głównej, że zobaczenie własnego zespołu
wymaga droższego planu, a jedno kliknięcie dalej — że cała sekcja zespołu działa
od Startera. **Sprzeczność międzytrasowa, oba zdania na trasach tego panelu.**

**Pochodzenie jest zapisane** (`docs/faza-2/projekt-cennik.md:94-97`, cytowane jako
źródło pochodzenia, nie jako stan): *„JEDNA najważniejsza różnica (propozycja:
«Growth dodaje widok całego zespołu» — **Puls + drzewo**, język kierunku)"*.
Czyli: **dwie bramkowane funkcje skondensowano w jedną frazę**, a w kondensacji
zginął i kwalifikator, i prawda.

**Trzy skutki, każdy osobny:**
1. **Kwalifikator zniknął.** Rejestr poz. 11 żąda „**zawsze** pełnej formy
   «W planie Growth…»" poza kartą Growth. „Growth dodaje do tego…" nazywa plan,
   ale **nie jest formą sankcjonowaną**.
2. **Twierdzenie jest nieprawdziwe** — bramkowane jest drzewo struktury, nie widok zespołu.
3. **Puls stracił swoją treść** — sygnały ryzyka odejścia i gotowe zdanie otwierające
   rozmowę, najkonkretniejszy fakt Growth w całej tabeli, zniknęły pod frazą,
   która nic nie znaczy.

**Dlaczego panel rundy pierwszej tego nie złapał:** traktował `roznica` jako
**rozmycie nazwy** („widok całego zespołu" zamiast „drzewo struktury"), czyli wadę
precyzji. To jest **fałszywa bramka**, czyli wada prawdy — i widać ją dopiero
przy czytaniu dwóch tras naraz.

---

## 28. PULS NA `/` — ustalenie faktu

**Rozstrzygnięcia zakazującego NIE MA.** Przeszukane sześć protokołów trasy `/`.
Jedyne wystąpienie tematu — `docs/faza-2/panel-filary.md:21`, tabela dyskwalifikacji K1:
> „❌ «sygnały ryzyka odejścia» **bez** «W planie Growth» — fałszywa obietnica na Starterze"

To dyskwalifikacja **jednego wariantu autorskiego**, a przyczyną jest **brak
kwalifikatora**, nie nieprzydatność tematu. **Kwalifikator dziś istnieje i jest
w użyciu na dwóch trasach panelu.**

**Nota, którą wcześniej wzięto za decyzję** (`content/pl/filary.md:129-130`):
> „Puls/sygnały ryzyka odejścia — nieobecne (wymagałyby «W planie Growth»)."

Stwierdza **stan** i podaje **warunek w trybie przypuszczającym**. Nie mówi
„postanowiono nie umieszczać". **To nota o pokryciu, nie rozstrzygnięcie** —
a spełnienie wskazanego w niej warunku znosi jej podstawę.

**Fundament przeniósł tę pozycję z kubła DECYZJA do kubła ZWYCZAJ** po tym, jak
zażądano od niego brzmienia zamiast odnośnika. **Mechanizm zadziałał:** żądanie
cytatu zamiast wskazania pliku zmieniło klasyfikację.

**Do panelu jako pozycja otwarta, nie polecenie.** Pełna forma ma 95 znaków,
a jedyne miejsce, w którym mogłaby stanąć — S11 — i tak wymaga poprawki z powodu §27.

---

## 29. NEUTRALNOŚĆ ROLI PRZY AKADEMII — POWÓD ISTNIEJE

Gałąź pierwsza decyzji warunkowej (§20) jest **spełniona**. Brzmienie, nie odnośnik:

> `docs/faza-4/odzysk-etap-c/etapC-panele.json:119`:
> „**POPRAWKA granicy: «moduły wypełnia administrator» usunięte** — ten sam odczyt
> i18n **podważa tezę, że treści dodaje wyłącznie administrator** […], a **wersja
> neutralna jest prawdziwa przy każdym rozstrzygnięciu**, trzyma wzorzec
> «Catherly nie [X] — [Y]» i **nie otwiera pytania «kim jest admin?»**."

Sankcja: DECYZJE D-C1…D-C5 właściciela 2026-08-13.
**To uzasadnia, nie tylko odnotowuje** — trzy niezależne racje plus mechanizm domknięcia.
**Neutralność jest DECYZJĄ, nie zwyczajem.**

**Dwie rzeczy, których mimo to nie wolno przemilczeć:**
1. **Warunek zniesienia neutralności nigdy nie został zamówiony.** Panel odłożył rolę
   „do wyjaśnienia zleceniem Z". `zlecenie-Z7.md` powstało **tego samego dnia**
   i **nie zawiera pytania o rolę** — Z7.3 pyta wyłącznie o brzmienie nazwy „Akademia".
   **Odłożenie ogłoszono i nigdy nie zamówiono.**
2. **`/dla-kogo` nazywa rolę w trzech językach**, wstawioną **następnego dnia**
   przez panel Etapu D **dla długości zdania** (`tresci-etap-d-po-panelach.md:814-816`:
   „żeby granica została jednozdaniowa"). Nikt tych dwóch decyzji nie zestawił,
   a link `dla-kogo.md:167` prowadzi z jednej wprost na drugą.

**Mapa ról — werdykt: to ROZJAZD z jednym świadomym wyborem w środku.**
„Administrator" powstał **raz**, w ekstrakcji z inwentarza, i był kopiowany dalej
bez ponownego rozstrzygnięcia. „Liderka" (`architektura-podstron.md:51-52`)
**nie ma żadnego uzasadnienia** i przeczy „administratorowi", choć powstała po nim.
„Lider" (odczyt i18n aplikacji) jest **jedynym źródłem faktycznym** i podważa oba.
**Status uprawnienia: NIEWERYFIKOWALNE** — zamówienie do toru aplikacji.

---

## 30. R-E — KONSEKWENCJA OPERACYJNA (dopisana 2026-08-20)

Trzy pomyłki jednej klasy w jednym dokumencie — dwie orkiestratora, jedna fundamentu —
**to nie jest nieuwaga, tylko właściwość materiału**: propozycje i stan obecny krążą
w tych samych dokumentach.

**Reguła nie może wymagać czujności, bo czujność zawodzi.** To ta sama lekcja, co
„strażnik zamiast dyscypliny".

**Konsekwencja operacyjna:** dokumenty panelu **muszą oznaczać każdy cytat jako
STAN albo PROPOZYCJA już w chwili zapisu**, nie przy odczycie. Cytat bez oznaczenia
jest wadą dokumentu, nie wadą czytelnika.

---

## 31. R-F — W KUBŁACH AUDYTU DOWODEM JEST CYTAT, NIGDY WSKAZANIE

**Powód ustanowienia.** Fundament zaklasyfikował dwie pozycje do kubła DECYZJA
na podstawie **odnośnika**. Po zażądaniu **brzmienia** jedna z nich (Puls,
`filary.md:129-130`) okazała się **notą o pokryciu, nie rozstrzygnięciem** —
i została przeniesiona do kubła ZWYCZAJ.

**Reguła.** Odnośnik mówi, że powód **gdzieś jest**. Brzmienie mówi, czy powód
**uzasadnia** milczenie, czy je tylko **odnotowuje**. To jest dokładnie różnica
między DECYZJĄ a ZWYCZAJEM. W kubłach audytu **dowodem jest cytat, nigdy wskazanie**.

---

## 32. USTALENIE DNIA — ZWYCZAJ PRODUKOWAŁ NIEPRAWDY, A MY LECZYLIŚMY OBJAWY

Trzy pozycje kubła ZWYCZAJ nie są brakami porządkowymi. Są **źródłami defektów,
które ścigaliśmy osobno jako defekty treści**:

| pozycja zwyczaju | defekt, który z niej wyrósł |
|---|---|
| **Z-A8** — sprawstwo planu dnia nienazwane; nikt nie zdecydował, żeby ukryć sprawcę — sprawca **wypadł** | **Z-1** — „DMO układa kolejność rozmów", „w ułożonej kolejności", „Masz plan działania" |
| **Z-A7** — `Obawy.o4` nie wymienia liderki; zachowawczość dotyczyła **architektury danych**, nie widoczności treści | **Z-9** — „Do twojego konta masz dostęp tylko ty" |
| **Z-A2** — Ścianę sukcesów wyproszono z S9 „bo bliżej filarów 3–4", ale **do filarów 3–4 nigdy nie trafiła** | osierocone **„świętujesz"** przy Wall of Proof |

**Trzy rundy panelu leczyły objawy, bo przyczyna leżała piętro wyżej.**

### PRZYPIĘTE DO Z-A8 — do wyjęcia w chwili rozstrzygania (2026-08-21)

> **Przy rozstrzyganiu Z-A8 wyjmij dwa sporne klucze rodziny Z-1 z §148.6:
> `Hero.naglowek` i `Filary.filar2.konkret3`.** Nie należą do piętnastu
> pewnych i nie zostaną wykonane razem z nimi — **zawisną w ciszy**,
> jeśli nikt ich tutaj nie zobaczy. Rodzina jest zawieszona, nie zamknięta.

### Konsekwencja wiążąca panel (decyzja właściciela 2026-08-20)

> Przy **każdej** pozycji z listy Z sprawdza się najpierw, czy ma odpowiednik
> w kubłach **ZWYCZAJ** lub **NIEUSTALONE**. Jeśli ma — **naprawa brzmienia jest
> wtórna, a pierwotna jest decyzja, której zabrakło.** Panel proponuje brzmienie
> **dopiero po** rozstrzygnięciu brakującej decyzji przez właściciela.

Uzasadnienie: inaczej **trzeci raz naprawimy zdanie, którego przyczyna leży wyżej.**

---

## 33. 7 vs 30 — MIARA KOSZTU POPRZEDNIEJ JEDNOSTKI PRACY

| | |
|---|---|
| wystąpień rodzin Z-1, Z-6, Z-9 **na liście Z** | **7** |
| wystąpień **faktycznych na sześciu trasach** | **30** |

**Mechanizm, nie przypadek:** lista Z powstawała przy patrzeniu na **jedną trasę**,
a rodzina defektu żyje na **sześciu**. Lista widziała **mniej niż jedną czwartą**.

**Trzeci dowód tej samej rzeczy tego samego wieczoru**, po mapie łańcuchów verbatim
(6 wykrytych → 16 faktycznych) i po znaleziskach linii technicznej.
**Jednostka pracy była mniejsza niż jednostka materiału** — trzy razy, niezależnie,
z trzech kierunków.

---

## 34. P0-5 — ZDANIE, KTÓRE UNIEWAŻNIA WŁASNĄ GRANICĘ

**`/funkcje/zespol`, jedna przestrzeń komunikatów, cztery sekcje odstępu:**

| klucz | brzmienie | rola |
|---|---|---|
| `FunkcjeZespol.zdanie` | „Zamiast tłumaczyć od nowa każdemu — kreator wdrożeniowy robi to **za ciebie**." | zdanie korzyści, sekcja 1 |
| `FunkcjeZespol.mod3_nie` | „Catherly **nie poprowadzi** nowej osoby **za ciebie** — program daje jej misje i fazy, a rozmowy prowadzisz ty." | granica modułu 3, sekcja 4 |

**Ta sama fraza — „za ciebie" — raz jako obietnica, raz jako zaprzeczenie.**
Klientka przeczyta jedno z dwóch i **oba są oficjalne**. To nie jest kwestia
redakcyjna: **zdanie korzyści unieważnia granicę, która stoi na tej samej stronie.**

**Żaden strażnik tego nie widzi.**

### Skan: czy to jedyna taka para na sześciu trasach — NIE. Są trzy.

**Para 1 — polaryzacja „za ciebie"** (opisana wyżej), `FunkcjeZespol`.

**Para 2 — sprawstwo czasownika „prowadzić", ta sama przestrzeń:**
- `FunkcjeZespol.zdanie` — prowadzi **kreator** („robi to za ciebie")
- `FunkcjeZespol.mod3_poco` — prowadzi **ona**: „**Prowadzisz ją** przez Pierwsze 90 Dni"
- `FunkcjeZespol.mod3_nie` — prowadzi **ona**: „rozmowy prowadzisz ty"
- `tabela-obietnic.md:112` — prowadzi **ona**: „**Prowadzisz** nową osobę przez Pierwsze 90 Dni"
**Dwa moduły i tabela zgadzają się ze sobą; zdanie korzyści przeczy im trzem.**

**Para 3 — atrybucja czasownika „uczyć się", `FunkcjeTresci`:**
- `FunkcjeTresci.zdanie` — uczy się **Studio**
- `FunkcjeTresci.mod8_poco` — uczy się **Catherly**: „**Catherly uczy się** tego stylu z opublikowanych postów"
- `tabela-obietnic.md:79` — uczy się **System**
**Trzy podmioty jednej czynności, dwa z nich na tej samej stronie.**
To dowodzi, że **Z-3 nie jest wadą pokrycia, tylko sprzecznością wewnątrzstronową.**

**Wspólny mechanizm powstania wszystkich trzech: granice pisaliśmy osobno od korzyści.**
Zdanie korzyści powstawało w panelu filarów, granice modułów — w panelu Etapu C,
kilka dni później, przez inny skład. Nikt ich nie zestawił.

### Propozycja bramki — BEZ IMPLEMENTACJI

**Co ma wykrywać:** sprzeczność wewnątrz **jednej przestrzeni komunikatów** —
ten sam czasownik sprawstwa raz twierdząco, raz przecząco, albo przypisany
dwóm różnym podmiotom.

**Szkic mechanizmu.** Dla każdej przestrzeni: wyodrębnić zdania zawierające
czasownik z listy sprawstwa (prowadzić, pisać, publikować, wysyłać, poprawiać,
podpowiadać, uczyć się, układać, przypominać); dla każdego ustalić **podmiot**
i **polaryzację**; zgłosić parę, w której ten sam czasownik ma w jednej przestrzeni
**przeciwną polaryzację przy tym samym dopełnieniu** albo **dwa różne podmioty**.

**Kryterium przyjęcia — obowiązkowe:**
1. **Musi zapalić się na dzisiejszym `/funkcje/zespol`** (para 1 i para 2).
2. **Musi zapalić się na dzisiejszym `/funkcje/tresci`** (para 3).
3. **Musi milczeć** na parach, które są poprawnymi granicami o różnych przedmiotach —
   np. `FunkcjeTresci.mod4_nie` („nie opublikuje posta za ciebie") obok
   `mod7_poco` („Kończysz projekt, a on dostaje Pieczęć") — inne czynności, brak sprzeczności.
   **Bramka fałszywie alarmująca uczy wyłączania bramek.**

**Ograniczenie znane z góry:** skan wykonany na potrzeby tego ustalenia dawał
**przewagę fałszywych trafień** przy prostej heurystyce „rdzeń + «nie» w zdaniu".
Rozróżnienie sprzeczności od poprawnej granicy wymaga ustalenia **przedmiotu**
czynności, nie samego czasownika. To jest trudność projektowa, nie implementacyjna.

---

## 35. DECYZJA DO PODJĘCIA — Z-A7: KTO WIDZI TREŚCI W WORKFLOW ZATWIERDZANIA

**Nie jest to propozycja zdania. Jest to pytanie o zakres obietnicy.**

**Stan.** `Obawy.o4` odpowiada na „Mam dane klientek. Kto jeszcze je widzi?"
zdaniem „Do twojego konta masz dostęp tylko ty." — **bez wiersza w tabeli obietnic**
(grep „konto/koncie" w wierszach obietnic: 0 trafień na 271 linii).

**Dlaczego to przemilczenie nie było decyzją.** `content/pl/obawy.md:8-10` uzasadnia
Parę 4 jako „wersja zachowawcza; **weryfikacja lokalizacji danych i szyfrowania**
zlecona… do tego czasu zero twierdzeń o **architekturze**".
**Zachowawczość dotyczyła architektury danych. Widoczność treści dla liderki
to inne pytanie i nikt go nie zadał.**

**Co mówi tabela obietnic — dwa wiersze, oba w mocy:**
> `TO:76` — „Twoje treści trafiają do zatwierdzenia przez liderkę — śledzisz status
> w czasie rzeczywistym."
> `TO:111` — „Zatwierdzasz treści swojego zespołu — wszystkie zmiany statusu widoczne
> w czasie rzeczywistym **w całej strukturze**."

**Co mówią inne trasy panelu — zgodnie z tabelą, wprost:**
- `FunkcjeZespol.mod2_poco` — „zmianę statusu **od razu widzi cała struktura**"
- `FunkcjeTresci.mod5_poco` — „od tej chwili **jest u twojej liderki**"
- `FunkcjeIndeks.blok2Wprowadzenie` — „wysyłasz **do zatwierdzenia u liderki**"

**Odległość defektu od kontrdowodu: jedno kliknięcie** — `/` → filar 3 →
`/funkcje/zespol#zatwierdzanie-zespolu`.

**Rozróżnienie, bez którego decyzja jest niemożliwa:** obawa 4 dotyczy **danych
klientek** (kontaktów). `TO:76` i `TO:111` dotyczą **treści w workflow zatwierdzania**.
To są dwie różne rzeczy i **żaden wiersz tabeli nie mówi dziś, kto widzi jej kontakty**.

**Do rozstrzygnięcia przez właściciela — trzy pytania, nie jedno:**
1. Czy strona ma **wymienić liderkę** w odpowiedzi na „Kto jeszcze je widzi?" —
   przy pokryciu `TO:76` i `TO:111`?
2. Czy ma **rozdzielić kontakty od treści** w tej odpowiedzi — skoro pytanie jest
   o kontakty, a jedyne pokryte wiersze mówią o treściach?
3. Czy o **kontaktach** wolno dziś powiedzieć cokolwiek — skoro nie ma wiersza?
   Status dzisiejszy tej odpowiedzi to **NIEWERYFIKOWALNE**, nie „zachowawcza".

**Ograniczenie dla każdej odpowiedzi:** zakaz twierdzeń o architekturze
(rejestr poz. 8, 9) pozostaje w mocy i **nie jest tym samym co milczenie o liderce**.

---

## 36. ZAKRES PANELU — SIEDEM TRAS (druga korekta, 2026-08-20)

`Cennik.potwierdzenie1` („Rezygnacja w każdej chwili") i `Cennik.potwierdzenie3`
(„Dane przechowywane w UE") to **drugie nogi łańcuchów** z paska potwierdzeń hero,
a `PasekPotwierdzen` jest **komponentem reużywanym** przez `/` i `/cennik`
(komentarz własny komponentu: „K9 jest reużywany"). **Zmiana na `/` jest technicznie
niemożliwa bez `/cennik`.**

**Zakres: `/` · `/cennik` · `/funkcje` · `/funkcje/{pozyskiwanie,tresci,zespol,wyniki}`.**
`/dla-kogo` zostaje poza panelem, z osobnym wsadem.

**To jest druga korekta zakresu tego samego wieczoru z tej samej przyczyny:
jednostka pracy była mniejsza niż jednostka materiału.**
Pierwsza: jedna trasa → sześć (łańcuchy filarowe). Druga: sześć → siedem (pasek potwierdzeń).

---

# 37. ROZSTRZYGNIĘCIA WŁAŚCICIELA — 2026-08-20, komplet

## 37.1 PULS NA `/` — zostaje, wyłącznie w pełnej formie

**Przeformułowanie sprawy przez właściciela:** ustalony fakt zmienia postać pytania.
Puls **jest już na `/`** i to w postaci nieprawdziwej — więc to nie jest pytanie
„czy wpuścić", tylko **„co zrobić z nieprawdą, która stoi"**.

**DECYZJA.** Puls zostaje na `/`, ale **wyłącznie w pełnej formie „W planie Growth…"**,
wymaganej przez pozycję 11 rejestru. **Wariant skrócony wypada.**

**Powód (verbatim):** *„pozycja 11 dopuszcza Puls pod jednym warunkiem i ten warunek
jest częścią obietnicy, nie ozdobą — bez niego strona sugeruje funkcję dostępną
w każdym planie."*

**Wiążące dla panelu:** jeśli pełna forma (95 zn, `TO:121`) nie mieści się w sekcji,
w której dziś stoi, panel proponuje **inne miejsce albo usunięcie — ale NIE skrót**.

**Skutek dla audytu:** milczenie jako zwyczaj **przestaje być tematem przy tej pozycji**,
bo milczenia nie ma. Pozycja B-1 kubła SPEŁNIONY–NIE WRÓCIŁ zamknięta w inny sposób,
niż zakładano: nie przez powrót treści, lecz przez wykrycie, że treść wróciła
nieprawidłowo.

## 37.2 Z-A7 — odpowiedzi na trzy pytania

| # | pytanie | rozstrzygnięcie |
|---|---|---|
| 1 | czy rozdzielić kontakty od treści | **TAK, jawnie.** *„Jedna odpowiedź na dwa różne pytania jest źródłem tego defektu."* |
| 2 | co mówimy o **treściach** | **Prawdę z pokryciem** (`TO:76`, `TO:111`): **liderka widzi treści przekazane do zatwierdzenia.** Bez eufemizmu, bez „może widzieć". Panel dobiera brzmienie — **zakres rozstrzygnięty** |
| 3 | co mówimy o **kontaktach** | **MILCZENIE do czasu odczytu w aplikacji.** Status **NIEWERYFIKOWALNE**, nie „zachowawczy". Żadne zdanie nie twierdzi ani że widzi, ani że nie widzi. Odczyt zamówiony osobno |

**Zdanie „Do twojego konta masz dostęp tylko ty" WYPADA W CAŁOŚCI** — nieprawdziwe
wobec punktu 2 i nieuzasadnione wobec punktu 3.

## 37.3 TRZY PARY KORZYŚĆ↔GRANICA

**REGUŁA ROZSTRZYGAJĄCA (R-G): przy konflikcie zdania korzyści z granicą modułu
wygrywa GRANICA.**

**Powód (verbatim):** *„granica mówi, czego produkt nie robi, i jest twierdzeniem
sprawdzalnym przez klientkę następnego dnia. Korzyść mówi, co robi — i to ona
bywa naciągnięta."*

| para | rozstrzygnięcie |
|---|---|
| **1 — „za ciebie"** (`FunkcjeZespol.zdanie` ↔ `mod3_nie`) | zdanie korzyści **do przepisania** |
| **2 — sprawstwo „prowadzić"** | dwa moduły i tabela zgodne, zdanie korzyści przeczy im trzem → **przepisujemy jedno zdanie, nie trzy** |
| **3 — atrybucja „uczyć się"** | **TU WYGRYWA TABELA:** uczy się **System** (`TO:79`). **„Studio uczy się" i „Catherly uczy się" oba wypadają.** Jeden podmiot na wszystkich trasach |

**Sprostowanie klasyfikacji Z-3 (polecone przez właściciela):** to była **sprzeczność
wewnątrzstronowa, nie wada pokrycia**. Naprawa wobec samej tabeli zostawiłaby
sprzeczność żywą — bo `mod8_poco` mówi „Catherly uczy się" i jest równie oficjalne
jak zdanie korzyści.

## 37.4 DECYZJA NADRZĘDNA — koniec osobnego powstawania granic i korzyści

**Do kubła ZWYCZAJ, jako naprawa przyczyny, nie objawu:**

> **Granice i korzyści przestają powstawać osobno.** Autor dostaje **granice RAZEM
> z faktami WOLNO-POWIEDZIEĆ, w jednym dokumencie.** Nie ma osobnego kroku
> zestawiania — **osobny krok to ten szew.**

Wspólny mechanizm powstania wszystkich trzech par był właśnie taki: zdania korzyści
powstały w panelu filarów, granice modułów w panelu Etapu C — kilka dni później,
przez inny skład. Nikt ich nie zestawił. **Decyzja usuwa szew, a nie jego skutki.**

## 37.5 P0-4 — objęte panelem

**Zgoda właściciela:** sekcja S11 i tak jest przepisywana, więc fałszywa bramka
„widok całego zespołu" wchodzi do zakresu panelu.

**Kierunek rozstrzygnięty:** twierdzenie ma być zgodne z tym, co pokrywa tabela obietnic.
*„Jeśli tabela nie pokrywa widoku całego zespołu w tym zakresie, w jakim sugeruje
dzisiejsze zdanie — zdanie się zmienia, nie tabela."*

**Granica utrzymana w mocy (verbatim):** *„Zmiana znaczenia zawsze przez decyzję,
zmiana brzmienia przez panel."*

---

# 38. USTALENIE O NARZĘDZIU — REJESTR NIE ODRÓŻNIA „NIE WRÓCIŁO" OD „WRÓCIŁO ŹLE"

**To nie jest uwaga przy Pulsie. Dotyczy wszystkich pozycji przeglądu.**

Rejestr warunków powrotu pilnuje **momentu**: kiedy wolno wrócić. Nie pilnuje
**postaci**: co dokładnie ma wrócić. W obu wypadkach pozycja wygląda w rejestrze
tak samo — warunek spełniony, sprawa domknięta.

## 38.1 Trzy kubły zamiast dwóch (decyzja właściciela 2026-08-20)

| kubeł | co znaczy |
|---|---|
| **SPEŁNIONY–WRÓCIŁ POPRAWNIE** | warunek spełniony, treść wróciła w formie, której warunek żądał |
| **SPEŁNIONY–WRÓCIŁ W ZŁEJ FORMIE** | **najgroźniejszy.** W rejestrze wygląda jak domknięty, a na stronie stoi nieprawda |
| **SPEŁNIONY–NIE WRÓCIŁ** | obietnica, którą wolno złożyć, a strona jej nie składa |

**Konsekwencja dla przeglądu:** przy każdej pozycji ze spełnionym warunkiem
**nie wystarczy sprawdzić, czy treść wróciła — trzeba sprawdzić, czy wróciła
w formie, której warunek żądał.**

## 38.2 Skan 24 pozycji treściowych: **13 nie określa formy w ogóle**

Odczyt kolumny „warunek powrotu" wszystkich 24 pozycji.

**Warunek OKREŚLA formę — 11 pozycji:** 1, 4, 6, 7, 9, 11, 12, 14, 15, 19, 22.
**Warunek NIE OKREŚLA formy — 13 pozycji:** 2, 3, 5, 8, 10, 13, 16, 17, 18, 20, 21, 23, 24.

**Ponad połowa pozycji może wrócić w dowolnej postaci i nikt tego nie wykryje.**
Warunki zapisywaliśmy jako „wraca, gdy X", rzadko jako „wraca w formie Y, gdy X".

Przykłady pozycji bez formy, przy których stawka jest wysoka:
- **poz. 3** (trial 14 dni) — „Stripe działający end-to-end; **decyzja właściciela
  o komunikacji trialu**". Forma odłożona do decyzji, której treść nie jest zapisana.
- **poz. 10** (import wyciągu FL) — „Storage aktywny + ekrany niepuste". Nic o tym,
  jak wolno o imporcie mówić, gdy wróci.
- **poz. 18** (7 nazw opisowych bez pozycji słownika) — „Potwierdzenie zgodności
  z i18n aplikacji". Potwierdzenie zgodności **nie jest formą** — nie mówi, czy nazwy
  wchodzą do słownika, czy zostają opisowe.

## 38.3 Ostrzejsze: określenie formy NIE WYSTARCZA

**Pozycja 11 należy do jedenastu, które formę określają** — i to najostrzej
w całym rejestrze: *„**Zawsze pełna forma** «W planie Growth…»"*.

**I mimo to wróciła źle.** Na `/` stoi „Growth dodaje do tego widok całego zespołu"
— skrót, który gubi kwalifikator i nazywa funkcję, której tabela nie bramkuje (§27).

**Wniosek, który zmienia diagnozę:** problemem nie jest wyłącznie brak specyfikacji
formy w trzynastu pozycjach. Problemem jest, że **rejestr nie ma kontroli powrotu
w ogóle** — ani dla pozycji z określoną formą, ani dla pozostałych. Zapisanie formy
pomaga **człowiekowi, który sprawdza**, ale nikt nie jest wyznaczony do sprawdzania,
a moment powrotu nie generuje żadnego sygnału.

Trzynaście pozycji bez formy to **luka w zapisie**. Pozycja 11 to dowód, że nawet
domknięcie tej luki nie wystarczy — potrzebna jest **kontrola przy powrocie**,
nie tylko lepszy zapis warunku.

## 38.4 Powiązanie międzytorowe — trzecia klasa wykryta niezależnie po obu stronach

Właściciel wskazał, że linia techniczna nazwała dziś tę samą klasę przy opiniach
klientek: **„kwalifikator przy czynności, nie przy artefakcie"** — warunek pilnuje
**momentu** działania, nie **tego, co powstaje**.

To jest ta sama struktura: rejestr pilnuje momentu powrotu, nie tego, co wraca.

**Trzecia klasa wykryta niezależnie po obu stronach tego samego dnia**, po:
1. **R-C ↔ T21** — odwołanie do stanu, którego nie da się sprawdzić stąd
   (redakcja: cytowanie nieistniejących artefaktów · technika: skróty commitów
   na obiekty nieosiągalne z gałęzi);
2. **pomiar `24ch` ↔ T12** — miara w jednostce zależnej od kroju, bezczynna
   na telefonie (sędzia rzemiosła · linia techniczna);
3. **§38 ↔ „kwalifikator przy czynności"** — warunek pilnuje momentu, nie postaci.

**Wniosek metodyczny:** trzy zbieżności w jednym dniu, w trzech różnych warstwach,
oznaczają, że klasy te są **właściwością tego systemu pracy**, nie przypadkami.

---

# 39. FUNDAMENT SZEŚCIU TRAS NIESIE SZEW, KTÓRY DECYZJA NADRZĘDNA ZNOSI

**Ustalenie zgłoszone przez właściciela, potwierdzone odczytem własnego zlecenia.**

Fundament rundy drugiej dla sześciu tras został uruchomiony **przed** decyzją
nadrzędną z §37.4. Jego zlecenie ma konstrukcję **starą**:
- **Część 3** — „FAKTY WOLNO-POWIEDZIEĆ, per filar",
- **Część 4** — „NIE-WOLNO, per trasa".

**Dwie osobne listy — czyli dokładnie ten szew, który wyprodukował trzy sprzeczności
korzyść↔granica (§34).** Fundament mający naprawić szew sam go w sobie niesie.

**Skutek:** autorzy sześciu tras dostaliby fakty i granice osobno, a `/cennik`
— sparowane. Dwa różne kształty wsadu w jednym panelu.

**Do wykonania przed uruchomieniem autorów:** przepisanie Części 3 i 4 fundamentu
sześciu tras na **jedną listę sparowaną** — fakt wraz z jego granicą. Materiał
istnieje w całości; to jest przekształcenie kształtu, nie nowy odczyt.

---

# 40. USTALENIE NADRZĘDNE O REJESTRZE

> **REJESTR WARUNKÓW POWROTU NIE MA KONTROLI POWROTU.**
> Zapisanie formy pomaga człowiekowi, który sprawdza — ale **nikt nie jest
> wyznaczony, a moment powrotu nie generuje sygnału.** Trzynaście pozycji bez formy
> to **luka w zapisie**; pozycja 11 to **dowód, że to nie jest przyczyna**.

**Odpowiednik ustalenia linii technicznej z tego samego dnia:**
*wiedza o klasie nie chroni przed klasą — chroni strażnik.* **Zapisana forma jest wiedzą.**

---

# 41. TRZYNAŚCIE POZYCJI BEZ FORMY — czego warunek powinien żądać

Wzorzec żądany: nie „wraca, gdy X", tylko **„wraca jako zdanie/wiersz Z w miejscu Y, gdy X"**.

## 41.1 Forma dająca się określić dziś (7 pozycji)

| poz. | dziś | **forma, której warunek powinien żądać** |
|---|---|---|
| **5** | „Aktywny klucz Anthropic" | wraca **jako wiersz tabeli `/cennik` §4 z trzema wartościami 100/500/∞**, z wpisem w `content/facts.json` (wartość zmierzona) i wejściem do komunikatu przez zmienną. **Nie jako zdanie w opisie planu** — wiersz sam to rozróżnia, mówiąc że język kierunku w opisach jest dozwolony już teraz |
| **8** | „Odczyt dashboardu Supabase" | wraca **na `/bezpieczenstwo` jako fakt z mechanizmem i miejscem**, nie jako potwierdzenie ≤45 zn. **Wzorzec istnieje w rejestrze — poz. 9 formę określa** („z precyzyjnym zakresem «wybrane pola», nie jako potwierdzenie ≤45 zn"). Poz. 8 powinna go powtórzyć wprost |
| **13** | „Wyłączyć przy publikacji (Faza 7)" | wraca **jako usunięcie dyrektywy z `layout.tsx`**, weryfikowane odczytem nagłówka odpowiedzi na wszystkich ośmiu trasach ×3 języki. Forma techniczna, stawka niska — ale zapis powinien nazwać **dowód**, nie samą czynność |
| **16** | „Integracja dwustronna → rewizja granicy modułu 3" | wraca **jako podmiana zdania granicy `FunkcjePozyskiwanie.mod3_nie` ×3 języki, ten sam klucz** — nie jako nowy moduł ani nowe zdanie obok |
| **17** | „Weryfikacja przy Z9+ (dokąd QR prowadzi)" | warunkowa: **jeśli odczyt potwierdzi dzisiejsze założenie — zero zmian, wpis „zweryfikowane, forma bez zmian"; jeśli obali — podmiana zdań modułu QR ×3 języki**. Dziś warunek nie mówi, co się dzieje w którymkolwiek przypadku |
| **21** | „Aktywacja klucza Anthropic → rewizja" | jak poz. 16: **podmiana zdania granicy w `FunkcjeTresci`, ten sam klucz, ×3 języki** |
| **24** | „Weryfikacja przy Z9 / najbliższym Z" | jak poz. 17 — **forma warunkowa od wyniku odczytu**, z jawnym zapisem obu gałęzi |

## 41.2 Formy NIE DA SIĘ dziś określić — brakuje decyzji (5 pozycji)

**Nie wymyślam formy zamiast właściciela. Wypisuję decyzję, której brakuje.**

| poz. | dlaczego formy nie da się określić | **decyzja do podjęcia** |
|---|---|---|
| **3** — trial 14 dni | Warunek brzmi: „Stripe działający end-to-end; **decyzja właściciela o komunikacji trialu**". **Warunek odsyła do decyzji, której treści nie ma** — czyli do pustki. Kolumna „Gdzie" mówi „przyszły argument cennika", co jest zamiarem, nie miejscem | **Czy trial w ogóle komunikujemy?** Jeśli tak — jako wiersz karty planu, jako zdanie FAQ `/cennik`, czy jako argument w zamknięciu? Bez tego warunek nie ma czego pilnować |
| **10** — import wyciągu FL | Kolumna „Gdzie" mówi **„cała strona"** — czyli nie mówi nic o miejscu. Warunek nie mówi też, w jakiej roli import wraca: jako moduł, jako granica, jako wyróżnik planu | **Na których trasach i w jakiej roli wchodzi import wyciągu**, gdy Storage ruszy? Bramka GROWTH zostaje — czy wchodzi jako pozycja kierunku „W planie Growth…", czy jako moduł podstrony? |
| **18** — 7 nazw opisowych | Warunek żąda **„potwierdzenia zgodności z i18n aplikacji"**. **To jest czynność, nie forma.** Nie rozstrzyga, czy nazwy wchodzą do słownika jako pozycje kanoniczne, czy zostają opisowe — a to są dwa różne stany serwisu | **Czy siedem nazw (kalendarz, subskrypcja, vCard, QR, program poleceń, zadania, plany rozmów) wchodzi do `slownik-nazw.md` jako pozycje kanoniczne, czy zostaje opisowych?** Odczyt potwierdzi brzmienie; nie rozstrzygnie statusu |
| **23** — widok liderki w Pierwszych 90 Dniach | Warunek to sam odczyt. Wariant W2 odrzucono „brak dowodu" — ale nie zapisano, **czym miałby być po dostarczeniu dowodu** | **W jakiej roli wchodzi widok liderki:** jako nowy moduł `/funkcje/zespol`, jako zdanie w module Pierwszych 90 Dni, czy jako pozycja kierunku z kwalifikatorem planu? |
| **2** — faktura VAT w FAQ cennika | Miejsce określone (`cennik §5`), ale **rodzaj dokumentu zależy od decyzji zawartej w tym samym warunku**: „decyzja o Stripe Tax — domyślnie wyłączony". Inny dokument to inna odpowiedź | **Stripe Tax włączony czy nie** — od tego zależy, czy odpowiedź nazywa fakturę VAT, czy potwierdzenie płatności |

## 41.3 Pozycja źle zaklasyfikowana (1)

**Poz. 20** — „Rejestr «cyfrowy odcisk SHA-256»… **Obowiązujące**; przy zmianie decyzji
głównej — rewizja". **To nie jest warunek powrotu.** To **stojąca decyzja** wpisana
do rejestru warunków powrotu. Nie ma czego czekać ani co przywracać.
**Do przeniesienia** — rejestr warunków powrotu nie jest miejscem na decyzje obowiązujące.

---

# 42. STRAŻNIK POWROTU — propozycja, bez implementacji

## 42.1 Rozstrzygnięcie projektowe: automat obejmie DWA z trzech stanów, nie trzy

**Wyzwalacz nie da się zautomatyzować z tego repozytorium.** Warunki powrotu brzmią
„Stripe działa end-to-end", „aktywny klucz Anthropic", „Storage aktywny", „zgody
platform" — **żaden z tych stanów nie jest obserwowalny z `catherly-www`**. Automat,
który by to udawał, byłby strażnikiem pozornym.

**Ale kontrola formy wyzwalacza NIE POTRZEBUJE.** I to jest sedno propozycji:

> **Jeśli treść stoi na stronie w złej formie, jest to złe NIEZALEŻNIE od tego,
> czy warunek jest spełniony.** Kontrola formy jest więc rozłączna od kontroli
> wyzwalacza — i tylko ta pierwsza wymaga automatu.

To rozdzielenie zdejmuje z bramki część niewykonalną i zostawia wykonalną.

| stan | czym wykrywalny |
|---|---|
| **WRÓCIŁO W ZŁEJ FORMIE** | **automat** — asercja formy, działa dziś, bez wiedzy o wyzwalaczu |
| **WRÓCIŁO POPRAWNIE** | **automat** — ta sama asercja, wynik zielony |
| **NIE WRÓCIŁO** | **NIE automat.** Nieobecność treści nie jest wykrywalna asercją formy; wymaga wiedzy, że warunek jest spełniony — czyli wyzwalacza. **Zostaje procedurą** |

## 42.2 Część automatyczna — asercja formy

**Warunek konstrukcyjny:** każdy wiersz rejestru zyskuje pole **`forma_powrotu`**
w postaci maszynowo czytelnej. Trzy typy asercji wystarczą na dzisiejszy rejestr:
- **VERBATIM** — ciąg musi paść dosłownie (poz. 11: `TO:121` co do znaku),
- **TOWARZYSZĄCY** — jeśli pada pojęcie A, w tym samym zdaniu musi paść kwalifikator B,
- **NIEOBECNY** — ciąg nie może paść nigdzie (pozycje milczenia).

**Weryfikacja wsteczna — kryterium właściciela: musi zapalić się DZIŚ na pozycji 11.**

Pozycja 11 z formą `TOWARZYSZĄCY`: *jeśli zdanie nazywa plan Growth i opisuje funkcję
bramkowaną, musi być brzmieniem sankcjonowanym z tabeli obietnic.*
Dzisiejszy stan `/` (STAN, `CennikSkrot.roznica`): „Wszystkie plany prowadzą twoje
kontakty i wyniki — **Growth dodaje do tego widok całego zespołu**." Zdanie nazywa
plan Growth, opisuje funkcję bramkowaną i **nie jest brzmieniem z tabeli**
(`TO:121` ani `TO:122`). → **ZAPALA SIĘ. Kryterium spełnione.**

**Kontrola przeciwna (bramka nie może być fałszywie alarmująca):** `FunkcjeZespol.f8_2`
i `FunkcjeWyniki.f8_2` niosą `TO:121` **verbatim** → milczą. `Cennik.plany.growth.pozycja1`
— karta Growth, gdzie `SN:13` dopuszcza nazwę bez kwalifikatora → wyjątek jawny,
z kontrolą samego wyjątku (wzorzec z §10: wyjątek, który przestaje odpowiadać treści,
sam zapala czerwień).

## 42.3 Część proceduralna — stan „nie wróciło"

**Automat go nie obejmie. Mówię to wprost, zamiast proponować bramkę, której nikt
nie posłucha.**

**Wyznaczony moment — trzy, nie jeden:**
1. **Przy każdym zamknięciu pozycji technicznej rejestru** (dziś T1–T22): osoba
   zamykająca przechodzi pozycje treściowe i sprawdza, czy zamknięcie czegoś nie odblokowało.
2. **Przy każdej aktywacji klucza albo zgody** (Stripe, Anthropic, Resend, Storage,
   platformy): przegląd pozycji, których warunek ten klucz stanowił. To są pozycje
   1, 2, 3, 4, 5, 6, 10, 15, 21 — **dziewięć z dwudziestu czterech zależy od pięciu kluczy**.
3. **Na checkliście premiery** — przegląd całości, jako pozycja obok T7.

**Wyznaczona osoba:** właściciel przy momentach 2 i 3; osoba zamykająca pozycję
techniczną przy momencie 1.

**Dlaczego procedura, a nie bramka:** wyzwalacz żyje poza tym repozytorium, a bramka
udająca dostęp do niego byłaby dokładnie tym, przed czym ostrzega `CLAUDE.md` —
zieloną asercją, która nie mierzy tego, co deklaruje.

## 42.4 Czego ta propozycja NIE rozwiązuje

- **Trzynaście pozycji bez formy** (§41) nie da się objąć asercją, dopóki nie mają pola
  `forma_powrotu`. Pięć z nich wymaga wcześniej **decyzji właściciela** (§41.2).
- **Bramka nie wykryje pozycji, której warunek jest spełniony, a treść nigdy nie weszła** —
  to jest cała zawartość kubła „SPEŁNIONY–NIE WRÓCIŁ" i zostaje po stronie procedury.
- **Bramka nie oceni, czy forma jest właściwa** — tylko czy treść jej odpowiada.
  Właściwość formy rozstrzyga panel i właściciel.

---

# 43. TRZY ZBIEŻNOŚCI MIĘDZYTOROWE — i dlaczego są dowodem

| # | klasa | linia redakcyjna | linia techniczna |
|---|---|---|---|
| 1 | **odwołanie do stanu, którego nie da się sprawdzić stąd** | **R-C** — raport Z4 cytuje `vercel.json:4` i trzy pliki `docs/`, których w tym repozytorium nie ma | **T21** — „Nic nie pilnuje, że skróty commitów w dokumentacji wskazują na commity, które istnieją" |
| 2 | **miara w jednostce zależnej od kroju, bezczynna na telefonie** | pomiar sędziego rzemiosła — `24ch` ≈ 426 px przy kolumnie 358 px | **T12** — „`max-width: 24ch` na H1 hero — defekt produkcyjny, nie artefakt eksperymentu" |
| 3 | **warunek pilnuje momentu, nie postaci** | **§38** — rejestr nie odróżnia „nie wróciło" od „wróciło źle" | „kwalifikator przy czynności, nie przy artefakcie" |

## Dlaczego zbieżność jest dowodem — i kiedy przestaje nim być

**Zbieżność wychodzi dlatego, że dwa tory pracują na RÓŻNYM materiale przy TYCH SAMYCH
regułach.** Linia redakcyjna czyta treść, protokoły i tabelę obietnic; linia techniczna
czyta kod, bramki i konfigurację. Wspólne mają wyłącznie reguły pracy — ADR-018,
zakaz samo-odbioru, „brak dowodu = brak zabezpieczenia".

**Gdyby oba tory pracowały na tym samym materiale, zgodność nie byłaby dowodem niczego**
— byłaby powtórzeniem tego samego odczytu. Dowodem czyni ją **niezależność źródła**.

**To jest reguła o niezależności pomiaru, zastosowana do torów zamiast do narzędzi.**
Ten sam mechanizm, który każe sędziemu być rozłącznym od autora, a adwersarzowi
od syntezy — podniesiony o poziom wyżej.

**Konsekwencja praktyczna:** jeśli kiedykolwiek oba tory zaczną czytać ten sam materiał,
ich zgodność traci wartość dowodową i trzeba to odnotować, zanim ktoś powoła się na nią
jako na potwierdzenie.

---

# 44. ZDANIE DO ZAPAMIĘTANIA

> **Fundament mający naprawić szew sam go w sobie niesie.**

Zlecenie dla fundamentu sześciu tras — z Częścią 3 „fakty WOLNO-POWIEDZIEĆ"
i osobną Częścią 4 „NIE-WOLNO" — powstało **godzinę przed** decyzją nadrzędną,
która taką konstrukcję zakazuje (§37.4).

**To jest najlepszy dowód, jak głęboko ten wzorzec siedzi:** nie w cudzej pracy
sprzed tygodni, tylko we własnym zleceniu napisanym tego samego wieczoru,
przez tę samą osobę, która godzinę później opisała ten szew jako źródło
trzech sprzeczności.

**Warunek właściciela:** oba wsady mają mieć **ten sam kształt**, zanim ktokolwiek
napisze pierwsze zdanie. **Autorów nie ruszać przed przekształceniem.**

---

# 45. ROZSTRZYGNIĘCIA WŁAŚCICIELA — 2026-08-21

Zapis dosłowny. Status: **decyzje obowiązujące**, nie propozycje.

| # | przedmiot | rozstrzygnięcie |
|---|---|---|
| **45.1** | **poz. 20** | „To nie warunek powrotu, tylko **stojąca decyzja wpisana do złego rejestru**. Wyjmij ją z 24 pozycji i zapisz tam, gdzie żyją decyzje. **Rejestr, w którym połowa pozycji to co innego niż nazwa dokumentu, uczy nieczytania.**" |
| **45.2** | **poz. 3 — trial** | „**Nie komunikujemy trialu na stronie do premiery.**" Forma warunku: „wraca jako pozycja cennika w brzmieniu ustalonym panelem, gdy Stripe działa end-to-end **I** zapadnie decyzja o długości i warunkach trialu". Dopóki obu członów nie ma, **warunek jest niespełnialny i tak ma być zapisany** — „lepiej warunek jawnie niespełnialny niż odsyłający do pustki". Decyzja o samym trialu: po rotacji i po posiedzeniu |
| **45.3** | **poz. 8 — TLS/at-rest** | **Przenieś wzorzec z poz. 9.** Forma: „wraca z precyzyjnym zakresem, nie jako potwierdzenie ≤45 znaków" |
| **45.4** | **poz. 18 — 7 nazw** | „Nazwy **zostają OPISOWE**, chyba że aplikacja ma dla nich nazwę własną w i18n." Forma: „każda z siedmiu nazw wchodzi do słownika z brzmieniem z i18n aplikacji **ALBO** zostaje jawnie oznaczona jako opisowa; **trzeciej drogi nie ma**" |
| **45.5** | **poz. 10 — import wyciągu** | „Gdy wróci, mówimy **WYŁĄCZNIE o tym, co import robi, nigdy o tym, co z danych wynika.**" Forma: „wraca jako opis czynności (co użytkowniczka wgrywa i co widzi), bez twierdzeń o wnioskach, prognozach ani porównaniach". Powód: „to samo źródło danych, które przy rangach okazało się nieweryfikowane — nie budujemy na nim twierdzeń" |
| **45.6** | **przegląd przy kluczu** | Procedura **wiążąca**. „Przegląd przy kluczu zamiast przeglądu całości […] To zmienia moment przeglądu z «kiedyś» na «w tej samej godzinie»" |
| **45.7** | **zbieżność międzytorowa** | Warunek operacyjny — §51 |

**Konstrukcja wspólna 45.2 i 45.4** — obie formy budują **stan niewyrażalny zamiast błędu do wykrycia**:
poz. 3 czyni warunek jawnie niespełnialnym (nie da się „przypadkiem" uznać go za spełniony);
poz. 18 zamyka zbiór do dwóch stanów („trzeciej drogi nie ma") — nazwa opisowa nieoznaczona
przestaje być stanem możliwym. To ta sama konstrukcja co przy mapie tras (§2:
`ISTNIEJACE_SCIEZKI` wyprowadzone z `MAPA_STOPKI` — link do nieistniejącej trasy nie jest
błędem do wykrycia, tylko wartością niewyrażalną). **Trzecie wystąpienie wzorca w tym torze.**

---

# 46. POZ. 20 WYJĘTA — nowa liczba pozycji treściowych

## 46.1 Odpowiedź: **23**

24 − poz. 20 = **23 pozycje treściowe**. Poz. 20 do przeniesienia tam, gdzie żyją decyzje
(kandydat: `docs/faza-2/slownik-nazw.md` albo osobny rejestr decyzji stojących — **wskazanie
miejsca należy do właściciela**; nie przenoszę, bo to zmiana dokumentu obowiązującego).

## 46.2 Dwaj dalsi kandydaci — nie decyduję za właściciela

Skan pozostałych 23 pod tym samym kryterium („czy jest coś do przywrócenia i czy przedmiotem
jest treść") dał **dwóch dalszych kandydatów**, każdy **innej klasy niż poz. 20**:

| poz. | cytat `[STAN dokumentu]` | dlaczego kandydat | klasa |
|---|---|---|---|
| **12** | „Pozostałe bramki GROWTH z Z1 […] \| ewentualne przyszłe treści \| **Nieobecne w narracji strony**; każde wejście = nowa obietnica → tabela obietnic + panel + decyzja właściciela" | **Nic nie zdjęto** — treść nigdy nie stała na stronie. To nie jest warunek powrotu, tylko **stojąca reguła prewencyjna** na wypadek przyszłego wejścia. Kolumna „Gdzie" mówi „ewentualne przyszłe treści", czyli nie mówi o miejscu | **stojąca reguła** — ta sama klasa co poz. 20 (decyzja/reguła w rejestrze warunków) |
| **13** | „**robots: noindex,nofollow** (layout www — stan przedpremierowy) \| `src/app/[locale]/…/layout.tsx` \| Wyłączyć przy publikacji (Faza 7) — pozycja checklisty premiery" | To **jest** prawdziwy warunek z momentem i czynnością — ale **przedmiotem nie jest treść**, tylko ustawienie techniczne, a sama pozycja nazywa siebie „pozycją checklisty premiery" | **inna klasa: warunek prawdziwy, przedmiot nietreściowy** |

**Gdyby właściciel wyjął oba: 21 pozycji treściowych.** Nie wyjmuję ich sam, bo poz. 20 wyszła
na mocy rozstrzygnięcia, a te dwie są moją propozycją — a §37 zabrania samoprzyjęcia.

## 46.3 Kubeł „nie sprawdzono" (R-D)

- **T1–T22 nie przeglądano** pod kątem tego samego kryterium. Skoro część pozycji treściowych
  okazała się nietreściowa, symetryczne pytanie — czy część pozycji technicznych nie jest
  w istocie treściowa — **jest zasadne i nie zostało zadane**.
- Nie sprawdzono, czy istnieje **inny rejestr decyzji stojących**, do którego poz. 20 mogłaby
  wejść bez zakładania nowego dokumentu.

---

# 47. PARY SĄSIADUJĄCE — czy 8/9 jest wyjątkiem. **NIE JEST**

Zadanie właściciela (45.3): „Sprawdź, czy nie ma innych par sąsiadujących pozycji, gdzie jedna
ma formę, a druga nie." Skan wszystkich 23. Dowodem jest cytat kolumny „Warunek powrotu" (R-F).

## 47.1 Trójka limitów 4/5/6 — **trzy wiersze tej samej tabeli, trzy różne poziomy określenia**

| poz. | przedmiot | cytat warunku `[STAN]` | forma? | procedura? |
|---|---|---|---|---|
| **4** | przestrzeń na pliki | „Klucz Storage aktywny + wykonany test uploadu. **Panel: wraca bez ponownego panelu treści, tylko ze zliczeniem znaków**" | nie | **TAK** |
| **5** | wywołania AI | „Aktywny klucz Anthropic (AI przestaje zwracać teksty zapasowe). **Język kierunku o asystencie AI w opisach — dozwolony już teraz**" | **TAK, częściowa** (rozdziela wiersz liczbowy od języka kierunku) | nie |
| **6** | platformy social | „Zgody platform + działające łączenie kont (dowód połączeniem)" | **nie** | **nie** |

Trzy wiersze **tej samej tabeli `/cennik` §4**, wykluczone tą samą decyzją, o identycznej
budowie („oś limitu wycięta do czasu klucza"). Poz. 4 dostała procedurę, poz. 5 rozdzielenie
form, **poz. 6 nie dostała nic**. To jest ostrzejszy przypadek niż 8/9: tam pozycje sąsiadowały
tematycznie, tutaj **są elementami jednej listy w jednym dokumencie**.

**Skutek praktyczny, wymierny:** gdy zgody platform wejdą, poz. 6 nie mówi ani czy wiersz wraca
bez panelu (jak poz. 4), ani czy język kierunku o platformach jest dozwolony już teraz
(jak poz. 5). Obie odpowiedzi **stoją obok, w tej samej tabeli**, i żadna nie została przeniesiona.

## 47.2 Asymetria klasowa 18 ↔ 24 (nie sąsiadująca, ten sam przedmiot)

| poz. | cytat `[STAN]` | ma powód/decyzję? |
|---|---|---|
| **18** | „7 nazw opisowych modułów bez pozycji słownika […] Potwierdzenie zgodności z i18n aplikacji przy najbliższym zleceniu Z (**decyzja właściciela 2026-08-12**)" | **TAK — z datą** |
| **24** | „«Przesuwasz post» + **nazwy poza słownikiem** (kalendarz publikacji, tablica postów) \| Weryfikacja przy Z9 / najbliższym Z" | **NIE** |

Ten sam przedmiot (nazwy bez pozycji słownika), ten sam wyzwalacz (najbliższe Z), jedna
z datowaną decyzją, druga bez. **Rozstrzygnięcie 45.4 obejmuje siedem nazw z poz. 18 i nie
obejmuje dwóch z poz. 24** — a konstrukcja „trzeciej drogi nie ma" stosuje się do nich tak
samo. **Do decyzji właściciela: czy 45.4 rozciąga się na poz. 24.**

## 47.3 Kontrola negatywna — pary symetryczne, **nie ścigać**

| para | dlaczego NIE jest asymetrią |
|---|---|
| **15 / 16** | Obie: granica na `/funkcje/pozyskiwanie`, obie nazywają obiekt rewizji („rewizja **trzech granic**" · „rewizja **granicy modułu 3**"), obie bez formy brzmienia. Symetryczne |
| **21 / 22** | Obie: granica na `/funkcje/tresci`, obie „→ rewizja", obie bez formy. Symetryczne — **ale zob. §48.2**, bo w mojej własnej pracy potraktowałem je asymetrycznie |
| **17 / 19** | Różny przedmiot (cel linku QR vs zakres importu); 19 nazywa dwa obiekty rewizji, bo dotyka dwóch miejsc. Uzasadnione |

## 47.4 Zapis klasy „mechanizm istnieje, nie jest wołany" — po stronie treści

Rozstrzygnięcie 45.3 nakazuje zapisać ustalenie o poz. 8/9 jako wystąpienie tej klasy.
**Zapisuję je jako klasę o trzech wystąpieniach, nie o jednym:**

| # | mechanizm istniejący | miejsce, gdzie nie został zawołany |
|---|---|---|
| 1 | forma poz. 9: „wraca z **precyzyjnym zakresem**, nie jako potwierdzenie ≤45 zn" | **poz. 8** — sąsiedni wiersz, ten sam podmiot (twierdzenia o szyfrowaniu na `/bezpieczenstwo`) |
| 2 | procedura poz. 4: „wraca **bez ponownego panelu treści**, tylko ze zliczeniem znaków" | **poz. 5, poz. 6** — ta sama tabela, ta sama decyzja wykluczająca |
| 3 | rozdzielenie poz. 5: „**język kierunku dozwolony już teraz**" (osobno od wiersza liczbowego) | **poz. 6** — i to milczenie ma dziś skutek: §52.6 (Z-C3) |

**Definicja klasy po stronie treści:** rozwiązanie zostało już raz znalezione i zapisane
w dokumencie obowiązującym, sąsiaduje z pozycją, której dotyczy tak samo — i nie zostało
do niej przeniesione. **Wykrywalność: wyłącznie przez skan par o wspólnym przedmiocie.**
Żadna bramka tego nie łapie, bo każda pozycja z osobna jest poprawna.

---

# 48. TABELA KLUCZ → POZYCJE (procedura wiążąca, 45.6)

## 48.1 Tabela do ręki przy rotacji i przy posiedzeniu

| klucz / zgoda | odblokowuje pozycje | co konkretnie się otwiera | zastrzeżenie |
|---|---|---|---|
| **Stripe end-to-end** | **1, 2, 3** | poz. 1 — „Rozliczenia" w H1 **i** podtytule hero (2 miejsca ×3 języki) · poz. 2 — pytanie o fakturę w FAQ `/cennik` §5 · poz. 3 — trial | **Żadna z trzech nie otwiera się samym kluczem.** Poz. 1 wymaga aktualizacji inwentarza; poz. 2 — decyzji o Stripe Tax (§50); poz. 3 — decyzji o długości i warunkach trialu (45.2). **Klucz Stripe otwiera zero pozycji bez trzech dalszych rozstrzygnięć** |
| **Storage** | **4, 10** | poz. 4 — „20 GB przestrzeni" na karcie Pro **+** wiersz „Przestrzeń" w tabeli (2 miejsca ×3 języki) · poz. 10 — import wyciągu FL | poz. 4 wraca **bez panelu treści**, tylko ze zliczeniem znaków. poz. 10 wraca **wyłącznie jako opis czynności** (45.5) i wymaga jeszcze „ekranów niepustych"; bramka GROWTH zostaje |
| **Anthropic** | **5, 21** | poz. 5 — wiersz „Wywołania AI 100/500/∞" w tabeli §4 · poz. 21 — podmiana zdania granicy „nie wygeneruje szablonu" w `FunkcjeTresci` (ten sam klucz i18n, ×3 języki) | **Język kierunku o asystencie AI w opisach jest dozwolony JUŻ DZIŚ** — nie czeka na klucz. Dziś niewykorzystany na `/cennik` (§52.6) |
| **Zgody platform** | **6, 22** | poz. 6 — wiersz „Platformy social 2/5/∞" w tabeli §4 · poz. 22 — podmiana zdania granicy „zasięgów nie pokaże" | Warunek poz. 6 żąda **dowodu połączeniem**, nie samej zgody. Poz. 22 dodatkowo wymaga statystyk publikacji — **zgoda bez statystyk otwiera 6, nie otwiera 22** |
| **Resend** | **15** | trzy granice e-mail naraz: formularz, kalendarz, zadania („nie wyśle e-maila" / „nie przychodzą e-mailem") | **Jedna pozycja, trzy zdania ×3 języki = 9 ciągów.** Największa pojedyncza pozycja rejestru |

**Suma: pięć kluczy → dziesięć pozycji.**

## 48.2 Korekta mojej własnej liczby: **było dziewięć, jest dziesięć**

§42.3 wiersz 2 zapisał: „To są pozycje **1, 2, 3, 4, 5, 6, 10, 15, 21** — dziewięć z dwudziestu
czterech zależy od pięciu kluczy."

**Brakuje poz. 22.** Cytat warunku `[STAN]`: „Statystyki publikacji **po zgodach platform**
→ rewizja". Zgody platform to jeden z pięciu kluczy — poz. 22 należała do listy od początku.

**To jest ta sama wada, której właściciel kazał mi szukać w rejestrze — w mojej własnej pracy.**
Ująłem poz. 21 (Anthropic) i pominąłem jej bliźniaczkę poz. 22 (platformy), stojącą wiersz
niżej, o identycznej budowie („granica na `/funkcje/tresci` → rewizja po kluczu").
Wzięło się to z tego, że skanowałem po **nazwie klucza w treści warunku**: poz. 21 mówi
„aktywacja **klucza** Anthropic", poz. 22 mówi „po **zgodach** platform" — bez słowa „klucz".
**Skan po słowie zamiast po przedmiocie.** Ta sama przyczyna, co przy trójce 4/5/6:
poz. 6 też nie zawiera słowa „klucz".

## 48.3 Drugi wyzwalacz zbiorczy, którego nie nazwaliśmy: **zlecenie Z**

Skan po przedmiocie (nie po słowie) ujawnił drugą rodzinę tej samej wielkości:

| wyzwalacz | pozycje | co się otwiera |
|---|---|---|
| **najbliższe zlecenie zrzutów Z / Z9** | **17, 18, 23, 24** | poz. 17 — cel linku QR polecającego · poz. 18 — siedem nazw wobec i18n (forma z 45.4) · poz. 23 — widok liderki w Pierwszych 90 Dniach · poz. 24 — „Przesuwasz post" + dwie nazwy poza słownikiem |
| — częściowo | **19** | zakres importu potwierdzany „przy najbliższym Z", ale głównym wyzwalaczem jest pojawienie się importu w aplikacji |

**Cztery pozycje (plus jedna częściowo) otwierają się jednym zleceniem zrzutów.**
To jest wyzwalacz **tańszy niż którykolwiek klucz** — nie wymaga aktywacji usługi, tylko
zlecenia odczytu. Trzy z czterech (18, 23, 24) czekają dziś **wyłącznie** na niego.

## 48.4 Bilans wyzwalaczy — liczba do zapamiętania

**Czternaście z dwudziestu trzech pozycji treściowych wisi na dwóch rodzinach wyzwalaczy:**
dziesięć na pięciu kluczach, cztery na zleceniu Z. Pozostałe dziewięć ma wyzwalacze
jednostkowe (7 — weryfikacja procesów RODO; 8 — odczyt dashboardu Supabase; 9 — budowa
`/bezpieczenstwo`; 11 — **spełniony**; 12 — reguła stojąca; 13 — premiera; 14 — weryfikacja
przepływu anulowania; 16 — dwustronna integracja kalendarza; 19 — pojawienie się importu).

**Wniosek dla procedury 45.6:** przegląd przy kluczu obejmuje 10 pozycji. **Przegląd przy
zleceniu Z obejmuje kolejne 4 i jest tańszy.** Rekomendacja: procedura wiążąca powinna
nazywać **oba** momenty, nie tylko klucze — inaczej cztery pozycje zostaną bez momentu,
mimo że mają najtańszy z możliwych.

---

# 49. FORMY ZAPISANE — poz. 3, 8, 10, 18

Uzupełnienie §41.2. Cztery z pięciu pozycji mają dziś formę; źródłem jest rozstrzygnięcie
właściciela, nie propozycja panelu.

| poz. | forma warunku (brzmienie właściciela, 2026-08-21) | co ta forma odbiera |
|---|---|---|
| **3** | „wraca jako pozycja cennika w brzmieniu ustalonym panelem, gdy Stripe działa end-to-end **I** zapadnie decyzja o długości i warunkach trialu" | odbiera możliwość uznania warunku za spełniony po samym Stripe. **Warunek jawnie niespełnialny** zamiast odsyłającego do pustki |
| **8** | „wraca z precyzyjnym zakresem, nie jako potwierdzenie ≤45 znaków" | odbiera drogę, którą twierdzenie o szyfrowaniu wróciłoby jako hasło paska potwierdzeń |
| **10** | „wraca jako opis czynności (co użytkowniczka wgrywa i co widzi), bez twierdzeń o wnioskach, prognozach ani porównaniach" | odbiera całą klasę zdań („z wyciągu wynika…", „porównaj z…"), a nie jedno brzmienie |
| **18** | „każda z siedmiu nazw wchodzi do słownika z brzmieniem z i18n aplikacji **ALBO** zostaje jawnie oznaczona jako opisowa; **trzeciej drogi nie ma**" | odbiera stan „nazwa opisowa nieoznaczona" — dziś stan domyślny siedmiu nazw |

**Pozostaje bez formy: poz. 2 i poz. 23** — §50.

---

# 50. DWIE POZYCJE DO ROZSTRZYGNIĘCIA — pełne brzmienie

Właściciel: „wymieniłeś trzy z pięciu. Podaj pozostałe dwie z pełnym brzmieniem, rozstrzygnę."
Piątka z §41.2 to: 3, 10, 18 (rozstrzygnięte 45.2/45.5/45.4) oraz **2 i 23**.

## 50.1 Poz. 2 — faktura VAT w FAQ cennika

**Wiersz rejestru w całości `[STAN dokumentu]`:**
> „**2** \| Pytanie o fakturę VAT w FAQ cennika \| pl/en/de cennik §5 \| Testowy zakup
> z OTRZYMANĄ fakturą (dowód dokumentem) + konfiguracja dashboardu Stripe (dane sprzedawcy;
> **decyzja o Stripe Tax — domyślnie wyłączony**)"

**Dlaczego formy nie da się dziś określić:** miejsce jest określone (`cennik §5`), ale
**rodzaj dokumentu zależy od decyzji zawartej w tym samym warunku**. Inny dokument to inna
odpowiedź — i inna liczba zdań: „fakturę VAT wystawiamy…" to jedno zdanie, „potwierdzenie
płatności otrzymasz…, fakturę wystawisz…" to dwa i przenosi czynność na czytelniczkę.

**Decyzja do podjęcia:** **Stripe Tax włączony czy nie.** Od tego zależy, czy odpowiedź
FAQ nazywa **fakturę VAT**, czy **potwierdzenie płatności**.

**Kontekst, który może mieć znaczenie dla decyzji:** przestrzeń `Cennik.faq` ma dziś
**cztery pary Q&A** i arność jest zablokowana strażnikiem (`e2e/cennik.spec.ts:85`).
Piąta para = zmiana asercji arności, czyli **dotknięcie strażnika** — do zaplanowania
razem z decyzją, nie po niej.

## 50.2 Poz. 23 — widok liderki w Pierwszych 90 Dniach

**Wiersz rejestru w całości `[STAN dokumentu]`:**
> „**23** \| Widok liderki w Pierwszych 90 Dniach (**W2 odrzucony — brak dowodu**) \|
> /funkcje/zespol \| **Odczyt first90 przy najbliższym Z**"

**Dlaczego formy nie da się dziś określić:** warunek to **sam odczyt**. Wariant W2 odrzucono
z adnotacją „brak dowodu" — ale **nie zapisano, czym miałby być po dostarczeniu dowodu**.
Odczyt potwierdzi, że widok istnieje; nie rozstrzygnie, w jakiej roli wchodzi na stronę.

**Decyzja do podjęcia:** **w jakiej roli wchodzi widok liderki** — jako nowy moduł
`/funkcje/zespol`, jako zdanie wewnątrz istniejącego modułu Pierwszych 90 Dni, czy jako
pozycja kierunku z kwalifikatorem planu?

**Kontekst:** poz. 23 należy do rodziny „zlecenie Z" (§48.3) — otwiera się razem z 17, 18, 24.
Jeśli rozstrzygnięcie zapadnie **przed** zleceniem, odczyt wróci z gotową odpowiedzią.
Jeśli po — pozycja przeczeka jeszcze jeden cykl. **To jest jedyna z dwóch pozycji, dla której
kolejność decyzji i wyzwalacza ma cenę.**

---

# 51. WARUNEK OPERACYJNY ZBIEŻNOŚCI MIĘDZYTOROWEJ

**Rozstrzygnięcie właściciela 2026-08-21 (45.7), zaostrzenie §43:**

> „Przed powołaniem się na zbieżność międzytorową jako dowód **trzeba sprawdzić, czy tory
> nie czytały tego samego materiału**. Dziś bezpiecznie — ale **KANON jest materiałem
> wspólnym i rośnie**. Im więcej reguł dzielą, tym bardziej ich zgodność mierzy reguły,
> nie produkt."

## 51.1 Co ten warunek robi z §43

§43 uzasadniał, dlaczego zbieżność jest dowodem: tory czytały **różny materiał** pod
**tymi samymi regułami**. Warunek 51 nazywa **datę ważności** tego uzasadnienia.
Niezależność pomiaru nie jest własnością metody — jest **stanem faktycznym, który się zużywa**.

## 51.2 Zapis operacyjny

Przed powołaniem się na zbieżność jako dowód, obowiązkowo:

1. **Wymień materiał wejściowy obu torów** i wskaż część wspólną.
2. **Sprawdź, czy ustalenie nie stoi w części wspólnej.** Jeśli stoi — zbieżność mierzy
   materiał wspólny, nie produkt. Wtedy **nie jest dowodem** i tak trzeba ją zapisać.
3. **Sprawdź, czy reguła, pod którą oba tory pracowały, nie zawiera już odpowiedzi.**
   Zbieżność dwóch torów stosujących tę samą regułę do tego samego przedmiotu jest
   **powtórzeniem reguły**, nie potwierdzeniem.

## 51.3 Stan na dziś dla trzech zbieżności z §43

Sprawdzone wobec warunku: **wszystkie trzy stoją.** Materiał wspólny obu torów to KANON
w wersji sprzed rozszerzenia; żadne z trzech ustaleń nie jest w nim zapisane — każde
powstało z odczytu warstwy renderowanej i plików treści, które **drugi tor czytał w innym
zakresie**.

**Zastrzeżenie na przyszłość:** dokument, który właśnie czytasz, **wejdzie do materiału
wspólnego, jeśli zostanie udostępniony drugiemu torowi**. Od tego momentu żadna zbieżność
dotycząca ustaleń §45–§52 nie będzie dowodem. **To jest cena rozszerzania KANONU i trzeba
ją znać zawczasu — dokładnie jak mówi rozstrzygnięcie.**

---

# 52. FUNDAMENT TRASY `/cennik` — siódma trasa (A0-C)

Fundament rundy drugiej objął sześć tras. `/cennik` doszła na mocy rozstrzygnięcia §36
(`PasekPotwierdzen` współdzielony z hero). Poniżej **wyłącznie to, czego nie było
w fundamencie sześciu tras**. Wszystkie cytaty oznaczone `[STAN]` / `[PROPOZYCJA]` (R-E).

## 52.1 Pięć łańcuchów verbatim, których **nie ma w mojej mapie §1**

Mapa §1 zapisała 16 łańcuchów. Skan podciągowy przestrzeni `Cennik` + `ZamkniecieCennik`
wobec całej pozostałej warstwy `pl.json` (próg 12 znaków) dał **pięć dalszych**:

| # | ciąg | `/cennik` | druga noga |
|---|---|---|---|
| **Ł-3** | „Eksportujesz kontakty do vCard, pobierasz CSV z rejestrem — wszystko jest twoje." (80 zn) | `Cennik.faq.o4` `:117` | `Obawy.o3` `:165` (`/`) — **pełny ciąg `/cennik` jest podciągiem ciągu `/`** |
| **Ł-4** | „Rezygnujesz kiedy chcesz." (25 zn) | `Cennik.faq.o3` `:115` zd. 1 · `ZamkniecieCennik.zdanie` `:178` (ogon) | `Obawy.o3` `:165` zd. 1 (`/`) |
| **Ł-5** | „DMO — Dzienny Plan Działania" | `Cennik.plany.starter.pozycja2` `:72` | `FunkcjePozyskiwanie.mod7_nazwa` `:236` · `SN:17` |
| **Ł-6** | „Sala Treningowa" | `Cennik.plany.starter.pozycja4` `:74` · `Cennik.tabela.sesje` `:98` | `FunkcjePozyskiwanie.mod9_nazwa` `:234` · `SN:19` |
| **Ł-7** | „Czysty eksport — twoje materiały bez sygnatury polecającej" | `Cennik.plany.pro.pozycja4` `:89` | `DlaKogo.s3_plan_3` `:387` (**poza panelem siedmiu tras**) |

**Dlaczego ich nie znalazłem:** mapa §1 powstała ze skanu **sześciu tras wobec siebie**.
`/cennik` nie była wtedy w zakresie, więc łańcuchy z jedną nogą na `/cennik` były niewidoczne
z definicji. **Ł-7 pokazuje granicę ostrzej:** jego druga noga leży na `/dla-kogo`, czyli
**poza siedmioma trasami** — rozszerzenie zakresu o `/cennik` ujawniło łańcuch wychodzący
poza rozszerzony zakres. Wniosek metodyczny: **mapa łańcuchów musi być skanem całej warstwy
`pl.json`, nigdy skanem zakresu panelu** — inaczej każde rozszerzenie zakresu produkuje
nowe łańcuchy, a to nie jest własność serwisu, tylko artefakt metody.

## 52.2 Dowód arytmetyczny: `Obawy.o3` jest **rozciętym zdaniem `/cennik`**

```
Obawy.o3            = 106 zn   [STAN, pl.json:165; deklaracja obawy.md:30 = 106]
Cennik.faq.o3 zd.1  =  25 zn   („Rezygnujesz kiedy chcesz.")
Cennik.faq.o4       =  80 zn   [STAN, pl.json:117; deklaracja cennik.md:90 = 80]
25 + 1 (spacja) + 80 = 106     ✔ co do znaku
```

To nie jest zbieg okoliczności — `Obawy.o3` na `/` jest **złożeniem pierwszego zdania
`Cennik.faq.o3` i całego `Cennik.faq.o4`**. Skutek: **obie nieprawdy stoją jednocześnie
na `/` i na `/cennik`** (§52.3 poz. 2 i 3), a jedna naprawa musi objąć **trzy klucze w PL**.

**Łańcuch Ł-3 istnieje WYŁĄCZNIE w PL** — EN i DE już się rozeszły:

| | pl | en | de |
|---|---|---|---|
| Ł-3 | **verbatim** | **NIE** — `Cennik.faq.o4` „You export contacts…" vs `Obawy.o3` „…Export contacts…" | **NIE** — „Du exportierst deine Kontakte…" vs „…Kontakte exportierst du…" |

Naprawa uzgodniona po polsku **rozjedzie się z EN/DE**, jeśli nie zostanie zaplanowana
per język. Dziś nikt tego nie zauważy, bo żaden strażnik nie porównuje tych kluczy.

## 52.3 Cztery twierdzenia `/cennik` wskazane przez panel — werdykty

| # | twierdzenie `[STAN]` | werdykt | dowód |
|---|---|---|---|
| 1 | `Cennik.plany.starter.pozycja2` „DMO — Dzienny Plan Działania, **który mówi, co dziś zrobić**" | **NIEPRAWDA** | `TO:42`: „**Planujesz** dzień w Dziennym Planie Działania." Podmiotem jest ona; zdanie karty stawia w podmiocie plan. **Rodzina Z-1 rozciąga się na CZTERY trasy, nie trzy** — dochodzi `/cennik`. Naprawa wtórna wobec **Z-A8** (§32) |
| 2 | `Cennik.faq.o4` „…— **wszystko jest twoje**" | **NIEPRAWDA (kwantyfikator)** | Pokryte dokładnie dwa kanały: `TO:39` (vCard) i `TO:148` (CSV Świadectwa). **Żaden wiersz** nie pokrywa eksportu postów, projektów Studia, kalendarza publikacji, danych zespołu, Akademii, odznak, Wrapped. **Kontrdowód na tej samej stronie:** `Cennik.plany.pro.pozycja4` „Czysty eksport — twoje materiały **bez sygnatury polecającej**" implikuje, że poza Pro materiały niosą cudzą sygnaturę. `karta-tonu.md:89` nazywa wzorzec: „«wszystko, czego potrzebujesz» \| **obietnica-worek** \| lista tego, co naprawdę jest" |
| 3 | `Cennik.potwierdzenie2` „Eksport danych **zawsze**: vCard i CSV" | **NIEPRAWDA (kwantyfikator)** | `TO:12-13`: „wszystko poniżej zakłada aktywną subskrypcję Stripe. **Bez niej żadna funkcja API nie jest dostępna.**" Pochodzenie: `projekt-cennik.md:84-86` `[PROPOZYCJA]` — kwantyfikator wszedł z projektu, **bez wiersza pokrycia** |
| 4 | `Cennik.faq.o3` „Rezygnujesz kiedy chcesz. **Nie musisz podawać powodu**." | **CZĘŚCIOWO OBALONE — fraza ZOSTAJE**, status prawdy **NIEWERYFIKOWALNE** | `content/pl/zamkniecie.md:36-42` `[STAN, status OBOWIĄZUJE]`: „Ta fraza **ZOSTAJE**; rozstrzygnięcie właściciela 2026-08-15 […] fraza jest prawdziwa wobec kodu […] i była sankcjonowana wcześniej". Ten sam plik `:44-49`: „prawdziwość wobec kodu jest tu **twierdzeniem właściciela, nie dowodem wykonanym w tym repozytorium**". **Nie jest to defekt do usunięcia** |
| **4-bis** | rozjazd dokumentu | **NOWE** | Rejestr poz. 14, kolumna „Gdzie": „zamknięcie pkt 25 (odrzucone przez panel)" — **kolumna pomija `/cennik`**, choć fraza stoi tam ×3 języki. **Trzeci przypadek klasy z §14** („kolumna «Gdzie» pomija trasę") |

## 52.4 Szew paska potwierdzeń — **żaden strażnik go nie pilnuje**

Dwie pary wartości identycznych na dwóch trasach:

| ciąg | klucz `/` | klucz `/cennik` | pl / en / de |
|---|---|---|---|
| „Rezygnacja w każdej chwili" | `Hero.potwierdzenieRezygnacja` `:28` | `Cennik.potwierdzenie1` `:120` | identyczne we wszystkich trzech |
| „Dane przechowywane w UE" | `Hero.potwierdzenieUE` `:27` | `Cennik.potwierdzenie3` `:122` | identyczne we wszystkich trzech |

**Kluczy współdzielonych: zero.** To **cztery osobne klucze o dwóch parach identycznych
wartości**, ×3 języki = **12 kluczy, 6 par**. Ciągi są **zduplikowane, nie współdzielone** —
zasada §1.5 („zmiana ciągu łańcuchowego jest zmianą we wszystkich jego miejscach naraz")
**nie egzekwuje się tu sama z siebie**.

| zmiana | co pociąga | strażnik |
|---|---|---|
| brzmienie `Cennik.potwierdzenie1/2/3` | **obowiązkowo** `content/{pl,en,de}/cennik.md` §6 | `e2e/cennik.spec.ts:326-368` — znak w znak, czerwień natychmiast |
| brzmienie `Hero.potwierdzenieUE/Rezygnacja` | **nic w kodzie** — strażniki znak-w-znak istnieją dla `cennik.md`, `dla-kogo.md`, `filary.md`, `funkcje.md`, `funkcje-*.md`, **nie dla `naglowek.md`** | **brak** |
| liczba pozycji w hero | 2 → czerwień | `e2e/hero.spec.ts:59` `toHaveCount(2)` |
| liczba pozycji `/cennik` | 3 → czerwień | `e2e/cennik.spec.ts:98-99` |
| markup `PasekPotwierdzen.tsx` | uderza w **obie** trasy naraz ×3 języki = 6 stron | `hero.spec.ts:57-58` + `cennik.spec.ts:97` |

**Ustalenie wiążące:** grep po `e2e/*.ts` na `potwierdzenie` — **dziesięć trafień, zero asercji
krzyżowej**. Jednostronna edycja **przechodzi wszystkie bramki na zielono** i produkuje dwa
brzmienia jednej obietnicy na dwóch trasach.

**Asymetria do nazwania:** strona **bogatsza** w potwierdzenia (`/cennik`, 3 pozycje) ma pełny
strażnik znak-w-znak; strona **uboższa** (`/`, 2 pozycje) nie ma żadnego. **Dryf pójdzie
od strony `/`** — i tam właśnie panel będzie przepisywał zdania.

## 52.5 Dryf deklaracji: **30/30 zgodnych na `/cennik`** wobec **2/11 rozjazdów na `/`**

Sprawdzono 30 deklaracji znaków w `content/pl/cennik.md` wobec `pl.json`: **30/30, zero
rozjazdów**. Kontrast z §9 (trasa `/`: 2 z 11 dryfują).

**Przyczyna nazwana:** `e2e/cennik.spec.ts:326-388` — strażnik znak-w-znak obejmuje **30 pól
literalnych ×3 języki**. Strażnik **nie liczy znaków**, ale wymusza jednoczesną edycję obu
warstw, **odbierając drogę, którą dryf powstaje na `/`**.

To jest odpowiedź na pytanie ze §9, dlaczego `/` dryfuje: nie dlatego, że ktoś tam pracuje
niestaranniej, tylko dlatego, że **`naglowek.md` jest jedynym plikiem treści panelu bez
strażnika znak-w-znak**. Wada jest w rozkładzie strażników, nie w ludziach.

## 52.6 Z-C3 — **druga pozycja klasy „SPEŁNIONY, POWRÓT NIEWYKONANY"**

§23 pytało: czy Puls jest jedyną pozycją tej klasy. **Odpowiedź: nie jest.**

Rejestr poz. 5 rozdziela w jednej komórce dwie rzeczy: wiersz liczbowy zablokowany (klucz
Anthropic nieaktywny), ale **„Język kierunku o asystencie AI w opisach — dozwolony już teraz"**.
**Trzy podstrony z tego korzystają. `/cennik` nie.** Warunek spełniony, powrót niewykonany.

Pozostałe pozycje rejestru dotyczące `/cennik` sprawdzone i **niespełnione**: 2, 3, 4, 6, 10,
12, 14. Poz. 11 (Puls) **spełniona i wykorzystana** na karcie Growth — z zastrzeżeniem N-C1.

## 52.7 P0-4 rozstrzygnięte kierunkowo: **fałsz siedzi na `/`, nie na `/cennik`**

| źródło | brzmienie `[STAN]` | pokrycie |
|---|---|---|
| `/` S11 · `CennikSkrot.roznica` `:155` | „Wszystkie plany prowadzą twoje kontakty i wyniki — Growth dodaje do tego **widok całego zespołu**." | **BRAK.** „Widok zespołu" nie jest bramkowany żadnym wierszem. `TO:144` stawia „aktywność zespołu" na Pulpicie **bez bramki**; `TO:250` daje Starterowi **10 osób** |
| `/cennik` karta Growth `:80-81` | „Puls zespołu — widzisz sygnały ryzyka odejścia…" · „Widzisz całe drzewo struktury swojego zespołu" | **PEŁNE** — `TO:121` + `TO:122`, bramki `TO:229` + `TO:230` |
| `/cennik` tabela `TabelaPorownawcza.tsx:46-50` | `puls` [—,✓,✓] · `drzewo` [—,✓,✓] · `zespol` = **10 / 50 / bez limitu** | **PEŁNE** — `TO:249-252` |

**Trzy niezależne dowody, że naprawiać trzeba `/`:**
1. Karta Growth nazywa **dwie** bramkowane funkcje; `/` nazywa **jedną frazę**, która nie
   odpowiada żadnej z nich.
2. **`/cennik` obala `/` własnym wierszem tabeli** („Zespół 10" dla Startera) — na tej samej
   ścieżce klikania, bo `CennikSkrot.link` prowadzi na `/cennik`.
3. Pochodzenie kondensacji zapisane: `projekt-cennik.md:94-97` `[PROPOZYCJA]` „JEDNA
   najważniejsza różnica (propozycja: «Growth dodaje widok całego zespołu» — **Puls + drzewo**,
   język kierunku)". Dwie funkcje skondensowano w jedną frazę; **kwalifikator i prawda zginęły
   w kondensacji**.

**Wkład nowy — C-05:** `Cennik.plany.starter.pozycja1` opisuje Pulpit jako „jeden ekran,
na którym widzisz **swoje kontakty i wyniki**" — ta sama para rzeczowników co w
`CennikSkrot.roznica`, z **wyciętym trzecim członem `TO:144`** („aktywność zespołu").
**Dwie kondensacje wzmacniają się nawzajem:** gdyby karta Startera niosła pełne `TO:144`,
fałszywa bramka z `/` byłaby widoczna jednym spojrzeniem. **Naprawa S11 bez naprawy C-05
zostawia połowę mechanizmu przy życiu (R-A).**

## 52.8 Cztery pary sprzeczności C-1…C-4 — **inna rodzina niż trzy z §34**

| # | przedmiot | korzyść `[STAN]` | granica `[STAN]` | R-G |
|---|---|---|---|---|
| **C-1** | czym różnią się plany | `Cennik.naglowek` „Plany różnią się zakresem, **nie obietnicami**" · `Cennik.wstep` „Każdy plan to **ten sam system**." | `Cennik.tabela.pozaPlanem` „**poza planem**" (sr-only ×2 w kolumnie Starter) · „Wszystko ze Startera, **a do tego**:" · „Wszystko z Growth, **a do tego**:" | **GRANICA WYGRYWA.** `TO:121` i `TO:122` **są wierszami obietnic wyłącznie Growth**. Do przepisania: `Cennik.naglowek` + człon 1 `Cennik.wstep`. Tabela bez ruchu |
| **C-2** | zobowiązanie finansowe | `ZamkniecieCennik.zdanie` „**Niczym się nie wiążesz** — rezygnujesz kiedy chcesz." | **NIE ISTNIEJE.** Strona oferuje przełącznik „rocznie" z kwotą roczną i „oszczędzasz {kwota}" i **nie mówi ani słowa**, co dzieje się z opłatą roczną przy rezygnacji | **R-G NIE ROZSTRZYGA — granicy nie ma.** Wybór roczny **jest** zobowiązaniem na 12 miesięcy opłaconym z góry (interwał `year`). **To jest szew §37.4 w czystej postaci: korzyść powstała bez granicy.** Do właściciela — §52.9 |
| **C-3** | własność eksportowanych materiałów | `Cennik.faq.o4` „…— **wszystko jest twoje**." | `Cennik.plany.pro.pozycja4` „**Czysty** eksport — twoje materiały **bez sygnatury polecającej**" (**wyłącznie Pro**, `TO:233`) | **GRANICA WYGRYWA.** Do przepisania `Cennik.faq.o4` — **a wraz z nim `Obawy.o3` na `/`** (łańcuch Ł-3, PL verbatim). Karta Pro bez ruchu |
| **C-4** | możliwość wyboru planu dziś | `Cennik.cta` „**Wybierz plan**" (4 linki/język) · „Wybierz plan i sprawdź, jak działa…" · `Cennik.faq.o2` „**Wybierasz plan** i zmieniasz go kiedy chcesz." | `StronaLogowania.tresc` „Logowanie będzie dostępne **przy premierze aplikacji**." | **GRANICA WYGRYWA co do faktu**, ale to pozycja **premierowa** (T7, §3), nie redakcyjna. **`/cennik` wnosi 12 z 21 wezwań** prowadzących na `/login` |

**Bilans: trzy pary na sześciu trasach (§34) + cztery na `/cennik` = siedem par w serwisie.**

**Różnica klasy — ustalenie ważniejsze od samych par.** Pary 1–3 to **polaryzacja czasownika
sprawstwa wewnątrz jednej przestrzeni**. Pary C-1…C-4 to **inna rodzina: korzyść zaprzeczona
przez MECHANIKĘ STRONY** — tabelę, przełącznik okresu, cel linku — **nie przez zdanie granicy**.

**Szkic bramki z §34 (czasownik + podmiot + polaryzacja) nie złapie ŻADNEJ z czterech.**
Zapisuję to wprost, żeby bramka nie została uznana za pokrywającą `/cennik`. Bramka
porównująca zdania nie widzi tabeli, przełącznika ani celu linku — a to są dziś **trzy
z czterech źródeł sprzeczności na tej trasie**.

## 52.9 C-2 do decyzji właściciela — **zmiana zakresu obietnicy, nie brzmienia**

Zgodnie z §37 („zmiana znaczenia zawsze przez decyzję, zmiana brzmienia przez panel"),
C-2 **nie wchodzi do panelu**. Dwie drogi:

- **A — dopisać granicę:** np. „przy planie rocznym płacisz z góry za rok". Zdanie korzyści
  zostaje, przestaje być nieprawdą. **Wymaga wiersza pokrycia w tabeli obietnic** (dziś go nie ma).
- **B — zdjąć kwantyfikator:** usunąć „niczym się nie wiążesz", zostawić „rezygnujesz kiedy
  chcesz". Nie wymaga nowego wiersza. **Ale nie mówi czytelniczce prawdy o planie rocznym** —
  usuwa fałsz, nie dostarcza faktu.

**Rekomendacja: A.** Powód: R-A — usunięcie zdania nie zmienia tego, co czytelniczka pomyśli,
klikając „rocznie". Wariant B usuwa ciąg, nie skutek.

## 52.10 Trzecie wystąpienie klasy R-C/T21: **pięć osi limitów odesłanych do trzech pozycji**

Wszystkie pięć wykluczonych osi limitów ma **zapisany powód**. Rejestr obejmuje **trzy**:

| oś | powód | pozycja rejestru |
|---|---|---|
| przestrzeń na pliki | ✔ | **poz. 4** |
| wywołania AI | ✔ | **poz. 5** |
| platformy social | ✔ | **poz. 6** |
| **strony www** | ✔ („limit nieegzekwowany") | **BRAK** |
| **PDF** | ✔ („generator martwy") | **BRAK** |

Mimo to **trzy dokumenty odsyłają wszystkie pięć** do rejestru:
- `tabela-obietnic.md:254-258` `[STAN]`: „…strony www […], PDF […] → **rejestr warunków
  powrotu (poz. 4–6)**."
- `content/pl/cennik.md:71-74` `[STAN]`: ta sama lista pięciu → „**rejestr warunków powrotu**."
- `TabelaPorownawcza.tsx:12-13` `[STAN kodu]`: „Kategorie wykluczone
  (**storage/AI/social/pdf/www**) NIE ISTNIEJĄ w tabeli — **rejestr warunków powrotu poz. 4–6**."

**Odesłanie wygląda na sprawdzalne i nie jest.** Skutek praktyczny: gdyby generator PDF ożył
albo limit stron www zaczął być egzekwowany, **nic o tym nie przypomni** — z tą różnicą wobec
§23, że tutaj **warunku nawet nie zapisano**. Dwie osie stoją poza całym mechanizmem powrotu.

## 52.11 N-C1 — zasięg wyjątku Pulsu, do rozstrzygnięcia

Trzy dokumenty, **dwa różne zasięgi**:

| dokument | brzmienie | zasięg |
|---|---|---|
| `panel-cennik.md:32-33` `[PROPOZYCJA]` | „Fraza Pulsu bez kwalifikatora żyje TYLKO na karcie Growth; **poza cennikiem** obowiązuje pełna forma" | **wewnętrznie sprzeczny w jednym zdaniu** — druga połowa dopuszcza wiersz tabeli |
| `slownik-nazw.md:13` `[STAN, OBOWIĄZUJE]` | „**poza kartą Growth**: pełna forma «W planie Growth…»" | **wąski** — wiersz tabeli objęty zakazem |
| rejestr poz. 11 `[STAN, OBOWIĄZUJE]` | „Fraza Pulsu poza kartą Growth \| **wszystkie treści** \| Zawsze pełna forma" | **wąski + globalny** |

Dziś `/cennik` **respektuje zakaz na karcie Growth i nie respektuje go w wierszu tabeli**
(`Cennik.tabela.puls` „Puls zespołu", bez kwalifikatora, poza kartą). §10 zaklasyfikowało
ten wiersz jako „treść legalną (poz. 11)" — **to była klasyfikacja na potrzeby strażnika
milczenia**, nie rozstrzygnięcie zasięgu. **Dwa pytania zbiegły się w jednym zdaniu.**

**Do właściciela, jedno pytanie:** czy „karta Growth" oznacza **kartę planu** (wtedy wiersz
tabeli wymaga pełnej formy albo kolumny nagłówkowej jako kwalifikatora), czy **stronę
`/cennik`** (wtedy `SN:13` i poz. 11 wymagają przepisania)? **Zakaz zaokrąglania w obie strony
(§37) obowiązuje.**

**Wobec §37.1:** `/cennik` **nie jest miejscem konfliktu** — pełna forma byłaby zbędna na
karcie i niemożliwa w komórce tabeli. Konflikt jest wyłącznie na `/` (S11). `/cennik` dostarcza
natomiast **gotowe, pokryte brzmienie obu bramkowanych funkcji**, którego S11 potrzebuje.

## 52.12 Fałszywe trafienia — sprawdzone i ODRZUCONE, **nie ścigać po raz drugi**

| kandydat | dlaczego NIE jest sprzecznością |
|---|---|
| „Eksport danych **zawsze**" ↔ „importu hurtowego nie ma" | Różny przedmiot: eksport vs import. Wada „zawsze" realna, ale to wada **pokrycia** (§52.3 poz. 3) |
| „Tarcza — **sprawdza**" ↔ „Tarcza **nie poprawi** tekstu" | Różny przedmiot: sprawdzanie vs poprawianie. `TO:77` zgodne co do słowa |
| „kontakty **trafiają prosto do bazy**" ↔ „Catherly **nie wyśle** ci e-maila" | Różny przedmiot: zapis do bazy vs powiadomienie |
| „DMO… **mówi, co dziś zrobić**" ↔ „Dzienny Plan Działania **niczego nie wysyła**" | Różny przedmiot. To **odwrócone sprawstwo** (rodzina Z-1) → naprawa przyczyny **Z-A8**, nie bramka par |
| „Sala Treningowa — ćwiczysz…" ↔ „Sesje: 5 miesięcznie" | **Limit nie jest zaprzeczeniem.** Konstrukcja karta+tabela jest **projektowa** (`projekt-cennik.md:47-69`), nie defektowa |
| „Puls — widzisz sygnały ryzyka" ↔ `DlaKogo.s2_granica` „nie oceni za ciebie, kto wyhamował" | Różny przedmiot: pokazanie sygnału vs wydanie oceny |

## 52.13 Bilans siódmej trasy

| co | liczba |
|---|---|
| łańcuchy verbatim dopisane do mapy §1 | **5** (Ł-3…Ł-7), w tym jeden wychodzący poza siedem tras |
| twierdzenia NIEPRAWDA potwierdzone | **3** |
| twierdzenia NIEWERYFIKOWALNE stojące na decyzji z datą | **1** |
| pary sprzeczności nowej rodziny | **4** (C-1…C-4) |
| pary odrzucone jako fałszywe trafienia | **6** |
| pozycje klasy „spełniony, powrót niewykonany" | **+1** (Z-C3) — łącznie **2** |
| wystąpienia klasy R-C/T21 | **+1** — łącznie **3** |
| punkty decyzyjne właściciela nowe | **2** (C-2 zakres obietnicy, N-C1 zasięg poz. 11) |
| dryf deklaracji | **0/30** — wzorzec do przeniesienia na `/` |

---

# 53. SPROSTOWANIE — TWIERDZENIE O STRAŻNIKU `naglowek.md` JEST NIEPRAWDĄ

**Dotyczy §52.4, §52.5 i mojego meldunku z 2026-08-21.** Właściciel przyjął to
twierdzenie jako pozycję i nazwał je „dowodem dla kanonu mocniejszym niż cokolwiek
z dziś". **Twierdzenie nie stoi. Zapisuję to przed czymkolwiek innym.**

## 53.1 Co zostało powiedziane i co jest prawdą

| twierdzenie (§52.4/§52.5) | stan faktyczny `[STAN kodu]` |
|---|---|
| „strażniki znak-w-znak istnieją dla `cennik.md`, `dla-kogo.md`, `filary.md`, `funkcje.md`, `funkcje-*.md` — **nie dla `naglowek.md`**" | **NIEPRAWDA.** `e2e/hero.spec.ts:174-192`: „Strażnik «znak w znak»: messages ↔ content/naglowek.md" — test `treść hero: messages znak w znak z content/*/naglowek.md`, pętla po `Object.entries(komunikaty.Hero)` ×3 języki |
| „brzmienie `Hero.potwierdzenieUE/Rezygnacja` — **nic nie pociąga w kodzie**" | **NIEPRAWDA.** Oba klucze są w `komunikaty.Hero`, więc obejmuje je ta sama pętla. Zmiana brzmienia bez zmiany `content/{pl,en,de}/naglowek.md` = czerwień |
| „strona uboższa (`/`) **nie ma żadnego** [strażnika]" | **NIEPRAWDA.** Ma — i to **wzorcowy**. `filary.spec.ts:157` cytuje go jako źródło: „wzorzec **hero.spec** — adwersarz Etapu C, ustalenie 1" |
| „Przyczyna [dryfu]: strażnik znak-w-znak… odbiera drogę, którą dryf powstaje na `/`" | **NIEPRAWDA jako przyczyna.** Strażnik porównuje **tekst**, nigdy **liczbę znaków**. Jest wobec dryfu deklaracji **obojętny** |
| „30/30 deklaracji zgodnych w `content/pl/cennik.md`" wobec „2 z 11 na `/`" | **Obie liczby z niepełnej próby.** Pomiar całościowy — §53.2 |

## 53.2 Pomiar całościowy zamiast próby

Skrypt (`scratchpad/tor9/licznik2.py`, poza repozytorium): dla każdego ciągu
`messages` dłuższego niż 12 znaków szuka wystąpienia w plikach `content/{jezyk}/*.md`
i wymaga, by deklaracja stała **bezpośrednio po ciągu** (dozwolone tylko znaki
interpunkcji i markdownu). Obsługuje oba formaty deklaracji obecne w repozytorium:
`*(N zn)*` oraz `**N znaków.**`.

**Wynik: 305 dopasowanych deklaracji ×3 języki — 288 zgodnych, 17 zapaleń.**
Z 17 zapaleń **7 to artefakty pomiaru** (deklaracja opisuje ciąg **złożony**:
`Problem.tresc`+`Problem.kropka` ×3 języki, `RytmDnia.krok3Tresc`+`RytmDnia.kropka`
×3 języki, `Obawy.o3` = `Cennik.faq.o3` zd.1 + `Cennik.faq.o4`). Sprawdzone
arytmetycznie — każdy składa się co do znaku.

**Dziesięć rzeczywistych rozjazdów:**

| jezyk | plik | klucz | dekl. | fakt. | |
|---|---|---|---|---|---|
| pl | `naglowek.md` | `Hero.naglowek` | 62 | **58** | −4 |
| pl | `filary.md` | `Filary.filar1.konkret1` | 71 | **68** | −3 |
| pl | `filary.md` | `Filary.filar1.konkret2` | 74 | **73** | −1 |
| pl | `filary.md` | `Filary.filar1.konkret3` | 67 | **66** | −1 |
| pl | `filary.md` | `Filary.filar2.konkret2` | 65 | **66** | +1 |
| pl | `filary.md` | `Filary.filar3.konkret1` | 75 | **72** | −3 |
| pl | `filary.md` | `Filary.filar3.konkret3` | 60 | **63** | +3 |
| pl | `obawy.md` | `Obawy.p1` | 41 | **42** | +1 |
| pl | `definicja.md` | `Definicja.tresc` | 275 | **256** | −19 |
| en | `cennik.md` | `Cennik.plany.starter.pozycja2` | 65 | **57** | −8 |

## 53.3 Co ten pomiar obala i co ustala

**Obala trzy rzeczy naraz:**

1. **Obala §52.5.** `filary.md` **ma** strażnik znak-w-znak (`filary.spec.ts:159`)
   i niesie **sześć** rozjazdów — najwięcej ze wszystkich plików. `cennik.md` ma
   strażnik i niesie jeden (EN). `naglowek.md` ma strażnik i niesie jeden.
   **Obecność strażnika nie koreluje z dryfem w żadną stronę.**
2. **Obala §9 co do drugiego wiersza.** `Filary.filar1.naglowek`: `filary.md:17`
   deklaruje **„34 znaki"** *(korekta licznika 2026-08-12, tryb A-3 — brzmienie bez
   zmian)*, `pl.json` ma **34**. **Zgodne. Rozjazdu nie ma.** Liczba 32 nie występuje
   dziś w żadnym pliku treści (grep na „32 znak": zero trafień).
3. **Obala §9 co do liczby.** „Dwa z jedenastu" pochodziło z próby jedenastu
   deklaracji. Pełna próba na trasie `/` to **dziewięć rozjazdów** (naglowek 1,
   filary 6, obawy 1, definicja 1). Wada jest **rzędu wielkości większa**, niż
   zapisałem.

**Ustala jedną rzecz, prostszą i mocniejszą od obalonej:**

> **Żaden mechanizm w repozytorium nie porównuje deklarowanej liczby znaków
> z faktyczną.** Strażnik znak-w-znak porównuje tekst z tekstem. `bramka:liczby`
> pilnuje — zgodnie z §9 — „liczb **w** treści, nie liczb **o** treści".
> Deklaracje są liczbami o treści. Leżą poza wszystkim.

## 53.4 Znalezisko poboczne: **dwie deklaracje jednego ciągu, obie fałszywe**

`content/pl/definicja.md` deklaruje ten sam ciąg **dwa razy, dwoma różnymi liczbami**:
- `:24` `[STAN]` — „**275 znaków, 3 zdania.**"
- `:41` `[STAN]` — „Treść (**265 zn**): «Prowadzi twoje kontakty: …»"

Faktycznie **256**. Obie deklaracje nieprawdziwe, obie różne. Dwa formaty deklaracji
w jednym pliku — to samo, co dwa formaty w repozytorium (`*(N zn)*` vs `**N znaków.**`).

## 53.5 Klasa błędu — moja, nie fundamentu

To **czwarte** wystąpienie tej samej klasy w tym torze (B1, B2, B3 — §26).
Ale mechanizm jest inny i trzeba go nazwać osobno: **przyjąłem twierdzenie
negatywne agenta bez wykonania jego negacji.** „Nie ma strażnika dla X" jest
sprawdzalne jednym gremem — i nie sprawdziłem, bo twierdzenie **pasowało do
wyjaśnienia**, którego szukałem (dlaczego `/` dryfuje, a `/cennik` nie).

**R-E mówi: twierdzenie o stanie obecnym wyłącznie z warstwy renderowanej.**
R-E nie objęła twierdzeń **o kodzie i o strażnikach**. Rozszerzam:

> **R-H:** twierdzenie o **nieistnieniu** (brak strażnika, brak asercji, brak
> pozycji, brak pokrycia) wymaga w zapisie **komendy, która to wykazała**,
> i jej wyniku. „Nie znalazłem" nie jest tym samym co „nie ma".

Przykład stosowania — §52.4 zawierało **dwa** twierdzenia negatywne. Jedno padło,
drugie **stoi**, bo miało komendę: „grep po `e2e/*.ts` na `potwierdzenie`:
dziesięć trafień, zero asercji krzyżowej". **Powtórzone dziś: dziesięć trafień,
zero asercji krzyżowej — potwierdzone.**

## 53.6 Co ze §52.4 zostaje w mocy

| twierdzenie | status po weryfikacji |
|---|---|
| Klucze `Hero.potwierdzenie*` i `Cennik.potwierdzenie*` to **osobne klucze o identycznych wartościach** (12 kluczy, 6 par) | **STOI** |
| **Żaden strażnik nie asertuje `Hero.potwierdzenieUE == Cennik.potwierdzenie3`** ani pary drugiej | **STOI** — grep powtórzony |
| Jednostronna edycja jednej nogi pary **przechodzi wszystkie bramki na zielono** | **STOI — i jest ostrzejsze, niż napisałem.** Obie nogi mają własny strażnik znak-w-znak, więc jednostronna edycja przechodzi **nie z powodu braku strażnika, tylko dlatego, że każdy strażnik pilnuje swojej połowy i żaden nie patrzy w bok.** Dwa poprawnie działające mechanizmy, luka dokładnie pomiędzy nimi |
| Asymetria `/` vs `/cennik` w rozkładzie strażników | **UPADA** |
| Wniosek „wada w rozkładzie strażników, nie w ludziach" | **UPADA jako uzasadniony tym dowodem.** Wada jest realna, ale leży w **kategorii, której żaden strażnik nie obejmuje**, nie w ich rozkładzie |

Ostatni wiersz jest ważniejszy od sprostowania: **dwa poprawne strażniki i luka
między nimi** to inna klasa niż „brakuje strażnika". Pierwszej nie da się zamknąć
kopiowaniem wzorca — a dokładnie to zaproponowałem.

---

# 54. LICZNIK DEKLARACJI — propozycja mechanizmu, bez implementacji

Zlecenie właściciela brzmiało: strażnik dla `naglowek.md` na wzór `cennik.spec.ts`,
z weryfikacją wsteczną na dwóch rozjazdach z §9.

**Zlecenie wykonalne nie jest — i to jego własne kryterium przyjęcia to wykazało.**

## 54.1 Dlaczego przeniesienie wzorca nie zadziała

1. `naglowek.md` **już ma** ten strażnik (§53.1). Nie ma czego przenosić.
2. Strażnik znak-w-znak porównuje **tekst**. Rozjazd deklaracji jest rozjazdem
   **liczby**. Gdyby go przenieść jeszcze raz, **zapaliłby się na zero z dziesięciu**.
3. Drugiego rozjazdu z §9 **nie ma dziś w repozytorium** (§53.2).

**Kryterium wsteczne właściciela zadziałało dokładnie tak, jak miało: odrzuciło
mechanizm przed implementacją, na podstawie premisy, która okazała się fałszywa.**
Gdyby kryterium brzmiało „zbuduj i zobacz", zbudowałbym strażnik świecący na zielono
przy dziesięciu żywych rozjazdach — czyli **bramkę, która uczy, że jest dobrze**.

## 54.2 Mechanizm, który przechodzi weryfikację wsteczną

**Nie strażnik e2e — linter, jak `bramka:liczby`.** Powód: przedmiotem nie jest
strona renderowana, tylko zgodność dwóch plików źródłowych. Playwright do tego
nie jest potrzebny, a pre-commit działa wcześniej niż CI.

| element | rozstrzygnięcie | powód z pomiaru |
|---|---|---|
| **wejście** | `src/i18n/messages/{pl,en,de}.json` + `content/{pl,en,de}/*.md` | te same dwie warstwy, które porównuje strażnik znak-w-znak — mechanizm jest jego **liczbowym dopełnieniem**, nie zamiennikiem |
| **dopasowanie** | ciąg `messages` → wystąpienie w md → deklaracja **bezpośrednio po ciągu** | luźniejsze dopasowanie dało **56 zapaleń, w większości fałszywych** (krótkie ciągi trafiają w środek cudzych zdań). Zawężenie do bezpośredniego sąsiedztwa zbiło je do 17 |
| **oba formaty** | `*(N zn)*` **i** `**N znaków.**` | repozytorium używa obu; linter na jeden format przeoczyłby całe pliki |
| **ciągi złożone** | **notacja jawna wymagana** | 7 z 17 zapaleń to deklaracje opisujące **sumę dwóch kluczy** (`Problem.tresc`+`kropka`, `RytmDnia.krok3Tresc`+`kropka`, `Obawy.o3`). To konstrukcja **legalna i celowa** — bez notacji linter byłby czerwony w dniu wprowadzenia na siedmiu nie-defektach. **Ta sama konstrukcja co w T21 punkt (3)** — bramka nie może zgadywać po kształcie |
| **próg długości** | ciągi < 12 znaków poza zasięgiem | krótkie ciągi („Puls zespołu", 12 zn) trafiają jako podciąg w dowolne miejsce pliku. **Zapisać jako jawnie zadeklarowaną granicę**, nie przemilczeć |
| **kontrola negatywna** | w tym samym przebiegu | kanon |

## 54.3 Weryfikacja wsteczna — wykonana

Prototyp uruchomiony na czubku `69c2dab`:

- **zapala się na 10 rozjazdach** wymienionych w §53.2, w tym na jedynym
  rzeczywistym rozjeździe z §9 (`Hero.naglowek` 62/58);
- **milczy na 288 zgodnych deklaracjach** — kontrola negatywna spełniona;
- **milczy na 7 deklaracjach złożonych** dopiero po dodaniu reguły sąsiedztwa;
  bez niej zapalał się na nich, czyli **wersja pierwsza była fałszywie czerwona**
  i to też jest wynik pomiaru, nie rozumowanie.

**Prototyp leży poza repozytorium** (`scratchpad/tor9/licznik2.py`). Zgodnie
z §37 nie implementuję.

## 54.4 Czego ten mechanizm NIE rozwiązuje

- **Nie pilnuje pary międzytrasowej** (`Hero.potwierdzenieUE` ↔ `Cennik.potwierdzenie3`).
  To osobna luka — §53.6, wiersz ostatni.
- **Nie wie, która liczba jest prawdziwa.** Zapala się na niezgodności; poprawia
  człowiek. Przy `definicja.md` (§53.4) poprawić trzeba **dwie deklaracje**.
- **Nie obejmuje deklaracji bez ciągu obok** („62 znaki" stojące samotnie
  w dokumencie panelu). Poza zasięgiem z definicji.

---

# 55. C-2 — GRANICA ROZSTRZYGNIĘTA, A PIENIĄDZE SPRAWDZONE W KODZIE

## 55.1 Rozstrzygnięcie właściciela 2026-08-21

Granica wchodzi. Zakres: **przy planie rocznym płacisz z góry za dwanaście
miesięcy.** Bez eufemizmu, bez „w wygodnym modelu rocznym". Brzmienie do panelu,
znaczenie rozstrzygnięte.

## 55.2 Odczyt kodu aplikacji — **produkt TO rozstrzyga**

Właściciel: *„sprawdź, co dzieje się z pieniędzmi przy rezygnacji z planu rocznego
w trakcie […]. Jeśli produkt tego nie rozstrzyga w kodzie, to jest pozycja dla toru
aplikacji."*

Odczyt wykonany w `catherly-app/fbo-os`, gałąź `feat/cs-build` (kod aplikacji;
`main` niesie sam szkielet — §16). **Rozstrzyga.**

**`scripts/setup-stripe.ts:40-54` `[STAN kodu aplikacji]`:**
```js
const portal = await stripe.billingPortal.configurations.create({
  features: {
    invoice_history: { enabled: true },
    payment_method_update: { enabled: true },
    subscription_cancel: {
      enabled: true,
      mode: 'at_period_end',
      cancellation_reason: {
        enabled: true,
        options: ['too_expensive','missing_features','switched_service','unused','other'],
      },
    },
    subscription_update: { enabled: false },
  },
```

**Trzy odpowiedzi, z których dwie wykraczają poza zadane pytanie:**

| pytanie | odpowiedź z kodu | skutek dla treści |
|---|---|---|
| **Co z pieniędzmi przy rezygnacji rocznej w trakcie?** | `mode: 'at_period_end'` — **dostęp do końca opłaconego okresu, zwrotu proporcjonalnego nie ma.** Rezygnacja rocznej w miesiącu trzecim = usługa działa do miesiąca dwunastego, pieniądze zostają | Granica z 55.1 jest **prawdziwa i niepełna**. Pełna: płacisz z góry za rok, rezygnacja wstrzymuje odnowienie, **dostęp trwa do końca opłaconego okresu** |
| **Czy przepływ anulowania wymusza powód?** | `cancellation_reason: { enabled: true, options: [...] }` — portal **pyta o powód** z pięciopozycyjnej listy | **To jest warunek rejestru poz. 14, zadany dosłownie**: „Weryfikacja przepływu anulowania (**czy nie wymusza powodu — dowód**)". Odpowiedź częściowa: **ankieta jest włączona.** Czy odpowiedź jest wymagana do dokończenia anulowania — z kodu nie wynika; to zachowanie portalu Stripe. **§55.3** |
| **Czy plan da się zmienić?** | `subscription_update: { enabled: false }` — portal **nie pozwala zmienić planu** | Zderza się z `Cennik.faq.o2` „**Wybierasz plan i zmieniasz go kiedy chcesz.**" `[STAN]` — i z komunikatem samej aplikacji `en.json:1387` „Plan changes happen in the Stripe portal". **Aplikacja odsyła do portalu po czynność, którą portal ma wyłączoną** |

## 55.3 Zastrzeżenie, bez którego te trzy odpowiedzi są za mocne

`setup-stripe.ts` jest **skryptem konfiguracyjnym**, nie stanem. Wypisuje na końcu
`Dodaj do .env.local: STRIPE_PORTAL_CONFIG_ID=…`, a `billing-service.ts:325-330`
`[STAN kodu]` czyta tę zmienną i **dołącza konfigurację tylko, gdy istnieje**:
```js
const configurationId = process.env.STRIPE_PORTAL_CONFIG_ID
… ...(configurationId ? { configuration: configurationId } : {})
```
**Jeśli zmiennej nie ma, portal działa na konfiguracji domyślnej z dashboardu Stripe** —
a dashboard jest poza repozytorium, czyli **NIEWERYFIKOWALNY (R-C)**.

**Werdykt ścisły:** kod rozstrzyga **zamiar** (at_period_end, ankieta powodu,
zmiana planu wyłączona). **Stan efektywny** zależy od zmiennej środowiskowej
i od dashboardu i pozostaje nieweryfikowalny stąd.

## 55.4 Drugi przepływ anulowania — **inna semantyka w tym samym produkcie**

`src/lib/account/anulowanie-subskrypcji.ts:39` `[STAN kodu]`:
```js
await getStripe().subscriptions.cancel(subscription.stripeSubscriptionId)
```
**Bez `cancel_at_period_end`, bez parametru zwrotu.** To anulowanie **natychmiastowe**.
Ścieżka: usuwanie konta (`account-deletion-service`). Komentarz w pliku `:3-11`
`[STAN kodu]` opisuje, dlaczego moduł powstał: *„dane użytkowniczki znikają,
a Stripe co miesiąc dalej obciąża jej kartę […] zostaje reklamacja w banku."*

**Skutek: dwie różne semantyki w jednym produkcie** — rezygnacja przez portal
kończy okres, usunięcie konta ucina natychmiast. Klientka roczna, która **usunie
konto** w miesiącu trzecim, traci dziewięć opłaconych miesięcy od razu.

## 55.5 Pozycje dla toru aplikacji — zgłoszone osobno, poza redakcją

| # | rzecz | dlaczego to nie jest sprawa redakcji |
|---|---|---|
| **A-1** | `STRIPE_PORTAL_CONFIG_ID` — czy ustawiony w środowisku produkcyjnym. Bez tego cała konfiguracja z `setup-stripe.ts` jest martwa, a portal działa na nieznanych ustawieniach | Strona nie może opisać zachowania, które zależy od nieustawionej zmiennej |
| **A-2** | `cancellation_reason.enabled: true` wobec frazy „Nie musisz podawać powodu" stojącej na `/cennik` ×3 języki | **Dotyka rozstrzygnięcia właściciela z 2026-08-15**, którego uzasadnieniem było „anulowanie nie wymaga powodu". Kod pokazuje, że portal jest skonfigurowany, **żeby pytać**. Redakcja nie rozstrzygnie, czy pytanie jest wymuszeniem |
| **A-3** | `subscription_update: false` wobec „zmieniasz go kiedy chcesz" na `/cennik` i „Plan changes happen in the Stripe portal" w aplikacji | Sprzeczność **wewnątrz produktu**, nie między produktem a stroną |
| **A-4** | Dwie semantyki anulowania (portal `at_period_end` vs usuwanie konta natychmiast, bez zwrotu) | Decyzja produktowa o pieniądzach |

**A-2 jest z tych czterech najpilniejsza dla strony**, bo dotyczy zdania, które
stoi dziś w trzech językach i było przedmiotem osobnego rozstrzygnięcia.
**Nie proponuję jego zdjęcia** — §37 mówi, że zmiana znaczenia idzie przez decyzję,
a rozstrzygnięcie z 2026-08-15 obowiązuje. **Zgłaszam, że jego przesłanka ma teraz
kontrdowód z kodu**, i zostawiam decyzję.

---

# 56. P0-4 — C-05 WCHODZI DO NAPRAWY S11

**Rozstrzygnięcie właściciela 2026-08-21.** `Cennik.plany.starter.pozycja1`
wchodzi do naprawy S11 jako jej część, nie jako osobna pozycja.

**Zapis przy pozycji, brzmienie do przeniesienia:**
> **Naprawa S11 bez naprawy C-05 zostawia połowę mechanizmu przy życiu (R-A).**
> Dwa klucze tną ten sam wiersz `TO:144` w tym samym miejscu — obie kondensacje
> gubią trzeci człon („aktywność zespołu"). Gdyby karta Startera niosła pełne
> `TO:144`, fałszywa bramka z `/` byłaby widoczna jednym spojrzeniem na kartę.

**Klasa nazwana przez właściciela:** to samo, co **„naprawa pominęła drugą
implementację"** po stronie kodu — tu w treści, przy dwóch kluczach tnących ten sam
wiersz tabeli obietnic.

**Konsekwencja dla panelu:** przy każdej naprawie zdania opartego o wiersz tabeli
obietnic pytanie brzmi **nie** „czy to zdanie jest teraz prawdziwe", tylko
**„które jeszcze klucze czytają ten sam wiersz i czy tną go tak samo"**.
To pytanie da się zadać mechanicznie — tabela obietnic ma numery wierszy, a klucze
są przeszukiwalne. **Dziś nikt go nie zadaje.**

---

# 57. N-C1 ROZSTRZYGNIĘTE — „karta Growth" to KARTA PLANU

**Rozstrzygnięcie właściciela 2026-08-21, z uzasadnieniem:**
> Warunek poz. 11 mówi o **karcie planu w tabeli cennika**. Wszędzie indziej —
> łącznie z resztą `/cennik` poza kartą — obowiązuje pełna forma „W planie Growth…".
> Powód: warunek istnieje po to, żeby czytelniczka nie wzięła funkcji bramkowanej
> za dostępną w każdym planie. **Na karcie planu kontekst niesie sama karta;
> w prozie nie niesie go nic.**

## 57.1 Skutek natychmiastowy: `/cennik` jest dziś w naruszeniu

`Cennik.tabela.puls` `[STAN, pl.json:100]` — „**Puls zespołu**", 12 znaków,
wiersz tabeli porównawczej, **poza kartą planu**. Kwalifikator niesie kolumna
(— / ✓ / ✓) plus `sr-only` „poza planem" / „w planie".

**Wobec dzisiejszego rozstrzygnięcia wiersz tabeli jest poza wyjątkiem.**
Trzy drogi, wszystkie w gestii panelu (zmiana brzmienia, nie znaczenia):
- **A** — pełna forma w komórce: niemożliwa, komórka tabeli ma szerokość nazwy;
- **B** — nagłówek kolumny jako kwalifikator: kolumna **już** nosi nazwę planu,
  a `sr-only` mówi „poza planem"/„w planie" — do zbadania, czy to spełnia warunek
  „kontekst niesiony przez konstrukcję", czy nie;
- **C** — wiersz wypada z tabeli i zostaje wyłącznie na karcie Growth.

**Wariant B jest jedynym, który nie usuwa informacji** — i jedynym, który wymaga
rozstrzygnięcia, czy kolumna tabeli jest „kartą" w rozumieniu warunku.
**Nie rozstrzygam za właściciela; zapisuję, że rozstrzygnięcie 57 tego nie objęło.**

## 57.2 Skutek dla `panel-cennik.md`

`panel-cennik.md:32-33` `[PROPOZYCJA]` — „…**poza cennikiem** obowiązuje pełna
forma" — jest wobec dzisiejszego rozstrzygnięcia **nieprawdziwy** i sprzeczny
wewnętrznie (pierwsza połowa mówi „TYLKO na karcie Growth"). Dokument panelu,
nie dokument obowiązujący, więc nie zmieniam — **odnotowuję jako rozjazd
do sprzątnięcia razem z zamknięciem N-C1.**

`slownik-nazw.md:13` i rejestr poz. 11 mówią **„poza kartą Growth"** — obie
zgodne z dzisiejszym rozstrzygnięciem. **Bez zmian.**

---

# 58. POZ. 20 PRZENIESIONA — wykonane

## 58.1 Co zrobiono

Założony **`docs/faza-2/rejestr-decyzji-stojacych.md`** (nie było takiego rejestru).
Poz. 20 przeniesiona jako **D-1**. Kryterium rozdziału zapisane w nagłówku nowego
rejestru jednym zdaniem: **„czy jest coś do przywrócenia"**.

**Numeru NIE przenumerowano.** Wiersz 20 zostaje jako `~~20~~` z odesłaniem.
Powód: numery pozycji są cytowane w `tabela-obietnic.md:254-258`,
`content/pl/cennik.md:71-74`, `TabelaPorownawcza.tsx:12-13`, `slownik-nazw.md`
i w tym dokumencie. **Przenumerowanie unieważniłoby każde z tych odesłań w ciszy** —
czyli wyprodukowałoby dokładnie klasę T21/R-C, którą ten podział ma zmniejszać.

**Liczba pozycji treściowych: 23** (numery 1–24 z luką na 20).

## 58.2 Czy poz. 20 była jedyna — **NIE, i po obu stronach rejestru**

**Strona treściowa** — dwaj kandydaci, pełne brzmienie w §59.

**Strona techniczna (T1–T22) — ten sam problem, trzy gatunki w jednym miejscu.**
Sprawdzone tym samym kryterium. Dowodem jest cytat (R-F):

| gatunek | przykład z cytatem `[STAN dokumentu]` | ile |
|---|---|---|
| **dług z warunkiem powrotu** (właściwy gatunek) | T4: „(1) zielony pełny zestaw e2e jako dowód naprawy desktopu, (2) rozstrzygnięcie właściciela, czy obietnica ma obejmować < 768 px" | większość |
| **opis stały, nie dług** | **T16**: „**Otwarte na stałe jako opis granic, nie jako dług.** Warunek rewizji: powstanie pierwszej wyłączonej kontrolki…" — pozycja **sama nazywa siebie** nie-długiem | ≥1 |
| **zapis zamknięty, archiwalny** | **T3, T5, T6** — „~~T3~~ **ZAMKNIĘTE 2026-08-16**", „~~T5~~ **ZAMKNIĘTE 2026-08-15**", „~~T6~~ **ZAMKNIĘTE 2026-08-16**". Warunek spełniony, pozycja wykonana; leżą w rejestrze **otwartych** długów | **3** |

**Do decyzji właściciela, nie rozstrzygam:** czy T16 idzie do rejestru decyzji
stojących, a T3/T5/T6 do archiwum. **Zastrzeżenie ważniejsze od propozycji:**
przy T3/T5/T6 przeniesienie ma **koszt**, którego nie ma przy poz. 20 — te wpisy
niosą **dowody wykonania** (przebiegi CI, mutacje, sumy SHA-256), a rejestr
z zamkniętymi pozycjami uczy też, **czym się kończy warunek spełniony**.
Wyprowadzenie ich do archiwum, którego nikt nie czyta, może być gorsze
od gatunkowego bałaganu.

## 58.3 Kubeł „nie sprawdzono" (R-D)

Nie sprawdzono, czy istnieje **trzeci rejestr** (poza warunkami powrotu
i nowo założonym), do którego część z tych pozycji należałaby naturalniej.
Skanowałem `docs/faza-2/` po nazwie pliku, nie po zawartości wszystkich dokumentów.

---

# 59. KANDYDACI 12 i 13 — pełne brzmienie do rozstrzygnięcia

Cytaty dosłowne, kolumna po kolumnie `[STAN dokumentu obowiązującego]`.

## 59.1 Poz. 12

> **12** | Pozostałe bramki GROWTH z Z1 (Benchmarki, Liga, Hive Coach, Win Reel,
> Interactive, Stacks, Tag, raporty struktury/sponsora) | **ewentualne przyszłe
> treści** | Nieobecne w narracji strony; każde wejście = nowa obietnica →
> tabela obietnic + panel + decyzja właściciela

**Dlaczego kandydat:** nic nie zdjęto — treść **nigdy nie stała na stronie**
(„Nieobecne w narracji strony"). Kolumna „Gdzie" mówi „ewentualne przyszłe treści",
czyli nie mówi o miejscu. Kolumna „Warunek powrotu" nie zawiera warunku, tylko
**procedurę wejścia** dla czegoś, co nigdy nie wychodziło.

**Argument przeciw wyjęciu — mocniejszy, niż zakładałem, kiedy zgłaszałem
kandydaturę:** poz. 12 wylicza **osiem nazw funkcji**, których na stronie nie ma.
Jest to więc jedyne miejsce w repozytorium, gdzie te osiem nazw stoi razem
z zakazem. Wyjęta do rejestru decyzji stojących zachowa tę funkcję. Wyjęta
gdziekolwiek indziej — straci. **Przeniesienie jest bezpieczne wyłącznie do
rejestru decyzji stojących.**

## 59.2 Poz. 13

> **13** | robots: noindex,nofollow (layout www — stan przedpremierowy,
> odnotowany przez adwersarza) | `src/app/[locale]/…/layout.tsx` |
> Wyłączyć przy publikacji (Faza 7) — **pozycja checklisty premiery**

**Dlaczego kandydat:** to **jest** prawdziwy warunek — ma moment (publikacja),
czynność (wyłączyć) i miejsce (plik). Kandydatura opiera się na czym innym:
**przedmiotem nie jest treść**, tylko ustawienie techniczne, a pozycja **sama
nazywa siebie** „pozycją checklisty premiery".

**Argument przeciw wyjęciu:** poz. 13 nie jest osamotniona — **T7 jest tą samą
klasą** („Decyzja właściciela 2026-08-15: **pozycja na checkliście premiery**,
BEZ budowy mechanizmu"). Czyli w repozytorium żyją **dwie** pozycje checklisty
premiery, w **dwóch różnych połowach** tego samego rejestru. Wyjęcie samej 13
zostawi T7 na miejscu i **rozdzieli parę**.

**Wniosek dla decyzji:** poz. 13 wyjmować **razem z T7** albo nie wyjmować wcale.
Trzecia droga — założyć checklistę premiery jako osobny dokument i przenieść obie —
jest tańsza niż wygląda, bo T7 już dziś **zawiera inwentarz zdań przedpremierowych**,
czyli materiał, z którego taka checklista miałaby powstać.

**Nie rozstrzygam żadnego z dwóch.** Oba to zmiana zakresu.

---

# 60. TRZY POZYCJE Z ROZSTRZYGNIĘCIA 2026-08-21

## 60.1 WARUNEK WIĄŻĄCY DLA AUTORÓW: naprawa łańcucha **per język**

**Rozstrzygnięcie właściciela:** *„KAŻDA naprawa łańcucha planowana PER JĘZYK,
nie raz dla PL i tłumaczona."*

Podstawa: **Ł-3 jest łańcuchem verbatim wyłącznie w PL** (§52.2). W EN i DE obie
nogi już się rozeszły. Zasada łańcuchów jest więc dziś prawdziwa **dla jednego
języka z trzech**, a naprawa uzgodniona po polsku rozjedzie się z resztą.

**Zapis wiążący dla W1/W2/W3 i dla syntezy:**
> Propozycja dotykająca ciągu łańcuchowego musi wymienić **wszystkie trzy języki**
> i dla każdego powiedzieć, czy łańcuch tam **istnieje**. Propozycja podająca
> jedno brzmienie polskie „do przetłumaczenia" jest **niekompletna** i wraca
> do autora, nie do sędziego.

**Do sprawdzenia przed uruchomieniem autorów, nie sprawdzone (R-D):** ile
z **21 łańcuchów** (16 z §1 + 5 z §52.1) jest verbatim we wszystkich trzech
językach, a ile tylko w PL. Ł-3 wykryto przypadkiem, przy okazji dowodu
arytmetycznego. **Nikt tego nie zmierzył systematycznie.**

## 60.2 LUKA NAZWANA: sprzeczność treści z zachowaniem interfejsu

**Rozstrzygnięcie właściciela: zapisać jako nazwaną lukę, nie jako zlecenie** —
nie wiadomo jeszcze, czy da się ją objąć mechanizmem.

**Definicja:** zdanie jest prawdziwe wobec tabeli obietnic i wobec każdej innej
frazy w warstwie treści, a mimo to **nieprawdziwe wobec tego, co strona robi** —
bo zaprzecza mu tabela, przełącznik, cel linku albo stan konfiguracji usługi.

**Cztery znane wystąpienia** (C-1…C-4, §52.8), każde z innym nośnikiem
zaprzeczenia: `sr-only` w tabeli · przełącznik okresu · cel linku CTA · konfiguracja
portalu Stripe (§55.2 — piąte, wykryte dziś, z nośnikiem **poza tym repozytorium**).

**Dlaczego to nie jest zlecenie:** przedmiotem porównania są dwie rzeczy różnego
rodzaju — **zdanie** i **zachowanie**. Żaden dzisiejszy mechanizm nie ma po drugiej
stronie czego porównać. Strażniki e2e widzą DOM, ale nie umieją powiedzieć, że
przełącznik „rocznie" **znaczy** zobowiązanie. Nazwanie luki jest tu całą pracą,
jaką da się dziś wykonać uczciwie.

**Jedno spostrzeżenie do przyszłej próby:** trzy z pięciu wystąpień mają nośnik
**wewnątrz repozytorium i policzalny** (kolumna tabeli, cel `href`, obecność
przełącznika). Gdyby mechanizm kiedyś powstał, zaczynałby od nich, nie od zdań.

## 60.3 Z-C3 jako pozycja przeglądu kubłów

**Rozstrzygnięcie właściciela:** do przeglądu kubłów **jako pozycja, nie przypis**.

**Brzmienie pozycji:**
> **Z-C3 — `/cennik` milczy o asystencie AI.** Rejestr poz. 5 rozdziela w jednej
> komórce dwie rzeczy: wiersz liczbowy zablokowany (klucz Anthropic), ale
> **„Język kierunku o asystencie AI w opisach — dozwolony już teraz"**.
> Trzy podstrony z tego korzystają, `/cennik` nie.
> **Klasa: WARUNEK SPEŁNIONY, POWRÓT NIEWYKONANY. Druga pozycja klasy po Pulsie.**

**Sformułowanie właściciela, ostrzejsze od mojego, do zapisania przy pozycji:**
> *„Ta sama strona serwisu stosuje dwie różne polityki wobec jednej pozycji
> rejestru."*

To przenosi Z-C3 z kubła „zwyczaj" do kubła **niespójności wewnętrznej** —
bo nie chodzi o to, że `/cennik` czegoś nie mówi, tylko o to, że **serwis
interpretuje jedną komórkę rejestru na dwa sposoby jednocześnie**, i nikt tego
nie zauważył, bo **komórka niesie dwie decyzje w jednym zdaniu**.

**Wniosek konstrukcyjny wykraczający poza Z-C3:** poz. 5 jest jedyną pozycją
rejestru, która **łączy zakaz z pozwoleniem w jednej komórce**. To dlatego jej
druga połowa jest niewidoczna. **Do sprawdzenia (R-D, nie sprawdzone):** czy
którakolwiek z pozostałych 22 pozycji też niesie dwie decyzje w jednej komórce.

---

# 61. REJESTR PRZESŁANEK — twierdzenia, które wprowadziłem i które upadły

Założony 2026-08-21 na polecenie właściciela. **Nie jest to lista błędów** — jest to
lista **przesłanek, na których ktoś budował dalej**, żeby dało się sprawdzić, co
jeszcze na nich stoi.

| # | przesłanka | kto ją wprowadził | co na niej zbudowano | obalenie |
|---|---|---|---|---|
| **P-1** | „`naglowek.md` jest jedynym plikiem treści bez strażnika znak-w-znak" | ja, §52.4, za raportem A0-C | wyjaśnienie asymetrii 30/30 vs 2/11 · propozycja przeniesienia wzorca · zlecenie właściciela na strażnik | `hero.spec.ts:179` — strażnik istnieje i jest **wzorcem** dla pozostałych. **14/14 plików treści ma strażnika** |
| **P-2** | „obecność strażnika tłumaczy asymetrię dryfu" | ja, §52.5 | wniosek „wada w rozkładzie strażników, nie w ludziach" | `filary.md` ma strażnika i niesie **sześć** rozjazdów — najwięcej ze wszystkich |
| **P-3** | „na trasie `/` są dwa rozjazdy deklaracji" | ja, §9 | punkt odniesienia całego panelu H1 · kryterium przyjęcia strażnika | pomiar całościowy: **dziewięć** na `/`; drugi z §9 (`Filary.filar1.naglowek`) **nie istnieje** |
| **P-4** | „`Hero.potwierdzenieUE/Rezygnacja` nic nie pociągają w kodzie" | A0-C, przepisane przeze mnie | anatomia szwu paska potwierdzeń | oba klucze są w `komunikaty.Hero`, objęte pętlą `hero.spec.ts:185` |
| **P-5** | „strażniki e2e są dziś zielone" — **NIE BYŁA TWIERDZONA, była zakładana** | milcząco, przez cały tor | każde zdanie o tym, co bramka „zatrzyma" | **sprawdzona 2026-08-21: prawdziwa.** 634 zielone, 0 czerwonych. Zapisana tu, bo założenie niesprawdzone jest przesłanką tak samo jak wypowiedziane |

**Reguła wynikająca z P-5 (najważniejszy wiersz tej tabeli):** przesłanka **milcząca**
jest groźniejsza od wypowiedzianej, bo nie ma jej w żadnym zdaniu do obalenia.
P-1…P-4 dało się obalić, bo ktoś je napisał. P-5 przez dwa tygodnie nie istniała
jako zdanie — a każde „bramka to zatrzyma" na niej stało.

---

# 62. DLACZEGO `cennik.md` MA 30/30, A `naglowek.md` NIE — odpowiedź zmierzona

Zadanie właściciela: *„skoro oba pliki mają strażnika, dlaczego…? Podejrzewam różnicę
w ZAKRESIE strażnika, nie w jego istnieniu, ale to jest podejrzenie, nie ustalenie."*

## 62.1 Podejrzenie o zakres — **OBALONE, i to w drugą stronę**

Oba strażniki wykonują **tę samą asercję**: `toContain(tresc)` na źródle md znormalizowanym
`replace(/\s+/g, " ")`. Różnią się **sposobem doboru pól**, nie własnością:

| | `hero.spec.ts:179` | `cennik.spec.ts:326` |
|---|---|---|
| dobór pól | `Object.entries(komunikaty.Hero)` — **pętla po całej przestrzeni** | **jawna lista** 32 pól literalnych + 10 etykiet tabeli |
| pokrycie | **5 z 5 kluczy `Hero` = 100%** | **42 z 50 kluczy `Cennik` = 84%** |
| normalizacja | wyłącznie białe znaki | białe znaki + `toLowerCase()` dla etykiet tabeli |
| deklarowana granica | brak — nie ma czego wyłączyć | jest, w komentarzu `:321-323`: „szablon oszczędności i mikro-teksty rusztowania […] **poza strażnikiem**" |

**Strażnik hero jest proporcjonalnie SZERSZY.** Pokrywa całą swoją przestrzeń; cennik
pokrywa 84% swojej. Podejrzenie było odwrotne do faktu — i to jest lepszy wynik niż
potwierdzenie, bo zamyka wyjaśnienie, zamiast je przenieść o krok dalej.

**Ani jeden z dwóch nie dotyka liczby znaków.** Oba porównują tekst z tekstem.
**Zakres nie tłumaczy niczego, bo mierzona własność jest w obu ta sama i w obu inna
niż ta, która dryfuje.**

## 62.2 Przyczyna rzeczywista — zmierzona w miejscu dryfu

Sześć z dziewięciu rozjazdów PL siedzi w **jednym pliku**: `content/pl/filary.md`.
Ten sam plik niesie **jedyną w repozytorium adnotację o korekcie licznika**:

```
content/pl/filary.md:17   **34 znaki** *(korekta licznika 2026-08-12,
                            tryb A-3 — brzmienie bez zmian).*     ← ZGODNE (34/34)
content/pl/filary.md:25   1. DMO układa kolejność rozmów …  *(71 zn)*  ← fakt 68
content/pl/filary.md:26   2. Przypomnienie chwilę przed …   *(74 zn)*  ← fakt 73
content/pl/filary.md:27   3. …                              *(67 zn)*  ← fakt 66
```

**Osiem linii niżej, w tym samym pliku, w tym samym filarze, trzy deklaracje są błędne.**
Korekta z 2026-08-12 objęła **jedną pozycję** — nagłówek filara 1 — i nie objęła
**trzech konkretów tego samego filara**.

**Odpowiedź na pytanie:** `naglowek.md` i `filary.md` dryfują nie dlatego, że nie mają
strażnika, i nie dlatego, że mają węższy — tylko dlatego, że **są warstwą, w której
zapadają korekty**, a korekta jest stosowana **per pozycja, nie per plik**.
`cennik.md` ma 32/32 w PL, bo **nikt nie musiał w nim niczego przeliczać**: powstał
w Etapie E jednym przebiegiem i nie przeszedł przez korektę licznika.

**Zgodność `cennik.md` jest skutkiem braku korekt, nie skuteczności strażnika.**

## 62.3 Znaczenie praktyczne dla rundy drugiej

Panel zamierza **przepisywać zdania**. Każde przepisane zdanie zmienia liczbę znaków.
Dziś nic tej liczby nie sprawdza (§53.3), a jedyna zapisana praktyka korekty
(`filary.md:17`) **udowodniła w swoim własnym pliku, że stosuje się jej per pozycja**.

**Wniosek: przewaga `cennik.md` zniknie w chwili, gdy panel go dotknie** — dokładnie
tak jak przewaga EN/DE (§63). To nie jest prognoza, tylko odczytanie zmierzonego
mechanizmu.

---

# 63. EN I DE CZYSTSZE OD PL — hipoteza właściciela sprawdzona, wynik mieszany

Hipoteza (właściciel, 2026-08-21, **wprost jako do sprawdzenia, nie do przyjęcia**):
*„PL jest warstwą, w której się PISZE i POPRAWIA, a EN/DE powstają jako przekład
z jednego przebiegu i nikt ich potem nie dotyka. Jeśli tak, to zgodność EN/DE jest
skutkiem braku edycji, nie staranności."*

## 63.1 Czego sprawdzić się NIE DA z tego klonu

Historia gita w klonie to **10 commitów** (`git rev-list --count HEAD`); każdy plik
treści ma w niej **po jednym** commicie w każdym z trzech języków. Gałąź była
przepisywana (§16). **Częstotliwości edycji nie da się stąd zmierzyć — klasa R-C.**
Zapisuję to zamiast zastąpić czymś, co wygląda na pomiar.

## 63.2 Co dało się zmierzyć — dwa pomiary zastępcze

**(a) Gęstość adnotacji korekt i dat** w plikach treści (`korekta|poprawka|rewizja|data`):

| | PL | EN | DE |
|---|---|---|---|
| adnotacji ogółem | **50** | 38 | 35 |

PL ma ich o **~35% więcej** — kierunek zgodny z hipotezą. **Ale nie zeruje EN/DE:**
trzydzieści osiem i trzydzieści pięć adnotacji to nie jest warstwa, której „nikt nie
dotyka". `en/filary.md:77` i `de/filary.md:80` niosą własne daty `2026-08-11`,
`de/filary.md:40` własną „korektę panelu".

**(b) Miejsce jedynej korekty licznika** (§62.2): adnotacja `korekta licznika 2026-08-12,
tryb A-3` występuje **wyłącznie w `content/pl/filary.md`**. W `en/filary.md`
i `de/filary.md` **nie ma jej wcale** — i te pliki mają **30/30** i **29/29** zgodnych.

## 63.3 Rozstrzygnięcie: hipoteza w postaci mocnej UPADA, w słabej STOI

| postać | brzmienie | werdykt |
|---|---|---|
| **mocna** | „nikt EN/DE potem nie dotyka" | **UPADA** — 38 i 35 adnotacji, w tym własne daty i własna korekta panelu |
| **słaba** | „EN/DE nie przechodzą **korekt licznika stosowanych per pozycja**, bo licznik jest liczony przy przekładzie i nie jest potem przeliczany" | **STOI** — jedyna korekta licznika jest w PL, i jedyne rozjazdy liczników są w PL (9 z 10) |

**Sformułowanie ostateczne:** zgodność EN/DE nie jest ani starannością, ani brakiem
edycji. Jest **brakiem tej jednej czynności, która w PL została wykonana źle** — i to
jest gorsza wiadomość niż obie hipotezy wyjściowe, bo znaczy, że EN/DE są czyste
**przypadkiem**, nie z konstrukcji.

## 63.4 Konsekwencja operacyjna — właściciel ma rację co do stawki

Runda druga **zamierza edytować EN i DE**. W chwili pierwszej korekty w tych plikach
przewaga 9/1/0 przestaje istnieć, bo:
- czynność, która ją utrzymywała, to **nieprzeliczanie**;
- czynność, która ją zniszczy, to **przeliczanie stosowane per pozycja**;
- **nie ma dziś mechanizmu, który by to zauważył** (§53.3).

**Zapis wiążący dla rundy drugiej:** propozycja zmieniająca brzmienie w którymkolwiek
języku **musi podać nową liczbę znaków dla wszystkich trzech**, a nie dla języka,
w którym powstała. Inaczej wyprodukujemy w EN i DE dokładnie to, co dziś mamy w PL,
i zrobimy to **w jednym przebiegu zamiast przez dwa tygodnie**.

---

# 64. CZWARTA ZBIEŻNOŚĆ MIĘDZYTOROWA DNIA — „mechanizm istnieje, nie został powielony"

**Wystąpienie po stronie treści** (tor 9, zmierzone 2026-08-21):
`content/pl/filary.md:17` niesie korektę licznika z jawnym „**brzmienie bez zmian**".
**Dziewięć pozostałych rozjazdów w repozytorium nie ma takiej adnotacji, a trzy z nich
stoją osiem linii niżej w tym samym pliku** (§62.2).

**Wystąpienie po stronie kodu** (tor 8, zgłoszone tego samego dnia): mechanizm istnieje
i nie został powielony do sąsiedniej implementacji.

**Wystąpienie po stronie rejestru** (tor 9, §47.4): forma powrotu z poz. 9 nie została
przeniesiona do poz. 8; procedura z poz. 4 nie została przeniesiona do poz. 5 i 6.

**Trzy niezależne odczyty tej samej klasy w jednym dniu, w trzech różnych materiałach.**

**Warunek operacyjny §51 zastosowany:** czy tory czytały ten sam materiał?
**Nie.** Tor 8 czytał kod aplikacji, tor 9 pliki treści i rejestr. Część wspólna to
KANON, a klasa „mechanizm istnieje, nie jest wołany" **nie jest w nim zapisana** —
powstała dziś po obu stronach. **Zbieżność jest dowodem.**

**Uwaga, którą trzeba dopisać przy tej właśnie zbieżności:** od jutra przestaje nią być.
Ta klasa wchodzi teraz do KANONU wraz z tym dokumentem — kolejne jej wystąpienia będą
mierzyć regułę, nie produkt. **To pierwszy przypadek, w którym granica z §51 daje się
wskazać co do dnia.**

---

# 65. PAKIET E2E URUCHOMIONY — zadanie właściciela wykonane

Zlecenie: *„uruchom pakiet e2e i podaj, ile testów przechodzi, ile pada, ile jest
pominiętych. Jeśli nie masz jak uruchomić w tym środowisku — powiedz wprost."*

**Mam jak. Uruchomione. Zamawianie w oknie www niepotrzebne.**

| | wynik |
|---|---|
| testy ogółem | **638** (20 plików spec × 2 projekty: `mobile-390`, `desktop`) |
| **przeszły** | **634** |
| **padły** | **0** |
| pominięte | **4** |
| czas | 2,7 min, 2 workery, `exit=0` |

**Bramki pozaprzeglądarkowe, wykonane osobno:** `tokeny`, `liczby`, `parytet`,
`kontrakt`, `linki`, `kotwice` — **sześć zielonych**; `npm run lint` (eslint
`--max-warnings=0`) **exit 0**; `npm run build` **exit 0**.

**`bramka:cennik` czerwona z zadeklarowanego powodu:** „✗ Brak `STRIPE_TEST_SECRET_KEY`
w środowisku." Bramka czerwieni się, **gdy nie ma czym mierzyć**, zamiast przechodzić
na zielono z braku danych — odwrotność klasy z T19. **Zapis na plus.**

## 65.1 Cztery pominięte — pominięte jawnie i słusznie

`hero.spec.ts` „H1 ≤ 3 linie na desktopie" ×3 języki oraz `zlozenie.spec.ts:89`
„kropki luster S3/S10 (desktop)" — wszystkie w projekcie `mobile-390`, wszystkie
**desktopowe z definicji**. Trzy z czterech to **dokładnie ta obietnica, którą T4
opisuje jako nieprawdziwą poniżej 768 px**. Pakiet nie udaje, że ją sprawdza na
390 px — **pomija ją otwarcie**. Luka jest realna i zapisana; strażnik jej nie zamalowuje.

## 65.2 Zastrzeżenie, bez którego ten wynik jest za mocny

Pierwszy przebieg **padł w całości**: `browserType.launch: Executable doesn't exist
at /opt/pw-browsers/chromium_headless_shell-1234`. Projekt przypina Playwright
**1.62.1** (build przeglądarki **1234**); środowisko ma **1194**. Podstawiłem 1194
(Chromium **141.0.7390.37**) pod ścieżkę oczekiwaną przez 1234.

**Konsekwencja:** zieleń zmierzona na **innym buildzie przeglądarki niż przypięty**.
Dla asercji tekstowych i strukturalnych bez znaczenia. Dla **geometrycznych** — kotwice
pod sticky nav, cele dotykowe, reflow 320 px, kontrast stanów, liczba linii H1 —
build ma znaczenie, a różnicy **nie zmierzyłem**. Zieleń tych konkretnych testów jest
**o stopień słabsza** niż pozostałych. Podmiana dotyczy wyłącznie środowiska
wykonawczego; **w repozytorium nie zmieniono ani jednego bajtu**.

## 65.3 Co ten przebieg naprawdę ustalił, a czego nie

**Ustalił:** wszystkie twierdzenia tego toru o tym, „co bramka zatrzyma", stoją na
mechanizmach, które **dziś działają**. Przesłanka P-5 z §61 jest prawdziwa.

**Nie ustalił niczego o prawdziwości treści.** 634 zielone testy sprawdzają, że
`messages` zgadza się z `content`, że linki prowadzą tam, gdzie mapa, że kontrast
wynosi tyle, ile próg. **Ani jeden nie sprawdza żadnego wiersza tabeli obietnic
wobec kodu aplikacji.**

---

# 66. WSAD SZEŚCIU TRAS — obowiązek oznaczenia pochodzenia

**Rozstrzygnięcie właściciela 2026-08-21:** *„wsad rundy drugiej dla sześciu tras stoi
na materiale nieweryfikowanym. Przy przekształcaniu wsadu do kształtu sparowanego
oznacz KAŻDĄ pozycję: zweryfikowana przez Ciebie / z raportu agenta. Autorzy muszą
wiedzieć, na czym stoją."*

**Podstawa:** §61 P-1 — jedno twierdzenie agenta fundamentu okazało się nieprawdą,
a przeszło, **bo pasowało do wyjaśnienia, którego szukałem**. Nie ma powodu zakładać,
że było jedyne.

**Notacja wiążąca, trzy stany, bez czwartego:**

| znacznik | znaczenie | co wolno na nim zbudować |
|---|---|---|
| `[Z]` | **zweryfikowane przeze mnie** — komenda wykonana, wynik w dokumencie | wszystko |
| `[A]` | **z raportu agenta, nieodtworzone** | propozycję — **nie** wniosek o mechanizmie ani o przyczynie |
| `[N]` | **nie sprawdzone** — pozycja wymieniona, bo jej brak byłby luką | nic; pozycja jest wskazaniem pracy, nie materiałem |

**Trzeciej drogi nie ma** — pozycja bez znacznika jest **niekompletna** i wraca do mnie,
nie do autora. Ta sama konstrukcja co przy mapie tras i przy poz. 18 (§45): stan
niewyrażalny zamiast błędu do wykrycia.

**Przewidywana proporcja we wsadzie sześciu tras, na podstawie §3.4 inwentarza
sprawności:** znakomita większość pozycji dostanie `[A]`. **To ma być widoczne, nie
złagodzone.** Autor, który dostaje wsad w 90% oznaczony `[A]`, pracuje inaczej niż
autor, który myśli, że dostał materiał sprawdzony.

---

# 67. GRANICA CAŁEGO TORU 9

**Rozstrzygnięcie właściciela 2026-08-21 — do dokumentu jako granica, nie jako uwaga:**

> **Spójność mówi, że dwa pliki mówią to samo, nie że mówią prawdę o produkcie.**

Wszystko, co ten tor zmierzył pozytywnie, jest zgodnością **wewnątrz repozytorium
serwisu**: `messages` ↔ `content`, link ↔ mapa tras, deklaracja ↔ długość ciągu,
kontrast ↔ próg. **634 zielone testy i osiem zielonych bramek nie dotykają ani jednego
wiersza tabeli obietnic wobec kodu aplikacji.**

## 67.1 LUKA NAZWANA — z adresatem, nie jako brak

**Nazwa:** WERYFIKACJA OBIETNIC WOBEC APLIKACJI.

**Przedmiot:** 271 wierszy `content/tabela-obietnic.md` — każdy z nich jest twierdzeniem
o tym, **co aplikacja robi**. Serwis wolno mu wierzyć; nikt tego nie sprawdził.

**Dlaczego tor 9 tego nie wykonał i nie może wykonać:** pracuje na **klonie tylko do
odczytu** serwisu. Kod aplikacji jest w innym repozytorium, na innej gałęzi, a stan
produkcyjny zależy od zmiennych środowiskowych i dashboardów **spoza obu repozytoriów**
(§55.3). Nawet czterech plików, które dziś odczytałem, nie umiem powiązać z tym, co
działa u klientki.

**Adresat: TOR APLIKACJI.**

**Zakres minimalny, żeby zadanie dało się przyjąć:** dla każdego wiersza tabeli obietnic
— czy funkcja istnieje w kodzie, czy jest osiągalna dla użytkowniczki bez klucza,
którego nie ma, i czy **czasownik wiersza zgadza się ze sprawstwem w kodzie**
(rodzina Z-1 powstała dokładnie tam).

**Dowód, że to nie jest zadanie teoretyczne:** jedyny obszar, w którym tor 9 zajrzał
do aplikacji — rozliczenia — dał **trzy rozjazdy** przy pierwszym odczycie
(§55.2: `at_period_end` bez granicy na stronie, `cancellation_reason` wobec „nie musisz
podawać powodu", `subscription_update: false` wobec „zmieniasz plan kiedy chcesz").
**Trzy na jeden obszar.** Tabela ma ich kilkadziesiąt.

**Zapis wprost:** to nie jest brak w pracy toru 9. To jest **praca, której tor 9 nie
mógł wykonać**, wskazana adresatowi, który może.

---

# 68. KLASA „NAPRAWA PUNKTOWA ZOSTAWIA RODZINĘ PRZY ŻYCIU" — z rozróżnieniem

**Rozstrzygnięcie właściciela 2026-08-21.** Klasa zapisana z rozróżnieniem, którego
wcześniej nie robiliśmy, bo mieszała się z klasą sąsiednią.

| | klasa A — **znana** | klasa B — **nowa, dzisiejsza** |
|---|---|---|
| nazwa | „naprawa pominęła drugą implementację" | „**naprawa pominęła sąsiadów W TYM SAMYM PLIKU**" |
| co pomija | drugie miejsce, w którym ten sam defekt żyje | **pozycje sąsiednie tego samego rodzaju**, w tym samym pliku, w tej samej sekcji |
| gdzie siedzi | po stronie **defektu** — jest dwa razy | po stronie **czynności naprawczej** — jest raz i została zastosowana za wąsko |
| wystąpienie w treści | S11 ↔ C-05 (§56): dwa klucze tną ten sam wiersz `TO:144` | `filary.md:17` ↔ `filary.md:25-27` (§62.2) |
| jak się wykrywa | pytaniem „które jeszcze klucze czytają ten sam wiersz" | pytaniem „**co jeszcze w tym pliku było liczone tym samym licznikiem**" |

**Dlaczego rozróżnienie ma znaczenie praktyczne:** klasa A wymaga skanu po **przedmiocie**
(wiersz tabeli obietnic, funkcja, ciąg). Klasa B wymaga wyłącznie **rozszerzenia zasięgu
czynności do pliku**. Klasa A jest trudna. **Klasa B jest darmowa i nie została zrobiona.**

## 68.1 Dowód, w pełnym brzmieniu

```
content/pl/filary.md:17   **34 znaki** *(korekta licznika 2026-08-12,
                            tryb A-3 — brzmienie bez zmian).*   ← 34/34 ZGODNE
content/pl/filary.md:25   1. DMO układa kolejność rozmów…  *(71 zn)*  ← fakt 68
content/pl/filary.md:26   2. Przypomnienie chwilę przed…   *(74 zn)*  ← fakt 73
content/pl/filary.md:27   3. …                             *(67 zn)*  ← fakt 66
```

Osiem linii. Ten sam plik, ten sam filar, ta sama czynność, która była potrzebna.
**Korekta objęła nagłówek filara i nie objęła jego trzech konkretów.**

## 68.2 KONSEKWENCJA WIĄŻĄCA

> **Korekta licznika obejmuje CAŁY PLIK albo nie wchodzi. Nie ma korekty jednej pozycji.**

Zapisana także w KANONIE (`CLAUDE.md`), bo obowiązuje poza tym torem.

**Uzasadnienie kosztowe:** przeliczenie wszystkich deklaracji w jednym pliku to jedno
przejście przez plik. Korekta jednej pozycji kosztuje tyle samo uwagi, a **zostawia
w pliku stan, który wygląda na sprawdzony i nie jest** — czyli jest droższa niż
zaniechanie, bo produkuje fałszywy spokój tam, gdzie wcześniej była tylko niewiedza.

---

# 69. CZY ISTNIEJE STRAŻNIK PORÓWNUJĄCY DEKLARACJĘ Z DŁUGOŚCIĄ — **NIE ISTNIEJE**

Zadanie właściciela. Odpowiedź udzielona zgodnie z **R-H**: twierdzenie o nieistnieniu
niesie komendy, które je wykazały, i ich wyniki.

## 69.1 Trzy przeszukania, trzy wyniki

| # | co sprawdzone | komenda | wynik |
|---|---|---|---|
| **1** | czy cokolwiek porównuje długość ciągu z liczbą | `grep -rnE "\.length" e2e/*.ts scripts/*.mjs` | **25 trafień, ani jedno nie jest porównaniem długości TEKSTU z deklaracją.** Wszystkie to liczności zbiorów (`pozycje.length`, `linki.length`, `elementy.length`), jedno sprawdza `alt?.trim().length > 0` |
| **2** | czy cokolwiek **parsuje** deklarację `N zn` / `N znaków` | `grep -rnE "zn\)\|znak(ów\|i)?['\"]\|liczba znak\|długość" e2e/*.ts scripts/*.mjs .githooks/*` | **7 trafień — wszystkie to komentarze** opisujące strażniki „znak w znak" (`cennik.spec.ts:321`, `filary.spec.ts:16,156`, `funkcje-podstrony.spec.ts:500`, `funkcje-pozyskiwanie.spec.ts:411`, `hero.spec.ts:174`, `zlozenie.spec.ts:288`). **Zero kodu wykonywalnego** |
| **3** | czy `bramka:liczby` widzi pliki treści | odczyt `scripts/lint-liczby.mjs:45-46,212` | Skanuje **warstwę kodu** + `src/i18n/messages/*.json` (`KAT_MESSAGES`). **`content/*/*.md` NIE JEST w zasięgu żadnego przebiegu** |

**Sprawdzone także:** `.githooks/pre-commit` uruchamia dokładnie trzy rzeczy —
`lint-tokeny.mjs --staged`, `lint-liczby.mjs --staged`, `axe-precommit.mjs`.
Dwadzieścia skryptów w `scripts/`, żaden nie dotyka deklaracji.

## 69.2 Werdykt

**Nie istnieje. Deklaracje długości leżą poza WSZYSTKIM:** poza strażnikami znak-w-znak
(porównują tekst z tekstem), poza `bramka:liczby` (nie czyta `content/*.md`), poza
pre-commit, poza CI. **To nie jest luka w bramce — to jest kategoria bez bramki.**

Pytanie „dlaczego dziś nie zapala się na dziewięciu" **nie ma zastosowania**: nie ma
czego zapalić.

## 69.3 Propozycja bramki — weryfikacja wsteczna **już wykonana**

Właściciel: *„to jest propozycja bramki z darmową weryfikacją wsteczną: musi zapalić się
dziś na dziesięciu i milczeć na 288."*

**Kryterium spełnione, przebieg wykonany 2026-08-21 na czubku `e244daa`:**

| kryterium | wynik prototypu |
|---|---|
| zapala się na **10** rzeczywistych rozjazdach | **TAK** — `Hero.naglowek` 62/58 · `Filary.filar1.konkret1/2/3` · `filar2.konkret2` · `filar3.konkret1/3` · `Obawy.p1` 41/42 · `Definicja.tresc` 275/256 · `en Cennik.plany.starter.pozycja2` 65/57 |
| milczy na **288** zgodnych | **TAK** |
| milczy na **7** konstrukcjach złożonych | **TAK — dopiero po dodaniu reguły sąsiedztwa.** Wersja pierwsza była **fałszywie czerwona** na siedmiu legalnych konstrukcjach. To wynik pomiaru, nie rozumowanie |
| kontrola negatywna w tym samym przebiegu | **TAK** — 288 zgodnych to ona |

**Suma: 305 dopasowań, 288 zielonych, 17 zapaleń, z czego 7 wyeliminowanych regułą
sąsiedztwa → 10 rzeczywistych.**

## 69.4 Cztery ustalenia konstrukcyjne — każde z pomiaru

1. **Oba formaty deklaracji.** Repozytorium używa `*(N zn)*` (cennik, filary, obawy)
   **i** `**N znaków.**` (naglowek, definicja, filary). Linter na jeden format
   przeoczyłby całe pliki. `content/pl/definicja.md` używa **obu naraz** — `:24`
   „**275 znaków, 3 zdania.**" i `:41` „Treść (**265 zn**)" — **obie o tym samym ciągu,
   obie fałszywe, każda inną liczbą** (fakt 256).
2. **Wymóg sąsiedztwa.** Deklaracja musi stać bezpośrednio po ciągu (tylko interpunkcja
   i markdown pomiędzy). Bez tego: **56 zapaleń, w większości fałszywych** — krótkie
   ciągi trafiają jako podciąg w środek cudzych zdań.
3. **Notacja jawna dla ciągów złożonych.** Siedem deklaracji opisuje **sumę dwóch
   kluczy** (`Problem.tresc`+`kropka` ×3 języki, `RytmDnia.krok3Tresc`+`kropka` ×3,
   `Obawy.o3` = `Cennik.faq.o3` zd.1 + `Cennik.faq.o4`). Konstrukcja **legalna
   i celowa** — bramka nie może zgadywać po kształcie. **Ta sama zasada co T21 pkt (3).**
4. **Próg 12 znaków zadeklarowany**, nie przemilczany: krótsze ciągi („Puls zespołu",
   12 zn) trafiają w dowolne miejsce pliku.

## 69.5 Czego ta bramka NIE zrobi

- **Nie wie, która liczba jest prawdziwa.** Zapala się na niezgodności; poprawia człowiek.
  Przy `definicja.md` poprawić trzeba **dwie** deklaracje.
- **Nie zastępuje konsekwencji z §68.2.** Bramka złapie skutek korekty punktowej
  *po fakcie*; reguła „cały plik albo nic" nie dopuszcza go w ogóle. **Bramka jest
  drugą linią, nie pierwszą.**
- **Nie obejmuje deklaracji bez ciągu obok** (liczby stojące samotnie w dokumentach panelu).

**Nie implementuję** (§37). Prototyp poza repozytorium: `scratchpad/tor9/licznik2.py`.

---

# 70. WARUNEK ODRZUCENIA — trzy liczby albo powrót do autora

**Podniesione przez właściciela 2026-08-21 z zapisu wiążącego do warunku odrzucenia:**

> Propozycja zmieniająca brzmienie w którymkolwiek języku **podaje nową liczbę znaków
> dla WSZYSTKICH TRZECH**. Propozycja bez trzech liczb **wraca do autora, nie do sędziego.**

**Podstawa — ocena ryzyka rundy drugiej, zmieniona przez §62.3:**
zgodność `cennik.md` (32/32 PL, 32/32 DE) nie jest zasługą strażnika, tylko **skutkiem
nietykania pliku**. Runda druga dotyka **siedmiu tras naraz** — czyli wszystkich plików,
które dotąd były zgodne **przez zaniechanie**. To samo dotyczy EN i DE (§63.4).

**Trzy warunki odrzucenia obowiązujące autorów, zebrane w jednym miejscu:**

| # | warunek | źródło |
|---|---|---|
| **O-1** | Propozycja bez **trzech liczb znaków** (pl/en/de) wraca do autora | §70, właściciel 2026-08-21 |
| **O-2** | Propozycja dotykająca ciągu łańcuchowego bez wymienienia **wszystkich trzech języków i statusu łańcucha w każdym** wraca do autora | §60.1 |
| **O-3** | Pozycja wsadu **bez znacznika `[Z]`/`[A]`/`[N]`** wraca do mnie, nie do autora | §66 |

**Wspólna konstrukcja O-1…O-3:** wszystkie trzy czynią pewien stan **niewyrażalnym**
zamiast błędem do wykrycia. Piąte wystąpienie wzorca w tym torze (po mapie tras,
poz. 3, poz. 18 i notacji wsadu).

---

# 71. UZUPEŁNIENIA KANONU — trzy reguły, `CLAUDE.md`

Wpisane do `CLAUDE.md` na polecenie właściciela, bo obowiązują **poza tym torem**:

1. **Przesłanka milcząca jest groźniejsza od wypowiedzianej** — z konsekwencją
   operacyjną: przy każdym wniosku o tym, co mechanizm zatrzyma, wypisujesz, **co
   zakładasz o jego stanie**, nawet jeśli założenie wydaje się oczywiste. Zwłaszcza wtedy.
2. **Twierdzenie o nieistnieniu wymaga komendy** (R-H) — z nazwaną przyczyną
   przepuszczenia P-1: twierdzenie **pasowało do wyjaśnienia, którego szukano**.
3. **Korekta licznika obejmuje cały plik albo nie wchodzi** — z dowodem z `filary.md`.

**Uwaga do wiersza 1, którą właściciel zapisał osobno:** sprawdzenie P-5 wykonano
**mimo przekonania, że jest prawdziwa** — i okazała się prawdziwa. **To nie unieważnia
sprawdzenia.** Reguła nie mówi „sprawdzaj przesłanki podejrzane"; mówi „przesłanka
niezapisana nie ma momentu, w którym ktokolwiek mógłby ją sprawdzić". Wynik pozytywny
jest tu potwierdzeniem reguły, nie jej kosztem.

---

# 72. SPROSTOWANIE — `definicja.md` NIE NIESIE DWÓCH DEKLARACJI JEDNEGO CIĄGU

**Dotyczy §69.4 pkt 1 i mojego meldunku z 2026-08-21.** Właściciel przyjął to jako
osobne znalezisko i zlecił na jego podstawie skan. **Znalezisko nie istnieje w formie,
w jakiej je podałem.**

## 72.1 Stan faktyczny

`content/pl/definicja.md:24` `[STAN]` — „**275 znaków, 3 zdania.**" — dotyczy ciągu
`Definicja.tresc` stojącego w `:20-22`. Ciąg ma **256** znaków. **Rozjazd realny, stoi.**

`content/pl/definicja.md:38-44` `[PROPOZYCJA]` — stoi pod nagłówkiem:
> „## Wariant bezpieczniejszy (S2) — **do użycia gdy właściciel odrzuci metaforę «pamięci»**"

i deklaruje „Treść (**265 zn**)" dla **innego, alternatywnego brzmienia**, którego
**nie ma w `messages`**. To nie jest druga deklaracja tego samego ciągu. To deklaracja
wariantu zapasowego.

## 72.2 Klasa błędu — **piąte wystąpienie R-E**

Porównałem **PROPOZYCJĘ ze STANEM** i ogłosiłem sprzeczność. Dokładnie to samo, co B1,
B2, B3 (§26) i P-1 (§61). R-E istnieje od 2026-08-19 właśnie po to; jej operacyjna
część brzmi „oznacz każdy cytat STAN/PROPOZYCJA **już przy zapisie**" — i tego nie
zrobiłem, bo liczba wyglądała jak dowód, a nie jak cytat.

**Wniosek, który dopisuję do R-E:** **liczba też jest cytatem.** Deklaracja `265 zn`
pochodzi z bloku, który dwa wiersze wyżej mówi wprost, że jest wariantem warunkowym.
Wystarczyło przeczytać nagłówek sekcji. Nie przeczytałem, bo szukałem drugiej liczby
i znalazłem drugą liczbę.

## 72.3 Co z §69.4 pkt 1 zostaje

Ustalenie konstrukcyjne **stoi w całości**: repozytorium używa **dwóch formatów
deklaracji** — `*(N zn)*` i `**N znaków.**` — i `definicja.md` używa obu w jednym pliku.
Linter na jeden format przeoczyłby cały plik. **Upada wyłącznie przykład sprzeczności**,
którym to ustalenie zilustrowałem.

---

# 73. DEKLARACJE DUBLUJĄ SIĘ MIĘDZY PLIKAMI — **tak, i to w miejscu, które ma znaczenie**

Zlecenie właściciela: *„sprawdź, czy jest jedyny taki — bo jeśli deklaracje dublują się
w innych plikach, to bramka musi je porównywać także MIĘDZY SOBĄ."*

Skan wykonany na wszystkich 990 ciągach ×3 języki, z wykrywaniem deklaracji **przed
i po** ciągu. **Odpowiedź: TAK, dublują się — choć nie tam, gdzie wskazałem.**

## 73.1 Wynik skanu

| ciąg | pliki | deklaracje | zgodność |
|---|---|---|---|
| **„Dane przechowywane w UE"** `Hero.potwierdzenieUE` **=** `Cennik.potwierdzenie3` | `naglowek.md:40` **i** `cennik.md:99` | **6 deklaracji** (2 pliki × 3 języki): pl **23/23** · en **21/21** · de **27/27** | **wszystkie zgodne** |
| `Cennik.faq.o4` | `cennik.md:90` (80) **i** `obawy.md:30` (106) | 2 | **pozorny konflikt** — 106 opisuje ciąg złożony `Obawy.o3` (§52.2). Kontrola, że reguła ciągów złożonych jest potrzebna także w porównaniu międzyplikowym |

**Poza tym: zero.** Jedyny rzeczywisty duplikat deklaracji w repozytorium to zdanie
o przechowywaniu danych w UE.

## 73.2 Dlaczego to jest ważniejsze niż liczba wystąpień

Ten duplikat siedzi **dokładnie na szwie z §52.4** — na parze `Hero.potwierdzenieUE` ↔
`Cennik.potwierdzenie3`, o której ustaliliśmy, że **żaden strażnik nie asertuje jej
zgodności**, a jednostronna edycja przechodzi wszystkie bramki na zielono.

**Warstwa deklaracji jest jedynym miejscem w repozytorium, gdzie ten łańcuch zostawia
ślad poza `messages`.** Bramka porównująca deklaracje **między sobą** dotknęłaby tego
szwu jako pierwszy mechanizm w ogóle:

- **złapie:** jednostronną edycję zmieniającą **długość** zdania w jednym z dwóch plików;
- **nie złapie:** podmiany brzmienia o **tej samej długości** (półpauza za myślnik —
  dokładnie mutacja `c` adwersarza Etapu C, którą opisuje `hero.spec.ts:175-177`).

**Nie jest to więc domknięcie szwu, tylko pierwszy jego dotyk.** Zapisuję to z tą
granicą, żeby nikt nie uznał §52.4 za zamknięte.

## 73.3 Asymetria bliźniacza — druga noga pary **nie ma deklaracji wcale**

„Rezygnacja w każdej chwili" (`Hero.potwierdzenieRezygnacja` = `Cennik.potwierdzenie1`)
stoi w obu plikach, ale deklarację ma **tylko w jednym**:

```
content/pl/naglowek.md:41   - Rezygnacja w każdej chwili              ← BEZ deklaracji
content/pl/cennik.md:97     - Rezygnacja w każdej chwili *(26 zn)*    ← z deklaracją
```

**Ta sama asymetria co przy strażnikach — tylko w warstwie deklaracji.** Jedna noga
pary jest opisana, druga nie, bez zapisanego powodu. **Trzecie wystąpienie klasy B
(§68) w jednym dniu:** czynność została wykonana dla jednej pozycji z pary i nie dla
drugiej.

**Skutek dla bramki:** porównanie międzyplikowe **milczy na tej parze**, bo nie ma
czego porównać. Bramka złapie parę UE i **nie złapie pary Rezygnacja** — i to nie
dlatego, że jest źle zbudowana, tylko dlatego, że **materiał jest niekompletny**.

## 73.4 Ustalenie piąte dla konstrukcji bramki

Do czterech z §69.4 dochodzi piąte:

> **(5) Porównanie międzyplikowe deklaracji tego samego ciągu.** Reguła ciągów złożonych
> (pkt 3) obowiązuje także tutaj — bez niej para `Cennik.faq.o4` 80 ↔ `Obawy.o3` 106
> byłaby fałszywie czerwona w dniu wprowadzenia. **Weryfikacja wsteczna dla tego punktu:
> zapala się na 0 (dziś wszystkie duplikaty zgodne), milczy na 6.** To jest bramka
> **prewencyjna** — wchodzi zielona i ma taka zostać.

**Zastrzeżenie do przyjęcia razem z punktem:** bramka wchodząca zielona nie ma
weryfikacji wstecznej w zwykłym sensie — nie da się pokazać, że łapie defekt, bo
defektu dziś nie ma. **Dowodem musi być mutacja**: zmiana jednej z sześciu deklaracji
w kopii roboczej i pokazanie czerwieni, z przywróceniem i sumą SHA-256. Bez tego punkt
(5) jest deklaracją, nie mechanizmem — i wtedy sam byłby wystąpieniem klasy, którą
tropimy.

---

# 74. PRZEKSZTAŁCENIE WSADU — **NIEWYKONALNE. Artefaktu nie ma.**

Warunek właściciela brzmiał: *„oba wsady mają mieć TEN SAM kształt, zanim ktokolwiek
napisze pierwsze zdanie."* Przystępując do przekształcenia sprawdziłem, co trzymam.

## 74.1 Co jest, a czego nie ma

| artefakt | stan |
|---|---|
| fundament `/cennik` (A0-C) | **JEST** — `scratchpad/tor9/A0-C-RAPORT.md`, 77 kB, **już w kształcie sparowanym** |
| fundament trasy `/` (A0) | **JEST** — `scratchpad/tor9/A0-FUNDAMENT.md`, 33 kB, sekcje S2–S13, **kształt stary** (osobne listy) |
| **fundament SZEŚCIU TRAS** | **NIE MA** |

**Sprawdzenie, nie przypuszczenie (R-H):**
- `ls scratchpad/tor9/` — dwanaście plików, żaden nim nie jest;
- skan czternastu zapisanych wyników narzędzi po frazie `WOLNO-POWIEDZIEĆ` — jedyne
  trafienie o objętości to transkrypt agenta A0-C (`/cennik`);
- skan pełnego zapisu sesji (4,7 MB) po tej samej frazie — **31 trafień, wszystkie
  to ODWOŁANIA do fundamentu, największe ma 2371 znaków.** Raport agenta sześciu tras
  w zapisie nie istnieje.

**Wniosek:** fundament sześciu tras powstał, został omówiony, jego konstrukcja została
zapisana w §44 (Część 3 fakty / Część 4 granice, **dwie osobne listy**) — ale **jego
treść nie jest odzyskiwalna**.

## 74.2 Klasa — piąte wystąpienie R-C/T21, pierwsze BLOKUJĄCE

Cztery poprzednie wystąpienia klasy „odwołanie do artefaktu, którego nie da się
sprawdzić" osłabiały twierdzenie: pięć osi limitów odesłanych do trzech pozycji (§52.10),
dashboard Supabase (poz. 8), dashboard Stripe (§55.3), commit widmo (T21).
**To jest pierwsze, które zatrzymuje pracę, a nie tylko podważa zdanie.**

**Przyczyna, nazwana bez łagodzenia:** raport agenta `/cennik` **zapisałem do pliku**,
bo był długi i chciałem go cytować. Raportu sześciu tras **nie zapisałem** — omówiłem
go w rozmowie i uznałem omówienie za zachowanie. Kontekst się skończył, omówienie
zostało, materiał zniknął. **`[A]` z notacji §66 okazało się optymistyczne: część
pozycji, które oznaczyłbym `[A]`, nie ma dziś nawet raportu, na który mogłyby się
powołać. To jest stan `[N]` udający `[A]`.**

## 74.3 Reguła, którą to wymusza

> **Materiał roboczy, który ma przeżyć dłużej niż jedną wymianę zdań, jest PLIKIEM.**
> Omówienie w rozmowie nie jest przechowaniem. Raport agenta zapisujesz do pliku
> **w chwili odbioru**, zanim cokolwiek z niego zacytujesz — bo cytowanie tworzy
> złudzenie, że materiał jest w zasięgu.

Ta reguła jest **tą samą klasą, którą tor tropi u innych**: odwołanie wygląda na
sprawdzalne i nie jest. Różnica polega wyłącznie na tym, że tym razem odwołującym się
byłem ja, a artefaktem — mój własny wsad.

## 74.4 Droga naprzód — ODBUDOWA, nie przekształcenie

**Nie proponuję odtwarzania fundamentu z pamięci.** Pamięć jest dokładnie tym, co §26
i §61 pokazały jako źródło czterech nieprawd.

**Proponuję zbudować fundament sześciu tras od nowa, od razu w kształcie docelowym.**
Trzy powody, dla których to jest tańsze, niż wygląda:

1. **Przekształcenie i tak było pracą** — Część 3 i Część 4 trzeba było zestawić
   pozycja po pozycji. Budowa od razu w parach pomija ten krok, zamiast go powtarzać.
2. **Znacznik `[Z]`/`[A]`/`[N]` powstaje przy zapisie**, nie jest doszywany po fakcie —
   a doszywanie znaczników do cudzego materiału jest zgadywaniem, nie oznaczaniem.
3. **Sześć tras ma dziś wsad, którego wtedy nie miało:** siedem par sprzeczności
   (§34 + §52.8), rodzina Z-1 rozciągnięta na cztery trasy (§52.3), P0-4 rozstrzygnięte
   kierunkowo (§56), N-C1 rozstrzygnięte (§57), trzy warunki odrzucenia (§70), R-G
   i DECYZJA NADRZĘDNA o parowaniu (§37). **Fundament zbudowany wczoraj nie mógł
   tego nieść — musiałby zostać uzupełniony niezależnie od tego, czy istnieje.**

**Czego NIE robię bez zgody:** nie uruchamiam odbudowy z własnej inicjatywy, bo to
zmiana planu, nie wykonanie zlecenia. **Autorów nie ruszam** — warunek właściciela
(„oba wsady w tym samym kształcie") pozostaje niespełniony i dziś nie da się go spełnić
przekształceniem.

---

# 75. NOTACJA WSADU — WARUNEK CZWARTY: `[A]` WYMAGA ŚCIEŻKI

**Rozstrzygnięcie właściciela 2026-08-21**, po wykryciu stanu „`[N]` udający `[A]`" (§74.2).

> **Znacznik `[A]` wolno postawić WYŁĄCZNIE wtedy, gdy raport, na który się powołuje,
> istnieje jako plik i da się wskazać ścieżką. Bez ścieżki znacznik brzmi `[N]`.
> Bez tego notacja mierzy pamięć, nie materiał.**

## 75.1 Notacja w postaci ostatecznej

| znacznik | warunek postawienia | co wolno zbudować |
|---|---|---|
| `[Z]` | komenda wykonana, wynik zapisany w dokumencie | wszystko |
| `[A: ścieżka]` | **raport istnieje jako plik pod podaną ścieżką** | propozycję — **nie** wniosek o mechanizmie ani o przyczynie |
| `[N]` | pozycja wymieniona, bo jej brak byłby luką | nic; jest wskazaniem pracy, nie materiałem |

**Znacznik `[A]` bez ścieżki nie jest stanem możliwym** — zapisuje się go jako `[N]`.
To jest ta sama konstrukcja co przy mapie tras i poz. 18: **szósty raz w tym torze
zły stan zostaje uczyniony niewyrażalnym zamiast wykrywalnym** (§KANON, wzorzec projektowy).

## 75.2 Dlaczego warunek jest czwarty, a nie przypis do trzeciego

Trzy warunki odrzucenia z §70 pilnują **kompletności propozycji**. Ten pilnuje
**istnienia materiału, na którym propozycja stoi**. Bez niego notacja `[Z]`/`[A]`/`[N]`
byłaby deklaracją o własnym stanie wiedzy — czyli **dokładnie klasą, którą R-H
wyklucza w twierdzeniach o nieistnieniu**, tylko obróconą: „mam raport" bez ścieżki
jest tym samym co „nie ma strażnika" bez gremu.

---

# 76. R-E UZUPEŁNIONA — **liczba też jest cytatem**

**Rozstrzygnięcie właściciela 2026-08-21: to jest mechanizm, nie uwaga.**

R-E w brzmieniu dotychczasowym żądała oznaczenia każdego **cytatu** jako STAN albo
PROPOZYCJA już przy zapisie. Piąte wystąpienie klasy (§72) pokazało lukę:

> **Liczba też jest cytatem. Deklaracja wygląda jak dowód, więc nie oznacza się jej
> statusem — i dlatego przechodzi.**

**Rozbiór mechanizmu, bo od niego zależy skuteczność uzupełnienia:** zdanie w cudzysłowie
samo prosi o pytanie „skąd to jest". Liczba `265 zn` nie prosi o nic — wygląda na
**wynik pomiaru**, a nie na **cytat z dokumentu**. Przy zdaniu status pada z nawyku;
przy liczbie nie pada, bo liczba udaje, że jest już sprawdzona.

**Zasięg uzupełnienia:** deklaracje długości, liczby w tabelach paneli, wartości progów,
liczności zbiorów cytowane z cudzych raportów. **Każda z nich niesie STAN albo
PROPOZYCJA, tak samo jak zdanie.**

---

# 77. REJESTR PRZESŁANEK — P-6, wywołana poleceniem właściciela

| # | przesłanka | kto wprowadził | co na niej zbudowano | obalenie |
|---|---|---|---|---|
| **P-6** | „`content/pl/definicja.md` niesie **dwie deklaracje jednego ciągu, obie fałszywe, każda inną liczbą**" | **ja** (§69.4 pkt 1), przyjęta przez właściciela | polecenie zapisania osobnego znaleziska · **zlecenie skanu duplikatów deklaracji** | `definicja.md:38` stoi pod nagłówkiem „## **Wariant bezpieczniejszy (S2)** — do użycia gdy właściciel odrzuci metaforę «pamięci»". Deklaracja `265 zn` opisuje **alternatywne brzmienie, którego nie ma w `messages`**. Nagłówek stoi **dwa wiersze wyżej** |

**Zapis, o który poprosił właściciel:** polecenie zapisania osobnego znaleziska zostało
wydane na podstawie **porównania PROPOZYCJI ze STANEM** — czyli klasy, którą ten sam
właściciel przyjął jako **R-E** dwa dni wcześniej. Piąte wystąpienie klasy, **pierwsze
wywołane poleceniem, nie przeoczeniem**.

**Wniosek, którego nie wolno złagodzić:** reguła przyjęta i obowiązująca **nie chroni
przed własnym naruszeniem, jeśli materiał, do którego się stosuje, nie wygląda na
materiał podlegający regule**. R-E była znana obu stronom. Zadziałała na zdaniach
i nie zadziałała na liczbie — **bo nikt nie pomyślał o liczbie jako o cytacie**.
Stąd uzupełnienie §76; bez niego to samo powtórzy się przy pierwszej tabeli progów.

**Skutek dodatni, który należy odnotować z tą samą dokładnością:** zlecony skan
**dał znalezisko prawdziwe i ważniejsze od tego, którego szukał** (§73). Fałszywa
przesłanka wyprodukowała trafne zlecenie. **To nie jest argument za fałszywymi
przesłankami** — jest argumentem za tym, że skan po **klasie** („czy deklaracje się
dublują") jest odporniejszy niż skan po **przykładzie** („sprawdź, czy `definicja.md`
jest jedyna").

---

# 78. MILCZENIE BRAMKI Z BRAKU MATERIAŁU ≠ ZIELEŃ

**Rozstrzygnięcie właściciela 2026-08-21:** *„tu bramka milczy z braku materiału,
nie z konstrukcji. Zapisz to rozróżnienie, bo milczenie bramki bez tego czyta się
jak zieleń."*

## 78.1 Trzy powody, dla których bramka milczy — i tylko jeden znaczy „dobrze"

| # | powód milczenia | co znaczy | przykład zmierzony |
|---|---|---|---|
| **M-1** | **sprawdziła i przeszło** | dobrze | 288 zgodnych deklaracji (§69.3) |
| **M-2** | **nie ma czego porównać — materiał niekompletny** | **nic nie wiadomo** | para „Rezygnacja w każdej chwili": `cennik.md:97` *(26 zn)*, `naglowek.md:41` **bez deklaracji**. Porównanie międzyplikowe **nie ma drugiej strony** |
| **M-3** | **przedmiot poza zasięgiem** | **nic nie wiadomo, i to wiadomo z góry** | ciągi < 12 znaków (§69.4 pkt 4); `content/*.md` poza `bramka:liczby` (§69.1) |

**M-1 jest zielenią. M-2 i M-3 są ciszą.** Dziś raport bramki nie odróżnia ich w żaden
sposób — wszystkie trzy wyglądają identycznie: brak komunikatu.

## 78.2 Konsekwencja konstrukcyjna

> **Bramka raportuje POKRYCIE, nie tylko wynik.** „Zielona" bez liczby sprawdzonych
> pozycji jest twierdzeniem o stanie, którego nikt nie zmierzył — czyli przesłanką
> milczącą (KANON).

Wzorzec istnieje już w tym repozytorium i nie został powielony — **czwarte wystąpienie
klasy B w jednym dniu**:
- `check-linki.mjs:202` `[STAN kodu]` — „Linki: zielone (`${pliki.length}` artefaktów,
  `${ISTNIEJACE_SCIEZKI.length}` ścieżek rejestru × `${locales.length}` języki…)"
- `check-parytet.mjs:64` — „Parytet językowy: zielony (`${drzewa.pl.length}` plików
  w każdym z trzech drzew)."
- `check-nojs.mjs:52` — „No-JS: zielone (`${pliki.length}` stron…)"
- `lint-liczby.mjs:369` — „Linter liczb: zielony (warstwa kodu + 16 rozstrzygniętych
  ciągów…)"

**Cztery bramki podają pokrycie. Bramka deklaracji musi je podawać także** — inaczej
jej zieleń przy sześciu duplikatach i jednej parze bez materiału przeczyta się jako
„para sprawdzona".

## 78.3 Zapis wprost dla §52.4

**§52.4 ZOSTAJE OTWARTE** (rozstrzygnięcie właściciela). Bramka porównująca deklaracje
między sobą **dotyka szwu po raz pierwszy** i go nie domyka:

| | |
|---|---|
| **złapie** | jednostronną zmianę **długości** zdania w jednym z dwóch plików |
| **nie złapie** | podmiany brzmienia o **tej samej długości** — półpauza za myślnik, czyli mutacja `c` adwersarza Etapu C opisana w `hero.spec.ts:175-177` |
| **milczy (M-2)** | na parze „Rezygnacja w każdej chwili", bo druga noga nie ma deklaracji |

**Domknięcie szwu wymaga asercji krzyżowej `Hero.potwierdzenieUE == Cennik.potwierdzenie3`
w warstwie `messages`** — czego dziś nie robi nic (§53.6, grep powtórzony). Bramka
deklaracji jest **pierwszym dotknięciem, nie rozwiązaniem**.

---

# 79. BRAMKA DEKLARACJI — ZBUDOWANA. Dowody wykonaniem.

**Rozstrzygnięcie właściciela 2026-08-21: wchodzi teraz, przed autorami.**
Powód właściciela: propozycje autorów będą podawać nowe liczby znaków (warunek O-1),
więc bramka musi istnieć **w chwili, w której te liczby zaczną powstawać**.
Wprowadzona po fakcie łapałaby to, czemu miała zapobiec.

## 79.1 Co powstało

| plik | rola |
|---|---|
| `scripts/lint-deklaracje.mjs` | bramka, dwa przebiegi |
| `content/deklaracje-zlozone.json` | rejestr deklaracji opisujących **sumę** dwóch kluczy — notacja jawna, wzorzec `content/liczby-w-tresci.json` |
| `package.json` → `bramka:deklaracje` | wywołanie |

**Nie wpięta do `.githooks/pre-commit`** — decyzja właściciela, §79.5.

## 79.2 Przebieg 1 — deklaracja ↔ długość. **CZERWONY, 10 naruszeń na 230**

```
✗ pl/naglowek.md  Hero.naglowek                   62 → 58  (−4)
✗ pl/filary.md    Filary.filar1.konkret1          71 → 68  (−3)
✗ pl/filary.md    Filary.filar1.konkret2          74 → 73  (−1)
✗ pl/filary.md    Filary.filar1.konkret3          67 → 66  (−1)
✗ pl/filary.md    Filary.filar2.konkret2          65 → 66  (+1)
✗ pl/filary.md    Filary.filar3.konkret1          75 → 72  (−3)
✗ pl/filary.md    Filary.filar3.konkret3          60 → 63  (+3)
✗ pl/obawy.md     Obawy.p1                        41 → 42  (+1)
✗ pl/definicja.md Definicja.tresc                275 → 256 (−19)
✗ en/cennik.md    Cennik.plany.starter.pozycja2   65 → 57  (−8)
✗ Bramka deklaracji CZERWONA: 10 naruszeń na 230 sprawdzonych deklaracji.
```

**Weryfikacja wsteczna spełniona co do pozycji:** dziesięć zapaleń, **dokładnie te
zmierzone niezależnie w §53.2**, i **ani jednego fałszywego trafienia**. 220 deklaracji
przechodzi — kontrola negatywna w tym samym przebiegu.

**Dwie reguły, bez których byłby fałszywie czerwony** — obie wymuszone pomiarem:
- **rejestr złożonych** (`Problem.tresc`+`kropka`, `RytmDnia.krok3Tresc`+`kropka`,
  ×3 języki): bez niego **6 fałszywych czerwieni** w dniu wprowadzenia;
- **reguła najdłuższego dopasowania**: `Cennik.faq.o4` (80 zn) jest **sufiksem**
  `Obawy.o3` (106 zn) i bez niej przejmowałby cudzą deklarację.

## 79.3 Przebieg 2 — deklaracja ↔ deklaracja. **ZIELONY, dowód mutacyjny**

Wchodzi zielony, więc jego działania nie dowodzi dzisiejsza czerwień. Dowód wykonany:

```
SHA-256 przed:  80a5bd16…e57d  content/pl/naglowek.md
MUTACJA:        „Dane przechowywane w UE *(23 zn” → *(24 zn
WYNIK:          10 → 12 naruszeń
                ✗ pl/naglowek.md Hero.potwierdzenieUE  24 → 23   (przebieg 1)
                ✗ pl — Hero.potwierdzenieUE: ten sam ciąg zadeklarowany
                  RÓŻNIE w dwóch plikach: cennik.md 23 · naglowek.md 24  (przebieg 2)
PRZYWRÓCENIE:   git checkout --
SHA-256 po:     80a5bd16…e57d  — zgodna co do bajtu
```

## 79.4 GRANICA PRZEBIEGU 2 — **udowodniona drugą mutacją, nie opisana**

Twierdzenie z §78.3 („nie złapie podmiany o tej samej długości") sprawdziłem
mutacją ostrzejszą: **jednostronna zmiana BRZMIENIA, wykonana poprawnie w obu
warstwach jednej trasy.**

```
MUTACJA 2:  pl.json  Hero.potwierdzenieUE: „Dane przechowywane w UE” → „Dane trzymane w UE”
            naglowek.md: to samo zdanie + deklaracja
            cennik.md / Cennik.potwierdzenie3 — NIETKNIĘTE
WYNIK:
  przebieg 1  → zapalił się, ale NA MOIM BŁĘDZIE LICZENIA (19 zamiast 18) — nie na szwie
  przebieg 2  → MILCZY.  Ciąg przestał występować w cennik.md, więc nie ma
                drugiej strony do porównania. To jest M-2: cisza z braku
                materiału, nie zieleń.
  strażnik znak-w-znak `hero.spec.ts:179` → PRZESZEDŁ. Edycja spójna w obu
                warstwach jest dla niego niewidzialna z definicji.
PRZYWRÓCENIE:  SHA-256 obu plików zgodne co do bajtu.
```

**Uczciwe odczytanie przebiegu:** w tym samym uruchomieniu `hero.spec.ts` pokazał
**2 czerwone testy** (`:31` i `:120`) — i **nie są one wykryciem szwu**. Serwer
`npm start` podawał build sprzed mutacji, więc DOM niósł stare brzmienie, a `messages`
nowe. **To artefakt nieaktualnego builda, nie działanie strażnika.** Zapisuję to,
bo bez tego zdania czerwień wyglądałaby na dowód, którym nie jest.

**Wniosek: §52.4 ZOSTAJE OTWARTE.** Bramka deklaracji **dotknęła szwu jako pierwszy
mechanizm w historii tego repozytorium** — i go nie domyka. Domknięcie wymaga asercji
`Hero.potwierdzenieUE === Cennik.potwierdzenie3` w warstwie `messages`, której nie
robi nic.

## 79.5 POKRYCIE W KOMUNIKACIE — trzy rodzaje milczenia rozdzielone

Komunikat zieleni podaje **cztery liczby, nie jedną**: deklaracje sprawdzone ·
ciągi porównane **między** plikami · wystąpienia **bez deklaracji** (jawnie nazwane
**ciszą M-2, nie zielenią**) · ciągi poniżej progu (**cisza M-3, poza zasięgiem**).

Nagłówek pliku wylicza **cztery granice, których bramka nie pilnuje**, w tym tę
z §79.4. Bramka mówi, czego nie sprawdza.

## 79.6 DECYZJA DO PODJĘCIA — wpięcie do `pre-commit`

**Nie wpiąłem i nie wpinam bez rozstrzygnięcia.** Powód: bramka jest dziś **czerwona
na dziesięciu rzeczywistych defektach**, a `pre-commit` blokuje każdy commit,
w tym dokumentacyjny.

| wariant | skutek |
|---|---|
| **A — wpiąć teraz** | repozytorium zablokowane do czasu poprawienia dziesięciu deklaracji. Poprawka jest **zmianą w warstwie treści** — objęta zasadą „zmiany treści wyłącznie przez pipeline" i regułą „korekta obejmuje CAŁY PLIK" |
| **B — wpiąć po poprawkach** | bramka działa jako `npm run bramka:deklaracje` od zaraz; wpięcie po zamknięciu dziesięciu |

**Nie rekomenduję ani nie wykonuję** — dziesięć rozjazdów to defekty **niezlecone
do naprawy**, a zasada toru brzmi: defekt na listę, nie do naprawy z własnej
inicjatywy. **Do rozstrzygnięcia właściciela.**

---

# 80. ŁAŃCUCHY PER JĘZYK — pomiar wykonany. **JEDEN JEST DZIŚ PĘKNIĘTY W DE**

Warunek 4 odbudowy: *„pomiar 21 łańcuchów per język wchodzi do wsadu jako DANE,
nie jako zasada. Autor bez tej tabeli dostaje regułę bez materiału."*

**Metoda:** spłaszczenie `messages`, grupowanie kluczy PL po **równej wartości**
(próg 12 zn, ≥2 klucze), następnie sprawdzenie dla każdej grupy, czy te same klucze
mają jedną wartość także w EN i DE. Pomiar 2026-08-21, czubek `4b7679e`.
Tabela pełna: `scratchpad/tor9/LANCUCHY-PER-JEZYK.md`.

## 80.1 Wynik

> **PL 20 · EN 20 · DE 19**

Dziewiętnaście z dwudziestu łańcuchów trzyma się we wszystkich trzech językach.

## 80.2 Łańcuch pęknięty — **defekt wykryty dziś, niepilnowany przez nic**

Ciąg PL: **„Masz plan działania i bazę, która rośnie, gdy ty prowadzisz rozmowy."**
Klucze: `Filary.filar1.korzysc` (`/`) = `FunkcjePozyskiwanie.zdanie` (`/funkcje/pozyskiwanie`)

| język | stan |
|---|---|
| PL | **ŁAŃCUCH** — jedno brzmienie |
| EN | **ŁAŃCUCH** — „You have a plan for the day and a contact base that grows while you do the talking." w obu |
| **DE** | **PĘKŁ** — `Filary.filar1.korzysc` = „Du hast **einen Plan für den Tag** und eine Kontaktbasis…" · `FunkcjePozyskiwanie.zdanie` = „Du hast **einen Aktionsplan** und eine Kontaktbasis…" |

**To jest jedna z ośmiu par kręgosłupa D-D9** — korzyść filara 1 powtórzona jako zdanie
podstrony. **W DE nie jest już powtórzeniem.** Nic tego nie asertuje: strażniki
znak-w-znak porównują każdy klucz z **jego własnym** plikiem treści, a nie klucze
między sobą (§53.6). Ten defekt mógł powstać w dowolnym momencie i przeszedł przez
każdą bramkę na zielono.

## 80.3 Granica pomiaru — cisza M-3, nie zieleń **(POPRAWIONA 2026-08-21)**

**Deklaracja pierwotna była za wąska.** Napisałem, że poza zasięgiem są „cztery relacje
podciągowe" — jakby chodziło o cztery znane pozycje. **Chodzi o całą klasę.**

> **Poza zasięgiem tego pomiaru jest KLASA ŁAŃCUCHÓW ZDANIOWYCH — powtórzeń na poziomie
> ZDANIA WEWNĄTRZ ciągu, a nie całego ciągu. Jej liczność jest NIEZNANA.**

Metoda grupowała klucze po **równej wartości całego ciągu**. Ciąg zawierający cudze
zdanie nie trafia do żadnej grupy. Cztery relacje z §52.1 (Ł-3, Ł-5, Ł-6, Ł-7) to
**przykłady tej klasy, które ktoś zauważył**, nie jej spis. Agent A0-R4 wykrył dwie
dalsze (`N-R4-1`, `N-R4-2`) w dwóch przestrzeniach, których nie skanowałem pod tym kątem.
**Nikt nie policzył całości.**

## 80.4 Czego ta granica NIE unieważnia

**Dwadzieścia łańcuchów równościowych jest zmierzonych poprawnie**, ×3 języki, komendą
powtarzalną. Wynik PL 20 · EN 20 · DE 19 stoi. Pęknięcie w DE stoi. Wynik D-D9
23/24 verbatim stoi.

**Granica dotyczy tego, czego nie objęto, nie tego, co zmierzono.** Rozróżnienie jest
regułą, nie uprzejmością wobec własnego pomiaru: pomiar wąski i zadeklarowany jest
wynikiem; pomiar wąski i podany jako pełny jest nieprawdą.

**Skutek liczbowy:** „21 łańcuchów", którym operowałem w §60.1, było sumą dwóch
różnych rodzin — 16 z §1 i 5 z §52.1, przy czym część drugiej grupy to relacje
podciągowe, nie równościowe. **Rodzin nie wolno sumować.** Liczby rozdzielone:
**20 łańcuchów równościowych** (zmierzone, per język) + **4 relacje podciągowe**
(wykryte, niezmierzone systematycznie).

---

# 81. ODBUDOWA — RUSZYŁA. Zakres i konstrukcja zlecenia

**Osiem tras, `/login` i `/nie-znaleziono` poza zakresem** (rozstrzygnięcie właściciela).
`/cennik` ma fundament gotowy i sparowany (A0-C). **Odbudowywanych siedem.**

`/dla-kogo` weszła do panelu **decyzją z uzasadnieniem, które zapisuję, bo jest regułą
na przyszłość**:

> **Trasa z nogą łańcucha nie może stać poza panelem — to jest dokładnie konstrukcja,
> przez którą runda pierwsza pękła.**

## 81.1 Brief wiążący jako PLIK, nie jako treść zlecenia

`scratchpad/tor9/BRIEF-ODBUDOWA.md` — jeden dokument dla wszystkich agentów, zawiera
kształt wyniku (sześć członów na pozycję), sześć reguł, notację trójstanową, listę
rozstrzygnięć do wbudowania i **nakaz zapisu raportu do pliku PRZED odpowiedzią**.

**To jest zastosowanie reguły z KANONU do samego zlecenia:** materiał, który ma przeżyć
dłużej niż jedną wymianę zdań, jest plikiem. Poprzedni fundament zginął, bo brief
i raport żyły w rozmowie.

## 81.2 Podział — cztery agenty, siedem tras

| agent | trasy | dlaczego razem |
|---|---|---|
| **A0-R1** | `/` | najtrudniejsza samodzielnie: S11+C-05, złożenie `Obawy.o3`, rodzina Z-1 ×2, **9 z 10 rozjazdów deklaracji**, pasek potwierdzeń |
| **A0-R2** | `/funkcje` + `/dla-kogo` | obie niosą pozycje kierunku `f8_*` i cztery nogi łańcuchów o wysokim rozgałęzieniu, do wczoraj opisywanych jako „poza panelem" |
| **A0-R3** | `/funkcje/pozyskiwanie` + `/funkcje/tresci` | obie w rejestrze przez klucze (Resend, Anthropic, platformy); **tu siedzi łańcuch pęknięty w DE** |
| **A0-R4** | `/funkcje/zespol` + `/funkcje/wyniki` | obie objęte N-C1 (pełna forma Pulsu w prozie), P0-4 i zakazem nazywania roli w Akademii |

## 81.3 Czego zlecenie NIE dopuszcza

Agent nie proponuje brzmień · nie naprawia defektów · nie zmienia niczego
w repozytorium · nie ocenia własnej pracy · **nie stawia `[A]` bez ścieżki do pliku**.
Odpowiedź w rozmowie ograniczona do 30 linii — **materiałem jest plik**.

---

# 82. ŁAŃCUCH D-D9 PĘKNIĘTY W DE — pozycja własnej wagi

**Rozstrzygnięcie właściciela 2026-08-21:** nie wiersz w tabeli, osobna pozycja.
Uzasadnienie właściciela: *„decyzja D-D9 istnieje po to, żeby nie powstał czwarty
wariant tej samej obietnicy"* — a jedna z ośmiu par kręgosłupa **nie jest już
powtórzeniem**.

**Ciąg:** `Filary.filar1.korzysc` (`/`) = `FunkcjePozyskiwanie.zdanie` (`/funkcje/pozyskiwanie`)
**DE:** „Du hast **einen Plan für den Tag** und eine Kontaktbasis…" ↔
„Du hast **einen Aktionsplan** und eine Kontaktbasis…"

## 82.1 Dwa zdania, o które prosił właściciel

> **1.** Defekt **przeszedł przez każdą bramkę na zielono, bo nic tego nie asertuje** —
> strażniki znak-w-znak porównują każdy klucz z **jego własnym** plikiem treści, nigdy
> klucze między sobą. **To jest ten sam szew co przy pasku potwierdzeń (§52.4), tylko
> w innej warstwie:** tam dwa klucze o równej wartości na dwóch trasach, tu dwa klucze
> o wartości, która **przestała** być równa. Mechanizm luki identyczny — brak asercji
> krzyżowej w warstwie `messages`.
>
> **2.** **Nie wiemy, kiedy powstał, i to jest osobne ustalenie: nie mamy sposobu
> datowania rozjazdu w tłumaczeniu.** Historia gita w klonie to 10 commitów (§63.1),
> pliki treści mają po jednym na język, gałąź była przepisywana. Rozjazd mógł powstać
> przy pierwszym przekładzie albo wczoraj — **repozytorium nie niesie różnicy**.

## 82.2 ZADANIE WYKONANE: pozostałe siedem par — **jeden defekt, nie dryf systematyczny**

Pomiar 2026-08-21, czubek `9781860`, **osiem par × trzy języki = 24 sprawdzenia**:

| para D-D9 | kluczy | PL | EN | DE |
|---|---|---|---|---|
| `filar1.naglowek` | **3** | verbatim | verbatim | verbatim |
| `filar1.korzysc` | 2 | verbatim | verbatim | **PĘKŁ** |
| `filar2.naglowek` | 2 | verbatim | verbatim | verbatim |
| `filar2.korzysc` | 2 | verbatim | verbatim | verbatim |
| `filar3.naglowek` | 2 | verbatim | verbatim | verbatim |
| `filar3.korzysc` | 2 | verbatim | verbatim | verbatim |
| `filar4.naglowek` | 2 | verbatim | verbatim | verbatim |
| `filar4.korzysc` | 2 | verbatim | verbatim | verbatim |

> **PĘKNIĘTYCH: 1 z 24. DE nie dryfuje systematycznie.**

**Wsad dla autorów niesie to jako pojedynczy defekt**, nie jako ostrzeżenie o warstwie.
Gdyby wynik był odwrotny, wsad musiałby nieść regułę o DE; nie musi.

**Naprawa NIE teraz** — zmiana brzmienia, idzie przez panel (rozstrzygnięcie właściciela).

## 82.3 Znalezisko przy okazji — kręgosłup D-D9 stosowany NIERÓWNO na indeksie

`FunkcjeIndeks.blok1Naglowek` jest **trzecim kluczem** łańcucha filara 1 — nagłówek
bloku indeksu powtarza nagłówek filara **verbatim**. Bloki 2, 3 i 4 **nie**:

| blok | `FunkcjeIndeks.blokNNaglowek` `[STAN]` | `Filary.filarN.naglowek` `[STAN]` |
|---|---|---|
| 1 | „Rano widzisz, do kogo się odezwać." | **identyczne** |
| 2 | „Siadasz do postów i nie zaczynasz od pustej kartki." | „Piszesz. Tarcza sprawdza. Pieczęć potwierdza." |
| 3 | „Nowa osoba dołącza, a ty nie tłumaczysz od nowa." | „Nowa osoba wie, co robić od pierwszego dnia" |
| 4 | „Wieczorem wiesz, na czym stoisz." | „Widzisz wzrost nawet po trudnym dniu" |

**Czwarte dziś wystąpienie wariantu B** (czynność zastosowana do jednej pozycji
z rodziny, nie do sióstr) — **albo świadoma decyzja projektowa**. Rozstrzygnięcia
nie znalazłem; **do audytu „zwyczaj czy decyzja"**, nie do naprawy. Ma znaczenie
praktyczne: autor przepisujący nagłówek filara 1 zmienia **trzy** miejsca,
a przepisujący filary 2–4 zmienia **dwa**.

---

# 83. LICZBA ZBIORCZA UKRYWA RODZAJ — powiązanie międzytorowe

**Rozstrzygnięcie właściciela 2026-08-21.** Korekta 21 → **20 + 4** przyjęta,
z powiązaniem:

> To ta sama klasa co **„12 wystąpień" z toru 8**, gdzie okazało się, że to **dwa różne
> mechanizmy**. **Liczba zbiorcza ukrywa rodzaj, dopóki ktoś nie policzy osobno.**

**Mechanizm:** liczba powstaje przez **dodanie**, a dodawanie wymaga wspólnej jednostki.
Kiedy jednostka jest nazwana słowem („łańcuch", „wystąpienie"), a nie definicją, suma
przechodzi — i od tej chwili nikt już nie pyta, co się na nią złożyło. **Rozdzielenie
jest możliwe tylko przez ponowny pomiar**, bo liczba nie niesie w sobie śladu składników.

**Wystąpienie w torze 9:** „21 łańcuchów" = 16 z §1 + 5 z §52.1, gdzie druga grupa
zawierała **relacje podciągowe**, nie równościowe. Rozdzielone dopiero pomiarem:
**20 równościowych** (mierzalne per język) + **4 podciągowe** (niemierzalne tą metodą).

**Konsekwencja operacyjna:** liczba zbiorcza w dokumencie niesie **definicję jednostki**
albo rozbicie na składniki. Sama nazwa jednostki nie wystarcza — „łańcuch" znaczyło
w tym torze dwie różne rzeczy przez dwa dni.

**Warunek §51 zastosowany:** tory czytały różny materiał (tor 8 — kod, tor 9 — warstwa
treści), klasa **nie jest w KANONIE**. Zbieżność jest dowodem. **Piąta zbieżność
międzytorowa.**

---

# 84. BRAMKA DEKLARACJI — WPIĘTA DO CI JAKO ŻÓŁTA

**Rozstrzygnięcie właściciela 2026-08-21**, z uzasadnieniem, które zapisuję dosłownie,
bo jest regułą na przyszłość:

> Wpięcie do `pre-commit` przy dziesięciu żywych defektach zablokowałoby każdy commit,
> w tym dokumentacyjny — czyli **bramka w dniu wprowadzenia uczyłaby, jak ją obchodzić**.

## 84.1 Co zrobiono

`.github/workflows/bramki.yml` → zadanie **`bramka-deklaracje`**, `continue-on-error: true`.
Nazwa zadania mówi to wprost: **„Bramka: Deklaracje długości (ŻÓŁTA — raportuje, nie blokuje)"**.

**Warunek przejścia na czerwoną zapisany W ZADANIU, nie w niczyjej pamięci:**
```
`npm run bramka:deklaracje` wychodzi na zero naruszeń
  → usuń `continue-on-error` z tego zadania
  → dopisz `node scripts/lint-deklaracje.mjs` do `.githooks/pre-commit`.
Do tego czasu zieleń tego zadania NIE JEST warunkiem scalenia.
```

Komentarz zadania niesie też **cztery granice**, których bramka nie pilnuje —
w tym tę, że **szew §52.4 nie jest nią domknięty**.

## 84.2 Dziesięć defektów — jeden wiersz każdy. **NIE naprawiane.**

| # | plik | klucz | dekl. | fakt. | trasa | czy i tak przepisywane |
|---|---|---|---|---|---|---|
| 1 | `pl/naglowek.md` | `Hero.naglowek` | 62 | **58** | `/` | **TAK** — H1, oś całego panelu |
| 2 | `pl/filary.md` | `Filary.filar1.konkret1` | 71 | **68** | `/` | **TAK** — „DMO **układa** kolejność rozmów", rodzina **Z-1** |
| 3 | `pl/filary.md` | `Filary.filar1.konkret2` | 74 | **73** | `/` | niepewne |
| 4 | `pl/filary.md` | `Filary.filar1.konkret3` | 67 | **66** | `/` | niepewne |
| 5 | `pl/filary.md` | `Filary.filar2.konkret2` | 65 | **66** | `/` | niepewne |
| 6 | `pl/filary.md` | `Filary.filar3.konkret1` | 75 | **72** | `/` | niepewne |
| 7 | `pl/filary.md` | `Filary.filar3.konkret3` | 60 | **63** | `/` | niepewne |
| 8 | `pl/obawy.md` | `Obawy.p1` | 41 | **42** | `/` | niepewne |
| 9 | `pl/definicja.md` | `Definicja.tresc` | 275 | **256** | `/` | niepewne |
| 10 | `en/cennik.md` | `Cennik.plany.starter.pozycja2` | 65 | **57** | `/cennik` | **TAK** — „DMO — a Daily Action Plan that **tells you what to do today**", rodzina **Z-1** |

**Odpowiedź na pytanie właściciela — trzy z dziesięciu siedzą w zdaniach, które i tak
przepisujemy** (1, 2, 10), przy czym dwa z nich to **to samo zdanie w dwóch językach
i na dwóch trasach** (rodzina Z-1).

**Ustalenie ważniejsze od tej trójki: dziewięć z dziesięciu siedzi na trasie `/`.**
Redakcja `/` dotyka `naglowek.md`, `filary.md`, `obawy.md` i `definicja.md` — a reguła
KANONU („korekta obejmuje **cały plik**") sprawia, że **wszystkie dziewięć zamknie się
przy redakcji jednej trasy**. Dziesiąty (`en/cennik.md`) zamknie się przy `/cennik`.

**Nie trzeba osobnego zadania naprawczego.** Warunek przejścia bramki na czerwoną
domyka się **sam**, przy redakcji dwóch tras — jeśli reguła całego pliku zostanie
dotrzymana.

---

# 85. WZORZEC POKRYCIA — która bramka go nie ma. **JEDNA.**

Zadanie właściciela: wypisać bramki, do których nie powielono wzorca „raportuj
pokrycie, nie samą zieleń".

**Sprawdzone: dziewięć skryptów bramek, komunikat zieleni każdego.**

| bramka | komunikat zieleni | pokrycie |
|---|---|---|
| `check-linki.mjs:202` | „…(N artefaktów, M ścieżek rejestru × 3 języki…)" | **MA** |
| `check-parytet.mjs:64` | „…(N plików w każdym z trzech drzew)" | **MA** |
| `check-nojs.mjs:52` | „…(N stron z treścią czytelną bez JavaScriptu)" | **MA** |
| `check-kotwice.mjs:138` | „…(N linków z fragmentem, 0 martwych kotwic)" | **MA** |
| `check-audyt.mjs:56` | „…(raport dla `commit`… bez blokad)" | **MA** |
| `lint-liczby.mjs:369` | „…(warstwa kodu + N rozstrzygniętych ciągów…, 3 języki)" | **MA** |
| `lint-deklaracje.mjs:192` | cztery liczby + rozdzielenie M-2/M-3 | **MA** |
| `check-kontrakt-tokenow.mjs:86` | zakres, wartości, próg **oraz** „Detekcja zmian aplikacji: **BRAK** — `kontrakt-aplikacji.json` aktualizuje ręcznie właściciel" | **MA — i to najlepszy w repozytorium**: nazywa nie tylko pokrycie, ale i **czego nie wykrywa** |
| **`lint-tokeny.mjs:188`** | **„Linter tokenów: zielony."** | **BRAK** |

## 85.1 Jedna bramka, i akurat ta

`lint-tokeny` jest **jedyną**, która nie mówi o sobie nic — i jednocześnie:
- **biegnie w `pre-commit`**, czyli jej komunikat czyta się najczęściej ze wszystkich;
- **niesie wyjątek z datą** (T15: osłona bloku eksperymentu palety, wygasa 2026-08-31),
  którego **stanu jej zieleń nie ujawnia**;
- ma zasięg szerszy, niż mówi jej własna dokumentacja (**T20**) — komentarz obiecuje
  osłonę „wyłącznie barw", mechanizm osłania **całe linie**.

**Zieleń „Linter tokenów: zielony." nie mówi ani ile plików sprawdzono, ani czy wyjątek
jest aktywny, ani ile linii osłania.** Trzy rzeczy, które są w tej bramce zapisane
jako dług (T15, T20), są **niewidoczne w chwili, gdy ktoś na nią patrzy**.

**Sformułowanie właściciela, do zapamiętania:**
> **Trzecia bramka w tym repozytorium, która wie o sobie więcej, niż mówi.**

**Nie naprawiam** — defekt niezlecony. Na listę.

---

# 86. PROWIENIENCJA MUTACJI — reguła do `00-METODA`, tymczasowo tutaj

**Rozstrzygnięcie właściciela 2026-08-21:**
> Przy dowodzeniu mutacją potwierdź, że mierzysz **TEN** stan, który zmutowałeś —
> build sprzed mutacji daje czerwień wyglądającą na wykrycie. To jest wariant
> „strażnik prowieniencji" ze strony www, tylko przy mutacji zamiast przy pomiarze
> wydajności.

**Wpisane do `CLAUDE.md`** (KANON), z rozbiorem przypadku z §79.4 i z rodziną:
T3/T22 (prowieniencja pomiaru wydajności — czy mierzysz **to** wdrożenie, o którym
mówi log) oraz T11 (`reuseExistingServer` — podpięcie do cudzego procesu daje czerwień,
która nie mówi nic o kodzie, i zieleń, która też nie mówi nic).

## 86.1 Ustalenie o adresacie — **`00-METODA` nie istnieje w tym repozytorium**

Sprawdzone (R-H): `find . -iname "*metoda*"` → **zero trafień**;
`grep -rn "00-METODA" --include=*.md .` → **zero trafień**.
W `docs/redakcja/` leży jeden plik: `00-USTALENIA-TOR9.md`.

**Wniosek:** `00-METODA` jest artefaktem **poza `catherly-www`** — najpewniej po stronie
innego toru albo w materiałach właściciela. **Klasa R-C: nieweryfikowalne stąd.**
Regułę zapisuję **w dwóch miejscach, do których mam dostęp** — KANON (`CLAUDE.md`)
i ten dokument — i **zgłaszam adresata**, zamiast pisać do dokumentu, którego nie widzę.

**Szóste wystąpienie klasy R-C/T21 w tym torze.** Poprzednie pięć osłabiało twierdzenie
albo blokowało pracę; **to jest pierwsze, które dotyczy MIEJSCA ZAPISU, nie źródła.**
Polecenie „dopisz do X" jest wykonalne tylko wtedy, gdy X jest osiągalne — a tego
nikt nie sprawdza przed wydaniem polecenia.

---

# 87. FUNDAMENT — A0-R4 WRÓCIŁ (2 z 8 tras). Trzy agenty pracują.

Raport: `scratchpad/tor9/A0-R4-ZESPOL-WYNIKI.md`, 517 linii, **zapisany do pliku
przed odpowiedzią** — reguła KANONU dotrzymana.

**31 pozycji sparowanych** (`/funkcje/zespol` 16, `/funkcje/wyniki` 15), 60 kluczy
×3 języki = 180 ciągów. **Proporcja: `[Z]` 31 · `[A]` 0 · `[N]` 0**, plus 8 pozycji
kubła R-D wypisanych osobno.

**Zero `[A]` jest decyzją agenta, nie brakiem materiału** — uzasadnił ją tak, że
zapisuję: skoro nie proponuje brzmień, `[A]` byłoby mu do niczego, a nieodtworzony
cytat wprowadziłby klasę R-E. **Notacja zadziałała jako narzędzie projektowe, nie
tylko opisowe: agent wybrał metodę, żeby uniknąć `[A]`.**

## 87.1 Cztery odpowiedzi na pytania ze zlecenia

| pytanie | odpowiedź |
|---|---|
| **N-C1** | **ZGODNE.** `FunkcjeZespol.f8_2`, `FunkcjeWyniki.f8_2`, `f8_3` niosą pełną formę ×3 języki; nazwa „Puls" nie pada na tych trasach. **Odkrycie:** obie trasy **mają strażnika poz. 11** (`frazyMilczenia`, `funkcje-podstrony.spec.ts:156-158`, `:194-196`) — **`/cennik` nie ma**, i tam pozycja jest w naruszeniu (§57.1) |
| **P0-4** | `FunkcjeWyniki` **NIE tnie `TO:144`** — „sprzedaż, aktywne kontakty, aktywność zespołu" komplet ×3 języki, bez bramki planu. **Drugi kontrdowód** wobec `CennikSkrot.roznica`, obok `FunkcjeZespol.f8_1`. §27 opisał **jedną** nogę; są **dwie** |
| **Akademia** | Rola **nie nazwana** (zero trafień). **Ale `mod6_poco` opisuje mechanizm otwierania ×3 języki** — konstrukcję, którą §19 uznał za niedopuszczalną i którą **P0-3 usunął z `/`**. **Naprawa objęła `/` i nie objęła tej trasy** |
| **wyłączność dostępu** | Dosłownego śladu `Obawy.o4` brak. **Ale `FunkcjeWyniki.mod5_nie` mówi „rejestr widzisz ty" ×3 języki, bez wiersza pokrycia** — echo Z-9 wprost pod R-A |

## 87.2 Dwie rzeczy z tego raportu ważniejsze od reszty

**(a) Akademia: piąte dziś wystąpienie wariantu B.** P0-3 usunął opis mechanizmu
otwierania z `/` i **nie objął `/funkcje/zespol`**. To nie jest „naprawa pominęła drugą
implementację" — to naprawa treści zastosowana **do jednej trasy z rodziny**.
Klasa B po stronie treści, **na naprawie zleconej przez ten sam panel**.

**(b) Strażnik poz. 11 istnieje na dwóch trasach i nie ma go tam, gdzie trwa naruszenie.**
`funkcje-podstrony.spec.ts` pilnuje milczenia o Pulsie na trasach, które go nie łamią;
`/cennik`, która łamie (§57.1, wiersz tabeli), strażnika nie ma. **Mechanizm istnieje,
nie jest wołany tam, gdzie jest potrzebny** — po stronie strażników, nie treści.

## 87.3 Sześć nowych defektów zgłoszonych, **nie naprawianych**

`N-R4-1` łańcuch „Pulpit pokazuje dzisiejszy stan…" ma **trzy** nogi ×3 języki, nie dwie
(trzecia: `FunkcjeIndeks.blok4Wprowadzenie` zd. 1) — **korekta mojej mapy §1 i §80** ·
`N-R4-2` łańcuch verbatim **wyłącznie w EN** — lustro Ł-3, pierwszy znany przypadek
łańcucha powstałego w tłumaczeniu · `N-R4-3` `FunkcjeZespol.mod1_poco` odwraca sprawstwo
wobec `TO:110` (rodzina Z-1, **nieujęta w §34**) · `N-R4-4` „można zweryfikować" bez
wiersza · `N-R4-5` „rejestr widzisz ty" · `N-R4-6` `funkcje-wyniki.md:21` odsyła
do „w. 120/228", faktycznie 121/229.

**`N-R4-1` i `N-R4-2` uderzają w moją tabelę §80:** pomiar łańcuchów mierzył grupy
o **równej wartości całych ciągów**; łańcuch na poziomie **zdania wewnątrz ciągu**
jest poza jego zasięgiem. **To rozszerza ciszę M-3 z §80.3** — nie o cztery relacje
podciągowe, ale o **całą klasę łańcuchów zdaniowych**, której nie policzyłem.

## 87.4 Czego agent nie sprawdził — przepisane bez łagodzenia

Nie uruchomił testów e2e (cytuje ich treść, nigdy wynik) · **nie zweryfikował żadnej
z 12 obietnic filarów 3–4 wobec aplikacji** (§67.1, adresat: tor aplikacji) · nie ustalił,
kto ma uprawnienie w Akademii · nie odczytał `first90` (poz. 23) · skan podciągowy
zrobił **tylko dla swoich dwóch przestrzeni** · nie czytał
`tresci-trzy-podstrony-po-panelach.md` ani `rejestr-korekt-tresci.md` · nie sprawdził
podstawy dla `mod1_nie` · **nie czytał cudzych raportów** — co jest poprawne,
bo panel wymaga niezależności składów.

---

# 88. NOWA KLASA: **ŁAŃCUCH POWSTAŁY W TŁUMACZENIU**

**Rozstrzygnięcie właściciela 2026-08-21: pozycja własnej wagi i nowa klasa.**

> Do tej pory zakładaliśmy, że łańcuchy powstają w PL i **pękają** w przekładzie.
> Tu jest odwrotnie: **przekład stworzył powtórzenie, którego oryginał nie ma.**

**Wystąpienie** (A0-R4, `N-R4-2`): `FunkcjeIndeks.blok4Wprowadzenie` zd. 2
= `FunkcjeWyniki.mod4_poco` zd. 2 — **verbatim wyłącznie w EN**. W PL i DE oba zdania
są różne.

## 88.1 Dlaczego to nie jest ciekawostka

**Autor pracujący na PL nie ma jak się o tym dowiedzieć.** Łańcuch nie istnieje
w materiale, który czyta. Zmienia zdanie w EN — bo warunek O-1 każe mu podać trzy
brzmienia — i **rozbija powtórzenie, o którego istnieniu nie wiedział**.

Sytuacja jest **odwrotna do pęknięcia DE z §82**: tam obowiązek jest „nie rozjedź tego,
co ma być jedno"; tu jest „nie rozbij tego, co jest jedno **tylko tam**".
**Drugi obowiązek jest niewykonalny bez danych** — nie da się go wyprowadzić z reguły.

## 88.2 Do wsadu jako OSTRZEŻENIE, nie przypis

> **Łańcuch może istnieć w jednym języku i nie istnieć w dwóch pozostałych — w obie
> strony.** Przed zmianą zdania w EN albo DE sprawdź tabelę łańcuchów **dla tego języka**,
> nie dla PL. Tabela `LANCUCHY-PER-JEZYK.md` pokazuje grupy PL i ich stan w EN/DE —
> **nie pokazuje grup, które istnieją wyłącznie w EN albo wyłącznie w DE.**

**To jest luka w moim własnym pomiarze, nazwana:** grupowałem po wartościach **PL**.
Grupa istniejąca wyłącznie w EN nie miała jak się w tym pomiarze pojawić.
**Nieznana liczność — cisza M-3, ta sama co w §80.3.**

---

# 89. KARTA ŁAŃCUCHA — **arność nogi musi być w niej zapisana**

**Rozstrzygnięcie właściciela 2026-08-21:** *„To musi być w karcie łańcucha, inaczej
autor zmieni dwa i zostawi trzecie."*

| łańcuch | nóg | uwaga dla autora |
|---|---|---|
| `Filary.filar1.naglowek` | **3** | + `FunkcjeIndeks.blok1Naglowek` + `FunkcjePozyskiwanie.naglowek` |
| `Filary.filar2/3/4.naglowek` | **2** | indeks **nie** powtarza tych nagłówków |
| „Pulpit pokazuje dzisiejszy stan…" | **3** | trzecia noga: `FunkcjeIndeks.blok4Wprowadzenie` zd. 1 (`N-R4-1`) — **mapa §1 mówiła 2** |

**Dwie z trzech pozycji tej tabeli to korekty mojej własnej mapy.** Mapa §1 podawała
arność wyprowadzoną ze skanu równościowego; **noga będąca ZDANIEM wewnątrz dłuższego
ciągu nie miała jak się w niej pojawić** (§80.3).

**Wniosek dla karty łańcucha:** arność nie jest własnością ciągu, tylko **wynikiem
pomiaru o zadeklarowanym zasięgu**. Karta podaje arność **i metodę, którą ją ustalono** —
inaczej autor przyjmie „2" za fakt, a to jest „2 w skanie równościowym".

---

# 90. ZERO `[A]` NA 31 POZYCJI — ustalenie o NOTACJI, nie o agencie

**Rozstrzygnięcie właściciela 2026-08-21.** Agent A0-R4 postawił `[Z]` na wszystkich
31 pozycjach i **zero `[A]`**, uzasadniając: skoro nie proponuje brzmień, `[A]` byłoby
mu do niczego, a nieodtworzony cytat wprowadziłby klasę R-E.

> **Notacja zadziałała PROJEKTOWO, nie opisowo. Agent zmienił METODĘ, żeby uniknąć
> znacznika, którego nie mógłby obronić.**

## 90.1 Drugi mechanizm działania wzorca „stan niewyrażalny"

Wzorzec z KANONU miał dotąd **jeden** mechanizm: zły stan przestaje być wyrażalny,
więc nie powstaje — link do nieistniejącej trasy, czwarty konkret w krotce, warunek
odsyłający do pustki. **Wykrywanie zastąpione niemożliwością.**

**Drugi mechanizm, wykryty dziś:** znacznik, którego **nie da się obronić**, zmienia
**sposób pracy** jeszcze przed powstaniem materiału. Nikt nie zabronił agentowi `[A]` —
warunek §75 wymaga tylko ścieżki. Agent **wybrał drogę, na której `[A]` nie jest
potrzebne**.

| | mechanizm 1 | mechanizm 2 |
|---|---|---|
| moment | **wykrywanie** | **praca** |
| działa przez | niemożliwość zapisu złego stanu | koszt obrony słabego znacznika |
| przykład | `ISTNIEJACE_SCIEZKI`, krotka `konkrety` | `[A: ścieżka]` → agent pracuje tak, żeby nie musieć go stawiać |
| widoczny w | kodzie | **metodzie, którą ktoś wybrał** |

**Drugi mechanizm jest tańszy i mniej widoczny.** Nie zostawia śladu w kodzie —
zostawia go w tym, **czego ktoś nie zrobił**. Rozpoznaje się go wyłącznie po tym,
że proporcja wyszła lepsza, niż się spodziewano. **Właściciel spodziewał się przewagi
`[A]` i poprosił o liczbę; liczba wyszła 0 — i to jest wynik działania warunku,
nie wynik pomiaru materiału.**

**Zastrzeżenie, bez którego to ustalenie jest za mocne:** jeden agent, jedna para tras.
Trzy pozostałe raporty pokażą, czy mechanizm powtarza się, czy był cechą tego składu.
**Do sprawdzenia po komplecie fundamentu.**

---

# 91. AKADEMIA — **naprawa własnego panelu objęła jedną trasę z dwóch**

**Rozstrzygnięcie właściciela 2026-08-21: cięższe niż poprzednie cztery wystąpienia
wariantu B.**

> Nie „ktoś kiedyś nie powielił", tylko **„nasza własna naprawa, w tym samym cyklu,
> objęła jedną trasę z dwóch"**.

**Stan** (A0-R4): P0-3 usunął opis **mechanizmu otwierania** Akademii z trasy `/`.
`FunkcjeZespol.mod6_poco` niesie ten sam mechanizm **×3 języki** na `/funkcje/zespol`.
Rola nie jest nazwana na żadnej z tras (zgodnie z §19) — **niedopuszczalna jest sama
konstrukcja mechanizmu**, i ta stoi dalej.

## 91.1 Do KANONU — ostrzeżenie dla rundy drugiej

> **Każda naprawa treści musi wymienić WSZYSTKIE trasy, na których stoi naprawiane
> twierdzenie** — inaczej powtórzymy to przy siedmiu trasach naraz.

**Powód, dla którego to jest pilne właśnie teraz:** P0-3 działał, gdy panel obejmował
**jedną** trasę, i pominął jedną sąsiednią. Runda druga obejmuje **osiem**.
Ta sama wada przy tej samej skuteczności da **siedem pominięć na naprawę**, nie jedno.

**Wpisane do `CLAUDE.md`.**

---

# 92. STRAŻNIK MILCZENIA — wpięcie vs występowanie. **ZADANIE WYKONANE**

Pomiar 2026-08-21, czubek `bc5f94e`. Pełny wynik:
`scratchpad/tor9/STRAZNIK-MILCZENIA.md`.

## 92.1 Na których trasach mechanizm jest wpięty

| trasa | fraz na liście | źródło |
|---|---|---|
| `/dla-kogo` | **58** | `dla-kogo.spec.ts:104` |
| `/funkcje` | **44** | `funkcje-indeks.spec.ts:154` |
| `/funkcje/zespol` | 17 wspólnych + własne | `funkcje-podstrony.spec.ts` |
| `/funkcje/wyniki` | 17 wspólnych + własne | `funkcje-podstrony.spec.ts` |
| `/funkcje/pozyskiwanie` | **17** | `funkcje-pozyskiwanie.spec.ts:282` |
| `/funkcje/tresci` | 17 wspólnych + `["youtube"]` | `funkcje-podstrony.spec.ts:114` |
| **`/`** | **0** | **BRAK LISTY** |
| **`/cennik`** | **0** | **BRAK LISTY** |

## 92.2 Rozjazd dwóch zbiorów — **cztery przypadki, wszystkie na `/cennik`**

| fraza | występuje na | pilnowana tam | pilnowana gdzie indziej |
|---|---|---|---|
| „puls zespołu" | `/cennik` — `Cennik.plany.growth.pozycja1` (pl) | **NIE** | `/funkcje/wyniki` |
| „team pulse" | `/cennik` (en) | **NIE** | `/funkcje/wyniki` |
| „team-puls" | `/cennik` (de) | **NIE** | `/funkcje/wyniki` |
| „rozliczenia" | `/cennik` — `Cennik.okresLegenda` = „Okres rozliczenia" (pl) | **NIE** | `/funkcje` |

**Czterdzieści pięć z czterdziestu dziewięciu fraz nie występuje nigdzie w treści** —
to strażnik **prewencyjny** i jego milczenie jest poprawne (M-1).

## 92.3 Trzy z czterech potwierdzają §57.1 z drugiej strony

Fraza „puls zespołu" **jest pilnowana na `/funkcje/wyniki`, gdzie nie występuje**,
i **nie jest pilnowana na `/cennik`, gdzie występuje**. To jest wada nazwana przez
właściciela — **„mechanizm istnieje, nie jest wołany" po stronie STRAŻNIKÓW** — zmierzona
i policzona. **Nie jest to jedyny przypadek: są cztery, i wszystkie na jednej trasie.**

## 92.4 Czwarty przypadek jest INNEJ NATURY i ratuje mechanizm przed złą naprawą

„rozliczenia" na `/cennik` to `Cennik.okresLegenda` = **„Okres rozliczenia"** —
etykieta przełącznika okresu, **nie twierdzenie o funkcji**. Rejestr poz. 1 dotyczy
słowa „Rozliczenia" jako **obietnicy w H1 i podtytule**, wstrzymanej do czasu Stripe.

**Lista milczenia jest zakazem PODCIĄGU i nie odróżnia obietnicy od etykiety.**
Gdyby ktoś „naprawił" lukę przez skopiowanie listy `/funkcje` na `/cennik`, bramka
zapaliłaby się na **poprawnej etykiecie UI** — czyli fałszywą czerwienią w dniu wpięcia.

**Ustalenie:** luki `/cennik` **nie da się domknąć kopiowaniem listy**. Wymaga listy
własnej albo rozróżnienia obietnica/etykieta, którego mechanizm dziś nie ma.
**To jest ten sam wniosek co przy `/`** — i jest powodem, dla którego dwie trasy
zostały bez list, którego dotąd nie znaliśmy.

## 92.5 Kubeł „nie sprawdzono" (R-D)

- **Nie sprawdzono wierności fraz w EN i DE** — lista zawiera formy trójjęzyczne
  („puls zespołu"/„team pulse"/„team-puls"), ale nie zweryfikowałem, czy każda fraza
  ma komplet trzech.
- **Nie sprawdzono warstwy renderowanej** — mierzyłem `messages`, a strażnik czyta HTML.
  Fraza mogąca wejść do HTML z komponentu (nie z `messages`) jest poza tym pomiarem.
- **Nie sprawdzono, czy listy nie zawierają fraz wzajemnie sprzecznych** z sankcjami
  tabeli obietnic.

---

# 93. `lint-tokeny` — na listę premierową, nie tylko na listę defektów

**Rozstrzygnięcie właściciela 2026-08-21.** Poza wpisem z §85:

> **Wyjątek wygasa za jedenaście dni (2026-08-31), a komunikat o tym milczy.**

`lint-tokeny.mjs:188` mówi wyłącznie „Linter tokenów: zielony." Wyjątek `oslonaWyjatku()`
osłania blok eksperymentu palety **do 2026-08-31**; po tej dacie linter zapala się
na samym istnieniu bloku (T15). **Dziś, jedenaście dni przed, jego zieleń nie niesie
o tym ani słowa.**

**Pozycja checklisty premiery:** przed 2026-08-31 blok palety i blok kroju
(`public/fonts/eksperyment/`, `public/proba-kroju.html`) muszą zniknąć razem
z `oslonaWyjatku()`, albo data musi zostać świadomie przesunięta decyzją.
**Trzecia pozycja checklisty premiery** obok poz. 13 (robots) i T7 (zdania przedpremierowe)
— i pierwsza z nich, która **ma twardą datę**.

---

# 94. REJESTR PRZESŁANEK — P-7

| # | przesłanka | kto wprowadził | co na niej zbudowano | obalenie |
|---|---|---|---|---|
| **P-7** | `00-METODA` jest dokumentem osiągalnym z tego repozytorium | **właściciel** | polecenie „dopisz regułę prowieniencji mutacji do `00-METODA`" | `find . -iname "*metoda*"` → zero · `grep -rn "00-METODA"` → zero. **Dokument należy do toru 8** (potwierdzone przez właściciela) |

**Zapis właściciela, dosłownie:**
> „Polecenie «dopisz do X» jest wykonalne tylko wtedy, gdy X jest osiągalne,
> a tego nikt nie sprawdza przed wydaniem polecenia."

**Klasa: R-C dotycząca MIEJSCA ZAPISU, nie źródła.** Sześć wcześniejszych wystąpień
dotyczyło artefaktów, do których dokument **się odwoływał**; to pierwsze dotyczy
artefaktu, do którego dokument **miał być dopisany**. Różnica praktyczna: odwołanie
do nieosiągalnego artefaktu **osłabia twierdzenie**; polecenie zapisu do nieosiągalnego
artefaktu **produkuje pracę, która znika bez śladu** — i to jest dokładnie mechanizm,
przez który zginął fundament sześciu tras (§74).

---

# 95. MELDUNEK FUNDAMENTU — komplet ośmiu tras. **PRZED AUTORAMI.**

Cztery raporty, wszystkie **zapisane do plików przed odpowiedzią** (reguła KANONU
dotrzymana przez wszystkie cztery składy):

| agent | trasy | pozycji | linii raportu |
|---|---|---|---|
| A0-R1 | `/` | **48** | 2127 |
| A0-R2 | `/funkcje` + `/dla-kogo` | **50** | 1235 |
| A0-R3 | `/funkcje/pozyskiwanie` + `/funkcje/tresci` | **31** | 1287 |
| A0-R4 | `/funkcje/zespol` + `/funkcje/wyniki` | **31** | 517 |
| A0-C | `/cennik` (fundament wcześniejszy, sparowany) | — | — |
| **razem** | **osiem tras** | **160 pozycji** | **5166** |

## 95.1 PROPORCJA `[Z]`/`[A]`/`[N]` — liczbą, nie złagodzona

> **Na 160 pozycji: czyste `[A]` — JEDEN. Czyste `[N]` — DWA.**

| agent | `[Z]` | `[A: ścieżka]` | `[N]` |
|---|---|---|---|
| A0-R1 | 45 | **1** (`00-USTALENIA-TOR9.md`) | 2 |
| A0-R2 | 44 pełnych + 5 z członem `[N]` + 1 z członem `[A]` | **0** | 0 |
| A0-R3 | 28 + 3 z członem `[A: ścieżka]` | **0** | 1 częściowo |
| A0-R4 | 31 | **0** | 0 |

**Ani jednego `[A]` bez ścieżki w żadnym z czterech raportów.**

## 95.2 ROZSTRZYGNIĘCIE OTWARTEGO PYTANIA Z §90 — **i częściowe wycofanie tamtego ustalenia**

§90 zapisało zero `[A]` jako **drugi mechanizm wzorca „stan niewyrażalny"**: znacznik,
którego nie da się obronić, zmienia metodę pracy. Zastrzegłem tam: jeden agent, jedna
para tras, do sprawdzenia po komplecie.

**Komplet jest. Odczyt był za mocny.**

Trzy z czterech składów podały powód **wprost, i jest to ten sam powód, nie mechanizm
projektowy**:
- A0-R1: „wyszło odwrotnie **wyłącznie dlatego, że fundamentu sześciu tras nie ma**
  (§74), więc nie było czego oznaczyć `[A]`";
- A0-R2: „**nie z zasługi**: fundament sześciu tras zginął, więc nie było czego cytować
  i musiałem odczytać wszystko sam";
- A0-R4: uzasadnienie metodyczne (nie proponuję brzmień → `[A]` byłoby mi do niczego).

> **Zero `[A]` jest w przeważającej części skutkiem §74 — utraty materiału — a nie
> działania warunku §75.** Jeden skład na cztery podał powód projektowy.

**Co z §90 zostaje:** mechanizm drugi **istnieje** (A0-R4 go pokazał) i opis jest
poprawny. **Co upada: przypisanie mu tego wyniku.** Gdyby fundament sześciu tras
istniał, proporcja wyglądałaby inaczej i nie wiemy jak.

**Ustalenie metodyczne z tego wycofania:** **wynik zgodny z regułą nie dowodzi, że
reguła zadziałała.** Trzy składy dały tę samą liczbę z powodu, który nie ma z regułą
nic wspólnego. Rozpoznanie było możliwe **wyłącznie dlatego, że każdy z nich podał
powód** — gdyby raporty niosły samą proporcję, ustalenie §90 stałoby dalej i byłoby
nieprawdą.

---

# 96. TRZY TWIERDZENIA A0-R1 SPRAWDZONE PRZEZE MNIE. **DWA OBALAJĄ ROZSTRZYGNIĘCIA.**

Nie przyjąłem ich na słowo (R-H, nauka z P-1). Komendy i wyniki poniżej.

## 96.1 `Hero.podtytul` **nie zawiera członu „szkolenia" w żadnym języku** — POTWIERDZONE

```
pl (107 zn): „Catherly to system do własnej sprzedaży bezpośredniej — kontakty,
             treści, zespół i wyniki w jednym miejscu."
en (109 zn): „…— contacts, content, team, and results in one place."
de (112 zn): „…— Kontakte, Inhalte, Team und Ergebnisse an einem Ort."
```

**Cztery człony: kontakty · treści · zespół · wyniki.** Każdy odpowiada jednemu
z czterech filarów i ma wiersz pokrycia. **Członu o szkoleniach nie ma.**

### Co to obala

Rozstrzygnięcie z 2026-08-19 („**AKADEMIA WYPADA Z HERO** — podtytuł dostaje trzy
człony") oraz wcześniejsze potwierdzenie „szkolenia" jako **P0** stoją na przesłance,
że podtytuł niesie człon o szkoleniach. **Nie niesie.**

**Wykonane dosłownie — „podtytuł ma mieć trzy człony" — rozstrzygnięcie usunęłoby
człon POKRYTY.** Nie ma czego wyjąć; wyjęcie czegokolwiek zabiera prawdę, nie nieprawdę.

### Skąd wzięła się przesłanka

Z **propozycji właściciela** rozbieranej człon po członie w fundamencie rundy pierwszej
(sekcja „POZYCJA 1 — ROZBIÓR PROPOZYCJI WŁAŚCICIELA", **Człon D — „szkolenia"**).
Był to człon **proponowanego nowego podtytułu**, nie dzisiejszego.
Panel potraktował go jak stan.

**Szóste wystąpienie R-E** — i największe, bo przeszło do rozstrzygnięcia właściciela
i stało w dokumencie dwa dni jako P0.

### Do decyzji właściciela — nie rozstrzygam

Czy rozstrzygnięcie „Akademia wypada z hero" **odpada w całości** (nie ma czego wyjmować,
a P0 był pozorny), czy **przekształca się** w zadanie o innym przedmiocie —
np. „podtytuł ma cztery człony i to jest stan docelowy, potwierdzone".

## 96.2 Pełna forma Pulsu ma **94 znaki, nie 95** — POTWIERDZONE

```
TO:121  „W planie Growth widzisz sygnały ryzyka odejścia i dostajesz gotowe
         zdanie otwierające rozmowę."                                    = 94 zn
CennikSkrot.roznica (dziś na `/`)                                        = 94 zn
```

**Podmiana w PL jest długościowo NEUTRALNA — co do znaku.**

### Co to obala

§37.1 zapisało 95 zn i na tej liczbie opierał się argument, że pełna forma **nie
mieści się** w miejscu S11. **Argument upada.** Rozstrzygnięcie właściciela („Puls
zostaje wyłącznie w pełnej formie") **nie upada** — upada jedyna przeszkoda techniczna,
którą przy nim odnotowano. **Rozstrzygnięcie staje się łatwiejsze do wykonania, nie
trudniejsze.**

Siódme wystąpienie R-E — liczba przepisana bez ponownego pomiaru (§76: **liczba też
jest cytatem**).

## 96.3 `TO:76` mówi „przez **lidera**", nie „przez **liderkę**" — POTWIERDZONE

```
content/tabela-obietnic.md:76  „Twoje treści trafiają do zatwierdzenia przez lidera
                                — śledzisz status w czasie rzeczywistym."
```

Mój cytat w §35 i §37.2 podawał „przez liderkę". **Różnica wyjaśniona**
(`slownik-nazw.md:30` rozstrzyga formę), ale **cytat nie był verbatim** — a §37.2
opierało się na nim przy rozstrzygnięciu Z-A7.

**Ósme wystąpienie R-E.** Nie zmienia rozstrzygnięcia (przedmiot ten sam), zmienia
status dowodu: **to było parafrazą podaną jako cytat** — czyli naruszenie R-F.

---

# 97. §67.1 KOREKTA — **kod aplikacji JEST osiągalny z tej sesji**

§67.1 zapisało, że tor 9 „nie może wykonać" weryfikacji obietnic wobec aplikacji,
bo pracuje na klonie tylko do odczytu, a kod jest w innym repozytorium.

**Twierdzenie było za mocne i A0-R1 je obalił niezależnie.** Repozytorium aplikacji
leży pod `/home/user/fbo-os`, gałąź `origin/feat/cs-build`, i **odczytałem z niego
kod rozliczeń już 2026-08-21** (§55.2). A0-R1 odczytał z niego dodatkowo
`vercel.json:4` i `ZADANIA_RECZNE.md:394`.

| twierdzenie §67.1 | status |
|---|---|
| „kod aplikacji w innym repozytorium" | **PRAWDA** |
| „tor 9 **nie może** tego wykonać" | **NIEPRAWDA** — może i częściowo wykonał |
| „stan produkcyjny zależy od zmiennych i dashboardów spoza obu repozytoriów" | **PRAWDA i to jest właściwa granica** |

**Brzmienie poprawione:** tor 9 **może czytać kod aplikacji i tego nie zrobił dla
270 z 271 wierszy tabeli obietnic**. Luka nie jest „niewykonalna stąd" — jest
**niewykonana i poza zakresem toru treściowego**. Adresat bez zmian: **tor aplikacji**.
Różnica praktyczna: zlecenie nie wymaga przenoszenia repozytoriów, tylko **czasu
i zakresu**.

**A0-R1 dołożył do tego szóste wystąpienie R-C/T21:** raport Z4 cytuje
`ZADANIA_RECZNE.md:15`, a fakt stoi dziś w `:394` po reorganizacji pliku —
**odwołanie do numeru wiersza jest tak samo nietrwałe jak skrót commita**.
Oraz: **dwa z trzech „dowodów" regionu bazy opisują środowisko `dev`.**

---

# 98. FUNDAMENT — CO WNIÓSŁ. Rzeczy, których panel nie miał wczoraj.

## 98.1 Trzy uderzenia w rozstrzygnięcia (poza §96)

| # | co | skutek |
|---|---|---|
| **§34 para 2 miała TRZY nogi, ma CZTERY** | `FunkcjeIndeks.blok3Wprowadzenie` — „Kreator prowadzi nową osobę" ×3 języki, przy `TO:110` „**Wdrażasz**" | Rozstrzygnięcie §37.3 („przepisujemy **jedno zdanie**, nie trzy") zapadło **przy niepełnym liczniku**. Do decyzji: czy obejmuje czwartą |
| **Akademia pominęła DWIE trasy, nie jedną** | `DlaKogo.s3_robi_2` opisuje mechanizm **i nazywa rolę „administrator / der Administrator" ×3 języki** — łamie §19, §29 **i kartę tonu pkt 4** (formy męskie) | Reguła z §91 jest pilniejsza, niż wyglądała: naprawa objęła 1 z 3 tras |
| **P0-4 jest sprzecznością WEWNĄTRZSTRONOWĄ** | `RytmDnia.krok3Tresc` ×3 języki: „Pulpit — swój dzień **i dzień zespołu** obok siebie", **bez bramki**, dwie sekcje **nad** S11. Plus S4 i S7 | **Cztery zdania na `/` obalają piąte, wszystkie nad nim.** `TO:144` tną **cztery** klucze trzema cięciami — §56 obejmował dwa |

## 98.2 Nowe łańcuchy i nowe rodziny ciszy

- **Ł-8** (A0-R2): `Filary.filar4.korzysc` = `FunkcjeWyniki.zdanie` ⊂ `FunkcjeIndeks.blok4Wprowadzenie`
  — **trzy nogi, ×3 języki**, brak w mapie §1 i w piątce §52.1.
- **Ł-7 potwierdzony jako podciąg we wszystkich trzech językach** i od dziś w całości
  w panelu (bo `/dla-kogo` weszła).
- **M-4 — czwarta cisza** (A0-R2): stan, którego **nie liczy żaden licznik**; 21 wartości.
  Do rozstrzygnięcia, czy to osobny rodzaj, czy podprzypadek M-2.
- **N-R1-09:** trzy różne rodzaje ciszy (M-1/M-2/M-3) **na jednym kluczu w trzech
  językach**, dwukrotnie — próg 12 znaków **przecina klucz w środku**.

## 98.3 Wkład do bramki deklaracji — trzy rzeczy, których nie przewidziałem

1. **`/funkcje/pozyskiwanie`, `/funkcje/tresci`, `/funkcje`, `/dla-kogo`: ZERO
   deklaracji długości** (A0-R2, A0-R3). Bramka sprawdziła 230 pozycji i **ani jednej
   z tych czterech tras**. **Warunek O-1 nie ma tam linii bazowej.**
2. **N-R1-07:** przy ciągach o identycznej wartości bramka przypisuje deklarację
   kluczowi **arbitralnie** (reguła najdłuższego dopasowania nie rozstrzyga remisu).
   Po naprawie per język **jedna noga wpadnie w ciszę M-2 niezauważona.**
3. **D-K5:** „liczba znaków" **nie ma jednej definicji** dla siedmiu kluczy
   `sN_robi_*` — strażnik liczy widoczną, bramka surową, **różnica do 66 zn**.
   **O-1 nie mówi, którą.**

## 98.4 Defekty zgłoszone, nie naprawiane: **38**

A0-R1 11 · A0-R2 9 · A0-R3 12 · A0-R4 6. Pełne opisy w czterech raportach.

## 98.5 Kubeł „nie sprawdzono" — wspólny mianownik czterech raportów

**Żaden z czterech agentów nie uruchomił pakietu e2e** (biorą zieleń z §65 jako `[A]`).
**Żaden nie zweryfikował ani jednego wiersza tabeli obietnic wobec aplikacji**
poza rozliczeniami. **Żaden nie zmierzył 21 łańcuchów systematycznie** — każdy zmierzył
te, które dotykają jego przestrzeni. **Żaden nie oceniał poprawności językowej EN/DE.**

**To nie są przeoczenia — to jest zakres, którego zlecenie nie obejmowało.**
Zapisuję je razem, bo cztery niezależne kubły „nie sprawdzono" **schodzą się w tych
samych czterech punktach**, a to znaczy, że są luką **metody**, nie składów.

---

# 99. §37.3 ROZSZERZONE NA CZWARTĄ NOGĘ + reguła o rozstrzygnięciach z liczbą

**Rozstrzygnięcie właściciela 2026-08-21:** `FunkcjeIndeks.blok3Wprowadzenie` **wchodzi**.
Reguła stoi (przy konflikcie korzyści z granicą wygrywa granica) — **zmienia się liczba
miejsc, nie kierunek.**

**Para sprawstwa „prowadzić" — komplet czterech nóg:**

| # | klucz | brzmienie `[STAN]` | wiersz |
|---|---|---|---|
| 1–3 | ujęte w §34 para 2 | — | `TO:110` „**Wdrażasz** nową osobę…" |
| **4** | `FunkcjeIndeks.blok3Wprowadzenie` | „**Kreator prowadzi** nową osobę" ×3 języki | `TO:110` — podmiotem jest **ona** |

## 99.1 Reguła do KANONU — ważniejsza od samej korekty

> **Rozstrzygnięcie zawierające liczbę miejsc jest ważne dla stanu pomiaru, z którego
> powstało.** Nowy pomiar zmieniający tę liczbę **nie unieważnia kierunku, ale
> unieważnia zakres** — i wymaga **zgłoszenia, nie cichego rozszerzenia**.
>
> **Operacyjnie:** przed wykonaniem rozstrzygnięcia wymieniającego liczbę miejsc
> **przelicz ją na aktualnym pomiarze**. Wzrosła — zgłoś. Spadła — też.

**Wpisane do `CLAUDE.md`** z dwoma wystąpieniami z jednego dnia: para „prowadzić"
(3 → 4) i podtytuł hero („dostaje trzy człony" → ma cztery, wszystkie pokryte).

**Dlaczego to jest reguła o rozstrzygnięciach właściciela, a nie o pomiarach:**
wykonanie na liczbie sprzed pomiaru jest **wykonaniem cudzego rozstrzygnięcia
w zakresie, którego autor nie znał**. Wykonawca nie ma jak zauważyć różnicy, jeśli nie
przeliczy — bo rozstrzygnięcie brzmi tak samo.

---

# 100. AKADEMIA — rola wróciła tylnymi drzwiami. **ROZSTRZYGNIĘTE.**

## 100.1 Stan

| trasa | co stoi | status |
|---|---|---|
| `/` | opis mechanizmu **usunięty** przez P0-3 | naprawione |
| `/funkcje/zespol` | `mod6_poco` — **mechanizm otwierania ×3 języki** | **pominięte przez naprawę** |
| `/dla-kogo` | `s3_robi_2` — **mechanizm + rola „administrator / der Administrator" ×3 języki** | **pominięte + naruszenie** |

**Naprawa P0-3 objęła jedną trasę z trzech.**

## 100.2 Co ustalił właściciel — i dlaczego to zmienia sprawę

> Rola, którą **wycofałem z rozstrzygnięcia** o Akademii, **stoi w treści od dawna
> i nikt jej nie zauważył, bo pytanie dotyczyło hero.**
>
> Moje wycofanie decyzji o roli obowiązuje — ale teraz wiem, że **nie było decyzją
> o wprowadzeniu roli, tylko o jej NIEZMIENIANIU w miejscu, w którym już stoi.**

**To jest osobne ustalenie o naturze decyzji, nie o Akademii:** wycofanie decyzji
w sprawie, która wyglądała na hipotetyczną, było w istocie **utrzymaniem stanu
zastanego** — a stan zastany był naruszeniem. **Decyzja „nie rozstrzygam" ma skutek
tylko wtedy, gdy wiadomo, co stoi.** Nikt nie sprawdził, co stoi, bo pytanie postawiono
o miejsce, w którym nie stało nic.

## 100.3 ROZSTRZYGNIĘCIE

> **„administrator" wypada ×3 języki.** Konstrukcja neutralna, wzorem granicy
> z `/funkcje/zespol`. **Panel dobiera brzmienie, zakres rozstrzygnięty.**
> To jest **zmiana usuwająca naruszenie, nie wprowadzająca nazwę.**

Naruszane jednocześnie: **§19** (zakaz nazywania roli), **§29** (neutralność jako
decyzja z datą), **karta tonu pkt 4** (formy męskie). **Trzy zakazy, jedno zdanie,
trzy języki.**

## 100.4 Do wsadu jako pozycja, nie przypis

Naprawa P0-3 pominęła **dwie** trasy, a na jednej z nich siedzi **dodatkowo** naruszenie
trzech zapisów. **Wariant B rodziny napraw punktowych, po stronie naprawy zleconej
przez ten sam panel** — i najcięższe z pięciu dzisiejszych wystąpień, bo pominięcie
**przykryło** naruszenie, zamiast je tylko zostawić.

---

# 101. BRAK LIST MILCZENIA NA `/` I `/cennik` — śladu decyzji NIE MA

## 101.1 Szukanie śladu — komendy i wyniki (R-H)

| co | wynik |
|---|---|
| `grep -rn "milczeni\|MILCZENI" docs/faza-2 docs/faza-3 docs/faza-4` filtrowane po `cennik/hero/główn/brak` | **3 trafienia, żadne nie dotyczy braku listy na `/` ani `/cennik`** |
| `grep -rln "strażnik milczenia\|tabela milczenia" docs/` | 7 plików — **wszystkie o podstronach funkcji** |

**Pochodzenie mechanizmu ustalone:** strażnik milczenia powstał jako część **wzorca
podstrony funkcji** (`brief-k12-podstrona-funkcji.md:63`, `RAPORT-POWYKONAWCZY-WWW.md:248`
— „implementacja **wzorcowej podstrony**: 48 testów, strażnik milczenia").
**`/` i `/cennik` powstały wcześniej i nigdy nie należały do tej rodziny.**

## 101.2 Werdykt: **ZWYCZAJ, ale z dobrym powodem technicznym**

Zgodnie z rozstrzygnięciem właściciela — **pierwsza pozycja audytu „zwyczaj czy decyzja"
z USTALONĄ PRZYCZYNĄ TECHNICZNĄ**, mimo braku zapisanej decyzji.

**Przyczyna (§92.4):** lista milczenia jest **zakazem PODCIĄGU** i nie odróżnia
obietnicy od etykiety UI. Skopiowanie listy `/funkcje` na `/cennik` zapaliłoby bramkę
na `Cennik.okresLegenda` = „**Okres rozliczenia**" — poprawnej etykiecie przełącznika.

**Ale przyczyna techniczna nie jest tym samym co decyzja:** nikt jej nie zapisał,
więc nikt jej nie znał, więc **nie mogła być powodem** — została odkryta dziś,
po fakcie. **Zwyczaj z dobrym powodem, którego nikt nie miał.**

## 101.3 PROPOZYCJA STRAŻNIKA — **da się, ale nie samym dopasowaniem fraz**

Właściciel: *„musi rozróżniać obietnicę od etykiety. Jeśli się nie da — powiedz wprost
i zaproponuj węższy zakres."*

**Da się — i nie przez węższą listę, tylko przez REJESTR SANKCJI PER KLUCZ.**
Ta sama konstrukcja, której repozytorium używa już **dwa razy**:
`content/liczby-w-tresci.json` (liczby w treści) i `content/deklaracje-zlozone.json`
(deklaracje złożone). **Trzecie wystąpienie wzorca.**

| element | rozstrzygnięcie |
|---|---|
| przedmiot | wartości `messages` przestrzeni trasy, nie surowy HTML — asercja na **kluczu**, nie na stronie |
| reguła | fraza z listy **nie może** wystąpić w żadnej wartości |
| wyjątek | wpis w rejestrze: **klucz + fraza + powód**, np. `Cennik.okresLegenda` / „rozliczenia" / „etykieta przełącznika okresu, nie obietnica; poz. 1 rejestru dotyczy słowa w H1 i podtytule" |
| skutek | „obietnica vs etykieta" przestaje być **oceną językową**, a staje się **zapisanym rozstrzygnięciem** — czyli tym, do czego ten tor dochodzi za każdym razem |

**Ile sankcji trzeba — zmierzone, nie oszacowane:**

| trasa | trafień 49 fraz w jej przestrzeniach | sankcji do zapisania |
|---|---|---|
| **`/`** | **0** | **ZERO — lista wchodzi zielona, bez ani jednego wyjątku** |
| **`/cennik`** | 4 | **JEDNA** (`Cennik.okresLegenda`). Pozostałe trzy to **Puls — realne naruszenie §57.1**, nie wyjątek |

**Weryfikacja wsteczna dostępna od razu:** strażnik dla `/cennik` **zapala się dziś
na trzech frazach Pulsu** i milczy na sankcjonowanej etykiecie. Dla `/` wchodzi zielony
i wymaga dowodu przez mutację (§79.3).

**Nie implementuję** — §37. Propozycja bez wykonania.

## 101.4 Granica tej propozycji, zadeklarowana

Asercja na `messages` **nie widzi tekstu wstawianego przez komponent** (etykiety
w JSX, `aria-label` literalne). Dzisiejsi strażnicy czytają **HTML** i to widzą.
**Zamiana przedmiotu na klucz kupuje precyzję i traci zasięg** — do rozstrzygnięcia,
czy trzymać oba przebiegi (HTML szeroki bez wyjątków dla podstron, `messages` wąski
z rejestrem dla `/` i `/cennik`), czy ujednolicić.

---

# 102. CZTERY DROBNE, KTÓRE NIE SĄ PRZYPISAMI

## 102.1 `funkcje-indeks.spec.ts` — **czwarta bramka wiedząca o sobie więcej, niż mówi**

`:17`, `:119`, `:280` deklarują „**20 kluczy** `FunkcjeIndeks`". **Jest 21** — rachunek
zgubił `f8_2`. Asercja **porównuje listę z samą sobą**, więc liczba przechodzi.

**To jest §76 („liczba też jest cytatem") w warstwie strażników**, i drugi po
`lint-tokeny` przypadek bramki, której własny opis nie zgadza się z jej działaniem
(pierwszy: T20 — zasięg osłony szerszy niż dokumentacja). **Na listę.**

## 102.2 Ł-8 — dopisany do mapy §1 **z adnotacją o pochodzeniu**

`Filary.filar4.korzysc` = `FunkcjeWyniki.zdanie` ⊂ `FunkcjeIndeks.blok4Wprowadzenie`
— **trzy nogi, ×3 języki**.

> **Adnotacja obowiązkowa (rozstrzygnięcie właściciela):** Ł-8 **nie powstał** —
> mapa §1 nie była kompletna. Skan równościowy nie mógł go zobaczyć, bo trzecia noga
> **zawiera** dwie pozostałe, zamiast im być równa (§80.3, klasa łańcuchów zdaniowych).

**Ta adnotacja jest ważniejsza od samej pozycji:** bez niej czytelnik przyjmie, że
serwis się zmienił. Zmieniła się **zdolność pomiaru**.

## 102.3 O-1 bez linii bazowej — **ROZSTRZYGNIĘTE**

Cztery trasy mają **zero deklaracji długości**. Rozstrzygnięcie właściciela:

> **Autor podaje liczby dla nowych brzmień mimo braku bazy — to zakłada linię,
> a nie ją odtwarza.**

Warunek O-1 obowiązuje bez wyjątku. Efekt uboczny, korzystny: pierwsze deklaracje
na tych trasach powstaną **razem z bramką**, więc nie będą miały okazji się rozjechać.

## 102.4 M-4 — jednym zdaniem

> **M-4 to ciąg `messages`, którego w żadnym pliku treści nie ma — cisza, której
> do dziś nie liczył żaden licznik, więc wyglądała jak brak przedmiotu.**

---

# 103. BRAMKA DEKLARACJI POPRAWIONA — dwa defekty własne, znalezione przez agenta

A0-R2 wykrył w bramce, którą zbudowałem tego samego dnia, **dwa defekty. Oba naprawione,
bo oba unieważniały wymóg, który właściciel zatwierdził** (§79.5 — raportuj pokrycie,
nie samą zieleń). Nie jest to naprawa niezleconego defektu — to **domknięcie własnej,
zleconej roboty**.

| # | defekt | poprawka |
|---|---|---|
| **D-K8** | cztery liczby pokrycia stały **wyłącznie w gałęzi zielonej**. Bramka jest dziś czerwona, więc wymóg pokrycia **nie działał ani razu od chwili wprowadzenia** | pokrycie drukuje się **zawsze**, na zielono i na czerwono |
| **D-K7** | ciąg nieodnaleziony w pliku treści **nie zwiększał żadnego z trzech liczników** — cisza bez śladu | dodany licznik **M-4**, liczony **per klucz**, nie per para klucz×plik |

**Uwaga konstrukcyjna z pierwszej wersji poprawki, zapisana bo jest pouczająca:**
licznik M-4 liczony per para klucz×plik dał **10 658** — liczbę prawdziwą i bez
znaczenia (każdy ciąg z definicji nie występuje w kilkunastu plikach). **Per klucz
daje 79.** Ta sama pułapka co „liczba zbiorcza ukrywa rodzaj" (§83), tylko odwrotna:
tu jednostka była zbyt drobna, żeby cokolwiek znaczyć.

**Komunikat po poprawce** `[STAN, uruchomienie 2026-08-21]`:
```
✗ Bramka deklaracji CZERWONA: 10 naruszeń.
  POKRYCIE: 230 deklaracji sprawdzonych w 3 językach (M-1)
            · 3 ciągów porównanych MIĘDZY plikami
  CISZA — NIE ZIELEŃ: 782 wystąpień bez deklaracji obok (M-2)
            · 79 kluczy nieobecnych w żadnym pliku treści (M-4)
            · 116 kluczy poniżej progu 12 zn (M-3)
```

**Nowe ustalenie z samego pomiaru: 79 kluczy nie występuje w ŻADNYM pliku treści.**
Skoro strażniki znak-w-znak porównują `messages` z plikiem treści, **te 79 kluczy jest
poza zasięgiem także ich** — czyli poza obiema warstwami pilnowania naraz.
**Nie sprawdzono, które to klucze ani czy jest to stan zamierzony.** (R-D)

---

# 104. PANEL RUNDY DRUGIEJ — architektura fal i sufit środowiska

**Polecenie właściciela 2026-08-21:** maksymalna liczba agentów równolegle, tryb domyślny
(fundament → autorzy → sędziowie → adwersarze). Jedyne ograniczenie: **trasy dzielące
ten sam łańcuch idą w tej samej grupie**, a sędziowie i adwersarze pracują na
**komplecie propozycji, nie per grupa**.

## 104.1 Sufit — ustalony pomiarem, nie przyjęty

| wielkość | wartość |
|---|---|
| rdzenie | **4** (`nproc`) |
| pamięć | **15 GB**, wolne 14 |
| dysk | 29 GB wolnego |
| obciążenie przy starcie | **0,01** |
| punkt sprawdzony | **4 agenty równolegle**, czysto; 216–378 tys. tokenów każdy, 16–31 min |

**Przyjęty sufit roboczy: DWANAŚCIE agentów w fali.** Uzasadnienie: agenci są związani
**wejściem-wyjściem** (odczyty plików, wywołania modelu), nie procesorem — cztery rdzenie
nie są tu wiązaniem. Dwanaście to **trzykrotność punktu sprawdzonego** z zapasem pamięci.
**Nie osiemnaście:** nieudana fala kosztuje więcej niż dwie czyste, a materiału nie da się
odzyskać z omówienia (§74).

## 104.2 Podział na grupy — po ŁAŃCUCHU, nie po trasie

Ograniczenie właściciela („trasy dzielące łańcuch w tej samej grupie") przy podziale
**po trasach** dałoby **jedną grupę ośmiu tras** — bo trzy łańcuchy o najwyższym
rozgałęzieniu („Sprawdź, jak działa" ×8, „Wszystko powyżej działa od planu Starter." ×8,
„Rezygnujesz w każdej chwili." ×7) dotykają niemal wszystkich tras. **Podział po trasach
jest wobec tego ograniczenia niewykonalny.**

**Rozwiązanie: podział po MATERIALE.** Sześć grup dobranych tak, żeby **każdy łańcuch
leżał w całości w jednej grupie**:

| grupa | materiał | dlaczego razem |
|---|---|---|
| **A — RAMA** | wezwania, zamknięcia, `f8_*`, potwierdzenia, spisy, okruszki — **na wszystkich ośmiu trasach** | tu żyją wszystkie łańcuchy o rozgałęzieniu ≥4 |
| **B — FILARY** | kręgosłup D-D9: 8 par nagłówek/korzyść + konkrety + bloki indeksu + Ł-8 | osiem par łańcuchowych plus jedyne dziś pęknięcie DE |
| **C — `/` WŁASNE** | `Hero.naglowek/podtytul`, `Problem`, `Definicja`, `RytmDnia`, `Obawy`, `CennikSkrot` | treść bez nogi poza trasą, poza `Obawy.o3` (łańcuch z `/cennik`, tylko PL) |
| **D — `/cennik` WŁASNE** | plany, tabela, FAQ, nagłówek, przełącznik okresu | druga noga `Obawy.o3`; C-1, C-2, C-05 |
| **E — PODSTRONY WŁASNE** | klucze `mod*` czterech podstron filarowych | treść modułowa bez nóg poza własną trasą |
| **F — `/funkcje` + `/dla-kogo` WŁASNE** | bloki indeksu, 33 etykiety, sekcje `/dla-kogo` | `/dla-kogo` weszła do panelu 2026-08-21 |

**Szew C↔D nazwany wprost w obu zleceniach:** `Obawy.o3` (`/`) i `Cennik.faq.o4`
(`/cennik`) to jeden łańcuch **wyłącznie w PL**, a naprawa S11 wymaga równoległej
naprawy C-05. Grupy C i D mają **wypisać, czego wymagają od siebie nawzajem** —
synteza dostanie to jako jawne żądanie, nie jako domysł.

## 104.3 Trzej autorzy o rozłącznych metodach — nie trzy warianty tego samego

| autor | metoda | czego się od niego oczekuje |
|---|---|---|
| **W1** | Schwartz + Collier | kanalizacja **istniejącego** pragnienia; wejście w rozmowę toczącą się w jej głowie |
| **W2** | Hopkins | konkret zamiast przymiotnika; **weryfikowalność każdego członu z osobna**, z numerem wiersza `TO` i jego słowem |
| **W3** | Sugarman | rytm i kolejność czytania; **nie presja** — arsenał odrzucony kasuje całą propozycję bez oceny reszty |

**W3 dostał grupy, w których jego metoda jest najtrudniejsza** (A — zamknięcia, czyli
miejsce, gdzie zjeżdżalnia się kończy; D — cennik, czytany skokami, nie ciągiem).
**To jest celowe:** metoda stosowana tam, gdzie działa sama, nie odróżnia autora od
szablonu.

## 104.4 Zawieszenie przekazane do wszystkich zleceń

Sekcja 8 briefu autorów, w każdym z dwunastu zleceń:
> **Rozstrzygnięcie „Akademia wypada z hero, podtytuł dostaje trzy człony" JEST
> ZAWIESZONE.** `Hero.podtytul` ma **cztery** człony, każdy z wierszem pokrycia,
> i **nie zawiera członu o szkoleniach w żadnym języku**. Wykonanie dosłowne usunęłoby
> człon prawdziwy. **Nie usuwaj żadnego członu.**

Propozycja dotykająca podtytułu wraca oznaczona `WSTRZYMANA` z wariantem zachowującym
cztery człony. **Panel nie stoi na jednym nierozstrzygniętym punkcie — punkt jedzie
z panelem, oznaczony.**

## 104.5 Fale

| fala | skład | stan |
|---|---|---|
| **1** | **12 autorów** — grupy A, B, C, D × W1/W2/W3 | **URUCHOMIONA** |
| 2 | 6 autorów — grupy E, F × W1/W2/W3 | po fali 1 |
| 3 | **3 sędziów** o rozłącznych kryteriach, na **komplecie 18 propozycji** | — |
| 4 | 1 synteza | — |
| 5 | **3 adwersarzy**, na komplecie | — |

**Sędziowie i adwersarze pracują na komplecie — nie per grupa** (warunek właściciela).
Powód konstrukcyjny, nie tylko formalny: **sprzeczność między grupami jest dokładnie tą
klasą, której runda pierwsza nie złapała**, bo każdy skład widział wycinek.

## 104.6 Reguła zastosowana do samego panelu

Wszystkie dwanaście zleceń niesie nakaz: **zapisz raport do pliku PRZED odpowiedzią**,
odpowiedź w rozmowie ≤ 25 linii. Brief autorów jest **plikiem**
(`scratchpad/tor9/BRIEF-AUTORZY.md`), nie treścią zlecenia.
**To jest reguła z KANONU zastosowana do panelu, który ją odkrył** (§74).

---

# 105. RODZINA „REZYGNUJESZ W KAŻDEJ CHWILI" — **13 kluczy, 39 ciągów, ZERO wierszy pokrycia**

Autor W2-A zgłosił brak pokrycia dla frazy rezygnacji i zarekomendował **wycięcie**.
Sprawdziłem sam, bo rekomendacja dotyczy dziewięciu kluczy i dwudziestu siedmiu miejsc
(P-1: nie przyjmuję twierdzenia negatywnego bez wykonania jego negacji).

## 105.1 Pomiar — komendy i wyniki (R-H)

| co | komenda | wynik |
|---|---|---|
| wiersze pokrycia | `grep -niE "rezygn\|anulow\|wypowied\|cancel" content/tabela-obietnic.md` | **0 trafień na 271 wierszy** |
| klucze `messages` PL | skan wartości po rdzeniu „ezygn" | **13 kluczy** |
| miejsca w plikach treści | `grep -rc … content/pl/*.md` | **9 plików ×3 języki = 27 miejsc** |

**Trzynaście kluczy ×3 języki = 39 ciągów.**

```
Hero.potwierdzenieRezygnacja · Cennik.potwierdzenie1 · Cennik.faq.o3 · Cennik.faq.p4
Obawy.o3 · ZamkniecieGlowna.zdanie · ZamkniecieCennik.zdanie
FunkcjeIndeks.zamkniecieZdanie · FunkcjePozyskiwanie.zamkniecieZdanie
FunkcjeTresci.zamkniecieZdanie · FunkcjeZespol.zamkniecieZdanie
FunkcjeWyniki.zamkniecieZdanie · DlaKogo.ctaZdanie
```

## 105.2 Rodzina jest **większa niż grupa autorska** — i to jest jej najważniejsza cecha

Autor W2-A widział **dziewięć** kluczy, bo tyle należy do grupy A. Pozostałe cztery
(`Obawy.o3`, `Cennik.faq.o3`, `Cennik.faq.p4`, `Cennik.potwierdzenie1`) leżą w grupach
**C i D**. **Żaden autor nie widzi tej rodziny w całości.**

**To jest dokładnie klasa, dla której właściciel zażądał, żeby sędziowie i adwersarze
pracowali na KOMPLECIE, nie per grupa** (§104) — i pierwszy dowód, że żądanie było
konieczne, a nie ostrożnościowe. Rodzina ujawniła się **przy pierwszym raporcie fali**,
przez zsumowanie mojego pomiaru z cudzym zgłoszeniem.

## 105.3 Status prawdy — trzy warstwy, żadna nie jest wierszem tabeli

| warstwa | co mówi |
|---|---|
| **tabela obietnic** | **nic** — zero wierszy |
| **rejestr powrotu poz. 14** | obejmuje wyłącznie **„bez podawania powodu"**, nie samą rezygnację; kolumna „Gdzie" pomija `/cennik` (§52.3 poz. 4-bis) |
| **kod aplikacji** | `setup-stripe.ts:46` **`mode: 'at_period_end'`** — anulować można kiedykolwiek, **dostęp trwa do końca opłaconego okresu**; `cancellation_reason: enabled` — **portal pyta o powód** |

**Fraza nie jest nieprawdą** — kod pozwala anulować w każdej chwili. **Fraza jest bez
pokrycia w warstwie, która o pokryciu rozstrzyga.** Najczęściej powtarzana obietnica
serwisu (39 ciągów) stoi na czymś, czego tabela obietnic nie zna.

## 105.4 Czego NIE rozstrzygam

Wycięcie z 39 miejsc jest **zmianą znaczenia**, nie brzmienia → §37: **decyzja
właściciela, nie panel**. Trzy drogi, wypisane bez rekomendacji:

- **A — dopisać wiersz do tabeli obietnic** z brzmieniem opartym o kod
  (`at_period_end`, portal pyta o powód). Fraza zostaje, zyskuje pokrycie. **Wymaga
  rozstrzygnięcia A-2** (§55.5): portal jest skonfigurowany, żeby pytać o powód,
  a `/cennik` mówi „Nie musisz podawać powodu".
- **B — wyciąć z 39 miejsc.** Usuwa twierdzenie bez pokrycia i **zabiera czytelniczce
  informację prawdziwą** — wprost pod R-A.
- **C — zawęzić do brzmienia, które kod niesie wprost** („rezygnujesz kiedy chcesz,
  dostęp trwa do końca opłaconego okresu"), czyli połączyć z granicą roczną C-2.
  **Jedyna droga, która zamyka dwie pozycje naraz** — ale zmienia 39 ciągów, nie jedno.

**Zgłaszam do decyzji. Nie wykonuję żadnej.**

---

# 106. WSKAZANIA NA NUMER WIERSZA — **klasa, nie przypadek. Sześć z ośmiu błędnych.**

Autor W1-B zgłosił, że `content/pl/filary.md` wskazuje zły wiersz tabeli obietnic.
A0-R1 zgłosił, że raport Z4 cytuje `ZADANIA_RECZNE.md:15`, a fakt stoi w `:394`.
**Dwa zgłoszenia tej samej klasy w jednym dniu → zmierzyłem wszystkie wskazania
w warstwie żywej** (`content/`, `src/`, `e2e/`; archiwum `odzysk-etap-c` pominięte).

## 106.1 Pomiar — osiem wskazań, każde sprawdzone przeciw celowi

| wskazanie | deklaruje | faktycznie | odchylenie |
|---|---|---|---|
| `content/pl/filary.md:106` → „tabela obietnic **w. 146**" („Zbierasz dowody… Wall of Proof") | 146 | **149** | **−3** |
| `content/pl/funkcje-wyniki.md:21` → „tabela **w. 120**" (zdanie Growth) | 120 | **121** | **−1** |
| `content/pl/funkcje-wyniki.md:21` → „tabela **w. 228**" (bramka Puls) | 228 | **229** | **−1** |
| `content/pl/funkcje-tresci.md:153` → „tabela **w. 85**" (asystent AI) | 85 | **86** | **−1** |
| `src/app/[locale]/funkcje/tresci/page.tsx:107` → „content **w. 133**" | 133 | **153** | **−20** |
| `e2e/funkcje-podstrony.spec.ts:508` → „tresci **w. 133**" | 133 | **153** | **−20** |
| `content/{pl,en,de}/funkcje{,-tresci,-pozyskiwanie}.md` → „cennik.md **w. 73**" | 73 | 73 | **0 ✔** |
| `content/pl/funkcje-wyniki.md:21` → „słownik **w. 13**" | 13 | 13 | **0 ✔** |

> **Sześć wskazań błędnych, dwa poprawne.**

## 106.2 Kierunek odchylenia jest jednostronny — i to nazywa mechanizm

**Wszystkie sześć błędnych jest ZANIŻONYCH** (−1, −1, −1, −3, −20, −20).
**Ani jedno zawyżone.**

To nie jest szum. Wskazanie powstawało, gdy plik był **krótszy**; każdy wiersz dopisany
**powyżej** celu przesuwa go w dół, a wskazanie zostaje. **Odchylenie mierzy wiek
wskazania**, nie staranność autora: −1 przy wskazaniach świeżych, −3 przy starszym,
**−20 przy najstarszym**.

**Dokument staje się nieprawdziwy bez jednej zmiany w dokumencie** — dosłownie ta sama
formuła, którą T21 zapisał dla skrótów commitów. **Numer wiersza jest tak samo nietrwały
jak skrót commita, i z tego samego powodu: wskazuje na pozycję, nie na treść.**

## 106.3 Dwa z sześciu siedzą w KODZIE i w STRAŻNIKU

`src/app/[locale]/funkcje/tresci/page.tsx:107` i `e2e/funkcje-podstrony.spec.ts:508`
niosą **to samo błędne wskazanie** (−20) jako **uzasadnienie decyzji projektowej**
(„×4 wygrywa wzorzec — content w. 133"). Uzasadnienie stoi w pliku strażnika i wskazuje
w miejsce, w którym tego uzasadnienia nie ma.

**Piąta bramka wiedząca o sobie więcej, niż mówi** — po `lint-tokeny` (§85),
`funkcje-indeks.spec.ts` (§102.1) i dwóch pozycjach T20/T15.

## 106.4 Wskazanie przechodzi obok strażnika, który cytuje ten sam wiersz

`content/pl/funkcje-tresci.md:153` mówi „treść **VERBATIM** z tabeli w. 85" —
**i treść rzeczywiście jest verbatim**, tylko z wiersza **86**. Strażnik znak-w-znak
sprawdza **tekst** i przechodzi na zielono; **numer obok niego jest dekoracją,
której nie weryfikuje nic**.

**To jest ta sama konstrukcja co deklaracja długości** (§53.3): liczba **o** treści
stojąca obok treści, poza zasięgiem mechanizmu, który treść pilnuje.

## 106.5 Wniosek dla bramki — **rozszerzenie, nie nowy mechanizm**

Bramka deklaracji (§79) porównuje **liczbę o treści** z treścią. Wskazanie wiersza jest
**tą samą kategorią**: liczba o treści, stojąca obok cytatu. Jeśli wskazaniu towarzyszy
**cytat w nawiasie** — a tak jest w czterech z sześciu przypadków („Zbierasz dowody…",
„VERBATIM z tabeli") — **da się je sprawdzić automatycznie**: czy wiersz N pliku
docelowego zawiera zacytowany fragment.

**Weryfikacja wsteczna dostępna od razu: zapaliłaby się dziś na czterech z sześciu.**
Dwa pozostałe (`w. 120/228`, `w. 133` w kodzie) nie niosą cytatu — **cisza M-2**,
brak materiału do porównania.

**Nie implementuję** (§37). Zgłaszam jako rozszerzenie istniejącej bramki, nie jako
szóstą bramkę — bo przedmiot jest ten sam, a mnożenie mechanizmów o wspólnym przedmiocie
jest tą samą wadą, którą tropimy po stronie treści.

## 106.6 Kubeł „nie sprawdzono" (R-D)

- **Archiwum `docs/faza-4/odzysk-etap-c/`** (≥30 wskazań w `etapC-panele.json`)
  **nie sprawdzone** — świadomie: to zapis historyczny, a nie warstwa żywa.
  **Nie wiadomo, czy jego wskazania kiedykolwiek były prawdziwe.**
- Nie sprawdzono wskazań w `docs/faza-2/` ani `docs/faza-3/` poza tymi, które trafiły
  do warstwy żywej.
- Nie sprawdzono wskazań **wewnątrz** `docs/redakcja/00-USTALENIA-TOR9.md` — czyli
  moich własnych. **42 wystąpienia `TO:NNN` w tym dokumencie nie zostały zweryfikowane
  co do numeru.**

---

# 107. AUDYT WŁASNYCH CYTOWAŃ WIERSZY — i gdzie naprawdę siedział błąd

§106.6 zostawiło kubeł: „**42 wystąpienia `TO:NNN` w tym dokumencie nie zostały
zweryfikowane co do numeru**". Dwaj autorzy niezależnie zgłosili jedno z nich jako błędne.
Zweryfikowałem **wszystkie**.

## 107.1 Metoda i jej dwie fałszywe wersje — zapisane, bo pouczające

**Wersja pierwsza** porównywała cytat obok `TO:NNN` z treścią wiersza **dosłownie**
i dała **11 rozjazdów**. Wszystkie fałszywe: cytaty niosą wytłuszczenie markdown
(`**Planujesz**`), a tabela nie. **Narzędzie zgłaszało własną normalizację jako defekt
dokumentu.**

**Wersja druga** (normalizacja markdownu) dała **4 rozjazdy**. Też fałszywe — to cytaty
**ze strony**, nie z tabeli, stojące w tym samym zdaniu co odwołanie do tabeli
(„Studio uczy się…" obok `TO:79`, gdzie tabela mówi „**System** uczy się…").
**Narzędzie nie odróżnia cytatu z tabeli od cytatu ze strony.**

**To jest ta sama pułapka co przy liczniku M-4** (§103): pierwsza wersja daje liczbę
prawdziwą i bez znaczenia. **Trzeci raz dziś narzędzie własne wymagało dwóch poprawek,
zanim zaczęło mierzyć to, co miało.**

## 107.2 Wynik

| | |
|---|---|
| cytowań `TO:NNN` **z cytatem obok, sprawdzalnych** | **11** |
| z nich **błędnych** | **0** |
| cytowań **bez cytatu obok** — niesprawdzalnych tą metodą | **38** |

## 107.3 Jedyny znany błąd siedzi w kuble, do którego metoda nie sięga

`TO:251` cytowane dwukrotnie dla limitu zespołu. **Faktycznie:**
```
TO:249  | Kontakty                          | 50 | 200 | bez limitu |
TO:250  | Zespół                            | 10 |  50 | bez limitu |   ← ten
TO:251  | Posty miesięcznie                 | 20 | 100 | bez limitu |
```
**Poprawione na `TO:250`** w dwóch miejscach (§27, §52.7). Kierunku P0-4 nie zmienia
— zmienia to, dokąd prowadzi cytat pokrycia dla zespołu: **dziś prowadził do wiersza
o postach.**

**Moje cytowanie nie miało cytatu obok — więc metoda nie mogła go złapać.**
Ustalenie: **kubeł „niesprawdzalne" nie jest resztą po pomiarze; jest miejscem, gdzie
błąd faktycznie był.** 38 z 49 cytowań nadal tam siedzi.

**Wniosek dla propozycji z §106.5:** bramka sprawdzająca wskazania **wymaga, żeby
wskazaniu towarzyszył cytat**. Bez tego wymogu obejmie 11 z 49. **Wymóg cytatu obok
numeru jest częścią mechanizmu, nie stylem.**

## 107.4 Dwie liczby autorów sprawdzone i przyjęte

`TO:250` — zgłoszone niezależnie przez W2-C i W1-C, potwierdzone moim odczytem.
W1-C zgłosił dodatkowo, że **A0-C podawał pełną formę Pulsu jako 95 zn** — §96.2 już
to poprawiło na 94. **Trzy niezależne odczyty, jedna liczba.**

---

# 108. KOREKTA §96.2 — **neutralność długościowa Pulsu jest WYŁĄCZNIE POLSKA**

Zmierzone (`f8_2` = pełna forma `TO:121`, wobec dzisiejszego `CennikSkrot.roznica`):

| język | pełna forma | dziś na `/` | różnica |
|---|---|---|---|
| **pl** | 94 | 94 | **+0** |
| **en** | 111 | 92 | **+19** |
| **de** | 132 | 96 | **+36** |

**§96.2 mówiło „podmiana w PL jest długościowo neutralna" — i to jest prawda.**
Ale wniosek, który z tego wyciągnąłem — *„argument «nie mieści się» upada; rozstrzygnięcie
staje się łatwiejsze do wykonania"* — **był podany bez zastrzeżenia językowego i jest
za szeroki.**

> **Przeszkoda upada w PL i STOI w EN oraz DE.** W niemieckim zdanie rośnie o **38%**.

**Ósme wystąpienie klasy R-E/§76** i pierwsze, w którym pomiar był poprawny, a **za
szeroki był wniosek**. Poprzednie siedem to były złe liczby; to jest **dobra liczba
z brakującym kwantyfikatorem**. Klasa sąsiednia, nie ta sama — i trudniejsza do
wychwycenia, bo pomiar broni się sam.

**Zapis operacyjny:** liczba zmierzona w jednym języku **nie jest liczbą tego serwisu**.
Serwis ma trzy warstwy i wniosek o „mieści się / nie mieści" wymaga trzech pomiarów
albo jawnego zawężenia do jednego języka.

---

# 109. MAPA §1 — **skrót notacyjny stał się twierdzeniem o istnieniu klucza**

Autor W1-A zgłosił, że **trzy klucze z jego zlecenia nie istnieją**. Sprawdziłem
(`Object.keys`): **ma rację.**

| klucz ze zlecenia | stan |
|---|---|
| `FunkcjeIndeks.spisEtykieta` | **NIE ISTNIEJE** |
| `FunkcjeIndeks.okruszkiAria` | **NIE ISTNIEJE** |
| `DlaKogo.okruszkiAria` | **NIE ISTNIEJE** |

`FunkcjeIndeks` ma **21 kluczy** i nie ma wśród nich żadnego z tych dwóch.

## 109.1 Liczby w mapie były PRAWDZIWE — nazwy kluczy nie

| ciąg | mapa §1 mówi | pomiar mechaniczny |
|---|---|---|
| „Na tej stronie" | **5** · „`*.spisEtykieta` ×4 · `DlaKogo.spisEtykieta`" | **5** ✔ — cztery **podstrony** + `DlaKogo` |
| „Jesteś tutaj" | **4** · „`FunkcjePozyskiwanie/Tresci/Zespol/Wyniki.okruszkiAria` — **poprawione 2026-08-21 (§109): `FunkcjeIndeks` i `DlaKogo` NIE MAJĄ tego klucza**" | **4** ✔ — wyłącznie cztery **podstrony** |

**Liczności zgadzają się co do jednej.** Fałszywa jest **gwiazdka**: `*` w mapie
znaczyło „cztery podstrony filarowe", a czyta się jako „wszystkie przestrzenie
`Funkcje*`" — czyli **z `FunkcjeIndeks` włącznie**.

## 109.2 Mechanizm — i dlaczego to nie jest literówka

Mapa §1 powstała ze **skanu mechanicznego** (grupowanie po wartości), a jej zapis
skrócono ręcznie do `*.klucz ×4`. **Skrót był poprawny jako notatka i fałszywy jako
specyfikacja.** Przeniesiony do zlecenia autora stał się **listą kluczy do napisania** —
czyli twierdzeniem o istnieniu.

> **Skrót notacyjny w mapie staje się twierdzeniem, gdy ktoś skopiuje go do zlecenia.**
> Notatka wolno może być skrótowa. Zlecenie — nie.

**Zbieżność z klasą §83** („liczba zbiorcza ukrywa rodzaj"): tam zbyt gruba jednostka,
tu **zbyt gruby zapis nazwy**. Obie znoszą się dopiero przy ponownym pomiarze, bo
**żadna nie wygląda na przybliżenie**.

**Poprawka mapy:** oba wiersze §1.1 dostają nazwy wypisane w całości —
`FunkcjePozyskiwanie` · `FunkcjeTresci` · `FunkcjeZespol` · `FunkcjeWyniki` (+ `DlaKogo`
przy „Na tej stronie"). **Bez gwiazdki.**

## 109.3 Skutek dla fali pierwszej — zerowy, i to jest wynik notacji

Autor **nie napisał brzmienia dla nieistniejącego klucza** — zgłosił brak przedmiotu
z komendą i wynikiem (`Object.keys`, `grep` po `src/`). **R-H zadziałała po stronie
wykonawcy zlecenia, którego autor zlecenia się pomylił.**

---

# 110. KOREKTA §3 — **sześć z ośmiu, nie siedem z ośmiu**

Zmierzone w kodzie:

| klucz | cel | `[STAN kodu]` |
|---|---|---|
| `Hero.cta` | **`/funkcje`** | `Hero.tsx:33` |
| `ZamkniecieGlowna.cta` | **`/funkcje`** | `page.tsx:149` |
| `DlaKogo.cta` | `/login` | `dla-kogo/page.tsx:166` |
| `FunkcjeWyniki.zamkniecieCta` | `/login` | `funkcje/wyniki/page.tsx:102` |
| trzy pozostałe `Funkcje*.zamkniecieCta` | `/login` | analogicznie |
| `Cennik.cta` ×4 linki | `/login` | `SekcjaPlanow.tsx:101` |

> **Sześć z ośmiu kluczy łańcucha „Sprawdź, jak działa" prowadzi na `/login`. Dwa — obydwa
> na trasie `/` — prowadzą na `/funkcje`.**

§3 podawało „siedem z ośmiu". **Trasa `/` wnosi dwa wezwania sprawne**, nie jedno.

**Znaczenie praktyczne, nie kosmetyczne:** przepisanie ciągu „Sprawdź, jak działa"
**zepsułoby dwa wezwania działające, żeby nie naprawić sześciu, których wada leży
w celu, nie w słowie** (T7, pozycja premierowa). Liczba „siedem z ośmiu" sugerowała,
że ciąg jest niemal w całości martwy; **jest martwy w trzech czwartych, a jego jedyne
żywe wystąpienia stoją na trasie, którą panel przepisuje najintensywniej.**

---

# 111. DRUGIE PĘKNIĘCIE W DE — **Ł-4, i to w rodzinie, której nikt nie policzył**

Autor W3-A zgłosił pęknięcie Ł-4 w niemieckim. Sprawdziłem odczytem obu kluczy ×3 języki.

| język | `Cennik.faq.o3` zd. 1 | ogon `ZamkniecieCennik.zdanie` | stan |
|---|---|---|---|
| **pl** | „Rezygnujesz kiedy chcesz." | „…rezygnujesz kiedy chcesz." | **verbatim** (różnica wyłącznie wielkość pierwszej litery) |
| **en** | „You can cancel whenever you like." | „…you can cancel whenever you like." | **verbatim** (j.w.) |
| **de** | „**Du kündigst, wann du willst.**" | „…**kündigen kannst du, wann du willst.**" | **PĘKŁ — inny szyk, nie wielkość litery** |

## 111.1 Dlaczego to jest cięższe niż §82

§82 (pęknięcie `filar1.korzysc`) leży w rodzinie **równościowej** — czyli w tej, którą
**zmierzyłem systematycznie** (§80: PL 20 · EN 20 · DE 19). Wiedziałem, ile ich jest,
i wiedziałem, że pęknięte jest jedno.

**Ł-4 leży w rodzinie PODCIĄGOWEJ — tej, o której §80.3 mówi wprost: „liczność
NIEZNANA".** To znaczy:

> **Znamy dwa pęknięcia w DE. Nie wiemy, z ilu.** Pierwsze z rodziny policzonej,
> drugie z niepoliczonej. **Drugie znaleziono dlatego, że autor czytał tekst, nie
> dlatego, że mechanizm je pokazał.**

**Wniosek dla §82.2** („DE nie dryfuje systematycznie — 1 z 24"): ustalenie **stoi
dla rodziny równościowej** i **nie rozciąga się na podciągową**. Dwa pęknięcia znane,
oba w DE, w dwóch różnych rodzinach. **Teza o braku dryfu systematycznego jest dziś
słabsza, niż była rano** — nie obalona, ale oparta na próbie, o której wiemy, że
nie obejmuje całości.

## 111.2 Trzecie niezależne potwierdzenie tej samej luki

`N-R4-2` (A0-R4), `W1B-N2` (W1-B), `Ł-4` (W3-A) — **trzy niezależne składy** zgłosiły
łańcuchy zdaniowe (podciągowe), z których każdy leży poza moim pomiarem.
**Warunek §51 spełniony:** trzy różne przestrzenie `messages`, trzy różne zlecenia,
klasa nie jest w KANONIE. **Szósta zbieżność.**

---

# 112. §109 UZUPEŁNIONE — skrót notacyjny **zatarł DECYZJĘ**, nie tylko nazwę

Autor W3-A dołożył do §109 pomiar, który zmienia jego wagę. Sprawdziłem:

```
e2e/funkcje-indeks.spec.ts:359-362  [STAN kodu]
  // D-D20: „Na tej stronie" jest stałą PODSTRON — na indeksie GO NIE MA.
  await expect(
    page.locator(`nav[aria-label="${komunikaty.FunkcjePozyskiwanie.spisEtykieta}"]`),
  ).toHaveCount(0);
```

**Nieobecność klucza na indeksie nie jest brakiem. Jest DECYZJĄ o numerze D-D20,
pilnowaną asercją negatywną.**

§109 zapisało, że mapa źle **nazwała** klucze. To jest prawda i za mało:

> **Skrót `*.klucz ×4` zatarł rozstrzygnięcie.** Gwiazdka sugeruje jednorodność tam,
> gdzie stoi **świadomy wyjątek z własnym numerem i własnym strażnikiem**.
> Notacja skrótowa **nie tylko myli co do faktu — kasuje ślad decyzji**.

**To jest ostrzejsza wersja klasy z §83** („liczba zbiorcza ukrywa rodzaj"):
tam skrót ukrywał **różnicę rodzaju**, tu ukrywa **istnienie rozstrzygnięcia**.
Ukryta decyzja jest gorsza od ukrytej różnicy, bo **nikt jej nie odtworzy z pomiaru** —
pomiar pokaże brak klucza, nie powód braku.

**Zapis operacyjny:** w mapach i tabelach zbiorczych **wyjątek zapisuje się zawsze,
nawet kosztem długości wiersza**. Skrót wolno stosować do jednorodności, nigdy do zbioru
z wyjątkiem.

---

# 113. FALA PIERWSZA — stan po dziewięciu z dwunastu

| grupa | W1 (Schwartz/Collier) | W2 (Hopkins) | W3 (Sugarman) |
|---|---|---|---|
| **A — rama** | ✔ 812 w., 11 poz. | ✔ 527 w., 5 ruchów (3 to wycięcia) | ✔ 827 w., 13 poz. |
| **B — filary** | ✔ 791 w., 8 propozycji | ✔ 78 kB, 22 poz. | pracuje |
| **C — `/`** | ✔ 1077 w., 4 przepisania | ✔ 645 w., 7 poz. | pracuje |
| **D — `/cennik`** | ✔ 9 poz. + 1 opcjonalna | ✔ 8 poz. | pracuje |

## 113.1 Co fala wniosła poza propozycjami: **siedem korekt cudzych i własnych liczb**

| korekta | zgłosił | status |
|---|---|---|
| `TO:251` → **`TO:250`** (limit zespołu) | W2-C **i** W1-C niezależnie | **potwierdzone, poprawione** (§107.3) |
| pełna forma Pulsu **94**, nie 95 | W1-C, W1-D (za A0-C) | potwierdzone (§96.2) |
| neutralność Pulsu **tylko w PL** (en +19, de +36) | W2-C | **potwierdzone, §96.2 skorygowane** (§108) |
| trzy klucze grupy A **nie istnieją** | W1-A **i** W3-A niezależnie | potwierdzone; **to decyzja D-D20** (§109, §112) |
| **sześć** z ośmiu CTA na `/login`, nie siedem | W1-A | potwierdzone (§110) |
| strażnik `/cennik` pilnuje **32** pól, nie 30 | W1-D | do weryfikacji |
| **Ł-4 pęknięty w DE** | W3-A | **potwierdzone** (§111) |

**Trzy z siedmiu to korekty MOICH liczb.** Dwie zgłoszone **niezależnie przez dwóch
autorów** — czyli panel zaczął działać jako mechanizm sprawdzający, zanim doszedł
do sędziów.

## 113.2 Zbieżność, której nie planowałem: **trzej autorzy jednej grupy, trzy różne wyniki**

Grupa A dostała trzech autorów o rozłącznych metodach. **Żaden nie zaproponował tego
samego ruchu:**
- **W2 (Hopkins)** — pięć ruchów, **trzy to wycięcia**; odrzucił własny wariant ostrzejszy,
  bo `TO:202` niesie „UE", nie „Frankfurt".
- **W1 (Schwartz)** — trzy zmiany na jedenaście pozycji; **wycina frazę rezygnacji z 21
  wpisów**, bo zbiór zamienników jest pusty.
- **W3 (Sugarman)** — cztery zmiany; **przenosi zdanie z `/login` o kliknięcie wcześniej**
  zamiast wymyślać nowe.

**To jest wynik architektury, nie przypadku:** trzy metody dały trzy różne odpowiedzi
na to samo pytanie, więc synteza będzie miała z czego wybierać, a sędziowie mają co
porównywać. **Runda pierwsza upadła między innymi dlatego, że warianty były trzema
odcieniami jednego pomysłu.**

---

# 114. RODZINA Z-1 JEST DUŻO WIĘKSZA, NIŻ JĄ LICZYLIŚMY — **10 z 12 konkretów**

Autor W3-B zgłosił pomiar sprawstwa na dwunastu konkretach filarów. **Przeczytałem
wszystkie dwanaście sam** — rozstrzygnięcie o podmiocie gramatycznym wymaga odczytu,
nie gremu.

## 114.1 Pomiar — podmiot zdania głównego, PL

| # | konkret `[STAN]` | podmiot |
|---|---|---|
| 1.1 | „**DMO** układa kolejność rozmów — zaczynasz dzień…" | **narzędzie** |
| 1.2 | „**Przypomnienie** chwilę przed spotkaniem, żebyś była gotowa…" | rzecz (nie nazwa własna) |
| 1.3 | „**Każda polecona osoba** przychodzi ze śladem — wiesz, kto ją polecił." | osoba |
| 2.1 | „**Studio** daje gotowe formaty…" | **narzędzie** |
| 2.2 | „**Tarcza** zaznacza ryzykowne sformułowania…" | **narzędzie** |
| 2.3 | „**Pieczęć Etyczna** daje wynik i certyfikat…" | **narzędzie** |
| 3.1 | „**Kreator wdrożeniowy** prowadzi nową osobę… — bez twojej pomocy." | **narzędzie** |
| 3.2 | „**Pierwsze 90 Dni** z czterema fazami… — nowa osoba widzi drogę…" | **narzędzie** |
| 3.3 | „**Osiągnięcia i odznaki** utrzymują zaangażowanie…" | **narzędzie** |
| 4.1 | „**Twój Wrapped** składa podsumowanie okresu — widzisz…" | **narzędzie** |
| 4.2 | „**Cel z kamieniami milowymi** mówi, jak daleko zaszłaś…" | **narzędzie** |
| 4.3 | „**Świadectwo** z cyfrowym odciskiem zostaje — ktoś może zweryfikować…" | **narzędzie** |

> **DZIESIĘĆ z dwunastu ma nazwę narzędzia w podmiocie. Oba wyjątki stoją w filarze 1.**
> Twierdzenie autora potwierdzone co do liczby i co do miejsca wyjątków.

## 114.2 Filar 3 — **pięć zdań pod rząd, w których ona nie jest sprawczynią**

```
naglowek : „Nowa osoba wie, co robić od pierwszego dnia"        → nowa osoba
korzysc  : „Zamiast tłumaczyć od nowa każdemu — kreator…"        → kreator
konkret1 : „Kreator wdrożeniowy prowadzi… — bez twojej pomocy."  → kreator, ONA NIEOBECNA
konkret2 : „…nowa osoba widzi drogę przed sobą."                 → nowa osoba
konkret3 : „Osiągnięcia i odznaki utrzymują zaangażowanie…"      → odznaki, ONA NIEOBECNA
```

**Wiersz pokrycia mówi co innego:** `TO:110` — „**Wdrażasz** nową osobę przez 6-krokowy
kreator." **Podmiotem jest ONA.**

## 114.3 Dlaczego to zmienia obraz rodziny Z-1

Rodzina Z-1 („odwrócone sprawstwo") była dotąd liczona jako **cztery–pięć kluczy**
na czterech trasach (§52.3, `N-R4-3`, §99). **Sam kręgosłup filarów daje dziesięć.**

**Ale — i to jest rozróżnienie, którego nie wolno zgubić — nie każde narzędzie
w podmiocie jest Z-1.** Z-1 to **sprzeczność z wierszem pokrycia**: zdanie stawia
narzędzie tam, gdzie tabela stawia ją. Dziesięć konkretów to **kandydaci**; ile z nich
jest defektem, rozstrzyga porównanie z wierszem, klucz po kluczu. **Tego nie zrobiłem
i tego nie zrobił autor.**

**Zapisuję jako `[N]` z nazwaną pracą:** dla każdego z dziesięciu konkretów porównać
podmiot zdania z podmiotem jego wiersza `TO`. Do wykonania **przed syntezą**, bo od tego
zależy, czy przepisujemy dwa zdania, czy dziesięć — a §99 mówi, że **rozstrzygnięcie
zawierające liczbę miejsc jest ważne dla stanu pomiaru, z którego powstało.**

## 114.4 Zbieżność rytmu z prawdą — pierwsza w tym panelu

Autor doszedł do filaru 3 **metodą Sugarmana** (gdzie czytelniczka zwalnia) i wskazał
**dokładnie ten klucz**, który §37.3 para 1 i Z-6 już wymuszają przepisać z powodów
prawdziwościowych.

> **Rytm i prawda wskazały ten sam klucz. Jedna naprawa zamyka oba.**

To jest argument za trzymaniem trzech rozłącznych metod: **metoda, która nie mierzy
prawdy, potwierdziła defekt prawdziwościowy niezależnie** — a zbieżność dwóch różnych
kryteriów na jednym kluczu jest mocniejszym wskazaniem niż dwa głosy z jednego kryterium.

---

# 115. FALA PIERWSZA ZAMKNIĘTA — **12 z 12**

| grupa | W1 Schwartz/Collier | W2 Hopkins | W3 Sugarman |
|---|---|---|---|
| **A rama** | 11 poz., 3 zmiany | 5 ruchów, **3 wycięcia** | 13 poz., 4 zmiany |
| **B filary** | 8 propozycji | 22 poz., 13 propozycji | **31 poz., 17 kluczy** |
| **C `/`** | 4 przepisania | 7 poz. | 21 poz., 8 brzmień |
| **D `/cennik`** | 9 + 1 opcjonalna | 8 poz. | 11 poz. |

**Wszystkie dwanaście zapisało raport do pliku przed odpowiedzią.** Zero `[A]` bez ścieżki
w komplecie. Zero naruszeń arsenału odrzuconego.

## 115.1 Pierwszy prawdziwy rozjazd między autorami — **do rozstrzygnięcia sędziom**

Pęknięcie DE (`filar1.korzysc` ≠ `FunkcjePozyskiwanie.zdanie`) dostało **dwa różne
rozwiązania**:

| autor | rozwiązanie | argument |
|---|---|---|
| **W1-B i W3-B** (niezależnie) | **usunąć rzeczownik**, zostawić czasownik z `TO:42` | znika sam przedmiot rozjazdu; spór o rzeczownik przestaje istnieć |
| **W2-B** | **zamknąć na `Aktionsplan`** | nazwana rzecz ze `slownik-nazw.md:17` bije opisową kategorię; **to ta sama nazwa, którą zobaczy po zalogowaniu** |

**Obie drogi zamykają pęknięcie. Różnią się tym, co zostaje w zdaniu.** W2-B ma argument,
którego dwaj pozostali nie mają — **zgodność z tym, co użytkowniczka zobaczy w aplikacji**.
W1-B i W3-B mają argument, którego nie ma W2-B — **usunięcie sporu zamiast rozstrzygnięcia go**.

**To jest dokładnie ten rodzaj rozjazdu, po który powołano sędziów.** Zapisuję bez
rekomendacji.

## 115.2 Sześć autorów fali drugiej pracuje

Grupy **E** (treść modułowa czterech podstron) i **F** (`/funkcje` + `/dla-kogo`) ×3 metody.
Sufit 12 zwolniony po powrocie fali pierwszej; uruchomione, gdy pracował jeszcze jeden
agent — **siedem równolegle, pod sufitem**.

---

# 116. WYJĄTEK STRAŻNIKA STOI NA ZDANIU, KTÓRE JEST WADLIWE

Autor W2-E zgłosił, że komentarz strażnika cytuje wadliwy kwalifikator jako uzasadnienie.
Sprawdziłem trzy warstwy odczytem.

## 116.1 Trzy cytaty, jeden obok drugiego

```
content — wiersz pokrycia  [STAN]
  TO:98  „Wgrywanie zdjęć I PLIKÓW — Storage atrapa; MILCZENIE."

messages — granica na stronie  [STAN]
  FunkcjeTresci.mod1_nie (pl)
  „Do Studia nie wgrasz zdjęć Z TELEFONU — projekt składasz z tekstu,
   szablonów i elementów edytora."

e2e — komentarz strażnika  [STAN kodu]
  funkcje-podstrony.spec.ts:110-112
  „Celowo BEZ «zdjęć» — granica Studia LEGALNIE MÓWI «nie wgrasz zdjęć
   z telefonu»."
  frazyMilczenia: ["youtube"]
```

## 116.2 Co tu naprawdę zaszło

`TO:98` mówi, że wgrywanie **zdjęć i plików** jest **atrapą** i obowiązuje **milczenie**.
Strona zawęża brak **całkowity** do **jednego kanału** — „z telefonu" — co sugeruje,
że innym kanałem wgrać się da. **Nie da się żadnym.**

Strażnik **wyłączył słowo „zdjęć" z listy milczenia**, i zrobił to **poprawnie w formie**:
skoro legalna granica używa tego słowa, zakaz podciągu zapaliłby się na zdaniu prawdziwym.
**Rozumowanie jest bez zarzutu. Przesłanka — nie.** Granica, na którą się powołuje,
zawęża prawdę.

> **To nie jest „strażnik cytuje zły numer" (§106.3). To jest: ZASIĘG STRAŻNIKA ZOSTAŁ
> ZAWĘŻONY, ŻEBY POMIEŚCIĆ DEFEKT TREŚCI.**

## 116.3 Dlaczego ta klasa jest osobna i groźniejsza

| klasa | co się dzieje | jak się wykrywa |
|---|---|---|
| §106.3 — złe wskazanie w strażniku | uzasadnienie prowadzi w puste miejsce | porównanie wskazania z celem |
| §116 — **wyjątek na wadliwym zdaniu** | strażnik **działa poprawnie** i **chroni defekt przed wykryciem przez samego siebie** | **wyłącznie przez odczyt wiersza pokrycia** |

**Strażnik nie jest zepsuty.** Robi dokładnie to, co ma. Jego wyjątek jest **uzasadniony
zdaniem, którego nikt nie sprawdził wobec `TO:98`** — i dopóki zdanie stoi, wyjątek
wygląda na potrzebny.

**Sprzężenie:** defekt treści → wyjątek strażnika → defekt niewidoczny dla strażnika.
Pętla domyka się sama i **żaden przebieg testów jej nie otworzy**.

## 116.4 Skutek dla naprawy — mniejszy, niż się wydaje, i to jest ważne

Propozycja E-1 („własnych **zdjęć ani plików**") **nadal zawiera słowo „zdjęć"**,
więc **wyjątek strażnika pozostaje potrzebny i poprawny**. Zmienia się wyłącznie to,
że jego uzasadnienie zacytuje zdanie, **które już nie zawęża prawdy**.

**Do zrobienia razem ze zmianą treści: aktualizacja komentarza `:110-112`.**
Bez tego komentarz cytuje brzmienie, którego nie ma — czyli klasa T21 w warstwie
komentarzy kodu, **czwarty raz dziś**.

## 116.5 Test parowy 31 modułów — wynik autora, przyjęty do wsadu

Metoda: czy granica `modN_nie` dotyczy **tego samego przedmiotu** co korzyść `modN_poco`.

| wynik | ile |
|---|---|
| **ZGODNA** — ten sam przedmiot | **21** |
| **SĄSIEDNIA** — przedmiot pokrewny, nie ten sam | **5** |
| **ZAWĘŻA albo bez pokrycia** | **5** |

**Dwadzieścia jeden z trzydziestu jeden granic jest poprawnych.** To jest największy
pojedynczy zbiór sprawnych konstrukcji zmierzony w tym torze — i wchodzi do inwentarza
sprawności, nie tylko do listy wad.

**Pięć zawężających to nowa lista robocza**, z której pierwsza (`mod1_nie`) okazała się
mieć **sprzężenie ze strażnikiem**. **Nie sprawdzono, czy pozostałe cztery też je mają.**

---

# 117. AKADEMIA TO JEDEN ŁAŃCUCH, NIE DWA WYSTĄPIENIA — **§100.1 skorygowane**

Autor W1-E zgłosił, że mechanizm otwierania Akademii jest **łańcuchem podciągowym**
`FunkcjeZespol.mod6_poco` ↔ `DlaKogo.s3_robi_2`, a nie dwoma niezależnymi wystąpieniami.
**Zmierzone, potwierdzone co do znaku:**

| język | wspólny podciąg | długość |
|---|---|---|
| **pl** | „ dopiero po ukończeniu poprzedniego" | **35 zn** |
| **en** | „ the next module unlocks only once the previous one is finished" | **63 zn** |
| **de** | „ erst frei, wenn das vorherige abgeschlossen ist" | **48 zn** |

## 117.1 Co to zmienia w naprawie

§100.1 zapisało trzy trasy jako **listę miejsc**: `/` naprawione, `/funkcje/zespol`
pominięte, `/dla-kogo` pominięte + naruszenie roli. **To jest opis prawdziwy i niepełny.**

> **Dwie pominięte trasy niosą JEDEN łańcuch, nie dwa zdania.** Naprawa musi być
> naprawą łańcucha — czyli objąć oba klucze **w jednym ruchu i we wszystkich trzech
> językach**, inaczej rozerwie powtórzenie, które dziś istnieje.

**Wchodzi warunek O-2** (propozycja dotykająca łańcucha wymienia trzy języki ze statusem):
obaj autorzy grupy E i F muszą zdawać sprawę z tego samego ciągu. **W1-E i W1-F zgłosili
go niezależnie** — E jako `W1E-N1`, F jako pozycję przekazaną autorowi drugiej trasy.
**Siódma zbieżność.**

## 117.2 Mój pomiar był zepsuty, a wyglądał na znalezisko

Pierwszy przebieg dał **DE: 8 zn („Akademie")** — czyli „łańcuch istnieje w PL i EN,
w DE go nie ma". Byłoby to **czwarte pęknięcie DE** i sprzeczność z raportem agenta.

**Przyczyna: `difflib.SequenceMatcher` ma domyślnie `autojunk=True`** — przy sekwencjach
dłuższych niż 200 elementów oznacza „popularne" znaki jako śmieci i **przestaje ich
używać do dopasowania**. Ciągi DE mają 251 i 229 znaków. **Ciąg polski (206/175) też
przekroczył próg, ale tam trafienie ocalało przypadkiem.**

Po `autojunk=False`: **PL 35 · EN 63 · DE 48** — dokładnie liczby agenta.

## 117.3 Reguła — czwarty raz dziś moje własne narzędzie wymagało poprawki

| # | narzędzie | wada pierwszej wersji | co dała |
|---|---|---|---|
| 1 | licznik deklaracji (prototyp) | luźne dopasowanie | **56 zapaleń**, w większości fałszywych |
| 2 | licznik M-4 | liczenie **par klucz×plik** | **10 658** — liczba prawdziwa i bez znaczenia |
| 3 | audyt cytowań, wersja 1 i 2 | brak normalizacji markdownu; brak rozróżnienia cytatu z tabeli od cytatu ze strony | **11**, potem **4** fałszywe rozjazdy |
| 4 | pomiar podciągu | **domyślny `autojunk`** biblioteki standardowej | **fałszywe czwarte pęknięcie DE** |

> **Moje własne narzędzia pomiarowe wymagały poprawki częściej niż twierdzenia agentów.**
> W czterech przypadkach z czterech **pierwsza wersja dawała wynik, który wyglądał
> na znalezisko** — nie na błąd. Dwa razy uratował mnie zdrowy rozsądek co do rzędu
> wielkości; **raz uratował mnie raport agenta, który mierzył to samo inaczej.**

**Zapis do KANONU — wąski i konkretny, bo szeroki byłby pustą przestrogą:**
> **Pomiar wykonany narzędziem napisanym na tę okazję jest twierdzeniem o STANIE
> narzędzia tak samo jak o stanie przedmiotu.** Zanim zgłosisz wynik sprzeczny z cudzym
> pomiarem tego samego przedmiotu — **sprawdź domyślne ustawienia własnego narzędzia**.
> Rozbieżność dwóch pomiarów jest najtańszym sygnałem, jaki dostajesz, i **pierwszym
> podejrzanym jest nowsze narzędzie, nie starszy wynik.**

---

# 118. WZROSTY LICZB ZGŁOSZONE PRZED WYKONANIEM — §99.1 w działaniu

Reguła z §99.1 żąda przeliczenia liczby miejsc na aktualnym pomiarze **przed** wykonaniem
rozstrzygnięcia i zgłoszenia zmiany w obie strony. **Trzy wzrosty z fali autorskiej:**

| rozstrzygnięcie | liczba przy rozstrzygnięciu | pomiar dzisiejszy | zgłasza |
|---|---|---|---|
| **§37.3 Para 2** — „kreator w podmiocie" | 3 → **4** (§99) | **5 ciągów w 6 kluczach** | W1-E (`W1E-N2`) |
| **Rodzina Z-1** — odwrócone sprawstwo | 4–5 kluczy na 4 trasach | **10 z 12 konkretów** ma narzędzie w podmiocie — **kandydaci**, nie potwierdzone defekty | W3-B, zweryfikowane §114 |
| **§100 Akademia** — „dwie pominięte trasy" | dwa wystąpienia | **jeden łańcuch, dwa klucze, ×3 języki** | W1-E + W1-F |

**Żadnego z trzech nie rozszerzam sam.** Kierunek rozstrzygnięć stoi; **zakres wymaga
słowa właściciela** — dokładnie tak, jak mówi reguła, którą sam ustanowił.

**Uwaga o trzecim wierszu, żeby nie został przeczytany jako korekta w dół:** „jeden
łańcuch zamiast dwóch wystąpień" **nie zmniejsza pracy**. Zmniejsza liczbę **niezależnych**
napraw i zwiększa wymagania wobec każdej z nich — bo teraz obie muszą być spójne
w trzech językach naraz.

---

# 119. CZTERY GRANICE MOCNIEJSZE NIŻ WIERSZ TABELI — znalezisko odwrotne do reszty

W1-E prostuje moje zlecenie: podałem „sześć granic potwierdzonych" przy czterech
wymienionych kluczach. **Jego pomiar daje dwanaście**, z czego **cztery są MOCNIEJSZE
niż wiersz tabeli obietnic** — czyli strona zobowiązuje się do **węższego** zakresu,
niż musi.

**To jest pierwsze w tym torze znalezisko o tym kierunku.** Wszystkie dotychczasowe wady
polegały na tym, że strona obiecuje **więcej**, niż ma pokrycie. Tu jest odwrotnie:
granica odbiera czytelniczce prawdę, do której serwis ma prawo.

**Nie jest to defekt w rozumieniu ADR-018** — nadmiar ostrożności nie łamie primatu
nieodwracalnych. **Jest to jednak pozycja do przeglądu**, bo R-A działa w obie strony:
granica węższa niż wiersz zmienia to, co czytelniczka pomyśli, tak samo jak obietnica
szersza niż wiersz.

**Do wsadu dla sędziów jako osobna rubryka**, żeby nie zginęło między wadami:
**dwanaście granic sprawdzonych, cztery ostrzejsze niż musiały być.**

---

# 120. REGUŁA SŁOWNIKA JEST NIEWYKONALNA W NIEMIECKIM — **uderza w rozstrzygnięcie 45.4**

W2-F zgłosił, że wariant „jawnie opisowa, małą literą" nie działa w EN i DE.
**Sprawdziłem — jest gorzej i precyzyjniej, niż zgłosił.**

## 120.1 Reguła, dosłownie

`docs/faza-2/slownik-nazw.md:23` `[STAN dokumentu obowiązującego]`:
> „| — (opisowo) | — (opisowo) | — (opisowo) | kreator wdrożeniowy / **onboarding
> wizard** / **Einstiegsassistent**: **OPISOWO, MAŁĄ LITERĄ**, bez nazwy własnej |"

**Jeden wiersz, trzy języki, jedna reguła ortograficzna.**

## 120.2 Pomiar — 31 etykiet `modN_nazwa` ×3 języki

| język | wielką literą | małą literą |
|---|---|---|
| **pl** | 18 | **13** |
| **en** | **31** | **0** |
| **de** | **31** | **0** |

Ten sam klucz, trzy języki:
```
pl  „kreator wdrożeniowy"      ← małą literą, reguła SPEŁNIONA
en  „Onboarding wizard"        ← wielką, reguła NIESPEŁNIONA
de  „Einstiegsassistent"       ← wielką, reguła NIEWYKONALNA
```

## 120.3 Trzy różne statusy, nie jeden

| język | status reguły | dlaczego |
|---|---|---|
| **PL** | **wykonalna i wykonana** | mała litera odróżnia opis od nazwy własnej; 13 z 31 ją niesie |
| **EN** | **wykonalna, NIEWYKONANA** — 0 z 31 | wielka litera w pozycji listy jest konwencją, nie przymusem; mała jest możliwa |
| **DE** | **NIEWYKONALNA** | **niemiecki pisze WSZYSTKIE rzeczowniki wielką literą.** „einstiegsassistent" nie jest opcją stylistyczną — jest błędem ortograficznym |

> **Reguła słownika została napisana w ortografii jednego języka i zastosowana do trzech.**
> Nośnik rozróżnienia „opis vs nazwa własna" **istnieje w polskim, jest opcjonalny
> w angielskim i NIE ISTNIEJE w niemieckim.**

## 120.4 Co to robi z rozstrzygnięciem 45.4

Rozstrzygnięcie właściciela z 2026-08-21 brzmi:
> „każda z siedmiu nazw wchodzi do słownika z brzmieniem z i18n aplikacji **ALBO
> zostaje jawnie oznaczona jako opisowa; trzeciej drogi nie ma"

Konstrukcja „trzeciej drogi nie ma" **zakłada dwa stany wyrażalne**. Drugi z nich —
„jawnie oznaczona jako opisowa" — jest w słowniku zdefiniowany **przez małą literę**.

> **W niemieckim ten stan jest niewyrażalny. Konstrukcja „stan niewyrażalny zamiast
> błędu do wykrycia" obróciła się przeciwko sobie: niewyrażalny okazał się stan
> POŻĄDANY, nie zły.**

**To jest pierwsze wystąpienie wzorca projektowego z KANONU, w którym wzorzec zawiódł** —
i zawiódł nie z powodu złego wykonania, tylko dlatego, że **wyrażalność sprawdzono
w jednym języku z trzech**.

## 120.5 Do decyzji właściciela — trzy drogi, bez rekomendacji

- **A** — rozróżnienie opis/nazwa własna niesie **inny nośnik niż wielkość litery**
  (np. jawna adnotacja w słowniku, nie w treści). Reguła przestaje być ortograficzna.
  Koszt: sygnał znika ze strony, zostaje w dokumencie.
- **B** — reguła obowiązuje **wyłącznie w PL**, a EN i DE dostają własne kryterium.
  Koszt: trzy różne definicje tego samego stanu; §120.3 staje się trwały.
- **C** — rozróżnienie zostaje porzucone we wszystkich językach jako nieprzenośne.
  Koszt: `slownik-nazw.md:23` traci połowę treści, a 13 polskich etykiet traci powód,
  dla którego stoją małą literą.

**Nie rekomenduję żadnej.** Każda zmienia dokument obowiązujący, a §37 mówi, że zmiana
znaczenia idzie przez decyzję.

## 120.6 Nikt tego nie zauważył, i to ma wyjaśnienie

Sygnał jest **ortograficzny, nie leksykalny**. Żaden mechanizm w repozytorium nie patrzy
na wielkość liter: strażniki znak-w-znak porównują tekst **z tekstem** (więc obie strony
mają tę samą wielkość i zgadzają się), `bramka:liczby` czyta cyfry, bramka deklaracji
liczy znaki, listy milczenia porównują podciągi **po `toLowerCase()`**.

**Reguła ortograficzna w repozytorium, które nigdzie nie porównuje wielkości liter.**
Ósma pozycja klasy „mechanizm istnieje, nie jest wołany" — z tą różnicą, że tutaj
**mechanizmu nie ma w ogóle, a reguła zachowuje się, jakby był.**

---

# 121. CZWARTY TRYB AWARII AUDYTU „ZWYCZAJ CZY DECYZJA" — **decyzja w miejscu nieczytanym**

Autor W3-F zbudował do końca propozycję zrównania nazwy filara 1 z członem
`Hero.podtytul` (4 klucze ×3 = 12 ciągów) **i odrzucił ją**, bo znalazł rozstrzygnięcie
właściciela. **Sprawdziłem.**

## 121.1 Decyzja, dosłownie, i gdzie leży

`src/i18n/sciezki.ts:44-51` `[STAN kodu]`:
> „**KONTROLA NA PRZYSZŁOŚĆ — nie „poprawiać" filara 1** na
> „Kontakty"/„Contacts"/„Kontakte". Wygląda to kusząco, bo zrównałoby mapę z wyliczeniem
> w `Hero.podtytul` (filary 2-4 zgadzają się tam słowo w słowo, filar 1 rozjeżdża się
> we wszystkich trzech językach) — ale zbudowałoby DRUGĄ kolizję dokładnie tego typu
> co „Zespół"/„Team": `Cennik.tabela.kontakty` to dokładnie „Kontakty"|„Contacts"|
> „Kontakte" (messages :95). **Właściciel rozstrzygnął 2026-08-15: różnica ZOSTAJE,
> rejestr prozy ≠ rejestr nawigacji.**"

**Ma datę. Ma powód. Ma nazwane ryzyko, którego unika. Jest kompletna.**

## 121.2 Gdzie jej NIE ma — pomiar (R-H)

| komenda | wynik |
|---|---|
| `grep -rl "rejestr prozy" docs/ content/` | **0 plików** |
| pakiet rozstrzygnięć z tej samej daty — `docs/faza-4/etap-e-pomoc-decyzje.md` („**Status: ROZSTRZYGNIĘTY W CAŁOŚCI — właściciel, 2026-08-15**") | **nie zawiera tej decyzji** |
| KANON (`CLAUDE.md`), tabela obietnic, słownik nazw, rejestr warunków powrotu | **brak** |
| fundament ośmiu tras (5166 linii, cztery raporty) | **brak** |

**Istnieje pakiet decyzji z tej samej daty i ta decyzja do niego nie weszła.**

## 121.3 Dlaczego to jest osobny tryb awarii, nie kolejny przykład

Audyt „zwyczaj czy decyzja" (§21) miał dotąd trzy kubły: **DECYZJA** (powód zapisany),
**ZWYCZAJ** (brak powodu), **NIEUSTALONE** (nie sprawdzono). Czwarty:

> **DECYZJA ZAPISANA W MIEJSCU NIECZYTANYM** — powód istnieje, ma datę, jest kompletny,
> **i leży poza zbiorem, który ktokolwiek przeszukuje, szukając powodów.**

**Dla autora jest to nieodróżnialne od zwyczaju.** Autor sprawdził dokumenty, nie znalazł
nic i **zbudował propozycję**. Odrzucił ją dopiero dlatego, że **czytał kod z innego
powodu** — nie dlatego, że mechanizm mu ją pokazał.

**Trzy lustra tej samej klasy w jednym dniu:**
- **§112** — skrót w mapie **zatarł** decyzję D-D20;
- **§94/P-7** — polecenie zapisu do dokumentu, którego nie ma (`00-METODA`);
- **§121** — decyzja zapisana poza zasięgiem szukania.

**Wspólny mianownik: decyzja istnieje i jest niedostępna w chwili, gdy ktoś podejmuje
tę samą sprawę drugi raz.** Trzy różne mechanizmy, jeden skutek.

## 121.4 Ile jeszcze — nie sprawdzono, i to jest teraz pytanie

`src/i18n/sciezki.ts` to **jeden plik**. Komentarze w `src/` i `e2e/` niosą dziś, jak
wiemy z tego toru, co najmniej: D-D20 (§112), uzasadnienie wyjątku listy milczenia
(§116), granice bramki kontrastu (T16), świadomy brak `aria-live` (`SekcjaPlanow.tsx:20`).

**Nie policzono, ile ROZSTRZYGNIĘĆ WŁAŚCICIELA Z DATĄ leży wyłącznie w komentarzach
kodu.** Zapisuję jako pracę nazwaną, nie jako oszacowanie:
`grep -rn "właściciel\|rozstrzygn" src/ e2e/ scripts/` z odczytem każdego trafienia
i porównaniem z `docs/`. **Do wykonania przed adwersarzami** — bo adwersarz, który tego
nie ma, zaatakuje decyzje jako zwyczaje.

---

# 122. WADA W MOIM BRIEFIE — **reguła pokrycia napisana dla obietnic, zastosowana do wszystkiego**

W3-F zgłasza wprost: **§4 briefu autorów dyskwalifikuje 14 z jego 26 kluczy.**

## 122.1 Brzmienie mojej reguły

`BRIEF-AUTORZY.md` §4:
> „Każde proponowane zdanie ma **numer wiersza `tabela-obietnic.md`**. Bez wiersza —
> zdanie nie wchodzi."

## 122.2 Dlaczego jest za szeroka

Tabela obietnic zawiera **obietnice** — twierdzenia o tym, co aplikacja robi.
Serwis niesie jednak zdania, które **nie są obietnicami i nie mogą mieć wiersza**:

| rodzaj | przykład `[STAN]` | czy może mieć wiersz `TO` |
|---|---|---|
| **rozpoznanie** | `DlaKogo.s1_h2` — opis sytuacji czytelniczki | **nie** — to nie twierdzenie o produkcie |
| **samoopis strony** | `DlaKogo.naglowek`, `FunkcjeIndeks.zdanie` | **nie** |
| **nawigacja i etykiety** | `spisEtykieta`, `okruszkiAria`, `blokNLink` | **nie** |
| **obietnica** | „Planujesz dzień w Dziennym Planie Działania" | **tak — i tylko tu reguła ma sens** |

**Moja reguła nie odróżnia tych czterech rodzajów.** Zastosowana dosłownie **zakazuje
istnienia zdań, które muszą istnieć** — i autor musiałby albo dopisać nieistniejący
wiersz do tabeli obietnic (czyli skłamać w źródle prawdy), albo złamać brief.

**W3-F wybrał trzecią drogę: zgłosił wadę reguły zamiast ją obejść.** Zapisuję to
jako właściwe zachowanie — **wykonawca, który widzi wadę w zleceniu, zgłasza ją,
zamiast produkować materiał, o którym wie, że nie stoi.**

## 122.3 Poprawka reguły — zawężenie, nie rozluźnienie

> **Zdanie TWIERDZĄCE O PRODUKCIE bez wiersza pokrycia nie istnieje.**
> Zdania rozpoznania, samoopisu strony i nawigacji **nie podlegają tej regule** —
> podlegają karcie tonu i zakazowi arsenału odrzuconego. **Autor deklaruje rodzaj
> zdania przy propozycji**; deklaracja „to nie jest twierdzenie o produkcie" jest
> **rozstrzygnięciem do sprawdzenia przez sędziego**, nie zwolnieniem.

**Konstrukcja celowo NIE jest ulgą:** rodzaj zdania staje się **jawną deklaracją autora**,
którą sędzia może obalić. Bez tego reguła albo zakazuje zdań koniecznych, albo otwiera
furtkę „to nie obietnica" dla wszystkiego.

## 122.4 Drugie zastrzeżenie autora — O-1 nie mówi, którą liczbę

Warunek O-1 żąda trzech liczb znaków i **nie mówi, czy liczyć surową, czy widoczną**.
Różnica dotyczy 7 kluczy `DlaKogo.sN_robi_*` i sięga **66 znaków**; jest **identyczna
we wszystkich trzech językach dla danego klucza**, bo znaczniki rich są niezależne
od języka.

**Rozstrzygnięcie potrzebne od właściciela:** `dla-kogo.spec.ts:216` porównuje **widoczną**
(po `bezZnacznikow` i podstawieniu `{minuty}`), a moja bramka deklaracji liczy **surową**
(`v.length`). **Dwa mechanizmy w jednym repozytorium liczą dwie różne rzeczy i nazywają
to tak samo.** Autorzy podali obie — do czasu decyzji to jedyne uczciwe wyjście.

---

# 123. SKAN ROZSTRZYGNIĘĆ W KOMENTARZACH KODU — wynik częściowy, uczciwy

Zapowiedziany w §121.4, wykonany przed sędziami.

## 123.1 Skala

`grep -rn "właściciel|rozstrzygn|DECYZJA" src/ e2e/ scripts/` →
**91 trafień w 46 plikach.** Z tego **24 wystąpienia niosą DATĘ** — czyli mają formę
rozstrzygnięcia, nie wzmianki.

## 123.2 Próba kontrolna — trzy rozstrzygnięcia sprawdzone wobec `docs/`

| rozstrzygnięcie w kodzie | w `docs/` + `content/` |
|---|---|
| **Kapsułka Przyszłości — milczenie** (`funkcje-podstrony.spec.ts:40`) | **6 plików — UDOKUMENTOWANE ✔** |
| **„pion bez separatorów poniżej 48rem — decyzja właściciela"** (`hero.spec.ts:15`) | **0 plików — WYŁĄCZNIE W KODZIE ✗** |
| **„rejestr prozy ≠ rejestr nawigacji"** (`sciezki.ts:50`) | **1 plik — i tym plikiem jest ten dokument, bo wpisałem ją dziś w §121.** Przed tym: **0** |

**Trzeci wiersz wymaga zapisania wprost, żeby nie stał się fałszem za tydzień:**
liczba „1" nie znaczy, że decyzja była udokumentowana. Znaczy, że **audyt sam zmienił
stan, który mierzył**. Gdyby ktoś powtórzył ten pomiar jutro bez tej adnotacji,
odczytałby „udokumentowana" i **zamknąłby pozycję, która jest otwarta**.

## 123.3 Wynik i jego granica

**Z trzech sprawdzonych: jedna udokumentowana, dwie wyłącznie w kodzie** (jedna z nich
przeniesiona dziś przeze mnie).

**Nie sprawdzono pozostałych 21 datowanych wystąpień.** Nie ekstrapoluję z próby trzech
na dwadzieścia cztery — to byłaby dokładnie klasa §83 („liczba zbiorcza ukrywa rodzaj").
**Zapisuję jako pracę nazwaną z policzonym mianownikiem: 24 wystąpienia datowane,
3 sprawdzone, 21 do sprawdzenia.**

**Dlaczego to musi być zrobione przed adwersarzami:** adwersarz dostaje polecenie
atakowania twierdzeń bez pokrycia. **Decyzja, której nie ma w dokumentach, wygląda dla
niego dokładnie jak zwyczaj** — i zostanie zaatakowana jako taka. Poprawnie, bo z jego
punktu widzenia nie ma różnicy. **Koszt: adwersarz zużyje siłę na obalanie rozstrzygnięć,
zamiast na obalanie propozycji.**

---

# 124. FALA AUTORSKA ZAMKNIĘTA — **18 z 18**

| grupa | W1 Schwartz/Collier | W2 Hopkins | W3 Sugarman |
|---|---|---|---|
| **A rama** | 11 poz. · 3 zmiany | 5 ruchów · **3 wycięcia** | 13 poz. · 4 zmiany |
| **B filary** | 8 propozycji | 22 poz. · 13 propozycji | 31 poz. · **17 kluczy** |
| **C `/`** | 4 przepisania | 7 poz. | 21 poz. · 8 brzmień |
| **D `/cennik`** | 9 + 1 | 8 poz. | 11 poz. |
| **E podstrony** | 8 + 1 wstrzymana | 8 propozycji | 9 propozycji |
| **F indeks + `/dla-kogo`** | 4 klucze · 23 „nie ruszać" | 8 kluczy + 4 etykiety | 4 propozycje · 11 ciągów |

**Osiemnaście raportów, wszystkie zapisane do plików przed odpowiedzią.
Zero `[A]` bez ścieżki w komplecie. Zero naruszeń arsenału odrzuconego. Zero zmian
w repozytorium ze strony autorów.**

## 124.1 Trzy rzeczy, które zrobiła architektura, a nie autorzy

**(1) Rozłączne metody dały rozłączne wyniki.** W grupie A trzej autorzy nie zaproponowali
ani jednego wspólnego ruchu. W grupie B pęknięcie DE dostało **dwa różne rozwiązania**
(usunąć rzeczownik / zamknąć na `Aktionsplan`) — z argumentami, których druga strona
nie ma.

**(2) Żądania międzygrupowe powstały same.** Każdy z osiemnastu raportów zawiera sekcję
„czego wymagam od innych grup". **Nikt tego nie zlecił jako obowiązku** — wynikło
z podziału po łańcuchu: autor widzi, że jego naprawa jest połowiczna, i mówi to.
`W1-E`: „bez nich E-1, E-3 i E-8 powtarzają §91". `W3-D`: „mojego ogona nie wolno
przekleić". **Podział po materiale wymusił jawność szwów.**

**(3) Wykonawcy obalili zlecenie sześć razy.** Trzy klucze nieistniejące · `TO:251` ·
neutralność Pulsu tylko w PL · „sześć granic" gdy jest dwanaście · reguła pokrycia
za szeroka · „30 pól" gdy jest 32. **Zlecenie było materiałem do sprawdzenia,
nie instrukcją do wykonania** — i tak zostało potraktowane.

## 124.2 Co idzie do sędziów

**Osiemnaście plików propozycji** + fundament ośmiu tras + ten dokument.
**Sędziowie pracują na KOMPLECIE, nie per grupa** — warunek właściciela, którego
konieczność potwierdziła się przy pierwszym raporcie fali (§105: rodzina rezygnacji
ma 13 kluczy w trzech grupach; żaden autor nie widział jej w całości).

---

# 125. DZIEWIĄTA NOGA ŁAŃCUCHA CTA — **istnieje wyłącznie w PL i nie zobaczył jej nikt**

Sędzia S2 zmierzył, że ciąg `Hero.cta` stoi w **dziewięciu** kluczach w PL, nie ośmiu.
**Zweryfikowałem.**

| język | `Hero.cta` | nóg równych | nóg podciągowych |
|---|---|---|---|
| **pl** | „Sprawdź, jak działa" | **8** | **1** — `ZamkniecieCennik.zdanie`: „Wybierz plan i **sprawdź, jak działa** Catherly w twojej codziennej pracy." |
| **en** | „See how it works" | 8 | **0** |
| **de** | „Sieh dir an, wie es funktioniert" | 8 | **0** |

> **PL 9 · EN 8 · DE 8.** Dziewiąta noga jest **podciągowa i wyłącznie polska.**

## 125.1 Kto tego nie zobaczył

- **Mapa §1** — liczyła nogi **równe**; podciągowa z definicji poza zasięgiem (§80.3).
- **Wszyscy trzej autorzy grupy A** — każdy pisze „×8", żaden nie sprawdził zawierania.
- **Fundament ośmiu tras** — 5166 linii, brak.
- **Ja** — §110 („sześć z ośmiu prowadzi na `/login`") liczyłem na ośmiu.

**Zobaczył sędzia, którego jedynym kryterium jest spójność sieci** — czyli skład,
który **nie ma innego zadania niż patrzeć na relacje między kluczami**. To jest wynik
rozłączności kryteriów: S1 i S3 nie mieli powodu tego mierzyć.

## 125.2 Skutek natychmiastowy — jedna propozycja wraca do autora

**W2-A A-5** przestawia w `ZamkniecieCennik.zdanie` szyk: „jak działa Catherly" →
„**jak Catherly działa**". **To kasuje dziewiątą nogę** — i propozycja **nie deklaruje
tego statusu**, bo autor nie wiedział, że noga istnieje.

**Werdykt sędziego: WRACA DO AUTORA za naruszenie O-2** (dotyka łańcucha bez podania
statusu ×3 języki). **Nie za kierunek — za brak deklaracji.** W1-A kasuje tę samą nogę
**i deklaruje**; W3-A jej nie rusza.

**Trzech autorów, trzy różne zachowania wobec ciągu, o którym żaden nie wiedział, że
jest łańcuchem.** Dwóch trafiło przypadkiem: jeden zadeklarował skutek, którego nie
nazwał źródłem, drugi nie ruszył ciągu z innego powodu.

## 125.3 Klasa — trzecia postać asymetrii językowej łańcuchów

| postać | przykład |
|---|---|
| łańcuch **pęka** w jednym języku | §82 (`filar1.korzysc`, DE) · §111 (Ł-4, DE) |
| łańcuch **powstaje** w tłumaczeniu | §88 (verbatim wyłącznie w EN) |
| **łańcuch ma więcej nóg w jednym języku** | **§125 — PL 9, EN/DE 8** |

Trzecia postać jest najtrudniejsza do zauważenia, bo **liczba nóg nie jest nigdzie
zapisana per język** — karta łańcucha podaje jedną arność. §89 żądał, żeby karta niosła
arność **i metodę pomiaru**; **teraz wiadomo, że musi nieść arność PER JĘZYK.**

---

# 126. S3 O CYTACIE Z KARTY TONU — sędzia poprawia autora, i ma rację

W3-F powołał `karta-tonu.md:75-76` jako zakaz „wyrzutu" wobec słowa „jeszcze".
S3 orzekł: **kategoria trafna, podstawa źle zacytowana.** Sprawdziłem wiersz.

```
karta-tonu.md, pkt 8  [STAN]
  „Pytania retoryczne straszące nie występują („Tracisz klientki?") —
   pkt 18: rozpoznanie, nie wyrzut i nie strach."
```

**Punkt rządzi pytaniami retorycznymi straszącymi.** Zasada „rozpoznanie, nie wyrzut"
stoi w nim jako **uzasadnienie**, nie jako samodzielny zakaz. `s1_h2` nie jest pytaniem
i nie straszy — więc **przepis nie stosuje się wprost**, choć zasada, na którą się powołuje,
tak.

**S3 rozdzielił dwie rzeczy, które w cytacie stoją w jednym zdaniu:** *co przepis
zakazuje* i *dlaczego*. Autor zacytował **powód** jako **przepis**.

> **Ósme wystąpienie klasy §76 („liczba też jest cytatem") w postaci ogólniejszej:
> UZASADNIENIE PRZEPISU NIE JEST PRZEPISEM.** Cytowanie zdania podrzędnego jako normy
> rozszerza normę o wszystko, co autor uzasadnienia miał na myśli — a tego nikt
> nie rozstrzygał.

**Werdykt S3 utrzymany:** propozycja PRZECHODZI WARUNKOWO — merytorycznie autor ma rację
(i jako jedyny zmierzył, że klucz renderuje się **dwa razy**: H2 + spis), ale to jest
**wybór odcienia, nie usunięcie naruszenia**, i uzasadnienie wymaga przepisania.

---

# 127. DWA SĘDZIOWSKIE WERDYKTY — stan przed S1

## 127.1 S2 (spójność sieci): **11 przechodzi · 9 warunkowo · 5 odrzuconych · 4 wracają**

Pięć węzłów kolizji. Najtwardszy: **`Cennik.potwierdzenie1`** — W1-D żąda „ZOSTAJE",
W2-A wycina, W3-A podmienia. **Trzy propozycje grupy A dla `potwierdzenie2` wykluczają
się wzajemnie.**

**Dwa żądania międzygrupowe mają PUSTY ADRES:** wszyscy trzej autorzy C żądają
`Cennik.potwierdzenie2` **od D**, a D trzykrotnie odsyła do **A**. **Domykają się
materialnie, żaden po adresie** — czyli mechanizm żądań działa na treści i nie działa
na adresacie. **To jest wada mojego kształtu raportu:** kazałem wypisać „czego wymagam
od innych grup" i **nie kazałem podać, która grupa jest właścicielem klucza.**

**Ł-3 w PL nie domyka się w żadnym z dziewięciu parowań C×D** — warunek arytmetyczny
wymaga 71/60/70 zn, C oferuje 97/86/96, D oferuje 91/72/95. **Żadna kombinacja nie
zachowuje łańcucha.**

**Arność: jedno naruszenie w komplecie** — W2-A A-3/α (hero 2→1, `/cennik` 3→2),
**niezgłoszone**. Dwaj pozostali autorzy tej samej grupy policzyli to poprawnie.

## 127.2 S3 (czytelniczka i ton): **arsenał czysty, sprawdzony samodzielnie**

Siedem gripów po osiemnastu plikach: presja **0** · niedobór **0** · obietnica wyniku
**0** · obietnica-worek **0** (cztery trafienia to **cytat zakazu**) · superlatywy **0** ·
wykrzykniki **0** · zdrobnienia i anglicyzmy w PL **0**.

> **Deklaracje osiemnastu autorów są prawdziwe — i zostały sprawdzone, nie przyjęte.**

**Jedno wystąpienie graniczne, poganianie a nie arsenał:** W1-D „**zrób to, zanim
wygaśnie dostęp**" — granica prawdziwa (`TO:12-13`), tryb rozkazujący wbrew karcie §3.
**Ten sam fakt bez presji stoi u W3-D:** „**póki masz aktywny plan**".

**Granice `modN_nie`: ani jedna osłabiona.** Trzy propozycje je **poszerzają** własnym
kosztem znakowym.

**Pytanie, które S3 nazwał najważniejszą decyzją rundy:** czy „ustalona kolejność
modułów" to jeszcze **infrastruktura** (`TO:115`, wolno mówić), czy już **mechanizm
otwierania** (P0-3, zakaz). **Od tego zależy, czy `/dla-kogo` zachowa jedyną odpowiedź
na `s3_boli`.** Do właściciela.

---

# 128. MÓJ BŁĄD ROZMNOŻYŁ SIĘ NA DZIESIĘĆ RAPORTÓW — **i wiadomo, którą drogą**

S1 policzył: **jedenaście błędnych wskazań wiersza w osiemnastu propozycjach.
Dziesięć z nich to `TO:251` podane jako pokrycie limitu zespołu Startera** — ten sam
błąd, który miałem w §27 i §52.7 i który poprawiłem w §107.3.

## 128.1 Którą drogą poszedł — pomiar rozstrzyga

| nośnik | wystąpień `TO:251` |
|---|---|
| **`BRIEF-AUTORZY.md`** — plik wiążący, wspólny dla osiemnastu | **0** |
| **moje indywidualne zlecenia agentów** — pisane w rozmowie, per agent | **wystąpiło** (grupa C i dalej) |

> **Plik był czysty. Zlecenia pisane doraźnie — nie.**

**To jest KANON zastosowany do mnie:** reguła „materiał roboczy, który ma przeżyć dłużej
niż jedną wymianę zdań, jest plikiem" (§74) powstała dziś rano. **Brief przeszedł przez
plik i został sprawdzony. Osiemnaście zleceń przeszło przez rozmowę i nie zostało.**

**Wniosek, którego nie łagodzę:** zrobiłem plik dla treści wiążącej i **nie zrobiłem
go dla zleceń** — a zlecenie jest materiałem wiążącym tak samo. Różnica nie leżała
w wadze materiału, tylko w tym, że plik wyglądał na dokument, a zlecenie na wiadomość.
**Ta sama przyczyna, która zabiła fundament sześciu tras.**

## 128.2 Dwoje autorów poprawiło błąd sami

**W1-C i W2-C** zacytowały **oba wiersze** (`TO:250` i `TO:251`) i wskazały poprawny.
To są dokładnie ci dwaj, którzy zgłosili mi go w meldunku — czyli **mechanizm zadziałał
u dwóch z dwunastu, którzy dostali zatrutą przesłankę.**

**Dziesięciu pozostałych przepisało ją wiernie.** Nie z niedbalstwa: wskazanie na numer
wiersza **wygląda na sprawdzone**, bo pochodzi od zleceniodawcy i ma formę cytatu.
**Dokładnie klasa §76 („liczba też jest cytatem") i §106.4 („wskazanie przechodzi obok
strażnika, który cytuje ten sam wiersz").**

**Żadne z jedenastu wskazań nie obala kierunku argumentu — i żadne nie może wejść
do repozytorium nieskorygowane.**

---

# 129. DWIE KOREKTY S1 DO MOICH PRZESŁANEK

## 129.1 `TO:144` czyta **sześć kluczy czterema cięciami**, nie cztery trzema

Zmierzone (klucze niosące treść wiersza „sprzedaż, aktywne kontakty, aktywność zespołu"):

| klucz | ile członów wiersza niesie |
|---|---|
| `DlaKogo.s2_robi_1` | **3/3 — komplet** |
| `Cennik.plany.starter.pozycja1` | 2/3 (C-05) |
| `CennikSkrot.roznica` | 2/3 **+ fałszywa bramka** (S11) |
| `Filary.filar4.korzysc` · `FunkcjeIndeks.blok4Wprowadzenie` · `FunkcjeWyniki.zdanie` | **0/3** — jedno cięcie na trzech kluczach (łańcuch Ł-8) |

**§56 mówiło „cztery klucze, trzy cięcia". Jest sześć i cztery.** Zgłaszam wzrost
zgodnie z §99.1, **nie rozszerzam sam.**

**Skutek dla propozycji:** grupa D tnie jednolicie (trzy razy pełne trzy człony),
grupa C rozjechana — **W1-C wariant A wprowadza CIĘCIE PIĄTE** („kontakty, zespół
i wyniki" — trzy rzeczowniki, ale nie te trzy, co wiersz). **Naprawa, która dokłada
cięcie, jest gorsza niż zaniechanie.**

## 129.2 C-2 ma **dwa człony**, z których drugi dziś nie wchodzi

Sprostowanie przesłanki, którą sam podałem trzem autorom grupy D:

| człon | status |
|---|---|
| **1** — „przy planie rocznym płacisz z góry za dwanaście miesięcy" | **SPRAWDZALNY W TYM REPOZYTORIUM**: `content/cennik-snapshot.json` (`89000` / `"interwal":"year"` wobec `9900` / `"month"`) + komentarz `src/lib/cennik.ts` („12 = miesiące roku, nie liczba marketingowa"). **Wchodzi dziś** |
| **2** — „dostęp do końca opłaconego okresu, bez zwrotu" | **NIE WCHODZI.** Dwa powody, oba moje własne ustalenia obrócone przeciw propozycji: **R-C** — stan efektywny zależy od `STRIPE_PORTAL_CONFIG_ID` (§55.3); **NIEPEŁNY** — §55.4: **usunięcie konta anuluje NATYCHMIAST**, więc zdanie byłoby nieprawdziwe dla tej ścieżki |

**W3-D i W2-D odmówiły członu 2 — słusznie. W3-A dodał wszystkie trzy człony, cytując
przy tym zastrzeżenie, które ich zabrania.**

> **Człon 2 nie wchodzi, dopóki nie zamknie się pozycja A-1 toru aplikacji.**
> Moje zlecenie podało go jako fakt do wpisania. **Sędzia użył mojego własnego §55.4
> przeciwko mojemu własnemu zleceniu — i miał rację.**

---

# 130. RODZINA REZYGNACJI PRZEŻYWA KAŻDĄ KOMBINACJĘ OSIEMNASTU PROPOZYCJI

Najcięższy wynik S1, zmierzony niezależnie na trzynastu kluczach:

| grupa | co robi z rodziną |
|---|---|
| **A** | rusza 8 (W1-A), 10 (W2-A), 10 (W3-A) |
| **C** | **wszyscy trzej zostawiają frazę w `Obawy.o3`** |
| **D** | **wszyscy trzej zostawiają w `Cennik.faq.o3`** — rozstrzygnięcie właściciela 2026-08-15 |

> **W żadnej kombinacji osiemnastu propozycji rodzina nie znika.** Przeżywa co najmniej
> **3 klucze × 3 języki = 9 ciągów**, na obu trasach, którymi chodzi czytelniczka.

**W3-A powiedział to o sobie:** „bez pozycji 11 i 12 to nie jest naprawa". **Ma rację
i to samo dotyczy W1-A i W2-A** — żaden z trzech nie mógł objąć rodziny, bo cztery
z trzynastu kluczy leżą poza grupą A.

**To jest §91 w postaci najczystszej z możliwych:** naprawa częściowa **droższa niż
zaniechanie** — z tą różnicą, że tutaj **żaden autor nie mógł postąpić inaczej**.
Podział na grupy, który wymusił jawność szwów (§124.1), tutaj **uniemożliwił naprawę**.

**Wniosek konstrukcyjny dla przyszłych paneli:** rodzina rozłożona na trzy grupy
wymaga **pozycji wspólnej**, przydzielonej ponad podziałem — albo rozstrzygnięcia
właściciela **przed** falą autorską, nie po. **Podział po łańcuchu obsłużył łańcuchy
równościowe i nie obsłużył RODZIN** — bo rodzina „rezygnacja" nie jest łańcuchem
(trzynaście różnych brzmień), tylko **wspólnym twierdzeniem w wielu brzmieniach**.

**Klasa nazwana: RODZINA TWIERDZENIA ≠ ŁAŃCUCH CIĄGU.** Łańcuch dzieli **wartość**;
rodzina dzieli **twierdzenie**. Mapa §1 zna wyłącznie pierwsze.

---

# 131. CZŁON O AKADEMII W PODTYTULE — **NIE ISTNIEJE. Oto co istnieje.**

Właściciel prosi o brzmienie członu o Akademii ×3 języki + wiersz pokrycia, żeby
zastosować kryterium: **infrastruktura wolno · gotowe treści nie wolno.**

## 131.1 Podtytuł nie ma członu o Akademii — cztery człony, cztery filary

```
pl  „Catherly to system do własnej sprzedaży bezpośredniej — kontakty, treści,
     zespół i wyniki w jednym miejscu."                                   107 zn
en  „…— contacts, content, team, and results in one place."               109 zn
de  „…— Kontakte, Inhalte, Team und Ergebnisse an einem Ort."             112 zn
```

| człon | filar | pokrycie |
|---|---|---|
| kontakty / contacts / Kontakte | 1 — pozyskiwanie | `TO:36-42` |
| treści / content / Inhalte | 2 — treści | `TO:72-79` |
| zespół / team / Team | 3 — zespół | `TO:110-115` |
| wyniki / results / Ergebnisse | 4 — wyniki | `TO:144-149` |

**Żaden z czterech nie mówi o Akademii ani o szkoleniach.** Akademia jest **jedną
z funkcji filaru 3**, pokrytą wewnątrz `TO:110-115` — **człon „zespół" jej nie obiecuje,
tylko ją zawiera.**

**Wobec kryterium właściciela:** człon „zespół" **nie mieści się w żadnej z dwóch
kategorii**, bo nie mówi o Akademii wcale. **Kryterium nie ma do czego się przyłożyć
w podtytule.**

## 131.2 Gdzie Akademia NAPRAWDĘ stoi — i tam kryterium działa

Wiersz pokrycia, dosłownie:
```
TO:115   „Akademia — infrastruktura LMS | Akademia z sekwencyjnym odblokowaniem
          modułów jest gotowa — treści szkoleniowe dodaje administrator."
TO:133-134  „Treści szkoleniowe — baza pusta; można pisać o INFRASTRUKTURZE
             Akademii (j.w.), NIE O TREŚCIACH."
```
**Wiersz stawia dokładnie tę granicę, którą właściciel formułuje jako kryterium.**

Dwa miejsca w serwisie (jeden łańcuch podciągowy, §117):

**`FunkcjeZespol.mod6_poco`**
```
pl  „Nowa osoba z twojego zespołu otwiera Akademię i nie pyta cię, od czego zacząć
     — kolejny moduł odblokowuje się dopiero po ukończeniu poprzedniego. Ty wracasz
     do swoich rozmów, a jej ścieżka pilnuje się sama."
en  „A new person on your team opens the Academy and doesn't ask you where to start
     — the next module unlocks only once the previous one is finished. You get back
     to your own conversations, and her path takes care of itself."
de  „Deine neue Partnerin öffnet die Akademie und fragt dich nicht, womit sie
     anfangen soll – das nächste Modul schaltet sich erst frei, wenn das vorherige
     abgeschlossen ist. Du gehst zurück zu deinen eigenen Gesprächen, und ihr Weg
     regelt sich von selbst."
```

**`DlaKogo.s3_robi_2`** — druga noga tego samego łańcucha, dodatkowo **nazywa rolę**
(„administrator / der Administrator"), co rozstrzygnięcie z 2026-08-21 usuwa.

## 131.3 Zastosowanie kryterium właściciela — mój odczyt, do jego rozstrzygnięcia

| człon zdania | infrastruktura czy treści |
|---|---|
| „otwiera Akademię" | **infrastruktura** — miejsce istnieje |
| „kolejny moduł odblokowuje się dopiero po ukończeniu poprzedniego" | **SPORNE** — opisuje **mechanizm sekwencyjny**, który `TO:115` nazywa wprost („z sekwencyjnym odblokowaniem modułów jest gotowa"). **Wiersz go pokrywa.** Ale P0-3 usunął tę samą konstrukcję z `/` |
| „nie pyta cię, od czego zacząć" · „jej ścieżka pilnuje się sama" | **implikuje ISTNIENIE ŚCIEŻKI DO PRZEJŚCIA** — czyli treści. **Baza jest pusta.** Zdanie prawdziwe o pustej Akademii brzmiałoby absurdalnie: nie pyta, od czego zacząć, bo **nie ma czego zacząć** |

> **Mój odczyt: człon pierwszy i drugi mieszczą się w infrastrukturze i mają pokrycie
> w `TO:115` co do słowa. Człony trzeci i czwarty obiecują GOTOWE TREŚCI — nie wprost,
> tylko przez implikaturę, i dlatego przeszły przez wszystkie wcześniejsze przeglądy.**

**Nie rozstrzygam.** To jest dokładnie pytanie, które S3 nazwał najważniejszą decyzją
rundy, a S1 postawił jako `S1-X`. **Rozstrzygnięcie właściciela jest tu warunkiem
wejścia trzech propozycji z grup E i F.**

---

# 132. 79 → **22 → trzy kubły**. I liczba „79" była par, nie kluczy.

## 132.1 Najpierw jednostka — bo to jest ta sama pułapka trzeci raz

| zapis | co naprawdę liczy |
|---|---|
| §103 „**79 kluczy** nieobecnych w żadnym pliku treści" | **79 PAR (język, klucz)** |
| rozbicie | pl **24** · en **28** · de **27** |
| **kluczy nieobecnych we WSZYSTKICH trzech językach** | **22** |
| kluczy nieobecnych **tylko w niektórych** językach | **8** |

**Trzeci raz dziś ta sama wada w moim własnym zapisie** (po 10 658 par w M-4 i po
„21 łańcuchach" z dwóch rodzin). **Liczba była prawdziwa i mierzyła co innego, niż
sugerowała jej nazwa.**

## 132.2 Osiem kluczy nieobecnych TYLKO W NIEKTÓRYCH językach — klasa spoza pytania

`Cennik.potwierdzeniaAria` (brak w en, de) · `Cennik.tabela.drzewo` (brak w pl, en) ·
`Cennik.tabela.pozaPlanem` (en, de) · `Nawigacja.dlaKogo` (en) ·
~~`Stopka.dokumentyPozycje.regulamin` (en, de)~~ · `Stopka.mapaStrony` (de) ·
`Stopka.wkrotce` (en, de) · ~~`Wspolne.stronaGlowna` (pl)~~

> **SPROSTOWANIE 2026-08-21 (§155).** Dwa wiersze wykreślone: `Stopka.dokumentyPozycje.regulamin`
> i `Wspolne.stronaGlowna` **nie są pilnowane w żadnym języku** — ich „obecność" w PL była
> **fałszywym trafieniem mojego narzędzia**. Nie są klasą asymetrii; są klasą **strażnika
> pozornego**. Zgłoszone przez K-2 dla jednego klucza, przeliczone przeze mnie na całym
> pliku i znalezione w **czterech**. Liczby §132.1 i §135 **nie są tu przeliczone** —
> powód i granica w §155.3.

> **Ten sam klucz jest pilnowany strażnikiem znak-w-znak w jednym języku i niepilnowany
> w drugim.** Nie dlatego, że ktoś tak zdecydował — dlatego, że plik treści jednego
> języka go nosi, a drugiego nie.

**Asymetria pilnowania per język. Klasy nie było w pytaniu i nie było w tym torze.**

## 132.3 KUBEŁ 0 — fałszywe trafienia mojej metody (8 z 22)

`DlaKogo.s1_robi_1/2/3` · `s2_robi_1/2` · `s3_robi_1/2` · `FunkcjePozyskiwanie.mod2_poco`

**SĄ pilnowane.** `dla-kogo.spec.ts:216` porównuje po `bezZnacznikow()` i podstawieniu
`{minuty}`; mój skan porównuje surowo, więc gubi każdy klucz ze znacznikami rich.
**Wypisuję je jako pierwsze, żeby nie weszły do żadnego z trzech kubłów właściciela.**

## 132.4 KUBEŁ 1 — CHROME (nawigacja, stopka, etykiety UI) · **9 + 8 częściowych**

| klucz | co niesie |
|---|---|
| `Cennik.faqNaglowek` „Pytania o płatność" | nagłówek sekcji FAQ |
| `Cennik.okresLegenda` „Okres rozliczenia" | etykieta przełącznika okresu |
| `Cennik.oszczedzasz` „oszczędzasz {kwota}" | **szablon z placeholderem** — wartość z migawki Stripe |
| `Cennik.tabela.caption` „Porównanie planów" | podpis tabeli |
| `Nawigacja.nawGlowna` „Nawigacja główna" | nazwa dostępna nawigacji |
| `Nawigacja.przejdzDoTresci` „Przejdź do treści" | skip-link |
| `Stopka.dokumentyPozycje.przetwarzanieDanych` „Przetwarzanie danych" | etykieta dokumentu prawnego (P-REG: **tekst, nie link**) |
| + osiem z §132.2 | etykiety nawigacji, stopki, `sr-only`, wiersz tabeli |

## 132.5 KUBEŁ 2 — **TREŚĆ PUBLICZNA BEZ PILNOWANIA · 5 kluczy**

**To jest ten kubeł, po który właściciel kazał to zrobić.**

| klucz | co niesie |
|---|---|
| `ObrazyFilarow.filar1` | „Ekran Dziennego Planu Działania (DMO) w aplikacji Catherly: liczniki zadań na dany dzień z celami i paskami postępu." |
| `ObrazyFilarow.filar2` | „Ekran Tarczy…: **wklejony tekst z obietnicą zarobków**, pod nim oznaczone ryzykowne sformułowania i propozycja poprawionej wersji." |
| `ObrazyFilarow.filar3` | „Ekran programu Pierwsze 90 Dni…: faza, numer dnia, pasek postępu i karta misji na dziś." |
| `ObrazyFilarow.filar4` | „Ekran Twojego Wrapped…: slajd miesięcznego podsumowania z licznikiem opublikowanych postów." |
| `StronaLogowania.tresc` | „**Logowanie będzie dostępne przy premierze aplikacji.**" |

**Czym są pilnowane cztery pierwsze:** `zrzuty-filarow.spec.ts:325` porównuje alt
**z DOM** (`getByRole("img", { name: ... })`). **To jest samoodniesienie** — dokładnie
wada, dla której powstał strażnik znak-w-znak (`hero.spec.ts:174-177`: „testy porównywały
DOM z messages (samoodniesienie)"). **Naprawiono ją dla treści i nie objęto tekstów
alternatywnych.**

**Czym jest pilnowane piąte:** niczym. `StronaLogowania.tresc` **nie ma pliku treści,
nie ma wiersza `TO`, jest zdaniem z datą ważności (T7)** i stoi ×3 języki.
Zgłosił to autor W3-A: „§4 briefu nie ma kubła dla twierdzenia o stanie serwisu".

**Cztery teksty alternatywne opisują EKRANY APLIKACJI.** Są treścią publiczną, czyta
je czytnik ekranu i wyszukiwarka, twierdzą o produkcie — i **jedynym ich sprawdzianem
jest porównanie z samymi sobą.**

## 132.6 KUBEŁ 3 — renderowalne, poza zakresem panelu · **2 klucze**

`NieZnaleziono.naglowek` „Tej strony nie ma." · `NieZnaleziono.wroc` „Wróć na stronę
główną." — trasa `/nie-znaleziono` jest **poza ośmioma trasami panelu** (decyzja
właściciela), ale **renderuje się i ma własny strażnik** (`nie-znaleziono.spec.ts`).
**Nie są resztkami — są treścią poza zakresem.**

**Kubeł „nieużywane resztki" jest PUSTY.** Nie znalazłem ani jednego klucza
renderowalnego i nieużywanego. **Zapisuję to jako wynik, nie jako brak wyniku.**

## 132.7 Bilans

**22 = 8 fałszywych trafień + 9 chrome + 5 treści bez pilnowania + 2 poza zakresem.**
Plus 8 kluczy o **asymetrycznym pilnowaniu per język** (§132.2).
**Bez ocen i bez propozycji**, zgodnie ze zleceniem.

---

# 133. REJESTR PRZESŁANEK — P-8, wpisana przez właściciela na siebie

| # | przesłanka | kto wprowadził | co na niej zbudowano | obalenie |
|---|---|---|---|---|
| **P-8** | „człon o szkoleniach w `Hero.podtytul` jest **NIEPRAWDZIWY**" | **właściciel**, 2026-08-19 | rozstrzygnięcie „**Akademia wypada z hero, podtytuł dostaje trzy człony**" · zakwalifikowanie „szkoleń" jako **P0** · zamówienie trzech wariantów zastępczych | Podtytuł ma **cztery człony, wszystkie pokryte**, i **członu o szkoleniach nie ma w żadnym języku** (§96.1, potwierdzone niezależnie przez trzech autorów) |

**Zapis właściciela, dosłownie:**
> „Moja decyzja «szkolenia wypada, trzy człony» powstała na przesłance, że człon jest
> NIEPRAWDZIWY. Twój pomiar mówi, że cztery człony są pokryte. **To dwie różne rzeczy
> — decyzja dotyczyła pierwszej.** […] **Rozstrzygnąłem o usunięciu treści,
> nie sprawdziwszy jej pokrycia.**"

## 133.1 Dlaczego to jest pozycja o mechanizmie, nie o pomyłce

**Rozstrzygnięcie było poprawne wobec swojej przesłanki.** Gdyby człon istniał
i był nieprawdziwy, „wypada" byłoby jedyną odpowiedzią zgodną z ADR-018.
**Upadła przesłanka, nie rozumowanie.**

**To jest §99.1 zastosowane wstecz i w drugą stronę:** tamta reguła mówi, że
rozstrzygnięcie z **liczbą miejsc** jest ważne dla stanu pomiaru. **P-8 pokazuje,
że dotyczy to także rozstrzygnięcia o SAMYM ISTNIENIU przedmiotu.**

**Pierwsze zastosowanie zasady „zdanie bez pokrycia nie istnieje" przeciwko
rozstrzygnięciu o USUNIĘCIU** — dotąd sprawdzaliśmy pokrycie zdań, które mają wejść.
**Zdanie, które ma wypaść, wymaga tego samego sprawdzenia**, bo usunięcie treści
pokrytej jest szkodą tej samej klasy co dodanie niepokrytej.

## 133.2 Skutek proceduralny

Zakres bez zmian: **autorzy pracują na czterech członach.** Pozycje `WSTRZYMANE`
dotyczące podtytułu **przechodzą do oceny normalnej** — trzy propozycje zachowujące
cztery człony czekały na to rozstrzygnięcie i mają je.

---

# 134. STRAŻNIK SANKCJI — **specyfikacja gotowa, bez implementacji**

Zatwierdzone przez właściciela 2026-08-21: konstrukcja rejestru sankcji per klucz,
**dwa przebiegi**, adnotacja o zasięgu każdego.

## 134.1 Przedmiot i powód

Trasy `/` i `/cennik` nie mają list milczenia. **Luki nie da się domknąć kopiowaniem
listy**, bo lista jest **zakazem podciągu** i nie odróżnia obietnicy od etykiety UI:
zakaz „rozliczenia" zapaliłby się na `Cennik.okresLegenda` = „**Okres rozliczenia**",
poprawnej etykiecie przełącznika (§92.4).

**Rozwiązanie: rozstrzygnięcie zamiast oceny językowej.** Trzecie wystąpienie wzorca,
który repozytorium już zna — `content/liczby-w-tresci.json` (liczby) i
`content/deklaracje-zlozone.json` (deklaracje złożone).

## 134.2 Rejestr sankcji

`content/sankcje-milczenia.json` — wpis: **klucz + fraza + powód**.
Dziś potrzeba **jednego wpisu**:
```
{ "klucz": "Cennik.okresLegenda", "fraza": "rozliczenia",
  "powod": "etykieta przełącznika okresu, nie obietnica funkcji.
            Rejestr poz. 1 dotyczy słowa „Rozliczenia" w H1 i podtytule hero." }
```
Trasa `/`: **zero wpisów** — 49 fraz, zero trafień w jej przestrzeniach (§101.3).

## 134.3 Dwa przebiegi — i co każdy widzi

| | **przebieg 1 — `messages`** | **przebieg 2 — HTML** |
|---|---|---|
| przedmiot | wartości kluczy przestrzeni trasy | wyrenderowane ciało odpowiedzi |
| **widzi** | dokładnie, **który klucz** niesie frazę | **wszystko**, co trafia do czytelniczki |
| **nie widzi** | tekstu wstawianego przez komponent (etykiety w JSX, literalne `aria-label`) | **którego klucza dotyczy trafienie** — a bez tego rejestr sankcji per klucz nie ma się o co zaczepić |
| wyjątki | **rejestr sankcji per klucz** | **brak** — przebieg 2 działa wyłącznie na frazach niesankcjonowanych nigdzie |

> **Przebieg 1 kupuje precyzję i traci zasięg. Przebieg 2 kupuje zasięg i traci
> precyzję. Żaden nie zastępuje drugiego** — dlatego oba, z jawną adnotacją,
> co każdy obejmuje.

**Ta sama konstrukcja co M-1/M-2/M-3:** mechanizm **mówi, czego nie obejmuje**.

## 134.4 Raportowanie — zgodnie z regułą z KANONU

Komunikat **na zielono i na czerwono** podaje: fraz sprawdzonych · kluczy objętych
przebiegiem 1 · **fraz sankcjonowanych i użytych** (żeby sankcja nie stała się cichym
wyłącznikiem — precedens T21 pkt 4) · fraz nieobecnych nigdzie (**prewencja, M-1**) ·
**czego przebieg 1 nie widzi** (M-3).

## 134.5 Weryfikacja wsteczna — dostępna od razu, asymetryczna

| trasa | dziś |
|---|---|
| **`/cennik`** | **zapala się na trzech frazach Pulsu** (`Cennik.plany.growth.pozycja1` ×3 języki) — realne naruszenie §57.1; **milczy na sankcjonowanej etykiecie** |
| **`/`** | **wchodzi zielona, zero trafień** — dowodem musi być **mutacja z przywróceniem i sumą SHA-256**, bo bramka wchodząca zielona nie ma weryfikacji wstecznej (§79.3) |

## 134.6 Czego ta bramka nie zrobi

Nie odróżni obietnicy od etykiety **sama** — odróżnia je **rejestr**, czyli człowiek,
raz, z powodem zapisanym. **Bramka pilnuje, żeby rozstrzygnięcie nie zniknęło,
a nie żeby powstało.**

**Nie implementuję.** Specyfikacja gotowa; wejście po autorach, decyzją właściciela.

---

# 135. SPROSTOWANIE — **„osiem kluczy asymetrycznych" to artefakt progu. Jest pięć, a niepilnowanych 32, nie 22.**

Zadanie właściciela („wypisz osiem z podziałem per język") wykonane — **i jego wykonanie
obaliło liczbę, którą sam podałem.**

## 135.1 Przyczyna

Mój skan miał **próg 12 znaków** (odziedziczony z bramki deklaracji, gdzie jest
uzasadniony: krótkie ciągi trafiają jako podciąg w cudze zdania). **Przy pytaniu
o pilnowanie próg nie ma uzasadnienia** — klucz krótki jest pilnowany albo nie,
niezależnie od długości.

Skutek: klucz o wartości poniżej progu **wypadał ze skanu w tym języku i wchodził
w innym** — bo tłumaczenie bywa dłuższe. `Stopka.wkrotce`: pl „(wkrótce)" = **9 zn,
poniżej progu**; en „(coming soon)" = 13; de „(folgt in Kürze)" = 16. **Wyglądało
na asymetrię pilnowania. Było asymetrią mojego progu.**

## 135.2 Liczby prawdziwe, bez progu

| | z progiem 12 zn | **bez progu** |
|---|---|---|
| niepilnowanych we wszystkich trzech językach | 22 | **32** |
| **asymetria pilnowania** | „8" | **5** |

**§132 podawał 22 — jest 32.** Dziesięć kluczy krótszych niż 12 znaków było poza
skanem w ogóle.

## 135.3 Pięć kluczy z RZECZYWISTĄ asymetrią

| klucz | pilnowany w | niepilnowany w | co niesie |
|---|---|---|---|
| **`Cennik.tabela.drzewo`** | **de** | **pl, en** | „Drzewo struktury" / „Structure tree" / „Strukturbaum" — **wiersz tabeli nazywający funkcję bramkowaną planem Growth (`TO:122`)** |
| `Cennik.tabela.wPlanie` | pl, de | **en** | „w planie" — `sr-only`, druga połowa pary z „poza planem"; **niesie bramkowanie** |
| `Cennik.tabela.zakres` | pl, de | **en** | „Zakres" — nagłówek kolumny |
| `Cennik.potwierdzeniaAria` | **pl** | en, de | „Potwierdzenia" — nazwa dostępna paska |
| `Nawigacja.dlaKogo` | pl, de | **en** | „Dla kogo" — etykieta nawigacji |

## 135.4 Odpowiedź na pytanie właściciela: **TAK, jeden niesie twierdzenie o produkcie**

> **`Cennik.tabela.drzewo` — „Drzewo struktury" — jest wierszem tabeli porównawczej
> nazywającym funkcję bramkowaną planem Growth (`TO:122`, bramka `TO:230`).
> Jest pilnowany strażnikiem znak-w-znak WYŁĄCZNIE W NIEMIECKIM.
> W polskim i angielskim — przez nic.**

Drugi granicznie: **`Cennik.tabela.wPlanie`** („w planie") — nie nazywa funkcji, ale
**niesie bramkowanie**: to `sr-only`, które czytnik ekranu podaje niewidomej
czytelniczce zamiast znaku ✓. Niepilnowany w angielskim.

**Pozostałe trzy to etykiety i nazwy dostępne — bez twierdzenia o produkcie.**

## 135.5 Klasa STOI, i jest dokładnie tak groźna, jak nazwał ją właściciel

> „Przegląd sprawdzi jeden język, zobaczy strażnika i uzna sprawę za zamkniętą."

**Przy `Cennik.tabela.drzewo` jest gorzej niż w tym opisie:** przegląd prowadzony
po polsku — czyli **domyślny** — **nie zobaczy strażnika w ogóle**, bo jedyny stoi
w niemieckim. Klucz wygląda na niepilnowany, jest niepilnowany w dwóch językach
z trzech, **a mimo to nie jest „bez strażnika"**, więc nie trafi na żadną listę braków.

## 135.6 Piąty raz dziś — i pierwszy, w którym pomyliłem WŁAŚCICIELA

Cztery poprzednie wady moich narzędzi (§117.3) złapałem sam albo przez sprzeczność
z raportem agenta. **Ta poszła do właściciela jako ustalenie i wróciła jako zadanie** —
czyli **zadziałała dokładnie tak, jak ma działać zlecenie: kazał wypisać, wypisanie
obaliło liczbę.**

**Reguła, która się z tego bierze i której nie miałem:** **próg odziedziczony
z jednego pomiaru jest przesłanką milczącą w drugim.** Próg 12 znaków był
rozstrzygnięciem dla bramki deklaracji, z powodem zapisanym (§69.4 pkt 4).
Przeniesiony do pytania o pilnowanie **nie miał powodu i nie został zakwestionowany,
bo wyglądał na część narzędzia, nie na decyzję.**

---

# 136. `mod6_poco` ROZSTRZYGNIĘTE — dwa człony wypadają, dwa zostają

**Rozstrzygnięcie właściciela 2026-08-21.**

| człon | werdykt |
|---|---|
| „otwiera Akademię" | **ZOSTAJE** — infrastruktura |
| „kolejny moduł odblokowuje się dopiero po ukończeniu poprzedniego" | **ZOSTAJE** — `TO:115` pokrywa co do słowa |
| „nie pyta cię, od czego zacząć" | **WYPADA** |
| „jej ścieżka pilnuje się sama" | **WYPADA** |

## 136.1 Rozróżnienie kontekstu — zapisane wprost, żeby nie odczytano go jako niespójności

P0-3 usunął konstrukcję „sekwencyjnego odblokowania" z trasy `/`. Ta sama konstrukcja
**zostaje na `/funkcje/zespol`**. **To nie jest rozjazd — to dwa konteksty jednego faktu.**

> **Powód, dosłownie (właściciel):** P0-3 dotyczył **HERO** — „czterech sekund uwagi,
> nie miejsca na tłumaczenie, czego nie ma". **Na `/funkcje/zespol` jest miejsce
> i kontekst.**

**Reguła, która z tego wynika i którą trzeba znać przy syntezie:** ten sam fakt
**może być dopuszczalny na jednej trasie i niedopuszczalny na innej**, jeśli różnica
leży w **budżecie uwagi i obecności kontekstu**, nie w prawdziwości. **Zapis wymaga
podania POWODU przy każdej takiej parze** — inaczej następny przegląd zobaczy dwa
różne stany jednego faktu i wyrówna je w złą stronę.

---

# 137. TEKSTY ALTERNATYWNE — **szósty wariant B, pierwszy dotyczący DOSTĘPNOŚCI**

`ObrazyFilarow.filar1-4` — cztery opisy ekranów aplikacji, ×3 języki = **12 ciągów**.

**Czym są pilnowane:** `zrzuty-filarow.spec.ts:325` porównuje alt **z DOM**
(`getByRole("img", { name: pl.ObrazyFilarow[klucz] })`). **To jest samoodniesienie** —
dokładnie wada, dla której powstał strażnik znak-w-znak (`hero.spec.ts:174-177`:
„testy porównywały DOM z messages (**samoodniesienie**)").

> **Naprawiono ją dla treści i nie objęto tekstów alternatywnych.**
> Szósty wariant B w tym torze — **i pierwszy dotyczący dostępności.**

## 137.1 Dlaczego to nie jest etykieta

`ObrazyFilarow.filar2` `[STAN]`:
> „Ekran Tarczy w aplikacji Catherly: **wklejony tekst z obietnicą zarobków**, pod nim
> oznaczone ryzykowne sformułowania i propozycja poprawionej wersji."

**To jest twierdzenie o produkcie** — opisuje, co aplikacja robi, i nazywa konkretny
przypadek użycia. **Niewidoma czytelniczka dostaje ten opis zamiast obrazu.**
Jej jedynym dostępem do ekranu jest zdanie, **którego prawdziwości nie pilnuje nic
poza porównaniem z samym sobą.**

## 137.2 Żądanie właściciela — zapisane jako pozycja

> **Teksty alternatywne wchodzą pod ten sam reżim co treść: plik treści albo wiersz
> tabeli obietnic.**

**Nie wykonuję** (zmiana zakresu materiału). Pozycja otwarta, adresat: panel treści
przy najbliższym dotknięciu zrzutów.

---

# 138. `StronaLogowania.tresc` — **czwarta pozycja checklisty premiery, druga z twardym terminem**

„Logowanie będzie dostępne przy premierze aplikacji." ×3 języki.
**Bez pliku treści. Bez wiersza `TO`. Z datą ważności (T7).**

**Checklista premiery — stan po dzisiejszym dniu:**

| # | pozycja | termin |
|---|---|---|
| 1 | poz. 13 rejestru — `robots: noindex,nofollow` | dzień publikacji |
| 2 | **T7** — inwentarz zdań przedpremierowych ×3 języki | przed premierą |
| 3 | **`lint-tokeny` / blok eksperymentu palety** | **2026-08-31 — twardy** |
| 4 | **`StronaLogowania.tresc`** | **dzień premiery — twardy** |

**Pozycja 4 jest szczególna:** to **jedyne zdanie na liście, które nie jest ustawieniem
ani długiem technicznym, tylko TREŚCIĄ czytaną przez użytkowniczkę** — i jedyne, które
**w dniu premiery staje się fałszem o własnym serwisie**, zamiast po prostu przestać
być potrzebne.

**Dodatkowo: jest nogą łańcucha.** `StronaLogowania.tresc` to cel **sześciu z ośmiu
wezwań** (§110) — w dniu premiery fałszywe staje się nie jedno zdanie, tylko **punkt
docelowy większości ścieżek serwisu**.

---

# 139. AUDYT WSTECZNY NARZĘDZI — **skan łańcuchów miał ten sam próg i ukrył trzy łańcuchy**

Zadanie właściciela: sprawdzić, czy inne narzędzia tego toru nie niosą progów, filtrów
albo limitów odziedziczonych z pomiarów, do których nie należą.

## 139.1 Wynik — liczba najczęściej cytowana w tym torze była za niska

| próg | łańcuchów |
|---|---|
| **12 znaków** (deklarowany w §80, odziedziczony z mapy §1) | PL **20** · EN **20** · DE **19** |
| **bez progu** | **PL 23 · EN 23 · DE 22** |

**Trzy łańcuchy krótsze niż 12 znaków były poza skanem:**

| ciąg | nóg | klucze | en | de |
|---|---|---|---|---|
| **„Zespół"** | 2 | `Cennik.tabela.zespol` = `FunkcjeZespol.okruszek` | ŁAŃCUCH | ŁAŃCUCH |
| **„asystent AI"** | 2 | `FunkcjePozyskiwanie.aiNaglowek` = `FunkcjeTresci.aiNaglowek` | ŁAŃCUCH | ŁAŃCUCH |
| **„— kierunek"** | 2 | `FunkcjePozyskiwanie.aiOznaczenie` = `FunkcjeTresci.aiOznaczenie` | ŁAŃCUCH | ŁAŃCUCH |

## 139.2 Dwa z trzech mają wagę, nie są kurzem

**„— kierunek" (`aiOznaczenie`)** — agent A0-R3 zgłosił go jako **D-5: „drugi łańcuch
bez strażnika, ta sama konstrukcja co pęknięcie DE"**. **Zgłosił go w raporcie, a mój
skan go nie widział** — czyli w §80 stało „20 łańcuchów", a w raporcie leżał dwudziesty
pierwszy. **Rozbieżność stała między dwoma dokumentami tego samego toru przez cały
dzień i nikt jej nie zestawił**, bo jedna liczba była w tabeli, a druga w prozie raportu.

**„Zespół" (`Cennik.tabela.zespol` = `FunkcjeZespol.okruszek`)** — to jest **dokładnie
ta kolizja, o której mówi rozstrzygnięcie właściciela z 2026-08-15** ukryte
w `sciezki.ts:50` (§121): „zbudowałoby **DRUGĄ kolizję dokładnie tego typu co
«Zespół»/«Team»**". **Rozstrzygnięcie odnosi się do łańcucha, którego moja mapa
nie pokazywała.**

## 139.3 Przegląd pozostałych narzędzi — parametry i ich powody

| narzędzie | parametr | powód w JEGO pytaniu | werdykt |
|---|---|---|---|
| `lint-deklaracje.mjs` | `PROG_ZNAKOW = 12` | **TAK** — krótki ciąg trafia jako podciąg w cudze zdanie i przypisuje sobie cudzą deklarację (zmierzone: bez progu fałszywe trafienia) | **zostaje, uzasadniony** |
| `lint-deklaracje.mjs` | okno 40 znaków po ciągu | **TAK** — deklaracja stoi bezpośrednio po ciągu; luźniej dało 56 zapaleń | **zostaje** |
| **skan łańcuchów (§80)** | **próg 12** | **NIE** — łańcuch jest łańcuchem niezależnie od długości | **WYPADA — §139.1** |
| audyt cytowań (§107) | minimalna długość cytatu **12**, prefiks porównania **38** | **NIE SPRAWDZONE** — oba przyjąłem bez uzasadnienia | **`[N]`** |
| audyt cytowań | okno 240 znaków po `TO:NNN` | **NIE SPRAWDZONE** | **`[N]`** |
| skan wskazań wiersza (§106) | wzorzec `w\. ?N` | **NIE** — pomija notacje „wiersz N", „linia N", „:N" | **za wąski, zadeklarowany dziś** |
| skan milczenia (§92) | mapa przestrzeń→trasa, pisana ręcznie | **TAK**, ale **ręczna** — parametr, nie pomiar | **zostaje z adnotacją** |
| pomiar podciągu (§117) | `autojunk` biblioteki | **NIE** — naprawiony w §117.2 | **naprawiony** |

**Trzy parametry bez sprawdzonego powodu, jeden obalony, jeden naprawiony wcześniej.**

## 139.4 Reguła, która się z tego bierze

> **Rozbieżność między liczbą w moim dokumencie a liczbą w cudzym raporcie jest
> sygnałem o narzędziu, nie o materiale** — i jest najtańszym sygnałem, jaki dostaję.
> Dziś zadziałała trzy razy (§117 autojunk, §135 próg, §139 łańcuchy) i **za każdym
> razem to raport agenta miał rację.**

---

# 140. `Cennik.tabela.drzewo` — **STRAŻNIK OBECNY W JĘZYKU, W KTÓRYM NIKT NIE SPRAWDZA**

**Nowa klasa, nazwana przez właściciela 2026-08-21.**

> **Klucz nie trafi na żadną listę braków, bo formalnie strażnika MA.
> Przegląd po polsku — czyli domyślny — nie zobaczy go wcale.**

| | |
|---|---|
| ciąg | „Drzewo struktury" / „Structure tree" / **„Strukturbaum"** |
| pilnowany znak-w-znak | **wyłącznie w `de`** |
| niepilnowany | **`pl`, `en`** |
| co niesie | **wiersz tabeli porównawczej nazywający funkcję bramkowaną planem Growth** — `TO:122`, bramka `TO:230` |

## 140.1 Dlaczego to jest odwrotność braku strażnika, a nie jego odmiana

| stan | policzalny? | jak wygląda w przeglądzie |
|---|---|---|
| **brak strażnika** | **TAK** — `grep` po pliku treści daje zero | luka widoczna, trafia na listę |
| **strażnik w języku, w którym nikt nie sprawdza** | **NIE** | **wygląda na pokrycie** |

**Brak da się policzyć. Ten stan nie daje się policzyć, bo formalnie jest pokryciem.**
Jedyną drogą wykrycia jest **pomiar per język** — którego nikt nie robi, bo pilnowanie
domyślnie traktuje się jako własność klucza, nie jako własność pary (klucz, język).

## 140.2 Waga bierze się z przedmiotu

**To nie jest etykieta.** „Drzewo struktury" to **wiersz tabeli porównawczej** — czyli
**twierdzenie o tym, za co klientka płaci**. Wiersz mówi: tej funkcji nie ma w Starterze,
jest w Growth. **Zmiana jego brzmienia w polskim albo angielskim przechodzi dziś
przez wszystkie bramki.**

---

# 141. DOSTĘPNOŚĆ JEST WARSTWĄ TREŚCI, NIE WARSTWĄ TECHNICZNĄ

**Rozstrzygnięcie właściciela 2026-08-21.** Dwa niezależne wystąpienia w jednym dniu:

| # | co | stan |
|---|---|---|
| 1 | **`ObrazyFilarow.filar1-4`** — cztery opisy ekranów aplikacji ×3 języki | pilnowane **samoodniesieniem** (alt ↔ DOM), §137 |
| 2 | **`Cennik.tabela.wPlanie`** — `sr-only` podawane zamiast znaku ✓ | **niepilnowane w angielskim**, §135.3 |

> **Dwa niezależne wystąpienia w jednym dniu to nie przypadek.**

## 141.1 Wzorzec — trzecia postać klasy 14

Klasa 14 („domyślny adresat") miała dotąd dwie postacie:
- **domyślnym adresatem był właściciel** — dokument pisany do kogoś, kto zna kontekst;
- **domyślnym czytelnikiem był autor** — skrót zrozumiały dla piszącego (§112).

**Trzecia, dzisiejsza:**

> **DOMYŚLNYM ODBIORCĄ BYŁA OSOBA WIDZĄCA.**
> Warstwa, którą widzi wyłącznie czytnik ekranu, jest poza wszystkimi naszymi
> przeglądami — **bo nikt na nią nie patrzy. Dosłownie.**

**Mechanizm jest tu inny niż w dwóch poprzednich postaciach i dlatego groźniejszy:**
tam ktoś mógł przeczytać i nie zrozumieć. **Tutaj przegląd wzrokowy nie ma jak dotrzeć
do materiału** — `sr-only` nie renderuje się na ekranie, `alt` jest widoczny wyłącznie
w kodzie. **Adwersarz czytający stronę oczami nie zobaczy tych ciągów nigdy.**

## 141.2 Żądanie — jedno dla obu wystąpień

> **Teksty alternatywne i `sr-only` wchodzą pod ten sam reżim co treść:
> plik treści albo wiersz tabeli obietnic.**

**Nie wykonuję** — zmiana zakresu materiału. Pozycja otwarta, adresat: panel treści.

**Do kubła „nie sprawdzono":** nie policzono, ile jest w serwisie ciągów `sr-only`
i `aria-label` renderowanych z `messages`. **Dwa znalezione to dwa, na które ktoś
natrafił, nie dwa, które istnieją.**

---

# 142. `StronaLogowania.tresc` — **wada TERAŹNIEJSZA, nie przyszła**

Pozycja podniesiona przez właściciela z checklistowej na **premierową pierwszej wagi**.

## 142.1 Zapis, o który prosił

> **W dniu premiery fałszywe staje się nie jedno zdanie, tylko punkt docelowy
> większości ścieżek serwisu.**

## 142.2 Konsekwencja odwrotna — **której nikt nie postawił, łącznie ze mną**

> **Dopóki to zdanie stoi, WSZYSTKIE wezwania na stronie prowadzą do komunikatu
> „jeszcze nie". Serwis ma dziś osiem dróg i żadnej z nich nie da się przejść
> do końca. To nie jest wada przyszła — jest teraźniejsza.**

**Cały tor traktował `/login` jako pozycję premierową** (T7, „zdania z datą ważności"),
czyli **problem, który wybuchnie później**. **Postawienie odwrotne pokazuje, że problem
już jest** — i jest większy, bo dotyczy **nie zdania, tylko konstrukcji serwisu**.

**Liczby, które to potwierdzają, leżały w dokumencie od rana i nie zostały zestawione:**
- **sześć z ośmiu** kluczy łańcucha „Sprawdź, jak działa" celuje w `/login` (§110);
- **cztery linki `Cennik.cta` × 3 języki = 12** wezwań na `/cennik` (§52.8, para C-4);
- razem **21 martwych wezwań ×3 języki** (§3).

**Wszystkie trzy liczby stały obok siebie. Zestawienie ich w jedno zdanie zajęło
właścicielowi jedno zdanie i nie przyszło do głowy nikomu przez cały dzień.**

**Klasa: WNIOSEK LEŻĄCY W ZESTAWIENIU DANYCH, KTÓRYCH NIKT NIE ZESTAWIŁ.**
Trzeci raz dziś (§105 rodzina rezygnacji, §139.2 rozbieżność liczb łańcuchów, tu).

---

# 143. MECHANIZM ZADZIAŁAŁ — pomiar, nie pomyłka

**Odnotowanie właściciela, przyjęte:**

> Cztery poprzednie wady narzędzi złapałem sam. **Piąta wróciła jako zadanie
> i została obalona. Mechanizm zadziałał tak, jak ma działać, i to jest jego pomiar,
> nie moja pomyłka.**

**Zapis dla ścisłości, bo to jest ustalenie o panelu, nie pociecha:**

| co | ile razy dziś |
|---|---|
| wada mojego narzędzia złapana **przeze mnie** | **4** (§117.3) |
| wada złapana **przez sprzeczność z raportem agenta** | **2** (§117 autojunk, §139 łańcuchy) |
| wada złapana **przez zadanie właściciela** | **1** (§135 próg) |
| moje twierdzenie obalone **przez wykonawcę zlecenia** | **6** (§124.1) |
| twierdzenie właściciela obalone **przez pomiar** | **2** (P-7, P-8) |

**Piętnaście obaleń w jednym dniu, w każdą stronę.** Żadne nie przyszło z zewnątrz
panelu — **wszystkie z jego wnętrza, i żadne od tej samej strony, która twierdzenie
postawiła.**

---

# 144. WARSTWA WIDOCZNA WYŁĄCZNIE DLA CZYTNIKA EKRANU — **policzona**

Zadanie właściciela przed adwersarzami. Metoda: wszystkie użycia `srOnly`,
`aria-label`, `alt` w `src/**/*.tsx`, prześledzone do klucza `messages`.

> **22 klucze · ×3 języki = 66 ciągów · 11 kluczy niepilnowanych w co najmniej
> jednym języku.**

| pl en de | klucz | treść |
|---|---|---|
| `- - -` | **`ObrazyFilarow.filar1`** | „Ekran Dziennego Planu Działania (DMO)…" |
| `- - -` | **`ObrazyFilarow.filar2`** | „Ekran Tarczy…: **wklejony tekst z obietnicą zarobków**…" |
| `- - -` | **`ObrazyFilarow.filar3`** | „Ekran programu Pierwsze 90 Dni…" |
| `- - -` | **`ObrazyFilarow.filar4`** | „Ekran Twojego Wrapped…" |
| `- - -` | **`Cennik.tabela.pozaPlanem`** | **„poza planem"** |
| `- - -` | `Cennik.okresLegenda` | „Okres rozliczenia" |
| `- - -` | `Cennik.faqNaglowek` | „Pytania o płatność" |
| `- - -` | `Nawigacja.nawGlowna` | „Nawigacja główna" |
| `+ - +` | **`Cennik.tabela.wPlanie`** | **„w planie"** |
| `+ - +` | `Cennik.tabela.zakres` | „Zakres" |
| `+ - -` | `Cennik.potwierdzeniaAria` | „Potwierdzenia" |
| `+ + +` | `DbanieOSiebie.naglowek` · `CennikSkrot.naglowek` · `*.spisEtykieta` ×5 · `*.okruszkiAria` ×4 | 11 kluczy pilnowanych |

**Legenda:** `+` pilnowany strażnikiem znak-w-znak w tym języku · `-` niepilnowany.

## 144.1 Najcięższa pozycja listy

**`Cennik.tabela.pozaPlanem` / `Cennik.tabela.wPlanie`** — `TabelaPorownawcza.tsx:54-56`:
```jsx
<span aria-hidden="true">{wPlanie ? "✓" : "—"}</span>
<span className={styles.srOnly}>{wPlanie ? t("wPlanie") : t("pozaPlanem")}</span>
```

> **Niewidoma czytelniczka nie dostaje znaku ✓. Dostaje zdanie „w planie" albo
> „poza planem" — czyli JEDYNĄ informację o tym, za co płaci.**
> **„poza planem" jest niepilnowane we wszystkich trzech językach.
> „w planie" — niepilnowane w angielskim.**

To jest ta sama tabela, w której `Cennik.tabela.drzewo` ma strażnika wyłącznie
po niemiecku (§140). **Trzy klucze jednej tabeli, trzy różne stany pilnowania,
wszystkie niosące informację o zakresie płatnego planu.**

## 144.2 Dwa nagłówki sekcji są niewidoczne

`CennikSkrot.naglowek` „Cennik w skrócie" i `DbanieOSiebie.naglowek` „Dbanie o siebie"
renderują się jako `<h2 class="srOnly">`. **Sekcja S11 — ta z fałszywą bramką P0-4 —
ma nagłówek, którego widząca czytelniczka nie widzi.** Oba są pilnowane; odnotowuję,
bo panel oceniał je jako tekst widoczny.

## 144.3 Do wsadu adwersarzy — **z nakazem czytania z kodu, nie z ekranu**

> **Adwersarz czytający stronę oczami nie zobaczy tych 66 ciągów NIGDY.**
> `sr-only` nie renderuje się na ekranie, `alt` widać wyłącznie w kodzie.
> **Cała nasza metoda — panel, sędziowie, adwersarze — jest z konstrukcji ślepa
> na tę warstwę.**

Lista wchodzi do wsadu adwersarzy **jako osobna pozycja** z nakazem odczytu
z `messages` i `src/**/*.tsx`.

---

# 145. ZESTAWIENIE LICZB O TYM SAMYM PRZEDMIOCIE — **tabela, o którą prosił właściciel**

Bez szukania wniosków. Liczby wyjęte z różnych sekcji, postawione obok siebie.

| przedmiot | liczby w dorobku toru | stan |
|---|---|---|
| **łańcuchy verbatim** | §1 „16 w sześciu trasach" → §1 „20 ciągów współdzielonych" → §52.1 „+5 = 21" → §80 „**20**/20/19" → §139 „**23/23/22**" | **rozstrzygnięte 139** — trzy rodziny mieszane + próg |
| **klucze niepilnowane** | §103 „**79**" → §132 „**22**" → §135 „**32**" | **rozstrzygnięte 135** — 79 to pary |
| **wezwania prowadzące na `/login`** | §3 „**21** martwych ×3 języki" · §52.8 „**12 z 21** z `/cennik`" · §110 „**6 z 8** kluczy" · §125 „PL **9** nóg łańcucha" | **OTWARTE** — cztery liczby, cztery jednostki (wezwania · linki · klucze · nogi) |
| **deklaracje długości** | §9 „2 z 11" → §52.5 „30/30" → §53.2 „**10** z 305" → §79.2 „230 sprawdzonych" → §103 „782 M-2 · 79 M-4 · 116 M-3" | **OTWARTE** — „305" i „230" mierzą co innego (dopasowania vs miejsca deklaracji) |
| **rodzina Z-1** | §52.3 „cztery trasy" → §99 „**4** nogi" → §114 „**10 z 12** kandydatów" → W1-E „**5** ciągów w 6 kluczach" → S2 „**6** nóg" | **OTWARTE — trzy różne liczby żywe** |
| **`TO:144`** | §56 „dwa klucze" → N-R1-03 „**cztery** klucze **trzema** cięciami" → §129.1 „**sześć** kluczy **czterema** cięciami" | **rozstrzygnięte 129.1** |
| **granice modułów** | zlecenie „**6** potwierdzonych" · §116.5 „**21 z 31**" · W1-E „**12**, z tego **4** mocniejsze niż wiersz" | **OTWARTE** — trzy pomiary, trzy definicje „potwierdzonej" |
| **rodzina rezygnacji** | §105 „**13** kluczy · 39 ciągów" · W2-A „9 kluczy · **27** miejsc" · S1 „13" | **rozstrzygnięte** — 9 to podzbiór grupy A |
| **pozycje rejestru treściowego** | „24" → §46 „**23**" → §58 kandydaci → „21, gdyby oba wyszły" | **OTWARTE** — czeka na decyzję o poz. 12 i 13 |
| **pozycje techniczne** | §16 „T1–T10" → „T1–T18" → „**T1–T22**" | rozstrzygnięte |
| **strażniki znak-w-znak** | §52.4 „nie dla `naglowek.md`" → §53.1 **obalone** → §85 „**14/14** plików" | **rozstrzygnięte 53** |
| **bramki bez pokrycia w komunikacie** | §85 „**jedna** (`lint-tokeny`)" — z dziewięciu | rozstrzygnięte |
| **bramki „wiedzące o sobie więcej"** | §85 `lint-tokeny` → §102.1 `funkcje-indeks` → §106.3 dwa wskazania → **„piąta"** | **OTWARTE** — numeracja rosła bez rewizji, nie policzono od nowa |
| **rozstrzygnięcia w komentarzach kodu** | §123 „**91** trafień · **24** datowane · **3** sprawdzone" | **OTWARTE — 21 niesprawdzonych** |

## 145.1 Co widać z samego zestawienia — bez szukania

**Pięć przedmiotów ma dziś po dwie lub trzy żywe liczby.** Najostrzejszy: **rodzina Z-1**
— cztery różne wartości (4 · 5 · 6 · 10) w czterech dokumentach, **wszystkie dzisiejsze**,
i **rozstrzygnięcie §37.3 stoi na najstarszej z nich**.

**Drugi: wezwania na `/login`** — cztery liczby o czterech różnych jednostkach
(wezwania, linki renderowane, klucze, nogi łańcucha). **Właśnie z ich zestawienia
właściciel wyprowadził wniosek §142** — i to jest dowód, że tabela działa.

**Trzeci, cichy: „piąta bramka wiedząca o sobie więcej".** Numeracja rosła
przyrostowo (§85 → §102.1 → §106.3), **nikt nie policzył zbioru od nowa** —
czyli liczba jest sumą przyrostów, nie pomiarem.

## 145.2 Wartość tego ćwiczenia, zmierzona

**Trzy zestawienia zrobione wcześniej dziś dały trzy ustalenia** (§105, §139.2, §142).
**To zestawienie, zrobione mechanicznie i bez szukania, wskazuje pięć kolejnych
miejsc do domknięcia.** Koszt: jedna tabela.

---

# 146. `StronaLogowania.tresc` — **pierwsza pozycja listy premierowej**

Podniesiona przez właściciela z checklistowej na premierową pierwszej wagi.

> **Serwis ma dziś dwadzieścia jeden dróg i żadnej nie da się przejść do końca.**

| liczba | źródło | od kiedy w dokumencie |
|---|---|---|
| **21 martwych wezwań** ×3 języki | §3 | **od rana** |
| **6 z 8** kluczy łańcucha CTA celuje w `/login` | §110 | od południa |
| **12 z 21** wnosi `/cennik` (4 linki ×3 języki) | §52.8 | od południa |

> **Wszystkie trzy stały obok siebie. Zestawienie ich w jedno zdanie zajęło
> właścicielowi jedno zdanie i nie przyszło do głowy nikomu przez cały dzień.
> To jest miara, ile kosztuje brak zestawiania.**

**Dwie strony jednej pozycji:**
- **przyszła** — w dniu premiery zdanie staje się fałszem o własnym serwisie,
  a jest **punktem docelowym większości ścieżek**;
- **teraźniejsza** — **dziś każde wezwanie prowadzi do komunikatu „jeszcze nie".
  To nie jest wada, która wybuchnie. To wada, która działa.**

---

# 147. BILANS OBALEŃ — do dokumentu przekazania, z jego granicą

| skąd przyszło obalenie | ile |
|---|---|
| wada mojego narzędzia złapana **przeze mnie** | **4** |
| wada złapana **przez sprzeczność z raportem agenta** | **2** |
| wada złapana **przez zadanie właściciela** | **1** |
| moje twierdzenie obalone **przez wykonawcę zlecenia** | **6** |
| twierdzenie właściciela obalone **przez pomiar** | **2** |
| **razem** | **15** |

**Piętnaście obaleń w jednym dniu, w każdą stronę. Żadne nie przyszło od tej samej
strony, która twierdzenie postawiła.**

## 147.1 GRANICA TEGO POMIARU — zapisana przez właściciela

> **Żadne obalenie nie przyszło spoza panelu — czyli nie mamy dowodu, że panel wykrywa
> własne błędy SYSTEMOWE, tylko że wykrywa błędy swoich CZĘŚCI.**

**To jest właściwe postawienie sprawy i trzeba je czytać dosłownie.** Wszystkie
piętnaście obaleń dotyczy **twierdzeń pojedynczych**: liczby, cytatu, istnienia klucza,
zasięgu strażnika. **Ani jedno nie dotyczy KONSTRUKCJI panelu** — podziału na grupy,
doboru kryteriów sędziowskich, kształtu warunków odrzucenia, samego założenia,
że tabela obietnic jest wystarczającym źródłem prawdy.

**Trzy rzeczy, które mogłyby być błędami systemowymi i których nikt nie sprawdził:**
- czy **podział po materiale** nie ukrywa klasy defektów widocznej wyłącznie
  przy podziale po trasach (rodzina rezygnacji sugeruje, że tak — §130);
- czy **trzy kryteria sędziowskie** pokrywają przestrzeń ocen, czy zostawiają czwarte
  (dostępność okazała się poza wszystkimi trzema — §141);
- czy **tabela obietnic** jest kompletna jako źródło prawdy (§122: nie obejmuje zdań
  rozpoznania, samoopisu i nawigacji).

**Wszystkie trzy wyszły dziś jako produkt uboczny, żadna jako wynik szukania.**
**Panel nie ma dziś mechanizmu, który by ich szukał.**

---

# 148. RODZINA Z-1 POLICZONA OD NOWA — **jednostka zadeklarowana, jedna liczba, trzy unieważnione**

Rozstrzygnięcie właściciela: policzyć rodzinę **jednym przebiegiem, z zadeklarowaną
jednostką**, podać jedną liczbę i **unieważnić pozostałe trzy w dokumentach, w których
stoją**. Rozstrzygnięcie kierunkowe (wygrywa granica) obowiązuje **niezależnie od liczby**.

## 148.1 JEDNOSTKA — zadeklarowana przed pomiarem

> **Z-1 = klucz `messages` PL, w którym podmiotem zdania głównego jest NARZĘDZIE albo
> SYSTEM, PODCZAS GDY jego wiersz pokrycia `TO` stawia w podmiocie UŻYTKOWNICZKĘ
> (2. osoba).**

**Dwa wykluczenia wpisane w jednostkę, bo bez nich liczba mierzy co innego:**
- **granica (`*_nie`) NIE jest Z-1** — granica mówi, czego narzędzie nie robi, więc
  narzędzie w podmiocie jest tam **poprawne**;
- **zdanie zgodne z wierszem NIE jest Z-1** — jeśli wiersz sam stawia narzędzie
  w podmiocie (`TO:77` „Tarcza sprawdza", `TO:79` „**System** uczy się",
  `TO:145` „Twój Wrapped podsumowuje"), zdanie go powtarzające jest **wierne**.

## 148.2 Pomiar

Skan: nazwa narzędzia albo „Catherly"/„System" + czasownik sprawstwa w zdaniu głównym,
`pl.json`, wszystkie 330 kluczy. **Trafień: 33. Jedno fałszywe** (`mod5_poco` —
regex złapał „i dodajesz", podmiotem jest ONA). **Ciągów z narzędziem w podmiocie: 32.**

| kategoria | ile | przykłady |
|---|---|---|
| **granice** — narzędzie w podmiocie **poprawnie** | **8** | `FunkcjeWyniki.mod1_nie` „Pulpit nie pokazuje…" · `FunkcjeZespol.mod6_nie` · `FunkcjeTresci.mod4_nie` |
| **wiersz sam ma narzędzie w podmiocie** — zdanie wierne | **7** | Tarcza (`TO:77`) ×3 · „uczy się" (`TO:79`, podmiot **System**) ×3 · Wrapped (`TO:145`) ×1 |
| **Z-1 — PEWNE** | **15** | niżej |
| **Z-1 — SPORNE** | **2** | `Hero.naglowek` („Catherly prowadzi kontakty i wyniki" — H1 jest twierdzeniem ogólnym, nie o Pulpicie) · `Filary.filar2.konkret3` („Pieczęć Etyczna daje wynik" wobec `TO:78` „**Każdy projekt otrzymuje** wynik" — wiersz też nie stawia jej w podmiocie) |
| **razem** | **32** | |

## 148.3 Piętnaście kluczy Z-1 — komplet, z wierszem

| wiersz `TO` — podmiot | klucze |
|---|---|
| **`TO:42`** „**Planujesz** dzień w DPD" | `Filary.filar1.konkret1` |
| **`TO:37`** „**Planujesz** kontakty… i **dostajesz** przypomnienie" | `RytmDnia.krok1Tresc` · `DlaKogo.s1_robi_1` · `FunkcjePozyskiwanie.mod2_poco` |
| **`TO:110`** „**Wdrażasz** nową osobę przez kreator" | `Filary.filar3.konkret1` · `Filary.filar3.korzysc` · `FunkcjeIndeks.blok3Wprowadzenie` · `FunkcjeZespol.mod1_poco` · `FunkcjeZespol.zdanie` · `Obawy.o1` |
| **`TO:144`** „Na pulpicie **widzisz**" | `Filary.filar4.korzysc` · `FunkcjeIndeks.blok4Wprowadzenie` · `FunkcjeWyniki.zdanie` |
| **`TO:146`** „**Wyznaczasz** cele i **śledzisz** postęp" | `Filary.filar4.konkret2` |
| **`TO:72`/`TO:73`** „**Tworzysz** grafiki…" / „**Korzystasz** z szablonów" | `Filary.filar2.konkret1` |

> **PIĘTNAŚCIE. Nie cztery, nie pięć, nie sześć, nie dziesięć.**

## 148.4 Trzy liczby unieważnione

| gdzie stoi | liczba | status |
|---|---|---|
| §99 („§37.3 Para 2 ma cztery nogi") | **4** | **UNIEWAŻNIONA** — mierzyła wyłącznie rodzinę `TO:110` (jest ich **6**) |
| `W1E-N2` („5 ciągów w 6 kluczach") | **5** | **UNIEWAŻNIONA** — ta sama rodzina `TO:110`, jednostka „ciąg" zamiast „klucz" |
| S2 („komplet daje sześć nóg") | **6** | **POPRAWNA dla `TO:110`**, unieważniona jako liczba rodziny Z-1 |
| §114 („10 z 12 konkretów") | **10** | **UNIEWAŻNIONA jako liczba Z-1** — mierzyła **kandydatów** (narzędzie w podmiocie), nie defekty; sama §114.3 to zastrzegała |

**Wszystkie cztery były prawdziwe dla swojej jednostki i żadna nie była liczbą rodziny.**
Trzy mierzyły **jedną podrodzinę** (`TO:110`), jedna mierzyła **kandydatów w jednej
sekcji**. **Rodzina nigdy nie została policzona, bo nikt nie zadeklarował jednostki.**

## 148.6 DWA SPORNE — sprawa otwarta, przypięta do Z-A8

**Rodzina jest ZAWIESZONA, nie ZAMKNIĘTA** (decyzja właściciela 2026-08-21).
Piętnaście jest liczbą **pewnych**, nie liczbą rodziny. Dwa klucze czekają
na to samo rozstrzygnięcie, co cała rodzina, ale **z innego powodu**:
tamte piętnaście czeka na BRZMIENIE, te dwa czekają na **rozstrzygnięcie,
czy w ogóle są w rodzinie**.

| klucz | brzmienie | dlaczego sporne |
|---|---|---|
| `Hero.naglowek` | „Catherly prowadzi kontakty i wyniki" | narzędzie w podmiocie, ale **H1 jest twierdzeniem ogólnym o produkcie, nie zdaniem o Pulpicie**. Jeśli Z-A8 rozstrzygnie, że sprawstwo nazywa się na poziomie funkcji, H1 wypada z rodziny; jeśli na poziomie serwisu — wchodzi, i jest jej **najbardziej widocznym ciągiem** |
| `Filary.filar2.konkret3` | „Pieczęć Etyczna daje wynik" | wiersz `TO:78` brzmi „**Każdy projekt otrzymuje** wynik" — **wiersz też nie stawia użytkowniczki w podmiocie**. Jednostka Z-1 wymaga kontrastu z wierszem; tutaj kontrastu nie ma, jest **zgodność w trzeciej osobie**. Może należeć do kubła „wiersz sam ma narzędzie w podmiocie" (wtedy 8 zamiast 7) albo do klasy dotąd nienazwanej |

> **PRZYPOMNIENIE DO WYKONANIA PRZY Z-A8 — polecenie właściciela 2026-08-21:
> „przypomnij mi je przy rozstrzygnięciu Z-A8, żeby nie zawisły".**

Zapis jest w dwóch miejscach celowo: tutaj, bo tu leży pomiar, i przy §32
(Z-A8), bo **tam zapadnie decyzja, a przypomnienie leżące wyłącznie przy
pomiarze zadziała tylko wtedy, gdy ktoś wróci do pomiaru.** To ta sama
konstrukcja co reguła KANONU „bramka pilnuje, żeby rozstrzygnięcie nie
zniknęło, a nie żeby powstało".

**Zakres pomiaru po dopisaniu spornych:** rodzina Z-1 ma **15 kluczy pewnych,
maksymalnie 17** — i to są jedyne dwie liczby, jakie wolno cytować.

## 148.5 Skutek dla rozstrzygnięcia §37.3

Rozstrzygnięcie właściciela: **„przepisujemy jedno zdanie, nie trzy"** — zapadło,
gdy widoczne były **trzy** nogi rodziny `TO:110`. **Jest ich sześć, a cała rodzina Z-1
ma piętnaście kluczy.**

> **Kierunek stoi (wygrywa granica, sprawstwo wraca do niej). Zakres obejmuje wszystkie
> nogi, ile by ich nie było — rozstrzygnięcie właściciela z 2026-08-21.**

**Praktycznie:** naprawa Z-1 dotyka **15 kluczy ×3 języki = 45 ciągów**, na **sześciu
z ośmiu tras**, i jest **wstrzymana do rozstrzygnięcia Z-A8** (§32).

> **NIEAKTUALNE OD 2026-08-21 — patrz §162.1.** Z-A8 rozstrzygnięte; kryterium
> właściciela („narzędzie obiecuje sprawstwo, którego produkt nie ma") zastosowane
> do piętnastu kluczy rozbiło je na trzy klasy. **Rodzina Z-1 = 7 kluczy · 21 ciągów.**
> Liczba **15** była poprawna dla jednostki „narzędzie w podmiocie" i **za szeroka dla
> rodziny** — szósta unieważniona liczba tej rodziny i pierwsza unieważniona
> rozstrzygnięciem, nie pomiarem.

---

# 149. „PIĄTA BRAMKA" — zbiór policzony od nowa: **trzy bramki, pięć defektów**

Liczba rosła przyrostowo przez §85 → §102.1 → §106.3 → §116. **Nikt nie policzył zbioru.**

| bramka | defekt(y) jej własnego opisu |
|---|---|
| **`scripts/lint-tokeny.mjs`** | **(1)** komunikat zieleni „Linter tokenów: zielony." — **zero pokrycia**, nie ujawnia stanu wyjątku wygasającego 2026-08-31 (T15) · **(2)** komentarz `globals.css:417-419` mówi „wyłącznie barwy", osłona jest **liniowa** i obejmuje też wymiary (T20) |
| **`e2e/funkcje-indeks.spec.ts`** | **(3)** `:17`, `:119`, `:280` deklarują **„20 kluczy"**, jest **21**; asercja porównuje listę z samą sobą, więc liczba przechodzi |
| **`e2e/funkcje-podstrony.spec.ts`** | **(4)** `:508` wskazuje „tresci w. 133", uzasadnienie stoi w **153** (−20) · **(5)** `:110-112` wyłącza „zdjęć" z listy milczenia, powołując się na granicę, **która zawęża prawdę** (§116) |

> **TRZY bramki. PIĘĆ defektów. Moja liczba rosła po defektach, a nazywała bramki.**

**Poza zbiorem, bo to nie bramka:** `src/app/[locale]/funkcje/tresci/page.tsx:107` —
to samo błędne wskazanie co (4), ale w komponencie. **Wskazanie jest jedno, w dwóch
plikach; liczyłem je jako dwa.**

**Reguła do KANONU:** numeracja rosnąca przyrostowo przestaje być pomiarem po drugim
przyroście — **policz zbiór od nowa i podaj jednostkę.**

---

# 150. WADA PERCEPCJI PANELU, NIE MATERIAŁU — **wszyscy czytali `messages`, a myśleli o ekranie**

**Sekcja przebudowana 2026-08-21 na polecenie właściciela: „wynieś to na czoło,
ponad samą pozycję".** Znalezisko `CennikSkrot.naglowek` stało jako podsekcja
pozycji cennikowej; **jest od niej nadrzędne**, bo nie mówi o serwisie, tylko
o przyrządzie, którym ten serwis oceniamy. Pozycja `wPlanie`/`pozaPlanem`
zjeżdża do **§150.4** i zachowuje brzmienie właściciela co do znaku.
*(Zapisuję przeniesienie zamiast je milcząco wykonać — numer §150.1 był
cytowany w meldunku z 2026-08-21.)*

> **Osiemnastu autorów, trzech sędziów i prowadzący przeszli obok, bo wszyscy
> czytali `messages`, a myśleli o ekranie.**

To jest zdanie o **panelu**, nie o serwisie. Wsad był poprawny — `messages`
niosło ten klucz, każdy z 22 autorów i sędziów miał go przed oczami. Zawiodło
**przełożenie wsadu na wyobrażenie**: ciąg w pliku tłumaczeń domyślnie
wyobrażamy sobie jako tekst na ekranie, bo w 300 z 330 przypadków tak jest.
Klasa `srOnly` nie stoi w `messages` — stoi w `.tsx`. **Nikt nie sprawdzał
`.tsx`, bo wsad wyglądał na kompletny.**

## 150.1 Dowód — `CennikSkrot.naglowek`

`CennikSkrot.tsx:36` renderuje `<h2 className={styles.srOnly}>{t("naglowek")}</h2>` —
**„Cennik w skrócie" jest niewidoczne wzrokowo.**

> **Sekcja S11 — ta z fałszywą bramką P0-4, przedmiot rozstrzygnięcia §56 i pracy
> trzech autorów grupy C — ma nagłówek, którego widząca czytelniczka nie widzi.
> Panel oceniał go jako tekst widoczny przez cały dzień.**

**To nie jest defekt serwisu — to defekt naszego przeglądu**, popełniony w rundzie,
która ten sam mechanizm wykryła gdzie indziej. §141 („domyślnym odbiorcą była
osoba widząca") **dotyczy panelu, nie tylko autorów serwisu**.

## 150.2 Odpowiedź na pytanie właściciela: czy panel wykrywa własne błędy systemowe

Pytanie postawione dwie wymiany wcześniej. **Odpowiedź, w brzmieniu właściciela:**

> **Wykrył jeden, i to przypadkiem.**

Rozwinięcie, bo „przypadkiem" jest tu twierdzeniem o mechanizmie, nie oceną.
Wykrycie nie przyszło z żadnego kryterium sędziowskiego ani z żadnej bramki —
przyszło z **pomiaru zleconego w innym celu**: zliczenia warstwy czytnika ekranu
(22 klucze, 66 ciągów), zamówionego jako wsad dla adwersarzy. Gdyby właściciel
tego pomiaru nie zlecił, `CennikSkrot.naglowek` **nie miał żadnej drogi, żeby
się ujawnić** — nie jest niepokryty, nie jest sprzeczny z tabelą, nie łamie
frazy milczenia, przechodzi każdą bramkę. Był niewidoczny **dokładnie dla tego
zmysłu, którym panel patrzy**.

**Wniosek operacyjny:** panel nie ma przyrządu na własne błędy systemowe.
Ma go na błędy materiału. Jedyne, co dotąd wykryło błąd panelu, to **pomiar
o zadeklarowanej jednostce zlecony bez hipotezy** — ta sama figura, co
w regule KANONU o wniosku leżącym w zestawieniu, którego nikt nie zestawił.

## 150.3 Mandat adwersarzy — **zatwierdzony**

> **66 ciągów warstwy czytnika ekranu wchodzi jako osobna pozycja wsadu,
> z mandatem odczytu Z KODU (`messages` + `src/**/*.tsx`), NIE Z EKRANU.**
> Zatwierdzone przez właściciela 2026-08-21.

Uzasadnienie jest jednozdaniowe i wynika z §150.1: **adwersarz czytający stronę
oczami nie zobaczy tych 66 ciągów nigdy.**

## 150.4 `Cennik.tabela.wPlanie` / `pozaPlanem` — pozycja, w brzmieniu właściciela

> **Niewidoma czytelniczka dostaje ZDANIE zamiast znaku ✓ — jedyną informację o tym,
> za co płaci. „Poza planem" jest niepilnowane we wszystkich trzech językach.
> Trzy klucze jednej tabeli, trzy różne stany pilnowania, wszystkie niosące zakres
> płatnego planu.**

```
TabelaPorownawcza.tsx:54-56   [STAN kodu]
  <span aria-hidden="true">{wPlanie ? "✓" : "—"}</span>
  <span className={styles.srOnly}>{wPlanie ? t("wPlanie") : t("pozaPlanem")}</span>
```

| klucz | pilnowany | co niesie |
|---|---|---|
| `Cennik.tabela.pozaPlanem` | **w żadnym języku** | „poza planem" — **brak funkcji w planie klientki** |
| `Cennik.tabela.wPlanie` | **w żadnym języku** | „w planie" |
| `Cennik.tabela.drzewo` | **w żadnym języku** | nazwa funkcji bramkowanej Growth (`TO:122`) |
| `Cennik.tabela.zakres` | **w żadnym języku** | nagłówek kolumny zakresu |

> **SPROSTOWANIE 2026-08-21 (§166.3) — moja tabela mówiła o TRZECH RÓŻNYCH STANACH
> PILNOWANIA. Stan jest JEDEN: żaden z czterech kluczy nie jest pilnowany w żadnym
> języku.** Zgłoszone przez adwersarza A-3, sprawdzone przeze mnie:
> ```
> grep -rn "Cennik.tabela.{wPlanie,pozaPlanem,zakres,drzewo}" e2e/ scripts/  → zero trafień
> grep -ril "poza planem|in the plan|im Plan|nicht im Plan"   e2e/ scripts/  → BRAK
> grep -ril "w planie"                                        e2e/ scripts/  → e2e/dla-kogo.spec.ts
> ```
> Jedyne trafienie („w planie" w `dla-kogo.spec.ts`) dotyczy **innej trasy i innego zdania** —
> to jest **strażnik pozorny (§155), czwarte i piąte wystąpienie**, tym razem **w moim
> własnym zestawieniu postawionym na czele meldunku.**
> **Pozycja przez to nie słabnie — twardnieje.** Nie ma tu asymetrii do wyjaśnienia;
> jest **równy, zupełny brak pokrycia na czterech kluczach niosących zakres płatnego planu.**

---

# 151. K-3 — ILE WSADU LEŻY POZA TABELĄ OBIETNIC · **sam pomiar, bez propozycji**

Trzecie z trzech pytań o konstrukcję panelu. Polecenie właściciela w brzmieniu
dosłownym: **„Nie proponuj rozszerzenia tabeli. Sam pomiar."** Agent K-3 pracował
z tym zakazem wpisanym w zlecenie; raport pełny:
`scratchpad/tor9/K3-POZA-TABELA.md`.

**Dwie jednostki, zadeklarowane przed pomiarem i NIESUMOWALNE:**
warstwa 1 liczy **KLUCZE** `pl.json` (330) · warstwa 2 liczy **POZYCJE** wsadu (210).

## 151.1 Wynik — widełki, nie jedna liczba

| warstwa | poza tabelą | udział |
|---|---|---|
| `messages` (330 kluczy) | **101 – 154** | **30,6 % – 46,7 %** |
| wsad panelu (210 pozycji) | **32 – 52** | **15,2 % – 24,8 %** |

> **Nie większość — ale nie margines.**

Widełki są **wynikiem**, nie niepewnością pomiaru: dolna granica to klucze poza
tabelą pod KAŻDYM odczytem, górna dolicza 50 kluczy spornych **co do samej granicy
tabeli**, każdy z obiema możliwościami wypisanymi osobno.

**Największa pojedyncza niewiadoma — 31 kluczy `*.modN_nazwa`** (nazwy modułów na
czterech podstronach funkcji). Rozstrzygnięcie przesuwa wynik o **9,4 pkt proc.**
Możliwość A: nazwanie funkcji **twierdzi, że funkcja istnieje**, i tabela ma dla
nich wiersze (`TO:36`). Możliwość B: to etykieta bloku, nie zdanie.
**K-3 nie rozstrzygnął — zgodnie z zakazem. Rozstrzygnięcie należy do właściciela.**

## 151.2 Znalezisko własne — **§122 wymienia CZTERY rodzaje, a w warstwie jest PIĄTY**

Trzy klucze są **twierdzeniami**, ale nie o produkcie — o **serwisie i o handlu**.
Nie obejmuje ich ani tabela, ani zwolnienie z §122.3.

```
grep -ic "logowan\|premier" content/tabela-obietnic.md → 0     [R-H: komenda i wynik]
grep -ic "walut\|euro\|złot"  content/tabela-obietnic.md → 0
```

| klucz | `[STAN]` |
|---|---|
| `StronaLogowania.tresc` | „Logowanie będzie dostępne przy premierze aplikacji." — twierdzenie o **terminie premiery** |
| `Cennik.faq.o1` | „Ceny na tej stronie są w złotych. Każdy plan ma też cenę w euro…" — twierdzenie o **walucie i o tej stronie** |
| `Stopka.wkrotce` | „(wkrótce)" doklejane w `Stopka.tsx:130` i `:138` — twierdzenie o **dokumentach serwisu** |

**Te trzy zdania nie mają miernika.** Nie są pod tabelą i nie są zwolnione — leżą
w luce między jednym a drugim. Kubeł R-D, zgłoszone, nierozstrzygnięte.
*(`StronaLogowania.tresc` stoi już jako pierwsza pozycja listy premierowej — §146.
Teraz wiadomo, że stoi tam BEZ MIERNIKA, nie tylko bez wiersza.)*

## 151.3 Znalezisko własne — **12 pozycji MIESZANYCH: jeden werdykt na dwóch kryteriach prawdy**

5,7 % wsadu. Głównie pary `Obawy.pN + Obawy.oN`: **pytanie jest rozpoznaniem,
odpowiedź jest twierdzeniem o produkcie.** Autor złożył je w jedną pozycję,
bo tak stoją na stronie — więc sędzia wydaje **jeden werdykt na dwóch różnych
kryteriach prawdy naraz**.

> **Ta klasa jest niewidoczna w obu liczbach osobno** — nie liczy się ani do
> „poza tabelą", ani do „o produkcie", i dlatego nie pojawiła się przez trzy rundy.

Rodzina: to jest wariant „wniosku leżącego w zestawieniu, którego nikt nie
zestawił" (KANON) **przeniesiony z dokumentu na pozycję wsadu** — dane leżą
w jednej pozycji, a kryteria są dwa.

## 151.4 Kontrola krzyżowa — dwa niezależne pomiary, ta sama granica

`W3-F-INDEKS-DLAKOGO.md` §7.2 zmierzył to samo na swojej grupie, cytat (R-F):

> „**mają wiersz `TO`: 12** … **NIE mają i nie mogą mieć: 14** … Czternaście
> z dwudziestu sześciu to zdania, które nie twierdzą nic o produkcie."

**Listy zgadzają się co do jednego klucza.** Jego 53,8 % jest wyższe od widełek
K-3, bo liczył na `/dla-kogo` — trasie najgęściej rozpoznaniowej. **Rozbieżność
liczb tłumaczy się różnym mianownikiem, nie różnym kryterium** — i to jest
pierwsza w tej sesji rozbieżność, która przy sprawdzeniu narzędzia okazała się
zgodnością.

## 151.5 Granica tego pomiaru — postawiona przez samego K-3

> **Nie mierzyłem, ile z 176 twierdzeń o produkcie faktycznie MA wiersz** — to praca
> S1. Mierzyłem, **czy tabela jest właściwym miernikiem**, nie czy wynik wypada zielono.

Nie sprawdzone (R-D): `en.json` i `de.json` (założenie, że rodzaj zdania jest
niezależny od języka — **niezmierzone**) · `content/*/*.md` · rozstrzygnięcie
`modN_nazwa` · **renderowania** (`Cennik.cta` renderuje się 4× z jednego klucza;
mianownikiem jest klucz i pozycja) · cięcie „pozycji" w plikach o niejednolitej
numeracji — **inne cięcie dałoby inne 210, metoda podana po to, żeby dało się obalić.**

---

# 152. K-1 — DRUGI PODZIAŁ: ŚCIEŻKA KLIKANIA · **werdykt: TAK, sześć znalezisk**

Pierwsze z trzech pytań o konstrukcję panelu. Raport pełny (453 wiersze):
`scratchpad/tor9/K1-SCIEZKA-KLIKANIA.md`.

Zlecenie: wziąć trzy rodziny i przejść je **ścieżką klikania klientki**, nie
materiałem. Agent zamienił jedną z sugerowanych rodzin i **podał powód**:
zamiast „co widzi zespół" wziął **rezygnację**, bo §130 uczynił ją *dowodem*
wady pierwszego podziału — *„jeśli drugi podział ma cokolwiek warty, musi coś
dodać właśnie tutaj — inaczej jest wariantem tego samego."* Rodzinę „co widzi
zespół" przeszedł kontrolnie, z **wynikiem negatywnym** (§152.4).

Ścieżka odczytana **z kodu, nie założona**: osiem tras, kolejność DOM, cztery
realne przebiegi Ś-1…Ś-4.

## 152.1 Sześć znalezisk

| # | znalezisko | klasa |
|---|---|---|
| **I-A** | naprawa **C-3** („do przepisania `faq.o4`, karta Pro bez ruchu") dotyka ciągu leżącego **pod trzema z czterech wezwań `/cennik`**. Na Ś-2 i Ś-4 czytelniczka klika „Wybierz plan", przeczytawszy **zero** zdań serwisu o eksporcie i imporcie | **werdykt materiałowo poprawny, operacyjnie pusty** |
| **I-B** | „eksport" ma **trzy desygnaty**; `mod4`/`mod5` sąsiadują, a sześć modułów niżej `f8_1` kwantyfikuje **po pozycji** („wszystko **powyżej** od Startera"), gdy `pozycja4` bramkuje trzeci desygnat do Pro. Że eksport poza Pro **niesie sygnaturę** — presuponowane 2×, **nigdzie nie stwierdzone** | nowy defekt |
| **I-C** | „importu hurtowego nie ma" ma 2 wystąpienia (`Obawy.o2`, `mod4_nie`); **na `/cennik` nie pada ani razu** | nowy defekt |
| **II-A** | komplet bramki Growth wypowiada **wyłącznie `/funkcje/zespol`** (0/0/0/**2**/1/1-fałsz/2); z trasy zakupowej **komplet jest nieosiągalny** | nowy defekt |
| **II-B** | sześć nazw funkcji płatnych (Puls zespołu, Drzewo struktury, Ranking, Klucze API, webhooki, sygnatura) pada **tylko na `/cennik`**, wbrew `FunkcjeIndeks.zdanie` „nazwy funkcji znajdziesz **po drodze**". Kontrola pozytywna: nazwy Startera **są** po drodze | nowy defekt |
| **III-A** | zdanie o braku zobowiązania stoi **POD** wezwaniem na **siedmiu trasach z ośmiu**; `/cennik` jako **jedyna** stawia je NAD — i jest jedyną, na której zapada decyzja | nowy defekt **+ korekta bilansu §105.4** |

## 152.2 III-A — pomiar w kodzie i korekta bilansu §105.4

```
$ grep -rn "zdaniePo\|zdaniePrzed" src/app/[locale]     [R-H: komenda i pełny wynik]
/page.tsx:150  · /dla-kogo:167 · /funkcje:195 · /funkcje/pozyskiwanie:144
/funkcje/tresci:146 · /funkcje/zespol:103 · /funkcje/wyniki:103   → zdaniePo   (7×)
/cennik/page.tsx:78                                               → zdaniePrzed (1×)
```

`Zamkniecie.tsx:29-38` `[STAN]` renderuje: `zdaniePrzed?` → `<a class=cta>` → `zdaniePo?`.

> **Rodzina, która „przeżywa każdą kombinację osiemnastu propozycji" (§130), w większości
> swoich przeżywających wystąpień jest niedostępna dla czytelniczki, która KLIKA.**

To **odwraca dwie strony bilansu §105.4**:

1. **Droga B („wyciąć z 39 miejsc") kosztuje MNIEJ, niż panel przyjął.** Zarzut brzmiał:
   „zabiera czytelniczce informację prawdziwą — wprost pod R-A". Na Ś-1, Ś-2 i Ś-4
   **ta informacja i tak do niej nie dociera — zabranie zabiera zero.**
2. **Drogi A i C („dopisać wiersz" / „zawęzić brzmienie") KUPUJĄ MNIEJ.** Poprawione brzmienie
   ląduje w tych samych 39 gniazdach, z których 7 z 8 leży pod przyciskiem.
   **To jest R-A w postaci pozycyjnej: zmienione brzmienie ma ten sam skutek u odbiorcy —
   zerowy — bo odbiorczyni już wyszła.**

**CZWARTA DROGA, dotąd niewyrażalna**, bo panel nie miał jednostki, w której dałoby się ją
wypowiedzieć: zostawić brzmienie, **przenieść jedno wystąpienie nad wezwanie** na trasach,
na których wezwanie prowadzi do decyzji — dokładnie jak `/cennik` już robi.
**To jest zmiana POZYCJI, nie ZNACZENIA — więc jako jedyna z czterech nie wymaga
rozstrzygnięcia właściciela wg §37.** K-1 zgłasza ją **do rozważenia, nie jako rekomendację.**

**Czwarte wystąpienie §121** (decyzja w miejscu nieczytanym): `cennik/page.tsx:75-77` „zdanie §7
**NAD CTA**" i `page.tsx:143-144` „bez zdania prowadzącego — **werdykt panelu pkt 25**" —
**dwa świadome werdykty przeciwstawne, żaden nie wiedział o drugim.**

## 152.3 Wada metody — **trzeci człon do §130**

> **POZYCJA WOBEC WYJŚCIA ≠ PRZYNALEŻNOŚĆ DO MATERIAŁU.**
> Łańcuch dzieli **wartość**. Rodzina dzieli **twierdzenie**. Ścieżka dzieli **DOSTĘPNOŚĆ**.

**To jest cięższy zarzut niż §130.** §130 mówi: podział **rozciął** rodzinę, więc nikt jej nie
objął. Ścieżka mówi: podział **sklejał też rzeczy rozłączne dla odbiorczyni** i dawał autorowi
**fałszywe poczucie kompletu**. Grupa D „widziała całe `/cennik`" — i **właśnie dlatego** mogła
orzec C-3, nie zauważywszy, że wybrała do naprawy ten człon pary, który leży pod wyjściem.

> **Ten błąd był dostępny wyłącznie autorowi, który widział ZA DUŻO materiału naraz.**

## 152.4 Wynik negatywny — zapisany, bo wiąże tak samo jak pozytywny

Rodzina „co widzi zespół": **ani jednego nowego członka.** §129.1, §27, §52.7, §56 i §98.1
pokrywają skład kompletnie; §98.1 zauważył nawet relację „nad/pod", choć wewnątrz jednej trasy.

> **Drugi podział NIE jest uniwersalnie mocniejszy.** Tam, gdzie rodzina leży w **jednym polu
> widzenia**, podział materiałowy widzi ją równie dobrze — a §98.1 dowodzi, że widział.
> **Ścieżka dokłada wartość tam i tylko tam, gdzie rodzinę PRZECINA WYJŚCIE.**

## 152.5 Propozycja warunku — z weryfikacją wsteczną i jej granicą

K-1 nie implementował (repozytorium tylko do odczytu). Propozycja: **kolumna
NAD / POD / NIEOSIĄGALNE NA TRASIE T** przy karcie łańcucha (§89) i przy każdej propozycji —
wyprowadzalna **z kodu bez sądu o treści** (kolejność JSX + `adresWJezyku`).

**Weryfikacja wsteczna wykonana** *(ta sama, której zabrakło mi przy bramce deklaracji)*:
warunek zapaliłby się na **I-A**, **III-A** i `Obawy.o2`/`o3` — **trzy z sześciu znalezisk
tego raportu wypadają z niego same**. **Nie** zapaliłby się na I-B, II-A, II-B: te wymagają
czytania **między trasami**, nie w obrębie jednej.
**Granica zapisana przez samego autora, żeby warunku nie uznać za pokrywający ścieżkę w całości.**

**Kubeł R-D:** 6 pozycji; najcięższa — **kolejność CSS/mobile kart planów** i **wejścia przez
kotwice** (stopka daje wejście w każdą z ośmiu tras z pozycji 0).

---

# 153. K-2 — POCHODZENIE KRYTERIÓW SĘDZIOWSKICH · **odpowiedź (B), a przyczyna ostrzejsza niż (B)**

Drugie z trzech pytań o konstrukcję. Do zlecenia dopisane w trakcie **pytanie właściciela**:
skąd wzięły się te trzy kryteria — z **podziału przestrzeni ocen** (A), czy z **listy rzeczy,
o których wtedy pomyślano** (B). Raport: `scratchpad/tor9/K2-DZIURY-KRYTERIOW.md` (574 wiersze).

## 153.1 Odpowiedź na pytanie o pochodzenie — pomiar, nie rekonstrukcja

```
grep -c "kryteri" BRIEF-SEDZIOWIE.md      → 0      [R-H: komenda i wynik]
grep -n  "S1\|S2\|S3" BRIEF-SEDZIOWIE.md  → 0
```

**Dokument wiążący sędziów nie mówi, czym się różnią.** Jedyne ustanowienie w kanonie to
**jedna komórka tabeli harmonogramu**, `00-USTALENIA-TOR9.md:4591`: „**3 sędziów** o rozłącznych
kryteriach". Dla kontrastu podział **autorów** (§104.3) ma nagłówek, tabelę i akapit uzasadnienia.

> **Konstruujący podział pisze, po co go konstruuje. Przy sędziach nikt nie napisał —
> bo nie było czego konstruować.**

**Skąd więc pochodzą.** `SEDZIOWIE.md` z **2026-08-20**, pierwsza linia: „WERDYKTY TRZECH
SĘDZIÓW — **trasa `/`**", tabela `S1 prawda i pokrycie · S2 rzemiosło · S3 klientka`,
ostatnia kolumna: **„zwycięzca"**. To jest **rubryka porównawcza rundy pierwszej — do wyboru
jednego z trzech wariantów jednej trasy** — przeniesiona **nazwami** do rundy drugiej.

## 153.2 Stan (C) DZIEDZICZENIE — **piąty tryb awarii audytu „zwyczaj czy decyzja"**

Zlecenie przewidywało czwarty stan („przyczyna ustalona po fakcie"). **Ten przypadek jest
inny i pomylenie go z czwartym prowadzi do złej naprawy:**

> ## **DECYZJA PRAWDZIWA, PODJĘTA DLA INNEGO ZADANIA, PRZENIESIONA BEZ PONOWIENIA.**
> Uzasadnienie **istnieje**, jest **zapisane** i było **słuszne** — dla wyboru spośród trzech
> wariantów jednej trasy. Nie zostało wypowiedziane przy przeniesieniu, **bo przy przeniesieniu
> nie wyglądało na decyzję — wyglądało na skład panelu.**

To jest **co do słowa klasa z §135.6** („próg odziedziczony z jednego pomiaru jest przesłanką
milczącą w drugim") — **siódme jej wystąpienie w tym torze**, i różni się od sześciu poprzednich
jednym: **odziedziczonym parametrem nie jest próg ani wzorzec — jest nim JEDNOSTKA OCENY
CAŁEGO PANELU.**

| # | odziedziczony parametr | z jakiego pomiaru | gdzie zawiódł |
|---|---|---|---|
| 1 | próg 12 znaków | bramka deklaracji | §135 |
| 2 | ten sam próg | mapa §1 | §139.1 |
| 3 | `autojunk` biblioteki | pomiar podciągu | §117.2 |
| 4 | min. długość cytatu 12 / prefiks 38 | audyt cytowań | **`[N]` — do dziś niesprawdzone**, §139.3 |
| 5 | wzorzec `w\. ?N` | skan wskazań wiersza | §106 |
| 6 | filtr trzech atrybutów (`srOnly`·`aria-label`·`alt`) | inwentarz §144 | §153.4 — pomija `<title>` |
| **7** | **cały zbiór kryteriów sędziowskich** | **rubryka porównawcza rundy pierwszej** | **cały panel rundy drugiej** |

## 153.3 Mechanizm — i on **przewiduje** braki, zamiast je wyliczać po fakcie

> **Rubryka porównawcza z konstrukcji widzi tylko RÓŻNICE. Przy pytaniu „który z trzech"
> to jest jej zaleta. Przy pytaniu „co jest nie tak" — jej wada, i jest to ta sama własność,
> nieprzeniesiona świadomie.**

Trzy warianty rundy pierwszej były przepisaniami tego samego; **wszystko, co miały wspólne,
było dla rubryki niewidzialne i nic nie kosztowało.**

To **poprawia §141.1**, które mówi „domyślnym odbiorcą była osoba widząca, bo nikt na nią
nie patrzy". Prawdziwe, ale niepełne. Pełny powód jest tańszy i ostrzejszy:

> **`Cennik.tabela.pozaPlanem` brzmiało identycznie we wszystkich trzech wariantach.
> Żadne kryterium nie miało powodu go zobaczyć, bo nie odróżniało W1 od W2 od W3.
> NIE WYPADŁO z przestrzeni ocen — NIGDY DO NIEJ NIE WESZŁO.**

**Kanon miał obie połowy i nikt ich nie zestawił:** §114.4 mówi, co rozłączność **kupuje**
(siła potwierdzenia), §125.1 mówi, co przez nią **przepada** („S1 i S3 nie mieli powodu tego
mierzyć"). Sformułowanie „przestrzeń ocen" pada w kanonie **raz** — w §147.1, **jako pytanie
na liście niesprawdzonych**.

## 153.4 Odpowiedź na pytanie o czwartego sędziego — **wprost, tym słowem, którego żądało zlecenie**

> ## **Nie znalazłem drugiej dziury w konstrukcji, bo NIE ZNALAZŁEM KONSTRUKCJI.**
> ## **Dodanie czwartego sędziego jest ŁATANIEM, nie naprawą** — i nie ma powodu sądzić,
> ## że po czwartym nie znajdzie się piąty, bo mechanizm produkujący braki **działa dalej**.

**Dowód, że łatanie zawiodłoby JUŻ PRZY PIERWSZEJ ŁACIE** — zweryfikowany przeze mnie
niezależnie, z kodu (mocniej niż z artefaktu):

```
src/app/[locale]/layout.tsx:14        title: "Catherly"          [STAN — jedyna definicja]
grep -rln "export const metadata\|generateMetadata" src/app  → wyłącznie layout.tsx
grep -rho "<title>[^<]*</title>" .next/server/app | sort | uniq -c
     30 <title>Catherly</title>
      1 <title>404: This page could not be found.</title>
```

W `messages`: **0 · 0 · 0**. W `content`: **0**. W tabeli obietnic: **0**. W `e2e`: **0**.
Inwentarz §144 ma filtr `srOnly`·`aria-label`·`alt` — **`<title>` nie jest żadnym z trzech,
więc NIE WEJDZIE do wsadu czwartego sędziego.** `axe.spec.ts` skanuje 33 trasy i świeci
na zielono, bo reguła `document-title` bada **niepustość**.

> **Zielona bramka dostępności na tytule identycznym na trzydziestu stronach.**

## 153.5 Sześć rzeczy, których ZBIÓR nie obejmuje — **wymienione, nie policzone jako dziury**

Zgodnie z rozstrzygnięciem właściciela: skoro odpowiedź to (B)/(C), **to nie jest liczenie
dziur w konstrukcji, tylko wymienienie, czego zbiór nie obejmuje.**

| # | czego nie obejmuje | najcięższy dowód |
|---|---|---|
| 1 | **metadane** | `<title>Catherly>` na 30 z 31 artefaktów (§153.4) |
| 2 | **prawo** | 12 nazw dokumentów prawnych, **0 strażników**; jeden **pozorny** (§155) |
| 3 | **pieniądze** | `cennik-snapshot.json` **bez daty**; bramka porównuje **ze Stripe'em TESTOWYM** (`scripts/stripe-snapshot.mjs:4-5`, klucz spoza `sk_test_` → `exit(1)`). R-E zabrania sędziemu zacytować cenę jako stanu — **reguła, która miała zapewnić cytowanie prawdy, zabrania zacytowania jedynej liczby, dla której czytelniczka tu jest** |
| 4 | **czas** | `facts.json` ma `data_pomiaru` (8× `2026-08-09`), ceny nie mają żadnej. **„Kiedy to przestanie być prawdą" nie pyta nikt, a §142 pokazał, że odpowiedź bywa „już"** |
| 5 | **ścieżka** | §60.2 nazwał lukę rano 2026-08-21; **panel dobrał tego samego dnia trzech sędziów i żadnemu jej nie dał** — bo jednostką werdyktu jest „pozycja", a zachowanie pozycją nie jest. Zbieżne z K-1 (§152) |
| 6 | **stany błędu** | 404 renderuje **pełną stopkę i nawigację** — cztery nazwy prawne stoją także tam. **„120 wystąpień" z §6.2 liczy osiem tras; artefaktów jest trzydzieści** |

**Wynik negatywny, zapisany jako wynik:** stan pusty w ścisłym sensie **nie istnieje** —
jedyne `<input>` w serwisie to dwa radia przełącznika okresu. **Kubeł „formularz bez wyniku"
jest PUSTY.**

**R-D K-2, bez łagodzenia:** nie widział zleceń trzech sędziów (tylko streszczenia) i przeczytał
~1 400 z 6 628 wierszy kanonu; twierdzenia o nieistnieniu oparł na komendach po całym pliku,
nie na lekturze.

---

# 154. SYNTEZA RUNDY DRUGIEJ — **42 pozycje, 12 pytań, jedna rodzina jawnie nienaprawiona**

> **SPROSTOWANIE LICZBY 2026-08-21 (§164.1): było 34, jest 42.** Liczba 34 stała w komórce
> bilansu syntezy **obok własnego rozbioru, który sumuje się do 42**, a ja przeniosłem ją
> verbatim, nie sumując tego, co stało w tym samym wierszu. Przeliczone niezależnie
> (`awk` po nagłówkach pozycji w §2) → **42**. Sprostowanie objęło ten plik i brief adwersarzy.

Osiemnaście propozycji + trzy werdykty → jeden materiał.
Plik: `scratchpad/tor9/SYNTEZA-R2.md` (1027 wierszy). **To jest wsad adwersarzy.**

| | liczba |
|---|---|
| pozycji **WCHODZI**, jedno brzmienie ×3 języki | **42** (A 3 · B 9 · C 7 · D 9 · E 9 · F 5 — **suma rozbioru, zweryfikowana pomiarem**) |
| z tego **złożonych z dwóch** | **3** |
| **pakietów niepodzielnych** | **9** + 3 decyzje łańcuchowe |
| **NIE WCHODZI** | **20** |
| **WRACA DO AUTORA** | **4** — wszystkie za **O-2** (status łańcucha), wszystkie z trafnym kierunkiem |
| **CZEKA NA WŁAŚCICIELA** | **12 pytań**, jedno na pozycję |
| **żądań międzygrupowych z pustym adresem — domkniętych** | **2 z 2** |
| **rozjazdów sędziowskich rozstrzygniętych imiennie** | **8** — 5× wygrał pomiar, 3× odbiór |
| **korekt obowiązkowych przed wejściem czegokolwiek** | **3** — `TO:251`→`TO:250` ×10 · `TO:86`→`TO:72` ×1 · `filary.md:106` w. 146→149 |

**Trzy złożenia — każde z tego samego powodu, nie z upodobania:** rozstrzygnięcie właściciela
przycięło propozycję, **której kierunek sędzia potwierdził**. Najostrzejsze: `mod6_poco`, gdzie
**żaden z trzech autorów nie wykonuje §136** — dwaj usuwają mechanizm, który ma zostać, trzeci
zostawia człon, który ma wypaść. Synteza złożyła ze STANU minus człony 3 i 4.

**Osiem rozjazdów — dwa rozstrzygnięte WBREW S3, oba z podanym powodem:** S11 → W3-C W-1
(bo W1-C wprowadza czwarte cięcie `TO:144` — pomiar bije odbiór) · `faq.o3` → W3-D
(bo faworyt S3 niesie zakazany człon; **zapisane jako cena blokady A-1**).
**Przegrany werdykt za każdym razem zapisany jako koszt, nie usunięty jako błąd.**

**Ł-3 w PL rozcięty ŚWIADOMIE** — dziewięć parowań C×D, ani jedno nie daje równości;
S2 podaje tę drogę jako legalną. Karta łańcucha #1 dostaje arność **PL 9 · EN 8 · DE 8**.

**Czego synteza nie naprawia i nie udaje, że naprawia** — jej własne zdanie rozliczeniowe:

> Rodzina „Rezygnujesz w każdej chwili": **13 kluczy, 39 ciągów, zero wierszy pokrycia;
> przeżywa co najmniej 9 ciągów** w `Obawy.o3` i `Cennik.faq.o3` — **na obu trasach
> decyzyjnych**. Przyczyna jest konstrukcyjna: **rodzina twierdzenia nie jest łańcuchem
> ciągu, a podział po materiale obsługuje tylko to drugie.**

**Zestawienie z K-1 (§152), którego synteza nie mogła zrobić:** te 9 przeżywających ciągów
leży **pod przyciskiem na 7 z 8 tras**. Synteza mówi „rodzina przeżywa na obu trasach
decyzyjnych"; ścieżka mówi, że **przeżywa w miejscach, do których klikająca czytelniczka
nie dochodzi**. Obie rzeczy są prawdziwe i **dopiero razem opisują stan** — to jest ta sama
figura, co reguła KANONU o wniosku leżącym w zestawieniu, którego nikt nie zestawił.

## 154.1 Dwanaście pytań do właściciela — skrót, pełne brzmienia w `SYNTEZA-R2.md` §7

| # | przedmiot | czego blokuje brak decyzji |
|---|---|---|
| **O-1** | rodzina rezygnacji: droga A / B / C | **8 propozycji z 3 grup** *(K-1 dokłada drogę czwartą — §152.2)* |
| **O-2** | pasek potwierdzeń — czy przestaje mówić o rezygnacji | **3 propozycje grupy A + 4 wracające do autora** |
| **O-3** | czy §136 obejmuje `/dla-kogo` | podciąg 35/63/48 — **S3 nazwał to najważniejszą decyzją rundy** |
| **O-4** | rejestr poz. 24 — czy wiąże | wybór między W1-E/W2-E a krótszym o 38 znaków W3-E-5 |
| **O-5** | mandat świętowania (DECYZJA 10) | `DbanieOSiebie.tresc` — **§7 jest rekomendacją panelu, nie rozstrzygnięciem** |
| **O-6** | cofnięcie ADR-029 i pakietu ZWIĘZŁY DE | 2 pozycje; **w obu inny autor tej samej grupy cytuje rozstrzygnięcie i odmawia ruchu** |
| **O-7** | siódma para obaw wobec `toHaveCount(6)` i STRATEGIA pkt 24 | zgłoszone niezależnie przez **wszystkich trzech** autorów C |
| **O-8** | „dwanaście miesięcy" czy „cały rok" | **synteza przyjęła domyślnie „dwanaście miesięcy"** — do potwierdzenia |
| **O-9** | czy `/cennik` jest dziś w naruszeniu §57.1 | kolejność wykonania 3 → 1 |
| **O-10** | czy `Hero.podtytul` może przestać być zdaniem definicyjnym | **zmiana roli sekcji — §37.5** |
| **O-11** | czy sześć zamknięć idzie `/login` → `/cennik` | **zmiana kodu, nie brzmienia**; §142/§146 — 21 martwych wezwań |
| **O-12** | **Z-A8** — kto układa kolejność rozmów | **11 pozycji w 5 grupach**; lista nóg musi być domknięta PRZED decyzją *(§148.6 — 15 pewnych, 2 sporne)* |

---

# 155. STRAŻNIK POZORNY — **trzeci stan pilnowania**, znaleziony przez K-2 na jednym kluczu, przeliczony przeze mnie na całym pliku

K-2 zgłosił, że `Stopka.dokumentyPozycje.regulamin` **nie jest** pilnowany w PL, wbrew §132.2.
**Sprawdziłem sam, potwierdziłem i przeliczyłem — bo sprostowanie licznika obejmuje cały plik
albo się nie odbywa.**

## 155.1 Dwa mechanizmy, nie jeden

**Mechanizm I — podciąg innego wyrazu** (łapie go rozróżnianie wielkości liter):

```
grep -rni "regulamin" content/            [R-H: komenda i pełny wynik]
content/pl/obawy.md:44: **P:** Moja firma ma regulaminy. Czy mogę używać zewnętrznych narzędzi?
```
`Regulamin` ⊂ „regulaminy" — **zdanie o regulaminach JEJ firmy**. To jedyne trafienie
w całym `content/`. Tym samym mechanizmem: `Język` ⊂ „językach" (w komentarzu redakcyjnym
o trzech językach serwisu).

**Mechanizm II — trafienie w NAGŁÓWEK pliku treści, nie w zdanie.** Cięższy, bo
**rozróżnianie wielkości liter go NIE łapie** — tu złapało przypadkiem, bo nagłówki były
pisane małą literą.

Pomiar własny, jednostka zadeklarowana przed pomiarem: *klucz, którego **każde** trafienie
w `content/J/*.md` leży w linii zaczynającej się od `#`*. Wyłączenia wbudowane: klucze bez
żadnego trafienia (to inna klasa) i wartości krótsze niż 4 znaki.

| klucz | język | trafienie |
|---|---|---|
| **`CennikSkrot.naglowek`** | **pl** | `content/pl/cennik.md:108` — `## „Cennik w skrócie" — strona główna (STRATEGIA pkt 23)` |
| **`CennikSkrot.naglowek`** | **en** | `content/en/cennik.md:98` — `## „Pricing at a glance" — strona główna` |
| **`CennikSkrot.naglowek`** | **de** | `content/de/cennik.md:100` — `## „Preise im Überblick" — strona główna` |
| `Cennik.faqNaglowek` | pl | `content/pl/cennik.md:76` — `## 5. FAQ — pytania o płatność` |
| `Wspolne.stronaGlowna` | pl | `content/pl/cennik.md:108` — ten sam nagłówek |

> ## **`CennikSkrot.naglowek` — ten sam klucz, który §150 postawił na czele.**
> Jest **niewidoczny wzrokowo** (`srOnly`), a jego jedyny „strażnik" we **wszystkich trzech
> językach** to **nagłówek sekcji pliku treści** — zdanie o strategii, nie zdanie serwisu.
> **Niewidoczny dla oka i pozornie pilnowany dla narzędzia. Dwie warstwy niewidzialności
> na jednym kluczu.**

**Trzecie znalezisko przy okazji:** nagłówki `content/en/cennik.md:98` i `content/de/cennik.md:100`
niosą **polskie słowa „strona główna"** w plikach angielskim i niemieckim.

## 155.2 Trzy stany pilnowania — komplet

| stan | co widać w audycie | gdzie nazwany |
|---|---|---|
| **pilnowany** | strażnik znak-w-znak porównuje ciąg ze zdaniem pliku treści | wzorzec `hero.spec.ts:179` |
| **niepilnowany** | brak — **da się policzyć** | §132, §135 |
| **pilnowany w języku, którego nikt nie sprawdza** | wygląda na pokrycie, **nie trafia na listę braków** | **§140** |
| **STRAŻNIK POZORNY** — trafienie w podciąg wyrazu albo w nagłówek pliku | **wygląda na pokrycie i przechodzi każdą kontrolę**, bo narzędzie widzi trafienie | **§155 — nowy** |

**Wspólna własność §140 i §155: obie liczą się w audycie jako pokrycie i żadna nie jest
brakiem, który da się policzyć.** Różnica: §140 pilnuje **prawdziwego zdania w złym języku**,
§155 nie pilnuje **żadnego zdania**.

## 155.3 Czego NIE przeliczyłem i dlaczego — granica postawiona wprost

**Liczb §132.1 (79 par · pl 24 · en 28 · de 27) i §135 (22 → 32) NIE przeliczyłem.**
Powód mechaniczny, nie brak czasu:

- Populacja z §132.1 to **klucze PL ≥ 12 znaków po normalizacji znaczników rich** —
  zachowana w `scratchpad/tor9/79-KLUCZY.txt` (68 wierszy, nagłówek: *„KLUCZE PL (≥12 zn)
  NIEOBECNE W ŻADNYM PLIKU `content/pl/*.md`: 24"*).
- Odtworzenie tego narzędzia dało **77 par zamiast 79** i **22 klucze nieobecne we wszystkich
  trzech — zgodnie z zapisem.** Normalizacja różni się o dwa trafienia i **nie wiem, o które**.

> **Odtworzenie przybliżone nie jest odtworzeniem. Podanie „77" jako sprostowania „79"
> byłoby dokładnie tym, przed czym ostrzega dzisiejsza reguła KANONU: liczbą przeniesioną
> bez zakresu źródła.**

Co **stoi**: wykreślenie dwóch fałszywych wierszy z §132.2 (dowód cytatem, wyżej) oraz
**istnienie i mechanizm klasy**. Co **nie stoi**: żadna nowa liczba zbiorcza.
**Przeliczenie §132.1 i §135 wymaga oryginalnego narzędzia — kubeł R-D, pozycja otwarta.**

## 155.4 Skutek dla wsadu adwersarzy

Lista 22 kluczy / 66 ciągów warstwy czytnika (§144) **nie jest listą kluczy niepilnowanych** —
`CennikSkrot.naglowek` figuruje w audycie jako pilnowany ×3. **Adwersarz dostaje ją z adnotacją:
status „pilnowany" przy kluczu z tej listy wymaga sprawdzenia, CO trafienie trafiło.**

---

# 156. R-E BLOKUJE CENĘ — **wada reguły, nie materiału** · rozstrzygnięcie właściciela

> **Reguła miała zapewnić, że sędzia cytuje prawdę, a zabrania mu zacytowania jedynej
> liczby, dla której czytelniczka jest na tej stronie.** (właściciel, 2026-08-21)

R-E `[STAN]`: *„stan wyłącznie z warstwy renderowanej i plików treści"*.
`src/lib/cennik.ts:6-7` `[STAN]`: *„**Jedyne źródło cen: `content/cennik-snapshot.json`**"*.
Snapshot **nie jest** plikiem treści w rozumieniu R-E — więc sędzia stosujący regułę
dosłownie **nie ma prawa podać ceny jako stanu.**

## 156.1 ROZSTRZYGNIĘCIE — cena jest wyjątkiem od R-E, z warunkiem

> **Cena jest wyjątkiem od R-E.** Sędzia i autor mogą cytować cenę **WYŁĄCZNIE ze snapshotu**,
> **nigdy z pamięci ani z dokumentu panelu**, i **każda propozycja z ceną nosi przy sobie
> datę snapshotu.** (rozstrzygnięcie właściciela, 2026-08-21)

Wyjątek jest **wąski i warunkowy**, i warunek jest jego istotą: cena bez daty snapshotu
**nie spełnia wyjątku** — jest cytatem z historii w rozumieniu dzisiejszej reguły KANONU.

## 156.2 Ale to nie zamyka sprawy, tylko ją przenosi — **POZYCJA PREMIEROWA PIERWSZEJ WAGI**

> **⚠ POZYCJA PREMIEROWA — nie jest to wyłącznie zadanie dla toru aplikacji.**
> **Ceny na stronie mogą DZIŚ nie odpowiadać produkcyjnym i nic tego nie porównuje.**
> (doprecyzowanie właściciela, 2026-08-21)
> Serwis publikuje kwotę, wobec której zaciąga zobowiązanie, **bez jakiegokolwiek
> mechanizmu stwierdzającego, że jest to kwota, którą klientka faktycznie zapłaci.**
> To nie jest brak weryfikacji — to **brak przedmiotu weryfikacji**: snapshot nie ma
> daty, a jedyna bramka porównuje go ze Stripe'em testowym z konstrukcji.
> **Blokuje premierę niezależnie od stanu treści.**

> **`cennik-snapshot.json` BEZ DATY, przy bramce porównującej ze Stripe'em TESTOWYM,
> jest dziś jedynym źródłem ceny w serwisie. Nie wiemy, czy ceny na stronie odpowiadają
> produkcyjnym, bo NIC TEGO NIE PORÓWNUJE.** (brzmienie właściciela)

Stan, z cytatami:

| co | dowód |
|---|---|
| snapshot **bez daty** | klucze pliku: `['plany']`. Dla kontrastu `content/facts.json` ma `data_pomiaru` przy każdym wpisie (**8× `2026-08-09`, 1× `2026-08-12`**) |
| bramka **odmawia** porównania z produkcją | `scripts/stripe-snapshot.mjs:4-5,15-25` `[STAN]`: *„Stripe **WYŁĄCZNIE w trybie testowym**"*; klucz spoza `sk_test_`/`rk_test_` → `process.exit(1)`. CI: `.github/workflows/bramki.yml:157-158` |
| czy ceny rozjeżdżają się z produkcją | **R-C — NIEWERYFIKOWALNE stąd.** Weryfikowalne jest wyłącznie to, że bramka **odmawia** sprawdzenia |

> **Kwota pokazywana czytelniczce jest pilnowana przeciw źródłu, które z konstrukcji
> nie jest tym, które ją obciąży.**

**ADRESAT: tor aplikacji, przy posiedzeniu Stripe.** Zapisane jako pozycja premierowa
pierwszej wagi. **To nie jest zadanie toru redakcyjnego** — tor redakcyjny może wyłącznie
stwierdzić, że nie ma czym zweryfikować liczby, którą publikuje.

---

# 157. `<title>` IDENTYCZNY NA TRZYDZIESTU STRONACH — **strażnik istnienia czytany jako strażnik pokrycia**

## 157.1 Nowa instancja klasy — **pierwsza po stronie narzędzia zewnętrznego**

> **`axe` bada NIEPUSTOŚĆ, a my czytaliśmy jego zieleń jako pokrycie tytułów.
> To jest strażnik istnienia czytany jako strażnik pokrycia — po stronie narzędzia
> zewnętrznego, nie naszego. Pierwszy taki przypadek.** (właściciel, 2026-08-21)

Rodzina jest znana (bramka mówiąca „zielony" bez podania, co sprawdziła — §85, §102.1),
ale **wszystkie dotychczasowe wystąpienia były w kodzie, który sami napisaliśmy.**
To jest pierwsze, w którym **regułę cudzej biblioteki wzięliśmy za pokrycie, którego
ona nigdy nie obiecywała.** `document-title` z `axe-core` sprawdza, że tytuł **istnieje
i nie jest pusty** — i nic ponadto. Zieleń była prawdziwa.

## 157.2 Stan — z kodu, nie z artefaktu

```
src/app/[locale]/layout.tsx:13-16      [STAN — jedyna definicja metadanych w src/app]
  export const metadata: Metadata = {
    title: "Catherly",
    robots: { index: false, follow: false },
  };

grep -rln "export const metadata|generateMetadata" src/app  → wyłącznie layout.tsx
grep -rho "<title>[^<]*</title>" .next/server/app | sort | uniq -c
     30 <title>Catherly</title>
      1 <title>404: This page could not be found.</title>
```

## 157.3 Skutek dla czytelniczki — **brzmienie właściciela**

> **Karta przeglądarki, historia, zakładka i czytnik ekranu podają na trzydziestu stronach
> to samo. Osoba z pięcioma otwartymi kartami nie odróżni żadnej.**

To jest **czwarta warstwa treści**, obok wizualnej, czytnikowej (§141) i adresowej (§152) —
i jedyna, która działa **poza stroną**: w karcie, w historii, w zakładce, w wyniku wyszukiwania.

## 157.4 `description` i `og:` — **odpowiedź jest cięższa niż pytanie**

Właściciel polecił sprawdzić, czy `description` i `og:` „nie mają tego samego".
**Nie mają tego samego — nie mają niczego.**

```
grep -rc "description|og:|openGraph|twitter" src/ --include=*.tsx --include=*.ts   → 0
grep -rlo 'name="description"' .next/server/app --include=*.html | wc -l           → 0
grep -rlo 'property="og:'      .next/server/app --include=*.html | wc -l           → 0
find .next/server/app -name "*.html" | wc -l                                       → 31
```

| metadana | stan |
|---|---|
| `<title>` | **jeden ciąg na 30 z 31 artefaktów** |
| `description` | **nie istnieje — 0 z 31** |
| `og:` / Open Graph | **nie istnieje — 0 z 31** |
| `twitter:` | **nie istnieje** |
| `robots` | **`index: false, follow: false` na całym serwisie** |

**Wniosek, którego pytanie nie zakładało:** warstwa metadanych nie ma defektu pokrycia —
**nie ma warstwy.** Link do dowolnej strony Catherly wklejony gdziekolwiek pokaże
**gołe „Catherly" i nic więcej**, we wszystkich trzech językach.
`robots: noindex` jest zapewne decyzją przedpremierową; **`description` i `og:` nie mają
gdzie być zapisane jako decyzja, bo nie ma pliku, w którym by nie stały.**
Kubeł R-D: **nie ustaliłem, czy brak `description`/`og:` jest decyzją, czy zwyczajem** —
to jest audyt „zwyczaj czy decyzja" w piątym trybie K-2, do wykonania.

## 157.5 Rozstrzygnięcie właściciela — zakres

> **`<title>` wchodzi do zakresu czwartego sędziego. Rozszerz filtr §144 poza
> `srOnly`/`aria-label`/`alt` o METADANE.** (2026-08-21)

Filtr §144 rozszerzony: **`srOnly` · `aria-label` · `alt` · `<title>` · `description` ·
`og:*` · `robots`**. Odziedziczony filtr trzech atrybutów był **szóstym wystąpieniem
klasy „próg odziedziczony"** (§153.2) i to jest jego naprawa.

**Jedno zdanie sprawozdania, żeby nie zniknęło w wykonaniu:** czwarty sędzia dostępności
**nie został powołany** — K-2 wykazał (§153.4), że jego dodanie jest łataniem, i właściciel
tego nie odwołał. Rozszerzenie filtru **stoi niezależnie od tego, kto go użyje**: jest
naprawą inwentarza, nie powołaniem sędziego. **Zgłaszam rozbieżność zamiast ją rozstrzygać.**

---

# 158. `CennikSkrot.naglowek` — **PRZYPADEK WZORCOWY**, trzecie wystąpienie tego samego klucza

> **Klucz niewidoczny dla oka i pozornie pilnowany dla narzędzia. Żadna z naszych trzech
> warstw kontroli go nie obejmuje, a każda uważa, że obejmuje.** (właściciel, 2026-08-21)

| warstwa kontroli | co widzi | co uważa |
|---|---|---|
| **panel redakcyjny** (18 autorów, 3 sędziów, prowadzący) | ciąg w `messages` | że to tekst widoczny na ekranie — **jest `srOnly`** (§150.1) |
| **strażnik znak-w-znak** | trafienie wartości w pliku treści | że zdanie jest pilnowane — **trafiło w NAGŁÓWEK pliku**, ×3 języki (§155.1) |
| **bramka dostępności `axe`** | element istnieje i nie jest pusty | że nagłówek jest w porządku — **nie bada, czy niesie treść odróżniającą** (§157.1) |

**Trzy niezależne mechanizmy, trzy różne przyczyny, jeden klucz — i wszystkie trzy dają
wynik pozytywny.** To jest najczystszy dotąd dowód, że **stan „wygląda na pokryty"
nie trafia na żadną listę braków**, bo brak da się policzyć, a ten stan nie.

Klucz stoi w **sekcji S11** — tej z fałszywą bramką P0-4, przedmiocie rozstrzygnięcia §56
i pracy trzech autorów grupy C.

## 158.1 Polskie nagłówki w plikach EN i DE — **odpowiedź: NIE, to nie jest jedyne miejsce, i znaczy co innego**

Właściciel: *„to znaczy, że nagłówki nie były przekładane, tylko kopiowane. Sprawdź,
czy to jedyne miejsce."*

**Nie jest. I wniosek o kopiowaniu wymaga sprostowania — pomiar mówi co innego:**

```
python3: nagłówki markdown w content/en/*.md → 249
python3: nagłówki markdown w content/de/*.md → 249
```

**Wszystkie 249 nagłówków w każdym z dwóch języków jest po polsku** — nie tylko
„strona główna", ale cała struktura: `## 1. Nagłówek strony` · `## 3. Karty planów` ·
`### CO BOLI` · `### CZEGO TA ŚCIEŻKA NIE ZAŁATWIA` · `## Reguła kontraktowa etykiet linków (D-D21)`.

> **To nie jest kopiowanie zamiast przekładania — to jest KONWENCJA PLIKU.**
> Nagłówki są **etykietami redakcyjnymi dla zespołu**, a przekładany jest wyłącznie
> **cytowany ciąg** pod nagłówkiem. 249 = 249 w obu językach dowodzi konsekwencji,
> nie niedbałości.

**Ale konsekwencja jest realna i inna, niż wyglądała:** strażnik znak-w-znak porównuje
wartość klucza z **całym plikiem**, razem z polskimi nagłówkami redakcyjnymi. Dokładnie
tak `Wspolne.stronaGlowna` (PL, „Strona główna") trafił w nagłówek `## „Cennik w skrócie"
— strona główna (STRATEGIA pkt 23)`. **Konwencja jest bez zarzutu; narzędzie czytające
plik bez rozróżnienia nagłówka od zdania — nie jest.**

**Naprawa jest po stronie narzędzia, nie treści.** Nie zgłaszam propozycji zmiany
plików treści.

---

# 159. O-1 · CZWARTA DROGA K-1 — **brzmienie przed wykonaniem**, na żądanie właściciela

Rozstrzygnięcie właściciela 2026-08-21: *„wybieram CZWARTĄ DROGĘ K-1, **jeśli faktycznie
nie wymaga §37**. Powód: to jedyne rozwiązanie **niezmieniające znaczenia twierdzenia**,
a znaczenia nie wolno zmieniać bez faktu z aplikacji, którego nadal nie mamy.
**Podaj mi jej brzmienie przed wykonaniem.**"*

## 159.1 BRZMIENIE — i jest to jedyna propozycja w tym torze, która nie ma brzmienia

> **Czwarta droga nie zmienia ani jednego znaku w `messages` i ani jednego znaku
> w `content`. Zmienia wyłącznie NAZWĘ PROPSA w siedmiu plikach stron.**

```
STAN (7 plików):                     PROPOZYCJA (7 plików):
  zdaniePo={t("zamkniecieZdanie")}     zdaniePrzed={t("zamkniecieZdanie")}
```

| plik | wiersz | ciąg |
|---|---|---|
| `src/app/[locale]/page.tsx` | 150 | `tZamkniecie("zdanie")` |
| `src/app/[locale]/dla-kogo/page.tsx` | 167 | `t("ctaZdanie")` |
| `src/app/[locale]/funkcje/page.tsx` | 195 | `t("zamkniecieZdanie")` |
| `src/app/[locale]/funkcje/pozyskiwanie/page.tsx` | 144 | `t("zamkniecieZdanie")` |
| `src/app/[locale]/funkcje/tresci/page.tsx` | 146 | `t("zamkniecieZdanie")` |
| `src/app/[locale]/funkcje/zespol/page.tsx` | 103 | `t("zamkniecieZdanie")` |
| `src/app/[locale]/funkcje/wyniki/page.tsx` | 103 | `t("zamkniecieZdanie")` |
| `src/app/[locale]/cennik/page.tsx` | 78 | **już `zdaniePrzed` — bez zmiany** |

Komponent **już to obsługuje**; nie trzeba go zmieniać:
```
src/components/Zamkniecie.tsx:29-38   [STAN]
  {zdaniePrzed === undefined ? null : <p className={styles.zdanieProwadzace}>{zdaniePrzed}</p>}
  <a className={styles.cta} href={ctaHref}>{ctaEtykieta}</a>
  {zdaniePo === undefined ? null : <p className={styles.zdanie}>{zdaniePo}</p>}
```

## 159.2 Czy wymaga §37 — **NIE**, i podaję, na czym to opieram

| co §37 obejmuje | czy droga to robi |
|---|---|
| zmiana **znaczenia** twierdzenia → decyzja właściciela | **NIE** — zero zmian w ciągu |
| zmiana **brzmienia** → panel | **NIE** — zero zmian w ciągu |

**Strażnicy nie pękają — sprawdzone, nie założone.** Wszystkie asercje lokalizują zdanie
**wewnątrz sekcji zamknięcia**, nie względem przycisku:
```
e2e/zlozenie.spec.ts:238,253 · funkcje-podstrony.spec.ts:286 · funkcje-pozyskiwanie.spec.ts:145
  const zamkniecie = page.locator("main > section").last();
  await expect(zamkniecie.getByText(k.zamkniecieZdanie, { exact: true })).toBeVisible();
```
**Żadna asercja nie bada kolejności zdania wobec CTA.** `zlozenie.spec.ts:253-258` bada
`/cennik`, gdzie zdanie **już** stoi nad przyciskiem — i przechodzi z tą samą konstrukcją.

## 159.3 CZEGO DROGA JEDNAK DOTYKA — zgłaszam, zamiast przemilczeć

**Dwie klasy CSS nie są równoważne:**
```
Zamkniecie.module.css:17  .zdanieProwadzace { margin: 0 0 1.25rem; max-width: var(--wymiar-miara-akapitu); }
Zamkniecie.module.css:46  .zdanie { margin: 1rem 0 0; color: var(--kolor-rola-tekst-drugorzedny); font-size: 0.9375rem; }
```
Przeniesienie **podnosi zdanie z drugorzędnego (0,9375 rem, kolor drugorzędny) do
pierwszorzędnego**. To **nie jest zmiana znaczenia ani brzmienia**, więc §37 nie wchodzi —
ale **jest zmianą wagi wizualnej**, a więc przedmiotem bramki wyglądu, nie redakcji.
**Do rozstrzygnięcia przez właściciela osobno:** czy zdanie ma przenieść się z klasą
`zdanieProwadzace` (waga `/cennik`, spójność), czy z zachowaniem drugorzędności.

## 159.4 ZNALEZISKO, KTÓRE ZMIENIA WARTOŚĆ TEJ DROGI — **6 z 8 wezwań prowadzi do martwego `/login`**

K-1 uzasadnił czwartą drogę tak: przenieść zdanie *„nad wezwanie na trasach, na których
**wezwanie prowadzi do decyzji**"*. Sprawdziłem, dokąd prowadzą:

| trasa | cel wezwania zamknięcia |
|---|---|
| `/` | `/funkcje` — **nawigacja, nie decyzja** |
| `/dla-kogo` · `/funkcje` · `/funkcje/pozyskiwanie` · `/funkcje/tresci` · `/funkcje/zespol` · `/funkcje/wyniki` | **`/login` ×6** |
| `/cennik` | `/login` — **i tu zdanie już stoi nad** |

> **Sześć z siedmiu tras, na których droga miałaby coś zmienić, prowadzi do `/login` —
> a `/login` jest dziś martwe (§142, §146: 21 martwych wezwań, wada teraźniejsza).**
> Siódma prowadzi do `/funkcje`, czyli do nawigacji.

**Skutek dla rozstrzygnięcia właściciela — zgłaszam, nie wykonuję:** czwarta droga jest
**wykonalna, tania i wolna od §37**, ale jej wartość dla czytelniczki **zależy od pytania
O-11** (czy sześć zamknięć przekierowuje się z `/login` na `/cennik`). Wykonana dziś,
przenosi zdanie nad przycisk, **który i tak nie prowadzi do decyzji**.
**Rekomendacja kolejności: O-11 przed O-1.** Nie wykonuję żadnej z nich bez rozstrzygnięcia.

## 159.5 Druga strona opisu — zdanie właściciela, do pozycji

> **Obie prawdziwe, dopiero razem opisują stan.** Synteza: rodzina przeżywa ≥9 ciągów
> na obu trasach decyzyjnych. K-1: przeżywa tam, gdzie klikająca czytelniczka nie dochodzi.

---

# 160. O-2 · PASEK POTWIERDZEŃ — warunki właściciela

**Rozstrzygnięcia 2026-08-21:**

1. > **Cztery propozycje wracające do autora za status łańcucha mają wrócić z KOMPLETEM
   > trzech języków, nie z uzupełnieniem.**
   Powód mechaniczny: uzupełnienie mierzy się wobec stanu, który w międzyczasie mógł się
   zmienić przez inne pozycje pakietu — komplet mierzy się wobec siebie.
2. **Trzy propozycje grupy A** — właściciel rozstrzyga **na brzmieniach**; brzmienia
   przekazane w meldunku.
3. > **Warunek techniczny, przypomniany przez właściciela: `PasekPotwierdzen` jest
   > reużywany przez `/` i `/cennik`, a ciągi są ZDUPLIKOWANE, NIE WSPÓŁDZIELONE.
   > Propozycja musi wymienić OBA miejsca.**

`Hero.tsx:33-38` `[STAN]` — pasek `[potwierdzenieUE, potwierdzenieRezygnacja]` (arność **2**)
`cennik/page.tsx:45→60` `[STAN]` — pasek `potwierdzenie1–3` (arność **3**)

**To jest wariant klasy „każda naprawa treści wymienia WSZYSTKIE trasy" (KANON) po stronie
komponentu:** komponent wspólny usypia, bo wygląda na jedno miejsce. **Jest dwa.**
S2 §3.1 zmierzył arności; **W1-A i W3-A je policzyli, W2-A nie.**

---

# 161. O-12 · Z-A8 ROZSTRZYGNIĘTE — **plan jest narzędziem, klientka jest sprawczynią**

> **PLAN JEST NARZĘDZIEM, KLIENTKA JEST SPRAWCZYNIĄ. Wszędzie, bez wyjątku dla żadnej
> z pięciu grup.**
> **Powód:** to nie jest kwestia stylu, tylko **prawdziwości** — DMO układa kolejność,
> ale **nie dzwoni, nie pisze i nie decyduje**. Zdanie z podmiotem-narzędziem obiecuje
> **sprawstwo, którego produkt nie ma**.
> (rozstrzygnięcie właściciela, 2026-08-21)

**Rodzina Z-1 odwieszona.** Zawieszenie z §148.5 („wstrzymana do rozstrzygnięcia Z-A8")
**wygasa z tym zapisem.**

## 161.1 Zastosowanie kryterium właściciela do piętnastu kluczy — **pomiar, nie wykonanie**

Właściciel podał **kryterium prawdziwościowe**, nie stylistyczne: *narzędzie w podmiocie
obiecuje sprawstwo, którego produkt nie ma*. Zastosowałem je do wszystkich piętnastu
i **rozpadają się na trzy klasy, nie na jedną**. Zgłaszam, zamiast rozstrzygnąć za
właściciela, **i zamiast po cichu zastosować rozstrzygnięcie do zdań, których nie dotyczy.**

**Klasa 1 — narzędziu przypisane CUDZE sprawstwo. Rozstrzygnięcie trafia wprost: 7 kluczy.**

| klucz | ciąg `[STAN]` |
|---|---|
| `Filary.filar1.konkret1` | „**DMO układa kolejność rozmów** — zaczynasz dzień bez zastanawiania się." |
| `Filary.filar3.korzysc` | „…**kreator wdrożeniowy robi to za ciebie**." |
| `FunkcjeZespol.zdanie` | ten sam ciąg — **noga łańcucha** |
| `Filary.filar3.konkret1` | „**Kreator wdrożeniowy prowadzi** nową osobę przez etapy — **bez twojej pomocy**." |
| `Obawy.o1` | „**Kreator wdrożeniowy prowadzi cię** krok po kroku. **Pierwsze 90 Dni dają ci** gotowy plan…" |
| `FunkcjeIndeks.blok3Wprowadzenie` | „**Kreator wdrożeniowy prowadzi** nową osobę przez etapy, a … **prowadzisz ją ty**." |
| `FunkcjeZespol.mod1_poco` | „…**kreator wdrożeniowy prowadzi ją** przez sześć kroków…" |

**„robi to za ciebie" jest najostrzejszym wystąpieniem w całym torze** — nazywa transfer
sprawstwa wprost, w dwóch kluczach, ×3 języki.

**Klasa 2 — „przypomina": produkt TO ROBI, ale wiersz stawia w podmiocie ją. 3 klucze.**

`RytmDnia.krok1Tresc` („**Kalendarz przypomina** o reszcie") · `DlaKogo.s1_robi_1`
i `FunkcjePozyskiwanie.mod2_poco` (obie: „**Catherly przypomina ci** o niej").
`TO:37` `[STAN]`: „**Planujesz** kontakty… i **dostajesz** przypomnienie."

> **Tu narzędzie robi dokładnie to, co zdanie mówi — przypomnienie wysyła system.**
> Kontrast z wierszem jest realny (on stawia ją w podmiocie **odbierającym**), ale
> kryterium właściciela („sprawstwo, którego produkt nie ma") **na te trzy nie trafia**.

**Klasa 3 — narzędzie robi dokładnie to, co zdanie mówi. 5 kluczy.**

`Filary.filar4.korzysc` · `FunkcjeIndeks.blok4Wprowadzenie` · `FunkcjeWyniki.zdanie`
(wszystkie: „**Pulpit pokazuje** dzisiejszy stan") · `Filary.filar4.konkret2`
(„**Cel z kamieniami milowymi mówi**, jak daleko zaszłaś") · `Filary.filar2.konkret1`
(„**Studio daje** gotowe formaty i szablony").

> **Pulpit pokazuje. Studio daje. To są czynności narzędzia, nie czynności czytelniczki.**
> Usunięcie podmiotu-narzędzia w tych pięciu **zabrałoby zdanie prawdziwe** — wprost pod
> R-A i pod zakaz usuwania członu pokrytego.

## 161.2 Co z tego wynika — **i dlaczego nie wykonuję sam**

Rozstrzygnięcie brzmi „wszędzie, bez wyjątku dla żadnej z pięciu grup". Rozumiem to jako
**zakaz wyjątków GRUPOWYCH** (żadna grupa autorska nie dostaje ulgi), a nie jako polecenie
zastosowania kryterium do zdań, które go nie spełniają. **Nie rozstrzygam tego sam** —
zgodnie z KANONEM: rozstrzygnięcie zawierające liczbę miejsc wymaga **zgłoszenia, nie
cichego rozszerzenia ani cichego zawężenia.**

**Do potwierdzenia przez właściciela: czy rodzina Z-1 to 7 kluczy (klasa 1), 10 (klasy 1+2),
czy 15 (wszystkie).** Ciągów odpowiednio **21 · 30 · 45**.

---

# 162. ROZSTRZYGNIĘCIA WŁAŚCICIELA 2026-08-21 — **rodzina Z-1 domknięta, dziewięć pytań zamkniętych**

## 162.1 Z-1 = **7 kluczy · 21 ciągów** — liczba ostateczna

> **Rozbicie przyjęte. Rodzina Z-1 to KLASA 1 — siedem kluczy.**
> *„Miałeś rację, że moje «wszędzie, bez wyjątku» było zakazem wyjątków grupowych,
> nie poleceniem stosowania kryterium do zdań, które go nie spełniają."*

**Na czoło pozycji, na polecenie właściciela — najostrzejsze wystąpienie:**

> ## **„…kreator wdrożeniowy ROBI TO ZA CIEBIE."**
> `Filary.filar3.korzysc` = `FunkcjeZespol.zdanie` — **dwa klucze, noga łańcucha, ×3 języki.**
> Zdanie nazywa transfer sprawstwa **wprost, jednym czasownikiem**. Reszta rodziny obiecuje
> sprawstwo przez konstrukcję; **to jedno je deklaruje.**

Komplet siedmiu: `Filary.filar1.konkret1` („DMO układa kolejność rozmów") ·
**`Filary.filar3.korzysc`** · **`FunkcjeZespol.zdanie`** · `Filary.filar3.konkret1`
(„prowadzi — bez twojej pomocy") · `Obawy.o1` („prowadzi cię krok po kroku") ·
`FunkcjeIndeks.blok3Wprowadzenie` · `FunkcjeZespol.mod1_poco`.

**Liczby unieważnione ostatecznie — pięć, nie trzy:** `4` (§99) · `5` (W1E-N2) · `6` (S2,
poprawna dla `TO:110`) · `10` (§114) · **`15` (§148, poprawna dla jednostki „narzędzie
w podmiocie", za szeroka dla rodziny)**. **Obowiązuje: 7 kluczy, 21 ciągów.**
*Szósta liczba w tej rodzinie, i pierwsza, którą unieważnia rozstrzygnięcie właściciela,
a nie pomiar.*

## 162.2 KLASA 2 — **rozjazd zdania z wierszem**, pozycja osobna, adresat: tor 10

> **NIE do Z-1. Osobna pozycja, inna wada: produkt to robi, więc zdanie jest prawdziwe,
> ale wiersz stawia w podmiocie ją. To jest ROZJAZD ZDANIA Z WIERSZEM, nie fałszywe
> sprawstwo.**
> **Rozstrzygnij przy okazji toru 10 — jeśli wiersz jest WĘŻSZY NIŻ KOD, poprawia się
> WIERSZ, nie zdanie.** (właściciel, 2026-08-21)

3 klucze: `RytmDnia.krok1Tresc` · `DlaKogo.s1_robi_1` · `FunkcjePozyskiwanie.mod2_poco`
(wszystkie o przypomnieniu), wobec `TO:37` „**Planujesz** kontakty… i **dostajesz**
przypomnienie".

**To jest odwrócenie kierunku naprawy i trzeba je zapisać osobno:** przez cały tor 9
naprawialiśmy **zdanie wobec wiersza**, bo wiersz był źródłem prawdy. Tu właściciel
rozstrzyga, że **wiersz może być węższy niż aplikacja** — a wtedy naprawia się wiersz.
**Pierwszy przypadek w tym torze, w którym tabela obietnic jest przedmiotem naprawy,
a nie miernikiem.**

## 162.3 KLASA 3 — **zostaje bez zmian**

5 kluczy: „Pulpit pokazuje dzisiejszy stan" ×3 · „Cel z kamieniami milowymi mówi…" ·
„Studio daje gotowe formaty i szablony". **Usunięcie zabrałoby zdanie prawdziwe — wprost
pod zakaz usuwania członu pokrytego.**

## 162.4 Dwa sporne — rozstrzygnięte imiennie

**`Hero.naglowek` — NIE wchodzi do Z-1.**
> **Konstrukcja sama rozdziela sprawstwa: „Rozmawiasz z ludźmi" stawia ją w podmiocie
> sprawczym, drugi człon mówi, co robi narzędzie. To jest POPRAWNY PODZIAŁ RÓL, nie
> transfer sprawstwa.**

**`Filary.filar2.konkret3` — NIE wchodzi. NOWA KLASA:**
> ## **„ZDANIE I WIERSZ ZGODNE, OBA Z NARZĘDZIEM W PODMIOCIE."**
> Jednostka Z-1 wymaga **kontrastu** z wierszem; kontrastu nie ma — `TO:78` „**Każdy projekt
> otrzymuje** wynik" też nie stawia jej w podmiocie.
> **Sprawdzić przy torze 10, czy wiersz jest prawdziwy. To jest pytanie o TABELĘ,
> nie o stronę.** (właściciel, 2026-08-21)

Klasa jest **bliźniacza wobec KLASY 2 i przeciwna co do kierunku podejrzenia:** w klasie 2
wiersz jest podejrzany o **zbyt wąski zakres**, tutaj o **niesprawdzoną prawdziwość**.
W obu przedmiotem jest tabela.

## 162.5 Dziewięć pytań — rozstrzygnięcia

| # | rozstrzygnięcie | powód właściciela (brzmienie) |
|---|---|---|
| **O-3** | **`/dla-kogo` ma budżet uwagi bliższy PODSTRONIE.** Mechanizm zostaje, podciąg 35/63/48 zostaje | *„to trasa rozpoznania, czytelniczka już wybrała ścieżkę i czyta dłużej. **Hero ma cztery sekundy, `/dla-kogo` nie.**"* |
| **O-4** | **Pozycja 24 WIĄŻE.** Panel **nie może** zamknąć jej usunięciem członu. **W1-E/W2-E** | *„**Usunięcie zamiast odczytu to zamknięcie pozycji przez zniknięcie przedmiotu**"* |
| **O-5** | **Mandat świętowania NIE obowiązuje jako rozstrzygnięcie właściciela** — S1 miał rację, §7 jest rekomendacją panelu. **Rozstrzygnięcie nowe: świętowanie ZOSTAJE, ale wyłącznie na pokrytym (Wall of Proof).** Wariant ze świętowaniem, **jeśli jego pokrycie jest czyste** | — |
| **O-6** | **NIE cofa ADR-029 ani decyzji panelu DE** | *„Autorzy cytujący rozstrzygnięcie i odmawiający ruchu — **postąpili właściwie**. Propozycje naruszające rozstrzygnięcie odpadają, **nawet z czystym pokryciem**."* |
| **O-7** | **SIÓDMA PARA WCHODZI.** Strażnik `toHaveCount(6)` → **7**; `STRATEGIA.md` pkt 24 zaktualizowana | *„Pytanie «czy moje kontakty są bezpieczne» nie może zniknąć ze strony — to jest obawa, którą klientka ma naprawdę, a my wiemy dziś, że **odpowiedź jest trudniejsza, niż sądziliśmy** (Z-A7). Zgłoszenie przez wszystkich trzech autorów niezależnie — **to jest sygnał, nie zbieg**."* |
| **O-8** | **„DWANAŚCIE MIESIĘCY".** Wpis do `liczby-w-tresci.json` | *„**Bez eufemizmu znaczy: liczba, nie okrągłość.** «Cały rok» brzmi jak korzyść, «dwanaście miesięcy» brzmi jak zobowiązanie — i to drugie jest prawdą o tej płatności."* |
| **O-9** | **`/cennik` JEST w naruszeniu §57.1.** Kolejność S1 (3→1) przyjęta | *„Kwalifikator w konstrukcji tabeli nie wystarcza, bo `sr-only` «w planie/poza planem» jest dziś **NIEPILNOWANY** (§150) — czyli **kwalifikator, na którym opieramy zgodność, sam nie ma pokrycia**."* |
| **O-10** | **NIE.** `Hero.podtytul` zostaje zdaniem definicyjnym | *„Definicja przeniesiona wyłącznie do S4 **znika dla wszystkich, którzy nie doczytają** — a nowa osoba ma wiedzieć w trzy sekundy, co to za produkt."* Zachowanie autora (wstrzymanie z drugim, niezależnym powodem) — **wzorcowe, odnotowane** |
| **O-11** | **TAK — sześć zamknięć przekierowuje na `/cennik`. Wykonać PRZED O-1.** **Zmiana kodu → pozycja dla okna www, NIE wykonywana z toru 9** | *„droga przenosząca zdanie nad przycisk, który prowadzi do martwego `/login`, nie zmienia niczego dla czytelniczki"* |
| **O-1** | **CZWARTA DROGA K-1, po wykonaniu O-11. Klasa CSS: `zdanieProwadzace`** | *„**Podniesienie wagi wizualnej jest tu zamierzone** — zdanie o braku zobowiązania ma być widoczne, nie drugorzędne."* |
| **O-2** | **A-1, A-2, A-3 przyjęte w podanych brzmieniach.** Adnotacja S2 przy A-1 **wchodzi**. Cztery wracające — komplet trzech języków, **na NOWEJ przesłance po §136** | — |

## 162.6 O-7 — **jedyny przypadek w tym torze, w którym liczba strażnika się zmienia**

`e2e/zlozenie.spec.ts:226` `[STAN]`:
```
await expect(obawy.locator("details")).toHaveCount(6);
```

> **Zapisuję to osobno, żeby nie dało się tego pomylić z łataniem strażnika.**
> Zmiana `6 → 7` **nie jest obejściem defektu** — jest **arnością idącą za treścią**,
> na mocy rozstrzygnięcia właściciela, że siódma para wchodzi. Strażnik robi dokładnie
> to, do czego został napisany: **wymusza, żeby zmiana liczby par była DECYZJĄ, a nie
> skutkiem ubocznym.** Dziś zadziałał.

**Wykonanie:** zmiana treści, strażnika i `STRATEGIA.md` pkt 24 idzie **jednym pakietem
albo wcale**. **Tor 9 tego nie wykonuje** — zgłasza jako pozycję dla okna wykonawczego.

## 162.7 „ZAPIS OPISUJĄCY NIE ZAMYKA POZYCJI" — **klasa nazwana dziś, wcześniej nie istniała**

Właściciel przy O-4: *„dokładnie ta klasa, którą dziś nazwaliśmy — **zapis opisujący
nie zamyka pozycji**"*.

**Sprawdziłem, zanim to zapisałem** (R-H, twierdzenie o nieistnieniu we własnych dokumentach):
```
grep -rc "zapis opisujący|zamyka pozycji|przez zniknięcie|zamknięcie pozycji|usunięcie zamiast"
        CLAUDE.md docs/redakcja/00-USTALENIA-TOR9.md docs/faza-2/*.md   → 0 trafień
```
Dwa trafienia „nie zamyka" dotyczą czego innego (§156.2 o cenie; T3 o rozrzucie pomiaru).

> **Ta klasa nie była dotąd nazwana nigdzie w kanonie. Powstaje dziś, przy O-4.**
> Zapisuję jako nową, nie jako przypomnienie — bo **przypomnienie sugerowałoby, że gdzieś
> stoi, a nie stoi**, i pierwszy, kto jej poszuka, znajdzie tylko odesłanie.

**Treść klasy:** pozycję rejestru zamyka **wykonanie jej warunku**, nie **zniknięcie jej
przedmiotu**. Usunięcie członu, którego pozycja dotyczy, zostawia pozycję **spełnioną
pozornie** — warunek (odczyt) nie został wykonany, a przedmiot, na którym miał być
wykonany, już nie istnieje. **Rodzina: „strażnik zawężony, żeby zmieścić defekt" (§116) —
ten sam ruch, wykonany na rejestrze zamiast na bramce.**

---

# 163. O-9 — **pomiar wartości czwartego sędziego**: argument był hipotezą, teraz jest dowodem

> **Warstwa czytnika rozstrzygnęła pytanie o zgodność, ZANIM sędzia zaczął pracować.
> Argument za jego wprowadzeniem był hipotezą; teraz jest dowodem.**
> (właściciel, 2026-08-21)

**Przebieg, bo w nim leży cała waga:**

| kiedy | co się stało |
|---|---|
| §141 | dostępność nazwana jako **warstwa treści**, nie jako wymóg techniczny — na tym etapie **hipoteza**: „gdyby ktoś na to patrzył, znalazłby rzeczy" |
| §144 | inwentarz warstwy czytnika: **22 klucze / 66 ciągów** — pomiar zlecony jako **wsad dla adwersarzy**, bez hipotezy o wyniku |
| §150 | `Cennik.tabela.wPlanie`/`pozaPlanem` — **niepilnowane**; `CennikSkrot.naglowek` — `srOnly` |
| **O-9** | **to samo znalezisko rozstrzygnęło pytanie o zgodność `/cennik` z §57.1** — nie dołożyło pozycji, tylko **dostarczyło przesłankę wystarczającą do werdyktu** |

**Łańcuch rozumowania właściciela przy O-9, zapisany dosłownie, bo to on jest dowodem:**

> Kwalifikator w konstrukcji tabeli nie wystarcza, **bo `sr-only` „w planie / poza planem"
> jest dziś NIEPILNOWANY** — czyli **kwalifikator, na którym opieramy zgodność, sam nie ma
> pokrycia.**

**Dlaczego to jest dowód, a nie kolejny argument.** Trzej sędziowie ocenili `/cennik`
i żaden nie zakwestionował zgodności z §57.1 — bo **wszyscy trzej widzieli kwalifikator
i żaden nie sprawdził, czy kwalifikator jest pilnowany.** Rozstrzygnięcie zapadło
z materiału, którego **żadne z trzech kryteriów nie obejmowało**.

> **Kryterium, którego nie było w panelu, wywróciło werdykt panelu — na pytaniu,
> co do którego panel był zgodny.** To jest najmocniejsza forma dowodu, jaką ten tor
> potrafi wyprodukować: nie „znaleziono coś nowego", tylko **„zmieniono odpowiedź na
> pytanie już rozstrzygnięte".**

**Zapisuję rozbieżność, która stąd wynika, zamiast ją rozstrzygać** (powtórzenie §157.5):
K-2 wykazał, że **dodanie czwartego sędziego do odziedziczonego zbioru trzech jest
łataniem** (§153.4) — i ten wniosek dotyczył **konstrukcji zbioru**, nie wartości samego
kryterium. O-9 dowodzi **wartości kryterium**. Obie rzeczy są prawdziwe naraz:

> **Kryterium dostępności jest wartościowe (dowód: O-9). Doklejenie go jako czwartego
> do zbioru, który nie ma roszczenia do kompletności, nie naprawia zbioru (dowód: K-2).**
> **Wniosek, którego nie wyciągam sam:** to jest argument za **przebudową zbioru kryteriów
> z deklarowanym pochodzeniem**, nie za dodaniem czwartej pozycji do listy.
> **Decyzja właściciela.**

---

# 164. ADWERSARZ A-1 — PRAWDA I POKRYCIE · **31 znalezisk, i jedno z nich jest moje**

Raport: `scratchpad/tor9/ADW-1-PRAWDA.md` (1268 wierszy).
P-01…P-20 (pozycje WCHODZI) · SR-01…SR-07 (warstwa czytnika i obrazu) · X-1…X-4.

## 164.1 X-4 — **liczba 42, nie 34. Błąd mój, przeniesiony w dwa miejsca**

Bilans syntezy podaje **34**, a jego **własny rozbiór w tej samej komórce** —
`A 3 · B 9 · C 7 · D 9 · E 9 · F 5` — sumuje się do **42**.

Przeliczone niezależnie, komenda i wynik (R-H):
```
awk '/^# 3\. ZALE/{exit} /^### /{print}' SYNTEZA-R2.md | wc -l   → 42
awk … per grupa                                                  → A 3 · B 9 · C 7 · D 9 · E 9 · F 5
```

> **To nie jest liczba, która zestarzała się w tranzycie. To liczba, która była
> sprzeczna z danymi stojącymi obok niej W TEJ SAMEJ KOMÓRCE — i przeniosłem ją,
> nie dodając sześciu składników, które miałem przed oczami.**

**Sprostowanie objęło oba miejsca, w których ją powtórzyłem:** §154 (nagłówek i wiersz
bilansu) oraz `BRIEF-ADWERSARZE.md`, czyli **dokument, na którym pracują trzej adwersarzy**.

**Zaostrzenie klasy „wniosek leżący w zestawieniu, którego nikt nie zestawił".** Dotąd
mechanizmem było: *dane leżą w różnych sekcjach, a przegląd czyta sekwencyjnie*. Tutaj
**dane leżały w jednym wierszu tabeli, w odległości dwudziestu znaków** — i nie zostały
zestawione, bo **liczba przed nawiasem wygląda na wynik, a zawartość nawiasu na jego
uzasadnienie.** Nikt nie sprawdza, czy uzasadnienie daje wynik.

## 164.2 SR-01 — **naruszenie ADR-018 w warstwie, której nie widzi nikt** · najcięższe znalezisko rundy

Sprawdziłem osobiście, wszystkie trzy języki.

```
ObrazyFilarow.filar2   [STAN]
 pl  „…pod nim oznaczone ryzykowne sformułowania i PROPOZYCJA POPRAWIONEJ WERSJI."
 en  „…with the risky phrases flagged below it and A CORRECTED VERSION OFFERED."
 de  „…die markierten riskanten Formulierungen und EIN VORSCHLAG FÜR EINE KORRIGIERTE FASSUNG."
```

Wobec trzech źródeł, każde cytowane `[STAN]`:

| źródło | co mówi |
|---|---|
| `content/tabela-obietnic.md:77` | „Tarcza **sprawdza** ryzykowne sformułowania przed publikacją — reguły działają lokalnie" |
| `content/inwentarz-funkcji.md:44` | „Tarcza (**wykrywanie** ryzykownych sformułowań — reguły lokalne, **bez AI**)" |
| `TO:88-90` | „nie pisać «AI napisze za ciebie» … **tryb dokonany niedozwolony bez klucza Anthropic**" |
| `TO:200` | „**Nie napisze tekstu zamiast ciebie** — asystent proponuje, ty piszesz" |

> **Tarcza jest detektorem regułowym BEZ AI. Alt przypisuje jej wytworzenie poprawionej
> wersji tekstu. To jest twierdzenie o produkcie bez wiersza pokrycia, sprzeczne
> z inwentarzem — czyli naruszenie ADR-018 — i stoi w warstwie, której widząca
> czytelniczka nie zobaczy NIGDY.**

**Strażnik, który to przepuścił — `e2e/zrzuty-filarow.spec.ts:159-174` `[STAN]`:**
```
expect(alt?.trim().length, `${jezyk}/${klucz}: pusty alt`).toBeGreaterThan(0);
expect(widziane.has(alt), `${jezyk}: alt powtórzony (${klucz})`).toBe(false);
```
**Bada NIEPUSTOŚĆ i RÓŻNOŚĆ. Nie bada treści.**

> ## **Trzecie wystąpienie klasy „strażnik istnienia czytany jako strażnik pokrycia" —
> ## i PIERWSZE W NASZYM WŁASNYM TEŚCIE.**
> §153.4 to `axe` (narzędzie zewnętrzne). §158 to trzy warstwy naraz na jednym kluczu.
> **To jest test, który napisaliśmy sami, w komentarzu deklarujący, po co powstał
> („Ten sam opis pod dwoma z nich znaczy, że któryś jest nieprawdziwy") — i pilnujący
> RÓŻNOŚCI opisów zamiast ich PRAWDZIWOŚCI.** Zieleń była prawdziwa przez cały czas.

## 164.3 X-1 — `Cennik.faq.o2` · **zdanie nieprawdziwe, pilnowane znak w znak**

`[STAN]` pl: **„Wybierasz plan i zmieniasz go kiedy chcesz."**
Pilnowane: `e2e/cennik.spec.ts:354` (lista znak-w-znak, `c.faq.o2`).
Kanon §2310 zapisuje: `subscription_update: { enabled: false }` — **portal nie pozwala
zmienić planu**, a `en.json:1387` aplikacji odsyła do portalu **po czynność, którą portal
ma wyłączoną**.

> **Bramka utrzyma przy życiu zdanie, któremu przeczy kod, i zapali się przy próbie
> jego usunięcia.** To jest §116 („strażnik zawężony, żeby zmieścić defekt") w postaci
> odwrotnej: **strażnik pełny, pilnujący defektu, bo nikt nie sprawdził, czego pilnuje.**

**Zarzut A-1 wobec syntezy stoi:** N-18 odrzucono, przekwalifikowując pozycję do „toru
aplikacji" — ruchu, którego **ADR-018 zabrania wprost** („usuwasz obietnicę, nie ogłaszasz
funkcji"). **Do rozstrzygnięcia właściciela.**

## 164.4 R-C — **`scripts/setup-stripe.ts` NIE ISTNIEJE w żadnym dostępnym repozytorium**

A-1 zgłosił to w swoim kuble R-D uczciwie („nie mam repozytorium aplikacji").
**Sprawdziłem i dotyczy to TAK SAMO MNIE:**

```
ls scripts/setup-stripe.ts                                  → No such file or directory
find /home /workspace -name "setup-stripe*" -not -path "*/node_modules/*"  → (pusto)
grep -rn "subscription_update|at_period_end|cancellation_reason" --include=*.ts --include=*.mjs .
   → wyłącznie docs/redakcja/00-USTALENIA-TOR9.md (mój własny zapis)
```

> **Cała analiza rodziny anulowania (§2294–§2349) — `mode: 'at_period_end'`,
> `cancellation_reason.enabled: true`, `subscription_update: false`, A-2, A-3, X-1 wyżej —
> stoi na pliku, którego z tego środowiska NIE DA SIĘ ZOBACZYĆ.**

**Nie twierdzę, że cytaty są fałszywe** — powstały prawdopodobnie w sesji z dostępem
do repozytorium aplikacji i mogą być dokładne. **Twierdzę, że są dziś NIEWERYFIKOWALNE
i muszą tak być oznaczone** (R-C). Etykieta `[STAN]` przy tych cytatach **jest za mocna**:
`[STAN]` znaczy „odczytane z warstwy, którą widzę". **Właściwa etykieta to `[STAN — R-C,
źródło poza zasięgiem]`.**

**Co przywraca weryfikowalność:** dołączenie repozytorium aplikacji do sesji albo
przeniesienie odczytu na tor aplikacji przy posiedzeniu Stripe — **tam, gdzie już stoi
pozycja premierowa o snapshocie cen (§156.2).** Obie potrzebują tego samego dostępu.

## 164.5 Dwie hipotezy zlecenia OBALONE przez adwersarza — zapisane jako wynik

1. **„Przywołania `TO:` są błędne — zakładaj, że jest ich więcej."** A-1 odczytał
   **wszystkie 21 różnych przywołań w §2 syntezy. Wszystkie trafiają we właściwy wiersz.**
   `TO:251`→`TO:250` i `TO:86`→`TO:72` **nie występują w §2 ani razu** — dotyczyły
   raportów autorskich, nie syntezy. **Hipotezę postawiłem ja, w zleceniu; upadła.**
2. **Trzy klucze `okruszkiAria` rzekomo niepilnowane** — A-1 postawił zarzut, znalazł
   udokumentowany wyjątek (`e2e/funkcje-podstrony.spec.ts:502-547`) i **wycofał go sam.**

**Ale defekt jest, tylko inny, niż zakładało zlecenie:**
> **16 z 42 pozycji niesie twierdzenie o produkcie i NIE PODAJE POD NIM ŻADNEGO
> przywołania.** Sprawdzano, czy przywołania są trafne; nikt nie liczył, ilu przywołań
> **nie ma**.

## 164.6 Klasa przewijająca się przez cały materiał — **werdykt o członie usuwanym, milczenie o zostającym**

> Werdykty raz po raz orzekają o **członie usuwanym** i milczą o **członie zostającym.**

Tak weszły m.in. `C-5`: „Świadectwo rejestruje **każdą** zmianę" i „Tarcza kontroluje
**etyczność**" — **obie bez wiersza, obie nieocenione**, bo uwaga panelu była na członie,
który wypada. Tak samo E-4, E-8, B-3.

**To jest bliźniak reguły KANONU** „zdanie, które ma być USUNIĘTE, wymaga tego samego
sprawdzenia pokrycia co dodawane" — **z drugiej strony**: zdanie, które ma ZOSTAĆ,
wymaga sprawdzenia tak samo, a nie dostaje go, bo nikt go nie rusza.

## 164.7 Kubeł R-D adwersarza A-1 — **przepisany bez łagodzenia**

Nie uruchomił żadnego testu ani bramki · **nie ma repozytorium aplikacji** (patrz §164.4) ·
otworzył **jeden z czterech** plików PNG · nie przeliczył ani jednej liczby znaków ·
nie zmierzył żadnego łańcucha ani podciągu · **nie przeczytał 18 plików autorskich,
`S2`, `S3`, ani `K1`/`K2`/`K3`** — więc może powtarzać cudze znalezisko, nie wiedząc o tym ·
liczby „24 ciągi", „9 ciągów" to rachunek klucz × 3 języki, **nie pomiar renderu**.

---

# 165. ADWERSARZ A-2 — SPRZECZNOŚCI I SIEĆ · **17 znalezisk, jedno obala przesłankę syntezy**

Raport: `scratchpad/tor9/ADW-2-SPRZECZNOSCI.md` (881 wierszy).
6 sprzeczności między pozycjami WCHODZI · 5 defektów łańcuchowych · 4 strażnicze ·
1 rozszerzenie klasy §155 · **1 wynik negatywny**.

## 165.1 Z-7 — **„dziewiąta noga łańcucha #1 w PL" NIE ISTNIEJE** znak w znak

Sprawdziłem osobiście, komendy i pełne wyniki:

```
grep -c  "Sprawdź, jak działa" src/i18n/messages/pl.json   → 8
grep -ci "sprawdź, jak działa" src/i18n/messages/pl.json   → 9
```

Dziewiąte trafienie, `pl.json:178`:
> `"zdanie": "Wybierz plan i `**`s`**`prawdź, jak działa Catherly w twojej codziennej pracy…"`

**Małą literą, wewnątrz zdania.** Pod jednostką „równość albo zawieranie znak w znak"
**noga nie istnieje**.

> ## **To jest §155 — strażnik pozorny — przeniesiony na MAPĘ ŁAŃCUCHÓW.**
> Ta sama wada narzędzia (dopasowanie bez rozróżniania wielkości liter), ten sam skutek
> (stan wygląda na pokryty), inny przedmiot: **nie strażnik, tylko przesłanka
> rozstrzygnięcia.**

**Dowód, że metoda jest nieużywalna, a nie tylko nieostrożna** — ta sama metoda,
zastosowana konsekwentnie:
```
grep -oi "team"              de.json | wc -l   → 38     ← „38 nóg łańcucha Team w DE"
grep -c  "Cancel at any time" en.json          → 2
grep -ci "cancel at any time" en.json          → 9      ← nieujawniona arność 9 w EN
```

## 165.2 Co się przewraca, a co stoi — **rozdzielone, bo to nie jest to samo**

| co | status |
|---|---|
| **BRZMIENIE pozycji A-2** (przyjęte przez właściciela) | **STOI** — jest prawdziwe, pokryte i rozstrzygnięte niezależnie od tej przesłanki |
| **UZASADNIENIE wyboru W3-A A-13** („jedyna, która nie rusza dziewiątej nogi") | **UPADA** — nogi nie ma |
| **Cofnięcie W2-A A-5 do autora** („kasuje dziewiątą nogę i nie deklaruje") | **UPADA jako powód.** Pozostałe trzy cofnięcia (F-1r, F-2r, F-3r) stoją — dotyczą innego łańcucha, zmierzonego inną drogą |
| **Arność łańcucha #1: PL 9 · EN 8 · DE 8** | **PL 9 → 8.** Do przeliczenia karta łańcucha |

> **Pozycja nie upada. Upada jej powód — i cofnięcie, które z tego powodu wynikło.**
> **Do rozstrzygnięcia właściciela: czy W2-A A-5 wraca do rozpatrzenia.**

**Arności całościowe A-2 zmierzył niezależnie: PL 23 / EN 23 / DE 22 — zgodnie z §139.1.**
Po wejściu pozycji: **DE 22 → 23** (B-1 zrasta pęknięcie z §139).

## 165.3 Z-1 — **`TO:12-13` zastosowane w dwie przeciwne strony w jednym komplecie**

**D-5** (`Cennik.faq.o4`) buduje z zastrzeżenia `TO:12-13` **kwalifikator** („póki masz
aktywny plan"). **E-5** (`FunkcjeWyniki.mod5_poco`) wchodzi z uzasadnieniem S1 §6.2,
że to zastrzeżenie **nie ma prawa** kwalifikować frazy wiersza: *„Gdyby unieważniało frazy
wierszy, unieważniałoby całą tabelę."*

> **Ten sam fakt — zabranie własnych danych — mówi po wejściu TRZY RÓŻNE RZECZY
> na sześciu kluczach.** Dwa z nich, **A-1 (pasek potwierdzeń, bez kwalifikatora)
> i D-5 (z kwalifikatorem), stoją NA JEDNEJ STRONIE `/cennik`.**

Synteza ostrzega wyłącznie przed przeklejeniem ogona na `/`; **paska nie wymienia ani razu.**

## 165.4 Z-8 — **D-Ł9 „DE BRAK i pozostaje BRAK" jest fałszem pod obiema jednostkami**

A-2 odtworzył jednostkę S2 (najdłuższy ciągły wspólny podciąg) i **zweryfikował ją wstecz
na 35/63/48 co do znaku**. Pod nią: `DlaKogo.s2_plan_2` × `Cennik.plany.growth.pozycja1`
= **PL 45→78 · EN 91 · DE 107**. **DE ma nogę najdłuższą z trzech.**
Pod jednostką zawierania z §52.1 nogi nie ma **w żadnym** języku.

> **Twierdzenie jest fałszywe pod OBIEMA kandydującymi jednostkami, w przeciwne strony —
> a synteza cofa cztery propozycje do autora dokładnie za tę wadę.**

## 165.5 Pozostałe, skrótem

| # | znalezisko |
|---|---|
| **Z-2** | D-7 „**od** planu Growth" ↔ C-2/F-1 „**W** planie Growth" — kod `TabelaPorownawcza.tsx:47` rozstrzyga, która forma odpowiada konstrukcji |
| **Z-3** | „Pulpit pokazuje" **odrzucone w B-3, wprowadzone w F-1** — oba na kryterium S3 |
| **Z-9** | P-2 deklaruje **trzy** nogi Ł-8, §2 dostarcza brzmienie dla **dwóch** → PL 74→0, EN 86→43, DE 92→52 |
| **Z-12** | **41 z 42 kluczy pod strażnikiem znak-w-znak**; koszt tej zależności nazwany w syntezie **raz** |
| **Z-13** | P-9 pomija `Cennik.faq.o3` → **`bramka:liczby` czerwona w trzech językach** |
| **Z-14** | **apostrof ASCII w 13 brzmieniach EN**, wobec **119× U+2019** w `en.json` |
| **Z-16** | **D-1+D-2 usuwają jedyne pokrycie `Cennik.tabela.zakres`** — klucza **warstwy czytnika** — we wszystkich trzech językach, **w ciszy** |

**Z-16 jest wariantem §150 wyprodukowanym przez naszą własną naprawę:** klucz warstwy
czytnika traci pokrycie **jako skutek uboczny dwóch pozycji, z których żadna go nie wymienia.**

## 165.6 Wynik negatywny — **frazy milczenia: zero naruszeń**

Komenda i pełny wynik w raporcie. **49 fraz, 42 pozycje, trzy języki — ani jednego
naruszenia.** Zapisuję jako wynik, nie jako brak wyniku: **arsenał zakazany nie przeciekł
do rundy drugiej ani razu**, i to jest drugie niezależne potwierdzenie po S3.

## 165.7 Przesłanka własna adwersarza, zadeklarowana przed właścicielem

> **„Moja najsłabsza przesłanka: że łańcuch znaczy równość albo zawieranie znak w znak.
> Jeśli właściciel orzeknie inaczej, Z-7 upada — ale wtedy natychmiast upada §139.1
> i cała mapa wymaga przeliczenia."**

**To jest wzorcowe postawienie sprawy** i przekazuję je bez zmiany: obie drogi mają cenę,
**żadna nie jest darmowa**, i wybór należy do właściciela.

## 165.8 Kubeł R-D adwersarza A-2

Nie uruchomił żadnego testu ani bramki · nie odtworzył `lint-deklaracje.mjs`, więc
**rozjazd deklaracji `zn` po 42 pozycjach jest niepoliczony** · **największa dziura:
nie prześledził klucz po kluczu 66 ciągów warstwy czytnika**, w szczególności pięciu
`spisEtykieta` i czterech `okruszkiAria`, **których strażnik wskazuje na CUDZY plik treści** —
konstrukcja podatna na §155 · nie zrobił skanu wszystkich par 42 pozycji przeciwko sobie,
tylko sześciu rodzin, które sam wybrał · **nie czytał raportów autorskich, werdyktów ani
K1/K2/K3 — nie twierdzi pierwszeństwa do żadnego znaleziska.**

---

# 166. ADWERSARZ A-3 — ODBIORCZYNI, ŚCIEŻKA, CZAS · **20 znalezisk, dwa obalają jednostki panelu**

Raport: `scratchpad/tor9/ADW-3-ODBIORCZYNI.md` (1246 wierszy).
Zakres zadeklarowany **przed** pomiarem: **42 pozycje / 112 ciągów** — nadzbiór zleconych.
*(Brief został w międzyczasie sprostowany z 34 na 42 niezależnie; A-3 zapisał kolejność
zdarzeń zamiast rościć sobie pierwszeństwo — odnotowuję, bo to jest właściwe zachowanie.)*

## 166.1 ARSENAŁ ODRZUCONY — **ZERO, i to jest wynik, nie brak wyniku**

Sześć wzorców ×112 ciągów → **28 trafień surowych, 28 z 28 adjudykowanych imiennie,
zero potwierdzonych.** Siatka wykazała czułość — złapała trzy tryby rozkazujące,
których brief nie zamawiał.

> **Trzecie niezależne potwierdzenie** (S3 · A-2 na frazach milczenia · A-3 na arsenale).
> **Zero zapisane z metodą, nie zawężeniem.**

## 166.2 CZAS — **tabela obietnic nie jest czytana przez NIC wykonywalnego**

Sprawdziłem osobiście:
```
grep -rn "tabela-obietnic" scripts/ e2e/ src/ .github/ package.json
  → scripts/lint-liczby.mjs:157   — i to jest KOMUNIKAT BŁĘDU, nie odczyt pliku
grep -rn "inwentarz-funkcji" scripts/ e2e/ src/ .github/ package.json
  → zero trafień
```

> ## **Jedyne źródło prawdy całego toru redakcyjnego — migawka aplikacji z 2026-08-09 —
> ## nie jest czytane przez żadną bramkę, żaden test i żaden skrypt. Istnieje wyłącznie
> ## jako dokument dla ludzi.**

Wszystkie 37 wchodzących brzmień ma **jeden wspólny warunek unieważnienia — zmianę
aplikacji — i nic tej zmiany nie obserwuje.** Żadne z nich nie ma daty ważności.

**Jedyna data wykonywalna w repozytorium** (`lint-tokeny.mjs:68`, `2026-08-31`, z komentarzem
„data jest strażnikiem, nie komentarzem") **pilnuje eksperymentu z krojem pisma.**

> **Mamy strażnika daty. Postawiliśmy go przy kroju pisma, a nie przy tabeli, na której
> stoi każde zdanie serwisu.**

Rodzina: **`cennik-snapshot.json` — jeden klucz `plany`, zero dat** (przy `facts.json`,
gdzie `data_pomiaru` jest formatem obowiązkowym), a bramka Stripe **nie ma `schedule` w CI**
(§156.2). **Trzy niezależne nośniki czasu, żaden nie obserwowany.**

## 166.3 WARSTWA CZYTNIKA — **23 klucze / 69 ciągów, nie 22 / 66** · i cztery ciągi bez pokrycia

**Inwentarz §144 zgubił `Obawy.naglowek`** („Sześć obaw" / „Six worries" / „Sechs Sorgen"),
bo **śledził KOMPONENTY, nie MIEJSCA WYWOŁANIA**: `Faq.tsx` ma **jedno `srOnly`
i DWA wywołania** (`page.tsx:132` → `Obawy.naglowek`; `cennik/page.tsx:49` →
`Cennik.faqNaglowek`). Policzyłem drugie, pierwsze przepadło.

```
Faq.tsx:27   <h2 id={idNaglowka} className={styles.srOnly}>{naglowek}</h2>
grep "Obawy.naglowek|Sześć obaw" 00-USTALENIA-TOR9.md   → 0 trafień na 7300 wierszach
```

> **Nowa odmiana klasy „liczba mierzy co innego, niż mówi jej nazwa": inwentarz warstwy
> liczony PER KOMPONENT jest niepełny o tyle, ile komponentów jest reużywanych.**
> To jest bliźniak reguły „audyt pokrycia liczy strażników PER JĘZYK, nigdy per klucz" —
> **ta sama wada, inny wymiar: per wywołanie, nigdy per komponent.**

**Skutek dla rozstrzygnięcia O-7, którego nikt nie postawił** — i to jest znalezisko własne:

> **`Obawy.naglowek` brzmi „SZEŚĆ obaw". Właściciel rozstrzygnął, że wchodzi SIÓDMA PARA.**
> Ciąg trzeba zmienić w trzech językach — **a nie widzi go żadna widząca czytelniczka.**
> Jest pilnowany (`e2e/zlozenie.spec.ts` + `scripts/lint-liczby.mjs`), więc **bramka liczb
> zapali się i wymusi zmianę.** Strażnik zadziała; nikt tego nie zaplanował.

**Cztery ciągi tej warstwy nie są pilnowane w żadnym języku — sprostowanie §150.4 wykonane
tam, na miejscu.** Pięć kluczy nie ma pokrycia w pliku treści w żadnym języku,
a `Cennik.tabela.zakres` ma pokrycie **pozorne** (§155 — trafienie w H1 strony, inne słowo
w innej roli).

## 166.4 DOSTĘPNOŚĆ NAPRAWY — **31 z 37 pozycji nie zmienia nic dla czytelniczki, która klika**

`Faq.tsx:32` `[STAN]`: `<details key={indeks}>` — **bez atrybutu `open`, czyli zwinięte
domyślnie.** Sześć pozycji WCHODZI renderuje się wewnątrz zapadki; siódma (D-3) jest
`display:none` w stanie domyślnym `/cennik`.

| pakiet | stan |
|---|---|
| **P-6** | **obie nogi** za zapadką **i** pod wyjściem |
| **P-7** („obie chwile muszą mieć tę samą odpowiedź") | **trzy nogi, żadnej widocznej** |

> **31 z 37 pozycji nie zmienia niczego dla czytelniczki, która wchodzi na `/`, czyta hero
> i klika „Cennik".** To jest III-A K-1 (§152.2) **pogłębione o drugą warstwę
> niedostępności: nie tylko POD wyjściem, ale POD ZAPADKĄ.**

## 166.5 A-3 **OBALA JEDNOSTKĘ K-1** — i wniosek K-1 przez to rośnie

```
Nawigacja.module.css:24-26   [STAN]
  .naglowek { position: sticky; inset-block-start: 0; }
```

> **Nagłówek jest przyklejony. Cztery wyjścia nawigacyjne stoją nad wszystkim ZAWSZE —
> więc kolumna NAD/POD zwraca dla nich stałą i nie mierzy niczego.**

**Ale merytoryczny wniosek K-1 przez to nie słabnie, tylko rośnie:** jeśli wyjście jest
dostępne **w każdej chwili**, to zdanie leżące poniżej jest niedostępne **nie względem
jednego przycisku, lecz względem całej trasy.** Propozycja warunku z §152.5 wymaga
przebudowy jednostki; **wniosek o dostępności naprawy stoi mocniej niż w oryginale.**

**Dwa obalenia jednostek w jednej rundzie** (Z-7 A-2 — jednostka łańcucha; NAD/POD A-3 —
jednostka ścieżki) **i w obu przypadkach wniosek przeżył obalenie swojej miary.**

## 166.6 Pozostałe, skrótem

| # | znalezisko |
|---|---|
| **A3-7** | **B-8 wnosi „30 minut"**, której własny rekord w `facts.json` mówi **„do weryfikacji w kodzie aplikacji"** — patrz `PRZEKAZANIE-TOR10.md`, pozycja pierwsza |
| **A3-8** | **bramki planów to ręcznie wpisana trójka boole'ów** (`TabelaPorownawcza.tsx:47-50`) — obok czterech liczb, dla których wymuszono import, źródło i datę. **Ta sama tabela, dwa reżimy dowodu** |
| **A3-10** | **cztery imiona jednej osoby na `/funkcje/zespol`**, pogłębione przez wejście B-4 |
| **A3-11** | **A-2 zajmuje jedyne `zdaniePrzed` w serwisie i wypełnia je rozkazem**, podczas gdy N-6 odrzucono innym brzmieniem **tym samym testem** |
| **A3-12** | **C-5 poszerza pytanie i zawęża odpowiedź** — a widoczna (w `summary`) jest **tylko połowa poszerzająca** |
| **A3-13** | **P-1 ujednolicił wielkość litery, nie sprawstwo** — 3 z 9 ciągów zaczyna zdanie od narzędzia |
| **A3-19** | **jedyne miejsce, gdzie serwis mówi „obietnica zarobków", to `alt` słyszany wyłącznie przez osobę niewidomą** — ten sam ciąg co SR-01 A-1 (§164.2), znaleziony niezależnie z drugiej strony |

## 166.7 Kubeł R-D adwersarza A-3 — 13 pozycji

Zero uruchomionych testów i bramek · zero dostępu do kodu aplikacji ·
**zero czytników ekranu — cała ocena warstwy czytnika to ODCZYT, nie ODSŁUCH** ·
zero weryfikacji językowej EN/DE · zero pomiarów `len()` i łańcuchów ·
**brak danych o ruchu** (`grep analytics|plausible|gtag` → 0), więc wybór tras jest
**wyborem, nie pomiarem** · nie przejrzał wszystkich 21 `*.module.css` · nie oceniał
20 pozycji NIE WCHODZI ·
> **„Wsad zmieniał się w trakcie pomiaru — moje cytaty z syntezy i kanonu mogą być
> historią, nie stanem."**

To ostatnie zdanie jest **wykonaniem dzisiejszej reguły KANONU przez adwersarza na własnym
raporcie** i przekazuję je bez zmiany.

---

# 167. JEDNOSTKA ŁAŃCUCHA ROZSTRZYGNIĘTA — **równość znak w znak. Zawieranie: osobna kategoria**

> **Powód D-D9 był jeden: żeby nie powstał CZWARTY WARIANT tej samej obietnicy.
> Wariant powstaje wtedy, gdy dwa miejsca mówią to samo INACZEJ. Zdanie zawierające
> cudze zdanie jako podciąg nie jest jego wariantem — jest zdaniem dłuższym, które może
> się zmienić bez rozbijania krótszego.**
> **Zawieranie zostaje jako RELACJA PODCIĄGOWA, osobna kategoria: nie wiąże brzmienia,
> ale wymaga sprawdzenia przy zmianie dłuższego zdania. Autor zmieniający zdanie
> zawierające musi wiedzieć, że w środku siedzi cudzy ciąg — i to jest wszystko,
> czego od tej relacji wymagam.** (rozstrzygnięcie właściciela, 2026-08-21)

**Skutki, wprost:**
- **Z-7 UPADA.** Dziewiąta noga łańcucha #1 w PL nie była nogą **i nie jest brakiem** —
  była trafieniem w podciąg, a podciąg nie wiąże brzmienia.
- **§139.1 STOI.** Mapa **nie wymaga przeliczenia** — wymaga **rozdzielenia na dwie kolumny.**

## 167.1 Rozdzielenie wykonane — pomiar z zadeklarowaną jednostką

**Jednostki zadeklarowane przed pomiarem, z wyłączeniami wbudowanymi:**
- **ŁAŃCUCH (równość):** zbiór **≥2** kluczy `messages` w **jednym** języku o wartościach
  **identycznych znak w znak**. *W1: porównanie z rozróżnieniem wielkości liter — to właśnie
  ono obala Z-7. Bez progu długości (§139.1: łańcuch jest łańcuchem niezależnie od długości).*
- **RELACJA PODCIĄGOWA:** para (K1, K2), K1 ≠ K2, wartość K1 jest **właściwym podciągiem** K2.
  *W2: długość K1 ≥ 20 znaków — bez tego wyłączenia powstaje „38 nóg Team w DE" (§165.1).
  W3: pary już objęte łańcuchem równości nie liczą się jako relacja.*

| język | **ŁAŃCUCHY (równość)** | kluczy objętych | **RELACJE PODCIĄGOWE** |
|---|---|---|---|
| **PL** | **23** | 75 | **5** |
| **EN** | **23** | 75 | **4** |
| **DE** | **22** | 73 | **7** |

> **PL 23 · EN 23 · DE 22 — zgodnie z §139.1, co do jednego.** Rozstrzygnięcie właściciela
> **potwierdziło mapę, zamiast ją przewrócić.** *(Dla porównania: ten sam pomiar z odziedziczonym
> progiem 12 znaków daje 20/20/19 — czyli dokładnie liczby, które §139.1 unieważnił.)*

## 167.2 Druga kolumna — komplet relacji podciągowych

| # | krótszy (podciąg) | dłuższy (zawierający) | pl | en | de |
|---|---|---|---|---|---|
| **R-1** | `Cennik.plany.pro.pozycja4` „Czysty eksport…" | `DlaKogo.s3_plan_3` | ✓ | ✓ | ✓ |
| **R-2** | `Filary.filar4.korzysc` = `FunkcjeWyniki.zdanie` „Pulpit pokazuje…" | `FunkcjeIndeks.blok4Wprowadzenie` | ✓ | ✓ | ✓ |
| **R-3** | `FunkcjePozyskiwanie.mod7_nazwa` „DMO — Dzienny Plan Działania" | `Cennik.plany.starter.pozycja2` | ✓ | — | ✓ |
| **R-4** | `FunkcjePozyskiwanie.mod1_nazwa` „Formularz z publiczną stroną" | `Cennik.plany.starter.pozycja3` | — | ✓ | ✓ |
| **R-5** | `FunkcjeWyniki.mod3_nazwa` „Cel z kamieniami milowymi" | `Filary.filar4.konkret2` | ✓ | — | ✓ |
| **R-6** | `FunkcjeZespol.mod2_nazwa` „Zatwierdzanie treści zespołu" | `DlaKogo.s3_robi_1` | — | ✓ | ✓ |
| **R-7** | `FunkcjePozyskiwanie.mod2_nazwa` „Kalendarz z przypomnieniami" | `DlaKogo.s1_robi_1` | — | — | ✓ |
| **R-8** | `Cennik.faq.o4` „Eksportujesz kontakty do vCard…" | `Obawy.o3` | ✓ | — | — |

**Trzy obserwacje z tego zestawienia — i żadnej nie było w mapie jednokolumnowej:**

1. **Tylko DWIE relacje istnieją we wszystkich trzech językach** (R-1, R-2). Pozostałe sześć
   jest **językowo asymetrycznych** — a asymetria relacji podciągowej **nie jest defektem**
   (inaczej niż asymetria łańcucha), bo relacja nie wiąże brzmienia.
2. **DE ma ich najwięcej (7), EN najmniej (4).** Powód jest gramatyczny, nie redakcyjny:
   niemieckie nazwy modułów są rzeczownikowe i wchodzą w zdania bez odmiany.
   **Poprzednia mapa liczyła to jako pęknięcia łańcucha.**
3. **Pięć z ośmiu relacji to NAZWA MODUŁU wewnątrz dłuższego zdania** (R-3…R-7). To jest
   dokładnie klasa, o której mówi rozstrzygnięcie: *autor zmieniający zdanie zawierające
   musi wiedzieć, że w środku siedzi cudzy ciąg.*

## 167.3 Deklaracja najsłabszej przesłanki przed decyzją — **wzorcowe**

> **A-2 zadeklarował tę przesłankę PRZED rozstrzygnięciem: „że łańcuch znaczy równość albo
> zawieranie znak w znak. Jeśli właściciel orzeknie inaczej, Z-7 upada — ale wtedy upada
> §139.1 i cała mapa wymaga przeliczenia."**
>
> **Deklaracja najsłabszej przesłanki przed decyzją właściciela jest dokładnie tym, czego
> brakowało przy WSZYSTKICH moich dzisiejszych obaleniach.** (właściciel, 2026-08-21)

**Uwaga wykonawcza:** A-2 podał obie drogi i obie ceny, **ale cena drugiej okazała się
przeszacowana** — mapa nie wymagała przeliczenia, bo jednostka równości daje te same
23/23/22. **To nie osłabia wzorca:** adwersarz podał najgorszy możliwy skutek własnego
błędu, a nie najkorzystniejszy. **Przeszacowanie własnej ceny jest właściwą stroną,
w którą wolno się mylić.**

**Nie dopisuję tego do KANONU bez słowa właściciela** — polecenie brzmiało „odnotuj jako
wzorcowe", nie „do kanonu". **Rekomenduję jako regułę**, bo dotyczy każdego przyszłego
adwersarza i każdego sędziego, nie tego jednego raportu.

---

# 168. NAPRAWA USUWAJĄCA POKRYCIE, KTÓREGO NIE WYMIENIA — **klasa, i to my ją popełniliśmy**

> **Wynieś ponad pozostałe.** D-1+D-2 usuwają jedyne pokrycie klucza warstwy czytnika,
> we wszystkich trzech językach, **W CISZY** — żadna z pozycji go nie wymienia.
> (właściciel, 2026-08-21)

## 168.1 Klasa

> ## **NAPRAWA USUWAJĄCA POKRYCIE, KTÓREGO NIE WYMIENIA.**
> Pozycja zmienia albo usuwa ciąg, który jest **JEDYNYM pokryciem innego klucza** —
> i o tym innym kluczu nie mówi ani słowa. Skutek: **klucz traci strażnika bez śladu
> w żadnym dokumencie**, bo dokument mówi o zmianie, a nie o jej cieniu.

**To jest ta sama figura co „inwentarz przed cięciem", przeniesiona z kodu na treść.**
I to my ją popełniliśmy — **w rundzie, która ją nazwała.**

## 168.2 WARUNEK WIĄŻĄCY WSZYSTKIE POZYCJE

> **Przed wejściem KAŻDEJ pozycji sprawdź, czy usuwa albo zmienia ciąg będący JEDYNYM
> pokryciem innego klucza. Jeśli tak — pozycja wymienia to wprost albo nie wchodzi.**

**Zgłoszenie zakresu zamiast cichego rozszerzenia (KANON — rozstrzygnięcie z liczbą miejsc):**
właściciel napisał **„dla wszystkich 34 pozycji"**. Na aktualnym pomiarze pozycji jest **42**
(§164.1, sprostowane po X-4). **Warunek stosuję do 42 i melduję to zamiast wykonać po cichu.**

## 168.3 Drugie wystąpienie tej samej klasy — wskazane przez właściciela

> **Synteza niewymieniająca paska potwierdzeń przy dwóch z sześciu kluczy rodziny `TO:12-13`
> — to samo.** (Z-1, §165.3)

Synteza ostrzega przed przeklejeniem ogona na `/` i **ani razu nie wymienia paska**,
choć `Cennik.potwierdzenie2` (A-1) i `Cennik.faq.o4` (D-5) stoją **na jednej stronie**
i po wejściu mówią o tym samym fakcie **co innego**.

**Wspólny mechanizm obu wystąpień:** pozycja jest opisana **przez to, co zmienia**,
a nie przez **to, czego dotyka**. Dopóki jednostką opisu jest zmiana, cień zmiany
nie ma gdzie się zapisać.

---

# 169. Z-1 ROZSTRZYGNIĘTE — **zastrzeżenie `TO:12-13` NIE kwalifikuje frazy wiersza**

> **Wchodzi E-5. D-5 do przerobienia.**
> **Powód:** kwalifikator zbudowany z zastrzeżenia **przenosi ostrożność tabeli do treści,
> a tabela jest dokumentem wewnętrznym. Klientka ma dostać twierdzenie albo jego brak,
> nie nasze wahanie.** (właściciel, 2026-08-21)

**To rozstrzyga spór, w którym obie strony miały rację cząstkową:** S1 §6.2 („gdyby
unieważniało frazy wierszy, unieważniałoby całą tabelę") był poprawny co do logiki;
D-5 był poprawny co do ostrożności. **Właściciel rozstrzygnął nie logiką i nie ostrożnością,
lecz ADRESATEM: zastrzeżenie jest nasze, nie jej.**

**Zdanie do zapamiętania, bo jest szersze niż ta pozycja:**
> **Klientka ma dostać twierdzenie albo jego brak, nie nasze wahanie.**

Sześć kluczy rodziny: **E-5 wchodzi bez zmian · D-5 do przerobienia · A-1, C-4, D-4
do sprawdzenia pod tym samym kątem** (czy któryś nosi kwalifikator zbudowany
z zastrzeżenia).

---

# 170. W2-A A-5 — **wraca do rozpatrzenia**, i reguła, która z tego wynika

> **Powód cofnięcia upadł, więc cofnięcie upada razem z nim.** Rozpatrz ponownie
> na nowej przesłance (**arność PL 9 → 8**) i na nowej jednostce łańcucha.
> **Trzy pozostałe cofnięcia stoją** — dotyczą innego łańcucha. (właściciel, 2026-08-21)

## 170.1 Reguła — do KANONU, na polecenie właściciela

> ## **POWÓD UPADŁY UNIEWAŻNIA DECYZJĘ, KTÓRA Z NIEGO WYNIKŁA — NAWET JEŚLI DECYZJA
> ## NADAL WYGLĄDA SŁUSZNIE.**
> Inaczej zostaje **rozstrzygnięcie bez uzasadnienia, którego nikt później nie umie obronić.**

**Zastosowanie dzisiaj, obie strony:**
- **W2-A A-5** — cofnięcie **upada**, bo jego jedynym powodem była dziewiąta noga.
- **Brzmienie pozycji A-2** — **stoi**, bo ma **własne** uzasadnienie (pokrycie, przycięcie
  W-4, zbieżność trzech metod na członie „Niczym się nie wiążesz"), niezależne od nogi.
  **Upadł jeden z jego powodów, nie wszystkie.**

> **Różnica jest cała w tym, czy powód był JEDYNY.** Reguła nie każe przewracać wszystkiego,
> czego dotknął upadły argument — każe **sprawdzić, co zostaje po jego odjęciu**, i przewrócić
> to, po czym nie zostaje nic.

---

# 171. FRAZY MILCZENIA — **wynik, nie brak znaleziska**

> **49 fraz × 42 pozycje × 3 języki → ZERO naruszeń.** (A-2, Z-17 — komenda i pełny wynik
> w raporcie)

**Drugie niezależne potwierdzenie po S3**, trzecie licząc arsenał odrzucony u A-3 (§166.1,
28 z 28 trafień surowych adjudykowanych imiennie, zero potwierdzonych).

> **Zapisane jako WYNIK, na polecenie właściciela — nie jako brak znaleziska.**
> Trzy niezależne metody, trzy rozłączne zestawy wzorców, trzej wykonawcy, którzy się
> nie widzieli. **Arsenał zakazany nie przeciekł do rundy drugiej ani razu.**

To jest jedyne twierdzenie w całym torze, które ma **trzy niezależne potwierdzenia
i zero kontrprzykładów** — i dlatego jest jedynym, o którym wolno powiedzieć „sprawdzone",
bez kubła R-D obok.

---

# 172. KARTA ŁAŃCUCHÓW ZAŁOŻONA JAKO PLIK — `docs/redakcja/KARTY-LANCUCHOW.md`

**§89 żądał karty łańcucha od 2026-08-20 i przez cały tor nie powstał PLIK** — karta żyła
w sekcjach raportu. **Założona, bo materiał roboczy, który ma przeżyć jedną wymianę,
jest plikiem** (KANON). Niesie obie kolumny, obie jednostki z wyłączeniami, komplet
23 łańcuchów i 8 relacji, oraz **wzór karty pozycji z polem `DOTYKA`**.

**Trzy ustalenia o relacjach — do wsadu autorów, na polecenie właściciela:**

1. **Asymetria relacji NIE jest defektem.** *„Poprzednia mapa liczyła to jako pęknięcia —
   czyli mieliśmy fałszywe pozycje."* (właściciel) **To jest twierdzenie o naszym
   dotychczasowym rejestrze, nie o serwisie**: pozycje opisujące „pęknięcie łańcucha"
   tam, gdzie chodzi o relację podciągową, były pozycjami bez przedmiotu.
2. **Przewaga DE (7 wobec 5 i 4) ma powód gramatyczny:** niemieckie nazwy modułów są
   rzeczownikowe i wchodzą w zdania bez odmiany; polska nazwa się odmienia i przestaje
   być podciągiem. **Nie jest to różnica jakości przekładu.**
3. **Pięć z ośmiu relacji to nazwa modułu wewnątrz dłuższego zdania** —
   > **i to trafiło do KARTY, nie do raportu, bo jest operacyjne:
   > autor zmieniający zdanie zawierające ma wiedzieć, że w środku siedzi cudzy ciąg.**

**Porównanie z progiem 12 (20/20/19) zostawione w dokumencie** na polecenie właściciela —
jako dowód, że **§139.1 unieważnił właściwe liczby**.

---

# 173. ZAKRES 34 → 42 — **drugie wystąpienie §37.3 po mojej stronie**

> **„To jest §37.3 zastosowane beze mnie. Odnotuj jako drugie wystąpienie po Twojej
> stronie."** (właściciel, 2026-08-21)

**Pierwsze:** §148 — rozstrzygnięcie „przepisujemy jedno zdanie, nie trzy" zapadło przy
trzech widocznych nogach; przeliczenie dało piętnaście, **zgłoszone, nie rozszerzone po cichu.**

**Drugie:** warunek §168 wydany „dla wszystkich 34 pozycji"; aktualny pomiar daje **42**.
Zastosowany do 42 **z meldunkiem**, a dla pozostałych 40 pozycji wpisany **kubeł R-D
zamiast deklaracji zgodności** — bo sprawdzenia nie wykonałem.

**Różnica między tymi dwoma wystąpieniami jest istotna i zapisuję ją:** pierwsze rozszerzało
zakres **naprawy**, drugie rozszerza zakres **warunku**. Drugie jest groźniejsze, bo warunek
zastosowany do większego zbioru **wygląda na wykonany**, dopóki nikt nie zapyta, na ilu
pozycjach go faktycznie sprawdzono. **Stąd kubeł R-D obok, a nie samo zgłoszenie.**

---

# 174. Z-1 — KRYTERIUM NA PRZYSZŁOŚĆ: **czyje jest zastrzeżenie**

> **„«Rozstrzygnąłeś nie logiką i nie ostrożnością, tylko adresatem» to jest trafniejszy
> opis mojej decyzji niż mój własny. Zapisz go, bo daje kryterium na przyszłość."**
> (właściciel, 2026-08-21)

> ## **PRZY SPORZE MIĘDZY POPRAWNOŚCIĄ A OSTROŻNOŚCIĄ PYTAMY, CZYJE JEST ZASTRZEŻENIE.**

Zastrzeżenie **nasze** (tabela obietnic, inwentarz, rejestry, wątpliwość panelu) **nie
przechodzi do treści**. Zastrzeżenie **jej** (granica funkcji, warunek, którego ona
doświadczy) **przechodzi i musi przejść**.

> **Klientka ma dostać twierdzenie albo jego brak, nie nasze wahanie.**

**Kryterium rozstrzyga spory, w których obie strony mają rację cząstkową** — a takich
w tym torze było wiele. S1 miał rację co do logiki (zastrzeżenie nie może kwalifikować
frazy wiersza, bo unieważniłoby całą tabelę); D-5 miał rację co do ostrożności.
**Żadne z tych dwóch nie rozstrzygało. Rozstrzygnął adresat.**

## 174.1 A-1, C-4, D-4 sprawdzone pod tym kątem — **wynik: czyste, tylko D-5 nosi kwalifikator**

Metoda i jej własna wpadka, zapisana (KANON — rozbieżność jest sygnałem o narzędziu):
skan wąskim wzorcem **przeoczył wersję EN D-5** („while your plan is active" — wzorzec
miał „while you have"). **Wzorzec poszerzony, przebieg powtórzony:** 16 trafień surowych,
**adjudykowane imiennie**, z tego 15 fałszywych (nazwa funkcji „aktywne kontakty" ×6,
„while you do the talking", „kiedy chcesz").

| pozycja | brzmienie | kwalifikator z `TO:12-13` |
|---|---|---|
| **A-1** `Cennik.potwierdzenie2` | „Kontakty eksportujesz do vCard, historię aktywności do CSV" | **NIE — czysta** |
| **C-4** `Obawy.o3` | „Rezygnujesz kiedy chcesz. Kontakty zabierasz jako vCard, historię aktywności jako CSV." | **NIE — czysta** |
| **D-4** `Cennik.faq.o3` | „Rezygnujesz kiedy chcesz. Nie musisz podawać powodu. Plan miesięczny…" | **NIE — czysta** *(nosi inne zarzuty: P-11, P-12, Z-13)* |
| **D-5** `Cennik.faq.o4` | „…— **póki masz aktywny plan**" · „**while your plan is active**" · „**solange dein Plan aktiv ist**" | **TAK, ×3 języki — do przerobienia** |

> **Rodzina niesie kwalifikator w JEDNYM miejscu, nie w czterech.** Zarzut A-2 (Z-1) był
> trafny co do sprzeczności i **za szeroki co do zasięgu**: sprzeczność jest między D-5
> a E-5, a nie „na sześciu kluczach".

---

# 175. WZORZEC DOWODU — **kształt, którego wymagamy przy każdym „sprawdzone"**

> **„Trzy drogi, brak kontaktu, zero kontrprzykładów. Wszystko poniżej tego progu nosi R-D."**
> (właściciel, 2026-08-21 — do KANONU)

| warunek | co znaczy | czego NIE wystarcza |
|---|---|---|
| **TRZY DROGI** | trzy **niezależne metody** | trzy przebiegi jednej metody · trzy osoby z tym samym skryptem |
| **BRAK KONTAKTU** | wykonawcy **nie widzieli** nawzajem swoich wyników | jeden czytający raport drugiego, choćby po fakcie |
| **ZERO KONTRPRZYKŁADÓW** | ani jednego trafienia w żadnej z dróg | „trafienia były, ale wszystkie odrzucone" — to jest wynik z adjudykacją, nie zero |

**Spełniony w tym torze DOKŁADNIE RAZ:** arsenał odrzucony i frazy milczenia —
**S3** (odczyt redakcyjny) · **A-2** (49 fraz × 42 pozycje × 3 języki, wzorzec podciągowy) ·
**A-3** (sześć wzorców regex × 112 ciągów, 28 trafień surowych, 28 z 28 adjudykowanych
imiennie, zero potwierdzonych).

> **Trzej wykonawcy, trzy rozłączne metody, żaden nie widział pozostałych, zero
> kontrprzykładów w każdej z dróg.**

**Uwaga, którą wzorzec sam na siebie nakłada:** droga A-3 miała 28 trafień surowych.
**Trafienie surowe odrzucone imiennie nie jest kontrprzykładem** — jest wynikiem
adjudykacji. Gdyby choć jedno przeszło adjudykację, wzorzec **nie byłby spełniony**
i twierdzenie nosiłoby R-D.

**Konsekwencja dla całej reszty toru:** **każde inne twierdzenie w tym dokumencie
nosi R-D** — łącznie z tymi, które sprawdziłem osobiście, bo sprawdzenie przez jedną
osobę jedną metodą **nie jest trzema drogami.**

---

# 176. AUDYT REJESTRU PĘKNIĘĆ — **pierwszy audyt tego toru wymierzony w NASZ REJESTR, nie w produkt**

> **Pozycja opisująca pęknięcie tam, gdzie jest relacja podciągowa, jest POZYCJĄ BEZ
> PRZEDMIOTU.** (właściciel, 2026-08-21)
> **Zadanie: policz, ile pozycji rejestru opisuje „pęknięcie łańcucha", i przy każdej
> sprawdź, czy dotyczy równości czy relacji. Te drugie wykreśl z podaniem powodu —
> NIE KASUJ PO CICHU.**

**Jednostka pomiaru zadeklarowana przed skanem:** *pozycja dokumentu, która twierdzi
o konkretnym ciągu, że **pękł, rozszedł się albo przestał być powtórzeniem** w którymś
z trzech języków.* Wyłączenie wbudowane: zdania o pękaniu w trybie ogólnym („do tej pory
zakładaliśmy, że łańcuchy pękają w przekładzie") **nie są pozycjami** — nie wskazują ciągu.

**Skan:** `grep -rn "pęknię|pęka|pęknie"` po `00-USTALENIA-TOR9.md` i obu rejestrach →
**22 trafienia w jednym pliku, 0 w rejestrach.** Adjudykowane imiennie → **pięć pozycji.**

## 176.1 Wynik — **pięć pozycji, z tego JEDNA do wykreślenia**

| poz. | co twierdzi | jednostka, do której należy przedmiot | werdykt |
|---|---|---|---|
| **§82 / §80.2** | `Filary.filar1.korzysc` = `FunkcjePozyskiwanie.zdanie` **pękł w DE** | **RÓWNOŚĆ** — to jest **Ł15** karty, ✓pl ✓en **—de** | **STOI.** Pęknięcie prawdziwe, wiążące brzmienie |
| **§111** | **Ł-4** „Rezygnujesz kiedy chcesz." **pękł w DE** (inny szyk) | **ŻADNA Z DWÓCH** — patrz §176.2 | **DO ROZSTRZYGNIĘCIA — nie wykreślam** |
| **§52.2 / w. 1890–1894** | **Ł-3 istnieje wyłącznie w PL — „EN i DE JUŻ SIĘ ROZESZŁY"** | **RELACJA PODCIĄGOWA** (`Cennik.faq.o4` ⊂ `Obawy.o3` = **R-8**, wyłącznie PL) | **~~WYKREŚLONA~~ — pozycja bez przedmiotu** |
| **§117.2** | „czwarte pęknięcie DE" | **artefakt narzędzia** (`autojunk` biblioteki) | **już wycofana 2026-08-21**, przed tym audytem |
| **§125.3** | wiersz klasy „łańcuch pęka w jednym języku: §82 · §111" | rejestr klasy, nie pozycja własna | **korygowany wraz z §111** |

## 176.2 ~~`Ł-3` — wykreślenie~~ · **WYKREŚLENIE COFNIĘTE 2026-08-21 — patrz §178.0**

> ## ⚠ **TA SEKCJA JEST NIEAKTUALNA OD CHWILI ROZSTRZYGNIĘCIA O KLASIE 3.**
> `Ł-3` **NIE jest pozycją bez przedmiotu.** Pod jednostką trzykolumnową jest
> **łańcuchem zdaniowym, który WIĄŻE BRZMIENIE**, i jest **PĘKNIĘTY w EN i DE**.
> Wykreślenie było poprawne wobec jednostki obowiązującej w chwili wykreślania
> i fałszywe po rozstrzygnięciu, które zapadło w tej samej wymianie.
> **Zapis poniżej zostaje jako ślad rozumowania — nie jako obowiązujący werdykt.**

### ~~Uzasadnienie wykreślenia (nieobowiązujące)~~

**Zapis pierwotny** (`00-USTALENIA-TOR9.md:1890`) `[STAN dokumentu]`:
> „**Łańcuch Ł-3 istnieje WYŁĄCZNIE w PL** — EN i DE **już się rozeszły**"
> …z tabelą stawiającą **NIE** w kolumnach EN i DE.

**Powód wykreślenia.** `Ł-3` nie jest łańcuchem równości i nigdy nim nie był:
`Cennik.faq.o4` (80 zn) jest **podciągiem** `Obawy.o3` (106 zn) — to relacja **R-8**
karty łańcuchów. **Relacja nie wiąże brzmienia**, więc jej nieobecność w EN i DE
**nie jest rozejściem się.** Sformułowanie „już się rozeszły" opisuje **defekt, którego
nie ma**, i stawia **NIE** tam, gdzie właściwą wartością jest **„relacja nieobecna —
bez skutku"**.

> **To jest przypadek, który właściciel przewidział: asymetria relacji policzona jako
> pęknięcie. JEDEN, nie kilka.**

**Ł-5, Ł-6, Ł-7 są czyste** — dokument nazywa je **relacjami** już w §80.3 (w. 3522:
„Cztery relacje z §52.1 (Ł-3, Ł-5, Ł-6, Ł-7)") i **nie twierdzi o żadnej z nich,
że pękła.** Ł-3 wypadł z tej ostrożności **jeden raz, w §52.2, i tam został.**

**Granica własnego pomiaru, zapisana:** `Ł-6` („Sala Treningowa", 15 znaków) **leży poniżej
progu 20 znaków** z wyłączenia W2 karty łańcuchów — więc **nie jest w moim zestawieniu
ośmiu relacji**. Nie twierdzę o nim nic; **wyłączenie zadeklarowałem przed pomiarem
i nie zmieniam go po wyniku.**

## 176.3 `Ł-4` — **przedmiot spoza obu jednostek. Nie wykreślam, pytam**

Pomiar, komenda i pełny wynik:
```
„Rezygnujesz kiedy chcesz."          → PEŁNA WARTOŚĆ w ZERO kluczy · PODCIĄG w: Cennik.faq.o3, Obawy.o3
„You can cancel whenever you like."  → PEŁNA WARTOŚĆ w ZERO kluczy · PODCIĄG w: Cennik.faq.o3, Obawy.o3
„Du kündigst, wann du willst."       → PEŁNA WARTOŚĆ w ZERO kluczy · PODCIĄG w: Cennik.faq.o3, Obawy.o3
```

**`Ł-4` nie jest łańcuchem równości** (nie jest pełną wartością żadnego klucza)
**ani relacją podciągową** (żaden z tych kluczy nie zawiera się w drugim — dzielą
wspólny **fragment**). Należy do **trzeciej klasy, którą §80.3 już nazwał i której
liczność jest NIEZNANA: łańcuchy zdaniowe — powtórzenia na poziomie ZDANIA wewnątrz ciągu.**

**§111 pomyliło się co do nazwy** („Ł-4 leży w rodzinie **podciągowej**") — pod dzisiejszą
jednostką **nie leży**. Ale **nie wykreślam pozycji**, bo:

> **Uzasadnienie rozstrzygnięcia właściciela obejmuje ten przypadek, a jego litera nie.**
> Powodem D-D9 jest to, że „wariant powstaje, gdy dwa miejsca mówią to samo INACZEJ".
> `Cennik.faq.o3` i `Obawy.o3` mówią to samo zdanie — **w DE mówią je innym szykiem.**
> To **jest** czwarty wariant tej samej obietnicy, choć nie jest pęknięciem łańcucha.

**PYTANIE DO WŁAŚCICIELA (jedyne z tego audytu):**
> **Czy klasa „łańcuch zdaniowy" — wspólne ZDANIE wewnątrz dwóch dłuższych ciągów —
> wiąże brzmienie tak jak równość, czy tylko wymaga sprawdzenia jak relacja?**
> Od odpowiedzi zależy status §111 i **liczność klasy, której nikt nie zmierzył.**

## 176.4 Co ten audyt mówi o samym rejestrze

**Przewidywanie właściciela („mieliśmy fałszywe pozycje") potwierdzone — i węższe,
niż mogło być: jedna pozycja z pięciu.** Zapisuję obie strony, bo obie są wynikiem:

- **Rejestr wypadł lepiej, niż zakładała hipoteza.** Ostrożność §80.3 (nazwanie czterech
  pozycji „relacjami") **zadziałała dla trzech z czterech.**
- **Ale zadziałała jako ZWYCZAJ, nie jako mechanizm.** Nic nie pilnowało, żeby Ł-3
  dostał tę samą etykietę co Ł-5, Ł-6 i Ł-7 — dostał ją w §80.3 i **stracił w §52.2**,
  bo tam pisał kto inny, w innym celu. **Zwyczaj z dobrym powodem chroni do pierwszego
  autora, który tego powodu nie zna.**

---

# 177. CZTERY POWIĄZANIA ZAPISANE NA POLECENIE WŁAŚCICIELA

## 177.1 „Trafna co do zagrożenia, chybiona co do miejsca" — **P-17 po stronie adwersarza**

> Zarzut A-2 (Z-1) był **trafny co do sprzeczności i za szeroki co do zasięgu**:
> sprzeczność jest między **D-5 a E-5**, a nie „na sześciu kluczach". Pomiar: kwalifikator
> zbudowany z `TO:12-13` stoi w **jednym** brzmieniu (D-5, ×3 języki); A-1, C-4 i D-4
> są czyste (§174.1).

**To jest dokładnie P-17 — klasa nazwana przez adwersarza A-1 dla propozycji autorskich —
wystąpiła po stronie ADWERSARZA.** Zapisuję powiązanie, bo klasa okazuje się szersza,
niż miejsce, w którym ją znaleziono:

> ## **TRAFNA CO DO ZAGROŻENIA, CHYBIONA CO DO MIEJSCA — dotyczy autorów, sędziów
> ## I ADWERSARZY jednakowo.**
> Ostrzeżenie jest prawdziwe; jego **zasięg** jest pomiarem, i tak samo podlega regule
> o deklarowaniu jednostki. **Zarzut z liczbą miejsc bez pomiaru tych miejsc jest
> ostrzeżeniem, nie zarzutem.**

## 177.2 Pole `DOTYKA` — **siódme wystąpienie wzorca „stan zły niewyrażalny"**

> *„Pole puste dopuszczalne wyłącznie jako «sprawdzone, nic»; brak pola znaczy,
> że pozycja nie wchodzi"* — **to jest właściwa konstrukcja: stan zły NIEWYRAŻALNY,
> nie błąd do wykrycia.** (właściciel, 2026-08-21)

**Siódme wystąpienie wzorca w tym torze.** Wzorzec: zamiast pilnować, żeby ktoś czegoś
nie zapomniał, **konstruujesz formę, w której zapomnienie nie ma jak się zapisać.**
Tu: nie ma stanu „pozycja weszła bez sprawdzenia relacji" — jest albo `DOTYKA` wypełnione,
albo pozycja poza listą.

## 177.3 Zakres 34 → 42 — **strażnik istnienia po stronie WARUNKU, nie bramki**

> **Warunek zastosowany do większego zbioru WYGLĄDA na wykonany, dopóki nikt nie zapyta,
> na ilu pozycjach faktycznie go sprawdzono.**

**Powiązanie, na polecenie właściciela:** to jest **nowa odmiana klasy „strażnik istnienia
czytany jako strażnik pokrycia"** (§157.1, §164.2) — dotąd znana wyłącznie po stronie
**narzędzia** (`axe` bada niepustość · `zrzuty-filarow.spec.ts` bada różność).

| gdzie | co istnieje | co się z tego czyta |
|---|---|---|
| `axe` — `document-title` | tytuł **jest niepusty** | „tytuły są pokryte" |
| `zrzuty-filarow.spec.ts` | alt **jest niepusty i różny** | „alty są prawdziwe" |
| **warunek §168** | warunek **jest wydany** | **„warunek jest spełniony na 42 pozycjach"** |

> **Trzecia odmiana jest najgroźniejsza, bo nie ma nawet zielonego komunikatu, który
> dałoby się zakwestionować — ma tylko zapis, że warunek obowiązuje.**
> Stąd kubeł R-D przy 40 pozycjach, a nie samo zgłoszenie zakresu.

## 177.4 Karta łańcuchów — **„była cytowana, nie przechowywana"**

> **§89 żądał karty od 2026-08-20 i przez cały tor nie powstała. Karta żyła w sekcjach
> raportu — czyli była CYTOWANA, NIE PRZECHOWYWANA. Ta sama przyczyna, przez którą
> zginął fundament sześciu tras.** (właściciel, 2026-08-21)

**Drugie wystąpienie tej samej przyczyny, z §74:** raport `/cennik` przetrwał, **bo
zapisałem go do pliku — chciałem go cytować**; fundament sześciu tras nie przetrwał,
**bo był tylko omówiony**.

> **Mechanizm jest jeden: materiał, który istnieje wyłącznie jako cytat w cudzej
> narracji, ma dokładnie tyle żywotności, ile ta narracja.** Karta łańcucha przeżyła
> dziesięć dni **tylko dlatego, że co kilka sekcji ktoś ją przywoływał** — i rozpadłaby
> się przy pierwszej sesji, w której nikt by o niej nie wspomniał.

**Reguła KANONU o materiale roboczym powstała po §74 i NIE ZADZIAŁAŁA na karcie łańcucha** —
bo mówi „materiał roboczy jest plikiem", a karta nie wyglądała na materiał roboczy.
**Wyglądała na wniosek.** *Trzecie dziś potwierdzenie, że reguła bez przeliczenia
nie egzekwuje się sama (§149).*

---

# 178. KLASA 3 ZMIERZONA — **PL 4 · EN 4 · DE 3** · i **cofnięcie mojego wczorajszego wykreślenia**

> **Łańcuch zdaniowy WIĄŻE BRZMIENIE, tak jak równość.** Rozstrzygnięcie po POWODZIE D-D9,
> nie po formie: *„forma opakowania — osobny ciąg czy zdanie wewnątrz dłuższego — nie zmienia
> tego, co ona czyta."*
> **JEDNOSTKA WIĄŻĄCA: wspólne ZDANIE — nie fraza, nie nazwa modułu.** Zdanie ma podmiot
> i orzeczenie i niesie twierdzenie; nazwa modułu wewnątrz zdania nie niesie twierdzenia
> i **zostaje relacją podciągową.** (właściciel, 2026-08-21)

## 178.0 ⚠ COFAM WYKREŚLENIE `Ł-3` Z §176.2 — **rozstrzygnięcie z tej samej wymiany je przywraca**

Wykreśliłem `Ł-3` jako **pozycję bez przedmiotu**, bo pod jednostką dwukolumnową był
**relacją**, a relacje nie wiążą. **Rozstrzygnięcie o klasie 3 zapadło w tej samej wymianie
i przywraca go w całości:** `Cennik.faq.o4` jest **całym ZDANIEM** wewnątrz `Obawy.o3` —
czyli **łańcuchem zdaniowym, który wiąże brzmienie.**

**Pomiar rozstrzygający, `[STAN]` ×3 języki:**

| | `Cennik.faq.o4` | `Obawy.o3` (zdanie drugie) | stan |
|---|---|---|---|
| **pl** | „Eksportujesz kontakty do vCard, pobierasz CSV z rejestrem — wszystko jest twoje." | **identyczne** | **ŁAŃCUCH** |
| **en** | „**You export** contacts to vCard **and download** your log as CSV…" | „**Export** contacts to vCard**,** download your log as CSV…" | **PĘKŁ** — druga osoba vs tryb rozkazujący |
| **de** | „**Du exportierst deine Kontakte** als vCard **und** lädst…" | „**Kontakte exportierst du** als vCard**,** das Register lädst du…" | **PĘKŁ** — inny szyk |

> ## **§52.2 miało rację co do rzeczy, a ja wykreśliłem pozycję za nazwę.**
> Zapis brzmiał „EN i DE **już się rozeszły**" — i **rozeszły się**: czytelniczka anglojęzyczna
> i niemieckojęzyczna dostają **dwa brzmienia jednej obietnicy**. To jest dokładnie to,
> czemu D-D9 miało zapobiec.

**To jest wykonanie reguły KANONU na mnie samym w odstępie jednej wymiany:** *rozstrzygnięcie
zmieniające jednostkę wymaga przeliczenia wszystkich pozycji, które tej jednostki używały.*
Wykreślenie było **poprawne wobec jednostki obowiązującej w chwili wykreślania** i **fałszywe
dwadzieścia minut później.** Zapisuję jako **szóstą pozycję rejestru pęknięć**, przywróconą.

## 178.1 Pomiar — jednostka, dwa przebiegi, i defekt narzędzia wykryty między nimi

**Jednostka zadeklarowana przed przebiegiem pierwszym:** wspólne ZDANIE w ≥2 kluczach
jednego języka, przy czym w **co najmniej jednym** jest **częścią dłuższego ciągu**.
Zdanie = fragment ograniczony granicami zdaniowymi — **i ta granica JEST granicą klasy:
nazwa modułu nie ma granic zdaniowych, więc nie zostanie wyodrębniona.**

**Wyłączenia wbudowane przed pomiarem:** W1 — porównanie z rozróżnieniem wielkości liter
**z wyjątkiem pierwszej litery** (§111: „Rezygnujesz…" i „…rezygnujesz…" to **to samo
zdanie**) · W2 — zdanie ≥ 15 znaków i ≥ 2 wyrazy · W3 — przypadki, w których **każde**
wystąpienie jest całą wartością, należą do kolumny równości · W4 — znaczniki rich usuwane
przed podziałem.

**Przebieg 1: PL 6 · EN 5 · DE 5.** **Przebieg 2: PL 4 · EN 4 · DE 3.**
**Różnica NIE wynika z materiału — wynika z dwóch defektów mojego narzędzia,
wykrytych przez samą asymetrię wyniku:**

| defekt | co robił | poprawka w przebiegu 2 |
|---|---|---|
| **próg 15 znaków** | włączał „Tarcza sprawdza." (16 zn), **wyłączał „Shield checks." (14 zn)** — czyli produkował **różnicę językową z progu, nie z materiału** | próg **10 znaków** |
| **brak W5** | liczył zdania wspólne dla kluczy, które **są już całym łańcuchem równości** (`Filary.filar2.naglowek` = `FunkcjeTresci.naglowek` ×3 języki) — produkt uboczny kolumny I liczony jako klasa 3 | **W5: pomijam, gdy cały zbiór kluczy mieści się w jednym łańcuchu równości** |

> **Szósta wpadka narzędzia w tym torze — i pierwsza wykryta przez ASYMETRIĘ WYNIKU,
> a nie przez cudzy raport.** PL miało 6, EN 5; różnica nie miała powodu w materiale,
> więc powód był w przyrządzie. **To jest reguła „rozbieżność jest sygnałem o narzędziu"
> zastosowana do własnego pomiaru, zanim ktokolwiek go zakwestionował.**

## 178.2 Wynik — cztery łańcuchy zdaniowe, **dwa pęknięte**

| # | zdanie (PL) | klucze | pl | en | de |
|---|---|---|---|---|---|
| **Z-1** | „Eksportujesz kontakty do vCard, pobierasz CSV z rejestrem — wszystko jest twoje." | `Cennik.faq.o4` (cała wartość) ⊂ `Obawy.o3` | ✓ | **PĘKŁ** | **PĘKŁ** |
| **Z-2** | „Pulpit pokazuje dzisiejszy stan, a twoje wyniki mają dowód, który zostaje." | `Filary.filar4.korzysc` = `FunkcjeWyniki.zdanie` (całe) ⊂ `FunkcjeIndeks.blok4Wprowadzenie` | ✓ | ✓ | ✓ |
| **Z-3** | „Ryzykowne sformułowanie wyłapujesz przed publikacją, nie po niej." | `FunkcjeIndeks.blok2Wprowadzenie` · `FunkcjeTresci.mod6_poco` — **w obu jako część** | ✓ | ✓ | ✓ |
| **Z-4** | „Rezygnujesz kiedy chcesz." | `Cennik.faq.o3` · `Obawy.o3` — **w obu jako część** | ✓ | ✓ | ✓ |
| **Z-5** | *(EN)* „You record and celebrate your successes and your team's…" | `FunkcjeIndeks.blok4Wprowadzenie` · `FunkcjeWyniki.mod4_poco` | **PĘKŁ** | ✓ | **PĘKŁ** |

**Dwa pęknięcia, w przeciwnych kierunkach — i to jest znalezisko, którego nie było
w żadnym raporcie:**

> **Z-1 jest łańcuchem w PL i pękł w EN i DE. Z-5 jest łańcuchem w EN i pękł w PL i DE.**
> **Dryf nie ma jednego kierunku.** Teza „łańcuchy powstają w PL i pękają w przekładzie"
> (§80, przywoływana przez cały tor) **upada na własnym pomiarze:** EN ma łańcuch zdaniowy,
> którego PL nie ma, i to nie jest lustro §88 (tam chodziło o równość), tylko **drugi,
> niezależny przypadek w innej klasie.**

**Z-5, `[STAN]` — dwa brzmienia jednej obietnicy w PL:**
`FunkcjeIndeks.blok4Wprowadzenie`: „**Sukcesy swoje i zespołu zapisujesz i świętujesz**, zanim
przykryje je codzienność." · `FunkcjeWyniki.mod4_poco`: „**Rejestrujesz i świętujesz sukcesy
swoje i zespołu**…" — **ta sama obietnica, dwa szyki, obie trasy w panelu.**

## 178.3 Granica pomiaru — **deklarowana, nie odkryta po fakcie**

> **Fragment po myślniku WEWNĄTRZ zdania nie jest liczony.**

Dokładnie tam leży **ogon `Ł-4` z §111**: `ZamkniecieCennik.zdanie` PL niesie
„Niczym się nie wiążesz — rezygnujesz kiedy chcesz.", gdzie „rezygnujesz kiedy chcesz."
**nie jest osobnym zdaniem, tylko członem po myślniku.** Mój podział na zdania go nie
wyodrębnia, więc **Z-4 pokazuje arność 2, a §111 mówi o trzech kluczach.**

**Nie zmieniam jednostki, żeby go objąć** — właściciel zadeklarował ją jako „wspólne ZDANIE",
a człon po myślniku zdaniem nie jest. **Zgłaszam jako pozycję: czy człon po myślniku,
niosący pełne twierdzenie z podmiotem i orzeczeniem, należy do klasy 3?** Jeśli tak,
**liczności wyżej są dolnymi granicami, nie liczbami.**

## 178.4 Skutek — **mapa ma trzy kolumny**

| kolumna | PL | EN | DE | wiąże brzmienie |
|---|---|---|---|---|
| **I — łańcuchy (równość)** | 23 | 23 | 22 | **TAK** |
| **II — relacje podciągowe** | 5 | 4 | 7 | NIE — wymaga sprawdzenia |
| **III — łańcuchy zdaniowe** | **4** | **4** | **3** | **TAK** |

**Ryzyko przyjęte świadomie przez właściciela — i zmaterializowane:** klasa 3 jest
**nieliczna** (4/4/3), ale **dwa z pięciu jej łańcuchów są PĘKNIĘTE**, a jeden z nich
(`Z-1`) dotyczy pozycji **D-5 i C-4** z listy wykonawczej. **Karta łańcuchów rozszerzona
o kolumnę III; pole `DOTYKA` obejmuje ją od teraz.**

---

# 179. KLASA 3 PRZELICZONA POPRAWIONĄ JEDNOSTKĄ — **PL 8 · EN 10 · DE 7**

> **Człon po myślniku niosący pełne twierdzenie należy do klasy 3.** *„Kryterium
> interpunkcyjne było moje i było złe: myślnik jest znakiem SKŁADU, nie granicą
> TWIERDZENIA."*
> **POPRAWIONA JEDNOSTKA: wspólna JEDNOSTKA TWIERDZENIA** — fragment z podmiotem
> i orzeczeniem, niosący sprawdzalne zdanie o produkcie, **niezależnie od tego, czy
> oddziela go kropka, myślnik czy średnik.** Wyłączenia bez zmian: nazwa modułu ·
> fraza bez orzeczenia · człon o funkcji wyliczeniowej. (właściciel, 2026-08-21)

**Poprzednie liczby (4 / 4 / 3) były prawdziwe wobec jednostki obowiązującej w chwili
pomiaru** — adnotacja na polecenie właściciela. **Obowiązują: 8 / 10 / 7.**

**Metoda przebiegu 3, z dwiema poprawkami wobec przebiegu 2:**
podział obejmuje **myślnik i średnik** · **scalanie**: dwóch kandydatów o tym samym
zbiorze kluczy łączę w jeden łańcuch **tylko gdy przylegają w KAŻDEJ wartości**
(bez tego jedno zdanie rozcięte myślnikiem liczyłoby się dwa razy — wykryte na
„…— wszystko jest twoje.") · **adjudykacja imienna wyłączeń**: 17 kandydatów odrzuconych
z podaniem powodu (nazwa modułu ×8 · fraza bez orzeczenia ×6 · człon wyliczeniowy ×3),
**lista wypisana w skrypcie, nie ukryta w wyrażeniu regularnym.**

## 179.1 ⚠ KOLIZJA NAZW — naprawiona

Oznaczenie **`Z-1`** nosiła **rodzina sprawstwa** (7 kluczy, §162.1) **i** pierwszy łańcuch
zdaniowy. **Łańcuchy zdaniowe dostają prefiks `ZD-`.** Kolizja powstała u mnie w §178
i wychwycona przy przeliczeniu — **zapisuję, bo dwa różne przedmioty pod jednym numerem
to dokładnie ta klasa, którą numeracja rejestrów ma wykluczać.**

## 179.2 Wynik — **osiem łańcuchów, PIĘĆ PĘKNIĘĆ**

| # | jednostka twierdzenia (PL) | klucze | pl | en | de |
|---|---|---|---|---|---|
| **ZD-1** | „Eksportujesz kontakty do vCard, pobierasz CSV z rejestrem — wszystko jest twoje." | `Cennik.faq.o4` · `Obawy.o3` | ✓ | **PĘKŁ** *(zostaje sam ogon „everything is yours")* | **PĘKŁ** *(zostaje „alles gehört dir")* |
| **ZD-2** | „Pulpit pokazuje dzisiejszy stan, a twoje wyniki mają dowód, który zostaje." | `Filary.filar4.korzysc` · `FunkcjeWyniki.zdanie` · `FunkcjeIndeks.blok4Wprowadzenie` | ✓ | ✓ | ✓ |
| **ZD-3** | „Dzień zaplanowany w Dziennym Planie Działania zaczyna się od konkretu." | `FunkcjeIndeks.blok1Wprowadzenie` · `FunkcjePozyskiwanie.mod7_poco` | ✓ | ✓ | ✓ |
| **ZD-4** | „Ryzykowne sformułowanie wyłapujesz przed publikacją, nie po niej." | `FunkcjeIndeks.blok2Wprowadzenie` · `FunkcjeTresci.mod6_poco` | ✓ | ✓ | ✓ |
| **ZD-5** | **„Paszport zgodności nie daje prawnej gwarancji ani porady."** | `FunkcjeZespol.mod5_nie` · `DlaKogo.s3_granica` | ✓ | ✓ | ✓ |
| **ZD-6** | „Zbierasz dowody swojej pracy na Wall of Proof." | `DbanieOSiebie.tresc` · `FunkcjeWyniki.mod6_poco` | ✓ | ✓ | ✓ |
| **ZD-7** | „To przestrzeń, w której świętujesz, nie tylko mierzysz." | `DbanieOSiebie.tresc` · `FunkcjeWyniki.mod6_poco` | ✓ | ✓ | **PĘKŁ** |
| **ZD-8** | „Rezygnujesz kiedy chcesz." | `Cennik.faq.o3` · `Obawy.o3` · **`ZamkniecieCennik.zdanie`** | ✓ **arność 3** | ✓ **arność 3** | **PĘKŁ — arność 2** |
| **ZD-9** | *(EN)* „You record and celebrate your successes and your team's…" | `FunkcjeIndeks.blok4Wprowadzenie` · `FunkcjeWyniki.mod4_poco` | **PĘKŁ** | ✓ | **PĘKŁ** |
| **ZD-10** | *(EN)* „You add contacts by hand or through the form." | `FunkcjePozyskiwanie.mod4_nie` · `Obawy.o2` | **PĘKŁ** | ✓ | **PĘKŁ** |

**Poprawiona jednostka podwoiła klasę i wykryła trzy defekty, których jednostka
interpunkcyjna nie widziała:**

1. **`ZD-8` potwierdza §111 POMIAREM.** Przy jednostce interpunkcyjnej arność wynosiła 2
   i ogon `ZamkniecieCennik.zdanie` był poza zasięgiem; teraz **PL i EN mają arność 3,
   a DE 2** — czyli **pęknięcie, które autor W3-A zgłosił czytając tekst, widać w liczbie.**
2. **`ZD-5` jest GRANICĄ** — „Paszport zgodności **nie daje** prawnej gwarancji ani porady"
   stoi w dwóch kluczach na dwóch trasach i **wiąże brzmienie**. Granica, która rozjedzie
   się w jednym języku, przestaje być tą samą granicą. **Nie było jej w żadnym rejestrze.**
3. **`ZD-6` i `ZD-7` to DWA osobne twierdzenia dzielone przez tę samą parę kluczy**,
   rozdzielone tekstem, który wspólny nie jest. **Scalanie po zbiorze kluczy dałoby
   jeden łańcuch i ukryłoby pęknięcie DE w `ZD-7`.**

## 179.3 Rejestr przesłanek — wpis właściciela

> **„Postawiłem jednostkę na interpunkcji zamiast na twierdzeniu. Trzecia moja korekta
> jednostki w tym torze."** (właściciel, 2026-08-21)

Zapisuję dosłownie, bez łagodzenia, bo to jest ta sama klasa co moje sześć wpadek
narzędzia: **jednostka postawiona na cesze łatwej do zmierzenia zamiast na cesze, o którą
się pyta.** Interpunkcja jest widoczna; obecność orzeczenia trzeba osądzić.
**Miara idzie tam, gdzie łatwiej mierzyć — i to jest jej najczęstszy błąd.**

---

# 180. AUDYT WYKREŚLEŃ — **`Ł-3` nie jest jedyny**

> **WYKREŚLENIE POZYCJI TEŻ MA DATĘ I JEDNOSTKĘ.** Pozycja wykreślona pod starą jednostką
> wymaga przeglądu przy każdej zmianie jednostki — tak samo jak pozycja wpisana.
> **To jest kierunek, którego nikt nie sprawdza: przeglądamy to, co stoi, nie to,
> co skreślono.** (właściciel, 2026-08-21)

**Zapisane razem z §173, nie osobno** — na polecenie właściciela. To jest **trzecie
wystąpienie §37.3**, i pierwsze, w którym rozstrzygnięcie unieważniło **moje wykreślenie**,
a nie moją liczbę: *„poprawne wobec jednostki obowiązującej w chwili wykreślania i fałszywe
dwadzieścia minut później."*

## 180.1 Przegląd wszystkich dzisiejszych wykreśleń

| wykreślenie | pod jaką jednostką | czy jednostka się zmieniła | werdykt |
|---|---|---|---|
| **`Ł-3`** — „pozycja bez przedmiotu" | mapa **dwukolumnowa** | **TAK — klasa 3** | **COFNIĘTE** (§178.0) |
| **`Z-7`** — „dziewiąta noga łańcucha #1 w PL" | **równość znak w znak** | **TAK — klasa 3** | **KANDYDAT DO POWROTU — patrz §180.2** |
| §132.2 — `Stopka.dokumentyPozycje.regulamin`, `Wspolne.stronaGlowna` | „pilnowany / niepilnowany", **doprecyzowana o strażnika pozornego** | zmiana jednostki **spowodowała** to wykreślenie | **STOI** |
| §117.2 — „czwarte pęknięcie DE" | artefakt narzędzia (`autojunk`) | **NIE** — to nie było wykreślenie z powodu jednostki | **STOI** |
| §162.1 — liczby `4 · 5 · 6 · 10 · 15` rodziny sprawstwa | jednostka „narzędzie w podmiocie wobec wiersza" | **NIE** — inna rodzina | **STOJĄ** |
| rejestr poz. 20 → `~~20~~` | przeniesienie, nie wykreślenie merytoryczne | — | **STOI** |

## 180.2 `Z-7` — **drugi kandydat do powrotu, i zależy od tej samej granicy**

`Hero.cta` = „Sprawdź, jak działa" (cała wartość, **8 kluczy**).
`ZamkniecieCennik.zdanie` = „Wybierz plan **i sprawdź, jak działa** Catherly w twojej
codziennej pracy."

Pod jednostką **równości** — nie jest nogą (wielkość litery). Pod jednostką **klasy 3** —
**mój pomiar go nie wyłapał**, bo człon „i sprawdź, jak działa Catherly…" **nie jest
oddzielony kropką, myślnikiem ani średnikiem.** To jest **człon współrzędny wewnątrz zdania.**

> **DRUGA ŚLEPA PLAMKA MOJEGO PODZIAŁU, deklarowana wprost:** dzielę po separatorach;
> **człon współrzędny łączony spójnikiem („i…", „and…", „und…") nie jest kandydatem.**
> Nie zmieniam jednostki, żeby go objąć — właściciel zadeklarował „fragment z podmiotem
> i orzeczeniem", a rozstrzygnięcie, czy człon po „i" jest osobną jednostką twierdzenia,
> **należy do właściciela, nie do mojego skryptu.**

**Pytanie:** czy człon współrzędny po spójniku, niosący własne orzeczenie, jest jednostką
twierdzenia? **Jeśli TAK — `Z-7` wraca po raz drugi, a liczby 8/10/7 znów są dolnymi
granicami.** Jeśli NIE — `Z-7` zostaje wykreślony i „Sprawdź, jak działa" ma arność 8.

---

# 181. TEZA O KIERUNKU PĘKANIA — **obalona na własnym pomiarze**

> **Zapisz jako OBALENIE PRZESŁANKI TORU, nie jako ciekawostkę.** (właściciel, 2026-08-21)

**Przesłanka obowiązująca od §80 i przywoływana przez cały tor:**
> „Do tej pory zakładaliśmy, że łańcuchy powstają w PL i **pękają w przekładzie**."

**Obalenie, z pomiaru:** `ZD-9` i `ZD-10` są łańcuchami **w EN** i pękły **w PL i DE**.
`ZD-7` jest łańcuchem w PL i EN, pękł **wyłącznie w DE**. `ZD-1` — łańcuch w PL, pękł
w EN i DE. **Trzy kierunki, nie jeden.**

> ## **WARSTWA PL NIE JEST ŹRÓDŁEM — JEST JEDNĄ Z TRZECH.**
> **Każda zmiana w EN albo DE może rozbić łańcuch, którego w PL NIE MA — a autor
> pracujący na PL nie ma jak się o nim dowiedzieć.** (właściciel)

## 181.1 Skutek dla O-2 — **z formalności do warunku koniecznego**

Warunek **O-2** („cztery propozycje wracające do autora mają wrócić z KOMPLETEM trzech
języków, nie z uzupełnieniem") był wydany jako **wymóg porządkowy**. **Ma teraz przyczynę
mechaniczną i staje się warunkiem koniecznym:**

> **Propozycja pisana na PL i uzupełniana o EN/DE nie ma jak zobaczyć łańcucha, który
> istnieje wyłącznie w EN albo wyłącznie w DE.** `ZD-9` i `ZD-10` są dowodem, że takie
> łańcuchy **istnieją i niosą twierdzenia o produkcie** — a nie tylko etykiety.
> **Autor uzupełniający tłumaczy zdanie; autor piszący komplet widzi trzy sieci.**

**Przyczyna dopisana przy warunku O-2 w §160.**

---

# 182. NOWA DROGA WYKRYWANIA — **różnica językowa bez powodu w materiale jest sygnałem o przyrządzie**

> Odnotuj jako nową drogę wykrywania. (właściciel, 2026-08-21)

**Dwa defekty narzędzia wykryte dziś nie przez cudzy raport, tylko przez ASYMETRIĘ WYNIKU:**
PL dało 6 łańcuchów zdaniowych, EN 5 — **różnica nie miała powodu w materiale**, więc powód
był w przyrządzie. Były dwa: próg 15 znaków i brak wyłączenia W5.

> ## **RÓŻNICA MIĘDZY JĘZYKAMI, DLA KTÓREJ NIE UMIESZ WSKAZAĆ PRZYCZYNY W MATERIALE,
> ## JEST SYGNAŁEM O NARZĘDZIU, ZANIM BĘDZIE SYGNAŁEM O TREŚCI.**
> Droga jest tania: **każdy pomiar wykonuj na trzech językach i porównuj kształt wyniku,
> nie tylko liczby.** Materiał ma powody, żeby się różnić (gramatyka, długość, szyk) —
> ale te powody **dają się nazwać**. Różnica bez nazwy jest artefaktem.

**To jest odwrotność reguły „rozbieżność jest sygnałem o narzędziu"**: tamta uruchamia się,
gdy **ktoś inny** poda inną liczbę. **Ta uruchamia się bez nikogo — na własnym pomiarze,
zanim ktokolwiek go zakwestionuje.**

## 182.1 Sprawdzenie pozostałych narzędzi karty — **kolumna II niesie próg bez powodu**

Właściciel zlecił sprawdzenie, czy pozostałe narzędzia karty nie niosą progów bez powodu
w swoim pytaniu. **Sprawdziłem trzy:**

| kolumna | próg | czy ma powód w swoim pytaniu |
|---|---|---|
| **I — równość** | **brak** | ✓ — §139.1 zdjął go świadomie |
| **III — łańcuchy zdaniowe** | ≥10 znaków, ≥2 wyrazy | ✓ — odsiewa etykiety jednowyrazowe, które są całymi wartościami (kolumna I) |
| **II — relacje podciągowe** | **≥ 20 znaków** | ✗ — **NIE MA POWODU W SWOIM PYTANIU** |

**Dowód, i jest rozstrzygający:** pytanie kolumny II brzmi *„czy w tym zdaniu siedzi cudzy
ciąg, o którym autor ma wiedzieć"*, a rozstrzygnięcie właściciela przypisuje do niej wprost
**nazwy modułów**. **Próg 20 znaków wycina prawie wszystkie nazwy modułów:**
„Pulpit" (6) · „Tarcza" (6) · „Studio" (6) · „Akademia" (8) · „Świadectwo" (10) ·
„Twój Wrapped" (12) · „Wall of Proof" (13) · „Pierwsze 90 Dni" (15) · „Sala Treningowa" (15) ·
„Pieczęć Etyczna" (15) · „Paszport zgodności" (18) · „kreator wdrożeniowy" (19).

> **Kolumna II miała mierzyć dokładnie to, co jej próg usuwał.**
> **Czwarte wystąpienie klasy „próg odziedziczony" w tym torze — i pierwsze w narzędziu,
> które sam napisałem dziś, po tym, jak trzy poprzednie opisałem.**

**Skala rozjazdu, zmierzona — i dlatego NIE podaję nowej liczby:**

| kryterium | PL | EN | DE |
|---|---|---|---|
| próg 20 znaków (dziś w karcie) | 5 | 4 | 7 |
| kryterium strukturalne (`*_nazwa` · `Nawigacja.*` · `okruszek` · `Cennik.tabela.*` · albo ≥20 zn) | **65** | **84** | **185** |
| bez progu (≥4 znaki) | 79 | 92 | 230 |

> **Dwa kandydujące kryteria różnią się o RZĄD WIELKOŚCI. Nie przyjmuję żadnego z nich
> sam** — jednostka kolumny II jest **nierozstrzygnięta**, a rozstrzygnięcie należy
> do właściciela, tak jak przy kolumnach I i III.
> **Liczby 5 / 4 / 7 w karcie zostają z adnotacją, że są prawdziwe wobec progu, który
> nie ma powodu w swoim pytaniu.**

**DE 185 wobec PL 65 to nie jest przewaga materiału — to niemieckie okruszki („Team",
„Inhalte") wchodzące jako podciągi w dziesiątki zdań.** Sama ta liczba jest dowodem,
że kryterium strukturalne w tej postaci **też** nie jest gotowe.

---

# 183. KLASA 3 — JEDNOSTKA OSTATECZNA · **22 łańcuchy, nie 8**

> **JEDNOSTKĄ KLASY 3 JEST FRAGMENT NIOSĄCY WŁASNE ORZECZENIE I SPRAWDZALNE TWIERDZENIE
> O PRODUKCIE, niezależnie od tego, co go oddziela — kropka, myślnik, średnik, spójnik,
> przecinek czy nic.**
> Wyłączenia: fragment bez orzeczenia · nazwa modułu · wyliczenie · **fragment, którego
> prawdziwości nie da się sprawdzić w tabeli obietnic.**
> **Trzecia i ostatnia korekta tej jednostki.** (właściciel, 2026-08-21)

**Metoda:** separatory rozszerzone o przecinek i spójniki → **48 (PL) · 45 (EN) · 50 (DE)
kandydatów surowych** → **adjudykacja imienna** → **22 łańcuchy przyjęte.**

## 183.1 Wynik

**22 łańcuchy zdaniowe.** Poprzednia jednostka widziała **8** — **przeoczyła 14, czyli
prawie dwie trzecie klasy.**

| # | twierdzenie | klucze |
|---|---|---|
| ZD-01 | eksport danych | `Cennik.faq.o4` · `Obawy.o3` |
| ZD-02 | Pulpit pokazuje stan | `Filary.filar4.korzysc` · `FunkcjeWyniki.zdanie` · `FunkcjeIndeks.blok4Wprowadzenie` |
| ZD-03 | dzień zaplanowany w DPD | `FunkcjeIndeks.blok1Wprowadzenie` · `FunkcjePozyskiwanie.mod7_poco` |
| ZD-04 | Tarcza przed publikacją | `FunkcjeIndeks.blok2Wprowadzenie` · `FunkcjeTresci.mod6_poco` |
| **ZD-05** | **GRANICA — Paszport nie daje gwarancji** | `FunkcjeZespol.mod5_nie` · `DlaKogo.s3_granica` |
| ZD-06 | Wall of Proof | `DbanieOSiebie.tresc` · `FunkcjeWyniki.mod6_poco` |
| ZD-08 | rezygnacja | `Cennik.faq.o3` · `Obawy.o3` · `ZamkniecieCennik.zdanie` |
| ZD-09 | świętowanie sukcesów | `FunkcjeIndeks.blok4Wprowadzenie` · `FunkcjeWyniki.mod4_poco` |
| ZD-10 | kontakty ręcznie lub przez formularz | `FunkcjePozyskiwanie.mod4_nie` · `Obawy.o2` |
| **ZD-11** | **kreator prowadzi nową osobę** | `Filary.filar3.konkret1` · `FunkcjeIndeks.blok3Wprowadzenie` |
| **ZD-12** | **zmianę statusu widzi cała struktura** | `DlaKogo.s3_robi_1` · `FunkcjeZespol.mod2_poco` |
| **ZD-13** | **Tarcza zaznacza ryzykowne sformułowania** | `DlaKogo.s1_robi_3` · `Filary.filar2.konkret2` |
| **ZD-14** | **GRANICA — zespół zapisujecie w aplikacji** | `DlaKogo.s2_granica` · `FunkcjeWyniki.mod1_nie` |
| **ZD-15** | **GRANICA — importu hurtowego nie ma** | `FunkcjePozyskiwanie.mod4_nie` · `Obawy.o2` |
| **ZD-16** | **cztery fazy pokazują, dokąd zmierza** | `DlaKogo.s2_robi_2` · `FunkcjeZespol.mod3_poco` |
| **ZD-17** | **cel: jak daleko zaszłaś i co dalej** | `Filary.filar4.konkret2` · `FunkcjeWyniki.mod3_poco` |
| **ZD-18** | **GRANICA — decydujesz sama · ARNOŚĆ 5** | `FunkcjePozyskiwanie.mod5_nie` · `FunkcjeTresci.mod3_nie` · `mod6_nie` · `mod7_nie` · `FunkcjeZespol.mod5_nie` |
| **ZD-19** | **nie zaczynasz od pustej kartki** | `Filary.filar2.konkret1` · `FunkcjeIndeks.blok2Naglowek` |
| **ZD-20** | **„Sprawdź, jak działa" — to jest `Z-7`** | `Hero.cta` · `ZamkniecieCennik.zdanie` |
| **ZD-21** | **sygnały, że ktoś może odchodzić · ARNOŚĆ 4** | `Cennik.plany.growth.pozycja1` · `DlaKogo.s2_plan_2` · `FunkcjeWyniki.f8_2` · `FunkcjeZespol.f8_2` |
| **ZD-22** | **moduł otwiera się po ukończeniu poprzedniego** | `DlaKogo.s3_robi_2` · `FunkcjeZespol.mod6_poco` |
| **ZD-23** | **asystent proponuje** | `FunkcjePozyskiwanie.aiGranica` · `FunkcjeTresci.aiTresc` |

**Pogrubione (14) — niewidoczne dla jednostki interpunkcyjnej.**

## 183.2 Cztery rzeczy, których poprzednia jednostka nie mogła zobaczyć

1. **`Z-7` wraca po raz drugi jako `ZD-20`** i jest łańcuchem wiążącym. Zgodnie
   z rozstrzygnięciem: spójnik jest znakiem składni, nie granicą twierdzenia.
2. **CZTERY GRANICE w klasie 3** (`ZD-05`, `ZD-14`, `ZD-15`, `ZD-18`), a `ZD-18`
   ma **arność 5** — „decydujesz sama" stoi w pięciu kluczach `*_nie` na trzech trasach.
   > **Granica powtórzona pięć razy i niepilnowana przez nic jako łańcuch.**
   > Rozjazd w jednym języku daje **pięć różnych zakresów odpowiedzialności.**
3. **`ZD-10` — poprzednie „PĘKŁ w PL i DE" było FAŁSZYWE.** PL niesie „Kontakty wpisujesz
   ręcznie lub przez formularz", DE „Kontakte trägst du von Hand oder über ein Formular ein" —
   **łańcuch stoi we wszystkich trzech.** Pęknięcie było **artefaktem jednostki
   interpunkcyjnej**, nie stanem materiału. **Piąte pęknięcie z §179 upada.**
4. **`ZD-21` łączy kartę Growth z trasą `/dla-kogo` i dwiema podstronami** — cztery klucze,
   twierdzenie o Pulsie zespołu. **Nie było go w żadnym rejestrze.**

## 183.3 Granica tego pomiaru — **liczby pęknięć NIE podaję**

Test przynależności w tym przebiegu brzmiał *„czy istnieje wspólny podciąg ≥10 znaków"* —
**słabszy niż „czy twierdzenie brzmi identycznie".** Dlatego:

> **Liczba ŁAŃCUCHÓW (22) stoi. Liczba PĘKNIĘĆ nie jest tym pomiarem rozstrzygnięta.**
> Trzy wykryte (`ZD-18` w EN · `ZD-19` w DE · `ZD-20` w EN i DE) są **pewne** — wspólnego
> podciągu nie ma wcale. **Znak ✓ nie dowodzi braku pęknięcia** — dowodzi jedynie,
> że jakiś wspólny fragment istnieje.
> **Pełny pomiar pęknięć wymaga porównania twierdzenie-w-twierdzenie i nie został wykonany.**

**Wcześniej ustalone pęknięcia stoją** (`ZD-01` w EN i DE · `ZD-09` w PL i DE) — zmierzone
osobno, przez odczyt obu wartości.

## 183.4 Reguła przy jednostce — na polecenie właściciela

> ## **ŁAŃCUCH IDENTYFIKUJE TWIERDZENIE, NIE PARĘ KLUCZY.**

Uzasadnienie z pomiaru: `DbanieOSiebie.tresc` i `FunkcjeWyniki.mod6_poco` dzielą **dwa
osobne twierdzenia** rozdzielone tekstem, który wspólny nie jest. **Scalanie po zbiorze
kluczy dałoby jeden łańcuch i ukryłoby pęknięcie DE.** Ta sama para kluczy występuje
w karcie **dwa razy** — i tak ma być.

## 183.5 Trzy korekty jednostki właściciela — **jedna pozycja klasowa, nie trzy**

> **„Miara idzie tam, gdzie łatwiej mierzyć — i to jest jej najczęstszy błąd."**

| korekta | jednostka postawiona na… | zamiast na… |
|---|---|---|
| 1 — rodzina Z-1 | **grupie autorskiej** („wszędzie, bez wyjątku") | kryterium prawdziwościowym |
| 2 — klasa 3 wobec relacji | **formie opakowania** (osobny ciąg vs zdanie wewnątrz) | tym, co czytelniczka czyta |
| 3 — granica klasy 3 | **interpunkcji** (kropka/myślnik) | obecności orzeczenia |

**Wszystkie trzy z jednej przyczyny: cecha łatwa do zmierzenia zastąpiła cechę, o którą
się pyta.** Zapisane jako **jedna pozycja klasowa** — bo trzy wystąpienia jednego mechanizmu
w jednym dniu to **wzorzec, nie trzy zdarzenia.**

---

# 184. KOLUMNA II — JEDNOSTKA SŁOWNIKOWA · **PL 55 · EN 71 · DE 70**

> **Nie przyjmuję ani 5/4/7, ani 65/84/185, ani 79/92/230. Wszystkie trzy mierzą co innego
> niż pytanie kolumny. Pytanie brzmi: CZY AUTOR, ZMIENIAJĄC TO ZDANIE, ROZBIJE COŚ,
> CZEGO NIE WIDZI.**
> **KOLUMNA II LICZY WYSTĄPIENIA NAZW ZE SŁOWNIKA NAZW wewnątrz dłuższych ciągów** —
> nie dowolne podciągi, tylko nazwy, **które mają wiersz w słowniku i są kanoniczne.**
> (rozstrzygnięcie właściciela, 2026-08-21)

**Uzasadnienie właściciela, zapisane, bo rozstrzyga całą klasę:**
> „«Team» i «Inhalte» wchodzące w dziesiątki zdań to nie są cudze ciągi, tylko zwykłe
> słowa. **Autor zmieniający zdanie z «Inhalte» niczego nie rozbija. Autor zmieniający
> zdanie z «Paszport zgodności» rozbija nazwę kanoniczną** — i to jest cała treść tej kolumny."

**Źródło nazw:** `docs/faza-2/slownik-nazw.md`, **19 nazw kanonicznych na język.**
Wiersze opisane w słowniku jako „opisowe" oraz wiersze „— (opisowo)" **poza zbiorem.**

| | PL | EN | DE |
|---|---|---|---|
| forma mianownikowa | 47 | 71 | 70 |
| **z formami odmienionymi** | **55** | **71** | **70** |
| nazw wchodzących w dłuższe ciągi | 16 | 17 | 19 |

**Różnica PL 47 → 55 ma przyczynę w materiale i jest nazwana: FLEKSJA.**
`[STAN]`: „Pulpicie" · „Tarczy" · „Ścianie sukcesów" · „Ścianę sukcesów" · „liderki" ·
„Świadectwa". **Jednostka dopasowująca mianownik systematycznie zaniża w języku fleksyjnym.**
EN i DE — bez zmiany (71, 70).

> **Nowa reguła zadziałała na moim własnym pomiarze w tej samej wymianie, w której
> ją zapisałem** (właściciel): różnica PL/EN 47 vs 71 nie miała powodu w materiale →
> sygnał o narzędziu → **znaleziony i nazwany: fleksja.**

**Reszta różnicy (55 vs 71) — hipoteza, nie twierdzenie:** angielski powtarza nazwę tam,
gdzie polski opuszcza powtórzony rzeczownik. **Nie zmierzyłem tego i nie podaję jako
przyczyny** — kubeł R-D.

---

# 185. PRZECIĘCIE — **15 z 42 pozycji stoi na materiale wiążącym brzmienie**

> Od tego zależy, czy lista wykonawcza jest listą **42 zmian**, czy listą **kilkunastu
> pakietów.** (właściciel, 2026-08-21)

| co | ile z 42 |
|---|---|
| dotyka **kolumny I** (równość — **WIĄŻE**) | **4** |
| dotyka **kolumny III** (łańcuchy zdaniowe — **WIĄŻE**) | **12** |
| **dotyka materiału WIĄŻĄCEGO (I albo III)** | **15** |
| dotyka **kolumny II** (nazwy — wymaga sprawdzenia, nie wiąże) | **14** |
| nie dotyka żadnej kolumny albo brak kluczy w nagłówku | 19 (w tym **3 pozycje zbiorcze**) |

> ## **ODPOWIEDŹ: lista wykonawcza jest listą 27 zmian i 15 pakietów** — 15 pozycji nie da
> ## się wykonać pojedynczo, bo każda ciągnie za sobą co najmniej jeden łańcuch wiążący
> ## w trzech językach naraz.

**Łańcuchów zdaniowych w przecięciu: 12 z 22.** `ZD-01, 02, 08, 10, 11, 13, 14, 15, 17, 20, 21, 22`.
**Więcej niż połowa** — więc warunek właściciela („pełny pomiar wyłącznie na przecięciu,
jeśli mniej niż połowa") **nie zachodzi**; pomiar wykonany na przecięciu, reszta niżej.

**GRANICA TEGO PRZECIĘCIA — nie jest ozdobna:** klucze pozycji odczytałem **z nagłówków**
`SYNTEZA-R2.md` §2. Pozycja, której nagłówek wymienia jeden klucz, a której ciało dotyka
większej liczby, **jest tu niedoliczona.** Trzy pozycje zbiorcze (`A-3`, `B-9`, `C-6`)
nie mają kluczy w nagłówku wcale.

> **Dlatego 15 jest DOLNĄ GRANICĄ liczby pozycji wiążących, a 19 „nie dotyka" jest
> GÓRNĄ GRANICĄ liczby pozycji obojętnych.** Nie odwrotnie.

---

# 186. PEŁNY POMIAR PĘKNIĘĆ — **narzędzie zawiodło, pomiar wykonany ręcznie**

## 186.1 Siódmy defekt narzędzia — zgłaszam zamiast podać jego wynik

Napisałem test przynależności oparty na **granicy twierdzenia** (czy wspólny podciąg jest
w każdym kluczu ograniczony separatorem). Wynik: **PL 18 · EN 17 · DE 20 pęknięć z 22.**

**Nie podaję tej liczby jako wyniku, bo jest sprzeczna ze sprawdzonymi ręcznie
przypadkami:** `ZD-16` ma wspólny podciąg **101 / 115 / 127 znaków** i został oznaczony
jako pęknięty; `ZD-02` dzieli **całe twierdzenie** w trzech językach i też.
**Funkcja badająca granicę prawą była błędna.**

> **Siódma wpadka narzędzia w tym torze. Zgłaszam ją, zamiast podać liczbę, która
> „wyglądałaby na pomiar".** Wynik 18/17/20 mówi o mojej funkcji, nie o serwisie.

## 186.2 Pomiar wykonany ręcznie na dwunastu łańcuchach przecięcia

Metoda: wypisanie wspólnego podciągu i **pełnych wartości wszystkich kluczy** ×3 języki,
adjudykacja imienna. **Materiał wypisany, więc każdy werdykt da się obalić.**

| # | twierdzenie | pl | en | de |
|---|---|---|---|---|
| **ZD-01** | eksport danych | **CAŁY** | **PĘKŁ** | **PĘKŁ** |
| **ZD-02** | Pulpit pokazuje stan | CAŁY | CAŁY | CAŁY |
| **ZD-08** | rezygnacja | CAŁY | CAŁY | **PĘKŁ** |
| **ZD-10** | kontakty ręcznie/formularz | CAŁY | CAŁY | CAŁY |
| **ZD-11** | kreator prowadzi | **CAŁY** | **PĘKŁ** | **PĘKŁ** |
| **ZD-13** | Tarcza zaznacza | **PĘKŁ** | **PĘKŁ** | **PĘKŁ** |
| **ZD-14** | **GRANICA — zespół w aplikacji** | **PĘKŁ** | **PĘKŁ** | **PĘKŁ** |
| **ZD-15** | **GRANICA — importu hurtowego nie ma** | CAŁY | CAŁY | CAŁY |
| **ZD-17** | cel: jak daleko i co dalej | CAŁY | CAŁY | CAŁY |
| **ZD-20** | „Sprawdź, jak działa" (`Z-7`) | **CAŁY** | **PĘKŁ** | **PĘKŁ** |
| **ZD-21** | sygnały odejścia | **PĘKŁ** | CAŁY | CAŁY |
| **ZD-22** | moduł po ukończeniu | **PĘKŁ** | CAŁY | CAŁY |

> ## **PĘKNIĘĆ: PL 4 · EN 5 · DE 6.** Cztery łańcuchy całe w trzech językach
> ## (`ZD-02`, `ZD-10`, `ZD-15`, `ZD-17`). **Dwa pęknięte we WSZYSTKICH trzech.**

## 186.3 Dwa łańcuchy pęknięte w każdym języku — **to nie jest dryf przekładu**

**`ZD-14` — GRANICA, i pęka na jednym słowie, w trzech językach tak samo:**
```
DlaKogo.s2_granica   : „…widzisz TYLKO to, co ty i twój zespół zapisujecie w aplikacji…"
FunkcjeWyniki.mod1_nie: „…widzisz to, co ty i twój zespół zapisujecie w aplikacji."
                                ↑ bez „tylko"
en: „you see ONLY what…" ↔ „you see what…"   ·   de: „du siehst NUR das, was…" ↔ „du siehst, was…"
```
> **Jedna trasa zamyka zakres, druga go zostawia otwartym — i tak samo we wszystkich
> trzech językach.** To nie jest rozjazd przekładu. **To jest rozjazd, który przekład
> WIERNIE POWTÓRZYŁ.**

**`ZD-13` — to samo twierdzenie powiedziane inaczej na dwóch trasach, w każdym języku:**
`Filary.filar2.konkret2` mówi „zanim **klikniesz «wyślij»**", `DlaKogo.s1_robi_3` mówi
„zanim **go opublikujesz**"; EN „points out" ↔ „flags"; DE „veröffentlichst" ↔ „auf «Senden» tippst".

> **Dwa różne momenty w cyklu publikacji podane jako to samo zabezpieczenie.**

## 186.4 Trzy kierunki potwierdzone czwarty raz

`ZD-01`, `ZD-11`, `ZD-20` — całe w PL, pęknięte w EN i DE.
`ZD-21`, `ZD-22` — całe w EN i DE, **pęknięte w PL**.
`ZD-08` — całe w PL i EN, pęknięte wyłącznie w DE.
**`ZD-22` w PL pęka na SPRAWSTWIE:** „**Akademia odblokowuje** kolejny moduł" ↔ „**kolejny
moduł odblokowuje się**" — czyli **rodzina Z-1 (§162.1) i klasa 3 przecinają się na jednym
kluczu.**

## 186.5 Dziesięć łańcuchów spoza przecięcia — **NIEZMIERZONE**

`ZD-03, 04, 05, 06, 09, 12, 16, 18, 19, 23` — **nie zmierzone. Jawnie.**
W tym **`ZD-05` i `ZD-18` — dwie z czterech granic klasy 3**, a `ZD-18` ma arność 5.
**Pozycja otwarta, nie domknięta domysłem.**

---

# 187. ZD-18 — **GRANICA O ARNOŚCI 5** · pozycja własnej wagi, ponad pozostałymi w klasie 3

> **„Decydujesz sama" w pięciu kluczach `*_nie` na trzech trasach.**
> ## **ROZJAZD W JEDNYM JĘZYKU DAJE PIĘĆ RÓŻNYCH ZAKRESÓW ODPOWIEDZIALNOŚCI.**
> (właściciel, 2026-08-21)

`FunkcjePozyskiwanie.mod5_nie` · `FunkcjeTresci.mod3_nie` · `FunkcjeTresci.mod6_nie` ·
`FunkcjeTresci.mod7_nie` · `FunkcjeZespol.mod5_nie` — **pięć granic, jedno zdanie,
zero strażników łańcuchowych. NIEZMIERZONE co do pęknięć** (§186.5).

## 187.1 Cztery granice w klasie 3 — **luka w konstrukcji REJESTRÓW, nie w treści**

> **Granice są w klasie 3 nadreprezentowane wobec obietnic, a nikt ich nie pilnował,
> bo REJESTRY PILNUJĄ OBIETNIC.** (właściciel, 2026-08-21)

| | ile |
|---|---|
| łańcuchy zdaniowe niosące **obietnicę** | 18 |
| łańcuchy zdaniowe niosące **GRANICĘ** (`ZD-05`, `ZD-14`, `ZD-15`, `ZD-18`) | **4** |

**Cztery z dwudziestu dwóch to 18 % — a granice stanowią w warstwie znacznie mniejszy
ułamek zdań.** Powód jest mechaniczny i wart zapisania: **granice są pisane w kilku
miejscach tym samym zdaniem, bo autorzy powtarzają brzmienie granicy dosłownie —
z ostrożności.** Ostrożność produkuje łańcuch, którego nikt nie rejestruje.

> ## **REJESTR OBIETNIC REJESTRUJE OBIETNICE. GRANICA WCHODZI DO NIEGO TYLKO WTEDY,
> ## GDY KTOŚ ZAUWAŻY, ŻE JEST TEŻ TWIERDZENIEM.**
> **To jest luka w konstrukcji rejestrów, nie w treści serwisu** — i wyjaśnia, dlaczego
> `ZD-05` i `ZD-14` nie były w żadnym rejestrze, mimo że stoją po dwóch stronach panelu
> od początku toru.

**Waga jest odwrotna niż przy obietnicach:** obietnica rozjechana daje **dwa warianty
korzyści**; granica rozjechana daje **dwa różne zakresy odpowiedzialności.** `ZD-14`
dowodzi, że to nie jest teoria: jedna trasa mówi „widzisz **tylko** to, co…", druga
„widzisz to, co…" — **w trzech językach zgodnie.**

---

# 188. ZD-10 — **sprostowanie NA KORZYŚĆ PRODUKTU** · trzecie dziś

> Odnotuj kierunek: **to jest sprostowanie na korzyść produktu, wykryte przy zmianie
> jednostki. Trzecie dziś w tym torze i wszystkie trzy wyszły z PRZELICZENIA,
> nie z przeglądu.** (właściciel, 2026-08-21)

| # | co upadło | kierunek | skąd |
|---|---|---|---|
| 1 | „`naglowek.md` nie ma strażnika znak-w-znak" (§53) | **na korzyść produktu** | przeliczenie 288/305 deklaracji |
| 2 | „czwarte pęknięcie DE" (§117.2) | **na korzyść produktu** | przeliczenie bez `autojunk` |
| 3 | **`ZD-10` „PĘKŁ w PL i DE"** (§179) | **na korzyść produktu** | przeliczenie poprawioną jednostką |

> **Trzy razy zarzut wobec serwisu upadł — i ani razu nie zrobił tego przegląd.
> Za każdym razem zrobiło to przeliczenie.**
> Przegląd czyta zarzut i pyta „czy to prawda"; zarzut oparty na złej jednostce
> **jest prawdziwy wobec swojej jednostki i przechodzi** (§KANON, pozycja bez przedmiotu).

---

# 189. FLEKSJA — **siódma oś ślepoty, pierwsza JĘZYKOWA**

> Nie próg, nie wzorzec, nie źródło — **właściwość JĘZYKA MIERZONEGO narzędziem
> zbudowanym dla innego.** Dotyczy każdego przyszłego pomiaru na PL i DE.
> (właściciel, 2026-08-21)

**Stan:** jednostka dopasowująca **mianownik** dała **PL 47**, a z formami odmienionymi
**PL 55**. EN i DE bez zmiany (71, 70) — **bo w nich nazwy się nie odmieniają.**

```
[STAN] formy w messages PL: „Pulpicie" · „Tarczy" · „Ścianie sukcesów" · „Ścianę sukcesów"
                            · „liderki" · „Świadectwa"
```

**Dlaczego to jest OŚ, a nie pojedynczy defekt:** poprzednie sześć osi ślepoty (próg
odziedziczony · autojunk · wzorzec bez granicy wyrazu · filtr trzech atrybutów · jednostka
na interpunkcji · brak wyłączenia W5) to były **cechy NARZĘDZIA**. Ta jest **cechą
MATERIAŁU, której narzędzie nie przewiduje** — i **nie da się jej naprawić raz**:
każde nowe dopasowanie tekstowe na PL zaczyna od zera.

> ## **NARZĘDZIE DOPASOWUJĄCE TEKST DOSŁOWNIE MIERZY JĘZYK FLEKSYJNY NIŻEJ NIŻ POZYCYJNY —
> ## ZAWSZE, I NIGDY W DRUGĄ STRONĘ.**
> Skutek kierunkowy: **PL wychodzi „czystszy" niż jest.** Każdy pomiar dopasowaniem
> dosłownym, w którym PL wypada lepiej niż EN, **wymaga sprawdzenia fleksji, ZANIM
> zostanie nazwany wynikiem.**

**Reszta różnicy (55 wobec 71) — hipoteza w kuble R-D, niedomykana:** nie wiem, dlaczego
EN ma więcej wystąpień nazw. **Nie domykam domysłem o powtarzaniu rzeczownika** — polecenie
właściciela.

---

# 190. ✓ UCINA PYTANIE — **klasa „odpowiedź, po której nikt nie pyta dalej" na wyniku CZĄSTKOWYM**

> **„Znak ✓ nie dowodzi braku pęknięcia."** To jest zastosowanie klasy do własnego wyniku:
> **✓ ucina pytanie, a test przynależności był słabszy niż test tożsamości twierdzenia.**
> (właściciel, 2026-08-21)

**Powiązanie, na polecenie właściciela — klasa działa też na wynikach cząstkowych,
nie tylko na zerach i zieleniach:**

| forma odpowiedzi | co ucina | wcześniejsze wystąpienia |
|---|---|---|
| **zieleń bramki** | „czy sprawdzono to, o czym myślę" | `axe` · linter tokenów · strażnik alt-ów |
| **zero** | „czy szukano właściwej rzeczy" | frazy milczenia (tu **zero się obroniło** — trzy drogi) |
| **✓ w tabeli** | **„czy test był tym testem"** | **§183.3 — nowe** |

> **Trzecia forma jest najcichsza, bo ✓ wygląda na wynik pomiaru, a nie na jego skrót.**
> Zero i zieleń budzą czujność, bo są krańcowe. **✓ w kolumnie obok dwóch innych ✓
> nie budzi niczego.**

**Środek jest ten sam co przy zerze i zieleni: podać, CO test sprawdził, w tym samym
miejscu, w którym stoi wynik** — nie w metodzie na końcu dokumentu.

---

# 191. ROZJAZD ŹRÓDŁOWY, WIERNIE PRZETŁUMACZONY — **ósma oś ślepoty, pierwsza w KONSTRUKCJI POMIARU**

> **Nowa klasa (właściciel, 2026-08-21).** Groźniejsza od pęknięcia łańcucha z dwóch powodów:
> **parytet językowy wygląda wzorowo, więc żaden pomiar trójjęzyczny go nie zgłosi**,
> a **wierność przekładu UTRWALA rozjazd zamiast go ujawniać.**

> ## **WSZYSTKIE NASZE NARZĘDZIA PORÓWNUJĄ JĘZYKI. ŻADNE NIE PORÓWNUJE TRAS
> ## W TYM SAMYM JĘZYKU.**

**To jest ósma oś ślepoty i pierwsza dotycząca KONSTRUKCJI POMIARU, nie narzędzia.**
Siedem poprzednich (próg odziedziczony · `autojunk` · wzorzec bez granicy wyrazu · filtr
trzech atrybutów · jednostka na interpunkcji · brak wyłączenia W5 · fleksja) to były wady
**przyrządu**. Ta jest wadą **osi, wzdłuż której w ogóle mierzymy.**

**Dowód — `ZD-14`, `[STAN]` ×3 języki:**
```
DlaKogo.s2_granica    : „…widzisz TYLKO to, co ty i twój zespół zapisujecie w aplikacji…"
FunkcjeWyniki.mod1_nie: „…widzisz to, co ty i twój zespół zapisujecie w aplikacji."
en: „you see ONLY what…"  ↔  „you see what…"
de: „du siehst NUR das, was…"  ↔  „du siehst, was…"
```
**Parytet pl/en/de: wzorowy. Bramka parytetu: zielona. Rozjazd: w każdym języku ten sam.**

**Środek — do rozstrzygnięcia właściciela, nie proponuję gotowego:** oś pomiaru „trasa ×
trasa w jednym języku" nie istnieje w żadnym narzędziu. Kolumna III karty jest jej
**najbliższym przybliżeniem** i wykryła `ZD-13` oraz `ZD-14` **przypadkiem** — bo szukała
wspólnych zdań, a nie różnic między trasami.

---

# 192. ZD-13 — **pozycja osobna: Tarcza działa w innym momencie, zależnie od trasy**

> **To nie jest kwestia brzmienia: klientka dowiaduje się, że Tarcza działa w INNYM
> MOMENCIE, zależnie od tego, którą trasą przyszła.** (właściciel, 2026-08-21)

| trasa | `[STAN]` pl | moment |
|---|---|---|
| `/` (filar 2) | `Filary.filar2.konkret2`: „Tarcza zaznacza ryzykowne sformułowania, **zanim klikniesz «wyślij»**." | **wysyłka** |
| `/dla-kogo` | `DlaKogo.s1_robi_3`: „Tarcza zaznacza ryzykowne sformułowania, **zanim go opublikujesz**." | **publikacja** |

**EN:** „The Shield **points out** … before you **publish**" ↔ „The Shield **flags** … hit **send**".
**DE:** „bevor du **den Post veröffentlichst**" ↔ „auf **«Senden» tippst**".

> **Dwa różne momenty cyklu podane jako to samo zabezpieczenie — we wszystkich trzech
> językach.** Wzorcowy przypadek klasy z §191: przekład **wiernie powtórzył** oba warianty.

**Do rozstrzygnięcia:** który moment jest prawdziwy wobec kodu aplikacji. **Tor 9 tego nie
rozstrzygnie** — `TO:77` mówi „przed publikacją", ale nie mówi, czy „publikacja" znaczy
wysyłkę z aplikacji, czy opublikowanie w serwisie zewnętrznym. **Kandydat do przekazania
torowi 10.**

---

# 193. PRZECIĘCIE RODZIN — **jedno, i NIE TO, które podałem**

> Sprawdź, czy jest jedyne. Jeśli nie — nasze rodziny nie są rozłączne, a liczyliśmy je
> jakby były. (właściciel, 2026-08-21)

## 193.1 SPROSTOWANIE — `ZD-22` nie jest przecięciem

W §186.4 napisałem: *„`ZD-22` w PL pęka na sprawstwie — rodzina Z-1 i klasa 3 przecinają
się na jednym kluczu."* **To jest nieprawda.**

```
klucze ZD-22: DlaKogo.s3_robi_2 · FunkcjeZespol.mod6_poco
przecięcie z rodziną Z-1 (7 kluczy): ZBIÓR PUSTY
```

Obserwacja o **treści** stoi — `ZD-22` w PL rzeczywiście pęka na sprawstwie
(„**Akademia odblokowuje** kolejny moduł" ↔ „**kolejny moduł odblokowuje się**"). **Fałszywe
było przypisanie tego do rodziny Z-1**, która jest zbiorem siedmiu **konkretnych kluczy**,
a nie każdym zdaniem o sprawstwie. **Zjawisko to samo, przynależność inna.**

## 193.2 Prawdziwe przecięcie — **`ZD-11`, i obejmuje OBA jego klucze**

```
ZD-11 = { Filary.filar3.konkret1 , FunkcjeIndeks.blok3Wprowadzenie }
rodzina Z-1 ∩ ZD-11 = { Filary.filar3.konkret1 , FunkcjeIndeks.blok3Wprowadzenie }   ← OBA
```

> ## **RODZINY NIE SĄ ROZŁĄCZNE. Dwa z siedmiu kluczy rodziny Z-1 tworzą razem
> ## łańcuch zdaniowy klasy 3 — czyli CAŁY `ZD-11` leży wewnątrz rodziny Z-1.**

**To jest jedyne przecięcie z 22 łańcuchów** — ale konsekwencja jest ostra i wykonawcza:

> **Naprawa rodziny Z-1 na `Filary.filar3.konkret1` (odwrócenie sprawstwa: „Kreator
> wdrożeniowy prowadzi nową osobę" → podmiotem ma być ONA) ROZBIJE `ZD-11`, jeśli
> `FunkcjeIndeks.blok3Wprowadzenie` nie dostanie tej samej zmiany.**
> A `ZD-11` jest już **pęknięty w EN i DE** (§186.2) — więc naprawa musi objąć
> **dwa klucze × trzy języki = sześć ciągów**, nie jeden.

**Liczby rodzin były liczone jak rozłączne i takie nie są. Poprawka dotyczy jednego
łańcucha z 22 i dwóch kluczy z siedmiu — zgłaszam zakres, nie przemilczam go.**

---

# 194. ZD-18 DOKOŃCZONE — **granica jednolita w PL i DE, ROZBITA NA TRZY WARIANTY W EN**

> **Granica powtórzona pięć razy jest cięższa niż obietnica powtórzona pięć razy.**
> Dokończ przed zamknięciem toru. (właściciel, 2026-08-21)

| język | stan | dowód |
|---|---|---|
| **PL** | **CAŁY — arność 5** | wszystkie pięć kończy się „…, **decydujesz sama**." |
| **DE** | **CAŁY — arność 5** | wszystkie pięć kończy się „…, **entscheidest du selbst**." |
| **EN** | **PĘKŁ — i to na TRZY warianty, nie dwa** | niżej |

```
[STAN en]
  FunkcjePozyskiwanie.mod5_nie : „…and YOU DECIDE where the graphic or the printout goes."
  FunkcjeTresci.mod3_nie       : „…YOU DECIDE what's in a set and which post it goes with."
  FunkcjeTresci.mod6_nie       : „…and what you do with it IS YOUR DECISION."
  FunkcjeTresci.mod7_nie       : „…who sees it and when IS YOUR DECISION."
  FunkcjeZespol.mod5_nie       : „…and YOU DECIDE FOR YOURSELF what you send."
```

> ## **Pięć granic, jedno zastrzeżenie, TRZY różne brzmienia — wyłącznie w angielskim.**
> **PL i DE trzymają jedno brzmienie w pięciu miejscach; EN rozpada się na
> „you decide" ×2 · „is your decision" ×2 · „you decide for yourself" ×1.**

**Waga, wg rozstrzygnięcia właściciela:** to jest **granica**, więc rozjazd daje **trzy
różne siły tego samego zastrzeżenia**. „You decide" jest czynne i mocne; „is your decision"
jest nominalne i słabsze; „you decide for yourself" dokłada nacisk, którego pozostałe
nie mają. **Czytelniczka anglojęzyczna dostaje trzy różnej mocy zapewnienia o tej samej
odpowiedzialności.**

**To NIE jest przypadek klasy §191** (rozjazd źródłowy wiernie przetłumaczony) —
tu **źródło jest jednolite**, a rozjazd **powstał w przekładzie**. Dwie klasy stoją obok
siebie na jednym materiale: `ZD-14` rozjeżdża się w źródle i jest wiernie powielony,
`ZD-18` jest jednolity w źródle i rozjeżdża się w jednym przekładzie.

> **Dziewiąta pozycja klasy 3 zmierzona. Pozostaje dziewięć niezmierzonych:
> `ZD-03, 04, 05, 06, 09, 12, 16, 19, 23` — w tym `ZD-05`, druga z czterech granic.**

---

# 195. AUDYT PRZYNALEŻNOŚCI WIELOKROTNEJ — **22 klucze w dwóch rodzinach, 6 z 42 pozycji**

> Jeśli znajdziesz kolejne — **rodziny wymagają przeliczenia jako ZBIORY, nie jako listy.**
> (właściciel, 2026-08-21)

**Znalazłem. To nie jest jeden przypadek — to 22 klucze.**

## 195.1 Zbiór rodzin poddanych audytowi

`Z-1 sprawstwo` (7) · `rozjazd zdania z wierszem` (3) · `rezygnacja` (**13 — zmierzone
niezależnie, zgodne z zapisem**) · `tabela cennika bez pokrycia` (4) · `łańcuchy równości`
(kolumna I) · `łańcuchy zdaniowe` (kolumna III).

## 195.2 Wynik — **22 klucze należą do dwóch rodzin naraz**

| przecięcie | ile kluczy | które |
|---|---|---|
| **rezygnacja × łańcuch równości** | **8** | `*.zamkniecieZdanie` ×5 · `DlaKogo.ctaZdanie` · `ZamkniecieGlowna.zdanie` · `Cennik.potwierdzenie1` · `Hero.potwierdzenieRezygnacja` |
| **łańcuch równości × łańcuch zdaniowy** | **6** | `Filary.filar4.korzysc` · `FunkcjeWyniki.zdanie` · `Hero.cta` · `DlaKogo.s2_plan_2` · `FunkcjeWyniki.f8_2` · `FunkcjeZespol.f8_2` |
| **rezygnacja × łańcuch zdaniowy** | **3** | `Cennik.faq.o3` · `Obawy.o3` · `ZamkniecieCennik.zdanie` |
| **Z-1 × łańcuch równości** | **2** | `Filary.filar3.korzysc` = `FunkcjeZespol.zdanie` |
| **Z-1 × łańcuch zdaniowy** | **2** | `Filary.filar3.konkret1` · `FunkcjeIndeks.blok3Wprowadzenie` (`ZD-11`) |

**POZYCJE DOTYKAJĄCE TAKIEGO KLUCZA: 6 z 42** — `A-2` · `B-3` · `B-4` · `B-5` · `C-4` · `D-4`.

## 195.3 Dwa wnioski, których nie było w żadnym rejestrze

**1. CZTERY Z SIEDMIU KLUCZY RODZINY Z-1 LEŻĄ W INNEJ RODZINIE.**
Dwa w łańcuchu równości (`filar3.korzysc` = `FunkcjeZespol.zdanie` — to jest **ten sam
ciąg „kreator wdrożeniowy robi to za ciebie"**), dwa w łańcuchu zdaniowym `ZD-11`.

> **Naprawa rodziny Z-1 nie jest naprawą siedmiu kluczy. Jest naprawą siedmiu kluczy,
> jednego łańcucha równości i jednego łańcucha zdaniowego — w trzech językach.**

**2. RODZINA REZYGNACJI JEST W WIĘKSZOŚCI JEDNYM ŁAŃCUCHEM RÓWNOŚCI.**
**8 z 13 kluczy** stoi w łańcuchach równości, z czego pięć `*.zamkniecieZdanie` +
`DlaKogo.ctaZdanie` + `ZamkniecieGlowna.zdanie` to **jeden łańcuch `Ł03`
(„Rezygnujesz w każdej chwili.", arność 7).**

> ## **TO ZMIENIA RACHUNEK O-1.**
> Droga B („wyciąć z 39 miejsc") nie jest **39 niezależnymi cięciami** — jest **cięciem
> jednego łańcucha o arności 7 plus kilku pojedynczych kluczy.** Koszt wykonania jest
> **niższy**, a ryzyko rozjazdu **wyższe**: siedem nóg wychodzi razem albo łańcuch pęka.
> **Panel liczył 39 ciągów jak 39 decyzji. To jest 13 kluczy, z czego 8 w rodzinach
> nakładających się.**

## 195.4 Wniosek o rejestrach, nie o treści

> **Liczyliśmy rodziny jak LISTY. Są ZBIORAMI i mają część wspólną.** Każda liczba
> „rodzina ma N kluczy" w tym dokumencie opisuje **liczność zbioru, nie liczbę pracy
> do wykonania** — bo praca na kluczu wspólnym liczy się w dwóch rodzinach naraz
> i **wykonuje się raz albo psuje obie.**

**Pole `DOTYKA` rozszerzone o szósty wymiar — PRZYNALEŻNOŚĆ DO WIELU RODZIN:**
> pozycja dotykająca klucza należącego do ≥2 rodzin **wymienia wszystkie**, a jej wykonanie
> **wchodzi w pakiet z pozostałymi rodzinami tego klucza albo nie wchodzi wcale.**

## 195.5 WARUNEK DO LISTY WYKONAWCZEJ — nie uwaga

> **Naprawa `Z-1` na `Filary.filar3.konkret1` ROZBIJE `ZD-11`, jeśli
> `FunkcjeIndeks.blok3Wprowadzenie` nie dostanie tej samej zmiany.
> SZEŚĆ CIĄGÓW, NIE JEDEN** (2 klucze × 3 języki) — a `ZD-11` jest **już pęknięty
> w EN i DE**, więc naprawa musi go **zrosnąć, nie tylko nie rozbić.**

---

# 196. ZD-18 — **trzy różnej mocy zapewnienia o tej samej odpowiedzialności**

> Pozycja własnej wagi, ponad pozostałymi w klasie 3. **To nie jest kwestia stylu, tylko
> ZAKRESU TEGO, CO OBIECUJEMY O JEJ DECYZYJNOŚCI.** (właściciel, 2026-08-21)

Rozróżnienie mocy, w brzmieniu dosłownym:

| brzmienie EN | ile kluczy | moc |
|---|---|---|
| „**you decide** …" | 2 | **czynne i mocne** |
| „… **is your decision**" | 2 | **nominalne i słabsze** |
| „**you decide for yourself** …" | 1 | **z naciskiem, którego pozostałe nie mają** |

**PL: jedno brzmienie ×5** („decydujesz sama"). **DE: jedno brzmienie ×5**
(„entscheidest du selbst"). **EN: trzy.**

> **ROZSTRZYGNIĘCIE ZAKRESU (właściciel): naprawa to JEDNO brzmienie w EN, pięciokrotnie,
> wzorem PL i DE. Wybór brzmienia należy do panelu.**

---

# 197. GRANICE DOKOŃCZONE — **cztery zmierzone, jedna pęknięta wszędzie**

> Dokończ granice przed obietnicami. **Granica rozjechana daje różne zakresy
> odpowiedzialności, obietnica rozjechana — różne warianty korzyści. Pierwsze jest cięższe.**

| # | granica | pl | en | de |
|---|---|---|---|---|
| **ZD-05** | „Paszport zgodności nie daje prawnej gwarancji ani porady" | **CAŁY** | **CAŁY** | **CAŁY** |
| **ZD-14** | „widzisz **(tylko)** to, co zapisujecie w aplikacji" | **PĘKŁ** | **PĘKŁ** | **PĘKŁ** |
| **ZD-15** | „importu hurtowego nie ma" | **CAŁY** | **CAŁY** | **CAŁY** |
| **ZD-18** | „decydujesz sama" | **CAŁY (5)** | **PĘKŁ (3 warianty)** | **CAŁY (5)** |

**`ZD-05` — najcięższa granica toru jest CAŁA:** brzmienie „nie daje prawnej gwarancji
ani porady" jest **verbatim identyczne w obu kluczach ×3 języki**. Różnią się dopiero
**kontynuacje** — i to są **dwa różne dalsze twierdzenia**, nie dwa warianty jednego:
`mod5_nie` mówi „o tym, co wyślesz, decydujesz sama"; `s3_granica` mówi „zatwierdzenia
i rozmowy z ludźmi zostają po twojej stronie". **Granica jedna, dopowiedzenia dwa —
to jest poprawne.**

> **Cztery granice: dwie całe, jedna pęknięta w jednym języku, jedna pęknięta we wszystkich
> trzech. Ta ostatnia (`ZD-14`) jest jedyną, która pęka W ŹRÓDLE.**

**Osiem obietnic pozostaje NIEZMIERZONYCH i żadna nie jest w przecięciu:**
`ZD-03, 04, 06, 09, 12, 16, 19, 23`. **Jawnie, na mocy rozstrzygnięcia właściciela.**

---

# 198. PRZEBIEG 2 WYKONANY — **trasa × trasa w jednym języku, pierwszy raz w całym torze**

Luka pomiaru zapisana w §197 i w karcie jako „NIEWYKONANY" — **wykonana.**
Skrypt: `scratchpad/przebieg2.py`. **Przebieg na PL; EN i DE niezmierzone (R-D).**

## 198.1 Jednostka — zadeklarowana przed pomiarem

**KANDYDAT NA ROZJAZD ŹRÓDŁOWY** = para kluczy **z RÓŻNYCH TRAS**, które:
- **(a)** mówią o **tym samym PRZEDMIOCIE** — obie wartości niosą tę samą **nazwę kanoniczną
  ze słownika** (przedmiot **dany**, nie domyślany), **oraz**
- **(b)** **NIE dzielą jednostki twierdzenia** — nie są w tym samym łańcuchu równości
  ani w tym samym łańcuchu zdaniowym.

> **Czyli: dwa miejsca mówią o tej samej rzeczy — i mówią to INACZEJ.**

*Wyłączenia wbudowane: W1 klucze ramy (nie są trasą treściową) · W2 wartości będące samą
etykietą (`*_nazwa`, `Cennik.tabela.*`, okruszki, nagłówki) — etykieta nie jest twierdzeniem ·
W3 pary z tej samej trasy — przebieg 2 pyta o TRASY · wartość ≥ 25 znaków.*

**Kandydatów: 69.** Adjudykacja imienna po rankingu podobieństwa.

## 198.2 `RŹ-1` — **TARCZA: sześć wystąpień, cztery czasowniki, trzy momenty**

| trasa | klucz | co mówi |
|---|---|---|
| `/` | `Filary.filar2.konkret2` | „Tarcza **zaznacza** … zanim **klikniesz «wyślij»**" |
| `/cennik` | `Cennik.plany.starter.pozycja5` | „Tarcza — **sprawdza** … zanim **je wyślesz**" |
| `/dla-kogo` | `DlaKogo.s1_robi_3` | „Tarcza **zaznacza** … zanim **go opublikujesz**" |
| `/funkcje/tresci` | `FunkcjeTresci.mod6_nie` | „Tarcza … **wskazuje** ryzykowne sformułowania" |
| `/funkcje/tresci` | `FunkcjeTresci.mod6_poco` | „Ryzykowne sformułowanie **wyłapujesz przed publikacją**" |
| `/` (alt) | `ObrazyFilarow.filar2` | „…i **propozycja poprawionej wersji**" — **ADR-018, §164.2** |

> ## **CZTERY CZASOWNIKI: zaznacza · sprawdza · wskazuje · wyłapujesz.
> ## TRZY MOMENTY: wysyłka · publikacja · przed publikacją. SZEŚĆ TRAS.**
> Czytelniczka dostaje **inną Tarczę na każdej trasie** — i parytet pl/en/de jest przy tym
> wzorowy, bo przekład **wiernie powtórzył wszystkie sześć wersji.**

**DOWÓD, ŻE BRAKUJĄCY PRZEBIEG BYŁ POTRZEBNY, I JEST TO DOWÓD LICZBOWY:**
> **Kolumna III (`ZD-13`) zobaczyła DWA z tych sześciu wystąpień. Przebieg 2 widzi
> wszystkie sześć.** Kolumna III szukała **wspólnych zdań** — więc znalazła tylko te dwa
> miejsca, które akurat mówiły to samo prawie tak samo. **Cztery pozostałe różniły się
> zbyt bardzo, żeby wpaść do klasy, która szuka podobieństwa.**
>
> **Klasa „rozjazd źródłowy" jest tym trudniejsza do wykrycia, im GŁĘBSZY jest rozjazd.**
> To jest własność odwrotna do wszystkich pozostałych klas w tym torze.

## 198.3 `RŹ-2` — **PULPIT: „dzisiejszy stan" wobec „aktualny stan"**

`/` i `/funkcje/wyniki` (`zdanie`): „Pulpit pokazuje **dzisiejszy** stan".
`/dla-kogo` i `/funkcje/wyniki` (`mod1_poco`): „**aktualny** stan: sprzedaż, aktywne
kontakty, aktywność zespołu".

> **Dwa różne zakresy czasowe tego samego ekranu — i „dzisiejszy" jest WĘŻSZY niż
> „aktualny".** Ta sama trasa `/funkcje/wyniki` niesie **oba**.

## 198.4 `RŹ-3` — **PIERWSZE 90 DNI: sprzeczność SPRAWSTWA między trasami**

```
/         Obawy.o1                      : „Kreator wdrożeniowy prowadzi CIĘ krok po kroku.
                                           Pierwsze 90 Dni DAJĄ CI gotowy plan na start."
/funkcje  FunkcjeIndeks.blok3Wprowadzenie: „…przez Pierwsze 90 Dni z misjami i fazami
                                           PROWADZISZ JĄ TY."
```

> **Na `/` Pierwsze 90 Dni prowadzą JĄ. Na `/funkcje` to ONA prowadzi przez nie nową osobę.**
> **Inny adresat i inny sprawca — to nie jest wariant brzmienia, to dwa różne twierdzenia
> o tym, do czego ta funkcja służy.**

Oba klucze należą do **rodziny Z-1** (§162.1) — więc rozjazd źródłowy i rodzina sprawstwa
przecinają się tutaj **po raz drugi**, po `ZD-11`.

## 198.5 Dwa dalsze, lżejsze

**`RŹ-4` — TWÓJ WRAPPED:** „**Twój Wrapped składa** podsumowanie okresu" (`/`) wobec
„**Otwierasz** Twój Wrapped i **czytasz** podsumowanie" (`/funkcje/wyniki`) — **narzędzie
w podmiocie wobec niej w podmiocie, na dwóch trasach.**

**`RŹ-5` — PASZPORT ZGODNOŚCI:** `Obawy.o6` na `/` mówi „…**ale ostatnie słowo ma twoje IT**".
**Żadna inna trasa tego nie mówi** — trzy pozostałe wystąpienia Paszportu mówią o skanowaniu
i o braku gwarancji prawnej. **Twierdzenie o zatwierdzaniu przez IT stoi w jednym miejscu
i nie ma odpowiednika nigdzie indziej.**

## 198.6 Granice tego przebiegu — deklarowane

1. **Wyłącznie PL.** EN i DE **niezmierzone**.
2. **Przedmiot musi być nazwą ze słownika.** Rozjazdy o przedmiotach nienazwanych
   (eksport, przypomnienia, plan dnia) **są poza zasięgiem tej jednostki.**
3. **Adjudykacja moja, imienna, z 69 kandydatów** — wypisana, więc obalalna;
   **nie jest to jednak trzecia droga i wynik nosi R-D.**
4. Pary, w których jedna wartość jest **samą etykietą**, wyłączone z góry — możliwe,
   że któraś etykieta niesie jednak twierdzenie.

> **Pierwszy przebieg tej osi w całym torze dał PIĘĆ rozjazdów źródłowych, z czego jeden
> (`RŹ-1`) o sześciu wystąpieniach. Oś była ślepa przez dziesięć dni.**

---

# 199. TOR 10 OBALA MOJĄ RAMĘ — **tabela się nie zestarzała, wada jest inna i gorsza**

**Ustalenie przyjęte 2026-08-23** [źródło: **TOR 10**, zamknięty 2026-08-23,
`docs/weryfikacja-obietnic/` w repozytorium **aplikacji**, gałąź `feat/cs-build`].
**Rejestr przepływu: A-15. Status: PRZYJĘTE BEZ SPRAWDZENIA — `P-22`.**

> **Tabela obietnic NIE ZESTARZAŁA SIĘ. Dryf 0.**
> **Rozjazd bierze się z ODCZYTU, nie z upływu czasu: inwentarz notował, że funkcja
> ISTNIEJE, a nie NA JAKIM WARUNKU STOI.**

## 199.1 Co to robi z §166.2 — **rama obalona, fakt stoi**

§166.2 ustalił **faktem**, że tabeli obietnic nie czyta żadna bramka (`grep` → jedno
trafienie w komunikacie błędu lintera). **Ten fakt stoi.**

**Obalona jest RAMA, którą wokół niego zbudowałem:** pisałem o „migawce z 2026-08-09",
o „warunku unieważnienia, którego nic nie obserwuje", o dwunastu dniach. Sugerowałem
**ryzyko starzenia się**. **Tor 10 zmierzył: starzenia nie ma.**

> ## **BRAK STRAŻNIKA DATY BYŁ PRAWDZIWYM BRAKIEM I NIEWŁAŚCIWYM ZMARTWIENIEM.**
> Pilnowałbym upływu czasu przy dokumencie, który się nie starzeje — a nie pilnowałbym
> **głębokości odczytu**, która jest tu jedyną wadą.

**Klasa: nazwanie właściwego braku i przypisanie mu niewłaściwej przyczyny.** Bramka
zbudowana na mojej ramie **świeciłaby na zielono i nie łapała niczego** — bo mierzyłaby
datę, a psuje się warunek.

## 199.2 Wynik toru 10 — liczby, których nie mam czym sprawdzić

| co | ile z 56 zweryfikowanych wierszy |
|---|---|
| **PRAWDA** | **7** — z czego **6 mówi MNIEJ, niż mogłoby** |
| **POZYCJE ODWROTNE** — prawda, którą **tabela zdejmuje ze strony** | **7** |
| **pozycje dla toru 9** | **41**, w tym **14 dotykających CENY** |

> **„Pozycja odwrotna" to klasa, której tor 9 nie miał i nie mógł mieć.** Cały tor pracował
> w jedną stronę: **strona obiecuje więcej, niż aplikacja robi.** Tor 10 pokazuje drugą:
> **aplikacja robi więcej, niż tabela pozwala stronie powiedzieć — a tabela to milczenie
> EGZEKWUJE.** ADR-018 chroni przed obietnicą bez pokrycia; **nie chroni przed pokryciem
> bez obietnicy.**

**41 pozycji dla toru 9 — NIE WIDZĘ ICH.** Znam liczbę, nie znam treści. Repozytorium
aplikacji jest poza zasięgiem. **Czekam na przekazanie.**

## 199.3 A-16 — zlecenie D-B3 nie jest niewykonane, jest **NIEDONIESIONE**

[źródło: **TOR 10** przez właściciela, 2026-08-23]
> **„30 minut" jest wpisane na sztywno przy cronie co 15 minut.**

**Odpowiedź na zlecenie D-B3 z 2026-08-12 istniała, zanim ją zadałem po raz drugi.**
`PRZEKAZANIE-TOR10.md` stawiało to jako **pozycję pierwszą w kolejności pilności** —
i była już odpowiedziana.

> ## **TO NIE JEST ZLECENIE NIEWYKONANE. TO JEST ZLECENIE WYKONANE I NIEDONIESIONE.**
> **Dokładnie ta klasa, dla której powstał rejestr przepływu — i jej pierwsze
> potwierdzone wystąpienie.** Wiedza istniała, miała dowód, nie miała drogi do adresata.

**Uwaga własna, bo liczby się nie zgadzają i to jest ustalenie, nie narzekanie:**
fakt w kodzie mówi **„na sztywno 30" przy cronie co **15** minut**. Tabela obietnic mówi
„**30 minut** przed każdą rozmową". **Czy przypomnienie przychodzi 30 minut przed, czy
w oknie 15-minutowym wokół tej wartości — z przekazanego ustalenia nie wynika.**
**Nie rozstrzygam i nie zgaduję** — pytanie wraca do toru aplikacji.

---

# 200. TOR 13 — **sprawdzone drugą drogą: mechanizm potwierdzam, defekt w www NIE WYSTĄPIŁ**

**Ustalenie przyjęte 2026-08-23** [źródło: **TOR 13**, audyt strażników].
**Rejestr przepływu: A-17.**

> Bramka `parytet-kluczy-i18n` obejmuje **KLUCZE, nie WARTOŚCI**. **385 wartości EN
> i 333 DE są bajt w bajt równe polskim** — **718 ciągów** — i **nic tego nie zgłasza.**

## 200.1 Wykonałem ten sam pomiar na `catherly-www`

```
kluczy PL: 330
EN: wartości bajt w bajt równych polskim → 2      ['FunkcjeTresci.mod1_nazwa' = „Studio",
DE: wartości bajt w bajt równych polskim → 3       'FunkcjeWyniki.mod6_nazwa' = „Wall of Proof",
                                                   'Stopka.kontakt' = „Kontakt" (tylko DE)]
```

**Wszystkie pięć jest uzasadnionych:** `slownik-nazw.md` nakazuje „Studio" i „Wall of Proof"
**bez tłumaczenia we wszystkich językach**; „Kontakt" jest identyczne w PL i DE **z natury
języka**, nie z zaniedbania.

> **DEFEKT W `catherly-www` NIE WYSTĄPIŁ.** Liczb 385/333 z repozytorium aplikacji
> **nie weryfikuję — `P-22`.**

## 200.2 **Mechanizm potwierdzam — i w www jest GORSZY niż u nadawcy**

```
scripts/check-parytet.mjs:3-6   [STAN]
  „Struktura content/pl, content/en i content/de musi być identyczna:
   te same DRZEWA PLIKÓW."
```

> **Tor 13 mówi: bramka pilnuje kluczy, nie wartości. W `catherly-www` bramka pilnuje
> DRZEW PLIKÓW — nie kluczy i nie wartości.** O jeden poziom płycej.
> **To, że defekt tu nie wystąpił, jest zasługą autorów przekładu, nie bramki.**

## 200.3 Luka mojej własnej karty — **potwierdzam zarzut i nazywam trzecią oś**

> **„Twoja karta łańcuchów tego nie widzi, bo mierzy równość MIĘDZY ciągami,
> nie Z POLSKIM ORYGINAŁEM."** (tor 13)

**Zarzut jest trafny.** Karta ma dziś:
- **oś 1** — języki między sobą (kolumny I–III): *czy ten sam ciąg brzmi tak samo w pl/en/de*
- **oś 2** — trasy w jednym języku (§198): *czy dwie trasy mówią to samo tak samo*
- **oś 3 — ciąg wobec POLSKIEGO ORYGINAŁU: NIE ISTNIEJE.**

**Trzecia oś odpowiada na inne pytanie niż obie poprzednie:** nie „czy to samo brzmi tak
samo", tylko **„czy to w ogóle zostało przełożone".** Ciąg nieprzełożony jest w oświetleniu
osi 1 **doskonale spójny** — bo jest identyczny sam ze sobą we wszystkich językach.

> ## **DZIEWIĄTA OŚ ŚLEPOTY, DRUGA W KONSTRUKCJI POMIARU.**
> Zgłoszona nie przez mój pomiar i nie przez mojego adwersarza — **przez inny tor.**
> **Pierwsze ustalenie w tym torze, które przyszło z zewnątrz i trafiło w moje narzędzie.**

**Wpisane do karty jako oś z jawnym stanem: `www — ZMIERZONA, defekt nie wystąpił
(EN 2 · DE 3, wszystkie uzasadnione)`.**

---

# 201. `P-22` — DEFINICJA ZE ŹRÓDŁEM, I REGUŁA TRAFIAJĄCA W SIEBIE PO RAZ ÓSMY

**Ustalenie przyjęte 2026-08-23** [źródło: **TOR 8**, rejestr przesłanek warstwy
dowodzącej, wpis `P-22` · repozytorium `fbo-os`, gałąź `feat/kontrowersje`].
**Rejestr przepływu: A-18.**

> ## **`P-22`: „Przekaz poprawny bez drogi weryfikacji. Odbiorca dostał prawdę,
> ## której nie umie sprawdzić."**

| # | co jest nie tak | status treści |
|---|---|---|
| **P-19** | wskazanie wzorca **bez sprawdzenia** | **treść MOŻE BYĆ FAŁSZYWA** |
| **P-21** | obrona zapisana **osobno od reguły** | prawdziwa, **skutki uboczne niewidoczne** |
| **P-22** | **brak drogi weryfikacji u odbiorcy** | **PRAWDZIWA** |

> **Najtrudniejsza do wykrycia, bo odbiorca nie ma powodu niczego podejrzewać — dostał
> prawdę.** Obrona leży **wyłącznie po stronie nadawcy: przekaz niesie drogę weryfikacji
> albo jest niekompletny.**

## 201.1 Ósme dziś wystąpienie reguły trafiającej w siebie

> **„Przekazałem Ci oznaczenie bez definicji, czyli popełniłem `P-22` przy przekazywaniu
> `P-22`."** (właściciel, 2026-08-23)

Zapisuję **z jego atrybucją**, bo to nie jest anegdota — to **ósmy przypadek dziś**
i wzmacnia domknięcie kanonu z §KANON: **znajomość klasy nie chroni przed klasą.**
Tor 9 odnotował u siebie tę figurę wielokrotnie (próg odziedziczony po opisaniu trzech
poprzednich; jednostka na interpunkcji po zapisaniu reguły o jednostkach).

> **Nowe w tym wystąpieniu: momentem najwyższego ryzyka popełnienia klasy jest MOMENT
> JEJ PRZEKAZYWANIA.** Nadawca skupia się na treści klasy, nie na własnym przekazie —
> i przekazuje ją tym samym trybem, przed którym ostrzega.

## 201.2 Skutek dla toru 9 jako NADAWCY — nie tylko odbiorcy

Dotąd traktowałem `P-22` jako etykietę **tego, co przyjmuję**. Konsekwencja toru 8
odwraca kierunek:

> **Każdy mój przekaz — do toru 10, do toru 8, do okna www — ma nieść DROGĘ WERYFIKACJI
> albo jest niekompletny.**

Sprawdzenie własnych trzynastu przekazań pod tym kątem: **B-01…B-06 niosą drogę**
(dokument, klucz, komenda) · **B-07, B-08, B-11, B-12 niosą wskazanie pliku i wiersza** ·
**B-09, B-10 to reguły kanonu — droga weryfikacji nie dotyczy** · **B-13 niesie komendę
i wynik**. **B-14 i B-15 niosą pomiar wykonany u mnie.**
**Ani jedno moje przekazanie nie jest dziś `P-22` po stronie treści** — ale **wszystkie
piętnaście jest `P-22` po stronie KANAŁU**, patrz §202.

---

# 202. **PUSTE POLE MIERZY BRAK KANAŁU ZWROTNEGO, NIE BRAK PRZYJĘCIA**

**Ustalenie przyjęte 2026-08-23** [źródło: **TOR 8**]. **Rejestr przepływu: A-19.**

> U toru 8: **19 przekazań odnotowanych po drugiej stronie przy ZERZE potwierdzeń
> u nadawcy.** Przekazania **doszły** — rejestr nadawcy tego **nie widział**.

## 202.1 Sprostowanie odczytu mojej tabeli B

Napisałem: *„15 pól pustych na 15 — puste pole po dwóch dniach jest sygnałem, że
przekazanie nie doszło."* **To był odczyt fałszywy.**

> ## **15 pustych pól NIE znaczy „nic nie doszło". Znaczy: NIE MAM CZYM SPRAWDZIĆ,
> CZY DOSZŁO.**

## 202.2 Luka konstrukcji, nie braku wykonania

Wymóg mówi: *„kolumna zostaje pusta, dopóki adresat nie odnotuje przyjęcia **w swojej
tabeli A**"*. **Nadawca nie ma jak do tamtej tabeli zajrzeć** — rejestry są **dwoma
osobnymi dokumentami w dwóch repozytoriach, bez połączenia.**

| co rejestr mierzy dziś | co miał mierzyć |
|---|---|
| **czy nadawca WIE o przyjęciu** | **czy przyjęcie NASTĄPIŁO** |

> ## **REJESTR PRZEPŁYWU W OBECNEJ POSTACI MIERZY WŁASNĄ ŚLEPOTĘ, NIE STAN ŚWIATA.**
> To jest **`P-22` po stronie KANAŁU, nie treści**: przekaz był poprawny, dotarł,
> a nadawca **nie ma drogi, żeby to sprawdzić.**

**Brakuje trzeciej rzeczy, której nie ma żaden tor: KANAŁU ZWROTNEGO.**
Tor 8 zna swoje 19 odnotowań **dlatego, że ktoś zajrzał po drugiej stronie** — czyli
przez właściciela, ręcznie. **Ta sama droga, którą rejestr miał zastąpić.**

**Zgłaszam jako lukę konstrukcji wymogu, nie jako brak wykonania z mojej strony.**
Nie proponuję mechanizmu — **konstrukcja rejestru jest decyzją właściciela.**

---

# 203. MECHANIZM ODTWARZAJĄCY DROGĘ, KTÓRĄ MIAŁ ZASTĄPIĆ — **klasa, i naprawa wymogu**

**Właściciel wziął A-19 na siebie** [2026-08-23]:
> „Napisałem «puste pole po dwóch dniach to sygnał, że przekazanie nie doszło» przy
> konstrukcji, w której **nadawca nie ma jak zajrzeć do tabeli adresata**.
> **Wymóg zawierał warunek niewykonalny dla tego, kogo obowiązywał.**"

I wpis do własnego rejestru przesłanek, przepisany bez łagodzenia:
> **„Rejestr przepływu, który miał zmierzyć jakość kanału, sam przez ten kanał przechodzi."**

## 203.1 Klasa i jej test

> ## **MECHANIZM ODTWARZAJĄCY DROGĘ, KTÓRĄ MIAŁ ZASTĄPIĆ.**
> Powstaje, żeby zastąpić drogę nieformalną — pamięć jednej osoby, ręczne pośrednictwo,
> „ktoś zajrzy" — i **do działania wymaga dokładnie tej drogi.**
> **Wygląda wtedy jak mechanizm, a jest procedurą.**

**Test, jednozdaniowy:** *czy pole tego mechanizmu da się wypełnić prawdziwie **bez udziału
drogi, którą zastępuje**?* Nie da się → **mierzy własną ślepotę, nie stan świata.**

## 203.2 Naprawa wymogu — zastosowana

| | było | jest |
|---|---|---|
| **znaczenie kolumny** | „czy adresat przyjął" | **„czy JA sprawdziłem, że przyjął — i kiedy"** |
| **puste pole** | „nie doszło" | **„NIE SPRAWDZIŁEM"** |

> **To jedyna wersja, którą nadawca umie wypełnić PRAWDZIWIE.** (właściciel)

**Moje 15 pustych pól czyta się teraz poprawnie: nie sprawdziłem żadnego z piętnastu.**
To jest **prawda o mnie**, a nie fałszywa hipoteza o adresatach.

**Zapisane wprost, na polecenie właściciela:**
> ## **Rejestr przepływu pozostaje PROCEDURĄ W PRZEBRANIU STRAŻNIKA, dopóki rejestry
> ## z ośmiu okien nie będą czytelne dla siebie nawzajem.**

**Mechanizmu automatycznego dziś nie ma.** Nie proponuję go — konstrukcja należy
do właściciela, a rejestr **ma stać z tą etykietą, nie bez niej.**

---

# 204. `P-22` ROZDZIELA SIĘ NA TREŚĆ I KANAŁ — **rozszerzenie toru 9, przekazane torowi 8**

Właściciel [2026-08-23]: *„To jest rozszerzenie `P-22`, którego tor 8 nie postawił,
i przekażę mu je ze źródłem."* **Rejestr przepływu: B-16.**

> ## **Przekaz może nieść drogę weryfikacji TREŚCI i NIE nieść drogi weryfikacji DOTARCIA.**
> **Pierwsza chroni przed PRZYJĘCIEM FAŁSZU. Druga — przed PRZEKONANIEM, ŻE COŚ
> ZOSTAŁO PRZEKAZANE.**

**Druga jest cichsza, i to jest jej cała groźność: nadawca NAPISAŁ, więc UWAŻA,
ŻE PRZEKAZAŁ.** Właściciel odnotował to o sobie w tym samym meldunku:
> „Dziś kilkanaście razy założyłem, że przekazanie dotarło, bo je napisałem."

**Pytanie operacyjne — dwa osobne, nie jedno:**
1. **Czy odbiorca ma jak sprawdzić, że to prawda?** *(P-22, treść)*
2. **Czy JA mam jak sprawdzić, że to do niego dotarło?** *(P-22, kanał)*

**Pomiar na moich piętnastu przekazaniach: zero po stronie treści, PIĘTNAŚCIE po stronie
kanału.** Dokładnie odwrotnie, niż wyglądało, dopóki pytanie było jedno.

---

# 205. MOMENT PRZEKAZYWANIA KLASY — **człon, którego brakowało siedmiu poprzednim**

Właściciel [2026-08-23]:
> „Tamte mówiły **KIEDY** reguła jest najsłabsza — w dniu powstania. Ten mówi
> **PRZY JAKIEJ CZYNNOŚCI**."

**Do KANONU wpisane RAZEM z regułą o znajomości klasy, nie osobno** — bo pytanie
operacyjne powstaje dopiero z połączenia:

> ## **Piszesz o klasie? Sprawdź, czy właśnie jej nie popełniasz W TYM ZDANIU.**

**Osiem wystąpień tego dnia**, z których siedem odnotował tor 9 na sobie (próg
odziedziczony po opisaniu trzech poprzednich · jednostka na interpunkcji po zapisaniu
reguły o jednostkach · próg 20 znaków w kolumnie II napisanej tego samego dnia),
a ósme właściciel na sobie: **`P-22` przekazane bez definicji.**

> **Wspólna własność wszystkich ośmiu: klasa została popełniona NIE PRZEZ NIEWIEDZĘ,
> tylko W AKCIE JEJ OPISYWANIA.** To jest najmocniejszy argument za domknięciem kanonu:
> **reguła rozpoznaje po fakcie; zabezpiecza przeliczenie albo forma.**

---

# 206. TEST KLASY ZASTOSOWANY DO DWÓCH MECHANIZMÓW — **sama odpowiedź**

> **Czy pole tego mechanizmu da się wypełnić prawdziwie BEZ udziału drogi,
> którą zastępuje?**

**1. Bramka deklaracji (`scripts/lint-deklaracje.mjs`, tor 9, wprowadzona 2026-08-21).**
Droga zastępowana: **ręczne przeliczanie znaków w deklaracjach `*(42 zn)*` w plikach treści.**
Pole mechanizmu: werdykt + pokrycie (`230 sprawdzonych · 782 M-2 · 79 M-4 · 116 M-3`).

> ## **TAK — da się.** Bramka czyta oba pliki i liczy sama; **nie potrzebuje ani
> człowieka, ani drugiego dokumentu, ani pośrednictwa właściciela.**

**2. Strażnik cytowań toru 8.**

> ## **NIE MAM CZYM ODPOWIEDZIEĆ.**
> ```
> ls scripts/ | grep -i "cytat|cytow|quote"   → (pusto)
> grep -rln "cytat" scripts/                   → (pusto)
> ```
> Mechanizm należy do toru 8 i **nie istnieje w `catherly-www`.** Odpowiedź na test
> wymaga przeczytania jego kodu. **To jest `P-22` po stronie treści — znam nazwę
> mechanizmu, nie znam mechanizmu.** Nie zgaduję.

*(Bez oceny, zgodnie z poleceniem.)*

---

# 207. KLASA 3 ZMIERZONA W CAŁOŚCI — **22 z 22**

## 207.1 Sprostowanie do polecenia — `ZD-05` był już zmierzony

Właściciel polecił zacząć od `ZD-05` jako niezmierzonego. **`ZD-05` został zmierzony
w §197: CAŁY / CAŁY / CAŁY.** Lista „niezmierzonych" w §186.5 **nie została po §197
zaktualizowana** i powtarzałem ją w meldunkach.

> **Stara lista w dokumencie jest cytatem z historii, nie stanem — moja własna reguła,
> nie dopilnowana we własnym pliku.** Niezmierzonych było **osiem**, nie dziewięć.

## 207.2 Osiem ostatnich — pomiar

| # | twierdzenie | pl | en | de |
|---|---|---|---|---|
| **ZD-03** | dzień zaplanowany w DPD zaczyna się od konkretu | CAŁY | CAŁY | CAŁY |
| **ZD-04** | ryzykowne sformułowanie wyłapujesz przed publikacją | CAŁY | CAŁY | CAŁY |
| **ZD-06** | zbierasz dowody swojej pracy na Wall of Proof | CAŁY | CAŁY | CAŁY |
| **ZD-09** | świętowanie sukcesów | **PĘKŁ** | CAŁY | **PĘKŁ** |
| **ZD-12** | zmianę statusu od razu widzi cała struktura | CAŁY | CAŁY | CAŁY |
| **ZD-16** | Pierwsze 90 Dni: misje i cztery fazy | CAŁY | CAŁY | CAŁY |
| **ZD-19** | nie zaczynasz od pustej kartki | CAŁY | **PĘKŁ** | **PĘKŁ** |
| **ZD-23** | **asystent proponuje** | **PĘKŁ** | **PĘKŁ** | **PĘKŁ** |

**`ZD-16` potwierdza odmowę z §186.1:** moje zepsute narzędzie oznaczyło go jako pęknięty
przy wspólnym podciągu **101/115/127 znaków**. **Jest CAŁY w trzech językach.**
**Gdybym podał 18/17/20 jako wynik, ta pozycja stałaby dziś jako defekt, którego nie ma.**

## 207.3 `ZD-23` — pęknięcie na GRANICY, i odchyla się od wiersza

```
[STAN pl]
FunkcjePozyskiwanie.aiGranica : „Asystent nie napisze tekstu zamiast ciebie —
                                 proponuje, ty PISZESZ."
FunkcjeTresci.aiTresc         : „Z asystentem AI piszesz i edytujesz treści —
                                 on proponuje, ty DECYDUJESZ."
TO:200                        : „Nie napisze tekstu zamiast ciebie — asystent
                                 proponuje, TY PISZESZ."
```
EN: „it suggests, you **write**" ↔ „it suggests, you **decide**".
DE: „er macht Vorschläge, du **schreibst**" ↔ „du **entscheidest**".

> **`aiGranica` jest wierna wierszowi. `aiTresc` mówi „decydujesz" — a to jest
> twierdzenie SŁABSZE: „piszesz" wyklucza, że pisze asystent; „decydujesz" dopuszcza,
> że asystent pisze, a ona zatwierdza.**
> **Granica przesunięta w stronę asystenta, w trzech językach zgodnie** — czyli
> **rozjazd źródłowy wiernie przetłumaczony** (§191), na kluczu objętym `TO:88-90`
> („tryb dokonany niedozwolony bez klucza Anthropic").

**Czwarta granica pęknięta — i pierwsza, która pęka NIE w brzmieniu, tylko w ZAKRESIE
CZASOWNIKA.**

## 207.4 Bilans całej klasy 3 — **komplet 22 łańcuchów × 3 języki**

| | |
|---|---|
| **łańcuchy CAŁE we wszystkich trzech** | **10 z 22** — `ZD-02, 03, 04, 05, 06, 10, 12, 15, 16, 17` |
| **pęknięte we wszystkich trzech** | **3** — `ZD-13` · `ZD-14` · `ZD-23` |
| **pęknięć per język** | **PL 6 · EN 8 · DE 9** |

**Granice (5 z 22, po dołączeniu `ZD-23`):** `ZD-05` cała · `ZD-15` cała ·
`ZD-18` pęknięta w EN · `ZD-14` pęknięta we wszystkich trzech ·
**`ZD-23` pęknięta we wszystkich trzech.**

> ## **TRZY Z PIĘCIU GRANIC SĄ PĘKNIĘTE. WŚRÓD SIEDEMNASTU OBIETNIC PĘKNIĘTYCH
> WE WSZYSTKICH TRZECH JĘZYKACH JEST ZERO.**
> Obietnice pękają **w jednym albo dwóch językach** — czyli w przekładzie.
> **Granice pękają W ŹRÓDLE.** Trzy z pięciu, i wszystkie trzy tak samo we wszystkich
> trzech językach. **Ostrożność, która kazała autorom powtarzać brzmienie granicy
> dosłownie (§187.1), nie zadziałała ani razu tam, gdzie granica stała na dwóch trasach.**

---

# 208. CZTERDZIEŚCI JEDEN POZYCJI Z TORU 10 — **stan faktyczny i zakaz pracy**

**Rejestr przepływu: A-15 (liczba), treść — NIE PRZEKAZANA.**

**Co mam:** liczbę **41**, z tego **14 dotykających ceny**, oraz **cztery nagłówki
najcięższych**: „limity egzekwowane" fałszywe dla **3 z 4** · **czysty eksport
nieistniejący** · zmiana planu przy `subscription_update: false` · **sprzedaż wpisywana
ręcznie**.

**Czego nie mam:** treści pozycji, dowodów, wskazań wierszy.
Źródło: `docs/weryfikacja-obietnic/` w repozytorium **aplikacji**, gałąź `feat/cs-build`
— **poza zasięgiem toru 9.**

> ## **ZAKAZ WŁAŚCICIELA, 2026-08-23: NIE PRACOWAĆ NA TYCH CZTERECH.**
> **Znam nagłówki, nie znam treści ani dowodów — to jest `P-22` po stronie treści,
> pierwszy raz dziś u mnie.**

**Odnotowuję kierunek, bo jest pouczający:** przez cały dzień `P-22` dotykało mnie
**po stronie kanału** (piętnaście przekazań bez drogi sprawdzenia dotarcia). **To jest
pierwszy przypadek po stronie treści — i przyszedł jako CZTERY NAGŁÓWKI BEZ DOWODÓW,
czyli w postaci, która najmocniej kusi do pracy.** Nagłówek „czysty eksport nieistniejący"
**wygląda na gotową pozycję** i dotyka `Cennik.plany.pro.pozycja4`, którą mam w karcie
łańcuchów jako **`R-1` w trzech językach.**

**Nie ruszam. Czekam na przekazanie ze ścieżką, nie ze streszczeniem.**

---

# 209. ⭐ **MAM DOSTĘP DO REPOZYTORIUM APLIKACJI** — dwa `P-22` zdjęte, dwa cytaty zweryfikowane

**Właściciel przekazał ścieżkę z zastrzeżeniem: „To repozytorium jest poza Twoim zasięgiem —
droga weryfikacji istnieje, ale nie dla Ciebie."**

> ## **ZASTRZEŻENIE JEST NIEPRAWDZIWE. SESJA TORU 9 ZOSTAŁA URUCHOMIONA ZE ŹRÓDŁEM
> ## `catherly-app/fbo-os` — CZYLI Z TYM WŁAŚNIE REPOZYTORIUM.**

```
$ git remote -v                                              → catherly-app/fbo-os
$ git fetch origin claude/verify-promises-table-3s4ksg       → * [new branch]
$ git ls-remote origin claude/verify-promises-table-3s4ksg   → c90c6dd1…
```
**Przeczytałem `92-PRZEKAZANIE-TOR-9.md` w całości (140 wierszy).**

**To jest `P-22` w odmianie, której nie mieliśmy: nadawca sądził, że odbiorca nie ma drogi
weryfikacji — a odbiorca ją miał i o tym nie wiedział.** Ani jedna z jedenastu pozycji
mojego rejestru oznaczonych „poza zasięgiem" nie została sprawdzona **przez przekonanie,
nie przez brak dostępu.**

## 209.1 `A-06` — **R-C ZAMKNIĘTE. Cytaty Stripe prawdziwe, zweryfikowane osobiście**

Cała analiza rodziny anulowania stała na pliku, o którym zapisałem, że „nie istnieje
w żadnym dostępnym repozytorium". **Istnieje.**

```
scripts/setup-stripe.ts @ claude/verify-promises-table-3s4ksg   [STAN, odczyt własny]
  subscription_cancel: { enabled: true, mode: 'at_period_end',
      cancellation_reason: { enabled: true,
        options: ['too_expensive','missing_features','switched_service','unused','other'] } },
  subscription_update: { enabled: false },
```

> **Wszystkie trzy cytaty z §2294–2310 są DOKŁADNE.** `mode: 'at_period_end'` ·
> `cancellation_reason.enabled: true` z **pięciopozycyjną listą** · `subscription_update: false`.
> **Status `A-06` w rejestrze: `PRZYJĘTE BEZ SPRAWDZENIA — R-C` → `SPRAWDZONE DRUGĄ DROGĄ`.**

## 209.2 `A-15` — **dowód rozstrzygający toru 10 potwierdzony niezależnie**

Tor 10 opiera całe ustalenie „tabela powstała nieprawdziwa" na jednym dowodzie: wiersz 37
mówi „Stripe atrapa", powołując się na inwentarz z commitu `61a69c9c`, a **ten sam commit
nosi tytuł mówiący coś przeciwnego.** Sprawdziłem:

```
$ git log -1 --format="%H %ad %s" 61a69c9c
61a69c9c…  Sun Aug 9 14:43:16 2026 +0200
chore(stripe): identyfikatory cen z konta Catherly (sandbox) ZAMIAST ATRAP — tylko PLN
```

> ## **POTWIERDZONE CO DO ZNAKU. Inwentarz opisał stan SPRZED commitu, na którym stoi.
> ## Rozjazd o ZERO DNI.**
> **Status `A-15`: `P-22` ZDJĘTE** dla tej składowej. Licznik toru 10 — **49 wierszy z 56
> nie mówi prawdy, DRYF 0, ODCZYT 49** — przyjmuję jako `[TOR 10]`; **dowód rozstrzygający
> sprawdziłem sam.**

## 209.3 Sprostowanie przekazu — **„siedem pozycji odwrotnych" to PIĘĆ**

Właściciel przekazał: *„siedem pozycji ODWROTNYCH"*. **Dokument źródłowy mówi wprost:**

> „**Pozycji jest PIĘĆ, nie siedem** — reguła ⚠ (SZERSZE przy funkcji bramkowanej =
> niedziałająca bramka) wycięła wiersze 29 i 15 jako wady egzekucji."

> **Liczba zestarzała się w tranzycie przez jednego pośrednika, w tym samym dniu.**
> Nie jest to zarzut wobec nadawcy: **siedem było prawdą przed regułą ⚠.** To jest
> dokładnie zdanie nadrzędne kanonu — *„żadna nie była fałszywa w chwili powstania"* —
> i **pierwszy raz zmierzone na przekazaniu międzytorowym, a nie na moim dokumencie.**

**Pozostałe liczby przekazu zgadzają się z dokumentem:** 41 pozycji · **14 dotykających
ceny** (4 najcięższe + 10 w sekcji `[PIENIĄDZE]`) · **7 wierszy PRAWDA z 56** (49 nie mówi).

## 209.4 Dwie rzeczy z dokumentu, których nie było w przekazie ustnym — **obie w moim zakresie**

**1. `RECZ-250` — rynki EUR renderują PUSTĄ SIATKĘ PLANÓW bez komunikatu.**
Migracja `20260814210000_ceny_per_waluta` **istnieje w repozytorium** (potwierdziłem:
`prisma/migrations/20260814210000_ceny_per_waluta/migration.sql`), a wg toru 10
**niewdrożona na produkcji** *(stan produkcji — R-C dla mnie)*.
> **Klientka w strefie EUR widzi PUSTKĘ, nie brak funkcji — z jej strony produkt wygląda
> na zepsuty.** Waga WYSOKA. **To jest `/cennik`, czyli moja trasa** — i **nie ma tego
> w żadnym z moich 42 wsadów.**

**2. `/cennik` jest CZWARTĄ kopią liczb planów, nie trzecią.**
`PUNKT-WZNOWIENIA.md` §0.2 mówi o trzech; tor 10 zmierzył cztery: stała `PLAN_LIMITS` ·
seed `Plan.limits` · bullety `plan-features.ts` · **tabela `/cennik` + i18n**.
> **Dotyczy mnie bezpośrednio: dokument nadrzędny nie wiedział o kopii, którą redaguję.**

---

# 210. TRZY REGUŁY Z TORU 10 — przyjęte ze źródłem

[wszystkie: **TOR 10**, `docs/weryfikacja-obietnic/94-KANON-SIEDEM-PRZEBRAN.md`, 2026-08-23]

**1. NIEWAŻNA PRÓBA ZOSTAJE W RAPORCIE Z POWODEM NIEWAŻNOŚCI** — trzy elementy zapisu:
co uruchomiono · **jaki był wynik i JAK WYGLĄDAŁ** (jaki fałszywy wniosek się nasuwał) ·
dlaczego jest nieważny, z `plik:linia` mechanizmu.
> **Środkowy element odróżnia zapis użyteczny od notatki.**
**Stosuję wstecz:** §186.1 zapisał wynik 18/17/20 i powód nieważności, **ale nie zapisał,
jak wyglądał** — a wyglądał jak **katastrofa** (18 z 22 pękniętych). Uzupełnione.

**2. ⚠ PUŁAPKA MUTACYJNA.** `git checkout -- <plik>` po `git add` przywraca **z INDEKSU**,
czyli z wersji **zmutowanej**. Mutacja zostaje na dysku i **wygląda na cofniętą**.
> **Wymóg: `git checkout HEAD --`, nigdy `git checkout --`. Przywrócenie potwierdzane
> SUMĄ SHA, nie komunikatem komendy. „Komenda, która nie zgłosiła błędu, nie jest dowodem
> przywrócenia."**
**Dotyczy mnie:** wykonałem w tym torze mutacje dowodowe przy bramce deklaracji i przy
strażnikach hero. **Nie potwierdzałem przywróceń sumą SHA — potwierdzałem `git status`.**
**Zapisuję jako lukę własnej metody, nie jako ostrzeżenie na przyszłość.**

**3. CZTERY WADY ODROCZENIA:** zła warstwa · zły adresat · zły przedmiot · **ZŁY PODZBIÓR.**
> **Czwarta jest najgroźniejsza: zdanie prawdziwe, dowód prawdziwy, metoda prawidłowa,
> brakuje wyłącznie RESZTY ZBIORU. NIE ZOSTAWIA ŚLADU W DOKUMENCIE.**
> Jedyne pytanie, które to wykrywa: **ilu jeszcze jest takich jak ten i czy sprawdzono
> każdy?**
> **Odroczenie POWTÓRZONE jest mocniejszym sygnałem niż pierwsze: drugi raz znaczy,
> że ktoś wrócił, zobaczył to samo i znowu nie sprawdził.**

## 210.1 „Zły podzbiór" zastosowany do moich pomiarów — **stan po §207**

Właściciel: *„masz dziewięć niezmierzonych łańcuchów klasy 3 i to jest dokładnie ten kształt."*

> **Niezmierzonych jest ZERO. Klasa 3 została zmierzona w całości w §207 — 22 z 22.**
> `ZD-05` był zmierzony wcześniej (§197); osiem pozostałych zmierzyłem w tej samej rundzie,
> w której właściciel wysyłał to polecenie. **Liczba „dziewięć" pochodzi z mojej własnej
> nieaktualnej listy (§186.5) — tej samej, którą sprostowałem w §207.1.**

**Test „ilu jeszcze jest takich jak ten" zastosowany do pozostałych moich pomiarów:**

| pomiar | czy zbiór domknięty |
|---|---|
| kolumna I — łańcuchy równości | **TAK** — 23/23/22, cała warstwa 330 kluczy |
| kolumna III — łańcuchy zdaniowe | **TAK** — 22 z 22 ×3 języki (§207) |
| granice klasy 3 | **TAK** — 5 z 5 |
| **kolumna II — nazwy ze słownika** | **NIE** — 19 nazw kanonicznych; **rozstrzygnięcia „opisowe/kanoniczne" nie sprawdziłem dla żadnej** |
| **przebieg 2 — trasa × trasa** | **NIE** — wyłącznie PL; **EN i DE niezmierzone**, przedmioty nienazwane poza jednostką |
| **warunek §168 (naprawa usuwająca pokrycie)** | **NIE** — wydany dla 42, **sprawdzony na 2** |

> **Trzy otwarte podzbiory, wszystkie trzy zadeklarowane wcześniej — ale dwa z nich
> (`przebieg 2`, `warunek §168`) były już raz odroczone i odraczam je DRUGI RAZ.**
> **Zgodnie z regułą toru 10 to jest sygnał mocniejszy niż pierwsze odroczenie
> i tak go zapisuję, zamiast go powtórzyć po cichu.**

---

# 211. GRANICE PĘKAJĄ W ŹRÓDLE, OBIETNICE W PRZEKŁADZIE — **mechanizm**

> **Najważniejsze ustalenie całego toru 9** (właściciel, 2026-08-23) — **ponad kartą.**

**MECHANIZM, rozstrzygnięty przez właściciela:**
> **Powtarzanie dosłowne chroni przed rozjazdem W PRZEKŁADZIE, bo TŁUMACZ WIDZI JEDEN CIĄG.
> Nie chroni przed rozjazdem W ŹRÓDLE, bo AUTOR PISZĄCY DRUGĄ TRASĘ PISZE OD NOWA —
> i NIE WIE, ŻE POWTARZA.**

> ## **TO ODWRACA KIERUNEK NASZEJ UWAGI: PILNOWALIŚMY PRZEKŁADU, A GRANICE PSUJĄ SIĘ
> ## PRZED NIM.**

**Liczby, na których to stoi:** 3 z 5 granic pęknięte · **wśród 17 obietnic pękniętych
we wszystkich trzech językach — ZERO**. Obietnice pękają w jednym albo dwóch językach.
**Granice pękają we wszystkich trzech naraz — czyli przed przekładem.**

**Wniosek dla aparatu:** cała nasza maszyna — parytet, strażniki znak-w-znak, kolumny I–III
karty, przebieg 1 — jest **skierowana na przekład.** Jedyna oś patrząca w źródło
(**przebieg 2, trasa × trasa**) powstała wczoraj, została wykonana **raz i tylko w PL**.

---

# 212. `ZD-23` — **PĘKNIĘCIE W ZAKRESIE CZASOWNIKA: klasa osobna**

> **Nie jest to pęknięcie brzmienia. Żadne porównanie znak-w-znak jej nie złapie,
> a oba zdania są poprawne wobec tabeli czytanej pobieżnie.** (właściciel, 2026-08-23)

```
aiGranica : „…proponuje, ty PISZESZ."       ← wierne TO:200
aiTresc   : „…on proponuje, ty DECYDUJESZ."
```

> ## **„PISZESZ" WYKLUCZA, ŻE PISZE ASYSTENT. „DECYDUJESZ" DOPUSZCZA, ŻE ASYSTENT PISZE,
> ## A ONA ZATWIERDZA.**

**Dlaczego to jest klasa, a nie przypadek:**
- **niewykrywalna przez porównanie tekstu** — zdania różnią się jednym wyrazem, a różnica
  nie jest leksykalna, tylko **zakresowa**;
- **niewykrywalna przez sprawdzenie pokrycia** — oba zdania mają wiersz, oba przechodzą;
- **niewykrywalna przez parytet** — rozjazd jest **identyczny w trzech językach**;
- **wykrywalna wyłącznie przez pytanie: który z dwóch czasowników dopuszcza więcej?**

**Waga:** klucz objęty `TO:88-90` („tryb dokonany niedozwolony bez klucza Anthropic").
**Tor 10 potwierdza z drugiej strony:** wiersz 21 — *„bez klucza `/api/v1/ai/copy` zwraca
gotowca w kopercie sukcesu; `improveText` oddaje oryginał jako «ulepszony»"*.
> **Granica przesunięta w stronę asystenta na stronie — i asystent, który w kodzie
> nie robi nawet tego, co granica dopuszcza.**

---

# 213. WARTOŚĆ ODMOWY PODANIA LICZBY — **dwa policzalne dowody tego samego dnia**

| # | gdzie | co odmówiono | co by się stało |
|---|---|---|---|
| **1** | **tor 9**, §186.1 | podania **18/17/20 pęknięć** z zepsutego narzędzia | **`ZD-16` stałby dziś jako defekt, którego nie ma** — wspólny podciąg 101/115/127 znaków, w rzeczywistości CAŁY ×3 |
| **2** | **tor 8** *(przekazane przez właściciela)* | liczby przy dwóch strażnikach | **50 % zawyżenia uniknionego** |

> **Odmowa podania niezmierzonej liczby ma dziś DWA POLICZALNE DOWODY WARTOŚCI —
> w dwóch niezależnych torach, tego samego dnia.**
> Dotąd była regułą uzasadnianą **ryzykiem**. Od dziś jest regułą uzasadnianą **pomiarem
> tego, co ryzyko by kosztowało.**

---

# 214. STARZENIE SIĘ CYTATU **WEWNĄTRZ JEDNEGO DOKUMENTU** — dziewiąty przypadek dnia

> **Dotąd mierzyliśmy starzenie się cytatów przechodzących MIĘDZY OKNAMI.
> To starzało się W MIEJSCU.** (właściciel, 2026-08-23)

Lista niezmierzonych z §186.5 nie została zaktualizowana po §197 — i powtarzałem ją
w meldunkach, **cytując własny dokument sprzed dwóch sekcji.**

| odmiana | droga | przykład |
|---|---|---|
| **między oknami** | przez pośrednika | „siedem pozycji odwrotnych" → **pięć** (§209.3) |
| **wewnątrz dokumentu** | **bez żadnej drogi** | §186.5 → §197 → moje meldunki |

> **Druga jest cichsza, bo nie ma pośrednika, na którego można by wskazać.
> Dokument zaprzecza sobie o dwie sekcje dalej i obie wersje stoją.**
> **Dziewiąty dziś przypadek reguły trafiającej w siebie — i pierwszy bez tranzytu.**

---

# 215. `P-22` PO STRONIE TREŚCI — **właściwość, którą trzeba było nazwać**

> **Nagłówek bez dowodu KUSI MOCNIEJ niż pełna pozycja, bo WYGLĄDA NA GOTOWY.**
> (właściciel, 2026-08-23)

Cztery nagłówki z toru 10 („czysty eksport nieistniejący", „limity egzekwowane fałszywe
dla 3 z 4"…) **wyglądały na gotowe pozycje wsadu.** Pełna pozycja z `plik:linia`
**wygląda na materiał do sprawdzenia**; nagłówek **wygląda na wniosek.**

> **To jest odwrotność intuicji: im mniej dowodu niesie przekaz, tym bardziej gotowy
> wygląda — bo nie ma w nim nic, co można by zakwestionować.**

**Zmierzone na sobie:** wstrzymałem się na polecenie właściciela, **a gdyby polecenia
nie było, „czysty eksport nieistniejący" wszedłby jako pozycja** — dotyka
`Cennik.plany.pro.pozycja4`, którą mam w karcie jako `R-1` w trzech językach.
**Po odczytaniu dokumentu wiem, że nagłówek jest prawdziwy, ale jego przedmiotem jest
`signature-service.ts:37`, nie brzmienie strony** — czyli pozycja **nie zamyka się
zmianą zdania**, co nagłówek sugerował.

---

# 216. `A4` — **wiersz o danych w UE MA POKRYCIE FAKTYCZNE**

**Rejestr przepływu: `A-20`. Status: SPRAWDZONE DRUGĄ DROGĄ.**
[źródła: **TOR 10** — odczyt konfiguracji, `PUNKT-WZNOWIENIA.md` §3 · **właściciel** —
odczyt panelu Supabase 2026-08-23 oraz błąd `P1000` przy rotacji, który wypisał host]

> **Pooler `aws-1-eu-central-1.pooler.supabase.com`, region `eu-central-1` (Frankfurt).
> To jest FAKT, nie decyzja.**

**Rozbicie na dwie warstwy — wykonane przez tor 10, żebym nie odroczył całości drugi raz:**

| pytanie | warstwa | stan |
|---|---|---|
| **gdzie fizycznie stoi baza** | konfiguracja | **ODPOWIEDŹ JEST — dziś, dwa odczyty** |
| **jak wolno to nazwać na stronie** | prawna | **otwarte, u właściciela** |

> ## **Moje pytanie brzmi teraz „czy wolno powiedzieć X", nie „czy to w ogóle prawda".**

**To jest wzorcowe zastosowanie „złej warstwy" z §210:** odroczono **całość** zamiast
**części**, i przez to stało **zdanie przy hero**. **Rozdzielenie kosztowało nic
i odblokowało połowę.**

---

## §217 — POMIAR GRANICY DOSTĘPU I SUM PRZYWRÓCENIA (zlecenie TOR9/022)

> **Zlecenie właściciela 2026-08-24, 13:04, w kolejności:** ① przeliczyć statusy
> jedenastu pozycji „poza zasięgiem" **i zmierzyć, do czego jeszcze mam dostęp** —
> *„Nie zakładaj granicy, zmierz ją"*; **pilnie, równolegle:** ② sprawdzić **sumy SHA**
> na plikach mutowanych przy bramce deklaracji i strażnikach hero — *„Jeśli którakolwiek
> mutacja została — to jest pilne."*

### 217.1 Mutacje — **sumy, nie komunikaty**. Odpowiedź: **NIE ZOSTAŁA ŻADNA**

Reguła toru 10 (A-21) mówi wprost: **„komenda, która nie zgłosiła błędu, nie jest
dowodem przywrócenia"**. Dlatego `git status` **nie jest** tu dowodem — jest komunikatem.
Wykonałem trzy niezależne pomiary sumami.

**Pomiar 1 — każdy plik śledzony, blob po blobie.** Skrypt liczy `git hash-object`
pliku roboczego i porównuje z SHA blobu z `HEAD` (pomija indeks i pomija pamięć
podręczną `stat`, przez którą `git status` potrafi milczeć):

```
ZGODNE: 346
ROZNE:  0
BRAK:   0
```

**Pomiar 2 — sumy DRZEW katalogów**, czubek gałęzi roboczej strony (`69c2dab`) wobec
`HEAD` gałęzi `tor9-ustalenia`. Jedna suma zamyka cały katalog:

| katalog | `69c2dab` | `tor9-ustalenia` | |
|---|---|---|---|
| `src` (w tym **`src/i18n/messages/{pl,en,de}.json`**) | `966dd1e6…` | `966dd1e6…` | **IDENTYCZNE** |
| `e2e` (**wszyscy strażnicy**) | `1156ff95…` | `1156ff95…` | **IDENTYCZNE** |
| `.githooks` | `0fb006f1…` | `0fb006f1…` | **IDENTYCZNE** |
| `public` | `06fb39cd…` | `06fb39cd…` | **IDENTYCZNE** |
| `content` | `c8f5f200…` | `a5f0b6a6…` | różne — **wyłącznie o jeden DODANY plik** |
| `scripts` | `840c5d5b…` | `3e057ffb…` | różne — **wyłącznie o jeden DODANY plik** |

> **Warstwa czytelnika i wszyscy strażnicy są bajt w bajt tacy sami jak przed torem 9 —
> potwierdzone JEDNĄ SUMĄ NA KATALOG, nie przeglądem plików.**
>
> **Przy okazji sprostowanie własnego założenia: katalogu `messages/` w tym repozytorium
> NIE MA.** Pliki komunikatów leżą w `src/i18n/messages/`. Mówiłem „messages" przez dwa
> dni, mając na myśli ścieżkę, której nie sprawdziłem. Nic to nie zmieniło w wynikach
> (bo `src` jest identyczne), ale **nazwa, której nie sprawdziłem, weszła do
> sprawozdania jako ścieżka**.

**Pomiar 3 — co w ogóle zmieniło się przez 69 moich commitów** (`69c2dab..tor9-ustalenia`),
poza `docs/`:

| plik | `git diff --numstat` | co to jest |
|---|---|---|
| `scripts/lint-deklaracje.mjs` | **217 / 0** | **plik NOWY** (`git cat-file -e 69c2dab:…` → nie istniał) |
| `content/deklaracje-zlozone.json` | **19 / 0** | **plik NOWY** — jw. |
| `package.json` | **1 / 0** | jedna linia `"bramka:deklaracje"` |
| `.github/workflows/bramki.yml` | **32 / 0** | nowe zadanie `bramka-deklaracje`, `continue-on-error: true` |
| `CLAUDE.md` | zmiana | zapisy KANONU zlecone przez właściciela |

> ## **ZERO USUNIĘĆ W CZTERECH PLIKACH POZA `docs/`. Ani jeden wiersz cudzego pliku
> ## nie został skasowany ani podmieniony. Żadna mutacja nie przeżyła — i wiem to
> ## z sum, nie z tego, że komenda nie krzyknęła.**

**Czego ten pomiar NIE obejmuje — granica wypisana, nie przemilczana:**
mutacja, która **została zacommitowana i cofnięta** w obrębie tych 69 commitów, wychodzi
tu na zero i **jest nieodróżnialna od mutacji, której nie było**. To dla pytania
„czy coś zostało" jest odpowiedź poprawna, ale dla pytania „czy coś się wydarzyło" —
nie. Drugiego pytania **nie mierzyłem**.

**Defekt uboczny, nie naprawiam (zgodnie z zakazem naprawiania niezleconego):**
dopisany wiersz w `package.json` ma **wcięcie 2 spacji przy 4 u sąsiadów**.
Kosmetyczny, w pliku, który sam ruszyłem.

### 217.2 Granica dostępu **zmierzona** — jest znacznie szersza, niż sądziłem

**(a) Repozytorium strony — gałąź robocza żyje i odjechała mi o dwadzieścia commitów.**

`git ls-remote` mówi `84a7037`; mój egzemplarz stał na `69c2dab`. **`git fetch origin
faza-4/podstrony` PRZESZEDŁ** — dostęp do odczytu miałem cały czas.

```
20 commitów, ostatni 84a7037 z 2026-08-24 12:59:34 +0200
```

> **To jest PIĘĆ MINUT przed Pana wiadomością TOR9/021 (13:02). Gałąź, o której
> myślałem „stan strony", była migawką sprzed dwudziestu commitów.**

**Co z tego dotknęło materiału, który mierzyłem — pomiar, nie domysł:**

| katalog | w tych 20 commitach |
|---|---|
| `content/` (w tym `tabela-obietnic.md`, `facts.json`, `inwentarz-funkcji.md`) | **NIE RUSZONE** |
| `src/` (w tym wszystkie trzy pliki komunikatów) | **NIE RUSZONE** |
| `e2e/` (strażnicy) | **NIE RUSZONE** |

> ## **DRYF NA MIERZONYM MATERIALE = 0. Wszystkie pomiary tego toru — warstwa
> ## czytelnika 23/69, karta łańcuchów I/II/III, klasa 3 (22×3), przebieg 2 —
> ## STOJĄ. Sprawdzone wobec ŻYWEJ gałęzi, nie wobec mojej migawki.**

**Co odjechało i mnie DOTYKA — cztery pliki w kolizji i jeden ADR:**

| plik | zmiana na gałęzi roboczej | dlaczego mnie dotyczy |
|---|---|---|
| `CLAUDE.md` | **+374 / −8** | **ja też do niego dopisuję** — moja wersja jest o 374 wiersze w tyle |
| `.github/workflows/bramki.yml` | **+152 / −0** | moje zadanie `bramka-deklaracje` dopisane do wersji nieaktualnej |
| `package.json` | **+2 / −0** | moja linia ląduje w tym samym miejscu |
| `docs/faza-2/rejestr-warunkow-powrotu.md` | **+104 / −2** | **ja też go edytuję** |
| `docs/adr/018-prymat-nieodwracalnego.md` | **+10 / −0** | **ADR, który stosuję jako regułę nadrzędną, został ZMIENIONY** |

**Nowe u nich, u mnie nieznane:** `docs/PRZEKAZANIE-SESJI.md` (2465 wierszy),
`docs/BRIEFING-MIEDZY-SESJAMI.md` (306), `docs/faza-2/dowody-wartosci-regul.md` (109),
`scripts/straznik-po-pomiarze.mjs` (180), `scripts/werdykt-marginesu.mjs` (220).

**Dopisany punkt 7 ADR-018 — cytat, bo dotyczy mnie wprost:**

> **„Zlecenie pod złym adresem odsyła się, nie wykonuje w przybliżeniu.** Reguła
> obowiązuje w obu kierunkach: odbiorca nie wykonuje zlecenia w repozytorium, do
> którego ono nie należy; nadawca sprawdza adres przed wysłaniem. […] Wzorzec: T35
> (2026-08-23) — pięciokrotne wysłanie zlecenia pod zły adres przez nadawcę;
> **T27 (2026-08-23) — wykonanie po stronie strony rzeczy należącej wyłącznie
> do repozytorium aplikacji.**"

**(b) Repozytorium aplikacji — TRZYNAŚCIE gałęzi, nie jedna.**

```
claude/atlas-knowledge-layer-audit-f5f69e     claude/pwa-rewizja-catherly-w91p1u
claude/guardians-audit-3kiunn                 claude/tor2-thriving-lifestyle-review-zu68fk
claude/mapa-propagacji-wzorcow-qnzub5         claude/verify-promises-table-3s4ksg
claude/module-fitness-classification-4sp3so   feat/cs-build   feat/kontrowersje
claude/public-surfaces-audit-ui4wkh           feat/przewodnik feat/runbook   main
```

Pobrałem cztery. Na `claude/verify-promises-table-3s4ksg` leży **3841 plików** —
**pełne źródło aplikacji**: `src/`, `prisma/` (w tym migracje), `e2e/`, `scripts/`,
`vercel.json`, `docs/`.

> ## **Miałem dostęp do CAŁEJ aplikacji. Przez dwa dni pisałem „R-C — artefakt
> ## poza repozytorium" o plikach oddalonych o jedno `git fetch`.**

**Sprostowanie źródła w A-15:** zapisałem, że dorobek toru 10 leży na gałęzi
**`feat/cs-build`**. **Zmierzone:** `git ls-tree -r origin/feat/cs-build --
docs/weryfikacja-obietnic/` zwraca **PUSTO**. Dwadzieścia jeden dokumentów
(≈ 800 kB, w tym `92-PRZEKAZANIE-TOR-9.md`) leży na **`claude/verify-promises-table-3s4ksg`**.
Przekazałem dalej **złą gałąź** — i nikt tego nie sprawdził, bo brzmiało konkretnie.

### 217.3 Przeliczenie jedenastu — **cztery zamknięte odczytem, w tym jedno zdjęcie `P-22`**

**A-16 — „30 minut wpisane na sztywno przy cronie co 15 minut". BYŁO: `PRZYJĘTE BEZ
SPRAWDZENIA — P-22`. JEST: `SPRAWDZONE DRUGĄ DROGĄ`. `P-22` ZDJĘTE.**

Dowód są cytaty, nie wskazania (R-F):

```
src/lib/calendar/calendar-reminders.ts:20
    const REMINDER_LEAD_MS = 30 * 60 * 1000

vercel.json:23-24
    "path": "/api/cron/reminders",
    "schedule": "*/15 * * * *"
```

**I to samo, powiedziane przez autora kodu w komentarzu tego pliku (wiersze 110–111):**

> „okno to **30 minut w przód**, cron chodzi **co 15 minut**, więc event ma **około dwóch**
> podejść, nie jedno. Ale po `startTime` **mija bezpowrotnie**."

**KONSEKWENCJA REDAKCYJNA — to nie jest tylko domknięcie rejestru, to POZYCJA DLA STRONY.**
Mechanizm daje **przedział z górnym ograniczeniem**: przypomnienie wychodzi na tyknięciu
crona po wejściu spotkania w okno, czyli **między 30 a ~15 minutą przed**, nigdy *o* 30.
Do tego `budzetMs: 45_000` i pole zwrotne `zatrzymanyNaBudzecie` — **przebieg wolno
przerwać na budżecie**, a wtedy bez wysyłki zostają spotkania najdalsze w czasie.

| | |
|---|---|
| co mówi kod | „**do** 30 minut przed", z możliwością pominięcia przy budżecie |
| co mówi aplikacja użytkownikowi | `templateData: { minutes: '30' }` — **treść powiadomienia twierdzi „30"** |
| co mówi `content/facts.json` | wpis `przypomnienie-kalendarza-minuty` — **liczba punktowa** |

> ## **KLASA: LICZBA PUNKTOWA TAM, GDZIE MECHANIZM DAJE PRZEDZIAŁ.**
> ## Nie jest to przesada korzyści ani obietnica wyniku — jest to **precyzja, której
> ## mechanizm nie utrzymuje**. Reguła R-G (granica bije korzyść) każe napisać granicę.
>
> **I OBIEG ZAMKNIĘTY, ODNOTOWANY OSOBNO:** aplikacja mówi użytkownikowi „30", strona
> mówi „30", `facts.json` mówi „30” — **a wszystkie trzy „30" pochodzą z tej samej
> stałej, nie z trzech niezależnych pomiarów.** Zgodność trzech kopii **nie jest
> potwierdzeniem**. To dokładnie ten sam kształt, co A-05 (`zrodlo` wskazujące
> na tabelę obietnic), tylko o jedno ogniwo dłuższy.

**A-04 — osiem limitów planów. BYŁO: `PRZYJĘTE BEZ SPRAWDZENIA` („nie mam czym
zweryfikować"). JEST: `SPRAWDZONE DRUGĄ DROGĄ`.**

`src/lib/api/plan-limits.ts:11–43` — cztery pary z `facts.json`, **wszystkie cztery
zgadzają się co do znaku**:

| wiersz `/cennik` | klucz w kodzie | STARTER | GROWTH | PRO |
|---|---|---|---|---|
| Kontakty | `candidates_count` | **50** | **200** | `-1` |
| Zespół | `team_members` | **10** | **50** | `-1` |
| Posty miesięcznie | `posts_per_month` | **20** | **100** | `-1` |
| Sesje Sali Treningowej | `simulator_sessions` | **5** | **30** | `-1` |

> **Domknięcie, którego wcześniej nie miałem: cztery komórki „bez limitu"
> w kolumnie PRO mają pokrycie — wszystkie cztery klucze to `-1` w kodzie.**
> Do dziś stały na cudzym słowie.

**POZYCJA ODWROTNA (ADR-018 czyta się w drugą stronę — pokrycie bez obietnicy):**
kod trzyma **dziesięć** wymiarów limitu na plan, strona pokazuje **cztery**.
Niepokazane: `ai_calls_per_month` (100/500/−1), `social_platforms` (2/5/−1),
`pdf_per_month` (10/50/−1), `storage_gb` (**1/5/20**), `tl_entries_per_month`,
`tl_whisper_per_month`. **To NIE jest naruszenie** — to sześć granic, o których strona
milczy. Dwie uwagi:
- `storage_gb` **na PRO wynosi 20, nie „bez limitu"** — jedyny wymiar, w którym plan
  najwyższy ma **skończony sufit**. Strona nie ma wiersza o miejscu na pliki, **więc
  nie kłamie** — ale gdyby kiedykolwiek go dopisała, „bez limitu" byłoby tam fałszem.
- `tl_whisper_per_month: 5, // (⚑ mapowanie do zatwierdzenia)` — **flaga → MILCZENIE**
  wedle gramatyki tabeli obietnic. Strona milczy. **Zgodne.**

**A-20 — baza w UE. Było: `SPRAWDZONE DRUGĄ DROGĄ` (dwa odczyty cudze). Teraz mam
odczyt WŁASNY, trzeci i czwarty:**

```
docs/OPERATIONS.md:14   aws-1-eu-central-1.pooler.supabase.com:5432
docs/ODSTEPSTWA.md:56   Session pooler: aws-1-eu-central-1.pooler.supabase.com:5432
docs/ZADANIA_RECZNE.md:394   supabase.com → New project (eu-central-1) ✅ zrobione
```

Warstwa faktu **zamknięta czterema niezależnymi odczytami**. Warstwa prawna (jak
wolno to nazwać na stronie) **nadal u właściciela** — bez zmian.

**A-22 / `RECZ-250` — migracja walutowa. Było: „migracja ISTNIEJE — potwierdziłem;
stan produkcji R-C". Potwierdzam własnym odczytem drzewa:**

```
prisma/migrations/20260814210000_ceny_per_waluta/migration.sql
```

**Stan produkcji pozostaje `R-C` i pozostanie** — repozytorium nie mówi, co jest
wdrożone. To jest granica **rzeczywista**, nie z przekonania: żaden `fetch` jej
nie zdejmie.

### 217.4 Klasa, którą ten pomiar dopisuje do rejestru przesłanek

> ## **GRANICA PRZYJĘTA Z PRZEKONANIA UTRZYMUJE SIĘ DŁUŻEJ NIŻ GRANICA ZMIERZONA,
> ## BO NIE MA CZEGO ODŚWIEŻAĆ.**

§209 nazwał to raz: „nie mam dostępu do kodu aplikacji" było nieprawdą. **Dziś ta sama
klasa wróciła w DWÓCH nowych miejscach** — i to jest jej istotna właściwość:

1. **gałąź robocza strony** — miałem ją za stan bieżący, była o 20 commitów w tyle,
   a `fetch` przechodził **przez cały czas**;
2. **`feat/cs-build` jako adres dorobku toru 10** — podałem dalej gałąź, na której
   tego katalogu **nie ma**.

> **Sprostowanie klasy nie jest jej domknięciem. Po §209 uznałem sprawę za zamkniętą —
> a §209 był JEDNYM przypadkiem klasy, nie klasą. To jest dokładnie figura z DOMKNIĘCIA
> KANONU: „kto właśnie opisał klasę, jest bardziej narażony, nie mniej".
> Dwunasty dziś przypadek reguły trafiającej we mnie.**

**Co z tego wynika mechanicznie, nie moralnie** — bo reguła opisująca klasę jest
narzędziem rozpoznania po fakcie, a zabezpieczeniem jest przeliczenie:

> ## **KAŻDE ZDANIE O NIEDOSTĘPNOŚCI NIESIE KOMENDĘ I JEJ WYNIK ALBO NIE WCHODZI
> ## DO SPRAWOZDANIA.** (R-H zastosowane do siebie: twierdzenie o nieistnieniu
> ## DOSTĘPU jest twierdzeniem o nieistnieniu.)

---

## §218 — 41 POZYCJI TORU 10 ZDERZONE ZE STRONĄ (zlecenie TOR9/023, pozycja druga)

**Dokument źródłowy odczytany w całości:** `docs/weryfikacja-obietnic/92-PRZEKAZANIE-TOR-9.md`,
repozytorium `catherly-app/fbo-os`, gałąź `claude/verify-promises-table-3s4ksg`.

> **Zdanie toru 10, które wyznacza MOJĄ część roboty — cytat:**
> „Zdanie «strona twierdzi» znaczy tu «wiersz tabeli **uprawnia** stronę do twierdzenia»
> — **czy strona z tego uprawnienia skorzystała, sprawdzacie Wy.**"

To jest dokładnie ta granica, której nie wolno przekroczyć w drugą stronę: **tor 10
nie widział strony.** Poniżej mierzę, w których miejscach strona **skorzystała**
z uprawnienia, które kod odbiera.

### 218.1 Trafienia DOSŁOWNE — strona mówi to, co tor 10 obalił, słowo w słowo

Nie „podobnie". **Znak w znak**, wyciągnięte z `src/i18n/messages/pl.json`.

| poz. toru 10 | klucz strony | brzmienie na stronie | co mówi kod (tor 10) |
|---|---|---|---|
| **52** | `Cennik.plany.pro.pozycja4` **oraz** `DlaKogo.s3_plan_3` | „**Czysty eksport — twoje materiały bez sygnatury polecającej**" (w `DlaKogo` z dopiskiem „jest w planie Pro") | **żaden eksport nie osadza sygnatury** — czysty eksport ma **każdy** plan. `signature-service.ts:37`, potwierdzone trzema metodami |
| **50** | `Cennik.plany.pro.pozycja1` | „Ranking — widzisz swoje miejsce **na tle innych użytkowniczek**" | ranking bramkowany liczy „**ja + downline**"; produkt sam nazywa go rankingiem **zespołu** |
| **51** | `Cennik.plany.pro.pozycja2` | „Klucze API i webhooki — łączysz Catherly z własnymi narzędziami" | bramka PRO **wejściowa, nie ciągła**; zakres tras z kluczem istotnie węższy |
| **49** | `Cennik.plany.growth.pozycja2` · `FunkcjeZespol.f8_3` · `DlaKogo.s3_plan_2` | „**W planie Growth** masz widok całego drzewa struktury" | widok **niebramkowany na trasie**; bramka pilnuje zapisów |
| **41** | `Cennik.faq.o2` | „Wybierasz plan i **zmieniasz go kiedy chcesz**" | `subscription_update: { enabled: false }` — jedyna droga zmiany planu wyłączona |
| **2** | `FunkcjePozyskiwanie.mod2_poco` · `DlaKogo.s1_robi_1` | „`{minuty}` minut przed **każdą** rozmową Catherly przypomina ci o niej" | okno 30 min przy cronie `*/15` — realnie ~15–30 min |

> ## **SZEŚĆ POZYCJI, DZIEWIĘĆ MIEJSC NA STRONIE. Cztery z nich to `/cennik` —
> ## czyli moja trasa i trasa, o której właściciel powiedział, że pozycje cennikowe
> ## mają inną ścieżkę decyzji niż treść.**

**Dwie z nich są w łańcuchach równości**, więc nie da się ruszyć jednego miejsca:
poz. **49** siedzi w **trzech** kluczach (`Cennik` + `FunkcjeZespol` + `DlaKogo`),
poz. **2** w **dwóch** kluczach ×3 języki ×2 warstwy = **12 wystąpień** (`MATERIAL-A16-PRZEDZIAL.md`).

### 218.2 Zbieżność niezależna — pozycja 2 i pozycja 41 zmierzone przeze mnie WCZEŚNIEJ

**Pozycję 2 zmierzyłem z kodu w §217.3, zanim przeczytałem `92-PRZEKAZANIE-TOR-9.md`.**
Dwie drogi, jeden wynik, ten sam plik i te same dwie stałe.

**I to samo przy pozycji 41:** cytat `subscription_update: { enabled: false }`
odczytałem sam 2026-08-23 (A-06, `scripts/setup-stripe.ts:44-55`).

> **To jest różnica między adresem konkretnym a zmierzonym, tym razem po dobrej
> stronie: dwa niezależne odczyty tego samego pliku dały ten sam wynik. Zbieżność
> policzona, nie założona.**

### 218.3 CO DOKŁADAM DO POZYCJI 2 — druga wada, której tor 10 nie ma

Ich kolumna opisuje **czas doręczenia**. Kod niesie **drugą, niezależną** wadę:

```
budzetMs: 45_000        // przebieg wolno przerwać
zatrzymanyNaBudzecie    // pole zwrotne mówiące, że przerwano
where: { startTime: { gt: now, … } }   // po starcie warunek przestaje łapać
```

> ## **Słowo „KAŻDĄ" nie ma pokrycia niezależnie od tego, o której minucie
> ## przychodzi przypomnienie.** Przy przerwaniu na budżecie bez wysyłki zostają
> ## spotkania **najdalsze w czasie** — i jeśli następny przebieg ich nie złapie
> ## przed `startTime`, **przypomnienie przepada bezpowrotnie.**

**Zgłaszam zwrotnie do toru 10 jako uzupełnienie ich pozycji 2**, nie jako sprostowanie:
ich obserwacja jest prawdziwa, jest tylko **węższa niż zjawisko**.

### 218.4 Trafienie ODWROTNE — strona jest OSTROŻNIEJSZA, niż wolno jej być

Pozycja **21** („z asystentem AI piszesz i edytujesz treści" — bez klucza wraca gotowiec):

```
FunkcjeIndeks.f8_2        = „Asystenta AI nie dostajesz w żadnym planie."
FunkcjePozyskiwanie.f8_2  = „Asystenta AI nie dostajesz w żadnym planie."
FunkcjePozyskiwanie.aiGranica = „Asystent nie napisze tekstu zamiast ciebie — proponuje, ty piszesz."
```

> **Strona NIE skorzystała z uprawnienia.** Tabela obietnic pozwalała twierdzić
> więcej; strona mówi mniej i mówi to **dwukrotnie, granicą.** **Pozycja 21 nie
> jest defektem tej strony.**

**To jest dokładnie ten kierunek odczytu ADR-018, o którym mówi „POZYCJA ODWROTNA":**
ADR chroni przed obietnicą bez pokrycia, **nie chroni przed pokryciem bez obietnicy.**
Tu wyszło **na korzyść** — ale wyszło **przypadkiem**, nie z bramki.

### 218.5 Domknięcie własnego §217.3 — milczenie strony było DECYZJĄ, nie przeoczeniem

W §217.3 napisałem, że kod trzyma **dziesięć** wymiarów limitu, strona pokazuje
**cztery**, i nazwałem to „sześcioma granicami, o których strona milczy".
**Odczyt `content/facts.json` (wiersz 53) pokazuje, że milczenie ma zapisany powód:**

> „**NIE wpisano** (rejestr warunków powrotu poz. 4-6): `storage_gb` 1/5/20 (Storage
> martwy), `ai_calls_per_month` 100/500 (klucz pusty), `social_platforms` 2/5 (zgody
> platform), `website_pages` 3/10 (**limit nieegzekwowany**), `pdf_per_month` 10/50
> (generator martwy)."

**Moja formuła była nieprecyzyjna i poprawiam ją, nie zamazując:** to nie jest
milczenie z przeoczenia, to **milczenie rozstrzygnięte i uzasadnione po funkcji**.

> ## **I WIĘCEJ: DWA z tych pięciu uzasadnień POKRYWAJĄ SIĘ Z USTALENIAMI TORU 10,
> ## których autor `facts.json` nie mógł znać** — „generator martwy" wobec ich poz. **39**
> („kod kompletny, brak **pakietu npm**") i „klucz pusty" wobec poz. **21** i **9**
> (bez klucza model oddaje gotowca w kopercie sukcesu). **Dwa tory, dwa terminy,
> ten sam wynik.**

> **⚠ POPRAWIONE W TYM AKAPICIE, PRZED ZAPISEM.** Napisałem najpierw **„cztery
> z pięciu"** i dopisałem trzecią parę — „zgody platform" wobec ich poz. 46.
> **Sprawdzenie: poz. 46 dotyczy zdania „porządkuje pracę zespołu", nie zgód
> platform.** Para była zmyślona przez podobieństwo tematu. `storage_gb`
> („Storage martwy") i `social_platforms` („zgody platform") **nie mają
> odpowiednika wśród 41 pozycji** — i nie znaczy to, że go nie ma w kodzie;
> znaczy, że **tor 10 tego nie badał**.
>
> **To jest ten sam błąd, który wczoraj kosztował mnie bilans „7 · 11": liczba
> napisana o ruch wcześniej, niż ją zmierzono.** Tym razem złapana **przed**
> commitem — i to jedyna różnica, bo klasa jest identyczna. **Trzynasty przypadek
> reguły trafiającej we mnie.**

**Jedno uzasadnienie jednak się rozjeżdża i to jest znalezisko:**
`website_pages` — `facts.json` pisze „**limit nieegzekwowany**", tor 10 w pozycjach
**53–55** pisze to samo o **kontaktach, postach i zespole** (1 z 7, 2 z 9, 1 z 2 ścieżek).

> ## **Strona zataiła `website_pages`, BO limit nie jest egzekwowany — a pokazuje
> ## cztery inne, o których tor 10 mówi, że TEŻ nie są.** Kryterium było właściwe.
> ## **Zastosowano je do jednego wiersza zamiast do wszystkich — bo tylko o jednym
> ## ktoś wtedy wiedział.**

To nie jest zarzut wobec autora `facts.json`: **przy jego stanie wiedzy zrobił
dokładnie to, co należało.** To jest własność **kryterium zastosowanego raz**.

### 218.6 CZEGO W TYM PRZEBIEGU NIE ZMIERZYŁEM (R-D — obowiązkowy)

1. **Nie przeszedłem 41 pozycji po kolei.** Zmierzyłem **21 wiązek frazowych**
   przez `messages` (330 kluczy) i `content/` (45 plików). **Trafienia dosłowne
   raportuję; braku trafienia NIE raportuję jako braku twierdzenia na stronie** —
   fraza mogła być sparafrazowana, a mój filtr jej nie widzi.
2. **Nie otworzyłem raportów obszarowych `A1`–`A9`** (≈ 600 kB) ani
   `99-ZESTAWIENIE-KONCOWE.md`. Cytuję **wyłącznie** przekazanie `92-`.
   **Dowody `plik:linia` dla pozycji 1, 3, 4, 6, 14, 19, 20, 25, 43 leżą tam
   i ich nie mam.**
3. **Trzynastu „zawężeń cichych" nie tknąłem** — to jest osobny przebieg,
   bo tam nie ma zdania do obalenia, tylko granica, która wychodzi przy użyciu.
4. **Nie sprawdziłem pozycji 53–55 na stronie.** Twierdzenie „limity egzekwowane
   w kodzie" **nie stoi na stronie jako zdanie** — stoi w `content/tabela-obietnic.md`
   i w `facts.json` jako **uzasadnienie wpisania liczb**. To jest inny gatunek
   pozycji i wymaga osobnego rozstrzygnięcia właściciela.
5. **Trzy poprawki do dokumentów** z `92-` — poprawkę 1 (`/cennik` czwartą kopią)
   mam jako A-23; poprawek 2 i 3 **nie weryfikowałem**, dotyczą repozytorium aplikacji.

---

## §219 — PRZEBIEG 2 DLA EN I DE (podzbiór otwarty nr 2, po drugim odroczeniu)

**Przebieg 2 = trasa × trasa **w jednym języku**: dwa miejsca mówią o tej samej
rzeczy i mówią to inaczej.** Wykonany dotąd wyłącznie dla PL (§198).

### 219.1 Jednostka — **INNA DLA KAŻDEGO JĘZYKA, i to jest wynik, nie szczegół**

Zadeklarowana **przed** pomiarem:

| język | dopasowanie nazwy | dlaczego |
|---|---|---|
| **PL** | rdzeń przez obcięcie końcówki | rzeczownik się odmienia |
| **EN** | **nazwa dosłownie** | nazwy kanoniczne w EN się nie odmieniają |
| **DE** | **nazwa dosłownie** | jw.; **W-DE: niemiecki tworzy złożenia i odmienia przypadki — wynik DE jest DOLNYM OGRANICZENIEM** |

### 219.2 Wynik — i dlaczego **NIE podaję liczby dla PL**

| język | kandydatów na rozjazd źródłowy |
|---|---|
| **EN** | **90** |
| **DE** | **82** (dolne ograniczenie) |
| **PL** | **nie ustalone — patrz niżej** |

Skrypt PL, uruchomiony dwiema regułami rdzeniowania, dał **69** (rdzeniowanie
ostatniego wyrazu) i **49** (rdzeniowanie każdego wyrazu). **To nie są dwa oszacowania
tej samej wielkości — to dwa RÓŻNE zbiory:**

| wariant | grupy przedmiotów, które widzi |
|---|---|
| ostatni wyraz (69) | Pulpit · Tarcza · Pierwsze 90 Dni · Studio · Paszport zgodności · Świadectwo · Twój Wrapped · Sala Treningowa · Pieczęć Etyczna · Wall of Proof |
| każdy wyraz (49) | Pulpit · Tarcza · Studio · Świadectwo — **i nic więcej** |

Pierwszy gubi nazwy, w których **odmienia się pierwszy człon** („**bazę** kontaktów");
drugi gubi nazwy z krótkim wyrazem, który nadmiernie obcina („Pierwsze 90 **Dni**").

> ## **DWIE REGUŁY, DWIE DZIURY, ŻADNEJ WSPÓLNEJ. Liczby dla PL NIE PUBLIKUJĘ —
> ## nie dlatego, że jest niska, tylko dlatego, że nie wiem, czego jest liczbą.**
>
> To jest ten sam ruch, co w §186.1, gdzie odmówiłem publikacji „18/17/20 pękniętych"
> i policzyłem ręcznie. **Wtedy to mnie uratowało przed defektem, którego nie ma.**

**Dowód rozstrzygający, że dziura PL jest realna, a nie hipotetyczna:**

| przedmiot | EN | DE | PL (oba warianty) |
|---|---|---|---|
| **baza kontaktów / contact base / Kontaktbasis** | **12 par** | **13 par** | **0 par** |

> ## **CAŁY PRZEDMIOT — jeden z filarów produktu — nie istniał dla przebiegu 2
> ## po polsku. Nie „miał mało par". ZERO.**

**I ostrzeżenie o samym zestawieniu:** liczby **90** i **82** wolno porównywać ze sobą
(ta sama reguła), ale **nie wolno ich porównywać z żadną liczbą PL** — bo PL mierzy
inną jednostką. **Postawienie trzech liczb w jednym wierszu tabeli samo zaprasza
do porównania, którego nie wolno zrobić.** Dlatego wiersz PL zostaje pusty,
a nie wypełniony gwiazdką.

### 219.3 ZNALEZISKO `RŹ-2` — łańcuch równy w PL i EN, **PĘKNIĘTY W DE**

Najsilniejszy kandydat DE (podobieństwo 0.71, 63 znaki wspólne):

| język | `Filary.filar1.korzysc` (trasa `/`) | `FunkcjePozyskiwanie.zdanie` (trasa `/funkcje/pozyskiwanie`) | |
|---|---|---|---|
| **PL** | „Masz **plan działania** i bazę, która rośnie, gdy ty prowadzisz rozmowy." | **identyczne, znak w znak** | **ŁAŃCUCH CAŁY** |
| **EN** | „You have **a plan for the day** and a contact base that grows while you do the talking." | **identyczne, znak w znak** | **ŁAŃCUCH CAŁY** |
| **DE** | „Du hast **einen Plan für den Tag** und eine Kontaktbasis…" | „Du hast **einen Aktionsplan** und eine Kontaktbasis…" | **PĘKNIĘTY** |

**Co dokładnie pękło:** na trasie `/` DE mówi opisowo („plan na dzień"), na
`/funkcje/pozyskiwanie` **nazywa moduł** („Aktionsplan"). To jest **jednocześnie**:
- **pęknięcie kolumny I** (równość znak-w-znak, która trzyma w PL i EN),
- **rozjazd kolumny II** (nazwa słownikowa w jednym miejscu, opis w drugim).

**Zgodne z ustaleniem centralnym tego toru** („granice pękają w źródle, obietnice
w przekładzie") — to jest **obietnica pęknięta w przekładzie**, w jedynym języku.

> ## **I RZECZ METODYCZNA, WAŻNIEJSZA NIŻ SAMO ZNALEZISKO:**
> ## **PĘKNIĘCIE ŁAŃCUCHA PRZENOSI PARĘ Z JEDNEGO PRZEBIEGU KONTROLI DO DRUGIEGO.**
>
> Dopóki para jest łańcuchem, przebieg 2 ją **wyklucza z definicji** (W3: pary
> dzielące jednostkę twierdzenia). Kiedy łańcuch pęka — para **wpada** do przebiegu 2.
> Znalazłem to **tylko dlatego, że uruchomiłem przebieg 2 dla DE.**
>
> **Wniosek: przebieg, który wyklucza łańcuchy, jest ślepy na łańcuchy CAŁE — a ten,
> który porównuje języki, powinien był to złapać i nie złapał. Defekt siedział
> w szczelinie MIĘDZY dwoma przebiegami, nie w żadnym z nich.**

### 219.4 Stan trzech podzbiorów po tym przebiegu (R-D)

| podzbiór | stan |
|---|---|
| przebieg 2 dla EN i DE | **ZAMKNIĘTY** — EN 90, DE 82 (dolne ograniczenie), `RŹ-2` wyprowadzone |
| przebieg 2 dla PL | **OTWARTY PONOWNIE** — jednostka nie trzyma, liczba wycofana |
| kolumna II — rozstrzygnięcia „opisowe / kanoniczne" | **OTWARTY, trzecie odroczenie** — ale `RŹ-2` daje pierwszy **zmierzony** przypadek pary opis↔nazwa i jest materiałem wyjściowym |
| warunek §168 (wystawiony dla 42, sprawdzony na 2) | **OTWARTY, trzecie odroczenie** — nie ruszony w tym przebiegu |

**Nie ukrywam trzeciego odroczenia dwóch z nich pod zamknięciem trzeciego.**
Zamknął się **jeden** podzbiór z trzech, a przy okazji **otworzył się z powrotem
czwarty**, który uważałem za zamknięty od 22 sierpnia.

---

## §220 — KOLUMNA II ROZSTRZYGNIĘTA (podzbiór odraczany trzykrotnie, zlecenie TOR9/024)

### 220.1 Dlaczego to stało trzy razy — **kryterium leżało w źródle, którego czwartą kolumnę mój parser WYRZUCAŁ**

Odraczałem rozstrzygnięcie „opisowe czy kanoniczne", jakby wymagało decyzji. **Nie wymagało.**
`docs/faza-2/slownik-nazw.md` ma **cztery** kolumny: `PL | EN | DE | Uwagi`.
Kolumna `Uwagi` **niesie rozstrzygnięcia** — i to imienne:

```
| Cel z kamieniami milowymi | goal with milestones | Ziel mit Meilensteinen | opisowe |
| Baza kontaktów           | contact base         | Kontaktbasis           | opisowe |
| Puls zespołu | Team Pulse | Team-Puls | zawsze z członem „zespołu" |
| Ranking      | Leaderboard| Rangliste | bramka PRO |
```

**Mój skrypt czytał `c[0], c[1], c[2]` i pomijał `c[3]`.** Ten sam skrypt karmił
kolumnę II, przebieg 2 i pomiar nazw z §189.

> ## **PODZBIÓR NIE BYŁ OTWARTY. BYŁ NIEODCZYTANY.**
> ## Trzy odroczenia dotyczyły pracy, która w części była już wykonana — przez kogoś
> ## innego, w pliku, który czytałem codziennie, w kolumnie o jedną w prawo.

**Klasa do rejestru przesłanek** — siostra „adresu konkretnego":

> ## **NARZĘDZIE, KTÓRE CZYTA ŹRÓDŁO WYBIÓRCZO, PRODUKUJE BRAK WYGLĄDAJĄCY
> ## NA BRAK W ŹRÓDLE.** Odczyt częściowy nie zgłasza się jako częściowy —
> ## zgłasza się jako **kompletny wynik z mniejszej dziedziny.**

### 220.2 Jednostka i liczba — **NIE jest to ten sam zbiór, co zapisane „55 / 71 / 70"**

**Jednostka zadeklarowana przed pomiarem:** *wystąpienie = wartość klucza, która
ZAWIERA nazwę kanoniczną i jest od niej DŁUŻSZA*. Wyłączenia wbudowane: klucze-etykiety
(`*_nazwa`, `Cennik.tabela.*`, `okruszek`, `Nawigacja.*`, `*Naglowek`) — etykieta nie
jest ciągiem dłuższym.

| | PL | EN | DE |
|---|---|---|---|
| **ten pomiar** | **51** | **63** | **63** |
| zapisane 2026-08-21 | 55 | 71 | 70 |

> **Różnicy NIE uzgadniam i nie twierdzę, że jedna z liczb jest błędna.**
> Zbiór z 21 sierpnia **nigdy nie został wypisany pozycja po pozycji** — jest tylko
> liczbą pod tabelą. **Nie ma czego z czym porównać.** Ta liczba jest wypisana
> **w całości** poniżej, więc następny pomiar będzie miał z czym.

### 220.3 ROZSTRZYGNIĘCIE — 16 nazw, 51 wystąpień PL

| nazwa | ×PL | werdykt | podstawa (kolumna `Uwagi` słownika) |
|---|---|---|---|
| Pulpit | 8 | **KANONICZNA** | wiersz słownika, brak adnotacji „opisowe" |
| Tarcza | 7 | **KANONICZNA** | jw.; DE wg app, **nie** „Schutzschild" |
| Pierwsze 90 Dni | 6 | **KANONICZNA** | jw.; adnotacja o wielkości liter — patrz 220.4 |
| Studio | 6 | **KANONICZNA** | jw. |
| Paszport zgodności | 4 | **KANONICZNA** | jw.; DE wg nav app, niespójność po stronie app |
| Świadectwo | 4 | **KANONICZNA z licencjonowanym wariantem** | „wariant techniczny w obawach: Świadectwo SHA-256; na stronie głównej cyfrowy odcisk" |
| Twój Wrapped | 3 | **KANONICZNA** | „d. «Magic Wrapped» — nazwa wycofana z www" |
| Wall of Proof | 3 | **KANONICZNA** | „bez tłumaczenia we wszystkich językach" |
| Pieczęć Etyczna | 2 | **KANONICZNA, skrót dozwolony** | „kafelek skrócony: Pieczęć/Seal/Siegel" |
| Sala Treningowa | 2 | **KANONICZNA** | „d. «Symulator rozmów» — nazwa wycofana z www" |
| DMO — Dzienny Plan Działania | 1 | **KANONICZNA** | wiersz słownika |
| Klucze API | 1 | **KANONICZNA (techniczna)** | „dozwolone nazwy techniczne — bez polskiego odpowiednika" |
| webhooki | 1 | **KANONICZNA (techniczna)** | jw. |
| Puls zespołu | 1 | **KANONICZNA + OBOWIĄZEK FORMY** | „**zawsze** z członem «zespołu»" |
| Ranking | 1 | **KANONICZNA** | „bramka PRO" |
| **Cel z kamieniami milowymi** | 1 | **OPISOWA** | **słownik: „opisowe"** |

> ## **50 KANONICZNYCH · 1 OPISOWA. Kolumna II nie wiąże brzmienia — ale 50 z 51
> ## wystąpień podlega kontraktowi szwu app ↔ www, więc podlega SPRAWDZENIU.**

**Siedemnasta nazwa, której w tej liczbie NIE MA — i to jest wynik, nie przypis:**
`Baza kontaktów` (słownik: **opisowe**). Mój stemmer jej nie widział (§219).
Policzona osobno, dopasowaniem literalnym:

| | PL | EN | DE |
|---|---|---|---|
| „baza kontaktów" / „contact base" / „Kontaktbasis" | **3** | **6** | **6** |

> ## **POLSKI MÓWI O BAZIE KONTAKTÓW O POŁOWĘ RZADZIEJ NIŻ ANGIELSKI I NIEMIECKI.**
> W `Filary.filar1.korzysc`, `Cennik.plany.starter.pozycja3` i `FunkcjePozyskiwanie.zdanie`
> polski mówi samo **„baza"**, tamte dwa **„contact base" / „Kontaktbasis"**.
> Termin jest **opisowy**, więc nie ma naruszenia kontraktu — ale **oryginał jest
> mniej dokładny od swoich przekładów**, w trzech miejscach, w tym w pierwszym
> filarze na stronie głównej.
>
> **To jest to samo zjawisko, co `RŹ-2`, oglądane z drugiej strony**, i domyka §219:
> zero par przebiegu 2 dla „bazy kontaktów" po polsku brało się **i z dziury narzędzia,
> i z tego, że po polsku tej nazwy po prostu jest mniej.**

### 220.4 Cztery obowiązki formy z kolumny `Uwagi` — **SPRAWDZONE, nie przyjęte**

| obowiązek | wynik pomiaru |
|---|---|
| **`Puls zespołu` zawsze z członem „zespołu"** | **SPEŁNIONY 6/6** — `Cennik.plany.growth.pozycja1` i `Cennik.tabela.puls`, ×3 języki: „Puls zespołu" · „Team Pulse" · „Team-Puls" |
| **`Pierwsze 90 Dni` — app pisze małe „dni", do ujednolicenia** | **STRONA SPÓJNA 7/7** — wszystkie wystąpienia z wielkim „Dni". **Rozjazd jest po stronie APLIKACJI**, nie strony. Pozycja do toru aplikacji, nie do redakcji |
| **`Świadectwo` — na stronie głównej „cyfrowy odcisk", wariant techniczny w obawach** | **SPEŁNIONY 2/2** — `Filary.filar4.konkret3` = „Świadectwo **z cyfrowym odciskiem** zostaje…"; `Obawy.o4` = „Świadectwo **SHA-256**" — dokładnie licencjonowany wariant |
| **`Pieczęć Etyczna` — kafelek skrócony** | **NIE SPRAWDZONY** — wymaga odczytu warstwy kafelka, nie ciągu; poza tym przebiegiem |

> **Trzy z czterech spełnione, czwarty nietknięty i tak nazwany.**
> **Żaden z nich nie był wcześniej sprawdzony** — stały jako adnotacje w cudzym
> pliku, które cytowałem, nie mierząc.

### 220.5 Stan podzbiorów po §220 (R-D)

| podzbiór | stan |
|---|---|
| **kolumna II — opisowe/kanoniczne** | **ZAMKNIĘTY** — 51 wystąpień wypisanych, 16 nazw rozstrzygniętych, 3 z 4 obowiązków formy sprawdzone |
| `Pieczęć Etyczna` — kafelek skrócony | **NOWY, otwarty** — wydzielony z powyższego, żeby nie zniknął w zamknięciu |
| przebieg 2 dla PL | otwarty — warunek właściciela: **najpierw jedna reguła rdzeniowania z uzasadnieniem, potem liczba** |
| `website_pages` — przeliczenie czterech limitów | otwarty, następny w kolejce |
| warunek §168 (42 wystawione, 2 sprawdzone) | **otwarty, CZWARTE odroczenie** |

---

## §221 — `website_pages` DOKOŃCZONE: cztery pokazywane limity tym samym kryterium

**Zlecenie TOR9/024:** *„kryterium właściwe zastosowane do jednego wiersza — dokończ:
przelicz pozostałe cztery pokazywane limity tym samym kryterium (egzekwowany/nie),
jedna tabela, zero zmian na stronie."*

**Kryterium — dosłownie to, którym `facts.json` wyciął `website_pages`:**
limit jest **EGZEKWOWANY**, gdy **każda** ścieżka kodu tworząca liczony obiekt
przechodzi przez sprawdzenie limitu; **NIEEGZEKWOWANY**, gdy choć jedna omija.

**Pomiar własny**, gałąź `claude/verify-promises-table-3s4ksg`: policzone wywołania
`prisma|tx.<model>.create|createMany|upsert` w `src/**/*.ts` **z pominięciem testów**,
zestawione z wywołaniami `enforcePlanLimit` / `consumePlanLimit` / `zPilnowanymLimitem`.

| wiersz `/cennik` | klucz | model | ścieżek tworzenia | **bramkowanych** | werdykt |
|---|---|---|---|---|---|
| **Kontakty** | `candidates_count` | `Prospect` | **7** | **1** (`candidate-service.ts:140`) | **NIEEGZEKWOWANY** |
| **Posty miesięcznie** | `posts_per_month` | `ContentPost` | **9** | **2** (`content-service.ts:86,162`) | **NIEEGZEKWOWANY** |
| **Zespół** | `team_members` | `TeamMember` | **2** | **1** (`team-service.ts:168`) | **NIEEGZEKWOWANY** |
| **Sesje Sali Treningowej** | `simulator_sessions` | `SimulatorSession` | **1** | **1** (`simulator-service.ts:42→46`) | **EGZEKWOWANY** |
| *(niepokazywany)* `website_pages` | — | — | — | — | **NIEEGZEKWOWANY** — powód wycięcia z `facts.json` |

> ## **TRZY Z CZTERECH POKAZYWANYCH LIMITÓW SPEŁNIAJĄ KRYTERIUM, KTÓRYM WYCIĘTO
> ## `website_pages`. Czwarty — jedyny — nie.**
>
> **Liczby 7 / 9 / 2 zgadzają się z torem 10 co do jednego, a policzyłem je
> nie zaglądając do ich liczb — miałem tylko nazwy plików.** Czwarty limit
> (`simulator_sessions`) **nie występuje u nich wcale**; to jest mój dokład.

### 221.1 Zastrzeżenie, bez którego ta tabela wprowadza w błąd

**„1 z 7" jest liczbą ŚCIEŻEK KODU, nie liczbą sposobów, w jakie użytkowniczka
może przekroczyć limit.** Wśród siedmiu ścieżek `Prospect` są takie, których
bramkowanie **byłoby błędem**:

| ścieżka | czy pominięcie bramki jest wadą |
|---|---|
| `backup-restore.ts:285` — odtworzenie **własnej** kopii | **nie** — odtworzenie nie jest pozyskaniem |
| `interactive-service.ts:251` | **nie rozstrzygam** — nie czytałem tej trasy |
| `candidate-service.ts:140` | bramkowana |
| **`lead-form-service.ts:206`** — zgłoszenie z formularza publicznego | **tak** |
| **`lead-form-service.ts:408`** — import hurtowy | **tak** |
| **`tag-service.ts:315`** | **tak** |
| **`magnet-service.ts:146`** — magnes na leady | **tak** |

**Tor 10 wymienił imiennie DOKŁADNIE te cztery** („omijają: `lead-form-service.ts:206,408`,
`magnet-service.ts:146`, `tag-service.ts:315`) — czyli **sami odjęli odtworzenie kopii
i trasę interaktywną**, choć w liczniku zostawili „1 z 7".

> ## **ICH LICZNIK I ICH LISTA IMIENNA MÓWIĄ CO INNEGO, I TO LISTA MA RACJĘ.**
> „1 z 7" czyta się jako *sześć dziur*; imiennie nazwane są **cztery**.
> **Nie jest to błąd toru 10 — jest to ten sam kształt, co licznik pod tabelą,
> który starzeje się w miejscu: liczba i jej rozpisanie stoją obok siebie
> i rozjeżdżają się cicho.** (§218.5, klasa „licznik ≠ rozpisanie".)

### 221.2 Co z tego wynika dla strony — **i czego NIE zmieniam**

**Zero zmian na stronie, zgodnie ze zleceniem.** Do rozstrzygnięcia właściciela
zostaje pytanie, którego wcześniej nie było czym postawić:

> **Czy liczba w tabeli `/cennik` jest OBIETNICĄ POJEMNOŚCI, czy OBIETNICĄ BRAMKI?**

- Jeśli **pojemności** („tyle mieści plan") — trzy wiersze są prawdziwe,
  bo wartości w kopiach są zgodne, a tor 10 to potwierdza.
- Jeśli **bramki** („po tylu system Cię zatrzyma") — **trzy z czterech są nieprawdziwe**,
  a kryterium z `facts.json` nakazywałoby je **wyciąć tak samo jak `website_pages`**.

**To nie jest pytanie redakcyjne i nie odpowiadam na nie.** Odnotowuję tylko,
że wycięcie `website_pages` **było już odpowiedzią** — udzieloną raz, dla jednego
wiersza, przez kogoś, kto o pozostałych trzech nie wiedział.

---

## §222 — PRZEBIEG 2 DLA PL: **jedna reguła, uzasadnienie, potem liczba**

**Warunek właściciela TOR9/024**, spełniony w tej kolejności.

### 222.1 REGUŁA — i dlaczego ta, a nie próg

> **Z KAŻDEGO wyrazu nazwy zdejmujemy najdłuższą końcówkę z ZAMKNIĘTEJ LISTY
> końcówek fleksyjnych polskich, a dopasowanie budujemy jako WYRAŻENIE PER WYRAZ
> (`rdzeń\w*`), nie jako sklejony ciąg.**

Lista: `ami · ach · owi · ów · om · em · ie · a · ą · e · ę · i · y · o · u`.

**Uzasadnienie, punkt po punkcie:**

1. **Nie ma progu długości.** Próg był źródłem **czterech** błędów tego toru —
   za każdym razem wycinał to, po co dana miara istniała (nazwy modułów są krótkie:
   „Pulpit" 6, „Tarcza" 6, „Studio" 6).
2. **Rdzeniujemy KAŻDY wyraz**, bo polski odmienia oba człony nazwy wielowyrazowej
   („**bazę** kontaktów").
3. **Dopasowanie per wyraz, nie sklejonym ciągiem** — bo odmiana zachodzi **wewnątrz**
   nazwy, a nie tylko na jej końcu. Sklejony rdzeń `baz kontaktów` nie jest podciągiem
   tekstu `bazy kontaktów`. **To była faktyczna przyczyna zera z §219**, nie sam próg.

**OGRANICZENIE WBUDOWANE, nazwane przed pomiarem:** formy z **palatalizacją tematu**
(`Pulpit → Pulpicie`, `Pieczęć → Pieczęci`) nie są łapane — rdzeń przestaje być
prefiksem formy. **Wynik jest DOLNYM OGRANICZENIEM.**

### 222.2 LICZBA

| | PL | EN | DE |
|---|---|---|---|
| kandydatów na rozjazd źródłowy | **39** | 90 | 82 |

**39 — dolne ograniczenie, przy regule z 222.1.** Rozkład: Tarcza 16 · Pulpit 11 ·
Studio 8 · Świadectwo 4.

**I odnotowanie, bez którego liczba kłamie stabilnością:**

| reguła | PL |
|---|---|
| rdzeń ostatniego wyrazu, próg długości (21.08) | 69 |
| rdzeń każdego wyrazu, próg długości | 49 |
| lista końcówek, sklejony ciąg | 47 |
| **lista końcówek, wyrażenie per wyraz** ← **obowiązująca** | **39** |

> ## **CZTERY REGUŁY, CZTERY LICZBY, JEDEN MATERIAŁ. Liczba nie mierzyła strony —
> ## mierzyła regułę.** Dopiero teraz mierzy stronę, bo dopiero teraz reguła ma
> ## uzasadnienie inne niż „tak wyszło".

**Sprawdzenie kontrolne, że spadek 69 → 39 nie jest utratą:** cztery grupy, które
zniknęły z listy PAR (Wall of Proof, Paszport zgodności, Twój Wrapped, Pieczęć Etyczna),
**są dalej znajdowane jako WYSTĄPIENIA** — odpowiednio 4 · 5 · 4 · 3 trafienia.
Wypadły z par, bo ich nośniki dzielą **łańcuch zdaniowy** (np. `Wall of Proof` →
`ZD-6`) albo leżą na tej samej trasie. **Wykluczenie zadziałało poprawnie —
to nie jest dziura.**

### 222.3 PRZYCZYNA ZERA PRZY „BAZIE KONTAKTÓW" — **wielkość liter**, nie fleksja

Nawet z poprawną regułą `Baza kontaktów` dawała **0 trafień**. Powód okazał się
prostszy niż wszystkie dotychczasowe hipotezy: **słownik zapisuje ją WIELKĄ literą,
strona pisze ją małą w środku zdania, a moje dopasowanie było wrażliwe na wielkość liter.**

> ## **TRZY RAZY SZUKAŁEM BŁĘDU W REGULE FLEKSYJNEJ. BŁĄD BYŁ W JEDNEJ FLADZE
> ## WYRAŻENIA REGULARNEGO.**
> Klasa: **im bardziej wyrafinowaną przyczynę już się rozważyło, tym trudniej
> wrócić do banalnej** — poprzednia hipoteza zajmuje miejsce, na którym stałaby ta prosta.

**I stąd rozstrzygnięcie, które łączy §220 z §222:**

> **Wielkość liter jest częścią dopasowania dla nazw KANONICZNYCH i nie jest dla OPISOWYCH.**
> Dla kanonicznej „Tarcza" zapis małą literą **jest naruszeniem kontraktu szwu**;
> dla opisowej „baza kontaktów" jest **normą języka**.

### 222.4 NOWY POMIAR, którego nikt dotąd nie zrobił — i jego wynik

Skoro zapis małą literą jest naruszeniem dla nazw kanonicznych, to jest to
**sprawdzalne**. Przeszukanie 13 nazw kanonicznych ×330 kluczy PL, dopasowanie
**bez wrażliwości na wielkość liter**, zgłoszenie każdego trafienia zaczynającego
się małą literą:

```
=== NAZWA KANONICZNA ZAPISANA MAŁĄ LITERĄ ===
  RAZEM: 0
```

> ## **ZERO NARUSZEŃ. Wszystkie nazwy kanoniczne na polskiej stronie są zapisane
> ## wielką literą.**
>
> **To jest wynik czysty — i odnotowuję go z tą samą wagą, co defekt.** Pomiar,
> który wychodzi na zero, jest wart tyle samo, ile pomiar, który coś znajduje —
> pod jednym warunkiem: że **narzędzie było zdolne coś znaleźć.** To było:
> ta sama komenda znajduje „bazę kontaktów" (opisową, małą literą) w trzech miejscach.
> **Kontrola pozytywna wykonana** — inaczej zero byłoby zerem `zroz.py`.

### 222.5 Stan kolejki (R-D)

| pozycja | stan |
|---|---|
| kolumna II | **ZAMKNIĘTA** (§220) |
| `website_pages` — cztery limity | **ZAMKNIĘTE** (§221) |
| przebieg 2 dla PL | **ZAMKNIĘTY** — reguła uzasadniona, liczba **39**, dolne ograniczenie |
| `Pieczęć Etyczna` — kafelek skrócony | otwarty (nowy, z §220.4) |
| warunek §168 (42 wystawione, 2 sprawdzone) | **otwarty, CZWARTE odroczenie** |
| piąty sędzia — `zroz.py` daje 0/0 | otwarty, narzędzie niezdiagnozowane, **0/0 nadal niezgłaszane** |

---

## §223 — WARUNEK §168 SPRAWDZONY NA WSZYSTKICH 42 (czwarte odroczenie zamknięte)

**Warunek, dosłownie:** *„Przed wejściem KAŻDEJ pozycji sprawdź, czy usuwa albo zmienia
ciąg będący JEDYNYM pokryciem innego klucza. Jeśli tak — pozycja wymienia to wprost
albo NIE WCHODZI."*

### 223.1 Operacjonalizacja — zadeklarowana przed pomiarem

**POKRYCIE klucza `L` przez klucz `K`** zachodzi, gdy zmiana wartości `K` zmienia status
`L` wobec strażników. Trzy źródła — **te same, które mierzy karta łańcuchów**:

| źródło | relacja |
|---|---|
| **I** | `val(L) == val(K)` znak w znak, w którymkolwiek z trzech języków |
| **II** | zawieranie — relacje `R-1`…`R-8` |
| **III** | wspólny łańcuch zdaniowy `ZD-01`…`ZD-23` |

**„JEDYNE pokrycie" liczone dosłownie:** grupa **dwuelementowa** — po zmianie `K`
klucz `L` zostaje **sam**. Grupa trzy- i więcej-elementowa to **rozjazd łańcucha**,
nie utrata jedynego pokrycia; **liczę osobno i nie wliczam do naruszeń.**

**Wyłączenia wbudowane, nazwane przed uruchomieniem:**
- **W1** — nie sprawdzam pokrycia przez pliki `content/*.md`; mapa klucz→plik jest moja,
  wyprowadzona z prefiksu, i **sam oznaczyłem ją jako niekompletną** (`LISTA…` cz. IV pkt 4);
- **W2** — „wymienia" rozpoznaję po **dosłownej nazwie klucza** w bloku pozycji;
  omówienie słowne („pasek potwierdzeń") się nie liczy → **wynik jest GÓRNYM
  ograniczeniem liczby naruszeń.**

### 223.2 WYNIK — 42 z 42, bez wyjątku dla żadnej pozycji

| klasa | ile | pozycje |
|---|---|---|
| **SPEŁNIAJĄ** (brak relacji klucz↔klucz albo wymienione) | **27** | A-1, B-1, B-2, B-4, B-7, B-8, C-1, C-2, C-5, C-7, D-1, D-2, D-3, D-6, D-7, D-9, E-2…E-9, F-2, F-4, F-5 |
| **NARUSZAJĄ ŚCIŚLE** — osieracają klucz i nie wymieniają go | **10** | **A-2 · B-3 · B-5 · B-6 · C-3 · C-4 · D-5 · E-1 · F-1 · F-3** |
| **ROZJAZD ŁAŃCUCHA** (grupa ≥3, pozostali pokrywają się wzajemnie) | **2** | D-4 · D-8 |
| **NIEMIERZALNE tą metodą** — brak rozpoznanego klucza w linii `Zmiana:` | **3** | A-3 · B-9 · C-6 |

**Dziesięć naruszeń ścisłych, imiennie — osierocany klucz w nawiasie:**

| pozycja | zmienia | osierocony i niewymieniony | źródło |
|---|---|---|---|
| **A-2** | `ZamkniecieCennik.zdanie` | `Hero.cta` | III |
| **B-3** | `Filary.filar4.korzysc`, `FunkcjeWyniki.zdanie` | `FunkcjeIndeks.blok4Wprowadzenie` (**dwa razy**) | II |
| **B-5** | `Filary.filar3.konkret1` | `FunkcjeIndeks.blok3Wprowadzenie` | III |
| **B-6** | `Filary.filar4.konkret2` | `FunkcjeWyniki.mod3_poco` · `FunkcjeWyniki.mod3_nazwa` | III + II |
| **C-3** | `Obawy.o2` | `FunkcjePozyskiwanie.mod4_nie` | III |
| **C-4** | `Obawy.o3` | `Cennik.faq.o4` | III + II |
| **D-5** | `Cennik.faq.o4` | `Obawy.o3` | III + II |
| **E-1** | `FunkcjeZespol.mod6_poco` | `DlaKogo.s3_robi_2` | III |
| **F-1** | `DlaKogo.s2_granica` | `FunkcjeWyniki.mod1_nie` | III |
| **F-3** | `DlaKogo.s1_robi_3` | `Filary.filar2.konkret2` | III |

> ## **C-4 I D-5 SĄ WOBEC SIEBIE SYMETRYCZNE:** C-4 zmienia `Obawy.o3` i osieraca
> ## `Cennik.faq.o4`; D-5 zmienia `Cennik.faq.o4` i osieraca `Obawy.o3`. **Obie
> ## pozycje są na liście i żadna nie wie o drugiej.** Wejście obu naraz nie osieraca
> ## nikogo — wejście którejkolwiek **samej** osieraca. To jest zależność
> ## kolejnościowa, której nie ma w rozdziale „kolejność wymuszona".

**Kontrola ręczna dwóch trafień** (bo tool bez kontroli to `zroz.py`):
`F-3` — `DlaKogo.s1_robi_3` niesie „Tarcza zaznacza ryzykowne sformułowania, zanim
**go opublikujesz**", `Filary.filar2.konkret2` „…zanim **klikniesz «wyślij»**";
dwaj nosiciele, zero wzmianki w bloku — **potwierdzone ręcznie.**
`D-8` — cztery klucze, trzy z nich identyczne między sobą; **słusznie NIE jest
naruszeniem ścisłym** i tool tak je zakwalifikował.

### 223.3 **NAJWAŻNIEJSZE: ten sprawdzian PRZEPUSZCZA sprawę, dla której powstał**

`D-1` i `D-2` wychodzą w kolumnie **SPEŁNIAJĄ**. A to **one** były powodem §168 —
usuwają jedyne pokrycie `Cennik.tabela.zakres` we wszystkich trzech językach.

**Pomiar, dlaczego tak wyszło:**

```
Cennik.tabela.zakres — inne klucze o tej samej wartości:
  pl „Zakres" -> BRAK      en „Scope" -> BRAK      de „Umfang" -> BRAK
```

> ## **Pokrycie `Cennik.tabela.zakres` NIE JEST relacją klucz↔klucz. Jest tekstem prozy
> ## w `Cennik.naglowek` i `Cennik.wstep`, czyli dokładnie tam, gdzie moje wyłączenie
> ## W1 nie sięga.**
>
> **„27 SPEŁNIAJĄCYCH" NIE ZNACZY „27 CZYSTYCH". Znaczy: 27 bez utraty pokrycia
> ## KLUCZ↔KLUCZ. Warstwa prozy i plików treści jest niesprawdzona dla WSZYSTKICH 42.**

`D-1` **wymienia** `Cennik.tabela.zakres` wprost (zarzut Z-16 w jego bloku) — więc
warunek spełnia **naprawdę**, tylko **nie z tego powodu, który zobaczył mój sprawdzian.**
Tool orzekł dobrze, nie widząc sprawy.

### 223.4 Znalezisko uboczne, cięższe od samego sprawdzianu

Skoro `Cennik.tabela.zakres` traci pokrycie w prozie — **czy ma strażnika?**
`e2e/cennik.spec.ts:370-381`, lista **literalna, pisana ręką**:

```js
const etykietyTabeli = [
  c.tabela.kontakty, c.tabela.zespol, c.tabela.posty, c.tabela.sesje,
  c.tabela.kalendarz, c.tabela.puls, c.tabela.drzewo, c.tabela.ranking,
  c.tabela.bezLimitu, c.tabela.wKazdymPlanie,
];
```

**Dziesięć pozycji. `Cennik.tabela.*` ma ich CZTERNAŚCIE.**
Poza listą: **`zakres` · `caption` · `wPlanie` · `pozaPlanem`.**

> ## **KLUCZ, DLA KTÓREGO WŁAŚCICIEL WYDAŁ WARUNEK WIĄŻĄCY WSZYSTKIE 42 POZYCJE,
> ## NIE MA STRAŻNIKA — I NIE MA GO DLATEGO, ŻE KTOŚ WYPISAŁ DZIESIĘĆ NAZW Z RĘKI,
> ## A NIE ZAPYTAŁ PLIKU, ILE ICH JEST.**
>
> To jest ta sama klasa co `toHaveCount(6)` przy siedmiu parach obaw: **liczebność
> zapisana ręką w strażniku, który miał liczebności pilnować.** Trzecie wystąpienie
> tej klasy w tym torze.

**Nie naprawiam — zgłaszam.** Strażnik jest cudzy, a zakaz łatania strażników nie zna
wyjątku dla przypadku, w którym łatanie byłoby oczywiście słuszne.

### 223.5 Stan kolejki (R-D)

| pozycja | stan |
|---|---|
| **warunek §168 — warstwa klucz↔klucz** | **ZAMKNIĘTY** — 42 z 42, 10 naruszeń ścisłych imiennie |
| **warunek §168 — warstwa prozy i `content/*.md`** | **OTWARTY, NOWY** — wyłączenie W1; dotyczy **wszystkich 42**, w tym sprawy założycielskiej |
| `Cennik.tabela.*` — 4 klucze poza strażnikiem | **NOWY** — zgłoszenie, bez naprawy |
| zależność kolejnościowa C-4 ↔ D-5 | **NOWA** — brak w „kolejności wymuszonej" |
| `Pieczęć Etyczna` — kafelek skrócony | otwarty — następny w kolejce |
| piąty sędzia — `zroz.py` 0/0 | otwarty, **0/0 nadal niezgłaszane** |

---

## §224 — `Pieczęć Etyczna`: skrót na kafelku (ostatnia pozycja z §220.4)

**Licencja słownika:** *„kafelek skrócony: Pieczęć/Seal/Siegel"* — skrót **wolno**,
nie **trzeba**.

**Pomiar** (`messages`, trzy języki; pełna = głowa + kwalifikator w dowolnej formie):

| język | pełnych | skrótów | gdzie skrót |
|---|---|---|---|
| **PL** | 3 | **2** | `Filary.filar2.naglowek` · `FunkcjeTresci.naglowek` — „Piszesz. Tarcza sprawdza. **Pieczęć** potwierdza." |
| **EN** | **5** | **0** | — „You write. Shield checks. **Ethical Seal** confirms." |
| **DE** | 3 | **2** | „Du schreibst. Der Schild prüft. **Das Siegel** bestätigt." |

**Werdykt: BEZ NARUSZENIA.** Skrót jest licencjonowany, a licencja jest pozwoleniem,
nie nakazem — więc pełna forma w EN jest równie poprawna.

**Odnotowanie dla kogokolwiek, kto zechce to „ujednolicić":**

> ## **DWA JĘZYKI KORZYSTAJĄ Z LICENCJI, TRZECI NIE — I OBA STANY SĄ POPRAWNE.**
> Ujednolicenie „bo się różni" **zepsułoby zgodność, nie naprawiło jej.** Różnica
> wygląda tu dokładnie tak samo jak defekt i jest jego przeciwieństwem.

**Łańcuch nietknięty:** `Filary.filar2.naglowek` i `FunkcjeTresci.naglowek` są
**równe znak w znak we wszystkich trzech językach** — rozbieżność biegnie **między
językami**, nie **w poprzek tras**.

### 224.1 Błąd narzędzia złapany przed publikacją — **drugi tego dnia**

Pierwszy przebieg dał „PL 3 skróty, **EN 5 skrótów**, DE 2". EN wyszło całe na skrót,
bo mój test pełnej formy sprawdzał `startswith('Ethical Seal')` **od pozycji dopasowania
`\bSeal\b`** — czyli od słowa *Seal*, przed którym stoi *Ethical*. **Test szukał
kwalifikatora ZA głową, a w angielskim stoi on PRZED.**
Ten sam błąd zepsuł PL: `„Pieczęć Etyczn**ą**"` nie zaczyna się od `„Pieczęć Etyczna"`.

> ## **NAPISAŁEM DOPASOWANIE POD SZYK POLSKI I PUŚCIŁEM JE NA TRZY JĘZYKI.**
> To jest §219 w miniaturze — **jedna reguła, trzy gramatyki** — popełnione
> **pięć sekcji po tym, jak tę klasę opisałem.**
>
> Zgodnie z regułą toru 10 zostawiam widoczny **wynik nieważnej próby**: „EN 5 skrótów"
> było **zerem narzędzia**, nie pomiarem — i wyglądało jak najciekawsze znalezisko
> całej sekcji.

---

## §225 — WARSTWA PROZY: SPRAWA ZAŁOŻYCIELSKA D-1 + D-2, RĘCZNIE

**Zlecenie TOR9/026:** *„warstwa prozy NAJPIERW dla sprawy założycielskiej — D-1 i D-2,
pokrycie `Cennik.tabela.zakres` w `Cennik.naglowek` i `Cennik.wstep`, wszystkie trzy
języki, ręcznie, nie parserem."*

### 225.1 Stan przed zmianą — trzy nosiciele, wszystkie na `/cennik`

| język | `Cennik.naglowek` | `Cennik.wstep` | `Cennik.tabela.zakres` |
|---|---|---|---|
| **PL** | „Plany różnią się **zakresem**, nie obietnicami" | „…Różnica leży w **zakresie** — od twoich pierwszych kontaktów…" | „**Zakres**" |
| **EN** | „Plans differ in **scope**, not in promises" | „…The difference is **scope** — from your first contacts…" | „**Scope**" |
| **DE** | „Die Pläne unterscheiden sich im **Umfang**, nicht in den Versprechen" | „…Der Unterschied liegt im **Umfang** – von deinen ersten Kontakten…" | „**Umfang**" |

**Przeszukanie wyczerpujące, całe `messages`, trzy języki:** termin występuje
w **dokładnie trzech kluczach na język** — i **wszystkie trzy to `Cennik.*`**.
Poza `/cennik` **nie ma go nigdzie**.

**`content/{pl,en,de}/cennik.md`:** termin stoi **wyłącznie** w `H1:` i `Wstęp:` —
czyli u tych samych dwóch nosicieli prozy. **Etykiety tabeli w pliku treści NIE MA.**

### 225.2 Stan po wejściu D-1 + D-2 — **odczytany ze zdań, nie z zarzutu**

| | nowe brzmienie | czy niesie termin |
|---|---|---|
| **D-1 pl** | „Co dostajesz w każdym planie — i czego nie dostajesz" | **NIE** |
| **D-1 en** | „What you get on each plan — and what you don't" | **NIE** |
| **D-1 de** | „Was du in jedem Plan bekommst – und was nicht" | **NIE** |
| **D-2 pl** | „Różnią się limity — kontakty, zespół, posty, sesje treningowe — i to, co widzisz w Growth i Pro." | **NIE** |
| **D-2 en** | „What differs are the limits — contacts, team, posts, training sessions — and what you see in Growth and Pro." | **NIE** |
| **D-2 de** | „Es unterscheiden sich die Limits – Kontakte, Team, Posts, Trainingseinheiten – und das, was du in Growth und Pro siehst." | **NIE** |

> ## **ZARZUT Z-16 POTWIERDZONY — I JEST MOCNIEJSZY, NIŻ GO POSTAWIONO.**

**Trzy warstwy utraty, nie jedna:**

1. **Proza.** Dwaj nosiciele → **zero**, w każdym z trzech języków. `Cennik.tabela.zakres`
   zostaje **jedynym wystąpieniem terminu w całym serwisie**.
2. **Strażnik.** Klucz **nigdy go nie miał** — `e2e/cennik.spec.ts:370-381` wymienia
   dziesięć etykiet i tej wśród nich nie ma (§223.4). **Osierocenie jest podwójne:
   traci kotwicę i nie ma testu, który by to zauważył.**
3. **Figura retoryczna.** Nagłówek „Plany różnią się **zakresem**, nie obietnicami"
   i kolumna „**Zakres**" to **jedno echo, celowo zbudowane**: zdanie nadaje słowu sens,
   kolumna go używa. D-1 i D-2 usuwają **oba końce echa i zostawiają środek** —
   nagłówek tabeli, którego nikt na tej stronie nie wprowadził.

> **Czytelniczka po zmianie widzi kolumnę „Zakres" nad listą, której pierwszy wiersz
> brzmi „Kontakty". Słowa „zakres" nie usłyszała od nikogo wcześniej.**

**Czego ta analiza NIE rozstrzyga (R-D):** czy D-1 i D-2 mają **nie wejść**, czy wejść
**wymieniając** `Cennik.tabela.zakres` i proponując dla niego nowe brzmienie. Warunek
§168 dopuszcza obie drogi — **wymienia albo nie wchodzi** — i wybór między nimi jest
redakcyjny, czyli Pański. **Odnotowuję tylko, że D-1 wymienia zarzut Z-16 w swoim bloku,
więc formalnie warunek już spełnia; brakuje mu nie wzmianki, tylko DECYZJI.**

### 225.3 KOSZT JEDNEGO PRZEJŚCIA RĘCZNEGO — zmierzony, nie oszacowany

**Co kosztowała ta jedna sprawa:** 3 klucze × 3 języki = **9 ciągów przeczytanych** ·
**1 przeszukanie wyczerpujące** (330 kluczy × 3 języki) · **3 pliki treści** ·
**1 lista strażnika**. Razem **cztery komendy i jeden odczyt**.

**Ale to był przypadek uprzywilejowany: Z-16 PODAŁ MI TERMIN.** Dla pozostałych
39 pozycji terminu nikt nie poda — trzeba go **wskazać**, a to jest sąd, nie wyszukiwanie.

**Zmierzyłem, ilu sądów to wymaga.** Generator kandydatów (nie werdyktów): termin
treściowy ≥5 znaków, spoza listy stop-słów, występujący w **2 lub 3 kluczach w całym
serwisie**, z których pozycja zmienia jeden — czyli taki, po którym **może** zostać
jeden nosiciel:

| miara | wartość |
|---|---|
| pozycji z jakimkolwiek kandydatem | **36 z 42** |
| kandydatów łącznie (termin × język) | **267** |
| **mediana na pozycję** | **6** |
| najwięcej / najmniej | **E-8: 26** · B-1, D-6, D-7, D-8: **1** |

> ## **PEŁNE PRZEJŚCIE = 267 SĄDÓW, NIE 39.** Każdy sąd brzmi: „czy po tej zmianie
> ## ten termin zostaje bez wprowadzenia dla czytelnika". **To jest jedno zdanie
> ## do rozstrzygnięcia, nie jedno wyszukiwanie** — wyszukiwanie już wykonał generator.

**Ślepota generatora, nazwana przed użyciem liczby:**
- **G1** — próg „2 lub 3 nosicieli" jest **progiem**, a progi kosztowały ten tor cztery
  błędy. Termin o czterech nosicielach, z których pozycja zmienia trzy, **nie wchodzi
  do 267** i powinien.
- **G2** — kandydaci liczeni po **formach wyrazowych**, nie lematach; polski rozbija
  jedno pojęcie na kilka form („zakresem"/„zakresie"), więc **część par się nie skleja**.
  W sprawie D-1/D-2 zadziałało tylko dlatego, że oglądałem ją ręcznie.
- **G3** — nie widzi terminów **wielowyrazowych**.

**Wszystkie trzy zaniżają.** **267 jest dolnym ograniczeniem liczby sądów.**

### 225.4 Trzy drogi do wyboru — **liczby przy każdej, decyzja nie moja**

| droga | zakres | koszt w sądach | co zostaje niesprawdzone |
|---|---|---|---|
| **A — pełne 42** | wszystkie pozycje, wszyscy kandydaci | **267+** | tylko ślepota G1–G3 |
| **B — próbka warstwowa** | 6 pozycji: po jednej z A/B/C/D/E/F, wybrane po **najwyższej** liczbie kandydatów | **≈ 90** | 36 pozycji; **ale próbka z najgęstszych mierzy GÓRNĄ granicę ryzyka**, nie średnią |
| **C — tylko pozycje wchodzące pierwsze** | kroki 0–5a „kolejności wymuszonej" | **≈ 40** | reszta — do czasu, aż wejdzie |

**Nie rekomenduję żadnej — bo wybór zależy od tego, czy premiera ma być za tydzień,
czy za miesiąc, a tego nie wiem.** Odnotowuję jedno: **droga C jest jedyną, w której
niesprawdzone pozycje są niesprawdzone TYMCZASOWO** — pozostałe dwie zostawiają
trwałą dziurę, którą trzeba będzie zapisać w R-D przekazania.
