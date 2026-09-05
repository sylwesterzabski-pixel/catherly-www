# ADR-063: Batch widoczny — hero i ruch React Bits

Data: 2026-09-05. Status: **PRZYJĘTY** (zlecenie `WWW/089`, kroki 0b–3).

Drugi batch przeszczepu z React Bits SaaS. ADR-062 przeniósł **miary**;
ten przenosi **kompozycję hero i ruch** — i przy okazji obala jedną rzecz,
którą wzorzec o sobie mówi, a której nie robi.

---

## 1. TRZY USTALENIA, KTÓRE POMIAR OBALIŁ

Zgłaszam je na początku, bo dwa dotyczą zdań, które sam wcześniej napisałem.

### 1.1 React Bits NIE MA parallaxu w hero

Karta szablonu wymienia „**Parallax hero with CTA**" jako pierwszą sekcję.
Sprawdzone **trzema niezależnymi drogami**, kadry 1440 i 390:

| droga | co mierzone | wynik |
| --- | --- | --- |
| `transform` wszystkich elementów | 597 elementów × 5 pozycji przewijania | jedyny ruch: pas logo w POZIOMIE (ΔX 157) |
| offset obrazu wewnątrz ramy | 4 pozycje przewijania | **stały: 1 px** |
| `background-position` | 4 pozycje | **stałe: `0% 0%`** |

⚠ **KONTROLA POZYTYWNA ZAPALIŁA W KAŻDEJ Z TRZECH.** Wstrzyknięty element
z `animation-timeline: scroll()` przesuwał się **0 → 23,4 → 46,8 px** przy
1440 i **0 → 18,9** przy 390; `CSS.supports("animation-timeline: scroll()")`
zwraca `true`. Zero jest więc własnością wzorca, nie sondy.

**Skutek dla tego batcha:** współczynnika parallaxu NIE MA SKĄD WZIĄĆ.
Zakres 3 % jest **wyborem wykonawcy pod jawnym poleceniem zlecenia** i tak
jest opisany w tokenie `ruch.zasieg-parallaxu-hero`. Nie wolno go cytować
jako miary React Bits.

### 1.2 Rama hero R ma 16 px, nie 32

Zmierzone: rama to `1024 × 577`, `rounded-2xl`, czyli **16 px**; 32 px
(`rounded-4xl`) noszą u niego **karty bento**. Nasza rama dostaje 32 px
z **decyzji zapisanej w zleceniu**, nie z pomiaru tamtej ramy. Przeszczep
jest wierny **drabinie** R, nie jego hero — i dzięki temu czwarty szczebel
drabiny z ADR-062 dostaje wreszcie konsumenta.

### 1.3 „Hero 0,73 vp" było MOJĄ nieprecyzyjną etykietą

Zlecenie żąda `~0,73 @1440 · ~0,56 @390`. Ta liczba pochodzi ze zwrotki
`WWW/087-R`, gdzie sonda znajdowała „hero" wspinaczką od `h1` w górę do
pierwszego przodka wyższego niż pół okna — i **trafiała w blok tekstu**.

Pomiar celowany (przodkowie `h1` z informacją, który zawiera ramę):

| kadr | 214 px | 404 px | 660 px | **1524 px** | 7309 px |
| --- | --- | --- | --- | --- | --- |
| 1440 | `h1` | blok | **0,734 vp**, bez ramy | **SECTION 1,693 vp, Z RAMĄ** | `main` |

Sekcja hero React Bits ma więc **1,693 vp i zawiera ramę**. Celu 0,73 vp
nie da się osiągnąć z ramą wewnątrz sekcji — sam nasz kadr ma 658 px, czyli
0,73 vp to **mniej niż wysokość samego kadru**.

**Porównywalne jest sekcja do sekcji** i tak przestrojono minimum.

## 2. KROK 0b — L-OPS-04, katalog budowania ze zmiennej

Osobny commit. `next.config.ts`: `distDir = process.env.WWW_DIST || ".next"`.

**Potrzeba zmierzona dwa razy, nie przypuszczona:** `WWW/085` (`rm -rf .next`
zabrało budowanie, z którego korzysta `next dev`) i `WWW/088` (`npm run build`
nadpisało `.next`, dev właściciela stał przy 500 przez całą sesję). Objaw
w obu wypadkach ten sam i mylący: **proces żyje, port odpowiada, treści nie ma**.

| dowód izolacji | przed | po |
| --- | --- | --- |
| dev na 3000 | **200** | **200** |
| `.next` mtime | 20:26:03 | **bez zmiany** |
| `.next-pomiar/BUILD_ID` | katalogu nie ma | `urV7x5QEeEKHha192G1cW` |

**Kontrola pozytywna zmiennej:** `next start` **bez** `WWW_DIST` upada
komunikatem `Could not find a production build in the '.next' directory`;
z nią oddaje 200. Zmienna steruje katalogiem, nie jest ozdobą.

### ⚠ Mechanizm był zbudowany do połowy i wykrył to POMIAR, nie lektura

Po pierwszym budowaniu pomiarowym bramki **„Linki" i „No-JS" zapaliły się
na czerwono**, choć zmiana ich nie dotyczyła: cztery skrypty miały `.next`
wpisane na sztywno. To jest czerwień **myląca**, gorsza od żadnej — mówi
o katalogu, a czytana jest jako defekt kodu.

`check-nojs.mjs`, `check-linki.mjs`, `check-kotwice.mjs` i
`axe-precommit.mjs` czytają teraz tę samą zmienną. Sprawdzone kontrolą
pozytywną: **z** `WWW_DIST` wszystkie trzy zielone, **bez** niej dwie
czerwone (bo czytają katalog deweloperski). W CI zmiennej nie ma, więc
zachowanie jest dokładnie takie jak dotąd.

## 3. KROK 1 — pomiar ruchu i hero na demie R

### 3.1 Rama hero (1a)

| | 1440 | 1190 | 390 |
| --- | --- | --- | --- |
| wymiar | **1024 × 577** | 1024 × 577 | — (rama poza sekcją) |
| promień | **16 px** | 16 px | — |
| kreska · wypełnienie | 1 px · 0 | 1 px · 0 | — |
| proporcja | **1,775** | 1,775 | — |
| `overflow` | `hidden` | `hidden` | — |
| x | 208 | 83 | — |

Rama **nie jest płynna**: 1024 px na obu kadrach szerokich, czyli ta sama
liczba co miara nagłówka R (`--container-5xl`).

### 3.2 Wejścia (1b) — CZTERY RODZINY, nie jedna

| rodzina | `opacity` | `translateY` | czas | odstęp |
| --- | --- | --- | --- | --- |
| karty (bento, opinie, cennik) | 0 → 1 | **40 → 0** | **400–420 ms** | **100 ms** |
| blok tekstu | 0 → 1 | **20 → 0** | **400 ms** | — |
| nagłówek sekcji, wiersze | 0 → 1 | **bez ruchu** | **367 ms** | **100 ms** |
| pojedyncze słowa | **0,15 → 1** | bez ruchu | **67 ms** | ~16 ms |

**Krzywa — dopasowana liczbowo, nie rozpoznana na oko.** 14 próbek postępu
co ~16,7 ms, porównane z jedenastoma kandydatkami błędem średniokwadratowym:

| RMS | krzywa |
| --- | --- |
| **0,0083** | **`cubic-bezier(0.215, 0.61, 0.355, 1)`** (easeOutCubic Penner) |
| 0,0132 | `cubic-bezier(0.33, 1, 0.68, 1)` |
| 0,0332 | `cubic-bezier(0, 0, 0.2, 1)` |
| 0,1399 | `ease` |

⚠ **TRZY PIERWSZE PODEJŚCIA DAŁY ZERO I BYŁO TO ZERO NARZĘDZIA.** Skokowe
`scrollTo` nie daje animacjom sterowanym przewijaniem **ani jednej klatki
pośredniej** — element ląduje od razu w stanie końcowym. Rozstrzygnęła
kontrola pozytywna: wstrzyknięty element z własną animacją **też nie
zapalał**, więc wina leżała po stronie metody. Dopiero przewijanie płynne,
klatka po klatce, pokazało ruch.

### 3.3 Hover (1c) — R NIE UNOSI KART

| przedmiot | zmiana | czas | krzywa |
| --- | --- | --- | --- |
| linki i przyciski nawigacji | tło + barwa | **150 ms** | `cubic-bezier(0.4, 0, 0.2, 1)` |
| karty (`rounded-4xl`, `rounded-2xl`) | **żadna** | `0s` | — |
| CTA hero i stopki | **żadna** | `0s` | — |

Zero na kartach jest sprawdzone, nie domniemane: **6 z 11 celów bez zmian
przy 5 ze zmianami** w tym samym przebiegu.

### 3.4 Próg odsłonięcia (1d)

Wejście zaczyna się, gdy **górna krawędź elementu przecina dolną krawędź
kadru**: zmierzone 884 px przy oknie 900 px, czyli **98,2 % wysokości okna**
— odpowiednik `animation-range: entry 0%`. Elementy dalsze w kolejności
startują później **z odstępu 100 ms**, nie z innego progu.

### 3.5 Bento (1e)

| kadr | kolumny | odstęp | rozpiętości |
| --- | --- | --- | --- |
| 1440 / 1190 | **`403.188px 604.812px`** (≈ 0,4 / 0,6), kontener 1024 | **16 px** | pierwsza karta `span 2 / span 2` (403 × 658), pozostałe 605 × 342 i 605 × 300 |
| 390 | jedna | 16 px | 342 × 560 · 342 × 429 · 342 × 529 |

Siatka cennika osobno: **3 × 320 px, odstęp 32** — przeniesiona już w ADR-062.

## 4. KROK 2 — hero w kompozycji R

| | PRZED | **PO** | źródło |
| --- | --- | --- | --- |
| promień ramy | brak (maska) | **32 px** | 4. szczebel drabiny R, decyzja zlecenia |
| kreska | brak | **1 px, rola strefy** | zlecenie |
| `overflow` | brak | **hidden** | wymóg ramy |
| maska eliptyczna | jest | **schodzi** | wyklucza się z ramą |
| sekcja hero @1440 | 1600 px = **1,778 vp** | 1524 px = **1,693 vp** | sekcja hero R |
| sekcja hero @390 | 1120 px = 1,327 vp | bez zmian | patrz niżej |
| rama @1440 / 1190 / 390 | — | 1170 × 658 · 1110 × 624 · 350 × 197 | proporcja 1,778 zachowana |

⚠ **MASKA SCHODZI I JEST TO ODWRÓCENIE WCZEŚNIEJSZEJ DECYZJI.** Do dziś kadr
hero był **jedynym slotem bez ramki, promienia i cienia** — wtapiał się
w tło (decyzja właściciela, `WWW/072` pkt 3). Nowe zlecenie żąda ramy, a rama
i maska wykluczają się mechanicznie: `mask-image` wygasza także obrys, więc
rama byłaby narysowana i zjedzona przy narożnikach.

⚠ **KADR @390 BEZ ZMIANY MINIMUM — I JEST TO ODMOWA, NIE PRZEOCZENIE.**
U R rama **leży poza sekcją hero** na wąskim kadrze (sekcja 931 px, rama
zaczyna się na 1493). Rozpiętość „tekst + rama" wynosi tam **2,43 vp**, u nas
1,327 vp. Zrównanie z wzorcem **wydłużyłoby** naszą stronę o ponad tysiąc
pikseli; porównania sekcja-do-sekcji na tym kadrze po prostu nie ma.

### Parallax — CSS-only, trzy warstwy zabezpieczenia

| kadr | Δ przesunięcia obrazu na 0,8 vp | `reduced-motion` |
| --- | --- | --- |
| 1440 | **33,3 px** | **0 px, `transform: none`** |
| 1190 | **31,6 px** | **0 px** |
| 390 | **9,9 px** | **0 px** |

Warstwy: `@supports (animation-timeline: scroll())` · `prefers-reduced-motion:
no-preference` · **powiększenie obrazu żyje wewnątrz tych samych warunków**.
Trzecia jest tu najmniej oczywista i najważniejsza: gdyby powiększenie stało
na zewnątrz, przeglądarka bez obsługi osi czasu pokazałaby obraz przesunięty
i nieruchomy — kadrowanie zepsute po cichu u tego, kto ruchu i tak nie zobaczy.

**Tekst nad kadrem, zero nachodzeń** — zmierzone prostokątami: zapas
**293 px** (1440 i 1190) i **350 px** (390), nachodzących elementów 0.

⚠ **KONTROLA POZYTYWNA TEJ SONDY WYMAGAŁA TRZECH PODEJŚĆ i to jest ustalenie
o układzie.** Przesunięcie `h1` przez `transform` nie tworzy nachodzenia, bo
**animacja wejścia bije styl wbudowany**; przesunięcie marginesem nie tworzy
go, bo margines na `h1` spycha kadr o tyle samo — jeden przepływ. Dopiero
ujemny margines KADRU wciąga go pod tekst. Wniosek mocniejszy niż sam pomiar:
**w tym układzie tekst i kadr nachodzić na siebie nie mogą z konstrukcji**,
a nie dlatego, że akurat starczyło miejsca.

## 5. KROK 3 — ruch R na naszym kodzie

Mechanizm **już istniał** (`animation-timeline: view()` + `@supports`, zero
JS, treść widoczna bez wsparcia — ADR-047). Ten krok to jego **przestrojenie
na liczby R**, nie nowa konstrukcja.

| | PRZED (Proactiv) | **PO (React Bits)** |
| --- | --- | --- |
| czas krycia / przesunięcia | 400 / 420 ms | **400 / 400 ms** |
| krzywa | `cubic-bezier(0.2, 0, 0, 1)` | **`cubic-bezier(0.215, 0.61, 0.355, 1)`** |
| odstęp (stagger) | 70 ms | **100 ms** |
| przesunięcie tekstu | 20 px | 20 px (bez zmian, teraz z tokena) |
| przesunięcie kart | **brak rodziny** | **40 px** |
| zakresy staggera przy `view()` | 6 / 12 / 18 % | **9 / 17 / 26 %** (skala 100/70) |

**Zmierzone po zmianie, tą samą sondą co na wzorcu:**

| sekcja | normalnie | `reduced-motion` | ukrytych |
| --- | --- | --- | --- |
| karty funkcji @y2400 | **Δty 40 → 0**, 3 karty | **0 zmian** | **0** |
| dbanie o siebie @y7000 | **Δty 20 → 0**, 2 elementy | **0 zmian** | **0** |

### ⚠ ZANIKANIA R NIE DA SIĘ TU PRZENIEŚĆ — i to nie jest niedbałość

Pomiar daje kartom `opacity` 0 → 1 **razem** z przesunięciem. R robi to
JavaScriptem: obserwator przecięcia ustawia krycie na 1 przy pierwszym
wejściu w kadr i **zostawia je tam na stałe**.

Oś `view()` takiej pamięci nie ma. Element, do którego nikt nie przewinie,
stoi na `opacity: 0` **bezterminowo** — a tekst o zerowym kryciu jest tekstem
niewidocznym. Zmierzone przy pierwszym podejściu (ADR-047): **128 naruszeń
`color-contrast` o wadze serious na dziewięciu trasach**.

Przeniesienie zanikania wymagałoby więc **JavaScriptu, którego zlecenie
zakazuje wprost** („CSS-only, opcja 1"), albo złamania bramki dostępności.
Zostaje samo przesunięcie: **wierność pomiarowi ustępuje warunkowi
brzegowemu, którego wzorzec nie ma.** Ta sama klasa co alfa pigułki
w ADR-059 — „przeniesienie wartości wzorca pogłębiłoby wadę".

## 6. Bramki i pomiary

| | wynik |
| --- | --- |
| komplet e2e (4 kadry) | **1376 passed · 12 skipped · 0 failed** |
| axe (4 kadry) | **120 passed** |
| tokeny · liczby · parytet · deklaracje | ZIELONE |
| linki · kotwice · No-JS | **ZIELONE** (po domknięciu L-OPS-04 na skryptach) |
| kontrakt ΔE | czerwień zastana, nietknięta |
| dev właściciela na 3000 | **200 przez cały batch** — żadne budowanie go nie tknęło |

## 7. Czego ten ADR NIE rozstrzyga

- **Bento** — siatka R zmierzona (§3.5), **nie wdrożona**: zlecenie żąda
  pomiaru w kroku 1e i nie żąda przebudowy żadnej naszej sekcji na ten układ.
  Wdrożenie wymaga decyzji, KTÓRA sekcja ma nim zostać.
- **Hover kart** — R go nie ma, my mamy (R6, ADR-048). Nie zdejmuję:
  zlecenie o tym nie mówi, a zdjęcie ruchu jest zmianą, której nikt nie
  zamawiał.
- **Rodziny wejścia „słowo po słowie"** (67 ms, krok 0,15 → 1) — zmierzona,
  niewdrożona; wymagałaby dzielenia treści na `span`-y w trzech językach.
- **Wysokości hero na kadrze wąskim** — patrz §4.
- **Współczynnika parallaxu** — 3 % to wybór, nie pomiar; jeśli ma być inny,
  jest to decyzja właściciela, a nie dostrojenie do wzorca.
