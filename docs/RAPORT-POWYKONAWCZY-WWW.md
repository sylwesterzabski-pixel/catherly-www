# Raport powykonawczy — budowa catherly-www

**Zakres:** od `0896219` (2026-08-08 22:01) do `3ca12a3` (2026-08-16 19:04).
**Stan na dzień sporządzenia:** gałąź `faza-4/podstrony`, 139 commitów,
Faza 4 w toku (Etap E zamknięty decyzją o wycofaniu `/pomoc`; bramka
wydajności przeniesiona na preview, rejestr T3/T10 zaktualizowany).
**Przeznaczenie:** matryca do budowy następnych stron — nie kronika.

---

## 0. Jak czytać ten dokument (i czego w nim NIE ma)

### 0.1 Zasada źródła

Każde twierdzenie w tym raporcie pochodzi z pliku w repozytorium albo
z wykonania polecenia w repozytorium — nie z pamięci sesji. Gdzie liczba
jest podana, podana jest też metoda jej uzyskania. Gdzie liczba
z polecenia właściciela rozeszła się z pomiarem, raport podaje pomiar
i nazywa rozbieżność (§0.2). To nie jest kurtuazja wobec ADR-018 — to
jedyny sposób, żeby dokument nadawał się na matrycę: matryca z jedną
zmyśloną liczbą uczy zmyślania.

### 0.2 Sprostowania liczb ze zlecenia

Zlecenie raportu podało cztery liczby, których repozytorium nie
potwierdza. Podaję zmierzone, bo dokument-matryca z liczbą „mniej
więcej" jest gorszy niż brak dokumentu.

| Ze zlecenia | Zmierzone | Skąd rozbieżność |
|---|---|---|
| „parytet 7850 kluczy" | **330 kluczy-liści na język** (364 węzły, 23 przestrzenie); bramka parytetu raportuje **14 plików w każdym z trzech drzew `content/`** | żadna miara w tym repo nie daje 7850. Pliki `messages/*.json` mają po **401 linii** i 30–34 kB. Liczba 7850 jest bliska rozmiarowi plików komunikatów **aplikacji** (inne repo, licznik linii) — to prawdopodobne źródło zapamiętania |
| „38 funkcji" (obietnice) | **31** obietnic w trybie dokonanym nadających się na podstrony funkcji; **38** to rozmiar sekcji 1 inwentarza („DZIAŁA end-to-end"), a cały inwentarz ma **105** pozycji (38 + 56 częściowych + 11 szkieletów) | dwie różne miary tego samego zbioru. Weryfikator adwersaryjny Fazy 4 (`f19149b`) policzył 31 i ta liczba weszła do architektury podstron |
| „inwentarz 14 ciągów" (bramka liczb) | **16 rozstrzygniętych ciągów** — potwierdzone przebiegiem `npm run bramka:liczby` | szacunek z 2026-08-15 był o dwa za niski; poz. T6 rejestru odnotowuje to wprost |
| „trzy pozycje kierunku" | **dwie** (`/funkcje/pozyskiwanie`, `/funkcje/tresci`) | K-D5: oznaczenie przy Studiu **wycofane** — przesłanka autora była błędna, Studio zostaje pozycją DZIAŁA |

Piąta rozbieżność, mniejsza, ale w tę samą stronę: „bramki (komplet 14)".
`.github/workflows/bramki.yml` ma **14 jobów**, ale jeden z nich to
`build` (fundament pozostałych). Bramek nazwanych „Bramka: …" jest
**13**. Liczba 14 jest poprawna dla „joby, które muszą być zielone",
niepoprawna dla „bramki". Raport używa dalej rozbicia 1 + 13.

### 0.3 Czego w tym raporcie nie ma

- **Sekcji 8** — pisze ją właściciel (placeholder na końcu).
- **Oceny, czy strona jest dobra.** Raport opisuje, jak powstała
  i co z tego wynika dla następnej. Ocena produktu to nie jest rola
  wykonawcy (Prawo 2).
- **Treści sekretów.** Klucz obejścia ochrony preview, token Vercela
  i zawartość `.env` nie występują tu w żadnej postaci, także skróconej.

---

## 1. CHRONOLOGIA FAZ

### 1.0 Ramy czasowe całości

| miara | wartość | metoda |
|---|---|---|
| pierwszy commit | `0896219`, 2026-08-08 22:01 | `git log --reverse` |
| ostatni commit | `3ca12a3`, 2026-08-16 19:04 | `git log -1` |
| rozpiętość kalendarzowa | **9 dni** (8 dni roboczych — 2026-08-15 bez ani jednego commita) | `git log --format=%ad \| uniq -c` |
| commity razem | **139** | `git rev-list --count HEAD` |
| commity na `main` | **1** (`0896219`) | `git rev-list --count main` |

**Commity dziennie:** 08-08 → 5 · 08-09 → 30 · 08-10 → 30 · 08-11 → 19
· 08-12 → 12 · 08-13 → 17 · 08-14 → 10 · 08-15 → **0** · 08-16 → 16.

Dzień bez commita (2026-08-15) nie jest przerwą w pracy: tego dnia
zapadły trzy doprecyzowania ADR-014 (w tym jedno wydane i **odwołane
tego samego dnia**) oraz zamknięcie poz. T5 rejestru. Decyzje właściciela
nie zostawiają śladu w `git log`, dopóki ktoś ich nie zapisze — i to jest
pierwsza obserwacja do matrycy: **dzienny licznik commitów nie mierzy
postępu, mierzy pisanie kodu.**

`main` ma jeden commit i to jest stan zamierzony: ADR-020 („main zawsze
zielony") plus ADR-030 (main dostaje wdrożenie produkcyjne dopiero przy
Fazie 7) oznaczają, że przez całą budowę **żadna gałąź fazy nie została
zmergowana do main**. Każda faza wychodzi z poprzedniej, nie z main.

### 1.1 Faza 0 — Konstytucja (7 commitów, 08-08 22:01 → 08-09 09:13)

Gałąź `faza-0/konstytucja`. Kryterium wyjścia z PLAN.md §6: „każdy agent
uruchomiony w repo zna zasady bez dopytywania".

**Co wniosła.** Reguły przed kodem. `CLAUDE.md` w korzeniu, ADR-y 001–018
zaimportowane z rejestru w PLAN.md, szkielet Next.js 15, **wszystkie
bramki w CI od razu — czerwone i to było zamierzone**, hooki
pre-commit, skrypt backupu na SSD, wyłączenie automatycznych deployów
Vercela z main.

**Kluczowe commity.**

| commit | co wnosi |
|---|---|
| `0896219` | PLAN.md (525 linii), STRATEGIA.md (248 linii), `.gitignore` |
| `cd06530` | CLAUDE.md, ADR-001…018, szkielet Next.js 15, `bramki.yml`, hooki |
| `aa6269c` | ADR-020 — main zawsze zielony, merge tylko przy komplecie zieleni |
| `7554e77` | `scripts/backup.sh` + zasada backupu w CLAUDE.md |
| `f5bbeec` | backup.sh: `.env` i `.vercel/` poza migawkami ZIP |
| `3496ff4` | `vercel.json` — wyłączenie automatycznych deployów z main |

**Czego uczy.** Dwa commity po godzinie od startu istniał komplet reguł,
którego nikt przez następne 8 dni nie musiał negocjować. Koszt: ~2 godziny.
Zwrot: każda kolejna sesja agenta zaczynała od znanych zakazów, a nie od
pytania „czy mogę". `f5bbeec` jest tu drobiazgiem o wielkim znaczeniu —
backup, który pakuje sekrety, jest wyciekiem z opóźnionym zapłonem;
poprawka przyszła 13 godzin po napisaniu skryptu, czyli **zanim** cokolwiek
zdążyło się zdarzyć.

### 1.2 Faza 1 — Fundament wizualny (13 commitów, 08-09 09:46 → 15:08)

Gałąź `faza-1/fundament-wizualny`. Kryterium wyjścia: „Claude Design
buduje wyłącznie z Twoich klocków".

**Co wniosła.** Diagnostyka kontrastu WCAG jako narzędzie (`kontrast.mjs`)
przed wyborem barw, algorytmiczne skale 50–900, `design/tokens.json`
+ Style Dictionary wpięty w `prebuild`, `image-style.md` (od PROJEKTU
przez akcept do statusu OBOWIĄZUJE po zdanym teście generacji), pierwszy
snapshot Stripe, ADR-022 (kontrakt tokenów zawężony do szwu logowania).

**Kluczowe commity.**

| commit | co wnosi |
|---|---|
| `a54945e` | `kontrast.mjs` — WCAG liczony, nie oceniany na oko |
| `1602033` | skale 50–900 generowane algorytmicznie (decyzja właściciela) |
| `0aaf265` | `design/tokens.json` + Style Dictionary + tokeny w szkielecie |
| `80f1ebe` | `image-style.md` → OBOWIĄZUJE po zdanym teście generacji |
| `bd37455` | pierwszy snapshot Stripe: 3 plany × 4 ceny, PLN+EUR, brutto |
| `119359c` | ADR-022 + `bramka:kontrakt` — zakres minimalny (szew logowania) |

**Czego uczy.** ADR-022 jest wzorcowym przykładem **zawężania obietnicy
zamiast jej łamania**. ADR-004 mówił „jeden design system, rozjazd
wykrywany kontraktem". Aplikacja nie miała uporządkowanego DS, więc pełny
kontrakt byłby albo fikcją, albo blokadą. Zamiast tego powstał ADR
doprecyzowujący: kontrakt obowiązuje **na jednym szwie** (tło strony vs
tło logowania, deltaE ≤ 5), reszta odroczona jawnie. Bramka do dziś mówi
o sobie prawdę: „zielony w zakresie MINIMALNYM … Detekcja zmian aplikacji:
BRAK — `kontrakt-aplikacji.json` aktualizuje ręcznie właściciel."

### 1.3 Faza 2 — Treść i pozycjonowanie (15 commitów, 08-09 15:22 → 22:56)

Gałąź `faza-2/tresc-i-pozycjonowanie`. Kryterium wyjścia: „panel + Ty
zatwierdzacie zwycięskie warianty; zero liczb bez źródła".

**Co wniosła.** Cała treść pl/en/de w statusie OBOWIĄZUJE, karta tonu,
inwentarz funkcji (105 pozycji) jako źródło prawdy, tabela obietnic,
struktura `/cennik`, słownik nazw, zlecenia Z1–Z4 do okna aplikacji
i raport z ich wykonania. Osiem protokołów paneli treści.

**Kluczowe commity.**

| commit | co wnosi |
|---|---|
| `eb971e1` | karta tonu AKTYWNA (DECYZJA 1) — ton przed pierwszym zdaniem |
| `b29264f` | protokół panelu nagłówka: zwycięzca W5, dwa pakiety syntezy |
| `d3617f6` | inwentarz funkcji (źródło prawdy) + tabela obietnic (DECYZJA 2) |
| `20ddbe3` | DECYZJA 3 — H1 „Rozmawiasz z ludźmi…"; „rozliczenia" → „wyniki" |
| `d173137` | DECYZJA 4 + zlecenia Z1/Z2 do okna aplikacji |
| `256efb3` | raport zleceń Z1–Z4 — odczyt repo aplikacji, z dowodami |
| `ce8812c` | rozstrzygnięcia Z1–Z4 naniesione, słownik OBOWIĄZUJE |

**Czego uczy.** DECYZJA 3 to moment, w którym system po raz pierwszy
zjadł własną obietnicę. Pakiet A2 wygrał, ale słowo „rozliczenia"
wypadło z H1, bo Rozliczenia nie działały end-to-end (Z1 pokazało to
w kodzie). Filar produktowy nie może stać w nagłówku strony, jeśli nie
stoi w aplikacji — i tak trafił do rejestru warunków powrotu jako poz. 1,
z warunkiem: „Działające rozliczenia end-to-end (Stripe aktywny)".
**Treść nie została zmiękczona. Została zdjęta z warunkiem.**

Drugi wzorzec z tej fazy: `256efb3` — okno www nie zgaduje, co robi
aplikacja. Pisze zlecenie Z, okno aplikacji czyta kod i odsyła raport
z odwołaniami do plików i linii. Granica katalogów jest przy tym
utrzymana: okno www nie czyta repo aplikacji.

### 1.4 Faza 3 — Komponenty (51 commitów, 08-10 20:23 → 08-12 19:10)

Gałąź `faza-3/komponenty`. **Faza, w której plan się zmienił** —
ADR-024 (DECYZJA 5) przepiął harmonogram z „wszystkie projekty, potem
wszystkie implementacje" na fazowanie hybrydowe per komponent.

**Co wniosła.** Pięć etapów (B–F), każdy przez pełny pipeline 4.1:
nawigacja i sekcja tekstowa (K1/K3), hero i pasek potwierdzeń (K2/K9),
filary (K4 + S9), cennik (K5–K8), złożenie strony głównej (S1–S14 + C8).
i18n przez next-intl, strona 404 renderowana bez JS, ADR-025 do 028
(tokeny ról, wymiarów, typografia), ADR-027 (system-ui na premierę),
pierwszy pomiar bazowy LCP.

**Kluczowe commity.**

| commit | co wnosi |
|---|---|
| `b52b093` | **ADR-024** — fazowanie hybrydowe per komponent (DECYZJA 5) |
| `e7e1054` | DECYZJA 6 — układy zaakceptowane, lustro L1 z warunkiem AA |
| `0c3e727` | i18n www: next-intl (pl bez prefiksu, `/en`, `/de`) |
| `8067fa0` | 404 z pełnym renderem bez JS (blokada adwersarza z rundy 1) |
| `ffbc728` | kanonizacja `/pl` zamiast 404 — naprawa naprawy (N1) |
| `779effe` | strażnicy czułości: `messages` znak w znak z `content` |
| `324660f` | strażnik intencji: H1 ≤ 3 linie ×3 języki, czułość mutacją 12ch |
| `2a433bc` | K4 filary + S9 (zebra przez `order`, sr-only H2) |
| `0bcbe7f` | `/cennik` C2–C7 + **naprawa `facts.json` — niepoprawny JSON od Fazy 2** |
| `ba3cba6` | runda 2 adwersarza: `contain:paint` — fantomowa panorama 116/186 px → 0 |
| `ad9ab2e` | złożenie głównej S1–S14 + C8; suita 177/180 |
| `d7f3c56` | strażnik geometryczny lustra: Δx kropek ≤ 1 px, czułość mutacją 256 px |
| `07fe886` | ADR-027 PRZYJĘTY; domknięcie klasy apostrofów U+2019 |

**Czego uczy.** Trzy rzeczy.

Po pierwsze — **ADR-024 nie był ustępstwem, tylko poprawką planu do
rzeczywistości.** Treść i tokeny były zamknięte, więc projekt komponentu
nie czekał na żadne wejście; komponent domknięty end-to-end weryfikował
handoff natychmiast, zamiast po sześciu paczkach. Bramki jakości ruszyły
od Etapu B, a nie po fazie projektowej.

Po drugie — `0bcbe7f` znalazł **niepoprawny JSON w `facts.json` obecny
od Fazy 2**. Plik był źródłem prawdy dla wszystkich liczb i przez dwa dni
nikt tego nie zauważył, bo nikt nie parsował go w bramce, która by na tym
padła. Źródło prawdy bez parsera w bramce jest źródłem przekonania.

Po trzecie — `ffbc728` (N1) to pierwszy udokumentowany przypadek klasy
„naprawa psuje sąsiada": naprawa 404 bez JS zabiła kanonizację `/pl`
(307 → 404). Adwersarz złapał to w rundzie 3. Wniosek nie brzmi „naprawiaj
ostrożniej", tylko „**po każdej naprawie uruchom cały zestaw, nie tylko
test naprawianej rzeczy**".

### 1.5 Faza 4 — Podstrony (53 commity, 08-12 19:25 → 08-16 19:04, w toku)

Gałąź `faza-4/podstrony`. Najdłuższa i najgęstsza faza: cztery podstrony
filarów, `/funkcje` jako indeks, `/dla-kogo`, mapa stopki, osadzenie
zrzutów produktu (Z6) i — nieplanowana — przebudowa bramki wydajności.

**Etapy.**

| etap | zakres | zamknięcie |
|---|---|---|
| A | architektura podstron: 31 obietnic dokonanych, mapowanie 4 podstron | `f19149b` |
| B | `/funkcje/pozyskiwanie` — wzorcowa podstrona, K12 | `d266688` |
| C | `/funkcje/{tresci,zespol,wyniki}` — 21 modułów + ramy | `933fe11` |
| D | `/funkcje` jako indeks + `/dla-kogo` + korekty u korzenia | `27bd2e6` |
| E | `/pomoc` — **wycofana z zakresu startu** po trzech kompletach werdyktów | ADR-014, doprecyzowanie 2026-08-15 III |
| — | mapa stopki, Z6, bramka wydajności na preview | `3ca12a3` |

**Kluczowe commity.**

| commit | co wnosi |
|---|---|
| `f19149b` | 31 obietnic dokonanych (weryfikator adwersaryjny vs miara 38) |
| `717fdb0` | implementacja wzorcowej podstrony: 48 testów, strażnik milczenia |
| `5c23caf` | trzy podstrony + `SpisTresci`; suita 408 |
| `f3fb1d3` | `/funkcje` jako indeks zadań dnia + `/dla-kogo` |
| `5fc4d52` | **jedna** recepta odsunięcia od sticky nagłówka (refaktor u korzenia) |
| `c0da109` | **jedna** recepta podkreślenia linku na cały serwis (8 → 1) |
| `8fdc47f` | bramka wydajności obejmuje cztery podstrony filarowe |
| `62837fc` | pomiar CI zamiast projekcji + chwiejność bramki wydajności |
| `8479e6d` | **13 speców przestaje być martwych na CI** |
| `27bd2e6` | ADR-029 — hero domknięty szerokością kolumny, nie miarą (V5) |
| `7c68b85` | mapa stopki (8 adresów) + bramka linków na rejestrze z mapy |
| `6168ec7` | Z6: odbiór zrzutów, pipeline, osadzenie za przełącznikiem |
| `d55bbef` | rozbiór pomiarowy render delay na „/" — raport przed naprawą |
| `4ec6576` | prowieniencja pomiaru + Z6 na „/" |
| `083d9f0` | ADR-030 — wdrożenie produkcyjne main przy Fazie 7 |
| `34710c7` | `bramka:liczby` czyta warstwę treści (zamknięcie T6) |
| `e2ac0f3` | obejście ochrony preview: **jeden nagłówek, nie dwa** |
| `a4a153d` | werdykt z jednego prawdziwego przebiegu, nie z chimery |
| `6b78c75` | pięć przebiegów zamiast trzech + rozgrzana krawędź |
| `26c38f2` | **reprezentanta wybiera LCP** — metryka, na której stoi werdykt |
| `3ca12a3` | rejestr: T3 zamknięte, rozrzut zamrożony jako T10 |

**Czego uczy.** Faza 4 rozpadła się na dwie różne prace i to jest jej
najważniejsza lekcja. Etapy A–D to budowa treści i stron według wzorca
z Fazy 3 — przewidywalna, dobrze opisana pipeline'em. Od `8fdc47f`
zaczyna się druga praca: **naprawa przyrządu pomiarowego**. Osiemnaście
z pięćdziesięciu trzech commitów Fazy 4 (34%) nie dodało stronie ani
jednego zdania — poszły w to, żeby bramka wydajności mierzyła stronę,
a nie środowisko pomiaru.

Ta praca nie była w planie i nie dało się jej zaplanować, bo każdy
kolejny problem był widoczny dopiero po naprawieniu poprzedniego:
pomiar lokalny → pomiar na preview → ekran logowania Vercela mierzony
jako strona → obce wydanie pod stałym adresem → zimna krawędź CDN →
reprezentant wybierany po niewłaściwej metryce → rozrzut szerszy niż
zapas. Sześć warstw, każda odkryta przez zdjęcie poprzedniej.

---

## 2. ARCHITEKTURA DECYZJI — ADR 001–030

Format: `NNN-tytul.md` → Kontekst · Decyzja · Konsekwencje · Data
(PLAN.md §8). Zmiana decyzji = nowy ADR, który jawnie uchyla stary.
**ADR-018 jest nadrzędny wobec wszystkich pozostałych.**

Seed 001–018 pochodzi z rejestru w PLAN.md; ADR-y od 019 wzwyż istnieją
wyłącznie w `docs/adr/`. Wpisy 023–028 dopisano do tabeli rejestru
2026-08-14 — powstały wcześniej, ale nie trafiły do mapy; przy rozjeździe
prawdę mają pliki, nie tabela.

| Nr | Streszczenie | Status | Czego uczy |
|---|---|---|---|
| 001 | Izolacja marki: neutralne przykłady, zero partnerów, logotypów, twarzy | OBOWIĄZUJE | Zakaz sformułowany zanim pojawiła się pokusa jest tańszy niż wycofywanie grafiki po fakcie |
| 002 | Progi wydajności i dostępności jako bramki **blokujące**, nie zalecenia | OBOWIĄZUJE | Próg bez bramki jest życzeniem; próg 1800 ms przeżył cztery próby obejścia właśnie dlatego, że blokował |
| 003 | Zakaz ciemnych wzorców — lista zamknięta | OBOWIĄZUJE | Lista zamknięta z góry zdejmuje dyskusję „czy to jeszcze nie jest dark pattern" przy każdym komponencie (np. brak plakietki „najpopularniejszy" na cenniku) |
| 004 | Jeden design system, rozjazd wykrywany kontraktem | OBOWIĄZUJE, doprecyzowany przez 022 | Ambitna decyzja bez pokrycia w drugim repo staje się fikcją — ratuje ją zawężenie, nie zawieszenie |
| 005 | Auth wyłącznie w aplikacji, strona przez rewrites | OBOWIĄZUJE | Strona marketingowa, która sama loguje, dubluje najbardziej nieodwracalny mechanizm produktu |
| 006 | Płatność przed kontem; cała strona publiczna | OBOWIĄZUJE | Kolejność zakupu jest decyzją produktową, nie implementacyjną — musi stać w ADR, bo dotyka pieniędzy |
| 007 | Treść w repo, bez CMS na start | OBOWIĄZUJE | Treść w repo daje diff, review i bramki; CMS daje wygodę i zero z tych trzech |
| 008 | Trzy języki od dnia pierwszego, hreflang + x-default | OBOWIĄZUJE | „Trzeci język dorobimy po starcie" jest anty-wzorcem z PLAN.md §9 — parytet w bramce czyni go niewykonalnym |
| 009 | Jeden motyw, bez przełącznika jasny/ciemny | OBOWIĄZUJE | Każdy motyw to komplet par kontrastowych do policzenia i przetestowania; drugi motyw podwaja bramkę dostępności |
| 010 | Analityka przez warstwę produktu, bez trzeciego systemu | OBOWIĄZUJE | Trzeci system to trzecie źródło prawdy o tych samych zdarzeniach (Prawo 1) |
| 011 | Obrazy generowane: warstwa dekoracyjna, **nigdy** pseudo-zrzuty | OBOWIĄZUJE | Zrzut, który udaje UI, jest obietnicą wizualną — a obietnice podlegają ADR-018. Z6 robi zrzuty Playwrightem na danych demo, nie generatorem |
| 012 | Waluty i prawo konsumenckie | OBOWIĄZUJE | Ceny brutto i prawo odstąpienia to obszar „pieniądze" — nie negocjuje się go z projektem |
| 013 | Ciepła jakość: kierunek emocjonalny marki | OBOWIĄZUJE | Kierunek emocjonalny zapisany w ADR daje panelom treści kryterium odrzucenia; bez niego panel ocenia gust |
| 014 | **Zakres zamrożony Iteracji 1** | OBOWIĄZUJE, 4 doprecyzowania (08-14, 08-15 I/II/III) | Najbardziej pracujący ADR w repo — patrz §2.1 |
| 015 | Paleta barw przez tokeny, wybór narzędziami | OBOWIĄZUJE | Barwa wybrana „na oko" nie ma jak przejść bramki kontrastu; skale generowane algorytmicznie mają |
| 016 | Zamknięty zestaw platform Iteracji 1 | OBOWIĄZUJE | Zamknięta lista zależności = przewidywalny koszt utrzymania |
| 017 | Brak panelu administracyjnego strony | OBOWIĄZUJE | Panel admina to drugi system uprawnień na tej samej treści (Prawo 1) |
| 018 | **Prymat nieodwracalnego (NADRZĘDNY)** — dane · pieniądze · bezpieczeństwo · obietnice | OBOWIĄZUJE | Jedyny ADR, który wygrywa ze wszystkimi. Z niego pochodzi zasada dowodu mutacyjnego, „brak dowodu = brak zabezpieczenia" i „nie oceniasz własnej pracy" |
| 019 | Standardowy toolchain Next.js jako część stacku języka | OBOWIĄZUJE | ADR-016 zamykał platformy, nie narzędzia budowania — granica wymagała nazwania, żeby nie blokować `eslint` |
| 020 | **Main zawsze zielony** — merge tylko przy komplecie zieleni | OBOWIĄZUJE | Bezpiecznik całego systemu. „Czerwień uzasadniona też jest czerwienią" — bez tego zdania każda czerwień znajduje uzasadnienie |
| 021 | Własny minimalny serwer MCP jako adapter API Higgsfield | **SZKIC** (2026-08-09) — jedyny nieprzyjęty | ADR w statusie SZKIC jest uczciwszy niż decyzja udawana; fallback opisany, decyzja odroczona |
| 022 | Kontrakt tokenów zawężony do szwu logowania (doprecyzowuje 004) | OBOWIĄZUJE | Wzorzec „zawęź obietnicę, nie łam jej"; bramka mówi o swoim zakresie w każdym przebiegu |
| 023 | Ścieżka zakupu przez `/login` | PRZYJĘTY 2026-08-09 | Doprecyzowanie strategii pkt 41 — jedno wejście zamiast dwóch |
| 024 | **Fazowanie hybrydowe per komponent** (Fazy 3+4 przeplatane) | PRZYJĘTY 2026-08-10 (DECYZJA 5) | Plan wolno zmienić, ale nie wolno pominąć etapu: „ZERO pomijanych etapów. Sekcja, która ominęła etap, wraca na jego początek" |
| 025 | Tokeny: powierzchnia akcentowa, kreska, miara tekstu | PRZYJĘTY 2026-08-10 | Nowa potrzeba wizualna = nowy token przez ADR, nigdy wyjątek w komponencie |
| 026 | Typografia tymczasowa — system-ui **z datą ważności** | PRZYJĘTY 2026-08-10 | Decyzja tymczasowa z zapisaną datą wygaśnięcia nie zamienia się w trwałą przez zapomnienie |
| 027 | Krój pisma system-ui na premierę Iteracji 1 | PRZYJĘTY 2026-08-12 | Zamknięcie 026: krój = osobna iteracja z pomiarem na preview, nie „przy okazji" |
| 028 | Tokeny wymiarów — promienie, kontener 70rem, próg układu 48rem | PRZYJĘTY 2026-08-11 | Próg układu jako token, nie liczba w module — inaczej każdy komponent ma własny breakpoint |
| 029 | Próg i proporcje kolumn hero (V5: 72rem + 4fr 2fr) — jedyny wyjątek od 028 | PRZYJĘTY 2026-08-14 | Wyjątek od własnego tokenu wymaga ADR i tabeli pomiarów; V5 wybrany z pięciu wariantów po zmierzeniu linii H1 w sześciu krojach |
| 030 | `main` dostaje wdrożenie produkcyjne przy Fazie 7; do tego czasu planowa czerwień bramki wydajności na main, **bez wyjątku w kodzie** | PRZYJĘTY 2026-08-16 | Planowa czerwień musi być widoczna, nie wyciszona — wyjątek w kodzie zamieniłby ją w cichą zieleń |

### 2.1 ADR-014 jako studium przypadku

ADR-014 (227 linii) jest jedynym ADR-em, który w trakcie budowy
doprecyzowywano cztery razy — i jednym z dwóch (obok 026/027), gdzie
**decyzja została jawnie odwołana**.

| data | doprecyzowanie | los |
|---|---|---|
| 2026-08-14 | `/pomoc` bez obietnicy czasu odpowiedzi; dwa pytania otwarte | obowiązuje |
| 2026-08-15 (I) | `/pomoc` zmienia gatunek | **ODWOŁANE tego samego dnia** — zostaje w pliku w całości |
| 2026-08-15 (II) | cztery podstrony filarów + `/dla-kogo` WCHODZĄ do zakresu startu | obowiązuje; nazwane „luką formalną, nie sporem o zakres" |
| 2026-08-15 (III) | `/pomoc` wypada z zakresu startu w całości | obowiązuje |

Odwołana decyzja **nie została usunięta** — plik zachowuje ją w całości
z uzasadnieniem: „historia decyzji jest częścią produktu". Przy trzecim
doprecyzowaniu właściciel zapisał trzy fakty, które obaliły decyzję (I),
i notę procesową:

> „Krótkość była cechą, pustka nie jest."
> „Trzy rundy paneli = system zadziałał, nie zawiódł… bramki mierzą
> wykonanie, nie sens."

To jest najważniejsze zdanie o granicach całego systemu bramek w tym
repozytorium. **Żadna bramka nie wykryje strony, która jest poprawna,
zielona i niepotrzebna.** Wykryło to trzykrotne przejście panelu.

---

## 3. WZORCE, KTÓRE SIĘ SPRAWDZIŁY

Każdy wzorzec: co to jest · przykład z repo · dlaczego działa ·
co go psuje.

### 3.1 Pipeline treści: fundament → warianty → sędziowie → synteza → adwersarze

**Co to jest.** Treść nie powstaje jednym przebiegiem agenta. Kolejność
jest sztywna (PLAN.md §4.1, ADR-024 pkt 3): brief (fundament: co ma
zrobić ten tekst, czego mu nie wolno, jakie ma kryteria odrzucenia) →
**fan-out N niezależnych wariantów, agenci ślepi na siebie nawzajem** →
osobny agent-panel ocenia warianty według kryteriów z briefu → synteza
z **nazwanymi przeszczepami** (który fragment z którego wariantu i
dlaczego) → adwersarz na gotowym.

**Przykład.** `docs/faza-2/panel-naglowek.md` (116 linii): pięć kątów
fan-outu, zwycięzca W5, dwa pakiety syntezy przedstawione właścicielowi
do wyboru. Kryteria odrzucenia były jawne i **jedno z nich było
dyskwalifikujące**: K1 (obietnica bez pokrycia w kodzie) wyrzucał wariant
niezależnie od punktacji K2–K5. Dzięki temu H1 „Rozmawiasz z ludźmi —
Catherly prowadzi kontakty i wyniki." (58 znaków) ma pokrycie w każdym
członie.

Ten sam schemat, mniejszy: `docs/faza-2/panel-adaptacja-en.md` orzekł, że
„earnings" w EN to **NARUSZENIE**, nie synonim — bo obiecuje zarobki,
a kod robi rozliczenia; zostało „billing". W DE: „Abrechnung" wyłącznie
w liczbie pojedynczej, „du" małą literą, formy żeńskie kompletne.

**Dlaczego działa.** Prawo 2 („nie oceniasz własnej pracy") realizowane
strukturalnie, nie deklaratywnie. Agent piszący nie ocenia; agent
oceniający nie pisze; właściciel wybiera z przedstawionych, a nie
akceptuje jedyne.

**Co go psuje.** Fan-out z agentami, którzy widzą swoje wyniki
nawzajem — dostajesz N wariantów tego samego pomysłu. I panel, który
dostaje warianty bez kryteriów z briefu — wtedy ocenia gust.

### 3.2 Reguła reużycia „znak w znak"

**Co to jest.** Ten sam napis w dwóch miejscach systemu (`content/*.md`
i `src/i18n/messages/*.json`) musi być identyczny **co do bajta**, a
pilnuje tego strażnik porównujący oba źródła — nie człowiek przy review.

**Przykład.** `779effe` (Faza 3, Etap C, runda adwersarza) — strażnik
dopisany po tym, jak adwersarz pokazał mutacją, że testy były
**samoodniesieniem**: sprawdzały `messages` przeciwko `messages`, więc
literówka wprowadzona do `de.json` przechodziła zielono. Po dopisaniu
strażnika ta sama mutacja (półpauza → pauza w DE) daje czerwień ×2.

Wzorzec powtórzył się w Fazie 4 przy rozbiciu klucza `f8` na `f8_1`
i `f8_2`: `f8_1` **zostaje znak w znak** formułą z pięciu nietkniętych
miejsc — zmiana treści w jednym miejscu bez pozostałych jest wykrywalna.

**Dlaczego działa.** Zamienia „pamiętaj, żeby zmienić w obu miejscach"
(procedura, którą się zapomina) na czerwień w CI (mechanizm, którego
się nie zapomina).

**Co go psuje — i to jest znalezisko N12.** Klucz widoczny na stronie,
który **nie ma odpowiednika w `content/`**, nie ma dziś ochrony przed
opróżnieniem: `toContain("")` przechodzi zawsze. Strażnik bez-JS na
takim kluczu jest ozdobą. Reguła praktyczna: dopisując klucz widoczny,
dopisz mu lustro w `content/` albo asercję na konkretnej wartości.

### 3.3 Strażnicy z dowodem mutacyjnym

**Co to jest.** Zielony test nie jest dowodem, że cokolwiek mierzy.
Dowodem jest **czerwień po celowym zepsuciu tego, czego strażnik
pilnuje**. Procedura: zepsuj jedną rzecz → pełna przebudowa (nie
dev-server) → uruchom strażników → zapisz przewidywanie i wynik →
przywróć → zweryfikuj przywrócenie porównaniem zawartości.

**Przykład — tabela z §12.4 handoffu Etapu D**, ośmiu mutacji na dwóch
strażnikach oznaczenia kierunku:

| # | mutacja | wynik |
|---|---|---|
| M0 | kod nietknięty | 6/6 zielonych |
| M1 | zdjęte oznaczenie z JEDNEJ pozycji | S-SYMETRIA ×3 czerwone, S-NAZWY zielone |
| M2 | zdjęte **pole** z OBU pozycji | budowa nie kompiluje się — `TS2345` |
| M2b | oba ciągi **opróżnione** w i18n(pl) | 2 czerwone, 4 zielone |
| M3 | zdjęte oznaczenie z H2 podstrony | S-SYMETRIA ×3 czerwone |
| M4 | oznaczenie **dopisane** tam, gdzie nie ma prawa być | S-SYMETRIA ×3 czerwone |
| M5 | oznaczenia zamienione miejscami | S-SYMETRIA ×3 czerwone |
| M6 | oba oznaczenia dostają **identyczny** ciąg | tylko de czerwone |
| M7 | nazwa dostępna nadpisana `aria-label` | S-NAZWY ×3 czerwone |

Osiem z ośmiu zgodnie z przewidywaniem — ale **M2 zachowała się inaczej,
niż zakładał autor**, i to zostało zapisane jako ustalenie, nie
formalność: `tsc` pada wcześniej niż strażnicy, więc kompilator jest tu
trzecią warstwą — ale **wyłącznie dla usunięcia pola**; usunięcie treści
(M2b) kompiluje się bez zarzutu.

**Dlaczego działa.** Wymusza sformułowanie przewidywania **przed**
uruchomieniem. Rozjazd przewidywania z wynikiem jest wtedy informacją,
a nie niespodzianką do przemilczenia. W tym repo rozjazd wystąpił
co najmniej trzy razy (M2 wyżej, M3 w §11, N9 na skażonej bazie)
i za każdym razem ujawnił coś, czego autor nie wiedział o własnym
systemie.

**Co go psuje.** Harness, który przywraca źródła, **ale nie przebudowuje**
— mutacja N9 pierwszy raz poszła na buildzie z poprzednią mutacją
i dała 9 nadmiarowych czerwieni. Delta była poprawna, ale „dowód na
skażonej bazie dowodem nie jest", więc N9 powtórzono na czystym
buildzie i w tabeli stoją liczby z powtórki.

### 3.4 Inwersja zależności: rejestr wyprowadzany z mapy

**Co to jest.** Zamiast dwóch list, które trzeba trzymać w zgodzie
(„adresy, które istnieją" i „adresy w stopce"), jedna jest **funkcją**
drugiej.

**Przykład.** `7c68b85` — bramka linków. `ISTNIEJACE_SCIEZKI` przestało
być ręczną listą i stało się `splaszczMape(MAPA_STOPKI) + WYLACZONE_Z_MAPY`.
Dopisanie adresu do mapy stopki automatycznie dopisuje go do rejestru
dozwolonych; adres celowo poza stopką trzeba **jawnie wymienić** w drugim
zbiorze, czyli decyzja o wyjątku jest widoczna w diffie.

**Pułapka techniczna zapisana przy okazji:** `splaszczMape` musi być
**deklaracją funkcji**, nie `const`. W runtime Edge wyrażenie funkcyjne
wpada w TDZ i daje 500 na każdym żądaniu — czyli błąd, który nie jest
błędem logiki, tylko kolejności inicjalizacji w konkretnym środowisku.

**Dlaczego działa.** Prawo 1 (jedno źródło prawdy) zastosowane do list.
Dwie listy rozjeżdżają się cicho; lista wyprowadzona z drugiej nie ma
jak.

**Co go psuje.** Zbiór wyjątków, który rośnie. Gdy `WYLACZONE_Z_MAPY`
zrobi się dłuższe od mapy, inwersja przestaje cokolwiek gwarantować.

### 3.5 Bramka prowieniencji: „czy mierzę TEN commit"

**Co to jest.** Wdrożenie samo podaje, z jakiego commita pochodzi,
a bramka odmawia pomiaru, dopóki to nie jest commit, na którym stoi CI.

**Przykład.** `next.config.ts` dokłada do każdej odpowiedzi nagłówek
`x-catherly-wydanie` (`VERCEL_GIT_COMMIT_SHA` na Vercelu, `GITHUB_SHA`
na runnerze, `lokalne` u siebie). `scripts/sprawdz-preview.mjs` czyta go
i **czeka**, aż deploy dogoni commita — do 420 s, próba co 10 s. Rozjazd
tuż po pushu jest normalny; czerwień pojawia się dopiero po upływie okna.

Ten sam strażnik zamyka drugą dziurę tej samej klasy: preview za ochroną
oddaje **ekran logowania Vercela ze statusem 200 i słowem „Catherly" dwa
razy w treści**. Lighthouse zmierzyłby go i oddał świetne wyniki.
Strażnik sprawdza trzy markery, których logowanie wyprodukować nie może:
`<html lang="pl"`, `id="hero-h1"` i **dosłowny nagłówek H1 czytany
z `src/i18n/messages/pl.json`**.

**Dowody.** Osiem mutacji na stanowisku lokalnym (P0–P7) i sześć na
żywym preview (R1–R6). Najważniejsza jest R4: po zdjęciu drugiego
nagłówka obejścia (patrz §4.8) istniała hipoteza, że wykrywanie ściany
logowania osłabnie. Nie osłabło — bez ważnego obejścia Vercel nadal
oddaje 302 na `vercel.com/sso-api`, a strażnik nadal nazywa to po
imieniu.

**Dlaczego działa.** Rozstrzyga to, czego treść strony rozstrzygnąć nie
może. Obie wersje (ta i poprzednia) **wyglądają identycznie**.

**Co go psuje.** Nagłówek w treści zamiast w odpowiedzi — wchodziłby
wtedy w drogę bramkom treści. Tu jest nagłówkiem odpowiedzi i nie dotyka
HTML-a.

### 3.6 Reprezentant wybierany po LCP

**Co to jest.** Gdy bramka mierzy N razy, ktoś musi wskazać, **który
przebieg jest wyrokiem**. Reguła: przebieg o **medianowym LCP** — czyli
po metryce, na której stoi werdykt.

**Skąd się wziął problem.** Bramka używała `median-run` z lhci. Wbrew
nazwie `median-run` **nie jest przebiegiem o medianowym LCP**:
reprezentanta wybiera odległość od median FCP i TTI
(`@lhci/utils/src/representative-runs.js:17–22`), a LCP w tym wyborze
nie bierze udziału. Rachunek przyszedł na przebiegu **31955831699**:

```
/dla-kogo   przebiegi LCP: 1504 · 1374 · 1934 · 1486 · 1488
            mediana LCP  : 1488 ms   (zapas +312 ms pod progiem)
            median-run   : 1934 ms   → BRAMKA CZERWONA (−134 ms)
```

Na **5 z 7 tras** reprezentant `median-run` nie był przebiegiem
o medianowym LCP. Na laptopie ta rozbieżność wypadała **1 raz na 7**.

**Rozstrzygnięcie właściciela** (2026-08-16), z uzasadnieniem, które jest
tu ważniejsze od samej reguły:

> Mediana per-metryka = powrót chimery zabitej przez O1; asercja na
> najgorszym z 5 przebiegów przy medianie +312 ms pod progiem to fałszywy
> alarm, a **bramka fałszywie alarmująca uczy ignorowania czerwieni**.
> Próg 1800 NIETKNIĘTY.

**Jak to jest zrobione.** `scripts/reprezentant.mjs` (jedyne źródło
kryterium) + `scripts/werdykt-po-lcp.mjs` (wybiera i podaje `lhci assert`
jeden przebieg na trasę) + `lighthouserc.cjs` (progi, nietknięte) +
`podsumowanie-pomiaru.mjs` (**czyta** wybór bramki z pliku śladu, nie
odtwarza go własnym kodem — „dwie implementacje tej samej reguły
rozjeżdżają się cicho").

**Jak reguła zostaje audytowalna.** Tabela pokazuje przy każdym
reprezentancie **odchylenia od median pozostałych metryk, w tym FCP
i TTI** — czyli dokładnie kryterium starej reguły. `zlamanaRegula`
sprawdza po fakcie, czy wybrany przebieg ma medianowe LCP, i wypisuje
„⚠ REGUŁA ZŁAMANA", gdy nie ma. **Podmiana kryterium jest widoczna
w logu, a nie tylko w kodzie** — mutacja R1 (powrót do FCP+TTI) dała
5 z 7 tras z tym ostrzeżeniem.

**Dlaczego działa.** 7/7 zielone na **tych samych danych**, na których
`median-run` dawał czerwień. Zero zmian w progu, zero zmian w kodzie
strony.

**Co go psuje.** `lhci assert --lhr <katalog>` — pułapka:
`loadSavedLHRs` czyta nazwy z podanego katalogu, ale skleja je ze
ścieżką `LHCI_DIR` (`saved-reports.js:39`), więc czytałoby cudze pliki.
Jedyny bezpieczny sposób podania wyselekcjonowanego zestawu to
**sterowanie cwd procesu potomnego**.

### 3.7 Wzorce mniejsze, ale przenośne

**Trzeci slot modułu K12 — „CZEGO NIE ROBI".** Każdy moduł podstrony
funkcji ma stałą strukturę: H2 → PO CO TO → JAK WYGLĄDA → **CZEGO NIE
ROBI**. Trzeci slot jest obowiązkowy. To zamienia uczciwość z kwestii
dobrej woli redaktora we **właściwość układu**: pusty slot widać.

**Strażnik milczenia.** Odwrotność zwykłego testu — sprawdza, że pewnych
fraz na stronie **nie ma**: nazw funkcji z innych filarów, funkcji
wyłączonych flagą, nazw własnych dostawców. Listy są per adres i rosną
z zakresem strony: `/funkcje/pozyskiwanie` **21 fraz**, podstrony
filarowe **17 fraz wspólnych + lista własna filaru**, `/funkcje` jako
indeks **45 fraz** (agreguje cztery filary plus słowo „rozliczenia").
Grep idzie po **surowym HTML**, nie po DOM. Broni przed obietnicą
dopisaną „przy okazji".

**Lustro tonalne L1.** S3 i S10 na stronie głównej dzielą jeden szkielet
kompozycyjny, różnią się wyłącznie tonem tła i czasownikiem
(liczysz/widzisz). Pilnuje tego **strażnik geometryczny**: Δx kropek obu
luster ≤ 1 px, czułość udowodniona mutacją 256 px.

**Jedna recepta zamiast ośmiu.** `c0da109`: podkreślenia linków miały
8 różnych recept w modułach CSS. Refaktor u korzenia → **1 recepta,
224 linki, 167 widocznie zmienionych**. Nowy strażnik ma **podłogę >200
linków**, więc zepsuty selektor nie może go zazielenić przez znalezienie
zera elementów.

**Adnotacja, która czyta źródło.** `scripts/tryb-pomiaru.mjs` wypisuje
do logu CI, w jakim trybie mierzy i jak czytać wynik — a **liczby bierze
z rejestru, nie z YAML-a**. Adnotacja przepisana ręcznie kłamie po
pierwszej zmianie; ta nie ma jak.

---

## 4. ANTY-WZORCE I LEKCJE — pełny katalog błędów tej budowy

Każdy: jak powstał · jak został wykryty · co go zatrzymuje.

### 4.1 Test trafiający w otoczenie zamiast w rzecz (wszystkie odmiany)

Klasa najliczniejsza. Wspólny mianownik: test jest zielony i **nie
dotyka tego, co miał chronić**.

**(a) Samoodniesienie.** Test czyta `messages` i sprawdza je przeciwko
`messages`. Literówka w DE przechodzi. *Wykryty:* mutacją adwersarza
w Fazie 3 Etapie C (półpauza → pauza). *Zatrzymuje:* strażnik znak
w znak `content` ↔ `messages` (`779effe`).

**(b) Asercja na podciągu globalnego artefaktu.** `toContain` na całym
HTML-u albo `grep` po całym repo. Wygasa w chwili, gdy szukany ciąg
staje się wszechobecny — i wygasa **cicho, zostając zielona**.
*Zatrzymuje:* lokator celujący w konkretny element (`href`, rola,
sekcja). Zasada trafiła do CLAUDE.md jako reguła obowiązkowa **przed**
dopisaniem czegokolwiek do elementu współdzielonego.

**(c) Test mierzący nie ten artefakt.** Strażnik T6 Etapu D mierzył
**ładunek RSC**, nie znaczniki: `/funkcje` to 28 430 znaków, z czego
20 812 w skryptach. Sprawdzał więc obecność frazy w serializowanym
payloadzie, nie w tym, co widzi czytelnik bez JS. *Zatrzymuje:* funkcja
`bezSkryptow()` odcinająca `<script>` przed asercją.

**(d) `toContain("")` przechodzi zawsze.** Klucz opróżniony do pustego
ciągu nie zapala niczego w bramce bez-JS. *Wykryty:* mutacją N12.
*Zatrzymuje:* asercja na konkretnej wartości albo lustro w `content/`.

**(e) Test, który nie biegał.** Patrz §4.3 — najcięższy przypadek.

**(f) Zielony przez znalezienie zera elementów.** Selektor psuje się,
pętla po zerowej liście przechodzi. *Zatrzymuje:* **podłoga liczności**
w asercji (`> 200 linków` w `podkreslenia.spec.ts`).

**(g) Komentarz SSR niewidoczny dla DOM.** React wstawia `<!-- -->`
między sąsiednie wyrażenia JSX. `textContent` komentarzy nie widzi, więc
**każdy** strażnik DOM (`toHaveText`, nazwa dostępna, S-NAZWY,
S-SYMETRIA) zostaje zielony po rozbiciu sklejenia. Złapał to wyłącznie
strażnik bez-JS na surowym HTML: mutacja N8 → **9 czerwieni, wyłącznie
bez-JS**, wszystkie strażniki DOM zielone.

### 4.2 Erozja strażnika przez zmianę otoczenia

**Jak powstaje.** Strażnik nie zmienia ani jednej linii własnego kodu
i przestaje działać, bo zmieniło się to, w czym szuka. Wariant (b)
powyżej jest tego przypadkiem szczególnym.

**Dlaczego jest groźniejszy niż zwykły błąd.** Nie ma commita, który go
wprowadza. `git blame` pokazuje autora strażnika, a nie autora zmiany,
która go zerodowała. Zielona bramka po Twojej zmianie **nie jest
dowodem, że nadal mierzy to samo**.

**Co zatrzymuje.** Zapisane w CLAUDE.md jako procedura obowiązkowa:
zanim dopiszesz ciąg do elementu współdzielonego (stopka, nagłówek,
layout), sprawdź, kto dziś asertuje ten ciąg globalnie; jeśli ktoś
asertuje — **najpierw** przepisz jego asercję na lokator punktowy.
Dowód, że strażnik żyje, to mutacja, nie kolor.

**Przypadek pozytywny z tego repo:** mutacja M1 przy Z6 (usunięcie bloku
obrazu z filaru) zapaliła **także starego strażnika zebry**
w `e2e/filary.spec.ts` — czyli tamten test dalej mierzy kontener obrazu
i **nie wygasł** przez osadzenie zrzutów. To zostało sprawdzone, a nie
założone.

### 4.3 Strażnicy, których CI nie uruchamiał

**Najcięższe znalezisko całej budowy.** Przy rekonesansie Etapu D
(2026-08-14) ustalono u źródła: `.github/workflows/bramki.yml`
uruchamiał Playwrighta w **dokładnie dwóch miejscach** — `e2e/axe.spec.ts
e2e/klawiatura.spec.ts` (w. 137) oraz `e2e/sciezka-zakupu.spec.ts`
(w. 151).

Znaczyło to, że **wszystkie spece treści Etapów B–D biegały wyłącznie
lokalnie**. Każda asercja „znak w znak", każdy strażnik milczenia, każdy
test kotwic miał na CI status **niesprawdzonego** — a niesprawdzony
liczy się jak niedziałający (ADR-018).

**Jak wykryty.** Nie przez czerwień — przez czytanie YAML-a przy okazji
dopisywania nowego pliku strażników. Autor zauważył, że **nowy plik nie
biegałby na bramce w ogóle**, i dopiero to pociągnęło pytanie o resztę.

**Rozstrzygnięcie właściciela (2026-08-14):**

> „Dopisz wszystkie spece treści do bramki CI + przebieg potwierdzający,
> że biegną i są zielone. **To jest dziura klasy security-scan.**"

**Zamknięte** w `8479e6d` („13 speców przestaje być martwych na CI") —
job `bramka-pelny-zestaw` uruchamia dziś `npx playwright test` bez
listy plików, czyli **cały zestaw, oba projekty**.

**Lekcja przenośna.** Komplet zielonych bramek na tablicy CI nie znaczy,
że wszystko jest zielone. Znaczy, że zielone jest to, co CI uruchamia.
**Sprawdź listę uruchamianych plików osobno od listy istniejących
plików** — najlepiej bramką, która porówna oba zbiory.

### 4.4 Wynik-chimera

**Jak powstał.** `aggregationMethod: "median"` w lhci liczy medianę
**osobno dla każdej metryki**. Werdykt zapada wtedy na przebiegu, którego
nigdy nie było: LCP z przebiegu A zszyte z TBT z przebiegu B i CLS
z przebiegu C.

**Dlaczego jest groźny.** Chimera nie wygląda podejrzanie. Każda liczba
z osobna jest prawdziwa; nieprawdziwe jest tylko to, że stały obok
siebie. Diagnozując czerwień, szuka się przyczyny w ładowaniu, którego
nie było.

**Jak wykryty.** Rozbiór reguł agregacji lhci przy przenoszeniu bramki
na preview (`a4a153d` — „Werdykt bramki z jednego prawdziwego przebiegu,
nie z chimery").

**Co zatrzymuje.** Werdykt zawsze na **jednym prawdziwym przebiegu**.
Krok O1 zabił chimerę; §3.6 poprawił kryterium wyboru tego przebiegu.
Świadomie odrzucono powrót do `median` przy okazji poprawki kryterium —
„powrót chimery zabitej przez O1".

**Wariant tej samej klasy, mniejszy:** adnotacja w logu, która opisywała
regułę werdyktu **z ręcznej kopii** zamiast czytać źródło (`6970a54` —
„Adnotacja kłamała o własnej regule werdyktu, już nie może"). Dwie
implementacje tej samej reguły rozjeżdżają się cicho.

### 4.5 Kalibracja z laptopa

**Jak powstała.** Wszystkie progi, projekcje i reguły wyboru
sprawdzane najpierw lokalnie, bo to szybsze. Problem w tym, że laptop
i runner GitHuba to **dwa różne komputery**, a bramka orzeka na jednym
z nich.

**Trzy udokumentowane trafienia:**

| co kalibrowano | laptop | CI | rozjazd |
|---|---|---|---|
| rozbieżność `median-run` vs mediana LCP | 1 raz na 7 tras | **5 razy na 7 tras** | ×5 |
| koszt rozszerzenia bramki wydajności | +99 s (projekcja) | **+213 s** | ×3,9 wobec projekcji autora |
| LCP na „/" (ten sam commit `4ec6576`) | 1819 ms | **1941,9 ms** | +123 ms |

**Jak wykryte.** Za każdym razem przez uruchomienie na CI po tym, jak
lokalny wynik uznano za wystarczający. Zapis w `docs/faza-4/komponenty/
handoff-etap-d.md` §12.3 jest tu wzorcowy — autor zapisał, że **własna
projekcja była błędna prawie dwukrotnie**, i nazwał przyczynę:

> „Baza projekcji musi być odczytana ze ZDALNEGO stanu."

**Co zatrzymuje.** Reguła: liczba, na której stoi bramka, pochodzi
z przebiegu bramki. Laptop służy do **rozbioru**, nie do kalibracji.
Zdanie z `bramka-na-preview.md` §4b jest tu najkrótszą wersją:
**„kalibracji tej reguły nie wolno robić na laptopie".**

Przenoszalna jest **różnica między wariantami** (np. między
transportami), nie wartość bezwzględna.

### 4.6 Artefakt vs własność

**Na czym polega.** Bramka mierzy plik, który akurat leży na dysku, a nie
stan, który miała mierzyć. Trzy odmiany, wszystkie wystąpiły:

**(a) Nieświeży serwer.** `npm run start` przemianowuje własny proces na
`next-server`, więc `pkill -f "next start"` go **nie znajduje i kończy
się kodem 0** — czyli wygląda na sukces. `playwright.config.ts` ma
`reuseExistingServer: !CI`, więc suita podłącza się do starego serwera
i **po cichu mierzy poprzedni build**. *Wykryty:* czerwienią, która nie
była regresją (§11.1 handoffu). *Zatrzymuje:* `lsof -ti:3000 | xargs kill -9`.

**(b) Skażona baza mutacji.** Harness przywracał źródła po N8, ale nie
przebudowywał — N9 poszedł na buildzie z mutacją N8 i dał 9 nadmiarowych
czerwieni. *Zatrzymuje:* przebudowa jako obowiązkowy krok procedury,
zapisany w nagłówku tabeli: „zepsuj → `npm run build` → uruchom →
przywróć".

**(c) Raport po poprzednim pomiarze.** `lhci collect` kasuje **wyłącznie**
`lhr-*.json` i `lhr-*.html` (`saved-reports.js:68–76`). Własny plik śladu
przeżywa czyszczenie, więc padnięcie skryptu werdyktu zostawiłoby tabeli
plik z **poprzedniego** przebiegu i tabela wypisałaby stary wybór jako
werdykt bieżącego. *Zatrzymuje:* `rmSync(SLAD)` jako pierwsza instrukcja
skryptu, przed jakimkolwiek liczeniem.

### 4.7 `[Request interrupted]` zabijający workflow

**Jak powstaje.** Przerwanie sesji w trakcie wieloetapowej operacji
(fan-out agentów, seria mutacji, długi pomiar) zostawia stan pośredni:
część agentów oddała wynik, część nie; część plików zmutowana, część
przywrócona. Nic tego nie sprząta automatycznie.

**Skutek udokumentowany w repo:** `8c212fe` — „formularz dorobiony po
**awarii agenta** z panelem uzupełniającym". Fan-out treści dla
`/funkcje/pozyskiwanie` stracił jeden wariant; zamiast udawać, że
komplet był pełny, uruchomiono osobny panel uzupełniający na brakujący
moduł i **zapisano to w komunikacie commita**.

**Co zatrzymuje — i czego nadal nie ma.**
Zatrzymuje: procedura mutacji z jawnym przywróceniem i weryfikacją
przywrócenia porównaniem zawartości (stosowana konsekwentnie od Z6:
„plik przywracany bajt w bajt, przywrócenie weryfikowane porównaniem
zawartości"); przy regule werdyktu poszło dalej — **zgodność
przywróconego pliku potwierdzona sumą SHA-256** (`e6ddbdf0…`).
Nie ma: mechanizmu, który wykryje przerwany fan-out. Wykrycie było
ludzkie — ktoś policzył warianty.

### 4.8 Fałszywa czerwień, czyli bramka zamknięta zanim cokolwiek zmierzyła

**Jak powstała.** Dokumentacja Vercela podaje przy nagłówku obejścia
ochrony **drugi** nagłówek (`x-vercel-set-bypass-cookie: true`). Z parą
nagłówków preview oddaje **HTTP 307** na tę samą ścieżkę (uzgodnienie
ciastka), a strażnik czyta każde przekierowanie jako „nie ta strona"
i kończy czerwienią.

| wysłane nagłówki | odpowiedź |
|---|---|
| sam nagłówek obejścia | **HTTP/2 200**, strona, `x-catherly-wydanie` obecny |
| + `x-vercel-set-bypass-cookie: true` | **HTTP 307**, `Set-Cookie: _vercel_jwt` |

**Dlaczego to anty-wzorzec, a nie zwykły bug.** Czerwień była
**prawdziwa co do statusu i fałszywa co do przyczyny**. Diagnozując ją
z logu CI, szukałoby się problemu z aliasem albo z sekretem — czyli nie
tam, gdzie był. Fałszywa przyczyna kosztuje więcej niż fałszywy alarm.

**Dlaczego drugi nagłówek nie miał tu sensu w ogóle:** `fetch`
w strażniku nie przenosi ciastek między wywołaniami, a Lighthouse startuje
z czystym profilem — uzgodnienie wypadałoby przy pierwszej nawigacji
**każdego** przebiegu, a przekierowanie **liczy się do LCP**. Mierzylibyśmy
rundę uwierzytelnienia i dopisali ją stronie: dokładnie ta klasa błędu,
którą przeniesienie na preview miało usunąć.

**Zapis autora, który jest tu sednem:**

> Ten fragment miał w `lighthouserc.cjs` status **NIESPRAWDZONE**, czyli
> wg ADR-018 liczył się jak niedziałający. **Okazał się niedziałający.**

### 4.9 Adres składany zamiast czytanego

Naiwne złożenie adresu preview z nazwy projektu i gałęzi daje etykietę
DNS o długości **65 znaków** przy maksimum 63 — adres nie odpowiada.
Alias musi być **odczytany** (zmienna `LHCI_BAZA`), nigdy komponowany.
Zweryfikowane mutacją R5: zła wartość zmiennej kończy się czerwienią
z sensownym komunikatem („adres nieosiągalny"), a nie cichym pomiarem
czegokolwiek.

### 4.10 Zimna krawędź mierzona jako strona

`lhci collect` pętli przebiegami **wewnątrz** adresu
(`@lhci/cli/src/collect/collect.js:130`): najpierw n razy `/`, potem
n razy `/funkcje`. Przebieg #1 każdej trasy trafia w zimną krawędź CDN.
Zmierzone (przebieg 31953862971):

| trasa | LCP przebiegów 1 · 2 · 3 |
|---|---|
| `/` | 2482 · 2077 · 1605 |
| `/funkcje/tresci` | 1984 · 1641 · 1140 |
| `/funkcje/zespol` | 2029 · 1892 · 972 |

Koszt zimnego wejścia zmierzony osobno (sam dokument, `fetch`): od
−243 ms (`/funkcje/pozyskiwanie`) do **−752 ms** (`/`).

**Zatrzymuje:** `scripts/rozgrzewka-preview.mjs` — krok CI między
strażnikiem a pomiarem, pobiera dokumenty **i zasoby wyłuskane z HTML-a**
(110 pobrań na 7 tras), bo LCP wisi na zasobach, nie na dokumencie.

**Koszt tej decyzji zapisany wprost:** po rozgrzewce bramka **przestaje
widzieć koszt zimnego wejścia**. To zawężenie czułości, nie ulepszenie —
i stoi w nagłówku skryptu, nie w niczyjej głowie.

**Efekt uboczny, który okazał się główną wartością:** skoro krok
i tak dotyka wszystkich siedmiu tras, sprawdza ich statusy i wydanie.
`bramka:preview` sprawdza **wyłącznie `/`** — więc do tego momentu sześć
pozostałych tras mogło oddawać 404 albo wdrożenie innej gałęzi,
a bramka zmierzyłaby to zielono.

### 4.11 Naprawa, która sumuje się z tym, co już jest

Adwersarz Etapu D zdiagnozował trafnie problem 2.4.11 (element zasłonięty
przez sticky nagłówek), ale zaproponował `scroll-padding` **obok**
istniejącego `scroll-margin`. Obie własności by się **zsumowały**:
80,2 → 160,2 px, a przykryte przystanki fokusa spadłyby z 15 do 1
i z 12 do 2 — **nie do zera**.

**Lekcja:** trafna diagnoza nie implikuje trafnej naprawy. Naprawa
weszła u korzenia jako **jedna** reguła (`html { scroll-padding-block-start:
5rem }`) z jednoczesnym zdjęciem `scroll-margin` z modułów: 8 stron × 2
viewporty, 84 kotwice, odsunięcie bez zmian, **przykryte przystanki
23 → 0**. Nowy strażnik `e2e/odsuniecie-kotwic.spec.ts` (12 przebiegów,
górna granica 96 px), mutacje M6 (11/12 czerwonych — jedyna zielona
trafiła w przypadek zgodny z bazą) i M7 (dokładnie 2 czerwone).

### 4.12 Pułapka pod przyszłego redaktora

Regex `/\*\([^)]*\)\*/g` w strażniku indeksu zdejmował **każdy** nawias
kursywą z numerowanego wiersza. Dziś nie szkodził. Ale zapisanie członu
kierunku w tej formie sprawiłoby, że strażnik przestaje go widzieć
i **zostaje zielony**.

**Klasa błędu:** kod poprawny dziś, który zamienia się w cichą awarię
przy zmianie treści przez kogoś, kto nigdy nie czytał tego regexa.
*Zatrzymuje:* zawężenie do jedynej adnotacji, która ma prawo zniknąć
(`/\s*\*\(pozycja kierunku\)\*/g`).

### 4.13 Bramka fałszywie alarmująca

Nie wystąpiła jako awaria — została **odrzucona jako projekt**. Przy
rozstrzyganiu reguły werdyktu odrzucono wariant „asercja na najgorszym
z pięciu przebiegów" z uzasadnieniem:

> Fałszywy alarm kosztuje dokładnie to, czego bramka ma pilnować:
> **czujność**. Bramka fałszywie alarmująca uczy ignorowania czerwieni.

To samo stoi za ADR-030: planowa czerwień na main musi być **widoczna
i nazwana**, nie wyciszona wyjątkiem w kodzie — bo wyciszona czerwień
zamienia się w cichą zieleń, a widoczna kosztuje czujność, którą trzeba
świadomie zapłacić.

### 4.14 Rozrzut szerszy niż zapas (poz. T10 — zamrożone świadomie)

Ostatnie znalezisko budowy i jedyne **niezamknięte**. Na przebiegu
31957994362 (7 tras × 5 przebiegów) rozrzut LCP okazał się szerszy niż
zapas do progu na **7 z 7 tras**:

| trasa | reprezentant | zapas | rozrzut |
|---|---|---|---|
| `/` | 1533 ms | +267 | 328 ms |
| `/funkcje` | 1417 ms | +383 | 683 ms |
| `/dla-kogo` | 1511 ms | +289 | 965 ms |
| `/funkcje/pozyskiwanie` | 1475 ms | +325 | 462 ms |
| `/funkcje/tresci` | 1397 ms | +403 | **1441 ms** |
| `/funkcje/zespol` | 1561 ms | +239 | 651 ms |
| `/funkcje/wyniki` | 1542 ms | +258 | 597 ms |

`benchmarkIndex` runnera tego samego dnia (2026-08-16): **2161–2415
rano, 3194–3368 wieczorem** — przy `throttlingMethod: "simulate"`
wolniejszy runner zmienia wynik symulacji.

**Wniosek zapisany w rejestrze:** „bramka wydajności jest dziś
wskaźnikiem regresu, nie gwarancją progu". Pozycja **zamrożona
świadomie** — nie naprawiona, nie przemilczana. To jest wzorzec sam
w sobie: **ograniczenie narzędzia zapisane jako pozycja rejestru jest
warte więcej niż udawanie, że go nie ma.**

---

## 5. INFRASTRUKTURA

### 5.1 CI — 14 jobów (1 build + 13 bramek)

Plik: `.github/workflows/bramki.yml`. Wyzwalacze: `pull_request`,
`push` (gałęzie faz `faza-*/**`), `workflow_dispatch`.

| # | job | co orzeka | polecenie |
|---|---|---|---|
| 0 | Build (fundament pozostałych bramek) | strona się buduje; artefakt `next-build` dla siedmiu bramek | `npm run build` |
| 1 | Kontrakt tokenów | 0 rozjazdów strona ↔ aplikacja (zakres minimalny: szew logowania, deltaE ≤ 5) | `bramka:kontrakt` |
| 2 | Linter tokenów | zero wartości wizualnych spoza `design/tokens.json` | `bramka:tokeny` |
| 3 | Parytet językowy | identyczne drzewa pl/en/de | `bramka:parytet` |
| 4 | Prawdziwość | każda liczba ↔ `facts.json` (+ warstwa treści, 16 ciągów) | `bramka:liczby` |
| 5 | Cennik | snapshot Stripe ↔ strona, tryb testowy | `bramka:cennik` |
| 6 | Linki | 0 martwych linków wewnętrznych | `bramka:linki` |
| 7 | Kotwice | 0 linków do nieistniejących kotwic | `bramka:kotwice` |
| 8 | No-JS | treść czytelna bez JavaScriptu | `bramka:nojs` |
| 9 | Dostępność | axe 0 błędów + klawiatura + nazwy linków | `playwright test e2e/{axe,klawiatura,oznaczenie-kierunku}.spec.ts` |
| 10 | E2E ścieżki zakupu | cennik → płatność → konto → aplikacja | `playwright test e2e/sciezka-zakupu.spec.ts` |
| 11 | **Pełny zestaw e2e** | każdy spec, oba projekty | `npx playwright test` |
| 12 | Wydajność | LCP < 1,8 s · CLS < 0,1 · TBT < 200 ms | 5 kroków, patrz §5.2 |
| 13 | Nieodwracalne | aktualny raport audytu dla commita (ADR-018 pkt 4) | `bramka:nieodwracalne` |

**Bramki lokalne (pre-commit, `.githooks/pre-commit`):** linter tokenów
`--staged`, linter liczb `--staged`, axe pre-commit. Hook instaluje się
sam przez `npm run prepare` (`git config core.hooksPath .githooks`).
`--no-verify` jest zakazane regułą repozytorium.

**Stan bramek w chwili sporządzenia raportu** (uruchomione, nie
przepisane):

```
bramka:tokeny     → Linter tokenów: zielony.
bramka:liczby     → zielony (warstwa kodu + 16 rozstrzygniętych ciągów, 3 języki)
bramka:parytet    → zielony (14 plików w każdym z trzech drzew)
bramka:kontrakt   → zielony w zakresie MINIMALNYM; deltaE 4.7 ≤ 5
bramka:nieodwracalne → CZERWONA (brak raportu audytu dla 3ca12a3) — PLANOWO, poz. T2
```

Bramka nieodwracalnych jest planowo czerwona do Fazy 6 i to jest zapisane
w rejestrze (T2), a nie wyciszone w kodzie.

### 5.2 Bramka wydajności — pięć kroków w jednym jobie

Kolejność ma znaczenie i każdy krok zamyka inną dziurę:

1. **Strażnik celu pomiaru** (`bramka:preview`) — czy pod adresem stoi
   strona Catherly (3 markery) i czy to **ten commit** (nagłówek
   `x-catherly-wydanie`, czekanie ≤ 420 s, próba co 10 s).
2. **Rozgrzewka** (`bramka:rozgrzewka`) — 7 tras × 2 przebiegi, dokumenty
   + zasoby (110 pobrań); przy okazji sprawdza statusy i wydanie
   wszystkich siedmiu tras, nie tylko `/`.
3. **Adnotacja** (`bramka:tryb-pomiaru`) — w jakim trybie mierzymy i jak
   czytać wynik; liczby z rejestru, nie z YAML-a.
4. **Pomiar** (`bramka:pomiar`) = `lhci collect` **+**
   `scripts/werdykt-po-lcp.mjs`. Nie `lhci autorun` — autorun robi
   collect i assert w jednym procesie, więc nie da się nic wstawić
   pomiędzy.
5. **Podsumowanie** (`bramka:podsumowanie`) — liczby **wszystkich** tras,
   nie tylko czerwonych; wybór reprezentanta **czytany** z pliku śladu.

Po czerwieni dochodzi krok szósty: „Jak czytać tę czerwień"
(`tryb-pomiaru --po-czerwieni`) i artefakt `lighthouse-raporty`
do rozbioru.

**Konfiguracja pomiaru** (`lighthouserc.cjs`): 7 adresów × **5**
przebiegów = 35 raportów; `throttlingMethod: "simulate"`;
`aggregationMethod: "pessimistic"` w trybie preview (na ścieżce bramki
bez znaczenia — jeden przebieg — ale jeśli ktoś ominie bramkę
i puści `autorun`, da werdykt **surowszy**, nigdy łagodniejszy);
progi: LCP 1800 ms, CLS 0,1, TBT 200 ms.

### 5.3 Vercel: preview, obejście ochrony, prowieniencja

**Trzy wartości, dwa miejsca** (konfiguruje właściciel):
Protection Bypass for Automation po stronie Vercela; ten sam sekret jako
sekret GitHuba; adres aliasu jako zmienna `LHCI_BAZA`.

**Rotacja jest niesymetryczna** — dodanie klucza jest łatwe, **usunięcie
starego nie**. Stan domknięty po stronie Vercela (jeden klucz), ale
z zapisaną granicą: „sekret ustawiony ≠ sekret właściwy" — bramka
sprawdza, że obejście **działa**, nie że zmienna istnieje.

**Prowieniencja:** nagłówek `x-catherly-wydanie` z `next.config.ts`.
Nagłówek odpowiedzi, nie treść — żadna bramka treści go nie widzi.

**Zasady bezpieczeństwa obowiązujące w tym repo** (nie tylko zwyczaj):

- **Nigdy nie wypisywać `Set-Cookie` z preview** — ładunek base64
  `_vercel_jwt` niesie wartość obejścia otwartym tekstem. Diagnostyka
  wyłącznie przez `curl -o /dev/null -w '%{http_code}'`; **nigdy** `-i`,
  `-D -`, `-v`.
- **Nigdy nie wypisywać mapy `protectionBypass` surowo** — sekretami są
  **klucze** tej mapy. Wyłącznie prefiksy SHA-256.
- Wartość klucza obejścia nie pojawia się nigdzie: ani w logu, ani
  w dokumentacji, ani w komunikacie commita.

**Deploye z main są wyłączone** od `3496ff4` (`vercel.json`) do czasu
publikacji; ADR-030 opisuje, co dokładnie trzeba zrobić przy Fazie 7,
żeby je włączyć.

### 5.4 i18n ×3 — zmierzony stan

| miara | wartość | metoda |
|---|---|---|
| języki | 3 (pl bez prefiksu, `/en`, `/de`) | ADR-008, `0c3e727` |
| plików komunikatów | 3 (`src/i18n/messages/{pl,en,de}.json`) | `ls` |
| przestrzeni nazw | **23** w każdym pliku | parser JSON |
| kluczy-liści | **330** w każdym pliku | parser JSON |
| węzłów razem | **364** w każdym pliku (1092 w trzech) | parser JSON |
| linii | **401** w każdym pliku | `wc -l` |
| rozmiar | pl 29 995 B · en 31 529 B · de 34 245 B | `wc -c` |
| plików treści | **14** w każdym z trzech drzew `content/` | `bramka:parytet` |
| linii treści `.md` | 4217 razem (42 pliki) | `wc -l` |

**Parytet jest bramką, nie zwyczajem:** strona bez `de` nie zbuduje się
wcale (anty-wzorzec „trzeci język dorobimy po starcie" z PLAN.md §9).

**Koszt zapisany, nie ukryty (poz. T1):** `next-intl` serializuje
**komplet** komunikatów do ładunku każdej strony. Zmierzone: HTML `/`
urósł o 276 B (34 260 → 34 536 B) po dopisaniu kluczy jednej podstrony.
Selektywne ładowanie przestrzeni per strona jest pozycją rejestru
do bloku projektowego, nie pominięciem.

### 5.5 Rejestry — trzy plus rejestr ADR

**(a) `docs/faza-2/rejestr-warunkow-powrotu.md`** (349 linii) — treści
zdjęte lub wstrzymane z powodu braku pokrycia. **34 pozycje:**

- **24 pozycje treściowe** (poz. 1–24): od „Rozliczenia" w H1 (poz. 1)
  przez trial 14 dni, 20 GB, limity AI i social, RODO/GDPR/DSGVO,
  szyfrowanie, import FL, aż po granice modułów pozyskiwania i widok
  liderki w Pierwszych 90 Dniach. Każda ma **warunek powrotu**, nie datę.
- **10 pozycji technicznych i procesowych** (T1–T10, dopisane
  2026-08-14). Stan: **T3, T5, T6 ZAMKNIĘTE**; T10 **ZAMROŻONE
  ŚWIADOMIE**; pozostałe otwarte.

Format warunku jest tu istotny: nie „wrócimy do tego w Q4", tylko
„działające rozliczenia end-to-end (Stripe aktywny)". **Warunek
sprawdzalny, nie termin.**

**(b) `docs/faza-4/rejestr-korekt-tresci.md`** (440 linii) — **17
pozycji** korekt naniesionych na treść po panelach i adwersarzach:
K-B1…K-B3 (3), K-C1…K-C5 (5), K-D1…K-D9 (9). Rejestr trzyma także
korekty **wycofane** (K-D5: „WYCOFANE W CZĘŚCI STUDIO — moja przesłanka
była błędna") i **świadome wyjątki** (K-D7: trzy napisy chrome bez panelu
językowego).

**(c) `docs/adr/README.md`** — rejestr decyzji, 30 pozycji + nota
o rozjeździe tabeli z plikami („pliki są źródłem, tabela tylko mapą").

**(d) Rejestr decyzji właściciela** rozproszony po dokumentach etapów:
DECYZJA 1–10 (Fazy 2–3) + D-B1…B4 (4) + D-C1…C5 (5) + D-D1…D21 (21)
= **40 ponumerowanych rozstrzygnięć**. Do tego rozstrzygnięcia datowane
bez numeru — 17 wystąpień w `docs/` z datą (2026-08-09 ×2, 08-11 ×1,
08-12 ×3, 08-13 ×1, 08-14 ×4, 08-15 ×3, 08-16 ×3).

**(e) Zlecenia do okna aplikacji** (`docs/faza-2/zlecenia-okno-aplikacji.md`,
195 linii + `zlecenie-Z7.md`, 169 linii) — **Z1–Z7**. Mechanizm granicy:
okno www nie czyta repo aplikacji; pisze zlecenie, okno aplikacji odsyła
raport z odwołaniami do plików i linii (`docs/faza-2/raport-zlecen-z1-z4.md`,
215 linii). Z6 (zrzuty produktu) zamknięte werdyktem właściciela
2026-08-16: **4/4 ZATWIERDZONE**.

### 5.6 Struktura repozytorium — stan końcowy

```
catherly-www/
├── CLAUDE.md                  reguły dla agentów (nadrzędne)
├── content/          42 pliki .md w pl/en/de (14×3) + 3 .json + inwentarz, tabela obietnic, karta tonu
├── design/           tokens.json (62 tokeny) + Style Dictionary + kontrakt aplikacji
├── docs/             89 dokumentów .md, 11 654 linii
│   ├── adr/          30 ADR-ów + README (rejestr)
│   ├── audyt/        README (procedura Fazy 6)
│   ├── faza-2/       briefy, 8 paneli treści, rejestr powrotów, zlecenia Z
│   ├── faza-3/       plan, 6 briefów, 4 handoffy, 3 wireframe'y, 5 adwersarzy
│   └── faza-4/       plan, architektura, 4 dokumenty bramek, handoff (1362 l.), rejestr korekt
├── e2e/              19 speców, 574 testy (2 projekty)
├── public/obrazy/    36 plików (4 filary × 9 wariantów: avif/webp ×4 szerokości + png)
├── scripts/          20 skryptów (9 bramek + 6 pomiaru + 5 narzędzi)
├── src/
│   ├── app/[locale]/ 11 stron (page.tsx)
│   ├── components/   23 komponenty + moduły CSS
│   └── i18n/messages/ pl.json · en.json · de.json
└── .github/workflows/bramki.yml   14 jobów
```

---

## 6. LICZBY KOŃCOWE

Wszystkie z wykonania w repozytorium na commicie `3ca12a3`, nie
z pamięci.

### 6.1 Produkt

| miara | wartość | metoda |
|---|---|---|
| strony (`page.tsx`) | **11** | `find src/app -name page.tsx` |
| adresy publiczne w mapie stopki | **8** | `MAPA_STOPKI` |
| języki | **3** | ADR-008 |
| komponenty | **23** (+ moduły CSS) | `ls src/components/*.tsx` |
| tokeny wizualne | **62** | parser `design/tokens.json` |
| pliki treści `.md` | **42** (14 × 3 języki) | `find content -name '*.md'` |
| klucze i18n na język | **330** liści / 364 węzły / 23 przestrzenie | parser JSON |
| fakty w `facts.json` | **34** liście | parser JSON |
| zasoby graficzne | **36** plików (4 filary × 9 wariantów) | `find public -type f` |
| pozycje inwentarza funkcji | **105** (38 DZIAŁA + 56 częściowych + 11 szkieletów) | `content/inwentarz-funkcji.md` |
| obietnice na podstronach funkcji | **31** w trybie dokonanym | `f19149b` |

### 6.2 Testy i bramki

| miara | wartość | metoda |
|---|---|---|
| pliki specyfikacji e2e | **19** | `ls e2e/*.spec.ts` |
| deklaracje `test(` | **108** | `grep -c` |
| **testy uruchamiane** | **574** (2 projekty: `mobile-390` 390×844, `desktop`) | `playwright test --list` |
| joby CI | **14** (1 build + 13 bramek) | `bramki.yml` |
| bramki lokalne (pre-commit) | **3** | `.githooks/pre-commit` |
| skrypty bramek i pomiaru | **20** | `ls scripts/` |
| adresy w bramce wydajności | **7** | `lighthouserc.cjs` |
| przebiegi na adres | **5** (35 raportów LHR na pomiar) | `lighthouserc.cjs` |

### 6.3 Dowody mutacyjne

Wiersze w tabelach mutacji i protokołach adwersarzy, zliczone per
dokument:

| dokument | wierszy |
|---|---|
| `faza-3/adwersarz-etap-b.md` (opisowe, bez tabeli) | 2 |
| `faza-3/adwersarz-etap-c.md` | 4 |
| `faza-3/adwersarz-etap-d.md` | 5 |
| `faza-3/adwersarz-etap-e.md` | 5 |
| `faza-3/adwersarz-etap-f.md` | 4 |
| `faza-4/adwersarz-etap-b.md` | 5 |
| `handoff-etap-d.md` §9 (M0–M2) | 3 |
| `handoff-etap-d.md` §11 (M3, M3b, M4*, M5) | 4 |
| `handoff-etap-d.md` §12.1 (M6–M7) | 2 |
| `handoff-etap-d.md` §12.2 (M8–M9) | 2 |
| `handoff-etap-d.md` §12.4 (M0–M7 + M2b) | 9 |
| `handoff-etap-d.md` §12.5 (N0, N8, N9, N0′) | 4 |
| `handoff-etap-d.md` §12.5 F8 (N10–N12) | 3 |
| `bramka-na-preview.md` §4 lokalne (P0–P7) | 8 |
| `bramka-na-preview.md` §4 realny preview (R1–R6) | 6 |
| `bramka-na-preview.md` §4a rozgrzewka (W0–W4) | 5 |
| `bramka-na-preview.md` §4b werdykt (R0–R1) | 2 |
| `z6-odbior-i-osadzenie.md` §7 (M1, M3–M7, N1–N4) | 10 |
| `bramka-liczby-warstwa-tresci.md` §5 (M0–M10) | 11 |
| **RAZEM** | **94** |

Z tego **8 to przebiegi kontrolne** (stan zdrowy: M0 ×3, N0, N0′, P0,
W0, R0) — czyli **86 celowych uszkodzeń**. Wśród nich dwa są kontrolami
negatywnymi (miały zostać zielone i zostały: `bramka-liczby` M3,
`faza-3/E` mutacja b) oraz jeden pomiar, nie mutacja (`handoff` §11 M4,
oznaczony gwiazdką).

`grep -ric 'mutac' docs/` daje 89 wystąpień w 18 dokumentach.

### 6.4 Decyzje i rejestry

| miara | wartość |
|---|---|
| ADR-y | **30** (29 PRZYJĘTYCH/OBOWIĄZUJĄCYCH + 1 SZKIC: ADR-021) |
| ADR-y doprecyzowane wewnętrznie | **1** — ADR-014, cztery datowane doprecyzowania (08-14, 08-15 I/II/III), z czego jedno uchylone |
| ADR-y domknięte lub zawężone przez późniejszy | **4** — 004→022 (zawężenie), 026→027 (domknięcie), 028→029 (wyjątek), 020→030 (uzupełnienie) |
| ponumerowane decyzje właściciela | **40** (DECYZJA 1–10, D-B ×4, D-C ×5, D-D ×21) |
| datowane rozstrzygnięcia bez numeru | 17 wystąpień w `docs/` |
| pozycje rejestru warunków powrotu | **34** (24 treściowe + 10 technicznych) — 3 zamknięte, 1 zamrożona |
| pozycje rejestru korekt treści | **17** (K-B ×3, K-C ×5, K-D ×9) |
| zlecenia do okna aplikacji | **7** (Z1–Z7) |
| protokoły adwersarzy | **6** (5 × Faza 3, 1 × Faza 4) |
| panele treści | **8** (Faza 2) + panele Fazy 3 i 4 w dokumentach etapów |

### 6.5 Repozytorium

| miara | wartość |
|---|---|
| commity | **139** (Faza 0: 7 · 1: 13 · 2: 15 · 3: 51 · 4: 53) |
| commity na `main` | **1** |
| gałęzie | 5 gałęzi faz + `main`, wszystkie z odpowiednikiem w `origin` |
| dokumenty `docs/*.md` | **89**, **11 654 linii** |
| największy dokument | `faza-4/komponenty/handoff-etap-d.md` — **1362 linie** |
| rozpiętość kalendarzowa | 9 dni (8 z commitami) |

---

## 7. CO ZROBIĆ INACZEJ PRZY NASTĘPNEJ STRONIE

Lista szczera. Podzielona na trzy części: **co wziąć gotowe**, **co było
drogą okrężną**, **jaką kolejność zmienić**.

### 7.1 Co można wziąć gotowe (dzień 1, bez adaptacji)

| element | plik(i) | uwaga |
|---|---|---|
| Reguły dla agentów | `CLAUDE.md` | zmienić wyłącznie nazwy własne i progi; struktura zakazów przenośna 1:1 |
| ADR-018 | `docs/adr/018-*.md` | fundament wszystkiego innego; **przenieść pierwszym ruchem** |
| ADR-020 + 030 | `docs/adr/{020,030}-*.md` | main zawsze zielony + kiedy main dostaje deploy |
| Bramka parytetu | `scripts/check-parytet.mjs` | działa na dowolnym drzewie `content/` |
| Bramka liczb | `scripts/lint-liczby.mjs` + `content/liczby-w-tresci.json` | dwa przebiegi (kod + treść) — patrz §7.2, pkt 3 |
| Bramka tokenów | `scripts/lint-tokeny.mjs` | wymaga `design/tokens.json` w tym samym formacie |
| Bramka linków i kotwic | `scripts/check-{linki,kotwice}.mjs` | z inwersją zależności (rejestr z mapy) |
| Bramka no-JS | `scripts/check-nojs.mjs` | **plus** funkcja `bezSkryptow()` — bez niej mierzy ładunek RSC |
| Cały aparat pomiaru | `scripts/{sprawdz-preview,rozgrzewka-preview,tryb-pomiaru,reprezentant,werdykt-po-lcp,podsumowanie-pomiaru}.mjs` | **największa pojedyncza oszczędność** — 18 commitów pracy |
| Prowieniencja | `next.config.ts` (nagłówek wydania) | 6 linii, zamyka całą klasę „zmierzone nie to" |
| Pipeline 4.1 + DoD 4.2 | `docs/PLAN.md` §4 | struktura, nie treść |
| Wzorzec modułu K12 | `docs/faza-4/komponenty/brief-k12-*.md` | trzeci slot „CZEGO NIE ROBI" — przenośny na dowolny produkt |
| Format rejestru warunków powrotu | `docs/faza-2/rejestr-warunkow-powrotu.md` | **warunek sprawdzalny, nie termin** |
| Hook pre-commit | `.githooks/pre-commit` + `npm run prepare` | |
| `backup.sh` | `scripts/backup.sh` | z wykluczeniem `.env` i `.vercel/` od pierwszej wersji |

**Jedna rzecz do wzięcia, której nie ma w plikach:** zasada, że **bramki
powstają w Fazie 0, czerwone**. Bramka dopisana później zawsze zastaje
kod, który trzeba do niej dociągać; bramka istniejąca od początku
kształtuje kod.

### 7.2 Co było drogą okrężną

**1. Bramka wydajności mierzyła nie to, przez 6 dni.**
Do `4ec6576` (dzień 8) bramka mierzyła **build lokalny na runnerze**:
HTTP/1.1, gzip, zimny start, bez CDN. Wszystkie decyzje wydajnościowe
podjęte wcześniej opierały się na liczbach z tego środowiska. Rozbiór
(`d55bbef`) pokazał, że **795 ms z 1703 ms LCP to baseline
Next 15.5.23 + React 19.2.8** (dwa chunki, zero kodu aplikacji), a 758 ms
to podłoga protokołu — czyli w tamtym środowisku nie było czego ciąć.

*Następnym razem:* **pomiar wydajności na preview od pierwszego dnia,
albo żadnego progu wydajności.** Bramka mierząca środowisko, a nie
stronę, jest gorsza niż jej brak, bo wywołuje prace optymalizacyjne
w miejscach, które nic nie kosztują.

**2. Trzynaście speców nie biegało na CI przez cztery dni.**
Od `717fdb0` (Etap B) do `8479e6d`. Cały dorobek strażników treści
Etapów B–D miał na CI status niesprawdzonego.

*Następnym razem:* **bramka na kompletność bramek** — porównanie zbioru
plików `e2e/*.spec.ts` ze zbiorem plików faktycznie uruchamianych
w workflow, czerwona przy różnicy. Trzydzieści linii kodu, zamyka dziurę,
którą tu wykryto przypadkiem.

**3. `bramka:liczby` nie widziała warstwy `messages` (poz. T6).**
Bramka prawdziwości skanowała `.tsx`/`.ts`, a treść mieszka
w `messages/*.json`. Liczby w widocznych napisach nie były pokryte przez
większość budowy. Naprawione `34710c7` — inwentarz wyszedł na **16
ciągów, nie 14**.

*Następnym razem:* przy projektowaniu bramki wypisać **explicite**, jakie
rozszerzenia i katalogi skanuje, i zderzyć tę listę z listą miejsc, gdzie
faktycznie mieszka to, czego bramka pilnuje.

**4. Osiem recept podkreślenia i wiele recept odsunięcia.**
Rozjazd narastał komponent po komponencie i został zauważony dopiero
przy audycie dostępności Etapu D. Naprawa u korzenia dotknęła 224 linków
i 84 kotwic naraz.

*Następnym razem:* recepty **globalne od pierwszego komponentu** —
podkreślenia, fokus, odsunięcie od sticky, rytm pionowy. Moduł CSS
komponentu opisuje układ komponentu, nie zachowanie linku.

**5. `facts.json` był niepoprawnym JSON-em przez dwa dni.**
Źródło prawdy dla wszystkich liczb nie parsowało się i nikt tego nie
wiedział, bo żadna bramka go nie parsowała.

*Następnym razem:* **każdy plik-źródło prawdy dostaje bramkę
walidacyjną w tym samym commicie, w którym powstaje.** Bez wyjątku dla
„to tylko JSON z danymi".

**6. Trzy komplety werdyktów na `/pomoc`, która wypadła z zakresu.**
Strona przeszła pełny pipeline trzy razy (brief → panele → decyzja →
odwołanie decyzji → ponowny panel) i ostatecznie została wycofana.

*Następnym razem:* nie ma tu prostej rady i **nie należy udawać, że
jest**. Właściciel zapisał to sam: „Trzy rundy paneli = system zadziałał,
nie zawiódł". Jedyne, co da się usprawnić, to **kryterium wejścia
strony do pipeline'u**: czy istnieje treść, której ta strona ma być
nośnikiem? Dla `/pomoc` odpowiedź brzmiała „nie" i była do ustalenia
przed pierwszym briefem, nie po trzecim panelu.

**7. Osiem doprecyzowań zakresu w ADR-014.**
Cztery datowane doprecyzowania plus zmiany statusu podstron. Zakres
„zamrożony" rozmroził się cztery razy.

*Następnym razem:* zakres zamrożony powinien zawierać **jawną listę
adresów** od pierwszego dnia, a nie listę tematów. Dwa z czterech
doprecyzowań były „luką formalną, nie sporem o zakres" — czyli strony
istniały, ale nie były wymienione.

### 7.3 Kolejność, którą warto zmienić

Kolejność zrealizowana (po korekcie ADR-024):

```
0 Konstytucja → 1 Tokeny → 2 Treść → 3 Komponenty (proj.+impl.) → 4 Podstrony
                                                                   └─ + naprawa pomiaru (34% fazy)
```

Kolejność proponowana na następną stronę:

```
0  Konstytucja (ADR-018, 020, CLAUDE.md, backup, hooki)
0b APARAT POMIARU: preview + prowieniencja + rozgrzewka + reguła werdyktu
   ← przeniesione z końca; bez tego progi wydajności są życzeniem
0c BRAMKA NA KOMPLETNOŚĆ BRAMEK  ← nowe, 30 linii
1  Tokeny + kontrakt (zakres minimalny od razu, nie po fakcie)
   + recepty globalne: podkreślenia, fokus, odsunięcie, rytm  ← przeniesione z Fazy 4
2  Treść: inwentarz → tabela obietnic → panele → rejestr warunków powrotu
   ← rejestr zakładany RAZEM z treścią, nie po pierwszym zdjęciu
2b LISTA ADRESÓW w ADR zakresu  ← jawna, nie tematyczna
3+4 Komponenty per element (ADR-024 od razu, bez rozdzielania faz)
5  Spięcie z aplikacją
6  Audyt (5 soczewek + adwersarz)
7  Publikacja
```

**Cztery zmiany, każda z uzasadnieniem z tej budowy:**

1. **Aparat pomiaru na początek (0b).** Kosztował 18 commitów w Fazie 4
   i unieważnił część wcześniejszych decyzji wydajnościowych. Przeniesiony
   na początek kosztuje tyle samo, ale **nie unieważnia niczego**.

2. **Bramka na kompletność bramek (0c).** Jedyna dziura tej budowy, którą
   właściciel nazwał „klasą security-scan". Trzydzieści linii.

3. **Recepty globalne przy tokenach (1).** Osiem recept podkreślenia
   powstało dlatego, że pierwszy komponent nie miał do czego się odwołać.

4. **Rejestr warunków powrotu zakładany razem z treścią (2).** Poz. 1
   („Rozliczenia" w H1) powstała dopiero po decyzji o zdjęciu słowa.
   Gdyby rejestr istniał, gdy panel oceniał warianty, kryterium K1
   (obietnica bez pokrycia = dyskwalifikacja) miałoby gotową listę do
   sprawdzenia zamiast wymagać osobnego zlecenia Z1.

### 7.4 Trzy rzeczy, których nie zmieniać

Bo działały i były tanie:

1. **Prawo 2 realizowane strukturalnie.** Agent piszący nigdy nie ocenia
   własnej pracy; ocenia osobny agent bez dostępu do uzasadnień autora.
   Sześć protokołów adwersarzy, wszystkie z ustaleniami, których autor
   nie widział.

2. **Dowód mutacyjny jako warunek przyjęcia strażnika.** 86 celowych
   uszkodzeń. Co najmniej trzy razy przewidywanie autora rozminęło się
   z wynikiem — i za każdym razem to była informacja o systemie, nie
   pomyłka do przemilczenia.

3. **Zapisywanie ograniczeń zamiast ich ukrywania.** „Rozgrzewka
   zawęża czułość" w nagłówku skryptu. „Bramka jest dziś wskaźnikiem
   regresu, nie gwarancją progu" w rejestrze. „Detekcja zmian aplikacji:
   BRAK" w komunikacie bramki przy każdym przebiegu. Ograniczenie
   zapisane jest zarządzalne; ograniczenie przemilczane wraca jako
   niespodzianka.

---

## 8. PERSPEKTYWA WARSTWY DOWODZENIA

*(sekcja do napisania przez właściciela — zostawiona pusta zgodnie
ze zleceniem z 2026-08-16)*

---

## Metryka dokumentu

| | |
|---|---|
| Sporządzony | 2026-08-16 |
| Commit odniesienia | `3ca12a3` (gałąź `faza-4/podstrony`) |
| Źródła | `docs/` (89 dokumentów), `docs/adr/` (30 ADR-ów), rejestry, `git log`, wykonanie bramek |
| Metoda | każde twierdzenie z pliku albo z wykonania polecenia; rozbieżności ze zleceniem nazwane w §0.2 |
| Czego nie zawiera | oceny produktu (Prawo 2), sekretów w żadnej postaci, sekcji 8 |
