# Manifest bitmap wzorca — dostawa 2026-09-06

Zlecenie: `WWW/093/2`. Źródło tabeli: **akcept właściciela z 06.09.2026**;
sumy w kolumnie „suma z tabeli” to **pomiar koordynatora na plikach
właściciela** — służą jako dowód tożsamości pobrania, nie jako pomiar własny.

⚠ **TWARZE — WARUNEK KANONU SPRAWDZONY, NIE ZAŁOŻONY.** `CLAUDE.md` dopuszcza
twarze **wyłącznie generowane** i **zatwierdzone imiennie przez właściciela,
per kadr**. Oba warunki są tu spełnione: kadry pochodzą z generatora
(Higgsfield), a tabela dostawy niesie akcept właściciela z 06.09. Kadry 1, 4,
5 i 6 pokazują twarze; kadry 2a–2d, 3, 7 i 8 nie pokazują żadnej.

⚠ **ORYGINAŁY PNG NIE WCHODZĄ DO REPOZYTORIUM** — praktyka zmierzona, nie
wymyślona: repozytorium **nie ma `.gitattributes`** (czyli nie używa LFS) ani
wpisu obrazowego w `.gitignore`, a ADR-061 zapisał wprost, że PNG-i źródłowe
zostają poza historią, a wchodzi pojedynczy AVIF. Sumy PNG poniżej są jedynym
śladem oryginałów po tej stronie.

## Kadry na stronę → `public/obrazy/wzorzec-2026-09-06/`

| nr | nazwa | suma z tabeli | suma pobranego (16) | zgodność | wymiar źródła | AVIF | waga | przeznaczenie |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | bohaterka | `6c42cbf773ae3ece` | `6c42cbf773ae3ece` | **OK** | 1856×2304 | 1200 px | 53 kB | hero, kolumna prawa |
| 2a | iphone-poch-L | `d8a8e18874501fe7` | `d8a8e18874501fe7` | **OK** | 1856×2304 | 900 px | 8 kB | rezerwa |
| 2b | iphone-poch-P | `523c333c63540c90` | `523c333c63540c90` | **OK** | 1856×2304 | 900 px | 8 kB | rezerwa |
| 2c | iphone-L | `c91bc25be7457f74` | `c91bc25be7457f74` | **OK** | 1856×2304 | 900 px | 5 kB | hero, duży telefon |
| 2d | iphone-P | `7715b09fc248c73a` | `7715b09fc248c73a` | **OK** | 1856×2304 | 900 px | 5 kB | rezerwa |
| 3 | macbook-iphone | `f26a5713edd517ce` | `f26a5713edd517ce` | **OK** | 2400×1792 | 1600 px | 7 kB | sekcja „pamięć” |
| 4 | rano | `e4c4a72cd678095d` | `e4c4a72cd678095d` | **OK** | 2528×1696 | 1200 px | 25 kB | dzień — rano |
| 5 | w-ciagu-dnia | `7161fa60745822a9` | `7161fa60745822a9` | **OK** | 2528×1696 | 1200 px | 48 kB | dzień — w ciągu dnia (WARUNKOWO) |
| 6 | wieczorem | `a0e66276210cd195` | `a0e66276210cd195` | **OK** | 2528×1696 | 1200 px | 41 kB | dzień — wieczorem |

## Wzory rysunkowe → `design/obrazy-robocze/wzorzec-2026-09-06/`

| nr | nazwa | suma z tabeli | suma pobranego (16) | zgodność | wymiar źródła | przeznaczenie |
| --- | --- | --- | --- | --- | --- | --- |
| 7 | ikony | `29f08630d9bb251a` | `29f08630d9bb251a` | **OK** | 2048×2048 | wzór do sześciu ikon SVG |
| 8 | wrapped | `cf2f6ebb12e35303` | `cf2f6ebb12e35303` | **OK** | 2400×1792 | wzór do karty Wrapped SVG |

⚠ Wzory 7 i 8 **zostają w repozytorium jako PNG**, bo są materiałem
RYSUNKOWYM — z nich przerysowuje się SVG. Ta sama rola co zrzuty `z6`
w `design/obrazy-robocze/`. Przeskalowane do 1024 i 1200 px, żeby ważyły tyle
co tamte (59 kB i 343 kB wobec 279 kB i 2 500 kB w oryginale); sumy oryginałów
w kolumnie wyżej.

## Narożniki ekranów — zmierzone z plików, nie z oka

Reguła: ekran = spójny obszar niemal czystej bieli (każdy kanał > 246);
narożniki jako punkty skrajne w osiach `x+y` i `x−y`. Współrzędne w pikselach
**pliku źródłowego**, nie kadru renderowanego.

| plik | ekran | lewy górny | prawy górny | prawy dolny | lewy dolny |
| --- | --- | --- | --- | --- | --- |
| 2c-iphone-L | telefon | [676, 271] | [1243, 332] | [1250, 1999] | [675, 2001] |
| 3-macbook-iphone | MacBook | [526, 452] | [1835, 452] | [1645, 1268] | [519, 1268] |
| 3-macbook-iphone | iPhone | [1681, 662] | [1973, 666] | [1976, 1344] | [1674, 1345] |

⚠ **NARÓŻNIK PRAWY DOLNY EKRANU MacBOOKA JEST PRZESŁONIĘTY** i dlatego wypada
na `x ≈ 1645` zamiast `≈ 1835`: telefon stoi przed prawym dolnym rogiem ekranu,
więc metoda punktu skrajnego trafia w krawędź przesłonięcia, nie w róg. Prawdziwy
prostokąt ekranu to `x 519–1835 · y 450–1268`. Zapisuję to zamiast poprawiać
liczbę po cichu — kto policzy homografię z surowego narożnika, dostanie skos.

## Czego ten manifest NIE rozstrzyga

- **Kadr 5** (`w-ciagu-dnia`) jest **WARUNKOWY i nieosadzony**: pokazuje laptop
  z pulpitem i wykresem, czyli obraz, o którym odwiedzająca może pomyśleć, że
  „tak wygląda aplikacja”. Kanon rozstrzyga to pytaniem wprost i wymaga wtedy
  zrzutu z Playwrighta. Decyzja właściciela otwarta; plik pobrany i zoptymalizowany.
- **Ekrany telefonów** zostają puste — decyzja A/C otwarta, a kadr desktopowy
  2048×1280 nie wchodzi w ekran pionowy (zakaz zlecenia i sens kanonu: kadr jest
  dowodem, nie mockupem).

## Złożenie ekranu MacBooka (ADR-067, zlecenie `WWW/094` krok 2)

| plik | powstał z | wymiar | waga | SHA-256 (16) |
| --- | --- | --- | --- | --- |
| `3-macbook-iphone-ekran.avif` | `3-macbook-iphone.avif` + `public/obrazy/aplikacja/z6-filar-1-dmo.png` | 1600 × 1195 | 18 kB | `5a3da96fdc4bc8e9` |

**Plik źródłowy zostaje nietknięty** — złożenie jest osobnym plikiem, więc
suma `f26a5713edd517ce` z tabeli wyżej dalej opisuje to, co zostało pobrane.
Gdyby złożenie nadpisywało oryginał, manifest twierdziłby o nim coś, co
przestało być prawdą, i nikt nie miałby jak tego zauważyć.

**Metoda — maska bieli, nie prostokąt.** Zrzut wchodzi w prostokąt ekranu
`x 519–1835 · y 450–1268` (współrzędne źródła 2400 × 1792, po przeskalowaniu
×0,6667 na 1600 → `x 346 · y 300 · 877 × 545`), ale **tylko tam, gdzie
oryginał jest niemal czystą bielą** (każdy kanał > 235). Powód jest widoczny
w samym obrazie: telefon stoi PRZED prawym dolnym rogiem ekranu laptopa, więc
wklejenie pełnego prostokąta przykryłoby telefon. Maska pokryła **89,2 %**
prostokąta.

**Ekran telefonu wykluczony z maski** — `42 312 px` wyciętych po narożnikach
telefonu z tabeli wyżej. Ekran telefonu jest tak samo biały jak ekran
laptopa, więc sama próba bieli zaliczyłaby go do maski i zrzut odłożyłby się
także na nim. Zlecenie żąda ekranu telefonu **pustego** (decyzja właściciela
[A/C] nie zapadła), a kanon zakazuje wciskania kadru desktopowego 2048 × 1280
w ekran pionowy: kadr jest dowodem, nie mockupem.

**Rozdział warstw kanonu jest tu widoczny w jednym pliku.** Obudowa laptopa
i telefonu to warstwa **(b)**, dekoracja — render z manifestu. Zrzut na
ekranie to warstwa **(a)**, dowód — kadr Playwrighta z bazy efemerycznej
`catherly_zrzuty`, konto `demo@fboos.local`, commit aplikacji
`e35ad8ceefbed065d196c0342891f9f1fe56d2bd`, raport pochodzenia
w `design/obrazy-robocze/z6/RAPORT-POCHODZENIA-e35ad8ce.md`. Warstwa (a) nie
jest tu bajt w bajt, bo została przeskalowana do prostokąta ekranu — to ta
sama operacja, którą wykonuje pipeline wariantów, i dlatego suma złożenia
stoi w tabeli wyżej.

**Kontrola pozytywna prostokąta, w tym samym przebiegu.** Sonda mierząca
średnie kanałów w prostokącie ekranu dała najpierw **tę samą liczbę** dla
ekranu i dla pasa obok niego — bo `sharp().stats()` czyta wejście, nie potok.
Dwie identyczne liczby przy dwóch różnych obszarach ujawniły ślepotę sondy.
Po przepuszczeniu przez bufor: ekran **250,2 · 250,2 · 250,2**, pas obok
**243,1 · 242,2 · 238,0**, środek ekranu **254,3 · 254,3 · 254,3**. Dopiero
rozdzielone liczby dowodzą, że prostokąt trafia w ekran.

## Wzorzec v2 (zlecenie `WWW/097/2`, KROK 0)

| plik | źródło | wymiar | SHA-256 | status |
| --- | --- | --- | --- | --- |
| `design/wzorzec/glowna-v2-2026-09-06.png` | zrzut od właściciela, „Zrzut ekranu 2026-09-6 o 21.30.37.png" | 906 × 902 | `450f61a4b51eda277d14a836d5aeff4f4bb43e1cac1f048142413d8f7ee86d70` | **wzorzec v2, zrzut, proporcje wiążące, piksele nie** |

**Tożsamość sprawdzona przed zapisem**, nie po: suma i wymiar podane w zleceniu
zgodziły się co do znaku (prefiks `450f61a4b51eda27`, 906 × 902). Plik skopiowany
bez przekodowania — suma po kopii jest ta sama.

⚠ **PROPORCJE WIĄŻĄCE, PIKSELE NIE.** v2 jest zrzutem o szerokości 906 px, a nie
renderem przy znanej szerokości okna. Wolno z niego odczytywać wszystko, co jest
**ułamkiem szerokości**: wysokości sekcji, bboxy, szerokości kolumn, wcięcia,
odstępy, proporcje wewnątrz elementów. Nie wolno odczytywać wartości
bezwzględnych w pikselach — to ta sama granica, którą v1 ma zapisaną jako **T66**.

⚠ **v1 ZOSTAJE I NIE JEST BŁĘDNA.** `design/wzorzec-2026-09-06/glowna.png`
(1536 × 2752) to **kolaż dwukolumnowy**: pas górny 1536 px niesie nawigację
i hero, a wszystko poniżej stoi w dwóch kolumnach po 768. v2 jest **jedną
kolumną 906 px bez nawigacji**. Dlatego liczby zmierzone na v1 i na v2 nie
przekładają się wprost — i dlatego pomiar w `WWW/097` rozjechał się z pasmem
koordynatora o 1,6–14,2 pp na ośmiu pozycjach. **To nie był błąd żadnej ze
stron: obie mierzyły rzetelnie, na dwóch różnych plikach.** Po podstawieniu v2
te same pozycje schodzą do 0,0–1,4 pp.

⚠ **DWA KATALOGI WZORCA — zgłaszam, nie rozstrzygam.** v1 leży w
`design/wzorzec-2026-09-06/`, v2 — zgodnie z literą zlecenia — w
`design/wzorzec/`. To dwa miejsca na tę samą rzecz; scalenie jest jedną
operacją, ale nie należy do wykonawcy.
