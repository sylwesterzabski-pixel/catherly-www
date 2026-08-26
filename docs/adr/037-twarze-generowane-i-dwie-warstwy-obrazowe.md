# ADR-037: Twarze generowane i dwie warstwy obrazowe

Data: 2026-08-26. Status: **PRZYJĘTY (decyzja właściciela 2026-08-26,
formalizowana zleceniem `WWW/052` w odpowiedzi na zgłoszenie „NIE
OSADZAM" z `WWW/051`).**

Dwie reguły z rozdziału „Zakazy bezwzględne" w `CLAUDE.md` zmieniają
brzmienie. Oba stare brzmienia zostały w kanonie zachowane jako ślad —
reguła zmieniona bez śladu przestaje być regułą, a staje się bieżącym
zdaniem.

## Kontekst

`WWW/051` dostarczyło osiem kadrów fali 2 i zleciło ich osadzenie.
Wykonawca zatrzymał się przed osadzeniem, bo materiał uderzał w dwa
zakazy bezwzględne: jeden kadr niósł **twarz osoby**, a siedem
przedstawiało **ekrany urządzeń z panelami interfejsu**. Zakazy wiążą
każde zlecenie, także właściciela, więc zlecenie wróciło z pytaniem.

**To zadziałało tak, jak miało.** Zgłoszenie nie było odmową pracy —
było doprowadzeniem decyzji do właściciela, zanim materiał wszedł na
stronę. Właściciel rozstrzygnął obie reguły; poniżej ich nowa treść
i granice, których rozstrzygnięcie NIE przesuwa.

## Decyzja 1 — twarze wyłącznie generowane, zatwierdzane imiennie

Brzmienie źródłowe właściciela: *„mogą być z twarzami i ze wszystkim co
możliwe, aby strona oddała serce"*.

**Obowiązuje:** twarze osób **wyłącznie generowane** (osoby
nieistniejące), każdy kadr **zatwierdzany imiennie** przez właściciela.
**Zdjęcia realnych osób pozostają zakazem bezwzględnym.**

### Czego ta decyzja nie zdejmuje — i dlaczego nie mogła

Wizerunek realnej osoby to **dane osobowe i zgoda**. Tej granicy decyzja
właściciela nie rusza, bo nie leży ona po naszej stronie: kadr generowany
nie ma podmiotu, który mógłby zgody nie wyrazić — zdjęcie ma.

**Dlatego warunek „generowane" jest całą treścią tej reguły, a nie jej
formalnością.** Gdyby zdjąć ten warunek, zostałby zakaz bez przedmiotu.
I dlatego zatwierdzenie jest **imienne, per kadr** — nie hurtowe na falę:
hurtowa zgoda przepuściłaby przy okazji kadr, którego nikt nie obejrzał.

Kadr `hero-osoba-16x9` z fali 2 jest zatwierdzony imiennie (werdykt
właściciela „1,2,4").

## Decyzja 2 — dwie warstwy obrazowe, rozdzielone

Brzmienie źródłowe właściciela: *„z mockupów mają wyskakiwać możliwości
catherly w 3D"*.

**Obowiązują dwie warstwy:**

**(a) DOWÓD PRODUKTU** — literalne zrzuty **wyłącznie z Playwrighta** na
danych demo, bajt w bajt, z sumami SHA-256. **Tu nie zmienia się nic.**

**(b) DEKORACJA MARKETINGOWA** — stylizowane elementy 3D: świecące
panele, karty, wykresy **bez czytelnego tekstu**. Dozwolone jako język
wizualny mocy, **pod warunkiem że nie są podpisane ani prezentowane jako
zrzut produktu**.

### Duch starej reguły przeżywa w ROZDZIELENIU, nie w złagodzeniu

Stara reguła (`ADR-011`) broniła jednej rzeczy: **żeby odwiedzająca nie
wzięła dekoracji za dowód**. Nowa broni dokładnie tego samego, tylko
innym mechanizmem — **rozdziałem warstw zamiast zakazu jednej z nich**.

Bez trzech warunków wykonawczych zmiana zamieniłaby się w furtkę:

1. **Sekcje `features` trzymają obie warstwy jawnie rozdzielone.**
2. **W kodzie widać, który slot jest którą warstwą** — nie z nazwy pliku,
   tylko z konstrukcji.
3. **Dekoracja nigdy nie dostaje podpisu sugerującego, że pokazuje
   produkt.**

### Próba rozstrzygająca, stosowana przy KAŻDYM kadrze

> Czy odwiedzająca, patrząc na ten obraz, mogłaby uznać, że **tak wygląda
> aplikacja**?

Jeśli tak — to warstwa (a) i obowiązuje Playwright.

**Czytelny tekst w panelu jest granicą rozstrzygającą: napis, który da się
przeczytać, zamienia dekorację w twierdzenie.** Świecący prostokąt
z wykresem bez liczb jest ozdobą; ten sam prostokąt z czytelną etykietą
„Dziennik Planu Działania" jest zrzutem, tyle że zmyślonym — i wraca pod
warstwę (a).

## Decyzja 3 — barwa fokusu

> ⚠ **SPROSTOWANE 2026-08-26 przez ADR-039 i przez właściciela
> (`WWW/055` pkt 2). Akapit niżej zostaje w brzmieniu pierwotnym jako
> ślad — dwie jego liczby są nieścisłe:**
>
> - **„10,22:1 wobec limonkowego CTA"** opisuje kontrast **etykiety** na
>   CTA, nie obwódki fokusu. **Biel wobec limonki ma 1,60:1.**
> - **„zachowana rozdzielność trójki"** nie była prawdą: fokus różni się
>   od obu, ale `akcent == interakcja` (`#a0e00d`, konstrukcja wzorca).
>
> **Wybór bieli zostaje ważny — z innego powodu, niż tu zapisano:**
> obwódka pada na **tło** (20,07:1), bo odsuwa ją `outline-offset`.
> Wymóg rozdzielności trójki został usunięty; zastąpiły go dwa mierzone
> człony R-AKCENT-02 (ADR-039).
>
> Klasa błędu, nazwana przez właściciela: **liczba cytowana
> z poprzedniej zwrotki bez ponownego pomiaru.**

`fokus` = **`#ffffff`** (decyzja koordynatora z mandatu). Wybór
techniczny spełniający cel R-AKCENT-02, nie estetyczny: **20,07:1 wobec
tła `#070806`** i **10,22:1 wobec limonkowego CTA `#a0e00d`**, przy
zachowanej rozdzielności trójki `fokus` ≠ `akcent` ≠ `interakcja`.

Wzorzec ze zlecenia `WWW/050-FINAL` **nie deklaruje barwy fokusu wcale** —
ta wartość jest więc naszą, nie przeniesioną, i tak jest tu zapisana.

## Co ten ADR zmienia w ADR-011

ADR-011 („Obrazy generowane: tylko warstwa dekoracyjna, nigdy
pseudo-zrzuty") **zostaje w mocy co do warstwy (a)** i co do zasady, że
dowód produktu robi Playwright. **Traci moc zdanie „zakaz absolutny: nic,
co udaje zrzut z aplikacji"** w zakresie, w jakim obejmowało stylizowaną
dekorację 3D bez czytelnego tekstu. ADR-011 dostaje adnotację odsyłającą
tutaj; nie jest przepisywany.

## Konsekwencje operacyjne

- `WWW/051` może zostać wykonane po KROKU 2 z `WWW/050-FINAL`, **bez
  ponownego pytania o punkty 1–2** — rozstrzygnięte niniejszym.
- Każdy kadr fali 2 przechodzi próbę rozstrzygającą z decyzji 2 **przed**
  osadzeniem; kadr z czytelnym tekstem w panelu wraca z pytaniem.
- Manifest fali 2 wymienia **przy każdym kadrze, do której warstwy
  należy** — bez tego rozdzielenie żyje w cudzej głowie, a nie w repo.
