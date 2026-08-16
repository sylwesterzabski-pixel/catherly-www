# Render delay na „/" — rozbiór pomiarowy

Zlecenie właściciela z 2026-08-16, wariant 4, punkt 2: „rozbierz na
czynniki pomiarem (podejrzany nr 1: T1 next-intl — pełna serializacja
messages do każdej strony; dalej: CSS krytyczny, kolejność zasobów).
Raport z rozbiciem PRZED jakąkolwiek naprawą."

**Ten dokument niczego nie naprawia.** Wszystkie ablacje były
tymczasowe, każda cofnięta i sprawdzona sumą. Drzewo stoi na commicie
`6168ec7`, nietknięte.

---

## 1. Fakt, od którego trzeba zacząć

Strona główna maluje element LCP **realnie po 88–97 ms**. Wszystko, co
strona pobiera, kończy się realnie do ~140 ms.

```
observedFirstContentfulPaint       81–97 ms
observedLargestContentfulPaint     81–97 ms   (ten sam moment)
ostatnie żądanie kończy się        ~140 ms
```

LCP 1703 ms to liczba **wyłącznie symulowana**. Lighthouse w trybie
`throttlingMethod: "simulate"` (lantern) bierze prawdziwy przebieg i
przelicza go na łącze 4G: 150 ms RTT, 1638 kb/s, procesor ×4. Ponieważ
realnie WSZYSTKO ląduje przed obserwowanym LCP, lantern wlicza do grafu
LCP **każdy bajt strony** — także taki, który na prawdziwym łączu
przyszedłby długo po tym, jak nagłówek się namalował.

To nie znaczy, że liczba jest nieprawdziwa albo że próg 1800 ms można
lekceważyć. Znaczy, że pytanie „co powoduje render delay 1267 ms" ma
odpowiedź w kategoriach **bajtów i rund sieciowych**, a nie w
kategoriach kodu, który się wolno wykonuje. Czas procesora jest tu
nieistotny: TBT 0–7 ms, bootup 0,1 s, wątek główny 0,3 s łącznie.

Fazy LCP (audyt `largest-contentful-paint-element`), „/" na bramce:

| faza | wartość |
|---|---|
| TTFB | 456 ms |
| Load Delay | 0 ms |
| Load Time | 0 ms |
| **Render Delay** | **1263 ms** |

Element LCP to `h1` hero („Rozmawiasz z ludźmi — Catherly prowadzi…"),
czyli tekst, nie obraz. Dlatego Load Delay i Load Time są zerowe, a cały
nadmiar siedzi w render delay.

---

## 2. Metoda: drabina kontrolna zamiast zgadywania

Nie da się zmierzyć „ile kosztuje CSS", patrząc na waterfall. Trzeba
zbudować stronę bez CSS i porównać. Postawiłem więc **stanowisko
pomiarowe poza repozytorium**: serwer na porcie 3100 podaje kolejne
szczeble drabiny z katalogu roboczego, a wszystko inne (`/_next/*`,
`/favicon.ico`, samo „/") przekazuje do produkcyjnego `next start` na
3000. Repo nie było przy tym dotknięte ani razu.

Każdy szczebel dokłada **dokładnie jeden czynnik** względem poprzedniego.
Materiałem jest prawdziwy HTML „/" z tego samego builda.

Stanowisko kompresuje gzipem tak jak Next — bez tego drabina jechałaby
surowymi bajtami, a odniesienie gzipem, i pomiar mierzyłby brak
kompresji zamiast badanego czynnika.

**Dowód wierności stanowiska:** szczebel K7 (pełny komplet zasobów, czyli
odtworzenie „/") dał 1701 ms wobec 1703 ms zmierzonych na prawdziwym „/"
w tej samej serii. Różnica 2 ms przy różnicy transferu 557 B. Stanowisko
mierzy to samo, co bramka.

Wszystkie liczby to **mediany z 3 przebiegów**, Lighthouse 12.6.1,
`formFactor: mobile`, `throttlingMethod: simulate` — te same ustawienia
co bramka `lighthouserc.cjs`.

---

## 3. Drabina — wyniki

HTTP/1.1 + gzip, czyli dokładnie to, na czym stoi dzisiejsza bramka
lokalna:

| id | co dokłada | FCP | **LCP** | żądań | transfer |
|---|---|---|---|---|---|
| K0 | podłoga protokołu (dokument 175 B, nic więcej) | 613 | **758** | 2 | 1 787 B |
| K1 | pełny DOM „/" bez ładunku RSC, bez CSS, bez JS | 623 | **905** | 3 | 7 570 B |
| K2 | K1 + inline ładunek RSC (`__next_f`) | 625 | **904** | 3 | 10 604 B |
| K3 | K2 + trzy arkusze CSS (render-blocking) | 906 | **906** | 6 | 16 398 B |
| K4 | K2 + jeden sklejony arkusz CSS | 753 | **903** | 4 | 14 672 B |
| K5 | K2 + CSS wstrzyknięty do dokumentu (0 żądań) | 632 | **904** | 3 | 13 994 B |
| K6 | K3 + małe skrypty (webpack + main-app, 3 kB) | 907 | **907** | 7 | 17 351 B |
| K8 | K6 + jedna duża paczka (`255`, 46,7 kB gz) | 907 | **1507** | 8 | 64 072 B |
| K9 | K6 + druga duża paczka (`4bd1b696`, 54,8 kB gz) | 906 | **1506** | 8 | 72 201 B |
| K7 | K3 + cały JS — odtworzenie „/" | 906 | **1701** | 9 | 118 892 B |
| — | **„/" prawdziwa strona** | 907 | **1703** | 9 | 119 449 B |

## 4. Koszt czynnika

| czynnik | przyrost LCP | przyrost transferu |
|---|---:|---:|
| podłoga protokołu (K0, sam dokument 175 B) | **758 ms** | 1 787 B |
| cały DOM strony głównej (K0→K1) | **+147 ms** | +5 783 B |
| ładunek RSC `__next_f` (K1→K2) | **−1 ms** | +3 034 B |
| CSS jako trzy osobne żądania (K2→K3) | **+2 ms** | +5 794 B |
| sklejenie trzech arkuszy w jeden (K3→K4) | **−3 ms** | −1 726 B |
| wstrzyknięcie CSS do dokumentu (K3→K5) | **−2 ms** | −2 404 B |
| małe skrypty webpack+main-app (K3→K6) | **+1 ms** | +953 B |
| pierwsza duża paczka JS (K6→K8/K9) | **+599 ms** | +46,7 kB |
| druga duża paczka JS (K8/K9→K7) | **+196 ms** | +54,8 kB |
| **cały JS razem (K3→K7)** | **+795 ms** | +102 494 B |

Suma się domyka: 758 + 147 + 795 = 1700 ms wobec zmierzonych 1701–1703.

---

## 5. Podejrzany nr 1 — next-intl i serializacja messages: koszt ZERO

Trzy niezależne dowody, każdy wystarczający sam:

**5.1 Źródłowo.** W całym `src/` nie ma ani jednej dyrektywy
`"use client"` i ani jednego `NextIntlClientProvider`. Serwis jest w
100 % komponentami serwerowymi. Nie ma komu podać messages na klienta.

**5.2 W artefaktach.** Przeszukałem wszystkie 7 paczek klienta pod kątem
180 ciągów dłuższych niż 30 znaków z `src/i18n/messages/pl.json`.
**Zero trafień.** Żaden tekst z messages nie trafia do JS klienta.

**5.3 Pomiarowo.** Ładunek RSC `__next_f` to 22 942 B surowo i 65,5 %
dokumentu — po gzipie 3 034 B. Szczebel K1→K2 mierzy jego usunięcie:
**−1 ms**, czyli szum.

Osobno sprawdziłem, czy w HTML „/" siedzą teksty z namespace'ów, których
strona główna nie renderuje. Trafienia były, ale po sprawdzeniu jeden po
jednym wszystkie okazały się **tym samym zdaniem powtórzonym w treści
kilku podstron** („Rezygnujesz w każdej chwili.", „Rano widzisz, do kogo
się odezwać." itd.) — renderowanym przez własne komponenty strony
głównej. Żadnego obcego namespace'u w dokumencie nie ma.

**Wniosek:** T1 (per-stronowe namespace'y messages) jest zadaniem
porządkowym o wartości projektowej, ale na LCP strony głównej nie
przyniesie nic. Nie ma tam czego ciąć.

---

## 6. CSS krytyczny: 2 ms na LCP, 281 ms na FCP

Trzy arkusze render-blocking (1,5 + 1,5 + 2,7 kB gz) przesuwają **FCP**
z 625 na 906 ms, czyli o 281 ms. Na **LCP** nie robią nic: +2 ms.

Sklejenie w jeden plik: −3 ms. Wstrzyknięcie do dokumentu i zero żądań
na CSS: −2 ms. Obie „naprawy" są w granicach szumu, bo LCP jest i tak
zdominowany przez graf pobrań JS, który kończy się dużo później.

Audyt Lighthouse „render-blocking resources, szacowana oszczędność
270 ms" mówi o FCP, nie o LCP. Bramka pilnuje LCP.

---

## 7. JS: 795 ms z 1703, i ani bajta tego nie napisaliśmy

Dwie duże paczki to **cały koszt**:

| paczka | surowo | gzip | co to jest |
|---|---:|---:|---|
| `4bd1b696-…` | 173 019 B | 54 359 B | React + react-dom (`hydrateRoot`, `findDOMNode`, minified React error) |
| `255-…` | 173 303 B | 46 248 B | runtime klienta App Routera (`createFromReadableStream`, `callServer`, `flushSync`, `startTransition`) |
| `webpack-…` | 3 210 B | 1 643 B | runtime webpacka |
| `main-app-…` | 557 B | 226 B | wejście aplikacji |

Wspólnych długich identyfikatorów między dwiema dużymi paczkami: 20 %
mniejszego zbioru — to nie są duplikaty tego samego kodu, tylko dwa
różne kawałki bazy Next 15.5.23 / React 19.2.8.

**Ani jeden bajt z tych 346 kB to nie jest kod aplikacji.** `page-…js`
dla `/[locale]/page` w ogóle nie jest pobierany, bo strona nie ma
komponentów klienckich. To jest nieusuwalna podłoga App Routera.

### 7.1 Koszt jest nieliniowy, i to jest wskazówka

- 0 dużych paczek → 907 ms
- 1 duża paczka → 1506–1507 ms (**+599 ms**), niezależnie która z dwóch
- 2 duże paczki → 1701 ms (**+196 ms** za drugą)

Pierwsza paczka kosztuje trzy razy tyle co druga, mimo że są podobnej
wielkości. To sygnatura **narastania okna TCP i zestawiania połączeń**,
a nie samej przepustowości: nowe połączenie startuje z małym oknem i
potrzebuje kilku rund po 150 ms, zanim rozpędzi się do 1638 kb/s.

Potwierdzenie kontrolne: brotli zamiast gzipa na tych samych paczkach
(16,8 kB mniej transferu, −16 %) dał na HTTP/1.1 **+3 ms**, czyli
dokładnie nic. Ścięcie bajtów wewnątrz istniejących żądań nie usuwa
rundy sieciowej.

**To jest sedno rozbioru: kosztem nie są bajty, tylko rundy.**

---

## 8. Transport — i tu leży cały odzysk

Bramka lokalna mierzy `next start` na localhost: **HTTP/1.1 + gzip**.
Vercel podaje **HTTP/2 (i HTTP/3) + brotli**. Lantern modeluje h2
inaczej niż h1.1 — multipleks na jednym połączeniu zamiast limitu sześciu
połączeń, każde z własnym rozpędzaniem.

Postawiłem drugie stanowisko: HTTP/2 po TLS na porcie 3200, ten sam
materiał, ta sama kompresja albo brotli. Pomiar `lighthouse` CLI 12.6.1
z tymi samymi ustawieniami (lhci nie przepuszcza `chromeFlags`, a
certyfikat jest self-signed). **Parytet potwierdzony:** to samo „/" po
HTTP/1.1 dało w CLI 1702 ms wobec 1703 ms w lhci.

| transport | FCP | **LCP** | TTFB | Render Delay | transfer |
|---|---|---|---|---|---|
| HTTP/1.1 + gzip *(dzisiejsza bramka)* | 906 | **1702** | 456 | 1263 | 119 449 B |
| HTTP/2 + gzip | 800 | **1426** | 600 | 780 | 116 691 B |
| HTTP/2 + brotli *(to podaje Vercel)* | 794 | **1276** | 600 | 676 | 98 961 B |

- HTTP/2 sam z siebie: **−276 ms**
- HTTP/2 + brotli: **−426 ms**

HTTP/2 podnosi TTFB o 144 ms (uzgadnianie TLS to dodatkowa runda), ale
ścina render delay o 483–587 ms, bo wszystkie zasoby jadą jednym,
rozpędzonym połączeniem. Netto — duży zysk.

I dopiero **na HTTP/2 brotli zaczyna działać**: te same 16,8 kB mniej,
które na HTTP/1.1 dały +3 ms, tutaj dają **−150 ms**. Bo bez limitu
połączeń bajty znowu są wąskim gardłem.

---

## 9. Z6 pod HTTP/2 kosztuje ZERO

Włączyłem tymczasowo `osadzenieNaGlownej.wlaczone`, przebudowałem,
zmierzyłem pod trzema transportami, cofnąłem, sprawdziłem sumą SHA-256,
że rejestr wrócił bajt w bajt (`9ee77447dc71`), i przebudowałem ponownie.

| transport | Z6 wyłączone | Z6 włączone | koszt zrzutów |
|---|---:|---:|---:|
| HTTP/1.1 + gzip | 1703 | **1856** | **+153 ms** |
| HTTP/2 + gzip | 1426 | **1427** | **+1 ms** |
| HTTP/2 + brotli | 1276 | **1276** | **+0 ms** |

Przeglądarka pobiera te same cztery warianty 768w AVIF (44 kB) w każdym
z tych przebiegów — to nie jest tak, że pod h2 obrazy się nie ładują.
One po prostu przestają kosztować, bo jadą multipleksem po połączeniu,
które już jest rozpędzone, zamiast zestawiać własne.

**Cały koszt +150 ms, przez który Z6 zostało wyłączone, to artefakt
mierzenia na HTTP/1.1 — transportu, którego użytkownik nigdy nie
zobaczy.**

Zapas do budżetu 1800 ms:

| transport | zapas | Z6 (+150) | rezerwa designu (~200) | mieści się? |
|---|---:|---|---|---|
| HTTP/1.1 + gzip | 97 ms | nie | nie | **nie** |
| HTTP/2 + gzip | 374 ms | tak | ledwo | **tak, bez marginesu** |
| HTTP/2 + brotli | 524 ms | tak | tak, +174 ms zostaje | **tak** |

---

## 10. Błąd pomiarowy, który złapałem po drodze

Pierwsza wersja pomiaru brotli dała **−785 ms** i wyglądała na sensację.
Była fałszywa. Stanowisko kompresowało brotli q11 synchronicznie na
każde żądanie: 175 i 315 ms realnego czasu na dwie duże paczki. Przez to
paczki lądowały realnie **po** obserwowanym LCP (97 ms) i wypadały z
grafu LCP lanterna. Pomiar mierzył wolny serwer, nie mniejszy transfer.

Po wprowadzeniu pamięci podręcznej na skompresowane bufory i rozgrzaniu
jej przed przebiegiem ten sam pomiar dał **+3 ms**.

Notuję to, bo mechanizm jest ogólny i wróci: **jeśli zasób przyjdzie
realnie po obserwowanym LCP, lantern przestaje go liczyć i metryka
poprawia się bez żadnej realnej poprawy.** Każdy „zysk", który da się
wytłumaczyć wypadnięciem zasobu z grafu, jest podejrzany dopóki nie
zostanie wytłumaczony inaczej.

Ta sama pułapka od drugiej strony: szczebel K11 (cały JS wczytywany
dopiero po zdarzeniu `load`) dał **1822 ms**, czyli gorzej niż 1701.
Odroczenie skryptów nie wyjmuje ich z grafu LCP i nie jest tu żadną
naprawą.

---

## 11. Co z tego wynika — opcje do decyzji właściciela

Nic z poniższego nie zostało wdrożone.

**A. Przeniesienie bramki na preview Vercela.** To już jest zaplanowane
i przygotowane w `lighthouserc.cjs` (tryb `LHCI_BAZA`, mediana,
`bramka:preview`). Blokada jest po stronie właściciela: Protection
Bypass, sekret `VERCEL_AUTOMATION_BYPASS_SECRET`, zmienna `LHCI_BAZA`.
Zmierzony kierunek: −276 do −426 ms, czyli **jedyna opcja, która sama
z siebie odzyskuje zapas na Z6 i na rezerwę designu**. Koszt w kodzie
strony: zero. Ryzyko: liczby z lokalnego stanowiska h2 są kierunkiem
potwierdzonym pomiarem, ale nie są obietnicą wyniku na realnym Vercelu —
tam dochodzi CDN, cache, HTTP/3 i inne RTT. Trzeba to potwierdzić
pomiarem na preview, zanim ktokolwiek policzy zapas jako pewny.

**B. Cięcie JS.** Zmierzony potencjał: do 795 ms. Praktycznie
nieosiągalne — to baza App Routera, nie nasz kod. Jedyna droga to
architektura bez hydratacji (statyczny eksport bez runtime'u React),
czyli zmiana fundamentu serwisu. Nieproporcjonalne do problemu.

**C. Cięcie CSS** (sklejenie trzech arkuszy, inline krytycznego).
Zmierzony zysk na LCP: **−2 do −3 ms**. Poprawia FCP o ~280 ms, co jest
prawdziwe i widoczne dla użytkownika, ale nie rusza bramki. Do
rozważenia osobno, jako jakość odbioru, nie jako odzysk budżetu.

**D. Podniesienie progu.** Nie proponuję. Próg 1800 ms jest z ADR-002 i
zmienia się tylko ADR-em; a pomiar właśnie pokazał, że problem nie jest w
progu, tylko w tym, że mierzymy transport, którego nie wdrażamy.

**Rekomendacja:** A. B odpada jako nieproporcjonalne, C jest osobnym
tematem o FCP, D nie jest naprawą.

---

## 12. Czego NIE zmierzono

- **Realnego preview Vercela.** Blokada po stronie właściciela (sekrety).
  Wszystkie liczby h2 pochodzą z lokalnego stanowiska TLS.
- **HTTP/3 / QUIC**, którym Vercel też podaje. Może być lepiej niż h2,
  może inaczej. Nie wiem, bo nie mierzyłem.
- **Wpływu transportu na pozostałe sześć tras.** Mierzone było „/", bo o
  „/" było zlecenie. Pozostałe trasy stoją na 1700–1702 ms i mają tę samą
  strukturę zasobów, więc spodziewam się tego samego — ale to jest
  oczekiwanie, nie pomiar.
- **INP w polu.** Bramka pilnuje go proxy przez TBT (0–7 ms). Bez zmian.
- **Certyfikat self-signed** z `--ignore-certificate-errors` nie wpływa
  na graf lanterna, ale nie jest produkcyjnym łańcuchem zaufania.

---

## 13. Stan drzewa po tej pracy

Wszystkie ablacje cofnięte. `git status` czysty, `git diff` pusty, suma
SHA-256 rejestru `design/pipeline-obrazow.json` identyczna jak przed
pracą (`9ee77447dc71`), `wlaczone: false`, zero odwołań do
`/obrazy/filary` w HTML „/".

Bramka po przywróceniu, `lhci autorun` exit 0:

| trasa | LCP (mediana z 3) |
|---|---|
| `/` | 1703 ms |
| `/funkcje` | 1701 ms |
| `/dla-kogo` | 1702 ms |
| `/funkcje/pozyskiwanie` | 1700 ms |
| `/funkcje/tresci` | 1701 ms |
| `/funkcje/zespol` | 1702 ms |
| `/funkcje/wyniki` | 1701 ms |

Materiał pomiarowy (stanowiska, szczeble drabiny, surowe raporty
Lighthouse ze wszystkich serii) leży poza repozytorium, w katalogu
roboczym sesji.
