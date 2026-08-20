# Przekazanie sesji — stan na 2026-08-20

Dokument pisany dla **następnej sesji agenta**, bo poprzednia zamknęła się na
limicie kontekstu i wszystko, co niżej, przechodziło dotąd ustnie. Zawiera stan
faktyczny, zasady obowiązujące bez pytania, listę tego, co zrobione, i listę
tego, co czeka — z zaznaczeniem, co jest zablokowane na decyzji właściciela.

Zasada nadrzędna przy czytaniu: **każda liczba tutaj niesie datę i commit**
(kanon ADR-018). Jeśli używasz którejś w nowym dokumencie, sprawdź najpierw, czy
commit jest nadal osiągalny: `git merge-base --is-ancestor <skrót> HEAD`.

---

## 1. Stan repozytorium jednym rzutem oka

| | |
|---|---|
| Katalog pracy | `/Users/sylwesterzabski/Documents/FBO OS - www/catherly-www` — **wyłącznie tu** |
| Gałąź | `faza-4/podstrony` |
| HEAD lokalny | `97399c8` |
| HEAD zdalny (`origin`) | `69c2dab` |
| Niewypchnięte | **4 commity** — `e8b3b73`, `6383580`, `7848900`, `97399c8` |
| Drzewo robocze | czyste |
| Ostatni backup | `catherly-www-2026-08-20-2118.zip` (8,0 MB) → `/Volumes/Extreme SSD/Catherly-www-ZIP`, kod 0 |

Cztery commity czekają na **wyliczoną zgodę właściciela na push**. Poprzednia
zgoda obejmowała dokładnie `547b846`, `bb66141`, `69c2dab` i jest wyczerpana.

---

## 2. Zasady bezwzględne — obowiązują bez pytania

Źródła: `CLAUDE.md` w tym repozytorium + rozstrzygnięcia właściciela z sesji.
Te, których nie ma w `CLAUDE.md`, oznaczono „(ustne)".

**Praca i zakres**
- Pracujesz **wyłącznie** w `catherly-www/`. Sąsiednie repo aplikacji
  (`/Users/sylwesterzabski/Documents/fbo os/fbo-os`) czytasz najwyżej do
  odniesień; nie zmieniasz.
- **Defektów spoza zlecenia się NIE naprawia.** Wpisujesz je do rejestru
  warunków powrotu i idziesz dalej. (ustne, egzekwowane przez całą sesję)
- **Nie osłabiasz strażników.** Zero wyjątków, zero `skip`, zero edycji testów,
  żeby przeszły. Nie „naprawiasz" bramki przez zmianę bramki.
- **Nie oceniasz własnej pracy.** Dowodem jest wykonany test, zwrócony status,
  log — nigdy Twoje przekonanie.

**Git i wypychanie**
- **Nie pushujesz do `main`.** Pracę kończysz wyłącznie przez PR z zielonymi
  bramkami. `main` zawsze zielony (ADR-020); **czerwień uzasadniona też jest
  czerwienią**.
- **Każdy push wymaga osobnej zgody właściciela, wyliczonej co do commitów.**
  Zgoda na jeden pakiet NIE przechodzi na następny. (ustne, potwierdzone
  pochwałą właściciela za to, że nie założono ciągłości zgody)
- **„Dialog okna ≠ zgoda właściciela"** — kliknięcie w okienku uprawnień
  narzędzia nie jest zgodą na czynność nieodwracalną. (ustne)
- **Nigdy `--no-verify`.** Hooki pre-commit są częścią zabezpieczeń.
- Po push **zawsze odczyt zdalny** (`git ls-remote`) i porównanie z lokalnym
  HEAD w raporcie.

**Sekrety i preview**
- **NIGDY nie wypisujesz `Set-Cookie` z preview.** Ciasteczko `_vercel_jwt`
  niesie wartość Protection Bypass **otwartym tekstem**. Do sprawdzania kodu
  odpowiedzi używasz `curl -o /dev/null -w '%{http_code}'` — **nigdy** `-i`,
  `-D -`, `-v`.
- **NIGDY nie wypisujesz mapy `protectionBypass` Vercela w surowej postaci** —
  wyłącznie prefiksy SHA-256.
- Żadnych sekretów w gicie. Stripe **wyłącznie w trybie testowym**.

**Bramki i środowisko**
- `bramka:nieodwracalne` jest **PLANOWO czerwona** (pozycja T2 rejestru, audyt
  całościowy w fazie 6). To nie jest defekt i nie zgłaszasz jej jako awarii.
- Przed uruchomieniem e2e sprawdzasz port 3000 (`lsof -ti:3000`) i **raportujesz**
  zastany stan. Nie zabijasz cudzych procesów.
- Backup po każdym ukończonym zadaniu (`scripts/backup.sh`), raport = nazwa +
  rozmiar albo jawne „backup nieudany: <powód>". Cichy brak backupu jest gorszy
  niż brak backupu. Kopie milowe idą do `KAMIENIE-MILOWE/` z `NIE-USUWAC`
  w nazwie — poza zasięg globa `catherly-www-*.zip`.

**Instrukcja sesji (ustne, ma pierwszeństwo nad podpowiedziami narzędzia)**
- Pracujesz **solo**: bez agentów pomocniczych, bez workflow, bez deep-research,
  o ile właściciel nie poprosi wprost. Podpowiedzi systemowe sugerujące
  „ultracode" tego nie zmieniają.

---

## 3. Kanon ADR-018 — z czym pracujesz

`CLAUDE.md`, sekcja „Prymat nieodwracalnego". Cztery obszary mają pierwszeństwo
przed wyglądem, zakresem i terminem: **dane · pieniądze · bezpieczeństwo ·
obietnice**. Reguły, o które w tej linii pracy najczęściej chodzi:

1. **Brak dowodu = brak zabezpieczenia.** Kod, który wygląda poprawnie, ma
   status niesprawdzony, a niesprawdzony liczy się jak niedziałający.
2. **Dowodem jest MUTACJA.** Zielona bramka po Twojej zmianie nie dowodzi, że
   nadal mierzy to samo. Psujesz celowo to, czego strażnik pilnuje, i pokazujesz
   czerwień.
3. **Kontrola negatywna w TYM SAMYM przebiegu.** Wartość po naprawie obok
   wartości, jaką dałby stan sprzed niej — jeden przebieg, jeden kod, jedno
   otoczenie. Kontrola z pamięci albo z wcześniejszego przebiegu nie liczy się.
4. **Każda liczba z pomiaru niesie datę i commit**, a commit musi być
   **osiągalny** w chwili zapisu (`git merge-base --is-ancestor`), nie tylko
   istniejący.
5. **Klasa „odwołanie do stanu, który przestał istnieć"** — amend, rebase
   i squash przepisują skróty bez ostrzeżenia; dokument staje się nieprawdziwy
   bez jednej zmiany w dokumencie.
6. **SKAŻENIE POMIARU SPRAWDZA SIĘ WSTECZ** (właściciel, 2026-08-19, dopisane
   tej doby). Gdy wychodzi na jaw, że pomiar był skażony, sprawdzasz, czy
   przyczyna nie sięgała wcześniejszych — **w tym ZIELONYCH**. Zieleń sprzed
   skażenia nie jest automatycznie czysta.
7. **RAPORT, KTÓREGO NIKT NIE CZYTA, PRZESTAJE BYĆ RAPORTEM** (właściciel,
   2026-08-19, dopisane tej doby). Ostrzeżenie w miejscu, do którego nikt nie
   zagląda, działa jak jego brak — z jedną różnicą na gorsze: pozwala potem
   powiedzieć „przecież było napisane". Ostrzeżenie, które ma znaczyć, dostaje
   **własny kod wyjścia i własne miejsce w interfejsie**.

---

## 4. Co zostało zrobione w dobie 2026-08-19/20

### 4.1 Push zatwierdzony i wykonany

`4c22d6d..69c2dab`, dokładnie trzy commity z listy właściciela. Odczyt zdalny:
`git ls-remote` = `69c2dab1983a7610c0142bd86b09185be97ab430` = lokalny HEAD
w chwili pushu. Nic ponadto nie poszło.

- `547b846` — kanon: klasa „odwołanie do stanu, który przestał istnieć"
- `bb66141` — rejestr T21: weryfikacja wsteczna skrótów + projekt strażnika
- `69c2dab` — rejestr T22: bramka wydajności nie wyklucza równoległych pomiarów

### 4.2 Samotny pomiar wydajności — jedyne, czego właściciel chciał ze strony

Przebieg **`32302412113`** na `69c2dab`, zadanie **`96227948719`**, okno
**21:10:22 → 21:18:29** (2026-08-19). Startował **13 min 53 s po** zakończeniu
ostatniego z kolidujących zadań (20:56:29) i po wcześniejszym (20:54:01) —
brak nakładania sprawdzony po znacznikach czasu, nie założony.

**Werdykt: ZIELONY. `/` → LCP 1521 ms, zapas +279 ms.** Pełne dane w sekcji 5.

Druga połowa tej samej liczby: **przyrząd zgłasza margines pozorny** — rozrzut
593 ms przy zapasie 279 ms (LCP) i 660 ms przy zapasie 107 ms (TBT). Czyli
pierwszy czysty pomiar po wdrożeniu (c) od razu w nią trafia. To jest materiał
do kierunku (d), sekcja 8.

### 4.3 T22 — trzy rozstrzygnięcia właściciela, wdrożone (commit `6383580`)

Właściciel rozstrzygnął 2026-08-19 trzy kierunki i odłożył czwarty.

**(a) CONCURRENCY — „WPINAJ TERAZ, to nie jest kwestia do rozważenia."**

Blok na poziomie workflow w `.github/workflows/bramki.yml`, między
`workflow_dispatch:` a `jobs:`:

```yaml
concurrency:
  group: bramki-${{ github.event.pull_request.head.ref || github.ref_name }}
  cancel-in-progress: true
```

**Klucz NIE po `github.ref`**, wbrew temu, co proponował wcześniejszy wpis
rejestru. `github.ref` to `refs/pull/N/merge` przy `pull_request`
i `refs/heads/…` przy `push`, więc jedna gałąź wpadłaby do dwóch grup i defekt
wróciłby **cicho, dokładnie w PR**, czyli w chwili merge'u. Klucz idzie po
`pull_request.head.ref || ref_name`, lustrzanie do istniejącej logiki
`OCZEKIWANY_COMMIT`. W pliku stoi komentarz z liczbami kolizji i z tym
uzasadnieniem.

**Dowód przyjęcia — NIEWYKONANY.** Właściciel określił go tak: dwa pushe
w odstępie minuty → drugi anuluje pierwszy, anulowanie widoczne w logu, nie dwa
równoległe pomiary. Wymaga zgody na push i **nie wolno go robić w trakcie
żadnego pomiaru**, bo sam by go zepsuł.

**(b) KLAMRA PROWIENIENCJI** — nowy `scripts/straznik-po-pomiarze.mjs` (180
linii) + krok w workflow:

```yaml
  - name: "Prowieniencja po pomiarze (klamra: to samo wdrożenie na końcu)"
    if: always()
    env:
      LHCI_BAZA: ${{ vars.LHCI_BAZA }}
      VERCEL_AUTOMATION_BYPASS_SECRET: ${{ secrets.VERCEL_AUTOMATION_BYPASS_SECRET }}
      OCZEKIWANY_COMMIT: ${{ github.event.pull_request.head.sha || github.sha }}
      WYNIK_POMIARU: ${{ steps.pomiar.outcome }}
    run: npm run bramka:po-pomiarze
```

Krok „Pomiar" dostał `id: pomiar`, żeby `steps.pomiar.outcome` był dostępny.

Strażnik czyta listę tras z `lighthouserc.cjs` (`ci.collect.url`), pobiera każdą
z `redirect: "manual"` i nagłówkiem obejścia, porównuje `x-catherly-wydanie`
z `OCZEKIWANY_COMMIT`, zbiera rozjazdy i przy niepustej liście kończy
`POMIAR UNIEWAŻNIONY` z wyjściem 1. Tryb lokalny (`LHCI_BAZA` puste) wychodzi 0.

Argument, dlaczego porównanie „po" z `OCZEKIWANY` wystarcza zamiast trzymania
stanu „przed": **rozgrzewka już wymusiła równość na wszystkich siedmiu trasach**
przed pomiarem, więc nie ma pliku stanu do zgubienia. `WYNIK_POMIARU` steruje
wyłącznie brzmieniem komunikatu („zieleń bez pokrycia" / „czerwień
nieprzypisywalna"), nie werdyktem.

**Szczelina spisana wprost w nagłówku skryptu:** klamra nie wykryje podmiany,
która zdarzyła się i cofnęła **wewnątrz** pomiaru — `lhci collect` przechodzi
wszystkie trasy × przebiegi w jednym procesie i nie daje w to wejść.

**Dowody mutacyjne, każdy z kontrolą negatywną w tym samym przebiegu**, na
udawanym preview (lokalny serwer HTTP ze sterowanym nagłówkiem — bez Vercela,
bez sekretu):

| przypadek | wynik |
|---|---|
| wydanie zgodne (kontrola negatywna) | 7/7 ✔, wyjście 0 |
| alias przestawiony na inne wdrożenie | 7/7 rozjazdów, wyjście 1 |
| wdrożenie bez nagłówka wydania | 7/7 braków, wyjście 1 |
| **cel zgaszony w trakcie** (dopisane 2026-08-20) | 7/7 „adres nieosiągalny (fetch failed)", wyjście 1 |

Czwarty przypadek powstał po tym, jak roboczy obserwator CI wypisał 99 razy
`error connecting to api.github.com`, a potem zameldował „OBA PRZEBIEGI
ZAKONCZONE" z kodem 0. Pytanie brzmiało, czy nowy strażnik ma ten sam kształt.
Nie ma: **milczenie celu jest u niego czerwienią, nie ciszą.**

**(c) WERDYKT MARGINESU** — nowy `scripts/werdykt-marginesu.mjs` (220 linii) +
krok w workflow po „Liczby ze wszystkich tras":

```yaml
  - name: "Werdykt marginesu (żółty: margines pozorny)"
    if: always()
    continue-on-error: true
    env:
      LHCI_BAZA: ${{ vars.LHCI_BAZA }}
    run: npm run bramka:margines
```

Skrypt importuje `liczba`, `mediana`, `wybierzReprezentanta` z
`./reprezentant.mjs`, progi z `lighthouserc.cjs`, reprezentanta z
`.lighthouseci/regula-werdyktu.json` (z zapasowym wyliczeniem). Rdzeń:

```js
const zapas = prog - w;
if (zapas < 0) continue;               // już czerwone — o tym mówi pomiar
const rozrzut = Math.max(...wartosci) - Math.min(...wartosci);
if (rozrzut <= zapas) continue;
pozorne.push({ trasa, etykieta, zapas, rozrzut, wartosc: w, prog });
```

Obejmuje LCP, TBT i CLS (każdą metrykę z progiem liczbowym). Wypisuje
`::warning title=Margines pozorny …` per trasa, dokłada tabelę markdown do
`$GITHUB_STEP_SUMMARY` i **wychodzi 1**. Funkcja `pominiete()` jest głośna —
brak danych nigdy nie daje cichej zieleni.

**Odpowiedź na pytanie właściciela „Powiedz, co jest wykonalne":**
**prawdziwy żółty nie istnieje w GitHub Actions.** Zadanie zna trzy stany:
`success`, `failure`, `cancelled`. Status `neutral` istnieje wyłącznie w Checks
API i wyłącznie dla aplikacji GitHub — z poziomu workflow nie da się go
ustawić. Wdrożono najbliższą wykonalną rzecz, mocniejszą niż sama adnotacja:
krok świeci ⚠ (`continue-on-error`), wypisuje `::warning` **na stronie
przebiegu nad listą zadań**, dokłada tabelę do podsumowania i zwraca 1.
Skreślenie jednej linii czyni bramkę blokującą. **Czego to nie daje:** zadanie
i przebieg pozostają zielone, więc reguła ochrony gałęzi tego nie zatrzyma —
jeśli margines pozorny ma blokować merge, jedyną dostępną drogą jest czerwień.

Dowody mutacyjne (c), kontrola negatywna w tym samym przebiegu:

| przypadek | wynik |
|---|---|
| prawdziwe dane lokalne (kontrola negatywna) | wyjście 0, puste podsumowanie |
| jeden **niereprezentatywny** przebieg `/funkcje` zmutowany 1704 → 1500 ms | wyjście 1, „margines pozorny, rozrzut 202 ms przy zapasie 98 ms", `::warning`, tabela w podsumowaniu |
| po przywróceniu pliku | SHA-256 identyczna (`8012bdef130376e3…`), znów wyjście 0 |

Mutowano **dane pomiaru**, nie strażnika, i celowo plik inny niż reprezentant —
żeby werdykt i zapas zostały te same, a zmienił się wyłącznie rozrzut.

**(d) — ODŁOŻONE przez właściciela.** „Nie rozstrzygam dziś, przedstaw go osobno
po samotnym pomiarze. Chcę zobaczyć czystą liczbę, zanim zdecyduję o czymkolwiek
dotyczącym progów." Materiał jest gotowy — sekcja 8.

`package.json` dostał dwa wpisy przed `bramka:podsumowanie`:

```json
"bramka:po-pomiarze": "node scripts/straznik-po-pomiarze.mjs",
"bramka:margines": "node scripts/werdykt-marginesu.mjs",
```

### 4.4 T23 — osobna pozycja rejestru o `fetch-depth` (commit `7848900`)

Polecenie właściciela było wyraźne: *„Ustalenie o fetch-depth jest ważniejsze od
samego strażnika… To nie jest warunek T21, to jest osobna pozycja rejestru
o szerszym zasięgu. Zapisz osobno."*

Stan zmierzony 2026-08-19/20 na `69c2dab`: **15 wystąpień
`actions/checkout@v4`, `fetch-depth` użyte 0 razy**. Domyślnie akcja klonuje
`--depth 1`.

Dowód trzech klonów, skrót `cd06530` (osiągalny z HEAD):

| klon | commitów | `cat-file -t` | `merge-base --is-ancestor` | strażnik |
|---|---|---|---|---|
| pełny (kontrola negatywna) | 159 | `commit` | osiągalny | **zielony** |
| `--depth 1` (to, co robi dziś CI) | 1 | `fatal: Not a valid object name` | nieosiągalny | **czerwony** |
| po `git fetch --unshallow` | 159 | — | osiągalny | **zielony** |

*(Uwaga na rozbieżność, która nie jest błędem: wpis T21 mówi „157 commitów", bo
mierzono go dwa commity wcześniej. Oba wpisy są ostemplowane datą.)*

**Kierunek błędu jest przeciwny do lokalnego** i to jest tu najważniejsze:
lokalnie `git cat-file -t` daje **fałszywą zieleń**, bo obiekt z reflogu leży na
dysku; w CI na płytkim klonie to samo polecenie daje czerwień z zupełnie innego
powodu — obiektu w ogóle nie ma. Dowód D w tym samym przebiegu: skrót widmo
`72f664a` nie jest obiektem **ani w klonie pełnym, ani w płytkim** — reflog nie
podróżuje z klonem. **CI jest surowsze od maszyny lokalnej.**

### 4.5 T24 — nowe ustalenie tej doby (commit `97399c8`)

Znalezione przy sprawdzaniu, czemu `Dostępność` nie chce się skończyć.

**Cztery zadania anulowane, każde po 6 h 00 min ±20 s**, wszystkie na tym samym
kroku `npx playwright install --with-deps chromium`:

| przebieg | zadanie | okno |
|---|---|---|
| `32302412113` (`69c2dab`) | Dostępność | 21:10:21 → 03:10:41 |
| `32300222841` (`b51d0b8`) | Pełny zestaw e2e | 20:45:53 → 02:46:09 |
| `32300453626` (`4c22d6d`) | Pełny zestaw e2e | 20:48:29 → 02:48:46 |
| `32300453626` (`4c22d6d`) | Dostępność | 20:48:28 → 02:48:44 |

`grep -c timeout-minutes .github/workflows/bramki.yml` = **0**, więc obowiązuje
domyślny limit platformy — sześć godzin.

Trzy skutki, z czego trzeci jest niewygodny:

1. Około **24 h czasu runnera** spalone w jeden wieczór.
2. Zawieszona bramka kończy się jako `cancelled`, **a to nie jest werdykt**.
   Brak werdyktu wygląda w interfejsie jak brak problemu — bramka, która nigdy
   nie odpowiedziała, jest w odbiorze wygodniejsza niż ta, która odpowiedziała
   „nie".
3. **Koszt wniesiony przez własne rozstrzygnięcie (a):** `cancel-in-progress`
   czyni `cancelled` stanem normalnym i oczekiwanym, więc czytelnik traci
   możliwość odróżnienia „anulowane, bo wyparte nowszym pushem" od „anulowane,
   bo wisiało sześć godzin". Przed (a) `cancelled` było sygnałem samo w sobie.

**Konkretna strata: dla wypchniętego `69c2dab` bramka `Dostępność` NIE MA
WERDYKTU.** Zieleń dostępności jest udowodniona wyłącznie dla `b51d0b8`
(przebieg `32300222841`).

Poszlaka co do przyczyny, **nie dowód**: w tym samym oknie lokalny `gh` stracił
łączność z `api.github.com` na 99 kolejnych prób, więc to wygląda na zdarzenie
sieciowe wieczoru, a nie defekt kodu. Trwałym ustaleniem jest brak limitu, który
**każde** takie zdarzenie zamienia w sześć godzin ciszy.

### 4.6 Cztery commity tej doby

| commit | co |
|---|---|
| `e8b3b73` | kanon: skażenie sprawdza się wstecz + raport, którego nikt nie czyta (`CLAUDE.md`) |
| `6383580` | T22 (a)(b)(c) — workflow +72 linie, 2 nowe skrypty (400 linii), `package.json` |
| `7848900` | rejestr: T22 rozstrzygnięte trzema kierunkami, T23 osobno |
| `97399c8` | rejestr T24 + czwarty dowód mutacyjny dopisany do T22 |

Przed każdym commitem: `eslint . --max-warnings=0` → 0; bramki `tokeny`,
`liczby`, `parytet`, `kontrakt`, `kotwice` → zielone; `bramki.yml` parsuje się
i ma kroki w zamierzonej kolejności; hook pre-commit przeszedł bez `--no-verify`.

---

## 5. Pełne dane samotnego pomiaru

Przebieg `32302412113`, `69c2dab`, 2026-08-19, 7 tras × 5 przebiegów, rozgrzewka
7 tras × 2. Progi: **LCP 1800 ms · TBT 200 ms · CLS 0,1**. Reguła werdyktu:
**przebieg o medianowym LCP** (ustalona przy `26c38f2`; uwaga — to *nie* jest to
samo co „medianowe LCP").

| trasa | mediana LCP | zapas | przebiegi surowe LCP | rozrzut |
|---|---|---|---|---|
| **`/`** | **1521** | **+279** | 1873 · 2102 · 1514 · 1509 · 1521 | **593** |
| `/funkcje` | 1485 | +315 | 1483 · 1485 · 1521 · 1369 · 1491 | 152 |
| `/dla-kogo` | 1501 | +299 | 1508 · 1501 · 1377 · 1511 · 1493 | 134 |
| `/funkcje/pozyskiwanie` | 1475 | +325 | 1493 · 1497 · 1475 · 1367 · 1426 | 130 |
| `/funkcje/tresci` | 1480 | +320 | 1480 · 1366 · 1376 · 1497 · 1486 | 131 |
| `/funkcje/zespol` | 1489 | +311 | 1409 · 1490 · 1503 · 1226 · 1489 | 277 |
| `/funkcje/wyniki` | 1493 | +307 | 1383 · 1369 · 1497 · 1522 · 1493 | 153 |

TBT (próg 200 ms): `/` → mediana 93, przebiegi **704** · 44 · 77 · 94 · 93,
rozrzut 660. Pozostałe trasy: mediany 54–81 ms, rozrzuty 19–33 ms.

CLS: **0,000 w każdym przebiegu, na każdej trasie.**
a11y: **1,00 w każdym przebiegu, na każdej trasie.**

Fazy LCP dla `/`: TTFB 612 ms · Load Delay 0 · Load Time 0 · **Render Delay
908 ms**.

`benchmarkIndex` (własny pomiar szybkości maszyny przez Lighthouse), przebieg 1
kontra mediana trasy:

| trasa | przebieg 1 | mediana | odchył |
|---|---|---|---|
| **`/`** | **2081** | 2397 | **−13,2 %** |
| pozostałe sześć | 2385–2426 | 2377–2415 | −1,2 % … +1,9 % |

---

## 6. Stan rejestru warunków powrotu

Plik: `docs/faza-2/rejestr-warunkow-powrotu.md`. Pozycje T1–T24. Te, które
dotyczą bieżącej linii pracy:

- **T2** — audyt nieodwracalnych, bramka **planowo czerwona**, faza 6. Nie jest
  defektem.
- **T10** — rozrzut szerszy niż zapas na 7 z 7 tras (przebieg `31957994362`,
  `26c38f2`). Bezpośredni przodek T22(c).
- **T20** — zakres wyjątku lintera tokenów szerszy niż jego dokumentacja.
- **T21** — strażnik osiągalności skrótów. **Sześć wiążących ustaleń
  konstrukcyjnych przyjętych przez właściciela, bez implementacji:**
  (1) test to `merge-base --is-ancestor`, nigdy `cat-file -t`;
  (2) dzisiejsze CI przewróciłoby taką bramkę na wszystkich 140 odwołaniach
  naraz (→ wydzielone jako T23);
  (3) bramka nie może zgadywać po kształcie tokenu — 45 ze 191 tokenów hex to
  nie commity, potrzebna **jawna notacja** (np. `commit:abc1234`);
  (4) notacja musi mieć **wariant świadomego widma** (np. `commit-martwy:…`),
  policzalny i raportowany, żeby nie stał się cichym wyłącznikiem;
  (5) odwołania międzyrepozytoryjne wymagają repo w notacji i **jawnej
  deklaracji, że bramka ich nie weryfikuje**;
  (6) skanuje **wszystkie** pliki, nie tylko zmienione.
  Weryfikacja wsteczna (`547b846`, 103 pliki + `CLAUDE.md`): 191 tokenów hex,
  **140 odwołań osiągalnych, zero bezpowrotnych**, 5 wystąpień jednego
  świadomego widma `72f664a`, 1 skrót drzewa, 45 tokenów niebędących obiektami
  gita. Właściciel do protokołu: *„Nasza dokumentacja mówi prawdę o własnych
  dowodach — po raz pierwszy sprawdzone."*
- **T22** — rozstrzygnięta trzema kierunkami (4.3). Warunek zamknięcia
  **niespełniony**: przebieg wydajności, w którym `/` mieści się pod progiem
  **i** przyrząd NIE zgłasza marginesu pozornego. Dziś spełniona jest pierwsza
  połowa. Kierunek (b') z pierwotnej listy — **mierzyć niemutowalny adres
  wdrożenia zamiast aliasu** — pozostaje niewdrożony.
- **T23** — `fetch-depth` (4.4). Bez implementacji.
- **T24** — `timeout-minutes` (4.5). Bez implementacji.

---

## 7. CO POZOSTAJE DO ZROBIENIA

### 7.1 Zablokowane na zgodzie właściciela

1. **Push czterech commitów** `e8b3b73`, `6383580`, `7848900`, `97399c8`
   z odczytem zdalnym. Prośba złożona, **odpowiedzi jeszcze nie ma**.
2. **Dowód przyjęcia dla (a)** — dwa pushe w odstępie minuty, sprawdzić, że
   drugi anuluje pierwszy i że anulowanie widać w logu. Wymaga tej samej zgody.
   **Nie wolno go uruchamiać w trakcie żadnego pomiaru.** Właściciel został
   zapytany, czy ma iść od razu po pushu, czy osobno.

### 7.2 Decyzje właściciela, na które czeka robota

3. **Kierunek (d)** — progi / reguła werdyktu odporna na rozrzut. Materiał
   gotowy (sekcja 8). Rekomendacja: **najpierw jeden eksperyment rozstrzygający**
   (trasa ofiarna na początku listy, ~8 min CI), dopiero potem wybór miary.
4. **T21** — czy wdrażać strażnika osiągalności i w jakiej notacji.
5. **T23** — czy `fetch-depth: 0` wchodzi we wszystkie 15 kroków (jednolicie,
   kosztem klonu rosnącego z historią), czy tylko w zadania czytające historię
   (taniej, ale nowa bramka historyczna w zadaniu bez tego ustawienia znów
   przewróci się cicho).
6. **T24** — dwie rzeczy naraz: **jaki limit** (najdłuższa uczciwa bramka to
   dziś `Pełny zestaw e2e` 5 min 23 s i `Wydajność` 8 min 07 s, więc 20–30 min
   jest wielokrotnością zmierzonego czasu, nie gorsetem) oraz **czy dodać krok
   rozróżniający `cancelled`** — wyparcie przez nowszy przebieg kontra
   przekroczony limit. Bez tego drugiego (a) i T24 zlewają się w jeden
   nieczytelny status.
7. **Czy utrwalić harnesy mutacyjne w repozytorium** (dziś żyją w katalogu
   sesyjnym i znikną — sekcja 11). Kanon mówi „dowodem jest mutacja"; jeśli
   dowód ma być odtwarzalny, harnesy powinny trafić np. do `scripts/dowody/`.
   To zmiana zakresu, więc czeka na decyzję.

### 7.3 Robota techniczna gotowa do wykonania po pushu

8. **Powtórzyć bramkę `Dostępność` dla wypchniętego stanu** — dla `69c2dab` nie
   ma werdyktu (zadanie anulowane po 6 h). Zieleń dostępności jest udowodniona
   tylko dla `b51d0b8`.
9. **Sprawdzić, czy `concurrency` i dwa nowe kroki zachowują się na runnerze**
   tak jak lokalnie — dotąd (b) i (c) mają wyłącznie dowody z udawanego preview
   i z danych lokalnych, nigdy z CI.

### 7.4 Poza tą linią pracy

10. **Blok designu (wtorek)** — właściciel: *„Reszta czeka do bloku designu."*
    Cała robota nad podstronami jest w stanie spoczynku do briefu designu.

---

## 8. Materiał do kierunku (d)

Czysta liczba mówi rzecz, której nie dało się zobaczyć w skażonych przebiegach:
**próg nie jest problemem.**

| trasa | mediana LCP | zapas | max−min | MAD | werdykt (c) dziś | z MAD |
|---|---|---|---|---|---|---|
| **`/`** | 1521 | +279 | **593** | **12** | **POZORNY** | ok |
| `/funkcje` | 1485 | +315 | 152 | 6 | ok | ok |
| `/dla-kogo` | 1501 | +299 | 134 | 8 | ok | ok |
| `/funkcje/pozyskiwanie` | 1475 | +325 | 130 | 22 | ok | ok |
| `/funkcje/tresci` | 1480 | +320 | 131 | 17 | ok | ok |
| `/funkcje/zespol` | 1489 | +311 | 277 | 14 | ok | ok |
| `/funkcje/wyniki` | 1493 | +307 | 153 | 29 | ok | ok |

To samo dla TBT: `/` → max−min 660 ms, **MAD 16 ms**; pozostałe trasy MAD 1–8 ms.

**Cały rozrzut `/` siedzi w dwóch pierwszych przebiegach.** Przebiegi 3–5 to
1514 · 1509 · 1521 — zgadzają się co do **12 ms**. Ten sam kształt na TBT:
pierwszy przebieg 704 ms przy medianie 93 ms, czyli 7,5×.

**`/` nie jest niestabilne — `/` jest pierwsze na liście tras** i płaci koszt
rozruchu sesji. `lhci collect` przechodzi trasy po kolei, po 5 przebiegów na
trasę, więc przebiegi 1–2 dla `/` to dwa pierwsze uruchomienia Lighthouse'a
w całej sesji. Kontrola: `benchmarkIndex` przebiegu 1 dla `/` jest **13,2 %
niższy** od mediany, a dla wszystkich sześciu pozostałych tras mieści się
w ±2 %. Żadna inna trasa nie ma wzorca pozycyjnego — ich minima wypadają na
pozycjach 1, 2, 3 i 4 bez ładu.

**Niewygodna konsekwencja dla własnej roboty:** (c) w obecnej postaci zapali się
na `/` praktycznie w każdym przebiegu, z powodu niezwiązanego ze stroną.
Ostrzeżenie, które świeci zawsze, to dokładnie rodzina „raport, którego nikt nie
czyta" — ta sama, którą tej doby wpisano do kanonu. **Wdrożenie jest poprawne co
do zamiaru i wadliwe co do miary.**

Trzy drogi, każda z ceną:

- **Miara odporna (MAD zamiast max−min).** `/` daje 12 ms i przechodzi, przy
  zachowanej czułości na prawdziwą niestabilność. Cena: MAD odpowiada na pytanie
  „czy mediana jest wiarygodna", nie „czy użytkownik dostaje równą stronę".
  Jeśli 2 z 5 przebiegów to 2100 ms, część ludzi naprawdę widzi wolną stronę,
  a MAD to ukrywa.
- **Reguła pesymistyczna** (werdykt z najgorszego przebiegu). Uczciwa i ostra:
  `/` = **2102 ms → CZERWIEŃ już dziś**; wszystkie pozostałe trasy przechodzą
  (ich najgorsze wartości to 1497–1522 ms). Bramka mówiłaby prawdę o najgorszym
  doświadczeniu — kosztem czerwieni za koszt rozruchu przyrządu.
- **Odjęcie rozruchu** (przebieg ofiarny albo trasa ofiarna na początku listy).
  Cena poznawcza największa: nie da się dziś rozdzielić, ile z 2102 ms to zimny
  Chrome na runnerze (przyrząd), a ile zimna instancja Vercela (rzecz, którą
  widzi użytkownik). Przebieg 1 ma zaniżony `benchmarkIndex` i jest przyrządem;
  **przebieg 2 ma zdrowy `benchmarkIndex` i mimo to 2102 ms** — więc to raczej
  strona, nie maszyna.

**Rekomendacja przedstawiona właścicielowi:** najpierw jeden eksperyment
rozstrzygający — wstawić trasę ofiarną na początek listy i zobaczyć, czy rozrzut
przenosi się na nią, a `/` się wyprostuje. Koszt: jeden przebieg CI, ~8 min.
Jeśli się przeniesie → to przyrząd i miarą ma być MAD. Jeśli zostanie na `/` →
to strona ma zimny start i właściwą odpowiedzią jest reguła pesymistyczna, nie
łagodniejsza miara. Bez tego każdy wybór progu byłby zgadywaniem.

---

## 9. Pułapki, na których ta sesja już się przewróciła

Zapisane, żeby nie powtarzać.

- **`github.ref` w kluczu `concurrency`** dzieli jedną gałąź na dwie grupy
  (`refs/pull/N/merge` vs `refs/heads/…`). Defekt wraca cicho w PR.
- **`git cat-file -t` daje fałszywą zieleń** na skrócie z reflogu. Test
  osiągalności to `git merge-base --is-ancestor`.
- **CI jest surowsze od maszyny lokalnej** — płytki klon nie ma nawet obiektu.
- **Powłoka to zsh, nie bash**: `${pipestatus[1]}`, nie `${PIPESTATUS[0]}`.
- **Systemowy `grep` to ugrep** — brak lookbehind.
- **`gh run watch` zwraca 1 przy braku sukcesu**, a przy zerwanej sieci potrafi
  wyjść zerem po serii błędów. Roboczy obserwator zameldował „OBA PRZEBIEGI
  ZAKONCZONE" po 99 błędach połączenia. Pętla polling musi rozróżniać „skończone"
  od „nie udało się zapytać".
- **Artefakt CI wozi tylko HTML, nie pliki `lhr-*.json`.** Żeby mieć lokalne dane
  do pracy nad werdyktem: `npx lhci collect --url=… --numberOfRuns=5`.
- **`werdykt-po-lcp.mjs` wychodzący 1 lokalnie jest OCZEKIWANY** — lokalne `/`
  ~1852 ms jest czerwienią termometru w trybie lokalnym (udokumentowane
  w `lighthouserc.cjs`).
- **`--lhr` w `lhci` jest pułapką** (odnotowane wcześniej w pamięci projektu).
- **Reguła werdyktu to przebieg o medianowym LCP**, a nie medianowa wartość
  metryki. Różnica bywa istotna.
- **Bramka `nieodwracalne` jest planowo czerwona** — całościowy werdykt przebiegu
  „failure" przy zielonych pozostałych bramkach jest tu stanem normalnym.
- **Bramka `dostępność` mierzy lokalny build**, nie preview
  (`bramki.yml:167-205`), więc nie konkuruje o alias z pomiarem wydajności.
- **Rotacja klucza obejścia jest domknięta po stronie Vercela (1 klucz)**, ale
  „sekret ustawiony ≠ sekret właściwy" — sprawdzenie jest po prefiksie SHA-256.

---

## 10. Gdzie co leży

**Zmienione/nowe tej doby**
- `.github/workflows/bramki.yml` — blok `concurrency`, `id: pomiar`, dwa nowe
  kroki (prowieniencja po pomiarze, werdykt marginesu)
- `scripts/straznik-po-pomiarze.mjs` — **nowy**, 180 linii
- `scripts/werdykt-marginesu.mjs` — **nowy**, 220 linii
- `package.json` — `bramka:po-pomiarze`, `bramka:margines`
- `CLAUDE.md` — dwie nowe reguły kanonu ADR-018
- `docs/faza-2/rejestr-warunkow-powrotu.md` — T22 przepisana, T23 i T24 nowe

**Czytane, nośne, nietknięte**
- `scripts/sprawdz-preview.mjs` — strażnik startowy, tylko `/`
- `scripts/rozgrzewka-preview.mjs` — rozgrzewka, sprawdza prowieniencję na
  wszystkich 7 trasach (dlatego brakowało tylko ramienia „po")
- `scripts/podsumowanie-pomiaru.mjs` — tu mieszkało nieczytane ostrzeżenie
  o rozrzucie (linie ~246–254)
- `scripts/reprezentant.mjs` — reguła „przebieg o medianowym LCP"
- `lighthouserc.cjs` — 7 tras, `numberOfRuns: 5`, progi LCP 1800 / CLS 0,1 /
  TBT 200
- `docs/faza-2/rejestr-warunkow-powrotu.md` — rejestr T1–T24
- `docs/RAPORT-POWYKONAWCZY-WWW.md` — matryca dla następnych stron

**Poza tym repozytorium**
- `RECZ-286` (rodzina „narzędzie potwierdza poprawność artefaktu, którego nie da
  się użyć") — `/Users/sylwesterzabski/Documents/fbo os/fbo-os/docs/ZADANIA_RECZNE.md:3433`
- Backupy — `/Volumes/Extreme SSD/Catherly-www-ZIP`, kopie milowe
  w podkatalogu `KAMIENIE-MILOWE/`

---

## 11. Rzeczy ulotne — znikną razem z sesją

Katalog sesyjny:
`/private/tmp/claude-502/-Users-sylwesterzabski-Documents-FBO-OS---www/b5f46785-71a6-4c33-a50c-96d9e76258b6/scratchpad`

Leżą tam **harnesy dowodów mutacyjnych** — jedyne wykonywalne kopie:

- `mutacja-po-pomiarze.mjs` — udawany preview na porcie 4331 ze sterowanym
  `x-catherly-wydanie`; trzy przypadki dla (b)
- `mutacja-cisza-przyrzadu.mjs` — port 4332; czwarty przypadek dla (b) (cel
  zgaszony w trakcie)
- `mutacja-marginesu.mjs` — mutuje LCP jednego niereprezentatywnego `lhr`,
  sprawdza SHA-256 po przywróceniu; trzy przypadki dla (c)
- `proba-klonu.sh` — dowód trzech klonów dla T23
- logi: `wydajnosc-3.log` (samotny pomiar), `collect-lokalny.log`,
  `werdykt-lokalny.log`, `step-summary.md`

**Wyniki wszystkich tych dowodów są spisane w rejestrze**, więc nie ginie
ustalenie — ginie możliwość powtórzenia go jednym poleceniem. Decyzja
o utrwaleniu ich w repo czeka na właściciela (punkt 7.2.7).

`.lighthouseci/` w repo (gitignored) trzyma lokalne dane pomiarowe; zmutowany
plik został przywrócony, SHA-256 sprawdzona i identyczna.
