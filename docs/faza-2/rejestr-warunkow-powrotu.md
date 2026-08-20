# Rejestr warunków powrotu (treści zdjęte lub wstrzymane z powodu braku pokrycia)

Zasada: ADR-018 — brak dowodu = brak obietnicy. Każda pozycja wraca
WYŁĄCZNIE po spełnieniu warunku (dowód wykonaniem, nie przekonanie).
Data założenia: 2026-08-09 (po Z1–Z4).

| # | Treść | Gdzie | Warunek powrotu |
|---|---|---|---|
| 1 | „Rozliczenia" w H1 i podtytule hero | pl/en/de naglowek | Działające rozliczenia end-to-end (Stripe aktywny) + aktualizacja inwentarza przed premierą |
| 2 | Pytanie o fakturę VAT w FAQ cennika | pl/en/de cennik §5 | Testowy zakup z OTRZYMANĄ fakturą (dowód dokumentem) + konfiguracja dashboardu Stripe (dane sprzedawcy; decyzja o Stripe Tax — domyślnie wyłączony) |
| 3 | Trial 14 dni (kod: trial_period_days:14, billing-service.ts:213–227) | przyszły argument cennika | Stripe działający end-to-end; decyzja właściciela o komunikacji trialu |
| 4 | „20 GB przestrzeni na pliki" (karta Pro) + wiersz „Przestrzeń" w tabeli | pl/en/de cennik §3–4 | Klucz Storage aktywny + wykonany test uploadu. Panel: wraca bez ponownego panelu treści, tylko ze zliczeniem znaków |
| 5 | Wiersz „Wywołania AI 100/500/∞" w tabeli | pl/en/de cennik §4 | Aktywny klucz Anthropic (AI przestaje zwracać teksty zapasowe). Język kierunku o asystencie AI w opisach — dozwolony już teraz |
| 6 | Wiersz „Platformy social 2/5/∞" w tabeli | pl/en/de cennik §4 | Zgody platform + działające łączenie kont (dowód połączeniem) |
| 7 | „RODO"/„GDPR"/„DSGVO" jako potwierdzenie | pl/en/de naglowek | Weryfikacja procesów (prawa osób, powierzenie, polityka); wraca jako fakt z mechanizmem na /bezpieczenstwo |
| 8 | TLS / szyfrowanie at-rest platformy | /bezpieczenstwo | Odczyt dashboardu Supabase (raport Z4: brak śladu w repo; twierdzenie w UI aplikacji to stała tekstowa) |
| 9 | Szyfrowanie pól aplikacyjnych (AES-256-GCM: TOTP, tokeny social — FAKT z kodu) | /bezpieczenstwo | Wchodzi przy budowie /bezpieczenstwo z precyzyjnym zakresem („wybrane pola"), nie jako potwierdzenie ≤45 zn (panel F5) |
| 10 | Import wyciągu FL | cała strona | Storage aktywny + ekrany niepuste; bramka GROWTH pozostaje |
| 11 | Fraza Pulsu poza kartą Growth | wszystkie treści | Zawsze pełna forma „W planie Growth…" (warunek panelu cennika, aktualny) |
| 12 | Pozostałe bramki GROWTH z Z1 (Benchmarki, Liga, Hive Coach, Win Reel, Interactive, Stacks, Tag, raporty struktury/sponsora) | ewentualne przyszłe treści | Nieobecne w narracji strony; każde wejście = nowa obietnica → tabela obietnic + panel + decyzja właściciela |

| 13 | robots: noindex,nofollow (layout www — stan przedpremierowy, odnotowany przez adwersarza) | src/app/[locale]/…/layout.tsx | Wyłączyć przy publikacji (Faza 7) — pozycja checklisty premiery |
| 14 | „bez podawania powodu" (rezygnacja) | zamknięcie pkt 25 (odrzucone przez panel) | Weryfikacja przepływu anulowania w aplikacji (czy nie wymusza powodu — dowód) + wpis do tabeli obietnic |
| 15 | Granice e-mail modułów pozyskiwania (formularz/kalendarz/zadania: „nie wyśle e-maila/nie przychodzą e-mailem") | /funkcje/pozyskiwanie | Aktywacja Resend → rewizja trzech granic (panel Etapu B F4, 2026-08-12) |
| 16 | Granica jednokierunkowości subskrypcji kalendarza | /funkcje/pozyskiwanie | Integracja kalendarza dwustronna (dziś SZKIELET) → rewizja granicy modułu 3 |
| 17 | Cel linku kodu QR polecającego (teksty zakładają adres polecający) | /funkcje/pozyskiwanie | Weryfikacja przy zleceniu zrzutów Z9+ (dokąd QR prowadzi w aplikacji) |
| 18 | 7 nazw opisowych modułów bez pozycji słownika (kalendarz, subskrypcja, vCard, QR, program poleceń, zadania, plany rozmów) | /funkcje/* | Potwierdzenie zgodności z i18n aplikacji przy najbliższym zleceniu Z (decyzja właściciela 2026-08-12) |
| 19 | Granica importu (moduł 4: „importu hurtowego nie ma”) | /funkcje/pozyskiwanie + obawy Para 2 | Pojawienie się importu w aplikacji (strona app „Formularze & Import” — potwierdzenie zakresu przy najbliższym Z) → rewizja granicy i Pary 2 (adwersarz B F4) |
| 20 | Rejestr „cyfrowy odcisk SHA-256” na podstronach funkcji (D-C3) | /funkcje/wyniki | Obowiązujące; przy zmianie decyzji głównej — rewizja |
| 21 | Granica „nie wygeneruje szablonu” | /funkcje/tresci | Aktywacja klucza Anthropic → rewizja |
| 22 | Granica „zasięgów nie pokaże” | /funkcje/tresci | Statystyki publikacji po zgodach platform → rewizja |
| 23 | Widok liderki w Pierwszych 90 Dniach (W2 odrzucony — brak dowodu) | /funkcje/zespol | Odczyt first90 przy najbliższym Z |
| 24 | „Przesuwasz post” + nazwy poza słownikiem (kalendarz publikacji, tablica postów) | /funkcje/tresci | Weryfikacja przy Z9 / najbliższym Z |

## Pozycje techniczne i procesowe (dopisane 2026-08-14)

Ta sama zasada, inny przedmiot: nie treść zdjęta z powodu braku
pokrycia, tylko rzecz świadomie odłożona z zapisanym warunkiem
powrotu. Trzymane tutaj, a nie w rejestrze korekt treści, bo tamten
jest ściśle o treści podstron funkcji.

| # | Pozycja | Gdzie | Warunek powrotu |
|---|---|---|---|
| T1 | Selektywne ładowanie przestrzeni komunikatów per strona (`next-intl` serializuje KOMPLET komunikatów do ładunku każdej strony) | `src/i18n/`, `src/app/[locale]/**` | Blok designu — decyzja właściciela 2026-08-14 |
| T2 | Audyt nieodwracalnych (ADR-018 pkt 4) — bramka `nieodwracalne` PLANOWO czerwona | `docs/audyt/` | Faza 6 — audyt całościowy przedpremierowy, nie częściowy po etapie (decyzja właściciela 2026-08-14) |
| ~~T3~~ **ZAMKNIĘTE 2026-08-16** | Pomiar wydajności na preview Vercel + mediana jako werdykt (kod gotowy, tryb NIEAKTYWNY) | `lighthouserc.cjs`, `.github/workflows/bramki.yml`, `scripts/reprezentant.mjs`, `scripts/werdykt-po-lcp.mjs`, `docs/faza-4/bramka-na-preview.md` | **Warunek spełniony 2026-08-16, bramka DOMKNIĘTA decyzją właściciela** — cztery człony z dowodami: (1) **transport** — preview odblokowane przez Protection Bypass for Automation, sekret w GitHubie, wartość nigdzie nie drukowana; (2) **prowieniencja** — strażnik `bramka:preview` potwierdza HTTP 200 i 3/3 znaczniki wydania, a rozgrzewka sprawdza zgodność wydania na **każdej** trasie (przebieg 31957994362: „7/7 tras, 116 pobrań zasobów"); (3) **reguła werdyktu** — **NIE `mediana`** z tego wiersza: chimera zszywająca metryki z różnych przebiegów została zabita świadomie, werdykt zapada na JEDNYM prawdziwym przebiegu o medianowym LCP (§4b dokumentu bramki); (4) **rozgrzewka** przed pomiarem. Wynik: 7/7 tras zielonych na `26c38f2`. **Pozostaje otwarty rozrzut pomiaru → T10** |
| T4 | Obietnica „H1 ≤ 3 linie" — część desktopowa (768 px wzwyż) naprawiona przez ADR-029, ale potwierdzona tylko pomiarem lokalnym; **poniżej 768 px nadal nieprawdziwa** (DE 4–5 linii) i niepilnowana | `src/components/Hero.module.css`, `e2e/hero.spec.ts`, `docs/adr/029-prog-i-proporcje-hero.md` | (1) zielony pełny zestaw e2e jako dowód naprawy desktopu, (2) rozstrzygnięcie właściciela, czy obietnica ma obejmować < 768 px — jeśli tak, `clamp` względem kolumny zamiast okna + strażnik na 390 px |
| ~~T5~~ **ZAMKNIĘTE 2026-08-15** | Strony zbudowane w Fazie 4 (cztery podstrony filarów, /dla-kogo) są w ADR-014 wymienione POZA zakresem startu; nie znaleziono ADR-a uchylającego | `docs/adr/014-zakres-zamrozony-iteracji-1.md`, `docs/PLAN.md` §11 | **Rozstrzygnięte przez właściciela 2026-08-15: pięć adresów WCHODZI do zakresu startu** (ADR-014, doprecyzowanie 2026-08-15 II). Uzasadnienie: strony istnieją, są opublikowane ×3 języki, mają testy i przechodzą bramki — rozbieżność była luką formalną, nie sporem o zakres. Forma: doprecyzowanie, nie ADR uchylający; właściciel nazwał to luką formalną świadomie. Pozostałe pozycje listy „poza zakresem startu" **nietknięte** |
| ~~T6~~ **ZAMKNIĘTE 2026-08-16** | `bramka:liczby` **nie widziała warstwy `messages`** — skanowała wyłącznie `.tsx`/`.jsx` i tylko tekst z **cyfrą** poza klamrami, więc każdy ciąg renderowany przez `{t(...)}` był poza bramką, a liczebniki słowne były niewidoczne wszędzie. Karta tonu pkt 5 („bez wyjątku (bramka)") była wobec tego stanu nieprawdziwa | `scripts/lint-liczby.mjs`, `content/liczby-w-tresci.json`, `content/karta-tonu.md:61`, `docs/faza-4/bramka-liczby-warstwa-tresci.md` | **Wykonane 2026-08-16** (zlecenie właściciela po pushu 083d9f0): przebieg 2 bramki czyta `src/i18n/messages/*.json` — cyfry **i** liczebniki słowne 2–1000 ×3 języki; rozstrzygnięcia per ciąg w `content/liczby-w-tresci.json` (kategoria + pokrycie + komplet liczb, zmiana liczby zapala czerwień). **Inwentarz wyszedł na 16 kluczy, nie 14** — szacunek z 2026-08-15 był o dwa za niski (rozbiór: dokument roboczy §2). Karta tonu pkt 5 przepisana: mówi, co bramka pilnuje, i nazywa dwa miejsca, których NIE pilnuje (rodzina „jeden/one/ein", liczebniki porządkowe). Dowody: 11 mutacji, dokument roboczy §5 |
| T7 | **Zdania z datą ważności — brak rejestru i brak mechanizmu.** W serwisie stoją zdania prawdziwe wyłącznie DO PREMIERY, a w repozytorium nie ma ani bramki, ani adnotacji, ani listy, która by je znała. W dniu premiery stają się fałszem o własnym serwisie i nic tego nie zapali. Znane dziś: `StronaLogowania.tresc` („Logowanie będzie dostępne przy premierze aplikacji." ×3 języki), `Stopka.wkrotce` przy czterech dokumentach prawnych i przy kontakcie (`(wkrótce)` / `(coming soon)` / `(folgt in Kürze)`) | `src/i18n/messages/{pl,en,de}.json`, `src/components/Stopka.tsx:74-89`, `src/app/[locale]/login/page.tsx` | **Decyzja właściciela 2026-08-15: pozycja na checkliście premiery, BEZ budowy mechanizmu.** Zakres: inwentarz wszystkich zdań przedpremierowych ×3 języki z decyzją per zdanie (usunąć / przepisać / aktywować link). Wykonanie: przed premierą, nie teraz. Świadomie nie budujemy bramki wygasania — dług ma być **zapisany**, nie zapamiętany |
| T8 | **`/pomoc` wycofana z zakresu startu** (ADR-014, doprecyzowanie 2026-08-15 III) po trzech kompletach werdyktów adwersaryjnych NIE PRZECHODZI. Strona nie istnieje: brak w `ISTNIEJACE_SCIEZKI`, brak w mapie stopki, brak pliku | `docs/adr/014-zakres-zamrozony-iteracji-1.md`, `docs/faza-4/etap-e-pomoc-decyzje.md`, `src/i18n/sciezki.ts` | **Powrót po premierze, warunek potrójny (właściciel 2026-08-15):** (1) treść **z odczytu** — realne pytania użytkowniczek zamiast domysłów redakcji, (2) **istniejący kanał kontaktu**, nie stan „(wkrótce)", (3) **onboarding przetestowany**, nie zapowiedziany. Przed spełnieniem wszystkich trzech strona nie ma czym być — zamknięcie E-1 |
| T9 | **Wskaźnik zagnieżdżenia w mapie stopki — wariant z kreską odłożony.** Sędzia panelu chciał pionowej kreski wzmacniającej hierarchię czterech filarów pod `/funkcje`. Wdrożone **bez kreski**: `--kolor-rola-kreska` daje na powierzchni stopki **1,34:1** przy progu 3:1 (WCAG 1.4.11), więc kreska mogłaby wystąpić wyłącznie jako dekoracja — a dekoracja obok wcięcia myli co do tego, co **niesie** informację. Hierarchię trzyma dziś wcięcie (`.stopka li ul`) plus drzewo DOM (`<ul>` wewnątrz `<li>` rodzica) | `src/components/Stopka.module.css`, `src/styles/generated/tokeny.css:67`, `docs/faza-4/etap-e-pomoc-decyzje.md` §WYKONANIE | **Decyzja właściciela 2026-08-16: BEZ kreski; wariant `--kolor-rola-tekst-drugorzedny` (7,07:1) → do przeglądu przy bloku designu.** Nie jest to dług techniczny do spłaty, tylko decyzja **wizualna** właściciela odłożona do miejsca, gdzie ogląda się żywy materiał, a nie liczbę kontrastu w oderwaniu. Warunek powrotu: blok designu — łącznie z T1 i mobilną częścią T4 |
| T10 | **Rozrzut pomiaru szerszy niż zapas do progu — na 7 z 7 tras.** Przebieg 31957994362 (`26c38f2`, 7 tras × 5 przebiegów): zapasy reprezentantów **+239…+403 ms**, a rozrzut LCP w obrębie jednej trasy **328…1441 ms** (`/funkcje/tresci`: 947 · 1559 · **2388** · 1397 · 957 ms). Reguła werdyktu zdejmuje wpływ pojedynczego wyskoku na **wybór** reprezentanta, ale rozrzutu **nie zmniejsza**: ten sam kod zmierzony ponownie może wskazać inny przebieg, a runner potrafi zmienić `benchmarkIndex` o połowę między porami dnia (2161–2415 rano, 3194–3368 wieczorem 2026-08-16). Zieleń stoi więc na medianie, nie na zapasie odpornym na runnera | `lighthouserc.cjs` (`numberOfRuns: 5`), `scripts/reprezentant.mjs`, `docs/faza-4/bramka-na-preview.md` §4b | **Decyzja właściciela 2026-08-16: ZAMROŻONE ŚWIADOMIE.** Warunek powrotu: **bramka przerzuci się NA MEDIANIE, a nie na wyskoku** — czerwień zapadnie na przebiegu o medianowym LCP. Sam szeroki rozrzut ani wyskok ponad próg w przebiegu **niewybranym** warunku nie spełniają: to jest dokładnie ten hałas, który reguła werdyktu ma pomijać |
| T11 | **`reuseExistingServer: !process.env.CI` w `playwright.config.ts` to mina.** Pełny pakiet uruchomiony lokalnie podpina się do CZYJEGOKOLWIEK procesu na porcie 3000 — także do `next dev` z innego okna, także zepsutego. 2026-08-17 osierocony `next dev` (PID 10467, start 18:59:45) serwował 500 na wszystkich trasach i nadpisywał `.next/` w tle; testy podpięłyby się do niego bez słowa, a asercje na podciągach przechodzą na stronie błędu. Czerwień z takiego przebiegu nie mówi nic o kodzie — i zieleń też nie. | `playwright.config.ts` | Blok przeglądu bramek — decyzja właściciela 2026-08-17: **odnotować, nie naprawiać teraz**. Kierunki: potwierdzanie tożsamości serwera przed przebiegiem (znacznik w odpowiedzi) albo osobny port testowy. |
| T12 | **`max-width: 24ch` na H1 hero — defekt produkcyjny, nie artefakt eksperymentu.** `ch` to szerokość cyfry zero, więc ta sama liczba wyznacza inną kolumnę w każdym kroju: przy 1440 px SF Pro daje **755,44 px**, Roboto **661,16 px** — 94 px różnicy. Skutek **dzisiaj, bez żadnego webfontu**: H1 łamie się na **2 linie na iOS/macOS i 3 linie na Androidzie**, co przesuwa podtytuł i CTA o **55,19 px** (zmierzone 2026-08-17, kadr 1440 px; kadr 390 px trzyma 3 linie na obu). Wymiana kroju losuje to łamanie po raz drugi. | `src/components/Hero.module.css:47` | Blok designu — decyzja właściciela 2026-08-17: zdjąć `24ch`, zastąpić miarą niezależną od kroju (`max-width` w rem + `text-wrap: balance`). Powiązane: T4 (obietnica „H1 ≤ 3 linie"). Arkusz `/proba-kroju` ma pokazywać H1 w OBU wariantach — z `24ch` i z miarą docelową — żeby decyzja zapadła na obrazie. |
| T13 | **Brak tokenów CTA i tokenów typografii — system tokenów wymaga rozszerzenia przy designie.** Recepta CTA (wypełnienie, kolor etykiety, waga, wcięcia, promień) jest powtórzona RĘCZNIE w trzech modułach (`Hero`, `SekcjaPlanow`, `Zamkniecie`) i żaden token jej nie nazywa; obwódki CTA nie ma tam wcale. `tokeny.css` nie zawiera ŻADNEGO tokenu typografii (krój, skala stopni, interlinie, tracking) — 68 linii, same kolory i wymiary. Eksperyment palety obchodzi to nadpisaniem ról `interakcja` / `tekst-na-interakcji` i dokłada obwódkę selektorem po nazwie klasy CSS Modules — to obejście na czas próby, nie rozwiązanie. | `design/tokens.json`, `src/components/{Hero,SekcjaPlanow,Zamkniecie}.module.css` | Blok designu — wprowadzić jawne tokeny CTA (wypełnienie, etykieta, obwódka, stan aktywny) i rodzinę tokenów typografii; dopiero wtedy zdjąć powtórzenia z trzech modułów. Decyzja właściciela 2026-08-17. |
| T14 | **Znacznik `✓` w tabeli cennika zależy od cudzej decyzji projektowej.** `U+2713` występuje 15× na `/cennik` (pl/en/de). Schibsted Grotesk i Geist **nie mają tego glifu w ogóle** — subsetowanie tego nie naprawi, bo nie ma czego wyciąć; niesie go wyłącznie Onest. Znak spada wtedy na fallback systemowy, czyli jest rysowany innym krojem niż reszta tabeli. | `src/components/TabelaPorownawcza.*`, `content/{pl,en,de}` | Blok designu — decyzja właściciela 2026-08-17: znacznik przechodzi na **inline SVG** (`aria-hidden`, dostępna nazwa zostaje w treści komórki), bo to dekoracja niosąca znaczenie już wyrażone tekstem, a uzależnianie jej od glifu w kroju to uzależnienie od cudzej decyzji projektowej. Nie wykonywać przed blokiem designu. |
| T15 | **Wyjątek lintera tokenów dla bloku eksperymentu palety — wygasa 2026-08-31.** `scripts/lint-tokeny.mjs` (funkcja `oslonaWyjatku`) osłania surowe hexy WYŁĄCZNIE między znacznikami `/* === EKSPERYMENT PALETY — DO USUNIĘCIA === */` i `/* === KONIEC EKSPERYMENTU PALETY === */` w `src/app/globals.css`. Data jest strażnikiem, nie komentarzem: po 2026-08-31 linter zapala się na samym ISTNIENIU bloku. Znacznik w innym pliku, blok zdublowany, niedomknięty albo odwrócony = czerwień. Dowody mutacyjne **2026-08-19, commit `a826464`** (cztery mutacje w jednym przebiegu, każda z przywróceniem przez `git checkout --`): hex poza blokiem → **1** naruszenie; data cofnięta na 2026-08-16 → **77** naruszeń; znacznik przeniesiony do `src/components/` → **2** naruszenia; blok niedomknięty (usunięty znacznik zamknięcia) → **77** naruszeń; wszystkie cztery `exit 1`, po każdym przywróceniu linter zielony, sumy SHA-256 obu plików zgodne co do bajtu. **Liczby poprawione — poprzedni zapis mówił 45 tam, gdzie dziś jest 77.** Pomiar źródłowy pochodził z 2026-08-17 (commit `997630f`) i nie niósł ani daty, ani commita; nieaktualny stał się bez niczyjej zmiany w linterze, bo dwie z czterech mutacji mierzą, ILE linii odsłania utrata osłony, a osłaniany blok urósł między tymi dwoma dniami. Rozbiór 77: **74 hexy + 2 wymiary w px + 1 komunikat o samym istnieniu bloku**. Dwa px to literały w komentarzach wewnątrz bloku — osłona jest LINIOWA (`if (osloniete?.has(i)) return` pomija dla osłoniętej linii wszystkie wzorce), więc zakres faktyczny wyjątku jest szerszy niż „wyłącznie barwy" z komentarza w `src/app/globals.css:417-419`; dziś nie kosztuje to nic, ale to rozjazd dokumentacji z mechanizmem → pozycja T20. **Uwaga do samego stempla:** przebieg wykonano na drzewie roboczym commita `72f664a`, który tego samego dnia został poprawiony przez `git commit --amend` (zmiana wyłącznie treści komunikatu) na `a826464` — `72f664a` nie jest przodkiem gałęzi i nie istnieje na `origin`, więc stempel wskazywałby w pustkę. Drzewa obu commitów są tym samym obiektem (`61e52e9`), `git diff 72f664a a826464` pusty, więc pomiar odnosi się do stanu plików commita `a826464` co do bajtu. Reguła kanonu zadziałała na pierwszej własnej liczbie: commit w stemplu musi być commitem OSIĄGALNYM, nie takim, który istniał w chwili pomiaru. | `scripts/lint-tokeny.mjs`, `src/app/globals.css` | Usunięcie bloku palety i bloku kroju wraz z `public/fonts/eksperyment/` po decyzji o palecie i kroju, najpóźniej 2026-08-31; razem z nimi znika `oslonaWyjatku()`. Wyjątek przyznany przez właściciela 2026-08-17, wąski i z datą, na czas stanowiska eksperymentalnego. |
| T16 | **Bramka kontrastu w stanach interaktywnych — nowa, z trzema świadomymi granicami.** `e2e/kontrast-stanow.spec.ts` + `e2e/pomoc/sonda-stanow.mjs` mierzą 1.4.3 / 2.4.11 / 1.4.11 w czterech stanach (spoczynek, hover, active, fokus) przez `CSS.forcePseudoState` na wszystkich adresach z rejestru × 3 języki × 2 kadry. Granice zapisane wprost: **(a) W-GRANICA-01** — kontrolka zawierająca natywne `input`/`select`/`textarea` nie podlega sprawdzeniu granicy 1.4.11, bo stan niesie widżet, a nie malowane tło (pigułka okresu na `/cennik`: `powierzchnia-2` × tło strony 1,00:1). Wyjątek jest warunkowany OBECNOŚCIĄ natywnej kontrolki w chwili pomiaru, nie nazwą klasy — przerobienie pigułki na `div` sterowany JS-em kasuje wyjątek sam z siebie. **(b)** `PROGI.wylaczony = 3` jest DECYZJĄ PROJEKTU PONAD NORMĘ (WCAG wyłącza nieaktywne kontrolki spod 1.4.3/1.4.11); dziś serwis nie ma ani jednej wyłączonej kontrolki, więc próg jest pusty — pilnuje go test czujnika żywego, który wyłącza prawdziwe radio i sprawdza, że sonda je widzi w czterech stanach. **(c)** rysunek widżetów przeglądarki (kółko radia, ptaszek pola wyboru) nie istnieje w stylu wyliczonym i pozostaje poza zasięgiem sondy. Zabezpieczenia przed zerowaniem: `podejrzaneReguly` (reguła `X:hover Y` poza zasięgiem) = 0, ≥10 elementów klikalnych na trasie, ≥1 element zmieniający wygląd pod wymuszeniem, `nieoznaczalne` = 0. Dowody mutacyjne 2026-08-17: przywrócony defekt hover w trzech modułach → **144 naruszenia / 48 z 64 testów czerwonych** (1,34:1, `Zamkniecie_cta` 48×, `SekcjaPlanow_cta` 18×, `Hero_cta` 6×); próg z obu stron — `Hero_cta` `#c5c5c5` = **4,49:1 → 12 naruszeń**, w tym samym przebiegu `Zamkniecie_cta` `#c8c4c8` = **4,50:1 → zero**, różnica 0,007:1 rozdziela czerwień od zieleni. Po przywróceniu 64/64 zielone, sumy SHA-256 trzech modułów bez zmian. | `e2e/kontrast-stanow.spec.ts`, `e2e/pomoc/sonda-stanow.mjs`, `package.json` (`bramka:kontrast-stanow`) | Otwarte na stałe jako opis granic, nie jako dług. Warunek rewizji: powstanie pierwszej wyłączonej kontrolki (próg (b) przestaje być pusty), przerobienie pigułki okresu na kontrolkę bez natywnego `input` (wyjątek (a) wygasa sam — sprawdzić, czy granica faktycznie ma wtedy 3:1), albo pojawienie się reguły stanu stylującej inny element niż nosiciel stanu (bramka zatrzyma się sama na `podejrzaneReguly`). |
| T17 | **Lista tras w `e2e/axe.spec.ts` jest przepisana z ręki — 30 pozycji.** Dziś zgadza się co do jednej z rejestrem `src/i18n/sciezki.ts`, ale zgodność trzyma się wyłącznie na czyjejś pamięci: nowa podstrona wejdzie do mapy stopki i do `ISTNIEJACE_SCIEZKI`, a skan dostępności ominie ją w ciszy i na zielono. Nowa bramka `kontrast-stanow` bierze trasy z rejestru właśnie dlatego. | `e2e/axe.spec.ts` | Blok przeglądu bramek — albo przepiąć `axe.spec.ts` na rejestr (przedmiotem asercji są naruszenia axe, rejestr wyznacza tylko zasięg — ten sam argument, co w `kontrast-stanow.spec.ts`), albo dołożyć asercję porównującą długość listy z rejestrem. Nie robione teraz, bo to zmiana w bramce spoza zakresu stanowiska eksperymentalnego. |
| T18 | **Arkusz próbny kroju `public/proba-kroju.html` — tymczasowy, wygasa 2026-08-31 razem z blokiem eksperymentu palety.** Trzy kroje × trzy palety, H1 w obu miarach (`24ch` i docelowej), widoki 390 i 1440 px. Leży w `public/`, a nie na trasie, z dwóch powodów: matcher middleware przepisuje wszystko spoza `ISTNIEJACE_SCIEZKI` na 404 (ścieżka z kropką wychodzi spod matchera), a wpis do rejestru wciągnąłby arkusz pod bramkę kontrastu stanów, gdzie eksperymentalne palety dają CTA 1,12:1 — czerwień z szumu, nie z defektu. Arkusz **nie ma własnej wartości wizualnej**: barwy i `@font-face` zaciąga w czasie wykonania z żywego builda (`fetch('/')` + przepisanie `<link rel=stylesheet>`), więc nie może się rozjechać ze źródłem prawdy. Ponieważ przeniesienie pliku o katalog obok byłoby najtańszym sposobem ominięcia lintera tokenów, `scripts/lint-tokeny.mjs` skanuje dziś także `public/` (`.html/.css/.svg/.js`) — droga zamknięta strukturalnie, nie obietnicą. Dowód mutacyjny: hex w arkuszu → czerwień, `12px` → czerwień, po przywróceniu SHA-256 zgodna i bramka zielona. **Lekcja pomiarowa do zapamiętania poza tym arkuszem:** pierwsza wersja skryptu weryfikującego dała liczby wyglądające sensownie i fałszywe w dwóch miejscach naraz — (a) ustawiała okno na 390 px, ale nie przełączała kadru w samym arkuszu, więc H1 liczył się z widoku 1440; (b) mierzyła natychmiast po przełączeniu kroju, a przy `font-display: swap` mierzyła jeszcze krój zapasowy — Onest i Geist pokazywały co do setnej piksela wartość system-ui, co wyglądało na wynik („kroje mają tę samą szerokość"), a znaczyło „krój się nie wczytał". Oba defekty dawały czerwień nigdzie: skrypt był zielony, tabela pełna, wnioski nieprawdziwe. Naprawa nie polega na dłuższym czekaniu, tylko na asercji: skrypt pyta CDP `CSS.getPlatformFontsForNode`, co FAKTYCZNIE rasteryzuje H1, i odrzuca pomiar, gdy to nie jest oczekiwany krój. Arkusz kalibruje się na żywej stronie: przy widoku 390 px daje kolumnę 358 px i H1 35,5 px, czyli dokładnie to, co produkcja (zmierzone 2026-08-17). | `public/proba-kroju.html`, `scripts/lint-tokeny.mjs`, `public/fonts/eksperyment/` | Usunąć arkusz razem z katalogiem krojów i blokiem palety po decyzji właściciela o kroju i palecie, najpóźniej 2026-08-31. Do tego czasu arkusz nie jest linkowany z żadnej strony ani z mapy witryny. |
| T19 | **Warianty AVIF/WebP nie mają dowodu, że powstały z BIEŻĄCYCH źródeł.** Rozstrzygnięcie właściciela 2026-08-19: `obrazy:pipeline` **zostaje narzędziem ręcznym przy dostawie kadrów, nie bramką CI**. Powód rozstrzygający: produktem skryptu są artefakty commitowane w `public/`, więc w CI generowałby je do katalogu efemerycznego i wyrzucał — bramka byłaby zielona NIEZALEŻNIE od zawartości repozytorium, czyli „bramka, która nic nie sprawdza". Trzy powody wspierające: skrypt otwiera się destrukcyjnym `rmSync` na plikach śledzonych; wariant „wygeneruj i `git diff --exit-code`" byłby czerwony z powodów niezwiązanych z obrazami (bajtowa powtarzalność AVIF/WebP nie jest gwarantowana między lokalnym sharp 0.35.3 / libaom 3.14.1 / libwebp 1.6.0 / vips 8.18.3 a tym, co da `npm ci` na `ubuntu-latest`); integralność, o którą chodzi, jest już w CI — `e2e/zrzuty-filarow.spec.ts:110` asertuje komplet 36 wariantów, `:132` asertuje bajtową zgodność opublikowanego PNG z dostawą (SHA-256), a spec biegnie w `bramka-pelny-zestaw`. **LUKA, KTÓRA ZOSTAJE:** CI sprawdza, że warianty ISTNIEJĄ i że PNG się zgadza, ale nie sprawdza, że AVIF/WebP wyprowadzono z dzisiejszych źródeł. Podmiana źródła bez przepuszczenia go przez pipeline przechodzi dziś przez wszystkie bramki. | `scripts/obrazy-pipeline.mjs`, `design/pipeline-obrazow.json`, `public/` (36 wariantów), `e2e/zrzuty-filarow.spec.ts:110,132` | **Propozycja mechanizmu właściciela 2026-08-19, BEZ IMPLEMENTACJI:** manifest z sumą SHA-256 każdego ŹRÓDŁA, commitowany razem z wariantami; bramka porównuje sumy dzisiejszych źródeł z manifestem i czerwieni się, gdy źródło zmieniono bez przepuszczenia przez pipeline. Mechanizm sprawdza SKUTEK (czy warianty odpowiadają tym źródłom, z których je zrobiono), a nie odtwarza PROCES — dlatego omija problem niepowtarzalności bajtowej AVIF między środowiskami, który przewraca wariant „wygeneruj i porównaj". Wdrożenie osobnym zadaniem po decyzji, gdzie manifest leży i która bramka go czyta. |
| T20 | **Zakres wyjątku lintera tokenów jest SZERSZY, niż mówi jego własna dokumentacja.** Komentarz w `src/app/globals.css:417-419` opisuje osłonę jako obejmującą „wyłącznie barwy". Mechanizm jest LINIOWY: pętla lintera robi `if (osloniete?.has(i)) return`, czyli dla linii wewnątrz bloku palety pomija WSZYSTKIE wzorce — również „wymiar w px poza tokenami". Wykryte 2026-08-19 (commit `a826464`; przebieg szedł na jego poprzedniej postaci `72f664a` — amend zmienił wyłącznie komunikat, drzewo to ten sam obiekt) przez rozbiór mutacji „data cofnięta": **74 hexy + 2 wymiary w px + 1 komunikat o istnieniu bloku = 77 naruszeń**. Sam pomiar był zielony i wyglądał sensownie — rozjazd wyszedł dopiero z rozbicia sumy na składniki. Dziś nie kosztuje nic: oba literały px siedzą w komentarzach tłumaczących, dlaczego repozytorium pisze `0.0625rem`, a nie `1px`. Koszt pojawiłby się, gdyby ktoś wstawił do bloku palety prawdziwy wymiar w px — przeszedłby po cichu. | `scripts/lint-tokeny.mjs` (`oslonaWyjatku` + pętla główna), `src/app/globals.css:417-419` | Albo zawęzić osłonę do wzorca barw (osłaniać hex, nie linię), albo poprawić komentarz tak, żeby mówił, co osłona robi naprawdę. Znika sama 2026-08-31 razem z blokiem palety i funkcją `oslonaWyjatku()`. **Nie naprawiane 2026-08-19** — poza zakresem zamówionym przez właściciela (zasada „defekt na listę, nie do naprawy z własnej inicjatywy"). |
| T21 | **Nic nie pilnuje, że skróty commitów w dokumentacji wskazują na commity, które istnieją.** Klasa „odwołanie do stanu, który przestał istnieć" (kanon, ADR-018; rodzina `RECZ-286` z projektu aplikacji). Amend, rebase i squash przepisują skróty bez ostrzeżenia, więc **dokument staje się nieprawdziwy bez jednej zmiany w dokumencie** — to jest powód, dla którego pre-commit na plikach w indeksie tego NIE złapie. Weryfikacja wsteczna 2026-08-19 (commit `547b846`, 103 pliki `docs/` + `CLAUDE.md`): **191 tokenów hex 7–40 znaków, 140 odwołań do commitów osiągalnych (wszystkie także na `origin`), 5 wystąpień jednego widma (`72f664a`, wszystkie świadome — to adnotacje opisujące samo widmo), 1 skrót drzewa (`61e52e9`), 45 tokenów niebędących obiektami git**. Rozbiór tych 45: 27 × `agentId` z `docs/faza-4/odzysk-etap-c/fanout-*.jsonl`, 8 × odciski kluczy bypassu Vercela w `docs/faza-4/bramka-na-preview.md`, 4 × prefiksy sum SHA-256 plików, 2 × nazwy paczek webpacka, 1 × celowo zmyślony `deadbeefdead` w opisie mutacji W1, 2 × commit **cudzego repozytorium** (`e35ad8ce…` z repo aplikacji — sprawdzony: istnieje i jest osiągalny TAM, nieweryfikowalny stąd z definicji). | `docs/` (103 pliki), `CLAUDE.md`, `.github/workflows/bramki.yml` (15 × `actions/checkout@v4`) | **PROPOZYCJA STRAŻNIKA, BEZ IMPLEMENTACJI (2026-08-19).** Kryterium przyjęcia właściciela: skrót z reflogu → czerwień, skrót osiągalny → zieleń; do tego kontrola negatywna w tym samym przebiegu (kanon). Sześć wiążących ustaleń konstrukcyjnych, każde z pomiaru, nie z rozumowania: **(1)** test to `git merge-base --is-ancestor`, nigdy `git cat-file -t` — na `72f664a` `cat-file` mówi „commit" (obiekt z reflogu leży na dysku autora), `merge-base` mówi NIE; **(2)** dzisiejsze CI **przewróciłoby taką bramkę na wszystkich 140 odwołaniach naraz**: żaden z 15 kroków `actions/checkout@v4` nie ustawia `fetch-depth`, czyli klon ma **1 commit**. Zmierzone na klonach lokalnych: pełny → 157 commitów, `cd06530` osiągalny (zieleń); `--depth 1` → 1 commit, ten sam skrót nie jest nawet obiektem (czerwień); po `fetch --unshallow` → 157 commitów i znów zieleń. Warunek wstępny bramki: `fetch-depth: 0` w jej kroku checkout; **(3)** bramka nie może zgadywać po kształcie tokenu — 45 z 191 tokenów hex to nie commity, więc reguła „hex 7–40 = commit" byłaby czerwona w dniu wprowadzenia na 45 nie-defektach. Potrzebna **jawna notacja** (np. `commit:abc1234`), a bramka sprawdza wyłącznie oznaczone; **(4)** notacja musi mieć wariant świadomego widma (np. `commit-martwy:72f664a`) — bez niego wpis T15/T20, który OPISUJE widmo, zapalałby bramkę na zawsze, a strażnik uczyłby ludzi kasować dokumentację defektu; wariant musi być policzalny i raportowany, żeby nie stał się cichym wyłącznikiem; **(5)** odwołania międzyrepozytoryjne (`e35ad8ce…`) wymagają repo w notacji i **jawnej deklaracji, że bramka ich nie weryfikuje** — inaczej albo fałszywa czerwień, albo cicha zieleń bez sprawdzenia; **(6)** skanuje **wszystkie** pliki, nie tylko zmienione, bo defekt powstaje bez zmiany dokumentu. Wdrożenie osobnym zadaniem po decyzji właściciela — dziś w rejestrze leży sam projekt. |
| T22 | **Bramka wydajności mierzy CUDZE wdrożenie i nie wyklucza równoległych pomiarów — dwa przebiegi tej samej gałęzi biją się o ten sam adres.** Zaobserwowane 2026-08-19 na parze przebiegów CI `32300222841` (commit `b51d0b8`) i `32300453626` (commit `4c22d6d`). Różnica między tymi commitami to **13 linii w dwóch plikach `.md`** — ani jednej linii źródeł, konfiguracji czy treści; dokument `/` w rozgrzewce obu przebiegów ma **identyczne 43 054 B i 12 zasobów**. Mimo to trasa `/` dała: przebieg 1 — surowe `2455 · 1219 · 1508 · 1488 · 1491`, werdykt **1491 ms** (zieleń), przebieg 2 — surowe `2505 · 1488 · 2104 · 2092 · 2087`, werdykt **2092 ms** (czerwień, zapas −292 ms). TTFB w obu ~611–615 ms; cała różnica siedzi w Render Delay (876 → 1481 ms). **Zadania wydajności biegły równolegle: 20:45:54–20:54:01 i 20:48:29–20:56:29 — 5 min 32 s wspólnego okna na TYM SAMYM aliasie gałęzi z `LHCI_BAZA`.** Drugi defekt tej samej pary: strażnik prowieniencji (`bramka:preview`) sprawdza `x-catherly-wydanie` **raz, przed** Lighthouse'em, a alias jest przestawialny — push w trakcie pomiaru przestawia go na nowe wdrożenie i późniejsze przebiegi mierzą inny commit, niż mówi log. Komentarz w `bramki.yml:281` nazywa dokładnie tę mutowalność („adres w LHCI_BAZA jest stały, wdrożenie pod nim nie"), ale osłania tylko moment startu. Trzecia rzecz, którą przyrząd sam napisał w OBU przebiegach, też w tym zielonym: `⚠ rozrzut większy niż zapas — ta trasa może spaść przy niezmienionym kodzie` (rozrzut `/` = 1017 i 1235 ms przy zapasie ~300 ms). Zieleń przebiegu 1 nie była więc dowodem stabilnego marginesu, tylko jedną stroną monety. **Kolizję wywołał agent**, pchając drugi commit w trakcie trwania pierwszego pomiaru — ale sama możliwość kolizji jest defektem bramki, nie pomyłką operatora. **SKAŻENIE SIĘGA WSTECZ — unieważnia OBIE liczby, nie tylko czerwoną.** Łatwo było poprzestać na „drugi pomiar skażony": czerwień jest podejrzana z natury, zieleń nie. Ale skoro strażnik prowieniencji sprawdza wydanie wyłącznie na starcie, a alias przestawił się w trakcie, to późniejsze przebiegi przebiegu 1 mogły mierzyć już wdrożenie `4c22d6d` — czyli zieleń 1491 ms też nie daje się przypisać do `b51d0b8`. Właściciel podniósł to do kanonu 2026-08-19: przy skażeniu pomiaru sprawdza się, czy skażenie nie sięga wstecz; zieleń sprzed skażenia nie jest automatycznie czysta. **Ostrzeżenie o rozrzucie to osobna klasa: „raport, którego nikt nie czyta, przestaje być raportem"** (nazwana przez właściciela 2026-08-19, kanon ADR-018) — linijka istniała, była prawdziwa, wypisywała się w obu przebiegach i nie zmieniła niczyjego zachowania, bo siedziała w logu zielonego zadania. | `.github/workflows/bramki.yml` (zadanie wydajności; **brak bloku `concurrency:` w całym pliku**), `scripts/sprawdz-preview.mjs`, `scripts/rozgrzewka-preview.mjs`, zmienna repozytorium `LHCI_BAZA` | **ROZSTRZYGNIĘCIE WŁAŚCICIELA 2026-08-19 — trzy kierunki wdrożone tego samego dnia, czwarty odłożony.** **(a) WDROŻONE:** blok `concurrency` na poziomie procesu w `bramki.yml`, `cancel-in-progress: true`. Klucz **nie** taki, jak brzmiała pierwotna propozycja: `github.ref` przy zdarzeniu `pull_request` to `refs/pull/N/merge`, a przy `push` — `refs/heads/…`, więc klucz z `github.ref` rozdzieliłby dwa przebiegi TEJ SAMEJ gałęzi do dwóch grup i defekt wróciłby w ciszy dokładnie w PR, czyli w momencie merge'u. Klucz bierze gałąź wdrażaną przez Vercela: `github.event.pull_request.head.ref || github.ref_name` — ta sama logika, co przy `OCZEKIWANY_COMMIT`. Cena przyjęta świadomie: przy otwartym PR zdarzenia `push` i `pull_request` dają dwa przebiegi tego samego commita i jeden anuluje drugi; gdy przegra ten z `pull_request`, jego wymagane sprawdzenie pokaże „cancelled" i trzeba je powtórzyć. Kierunek awarii bezpieczny — anulowane ≠ zielone. **Dowód przyjęcia (dwa pushe w odstępie minuty → anulowanie widoczne w logu) NIEWYKONANY: czeka na zgodę właściciela na push.** **(b) WDROŻONE:** `scripts/straznik-po-pomiarze.mjs` + krok „Prowieniencja po pomiarze" z `if: always()` — odpytuje `x-catherly-wydanie` na WSZYSTKICH 7 trasach po `lhci collect` i przy rozjeździe kończy `POMIAR UNIEWAŻNIONY` (wyjście 1). Porównanie z `OCZEKIWANY_COMMIT` jest równoważne porównaniu „przed ↔ po", bo rozgrzewka wymusza równość na wszystkich trasach przed pomiarem — nie ma pliku stanu do zgubienia. `WYNIK_POMIARU` steruje wyłącznie brzmieniem komunikatu (zieleń bez pokrycia / czerwień nieprzypisywalna), nie werdyktem. Dowód mutacyjny 2026-08-19 z kontrolą negatywną w tym samym przebiegu, na udawanym preview (lokalny serwer HTTP oddający sterowany nagłówek — bez Vercela i bez sekretu): wydanie zgodne → **7/7 tras ✔, wyjście 0**; alias przestawiony na inne wdrożenie → **7/7 rozjazdów, wyjście 1**; wdrożenie bez nagłówka wydania → **7/7 braków, wyjście 1**. Dowód czwarty, dopisany 2026-08-20 po tym, jak roboczy obserwator CI wypisał 99 razy `error connecting to api.github.com`, a potem zameldował „OBA PRZEBIEGI ZAKONCZONE" z kodem 0 — pytanie brzmiało, czy nowy strażnik ma ten sam kształt, i odpowiedź jest z pomiaru, nie z czytania kodu: serwer żywy → **wyjście 0**, ten sam serwer zgaszony w trakcie → **7/7 „adres nieosiągalny (fetch failed)", wyjście 1**. Milczenie celu jest u strażnika czerwienią, nie ciszą. **Szczelina, która zostaje, spisana wprost:** klamra „przed ↔ po" nie wykryje podmiany, która zdarzyła się i cofnęła WEWNĄTRZ pomiaru — `lhci collect` przechodzi wszystkie trasy × przebiegi w jednym procesie i nie daje w to wejść. **(c) WDROŻONE jako werdykt, nie ostrzeżenie:** `scripts/werdykt-marginesu.mjs` + krok „Werdykt marginesu (żółty: margines pozorny)”. **Prawdziwego ŻÓŁTEGO GitHub Actions nie ma** — zadanie zna wyłącznie `success`/`failure`/`cancelled`, a status `neutral` jest dostępny tylko przez Checks API dla aplikacji GitHuba, nie z poziomu workflow. Wykonalne i wdrożone: krok z `continue-on-error: true` (⚠ zamiast zielonego znaczka przy kroku) + adnotacja `::warning` na stronie podsumowania przebiegu, NAD listą zadań + tabela w `$GITHUB_STEP_SUMMARY` z brzmieniem „margines pozorny, rozrzut X przy zapasie Y". Werdykt progowy w kroku „Pomiar" nietknięty. Zdjęcie jednej linii `continue-on-error` zamienia ten żółty w czerwień blokującą — to decyzja właściciela, nie zmiana konstrukcji. **(d) ODŁOŻONE decyzją właściciela** do czasu samotnego, niezakłóconego pomiaru: cokolwiek dotyczącego progów albo reguły werdyktu odpornej na rozrzut. **Kierunek (b') z pierwotnej listy — mierzyć niemutowalny adres wdrożenia zamiast aliasu — pozostaje niewdrożony**; (a) zabiera przyczynę, (b) wykrywa skutek, ale aliasu nikt nie przestał używać. Warunek zamknięcia bez zmian: przebieg wydajności, w którym `/` mieści się pod progiem, a przyrząd NIE zgłasza marginesu pozornego. **PIERWSZY SAMOTNY POMIAR PO WDROŻENIU (2026-08-19, `69c2dab`, przebieg 32302412113, zadanie 96227948719, okno 21:10:22–21:18:29 — 13 min 53 s po zakończeniu ostatniego z kolidujących zadań, bez nakładania): bramka ZIELONA, `/` LCP 1521 ms, zapas +279 ms, przebiegi surowe 1873 · 2102 · 1514 · 1509 · 1521, rozrzut 593 ms. Warunek zamknięcia NIEspełniony w drugiej połowie: rozrzut przekracza zapas ponad dwukrotnie, więc nowy werdykt marginesu zapaliłby ⚠ na tej samej zielonej bramce — i to samo na TBT (93 ms, zapas +107, rozrzut 660 ms). Pierwszy czysty pomiar jest zatem dowodem, że rozstrzygnięcie (c) trafiło w rzecz istniejącą, a nie hipotetyczną: bramka jest zielona, a margines pozorny.** |
| T23 | **Żaden krok `checkout` w CI nie ustawia `fetch-depth`, więc KAŻDA przyszła bramka operująca na historii przewróci się na płytkim klonie.** Stan zmierzony 2026-08-19 na `69c2dab`: 15 wystąpień `actions/checkout@v4`, `fetch-depth` użyte 0 razy. Domyślnie akcja klonuje `--depth 1` — runner dostaje JEDEN commit i nic poza nim. **Dowód trzech klonów** (to repo, skrót `cd06530`, osiągalny z HEAD; pełny log: dowód mutacyjny z 2026-08-19): **A. klon pełny** → 159 commitów, `cat-file: commit`, `merge-base --is-ancestor` OSIĄGALNY → strażnik ZIELONY (kontrola negatywna w tym samym przebiegu). **B. klon `--depth 1`**, czyli dokładnie to, co robi dziś CI → 1 commit, `fatal: Not a valid object name cd06530` — skrót nie jest nawet OBIEKTEM, nie tylko nieosiągalnym → strażnik CZERWONY. **C. ten sam płytki klon po `git fetch --unshallow`** → 159 commitów, OSIĄGALNY → ZIELONY; naprawa działa i jest odwracalna. **Zasięg jest szerszy niż T21**: T21 to jeden strażnik, a to jest własność ŚRODOWISKA wspólna wszystkim przyszłym bramkom czytającym historię — `merge-base`, `git log`, `blame`, „czy ten plik zmienił się względem `main`", porównanie z bazą, wersjonowanie z tagów. **Kierunek błędu jest przeciwny do lokalnego** i to jest tu najważniejsze: lokalnie `git cat-file -t` daje FAŁSZYWĄ ZIELEŃ, bo obiekt z reflogu leży na dysku; w CI to samo polecenie na płytkim klonie daje czerwień z zupełnie innego powodu — obiektu w ogóle nie ma. Dowód D w tym samym przebiegu: skrót widmo `72f664a` (po amendzie z T21) nie jest obiektem ANI w klonie pełnym, ANI w płytkim — reflog nie podróżuje z klonem. Czyli CI jest surowsze od maszyny lokalnej, a strażnik napisany na lokalnych obserwacjach pada w CI z przyczyny, której lokalnie nie da się zobaczyć. | `.github/workflows/bramki.yml` — 15 × `actions/checkout@v4` bez `fetch-depth` | **Zapisane osobno na polecenie właściciela 2026-08-19**: „to nie jest warunek T21, to jest osobna pozycja rejestru o szerszym zasięgu". Bez implementacji, czeka razem z T21. Rozstrzygnięcia potrzebuje jedna rzecz: czy `fetch-depth: 0` wchodzi we WSZYSTKIE piętnaście kroków (jednolicie i odpornie na przyszłe bramki, kosztem klonu rosnącego z historią — dziś 159 commitów), czy tylko w zadania czytające historię (taniej, ale nowa bramka historyczna dopisana do zadania bez tego ustawienia znów przewróci się CICHO — czyli ta sama pułapka, tylko rzadsza). Warunek zamknięcia: krok checkout w zadaniu historycznym z jawnym `fetch-depth`, plus przebieg CI, w którym strażnik historii świeci zielono na runnerze, a nie tylko lokalnie. |
| T24 | **Żadne zadanie CI nie ma `timeout-minutes`, więc zawieszony krok kosztuje sześć godzin ciszy i kończy bramkę statusem, który nie jest ani zielenią, ani czerwienią.** Zmierzone 2026-08-20 na przebiegach `32302412113` (`69c2dab`), `32300222841` (`b51d0b8`) i `32300453626` (`4c22d6d`): **cztery zadania anulowane, każde po 6 h 00 min ±20 s** — `Dostępność` 21:10:21→03:10:41, `Pełny zestaw e2e` 20:45:53→02:46:09 i 20:48:29→02:48:46, `Dostępność` 20:48:28→02:48:44. Wszystkie cztery stanęły na **tym samym kroku**: `npx playwright install --with-deps chromium`. `grep -c timeout-minutes .github/workflows/bramki.yml` = **0**, więc obowiązuje domyślny limit platformy — 6 godzin. Skutki są trzy i tylko pierwszy jest oczywisty. **(1)** Około 24 h czasu runnera spalone w jeden wieczór. **(2)** Zawieszona bramka kończy się jako `cancelled`, a to nie jest werdykt: brak werdyktu wygląda w interfejsie jak brak problemu, więc bramka, która nigdy nie odpowiedziała, jest wygodniejsza w odbiorze niż bramka, która odpowiedziała „nie". **(3) I to jest koszt wniesiony przez WŁASNE dzisiejsze rozstrzygnięcie (a)**: `cancel-in-progress: true` czyni `cancelled` stanem normalnym i oczekiwanym, więc czytelnik traci możliwość odróżnienia „anulowane, bo wyparte nowszym pushem" od „anulowane, bo wisiało sześć godzin". Przed (a) `cancelled` było sygnałem samo w sobie; po (a) już nie jest. **Konkretna strata w tej dobie: dla wypchniętego `69c2dab` bramka `Dostępność` NIE MA WERDYKTU** — zieleń dostępności, o którą pytał właściciel, jest udowodniona wyłącznie dla `b51d0b8`. Poszlaka co do przyczyny, nie dowód: w tym samym oknie czasowym lokalny `gh` stracił łączność z `api.github.com` na 99 kolejnych prób, więc to wygląda na zdarzenie sieciowe wieczoru, a nie defekt kodu — ale trwałym ustaleniem jest brak limitu, który KAŻDE takie zdarzenie zamienia w sześć godzin ciszy. | `.github/workflows/bramki.yml` — 15 zadań, 0 × `timeout-minutes` | Blok po T21/T23 — decyzja właściciela, bez implementacji (klauzula: defektów spoza zlecenia się nie naprawia). Do rozstrzygnięcia dwie rzeczy, nie jedna. **Limit:** jaka wartość i gdzie — jednolita na wszystkich zadaniach czy per zadanie (najdłuższa uczciwa bramka to dziś `Pełny zestaw e2e` w 5 min 23 s i `Wydajność` w 8 min 07 s, więc limit rzędu 20–30 min jest wielokrotnością zmierzonego czasu, a nie ciasnym gorsetem). **Rozróżnialność `cancelled`:** czy chcemy kroku, który przy anulowaniu dopisuje do podsumowania przyczynę (wyparcie przez nowszy przebieg vs. przekroczony limit), bo bez tego (a) i T24 zlewają się w jeden nieczytelny status. Warunek zamknięcia: przebieg, w którym celowo zawieszony krok kończy zadanie w zadeklarowanym limicie i zostawia w podsumowaniu jawną informację, dlaczego. |

**T1 — pomiar, nie przypuszczenie.** Ustalone przy Etapie D:
dopisanie trzech kluczy członu i rozbicie F8 powiększyło HTML strony
głównej z **34 260 B na 34 536 B (+276 B)** — mimo że `/` nie
wyświetla żadnego z tych komunikatów. Koszt rośnie z każdym nowym
kluczem i obciąża WSZYSTKIE strony, nie tylko tę, której klucz
dotyczy. Zmierzony wpływ na LCP `/` był w granicach szumu
(mediana 1708,6 → 1709,1 ms), więc pozycja jest optymalizacyjna,
nie blokująca. Wraca, kiedy albo liczba kluczy urośnie na tyle, żeby
przebić szum, albo przy okazji bloku designu — co nastąpi wcześniej.
Szczegóły: `docs/faza-4/komponenty/handoff-etap-d.md` §12.3.

**T2 — dlaczego to NIE jest dług do spłaty przy okazji.** Bramka jest
czerwona od commita Fazy 0 i taka zostaje. Właściciel rozstrzygnął
2026-08-14, że audyt nieodwracalnych ma być **całościowy
przedpremierowy w Fazie 6**, a nie składany z audytów cząstkowych po
każdym etapie. Dopóki raportu nie ma, bramka blokuje **wdrożenie
produkcyjne** (i tylko je — nie push na gałąź roboczą), co jest jej
zamierzonym działaniem, a nie awarią. Czerwień jest tu informacją, że
premiera nie jest odblokowana, i ma pozostać widoczna.

**T3 — co jest zrobione, a co zablokowane.** Zrobione i sprawdzone:
konfiguracja `lighthouserc.cjs` z jednym źródłem ścieżek i bazą ze
zmiennej, mediana jako werdykt (dowód: przy przebiegach 1702,8 · 1708,3
· 1711,3 ms `median` zwraca 1708,3, a domyślny `optimistic` — 1702,8)
oraz strażnik `bramka:preview`, sprawdzony w trzech kierunkach:
przepuszcza właściwą stronę, zatrzymuje ekran logowania Vercela,
zatrzymuje obcy serwis oddający 200.

Zablokowane: **preview jest za ścianą logowania**. Zmierzone
2026-08-14 na `catherly-9s8us771y…vercel.app`: żądanie oddaje 302 na
`vercel.com/sso-api`, a po przekierowaniu — stronę logowania ze
statusem **200** i ze słowem „Catherly" **dwa razy** w treści (adres
siedzi w parametrze `next=`). Naiwny strażnik oparty na statusie albo
nazwie produktu przepuściłby ten ekran. Do odblokowania potrzeba
decyzji właściciela: albo wyłączyć ochronę Preview (Vercel → Settings
→ Deployment Protection), albo włączyć Protection Bypass for
Automation i wstawić wartość jako sekret GitHuba
`VERCEL_AUTOMATION_BYPASS_SECRET`. Dziś w repozytorium jest tylko
`STRIPE_TEST_SECRET_KEY`.

Otwarte i **nierozwiązane**: nawet po udostępnieniu preview trzeba
wykazać, że mierzony adres to TEN commit, a nie ostatnie wdrożenie
gałęzi. Bez tego bramka mierzy prawdziwą stronę, ale niekoniecznie
tę testowaną — inna postać tego samego fałszywego zielonego. Kandydat:
znacznik z `VERCEL_GIT_COMMIT_SHA` w dokumencie i sprawdzenie go przez
strażnika. Nie zbudowane, bo bez dostępu do preview nie da się tego
zweryfikować, a niezweryfikowane liczy się jak niedziałające.

**T3 — ZAMKNIĘTE 2026-08-16.** Trzy akapity powyżej opisują stan
z 14 sierpnia i zostają jako historia. Dziś preview jest dostępne dla CI
przez Protection Bypass for Automation (sekret w GitHubie; wartość nie
jest drukowana nigdzie — łącznie z nagłówkiem `Set-Cookie` z preview,
który niesie ją w jawnym base64). Pytanie „otwarte i **nierozwiązane**"
— czy mierzymy TEN commit — ma odpowiedź **wykonaną**, nie
zaprojektowaną: strażnik `bramka:preview` sprawdza znaczniki wydania
w dokumencie, a rozgrzewka powtarza sprawdzenie na **każdej** trasie.
Z przebiegu 31957994362: „✔ Cel pomiaru potwierdzony: HTTP 200,
42837 B, 3/3 markerów obecnych" i „✔ Rozgrzane: 7/7 tras, 116 pobrań
zasobów. Wydanie zgodne na każdej trasie."

Jedno słowo z wiersza T3 jest przy tym **nieprawdziwe wobec dzisiejszej
bramki** i dlatego stoi przy nim sprostowanie: werdyktem **nie jest
`mediana`**. Mediana każdej metryki osobno zszywa LCP z przebiegu A
z TBT z przebiegu B i opisuje ładowanie, którego nigdy nie było —
została zabita świadomie. Wyrok zapada na **jednym prawdziwym
przebiegu**, wybranym po medianowym LCP, czyli po metryce, na której
stoi próg (`scripts/reprezentant.mjs`, rozstrzygnięcie właściciela
2026-08-16, rozbiór: `docs/faza-4/bramka-na-preview.md` §4b). Zamknięcie
T3 nie zamyka **rozrzutu** pomiaru — ten dostał własną pozycję T10.

**T4 — obietnica panelu K2 trzyma się jednego kroju i jednej
szerokości.** Wyszło z bramki pełnego zestawu (przebieg 31833329728):
`hero (de): H1 ≤ 3 linie na desktopie` czerwony na runnerze, zielony
lokalnie. To nie flake — to różnica deterministyczna, bo `ch` jest
jednostką zależną od kroju (szerokość cyfry „0"), a `system-ui` znaczy
inny krój na każdym systemie.

**Droga (A) — miara `22ch` → `24ch` — została wykonana (commit
`3cf7299`) i NIE ZADZIAŁAŁA.** Przebieg 31835331503: ten sam test, ten
sam wynik, `Received: 4`. Zero zmiany, i to zero jest informacją.

**Pomiar wykonany po tej porażce** (Playwright, sześć krojów × trzy
szerokości × trzy języki; `scripts/` nie zawiera go na stałe — pomiar
jednorazowy). Przy 1280 px kolumna hero daje **653 px**, H1 DE ma
**72 znaki**, a `max-width: 24ch` wypada tak:

| krój | 1ch | `24ch` daje | co realnie ogranicza | naturalna szerokość H1 DE | linie DE |
|---|---|---|---|---|---|
| system-ui na macOS | 31,47 px | 755 px | **kolumna** (miara bezczynna) | 1604 px | 3 |
| Arial / Helvetica | 26,69 px | 641 px | miara | 1675 px | 3 |
| Trebuchet MS | 28,13 px | 675 px | **kolumna** | 1633 px | 3 |
| Tahoma | 30,56 px | 734 px | **kolumna** | 1762 px | 3 |
| Verdana | 34,13 px | 819 px | **kolumna** | 1977 px | **4** |

Stąd trzy wnioski, każdy zmierzony:

1. **Krój runnera jest szerszy od Arialu**, a nie arialowy — tak
   zakładał poprzedni zapis tej pozycji i było to błędne. Jedyny
   sprawdzony krój, na którym DE łamie się na 4 linie, to Verdana
   (klasa szerokich krojów bezszeryfowych; linuksowa DejaVu Sans ma
   metrykę tej klasy). To jedyna kolumna tabeli zgodna z tym, co
   pokazuje CI.
2. **Przy szerokim kroju miara `ch` jest bezczynna**: `24ch` = 819 px,
   czyli więcej niż kolumna 653 px, więc ogranicza kolumna. `22ch`
   dawało tam 751 px — też więcej niż kolumna. Obie wartości są na
   runnerze równie nieistotne, dlatego zmiana nie dała żadnego efektu.
   Żadna wartość `ch` **większa** od ~19ch nic tam nie zmieni, a
   mniejsza pogarsza, bo zwęża.
3. **Zapas jest kwestią treści, nie miary.** Przy 653 px trzy linie
   mieszczą do 1959 px tekstu. PL ma 1619 px (zapas 21%), EN 1746 px
   (zapas 11%), DE 1977 px — **3% ponad limit**. DE jest jedynym
   językiem poza budżetem i wykracza minimalnie.

Poza 1280 px obietnica jest nieprawdziwa znacznie szerzej, niż
zapisano poprzednio — nie tylko dla DE. Przy 768 px kolumna ma tylko
**422 px**, a font jest już maksymalny (48 px), bo `clamp` dobija do
`3rem` około 640 px szerokości okna. Efekt na Verdanie: **6 linii we
wszystkich trzech językach**, także po polsku. Na macOS przy 768 px:
PL 4, EN 4, DE 5. Trzech linii nie ma tam żaden język i żaden krój.
Strażnik pilnuje jednej szerokości (`Desktop Chrome` = 1280 px), więc
tego nie widzi.

**Co z tego wynika dla zamknięcia T4.** Drogi realne były trzy i żadna
nie była zmianą miary: skrócenie H1 DE (treść), poszerzenie kolumny
hero (układ), obniżenie górnego krańca `clamp` (typografia).

Droga treści **została zamknięta oceną adwersaryjną**: każdy wariant
skróconego H1 DE odpadł, a rozstrzygający zarzut jest sprawdzalny —
bez „deine" zdanie „Catherly führt Kontakte" czyta się po niemiecku
jako *Catherly prowadzi rozmowy*, czemu ta sama strona wprost
zaprzecza (`content/de/dla-kogo.md`: „führt keine Gespräche"). To
naruszenie ADR-018, więc treść wypadła z gry.

Droga układu **została zmierzona i wdrożona**: decyzja właściciela
z 2026-08-14, wariant V5 — próg dwóch kolumn hero 48rem → **72rem**
i proporcja 3fr 2fr → **4fr 2fr** (ADR-029). Pomiar pięciu wariantów
× 3 języki × 3 kroje × 9 szerokości, Verdana jako zamiennik
najgorszego kroju:

| wariant | 1440 | 1280 | 1152 | 1024 | 900 | 768 |
|---|---|---|---|---|---|---|
| stan przed zmianą | 4 | 4 | 4 | 4 | 5 | 6 |
| próg 64rem + 4fr 2fr | 3 | 3 | 3 | **4** | 3 | 3 |
| **V5: próg 72rem + 4fr 2fr** | 3 | 3 | 3 | 3 | 3 | 3 |

**Część desktopowa T4 jest domknięta, mobilna nie.** Poniżej 768 px
H1 DE nadal ma 4–5 linii — tam hero był jednokolumnowy już przed
zmianą, więc V5 niczego nie dotknął. Obietnica panelu K2 mówiła
o desktopie i na desktopie jest teraz spełniona; poniżej 768 px nie
ma ani obietnicy, ani strażnika. **Pozycja zostaje otwarta w części
mobilnej**, a razem z nią pytanie, czy `clamp` H1 nie powinien
skalować się względem kolumny zamiast względem okna.

Zastrzeżenie do samego dowodu: wdrożenie potwierdza pomiar lokalny na
Verdanie, nie przebieg CI. Dopóki bramka pełnego zestawu nie zaświeci
na zielono, ta naprawa ma status **niesprawdzonej**, a niesprawdzona
liczy się jak niedziałająca (ADR-018).

Podstrony zostają na `22ch` — zmierzony zapas przy metryce Arial to
co najmniej jedna linia na wszystkich ośmiu adresach DE (najciaśniej:
`/de/dla-kogo` i `/de/cennik`, 3 linie przy 489 px). Zastrzeżenie po
pomiarze T4: ten zapas był liczony w metryce Arial, a krój runnera jest
szerszy. Podstrony nie mają dziś strażnika liczby linii, więc jest to
pozycja niepilnowana, a nie pozycja sprawdzona.

**T5 — zakres startu a to, co Faza 4 już zbudowała.** ADR-014 (i PLAN.md
§11) wymieniają „cztery podstrony filarów" oraz „/dla-kogo" w sekcji
**poza zakresem startu**, z zastrzeżeniem, że każde rozszerzenie wymaga
ADR-a jawnie uchylającego ADR-014. Etapy C i D gałęzi `faza-4/podstrony`
zbudowały dokładnie te strony. Przeszukanie `docs/` nie znalazło ADR-a
uchylającego ten punkt; ADR-024 zmienia **kolejność** prac (fazowanie
hybrydowe per komponent), nie zakres startu. Nie rozstrzygam tego sam —
to decyzja właścicielska o zakresie, nie usterka do naprawy. Dwie drogi:
ADR uchylający, który wciąga te strony do zakresu startu (wtedy blokują
publikację i wchodzą do „definicji startu"), albo potwierdzenie, że
istnieją w repo, ale publikują się przez /zmiany po starcie. Odnotowane
też w samym ADR-014 jako punkt 2 doprecyzowania z 2026-08-14.

**T5 — co rozstrzygnięcie z 2026-08-15 zamyka, a czego nie.** Przy
Etapie E adwersarz wykazał, że propozycja `/pomoc` z modułem K12 (H2 →
PO CO TO → JAK WYGLĄDA → CZEGO NIE ROBI) byłaby **piątą podstroną
filarową w przebraniu**, czyli powiększałaby tę właśnie lukę. Właściciel
zmienił gatunek `/pomoc` na krótki i nawigacyjny i odnotował, że „piąta
podstrona" jest **bezprzedmiotowa**. To domyka **tylko powiększenie
luki**: `/pomoc` nowego gatunku nie tworzy kolejnego bytu filarowego.
**Sam T5 zostaje otwarty** — dotyczy czterech podstron i `/dla-kogo`,
które już istnieją w repo i których żaden ADR nie wciągnął do zakresu
startu. Zapis wąski celowo: szerokie odczytanie zamknęłoby lukę ADR-014
bez decyzji, która by ją zamykała, a to jest dokładnie ten rodzaj cichego
domknięcia, przed którym stoi ten rejestr.

**T5 — ZAMKNIĘTE decyzją właściciela 2026-08-15 (późniejszą tego samego
dnia).** Wąskie odczytanie z akapitu wyżej okazało się słuszne
proceduralnie i **zbędne merytorycznie**: postawione właścicielowi
osobno, dostało odpowiedź wprost. **Cztery podstrony filarów
i `/dla-kogo` WCHODZĄ do zakresu startu** — ADR-014, doprecyzowanie
2026-08-15 (II). Uzasadnienie właściciela: strony istnieją,
są opublikowane w trzech językach, mają testy i przechodzą bramki;
rozbieżność między tym stanem a literą ADR-014 jest **luką formalną**,
nie sporem o zakres — nikt nigdy nie postanowił, że mają czekać
na `/zmiany`.

Trzy rzeczy warto odnotować, bo wynikają z tego, a nie są w decyzji
napisane wprost. **(1)** Pięć adresów wchodzi do „definicji startu"
z ADR-014 — od teraz blokują publikację, więc ich bramki są bramkami
premiery, nie bramkami gałęzi roboczej. **(2)** Reszta listy „poza
zakresem startu" jest **nietknięta**: `/o-catherly`, `/blog`, demo,
`/integracje`, porównania, kalkulator, narzędzie-magnes, webinary,
rozbudowany element podpisu. Rozstrzygnięcie dotyczy pięciu adresów
i nie jest precedensem. **(3)** Forma pozostaje doprecyzowaniem, choć
sekcja „Konsekwencje" ADR-014 żąda dla rozszerzeń ADR-a jawnie
uchylającego. Właściciel nazwał to luką formalną świadomie; zapisuję
to zdanie, żeby przyszły czytelnik nie musiał odtwarzać rozumowania,
a nie jako zastrzeżenie — decyzja jest podjęta i nic nie wstrzymuje.

Pozycja **T8** niżej zapisuje ruch przeciwny z tego samego dnia:
`/pomoc` wychodzi z zakresu startu. Obie decyzje zapadły tego samego
dnia i nie są ze sobą sprzeczne — pierwsza zapisuje strony, które
**istnieją i działają**, druga wycofuje stronę, która **nie ma czym
być**. Kryterium jest w obu wypadkach to samo: stan faktyczny wygrywa
z literą planu.

**T6 — bramka liczb jest ślepa na warstwę, w której dziś mieszka
treść.** Sprawdzone wykonaniem 2026-08-15, nie przeczytane z kodu:
`npm run bramka:liczby` kończy się komunikatem „Linter liczb: zielony."
i kodem 0, podczas gdy w `src/i18n/messages/*.json` stoi **14 polskich
ciągów z liczebnikami słownymi** bez pokrycia w `facts.json`. Przyczyna
jest dwuczłonowa i obie części są w pliku widoczne: `SCAN_EXT` to
`{".tsx", ".jsx"}` (`scripts/lint-liczby.mjs:18`), więc pliki `.json`
nie są w ogóle otwierane; a wzorzec `/>[^<>{}]*\d[^<>{}]*</`
(tamże :44) wymaga **cyfry** i wyklucza klamry, więc nawet w `.tsx`
każdy tekst renderowany przez `{t(...)}` jest poza zasięgiem, a
liczebnik słowny jest niewidoczny wszędzie.

Skutek dokumentacyjny: `content/karta-tonu.md:61` mówi „Każda liczba
pochodzi z content/facts.json — bez wyjątku **(bramka)**". Człon
w nawiasie jest wobec stanu faktycznego nieprawdziwy — reguła
obowiązuje, ale nikt jej nie pilnuje maszynowo. To nie jest usterka
lintera do naprawy przy okazji, tylko **fałszywy zielony**: bramka
świeci na dowód, którego nie wykonała.

Warunek zamknięcia rozstrzygnął właściciel 2026-08-15 — **osobne
zlecenie po Etapie E**, w trzech krokach i w tej kolejności:
(1) rozszerzenie skanu na warstwę `messages` (cyfry **i** liczebniki
słowne), (2) inwentarz 14 istniejących ciągów z rozstrzygnięciem
**per ciąg**: pokrycie w `facts.json` / redakcja / świadomy wyjątek
z adnotacją, (3) sprostowanie karty tonu pkt 5 dopiero **po** naprawie,
żeby zapis znów opisywał stan, a nie zamiar. Do tego czasu każda nowa
treść z liczbą przechodzi przez człowieka, bo bramka jej nie zobaczy.

**T10 — co dokładnie zostało zamrożone (w rozmowie: „O5").** Nie jest
to podejrzenie, tylko liczby z przebiegu 31957994362 (`26c38f2`,
bramka **zielona** 7/7). Kolumny: reprezentant · zapas do progu 1800 ms
· rozrzut LCP między pięcioma przebiegami tej samej trasy.

| Trasa | Reprezentant | Zapas | Rozrzut |
|---|---|---|---|
| `/` | 1533 ms | +267 | 328 ms |
| `/funkcje` | 1417 ms | +383 | 683 ms |
| `/dla-kogo` | 1511 ms | +289 | 965 ms |
| `/funkcje/pozyskiwanie` | 1475 ms | +325 | 462 ms |
| `/funkcje/tresci` | 1397 ms | +403 | **1441 ms** |
| `/funkcje/zespol` | 1561 ms | +239 | 651 ms |
| `/funkcje/wyniki` | 1542 ms | +258 | 597 ms |

Na **każdej** trasie rozrzut jest szerszy od zapasu, miejscami
kilkukrotnie. Znaczy to tyle, że o zieleni współdecyduje stan runnera:
`benchmarkIndex` tego samego pomiaru chodził 2026-08-16 od ~2161 rano
do ~3368 wieczorem, a przy `throttlingMethod: "simulate"` wolniejszy
runner mnoży zmierzoną pracę CPU. Reguła werdyktu tego **nie leczy**
i nigdy nie miała leczyć: ona wybiera reprezentanta po metryce, na
której stoi próg, więc odbiera wyskokowi prawo do wydania wyroku —
ale wyskok dalej się zdarza i dalej jest w danych widoczny.

Zamrożenie jest świadome i ma cenę zapisaną wprost: bramka wydajności
jest dziś **wskaźnikiem regresu, nie gwarancją progu**. Wyłapie zmianę,
która przesunie całą trasę, i przepuści taką, która mieści się
w hałasie. Warunek powrotu właściciela — „przerzuci się **na medianie**,
nie na wyskoku" — jest wobec tego dobrany do tego, czym bramka dziś
jest: dopóki reprezentant trzyma się pod progiem, hałas kosztuje
niepewność, nie fałszywy alarm. Dopiero czerwień na reprezentancie
znaczy, że mediana wyszła z budżetu, i wtedy trzeba rozstrzygnąć, czy
to regres kodu, czy pomiar wymaga wzmocnienia. Oczywisty lek
(więcej przebiegów) nie jest z góry wybrany: zwężałby rozrzut mediany,
ale wydłuża pomiar i nie usuwa przyczyny, którą jest zmienność runnera.

**„Najbliższe zlecenie Z" (poz. 17, 18, 19, 23, 24) = Z7**, spisane
2026-08-13: `docs/faza-4/zlecenie-Z7.md`. Do czasu odpowiedzi okna
aplikacji pozycje pozostają otwarte — zlecenie wysłane to nie jest
warunek spełniony.

Pozycje zamknięte (dla historii): „kto czeka na odpowiedź" (usunięta
na stałe — brak funkcji); „co z tego jest twoje" (zredukowana do „co
się sprzedało"); FAQ-faktura i trial rozstrzygnięte 2026-08-09 jako
milczenie warunkowe (wiersze 2–3).
