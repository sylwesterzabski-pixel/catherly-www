# Protokół adwersarza: Etap C (K2 hero + K9 + rola interakcja-aktywna)

**Zakres:** diff e2ba0cf..8aa2562 (brief K2, ADR-026, HF po panelu,
rola tokenowa interakcja-aktywna, handoff K2/K9, implementacja
Hero + PasekPotwierdzen, integracja, messages, testy). Jedna runda
(2026-08-10). Adwersarz wszystko uruchamiał samodzielnie; mutacje
weryfikowane empirycznie, working tree po przebiegu czysty.

## Przebieg

Parytet treści znak w znak (programowo: pauza U+2014 PL/EN, półpauza
U+2013 DE), implementacja vs HF 1:1 (jedno przekształcenie: margines
listy przeniesiony do klasy kontekstu — computed 36 px potwierdzony),
build + 6 bramek zielonych, suita 80/82 (2 znane czerwienie Fazy 5),
no-JS 13/13 asercji × 3 języki, LCP-higiena (zero img/webfontów w HTML
i CSS), regresje 404//pl→307/aria-current OK, fokus: skip-link →
logo → menu → Logowanie → CTA hero (obrys śliwka-700), zoom 640/320 px
bez poziomego przewijania, kontrasty przeliczone niezależnie
(7,02 / 6,29 / 5,22 / 6,33 / 1,20 — zgodne co do setnej).

## Mutacje

| # | Mutacja | Wynik rundy 1 | Po naprawach |
|---|---|---|---|
| a | hover CTA → rola spoczynkowa | WYKRYTA (hero.spec hover ×2) | — |
| b | usunięcie role="list" | NIEWYKRYTA | WYKRYTA (12 czerwieni: atrybut + surowy HTML ×3 języki ×2 projekty) |
| c | DE półpauza → pauza w messages | NIEWYKRYTA (testy = samoodniesienie do messages) | WYKRYTA (strażnik znak w znak ×2) |
| d | max-width 22ch → 18ch | NIEWYKRYTA | bez strażnika — patrz „odnotowane" |

## Ustalenia i naprawy

- **ISTOTNE 1 (zamknięte):** brak strażnika messages ↔ content.
  Naprawa: test „znak w znak" w e2e/hero.spec.ts — każde pole
  przestrzeni Hero musi wystąpić literalnie w content/<jezyk>/
  naglowek.md (normalizowane wyłącznie białe znaki). Czułość
  udowodniona mutacją c.
- **ISTOTNE 2 (zamknięte):** role="list" bez strażnika (getByRole
  łapie rolę niejawną ul). Naprawa: asercja atrybutu w teście
  parytetu + substring role="list" w testach no-JS (rozszerzonych
  na 3 języki — drobne 5 przy okazji). Czułość udowodniona mutacją b.

## Odnotowane bez naprawy (świadomie)

- 22ch bez testu (drobne 3): pinowanie wartości = testowanie arkusza
  samym sobą; ewentualny strażnik intencji („H1 ≤ 3 linie na
  desktopie") — do decyzji właściciela.
- CTA hero jako tabstop po „Logowanie" poprawny empirycznie, ale
  poza sekwencją klawiatura.spec (drobne 4) — handoff nie wymagał.
- Margines K9 z klasy kontekstu — kruchość kolejności modułów CSS
  (drobne 6); uzasadnione reużyciem K9 na /cennik (etap E).

## Werdykt

**PRZYJĘTY** (runda 1, bez blokujących) — implementacja zgodna
z handoffem i HF, treść znak w znak, liczby kontrastów niezależnie
potwierdzone. Po naprawach czułości suita: 86 passed / 2 znane
czerwienie (sciezka-zakupu — Faza 5). Czeka na akcept właściciela.
