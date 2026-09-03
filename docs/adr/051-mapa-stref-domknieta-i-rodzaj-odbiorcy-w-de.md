# ADR-051: Mapa stref domknięta, rytm dnia na jasnym, rodzaj odbiorcy w `de`

Data: 2026-09-03. Status: **PRZYJĘTY** (zlecenie `WWW/076`, kroki 1–2;
decyzje koordynatora z delegacji).

Domyka lukę zgłoszoną w ADR-050 (trzy sekcje bez przypisania strefy)
i rozstrzyga rodzaj odbiorcy w `de` — **inaczej, niż zakładało zlecenie**.

---

## Rozstrzygnięcie 1 — mapa stref: wszystkie 14 sekcji przypisane

ADR-050 zostawił trzy sekcje bez strefy, bo zlecenie `WWW/075` nie
wymieniło ich w żadnej z dwóch list. Decyzje koordynatora domykają mapę:

| # | sekcja | strefa | |
| --- | --- | --- | --- |
| S1 | nawigacja | ciemna | bez zmian |
| S2 | hero | ciemna | bez zmian |
| — | pas ścieżek (R1) | **ciemna** | **potwierdzone** |
| S3 | problem | jasna | ADR-050 |
| S4 | definicja | jasna | ADR-050 |
| — | karty funkcji | jasna | ADR-050 |
| — | pas możliwości | ciemna | bez zmian |
| S5–S8 | filary ×4 | jasna | ADR-050 |
| S9 | dbanie o siebie | jasna | ADR-050 |
| S10 | rytm dnia | **jasna** | **ZMIANA** |
| S11 | cennik-skrót | ciemna | bez zmian |
| S12 | sześć obaw | **ciemna** | **potwierdzone** |
| S13 | zamknięcie (CTA) | ciemna | bez zmian |
| S14 | stopka | ciemna | bez zmian |

**Żadna sekcja nie została bez przypisania.** Dwie z trzech decyzji to
potwierdzenia stanu, jedna to zmiana.

## Rozstrzygnięcie 2 — rytm dnia traci część wyrazu i to jest zapisane

S10 jest **lustrem L1**: sekcja stała na powierzchni WYRÓŻNIONEJ, nie na
tle strony, i tym się odcinała. Na ciemnym korpusie działało to prosto —
`powierzchnia-akcentowa` (#393938) była **najjaśniejszą** powierzchnią
palety, więc pas wychodził ku patrzącemu.

**Na jasnym ta sama sztuczka nie działa: nie ma nic jaśniejszego od
bieli.** Strefa jasna mapuje więc `powierzchnia-akcentowa` na
**powierzchnię karty** — tę samą relację, którą mają karty na tym
korpusie.

⚠ **TO NIE JEST RÓWNOWAŻNA ZAMIANA I NIE UDAJĘ, ŻE JEST.**

| | pas wobec tła sekcji |
| --- | --- |
| na ciemnym (`#393938` na `#070806`) | **5,90:1** |
| na jasnym (`#ffffff` na `#f2f2f2`) | **1,12:1** |

Rola ta sama, **wyraz pięciokrotnie słabszy**. Rozdziela go kompozycja
(pełna szerokość + własny odstęp pionowy), czyli trzeci mechanizm
ADR-038 — ten sam, którym rozdzielają się karty. Ale mechanizm
kompozycji mówi „to osobny blok", a nie „to jest blok WYRÓŻNIONY",
i tej różnicy nie zasypuję.

**Warunek odzyskania wyrazu:** osobna rola „powierzchnia ciemniejsza od
jasnej" i osobna decyzja. Do tego czasu lustro L1 stoi, ale mówi ciszej.

Kontrast tekstu jest bez zarzutu: nagłówek na białym pasie **18,26:1**.

### Strażnik przepisany — trzeci raz ta sama klasa

`e2e/zlozenie.spec.ts` („LUSTRO L1") porównywał tło S10 z **globalną**
wartością `--kolor-rola-powierzchnia-akcentowa`. Po wejściu S10 do strefy
jasnej ta sama rola rozwiązuje się inaczej — test upadał **na zapisie,
nie na wadzie**.

Asercja czyta teraz rolę **z tej sekcji**. Przedmiot zostaje ten sam
(„S10 nosi rolę powierzchni wyróżnionej"), a strażnik jest **mocniejszy**:
łapie przepięcie S10 na zwykłe tło, czego wersja z wartością globalną
w strefie jasnej nie widziała.

⚠ **Czego ta asercja NIE mierzy** — SIŁY wyróżnienia. Zieleń znaczy
„rola się zgadza", nie „pas widać". Ubytek wyrazu z rozstrzygnięcia 2
nie ma strażnika i to jest zapisane, nie przemilczane.

**To trzeci strażnik tej samej klasy w dwóch zleceniach** (marker
konkretów, ADR-050; lustro L1, tutaj). Wzorzec: *asercja porównująca
z wartością GLOBALNĄ roli przestaje mierzyć swój przedmiot w chwili,
gdy rola staje się zależna od kontekstu.* Wszystkie trzy naprawiono tak
samo — przenosząc odczyt do miejsca użycia.

## Rozstrzygnięcie 3 — rodzaj odbiorcy w `de`: PREMISA ZLECENIA NIE ZACHODZI

Zlecenie: *„30 kluczy de z rodzajem odbiorcy przez rzeczownik
(Partnerin itd.) — przepisanie na konstrukcje z «du» bez rzeczownika
rodzajowego"*, przy jednoczesnym *„świat produktu NIETKNIĘTY — rozdział
klas jak w pl"*.

**Te dwa zdania wykluczają się, i pomiar pokazuje którym sposobem.**

Zmierzone: **40 kluczy `de`** niesie rzeczownik rodzaju żeńskiego
(`Partnerin`, `Kundin`, `Leaderin`, `Bekannte`, `Kollegin`, `Autorin`,
`Nutzerinnen`). Z nich:

| klasa | ile | co to |
| --- | --- | --- |
| **osoba trzecia** | **39** | partnerka w zespole, klientka, liderka zatwierdzająca, znajoma — czyli **świat produktu**, który zlecenie każe ZOSTAWIĆ |
| **odbiorca** | **1** | `Cennik.plany.pro.pozycja1` — *„im Vergleich zu anderen **Nutzerinnen**"*, czyli „w porównaniu z innymi **użytkowniczkami**" |

Niemieckie `du` **nie niesie rodzaju** — to samo ustalenie padło już
w pomiarze `WWW/073` i nadal jest prawdziwe. Rodzaj odbiorcy wchodzi do
`de` **jedną drogą**: przez rzeczownik opisujący **grupę odniesienia**,
do której odbiorca należy. „Inne użytkowniczki" mówi czytającemu, że on
też jest użytkowniczką.

**Przepisanie 39 kluczy o osobach trzecich byłoby zmianą świata
produktu** — dokładnie tego, co zlecenie w tym samym zdaniu wyklucza,
i czego odpowiednik w `pl` (18 kluczy: klientka, liderka) został
świadomie nietknięty w ADR-049. Zrobiona została więc **jedna zmiana,
ta która naprawdę dotyczy odbiorcy**.

## Rozstrzygnięcie 4 — TEN SAM KLUCZ BYŁ PRZEOCZONY W `pl`, I TO JEST MÓJ BŁĄD

Zwrotka `WWW/075` twierdziła: *„zero form rodzaju odbiorcy w całym
`pl.json`"*. **Nieprawda.** `Cennik.plany.pro.pozycja1` niósł
*„na tle innych **użytkowniczek**"* i przeszedł, bo moje wyrażenie
szukało końcówek czasownika (`-łaś`) i słowa `sama` — a **nie
rzeczownika opisującego grupę odniesienia**.

⚠ **OSTRZEŻENIE O TYM PADŁO WCZEŚNIEJ I ZOSTAŁO ZLEKCEWAŻONE.** Pomiar
`WWW/073` wymieniał `użytkowniczek` wprost jako jedną z trzech form
„spoza grepa", z uzasadnieniem: *„temat łamie się jako użytkownicz-ek,
nie użytkowniczk-"*. Miałem to w materiale, z którego pisałem pilota,
i nie przeniosłem do wyrażenia.

**Klasa: zero z metody, która szukała nie tego bytu.** Moja kontrola
pozytywna w `WWW/075` sprawdzała, czy wyrażenie widzi **czasowniki**
rodzajowe na podstronach — i widziało, 29 sztuk. Kontrola potwierdziła
**sprawność narzędzia dla postaci, której szukało**, i milczała o postaci,
której nie szukało. To odmiana „zero z jednej postaci nie jest zerem
bytu", z zaostrzeniem: **kontrola pozytywna dobrana do własnej metody
potwierdza metodę, nie pokrycie**.

Praktycznie: przy twierdzeniu „zero X" kontrola pozytywna ma szukać
**innej postaci X niż ta, którą ściga główne wyrażenie** — inaczej mierzy
samą siebie.

Zmiana objęła `pl` i `de`; `en` było neutralne od początku
(*„other users"*). Klucz siedział w **czterech plikach `content/`**
(`pl/cennik.md`, `de/cennik.md`, `tabela-obietnic.md`) — wszystkie
zsynchronizowane, deklaracje długości poprawione, zapadka wróciła na 3.

## Czego ten ADR NIE rozstrzyga

- **Wyraz lustra L1 na jasnym** — potrzebna osobna rola i osobna decyzja.
- **39 kluczy `de` o osobach trzecich** — świat produktu, nietknięty,
  tak samo jak 18 odpowiedników w `pl`. Jeśli ma się zmienić, to razem
  w trzech językach i osobną decyzją.
- **Cel konwersji** — `WWW/076` krok 3 jest projektem, nie kodem; wynik
  w zwrotce, decyzja przed `WWW/077`.
