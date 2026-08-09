# Raport zleceń Z1–Z4 (wykonane odczytowo na repo aplikacji)

**Data:** 2026-08-09. **Tryb:** wyłącznie odczyt kodu
`fbo os/fbo-os` (zero zmian; sekrety nieodczytywane/niecytowane).
**Mechanika:** 4 równoległe agenty odczytowe. Dashboardy
(Stripe/Supabase) poza zasięgiem — oznaczone wprost.

---

## Z1 — bramki planów i limity: FAKTY

Mechanizm centralny: `assertPlanAtLeast` w src/lib/api/plan-limits.ts:226,
ranking STARTER<GROWTH<PRO (:223). Inwentarz mówił „11 funkcji z bramką"
— stan faktyczny: **20 funkcji bramkowanych serwerowo**.

### GROWTH (16): Benchmarki (benchmark-service.ts:101) · Pulse/digest
lidera (pulse-service.ts:242,271,333) · Liga zespołu
(league-service.ts:152,158,205) · GV rollup (gv-rollup-service.ts:101) ·
Import wyciągu FL (fl-import-service.ts:87) · Catherly Interactive
(interactive-service.ts:119) · Hive Coach (hive-service.ts:346,364,437) ·
Struktura Multi-FBO (structure-service.ts:161,285,404,482) · Catherly
Tag (tag-service.ts:132) · Stacks push (stack-service.ts:108) · Win Reel
(win-reel-service.ts:127,199) · Raporty struktury
(structure-report-service.ts:15) · Raport sponsora
(sponsor-report-service.ts:100) · TL Szept, TL Body&Mind, TL Tryb jazdy
(tl-plans.ts:25–27 + serwisy).

### Wyłącznie PRO (4): Ranking użytkowniczek
(gamification-service.ts:749) · Klucze API (api-key-service.ts:47) ·
Webhooki (webhook-service.ts:43) · TL eksport-książka
(tl-studio-bridge.ts:43). Perk PRO: czysty eksport bez sygnatury
referralowej (signature-service.ts:37).

### Limity liczbowe (PLAN_LIMITS, plan-limits.ts:8–48; -1 = bez limitu)

| Limit | STARTER | GROWTH | PRO | Egzekucja |
|---|---|---|---|---|
| Kontakty (candidates) | 50 | 200 | ∞ | TAK — candidate-service.ts:139 |
| Zespół | 10 | 50 | ∞ | TAK — team-service.ts:167 |
| Posty/mies. | 20 | 100 | ∞ | TAK — content-service.ts:86,134,159 |
| Wywołania AI/mies. | 100 | 500 | ∞ | TAK — 9 serwisów |
| PDF/mies. | 10 | 50 | ∞ | TAK — product-service.ts:306,394 |
| Platformy social | 2 | 5 | ∞ | TAK — social-connection-service.ts:76 |
| Sesje symulatora/mies. | 5 | 30 | ∞ | TAK — simulator-service.ts:42 |
| Storage | 1 GB | 5 GB | 20 GB | TAK — storage-quota.ts:23–54 |
| Strony www | 3 | 10 | ∞ | **BEZ EGZEKUCJI W KODZIE** |
| Wpisy TL/mies. | 300 | ∞ | ∞ | TAK (TL = milczenie na stronie) |

### Pierwsze 90 Dni — rozstrzygnięcie flagi

Program uruchamia się dla **KAŻDEGO konta z aktywną subskrypcją przy
pierwszym wejściu** (auto-enroll: first90-service.ts:62–67, 161–163;
bez bramki tieru; rejestracja/dodanie do zespołu NIE tworzy zapisu).
Fazy: Fundament 1–7, Rytm 8–30, Duplikacja 31–60, Przywództwo 61–90
(first90-missions.ts:41–47). Widok liderki „kto utknął":
first90-service.ts:315.
**Wniosek dla www: Para 1 obaw jest POPRAWNA (program dla niej) —
korekta NIEPOTRZEBNA. Filar Zespół też poprawny (nowa osoba z własnym
kontem ma własny program, liderka ma widok postępu).**

### Kalendarz (Z5) — potwierdzone

prisma/seed.ts:86 wymienia „Integracja kalendarza" jako wyróżnik GROWTH;
w kodzie ZERO bramek na kalendarzu (sprawdzono src/lib/calendar,
api/v1/calendar, integrations). Reguła twarda www była słuszna.
Analogicznie bez bramek: „Dashboard analityczny" (GROWTH w seedzie),
„White label"/„Dedykowane wsparcie" (PRO w seedzie — brak śladu w kodzie).

### Niespójności po stronie aplikacji (do wiadomości okna aplikacji)

- Klucze API: serwer PRO, baner UI mówi GROWTH
  (APIKeyManager.tsx:92); drugi APIKeyManager bez żadnej bramki UI.
- Webhooki: serwer PRO (literał), flaga seedowana GROWTH+PRO,
  UI komunikuje GROWTH.
- website_pages: limit tylko w tabeli, bez egzekucji.
- TL voiceCall: mapowanie GROWTH bez call site (martwe).

---

## Z2 — faktury Stripe: KOD KOMPLETNY, DASHBOARD NIEZWERYFIKOWANY

**Ścieżka faktur subskrypcyjnych istnieje end-to-end w kodzie** (wbrew
wcześniejszemu wnioskowi inwentarza): Checkout mode:subscription ze
zbieraniem NIP i adresu (billing-service.ts:213–227: tax_id_collection,
billing_address_collection) → webhook invoice.payment_succeeded → zapis
hosted_invoice_url + invoice_pdf w tabeli Invoice (:831–857) → ekran
/billing z linkami PDF (InvoiceList.tsx:60–84) → mail z linkiem
(:877–882). Portal klienta z invoice_history:enabled
(setup-stripe.ts:42). Faktury generuje i hostuje Stripe — puppeteer
niepotrzebny dla subskrypcji (potwierdzone: puppeteer nieobecny;
dotyczy tylko odrębnego modułu FBOInvoice → 503).

**Nierozstrzygalne z kodu (dashboard/test-zakup):** dane sprzedawcy
i numeracja faktur; Stripe Tax — `automatic_tax` za flagą
STRIPE_TAX_ENABLED, **domyślnie wyłączony** (billing-service.ts:208);
tryb klucza (walidacja env.ts:47 akceptuje sk_test_ i sk_live_);
rejestracja webhooka w dashboardzie.

**Braki twarde w kodzie:** zakup kredytów AI (mode:payment) bez
invoice_creation → bez faktury; FBOInvoice martwe bez puppeteera.

**ZNALEZISKO POBOCZNE — TRIAL:** checkout ustawia
`trial_period_days: 14` dla pierwszej subskrypcji
(billing-service.ts:213–227). Strona www dziś świadomie nie obiecuje
trialu — decyzja właściciela, czy to zmienić (pokrycie w kodzie jest).

**Werdykt formatem zlecenia:** NIE DA SIĘ ORZEC WYŁĄCZNIE Z KODU —
strona aplikacyjna KOMPLETNA (dowody wyżej), konfiguracja Stripe
wymaga dashboardu + testowego zakupu (dowód wykonaniem).

---

## Z3 — nazwy funkcji i routing: i18n JEST, KONTRAKT MA ROZJAZDY

Aplikacja ma pełne i18n: next-intl, `SUPPORTED_LOCALES = ['pl','en','de']`
(src/i18n/config.ts:4), pliki messages/pl|en|de.json po 8134 linie.
Strategia BEZ prefiksu URL (cookie NEXT_LOCALE + profil).

### Zgodne z www: Tarcza (PL) · Pieczęć Etyczna/Ethical Seal/Ethik-Siegel
· Dashboard · Pierwsze 90 dni/First 90 Days/Die ersten 90 Tage · DMO ·
Studio · Paszport zgodności (EN; DE nav) · Wall of Proof · Świadectwo (PL).

### Rozjazdy (10):

| # | www | aplikacja | Dowód |
|---|---|---|---|
| 1 | Symulator rozmów / Conversation Simulator / Gesprächssimulator | **Sala Treningowa / Training Room / Trainingsraum** | pl.json:5495 |
| 2 | Świadectwo → Record / Nachweis | **Testimony / Zeugnis** | en/de.json:4846 |
| 3 | Tarcza → Schutzschild (DE) | **Schild** | de.json:4832 |
| 4 | DMO → Tagesplan (DMO) (DE) | **Täglicher Aktionsplan** (nav: DMO) | de.json:4659 |
| 5 | Formularz zgłoszeniowy / Sign-up form / Anmeldeformular | **Formularze & Import** (nav: **Leady**) | pl.json:4928,71 |
| 6 | Magic Wrapped | **„Twój Wrapped {miesiąc}"** (bez „Magic") | pl.json:6918 |
| 7 | Kreator wdrożeniowy / onboarding wizard / Einstiegsassistent | **brak nazwy własnej** („Witaj w Catherly!") | pl.json:2477 |
| 8 | Puls / Pulse | **Puls zespołu / Team pulse / Team-Puls** | pl.json:75 |
| 9 | Pulpit (PL) | nav: **Dashboard** (metaTitle karty: „Pulpit") | pl.json:44,217 |
| 10 | Compliance-Pass (DE) | app wewnętrznie niespójna: nav „Compliance-Pass", tytuł „Compliance-Ausweis" | de.json:88,4640 |

Uwaga: nav aplikacji używa „Leady" — anglicyzm zakazany kartą tonu www;
strona go nie przejmie niezależnie od kierunku decyzji.

### Routing rejestracji — NIEZGODNY ZE STRATEGIA pkt 41

- Trasa /rejestracja (i /register, /registrierung, /signup) **nie
  istnieje**. Rejestracja = pierwsze logowanie na `/login`
  (magic link Resend / Google OAuth; konto tworzy PrismaAdapter,
  auth.ts:124,252) → /onboarding/step/1.
- `/login` NIE przyjmuje `?plan=` (LoginForm.tsx:33 czyta tylko
  callbackUrl; przyjmuje też `?ref=` z landingu poleceń).
- Wybór planu po zalogowaniu: `/billing?highlight=STARTER|GROWTH|PRO`
  (billing/page.tsx:27–28, highlight-plan.ts:17–31).
- Wewnętrzny cennik aplikacji linkuje CTA na goły /login
  (PricingSection.tsx:129–130).
- **Wniosek: CTA „Wybierz plan → /rejestracja?plan=…" w treściach
  cennika www jest niewykonalne w obecnej aplikacji.** Opcje: (a) www
  linkuje /login (ew. z callbackUrl na /billing?highlight=…— wymaga
  potwierdzenia w oknie aplikacji), (b) aplikacja dodaje trasę
  rejestracji z parametrem planu. Decyzja właściciela + korekta
  STRATEGIA pkt 41 (ADR).

---

## Z4 — region bazy i szyfrowanie

1. **REGION: FAKT — eu-central-1** (Frankfurt). Dowody: host poolera
   w DATABASE_URL (.env.local — sam fragment regionu), docs/ODSTEPSTWA.md:56,
   docs/OPERATIONS.md:838, docs/ZADANIA_RECZNE.md:15 („New project
   (eu-central-1)"). Hosting aplikacji co-located: vercel.json:4
   `"regions":["fra1"]`. **„Dane w UE" ma pokrycie faktograficzne.**
2. **SZYFROWANIE:** TLS/at-rest platformy — NIE WIEM (dashboard-only;
   brak śladu konfiguracyjnego w repo; UI aplikacji twierdzi
   „w tranzycie i at-rest" jako stała tekstowa, nie weryfikacja —
   odnotowane w audycie aplikacji). Szyfrowanie aplikacyjne wrażliwych
   pól — FAKT: AES-256-GCM (src/lib/crypto/field-encryption.ts,
   token-encryption.ts; użycia: TOTP, tokeny social).
3. **KOPIE:** FAKT — cron backupu aplikacyjnego do bucketu Supabase
   (vercel.json:19–21, backup-service.ts) + snapshot ZIP repo bez
   sekretów. Pełny backup Postgres (PITR) — NIE WIEM (dashboard-only).
4. **DOSTĘP:** FAKT — .gitignore:35–40 ignoruje .env*; brak żywych
   sekretów w src/ (grep czysty; tylko mocki/CSP); jest .gitleaks.toml.
   Uwaga poboczna: ref projektu Supabase jawnie w commitowanych docs
   (identyfikator infrastruktury, nie klucz).

---

## Wpływ na stronę www — co odblokowane, co wymaga decyzji

1. **ODBLOKOWANE — Para 1 obaw:** poprawna, bez korekty (P90D dla
   każdej). Flaga z panel-cennik.md zamknięta.
2. **ODBLOKOWANE — limity do tabeli porównawczej:** komplet liczb
   egzekwowanych w kodzie (bez website_pages). Wymaga: aktualizacji
   tabeli obietnic (źródło prawdy) + zapisu liczb w źródle danych
   strony; potem treść tabeli.
3. **DO DECYZJI — karta Pro:** kodowe wyróżniki PRO to Ranking, Klucze
   API, Webhooki, eksport-książka TL (milczenie!), czysty eksport,
   wyższe limity. Które z nich wchodzą do tabeli obietnic i na kartę
   (język, zgodność z kartą tonu) — wymaga rozszerzenia tabeli
   obietnic i przebiegu panelowego.
4. **DO DECYZJI — FAQ faktura:** kod kompletny, ale ADR-018: brak
   dowodu = brak zabezpieczenia. Rekomendacja: pytanie wraca do FAQ
   dopiero po testowym zakupie z otrzymaną fakturą (zlecenie
   wykonawcze dla okna aplikacji) + decyzji o Stripe Tax.
5. **DO DECYZJI — trial 14 dni:** jest w kodzie; strona dziś milczy.
6. **DO DECYZJI — kontrakt nazw (10 rozjazdów):** kierunek per
   pozycja: www przejmuje nazwy aplikacji vs aplikacja zmienia nazwy.
   Słownik nazw pozostaje PROJEKT.
7. **DO DECYZJI — ścieżka zakupu:** /rejestracja nie istnieje; CTA
   cennika www wymaga zmiany (opcje wyżej) + korekta STRATEGIA pkt 41.
8. **ODBLOKOWANE — „Dane w UE":** region FAKT; rekomendacja: aktywować
   potwierdzenia w brzmieniu popartym dowodem (region UE — Frankfurt);
   o szyfrowaniu mówić tylko to, co udowodnione (pola aplikacyjne),
   do czasu potwierdzenia dashboardu.
9. **Dla okna aplikacji (poza www):** niespójności bramek UI/serwer
   (Klucze API, Webhooki), website_pages bez egzekucji, kredyty AI bez
   faktur, seed vs kod (kalendarz, dashboard analityczny, white
   label), Compliance-Ausweis/Pass, ref projektu w docs.
