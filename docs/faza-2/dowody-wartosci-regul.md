# Dowody wartości reguł — jedna tabela zamiast trzech rozrzuconych miejsc

**Miejsce w hierarchii źródeł reguł: szczebel 7 z siedmiu — dokumenty
paneli.** Ten plik **nie jest źródłem reguł** i nie wiąże niczego: reguły stoją
w `docs/adr/` i w `CLAUDE.md`, a przy rozjeździe z nimi obowiązują tamte. To
jest **rejestr dowodów** — spis przypadków, w których reguła już się opłaciła.
Zdanie o miejscu w hierarchii stoi tu od pierwszego commita, bo dokument bez
takiego zdania był defektem, który otworzył **T32**.

**Powód powstania.** Kanon `CLAUDE.md` niesie klasę **„dowody wartości reguły
zapisuje się razem, nie osobno"** (właściciel, 2026-08-24): *pojedynczy
przypadek, w którym reguła się opłaciła, czyta się jak anegdota; dwa
niezależne, zapisane obok siebie, pokazują, czego poprzednia metoda nie
widziała z definicji.* W chwili przyjęcia tej klasy dowody leżały w trzech
różnych miejscach i żaden nie wiedział o pozostałych. **To była pierwsza
reguła, którą trzeba było zastosować do samej siebie** — zlecenie właściciela
2026-08-24, `WWW/014`.

**Kolumna, której klasa 17 nie miała.** Właściciel dodał ją przy zleceniu:
**czy dowód jest WŁASNY, czy PRZEJĘTY**. Rozróżnienie decyduje o tym, czy
reguła stoi na jednym pomiarze, czy na dwóch niezależnych — a to jest różnica
między regułą udowodnioną a regułą, w którą wierzymy dwa razy z tego samego
powodu. Dowód **przejęty** nosi źródło i jest oznaczony `P-22`, jeśli drogi
weryfikacji z tej strony nie ma.

---

## Tabela

| # | Reguła (kanon `CLAUDE.md`, o ile nie zaznaczono inaczej) | Dowód — co konkretnie pokazał | Data | Gdzie leżał przed zebraniem | Własny / przejęty |
|---|---|---|---|---|---|
| 1 | **Kontrola negatywna w tym samym przebiegu** | Etykieta CTA **7,02:1** po naprawie i **1,34:1** w barwie, którą narzucał `a:hover` przed nią — obie liczby z **jednego** przebiegu i jednego kodu. Bez drugiej liczby pierwsza nie odróżnia „naprawione" od „nigdy nie było zepsute" | 2026-08-19 | `CLAUDE.md`, wzorzec przy klasie (A1) | **własny** |
| 2 | **Każda liczba z pomiaru niesie datę i commit** | „Data cofnięta → **45** naruszeń" zmierzone 2026-08-17 dawało tej samej mutacji **77** dwa dni później, bo osłaniany blok urósł | 2026-08-19 | `CLAUDE.md` + **T15** | **własny** |
| 3 | **Commit w stemplu musi być OSIĄGALNY, nie tylko istnieć** | T15 stemplowany `72f664a` po amendzie na `a826464`: **drzewo identyczne, skrót martwy**. `git cat-file -t` dawał tu fałszywą zieleń, `merge-base --is-ancestor` mówił NIE | 2026-08-19 | `CLAUDE.md`, przy tej samej klasie co #2 | **własny** |
| 4 | **Klasa „odwołanie do stanu, który przestał istnieć"** | Rodzina: `RECZ-286` — „narzędzie potwierdza poprawność artefaktu, którego nie da się użyć". Suma dowodzi, że plik się nie zepsuł, nie że da się wrócić | (data nieustalona stąd) | `CLAUDE.md`, wzmianka o rodzinie | **przejęty** — repozytorium aplikacji, `P-22` |
| 5 | **Skażenie pomiaru sprawdza się WSTECZ** | Dwa zadania wydajności mierzyły **ten sam alias** przez 5 min 32 s. Strażnik prowieniencji sprawdzał wydanie tylko na starcie, więc późniejsze przebiegi **zielonego** zadania mogły mierzyć już wdrożenie drugiego commita — skażenie było wzajemne i unieważnia **obie** liczby | 2026-08-19 | `CLAUDE.md` + **T22** | **własny** |
| 6 | **Raport, którego nikt nie czyta, przestaje być raportem** | Linijka „rozrzut większy niż zapas" stała w logu od 2026-08-16 i była wypisana dla `/` w **obu** przebiegach doby 2026-08-19 — także w **ZIELONYM**. Nikt jej nie przeczytał | 2026-08-19 | `CLAUDE.md` + **T22** | **własny** |
| 7 | **Raport, którego nikt nie czyta** — **dowód drugi, niezależny** | Ostrzeżenie o Node 20 wypisywane **15 razy w każdym przebiegu**, w każdym z 15 zadań. Nieczytane przez nieustalony czas; wyszło **przypadkiem**, przy wejściu do logów w zupełnie innej sprawie (czasy zadań do T24) | 2026-08-24 | **T41** | **własny** |
| 8 | **Klasa „wygląda na regułę werdyktu przy pobieżnym czytaniu"** | `aggregationMethod: 'pessimistic'` w `lighthouserc.cjs:200` **nie działa na ścieżce bramki** — `scripts/werdykt-po-lcp.mjs` podaje jeden przebieg na trasę, a przy jednym przebiegu każda agregacja daje tę samą liczbę | 2026-08-23 | `CLAUDE.md`, wzorzec przy klasie | **własny** |
| 9 | **Dokument z zadeklarowanym zakresem się nie starzeje — starzeje się cytat wyjęty bez zakresu** | **Pierwsza diagnoza była błędna** i to jest treść dowodu: odruch brzmiał „nieaktualny fakt do rejestracji", a odczyt nagłówka go obalił — wobec zadeklarowanego zakresu `0896219` → `3ca12a3` obie liczby były prawdziwe co do jedności | 2026-08-20 | **T26** | **własny** |
| 10 | **Adresat jest częścią zakresu, nie metadanymi** | `ListAgents` pokazał pięć sesji `souffle-de-nature-*` z **niezwiązanego projektu**; briefing nie został wysłany. Wysyłka wstrzyknęłaby treść Catherly w cudzą pracę | 2026-08-23 | **T26**, dopisek | **własny** |
| 11 | **ADR-018 pkt 7 — zlecenie pod złym adresem odsyła się** | Zlecenie o konwencji walidacji kluczy `env` (`REQUIRED_IN_PROD`, `RECZ-289`, „tor 8"): **zero trafień** grepem tutaj, komplet w repozytorium aplikacji; `zod` nie jest nawet zależnością tego projektu | 2026-08-23 | **T35** | **własny** (grep w obu repozytoriach) |
| 12 | **Klasa „bramka szkodząca przez poprawność"** | Strażnik wymuszający format klucza `env` tam, gdzie dostawca kształtu nie gwarantuje kontraktem | 2026-08-23 | **T36** | **przejęty** — właściciel ← sesja aplikacji, `P-22`; **pokrycie rodzime: T33, T34** |
| 13 | **Wniosek słuszny z metody nierzetelnej** | `Pełny zestaw e2e` dał **5 min 23 s** (2026-08-20) i **3 min 13 s** (2026-08-23) — **rozrzut 1,67×**. Zgłoszenie cienkiego zapasu było słuszne, ale stało na **jednej** liczbie; przy odwrotnym losie ta sama metoda kazałaby powiedzieć „jest dobrze" | 2026-08-24 | `CLAUDE.md` + **T24** + przekazanie, rozdz. 9 | **własny** |
| 14 | **Wynikanie z kodu to nie pomiar** (`B-17`) | Zapłon 15 kroków `if: cancelled()` wynika z `StepsRunner.cs` i `CancelledFunction.cs` — a **nie znaleziono ani jednego publicznego przebiegu**, w którym wykonałby się krok z warunkiem dokładnie `cancelled()`; wszystkie obserwowane to `always()` | 2026-08-24 | **T24** | **mieszany** — reguła przejęta (tor 8, `P-22`), **przeszukanie własne** |
| 15 | **Pytanie zerowe: czy ta rzecz w ogóle istnieje** | `CLAUDE.md` przez **ponad 200 migawek** twierdził, że backup robi hak `Stop`; klucza `hooks` nie było w **żadnym** pliku konfiguracji. Trzy doby bez kopii minęły **bez jednego sygnału** | 2026-08-24 | **T42** | **własny** |
| 16 | **Weryfikuj backup ODTWORZENIEM, nie sumą** | Pierwsze sprawdzenie odtworzeniem po tej stronie znalazło defekt **przy pierwszym użyciu**: `git status` odtworzonego repo pokazał `D .env.example` — plik **śledzony**, wycięty wzorcem `-x ".env.*"` | 2026-08-24 | **T43** | **własny** |
| 17 | **Weryfikuj backup ODTWORZENIEM, nie sumą** — **dowód drugi, niezależny** | Półtora miesiąca weryfikacji samą sumą; **75 archiwów** przyjętych **z żywymi kluczami** | 2026-08-24 (przekazane) | **T43**, obok #16 | **przejęty** — `RECZ-287`, repozytorium aplikacji, `P-22` |
| 18 | **Klasa „defekt kopii utrwalany przy odtwarzaniu"** | Odtworzone repo pokazuje zmianę, **której nikt nie wprowadził**. Odtwarzający po awarii uzna, że sam skasował plik — i albo szuka nieistniejącej pomyłki, albo **commituje defekt kopii**. Powtórzone przy **trzech** niezależnych migawkach tego samego dnia | 2026-08-24 | **T43** | **własny** |
| 19 | **Dwie strony jednego wzorca rozbite na dwie pozycje dają dwa łatwe rozwiązania, które się wykluczają** | `-x ".env.*"` **chroni** (żaden `.env*` nie trafia na SSD — sekrety niekopiowane) **i szkodzi** (wycina śledzony `.env.example`). „Zawęź wzorzec" i „poszerz wzorzec" znoszą się | 2026-08-24 | **T43** | **własny** |
| 20 | **Zależność twarda w dokumentacji wymaga zapisu, w kodzie nie** | Wykreślenie zdania z `docs/STRATEGIA.md` musiało pójść **po** wpisaniu siedmiu szczebli do `CLAUDE.md` — przy odwrotnej kolejności commit `74fdfe8` odsyłałby do hierarchii, **która STRATEGII nie zawiera** | 2026-08-24 | przekazanie, rozdz. 9 | **własny** |
| 21 | **Zgoda wymieniająca skróty wymaga pushu wymieniającego skróty** (zakaz 1) | Zgoda obejmowała `69e0b52` i `74fdfe8`, a poprawka kanonu powstała **po** jej udzieleniu i leżała już na gałęzi. `git push` bez refspec zabrałby ją — **zgoda na listę zamieniłaby się w zgodę na stan, bez śladu**, bo polecenie kończy się sukcesem | 2026-08-24 | `CLAUDE.md`, zakaz 1 | **własny** |
| 22 | **Zły podzbiór** — zamknięta lista podana bez policzenia | Hierarchia wymieniała **pięć** źródeł; `docs/STRATEGIA.md:3-5` i `docs/PLAN.md:5` deklarowały własne pierwszeństwo, więc były **dwie żywe, sprzeczne deklaracje nadrzędności**. Faktyczna liczba szczebli: **siedem** | 2026-08-24 | **T32** | **mieszany** — pomiar własny (odczyt nagłówków), nazwa klasy przejęta (tor 10, `P-22`) |
| 23 | **Stempel poprawny w chwili powstania, fałszywy w chwili cytowania** | Nagłówki zleceń nosiły **23.08**, gdy zegar maszyny wskazywał **2026-08-24, 08:58 CEST**. Zasięgu **nie da się odtworzyć** — nadawca nie umie wskazać, od którego momentu | 2026-08-24 | **T26** | **własny** (odczyt zegara tutaj), zgłoszony przez właściciela |
| 24 | **Odesłanie bez treści** — dołącz treść albo napisz wprost, że jej nie dołączasz | Odesłanie do „trzech pytań o strażniku", których po tej stronie **nie było**. Sesja odmówiła przepisania z pamięci; nadawca uzupełnił treść ze źródłem. **Asymetria kosztu jest tu całą treścią:** jedno pytanie u nadawcy, cała fałszywa pewność u odbiorcy | 2026-08-24 | **T26** | **własny** (brak wykryty tutaj), zgłoszony przez nadawcę |
| 25 | **Brak dowodu = brak zabezpieczenia** | Najcięższy przypadek w rejestrze: zabezpieczenie uchodziło za działające przez **ponad 200 migawek**, bo **cichy brak backupu jest nieodróżnialny od backupu, którego nie było potrzeby robić** | 2026-08-24 | **T42** | **własny** |

---

## Co widać dopiero po zebraniu — i po co ta tabela powstała

**Trzy reguły mają po dwa niezależne dowody, reszta po jednym.**
„Raport, którego nikt nie czyta" (#6 i #7), „weryfikuj odtworzeniem, nie sumą"
(#16 i #17) oraz — licząc szeroko — „dokument z zadeklarowanym zakresem"
(#9 i #10). **Tylko para #16/#17 jest naprawdę niezależna w sensie źródła:**
jeden dowód własny, drugi z drugiego repozytorium, dwa różne mechanizmy
awarii. Pozostałe pary pochodzą z jednego repozytorium i jednej pary rąk,
więc dowodzą powtarzalności, a nie niezależności.

**Dwadzieścia jeden z dwudziestu pięciu dowodów jest własnych.** To brzmi
dobrze i jest mylące: własny nie znaczy niezależny. Wszystkie powstały
w jednym repozytorium, w kilkunastu dobach, w jednym przepływie pracy — więc
mierzą też **wspólny sposób pracy**, nie tylko same reguły. Ta tabela nie
rozstrzyga, ile z tych dowodów przetrwałoby w innym przepływie; **odnotowuję
to jako granicę, nie zasypuję.**

**Cztery pozycje są przejęte albo mieszane** (#4, #12, #14, #17, częściowo
#22) i wszystkie noszą `P-22` — drogi weryfikacji z tej strony nie ma. Reguła
oparta **wyłącznie** na dowodzie przejętym stoi na cudzym pomiarze i tak ma
być czytana; dziś dotyczy to jednej: klasy „odwołanie do stanu, który przestał
istnieć" w części o rodzinie `RECZ-286` (#4) — ale jej **własne** pokrycie
stoi obok, w #3.

**Skupienie w czasie jest samo w sobie ustaleniem.** Siedemnaście z
dwudziestu pięciu dowodów nosi datę **2026-08-24**. Dwa czytania są możliwe
i nie da się ich stąd rozstrzygnąć: albo tego dnia intensywnie sprawdzano
rzeczy dotąd niesprawdzone, albo **dowody wcześniejsze istnieją, tylko nie
zostały zapisane jako dowody**. Drugie jest prawdopodobniejsze i oznacza, że
ta tabela jest **niepełna od pierwszego dnia** — nie zawiera niczego sprzed
2026-08-19, choć projekt jest starszy.

**Czego w tabeli NIE MA, a czego reguły dotyczą:** żadnego dowodu **negatywnego**
— przypadku, w którym reguła kosztowała więcej, niż dała. Brak takich wpisów
nie znaczy, że ich nie było; znaczy, że nikt ich nie szukał. Tabela jest
zbudowana z rzeczy, które regułom przyznają rację, i **to jest jej wbudowana
stronniczość**, nazwana tu wprost, żeby nikt nie odczytał jej jako bilansu.

---

## Jak dopisywać

Dowód wartości reguły dopisuje się **tutaj**, a nie przy pozycji rejestru —
klasa 17 kanonu wymaga, żeby leżały razem. Jeśli dowód musi zostać także przy
pozycji (bo tam jest jego kontekst), przy pozycji zostaje **odsyłacz do tego
pliku**, nie kopia: dwie kopie tej samej liczby to dwa miejsca do
zdezaktualizowania. Każdy wpis niesie **datę** i — jeśli dotyczy stanu
repozytorium — **osiągalny commit** (`git merge-base --is-ancestor <skrót> HEAD`).
Kolumna własny/przejęty jest **obowiązkowa**; przy przejętym podaje się źródło
i oznaczenie `P-22`, gdy drogi weryfikacji stąd nie ma.
