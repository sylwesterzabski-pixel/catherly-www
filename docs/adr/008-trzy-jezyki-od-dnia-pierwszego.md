# ADR-008 — Trzy języki od dnia pierwszego, hreflang + x-default

## Kontekst
Aplikacja ma już trzy języki, więc strona nie może być uboższa
(STRATEGIA.md, pkt 9).

## Decyzja
pl / en / de od pierwszego dnia, z hreflang i x-default. Trzy wersje to
trzy adaptacje kulturowe, nie trzy tłumaczenia (PLAN.md, sekcja 3.2).

## Konsekwencje
- Bramka parytetu językowego w CI: identyczne drzewa plików i klucze
  w `content/pl|en|de`; strona bez de nie zbuduje się wcale.
- Ceny per język: PLN dla pl, EUR dla en/de (ADR-012).
- Mikrotypografia per język w warstwie rzemiosła (ADR-014).
- Soczewka 4 audytu sprawdza hreflang, x-default, tytuły i opisy
  per język.

## Data
2026-08-06 (decyzja w dokumencie strategii, pkt 9); spisano 2026-08-08.
