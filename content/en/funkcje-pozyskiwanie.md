# /funkcje/pozyskiwanie — EN (adaptacja; Faza 4 Etap B)

**Status: OBOWIĄZUJE — adaptacja po panelu EN, na polecenie
właściciela (D-B1/D-B2, 2026-08-12).**
Źródło: content/pl/funkcje-pozyskiwanie.md.
Historia korekt: docs/faza-4/rejestr-korekt-tresci.md.

---

## Rama

### H1 (F2)

In the morning, you see who to reach out to.

### Zdanie korzyści

You have a plan for the day and a contact base that grows while you
do the talking.

### F8

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


**Link:** See pricing → /cennik (ścieżki ujednolicone; etykieta
„See pricing" — decyzja panelu: bez „full", skrótu nie ma na
podstronie)

### F9

Next: Content → *(lewy slot pusty)*

### F10

**CTA:** See how it works → /login
**Zdanie:** You can cancel at any time.

---

## Moduł 1 — Sign-up form with a public page

### PO CO TO

A friend asks you about working together, and instead of copying
her details out of your messages, you send her the link to your
form. She fills it in on a public page — and the submission goes
straight into your contact base.

### CZEGO NIE ROBI

Catherly won’t email you about a new submission — you see completed
submissions in the app.

## Moduł 2 — Calendar with reminders

### PO CO TO

Your conversation dates don’t have to live in your head. You plan
contacts in the calendar, and 30 minutes before each conversation
Catherly reminds you about it.

### CZEGO NIE ROBI

Reminders don’t come by email or text message.

## Moduł 3 — Calendar subscription on your phone

### PO CO TO

You glance at the calendar on your phone and see the conversations
planned in Catherly next to everything else in your day. You don’t
copy anything over — what you’ve planned is simply there.

### CZEGO NIE ROBI

The subscription works one way, toward your phone — Catherly
doesn’t read your private calendar and takes nothing from it.

## Moduł 4 — Contact export to vCard

### PO CO TO

You’re heading to a meeting and want your customer’s number where
it always is — on your phone. With one click you export your
contacts to vCard, and you have them at hand even without opening
the app.

### CZEGO NIE ROBI

The export works one way — there’s no bulk import; you add contacts
by hand or through the form.

## Moduł 5 — Referral QR code

### PO CO TO

You finish a conversation and leave a business card — with your
referral QR code on it instead of an address to retype. You create
it in Catherly and add it to your materials and business cards when
you export them.

### CZEGO NIE ROBI

Catherly doesn’t publish or send out materials with your code for
you — you get a ready export, and you decide where the graphic or
the printout goes.

## Moduł 6 — Referral program with tracking

### PO CO TO

You hand a friend an invitation with your code and get back to your
day. You see in Catherly who used it — no need to keep asking
whether anything came of it.

### CZEGO NIE ROBI

Catherly sends nothing to your friends — you pass the invitation on
yourself, and the program only shows who used it.

## Moduł 7 — DMO — Daily Action Plan

### PO CO TO

A day planned in the Daily Action Plan starts with something
concrete — you don’t wonder what’s next, you call, you write, you
talk. Your plan carries you through the day.

### CZEGO NIE ROBI

The Daily Action Plan sends nothing for you — you call the people
on your plan and write to them yourself.

## Moduł 8 — Tasks

### PO CO TO

After a conversation you save a task with the person it concerns:
call back after the weekend, send the catalog, ask about the
decision. You come back to the contact, and what you agreed is
right there with it.

### CZEGO NIE ROBI

Catherly won’t remind you about a task by email — your task list is
in the app.

## Moduł 9 — Training Room

### PO CO TO

Before a hard conversation, you step into the Training Room and
give it a dry run — the objection comes up here first, not in front
of your customer. You take your answers from a library of
objections sorted into seven categories.

### CZEGO NIE ROBI

The Training Room doesn’t talk to your customer and sends her
nothing — you practice here on your own, and it’s you who leads the
real conversation.

## Moduł 10 — Conversation plans and debriefs

### PO CO TO

Before a meeting you write down a conversation plan: what you’ll
ask, what you’ll show, what matters to you. After the meeting you
write a debrief — the details go into the note before the rest of
the day pushes them out.

### CZEGO NIE ROBI

Catherly won’t write the plan or the debrief for you — you write
them yourself, in your own words.

---

## Sekcja kierunku — AI assistant

### Treść

With the AI assistant, you tailor messages to a specific person.

### Granica

The assistant won’t write the text for you — it suggests, you
write.

### Oznaczenie statusu (człon H2)

— a direction

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

You are here

**Sankcja właściciela 2026-08-12 (akcept Etapu B)** — wraz z etykietą bieżącego okruszka.
