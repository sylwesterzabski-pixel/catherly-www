# Protokół adwersarza: Etap E (/cennik — K5/K6/K7/K8)

**Zakres:** diff c25e292..ba3cba6 (brief zaakceptowany z kryterium K6,
HF po panelu, handoff, implementacja K5–K8 + strona /cennik +
lib/cennik + messages ×3 + testy; naprawa facts.json; apostrofy EN).
Dwie rundy (2026-08-11). Adwersarz w granicach catherly-www; Stripe
wyłącznie odczyt kluczem testowym; wszystko uruchamiał samodzielnie.

## Runda 1 (0bcbe7f): COFAM

Zielone z dowodem: rachunek 18 kwot + 6 oszczędności z migawki =
DOM ×3 języki; znak w znak ×3; K6 empirycznie (klawiatura, fokus
etykiety, @supports w CSS, print); ADR-003 (computed styles trzech
kart identyczne co do piksela); K7 (facts.json, wykluczone kategorie
NIEOBECNE, region przewijany fokusowalny); kontrasty tokenów 10/10
przeliczone; naprawa facts.json potwierdzona (na c25e292 parser
czerwony). Odnotowane: sciezka-zakupu ×2 przeszła NATURALNIE
(CTA na /cennik istnieje; test nietykany od Fazy 0 — nie osłabiono).

Blokery rundy 1:
1. **[BLOKUJĄCY] 320 px:** przełącznik right=322 > 320 — zdublowane
   wcięcie (globalny padding main z Etapu B + padding sekcji z HF);
   obowiązkowy test 320 px z handoffu nie istniał.
2. **[ISTOTNE] Fantomowa panorama roota:** min-width tabeli
   propagował layout-overflow do roota MIMO overflow-x:auto
   (silnik desktopowy: scrollX do 116/186 px; emulacja mobilna
   MASKOWAŁA scrollX=0 — błędna diagnoza „artefaktu" w teście K7).
3. **[ISTOTNE] W1 bez strażnika:** mutacja zdjęcia @supports
   niewykrywalna (Chromium ma :has()).

## Mutacje

| # | Mutacja | Wynik |
|---|---|---|
| a | wzór oszczędności ×12→×11 | ZŁAPANA (4 czerwienie) |
| b | facts.json 50→60 | NIEZŁAPANA — właściwość systemu (test czyta z tego samego źródła prawdy; strażnik = przegląd diffa) |
| c | zdjęcie @supports | r1: NIEZŁAPANA → r2: ZŁAPANA (strażnik statyczny W1 ×2) |
| d | literówka messages DE | ZŁAPANA (znak w znak ×2) |
| e | @supports→@media all | ZŁAPANA (W1 ×2) |

## Naprawy (ba3cba6) i runda 2: PRZYJĘTY

1. Wcięcie main → klasa .tresc-prosta (strony proste); sekcyjne
   niosą wcięcia w sekcjach (wzór HF). Pomiar r2: fieldset
   right=306 przy 320; scrollX=0; test 320 px w suicie.
2. contain:paint na kontenerze tabeli — panorama 116/186→0;
   scroll wewnętrzny, sticky, fokus i ArrowRight działają (pomiar).
3. Strażnik statyczny W1 (zbudowany CSS: @supports + baza
   display:none) — czułość udowodniona mutacjami c/e.
Suita: 137 zielonych / 3 skipy (140 testów; ZERO czerwonych —
pierwsza w pełni zielona suita projektu); 7 bramek zielonych.

## Odnotowane bez naprawy (świadomie)

- Mutacja b: facts.json chroni wyłącznie przegląd diffa —
  właściwość architektury źródła prawdy, nie tego etapu.
- W1 nie łapie INTENCJONALNEGO obejścia (bezwarunkowa reguła
  widoczności PO bloku @supports) — klasa sabotażu, nie pomyłki;
  ewentualne domknięcie opisane w raporcie r2.
- bramka:nieodwracalne czerwona (brak raportu audytu) — blokuje
  wyłącznie wdrożenie produkcyjne (Faza 6), zgodnie z planem.

## Werdykt końcowy

**PRZYJĘTY (runda 2)** — czeka na akcept właściciela. Push za zgodą
z akceptu briefu (do końca etapu).
