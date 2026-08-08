# catherly.com — system budowy klasy produkcyjnej
## Architektura pracy agentów AI, bramki jakości i porządek wykonania

Wersja 1.0 · dokument wykonawczy dla repozytorium `catherly-www`
Nadrzędny wobec niego jest dokument strategii (50 punktów). Ten dokument mówi **jak** — tamten mówi **co** i **dlaczego**.

---

## 1. Trzy prawa systemu pracy

Wszystko poniżej wynika z trzech praw. Jeśli jakakolwiek praktyka je łamie — praktyka przegrywa.

**Prawo 1 — Nic nie istnieje bez źródła prawdy.**
Każda informacja na stronie (cena, limit, kolor, tekst, liczba) ma dokładnie jedno miejsce pochodzenia, z którego jest *generowana*, nigdy przepisywana ręcznie. Cennik pochodzi ze Stripe. Kolory z tokenów. Treść z plików `content/`. Liczba modułów z manifestu produktu. Ręczne przepisanie = bug klasy krytycznej, nawet jeśli wartość się zgadza.

**Prawo 2 — Żaden agent nie odbiera własnej pracy.**
Agent implementujący nie uruchamia własnego audytu. Agent piszący treść nie ocenia własnej treści. Odbiór jest zawsze adwersaryjny: inny agent, inny prompt, inny kontekst, nastawiony na znalezienie błędu, nie na potwierdzenie sukcesu.

**Prawo 3 — Bramka albo nie istnieje.**
Wymóg niesprawdzany automatycznie jest życzeniem, nie wymogiem. Każdy próg z dokumentu strategii (LCP, kontrast, klawiatura, parytet językowy) istnieje jako test w CI, który blokuje merge. „Sprawdzimy przed publikacją" = nie sprawdzimy.

---

## 2. Struktura repozytorium — artefakty źródeł prawdy

```
catherly-www/
├── CLAUDE.md                  ← konstytucja dla każdego agenta (sekcja 7)
├── docs/
│   ├── PLAN.md                ← ten dokument
│   └── adr/                   ← rejestr decyzji, format w sekcji 8
├── design/
│   ├── tokens.json            ← JEDYNE źródło: kolory, typografia, odstępy,
│   │                             promienie, cienie, czasy animacji
│   └── image-style.md         ← prompt bazowy Higgsfield: paleta z tokenów,
│                                 światło, poziom abstrakcji, format wyjściowy
├── content/
│   ├── pl/  en/  de/          ← treść w plikach MDX, struktura identyczna
│   │                             w trzech katalogach (parytet = test w CI)
│   └── facts.json             ← każda liczba użyta na stronie + jej źródło
│                                 i data pomiaru (podstawa audytu prawdziwości)
├── src/                       ← Next.js 15 App Router, generowanie statyczne
├── e2e/                       ← Playwright: ścieżki krytyczne + klawiatura
└── .github/workflows/         ← bramki z sekcji 5
```

Zasady twarde:

- `tokens.json` → Style Dictionary → zmienne CSS strony **i** eksport dla aplikacji. Test kontraktowy porównuje wygenerowane artefakty obu stron.
- `content/facts.json` to mechanizm punktu 22 strategii („każda liczba zmierzona, nie wpisana"): komponent liczby na stronie *importuje* wartość z tego pliku; wpisanie liczby literalnie w JSX nie przechodzi lintera.
- Ceny i nazwy planów: build pobiera je z API Stripe (tryb odczytu) i zapisuje snapshot; rozjazd snapshot ↔ Stripe = czerwony build.

---

## 3. Role agentów — definicje, wejścia, wyjścia, zakazy

Siedem ról. Jedna sesja Claude Code = jedna rola. Mieszanie ról w jednej sesji jest zabronione, bo unieważnia Prawo 2.

### 3.1 Orkiestrator (Ty + sesja główna)
- **Robi:** dzieli pracę na zadania wielkości jednej sekcji, przydziela worktree, zbiera wyniki, podejmuje decyzje zapisywane w ADR.
- **Nie robi:** nie pisze kodu produkcyjnego, nie pisze treści. Orkiestrator, który koduje, przestaje widzieć całość.

### 3.2 Agent treści (fan-out, krok 44 strategii)
- **Wejście:** brief sekcji (cel, odbiorca, ograniczenia z zasad 1 i 3 strategii).
- **Wyjście:** 3–5 niezależnych wariantów per element (nagłówek, propozycja wartości) → osobny agent-panel ocenia wg jawnych kryteriów → synteza zwycięzcy z przeszczepem najlepszych fragmentów pozostałych.
- **Zakazy:** żadnych superlatyw bez pokrycia w `facts.json`; żadnych zmyślonych liczb, opinii, nazwisk; PL/EN/DE to trzy *adaptacje kulturowe*, nie trzy tłumaczenia — niemiecki tekst o bezpieczeństwie danych ma inny ciężar niż polski.

### 3.3 Agent projektowy (Claude Design, kroki 43 i 45)
- **Kolejność wymuszona:** `/design-sync` z repo → wireframe (szare bloki, akcept układu) → dopiero potem high fidelity. Przejście do high fidelity przed akceptem wireframe'u = cofnięcie.
- **Wyjście:** paczka handoff do Claude Code per ekran: główna, cennik, jedna podstrona funkcji jako wzorzec.
- **Zakazy:** żadnych elementów spoza design systemu; żadnych „ładnych" odstępstw od tokenów — odstępstwo wymaga zmiany w `tokens.json` przez ADR, nie wyjątku w projekcie.

### 3.4 Agent obrazów (Higgsfield MCP)
- **Wejście:** wyłącznie `design/image-style.md` + brief konkretnej grafiki.
- **Wyjście:** obraz → pipeline (AVIF/WebP, warianty wymiarów od 390 px, lazy load poza pierwszym ekranem) → dopiero wtedy do repo. Surowy plik z generatora nigdy nie trafia do `src/`.
- **Zakaz absolutny:** nic, co udaje zrzut z aplikacji. Zrzuty produktu robi wyłącznie Playwright na prawdziwej aplikacji z neutralnymi danymi demo (zasada 1 strategii: wymyślone nazwy własne).

### 3.5 Agenci implementacji (fan-out, krok 47)
- **Izolacja:** jeden agent = jedna sekcja = jeden git worktree = jeden PR. Agent nie dotyka plików poza swoją sekcją i katalogami wspólnymi w trybie odczytu.
- **Wejście:** paczka z Claude Design + treść z `content/` + Definition of Done sekcji (4.2).
- **Wyjście:** PR z zielonymi bramkami. Agent kończy pracę wyłącznie przez PR — nigdy przez push do main.

### 3.6 Agenci-bramkarze (krok 49 — pięć soczewek)
Pięć niezależnych przebiegów `claude -p` w CI, każdy z osobnym promptem kontrolnym i bez dostępu do kontekstu implementacji:
1. **Dostępność** — czyta wynik axe + sam przechodzi stronę Playwrightem klawiaturą.
2. **Wydajność** — czyta raport Lighthouse CI + szuka przyczyn, nie tylko liczb.
3. **RODO i prawo** — porównuje mechanikę zgód i treść dokumentów z checklistą; sprawdza, czy odrzucenie ciasteczek jest jednym kliknięciem jak akceptacja.
4. **Wyszukiwarki** — hreflang, x-default, dane strukturalne, mapa strony, tytuły i opisy per język.
5. **Prawdziwość** — dla każdej liczby na wyrenderowanej stronie szuka wpisu w `facts.json`; liczba bez źródła = blokada.

### 3.7 Agent-adwersarz (recenzent PR)
Osobna sesja z jednym zadaniem: **znajdź powód, żeby ten PR odrzucić.** Czyta diff, uruchamia stronę, próbuje złamać sekcję (długi tekst niemiecki, wyłączony JavaScript, czytnik ekranu, 390 px, wolna sieć). Brak znalezisk musi uzasadnić, nie stwierdzić.

---

## 4. Potok sekcji — jedna droga dla każdego elementu strony

### 4.1 Pipeline (żadnych skrótów, także dla „prostych" sekcji)

```
brief → treść (fan-out + panel) → wireframe → akcept układu →
high fidelity → handoff → implementacja w worktree →
bramki automatyczne → agent-adwersarz → Twój akcept → merge
```

Sekcja, która ominęła etap, wraca na jego początek. Wyjątków nie ma, bo wyjątek dla stopki dziś to wyjątek dla cennika jutro.

### 4.2 Definition of Done sekcji (warunki łączne)

1. Treść w trzech językach, struktura plików identyczna (test parytetu zielony).
2. Zero wartości wizualnych poza tokenami (linter tokenów zielony).
3. axe: zero błędów; kontrast AA na każdym tekście.
4. Przejście klawiaturą: fokus widoczny, kolejność logiczna (test Playwright).
5. Treść czytelna bez JavaScriptu.
6. Budżet wydajności sekcji nieprzekroczony (waga obrazów, JS, fontów).
7. `prefers-reduced-motion` respektowane przez każdą animację sekcji.
8. Każda liczba w sekcji ma wpis w `facts.json`.
9. Zrzuty w sekcji pochodzą z Playwrighta na danych demo, nie z generatora.
10. PR zaakceptowany przez agenta-adwersarza i przez Ciebie.

---

## 5. Bramki — konkretna implementacja w CI

| Bramka | Narzędzie | Próg blokujący |
|---|---|---|
| Wydajność | Lighthouse CI na preview Vercel | LCP < 1,8 s · INP < 200 ms (4G) · CLS < 0,1 |
| Dostępność | axe-core + testy Playwright (klawiatura) | 0 błędów, pełne przejście tabem |
| Kontrakt tokenów | Style Dictionary diff strona↔aplikacja | 0 rozjazdów |
| Parytet językowy | skrypt: struktura `content/pl|en|de` | identyczne drzewa plików i klucze |
| Prawdziwość | linter liczb + agent soczewki 5 | każda liczba ↔ `facts.json` |
| Cennik | snapshot Stripe ↔ strona | 0 rozjazdów nazw i cen |
| Linki | link checker na buildzie | 0 martwych linków wewnętrznych |
| E2E | Playwright | cennik → płatność (test mode) → konto → zalogowana aplikacja |
| No-JS | render bez JS | treść każdej podstrony czytelna |
| Nieodwracalne (ADR-018) | raport audytu w `docs/audyt/` | wdrożenie produkcyjne wymaga aktualnego raportu dla tego commita, zero statusów NIESPEŁNIONE i NIESPRAWDZONE |

Wszystkie bramki wchodzą **przy pierwszym commicie** (krok 46 strategii: dokładane później nigdy nie zostają dołożone). Pierwszy tydzień z czerwonym CI na pustym repo jest tańszy niż jeden dzień zielonego CI, które nic nie sprawdza.

Hooki lokalne Claude Code (pre-commit): axe + linter tokenów + linter liczb — agent implementacji fizycznie nie może zamknąć zadania z naruszeniem, zanim jeszcze powstanie PR.

---

## 6. Harmonogram faz z kryteriami wyjścia

Faza kończy się wyłącznie spełnieniem kryterium wyjścia. Czas jest szacunkiem; kryterium jest prawem.

**Faza 0 — Konstytucja.** `CLAUDE.md`, ADR-y od 001, szkielet repo, wszystkie bramki w CI (czerwone — i dobrze).
*Wyjście:* każdy agent uruchomiony w repo zna zasady bez dopytywania.

**Faza 1 — Fundament wizualny (krok 43).** `tokens.json` z komponentów Catherly, `/design-sync`, test kontraktowy zielony, `image-style.md` zatwierdzony.
*Wyjście:* Claude Design buduje wyłącznie z Twoich klocków.

**Faza 2 — Treść i pozycjonowanie (krok 44).** Fan-out treści dla: nagłówek, definicja (pkt 19), cztery filary, cennik, sześć obaw. Trzy języki. `facts.json` wypełniony i zmierzony.
*Wyjście:* panel + Ty zatwierdzacie zwycięskie warianty; zero liczb bez źródła.

**Faza 3 — Projekt (krok 45).** Wireframe → akcept → high fidelity dla: główna, cennik, wzorcowa podstrona funkcji.
*Wyjście:* trzy paczki handoff w repo.

**Faza 4 — Implementacja (kroki 46–47).** Fan-out po sekcjach w worktree, pipeline 4.1 dla każdej, podstrony wg wzorca.
*Wyjście:* wszystkie sekcje zmergowane z zielonymi bramkami.

**Faza 5 — Spięcie z aplikacją (krok 48).** Ciasteczko `.catherly.com`, rewrites logowania/rejestracji, ścieżka płatności, powrót po zakupie. **Warunek wejścia:** Twoja decyzja o przeniesieniu aplikacji na `app.catherly.com` (otwarty punkt z dokumentu strategii).
*Wyjście:* E2E zielony na środowisku testowym Stripe.

**Faza 6 — Audyt (krok 49).** Pięć soczewek + agent-adwersarz na całości.
*Wyjście:* zero blokad; znaleziska niższej wagi w rejestrze z decyzją: naprawa albo świadome ryzyko (ADR).

**Faza 7 — Publikacja i pomiar (krok 50).** DNS, zdarzenia konwersji przez warstwę analityki produktu, /status i /zmiany żywe od pierwszego dnia.
*Wyjście:* strona publiczna, bramki działają na każdym kolejnym PR — system nie kończy się z publikacją.

---

## 7. CLAUDE.md — do wklejenia do korzenia repo

```markdown
# catherly-www — zasady dla agentów

## Kim jesteś w tej sesji
Pełnisz dokładnie jedną rolę: treść / projekt / obrazy / implementacja /
bramkarz / adwersarz. Jeśli rola nie została wskazana — zapytaj i nie rób nic.

## Zakazy bezwzględne
- Żadnych wzmianek o konkretnych firmach z branży, logotypów, twarzy osób.
  Przykłady w UI: neutralne, wymyślone nazwy.
- Żadnych zmyślonych liczb, opinii, klientek. Każda liczba pochodzi
  z content/facts.json — literalna liczba w JSX nie przejdzie lintera.
- Żadnych wartości wizualnych spoza design/tokens.json. Potrzebujesz nowej —
  zaproponuj ADR, nie wyjątek.
- Żadnych grafik udających interfejs aplikacji. Zrzuty produktu robi
  wyłącznie Playwright na danych demo.
- Żadnych ciemnych wzorców: brak wymuszania rejestracji, pop-upów,
  liczników pilności, ukrytych cen. Odrzucenie ciasteczek = 1 kliknięcie.
- Nie pushuj do main. Kończysz pracę wyłącznie przez PR z zielonymi bramkami.
- Nie oceniasz własnej pracy i nie osłabiasz testów, żeby przeszły.

## Prymat nieodwracalnego (ADR-018 — nadrzędne wobec wszystkiego poniżej)
Cztery obszary mają pierwszeństwo przed wyglądem, zakresem i terminem:
dane · pieniądze · bezpieczeństwo · obietnice. Zasady obowiązujące zawsze:
- Brak dowodu = brak zabezpieczenia. Kod, który wygląda poprawnie, ma
  status niesprawdzony, a niesprawdzony liczy się jak niedziałający.
- Nie oceniasz własnej pracy w tych czterech obszarach. Dowodem jest
  wykonany test, zwrócony status, log — nigdy Twoje przekonanie.
- W konflikcie przegrywa termin i zakres, nigdy nieodwracalne.
- Niepewność zgłaszasz, nie zasypujesz. „Prawdopodobnie działa" nie istnieje.
- Nigdy nie obiecujesz na stronie tego, czego aplikacja nie robi.

## Progi (bramki CI — blokujące)
LCP < 1,8 s · INP < 200 ms na 4G · CLS < 0,1 · kontrast AA wszędzie ·
pełna obsługa klawiaturą · treść czytelna bez JS · parytet pl/en/de ·
aktualny raport audytu nieodwracalnych przed wdrożeniem produkcyjnym.

## Źródła prawdy
Ceny: Stripe. Wygląd: design/tokens.json. Treść: content/{pl,en,de}.
Liczby: content/facts.json. Decyzje: docs/adr/. Sprzeczność między kodem
a źródłem prawdy = naprawiasz kod, nigdy źródło bez ADR.

## Styl pracy
Mobile-first od 390 px. Ruch tylko celowy, zawsze z prefers-reduced-motion.
Wątpliwość co do zasad → zatrzymaj się i zapytaj. Zgadywanie jest droższe.
```

---

## 8. Rejestr decyzji (ADR)

Format: `docs/adr/NNN-tytul.md` → Kontekst · Decyzja · Konsekwencje · Data.
Seed z już podjętych decyzji strategii (spisane raz, koniec dyskusji w PR-ach):

- 001 — Izolacja marki: neutralne przykłady, brak partnerów i twarzy
- 002 — Progi wydajności i dostępności jako bramki blokujące
- 003 — Zakaz ciemnych wzorców (lista zamknięta z zasady 3)
- 004 — Jeden design system, rozjazd wykrywany kontraktem
- 005 — Auth wyłącznie w aplikacji, strona przez rewrites
- 006 — Płatność przed kontem; cała strona publiczna
- 007 — Treść w repo, bez CMS na start
- 008 — Trzy języki od dnia pierwszego, hreflang + x-default
- 009 — Jeden motyw, bez przełącznika jasny/ciemny
- 010 — Analityka przez warstwę produktu, bez trzeciego systemu
- 011 — Obrazy generowane: tylko warstwa dekoracyjna, nigdy pseudo-zrzuty
- 012 — Waluty i prawo konsumenckie (pełny tekst: sekcja 14)
- 013 — Ciepła jakość: kierunek emocjonalny marki (pełny tekst: sekcja 14)
- 014 — Zakres zamrożony Iteracji 1 (pełny tekst: sekcja 11)
- 015 — Paleta barw przez tokeny (pełny tekst: sekcja 12)
- 016 — Zamknięty zestaw platform (pełny tekst: sekcja 12)
- 017 — Brak panelu administracyjnego strony (pełny tekst: sekcja 13)
- 018 — Prymat nieodwracalnego; obowiązuje w obu repozytoriach (pełny tekst: sekcja 15)

Każda przyszła zmiana któregokolwiek punktu = nowy ADR, który jawnie uchyla stary. Historia decyzji jest częścią produktu.

---

## 9. Anty-wzorce — jak ten system psuje się w praktyce i co temu zapobiega

| Pokusa | Mechanizm obrony |
|---|---|
| „To mała poprawka, zrobię bez pipeline'u" | Bramki na każdym PR bez wyjątków; brak uprawnień push do main |
| „Testy czerwone, ale to na pewno flaki — merguję" | Merge fizycznie zablokowany; flaki naprawia się, nie ignoruje |
| „Agent napisał i mówi, że działa" | Prawo 2: odbiór zawsze przez adwersarza |
| „Dopiszę liczbę, potem uzupełnię facts.json" | Linter liczb: kolejność odwrotna jest niemożliwa |
| „Wrzucę grafikę z generatora, wygląda jak apka" | ADR-011 + review adwersarza z tym punktem na checkliście |
| „Trzeci język dorobimy po starcie" | Test parytetu: strona bez de nie zbuduje się wcale |
| „Bramki wydajności dodamy, jak będzie co mierzyć" | Faza 0: bramki przed pierwszą linią kodu |

---

## 10. Czego system potrzebuje od Ciebie (bez tego nie startuje)

1. **Decyzja:** przeniesienie aplikacji na `app.catherly.com` (dotyka ciasteczek, linków w e-mailach, adresów materiałów — Twoja decyzja, nie założenie agenta).
2. **Dane:** nazwy i ceny trzech planów potwierdzone w Stripe (system będzie je stamtąd czytał).
3. **Dane:** nazwa firmy, adres, NIP, adres kontaktowy — stopka i dokumenty prawne.
4. **Akcepty w toku:** zwycięskie warianty treści (Faza 2), układ wireframe (Faza 3), finalny akcept każdego PR (Ty jesteś ostatnią bramką i tak ma zostać).

---

## 11. ZAKRES ZAMROŻONY — Iteracja 1 (ADR-014, decyzja z 2026-08-06)

Układ przyjęty: strona żywa z programem pierwszych użytkowniczek tak szybko,
jak pozwala rzemiosło — ani dnia dłużej. Wszystko poniżej kreski trafia do
publicznego /zmiany po starcie, nie do zakresu startu.

### W zakresie startu (blokuje publikację)

**Strony:** główna (sekcje 16–26 **bez** sekcji dowodu — pkt 22 mówi jasno:
dopóki nie ma prawdziwych historii, sekcji nie ma) · /funkcje jako jedna
strona przeglądowa z czterema blokami (bez czterech podstron szczegółowych)
· /cennik pełny · /bezpieczenstwo (decyduje u ostrożnych — zostaje w całości)
· /pomoc w wersji minimalnej: pierwsze kroki + kontakt z realnym czasem
odpowiedzi · /kontakt · dokumenty prawne (regulamin, prywatność, ciasteczka,
przetwarzanie danych — z prawem odstąpienia i cenami brutto per ADR-012)
· ścieżka zakupu: /rejestracja → płatność → /witaj → app, plus /logowanie
i /odzyskiwanie-hasla · /zmiany (żywy od dnia startu — pierwszy wpis to sam
start) · /status w wersji prostej.

**Jakość (nienegocjowalne — to jest to "rzemiosło", na które czekamy):**
wszystkie bramki z sekcji 5 · trzy języki z parytetem · warstwa rzemiosła:
system ruchu w tokenach, mikrotypografia per język, inwentarz stanów w DoD,
ciepła jakość per ADR-013 · e-maile transakcyjne w design systemie
· ścieżka nieszczęśliwa (odrzucona karta, 404 ×3 języki).

**Równolegle od dziś (nie po starcie):** program pierwszych użytkowniczek —
rekrutacja ograniczonej grupy na preferencyjnych warunkach w zamian za
udokumentowane historie po 60–90 dniach. To jest produkcja przyszłej sekcji
dowodu i zaczyna się przed napisaniem pierwszej linii kodu strony.

### Poza zakresem startu (do /zmiany, kolejność wg pomiaru)

Cztery podstrony filarów · /dla-kogo · /o-catherly · /blog · demo
interaktywne · /integracje · strony porównań (vs zeszyt/Excel, vs CRM)
· kalkulator czasu · darmowe narzędzie-magnes · webinary i nagrania
· element podpisu w wersji rozbudowanej (na start: jedna prosta wersja
gestu troski, reszta iteracyjnie).

### Definicja startu

Strona jest gotowa do publikacji, gdy: (1) wszystkie bramki zielone na
zakresie startu, (2) E2E cennik→płatność→konto→aplikacja zielony,
(3) audyt pięciu soczewek bez blokad, (4) program pierwszych użytkowniczek
ma otwartą rekrutację. Nic więcej nie wstrzymuje publikacji. Każde "jeszcze
tylko jedno" po tej dacie wymaga ADR, który jawnie uchyla ADR-014.

---

## 12. ADR-015 i ADR-016 (decyzje z 2026-08-06)

### ADR-015 — Paleta barw: wybór narzędziami, prawda w tokenach

**Kontekst.** Paleta musi realizować ADR-013 (ciepła jakość: kremowe tło,
kolory przyjazne, nie statusowe — zakaz estetyki czerń/złoto) i przechodzić
bramkę kontrastu AA z zasady 2. Wybór "na oko" jest sprzeczny z Prawem 1.

**Decyzja.** Proces wyboru: kierunek w Huemint → weryfikacja na żywej
makiecie w Realtime Colors → rozwinięcie do pełnych skal odcieni (50–900)
w Accessible Palette → zapis do `design/tokens.json`. Od momentu zapisu
jedynym źródłem prawdy jest token; platformy kolorów są narzędziem
jednorazowego wyboru i nie wracają do procesu. Zmiana palety = nowy ADR.

**Konsekwencje.** Linter tokenów blokuje kolory spoza `tokens.json`
u każdego agenta. Test kontraktowy pilnuje zgodności strona↔aplikacja.
axe w CI pilnuje kontrastu każdej pary tło–tekst. Kandydat palety
przechodzi test odbioru z ADR-013 ("oni mnie rozumieją" — nie "ale
elegancko", nie "słodkie").

### ADR-016 — Zamknięty zestaw platform Iteracji 1

**Kontekst.** Każda platforma to zależność, koszt poznawczy i powierzchnia
awarii. Zakres zamrożony (ADR-014) wymaga domkniętej listy — dokładanie
narzędzi "bo przydatne" to ta sama choroba, co dokładanie sekcji.

**Decyzja.** Zestaw kompletny i zamknięty:

| Warstwa | Platformy |
|---|---|
| Rdzeń inżynierski | GitHub (+ MCP) · Vercel (+ MCP) · Playwright (+ MCP) · Stripe (+ MCP, źródło prawdy cennika) · Lighthouse CI · axe-core · Style Dictionary |
| Warstwa wizualna | Claude Design (design system, wireframe, high fidelity, handoff) · Higgsfield MCP (wyłącznie warstwa dekoracyjna per ADR-011) · Huemint / Realtime Colors / Accessible Palette (jednorazowo, per ADR-015) |
| Wypełnienie zakresu | Resend + React Email (e-maile transakcyjne w tokenach) · Fontsource (kroje lokalnie, subsetting latin-ext) · next-intl (parytet pl/en/de, hreflang) · Klaro lub własny baner (zgody: odrzucenie = 1 kliknięcie) · Upptime (/status z GitHub Actions) · Tally (rekrutacja pierwszych użytkowniczek) |

**Świadomie poza zestawem:** CMS (ADR-007) · zewnętrzna analityka
(ADR-010) · komercyjne consent-platformy (fabryki ciemnych wzorców)
· wszystko z listy "poza zakresem startu" w sekcji 11.

**Konsekwencje.** Dodanie jakiejkolwiek platformy wymaga ADR-a
z uzasadnieniem, czemu istniejący zestaw nie wystarcza. Agenci nie
proponują nowych narzędzi w PR-ach — propozycje narzędzi idą wyłącznie
ścieżką ADR do orkiestratora.

---

## 13. ADR-017 — Brak panelu administracyjnego strony (decyzja z 2026-08-06)

**Kontekst.** Rozważano dostęp administratora "do wszelkich zmian" przez
panel na stronie. Strona jest statyczna: nie ma bazy, logowania ani
powierzchni ataku — a pełna władza nad każdym elementem istnieje już
przez repozytorium (Claude Code, GitHub web/mobile).

**Decyzja.** Strona catherly.com NIE ma panelu administracyjnego ani
żadnego mechanizmu logowania po stronie www. Administracja wyłącznie
przez repozytorium: edycja → PR → bramki → automatyczne wdrożenie.
Ceny i plany administruje się w Stripe (Prawo 1). Status prowadzi
Upptime automatycznie. Zgłoszenia z formularzy przychodzą na e-mail.

**Uzasadnienie (trzy filary):**
1. Bezpieczeństwo — panel to drzwi wymagające wiecznej obrony; strona
   bez logowania ma zerową powierzchnię ataku, co jest obietnicą
   spójną z /bezpieczenstwo.
2. Integralność — zmiana przez panel omija bramki (parytet językowy,
   kontrast, prawdziwość liczb, kontrakt tokenów); droga przez PR czyni
   stronę niemożliwą do zepsucia, również przez administratora.
3. Koszt — panel to osobny produkt utrzymywany dla jednej osoby, która
   ma już lepszy interfejs.

**Warunek rewizji.** Gdy treść ma regularnie edytować osoba nietechniczna,
temat wraca WYŁĄCZNIE jako git-based CMS (np. Decap/TinaCMS) — nakładka
na te same pliki, nadal przez PR i bramki, nigdy jako osobna baza
z własnym logowaniem. Rewizja wymaga ADR-a uchylającego niniejszy.

**Konsekwencje.** Żaden agent nie projektuje ani nie implementuje
ekranów administracyjnych, endpointów zapisu ani uwierzytelniania
w catherly-www. Propozycje takich elementów w PR = odrzucenie przez
adwersarza z powołaniem na ADR-017.

---

## 14. ADR-012 i ADR-013 — pełne teksty (decyzje z 2026-08-06)

### ADR-012 — Waluty, ceny brutto i prawo konsumenckie

**Kontekst.** Strona startuje w trzech językach; odbiorczyni niemiecka
nie zapłaci w złotówkach. Odbiorczyni to najczęściej konsumentka lub
drobna działalność bez odliczenia VAT.

**Decyzja.** Ceny per język: PLN dla wersji pl, EUR dla wersji en i de —
oba cenniki prowadzone w Stripe (multi-currency), skąd build je pobiera.
Wszystkie ceny prezentowane BRUTTO. Regulamin zawiera 14-dniowe prawo
odstąpienia od usługi cyfrowej (z mechanizmem zgody na rozpoczęcie
świadczenia przed upływem terminu). Każda przyszła promocja pokazuje
najniższą cenę z 30 dni (Omnibus). Faktury VAT dostępne w ścieżce zakupu.

**Uwaga formalna.** Niniejszy ADR jawnie UZUPEŁNIA pkt 32 strategii
("ceny w PLN z groszami"): PLN pozostaje dla wersji polskiej, EUR
obowiązuje dla en/de. To jest przewidziany w hierarchii przypadek,
w którym ADR stanowi inaczej niż litera strategii.

**Konsekwencje.** Snapshot Stripe obejmuje obie waluty; bramka cennika
porównuje obie. Dokumenty prawne (regulamin, cennik-FAQ) piszą się
z uwzględnieniem powyższego od pierwszej wersji, nie jako poprawka.

### ADR-013 — Ciepła jakość: kierunek emocjonalny marki

**Kontekst.** Strona ma dawać odczucie miejsca wyjątkowego, ale nie może
peszyć ("to nie moja liga", "strona dla bogatych"). Luksus komunikuje
status i selekcję; tu ta sama perfekcja wykonania ma komunikować troskę.

**Decyzja.** Kierunkiem marki jest CIEPŁA JAKOŚĆ: rzemiosło na poziomie
obsesji, wektor emocjonalny "ktoś się postarał dla ciebie".

**Sygnały ZAKAZANE (produkują dystans lub lekceważenie):**
- chłodny minimalizm z ogromną pustką i cienkim szeryfem
- paleta czerń–złoto–marmur; estetyka sesji modowej
- słownictwo statusowe: "ekskluzywny", "premium", anglicyzmy w polskim
  tekście; ton konsjerża
- mały tekst wymagający wysiłku
- oraz przegięcie w dół: zdrabnianie, nadmiar wykrzykników, różowa
  infantylizacja — komunikują "nie traktujemy cię poważnie"

**Sygnały WZMACNIANE:**
- tło ciepłe (kierunek kremowy, nie szpitalna biel); kolory nasycone
  i przyjazne; cienie miękkie, promienie łagodne
- czytelność jako gościnność: duże rozmiary tekstu, krótkie wiersze,
  światło między treścią
- język koleżanki, która zna się na rzeczy: o JEJ dniu, nie o technologii
- ruch z delikatną sprężystością w mikrointerakcjach (przyjemność, nie
  prestiż), zawsze z prefers-reduced-motion
- obrazy w świetle dziennym, domowe, jasne konteksty
- brak barier jako komunikat: widoczne ceny, publiczna pomoc,
  "rezygnacja w każdej chwili"

**Bramka odbioru (audyt treści i projektu).** Test 30 sekund: oczekiwana
reakcja "oni mnie rozumieją i traktują poważnie". Reakcja "ale elegancko"
= przegięcie w chłód; reakcja "słodkie" = przegięcie w dół. Obie oznaczają
wynik czerwony tej samej bramki.

**Konsekwencje.** Obowiązuje agentów treści, projektu i obrazów oraz
panel oceniający w fan-oucie treści. Element podpisu marki projektuje
się jako gest troski (nie prestiżu) — np. moment doceniający zamknięty
dzień pracy użytkowniczki.

---

## 15. ADR-018 — Prymat nieodwracalnego (decyzja z 2026-08-07)

**Status.** Przyjęty. Obowiązuje w **obu repozytoriach**: `catherly-www`
i `catherly-app`. Nadrzędny wobec pozostałych ADR-ów: w razie sprzeczności
z jakąkolwiek inną decyzją wygrywa ADR-018.

**Kontekst.** System ma komplet bramek jakości: wydajność, dostępność,
tokeny, parytet językowy, prawdziwość liczb. Wszystkie dotyczą rzeczy
**odwracalnych** — wolna strona da się przyspieszyć, brzydka sekcja
przeprojektować, zły tekst przepisać. Nie było natomiast bramki dla
rzeczy, których po wypuszczeniu produktu cofnąć się nie da: utraconych
danych klientki, pobranych pieniędzy bez usługi, ujawnionych danych
osobowych, złamanej obietnicy. Bez tej decyzji perfekcjonizm rozkłada
się równomiernie na wszystko i przestaje odróżniać rzeczy ważne od
poprawialnych.

**Decyzja.**

1. **Cztery obszary nieodwracalne** — dane, pieniądze, bezpieczeństwo,
   obietnice — mają pierwszeństwo przed wyglądem, zakresem i terminem.
   W konflikcie zawsze przegrywa termin, nigdy nieodwracalne.

2. **Brak dowodu = brak zabezpieczenia.** Status NIESPRAWDZONE liczy się
   dokładnie jak NIESPEŁNIONE. Czytanie kodu nie jest dowodem; dowodem
   jest wykonany test, zwrócone żądanie, log, zrzut wyniku.

3. **Zakaz samo-odbioru rozszerzony.** W tych czterech obszarach żaden
   agent nie potwierdza własnej pracy. Dowód musi pochodzić z próby
   złamania mechanizmu, nie z opisu jego działania.

4. **Audyt jako bramka wdrożenia.** Wdrożenie produkcyjne wymaga
   aktualnego raportu audytu nieodwracalnych dla audytowanego commita.
   Raport z choćby jednym statusem NIESPEŁNIONE lub NIESPRAWDZONE
   blokuje wdrożenie — chyba że istnieje zapisana decyzja o przyjęciu
   ryzyka z podpisem właściciela produktu i terminem powrotu.

5. **Cykliczność.** Audyt powtarza się przed każdym wdrożeniem
   produkcyjnym zmieniającym ścieżkę płatności, model danych,
   uwierzytelnianie lub treść obietnic. Poza tym: nie rzadziej niż
   raz na kwartał.

6. **Sprzężenie strona↔aplikacja.** Obietnica na stronie bez pokrycia
   w aplikacji jest naruszeniem tego ADR-a po stronie **strony**, nie
   aplikacji: usuwa się obietnicę, nie zapowiada się funkcji.

**Konsekwencje.**
- `docs/audyt/` staje się artefaktem obowiązkowym w obu repozytoriach.
- Bramka „Nieodwracalne" wchodzi do tabeli sekcji 5.
- Sekcja „Prymat nieodwracalnego" wchodzi do `CLAUDE.md` obu repozytoriów.
- Agent-adwersarz otrzymuje ADR-018 jako podstawę odrzucenia PR-a, który
  dotyka czterech obszarów bez dowodu.
- Koszt: audyt zajmuje czas przed każdym większym wdrożeniem. To jest
  cena świadoma i zaakceptowana.

**Warunek rewizji.** Gdy pojawi się druga osoba z prawem wdrożenia,
punkt 4 wymaga rozszerzenia o rozdzielenie ról: kto audytuje, nie wdraża.
