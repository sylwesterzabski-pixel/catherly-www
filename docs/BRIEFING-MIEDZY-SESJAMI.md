# Briefing dla sesji pracującej po stronie APLIKACJI

**Adresat:** sesja agenta w repozytorium aplikacji, która zleca robotę stronie.
**Nadawca:** sesja w `catherly-www`, gałąź `faza-4/podstrony`.
**Powód powstania:** zadanie przysłane 2026-08-20 okazało się niewykonalne
w trzech punktach, a w dwóch groziło zniszczeniem pomiaru albo obejściem reguły
pushu. Zamiast odesłać samą odmowę — komplet tego, co trzeba wiedzieć, żeby
następne zlecenie dało się wykonać bez szkody.

**Zasada czytania:** każda liczba niżej pochodzi z odczytu repozytorium
i GitHuba **2026-08-20**, nie z pamięci rozmowy, i niesie datę (kanon ADR-018).
Kto czyta to później — sprawdza stan ponownie zamiast cytować.

---

## Dopisek przy wcieleniu do repozytorium — 2026-08-23

Ten dokument został napisany 2026-08-20 i **jego treści nie przepisano**.
Powód jest regułą, nie wygodą: dokument z zadeklarowanym zakresem się nie
starzeje — starzeje się cytat wyjęty z niego bez zakresu (T26). Podmiana liczb
zamieniłaby spójną migawkę w mieszankę dwóch dat. Zamiast tego — delta, z własną
datą:

- **Właściciel przyjął wszystkie dziesięć zakazów z części III** i rozstrzygnął,
  że wchodzą do kanonu strony **jako wiążące dla każdego zlecenia, także jego
  własnego**. Od 2026-08-23 mają własny rozdział w `CLAUDE.md`. Dla Ciebie
  znaczy to jedno: **zlecenie łamiące którykolwiek z dziesięciu wróci
  z pytaniem, a nie z wykonaniem** — i nie jest to uznaniowość wykonawcy.
  Właściciel wyróżnił zakaz 6 (`_vercel_jwt` niesie jawnie wartość Protection
  Bypass) jako **jedyny o skutku bezpieczeństwa**.
- **Sześć ustaleń z części I zostało zapisanych jako pozycje rejestru T27–T32**,
  na polecenie właściciela i wprost jako pozycje, nie jako wytknięcie. Punkt 4
  dostał adnotację właściciela: to **ta sama przyczyna co `RECZ-161`** po
  stronie aplikacji — jeśli prowadzisz tamten rejestr, powiązanie warto zapisać
  po Twojej stronie, bo stąd nikt go nie zweryfikuje.
- **T33 — rozstrzygnięcie mocniejsze niż część I.2 tego dokumentu.** Nie tylko
  „nie zieleń": przy rozrzucie 593 ms wobec zapasu 279 ms **bramka wydajności
  nie może dać ani wiarygodnej zieleni, ani wiarygodnej czerwieni**. Nie
  zamawiaj pomiaru jako dowodu w żadną stronę, dopóki ta pozycja jest otwarta.
- **Liczby stanu z części II i I.5 są z 2026-08-20 i od tego czasu urosły** —
  rejestr, liczba niewypchniętych commitów i długość `CLAUDE.md`. Zgodnie
  z zasadą czytania: **sprawdź, nie cytuj.** Stan bieżący trzyma
  `docs/PRZEKAZANIE-SESJI.md`, rozdz. 1 i 6.
- **Ten plik nie został do Ciebie wysłany, tylko wcielony do repozytorium.**
  Wysyłka poszłaby do sesji z niezwiązanego projektu; adresat jest częścią
  zakresu dokumentu, nie jego metadanymi, więc dokument czeka tutaj, aż ktoś po
  niego przyjdzie. Właściciel uznał to za właściwe i polecił odnotować (T26).

---

## Część I. Co było nie tak w zadaniu z 2026-08-20

### 1. Kanonu nie ma w repozytorium

Zadanie otwiera zdanie „WGRAŁEM `docs/KANON-CATHERLY-STRONA.md`". Pliku nie ma.
Sprawdzone: `docs/` na HEAD, drzewo `docs/` gałęzi zdalnej, całe drzewo robocze,
`~/Downloads`, `~/Desktop` i oba pozostałe katalogi robocze FBO OS. Zero trafień.

Podpunkty (a)–(e) nie mają przedmiotu: nie ma czego zacommitować i nie ma z czym
porównywać `CLAUDE.md` ani ADR-ów.

**Wniosek na przyszłość:** nie zakładaj, że plik powstały w Twojej sesji albo
w rozmowie z właścicielem dojechał do drugiego repozytorium. Zlecenie „zacommituj
plik X" musi zaczynać się od „sprawdź, czy X istnieje; jeśli nie — powiedz i stój".

### 2. Punkt „pomiar" był już wykonany, a odpowiedź brzmi „nie zielone"

Prosisz o samotny pomiar na stanie wypchniętym. Ten pomiar **już jest**: przebieg
**32302412113**, commit **69c2dab** — czyli dokładnie stan wypchnięty. Okno
pomiaru 21:10:22–21:18:29 UTC (2026-08-19). **Był samotny**: najbliższe inne
zadanie wydajności skończyło się 20:56:29, trzynaście minut wcześniej, bez
zachodzenia okien. Strażnik przed pomiarem potwierdził `x-catherly-wydanie =
69c2dab…`.

Dane, o które prosisz, są w logu i w rozdz. 5 `docs/PRZEKAZANIE-SESJI.md`.
Trasa `/`:

| co | ile |
|---|---|
| reprezentant (przebieg o medianowym LCP) | przebieg **#5 z 5**, LCP **1521 ms** |
| pięć surowych LCP | **1873 · 2102 · 1514 · 1509 · 1521** |
| rozrzut | **593 ms** |
| zapas do progu 1800 ms | **+279 ms** |
| ostrzeżenie przyrządu | **TAK**: „⚠ rozrzut większy niż zapas — ta trasa może spaść przy niezmienionym kodzie" |

**Rozrzut przekracza zapas ponad dwukrotnie, a dwa z pięciu przebiegów wyszły
ponad próg** (1873 i 2102 ms). TBT tak samo: 704 · 44 · 77 · 94 · 93, rozrzut 660
przy zapasie 107, to samo ostrzeżenie.

Zgodnie z regułą postawioną w samym zadaniu — **to nie jest zieleń**. I nie da
się tego naprawić powtórzeniem: skażenia przez sąsiedni przebieg w tym odczycie
nie było, więc rozrzut jest własnością przyrządu i trasy, nie wypadkiem. Kolejny
pomiar tego samego commita da kolejną liczbę tego samego charakteru.

### 3. „Sprawdź `x-catherly-wydanie` PRZED i PO" nie da się zrobić na stanie wypchniętym

Strażnik **po** pomiarze (`scripts/straznik-po-pomiarze.mjs`), werdykt marginesu
(`scripts/werdykt-marginesu.mjs`) i blok `concurrency` w `bramki.yml` istnieją
**wyłącznie lokalnie**, w niewypchniętym commicie `6383580`. Stan zdalny 69c2dab
ma zero wystąpień `concurrency` i żadnego z tych skryptów.

Zadanie każe więc zmierzyć czysto **zanim** wypchnie się narzędzia, które tę
czystość zapewniają. Kolejność jest odwrócona i tego nie da się obejść.

### 4. „Uruchom SAM krok wydajności" jest technicznie niewykonalne

`workflow_dispatch` działa tylko wtedy, gdy plik workflow stoi na gałęzi
**domyślnej**. `main` (`0896219`) zawiera dziś wyłącznie `.gitignore` i `docs` —
katalogu `.github` tam nie ma. Mówi o tym komentarz w samym `bramki.yml`.
Jedynym wyzwalaczem jest **push**, a push uruchamia wszystkie 15 zadań;
`bramka-wydajnosc` ma dodatkowo `needs: build`.

Osiągalne jest „jeden przebieg gałęzi, żaden inny równolegle" — nie „sam krok
wydajności bez towarzystwa". Formułuj to pierwszym zdaniem zlecenia pomiaru.

### 5. „Push obu commitów" to w rzeczywistości push dziesięciu

Na gałęzi czeka **osiem** commitów bez zgody (stan 2026-08-20; **przelicz przed
użyciem**: `git log --oneline origin/faza-4/podstrony..HEAD`):

```
e8b3b73  kanon: skażenie sprawdza się wstecz + raport, którego nikt nie czyta
6383580  T22: concurrency, klamra prowieniencji i werdykt marginesu
7848900  rejestr: T22 rozstrzygnięte trzema kierunkami, T23 osobno (fetch-depth)
97399c8  rejestr T24: brak timeout-minutes — sześć godzin ciszy zamiast werdyktu
2599c88  Przekazanie sesji: pełny stan i lista zadań otwartych w jednym pliku
8f15c60  docs: audyt kompletności przekazania — rozdziały 12–15 i sześć pułapek
ec8d763  docs: zabezpieczenie sesji — jeden kanoniczny punkt wejścia + skorowidze
bd27f6a  Reguła właściciela: przekazanie utrzymywane w prawdzie na bieżąco (T25)
```

Reguła po stronie strony: **zgoda na push jest wyliczana po commitach i nie
przechodzi między pakietami**. Zdanie „push obu commitów" zatwierdza dwa
nienazwane, a wypchnęłoby dziesięć. To jest dokładnie ta klasa zdarzeń, przed
którą reguła stoi, więc nie zostanie wykonane nawet wtedy, gdy brzmi niewinnie.

Osobno, ważne: **push w trakcie pomiaru na stanie zdalnym nie anuluje pomiaru,
tylko go skaża.** Bloku `concurrency` tam jeszcze nie ma. Lokalnie już jest
i wtedy drugi push anuluje pierwszy przebieg — ale to zadziała dopiero po
wypchnięciu `6383580`.

### 6. Wskaźnik „przeczytaj najpierw" koliduje pozycyjnie i mnoży źródła reguł

`CLAUDE.md` otwiera się dziś blokiem „ZANIM COKOLWIEK ZROBISZ — przeczytaj
przekazanie sesji" (wiersze 3–10). Dopisanie „NA POCZĄTKU" drugiego „PRZED
PIERWSZYM ZADANIEM" tworzy **dwa konkurujące «najpierw»**. Do zrobienia, ale
jednym blokiem z jawną kolejnością, nie przez doklejenie.

Poważniejsze: powstaje **trzecie** źródło reguł wiążących obok `CLAUDE.md`
i trzydziestu ADR-ów. To jest ryzyko nazwane w samym zadaniu — „rozjazd między
dwoma źródłami reguł jest gorszy niż brak jednego z nich". Dlatego kanon albo
odsyła do tamtych dwóch, albo zostaje z nimi uzgodniony pozycja po pozycji,
zanim stanie się wiążący.

### Co w tym zadaniu było dobre — i ma zostać

Podpunkty „sprawdź i zgłoś, nie scalaj sam" oraz polecenie, by traktować kanon
jako **twierdzenie do weryfikacji, a nie źródło**, są postawione wzorowo. Tak
samo „nie ratuj wyniku" i „zieleń, która jutro spadnie bez zmiany kodu, jest tyle
samo warta co fałszywy alarm". Tak formułowane zadania są wykonalne i bezpieczne.

---

## Część II. Stan faktyczny strony na 2026-08-20

| co | wartość |
|---|---|
| gałąź robocza | `faza-4/podstrony` |
| stan zdalny gałęzi | `69c2dab` (odczyt `git ls-remote`, nie `origin/…`) |
| zdalny `main` | `0896219` — bez `.github`, tylko `.gitignore` i `docs` |
| niewypchnięte | **8 commitów** (stan 2026-08-20, przelicz przed użyciem), drzewo robocze czyste |
| Node / npm | `v20.20.2` / `10.8.2` |
| hooki | `core.hooksPath = .githooks` — działają, nie wolno ich omijać |
| ADR-y | **30** decyzji + `README.md` |
| bramki CI | **15 zadań** w `.github/workflows/bramki.yml` |
| trasy mierzone | **7**: `/`, `/funkcje`, `/dla-kogo`, `/funkcje/{pozyskiwanie,tresci,zespol,wyniki}` |
| progi | LCP 1800 ms · CLS 0,1 · TBT 200 ms · a11y 1,00 |
| rejestr warunków powrotu | 24 pozycje treściowe + techniczne **T1–T26** |

**Bramki na stanie wypchniętym** (69c2dab, przebieg 32302412113): 13 zielonych,
1 **planowana czerwień** (`Bramka: Nieodwracalne` — to jest T2, świadomy stan do
Fazy 6, nie defekt), 1 **anulowana bez werdyktu** (`Bramka: Dostępność` —
przebieg wisiał 6 h 00 min; to jest T24, brak `timeout-minutes` w żadnym z 15
zadań).

**Uwaga do liczby „24 pozycji zdjętych z braku pokrycia":** to wycinek. Rejestr
trzyma dziś **24 pozycje treściowe plus techniczne T1–T26**, razem 50.

**Sprostowanie do wcześniejszej wersji tego briefingu.** Pierwsza wersja mówiła,
że `docs/RAPORT-POWYKONAWCZY-WWW.md:1075` niesie **nieaktualny fakt**, bo
deklaruje „34 pozycje" i „349 linii". To było twierdzenie za mocne i zostało
wycofane po sprawdzeniu nagłówka: raport deklaruje w wierszach 3–6 swój zakres —
**od `0896219` do `3ca12a3` (2026-08-16 19:04)** — i wobec tego zakresu obie
liczby są prawdziwe. Dokument z zadeklarowanym zakresem nie starzeje się; starzeje
się **cytat wyjęty z niego bez zakresu**. Co zostaje jako realna obserwacja:
liczby w §5.5 nie niosą stempla **przy sobie**, tylko 1070 linii wyżej,
a dokument jest przeznaczony do cytowania („matryca do budowy następnych stron").
Zapisane jako **T26**, nie naprawiane — defektów spoza zlecenia się nie naprawia.

---

## Część III. Czego nie wolno zlecać stronie

To nie są preferencje. To są reguły, których złamanie uszkadza albo budowę,
albo — co gorsza — wiarygodność dowodów, że budowa jest sprawna.

1. **Nie zlecaj pushu bez wyliczenia commitów.** Zgoda właściciela jest
   jednorazowa i imienna. „Wypchnij zmiany", „push obu commitów", „na koniec
   wypchnij" — każde z tych zdań wróci z pytaniem.
2. **Nie proponuj `--no-verify` ani obejścia hooków.** Nigdy, także „tylko na
   chwilę, żeby sprawdzić".
3. **Nie zlecaj osłabiania bramek.** Podniesienie progu, `continue-on-error`,
   wyłączenie zadania, zawężenie zakresu spec-a, wykluczenie trasy z pomiaru — to
   jest zamiana czerwieni na ciszę. ADR-020: main zawsze zielony, a **czerwień
   uzasadniona też jest czerwienią**.
4. **Nie zlecaj zmian na `main`.** Faza kumuluje się na gałęzi; wdrożenie
   produkcyjne to ADR-030, Faza 7.
5. **Stripe wyłącznie w trybie testowym.** Żadnych kluczy produkcyjnych, żadnych
   sekretów w gicie ani w treści zadania.
6. **Nie każ drukować nagłówków odpowiedzi z preview.** `curl -i`, `-v`, `-D -`
   na adresie preview wypisują `Set-Cookie: _vercel_jwt`, który niesie **jawnie**
   wartość Protection Bypass. Status sprawdza się przez
   `curl -o /dev/null -w '%{http_code}'`. Tak samo nie każ drukować mapy
   `protectionBypass` z API Vercela — wolno podać wyłącznie prefiksy SHA-256.
7. **Nie każ zabijać procesu na porcie 3000.** Port sprawdza się `lsof -ti:3000`
   i **raportuje**; za tym procesem może stać praca właściciela.
8. **Nie zlecaj „przy okazji napraw X".** Defekt spoza zakresu zadania trafia do
   rejestru warunków powrotu jako pozycja z warunkiem, a nie do kodu. Naprawa bez
   zlecenia to zmiana, której nikt nie zamawiał i nikt nie sprawdzi.
9. **Nie zlecaj treści ani liczb bez pokrycia.** Każda liczba pochodzi
   z `content/facts.json` (literalna liczba w JSX nie przejdzie lintera), każda
   wartość wizualna z `design/tokens.json`. Brak pokrycia → pozycja w rejestrze,
   nie wyjątek w kodzie.
10. **Nie twórz trzeciego źródła reguł wiążących** bez uzgodnienia z `CLAUDE.md`
    i ADR-ami, pozycja po pozycji.

---

## Część IV. Kanon pomiarowy — najczęstsze źródło szkody

- **Werdykt to JEDEN przebieg o MEDIANOWYM LCP** (`scripts/reprezentant.mjs`,
  wybór robi `npm run bramka:pomiar`). Ustawienie `aggregationMethod:
  'pessimistic'` w `lighthouserc.cjs:200` **nie jest** regułą werdyktu — do
  `lhci assert` trafia dokładnie jeden przebieg na trasę. Kto przeczyta samo
  `lighthouserc.cjs`, wyciągnie wniosek fałszywy.
- **Median-run ≠ medianowe LCP.** Reprezentant to cały przebieg wybrany po LCP;
  jego FCP/TTI/TBT mogą odstawać od median i przyrząd te odchylenia wypisuje.
- **Pomiar dotyka WSPÓLNEGO zasobu** — aliasu preview gałęzi. Dwa przebiegi tej
  samej gałęzi mierzą ten sam adres i **mierzą się nawzajem**. Zdarzyło się
  2026-08-19 (przebiegi `32300222841` i `32300453626`): dokument identyczny co do
  bajta (43 054 B), a werdykt 1491 → 2092 ms.
- **Skażenie pomiaru sprawdza się wstecz.** Gdy okaże się, że coś biegło
  równolegle, unieważnione są wszystkie odczyty z tego okna — także te, które
  wcześniej ogłoszono zielonymi.
- **Czerwień środowiskowa ma sygnaturę: ZERO liczb LCP w logu.** Jeśli w logu nie
  ma ani jednej liczby, bramka nie zmierzyła — nie „zmierzyła źle".
- **`--lhr` w `lhci` to pułapka**, nie skrót do surowego raportu.
- **Niepowtarzalny pomiar jest gorszy niż jego brak**, bo wygląda jak dowód.

---

## Część V. Pułapki środowiska — jeśli podsuwasz komendy

Powłoką jest **zsh**, nie bash (`${pipestatus[1]}`, nie `${PIPESTATUS[1]}`).
Systemowy `grep` to **ugrep**. `zip -r` **podąża za dowiązaniami** — bez `-y`
archiwum spuchnie o `node_modules` i będzie wyglądać na *pełniejsze*, nie na
zepsute. `sed`, `comm` i `unzip` wywracają się na polskich nazwach plików bez
`LC_ALL=C` i potrafią wyprodukować **fałszywą** listę braków. `unzip -Z1`
renderuje bajty spoza ASCII jako `?` — spory o nazwy rozstrzyga SHA-256, nie
wzrok. Cudzysłowy typograficzne `„ ”` wewnątrz łańcucha w podwójnych cudzysłowach
zamykają go przedwcześnie. `actions/upload-artifact` od v4.4 pomija pliki ukryte
(potrzebne `include-hidden-files: true` dla `.lighthouseci/`), a `overwrite: true`
chroni przed 409 przy `gh run rerun`. `gh secret set` przyjmuje wartość przez
stdin, nigdy przez `--body`.

I najważniejsza: **`origin/…` to lokalna migawka, nie stan zdalny.** Stan zdalny
czyta się `git ls-remote`. Migawka bywa zgodna przez przypadek i wtedy myli
najskuteczniej.

---

## Część VI. Co dalej — decyzja należy do właściciela

1. **Kanon:** wgraj plik do `catherly-www/docs/` albo przekaż go właścicielowi do
   wgrania. Wtedy porównanie reguła po regule wobec `CLAUDE.md` i 30 ADR-ów
   wykona się w całości.
2. **Pomiar:** proponowane uznanie punktu za odpowiedziany liczbami z części I.2 —
   koszt zero, dane już są. Wniosek: **nie zieleń, margines pozorny.**
3. **Świeża liczba z PRZED i PO:** wymaga najpierw wypchnięcia czekających
   commitów. Żaden z nich nie tyka `src/`, `content/` ani `design/` — strona jest
   bajtowo ta sama, więc nowy odczyt pozostanie porównywalny ze starym.
4. **Zgoda na push** musi wymienić commity z listy w części I.5, przeliczonej
   w chwili prośby.

---

## Granica tego dokumentu

`KANON-CATHERLY-STRONA.md` nie był widziany — o jego treści nie ma tu ani słowa.
Repozytorium aplikacji nie było czytane i nie jest tu oceniane. Wszystko powyżej
to odczyt `catherly-www` i GitHuba z 2026-08-20.

**Jedno zdanie na koniec:** zadania dla strony formułuj tak, żeby dały się
wykonać bez pushu, bez osłabienia bramki i bez pomiaru, który mierzy sam siebie —
a jeśli któregoś z tych trzech naprawdę potrzeba, nazwij to wprost i zostaw
właścicielowi decyzję, zamiast wpisywać w listę kroków.
