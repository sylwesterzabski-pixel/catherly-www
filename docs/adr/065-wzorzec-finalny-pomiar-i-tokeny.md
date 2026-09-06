# ADR-065: Wzorzec finalny — pomiar z pikseli i tokeny

Data: 2026-09-06. Status: **PRZYJĘTY W CZĘŚCI** (zlecenie `WWW/090`,
kroki 0–2 wykonane, **krok 3 NIE WYKONANY** — patrz §7).

Wzorzec: `design/wzorzec-2026-09-06/glowna.png`, **1536 × 2752 px**,
SHA-256 `daa34f99af01a9a00c5c1038ae014be7a73ef4921681ef76d02ce26582aded8d`.
Decyzja właściciela z 06.09 anuluje wszystkie wcześniejsze wersje `WWW/090`.

---

## 1. ⚠ WZORZEC JEST KOLAŻEM DWUKOLUMNOWYM — I TO ZMIENIA, CO WOLNO Z NIEGO ODCZYTAĆ

Obraz nie jest zrzutem strony. Jest **złożeniem**: pas górny (nawigacja,
hero, sekcja „pamięć") zajmuje pełne 1536 px, a wszystko poniżej stoi
w **dwóch kolumnach po 768 px**.

**Dowód rozstrzygający, nie wrażenie:** stopka zajmuje prostokąt
`x 769–1536, y 2680–2752` — czyli **prawą połowę obrazu**. Stopka
zajmująca połowę szerokości strony nie jest możliwa; to koniec prawej
kolumny kolażu.

**Dowód drugi, niezależny:** proza ma w obu obszarach **różny udział
w szerokości kontenera** — 30–31 px odstępu wierszy przy kontenerze 1536
(1,99 %) wobec 22–26 px przy kontenerze 768 (2,86–3,26 %). Gdyby to była
jedna strona w jednej skali, udział byłby ten sam. To dwa różne kadry
responsywne złożone w jeden obraz.

### Co z tego wynika dla pomiaru

| wielkość | przenośna? | dlaczego |
| --- | --- | --- |
| **barwy** | **TAK** | niezależne od skali i układu |
| **proporcje wewnątrz elementu** | **TAK** | odstęp kart, stosunek boków, promień jako % boku |
| **wcięcia jako % kontenera** | **TAK** | zgodne w obu obszarach (8,5 % i 8,9 %) |
| **rozmiary pisma w px** | **NIE** | dwa różne kontenery, nie wiadomo, który odpowiada 1440 |
| **absolutna szerokość kontenera** | **NIE** | j.w. |

⚠ **Tego ograniczenia nie da się obejść pracowitością** — nie ma w obrazie
informacji, przy jakiej szerokości okna renderowano górny pas. Każda liczba
typograficzna w px poniżej jest **przeliczeniem przy założeniu, że pas górny
odpowiada 1440**, i jest tak oznaczona.

## 2. KROK 1 — barwy (mediana z kwadratu 9 × 9 px, potwierdzona dominantą wiersza)

| rola wzorca | wartość | ile miejsc | rozrzut |
| --- | --- | --- | --- |
| **grafit klamr** | **`#2e2f31`** | 6 (pasek ×2, karta filaru, blok wzrostu, stopka) | jeden stopień na kanał |
| **tło strony** | **`#f5f5f7`** | 4 | `#f4f4f6`–`#f6f6f8` |
| **tło karty / kafelka** | **`#ffffff`** | 4 | — |
| **kreska** | **`#dadbdd`, 1 px** | 3 profile w poprzek krawędzi | brak |
| **tekst mocny** | **`#0f0f0f`** | 3 (H1, H2, proza) | `#0d0d0d`–`#101010` |
| **limonka** | **`#bee741`** | 3 czyste próbki | `#b9e341`–`#c3e944` |
| **tekst na limonce** | near-black | 1 | percentyl zaniżony antyaliasem |
| **tekst jasny na graficie** | `#fcfdfd` ≈ biel | 3 | — |

⚠ **Tekstu PRZYGASZONEGO na jasnym wzorzec nie ma.** Linia zaufania pod CTA
zmierzona jako `#222222`–`#2d2d2d`, czyli prawie czarna — nie jest to rola
przygaszona. Nasza `tekst-2-na-jasnym` nie ma we wzorcu odpowiednika i
zostaje bez zmian.

## 3. KROK 1 — geometria

| | wartość | reguła pomiaru |
| --- | --- | --- |
| pasek nawigacji | **1536 × 117**, na całą szerokość | etykietowanie maski grafitu |
| pigułka „Logowanie" | **155 × 58** | j.w. |
| CTA hero | **238 × 60**, promień **12 px** | cofanie krawędzi w narożniku |
| trzy karty filarów | **218 × 263**, odstęp **16 px** | 3 × 218 + 2 × 16 = **686** = kontener, co do piksela |
| sześć kafelków | **210 szer.**, odstęp **15 px**, 3 w rzędzie | skan przejść w poprzek rzędu |
| promień karty grafitowej | **10–11 px** | dwa niezależne kształty |
| stopka | promień **1 px** (prostokąt) | j.w. |
| **wcięcie boczne** | **8,5 % kontenera** (pas górny) · **8,9 %** (kolumny) | krawędź treści wobec krawędzi kontenera |
| kontener treści | **89,3–89,7 % szerokości** | 686/768 i 689/768 |

**Proporcje sekcji (wys./szer. kontenera):** nawigacja 0,076 · hero **0,419**
· „pamięć" 0,182 · trzy karty 0,342 · kafelki 0,339 · bloki dnia 0,326 ·
cennik 0,443 · wzrost 0,509.

## 4. KROK 1 — typografia (przy założeniu z §1)

Miarą jest **odstęp wierszy**, nie wysokość tuszu: tusz zależy od tego, czy
w wierszu trafi się wydłużenie górne albo znak diakrytyczny, i waha się
o kilkanaście procent między wierszami tego samego akapitu (zmierzone: 50 px
i 32 px w dwóch wierszach tego samego H2).

| | wzorzec (px) | % kontenera | przy 1440 |
| --- | --- | --- | --- |
| H1 — odstęp wierszy | 74 | 4,82 % | **69 px** |
| H2 — odstęp wierszy | 59 | 3,84 % | **55 px** |
| lead — odstęp wierszy | 32 | 2,08 % | **30 px** |
| proza — odstęp wierszy | 30,5 | 1,99 % | **29 px** |

⚠ **STOSUNEK H2 : H1 WYNOSI 0,80, U NAS 0,50** — i to jest różnica
konstrukcyjna, nie skalowanie. Nagłówek sekcji wzorca jest niemal tak duży
jak nagłówek strony. **Nie przenoszę tego w kroku 2**, bo skala nagłówków ma
własny ADR (044) i trzy progi kadrów; zmiana wymaga osobnego przeliczenia
całej skali, a nie podmiany dwóch liczb. Pozycja rejestru **T67**.

## 5. KROK 2 — tabela „wzorzec → nasz token"

| rola | wzorzec | nasz token przed | **decyzja** | uzasadnienie |
| --- | --- | --- | --- | --- |
| tło korpusu jasnego | `#f5f5f7` | `#f5f5f5` | **PRZYJĘTE** | Δ = (0,0,2); zlecenie: „jasne tło z pomiaru" |
| tekst mocny na jasnym | `#0f0f0f` | `#0a0a0a` | **PRZYJĘTE** | Δ = (5,5,5); kontrast 17,60:1 |
| tło karty | `#ffffff` | `#ffffff` | Δ = 0 | bez działania |
| **limonka** | `#bee741` | `#a0e00d` | **PRZYJĘTE** | **Δ > 10 w DWÓCH kanałach** (R +30, B +52) — reguła zlecenia mówi wprost: wtedy pomiar wygrywa |
| limonka — stan aktywny | (brak we wzorcu) | `#a5e219` | **`#c3e94d`** | wyprowadzone **z relacji**, nie przepisane: ta sama różnica kanałów co w starej parze |
| **grafit klamr** | `#2e2f31` | **roli nie było** | **NOWA ROLA** | 31. rola; dwie pary w strażniku |
| kreska na jasnym | `#dadbdd` | `#cdcdcd` | **ODRZUCONE** | patrz niżej |
| tekst przygaszony | brak odpowiednika | `#565656` | **ZOSTAJE** | wzorzec tej roli nie ma |
| akcent na jasnym | — | `#4f6f06` | **ZOSTAJE** | limonka na jasnym tle ma **1,31:1**; wzorzec też jej tam nie kładzie |

### Dlaczego kreska wzorca odrzucona — liczbami

| para | wzorzec `#dadbdd` | nasza `#cdcdcd` | próg |
| --- | --- | --- | --- |
| kreska / karta biała | 1,39:1 | **1,59:1** | 1,30 (ADR-038) |
| kreska / tło sekcji | **1,27:1** | **1,46:1** | 1,30 |

Wartość wzorca **schodzi poniżej progu ADR-038 wobec tła sekcji**. To trzeci
raz w tej serii, gdy kreska z cudzego wzorca nie przechodzi naszego progu
(ADR-062: `#e5e5e5` → 1,26:1) — i za każdym razem rozstrzyga ten sam próg,
nie upodobanie.

### Kontrasty po zmianie — liczbami, jak żąda zlecenie

| para | wartość | próg |
| --- | --- | --- |
| tekst `#0f0f0f` / tło `#f5f5f7` | **17,60:1** | 4,5 |
| tekst `#0f0f0f` / karta `#ffffff` | **19,17:1** | 4,5 |
| czarny `#0f0f0f` / limonka `#bee741` | **13,41:1** | 4,5 |
| biały `#ffffff` / grafit `#2e2f31` | **13,40:1** | 4,5 |
| limonka / grafit | **9,38:1** | 3,0 |
| nasza etykieta `#231f20` / nowa limonka | **11,41:1** | 4,5 (było 10,22) |
| nowa limonka / nasze tło ciemne | **14,04:1** | 4,5 (było 12,58) |

**Wszystkie pary, których dotyczy zmiana limonki, POPRAWIAJĄ SIĘ.**

⚠ **`grafit-klamr` wchodzi BEZ KONSUMENTA** — jego konsumentem jest krok 3,
który nie został wykonany. Odnotowuję odstępstwo od ADR-048 („ani jednego
tokena, którego kod nie używa") świadomie i z warunkiem: **jeśli krok 3 nie
wejdzie, rola ma zniknąć razem z nim.** Ten sam tryb, którym ADR-049
wprowadził role korpusu jasnego na wyraźne polecenie właściciela.

## 6. Bramki

| | wynik |
| --- | --- |
| komplet e2e (4 kadry) | **1376 passed · 12 skipped · 0 failed** |
| axe (4 kadry) | **120 passed** |
| strażnik tokenów | ZIELONY, **31 ról** (literał podniesiony razem z tym ADR-em) |
| tokeny · liczby · parytet · deklaracje · linki · kotwice · No-JS | ZIELONE |
| dev właściciela na 3000 | **200 przez cały batch** |

## 7. ⚠ KROK 3 NIE ZOSTAŁ WYKONANY — I DLACZEGO TO ZGŁASZAM, ZAMIAST ZROBIĆ POŁOWĘ

Krok 3 żąda przebudowy strony głównej na **dziesięć sekcji w kolejności
wzorca**, w tym pięciu rzeczy, których dziś nie ma wcale:

1. hero z **maskowanym kadrem bohaterki** i **dużą ramą iPhone'a** (CSS),
2. sekcja „pamięć" z **ramą MacBooka i iPhone'a**,
3. sekcja „dzień" — trzy sloty 3:2 z **chipami jako HTML**,
4. **sześć kafelków z ikonami SVG inline**, jeden kolor, jedna grubość,
5. blok wzrostu z **kartą „Twój Wrapped" jako SVG**,

oraz **zdjęcie z głównej sekcji, które do wzorca nie należą** (pas ścieżek,
obawy/FAQ, dbanie o siebie, pas możliwości) — z przeniesieniem ich na
podstrony, co samo zlecenie odsyła do etapu 091.

**Nie zacząłem tego, zamiast zrobić część.** Powód jest w kanonie i nazwałem
go dzień wcześniej w ADR-063: **mechanizm zbudowany do połowy szkodzi
bardziej niż jego brak.** Strona główna z trzema sekcjami wzorca i czterema
starymi nie jest „postępem w stronę 1:1" — jest stanem, którego nikt nie
zamawiał i którego żadna bramka nie odróżni od skończonego.

**Co jest gotowe do wykorzystania w kroku 3, żeby nie mierzyć drugi raz:**
wszystkie tabele §2–§4, punkt odniesienia nakładki (**27,7 %** średniej
różnicy kanału na pasie górnym przy 1440, przed przebudową) oraz sam wzorzec
w repozytorium z sumą kontrolną.

## 8. Czego ten ADR NIE rozstrzyga

- **Kroku 3** — patrz §7.
- **Skali nagłówków** — stosunek H2 : H1 wzorca (0,80) różni się od naszego
  (0,50); zmiana wymaga przeliczenia całej skali z ADR-044 (**T67**).
- **Szerokości kontenera i rozmiarów pisma w px** — nieprzenośne z kolażu
  (§1); pozostają nasze, dopóki nie będzie zrzutu strony przy znanej
  szerokości okna (**T66**).
- **Treści** — teksty na wzorcu są miejscami zniekształcone (karty cennika
  niosą ciągi w rodzaju „Pianniojce treści", „Świadectwenncznocy"). Wzorzec
  jest źródłem **wyglądu**, nigdy treści; ta pochodzi z `content/` i ze
  Stripe'a.
