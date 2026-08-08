# ADR-009 — Jeden motyw, bez przełącznika jasny/ciemny

## Kontekst
Dwa motywy to podwójna praca i podwójne miejsce na błąd kontrastu
(STRATEGIA.md, pkt 12). Decyzja spójna z wcześniejszą decyzją dla produktu.

## Decyzja
Jeden motyw, spójny, zaprojektowany do końca. Bez przełącznika
jasny/ciemny.

## Konsekwencje
- Paleta w `design/tokens.json` projektowana dla jednego motywu
  (kierunek: ciepłe, kremowe tło per ADR-013 i ADR-015).
- Bramka kontrastu AA sprawdza jeden komplet par tło–tekst.
- Ewentualny drugi motyw w przyszłości = nowy ADR uchylający niniejszy.

## Data
2026-08-06 (decyzja w dokumencie strategii, pkt 12); spisano 2026-08-08.
