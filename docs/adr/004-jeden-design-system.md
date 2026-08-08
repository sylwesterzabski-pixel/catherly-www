# ADR-004 — Jeden design system, rozjazd wykrywany kontraktem

## Kontekst
Strona i aplikacja mają wyglądać jak jeden produkt. Rozjazd wykrywany
okiem jest wykrywany za późno (STRATEGIA.md, zasada 4 i pkt 10).

## Decyzja
Strona i aplikacja korzystają z tego samego design systemu. Tokeny przed
komponentami: skala typograficzna, odstępy, paleta, promienie, cienie
i czasy animacji jako zmienne CSS z jednego źródła — `design/tokens.json`.
Rozjazd wykrywany testem kontraktowym, nie okiem.

## Konsekwencje
- `tokens.json` → Style Dictionary → zmienne CSS strony i eksport dla
  aplikacji; test kontraktowy porównuje wygenerowane artefakty obu stron
  (PLAN.md, sekcja 2).
- Bramka „Kontrakt tokenów" w CI: 0 rozjazdów.
- Linter tokenów blokuje wartości wizualne spoza `tokens.json` u każdego
  agenta; nowa wartość wymaga ADR-a, nie wyjątku.

## Data
2026-08-06 (decyzja w dokumencie strategii, zasada 4); spisano 2026-08-08.
