# ADR-038: Paleta wzorca, trzy mechanizmy rozdziału karty, koniec warstwy inwersji

Data: 2026-08-26. Status: **PRZYJĘTY (rozstrzygnięcia właściciela
2026-08-26, zlecenie `WWW/054`, punkty 1–3).**

Zamyka trzy pozycje zgłoszone jako otwarte po pomiarze wzorca
(`WWW/050-FINAL`, KROK 0). Wszystkie wartości barwne pochodzą
z **odczytu** wzorca, nie z oka — pomiar w `docs/design/POMIAR-WZORCA.md`.

## Rozstrzygnięcie 1 — karty bez obrysu, rozdział trzema mechanizmami

### Pomiar, który wymusił zmianę

Wzorzec **nie obrysowuje kart w ogóle**: zmierzone zero obramowań i zero
cienkich pasów separatora na całej stronie. Karty (`#131412`) odcinają się
od tła (`#070806`) **samą plamą: 1,09:1**, czyli poniżej progu 1,30
z ADR-033 — i bez drugiego mechanizmu, bo kreski nie ma.

Rozdziela je **przestrzeń**: siatki kart mają `gap: 30px`, potwierdzone
geometrycznie (trzy grupy po trzy karty, odstępy zmierzone, nie odczytane
z deklaracji), przy promieniu 8–16 px.

### Decyzja

**Wierność wzorcowi wygrywa — kart nie obrysowujemy.** Reguła rozdziału
przechodzi z dwóch mechanizmów na trzy:

> Kartę odcina **PLAMA ≥ 1,30** ALBO **KRESKA ≥ 1,30** ALBO — w motywie
> ciemnym — **KOMPOZYCJA** (odstęp ≥ 30 px + promień > 0).

**Próg 1,30 był NASZĄ regułą wewnętrzną z audytu, nie normą WCAG** —
i dlatego wolno go uzupełnić o mechanizm, którego audyt nie znał.
Nie jest to poluzowanie: sprawdzane są **wszystkie trzy**, więc brak
wszystkich trzech dalej daje czerwień.

### Reguła przenosi się do warstwy e2e — i to jest sedno, nie szczegół

Trzeci mechanizm jest własnością **układu**, nie palety. Strażnik tokenów
nie widzi ani `gap`, ani geometrii siatki, więc **nie ma jak go zmierzyć**.
Zostawienie tam dwóch mechanizmów z trzech dawałoby **czerwień na stanie
poprawnym** (bo wzorzec rozdziela przestrzenią) — czyli strażnika
nadgorliwego, którego po tygodniu nikt nie czyta. „Przymknięcie" reguły
dawałoby **ciszę na stanie złym**.

Cała reguła mieszka więc w `e2e/rozdzial-kart.spec.ts`, gdzie na
wyrenderowanej stronie widać naraz barwy i odstępy.

### Dowód mutacyjny — trójstanowy, izolujący trzecią gałąź

Sama czerwień nie dowiodłaby niczego: karta FAQ ma obrys, więc niesie ją
mechanizm drugi. **Pierwsza próba mutacji (sam odstęp ścięty do 1 px)
została ZIELONA** i jest tu zapisana, bo pokazuje, czego mutacja nie
dowodzi, gdy trafia w niewłaściwy mechanizm.

| stan | wynik |
|---|---|
| obrys zdjęty **+** odstęp 1 px | **CZERWIEŃ** — `plama 1.09 · kreska 0.00 · odstęp 1 px, promień 8 px` |
| obrys zdjęty, odstęp **32 px** | **ZIELEŃ** — zmieniła się wyłącznie kompozycja |
| stan przywrócony | zieleń, SHA-256 pliku zgodna |

Środkowy wiersz jest **kontrolą pośrednią**: izoluje przyczynę do trzeciej
gałęzi, zamiast pokazywać, że „coś" zapaliło czerwień.

### Kolizja, która nie zachodzi

`kreska` i `powierzchnia-akcentowa` mają tę samą wartość `#393938` —
jedyną zmierzoną, która daje ≥1,30 jako linia. **Kolizja nie zachodzi, bo
role nie spotykają się na jednym elemencie**: obrysu kart nie ma, a
`#393938` zostaje separatorem tam, gdzie wzorzec go ma. Przypisanie do
S10 jest **tymczasowe** — rozstrzygnie je pomiar konkretnej sekcji
w KROKU 2.

## Rozstrzygnięcie 2 — cztery stany, wartości nasze i funkcjonalne

Wzorzec **nie deklaruje barw stanów**, bo jest makietą; nasz produkt je
ma i muszą działać. Wartości policzone pod czerń, **z zachowaniem odcienia
rodziny**, do progu ≥4,5:1 na obu powierzchniach:

| rola | było | jest | × karta | × tło |
|---|---|---|---|---|
| `stan-sukces` | `#2f6b46` (2,91 ✘) | **`#3e8e5d`** | 4,60 ✔ | 5,00 ✔ |
| `stan-ostrzezenie` | `#8a5a12` (3,13 ✘) | **`#ae7117`** | 4,55 ✔ | 4,94 ✔ |
| `stan-blad` | `#a32617` (2,51 ✘) | **`#e24634`** | 4,54 ✔ | 4,93 ✔ |
| `stan-wylaczony` | `#8b857b` (5,05 ✔) | **bez zmiany** | 5,05 ✔ | 5,48 ✔ |

**Czwarty stan został celowo nietknięty i to jest ustalenie, nie
przeoczenie.** Automatyczne szukanie „najbliższego odcienia spełniającego
próg" zwróciło dla niego `#847e74` — **4,59:1, czyli wartość GORSZĄ od
obecnej 5,05:1** — bo algorytm szedł od ciemnych i zatrzymywał się na
pierwszym trafieniu. Reguła mówi „spełniający próg", nie „ledwo
spełniający". Odrzucone przed zapisem.

Wszystkie cztery są oznaczone w tokenach jako **„wartość nasza,
funkcjonalna, spoza wzorca"** — dokładnie tak jak fokus.

## Rozstrzygnięcie 3 — warstwa inwersji usunięta

Wzorzec jest **jednolicie ciemny**; nie znaleziono ani jednej jasnej
sekcji. Rola bez przedmiotu to dług, więc warstwa schodzi.

⚠ **RÓL BYŁO SIEDEM, NIE SZEŚĆ.** Zlecenie wymienia sześć — te z ADR-032.
Siódma, `interakcja-aktywna-inwersji`, doszła później z **ADR-034**, przy
naprawie hovera. Usunięto wszystkie siedem: zostawienie jednej dałoby rolę
bez przedmiotu i bez pary w strażniku. **Rozjazd zgłoszony, nie
rozstrzygnięty po cichu.**

`LICZBA_ROL`: **26 → 19**. Z bloku `[data-ton]` w `globals.css` zniknęło
80 linii. Historia jest w gicie — gdyby weszła sekcja jasna, warstwa
wraca osobną decyzją, a nie odtwarzana z pamięci.

## Sprostowanie liczby, która weszła do decyzji o fokusie

Uzasadniając biały fokus w zwrotce `WWW/051` podałem **„10,22:1 wobec
limonkowego CTA"**. **To było błędne.** 10,22:1 to kontrast **etykiety**
(`tekst-na-interakcji`) na CTA. **Biały fokus wobec limonki ma 1,60:1** —
daleko poniżej 3:1 z WCAG 1.4.11.

**Wybór zostaje ważny, ale z innego powodu, niż podałem:** obwódka pada na
**tło strony** dzięki `outline-offset`, a tam biel ma **20,07:1**. To ten
sam mechanizm, który uzasadniał fokus w palecie „kancelaria" (para
fokus × interakcja miała tam 1,55:1) — i dokładnie dlatego odsunięcie jest
obowiązkowe, a nie ozdobne.

Obie liczby zostają widoczne; korekta bez zamazania śladu.

## Dwie czerwienie zostawione JAWNIE, zgodnie ze zleceniem

Zlecenie mówi: *„para wzorca poniżej WCAG → NIE poprawiaj po cichu"*.
Poniżej dwie kolizje **naszych reguł z wyborami wzorca** — obie zostają
czerwone do decyzji:

**R-AKCENT-02 — `akcent` == `interakcja` (`#a0e00d`).** Tak jest we
wzorcu. Reguła powstała, bo obwódka fokusu na wypełnieniu CTA miała 1:1.
**Cel reguły nie jest tu zagrożony** — fokus jest biały i pada na tło —
ale **litera jest łamana**. Uwaga do `WWW/052` pkt 3: zdanie
„rozdzielność trójki zachowana" jest **nieścisłe** — `fokus` różni się od
obu, ale `akcent` i `interakcja` są sobie **równe**.

**R-AKCENT-01 — akcent niesie tekst.** Wzorzec używa limonki jako tekstu
**16 razy**. Reguła powstała z pomiaru **2,87:1 na JASNYM tle**; na czerni
akcent ma **12,58:1 wobec tła** i **11,58:1 wobec karty**, więc przeszkody
nie ma. Strażnik zapala się dziś na znaczniku „+" w FAQ.

Obie wymagają rozstrzygnięcia: przepisać regułę na warunek **kontrastowy**
zamiast zakazu barwy, czy zostawić czerwień.
