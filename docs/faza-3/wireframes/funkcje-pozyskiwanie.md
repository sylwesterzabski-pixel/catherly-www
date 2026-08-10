# Wireframe: /funkcje/pozyskiwanie — wzorcowa podstrona funkcji

Status: PROJEKT — do DECYZJI 6. Wzorzec dla pozostałych /funkcje/*
(STRATEGIA pkt 28: „dla każdego: po co to, jak wygląda, czego nie
robi"). Treść: pełny cykl treściowy (DECYZJA 7) równolegle do etapów
D–E — wireframe definiuje SLOTY, nie brzmienia.

## Stos sekcji (390 px)

```
┌──────────────────────────────────────┐
│ F1 NAWIGACJA (współdzielona)         │
│  + okruszki: Funkcje → Pozyskiwanie  │
├──────────────────────────────────────┤
│ F2 NAGŁÓWEK PODSTRONY                │
│  H1 filara + 1 zdanie korzyści       │  spójne z filarem strony
│                                      │  głównej (to samo źródło)
├──────────────────────────────────────┤
│ F3–F7 MODUŁY FUNKCJI (wzorzec ×N)    │
│ ┌──────────────────────────────┐     │
│ │ H2: nazwa funkcji (słownik!) │     │  np. baza kontaktów,
│ │ PO CO TO — 1–2 zdania        │     │  formularz z publiczną
│ │ JAK WYGLĄDA — zrzut          │     │  stroną, przypomnienia,
│ │  [slot: Playwright na demo]  │     │  Sala Treningowa, DMO
│ │ CZEGO NIE ROBI — 1 zdanie    │     │  ← sekcja uczciwości
│ └──────────────────────────────┘     │  obowiązkowa w KAŻDYM module
├──────────────────────────────────────┤
│ F8 PLAN — jeden wiersz               │
│  „Wszystko powyżej działa od planu   │  bez tabeli; link do /cennik
│   Starter." + [Zobacz cennik]        │  (w tym filarze zero bramek
│                                      │  Growth/Pro — fakt z Z1)
├──────────────────────────────────────┤
│ F9 PRZEJŚCIA                         │
│  ← poprzedni filar | następny →      │  nawigacja pozioma po
│                                      │  /funkcje/*
├──────────────────────────────────────┤
│ F10 ZAMKNIĘCIE (K11 wariant krótki)  │
├──────────────────────────────────────┤
│ F11 STOPKA                           │
└──────────────────────────────────────┘
```

## Reguły wzorca (dziedziczone przez pozostałe podstrony funkcji)

1. Moduł funkcji ma ZAWSZE trójkę: po co → jak wygląda → czego nie
   robi. Trzeci slot jest obowiązkowy (uczciwość jako cecha układu,
   nie dobra wola treści).
2. Zrzuty wyłącznie z Playwrighta na danych demo (zakaz grafik
   udających UI); do czasu zrzutów slot = spokojny placeholder
   tokenowy z podpisem — strona publikowalna bez zrzutu.
3. Nazwy funkcji wyłącznie ze słownika (docs/faza-2/slownik-nazw.md).
4. Liczba modułów wynika z tabeli obietnic (tryb dokonany filara);
   funkcje z listy MILCZENIE nie mają modułów.
5. F8 mówi o planach tylko to, co przechodzi przez tabelę obietnic
   danego filara (dla /funkcje/zespol pojawi się wiersz Growth —
   język kierunku „W planie Growth…").

## No-JS / klawiatura

Wszystko statyczne; okruszki i przejścia F9 to zwykłe linki;
kolejność fokusa = dokument.
