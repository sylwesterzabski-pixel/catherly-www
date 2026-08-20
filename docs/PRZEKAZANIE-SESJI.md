# Przekazanie sesji — stan na 2026-08-20

Dokument pisany dla **następnej sesji agenta**, bo poprzednia zamknęła się na
limicie kontekstu i wszystko, co niżej, przechodziło dotąd ustnie. Zawiera stan
faktyczny, zasady obowiązujące bez pytania, listę tego, co zrobione, i listę
tego, co czeka — z zaznaczeniem, co jest zablokowane na decyzji właściciela.

Zasada nadrzędna przy czytaniu: **każda liczba tutaj niesie datę i commit**
(kanon ADR-018). Jeśli używasz którejś w nowym dokumencie, sprawdź najpierw, czy
commit jest nadal osiągalny: `git merge-base --is-ancestor <skrót> HEAD`.

---

## 0. START — przeczytaj to, zanim cokolwiek zrobisz

Ten plik jest **punktem wejścia**. Wskazuje na niego `CLAUDE.md`, żeby nie dało
się go minąć — reguła kanonu „raport, którego nikt nie czyta, przestaje być
raportem" dotyczy także tego dokumentu.

**Kolejność czytania (30 minut, nie skracaj):**

1. `CLAUDE.md` (147 linii) — zasady wiążące. Ten plik ich nie zastępuje.
2. **Ten dokument, w całości.**
3. `docs/faza-2/rejestr-warunkow-powrotu.md` (364 linie) — 24 pozycje treści
   + 25 pozycji technicznych T1–T25. **Skorowidz wszystkich w rozdziale 15**,
   szczegóły bieżącej linii w rozdziale 6 — ale **skorowidz to nie jest
   lektura rejestru**.
4. `docs/adr/` — skorowidz trzydziestu tytułów w rozdziale 16, treść tylko tego
   ADR-a, którego dotyczy Twoje zadanie.
5. Rozdział 17 — mapa CI, siedmiu tras i poleceń `npm`, jeśli masz tknąć bramki.

**Pierwsze polecenia po starcie — sprawdź stan, nie zakładaj go:**

```bash
cd "/Users/sylwesterzabski/Documents/FBO OS - www/catherly-www"
git status --short && git log --oneline -1
git log --oneline origin/faza-4/podstrony..HEAD   # co czeka na push
lsof -ti:3000                                     # RAPORTUJ, nie zabijaj
```

**Czego NIE wolno zrobić na starcie, choćby wyglądało niewinnie:**

- **Nie pushuj.** Osiem commitów (stan na 2026-08-20) czeka na zgodę właściciela
  wyliczoną co do commita. Zgoda z poprzedniego pakietu jest wyczerpana i nie
  przechodzi dalej. Liczbę **przelicz**, nie przepisuj — patrz wyżej.
- **Nie uruchamiaj bramki wydajności równolegle z niczym innym** i nie pchaj
  niczego w trakcie jej trwania — to jest dokładnie defekt T22.
- **Nie naprawiaj defektów, których nikt nie zlecił.** Wpis do rejestru, i dalej.
- **Nie zakładaj, że liczby w tym pliku są dziś aktualne.** Każda niesie datę
  i commit właśnie po to, żebyś mógł je sprawdzić.

**Masz obowiązek utrzymywać ten plik w prawdzie — na bieżąco**
(polecenie właściciela 2026-08-20; wiążące brzmienie w `CLAUDE.md`, sekcja
„Przekazanie sesji aktualizowane na bieżąco”).

Reguła w jednym zdaniu: **aktualizacja idzie w TYM SAMYM commicie co zmiana,
którą opisuje.** Nie osobnym commitem „potem" — sesja kończy się na limicie
kontekstu bez ostrzeżenia, więc „potem" znaczy „nigdy". Commit zmieniający stan
repozytorium i zostawiający ten plik nieaktualnym jest **niekompletny**.

Przed każdym commitem przelatujesz pięć miejsc: rozdz. **1** (skróty, liczba
niewypchniętych, stan zdalny), **7** (czy zrobione nadal stoi jako „do
zrobienia"), **9** (czy przewróciłeś się na czymś wartym zapisania), **15**
(nowa pozycja rejestru), **17** (zmiana bramki, trasy, polecenia `npm`).

Ten dokument **unieważnia własną tabelę stanu przy każdym commicie** — łącznie
z commitem, który ją poprawia. Rozwiązanie, którego się trzymaj: pól
samostarzejących się nie wpisuje się wartością, tylko poleceniem do
przeliczenia. Dotyczy to skrótu commita niosącego ten plik (commit nie może
zawierać własnego skrótu — próba daje widmo, sprawdzone) i nazwy ostatniego
backupu.

**Reguła nie ma strażnika** — pilnuje jej wyłącznie zapis w `CLAUDE.md`, czyli
dokładnie klasa „brak dowodu = brak zabezpieczenia". Odnotowane jako **T25**;
budowa strażnika czeka na decyzję właściciela (7.2.8).

**Stan świadomości właściciela:** wie o wszystkim, co jest w rozdziałach 4–6.
Czeka na jego decyzję sześć rzeczy z rozdziału 7. Nie zaczynaj od zadawania
pytań, na które odpowiedź jest w rozdziale 7 — zacznij od sprawdzenia, czy
odpowiedź już padła.

---

## 1. Stan repozytorium jednym rzutem oka

| | |
|---|---|
| Katalog pracy | `/Users/sylwesterzabski/Documents/FBO OS - www/catherly-www` — **wyłącznie tu** |
| Gałąź | `faza-4/podstrony` |
| HEAD lokalny | `8f15c60` (stan 2026-08-20) |
| HEAD zdalny (`origin/faza-4/podstrony`) | `69c2dab` — odczytane `git ls-remote` **2026-08-20**, nie z lokalnego refa |
| `origin/main` | `0896219` — j.w. |
| Niewypchnięte | **8 commitów** — `e8b3b73`, `6383580`, `7848900`, `97399c8`, `2599c88`, `8f15c60`, `ec8d763` **+ ten, który niesie ten dokument** (jego skrótu nie da się tu wpisać: commit nie może zawierać własnego skrótu — przelicz `git log --oneline origin/faza-4/podstrony..HEAD`) |
| Drzewo robocze | czyste |
| PR dla tej gałęzi | **żaden nie istnieje** (`gh pr list --head faza-4/podstrony` → puste) |
| Backupy repo | `/Volumes/Extreme SSD/Catherly-www-ZIP`, migawka po każdym zadaniu (hook `Stop`), ~8 MB każda. **Nazwy ostatniej nie wpisuję** — starzeje się przy każdym zadaniu; sprawdź: `ls -t "/Volumes/Extreme SSD/Catherly-www-ZIP" \| head -3` |
| Archiwum katalogu sesyjnego | `/Volumes/Extreme SSD/Catherly-www-SESJE/scratchpad-sesja-2026-08-20-b5f46785-NIE-USUWAC.zip` — rozdział 11 |

**Środowisko:** Node `v20.20.2`, npm `10.8.2`, Next `^15.5.23`, `package-lock.json`
(npm, nie pnpm/yarn), `core.hooksPath = .githooks`. Sekrety lokalne w `.env`
(gitignored): `VERCEL_TOKEN`, `STRIPE_TEST_SECRET_KEY` — **nazwy wolno wymieniać,
wartości nigdy**.

Commity czekają na **wyliczoną zgodę właściciela na push**. Poprzednia zgoda
obejmowała dokładnie `547b846`, `bb66141`, `69c2dab` i jest wyczerpana.

**Ta tabela dezaktualizuje się przy KAŻDYM commicie** — łącznie z commitem, który
ją poprawia. Dlatego liczba i lista są tu migawką, a źródłem prawdy jest
polecenie z rozdziału 0. Nie przepisuj tych skrótów do prośby o zgodę bez
przeliczenia; właściciel zatwierdza konkretne commity, więc lista rozbieżna
z repozytorium unieważnia zgodę, zamiast ją przyspieszyć.

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

Plik: `docs/faza-2/rejestr-warunkow-powrotu.md`. Pozycje T1–T25. Te, które
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
- **T25** — reguła bieżącej aktualizacji tego pliku **bez strażnika**. Zapisana
  w `CLAUDE.md` i rozdz. 0 na polecenie właściciela 2026-08-20; mechanizmu nie
  budowano, bo tego nie zlecono. Trzy niezmienniki do wyboru — 7.2.8.

---

## 7. CO POZOSTAJE DO ZROBIENIA

### 7.1 Zablokowane na zgodzie właściciela

1. **Push OŚMIU commitów** — `e8b3b73`, `6383580`, `7848900`, `97399c8`,
   `2599c88`, `8f15c60`, `ec8d763` + commit niosący ten dokument (rozdz. 1) — z odczytem
   zdalnym po pushu. Prośba złożona,
   **odpowiedzi jeszcze nie ma**. Uwaga do liczby: wcześniejsza zgoda właściciela
   obejmowała `547b846`, `bb66141`, `69c2dab` i jest **wyczerpana** — zgoda nie
   przechodzi na następną paczkę, każdy push wymaga osobnej, wyliczonej
   z nazwiska. Lista rośnie z każdym commitem tej sesji, więc **przed prośbą
   przelicz ją poleceniem**, nie przepisuj z tego akapitu:
   `git log --oneline origin/faza-4/podstrony..HEAD`.
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
8. **T25 — czy budować strażnika reguły „przekazanie na bieżąco".** Właściciel
   polecił 2026-08-20 **zapisać** regułę; zapisana jest w `CLAUDE.md` i w rozdz. 0.
   Bramki nie budowałem, bo tego nie zlecono. Do wyboru trzy niezmienniki różnej
   mocy (pełny opis w T25): **(1)** zadeklarowana liczba niewypchniętych commitów
   = liczba zmierzona — w pełni mechaniczne, natychmiast wykonalne;
   **(2)** osiągalność wszystkich skrótów w pliku — to jest strażnik T21
   nakierowany tutaj, więc dziedziczy `fetch-depth: 0` z T23; **(3)** „commit
   dotknął `src/`, a nie dotknął przekazania" — **słaby, sprawdza dotknięcie, nie
   prawdę**, jedna spacja go zaspokaja; jako bramka blokująca szkodliwy, bo uczy
   obchodzenia. Rekomendacja: **(1) od razu, (2) razem z T21, (3) nigdy jako
   blokada.**

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

**Dopisane przy audycie kompletności (2026-08-20)** — pułapki znane wcześniej,
przeoczone przy pierwszym spisaniu tego dokumentu:

- **`aggregationMethod: pessimistic` w `lighthouserc.cjs:200` NIE jest regułą
  bramki.** Kto przeczyta samą konfigurację, wyciągnie wniosek „bramka już jest
  pesymistyczna" — i pomyli się. Ścieżka bramki (`npm run bramka:pomiar`) podaje
  do `lhci assert` **dokładnie jeden przebieg na trasę** (`scripts/werdykt-po-lcp.mjs`),
  a przy jednym przebiegu każda agregacja daje tę samą liczbę. `pessimistic`
  działa dopiero, gdy ktoś ominie bramkę i puści `lhci autorun` na pełnym
  komplecie — wtedy da werdykt SUROWSZY, nigdy łagodniejszy. **Ma to znaczenie
  wprost dla kierunku (d)**: rozdział 8 rozważa regułę odporną na rozrzut i nie
  wolno założyć, że część tej roboty jest już zrobiona. Nie jest.
- **`actions/upload-artifact` od v4.4 pomija pliki ukryte.** `.lighthouseci/`
  zaczyna się kropką, więc bez `include-hidden-files: true` artefakt jedzie PUSTY
  i nikt tego nie zauważa. Ustawione w `bramki.yml:62` i `:438` — usunięcie tej
  linii daje cichą stratę danych, nie czerwień.
- **`overwrite: true` (`bramki.yml:68`, `:440`) jest po to, żeby `gh run rerun`
  nie wywracał się na 409 (konflikt nazwy artefaktu).**
- **`manifest.json` powstaje wyłącznie przy `lhci upload`.** Bramka go nie ma
  i mieć nie będzie — czyta bezpośrednio `lhr-*.json`. Skrypt, który zacznie
  szukać `manifest.json`, będzie się cicho pomijał.
- **`gh secret set` — wartość WYŁĄCZNIE przez stdin, nigdy `--body`.** Wartość
  podana flagą ląduje w historii powłoki i na liście procesów.
- **Sygnatura czerwieni ŚRODOWISKOWEJ vs regresji.** Środowiskowa: strażnik celu
  pomiaru pada PRZED pomiarem, w logu jest **ZERO liczb LCP**. Regresja: liczby
  są, werdykt czerwony. Rozróżnienie robi się po obecności liczb, nie po treści
  komunikatu — i tylko ono decyduje, czy w ogóle jest co analizować.

**Dopisane przy zabezpieczaniu sesji (2026-08-20)** — trzy nowe, wszystkie
z tej samej rodziny „wynik wyglądał sensownie i był fałszywy":

- **`origin/…` to lokalna migawka, nie stan zdalny.** `.git/FETCH_HEAD` miał datę
  **13 sierpnia** przy pracy 20 sierpnia, więc każde zdanie o „stanie zdalnym"
  oparte na `git rev-parse origin/…` opisywałoby stan sprzed tygodnia. Tym razem
  migawka była zgodna — **przypadkiem**. Przed pisaniem czegokolwiek o zdalnym:
  `git ls-remote --heads origin` (czyta, niczego nie zapisuje) albo `git fetch`.
  To ta sama klasa co „odwołanie do stanu, który przestał istnieć", tylko
  wycelowana w gałąź zamiast w commit.
- **`zip -r` PODĄŻA ZA DOWIĄZANIAMI** → archiwum katalogu sesyjnego wyszło
  **44 556 wpisów / 345 MB** zamiast 879 / 173 MB, bo wciągnęło `node_modules`
  przez dowiązanie. Wymagane `-y`. Defekt jest podstępny, bo archiwum z fałszywą
  liczbą wpisów wygląda na **pełniejsze**, a nie na zepsute.
- **Potok porównujący pliki wywraca się na polskich nazwach.**
  `sed: RE error: illegal byte sequence` przy domyślnej lokalizacji obciął listę
  do 604 z 879 pozycji i wyprodukował długą, nieprawdziwą listę „braków" —
  czyli **narzędzie weryfikujące samo stało się źródłem fałszywego alarmu**.
  Wymagane `LC_ALL=C`. Osobno: `unzip -Z1` rysuje bajty spoza ASCII jako `?`,
  co daje pozorne rozbieżności — rozstrzyga porównanie SHA-256, nie nazw.

---

## 10. Gdzie co leży

**Zmienione/nowe tej doby**
- `.github/workflows/bramki.yml` — blok `concurrency`, `id: pomiar`, dwa nowe
  kroki (prowieniencja po pomiarze, werdykt marginesu)
- `scripts/straznik-po-pomiarze.mjs` — **nowy**, 180 linii
- `scripts/werdykt-marginesu.mjs` — **nowy**, 220 linii
- `package.json` — `bramka:po-pomiarze`, `bramka:margines`
- `CLAUDE.md` — dwie nowe reguły kanonu ADR-018 **+ wskaźnik do tego pliku na
  samej górze** (bez niego przekazanie byłoby raportem, do którego nikt nie
  zagląda — kanon nazywa tę klasę wprost)
- `docs/faza-2/rejestr-warunkow-powrotu.md` — T22 przepisana, T23 i T24 nowe
- `docs/PRZEKAZANIE-SESJI.md` — ten plik; **jedyne kanoniczne przekazanie**.
  Drugiego nie ma i nie ma go być: dwa pliki przekazania to natychmiastowe
  pytanie „który obowiązuje", czyli nowy defekt zamiast zabezpieczenia

**Czytane, nośne, nietknięte**
- `scripts/sprawdz-preview.mjs` — strażnik startowy, tylko `/`
- `scripts/rozgrzewka-preview.mjs` — rozgrzewka, sprawdza prowieniencję na
  wszystkich 7 trasach (dlatego brakowało tylko ramienia „po")
- `scripts/podsumowanie-pomiaru.mjs` — tu mieszkało nieczytane ostrzeżenie
  o rozrzucie (linie ~246–254)
- `scripts/reprezentant.mjs` — reguła „przebieg o medianowym LCP"
- `lighthouserc.cjs` — 7 tras, `numberOfRuns: 5`, progi LCP 1800 / CLS 0,1 /
  TBT 200
- `docs/faza-2/rejestr-warunkow-powrotu.md` — rejestr T1–T25
- `docs/RAPORT-POWYKONAWCZY-WWW.md` — matryca dla następnych stron

**Rozmiary — żeby wiedzieć, czego NIE da się streścić w tym pliku**
(zmierzone 2026-08-20 na `8f15c60` + zmiany robocze)
- `docs/RAPORT-POWYKONAWCZY-WWW.md` — 1419 linii
- `docs/faza-2/rejestr-warunkow-powrotu.md` — 364 linie, pozycje T1–T25
  (skorowidz: rozdz. 15)
- `docs/adr/` — 30 ADR-ów + `README.md` (skorowidz: rozdz. 16)
- `CLAUDE.md` — 180 linii (wskaźnik do tego pliku na górze + reguła bieżącej
  aktualizacji na końcu)
- `docs/PRZEKAZANIE-SESJI.md` — ten plik; długości nie wpisuję, bo starzeje się
  przy każdej własnej zmianie — `wc -l docs/PRZEKAZANIE-SESJI.md`

**Sekrety — gdzie są, czego nie wolno wypisywać**
- `.env` (gitignored) trzyma DWA klucze; wolno wymieniać NAZWY, nigdy wartości:
  `VERCEL_TOKEN`, `STRIPE_TEST_SECRET_KEY` (Stripe wyłącznie w trybie testowym).
- `VERCEL_AUTOMATION_BYPASS_SECRET` — sekret repozytorium GitHub, po stronie
  Vercela JEDEN klucz obejścia. Sprawdzanie wyłącznie po prefiksie SHA-256.
- Mapa `protectionBypass` z API Vercela — **nigdy surowo**, prefiksy SHA-256.
- `Set-Cookie` z preview — **nigdy** (niesie `_vercel_jwt` z wartością obejścia
  otwartym tekstem). Stąd `curl -o /dev/null -w '%{http_code}'`, nigdy `-i`/`-v`.

**Poza tym repozytorium**
- `RECZ-286` (rodzina „narzędzie potwierdza poprawność artefaktu, którego nie da
  się użyć") — `/Users/sylwesterzabski/Documents/fbo os/fbo-os/docs/ZADANIA_RECZNE.md:3433`
- Backupy — `/Volumes/Extreme SSD/Catherly-www-ZIP`, kopie milowe
  w podkatalogu `KAMIENIE-MILOWE/`

---

## 11. Rzeczy ulotne — ZABEZPIECZONE ARCHIWUM

Katalog sesyjny znika razem z sesją. To była **jedyna rzecz w tym projekcie
faktycznie zagrożona** — pliki repozytorium są w gicie i w rotacyjnych
migawkach, katalog sesyjny nie był nigdzie.

Katalog:
`/private/tmp/claude-502/-Users-sylwesterzabski-Documents-FBO-OS---www/b5f46785-71a6-4c33-a50c-96d9e76258b6/scratchpad`

**Zawartość zmierzona 2026-08-20** (nie oszacowana): **844 pliki + 34 katalogi
+ 1 dowiązanie = 879 wpisów, 443 MB**. W tym **74 wykonywalne harnesy**
(`.mjs`/`.sh`), **207 plików `lhr-*.json`** z surowymi danymi Lighthouse'a
i **65 logów**. Poprzednia wersja tego rozdziału wymieniała pięć pozycji —
było ich 74. Surowych danych pomiarowych **nie da się odtworzyć**: artefakty
CI ich nie wożą, a runner mierzy za każdym razem inaczej.

### 11.1 Archiwum — gdzie leży i czym jest udowodnione

Plik: `/Volumes/Extreme SSD/Catherly-www-SESJE/scratchpad-sesja-2026-08-20-b5f46785-NIE-USUWAC.zip`

| co | wartość |
|---|---|
| rozmiar | 173 MB (źródło 443 MB — różnica to kompresja, nie brak) |
| wpisów | **879 — zgodne co do jednego ze źródłem** |
| `unzip -t` | OK, bez błędów |
| SHA-256 | `3d18119d5718317cedbb07b3e1f9cf0bb0f5630529f864df977da5dd87fba470` |

Katalog `Catherly-www-SESJE/` jest **nowy i celowo osobny**: leży poza zasięgiem
globu `catherly-www-*.zip`, którym prędzej czy później ktoś posprząta ponad 200
migawek rotacyjnych — ta sama mechanika, co przy `KAMIENIE-MILOWE/`, ale inna
semantyka (to nie jest kamień milowy repozytorium, tylko materiał dowodowy
sesji). **Czy ma tam zostać, jest decyzją właściciela** — nie przenoszę go do
`KAMIENIE-MILOWE/` z własnej inicjatywy.

**Dwie pułapki, na których to archiwum już się przewróciło** — obie warte
zapamiętania, bo obie dawały wynik wyglądający sensownie:

1. **`zip -r` PODĄŻA ZA DOWIĄZANIAMI.** Pierwsze archiwum miało **44 556 wpisów
   i 345 MB** przy 844 plikach źródłowych, bo `pw/node_modules` jest dowiązaniem
   do `node_modules` repozytorium i `zip` wciągnął je w całość. Poprawka: `-y`
   (`zip -qry`). Archiwum z fałszywą liczbą wpisów wygląda na *pełniejsze*, więc
   ten defekt nie krzyczy — trzeba go szukać.
2. **Porównanie archiwum ze źródłem wywróciło się na polskich nazwach.**
   `sed: RE error: illegal byte sequence` przy domyślnej lokalizacji obciął listę
   z archiwum do 604 z 879 pozycji i wyprodukował długą, **nieprawdziwą** listę
   „braków". To był defekt narzędzia porównującego, nie archiwum. Poprawka:
   `LC_ALL=C` + `unzip -Z1` (bez kolumn stałej szerokości). Po poprawce: 879 = 879.
   Dodatkowo `unzip -Z1` rysuje bajty spoza ASCII jako `?`, co daje **pozorne**
   cztery rozbieżności na `arkusz-*-onest-kośo.png` / `-popioł.png`; rozstrzygnięte
   przez wypakowanie tych plików i porównanie SHA-256 — **identyczne co do bajtu**.

### 11.2 Cztery harnesy dowodowe — czym są i jak je odzyskać

Nie wklejam ich źródeł do tego dokumentu świadomie, z dwóch powodów: kod
wykonywalny w pliku `docs/` nie jest wykonywalny, a punkt 7.2.7 pyta właściciela,
czy utrwalić je w repozytorium (np. `scripts/dowody/`) — wklejenie ich tutaj
przesądziłoby tę decyzję bokiem. Zamiast tego: gdzie są, co dowodzą, jak wrócić.

| harnes | linii | SHA-256 (16 zn.) | co dowodzi |
|---|---|---|---|
| `mutacja-po-pomiarze.mjs` | 83 | `c02586cb423b5390` | (b) klamra prowieniencji: udawany preview na porcie **4331** ze sterowanym `x-catherly-wydanie`; wydanie zgodne → 7/7 ✔ wyjście 0; alias przestawiony → 7/7 rozjazdów, wyjście 1; brak nagłówka → 7/7 braków, wyjście 1 |
| `mutacja-cisza-przyrzadu.mjs` | 68 | `0bef4dc6941c5b35` | (b) przypadek czwarty, port **4332**: serwer żywy → 0; **ten sam serwer zgaszony w trakcie** → 7/7 „adres nieosiągalny (fetch failed)", wyjście 1. Milczenie celu jest czerwienią, nie ciszą |
| `mutacja-marginesu.mjs` | 92 | `093a1758501de866` | (c) werdykt marginesu: mutuje LCP **niereprezentatywnego** `lhr` dla `/funkcje` (→ 1500 ms), więc werdykt i zapas stoją, a zmienia się wyłącznie rozrzut; przywraca plik i porównuje SHA-256 |
| `proba-klonu.sh` | 46 | `8b4c74a2ca4dd6b2` | T23, dowód trzech klonów na `cd06530`: pełny → osiągalny/zieleń; `--depth 1` → „not a valid object"/czerwień; po `fetch --unshallow` → zieleń. Plus przypadek D: widmo `72f664a` nie istnieje w ŻADNYM klonie |

Odzysk pojedynczego harnesu z archiwum (nie trzeba rozpakowywać 173 MB):

```bash
Z="/Volumes/Extreme SSD/Catherly-www-SESJE/scratchpad-sesja-2026-08-20-b5f46785-NIE-USUWAC.zip"
unzip -j "$Z" 'scratchpad/mutacja-*.mjs' 'scratchpad/proba-klonu.sh' -d ./dowody
```

**Wyniki wszystkich tych dowodów są spisane w rejestrze** (T22, T23), więc nawet
bez archiwum nie ginie ustalenie — ginie możliwość powtórzenia go jednym
poleceniem. Archiwum przywraca właśnie tę możliwość.

`.lighthouseci/` w repo (gitignored) trzyma lokalne dane pomiarowe; zmutowany
plik został przywrócony, SHA-256 sprawdzona i identyczna.

---

## 12. Historia sprzed tej doby — żyła wyłącznie w pamięci projektu

Rozdziały 1–11 opisują dobę 2026-08-19/20. Poniższe ustalenia są STARSZE
i nie miały żadnego zapisu w tym dokumencie; ich jedynym nośnikiem był plik
pamięci `catherly-www-projekt.md`, którego nowa sesja może nie dostać.

- **Fazy 0–3 domknięte; trwa faza 4 (podstrony)**, gałąź `faza-4/podstrony`.
- **ADR-030 (2026-08-16, PRZYJĘTY): `main` dostaje własne wdrożenie produkcyjne
  dopiero przy Fazie 7.** Do tego czasu na `main` nie ma produkcji, a czerwień
  środowiskowa na `main` bywa akceptowana — nie miesza się to z ADR-020
  („main zawsze zielony" dotyczy bramek merge'a).
- **Reguła werdyktu zmieniła się z `median-run` na przebieg o medianowym LCP —
  commit `26c38f2`.** Powód w liczbach: przebieg `31955831699`, `/dla-kogo`
  LCP `1504 · 1374 · 1934 · 1486 · 1488`; mediana 1488 ms (zapas +312), a
  `median-run` wybrał 1934 ms i zapalił czerwień −134 ms. `median-run` wybiera
  reprezentanta po odległości od median FCP i TTI — LCP nie bierze w tym
  wyborze udziału. Bramka fałszywie alarmująca uczy ignorowania czerwieni.
- **O2 (właściciel, 2026-08-16): 3 → 5 przebiegów.** Powód: przebieg
  `31953862971`, rozrzut LCP w obrębie jednej trasy 1057 ms
  (`/funkcje/zespol`: 2029 · 1892 · 972) przy zapasach rzędu 200–300 ms. Pięć
  przebiegów nie zmniejsza rozrzutu — zmniejsza wpływ jednego wyskoku na wybór
  reprezentanta. Koszt: ~286 s → ~480 s. **O3 wdrożone. Z6 zamknięte 4/4.**
- **Czego 5 przebiegów NIE naprawia: obciążenia współdzielonego runnera.** Przy
  `throttlingMethod: "simulate"` praca CPU jest mnożona przez
  `cpuSlowdownMultiplier`, więc sąsiad na tej samej maszynie wchodzi do wyniku
  zwielokrotniony. Pilnuje tego `benchmarkIndex` w podsumowaniu — i to on dał
  rozstrzygnięcie w analizie kierunku (d) z rozdziału 8.
- **Próg 1800 ms nie zmienia się w żadnym trybie.**
- **`docs/RAPORT-POWYKONAWCZY-WWW.md` jest matrycą dla następnych stron** —
  nie jest sprawozdaniem do archiwum, tylko wzorcem do powielenia.
- **Kopie milowe** trafiają do `KAMIENIE-MILOWE/` z `NIE-USUWAC` w nazwie;
  powód jest mechaniczny (glob `catherly-www-*.zip` przy sprzątaniu ponad 200
  migawek rotacyjnych), więc katalog chroni przed globem, a nazwa przed
  człowiekiem — potrzebne są obie warstwy.

**Sprostowanie do pamięci projektu (sprawdzone dziś).** Pamięć niosła zapis, że
commit `34710c7` (T6) jest NIEWYPCHNIĘTY, bo zlecenie brzmiało „commit bez
pusha". Dziś to nieprawda: `git merge-base --is-ancestor 34710c7 HEAD` → TAK,
`… origin/faza-4/podstrony` → TAK. Późniejsze pushe go zabrały. To ta sama
rodzina co klasa „odwołanie do stanu, który przestał istnieć", tylko odwrócona:
nie martwy skrót, lecz **żywy skrót opisany martwym stanem**.

---

## 13. Czego ten dokument świadomie NIE powtarza

Żeby nowa sesja nie wzięła braku streszczenia za brak tematu.

- **Rejestr w pełnym brzmieniu.** Rozdział 6 opisuje szczegółowo pozycje z tej
  linii pracy (T2, T10, T20–T24); rozdział 15 daje **skorowidz wszystkich** —
  24 pozycji treści i T1–T25 — po jednej linii. To jest wskaźnik, nie zamiennik:
  sam wpis T22 ma w rejestrze kilkanaście tysięcy znaków dowodów i liczb.
  Przed dotknięciem czegokolwiek spoza tej linii: przeczytaj rejestr.
- **Treść ADR-ów.** Rozdział 16 podaje trzydzieści **tytułów**, żeby dało się
  trafić do właściwego pliku. Wiążąca jest treść w `docs/adr/`.
- **`docs/RAPORT-POWYKONAWCZY-WWW.md`** — 1419 linii, nie do streszczenia.
- **Pełny kanon `CLAUDE.md`** — rozdział 3 podaje siedem reguł ADR-018
  roboczo; wiążący jest plik.

---

## 14. Blokady spoza repozytorium

- **Serwer MCP `higgsfield` wymaga autoryzacji OAuth.** Dopóki właściciel jej
  nie przeprowadzi (ustawienia konektorów claude.ai), narzędzia generowania
  obrazu/wideo i pokrewne są NIEDOSTĘPNE. W sesji nieinteraktywnej nie da się
  tego zrobić. Dotyczy to bloku projektowego z rozdziału 7.4 — jeśli brief
  wtorkowy zakłada generowanie materiału, autoryzacja jest warunkiem wstępnym,
  a nie szczegółem technicznym.

---

## 15. Skorowidz rejestru warunków powrotu — WSZYSTKIE pozycje

Plik wiążący: `docs/faza-2/rejestr-warunkow-powrotu.md` (364 linie, stan 2026-08-20). Poniżej
**skorowidz, nie streszczenie**: jedna linia na pozycję, żeby żadna nie była
niewidoczna dla nowej sesji. Kto ma dotknąć którejkolwiek — czyta rejestr.

### 15.1 Treści zdjęte z powodu braku pokrycia (poz. 1–24)

Zasada wspólna: treść wraca WYŁĄCZNIE po dowodzie wykonaniem.

| # | rzecz | wraca po |
|---|---|---|
| 1 | „Rozliczenia" w H1 i podtytule hero | działające rozliczenia end-to-end (Stripe aktywny) |
| 2 | pytanie o fakturę VAT w FAQ cennika | testowy zakup z OTRZYMANĄ fakturą + konfiguracja dashboardu Stripe |
| 3 | trial 14 dni | Stripe end-to-end + decyzja właściciela o komunikacji trialu |
| 4 | „20 GB przestrzeni" (karta Pro) + wiersz tabeli | klucz Storage aktywny + wykonany test uploadu |
| 5 | „Wywołania AI 100/500/∞" | aktywny klucz Anthropic |
| 6 | „Platformy social 2/5/∞" | zgody platform + działające łączenie kont |
| 7 | RODO/GDPR/DSGVO jako potwierdzenie | weryfikacja procesów; wraca na `/bezpieczenstwo` |
| 8 | TLS / szyfrowanie at-rest platformy | odczyt dashboardu Supabase (w repo brak śladu) |
| 9 | szyfrowanie pól (AES-256-GCM) — FAKT z kodu | budowa `/bezpieczenstwo` z precyzyjnym zakresem |
| 10 | import wyciągu FL | Storage aktywny + ekrany niepuste |
| 11 | fraza Pulsu poza kartą Growth | zawsze pełna forma „W planie Growth…" |
| 12 | pozostałe bramki GROWTH z Z1 | każde wejście = nowa obietnica → tabela obietnic + decyzja |
| 13 | `robots: noindex,nofollow` | **wyłączyć przy publikacji (Faza 7)** — pozycja checklisty premiery |
| 14 | „bez podawania powodu" (rezygnacja) | weryfikacja przepływu anulowania w aplikacji |
| 15 | granice e-mail modułów pozyskiwania | aktywacja Resend → rewizja trzech granic |
| 16 | granica jednokierunkowości subskrypcji kalendarza | integracja dwustronna (dziś SZKIELET) |
| 17 | cel linku kodu QR polecającego | weryfikacja przy Z9+ |
| 18 | 7 nazw modułów bez pozycji słownika | potwierdzenie zgodności z i18n aplikacji |
| 19 | granica importu („importu hurtowego nie ma") | pojawienie się importu w aplikacji |
| 20 | rejestr „cyfrowy odcisk SHA-256" | obowiązujące; rewizja przy zmianie decyzji głównej |
| 21 | granica „nie wygeneruje szablonu" | aktywacja klucza Anthropic |
| 22 | granica „zasięgów nie pokaże" | statystyki publikacji po zgodach platform |
| 23 | widok liderki w Pierwszych 90 Dniach | odczyt `first90` przy najbliższym Z |
| 24 | „Przesuwasz post" + nazwy poza słownikiem | weryfikacja przy Z9 |

Poz. **17, 18, 19, 23, 24** składają się na „najbliższe zlecenie Z" = **Z7**.

### 15.2 Pozycje techniczne i procesowe (T1–T25)

**Legenda:** ✅ zamknięte · 🔒 zamrożone świadomie · ⏸ czeka na blok
(design / przegląd bramek) · ⚠ otwarte, dotyczy bieżącej linii pracy.

| # | rzecz | stan |
|---|---|---|
| T1 | `next-intl` serializuje KOMPLET komunikatów do ładunku KAŻDEJ strony (+276 B za trzy klucze; wpływ na LCP w granicach szumu) | ⏸ blok designu |
| T2 | audyt nieodwracalnych — bramka **PLANOWO czerwona**, nie defekt | ⏸ Faza 6 |
| T3 | pomiar wydajności na preview Vercel + reguła werdyktu | ✅ 2026-08-16 (rozrzut wyszedł osobno → T10) |
| T4 | „H1 ≤ 3 linie" — desktop naprawiony (ADR-029), **poniżej 768 px nadal nieprawdziwe** (DE 4–5 linii) i niepilnowane | ⚠ część mobilna otwarta |
| T5 | pięć adresów Fazy 4 poza zakresem startu wg ADR-014 | ✅ 2026-08-15 — WCHODZĄ do zakresu |
| T6 | `bramka:liczby` nie widziała warstwy `messages` | ✅ 2026-08-16 (inwentarz 16 kluczy, nie 14) |
| T7 | **zdania z datą ważności** („Logowanie będzie dostępne przy premierze", `(wkrótce)` ×4 dokumenty) — brak rejestru i mechanizmu; w dniu premiery stają się fałszem i **nic tego nie zapali** | ⏸ checklista premiery, świadomie BEZ bramki |
| T8 | `/pomoc` wycofana z zakresu startu; strona nie istnieje | ⏸ po premierze, warunek potrójny |
| T9 | wskaźnik zagnieżdżenia w mapie stopki — wariant z kreską (1,34:1 przy progu 3:1) | ⏸ blok designu |
| T10 | **rozrzut pomiaru szerszy niż zapas na 7 z 7 tras** — bezpośredni przodek T22(c) | 🔒 zamrożone 2026-08-16 |
| T11 | `reuseExistingServer: !process.env.CI` — pakiet lokalny podpina się do CZYJEGOKOLWIEK procesu na porcie 3000, także zepsutego | ⏸ przegląd bramek |
| T12 | `max-width: 24ch` na H1 — `ch` zależy od kroju (755 px vs 661 px); dziś 2 linie na iOS, 3 na Androidzie, przesuw CTA o 55,19 px | ⏸ blok designu |
| T13 | brak tokenów CTA i **żadnego tokenu typografii**; recepta CTA powtórzona ręcznie w 3 modułach | ⏸ blok designu |
| T14 | `✓` (U+2713) 15× na `/cennik` — Schibsted i Geist **nie mają tego glifu**; spada na fallback | ⏸ blok designu → inline SVG |
| T15 | wyjątek lintera tokenów dla bloku palety — **wygasa 2026-08-31**; dowody mutacyjne `a826464`, mutacja „data cofnięta" → **77** naruszeń (nie 45 — liczba urosła sama, bo blok urósł) | ⚠ data jest strażnikiem |
| T16 | bramka kontrastu w stanach interaktywnych z trzema świadomymi granicami (W-GRANICA-01, próg wyłączonych = 3 ponad normę, widżety poza zasięgiem sondy) | otwarte **jako opis granic, nie dług** |
| T17 | lista 30 tras w `e2e/axe.spec.ts` **przepisana z ręki** — nowa podstrona zostanie pominięta w ciszy i na zielono | ⏸ przegląd bramek |
| T18 | arkusz `public/proba-kroju.html` — tymczasowy, **wygasa 2026-08-31**; linter tokenów skanuje `public/`, żeby zamknąć drogę ucieczki | ⏸ razem z T15 |
| T19 | warianty AVIF/WebP **nie mają dowodu, że powstały z bieżących źródeł**; podmiana źródła przechodzi dziś przez wszystkie bramki | propozycja manifestu SHA-256, bez implementacji |
| T20 | zakres wyjątku lintera **szerszy niż jego dokumentacja** (osłona jest LINIOWA, nie „wyłącznie barwy") | ⚠ znika sam 2026-08-31 |
| T21 | nic nie pilnuje, że skróty commitów w dokumentacji są osiągalne; 6 wiążących ustaleń konstrukcyjnych | ⚠ **czeka na decyzję** (7.2.4) |
| T22 | bramka wydajności mierzyła CUDZE wdrożenie + brak `concurrency` | (a)(b)(c) wdrożone, (d) i (b') otwarte — **warunek zamknięcia niespełniony** |
| T23 | `fetch-depth` — 15 × `checkout` bez niego, klon ma 1 commit | ⚠ **czeka na decyzję** (7.2.5) |
| T24 | brak `timeout-minutes` — 4 zadania anulowane po 6 h 00 min | ⚠ **czeka na decyzję** (7.2.6) |
| T25 | reguła „przekazanie aktualizowane na bieżąco" **nie ma strażnika**; wariant naiwny sprawdzałby DOTKNIĘCIE pliku, nie prawdę | ⚠ zapisana, **strażnik czeka na decyzję** (7.2.8) |

---

## 16. Skorowidz ADR — trzydzieści decyzji

Katalog `docs/adr/` (30 plików + `README.md`). **Wiążąca jest treść pliku** —
poniżej wyłącznie tytuły, żeby dało się trafić do właściwego bez zgadywania.

| # | decyzja | # | decyzja |
|---|---|---|---|
| 001 | izolacja marki | 016 | zamknięty zestaw platform |
| 002 | progi wydajności i dostępności | 017 | brak panelu administracyjnego |
| 003 | zakaz ciemnych wzorców | 018 | **prymat nieodwracalnego** (kanon) |
| 004 | jeden design system | 019 | toolchain języka poza ADR-016 |
| 005 | auth wyłącznie w aplikacji | 020 | **main zawsze zielony** |
| 006 | płatność przed kontem | 021 | własny serwer MCP higgsfield |
| 007 | treść w repo bez CMS | 022 | kontrakt minimalny — szew logowania |
| 008 | trzy języki od dnia pierwszego | 023 | ścieżka zakupu przez login |
| 009 | jeden motyw | 024 | fazowanie hybrydowe per komponent |
| 010 | analityka przez warstwę produktu | 025 | tokeny: powierzchnia, akcent, kreska, miara |
| 011 | obrazy generowane tylko dekoracyjne | 026 | typografia tymczasowa `system-ui` |
| 012 | waluty i prawo konsumenckie | 027 | krój pisma `system-ui` na premierę |
| 013 | ciepła jakość | 028 | tokeny wymiarów, promieni, kontenera, progu |
| 014 | **zakres zamrożony iteracji 1** (+ 3 doprecyzowania) | 029 | próg i proporcje hero |
| 015 | paleta barw przez tokeny | 030 | **wdrożenie produkcyjne `main` dopiero przy Fazie 7** |

Trzy najczęściej mylone: **ADR-020** mówi o bramkach merge'a, **ADR-030** o tym,
że `main` nie ma dziś produkcji — nie są ze sobą sprzeczne. **ADR-018** jest
nadrzędny wobec wszystkiego innego.

---

## 17. Mapa CI, tras i poleceń

### 17.1 Piętnaście zadań w `.github/workflows/bramki.yml`

`build` · `bramka-kontrakt-tokenow` · `bramka-tokeny-linter` · `bramka-lint` ·
`bramka-parytet` · `bramka-prawdziwosc` · `bramka-cennik` · `bramka-linki` ·
`bramka-kotwice` · `bramka-nojs` · `bramka-dostepnosc` · `bramka-e2e` ·
`bramka-pelny-zestaw` · `bramka-wydajnosc` · `bramka-nieodwracalne`

Sześć z nich potrzebuje `build`. **`bramka-nieodwracalne` jest planowo czerwona
(T2) — to nie jest awaria.** Wyzwalacze: `pull_request`, `push` na `main`
i `faza-*/**`, `workflow_dispatch`.

Blok `concurrency` (wdrożony tej doby, kierunek T22(a)):
```yaml
group: "bramki-${{ github.event.pull_request.head.ref || github.ref_name }}"
cancel-in-progress: true
```
Klucz **nie** z `github.ref` — przy `pull_request` to `refs/pull/N/merge`, więc
klucz z `github.ref` rozdzieliłby dwa przebiegi tej samej gałęzi i defekt wróciłby
w ciszy dokładnie w PR, czyli w chwili merge'u.

**Dwie własności środowiska, których nie widać w pliku:** żaden z 15 kroków
`actions/checkout@v4` nie ustawia `fetch-depth` (→ klon ma 1 commit, T23), żadne
zadanie nie ma `timeout-minutes` (→ obowiązuje domyślne 6 h, T24).

### 17.2 Siedem tras pod pomiarem (`lighthouserc.cjs`)

`/` · `/funkcje` · `/dla-kogo` · `/funkcje/pozyskiwanie` · `/funkcje/tresci` ·
`/funkcje/zespol` · `/funkcje/wyniki`

`numberOfRuns: 5` (linia 189). Progi: **LCP 1800 ms · CLS 0,1 · TBT 200 ms ·
a11y 1**. Werdykt zapada na **przebiegu o medianowym LCP** (`26c38f2`), a nie na
`median-run` Lighthouse'a — patrz rozdz. 12.

### 17.3 Polecenia, które są w `package.json`

**Pomiar wydajności** — kolejność ma znaczenie:
`bramka:preview` (strażnik startowy, tylko `/`) → `bramka:rozgrzewka`
(prowieniencja na **wszystkich 7** trasach) → `bramka:pomiar`
(`lhci collect` + `werdykt-po-lcp.mjs`) → `bramka:po-pomiarze` (klamra
prowieniencji, `if: always()`) → `bramka:margines` (żółty: margines pozorny) →
`bramka:podsumowanie`. Osobno: `bramka:werdykt`, `bramka:tryb-pomiaru`.

**Bramki treści i kodu:** `bramka:tokeny` · `bramka:liczby` · `bramka:parytet` ·
`bramka:kontrakt` · `bramka:linki` · `bramka:kotwice` · `bramka:nojs` ·
`bramka:cennik` · `bramka:nieodwracalne` · `lint`.

**Testy:** `test:e2e` · `test:axe` · `bramka:kontrast-stanow`.

**Budowanie:** `build` (poprzedzone `prebuild` → `tokeny:build`, Style
Dictionary). `prepare` ustawia `core.hooksPath .githooks` — dlatego hooki działają
po `npm ci` i dlatego `--no-verify` jest zakazane. `obrazy:pipeline` jest
**narzędziem ręcznym, nie bramką** (T19).

---

## 18. Uczciwa granica tego dokumentu

Rozdziały 12–14 dopisano po pytaniu właściciela „czy to są kompletnie wszystkie
informacje?". Odpowiedź brzmiała: nie — i te rozdziały są tym, co audyt wykrył.
Rozdziały 0, 15–17 i przepisany 11 dopisano po poleceniu „zabezpieczyć system
w razie zakończenia sesji". Obowiązek utrzymywania tego pliku w prawdzie
**na bieżąco** (rozdz. 0, `CLAUDE.md`, T25) dopisano po poleceniu z tego samego
dnia: *„chcę aby plik był aktualizowany na bieżąco po każdej zmianie"*.
Od tej chwili dokument nie jest sprawozdaniem z sesji — jest **stanem
utrzymywanym**, a commit, który go rozjeżdża z rzeczywistością, jest
niekompletny.

Dokument jest kompletny dla **linii pracy T21–T25 i doby 2026-08-19/20**.
Poza nią jest **wskaźnikiem, nie streszczeniem** (rozdział 13). Kto go czyta
i wychodzi poza tę linię, czyta rejestr i ADR-y, a nie ten plik.

**Czego ten dokument NIE gwarantuje, choć mógłby na to wyglądać:**

1. **Liczby są migawkami.** Każda niesie datę i commit, bo taka jest reguła
   kanonu — ale reguła chroni przed *udawaniem faktu*, nie przed
   zdezaktualizowaniem się. Wzorzec do zapamiętania: T15 zmierzone
   2026-08-17 dawało **45**, a dwa dni później **77**, bez jednej zmiany
   w linterze. Zanim oprzesz decyzję na liczbie stąd — zmierz ją ponownie.
2. **Stan zdalny odczytano `git ls-remote` 2026-08-20.** `.git/FETCH_HEAD` miał
   wtedy datę 13 sierpnia, więc lokalne refy `origin/*` były migawką sprzed
   siedmiu dni (zgodną, ale przypadkiem). **Nie ufaj `origin/…` bez `fetch`
   albo `ls-remote`** — to dokładnie klasa „odwołanie do stanu, który przestał
   istnieć", tylko wycelowana w gałąź zamiast w commit.
3. **Zieleń bramek nie jest tu udowodniona dla stanu wypchniętego.** Dla
   `69c2dab` bramka `Dostępność` **nie ma werdyktu** (anulowana po 6 h, T24);
   zieleń dostępności stoi wyłącznie na `b51d0b8`. Sześć commitów czekających na
   push **nie było w CI ani razu**.
4. **Kierunki (b) i (c) mają dowody wyłącznie lokalne** — z udawanego preview
   i z danych z dysku, nigdy z runnera. Do czasu przebiegu CI ich poprawność
   ma status „niesprawdzona na docelowym środowisku", a niesprawdzone liczy się
   jak niedziałające.
