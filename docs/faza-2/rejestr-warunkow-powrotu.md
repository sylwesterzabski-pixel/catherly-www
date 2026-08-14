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
| T4 | Obietnica „H1 ≤ 3 linie na desktopie we wszystkich językach" (panel K2) — NIEPRAWDZIWA przy 1024 px i 768 px, na każdym kroju | `src/components/Hero.module.css`, `e2e/hero.spec.ts` | Skrócenie H1 DE (panel DE) albo poszerzenie kolumny hero — miara `ch` tego nie naprawi |

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
lokalnie. To nie flake — to różnica deterministyczna, a mechanizm jest
odwrotny do intuicji. Przy 1280 px kolumna hero daje **653 px**,
a H1 DE ma **72 znaki**:

| krój | 1ch | `22ch` daje | co robi H1 DE |
|---|---|---|---|
| system-ui na macOS | 31,4 px | 690 px — **więcej niż kolumna** | ogranicznik nie działa, H1 dostaje pełne 653 px → 3 linie |
| metryka Arial/Helvetica (runner) | 26,2 px | 577–587 px — ogranicznik działa | DE potrzebuje ~588 px → **4 linie** |
| metryka Arial przy `24ch` | 26,2 px | 641 px | zapas ~53 px → 3 linie |

Czyli `22ch` nigdy nie było na desktopie sprawdzone jako
ograniczenie — na maszynie autora panelu w ogóle nie działało, bo
było szersze od kolumny. Zielone było przypadkiem, a margines wynosi
około **1 px** (587 wobec ~588).

Poza 1280 px obietnica jest nieprawdziwa **niezależnie od kroju**,
także na macOS: przy 768 px H1 DE ma **5 linii** na obu krojach, przy
1024 px kolumna daje 576 px i DE ma 4 linie w metryce Arial — czego
żadna wartość `ch` nie naprawi, bo ogranicza kolumna, nie miara.
Strażnik pilnuje jednej szerokości (`Desktop Chrome` = 1280 px), więc
tego nie widział.

**Rozstrzygnięcie właściciela 2026-08-14: droga (A)** — miara `22ch`
→ `24ch` w `Hero.module.css`. Wybrana z czterech: (B) skrócić H1 DE
o ~5 znaków (treść OBOWIĄZUJE, więc panel DE plus aktualizacja
strażnika „znak w znak"), (C) przypiąć krój pisma (ADR-027 — usuwa
całą klasę zmienności międzyplatformowej, ale dokłada pobranie fontu
do LCP, gdzie zapas do progu 1800 wynosi dziś ~90 ms), (D) zawęzić
obietnicę do „≤ 3 linie od 1280 px" i rozszerzyć strażnika na 1024
i 768 px.

**Co (A) załatwia, a czego nie — bez zaokrąglania.** Załatwia
bramkę przy 1280 px i nie zmienia na macOS ani jednego piksela, bo
tam nadal ogranicza kolumna. **Nie załatwia** 1024 px ani 768 px:
tam ogranicza kolumna hero, nie miara, więc żadna wartość `ch`
nie pomoże. Dlatego pozycja T4 **zostaje otwarta** — warunkiem jej
zamknięcia jest skrócenie H1 DE albo poszerzenie kolumny, nie ta
zmiana. Strażnik biegnie na jednej szerokości (`Desktop Chrome`
= 1280 px), więc dwie pozostałe nie mają dziś żadnego pilnowania;
gdyby właściciel chciał je zapisać, drogą jest (D), niezależna od (A).

Podstrony zostają na `22ch` — zmierzony zapas przy metryce Arial to
co najmniej jedna linia na wszystkich ośmiu adresach DE (najciaśniej:
`/de/dla-kogo` i `/de/cennik`, 3 linie przy 489 px).

**„Najbliższe zlecenie Z" (poz. 17, 18, 19, 23, 24) = Z7**, spisane
2026-08-13: `docs/faza-4/zlecenie-Z7.md`. Do czasu odpowiedzi okna
aplikacji pozycje pozostają otwarte — zlecenie wysłane to nie jest
warunek spełniony.

Pozycje zamknięte (dla historii): „kto czeka na odpowiedź" (usunięta
na stałe — brak funkcji); „co z tego jest twoje" (zredukowana do „co
się sprzedało"); FAQ-faktura i trial rozstrzygnięte 2026-08-09 jako
milczenie warunkowe (wiersze 2–3).
