# /funkcje/pozyskiwanie — DE (adaptacja; Faza 4 Etap B)

**Status: OBOWIĄZUJE — adaptacja po panelu DE, na polecenie
właściciela (D-B1/D-B2, 2026-08-12).**
Źródło: content/pl/funkcje-pozyskiwanie.md.
Historia korekt: docs/faza-4/rejestr-korekt-tresci.md.

---

## Rama

### H1 (F2)

Morgens siehst du, bei wem du dich meldest.

### Zdanie korzyści

Du hast einen Aktionsplan und eine Kontaktbasis, die wächst,
während du Gespräche führst.

### F8

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


**Link:** Sieh dir die Preise an → /cennik (ścieżki ujednolicone)

### F9

Weiter: Inhalte → *(lewy slot pusty)*

### F10

**CTA:** Sieh dir an, wie es funktioniert → /login
**Zdanie:** Du kannst jederzeit kündigen.

---

## Moduł 1 — Anmeldeformular mit öffentlicher Seite

### PO CO TO

Eine Bekannte fragt dich nach einer Zusammenarbeit – statt ihre
Daten aus Nachrichten abzutippen, gibst du ihr den Link zu deinem
Formular. Sie füllt es auf der öffentlichen Seite aus – und die
Anmeldung landet direkt in deiner Kontaktbasis.

### CZEGO NIE ROBI

Catherly schickt dir bei einer neuen Anmeldung keine E-Mail –
ausgefüllte Anmeldungen siehst du in der App.

## Moduł 2 — Kalender mit Erinnerungen

### PO CO TO

Gesprächstermine musst du nicht im Kopf behalten. Du planst deine
Kontakte im Kalender, und 30 Minuten vor jedem Gespräch erinnert
Catherly dich daran.

### CZEGO NIE ROBI

Die Erinnerungen kommen weder per E-Mail noch per SMS.

## Moduł 3 — Kalender-Abo fürs Handy

### PO CO TO

Du schaust in den Kalender auf deinem Handy und siehst die in
Catherly geplanten Gespräche neben allem, was sonst noch ansteht.
Du tippst nichts ab – was du geplant hast, steht einfach dort.

### CZEGO NIE ROBI

Das Abo funktioniert nur in Richtung Handy – Catherly liest deinen
privaten Kalender nicht und ruft nichts daraus ab.

## Moduł 4 — Kontaktexport als vCard

### PO CO TO

Du fährst zu einem Treffen und willst die Nummer deiner Kundin dort
haben, wo du sie immer hast – auf dem Handy. Mit einem Klick
exportierst du Kontakte als vCard und hast sie griffbereit, auch
ohne die App zu öffnen.

### CZEGO NIE ROBI

Der Export funktioniert nur in eine Richtung – einen Massenimport
gibt es nicht, Kontakte trägst du von Hand oder über ein Formular
ein.

## Moduł 5 — Empfehlungs-QR-Code

### PO CO TO

Du beendest ein Gespräch und lässt eine Visitenkarte da – mit
deinem Empfehlungs-QR-Code statt einer Adresse zum Abtippen. Du
erstellst ihn in Catherly und fügst ihn beim Export zu Materialien
und Visitenkarten hinzu.

### CZEGO NIE ROBI

Catherly veröffentlicht die Materialien mit deinem Code nicht und
verschickt sie nicht für dich – du bekommst einen fertigen Export,
und wo die Grafik oder der Ausdruck landet, entscheidest du selbst.

## Moduł 6 — Empfehlungsprogramm mit Nachverfolgung

### PO CO TO

Du gibst einer Bekannten eine Einladung mit deinem Code und machst
mit deinem Tag weiter. Wer sie genutzt hat, siehst du in Catherly –
du musst nicht nachfragen, ob etwas daraus geworden ist.

### CZEGO NIE ROBI

Catherly schickt deinen Bekannten nichts – die Einladung gibst du
selbst weiter, das Programm zeigt nur, wer sie genutzt hat.

## Moduł 7 — Täglicher Aktionsplan (DMO)

### PO CO TO

Ein Tag, den du im Täglichen Aktionsplan geplant hast, beginnt mit
etwas Konkretem – du überlegst nicht, was jetzt dran ist, sondern
rufst an, schreibst, sprichst. Durch den Tag führt dich dein Plan.

### CZEGO NIE ROBI

Der Tägliche Aktionsplan verschickt nichts für dich – die Menschen
aus deinem Plan rufst du selbst an und schreibst ihnen selbst.

## Moduł 8 — Aufgaben

### PO CO TO

Nach dem Gespräch notierst du die Aufgabe bei der Person, um die es
geht: nach dem Wochenende zurückrufen, den Katalog nachschicken,
nach der Entscheidung fragen. Du kommst zum Kontakt zurück – und
was du vereinbart hast, steht direkt dabei.

### CZEGO NIE ROBI

Catherly erinnert dich nicht per E-Mail an eine Aufgabe – deine
Aufgabenliste hast du in der App.

## Moduł 9 — Trainingsraum

### PO CO TO

Vor einem schwierigen Gespräch gehst du in den Trainingsraum und
spielst es vorab durch – der Einwand fällt zuerst hier, nicht bei
deiner Kundin. Die Antworten nimmst du aus der Einwand-Bibliothek,
in sieben Kategorien geordnet.

### CZEGO NIE ROBI

Der Trainingsraum spricht nicht mit deiner Kundin und schickt ihr
nichts – du übst hier für dich, das echte Gespräch führst du
selbst.

## Moduł 10 — Gesprächspläne und Debriefings

### PO CO TO

Vor dem Treffen notierst du deinen Gesprächsplan: was du fragst,
was du zeigst, worauf es dir ankommt. Nach dem Treffen schreibst du
ein Debriefing – die Details landen in der Notiz, bevor der Rest
des Tages sie verdrängt.

### CZEGO NIE ROBI

Catherly schreibt weder den Plan noch das Debriefing für dich – du
schreibst beides selbst, in deinen eigenen Worten.

---

## Sekcja kierunku — KI-Assistent

### Treść

Mit dem KI-Assistenten passt du Nachrichten an eine konkrete Person
an.

### Granica

Der Assistent schreibt den Text nicht an deiner Stelle – er macht
Vorschläge, du schreibst.

### Oznaczenie statusu (człon H2)

– Ausblick

*(człon doklejany do H2 sekcji jako jeden węzeł tekstowy — odpowiednik
oznaczenia z indeksu /funkcje, wymuszony strażnikiem S-SYMETRIA: kotwica
#asystent-ai jest kontraktem publicznym, więc wejście bezpośrednie
omija indeks. Obszar tu NIE wchodzi — wynika z kontekstu strony.
BRZMIENIE ROZSTRZYGNIĘTE 2026-08-14 (panel językowy DE wf_d4b3c933-758):
sam rzeczownik, bez obszaru — jak w pl i en.)*


---

## Etykieta okruszków (mikrotekst nawigacji)

Du bist hier

**Sankcja właściciela 2026-08-12 (akcept Etapu B)** — wraz z etykietą bieżącego okruszka.
