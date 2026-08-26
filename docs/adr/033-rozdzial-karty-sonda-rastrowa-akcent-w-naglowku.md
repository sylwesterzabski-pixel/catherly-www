# ADR-033: Rozdział karty dwoma mechanizmami, sonda rastrowa, akcent w nagłówku

Data: 2026-08-26. Status: **PRZYJĘTY (rozstrzygnięcia właściciela
2026-08-26, zlecenie `WWW/041`, kroki 1–3).**

Trzy rozstrzygnięcia zamykające trzy pozycje zgłoszone w ADR-032 jako
otwarte. Wspólny mianownik jest tu ważniejszy niż każde z osobna:
**we wszystkich trzech przypadkach naprawiany jest MECHANIZM POMIARU
albo MECHANIZM REGUŁY, a nie obniżany próg i nie zmieniana scena.**

## Rozstrzygnięcie 1 — rozdział karty niosą DWA mechanizmy

### Kontekst

ADR-032 zgłosił: karta ma wobec tła kremowego **1,08:1** przy progu
**1,30**, a progu **nie da się osiągnąć żadną powierzchnią** — czysta
biel wobec `#f0efe8` daje **1,153**. Ograniczeniem jest jasność tła,
a tło jest decyzją właściciela z oglądu i pozostaje **nietykalne**.

### Decyzja

Reguła strażnika brzmi odtąd: **kartę odcina PLAMA ≥ 1,30 ALBO KRESKA
≥ 1,30 — jeden z dwóch, mierzony.** Próg **1,30 bez zmian**.

**To nie jest poluzowanie progu.** Zmienia się nie wysokość poprzeczki,
tylko liczba rzeczy, którym wolno ją przeskoczyć — a sprawdzane są
**obie**, więc zniknięcie obu dalej daje czerwień. Poluzowaniem byłoby
sprawdzanie wyłącznie tej, która akurat przechodzi.

### Zasięg po obu stronach — bo mechanizm jest odwrotny na jasnym i ciemnym

Karty stoją także na tonach ciemnych (kremowe karty na espresso
i oliwce). Zmierzone 2026-08-26 na `e6f8134`:

| powierzchnia | plama | kreska | rozdział niesie |
|---|---|---|---|
| krem (warstwa jasna) | 1,08 ✘ | **1,31 ✔** | kreska |
| espresso (`data-ton="ciemny"`) | **14,04 ✔** | 1,83 ✔ | plama |
| oliwka (`data-ton="ciemny-oliwka"`) | **7,65 ✔** | 1,00 ✘ | plama |

**Każda powierzchnia przechodzi innym mechanizmem — i to jest najlepszy
dowód, że jeden by nie wystarczył.** Na oliwce kreska jest wręcz
niewidoczna (równa tłu, 1,00), na kremie to plama nie robi nic.

Kreską na tonach ciemnych jest `tlo-inwersji-2` — tak przemapowuje ją
blok `[data-ton]`. Strażnik czyta wartości tokenów, nie kaskadę, więc
to przypisanie jest w nim wpisane wprost; zmiana bloku tonów musi iść
razem z tą tabelą.

### Dowód mutacyjny

Jeden przebieg, 2026-08-26 na `e6f8134`: **(A)** stan bieżący →
zielony; **(B)** kreska rozjaśniona do `#eceae2` przy nietkniętej
plamie → **CZERWIEŃ**: *„ROZDZIAŁ KARTY: karta na kremie — plama 1.08:1
ORAZ kreska 1.04:1, oba poniżej 1.30:1"*; **(C)** cofnięcie z kopii,
SHA-256 `8d798c6a…` identyczna → znów zielony.

Mutacja celowo ruszyła **kreskę, nie plamę** — bo to kreska jest dziś
jedynym mechanizmem na kremie, a reguła ma zapalać się, gdy zniknie
mechanizm **faktycznie działający**, nie ten, który i tak nie działa.

### Czego to nie zamyka

Pozostaje ustalenie audytu, że rozdział samą kreską bywa niewystarczający
na słabszym ekranie. Reguła mierzy teraz **oba** mechanizmy i przechodzi,
ale na kremie stoi wyłącznie na kresce **1,31 — z zapasem 0,01 nad
progiem**. Jakiekolwiek rozjaśnienie kreski wywraca tę pozycję i strażnik
to złapie; nie złapie natomiast tego, czy 1,31 wystarcza oku na słabym
wyświetlaczu. To pozostaje pytaniem o wygląd, nie o mechanizm.

---

## Rozstrzygnięcie 2 — sonda mierzy tło z RENDERU, scena zostaje

### Kontekst

ADR-032 zgłosił: `e2e/kontrast-stanow.spec.ts` upadał 48 razy, ale
**ani razu z powodem „poniżej progu"** — wszystkie mówiły
**„nieoznaczalne"**. Poświata robi z tła gradient, którego składanie ze
stylu wyliczonego nie ma jak policzyć, więc sonda odmawiała werdyktu dla
całej sekcji, na każdej trasie (stopka jest wszędzie).

### Decyzja: naprawiamy POMIAR, nie scenę. Poświata zostaje.

Naprawa ma **dwie warstwy** i to rozróżnienie jest istotne, bo pierwsza
okazała się ważniejsza od drugiej.

**(a) Stos malowania obcięty do warstw, które widać.** Do tej doby pomiar
oznaczał „obraz w tle", gdy gradient miała **jakakolwiek** warstwa stosu
— także taka, którą całkowicie zasłania warstwa nieprzezroczysta nad nią.
To była nadmierna ostrożność, nie pomiar: etykieta CTA leży na pełnym
wypełnieniu przycisku i gradientu pod nim nie widać ani jednym pikselem.
Warstwa bez obrazu i z alfą 1 zasłania wszystko pod sobą, więc stos jest
teraz ucinany na pierwszej takiej od góry. **To nie jest złagodzenie —
to usunięcie z pomiaru warstw, których w renderze nie ma.**

**(b) Rozstrzyganie rastrem dla tego, co naprawdę leży na gradiencie.**
Zamiast liczyć tło z deklaracji, czytamy je z renderu: zrzut otoczenia
elementu, **40 próbek piksela na pierścieniu 3 px poza ramką** (tam pada
obwódka fokusa przy offsecie 2), kontrast każdego składnika rysunku
wobec każdej próbki. **Werdykt zapada z NAJGORSZEJ próbki** — granica ma
być widoczna na całym obwodzie, nie średnio.

Kolejność jest zaprojektowana, nie przypadkowa: raster dostaje wyłącznie
to, czego składanie stosu nie umiało policzyć, więc ścieżka mierzalna
zachowuje pierwszeństwo i nic nie traci na dokładności.

### Wynik: 48 → 0 nieoznaczalnych, i jeden ODSŁONIĘTY defekt

**Zero pozycji nieoznaczalnych.** Wszystkie upadki mają teraz werdykt
liczbowy — i okazały się **jednym defektem powtórzonym 108 razy**:

> **etykieta CTA w stanie hover/active: `rgb(240,239,232)` na
> `rgb(201,162,94)` = 2,07:1 przy progu 4,5:1.**

Przyczyna jest w ADR-032, nie w sondzie: blok `[data-ton]` mapuje
`interakcja-aktywna` na `akcent-na-inwersji` (złoto **jasne**), a etykieta
zostaje kremowa — jasne na jasnym. **Ten defekt istniał od wdrożenia
natury i był niewidoczny, bo chował się za „nieoznaczalne".**

**Czerwień STOI i wraca do właściciela z liczbą** — zlecenie `WWW/041`
mówi wprost: *„nie łatamy sceny w tym kroku"*. To jest najlepszy możliwy
argument za tym, że „nieoznaczalne" nie wolno było wyciszyć: przez cały
czas zasłaniało realne naruszenie AA na CTA konwersji.

### Kontrola negatywna — dowód, że ścieżka rastrowa umie zapalić czerwień

Sama zieleń rastru nic by nie dowodziła (wszystkie upadki przyszły
ścieżką tekstową). Mutacja: obwódka CTA przestawiona na barwę bliską tłu.

> `granica-raster 2.05:1 < 3:1 — … rysunek na tle niejednolitym
> (rgb(70, 54, 45) — najgorsza z 40 próbek) — pomiar z renderu`

Najgorsza próbka `rgb(70,54,45)` to **mieszanina espresso z poświatą** —
wartość, której nie ma w żadnej deklaracji CSS. Dowodzi to, że raster
czyta faktyczny render, a nie zadeklarowane tło. Cofnięcie: SHA-256
`fe61f7f0…` zgodna, `granica-raster` znika, zostaje sam defekt tekstu.

### Czego ta metoda nie robi — wypisane, żeby zieleń nie była czytana szerzej

Nie próbkuje wnętrza elementu (od tekstu jest gałąź tekstowa), nie
wykrywa animacji tła w czasie i nie zastępuje oceny okiem przy obrazach
fotograficznych o dużej wariancji. Zakłada też, że **tło pod kontrolką
nie zmienia się razem z jej własnym stanem** — próbki pobierane są raz na
element. Reguły postaci `X:hover Y`, które mogłyby to złamać, pilnuje
osobno `skanerRegulStanu`; dziś nie istnieje ani jedna.

---

## Rozstrzygnięcie 3 — R-AKCENT-03: akcent może nieść fragment nagłówka

### Rozgraniczenie wobec R-AKCENT-01

Bez niego obie reguły wyglądają na sprzeczne:

- **R-AKCENT-01 obowiązuje BEZ ZMIAN** dla tekstu **akapitowego** —
  akcent nigdy nie maluje prozy, etykiet ani komunikatów.
- **R-AKCENT-03** dopuszcza akcent na **spójnym fragmencie nagłówka**,
  pod dwoma warunkami **łącznie**: rozmiar dużego tekstu wg WCAG
  (≥ 24 px, albo ≥ 18,66 px przy wadze ≥ 700) **oraz** kontrast ≥ 3:1
  na **swojej** powierzchni.

To nie jest wyjątek wygodowy: przy dużym tekście WCAG 1.4.3 stawia próg
**3:1**, a nie 4,5:1. **Zmienia się próg, nie rygor.**

### Mechanizm i18n — podział mieszka w kluczu, nie w kodzie

Rich-text `<akcent>…</akcent>` w wartości klucza, składany przez
`t.rich` z next-intl. Dzięki temu **granica frazowa jest tłumaczona
razem z tekstem** i może być inna w każdym języku, a kod nie zna
żadnego podziału.

**SŁOWA SĄ NIETKNIĘTE** — sprawdzone asercją przy zapisie: tekst po
zdjęciu znaczników jest identyczny z tekstem sprzed zmiany, we
wszystkich trzech językach. Znacznik jest nośnikiem podziału, nie treścią.

| pozycja | pl | en | de |
|---|---|---|---|
| Problem | `Wszystko gdzieś jest.` | `Everything is somewhere.` | `Alles ist irgendwo.` |
| Definicja | `pamięć twojej sprzedaży` | `the memory of your selling` | `das Gedächtnis deines Vertriebs` |

Granica frazowa istnieje we wszystkich trzech językach: w Problemie to
granica **zdania**, w Definicji — fraza rzeczownikowa po orzeczniku.

### Pozycja trzecia ODPADA — i NIE z powodu języka

Zlecenie przewidywało akcent na `twój dzień` w nagłówku sekcji rytmu.
**Granica frazowa istnieje we wszystkich trzech językach**
(`Jak wygląda ` + `twój dzień` + ` z Catherly`; `What ` + `your day` + …;
`So sieht ` + `dein Tag` + …). Odpadła z innego powodu:

> Sekcja rytmu stoi na `powierzchnia-akcentowa`, gdzie akcent ma
> **2,94:1** przy progu **3:1** R-AKCENT-03. **Zabrakło kontrastu, nie
> języka.**

Zmierzone 2026-08-26 na `4b9eda4`, h2 sekcji = 25 px (duży tekst):
`akcent × tło strony` **3,67 ✔** · `× powierzchnia` **3,96 ✔** ·
`× powierzchnia-2` **3,25 ✔** · `× powierzchnia-akcentowa` **2,94 ✘**.

Strażnik ma tę parę wpisaną jako **ostrzeżenie odwrotne**: gdyby akcent
kiedyś urósł powyżej 3:1 na tej powierzchni, wypisze, że pozycja wraca
do rozważenia. Zakaz nie jest więc wieczny z założenia — jest związany
z liczbą.

### Furtka zamknięta w tym samym commicie, w którym powstała

Porównania „znak w znak" (messages ↔ `content/`, messages ↔ wyrenderowany
H2) musiały przestać porównywać znaczniki, bo w `content/` ich nie ma.
Normalizacja `bezZnacznikow` przywraca im przedmiot — **słowa** — ale
sama z siebie tworzy dziurę: nikt by nie zauważył, że znacznik zniknął
albo rozjechał się między językami.

Dlatego w tym samym commicie powstał strażnik
**„R-AKCENT-03: znaczniki akcentu w parytecie ×3 i tylko w miejscach
z decyzji"**, który pilnuje trzech rzeczy naraz: poprawności zapisu
(domknięcie, brak zagnieżdżeń, brak pustych), **identycznej liczby par we
wszystkich trzech językach** oraz tego, że akcent stoi wyłącznie tam,
gdzie rozstrzygnął właściciel.

**Dowód mutacyjny:** znacznik zdjęty **tylko w DE** → czerwień
*„de/Definicja: dokładnie jedna para akcentu"*; cofnięcie, SHA-256
`27ba17cf…` zgodna → zieleń. Parytet jest tu ważniejszy od ozdoby —
zgodnie z warunkiem zlecenia.

### Stan bramek po trzech krokach

`tokeny` (linter + strażnik z R-AKCENT-03), `kontrakt`, `liczby`,
`parytet`, `kotwice`, `linki`, `nojs`, `lint`, `build`, `axe` —
**zielone**. Pełny zestaw e2e: **588 passed, zero nieoznaczalnych**,
48 upadków to **jeden defekt** opisany w rozstrzygnięciu 2, który
**stoi świadomie** i czeka na decyzję właściciela.
