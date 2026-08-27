# ADR-047: Sekcje 2.3–2.9 strony głównej w geometrii wzorca

Data: 2026-08-27. Status: **PRZYJĘTY** (KROK 2, zlecenia `WWW/059`
i `WWW/060`). Domyka przebudowę strony głównej razem z ADR-045 (nawigacja)
i ADR-046 (hero).

## Zgodność zmierzona, sekcja po sekcji

| sekcja | wynik pomiaru |
| --- | --- |
| **2.3** karty funkcji | 5 szerokości: 3×370/30 · 3×384/24 · 3×298,7/24 · 3×227,3/24 · 1×350 — **wszystkie zgodne**; promień 9 px, padding 24 px, tytuł 24 px/500 |
| **2.4** filary | tekst 135/535 · obraz 770/535 · odstęp 100 · promień 12 · obrys 0 — **co do piksela** |
| **2.5** pas | **pl −75,0 px/s** przy R² 1,0 (wzorzec −75,0) · en −67,7 · de −71,1 |
| **2.6** cennik | 3×370 · odstęp 30 · promień 5 · padding 35/40 — **co do piksela** |
| **2.8** finał | padding 0/135/135 · nagłówek na 800 px · CTA 46,4 px, promień 50 |
| **2.9** wejście | zanik 330,9/332,6 ms wobec 334,9/348,1 · przesuw 247,7/249,8 wobec 251,0/266,7 |

## 2.3 — zero nowej treści, mapa zamiast duplikatu

Tytuł karty to **cytat z istniejącego klucza `*_nazwa`**, opis to jedno
**zatwierdzone zdanie**. Każda funkcja ma samodzielny klucz nazwy we
wszystkich trzech językach, więc cytat jest dosłowny — bez wycinania
z dłuższych zdań.

**Grupy `KartyFunkcji` w `messages` NIE utworzono**, choć zlecenie
pozwalało: przeniesienie ciągów zrobiłoby **dwa miejsca z tym samym
zdaniem**, a te rozjeżdżają się przy pierwszej korekcie — karta
pokazywałaby co innego niż podstrona, z której wzięto zdanie, i **oba
wyglądałyby poprawnie**.

**Jedyne odstępstwo od litery:** wśród dwunastu zdań `konkret` **nie ma
żadnego wymieniającego Pulpit** (sprawdzone w trzech językach). Wchodzi
`Filary.filar4.korzysc` — zdanie zatwierdzone, z tej samej sekcji,
nazywające Pulpit wprost.

**Dwie luki zgłoszone:** blok nie ma własnego nagłówka (każdy nasz
zatwierdzony nagłówek jest już zajęty przez inną sekcję) i karty są
**bez ikon** (wzorzec ma svg 18 × 10 w polu ~60 px; zestawu ikon nie
mamy, a dorysowanie to decyzja o materiale graficznym).

## 2.4 — czwarty mechanizm rozdziału kart

Zdjęcie obrysu ramek (wzorzec ich nie obrysowuje) **złamało regułę
trzech mechanizmów na kadrze mobilnym**: plama 1,09 · kreska 0,00 ·
odstęp 24 px przy progu 30.

Ramka, którą wypełnia zrzut od krawędzi do krawędzi, odcina się od tła
**własnymi pikselami** — reguła mierzyła barwę **tła** elementu i o
obrazie nie wiedziała.

**To nie jest złagodzenie.** Próg **90% pola** jest wysoki celowo:
obrazek ozdobny w rogu go nie osiągnie, a **niewczytany kadr ma
prostokąt zerowy** i też nie.

⚠ **Pierwsza mutacja była bezwartościowa.** Puściłem ją na **desktopie**,
gdzie zalicza kompozycja (odstęp kolumn 100 px), więc nowy mechanizm
w ogóle nie decydował. Powtórzona na mobile-390: `pokrycie obrazem 6%`
→ **czerwień**. Przywrócone: 8/8, SHA zgodna.

## 2.5 — prędkość wyliczona z drogi, nie dobrana

Maszt polski ma 2480,8 px; droga cyklu to połowa plus odstęp kopii =
1264,4 px. Przy zmierzonych −75 px/s daje to **1264,4 / 75 = 16,86 s**.
Pierwsza wersja miała 24 s i dawała **−52,7 px/s** — liczbę wziętą
z niczego.

**Granica konstrukcji, nazwana wprost:** CSS nie zna szerokości masztu,
więc czas musi być stały, a przy stałym czasie prędkość zależy od
długości treści. EN i DE odchylają się o 10% i 5%. Alternatywa — stała
szerokość pozycji — kupowałaby równą prędkość **kosztem ucinania nazw**.

Wzorzec przesuwa tam **logotypy partnerów**; u nas są zakazem
bezwzględnym, więc pas niesie **nazwy naszych możliwości**.

## 2.6 — sprostowany fałszywy cytat z ADR-003

W komentarzu `CennikSkrot` stało **„zero wyróżnień (ADR-003)"**.
**ADR-003 tego nie zawiera** — jego lista zamknięta wymienia wymuszanie
rejestracji, wyskakujące okna, sztuczną pilność, ukryte ceny, zmyślone
opinie i nierówność zgód na ciasteczka. O wyróżnianiu planu ani słowa.

Komentarz **przypisywał ADR-owi regułę, której w nim nie ma** — czyli
działał jak reguła bez źródła, a przy tym **blokowałby decyzję
właściciela, powołując się na dokument, który milczy**.

Plakietka: brzmienia **od koordynatora z mandatu** (źródło D2:A), **do
ewentualnej podmiany przy oglądzie właściciela**. Etykieta ciemna na
polu akcentu — **10,22:1** w każdym z trzech języków.

## 2.7 — sekcji opinii świadomie nie ma

Zlecenie dawało dwa wyjścia i wybór wykonawcy. **Wybrano ukrycie**,
z dwóch powodów:

1. **„Sześć obaw" stoi tuż niżej jako FAQ** — zasilenie nimi pasa
   opinii pokazałoby te same sześć par **dwa razy na jednym ekranie**;
   duplikacja czyta się jak usterka, nie jak zamysł.
2. Sekcja opinii ma nieść **cudze świadectwo**. Wypełniona **naszymi**
   odpowiedziami wygląda jak dowód społeczny i nim nie jest — to bliżej
   **pseudo-dowodu** niż pustego miejsca.

**Nie ma też komponentu zwracającego `null` za flagą:** kod, który
nigdy się nie wykonuje, psuje się po cichu. Warunek powrotu i pełne
uzasadnienie — rejestr, pozycja **T53**.

## 2.8 — tło stopki

Zmierzone we wzorcu: stopka ma **dokładnie tę samą barwę co reszta
strony** i nie odcina się plamą — rozdział niesie sama **kreska**. Nasza
miała tło powierzchni, czyli była jaśniejszym pasem: **różnica widoczna
od pierwszego spojrzenia**. Kreska zostaje jedynym rozdziałem i nie
wolno jej zdjąć „przy porządkowaniu".

## 2.9 — czasy zadeklarowane nie są czasami zmierzonymi

Pomiar 0.4 pokazał **różne** czasy dla przezroczystości i przesunięcia,
więc wejście rozdzielono na **dwie animacje**. Przy jednej tekst
dojeżdżał dokładnie wtedy, gdy kończył się zanik; we wzorcu jest już na
miejscu, gdy jeszcze blaknie. **Skala bez zmian**, tak jak we wzorcu.

Sonda wykrywa ruch **progiem zmiany na klatkę**, więc ucina ogon krzywej
`ease-out` — a **ucięcie zależy od kształtu krzywej** i jest różne dla
obu własności. Porównywalne są **wykryte** wartości po obu stronach: ta
sama sonda, ten sam próg.

| | zadeklarowane | wykryte u nas | wykryte we wzorcu |
| --- | ---: | ---: | ---: |
| zanik | 400 ms | 330,9 / 332,6 | 334,9 / 348,1 |
| przesuw | 420 ms | 247,7 / 249,8 | 251,0 / 266,7 |

Wpisanie **„340 ms, jak wzorzec"** byłoby **deklaracją udającą pomiar**
i wróciłoby przy pierwszym sprawdzeniu jako rzekomy defekt.

## Klasa, która wystąpiła PIĘĆ RAZY w tym kroku

Dodanie elementu powszechnego typu unieważnia strażniki celujące
w „pierwszy taki w dokumencie" — **i robi to cicho, bo asercja nadal ma
na czym pracować**:

| strażnik | co się stało |
| --- | --- |
| `cennik` | liczył **5 `details` zamiast 4** |
| `rozdzial-kart` | mierzył **hamburgera jako kartę FAQ** |
| `ruch` | stracił rodzinę „FAQ — znacznik", próg **8 → 7** |
| `filary` | **dwa `listitem`** z tym samym zdaniem DMO — tryb ścisły |
| `parytet-ui` | pozycje nawigacji **niewidoczne** w zwiniętym menu |

**Wszystkie naprawione zawężeniem lokatora albo doprowadzeniem strony do
stanu, w którym pytanie ma sens — żaden przez złagodzenie progu.**

Piąty przypadek jest osobny i wart nazwania: tam zderzenie zrobił nie
nowy **element**, tylko **powtórzony tekst**.
