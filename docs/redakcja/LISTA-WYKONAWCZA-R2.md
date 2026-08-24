# LISTA WYKONAWCZA — RUNDA DRUGA
**Tor 9 · 2026-08-21 · stan po trzech adwersarzach.**

> ## OSTRZEŻENIE, KTÓRE MUSI STAĆ NA CZELE
> **To NIE jest lista ustaleń gotowych do wykonania. To lista 42 pozycji, z których
> **25** nosi imienny zarzut adwersarza (17 nie nosi), a wszystkie 42 nosi co najmniej jeden zarzut globalny.**
> Właściciel zamówił listę po adwersarzach właśnie po to, żeby nie była listą propozycji.
> **Nie jest nią — i dlatego nie jest też listą do wykonania w tej postaci.**
> Kolumna „status po adwersarzach" jest częścią pozycji, nie przypisem do niej.

## Jednostki i granice — zadeklarowane przed spisaniem

- **Jednostka pozycji:** nagłówek `###` w §2 `SYNTEZA-R2.md`. **42.**
- **Brzmienia:** wyciągnięte z pliku **mechanicznie** (skrypt `_gen_lista.py`), nie przepisane
  ręcznie — żeby nie wprowadzić rozjazdu na etapie sporządzania listy.
- **Pliki treści:** wyprowadzone z prefiksu klucza przez mapę tras. **Mapa jest moja i może
  być niepełna** dla pozycji zbiorczych.
- **Rozmiar:** podaję **pomiar** — liczba kluczy ×3 języki, liczba plików treści.
  > **Czasu nie szacuję i nie będę zgadywał.** Nie mam ani jednego pomiaru czasu wykonania
  > z tego repozytorium; każda liczba godzin byłaby wymyślona, a wymyślona liczba w tym
  > dokumencie stałaby się cytatem w następnym.

## Kolejność wymuszona — **co musi iść wcześniej**

| krok | co | dlaczego |
|---|---|---|
| **0** | **Z-14** — apostrof ASCII w 13 brzmieniach EN | wchodzi do trzynastu pozycji naraz; poprawka po wejściu to trzynaście osobnych zmian |
| **1** | **O-11** — sześć zamknięć `/login` → `/cennik` | rozstrzygnięcie właściciela; **przed O-1** |
| **2** | **O-1** — czwarta droga K-1, klasa `zdanieProwadzace` | zależy od (1) |
| **3** | **O-7** — siódma para obaw: treść + `toHaveCount(6)→7` + `STRATEGIA.md` pkt 24 + **`Obawy.naglowek` „Sześć"→„Siedem" ×3 języki** | **jeden pakiet albo wcale**; czwarty człon wykryty dopiero przez A-3 (§166.3) |
| **4** | **Z-1** — rozstrzygnąć, czy `TO:12-13` kwalifikuje frazy wierszy | blokuje **A-1, D-5, E-5** naraz, w dwie przeciwne strony |
| **5** | **Z-7** — rozstrzygnąć jednostkę łańcucha | od tego zależy A-2, cofnięcie W2-A A-5 i **cała mapa §139.1** |
| **5a** | **C-4 i D-5 — wejście OBU NARAZ albo ŻADNEJ; pojedyncze osieraca** | zależność wykryta dopiero w §223: **C-4** zmienia `Obawy.o3` i osieraca `Cennik.faq.o4`; **D-5** zmienia `Cennik.faq.o4` i osieraca `Obawy.o3`. Para dzieli łańcuch zdaniowy `ZD-1` i relację zawierania `R-8`. **Wejście obu naraz nie osieraca nikogo.** Obie pozycje stały na tej liście od początku i **żadna nie wymieniała drugiej** |
| **6** | reszta pozycji, pakietami | — |

---

## ZARZUTY GLOBALNE — dotyczą wszystkich pozycji

| # | adwersarz | co blokuje |
|---|---|---|
| **Z-12** | A-2 | **41 z 42 kluczy jest pod strażnikiem znak-w-znak.** Koszt tej zależności nazwany w syntezie **raz** — a dotyczy prawie wszystkiego. **Każda pozycja poniżej wymaga zmiany pliku treści W TEJ SAMEJ zmianie, bo inaczej bramka staje czerwona.** |
| **Z-14** | A-2 | **apostrof ASCII w 13 brzmieniach EN**, wobec `en.json`, które ma **119× U+2019 i zero ASCII**. Do poprawienia przed wejściem czegokolwiek — inaczej wchodzi rozjazd typograficzny na trzynastu pozycjach |
| **Z-13** | A-2 | pakiet **P-9 pomija `Cennik.faq.o3`** → **`bramka:liczby` czerwona w trzech językach**. **Blokuje pakiet, nie pozycję** |
| **A3-2** | A-3 | **sześć pozycji renderuje się w zwiniętym `<details>`** (`Faq.tsx:32`, zero `open`), siódma jest `display:none`. **31 z 37 nie zmienia nic dla czytelniczki, która klika** |
| **SR-01 / A3-19** | A-1 + A-3 | **`ObrazyFilarow.filar2` łamie ADR-018 w warstwie czytnika** — znaleziony niezależnie z dwóch stron. **Nie jest pozycją WCHODZI — jest defektem stanu dzisiejszego** |
| **A3-16** | A-3 | **warstwa czytnika ma 23 klucze / 69 ciągów, nie 22 / 66.** `Obawy.naglowek` („Sześć obaw") — **i O-7 wymusza jego zmianę na „Siedem"** |
| **A3-5** | A-3 | **tabeli obietnic nie czyta żadna bramka.** Wszystkie brzmienia poniżej stoją na dokumencie, którego nic nie obserwuje |
| **X-4** | A-1 | **42, nie 34** — sprostowane |


## ROZSTRZYGNIĘTE 2026-08-21 PO ADWERSARZACH — **zdejmuje zarzuty z pozycji**

| zarzut | rozstrzygnięcie właściciela | skutek dla listy |
|---|---|---|
| **Z-7** (dziewiąta noga) | **jednostka łańcucha = RÓWNOŚĆ znak w znak; zawieranie to osobna kategoria, która nie wiąże brzmienia** | **Z-7 UPADA.** Zarzut zdjęty z **A-2**. Mapa **potwierdzona**, nie przeliczona: PL 23 · EN 23 · DE 22 (§167.1) |
| **Z-1** (`TO:12-13` w dwie strony) | **zastrzeżenie NIE kwalifikuje frazy wiersza** — *„klientka ma dostać twierdzenie albo jego brak, nie nasze wahanie"* | **E-5 wchodzi bez zmian · D-5 DO PRZEROBIENIA · A-1, C-4, D-4 do sprawdzenia pod tym samym kątem** |
| **W2-A A-5** (cofnięte do autora) | **wraca do rozpatrzenia** — powód cofnięcia upadł razem z Z-7 | pozycja **wraca na listę**, do rozpatrzenia na arności PL 9→8 |
| **N-18 / `Cennik.faq.o2`** | **przekwalifikowane do toru aplikacji** — ADR-018: zdanie nieprawdziwe wobec kodu nie jest pytaniem redakcyjnym | **schodzi z listy** → `PRZEKAZANIE-TOR10.md` poz. 4 |

## ⚠ WARUNEK WIĄŻĄCY WSZYSTKIE 42 POZYCJE (rozstrzygnięcie właściciela 2026-08-21)

> ## **NAPRAWA NIE MOŻE USUWAĆ POKRYCIA, KTÓREGO NIE WYMIENIA.**
> **Przed wejściem KAŻDEJ pozycji sprawdź, czy usuwa albo zmienia ciąg będący JEDYNYM
> pokryciem innego klucza. Jeśli tak — pozycja wymienia to wprost albo NIE WCHODZI.**

Dwa znane wystąpienia: **D-1+D-2** (usuwają jedyne pokrycie `Cennik.tabela.zakres`
we wszystkich trzech językach) · **synteza niewymieniająca paska potwierdzeń** przy dwóch
z sześciu kluczy rodziny `TO:12-13`.
**Sprawdzenie tego warunku dla pozostałych 40 pozycji NIE ZOSTAŁO WYKONANE — kubeł R-D.**

*(Właściciel napisał „dla wszystkich 34 pozycji"; na aktualnym pomiarze jest ich **42**
— stosuję do 42 i melduję, zamiast rozszerzać po cichu.)*

---

### A-1

**Zmiana:** `Cennik.potwierdzenie2` — kwantyfikator „zawsze" wypada

| | brzmienie | zn |
|---|---|---|
| **pl** | „Kontakty eksportujesz do vCard, historię aktywności do CSV" | **58** |
| **en** | „You export contacts to vCard, your activity history to CSV" | **58** |
| **de** | „Kontakte exportierst du als vCard, deine Aktivitätshistorie als CSV" | **67** |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/cennik.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-09** (A-1) — „do vCard" wchodzi na trzy trasy, a ten sam sędzia orzekł, że wiersz mówi „do telefonu"
- **Z-1** (A-2) — stoi na `/cennik` BEZ kwalifikatora obok D-5, który kwalifikator wprowadza


### A-2

**Zmiana:** `ZamkniecieCennik.zdanie` — **złożenie: W3-A A-13 (zdanie 1 i konstrukcja) + przycięcie W-4**

| | brzmienie | zn |
|---|---|---|
| **pl** | „Wybierz plan i sprawdź, jak działa Catherly w twojej codziennej pracy. Przy planie rocznym płacisz z góry za dwanaście miesięcy." | **128** |
| **en** | „Choose a plan and see how Catherly works in your day-to-day. On the annual plan you pay for twelve months up front." | **115** |
| **de** | „Wähl einen Plan und sieh, wie Catherly in deinem Arbeitsalltag funktioniert. Beim Jahresplan zahlst du zwölf Monate im Voraus." | **126** |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/cennik.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-01** (A-1) — wnosi zdanie o mechanice płatności do filaru zamkniętego milczeniem
- **P-02** (A-1) — implikatura — warunek płatności dopięty do zakupu, którego strona nie przewiduje
- **Z-7** (A-2) — **UZASADNIENIE WYBORU UPADA** — dziewiątej nogi łańcucha #1 w PL nie ma znak w znak
- **A3-11** (A-3) — zajmuje jedyne `zdaniePrzed` w serwisie i wypełnia je rozkazem; N-6 odrzucono tym samym testem


### A-3

**Zmiana:** Wezwania, potwierdzenie UE, `f8_1`, spisy, okruszki — **BEZ ZMIANY BRZMIENIA**

**Brzmienia:** brak — pozycja zbiorcza „bez zmiany brzmienia".

**Pliki:** — (pozycja zbiorcza)

**Kod czy treść:** treść

**Rozmiar:** pozycja zbiorcza — nie liczę, bo jednostką jest tu decyzja, nie ciąg

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-04** (A-1) — `potwierdzenieUE` — jedyny dotykający wiersz mówi „do weryfikacji PRZED użyciem", a ciąg jest używany
- **P-19** (A-1) — `f8_1` „Wszystko powyżej DZIAŁA od Startera" — kwantyfikator na czasowniku wobec zastrzeżenia nadrzędnego


### B-1

**Zmiana:** `Filary.filar1.korzysc` = `FunkcjePozyskiwanie.zdanie` — pęknięcie DE

| | brzmienie | zn |
|---|---|---|
| **pl** | „Planujesz dzień, a baza kontaktów rośnie, gdy ty prowadzisz rozmowy." | **68** (68) |
| **en** | „You plan your day, and your contact base grows while you do the talking." | **72** (83) |
| **de** | „Du planst deinen Tag, und deine Kontaktbasis wächst, während du Gespräche führst." | **81** (94/89) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/filary.md` · `content/{pl,en,de}/funkcje-pozyskiwanie.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 2 klucz(y) × 3 języki = **6 ciągów** · 2 plik(ów) treści × 3 = 6 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-15** (A-1) — drugi człon bez wiersza — „baza kontaktów rośnie, gdy ty prowadzisz rozmowy"


### B-2

**Zmiana:** `Filary.filar2.korzysc` = `FunkcjeTresci.zdanie` — §37.3 para 3

| | brzmienie | zn |
|---|---|---|
| **pl** | „Twojego stylu system uczy się z opublikowanych postów, a Tarcza wskazuje ryzykowne miejsca." | **91** (83) |
| **en** | „The system learns your style from the posts you publish, and the Shield points out risky wording." | **97** (82) |
| **de** | „Deinen Stil lernt das System aus deinen veröffentlichten Posts, und der Schild zeigt riskante Stellen." | **102** (88) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/filary.md` · `content/{pl,en,de}/funkcje-tresci.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 2 klucz(y) × 3 języki = **6 ciągów** · 2 plik(ów) treści × 3 = 6 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### B-3

**Zmiana:** `Filary.filar4.korzysc` = `FunkcjeWyniki.zdanie` ⊂ `blok4Wprowadzenie` —

| | brzmienie | zn |
|---|---|---|
| **pl** | „Na Pulpicie widzisz sprzedaż, **aktywne** kontakty i aktywność zespołu, a wyniki mają dowód, który zostaje." | **103** (74) |
| **en** | „On the Dashboard you see sales, **active** contacts and team activity, and your results carry proof that lasts." | **107** (86) |
| **de** | „Auf dem Dashboard siehst du Umsatz, **aktive** Kontakte und Team-Aktivität, und deine Ergebnisse haben einen Beleg, der bleibt." | **123** (92) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/filary.md` · `content/{pl,en,de}/funkcje-wyniki.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 2 klucz(y) × 3 języki = **6 ciągów** · 2 plik(ów) treści × 3 = 6 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-07** (A-1) — „dowód, który zostaje" zostaje w trzech nogach, a to samo wycięto z dwóch innych
- **Z-3** (A-2) — „Pulpit pokazuje" odrzucone tutaj, wprowadzone w F-1 — oba na kryterium S3


### B-4

**Zmiana:** `Filary.filar3.korzysc` = `FunkcjeZespol.zdanie` — §37.3 para 1

| | brzmienie | zn |
|---|---|---|
| **pl** | „Nową osobę wdrażasz przez kreator wdrożeniowy, zamiast tłumaczyć wszystko od nowa." | **82** (74) |
| **en** | „You onboard a new team member with the onboarding wizard, instead of explaining it all over again." | **98** (88) |
| **de** | „Deine neue Partnerin arbeitest du mit dem Einstiegsassistenten ein, statt alles neu zu erklären." | **96** (82) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/filary.md` · `content/{pl,en,de}/funkcje-zespol.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 2 klucz(y) × 3 języki = **6 ciągów** · 2 plik(ów) treści × 3 = 6 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### B-5

**Zmiana:** `Filary.filar3.konkret1` — rodzina Z-6

| | brzmienie | zn |
|---|---|---|
| **pl** | „Nowa osoba wpisuje profil i cele w kreatorze sama — nie siadasz nad ustawieniami." | **81** (72) |
| **en** | „A new team member fills in her profile and goals herself — you don't sit over the settings." | **91** (77) |
| **de** | „Profil und Ziele trägt deine neue Partnerin selbst ein – du sitzt nicht daneben." | **80** (85) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/filary.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-16** (A-1) — pokryciem jest zdanie z innej podstrony, nie wiersz; wiersz stawia w podmiocie JĄ


### B-6

**Zmiana:** `Filary.filar4.konkret2` — człon bez pokrycia wypada

| | brzmienie | zn |
|---|---|---|
| **pl** | „Cel dzielisz na kamienie milowe i widzisz, jak daleko zaszłaś." | **62** (70) |
| **en** | „You split a goal into milestones and see how far you've come." | **61** (69) |
| **de** | „Dein Ziel teilst du in Meilensteine und siehst, wie weit du gekommen bist." | **74** (88) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/filary.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### B-7

**Zmiana:** `Filary.filar4.konkret3` — „ktoś może zweryfikować" wypada

| | brzmienie | zn |
|---|---|---|
| **pl** | „Historię swojej pracy zabierasz, kiedy chcesz — zabezpiecza ją cyfrowy odcisk." | **78** (78) |
| **en** | „You take your work history with you whenever you want — a digital fingerprint secures it." | **89** (82) |
| **de** | „Deine Arbeitshistorie nimmst du mit, wann du willst – ein digitaler Fingerabdruck sichert sie." | **94** (89) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/filary.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### B-8

**Zmiana:** `Filary.filar1.konkret2` —

| | brzmienie | zn |
|---|---|---|
| **pl** | „Dostajesz przypomnienie 30 minut przed rozmową — **[ogon do przepisania]**." | 76 (73) |
| **en** | „You get a reminder 30 minutes before the call — **[ogon do przepisania]**." | 80 (81) |
| **de** | „Du bekommst eine Erinnerung 30 Minuten vor dem Gespräch – **[ogon do przepisania]**." | 96 (76) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/filary.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-10** (A-1) — „30 minut" wchodzi jako „czysty Hopkins", a jedyne źródło ma STATUS: DO WERYFIKACJI
- **A3-7** (A-3) — ta sama liczba — rekord `facts.json` mówi „do weryfikacji w kodzie aplikacji"


### B-9

**Zmiana:** Nagłówki filarów, `blok2/3/4Naglowek`, `blok2Wprowadzenie`, dziesięć konkretów — **BEZ ZMIANY**

**Brzmienia:** brak — pozycja zbiorcza „bez zmiany brzmienia".

**Pliki:** — (pozycja zbiorcza)

**Kod czy treść:** treść

**Rozmiar:** pozycja zbiorcza — nie liczę, bo jednostką jest tu decyzja, nie ciąg

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### C-1

**Zmiana:** `Hero.podtytul` — zawieszenie **odwołane** (W-3)

| | brzmienie | zn |
|---|---|---|
| **pl** | „Kontakty, treści, zespół i wyniki — twoja sprzedaż bezpośrednia w jednym miejscu." | **81** (107) |
| **en** | „Contacts, content, team and results — your direct selling in one place." | **71** (109) |
| **de** | „Kontakte, Inhalte, Team und Ergebnisse – dein Direktvertrieb an einem Ort." | **74** (112) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/naglowek.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-06** (A-1) — liczba członów zachowana, ORZECZNIK przeniesiony — nikt nie zmierzył, bo liczono człony


### C-2

**Zmiana:** `CennikSkrot.roznica` (S11) — fałszywa bramka P0-4

| | brzmienie | zn |
|---|---|---|
| **pl** | „W planie Growth widzisz sygnały ryzyka odejścia i dostajesz gotowe zdanie otwierające rozmowę." | **94** (94) |
| **en** | „On the Growth plan, you see the signs someone may be stepping back, with a ready line to open the conversation." | **111** (92) |
| **de** | „Im Growth-Plan siehst du Signale, dass eine Partnerin abspringen könnte, und bekommst einen fertigen Satz für den Gesprächseinstieg." | **132** (96) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/cennik.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **Z-2** (A-2) — „W planie Growth" ↔ „od planu Growth" w D-7, na czterech trasach
- **A3-14** (A-3) — stawia bramkę bezpośrednio nad jedynym wyjściem treściowym `/` → `/cennik`


### C-3

**Zmiana:** `Obawy.o2` — kwantyfikator „zawsze"

| | brzmienie | zn |
|---|---|---|
| **pl** | „Importu hurtowego nie ma — kontakty wpisujesz ręcznie lub przez formularz. Do telefonu przenosisz je jednym kliknięciem (vCard)." | **128** (109) |
| **en** | „There's no bulk import — you add contacts by hand or through the form. You move them to your phone in one click (vCard)." | **120** (107) |
| **de** | „Einen Massenimport gibt es nicht – Kontakte trägst du von Hand oder über ein Formular ein. Auf dein Handy holst du sie mit einem Klick (vCard)." | **143** (137) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/obawy.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### C-4

**Zmiana:** `Obawy.o3` — obietnica-worek „wszystko jest twoje"

| | brzmienie | zn |
|---|---|---|
| **pl** | „Rezygnujesz kiedy chcesz. Kontakty zabierasz jako vCard, historię aktywności jako CSV." | **86** (106) |
| **en** | „You can cancel whenever you like. You take your contacts as vCard and your activity log as CSV." | **95** (107) |
| **de** | „Du kündigst, wann du willst. Deine Kontakte nimmst du als vCard mit, dein Aktivitätsregister als CSV." | **101** (122) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/obawy.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-09** (A-1) — wspólny defekt „do vCard"
- **P-12** (A-1) — „Rezygnujesz kiedy chcesz" wchodzi jako WCHODZI przy ZERZE wierszy


### C-5

**Zmiana:** `Obawy.p4` + `Obawy.o4` — §37.2 wykonane

**Brzmienia:** brak — pozycja zbiorcza „bez zmiany brzmienia".

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/obawy.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 2 klucz(y) × 3 języki = **6 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-03** (A-1) — dwa twierdzenia o produkcie przechodzą przez wszystkie trzy werdykty NIEOCENIONE
- **Z-5** (A-2) — pytanie ma dwa człony, odpowiedź jeden
- **A3-12** (A-3) — poszerza pytanie i zawęża odpowiedź; widoczna (w `summary`) jest tylko połowa poszerzająca


### C-6

**Zmiana:** Kolejność sześciu par obaw —

**Brzmienia:** brak — pozycja zbiorcza „bez zmiany brzmienia".

**Pliki:** — (pozycja zbiorcza)

**Kod czy treść:** treść

**Rozmiar:** pozycja zbiorcza — nie liczę, bo jednostką jest tu decyzja, nie ciąg

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **Z-15** (A-2) — nie jest „kosztem 0 znaków" — to zmiana kodu trasy, traktowana inaczej niż O-11


### C-7

**Zmiana:** `Problem.*`, `Definicja.*`, `RytmDnia.krok3Tresc`, `Obawy` Para 1/6, `CennikSkrot.naglowek/link` — **NIE RUSZAĆ**

**Brzmienia:** brak — pozycja zbiorcza „bez zmiany brzmienia".

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/rytm-dnia.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### D-1

**Zmiana:** `Cennik.naglowek` (C-1) —

| | brzmienie | zn |
|---|---|---|
| **pl** | „Co dostajesz w każdym planie — i czego nie dostajesz" | **52** (42) |
| **en** | „What you get on each plan — and what you don't" | **46** (38) |
| **de** | „Was du in jedem Plan bekommst – und was nicht" | **45** (64) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/cennik.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-05** (A-1) — nagłówek obiecuje pokazać, czego nie dostajesz — pięć klas „nie dostajesz" wykluczono decyzją
- **Z-16** (A-2) — razem z D-2 usuwa jedyne pokrycie `Cennik.tabela.zakres` we wszystkich trzech językach, w ciszy


### D-2

**Zmiana:** `Cennik.wstep` (C-1) —

| | brzmienie | zn |
|---|---|---|
| **pl** | „Różnią się limity — kontakty, zespół, posty, sesje treningowe — i to, co widzisz w Growth i Pro." | **96** (113) |
| **en** | „What differs are the limits — contacts, team, posts, training sessions — and what you see in Growth and Pro." | **108** (111) |
| **de** | „Es unterscheiden sich die Limits – Kontakte, Team, Posts, Trainingseinheiten – und das, was du in Growth und Pro siehst." | **120** (131) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/cennik.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **Z-16** (A-2) — patrz D-1 — wspólny skutek


### D-3

**Zmiana:** `Cennik.oszczedzasz` (C-2, człon 1) —

| | brzmienie | zn |
|---|---|---|
| **pl** | „oszczędzasz {kwota} — płacisz z góry za dwanaście miesięcy" | **58** (19) |
| **en** | „you save {kwota} — you pay for twelve months up front" | **53** (16) |
| **de** | „du sparst {kwota} – du zahlst zwölf Monate im Voraus" | **52** (17) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/cennik.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **A3-3** (A-3) — `display:none` w stanie domyślnym `/cennik`


### D-4

**Zmiana:** `Cennik.faq.o3` —

| | brzmienie | zn |
|---|---|---|
| **pl** | „Rezygnujesz kiedy chcesz. Nie musisz podawać powodu. Plan miesięczny opłacasz co miesiąc, roczny — z góry za dwanaście miesięcy." | **128** (52) |
| **en** | „You can cancel whenever you like. No reason needed. The monthly plan you pay month by month, the yearly one twelve months upfront." | **130** (51) |
| **de** | „Du kündigst, wann du willst. Einen Grund musst du nicht nennen. Den Monatsplan zahlst du Monat für Monat, den Jahresplan für zwölf Monate im Voraus." | **148** (63) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/cennik.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-11** (A-1) — „Nie musisz podawać powodu" — uzasadnienie decyzji odnotowane jako TWIERDZENIE właściciela
- **P-12** (A-1) — „Rezygnujesz kiedy chcesz" przy zerze wierszy
- **Z-13** (A-2) — pakiet P-9 pomija `Cennik.faq.o3` → **`bramka:liczby` czerwona w trzech językach**


### D-5

**Zmiana:** `Cennik.faq.o4` (C-3) —

| | brzmienie | zn |
|---|---|---|
| **pl** | „Kontakty eksportujesz do vCard, rejestr aktywności pobierasz jako CSV — póki masz aktywny plan." | **95** (80) |
| **en** | „You export contacts to vCard and download your activity log as CSV — while your plan is active." | **95** (80) |
| **de** | „Kontakte exportierst du als vCard, das Aktivitätsregister lädst du als CSV herunter – solange dein Plan aktiv ist." | **114** (99) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/cennik.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-09** (A-1) — wspólny defekt „do vCard"
- **Z-1** (A-2) — buduje kwalifikator z `TO:12-13`, a E-5 wchodzi z uzasadnieniem, że to zastrzeżenie kwalifikować NIE MOŻE


### D-6

**Zmiana:** `Cennik.plany.starter.pozycja1` (C-05) —

| | brzmienie | zn |
|---|---|---|
| **pl** | „Pulpit — jeden ekran, na którym widzisz sprzedaż, aktywne kontakty i aktywność zespołu" | **86** (63) |
| **en** | „Dashboard — one screen where you see sales, active contacts and team activity" | **77** (62) |
| **de** | „Dashboard – ein Bildschirm, auf dem du Verkäufe, aktive Kontakte und die Aktivität deines Teams siehst" | **102** (75) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/cennik.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### D-7

**Zmiana:** `Cennik.tabela.puls` (N-C1) —

| | brzmienie | zn |
|---|---|---|
| **pl** | „Puls zespołu — od planu Growth" | **30** (12) |
| **en** | „Team Pulse — from the Growth plan up" | **36** (10) |
| **de** | „Team-Puls – ab dem Growth-Plan" | **30** (9) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/cennik.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-20** (A-1) — etykieta „od planu Growth" wbrew obowiązującemu słownikowi nazw
- **Z-2** (A-2) — kolizja z C-2 i F-1
- **A3-9** (A-3) — ta sama kolizja ze słownikiem, nieodnotowana w syntezie


### D-8

**Zmiana:** `Cennik.plany.growth.pozycja1` — defekt wyłącznie polski

| | brzmienie | zn |
|---|---|---|
| **pl** | „Puls zespołu — widzisz sygnały ryzyka odejścia i dostajesz **gotowe** zdanie otwierające rozmowę" | **92** (85) |
| **en** | *bez zmiany* | 103 |
| **de** | *bez zmiany* | 128 |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/cennik.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### D-9

**Zmiana:** `Cennik.faq.o1` — człon o mechanice płatności wypada

| | brzmienie | zn |
|---|---|---|
| **pl** | „Ceny na tej stronie są w złotych. Każdy plan ma też cenę w euro." | **64** (98) |
| **en** | „Prices on this page are in euros. Every plan also has a price in Polish złoty." | **78** (116) |
| **de** | „Die Preise auf dieser Seite sind in Euro. Jeder Plan hat auch einen Preis in Złoty." | **83** (123) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/cennik.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### E-1

**Zmiana:** `FunkcjeZespol.mod6_poco` — Akademia · **ZŁOŻENIE, bo żadna z trzech nie wykonuje §136** ⇄

| | brzmienie | zn |
|---|---|---|
| **pl** | „Nowa osoba z twojego zespołu otwiera Akademię — kolejny moduł odblokowuje się dopiero po ukończeniu poprzedniego. Ty wracasz do swoich rozmów." | **142** (206) |
| **en** | „A new person on your team opens the Academy — the next module unlocks only once the previous one is finished. You get back to your own conversations." | **149** (219) |
| **de** | „Deine neue Partnerin öffnet die Akademie – das nächste Modul schaltet sich erst frei, wenn das vorherige abgeschlossen ist. Du gehst zurück zu deinen eigenen Gesprächen." | **169** (251) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/funkcje-zespol.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-17** (A-1) — z wiersza wzięta połowa — ta ograniczająca została


### E-2

**Zmiana:** `FunkcjeTresci.mod8_poco` — §37.3 para 3

| | brzmienie | zn |
|---|---|---|
| **pl** | „Piszesz posty tak, jak mówisz do swoich klientek — po swojemu. **system** uczy się tego stylu z opublikowanych postów i buduje z niego profil głosu twojej marki." | **157** (159) |
| **en** | „You write posts the way you talk to your customers — in your own way. **The system learns** that style from your published posts and builds your brand's voice profile from it." | **171** (169) |
| **de** | „Du schreibst Posts so, wie du mit deinen Kundinnen sprichst – auf deine Weise. **Das System lernt** diesen Stil aus deinen veröffentlichten Posts und baut daraus das Stimmprofil deiner Marke." | **187** (185) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/funkcje-tresci.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### E-3

**Zmiana:** `FunkcjeZespol.mod1_poco` — Z-1, sprawstwo

| | brzmienie | zn |
|---|---|---|
| **pl** | „Znajoma zdecydowała się dołączyć do twojego zespołu, a twój dzień jest już pełen własnych rozmów. Wdrażasz ją przez sześć kroków kreatora — i nie musisz siadać z nią nad każdym z nich." | **184** (228) |
| **en** | „A friend has decided to join your team, and your day is already full of your own conversations. You bring her in through the wizard's six steps — and you don't have to sit down with her over every one of them." | **—** |
| **de** | „Eine Bekannte hat sich entschieden, deinem Team beizutreten – und dein Tag ist schon voll mit deinen eigenen Gesprächen. Du bindest sie über die sechs Schritte des Einstiegsassistenten ein – und musst nicht jeden einzelnen mit ihr durchgehen." | **—** |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/funkcje-zespol.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### E-4

**Zmiana:** `FunkcjeWyniki.mod5_nie` — „rejestr widzisz ty" wypada

| | brzmienie | zn |
|---|---|---|
| **pl** | „Świadectwo niczego nigdzie nie wysyła — CSV trafia tylko do tych, którym sama go przekażesz." | **92** (114) |
| **en** | „The Testimony sends nothing anywhere — the CSV goes only to the people you yourself hand it to." | **95** (116) |
| **de** | „Das Zeugnis verschickt nichts, nirgendwohin – die CSV bekommen nur die Personen, denen du sie selbst weitergibst." | **—** |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/funkcje-wyniki.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-18** (A-1) — twierdzenie o przepływie danych, kwantyfikator „tylko", zero wierszy


### E-5

**Zmiana:** `FunkcjeWyniki.mod5_poco` — „można zweryfikować" wypada, „kiedy chcesz" **ZOSTAJE**

| | brzmienie | zn |
|---|---|---|
| **pl** | „Chcesz pokazać swoje wyniki komuś, kto nie widział twojej codziennej pracy. Eksportujesz CSV ze Świadectwa kiedy chcesz — a twoja historia aktywności jest zabezpieczona cyfrowym odciskiem SHA-256." | **196** (240) |
| **en** | „You want to show your results to someone who hasn't seen your day-to-day work. You export a CSV from the Testimony whenever you like — and your activity history is secured with a SHA-256 digital fingerprint." | **207** (243) |
| **de** | „Du willst deine Ergebnisse einer Person zeigen, die deine tägliche Arbeit nicht gesehen hat. Du exportierst eine CSV aus dem Zeugnis, wann du willst – und dein Aktivitätsverlauf ist mit einem digitalen SHA-256-Fingerabdruck gesichert." | **—** |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/funkcje-wyniki.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **Z-1** (A-2) — patrz D-5 — to jest druga strona tej samej sprzeczności


### E-6

**Zmiana:** `FunkcjeTresci.mod1_nie` — granica wraca do pełnego zakresu

| | brzmienie | zn |
|---|---|---|
| **pl** | „Do Studia nie wgrasz **własnych zdjęć ani plików** — projekt składasz z tekstu, szablonów i elementów edytora." | **106** (97) |
| **en** | „You can't upload your own photos or files to the Studio — you put a design together from text, templates, and the editor's elements." | **132** (130) |
| **de** | „Ins Studio lädst du keine eigenen Fotos oder Dateien hoch – einen Entwurf setzt du aus Text, Vorlagen und Elementen des Editors zusammen." | **—** |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/funkcje-tresci.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### E-7

**Zmiana:** `FunkcjeTresci.mod4_poco` —

| | brzmienie | zn |
|---|---|---|
| **pl** | „Każdy pomysł na post od razu dostaje swoje miejsce i datę w kalendarzu. Widzisz, co zaplanowałaś i na kiedy — a gdy plan się zmienia, przesuwasz post na inny dzień." | **164** (199) |
| **en** | „Every post idea gets its place and date in the calendar right away. You see what you've planned and for when — and when plans change, you move a post to another day." | **165** (209) |
| **de** | „Jede Post-Idee bekommt sofort ihren Platz und ihr Datum im Kalender. Du siehst, was du geplant hast und für wann – und wenn sich der Plan ändert, verschiebst du den Post auf einen anderen Tag." | **192** (218) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/funkcje-tresci.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-13** (A-1) — kwantyfikator, natychmiastowość i konstrukcja bez sprawcy — w jednym zdaniu


### E-8

**Zmiana:** `FunkcjeZespol.mod4_poco` — rytm wokół granicy

| | brzmienie | zn |
|---|---|---|
| **pl** | „Współpracowniczka z twojego zespołu wraca po przerwie i jej seria nie zaczyna się od zera — chroni ją żeton łaski. Za kolejne kroki zbiera odznaki, a ty nie musisz przy tym niczego ustawiać." | **190** (185) |
| **en** | „A colleague on your team comes back after a break, and her streak doesn't start over from zero — a grace token protects it. For the steps that follow she collects badges, and you don't have to set any of it up." | **210** (207) |
| **de** | „Eine Kollegin aus deinem Team kommt nach einer Pause zurück, und ihre Serie beginnt nicht bei null – ein Gnaden-Token schützt sie. Für die nächsten Schritte sammelt sie Abzeichen, und du musst dafür nichts einrichten." | **217** (216) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/funkcje-zespol.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-14** (A-1) — DOKŁADA nowy człon z kwantyfikatorem negatywnym; werdykt sprawdzał tylko nietkniętość granicy


### E-9

**Zmiana:** `FunkcjePozyskiwanie.mod4_nazwa` — wzorzec §13

| | brzmienie | zn |
|---|---|---|
| **pl** | „eksport kontaktów do telefonu (vCard)" | **37** (26) |
| **en** | „Contact export to your phone (vCard)" | **36** (23) |
| **de** | „Kontaktexport aufs Handy (vCard)" | **—** |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/funkcje-pozyskiwanie.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### F-1

**Zmiana:** `DlaKogo.s2_granica` — kwantyfikator odzyskuje przedmiot

| | brzmienie | zn |
|---|---|---|
| **pl** | „Catherly nie oceni za ciebie, kto wyhamował — **Pulpit pokazuje** tylko to, co ty i twój zespół zapisujecie w aplikacji, a rozmowę prowadzisz ty." | **+8** (133) |
| **en** | „Catherly won't decide for you who has slowed down — the **Dashboard shows** only what you and your team record in the app, and it's you who leads the conversation." | **+12** (147) |
| **de** | „Wer langsamer geworden ist, beurteilt Catherly nicht an deiner Stelle – **das Dashboard zeigt** nur das, was du und dein Team in der App eintragt, und das Gespräch führst du selbst." | **+10** (167) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/dla-kogo.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **P-08** (A-1) — kwantyfikator, którego źródło NIE MA, zostaje — i dostaje nazwany ekran
- **Z-2** (A-2) — patrz C-2 / D-7
- **Z-3** (A-2) — wprowadza „Pulpit pokazuje", odrzucone w B-3


### F-2

**Zmiana:** `DlaKogo.s1_h2` — „jeszcze / still / noch"

| | brzmienie | zn |
|---|---|---|
| **pl** | „Wszystko trzymasz w głowie i w wiadomościach." | −8 |
| **en** | „You keep it all in your head and in your messages." | −6 |
| **de** | „Du hast alles im Kopf und in deinen Nachrichten." | −5 |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/dla-kogo.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**STATUS PO ADWERSARZACH — nie wchodzi bez rozpatrzenia tego:**

- **A3-15** (A-3) — wymienia presupozycję na absolut; trzy języki lądują w trzech miejscach


### F-3

**Zmiana:** `DlaKogo.s1_robi_3` — drugi człon `TO:77` wchodzi na trasę

| | brzmienie | zn |
|---|---|---|
| **pl** | „Post zaczynasz od `<szablony>`gotowego szablonu`</szablony>`, nie od pustej strony. `<tarcza>`Tarcza`</tarcza>` zaznacza ryzykowne sformułowania, zanim go opublikujesz — **reguły działają na miejscu, twój tekst nie opuszcza aplikacji**." | **224** (160) |
| **en** | „You start a post from a `<szablony>`ready template`</szablony>`, not from a blank page. The `<tarcza>`Shield`</tarcza>` points out risky wording before you publish — **the rules run on the spot, and your text never leaves the app**." | **220** (156) |
| **de** | „Einen Post beginnst du mit einer `<szablony>`fertigen Vorlage`</szablony>`, nicht mit einem leeren Blatt. Der `<tarcza>`Schild`</tarcza>` markiert riskante Formulierungen, bevor du den Post veröffentlichst – **die Regeln laufen vor Ort, dein Text verlässt die App nicht**." | **260** (198) |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/dla-kogo.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### F-4

**Zmiana:** `DlaKogo.naglowek` — wyłącznie EN

| | brzmienie | zn |
|---|---|---|
| **pl** | „Pracujesz sama, budujesz zespół albo prowadzisz strukturę." *(BEZ ZMIANY)* | 58 |
| **en** | „You work on your own, you're building a team, or you run a structure." | **69** (82) |
| **de** | „Du arbeitest allein, baust ein Team auf oder führst eine Struktur." *(BEZ ZMIANY)* | 66 |

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/dla-kogo.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).


### F-5

**Zmiana:** `DlaKogo.s2_robi_1`, `s1_boli`, `s2_boli`, `s3_boli`, `FunkcjeIndeks.h1/zdanie`, cztery `blokNLink`, `blokNOznaczenie` — **NIE RUSZAĆ**

**Brzmienia:** brak — pozycja zbiorcza „bez zmiany brzmienia".

**Pliki:** `src/i18n/messages/{pl,en,de}.json` · `content/{pl,en,de}/dla-kogo.md`

**Kod czy treść:** treść (+ strażnik znak-w-znak w `e2e/`)

**Rozmiar (pomiar, nie szacunek czasu):** 1 klucz(y) × 3 języki = **3 ciągów** · 1 plik(ów) treści × 3 = 3 · `messages` ×3

**Status po adwersarzach:** brak zarzutu imiennego (obowiązują zarzuty globalne).

---

# CZĘŚĆ II — POZYCJE WYMAGAJĄCE DECYZJI WŁAŚCICIELA

**Rozstrzygnięte 2026-08-21 (O-1…O-12) — zamknięte, nie powtarzam.**
Poniżej **nowe**, wyprodukowane przez rundę adwersarską:

| # | pytanie | co blokuje |
|---|---|---|
| **N-1** | **Czy `TO:12-13` (zastrzeżenie o aktywnej subskrypcji) kwalifikuje frazy wierszy tabeli?** S1 §6.2 mówi NIE („gdyby unieważniało frazy wierszy, unieważniałoby całą tabelę"), a D-5 wchodzi z kwalifikatorem zbudowanym z tego zastrzeżenia | **A-1, D-5, E-5** — sześć kluczy, dwa na jednej stronie `/cennik` |
| **N-2** | **Czym jest noga łańcucha: równością/zawieraniem znak w znak, czy dopasowaniem bez rozróżniania wielkości liter?** Pierwsze — Z-7 stoi, arność #1 w PL spada 9→8. Drugie — Z-7 upada, ale **upada §139.1 i cała mapa wymaga przeliczenia**, a „Team" w DE ma 38 nóg | **A-2**, cofnięcie **W2-A A-5**, karta łańcucha #1, mapa §139.1 |
| **N-3** | **Czy W2-A A-5 wraca do rozpatrzenia**, skoro powód jego cofnięcia (kasowanie dziewiątej nogi) upadł? | jedna pozycja grupy A |
| **N-4** | **N-18 / `Cennik.faq.o2`** — czy przekwalifikowanie do „toru aplikacji" jest dopuszczalne wobec ADR-018 („usuwasz obietnicę, nie ogłaszasz funkcji")? Zdanie jest **pilnowane znak w znak**, więc bramka utrzyma je przy życiu i zapali się przy usunięciu | jedna pozycja + precedens dla całej klasy |
| **N-5** | **Czy pozycje renderowane w zwiniętym `<details>` mają być otwierane** (`open` na pierwszej parze), czy godzimy się, że 31 z 37 napraw nie dociera do klikającej czytelniczki? | **zmiana kodu**, dotyczy sześciu pozycji + D-3 |
| **N-6** | **Czy `alt` podlega tabeli obietnic tak samo jak tekst widoczny?** SR-01 / A3-19 twierdzi tak; dziś żaden strażnik ani żadne kryterium tego nie zakłada | **klasa**, nie pozycja — 4 alt-y ×3 języki |
| **N-7** | **`ObrazyFilarow.filar2`** — usunąć człon „propozycja poprawionej wersji" (ADR-018), czy wstrzymać do potwierdzenia z kodu aplikacji? **Dziś stoi na produkcji w trzech językach** | pozycja **stanu dzisiejszego**, nie WCHODZI |

---

# CZĘŚĆ III — POZYCJE WYCHODZĄCE POZA TOR 9, Z ADRESATAMI

| pozycja | adresat | stan |
|---|---|---|
| **`cennik-snapshot.json` bez daty + bramka przeciw Stripe'owi TESTOWEMU** · ⚠ **POZYCJA PREMIEROWA** — ceny na stronie mogą dziś nie odpowiadać produkcyjnym i nic tego nie porównuje | **tor aplikacji, posiedzenie Stripe** | §156.2 |
| **`scripts/setup-stripe.ts` poza zasięgiem** — cała analiza rodziny anulowania (`at_period_end`, `cancellation_reason`, `subscription_update`) jest **R-C: NIEWERYFIKOWALNA** z tego środowiska | **tor aplikacji** (ten sam dostęp co wyżej) | §164.4 |
| **O-11** — sześć zamknięć `/login` → `/cennik` | **okno wykonawcze www** | zmiana kodu |
| **O-7** — pakiet treść + strażnik + STRATEGIA + `Obawy.naglowek` | **okno wykonawcze www** | jeden pakiet albo wcale |
| **`{minuty}` = 30** — jedyny fakt w `facts.json` bez źródła w kodzie; zlecenie D-B3 z 2026-08-12 niewykonane | **tor 10** | `PRZEKAZANIE-TOR10.md` poz. 1 |
| **Klasa 2 Z-1 (3 klucze) — rozjazd zdania z wierszem** | **tor 10** | `PRZEKAZANIE-TOR10.md` poz. 2 |
| **`Filary.filar2.konkret3`** — czy wiersz `TO:78` jest prawdziwy | **tor 10** | `PRZEKAZANIE-TOR10.md` poz. 3 |
| **Bramki planów: trójka boole'ów wpisana ręcznie** w `TabelaPorownawcza.tsx:47-50`, obok czterech liczb z wymuszonym importem, źródłem i datą | **tor aplikacji / okno www** | A3-8, §166.6 |
| **`tabeli obietnic` nie czyta żadna bramka** — jedyne źródło prawdy toru redakcyjnego bez strażnika daty i bez odczytu | **decyzja właściciela: czy zakładać bramkę** | A3-5, §166.2 |
| **Brak `description` i `og:` w całym serwisie** (0 z 31 artefaktów) — nieustalone, czy decyzja, czy zwyczaj | **audyt „zwyczaj czy decyzja"** | §157.4 |

---

# CZĘŚĆ IV — CZEGO TA LISTA NIE ZAWIERA (R-D)

1. **Nie zawiera 20 pozycji NIE WCHODZI ani 4 wracających do autora** — poza jedną (W2-A A-5),
   której powód cofnięcia upadł.
2. **Nie zawiera pakietów niepodzielnych P-1…P-9 rozpisanych na składniki** — synteza je
   definiuje, ja ich nie rozbierałem; **A-2 wykazał, że P-1 i P-2 mają wady wewnętrzne**
   (Z-4, Z-6, Z-9), więc rozbiór wymagałby ich wcześniejszego rozstrzygnięcia.
3. **Nie zawiera żadnego szacunku czasu** — patrz uzasadnienie na czele.
4. **Mapa „klucz → plik treści" jest moja**, wyprowadzona z prefiksu; dla pozycji zbiorczych
   (`A-3`, `B-9`, `C-7`, `F-5`) **nie jest kompletna**.
5. **Nie sprawdziłem, czy 42 brzmienia przechodzą `lint-deklaracje.mjs`** — A-2 zgłosił to
   jako własną dziurę (rozjazd deklaracji `zn` niepoliczony) i ja też tego nie zrobiłem.
6. **Nie zweryfikowałem imiennie 68 znalezisk adwersarskich** — sprawdziłem osobiście
   **dziewięć** (X-4, SR-01, X-1, Z-7, Z-16, A3-5, A3-2, A3-1, A3-16/17). **Pozostałe 59
   przekazuję jako twierdzenia adwersarzy, nie jako stan.**

---

# CZĘŚĆ V — POZYCJA 43, SPOZA SYNTEZY (dopisana 2026-08-24, zlecenie TOR9/022)

**Ta lista miała 42 pozycje, bo tyle wyszło z syntezy R2. `RECZ-250` nie wyszło
z syntezy — bo synteza mierzyła BRZMIENIA, a `RECZ-250` jest o tym, że brzmienia
NIE MA CZYM WYRENDEROWAĆ.** Wchodzi na polecenie właściciela.

| # | pozycja | trasa | co dokładnie | źródło |
|---|---|---|---|---|
| **43** | **`RECZ-250` — rynki EUR renderują PUSTĄ SIATKĘ planów, bez komunikatu** | **`/cennik`** | migracja `20260814210000_ceny_per_waluta` **istnieje w repozytorium aplikacji** (potwierdzone odczytem drzewa 2026-08-24), **stan wdrożenia na produkcji = `R-C`**. Skutek dla czytelnika: **strona pokazuje pustkę tam, gdzie obiecuje porównanie planów** | **TOR 10**, `91-DO-WLACZENIA.md:30,169` · waga **WYSOKA** |

**Dlaczego to jest pozycja redakcyjna, a nie tylko awaria wdrożenia:**

> ## **Pusta siatka NIE JEST BRAKIEM TREŚCI — JEST TREŚCIĄ. Czytelnik na rynku EUR
> ## dostaje odpowiedź „nie ma planów", a nie „coś się nie wczytało".** Cztery
> ## komórki `bez limitu`, cztery wiersze liczb i trzy nazwy planów, które
> ## redagowałem przez dwa dni, **na tym rynku nie istnieją.**

**Czego NIE rozstrzygam** (R-D, i to nie jest odroczenie „całości" — patrz §210):
- **warstwa techniczna** — czy migracja jest wdrożona: **`R-C`, poza moim zasięgiem
  z repozytorium**; żaden `git fetch` tego nie zdejmie (§217.3);
- **warstwa redakcyjna, MOJA i wykonalna od razu** — czy `/cennik` ma **stan pustej
  siatki** w ogóle przewidziany w komunikatach. **Zmierzone (R-H — komenda i wynik):**
  spłaszczenie `src/i18n/messages/pl.json` po prefiksie `Cennik.` daje **50 kluczy**;
  filtr po `pust|brak|niedost|błąd|nie ma|wkrótce|chwilowo|spróbuj` w kluczu i wartości
  daje **ZERO trafień**. W samej `Cennik.tabela.*` jest `caption`, `zakres`, sześć nazw
  wierszy, `bezLimitu`, `wKazdymPlanie`, `wPlanie`, `pozaPlanem` — **i nic więcej.
  Nie ma czym powiedzieć „tu nic nie ma".** To jest brak **po mojej stronie**, niezależny
  od tego, czy migracja wejdzie.

> **Pozycja 43 różni się od pozostałych 42 tym, że jej połowa jest wykonalna
> BEZ rozstrzygnięcia drugiej połowy.** Rozdzielenie warstw kosztowało jedno
> spojrzenie w `pl.json` i odblokowało część — dokładnie jak przy A-20 (§216).
