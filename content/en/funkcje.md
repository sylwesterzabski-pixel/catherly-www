# /funkcje — EN (adaptacja; Faza 4 Etap D; indeks wg zadań dnia)

**Status: ADAPTACJA PO PANELU EN — czeka na sankcję właściciela.
Źródło PL OBOWIĄZUJE (DECYZJE D-D1…D-D21 właściciela 2026-08-13).**
Źródło: content/pl/funkcje.md.
Protokół: docs/faza-4/tresci-etap-d-po-panelach.md.
Historia korekt: docs/faza-4/rejestr-korekt-tresci.md.
Przestrzeń messages: FunkcjeIndeks.

Etykiety pozycji list są REUŻYTE znak w znak z przestrzeni podstron EN
(FunkcjePozyskiwanie, FunkcjeTresci, FunkcjeZespol, FunkcjeWyniki) —
decyzja D-D12. Nie są duplikowane w FunkcjeIndeks i nie wchodzą do
strażnika znak w znak tego pliku; porównuje je strażnik podstrony,
w której mieszkają.

---

## Rama

### H1 (I2)

Features laid out the way your day runs

### Zdanie korzyści

You choose what you need to do right now, and you’ll find the feature names along the way.

### I5 — plan jednym wierszem

Everything above works from the Starter plan up.

You don’t get the AI assistant on any plan.

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


**Link:** See pricing → /cennik

### I6 — zamknięcie (stałe sankcjonowane)

**CTA:** See how it works → /login (ADR-023)
**Zdanie:** You can cancel at any time.

---

## Blok 1 — pozyskiwanie (id="pozyskiwanie")

### H2

In the morning, you see who to reach out to.

### Wprowadzenie

A day planned in the Daily Action Plan starts with something concrete. You keep your appointments, tasks and contacts in one place, not in your head.

### Pozycje (etykiety reużyte z FunkcjePozyskiwanie)

1. Sign-up form with a public page →
   /funkcje/pozyskiwanie#formularz
2. Calendar with reminders → /funkcje/pozyskiwanie#kalendarz
3. Calendar subscription on your phone →
   /funkcje/pozyskiwanie#subskrypcja-kalendarza
4. Contact export to vCard → /funkcje/pozyskiwanie#eksport-vcard
5. Referral QR code → /funkcje/pozyskiwanie#qr-polecajacy
6. Referral program with tracking → /funkcje/pozyskiwanie#program-polecen
7. DMO — Daily Action Plan → /funkcje/pozyskiwanie#dmo
8. Tasks → /funkcje/pozyskiwanie#zadania
9. Training Room → /funkcje/pozyskiwanie#sala-treningowa
10. Conversation plans and debriefs → /funkcje/pozyskiwanie#plany-rozmow
11. AI assistant *(pozycja kierunku)* →
    /funkcje/pozyskiwanie#asystent-ai

### Oznaczenie pozycji kierunku

— a direction in Acquiring

*(człon doklejany WEWNĄTRZ linku pozycji „asystent AI", jeden węzeł
tekstowy, w całości widoczny — panel projektu i rozstrzygnięcie
właściciela 2026-08-14, forma L1-A. Nazwa obszaru jest tu jedynym
różnicownikiem: obie pozycje kierunku niosą tę samą etykietę, więc
identyczny sufiks zostawiłby dwie nierozróżnialne nazwy dostępne.
BRZMIENIE ROZSTRZYGNIĘTE 2026-08-14 (właściciel, pakiet ZWIĘZŁY):
rzeczownik + nazwa obszaru, bez zdania wyjaśniającego — glosa pada raz,
na podstronie, a nie 33 razy w liście linków.)*

### Link wejściowy

See everything about Acquiring → /funkcje/pozyskiwanie

*(strzałkę „→" dokłada komponent, nie ciąg — D-D10)*

---

## Blok 2 — treści (id="tresci")

### H2

You sit down to write your posts and don’t start from a blank page.

### Wprowadzenie

You build your post from a ready template, plan it in the calendar and send it to your leader for approval — you do the publishing yourself. You catch risky wording before you publish, not after.

### Pozycje (etykiety reużyte z FunkcjeTresci)

1. Studio → /funkcje/tresci#studio
2. Templates with versioning → /funkcje/tresci#szablony
3. Hashtag sets → /funkcje/tresci#hashtagi
4. Publishing calendar → /funkcje/tresci#kalendarz-publikacji
5. Approval from your leader → /funkcje/tresci#zatwierdzanie
6. Shield → /funkcje/tresci#tarcza
7. Ethical Seal → /funkcje/tresci#pieczec-etyczna
8. Voice profile learning → /funkcje/tresci#uczenie-glosu
9. Post board with filters → /funkcje/tresci#tablica-postow
10. AI assistant *(pozycja kierunku)* → /funkcje/tresci#asystent-ai

### Oznaczenie pozycji kierunku

— a direction in Content

*(człon doklejany WEWNĄTRZ linku pozycji „asystent AI", jeden węzeł
tekstowy, w całości widoczny — panel projektu i rozstrzygnięcie
właściciela 2026-08-14, forma L1-A. Nazwa obszaru jest tu jedynym
różnicownikiem: obie pozycje kierunku niosą tę samą etykietę, więc
identyczny sufiks zostawiłby dwie nierozróżnialne nazwy dostępne.
BRZMIENIE ROZSTRZYGNIĘTE 2026-08-14 (właściciel, pakiet ZWIĘZŁY):
rzeczownik + nazwa obszaru, bez zdania wyjaśniającego — glosa pada raz,
na podstronie, a nie 33 razy w liście linków.)*

### Link wejściowy

See everything about Content → /funkcje/tresci

---

## Blok 3 — zespół (id="zespol")

### H2

A new person joins your team, and you don’t explain it all over again.

### Wprowadzenie

The onboarding wizard walks a new person through all the stages, and it’s you who guides her through First 90 Days, with its missions and phases. You approve your team’s content, and you check your message before you send it.

### Pozycje (etykiety reużyte z FunkcjeZespol)

1. Onboarding wizard → /funkcje/zespol#kreator-wdrozeniowy
2. Team content approval → /funkcje/zespol#zatwierdzanie-zespolu
3. First 90 Days → /funkcje/zespol#pierwsze-90-dni
4. Achievements → /funkcje/zespol#osiagniecia
5. Compliance Passport → /funkcje/zespol#paszport-zgodnosci
6. Academy → /funkcje/zespol#akademia

### Link wejściowy

See everything about Team → /funkcje/zespol

---

## Blok 4 — wyniki (id="wyniki")

### H2

In the evening, you know where you stand.

### Wprowadzenie

The Dashboard shows where things stand today, and your results carry proof that lasts. You record and celebrate your successes and your team’s before everyday life buries them.

### Pozycje (etykiety reużyte z FunkcjeWyniki)

1. Dashboard → /funkcje/wyniki#pulpit
2. Your Wrapped → /funkcje/wyniki#twoj-wrapped
3. Goal with milestones → /funkcje/wyniki#cel
4. Success wall → /funkcje/wyniki#sciana-sukcesow
5. Testimony → /funkcje/wyniki#swiadectwo
6. Wall of Proof → /funkcje/wyniki#wall-of-proof

### Link wejściowy

See everything about Results → /funkcje/wyniki

---

## I4 — MILCZENIE (element strukturalny, bez treści)

Cztery bloki, nie pięć. Filar 5 nie ma bloku. Słowo „rozliczenia"
(EN: „billing", „earnings") nie pada w żadnym ciągu widocznym.
