# Manifest fali 2 (czerń + limonka) — osadzenie i rezerwa

Data: 2026-08-27. Zlecenie `WWW/051` (warunek „po KROKU 2" spełniony —
STOP z `WWW/060` odebrany). Rola: IMPLEMENTACJA.

Osiem kadrów zatwierdzonych imiennie przez właściciela. Rozstrzygnięcia
`WWW/052` (ADR-037) obowiązują: **twarze wyłącznie generowane**,
**dekoracja 3D bez czytelnego tekstu**.

---

## Werdykt 1:1 — jak był robiony

Zlecenie żąda oceny **w skali 1:1, nie z miniatur**. Metoda:
z każdego pliku wycięto **cztery kafle w rozdzielczości natywnej**
(500 × 297 px dla kadrów poziomych, 400 × 360 dla pionowych) z pasa,
w którym w grafice 3D siedzą panele, i obejrzano je bez skalowania.
Miejsce podejrzane o napis powiększono dodatkowo **×6 metodą
najbliższego sąsiada** — powiększenie służy ocenie czytelności
natywnych pikseli, nie udaje wyższej rozdzielczości.

**Próba rozstrzygająca ADR-037:** *czy odwiedzająca, patrząc na ten
obraz, mogłaby uznać, że tak wygląda aplikacja?* Granicą jest napis,
**który da się przeczytać**.

---

## Tabela — osiem kadrów

| kadr | przeznaczenie | wymiar źródła | AVIF | werdykt 1:1 |
| --- | --- | --- | ---: | --- |
| `hero-osoba-16x9` | **REZERWA** | 2048 × 1152 | 1600 × 900 · 114,3 kB | **twarz TAK** (generowana, zatwierdzona imiennie) · **tekst NIE** — telefon pokazany tyłem, ekran niewidoczny |
| `mockup-glowny-16x9` | **OSADZONY** — tło dekoracyjne hero, ≥ 90rem | 2752 × 1536 | 1600 × 893 · 69,2 kB | twarz NIE (tylko piktogramy sylwetek) · **tekst NIE** — panele mają zastępcze paski, wykresy nie mają liczb |
| `pion-moc-9x16` | **REZERWA** | 1536 × 2752 | 1200 × 2150 · 115,7 kB | twarz NIE · **tekst NIE** — paski zastępcze w panelu |
| `filar-pozysk-16x9` | **REZERWA** | 2752 × 1536 | 1600 × 893 · 95,3 kB | twarz NIE · **tekst NIE** — karty kontaktów z paskami zamiast napisów |
| `filar-tresci-16x9` | **REZERWA** | 2752 × 1536 | 1600 × 893 · 85,2 kB | twarz NIE · **tekst NIE** — dokument z paskami, glif tarczy |
| `filar-zespol-16x9` | **REZERWA** | 2752 × 1536 | 1600 × 893 · 56,2 kB | twarz NIE · **tekst NIE** — schodki i piktogramy osób |
| `filar-wyniki-16x9` | **REZERWA** | ⚠ **nieznany** | 1600 × 893 · 96,3 kB | twarz NIE · **tekst NIECZYTELNY** — patrz uwaga niżej |
| `pion-plan-9x16` | **REZERWA** | 1536 × 2752 | 1200 × 2150 · 107,4 kB | twarz NIE · **tekst NIE** — glify kalendarza i dokumentu |

**Wszystkie osiem mieści się w limicie 120 kB na plik.**

### ⚠ `filar-wyniki-16x9` — jedyny kadr ze śladem tekstopodobnym

W górnym pasie kadru stoi ciemny panel z **liniami przypominającymi
tekst**. Powiększenie ×6 pikseli natywnych pokazuje, że **nie składają
się w żadne słowo** — to smugi o kształcie glifów, przy 1:1 czytane
jako faktura.

**Werdykt: warstwa (b), dekoracja.** Granica z ADR-037 mówi o napisie,
**który da się przeczytać**; tego przeczytać się nie da ani przy 1:1,
ani przy sześciokrotnym powiększeniu. Zapisuję to jako **przypadek
najbliższy granicy** z całej fali — gdyby kadr miał kiedyś wejść
w miejsce sąsiadujące ze zrzutem produktu, ta ocena wymaga powtórzenia.

---

## Sumy kontrolne

| kadr | SHA-256 źródła (PNG) | SHA-256 AVIF |
| --- | --- | --- |
| `hero-osoba-16x9` | `ebe60b7decc40909956f4ca1f8d6340d156dff02f437f11bbca75c35b9ab7001` | `7441fe026f9e117dd2a2d533076f9f702f573b749b83f9badc5eb3389c5699d3` |
| `mockup-glowny-16x9` | `9fd067f96ce17b7422e3f04f3c9e34d01f5fc2e628195f8413c9412f8d09f6ce` | `1bdc4b125858919274b078d8b426658f61c71c90a65d8cf234921f4c807d8ff4` |
| `pion-moc-9x16` | `69d0b3cb642ea1abd456e2d10228ecb45526555ced735f01cb380484cedcfe91` | `93f41bbd0c2aa0d25c3084d73affa0fa8af9ab998604ae9c9b1fb56f8026447b` |
| `filar-pozysk-16x9` | `2ed54583b69a17039d90aff89460d47d0c53932351b9d81496cc023eacae0711` | `38c1077b71faf8db37e234f4371632933f15a759a9da8219a6ccc9e417438690` |
| `filar-tresci-16x9` | `8e2b7f400af149aebd17c815edf35f0a5cbcfd9426c0d35edf6eb7af0077e581` | `bed5b97126b3cf82f40454b60e011ba3fff8e76c89b22206d40109299ac5442c` |
| `filar-zespol-16x9` | `bdb41f0998aa4ed29f0a424a9fd4151767e51e8d03f2eb1d1c2df0bcc37ce822` | `108560d79ae5f58e18bd14bb655ade1c4afd135af993464e63050077fc2ca244` |
| `filar-wyniki-16x9` | ⚠ **NIE POLICZONA** — patrz niżej | `3737ffb7e198a21be4907caa894cd2dc91228f1ae4ce179ea32fb5d85fe20ed1` |
| `pion-plan-9x16` | `8d936ae4b8d146fd1a8121e0e106f0524a993dab9fd11bfec8b5f00fe97e042e` | `3de941df8ff7d2f1d6b93f56a36e73d340ad8c18b8bb09153e958f775e2b46fc` |

### Dlaczego jednej sumy źródła nie ma

`filar-wyniki-16x9` — obiekt w CDN zwraca **HTTP 403 `AccessDenied`**
(ciało XML zamiast PNG). Sprawdzone **trzy razy z rzędu**, z **kontrolą
pozytywną w tym samym przebiegu**: `hero-osoba` z tego samego katalogu
zwraca w tej samej minucie **200**. To nie jest awaria sieci ani wada
metody — ten jeden obiekt jest niedostępny.

**Nie wpisuję tu sumy, której nie policzyłem.** Suma AVIF-a jest
policzona i wystarcza do stwierdzenia, że plik w rezerwie się nie
zmienił; brakuje jedynie ogniwa do oryginału. Kadr **nie jest osadzony**,
więc luka nie dotyczy niczego, co dziś publikujemy.

---

## Adnotacja AI

**Wszystkie osiem kadrów jest wygenerowanych maszynowo** (Higgsfield,
26.08.2026). Żaden nie jest fotografią realnej osoby ani zrzutem
działającej aplikacji.

`hero-osoba-16x9` przedstawia **osobę nieistniejącą**. Zgodnie
z ADR-037 kadr z twarzą wymaga zatwierdzenia **imiennego, per kadr** —
i takie ma. Granica, której ta zgoda nie przesuwa: **zdjęcia realnych
osób pozostają zakazem bezwzględnym**, bo wizerunek realnej osoby to
dane osobowe i zgoda, a kadr generowany nie ma podmiotu, który mógłby
jej nie wyrazić.

---

## Sloty — dlaczego siedem kadrów czeka w rezerwie

Zasada nadrzędna ze zlecenia: **układ wzorca nie zmienia się pod
obrazy** — kadr wchodzi tylko tam, gdzie układ ma miejsce. Zajętość
każdego slotu sprawdzono **przed** osadzeniem (klasa nazwana
2026-08-26: „zlecenie dysponujące slotem bez pomiaru jego zawartości").

| kadr | co sprawdzono | wynik |
| --- | --- | --- |
| `hero-osoba` | czy sekcja przy FAQ/finale ma slot obrazu | `DbanieOSiebie`, `Zamkniecie`, `Faq`, `SekcjaRytmu`, `SekcjaTekstowa` — **zero `<picture>`/`<img>` w każdej**. Zlecenie zabrania tworzyć sekcję → **rezerwa** |
| `filar-*` ×4 | ile slotów obrazu ma sekcja filaru | **jeden**, zajęty przez zrzut Z6. Zlecenie: „jeśli slot jest pojedynczy, Z6 zostaje" → **rezerwa ×4** |
| `pion-moc`, `pion-plan` | czy układ ma sloty pionowe/mobilne | **nie ma żadnego** → **rezerwa** |
| `mockup-glowny` | czy hero ma miejsce na warstwę dekoracyjną | **ma** — POMIAR 0.7 wykazał, że wzorzec trzyma tam drugi obraz **wyłącznie na desktopie** → **OSADZONY** |

Nic nie przepada: siedem kadrów leży w `public/obrazy/rezerwa/`
i czeka na podstrony (etap 2).

---

## Osadzenie `mockup-glowny-16x9` — co zrobiono i co poprawiono po obejrzeniu

Warstwa dekoracyjna hero, **wyłącznie od 90rem**, `aria-hidden` przez
konstrukcję (tło CSS, nie element), bez podpisu.

**Tło w CSS, nie `<img>`** — dzięki temu przeglądarka **nie pobiera
pliku** na kadrach, na których reguła nie obowiązuje. Element pusty
z `alt=""` pobierałby go zawsze. Sprawdzone pomiarem: przy 1600 i 1440
plik jest w żądaniach, przy 1280 i 390 **nie ma go wcale**.

### Pierwsza wersja gryzła się i została przestawiona

Pierwsza wersja rozciągała tło od górnej krawędzi sekcji przez 34rem
przy kryciu **0,5**. Zrzut pokazał **dwie szkody naraz**:

1. panele stały **za leadem i CTA**, obniżając czytelność;
2. stały **tuż nad prawdziwym zrzutem Z6** — dekoracja i dowód produktu
   zlewały się w jedną kompozycję.

Druga jest poważniejsza: to **zacieranie rozdziału warstw (a) i (b)**,
którego pilnuje ADR-037 — wada zasady, nie estetyki.

Po przestawieniu warstwa **zaczyna się dopiero nad zrzutem**, tekstu nie
dotyka, krycie zeszło z 0,5 na **0,22**, a maska wygasza ją ku dołowi,
żeby nie tworzyła krawędzi na styku ze zrzutem.

### Waga — zmierzona z kontrolą w tym samym przebiegu

| kadr | bez kadru fali 2 | z kadrem | różnica |
| --- | ---: | ---: | ---: |
| 1440 px | 513,7 kB | 582,8 kB | **+69,1 kB** |
| 390 px | 472,9 kB | 472,9 kB | **+0 kB** |

Kontrolą jest **zablokowanie żądania** w tym samym przebiegu i tym samym
kadrze — nie porównanie dwóch budowań. Różnica przy 1440 równa się
rozmiarowi pliku (69,2 kB) co do dziesiątej; zero przy 390 potwierdza
pomiarem, że media query naprawdę wstrzymuje pobranie.

---

## Stan bramek po osadzeniu

Pełny e2e **672 passed / 4 skipped / 0 failed**; `tokeny`, `liczby`,
`parytet`, `linki`, `kotwice`, `nojs`, `deklaracje` — zielone.

**Altów ×3 nie dopisano i jest to poprawne, nie pominięte:** osadzony
kadr jest **dekoracją bez roli informacyjnej** (tło CSS, `aria-hidden`
przez konstrukcję), a tekst alternatywny opisuje treść, nie fakturę.
Alty będą potrzebne dopiero dla kadrów, które wejdą jako `<img>`
niosący informację — czyli przy podstronach.
