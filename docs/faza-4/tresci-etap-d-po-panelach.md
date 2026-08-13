# Etap D — treść po panelach: /funkcje (indeks) + /dla-kogo (trzy ścieżki)

Status: **PO PANELACH — DO DECYZJI WŁAŚCICIELA.** Data: 2026-08-13.
Podstawa: `docs/faza-4/komponenty/brief-etap-d-indeks-i-dla-kogo.md`
(OBOWIĄZUJE), tabela obietnic, słownik nazw, rejestr warunków powrotu,
`content/facts.json`, treści OBOWIĄZUJĄCE z Etapów B i C.

Ten dokument nie jest treścią wdrożoną. Jest protokołem panelu: niesie
treść finalną PL obu stron, ślad panelu (co naniesione, co odrzucone
i dlaczego) oraz ryzyka. **Implementacja nie startuje przed decyzjami
właściciela** — trzy z nich zmieniają liczbę pozycji albo publiczny
kontrakt adresów, więc rozstrzygnięcie po fakcie kosztuje poprawkę
w sześciu plikach treści i trzech przestrzeniach messages naraz.

## Jak powstał ten materiał (pipeline bez zmian)

Przebieg 17 agentów w trzech fazach, zgodnie z poleceniem właściciela
„na szablonach, pipeline bez zmian":

1. **Fan-out (9 autorów, równolegle):** cztery bloki zadań dnia + rama
   dla `/funkcje`; trzy ścieżki + rama dla `/dla-kogo`.
2. **Panel (6 soczewek, po trzy na stronę):** PRAWDA OBIETNICY ·
   SPÓJNOŚĆ SZWU I MILCZENIE · JĘZYK, RYTM I NIEPOWTARZALNOŚĆ.
   Wszystkie sześć werdyktów: POPRAWKI.
3. **Synteza (2 agenty, po jednym na stronę):** składa i rozstrzyga
   sprzeczności między soczewkami; nie dopisuje treści.

Prawo 2 utrzymane na każdym szczeblu: autor nie ocenia siebie, panel nie
jest autorem, synteza nie jest panelem. Żadna soczewka nie oceniała
materiału, który sama napisała.

## Weryfikacja wykonana poza panelem (fakty z kodu, nie oceny)

Sprawdzone przy odbiorze przebiegu, niezależnie od deklaracji agentów:

- **Kontrakt kotwic `/funkcje`: 33/33 zgodne z kodem.** Wszystkie
  kotwice list indeksu istnieją w tablicach `MODULY` czterech
  `src/app/[locale]/funkcje/*/page.tsx` oraz jako `idNaglowka` dwóch
  sekcji kierunku (`asystent-ai` ×2). Zero pozycji zmyślonych.
- **Kontrakt linków `/dla-kogo`: 13/13 zgodne z kodem.**
- **Wiersz planu — wątpliwość zgłoszona przed panelem rozstrzygnięta.**
  `FunkcjePozyskiwanie.f8` i `FunkcjeTresci.f8` mają jedno zdanie
  („Wszystko powyżej działa od planu Starter."), a `FunkcjeZespol`
  i `FunkcjeWyniki` mają po dwa i trzy klucze F8 — ale zdania dodatkowe
  dotyczą **Pulsu zespołu i drzewa struktury, które nie są modułami
  żadnego bloku indeksu**. Zdanie o Starterze jest więc na indeksie
  prawdziwe wobec wszystkich 33 wymienionych pozycji i identyczne ×5
  stron. Cena tej decyzji jest jawna i idzie do właściciela (D-D11).
- **Bramka kotwic: zielona** — 123 linki z fragmentem, 0 martwych.
  Dowód mutacji wykonany przy jej wprowadzeniu (commit `ed91d7a`:
  24 martwe kotwice ze 123 na zmutowanej stronie, exit 1; po
  przywróceniu 0 martwych, exit 0). **Sprostowanie do ryzyk obu syntez:**
  agenci nie mieli tego dowodu w kontekście i zapisali bramkę jako
  niesprawdzoną. Dowód istnieje dla stanu zastanego; dowód dla 46 nowych
  kotwic Etapu D należy do implementacji i pozostaje wymogiem.
- **„30 minut"** (`facts.json` → `przypomnienie-kalendarza-minuty`) ma
  status „do weryfikacji w kodzie aplikacji" (D-B3) i jest pozycją
  zlecenia Z7. Ścieżka 1 `/dla-kogo` stoi na tym fakcie — odpowiedź inna
  niż 30 zmienia zdanie tutaj i na `/funkcje/pozyskiwanie` naraz, ×3 języki.

## Numeracja decyzji — mapa (kolizja usunięta)

Obie syntezy numerowały swoje decyzje niezależnie i obie zaczęły od
D-D6. W tym protokole obowiązuje numeracja ciągła: `/funkcje` zachowuje
D-D6…D-D12, `/dla-kogo` przesunięte o siedem.

| W syntezie `/dla-kogo` | W tym protokole |
|---|---|
| D-D6 (perspektywa Pierwszych 90 Dni) | **D-D13** |
| D-D7 (slugi sekcji) | **D-D14** |
| D-D8 (zastrzeżenie Paszportu w granicy) | **D-D15** |
| D-D9 (liczebniki słowne) | **D-D16** |
| D-D10 (ile z karty Pro) | **D-D17** |
| D-D11 (segment ↔ plan) | **D-D18** |
| D-D12 (funkcja w dwóch ścieżkach) | **D-D19** |
| D-D13 (etykieta „Na tej stronie") | **D-D20** |
| D-D14 (etykieta linku = podciąg akapitu) | **D-D21** |

Odwołania do **D-D1…D-D5 pochodzą z briefu** i nie były przenumerowane.

## Lista decyzji właściciela — komplet D-D1…D-D21

D-D1…D-D5 z briefu wciąż są otwarte; panele przyjęły rekomendacje jako
roboczą podstawę i na nich zbudowały treść, więc odpowiedź inna niż
rekomendacja wywraca konkretne elementy — zaznaczone w kolumnie skutku.
Tabela jest skrótem; **pełne brzmienia pytań D-D6…D-D21 wraz
z uzasadnieniami są w załączniku na końcu tego dokumentu.**

| # | Rzecz do rozstrzygnięcia | Rekomendacja | Skutek odpowiedzi przeciwnej |
|---|---|---|---|
| D-D1 | Tabela planów na `/funkcje` | Bez tabeli: jeden wiersz + link do `/cennik` | Kopia limitów ×3 języki i drugie źródło prawdy dla liczb |
| D-D2 | Okruszki na stronach jednopoziomowych | Brak (wystarczy `aria-current="page"`) | Okruszek bez linku na obu stronach |
| D-D3 | Granica w każdej ścieżce `/dla-kogo` | Obowiązkowa, jedno zdanie | Wywraca też ramę: zdanie wiodące zapowiada granicę |
| D-D4 | Brzmienia H2 trzech ścieżek | Sankcja trzech brzmień z części B | Fan-out ma warianty zapasowe, ale zmiana H2 zmienia spis treści |
| D-D5 | Głębokie linkowanie `/dla-kogo` → kotwice | Tak, 13 celów zweryfikowanych w kodzie | Ścieżki prowadzą do podstron ogólnych, konkret ginie |
| D-D6 | Czy sekcje kierunku (`asystent AI` ×2) wchodzą na listy indeksu — i czy wiersz planu zostaje verbatim | Wchodzą, wiersz zostaje (korekta objęłaby 5 stron naraz) | Bloki 1 i 2 tracą po pozycji: 33 → 31 |
| D-D7 | Sankcja trzech nowych H2 bloków indeksu | Sankcjonować, dopisać do `content/pl/funkcje.md` | Trzy z czterech nagłówków wchodzą bez decyzji |
| D-D8 | Czy kotwica zarezerwowana „Wieczorem widzisz, co z tego wyszło." może paść drugi raz | Nie — blok 4 ma własne H2 z pokryciem | Mocniejsze H2 kosztem najmocniejszego zdania serwisu |
| D-D9 | Czy „Rano widzisz, do kogo się odezwać." pada po raz trzeci | Tak — to kręgosłup, nie pożyczka | Czwarty wariant tej samej obietnicy do sankcji |
| D-D10 | Etykiety linków wejściowych: cztery różnicowane czy jedna | Różnicowane, strzałka w komponencie | Cztery identyczne nazwy linków (WCAG 2.4.4) → wymóg `aria-label` |
| D-D11 | Czy indeks powtarza zdania Growth z F8 podstron | Nie: jeden wiersz + link do `/cennik` | Dwa zdania „W planie Growth…" na indeksie |
| D-D12 | Źródło 33 etykiet: reużycie ciągów podstron czy duplikat w `FunkcjeIndeks` | Reużycie — rozjazd staje się niemożliwy z konstrukcji | Po odpowiedzi na Z7 poprawka w dwóch miejscach ×3 języki |
| D-D13 | Czy Pierwsze 90 Dni mogą wystąpić w głosie uczestniczki | Nie na tym etapie (zdanie wycięte) — powrót po Z7 + wierszu w tabeli + zdaniu w module 3 | Zapowiedź prowadzi do modułu pisanego w głosie liderki |
| D-D14 | Slugi sekcji `/dla-kogo` (kontrakt publiczny) | Czasownikowe: `#pracujesz-sama`, `#budujesz-zespol`, `#prowadzisz-strukture` | Etykiety segmentowe w adresie; zmiana po premierze łamie linki bez czerwieni |
| D-D15 | Zastrzeżenie Paszportu („nie daje prawnej gwarancji ani porady") na `/dla-kogo` | Ma nieść — to jedyne miejsce o konsekwencji prawnej | Kwalifikator wyłącznie na podstronie, do której czytelniczka może nie dojść |
| D-D16 | Liczebniki słowne („cztery fazy", „czterech jurysdykcji") | Wolno, gdy są cechą funkcji z tabeli obietnic (precedens `filary.md`) | Dwa zdania przepisane, konkret słabszy |
| D-D17 | Ile z karty Pro niesie `/dla-kogo` | Jedna pozycja (czysty eksport) | Wiersz planu rośnie ponad sekcję, ścieżka czyta się jak cennik |
| D-D18 | Czy `/dla-kogo` wiąże segment z planem jak karty `/cennik` | Nie — `/cennik` zostaje jedynym takim miejscem | Drugi cennik do utrzymania ×3 języki |
| D-D19 | Czy jedna funkcja może być w dwóch ścieżkach | Jedna funkcja — jeden dom | Dopuszczalne tylko przy innym zdaniu i innym kącie |
| D-D20 | Etykieta „Na tej stronie" jako stała serwisu (poza cztery podstrony z D-C4) | Potwierdzić jednym zdaniem | Druga etykieta na to samo, w trzech językach |
| D-D21 | Reguła „etykieta linku = podciąg akapitu CO ROBI" + asercja testowa | Przyjąć jako kontrakt implementacji | Klasa błędu wychodzi dopiero u adwersarza |

## Co się dzieje po decyzjach

Adaptacje EN/DE przez panele (parytet ×3 od pierwszego commita treści —
`content/{pl,en,de}/{funkcje,dla-kogo}.md`, drzewa 12 → 14) → HF obu
stron → panel projektu → handoff → implementacja (`BlokZadaniaDnia`,
`SciezkaRozpoznania`, przestrzenie `FunkcjeIndeks` i `DlaKogo`) →
bramki, w tym dowód mutacji bramki kotwic na nowych kotwicach →
adwersarz etapu → akcept właściciela → push.

---


# CZĘŚĆ A — `/funkcje` (indeks wg zadań dnia)

*Protokół syntezy, verbatim. Numeracja decyzji D-D6…D-D12 bez zmian.*

# Panel treści — /funkcje (indeks wg zadań dnia) · SYNTEZA

**Data: 2026-08-13 · Status: PO PANELU — treść finalna PL gotowa do przeniesienia do `content/pl/funkcje.md`, warunkowana decyzjami D-D6…D-D12.**

Podstawa: brief Etapu D (OBOWIĄZUJE), tabela obietnic (OBOWIĄZUJE), słownik nazw (OBOWIĄZUJE), rejestr warunków powrotu, `content/facts.json`, `content/pl/{naglowek,filary,rytm-dnia,zamkniecie}.md`, cztery `content/pl/funkcje-*.md` (OBOWIĄZUJĄ), kod: `src/app/[locale]/funkcje/*/page.tsx`, `src/i18n/messages/pl.json`.

Werdykt syntezy: **POPRAWKI** — jedna uwaga BLOKUJĄCA naniesiona, dziesięć WAŻNYCH naniesionych (dwie częściowo), sześć DROBNYCH naniesionych, cztery propozycje panelu odrzucone z uzasadnieniem. Materiał nie idzie do implementacji przed rozstrzygnięciem D-D6 (zmienia liczbę pozycji) i D-D7 (sankcja trzech nowych brzmień H2).

Konwencja liczników w tym protokole: **znaki liczone z interpunkcją końcową**, policzone programowo (nie z pamięci) — uwaga DROBNA soczewki SPÓJNOŚĆ naniesiona.

---

# (b) TREŚĆ FINALNA PL

Plik docelowy: `content/pl/funkcje.md`. Przestrzeń messages: **`FunkcjeIndeks`**.
Parytet ×3 od pierwszego commita — `content/{en,de}/funkcje.md` powstają osobnymi panelami adaptacji; ten protokół dostarcza **wyłącznie PL**.

## I2 — Rama (`NaglowekPodstrony`)

**H1** → `FunkcjeIndeks.h1` *(41 zn)*

> Funkcje ułożone tak, jak idzie twój dzień

**Zdanie korzyści** → `FunkcjeIndeks.zdanie` *(79 zn)*

> Wybierasz to, co masz teraz do zrobienia, a nazwy funkcji znajdziesz po drodze.

*Pokrycie: zdanie o tej stronie, nie o produkcie — zero obietnicy funkcjonalnej, zero liczb. Zastępuje wariant „Nie musisz znać nazw funkcji…", który stał bezpośrednio nad listą 33 nazw funkcji (uwaga WAŻNA soczewki JĘZYK).*

---

## I3 — Cztery bloki (`BlokZadaniaDnia`), kolejność wg rejestru przejść

Kolejność pozycji w każdym bloku = kolejność modułów podstrony. Etykieta pozycji jest **nazwą, nie zdaniem** — żadna nie niesie obietnicy.

### BLOK 1 — `id="pozyskiwanie"`

**H2** → `FunkcjeIndeks.blok1Naglowek` *(34 zn)*

> Rano widzisz, do kogo się odezwać.

*VERBATIM: `content/pl/filary.md` Filar 1 H2 = `FunkcjePozyskiwanie.naglowek` (H1 podstrony). Trzecie wystąpienie tej frazy w serwisie — świadome, patrz D-D9.*

**Wprowadzenie** → `FunkcjeIndeks.blok1Wprowadzenie` *(139 zn)*

> Dzień zaplanowany w Dziennym Planie Działania zaczyna się od konkretu. Terminy, zadania i kontakty trzymasz w jednym miejscu, nie w głowie.

*Pokrycie fraza po frazie: zd. 1 — moduł 7 podstrony verbatim („Dzień zaplanowany w Dziennym Planie Działania zaczyna się od konkretu"), warunek („zaplanowany") przywrócony; tabela obietnic Filar 1 („Planujesz dzień w Dziennym Planie Działania"). Zd. 2 — terminy: moduł 2 („Terminy rozmów nie muszą siedzieć w twojej głowie"); zadania: moduł 8; kontakty: moduł 1 + „Baza kontaktów" (słownik w. 28); „w jednym miejscu": podtytuł hero (`naglowek.md`) + tabela w. 144. Zero powtórzenia obietnicy z H2. Zero myślnika.*

**Lista pozycji** → etykiety reużyte z `FunkcjePozyskiwanie` (patrz D-D12)

| # | Etykieta (verbatim) | Cel linku |
|---|---|---|
| 1 | formularz zgłoszeniowy z publiczną stroną | `/funkcje/pozyskiwanie#formularz` |
| 2 | Kalendarz z przypomnieniami | `/funkcje/pozyskiwanie#kalendarz` |
| 3 | subskrypcja kalendarza w telefonie | `/funkcje/pozyskiwanie#subskrypcja-kalendarza` |
| 4 | eksport kontaktów do vCard | `/funkcje/pozyskiwanie#eksport-vcard` |
| 5 | kod QR polecający | `/funkcje/pozyskiwanie#qr-polecajacy` |
| 6 | program poleceń ze śledzeniem | `/funkcje/pozyskiwanie#program-polecen` |
| 7 | DMO — Dzienny Plan Działania | `/funkcje/pozyskiwanie#dmo` |
| 8 | Zadania | `/funkcje/pozyskiwanie#zadania` |
| 9 | Sala Treningowa | `/funkcje/pozyskiwanie#sala-treningowa` |
| 10 | plany rozmów i debriefy | `/funkcje/pozyskiwanie#plany-rozmow` |
| 11 | asystent AI **[POZYCJA KIERUNKU]** | `/funkcje/pozyskiwanie#asystent-ai` |

**Link wejściowy** → `FunkcjeIndeks.blok1Link` *(30 zn)*

> Zobacz wszystko o pozyskiwaniu

*Strzałka „→" dokłada komponent, nie ciąg (precedens `f8link`) — patrz D-D10.*

---

### BLOK 2 — `id="tresci"` (UWAGA: **nie** `tresc` — to id głównego obszaru treści w `<main>`)

**H2** → `FunkcjeIndeks.blok2Naglowek` *(51 zn)* — **BRZMIENIE NOWE, do sankcji D-D7**

> Siadasz do postów i nie zaczynasz od pustej kartki.

*Pokrycie: „nie zaczynasz od pustej kartki" — `filary.md` Filar 2 konkret 1 verbatim; moduł 2 podstrony („zamiast pustej strony otwierasz gotowy szablon"); tabela w. 73. Wypłata świadomie oparta o szablony (tryb dokonany), nie o Studio — Studio nie jest podmiotem żadnego zdania dokonanego w tym bloku.*

**Wprowadzenie** → `FunkcjeIndeks.blok2Wprowadzenie` *(184 zn)*

> Post układasz z gotowego szablonu, planujesz go w kalendarzu i wysyłasz do zatwierdzenia u liderki — publikujesz sama. Ryzykowne sformułowanie wyłapujesz przed publikacją, nie po niej.

*Pokrycie: „układasz z gotowego szablonu" — moduł 2 + tabela w. 73; „planujesz go w kalendarzu" — tabela w. 75 verbatim („Planujesz posty w kalendarzu") + moduł 4; „wysyłasz do zatwierdzenia u liderki" — moduł 5 verbatim + tabela w. 76, forma żeńska wg słownika w. 30 (D-C2); **„publikujesz sama" — granica modułu 4 VERBATIM** („Catherly nie opublikuje posta za ciebie — kalendarz pokazuje plan, a publikujesz sama"); zd. 2 — moduł 6 verbatim + tabela w. 77. Człon o mechanizmie („reguły Tarczy działają w samej aplikacji") usunięty — wysokość lotu podstrony, nie indeksu.*

**Lista pozycji** → etykiety reużyte z `FunkcjeTresci`

| # | Etykieta (verbatim) | Cel linku |
|---|---|---|
| 1 | Studio | `/funkcje/tresci#studio` |
| 2 | szablony z wersjonowaniem | `/funkcje/tresci#szablony` |
| 3 | zestawy hashtagów | `/funkcje/tresci#hashtagi` |
| 4 | Kalendarz publikacji | `/funkcje/tresci#kalendarz-publikacji` |
| 5 | zatwierdzanie u liderki | `/funkcje/tresci#zatwierdzanie` |
| 6 | Tarcza | `/funkcje/tresci#tarcza` |
| 7 | Pieczęć Etyczna | `/funkcje/tresci#pieczec-etyczna` |
| 8 | uczenie profilu głosu | `/funkcje/tresci#uczenie-glosu` |
| 9 | tablica postów z filtrami | `/funkcje/tresci#tablica-postow` |
| 10 | asystent AI **[POZYCJA KIERUNKU]** | `/funkcje/tresci#asystent-ai` |

**Link wejściowy** → `FunkcjeIndeks.blok2Link` *(27 zn)*

> Zobacz wszystko o treściach

---

### BLOK 3 — `id="zespol"`

**H2** → `FunkcjeIndeks.blok3Naglowek` *(48 zn)* — **BRZMIENIE NOWE, do sankcji D-D7**

> Nowa osoba dołącza, a ty nie tłumaczysz od nowa.

*Pokrycie: „Nowa osoba" — słownictwo podstrony (moduł 1: „Znajoma zdecydowała się dołączyć do twojego zespołu"; moduły 1, 3, 6: „nowa osoba"); „nie tłumaczysz od nowa" — zdanie korzyści podstrony verbatim („Zamiast tłumaczyć od nowa każdemu — kreator wdrożeniowy robi to za ciebie") = `FunkcjeZespol.zdanie`. Zastępuje wariant „Ktoś dołącza do zespołu, a ty masz swój dzień": „Ktoś" to rejestr obcy podstronie, a „masz swój dzień" nie mówi, co ona robi, i orzeka o jej czasie ponad pokryciem.*

**Wprowadzenie** → `FunkcjeIndeks.blok3Wprowadzenie` *(184 zn)*

> Kreator wdrożeniowy prowadzi nową osobę przez etapy, a przez Pierwsze 90 Dni z misjami i fazami prowadzisz ją ty. Treści zespołu zatwierdzasz, a komunikat sprawdzasz, zanim go wyślesz.

*NAPRAWA BLOKUJĄCA. Pokrycie: „Kreator wdrożeniowy prowadzi nową osobę przez etapy" — `filary.md` Filar 3 konkret 1 VERBATIM + moduł 1 + tabela w. 110. „przez Pierwsze 90 Dni z misjami i fazami prowadzisz ją ty" — tabela w. 112 („Prowadzisz nową osobę przez Pierwsze 90 Dni z misjami i fazami"), **podmiotem jest czytelniczka**, zgodnie z granicą modułu 3 („Catherly nie poprowadzi nowej osoby za ciebie — program daje jej misje i fazy, a rozmowy prowadzisz ty"). Zd. 2 — moduł 2 + tabela w. 111; moduł 5 („komunikat… sprawdzasz… zanim wyślesz") — pozostaje SPRAWDZENIEM, nigdy gwarancją (granica modułu 5). „90" to człon nazwy własnej ze słownika w. 16, nie liczba marketingowa — `facts.json` nietknięty.*

**Lista pozycji** → etykiety reużyte z `FunkcjeZespol`

| # | Etykieta (verbatim) | Cel linku |
|---|---|---|
| 1 | kreator wdrożeniowy | `/funkcje/zespol#kreator-wdrozeniowy` |
| 2 | zatwierdzanie treści zespołu | `/funkcje/zespol#zatwierdzanie-zespolu` |
| 3 | Pierwsze 90 Dni | `/funkcje/zespol#pierwsze-90-dni` |
| 4 | Osiągnięcia | `/funkcje/zespol#osiagniecia` |
| 5 | Paszport zgodności | `/funkcje/zespol#paszport-zgodnosci` |
| 6 | Akademia | `/funkcje/zespol#akademia` |

**Link wejściowy** → `FunkcjeIndeks.blok3Link` *(25 zn)*

> Zobacz wszystko o zespole

---

### BLOK 4 — `id="wyniki"`

**H2** → `FunkcjeIndeks.blok4Naglowek` *(32 zn)* — **BRZMIENIE NOWE, do sankcji D-D7**

> Wieczorem wiesz, na czym stoisz.

*Pokrycie: „wiesz, na czym stoisz" — moduł 1 podstrony VERBATIM („Zanim zdecydujesz, co dziś najważniejsze, wiesz, na czym stoisz"). Rama wieczorna sankcjonowana przez `rytm-dnia.md`, krok „Wieczorem" (Pulpit należy do wieczora). **Nie używa kotwicy zarezerwowanej** „Wieczorem widzisz, co z tego wyszło." (`rytm-dnia.md`: „Kotwica zarezerwowana, decyzja 2026-08-09 — ostatnie zdanie kroku wieczornego, dosłownie") — patrz D-D8. Klamra rano → wieczorem między blokiem 1 a 4 zachowana; bloki 2 i 3 celowo bez pory dnia (zespół nie ma godziny).*

**Wprowadzenie** → `FunkcjeIndeks.blok4Wprowadzenie` *(155 zn)*

> Pulpit pokazuje dzisiejszy stan, a twoje wyniki mają dowód, który zostaje. Sukcesy swoje i zespołu zapisujesz i świętujesz, zanim przykryje je codzienność.

*Zd. 1 VERBATIM: zdanie korzyści podstrony = `FunkcjeWyniki.zdanie` (pokrycie: tabela w. 144 i 148). Zd. 2: moduł 4 + tabela w. 147 („Rejestrujesz i świętujesz sukcesy swoje i zespołu"); podmiotem jest ona („zapisujesz"), więc granica modułu 4 („Catherly nie zapisze sukcesu za ciebie") nienaruszona; „świętujesz" przywrócone, wtrącenie w dwóch myślnikach usunięte.*

**Lista pozycji** → etykiety reużyte z `FunkcjeWyniki`

| # | Etykieta (verbatim) | Cel linku |
|---|---|---|
| 1 | Pulpit | `/funkcje/wyniki#pulpit` |
| 2 | Twój Wrapped | `/funkcje/wyniki#twoj-wrapped` |
| 3 | Cel z kamieniami milowymi | `/funkcje/wyniki#cel` |
| 4 | Ściana sukcesów | `/funkcje/wyniki#sciana-sukcesow` |
| 5 | Świadectwo | `/funkcje/wyniki#swiadectwo` |
| 6 | Wall of Proof | `/funkcje/wyniki#wall-of-proof` |

**Link wejściowy** → `FunkcjeIndeks.blok4Link` *(26 zn)*

> Zobacz wszystko o wynikach

---

## I4 — MILCZENIE (element strukturalny, bez treści)

Cztery bloki, nie pięć. Filar 5 nie ma bloku. Słowo „rozliczenia" nie pada w żadnym ciągu widocznym.

## I5 — Plan jednym wierszem (`PlanJednymWierszem`)

**Zdanie** → `FunkcjeIndeks.f8` *(41 zn)* — VERBATIM stała ×4 podstrony

> Wszystko powyżej działa od planu Starter.

**Etykieta linku** → `FunkcjeIndeks.f8link` *(13 zn)* → `/cennik`

> Zobacz cennik

*BEZ kopii tabeli porównawczej (D-D1a). ZERO liczb — limity żyją wyłącznie na `/cennik`. Zdania Growth z F8 podstron zespół i wyniki NIE są powtarzane: „Puls zespołu" i „drzewo struktury" nie są modułami żadnego bloku indeksu, więc pełna forma „W planie Growth…" nie jest tu wymagana ani obchodzona (rejestr poz. 11, słownik w. 13). Patrz D-D11.*

## I6 — Zamknięcie (`Zamkniecie`, wariant krótki)

**CTA** → `FunkcjeIndeks.zamkniecieCta` *(19 zn)* → `/login` (ADR-023; tras rejestracji nie ma)

> Sprawdź, jak działa

**Zdanie** → `FunkcjeIndeks.zamkniecieZdanie` *(28 zn)*

> Rezygnujesz w każdej chwili.

*Obie stałe serwisu bez zmiany brzmienia (`content/pl/zamkniecie.md`, F10 ×4 podstrony). Fraza „bez podawania powodu" świadomie NIE użyta — odrzucona przez panel, rejestr poz. 14.*

---

## Notatki do handoffu (nie są treścią widoczną)

1. **id bloków = `pozyskiwanie`, `tresci`, `zespol`, `wyniki`.** `tresci` ≠ `tresc` — `tresc` jest celem skip-linku w `<main>` na dziewięciu stronach serwisu. Kotwice bloków dopisać do bramki `check-kotwice.mjs` obok 33 kotwic docelowych.
2. **Strzałka „→" renderuje komponent, nie ciąg.** Ciągi `blokNLink` są bez strzałki (precedens `f8link`). Ułatwia adaptacje EN/DE i nie wchodzi do porównania strażnika znak w znak jako znak specjalny.
3. **Etykiety pozycji reużyte**, nie duplikowane w `FunkcjeIndeks` — rekomendacja D-D12(a). Strażnik znak w znak `FunkcjeIndeks ↔ content/pl/funkcje.md` obejmuje wtedy ramę, H2, wprowadzenia, linki wejściowe, wiersz planu i zamknięcie; etykiety są porównywane w swoich macierzystych przestrzeniach.
4. **Pozycje kierunku** (`asystent AI` ×2) — ostatnie na liście swojego bloku, zgodnie z kolejnością podstrony (`SekcjaKierunku` po ostatnim module). Rekomendacja dla HF: oddzielić wizualnie **bez nowego ciągu** (odstęp/separator). Gdyby HF uznał, że potrzebna jest widoczna etykieta typu „kierunek" — to nowy ciąg i wraca do panelu treści.
5. `BlokZadaniaDnia` **bez slotu obrazu** — indeks nie obiecuje ekranu (brief; F4-3 dotyczy podstron).
6. Kotwice ze `scroll-margin` (sticky nav — precedens `#tresc`). Zero JS, 390 px mobile-first, reflow 320 px.
7. **Dowód mutacji bramki kotwic** jest częścią etapu: podmiana jednej z 33 kotwic na nieistniejącą musi dać czerwień na wszystkich trzech językach.

---

## Weryfikacja własna syntezy (nie z pamięci — z kodu i plików)

- **33 kotwice** sprawdzone znak w znak z tablicami `MODULY` w `src/app/[locale]/funkcje/{pozyskiwanie,tresci,zespol,wyniki}/page.tsx` (linie 34–45) oraz z `idNaglowka="asystent-ai"` w `SekcjaKierunku` na `/funkcje/pozyskiwanie` (page.tsx:111) i `/funkcje/tresci` (page.tsx:106). **Zgodność 33/33 z kontraktem zlecenia.**
- **33 etykiety** sprawdzone znak w znak z `mod{n}_nazwa` i `aiNaglowek` w `src/i18n/messages/pl.json`. **Zgodność 33/33.** Zero nowych nazw do słownika.
- Bilans wobec briefu: 10 + 9 + 6 + 6 = **31 modułów**, plus **2 sekcje kierunku** = 33 pozycje. Zgadza się z briefem co do liczby. *Doprecyzowanie: `#studio` z kontraktu zlecenia jest kotwicą MODUŁU 1 `/funkcje/tresci`, nie osobną sekcją — dwie sekcje kierunku w kodzie to `#asystent-ai` ×2.*
- **Milczenie:** przeszukanie całej treści finalnej po 32 frazach zakazanych (lista zlecenia + `FRAZY_WSPOLNE` z `e2e/funkcje-podstrony.spec.ts:32-56`) — **0 trafień**. „rozliczen*", „Puls", „drzewo struktury" — 0 trafień.
- **Liczby:** jedyny ciąg cyfr w całej treści to „90" w nazwie własnej „Pierwsze 90 Dni". `content/facts.json` nie jest potrzebny; bramka liczb bezprzedmiotowa.
- Zero zmyślonych osób, imion, cytatów, historii klientek. Zero firm z branży. Zero pilności, liczników, superlatywów, wykrzykników.

---

# (c) ŚLAD PANELU

## Werdykty soczewek

| Soczewka | Werdykt | Uwagi BLOKUJĄCE | WAŻNE | DROBNE |
|---|---|---|---|---|
| PRAWDA OBIETNICY | POPRAWKI | 1 | 2 | 3 |
| SPÓJNOŚĆ SZWU I MILCZENIE | POPRAWKI | 0 | 5 | 5 |
| JĘZYK, RYTM I NIEPOWTARZALNOŚĆ | POPRAWKI | 1 | 7 | 4 |

Trzy niezależne soczewki zbiegły się na tej samej uwadze BLOKUJĄCEJ (blok zespół, zdanie 1) i na tej samej rekomendacji linku wejściowego. To zbieżność, nie powtórzenie — traktuję ją jako mocny sygnał.

## Uwagi NANIESIONE

**BLOKUJĄCA — blok zespół, wprowadzenie zd. 1 (PRAWDA + JĘZYK).** Elipsa czasownika („a jej dalszą drogę — Pierwsze 90 Dni") czyniła program podmiotem prowadzenia, wprost przeciwnie do granicy modułu 3. Naniesione: podmiot przywrócony czytelniczce zgodnie z tabelą w. 112. Rozstrzygnięcie sporu dwóch propozycji — patrz „Uwagi odrzucone", poz. 4.

**WAŻNA — blok zespół, H2 + wprowadzenie zd. 2 (PRAWDA + JĘZYK).** H2 wymieniony w całości („Ktoś" → „Nowa osoba"; stan → czynność). Zd. 2 sprowadzone do czynności z pokryciem, dokładnie w brzmieniu zaproponowanym przez PRAWDĘ: „Treści zespołu zatwierdzasz, a komunikat sprawdzasz, zanim go wyślesz." Zwrot „zostajesz przy swoich rozmowach" usunięty — orzekał o jej czasie na podstawie dwóch z sześciu modułów i po naprawie BLOKUJĄCEJ przeczyłby zdaniu 1.

**WAŻNA — sekcje kierunku `#asystent-ai` wchodzą na listy (SPÓJNOŚĆ).** Rozstrzygnięcie: **wchodzą.** Brief jest dokumentem OBOWIĄZUJĄCYM i liczy wprost „31 pozycji + 2 sekcje kierunku"; kontrakt kotwic w zleceniu wymienia `#asystent-ai` dla obu podstron; obie kotwice istnieją w kodzie i są objęte kontraktem strażnika. Etykieta to gołe wyrażenie rzeczownikowe bez czasownika — nie orzeka ani trybu dokonanego, ani kierunku, więc poziomu obietnicy nie podnosi. Nazwa ma pokrycie w tabeli obietnic (Filar 1 w. 51, Filar 2 w. 86, sekcje „Język kierunku"). Pominięcie zostawiłoby dwie realne sekcje podstron bez wejścia z indeksu, czyli złamałoby zasadę kompletności, którą brief stawia twardo.

**WAŻNA — blok treści, łańcuch wydawniczy (SPÓJNOŚĆ, PRAWDA).** Naniesiona propozycja SPÓJNOŚCI: „planujesz go w kalendarzu" (tabela w. 75 verbatim) + domknięcie granicą modułu 4 verbatim „publikujesz sama". Indeks nie niesie sekcji CZEGO NIE ROBI, więc zdanie musi bronić się samo — i teraz się broni, bez usuwania trasy do realnego modułu.

**WAŻNA — blok treści, wprowadzenie zd. 2 (JĘZYK).** Człon o mechanizmie („reguły Tarczy działają w samej aplikacji") ucięty. Zdanie nadal pokryte verbatim (moduł 6, tabela w. 77), a odzyskana długość poszła na człon graniczny „publikujesz sama".

**WAŻNA — myślnik jako tik (JĘZYK).** Myślnik padał w czterech wprowadzeniach na cztery, w trzech w tej samej roli, a w bloku wyniki dwa razy w jednym zdaniu. Po korekcie myślnik występuje **w jednym bloku na cztery** (treści, raz), i to w roli granicznej, nie ozdobnej.

**WAŻNA — rama, H1 + zdanie korzyści (JĘZYK).** Zdanie korzyści przepisane. Poprzednie („Nie musisz znać nazw funkcji…") powtarzało H1 innymi słowami i stało bezpośrednio nad listą 33 nazw funkcji — sprzeczność widoczna na jednym ekranie 390 px. Nowe zdanie jest twierdzące i nie dubluje H1. Myślnik z propozycji JĘZYKA zamieniony na spójnik, zgodnie z jego własną uwagą o tiku.

**WAŻNA — blok wyniki, jedna z dwóch pożyczek zdjęta (JĘZYK).** Zdjęta pożyczka z **cudzej sekcji** (kotwica zarezerwowana strony głównej), zostawiony cytat z **własnej podstrony docelowej** — dokładnie wg zasady, którą JĘZYK sam sformułował: każdy blok cytuje swoją podstronę, najwyżej raz na blok. Nowe H2 pokryte modułem 1 podstrony verbatim.

**WAŻNA — wiersz planu rozstrzygany razem z sekcjami kierunku (PRAWDA, SPÓJNOŚĆ).** Naniesione jako sprzężenie: brzmienie zostaje VERBATIM (spójność ×5 stron jest testowalna), a niejednoznaczność idzie do właściciela jako D-D6 — z zastrzeżeniem, że korekta ma objąć pięć stron naraz, nigdy sam indeks.

**WAŻNA — masa wprowadzeń (JĘZYK), częściowo.** Było 144/210/225/146 (rozrzut 81 zn). Jest **139/184/184/155** (rozrzut 45 zn). Pasma 140–170 nie osiągnąłem w blokach 2 i 3 — bo w obu długość rośnie o człon, który dołożył sam panel (granica „publikujesz sama"; przywrócony podmiot). Prawda ma pierwszeństwo przed parytetem wizualnym; rozstrzygnięciem reszty jest układ, nie ucięcie treści (brief).

**WAŻNA — podmiot wprowadzeń (JĘZYK), częściowo.** Trzy z czterech wprowadzeń otwierało coś innego niż ona. Po korekcie ona jest podmiotem w blokach 1 (zd. 2 „trzymasz"), 2 („układasz", „publikujesz"), 3 („prowadzisz ją ty", „zatwierdzasz", „sprawdzasz"). Blok 4 zd. 1 zostaje verbatim — ruszanie sankcjonowanego cytatu dla samej symetrii byłoby stratą netto (stanowisko JĘZYKA i PRAWDY zgodne).

**DROBNA naniesiona — blok pozyskiwanie, zd. 1 (PRAWDA).** Warunek z modułu 7 przywrócony („Dzień **zaplanowany** w Dziennym Planie Działania"), powtórzenie obietnicy H2 usunięte. Poprawia tekst: krócej i bliżej źródła.

**DROBNA naniesiona — blok wyniki, zd. 2 (JĘZYK).** „świętujesz" przywrócone (tabela w. 147), wtrącenie w dwóch myślnikach usunięte, czasownik wrócił bliżej podmiotu.

**DROBNA naniesiona — etykieta `asystent AI` małą literą (SPÓJNOŚĆ, JĘZYK).** Kod ×2 ma `aiNaglowek = "asystent AI"`. `content/pl/funkcje-tresci.md` w. 133 zapisuje H2 jako „Asystent AI", ale sam plik rozstrzyga: „jeśli tam padło inne brzmienie, ×4 wygrywa wzorzec" — a wzorzec (pozyskiwanie) i implementacja mają małą literę. Ujednolicone na „asystent AI" w obu blokach.

**DROBNA naniesiona — id bloków (SPÓJNOŚĆ).** Zapisane wprost w handoffie razem z ostrzeżeniem `tresci` ≠ `tresc`. Zapobiega realnemu błędowi implementacji.

**DROBNA naniesiona — liczniki znaków (SPÓJNOŚĆ).** Wszystkie liczniki w tym protokole policzone programowo, konwencja: z interpunkcją końcową. Rozjazdy z wariantów autorskich („34" dla frazy 35-znakowej, „40" dla 41-znakowej) nie powielone.

**DROBNA naniesiona — miejsce strzałki (JĘZYK).** Strzałka do komponentu, ciągi bez niej. Tańsze dla EN/DE, zgodne z precedensem `f8link`, i nie wnosi znaku specjalnego do porównania strażnika.

**DROBNA naniesiona — link wejściowy różnicowany (wszystkie trzy soczewki).** Przyjęty wariant fan-outu, odnotowany jako świadome odstępstwo od przykładu z briefu, z uzasadnieniem dostępności (cztery identyczne nazwy linków są nierozróżnialne na liście linków czytnika ekranu, WCAG 2.4.4). Idzie do sankcji jako D-D10.

## Uwagi ODRZUCONE — z powodem

1. **JĘZYK: cztery H2 bez kropki.** ODRZUCONE. H2 bloku 1 jest verbatim z `filary.md` i `FunkcjePozyskiwanie.naglowek` — **z kropką**. Zdjęcie kropki tworzy czwarty wariant tej samej frazy w serwisie, żeby zyskać jednolitość, którą można mieć taniej. Ujednolicone **z kropką ×4**: to daje ten sam efekt wizualny, zeruje odejście od źródła i nie wymaga sankcji brzmienia dla bloku 1. Uwaga o niejednolitej interpunkcji (PRAWDA i SPÓJNOŚĆ podniosły ją niezależnie) jest naniesiona — odrzucony jest wyłącznie kierunek ujednolicenia proponowany przez JĘZYK.
2. **SPÓJNOŚĆ: H2 bloku treści zastąpić cytatem „Post składasz z szablonu w Studiu."** ODRZUCONE z trzech powodów. (a) To zdanie o mechanizmie, a brief I3 żąda **nazwy zadania dnia**. (b) Dubluje pierwszy człon wprowadzenia tego samego bloku („Post układasz z gotowego szablonu"). (c) Czyni Studio podmiotem okolicznika w zdaniu dokonanym, czego wariant kierunku ze zlecenia zakazuje. Problem, który SPÓJNOŚĆ podniosła — nowe brzmienie bez punktu sankcji — jest realny i naniesiony **inną drogą**: trzy nowe H2 idą do właściciela jako D-D7, analogicznie do D-D4 dla ścieżek `/dla-kogo`. To trasa, którą SPÓJNOŚĆ sama wskazała jako alternatywę.
3. **PRAWDA: usunąć z wprowadzenia treści człon „dajesz mu datę w kalendarzu".** ODRZUCONE na rzecz mocniejszej naprawy SPÓJNOŚCI. Usunięcie kasuje trasę do realnego modułu (Kalendarz publikacji) i leczy objaw; dopisanie granicy „publikujesz sama" leczy przyczynę i jest verbatim z podstrony. Diagnoza obu soczewek identyczna, różnią się tylko lekiem.
4. **JĘZYK: „a program Pierwsze 90 Dni daje jej misje i fazy".** ODRZUCONE na rzecz propozycji PRAWDY. Wariant JĘZYKA naprawia czasownik, ale zostawia **program jako podmiot gramatyczny** drugiego członu — a sedno uwagi BLOKUJĄCEJ jest sprawczość, nie leksyka. Tabela w. 112 zaczyna się od „Prowadzisz" i to zdanie jest wzorcem. Z uwagi JĘZYKA wzięte natomiast dwie rzeczy: usunięcie rzeczownikowej abstrakcji „Start nowej osoby" i przywrócenie „kreator prowadzi" wyłącznie tam, gdzie jest sankcjonowane (`filary.md` konkret 1).
5. **JĘZYK: pasmo H2 ok. 34–45 zn.** ODRZUCONE jako reguła. Finalne długości: 34 / 51 / 48 / 32. Bloku 1 skrócić nie wolno (verbatim), bloku 2 nie da się bez utraty pokrycia frazy sankcjonowanej w `filary.md`. Pasmo było propozycją soczewki, nie wymogiem briefu; rozstrzygnięciem różnicy długości jest układ (HF), nie ucięcie treści.
6. **SPÓJNOŚĆ (implicite) i autor ramy: możliwość rozstrzygnięcia wiersza planu na samym indeksie.** ODRZUCONE. Każda korekta wyłącznie na `/funkcje` daje rozjazd indeks ↔ cztery podstrony, czyli stan gorszy niż dziedziczona niejasność. Idzie do właściciela jako jedna decyzja na pięć stron (D-D6).

---

# (d) RYZYKA

1. **D-D6 zmienia liczbę pozycji na dwóch z czterech list.** Jeśli właściciel wykluczy sekcje kierunku, bloki 1 i 2 tracą po jednej pozycji (33 → 31) i treść pozostałych elementów się nie zmienia. Jeśli utrzyma — pozostaje odziedziczona niejasność wiersza planu. **Warunek zawalenia:** implementacja startuje przed D-D6; wtedy `content/{pl,en,de}/funkcje.md` i trzy przestrzenie messages trzeba poprawić w sześciu plikach naraz po fakcie.
2. **Wiersz „Wszystko powyżej działa od planu Starter." stoi nad pozycją, która nie działa** (asystent AI — klucz Anthropic pusty, rejestr poz. 5, tabela: „Język kierunku"). Indeks tego problemu nie tworzy — powiela konstrukcję sankcjonowaną na `/funkcje/pozyskiwanie` i `/funkcje/tresci`, gdzie `SekcjaKierunku` stoi bezpośrednio nad `PlanJednymWierszem`. **Warunek zawalenia:** adwersarz etapu uzna agregację czterech filarów za jakościowo inną od pojedynczej podstrony i zażąda korekty; wtedy korekta obejmuje pięć stron ×3 języki, nie sam indeks.
3. **Trzy nowe brzmienia H2 nie mają dziś punktu sankcji.** Brief przewiduje D-D4 wyłącznie dla nagłówków ścieżek `/dla-kogo`; dla H2 indeksu odpowiednika nie ma. Bez D-D7 trzy z czterech nagłówków wchodzą na stronę bez decyzji właściciela, a strażnik znak w znak nie ma z czym porównywać poza samym `content/pl/funkcje.md`. **Warunek zawalenia:** akcept właściciela pomija D-D7 i sankcja zostaje domniemana.
4. **Kotwica zarezerwowana pozostaje niewykorzystana.** Zdjąłem „Wieczorem widzisz, co z tego wyszło." z bloku 4, bo `rytm-dnia.md` rezerwuje ją decyzją właściciela z 2026-08-09. Jeśli właściciel uzna (D-D8), że drugie użycie jest w porządku, blok 4 dostaje mocniejsze H2 kosztem osłabienia najbardziej wyeksponowanego zdania serwisu. **To jest wybór właściciela, nie panelu** — dlatego wariant zapasowy jest gotowy, a nie wprowadzony.
5. **Siedem etykiet bloku 1 i dwie bloku 2 to nazwy opisowe bez pozycji w słowniku** (rejestr poz. 18 i 24, otwarte do odpowiedzi na Z7). Indeks dziedziczy to ryzyko po podstronach. Jeśli D-D12 pójdzie wariantem (b) — duplikat ciągów w `FunkcjeIndeks` — po Z7 te same łańcuchy istnieją w dwóch miejscach ×3 języki i rozjazd staje się możliwy tam, gdzie dziś jest niemożliwy. **Warunek zawalenia:** duplikacja + poprawka Z7 wykonana tylko na podstronach.
6. **Kontrakt zlecenia nazywa `#studio` sekcją kierunku, a tabela obietnic w. 72 i `content/pl/funkcje-tresci.md` moduł 1 opisują Studio w trybie dokonanym (OBOWIĄZUJE, D-C1…D-C5).** W treści finalnej Studio występuje wyłącznie jako gołe wyrażenie rzeczownikowe, więc żaden tryb nie jest orzekany i indeks jest bezpieczny pod obiema wykładniami. Ale jeśli wykładnia zlecenia jest prawdziwa, **niezgodna jest podstrona, nie indeks** — to sygnał do sprawdzenia poza tym etapem.
7. **Blok 3 nie wspomina Osiągnięć ani Akademii we wprowadzeniu.** Świadome: wprowadzenie ma pokryte cztery moduły z sześciu, pozostałe dwa niesie lista. Ryzyko czytelnicze — nie widać wymiaru „co trzyma zespół po starcie". Rozszerzenie zdania 2 o człon „a jej ścieżka w Akademii pilnuje się sama" (moduł 6 verbatim) jest pokryte i gotowe, ale podnosi blok do 224 zn, czyli przywraca problem masy, który panel kazał usunąć.
8. **Bramka kotwic nie ma jeszcze dowodu mutacji.** 33 kotwice sprawdziłem odczytem kodu, ale odczyt nie jest testem. Do czasu czerwieni na podmienionej kotwicy bramka ma status niesprawdzonej, a niesprawdzona liczy się jak niedziałająca (ADR-018).
9. **Parytet ×3.** `content/{en,de}/funkcje.md` nie istnieją; bramka parytetu porównuje drzewa i plik bez rodzeństwa daje czerwień. Ten protokół dostarcza wyłącznie PL — commit treści nie może wyjść przed adaptacjami EN/DE.
10. **Rama nie zawiera ani jednej liczby**, więc `facts.json` nie jest jej potrzebny. Gdyby implementacja albo HF zechciały dodać do indeksu liczbę modułów lub bloków, wymaga to wpisu w `content/facts.json` — literał w JSX nie przejdzie lintera.

---

# CZĘŚĆ B — `/dla-kogo` (trzy ścieżki rozpoznania)

*Protokół syntezy, verbatim co do treści. Numery decyzji przesunięte
o siedem wobec oryginału (mapa w nagłówku) — poza D-D1…D-D5 z briefu.*

# Panel treści /dla-kogo — synteza po panelu

**Data: 2026-08-13 · Status: PO PANELU — do DECYZJI WŁAŚCICIELA (D-D13…D-D21)**

Etap D Fazy 4, strona B (`/dla-kogo`, STRATEGIA pkt 33, brief S1–S5).
Fan-out: 3 ścieżki + rama (4 autorów). Panel: 3 soczewki, wszystkie
POPRAWKI. Prawo 2 utrzymane — synteza składa i rozstrzyga, nie dopisuje.
Ani jedno zdanie treści finalnej nie wprowadza obietnicy, której nie ma
w `content/tabela-obietnic.md` albo w treści podstrony filarowej.

Weryfikacja wykonana przy syntezie (nie deklaracja — wykonanie):
- 13 celów linkowych sprawdzonych znak w znak wobec tablic `MODULY`
  w `src/app/[locale]/funkcje/{pozyskiwanie,tresci,zespol,wyniki}/page.tsx`
  (linie 34–45 per plik). Zero rozjazdów.
- Agregat fraz milczenia (FRAZY_WSPOLNE + `frazyMilczenia` ×3 podstrony
  z `e2e/funkcje-podstrony.spec.ts:32–199` + rejestr poz. 12 + lista
  zlecenia) przepuszczony po lowercase przez pełną treść finalną:
  **zero trafień**. Słowo „rozliczenia" nie pada, filar 5 nieobecny,
  nazwa „Puls zespołu" nie pada ani razu.
- Cyfry w treści: `30` (facts.json → `przypomnienie-kalendarza-minuty`)
  i `90` wyłącznie jako część nazwy programu „Pierwsze 90 Dni"
  (słownik w. 16; precedens implementacyjny `/funkcje/zespol`).
  Wykrzykniki: 0.

---

# (b) TREŚĆ FINALNA PL

Do przeniesienia do `content/pl/dla-kogo.md` (+ rodzeństwo `en`/`de`
przez osobne panele adaptacji — parytet drzew 14 pozycji).
Przestrzeń messages: **`DlaKogo`** (nowa, strażnik znak w znak
messages ↔ content wzorcem K12).

## RAMA

### `DlaKogo.naglowek` — H1 (S2)

> Pracujesz sama, budujesz zespół albo prowadzisz strukturę.

*(58 zn)*

### `DlaKogo.zdanie` — zdanie pod H1 (S2)

> Przy każdej z tych dróg co innego jest trudne, co innego robi Catherly i gdzie indziej się zatrzymuje.

*(102 zn)*

### `DlaKogo.spisEtykieta` — etykieta spisu treści (S3)

> Na tej stronie

*(14 zn — stała serwisu z D-C4; potwierdzenie zakresu: D-D20)*

**Pozycje spisu treści:** cytat H2 trzech ścieżek verbatim, w kolejności
sekcji. Zero nowego brzmienia — spis nie jest czwartą wersją nagłówka.

### Kotwice sekcji (kontrakt — D-D14)

| Sekcja | id |
|---|---|
| Ścieżka 1 | `pracujesz-sama` |
| Ścieżka 2 | `budujesz-zespol` |
| Ścieżka 3 | `prowadzisz-strukture` |

### `DlaKogo.cta` / `DlaKogo.ctaZdanie` — zamknięcie (S5)

> **CTA:** Sprawdź, jak działa → `/login` *(19 zn — stała serwisu, ADR-023)*
> **Zdanie:** Rezygnujesz w każdej chwili. *(28 zn — stała serwisu)*

Bez zdania prowadzącego przed CTA (precedens zamknięcia, pkt 25).
Bez „bez podawania powodu" (rejestr warunków powrotu poz. 14).

---

## ŚCIEŻKA 1 — `#pracujesz-sama`

### `DlaKogo.s1_h2` — H2 (D-D4)

> Wszystko trzymasz jeszcze w głowie i w wiadomościach.

*(53 zn)*

### `DlaKogo.s1_boli` — CO BOLI

> Rano decydujesz od nowa, od czego zacząć: notatki są w telefonie, ustalenia w wiadomościach, terminy w kilku miejscach naraz. Wieczorem nie masz pewności, czy o kimś ważnym nie zapomniałaś.

### `DlaKogo.s1_robi_1` — CO CATHERLY Z TYM ROBI, akapit 1

> Kolejność rozmów układasz w **Dziennym Planie Działania** — dzień zaczynasz od konkretu, nie od zastanawiania się. Terminy rozmów wpisujesz do **kalendarza z przypomnieniami** — 30 minut przed każdą rozmową Catherly przypomina ci o niej.

| Etykieta linku (klucz) | Cel |
|---|---|
| `s1_link_dmo` — „Dziennym Planie Działania" | `/funkcje/pozyskiwanie#dmo` |
| `s1_link_kalendarz` — „kalendarza z przypomnieniami" | `/funkcje/pozyskiwanie#kalendarz` |

*„30 minut" — WYŁĄCZNIE komponentem liczby z `content/facts.json`
(`przypomnienie-kalendarza-minuty`); literał w JSX nie przejdzie lintera.
Precedens implementacyjny: `pozyskiwanie/page.tsx`, `MINUTY_PRZYPOMNIENIA`.*

### `DlaKogo.s1_robi_2` — akapit 2

> Gdy ktoś pyta cię o współpracę, przekazujesz link do swojego **formularza zgłoszeniowego** — wypełnione zgłoszenie trafia prosto do twojej bazy kontaktów. Trudną rozmowę przechodzisz najpierw na sucho w **Sali Treningowej**.

| Etykieta linku (klucz) | Cel |
|---|---|
| `s1_link_formularz` — „formularza zgłoszeniowego" | `/funkcje/pozyskiwanie#formularz` |
| `s1_link_sala` — „Sali Treningowej" | `/funkcje/pozyskiwanie#sala-treningowa` |

### `DlaKogo.s1_robi_3` — akapit 3

> Post zaczynasz od **gotowego szablonu**, nie od pustej strony. **Tarcza** zaznacza ryzykowne sformułowania, zanim go opublikujesz.

| Etykieta linku (klucz) | Cel |
|---|---|
| `s1_link_szablony` — „gotowego szablonu" | `/funkcje/tresci#szablony` |
| `s1_link_tarcza` — „Tarcza" | `/funkcje/tresci#tarcza` |

### `DlaKogo.s1_plan` — OD KTÓREGO PLANU

> Wszystko powyżej działa od planu Starter.
> **Link:** Zobacz cennik → `/cennik`

### `DlaKogo.s1_granica` — CZEGO TA ŚCIEŻKA NIE ZAŁATWIA (D-D3a)

> Catherly nie znajdzie za ciebie kontaktów ani nie poprowadzi rozmów — ludzi do formularza kierujesz sama, porządek dnia dostajesz.

*(130 zn. Pokrycie negatywami: moduł 7 pozyskiwania („DMO niczego nie
wysyła za ciebie"), moduł 6 („Catherly niczego nie wysyła do twoich
znajomych"), moduł 9 („prawdziwą rozmowę prowadzisz ty").)*

---

## ŚCIEŻKA 2 — `#budujesz-zespol`

### `DlaKogo.s2_h2` — H2 (D-D4)

> Masz zespół. Pytanie, komu dziś pomóc, a komu nie przeszkadzać.

*(63 zn)*

### `DlaKogo.s2_boli` — CO BOLI

> Każda osoba w twoim zespole jest w innym miejscu: jedna dopiero się wdraża, inna wyhamowała po dobrym starcie. Nie masz tego w jednym widoku, więc dowiadujesz się w rozmowie — zwykle później, niż chciałaś.

### `DlaKogo.s2_robi_1` — CO CATHERLY Z TYM ROBI, akapit 1

> **Pulpit** pokazuje aktualny stan: sprzedaż, aktywne kontakty, aktywność zespołu — wszystko w jednym miejscu. Nową osobę wdrażasz przez **kreator wdrożeniowy**: profil, cele, materiały, zaproszenie.

| Etykieta linku (klucz) | Cel |
|---|---|
| `s2_link_pulpit` — „Pulpit" | `/funkcje/wyniki#pulpit` |
| `s2_link_kreator` — „kreator wdrożeniowy" | `/funkcje/zespol#kreator-wdrozeniowy` |

### `DlaKogo.s2_robi_2` — akapit 2

> Potem prowadzisz ją przez **Pierwsze 90 Dni**: misje mówią jej, co teraz, a cztery fazy pokazują, dokąd zmierza. **Osiągnięcia** zbiera twój zespół według gotowych reguł: odznaki za kolejne kroki, a przy powrocie po przerwie serię chroni żeton łaski.

| Etykieta linku (klucz) | Cel |
|---|---|
| `s2_link_p90d` — „Pierwsze 90 Dni" | `/funkcje/zespol#pierwsze-90-dni` |
| `s2_link_osiagniecia` — „Osiągnięcia" | `/funkcje/zespol#osiagniecia` |

### `DlaKogo.s2_plan_1` / `s2_plan_2` — OD KTÓREGO PLANU

> Wszystko powyżej działa od planu Starter. W planie Growth widzisz sygnały ryzyka odejścia i dostajesz gotowe zdanie otwierające rozmowę.
> **Link:** Zobacz cennik → `/cennik`

*(Zdanie Growth verbatim z tabeli obietnic w. 121 i F8
`content/pl/funkcje-wyniki.md` w. 21 — celowo BEZ nazwy „Puls zespołu",
pełna forma „W planie Growth…" zgodnie z rejestrem poz. 11.)*

### `DlaKogo.s2_granica` — CZEGO TA ŚCIEŻKA NIE ZAŁATWIA (D-D3a)

> Catherly nie oceni za ciebie, kto wyhamował — widzisz tylko to, co ty i twój zespół zapisujecie w aplikacji, a rozmowę prowadzisz ty.

*(133 zn. Pokrycie: moduł 1 `/funkcje/wyniki` („Pulpit nie pokazuje
danych spoza Catherly — widzisz to, co ty i twój zespół zapisujecie
w aplikacji"), moduł 3 `/funkcje/zespol` („rozmowy prowadzisz ty").)*

---

## ŚCIEŻKA 3 — `#prowadzisz-strukture`

### `DlaKogo.s3_h2` — H2 (D-D4)

> Struktura urosła, a decyzje wciąż przechodzą przez ciebie.

*(58 zn)*

### `DlaKogo.s3_boli` — CO BOLI

> Pytania nowych osób, treści czekające na twoje zdanie, wątpliwość, co wolno napisać na którym rynku — każda z tych rzeczy czeka na ciebie. Godzin w tygodniu nie przybywa.

### `DlaKogo.s3_robi_1` — CO CATHERLY Z TYM ROBI, akapit 1

> **Treści zespołu zatwierdzasz** u siebie: akceptujesz albo odrzucasz, a zmianę statusu od razu widzi cała struktura. **Paszport zgodności** sprawdza twój komunikat pod kątem wymogów czterech jurysdykcji, zanim go wyślesz — różnic między rynkami nie musisz pamiętać.

| Etykieta linku (klucz) | Cel |
|---|---|
| `s3_link_zatwierdzanie` — „Treści zespołu zatwierdzasz" | `/funkcje/zespol#zatwierdzanie-zespolu` |
| `s3_link_paszport` — „Paszport zgodności" (pierwsze wystąpienie) | `/funkcje/zespol#paszport-zgodnosci` |

### `DlaKogo.s3_robi_2` — akapit 2

> **Akademia** odblokowuje kolejny moduł dopiero po ukończeniu poprzedniego — nowa osoba nie pyta cię, od czego zacząć, a treści szkoleniowe dodaje administrator.

| Etykieta linku (klucz) | Cel |
|---|---|
| `s3_link_akademia` — „Akademia" | `/funkcje/zespol#akademia` |

### `DlaKogo.s3_plan_1` / `s3_plan_2` / `s3_plan_3` — OD KTÓREGO PLANU

> Wszystko powyżej działa od planu Starter. W planie Growth masz widok całego drzewa struktury. Czysty eksport — twoje materiały bez sygnatury polecającej — jest w planie Pro.
> **Link:** Zobacz cennik → `/cennik`

*(Zdanie Growth verbatim z tabeli w. 122; zdanie Pro verbatim
z tabeli w. 233 i karty Pro `content/pl/cennik.md` w. 60. Zero liczb.)*

### `DlaKogo.s3_granica` — CZEGO TA ŚCIEŻKA NIE ZAŁATWIA (D-D3a)

> Paszport zgodności nie daje prawnej gwarancji ani porady — sprawdza komunikat według reguł, a zatwierdzenia i rozmowy z ludźmi zostają po twojej stronie.

*(153 zn. Pokrycie: moduł 5 `/funkcje/zespol` verbatim („Paszport
zgodności nie daje prawnej gwarancji ani porady — skaner sprawdza
komunikat według reguł"), moduł 2 i 3 (zatwierdzenia i rozmowy zostają
po jej stronie).)*

---

## Kontrakt linków — komplet 13 celów (zweryfikowany w kodzie)

| # | Ścieżka | Etykieta | Cel |
|---|---|---|---|
| 1 | 1 | Dziennym Planie Działania | `/funkcje/pozyskiwanie#dmo` |
| 2 | 1 | kalendarza z przypomnieniami | `/funkcje/pozyskiwanie#kalendarz` |
| 3 | 1 | formularza zgłoszeniowego | `/funkcje/pozyskiwanie#formularz` |
| 4 | 1 | Sali Treningowej | `/funkcje/pozyskiwanie#sala-treningowa` |
| 5 | 1 | gotowego szablonu | `/funkcje/tresci#szablony` |
| 6 | 1 | Tarcza | `/funkcje/tresci#tarcza` |
| 7 | 2 | Pulpit | `/funkcje/wyniki#pulpit` |
| 8 | 2 | kreator wdrożeniowy | `/funkcje/zespol#kreator-wdrozeniowy` |
| 9 | 2 | Pierwsze 90 Dni | `/funkcje/zespol#pierwsze-90-dni` |
| 10 | 2 | Osiągnięcia | `/funkcje/zespol#osiagniecia` |
| 11 | 3 | Treści zespołu zatwierdzasz | `/funkcje/zespol#zatwierdzanie-zespolu` |
| 12 | 3 | Paszport zgodności | `/funkcje/zespol#paszport-zgodnosci` |
| 13 | 3 | Akademia | `/funkcje/zespol#akademia` |

Plus 3 × `Zobacz cennik → /cennik` (w wierszu planu każdej ścieżki —
NIE w tablicy linków sekcji) oraz `Sprawdź, jak działa → /login`.

**Reguła kontraktowa (nowa, do handoffu):** etykieta linku MUSI być
dokładnym podciągiem akapitu CO ROBI tej samej ścieżki (odmiana
dozwolona — link zawija się w zdanie). Wszystkie 13 pozycji powyżej
spełniają regułę. Do zestawu testów `/dla-kogo` wchodzi asercja:
dla każdej pozycji `linki` etykieta występuje w tekście akapitu.

---

# (c) ŚLAD PANELU

## Werdykty soczewek

| Soczewka | Werdykt | Uwagi WAŻNE | Uwagi DROBNE |
|---|---|---|---|
| PRAWDA OBIETNICY | POPRAWKI | 5 | 4 |
| SPÓJNOŚĆ SZWU I MILCZENIE | POPRAWKI | 7 | 4 |
| JĘZYK, RYTM I NIEPOWTARZALNOŚĆ | POPRAWKI | 11 | 4 |

Uwag BLOKUJĄCYCH nie zgłoszono. Wszystkie uwagi WAŻNE naniesione albo
rozstrzygnięte z uzasadnieniem poniżej.

## Rozstrzygnięcia sprzeczności między soczewkami

**R1. Kto bierze zatwierdzanie treści zespołu — ścieżka 2 czy 3?**
PRAWDA daje je ścieżce 2, JĘZYK ścieżce 3. Rozstrzygam na rzecz
ścieżki 3. STRATEGIA pkt 33 przypisuje ścieżce 2 *widoczność*, a ścieżce
3 *skalę i delegowanie*. Zatwierdzanie to decyzja przechodząca przez nią
— materiał delegowania, nie widoczności. Argument PRAWDY („ból ścieżki 2
to jeden widok i wdrożenie") sam wyklucza zatwierdzanie z tej ścieżki.

**R2. Perspektywa Pierwszych 90 Dni w ścieżce 1.**
Wszystkie trzy soczewki zgłosiły ten sam problem; PRAWDA proponowała
zostawić zdanie i wystawić właścicielowi, SZEW i JĘZYK — wyciąć albo
naprawić szew. **Wycinam zdanie w całości ze ścieżki 1.** Powody:
(1) zwrot perspektywy (czytelniczka jako uczestniczka, nie liderka) ma
pokrycie w „Rozstrzygnięciach towarzyszących" tabeli, ale NIE ma wiersza
obietnicy — to nowe sformułowanie obietnicy, a synteza nie dopisuje;
(2) rejestr poz. 23 trzyma widok w Pierwszych 90 Dniach jako otwarty do
odpowiedzi na Z7 — nowe ujęcie tej samej funkcji nie może wejść milczącą
decyzją; (3) argument szwu jest rozstrzygający: kliknięcie w „jesteś w"
prowadzi do modułu 3, który mówi „Prowadzisz ją przez…" — czytelniczka
ląduje w tekście zaprzeczającym zapowiedzi. To dokładnie klasa błędu
opisana w słowniku nazw jako „obietnica, której użytkowniczka nie
odnajdzie". Zdanie może wrócić po D-D13. Program pozostaje na stronie
w ścieżce 2, w głosie liderki, verbatim za tabelą w. 112 i modułem 3.

**R3. Ból ścieżki 2 („wyhamowała po dobrym starcie").**
SZEW chciał wyciąć ból, PRAWDA — domknąć go granicą rozdzielającą widok
od oceny. Przyjmuję wariant PRAWDY. Po rozdzieleniu zdań Growth (R4)
ścieżka 2 niesie zdanie „W planie Growth widzisz sygnały ryzyka
odejścia…" w swoim wierszu planu, więc ból jest odpowiedziany jawnie,
w slocie, który brief (S4 pkt 4) na to przewiduje — a granica mówi
wprost, czego Starter nie robi. Cięcie bólu odebrałoby ścieżce jedyne
zdanie, w którym czytelniczka się rozpoznaje.

**R4. Liczebniki słowne — jedna reguła na całą stronę.**
PRAWDA i SZEW: wolno cytować jako cechę funkcji; JĘZYK: nie powtarzać.
Rozstrzygam za PRAWDĄ i SZWEM, bo precedens jest jawny i zapisany:
`content/pl/filary.md` w. 67–68 („nazwa programu i jego cecha z tabeli
obietnic, nie liczby marketingowe — poza zakresem lintera").
**Reguła /dla-kogo:** liczebnik słowny wolno użyć wyłącznie wtedy, gdy
jest cechą funkcji zapisaną w tabeli obietnic. Stąd „cztery fazy"
(tabela w. 112) i „czterech jurysdykcji" (tabela w. 114) — obie
zachowane. Zarzut JĘZYKA o dwóch regułach na jednej stronie znika sam:
ścieżka 1 nie mówi już o Pierwszych 90 Dniach (R2), więc rozjazdu nie ma.

**R5. H2 ścieżki 2 — długość vs treść.**
SZEW chciał skrócić do „Zespół już masz — nie wiesz, komu dziś pomóc."
(47 zn); JĘZYK odrzucił „nie wiesz" jako orzekanie o czytelniczce
(precedens pkt 25). Sprzeczność rozstrzygam kompromisem, który spełnia
oba warunki: rozbicie na dwa zdania — „Masz zespół. Pytanie, komu dziś
pomóc, a komu nie przeszkadzać." (63 zn). Znika orzeczenie o jej
niewiedzy, zostaje najlepsza myśl materiału, a rozpiętość pasma H2
spada z 47–76 na 53–63 zn. Konstrukcja wielozdaniowa ma precedens
w H2 filaru 2 („Piszesz. Tarcza sprawdza. Pieczęć potwierdza.", 45 zn).

**R6. H1 ramy a karty /cennik.**
SZEW ostrzegł, że H1 jest echem trzech kart cennika i tworzy drugie
źródło prawdy dla pytania „którego planu potrzebuję", i rekomendował
wariant (a) — H1 nie może być echem kart. **Częściowo przyjmuję.**
Odrzucam wniosek, że H1 nie może nazwać trzech sytuacji: nazwanie ich
jest zadaniem tej strony (STRATEGIA pkt 33), a kolizja dotyczy wiązania
segmentu z PLANEM, nie nazwania sytuacji — i /dla-kogo nigdzie planu do
segmentu nie wiąże. Przyjmuję natomiast zmianę pierwszego członu:
„Dopiero zaczynasz" (klasyfikacja po stażu, ryzyko 1 autorki ramy)
→ „Pracujesz sama" (opis sposobu pracy). Zmiana zamyka trzy uwagi naraz:
kobieta pracująca sama od lat rozpoznaje się w członie pierwszym; znika
potrójne powtórzenie „start" (H1 → spis → H2, uwaga JĘZYKA); a po
usunięciu Pierwszych 90 Dni ze ścieżki 1 (R2) człon „Pracujesz sama"
jest ścisłym opisem jej zawartości — obiekcja autorki ramy wobec tego
wariantu („rozjeżdża się z treścią ścieżki 1") przestała obowiązywać.
Pytanie o wiązanie segmentu z planem idzie do właściciela jako D-D18.

**R7. Zestaw slugów sekcji.**
PRAWDA: czasownikowe; SZEW: rzeczownikowe z pola `kotwica`.
Rozstrzygam za PRAWDĄ. Slug jest widoczny w adresie, który ludzie sobie
przesyłają; „startujaca / budujaca-zespol / prowadzaca-strukture" to
rzeczownikowe etykiety czytelniczki — dokładnie ta szuflada segmentowa,
którą D-D4 wyklucza z nagłówków. Formy czasownikowe są też jedynymi,
które zgadzają się z H1. Zestaw: `pracujesz-sama`, `budujesz-zespol`,
`prowadzisz-strukture` (pierwszy człon dostosowany do H1 po R6).

## Uwagi naniesione

**PRAWDA OBIETNICY**
1. WAŻNA — zastrzeżenie Paszportu w granicy ścieżki 3: naniesione,
   granica zaczyna się od „nie daje prawnej gwarancji ani porady"
   (verbatim z modułu 5). Klauzula Akademii przeniesiona do CO ROBI
   („treści szkoleniowe dodaje administrator", tabela w. 115), żeby
   granica została jednozdaniowa.
2. WAŻNA — granica ścieżki 2 rozdzielająca widok od oceny: naniesiona.
3. WAŻNA — perspektywa Pierwszych 90 Dni: rozstrzygnięta cięciem (R2),
   pytanie idzie do właściciela jako D-D13.
4. WAŻNA — pokrywające się funkcje ścieżek 2 i 3: naniesione przez
   pełną realokację (R1). Każda funkcja ma na tej stronie jeden dom.
5. WAŻNA — rozjazd slugów `budujaca-zespol` / `#budujesz-zespol`:
   naniesiony, jeden zestaw (R7), D-D14.
6. DROBNA — kolejność zdań Growth: bezprzedmiotowa po rozdzieleniu (R4
   soczewki SZEW/JĘZYK) — każda ścieżka niesie jedno zdanie Growth.
7. DROBNA — „sesji treningowych" spoza słownika: naniesiona przez
   usunięcie wyliczenia limitów Pro z wiersza planu.
8. DROBNA — liczebniki słowne: naniesiona jako jedna reguła strony (R4).
9. DROBNA — doprecyzowanie granicy ścieżki 1: naniesione
   („ludzi do formularza kierujesz sama").

**SPÓJNOŚĆ SZWU I MILCZENIE**
1. WAŻNA — etykiety ścieżki 3 nieobecne w tekście: naniesione, wszystkie
   trzy zdania przepisane tak, że etykieta jest podciągiem akapitu.
2. WAŻNA — kontrakt pola `linki`: naniesiony jako reguła twarda plus
   asercja testowa (D-D21).
3. WAŻNA — Pierwsze 90 Dni w dwóch perspektywach: naniesiona wariantem
   (a) — ścieżka 1 nie linkuje programu (R2).
4. WAŻNA — powtórzenia verbatim między ścieżkami 2 i 3: naniesione (R1).
5. WAŻNA — ból bez pokrycia od Startera: naniesiona częściowo — ścieżka
   3 traci zdanie „gdzie naprawdę jesteś potrzebna" (nic w CO ROBI go nie
   zamyka); ścieżka 2 zatrzymuje ból, ale dostaje granicę rozdzielającą
   (R3).
6. WAŻNA — rozjazd slugów: naniesiona (R7).
7. WAŻNA — kolizja segment↔plan z /cennik: naniesiona częściowo (R6),
   reszta do D-D18.
8. DROBNA — podwójny link do /cennik w ścieżce 3: naniesiona, `Zobacz
   cennik` usunięty z tablicy linków sekcji we wszystkich trzech
   ścieżkach; żyje wyłącznie w wierszu planu.
9. DROBNA — rozjazd „fazy" / „cztery fazy": bezprzedmiotowa po R2.
10. DROBNA — długości H2: naniesiona (R5), pasmo 53–63 zn.
11. DROBNA — mechanika strażnika (frazowa, nie rdzeniowa): naniesiona
    do handoffu, patrz RYZYKA poz. 7.

**JĘZYK, RYTM I NIEPOWTARZALNOŚĆ**
1. WAŻNA — recytacja między ścieżkami: naniesiona (R1).
2. WAŻNA — dublet zdań Growth: naniesiony, rozdzielone — ryzyko odejścia
   w ścieżce 2 (temat: ludzie), drzewo struktury w ścieżce 3 (temat:
   zasięg). Fraza „W planie Growth" pada dwa razy, nie cztery.
3. WAŻNA — H2 jako komplet: naniesiona, wspólna konstrukcja
   (sytuacja + jej konsekwencja), pasmo 53–63 zn.
4. WAŻNA — H2 ścieżki 2 orzeka o jej niewiedzy: naniesiona (R5).
5. WAŻNA — potrójne powtórzenie „start": naniesiona (R6) + nowy H2
   ścieżki 1 bez stażu.
6. WAŻNA — przenośnia w H2 ścieżki 3: naniesiona, wariant JĘZYKA
   przyjęty dosłownie.
7. WAŻNA — akapit ścieżki 1 na sześć zdań: naniesiona, trzy akapity po
   dwa zdania; po cięciu Pierwszych 90 Dni sześć linków zamiast siedmiu.
   Ścieżka 2 rozbita na dwa akapity po dwa zdania, ścieżka 3 na dwa.
8. WAŻNA — meta-głos zdania wiodącego: naniesiona, wariant JĘZYKA
   przyjęty (znika „przeczytasz" i zaszyta liczba „trzech").
9. WAŻNA — wiersz planu ścieżki 3 jako karta cennika: naniesiona,
   wyliczenie zniesionych limitów, klucze API i webhooki usunięte;
   zostaje jedna pozycja Pro (czysty eksport — najbliższa delegowaniu).
10. WAŻNA — rozjazd perspektyw przy linku do Pierwszych 90 Dni:
    naniesiona (R2).
11. WAŻNA — abstrakcyjne zdanie o Osiągnięciach: naniesiona, „utrzymują
    zaangażowanie" zastąpione konkretem z modułu 4 (odznaki, żeton łaski
    przy powrocie po przerwie) i klauzulą reguł z jego granicy.
12. DROBNA — tiki „w głowie" i „w jednym miejscu": naniesiona.
    „w głowie" zostaje wyłącznie w H2 ścieżki 1; ścieżka 3 mówi „różnic
    między rynkami nie musisz pamiętać". „w jednym miejscu" zostaje
    wyłącznie przy Pulpicie (verbatim z tabeli w. 144); ścieżka 3 mówi
    „zatwierdzasz u siebie". Echo „w jednym widoku" → „w jednym miejscu"
    w ścieżce 2 zachowane świadomie: ból i odpowiedź mają się domykać.
13. DROBNA — składnia celownika i „być w Pierwszych 90 Dniach":
    naniesiona („Gdy ktoś pyta cię o współpracę…"); druga część
    bezprzedmiotowa po R2.
14. DROBNA — podwójny obraz tygodnia w ścieżce 3: bezprzedmiotowa
    po zmianie H2.
15. DROBNA — „Sala Treningowa" vs „sesje treningowe": naniesiona przez
    usunięcie wyliczenia limitów Pro.

## Uwagi odrzucone (z powodem)

1. **SZEW, WAŻNA 7, wariant (a) w pełnym brzmieniu** — „H1 ramy nie może
   być echem brzmień kart /cennik, zamiast trzech stanów wchodzi wariant
   o sytuacji dnia". Odrzucona co do wniosku, przyjęta co do diagnozy.
   Nazwanie trzech sytuacji jest zadaniem tej strony (STRATEGIA pkt 33,
   brief S4); usunięcie ich z H1 zostawiłoby czytelniczkę bez punktu
   orientacji przy wejściu z nawigacji, która kliknięcia słowem nie
   potwierdza. Kolizja dotyczy wiązania segmentu z planem — a tego
   /dla-kogo nie robi w żadnym zdaniu. Zmieniony został człon pierwszy
   (R6); reszta idzie do właściciela jako D-D18.
2. **PRAWDA, DROBNA — przywrócenie kolejności zdań Growth z F8.**
   Bezprzedmiotowa: po rozdzieleniu zdań Growth między ścieżki żadna
   sekcja nie niesie dwóch, więc kolejności nie ma czego przestawiać.
   Odnotowuję, że diagnoza była trafna — wariant autorski istotnie
   deklarował verbatim, mając przestawioną kolejność.
3. **SZEW, WAŻNA 5, wariant dla ścieżki 2** — „wyciąć «wyhamowała po
   dobrym starcie»". Odrzucona na rzecz wariantu PRAWDY (R3): ból
   zostaje, granica rozdziela widok od oceny, wiersz planu mówi jawnie,
   co dokłada Growth. Cięcie odebrałoby ścieżce jedyne zdanie
   rozpoznania i zostawiło ból, którego nikt nie nazwał.
4. **PRAWDA, pytanie 6 / ryzyko autorki — Ranking (PRO) w ścieżce 3.**
   Nie wchodzi. Nie odpowiada na deklarowany ból tej ścieżki, a przy
   dużej strukturze grozi odczytaniem jako porównanie zespołów, podczas
   gdy Liga zespołu milczy (rejestr poz. 12). Pytanie o komplet karty Pro
   idzie do właściciela jako D-D17.
5. **JĘZYK, DROBNA — ujednolicenie liczebników na wariant bez liczby.**
   Odrzucona (R4): precedens `filary.md` w. 67–68 jest jawny i zapisany,
   a zdejmowanie cechy funkcji z tabeli obietnic osłabia konkret bez
   zysku. Reguła zapisana jednym zdaniem obowiązuje całą stronę i
   adaptacje.
6. **JĘZYK, WAŻNA 7, drugi wariant — „ciąć na poziomie treści, kandydat:
   szablon albo Sala Treningowa".** Odrzucona: po cięciu Pierwszych
   90 Dni (R2) ścieżka 1 ma sześć linków w trzech akapitach po dwa
   zdania — reguła zdaniowa karty tonu 4.1 jest spełniona bez dalszych
   cięć. Gęstość linków na 390 px rozstrzyga panel projektu.

---

# (d) RYZYKA

1. **„30 minut" stoi na fakcie o statusie „do weryfikacji w kodzie".**
   `facts.json` → `przypomnienie-kalendarza-minuty` niesie adnotację
   D-B3/Z7. Odpowiedź inna niż 30 zmienia zdanie tutaj I na
   `/funkcje/pozyskiwanie` jednocześnie, w trzech językach.
   Warunek zawalenia: odpowiedź okna aplikacji na Z7 inna niż 30.

2. **Pierwsze 90 Dni w głosie liderki czekają na Z7.** Rejestr poz. 23
   („Widok liderki w Pierwszych 90 Dniach — W2 odrzucony, brak dowodu")
   jest otwarty. Ścieżka 2 cytuje wiersz obietnicy w. 112 i moduł 3, więc
   stoi tak samo mocno jak podstrona — ale jeśli Z7 zmieni moduł 3, to
   zdanie musi się zmienić razem z nim, inaczej indeks przeżyje
   podstronę. Warunek: zmiana modułu 3 bez rewizji `/dla-kogo`.

3. **Trzynaście celów linkowych w trzech podstronach filarowych.**
   Zmiana dowolnego slugu modułu łamie ścieżkę po cichu, dopóki
   `scripts/check-kotwice.mjs` nie działa w CI **z dowodem mutacji**
   (brief: bramka bez dowodu ma status niesprawdzonej, a niesprawdzona
   liczy się jak niedziałająca — ADR-018). Warunek: wdrożenie bez dowodu
   mutacji na wszystkich trzech językach.

4. **Slugi sekcji `/dla-kogo` to nowy kontrakt publiczny.** `#pracujesz-sama`,
   `#budujesz-zespol`, `#prowadzisz-strukture` wejdą do SpisTresci, do
   bramki kotwic i do linków z kampanii oraz `/pomoc` (Etap E). Po
   premierze zmiana łamie linki przychodzące bez czerwieni. Warunek:
   rozstrzygnięcie D-D14 po implementacji zamiast przed.

5. **Reguła „etykieta = podciąg akapitu" nie ma dziś bramki.** Bramka
   kotwic sprawdza cel, nie etykietę. Bez asercji z D-D21 implementacja
   może doczepić link poza zdaniem albo po cichu przepisać treść —
   klasa błędu, którą wyłapie dopiero adwersarz.

6. **Ścieżka 3 ma tylko trzy funkcje DZIAŁA.** Jej odrębność częściowo
   niosą bramki planów (Growth + Pro). Jeśli właściciel dołoży Ranking
   i klucze API (D-D17), wiersz planu znów urośnie ponad sekcję i
   ścieżka zacznie czytać się jak karta cennika. Warunek: D-D17
   rozstrzygnięte na „komplet karty Pro".

7. **Strażnik milczenia `/dla-kogo` musi dopasowywać frazy, nie rdzenie.**
   Treść legalnie zawiera „strukturę", „Struktura urosła", „cała
   struktura" i sankcjonowane „widok całego drzewa struktury". Na liście
   fraz są wyłącznie „raporty struktury" i „raporty sponsora".
   Dopasowanie po rdzeniu (`/struktur/i`) wywróci poprawną treść na
   czerwono i sprowokuje „naprawę" dobrego tekstu. Mechanikę dziedziczyć
   z `e2e/funkcje-podstrony.spec.ts:353–355` (`not.toContain` po
   lowercase, pełne frazy).

8. **Zdanie wiodące ramy jest twardo związane z D-D3 wariant (a).**
   Zapowiada granicę w każdej sekcji („gdzie indziej się zatrzymuje").
   Wybór wariantu (b) wywraca ramę, nie tylko trzy granice.

9. **Rozdzielenie zdań Growth ma cenę.** Czytelniczka ścieżki 3 nie
   zobaczy na tej stronie zdania o sygnałach ryzyka odejścia, a
   czytelniczka ścieżki 2 — o drzewie struktury. Obie znajdą komplet na
   `/cennik`, do którego prowadzi wiersz planu każdej ścieżki. Decyzja
   świadoma (dublet verbatim ×2 był gorszy), ale gdyby właściciel uznał
   komplet bramek za obowiązkowy w każdej sekcji, wracamy do czterech
   zdań „W planie Growth" na jednej stronie.

10. **Liczebniki słowne przy adaptacjach EN/DE.** „cztery fazy" i
    „czterech jurysdykcji" przechodzą do EN/DE jako cecha funkcji.
    Jeśli `bramka:liczby` kiedykolwiek obejmie liczebniki słowne, trzeba
    przepisać dwa zdania w trzech językach naraz.

11. **Metafora „gdzie indziej się zatrzymuje" jest najsłabszym punktem
    pod adaptacje** (kryterium 5 karty tonu). Panele językowe dostają
    jawną alternatywę dosłowną („what it does not cover" / „was sie
    nicht abdeckt") z zastrzeżeniem, że zapowiedź przez zaprzeczenie
    obniża temperaturę wejścia.

12. **Nawigacja nie potwierdza kliknięcia słowem.** Ani H1, ani zdanie
    wiodące nie powtarzają etykiety „Dla kogo". Jedynym potwierdzeniem
    jest `aria-current="page"` (S1) i musi być widoczne nad zwijką na
    390 px — inaczej rośnie ryzyko odbicia „to nie ta strona".

13. **Parytet ×3 od pierwszego commita treści.** `content/{pl,en,de}/dla-kogo.md`
    — plik bez rodzeństwa daje czerwień bramki parytetu; drzewa 12 → 14
    pozycji łącznie z `/funkcje`.

---

# ZAŁĄCZNIK — pełne brzmienia decyzji D-D6…D-D21

*Pytania i rekomendacje w brzmieniu syntez. Rekomendacja panelu nie jest
decyzją — decyzję podejmuje właściciel.*

## Decyzje strony `/funkcje` (D-D6…D-D12)

### D-D6

**Pytanie.** Czy dwie sekcje kierunku #asystent-ai (/funkcje/pozyskiwanie i /funkcje/tresci) wchodzą na listy indeksu — i jeśli tak, czy wiersz „Wszystko powyżej działa od planu Starter." zostaje verbatim, mimo że stoi nad pozycją opisaną językiem kierunku? Pytania są sprzężone i muszą być rozstrzygane razem.

**Rekomendacja panelu.** WCHODZĄ, wiersz planu ZOSTAJE verbatim. Brief liczy wprost „31 pozycji + 2 sekcje kierunku", obie kotwice istnieją w kodzie i są objęte kontraktem strażnika, a etykieta „asystent AI" to gołe wyrażenie rzeczownikowe bez czasownika — nie orzeka trybu dokonanego i nie podnosi poziomu obietnicy. Nazwa ma pokrycie w tabeli obietnic (w. 51 i 86, sekcje „Język kierunku"). Niejednoznaczność słowa „działa" nad sekcją kierunku indeks DZIEDZICZY po /funkcje/pozyskiwanie i /funkcje/tresci, gdzie ta sama konstrukcja jest już sankcjonowana (D-B2) — nie tworzy jej. Jeśli właściciel chce ją usunąć, korekta musi objąć PIĘĆ stron jedną decyzją; korekta wyłącznie na indeksie daje rozjazd indeks ↔ podstrony, czyli stan gorszy od dziedziczonej niejasności.

### D-D7

**Pytanie.** Czy trzy nowe brzmienia H2 bloków indeksu dostają sankcję analogiczną do D-D4 (który obejmuje wyłącznie nagłówki ścieżek /dla-kogo)? Chodzi o: „Siadasz do postów i nie zaczynasz od pustej kartki." (treści), „Nowa osoba dołącza, a ty nie tłumaczysz od nowa." (zespół), „Wieczorem wiesz, na czym stoisz." (wyniki).

**Rekomendacja panelu.** TAK, sankcjonować wszystkie trzy i dopisać je do content/pl/funkcje.md jako nowe ciągi. Żadne nie wprowadza obietnicy spoza pokrycia: „nie zaczynasz od pustej kartki" jest verbatim z filary.md (Filar 2, konkret 1), „nie tłumaczysz od nowa" z zdania korzyści /funkcje/zespol, „wiesz, na czym stoisz" z modułu 1 /funkcje/wyniki. Wszystkie trzy są rekombinacją materiału OBOWIĄZUJĄCEGO, nie nową obietnicą — ale bez sankcji trzy z czterech nagłówków indeksu nie mają źródła w treści OBOWIĄZUJĄCEJ, a dla bloku zespół cytatu o momencie dnia nie ma dziś nigdzie w repo.

### D-D8

**Pytanie.** Czy fraza „Wieczorem widzisz, co z tego wyszło." — opisana w rytm-dnia.md jako kotwica ZAREZERWOWANA (decyzja właściciela 2026-08-09: ostatnie zdanie kroku wieczornego, dosłownie, na tle akcentowym) — może wystąpić drugi raz w serwisie, jako H2 bloku wyniki na /funkcje?

**Rekomendacja panelu.** NIE — i dlatego blok 4 dostał własne, pokryte H2 („Wieczorem wiesz, na czym stoisz.", moduł 1 podstrony verbatim). Rezerwacja jest decyzją właściciela w dokumencie OBOWIĄZUJĄCYM, a panel nie wydaje zarezerwowanego aktywu bez pytania. Drugie użycie nie łamie żadnej obietnicy, ale osłabia najmocniej wyeksponowane zdanie serwisu. Jeśli właściciel zdecyduje inaczej, podmiana jest bezkosztowa: zmienia się jeden ciąg, reszta bloku zostaje bez zmian.

### D-D9

**Pytanie.** Czy „Rano widzisz, do kogo się odezwać." ma paść po raz TRZECI (filary.md na stronie głównej → H1 /funkcje/pozyskiwanie → H2 bloku 1 indeksu)?

**Rekomendacja panelu.** TAK. To H2 samego filaru i H1 podstrony docelowej — kręgosłup, nie pożyczka z cudzej sekcji. Powtórzenie jest ceną braku podniesienia obietnicy: każde przeredagowanie tworzy czwarty wariant tej samej obietnicy, który trzeba dopisać do treści źródłowych i osobno sankcjonować. Czytelniczka widzi to zdanie w dwóch kliknięciach — warto potwierdzić świadomie, a nie odziedziczyć.

### D-D10

**Pytanie.** Etykieta linku wejściowego: verbatim z briefu („Zobacz wszystko →") czy cztery różnicowane („Zobacz wszystko o pozyskiwaniu / o treściach / o zespole / o wynikach")? Oraz: czy strzałka „→" siedzi w ciągu treści, czy dokłada ją komponent?

**Rekomendacja panelu.** RÓŻNICOWANE, strzałka w KOMPONENCIE. Cztery identyczne nazwy linków na jednej stronie są nierozróżnialne na liście linków czytnika ekranu (WCAG 2.4.4) i prowadzą w cztery różne miejsca. Wszyscy czterej autorzy i wszystkie trzy soczewki zbiegły się na tym argumencie niezależnie. Nazwy filarów użyte w etykietach są już widoczne na stronie jako okruszki podstron (Pozyskiwanie / Treści / Zespół / Wyniki), więc nie wchodzi żadne nowe nazewnictwo. Strzałka w komponencie — precedens f8link („Zobacz cennik" bez strzałki), taniej dla adaptacji EN/DE. Jeśli właściciel wybierze brzmienie z briefu, treść bloków się nie zmienia, ale handoff musi nieść wymóg aria-label per blok.

### D-D11

**Pytanie.** Czy indeks ma powtarzać zdania Growth z F8 podstron zespół i wyniki („W planie Growth widzisz sygnały ryzyka odejścia i dostajesz gotowe zdanie otwierające rozmowę.", „W planie Growth masz widok całego drzewa struktury."), czy jeden wiersz o Starterze plus link „Zobacz cennik" wystarcza?

**Rekomendacja panelu.** JEDEN WIERSZ + LINK. Ani Puls zespołu, ani drzewo struktury nie są modułami żadnego bloku indeksu — nie ma czego kwalifikować, a link do /cennik prowadzi do pełnego obrazu. To nie jest ukrycie, tylko zakres: I5 i D-D1(a) mówią „jeden wiersz", a limity i bramki żyją w jednym miejscu. Skutek uboczny korzystny: reguła pełnej formy „W planie Growth…" (rejestr poz. 11, słownik w. 13) nie jest ani naruszona, ani obchodzona, bo obie nazwy w ogóle nie padają.

### D-D12

**Pytanie.** Źródło 33 etykiet pozycji: (a) reużycie istniejących ciągów z czterech przestrzeni (FunkcjePozyskiwanie.mod{n}_nazwa, aiNaglowek itd.), czy (b) duplikat w nowej przestrzeni FunkcjeIndeks? Decyzja przesądza, czy odpowiedź na Z7 (rejestr poz. 18 i 24 — dziewięć nazw opisowych) poprawiamy w jednym miejscu, czy w dwóch ×3 języki.

**Rekomendacja panelu.** (a) REUŻYCIE. Dziś wszystkie 33 etykiety zgadzają się znak w znak z pl.json — sprawdzone programowo. Duplikacja tworzy drugie źródło prawdy dla tych samych łańcuchów i sprawia, że rozjazd indeks ↔ SpisTresci podstrony staje się możliwy przy pierwszej korekcie po Z7. Reużycie czyni ten rozjazd niemożliwym z konstrukcji. Strażnik znak w znak FunkcjeIndeks ↔ content/pl/funkcje.md obejmuje wtedy ramę, cztery H2, cztery wprowadzenia, cztery linki wejściowe, wiersz planu i zamknięcie; etykiety są porównywane w swoich macierzystych przestrzeniach, gdzie już dziś są objęte strażnikami podstron.

## Decyzje strony `/dla-kogo` (D-D13…D-D21)

### D-D13

**Pytanie.** Czy Pierwsze 90 Dni mogą być opisane na stronie w głosie uczestniczki („Od pierwszego wejścia jesteś w Pierwszych 90 Dniach"), a nie tylko liderki? Fakt ma dowód z kodu (auto-enroll, first90-service.ts:62–67) wpisany w „Rozstrzygnięcia towarzyszące" tabeli obietnic, ale jedyny wiersz obietnicy jest liderski (w. 112), a rejestr poz. 23 trzyma ten program jako pozycję otwartą do Z7.

**Rekomendacja panelu.** NIE na tym etapie — synteza wycięła to zdanie ze ścieżki 1. Powrót po trzech warunkach naraz: (1) odpowiedź okna aplikacji na Z7, (2) nowy wiersz w tabeli obietnic dla auto-enroll, (3) jedno zdanie w głosie uczestniczki w module 3 /funkcje/zespol — żeby kliknięcie w link trafiało w tekst, który zapowiedź potwierdza, a nie jej zaprzecza.

### D-D14

**Pytanie.** Który zestaw slugów sekcji /dla-kogo obowiązuje jako kontrakt (adres, SpisTresci, bramka kotwic, linki z kampanii i /pomoc)?

**Rekomendacja panelu.** Czasownikowy, zgodny z H1: #pracujesz-sama / #budujesz-zespol / #prowadzisz-strukture. Zestaw rzeczownikowy z fan-outu (startujaca / budujaca-zespol / prowadzaca-strukture) to etykiety segmentowe — dokładnie ta szuflada, którą D-D4 wyklucza z nagłówków, a slug jest widoczny w adresie, który ludzie sobie przesyłają. Rozstrzygnąć PRZED implementacją: po premierze zmiana łamie linki przychodzące bez czerwieni.

### D-D15

**Pytanie.** Czy granica ścieżki trzeciej ma nieść zastrzeżenie Paszportu zgodności („nie daje prawnej gwarancji ani porady"), czy zostaje ono wyłącznie na /funkcje/zespol?

**Rekomendacja panelu.** Ma nieść — naniesione w treści finalnej. To jedyne miejsce na stronie, gdzie brak kwalifikatora ma konsekwencję prawną, a /dla-kogo jest punktem wejścia z kampanii: czytelniczka może nie dojść do podstrony filarowej. Brzmienie verbatim z modułu 5.

### D-D16

**Pytanie.** Czy liczebniki słowne będące cechą funkcji z tabeli obietnic („cztery fazy", „czterech jurysdykcji") wolno cytować na /dla-kogo, czy indeks ich nie powtarza? Potrzebna jedna reguła na stronę i na adaptacje EN/DE.

**Rekomendacja panelu.** Wolno, ale WYŁĄCZNIE gdy liczebnik jest cechą funkcji zapisaną w tabeli obietnic — precedens jawny i zapisany w content/pl/filary.md w. 67–68 („nazwa programu i jego cecha, nie liczby marketingowe, poza zakresem lintera"). Reguła w tym brzmieniu wchodzi do protokołu i obowiązuje adaptacje.

### D-D17

**Pytanie.** Ile z karty Pro niesie /dla-kogo? Wariant fan-outu wprowadzał w wierszu planu klucze API, webhooki, czysty eksport i cztery zniesione limity; synteza zostawiła jedną pozycję.

**Rekomendacja panelu.** Jedna pozycja: „Czysty eksport — twoje materiały bez sygnatury polecającej — jest w planie Pro." (najbliższa deklarowanemu bólowi delegowania). Ranking, klucze API, webhooki i wyliczenie zniesionych limitów zostają na /cennik — duch D-D1(a): limity i pełna karta żyją w jednym miejscu, drugie miejsce to podwójne utrzymanie ×3 języki i pewny rozjazd przy pierwszej zmianie cennika. Efekt uboczny rekomendacji: znika też rozjazd nazw „sesje treningowe" (cennik) vs „Sala Treningowa" (słownik).

### D-D18

**Pytanie.** Czy /dla-kogo ma wiązać segment z planem tak, jak robią to karty /cennik (zaczynasz = Starter, budujesz zespół = Growth, duża struktura = Pro), czy zostaje przy „wszystko powyżej działa od planu Starter" plus jawne zdanie o tym, co dokłada Growth?

**Rekomendacja panelu.** Zostaje przy wariancie z treści finalnej; /cennik pozostaje jedynym miejscem, gdzie segment wiąże się z planem. Żadne zdanie /dla-kogo nie mówi „potrzebujesz planu X" — mówi, od którego planu działa to, co wymieniono wyżej. Wariant przeciwny robi z /dla-kogo drugi cennik do utrzymania ×3 języki.

### D-D19

**Pytanie.** Czy jedna funkcja może występować w dwóch ścieżkach na jednej stronie? Fan-out powtarzał zatwierdzanie treści, Akademię i Pierwsze 90 Dni niemal słowo w słowo; synteza przydzieliła każdej funkcji dokładnie jeden dom (ścieżka 2: Pulpit, kreator wdrożeniowy, Pierwsze 90 Dni, Osiągnięcia; ścieżka 3: zatwierdzanie, Paszport zgodności, Akademia).

**Rekomendacja panelu.** Jedna funkcja — jeden dom, zgodnie z podziałem ze STRATEGII pkt 33 (ścieżka 2 potrzebuje widoczności, ścieżka 3 skali i delegowania). Jeśli właściciel chce dopuścić powtórzenie, warunkiem twardym jest INNE zdanie i inny kąt oraz link tylko przy ścieżce, w której funkcja jest sednem — inaczej dwie sekcje mówią to samo i różnica między ścieżkami przestaje być prawdziwa.

### D-D20

**Pytanie.** Etykieta spisu treści „Na tej stronie" była sankcjonowana decyzją D-C4 jako wspólna dla CZTERECH podstron filarowych. Potwierdzasz ją jako stałą serwisu na cały zakres (piąta strona /dla-kogo, szósta /funkcje i kolejne ze spisem)?

**Rekomendacja panelu.** Potwierdzić jednym zdaniem. To spójność, nie nowa treść — EN „On this page" i DE „Auf dieser Seite" już istnieją w drzewach. Bez potwierdzenia serwis dostaje drugą etykietę na to samo i drugi wariant do utrzymania w adaptacjach.

### D-D21

**Pytanie.** Czy przyjmujesz jako kontrakt implementacji regułę, że etykieta linku MUSI być dokładnym podciągiem akapitu CO ROBI tej samej ścieżki (odmiana dozwolona), wraz z asercją w zestawie testów /dla-kogo?

**Rekomendacja panelu.** Tak. Bramka kotwic sprawdza cel linku, nie etykietę — bez tej asercji klasa błędu „etykieta, której nie ma w zdaniu" wyjdzie dopiero u adwersarza albo skończy się cichym przepisaniem treści przy implementacji. Asercja jest tania: dla każdej pozycji `linki` etykieta występuje w tekście odpowiedniego akapitu. Wszystkie 13 pozycji treści finalnej regułę spełniają.
