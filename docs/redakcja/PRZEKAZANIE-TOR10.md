# PRZEKAZANIE DO TORU 10 — sześć pozycji, sześć pytań o KOD I O TABELĘ

**Nadawca:** tor 9 (redakcja serwisu), 2026-08-21.
**Adresat:** tor 10.
**Podstawa:** rozstrzygnięcia właściciela z 2026-08-21 — §162.2 i §162.4
w `docs/redakcja/00-USTALENIA-TOR9.md`.

> **Po co ta strona istnieje.** Tor 9 pracuje na klonie serwisu i **nie ma jak
> rozstrzygnąć tych czterech pozycji** — wymagają odczytu z kodu aplikacji, którego
> tor 9 nie widzi. Bez tego zapisu tor 10 nie dowiedziałby się, że coś na niego czeka.

**Wspólna cecha wszystkich czterech: to NIE SĄ pytania o brzmienie strony.**
W trzech przypadkach zdanie strony jest **prawdziwe wobec aplikacji**, a rozjeżdża się
z **wierszem tabeli obietnic**. W czwartym zdanie i wiersz są **zgodne**, i nikt nie
sprawdził, czy wiersz jest prawdziwy.

**Kierunek naprawy rozstrzygnięty przez właściciela:**
> **Jeśli wiersz jest WĘŻSZY NIŻ KOD — poprawia się WIERSZ, nie zdanie.**

To jest odwrócenie kierunku obowiązującego w całym torze 9 (gdzie wiersz był miernikiem
i zdanie ustępowało). **Pierwszy przypadek, w którym przedmiotem naprawy jest tabela.**

---

## POZYCJE 1–3 · RODZINA „PRZYPOMNIENIE" — rozjazd zdania z wierszem

**Wiersz, którego dotyczą — `content/tabela-obietnic.md` w. 37 `[STAN, cytat]`:**

```
| Kalendarz + przypomnienie 30 min przed | Planujesz kontakty w kalendarzu
  i dostajesz przypomnienie 30 minut przed każdą rozmową. |
```

**Co pyta strona** — trzy klucze, PL (`en`/`de` niosą tę samą konstrukcję):

| # | klucz | zdanie `[STAN]` | podmiot |
|---|---|---|---|
| 1 | `RytmDnia.krok1Tresc` | „Otwierasz Dzienny Plan Działania i zaczynasz rozmowy w ułożonej kolejności. **Kalendarz przypomina** o reszcie." | **narzędzie** |
| 2 | `DlaKogo.s1_robi_1` | „…Terminy rozmów wpisujesz do kalendarza z przypomnieniami — **{minuty} minut przed każdą rozmową Catherly przypomina ci** o niej." | **narzędzie** |
| 3 | `FunkcjePozyskiwanie.mod2_poco` | „Terminy rozmów nie muszą siedzieć w twojej głowie. Planujesz kontakty w kalendarzu, a **{minuty} minut przed każdą rozmową Catherly przypomina ci** o niej." | **narzędzie** |

**Na czym polega rozjazd.** Wiersz stawia w podmiocie **ją** („**dostajesz** przypomnienie").
Zdania stawiają **narzędzie** („Kalendarz **przypomina**", „Catherly **przypomina ci**").
**Zdania są prawdziwe — przypomnienie wysyła system.** Właściciel rozstrzygnął, że
**nie należą do rodziny Z-1** (fałszywe sprawstwo), bo produkt robi dokładnie to,
co zdanie mówi.

**CZEGO POTRZEBUJĄ OD KODU:**

1. **Czy aplikacja faktycznie wysyła przypomnienie** — kto jest nadawcą (system, zadanie
   cykliczne, integracja kalendarza), czy wymaga zgody, czy działa bez otwartej aplikacji.
   Od tego zależy, czy poprawia się wiersz (na podmiot-narzędzie), czy zostaje jak jest.
2. **ILE MINUT — i to jest pozycja własnej wagi, patrz niżej.**

### ⚠ ZNALEZISKO TORU 9 — liczba „30" jest jedynym faktem w `facts.json` bez źródła w kodzie

Audyt `content/facts.json`, komplet 9 wpisów liczbowych:

| wpis | źródło | data pomiaru |
|---|---|---|
| 8 wpisów limitów (kontakty, zespół, posty, sesje) | **KOD** | `2026-08-09` |
| **`przypomnienie-kalendarza-minuty` = 30** | **TABELA OBIETNIC** | `2026-08-12` |

Pole `zrodlo` tego wpisu, cytat `[STAN]`:

> „Tabela obietnic (Filar 1, przypomnienie 30 min przed rozmową; inwentarz 61a69c9c).
> **STATUS: do weryfikacji w kodzie aplikacji przy najbliższym zleceniu Z
> (decyzja właściciela D-B3, 2026-08-12).**"

> ## **To jest obieg zamknięty.** `facts.json` bierze liczbę z tabeli obietnic,
> ## a tabela obietnic jest miernikiem, którym mierzymy stronę. **Liczba, którą
> ## czytelniczka widzi na dwóch trasach, nie ma dziś ŻADNEGO oparcia w kodzie.**

**Weryfikacja została zlecona przez właściciela 2026-08-12 (D-B3) i nie została wykonana.**
Jest to **jedyny wpis `facts.json` noszący własną adnotację „do weryfikacji"** — czyli
mechanizm zadziałał: wpis mówi o sobie prawdę. **Nikt tylko nie wrócił.**

**Dla toru 10 to jest pozycja pierwsza w kolejności**, bo od niej zależą dwa z trzech
zdań powyżej, a liczba jest widoczna na `/dla-kogo` i `/funkcje/pozyskiwanie` ×3 języki.

---

## POZYCJA 4 · `Filary.filar2.konkret3` — **zdanie i wiersz zgodne, oba z narzędziem w podmiocie**

**Klasa nowa, nazwana przez właściciela 2026-08-21.**

**Wiersz — `content/tabela-obietnic.md` w. 78 `[STAN, cytat]`:**

```
| Pieczęć Etyczna 0–100 + publiczny certyfikat z QR | Każdy projekt otrzymuje
  wynik etyczny z publicznym certyfikatem do pokazania klientce. |
```

**Co pyta strona — `Filary.filar2.konkret3`:**

| | zdanie `[STAN]` |
|---|---|
| **pl** | „**Pieczęć Etyczna daje** wynik i certyfikat — masz dowód, nie tylko odczucie." |
| **en** | „**The Ethical Seal gives** a score and a certificate — proof, not just a feeling." |
| **de** | „**Das Ethik-Siegel gibt dir** eine Bewertung und ein Zertifikat – ein Beleg, nicht nur ein Gefühl." |

**Dlaczego nie jest to Z-1.** Jednostka Z-1 wymaga **kontrastu**: narzędzie w podmiocie
zdania **wobec** użytkowniczki w podmiocie wiersza. Tutaj kontrastu nie ma — **wiersz też
nie stawia jej w podmiocie** („Każdy projekt **otrzymuje**"). Zdanie jest wierne wierszowi.

**Pytanie właściciela, dosłownie:** *„sprawdź przy torze 10, czy wiersz jest prawdziwy.
To jest pytanie o TABELĘ, nie o stronę."*

**CZEGO POTRZEBUJE OD KODU:**

1. **Czy „KAŻDY projekt" otrzymuje wynik** — automatycznie, czy na żądanie? Czy jest
   bramka planu? Kwantyfikator „każdy" jest najszerszy z możliwych i **stoi w wierszu,
   nie w zdaniu strony** — więc jeśli upada, upada miernik, a nie tekst.
2. **Czy certyfikat jest PUBLICZNY i czy ma QR** — wiersz twierdzi oba.
3. **Czy wynik jest w skali 0–100** — wiersz twierdzi; strona nie wymienia skali,
   więc strona jest węższa i bezpieczniejsza od miernika.

---

## POZYCJA 5 · `Cennik.faq.o2` — **zdanie nieprawdziwe wobec kodu, pilnowane znak w znak**

**Przekwalifikowane do toru aplikacji rozstrzygnięciem właściciela 2026-08-21:**
> **ADR-018 rozstrzyga: jeśli zdanie jest nieprawdziwe wobec kodu, to NIE JEST pytanie
> redakcyjne. Strona nie może tego naprawić brzmieniem, bo naprawa brzmieniem byłaby
> zdjęciem obietnicy, której klientka POTRZEBUJE.**

**Co pyta strona — `Cennik.faq.o2` `[STAN]`:**

| | |
|---|---|
| **pl** | „Wybierasz plan i **zmieniasz go kiedy chcesz**." |

**Co wiemy:** kanon (§2310) zapisuje `subscription_update: { enabled: false }` — portal
Stripe **nie pozwala zmienić planu** — oraz komunikat aplikacji `en.json:1387`
„Plan changes happen in the Stripe portal". **Aplikacja odsyła do portalu po czynność,
którą portal ma wyłączoną.**

> ⚠ **OSTRZEŻENIE R-C:** `scripts/setup-stripe.ts` **nie istnieje w żadnym repozytorium
> dostępnym torowi 9** (`find /home /workspace -name "setup-stripe*"` → pusto).
> Powyższe cytaty są **niezweryfikowalne z toru 9** i mogą być historią, nie stanem.
> **Pierwsza czynność toru 10: potwierdzić je albo obalić na żywym kodzie.**

**Sytuacja bramkowa, którą tor 10 musi znać:** zdanie jest **pilnowane znak w znak**
(`e2e/cennik.spec.ts:354`). **Bramka utrzyma je przy życiu i zapali się przy próbie
usunięcia.** Zdjęcie zdania wymaga jednoczesnej zmiany strażnika — **pakietem albo wcale.**

**CZEGO POTRZEBUJE OD KODU:** czy klientka może zmienić plan — w portalu, w aplikacji,
kontaktem — i jeśli tak, to gdzie. **Kierunek naprawy zależy od odpowiedzi: jeśli może,
naprawia się nic; jeśli nie może, naprawia się PRODUKT, nie zdanie.**

---

## POZYCJA 6 · TARCZA — **w którym momencie faktycznie działa**

**Podstawa:** `RŹ-1` (§198.2). Serwis mówi o Tarczy na **sześciu trasach, czterema
czasownikami i w trzech różnych momentach cyklu.**

| trasa | co mówi | moment |
|---|---|---|
| `/` | „Tarcza **zaznacza** … zanim **klikniesz «wyślij»**" | wysyłka |
| `/cennik` | „Tarcza — **sprawdza** … zanim **je wyślesz**" | wysyłka |
| `/dla-kogo` | „Tarcza **zaznacza** … zanim **go opublikujesz**" | publikacja |
| `/funkcje/tresci` | „**wskazuje** ryzykowne sformułowania" | — |
| `/funkcje/tresci` | „**wyłapujesz przed publikacją**, nie po niej" | przed publikacją |
| `/` (alt) | „…i **propozycja poprawionej wersji**" | **łamie ADR-018** |

**CZEGO POTRZEBUJE OD KODU — trzy pytania, w tej kolejności:**

1. **W którym momencie Tarcza sprawdza tekst** — przy wpisywaniu, przy zapisie, przy
   wysyłce z aplikacji, czy przy publikacji w serwisie zewnętrznym? `TO:77` mówi
   „**przed publikacją**", ale **nie mówi, czym jest publikacja** — a serwis używa obu słów.
2. **Czy Tarcza generuje poprawioną wersję tekstu.** `inwentarz-funkcji.md:44` mówi
   „wykrywanie … **bez AI**", a `alt` na `/` twierdzi, że proponuje poprawioną wersję.
   **Jeśli generuje — inwentarz jest nieaktualny. Jeśli nie — `alt` łamie ADR-018 i schodzi.**
3. **Czy „zaznacza / sprawdza / wskazuje" to jedna czynność, czy różne.**

**Kierunek naprawy zależy od (1) i (2) — tor 9 nie ma czym tego rozstrzygnąć.**

---

## REJESTR PRZEPŁYWU — **sekcja obowiązkowa** (wymóg właściciela 2026-08-21)

> **Dokument przekazania bez rejestru przepływu jest niekompletny i wraca.**
> Przejmujący ma wiedzieć nie tylko, **co ustaliłem**, ale też **co przyjąłem od innych
> i na czyje słowo.**

**Pełny rejestr: `docs/redakcja/REJESTR-PRZEPLYWU.md`.** Tutaj to, co dotyczy toru 10:

**NA CZYIM SŁOWIE STOJĄ POZYCJE PONIŻEJ:**

| pozycja przekazania | stoi na ustaleniu | czyim | mój status |
|---|---|---|---|
| **1** `{minuty}`=30 | `facts.json`, wpis z 2026-08-12 | **tor aplikacji** | **OBALONE** — pole `zrodlo` wskazuje tabelę obietnic, nie kod |
| **2** rodzina „przypomnienie" | `TO:37` tabeli obietnic | **tor aplikacji** | **PRZYJĘTE BEZ SPRAWDZENIA** |
| **3** `Filary.filar2.konkret3` | `TO:78` tabeli obietnic | **tor aplikacji** | **PRZYJĘTE BEZ SPRAWDZENIA** |
| **4** `Cennik.faq.o2` | cytaty z `setup-stripe.ts` | **ŹRÓDŁO NIEUSTALONE** | **R-C — NIEWERYFIKOWALNE**, potwierdź albo obal |
| **5** Tarcza | `TO:77` + `inwentarz-funkcji.md:44` | **tor aplikacji** | **PRZYJĘTE BEZ SPRAWDZENIA** |

> ## **CZTERY Z PIĘCIU POZYCJI STOJĄ NA POMIARZE, KTÓREGO NIE WYKONAŁEM I NIE MOGŁEM
> ## WYKONAĆ — tor 9 nie ma dostępu do kodu aplikacji.**
> Tabela obietnic została zmierzona **2026-08-09** na wersji `61a69c9c`. **Dwanaście dni
> temu.** Nic nie obserwuje, czy nadal obowiązuje (§166.2: żadna bramka jej nie czyta).

**CO PRZEKAZUJĘ — i czego oczekuję z powrotem:** odnotuj przyjęcie w swojej tabeli A.
**Dopóki tego nie zrobisz, kolumna „czy potwierdzone" w mojej tabeli B zostaje pusta —
i po dwóch dniach jest sygnałem, że przekazanie nie doszło.**

---

## PODSUMOWANIE DLA TORU 10

| # | klucz(e) | wiersz | pytanie do kodu | pilność |
|---|---|---|---|---|
| **1** | `przypomnienie-kalendarza-minuty` (`facts.json`) | **w. 37** | **ile minut naprawdę** — obieg zamknięty, zlecenie D-B3 z 2026-08-12 niewykonane | **pierwsza** |
| **2** | `RytmDnia.krok1Tresc` · `DlaKogo.s1_robi_1` · `FunkcjePozyskiwanie.mod2_poco` | **w. 37** | kto jest nadawcą przypomnienia — czy wiersz ma zmienić podmiot | po (1) |
| **3** | `Filary.filar2.konkret3` | **w. 78** | czy „każdy projekt", czy publiczny certyfikat z QR, czy skala 0–100 | — |
| **4** | `Cennik.faq.o2` | **brak wiersza** | **czy klientka może zmienić plan.** Zdanie pilnowane znak w znak; źródło (`setup-stripe.ts`) **poza zasięgiem toru 9 — R-C** | **druga** |
| **5** | **Tarcza — 6 kluczy na 6 trasach** | **w. 77** | **w którym momencie działa** i **czy generuje poprawioną wersję** (`alt` twierdzi, inwentarz przeczy) | **trzecia** |

**Czego tor 9 NIE rozstrzygnął i nie ma prawa rozstrzygnąć:** żadnego z powyższych.
Wszystkie wymagają odczytu z aplikacji. **Tor 9 nie zaproponował też żadnego nowego
brzmienia dla tych czterech kluczy** — zgodnie z rozstrzygnięciem, że naprawia się
wiersz, jeśli to on jest węższy.

**Gdzie leży pełny kontekst:** `docs/redakcja/00-USTALENIA-TOR9.md` §148 (pomiar rodziny),
§161 (rozbicie na trzy klasy), §162.2 i §162.4 (rozstrzygnięcia właściciela).
