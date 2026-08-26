# ADR-027: Krój pisma — system-ui na premierę iteracji 1

> ⚠ **UCHYLONY 2026-08-26 przez [ADR-031](031-paleta-kancelaria-i-kroj-onest.md)**
> — krojem produkcyjnym jest Onest (decyzja właściciela, zlecenie
> `WWW/038-bis`, decyzja ③).
>
> **Uchylenie zgłoszone jako rozszerzenie zlecenia.** K5 nakazywał
> unieważnić wyłącznie ADR-026 i o tym ADR-ze nie wspominał. Uchylono go
> mimo to, bo pozostawienie przy życiu **nowszej** i bardziej szczegółowej
> decyzji o tym samym przedmiocie dałoby dwie sprzeczne, żywe reguły —
> defekt tej samej klasy co T32 (dwie deklaracje nadrzędności).
>
> **POMIAR PONIŻEJ NIE ZOSTAJE UNIEWAŻNIONY.** Uchylenie dotyczy
> rozstrzygnięcia („system-ui na premierę"), nie liczb. Ustalenie
> o zerowym zapasie LCP i o koszcie webfontu na H1 (0,2–0,5 s) jest
> pomiarem i obowiązuje do czasu, aż zastąpi je **nowszy pomiar**, a nie
> nowsza decyzja. W chwili uchylenia bramka wydajności na gałęzi
> `faza-4/podstrony` jest CZERWONA (mediana LCP `/` 1856 ms wobec budżetu
> 1800 ms, odczyt 2026-08-23) — czyli budżet jest przekroczony **jeszcze
> przed** dołożeniem webfontu.
>
> **Alternatywa z rozdziału „Alternatywa" niżej pozostaje dostępna**
> i jest jedyną opisaną drogą pogodzenia kroju z budżetem: webfont
> wyłącznie poniżej foldu i dla liczb cennika, H1 na `system-ui`.

Data: 2026-08-12. Status: **PRZYJĘTY (decyzja właściciela
2026-08-12)** — pomiary 1,70–1,82 s rozstrzygają: webfont nie
mieści się w budżecie już dziś; cyfry tabelaryczne przez
font-variant-numeric spełniają wymóg STRATEGII; wybór kroju =
OSOBNA ITERACJA z pomiarem na preview (warunek wiążący — pkt 3
propozycji). Granica ADR-026 domknięta w terminie (etap F).

## Kontekst

ADR-026 nadał typografii system-ui datę ważności: koniec etapu F.
STRATEGIA wymaga docelowo kroju tekstowego + kroju do liczb
z cyframi tabelarycznymi. Warunek twardy ADR-026 dla webfontu:
re-pomiar LCP i budżet 1,8 s Z zapasem.

## Pomiar bazowy (Lighthouse 2026-08-12, profil mobilny
z throttlingiem, strona główna ZŁOŻONA S1–S14, build produkcyjny)

| Metryka | Wynik | Próg |
|---|---|---|
| LCP (element: H1 hero, tekst) | **1,7 s** (adwersarz, 3 przebiegi: 1,77 / 1,78 / 1,82 s — JEDEN NAD progiem) | < 1,8 s |
| FCP | 0,9 s | — |
| CLS | 0 | < 0,1 |
| TBT | 0 ms | (INP proxy) |
| Performance | 100 | — |

Zapas budżetu LCP: **praktycznie ZEROWY** — wariancja przebiegów
(orkiestrator 1,7 s; adwersarz 1,77–1,82 s, w tym jeden przebieg
NAD progiem) pokazuje, że budżet jest na styk już bez webfontu.
Webfont na H1 (pobranie + swap na łączu mobilnym) kosztuje typowo
0,2–0,5 s — warunek ADR-026 „z zapasem" jest dziś niespełnialny
dla H1; to WZMACNIA rekomendację pozostania przy system-ui.

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
