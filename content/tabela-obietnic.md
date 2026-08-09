# Tabela obietnic — catherly.com

**Status: PROJEKT — do akceptu właściciela (DECYZJA 2).**
Źródło: content/inwentarz-funkcji.md (git 61a69c9c, 2026-08-09).
Gramatyka: DZIAŁA → tryb dokonany · klucz → język kierunku (bez
dokonanego) · zgoda platformy → zdanie z zastrzeżeniem · SZKIELET
i wyłączone flagą → milczenie (nie ma ich w tej tabeli).

Zastrzeżenie nadrzędne (inwentarz sekcja 0): wszystko poniżej zakłada
aktywną subskrypcję Stripe. Bez niej żadna funkcja API nie jest dostępna.

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
| Kalendarz + przypomnienie 30 min przed | Planujesz kontakty w kalendarzu i dostajesz przypomnienie 30 minut przed każdą rozmową. |
| Subskrypcja kalendarza w telefonie | Twój kalendarz Catherly synchronizuje się z telefonem. |
| Eksport kontaktów do vCard | Eksportujesz kontakty do telefonu jednym kliknięciem. |
| QR polecający w eksportach Studia | Tworzysz kod QR polecający do materiałów i wizytówek. |
| Program poleceń z kodem i śledzeniem | Śledzisz, kto skorzystał z twojego zaproszenia. |
| DMO — Dzienny Plan Działania | Planujesz dzień w Dziennym Planie Działania. |
| Zadania | Zarządzasz zadaniami powiązanymi z kontaktami. |
| Symulator rozmów + biblioteka obiekcji (7 kategorii) | Ćwiczysz trudne rozmowy w symulatorze z odpowiedziami na obiekcje. |
| Odczyt planów rozmów i debriefów | Zapisujesz plany rozmów i piszesz debriefe po spotkaniach. |

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
| Kreator wdrożeniowy 6 kroków | Wdrażasz nową osobę przez 6-krokowy kreator — profil, cele, materiały, zaproszenie. |
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
| Magic Wrapped (7 zapytań) | Magic Wrapped podsumowuje twój okres: co zrobiłaś, co sprzedałaś, co w zespole. |
| Cele z kamieniami milowymi | Wyznaczasz cele i śledzisz postęp kamieniami milowymi. |
| Ściana sukcesów (/recognition) | Rejestrujesz i świętuj sukcesy swoje i zespołu. |
| Świadectwo (SHA-256, eksport CSV) | Twoja historia aktywności zabezpieczona podpisem SHA-256 — eksportujesz CSV kiedy chcesz. |
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
