# REJESTR PRZEPŁYWU — tor 9 (redakcja serwisu)

**Założony 2026-08-21 na wymóg stały właściciela.** Prowadzony na bieżąco.

> **Po co:** przy siedmiu równoległych torach ustalenia wędrują między nimi przez
> właściciela, **ręcznie**. Nie ma sposobu sprawdzić, które doszły — poza pamięcią jednej
> osoby. **To jest dokładnie ta klasa, którą tropimy: wiedza istnieje, ma dowód i nie ma
> adresata, a jej przepływ nie zostawia śladu.** (brzmienie właściciela)

**Wymóg formalny: dokument przekazania bez rejestru przepływu jest NIEKOMPLETNY i wraca.**

## Zastrzeżenie o zakresie — **przeczytaj przed tabelą A**

Rozróżniam dwie rzeczy i **nie mieszam ich**:

- **PRZEKAZANE MI PRZEZ WŁAŚCICIELA Z INNEGO TORU: 3 pozycje — wszystkie 2026-08-23.**
  *(Do 2026-08-21 było ich ZERO; właściciel potwierdził: „nie przekazywałem Ci dziś ustaleń
  z torów 1, 8 ani 10. Przekazałem je w drugą stronę — Twoje do nich.")*
  **2026-08-23 przyszły trzy: A-15, A-16, A-17.** Zapisuję z datą przekazania, nie z datą
  powstania u nadawcy — **rejestr mierzy przepływ, nie autorstwo.**
- **PRZEJĘTE Z DOKUMENTÓW INNYCH TORÓW, które leżą w repozytorium: 14 pozycji.**
  Na nich stoi cały tor 9. **Ich autorami są tor aplikacji, wcześniejsze fazy panelu
  i panel językowy — nie ja.** To jest właściwa treść tabeli A.

---

# TABELA A — PRZYJĘTE OD INNYCH

| # | ustalenie (jedno zdanie) | źródło (tor + dokument:linia) | data przyjęcia | status | co z tym zrobiłem |
|---|---|---|---|---|---|
| **A-01** | Tabela obietnic (271 wierszy) jest jedynym źródłem prawdy o tym, co aplikacja robi | **tor aplikacji** — `content/tabela-obietnic.md:1-9`, z `content/inwentarz-funkcji.md` (git `61a69c9c`, 2026-08-09) | 2026-08-21 | **PRZYJĘTE BEZ SPRAWDZENIA** | Miernik całego toru. **Ani jednego wiersza nie zweryfikowałem wobec kodu aplikacji.** Cytuję jako `[TOR APLIKACJI]`. **Zweryfikowana 2026-08-23 przez TOR 10 — patrz A-15; mój status się NIE zmienia, bo drogi weryfikacji nadal nie mam** |
| **A-02** | Inwentarz: 105 pozycji, 38 DZIAŁA / 56 CZĘŚCIOWE / 11 SZKIELET, zmierzony 2026-08-09 | **tor aplikacji** — `content/inwentarz-funkcji.md:3-5` | 2026-08-21 | **PRZYJĘTE BEZ SPRAWDZENIA** | Użyte jako dowód w §164.2 (Tarcza „bez AI") wobec `alt`. **Cudzy pomiar, mój wniosek** |
| **A-03** | Słownik nazw produktowych — nazwy aplikacji są wzorcem (19 nazw kanonicznych ×3 języki) | **tor aplikacji** — `docs/faza-2/slownik-nazw.md:1-5`, raport Z3, decyzja właściciela 2026-08-09 | 2026-08-21 | **SPRAWDZONE DRUGĄ DROGĄ** | **Droga: pomiar wystąpień w `messages` ×3 języki.** Wynik: 16/17/19 nazw wchodzi w dłuższe ciągi; **PL 47 → 55 po uwzględnieniu fleksji** (§189). Użyte jako **jednostka kolumny II** karty łańcuchów |
| **A-04** | Osiem limitów planów zmierzonych **w kodzie** 2026-08-09 (50/200, 10/50, 20/100, 5/30) | **tor aplikacji** — `content/facts.json`, pole `zrodlo` każdego wpisu | 2026-08-21 | **SPRAWDZONE DRUGĄ DROGĄ — 2026-08-24** | **Droga: `src/lib/api/plan-limits.ts:11–43`, gałąź `claude/verify-promises-table-3s4ksg`.** Cztery pary zgadzają się co do znaku: `candidates_count` **50/200**, `team_members` **10/50**, `posts_per_month` **20/100**, `simulator_sessions` **5/30**; wszystkie cztery na PRO = `-1`, czyli **cztery komórki „bez limitu" mają pokrycie** (§217.3). Zdanie „nie mam czym zweryfikować" było **nieprawdziwe** — plik był o jedno `git fetch` |
| **A-05** | „30 minut przed rozmową" jako fakt liczbowy | **tor aplikacji** — `content/facts.json`, wpis `przypomnienie-kalendarza-minuty` | 2026-08-21 | **OBALONE** | **Dowód: pole `zrodlo` tego wpisu wskazuje TABELĘ OBIETNIC, nie kod, i samo mówi „STATUS: do weryfikacji w kodzie aplikacji".** To **obieg zamknięty** — jedyny wpis `facts.json` bez oparcia w kodzie. Przekazane torowi 10 jako pozycja pierwsza |
| **A-06** | Konfiguracja Stripe: `mode:'at_period_end'`, `cancellation_reason.enabled:true`, `subscription_update:false` | **`catherly-app/fbo-os`, gałąź `claude/verify-promises-table-3s4ksg`, `scripts/setup-stripe.ts:44-55`** *(2026-08-21 zapisałem „źródło nieustalone" — plik był w zasięgu, ja o tym nie wiedziałem)* | 2026-08-21 | **SPRAWDZONE DRUGĄ DROGĄ — R-C ZAMKNIĘTE 2026-08-23** | Cała analiza rodziny anulowania na tym stoi. **ODCZYTAŁEM PLIK 2026-08-23: wszystkie trzy cytaty DOKŁADNE**, `cancellation_reason` z pięciopozycyjną listą (§209.1). **`P-22` zdjęte** |
| **A-07** | Decyzja D-B3 (2026-08-12): zweryfikować „30 minut" w kodzie przy najbliższym zleceniu Z | **tor aplikacji** — `content/facts.json`, pole `zrodlo` | 2026-08-21 | **NIEZASTOSOWANE** | **Powód: poza zakresem toru 9** — nie mam dostępu do kodu aplikacji. **Zlecenie stoi niewykonane od dziewięciu dni.** Przekazane torowi 10 |
| **A-08** | ADR-018 — prymat nieodwracalnego; obietnica bez pokrycia jest naruszeniem **przez stronę** | **tor architektury** — `CLAUDE.md`, sekcja „Prymat nieodwracalnego" | 2026-08-21 | **PRZYJĘTE BEZ SPRAWDZENIA** | Zastosowane jako reguła nadrzędna. Rozstrzygnęło N-18 (`Cennik.faq.o2` → tor aplikacji) i SR-01 (`alt` Tarczy) |
| **A-09** | ADR-029: „droga treści — zamknięta" | **tor architektury** — ADR, cytowany przez autorów grupy A | 2026-08-21 | **NIEZASTOSOWANE** | **Powód: właściciel nie cofnął ADR (O-6), więc propozycja naruszająca go odpadła.** Ustalenie znane, użyte do **odrzucenia**, nie do wykonania |
| **A-10** | Decyzja panelu językowego DE: „DE bez słowa «Richtung»" | **panel językowy DE** — `docs/faza-2/panel-adaptacja-de.md` | 2026-08-21 | **NIEZASTOSOWANE** | **Powód: ten sam co A-09** — O-6, właściciel nie cofnął; propozycja `blokNOznaczenie` DE odpadła mimo czystego pokrycia |
| **A-11** | Rejestr warunków powrotu: pozycje techniczne T1–T22 | **wcześniejsze fazy panelu** — `docs/faza-2/rejestr-warunkow-powrotu.md` | 2026-08-21 | **PRZYJĘTE BEZ SPRAWDZENIA** | Użyte przy §156 (T3, T10, T11, T15, T20, T22). **Cytuję jako cudze rozstrzygnięcia** |
| **A-12** | STRATEGIA pkt 23 i pkt 24 — układ sekcji S11 i sześć par obaw | **wcześniejsze fazy panelu** — `docs/STRATEGIA.md` | 2026-08-21 | **PRZYJĘTE BEZ SPRAWDZENIA** | pkt 24 **wymaga aktualizacji** po rozstrzygnięciu O-7 (siódma para wchodzi) — w pakiecie z `toHaveCount(6)→7` |
| **A-13** | Rozstrzygnięcie właściciela 2026-08-15: różnica „Kontakty"/filar 1 **zostaje**, rejestr prozy ≠ rejestr nawigacji | **właściciel, przez komentarz w kodzie** — `src/i18n/sciezki.ts:44-51` | 2026-08-21 | **SPRAWDZONE DRUGĄ DROGĄ** | **Droga: odczyt komentarza w kodzie.** Wynik: rozstrzygnięcie **istnieje wyłącznie tam** — nie ma go w `docs/`. **21 z 24 datowanych decyzji w komentarzach kodu pozostaje niezweryfikowanych wobec `docs/` — pozycja otwarta** |
| **A-14** | DECYZJA 10 / §7 kanonu — „mandat świętowania" | **wcześniejsze fazy panelu** — §7 `00-USTALENIA-TOR9.md` | 2026-08-21 | **OBALONE** | **Dowód: S1 §7.2 — §7 jest REKOMENDACJĄ PANELU, nie rozstrzygnięciem właściciela; piszą to niezależnie wszyscy trzej autorzy.** Właściciel rozstrzygnął na nowo (O-5): świętowanie zostaje, ale wyłącznie na pokrytym |

| **A-15** | **Tabela obietnic NIE ZESTARZAŁA SIĘ — dryf 0.** Rozjazd bierze się z **ODCZYTU**, nie z upływu czasu: inwentarz notował, że funkcja **ISTNIEJE**, a nie **NA JAKIM WARUNKU STOI**. Z 56 zweryfikowanych wierszy: **7 PRAWDA** (6 z nich mówi **MNIEJ**, niż mogłoby), **7 pozycji ODWROTNYCH** — prawda, którą tabela **zdejmuje ze strony**; **41 pozycji dla toru 9, w tym 14 dotykających CENY** | **TOR 10** (zamknięty 2026-08-23) — `docs/weryfikacja-obietnic/`, repozytorium **aplikacji**, gałąź ~~`feat/cs-build`~~ → **`claude/verify-promises-table-3s4ksg`** *(sprostowanie 2026-08-24: na `feat/cs-build` tego katalogu NIE MA — `git ls-tree` zwraca pusto; §217.2)* | **2026-08-23** | **SPRAWDZONE DRUGĄ DROGĄ — częściowo** | **DROGĘ MAM: sesja toru 9 uruchomiona ze źródłem `catherly-app/fbo-os` (§209).** Dowód rozstrzygający potwierdziłem sam: commit `61a69c9c` nosi tytuł „identyfikatory cen **zamiast atrap**", a wiersz 37 powołuje się na niego, mówiąc „Stripe atrapa" — **rozjazd o zero dni.** Licznik 49/56 przyjmuję jako `[TOR 10]`. Obala moją ramę z §166.2 (ryzyko starzenia się) — **wada jest inna i gorsza.** **41 pozycji dla mnie — nie widzę ich; czekam na treść** |
| **A-16** | „30 minut" jest **wpisane na sztywno przy cronie co 15 minut** — odpowiedź na zlecenie D-B3 **istnieje** | **TOR 10** — przez właściciela, 2026-08-23 | **2026-08-23** | **SPRAWDZONE DRUGĄ DROGĄ — 2026-08-24, `P-22` ZDJĘTE** | **Droga: odczyt własny.** `src/lib/calendar/calendar-reminders.ts:20` → `const REMINDER_LEAD_MS = 30 * 60 * 1000`; `vercel.json:23-24` → `"/api/cron/reminders"`, `"*/15 * * * *"`. **Wychodzi z tego POZYCJA DLA STRONY: liczba punktowa tam, gdzie mechanizm daje przedział** (§217.3). Unieważnia **A-07** jako zlecenie: **nie jest niewykonane, jest niedoniesione.** Zmienia też pozycję 1 przekazania do toru 10 — pytanie odpowiedziane, zanim je zadałem |
| **A-17** | Bramka `parytet-kluczy-i18n` obejmuje **KLUCZE, nie WARTOŚCI**: **385 wartości EN i 333 DE są bajt w bajt równe polskim** (**718 ciągów**) i **nic tego nie zgłasza** | **TOR 13** — audyt strażników, 2026-08-23 | **2026-08-23** | **SPRAWDZONE DRUGĄ DROGĄ — częściowo** | **Droga: ten sam pomiar na `catherly-www`.** Wynik: **EN 2 · DE 3** wartości identycznych z PL — i **wszystkie pięć uzasadnione** („Studio", „Wall of Proof" — słownik nakazuje bez tłumaczenia; „Kontakt" — identyczne w PL i DE z natury języka). **MECHANIZM POTWIERDZAM I JEST GORSZY NIŻ U NADAWCY:** `scripts/check-parytet.mjs` porównuje **DRZEWA PLIKÓW**, nie klucze i nie wartości. **DEFEKT W WWW NIE WYSTĄPIŁ. LICZBY 385/333 ZWERYFIKOWANE WŁASNYM ODCZYTEM 2026-08-24 — `P-22` ZDJĘTE.** Droga: `src/i18n/messages/{pl,en,de}.json` w repozytorium **aplikacji**, gałąź `claude/verify-promises-table-3s4ksg`; **7854 klucze w każdym z trzech plików**, spłaszczone i porównane wartość po wartości. Wynik: **EN 385 · DE 333 — co do jednego**. Pomiar toru 13 **odtworzony bajt w bajt** (§217.3) |

| **A-18** | **`P-22`: „Przekaz poprawny bez drogi weryfikacji. Odbiorca dostał prawdę, której nie umie sprawdzić."** Rodzina: P-19 (treść może być fałszywa) · P-21 (skutki uboczne niewidoczne) · **P-22 (treść prawdziwa, weryfikacja niemożliwa)**. Obrona leży **wyłącznie po stronie nadawcy** | **TOR 8** — rejestr przesłanek warstwy dowodzącej, wpis `P-22`, 2026-08-23 · `fbo-os`, gałąź `feat/kontrowersje` | **2026-08-23** | **PRZYJĘTE BEZ SPRAWDZENIA** | Zastosowane wstecz do **A-15** i **A-17**. **Nie sprawdzam definicji cudzej klasy — przyjmuję jako `[TOR 8]`.** Konsekwencja dla mnie jako **nadawcy**: każdy mój przekaz ma nieść drogę weryfikacji albo jest niekompletny |
| **A-19** | **Puste pole w kolumnie potwierdzeń mierzy BRAK KANAŁU ZWROTNEGO, nie brak przyjęcia.** U toru 8: **19 przekazań odnotowanych po drugiej stronie przy ZERZE potwierdzeń u nadawcy** | **TOR 8** — 2026-08-23 | **2026-08-23** | **PRZYJĘTE BEZ SPRAWDZENIA** | **Zmienia odczyt mojej tabeli B: 15 pustych pól NIE znaczy „nic nie doszło".** Znaczy: **nie mam czym sprawdzić, czy doszło.** Adnotacja wpisana pod tabelą B |

| **A-20** | **Baza stoi fizycznie w UE:** pooler `aws-1-eu-central-1.pooler.supabase.com`, region `eu-central-1` (Frankfurt). **Fakt, nie decyzja** | **TOR 10** (`PUNKT-WZNOWIENIA.md` §3) **+ właściciel** (panel Supabase 2026-08-23; błąd `P1000` wypisał host) | **2026-08-23** | **SPRAWDZONE DRUGĄ DROGĄ** | **Cztery niezależne odczyty — dwa cudze, dwa WŁASNE 2026-08-24** (`docs/OPERATIONS.md:14`, `docs/ODSTEPSTWA.md:56`, `docs/ZADANIA_RECZNE.md:394` w repozytorium aplikacji). Wiersz o danych w UE **ma pokrycie faktyczne** — pytanie zmienia się z „czy to prawda" na „czy wolno powiedzieć X" (§216) |
| **A-21** | **Trzy reguły toru 10:** nieważna próba zostaje **z opisem, JAK WYGLĄDAŁ** wynik · **pułapka mutacyjna** (`git checkout --` przywraca z indeksu; wymóg `git checkout HEAD --` + suma SHA) · **cztery wady odroczenia**, w tym **ZŁY PODZBIÓR** | **TOR 10** — `94-KANON-SIEDEM-PRZEBRAN.md` | **2026-08-23** | **SPRAWDZONE DRUGĄ DROGĄ** | Odczytałem dokument. Zastosowane wstecz (§210): §186.1 uzupełniony · **przywróceń po mutacjach nie potwierdzałem sumą SHA — luka własnej metody** · test podzbioru dał **trzy otwarte, dwa odraczane po raz drugi** |
| **A-22** | **`RECZ-250`: rynki EUR renderują PUSTĄ SIATKĘ planów bez komunikatu** — migracja `20260814210000_ceny_per_waluta` niewdrożona na produkcji. Waga WYSOKA | **TOR 10** — `91-DO-WLACZENIA.md:30,169` | **2026-08-23** | **SPRAWDZONE DRUGĄ DROGĄ — częściowo** | **Migracja ISTNIEJE w repozytorium** — potwierdziłem **własnym odczytem drzewa 2026-08-24**: `prisma/migrations/20260814210000_ceny_per_waluta/migration.sql`. **Stan produkcji: R-C.** **To jest `/cennik`, moja trasa — i nie ma tego w żadnym z 42 wsadów** |
| **A-23** | **`/cennik` jest CZWARTĄ kopią liczb planów, nie trzecią** | **TOR 10** — `A8-BRAMKI-LIMITY.md` | **2026-08-23** | **PRZYJĘTE BEZ SPRAWDZENIA** | **`PUNKT-WZNOWIENIA.md` §0.2 nie wiedział o kopii, którą redaguję** |

**Bilans tabeli A — przeliczony maszynowo ze statusów w tabeli, 2026-08-24:**
PRZYJĘTE BEZ SPRAWDZENIA **8** · SPRAWDZONE DRUGĄ DROGĄ **10** · OBALONE **2** ·
NIEZASTOSOWANE **3**. **Razem 23.** **Żywych oznaczeń `P-22` w tabeli A: ZERO.**

> **⚠ DRUGIE SPROSTOWANIE, W TYM SAMYM AKAPICIE, TEGO SAMEGO DNIA.** Wpisałem tu
> najpierw **„7 · 11"**. To była **moja prognoza**, nie odczyt: założyłem, że zdjęcie
> `P-22` z A-17 przesunie wiersz do kolumny „sprawdzone", podczas gdy A-17 **już tam
> stał** — `P-22` siedziało w kolumnie uwag, nie w statusie. Skrypt dał **8 · 10**.
> **Zostawiam obie liczby widoczne** (reguła toru 10: nieważna próba zostaje
> **z opisem, jak wyglądał wynik**). Klasa: **liczba napisana o jeden ruch wcześniej,
> niż ją zmierzono — w zdaniu, którym właśnie ogłaszałem, że liczę skryptem,
> a nie przepisuję.**

> **⚠ POPRZEDNI BILANS BYŁ NIEAKTUALNY ZANIM GO DZIŚ RUSZYŁEM.** Wpis brzmiał
> „12 · 6 · 2 · 3". Przeliczenie **przed** dzisiejszymi zmianami dawało **10 · 8 · 2 · 3** —
> bilans nie został odświeżony po A-06, A-21 i A-22 z 23 sierpnia. **To jest ta sama
> klasa, którą właściciel nazwał 23.08: „to starzało się W MIEJSCU" — licznik pod tabelą
> nie starzeje się w tranzycie, starzeje się bez ruchu, przy każdej edycji wiersza,
> którego autor nie spojrzał w dół.** Dlatego bilans jest teraz **liczony skryptem
> ze statusów**, a nie przepisywany.

> **⚠ SPROSTOWANIE 2026-08-23:** zdanie „nie mam dostępu do kodu aplikacji" było
> **NIEPRAWDZIWE**. Sesja toru 9 została uruchomiona ze źródłem **`catherly-app/fbo-os`** —
> czyli z repozytorium aplikacji. **Jedenaście pozycji oznaczyłem „poza zasięgiem"
> przez PRZEKONANIE, nie przez brak dostępu** (§209).
> **A-06 i A-15 sprawdzone 2026-08-23. Pozostałe do przejrzenia pod tym kątem.** Ale jest to stan,
> który przejmujący ma zobaczyć, zanim uzna moje wyniki za pomiary.

## `P-22` — **definicja ze źródłem** (uzupełniona 2026-08-23)

[**źródło: TOR 8**, rejestr przesłanek warstwy dowodzącej, wpis `P-22`, zapisany
2026-08-23 · repozytorium `fbo-os`, gałąź `feat/kontrowersje`]

> ## **`P-22`: „Przekaz poprawny bez drogi weryfikacji. Odbiorca dostał prawdę,
> ## której nie umie sprawdzić."**

**Miejsce w rodzinie — dosłownie z wpisu toru 8:**

| # | co jest nie tak | status treści |
|---|---|---|
| **P-19** | wskazanie wzorca **bez sprawdzenia** | **treść MOŻE BYĆ FAŁSZYWA** |
| **P-21** | obrona zapisana **osobno od reguły** | treść prawdziwa, **skutki uboczne niewidoczne** |
| **P-22** | **brak drogi weryfikacji u odbiorcy** | **treść PRAWDZIWA** |

> **Dlaczego najtrudniejsza do wykrycia: odbiorca NIE MA POWODU niczego podejrzewać,
> bo dostał PRAWDĘ.**

**Konsekwencja wyprowadzona przez tor 8, wiążąca dla nadawcy:**
> ## **Obrona leży WYŁĄCZNIE po stronie nadawcy — przekaz niesie DROGĘ WERYFIKACJI
> ## albo jest NIEKOMPLETNY.**

**Moje oznaczenia A-15 i A-17 były prawidłowe** (potwierdzenie właściciela 2026-08-23).
Rozumienie, które zapisałem z kontekstu, **zgadza się co do treści** — ale **było wtedy
cytatem z pamięci i tak je oznaczyłem.** Teraz ma źródło.

### Odnotowanie do rejestru przesłanek — **P-22 przy przekazywaniu P-22**

> **„Przekazałem Ci oznaczenie bez definicji, czyli popełniłem P-22 przy przekazywaniu
> P-22. Ósmy dziś przypadek reguły trafiającej w siebie."** (właściciel, 2026-08-23)

Zapisuję **z jego atrybucją i bez łagodzenia** — bo to jest ta sama figura, którą tor 9
odnotował u siebie osiem razy: **znajomość klasy nie chroni przed klasą**, a moment
przekazywania klasy jest **momentem najwyższego ryzyka jej popełnienia.**

---

# TABELA B — PRZEKAZANE INNYM

| # | ustalenie | adresat | data | **czy JA sprawdziłem, że przyjął — i kiedy** |
|---|---|---|---|---|
| **B-01** | `{minuty}`=30 nie ma oparcia w kodzie — obieg zamknięty przez tabelę obietnic; zlecenie D-B3 niewykonane | **tor 10** | 2026-08-21 | |
| **B-02** | Klasa 2 rodziny Z-1 (3 klucze) — rozjazd zdania z wierszem; jeśli wiersz węższy niż kod, poprawia się **wiersz** | **tor 10** | 2026-08-21 | |
| **B-03** | `Filary.filar2.konkret3` — zdanie i wiersz `TO:78` zgodne, oba z narzędziem w podmiocie; sprawdzić, **czy wiersz jest prawdziwy** | **tor 10** | 2026-08-21 | |
| **B-04** | `Cennik.faq.o2` „zmieniasz plan kiedy chcesz" wobec `subscription_update:false`; zdanie **pilnowane znak w znak** — zdjęcie wymaga zmiany strażnika w pakiecie | **tor 10** | 2026-08-21 | |
| **B-05** | Tarcza: **6 wystąpień, 4 czasowniki, 3 momenty** cyklu na 6 trasach; `alt` twierdzi „propozycja poprawionej wersji", inwentarz mówi „bez AI" | **tor 10** | 2026-08-21 | |
| **B-06** | `scripts/setup-stripe.ts` **poza zasięgiem** — cała analiza rodziny anulowania jest R-C, wymaga potwierdzenia na żywym kodzie | **tor 10 / tor aplikacji** | 2026-08-21 | |
| **B-07** | **POZYCJA PREMIEROWA:** `cennik-snapshot.json` bez daty + bramka porównująca **ze Stripe'em TESTOWYM** = ceny na stronie mogą dziś nie odpowiadać produkcyjnym i **nic tego nie porównuje** | **tor aplikacji, posiedzenie Stripe** | 2026-08-21 | |
| **B-08** | Bramki planów to **ręcznie wpisana trójka boole'ów** (`TabelaPorownawcza.tsx:47-50`) obok czterech liczb z wymuszonym importem, źródłem i datą — **ta sama tabela, dwa reżimy dowodu** | **tor aplikacji / okno www** | 2026-08-21 | |
| **B-09** | Domknięcie kanonu: reguła opisująca klasę jest narzędziem rozpoznania **po fakcie**; zabezpieczeniem jest przeliczenie albo forma, w której zły stan jest niewyrażalny | **tor 8** (właściciel przenosi sam) | 2026-08-21 | |
| **B-10** | Każdy warunek zapisany w kanonie niesie **liczbę pozycji, na których go sprawdzono**, albo jawne „niesprawdzony" — inaczej jest deklaracją | **tor 8** | 2026-08-21 | |
| **B-11** | **O-11:** sześć zamknięć przekierowuje `/login` → `/cennik` — zmiana kodu, **przed O-1** | **okno wykonawcze www** | 2026-08-21 | |
| **B-12** | **O-7:** siódma para obaw — treść + `toHaveCount(6)→7` + STRATEGIA pkt 24 + `Obawy.naglowek` „Sześć"→„Siedem" ×3 języki, **jednym pakietem albo wcale** | **okno wykonawcze www** | 2026-08-21 | |
| **B-13** | Brak `description` i `og:` w **całym serwisie** (0 z 31 artefaktów) — **zmiana kodu, nie treści** | **okno wykonawcze www** *(adresat przypisany przez właściciela 2026-08-23)* | 2026-08-21 → **przekazane 2026-08-23** | |
| **B-14** | **Defekt A-17 NIE WYSTĄPIŁ w `catherly-www`:** EN 2 · DE 3 wartości identycznych z PL, wszystkie uzasadnione. **Ale mechanizm jest tu GORSZY:** `check-parytet.mjs` porównuje **drzewa plików**, nie klucze i nie wartości | **TOR 13** | **2026-08-23** | |
| **B-15** | Karta łańcuchów mierzy **równość między ciągami**, nie **równość z polskim oryginałem** — trzecia oś, której nie ma; zgłoszone przez tor 13 i **potwierdzam jako lukę własnej karty** | **TOR 13** | **2026-08-23** | |
| **B-16** | **ROZSZERZENIE `P-22`: przekaz może nieść drogę weryfikacji TREŚCI i nie nieść drogi weryfikacji DOTARCIA.** Pierwsza chroni przed **przyjęciem fałszu**, druga przed **przekonaniem, że coś zostało przekazane.** Moje 15 przekazań: **zero `P-22` po stronie treści, piętnaście po stronie kanału** | **TOR 8** *(właściciel przekazuje ze źródłem)* | **2026-08-23** | |

**Kolumna potwierdzeń: 15 pól pustych na 15.**

> ## ⚠ **POPRAWKA WYMOGU — właściciel, 2026-08-23**
> **Kolumna zostaje, ale ZMIENIA ZNACZENIE.** Nie „czy adresat przyjął" — tylko
> **„czy JA sprawdziłem, że przyjął, i kiedy".**
> ## **PUSTE POLE ZNACZY ODTĄD: NIE SPRAWDZIŁEM. NIE ZNACZY: NIE DOSZŁO.**
> **To jedyna wersja, którą nadawca umie wypełnić PRAWDZIWIE.**
>
> **Mechanizmu automatycznego dziś nie ma** — i tak to jest zapisane:
> ## **rejestr przepływu pozostaje PROCEDURĄ W PRZEBRANIU STRAŻNIKA, dopóki rejestry
> ## z ośmiu okien nie będą czytelne dla siebie nawzajem.** (brzmienie właściciela)
>
> **Moje 15 pustych pól czyta się teraz poprawnie: nie sprawdziłem żadnego z piętnastu.**
> To jest **prawda o mnie**, a nie fałszywa hipoteza o adresatach.

> ### Skąd ta poprawka — **A-19** [źródło: **TOR 8**, 2026-08-23]
> **Puste pole mierzy BRAK KANAŁU ZWROTNEGO, nie brak przyjęcia.**
> U toru 8 **19 przekazań zostało odnotowanych po drugiej stronie przy ZERZE potwierdzeń
> u nadawcy.** Czyli: przekazania **doszły**, a rejestr nadawcy tego **nie widział**.
>
> **Moje 15 pustych pól NIE znaczy „nic nie doszło". Znaczy: nie mam czym sprawdzić,
> czy doszło.** To jest `P-22` po stronie **kanału**, nie treści — i **rejestr przepływu
> w obecnej postaci mierzy własną ślepotę, nie stan świata.**
>
> **Brakuje trzeciej rzeczy, której żaden z torów nie ma: kanału zwrotnego.**
> Rejestr nadawcy i rejestr odbiorcy są **dwoma osobnymi dokumentami bez połączenia** —
> a wymóg mówi „dopóki adresat nie odnotuje **u siebie**". **Nadawca nie ma jak
> do tego zajrzeć.** Zgłaszam jako lukę konstrukcji, nie jako brak wykonania.

> **B-13 nie miało adresata i zapisałem to jako wadę, nie jako przeoczenie** — ustalenie
> z dowodem i bez adresata jest dokładnie tą klasą, dla której ten rejestr powstał.
> **Adresat przypisany przez właściciela 2026-08-23: okno wykonawcze www.**
> **Rejestr zadziałał w dwa dni: brak adresata był widoczny, więc został uzupełniony.**

---

## Trzy zasady prowadzenia (wymóg właściciela, 2026-08-21)

1. **Wpisem jest USTALENIE, nie temat.** „Korekta liczby kaskad 158 → 156, źródło: tor 1,
   `ARCHITEKTURA-KONTRAKTY-PELNE.md`" — nie „ustalenia o kaskadach".
2. **Data i źródło obowiązkowe.** Ustalenie bez źródła to **cytat z pamięci**, czyli klasa,
   którą znamy. Gdy źródła nie znam — wpisuję **„źródło nieustalone"** (patrz **A-06**),
   nie pomijam.
3. **NIEZASTOSOWANE jest wartością obowiązkową.** Ustalenie przyjęte i nieużyte ma zostawić
   ślad, że **wiedziałem o nim i dlaczego z niego nie skorzystałem** (patrz A-07, A-09, A-10).
