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

### Etap E — centrum pomocy + pełna mapa strony

- /pomoc (pkt 36) w zakresie DECYZJI F4-4.
- Stopka: pełna mapa strony (wszystkie istniejące podstrony;
  linki wchodzą wraz ze stronami — bramka linków pilnuje).

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
- **DECYZJA F4-5: mapa strony w stopce** — potwierdzenie zakresu
  (wszystkie podstrony publiczne; dokumenty prawne nadal „(wkrótce)"
  do Fazy dokumentów — pkt 40 poza tą fazą?).
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
