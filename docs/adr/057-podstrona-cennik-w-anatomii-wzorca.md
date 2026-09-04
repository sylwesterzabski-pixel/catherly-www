# ADR-057: Podstrona `/cennik` w anatomii wzorca

Data: 2026-09-04. Status: **PRZYJĘTY** (zlecenie `WWW/082`, krok 1).

Pomiar celowany 04.09.2026 na **`/pricing` wzorca** — Proactiv jest
wielostronicowy (`/`, `/features`, `/pricing`, `/blog`, `/contact`,
`/register`), więc podstrona ma własny pomiar, nie przeniesienie
z głównej. **Każde zero z kontrolą pozytywną.**

---

## Rozstrzygnięcie 1 — H1 PODSTRONY MA ROZMIAR NAGŁÓWKA SEKCJI, NIE HERO

Najważniejsze ustalenie tego batcha i takie, którego się nie spodziewałem.

| | strona główna wzorca | **`/pricing` wzorca** |
| --- | --- | --- |
| H1 przy 1440 | **96 px / 600** | **48 px / 500 / lh 60 / ls −1,2** |
| H1 przy 390 | 48 px | **30 px / 500 / lh 36 / ls −0,75** |
| miara H1 | 1152 px | **1024 px** |
| lead | — | **16 / 400 / lh 24**, miara **896**, odstęp **16** |
| H1 od góry | 184 px | **232 px** (1440 i 810) · **152 px** (390) |

**Wzorzec rozdziela dwie role `h1`:** hero strony i tytuł podstrony.
Druga bierze dokładnie skalę H2 z ADR-053. U nas obie brały skalę
globalną `--tekst-h1*` (96 / 80 / 48), więc tytuł `/cennik` był na kadrze
1440 **dwukrotnie większy** niż u wzorca.

Nadpisanie weszło **w module podstrony, nie w regule globalnej** — dotyczy
roli, nie poziomu znacznika. Sięga po tokeny H2 zamiast dokładać trzecią
parę o identycznych wartościach: dwa tokeny o równej wartości to dwa
tokeny do rozjechania się.

Zmierzone po zmianie: **48 px @ 1440 i 810, 30 px @ 390**, miara nagłówka
1024, lead 16 px przy mierze 896.

⚠ **WAGA ZOSTAJE 700, WZORZEC MA 500 — różnica ZASTANA, nie wniesiona.**
Nasze nagłówki biorą wagę domyślną przeglądarki (`bold`), bo reguła
globalna ustawia rozmiar, interlinię i tracking, a wagi nie rusza. Dotyczy
to **wszystkich** nagłówków serwisu, nie tylko tego; zmiana jest decyzją
typograficzną całej strony i nie mieści się w batchu podstrony. Zgłaszam
z liczbą, żeby nie wyglądało na przeoczenie pomiaru.

⚠ **H1 od góry: 244 px u nas wobec 232 u wzorca** (i 164 wobec 152 przy
390) — stała różnica **12 px**. Wynika z tokena `pas-naglowka` = 84 px,
w którym sześć pikseli to zapas wyliczony w ADR-052 (pasek ma 62,39, nie
62). Nie ruszam: ten zapas kupił zgaszenie 27 asercji kotwic.

## Rozstrzygnięcie 2 — SPROSTOWANIE ADR-056: chrom karty planu pochodzi z innej rodziny

| | wzorzec `/pricing` | co dał ADR-056 |
| --- | --- | --- |
| tło karty planu | **brak** | powierzchnia |
| obrys | **brak** | 1 px |
| promień | **0** | 12 px |
| wypełnienie | **0** | 32 px |
| nazwa planu | **16 / 400** | 16 / 600 |
| cena | **18 / 500 / lh 28** | 18 / 500 / 28 ✓ |
| opis planu | **14 / 400 / lh 20** | — |
| kolumny · odstęp | **3 od progu · 1 poniżej · 16 px** | 3 · 1 · 16 ✓ |

**Karty cennika wzorca to trzy gołe kolumny tekstu.** Batch A5 nadał
naszym kartom planu wypełnienie 32, promień 12 i obrys, biorąc te liczby
z próbki „21 kart o promieniu 12 i wypełnieniu 32" — a do tamtej próbki
należały karty **funkcji i opinii**, nie cennika. To znowu **dominanta
zbioru, nie roli**: ta sama klasa, którą ADR-053 rozdzielił przy mierze
akapitu (karta 384 / sekcja 896).

⚠ **CHROM MIMO TO ZOSTAJE — i jest to DECYZJA, nie pomiar.** Zlecenie
mówi wprost: karty planów na podstronie to **reużycie anatomii z ADR-056,
zero dywergencji ze skrótem**. Rozjazd zgłaszam liczbami zamiast
rozstrzygać po cichu; gdyby chrom miał zniknąć, **musi zniknąć w obu
miejscach naraz**, bo inaczej skrót i podstrona przestaną pokazywać tę
samą rzecz. Z pomiaru wzięta natomiast typografia i odstępy, które do
rodziny cennika należą.

### Zero dywergencji — dowiedzione asercją MIĘDZY TRASAMI

Zdanie „zero dywergencji" jest sprawdzalne tylko wtedy, gdy obie karty
mierzy **ten sam kod, na tym samym kadrze, w tej samej chwili**.
Porównanie z liczbą przepisaną z ADR-a sprawdzałoby pamięć, nie zgodność.
Nowy test odwiedza `/cennik`, potem `/`, i porównuje wypełnienie, promień
i obrys.

**Dowód mutacyjny:** promień karty `/cennik` zmieniony na 8 px (skrót
zostaje 12) → **czerwień w trzech projektach**, z komunikatem
`- "promien": "12px"  + "promien": "8px"`. Cofnięcie → 3 passed.

## Rozstrzygnięcie 3 — PRZEŁĄCZNIK OKRESU: granica była poniżej progu WCAG

⚠ **Wzorzec przełącznika NIE MA** — zero kontrolek okresu przy **siedmiu**
znalezionych kontrolkach razem (6 przycisków + 1 ukryty `checkbox` 0 × 0).
To nie jest więc przeniesienie ze wzorca, tylko **naprawa z normy**.

| | przed | po |
| --- | --- | --- |
| obrys | `kreska` → **1,74:1** ✘ | `kreska-mocna` → **11,71:1** ✓ |

Przełącznik jest **kontrolką**, więc jego granica podlega progowi 3:1
(WCAG 1.4.11). `kontrast-stanow` tego nie widział, bo mierzy stany
interaktywne **tekstu**, nie granice kontenerów — czyli defekt nie
„przeszedł strażnikowi", tylko **nie miał strażnika**.

Dostał go teraz: nowy test liczy kontrast granicy wobec **najbliższego
malowanego przodka** (ta sama poprawka, którą ADR-054 wprowadził
w strażniku rozdziału kart). **Dowód mutacyjny:** obrys cofnięty na
`kreska` → `granica przełącznika 1.74:1 przy progu 3:1`.

### Klawiatura — pomiar, nie deklaracja

| co zmierzono | wynik |
| --- | --- |
| dojście `Tab` do radia | **tak, 7 kroków** |
| `→` (strzałka w prawo) | zaznaczenie **0 → 1** |
| fokus po zmianie | **zostaje na radiu** |
| obwódka fokusu | **3 px solid biel** |
| skutek | cena roczna **widoczna** |

Natywna grupa radiowa zachowuje się jak powinna — sprawdzone
naciśnięciami, nie odczytem znacznika.

## Rozstrzygnięcie 4 — tabela porównawcza: wzorzec jej nie ma, nasza broni się POMIAREM

⚠ **Zero sprawdzone:** `<table>` = **0**, komórek z rolami ARIA = **0**,
przy 1599 elementach i 22 linkach widzianych przez sondę na tej samej
stronie. Wzorzec tabeli porównawczej nie ma.

⚠ **Premisa zlecenia nie zachodzi w jednym punkcie:** mowa o „tabeli
porównawczej 12 wierszy", zmierzone — **8 wierszy × 4 kolumny**.

**Werdykt dla kadru wąskiego wydany POMIAREM, nie okiem** — i wypada
dobrze, bo mechanika była zbudowana wcześniej:

| | 390 px | 320 px |
| --- | --- | --- |
| **strona panoramuje poziomo** | **NIE** (`scrollWidth` = `innerWidth`) | **NIE** |
| okno tabeli | 358 → treść 576 | 288 → treść 576 |
| `overflow-x` | **auto** | auto |
| `tabindex` / `role` | **`0` / `region`** | `0` / `region` |
| pierwsza kolumna | **`position: sticky`** | sticky |
| `caption` | **jest** | jest |
| najmniejsze pismo | **14 px** | 14 px |

Tabela przewija się **wewnątrz własnego, ogniskowalnego regionu**,
z przyklejoną kolumną nagłówków wierszy, a **strona nie panoramuje na
żadnym z dwóch wąskich kadrów**. To jest werdykt „czytelna", oparty na
liczbach: nic nie wycieka poza kadr, nagłówek wiersza nie ucieka przy
przewijaniu, a region da się przewinąć klawiaturą.

## Rozstrzygnięcie 5 — FAQ, paski, CTA

⚠ **FAQ na `/pricing` wzorca NIE MA** — **0 pytań**, przy 10 znalezionych
tą samą sondą na jego stronie głównej. To kontrola pozytywna **między
stronami**: narzędzie umie liczyć pytania, tu ich nie ma.

Nasze cztery pozycje FAQ stoją na mechanice `details` ze strony głównej —
tej samej, którą ADR-056 obronił pomiarem klawiatury. Paski potwierdzeń
i CTA „Wybierz plan" bez zmian (para 1:1, patrz ADR-056).

## Rozstrzygnięcie 6 — rytm i kontenery podstrony

| | przed | po |
| --- | --- | --- |
| nagłówek podstrony | 40 / 0, wcięcie 16 | **80 / 160**, wcięcie 20 |
| miara nagłówka | 1440 (cały kadr) | **1024** |
| miara leadu | 65ch | **896** |
| sekcja planów | 40 na każdym kadrze | **80 / 160** |
| kontener planów | 1440 | **1280** |
| odstęp kart | 24 | **16 / 40** |
| paski potwierdzeń | 40 / 16 | **80 / 160**, wcięcie 20 |

## Rozstrzygnięcie 7 — wejścia z głównej: wszystkie lądują sensownie

Zmierzone na kadrze 390, przejściem z żywej strony:

| wejście | z ekranu | ląduje |
| --- | --- | --- |
| `/cennik` z nawigacji | 0,0 | góra strony, H1 „Plany różnią się zakresem…" |
| `/cennik` ze skrótu cennika | **11,17** | góra strony, ten sam H1 |
| `/dla-kogo#prowadzisz-strukture` z pasa ścieżek | 1,75 | **kotwica istnieje**, `scrollY` 3059, cel **84 px od góry** |

⚠ **Kotwica podróży STRUKTURA ląduje dokładnie pod przyklejonym paskiem**
— 84 px to wartość tokena `pas-naglowka`, czyli `scroll-padding` działa
co do piksela.

⚠ **Na `/cennik` nie ma kotwic i nie są potrzebne:** oba wejścia prowadzą
na górę, a tam stoi H1 i zaraz pod nim plany. Kotwica miałaby sens dopiero
wtedy, gdyby wejście miało trafiać w tabelę albo FAQ — dziś żadne nie ma
takiego celu.

## Rozstrzygnięcie 8 — nowe asercje OD RAZU w trzech projektach

Pozycja T57 pokazała, po co: do 04.09 reguły progu 90rem nie były
pilnowane przez żaden przebieg, a mutacja w tym bloku milczała. Trzy nowe
testy `/cennik` (skala H1 · zero dywergencji · granica przełącznika)
wchodzą w `mobile-390`, `desktop` i `desktop-wide` **od pierwszego dnia**.

⚠ **Asercja skali H1 porównuje z TOKENEM, nie z liczbą wpisaną w teście.**
Liczba wpisana na sztywno zapalałaby się przy każdej zmianie skali albo
przepuszczała ją bokiem; przedmiotem jest **relacja** — tytuł podstrony ma
rozmiar nagłówka sekcji i **nie** ma rozmiaru hero.

## Pomiary domykające

| | wynik |
| --- | --- |
| pełny zestaw e2e (3 projekty) | **1009 passed · 8 skipped · 0 failed** |
| axe (3 projekty) | **90 passed** |
| bramki statyczne | tokeny (30 ról) · liczby · parytet · kotwice · linki · no-JS · deklaracje — ZIELONE |
| zastane czerwienie | ESLint · kontrakt ΔE · Nieodwracalne · Wydajność |
| **LCP `/cennik`** | **mediana 28 ms** z pięciu przebiegów (28 · 40 · 28 · 28 · 28), element `h1` |
| granica przełącznika × tło | **11,71:1** (próg 3) |
| obrys karty planu × wypełnienie | **1,60:1** (próg 1,30) |
| cena × wypełnienie karty | **18,48:1** |
| nazwa planu × wypełnienie | **18,48:1** |
| H1 × tło strony | **20,07:1** |
| lead × tło strony | **11,71:1** |

⚠ **Cały ten batch mierzony i testowany na porcie 3100**, bo na 3000 stoi
serwer deweloperski właściciela (zakaz 7 zabrania go zabijać). Posłużyła
do tego zmienna `WWW_BAZA`, którą konfiguracja Playwrighta niesie
dokładnie na tę okazję — i to jest pierwszy raz, kiedy się przydała.

## Czego ten ADR NIE rozstrzyga

- **Chromu karty planu** — pomiar mówi „brak", zlecenie mówi „bez
  dywergencji"; zdjęcie musiałoby objąć skrót i podstronę naraz.
- **Wagi nagłówków** — wzorzec 500, my 700 (domyślna przeglądarki);
  decyzja typograficzna całej strony.
- **Interlinii leadu** — wzorzec 1,5, my 1,8 (`interlinia-tekst`); j.w.
- **Trzech kolumn planów przy 810** — karta ma tam 246 px szerokości
  i 956 px wysokości; wzorzec schodzi do jednej kolumny poniżej 1024.
  Zmiana progu dotknęłaby też skrótu na głównej.
- **Kotwic na `/cennik`** — dziś zbędne, patrz rozstrzygnięcie 7.
