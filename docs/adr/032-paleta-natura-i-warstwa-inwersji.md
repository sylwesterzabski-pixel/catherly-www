# ADR-032: Paleta „natura" i warstwa inwersji tonów

Data: 2026-08-26. Status: **PRZYJĘTY (decyzja właściciela 2026-08-26,
zlecenie `WWW/040`, decyzja ② rozstrzygnięta ostatecznie po oglądzie
makiety).**

Źródło wartości: referencja `glowna-natura.html` z paczki
`catherly-paczka-claude/`, zatwierdzona przez właściciela po oglądzie.
Wartości przyjęto bez negocjacji; **wszystkie kontrasty przeliczono po
tej stronie** — zlecenie mówi wprost: *„liczy pomiar, nie moja tabela"*.

## Kontekst

ADR-031 (ta sama doba, rano) wprowadził paletę „kancelaria" i całą
infrastrukturę: tokeny przez generator, krój Onest, pięciokrokową skalę,
strażnika tokenów, kasację bloku eksperymentu. **Ta infrastruktura
zostaje.** „Natura" jest podmianą WARTOŚCI w tych samych 19 rolach plus
dołożeniem warstwy inwersji — nie odwrotem od ADR-031.

## Decyzja

### 1. Dwadzieścia pięć ról zamiast dziewiętnastu

Dziewiętnaście ról warstwy jasnej zmienia wartości; dochodzi **sześć ról
warstwy inwersji**: `tlo-inwersji` `#2a2622` (espresso), `tlo-inwersji-2`
`#564e43` (oliwkowy brąz), `tekst-na-inwersji` `#f0efe8`,
`tekst-2-na-inwersji` `#c9c2b4`, `akcent-na-inwersji` `#c9a25e` (złoto
jasne), `interakcja-inwersji` `#7e6425` (złoty CTA).

Osobno, **poza rolami**, wchodzi `kolor.dekoracja.poswiata` `#905f47` —
jedna barwa dekoracyjna do poświaty radialnej. Trzymana poza `kolor.rola`
świadomie: dzięki temu liczba ról zostaje 25, zgodna z decyzją i ze
strażnikiem, a barwa nie udaje roli systemu.

### 2. Fokus może być równy link-aktywny

`fokus` = `link-aktywny` = `#7e6425`. Zlecenie dopuszczało to wprost
i przewidywało wariant zapasowy `#6b5520`, gdyby strażnik wymagał pełnej
rozdzielności. **Nie był potrzebny** — sprawdzone: R-AKCENT-02 wymaga
rozdzielności trójki `fokus`/`akcent`/`interakcja`, a te trzy mają
`#7e6425`, `#9c7434` i `#221f20`. Pary `fokus`/`link-aktywny` reguła nie
obejmuje i nigdy nie obejmowała.

### 3. Tony sekcji przez `data-ton`

Atrybut na sekcji przełącza role przez kaskadę; jeden blok w
`globals.css`, wyłącznie przez `var()`. Sekcja bez atrybutu wygląda
dokładnie jak dotąd.

**Trzy wartości, nie jedna — rozszerzenie wobec litery zlecenia,
oznaczone:** `ciemny` (espresso), `ciemny-oliwka` (filary), `grafit`
(stopka). Zlecenie nazywa tylko `data-ton="ciemny"`, ale krok 3 wymaga
trzech różnych powierzchni ciemnych; jedna wartość atrybutu nie potrafi
ich rozróżnić.

`powierzchnia` **celowo nie jest przemapowana** w tonach ciemnych —
ramki kadrów w filarach mają zostać jasne, tak jak w referencji.

### 4. Granicę złotego CTA niesie obwódka, nie plama

**To jest ustalenie z pomiaru i nie da się go obejść doborem barwy.**
Wypełnienie `interakcja-inwersji` ma wobec espresso **2,67:1**, czyli
poniżej 3:1 z WCAG 1.4.11. Przy jasnej etykiecie `tekst-na-inwersji`
**okno luminancji nie istnieje**: wypełnienie musiałoby mieć jednocześnie
`L ≥ 0,1598` (żeby odciąć się od tła) i `L ≤ 0,1524` (żeby utrzymać
4,5:1 pod etykietą). Sprawdzone na ośmiu kandydatach w tym samym
odcieniu — każdy łamie jeden z dwóch progów.

Granicę niesie więc obwódka w `tekst-na-inwersji`. Zmierzone na całym
zakresie poświaty: **13,02:1** na czystym espresso i **9,25:1** przy
poświacie 35% — 1.4.11 spełnione wszędzie. To ten sam wzorzec, który
w eksperymencie palety niósł obwódkę CTA przy limonce.

## Konsekwencje

### T51 ZAMKNIĘTE tego samego dnia, w którym powstało

ΔE szwu logowania: **kancelaria 6,46** (czerwień) → **natura 2,15**.
Dla porównania stan pierwotny: 4,66. Szew jest dziś bliższy niż
kiedykolwiek, **a progu nie ruszono ani razu**. Czerwień była własnością
palety, nie bramki — i to jest najlepszy możliwy dowód, że nie należało
jej wyciszać podniesieniem progu.

**Pozycja poboczna zostaje otwarta:** kotwica progu wciąż odwołuje się do
roli `neutralna-50`, której nie ma od ADR-031. Zieleń tego nie zamyka.

### Trzy rzeczy NIEWYKONANE — do decyzji właściciela

**(a) Karty przestają się odcinać plamą — 1,08:1.**
Zmierzone: `powierzchnia` `#faf7f1` wobec tła `#f0efe8` = **1,08:1**.
Próg 1,30, wprowadzony zadaniem 6 z ADR-031, nie jest spełniony —
i **nie da się go spełnić żadną wartością powierzchni**: czysta biel
wobec tego kremu daje **1,153**. Ograniczeniem jest jasność TŁA.

Kontekst historyczny, bo bez niego liczba nic nie mówi: stan sprzed
kancelarii, który audyt zewnętrzny nazwał defektem („karty trzymały się
wyłącznie cienką kreską — na słabszym ekranie struktura znikała"), miał
**1,12**. Natura ma **1,08**, czyli **mniej**. Rozdział niesie kreska
(1,31 wobec tła) — czyli dokładnie ten mechanizm, który audyt uznał za
niewystarczający.

**Strażnika NIE osłabiono** — reguła stoi nietknięta i świeci czerwienią.
Do rozstrzygnięcia: (1) przyciemnić tło ku `#e0ddd2`, gdzie biel odzyskuje
1,30; (2) uznać kreskę za mechanizm rozdziału i przepisać regułę
strażnika na „plama ALBO kreska ≥ 1,30" — wtedy stan przechodzi, ale
świadomie wracamy do konstrukcji, którą audyt skrytykował; (3) przyjąć
czerwień.

**(b) Poświata odbiera bramce zdolność mierzenia kontrastu.**
`e2e/kontrast-stanow.spec.ts` zgłasza dla sekcji z poświatą nie
„poniżej progu", tylko **„nieoznaczalne"** — sonda nie umie złożyć
kontrastu na gradiencie i odmawia werdyktu dla WSZYSTKICH elementów
sekcji, nie tylko CTA. Dotyczy każdej trasy, bo stopka jest wszędzie.

**Nie obszedłem tego pseudoelementem**, choć technicznie by wystarczyło:
sonda mierzy tło z przodków, więc glow przeniesiony pod treść dałby jej
płaskie espresso do pomiaru — czyli **zieleń policzoną z tła, którego pod
przyciskiem nie ma**. To fałszywa zieleń, gorsza od czerwieni.
Do rozstrzygnięcia: (1) poświata schodzi; (2) sonda uczy się składać
gradienty (praca w `e2e/pomoc/sonda-stanow.mjs`); (3) przyjąć, że sekcje
z poświatą są poza zasięgiem tej bramki — **z wpisem, bo to zdejmuje
pokrycie z CTA konwersji**.

**(c) Nagłówki dwukolorowe niewykonane.**
Referencja dzieli je **redakcyjnie**: `<span>Wszystko gdzieś jest.</span>
Każde gdzie indziej.`, `Catherly to <span>pamięć twojej sprzedaży</span>`.
Nie ma reguły mechanicznej, z której dałoby się to wyprowadzić z klucza
i18n — punkt podziału jest decyzją o treści, osobną dla `pl`, `en` i `de`.
Wykonanie tego bez zmiany kluczy oznaczałoby **wymyślenie podziału w trzech
językach**, czyli treść bez pokrycia (zakaz 9) i złamanie parytetu.

Drugi powód, niezależny: `.akcent-zloty` maluje tekst rolą `akcent`, co
łamie **R-AKCENT-01** („akcent nigdy nie niesie tekstu") i zapala
strażnika. Zlecenie redefiniuje akcent jako „dekoracja **i duże napisy**"
— to jest zmiana reguły, która wymaga zapisu i przepisania strażnika,
a nie wyjątku w kodzie.

## Data

2026-08-26. Wdrożenie: zlecenie `WWW/040`, kroki 0–4. Pomiary stemplowane
commitem `2c49b57`.
