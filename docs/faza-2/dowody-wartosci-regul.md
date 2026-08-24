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

**Wymóg kanonu wobec TEGO dokumentu** (właściciel, 2026-08-24): **każda tabela
dowodów wartości niesie kolumnę kosztu albo deklarację, że go nie mierzy.**
Ten plik niesie **jedno i drugie** — tabelę kosztów oraz jawne zastrzeżenie, że
jej zasięg jest krótszy niż historia projektu.

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
dwudziestu pięciu dowodów nosi datę **2026-08-24**. Możliwe są **trzy**
czytania i **żadnego nie da się stąd rozstrzygnąć — wszystkie zostają
otwarte**:
**(a)** tego dnia intensywnie sprawdzano rzeczy dotąd niesprawdzone;
**(b)** dowody wcześniejsze **istnieją, tylko nie zostały zapisane jako
dowody** — wtedy tabela jest **niepełna od pierwszego dnia**, bo nie zawiera
niczego sprzed 2026-08-19, choć projekt jest starszy;
**(c)** reguły powstałe przed 2026-08-19 **mogły nie mieć dowodów w ogóle**,
bo powstawały jako **zalecenia, nie mechanizmy** — a zalecenie nie ma czym się
opłacić, więc nie zostawia dowodu. Przy tym czytaniu brak jest **własnością
tamtego okresu, nie luką zapisu**, i tabela nie jest niepełna, tylko krótsza
niż projekt.
Czytanie **(b)** wskazał wykonawca jako prawdopodobniejsze; **(c)** dopisał
właściciel 2026-08-24, wprost zastrzegając, że rozstrzygać nie należy.
Praktyczna różnica: przy **(b)** warto przekopać historię sprzed 19.08, przy
**(c)** byłoby to szukaniem czegoś, czego nie ma.

## Dwie zadeklarowane stronniczości tego dokumentu

Obie są nazwane **wprost i na stałe**, bo tabela bez nich czyta się jak bilans,
a bilansem nie jest.

**(1) Do 2026-08-24 nie było tu żadnego dowodu NEGATYWNEGO** — przypadku,
w którym reguła kosztowała więcej, niż dała. Brak nie znaczył, że ich nie było;
znaczył, że **nikt ich nie szukał**. Zbiór przeszukany pod jednym kątem nie
mierzy proporcji. Luka jest domknięta w części — patrz tabela kosztów niżej —
ale domknięta **jednym przeszukaniem o zadeklarowanym zasięgu**, nie
wyczerpująco.

**(3) OŚ ŚLEPOTY, KTÓREJ ŻADNE PRZESZUKANIE STĄD NIE DOMKNIE — i która
dotyczy naszej METODY PRACY, nie narzędzi ani kodu.** Koszt w postaci rzeczy,
która **nie powstała**, bo reguła zniechęciła do jej zaczęcia, **nie zostawia
śladu**: nie ma commita, nie ma pozycji rejestru, nie ma nawet zdania
w przekazaniu. **Żaden nasz rejestr nie ma miejsca na pozycję, której nikt nie
otworzył.** Konsekwencja, którą trzeba widzieć wprost: przy **dwudziestu
jeden klasach kanonu** i **dziesięciu zakazach** (stan 2026-08-24) ta ślepota
**rośnie z każdym wpisem**, a jej rozmiaru **nie da się zmierzyć z wnętrza** —
mierzyłby ją ten sam przepływ pracy, który ją wytwarza. **ODESŁANIE „OSIEM OKIEN" — ZAPISANE JAKO BRAK, ROZWIĄZANE PRZEZ NADAWCĘ.**
Właściciel wskazał, że oś dotyczy „wszystkich ośmiu okien", a treści nie
dołączył; sesja **nie uzupełniła jej domysłem** (reguła 18 kanonu) i zapisała
sam brak. Nadawca uzupełnił nazajutrz: **osiem okien = osiem równoległych okien
roboczych, w których toczy się praca nad Catherly — tory po obu
repozytoriach.** To słownik jego strony, nie tego repozytorium, więc odczytać
go stąd nie było z czego. **Przebieg tej wymiany jest sam w sobie wzorcem
reguły 18:** brak zapisany jawnie → zauważony przez nadawcę → treść dołączona;
koszt wyniósł jedno zdanie. Uzupełnienie domysłem kosztowałoby definicję
wymyśloną po tej stronie i zapisaną jako cudzą.

**Konsekwencja rozwiązania tego odesłania — większa niż samo odesłanie:**
skoro okien jest **osiem**, to opisana wyżej ślepota **nie jest własnością tego
repozytorium, tylko całego przepływu**. Rejestru „pozycji, których nikt nie
otworzył" nie ma w **żadnym** z ośmiu okien, a **każde widzi tylko własne
wnętrze**.

**PYTANIE OTWARTE — I MA POZOSTAĆ OTWARTE** (rozstrzygnięcie właściciela,
2026-08-24): *„czy liczba reguł też powinna mieć koszt".* Właściciel **zakazał
robienia z tego reguły**, i to z powodu, który jest częścią samego pytania:
**reguła o koszcie liczby reguł powiększa licznik, który miałaby mierzyć.**
Byłaby dwudziestą piątą klasą kanonu, powołaną do zmierzenia szkody płynącej
z liczby klas kanonu — pierwszym mechanizmem w tym repozytorium, który
**z definicji** pogarsza wielkość, której pilnuje. **Warunek pomiaru: punkt
spoza okna.** Mierzone z wnętrza, mierzyłby je ten sam przepływ pracy, który je
wytwarza. **Kandydat na zadanie:** świeże okno, **bez kanonu w kontekście**,
żeby ocena nie była skażona znajomością reguł, których koszt ma szacować.
**Kiedyś, nie teraz** — i to również jest częścią rozstrzygnięcia, nie
odkładaniem go.

**(2) „Własny" nie znaczy „niezależny".** Dwadzieścia jeden dowodów z dwudziestu
pięciu jest własnych, i to brzmi lepiej, niż jest: wszystkie powstały
**w jednym repozytorium, w kilkunastu dobach, w jednym przepływie pracy**. Mierzą
więc także **wspólny sposób pracy**, nie wyłącznie same reguły. Ten dokument nie
rozstrzyga, ile z nich przetrwałoby w innym przepływie — i nie da się tego
rozstrzygnąć stąd.

---

## Tabela kosztów — przypadki, w których reguła kosztowała

Zlecenie właściciela `WWW/015`, 2026-08-24: *„przejdź nasze reguły i poszukaj
przypadków, w których reguła kosztowała więcej, niż dała. Nie oceniaj — sama
lista z powodem."* **Oceny tu nie ma**: żaden wpis nie mówi, czy koszt był
wart zapłacenia. Kolumna „koszt zmaterializowany" odróżnia szkodę, która
zaszła, od ryzyka, które zostało poniesione i nie wypaliło — bo mieszanie
tych dwóch rzeczy jest tym samym błędem, co mieszanie dowodu z anegdotą.

| # | Reguła | Co kosztowała | Koszt zmaterializowany? | Własny / przejęty |
|---|---|---|---|---|
| K1 | **Zakaz 1 — zgoda imienna na każdy push** | Siedem osobnych rund zgody w dwie doby na dwanaście commitów. Konkretnie 2026-08-24: poprawka `CLAUDE.md` usuwająca **fałszywe zdanie o automacie backupu** — czyli zabezpieczenie przed cichą utratą pracy — powstała **po** udzieleniu zgody i musiała czekać lokalnie całą rundę. Gdyby sesja padła w tym oknie, ochrona nie byłaby na zdalnym | **nie** — okno się zamknęło bez awarii; koszt był **poniesionym ryzykiem** | **własny** |
| K2 | **Zakaz 8 — żadnego „przy okazji napraw X"** | **T43** (`.env.example` wycięty z każdej migawki) jest znany, tani do naprawy i **nadal działa**: od wykrycia powstały **cztery** migawki, każda z tym samym defektem. Tak samo **T41**. Reguła zamienia tanią poprawkę w pozycję rejestru plus rundę zgody | **tak** — cztery wadliwe migawki, defekt czynny | **własny** |
| K3 | **„Brak dowodu = brak zabezpieczenia" + „mutacja przed wyborem"** | Wzmocnienie komunikatu o anulowaniu wpisem do `$GITHUB_STEP_SUMMARY` — **ściśle lepsze od stanu dzisiejszego i nieosłabiające żadnej bramki** — nie zostało dopisane, bo jego przetrwanie przy anulowaniu jest niepotwierdzone. Warstwa słabsza zostaje **do czasu eksperymentu CI, którego termin nie jest wyznaczony** | **tak** — stan słabszy trwa, bez daty końcowej | **własny** |
| K4 | **Literalne wykonanie zgody, bez rozszerzania poza literę** | `bramka-pelny-zestaw` została na limicie 10 min przez jedną rundę wymiany, przy zmierzonym wtedy zapasie **1,86×**. W tym oknie przekroczenie dałoby czerwień, która nie jest werdyktem | **nie** — żaden przebieg w tym oknie limitu nie przekroczył | **własny** |
| K5 | **Pełne udokumentowanie każdej pozycji rejestru** (opis, pomiar, data, osiągalny commit, warunek powrotu) — praktyka obowiązująca od początku rejestru, **nie** reguła o ogniwach z T39 | Wiersze urosły do kilku tysięcy znaków, więc **dopisanie piątej kolumny wymagałoby przepisania każdego wiersza w całości**. Z tego powodu powstał osobny skorowidz ogniw zamiast kolumny — obejście, nie rozwiązanie. **Przypisanie poprawione 2026-08-24:** T39 tego kosztu nie spowodowała, tylko go **ujawniła** — wiersze urosły przed nią | **tak** — zmiana struktury rejestru jest dziś droga; ujawnione przy **T39** | **własny** |
| K6 | **„Odesłanie bez treści" — zakaz uzupełniania domysłem** | W **T26** stoją dziś dwa odwołania (ustalenie toru 13 o parytecie, korekta „158→156" do toru 8) **bez treści**. Reguła uchroniła przed fałszywą pewnością **i zostawiła zapis niepełny** — czytelnik po tej stronie nie może z nich skorzystać | **tak** — dwa odwołania bezużyteczne stąd | **własny** |
| K7 | **Reguły o zapisie: przekazanie w tym samym commicie, rejestr, prowieniencja, stemple** | Zmierzone `git log --numstat` od 2026-08-23: **dwanaście commitów**, `docs/` **+2122 / −263**, pliki korzenia (`CLAUDE.md`, `STRATEGIA.md`) **+322 / −18**, `.github/` **+81 / −1**, **`src/` `content/` `design/` — zero linii**. **Uwaga o pomyleniu przyczyn, bez której ta liczba wprowadza w błąd:** Faza 4 stoi w spoczynku do bloku designu **z decyzji właściciela**, więc zero w `src/` jest w części zamierzone, a nie wyłącznie kosztem reguł. Rozdzielić tych dwóch przyczyn stąd się nie da | **fakt zmierzony**, nie przypisany jednej przyczynie | **własny** |
| K8 | *(kandydat właściciela)* **Ostrożność wobec nieistniejącego ryzyka** | *„wstrzymanie naprawy na trzy doby"* — **treści po tej stronie nie ma**. Odnotowane jako fakt przekazany, bez opisu; uzupełnienie domysłem byłoby złamaniem reguły 18 kanonu | nieustalone stąd | **przejęty** — repozytorium aplikacji, 2026-08-24, `P-22` |

### Sprawdzenie wsteczne: czy reguła istniała, gdy koszt powstał

Pytanie kontrolne właściciela (2026-08-24): *„czy reguła istniała w chwili, gdy
koszt powstał"* — bo **defekt, z którego reguła powstała, nie jest jej
kosztem**. Przeszedłem wszystkie osiem pozycji.

| poz. | reguła istniała? | uwaga |
|---|---|---|
| K1 | **tak** — zakaz 1 od 2026-08-23 (T31), koszt 2026-08-24 | bez zastrzeżeń |
| K2 | **tak** — zakaz 8 od 2026-08-23, koszt 2026-08-24 | bez zastrzeżeń |
| K3 | **tak, złożone** — „brak dowodu = brak zabezpieczenia" z ADR-018 (2026-08-07); „mutacja przed wyborem" to rozstrzygnięcie z 2026-08-24, a koszt powstał **tego samego dnia, po nim** | odnotowane jako złożenie dwóch reguł o różnym wieku |
| K4 | **tak** — zakaz 1 i zasada nierozszerzania zgody poza literę, od 2026-08-23 | bez zastrzeżeń |
| **K5** | ⚠ **wymagało poprawki — patrz niżej** | pierwotny zapis przypisywał koszt regule młodszej niż sam koszt |
| K6 | **tak, ale najciaśniej** — reguła 18 weszła do kanonu **2026-08-24**, a oba odwołania bez treści zapisano **tego samego dnia, już pod nią** | najcieńszy margines w tabeli; gdyby zapis wyprzedził regułę o godzinę, pozycja byłaby nieprawidłowa |
| K7 | **tak** — reguły o zapisie działały przez cały mierzony okres | bez zastrzeżeń |
| K8 | **nieustalone** — treści przekazu po tej stronie nie ma | `P-22` |

**Poprawka K5, znaleziona tym sprawdzeniem.** Pierwotnie kosztu przypisano
regule o **ogniwach** (T39, wprowadzona przez właściciela 2026-08-23) — a
wiersze rejestru urosły do kilku tysięcy znaków **wcześniej**, więc T39 tego
kosztu nie spowodowała, tylko go **ujawniła**: to przy niej wyszło, że dopisanie
piątej kolumny wymagałoby przepisania wszystkich wierszy. Koszt należy do
**szerszej praktyki pełnego udokumentowania każdej pozycji** (opis, pomiar,
data, osiągalny commit, warunek powrotu), która obowiązuje od początku
rejestru. Zapis w tabeli został poprawiony. **To jest dokładnie ta pułapka,
przed którą ostrzega reguła** — szkoda była realna, data się zgadzała, a
przypisanie było błędne.

### Kandydat właściciela, którego NIE potwierdziłem

**„Odmowa wykonania zlecenia z powodu reguły, gdy zlecenie było trafne"** —
**nie znalazłem takiego przypadku po tej stronie.** Najbliższy to **T35**:
zlecenie o konwencji walidacji kluczy `env` było trafne **co do treści**, ale
jego przedmiot w całości leżał w repozytorium aplikacji (grep: zero trafień
tutaj, komplet tam; `zod` nie jest nawet zależnością tego projektu), więc
odesłanie było poprawne, a nie kosztowne. **Wynik „zero" — z podanym zasięgiem
poszukiwania niżej.**

### Kandydat, który jest czym innym, niż się wydaje

**„Odesłanie do dokumentu, którego nie było" (trzy razy)** — to **nie jest koszt
reguły**, bo w chwili tych trzech przypadków reguła jeszcze nie istniała;
powstała **z nich**, 2026-08-24. To jest **defekt, który regułę wywołał**, więc
jego miejsce jest w tabeli dodatniej (poz. 24), nie w kosztach. Rozróżnienie ma
znaczenie praktyczne: gdyby wpisać je tutaj, kolumna kosztów obciążałaby regułę
szkodą, której reguła zapobiegła.

### Jak szukałem — i czego NIE przeszukałem

**Zasięg przeszukania (2026-08-24):** dziewiętnaście klas kanonu w `CLAUDE.md`,
przy każdej pytanie „czy jest przypadek, w którym jej zastosowanie kosztowało";
pozycje rejestru **T21–T43** (dopisane 2026-08-19…24); rozdział 9 przekazania
(pułapki); rozkład zmian policzony `git log --numstat --since=2026-08-23`.

**Czego NIE przeszukałem, i to jest ta sama luka, co w tabeli dodatniej:**
pozycji **T1–T20**, dwudziestu czterech pozycji treściowych i **całego okresu
sprzed 2026-08-19**. Tabela kosztów ma więc **ten sam horyzont** co tabela
dowodów — pięć dób. Wynik „osiem pozycji" opisuje ten horyzont, nie całą
historię projektu.

**Czego to przeszukanie z natury nie znajdzie:** kosztu w postaci rzeczy, która
**nie powstała**, bo reguła zniechęciła do jej zaczęcia. Takie przypadki nie
zostawiają śladu w repozytorium ani w rejestrze i **żadne przeszukanie stąd ich
nie wykryje** — odnotowane jako granica metody, nie zasypane.

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
