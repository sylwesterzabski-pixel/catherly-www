# ADR-040: Kroje wzorca — Satoshi w nagłówkach, Inter w prozie, oba self-hostowane

Data: 2026-08-26. Status: **PRZYJĘTY** (KROK 1.2 zlecenia
`WWW/050-FINAL`). **Uchyla ADR-031** w części dotyczącej kroju (Onest);
ADR-031 uchylił wcześniej ADR-026 i ADR-027 (`system-ui`).

## Decyzja

| warstwa | krój | plik | postać |
| --- | --- | --- | ---: |
| nagłówki | **Satoshi Medium 2.000** | `public/fonts/satoshi-medium.woff2` | statyczny, waga 500 — **17,3 kB** |
| proza | **Inter 4.001** | `public/fonts/inter-var.woff2` | zmienny `wght` 100–900 — **39,8 kB** |

**Razem 57,1 kB** przy budżecie 120 kB — zapas 62,9 kB. `font-display:
swap`, obie rodziny z dostrojonym krojem zapasowym, **preload jednego
pliku**. Zero domen zewnętrznych.

## Skąd pliki — i dlaczego to nie jest formalność

Wzorzec serwuje oba kroje z CDN swojego kreatora stron. **Plików stamtąd
nie bierzemy** — zlecenie mówi wprost: kopiujemy WARTOŚCI, nie pliki.
Oba kroje pobrano z ich **własnych** źródeł, a podzbiory zbudowano tutaj:

- **Satoshi** — pakiet z `fontshare.com`; licencja odczytana **z tabeli
  `name` pliku** (nameID 13/14 → `fontshare.com/terms`).
- **Inter** — repozytorium `google/fonts`; **OFL**, nameID 14 →
  `openfontlicense.org`.

Licencje czytane **z plików, nie z opisów stron**. Warunek twardy ze
zlecenia („zatrzymaj się, gdyby licencja nie pozwalała na self-host") —
**STOP nie zachodzi**.

## Trzy rozstrzygnięcia, które nie są oczywiste

### 1. Oś `opsz` przypięta — 20,1 kB za zakres, którego nikt nie użyje

Inter z `google/fonts` ma **dwie osie**: `wght` 100–900 i `opsz` 14–32.
Podzbiór z obiema ważył **59,4 kB**. Nasza proza ma **16 px** i jednego
rozmiaru optycznego używa zawsze — po przypięciu `opsz=16` plik waży
**39,8 kB**.

**20,1 kB, czyli jedna trzecia pliku, płaciło za oś, której nikt nie
rusza.** Wolna oś `opsz` nie jest wartością samą w sobie; jest nią
dopiero, gdy coś ją zmienia.

### 2. Podzbiór na ZADEKLAROWANYM zakresie, nie na dzisiejszej treści

Zakres: Basic Latin + Latin-1 + Latin Extended-A + interpunkcja
typograficzna + strzałki + znaki matematyczne + `U+2713`.

Podzbiór zbudowany z listy dzisiejszych stringów byłby **migawką, która
pęka przy pierwszym nowym zdaniu** — i pęka **cicho**: brakujący znak
spada do kroju zapasowego i wygląda tylko na „dziwnie złożony", nie na
błąd. To ta sama klasa co licznik przepisywany ręcznie pod tabelą.

**Defekt złapany tą drogą:** podzbiór `Inter` zbudowany w KROKU 0 miał
**206 wpisów cmap i NIE zawierał `’ “ ” „ ←`** — czyli polskich
cudzysłowów, których nasza treść używa. Był zbudowany pod zestaw
**wzorca**, nie nasz. Gdyby wszedł, cudzysłowy w całym serwisie
składałby krój zapasowy.

### 3. `U+2713 ✓` włączony świadomie — poz. T14 traci warstwę kroju

Onest **nie miał** tego znaku, a stoi on w `TabelaPorownawcza` na
`/cennik`. Oba nowe kroje ✓ mają (sprawdzone w `cmap` plików pełnych),
więc **pominięcie go w zakresie byłoby odtworzeniem znanego defektu
własną ręką**. Po zmianie **zmierzone na renderze: ✓ składa Inter**.

**Liczba przy okazji sprostowana.** Dawny zapis mówił „stoi 15× na
`/cennik`". Pomiar 2026-08-26: **5 na stronie**, jednakowo w `pl`, `en`
i `de` — piętnaście to **suma z trzech stron**. Liczba nie była
fałszywa; była **podana bez zakresu** i czyta się jak liczba dla jednej
strony. Klasa: cytat wyjęty bez zakresu (T26).

**Zasięg naprawy jest węższy niż pozycja T14:** naprawiono znak w kroju
**tekstowym**. Czy ✓ ma tam w ogóle stać zamiast ikony SVG — pozostaje
pytaniem T14 i **tej decyzji ten ADR nie podejmuje**.

## Krój zapasowy — tym razem szerokość ZMIERZONA

ADR-031 trzymał `size-adjust: 100%` z uczciwym uzasadnieniem:
*„dopasowania SZEROKOŚCI nie mierzono i nie zgaduję go"*. **Teraz jest
zmierzone** — średnia szerokość znaku na próbce **161 znaków** (pangramy
PL + DE + EN + cyfry), wobec Arialu jako rodziny zapasowej:

| krój | średnia szerokość | wobec Arialu | przeskok bez dostrojenia |
| --- | ---: | ---: | ---: |
| Arial (odniesienie) | 0,4547 em | — | — |
| Satoshi Medium | 0,4637 em | **102,0 %** | 2,0 % |
| Inter waga 500 | 0,4883 em | **107,4 %** | 7,4 % |

Nadpisania pionowe policzone tą samą drogą — z metryk `hhea`
podzielonych przez `size-adjust`.

**Granica, ta sama co w ADR-031 i nadal uczciwa:** przy interlinii
podanej **mnożnikiem** nadpisania pionowe nie zmieniają wysokości
wiersza — działają dopiero przy `line-height: normal`. Zostają, bo są
poprawne. **Nie twierdzę, że zmniejszają CLS, bo tego nie zmierzono.**
Istnienie tej rodziny uzasadnia `size-adjust`, nie one.

Na Androidzie i Linuksie `local("Arial")` nie istnieje, więc rodzina
zapasowa nie powstaje i stos schodzi do `system-ui`.

## Preload — jeden plik, i to nagłówkowy

Preładowany jest **Satoshi**, nie proza. Wybór nie jest dowolny: jedyne
`h1` strony jest **elementem LCP** (kontrakt K2), a składa je Satoshi.
Preload prozy przyspieszyłby tekst, którego LCP nie mierzy, i
**konkurowałby o pasmo z tym, który mierzy**.

**Jeden, nie dwa** — preload dwóch plików zamienia priorytet w jego brak.
Proza dojedzie na `font-display: swap`, mając dostrojoną rodzinę
zapasową trzymającą szerokość, więc podmiana nie przesuwa układu.

`crossOrigin` jest wymagane **nawet przy pliku z własnego serwera**: bez
niego przeglądarka pobiera plik **drugi raz**, bo żądanie fontu zawsze
idzie w trybie CORS.

## Czego ten ADR nie obejmuje

- **Skala typograficzna i geometria** — KROK 1.3, osobno.
- **Tracking nagłówków −3 px kontra em** — pozostaje otwarty (POMIAR
  0.1): wierność wymaga `px`, skalowalność `em`, i to jest decyzja.
- **`⚑ ✅ ❌ ⚠`** nie istnieją w żadnym z dwóch krojów tekstowych
  (sprawdzone w `cmap` plików pełnych). Składa je systemowy krój emoji
  i tak ma być — zapisane, żeby następny czytający nie szukał ich
  w podzbiorze.

## Dowód wykonania — pomiar, nie odczyt CSS

Zmierzone przez CDP `CSS.getPlatformFontsForNode` na zbudowanym wydaniu
(nie z arkusza, który „wygląda poprawnie"):

| element | krój faktycznie użyty |
| --- | --- |
| `h1` (element LCP) | **Satoshi Medium**, 57 glifów |
| `h2` | **Satoshi Medium**, 42 glify |
| proza | **Inter**, 106 glifów |
| nawigacja | **Inter**, 7 glifów |
| komórki z `✓` na `/cennik` | **Inter**, 5 glifów |

Pobrane pliki krojów: **dokładnie dwa**, oba `200`.
