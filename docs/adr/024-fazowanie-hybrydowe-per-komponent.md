# ADR-024: Fazowanie hybrydowe per komponent (Fazy 3+4 przeplatane)

Data: 2026-08-10. Status: PRZYJĘTY (DECYZJA 5 właściciela).

## Kontekst

PLAN.md sekcja 6 rozdziela Fazę 3 (Projekt: wireframe → high
fidelity → trzy paczki handoff) od Fazy 4 (Implementacja: fan-out po
sekcjach, pipeline 4.1). Po zamknięciu Fazy 2 (treść pl/en/de
OBOWIĄZUJE) i Fazy 1 (tokeny, design-sync) właściciel uruchomił
„Fazę 3 — komponenty" z bramkami kodowymi, które zielenieją wyłącznie
na kodzie.

## Decyzja

Fazy 3 i 4 są przeplatane PER KOMPONENT:

1. Najpierw wireframe UKŁADU trzech stron (główna, /cennik, wzorcowa
   podstrona funkcji) → akcept właściciela (DECYZJA 6) — zgodnie
   z duchem Fazy 3.
2. Następnie każdy komponent przechodzi PEŁNY pipeline 4.1 od briefu
   po zielone bramki i akcept PR: brief → wireframe → HF (tylko
   tokeny) → panel projektu (Prawo 2) → handoff → implementacja
   w worktree → bramki → adwersarz → akcept właściciela → merge do
   gałęzi fazy.
3. ZERO pomijanych etapów. Sekcja, która ominęła etap, wraca na jego
   początek (PLAN.md 4.1 — bez zmian). Definition of Done 4.2 — bez
   zmian. Zmienia się wyłącznie KOLEJNOŚĆ w harmonogramie: zamiast
   „wszystkie projekty, potem wszystkie implementacje" — komponent po
   komponencie przez całą drogę.

## Uzasadnienie

Treść i tokeny są zamknięte, więc projekt komponentu nie czeka na
żadne wejście. Komponent domknięty end-to-end weryfikuje handoff
natychmiast (błąd projektu wychodzi przy pierwszej implementacji,
nie po sześciu paczkach), a bramki jakości pracują od Etapu B zamiast
czekać na koniec fazy projektowej.

## Konsekwencje

- Kryterium wyjścia Fazy 3+4 (łączne): wszystkie sekcje trzech stron
  zmergowane do gałęzi fazy z zielonymi bramkami + trzy strony
  złożone; paczki handoff powstają per komponent (docs/faza-3/).
- Harmonogram PLAN.md sekcja 6 czyta się przez pryzmat tego ADR;
  plik PLAN.md pozostaje nietknięty.
- Faza 5 (spięcie z aplikacją) bez zmian — warunek wejścia
  (decyzja o app.catherly.com) nadal obowiązuje.
