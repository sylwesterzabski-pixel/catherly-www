# Pomiar wzorca — KROK 0 zlecenia `WWW/050-FINAL`

Data pomiaru: **2026-08-26**. Narzędzie: Playwright + CDP, Chromium,
`getComputedStyle` na wyrenderowanej stronie. Commit w chwili pomiaru:
`187f366` (osiągalny).

**Wzorzec** = strona wskazana adresem w zleceniu `WWW/050-FINAL`.
Nazwy szablonu ani autora ten dokument nie wymienia — zakaz właściciela
z 2026-08-26. Adres źródłowy stoi w treści zlecenia i tam zostaje.

**Wszystkie liczby pochodzą z ODCZYTU, nie z oka.** Tam, gdzie czegoś
nie dało się zmierzyć tą drogą, jest to napisane wprost jako granica
pomiaru, a nie pominięte.

---

## 0.1 KRÓJ

### Rodziny faktycznie użyte

| rodzina | gdzie |
|---|---|
| `Satoshi` | nagłówki (H1, H2), duże napisy |
| `Inter` (Regular / Medium / SemiBold / Bold) | proza, nawigacja, przyciski, etykiety |

Pliki poszły z sieci jako **7 osobnych żądań `woff2`** — dwa dla kroju
nagłówkowego (z CDN autora wzorca) i pięć dla `Inter` (z CDN Framera).
**Plików autora nie pobieramy** (zasada rzemiosła ze zlecenia): krój
bierzemy z oficjalnego źródła i hostujemy u siebie.

### Skala zmierzona (1440 px)

| element | rozmiar | waga | interlinia | tracking | barwa |
|---|---|---|---|---|---|
| H1 | **70 px** | 500 | 84 px (1,20) | **−3 px** | `#ffffff` |
| H2 | **60 px** | 500 | 72 px (1,20) | **−3 px** | `#ffffff` |
| nawigacja / proza | **16 px** | 500 | 28,8 px (1,80) | normal | `#c6c7c6` |
| plakietka górna | **12 px** | 700 | 14,4 px (1,20) | normal | `#070806` |

Interlinia nagłówków to **równo 1,20**, prozy — **1,80**. Tracking
nagłówków jest **ujemny i podany w pikselach** (−3 px), czyli zależny od
rozmiaru: przy 70 px to −0,043em, przy 34 px byłoby −0,088em. Przy
przenoszeniu trzeba wybrać: albo px (wierność), albo em (skalowalność).
**To jest decyzja, nie szczegół** — zapisana jako otwarta.

### Warunki twarde ze zlecenia — stan sprawdzenia

| warunek | stan |
|---|---|
| self-host | do wykonania w KROKU 1 |
| subset latin + latin-ext (`ąćęłńóśźż`, `ß`, umlauty) | **do sprawdzenia na pliku po pobraniu** — wzorzec ładuje subset `latin`, więc polskich i niemieckich znaków w jego plikach NIE MA |
| `font-display: swap` + dostrojony fallback | do wykonania |
| budżet ≤ 120 kB łącznie | **ryzyko**: dwie rodziny × kilka wag; przy pełnym latin-ext trzeba będzie ciąć wagi |

⚠ **Wzorzec ładuje wyłącznie subset `latin`** (widać w nazwach plików
Framera: `Inter-Medium.latin-…`). Nasze trzy języki wymagają `latin-ext`.
Nasze pliki będą więc **cięższe od jego przy tej samej liczbie wag** —
budżet 120 kB trzeba będzie rozstrzygnąć liczbą wag, nie zakresem znaków.

---

## 0.2 KOLORY

Zmierzone z elementów o niezerowej powierzchni; liczba w nawiasie to
liczba wystąpień, czyli waga danej barwy w kompozycji.

### Powierzchnie

| rola (nasza nazwa) | wartość | wystąpień |
|---|---|---|
| tło strony | `#070806` | podkład całej strony |
| powierzchnia karty | `#131412` | 56 |
| powierzchnia karty, półprzezroczysta | `rgba(19, 20, 18, 0.4)` | 24 |
| powierzchnia podniesiona | `#20211f` | 6 |
| powierzchnia obrysu / separatora | `#393938` | 3 |
| przyciemnienie warstwowe | `rgba(7, 8, 6, 0.6)`, `rgba(34, 34, 34, 0.8)` | 3 |

### Tekst

| rola | wartość | wystąpień |
|---|---|---|
| tekst podstawowy | `#c5c6c5` | **116** |
| tekst mocny / nagłówki | `#ffffff` | **101** |
| tekst drugorzędny | `#c6c7c6` | 9 |
| tekst przygaszony | `#dfdfdf` | 3 |
| tekst na akcencie | `#231f20` / `#070806` | 9 |

### Akcent

| rola | wartość | wystąpień |
|---|---|---|
| **akcent** | **`#a0e00d`** (limonka) | 16 tekst + 7 tło |
| akcent, wariant jaśniejszy | `#a5e219` | 1 |

### Gradienty

| zastosowanie | wartość |
|---|---|
| tło hero | `linear-gradient(144deg, rgba(23,26,23,0.2) 0%, #070806 100%)` |
| linia akcentu pozioma | `linear-gradient(90deg, rgba(160,224,13,0) 0%, #a0e00d 52.86%, rgba(160,224,13,0) 100%)` |
| linia akcentu pionowa | `linear-gradient(rgba(160,224,13,0) 0%, #a0e00d 100%)` |
| przygaszenie karty | `linear-gradient(#131412 0%, rgba(0,0,0,0.05) 100%)` |
| połysk (mockup) | `linear-gradient(283deg, #ffffff 12%, rgba(255,255,255,0.3) 109%)` |

---

## 0.3 GEOMETRIA

| rzecz | wartość | uwaga |
|---|---|---|
| kontener treści | **1440 px** (16×), **1280 px** (3×), **800 px** (8×) | 800 px to kolumna prozy |
| padding sekcji (1440) | **160 px** / 160 px; wariant **135 px** / 0; **130 px** / 160; **80 px** / 80 | |
| gap siatek | **10 px** (66×), **12 px** (58×), **24 px** (55×), 8 px (41×), **32 px** (38×), 4, 16 | skala co 4 px |
| border-radius | **8 px** (88×) dominujący, **12 px** (35×), **50 px** (11×, pigułki), 40 px (8×), 9/15/16/10 px | |
| obramowanie | `2px inset #767676` (11×) | to obramowania kontrolek formularza, nie ozdoba |
| cień karty | `rgba(0,0,0,0.1) 0 2px 4px, rgba(0,0,0,0.05) 0 1px 0, rgba(255,255,255,0.15) 0 …` | |
| cień miękki (mockup) | `rgba(0,0,0,0.17) 0 0.6px 1.57px −1.5px, rgba(0,0,0,0.14) 0 2.29px 5.95px −3px, …` | wielowarstwowy |

---

## 0.4 RUCH

### Co widać w stylu wyliczonym

| własność | czas | krzywa |
|---|---|---|
| `transform` | **0,1 s** | `cubic-bezier(0.2, 0, 0, 1)` |
| `opacity` | **0,4 s** | `ease-out` |
| `background, box-shadow` | 0 s | `ease` (czyli bez przejścia) |
| `@keyframes` | **ZERO** | — |

### ⚠ GRANICA POMIARU, nazwana wprost

**Styl wyliczony pokazuje tylko ułamek ruchu tej strony i to nie jest
przeoczenie pomiaru, tylko własność narzędzia, którym zbudowano wzorzec.**
Framer Motion animuje przez **style nadawane w locie z JavaScriptu**,
a nie przez `@keyframes` czy `transition` w arkuszu. Zero klatek
kluczowych przy widocznym ruchu na stronie jest tego dowodem, nie
sprzecznością.

Wniosek wykonawczy: **czasów, progów scrolla i prędkości marquee nie da
się odczytać z CSS — trzeba je wyznaczyć z nagrań klatka po klatce.**
Ten pomiar jest zaplanowany i jeszcze nie wykonany; do tego czasu żadna
liczba o ruchu wzorca nie jest w tym dokumencie podana, bo nie byłaby
pomiarem, tylko domysłem.

---

## 0.5 BREAKPOINTY

Zmierzone przez zwężanie okna od 1600 do 320 px i odczyt H1:

| zakres | H1 | interlinia |
|---|---|---|
| **≥ 1440 px** | 70 px | 84 px |
| **810–1280 px** | **53 px** | 63,6 px |
| **≤ 768 px** | **34 px** | 40,8 px |

Punkty przełamania: **między 1440 a 1280** oraz **między 810 a 768**.
Skok 70 → 53 → 34 px jest **skokowy, nie płynny** — wzorzec nie używa
`clamp()`, tylko progów. Nasza obecna skala robi odwrotnie (`clamp`),
więc to jest różnica konstrukcyjna, nie kosmetyczna.

Liczba widocznych linków spada z 33 (≥1440) na 26 (1280–810) i 25
(≤768) — czyli nawigacja i stopka gubią pozycje przy zwężaniu.

---

## 0.6 MATERIAŁ REFERENCYJNY

Zrzuty pełnych stron w trzech kadrach — **poza repozytorium**, w katalogu
roboczym pomiaru: `wzorzec/zrzuty/wzorzec-{1440,768,390}.png`.
Nagrania ruchu: **do wykonania razem z pomiarem 0.4**.

---

## Co ten pomiar ZMIENIA w naszym stanie — cztery rzeczy, nie jedna

1. **Motyw odwraca się z jasnego na ciemny.** Tło `#070806` wobec
   naszego kremu `#f0efe8`. To nie jest zmiana odcienia, tylko zamiana
   warstwy jasnej z inwersją miejscami — a mamy 26 ról zbudowanych pod
   jasną warstwę podstawową.
2. **Akcent wraca do limonki.** `#a0e00d` należy do tej samej rodziny co
   `#a3e635` — barwa, którą kasowaliśmy 2026-08-26 razem z blokiem
   eksperymentu. Wtedy zmierzono, że limonka na jasnym tle ma 1,12–1,28:1
   i sama plama nie rysuje przycisku; **na tle `#070806` ta przeszkoda
   znika**, bo kontrast liczy się wobec czerni.
3. **Krój ustępuje.** Onest schodzi; wchodzą dwie rodziny zamiast jednej,
   a warunek 120 kB robi się ciasny przy `latin-ext`.
4. **Skala przestaje być płynna.** `clamp()` ustępuje progom.
