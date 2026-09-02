# ADR-048: Strona główna bez zrzutów aplikacji — sloty fotograficzne, cień pod wskaźnikiem, §8.1 jako uzupełnienie

Data: 2026-09-02. Status: **PRZYJĘTY** (decyzje właściciela 02.09.2026,
zlecenie `WWW/072`, punkty 1–5 oraz trzy rozstrzygnięcia dodatkowe podjęte
w trakcie wykonania, opisane niżej).

Zamyka trzy pytania, które zlecenie postawiło, ale których **nie
rozstrzygało**, oraz zdejmuje ze strony głównej całą warstwę zrzutów
produktu.

⚠ **NUMER 048 BYŁ WCZEŚNIEJ CYTOWANY, ALE PLIK NIGDY NIE POWSTAŁ.**
`Hero.module.css:131` odsyłał do „ADR-048" przy dekoracji fali 2 (WWW/051).
Pliku nie było — odesłanie wisiało w pustkę. Blok, który je niósł, znika
w tym samym commicie (rozstrzygnięcie 1 poniżej), więc wiszące odesłanie
zamyka się samo. Odnotowane, bo inaczej wyglądałoby na przejęcie cudzego
numeru.

## Rozstrzygnięcie 1 — zrzuty aplikacji wychodzą ze strony głównej

**Decyzja właściciela, WWW/072 pkt 1: „ZERO zrzutów aplikacji i mockupów
urządzeń na stronie głównej."** Obraz strony głównej to odtąd **duże kadry
fotograficzne ludzi**, dostarczane osobnym torem (Higgsfield prowadzi
koordynator; akcept właściciela **per kadr**).

Co dokładnie schodzi z renderu:

| element | gdzie był | mechanizm zdjęcia |
| --- | --- | --- |
| mockup DMO w hero (warstwa a) | `Hero.tsx`, `<picture>` + `.mockup` | znacznik usunięty |
| dekoracja fali 2 (warstwa b) | `Hero.module.css`, `.kolumny::before` ≥90rem | reguła usunięta |
| cztery zrzuty filarów (warstwa a) | `Filar.tsx` przez `page.tsx` | flaga `osadzenieNaGlownej.wlaczone` → `false` |

**Pliki `public/obrazy/**` zostają NIETKNIĘTE** — to archiwum dowodowe
z sumami SHA-256 z dostawy Z6. Tak samo alt-teksty `ObrazyFilarow.*`
zostają w i18n: wrócą z fotografiami albo wymienią się osobnym zleceniem.

### Dlaczego flaga, a nie skasowanie kodu

Filary schodzą **istniejącym przełącznikiem**, nie usunięciem gałęzi.
`design/pipeline-obrazow.json → osadzenieNaGlownej.wlaczone` czyta zarówno
markup, jak i strażnik `e2e/zrzuty-filarow.spec.ts`, więc jedno przestawienie
przełącza oba naraz i **markup nie może rozjechać się z asercją**. Przy
`false` strażnik nie milknie — przechodzi na sprawdzanie, że osadzenie jest
gotowe do włączenia (komplet wariantów, sumy PNG, alty ×3). Archiwum dowodowe
zostaje więc **dalej pilnowane**, mimo że nic z niego nie jest publikowane.

⚠ **ZMIENIA SIĘ POWÓD WYŁĄCZENIA, NIE TYLKO WARTOŚĆ.** Flaga została
zbudowana jako przełącznik **budżetu LCP** („włącz, gdy bramka mierzy na
transporcie produkcyjnym"). Od dziś jej `false` znaczy co innego: **decyzję
o materiale obrazowym**. Gdyby ktoś odczytał tylko dawny `warunekWlaczenia`
i przestawił flagę na `true` po odzyskaniu zapasu LCP, **złamałby decyzję 1
nie wiedząc o niej**. Dlatego powód jest wpisany do samego rejestru, obok
starego — nie zamiast niego.

## Rozstrzygnięcie 2 — sześć slotów fotograficznych, nie sześć pustych miejsc

**Decyzja właściciela, WWW/072 pkt 2.** Do czasu dostawy kadrów sloty
**zostają w DOM** — nie znikają i nie czekają jako puste `div`-y bez
wymiaru:

- **zarezerwowane `aspect-ratio`**, żeby układ nie skoczył przy podmianie,
- wypełnienie: **gradient z ról palety** (`tlo-strony` → `powierzchnia`),
- `aria-hidden="true"` — slot nie niesie treści, więc nie ma go w drzewie
  dostępności,
- komentarz `SLOT-FOTO-<sekcja>` w miejscu podmiany.

Sześć slotów: **hero (1) + filary (4) + „Dbanie o siebie" (1)**.

Proporcje: filary **16/10** — wartość **bez zmiany**, bo ramka filaru już ją
rezerwowała i zmiana proporcji byłaby dokładnie tym skokiem układu, przed
którym broni ten punkt. Hero i „Dbanie o siebie" — **16/9**.

⚠ **ZAKAZ STOCKÓW Z REALNYMI OSOBAMI POZOSTAJE W MOCY** (`CLAUDE.md`,
rozdział TWARZE). Kadr generowany nie ma podmiotu, który mógłby nie wyrazić
zgody; zdjęcie realnej osoby ma. Slot z gradientem nie jest obejściem tej
granicy — jest miejscem, które czeka na kadr **przechodzący ją legalnie**.

## Rozstrzygnięcie 3 — hero wtapiane, nie oprawione

**Decyzja właściciela, WWW/072 pkt 3.** Slot hero nie ma **ramki, promienia
ani cienia**. Wtapia się w tło nierównomiernie — maską gradientową, nie
krawędzią. Reszta slotów zachowuje oprawę: filary promień 12 px
(`promien-sredni`, bez zmiany), „Dbanie o siebie" 16 px (`promien-karty`,
nowy — patrz rozstrzygnięcie 5).

## Rozstrzygnięcie 4 — cień WYŁĄCZNIE pod wskaźnikiem

Zlecenie mówiło: *„cienie warstwowe kart wg §8.1"*. **Wykonanie zatrzymało
się na sprzeczności i oddało ją właścicielowi, zamiast rozstrzygać po
cichu.**

Sprzeczność jest zmierzona, nie domniemana:

| źródło | co mówi |
| --- | --- |
| `KartyFunkcji.module.css:6` (POMIAR wzorca) | „tło = rola powierzchni · BEZ obrysu · **bez cienia**" |
| `globals.css:402` | „Cień **NIE JEST w systemie** — nie dokładam go, bo nie ma dla niego roli w tokenach" |
| ADR-038, mechanizm trzeci | karty rozdziela **KOMPOZYCJA**, nie cień |
| §8.1 (Habitline) | karty mają cień trzywarstwowy |

Czyli: **§8.1 opisuje INNY wzorzec niż ten, z którego zmierzono naszą
skalę.** Dodanie cienia w spoczynku unieważniłoby trzy powyższe zapisy naraz.

**Rozstrzygnięcie właściciela (WWW/072, pytanie 2): cień pojawia się
WYŁĄCZNIE pod wskaźnikiem i pod fokusem.**

Skutek jest dokładnie taki, jakiego szukało zlecenie („energia wzorca"),
i nie kosztuje żadnego z trzech zapisów: **powierzchnia w spoczynku nie
zmienia się o piksel**, więc pomiar „bez cienia" zostaje prawdziwy,
a mechanizm rozdziału z ADR-038 — nietknięty. Karty (`KartyFunkcji`,
`CennikSkrot`) były przy tym **jedynymi dużymi powierzchniami strony bez
żadnej reakcji na wskaźnik** — czyli miejscem, gdzie energia była naprawdę
potrzebna, a nie dokładana na siłę.

⚠ **`transition` JEST SKRÓTEM.** Każde kolejne wystąpienie zastępuje
poprzednie w całości. Przejście cienia dopisano więc do elementów, które
**nie miały** własnego `transition` — a nie do CTA (`globals.css:702`) ani
do `a` (`:717`), gdzie skasowałoby istniejące. Ta pułapka zabrała już raz
CTA własność `transform` (`globals.css:695-701`).

## Rozstrzygnięcie 5 — §8.1 UZUPEŁNIA skalę, nie zastępuje jej

Drugie pytanie oddane właścicielowi. **§8.1 wnosi TRZECIE źródło geometrii**
do repozytorium, które ma już jedno:

- obecne `wymiar.*` — wzorzec `WWW/050-FINAL`, **POMIAR 0.3** przez
  `getComputedStyle` (promień 8 px w 88 wystąpieniach, kontener 1440 px
  w 16, pigułka 50 px w 11),
- §8.1 — **Habitline**, zrzut SSR przez `curl`,
- §8.2 — **Nexus**, jeszcze inne liczby.

Sam §8.1 deklaruje swoją niekompletność (`SPEC-STRONY-DLA-FRAMERA.md:563`,
`[LIMIT-URL]`): *„Wartości w §8 to **dolne ograniczenie, nie pełny obraz**"*.
To pomiar **słabszy** niż `getComputedStyle` stojące za POMIAREM 0.3.
Przyjęcie go jako zamiennika dałoby dwa żywe źródła prawdy o wymiarach —
rodzina zakazu 10.

**Rozstrzygnięcie właściciela (WWW/072, pytanie 1): obecna skala
WWW/050-FINAL pozostaje obowiązująca. Z §8.1 wchodzą WYŁĄCZNIE wartości,
których repozytorium nie ma wcale — jako uzupełnienia luk, nigdy jako
zamienniki. Przy konflikcie wygrywa POMIAR 0.3.**

Bilans przeniesienia — **z 17 pozycji §8.1 weszły TRZY**:

| pozycja §8.1 | wartość | decyzja |
| --- | --- | --- |
| cień warstwowy kart | 3 warstwy | **WSZEDŁ** jako `cien.karta` (tylko hover) |
| promień średnich kart 16–20 px | 16 px | **WSZEDŁ** jako `wymiar.promien-karty` |
| gap kart 40–50 px | 40 px | **WSZEDŁ** jako `wymiar.odstep-8` — z powodu mechanicznego, patrz rozstrzygnięcie 6 |
| padding sekcji 200 / 120 / 100 px | — | **NIE** — `odstep-sekcji` 160 px z POMIARU 0.3 wygrywa |
| kontenery 1200 / 1080 / 980 px | — | **NIE** — nieużywane; token bez użycia to martwy byt |
| progi 1200 / 810 px | — | **NIE** — repo łamie układ na 768/769 px; przeniesienie to przestawienie 14 wystąpień `@media`, nie dodanie tokena |
| gapy elementów 24–30 / małe 6–16 px | — | **NIE** — pokryte istniejącą skalą `odstep-1..7` |
| promień pigułki 100 px | — | **NIE** — mamy 50 px z POMIARU 0.3 (11 wystąpień) |

**Nie dopisano ani jednego tokena, którego kod nie używa.** Token bez użycia
wygląda jak decyzja, a jest deklaracją — i przy następnym czytaniu
udaje, że §8.1 został przeniesiony szerzej, niż został.

⚠ **PRZEDZIAŁ TO NIE WARTOŚĆ.** Pięć pozycji §8.1 podaje zakres, nie
liczbę (gap kart 40–50, promień dużych 40–50, średnich 16–20, małych 8–10,
gap elementów 24–30), a specyfikacja **nie mówi, który koniec gdzie
obowiązuje**. Wybór jednego końca jest DECYZJĄ, nie odczytem — i po cichu
zapisałby się w repozytorium jako „wartość wzorca". **Rozstrzygnięcie
właściciela (WWW/072, pytanie 3): dolny koniec.** Stąd 16 px, nie 20.

## Rozstrzygnięcie 6 — odstęp slotu rośnie do 40 px, próg strażnika zostaje

**To jest naprawa defektu, który zdjęcie zrzutów odsłoniło — nie ozdoba.**

`e2e/rozdzial-kart.spec.ts` ma wiersz `["ramka kadru", "/",
'[class*="Filar_obraz__"]']` i sprawdza cztery mechanizmy rozdziału. Po
zdjęciu zrzutów **wszystkie cztery padają na kadrze `mobile-390`**:

| mechanizm | wartość po zmianie | próg | wynik |
| --- | --- | --- | --- |
| plama | 1,09 | ≥ 1,30 | ✘ |
| kreska | 0,00 (wzorzec ramek nie obrysowuje) | ≥ 1,30 | ✘ |
| pokrycie obrazem | 0% (obrazu nie ma) | ≥ 90% | ✘ |
| kompozycja | odstęp **24 px**, promień 12 px | ≥ 30 px | ✘ |

Na desktopie kompozycja przechodzi, bo `.uklad` jest siatką z `gap: 100 px`.
Siatka wchodzi dopiero od 48.0625rem — poniżej tego progu odstęp bierze się
z `margin-block-start: 1.5rem` (24 px) i jest **o 6 px za mały**.

⚠ **TEGO STANU NIGDY NIE ZMIERZONO, I TO JEST NAJWAŻNIEJSZE ZDANIE TEGO
ROZDZIAŁU.** Wiersz „ramka kadru" i czwarty mechanizm weszły do specu
commitem **późniejszym** niż włączenie osadzenia zrzutów (sprawdzone:
`git merge-base --is-ancestor`). Strażnik **nigdy nie przebiegł przeciw
pustej ramce**. Wyłączenie zrzutów nie jest więc powrotem do stanu wcześniej
zielonego — jest **wejściem w konfigurację, której nikt nie mierzył**.
Gdyby ktoś przyjął „przecież tak było przed dostawą Z6", dostałby czerwień
bez wyjaśnienia.

**Naprawa idzie przez KOD, nie przez próg.** Odstęp slotu od tekstu na
kadrze wąskim rośnie z 24 px do **40 px** (`wymiar.odstep-8`). Próg 30 px
w ADR-038 zostaje nietknięty — obniżenie go byłoby zamianą czerwieni na
ciszę (zakaz 3). 40 px daje **10 px zapasu**; `odstep-7` (32 px) dałby 2 px,
czyli margines pozorny.

## Czego ten ADR NIE rozstrzyga

- **Kadrów fotograficznych nie ma.** Sloty czekają; dostawa i akcept
  **per kadr** to osobny tor. Do tego czasu strona główna nie pokazuje
  ani jednego obrazu — i to jest stan zamierzony, nie brak.
- **Element LCP po przebudowie** — zmierzony i podany w zwrotce `WWW/072`,
  nie tutaj: liczba w ADR-ze zestarzałaby się przy pierwszej zmianie hero.
- **Pozostałe piętnaście pozycji §8.1** — nie odrzucone na zawsze, tylko
  nieprzeniesione bez użycia. Wracają, gdy któraś będzie potrzebna
  konkretnemu elementowi.
- **Dryf komentarza przy czasach hero** (`globals.css:637` i `796-798` mówią
  550 ms, kod mówi 400/420 ms) — zgłoszony, **nienaprawiony**: zakaz 8.
- **Nagłówek `lint-tokeny.mjs:4` obiecuje pokrycie „cieni"**, choć grupy
  `cien` do dziś nie było. Od tego commitu grupa istnieje, więc zdanie stało
  się prawdziwe — ale było nieprawdziwe wcześniej i to jest osobna pozycja,
  nie zasługa tego ADR-a.
