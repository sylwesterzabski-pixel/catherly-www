# ADR-056: Kadr szeroki w bramce (T57), powrót duetu K3, batch A5 — cennik-skrót, obawy, zamknięcie

Data: 2026-09-04. Status: **PRZYJĘTY** (zlecenie `WWW/081`, kroki 1–3).

Pomiar celowany 04.09.2026 (Playwright, kadry 1440 / 810 / 390, klucz
`viewport`). **Każde zero w tym dokumencie ma kontrolę pozytywną** —
zjawisko, którego brak ogłaszam, było szukane narzędziem, które w tym
samym przebiegu znalazło coś innego.

⚠ **Numeracja sekcji w zleceniu przesunięta o jeden** (podaje S10/S11/S12
dla cennika-skrótu, obaw i zamknięcia; mapa ADR-051 ma tam S11/S12/S13).
Nazwy są jednoznaczne, więc wykonanie nie było zagrożone — odnotowuję,
żeby przy następnym zleceniu nie liczyć od przesuniętej podstawy.

---

## Rozstrzygnięcie 1 — T57 ZAMKNIĘTE: trzeci projekt e2e, kadr 1440

Pozycja powstała w ADR-055 z **mutacji, która nie zadziałała**: `order: 2`
wstawione do bloku `@media (min-width: 90rem)` miało dać czerwień, a suita
dała 18 passed. Przyczyna: `devices["Desktop Chrome"]` to **1280 × 720**,
a nasz górny próg to **1440**, więc żaden przebieg nie wchodził w reguły
tego progu.

Zlecenie wskazało drogę (a) — pełny trzeci projekt. `playwright.config.ts`
dostał **`desktop-wide` 1440 × 900**.

### Dowód OBUSTRONNY, jeden przebieg

| | `mobile-390` | `desktop` (1280) | **`desktop-wide` (1440)** |
| --- | --- | --- | --- |
| mutacja `order: 2` w bloku 90rem | zielony | zielony | **CZERWONY** |
| po cofnięciu | zielony | zielony | zielony (27 passed) |

**To jest dokładnie ta sama mutacja, która wcześniej milczała.** Nowy kadr
widzi to, wobec czego dwa stare są ślepe; stare nie dostały regresu.

### Koszt bramki — ZMIERZONY, nie oszacowany

| | przebieg 1 | przebieg 2 | przypadków |
| --- | --- | --- | --- |
| przed | **49,24 s** | **50,46 s** | 672 |
| po | **83,20 s** | **110,06 s** | **1000** |

⚠ **Uczciwą postacią kosztu jest „około dwukrotność", nie jedna liczba.**
Rozrzut po zmianie jest szerszy (1,32× wobec 1,02× przed), więc pojedyncza
wartość mówiłaby o zapasie, którego nie widać z jednego pomiaru — ta sama
reguła, która przy LCP uratowała nas przed ogłoszeniem fałszywego regresu.

**Dlaczego droga (a), a nie (c).** Przestawienie kadru istniejącego
projektu `desktop` na 1440 byłoby darmowe czasowo, ale **przesunęłoby cały
dzisiejszy dowód**: wszystkie asercje desktopowe stoją na 1280 i wymagałyby
przeliczenia. Tańsza droga kosztowałaby unieważnienie zieleni, którą już
mamy.

⚠ **Poprawka wykryta przy pierwszym przebiegu w nowym projekcie:**
komunikaty strażnika filarów niosły wpisane na sztywno słowo „desktop"
i przy upadku na 1440 kierowałyby szukającego **na zły kadr**. Etykiety
biorą teraz nazwę projektu z `testInfo`.

## Rozstrzygnięcie 2 — duet K3 wraca

ADR-055 zerwał duet: pomiar dał dla zdania prowadzącego bloku feature
18 px / 700, a duet niesie 20 px / 600. Wybrano wtedy pomiar (tego żądało
zlecenie) i **zgłoszono koszt** — lead i „kropka" miały wedle handoffu K4
mówić jednym głosem z jednego miejsca.

Koordynator rozstrzygnął: **głos ważniejszy niż liczba**. Zmierzone po
przywróceniu, na obu kadrach:

| | 1440 | 390 |
| --- | --- | --- |
| kropka S3 | **20 px / 600** | **20 px / 600** |
| zdanie prowadzące filaru | **20 px / 600** | **20 px / 600** |

Sześć elementów strony niesie klasę duetu.

⚠ **Czego przywrócenie NIE cofa: odstępów.** `margin-top: 8 px` pochodzi
z pomiaru wzorca i z duetem nie ma nic wspólnego — duet niesie wyłącznie
rozmiar i wagę. Tokeny `tekst.lead` i `interlinia.lead` **zostają w skali
i dostały użycie w tym samym batchu** (cena karty planu), więc zasada
„ani jednego tokena bez użycia" jest spełniona bez wyjątku.

**T56 bez zmian** — zakaz 8; martwa deklaracja odstępu kropki czeka.

## Rozstrzygnięcie 3 — karty planów

| | wzorzec | nasze do 04.09 | po zmianie |
| --- | --- | --- | --- |
| wypełnienie | **32 px** | 35 / 40 | **32** ✓ |
| promień | **12 px** | 5 | **12** ✓ |
| obrys | **1 px, widoczny** | 1 px przezroczysty | **1 px `kreska`** ✓ |
| cena | **18 / 500 / lh 28** | dziedziczona, 16 | **18 / 500 / 28** ✓ |
| odstęp siatki | 16 / 40 | 30 na każdym kadrze | **16 / 40** ✓ |

⚠ **OBRYS PRZESTAJE BYĆ PRZEZROCZYSTY — pomiar odwrócił własny zapis.**
Stało tam „wzorzec kart nie obrysowuje"; pomiar celowany pokazał obrys
jednopikselowy na 21 z 21 kart. **Mechanizm równych wymiarów zostaje bez
zmian:** karta polecana nadal tylko podmienia barwę obrysu, więc trzy
karty stoją równo.

### ⚠ PLAKIETKI WZORZEC NIE MA — i to jest zero SPRAWDZONE

Zlecenie prosiło o „geometrię plakietki wzorca". Sonda zbierała **każdy**
mały element z własnym tłem, promieniem i krótkim tekstem. Znalazła ich
**28** — i wszystkie okazały się czym innym: przyciski („Book a demo",
„Get Started"), chipy panelu demonstracyjnego („Twitter post", „Email
Campaign"), podpowiedź klawisza („esc"). **Ani jednej plakietki przy
karcie cennika.**

Nasza plakietka „polecany" zostaje bez zmian — nie ma czego przenieść ani
do czego dostroić. Zmierzone: 195 × 30 px, promień 50, 14 px / 500,
etykieta na polu akcentu **10,22:1**.

## Rozstrzygnięcie 4 — obawy: wzorzec NIE MA akordeonu, nasza mechanika zostaje i jest lepsza

| | wzorzec | u nas |
| --- | --- | --- |
| `details` | **0** | **6** |
| `aria-expanded` na kontrolce | **brak** | niepotrzebne — stan niesie `details` |
| `cursor` na przodkach pytania | `auto` (4 poziomy) | `pointer` na `summary` |
| pytanie | 16 px / 700, wiersz 56 px | — |
| rytm pytań | co 96 px → odstęp **40 px** | 8 px między kartami |

**Zero sprawdzone kontrolą pozytywną:** ta sama sonda znalazła 10 pytań,
8 przycisków i 28 małych elementów z tłem. Akordeonu tam nie ma —
odpowiedzi nie są widoczne w toku (kontener 704 × 1000 na dziesięć pytań),
ale chowa je coś, co **nie jest ani `details`, ani `aria-expanded`**.

⚠ **Przenoszenie stamtąd mechaniki byłoby zamianą dostępności na wygląd.**
Zlecenie mówi wprost: brak odpowiednika → nasza mechanika zostaje. Ze
wzorca bierzemy wyłącznie odstępy, i tylko te z drabiny 1g:

| | przed | po |
| --- | --- | --- |
| wypełnienie karty | 12 / 16 | **16** (12 nie ma na drabinie) |
| wypełnienie `summary` | 4 | **8** |
| odstęp akapitu odpowiedzi | 8 / 4 | **8 / 0** |
| promień karty | 8 | **12** |
| rytm sekcji | 40 na każdym kadrze | **80 / 160** |

### ARIA i klawiatura — POMIAR, nie deklaracja

| co zmierzono | wynik |
| --- | --- |
| pozycji `details` | **6**, otwartych na starcie **0** |
| dojście `Tab` do `summary` | **tak, w 16 krokach** |
| `Enter` na `summary` | **1 otwarta**, odpowiedź **widoczna** |
| fokus po otwarciu | **zostaje na `summary`** |
| `Enter` po raz drugi | **0 otwartych** — zamyka |
| `aria-expanded` / `role` | **`null` / `null`** — i tak ma być |

⚠ **Brak `aria-expanded` NIE jest tu luką, tylko poprawnością.** Natywny
`details` niesie stan rozwinięcia sam; dokładanie ARIA do elementu, który
ma semantykę wbudowaną, jest częstym sposobem na jej **zepsucie**. To
zdanie stoi tu z liczbą obok, bo bez pomiaru brzmiałoby jak wymówka.

## Rozstrzygnięcie 5 — blok zamknięcia

| | wzorzec | nasze do 04.09 | po zmianie |
| --- | --- | --- | --- |
| rytm sekcji | — | 0 góra / 135 dół | **80 / 160** ✓ |
| odstęp zdania od nagłówka | **32 px** | 20 | **32** ✓ |
| odstęp podpisu od przycisku | — | 16 | **16** (token) |
| podpis | **14 / 400 / lh 20** | 14 ✓ | ✓ |
| przycisk | **166 × 46 · r 6 · 18 / 500** | 176 × 46 · r 8 · 14 / 500 | **bez zmian** |

⚠ **PRZYCISKA NIE RUSZAM I MÓWIĘ DLACZEGO.** Nasze CTA jest parą 1:1
z CTA hero (K2) i z pigułką nawigacji — **wysokość 46,4 px, którą ADR-052
wpisał do tokena wysokości paska, wychodzi właśnie z tego przycisku**.
Zmiana rozmiaru etykiety w jednym z trzech miejsc rozspaja parę
i przelicza pasek nawigacji, czyli jest osobną decyzją, nie szczegółem
batcha. **Zgłoszone z liczbami; wysokość 46 wzorca i nasze 46,4 to
w praktyce ta sama liczba** — różnica z zaokrąglenia `rem`.

⚠ **Odstęp GÓRNY bloku zamknięcia wchodzi z zera na 160 px** i to jest
zmiana świadoma: u wzorca blok zamknięcia jest osobnym blokiem z własnym
oddechem, a nie ogonem sekcji nad nim.

## Rozstrzygnięcie 6 — styki stref bez zmian

Bez gradientów-mostów; jedyne gradienty w okolicy to poświata dekoracyjna
**wewnątrz** bloku zamknięcia (`aria-hidden`, pod treścią) i placeholder
slotu foto. Sprawdzone ponownie, stan zastany.

## Podróże — batch wydłużył stronę o 302 px

Kontrola negatywna w jednym przebiegu (`git stash` + przebudowa, kadr 390):

| | PRZED (`92d8d23`) | PO (A5) | różnica |
| --- | --- | --- | --- |
| wysokość strony | 10 944 px | **11 246** | **+302 px** |
| ekranów | 12,97 | **13,32** | +0,35 |
| ból LIDERKA | 7,02 | 7,08 | +0,06 |
| największa luka | 3,89 | 3,91 | +0,02 |

**Przyczyna policzalna i w całości rytmiczna:** sekcja obaw szła
z 40 px na 80 (kadr wąski), a blok zamknięcia z 0 góra na 80. Bóle
i luka praktycznie bez zmian — urósł oddech, nie droga.

## Pomiary domykające

| | wynik |
| --- | --- |
| pełny zestaw e2e (**3 projekty**) | **1000 passed · 0 failed**, 73,58 s |
| axe (3 projekty) | **90 passed** |
| bramki statyczne | tokeny (30 ról) · liczby · parytet · kotwice · linki · no-JS · deklaracje — ZIELONE |
| zastane czerwienie | ESLint · kontrakt ΔE · Nieodwracalne · Wydajność |
| **LCP** | **mediana 40 ms** z pięciu przebiegów (40 · 36 · 40 · 52 · 48) |
| obrys karty planu × wypełnienie | **1,60:1** (próg 1,30) |
| cena × wypełnienie karty | **18,48:1** |
| nazwa planu × wypełnienie karty | **18,48:1** |
| plakietka: etykieta × pole | **10,22:1** |

## Czego ten ADR NIE rozstrzyga

- **Rozmiaru etykiety CTA** — wzorzec 18 px, my 14; zmiana rozspaja parę
  z hero i paskiem, decyzja osobna.
- **T56** — martwa deklaracja odstępu kropki, nietknięta (zakaz 8).
- **Zebry w `ModulFunkcji`** — cztery podstrony funkcji, inny batch.
- **Miar sekcji obaw i zamknięcia** — zlecenie objęło odstępy, nie
  szerokości; `kontener-strony` i `miara-kolumny` tam zostają.
- **Pasma 1024–1439** — wzorzec przełącza układ na 1024, my na 1440.
