# Brief K3: sekcja tekstowa (Etap B; pipeline 4.1)

Status: BRIEF. Układ stron: OBOWIĄZUJE (DECYZJA 6). Najprostszy
komponent — celowo pierwszy razem z K1: przeciera pełny łańcuch
jakości najtańszym kosztem.

## Zakres

Sekcja H2 + proza. Konsumuje: problem.md (S3) i definicja.md (S4).
Warianty tonalne (potrzebne dla lustra L1):
- `neutralna` — tło strony (S4 definicja; S3 problem),
- `akcentowa` — tło akcentowe (użyje jej S10 rytm dnia; sam wariant
  powstaje TERAZ, żeby warunek DECYZJI 6 — kontrast AA Z ZAPASEM na
  tle akcentowym — zweryfikować od razu, nie przy S10).

## Wymagania

- Szerokość miary tekstu z tokenów (czytelność prozy, 390 px+).
- Ostatnie zdanie sekcji może być wyeksponowane w osobnej linii
  (slot „słyszalnej kropki" — używa go S3 i S10; parametr, nie
  osobny komponent).
- Kontrast AA: dla wariantu akcentowego WYLICZONY w HF na parach
  tokenów i potwierdzony axe — warunek właściciela (DECYZJA 6):
  AA z zapasem, nie na styk.
- Zero JS. Zero ruchu. Parytet pl/en/de ze wspólnej struktury.
- H2 z treści, poziomy nagłówków spójne z dokumentem (jeden H1/stronę).

## Pipeline dalej

HF obu wariantów tonalnych → panel projektu (kontrast wyliczony
liczbowo per para tokenów) → handoff → implementacja
(src/components/SekcjaTekstowa) → bramki → adwersarz → akcept.
