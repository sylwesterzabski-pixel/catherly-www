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
| **B1** | 🔴 | **Brak Content-Security-Policy w jakiejkolwiek postaci** — także bez `Report-Only` | `next.config.ts:64-71` (jedyny nagłówek to `x-catherly-wydanie`), `vercel.json:1-8` (brak klucza `headers`), `src/middleware.ts` (nie ustawia żadnego nagłówka) | Pierwszy skrypt, który trafi na stronę nie z naszej ręki — z pomyłki w kodzie, z zależności, z przyszłego `rewrite` do aplikacji — wykonuje się bez żadnego ograniczenia źródła, bo przeglądarka nie dostaje polityki, którą mogłaby go zatrzymać. | `headers()` w `next.config.ts`: `Content-Security-Policy-Report-Only` **najpierw** (zebrać zgłoszenia), potem egzekwowana. Mierzona przeszkoda: build daje **20 skryptów wbudowanych bez `src`** i **0 atrybutów `nonce`** w `pl.html`, więc `script-src 'self'` bez `'unsafe-inline'` albo bez nonce **zabije stronę** — i to jest przyczyna, dla której ta luka jest 🔴, a nie jednolinijkowa. | **nie** (nagłówek nie renderuje się), ale błędna CSP **gasi arkusz i czcionki** — stąd obowiązkowa kolejność Report-Only → pomiar → egzekucja ⚠ **STAN PO KROKU 3 — §10.5**: CSP postawiona, ale **wyłącznie `Report-Only`**; propozycja trybu wymuszającego **WSTRZYMANA** — zmierzone **476** naruszeń `script-src-elem` na **30/30** tras, **0/30** stron czystych. |
| **B2** | 🔴 | **`/_next/image` żyje, przyjmuje żądania i transkoduje AVIF — a strona nie używa `next/image` ani razu.** Advisory `GHSA-2xp9-vwfh-vxw4` dotyczy dokładnie tego punktu końcowego i dokładnie plików AVIF | `next.config.ts:59-72` — **brak klucza `images`** w całym pliku (`grep -c images next.config.ts` = 0) | Najszersza powierzchnia ataku w całym serwisie — dekoder obrazów uruchamiany żądaniem HTTP — stoi otwarta po to, żeby obsłużyć komponenty, których w kodzie nie ma ani jednego. | Dwuczłonowo: `next@15.5.27` (poprawka istnieje — niżej `B3`) **oraz** `images: { unoptimized: true }` w `next.config.ts`. ⚠ **Skutek drugiego członu jest przewidywaniem, nie pomiarem** — po zmianie trzeba powtórzyć sondowanie z §2.2 i pokazać, że własny AVIF przestał dawać 200. | **nie** — `<Image` 0 wystąpień w `src/`, `import … from "next/image"` 0 wystąpień, obrazy renderuje 17 surowych `<img>` (świadomie, ADR o prowieniencji bajtów); wyłączenie optymalizatora nie dotyka ani jednego renderowanego obrazu |
| **B3** | 🔴 | **`next` 15.5.23 — advisory krytyczne, poprawka dostępna** (`npm audit --omit=dev`: 1 krytyczna + 3 wysokie, razem 4) | `package.json:39` → `"next": "^15.5.23"`; `package-lock.json` → zainstalowane **15.5.23** | Zakres podatny advisory to `9.3.4-canary.0 – 16.3.0-preview.10`, więc wersja na tej gałęzi mieści się w nim w całości, a jedno z dwóch advisory krytycznych opisuje zdalne wykonanie kodu przez ten sam punkt końcowy obrazów, który `B2` mierzy jako żywy. | `next@15.5.27` — **ta sama wersja, którą repozytorium aplikacji już niesie** (`package.json:182` wsadu), więc podniesienie nie wprowadza do organizacji nowej wersji frameworka, tylko dogania istniejącą. Podnosi też `B7` (audyt: `fixAvailable: true` dla wszystkich czterech). ⚠ **TO ZDANIE ZOSTAŁO OBALONE POMIAREM po podniesieniu — `WWW/102` KROK 1, §8.2 (audyt PO, 2026-10-07 20:20 CEST): podniesienie `next` zamknęło advisory WŁASNE `next`, a `B7` zostawiło otwarte w całości. Zostaje widoczne jako ślad przewidywania, nie jako ustalenie.** | **nie dla kodu strony** — zmiana nie dotyka `src/`; ale podniesienie wersji frameworka **wymaga porównania pikselowego** przed przyjęciem, bo render jest po stronie Next.js |
| **B4** | 🟠 | Brak `X-Frame-Options` i brak `frame-ancestors` w CSP | `next.config.ts:64-71`, `vercel.json:1-8` | Stronę da się zagnieździć w obcej ramce i podać za cudzą ofertę albo nakleić na nią warstwę przechwytującą kliknięcia. | `X-Frame-Options: DENY` **i** `frame-ancestors 'none'` w CSP (dwa mechanizmy, bo starsze przeglądarki czytają tylko pierwszy). Aplikacja ma `DENY` — wsad `next.config.mjs:47-62`. | **nie** ⚠ **ZAMKNIĘTE W KROKU 3 — §10.2** (oba mechanizmy: `X-Frame-Options: DENY` i `frame-ancestors 'none'`), w dziedzinie §10.9. |
| **B5** | 🟠 | Brak `X-Content-Type-Options: nosniff` | `next.config.ts:64-71` | Przeglądarka zgaduje typ treści przy odpowiedziach, których typu nie rozpozna, i może wykonać jako skrypt coś, co miało być plikiem. | `X-Content-Type-Options: nosniff`. Aplikacja go ma — wsad `next.config.mjs:47-62`. | **nie** ⚠ **ZAMKNIĘTE W KROKU 3 — §10.2**, w dziedzinie §10.9. |
| **B6** | 🟠 | Brak `Referrer-Policy` | `next.config.ts:64-71` | Wyjście z naszej strony niesie do obcego serwera pełny adres strony, z której odwiedzająca wyszła — a plan Fazy 5 wprowadza `rewrite` tras logowania do aplikacji (`next.config.ts:61-63`, ADR-005), czyli dokładnie ruch, przy którym to zaczyna znaczyć. | `Referrer-Policy: strict-origin-when-cross-origin` — identycznie jak aplikacja (wsad `next.config.mjs:47-62`). | **nie** ⚠ **ZAMKNIĘTE W KROKU 3 — §10.2**, w dziedzinie §10.9. |
| **B7** | 🟠 | Trzy zależności produkcyjne z advisory **wysokim**: `postcss` 8.4.31, `source-map-js` 1.2.1, `sharp` 0.35.3 ⚠ **(ta ostatnia liczba jest z ZŁEGO WĘZŁA — sprostowanie i powód w §8.3; audyt `--omit=dev` flaguje `node_modules/next/node_modules/sharp@0.34.5`)** | `package-lock.json` (wszystkie trzy są zależnościami przechodnimi `next`) | Żadna z trzech nie ma w tym serwisie drogi wejścia od odwiedzającej — nie przyjmujemy ani CSS, ani wgrywanych obrazów — więc ryzyko siedzi w łańcuchu budowania, a nie w przeglądarce; advisory jednak nie znika od tego, że droga jest wąska. | Podniesienie `next` (`B3`) — audyt podaje `fixAvailable: true` dla każdej z czterech pozycji. ⚠ **OBALONE pomiarem — §8.2.** Po `next@15.5.27` wszystkie trzy advisory tej pozycji stoją nietknięte, a `postcss` proponuje już wyłącznie `next@16.4.0` (`isSemVerMajor: true`), czyli wyjście POZA major. `B7` zostaje **otwarte**; `WWW/102` go nie obejmuje (zakaz 8). | **nie** (jak `B3`) |
| **B8** | 🟡 | Brak `Strict-Transport-Security` na buildzie lokalnym | `next.config.ts:64-71` | Pierwsze wejście pod `http://` nie zostaje przez przeglądarkę zapamiętane jako „tylko HTTPS", więc kolejne da się zepchnąć na połączenie nieszyfrowane. | `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` **tylko na produkcji**, jak w aplikacji (wsad `next.config.mjs:47-62`, tam pod warunkiem środowiska). ⚠ **Czy platforma dokłada własny HSTS na swoich domenach — NIESPRAWDZONE**, i to jest granica pomiaru, nie wniosek: zakaz 6 nie pozwala drukować nagłówków odpowiedzi z preview, a produkcji nie ma (`vercel.json:4-6`). Pomiar należy do właściciela — §5 krok 5. | **nie** ⚠ **WYKONANE INACZEJ NIŻ TA PROPOZYCJA — §10.6**: `max-age=63072000` **bez** `includeSubDomains` i **bez** `preload`. Rozjazd świadomy, powód przy wierszu w §10.6 — nie przeoczenie. |
| **B9** | 🟡 | Brak `Permissions-Policy` | `next.config.ts:64-71` | Strona nie odbiera kamerze, mikrofonowi ani lokalizacji dostępu, którego sama nigdy nie używa, więc skrypt wstrzyknięty w przyszłości zastanie te możliwości otwarte. | `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()` — **ostrzej niż aplikacja**, która trzyma `microphone=(self)`, bo strona marketingowa nie ma do mikrofonu żadnego zastosowania. | **nie** ⚠ **WYKONANE INACZEJ NIŻ TA PROPOZYCJA — §10.6**: 15 zdolności odebranych, **bez** `interest-cohort`. Rozjazd świadomy; jego powód opiera się na **odczycie zachowania przeglądarki, nie na pomiarze w tym kroku** — i tak ma być czytany. |
| **B10** | 🟡 | Brak `Cross-Origin-Opener-Policy` i `Cross-Origin-Resource-Policy` | `next.config.ts:64-71` | Okno otwarte z naszej strony zachowuje do niej uchwyt, a nasze zasoby wolno wciągać z obcych dokumentów. | `COOP: same-origin`, `CORP: same-origin`. Mierzony koszt tej luki jest dziś najniższy z całej tabeli: build daje **0 odesłań `target="_blank"`** i **0 adresów zewnętrznych**. W aplikacji ta sama para jest **również nieobecna** — zmierzone wprost w `next.config.mjs` wsadu: `Cross-Origin-Opener` 0 wystąpień, `Cross-Origin-Resource` 0, przy kontroli pozytywnej `X-Frame-Options` 1; wsad opisuje to jako własną **pozycję L40**. Czyli luka wspólna, nie asymetria. | **nie** |
| **B11** | 🟡 | Brak `/.well-known/security.txt` | `public/` — pliku nie ma; nie ma też `public/_headers` | Kto znajdzie lukę, nie ma gdzie przeczytać, komu ją zgłosić, więc zgłoszenie albo nie przyjdzie, albo przyjdzie kanałem publicznym. | Plik `public/.well-known/security.txt` wg RFC 9116 z adresem kontaktowym i datą wygaśnięcia. **Decyzja właściciela, nie defekt techniczny** — wymaga adresu, pod którym ktoś naprawdę odpowiada. | **nie** |
| **B12** | 🟡 | **Asymetria z aplikacją: aplikacja ma zestaw nagłówków, strona nie ma ani jednego** | wsad `next.config.mjs:47-62` wobec `next.config.ts:64-71` | Oba serwisy staną pod jedną marką i prawdopodobnie pod jedną domeną, a mają dwa różne poziomy zabezpieczenia przeglądarkowego — i słabszy jest ten, który odwiedzająca zobaczy pierwszy. | Zamknięcie `B1`, `B4`, `B5`, `B6`, `B8`, `B9` zamyka tę pozycję jako skutek. Wiersz istnieje osobno, bo **różnicę widać tylko z dwóch stron naraz** i żadna pojedyncza naprawa jej nie nazwie. ⚠ Nie kopiować konfiguracji aplikacji wprost: jej CSP jest **Report-Only i z `'unsafe-inline'`** — zmierzone w `next.config.mjs` wsadu: `:56` to `Content-Security-Policy-Report-Only`, a `:22` i `:32` niosą `'unsafe-inline'` w `script-src` i `style-src`; wsad opisuje to jako własną **pozycję L13** („CSP niczego nie blokuje"). Przeniesiona tu dałaby napis zamiast mechanizmu. | **nie** ⚠ **STAN PO KROKU 3 — §10.11**: przedmiot tego wiersza („strona nie ma ani jednego") **zamknięty** — strona ma sześć. Asymetria **trybu** została, ale w drugą stronę niż opisuje wiersz: CSP strony jest **ostrzejsza**, bo bez `'unsafe-inline'`. |

**Rozkład: 🔴 3 · 🟠 4 · 🟡 5 = 12 pozycji.** Liczby policzone z wierszy
tabeli powyżej przy tej edycji, nie przepisane.

**Ten rozkład opisuje stan `42c84ab` i nie jest przepisywany przy
zamykaniu pozycji** — dokument z zadeklarowanym zakresem się nie starzeje.
Co z tej tabeli zamknęło zlecenie `WWW/102`, czym to zmierzono i czego ten
pomiar nie widzi — **wyłącznie §8**, z własnym nagłówkiem zakresu i własną
datą. Wiersze powyżej dostają przy obalonych zdaniach adnotację ⚠ z
odesłaniem, nigdy podmianę treści.

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
| `sharp` | 0.35.3 ⚠ **ZŁY WĘZEŁ — zmierzony audytowany węzeł to `node_modules/next/node_modules/sharp@0.34.5`; 0.35.3 to węzeł deweloperski. Sprostowanie: §8.3** | wysoka | `<=0.35.5-rc.1` | `GHSA-f88m-g3jw-g9cj` (libvips) · `GHSA-rgj7-g3m4-5g8c` (libheif) · `GHSA-wq5f-xc86-pv6w` (librsvg) |
| `source-map-js` | 1.2.1 | wysoka | `1.0.0 – 1.2.1` | `GHSA-68fv-2mgg-jv7q` (7,5 — zablokowanie pętli zdarzeń) |

`fixAvailable: true` dla wszystkich czterech; droga wyjścia to jedno
podniesienie — `next@15.5.27`.

⚠ **ZDANIE POWYŻEJ ZOSTAŁO OBALONE POMIAREM — `WWW/102` KROK 1, §8.2.**
Podniesienie wykonane, audyt powtórzony: zamknęło **dwa advisory własne
`next`**, a `postcss`, `sharp` i `source-map-js` zostały nietknięte i
proponują już wyłącznie `next@16.4.0` (`isSemVerMajor: true`) albo niosą
`fixAvailable: true` bez wskazanej wersji. Zostaje widoczne jako ślad:
było **przewidywaniem podanym składnią odczytu**, a przewidywania od
odczytów nie da się odróżnić po formie.

**Korekta wobec własnej wcześniejszej notatki tej sesji, bez zamazania
śladu:** zapisałem `sharp@0.34.5`; odczyt `package-lock.json` daje
**0.35.3**. Obie liczby zostają widoczne, obowiązuje zmierzona.

⚠ **TA „KOREKTA" BYŁA SAMA BŁĘDNA — sprostowanie w §8.3, oba zapisy
zostają.** Odczytałem węzeł `node_modules/sharp` (**deweloperski**,
0.35.3), a audyt z flagą `--omit=dev` flaguje węzeł
`node_modules/next/node_modules/sharp` (**produkcyjny**, 0.34.5 —
`nodes: ["node_modules/next/node_modules/sharp"]` w obu przebiegach).
Obie liczby są prawdziwe dla dwóch różnych węzłów jednego drzewa; dla
**tego** audytu obowiązuje **0.34.5**, czyli notatka pierwotna, nie moja
poprawka. Klasa: **„zero z jednej postaci nie jest zerem bytu"**
przeniesiona na wersję — jeden pakiet, dwa węzły, dwie prawdziwe liczby,
a pytanie brzmiało „który węzeł mierzy TO narzędzie".

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
| `fbo-os` nietknięte — ⚠ **DOWÓD PRZEPISANY PO KONTROLI ADWERSARYJNEJ 2026-10-07 19:25, BO PIERWSZY ZESTARZAŁ SIĘ W TEJ SAMEJ DOBIE** | Stało tu: ~~„**60 refów przed i po**, `HEAD 8660df53` bez zmian"~~ — prawdziwe w chwili pomiaru i **nieprawdziwe od 18:52 tego samego dnia**: tamto repozytorium stoi dziś na `0218e4eb`, gałąź `feat/cs-build`, bo doszły **dwa commity cudzej sesji** (`565edfc8` 18:52:56 „APP/058 — cztery pułapki żywej bazy", `0218e4eb` 18:57:05 „RECZ-415"). Dowód przepisany na postać, której cudza praca nie unieważnia: `8660df53` jest **przodkiem** `0218e4eb` (`git -C … merge-base --is-ancestor 8660df53 HEAD` → 0), czyli tamta historia została **przedłużona, nie przepisana**; **60 refów** nadal, przed i po; obiekt `0a5678c3` tam **nadal nieobecny**, przy kontroli pozytywnej tego samego polecenia w tym samym przebiegu (`git cat-file -t HEAD` → `commit`); **czubek wsadu nieruszony** — `git ls-remote origin refs/heads/claude/app-064` → `0a5678c3960c…`, zgodny z klonem, więc odczytany wsad nadal da się odtworzyć. Każde moje polecenie w tym katalogu było odczytem (`git log`, `git show-ref`, `git status`, `git cat-file`, `git merge-base`); wsad wzięty klonem `--depth 1 --single-branch` do katalogu sesji | **drzewa roboczego**: `git status --porcelain` w `fbo-os` pokazywał **16** niezacommitowanych zmian przy pomiarze i **8** po tamtych dwóch commitach. Pomiaru „przed" dla drzewa roboczego **nie mam w żadnym z brzmień** — mam natomiast to, że żadne moje polecenie tam nie zapisywało. ⚠ **Czego uczy ta korekta:** dowód nieingerencji oparty na **czubku cudzej gałęzi** i na **liczbie cudzych zmian** starzeje się razem z cudzą pracą, a starzeje się w stronę, która obciąża mnie — czytelnik mierzący nazajutrz widzi inny czubek i inną liczbę i nie ma jak odróżnić cudzego commita od mojego zapisu. Nieruchome są wyłącznie **relacje**: przodek, obecność obiektu, czubek wsadu. Pułapka w rozdz. 9 przekazania |

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

---

## 8. WWW/102 KROK 1 — `B3` zamknięte podniesieniem (inne zlecenie, własny zakres)

Rozdziały 1–7 powstały pod zleceniem `WWW/101`, które **zabraniało
napraw**. Ten rozdział powstał pod zleceniem **`WWW/102`**, które naprawy
nakazuje — i dlatego niesie **własny nagłówek zakresu**, a nie dopisek do
nagłówka na górze pliku. Gdyby liczby z poniższych pomiarów schowały się
pod datą „17:59–18:20", cała górna tabela zaczęłaby kłamać o godzinie
własnego pomiaru.

| co | wartość |
| --- | --- |
| Zlecenie | `WWW/102`, KROK 1 — „`next` 15.5.23 → 15.5.27 (+ powiązane w obrębie majora); `npm audit --omit=dev` przed/po z datą; build, testy, e2e" |
| Repozytorium | `sylwesterzabski-pixel/catherly-www`, gałąź `faza-4/podstrony` |
| Stan drzewa w chwili pomiarów | `HEAD` = `7817580f37561c76323d4f72ad57d598ef05f593` = czubek zdalnej (`git ls-remote origin faza-4/podstrony`), `git status --porcelain` = dokładnie dwa pliki: ` M package.json`, ` M package-lock.json` |
| Data pomiarów | **2026-10-07**, 19:54 – 20:55 CEST |
| Przedmiot | wyłącznie wersja frameworka i jej skutki: audyt, build, testy, bramki, **wygląd pikselowy** |
| Czego ten rozdział **nie** robi | nie dotyka `src/`, `content/`, `design/tokens.json`; nie zamyka `B1`, `B2`, `B4`–`B12`; nie włącza żadnego nagłówka ani CSP (to KROK 2 i 3 tego zlecenia); **nie pushuje** — zgody na push dla `WWW/102` nie ma |

### 8.1. Co zostało zmienione — dwa pliki, zero linii kodu strony

| plik | przed | po |
| --- | --- | --- |
| `package.json` → `dependencies.next` | `^15.5.23` | `^15.5.27` |
| `package.json` → `devDependencies["eslint-config-next"]` | `^15.5.23` | `^15.5.27` |
| `package-lock.json` → `node_modules/next` | `15.5.23` | `15.5.27` |

**Węzeł, który się NIE ruszył, a wygląda, jakby powinien:**
`node_modules/next/node_modules/sharp` stoi na **0.34.5 przed i po**
(odczyt `package-lock.json` w obu stanach plus `require` z dysku). To nie
drobiazg porządkowy — to **przyczyna** tego, że `B7` zostało otwarte
(§8.2): podniesienie `next` w obrębie majora nie przesuwa przypiętego
`sharp`.

### 8.2. Audyt przed i po — mierzony WĘZŁEM I `via`, nie podsumowaniem

Dwa przebiegi `npm audit --omit=dev --json`, oba z datą:
**PRZED 2026-10-07 19:54 CEST**, **PO 2026-10-07 20:20 CEST** (odczyt
powtórzony 20:36:33 CEST, bez zmiany). `metadata.dependencies` identyczne
w obu: `prod 41 · dev 731 · optional 116 · peer 1 · total 830` — czyli
porównuję to samo drzewo, a nie dwa różne.

| | PRZED (15.5.23) | PO (15.5.27) |
| --- | --- | --- |
| `metadata.vulnerabilities` | `moderate 0 · high 3 · critical 1 · total 4` | `moderate 1 · high 3 · critical 0 · **total 4**` |
| `next` — advisory **własne** | **2**: `1193677` (`GHSA-p293-qw3h-jr36`, CVSS 9,0, RCE bez uwierzytelnienia na Windows) · `1193733` (`GHSA-2xp9-vwfh-vxw4`, **RCE w Image Optimization API przy AVIF** — punkt końcowy, który `B2` mierzy jako żywy) | **0** |
| `next` — `via` (co się przez niego propaguje) | `["postcss", "sharp"]` | `["postcss"]` |
| `next` — waga | **krytyczna** | **umiarkowana** (wyłącznie jako skutek `postcss`) |
| `next` — `fixAvailable` | `true` | `{"name":"next","version":"16.4.0","isSemVerMajor":true}` |
| `postcss` — własne | 4 (`1117015`, `1124252`, `1130709`, `1139510`) | **te same 4, nietknięte**; `fixAvailable` już tylko `next@16.4.0`, major |
| `sharp` — własne, węzeł `node_modules/next/node_modules/sharp` | 3 (`1124066` libvips, `1193725` libheif, `1241331` librsvg) | **te same 3, nietknięte**, `fixAvailable: true` |
| `source-map-js` — własne | 1 (`1241209`, 7,5 — zablokowanie pętli zdarzeń) | **nietknięte**, `fixAvailable: true` |

**PUŁAPKA CZYTELNIKA, ZAPISANA JAKO PUŁAPKA: `total` STOI NA 4 PRZED I PO,
A TREŚĆ ZMIENIŁA SIĘ CAŁKOWICIE.** Kto porówna same podsumowania, odczyta
„podniesienie nic nie dało" — i będzie to wniosek **fałszywy**: zniknęły
**oba advisory własne `next`**, w tym to o zdalnym wykonaniu kodu przez
optymalizator obrazów. Liczba 4 trzyma się, bo `next` nie wypadł z listy —
**został w niej jako SKUTEK `postcss`**, z zerem advisory własnych.
Jedyne pole, które to rozróżnia, to `via` (obiekt = advisory **tego**
pakietu, ciąg = advisory przeniesione **przez** niego) i `nodes`.
**Metoda, nie anegdota:** audyt porównuje się po `nodes` i `via`, nigdy po
`metadata.vulnerabilities`; podsumowanie jest sumą dwóch różnych rzeczy
i przy tej parze przebiegów **nie odróżnia naprawy od jej braku**.

**Co z tego wynika dla zakresu zlecenia.** `WWW/102` KROK 1 mówi
„+ powiązane **w obrębie majora**". Po podniesieniu jedyna droga, jaką
audyt proponuje dla `postcss` (i dla `next` jako jego skutku), to
`next@16.4.0` z `isSemVerMajor: true` — czyli **poza** literę zlecenia.
`sharp` i `source-map-js` niosą `fixAvailable: true`, ale należą do `B7`,
którego to zlecenie nie obejmuje: **zgłoszone, nie naprawione** (zakaz 8).

**Status `B3`: ZAMKNIĘTE** w dziedzinie „advisory własne `next`" —
2 → 0. Poza tą dziedziną ten rozdział nie orzeka nic.

### 8.3. Sprostowanie wersji `sharp` — dwa węzły, dwie prawdziwe liczby

| węzeł w drzewie | wersja | widzi go `--omit=dev`? |
| --- | --- | --- |
| `node_modules/next/node_modules/sharp` | **0.34.5** | **TAK** — to jego podaje `nodes` w obu przebiegach audytu |
| `node_modules/sharp` | 0.35.3 | nie — `devDependencies.sharp: ^0.35.3`, `dependencies.sharp` nie istnieje |

Sprawdzone trzema odczytami w jednym przebiegu: `package-lock.json`
w stanie bieżącym, `git show 42c84ab:package-lock.json` (stan z nagłówka
`WWW/101`) i `require` z dysku. **Wszystkie trzy dają tę samą parę** —
czyli błąd nie powstał przy podniesieniu, tylko przy pierwszym zapisie
w §2.5: dla audytu `--omit=dev` wpisano tam wersję węzła
**deweloperskiego**.

Ślad zostaje w trzech miejscach naraz (§1 `B7`, §2.5 tabela, §2.5
„korekta"), bo wszystkie trzy niosły tę samą pomyłkę, a **sprostowanie
jednego wystąpienia nie domyka klasy** — domyka ją przeliczenie zdań tej
samej formy.

### 8.4. Bezpiecznik wyglądu — werdykt, jego dziedzina i jego ślepota

Zasada zlecenia: *„ZERO zmian widocznych — wygląd ustala Figma; po każdym
kroku porównanie pikselowe; różnica > 0 → cofnij krok, STOP."*

**Przyrząd.** Dwa stanowiska naraz, każde z własnym `node_modules`:
wzorzec z osobnego worktree na `7817580` (`next 15.5.23`, `WWW_DIST=.next-baza`,
port 3100) i kandydat (`next 15.5.27`, `WWW_DIST=.next-kandydat`, port
3200). Zrzuty Playwrightem na `sharp` **z istniejących `devDependencies`** —
bezpiecznik nie wnosi żadnej nowej zależności.

**Zbiór zrzutów liczony ze źródła dwa razy niezależnie, nie przepisany:**
z rejestru `src/i18n/sciezki.ts` (`MAPA_STOPKI` + `WYLACZONE_Z_MAPY` +
`PRERENDEROWANE_BEZ_ADRESU`) i z drzewa `src/app/[locale]/**/page.tsx`;
rozjazd między wyprowadzeniami **kończy przebieg**, żeby „60 zrzutów" nie
mogło znaczyć „60 zrzutów złego podzbioru". Catch-all `[...sciezka]`
pominięty **z odczytu, nie z wygody**: middleware przepisuje każdą ścieżkę
spoza rejestru na `/[locale]/nie-znaleziono`, więc jest nieosiągalny.
**10 tras × 3 języki (pl/en/de) × 2 kadry (1440/390) = 60.**

| pomiar (2026-10-07) | wynik | co z tego wynika |
| --- | --- | --- |
| **wzorzec vs kandydat**, 20:55 CEST | **0 różnych pikseli / 249 691 830 porównanych**, 60/60 plików, exit 0 | różnicy nie ma w dziedzinie, którą ten przyrząd widzi |
| **podłoga szumu** — ten sam binarny serwer wzorca, dwa niezależne przebiegi | 0 / 249 691 830, exit 0 | zero powyżej **nie** jest zerem przypadkowym: sam przyrząd nie generuje szumu |
| **kontrola pozytywna w tym samym przebiegu** — jeden piksel podmieniony ręcznie | **1 piksel** w `1440--pl--_korzen.png`, `(700,500)`, `maxDelta 1`, exit 1 | przyrząd wykrywa **różnicę 1/255 na jednym z 249 mln pikseli**; zero jest zerem narzędzia **patrzącego**, nie milczącego |

**ŚLEPOTA NAZWANA PRZY WERDYKCIE, NIE POD NIM.** Harness wymusza
`reducedMotion: "reduce"` (bo inaczej animacja daje różnicę niepochodzącą
od zmiany w kodzie). Odczyt zagnieżdżenia nawiasów w `src/app/globals.css`
pokazuje, że **cała warstwa poświaty** —
`[data-ton="ciemny"]:where(section)::after` w linii **906** — leży wewnątrz
`@media (prefers-reduced-motion: no-preference)` otwartego w linii **785**
(kontrola pozytywna metody: `:root` w linii 105 otwiera sam siebie, głębia 0).
Nie chodzi więc o samą animację `ruch-oddech` (linia 917), lecz o to, że
**pod tym harnessem ta warstwa w ogóle nie istnieje**. Zero różnic nie
mówi o niej nic. To zarazem odpowiedź na pozycję rejestru **T87**, która
przewidywała na stronie głównej niedeterminizm: przewidywanie nie
zmaterializowało się **z przyczyny mechanicznej odczytanej z konfiguracji**,
nie dzięki szczęściu.

**Ślepota domknięta drugim przyrządem, nie zapewnieniem.** Arkusz
niosący `ruch-oddech` to w obu buildach `4bda5517d931cce7.css`,
**11 077 B**, `sha256` (pierwsze 16 znaków) **`8760a8f2f44b0e0f`** —
bajt w bajt identyczny. Kontrola pozytywna przyrządu: `grep` widzi
`ruch-oddech` **2×** w `src/app/globals.css`, czyli nie szuka na oślep.

**Czego porównanie pikselowe NIE mierzy** (zapisane, żeby nikt nie wziął
zera za więcej, niż ono znaczy): nagłówków HTTP, DOM, atrybutów
dostępności, zachowania pod `hover`/`focus`/klawiaturą, kadrów innych niż
1440 i 390, oraz — jak wyżej — wszystkiego, co istnieje tylko przy
`prefers-reduced-motion: no-preference`.

### 8.5. Build, testy, bramki — z kodami wyjścia i kontrolą negatywną czerwieni

| sprawdzenie | wynik |
| --- | --- |
| `npm run lint` (`eslint . --max-warnings=0`) | exit **0** |
| `WWW_DIST=.next-kandydat npm run build` | exit **0**, `▲ Next.js 15.5.27`, `✓ Generating static pages (33/33)` (wzorzec: te same 33/33 na `15.5.23`) |
| `npm run test:e2e` | **1388 passed · 12 skipped**, 1400 testów / 5 workerów, exit **0**, 1,6 min |

Bramki przeliczone **ponownie 2026-10-07 20:54 CEST**, kody wyjścia
odczytane z `$?`, nie z treści logu:

| bramka | exit | uwaga |
| --- | --- | --- |
| `bramka:tokeny` · `:liczby` · `:parytet` · `:linki` · `:kotwice` · `:nojs` | **0** | zielone |
| `bramka:deklaracje` | **0** | ⚠ **zieleń ZAPADKI, nie zieleń stanu** — własne wyjście bramki pisze: `naruszeń teraz 2 · próg (baseline) 2 · ZIELONA — nie jest gorzej niż było` i wprost ostrzega „CISZA — NIE ZIELEŃ: 2 rozjazdów NADAL STOI" (`T44`). Cytowanie tego jako „deklaracje poprawne" byłoby werdyktem poza dziedziną |
| `bramka:kontrakt` | **1** | **czerwona** |
| `bramka:nieodwracalne` | **1** | **czerwona** |

**KONTROLA NEGATYWNA DLA OBU CZERWIENI, W TYM SAMYM PRZEBIEGU I NA TYM
SAMYM COMMICIE:** oba skrypty dają exit 1 również **w worktree wzorca na
`next 15.5.23`**. Podniesienie **nie jest ich przyczyną** — i tylko ta
kontrola pozwala to powiedzieć; sama czerwień po zmianie nie odróżnia
„zepsute przez zmianę" od „zepsute przedtem".

- `bramka:kontrakt` — ADR-042, stan przechodni; **własne wyjście skryptu
  zabrania obejścia**: „NIE wyłączać, NIE podnosić progu". Zakaz 3.
- `bramka:nieodwracalne` — `scripts/check-audyt.mjs` wymaga pliku `.md`
  w `docs/audyt/` zawierającego **bieżący skrót `HEAD`**; `ls docs/audyt/`
  daje dokładnie jeden plik: `README.md`. Bramka jest więc czerwona
  **planowo** (rejestr: `T2`, `T83`) i nie da się jej zazielenić bez
  zlecenia na audyt nieodwracalnych.

**Czerwień uzasadniona też jest czerwienią** (ADR-020). Oba te wyniki
raportuję jako czerwone, nie jako „znane".

### 8.6. Co po KROKU 1 zostaje otwarte

| pozycja | stan po tym kroku |
| --- | --- |
| `B3` | **zamknięte** — w dziedzinie z §8.2 |
| `B7` | **otwarte w całości** — `postcss` (4), `sharp` (3), `source-map-js` (1); droga wyjścia, jaką podaje audyt, wychodzi poza major, czyli poza literę zlecenia |
| `B2` | otwarte — KROK 2 tego zlecenia |
| `B1`, `B4`, `B5`, `B6`, `B8`, `B9`, `B12` | otwarte — KROK 3 tego zlecenia (CSP wyłącznie jako `Report-Only`, przełączenie na egzekwowaną ma być **propozycją bez wykonania**) ⚠ **ROZSTRZYGNIĘTE W KROKU 3 — §10.11**: `B4`, `B5`, `B6` zamknięte (§10.2); `B8`, `B9` zamknięte **z rozjazdem** wobec propozycji §1 (§10.6); `B1` zamknięte **wyłącznie** jako `Report-Only`, a propozycja trybu wymuszającego **WSTRZYMANA** z liczbą 476 (§10.5); `B12` zamknięte co do przedmiotu wiersza. |
| `B10` (COOP/CORP), `B11` (`security.txt`) | **otwarte i POZA zleceniem `WWW/102`** — zlecenie ich nie wymienia; zapisane tutaj wprost, żeby zamknięcie kroków 1–3 nie zostało przeczytane jako zamknięcie §1 |

### 8.7. Ślad narzędziowy KROKU 1 — gdzie przyrząd był ślepy

| przyrząd | ślepota | jak złapana | poprawka |
| --- | --- | --- | --- |
| `metadata.vulnerabilities` z `npm audit` | `total 4` przed i po — **wygląda jak brak zmiany**, a zmieniło się wszystko w treści | porównanie po `nodes`/`via` w tym samym przebiegu | werdykt stawiany wyłącznie na advisory własnych pakietu, nigdy na podsumowaniu |
| odczyt `node_modules/sharp` | zły węzeł drzewa — wersja prawdziwa, pakiet prawdziwy, **audyt mierzy inny węzeł** | pole `nodes` w JSON-ie audytu wskazuje `node_modules/next/node_modules/sharp` | §8.3; pytanie „**który węzeł mierzy TO narzędzie**" zadawane przed zapisem wersji |
| porównanie pikselowe z `reducedMotion: "reduce"` | warstwa istniejąca tylko przy `no-preference` **nie trafia do żadnego zrzutu** | odczyt zagnieżdżenia `@media` w `globals.css` (785 → 906) z kontrolą pozytywną na `:root` | domknięcie drugim przyrządem: `sha256` arkusza niosącego tę warstwę |
| `tr '}' '}\n'` przy liczeniu reguł CSS | `tr` odwzorowuje znak na znak — drugi znak w zbiorze docelowym jest **ignorowany**, plik został jednolinijkowy, a `diff` orzekł `1c1` | `wc -l` na wyniku dał 1 | dzielenie fragmentów w Node, nie `tr` |
| `$(find …)` bez cudzysłowów | ścieżka repozytorium zawiera spację → rozbicie na słowa → `shasum: /Users/sylwesterzabski/Documents/FBO: No such file` i przebieg w limicie czasu | komunikat błędu wskazał ucięty prefiks ścieżki | `find … -print0 \| while IFS= read -r -d '' f` |

**Czego KROK 1 nie zmierzył, choć kusi tak przeczytać:** nie sprawdzono
zachowania na wdrożeniu (preview ani produkcji — `vercel.json:4-6`), nie
mierzono wydajności (`bramka:pomiar` nie była uruchamiana), nie sprawdzono
nagłówków odpowiedzi (to KROK 3), a cały bezpiecznik wyglądu **żyje poza
repozytorium** — w katalogu sesji, więc nikt nie powtórzy go z samego
repozytorium. Zapisane jako pozycja rejestru **T94**.

## 9. WWW/102 KROK 2 — `B2` zamknięte wyłączeniem optymalizatora obrazów

Zlecenie `WWW/102` KROK 2, dosłownie: *„wyłączenie optymalizatora obrazów,
skoro `src/` nie używa `next/image` (`images.unoptimized` albo równoważne) —
`/_next/image` ma przestać odpowiadać 200 (sonda przed/po)"*.

Zmiana to **jedna linia konfiguracji** plus komentarz, który mówi, czego ta
linia **nie** znaczy. Ani jednego pliku `src/`, `design/tokens.json` ani
`content/`.

### 9.1. Pytanie zerowe przed wszystkimi innymi

**CZY TA RZECZ W OGÓLE ISTNIEJE** — i odpowiedział na to **odczyt
konfiguracji**, nie mutacja (ADR-018). W `next.config.ts` **nie było klucza
`images` w żadnej postaci**: 0 trafień `images`, 0 trafień `unoptimized`,
przy kontroli pozytywnej `distDir` → 1 i `headers` → 1 w tym samym
przebiegu. Gdyby klucz już stał, zmiana byłaby nadpisaniem cudzej decyzji
bez ADR-u, a nie wyłączeniem zdolności.

### 9.2. Przesłanka zlecenia ZMIERZONA, NIE PRZYJĘTA

Zlecenie podaje powód („`src/` nie używa `next/image`") jako fakt. **Fakt
podany w zleceniu jest dla wykonawcy hipotezą do pomiaru, nie przesłanką do
użycia** — tym bardziej że pierwszy odruchowy pomiar ten powód **zdawał się
obalać**:

| pomiar | wynik | kontrola pozytywna w tym samym przebiegu |
| --- | --- | --- |
| `import … from "next/image"` w `src/` | **0** | `next-intl` → **25 plików** |
| element `<Image` w `src/` | **0** | `<section` → **25 linii** |
| ciąg `next/image` w `src/` | **3 trafienia** | — |

Trzecie trafienie było alarmem — i **fałszywym**. Trzy wystąpienia to
**komentarze mówiące, dlaczego stoi tam surowy `<img>`**:
`DbanieOSiebie.tsx:34`, `ModulFunkcji.tsx:74`, `Filar.tsx:185`. Alarm
„przesłanka zlecenia jest FAŁSZYWA" postawiłem **przed odczytaniem tych
trzech linii** i wycofałem po odczytaniu. Zapisane, bo klasa jest
przenośna: **`grep -l` mówi, w których plikach ciąg jest, a nie czym tam
jest** — a różnica między użyciem i komentarzem o nieużywaniu jest tu
różnicą między „zlecenie się myli" i „zlecenie ma rację".

Powód unikania zapisany w tamtych komentarzach jest z tą zmianą **zgodny**:
optymalizator przekodowuje plik na żądanie, więc szłyby inne bajty niż te,
których sumy stoją w ADR-ach.

### 9.3. Sonda przed i po — i co dokładnie znaczą jej kody

Przyrząd: `sonda-optymalizator.mjs`, trzy klasy żądań w jednym przebiegu.
**POMIAR** — żądania poprawne (muszą dać 200, gdy optymalizator żyje).
**KSZTAŁT** — żądania wadliwe (muszą dać 4xx; to one dowodzą, że 200 z
POMIARU pochodzi od *walidującego* optymalizatora, a nie od czegokolwiek pod
tym adresem). **STATYK** — plik wprost z `public/` i korzeń strony; to
kontrola żywości serwera, bez której każde 4xx byłoby objawem martwego
stojaka, nie wyłączonego punktu końcowego.

| stojak | `next.config.ts` | `BUILD_ID` | exit | POMIAR | KSZTAŁT | STATYK |
| --- | --- | --- | --- | --- | --- | --- |
| kandydat :3200 | **ze zmianą** | `OJ3DLkCIsUF3qFUp3IDXy` | **11** | 0/2 → **404** | 5/5 → 404 | 2/2 → **200** |
| kandydat :3200 | **BEZ zmiany (mutacja)** | `7QBvxwPLV4LDIlbzCh2eF` | **10** | **2/2 → 200** | 5/5 → **400** | 2/2 → 200 |
| kandydat :3200 | **ze zmianą (powrót)** | `TIvoYeMUX1Npg7sm_ZpQD` | **11** | 0/2 → 404 | 5/5 → 404 | 2/2 → 200 |
| baza 7817580 :3100 | bez klucza, `next` 15.5.23 | — | **10** | 2/2 → 200 | 5/5 → 400 | 2/2 → 200 |

**Werdykt: `/_next/image` przestał odpowiadać 200** — dokładnie to, czego
żądał KROK 2.

**Mutacja z kontrolą nałożenia, nie samo „po zmianie".** Ciąg **11 → 10 →
11** na tym samym stojaku, z **trzema różnymi `BUILD_ID`**, odizolowuje
przyczynę do **tej jednej linii**: zdjęcie jej wraca optymalizator do życia,
dołożenie znów go gasi. Trzy różne `BUILD_ID` są tu drugą połową dowodu —
bez nich ten sam wynik dałby stojak serwujący **stary katalog budowania**,
czyli pomiar nieaktualnych bajtów przy aktualnym pliku konfiguracji.

**Przesunięcie 400 → 404 w kolumnie KSZTAŁT jest osobnym śladem i mówi
więcej niż sam werdykt.** Przy żywym optymalizatorze wadliwe żądania dostają
**400** — to on je **waliduje i odrzuca**. Po zmianie dostają **404**, tak
samo jak żądania poprawne: **trasy nie ma wcale**. Czyli `unoptimized: true`
nie „zaostrza walidacji" i nie „wyłącza przekodowania zostawiając punkt
końcowy" — **usuwa powierzchnię**. Tego rozróżnienia sam kod wyjścia 11 nie
niesie.

**Kontrola negatywna:** baza `7817580` odpowiadała **10** w **każdym** z tych
przebiegów, na tym samym otoczeniu i tym samym przyrządem. Zmiana jest
przyczyną, nie zbieg okoliczności z aktualizacją `next` z KROKU 1.

### 9.4. Bezpiecznik wyglądu — zero z kontrolą pozytywną

Zrzuty kandydata po KROKU 2 wobec zrzutów bazowych z `7817580`
(10 tras × PL/EN/DE × 1440/390 = 60), trzy przebiegi komparatora
**w jednym przejściu**:

| przebieg | pliki | z różnicą | różnych pikseli | porównanych pikseli |
| --- | --- | --- | --- | --- |
| **pomiar właściwy** `A-baza` vs `C-krok2` | 60 | **0** | **0** | 249 691 830 |
| **podłoga szumu** `C-krok2` vs `C-krok2` | 60 | 0 | 0 | 249 691 830 |
| **kontrola pozytywna** (1 px, delta 1) | 60 | **1** | **1** | 249 691 830 |

Kontrola pozytywna wstrzyknęła **najmniejszą możliwą różnicę** — jeden
piksel o delcie 1 — i komparator wskazał ją z nazwą pliku i współrzędną
(`1440--de--_korzen.png`, 0,0). **Zero z wiersza pierwszego jest więc
wynikiem, nie milczeniem przyrządu.** Zrzuty: 60/60 zapisanych, 0 błędów,
statusy `{"200": 54, "404": 6}` — sześć czterysta-czwórek to trasa
`nie-znaleziono` w sześciu wariantach, czyli **zachowanie zamierzone**
(`src/middleware.ts` przepisuje nieistniejące ścieżki ze statusem 404).

### 9.5. Build i bramki — kody wyjścia, dwie czerwienie z kontrolą negatywną

`WWW_DIST=.next-kandydat npm run build` → **exit 0**, `▲ Next.js 15.5.27`,
`✓ Generating static pages (33/33)`, `ƒ Middleware 46.5 kB`.

| bramka | kandydat | baza 7817580 (ten sam przebieg) |
| --- | --- | --- |
| `kontrakt` | **exit 1** | **exit 1** |
| `tokeny`, `deklaracje`, `parytet`, `liczby`, `linki`, `kotwice`, `nojs` | exit 0 | — |
| `nieodwracalne` | **exit 1** | **exit 1** |

Obie czerwienie są **zastane**, nie wprowadzone tym krokiem, i obie
zmierzone po obu stronach w jednym przebiegu: `kontrakt` daje **ten sam
komunikat co do znaku** (`deltaE(#f5f5f7, #F7F3EA) = 5.8 > 5`, ADR-022,
poz. **T74**), a `nieodwracalne` zgłasza brak raportu audytu **dla sha
własnego drzewa** — `6c12783e5c8b…` u kandydata i `7817580f3756…` w bazie,
co samo dowodzi, że każda bramka liczyła swój tree, a nie cudzy
(poz. **T83**). Osłabianie bramek to zakaz 3; **czerwień uzasadniona też
jest czerwienią** (ADR-020).

### 9.6. Dziedzina tego werdyktu i jego ślepota

**Werdykt obowiązuje w swojej zadeklarowanej dziedzinie — poza nią jest
milczenie, nie zieleń.**

- **Dziedzina: build lokalny, `next start`.** Zachowania na Vercelu
  **nie zmierzono** — tam optymalizator jest usługą platformy (§6 i §2.2
  tego raportu mówią to samo o pomiarze sprzed zmiany). Odczyt konfiguracji
  mówi, że `images.unoptimized` obowiązuje też tam; **odczyt to nie pomiar**
  i tak ma być czytany.
- **Czego ta zmiana NIE robi z wydajnością.** Nie wolno jej czytać jako
  „obrazy są nieoptymalizowane, więc strona zwolni": pliki w `public/` są
  już przygotowane wariantami (AVIF/WebP, szerokość w nazwie) i serwowane
  wprost przez `<img>` w `<picture>`, więc optymalizator **nie brał udziału
  w ich wydaniu ani przed tą zmianą**. Zdanie to jest odczytem kodu, nie
  pomiarem wydajności — `bramka:pomiar` **nie była uruchamiana**.
- **Czego nie dotyczy.** Nagłówki bezpieczeństwa i CSP to KROK 3 — po tym
  kroku `headers()` nadal niesie **wyłącznie** `x-catherly-wydanie`.
- **Przyrządy leżą poza repozytorium** (sonda, zrzuty, komparator) —
  pozycja rejestru **T94**, niezmieniona i przez ten krok **poszerzona**
  o sondę `/_next/image`.

### 9.7. Ślad narzędziowy KROKU 2 — gdzie przyrząd był ślepy

| przyrząd | ślepota | jak złapana | poprawka |
| --- | --- | --- | --- |
| `ls -la src/middleware.* middleware.*` | zsh przy **dwóch wzorcach** i jednym bez dopasowania **przerywa całe polecenie** — „no matches found: `middleware.*`" — więc *nieobecność* była zerem mojego polecenia, nie bytu; ogłosiłem „nie ma middleware", a plik jest | banner builda `ƒ Middleware 46.5 kB` **zaprzeczył** mojemu ustaleniu | `git ls-files \| grep -i middleware` → `src/middleware.ts`, kontrola pozytywna: 6 plików z `i18n` w nazwie |
| `sonda-optymalizator.mjs` wywołana numerem portu | pierwszy argument to **adres bazowy**, nie port → `Failed to parse URL`; wszystkie trzy klasy żądań zerowe | **sonda sama odmówiła werdyktu** — exit 3 „NIEROZSTRZYGNIĘTE", bo kontrola STATYK nie dała 200 | `node sonda-optymalizator.mjs http://localhost:3200`; **to jedyny przypadek w tej sesji, w którym zero narzędzia złapał sam przyrząd, nie człowiek** — i tylko dlatego, że miał kontrolę żywości |
| `grep -l 'next/image' src/` | mówi, **w których plikach ciąg jest**, nie **czym tam jest** — trzy komentarze o nieużywaniu wyglądają identycznie jak trzy użycia | odczyt trzech linii **przed** postawieniem wniosku | wniosek o użyciu stawiany na `import`/`<Image`, nie na samym ciągu (§9.2) |
| kod wyjścia sondy jako całość dowodu | `11` mówi „nie odpowiada 200" i **milczy o tym, czy trasa jeszcze istnieje** | odczyt kolumny KSZTAŁT: 400 → 404 | werdykt czytany z **tabeli kodów**, nie z samego exit (§9.3) |
| `$?` po potoku i po `$(…)` | kod wyjścia należy do **ostatniej wykonanej rzeczy**, nie do polecenia, które mnie interesuje — raz dało fałszywe „exit sondy: 0" | sprzeczność z treścią logu | każdy pomiar do pliku, `kod=$?` **osobną instrukcją** |

### 9.8. Co po KROKU 2 zostaje otwarte

| pozycja | stan po tym kroku |
| --- | --- |
| `B3` | **zamknięte** — KROK 1, w dziedzinie z §8.2 |
| `B2` | **zamknięte** — ten krok, w dziedzinie z §9.6 |
| `B7` | **otwarte w całości** — droga wyjścia wychodzi poza major, czyli poza literę zlecenia |
| `B1`, `B4`, `B5`, `B6`, `B8`, `B9`, `B12` | otwarte — KROK 3 (CSP **wyłącznie** `Report-Only`; przełączenie na egzekwowaną ma być **propozycją bez wykonania**) ⚠ **ROZSTRZYGNIĘTE W KROKU 3 — §10.11**: `B4`, `B5`, `B6` zamknięte (§10.2); `B8`, `B9` zamknięte **z rozjazdem** wobec propozycji §1 (§10.6); `B1` zamknięte **wyłącznie** jako `Report-Only`, a propozycja trybu wymuszającego **WSTRZYMANA** z liczbą 476 (§10.5); `B12` zamknięte co do przedmiotu wiersza. |
| `B10` (COOP/CORP), `B11` (`security.txt`) | **otwarte i POZA zleceniem `WWW/102`** — zlecenie ich nie wymienia |

---

## 10. WWW/102 KROK 3 — nagłówki z jednego miejsca, CSP **wyłącznie** Report-Only

**Zakres tej sekcji:** zlecenie `WWW/102` KROK 3 wykonane w wariancie
`102-W`. Pomiary z **2026-10-08**, na drzewie roboczym nad `f823b7b`
(gałąź `faza-4/podstrony`). Stojak kandydata: `next start -p 3200`,
`WWW_DIST=.next-kandydat`, `BUILD_ID KPrIj8HrXcKeti45pKmNJ`. Stojak bazowy
do kontroli: worktree na `7817580`, `:3100`, `WWW_DIST=.next-baza`,
`BUILD_ID 3yt2LllUgYFHidfOuoqGm`. Port 3000 (PID 45920, praca właściciela)
**nietknięty** — zakaz 7.

Sekcja ma własny nagłówek zakresu i własną datę, tak jak §8 i §9. Wiersze
tabeli §1 **nie są przepisywane** — przy zdaniach obalonych albo
zmienionych dostają adnotację z odesłaniem tutaj.

### 10.1. Pytanie zerowe przed wszystkimi innymi

**CZY TA RZECZ W OGÓLE ISTNIEJE** — odpowiedź z **odczytu konfiguracji**,
nie z mutacji, bo mechanizmu, którego nie ma, nie da się zmutować
(ADR-018).

| co odczytane | wynik przed KROKIEM 3 |
| --- | --- |
| `next.config.ts` → `headers()` | **jeden** wpis, `x-catherly-wydanie`; zero nagłówków bezpieczeństwa |
| `vercel.json` → klucz `headers` | **0 wystąpień**, przy kontroli pozytywnej 4 klucze w pliku |
| `public/_headers` | **pliku nie ma** |
| `src/middleware.ts` → `.headers.set/append` | **0 wystąpień**, przy kontroli pozytywnej 2 użycia `NextResponse` |
| sonda na 30 adresach (10 tras × pl/en/de) | **0/30 adresów** z jakimkolwiek nagłówkiem bezpieczeństwa |

Czyli przed tym krokiem zestaw pytań o zachowanie strażnika był wobec
nieistnienia ślepy i milczałby dokładnie tak samo, jak przy mechanizmie
sprawnym. Pytanie 0 zostało zadane **pierwsze**.

### 10.2. Jedno miejsce — i dlaczego lista nie stoi w konfiguracji

Zlecenie żąda nagłówków „z jednego miejsca (`next.config` `headers()`)".
Wykonane jako **jeden wpis `headers()` z jedną listą**, ale lista mieszka
w osobnym module:

- `src/naglowki-bezpieczenstwa.ts` — **jedyne źródło** nazw i wartości,
  bez zależności (loader konfiguracji Next wciąga ten plik, zanim istnieje
  środowisko aplikacji);
- `next.config.ts:3` — importuje listę i rozwija ją w `headers()` pod
  `source: "/:sciezka*"`;
- `e2e/naglowki-bezpieczenstwa.spec.ts:7` — **czyta tę samą listę**.

**Powód rozdzielenia jest regułą, nie wygodą: kopia listy w strażniku
byłaby drugim źródłem prawdy i rozjechałaby się przy pierwszej zmianie
(zakaz 10).** Zmierzone, że źródło jest jedno: `grep` po repozytorium daje
dokładnie **dwóch importerów** (`next.config.ts:3`,
`e2e/naglowki-bezpieczenstwa.spec.ts:7`) przy kontroli pozytywnej 29
plików z `next-intl` tym samym poleceniem.

**Co lista niesie — sześć nagłówków:**

| nagłówek | wartość | zamyka |
| --- | --- | --- |
| `Strict-Transport-Security` | `max-age=63072000` | `B8` — w dziedzinie z §10.6 |
| `X-Frame-Options` | `DENY` | `B4` (człon pierwszy) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | `B6` |
| `Permissions-Policy` | 15 zdolności odebranych, `nazwa=()` | `B9` — w dziedzinie z §10.6 |
| `X-Content-Type-Options` | `nosniff` | `B5` |
| `Content-Security-Policy-Report-Only` | 12 dyrektyw, **bez** `unsafe-inline` i `unsafe-eval` | `B1` **tylko w postaci Report-Only** — §10.5 |

`frame-ancestors 'none'` jest **w CSP** (człon drugi `B4`); zlecenie żąda
obu mechanizmów, bo starsze przeglądarki czytają tylko `X-Frame-Options`.

`x-catherly-wydanie` **zostaje pierwszy i osobno**: to mechanizm
prowieniencji czytany przez `scripts/sprawdz-preview.mjs`, nie nagłówek
bezpieczeństwa — nie wchodzi do listy, której pilnuje strażnik kompletu.

⚠ **PUŁAPKA ZMIERZONA, NIE PRZYPUSZCZONA: nagłówki kompilują się do
`routes-manifest.json` w czasie BUDOWANIA.** Odczyt
`.next-kandydat/routes-manifest.json` pokazuje **1 wpis `headers`**,
`source: "/:sciezka*"`, **7 kluczy** w zapisanej kolejności. Skutek
wykonawczy: każda zmiana nagłówka wymaga **pełnego przebudowania** —
restart `next start` jej nie podniesie. Dlatego każdy z czterech cykli
mutacji niżej budował od nowa i każdy ma **własny, różny `BUILD_ID`**.

### 10.3. Sonda przed i po — komplet na 30 adresach

Sonda `sonda-naglowki.mjs` (przyrząd **poza repozytorium**, lista wymagana
wpisana w nim **niezależnie** od repo — inaczej mierzyłaby zgodność listy
z samą sobą).

| | przed | po |
| --- | --- | --- |
| kod wyjścia | **21** (braki) | **20** (komplet) |
| adresów z kompletem 6/6 | 0 / 30 | **30 / 30** |
| żywotność klasy statyk | 2/2 | 2/2 |
| kontrola czytnika POZYTYWNA (`x-catherly-wydanie` obecny) | TAK | TAK |
| kontrola czytnika NEGATYWNA (nagłówek widmo nieobecny) | TAK | TAK |
| statusy | 200:27 404:3 | 200:27 404:3 |

Po zmianie każdy z sześciu nagłówków jest **SPÓJNY (1 postać)** na
wszystkich 30 adresach — więc to nie jest „jeden nagłówek wszędzie" ani
„wszystkie na jednej trasie". Nagłówków poza listą dozwoloną: **11,
policzone i NIE nazwane**; nagłówków z listy NIGDY odfiltrowanych: **0**
(zakaz 6 wbudowany w przyrząd — czyta po nazwie, nigdy nie zrzuca).

⚠ Sonda sama zgłasza ograniczenie swojego werdyktu: **3 adresy mają status
≠ 200** (strona 404 w trzech językach), więc werdykt o nagłówkach jest tam
częściowy co do przyczyny statusu — nie co do obecności nagłówków, które
są obecne i na 404 również. Strona 404 też jest oddawana odwiedzającej,
więc komplet obowiązuje tam tak samo.

**Pokrycie sięga poza te 30 adresów — zmierzone, nie wywnioskowane z kształtu
`source`.** Trzy adresy spoza zestawu sondy, czytane **po nazwach nagłówków,
nigdy przez zrzut wartości**:

| adres | status | nagłówków | kolumna kontrolna: baza `7817580` |
| --- | --- | --- | --- |
| `/favicon.ico` | **500** | **6 / 6** | **0 / 6** na tym samym adresie |
| `/pl` | **307** (przekierowanie `localePrefix: "as-needed"`) | **6 / 6** | — |
| `/` | 200 | 6 / 6 | — |

Dwa wnioski, oba potrzebne. **Pierwszy:** komplet jedzie także na odpowiedzi
**przekierowującej i błędnej**, nie tylko na 200 — a odpowiedź 500 jest
odpowiedzią, którą przeglądarka dostaje i interpretuje tak samo jak każdą
inną. **Drugi, mocniejszy od samego pokrycia:** ten sam adres daje **6/6 na
kandydacie i 0/6 na bazie**, czyli jest to kontrola kandydat–baza wykonana
na **jednym** przedmiocie w jednym przebiegu — różnica pochodzi z KROKU 3,
bo wszystko inne po obu stronach jest wspólne.

⚠ `/favicon.ico` oddaje **500, nie 404**, a w repozytorium nie ma ani jednego
pliku ikony (**0** trafień przy kontroli pozytywnej **89** plików w `public/`).
Status **500 na obu stojakach** znaczy, że to stan **odziedziczony**, nie
skutek tego kroku. Przedmiot nie należy do KROKU 3 i **nie jest tu
naprawiany** (zakaz 8) — zapisany jako pozycja rejestru **T97**.

### 10.4. Strażnik dwuwarstwowy i trzy mutacje

Strażnik ma **dwie warstwy i to nie jest nadmiar**:

1. **warstwa importu listy** — orzeka „ODPOWIEDŹ NIESIE TO, CO DEKLARUJE
   LISTA". Jej zadeklarowana ślepota stoi w nagłówku pliku: usunięcie
   nagłówka ze `src/naglowki-bezpieczenstwa.ts` zmniejszyłoby **obie
   strony porównania** i zostawiłoby ten test zielony;
2. **warstwa treści wiążącej** — literały wpisane ręcznie, czytane
   z odpowiedzi serwera: `frame-ancestors 'none'`, `default-src 'self'`,
   `object-src 'none'`, brak `unsafe-inline`, brak `unsafe-eval`, brak
   `preload` i `includeSubDomains` w HSTS, `NAGLOWKI_BEZPIECZENSTWA.length
   === 6` i posortowana lista szóstki.

**Przy każdej liczbie w strażniku stoi zdanie W KODZIE, po co ona tam
jest** — bo „liczba wpisana ręcznie w strażniku jest defektem albo
mechanizmem, rozstrzyga pytanie: czy jej zmiana ma być decyzją".
Szóstka jest **mechanizmem**: dołożenie siódmego nagłówka bezpieczeństwa
ma być decyzją, nie efektem ubocznym edycji listy.

**Zapłon na żywo (pytanie 1):** 36 testów, 36 zielonych, cztery projekty
Playwrighta, 1,8 s.

**Mutacja z kontrolą nałożenia (pytanie 2)** — cztery cykle, **pięć
różnych `BUILD_ID`**, żaden pomiar nie stał na artefakcie innego:

| mutacja | `BUILD_ID` | sonda | strażnik | co to dowodzi |
| --- | --- | --- | --- | --- |
| czysty | `ZlAWX51SpW5QojJzU80K1` | 20, komplet 30/30 | 9 zielonych | punkt odniesienia |
| **M1** — jeden nagłówek zdjęty z **ODPOWIEDZI**, lista nietknięta | `DjNNd80MclO0lLcius3hw` | **21**, `BRAK 30/30 x-frame-options`, komplet **0/30** | **2 czerwone** / 7 zielonych | czerwienią są dokładnie KOMPLET i jedna-postać |
| **M2** — cały blok zdjęty | `hJUmDX8DG2EgB57crAcZl` | **21**, `BRAKUJE 6 z 6`, komplet **0/30** | **6 czerwonych** / 3 zielone | trzy zielone to te, które nie dotykają odpowiedzi — **w tym test kontroli czytnika**, co dowodzi, że sześć czerwieni to nieobecność przedmiotu, a nie martwy czytnik |
| **M3** — `script-src += 'unsafe-inline'`, HSTS `+= '; preload'`, sześć nazw nietkniętych | `fIY4iYFCFNG5WYfRPJk50` | **20**, komplet **30/30 — sonda jest na to osłabienie CAŁKOWICIE ŚLEPA** | **dokładnie 2 czerwone** (`unsafe-*`, HSTS-`preload`), KOMPLET słusznie zielony | **to jest zmierzony dowód, że warstwa druga nie jest ozdobą**: sprawdzanie obecności nie widzi osłabienia treści |
| odtworzony | `KPrIj8HrXcKeti45pKmNJ` | 20, komplet 30/30 | 9 zielonych | — |

**M1 ma kształt wymuszony, nie wybrany.** Zdjęcie nagłówka z **listy**
zmniejszyłoby konfigurację i strażnika **razem** i zostałoby zielone — to
jest właśnie zadeklarowana ślepota warstwy pierwszej. Jedyna mutacja, która
tę warstwę mierzy, zdejmuje nagłówek z **odpowiedzi** przy liście nietkniętej.

**Odtworzenie sprawdzone dwiema drogami**, bo „`git status` «brak zmian»
nie jest dowodem przywrócenia" i „`git checkout --` bierze z indeksu, nie
z `HEAD`": (a) `sha256` wszystkich trzech plików **zgodne** z kopiami
wzorcowymi spoza repozytorium, (b) ponowny pomiar → sonda 20, strażnik 9/9.
Kopie wzorcowe były konieczne, bo dwa z trzech plików są **nieśledzone**
(`git checkout` ich nie odtworzy), a `next.config.ts` jest
**zmieniony-niezacommitowany** (`git checkout` wytarłby zmianę KROKU 3).

**Pytanie 3 — „czy upada WYŁĄCZNIE wtedy, kiedy trzeba" — nie ma dowodu
w repertuarze i NIE jest tu zasypane.** Przesłanka częściowa, która
istnieje: w każdej mutacji czerwieniały tylko te testy, których przedmiot
się zmienił (M1 2/9, M2 6/9, M3 2/9). To jest **wskazówka, nie dowód** —
zapisane jako luka, zgodnie z ADR-018.

### 10.5. Naruszenia CSP — **476**, i dlaczego propozycja egzekwowania **JEST WSTRZYMANA**

Zlecenie stawia warunek wprost: *„zero naruszeń w konsoli na wszystkich
trasach e2e; dopiero wtedy propozycja przełączenia na egzekwowaną (bez
wykonania)"*. **Warunek jest MIERZALNIE NIESPEŁNIONY.**

Przyrząd: `pomiar-naruszen-csp.mjs` (ósmy przyrząd poza repozytorium),
Playwright, 30 adresów. Nasłuch wchodzi przez `addInitScript`, **nie** po
`goto` — naruszenia z parsowania pierwszego HTML-a padają przed
jakimkolwiek skryptem dołożonym później, a nasłuch założony za późno
raportowałby zero **nieodróżnialne od braku naruszeń**.

| | wynik |
| --- | --- |
| kod wyjścia | **31** (naruszenia obecne) |
| kontrola POZYTYWNA — nasłuch widzi celowe naruszenie | **30/30 stron** |
| kontrola NEGATYWNA — czynność dozwolona nie daje zgłoszenia | **30/30 stron** |
| zdarzeń `securitypolicyviolation` | **476** |
| komunikatów CSP w **konsoli** | **476** |
| stron bez żadnego naruszenia | **0 / 30** |
| rozbicie per dyrektywa | **476 `script-src-elem`**, i nic innego |
| tras z naruszeniami | **30 / 30** |

**Dwa niezależne kanały dały tę samą liczbę** (zdarzenie DOM i konsola —
konsola, bo to kanał, który zlecenie nazywa). **Trzeci, niezależny
przyrząd zgadza się co do jednego:** statyczny spis HTML-a z poprzedniego
okna dał **476 skryptów wbudowanych bez `src`**. Trzy różne drogi, jedna
liczba.

**Dlaczego nie wolno tego „naprawić", żeby postawić propozycję:**

- **`'unsafe-inline'`** — zlecenie zakazuje wprost, a niezależnie od tego
  byłoby to zamienienie czerwieni na ciszę (logika zakazu 3). *Zero
  kupione osłabieniem miary nie jest zerem.*
- **nonce** — **wykluczony arytmetyką prerenderu, nie preferencją.** Trzy
  pomiary: `x-nextjs-prerender=1` na **każdej** trasie włącznie z 404; dwa
  żądania do `/cennik` dają **identyczną sumę SHA-256 ciała**; na dysku
  leży **31 plików `.html`**. Jeden zapisany artefakt nie może nieść
  wartości unikalnej per odpowiedź. Nonce wymagałby **oddania generowania
  statycznego** (ADR-007) — to jest poza KROKIEM 3 i nie wolno tego zrobić
  „przy okazji" (zakaz 8).
- **`report-uri` / `report-to`** — zlecenie nazywa konsolę jako kanał;
  punkt zbiorczy to zbieranie danych od odwiedzających, czyli decyzja
  właściciela, nie szczegół wykonawczy.

**Stan pozycji `B1` po tym kroku: zamknięta WYŁĄCZNIE w postaci
Report-Only.** Polityka jest ścisła (bez `unsafe-*`), działa i zgłasza —
czyli robi dokładnie to, po co Report-Only istnieje: **pokazała liczbę,
której nie znaliśmy**. Propozycja trybu wymuszającego **nie jest
stawiana**, bo postawiona dziś znaczyłaby „zgaś stronę": `script-src
'self'` w trybie egzekwowanym zatrzymałby **476 skryptów na 30 z 30 tras**.

**Co musiałoby się stać, żeby propozycja miała treść** (zapisane jako
warunek powrotu, nie jako plan tego zlecenia): rozstrzygnięcie, czy strona
oddaje prerender w zamian za nonce (ADR-007 — decyzja właściciela), albo
osobne zlecenie na mechanizm haszowania skryptów wbudowanych w czasie
budowania. **Żadnej z tych dróg KROK 3 nie obejmuje.**

### 10.6. Trzy rozjazdy z propozycjami z §1 — świadome, nie przeoczone

Tabela §1 proponowała dla trzech pozycji brzmienie, którego **nie
wykonałem dosłownie**. Rozjazd zgłaszam, nie rozstrzygam po cichu.

| pozycja | propozycja w §1 | wykonane | powód |
| --- | --- | --- | --- |
| `B8` | `max-age=31536000; includeSubDomains; preload` | `max-age=63072000`, **bez** obu flag | `preload` jest **nieodwracalny w praktyce**: wpis na listę preload przeglądarek zdejmuje się miesiącami i nie jest pod naszą kontrolą — ADR-018 prymat nieodwracalnego, więc to decyzja właściciela, nie wykonawcy. `includeSubDomains` wymaga **inwentarza poddomen**, którego nie zmierzono; włączone na ślepo zepchnęłoby na HTTPS poddomenę, o której nie wiem. ⚠ `max-age` jest odwracalny **tylko dla tych, którzy wrócą** — kto nie wróci, trzyma stary wpis do wygaśnięcia; to realna granica, nie formalność |
| `B9` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | 15 zdolności, **bez** `interest-cohort` | `interest-cohort` nie jest zarejestrowaną zdolnością (FLoC wycofany), a **nazwa nierozpoznana daje ostrzeżenie w konsoli** — a konsola jest w tym kroku **przyrządem pomiarowym** dla CSP. ⚠ **TEGO NIE ZMIERZYŁEM**: że nierozpoznane nazwy dają ostrzeżenie, wiem z odczytu zachowania przeglądarki, nie z przebiegu w tym repozytorium — **odczyt to nie pomiar** i tak ma być czytane. Nie zmierzyłem też, czy wszystkie 15 nazw na mojej liście są rozpoznane |
| `B10` | COOP `same-origin`, CORP `same-origin` | **nie wykonane** | KROK 3 wymienia pięć nagłówków i CSP; COOP/CORP nie ma na tej liście. Dołożenie ich byłoby wejściem poza literę zlecenia — pozycja zostaje **otwarta** |

### 10.7. Bezpiecznik wyglądu — 0 różnic, z podłogą szumu i kontrolą pozytywną

Zlecenie: *„po każdym kroku porównanie pikselowe; różnica > 0 → cofnij
krok, STOP"*. 10 tras × 3 języki × 2 kadry (1440/390) = **60 zrzutów**.

| pomiar | zestawy | wynik |
| --- | --- | --- |
| **POMIAR** | baza `7817580` vs kandydat KROK 3 | **plików z różnicą 0 · różnych pikseli 0 · porównanych 249 691 830** |
| **PODŁOGA SZUMU** | baza vs baza, dwa niezależne przebiegi | różnych pikseli **0** — zero nie jest schowane w tolerancji, komparator jest dokładny |
| **KONTROLA POZYTYWNA** | kandydat vs kandydat z **jednym** przestawionym pikselem | **dokładnie 1 piksel**, `1440--pl--cennik.png`, `px(720,1984)`, `245,245,247 → 10,10,8`, maxDelta 239, kod 1 |

Bez trzeciego wiersza zero z pierwszego byłoby **zerem narzędzia**. Jeden
piksel, a nie dziesięć, bo mierzony jest **próg wykrywalności**, nie sam
fakt działania przyrządu.

⚠ **Czego ten bezpiecznik NIE mierzy** — zapisane przy nim: różnicy
niewidocznej w PNG (nagłówki HTTP, DOM, atrybuty a11y), zachowania pod
interakcją (hover, focus, klawiatura), i czegokolwiek poniżej progu
własnego szumu przeglądarki. Nagłówki nie renderują się, więc zero było
**oczekiwane** — ale oczekiwanie nie jest pomiarem i dlatego pomiar był
wykonany.

### 10.8. Build, bramki, pełny zestaw e2e — kody wyjścia i kontrola negatywna

**Budowanie** stanu KROKU 3: kod **0**, `✓ Compiled successfully`,
`✓ Generating static pages (33/33)`, **31 artefaktów `.html`**,
`BUILD_ID KPrIj8HrXcKeti45pKmNJ`. Tożsamość plików potwierdzona
`sha256` wobec kopii wzorcowych **przed** uznaniem tego budowania za
budowanie tego stanu.

**Bramki — lista wzięta z ODCZYTU `.github/workflows/bramki.yml`, nie
z pamięci. Kandydat i BAZA w jednym przebiegu**, bo czerwień bez drugiej
kolumny nie odróżnia „zepsułem to teraz" od „było czerwone przedtem":

| bramka | kandydat | baza `7817580` | werdykt |
| --- | --- | --- | --- |
| `tokeny`, `parytet`, `liczby`, `linki`, `kotwice`, `nojs`, `deklaracje` | 0 | 0 | **zielone oba** |
| `cennik` | 0 | 0 | **zielone oba** — po udostępnieniu `STRIPE_TEST_SECRET_KEY`; §10.9 |
| `kontrakt` | 1 | 1 | **czerwone w obu, identyczna treść** — `deltaE(#f5f5f7, #F7F3EA) = 5,8 > 5` (ADR-022/ADR-042, pozycja **T74**). *Nie wyłączać, nie podnosić progu — zakaz 3* |
| `nieodwracalne` | 1 | 1 | **czerwone w obu** — brak raportu audytu dla commita (pozycja **T83**); bramka jest wiązana z commitem, więc nazywa `f823b7b…` i `7817580…` — to poprawne zachowanie, nie rozjazd |

**Zero regresji: nie ma ani jednej bramki czerwonej tylko na kandydacie.**

Bramki `preview`, `rozgrzewka`, `tryb-pomiaru`, `pomiar`, `po-pomiarze`,
`podsumowanie`, `margines` **nie były uruchamiane** — wymagają wdrożenia
preview na Vercelu, czyli pushu, którego to zlecenie zakazuje. To jest
**granica pomiaru**, nie przeoczenie.

**Pełny zestaw e2e** (`bramki.yml:348`), stojak :3200,
`reuseExistingServer` poza CI → przebieg wszedł na mój stojak i **nie
postawił własnego serwera**: **1436 testów, 1424 zielone, 12 pominiętych,
0 czerwonych, 1,6 min.** Nowy strażnik nagłówków jest w tym przebiegu
**36 razy zielony** — czyli pracuje w bramce repozytorium, nie tylko
w osobnym wywołaniu.

**12 pominiętych nazwanych przedmiotowo, nie samą liczbą:**
`e2e/hero.spec.ts:216` („H1 ≤ 3 linie na desktopie", 3 języki) i
`e2e/zlozenie.spec.ts:165` („kropki luster S3/S10") są bramkowane
viewportem i biegną **wyłącznie** w projekcie `desktop`; 3×3 + 3 = 12.
Stan sprzed KROKU 3.

### 10.9. Dziedzina tego werdyktu i jego ślepota

**Werdykt obowiązuje w swojej zadeklarowanej dziedzinie — poza nią jest
milczenie, nie zieleń.**

- **Dziedzina: build lokalny, `next start`, `http://localhost`.**
  Zachowania na Vercelu **nie zmierzono**.
- **HSTS jest nad lokalnym `http` BEZCZYNNY.** Przeglądarka ignoruje ten
  nagłówek poza HTTPS, więc zmierzona jest jego **obecność i postać**, a
  **nie skutek**. Strażnik zapisuje tę ślepotę w swoim własnym komentarzu.
  Czy platforma dokłada własny HSTS — nadal **niesprawdzone** (`B8`,
  zakaz 6 nie pozwala drukować nagłówków z preview).
- **Spis, z którego wyszły wartości CSP, czytał HTML renderowany przez
  serwer.** Nie widzi tego, co skrypt doda do DOM po hydratacji.
  Niezależnym sprawdzeniem tej granicy jest §10.5: **pomiar w przeglądarce
  zgodził się ze spisem co do jednego (476)** — czyli dla `script-src`
  ślepota spisu nie zadziałała. Dla pozostałych dyrektyw takiego
  potwierdzenia **nie ma**.
- **Pytanie 3 ADR-018 bez dowodu** — §10.4.
- **Przyrządy leżą poza repozytorium** — pozycja rejestru **T94**,
  poszerzona tym krokiem o `sonda-naglowki.mjs`, `spis-csp.mjs`,
  `pomiar-naruszen-csp.mjs`, `cykl-mutacji.sh`, `jeden-piksel.mjs`.

### 10.10. Ślad narzędziowy KROKU 3 — gdzie przyrząd był ślepy

| przyrząd | ślepota | jak złapana | poprawka |
| --- | --- | --- | --- |
| moja własna asercja `expect(TRASY.length * JEZYKI.length).toBe(TRASY.length * 3)` | `JEZYKI.length` **JEST** 3, więc asercja **nie sprawdza niczego**, wyglądając na sprawdzenie — czwarty język wpadłby w lukę pokrycia bez jednego sygnału | odczyt tego, co **właśnie napisałem**, przed uruchomieniem | `expect([...JEZYKI].sort()).toEqual([...routing.locales].sort())` — dopisanie języka w `routing.ts` jest teraz czerwienią, a powód stoi w kodzie |
| `pomiar-naruszen-csp.mjs` — polski cudzysłów `„` zamknięty prostym `"` | przerwał łańcuch znaków; `SyntaxError`, przyrząd nie wystartował | **kod wyjścia 1 — POZA zadeklarowaną dziedziną przyrządu (30/31/3/2)**; gdyby kody się pokrywały, niewystartowanie byłoby nieodróżnialne od pomiaru | proste apostrofy + `node --check` **przed** przebiegiem pomiarowym. **Wniosek klasowy: przyrząd, którego kody wyjścia zachodzą na kody runtime'u, nie odróżnia awarii startu od wyniku** |
| `import "playwright"` ze skryptu spoza repozytorium | ESM szuka pakietu względem **położenia skryptu**, czyli nad scratchpadem — nie rozwiązałby się | sprawdzenie, jak robią to moje **własne, działające** przyrządy (`zrzuty.mjs:26`, `porownaj.mjs:23`) **przed** uruchomieniem | `createRequire(join(REPO, "package.json"))` — wiąże też pomiar z tą samą wersją Playwrighta, którą mają bramki |
| `grep -rn … --include=*.ts` w zsh | zsh traktuje `--include=*.ts` jako **glob** i przy braku dopasowania w katalogu **przerywa całe polecenie** — „no matches found" | polecenie nie wypisało nic, a szukany ciąg **jest** w trzech plikach | `--include='*.ts'` w cudzysłowach. **Piąte wystąpienie tej rodziny w tej pracy** — zsh **nie dzieli** nierozcudzysłowionych rozwinięć i **rozwija** wzorce w argumentach |
| sonda obecności jako całość dowodu | jest **całkowicie ślepa** na osłabienie treści: M3 dodało `'unsafe-inline'` i `preload`, a sonda oddała **komplet 30/30, kod 20** | mutacja M3 z drugą warstwą strażnika obok | werdykt o **treści** wyłącznie z warstwy literałów (§10.4) |
| `npm run bramka:cennik` bez środowiska | pada na „brak `STRIPE_TEST_SECRET_KEY`" — to **odmowa werdyktu z powodu po mojej stronie**, nie czerwień repozytorium; policzona jako czerwień dałaby trzecią, fałszywą pozycję | identyczna treść czerwieni **po obu stronach** kazała spytać o przyczynę, nie o skutek | `.env` wczytany do podpowłoki, wyjście **zredagowane** wzorcem `sk_/pk_/rk_/whsec_` **przed** odczytem; bramka **zielona** po obu stronach |

### 10.11. Co po KROKU 3 zostaje otwarte

| pozycja | stan po tym kroku |
| --- | --- |
| `B3` | **zamknięte** — KROK 1, w dziedzinie §8.2 |
| `B2` | **zamknięte** — KROK 2, w dziedzinie §9.6 |
| `B4`, `B5`, `B6` | **zamknięte** — ten krok, w dziedzinie §10.9 |
| `B8`, `B9` | **zamknięte z rozjazdem wobec propozycji §1** — §10.6; `preload`/`includeSubDomains` i `interest-cohort` **świadomie nieobecne** |
| `B1` | **zamknięte WYŁĄCZNIE jako Report-Only.** Tryb wymuszający: **propozycja WSTRZYMANA z liczbą 476 na 30/30 tras** — §10.5 |
| `B12` | **zamknięte co do przedmiotu wiersza** („strona nie ma ani jednego nagłówka") — strona ma sześć, a jej CSP jest **ostrzejsza niż aplikacji**, bo bez `'unsafe-inline'`. ⚠ Obie są `Report-Only`, więc asymetria **trybu** została, tylko w drugą stronę niż opisywał wiersz |
| `B7` | **otwarte w całości** — droga wyjścia wychodzi poza major |
| `B10` (COOP/CORP), `B11` (`security.txt`) | **otwarte i POZA zleceniem `WWW/102`** |
