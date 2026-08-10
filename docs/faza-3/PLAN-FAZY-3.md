# Plan Fazy 3 — komponenty (do akceptu właściciela; zero kodu przed akceptem)

**Data:** 2026-08-10. **Gałąź:** faza-3/komponenty (od
faza-2/tresc-i-pozycjonowanie — main nie zawiera treści Fazy 2).
**Status: PROJEKT — czeka na DECYZJĘ 5.**

---

## 0. Rozjazd nazewnictwa — DECYZJA 5 (blokuje start)

PLAN.md sekcja 6: **Faza 3 = Projekt** (wireframe → akcept → high
fidelity → „trzy paczki handoff": główna, cennik, wzorcowa podstrona
funkcji), a **implementacja komponentów = Faza 4** (pipeline 4.1
per sekcja). Polecenie właściciela: „Faza 3 — komponenty" z bramkami
kodowymi (AA, klawiatura, no-JS), które zielenieją wyłącznie na kodzie.

**Wariant A — literalnie wg PLAN.md:** ta faza kończy się trzema
paczkami handoff (zero kodu); bramki kodowe zielenieją w Fazie 4.

**Wariant B — hybryda per komponent (REKOMENDACJA):** najpierw
wireframe UKŁADU trzech stron (akcept właściciela), potem każdy
komponent przechodzi PEŁNY pipeline 4.1 od wireframe po zielone
bramki — fazy 3 i 4 przeplatane per komponent, żaden etap pipeline'u
nie jest pomijany. Wymaga ADR-024 (reorganizacja harmonogramu,
nie skrót — pipeline 4.1 nienaruszony). Uzasadnienie: treść (Faza 2)
i tokeny (Faza 1) są zamknięte; komponent przechodzący całą drogę
daje działające sekcje z zielonymi bramkami szybciej i weryfikuje
handoff natychmiast, zamiast odkładać ryzyko implementacji na koniec.

Dalej plan opisuje wariant B; w wariancie A obowiązują te same etapy
do punktu „handoff" włącznie.

## 1. Inwentarz komponentów (wyprowadzony z treści Fazy 2)

| # | Komponent | Konsumuje treść | Strony |
|---|---|---|---|
| K1 | Nawigacja (sticky, lekka: Logo · Funkcje · Cennik · Dla kogo · Logowanie→/login) + stopka | STRATEGIA pkt 16, ADR-023 | wszystkie |
| K2 | Hero (H1 + podtytuł + CTA + pasek potwierdzeń) | pl/en/de naglowek | główna |
| K3 | Sekcja tekstowa (H2 + proza) | problem, definicja | główna |
| K4 | Sekcja filara (H2 + korzyść + 3 konkrety + obraz, naprzemienna orientacja) | filary ×4 + mini-sekcja Dbanie o siebie | główna |
| K5 | Karta planu (nazwa, cena z migawki, „dla kogo", lista, CTA→/login) | cennik §3 | /cennik, skrót |
| K6 | Przełącznik miesięcznie/rocznie (działa bez JS: domyślny widok = miesięczny; wariant no-JS pokazuje obie ceny) | cennik §2 | /cennik |
| K7 | Tabela porównawcza (scroll w kontenerze, dostępne nagłówki) | cennik §4 + tabela obietnic (limity Z1) | /cennik |
| K8 | FAQ / obawy (natywne details/summary — no-JS z definicji) | obawy, cennik §5 | główna, /cennik |
| K9 | Pasek potwierdzeń (samodzielny, reużywany) | potwierdzenia | hero, /cennik |
| K10 | Cennik w skrócie (3 plany + jedna różnica + link) | cennik — skrót | główna |
| K11 | Zamknięcie (CTA końcowe + zdanie o braku zobowiązania) | cennik §7 + pkt 25 | główna, /cennik |
| K12 | Szablon podstrony funkcji (wzorzec dla /funkcje/*) | NOWA TREŚĆ (pkt 2) | wzorcowa podstrona |

## 2. Luki treściowe wykryte przy inwentarzu (DECYZJA 7)

1. **Sekcja rytmu dnia (STRATEGIA pkt 21)** — zarezerwowany materiał
   „Wieczorem widzisz, co z tego wyszło" czeka; treści sekcji NIE MA.
   Propozycja: mini fan-out (2 warianty + panel) w trakcie etapu C.
2. **Zamknięcie strony głównej (pkt 25)** — do złożenia z materiału
   obowiązującego (CTA + „Rezygnujesz kiedy chcesz"); tryb skrócony.
3. **Wzorcowa podstrona funkcji** — zero treści. Propozycja:
   /funkcje/pozyskiwanie jako wzorzec (pkt 28; filar z najczystszym
   pokryciem DZIAŁA), pełny cykl treściowy (brief → fan-out → panel
   → decyzja) równolegle do etapów D–E.
4. **Sekcji dowodu (pkt 22) nie ma** — i słusznie: zero prawdziwych
   historii/liczb → sekcja nie istnieje (bez decyzji; odnotowane).

## 3. Kolejność etapów

- **Etap A — układ:** wireframe'y trzech stron (główna, /cennik,
  wzorcowa podstrona) jako low-fi w docs/faza-3/wireframes/
  → **DECYZJA 6: akcept układu** (blokuje wszystko dalej).
- **Etap B — fundament i przetarcie pipeline'u:** K1 (nawigacja+stopka)
  i K3 (sekcja tekstowa — najprostsza) przez pełny pipeline.
  Cel: zweryfikować cały łańcuch jakości na najtańszym komponencie.
- **Etap C — hero:** K2+K9 (ekran LCP — najostrzejszy budżet
  wydajności; font/obraz decydują o LCP < 1,8 s). Równolegle:
  mini fan-out treści pkt 21 i 25.
- **Etap D — filary:** K4 ×4 + mini-sekcja; obrazy przez pipeline
  obrazów (AVIF/WebP, warianty od 390 px; surowy plik nigdy do src/).
- **Etap E — cennik:** K5, K6, K7, K8 (najgęstszy zestaw; migawka
  Stripe jako źródło cen; limity Z1 przez facts.json — pkt 5).
- **Etap F — złożenie:** K10, K11, strona główna w całości, /cennik
  w całości, K12 + wzorcowa podstrona (z treścią z pkt 2.3);
  przegląd całości (adwersarz na złożonych stronach).

## 4. Pipeline jakości per komponent (PLAN.md 4.1 + DoD 4.2, bez skrótów)

1. **Brief komponentu** (treść wejściowa + tokeny + stany + breakpointy).
2. **Wireframe** → akcept właściciela (układ; DECYZJA per komponent
   tylko gdy układ odbiega od zaakceptowanego w Etapie A).
3. **High fidelity** (statyczny HTML/CSS wyłącznie na tokens.json)
   → panel projektu (osobny agent, Prawo 2): zgodność z tokenami,
   kontrast AA wyliczony na parach kolorów, hierarchia, 390 px.
4. **Handoff** (specyfikacja: tokeny, stany, fokus, zachowanie bez JS,
   prefers-reduced-motion, budżet wagi).
5. **Implementacja w worktree** (React/Next; treść importowana
   z content/, ceny z migawki, limity z facts.json — nigdy literały).
6. **Bramki pre-commit:** linter tokenów · linter liczb · axe.
7. **Testy komponentu:** Playwright klawiatura (fokus widoczny,
   kolejność logiczna) · render no-JS · reduced-motion · parytet
   pl/en/de (komponent renderuje trzy języki z jednej struktury).
8. **Agent-adwersarz** (osobny) na PR komponentu.
9. **Akcept właściciela → merge do gałęzi fazy** (nie do main).

## 5. Liczby i źródła (DECYZJA 8)

- Ceny: content/cennik-snapshot.json (Stripe; przed premierą migawka
  produkcyjna).
- Limity planów (50/200/10/50/20/100/5/30): wpisy w content/facts.json
  ze źródłem „kod aplikacji, raport Z1 (plan-limits.ts)" + data.
  Akcept wpisów = DECYZJA 8. Linter liczb wymusza import.

## 6. Bramki — co zzielenieje w tej fazie (wariant B)

| Bramka | Kiedy zielona |
|---|---|
| Linter tokenów + kontrakt tokenów (Style Dictionary diff) | od Etapu B, na każdym komponencie |
| axe (0 błędów) + klawiatura (Playwright) | per komponent od Etapu B |
| No-JS | per strona (Etap F; komponenty projektowane no-JS-first od B) |
| Parytet pl/en/de | od Etapu B (struktura treści już równa) |
| Linter liczb / prawdziwość | od Etapu E (facts.json + migawka) |
| Cennik: snapshot Stripe ↔ strona | Etap E (tryb testowy) |
| Linki wewnętrzne | Etap F |
| LHCI: LCP < 1,8 s · INP < 200 ms · CLS < 0,1 | Etap F na preview (wymaga podpięcia deployu preview — osobna zgoda) |
| **NIE w tej fazie:** E2E zakupu (Faza 5 — Stripe), raport nieodwracalnych (Faza 6), publikacja (Faza 7) | — |

## 7. Punkty decyzji właściciela (zebrane)

- **DECYZJA 5 (blokuje start):** wariant A (literalnie PLAN.md — sama
  paczka projektowa) czy **B (rekomendowany: per-komponent pełny
  pipeline; ADR-024)**.
- **DECYZJA 6:** akcept wireframe'ów układu trzech stron (Etap A).
- **DECYZJA 7:** luki treściowe — zgoda na mini fan-out pkt 21 i 25
  oraz pełny cykl treści wzorcowej podstrony (/funkcje/pozyskiwanie).
- **DECYZJA 8:** wpisy limitów do facts.json ze źródłem Z1.
- **Per komponent:** finalny akcept PR (ostatnia bramka — PLAN.md
  sekcja „Akcepty w toku").
- **Osobne zgody:** każdy push; podpięcie preview (LHCI).

## 8. Granice fazy

Gałąź faza-3/komponenty od głowy faza-2 (treść wymagana; main jej nie
ma). Main nietknięty; merge wyłącznie przez PR z zielonymi bramkami
(ADR-020) — kolejność PR do main (najpierw faza-2, potem faza-3, czy
jedna złożona) rozstrzygamy, gdy bramki będą osiągalne. Karta tonu,
tabela obietnic, słownik nazw i rejestr warunków powrotu obowiązują
każdego agenta fazy bez wyjątku.
