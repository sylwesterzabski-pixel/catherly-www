# Z6 — odbiór zrzutów produktu i osadzenie w filarach

Data odbioru: **2026-08-16**. Dostawa: `~/Documents/FBO OS/zrzuty-z6/`,
z commita aplikacji `e35ad8ceefbed065d196c0342891f9f1fe56d2bd`.
Rola: implementacja. Polecenie właściciela: 8 punktów odbioru PNG.

Ten dokument jest zapisem odbioru — co przyszło, co z tego sprawdzono
pomiarem, co zostało włączone, co świadomie wyłączone i pod jakim
warunkiem się włącza. Nie zastępuje instrukcji dostawy
(`design/obrazy-robocze/z6/PRZEKAZANIE-DO-WWW.md`) ani metryczki
pochodzenia (`RAPORT-POCHODZENIA-e35ad8ce.md`) — obie leżą w repo
razem z plikami źródłowymi.

## 1. Integralność — sumy przed czymkolwiek

Instrukcja dostawy wymaga weryfikacji przed jakąkolwiek obróbką i po
przeniesieniu. Obie wykonane:

| moment | wynik |
| --- | --- |
| przed kopiowaniem, w katalogu dostawy | `shasum -a 256 -c` → **4/4 OK**, exit 0 |
| po kopiowaniu do `design/obrazy-robocze/z6/` (`cp -p`) | **4/4 OK**, exit 0 |
| wymiary źródeł (`sips`) | 4 × **2048×1280** — zgodne z metryczką |

Pakiet skopiowany w całości: cztery PNG + `SUMY-KONTROLNE.sha256` +
`PRZEKAZANIE-DO-WWW.md` + `RAPORT-POCHODZENIA-e35ad8ce.md`. Metryczka
pochodzenia jest w repo, nie w streszczeniu — dostawa i jej dowód
podróżują razem.

## 2. Przypisanie kadr ↔ filar i rozjazd nazw

**Dostawa nazywa filary inaczej niż strona.** Przypisanie zrobiono po
treści kadru i po numerze pliku, nie po nazwie — oba źródła wskazują to
samo, więc rozjazd jest kosmetyczny, ale musi być zapisany, żeby nikt
nie „poprawił" go w drugą stronę.

| plik dostawy | trasa aplikacji | nazwa w dostawie | filar na stronie | co w kadrze |
| --- | --- | --- | --- | --- |
| `z6-filar-1-dmo.png` | `/dmo` | Rytm dnia | **POZYSKIWANIE** (`filar1`) | Dzienny Plan Działania: liczniki dnia z celami i paskami postępu |
| `z6-filar-2-tarcza.png` | `/etyka/shield` | Zgodność | **TREŚCI** (`filar2`) | Tarcza: wklejony tekst z obietnicą zarobków, oznaczone ryzykowne sformułowania, propozycja poprawki |
| `z6-filar-3-pierwsze-90-dni.png` | `/first90` | Wdrożenie | **ZESPÓŁ** (`filar3`) | Pierwsze 90 Dni: faza, numer dnia, pasek postępu, karta misji |
| `z6-filar-4-wrapped.png` | `/magic/wrapped` | Podsumowanie | **WYNIKI** (`filar4`) | Twój Wrapped: slajd miesięczny z licznikiem opublikowanych postów |

**Plików nie przemianowujemy.** Nazwa pliku figuruje w
`SUMY-KONTROLNE.sha256` i w metryczce commita `e35ad8ce`; zmiana nazwy
zerwałaby ścieżkę weryfikacji dla korzyści czysto estetycznej.
Prowieniencja jest ważniejsza niż ładne nazwy. Rozjazd jest zapisany
w rejestrze (`design/pipeline-obrazow.json` → pola `nazwaWDostawie`
i `nazwaNaStronie`) i w tej tabeli — decyzja właściciela z 2026-08-16,
punkt 3.

## 3. Pipeline

`scripts/obrazy-pipeline.mjs` (`npm run obrazy:pipeline`), rejestr:
`design/pipeline-obrazow.json`. Rejestr jest **jednym** źródłem prawdy —
czyta go generator i czyta go markup, więc markup nie może wskazać
wariantu, którego generator nie zrobił.

Kolejność operacji jest częścią kontraktu: **najpierw** weryfikacja
sum wszystkich źródeł, **potem** pierwsza konwersja. Plik spoza
rejestru jest odrzucany; wymiary każdego źródła są sprawdzane
`sharp`-em wobec rejestru; katalog wyjściowy jest czyszczony
i odtwarzany, a na końcu liczba plików musi się zgadzać z iloczynem
z rejestru.

Wyjście: `public/obrazy/filary/`, **36 plików, 1311 kB** —
AVIF (q60) i WebP (q82) w 480/768/1280/2048 plus PNG jako zapasowy
`<img src>`.

| kadr | AVIF 1280w | WebP 1280w | PNG zapasowy |
| --- | --- | --- | --- |
| `filar-1-dmo` | 18 kB | 23 kB | 145 kB |
| `filar-2-tarcza` | 36 kB | 50 kB | 240 kB |
| `filar-3-pierwsze-90-dni` | 18 kB | 24 kB | 138 kB |
| `filar-4-wrapped` | 14 kB | 18 kB | 113 kB |

PNG zapasowy jest **kopią bajt w bajt** pliku źródłowego, nie
rekompresją — potwierdzone sumami SHA-256 po wygenerowaniu i pilnowane
testem. Powód jest ten sam, dla którego markup omija optymalizator
Nexta: na produkcji ma wylądować dokładnie ten plik, który przeszedł
weryfikację przy odbiorze.

## 4. Alty

Namespace `ObrazyFilarow` w `src/i18n/messages/{pl,en,de}.json`, po
jednym opisie na filar, w trzech językach.

Alty napisano od zera pod **realne kadry**. Kierunek z handoffu K4 był
w dwóch miejscach nieaktualny (mówił „Ekran Studia" i „Ekran Pulpitu"
tam, gdzie dostawa pokazuje Tarczę i Wrapped) — sam handoff nakazywał
finalizację „przy odbiorze Z6, zgodnie z tym, co zrzut FAKTYCZNIE
pokazuje" (Prawo 2), więc rozstrzygnął kadr, nie dokument.

Metryczka mówi o „pięciu licznikach" w kadrze 1; w kadrze widać cztery
(piąty jest pod krawędzią). Alt nie podaje liczby — opisuje funkcję
ekranu, nie inwentarz pikseli. Alty nie obiecują wyniku.

## 5. Pomiary LCP — dlaczego osadzenie na „/" jest wyłączone

Budżet: **1800 ms** (CLAUDE.md, bramka blokująca). Mediany z trzech
przebiegów `lhci autorun`, ta sama maszyna, ta sama konfiguracja:

| stan gałęzi | `/` | pozostałe 6 tras |
| --- | --- | --- |
| przed dostawą (baza) | **1704 ms** | 1699–1702 ms |
| z osadzonymi czterema kadrami | **1854 ms** ⛔ | 1700–1702 ms (bez zmian) |
| po wyłączeniu osadzenia | **1706 ms** ✅ | 1701–1703 ms |
| kontrolnie: gałąź Z6 z usuniętym `<img>` | 1702–1720 ms | — |

CLS **0,0000** i a11y **1,00** we wszystkich stanach; TBT ≤ 7 ms.

**Mechanizm, zmierzony a nie zgadnięty.** Element LCP na „/" to
`h1` hero (tekst), nie obraz. Rozbicie faz:

```
przed:  TTFB 456 | Load Delay 0 | Load Time 0 | Render Delay 1267
z Z6:   TTFB 454 | Load Delay 0 | Load Time 0 | Render Delay 1411
```

TTFB bez zmian — rośnie wyłącznie render delay. Trace sieciowy
pokazuje, że mimo `loading="lazy"` i `fetchPriority="low"`
przeglądarka pobiera **wszystkie cztery** warianty 768w AVIF już
w oknie startowym (obejmuje je próg leniwego ładowania), łącznie
44 kB o priorytecie Low; pod dławieniem Lighthouse te bajty konkurują
o łącze z zasobami blokującymi render.

Ostatni wiersz tabeli jest testem atrybucji: ta sama gałąź, wszystkie
zmiany Etapu F na miejscu (namespace altów, rejestr, srcset w HTML),
tylko bez `<img>` — wynik równy bazie. Czyli koszt to **bajty obrazów**,
nie reszta zmian.

**Kontekst szerszy od Z6:** „/" miało przed dostawą zapas **96 ms**
przy render delay 1267 ms dla zwykłego nagłówka tekstowego. Budżet na
tej stronie był wyczerpany, zanim cokolwiek doszło; dowolny dodatek go
przebije. Rozbiór tego render delay wykonano — **wynik odwraca wniosek
tej sekcji**: `docs/faza-4/render-delay-glowna.md`. Strona maluje się
realnie w 88–97 ms; 1703 ms to liczba wyłącznie symulowana, a jej
największy składnik jest kosztem transportu, na którym mierzy bramka.
Tabela wyżej pozostaje prawdziwa dla HTTP/1.1 + gzip i nieprawdziwa dla
transportu produkcyjnego — patrz zaktualizowany warunek włączenia
w sekcji 6.

## 6. Decyzja i przełącznik

Decyzja właściciela z 2026-08-16, **wariant 4**: najpierw odzyskać
zapas na „/", potem włączyć zrzuty. Kod osadzenia zostaje kompletny —
skasowanie go i odtwarzanie później znaczyłoby przechodzić weryfikację
całej ścieżki (sumy, warianty, alty, dostępność) drugi raz, a to
właśnie ta weryfikacja była kosztem tego etapu.

Przełącznik: `design/pipeline-obrazow.json` → `osadzenieNaGlownej`.
Czyta go **markup** (`src/app/[locale]/page.tsx` przez
`src/obrazy/zrzuty.ts`) i czyta go **strażnik**
(`e2e/zrzuty-filarow.spec.ts`). Nie ma drugiego miejsca, w którym
można to włączyć — nie da się włączyć markupu bez włączenia asercji
ani odwrotnie.

Stan wyłączony nie jest ciszą, tylko innym pytaniem. Testy pilnują:

- kompletu 36 wariantów na dysku i tego, że żaden nie jest pusty,
- że zapasowe PNG-i **i** źródła w repo mają sumy z dostawy,
- że alt istnieje w trzech językach dla każdego filaru i że żadne dwa
  filary nie mają tego samego opisu,
- że w HTML „/", „/en" i „/de" **nie ma ani jednego odwołania** do
  `/obrazy/filary/` — bo powodem wyłączenia były pobrane bajty, nie
  sam znacznik `<img>`; zostawiony `<source srcset>` przywróciłby
  +150 ms po cichu,
- że filar pokazuje pustą ramkę z `aria-hidden`, jak przed dostawą.

**Stan przełącznika od 2026-08-16: WŁĄCZONY.** Rozstrzygnięcie
właściciela po rozbiorze: bramka ma się przełączyć na preview sama,
po dwóch kliknięciach w ustawieniach, a zrzuty mają być wtedy już na
„/" — bez trzeciego kliknięcia w repo. Skutek uboczny, przewidziany
i zaakceptowany: dopóki zmienna `LHCI_BAZA` jest pusta, bramka mierzy
przez HTTP/1.1 i „/" przekracza próg. To czerwień termometru, nie
strony; adnotacja z liczbami leci do logu CI przy każdym przebiegu
(`scripts/tryb-pomiaru.mjs`). Bezpiecznikiem jest ADR-020 — z czerwoną
bramką nic nie wejdzie do main, więc dowodem będzie pomiar na preview,
a nie ta deklaracja. Szczegóły przełączenia i dowody mutacyjne
strażnika: `docs/faza-4/bramka-na-preview.md`.

**Warunek włączenia — zaktualizowany 2026-08-16 po rozbiorze render
delay** (`docs/faza-4/render-delay-glowna.md`; decyzja właściciela:
„strona zdrowa, termometr zły"):

> Bramka LCP mierzy na **transporcie produkcyjnym** — preview Vercel,
> HTTP/2 + brotli.

Poprzedni warunek („mediana ~1450 ms na „/"") jest **unieważniony**.
Rozbiór wykazał, że 795 ms z 1703 ms to baseline Next 15.5.23 +
React 19.2.8 — dwa chunki, zero kodu aplikacji — i że koszt to
**rundy sieciowe, nie kilobajty**: brotli na HTTP/1.1 dał +3 ms,
dopiero na HTTP/2 −150 ms. Ta sama gałąź, ten sam build:

| transport | `/` bez Z6 | `/` z Z6 | koszt Z6 | zapas do 1800 ms |
| --- | --- | --- | --- | --- |
| HTTP/1.1 + gzip (bramka dziś) | 1703 ms | 1856 ms ⛔ | **+153 ms** | −56 ms |
| HTTP/2 + gzip | 1426 ms | 1427 ms | **+1 ms** | 373 ms |
| HTTP/2 + brotli (Vercel) | **1276 ms** | **1276 ms** ✅ | **+0 ms** | **524 ms** |

Cztery warianty 768w AVIF były pobrane w **każdym** przebiegu — to nie
jest pułapka lanterny, tylko multipleksowanie: HTTP/2 zdejmuje rundy,
nie bajty. Zapas 524 ms mieści Z6 (150 ms) plus rezerwę designu
(~200 ms) i zostawia 174 ms.

Włączenie = zmiana `wlaczone` na `true` (już zrobiona); **dowodem jest
pomiar na preview**, nie ta tabela. Co zostało po stronie właściciela
i co przełączy się samo: `docs/faza-4/bramka-na-preview.md`.

## 7. Dowody mutacyjne

Strażnik zielony nie jest dowodem, że cokolwiek mierzy (ADR-018).
Dowodem jest czerwień po celowym zepsuciu. Każda mutacja aplikowana
osobno, plik przywracany bajt w bajt, przywrócenie weryfikowane
porównaniem zawartości.

**Stan włączony** (mierzone na gałęzi z osadzeniem, `wlaczone=true`):

| mutacja | co psuje | wynik |
| --- | --- | --- |
| M1 | usunięcie całego bloku obrazu z filaru (build zielony) | 16/16 czerwonych |
| M3 | wyzerowanie altu | 14 czerwonych |
| M4 | `aria-hidden` na kontenerze obrazu | 2 czerwone |
| M5 | zdjęcie `loading="lazy"` i `fetchPriority="low"` | 2 czerwone |
| M6 | zdjęcie `width`/`height` (powrót skoku układu) | 2 czerwone |
| M7 | skasowanie wygenerowanych plików jednego filaru | 6 czerwonych |

M1 zapala dodatkowo **starego strażnika zebry** w `e2e/filary.spec.ts`
(1 czerwony) — czyli tamten test dalej mierzy kontener obrazu i nie
wygasł przez podmianę otoczenia.

**Stan wyłączony** (dzisiejszy):

| mutacja | co psuje | wynik |
| --- | --- | --- |
| N1 | markup osadza obraz mimo `wlaczone=false` (rozjazd markup↔przełącznik) | 8 czerwonych |
| N2 | uszkodzony wariant AVIF w `public` | 2 czerwone |
| N3 | PNG w `public` ≠ bajty zweryfikowane przy odbiorze | 2 czerwone |
| N4 | ten sam alt pod dwoma filarami | 2 czerwone |

## 8. Otwarte — czeka na ogląd właściciela

Trzy rzeczy odłożone świadomie; **nie rozstrzygam ich sam** (decyzja
właściciela z 2026-08-16, punkt 4). Materiał do oceny:
`podglad-z6/` (poza repo) — pełna strona i sam filar 1, desktop 1280
i mobile 390.

1. **Czytelność na 390 px.** Dostawa jest z viewportu 1280×800 @1,6×
   zamiast 1024×640 @2× z handoffu. Ten sam wymiar pliku, ale tekst
   interfejsu ~25 % mniejszy. Na desktopie czyta się dobrze; na 390 px
   etykiety bocznego menu są na granicy — kryterium DECYZJI 9.
2. **Puste pola w kadrach 3 i 4** (~50 % i ~55 % powierzchni).
   Kadrowanie zmieniające wymowę jest zakazane, więc zostaje jak jest
   do czasu decyzji: akceptujemy czy prosimy o re-shoot.
3. **Re-shoot zamiast retuszu.** Gdyby cokolwiek w kadrach miało się
   zmienić — zmiana idzie przez aplikację i nową dostawę, nigdy przez
   obróbkę pliku (instrukcja przekazania, ADR-011).

Kadry modułów dla `/funkcje/*` to dostawa **Z9+**, poza zakresem Z6.
