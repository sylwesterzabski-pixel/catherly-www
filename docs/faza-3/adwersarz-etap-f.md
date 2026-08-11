# Protokół adwersarza: Etap F (złożenie stron — finał Fazy 3)

**Zakres:** diff 7311e16..HEAD (brief+HF po panelu, ADR-028 +
migracja tokenów wymiarów, apostrofy EN, SekcjaRytmu/CennikSkrot/
Zamkniecie, złożenie głównej S1–S14 i /cennik C8, messages
7 przestrzeni ×3, testy złożenia, ADR-027 z pomiarem LCP).
Adwersarz na ZŁOŻONYCH stronach (plan §3); jedna runda + naprawy
(2026-08-12). Granice zachowane; wszystko uruchamiał sam.

## Zielone z dowodem (skrót)

Kolejność sekcji ×3 po DOM = wireframe; nagłówki 1×h1 + 10×h2
main (sr-only: S9/S11/S12) + 4×h2 stopki ×3; LUSTRO L1: tło
terakota-100, Δx kropek 0,000 px, duet 600/18 px, kotwica znak
w znak (konkatenacja PL 93 zn), kontrasty niezależnie 11,15:1 /
6,51:1; K10 z rachunkiem własnym (99/199/399 zł · 25/49/95 €),
sort Starter→Growth→Pro, jeden link, wiersze nieinteraktywne;
K11/C8 poprawne; klawiatura 21 przystanków w porządku dokumentu;
zoom 320/640 bez panoramy; no-JS: komplet pól ×3; axe 18 tras;
regresje /pl→307, 404, aria-current; ADR-028 — zero literałów
poza @media (48rem jednolicie); Stripe: migawka zgodna (odczyt).

## Mutacje

| # | Mutacja | Wynik |
|---|---|---|
| a | tło S10 → powierzchnia | ZŁAPANA (test lustra ×2) |
| b | zamiana kropek S3↔S10 w messages | ZŁAPANA (strażnik znak w znak) |
| c | zdjęcie ogranicznika W2 (kolumna S10) | r1: NIEZŁAPANA (Δx 256 px przy zielonej suicie) → po naprawie: ZŁAPANA (strażnik geometryczny Δx ≤ 1 px, desktop) |
| d | sort planów odwrócony | ZŁAPANA (6 testów) |

## Ustalenia i naprawy

- **ISTOTNE 1 (zamknięte):** warunek W2 panelu bez strażnika —
  dopisany test geometryczny kolumny kropek (Δx ≤ 1 px, desktop);
  czułość udowodniona mutacją c (256 px → czerwień).
- **ISTOTNE 2 (zamknięte):** ADR-027 podawał pojedynczy pomiar
  LCP 1,7 s; przebiegi adwersarza 1,77/1,78/1,82 s (jeden NAD
  progiem). ADR skorygowany: zapas praktycznie zerowy, wariancja
  odnotowana — wzmacnia rekomendację system-ui.

## Odnotowane bez naprawy (do decyzji właściciela)

- sr-only „Sześć obaw" po polsku na stronach EN/DE (pochodna
  tytułu treści; wymaga sankcji albo tytułów sekcyjnych EN/DE
  w content).
- EN dopełniacze `customers'` / `jurisdictions'` z U+0027
  (spójnie messages↔content — strażnik zielony); commit apostrofów
  pominął formy s'. Przedetapowe: „Who it's for",
  „This page doesn't exist." (messages nawigacji/404 — poza F).
- bramka:nieodwracalne czerwona (audyt pusty) — wdrożeniowa,
  wymaga planu przy domknięciu Fazy 3 (Faza 6 per plan).

## Werdykt

**PRZYJĘTY** (po domknięciu ISTOTNYCH 1–2). Suita końcowa:
178 passed / 4 skipy (182 testy; zero czerwonych). Czeka na
akcept właściciela Etapu F + decyzję ADR-027.
