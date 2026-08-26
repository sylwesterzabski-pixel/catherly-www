# /funkcje/pozyskiwanie — PL (Faza 4, Etap B; wzorcowa podstrona K12)

**Status: OBOWIĄZUJE — DECYZJE D-B1/D-B2 właściciela 2026-08-12.**
Protokół: docs/faza-4/tresci-pozyskiwanie-po-panelu.md.
Historia korekt: docs/faza-4/rejestr-korekt-tresci.md.
Granice prawdziwe NA DZIŚ — rejestr warunków powrotu poz. 15–18.

---

## Rama

### H1 (F2)

Rano widzisz, do kogo się odezwać.

### Zdanie korzyści

Masz plan działania i bazę, która rośnie, gdy ty prowadzisz rozmowy.

### F8 — plan jednym wierszem

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

### F9 — przejście

Dalej: Treści → *(lewy slot pusty — pierwszy filar)*

### F10 — zamknięcie (stałe sankcjonowane)

**CTA:** Sprawdź, jak działa → /login (ADR-023)
**Zdanie:** Rezygnujesz w każdej chwili.

---

## Moduł 1 — formularz zgłoszeniowy z publiczną stroną

### PO CO TO

Znajoma pyta cię o współpracę, a ty zamiast przepisywać jej dane
z wiadomości przekazujesz link do swojego formularza. Wypełnia go
na publicznej stronie — i zgłoszenie trafia prosto do twojej bazy
kontaktów.

### CZEGO NIE ROBI

Catherly nie wyśle ci e-maila o nowym zgłoszeniu — wypełnione
zgłoszenia widzisz w aplikacji.

## Moduł 2 — Kalendarz z przypomnieniami

### PO CO TO

Terminy rozmów nie muszą siedzieć w twojej głowie. Planujesz
kontakty w kalendarzu, a w ostatnich 30 minutach przed rozmową
Catherly przypomina ci o niej.

*(„30 minutach" — facts.json: przypomnienie-kalendarza-minuty, D-B3)*

### CZEGO NIE ROBI

Przypomnienia nie przychodzą e-mailem ani SMS-em.

## Moduł 3 — subskrypcja kalendarza w telefonie

### PO CO TO

Zaglądasz do kalendarza w telefonie i widzisz rozmowy zaplanowane
w Catherly obok reszty swoich spraw. Niczego nie przepisujesz —
co zaplanowałaś, po prostu tam jest.

### CZEGO NIE ROBI

Subskrypcja działa tylko w stronę telefonu — Catherly nie czyta
twojego prywatnego kalendarza i niczego z niego nie pobiera.

## Moduł 4 — eksport kontaktów do vCard

### PO CO TO

Jedziesz na spotkanie i numer klientki chcesz mieć tam, gdzie
zawsze — w telefonie. Jednym kliknięciem eksportujesz kontakty
do vCard i masz je pod ręką także bez otwierania aplikacji.

### CZEGO NIE ROBI

Eksport działa w jedną stronę — importu hurtowego nie ma, kontakty
wpisujesz ręcznie lub przez formularz.

## Moduł 5 — kod QR polecający

### PO CO TO

Kończysz rozmowę i zostawiasz wizytówkę — z twoim kodem QR
polecającym zamiast adresu do przepisywania. Tworzysz go w Catherly
i dodajesz do materiałów i wizytówek przy eksporcie.

### CZEGO NIE ROBI

Catherly nie publikuje ani nie rozsyła materiałów z kodem za
ciebie — dostajesz gotowy eksport, a o tym, gdzie trafi grafika
albo wydruk, decydujesz sama.

## Moduł 6 — program poleceń ze śledzeniem

### PO CO TO

Podajesz znajomej zaproszenie ze swoim kodem i wracasz do swoich
spraw. Kto z niego skorzystał, widzisz w Catherly — nie musisz
dopytywać, czy coś z tego wyszło.

### CZEGO NIE ROBI

Catherly niczego nie wysyła do twoich znajomych — zaproszenie
przekazujesz sama, a program tylko pokazuje, kto z niego
skorzystał.

## Moduł 7 — DMO — Dzienny Plan Działania

### PO CO TO

Dzień zaplanowany w Dziennym Planie Działania zaczyna się od
konkretu — nie zastanawiasz się, co teraz, tylko dzwonisz,
piszesz, rozmawiasz. Przez dzień prowadzi cię twój plan.

### CZEGO NIE ROBI

Dzienny Plan Działania niczego nie wysyła za ciebie — do osób
z planu dzwonisz i piszesz sama.

## Moduł 8 — Zadania

### PO CO TO

Po rozmowie zapisujesz zadanie przy osobie, której dotyczy:
oddzwonić po weekendzie, dosłać katalog, zapytać o decyzję.
Wracasz do kontaktu i to, co ustaliłaś, jest przy nim.

### CZEGO NIE ROBI

Catherly nie przypomni ci o zadaniu e-mailem — listę zadań masz
w aplikacji.

## Moduł 9 — Sala Treningowa

### PO CO TO

Przed trudną rozmową wchodzisz do Sali Treningowej i przechodzisz
ją na sucho — obiekcja pada najpierw tu, nie przy klientce.
Odpowiedzi bierzesz z biblioteki obiekcji uporządkowanej w siedem
kategorii.

### CZEGO NIE ROBI

Sala Treningowa nie rozmawia z twoją klientką i niczego do niej
nie wysyła — ćwiczysz tu sama, a prawdziwą rozmowę prowadzisz ty.

## Moduł 10 — plany rozmów i debriefy

### PO CO TO

Przed spotkaniem zapisujesz plan rozmowy: o co zapytasz, co
pokażesz, na czym ci zależy. Po spotkaniu piszesz debrief —
szczegóły trafiają do notatki, zanim wypchnie je reszta dnia.

### CZEGO NIE ROBI

Catherly nie napisze planu ani debriefu za ciebie — piszesz je
sama, własnymi słowami.

---

## Sekcja kierunku — asystent AI (D-B2: świadome rozszerzenie
stosu względem DECYZJI 6; po module 10, przed F8; bez slotu zrzutu)

### Treść

Z asystentem AI dostosowujesz wiadomości do konkretnej osoby.

### Granica

Asystent nie napisze tekstu zamiast ciebie — proponuje, ty piszesz.

### Oznaczenie statusu (człon H2)

— kierunek

*(człon doklejany do H2 sekcji jako jeden węzeł tekstowy — odpowiednik
oznaczenia z indeksu /funkcje, wymuszony strażnikiem S-SYMETRIA: kotwica
#asystent-ai jest kontraktem publicznym, więc wejście bezpośrednie
omija indeks. Obszar tu NIE wchodzi — wynika z kontekstu strony.
BRZMIENIE ROZSTRZYGNIĘTE 2026-08-14 (właściciel, pakiet ZWIĘZŁY):
sam rzeczownik, bez zdania wyjaśniającego.
KOREKTA 2026-08-14: stało tu wcześniej, że „glosę niesie proza pod
nagłówkiem" — to była NIEPRAWDA o repo i tak ją nazywam. SekcjaKierunku
renderuje wyłącznie `tresc` i `granica`; obie stoją w trybie
oznajmującym jak moduły działające, więc statusu nie glosuje nic poza
tym członem (przyznaje to komentarz w pozyskiwanie/page.tsx: „sama
sekcja swojego statusu nie nazywa"). Glosę niesie dopiero wiersz F8
— zdanie f8_2 stojące bezpośrednio pod sekcją; patrz adnotacja przy F8.)*


---

## Etykieta okruszków (mikrotekst nawigacji)

Jesteś tutaj

**Sankcja: panel projektu HF K12, 2026-08-12** (odrzucone:
„Okruszki" — żargon; „Ścieżka" — wieloznaczne).
