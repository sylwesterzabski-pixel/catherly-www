# ADR-027: Krój pisma — propozycja: system-ui na premierę iteracji 1

Data: 2026-08-12. Status: **PROPOZYCJA — DO DECYZJI WŁAŚCICIELA**
(granica ADR-026: etap F nie może zostać zamknięty bez
rozstrzygnięcia tego ADR-a).

## Kontekst

ADR-026 nadał typografii system-ui datę ważności: koniec etapu F.
STRATEGIA wymaga docelowo kroju tekstowego + kroju do liczb
z cyframi tabelarycznymi. Warunek twardy ADR-026 dla webfontu:
re-pomiar LCP i budżet 1,8 s Z zapasem.

## Pomiar bazowy (Lighthouse 2026-08-12, profil mobilny
z throttlingiem, strona główna ZŁOŻONA S1–S14, build produkcyjny)

| Metryka | Wynik | Próg |
|---|---|---|
| LCP (element: H1 hero, tekst) | **1,7 s** | < 1,8 s |
| FCP | 0,9 s | — |
| CLS | 0 | < 0,1 |
| TBT | 0 ms | (INP proxy) |
| Performance | 100 | — |

Zapas budżetu LCP: **0,1 s**. Webfont na H1 (pobranie + swap na
łączu mobilnym) kosztuje typowo 0,2–0,5 s — ryzyko przekroczenia
budżetu jest realne, a warunek „z zapasem" nie byłby spełniony.

## Propozycja (rekomendacja do decyzji)

1. **Premiera iteracji 1 na system-ui** — świadome pozostanie,
   ADR-em (ścieżka dopuszczona wprost w ADR-026 pkt 2).
2. Wymóg cyfr tabelarycznych STRATEGII jest spełniony bez webfontu:
   `font-variant-numeric: tabular-nums` działa na stosie systemowym
   (K7/K10 już go używają — liczby cennika równają się w kolumnach).
3. Wybór docelowego kroju wraca jako OSOBNA iteracja po premierze,
   z pomiarem LHCI na preview (osobna zgoda właściciela na deploy
   preview) i strategią ładowania (font-display, preload, subset)
   opisaną w ADR kroju — warunki ADR-026 pkt 3 pozostają w mocy.

## Alternatywa (jeśli właściciel wybierze webfont teraz)

Wariant zgodny z warunkami: webfont WYŁĄCZNIE dla treści poniżej
foldu + liczb cennika (H1/hero zostaje na system-ui — LCP nietknięty);
koszt: dwie rodziny w użyciu, spójność typograficzna do oceny
wizualnej właściciela. Wymaga wyboru konkretnego kroju (decyzja
estetyczna właściciela) i pomiaru na preview przed merge.

## Konsekwencje propozycji

- Zero zmian w kodzie (stan obecny = zgodny).
- Deklaracja font-family pozostaje w globals (ADR-026 pkt „jedyne
  legalne miejsce") do czasu ADR-u kroju docelowego.
