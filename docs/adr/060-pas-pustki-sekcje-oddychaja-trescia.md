# ADR-060: Pas pustki — sekcje oddychają treścią, nie próżnią

Data: 2026-09-04. Status: **PRZYJĘTY** (zlecenie `WWW/085`, kroki 1–2).

Batch domykający „życie bez zdjęć" z ADR-059: sloty już się zwijały, ale
**minima i rezerwy trzymały pustkę po nich**.

---

## Rozstrzygnięcie 1 — minimum hero obowiązuje TYLKO ze slotem niosącym obraz

Proporcje 1,78× i 1,33× viewportu pochodzą z pomiaru wzorca (ADR-052)
i opisują hero, **w którym coś jest** — tam dolną połowę zajmuje kadr.
U nas kadru nie ma, więc minimum trzymało **próżnię**:

| kadr | sekcja | treść | **pustka** |
| --- | --- | --- | --- |
| 1190 | 1600 px | 394 px | **1206 px** |
| 1440 | 1600 px | 567 px | 1033 px |
| 390 | 1120 px | 571 px | 549 px |

Warunek `:has(.kadr:empty)` pyta o **ten sam fakt** co `:empty` przy
samym slocie, więc oba wchodzą i schodzą razem. W dniu, w którym kadr
wejdzie, **minimum wraca samo** i proporcja wzorca znowu obowiązuje.

| kadr | hero przed | hero po | pustka po |
| --- | --- | --- | --- |
| 1190 | 1600 | **578** | **184** |
| 1440 | 1600 | **751** | **184** |
| 390 | 1120 | **675** | **104** |

## Rozstrzygnięcie 2 — slot ikony zwija się jak slot foto

Pudełko 64 × 64 z odstępem 16 px trzymało **80 px pustego miejsca
w każdej karcie**. Reguła `:empty` z ADR-059 rozciągnięta na ikony;
mechanika zostaje nietknięta.

| | przed | po |
| --- | --- | --- |
| wysokość karty | 222 px | **142 px** |
| sekcja kart (1190) | 890 | **650** |
| sekcja kart (390) | 1652 | **1172** |

## Rozstrzygnięcie 3 — kolumny rytmu dnia i zdanie zamykające na jednej krawędzi

Zmierzone przed: kropka **x = 83**, pierwszy krok **x = 20** przy 1190 —
**Δx = 63**; przy 1440 Δx = **128**. Zdanie zamykające dryfowało w prawo
od kolumn własnej sekcji.

⚠ **Naprawa idzie w drugą stronę, niż podpowiada odruch.** Zamiast
rozsuwać kropkę do szerokości kroków — **zwężamy kroki do miary
nagłówka**. Rozsunięcie kropki złamałoby lustro L1 (S3 i S10 muszą stać
w tej samej kolumnie, pilnuje tego `zlozenie.spec.ts`); zwężenie kroków
nie łamie nic, bo obie sekcje mają odtąd tę samą miarę wnętrza.

| kadr | Δx kropka ↔ kolumny | lustro S3/S10 |
| --- | --- | --- |
| 1190 | **63 → 0** | Δ 0 |
| 1440 | **128 → 0** | Δ 0 |
| 390 | 0 → 0 | Δ 0 |

## Rozstrzygnięcie 4 — szczelina nad pigułką: DWA POMIARY, DWA USTALENIA

Pigułka stoi 16 px od krawędzi kadru i przez ten pas przewijała się
treść. Prześwit przez samą pigułkę zamknęła alfa 0,92 (ADR-059), ale nad
nią zostawał **szczelinowy podgląd**, którego żadna alfa nie dotyczy.

### ⚠ Pierwsza próba nie zadziałała — i przyczyna jest pouczająca

Reguła stanęła przy pigułce jako jej `::before` z `position: fixed`.
**Nie zadziałała, bo pigułka ma `backdrop-filter`, a ten — tak jak
`filter` i `transform` — czyni element BLOKIEM ZAWIERAJĄCYM dla potomków
`position: fixed`.** Pseudoelement wylądował **wewnątrz** paska, nie nad
nim. Reguła mieszka teraz na `body::before`; `body` żadnego filtra nie ma.

### ⚠ Sondy hit-testowej TU UŻYĆ SIĘ NIE DA — i to też jest ustalenie

`elementFromPoint` **nigdy nie zwraca pseudoelementów**, a przy
`pointer-events: none` przechodzi przez nie w całości. Pierwszy pomiar
meldował więc treść pod szczeliną **niezależnie od tego, czy pas jest
zamalowany** — narzędzie odpowiadało na inne pytanie, niż zadałem.

**Dowód rozstrzygający idzie PIKSELAMI:** zrzut pasa 0–16 px robiony nad
sekcją **ciemną** i nad sekcją **jasną**; jeśli pas jest zamalowany
barwą strony, oba bufory są identyczne co do bajtu.

| | bajtów (ciemno) | bajtów (jasno) | identyczne |
| --- | --- | --- | --- |
| przed | 190 | **395** | **NIE** |
| po | 190 | **190** | **TAK** |

## Rozstrzygnięcie 5 — dbanie o siebie: zwarty skład, zero nowej treści

Sekcja niesie jedno zdanie; po zwinięciu kadru zostawało ono samotną
linią prozy. Zdanie dostaje **głos wyróżnienia** — ten sam duet, którym
mówią kropki luster i zdanie prowadzące filaru — więc czyta się jak
domknięcie rytmu, a nie jak zabłąkany akapit. **Zero nowej treści:**
zmienia się wyłącznie kompozycja i głos.

⚠ `composes` **nie działa na selektorze potomka** — CSS Modules przyjmuje
je tylko na pojedynczej klasie lokalnej. Stąd osobna klasa na akapicie:
jedno źródło duetu zostaje zachowane, a reguła stoi tam, gdzie wolno.

## Rozstrzygnięcie 6 — rytm CTA, marquee i stopki: ZMIERZONE, ZGODNE

Zlecenie kazało sprawdzić, czy rama końcowa nie trzyma wymuszonych
minimów. **Nie trzyma** — wszystkie sekcje mają `min-height: 0`, a odstępy
leżą na drabinie:

| sekcja | wypełnienie (1190 / 390) | `min-height` |
| --- | --- | --- |
| zamknięcie | 160/160 · 80/80 | **0** |
| stopka | 160/80 · 80/80 | **0** |
| pas możliwości | 160/0 · 80/0, wysokość 216 / 136 | **0** |

Pustka przy zamknięciu (320 px na kadrze szerokim) to **suma dwóch
rytmów sekcji**, nie minimum — a rytm 160 pochodzi z pomiaru wzorca
i decyzji ADR-056. Wrażenie „pełnego ekranu czerni" brało się z hero
stojącego wyżej; po zdjęciu jego minimum strona skróciła się o ponad
tysiąc pikseli.

## Podróże i wysokości

| | przed | po | różnica |
| --- | --- | --- | --- |
| strona (1190) | 9 111 | **7 892** | **−1 219** |
| strona (1440) | 8 962 | **7 996** | −966 |
| strona (390) | 10 106 | **9 239** | −867 |
| ekranów (390) | 11,97 | **10,95** | −1,02 |
| ból SAMA | 1,98 | **1,45** | −0,53 |
| ból LIDERKA | 6,53 | **5,43** | −1,10 |
| ból STRUKTURA | 1,33 | **0,80** | −0,53 |
| największa luka | 3,91 | **3,34** | −0,57 |

**Wszystkie trzy bóle bliżej, luka krótsza** — pierwszy batch w tej
serii, w którym poprawiły się jednocześnie wszystkie cztery liczby.

## ⚠ SPROSTOWANIE POMIARU PODRÓŻY Z POPRZEDNICH ZWROTEK

Sonda podróży miała wpisany adres **portu 3000**, a od `WWW/082` cała
reszta pomiarów szła na **3100**. Liczby podróży w zwrotkach `WWW/082`–
`WWW/084` pochodzą więc z **serwera deweloperskiego**, nie z budowania
produkcyjnego — z tych samych źródeł, ale w innym trybie.

Wykryte, gdy sonda zwróciła „strona 844 px, wszystkie bóle `None`":
serwer na 3000 oddawał wtedy 500, bo `rm -rf .next` zabrał budowanie,
z którego korzysta także `next dev`. **Zero, które nie miało sensu,
okazało się sygnałem o adresie.** Sonda pyta odtąd o 3100, tak jak
reszta pomiarów; liczby powyżej są z jednego źródła.

⚠ **Skutek uboczny wart zgłoszenia:** to samo `rm -rf .next` **położyło
serwer deweloperski właściciela** — działał, ale oddawał 500. Serwer
został zidentyfikowany, zatrzymany i postawiony na nowo; odpowiada 200.

## Pomiary domykające

| | wynik |
| --- | --- |
| pełny zestaw e2e (4 projekty) | **1376 passed · 12 skipped · 0 failed** |
| axe (4 projekty) | **120 passed** |
| bramki statyczne | wszystkie ZIELONE (30 ról) |
| ESLint | 1 ostrzeżenie zastane, zero nowych |
| **LCP @1190** | **32 ms** we wszystkich pięciu przebiegach |
| lustro L1 | Δ 0 na wszystkich trzech kadrach |
| szczelina nad pigułką | pas identyczny co do bajtu nad ciemnym i jasnym |

## Czego ten ADR NIE rozstrzyga

- **Pustki przy zamknięciu** (320 px) — to suma dwóch rytmów, nie
  minimum; zmiana wymagałaby cofnięcia pomiaru z ADR-056.
- **Sekcji obaw** — sonda liczyła jej treść na 1 px, bo nie pytała
  o `summary`; to ślepota sondy, nie pustka sekcji. Nie działałem na tej
  liczbie.
- **Wagi nagłówków** i **pozycji T58** — bez zmian.
