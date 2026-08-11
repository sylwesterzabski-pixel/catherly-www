# Zlecenia do okna aplikacji

Status: **Z1–Z4 WYKONANE i ROZSTRZYGNIĘTE 2026-08-09** (wykonane
odczytowo za zgodą właściciela na repo aplikacji; raport z dowodami:
docs/faza-2/raport-zlecen-z1-z4.md; rozstrzygnięcia właściciela +
panel: docs/faza-2/projekt-zmian-po-z1-z4.md). Warunek DECYZJI 4
spełniony — tabela /cennik ma limity (egzekwowane), FAQ-faktura
rozstrzygnięta jako milczenie warunkowe (rejestr warunków powrotu).
Z5 pozostaje OTWARTE po stronie aplikacji.

---

## Z1 — tekst do wklejenia

Inwentarz funkcji (sekcja 2) podaje: „Bramka planu (GROWTH/PRO) —
11 funkcji", ale nie wymienia listy. Do tabeli porównawczej na
/cennik potrzebuję:

1. Pełnej listy wszystkich funkcji z bramką planu, z podziałem:
   które wymagają GROWTH, a które PRO. Dla każdej: nazwa funkcji,
   plik/miejsce bramki w kodzie (żeby dało się zweryfikować).
2. Wszystkich limitów LICZBOWYCH per plan, jeśli istnieją w kodzie
   (np. liczba kontaktów, postów, osób w zespole, formularzy).
   Interesują mnie wyłącznie limity egzekwowane w kodzie — nie
   zapisy z seed/cennika. Jeśli limitu nie ma w kodzie, napisz
   wprost „bez limitu w kodzie".
3. Rozstrzygnięcia, czym plan PRO różni się od GROWTH w kodzie
   (jakie funkcje/limity są bramkowane wyłącznie na PRO). Jeśli
   niczym — napisz to wprost, bo wtedy karta planu Pro na stronie
   nie ma czym się różnić i to jest decyzja produktowa, nie treściowa.
4. Kto przechodzi program „Pierwsze 90 Dni": czy fazy i misje
   uruchamiają się dla KAŻDEJ nowej użytkowniczki po rejestracji,
   czy wyłącznie dla osoby wprowadzanej do zespołu przez liderkę?
   Odpowiedź rozstrzyga treść sekcji obaw na stronie (Para 1 mówi
   dziś: „Pierwsze 90 Dni dają ci gotowy plan na start" — jeśli
   program działa tylko dla członkiń zespołu, to zdanie wymaga
   korekty).

Formatuj jak inwentarz: tabela funkcja → bramka → miejsce w kodzie.
Zero szacunków — tylko to, co widać w kodzie.

---

## Z2 — tekst do wklejenia

Aplikacja nie generuje PDF (brak puppeteer), więc strona milczy
o fakturach. Do FAQ na /cennik potrzebuję rozstrzygnięcia:

1. Czy konfiguracja Stripe (Checkout/Billing) ma włączone
   wystawianie faktur lub rachunków przez Stripe (Customer Portal,
   invoice_creation, wysyłka mailem przez Stripe)? Sprawdź
   w konfiguracji konta/kodu, nie w dokumentacji Stripe.
2. Jeśli tak — co dokładnie dostaje klientka po płatności (faktura
   VAT z NIP? paragon/receipt? tylko potwierdzenie mailowe?)
   i czy działa to w trybie testowym end-to-end (dowód: wykonany
   testowy zakup i otrzymany dokument, nie przekonanie).
3. Jeśli nie — czy planujemy włączyć invoice_creation przed premierą?
   To decyzja właściciela; strona do tego czasu o fakturach milczy.

Wynik wraca jako: DZIAŁA (z dowodem) / NIE DZIAŁA / DECYZJA.

---

## Z3 — tekst do wklejenia (kontrakt szwu: nazwy funkcji app ↔ www)

Strona www używa nazw funkcji w trzech językach. Nazwy na stronie
i w aplikacji muszą być IDENTYCZNE — rozjazd oznacza, że
użytkowniczka nie odnajdzie po zalogowaniu tego, co obiecała strona.
Potrzebuję:

1. Listy nazw funkcji widocznych w interfejsie aplikacji (dokładnie
   tak, jak widzi je użytkowniczka) dla języków, które aplikacja
   obsługuje: PL na pewno; czy istnieje i18n EN i DE? Jeśli tak —
   pełne odpowiedniki z plików tłumaczeń.
2. Weryfikacji przeciwko tabeli www (poniżej): potwierdź zgodność
   albo zwróć faktyczne nazwy z aplikacji dla każdej pozycji.
3. Jeśli aplikacja NIE ma i18n EN/DE — napisz to wprost. Wtedy
   decyzja właściciela: nazwy ze strony www stają się wzorcem dla
   przyszłego i18n aplikacji (kontrakt w drugą stronę).

Tabela www (PL → EN → DE):
Tarcza → Shield → Schutzschild · Pieczęć Etyczna → Ethical Seal →
Ethik-Siegel · Puls → Pulse → Puls · Pulpit → Dashboard → Dashboard ·
Świadectwo → Record → Nachweis · Kreator wdrożeniowy → onboarding
wizard → Einstiegsassistent · Pierwsze 90 Dni → First 90 Days →
Die ersten 90 Tage · DMO — Dzienny Plan Działania → DMO — Daily
Method of Operation → Tagesplan (DMO) · Studio → Studio → Studio ·
Symulator rozmów → Conversation Simulator → Gesprächssimulator ·
Formularz zgłoszeniowy → Sign-up form → Anmeldeformular · Paszport
zgodności → Compliance Passport → Compliance-Pass · Magic Wrapped
i Wall of Proof — bez zmian we wszystkich językach.

Dodatkowo: czy routing aplikacji przewiduje ścieżki rejestracji
per język (/rejestracja, /register, /registrierung), czy jeden
uniwersalny adres? Strona buduje CTA „Wybierz plan" wg odpowiedzi.

---

## Z4 — tekst do wklejenia (lokalizacja danych + szyfrowanie)

Do potwierdzeń pod hero i cennikiem, sekcji obaw oraz przyszłej
podstrony /bezpieczenstwo potrzebuję FAKTÓW z mechanizmem (nie
zapewnień). Sprawdź w konfiguracji Supabase (dashboard projektu),
nie w dokumentacji ogólnej:

1. Region bazy danych: jaki dokładnie region Supabase jest
   skonfigurowany dla projektu (np. eu-central-1 Frankfurt)?
   Zrzut/odczyt z ustawień projektu jako dowód.
2. Szyfrowanie: czy dane są szyfrowane w spoczynku (at rest)
   i w tranzycie (TLS)? Co dokładnie zapewnia plan Supabase,
   na którym jest projekt?
3. Kopie zapasowe: czy są włączone, gdzie leżą (region), jak długo
   są trzymane?
4. Dostęp: kto ma dostęp do produkcyjnej bazy (konta, role,
   service keys)? Czy klucze serwisowe są poza repozytorium?

Wynik per punkt: FAKT (z miejscem odczytu) / NIE WIEM. Bez „NIE
WIEM" zamienionego na przypuszczenie. Od odpowiedzi na pkt 1 zależy,
czy strona może napisać „Dane w UE" — dziś tego nie pisze.

---

## Powiązane, zgłoszone wcześniej (nie blokują /cennik po stronie www)

- **Z5 — rozjazd kalendarza**: prisma/seed.ts:86 wymienia „Integracja
  kalendarza" jako wyróżnik Growth, a kalendarz nie ma bramki i działa
  na Starterze. Strona już stosuje regułę twardą (kalendarz w każdym
  planie); kod/seed do wyrównania po stronie aplikacji.

---

## Z6 — tekst do wklejenia (Etap D www: zrzuty filarów; 2026-08-11)

Strona główna catherly.com pokazuje cztery filary z PRAWDZIWYMI
ekranami aplikacji (ADR-011 www: zero mockupów, zero upiększeń —
jeśli ekran jest brzydki, to informacja dla aplikacji, nie do
retuszu na stronie). Potrzebuję czterech zrzutów z Playwrighta
na danych demo:

| # | Ekran | Co w kadrze |
|---|---|---|
| 1 | DMO / plan dnia | lista rozmów na dziś (3–5 pozycji demo) |
| 2 | Studio z Tarczą | edytor treści z widocznym zaznaczeniem ryzykownego sformułowania przez Tarczę |
| 3 | Pierwsze 90 Dni | widok faz i misji nowej osoby |
| 4 | Pulpit | stan dnia |

Wymagania twarde:
1. Playwright na DZIAŁAJĄCEJ aplikacji, dane demo z seedu —
   wyłącznie neutralne, wymyślone nazwy osób i zespołów; zero
   danych rzeczywistych osób, zero nazw realnych firm branży.
2. Viewport 1024×640, deviceScaleFactor 2 (wynik 2048×1280 =
   proporcja 16:10), format PNG (surowy — kompresję i warianty
   robi pipeline www). Pełny naturalny widok ekranu w TYM oknie
   (widok responsywny aplikacji to nadal prawdziwy ekran —
   DECYZJA 9 właściciela 2026-08-11; bez kadrowania fragmentów
   i bez retuszu). Inny wymiar wyjściowy niż 2048×1280 = odrzut
   przy odbiorze.
3. Pulpit (zrzut 4): wartości demo umiarkowane — bez liczb
   sugerujących konkretne zarobki.
4. Nazwy plików: z6-filar-1-dmo.png, z6-filar-2-studio-tarcza.png,
   z6-filar-3-pierwsze-90-dni.png, z6-filar-4-pulpit.png.
5. Raport pochodzenia do każdego zrzutu: trasa (URL wewnętrzny),
   użyty seed, hash commita aplikacji — dla śladu w
   design/obrazy-robocze/ po stronie www.
6. Jednolinijkowe potwierdzenie nazw: czy „Wall of Proof"
   (/psychika/proof — osobista oś sukcesów) i „Ściana sukcesów"
   (zakładka /recognition — zespołowa) to na pewno DWIE różne
   funkcje o tych nazwach w bieżącym kodzie? (Sankcjonowany
   odczyt i18n 2026-08-11 tak wskazuje — proszę o potwierdzenie
   ze strony aplikacji.)

Zero szacunków i zero mockupów — tylko to, co realnie renderuje
aplikacja.
