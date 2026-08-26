# ADR-034: Interakcja pod palcem ciemnieje w obu warstwach

Data: 2026-08-26. Status: **PRZYJĘTY (decyzja koordynatora z mandatu
właściciela, zlecenie `WWW/042`, krok 1).**

## Kierunek, jednym zdaniem

**Interakcja pod palcem CIEMNIEJE — w warstwie jasnej i w warstwie
inwersji tak samo.**

## Kontekst

ADR-032 mapował w blokach `[data-ton]` rolę `interakcja-aktywna` na
`akcent-na-inwersji`, czyli złoto **jasne**. Etykieta CTA pozostaje
kremowa, więc pod palcem robiło się **jasne na jasnym**: `rgb(240,239,232)`
na `rgb(201,162,94)` = **2,07:1** przy progu **4,5:1** (WCAG 1.4.3).

**Defekt istniał od wdrożenia palety „natura" i był niewidoczny**,
dopóki sonda zgłaszała te punkty jako „nieoznaczalne". Odsłoniła go
dopiero naprawa pomiaru z ADR-033 — 108 wystąpień na 48 testach.

## Decyzja

Dochodzi **26. rola**: `interakcja-aktywna-inwersji` = **`#6e5220`**
(złoto przyciemnione). Blok `[data-ton]` mapuje na nią
`interakcja-aktywna` we wszystkich trzech tonach. Etykieta pozostaje
kremowa, obwódka kremowa zostaje. **Warstwa jasna bez zmian** — CTA
grafitowe ciemnieje tam już wcześniej.

### Wartość sprawdzona pomiarem, nie przyjęta na słowo

Zlecenie podało `#6e5220` z wyliczeniem ≈6,3:1 i poleciło policzyć po
swojej stronie. Zmierzone 2026-08-26 na `1e9b6a3`:

| kandydat | etykieta kremowa na wypełnieniu | werdykt |
|---|---|---|
| `#c9a25e` (stan sprzed zmiany) | **2,07:1** | ✘ naruszenie 1.4.3 |
| `#8f7230` | **3,95:1** | ✘ za płytkie |
| **`#6e5220`** | **6,30:1** | ✔ AA z zapasem **1,80** |

Wartość zlecenia potwierdzona **co do drugiego miejsca po przecinku**;
przyciemnianie do progu okazało się niepotrzebne. Obie odrzucone
kandydatury przeliczone niezależnie i odrzucenie potwierdzone.

### Kierunek jest mierzalny, nie deklarowany

Luminancja spada ze spoczynku **0,1368** (`#7e6425`) do **0,0945**
(`#6e5220`). W warstwie jasnej dzieje się to samo: grafit `#221f20` →
ciemniejszy grafit `#3a342e`. **Zdanie o kierunku ma pokrycie w obu
warstwach, a nie tylko w tej, dla której powstało.**

### Granicę przycisku i w tym stanie niesie obwódka

Sama plama ma wobec espresso **2,07:1** i nigdy nie miała rysować
przycisku (ADR-032). Obwódka w `tekst-na-inwersji` ma wobec nowego
wypełnienia **6,30:1**, więc 1.4.11 trzyma także na hoverze.

## Dowody

**Bramka kontrastu stanów: 108 upadków → ZERO** (64 passed).
**Pełny zestaw e2e: 636 passed, 4 skipped, zero upadków, zero pozycji
nieoznaczalnych.**

**Dowód rastrowy hovera na poświacie** (sekcja zamknięcia, stan hover
wymuszony przez CDP, próbki z renderu):

- najgorszy z **64** punktów wypełnienia: `rgb(110,82,32)` → etykieta
  **6,30:1** ✔, rozrzut po wypełnieniu **0,00** (plama jednolita);
- najgorszy z **48** punktów tła wokół: obwódka kremowa **10,13:1**
  przy progu 3 ✔, rozrzut **1,75**.

Rozrzut **1,75 na tle przy 0,00 na wypełnieniu** jest tu kontrolą
wewnętrzną: dowodzi, że próbki czytają **rzeczywistą zmienność
poświaty**, a nie stałą wartość z deklaracji — czyli że raster mierzy
to, co miał mierzyć.

## Konsekwencja dla strażnika

`LICZBA_ROL` 25 → **26** (zmiana liczby ról jest decyzją, nie dryfem).
Dochodzi para `tekst-na-inwersji × interakcja-aktywna-inwersji ≥ 4,5:1`
— **para dodana dlatego, że jej brak był powodem, dla którego defekt
przeżył dwa zlecenia**: rola hovera w tonach ciemnych nie stała w żadnej
parze strażnika i nikt jej nie liczył.
