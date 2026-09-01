# Rejestr odbioru przekazań do bloku designu (www)

Własność okna WWW. Prowadzony od `WWW/064` (2026-09-01).

Format każdej pozycji: **źródło · sha HEAD gałęzi w chwili odczytu · data odczytu · werdykt**.
Werdykty: PRZYJĘTE (odebrane, czeka na wykonanie) · SPRAWDZONE (odczytane, stan zweryfikowany) ·
OBALONE (treść niezgodna ze stanem po stronie www).

**Kto i co weryfikował:** każda pozycja pochodzi z odczytu `git show <gałąź>:<plik>` w repo aplikacji
(`/Users/sylwesterzabski/Documents/fbo os/fbo-os`) lub z testu clone (tor 13).
Żadna nie pochodzi z pamięci ani z cudzego streszczenia.

---

## 1. Tor 5 — cele dotyku i podział słownika

**Źródło:** `fbo-os`, gałąź `claude/pwa-rewizja-catherly-w91p1u`,
`docs/pwa/21-GOTOWOSC-MOBILNA.md §5.1`

**SHA HEAD w chwili odczytu:** `8144d6ce8796a94e3075bb77c6ee40a8f741abe3` · 2026-08-19

**Data odczytu:** 2026-09-01

**Werdykt: PRZYJĘTE** — trzy pozycje przekazane do bloku designu z kryterium odbioru ⚑9;
DO WYKONANIA przy przebudowie na wzorzec z Framera (nie teraz).

### Treść pozycji

| id | treść | kryterium / podstawa | dowód w app |
| --- | --- | --- | --- |
| **D-1** | **≥ 44 px jako domyślny cel dotykowy** (z P2) | Decyzja właściciela ⚑9: *„44 px domyślnie, kierunek telefon-first"* — skutek dla **całego interfejsu**, nie tylko PWA | `ui/Button.tsx:21-24`: `sm` = 28 px, `md` = 36 px, tylko `lg` = 44 px; **160 z 188** jawnych rozmiarów to `sm`; 85 elementów ikonowych h-6…h-10 |
| **D-2** | **Akcje ukryte pod hoverem — widoczne na dotyku** (z B2) | Klasa „najważniejsza akcja mobilna niewidoczna na dotyku" (decyzja 2026-08-19); do bloku razem z D-1 | **15 wystąpień w 13 plikach** (`CandidateRow`, `TopCandidates`, …); zero `focus-within`, `pointer: coarse`, `hover:hover` w całym `src/` |
| **D-3** | **Podział słownika na przestrzenie nazw** (z P8) | Pozycja wydajnościowa pierwszej wagi wspólna z blokiem designu; warunek: pomiar buildem przed i po | 415 719 B / **130 662 B gzip**, 7 854 klucze, 98 grup; cały katalog trafia do przeglądarki na każdym wejściu |

**Co tor 5 zrobił sam, poza blokiem designu:** dwa miejsca z D-2 (B2) przekazane z poleceniem
„popraw punktowo"; pozostałe 11 plików i cały system projektowy — blok designu.

---

## 2. Tor 11 — brzmienie do CLAUDE.md

**Źródło:** `fbo-os`, gałąź `claude/mapa-propagacji-wzorcow-qnzub5`,
`docs/propagacja/70-DO-KANONU-BRZMIENIA.md`

**SHA HEAD w chwili odczytu:** `a456cb5072bdb5114a8230885a0af7cb7016a994` · 2026-09-01

**Data odczytu:** 2026-09-01

**Werdykt: SPRAWDZONE** — wpis do `catherly-www/CLAUDE.md` czeka na decyzję właściciela
nad treścią; nie wpisano nic.

### Stan dokumentu

Dokument zawiera dwie sekcje dotyczące repo strony:

**Wersja B — do wpisania do `catherly-www/CLAUDE.md` nad „Kim jesteś w tej sesji":**

> ## KANON JEST WZMACNIACZEM, NIE SIŁĄ SPRAWCZĄ
>
> **Ten plik nie działa sam.** Zadziała wyłącznie tam, gdzie ktoś podejmie pracę i po drodze
> tu zajrzy. **Kanon bez wykonawcy jest inwentarzem, nie ochroną.** To nie osłabia poniższych
> reguł — mówi, czym są.
>
> **Zmierzone w repozytorium aplikacji (tor 11, 2026-08-21):** kanon polecił do powielenia
> wzorzec, który okazał się tautologiczny — i rozszedł się on trzykrotnie; w tym samym pliku
> polecił wzorzec zdrowy — i ten nie rozszedł się ani razu, przy kształcie przeciwnym w 26
> plikach. **Powaga zapisu nie rozstrzyga. Rozstrzyga, czy ktoś podjął pracę.**
>
> **Test praktyczny dla każdej reguły:** reguła bez wskazania, KTO i KIEDY ją zastosuje, jest
> zapisem, nie mechanizmem. Pytanie brzmi **„co się dzieje, jeśli nikt jej nie przeczyta"**.
> Odpowiedź „nic" znaczy, że reguła potrzebuje nośnika — bramki CI, haka, ADR-a z właścicielem.

**Zastrzeżenie tor 11 (cytat z dokumentu):**

> *„Rozstrzygnięcie właściciela, 2026-08-21: przyślij mi je, wpiszę sam. Kanon nie przyjmuje
> wpisów bez decyzji."* […] *„Jeśli intencją było wpisanie przeze mnie, powiedz i wpiszę
> w pięć minut."*

**Co zrobiono w tym zleceniu:** ODCZYT. Wpisu do `CLAUDE.md` strony NIE dokonano.
Czeka na decyzję właściciela nad treścią.

---

## 3. Tor 14 — pozycje adresowane do strony

**Źródło:** `fbo-os`, gałąź `claude/public-surfaces-audit-ui4wkh`,
`docs/powierzchnie/05-PRZEKAZANIA.md`

**SHA HEAD w chwili odczytu:** `47f7444a7ae4ca09474c08f494aff36c1bda7513` · 2026-08-23

**Data odczytu:** 2026-09-01

**Werdykt: SPRAWDZONE** — zero pozycji jawnie adresowanych do `catherly-www` w tym dokumencie.

### Wynik przeszukania

Dokument zawiera przekazania do TOR 8 (audyt kontrowersji) i TOR 13 (audyt strażników) —
oba tory w repo aplikacji. Przeszukanie pod kątem słów kluczowych `strona`, `catherly-www`,
`www`, `blok design`, `landing` zwróciło dwa trafienia:

1. `viral/strona-osobista-po-slugu.unit.test.ts` — nazwa pliku testowego w app, nie odniesienie
   do catherly-www.
2. Wzmianka o K-7 (kanon toru, nie przekazanie do www).

**Pozycje B36 i B43 adresowane do `www`** odczytano w rejestrze przepływu toru 13
(`docs/straznicy/REJESTR-PRZEPLYWU.md`) — patrz pozycja 4 poniżej.

---

## 4. Tor 13 — hook pre-commit; B61

**Źródła:**
- `fbo-os`, gałąź `claude/guardians-audit-3kiunn`
- `docs/straznicy/PRZEKAZANIE-TOR-13.md` §5 pkt 5
- `docs/straznicy/REJESTR-PRZEPLYWU.md` (B36, B43, B61)

**SHA HEAD w chwili odczytu:** `9bde8fa7c17f8b11d6dea5235502c0e83610167c` · 2026-09-01

**Data odczytu:** 2026-09-01

**Werdykt: SPRAWDZONE** — test clone wykonany; wynik poniżej; pozycja T54 dopisana
do rejestru warunków powrotu.

### Pozycje z REJESTR-PRZEPLYWU.md adresowane do `www`

| id | treść (skrót) | status w rej. toru 13 |
| --- | --- | --- |
| **B36** | Hak `pre-commit` da się obejść w 3 komendach bez `--no-verify`; lista `ISTOTNE` pomija `vercel.json` i sam plik haka; `--diff-filter=ACMR` pomija usunięcia | NIEDORĘCZONE — *adresat nie prowadzi rejestru przepływu na żadnej gałęzi* (stan 2026-09-01) |
| **B43** | Hak `pre-commit` nie działa w świeżym klonie po `pnpm install --ignore-scripts` — `.git/hooks/pre-commit` nie powstaje | NIEDORĘCZONE — j.w. |
| **B61** | B43 zmaterializowane na materiale toru 13: `format:check` czerwony na 4 plikach autorstwa toru, bo w jego klonie hook nie był aktywny (używał `--ignore-scripts`) | `www, aplikacja` — bez statusu doręczenia (wystawione 2026-09-01, tego samego dnia) |

### Test clone — catherly-www (2026-09-01)

**Polecenie:** `git clone --depth=1 -b faza-4/podstrony https://github.com/sylwesterzabski-pixel/catherly-www.git <tmpdir>`

**Pytanie zerowe — mechanizm:**

| element | wynik przed clone+install | skąd pochodzi |
| --- | --- | --- |
| `.git/hooks/pre-commit` | **BRAK** — tylko pliki `.sample` | `ls <tmpdir>/.git/hooks/` |
| `core.hooksPath` | **BRAK** — nie ustawione | `git -C <tmpdir> config core.hooksPath` |
| `.githooks/pre-commit` w working tree | **ISTNIEJE** — plik śledzony w gicie | `git -C <tmpdir> ls-files .githooks/` |

**Mechanizm catherly-www a B43/B61 w app:**

Repo aplikacji używało `husky`, który tworzy `.git/hooks/pre-commit` przy `npm install`.
Repo strony używa innego mechanizmu:

```json
"prepare": "git config core.hooksPath .githooks"
```

Po `pnpm install` (bez `--ignore-scripts`) skrypt `prepare` ustawia `core.hooksPath = .githooks`
w `.git/config` klonu → git zaczyna używać `.githooks/pre-commit` (który jest w drzewie).
**`.git/hooks/pre-commit` nie powstaje nigdy** — nie taki mechanizm.

**Różnica istotna:** po regularnym `pnpm install` hook JEST aktywny (`core.hooksPath` ustawione).
`.git/hooks/pre-commit` BRAK jest tu stanem strukturalnym, a nie defektem.

**Luka analogiczna do B43:** `pnpm install --ignore-scripts` → `prepare` nie biegnie →
`core.hooksPath` nie jest ustawione → `.githooks/pre-commit` jest w working tree, ale git go
nie woła → linter tokenów i liczb nie jest uruchamiany przed commitem.

**Pozycja T54 dopisana do rejestru warunków powrotu.**
Ocena: luka nie zmaterializowała się dotychczas (regularne `pnpm install` ustawia `prepare`),
ale wzorzec B61 pokazuje, że wystarczy jeden `--ignore-scripts` w sesji agenta.

---

## 5. Przeszukanie pozostałych gałęzi

Gałęzie zdalne `fbo-os` sprawdzone pod kątem przekazań do www:

| gałąź | wynik |
| --- | --- |
| `origin/claude/atlas-knowledge-layer-audit-f5f69e` | brak plików z przekazaniami do www |
| `origin/claude/catherly-redakcja-strony-93uyhn` | kopia awaryjna toru 9 (bundle + README) — brak przekazań do bloku designu |
| `origin/claude/module-fitness-classification-4sp3so` | brak plików z przekazaniami do www |
| `origin/claude/tor2-thriving-lifestyle-review-zu68fk` | brak plików z przekazaniami do www |
| `origin/claude/verify-promises-table-3s4ksg` | brak plików z przekazaniami do www |
| `origin/feat/cs-build`, `feat/kontrowersje`, `feat/przewodnik`, `feat/runbook` | gałęzie robocze app — brak przekazań do www |
| `empowerset/*` | kopie robocze empowerset — nie przeszukiwano (poza zakresem) |

Gałęzie wskazane w zleceniu (tory 5, 11, 14, 13) wyczerpują materiał adresowany do bloku designu.

---

## 6. Co czeka na decyzję właściciela

| pozycja | opis | gdzie |
| --- | --- | --- |
| Tor 11 wersja B | Brzmienie „KANON JEST WZMACNIACZEM" do `CLAUDE.md` — gotowe, niewpisane | Ta pozycja pkt 2 |
| T54 | Luka `pnpm install --ignore-scripts` → hook nieaktywny → linter nie biegnie | Rejestr warunków powrotu |
| D-1, D-2, D-3 | Cele dotykowe, hover na dotyku, podział słownika — wykonanie przy przebudowie | Ta pozycja pkt 1 |
| B36 | Obejście pre-commit w 3 komendach — wymaga analizy haka strony | NIEDORĘCZONE z toru 13 |
