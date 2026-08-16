# ADR-014 — Zakres zamrożony Iteracji 1

Pełny tekst decyzji: PLAN.md, sekcja 11.

## Kontekst
Układ przyjęty: strona żywa z programem pierwszych użytkowniczek tak
szybko, jak pozwala rzemiosło — ani dnia dłużej. Wszystko poniżej kreski
trafia do publicznego /zmiany po starcie, nie do zakresu startu.

## Decyzja

### W zakresie startu (blokuje publikację)
**Strony:** główna (sekcje 16–26 **bez** sekcji dowodu — pkt 22 mówi
jasno: dopóki nie ma prawdziwych historii, sekcji nie ma) · /funkcje jako
jedna strona przeglądowa z czterema blokami (bez czterech podstron
szczegółowych) · /cennik pełny · /bezpieczenstwo (decyduje u ostrożnych —
zostaje w całości) · /pomoc w wersji minimalnej: pierwsze kroki + kontakt
z realnym czasem odpowiedzi · /kontakt · dokumenty prawne (regulamin,
prywatność, ciasteczka, przetwarzanie danych — z prawem odstąpienia
i cenami brutto per ADR-012) · ścieżka zakupu: /rejestracja → płatność →
/witaj → app, plus /logowanie i /odzyskiwanie-hasla · /zmiany (żywy od
dnia startu — pierwszy wpis to sam start) · /status w wersji prostej.

**Jakość (nienegocjowalne):** wszystkie bramki z sekcji 5 PLAN.md · trzy
języki z parytetem · warstwa rzemiosła: system ruchu w tokenach,
mikrotypografia per język, inwentarz stanów w DoD, ciepła jakość per
ADR-013 · e-maile transakcyjne w design systemie · ścieżka nieszczęśliwa
(odrzucona karta, 404 ×3 języki).

**Równolegle od dziś (nie po starcie):** program pierwszych
użytkowniczek — rekrutacja ograniczonej grupy na preferencyjnych
warunkach w zamian za udokumentowane historie po 60–90 dniach.

### Poza zakresem startu (do /zmiany, kolejność wg pomiaru)
Cztery podstrony filarów · /dla-kogo · /o-catherly · /blog · demo
interaktywne · /integracje · strony porównań (vs zeszyt/Excel, vs CRM)
· kalkulator czasu · darmowe narzędzie-magnes · webinary i nagrania
· element podpisu w wersji rozbudowanej (na start: jedna prosta wersja
gestu troski, reszta iteracyjnie).

### Definicja startu
Strona jest gotowa do publikacji, gdy: (1) wszystkie bramki zielone na
zakresie startu, (2) E2E cennik→płatność→konto→aplikacja zielony,
(3) audyt pięciu soczewek bez blokad, (4) program pierwszych
użytkowniczek ma otwartą rekrutację. Nic więcej nie wstrzymuje publikacji.

## Konsekwencje
Każde „jeszcze tylko jedno" po tej dacie wymaga ADR-a, który jawnie
uchyla niniejszy ADR-014.

## Doprecyzowanie 2026-08-14 — /pomoc bez liczbowej obietnicy czasu

Decyzja właściciela z 2026-08-14. Zakres /pomoc na start to **pierwsze
kroki + FAQ ponadcennikowe + kontakt** — suma pozycji z niniejszego ADR-a
i DECYZJI F4-4a (docs/faza-4/PLAN-FAZY-4.md) — ale **bez liczbowej
obietnicy czasu odpowiedzi**.

Powód. Zapis z 2026-08-06 brzmiał „/pomoc w wersji minimalnej: pierwsze
kroki + kontakt **z realnym czasem odpowiedzi**". Człon o czasie czyta się
jak zapowiedź konkretnej liczby („odpowiadamy w 24 h", „do 2 dni
roboczych"). Ta liczba nie ma dziś pokrycia operacyjnego: nie ma dyżuru,
nie ma pomiaru czasu odpowiedzi i nie ma nikogo, kto by ją egzekwował.
Wobec ADR-018 („nigdy nie obiecujesz na stronie tego, czego aplikacja nie
robi"; „brak dowodu = brak zabezpieczenia") liczba bez pomiaru jest
obietnicą niepokrytą i na stronę nie wchodzi.

W jej miejsce wchodzi **formuła miękka**, ustalana przez panel treści,
z **zerem liczb** — bez godzin, bez dni roboczych, bez widełek, bez
„zwykle" z liczbą. Zobowiązanie liczbowe (SLA) wraca po premierze, kiedy
będzie z czego je policzyć; wtedy osobnym doprecyzowaniem albo ADR-em.

Status członów po tej korekcie: „pierwsze kroki" — bez zmian. „kontakt" —
bez zmian co do istnienia, zawężony co do formy (zero liczb). „FAQ
ponadcennikowe" — pozycja **dodana** względem 2026-08-06.

### Do rozstrzygnięcia przez właściciela (nie rozstrzygam sam)

> **Oba pytania rozstrzygnięte 2026-08-15.** Nr 1 — przez wycofanie
> rozszerzenia, a następnie przez wycofanie całej `/pomoc`
> (doprecyzowanie III). Nr 2 — przez doprecyzowanie II: pięć adresów
> wchodzi do zakresu startu, T5 zamknięte. Treść pytań zostaje poniżej
> bez zmian jako zapis stanu z 2026-08-14.

1. Sekcja „Konsekwencje" wyżej wymaga, by każde rozszerzenie zakresu
   miało ADR jawnie uchylający ADR-014. „FAQ ponadcennikowe" jest
   rozszerzeniem, a zostało zapisane tutaj jako doprecyzowanie na
   polecenie właściciela. Jeśli forma ma być ADR-em uchylającym — tu jest
   miejsce, w którym go brakuje.
2. Ta sama sekcja obejmuje pozycje, które Faza 4 już zbudowała, a które
   ADR-014 umieszcza **poza** zakresem startu: cztery podstrony filarów
   oraz /dla-kogo (Etapy C i D gałęzi faza-4/podstrony). Nie znalazłem
   ADR-a uchylającego ten punkt; ADR-024 zmienia kolejność prac, nie
   zakres startu. Do rozstrzygnięcia, czy te strony wchodzą do zakresu
   startu (wtedy potrzebny ADR uchylający), czy powstały przed startem,
   ale publikują się dopiero przez /zmiany. Odnotowane w rejestrze
   warunków powrotu jako pozycja T5.

## Doprecyzowanie 2026-08-15 (I) — /pomoc zmienia gatunek, FAQ wypada

> **UCHYLONE tego samego dnia** przez doprecyzowanie 2026-08-15 (III):
> `/pomoc` wypada z zakresu startu w całości. Sekcja zostaje w pełnym
> brzmieniu, bo historia decyzji jest częścią produktu (docs/adr/README.md)
> — czyta się ją jako etap, nie jako stan obowiązujący.

Decyzja właściciela z 2026-08-15, po dwóch werdyktach adwersaryjnych
NIE PRZECHODZI na propozycji treści z Etapu E.

**Co ustaliła ocena adwersaryjna** (przyjęte przez właściciela jako
zasadne, oba zawalenia):
- Około 40 z ~47 zdań propozycji było już opublikowane gdzie indziej —
  m.in. dosłowne powtórzenia z `/dla-kogo` (ścieżka 1) oraz trzeci
  przebieg cyklu dnia, niesionego już przez `/` i H1 `/funkcje`.
- Każdy krok miał człon „Czego nie robi", co odtwarzało moduł K12 —
  a to czyni z `/pomoc` **piątą podstronę filarową w przebraniu**,
  czyli rozszerzenie zakresu obok ADR-014, nie doprecyzowanie.
- Sekcja kontaktu niosła trzy piętra zapowiedzi, liczebnik słowny bez
  pokrycia w `facts.json` oraz zdanie presuponujące, że odpowiedź
  istnieje — zobowiązanie mocniejsze niż liczba, którą poprzednie
  doprecyzowanie właśnie wycięło.

**Decyzja: `/pomoc` istnieje, ale jest stroną krótką i nawigacyjną,
nie kompilacyjną.** Zakres na start:

1. **Pierwsze kroki** — 2–3 zdania własne (nie przeszczepy z innych
   podstron) plus zdanie o logowaniu przy premierze **w ciągu kroków**,
   nie w osobnym FAQ. Fakt źródłowy: `StronaLogowania.tresc`
   („Logowanie będzie dostępne przy premierze aplikacji.").
2. **Zamiast FAQ — drogowskazy**: linki do odpowiedzi, które już
   istnieją (`/cennik` — płatności, `/funkcje` — dzień pracy), z **zerem
   kopiowania zdań**. Strona ma kierować, nie powtarzać.
3. **Kontakt = stan faktyczny**, ten sam co w stopce („wkrótce"), bez
   presupozycji, że odpowiedź istnieje, i bez pięter zapowiedzi.

Uzasadnienie właściciela: *„Krótkość jest cechą, nie brakiem — strona
pomocy przedpremierowej nie ma prawa być długa."*

**Skutek dla pytania otwartego nr 1 wyżej.** Człon „FAQ ponadcennikowe",
dopisany 2026-08-14 jako rozszerzenie bez ADR-a uchylającego, zostaje
**wycofany**. Po tej korekcie zakres `/pomoc` mieści się w zapisie
pierwotnym z 2026-08-06 („pierwsze kroki + kontakt"), zawężonym o człon
liczbowy — jest **węższy**, nie szerszy. ADR uchylający dla `/pomoc`
przestaje być potrzebny; pytanie nr 1 uznaje się za rozstrzygnięte przez
wycofanie rozszerzenia, nie przez jego sankcję.

**Pytanie otwarte nr 2 (T5) zostaje otwarte.** Właściciel odnotował
2026-08-15, że „piąta podstrona" jest bezprzedmiotowa — i to jest
prawdą **wyłącznie o `/pomoc`**: nowy gatunek nie tworzy szóstego bytu
filarowego. Sam T5 dotyczy czegoś innego — czterech podstron filarów
i `/dla-kogo`, które **już istnieją** i są w tym ADR-ze wymienione poza
zakresem startu. Tego rozstrzygnięcie z 2026-08-15 nie dotyka i nie
zamyka; zapisuję wąsko, bo szerokie odczytanie zamykałoby lukę
ADR-014 bez decyzji, która by ją zamykała.

## Doprecyzowanie 2026-08-15 (II) — filary i /dla-kogo w zakresie startu

*(zamknięcie pytania otwartego nr 2 wyżej oraz pozycji T5 rejestru)*

Decyzja właściciela z 2026-08-15. **Pytanie otwarte nr 2 wyżej zostaje
rozstrzygnięte: cztery podstrony filarów oraz `/dla-kogo` WCHODZĄ do
zakresu startu.** Sekcja „Poza zakresem startu" przestaje je obejmować.

Uzasadnienie właściciela: strony **istnieją** — powstały w Etapach C i D
gałęzi `faza-4/podstrony`, są opublikowane w trzech językach, mają testy
i przechodzą bramki. Rozbieżność między tym stanem a literą ADR-014 jest
**luką formalną**, nie sporem o zakres: nikt nigdy nie postanowił, że
mają czekać na `/zmiany`. Decyzja zapisuje stan faktyczny, zamiast go
kwestionować.

Skutek dla pozostałych pozycji sekcji „Poza zakresem startu": **żaden**.
`/o-catherly`, `/blog`, demo interaktywne, `/integracje`, strony
porównań, kalkulator czasu, narzędzie-magnes, webinary i rozbudowany
element podpisu **pozostają poza zakresem startu**. Rozstrzygnięcie
dotyczy dokładnie pięciu adresów i nie jest precedensem dla reszty listy.

**Odnotowanie formy (nie zastrzeżenie do treści).** Sekcja „Konsekwencje"
wyżej żąda, by każde rozszerzenie zakresu miało ADR jawnie uchylający
ADR-014, a to rozstrzygnięcie zakres **poszerza** o pięć adresów.
Właściciel wybrał formę doprecyzowania i nazwał rzecz po imieniu („luka
formalna"). Zapisuję to zdanie, żeby przyszły czytelnik nie musiał
odtwarzać rozumowania: jeżeli forma ma kiedyś być ADR-em uchylającym, to
jest miejsce, w którym go brakuje. Nie wstrzymuje to niczego.

Pozycja **T5** rejestru warunków powrotu (docs/faza-2/) zostaje tym
**zamknięta**.

## Doprecyzowanie 2026-08-15 (III) — /pomoc wypada z zakresu startu

Decyzja właściciela z 2026-08-15, po **trzecim** komplecie werdyktów
adwersaryjnych NIE PRZECHODZI (trzej adwersarze o rozłącznych
soczewkach, 27 zarzutów, 9 blokujących — docs/faza-4/etap-e-pomoc-decyzje.md).

**`/pomoc` NIE WCHODZI do zakresu startu.** Doprecyzowania (I) z tego
samego dnia i z 2026-08-14 zostają tym uchylone w części dotyczącej
`/pomoc`; zapis pierwotny z 2026-08-06 („/pomoc w wersji minimalnej:
pierwsze kroki + kontakt z realnym czasem odpowiedzi") **przestaje
obowiązywać**. Adres `/pomoc` nie powstaje w tym wydaniu, nie wchodzi do
`ISTNIEJACE_SCIEZKI` i nie pojawia się w mapie strony w stopce.

Powód, słowami właściciela: *„Krótkość była cechą, pustka nie jest."*
Trzecia runda treści zeszła do ośmiu zdań, rozbroiła wszystkie miny
poprzednich rund — i mimo to zawaliła na trzech osiach, których
skrócenie nie dotyka. Po uhonorowaniu każdego dowiedzionego zarzutu
z propozycji zostawały H1, dwa zdania i jeden drogowskaz, przy mapie
strony w stopce niosącej te same adresy **na tej samej stronie, w tym
samym wydaniu**.

Trzy fakty, których nie było przy decyzji (I) i które ją przewróciły:
1. Mapa stopki (DECYZJA F4-5) wchodzi tym samym wydaniem i niesie
   komplet adresów — sekcja drogowskazów jest jej podzbiorem.
2. Sekcja kontaktu dawała **drugi `<h2>Kontakt</h2>`** w jednym
   dokumencie: stopka renderuje się z layoutu na każdej stronie.
3. Drogowskaz do `/funkcje` wisiał na T5, wówczas nierozstrzygniętym.

**Warunek powrotu** (zapisany w rejestrze warunków powrotu jako T8):
`/pomoc` wraca **po premierze**, z własną treścią **z odczytu** — realne
pytania użytkowniczek zamiast domysłów, istniejący kanał kontaktu
zamiast stanu „(wkrótce)", i onboarding, który został przetestowany,
a nie zapowiedziany. Do tego czasu strona nie ma czym być.

Ocena właściciela co do przebiegu: *„Trzy rundy paneli = system
zadziałał, nie zawiódł."* Odnotowane, bo dotyczy protokołu, nie treści:
adwersarz zatrzymał publikację strony, która przeszłaby wszystkie bramki
techniczne — bramki mierzą wykonanie, nie sens.

## Data
2026-08-06. Doprecyzowania: 2026-08-14, 2026-08-15 (I), 2026-08-15 (II),
2026-08-15 (III).
