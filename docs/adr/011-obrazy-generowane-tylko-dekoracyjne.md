# ADR-011 — Obrazy generowane: tylko warstwa dekoracyjna, nigdy pseudo-zrzuty

> ⚠ **ZAKRES ZAWĘŻONY 2026-08-26 przez
> [ADR-037](037-twarze-generowane-i-dwie-warstwy-obrazowe.md)** (decyzja
> właściciela, zlecenie `WWW/052`).
>
> **CO ZOSTAJE W MOCY — i to jest większość tego ADR-a:** dowód produktu
> robi **wyłącznie Playwright** na danych demo, bajt w bajt; surowy plik
> z generatora nigdy nie trafia do `src/`; każdy obraz przechodzi
> pipeline. Zasada „zmyślony dowód jest wykrywalny i kosztowny" —
> nietknięta.
>
> **CO TRACI MOC:** zdanie *„zakaz absolutny: nic, co udaje zrzut
> z aplikacji"* — w zakresie, w jakim obejmowało **stylizowaną dekorację
> 3D bez czytelnego tekstu**. Od ADR-037 obowiązują DWIE WARSTWY:
> (a) dowód produktu — jak wyżej, bez zmian; (b) dekoracja marketingowa —
> dozwolona, o ile nie jest podpisana ani prezentowana jako zrzut.
>
> **Granica rozstrzygająca:** czytelny tekst w panelu zamienia dekorację
> w twierdzenie i przenosi kadr z powrotem pod warstwę (a).

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
