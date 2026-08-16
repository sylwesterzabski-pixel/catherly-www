# Przeniesienie bramki wydajności na preview Vercela

Stan: **repo gotowe, czeka na dwa kliknięcia właściciela.**
Data: 2026-08-16. Gałąź: `faza-4/podstrony`.

Dokument opisuje jedną rzecz: co się stanie, gdy właściciel ustawi
trzy wartości w ustawieniach, i dlaczego nic poza tymi wartościami nie
trzeba już ruszać w kodzie.

---

## 1. Po co to w ogóle

Rozbiór render delay (`docs/faza-4/render-delay-glowna.md`) pokazał, że
strona główna maluje się **realnie w 88–97 ms**, a 1703 ms z bramki to
liczba wyłącznie symulowana. Największy jej składnik to koszt
**transportu, na którym mierzy bramka**: HTTP/1.1 + gzip na
localhoście, gdzie każdy zasób to osobna runda na jednym połączeniu.
Ten sam kod, ten sam build, inny transport:

| transport | `/` bez Z6 | `/` z Z6 | koszt Z6 | zapas do 1800 ms |
| --- | --- | --- | --- | --- |
| HTTP/1.1 + gzip (bramka dziś) | 1703 ms | 1856 ms ⛔ | +153 ms | −56 ms |
| HTTP/2 + gzip | 1426 ms | 1427 ms | +1 ms | 373 ms |
| HTTP/2 + brotli (Vercel) | **1276 ms** | **1276 ms** ✅ | **+0 ms** | **524 ms** |

Werdykt właściciela z 2026-08-16: **strona zdrowa, termometr zły**.
Warunkiem włączenia zrzutów Z6 na „/" przestała być mediana LCP,
a stała się jakość pomiaru — zapis w rejestrze
`design/pipeline-obrazow.json` → `osadzenieNaGlownej.warunekWlaczenia`.

---

## 2. Co robi właściciel — trzy wartości, dwa miejsca

### (a) Vercel: Protection Bypass for Automation

`Vercel → Project catherly-www → Settings → Deployment Protection →
Protection Bypass for Automation` → **Add Secret**. Skopiuj wygenerowaną
wartość.

Alternatywa: całkiem wyłączyć ochronę dla Preview. Wtedy sekret nie jest
potrzebny, ale preview staje się publiczny — decyzja właściciela.

### (b) GitHub: sekret

`GitHub → catherly-www → Settings → Secrets and variables → Actions →
Secrets → New repository secret`

- nazwa: `VERCEL_AUTOMATION_BYPASS_SECRET`
- wartość: to, co skopiowane w kroku (a)

### (c) GitHub: zmienna z adresem

`… → Variables → New repository variable`

- nazwa: `LHCI_BAZA`
- wartość: **alias gałęzi**, czyli adres, który Vercel utrzymuje zawsze
  na najnowszym wdrożeniu tej gałęzi — postać
  `https://catherly-www-git-<gałąź-z-myślnikami>-<zespół>.vercel.app`.
  Dla `faza-4/podstrony` człon gałęzi to `faza-4-podstrony`. Dokładny
  adres jest w panelu Vercela przy wdrożeniu, w polu **Domains**.

Bez końcowego ukośnika. Ścieżki (`/`, `/funkcje`, `/dla-kogo`, cztery
podstrony filarowe) doklei sobie `lighthouserc.cjs` — lista jest w jednym
miejscu i nie dubluje się w workflow.

> **Adres jest wiązany z gałęzią.** Przy zmianie gałęzi fazy trzeba
> zmienić też `LHCI_BAZA`. Jeśli się o tym zapomni, bramka **nie**
> zmierzy cudzego wdrożenia po cichu — strażnik porówna commity
> i zapali czerwień z komunikatem, który gałąź pokazuje adres
> (sekcja 4). Świadomie nie ma tu automatycznego składania adresu
> z nazwy gałęzi: reguł skracania aliasów przez Vercela nie da się
> sprawdzić bez realnego wdrożenia, a niesprawdzony automat w bramce
> to dokładnie ten rodzaj sprytu, który ADR-018 liczy jak niedziałający.

---

## 3. Co się przełączy samo

Nic więcej nie trzeba zmieniać w repo — cała reszta jest już wpięta
i czyta te dwie wartości.

| element | zachowanie przy pustym `LHCI_BAZA` | po ustawieniu |
| --- | --- | --- |
| `lighthouserc.cjs` → cel | `http://localhost:3000` + `npm run start` | adres z `LHCI_BAZA`, bez uruchamiania serwera |
| `lighthouserc.cjs` → werdykt | `optimistic` (najlepszy przebieg) | **`median`** z 3 przebiegów |
| `lighthouserc.cjs` → nagłówki | brak | `x-vercel-protection-bypass` z sekretu |
| workflow → strażnik celu | krok pomijany | `npm run bramka:preview` **musi** przejść |
| workflow → adnotacja | „tryb lokalny, czerwień termometru" | „tryb preview, czytaj wynik dosłownie" |
| próg LCP | 1800 ms | 1800 ms (bez zmian) |

Zrzuty Z6 na „/" są **już włączone** w rejestrze
(`osadzenieNaGlownej.wlaczone: true`), więc po ustawieniu zmiennych nie
ma trzeciego kliknięcia: pierwszy przebieg bramki po zmianie mierzy już
stronę ze zrzutami, na właściwym transporcie.

---

## 4. Czego pilnuje strażnik celu pomiaru

`scripts/sprawdz-preview.mjs`, uruchamiany **przed** pomiarem i tylko
w trybie preview. Zamyka dwie różne dziury, obie tej samej klasy —
„zielono, bo nic nie zmierzone".

**(1) Czy to jest strona Catherly.** Preview za ochroną oddaje ekran
logowania Vercela: status **200** i słowo „Catherly" **dwa razy** w
treści (adres siedzi w parametrze `next=`). Lighthouse zmierzyłby ten
ekran i oddał świetne wyniki. Dlatego sprawdzamy brak przekierowania
(`redirect: manual`) plus trzy markery, których logowanie wyprodukować
nie może: `<html lang="pl"`, `id="hero-h1"` i dosłowny nagłówek H1
czytany z `src/i18n/messages/pl.json`.

**(2) Czy to jest TEN commit.** Adres w `LHCI_BAZA` jest stały,
wdrożenie pod nim — nie. Bramka rusza przy pushu równolegle z buildem
Vercela, więc zastaje wdrożenie poprzedniego commita; alias może też
wskazywać inną gałąź. Pomiar byłby prawdziwy, tylko cudzy. Markery tego
nie wyłapią — obie wersje wyglądają identycznie.

Rozstrzyga nagłówek `x-catherly-wydanie`, w którym samo wdrożenie podaje
swój commit (`next.config.ts`; wartość z `VERCEL_GIT_COMMIT_SHA`, na
runnerze `GITHUB_SHA`, lokalnie `lokalne`). Strażnik porównuje go z sha
gałęzi z workflow i **czeka**, aż deploy dogoni commita — do 420 s,
próba co 10 s. Rozjazd tuż po pushu jest normalny; dopiero po upływie
okna jest czerwień.

Nagłówek odpowiedzi, nie treść — nie dotyka HTML-a, więc żadna bramka
treści go nie widzi.

### Dowody mutacyjne (2026-08-16)

Zielony strażnik nie jest dowodem, że cokolwiek mierzy (ADR-018).
Dowodem jest czerwień po celowym zepsuciu. Stanowisko: proxy na `:3300`
przed lokalnym buildem, każdy tryb osobno.

| # | mutacja | wynik |
| --- | --- | --- |
| P0 | stan zdrowy: pod adresem ten commit | ✅ exit 0, `3/3 markerów`, wydanie = commit CI |
| P1 | pod adresem **obce wydanie** (inny sha) | ⛔ exit 1 — „cel pomiaru nie ustalił się", 3 próby wypisane, w podsumowaniu obce wydanie |
| P2 | wdrożenie **bez** nagłówka `x-catherly-wydanie` | ⛔ exit 1 — „wdrożenie nie podaje, z jakiego commita pochodzi" |
| P3 | ściana logowania Vercela (307 → `vercel.com/sso-api`) | ⛔ exit 1 — instrukcja odblokowania (regresja starego zachowania) |
| P4 | deploy w toku: 503 ×2, potem właściwe wydanie | ✅ exit 0 po dwóch próbach — czekanie działa, a nie tylko wygląda |
| P5 | brak `OCZEKIWANY_COMMIT`, bez `--reczny` | ⛔ exit 1 — „nie wiadomo, który commit ma być zmierzony" |
| P6 | `--reczny` (diagnostyka z laptopa) | ✅ exit 0 z wyraźnym „prowieniencja NIE sprawdzana — to nie dowód" |
| P7 | adres w ogóle nie odpowiada | ⛔ exit 1, a komunikat nazywa **faktyczną** przyczynę („adres nieosiągalny"), nie domyślną |

---

## 5. Czerwień do czasu przełączenia — czyja

Dopóki `LHCI_BAZA` jest puste, bramka mierzy przez HTTP/1.1 + gzip,
a zrzuty Z6 są na „/" włączone. LCP na „/" **przekroczy próg**. To jest
stan oczekiwany i przewidziany przez właściciela 2026-08-16:

> Bramka LCP na CI może świecić czerwono na „/" do czasu przeniesienia
> pomiaru — to czerwień **termometru**, nie strony.

### Zmierzone na CI (nie tylko przewidziane)

| przebieg | commit | zrzuty na „/" | co padło | wynik |
| --- | --- | --- | --- | --- |
| 31940798372 | `6a2c7bb` | **wyłączone** | `/funkcje/pozyskiwanie` | **1800,08 ms** przy progu 1800 |
| 31941921317 | `4ec6576` | włączone | `/` | 1941,9 ms (przebiegi 2070,02 / 1941,95 / 1950,87) |

Pierwszy wiersz jest ważniejszy od drugiego. Bramka padła tam na trasie,
która **ze zrzutami Z6 nie ma nic wspólnego**, i to o 0,08 ms — czyli
w trybie lokalnym na runnerze GitHuba cały pomiar leży na kresce
**niezależnie od Z6**. Ten sam commit `4ec6576` na laptopie dał na „/"
1819 ms, na runnerze 1941,9 ms: runner jest wolniejszy, więc liczby
w tabeli transportów (z rozbioru na laptopie) są niższe niż to, co widać
w logu CI. Przenoszalna jest **różnica między transportami**, nie
wartość bezwzględna — i ta różnica jest większa niż całe przekroczenie.

Żeby nikt nie zaczął ciąć strony pod złe narzędzie, adnotacja z liczbami
leci do logu CI przy **każdym** przebiegu bramki
(`scripts/tryb-pomiaru.mjs`, kroki „Tryb pomiaru i jak czytać wynik"
oraz „Jak czytać tę czerwień"), a liczby bierze z rejestru, nie z YAML-a.

Czego robić **nie wolno** w reakcji na tę czerwień:

- odchudzać strony pod pomiar na HTTP/1.1 — 795 ms z 1703 ms to baseline
  Next 15.5.23 + React 19.2.8 (dwa chunki, zero kodu aplikacji), a 758 ms
  to podłoga protokołu; nie ma tam czego ciąć bez zmiany frameworka;
- podnosić progu 1800 ms — „środowisko pomiaru ma być stabilniejsze, nie
  próg niższy" (zlecenie z 2026-08-14);
- wyłączać Z6 z powrotem „żeby było zielono" — wyłączenie jest jedną
  wartością w rejestrze i zawsze możliwe, ale jako decyzja właściciela,
  nie jako ucieczka przed czerwienią.

Bezpiecznik na tym stanie to ADR-020: **żaden merge do main nie
przechodzi przy czerwonej bramce**. Włączone Z6 nie może więc trafić na
main na kredyt — dowodem będzie zielony pomiar na preview, a nie
deklaracja w rejestrze.

---

## 6. Jak sprawdzić, że zadziałało

Po ustawieniu obu wartości: `Actions → bramki → Re-run all jobs` na
ostatnim przebiegu gałęzi (albo dowolny push). W jobie
**„Bramka: Wydajność"** mają się pojawić po kolei:

1. `Cel pomiaru: https://catherly-www-git-…vercel.app`
2. `Obejście ochrony preview: sekret obecny`
3. `✔ Cel pomiaru potwierdzony: HTTP 200, … 3/3 markerów obecnych.`
   oraz `Wydanie pod adresem = commit CI: <sha>`
4. nagłówek `BRAMKA WYDAJNOŚCI — TRYB PREVIEW (transport produkcyjny)`
5. zielony `lhci autorun`, w tym `/` ze zrzutami Z6

Jeśli krok 3 zapali się na czerwono, komunikat mówi wprost, która
z czterech przyczyn zaszła i co z nią zrobić. Bramka nie zmierzy
zastanego wdrożenia „bo jakieś jest".

---

## 7. `main` — rozstrzygnięte: wdrożenie produkcyjne przy Fazie 7

Mechanizm z sekcji 4 działa dla gałęzi fazowych i dla PR-ów, bo Vercel
wdraża ich głowę. Dla **`main` nie zadziała**, i to nie jest przeoczenie
tylko skutek świadomej wcześniejszej decyzji: `vercel.json` ustawia
`git.deploymentEnabled.main = false` („wyłączenie automatycznych deployów
z main do czasu publikacji"). Skoro `main` nie ma wdrożenia, nie ma czego
mierzyć na transporcie produkcyjnym.

**Rozstrzygnięcie właściciela z 2026-08-16** — pełny zapis w
[ADR-030](../adr/030-wdrozenie-produkcyjne-main-przy-fazie-7.md):

> `main` dostaje własne wdrożenie produkcyjne na Vercelu,
> `deploymentEnabled.main = true` **przy Fazie 7** — merge Fazy 7 to
> premiera, a wdrożenie produkcyjne i tak wtedy musi istnieć. Do tego
> czasu czerwień środowiskowa na `main` jest **przyjęta świadomie**
> i odnotowana. **Zero wyjątków w bramce.**

Podstawa: `main` nie przyjmuje commitów poza merge'ami faz, więc
przebiegów na `main` jest tyle, ile merge'ów — czerwień nie zaszumia
codziennej pracy, bo ta dzieje się na gałęziach fazowych.

### Kiedy dokładnie ta czerwień się pojawia

| gałąź | po ustawieniu `LHCI_BAZA`, do Fazy 7 |
| --- | --- |
| `faza-*/**`, PR | preview istnieje → strażnik zielony → pomiar na HTTP/2 + brotli |
| `main` | wdrożenia dla `main` brak → strażnik czerwony po 420 s |

Okno tej czerwieni otwiera **pierwszy merge do `main` po ustawieniu
`LHCI_BAZA`** (dopóki zmienna jest pusta, bramka na `main` mierzy
lokalnie i zachowuje się jak dziś), a zamyka **merge Fazy 7**.

Samego merge'a to nie blokuje: ADR-020 pilnuje bramek na PR, a te są
mierzone na preview gałęzi. Czerwień pojawia się **za** bramką, już po
merge'u — nie jest więc merge'em „przez uzasadnioną czerwień" i nie
tworzy precedensu, przed którym ADR-020 powstał.

### Jak ją rozpoznać (bo planowa czerwień kosztuje czujność)

- pada **strażnik celu pomiaru**, nie asercja Lighthouse: w logu jest
  `✖ CEL POMIARU NIEPOTWIERDZONY`, a **żadnej liczby LCP nie ma**, bo
  `lhci` w ogóle się nie uruchamia;
- komunikat mówi, co zastał: `pod adresem stoi wydanie <sha gałęzi>`
  (gdy `LHCI_BAZA` wskazuje alias gałęzi fazowej) albo `adres
  nieosiągalny`, i wskazuje przyczynę (b) lub (c).

Każda inna czerwień w tym jobie — a zwłaszcza taka **z liczbą LCP** —
nie jest tą czerwienią i wymaga rozbioru.

### Co trzeba zrobić przy Fazie 7

1. `vercel.json`: `git.deploymentEnabled.main` → `true` (albo usunąć blok
   — domyślnie deploye są włączone).
2. `LHCI_BAZA` → alias produkcyjny. Dziś to **jedna** zmienna
   repozytorium na **jeden** adres, a od Fazy 7 `main` ma mierzyć
   produkcję, gałęzie fazowe swoje preview — trzeba to rozdzielić
   (środowiska GitHuba albo wyrażenie per gałąź w workflow). Wybór
   należy do Fazy 7.
3. Zdjąć adnotacje o planowej czerwieni: tę sekcję i przyczynę (c)
   w `scripts/sprawdz-preview.mjs`.

### Czego nie zrobiono i dlaczego

**Nie** dodano wyjątku, który na `main` pomija strażnika albo po cichu
wraca do pomiaru lokalnego — i nie doda się go także po ustawieniu
`LHCI_BAZA`. Bramka pomijająca samą siebie na najważniejszej gałęzi to
dokładnie ta klasa dziury, którą cały ten dokument zamyka. Cena tego
rozstrzygnięcia jest zapłacona w widoczności czerwieni, nie w kodzie
bramki.
