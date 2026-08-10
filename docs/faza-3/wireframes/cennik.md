# Wireframe: /cennik (low-fi; mobile-first 390 px)

Status: **OBOWIĄZUJE — DECYZJA 6 właściciela 2026-08-10, bez korekt.** Struktura = projekt-cennik.md
(OBOWIĄZUJE, 7 sekcji) + treść content/*/cennik.md.

## Stos sekcji (390 px)

```
┌──────────────────────────────────────┐
│ C1 NAWIGACJA (S1 współdzielona)      │
├──────────────────────────────────────┤
│ C2 H1 + zdanie wstępu                │
├──────────────────────────────────────┤
│ C3 PRZEŁĄCZNIK  [miesięcznie|rocznie]│  z JS: przełącza ceny kart;
│                                      │  BEZ JS: karty pokazują OBIE
│                                      │  ceny (mies. + rocznie z
│                                      │  oszczędnością) — przełącznik
│                                      │  ukryty. Zero utraty treści.
├──────────────────────────────────────┤
│ C4 KARTY PLANÓW (K5 ×3, stos)        │
│ ┌──────────────────────────────┐     │
│ │ STARTER  {cena} zł/mies.     │     │  kolejność stosu na mobile:
│ │ dla kogo (1 zdanie)          │     │  Starter → Growth → Pro
│ │ • 5 pozycji                  │     │  (bez plakietek „polecany" —
│ │ [ Wybierz plan ]→/login      │     │  zakaz ciemnych wzorców)
│ └──────────────────────────────┘     │
│ ┌ GROWTH … „Wszystko ze Startera,    │
│   a do tego:" + 2 pozycje ┐          │
│ ┌ PRO … „Wszystko z Growth, a do     │
│   tego:" + 4 pozycje ┐               │
├──────────────────────────────────────┤
│ C5 TABELA PORÓWNAWCZA (K7)           │
│  kontener overflow-x: auto           │  strona NIGDY nie scrolluje
│  ┌────────┬───────┬──────┬─────┐     │  poziomo — tylko kontener;
│  │        │Starter│Growth│ Pro │     │  pierwsza kolumna sticky;
│  │Kontakty│  50   │ 200  │ bez │     │  <th scope> + caption dla
│  │Zespół  │  10   │  50  │limitu     │  czytników ekranu; liczby
│  │Posty/m.│  20   │ 100  │  …  │     │  importowane z facts.json
│  │Sesje/m.│   5   │  30  │  …  │     │
│  │Kalendarz  w każdym planie   │     │
│  │Puls zespołu  —  ✓Growth ✓   │     │
│  │Drzewo struktury — ✓     ✓   │     │
│  │Ranking / API / webhooki — — ✓     │
│  └────────┴───────┴──────┴─────┘     │
├──────────────────────────────────────┤
│ C6 FAQ PŁATNOŚCI (K8)                │  4× details/summary
├──────────────────────────────────────┤
│ C7 POTWIERDZENIA (K9 ×3)             │  Rezygnacja · Eksport vCard+CSV
│                                      │  · Dane przechowywane w UE
├──────────────────────────────────────┤
│ C8 ZAMKNIĘCIE (K11)                  │  CTA → /login + zdanie
├──────────────────────────────────────┤
│ C9 STOPKA                            │
└──────────────────────────────────────┘
```

## Desktop

- C4: trzy karty w rzędzie, równa wysokość, CTA w jednej linii
  bazowej; żadna karta nie jest powiększona ani wyróżniona kolorem
  ponad tokeny (zakaz sugerowania „najpopularniejszy").
- C5: tabela pełną szerokością treści, bez scrolla wewnętrznego,
  jeśli mieści się w siatce.

## No-JS / klawiatura / dane

- Przełącznik C3: element sterujący z pełną obsługą klawiatury
  (strzałki/spacja), stan komunikowany aria; bez JS — wariant „obie
  ceny" (patrz wyżej). To warunek DoD pkt 5.
- Ceny: WYŁĄCZNIE z cennik-snapshot.json (bramka: snapshot Stripe ↔
  strona); limity: WYŁĄCZNIE z facts.json (bramka liczb); „bez
  limitu" słowem tylko tam, gdzie kod ma -1.
- EN/DE: identyczny szkielet, ceny EUR z migawki (warunek bramki
  parytetu z Fazy 2).
