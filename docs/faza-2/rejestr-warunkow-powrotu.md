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
| T3 | Pomiar wydajności na preview Vercel + mediana jako werdykt (kod gotowy, tryb NIEAKTYWNY) | `lighthouserc.cjs`, `.github/workflows/bramki.yml` | Udostępnienie preview przez właściciela (ochrona wdrożeń) + potwierdzenie, że mierzony adres odpowiada testowanemu commitowi |
| T4 | Obietnica „H1 ≤ 3 linie" — część desktopowa (768 px wzwyż) naprawiona przez ADR-029, ale potwierdzona tylko pomiarem lokalnym; **poniżej 768 px nadal nieprawdziwa** (DE 4–5 linii) i niepilnowana | `src/components/Hero.module.css`, `e2e/hero.spec.ts`, `docs/adr/029-prog-i-proporcje-hero.md` | (1) zielony pełny zestaw e2e jako dowód naprawy desktopu, (2) rozstrzygnięcie właściciela, czy obietnica ma obejmować < 768 px — jeśli tak, `clamp` względem kolumny zamiast okna + strażnik na 390 px |
| ~~T5~~ **ZAMKNIĘTE 2026-08-15** | Strony zbudowane w Fazie 4 (cztery podstrony filarów, /dla-kogo) są w ADR-014 wymienione POZA zakresem startu; nie znaleziono ADR-a uchylającego | `docs/adr/014-zakres-zamrozony-iteracji-1.md`, `docs/PLAN.md` §11 | **Rozstrzygnięte przez właściciela 2026-08-15: pięć adresów WCHODZI do zakresu startu** (ADR-014, doprecyzowanie 2026-08-15 II). Uzasadnienie: strony istnieją, są opublikowane ×3 języki, mają testy i przechodzą bramki — rozbieżność była luką formalną, nie sporem o zakres. Forma: doprecyzowanie, nie ADR uchylający; właściciel nazwał to luką formalną świadomie. Pozostałe pozycje listy „poza zakresem startu" **nietknięte** |
| ~~T6~~ **ZAMKNIĘTE 2026-08-16** | `bramka:liczby` **nie widziała warstwy `messages`** — skanowała wyłącznie `.tsx`/`.jsx` i tylko tekst z **cyfrą** poza klamrami, więc każdy ciąg renderowany przez `{t(...)}` był poza bramką, a liczebniki słowne były niewidoczne wszędzie. Karta tonu pkt 5 („bez wyjątku (bramka)") była wobec tego stanu nieprawdziwa | `scripts/lint-liczby.mjs`, `content/liczby-w-tresci.json`, `content/karta-tonu.md:61`, `docs/faza-4/bramka-liczby-warstwa-tresci.md` | **Wykonane 2026-08-16** (zlecenie właściciela po pushu 083d9f0): przebieg 2 bramki czyta `src/i18n/messages/*.json` — cyfry **i** liczebniki słowne 2–1000 ×3 języki; rozstrzygnięcia per ciąg w `content/liczby-w-tresci.json` (kategoria + pokrycie + komplet liczb, zmiana liczby zapala czerwień). **Inwentarz wyszedł na 16 kluczy, nie 14** — szacunek z 2026-08-15 był o dwa za niski (rozbiór: dokument roboczy §2). Karta tonu pkt 5 przepisana: mówi, co bramka pilnuje, i nazywa dwa miejsca, których NIE pilnuje (rodzina „jeden/one/ein", liczebniki porządkowe). Dowody: 11 mutacji, dokument roboczy §5 |
| T7 | **Zdania z datą ważności — brak rejestru i brak mechanizmu.** W serwisie stoją zdania prawdziwe wyłącznie DO PREMIERY, a w repozytorium nie ma ani bramki, ani adnotacji, ani listy, która by je znała. W dniu premiery stają się fałszem o własnym serwisie i nic tego nie zapali. Znane dziś: `StronaLogowania.tresc` („Logowanie będzie dostępne przy premierze aplikacji." ×3 języki), `Stopka.wkrotce` przy czterech dokumentach prawnych i przy kontakcie (`(wkrótce)` / `(coming soon)` / `(folgt in Kürze)`) | `src/i18n/messages/{pl,en,de}.json`, `src/components/Stopka.tsx:74-89`, `src/app/[locale]/login/page.tsx` | **Decyzja właściciela 2026-08-15: pozycja na checkliście premiery, BEZ budowy mechanizmu.** Zakres: inwentarz wszystkich zdań przedpremierowych ×3 języki z decyzją per zdanie (usunąć / przepisać / aktywować link). Wykonanie: przed premierą, nie teraz. Świadomie nie budujemy bramki wygasania — dług ma być **zapisany**, nie zapamiętany |
| T8 | **`/pomoc` wycofana z zakresu startu** (ADR-014, doprecyzowanie 2026-08-15 III) po trzech kompletach werdyktów adwersaryjnych NIE PRZECHODZI. Strona nie istnieje: brak w `ISTNIEJACE_SCIEZKI`, brak w mapie stopki, brak pliku | `docs/adr/014-zakres-zamrozony-iteracji-1.md`, `docs/faza-4/etap-e-pomoc-decyzje.md`, `src/i18n/sciezki.ts` | **Powrót po premierze, warunek potrójny (właściciel 2026-08-15):** (1) treść **z odczytu** — realne pytania użytkowniczek zamiast domysłów redakcji, (2) **istniejący kanał kontaktu**, nie stan „(wkrótce)", (3) **onboarding przetestowany**, nie zapowiedziany. Przed spełnieniem wszystkich trzech strona nie ma czym być — zamknięcie E-1 |
| T9 | **Wskaźnik zagnieżdżenia w mapie stopki — wariant z kreską odłożony.** Sędzia panelu chciał pionowej kreski wzmacniającej hierarchię czterech filarów pod `/funkcje`. Wdrożone **bez kreski**: `--kolor-rola-kreska` daje na powierzchni stopki **1,34:1** przy progu 3:1 (WCAG 1.4.11), więc kreska mogłaby wystąpić wyłącznie jako dekoracja — a dekoracja obok wcięcia myli co do tego, co **niesie** informację. Hierarchię trzyma dziś wcięcie (`.stopka li ul`) plus drzewo DOM (`<ul>` wewnątrz `<li>` rodzica) | `src/components/Stopka.module.css`, `src/styles/generated/tokeny.css:67`, `docs/faza-4/etap-e-pomoc-decyzje.md` §WYKONANIE | **Decyzja właściciela 2026-08-16: BEZ kreski; wariant `--kolor-rola-tekst-drugorzedny` (7,07:1) → do przeglądu przy bloku designu.** Nie jest to dług techniczny do spłaty, tylko decyzja **wizualna** właściciela odłożona do miejsca, gdzie ogląda się żywy materiał, a nie liczbę kontrastu w oderwaniu. Warunek powrotu: blok designu — łącznie z T1 i mobilną częścią T4 |

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

**„Najbliższe zlecenie Z" (poz. 17, 18, 19, 23, 24) = Z7**, spisane
2026-08-13: `docs/faza-4/zlecenie-Z7.md`. Do czasu odpowiedzi okna
aplikacji pozycje pozostają otwarte — zlecenie wysłane to nie jest
warunek spełniony.

Pozycje zamknięte (dla historii): „kto czeka na odpowiedź" (usunięta
na stałe — brak funkcji); „co z tego jest twoje" (zredukowana do „co
się sprzedało"); FAQ-faktura i trial rozstrzygnięte 2026-08-09 jako
milczenie warunkowe (wiersze 2–3).
