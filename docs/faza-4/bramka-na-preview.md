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

## 7. Czego to NIE rozwiązuje: `main` (decyzja właściciela, otwarta)

Mechanizm z sekcji 4 działa dla gałęzi fazowych i dla PR-ów, bo Vercel
wdraża ich głowę. Dla **`main` nie zadziała**, i to nie jest przeoczenie
tylko skutek świadomej wcześniejszej decyzji: `vercel.json` ustawia
`git.deploymentEnabled.main = false` („wyłączenie automatycznych deployów
z main do czasu publikacji"). Skoro `main` nie ma wdrożenia, nie ma czego
mierzyć na transporcie produkcyjnym.

Po ustawieniu `LHCI_BAZA` konsekwencja jest taka:

| gałąź | co się stanie |
| --- | --- |
| `faza-*/**`, PR | preview istnieje → strażnik zielony → pomiar na HTTP/2 + brotli |
| `main` | brak wdrożenia → strażnik czerwony po 420 s, z komunikatem (c) |

Sam **merge** to nie blokuje: ADR-020 pilnuje bramek na PR, a te będą
mierzone na preview. Blokuje natomiast utrzymanie zasady „main zawsze
zielony" po merge'u — CI na `main` świeciłoby czerwono z powodu
środowiskowego.

Rozstrzygnięcie należy do właściciela; do tego czasu stan jest
odnotowany, a nie ukryty. Trzy drogi, bez rekomendacji technicznej, bo
wybór jest produktowy:

1. **Włączyć deploye z `main`** (zdjąć `deploymentEnabled.main = false`)
   i wskazać `LHCI_BAZA` na alias produkcyjny. Wymaga zgody na to, żeby
   `main` faktycznie się wdrażał — czyli decyzji o publikacji.
2. **Zostawić `main` bez wdrożenia** i przyjąć, że bramka wydajności na
   `main` jest planowaną czerwienią do czasu publikacji — precedens
   w repo istnieje (`Bramka: Nieodwracalne` jest planową czerwienią do
   Fazy 6), ale każda planowa czerwień kosztuje czujność.
3. **Wyłączyć Z6 na „/" przy merge'u do `main`** — jedna wartość
   w rejestrze. Tanie, ale znaczy publikować stronę bez zrzutów, więc
   to decyzja produktowa, nie techniczna.

Czego nie zrobiono i dlaczego: **nie** dodano wyjątku, który na `main`
po cichu wraca do pomiaru lokalnego. Bramka pomijająca sama siebie na
najważniejszej gałęzi to dokładnie ta klasa dziury, którą cały ten
dokument zamyka.
