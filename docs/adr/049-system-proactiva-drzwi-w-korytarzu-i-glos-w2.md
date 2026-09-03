# ADR-049: System Proactiva w tokenach, drzwi w korytarzu, pilot głosu W2 — z korektą ADR-048

Data: 2026-09-03. Status: **PRZYJĘTY** (zlecenie `WWW/074`, decyzje
właściciela z 03.09, kroki 1–3).

Wszystkie wartości pochodzą z **pomiaru Proactiva wykonanego w `WWW/073`**
(Playwright, `getComputedStyle` + `getBoundingClientRect` na wyrenderowanej
stronie, 1440×900, 03.09.2026) — nie z odczytu SSR i nie z oka.

---

## Rozstrzygnięcie 1 — cień kart zmienia JĘZYK, nie liczbę (korekta ADR-048)

ADR-048 wprowadził `cien.karta` jako **trzy warstwy czerni na zewnątrz**,
z §8.1 (Habitline). Pomiar Proactiva pokazał, że dominujący cień
strukturalny jest **jedną warstwą bieli WEWNĄTRZ bryły** — 30 wystąpień,
najczęstszy cień całej jego strony.

| | ADR-048 (§8.1, Habitline) | ADR-049 (pomiar Proactiva) |
| --- | --- | --- |
| warstwy | 3 | **1** |
| barwa | czerń | **biel** |
| kierunek | zewnętrzny | **`inset`** |
| komunikat | bryła **opada** i rzuca mrok | bryła **świeci od środka** |

**To nie jest korekta liczby, tylko odwrócenie wypowiedzi.** Przy jednolicie
ciemnym tle cień czarny rzuca mrok na mrok — czyli nic widocznego. Wzorzec
buduje głębię światłem: krawędzie też są bielą przy niskiej alfie, nigdy
barwą.

**Czego korekta NIE rusza:** moment użycia. ADR-048, rozstrzygnięcie 4
(cień wyłącznie `:hover` / `:focus-within`) zostaje **w mocy bez zmian**.
Spoczynek karty nie zmienia się o piksel, więc pomiar „tło = rola
powierzchni · BEZ obrysu · bez cienia" i trzeci mechanizm rozdziału
z ADR-038 zostają prawdziwe.

## Rozstrzygnięcie 2 — promień kart 16 px → 12 px (korekta ADR-048)

ADR-048 dołożył `wymiar.promien-karty` = 16 px jako „uzupełnienie luki",
biorąc dolny koniec przedziału 16–20 z §8.1. Pomiar Proactiva:

| promień | wystąpień na kartach |
| --- | --- |
| **12 px** | **37** ← dominanta |
| 8 px | 23 |
| 16 px | 14 |

**Dominantą jest 12 px — a to wartość, którą mamy od dawna jako
`promien-sredni`.** Nowy token trafił obok dominanty i dublował rolę, którą
skala już pełniła. **Token wycofany**, jedyne jego użycie (kadr sekcji
„Dbanie o siebie") przemapowane na `promien-sredni`.

⚠ Przemapowanie poszło **przed** usunięciem tokena, nie po — zwisające
`var()` unieważnia całą deklarację i własność spada na wartość dziedziczoną,
cicho (przekazanie, rozdz. 9: „usunięcie roli to dwie roboty, a druga nie ma
strażnika"). Kontrola: zero `var(--wymiar-promien-karty)` w `src/`, przy
kontroli pozytywnej pokazującej 2 użycia `promien-sredni` tą samą metodą.

## Rozstrzygnięcie 3 — drabina alfy, szkło malowane, zegar ruchu

**Alfa (6 progów).** Wzorzec nie ma jednej przezroczystości — ma sześć,
najniższy 30× słabszy od najwyższego: `0.30` płyta · `0.20` obrys mocny ·
`0.10` obrys · `0.06` cień wewnętrzny · `0.02` kropka · `0.01` chip.
Bez tej drabiny każde nowe tło dobierałoby alfę na oko, a różnica 0,06
wobec 0,10 jest w takim doborze nieodróżnialna.

**Szkło jest MALOWANE, nie rozmywane.** `backdrop-filter` ma u wzorca
**dokładnie jeden element na 1721**. Efekt szkła na 21 kartach robią trzy
warstwy bez rozmycia: płyta + obrys 1 px bieli + cień wewnętrzny.
`powierzchnia-szklo` wzięło **rolę, nie liczbę**: wzorzec używa najjaśniejszej
powierzchni swojej palety przy alfie 0,30; u nas tę rolę pełni
`powierzchnia-akcentowa`. Złożone na naszym tle daje kontrast **1,12:1** —
dokładnie ten sam stopień relacji co u wzorca.

**Zegar: jeden na całą stronę.** 200 ms + `cubic-bezier(0.4, 0, 0.2, 1)`,
59 z 81 elementów z przejściem (73%), zero innych krzywych, zero przejść
dłuższych niż 300 ms. Do tego **dwa gesty rozdzielone po roli elementu**:
rzecz klikana **unosi się o −2 px** (i dopiero pod naciskiem kurczy do 0,98),
rzecz będąca powierzchnią robi odwrotnie — **od razu docisk 0,98, bez
uniesienia**. Pomylenie ich odwraca komunikat: powierzchnia, która się unosi,
udaje przycisk.

## Rozstrzygnięcie 4 — odstęp sekcji dostaje próg 160 → 80

Nasza skala progowała dotąd wyłącznie **wcięcia**; odstęp pionowy sekcji
miał jedną wartość na każdą szerokość. Wzorzec do naśladowania istniał, ale
nie został użyty. Skutek zmierzony w `WWW/073` krok 3: strona główna miała
na kadrze 390 px **13 ekranów wysokości**.

Próg wchodzi mobile-first do **pięciu** modułów: `Filar`, `KartyFunkcji`,
`PasMozliwosci`, `CennikSkrot`, `Stopka`.

## Rozstrzygnięcie 5 — role korpusu jasnego wchodzą, ale są ZABLOKOWANE

Trzy role klimatu mieszanego: `powierzchnia-jasna` (#f2f2f2),
`tekst-na-jasnym` (#151515), `tekst-2-na-jasnym` (#565656). Dwie pierwsze
z §8.2 (Nexus) — Proactiv korpusu jasnego **nie ma**, jest jednolicie ciemny.

`tekst-2-na-jasnym` jest **wartością naszą**: §8.2 podaje dla tej roli
`#8b8b8b`, ale tamta liczba opisuje tekst drugorzędny na tle **ciemnym**.
Sprawdzone: `#8b8b8b` na `#f2f2f2` daje **3,04:1** — poniżej progu 4,5:1.
Wzięcie jej wprost byłoby przeniesieniem wartości z innej roli tylko
dlatego, że nazwa się zgadza.

⛔ **DWA BLOKERY — ZMIERZONE, NIEROZSTRZYGNIĘTE.** Zlecenie zakładało, że
„limonka na jasnym jako wypełnienie CTA, R-AKCENT-01 pilnuje z automatu".
**Oba człony tego zdania są nieprawdziwe:**

| para | zmierzone | próg | |
| --- | --- | --- | --- |
| `akcent` × `powierzchnia-jasna` | **1,43:1** | 4,5:1 (tekst) · 3:1 (plama) | ✘ |
| `fokus` × `powierzchnia-jasna` | **1,12:1** | 3:1 | ✘ |

Limonka na jasnym jest niewidoczna **także jako wypełnienie** — próg 3:1
z WCAG 1.4.11 to te same 1,43:1. Etykieta na limonce jest w porządku
(10,22:1), ale **kształt przycisku nie odcina się od tła**. Biała obwódka
fokusu znika, bo mechanizm `outline-offset`, który ratuje ją na ciemnym
(biel na tle 20,07:1), tutaj nie pomaga — tło też jest jasne.

A „z automatu" nie działa, bo lista `POWIERZCHNIE` w strażniku jest
**literalna**, nie czerpana ze zbioru ról: nowa powierzchnia nie wchodzi
tam sama.

**Dlatego `powierzchnia-jasna` NIE została dopisana do `POWIERZCHNIE`** —
dopisanie dałoby czerwień na stanie, w którym nic jeszcze nie jest zepsute
(korpusu jasnego nie ma w żadnej sekcji). Zamiast tego liczby i warunek
zdjęcia blokady stoją w komentarzu przy tej liście. **Sekcja jasna nie może
powstać, dopóki właściciel nie rozstrzygnie akcentu i fokusu na jasnym.**

⚠ Trzy role wchodzą **bez użycia** — świadomie i na wyraźne polecenie.
Odnotowuję odstępstwo od zasady z ADR-048 („ani jednego tokena, którego kod
nie używa"), żeby nie wyglądało na niekonsekwencję: tam zasada broniła przed
udawaniem, że §8.1 przeniesiono szerzej niż przeniesiono; tu role są
zapowiedzią batcha. Jeśli korpus jasny nie wejdzie do żadnej sekcji, mają
zniknąć razem z decyzją.

## Rozstrzygnięcie 6 — licznik ról 20 → 24 i STRAŻNIK WYŁĄCZEŃ

Cztery nowe role barwne. `LICZBA_ROL` idzie z 20 na 24 — to decyzja, nie
dryf, i dlatego stoi w ADR-ze.

Doszedł też **licznik wyłączeń**, którego nie było: kanon wymaga, żeby
„sprawdzane + wyłączone = komplet" i żeby „każde wyłączenie opisywało rolę,
która nadal istnieje". Do dziś wyłączona z par była **jedna** rola i luka
była widoczna gołym okiem; od tego ADR-a są **dwie** — i to jest moment,
w którym napis przestaje wystarczać.

**Licznik złapał lukę przy pierwszym uruchomieniu:** rola `akcent` nie była
ani w `PARY`, ani w wyłączeniach (jest pokryta osobną pętlą R-AKCENT-01) —
czyli przez cały czas siedziała w zbiorze poza jawnym rozliczeniem.

**Dowód mutacyjny, obie połowy naraz.** Przemianowanie roli `akcent` na
`akcent-WIDMO` zapaliło **oba** błędy w jednym przebiegu:
`LUKA W POKRYCIU: akcent` (rola straciła pokrycie) **oraz**
`WYŁĄCZENIE PRZETERMINOWANE: akcent-WIDMO` (wyłączenie opisuje rolę,
której nie ma). Stan przywrócony → zieleń.

## Rozstrzygnięcie 7 — drzwi w korytarzu (R1–R4)

Pomiar `WWW/073` krok 3 pokazał korytarz bez wyjść: między CTA hero
(ekran 0,12) a linkiem cennika (10,04) **ani jednego linku wychodzącego** —
a w tym przedziale leżą oba bóle, które strona nazywa. Dwanaście kotwic było
**celem bez drogi**. Podróż STRUKTURA nie miała na głównej ani jednego zdania.

- **R1** — pas trzech ścieżek pod hero (`PasSciezek`). Etykiety to
  **pierwsze zdania** istniejących `DlaKogo.s1_h2 … s3_h2`, ucięte
  mechanicznie, nie zredagowane. Nazwa pasa: istniejący `Nawigacja.dlaKogo`.
  **Zero nowych wyrazów w trzech językach.**
- **R2** — każdy filar dostaje drogę na swoją podstronę; etykiety to
  istniejące `FunkcjeIndeks.blokNLink`.
- **R3** — **premisa zlecenia nie zachodzi.** `CennikSkrot` **od dawna
  renderuje trzy karty, z Pro włącznie**, z ceną z migawki Stripe.
  Sprostowanie moje: w zwrotce `WWW/073` napisałem „skrót cennika wymienia
  tylko Starter i Growth, pomijając Pro" — miałem na myśli **zdanie**
  `CennikSkrot.roznica`, a zabrzmiało jak brak karty. Nic tu nie było do
  naprawy; wprowadzenie „karty Pro" byłoby dołożeniem drugiej.
- **R4** — zdanie STRUKTURY osiadło **w pasie R1**, nie przy filarze 4.
  Powód: pas jest miejscem, gdzie trzy podróże stoją obok siebie i mogą się
  porównać. Przy filarze 4 („Widzisz wzrost nawet po trudnym dniu")
  zdanie o wąskim gardle decyzji stałoby przy treści o wynikach, z którą nie
  ma związku.

⚠ **Trzeci adres w pasie jest inny niż dwa pierwsze i to nie jest
niedoróbka.** Ból podróży SAMA i LIDERKA strona główna nazywa u siebie, więc
ich drogi są kotwicami. Bólu STRUKTURY na głównej **nie ma** — jedyne zdanie
o nim żyje na `/dla-kogo`, więc tam prowadzi jej droga. Symetryczne trzy
kotwice wyglądałyby lepiej i kłamałyby o tym, gdzie ta treść jest.

### Naprawa, którą wymusił strażnik — i moja własna pomyłka po drodze

Karta ścieżki jest **elementem interaktywnym**, a takiemu WCAG 1.4.11 każe
mieć granicę ≥ 3:1. Sama plama daje 1,09:1 — tę samą liczbę, którą ADR-038
zna przy kartach biernych i **słusznie** puszcza, bo tamte rozdziela
kompozycja. **Kompozycja nie jest afordancją:** mówi „to osobny blok", nie
„to się klika".

Pierwsza próba naprawy — przywrócenie podkreślenia, które sam wcześniej
zdjąłem — **nie wystarczyła**: strażnik dalej meldował 1,09:1, bo mierzy
granicę pudełka, nie ślad pod tekstem. Dopiero obrys w `kreska-mocna`
(rola opisana wprost jako „obrys pola formularza, próg 3:1") zamknął
sprawę — 11,71:1 wobec tła. Obie próby zostają zapisane, bo druga bez
pierwszej wygląda na oczywistą, a nie była.

## Rozstrzygnięcie 8 — pilot głosu W2 (tylko pl, tylko strona główna)

Sześć kluczy strony głównej straciło rodzaj odbiorcy; „ty" zostaje.
Świat produktu (`klientka` jako kontakt, `liderka` jako rola) **nietknięty** —
to inna decyzja. `en`/`de` **nietknięte**.

⚠ **ZMIANA MUSIAŁA OBJĄĆ `content/`, NIE TYLKO `messages`.** Strażnik
`zlozenie.spec.ts` porównuje jedno z drugim **znak w znak**, a `content/`
jest źródłem prawdy o treści. Cztery pliki treści zmienione razem z i18n.

⚠ **DWIE PUŁAPKI ZŁAPANE PRZY PRACY, OBIE TEJ SAMEJ KLASY.** (1) `content/`
łamie wiersze **w środku fraz**, więc dopasowanie po pełnym zdaniu daje zero
tam, gdzie fraza jest — trzy zamiany trzeba było przepisać na krótsze,
niełamane kawałki. (2) Jedno zdanie (`jak daleko zaszłaś…`) występuje
w `pl.json` **dwa razy**: raz na głównej, raz na podstronie **poza zakresem** —
zamiana bez zawężenia kontekstu ruszyłaby obie. Skrypt zamian **przerywał bez
zapisu**, gdy liczba trafień ≠ 1; obie pułapki złapał właśnie ten warunek.

⚠ **BRAMKA DEKLARACJI (zapadka) — 10 → 3.** Zmiana brzmienia rozjeżdża
zadeklarowane w `content/` długości, a kanon wymaga, żeby korekta licznika
objęła **cały plik**, nie samą zmienioną linię. Poprawiono więc wszystkie
deklaracje w trzech plikach, które zlecenie i tak otwierało. Trzy pozostałe
rozjazdy leżą w plikach **poza zakresem** (`en/cennik.md`, `pl/naglowek.md`,
`pl/obawy.md`) i zostają — zakaz 8.

## Czego ten ADR NIE rozstrzyga

- **Korpusu jasnego nie ma w żadnej sekcji** — role czekają na
  rozstrzygnięcie dwóch blokerów (akcent i fokus na jasnym).
- **Glow bez tokenów** — świadomie, na polecenie: wraca przy hero
  w batchu A1, żeby nie produkować ról bez użycia.
- **Rodzaj na podstronach** — 29 kluczy pl poza zakresem pilota; `de` niesie
  39 kluczy przez rzeczownik (`Partnerin`), co jest **innym mechanizmem**
  i wymaga osobnej decyzji. Zmiana samego pl przy nietkniętym de sprawi, że
  trzy języki przestaną mówić to samo.
- **Progi układu wzorca (1024 / 768)** — nasze zostają 48rem/90rem;
  przeniesienie to przestawienie kilkunastu `@media`, nie dodanie tokena.
