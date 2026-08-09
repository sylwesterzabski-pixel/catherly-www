# Projekt struktury /cennik (Faza 2, Etap C; STRATEGIA pkt 32)

**Status: OBOWIĄZUJE — DECYZJA 4 właściciela 2026-08-09.**
Rozstrzygnięcia: (1) tylko PLN na stronie pl, EUR w FAQ; EUR jako
główna w adaptacjach en/de w Etapie D; (2) oszczędność roczna kwotowo
w zł, wyliczana, z groszami jeśli wychodzą; (3) sekcja 1 i zdania
„dla kogo" trybem skróconym (1 wariant + panel); (4) odstępstwa
zaakceptowane WARUNKOWO — tabela bez limitów i FAQ bez faktury tylko
do powrotu Z1/Z2; oba zlecenia rozstrzygnięte przed zamknięciem
Fazy 2 (teksty: docs/faza-2/zlecenia-okno-aplikacji.md).
Data: 2026-08-09.
Źródła: STRATEGIA pkt 23, 32, 41 · tabela obietnic (OBOWIĄZUJE) ·
inwentarz funkcji · content/cennik-snapshot.json (migawka Stripe).

## Reguły twarde obowiązujące na tej stronie

1. **Kalendarz NIE jest wyróżnikiem planów** (decyzja właściciela;
   rozjazd cennik↔kod czeka na rozstrzygnięcie po stronie aplikacji).
   W tabeli porównawczej kalendarz stoi w wierszu „w każdym planie".
2. Filar ROZLICZENIA: jedyna dozwolona obietnica kierunku —
   „Wybierasz plan i zmieniasz go kiedy chcesz." Zero obietnic
   faktur (brak puppeteer), zero obietnic importu FL.
3. Ceny: wyłącznie ze Stripe (przez migawkę cennik-snapshot.json),
   nigdy literały w JSX. Pozostałe liczby: content/facts.json.
   Oszczędność roczna wyliczana z danych, nie wpisana ręcznie.
4. Zero ciemnych wzorców: bez liczników, bez „oferta ograniczona",
   bez plakietki „najpopularniejszy" (brak danych o popularności =
   zmyślona opinia — zakaz bezwzględny).
5. „Bez ograniczeń" tylko tam, gdzie w kodzie naprawdę nie ma limitu
   (wymaga potwierdzenia z okna aplikacji — patrz zlecenia niżej).
6. Zero obietnicy trialu i darmowego dostępu (spójnie z hero).

## Struktura strony (7 sekcji)

### 1. Nagłówek strony
H1 + jedno zdanie wstępu. Kierunek treści: trzy plany, różnica
w zakresie, nie w obietnicach; ton spokojny, bez pilności.
Finalna treść: fan-out → panel (jak dotychczas) albo tryb skrócony
(1 wariant + panel) — do decyzji przy DECYZJI 4.

### 2. Przełącznik miesięcznie / rocznie
Domyślnie: miesięcznie (bez sugerowania). Przy „rocznie" widoczna
oszczędność kwotowa per plan, wyliczana z migawki Stripe
(12 × cena miesięczna − cena roczna). Przełącznik dostępny
z klawiatury, bez animacji wymuszonej (prefers-reduced-motion).

### 3. Trzy karty planów (Starter · Growth · Pro)
Każda karta:
- nazwa planu,
- cena PLN z groszami (STRATEGIA pkt 32) + interwał,
- jedno zdanie „dla kogo" — spójne z trzema ścieżkami /dla-kogo
  (pkt 33): startująca → Starter; budująca zespół → Growth;
  prowadząca dużą strukturę → Pro,
- 4–6 pozycji zawartości (wyłącznie z tabeli obietnic; Growth:
  Puls i drzewo struktury językiem kierunku „W planie Growth…"),
- CTA „Wybierz plan" → /rejestracja?plan=… (ścieżka pkt 41).

### 4. Pełna tabela porównawcza
Bez gwiazdek i przypisów (STRATEGIA pkt 32). Wiersze grupowane
filarami strony głównej: Pozyskiwanie · Treści · Zespół · Wyniki ·
Dbanie o siebie. Kolumny: Starter / Growth / Pro.
- Bramki potwierdzone w kodzie: Puls (ryzyko odejścia), drzewo
  struktury, tworzenie tagów QR, quizy — Growth.
- Kalendarz, DMO, Tarcza, Pieczęć, Studio, Kreator wdrożeniowy,
  Pierwsze 90 Dni, Pulpit, Magic Wrapped, Świadectwo, eksport vCard —
  „w każdym planie" (żadna z tych funkcji nie ma bramki w kodzie).
- Limity liczbowe: TYLKO po otrzymaniu listy z okna aplikacji
  (zlecenie Z1 niżej). Do tego czasu tabela zawiera wyłącznie
  bramki funkcyjne — bez zmyślonych limitów.

### 5. Pytania o płatność (FAQ)
Kanon STRATEGIA pkt 32 z korektą pokrycia:
- **Waluta** — PLN i EUR (fakt z migawki Stripe).
- **Zmiana planu** — „Wybierasz plan i zmieniasz go kiedy chcesz."
  (jedyna obietnica kierunku z filaru Rozliczenia).
- **Rezygnacja** — spójnie z Parą 3 obaw: rezygnujesz kiedy chcesz.
- **Dane po rezygnacji** — spójnie z Parą 3: eksport vCard + CSV
  z rejestrem, wszystko jest twoje.
- **Faktura VAT** — ⚠️ WYPADA z FAQ do czasu weryfikacji (zlecenie
  Z2): aplikacja nie generuje PDF (brak puppeteer); czy faktury
  wystawia Stripe — nie wiemy. Bez dowodu = bez pytania w FAQ.

### 6. Trzy potwierdzenia pod cennikiem
Spójne ze stałymi hero, w wersji pokrytej: „Rezygnacja w każdej
chwili" · „Twoje dane eksportujesz zawsze (vCard + CSV)" ·
trzecie do ustalenia po weryfikacji „dane w UE" (do tego czasu dwa).

### 7. Zamknięcie
Powtórzone CTA bez nowych argumentów (wzór pkt 25). Zdanie
o braku zobowiązania — pokryte rezygnacją, nie „gwarancją".

## Sekcja „Cennik w skrócie" na stronie głównej (pkt 23)

Pochodna tej samej migawki: trzy plany, cena widoczna,
JEDNA najważniejsza różnica (propozycja: „Growth dodaje widok
całego zespołu" — Puls + drzewo, język kierunku), link „Pełny
cennik" → /cennik. Bez tabeli na stronie głównej.

## Migawka Stripe (stan 2026-08-09, tryb testowy)

| Plan | PLN/mies. | PLN/rok | EUR/mies. | EUR/rok |
|---|---|---|---|---|
| Starter | 99,00 | 890,00 | 25,00 | 225,00 |
| Growth | 199,00 | 1790,00 | 49,00 | 439,00 |
| Pro | 399,00 | 3590,00 | 95,00 | 855,00 |

Kwoty brutto z migawki (grosze/centy ÷ 100). Oszczędność roczna
(wyliczana): Starter 298 zł · Growth 598 zł · Pro 1198 zł.
UWAGA: ceny testowe — przed premierą migawka z produkcyjnego Stripe.

## Zlecenia do okna aplikacji (blokują pełną tabelę)

- **Z1**: pełna lista 11 funkcji z bramką GROWTH/PRO (inwentarz podaje
  liczbę, nie listę) + wszystkie limity liczbowe per plan (jeśli są).
- **Z2**: czy Stripe wystawia faktury VAT (portal klienta)? Decyduje
  o pytaniu „faktura" w FAQ.
- **Z3** (zgłoszone wcześniej): rozjazd kalendarza w prisma/seed.ts:86
  — bramka w kodzie albo usunięcie z opisu planu.
- **Z4** (zgłoszone wcześniej): lokalizacja danych + szyfrowanie
  (dla trzeciego potwierdzenia i /bezpieczenstwo).

## Pytania do DECYZJI 4

1. Waluta na stronie: tylko PLN (EUR wyłącznie w FAQ) czy przełącznik
   PLN/EUR? (Rekomendacja: tylko PLN — STRATEGIA pkt 32 mówi „ceny
   w PLN z groszami"; przełącznik walut to decyzja produktowa.)
2. Oszczędność roczna: kwotowo w zł (rekomendacja) czy procentowo?
3. Treść sekcji 1 (H1 + wstęp) i zdań „dla kogo": pełny fan-out
   3 wariantów + panel, czy tryb skrócony (1 wariant + panel)?
   (Rekomendacja: tryb skrócony — strona ma mniej swobody twórczej
   niż hero, ramy są ciasne.)
4. Akceptacja: FAQ bez pytania o fakturę do czasu Z2; tabela
   porównawcza bez limitów liczbowych do czasu Z1.
