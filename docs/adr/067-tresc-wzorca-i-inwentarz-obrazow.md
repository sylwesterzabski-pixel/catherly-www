# ADR-067: Treść wzorca, rejestr godzin scenariusza i inwentarz obrazów

Data: 2026-09-06. Status: **PRZYJĘTY W CZĘŚCI** (zlecenie `WWW/093`:
**krok 3 wykonany, krok 4 w części; KROK 1 ZABLOKOWANY, KROK 2 zmierzony
i świadomie NIEWYKONANY** — patrz §1 i §2).

---

## 1. ⚠ KROK 1 ZABLOKOWANY — brakuje pełnych nazw plików

Zlecenie podaje dziewięć bitmap nazwami **urwanymi po ośmiu znakach UUID**
(`hf_20260906_124100_514d986e-…`) i odsyła po pełne nazwy do manifestu
`CATHERLY-MANIFEST-BITMAPY-2026-09-06.md`, opisanego jako „wiedza projektu".
**Tego manifestu nie ma w repozytorium** — są tylko `MANIFEST-HIGGSFIELD-FALA1.md`
i `…FALA2.md`.

**Zmierzone, nie założone — z kontrolą pozytywną:**

| adres | kod |
| --- | --- |
| pełny adres wzorca z `WWW/090` (kontrola) | **200** |
| `hf_20260906_124100_514d986e.png` | **403** |
| `hf_20260906_125529_fee2b80e.png` | **403** |
| `hf_20260906_130955_ff6321ff.png` | **403** |

Kontrola dowodzi, że sieć i baza działają — brakuje wyłącznie **reszty
UUID**, której nie da się odgadnąć. To druga w dwóch zleceniach pozycja
klasy **„odesłanie bez treści"** (pierwsza: T69, tabela koordynatora,
**dziś zamknięta**, bo tabela przyszła w tym zleceniu). Nowa pozycja: **T70**.

**Skutkiem zablokowania kroku 1 są też:** sloty hero/dnia/pamięci (krok 4),
sześć kafelków SVG (wzór 7 to bitmapa), rysunek karty Wrapped (wzór 8) oraz
narożniki ekranów do homografii.

## 2. KROK 2 — zmierzony, świadomie NIEWYKONANY

Zlecenie każe „odpiąć falę 1 (086, ADR-061)". **Pomiar rozdziela dwie
rzeczy, które to zdanie łączy:**

| katalog | plików | osadzeń w kodzie |
| --- | --- | --- |
| `public/obrazy/fala1` | 8 | **ZERO — fala 1 jest już odpięta** |
| `public/obrazy/tymczasowe` | 6 | **3 osadzenia** (hero, dbanie, cztery sloty filarów) |
| `public/obrazy/fala2` | 1 | 1 |
| `public/obrazy/rezerwa` | 9 | 0 |
| `public/obrazy/filary` | 36 | 0 |
| `public/obrazy/aplikacja` | 6 | 0 (przywrócone w ADR-066) |

**Falę 1 odpięto już wcześniej** — cztery podstrony funkcji noszą o tym
zapis („pliki w `public/obrazy/fala1/` nietknięte, klucze alt ZOSTAJĄ",
ADR-058). Rodzina faktycznie osadzona to **`tymczasowe`** z ADR-061, i to
o niej mówi parenteza „(086, ADR-061)".

⚠ **NIE ODPINAM JEJ** — i to jest decyzja, nie przeoczenie. Odpięcie ma
sens wtedy, gdy w sloty wchodzą nowe bitmapy; krok 1 jest zablokowany, więc
odpięcie zostawiłoby stronę **bez ani jednego obrazu**. Sloty co prawda
zwijają się czysto (ADR-059/060), ale byłby to regres widoczny gołym okiem,
zrobiony w imię kroku, którego nie da się dokończyć.

**Lista ścieżek do ewentualnego skasowania po osobnym słowie właściciela:**
`public/obrazy/tymczasowe/{hero,dbanie-o-siebie,filar-1-pozyskiwanie,filar-2-tresci,filar-3-zespol,filar-4-wyniki}.avif`
(6 plików, 340 kB). Fali 1 (8 plików, 876 kB) nic nie trzyma **poza kluczami
alt**, których pilnuje `e2e/zrzuty-filarow.spec.ts`.

## 3. KROK 3 — treść

### ⚠ Dwa z czterech „nowych" ciągów JUŻ ISTNIAŁY

| wiersz tabeli zlecenia | stan faktyczny |
| --- | --- |
| H2 „Catherly to pamięć twojej sprzedaży" — **NOWE** | **ISTNIEJE**: `Definicja.naglowek` = „Catherly to `<akcent>`pamięć twojej sprzedaży`</akcent>`" |
| H2 „Widzisz wzrost nawet po trudnym dniu" — **NOWE** | **ISTNIEJE**: `Filary.filar4.naglowek`, znak w znak |
| CTA „Zacznij prowadzić kontakty i wyniki w Catherly" — NOWE | **faktycznie nowe** |
| trzy chipy — NOWE | **faktycznie nowe** |

Sprawdzone przeszukaniem 345 kluczy `pl.json`. **Nowych ciągów jest cztery,
nie sześć** — a każdy niedopisany ciąg to jeden mniej do tłumaczenia
i do przeglądu.

### Cztery nowe klucze, trzy języki

| klucz | PL |
| --- | --- |
| `ZamkniecieGlowna.naglowek` | Zacznij prowadzić kontakty i wyniki w Catherly |
| `RytmDnia.krok1Chip` | Plan dnia gotowy · 8:30 |
| `RytmDnia.krok2Chip` | Spotkanie · 14:00 |
| `RytmDnia.krok3Chip` | Podsumowanie · 20:00 |

Brzmienia polskie **z mandatu koordynatora** (delegacja właściciela z
`WWW/091`) — ta sama droga, którą weszła plakietka w `WWW/060`.
⚠ **EN i DE są tłumaczeniami implementacji** i tak są oznaczone w plikach
`content/`; czekają na przegląd sędziów. Parytet kluczy: **349 = 349 = 349**.

### Nowa kategoria rejestru liczb — i jej strażnik

Trzy chipy niosą godziny, więc linter liczb je zatrzymał (**to jego
zadanie**). Żadna z pięciu istniejących kategorii ich nie obejmowała:
`cecha-funkcji`, `nazwa-wlasna`, `identyfikator`, `samoopis`, `idiom`.
Naciągnięcie „samoopisu" byłoby wpisem opisującym coś innego, niż jest.

Weszła kategoria **`godzina-scenariusza`**: *godzina w chipie sekcji rytmu
dnia — element scenariusza obok nazwy pory dnia, nie twierdzenie o produkcie
ani wartość pomiarowa*. Pokrycie: chipy wzorca niosą te same godziny
(odczytane z obrazu: „Wykonane: 8:30", „Spotkanie: 14:00", „Podsumowanie:
20:00").

⚠ **KATEGORIA STOI W KODZIE STRAŻNIKA, NIE TYLKO W PLIKU DANYCH — i to jest
mechanizm.** Gdyby lista dozwolonych kategorii pochodziła z
`content/liczby-w-tresci.json`, nowa kategoria wchodziłaby **razem z wpisem,
który ma nią uzasadnić** — rozstrzygnięcie usprawiedliwiałoby samo siebie.
Rozszerzenie listy kosztuje zmianę kodu. Przy kategorii stoi też warunek
zawężający: godzinie wolno stać wyłącznie w chipie przy nazwie pory dnia.

⚠ **Przy pierwszej próbie wpisu pomyliłem kolejność liczb** — linter sortuje
je **jako ciągi znaków** (`30, 8`, nie `8, 30`), więc rejestr rozjechał się
z komunikatem i bramka dała 12 naruszeń zamiast 3. Zapisuję, bo objaw
(„rozjazd z rejestrem") sugeruje zmianę treści, a przyczyną było sortowanie.

## 4. KROK 4 — w części: nagłówek sekcji zamykającej

Jedyny element kroku 4, który **nie potrzebuje bitmap**. Sekcja zamykająca
dostała nagłówek ze wzorca; klucz jest **opcjonalny**, bo ten sam komponent
zamyka `/cennik`, gdzie nagłówka nie ma.

⚠ **Werdykt panelu z pkt 25 („bez zdania prowadzącego") NADAL OBOWIĄZUJE** —
i sprawdziłem to, zamiast założyć. Tamten werdykt dotyczy **zdania
prowadzącego nad przyciskiem**; to jest **nagłówek sekcji**, którego wzorzec
wymaga w tym miejscu. Zdanie prowadzące pozostaje nieobecne.

### Dwa strażniki struktury zapaliły — i miały rację

| strażnik | było | jest |
| --- | --- | --- |
| `filary.spec.ts` — liczba `h2` w `main` | 10 | **11** |
| `zlozenie.spec.ts` — kolejność `h2` | dziesięć pozycji | **jedenaście**, nagłówek na końcu |

Obie liczby są **mechanizmem, nie dryfem**: kodują SKŁAD strony, więc ich
zmiana ma być decyzją i ma zapalać czerwień, gdy ktoś doda albo zdejmie
sekcję bez rozstrzygnięcia. Zmienione **razem** ze zmianą, z powodem w kodzie.

Trzeci strażnik (`zlozenie: messages znak w znak z content`) zapalił, bo
`content/*/{zamkniecie,rytm-dnia}.md` nie zawierały nowych brzmień — **to
jest jego konstrukcja**: komunikaty mają lustrzanie odpowiadać dokumentom
treści. Dopisane w trzech językach.

## 5. Bramki i pomiary

| | wynik |
| --- | --- |
| komplet e2e (4 kadry) | **1376 passed · 12 skipped · 0 failed** |
| tokeny · liczby · parytet · deklaracje · linki · kotwice · No-JS | ZIELONE |
| linter liczb | zielony, **19 rozstrzygniętych ciągów**, 3 języki |
| parytet kluczy komunikatów | **349 = 349 = 349** |
| sweep 320→2560, świeże wejście | **11/11 czyste** na obu trasach |
| **T68 po zmianie** | jasne **74,9 %** wobec 70,9 % wzorca |
| **nakładka całości** | **30,1 %** (baza ze zlecenia 29,8 %) |
| podróże @390 | 10 678 px = 12,65 ekranu · bóle 1,98 / 6,41 / 1,33 |
| dev właściciela na 3000 | **200 przez cały batch** |

⚠ Nakładka drgnęła o 0,3 punktu w górę — nagłówek wydłużył stronę o 111 px,
więc przy skalowaniu do wspólnej wysokości wszystko przesunęło się o włos.
**To nie jest regres kompozycji**, tylko własność miary, która porównuje dwa
obrazy o różnej długości.

## 6. Czego ten ADR NIE rozstrzyga

- **Kroku 1** — brak pełnych nazw plików (**T70**).
- **Kroku 2** — lista gotowa, odpięcie czeka na bitmapy albo na osobne
  słowo właściciela.
- **Kroku 4 poza nagłówkiem** — sloty, kafelki SVG, karta Wrapped, narożniki
  ekranów; wszystko zależne od kroku 1.
- **Obaw na `/cennik`** — przeniesienie razem ze strażnikiem `toHaveCount`
  nie weszło: to przebudowa dwóch tras, a nie krok treściowy, i wymaga
  własnego przebiegu.
- **Tłumaczeń EN/DE** — są implementacyjne i czekają na sędziów.
