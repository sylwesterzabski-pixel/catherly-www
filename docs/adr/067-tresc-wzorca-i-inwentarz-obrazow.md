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

---

# Uzupełnienie z `WWW/093/2` — bitmapy weszły (2026-09-06)

Zlecenie `WWW/093/2` dosłało **pełne nazwy plików**. Pozycja **T70 zamknięta**.

## 7. Pobranie i tożsamość — 11/11

| | |
| --- | --- |
| kadrów na stronę | **9/9 sum zgodnych, 9/9 wymiarów zgodnych** |
| wzorów rysunkowych | **2/2 zgodne** |
| manifest | `docs/obrazy/MANIFEST-WZORZEC-2026-09-06.md` |

**Optymalizacja wg praktyki zmierzonej, nie wymyślonej:** repozytorium **nie
ma `.gitattributes`** (czyli nie używa LFS) ani wpisu obrazowego
w `.gitignore`, a ADR-061 zapisał wprost, że PNG-i źródłowe zostają poza
historią. Stąd: dziewięć AVIF-ów w `public/` (**44 509 kB → 200 kB, −99,6 %**),
PNG-i usunięte, sumy w manifeście. Wzory 7 i 8 **zostają PNG-ami**, bo są
materiałem rysunkowym — ta sama rola co zrzuty `z6`.

⚠ **TWARZE — warunek kanonu sprawdzony, nie założony.** Kadry 1, 4, 5 i 6
pokazują twarze; są **generowane** (Higgsfield) i objęte **imiennym akceptem
właściciela** z tabeli dostawy. Oba warunki `CLAUDE.md` spełnione.

## 8. Hero przebudowane na dwie kolumny

| | |
| --- | --- |
| układ | tekst po lewej, kolumna medialna po prawej (od progu 48,0625rem) |
| bohaterka | wtopiona **maską**, bez ramki |
| telefon | kadr 2c, **ekran pusty** |
| hero/vp @1440 | **1,693** — bez zmian |

⚠ **RAMA I PARALLAX Z ADR-063/064 ZESZŁY Z TEGO SLOTU — odwrócenie mojej
własnej decyzji sprzed dwóch dni.** Tamta rama (promień 32, kreska strefy)
powstała dla kadru POZIOMEGO pod tekstem; wzorzec finalny daje kadr PIONOWY
obok tekstu i wtapia go po obrysie. Rama i wtopienie wykluczają się
mechanicznie — to samo zdanie stoi w ADR-063 jako powód zdjęcia maski, dziś
czytane w drugą stronę. Reguły `.kadr` i animacja `kadrHeroParallax` są
**martwe i tak oznaczone** w arkuszu (zero odwołań do `styles.kadr`).

### ⚠ Proporcja kolumn 58 : 42, a nie wzorcowe 47 : 53

Pomiar wzorca daje 47 : 53. Przy tej proporcji nasza kolumna tekstu ma
531 px i H1 mieści się w trzech wierszach **po polsku**, a po angielsku
i niemiecku łamie się na **cztery** — zapala strażnika `hero: H1 ≤ 3 linie`.

**Próg zmierzony, nie dobrany:**

| szerokość kolumny | pl | en | de |
| --- | --- | --- | --- |
| 531 (wzorcowe 47 %) | 3 | **4** | **4** |
| 560 | 3 | 3 | **4** |
| 620 | 3 | 3 | **4** |
| **650** | **3** | **3** | **3** |

650 z dostępnych 1130 px to **58 %**. Wzorzec tego problemu nie ma, bo jest
jednojęzyczny; nasza strona ma parytet ×3 jako bramkę. Kanon zna tę różnicę
pod nazwą „miary DE +18 %" — tu wyszło **+22 %**.

### ⚠ Telefon dostał własną maskę — usterka wychwycona z OBRAZU

Bitmapa 2c niesie **własne kremowe tło**, które na naszej stronie rysowało
widoczny prostokąt wokół telefonu. Widać to było dopiero na zrzucie, nie
w kodzie. Maska ciaśniejsza niż przy bohaterce (62 % × 70 %), bo przedmiot
jest wąski i wysoki — szersza wygaszałaby korpus telefonu zamiast tła.

## 9. Kadr 5 NIEOSADZONY — i to jest wykonanie reguły, nie pominięcie

Kadr `5-w-ciagu-dnia` pokazuje laptop z **pulpitem i wykresem**. Kanon
rozstrzyga takie obrazy pytaniem wprost: *czy odwiedzająca, patrząc na ten
obraz, mogłaby uznać, że tak wygląda aplikacja?* Jeśli tak — obowiązuje
Playwright, nie generator. Zlecenie samo oznacza ten kadr jako
**warunkowy**, z decyzją właściciela otwartą. Plik jest pobrany,
zweryfikowany i zoptymalizowany; **nie wchodzi do slotu**.

## 10. ⚠ LCP: przesłanka zlecenia obalona pomiarem

Zlecenie zakłada „bohaterka = kandydat na LCP" i każe dać jej
`priority`/`preload`. **Zmierzone, mediana z pięciu przebiegów:**

| | wynik |
| --- | --- |
| LCP | **220 ms** (220 · 220 · 220 · 224 · 220), rozrzut **1,02×** |
| **element LCP** | **`SPAN.Hero_duch__…`** — dekoracyjny napis, nie bohaterka |

To **potwierdzenie pozycji T55**, nie nowe odkrycie: elementem LCP strony
głównej jest napis-duch o kryciu 6 %, i był nim także wtedy, gdy w hero stały
zrzuty. `fetchPriority="high"` na bohaterce zostaje (nie szkodzi i jest
poprawne dla największego obrazu hero), ale **nie celuje w element LCP** —
i tak to zapisuję, zamiast raportować „priorytet ustawiony" jako spełnienie
wymagania, którego pomiar nie potwierdza.

## 11. Bramki i pomiary po tym batchu

| | wynik |
| --- | --- |
| komplet e2e (4 kadry) | **1376 passed · 12 skipped · 0 failed** |
| tokeny · liczby · parytet · deklaracje · linki · kotwice · No-JS | ZIELONE |
| sweep 320→2560, świeże wejście | **11/11 czyste** na obu trasach |
| **T68** | jasne **79,0 %** wobec 70,9 % wzorca |
| **nakładka całości** | **27,7 %** (przed batchem 30,1 %) |
| LCP mediana z 5 | **220 ms**, rozrzut 1,02× |
| podróże @390 | 10 678 px = 12,65 ekranu |

⚠ Jesteśmy teraz **jaśniejsi od wzorca** (79,0 wobec 70,9 %), bo trzy karty
filarów i blok wzrostu wciąż nie są grafitowe — to reszta kroku 3, nie regres.

## 12. Czego to uzupełnienie NIE zrobiło

- **Sekcja „pamięć"** z kadrem 3 i ekranem MacBooka — sekcja nie ma dziś
  slotu obrazowego; dołożenie go to nowy komponent.
- **Sloty dnia** (kadry 4 i 6) i **chipy** — `SekcjaRytmu` nie ma slotów
  obrazowych; trzy nowe klucze `RytmDnia.krok*Chip` czekają nieużyte.
- **Sześć ikon SVG** przerysowanych z wzoru 7 — wzór jest w repozytorium.
- **Karta Wrapped SVG** z wzoru 8 — dane są w zleceniu, wzór w repozytorium.
- **Odpięcie `tymczasowe`** — hero już ich nie używa, ale `DbanieOSiebie`
  i cztery sloty filarów wciąż tak; odpięcie ma sens razem z wejściem
  pozostałych kadrów.
