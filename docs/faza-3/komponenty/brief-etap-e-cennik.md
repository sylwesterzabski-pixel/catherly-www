# Brief Etapu E: K5–K8 — cennik (pipeline 4.1)

Status: BRIEF (do akceptu właściciela). Wireframe /cennik:
OBOWIĄZUJE (DECYZJA 6). Treść: content/*/cennik.md OBOWIĄZUJE
(DECYZJA 4 + Z1/Z2). Etap D przyjęty 2026-08-11 (obrazy dojadą
torem Z6 — niezależnie od E).

## Zakres

Sekcje C2–C7 strony /cennik: H1+wstęp (tekst prosty), K6 przełącznik
(C3), K5 karty planów ×3 (C4), K7 tabela porównawcza (C5), K8 FAQ
(C6), K9 potwierdzenia ×3 (C7 — reużycie z Etapu C). POZA zakresem E:
C8 zamknięcie (K11 — Etap F), „Cennik w skrócie" na głównej (K10 —
Etap F), instancja K8 na głównej z obawami (S12 — przy złożeniu F).
Placeholder „Ta strona powstaje." na /cennik ustępuje sekcjom
przyrostowo — pełne złożenie i przegląd całości w F.

## Źródła prawdy liczb (bez wyjątków)

- **Ceny: WYŁĄCZNIE content/cennik-snapshot.json** (migawka Stripe;
  kwota_brutto w groszach/centach, interwały month/year, PLN+EUR).
  Strona pl: PLN; strony en/de: EUR (wireframe + DECYZJA 4).
  Formatowanie kwot serwerowo przy SSG (Intl.NumberFormat per
  locale) — zero literałów cenowych w JSX.
- **Oszczędność roczna: WYLICZANA z migawki** (12 × cena mies. −
  cena roczna), per plan, w walucie strony, z groszami jeśli
  wychodzą — nigdy wpisana ręcznie.
- **Limity: WYŁĄCZNIE content/facts.json** (8 wpisów Z1: kontakty
  50/200, zespół 10/50, posty 20/100, sesje 5/30; DECYZJA 8).
  Pro = „bez limitu" SŁOWEM (kod ma -1; _uwaga_pro) — nie liczbą.
  Wykluczone kategorie (storage/AI/social/pdf/strony www) NIE
  ISTNIEJĄ w tabeli (rejestr warunków powrotu poz. 4–6).
- Bramka:cennik (snapshot Stripe ↔ strona) i bramka:liczby wchodzą
  do zestawu zielonych od tego etapu (plan §6).

## K5 — karta planu (kontrakt)

- Struktura: nazwa · cena z migawki (+interwał) · „dla kogo"
  (1 zdanie) · lista pozycji (Starter 5; Growth „Wszystko ze
  Startera, a do tego:" + 2; Pro „Wszystko z Growth, a do tego:"
  + 4) · CTA „Wybierz plan" → /login (ADR-023).
- ZAKAZ ciemnych wzorców (ADR-003 + wireframe): żadnych plakietek
  „polecany", żadnego wyróżnienia karty kolorem/rozmiarem ponad
  tokeny; trzy karty równorzędne. Desktop: rząd ×3, równa wysokość,
  CTA w jednej linii bazowej; mobile: stos Starter→Growth→Pro.
- Semantyka: sekcja/artykuł z nagłówkiem planu (h3 w hierarchii
  strony pod H1+h2 sekcji? — rozstrzygnięcie hierarchii nagłówków
  /cennik w HF); lista pozycji jako ul.
- CTA: ta sama para ról co hero (interakcja/interakcja-aktywna,
  5,22:1 / 7,02:1) — bez nowych par.

## K6 — przełącznik miesięcznie/rocznie (kontrakt)

- Wymagania twarde (DoD pkt 5 + wireframe): (1) BEZ JS treść
  kompletna — obie ceny osiągalne, zero utraty treści; (2) pełna
  obsługa klawiaturą; (3) stan komunikowany przez aria; (4) przy
  „rocznie" per plan: „oszczędzasz {kwota}" z migawki.
- Technika DO ROZSTRZYGNIĘCIA W HF + PANELU (nie w briefie),
  z rekomendacją: wariant CSS-only (radio + :checked) — interakcja
  działa też bez JS, zero skryptów na stronie (spójnie z resztą
  witryny); wariant alternatywny: progressive enhancement (serwer
  renderuje obie ceny, minimalny skrypt dodaje przełączanie).
  Kryteria wyboru dla panelu: semantyka dla czytników ekranu
  (radiogroup vs tabs), zachowanie druku/reader-mode, INP < 200 ms,
  prostota. Pierwszy JS na stronie wymaga jawnej zgody panelu —
  domyślnie zero JS.

## K7 — tabela porównawcza (kontrakt)

- Kontener z overflow-x: auto — strona NIGDY nie scrolluje poziomo;
  pierwsza kolumna sticky; caption + th scope (czytniki ekranu).
- Wiersze limitów: 4 (z facts.json, importy); wiersze bramek: Puls
  zespołu i drzewo struktury — od Growth; Ranking, klucze API
  i webhooki — Pro; Kalendarz — w każdym planie (reguła twarda Z5).
- Znaczniki dostępności komórek (✓/—): tekstowe odpowiedniki dla
  czytników (nie sam glif) — szczegół w HF.

## K8 — FAQ (kontrakt)

- Natywne details/summary — no-JS z definicji; zero skryptów.
- Instancja /cennik: 4 pary z §5 (waluta, zmiana planu, rezygnacja,
  eksport). BEZ pytania o fakturę (Z2 — milczenie warunkowe).
- Komponent projektowany od razu pod reużycie na głównej (6 par
  obaw — instancja w Etapie F): treść propsem/messages, zero
  treści w komponencie.
- Fokus na summary z rolą-fokus; marker rozwinięcia — token,
  szczegół w HF.

## EN/DE

Identyczny szkielet, treść z content/{en,de}/cennik.md (OBOWIĄZUJE),
ceny EUR z migawki. Parytet: bramka + testy hrefów/treści per locale
(wzorzec Etapów C–D: strażnik znak w znak messages ↔ content).

## Testy i bramki (DoD)

Parytet ×3 (treść + ceny per waluta), znak w znak z content,
bramka:cennik (migawka ↔ DOM), bramka:liczby (limity importowane),
K6 bez JS (request.get: obie ceny w surowym HTML ×3 języki),
klawiatura (przełącznik + details/summary + CTA), axe, no-JS,
zoom 200%/320 px (tabela w kontenerze), aria-current na /cennik
(rozszerzenie testu I1). Adwersarz z mutacjami (w tym: podmiana
ceny w messages/DOM musi czerwienić bramkę cennika; literał
liczbowy w JSX musi czerwienić linter).

## Pipeline

Brief (ten dokument) → akcept właściciela → HF /cennik C2–C7
(statyczny, tokeny, 390 px + desktop; oba warianty K6 do decyzji
panelu) → panel projektu (Prawo 2) → handoff → implementacja
(K5/K6/K7/K8 + strona /cennik przyrostowo) → bramki + testy →
adwersarz → akcept właściciela. Push wyłącznie za osobną zgodą.
