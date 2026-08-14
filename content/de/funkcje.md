# /funkcje — DE (adaptacja; Faza 4 Etap D; indeks wg zadań dnia)

**Status: ADAPTACJA PO PANELU DE — czeka na sankcję właściciela.
Źródło PL OBOWIĄZUJE (DECYZJE D-D1…D-D21 właściciela 2026-08-13).**
Źródło: content/pl/funkcje.md.
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

Funktionen, geordnet nach deinem Tagesablauf

### Zdanie korzyści

Du wählst aus, was jetzt dran ist – die Namen der Funktionen findest du unterwegs.

### I5 — plan jednym wierszem

Alles, was oben steht, funktioniert ab dem Starter-Plan.

Den KI-Assistenten bekommst du in keinem Plan.

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


**Link:** Sieh dir die Preise an → /cennik

### I6 — zamknięcie (stałe sankcjonowane)

**CTA:** Sieh dir an, wie es funktioniert → /login (ADR-023)
**Zdanie:** Du kannst jederzeit kündigen.

---

## Blok 1 — pozyskiwanie (id="pozyskiwanie")

### H2

Morgens siehst du, bei wem du dich meldest.

### Wprowadzenie

Ein Tag, den du im Täglichen Aktionsplan geplant hast, beginnt mit etwas Konkretem. Termine, Aufgaben und Kontakte hältst du an einem Ort – nicht im Kopf.

### Pozycje (etykiety reużyte z FunkcjePozyskiwanie)

1. Anmeldeformular mit öffentlicher Seite → /funkcje/pozyskiwanie#formularz
2. Kalender mit Erinnerungen → /funkcje/pozyskiwanie#kalendarz
3. Kalender-Abo fürs Handy → /funkcje/pozyskiwanie#subskrypcja-kalendarza
4. Kontaktexport als vCard → /funkcje/pozyskiwanie#eksport-vcard
5. Empfehlungs-QR-Code → /funkcje/pozyskiwanie#qr-polecajacy
6. Empfehlungsprogramm mit Nachverfolgung → /funkcje/pozyskiwanie#program-polecen
7. Täglicher Aktionsplan (DMO) → /funkcje/pozyskiwanie#dmo
8. Aufgaben → /funkcje/pozyskiwanie#zadania
9. Trainingsraum → /funkcje/pozyskiwanie#sala-treningowa
10. Gesprächspläne und Debriefings → /funkcje/pozyskiwanie#plany-rozmow
11. KI-Assistent *(pozycja kierunku)* → /funkcje/pozyskiwanie#asystent-ai

### Oznaczenie pozycji kierunku

– Ausblick: Kontakte gewinnen

*(człon doklejany WEWNĄTRZ linku pozycji „asystent AI", jeden węzeł
tekstowy, w całości widoczny — panel projektu i rozstrzygnięcie
właściciela 2026-08-14, forma L1-A. Nazwa obszaru jest tu jedynym
różnicownikiem: obie pozycje kierunku niosą tę samą etykietę, więc
identyczny sufiks zostawiłby dwie nierozróżnialne nazwy dostępne.
BRZMIENIE ROZSTRZYGNIĘTE 2026-08-14 (właściciel: pakiet ZWIĘZŁY, DE bez
słowa „Richtung"; panel językowy DE wf_d4b3c933-758). DE odchodzi od
przyimka pl/en i wiąże obszar DWUKROPKIEM — parytet znaczeniowy, nie
leksykalny. „Ausblick": 0 wystąpień w całym repo. Odrzucone: „Richtung"
(kolokacja znak w znak z mod4_nie na tej samej podstronie) oraz
rusztowanie „zum Thema" (echo z blok1–4Link, 4 wystąpienia).)*

### Link wejściowy

Sieh dir alles zum Thema Kontakte gewinnen an → /funkcje/pozyskiwanie

*(strzałkę „→" dokłada komponent, nie ciąg — D-D10)*

---

## Blok 2 — treści (id="tresci")

### H2

Du setzt dich an deine Posts und hast kein leeres Blatt vor dir.

### Wprowadzenie

Einen Post setzt du aus einer fertigen Vorlage zusammen, planst ihn im Kalender und schickst ihn deiner Leaderin zur Freigabe – du veröffentlichst selbst. Eine riskante Formulierung fängst du vor der Veröffentlichung ab, nicht danach.

### Pozycje (etykiety reużyte z FunkcjeTresci)

1. Studio → /funkcje/tresci#studio
2. Vorlagen mit Versionierung → /funkcje/tresci#szablony
3. Hashtag-Sets → /funkcje/tresci#hashtagi
4. Veröffentlichungskalender → /funkcje/tresci#kalendarz-publikacji
5. Freigabe durch deine Leaderin → /funkcje/tresci#zatwierdzanie
6. Schild → /funkcje/tresci#tarcza
7. Ethik-Siegel → /funkcje/tresci#pieczec-etyczna
8. Lernen des Stimmprofils → /funkcje/tresci#uczenie-glosu
9. Post-Board mit Filtern → /funkcje/tresci#tablica-postow
10. KI-Assistent *(pozycja kierunku)* → /funkcje/tresci#asystent-ai

### Oznaczenie pozycji kierunku

– Ausblick: Inhalte

*(człon doklejany WEWNĄTRZ linku pozycji „asystent AI", jeden węzeł
tekstowy, w całości widoczny — panel projektu i rozstrzygnięcie
właściciela 2026-08-14, forma L1-A. Nazwa obszaru jest tu jedynym
różnicownikiem: obie pozycje kierunku niosą tę samą etykietę, więc
identyczny sufiks zostawiłby dwie nierozróżnialne nazwy dostępne.
BRZMIENIE ROZSTRZYGNIĘTE 2026-08-14 (właściciel: pakiet ZWIĘZŁY, DE bez
słowa „Richtung"; panel językowy DE wf_d4b3c933-758). DE odchodzi od
przyimka pl/en i wiąże obszar DWUKROPKIEM — parytet znaczeniowy, nie
leksykalny. „Ausblick": 0 wystąpień w całym repo. Odrzucone: „Richtung"
(kolokacja znak w znak z mod4_nie na tej samej podstronie) oraz
rusztowanie „zum Thema" (echo z blok1–4Link, 4 wystąpienia).)*

### Link wejściowy

Sieh dir alles zum Thema Inhalte an → /funkcje/tresci

---

## Blok 3 — zespół (id="zespol")

### H2

Eine neue Partnerin kommt dazu, und du erklärst nicht alles neu.

### Wprowadzenie

Der Einstiegsassistent führt deine neue Partnerin durch alle Etappen, und durch die ersten 90 Tage mit Missionen und Phasen führst du sie selbst. Team-Inhalte gibst du frei, und deine Nachricht prüfst du, bevor du sie abschickst.

### Pozycje (etykiety reużyte z FunkcjeZespol)

1. Einstiegsassistent → /funkcje/zespol#kreator-wdrozeniowy
2. Freigabe von Team-Inhalten → /funkcje/zespol#zatwierdzanie-zespolu
3. Die ersten 90 Tage → /funkcje/zespol#pierwsze-90-dni
4. Erfolge → /funkcje/zespol#osiagniecia
5. Compliance-Pass → /funkcje/zespol#paszport-zgodnosci
6. Akademie → /funkcje/zespol#akademia

### Link wejściowy

Sieh dir alles zum Thema Team an → /funkcje/zespol

---

## Blok 4 — wyniki (id="wyniki")

### H2

Abends weißt du, wo du stehst.

### Wprowadzenie

Das Dashboard zeigt den heutigen Stand – und deine Ergebnisse haben einen Beleg, der bleibt. Deine Erfolge und die deines Teams hältst du fest und feierst sie, bevor der Alltag sie zudeckt.

### Pozycje (etykiety reużyte z FunkcjeWyniki)

1. Dashboard → /funkcje/wyniki#pulpit
2. Dein Wrapped → /funkcje/wyniki#twoj-wrapped
3. Ziel mit Meilensteinen → /funkcje/wyniki#cel
4. Erfolgswand → /funkcje/wyniki#sciana-sukcesow
5. Zeugnis → /funkcje/wyniki#swiadectwo
6. Wall of Proof → /funkcje/wyniki#wall-of-proof

### Link wejściowy

Sieh dir alles zum Thema Ergebnisse an → /funkcje/wyniki

---

## I4 — MILCZENIE (element strukturalny, bez treści)

Cztery bloki, nie pięć. Filar 5 nie ma bloku. Słowo „Abrechnungen"
nie pada w żadnym ciągu widocznym.
