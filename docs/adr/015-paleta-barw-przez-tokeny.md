# ADR-015 — Paleta barw: wybór narzędziami, prawda w tokenach

Pełny tekst decyzji: PLAN.md, sekcja 12.

## Kontekst
Paleta musi realizować ADR-013 (ciepła jakość: kremowe tło, kolory
przyjazne, nie statusowe — zakaz estetyki czerń/złoto) i przechodzić
bramkę kontrastu AA z zasady 2 strategii. Wybór „na oko" jest sprzeczny
z Prawem 1.

## Decyzja
Proces wyboru: kierunek w Huemint → weryfikacja na żywej makiecie
w Realtime Colors → rozwinięcie do pełnych skal odcieni (50–900)
w Accessible Palette → zapis do `design/tokens.json`. Od momentu zapisu
jedynym źródłem prawdy jest token; platformy kolorów są narzędziem
jednorazowego wyboru i nie wracają do procesu. Zmiana palety = nowy ADR.

## Konsekwencje
Linter tokenów blokuje kolory spoza `tokens.json` u każdego agenta.
Test kontraktowy pilnuje zgodności strona↔aplikacja. axe w CI pilnuje
kontrastu każdej pary tło–tekst. Kandydat palety przechodzi test odbioru
z ADR-013 („oni mnie rozumieją" — nie „ale elegancko", nie „słodkie").

## Data
2026-08-06.
