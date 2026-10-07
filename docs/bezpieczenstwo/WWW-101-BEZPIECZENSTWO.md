# WWW/101 — BEZPIECZEŃSTWO STRONY (pomiar, bez napraw)

**Zakres zadeklarowany — czytaj go razem z każdą liczbą z tego dokumentu.**
Cytat z tego dokumentu bez tego nagłówka starzeje się natychmiast (kanon:
„dokument z zadeklarowanym zakresem się nie starzeje — starzeje się cytat
wyjęty z niego bez zakresu").

| co | wartość |
| --- | --- |
| Zlecenie | `WWW/101`, KROK 2 — „tylko odczyt + raport, bez napraw" |
| Repozytorium | `sylwesterzabski-pixel/catherly-www`, gałąź `faza-4/podstrony` |
| Stan drzewa w chwili pomiaru | `42c84ab` (`git ls-remote origin faza-4/podstrony` = `42c84aba8eed…`, ahead 0 / behind 0, `git status --porcelain src/ design/ content/` pusty) |
| Data pomiarów | **2026-10-07**, 17:59–18:20 CEST |
| Przedmiot | strona marketingowa: build lokalny + konfiguracja repozytorium |
| Adresat | właściciel oraz sesja, która będzie te luki zamykać |
| Wsad o aplikacji | `docs/przeglad/APP-064-BEZPIECZENSTWO.md` z repozytorium `fbo-os`, gałąź `claude/app-064`, czubek `0a5678c3…` — klon `--depth 1 --single-branch` do katalogu sesji, **wyłącznie odczyt** |
| Czego ten dokument **nie** robi | nie naprawia ani jednej pozycji, nie zmienia zachowania bramek, nie dotyka `src/`, `design/tokens.json` ani `content/` |

**Kalibracja wagi — bez niej cała tabela czyta się o jeden stopień za
groźnie.** `vercel.json:4-6` wyłącza wdrożenia z `main`
(`"deploymentEnabled": { "main": false }`), a wdrożenie produkcyjne to
ADR-030, Faza 7. **Dziś nic z tabeli poniżej nie jest wystawione
odwiedzającej** — istnieją wdrożenia preview, a te według
`docs/faza-4/bramka-na-preview.md` stoją za Deployment Protection (stanu
w panelu Vercela ten dokument **nie mierzył** — to odczyt cudzego
dokumentu, nie pomiar). Kolumna „waga" mówi więc o skutku **po** wdrożeniu
produkcyjnym; termin zamknięcia to „przed Fazą 7", nie „natychmiast".
Jedyny wyjątek, który **nie czeka** na Fazę 7 — `B2` — jest w swoim
wierszu nazwany.

---

## 1. Tabela luk

Skrót w kolumnie „plik:linia" wskazuje **miejsce, w którym naprawa ma
powstać**, a przy brakach — miejsce, w którym rzeczy nie ma. Brak
nagłówka to twierdzenie o nieistnieniu, więc każdy taki wiersz ma pod
tabelą kontrolę pozytywną przyrządu.

| # | waga | luka | plik:linia | scenariusz (jedno zdanie) | proponowana naprawa | zmienia wygląd |
| --- | --- | --- | --- | --- | --- | --- |
| **B1** | 🔴 | **Brak Content-Security-Policy w jakiejkolwiek postaci** — także bez `Report-Only` | `next.config.ts:64-71` (jedyny nagłówek to `x-catherly-wydanie`), `vercel.json:1-8` (brak klucza `headers`), `src/middleware.ts` (nie ustawia żadnego nagłówka) | Pierwszy skrypt, który trafi na stronę nie z naszej ręki — z pomyłki w kodzie, z zależności, z przyszłego `rewrite` do aplikacji — wykonuje się bez żadnego ograniczenia źródła, bo przeglądarka nie dostaje polityki, którą mogłaby go zatrzymać. | `headers()` w `next.config.ts`: `Content-Security-Policy-Report-Only` **najpierw** (zebrać zgłoszenia), potem egzekwowana. Mierzona przeszkoda: build daje **20 skryptów wbudowanych bez `src`** i **0 atrybutów `nonce`** w `pl.html`, więc `script-src 'self'` bez `'unsafe-inline'` albo bez nonce **zabije stronę** — i to jest przyczyna, dla której ta luka jest 🔴, a nie jednolinijkowa. | **nie** (nagłówek nie renderuje się), ale błędna CSP **gasi arkusz i czcionki** — stąd obowiązkowa kolejność Report-Only → pomiar → egzekucja |
| **B2** | 🔴 | **`/_next/image` żyje, przyjmuje żądania i transkoduje AVIF — a strona nie używa `next/image` ani razu.** Advisory `GHSA-2xp9-vwfh-vxw4` dotyczy dokładnie tego punktu końcowego i dokładnie plików AVIF | `next.config.ts:59-72` — **brak klucza `images`** w całym pliku (`grep -c images next.config.ts` = 0) | Najszersza powierzchnia ataku w całym serwisie — dekoder obrazów uruchamiany żądaniem HTTP — stoi otwarta po to, żeby obsłużyć komponenty, których w kodzie nie ma ani jednego. | Dwuczłonowo: `next@15.5.27` (poprawka istnieje — niżej `B3`) **oraz** `images: { unoptimized: true }` w `next.config.ts`. ⚠ **Skutek drugiego członu jest przewidywaniem, nie pomiarem** — po zmianie trzeba powtórzyć sondowanie z §2.2 i pokazać, że własny AVIF przestał dawać 200. | **nie** — `<Image` 0 wystąpień w `src/`, `import … from "next/image"` 0 wystąpień, obrazy renderuje 17 surowych `<img>` (świadomie, ADR o prowieniencji bajtów); wyłączenie optymalizatora nie dotyka ani jednego renderowanego obrazu |
| **B3** | 🔴 | **`next` 15.5.23 — advisory krytyczne, poprawka dostępna** (`npm audit --omit=dev`: 1 krytyczna + 3 wysokie, razem 4) | `package.json:39` → `"next": "^15.5.23"`; `package-lock.json` → zainstalowane **15.5.23** | Zakres podatny advisory to `9.3.4-canary.0 – 16.3.0-preview.10`, więc wersja na tej gałęzi mieści się w nim w całości, a jedno z dwóch advisory krytycznych opisuje zdalne wykonanie kodu przez ten sam punkt końcowy obrazów, który `B2` mierzy jako żywy. | `next@15.5.27` — **ta sama wersja, którą repozytorium aplikacji już niesie** (`package.json:182` wsadu), więc podniesienie nie wprowadza do organizacji nowej wersji frameworka, tylko dogania istniejącą. Podnosi też `B7` (audyt: `fixAvailable: true` dla wszystkich czterech). | **nie dla kodu strony** — zmiana nie dotyka `src/`; ale podniesienie wersji frameworka **wymaga porównania pikselowego** przed przyjęciem, bo render jest po stronie Next.js |
| **B4** | 🟠 | Brak `X-Frame-Options` i brak `frame-ancestors` w CSP | `next.config.ts:64-71`, `vercel.json:1-8` | Stronę da się zagnieździć w obcej ramce i podać za cudzą ofertę albo nakleić na nią warstwę przechwytującą kliknięcia. | `X-Frame-Options: DENY` **i** `frame-ancestors 'none'` w CSP (dwa mechanizmy, bo starsze przeglądarki czytają tylko pierwszy). Aplikacja ma `DENY` — wsad `next.config.mjs:47-62`. | **nie** |
| **B5** | 🟠 | Brak `X-Content-Type-Options: nosniff` | `next.config.ts:64-71` | Przeglądarka zgaduje typ treści przy odpowiedziach, których typu nie rozpozna, i może wykonać jako skrypt coś, co miało być plikiem. | `X-Content-Type-Options: nosniff`. Aplikacja go ma — wsad `next.config.mjs:47-62`. | **nie** |
| **B6** | 🟠 | Brak `Referrer-Policy` | `next.config.ts:64-71` | Wyjście z naszej strony niesie do obcego serwera pełny adres strony, z której odwiedzająca wyszła — a plan Fazy 5 wprowadza `rewrite` tras logowania do aplikacji (`next.config.ts:61-63`, ADR-005), czyli dokładnie ruch, przy którym to zaczyna znaczyć. | `Referrer-Policy: strict-origin-when-cross-origin` — identycznie jak aplikacja (wsad `next.config.mjs:47-62`). | **nie** |
| **B7** | 🟠 | Trzy zależności produkcyjne z advisory **wysokim**: `postcss` 8.4.31, `source-map-js` 1.2.1, `sharp` 0.35.3 | `package-lock.json` (wszystkie trzy są zależnościami przechodnimi `next`) | Żadna z trzech nie ma w tym serwisie drogi wejścia od odwiedzającej — nie przyjmujemy ani CSS, ani wgrywanych obrazów — więc ryzyko siedzi w łańcuchu budowania, a nie w przeglądarce; advisory jednak nie znika od tego, że droga jest wąska. | Podniesienie `next` (`B3`) — audyt podaje `fixAvailable: true` dla każdej z czterech pozycji. | **nie** (jak `B3`) |
| **B8** | 🟡 | Brak `Strict-Transport-Security` na buildzie lokalnym | `next.config.ts:64-71` | Pierwsze wejście pod `http://` nie zostaje przez przeglądarkę zapamiętane jako „tylko HTTPS", więc kolejne da się zepchnąć na połączenie nieszyfrowane. | `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` **tylko na produkcji**, jak w aplikacji (wsad `next.config.mjs:47-62`, tam pod warunkiem środowiska). ⚠ **Czy platforma dokłada własny HSTS na swoich domenach — NIESPRAWDZONE**, i to jest granica pomiaru, nie wniosek: zakaz 6 nie pozwala drukować nagłówków odpowiedzi z preview, a produkcji nie ma (`vercel.json:4-6`). Pomiar należy do właściciela — §5 krok 5. | **nie** |
| **B9** | 🟡 | Brak `Permissions-Policy` | `next.config.ts:64-71` | Strona nie odbiera kamerze, mikrofonowi ani lokalizacji dostępu, którego sama nigdy nie używa, więc skrypt wstrzyknięty w przyszłości zastanie te możliwości otwarte. | `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()` — **ostrzej niż aplikacja**, która trzyma `microphone=(self)`, bo strona marketingowa nie ma do mikrofonu żadnego zastosowania. | **nie** |
| **B10** | 🟡 | Brak `Cross-Origin-Opener-Policy` i `Cross-Origin-Resource-Policy` | `next.config.ts:64-71` | Okno otwarte z naszej strony zachowuje do niej uchwyt, a nasze zasoby wolno wciągać z obcych dokumentów. | `COOP: same-origin`, `CORP: same-origin`. Mierzony koszt tej luki jest dziś najniższy z całej tabeli: build daje **0 odesłań `target="_blank"`** i **0 adresów zewnętrznych**. W aplikacji ta sama para jest **również nieobecna** — zmierzone wprost w `next.config.mjs` wsadu: `Cross-Origin-Opener` 0 wystąpień, `Cross-Origin-Resource` 0, przy kontroli pozytywnej `X-Frame-Options` 1; wsad opisuje to jako własną **pozycję L40**. Czyli luka wspólna, nie asymetria. | **nie** |
| **B11** | 🟡 | Brak `/.well-known/security.txt` | `public/` — pliku nie ma; nie ma też `public/_headers` | Kto znajdzie lukę, nie ma gdzie przeczytać, komu ją zgłosić, więc zgłoszenie albo nie przyjdzie, albo przyjdzie kanałem publicznym. | Plik `public/.well-known/security.txt` wg RFC 9116 z adresem kontaktowym i datą wygaśnięcia. **Decyzja właściciela, nie defekt techniczny** — wymaga adresu, pod którym ktoś naprawdę odpowiada. | **nie** |
| **B12** | 🟡 | **Asymetria z aplikacją: aplikacja ma zestaw nagłówków, strona nie ma ani jednego** | wsad `next.config.mjs:47-62` wobec `next.config.ts:64-71` | Oba serwisy staną pod jedną marką i prawdopodobnie pod jedną domeną, a mają dwa różne poziomy zabezpieczenia przeglądarkowego — i słabszy jest ten, który odwiedzająca zobaczy pierwszy. | Zamknięcie `B1`, `B4`, `B5`, `B6`, `B8`, `B9` zamyka tę pozycję jako skutek. Wiersz istnieje osobno, bo **różnicę widać tylko z dwóch stron naraz** i żadna pojedyncza naprawa jej nie nazwie. ⚠ Nie kopiować konfiguracji aplikacji wprost: jej CSP jest **Report-Only i z `'unsafe-inline'`** — zmierzone w `next.config.mjs` wsadu: `:56` to `Content-Security-Policy-Report-Only`, a `:22` i `:32` niosą `'unsafe-inline'` w `script-src` i `style-src`; wsad opisuje to jako własną **pozycję L13** („CSP niczego nie blokuje"). Przeniesiona tu dałaby napis zamiast mechanizmu. | **nie** |

**Rozkład: 🔴 3 · 🟠 4 · 🟡 5 = 12 pozycji.** Liczby policzone z wierszy
tabeli powyżej przy tej edycji, nie przepisane.

---

## 2. Pomiary — co, czym i z jaką kontrolą pozytywną

Każdy podrozdział niesie kontrolę pozytywną **w tym samym przebiegu**, bo
zero bez niej jest zerem narzędzia, nie wynikiem.

### 2.1. Nagłówki — pięć tras, w tym przekierowanie i 404

Stanowisko: lokalny `next start` na porcie 3100 (build z `WWW_DIST`,
`distDir` z `next.config.ts:57,60`). **Żaden pomiar nie dotyczył preview** —
zakaz 6. Drukowana jest wyłącznie **obecność nazw** z listy, nigdy wartości.

| trasa | HTTP | nagłówków w odpowiedzi | nagłówki bezpieczeństwa obecne | kontrola pozytywna |
| --- | --- | --- | --- | --- |
| `/` | 200 | 16 | **żaden** | `x-catherly-wydanie` JEST |
| `/pl` | 307 | 6 | **żaden** | `x-catherly-wydanie` JEST |
| `/en` | 200 | 15 | **żaden** | `x-catherly-wydanie` JEST |
| `/cennik` | 200 | 16 | **żaden** | `x-catherly-wydanie` JEST |
| `/_next/static/chunks/webpack.js` | 404 | 9 | **żaden** | `x-catherly-wydanie` JEST |

Lista sprawdzanych nazw (9): `content-security-policy`,
`content-security-policy-report-only`, `strict-transport-security`,
`x-frame-options`, `referrer-policy`, `permissions-policy`,
`x-content-type-options`, `cross-origin-opener-policy`,
`cross-origin-resource-policy`.

**Dlaczego pięć tras, a nie jedna.** Nagłówek z `next.config.ts` wchodzi
przez `source: "/:sciezka*"`, a przekierowania i odpowiedzi 404 powstają
w innych miejscach łańcucha (`src/middleware.ts:44` przepisuje na 404
w obrębie własnego źródła). Jedna trasa 200 nie odpowiedziałaby na
pytanie, czy brak dotyczy całego serwisu — pięć, z 307 i 404 w środku,
odpowiada.

**Przeszukana cała powierzchnia nagłówków, nie tylko ta jedna.**
`next.config.ts` (jedyne `headers()`), `vercel.json` (brak klucza
`headers` — plik ma 8 linii i są wypisane w §1), `src/middleware.ts`
(nie ustawia żadnego nagłówka), brak `public/_headers`. Kontrola
pozytywna przyrządu szukającego plików: `public/obrazy` zostało
znalezione w tym samym przebiegu, w którym `public/_headers`,
`public/robots.txt`, `public/sitemap.xml`, `src/app/robots.ts`
i `src/app/sitemap.ts` wyszły jako nieobecne.

### 2.2. `/_next/image` — co ten punkt końcowy przyjmuje

| żądanie | HTTP | wniosek |
| --- | --- | --- |
| własny AVIF z `public/` (`/obrazy/wzorzec-2026-09-06/1-bohaterka.avif`) | **200** | **KONTROLA POZYTYWNA: punkt końcowy istnieje, działa i transkoduje AVIF** |
| `https://example.com/a.png` | 400 | obce hosty odrzucone (brak `images.remotePatterns`) |
| `/../../../../etc/passwd` | 400 | wyjście z katalogu odrzucone |
| `/robots.txt` | 400 | zasób nie-obraz odrzucony |
| `/nie-ma-takiego-pliku.avif` | 400 | nieistniejący plik odrzucony |
| bez parametrów | 400 | — |

**To jest pomiar, nie odczyt dokumentacji.** Pierwszy wiersz jest
jednocześnie kontrolą pozytywną: gdyby dawał 400 jak pozostałe, cała
tabela mówiłaby tylko o tym, że sonduję złym adresem. Zero z jednej
postaci nie jest zerem bytu — i tu właśnie dlatego **pierwsza wersja
tego pomiaru była fałszywa**: `ls public/*.avif` padło na globbingu zsh
(„no matches found"), więc do sondy trafił pusty adres i **każde**
żądanie dało 400, co wyglądało na „punkt końcowy nic nie przyjmuje".
Poprawione na `find public -name '*.avif'`. Oba odczyty zostają
widoczne — korekta bez zamazania śladu.

Dziedzina tego werdyktu: **build lokalny**. Zachowanie na Vercelu może
się różnić (tam optymalizator obrazów jest usługą platformy) i tego
**nie zmierzono** — §6.

### 2.3. Formularze, pola, dokąd idą dane

| co | pomiar | kontrola pozytywna |
| --- | --- | --- |
| `<form` w `src/` | **3 trafienia, wszystkie fałszywe** — to `<formularz>` w katalogach tłumaczeń (`src/i18n/messages/{pl,en,de}.json:376`), znacznik tekstu wzbogaconego w zdaniu **o formularzu aplikacji**, nie element HTML | `<section` 25 trafień |
| `<input` w `src/` | **2** — `src/components/SekcjaPlanow.tsx:60,70` | — |
| `<button` w `src/` | 0 | — |
| `action=` w `src/` | 0 | — |

Dwa pola z `SekcjaPlanow.tsx` to **przyciski radiowe w `<fieldset>`**
(`name="okres"`, wartości `miesiecznie` / `rocznie`, przełącznik okresu
w cenniku, obsługiwany arkuszem). Nie ma `<form>`, nie ma `action`, nie
ma `<button>` — **żadne dane nie opuszczają przeglądarki**, więc pytania
o walidację serwerową, limit tempa i ochronę przed botami **nie mają
dziś przedmiotu po stronie formularzy**. To jest brak przedmiotu, nie
zielone światło: wraca w chwili, w której powstanie pierwszy formularz
kontaktowy lub zapisu.

**Trasa `/login` to nie formularz.** `src/app/[locale]/login/page.tsx:33-47`
— nagłówek `h1`, jeden akapit i odesłanie na stronę główną. Zero pól,
zero przekierowania do aplikacji. Zlecenie pytało o „przekierowania do
`/login` aplikacji": **dziś ich nie ma**, a plan je zapowiada —
`next.config.ts:61-63` (*„Faza 5 wymaga rewrites tras
logowania/rejestracji do aplikacji (ADR-005)"*). To **odczyt komentarza,
nie pomiar zachowania**, i ma być tak czytany. Wniosek wykonawczy, który
z tego wynika, jest jednak twardy: **nagłówki z `B1`–`B6` mają stać
przed włączeniem tych `rewrite`**, bo rewrite wprowadza cudze źródło
w kontekst naszej domeny, a wtedy brak CSP przestaje być ryzykiem
hipotetycznym.

### 2.4. Skrypty i domeny zewnętrzne, przekierowania, dane w adresach

Mierzone na zbudowanym `pl.html` oraz w `src/`:

| co | pomiar |
| --- | --- |
| `href="http…` w zbudowanym HTML | **0** |
| `src="http…` w zbudowanym HTML | **0** |
| `target="_blank"` | **0** |
| `nonce=` | **0** |
| `<script>` z `src=` | 5 (wszystkie własne, `/_next/…`) |
| `<script>` **bez** `src=` (wbudowane) | **20** |
| atrybuty `style="` | 0 |
| `<style>` wbudowany | 0 |
| kontrola pozytywna | `<html` 1 |

Z tego: **zero analityki, zero skryptów obcych, zero obcych domen,
czcionki własne, obrazy z własnego źródła** — czyli CSP dla tej strony
może być wąska, a jedyną prawdziwą przeszkodą jest 20 skryptów
wbudowanych bez nonce (`B1`). `style-src 'self'` jest po tym pomiarze
wolne od przeszkód **na stronie głównej**; pozostałych 32 plików HTML
w buildzie **nie przeszukano** pod tym kątem i to jest granica, nie
wynik.

**Przekierowania i dane w adresach:** `searchParams` — 0 użyć w `src/`;
jedyne interpolowane `href` to `src/app/[locale]/dla-kogo/page.tsx:113`
i `src/components/SpisTresci.tsx:43`, oba wyłącznie fragmentowe (`#…`).
Jedyne przepisanie to `src/middleware.ts:44` — 404 w obrębie własnego
źródła. Adres `//evil.example.com` normalizuje się do
`/evil.example.com`, czyli **otwartego przekierowania nie ma**.
Przekierowania językowe to 307/308 w obrębie własnego źródła (widać
w §2.1 na `/pl`).

**Pierwsza wersja tego pomiaru też była fałszywa i też przez zsh:**
`grep --include=*.ts` bez cudzysłowów padło na globbingu, dając
„0 przekierowań / 0 href" — zero narzędzia podane jako zero bytu.
Poprawione cudzysłowami; oba odczyty zostają widoczne.

### 2.5. Zależności — `npm audit --omit=dev`, 2026-10-07

Podsumowanie: **4 podatności — 1 krytyczna, 3 wysokie**, zero
umiarkowanych, zero niskich.

| pakiet | wersja zainstalowana | waga | zakres podatny | advisory |
| --- | --- | --- | --- | --- |
| `next` | **15.5.23** | **krytyczna** | `9.3.4-canary.0 – 16.3.0-preview.10` | `GHSA-p293-qw3h-jr36` (CVSS 9,0 — RCE bez uwierzytelnienia na serwerach **Windows**; nasze wdrożenie nie jest windowsowe) · `GHSA-2xp9-vwfh-vxw4` (**RCE bez uwierzytelnienia w Image Optimization API przy plikach AVIF** — patrz `B2`) |
| `postcss` | 8.4.31 | wysoka | `<=8.5.22` | `GHSA-6g55-p6wh-862q` (7,5) · `GHSA-r28c-9q8g-f849` (7,5) · `GHSA-fxqj-rqcc-2cmp` · `GHSA-qx2v-qp2m-jg93` (6,1) |
| `sharp` | 0.35.3 | wysoka | `<=0.35.5-rc.1` | `GHSA-f88m-g3jw-g9cj` (libvips) · `GHSA-rgj7-g3m4-5g8c` (libheif) · `GHSA-wq5f-xc86-pv6w` (librsvg) |
| `source-map-js` | 1.2.1 | wysoka | `1.0.0 – 1.2.1` | `GHSA-68fv-2mgg-jv7q` (7,5 — zablokowanie pętli zdarzeń) |

`fixAvailable: true` dla wszystkich czterech; droga wyjścia to jedno
podniesienie — `next@15.5.27`.

**Korekta wobec własnej wcześniejszej notatki tej sesji, bez zamazania
śladu:** zapisałem `sharp@0.34.5`; odczyt `package-lock.json` daje
**0.35.3**. Obie liczby zostają widoczne, obowiązuje zmierzona.

### 2.6. Nagłówek `x-catherly-wydanie` — różnica licencjonowana, nie defekt

Jedyny nagłówek, jaki strona wysyła, podaje SHA wydania
(`next.config.ts:68`, wartość z `VERCEL_GIT_COMMIT_SHA` / `GITHUB_SHA`,
lokalnie `"lokalne"`). Przy pobieżnym czytaniu to „ujawnianie wersji" —
i dokładnie dlatego ten podrozdział istnieje.

**Ten nagłówek jest mechanizmem, nie przeoczeniem.** Czytają go trzy
skrypty bramkowe: `scripts/sprawdz-preview.mjs:302`,
`scripts/straznik-po-pomiarze.mjs:145`, `scripts/rozgrzewka-preview.mjs:201`
— a `scripts/sprawdz-preview.mjs:306` przerywa z komunikatem „Bez niego
nie…", gdy nagłówka brakuje. Jego usunięcie albo skrócenie **zepsułoby
strażnika prowieniencji pomiaru**, czyli naprawiłoby wygląd porządku
kosztem działającego zabezpieczenia.

**Zakaz przenoszenia wniosku:** nie „porządkować" tego nagłówka przy
zamykaniu `B1`–`B10`. Repozytorium jest prywatne, a koszt ujawnienia
skrótu commita jest tu mniejszy niż koszt utraty prowieniencji pomiaru.
Gdyby repozytorium stało się publiczne, pozycja wraca do rozważenia —
i wtedy rozstrzyga właściciel, nie sesja sprzątająca nagłówki.

### 2.7. Stopka — **podejrzenie obalone pomiarem**

Wcześniej w tej sesji zapisałem podejrzenie defektu: etykiety czterech
dokumentów prawnych („Regulamin", „Prywatność", „Ciasteczka",
„Przetwarzanie danych") renderują się, a `/prywatnosc`, `/pl/prywatnosc`
i `/bezpieczenstwo` dają **404**; klucza `prywatnosc` nie ma
w `src/i18n/sciezki.ts`. Wniosek narzucał się sam: martwe odesłania
w stopce.

**Pomiar go obala.** `src/components/Stopka.tsx:131-137` renderuje te
cztery pozycje jako **tekst**, nie jako odesłania:
`{t(\`dokumentyPozycje.${dokument}\`)} {t("wkrotce")}`. W zbudowanym
`pl.html`:

| co | pomiar |
| --- | --- |
| wystąpienia „Prywatność" | 2 |
| `href` zawierający `prywatnosc` | **0** |
| kontrola pozytywna: `href` zawierający `cennik` | **3** |
| renderowany kształt | `<li>Prywatność<!-- --> <!-- -->(wkrótce)</li>` |

Komentarz w `src/components/Stopka.tsx:30-36` nazywa to wprost:
*„dokumenty prawne jako TEKST »Nazwa (wkrótce)« […] — ŻADNYCH linków do
nieistniejących stron (bramka linków; linki wchodzą wraz ze stronami
dokumentów)"*.

**Oba odczyty zostają widoczne.** Klasa błędu, który mnie tu prawie
złapał, ma w kanonie nazwę: **różnica licencjonowana wygląda identycznie
jak defekt i jest jego przeciwieństwem**. „Naprawa" polegałaby na dodaniu
odesłań do stron, których nie ma — czyli na wprowadzeniu dokładnie tego
defektu, który ten komentarz od początku wyklucza.

---

## 3. Zgodność obietnic strony z kodem aplikacji

Pytanie zlecenia: czy strona obiecuje zabezpieczenia, których kod
aplikacji nie ma. Metoda: przeszukanie **renderowanych** katalogów
(`src/i18n/messages/{pl,en,de}.json` — to one trafiają do HTML przez
`src/i18n/request.ts:19`) pod kątem twierdzeń o danych i bezpieczeństwie,
potem zestawienie z wsadem.

**Strona stawia jedną twierdzącą obietnicę o danych:**

| język | brzmienie | miejsce |
| --- | --- | --- |
| pl | **„Dane przechowywane w UE"** | `src/i18n/messages/pl.json:28` (`Hero.potwierdzenieUE`) oraz `:123` (`potwierdzenie3`, cennik) |
| en | „Data stored in the EU" | parytet |
| de | „Daten in der EU gespeichert" | parytet |

**Pokrycie: częściowe.**

| człon obietnicy | co mówi wsad | status |
| --- | --- | --- |
| funkcje aplikacji działają w UE | `vercel.json:4` wsadu: `"regions": ["fra1"]` (Frankfurt) | **POKRYTE** |
| **baza danych i Storage leżą w UE** | `docs/przeglad/APP-064-BEZPIECZENSTWO.md` — **ani jednego zdania o regionie bazy**; jedyne trafienie na `region` w całym pliku to linia 219, i jest to `regions: ["fra1"]` o funkcjach | **NIESPRAWDZONE** |

Poza wsadem, w tym samym klonie tylko do odczytu, znalazłem dwa odczyty
pośrednie — i **oznaczam je jako wejście poza literę zlecenia**, bo
zlecenie wskazywało jeden plik wsadu:

- `docs/ARCHITECTURE.md` (tabela technologii): baza = PostgreSQL
  (Supabase), Storage = Supabase Storage, „Deploy Web | Vercel (fra1)".
  **Region bazy i Storage nie podany.**
- `docs/OPERATIONS.md:16`: przykładowa wartość `DATABASE_URL` wskazuje
  `aws-1-eu-central-1.pooler.supabase.com`. ⚠ To **przykład w tabeli
  zmiennych**, nie odczyt konfiguracji produkcyjnej — kolumna nazywa się
  „Przykład". Wynikanie z dokumentacji nie jest pomiarem; status się
  przez to **nie zmienia**.

**Werdykt — i jego dziedzina.** W warstwie, którą dało się zmierzyć,
strona **nie obiecuje nic, czego aplikacja nie ma**: pozostałe
renderowane zdania dotyczące bezpieczeństwa to albo **odmowy**
(`pl.json:224`, `mod3_nie` — Catherly nie czyta prywatnego kalendarza),
albo zapowiedzi jawnie oznaczone jako niegotowe. Natomiast **połowa
jedynej twierdzącej obietnicy stoi dziś na niesprawdzonym** — i to jest
pozycja ADR-018 („obietnice"), nie kosmetyka. Domknięcie wymaga **jednego
zdania o regionie bazy i Storage, pochodzącego z odczytu konfiguracji
Supabase, nie z dokumentu**. Do tej chwili obowiązuje: niesprawdzone
liczy się jak niedziałające.

Dwa twierdzenia **poza dziedziną wsadu**, odnotowane, żeby nie wyglądały
na sprawdzone: odcisk SHA-256 w Świadectwie (`pl.json:354`, `mod5_poco`)
oraz „Eksport danych zawsze: vCard i CSV" (`pl.json:122`). Wsad
`APP-064` o żadnym z nich nie mówi — **poza jego zakresem nie ma
werdyktu, jest milczenie**.

Ślad metody, bez zamazania: pierwsze przeszukanie katalogów po słowach
„bezpieczeństwo / szyfrowanie / RODO" dało **zero** — a zdanie „Dane
przechowywane w UE" renderuje się na stronie głównej. Zero było zerem
**kształtu wzorca**, nie bytu. Poprawione przeszukaniem po kształcie
(`przechowyw|w UE|stored in|gespeichert`).

---

## 4. Co sprawdzone i czyste — z nazwaną dziedziną

Te pozycje **nie są** lukami, i każda niesie zakres, w którym to
twierdzenie obowiązuje. Kolumna nie nazywa się „czyste", nazywa się
„czyste w zmierzonej warstwie" — bez tego pierwszy cytat zrobi z niej
„czyste".

| co | czyste w warstwie | czego ten werdykt **nie** obejmuje |
| --- | --- | --- |
| Otwarte przekierowania | brak; `//evil.example.com` → `/evil.example.com`; jedyne przepisanie to 404 w obrębie własnego źródła (`src/middleware.ts:44`) | zachowania platformy przed trafieniem w naszą aplikację |
| Dane w adresach | `searchParams` 0 użyć; interpolowane `href` tylko fragmentowe | przyszłych tras z parametrami |
| Skrypty i domeny obce | 0 `href="http`, 0 `src="http`, 0 `target="_blank"`, 0 analityki, czcionki własne | pozostałych 32 plików HTML buildu — przeszukano `pl.html` |
| Wstrzyknięcia w kodzie | 0 `dangerouslySetInnerHTML`, 0 `eval`, 0 `innerHTML` | — |
| Zmienne jawne | 0 `NEXT_PUBLIC_*` | — |
| Formularze | nie istnieją (§2.3) | stanu po powstaniu pierwszego formularza |
| Stopka — martwe odesłania | nie istnieją; etykiety są tekstem „(wkrótce)" (§2.7) | — |
| `fbo-os` nietknięte | **60 refów przed i po**, `HEAD 8660df53` bez zmian, obiekt `0a5678c3` tam **nieobecny** (czyli wsadu nie pobrano do tamtego repozytorium), każde moje polecenie w tym katalogu było odczytem (`git log`, `git show-ref`, `git status`, `git cat-file -e`); wsad wzięty klonem `--depth 1 --single-branch` do katalogu sesji | **drzewa roboczego**: `git status --porcelain` w `fbo-os` pokazuje **16 niezacommitowanych zmian**. Pomiaru „przed" dla drzewa roboczego **nie mam** — mam natomiast to, że żadne moje polecenie tam nie zapisywało. Te 16 zmian należy czytać jako pracę właściciela, zastaną, a nie jako skutek tej sesji |

---

## 5. Kroki właściciela — Vercel

Wszystkie wymagają panelu i **żadnego nie wolno wykonać z tej strony**.
Kolejność nie jest dowolna: krok 1 ma sens dopiero po rozstrzygnięciu
`B2`, bo zmienia się wtedy to, czego ochrona ma dotyczyć.

1. **Firewall → Bot Protection** dla projektu `catherly-www`. Włączyć
   **najpierw w trybie obserwacji**, nie blokowania — strona nie ma
   formularza do nadużycia, więc jedyną drogą kosztową jest
   `/_next/image` (transkodowanie obrazu to praca procesora na żądanie).
   **Jeśli `B2` zostanie zamknięte przez `images: { unoptimized: true }`,
   ten krok traci większość przedmiotu** i zostaje tylko ochrona przed
   wyczerpywaniem pasma.
2. **Firewall → limit tempa na `/_next/image*`** — tylko jeśli punkt
   końcowy ma zostać. Wsad `APP-064` zaleca limity per trasa i tę samą
   zasadę stosuje się tu, z tą różnicą, że po stronie strony istnieje
   dokładnie **jedna** trasa warta limitu.
3. **Attack Challenge Mode — wyłącznie w trakcie ataku.** Wsad stawia
   ten warunek wprost; trzymany włączony „na wszelki wypadek" dokłada
   tarcie każdej odwiedzającej i staje się ciemnym wzorcem, czyli łamie
   zakaz z kanonu strony.
4. **Deployment Protection na preview — zostawić bez zmian.** Sekret
   obejścia mieszka w zignorowanym `.env`; zakaz 6 zabrania drukowania
   nagłówków odpowiedzi z preview, bo niosą `_vercel_jwt` z jawną
   wartością obejścia.
5. **Zmierzyć, co platforma dokłada sama** — jedyny krok, który musi
   wykonać właściciel, bo tej odpowiedzi **nie da się uzyskać z tej
   strony**: czy Vercel dodaje własny `Strict-Transport-Security` na
   swoich domenach (`B8`). Dziś produkcji nie ma (`vercel.json:4-6`),
   więc pomiar będzie możliwy przy Fazie 7. Dopóki go nie ma, `B8`
   zostaje przy statusie „brak na buildzie lokalnym, zachowanie platformy
   niesprawdzone".
6. **Decyzja o `security.txt`** (`B11`) — potrzebny adres kontaktowy,
   pod którym ktoś naprawdę odpowiada.

---

## 6. Czego ten dokument NIE mierzy

Ten rozdział jest częścią wyniku, nie zastrzeżeniem prawnym: werdykt
obowiązuje w zadeklarowanej dziedzinie, a poza nią jest **milczenie**,
nie zieleń.

1. **Zachowania na Vercelu.** Wszystkie nagłówki i sondowania zrobiono na
   **buildzie lokalnym**. Optymalizator obrazów na Vercelu jest usługą
   platformy i może zachowywać się inaczej niż `next start`. Zakaz 6
   odcina drogę do pomiaru na preview z tej strony.
2. **Produkcji.** Nie istnieje (`vercel.json:4-6`, ADR-030, Faza 7).
3. **Regionu bazy danych i Storage** — §3, pozycja otwarta.
4. **Skutku proponowanych napraw.** Żadnej nie wykonano; w szczególności
   „`images: { unoptimized: true }` usuwa punkt końcowy" jest
   **przewidywaniem**, które trzeba potwierdzić sondowaniem z §2.2.
5. **Pozostałych 32 plików HTML** buildu pod kątem skryptów wbudowanych
   i stylów — przeszukano `pl.html`.
6. **Konfiguracji panelu Vercela** (Firewall, Bot Protection, Deployment
   Protection) — stan odczytany z cudzych dokumentów, nie z panelu.
7. **Czy zabezpieczenie upada wyłącznie wtedy, kiedy trzeba** — czwarte
   pytanie o strażniku z kanonu nie ma dowodu w żadnym repertuarze i tu
   też go nie ma. Luka zapisana jako luka.
8. **Kosztu.** Ten dokument kosztów nie mierzy — wymienia luki, nie
   proporcję między nimi a nakładem na ich zamknięcie.

---

## 7. Ślad narzędziowy — czym mierzono i gdzie przyrząd był ślepy

Zapisane, bo trzy pomiary tej sesji **wyszły fałszywie zerowe** i każdy
został złapany kontrolą pozytywną, nie przeczuciem:

| przyrząd | ślepota | jak złapana | poprawka |
| --- | --- | --- | --- |
| `ls public/*.avif` | globbing zsh: „no matches found" → pusty adres → **fałszywe HTTP 400 na każdej sondzie** `/_next/image` | kontrola pozytywna nie znalazła własnego AVIF | `find public -name '*.avif'` |
| `grep --include=*.ts` | ten sam globbing → **fałszywe „0 przekierowań / 0 href"** | jak wyżej | cudzysłowy: `--include='*.ts'` |
| `timeout` przed `git ls-remote` | **nie istnieje na macOS**, wyjście 127 → **trzy fałszywe „zero gałęzi zdalnych"** | repozytorium z ustawionym `origin` i zerem gałęzi jest nieprawdopodobne; rozpoznane po wydrukowaniu stderr | bez `timeout`, z `GIT_TERMINAL_PROMPT=0` |
| `grep` po słowach „bezpieczeństwo / RODO" w katalogach | **zero kształtu wzorca** podane jako zero bytu | zdanie „Dane przechowywane w UE" renderuje się na stronie głównej | przeszukanie po kształcie (§3) |
| ścieżka `Documents/fbo os` | zły adres → „not a git repository" | kontrola pozytywna `git cat-file -e HEAD:CLAUDE.md` → brak, czyli przyrząd ślepy, a nie plik nieobecny | `find` wskazał `Documents/FBO OS/fbo-os/.git` |

Każdy adres URL ze zdalnych źródeł przepuszczono przez
`sed -E 's#//[^@/]*@#//<REDAGOWANE>@#g'`, żeby żaden token z `remote -v`
nie trafił do wyjścia.

---

**Zlecenie `WWW/101` KROK 2 zabrania napraw.** Żadna pozycja z §1 nie
została w tym commicie zamknięta; dokument dotyka wyłącznie `docs/`.
