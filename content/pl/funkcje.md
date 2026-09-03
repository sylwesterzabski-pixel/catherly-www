# /funkcje — PL (Faza 4, Etap D; indeks wg zadań dnia)

**Status: OBOWIĄZUJE — DECYZJE D-D1…D-D21 właściciela 2026-08-13.**
Protokół: docs/faza-4/tresci-etap-d-po-panelach.md.
Historia korekt: docs/faza-4/rejestr-korekt-tresci.md.
Przestrzeń messages: FunkcjeIndeks.

Etykiety pozycji list są REUŻYTE z przestrzeni podstron
(FunkcjePozyskiwanie, FunkcjeTresci, FunkcjeZespol, FunkcjeWyniki) —
decyzja D-D12. Nie są duplikowane w FunkcjeIndeks i nie wchodzą do
strażnika znak w znak tego pliku; porównuje je strażnik podstrony,
w której mieszkają.

---

## Rama

### H1 (I2)

Funkcje ułożone tak, jak idzie twój dzień

### Zdanie korzyści

Wybierasz to, co masz teraz do zrobienia, a nazwy funkcji znajdziesz
po drodze.

### I5 — plan jednym wierszem

Wszystko powyżej działa od planu Starter.

Asystenta AI nie dostajesz w żadnym planie.

*(F8 ROZBITE 2026-08-14 — rozstrzygnięcie właściciela + mini-panel
treści. Kwantyfikator „wszystko powyżej" obejmował obie pozycje
kierunku, a asystenta AI nie dostajesz w żadnym planie: content/pl/
cennik.md w. 73, wiersz WYKLUCZONE — „wywołania AI (klucz pusty)",
decyzja właściciela + panel F1–F3. Zdanie pierwsze (f8_1) zostaje
ZNAK W ZNAK formułą stojącą w pięciu miejscach nietkniętych tą
zmianą: FunkcjeZespol.f8_1, FunkcjeWyniki.f8_1, DlaKogo.s1_plan,
s2_plan_1, s3_plan_1. Zdanie drugie (f8_2) wyłącza pozycję Z IMIENIA
— nie przez zawężenie kwantyfikatora, bo proza sekcji AI stoi w
trybie oznajmującym jak moduły działające i nie glosuje statusu,
więc zawężenie kazałoby czytelniczce wywnioskować to, czego strona
nie mówi (ADR-018: brak dowodu = brak zabezpieczenia). Czasownik
„dostajesz" zamyka odczyt „nie jest bramkowany, czyli mają wszyscy";
„wyjątek" odrzucony — zero precedensu w korpusie ×3 języki. Klucze
f8_1 + f8_2 na gałęzi `zdania` komponentu PlanJednymWierszem —
wzorzec istniejący na /funkcje/zespol i /funkcje/wyniki.)*


**Link:** Zobacz cennik → /cennik

### I6 — zamknięcie (stałe sankcjonowane)

**CTA:** Sprawdź, jak działa → /login (ADR-023)
**Zdanie:** Rezygnujesz w każdej chwili.

---

## Blok 1 — pozyskiwanie (id="pozyskiwanie")

### H2

Rano widzisz, do kogo się odezwać.

### Wprowadzenie

Dzień zaplanowany w Dziennym Planie Działania zaczyna się od konkretu.
Terminy, zadania i kontakty trzymasz w jednym miejscu, nie w głowie.

### Pozycje (etykiety reużyte z FunkcjePozyskiwanie)

1. formularz zgłoszeniowy z publiczną stroną →
   /funkcje/pozyskiwanie#formularz
2. Kalendarz z przypomnieniami → /funkcje/pozyskiwanie#kalendarz
3. subskrypcja kalendarza w telefonie →
   /funkcje/pozyskiwanie#subskrypcja-kalendarza
4. eksport kontaktów do vCard → /funkcje/pozyskiwanie#eksport-vcard
5. kod QR polecający → /funkcje/pozyskiwanie#qr-polecajacy
6. program poleceń ze śledzeniem → /funkcje/pozyskiwanie#program-polecen
7. DMO — Dzienny Plan Działania → /funkcje/pozyskiwanie#dmo
8. Zadania → /funkcje/pozyskiwanie#zadania
9. Sala Treningowa → /funkcje/pozyskiwanie#sala-treningowa
10. plany rozmów i debriefy → /funkcje/pozyskiwanie#plany-rozmow
11. asystent AI *(pozycja kierunku)* →
    /funkcje/pozyskiwanie#asystent-ai

### Oznaczenie pozycji kierunku

— kierunek w pozyskiwaniu

*(człon doklejany WEWNĄTRZ linku pozycji „asystent AI", jeden węzeł
tekstowy, w całości widoczny — panel projektu i rozstrzygnięcie
właściciela 2026-08-14, forma L1-A. Nazwa obszaru jest tu jedynym
różnicownikiem: obie pozycje kierunku niosą tę samą etykietę, więc
identyczny sufiks zostawiłby dwie nierozróżnialne nazwy dostępne.
BRZMIENIE ROZSTRZYGNIĘTE 2026-08-14 (właściciel, pakiet ZWIĘZŁY):
rzeczownik + nazwa obszaru, bez zdania wyjaśniającego — glosa pada raz,
na podstronie, a nie 33 razy w liście linków.)*

### Link wejściowy

Zobacz wszystko o pozyskiwaniu → /funkcje/pozyskiwanie

*(strzałkę „→" dokłada komponent, nie ciąg — D-D10)*

---

## Blok 2 — treści (id="tresci")

### H2

Siadasz do postów i nie zaczynasz od pustej kartki.

### Wprowadzenie

Post układasz z gotowego szablonu, planujesz go w kalendarzu i wysyłasz
do zatwierdzenia u liderki — publikujesz samodzielnie. Ryzykowne sformułowanie
wyłapujesz przed publikacją, nie po niej.

### Pozycje (etykiety reużyte z FunkcjeTresci)

1. Studio → /funkcje/tresci#studio
2. szablony z wersjonowaniem → /funkcje/tresci#szablony
3. zestawy hashtagów → /funkcje/tresci#hashtagi
4. Kalendarz publikacji → /funkcje/tresci#kalendarz-publikacji
5. zatwierdzanie u liderki → /funkcje/tresci#zatwierdzanie
6. Tarcza → /funkcje/tresci#tarcza
7. Pieczęć Etyczna → /funkcje/tresci#pieczec-etyczna
8. uczenie profilu głosu → /funkcje/tresci#uczenie-glosu
9. tablica postów z filtrami → /funkcje/tresci#tablica-postow
10. asystent AI *(pozycja kierunku)* → /funkcje/tresci#asystent-ai

### Oznaczenie pozycji kierunku

— kierunek w treściach

*(człon doklejany WEWNĄTRZ linku pozycji „asystent AI", jeden węzeł
tekstowy, w całości widoczny — panel projektu i rozstrzygnięcie
właściciela 2026-08-14, forma L1-A. Nazwa obszaru jest tu jedynym
różnicownikiem: obie pozycje kierunku niosą tę samą etykietę, więc
identyczny sufiks zostawiłby dwie nierozróżnialne nazwy dostępne.
BRZMIENIE ROZSTRZYGNIĘTE 2026-08-14 (właściciel, pakiet ZWIĘZŁY):
rzeczownik + nazwa obszaru, bez zdania wyjaśniającego — glosa pada raz,
na podstronie, a nie 33 razy w liście linków.)*

### Link wejściowy

Zobacz wszystko o treściach → /funkcje/tresci

---

## Blok 3 — zespół (id="zespol")

### H2

Nowa osoba dołącza, a ty nie tłumaczysz od nowa.

### Wprowadzenie

Kreator wdrożeniowy prowadzi nową osobę przez etapy, a przez Pierwsze
90 Dni z misjami i fazami prowadzisz ją ty. Treści zespołu zatwierdzasz,
a komunikat sprawdzasz, zanim go wyślesz.

### Pozycje (etykiety reużyte z FunkcjeZespol)

1. kreator wdrożeniowy → /funkcje/zespol#kreator-wdrozeniowy
2. zatwierdzanie treści zespołu → /funkcje/zespol#zatwierdzanie-zespolu
3. Pierwsze 90 Dni → /funkcje/zespol#pierwsze-90-dni
4. Osiągnięcia → /funkcje/zespol#osiagniecia
5. Paszport zgodności → /funkcje/zespol#paszport-zgodnosci
6. Akademia → /funkcje/zespol#akademia

### Link wejściowy

Zobacz wszystko o zespole → /funkcje/zespol

---

## Blok 4 — wyniki (id="wyniki")

### H2

Wieczorem wiesz, na czym stoisz.

### Wprowadzenie

Pulpit pokazuje dzisiejszy stan, a twoje wyniki mają dowód, który
zostaje. Sukcesy swoje i zespołu zapisujesz i świętujesz, zanim
przykryje je codzienność.

### Pozycje (etykiety reużyte z FunkcjeWyniki)

1. Pulpit → /funkcje/wyniki#pulpit
2. Twój Wrapped → /funkcje/wyniki#twoj-wrapped
3. Cel z kamieniami milowymi → /funkcje/wyniki#cel
4. Ściana sukcesów → /funkcje/wyniki#sciana-sukcesow
5. Świadectwo → /funkcje/wyniki#swiadectwo
6. Wall of Proof → /funkcje/wyniki#wall-of-proof

### Link wejściowy

Zobacz wszystko o wynikach → /funkcje/wyniki

---

## I4 — MILCZENIE (element strukturalny, bez treści)

Cztery bloki, nie pięć. Filar 5 nie ma bloku. Słowo „rozliczenia"
nie pada w żadnym ciągu widocznym.
