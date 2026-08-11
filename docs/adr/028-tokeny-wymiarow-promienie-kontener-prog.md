# ADR-028: Tokeny wymiarów — promienie, kontener strony, próg układu

Data: 2026-08-11. Status: PRZYJĘTY (polecenie właściciela 2026-08-11:
„Literały wymiarów → ADR wymiarów przy okazji, jak zapowiedziałeś" —
wartości zapowiedziane w handoffach K4/E).

## Kontekst

Etapy B–E zgromadziły powtarzane literały wymiarów: promienie 0.25
(K1), 0.5 (K2/K4/K5), 2rem (pigułka K6 — panel E), kontener 70rem
(K1–K7), próg układu 48rem (wszystkie media queries). Panel K4 (W5)
i panel E zgłosiły lukę tokenową; adwersarze potwierdzali spójność
wartości ręcznie.

## Decyzja

1. Nowe tokeny wymiaru (design/tokens.json):
   `--wymiar-promien-maly` 0.25rem · `--wymiar-promien` 0.5rem ·
   `--wymiar-promien-pigulki` 2rem · `--wymiar-kontener-strony`
   70rem.
2. `--wymiar-prog-ukladu` 48rem — token WYŁĄCZNIE DOKUMENTACYJNY:
   media queries nie czytają var(), więc 48rem pozostaje literałem
   w @media modułów; token jest jedynym miejscem definicji znaczenia
   i wartości, a jego zmiana wymaga ADR + synchronizacji @media
   (wyliczonych grepem).
3. Migracja komponentów na tokeny (border-radius, max-width
   wnętrz). Pliki HF pozostają zapisem historycznym z literałami
   (precedens ADR-025).

## Konsekwencje

- Zmiana promienia/kontenera = jedna linia tokenów + ADR.
- Linter tokenów nie wymusza użycia tokenów wymiaru (wymusza tylko
  kolory) — strażnikiem spójności pozostaje przegląd + adwersarz.
