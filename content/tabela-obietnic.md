# Tabela obietnic — catherly.com

**Status: OBOWIĄZUJE — zaakceptowana przez właściciela 2026-08-09 (DECYZJA 2).**
Korekta techniczna 2026-08-12 (zgoda właściciela, A-3 Fazy 4): nazwy
[2026-08-13, D-C3: „podpisem”→„odciskiem” SHA-256 — suma kontrolna ≠ podpis]
wg słownika + literówki w treściach obietnic — zero zmiany sensu.
Źródło: content/inwentarz-funkcji.md (git 61a69c9c, 2026-08-09).
Gramatyka: DZIAŁA → tryb dokonany · klucz → język kierunku (bez
dokonanego) · zgoda platformy → zdanie z zastrzeżeniem · SZKIELET
i wyłączone flagą → milczenie (nie ma ich w tej tabeli).

Zastrzeżenie nadrzędne (inwentarz sekcja 0): wszystko poniżej zakłada
aktywną subskrypcję Stripe. Bez niej żadna funkcja API nie jest dostępna.

AKTUALIZACJA 2026-08-09 (po zleceniu Z1): sekcja „Bramki planów
i limity" na końcu pliku — zastępuje szacunek „11 funkcji z bramką"
faktami z kodu. Nazwy funkcji wg słownika (docs/faza-2/slownik-nazw.md
— OBOWIĄZUJE): Magic Wrapped → Twój Wrapped, Symulator rozmów →
Sala Treningowa, Puls → Puls zespołu.

Reguły twarde (decyzja właściciela 2026-08-09):
- Kalendarz NIE jest wyróżnikiem planów na /cennik (rozjazd cennik↔kod
  czeka na rozstrzygnięcie po stronie aplikacji).
- Rozkład dochodów FL nigdy jako „oficjalne dane Forever Living".
- Kapsułka Przyszłości — milczenie do czasu ekranu odtwarzania.
- Thriving Lifestyle — zero wzmianek, nawet „wkrótce".

---

## Filar 1: KONTAKTY

### Można obiecać (tryb dokonany)

| Funkcja | Obietnica strony |
|---|---|
| Formularz z publiczną stroną /l/[slug] → CRM | Tworzysz własny formularz zgłoszeniowy z publiczną stroną — wypełnione zgłoszenia trafiają prosto do twojej bazy kontaktów. |
| Kalendarz + przypomnienie w ostatnich 30 min przed rozmową | Planujesz kontakty w kalendarzu i dostajesz przypomnienie w ostatnich 30 minutach przed rozmową. |
| Subskrypcja kalendarza w telefonie | Twój kalendarz Catherly synchronizuje się z telefonem. |
| Eksport kontaktów do vCard | Eksportujesz kontakty do telefonu jednym kliknięciem. |
| QR polecający w eksportach Studia | Tworzysz kod QR polecający do materiałów i wizytówek. |
| Program poleceń z kodem i śledzeniem | Śledzisz, kto skorzystał z twojego zaproszenia. |
| DMO — Dzienny Plan Działania | Planujesz dzień w Dziennym Planie Działania. |
| Zadania | Zarządzasz zadaniami powiązanymi z kontaktami. |
| Sala Treningowa + biblioteka obiekcji (7 kategorii) | Ćwiczysz trudne rozmowy w Sali Treningowej z odpowiedziami na obiekcje. |
| Odczyt planów rozmów i debriefów | Zapisujesz plany rozmów i piszesz debriefy po spotkaniach. |

### Język kierunku (klucz Anthropic — 21 funkcji; zero kodu)

| Funkcja | Obietnica strony |
|---|---|
| Asystent AI — personalizacja wiadomości | Z asystentem AI dostosowujesz wiadomości do konkretnej osoby. |

### Milczenie — nie umieszczać na stronie

- E-mail o nowym zgłoszeniu — Resend atrapa; wyśle gdy klucz Resend aktywny
  (prawda, ale teraz milczymy o powiadomieniach e-mail).
- Sekwencje kontaktowe — brak przycisku UI; silnik gotowy, niedostępna
  dla użytkowniczki.
- Granica (blokada osoby) — brak przycisku UI.
- WhatsApp, SMS — brak zgody platformy / SZKIELET.
- Integracje z kontami social do pozyskiwania — brak zgody platformy (6 funkcji;
  tygodnie, możliwa odmowa); nie obiecujemy.

---

## Filar 2: TREŚCI

### Można obiecać (tryb dokonany)

| Funkcja | Obietnica strony |
|---|---|
| Studio — edytor canvas (Fabric.js, warstwy, formaty) | Tworzysz grafiki i posty w edytorze ze strefami bezpiecznymi i auto-układem dla różnych formatów. |
| Szablony z wersjonowaniem | Korzystasz z gotowych szablonów i zapisujesz własne wersje. |
| Menedżer zestawów hashtagów | Zarządzasz zestawami hashtagów i dodajesz je jednym kliknięciem. |
| Kalendarz publikacji | Planujesz posty w kalendarzu. |
| Workflow zatwierdzania (lider akceptuje/odrzuca, kaskada) | Twoje treści trafiają do zatwierdzenia przez lidera — śledzisz status w czasie rzeczywistym. |
| Tarcza — reguły lokalne, bez wysyłania na zewnątrz | Tarcza sprawdza ryzykowne sformułowania przed publikacją — reguły działają lokalnie, treść nie opuszcza aplikacji. |
| Pieczęć Etyczna 0–100 + publiczny certyfikat z QR | Każdy projekt otrzymuje wynik etyczny z publicznym certyfikatem do pokazania klientce. |
| Uczenie profilu głosu marki | System uczy się twojego stylu z opublikowanych postów. |
| Tablica postów z filtrami | Przegląd wszystkich postów z filtrowaniem i statusami. |

### Język kierunku (klucz Anthropic — zero kodu, wpisanie klucza wystarczy)

| Funkcja | Obietnica strony |
|---|---|
| Generowanie treści AI | Z asystentem AI piszesz i edytujesz treści — on proponuje, ty decydujesz. |

Uwaga do copywritera: nie pisać „AI napisze za ciebie" ani „spersonalizowane
treści" — tryb dokonany niedozwolony bez klucza Anthropic. Obietnica dotyczy
kierunku (asystent proponuje), nie efektu końcowego.

### Milczenie — nie umieszczać na stronie

- Automatyczna publikacja na IG/TikTok/FB/Pinterest/YouTube — martwe podwójnie
  (brak CRON_SECRET + brak podłączonych kont + brak zgody platformy).
  Catherly zaplanuje post — wyśle gdy podłączysz konto I platforma wyrazi zgodę.
  **Żadnej obietnicy publikacji na stronie.**
- Wgrywanie zdjęć i plików — Storage atrapa; milczenie.
- Głos ElevenLabs — SZKIELET; milczenie.
- Kapsułka Przyszłości — decyzja właściciela: milczenie.

---

## Filar 3: ZESPÓŁ

### Można obiecać (tryb dokonany)

| Funkcja | Obietnica strony |
|---|---|
| kreator wdrożeniowy (6 kroków) | Wdrażasz nową osobę przez 6-krokowy kreator — profil, cele, materiały, zaproszenie. |
| Workflow zatwierdzania treści (kaskada do struktury) | Zatwierdzasz treści swojego zespołu — wszystkie zmiany statusu widoczne w czasie rzeczywistym w całej strukturze. |
| Pierwsze 90 Dni (4 fazy, silnik misji) | Prowadzisz nową osobę przez Pierwsze 90 Dni z misjami i fazami. |
| Osiągnięcia (18 reguł odznak, seria z tokenami łaski) | Gamifikacja motywuje zespół: odznaki, serie i żetony łaski przy powrocie po przerwie. |
| Paszport zgodności (4 jurysdykcje, skaner regex) | Sprawdzasz zgodność komunikacji z wymogami w czterech jurysdykcjach. |
| Akademia — infrastruktura LMS | Akademia z sekwencyjnym odblokowaniem modułów jest gotowa — treści szkoleniowe dodaje administrator. |

### Język kierunku (bramka GROWTH — wymaga Stripe)

| Funkcja | Obietnica strony (tylko w opisie planu GROWTH) |
|---|---|
| Puls — ryzyko odejścia + zdanie otwierające | W planie Growth widzisz sygnały ryzyka odejścia i dostajesz gotowe zdanie otwierające rozmowę. |
| Drzewo struktury | W planie Growth masz widok całego drzewa struktury. |

### Milczenie — nie umieszczać na stronie

- Import wyciągu z FL — Storage atrapa + bramka GROWTH; ekrany puste bez importu.
- Wyzwania — tworzy tylko admin przez API, nie użytkowniczka; milczenie.
- Quizy — pytań nie da się edytować; milczenie.
- Ognisko — bez zbudowanego zespołu pokazuje zero; nie obiecywać
  „zobaczysz swoją społeczność" na Starterze.
- Partner biegu — wymaga drugiej osoby szukającej w tej samej chwili;
  na starcie nie zadziała; milczenie.
- Treści szkoleniowe — baza pusta; można pisać o infrastrukturze Akademii
  (j.w.), nie o treściach.

---

## Filar 4: WYNIKI

### Można obiecać (tryb dokonany)

| Funkcja | Obietnica strony |
|---|---|
| Pulpit (13 równoległych zapytań) | Na pulpicie widzisz aktualny stan: sprzedaż, aktywne kontakty, aktywność zespołu — wszystko w jednym miejscu. |
| Twój Wrapped (7 zapytań) | Twój Wrapped podsumowuje twój okres: co zrobiłaś, co sprzedałaś, co w zespole. |
| Cel z kamieniami milowymi | Wyznaczasz cele i śledzisz postęp kamieniami milowymi. |
| Ściana sukcesów (/recognition) | Rejestrujesz i świętujesz sukcesy swoje i zespołu. |
| Świadectwo (SHA-256, eksport CSV) | Twoja historia aktywności zabezpieczona odciskiem SHA-256 — eksportujesz CSV kiedy chcesz. |
| Wall of Proof | Zbierasz dowody swojej pracy na Wall of Proof. |

### Milczenie / zastrzeżenia — nie umieszczać na stronie

- Raport PDF — brak biblioteki puppeteer (nie da się odblokować kluczem,
  wymaga kodu); milczenie.
- Rozkład dochodów FL (Uczciwe Lustro) — szacunek, nie oficjalne dane FL;
  jeśli pojawi się na stronie: wyłącznie jako „orientacyjny szacunek",
  nigdy jako „dane Forever Living".
- Puls — bramka GROWTH → kierunek jak w Filarze 3.

---

## Filar 5: ROZLICZENIA ⚠️

### Status: ŻADNA funkcja rozliczeniowa nie działa end-to-end

Inwentarz (sekcja 1): billing zdegradowany z 2 → **0** działających.
Inwentarz (sekcja 5): „Nie przyjmie płatności".

| Co istnieje | Status | Ocena |
|---|---|---|
| Ekran wyboru planu (Stripe UI) | Stripe atrapa | UI jest, nic nie przetwarza |
| Subskrypcja planów GROWTH/PRO | Stripe atrapa | CZĘŚCIOWE — klucz |
| Import wyciągu z FL | Storage atrapa + GROWTH | CZĘŚCIOWE — dwa klucze |
| Faktury PDF | Brak biblioteki puppeteer | BRAK KODU — nie da się odblokować kluczem |
| Rozliczenia w aplikacji | Zdegradowane | 0 działających |

### Można obiecać (kierunek — po uruchomieniu Stripe)

| Funkcja | Obietnica strony |
|---|---|
| Wybór i zmiana planu | Wybierasz plan i zmieniasz go kiedy chcesz. |

### Milczenie — nie umieszczać na stronie

- Faktury — brak puppeteer, milczenie.
- Rozliczenia z klientkami — zero mechanizmu.
- Import wyciągu FL — milczenie (Storage + GROWTH; ekrany puste bez importu).

---

## Sekcja 5 (inwentarza) — czego Catherly nie robi: lista do sekcji obawy

Poniższe prawdy są aktywami, nie wadami — uczciwość w obie strony
buduje zaufanie (karta tonu sekcja 3). Do użycia w sekcji obawy
(STRATEGIA pkt 24) i na /bezpieczenstwo.

- Nie wyśle e-maila — gdy Resend skonfigurowany, tak.
- Nie opublikuje posta automatycznie — zaplanuje; wyśle gdy konto social
  podłączone i platforma wyrazi zgodę.
- Nie napisze tekstu zamiast ciebie — asystent proponuje, ty piszesz.
- Nie przechowuje wideo — linki do YouTube/Vimeo.
- Dane leżą w UE (Supabase region EU) — do weryfikacji z właścicielem przed
  użyciem na stronie /bezpieczenstwo.

---

## Flagi z poprzednich paneli — rozstrzygnięcie inwentarzem

| # | Fraza | Werdykt |
|---|---|---|
| 1 | „co z tego jest twoje" (rozliczenia) | ⚠️ OSTROŻNIE: filar rozliczenia = 0 działających; fraza bezpieczna tylko jeśli rozumiana jako „co zarobiłaś" = Magic Wrapped / Świadectwo (wyniki). W S1/S2 definicji — redukować do „co się sprzedało". |
| 2 | „kiedy się odezwać" (kontakty) | ✅ Kalendarza reminder 30 min + DMO = pokryte; fraza bezpieczna. |
| 3 | „kto czeka na odpowiedź" | ⚠️ Nie ma funkcji statusu „otwartej rozmowy" w CRM; fraza do usunięcia z S1 definicji. |
| 4 | „przejmuje ich pracę" (D2) | ❌ Odrzucony przez panel; nie wchodzi do syntezy. |
| 5 | „porządkuje pracę zespołu" | ✅ Workflow zatwierdzania + Pierwsze 90 Dni = pokryte; fraza bezpieczna. |
| 6 | „widzisz (…) jak jej idzie" | ✅ Pulpit pokazuje aktywność per osoba z zespołu (13 zapytań); fraza bezpieczna. |

---

## Bramki planów i limity (Z1 — fakty z kodu; panel 2026-08-09)

Źródło: docs/faza-2/raport-zlecen-z1-z4.md (plik:linia per pozycja).
Mechanizm: assertPlanAtLeast, src/lib/api/plan-limits.ts:226.

### Nazywalne na stronie (zgodne z regułami milczenia)

| Funkcja | Bramka | Język strony |
|---|---|---|
| Puls zespołu | GROWTH | Kierunek: „W planie Growth widzisz sygnały ryzyka odejścia…" (na karcie Growth kwalifikator z kontekstu) |
| Drzewo struktury | GROWTH | Kierunek: „W planie Growth masz widok całego drzewa struktury." |
| Ranking | PRO | „Ranking — widzisz swoje miejsce na tle pozostałych osób" |
| Klucze API + webhooki | PRO | „Klucze API i webhooki — łączysz Catherly z własnymi narzędziami" |
| Czysty eksport (bez sygnatury polecającej) | PRO (perk) | „Czysty eksport — twoje materiały bez sygnatury polecającej" |

### Bramkowane, ale NIE nazywane na stronie

- Import wyciągu FL (GROWTH) — Storage atrapa; milczenie.
- Funkcje Thriving Lifestyle (Szept/Body&Mind/Tryb jazdy — GROWTH;
  eksport-książka — PRO) — TL: zero wzmianek (reguła twarda).
- Benchmarki, Liga zespołu, Hive Coach, Win Reel, Catherly
  Interactive, Stacks, Catherly Tag, raporty struktury i sponsora
  (GROWTH) — nieobecne w narracji strony; każde wejście = nowa
  obietnica → panel + decyzja właściciela (rejestr, poz. 12).

### Limity liczbowe (egzekwowane w kodzie; jedyne dozwolone w tabeli /cennik)

| Limit | STARTER | GROWTH | PRO |
|---|---|---|---|
| Kontakty | 50 | 200 | bez limitu |
| Zespół | 10 | 50 | bez limitu |
| Posty miesięcznie | 20 | 100 | bez limitu |
| Sesje Sali Treningowej miesięcznie | 5 | 30 | bez limitu |

Wykluczone z tabeli /cennik (decyzja właściciela + panel F1–F3):
strony www (limit nieegzekwowany), PDF (generator martwy), przestrzeń
na pliki 1/5/20 GB (Storage martwy), wywołania AI 100/500/∞ (klucz
pusty), platformy social 2/5/∞ (zgody platform) → rejestr warunków
powrotu (poz. 4–6).

### Rozstrzygnięcia towarzyszące

- Pierwsze 90 Dni: dla KAŻDEJ użytkowniczki (auto-enroll przy
  pierwszym wejściu; first90-service.ts:62–67) — Para 1 obaw i filar
  Zespół poprawne bez zmian. Fazy: Fundament/Rytm/Duplikacja/
  Przywództwo (4 — zgodnie z filarem Zespół).
- Kalendarz bez bramki w kodzie — potwierdzone; wiersz „w każdym
  planie" (rozjazd seed.ts:86 → zlecenie Z5, strona aplikacji).
- Karta Pro NIE zawiera „White label"/„Dedykowane wsparcie"/
  „Dashboard analityczny" (seed bez pokrycia w kodzie) ani funkcji TL
  (milczenie — panel F8: 3 nazwane funkcje zamiast „4", bo czwarta
  to TL).
