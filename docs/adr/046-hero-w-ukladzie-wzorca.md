# ADR-046: Hero w układzie wzorca — wyśrodkowane, z mockupem

Data: 2026-08-26/27. Status: **PRZYJĘTY** (KROK 2 pkt 2.2, zlecenia
`WWW/058` i `WWW/059`).

## Decyzja

Hero jest **wyśrodkowane i jednokolumnowe**: H1 → lead → CTA → drobne
zaufania → wielki mockup. Poprzednio było dwukolumnowe z **pustą
kolumną po prawej**, która czekała na obraz od 2026-08-10. Obraz
przyszedł — tyle że **pod treść, nie obok**.

## Zgodność zmierzona po przebudowie

| wielkość | 1440 | 768 | 390 |
| --- | --- | --- | --- |
| H1 `y` (my / wzorzec) | 210 / 210,4 | 210 / 210,4 | 210 / 210,4 |
| wcięcie treści | 135 / 135 | 20 / 20 | 20 / 20 |
| szerokość leadu | 590 / 590 | 590 / 590 | 350 / 350 |
| mockup `x` / szerokość | 135 / 1170 | 20 / 728 | 20 / 350 |

## Błąd z 2.1, który wyszedł dopiero tutaj

Pigułka nawigacji miała **jeden `margin`** na wszystkie strony, więc
przy 1440 odsuwała się od góry o 120 px i **cała strona zjeżdżała**:
H1 lądował na 310 px zamiast zmierzonych 210,4.

Wzorzec ma `y = 20` na **wszystkich dziewięciu** zmierzonych
szerokościach — **odstęp górny jest stały, a boczny progowy**. Rozdzielone.

## Dwie luki treściowe — zgłoszone, rozstrzygnięte przez koordynatora

**Etykieta nad H1 — POMINIĘTA.** Wzorzec ma tam plakietkę w akcencie;
u nas nie ma zatwierdzonego ciągu na to miejsce, a treść hero zamyka
decyzja właściciela z 2026-08-09. **Implementacja treści nie pisze.**

**Mockup to kadr DMO „Rytm dnia", nie „Pulpit".** Zlecenie prosiło
o zrzut Pulpitu (Z6). Dostawa Z6 zawiera **dokładnie cztery** kadry
zwolnione imiennie 2026-08-14 i **Pulpitu wśród nich nie ma**;
aplikacja nie działa na żadnym lokalnym porcie, więc nie dało się go
wytworzyć, a kanon zabrania grafik udających interfejs. Podpis i tekst
alternatywny opisują kadr **prawdziwie** — nazwanie go „Pulpitem"
byłoby twierdzeniem o aplikacji, którego nie da się pokryć.

**Cena odnotowana:** ten sam kadr stoi też przy filarze 1, więc strona
główna pokazuje go dwa razy. Zamiana to jedno odwołanie.

## Proporcja mockupu: nasza, nie wzorca

Wzorzec ma **1,560**, my **1,600** (2048 × 1280 dostawy Z6).
Dociśnięcie do 1,560 przez `object-fit` ucięłoby **po 2,5% góry i dołu
zrzutu produktu**. Kadry Z6 publikujemy bajt w bajt — przycięcie dowodu
dla zgodności proporcji byłoby zamianą rzeczy ważnej na mniej ważną.

## Miary `ch` zdjęte z H1

Wzorzec nie ogranicza H1 miarą znakową — ogranicza go kolumna treści,
a nagłówek zajmuje ją w całości. Poprzedni komentarz opisywał **cztery
ekrany prób** z `22ch`/`24ch` i kończył się wnioskiem, że miara i tak
jest **bezczynna**. Teraz jest to jawne.

## Defekt POMIARU wykryty przy okazji: axe mierzył klatkę animacji

axe skanował od razu po `goto` i mierzył **wyblakłe barwy wejścia** —
**99 naruszeń** kontrastu w rodzaju „#3b3c3a na #070806, 1,8:1",
podczas gdy rola tekstu drugorzędnego ma `#c5c6c5` i po ustaleniu daje
**10,79:1**. To był pomiar **klatki animacji**, nie stanu, który
ktokolwiek czyta.

Wada spała, dopóki hero miało czworo dzieci (ostatnie kończyło o 760 ms);
**piąte — mockup — przesunęło koniec o 70 ms** i axe zaczął trafiać
w blaknięcie.

axe czeka teraz na `finished` animacji **skończonych**. ⚠ **Pierwsza
wersja tego czekania ZAWIESIŁA przebieg**, bo brała też animacje
pętlące (oddech poświaty, pas), których `finished` nie spełni się nigdy.

**To nie jest złagodzenie bramki:** czekamy na stan ustalony, a wzorzec
ma **to samo wejście** (zmierzone: przezroczystość 0→1 w 334,9 ms).
Usunięcie naszego byłoby odejściem od wzorca w reakcji na wadę pomiaru.

## Czego hero nie ma, a wzorzec ma

Dekoracją tła hero jest we wzorcu **pełnoekranowy obraz** (1440 × 1290),
obecny **wyłącznie na kadrze desktopowym**. Takiego pliku nie mamy;
wytworzenie go to decyzja o materiale obrazowym, nie implementacja.
Naszą dekoracją tej samej roli zostaje „duch" — wielki napis przy 6%
alfy (R2, `WWW/047`).
