# Handoff K4 (sekcje filarów S5–S8) + S9 (Dbanie o siebie)

Data: 2026-08-11. HF po panelu projektu (PRZESZEDŁ Z WARUNKAMI;
W1 rozstrzygnięty DECYZJĄ 9, W2 naniesiony w HF, W3–W6 poniżej)
oraz po panelu treści S9 (wariant B — DECYZJA 10):
docs/faza-3/hf/k4-filary.html.

## Decyzje wiążące panelu (obowiązują implementację)

- **::marker konkretów w --kolor-rola-akcent** — DOPUSZCZONY jako
  dekoracja. Granica: wyłącznie niesemantyczny glif `ul`. Zamiana
  na `ol` (numer = informacja) albo ikony znaczące wymaga pary
  ≥3:1. UWAGA: axe NIE testuje ::marker — to wyliczenie jest
  jedynym śladem (rola-akcent 2,87:1 na tle; informacja listy
  niesiona semantyką ul/li + wcięciem + kształtem glifu).
- **Korzyść: 1.125rem/600** — zatwierdzona. W6: JEDNA nazwana
  klasa/wspólny wzorzec dla duetu 1.125rem/600 (kropka K3 =
  korzyść K4), żeby style nie rozjechały się przy zmianach.
- **S9: tekst-drugorzedny (6,33:1)** na tle strony; H2
  visually-hidden „Dbanie o siebie" (sr-only przez clip-path,
  NIGDY display:none); kolumna miara-kolumny (38rem).

## Kontrakt obrazów (W2–W4 + DECYZJA 9)

- Zrzuty Z6: viewport 1024×640 @2x → pliki 2048×1280 (16:10).
  Odbiór odrzuca inny wymiar. Kryterium czytelności od 390 px
  UTRZYMANE (DECYZJA 9 — responsywny widok to prawdziwy ekran).
- Surowe PNG → design/obrazy-robocze/ (commit; NIGDY do src/).
  Do src/ wynik pipeline'u: AVIF + WebP, warianty od 390 px.
- **W2:** aria-hidden WYŁĄCZNIE na ramce zastępczej. Docelowy
  `<img>` INFORMACYJNY: alt opisowy ×3 języki (tabela niżej),
  bez aria-hidden na obrazie i kontenerze.
- **W3:** width/height z realnych plików (2048×1280) w atrybutach;
  CSS aspect-ratio 16/10 wyłącznie jako fallback ramki.
- **W4:** po integracji obrazów pomiar LCP także na wysokim
  viewporcie (np. 1600×1200); czerwień → filar 1 loading="eager",
  pozostałe lazy. Do dostawy Z6: ramki bez obrazów.

## Alty zrzutów (informacyjne; do finalizacji przy odbiorze Z6)

| Filar | PL (kierunek) |
|---|---|
| 1 | Ekran planu dnia (DMO) w Catherly: uporządkowana lista rozmów na dziś |
| 2 | Ekran Studia w Catherly: edytor treści z zaznaczeniem Tarczy na ryzykownym sformułowaniu |
| 3 | Ekran programu Pierwsze 90 Dni w Catherly: fazy i misje nowej osoby |
| 4 | Ekran Pulpitu w Catherly: dzisiejszy stan wyników |

EN/DE alty powstają razem z finalizacją (nazwy funkcji wg słownika;
opis zgodny z tym, co zrzut FAKTYCZNIE pokazuje — weryfikacja przy
odbiorze, Prawo 2).

## Kontrakt implementacji

- Komponent Filar (K4): props naglowek/idNaglowka/korzysc/konkrety
  (3)/obrazPoLewej(bool)/ramkaEtykieta; DOM: tekst PRZED obrazem
  (order tylko wizualnie ≥48rem — czytniki i 390 px czytają tekst
  najpierw). Sekcja z aria-labelledby.
- Komponent DbanieOSiebie (S9): sr-only H2 + jeden akapit.
- Bez role="list" na konkretach (list-style ≠ none — semantyka
  natywna zostaje; strażnik getByRole('list') działa).
- Integracja: strona główna po hero (S3/S4 — instancje K3 — wejdą
  przy złożeniu w etapie F; do tego czasu filary sąsiadują z hero,
  co podnosi ryzyko W4 — pomiar przy obrazach).
- Treść przez messages (przestrzenie Filary, DbanieOSiebie) ×3
  języki; strażnik „znak w znak" messages ↔ content/*/filary.md
  (wzorzec hero.spec).
- **W5:** próg 48rem i kontener 70rem — surowe wartości wspólne
  K1–K4; propozycja tokenów wymiaru (--wymiar-prog-ukladu,
  --wymiar-kontener-strony) do ADR przy etapie E/F, wzorem ADR-025.
  Do tego czasu wartości surowe jak w K1/K2.
- Zero JS, zero ruchu; lazy load bez skryptów (atrybut natywny).

## Odnotowane dewiacje i uwagi

- PL H2 filaru 1 mieści się w 1 linii przy 2 liniach EN/DE
  (26ch) — do wzrokowego testu parytetu, akceptowalne (panel).
- Zebra ≥48rem: kolejność wizualna ≠ DOM — zgodne z WCAG 1.3.2
  (treść niefokusowalna, sensowna kolejność czytania).
- Grid 1fr/1fr przy 768–900 px: obraz 344–400 px; opcja bez
  nakazu — próg zebry 60rem, jeśli odbiór wykaże nieczytelność.
- Liczniki znaków w content/pl/filary.md częściowo nieścisłe
  (uwaga panelu; bez wpływu na implementację).

## Zakres zlecenia implementacji

src/components/{Filar,DbanieOSiebie} + integracja na stronie
głównej; messages ×3; testy: parytet treści (znak w znak z content),
struktura nagłówków (h1 + 4×h2 widoczne + 1×h2 sr-only), zebra
(order przez computed style ≥48rem, brak na 390 px), marker/lista
(getByRole list ×4), no-JS (treść filarów w surowym HTML ×3 języki),
axe. Bramki lokalne + suita. LHCI/W4 przy obrazach. BEZ pusha
(osobna zgoda właściciela).
