# Inwentarz funkcji Catherly — źródło prawdy obietnic strony

**Zmierzony:** 2026-08-09 przez sceptyka. Wersja aplikacji: git 61a69c9c.
Dziedzin: 11 · Pozycji: 105 · Bilans: 38 DZIAŁA / 56 CZĘŚCIOWE / 11 SZKIELET.
Zero zmian w kodzie — cała praca na odczyt, drzewo git czyste na 61a69c9c.

---

## ⚠️ Zastrzeżenie nadrzędne (czytaj przed sekcją 1)

Warstwa /api/v1/\* domyślnie wymaga aktywnej subskrypcji
(withAPI → requireSubscription: true). Klucz Stripe to atrapa, więc dziś
żadna klientka nie wykupi dostępu — czyli nic z sekcji 1 nie jest dla niej
osiągalne. To nie wada tych funkcji, to warunek wstępny dla wszystkich.
Poniższe listy mówią „co jest zbudowane", nie „co klientka dostanie jutro".

---

## Sekcja 1 — DZIAŁA end-to-end (38)

Ekran + serwis + realny zapis do bazy, zero zewnętrznych kluczy.

### Praca z ludźmi i czasem (6)

Kalendarz (planowanie, przypomnienie 30 min przed) · Subskrypcja kalendarza
w telefonie + eksport kontaktów do vCard · Zadania · Dzienny Plan Działania
(DMO) · Pulpit z 13 równoległymi zapytaniami · Ściana sukcesów (/recognition)

### Formularze i pozyskiwanie (2)

Kreator formularzy z publiczną stroną /l/[slug] → zgłoszenia lądują w CRM ·
QR polecający w eksportach Studia

### Studio i treść (8)

Galeria projektów z CRUD · Edytor canvas (Fabric.js: warstwy, prowadnice,
siatka, strefy bezpieczne, auto-układ) · Wachlarz formatów · Katalog
szablonów z wersjonowaniem · Tablica postów z filtrami · Workflow
zatwierdzania (submit → PENDING → LIDER akceptuje/odrzuca, kaskada do
struktury) · Kalendarz publikacji · Menedżer zestawów hashtagów

### Psychika i etyka (10)

Tarcza (wykrywanie ryzykownych sformułowań — reguły lokalne, bez AI) ·
Pieczęć Etyczna 0–100 + publiczny certyfikat z QR · Świadectwo (rejestr
SHA-256, eksport CSV) · Rejection Dojo · Wall of Proof · Pre-game Ritual ·
Warm Circle · Ognisko · Zdrowy nawyk (żetony łaski, łagodny powrót po
przerwie) · Cele z kamieniami milowymi

### Nauka i gamifikacja (4)

Pierwsze 90 Dni (silnik misji, 4 fazy, zero AI) · Akademia (LMS
z sekwencyjnym odblokowaniem) · Osiągnięcia (18 reguł odznak, seria
z tokenami łaski) · Paszport zgodności (4 jurysdykcje, skaner regex)

### Onboarding i AI-lokalne (8)

Kreator wdrożeniowy 6 kroków · Magic Wrapped (podsumowanie z 7 zapytań) ·
Strumień zdarzeń SSE · Uczenie profilu głosu marki z opublikowanych postów ·
Sesje symulatora (CRUD) · Biblioteka obiekcji (7 kategorii) · Program
poleceń z kodem i śledzeniem · Odczyt planów rozmów i debriefów

---

## Sekcja 2 — CZĘŚCIOWE (56)

### Tabela przyczyn

| Przyczyna | Ile funkcji | Koszt naprawy |
|---|---|---|
| Pusty klucz Anthropic | 21 | Wpisanie klucza. Zero kodu. |
| Bramka planu (GROWTH/PRO) | 11 | Nic — działa zgodnie z projektem, ale wymaga Stripe |
| Atrapa klucza Supabase Storage | 8 | Wpisanie klucza + założenie kubełków |
| Atrapa klucza Resend | 5 | Konto Resend + weryfikacja domeny |
| Brak zgody platformy (Meta/TikTok/Pinterest/Google) | 6 | Tygodnie. Możliwa odmowa. |
| Brakujący element interfejsu | 5 | Realna praca inżynierska |

### Pięć braków UI (wymagają kodu — nie odblokuje klucz)

1. **Sekwencje** — brak przycisku „uruchom dla tej osoby". Silnik, trasa
   i harmonogram istnieją; UI ich nie woła.
2. **Ścieżka duplikacji** — przypisanie wymaga wklejenia wewnętrznego ID,
   którego nigdzie w panelu nie widać. Funkcja praktycznie nieosiągalna.
3. **Kapsułka Przyszłości** — brak ekranu odtwarzania. Powiadomienie
   „kapsułka otwarta" prowadzi do pustej nagrywarki.
4. **Granica** — brak przycisku „ta osoba prosiła, żeby nie pisać". Blokada
   działa we wszystkich kanałach, ale nikogo nie da się na nią wpisać ręcznie.
5. **Identity Reframe** — nie da się ustawić celu tożsamościowego; pole zawsze
   puste, przez co pasek w Zdrowym nawyku w ogóle się nie rysuje.

Dwa dodatkowe braki UI: wyzwań nie może tworzyć użytkowniczka (tylko admin
przez API), a pytań quizu nie da się edytować (zakodowane w pliku).

---

## Sekcja 3 — SZKIELET (11)

**Wyłączone świadomie (flaga false):** Thriving Lifestyle — nie ma go nawet
w menu. Nie umieszczać na stronie nawet jako „wkrótce".

**Czeka na klucz, kod gotowy:** Google Calendar + Meet · Generowanie szablonów
AI · Wgrywanie do biblioteki mediów · Głos ElevenLabs w symulatorze · Ścieżka
notatek głosowych (Whisper) · Webhook Meta dla WhatsApp (pełna implementacja
z weryfikacją podpisu — brakuje tylko rejestracji)

**Nie istnieje w kodzie:** /magic (sam katalog) · /magic/gotowy bez
identyfikatora sesji · /onboarding bez numeru kroku — trzy adresy, które
ktoś mógłby wpisać z ręki i trafić na 404.

**Martwe podwójnie:** faktyczna publikacja na social — brak CRON_SECRET
(każdy automat zwraca 500) i brak podłączonych kont.

---

## Sekcja 4 — Główne przepływy

**1. Pierwsze wejście** — rejestracja → 6 kroków kreatora (profil, cele,
social, zaproszenie) → pulpit z rytuałem dnia, briefingiem i statystykami.
✅ Działa w całości. Briefing będzie szablonowy, ale zna prawdziwe liczby.

**2. Zdobycie kontaktu** — formularz/tag QR/quiz → publiczna strona (bez
logowania, z ochroną przed botami i dziennym limitem) → zgłoszenie ląduje
w CRM → automatyzacja nadaje etykietę i zakłada follow-up w kalendarzu.
⚠️ Publiczna część działa. Tworzenie tagów i quizów wymaga GROWTH.
Powiadomienie o nowym zgłoszeniu przyjdzie tylko w aplikacji — mailem nie.

**3. Treść od pomysłu do publikacji** — brief → generowanie → Studio
(edytor) → Tarcza sprawdza zgodność → zatwierdzenie przez lidera →
zaplanowanie w kalendarzu → publikacja.
❌ Przepływ urywa się na ostatnim kroku. Wszystko do zaplanowania działa;
post zostaje w bazie ze statusem „zaplanowany" i nigdzie nie wychodzi.
Generowanie zwróci tekst zapasowy, nie napisany pod nią.

**4. Prowadzenie zespołu** — import wyciągu z FL → drzewo struktury → Puls
(ryzyko odejścia + gotowe zdanie otwierające) → rozmowa → debrief.
⚠️ Wymaga GROWTH w trzech miejscach naraz. Import pliku nie zadziała
(magazyn). Bez importu ekrany są puste.

**5. Dbanie o siebie** — rytuał poranny → Dojo po odmowie → Wall of Proof
w gorszy dzień → Oddech wykrywa wypalenie z nocnych wysyłek → wieczorne
domknięcie.
✅ Jedyny przepływ działający w 100% bez czegokolwiek z zewnątrz.
Najmocniejsza, w pełni gotowa część produktu.

---

## Sekcja 5 — Czego Catherly nie robi

- Nie wyśle ani jednego e-maila (Resend atrapa — wszystko kończy się
  statusem „nieudana").
- Nie opublikuje nic na Instagramie, TikToku, Facebooku, Pintereście ani
  YouTube (zaplanuje — tak; wyśle — nie).
- Nie przyjmie płatności (Stripe atrapa).
- Nie wyśle WhatsAppa ani SMS-a.
- Nie wygeneruje PDF-a — brakuje biblioteki puppeteer (dotyczy faktur
  i raportów).
- Nie przyjmie żadnego pliku (zdjęć, nagrań, wyciągów z FL).
- Nie napisze tekstu za nią — każde „AI" zwróci tekst zapasowy.
- Nie ma automatów — 30 zadań cyklicznych zwróci 500 bez CRON_SECRET.
- Nie hostuje wideo — tylko odnośniki do YouTube/Vimeo.
- Nie odtworzy kapsułki, którą sama nagrała (brak ekranu odtwarzania).
- Nie ma treści szkoleniowych — infrastruktura kompletna, baza pusta.
- Produkty FL nie mają zdjęć (imageUrl puste dla wszystkich ~30 pozycji).
- Partner biegu wymaga drugiej osoby szukającej w tej samej chwili.
- Ognisko pokazuje zero komuś bez zbudowanego zespołu.

---

## Dwa rozjazdy do rozstrzygnięcia przed publikacją strony

**Rozjazd 1 — Kalendarz vs. cennik:**
prisma/seed.ts:86 wymienia „Integracja kalendarza" jako wyróżnik planu
Growth, a kalendarz nie ma żadnej bramki i działa na Starterze. Albo
cennik obiecuje nieistniejący wyróżnik, albo kodowi brakuje bramki.
Rozstrzyga właściciel przed opisem planów na /cennik.

**Rozjazd 2 — Uczciwe Lustro / rozkład dochodów FL:**
Rozkład (73/18/6/2/1%) jest wpisany na stałe z komentarzem
„⚑ docelowo import oficjalnego CSV z FL". Sam ekran pisze „szacunek".
Na stronie: nigdy jako oficjalne dane Forever Living.
