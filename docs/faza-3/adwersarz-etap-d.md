# Protokół adwersarza: Etap D (K4 filary + S9 + treść + Z6)

**Zakres:** diff 324660f..2a433bc (brief K4, Z6, HF po panelu
i DECYZJACH 9/10, treść S9 ×3 języki po panelach, handoff,
implementacja Filar/DbanieOSiebie/wyroznienie, messages ×3, testy).
Jedna runda (2026-08-11). Adwersarz w granicach catherly-www (zakaz
odczytu repo aplikacji dotrzymany); wszystko uruchamiał samodzielnie;
working tree po przebiegu czysty.

## Przebieg

Treść znak w znak: 22 teksty ×3 języki wobec content (niezależny
skrypt; PL U+2014 ×9, DE U+2013 ×14, „Senden“ U+201E/U+201C).
Implementacja 1:1 z HF i handoffem (W2 aria-hidden tylko ramka;
W6 — w zbudowanym CSS dokładnie JEDNO wystąpienie duetu
1.125/600). Bramki + build + suita: 107/2 znane/3 skipy. No-JS ×3
języki: 20 tekstów + S9 + sr-only H2 w surowym HTML; DOM
tekst→obraz; zero <img> w src/ (ADR-011 — ramki puste, bez tekstu
sugerującego UI). Axe zielony; main 1×h1+5×h2; zoom 640/320 px bez
poziomego scrolla; regresje hero/404//pl→307/aria-current zielone.

## Mutacje

| # | Mutacja | Runda 1 | Po naprawach |
|---|---|---|---|
| a | marker → kolor tekstu | ZŁAPANA (test markera ×2) | — |
| b1 | zebra L-L-P-L (filar 1 obrazPoLewej) | NIEZŁAPANA | ZŁAPANA (pełny wzór L-P-L-P, desktop) |
| b2 | zamiana filar 1 ↔ 2 | ZŁAPANA (zebra) | — |
| c | sr-only przez display:none | ZŁAPANA (×6) | — |
| d | literówka DE w messages | ZŁAPANA (strażnik znak w znak ×2) | — |

## Ustalenia i naprawy

- **ISTOTNE 1 (zamknięte):** test zebry pilnował wyłącznie filaru 2
  — mutacja b1 przechodziła suitę. Naprawa: asercja order ramki
  na WSZYSTKICH 4 filarach (desktop 0/1/0/1; mobile 0 + brak
  siatki). Czułość udowodniona mutacją b1 (1 czerwień).
- **DROBNE 4 (zamknięte):** key={konkret} → key={indeks}
  (odporność na identyczne konkrety).

## Odnotowane bez naprawy (świadomie)

- **DROBNE 2 — do decyzji właściciela na poziomie content:**
  typografia treści OBOWIĄZUJE zawiera PL „wyślij" z prostym
  cudzysłowem zamykającym U+0022 (zamiast typograficznego U+201D)
  i EN 3 proste apostrofy U+0027 (you've, what's, It's — zamiast
  U+2019). Parytet strona↔content zachowany co do bajta; zmiana
  wymaga decyzji w plikach treści, nie w implementacji.
- DROBNE 3: strażnik znak w znak normalizuje \s+ (w tym NBSP) —
  margines teoretyczny, do zacieśnienia przy okazji.

## Werdykt

**PRZYJĘTY** (runda 1, bez blokujących) — po naprawach czułości
suita 107 passed / 2 znane czerwienie / 3 skipy. Czeka na akcept
właściciela; obrazy wejdą po dostawie Z6 (pipeline + odbiór Prawo 2
+ pomiar W4).
