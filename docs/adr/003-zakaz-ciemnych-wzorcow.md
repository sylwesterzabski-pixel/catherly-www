# ADR-003 — Zakaz ciemnych wzorców (lista zamknięta z zasady 3)

## Kontekst
UX ma przyciągać, więc nie stosujemy niczego, co odpycha. Produkt ma moduł
etyki — strona nie może zachowywać się gorzej niż produkt (STRATEGIA.md,
zasada 3).

## Decyzja
Lista zamknięta zakazów, bez wyjątków:
- brak wymuszania rejestracji przed obejrzeniem czegokolwiek
- brak wyskakujących okien przy wejściu i przy próbie wyjścia
- brak sztucznych liczników czasu i fałszywej pilności
- brak ukrytych cen
- brak zmyślonych opinii i liczb klientek
- odrzucenie ciasteczek tak samo łatwe jak akceptacja (1 kliknięcie)

## Konsekwencje
- Zapisane w CLAUDE.md jako zakaz bezwzględny dla wszystkich ról.
- Soczewka 3 audytu (RODO i prawo) sprawdza mechanikę zgód.
- Komercyjne consent-platformy świadomie poza zestawem platform
  (ADR-016) jako fabryki ciemnych wzorców.

## Data
2026-08-06 (decyzja w dokumencie strategii, zasada 3); spisano 2026-08-08.
