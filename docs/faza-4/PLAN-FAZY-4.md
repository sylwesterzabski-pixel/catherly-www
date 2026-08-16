# Plan Fazy 4 — głębia produktu (do akceptu właściciela; zero kodu przed akceptem)

**Data:** 2026-08-12. **Gałąź:** faza-4/podstrony (od głowy
faza-3/komponenty = 07fe886; main nietknięty, merge wyłącznie przez
PR z zielonymi bramkami — ADR-020). **Priorytet właściciela:**
strona jest za płytka — pokazać pełnię produktu. Pipeline bez zmian:
brief → (treść: fan-out → panel) → HF → panel projektu → handoff →
implementacja → bramki → adwersarz → akcept właściciela.

## Kolejność etapów (= kolejność ważności właściciela)

### Etap A — architektura podstron funkcji + przypisanie funkcji

1. Mapa 38 funkcji DZIAŁA z tabeli obietnic → przypisanie do
   podstron (wg DECYZJI F4-1); funkcje CZĘŚCIOWE (klucz) osobną
   listą z językiem kierunku (gramatyka tabeli: bez trybu
   dokonanego); funkcje MILCZENIE nieobecne.
2. Szkielet szablonu podstrony funkcji (K12) — wireframe → akcept.
3. Rejestr ścieżek + plan mapy stopki (DECYZJA F4-5).
**Wyjście:** dokument architektury + wireframe K12 do akceptu.

### Etap B — wzorcowa /funkcje/pozyskiwanie (K12, pełny cykl)

Pełny cykl treściowy (brief → fan-out 3 warianty → panel → DECYZJA
właściciela) + pipeline komponentowy (HF szablonu → panel → handoff
→ implementacja → bramki → adwersarz → akcept). Zakres treści wg
STRATEGIA pkt 28: baza kontaktów i historia rozmów, ocena szans,
plan dnia (DMO), kalendarz, formularz — wyłącznie pokrycie DZIAŁA,
tryb dokonany („pokażmy je z dumą").

### Etap C — fan-out pozostałych podstron funkcji na szablonie K12

- /funkcje/zespol (pkt 30) i /funkcje/wyniki (pkt 31) — pełne.
- /funkcje/tresci (pkt 29) — zakres wg DECYZJI F4-2 (Studio
  WSTRZYMANE do przebudowy wariant C — polecenie właściciela:
  nie pokazujemy ekranu przed liftingiem).
Treści per podstrona przez fan-out + panel (seryjnie, adaptacje
EN/DE przez panele jak w Fazie 2); implementacja na szablonie K12
(komponenty reużyte); adwersarz zbiorczy etapu.

### Etap D — /funkcje jako indeks + /dla-kogo

- /funkcje (pkt 27): przegląd wg zadań dnia (nie architektury
  modułów), linki do podstron filarowych — zastępuje placeholder.
- /dla-kogo (pkt 33): trzy ścieżki rozpoznania siebie (startująca /
  budująca zespół / prowadząca strukturę) — fan-out treści + panel.

### Etap E — ~~centrum pomocy +~~ pełna mapa strony

**ZAKRES SPROWADZONY 2026-08-15 (właściciel).** Etap E = **mapa strony
w stopce** (DECYZJA F4-5) + osobne zlecenie E-10. `/pomoc` z Etapu E
**wypada** — patrz niżej.

- ~~/pomoc (pkt 36) w zakresie DECYZJI F4-4.~~ **WYCOFANE** — ADR-014,
  doprecyzowanie 2026-08-15 (III); warunek powrotu w rejestrze
  warunków powrotu jako T8.
- ✅ Stopka: mapa strony — **osiem adresów treściowych w dwóch
  poziomach** (cztery filary wcięte pod `/funkcje`; rozstrzygnięcie
  właściciela 2026-08-15). `/login` **poza mapą**: to akcja z nagłówka,
  nie treść (ADR-023) — stąd `WYLACZONE_Z_MAPY`. Etykiety reużyte znak
  w znak z istniejących kluczy (`FunkcjeX.okruszek`, `Nawigacja.*`,
  `Wspolne.stronaGlowna`) — **zero nowych ciągów w messages**, ×3
  języki, precedens D-D12. Dokumenty prawne i kontakt bez zmian (F4-5).
- ✅ **E-10 zamknięte** — `bramka:linki` czyta rejestr, nie sam
  zbudowany HTML. Zdanie z poprzedniej wersji planu, „linki wchodzą
  wraz ze stronami — bramka linków pilnuje", było dla NOWEJ podstrony
  **nieprawdą**: bramka budowała zbiór celów z plików HTML
  w `.next/server/app`, więc strona prerenderowana bez wpisu
  w rejestrze dawała **zielone bramki i 404 u użytkowniczki**.
  Teraz uzgodnienie idzie w trzy kierunki (rejestr→build,
  build→rejestr, linki→adresy żywe), a artefakty muszą rozłożyć się
  bez reszty na trzy **zadeklarowane** kategorie. Teza udowodniona
  wykonaniem, nie argumentem: przy `/login` wyjętym z rejestru stara
  bramka jest ZIELONA, nowa CZERWONA.
- ✅ Dowód mutacyjny: **9/9** mutacji dało spodziewany kolor, w tym
  dwa dowody EROZJI (strażnik 404 i wiersz cennika zostawały zielone
  po usunięciu tego, czego miały pilnować — bo ciągu dostarczała im
  odtąd stopka). Bramka E-10: **3/3**. Tabele w dokumencie E, §WYKONANIE.
- Zamknięcie: raport końca Etapu E → sygnał odbioru PNG.

**Przebieg, który do tego doprowadził.** Trzy kolejne rundy treści
`/pomoc` dostały NIE PRZECHODZI — trzecia od trzech adwersarzy
o rozłącznych soczewkach (27 zarzutów, 9 blokujących), już po zmianie
gatunku na krótki i nawigacyjny. Punkty decyzji E-1…E-12 i komplet
rozstrzygnięć: [etap-e-pomoc-decyzje.md](etap-e-pomoc-decyzje.md).

### Etap F — obrazy i reszta pierwotnej Fazy 4

- Integracja zrzutów Z6 (filary głównej), gdy dojadą — tor
  niezależny, może wskoczyć w KAŻDYM momencie fazy.
- Obrazy dekoracyjne Higgsfield (image-style.md OBOWIĄZUJE; kanał:
  konektor claude.ai — wymaga autoryzacji po stronie właściciela
  albo zleceń w rozmowie claude.ai; ADR-021 fallback).
- Zrzuty podstron funkcji wg DECYZJI F4-3; pomiar W4 (LCP
  z obrazami — zapas zerowy, plan eager dla filaru 1 gotowy).

## PUNKTY DECYZJI WŁAŚCICIELA

- **DECYZJA F4-1 (blokuje Etap A): architektura podstron funkcji.**
  (a) REKOMENDACJA: 4 podstrony filarowe wg STRATEGIA pkt 28–31
  (pozyskiwanie/tresci/zespol/wyniki), każda prezentuje KOMPLET
  funkcji DZIAŁA swojego filara sekcjami (38 funkcji łącznie;
  podział wg zadań dnia; 12 stron ×3 języki do utrzymania);
  (b) podstrona per funkcja (38 URL-i ×3 = 114 stron — głębia
  maksymalna, koszt utrzymania i parytetu wysoki).
- **DECYZJA F4-2: /funkcje/tresci a Studio.** (a) REKOMENDACJA:
  podstrona wchodzi z resztą filara Treści (Tarcza, Pieczęć
  Etyczna, szablony, Paszport zgodności…), sekcja Studia w języku
  kierunku BEZ ekranu, zrzut dołączy po liftingu; (b) cała
  podstrona czeka na wariant C.
- **DECYZJA F4-3: obrazy podstron funkcji.** (a) zrzuty Playwright
  per podstrona — kolejne zlecenia okna aplikacji (Z7+; realna
  praca po Twojej stronie); (b) REKOMENDACJA NA START: podstrony
  wchodzą bez zrzutów (tekst + ewentualna dekoracja), zrzuty
  dołączają partiami zleceniami; (c) tylko dekoracyjne Higgsfield.
- **DECYZJA F4-4: zakres /pomoc na start.** (a) REKOMENDACJA:
  statyczne centrum pomocy — pierwsze kroki + FAQ ponad cennikowe
  (fan-out treści), BEZ wyszukiwarki (pkt 36 przewiduje
  wyszukiwarkę — to pierwszy realny JS na stronie; osobna
  iteracja z decyzją o budżecie INP); (b) od razu z wyszukiwarką.
  **ROZSTRZYGNIĘTA dwuetapowo.** 2026-08-14: wariant (a) bez
  wyszukiwarki, zakres „pierwsze kroki + FAQ ponadcennikowe +
  kontakt", ale BEZ liczbowej obietnicy czasu odpowiedzi (brak
  pokrycia operacyjnego; ADR-014 doprecyzowanie 2026-08-14).
  2026-08-15, po dwóch werdyktach adwersaryjnych NIE PRZECHODZI:
  **`/pomoc` zmienia gatunek — strona krótka i nawigacyjna, nie
  kompilacyjna.** Człon „FAQ ponadcennikowe" **wypada**; w jego
  miejsce wchodzą **drogowskazy-linki** do odpowiedzi już
  istniejących (`/cennik` — płatności, `/funkcje` — dzień pracy)
  z zerem kopiowania zdań. Pierwsze kroki: 2–3 zdania własne
  + zdanie o logowaniu przy premierze **w ciągu kroków**
  (`StronaLogowania.tresc`), nie w osobnym FAQ. Kontakt: stan
  faktyczny jak w stopce („wkrótce"), bez presupozycji, że
  odpowiedź istnieje, i bez pięter zapowiedzi. Uzasadnienie
  właściciela: „Krótkość jest cechą, nie brakiem — strona pomocy
  przedpremierowej nie ma prawa być długa."
  Skutki zapisane osobno: ADR-014 (doprecyzowanie 2026-08-15 —
  zakres `/pomoc` wraca do zapisu pierwotnego, więc ADR uchylający
  przestaje być potrzebny) oraz rejestr warunków powrotu T5
  (piąta podstrona bezprzedmiotowa, ale sam T5 otwarty) i T6
  (`bramka:liczby` ślepa na `messages` — osobne zlecenie po
  Etapie E).
  **UCHYLONA 2026-08-15, trzeci raz tego dnia — i ostatni.**
  Po trzecim komplecie werdyktów NIE PRZECHODZI (trzej adwersarze,
  27 zarzutów, 9 blokujących) właściciel wycofał `/pomoc` z zakresu
  startu w całości: *„Krótkość była cechą, pustka nie jest."*
  DECYZJA F4-4 przestaje mieć przedmiot — nie ma zakresu `/pomoc`
  na start, bo nie ma `/pomoc`. Powrót po premierze, warunek
  potrójny (treść z odczytu · istniejący kanał kontaktu ·
  przetestowany onboarding) — rejestr warunków powrotu **T8**,
  ADR-014 doprecyzowanie 2026-08-15 (III).
  **T5 równolegle ZAMKNIĘTE** decyzją przeciwną: cztery podstrony
  filarów i `/dla-kogo` **wchodzą** do zakresu startu (ADR-014,
  doprecyzowanie 2026-08-15 II) — stan faktyczny po Etapach C–D,
  luka formalna. **T7 dopisane:** rejestr zdań z datą ważności
  jako pozycja checklisty premiery, bez budowy mechanizmu.
- **DECYZJA F4-5: mapa strony w stopce** — potwierdzenie zakresu
  (wszystkie podstrony publiczne; dokumenty prawne nadal „(wkrótce)"
  do Fazy dokumentów — pkt 40 poza tą fazą?).
  **ROZSTRZYGNIĘTA 2026-08-15 (właściciel):** dokumenty prawne
  zostają w stopce jako **pozycje z adnotacją „(wkrótce)"** —
  nieaktywne, wyszarzone, **NIE ukryte**; uczciwiej pokazać, że
  będą, niż udawać, że ich nie ma. Aktywacja (linki + strony)
  w Fazie 6, z pełnymi dokumentami. Mapa stopki = **komplet
  istniejących adresów** + pozycje prawne-„wkrótce".
  Stan kodu potwierdzony wobec tej decyzji: `Stopka.tsx:74-83`
  renderuje `DOKUMENTY` jako TEKST „Nazwa (wkrótce)" w `ul.martwe`
  (kolor `--kolor-rola-tekst-drugorzedny`), sekcja Kontakt tak samo
  — **zero zmian kodu w tej części**, decyzja jest wpisem
  dokumentacyjnym „zostaje do Fazy 6".
  **DOPRECYZOWANIE 2026-08-15 (właściciel) — ile znaczy „komplet":**
  komplet to **osiem adresów treściowych**, nie dziewięć.
  `ISTNIEJACE_SCIEZKI` ma dziś dziewięć pozycji, ale `/login`
  **nie wchodzi** do mapy: *„mapa to spis TREŚCI serwisu, `/login`
  to AKCJA obecna w nagłówku każdej strony (ADR-023); dublowanie
  rozmywa oba"*. Mapa: `/` · `/funkcje` · cztery `/funkcje/*` ·
  `/cennik` · `/dla-kogo`. Skutek liczbowy dla bramek: linków
  w stopce **11** (8 mapy + 3 języki), nie 6 —
  `e2e/parytet-ui.spec.ts:29` wymaga świadomej aktualizacji
  z adnotacją. Pełny zapis: `docs/faza-4/etap-e-pomoc-decyzje.md`,
  sekcja „Rozstrzygnięcie uzupełniające".
  Otwarte i przeniesione do punktów decyzji Etapu E: sama **mapa
  strony** iteruje dziś wyłącznie `POZYCJE_MENU` (3 pozycje), więc
  brakuje `/`, `/login` i czterech podstron filarów — a **krótkich
  etykiet dla podstron filarów nie ma w `messages`** (istnieją tylko
  H1 i linki prozą „Zobacz wszystko o pozyskiwaniu"). Mapa stopki
  jest zatem **treścią ×3 języki**, nie mechaniką, i wchodzi przez
  panel treści razem z `/pomoc`.
  **KOREKTA — powyższe zdanie o brakujących etykietach było
  NIEPRAWDĄ.** Sprawdzone wykonaniem po wszystkich trzech plikach
  messages: etykiety istnieją jako `FunkcjeX.okruszek` (pl/en/de,
  komplet), bo każda podstrona filaru ma dwupoziomowe okruszki.
  Mapa stopki nie potrzebowała ANI JEDNEGO nowego ciągu — jest więc
  mechaniką, nie treścią, i panel treści był tu zbędny. Precedens
  reużycia: indeks `/funkcje` (D-D12). Zapis stoi tu w brzmieniu
  pierwotnym celowo: pokazuje, że przesłanka „trzeba dopisać treść"
  przeżyła kilka rund, zanim ktokolwiek ją sprawdził.
- **DECYZJA F4-6 (niewiążąca teraz): strategia PR do main** —
  kumulacja trwa; pytanie o wymagalność bramki nieodwracalnych
  w CI przy pierwszym PR wraca przy jego otwieraniu.
- **Zgody osobne:** każdy push (per etap lub zbiorczo — jak
  w Fazie 3); zlecenia okna aplikacji (Z7+); autoryzacja
  konektora Higgsfield.

## Granice i zasady

Karta tonu, tabela obietnic (gramatyka DZIAŁA/klucz/milczenie),
słownik nazw, rejestr warunków powrotu — obowiązują każdą treść.
Studio: ZAKAZ ekranu do wariantu C. Wszystkie liczby przez
facts.json/migawkę. Zero JS (wyjątek wymaga decyzji jak K6).
Parytet ×3 od pierwszego commita treści. Strażnicy znak w znak
dla każdej nowej przestrzeni messages.
