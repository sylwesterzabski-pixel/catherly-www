# ADR-066: Odwrócenie palety i zrzuty aplikacji z historii

Data: 2026-09-06. Status: **PRZYJĘTY W CZĘŚCI** (zlecenie `WWW/091`:
**kroki 0, 1 i 2 wykonane w całości; krok 3 ZABLOKOWANY, krok 4 od niego
zależny** — patrz §5).

Decyzja właściciela z 06.09: **strona jasna z klamrami grafitowymi**.
Ten ADR ją wykonuje i zamyka pozycję **T68**.

---

## 1. KROK 1 — odwrócenie palety

**Do dziś korpus był ciemny, a jasny był wyjątkiem.** Sześć sekcji nosiło
`data-ton="jasny"`, który przestawiał dziewięć ról. Po odwróceniu **role
bazowe niosą wartości jasne**, a wyjątkiem jest **klamra grafitowa**
oznaczana `data-ton="ciemny"`.

### Role bazowe — dwanaście wartości przestawionych

| rola | ciemna | **jasna** |
| --- | --- | --- |
| `kolor.tlo` | `#070806` | **`#f5f5f7`** |
| `powierzchnia` | `#131412` | **`#ffffff`** |
| `powierzchnia-2` | `#20211f` | **`#f5f5f7`** |
| `powierzchnia-akcentowa` | `#393938` | **`#ffffff`** |
| `tekst-podstawowy` | `#ffffff` | **`#0f0f0f`** |
| `tekst-drugorzedny` | `#c5c6c5` | **`#565656`** |
| `kreska` | `#393938` | **`#cdcdcd`** |
| `kreska-mocna` | `#c5c6c5` | **`#565656`** |
| `link` | `#ffffff` | **`#0f0f0f`** |
| `fokus` | `#ffffff` | **`#151515`** |
| `akcent` | `#bee741` | **`#4f6f06`** |
| `link-aktywny` | `#bee741` | **`#4f6f06`** |

⚠ **`interakcja` ZOSTAJE LIMONKĄ — i tu rozchodzą się dwie role, które do
dziś miały tę samą wartość.** `akcent` niesie TEKST, więc na jasnym musiał
zejść na ciemną oliwkę (limonka ma tam **1,31:1**). `interakcja` jest
WYPEŁNIENIEM przycisku z ciemną etykietą (**11,41:1**) i limonką zostaje.
Kto zobaczy dwie różne wartości tam, gdzie kiedyś była jedna, ma tu powód.

### Pięć nowych ról klamry

| rola | wartość | pochodzenie | ×`grafit-klamr` |
| --- | --- | --- | --- |
| `tekst-na-klamrze` | `#ffffff` | dawny `tekst-podstawowy` | **13,40:1** |
| `tekst-2-na-klamrze` | `#c5c6c5` | dawny `tekst-drugorzedny` | **7,82:1** |
| `akcent-na-klamrze` | `#bee741` | limonka wzorca | **9,38:1** |
| `kreska-na-klamrze` | `#565656` | **wyprowadzona z relacji** | **1,83:1** |
| `fokus-na-klamrze` | `#ffffff` | dawny `fokus` | **13,40:1** |

Wszystkie pięć wchodzi **razem ze swoimi parami** w strażniku — rola bez
pary jest w zbiorze i poza sprawdzaniem, czyli furtką. **`LICZBA_ROL`: 31 → 36.**

### Trzy stany przyciemnione z zachowaniem odcienia

Barwy stanów były dobrane pod korpus ciemny i na bieli dawały ~4,0:1.
Przyciemnione w przestrzeni HLS — **odcień i nasycenie bez zmian, spada
wyłącznie jasność**:

| rola | było | **jest** | na bieli | na tle |
| --- | --- | --- | --- | --- |
| `stan-sukces` | `#3e8e5d` | **`#306f49`** | 6,01:1 | 5,52:1 |
| `stan-ostrzezenie` | `#ae7117` | **`#895912`** | 6,00:1 | 5,51:1 |
| `stan-blad` | `#e24634` | **`#bb2b1b`** | 6,04:1 | 5,55:1 |

Próg celowany 5,5, nie 4,5 — kanon woli zapas od „ledwo spełniającego".

### Szkło: płyta ciemna → jasna

`powierzchnia-szklo` była `rgba(57, 57, 56, 0.30)` — ciemną płytą pod
korpus ciemny. Na jasnym składała się w szarość `#bdbdbe`, na której akcent
miał **3,09:1** (złapał to `kontrast-stanow`, nie oko). Po zmianie na
`rgba(255, 255, 255, 0.92)` daje `#fefefe`: akcent **5,77:1**, tekst
**19,01:1**, przygaszony **7,28:1**.
⚠ Płyta wobec tła to **1,08:1**, czyli poniżej progu 1,30 z ADR-038 —
rozdział niesie **kreska**, dokładnie tak jak w kartach wzorca (jego karty
to biel na `#f5f5f7`, ta sama relacja).

### Strażnik: dwie pary zdjęte, sześć dołożonych, jedna reguła nowa

| zmiana | dlaczego |
| --- | --- |
| **para `tekst-podstawowy × grafit-klamr` zdjęta** | po odwróceniu tekst bazowy jest ciemny; na klamrze renderuje się `tekst-na-klamrze`, który ma własną parę |
| **para `interakcja × tlo-strony` (3:1) zdjęta** | limonka na jasnym daje 1,31:1 — kształtu przycisku nie niesie już plama, tylko obrys |
| **`grafit-klamr` wyjęta z `POWIERZCHNIE`** | klamra przemapowuje KAŻDĄ rolę, więc bazowe się na niej nie renderują; trzymanie jej dawało czerwień na parach o nieistniejącym przedmiocie |
| **`AKCENT_TYLKO_PLAMA` pusta** | akcent po odwróceniu niesie tekst na każdej powierzchni jasnej (5,34 i 5,82); strażnik sam zgłosił „WYJĄTEK ZBĘDNY" |
| **nowa reguła `R-CTA-OBRYS`** | patrz niżej |

⚠ **`R-CTA-OBRYS` JEST SUROWSZY OD TEGO, CO ZASTĘPUJE — i to jest cała
odpowiedź na zarzut osłabiania bramki.** Stara para pytała o jedną rzecz
(plama CTA na tle ≥ 3:1) i przestała mieć przedmiot. Nowa reguła pyta
o dwie: obrys wobec **tła** (żeby przycisk było widać) **oraz** obrys wobec
**wypełnienia** (żeby granica była granicą). Zakres też urósł — dawniej
dotyczyła stref jasnych, dziś całej strony. Ma też własny strażnik
przeterminowania: gdyby wypełnienie kiedyś samo przeszło próg plamy na
każdej powierzchni, blok zgłasza, że obrys przestał być wymogiem.

### Dowody mutacyjne

| mutacja | wynik | powrót |
| --- | --- | --- |
| `akcent` wraca na limonkę | **5 błędów**, m.in. `R-AKCENT-01: --akcent na --tlo-strony = 1.31:1` | SHA identyczna, zielony |
| obrys CTA zrównany z wypełnieniem | **6 błędów**, m.in. `R-CTA-OBRYS: obrys wobec wypełnienia = 1.00:1` | SHA identyczna, zielony |

### ⚠ Defekt znaleziony przez axe, nie przez oko

Plakietka „polecany" brała `akcent` jako **tło**. Po odwróceniu akcent stał
się ciemną oliwką, a ciemna etykieta na niej dała **2,80:1** — 58 naruszeń
`color-contrast` na trzech trasach. Plakietka jest **plamą**, więc należy do
rodziny `interakcja` (11,41:1), nie `akcent`.

⚠ **PRZY TEJ POPRAWCE POMYLIŁEM SIĘ I ZAPISUJĘ TO, BO ŁATWO POWTÓRZYĆ.**
Podmieniłem razem z plakietką drugie wystąpienie `background:
var(--kolor-rola-akcent)` w `globals.css`, biorąc oba za plamy. To nie była
plama: `block-size` wynosi 1 px, czyli **kreska podkreślenia**. Limonka
dałaby tam 1,31:1 i kreska by znikła. **Rozstrzyga funkcja elementu, nie
nazwa własności `background`.** Cofnięte.

### Strażnik klawiatury: czyta ton, nie jedną wartość

`e2e/klawiatura.spec.ts` porównywał barwę obwódki fokusu z **bazową** rolą
`fokus`. W klamrze obowiązuje `fokus-na-klamrze` (biel), więc test upadał
na wartości **poprawnej**. Odtąd czyta rolę obowiązującą dla danego
elementu (`closest('[data-ton="ciemny"]')`) — **wzmocnienie**: poprzednia
wersja przepuściłaby w klamrze dowolną barwę, bo nie umiała tam zajrzeć.

## 2. KROK 1 — kontrola T68, czyli po co to wszystko

| | jasne | ciemne |
| --- | --- | --- |
| **wzorzec (cel)** | **70,9 %** | 22,5 % |
| nasza strona **przed** | 48,3 % | 45,6 % |
| nasza strona **po** | **74,6 %** | 19,1 % |

**Nakładka całości wobec wzorca-kolumny: 50,2 % → 29,8 %.** Jedna zmiana
mechanizmu ruszyła liczbę o **20,4 punktu** — więcej niż wszystkie
przeszczepy form razem wzięte (te ruszyły ją o 0,9). **T68 ZAMKNIĘTE.**

⚠ Nakładka samego pasa nawigacji **pogorszyła się** (31,6 → 38,2 %) i ma to
jedną przyczynę: nasz pas ma 84 px, wzorcowy ≈110 px, więc pas 84–110
jest u nas już jasny, a u wzorca jeszcze grafitowy. Wysokości nie ruszam —
110 px łamie pułap `odsuniecie-kotwic` (96 px), co zapisano w ADR-064.

## 3. KROK 2 — zrzuty aplikacji odzyskane z historii

⚠ **`e35ad8ce` NIE JEST COMMITEM TEGO REPOZYTORIUM** — `git cat-file` mówi
`Not a valid object name`. To skrót **repozytorium aplikacji**, zapisany
w nazwie raportu pochodzenia. Polecenie ze zlecenia (`git show e35ad8ce`)
nie mogło zadziałać i nie zadziałało.

Zrzuty znalazły się pod `design/obrazy-robocze/z6` w commicie **`6168ec7`**.
Przywrócone do `public/obrazy/aplikacja/` razem z manifestem sum i raportem
pochodzenia.

| plik | wymiar | SHA-256 z manifestu |
| --- | --- | --- |
| `z6-filar-1-dmo.png` | 2048 × 1280 | **OK** |
| `z6-filar-2-tarcza.png` | 2048 × 1280 | **OK** |
| `z6-filar-3-pierwsze-90-dni.png` | 2048 × 1280 | **OK** |
| `z6-filar-4-wrapped.png` | 2048 × 1280 | **OK** |

**Cztery z czterech sum zgodne** — tożsamość dowiedziona, nie założona.
Pochodzenie: Playwright, baza efemeryczna `catherly_zrzuty` (NIE produkcja),
konto demo bezosobowe, viewport 1280×800 @ 1,6. **To spełnia regułę kanonu**
(„zrzuty produktu robi wyłącznie Playwright na danych demo"), więc ich
powrót nie jest wyjątkiem od zakazu, tylko jego wykonaniem.

## 4. Bramki

| | wynik |
| --- | --- |
| komplet e2e (4 kadry) | **1376 passed · 12 skipped · 0 failed** |
| axe (4 kadry) | **120 passed** (przed poprawką plakietki: 58 naruszeń) |
| strażnik tokenów | ZIELONY, **36 ról** |
| tokeny · liczby · parytet · deklaracje · linki · kotwice · No-JS | ZIELONE |
| CI dla `0f88a4d` | 12 zielonych, 4 czerwone — **bez różnicy** wobec `0dfc33b` |
| dev właściciela na 3000 | **200 przez cały batch** |

## 5. ⚠ KROK 3 ZABLOKOWANY — brakuje przedmiotu, nie czasu

Zlecenie mówi: *„Mapowanie z tabeli koordynatora"*, a przy karcie Wrapped
*„liczby z tabeli"* i przy cenniku *„cennik-skrót z tabeli"*.

**TEJ TABELI W ZLECENIU NIE MA.** Nie ma jej też w repozytorium — sprawdzone.
To jest klasa **„odesłanie bez treści"** z kanonu: *odesłanie bez treści
zwraca się z pytaniem, nie uzupełnia z pamięci*. Kosztuje jedno pytanie
u nadawcy, a u odbiorcy — całą fałszywą pewność, bo odesłanie wygląda na
kompletne.

**Czego konkretnie brakuje, żeby ruszyć:**
1. **mapowanie** — który istniejący klucz treści trafia do której z dziesięciu
   sekcji wzorca (zwłaszcza „pamięć" i „wzrost", które nie mają dziś nagłówków);
2. **brzmienia trzech chipów** i **zdania CTA** po polsku — implementacja
   treści nie pisze (zakaz 9), a parytet ×3 jest bramką blokującą;
3. **liczby do karty Wrapped** — mają być oznaczone „dane przykładowe",
   ale muszą skądś pochodzić (`content/facts.json` albo tabela).

**KROK 4 jest od kroku 3 zależny** w sześciu z dziewięciu sekcji, więc też
nie ruszony. Ruszone zostało to, co od treści nie zależy i weszło w kroku 1:
klamra, korpus jasny, sekcja zamknięcia zdjęta z tonu ciemnego.

## 6. Czego ten ADR NIE rozstrzyga

- **Kroków 3 i 4** — patrz §5.
- **Wysokości pasa nawigacji** — 84 px zamiast wzorcowych ≈110 (ADR-064).
- **Trzech kart filarów zamiast czterech** — decyzja właściciela z 06.09
  przyjęta, ale wykonanie należy do kroku 4.
- **Bloku `[data-ton="jasny"]`** — po odwróceniu jest **tożsamością**
  (wszystkie przypisania wskazują na wartości równe bazowym). Zostaje, bo
  atrybut siedzi w sześciu komponentach; usunięcie obu naraz to osobne,
  mechaniczne zadanie.
