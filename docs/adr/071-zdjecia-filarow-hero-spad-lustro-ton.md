# ADR-071 — zdjęcia filarów i dnia, hero, filary: spad, lustro, ton

- Status: PRZYJĘTY
- Data: 2026-09-07
- Zlecenie: `WWW/098 v2` (partia 1a; zastępuje `WWW/098` i dopiski 1–3)
- Baza: `b214adb`
- Zakres: **hero, cztery sekcje filarów, slot 2 sekcji „dzień", sekcja „pamięć".** Reszta strony nietknięta — partia 2+.

## 1. Bitmapy — 5/5 sum zgodnych przed zapisem

Pięć plików pobranych z bazy dostawy, wszystkie 2528 × 1696, wszystkie
sumy szesnastoznakowe zgodne z tabelą zlecenia **co do znaku**. Weryfikacja
idzie w tym samym przebiegu co pobranie, a zapis do repozytorium dopiero
po niej — pełna tabela sum PNG i AVIF w
`docs/obrazy/MANIFEST-WZORZEC-2026-09-06.md`.

**Alt-y z oglądu pliku, nie z podpowiedzi zlecenia** — i dwa się różnią:
zlecenie proponowało dla 15a „z kawą w dłoni" (na obrazie dłoń spoczywa
przy filiżance, nie trzyma jej) i dla 15b „gest otwartej dłoni" (widać
dłoń przy twarzy). Oba poprawione zgodnie z tym, co widać.

**T71 i T73 zamknięte.** Slot 2 sekcji „dzień" stał pusty, bo kadr
`5-w-ciagu-dnia` pokazywał laptop z pulpitem i wykresem, czyli przechodził
próbę kanonu („czy odwiedzająca mogłaby uznać, że tak wygląda aplikacja?")
na TAK. Kadr `4b` pokazuje kobietę z kawą w kuchni — żadnego ekranu, więc
pytanie w ogóle nie powstaje. Odpięte i **pozostawione na dysku**:
`filar-1-pozyskiwanie` · `filar-2-tresci` · `filar-3-zespol` ·
`filar-4-wyniki` · `dbanie-o-siebie`.

## 2. Hero — nagłówek po czterech rozstrzygnięciach jednej doby

Zapisuję je w kolejności, bo idą w różne strony i bez tego zapisu następna
sesja cofnie któreś z nich, „naprawiając" pozostałe:

| krok | co | kontrast |
| --- | --- | --- |
| 1 | zlecenie pkt 3b: „Catherly" jako **pigułka** (plama `interakcja`, tekst `tekst-na-interakcji`) | 11,41:1 |
| 2 | właściciel: „zmień tylko kolor, a nie rób przycisku" — zakaz limonkowego tekstu **zdjęty imiennie**; wybrana rola `akcent` | 5,34:1 |
| 3 | właściciel: „zrób 1:1 taki jak tło pigułki przycisku" — rola `interakcja` jako barwa tekstu | **1,31:1 — `axe` czerwony, 9 przypadków** |
| 3a | właściciel: dodać obrys w barwie tekstu nagłówka; dodany i **cofnięty** na jego polecenie | bez zmiany werdyktu |
| 4 | właściciel: „Catherly jak «Rozmawiasz z ludźmi», a «prowadzi kontakty i wyniki» trochę jaśniejszy" — **stan obowiązujący** | 17,60:1 i 6,74:1 |

⚠ **KROK 3 ZOSTAŁ WYKONANY, ZMIERZONY I ZARAPORTOWANY, NIE OBEJŚCIONY.**
Limonka przycisku jako tekst daje 1,31:1 na tle hero, 1,43:1 na bieli
i 1,20:1 na tonie trzecim — żaden ton strony nie ratuje, a próg WCAG AA
dla tekstu dużego to 3,0. Wykonawca nie może ani obejść haka (zakaz 2),
ani osłabić strażnika (zakaz 3); może wyłącznie wykonać i zaraportować —
i tak zrobił. Krok 4 zdjął limonkę z nagłówka, więc `color-contrast`
zgasł **przez zmianę przedmiotu, a nie przez złagodzenie progu**.

⚠ **OBRYS NIE BYŁ I NIE MÓGŁ BYĆ NAPRAWĄ KONTRASTU.** WCAG liczy kontrast
z wyliczonej wartości `color` wobec tła; `-webkit-text-stroke` do tego
rachunku nie wchodzi i `axe` mierzy tak samo. Zmierzone przy obrysie:
dziewięć przypadków `color-contrast`, bez zmiany. Zapisane, żeby obrys nie
został kiedyś wzięty za rozwiązanie tej klasy.

**Nagłówek dwuwierszowy, bez półpauzy.** Łamanie niesie **znak nowej linii
w treści**, nie znacznik `<br>`: podział jest własnością tekstu, więc
należy do `content/`. Honoruje go `white-space: pre-line`.

⚠ **`hyphens: manual` NA H1 — USTERKA Z TEGO SAMEGO BATCHU, WYCHWYCONA ZE
ZRZUTU.** Wymuszone łamanie wydłużyło wiersz drugi na tyle, że globalna
reguła nagłówków (`hyphens: auto`, ADR-044) podzieliła „kontakty" na
„kontak-ty" — w nagłówku otwierającym stronę. Żadna bramka tego nie
widziała; zobaczyłem to na obrazie. Po zmianie: 3 / 3 / 3 wiersze na
1440, 1280 i 1190 we wszystkich trzech językach.

**Nowy klucz `Hero.ctaWtorne`** („Zobacz funkcje" / „See the features" /
„Funktionen ansehen") z pokryciem w `content/*/naglowek.md`; brzmienia
EN i DE prowizoryczne — pozycja **T75**.

**MacBook w „pamięci" z ekranem białym** (`3-macbook-iphone-alfa`),
decyzja właściciela „na razie". Plik ze zrzutem zostaje w repozytorium
nieużyty; powrót to podmiana jednej linii.

## 3. Telefon — wystaje, pływa, nie zasłania

| | wartość |
| --- | --- |
| plik | `2d-iphone-P-alfa.avif` (obrót w prawo, **nie lustro CSS**) |
| bbox przed | 299 × 371 px (stan po `WWW/097/2`) |
| bbox po | **374 × 464 px** — ×1,25 poleceniem właściciela; łącznie wobec `WWW/096`: ×1,875 |
| położenie | prawa krawędź hero, `translate: 0 25%` — dolna ćwiartka **wystaje 99 px** pod sekcję |
| oś ruchu | `scroll(root block)`, zakres 0 → 100vh, `ease-in-out` |
| zasięg | ±17 px = 2,5 % wysokości hero (przedział zlecenia 2–3 %) |
| zmierzony ruch | y 303 → 329 px przy przewinięciu o 600 px |

**Przecięcia — wszystkie zerowe tam, gdzie zlecenie żąda zera:**

| obszar | przecięcie |
| --- | --- |
| twarz bohaterki | **0 px²** |
| dłoń z telefonem | **0 px²** |
| kolumna tekstu „pamięci" | **0 px²** |
| CTA hero | **0 px²** |
| dolna dłoń (nachodzenie dopuszczone) | 0 px² |

**Sonda ruchu czyta WYLICZONĄ wartość `translate` po dwóch klatkach, nie
próbkuje rAF:** przy przewijaniu 0 → 800 postęp idzie 0,000 → 0,889,
a `translate` od `calc(25% − 17px)` do `calc(25% + 16,17px)`, na osi
`ScrollTimeline`. **CLS: 0,0043 @1440 · 0,0000 @390** — próg 0,1.

⚠ **PRZESUNIĘCIE BAZOWE 25 % POWTÓRZONE W OBU KLATKACH.** Gdyby klatki
niosły sam ±zasięg, telefon wskoczyłby na starcie o ćwiartkę własnej
wysokości — czyli CLS w miejscu, w którym ruch miał być niezauważalny.

Trzy warstwy zabezpieczenia, każda z innego powodu: `@supports` (bez osi
czasu przewijania telefon jest nieruchomy i wystaje tak samo — **fallback,
nie defekt**), `prefers-reduced-motion: reduce` (blok się nie stosuje,
czyli zero transformacji), przesunięcie bazowe wewnątrz obu klatek.

## 4. Filary — spad, lustro, ton

**SPAD.** Tło przeszło z `.wnetrze` (kontener 1200) na `.filar` (sekcję).
Zmierzone: **100,0 % szerokości okna na 1440, 1190 i 390**, x = 0 na
wszystkich trzech, **bez paska poziomego** na żadnym.

⚠ **NIE UŻYWAM `100vw`.** Przy widocznym pasku przewijania `100vw` jest
szersze od obszaru widoku o jego szerokość i strona zaczyna panoramować
w poziomie — dokładnie to, czego pilnuje zamiatanie 320 → 2560. Sekcja
jest dzieckiem `main` o pełnej szerokości, więc blokowe tło i tak sięga
obu krawędzi bez ani jednej sztuczki.

**LUSTRO.** Filary 1 i 3 — tekst po lewej; **2 i 4 — zdjęcie po lewej**.
Wyłącznie wizualnie, przez `order` w bloku progowym; **kolejność w DOM
bez zmian** (tekst przed obrazem na wszystkich czterech), więc czytnik
ekranu i kadr wąski czytają je tak samo. Poniżej progu lustra nie ma —
wszystkie cztery mają tekst nad zdjęciem.

⚠ **LUSTRO WRACA DECYZJĄ, NIE POMIAREM, i to nie unieważnia ADR-055.**
Tamten pomiar był rzetelny: wzorzec Proactiv naprawdę nie miał zebry
i nadal jej nie ma. Zmienił się mandat, nie fakt.

**TON.** Filary 1 i 2 zostają na klamrze grafitowej. Filar 3 → **ton 3**
(`rgb(235, 235, 239)`), filar 4 → **ton 2** (`rgb(255, 255, 255)`).
Wybór z tabeli ADR-069 §4 tak, by sąsiedzi się różnili: klamra · klamra ·
ton 3 · ton 2 · ton 3 (dzień). Role przemapowują się automatycznie przez
`data-ton` — `::marker` i link schodzą z limonki na `akcent-na-jasnym`,
bo limonka ma na jasnym 1,43:1 i tekstu nieść nie może.

## 5. Sekcja „pamięć" odbita

Polecenie właściciela: mockup na lewo, proza na prawo. **Trakty zamienione
miejscami (55 : 44), nie samo `order`** — przy siatce `44fr 55fr` samo
`order: -1` dałoby mockupowi 44, a prozie 55, czyli odwróciłoby także
szerokości. Odbicie ma zmienić stronę, nie miary. Kolejność w DOM bez zmian.

## 6. Pomiary przed / po — w jednym przebiegu, na dwóch serwerach

Stan bazy `b214adb` zbudowany w **osobnym drzewie roboczym** i serwowany
na porcie 3101, stan po zmianie na 3100 — obie strony mierzone tą samą
sondą, w tej samej dobie, tym samym kodem.

**Kontrola pozytywna rozdziału serwerów:** baza niesie `filar-1-pozyskiwanie`
(2 wystąpienia) i zero `15a-telefon-notes`, nagłówek z półpauzą; stan po
zmianie odwrotnie. Bez tej kontroli obie kolumny mogłyby pochodzić z tego
samego wydania.

| miara | przed (`b214adb`) | po | wzorzec |
| --- | --- | --- | --- |
| jasne piksele @1440 | 60,0 % | **60,9 %** | 70,9 % |
| jasne piksele @390 | 55,4 % | **59,6 %** | — |
| nakładka @1440 | 37,0 % | **35,3 %** | — |
| nakładka @390 | 40,3 % | **37,8 %** | — |
| wysokość dokumentu @1440 | 8 619 px | **8 233 px** | 7 406 px¹ |

¹ kolumna wzorca 7 900 px przeliczona ×0,9375 na kadr 1440.

**Wszystkie cztery miary poszły w stronę wzorca, bez korekty.**

## 7. Strażniki przeliczone razem ze zmianą

- `e2e/hero.spec.ts` — porównanie H1 po SŁOWACH: znacznik `<akcent>`
  i wymuszone łamanie zdejmowane po stronie messages, białe znaki
  normalizowane po obu. Zmiana jednej litery dalej daje czerwień.
- `e2e/parytet-ui.spec.ts` — to samo dla asercji parytetu.
- `e2e/zlozenie.spec.ts` — `Hero` dołączył do listy kluczy z akcentem
  (R-AKCENT-03).
- `e2e/filary.spec.ts` — wzór lustra **wypisany** (`filar1: false`,
  `filar2: true`, `filar3: false`, `filar4: true`), nie liczony
  z parzystości indeksu: parzystość zgadzałaby się sama także po
  dołożeniu piątego filaru i nikt by nie zauważył, że wpadł w lustro
  bez rozstrzygnięcia.
- `e2e/zrzuty-filarow.spec.ts` — druga ścieżka fotografii
  (`/obrazy/wzorzec-2026-09-06/`), lista **wypisana**, nie czerpana ze
  zbioru katalogów.

## 8. Zapadka deklaracji 3 → 2, z zapisem cichej pułapki

`Hero.naglowek` deklarował 62 znaki przy 58 faktycznych; nowy nagłówek ma
56 i deklaracja została przeliczona we wszystkich trzech językach (korekta
licznika obejmuje CAŁY plik).

⚠ **PO DRODZE POWSTAŁA CISZA UDAJĄCA NAPRAWĘ.** Pierwsza wersja zmiany
wcisnęła notatkę o zmianie **między nagłówek a jego deklarację**, przez co
licznik przestał je kojarzyć i pozycja zniknęła z listy naruszeń — wyglądało
to jak naprawa, a było **utratą pokrycia** (M-2, „cisza — nie zieleń").
Wychwycone przez odczyt pliku, nie przez bramkę: bramka pokazuje wtedy
dokładnie to samo, co przy naprawie prawdziwej.

## 9. Czego ten ADR NIE rozstrzyga

- Pozostałe sekcje strony — dzień, kafelki, wzrost, cennik, CTA (partia 2+).
- Brzmienia EN i DE klucza `Hero.ctaWtorne` — prowizoryczne, **T75**.
- Dwie pozostałe pozycje zapadki deklaracji (`Cennik.plany.starter.pozycja2`,
  `Obawy.p1`) — zastane, poza zakresem.
- Powrót zrzutu na ekran MacBooka — decyzja właściciela „na razie".
