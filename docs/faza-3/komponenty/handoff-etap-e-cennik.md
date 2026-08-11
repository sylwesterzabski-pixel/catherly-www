# Handoff Etapu E: /cennik C2–C7 (K5/K6/K7/K8 + K9)

Data: 2026-08-11. HF po panelu (PRZESZEDŁ Z WARUNKAMI — wszystkie
naniesione w c8170bb): docs/faza-3/hf/cennik.html. Brief
ZAAKCEPTOWANY z kryterium K6 właściciela.

## Decyzje wiążące panelu

- **K6 = WARIANT A** (CSS-only: fieldset + legend sr-only + natywne
  WIDOCZNE radio + :has()). Semantyka radiogroup lepsza niż
  aria-pressed. **ŚWIADOMY BRAK aria-live** — nie „poprawiać":
  zmianę inicjuje użytkownik na kontrolce anonsującej stan; każda
  cena niesie własne słowo interwału; display:none usuwa ukrytą
  cenę z drzewa dostępności. Pod-wariant pigułki z ukrytym radiem
  ODRZUCONY (powierzchnia-2 × tło = 1,00:1).
- **W1:** cała mechanika (ukrywanie cen ORAZ widoczność
  przełącznika) pod `@supports selector(:has(*))`; bez wsparcia
  przełącznik display:none, obie ceny widoczne.
- Mikro-teksty rusztowania USANKCJONOWANE (panel; do messages):
  „Okres rozliczenia" (legend) · „Porównanie planów" (caption) ·
  „Zakres" (sr-only th) · „Pytania o płatność" (sr-only h2) ·
  „w planie"/„poza planem" (sr-only przy ✓/—) · „Potwierdzenia"
  (aria-label) · słowa interwału przy cenach — ×3 języki
  (adaptacje EN/DE tych mikro-tekstów w messages, rejestr per
  język; to teksty UI, nie treść OBOWIĄZUJE).
- Wiersz tabeli: „Drzewo struktury" (W2 — znak w znak z content).
- Promień karty 0.5rem (W5); pigułka 2rem = literał ZGŁOSZONY do
  propozycji ADR skali promieni (razem z progiem 48rem i kontenerem
  70rem z W5 handoffu K4 — jeden ADR wymiarów przy E/F).
- Kontrasty powierzchni WYLICZONE w komentarzach tokenów (W4).

## Kontrakty liczb

- Ceny/oszczędności: WYŁĄCZNIE z content/cennik-snapshot.json;
  helper liczy (12×mies − rok) i formatuje Intl.NumberFormat per
  locale (pl→PLN, en/de→EUR); grosze/centy tylko gdy wychodzą
  (obecnie nie wychodzą: 298/598/1198 zł · 75/149/285 €).
- Limity: importy z content/facts.json (linter liczb wymusza);
  Pro „bez limitu" słowem.
- Testy liczą oczekiwane wartości NIEZALEŻNIE z migawki (nie
  z helpera) — rozjazd DOM↔migawka czerwieni suitę; bramka:cennik
  pilnuje migawka↔Stripe (klucz testowy, odczyt).

## Kontrakty komponentów

- K5 KartaPlanu: article + h2 (nazwa planu); obie ceny w DOM
  (klasy cenaMiesiecznie/cenaRocznie + wiersz oszczędności przy
  rocznej); CTA → /login per locale (adresWJezyku); trzy karty
  RÓWNORZĘDNE (ADR-003 — żadnych wyróżnień ponad tokeny); desktop
  rząd ×3, CTA na wspólnej linii (margin-block-start: auto).
- K6: mechanika :has() w JEDNYM module CSS sekcji planów (selektor
  na sekcji, nie body); fokus na całej etykiecie
  (label:has(input:focus-visible)); @media print — obie ceny.
- K7 TabelaPorownawcza: kontener overflow-x:auto (strona bez
  poziomego scrolla); caption; th scope col/row; sticky pierwsza
  kolumna z max-width 11rem + kreską (W6); ✓/— jako glif
  aria-hidden + sr-only tekst; „Kalendarz — w każdym planie"
  colspan=3 (odnotowane: czytniki anonsują rozpiętość poprawnie).
- K8 Faq: natywne details/summary; treść propsami; marker natywny
  w currentColor (świadomie bez tokenu — zero nowych wartości);
  reużycie na głównej (obawy) w Etapie F.
- K9: reużycie PasekPotwierdzen z 3 pozycjami.
- Hierarchia /cennik: h1 → h2 (Starter/Growth/Pro) → h2 sr-only
  FAQ; tabela etykietowana caption (sr-only h2 nad tabelą
  ROZWAŻONE i pominięte — duplikacja caption; odnotowane).

## Odnotowane

- Ścieżki EN/DE ujednolicone: /en/cennik, /de/cennik (etykiety
  z messages; „/pricing"/„/preise" z nagłówków content to
  dokumentacja Fazy 2, nie routing — rejestr ISTNIEJACE_SCIEZKI).
- Reflow 320 px: przełącznik ≈315 px — mieści się BEZ zapasu;
  test 320 px obowiązkowy.
- CLS przy przełączeniu inicjowane przez użytkownika — poza
  metryką; zamknięcie C8 i „Cennik w skrócie" — Etap F.

## Testy (DoD)

Parytet ×3 (treść + ceny per waluta, hrefy CTA), znak w znak
messages ↔ content/*/cennik.md (pola literalne; szablon oszczędności
poza strażnikiem — pilnowany przez asercję DOM z rachunkiem
z migawki), przełącznik empirycznie (default mies., po zmianie rok
+ oszczędność, display), no-JS (obie ceny w surowym HTML ×3),
tabela = facts.json, aria-current /cennik, axe, zoom 320 px.
Adwersarz: mutacje cen/limitów/mechaniki. Push za zgodą z akceptu
briefu (do końca etapu), odczyt zdalny na koniec.
