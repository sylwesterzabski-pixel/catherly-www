# Brief K4: sekcja filara ×4 + mini-sekcja S9 (Etap D; pipeline 4.1)

Status: BRIEF. Układ strony: OBOWIĄZUJE (DECYZJA 6 — S5–S8 zebra
tekst/obraz, na 390 px tekst nad obrazem). Etap C (hero) przyjęty
w całości 2026-08-11.

## Zakres

Sekcje S5–S8 strony głównej: cztery filary (K4 — jeden komponent,
cztery instancje) + mini-sekcja S9 „Dbanie o siebie" (cichsza,
węższa — oddech, nie piąty filar). Treść (OBOWIĄZUJE, pl/en/de):
content/*/filary.md — per filar: H2 + korzyść + 3 konkrety.
Treść S9: mini fan-out + panel + decyzja właściciela (w toku —
materiał wyłącznie pokryty: Wall of Proof).

## Struktura K4 (per instancja)

- H2 (z treści; jedyna hierarchia po H1 hero — kolejne h2 strony).
- Korzyść: jedno zdanie wyróżnione (rozmiar pośredni H2/proza).
- Konkrety: LISTA 3 pozycji (ul — semantyka listy; nazwy funkcji
  aplikacji zgodne ze słownikiem nazw — Z3).
- Obraz: ZRZUT PRAWDZIWEJ APLIKACJI z Playwrighta na danych demo
  (ADR-011; polecenie właściciela 2026-08-11: zero mockupów, zero
  upiększeń — brzydki ekran to informacja dla aplikacji, nie do
  retuszu na stronie). Zrzuty dostarcza zlecenie Z6 (okno aplikacji
  — www nie dotyka repo aplikacji). Do czasu dostawy: ramka
  z zadeklarowanymi proporcjami (CLS) i tłem powierzchni.
- Orientacja: desktop zebra L-P-L-P (filar 1 obraz po PRAWEJ,
  2 po lewej, 3 po prawej, 4 po lewej); 390 px zawsze tekst nad
  obrazem. Prop `orientacja` lub wyliczenie z indeksu.

## Obrazy — kontrakt (ADR-011 + image-style.md §6)

- Surowe zrzuty z Z6 → design/obrazy-robocze/ (commit dla śladu
  pochodzenia; NIGDY do src/).
- Do src/ wyłącznie wynik pipeline'u: AVIF + WebP, warianty
  szerokości od 390 px, wymiary zadeklarowane (CLS < 0,1),
  loading="lazy" (wszystkie S5–S8 są POD foldem).
- Alt: opisowy, informacyjny (to zrzuty produktu, nie dekoracja —
  pusty alt zakazany); treść alt per filar w handoffie, ×3 języki.
- Dane demo: neutralne, wymyślone nazwy (ADR-001); ZERO danych
  rzeczywistych osób.
- Odbiór zrzutów: agent inny niż zamawiający (Prawo 2) — zgodność
  z briefem kadru, czytelność od 390 px, brak danych wrażliwych.

## Mapowanie filar → ekran aplikacji (do Z6)

| Filar | Ekran | Co w kadrze |
|---|---|---|
| 1 POZYSKIWANIE | DMO / plan dnia | lista rozmów na dziś (3–5 pozycji demo) |
| 2 TREŚCI | Studio z Tarczą | edytor treści z widocznym zaznaczeniem Tarczy |
| 3 ZESPÓŁ | Pierwsze 90 Dni | widok faz/misji nowej osoby |
| 4 WYNIKI | Pulpit | stan dnia; bez liczb sugerujących zarobki konkretnej wysokości |

## Wymagania

- Kontrasty: wyłącznie istniejące pary (tekst-podstawowy 11,07:1,
  tekst-drugorzedny 6,33:1); żadnych nowych par bez wyliczenia.
- Tło sekcji: neutralne (tło strony). S9: węższa kolumna
  (miara-kolumny), cichsza typografia — bez nowych tokenów, jeśli
  możliwe; potrzeba nowej wartości = propozycja ADR, nie wyjątek.
- Parytet: jeden komponent, treści z messages/content ×3 języki.
- Zero JS; obrazy z lazy load nie wymagają skryptów.
- Ruch: brak (ewentualne wejścia sekcji dopiero w etapie F, za
  prefers-reduced-motion).
- H2 EN/DE dłuższe niż PL (do 53 zn) — miara nagłówka musi znieść
  wszystkie języki bez łamania układu (test parytetu).

## Pipeline

Brief → HF (statyczny, tokeny; 390 px + desktop zebra; ramki
obrazów z proporcjami) → panel projektu (Prawo 2) → handoff →
Z6 (zrzuty; równolegle implementacja z ramkami) → pipeline obrazów
→ odbiór obrazów (Prawo 2) → bramki + testy (axe, klawiatura,
no-JS, parytet, strażnicy treści) → adwersarz → akcept właściciela.
