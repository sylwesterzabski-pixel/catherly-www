# ADR-011 — Obrazy generowane: tylko warstwa dekoracyjna, nigdy pseudo-zrzuty

## Kontekst
Grafika udająca interfejs aplikacji to zmyślony dowód — wykrywalny
i kosztowny jak zmyślona opinia (STRATEGIA.md, pkt 17 i 22; PLAN.md,
sekcja 3.4).

## Decyzja
Obrazy generowane (Higgsfield MCP) służą wyłącznie warstwie dekoracyjnej.
Zakaz absolutny: nic, co udaje zrzut z aplikacji. Zrzuty produktu robi
wyłącznie Playwright na prawdziwej aplikacji z neutralnymi danymi demo
(wymyślone nazwy własne per ADR-001).

## Konsekwencje
- Wejściem agenta obrazów jest wyłącznie `design/image-style.md` + brief.
- Każdy obraz przechodzi pipeline (AVIF/WebP, warianty od 390 px, lazy
  load poza pierwszym ekranem); surowy plik z generatora nigdy nie trafia
  do `src/`.
- Punkt na checkliście agenta-adwersarza przy każdym PR z grafiką.

## Data
2026-08-06 (decyzja w dokumencie strategii); spisano 2026-08-08.
