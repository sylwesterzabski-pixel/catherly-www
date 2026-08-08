# ADR-002 — Progi wydajności i dostępności jako bramki blokujące

## Kontekst
„Światowy poziom" musi być mierzalny, nie deklarowany (STRATEGIA.md,
zasada 2). Niespełniony próg = czerwony build, nie notatka na później.

## Decyzja
Twarde progi jako bramki CI blokujące merge:
- LCP < 1,8 s na 4G
- INP < 200 ms na 4G
- CLS < 0,1
- kontrast AA na każdym tekście
- pełna obsługa klawiaturą (fokus widoczny, kolejność logiczna)
- treść czytelna bez JavaScriptu

## Konsekwencje
- Lighthouse CI na preview Vercel, axe-core + testy Playwright w CI
  (PLAN.md, sekcja 5).
- Bramki wchodzą przy pierwszym commicie i nigdy nie są rozluźniane,
  żeby przeszły.
- Dostępność sprawdzana automatycznie: kontrast, ślad fokusa, kolejność
  tabulacji, hierarchia nagłówków, teksty alternatywne, etykiety
  formularzy (STRATEGIA.md, pkt 15).

## Data
2026-08-06 (decyzja w dokumencie strategii, zasada 2); spisano 2026-08-08.
