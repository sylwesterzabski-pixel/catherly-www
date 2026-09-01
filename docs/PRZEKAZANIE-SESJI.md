# Przekazanie sesji — stan na 2026-08-23

Dokument pisany dla **następnej sesji agenta**, bo poprzednia zamknęła się na
limicie kontekstu i wszystko, co niżej, przechodziło dotąd ustnie. Zawiera stan
faktyczny, zasady obowiązujące bez pytania, listę tego, co zrobione, i listę
tego, co czeka — z zaznaczeniem, co jest zablokowane na decyzji właściciela.

Zasada nadrzędna przy czytaniu: **każda liczba tutaj niesie datę i commit**
(kanon ADR-018). Jeśli używasz którejś w nowym dokumencie, sprawdź najpierw, czy
commit jest nadal osiągalny: `git merge-base --is-ancestor <skrót> HEAD`.

---

## 0. START — przeczytaj to, zanim cokolwiek zrobisz

Ten plik jest **punktem wejścia**. Wskazuje na niego `CLAUDE.md`, żeby nie dało
się go minąć — reguła kanonu „raport, którego nikt nie czyta, przestaje być
raportem" dotyczy także tego dokumentu.

⏸ **STAN NA 2026-09-01: WWW W SPOCZYNKU — CZEKA NA NOWY WZORZEC Z FRAMERA.**
Decyzja właściciela (26.08.2026): obecna kompozycja strony głównej jest
**unieważniona**. Nowy wzorzec = publikacja właściciela z Framera; następne
zlecenie po jej nadejściu. **WWW/063 nie istnieje** (numer unieważniony, nigdy
nie wysłany). Sesja otwarta na nowo: **przeczytaj stan, zamelduj i czekaj —
nie zaczynaj pracy z własnej ręki.** Drzewo czyste, zdalny zsynchronizowany,
zero niewypchniętych.

**Kolejność czytania (30 minut, nie skracaj):**

1. `CLAUDE.md` (785 linii, stan 2026-08-26) — zasady wiążące. Ten plik ich nie
   zastępuje; **`CLAUDE.md` jest nad nim w hierarchii** (T32: ADR → `CLAUDE.md`
   → rejestr → to przekazanie → dokumenty paneli). Od 2026-08-23 ma rozdział
   **„Dziesięć zakazów"**, który mówi, czego nie wolno ZLECIĆ — wiążący także
   dla zleceń właściciela (T34) — oraz rozdział **„Hierarchia źródeł reguł"**.
2. **Ten dokument, w całości.**
3. `docs/faza-2/rejestr-warunkow-powrotu.md` — 24 pozycje treści + **54** pozycji technicznych
   **T1–T54** + **skorowidz ogniw** (T39). T54 dopisane 2026-09-01 (`WWW/064`): luka
   `pnpm install --ignore-scripts` → hook nieaktywny. **Skorowidz wszystkich w rozdziale 15**,
   szczegóły bieżącej linii w rozdziale 6 — ale **skorowidz to nie jest
   lektura rejestru**.
   **WWW/065 wykonane 2026-09-01** (rola INŻYNIER PROGRAMOWANIA + INŻYNIER DESIGNU):
   `docs/design/SPEC-STRONY-DLA-FRAMERA.md` — specyfikacja zwrotna pod prompt do Framera,
   §1–§8 (mapa serwisu, treść verbatim ×3, obrazy, ograniczenia, SEO, [BRAK]/[LUKA],
   wzorzec Habitline+Nexus, mapowanie). Zero zmian w kodzie. Commit czeka na push razem
   z resztą gałęzi.
4. `docs/adr/` — skorowidz trzydziestu tytułów w rozdziale 16, treść tylko tego
   ADR-a, którego dotyczy Twoje zadanie.
5. Rozdział 17 — mapa CI, siedmiu tras i poleceń `npm`, jeśli masz tknąć bramki.

**Pierwsze polecenia po starcie — sprawdź stan, nie zakładaj go:**

```bash
cd "/Users/sylwesterzabski/Documents/FBO OS - www/catherly-www"
git status --short && git log --oneline -1
git log --oneline origin/faza-4/podstrony..HEAD   # co czeka na push
lsof -ti:3000                                     # RAPORTUJ, nie zabijaj
```

**Czego NIE wolno zrobić na starcie, choćby wyglądało niewinnie:**

- **Nie pushuj.** Gałąź niesie commity czekające na zgodę właściciela wyliczoną
  co do commita; **liczby tu nie wpisuję, bo starzeje się przy każdym commicie** —
  przelicz `git log --oneline origin/faza-4/podstrony..HEAD`. Zgoda z poprzedniego
  pakietu jest wyczerpana i nie przechodzi dalej (zakaz 1, T31): **każda liczba
  przepisana z tego pliku zamiast przeliczona jest dokładnie tym błędem**,
  bo lista rozbieżna z zatwierdzoną to push bez zgody.
- **Nie uruchamiaj bramki wydajności równolegle z niczym innym** i nie pchaj
  niczego w trakcie jej trwania — to jest dokładnie defekt T22.
- **Nie naprawiaj defektów, których nikt nie zlecił.** Wpis do rejestru, i dalej.
- **Nie zakładaj, że liczby w tym pliku są dziś aktualne.** Każda niesie datę
  i commit właśnie po to, żebyś mógł je sprawdzić.

**Masz obowiązek utrzymywać ten plik w prawdzie — na bieżąco**
(polecenie właściciela 2026-08-20; wiążące brzmienie w `CLAUDE.md`, sekcja
„Przekazanie sesji aktualizowane na bieżąco”).

Reguła w jednym zdaniu: **aktualizacja idzie w TYM SAMYM commicie co zmiana,
którą opisuje.** Nie osobnym commitem „potem" — sesja kończy się na limicie
kontekstu bez ostrzeżenia, więc „potem" znaczy „nigdy". Commit zmieniający stan
repozytorium i zostawiający ten plik nieaktualnym jest **niekompletny**.

Przed każdym commitem przelatujesz pięć miejsc: rozdz. **1** (skróty, liczba
niewypchniętych, stan zdalny), **7** (czy zrobione nadal stoi jako „do
zrobienia"), **9** (czy przewróciłeś się na czymś wartym zapisania), **15**
(nowa pozycja rejestru), **17** (zmiana bramki, trasy, polecenia `npm`).

Ten dokument **unieważnia własną tabelę stanu przy każdym commicie** — łącznie
z commitem, który ją poprawia. Rozwiązanie, którego się trzymaj: pól
samostarzejących się nie wpisuje się wartością, tylko poleceniem do
przeliczenia. Dotyczy to skrótu commita niosącego ten plik (commit nie może
zawierać własnego skrótu — próba daje widmo, sprawdzone) i nazwy ostatniego
backupu.

**Reguła nie ma strażnika** — pilnuje jej wyłącznie zapis w `CLAUDE.md`, czyli
dokładnie klasa „brak dowodu = brak zabezpieczenia". Odnotowane jako **T25**;
budowa strażnika czeka na decyzję właściciela (7.2.8).

**Stan świadomości właściciela:** wie o wszystkim, co jest w rozdziałach 4–6.
Czeka na jego decyzję siedem rzeczy z rozdziału 7. Nie zaczynaj od zadawania
pytań, na które odpowiedź jest w rozdziale 7 — zacznij od sprawdzenia, czy
odpowiedź już padła.

**Hierarchia źródeł reguł — SIEDEM SZCZEBLI, uzupełniona 2026-08-24 (T32).**
Kolejność od nadrzędnego: **1. ADR** (`docs/adr/`) → **2. `CLAUDE.md`** →
**3. `docs/STRATEGIA.md`** → **4. `docs/PLAN.md`** → **5. rejestr warunków
powrotu** → **6. to przekazanie** → **7. dokumenty paneli**. Pierwsza wersja
(2026-08-23) wymieniała **pięć** i pomijała STRATEGIĘ oraz PLAN — oba
deklarowały wtedy własne pierwszeństwo, więc powstały dwie sprzeczne
deklaracje nadrzędności. **Kanon stoi nad strategią**, bo strategia mówi CO,
a kanon JAK — przy sprzeczności wygrywa sposób pracy, nie zamiar. Przy równym
poziomie wygrywa nowsze, ale **rozjazd między dokumentami tego samego poziomu
zgłaszasz, nie rozstrzygasz po cichu**. Zapis stoi w `CLAUDE.md`, w rozdziale
„Hierarchia źródeł reguł" — jako rozdział, nie jako szósty plik (zakaz 10).
Ponad tym wszystkim nadal **ADR-018 wygrywa z wszystkim**, zadeklarowany wprost
w trzech niezależnych miejscach (`docs/adr/README.md:7`, `docs/adr/018-…:4`,
`docs/PLAN.md:473-474`). **Czego jeszcze nie ma:** zdania o miejscu w hierarchii
w nagłówkach czterech pozostałych dokumentów — warunek zamknięcia T32 mówił
o pięciu plikach, więc pozycja pozostaje otwarta.

---

## 1. Stan repozytorium jednym rzutem oka

| | |
|---|---|
| Katalog pracy | `/Users/sylwesterzabski/Documents/FBO OS - www/catherly-www` — **wyłącznie tu** |
| Gałąź | `faza-4/podstrony` |
| HEAD lokalny | **nie wpisuję wartością** — pole samostarzejące się, unieważnia je każdy commit łącznie z tym, który je poprawia: `git rev-parse --short HEAD` |
| HEAD zdalny (`origin/faza-4/podstrony`) | **przelicz, nie przepisuj** — `git ls-remote origin faza-4/podstrony`. Stan 2026-08-26 po `WWW/028`: patrz rozdz. 4.22. Każdy push szedł na osobną, wyliczoną zgodę i **jawnym refspec** (zakaz 1); od 2026-08-24 to jedyna dopuszczalna forma. Historia zgód: `69c2dab` → `f2db728` (pakiet dwunastu, 23.08), `f2db728` → `d7a2fe3` (23.08), `d7a2fe3` → `231a17b` (24.08), `231a17b` → `74fdfe8` (24.08, dwa commity) `74fdfe8` → `361c7db`, `361c7db` → `6d55a80`, `6d55a80` → `6f13ed8`, `6f13ed8` → `84a7037`, `84a7037` → `9b3a2dd`, `9b3a2dd` → `8999f0e` (dwa commity) i `8999f0e` → `bd1c2ff` (24.08). **Od 2026-08-24 push idzie WYŁĄCZNIE z jawnym refspec** — `git push origin <skrót>:refs/heads/<gałąź>` — bo `git push` bez refspec zamienia zgodę na listę w zgodę na stan (zakaz 1). **Skrót przelicz, nie przepisuj** — `git ls-remote origin faza-4/podstrony` |
| `origin/main` | `0896219` — j.w. |
| Niewypchnięte | **liczby nie wpisuję** — pole samostarzejące się, rośnie przy każdym commicie łącznie z tym, który je poprawia, a commit nie może zawierać własnego skrótu. Jedyna dopuszczalna postać to polecenie: `git log --oneline origin/faza-4/podstrony..HEAD`. Najstarszy w pakiecie: `e8b3b73` (2026-08-19, osiągalny), najmłodszy — zawsze `HEAD`. Migawki liczby **celowo tu nie ma**: wpisana 2026-08-20 wartość „9" przeżyła dwa commity i wprowadzała w błąd dokładnie w miejscu, w którym błąd kosztuje push bez zgody |
| Drzewo robocze | czyste |
| **STAN PRACY** | ⏸ **SPOCZYNEK — WZORZEC UNIEWAŻNIONY (decyzja właściciela 26.08.2026).** Nowy wzorzec = publikacja właściciela z Framera; do jej nadejścia nie ma pracy do wykonania. **WWW/063 nie istnieje** (numer unieważniony, nigdy nie wysłany). Strona główna w gałęzi ma 9 sekcji zbudowanych wg _poprzedniego_ wzorca — całość czeka na ocenę pod nowym. Historia prac poniżej. ▶ **KROK 2 z `WWW/050-FINAL` DOMKNIĘTY — wszystkie dziewięć sekcji strony głównej przebudowane na wzorzec (`WWW/057`–`WWW/060`).** 2.1 nawigacja (pigułka, hamburger bez JS), 2.2 hero (wyśrodkowane, mockup Z6), 2.3 sześć kart (zero nowej treści — cytaty z kluczy), 2.4 filary, 2.5 pas możliwości, 2.6 cennik z plakietką, 2.7 **opinie ŚWIADOMIE POMINIĘTE** (T53 — prawdziwych cytatów nie ma, a nasze odpowiedzi w tej roli byłyby pseudo-dowodem), 2.8 finał i stopka, 2.9 ruch. **Zgodność zmierzona co do piksela** dla nawigacji, hero, kart, filarów i cennika; pas −75,0 px/s przy R² 1,0; wejście 330,9/247,7 ms wobec 334,9/251,0 wzorca. **Pełny e2e 672 passed / 4 skipped / 0 failed, axe 60/60.** Artefakty odbioru: 6 zrzutów i 4 nagrania (pary desktop i mobile) poza repozytorium. Poprzednio: **KROK 2 W TOKU (`WWW/056` pkt 3), pomiary 0.4 i 0.7 wykonane — i OBALIŁY TRZY USTALENIA, na których stały ADR-040 i ADR-041** (ADR-044). (1) **Role krojów były ODWROTNE**: wzorzec niesie Interem 257 elementów tekstu, w tym wszystkie H1 i H2; Satoshi występuje na DWÓCH elementach po 12 px — to plakietka. Preload wskazywał plik, którego element LCP nie używa; przepięty na Inter. (2) **Tracking JEST progowy** (−1 / −1,6 / −3 px), ani stały w px, ani w em. (3) **H2 nie idzie za H1 w ŻADNEJ z trzech własności** — rozmiar ×0,63 wobec ×0,49, interlinia 1,40 wobec 1,20, tracking −0,6 wobec −1. Po korekcie **skala zgodna ze wzorcem co do piksela na sześciu szerokościach**. Jedno dodanie spoza wzorca: `overflow-wrap`+`hyphens` na nagłówkach, bo polskie słowa przy 38 px łamały **reflow na 320 px** (2 px i 8 px nadmiaru; wzorzec tego nie ma, bo składa po angielsku). **Menu mobilne wzorca zmierzone**: nagłówek 80 px, pigułka o promieniu 50 px, tło półprzezroczyste z rozmyciem, wcięcie 20/40/120 px; otwarcie panelu **177,2 ms**, obrót kresek hamburgera **392,8 ms**, zanik środkowej **610 ms**; ruchu ciągłego na starcie ZERO (kontrola negatywna na obu kadrach). Poprzednio: **KROK 1 z `WWW/050-FINAL` DOMKNIĘTY — 1.1, 1.2 i 1.3 (2026-08-26, rola IMPLEMENTACJA), push czeka na zgodę.** KROK 1.3 (ADR-041): skala nagłówków idzie **PROGAMI 70/53/34 px, nie `clamp()`** — to różnica konstrukcyjna, bo `clamp()` produkuje rozmiary pośrednie, których wzorzec nigdy nie pokazuje. Zmierzone po wdrożeniu na sześciu szerokościach: **zgodność co do piksela na wszystkich trzech zakresach**. Tracking −3 px zapisany jako `-0.1875rem` (`rem` liczy się od korzenia, więc zachowuje się jak px — poprzednie `-0.02em` dawało przy 70 px −1,4 px zamiast −3). **Trzy nadpisania komponentowe zdjęte** — tokeny `--tekst-h1*` istniały i **nikt ich nie czytał**, H1 brał rozmiar z `clamp()` wpisanego wprost w `Hero`, `NaglowekPodstrony` i `cennik`. Geometria wzorca w tokenach (kontener 90rem, kolumna prozy 50rem, siatka odstępów, promienie). **Skutek uboczny wyłapany dopiero testami:** interlinia prozy 1,6 → 1,80 podniosła sticky nagłówek 80,59 → 87,797 px, zapas `scroll-padding` zszedł do **0,20 px** i pękł **na zaokrągleniu przewijania**, nie na wysokości; przeliczone 5.5 → **5.75rem** na powtórzonym rozrzucie 42 kombinacji. `6rem` odrzucone — siadłoby na pułapie 96 px, czyli ta sama pomyłka w drugą stronę. **Pełny e2e 668 passed / 4 skipped / 0 failed.** Poprzednio: **KROK 1.2 z `WWW/050-FINAL` wykonany (2026-08-26, rola IMPLEMENTACJA), push czeka na zgodę.** Kroje wzorca self-hostowane (ADR-040): **Satoshi Medium** statyczny 500 w nagłówkach (17,3 kB) + **Inter** zmienny `wght` w prozie (39,8 kB) — **razem 57,1 kB przy budżecie 120 kB**. Oba pobrane z **własnych źródeł** (fontshare.com i `google/fonts`), nie z CDN wzorca; licencje odczytane **z tabel `name` plików**. Onest usunięty. **Trzy rzeczy warte zapamiętania:** (1) oś `opsz` w Interze przypięta do 16 — wolna kosztowała **20,1 kB** za zakres, którego nikt nie rusza; (2) podzbiór `Inter` z KROKU 0 **nie zawierał polskich cudzysłowów** `’ “ ” „` ani `←` — był zbudowany pod zestaw wzorca, nie nasz, i wszedłby cicho; (3) `U+2713 ✓` włączony świadomie, więc **T14 przestaje dotyczyć warstwy kroju** — zmierzone na renderze, znak składa Inter. `size-adjust` **zmierzony** (102,0% i 107,4%), nie założony jak w ADR-031. **Pełny e2e 668 passed / 4 skipped / 0 failed.** Poprzednio: **`WWW/055` wykonane (2026-08-26, rola IMPLEMENTACJA), push czeka na zgodę.** R-AKCENT-01 i R-AKCENT-02 przepisane z **zakazu barwy na warunek kontrastowy** (ADR-039); rozdzielność trójki usunięta, mechanizm `outline-offset` **dostał strażnika, którego NIE BYŁO** (pytanie zerowe: zero asercji na ten ciąg w całym `e2e/`). **Przy okazji znaleziono i naprawiono ZWIS PO ADR-038 wprowadzony przeze mnie w KROKU 1.1 i już wypchnięty:** `Hero.module.css` odwoływał się do usuniętej roli `--kolor-rola-tekst-na-inwersji`, przez co dekoracja „duch" renderowała się **pełną bielą na 256 px** zamiast 6% alfy — obwódka fokusu CTA miała na niej **1:1**. **Pełny e2e: 668 passed, 4 skipped, ZERO upadków** (przed naprawą 7 upadków). **`bramka:kontrakt` CZERWONA i wymaga decyzji właściciela — ΔE szwu strona↔aplikacja wynosi 93,92 przy progu 5,0**; szczegóły niżej. Poprzednio: ⏸ **`WWW/047` wykonane, push czeka na zgodę** (2026-08-26, rola IMPLEMENTACJA). Warstwa ruchu CSS-only (R1–R5) + **nowa bramka `e2e/ruch.spec.ts`**: do tej doby kanon „ruch zawsze z prefers-reduced-motion" był **napisem bez mechanizmu**, bo serwis nie miał ani jednej animacji. Teraz ma mechanizm i kontrolę pozytywną. **Pełny e2e 636 → 658 passed, zero upadków; CLS z ruchem 0,00000.** Poprzednio: `WWW/045` — wykonane w części (2026-08-26, rola IMPLEMENTACJA). Fala 1 kadrów: 10 pobranych i sprawdzonych, 8 osadzonych na czterech podstronach funkcji, 2 hero do `public/obrazy/rezerwa/`, manifest w `docs/design/`. **Kadry na kartach filarów strony głównej NIE WESZŁY i to jest ROZSTRZYGNIĘTE** (`WWW/046`, 2026-08-26): decyzja właściciela z 2026-08-16 **potwierdzona** — Z6 zostają, kadry generowane nie wchodzą na główną. Punkt zlecenia `WWW/045` był **błędem koordynatora**; klasa nazwana i zapisana w rozdz. 9 („zlecenie dysponujące slotem bez pomiaru jego zawartości"). Poprzednio: `WWW/042` (2026-08-26, rola IMPLEMENTACJA). Ostatnia pozycja otwarta zamknięta: hover złotego CTA przemapowany na `#6e5220` (ADR-034, 26. rola), etykieta kremowa ma na nim **6,30:1** zamiast 2,07:1. **Pełny zestaw e2e: 636 passed, zero upadków, zero nieoznaczalnych.** **26 ról — decyzja, nie dryf; PRZYJĘTE przez właściciela (`WWW/043`, 2026-08-26): literał `LICZBA_ROL` w strażniku zostaje mechanizmem, więc jego czerwień jest sygnałem „ktoś rusza rzecz wymagającą ADR-a", a nie usterką do wyciszenia.** Poprzednio: `WWW/041` (2026-08-26, rola IMPLEMENTACJA). Trzy pozycje otwarte z `WWW/040` zamknięte: reguła kart jest dwumechanizmowa (ADR-033), sonda mierzy tło z renderu (**48 nieoznaczalnych → ZERO**), akcent w nagłówku wszedł jako R-AKCENT-03 w dwóch z trzech pozycji. **Otwarta jedna, ODSŁONIĘTA przez naprawę pomiaru:** etykieta CTA w stanie hover ma **2,07:1 przy progu 4,5:1** (`interakcja-aktywna` mapowana w tonach ciemnych na złoto JASNE, etykieta zostaje kremowa). Czerwień **stoi świadomie** — zlecenie mówi, żeby nie łatać sceny w tym kroku. Poprzednio: `WWW/040` (2026-08-26, rola IMPLEMENTACJA). Paleta „natura" (ADR-032, 25 ról + tony `data-ton`) na zatwierdzonej makiecie. **Bramka `kontrast-stanow` czerwona — 48 testów, wszystkie „NIEOZNACZALNE" przez poświatę, ZERO „poniżej progu"; axe zielony.** Karty odcinają się 1,08:1 przy progu 1,30, którego przy tym tle nie da się osiągnąć żadną powierzchnią. Nagłówki dwukolorowe niewykonane — wymagają podziału redakcyjnego w trzech językach. Szczegóły: ADR-032 „Konsekwencje". Poprzednio: `WWW/038-bis` (kancelaria), 9 commitów wypchniętych `aff7947..2c49b57`. Wdrożona paleta „kancelaria" i krój Onest, zadania 1–6 z korektami K1–K6; zadania 7–14 poza zakresem. **Commity NIE SĄ WYPCHNIĘTE** — zlecenie mówi „push jawnym refspec", ale nie wymienia skrótów, a te powstały dopiero w trakcie; zakaz 1 wymaga zgody wyliczonej co do commita, więc lista czeka na zgodę (rozdz. 4.29). Poprzednio: ▶ spoczynek uchylony na import toru 9 (`WWW/022`–`WWW/025`, 2026-08-24); wcześniej ⏸ SPOCZYNEK (`WWW/018`) |
| **Bramki CI na gałęzi** | **Stan po `WWW/055` (2026-08-26):** `tokeny` **ZIELONA** (`WWW/055` pkt 3 spełniony), `liczby`, `parytet`, `linki`, `kotwice`, `nojs`, `deklaracje` zielone, **pełny e2e 668 passed / 4 skipped / 0 failed** (desktop + mobile-390). **`kontrakt` CZERWONA — DECYZJA ZAPADŁA (`WWW/056` pkt 1, ADR-042): stan przejściowy UZNANY, wymóg ≤ 5,0 zostaje, czerwień świeci z adnotacją „oczekuje na przemalowanie aplikacji”; zamknie ją aktualizacja `szew_logowania.tlo` po stronie właściciela — wartość `#F7F3EA` należy do aplikacji. Kotwica progu przepisana: poprzednia wskazywała na rolę `neutralna-50`, której nie ma od ADR-031, a przeliczenie jej STARĄ METODĄ podniosłoby próg z 5,0 na **21,85** — czyli zakaz 3 wyszedłby Z REGUŁY, nie ze złej woli. Nowa kotwica empiryczna: 4,66 (największy przyjęty) < 5,0 < 6,46 (najmniejszy odrzucony). Adnotacja ma własnego strażnika przeterminowania. Pierwotny opis tej czerwieni:** kontrakt pilnuje **szwu strona → ekran logowania aplikacji** (jedna rodzina ciepłych kremów, ΔE CIE76 ≤ 5,0). Paleta wzorca jest **prawie czarna**, tło logowania po stronie aplikacji to `#F7F3EA`. **ΔE = 93,92 przy progu 5,0** (kancelaria 6,46 · stan pierwotny 4,66 · natura 2,15). Trzy drogi wyjścia i **żadna nie należy do wykonawcy**: (a) aplikacja przenosi ekrany logowania na ciemne; (b) nowy ADR świadomie znosi albo przepisuje wymaganie szwu; (c) tło strony wraca do kremu — cofa `WWW/050-FINAL`. **Bramka była czerwona już w `b4ffc6c`, a moja poprzednia zwrotka podała „pozostałe zielone" — nieprawda z odczytu częściowego** (rozdz. 9). `bramka:cennik` czerwona z braku `STRIPE_TEST_SECRET_KEY` w środowisku — zależność środowiskowa, nie regres. Poprzednio, stan po `WWW/042` (2026-08-26): **`kontrast stanów` ZIELONA — 108 upadków → zero**, `tokeny` (linter + strażnik, 26 ról) zielony, `kontrakt` zielony, pełny e2e 636 passed. Historia tej czerwieni jest pouczająca i dlatego zostaje: po `WWW/041` było **48 testów czerwonych z INNEGO POWODU NIŻ WCZEŚNIEJ.** Do `WWW/041` mówiły „nieoznaczalne” (brak pomiaru); po naprawie sondy mówią **liczbą**: 108 wystąpień jednego defektu — etykieta CTA hover **2,07:1 przy 4,5:1**. To nie jest ta sama czerwień: **poprzednia ZASŁANIAŁA tę**. `tokeny` (linter + strażnik z R-AKCENT-03) zielony. Wcześniej, po `WWW/040`: **`Kontrakt tokenów` WRÓCIŁ NA ZIELONO** — ΔE szwu spadło z 6,46 (kancelaria) do **2,15** (natura) przy nieruszonym progu 5,0; **T51 zamknięte tego samego dnia, w którym powstało**. Doszła natomiast czerwień **`Dostępność`/`kontrast stanów`**: 48 testów, wszystkie z powodem **„nieoznaczalne"** — poświata robi z tła gradient, którego sonda nie umie złożyć, więc odmawia werdyktu dla całej sekcji. **Zero testów zgłasza „poniżej progu", a `axe` jest zielony**, czyli nie ma dowodu na naruszenie kontrastu — jest brak dowodu, że go nie ma. Trzy drogi wyjścia w ADR-032. Poniżej stan dwóch pozostałych, odczyt 2026-08-23: | Odczyt 2026-08-23, **oba dzisiejsze przebiegi tak samo** — `32661737288` (`f2db728`) i `32663550392` (`d7a2fe3`, czyli stan zdalny): **`Nieodwracalne`** — „Brak raportu audytu nieodwracalnych dla commita" (ADR-018 pkt 4; raport jest **per commit**, więc ta czerwień wraca przy KAŻDYM nowym commicie, dopóki audytu nie ma) i **`Wydajność`** — krok `Pomiar`, mediana LCP `/` **1856 ms** przy budżecie 1800 na transporcie HTTP/1.1+gzip; ten sam pomiar daje **1276 ms** na HTTP/2+brotli. Trzynaście pozostałych zielonych w obu przebiegach. **Żadnej z tych czerwieni nie ruszam** — obie są poza zakresem zlecenia (zakaz 8), obie mają swoje pozycje: audyt → ADR-018 pkt 4 i Faza 7, próg → **T33** i kierunek (d) |
| PR dla tej gałęzi | **żaden nie istnieje** (`gh pr list --head faza-4/podstrony` → puste) |
| Backupy repo | ⚠ `/Volumes/Extreme SSD/Catherly-www-ZIP`. **Rozmiar: ~40 MB (odczyt 2026-08-26).** Poprzednia wartość w tym wierszu — „~9 MB każda" — była nieaktualna i **nie niosła daty**, więc zestarzała się w miejscu: dzisiejsze migawki ważą 21–40 MB, z czego ~34 MB to `.git`. Zauważone przy weryfikacji migawki `catherly-www-2026-08-26-1612.zip`, gdzie 41 MB wyglądało na anomalię wobec zapisu, a anomalią nie było. **Liczba zostaje z datą; kto ją cytuje, zabiera datę razem z nią.** **BACKUP NIE DZIEJE SIĘ SAM — haka `Stop` NIE MA** (T42, zmierzone 2026-08-24: zero trafień na `hooks` w czterech plikach konfiguracji). Skutkiem była przerwa **20.08 22:02 → 24.08 08:58**, obejmująca całą pracę z 23.08. **Uruchamiaj `bash scripts/backup.sh` RĘCZNIE po każdym zadaniu i raportuj wynik** — to jedyne działające zabezpieczenie, jakie tu dziś jest. Fałszywe zdanie o automacie **usunięte z `CLAUDE.md` 2026-08-24**; kanon mówi teraz prawdę. **Weryfikuj migawkę ODTWORZENIEM, nie sumą** — rozpakuj, `git log` w odtworzonym repo, skasuj katalog; **T43** pokazuje, po co. **Nazwy ostatniej nie wpisuję**: `ls -t "/Volumes/Extreme SSD/Catherly-www-ZIP" \| head -3` |
| Archiwum katalogu sesyjnego | `/Volumes/Extreme SSD/Catherly-www-SESJE/scratchpad-sesja-2026-08-20-b5f46785-NIE-USUWAC.zip` — rozdział 11 |

**Środowisko:** Node `v20.20.2`, npm `10.8.2`, Next `^15.5.23`, `package-lock.json`
(npm, nie pnpm/yarn), `core.hooksPath = .githooks`. Sekrety lokalne w `.env`
(gitignored): `VERCEL_TOKEN`, `STRIPE_TEST_SECRET_KEY` — **nazwy wolno wymieniać,
wartości nigdy**.

Commity czekają na **wyliczoną zgodę właściciela na push**, wypychane **jawnym refspec ze skrótem**. Ostatnia zgoda
(2026-08-23) obejmowała dokładnie dwanaście skrótów — `e8b3b73 · 6383580 ·
7848900 · 97399c8 · 2599c88 · 8f15c60 · ec8d763 · bd27f6a · 85fed58 · 1a57256 ·
96f8894 · f2db728` — została wykonana i **jest wyczerpana**. Zgoda jest
jednorazowa i imienna: nie przechodzi na commity powstałe po niej (zakaz 1).

**Ta tabela dezaktualizuje się przy KAŻDYM commicie** — łącznie z commitem, który
ją poprawia. Dlatego liczba i lista są tu migawką, a źródłem prawdy jest
polecenie z rozdziału 0. Nie przepisuj tych skrótów do prośby o zgodę bez
przeliczenia; właściciel zatwierdza konkretne commity, więc lista rozbieżna
z repozytorium unieważnia zgodę, zamiast ją przyspieszyć.

---

## 2. Zasady bezwzględne — obowiązują bez pytania

Źródła: `CLAUDE.md` w tym repozytorium + rozstrzygnięcia właściciela z sesji.
Te, których nie ma w `CLAUDE.md`, oznaczono „(ustne)".

**Praca i zakres**
- Pracujesz **wyłącznie** w `catherly-www/`. Sąsiednie repo aplikacji
  (`/Users/sylwesterzabski/Documents/fbo os/fbo-os`) czytasz najwyżej do
  odniesień; nie zmieniasz.
- **Defektów spoza zlecenia się NIE naprawia.** Wpisujesz je do rejestru
  warunków powrotu i idziesz dalej. (ustne, egzekwowane przez całą sesję)
- **Nie osłabiasz strażników.** Zero wyjątków, zero `skip`, zero edycji testów,
  żeby przeszły. Nie „naprawiasz" bramki przez zmianę bramki.
- **Nie oceniasz własnej pracy.** Dowodem jest wykonany test, zwrócony status,
  log — nigdy Twoje przekonanie.

**Git i wypychanie**
- **Nie pushujesz do `main`.** Pracę kończysz wyłącznie przez PR z zielonymi
  bramkami. `main` zawsze zielony (ADR-020); **czerwień uzasadniona też jest
  czerwienią**.
- **Każdy push wymaga osobnej zgody właściciela, wyliczonej co do commitów.**
  Zgoda na jeden pakiet NIE przechodzi na następny. (ustne, potwierdzone
  pochwałą właściciela za to, że nie założono ciągłości zgody)
- **„Dialog okna ≠ zgoda właściciela"** — kliknięcie w okienku uprawnień
  narzędzia nie jest zgodą na czynność nieodwracalną. (ustne)
- **Nigdy `--no-verify`.** Hooki pre-commit są częścią zabezpieczeń.
- Po push **zawsze odczyt zdalny** (`git ls-remote`) i porównanie z lokalnym
  HEAD w raporcie.

**Sekrety i preview**
- **NIGDY nie wypisujesz `Set-Cookie` z preview.** Ciasteczko `_vercel_jwt`
  niesie wartość Protection Bypass **otwartym tekstem**. Do sprawdzania kodu
  odpowiedzi używasz `curl -o /dev/null -w '%{http_code}'` — **nigdy** `-i`,
  `-D -`, `-v`.
- **NIGDY nie wypisujesz mapy `protectionBypass` Vercela w surowej postaci** —
  wyłącznie prefiksy SHA-256.
- Żadnych sekretów w gicie. Stripe **wyłącznie w trybie testowym**.

**Bramki i środowisko**
- `bramka:nieodwracalne` jest **PLANOWO czerwona** (pozycja T2 rejestru, audyt
  całościowy w fazie 6). To nie jest defekt i nie zgłaszasz jej jako awarii.
- Przed uruchomieniem e2e sprawdzasz port 3000 (`lsof -ti:3000`) i **raportujesz**
  zastany stan. Nie zabijasz cudzych procesów.
- Backup po każdym ukończonym zadaniu (`scripts/backup.sh`), raport = nazwa +
  rozmiar albo jawne „backup nieudany: <powód>". Cichy brak backupu jest gorszy
  niż brak backupu. Kopie milowe idą do `KAMIENIE-MILOWE/` z `NIE-USUWAC`
  w nazwie — poza zasięg globa `catherly-www-*.zip`.

**Instrukcja sesji (ustne, ma pierwszeństwo nad podpowiedziami narzędzia)**
- Pracujesz **solo**: bez agentów pomocniczych, bez workflow, bez deep-research,
  o ile właściciel nie poprosi wprost. Podpowiedzi systemowe sugerujące
  „ultracode" tego nie zmieniają.

---

## 3. Kanon ADR-018 — z czym pracujesz

`CLAUDE.md`, sekcja „Prymat nieodwracalnego". Cztery obszary mają pierwszeństwo
przed wyglądem, zakresem i terminem: **dane · pieniądze · bezpieczeństwo ·
obietnice**. Reguły, o które w tej linii pracy najczęściej chodzi:

1. **Brak dowodu = brak zabezpieczenia.** Kod, który wygląda poprawnie, ma
   status niesprawdzony, a niesprawdzony liczy się jak niedziałający.
2. **Dowodem jest MUTACJA.** Zielona bramka po Twojej zmianie nie dowodzi, że
   nadal mierzy to samo. Psujesz celowo to, czego strażnik pilnuje, i pokazujesz
   czerwień.
3. **Kontrola negatywna w TYM SAMYM przebiegu.** Wartość po naprawie obok
   wartości, jaką dałby stan sprzed niej — jeden przebieg, jeden kod, jedno
   otoczenie. Kontrola z pamięci albo z wcześniejszego przebiegu nie liczy się.
4. **Każda liczba z pomiaru niesie datę i commit**, a commit musi być
   **osiągalny** w chwili zapisu (`git merge-base --is-ancestor`), nie tylko
   istniejący.
5. **Klasa „odwołanie do stanu, który przestał istnieć"** — amend, rebase
   i squash przepisują skróty bez ostrzeżenia; dokument staje się nieprawdziwy
   bez jednej zmiany w dokumencie.
6. **SKAŻENIE POMIARU SPRAWDZA SIĘ WSTECZ** (właściciel, 2026-08-19, dopisane
   tej doby). Gdy wychodzi na jaw, że pomiar był skażony, sprawdzasz, czy
   przyczyna nie sięgała wcześniejszych — **w tym ZIELONYCH**. Zieleń sprzed
   skażenia nie jest automatycznie czysta.
7. **RAPORT, KTÓREGO NIKT NIE CZYTA, PRZESTAJE BYĆ RAPORTEM** (właściciel,
   2026-08-19, dopisane tej doby). Ostrzeżenie w miejscu, do którego nikt nie
   zagląda, działa jak jego brak — z jedną różnicą na gorsze: pozwala potem
   powiedzieć „przecież było napisane". Ostrzeżenie, które ma znaczyć, dostaje
   **własny kod wyjścia i własne miejsce w interfejsie**.
8. **KLASA „WYGLĄDA NA REGUŁĘ WERDYKTU PRZY POBIEŻNYM CZYTANIU"** (właściciel,
   2026-08-23). Ustawienie, które **nazywa się** jak reguła rozstrzygająca,
   a nią nie jest, kosztuje więcej niż jego brak — czytający uznaje rzecz za
   zrobioną i przestaje szukać. Wzorzec: `aggregationMethod: 'pessimistic'`.
   **Prześledź ścieżkę wykonania do miejsca, gdzie zapada werdykt**, zanim
   powiesz „konfiguracja to załatwia".
9. **DOKUMENT Z ZADEKLAROWANYM ZAKRESEM SIĘ NIE STARZEJE — starzeje się cytat
   wyjęty z niego bez zakresu** (2026-08-20, T26; dopisane 2026-08-23).
   Odwrotność reguły 5: tam przeterminował się dokument, tu przeterminowuje się
   czytelnik. **Adresat jest częścią zakresu, nie metadanymi.**
10. **KLASA „BRAMKA SZKODZĄCA PRZEZ POPRAWNOŚĆ"** (właściciel, 2026-08-23, T36).
    **Pierwsza klasa z kierunkiem odwrotnym** — dziewięć poprzednich opisuje
    mechanizmy robiące za mało, ta opisuje mechanizm robiący za dużo. Konwencja
    wymuszająca konkretny kształt tam, gdzie dostawca go nie gwarantuje
    kontraktem, zablokuje wdrożenie przy pierwszej zmianie formatu po stronie
    dostawcy. **Zanim napiszesz strażnika wymuszającego kształt lub wartość,
    sprawdź, czy dostawca gwarantuje ten kształt. Jeśli nie — strażnik sprawdza
    OBECNOŚĆ, nie kształt.** Pokrycie rodzime: T33, T34.

11. **KLASA „WNIOSEK SŁUSZNY Z METODY NIERZETELNEJ"** (właściciel,
    2026-08-24). **Trafność wyniku nie uzasadnia metody** — a przy JEDNYM
    pomiarze nie da się odróżnić jednego od drugiego. Odwrotność reguły 1:
    tam brakowało dowodu przy dobrym wniosku, tu dowód jest pozorny,
    a wniosek przypadkiem wyszedł dobry. Groźniejsza od pomyłki, bo
    **nagradza złą metodę**. Wzorzec: zapas przy `Pełny zestaw e2e`
    policzony z JEDNEJ liczby, przy rozrzucie **1,67×** na tym samym
    zadaniu. **Dla wielkości z rozrzutem zapas ustala rozrzut, nie jedna
    wartość** — a rozrzutu nie widać z jednego pomiaru.
12. **WYNIKANIE Z KODU TO NIE POMIAR** (`B-17` z toru 8, przyjęte
    2026-08-24). Odczyt cudzej dokumentacji albo cudzego kodu mówi, co
    mechanizm **ma** robić; pomiarem jest jego zachowanie na naszym
    otoczeniu. Odczyt jest mocniejszy od domysłu i **słabszy od przebiegu** —
    nie zamyka pozycji i nie zastępuje mutacji. Taki odczyt oznaczasz jako
    **granicę pomiaru**, nie jako brak wykonania.

13. **PYTANIE ZEROWE: CZY TA RZECZ W OGÓLE ISTNIEJE** (właściciel,
    2026-08-24). Zadaje się je **przed** wszystkimi pytaniami o zachowanie
    strażnika, a **odpowiada na nie odczyt konfiguracji, nigdy mutacja** —
    bo mechanizmu, którego nie ma, **nie da się zmutować**, a zestaw pytań
    o zachowaniu milczy przy nieistnieniu dokładnie tak samo, jak przy
    strażniku sprawnym i niepotrzebnym. Wzorzec: **T42**. **Skutek widziany
    na dysku dowodzi, że COŚ go tworzyło — nie że tworzył go TEN mechanizm.**
    Od 2026-08-24 kanon niesie **pełny zestaw czterech pytań**: **0.** czy
    istnieje (odczyt konfiguracji) · **1.** czy umie upaść (zapłon) ·
    **2.** czy upada, gdy zniknie zachowanie (mutacja) · **3.** czy upada
    **wyłącznie** wtedy, kiedy trzeba — **na to dowodu nie ma w repertuarze
    po żadnej stronie** i jest to zapisane jako luka, nie zasypane. Pytania
    1–3 pochodzą z toru 8 (rejestr `B-16`/`B-17`, 2026-08-23), podane przez
    właściciela ze źródłem; **`P-22` — drogi weryfikacji stąd nie ma.**
14. **ZALEŻNOŚĆ TWARDA W DOKUMENTACJI WYMAGA ZAPISU, W KODZIE NIE**
    (właściciel, 2026-08-24). Jeśli dokument A odsyła do treści w B, **zmiana
    B idzie pierwsza** — albo obie w jednym commicie. Uzasadnienie osobnego
    zapisu: w kodzie taką zależność wyłapuje kompilator albo test; **w prozie
    nie wyłapuje jej nic.**

15. **KLASA „DEFEKT KOPII UTRWALANY PRZY ODTWARZANIU"** (właściciel,
    2026-08-24). Wada archiwum nie zostaje w archiwum — **przenosi się do
    repozytorium przez ręce tego, kto z niego odtwarza**: różnicy nie da się
    odróżnić od własnej pomyłki, więc albo szuka się nieistniejącego błędu,
    albo „porządkuje" różnicę i **commituje defekt kopii**. Wzorzec: T43.
    **Backup ma usuwać niepewność, a ten ją dokłada w chwili, gdy jest
    najdroższa.**
16. **DWIE STRONY JEDNEGO WZORCA ROZBITE NA DWIE POZYCJE DAJĄ DWA ŁATWE
    ROZWIĄZANIA, KTÓRE SIĘ WYKLUCZAJĄ** (właściciel, 2026-08-24). Gdy ten sam
    mechanizm **chroni i szkodzi naraz**, obie strony są jedną pozycją.
    Rozbite — każda kusi do naprawy, która psuje drugą stronę, **nie wiedząc
    o niej**. Wzorzec: `-x ".env.*"` w `scripts/backup.sh` (T43).
17. **DOWODY WARTOŚCI REGUŁY ZAPISUJE SIĘ RAZEM, NIE OSOBNO** (właściciel,
    2026-08-24). Pojedynczy przypadek czyta się jak **anegdota**; dwa
    niezależne obok siebie pokazują, **czego poprzednia metoda nie widziała
    z definicji**. **Miejsce zbiórki:
    `docs/faza-2/dowody-wartosci-regul.md`** — jedna tabela, kolumna
    **własny/przejęty** obowiązkowa.
18. **ODESŁANIE BEZ TREŚCI: DOŁĄCZ TREŚĆ ALBO NAPISZ WPROST, ŻE JEJ NIE
    DOŁĄCZASZ** (właściciel, 2026-08-24). **Asymetria kosztu jest tu całą
    treścią: jedno pytanie u nadawcy — cała fałszywa pewność u odbiorcy.**
    Wiąże obie strony: nadawcę przy wysyłce, odbiorcę przy odbiorze —
    **odesłanie bez treści zwraca się z pytaniem, nie uzupełnia z pamięci.**
19. **PRZY USTALENIU ZE ZNANYM FAŁSZYWYM WNIOSKIEM — ZAKAZ, NIE SAMO
    OZNACZENIE** (właściciel, 2026-08-24). Oznaczenie (`P-22`, ogniwa) działa
    na czytelnika **ostrożnego**; zakaz działa na **przekonanego**, a to ten
    drugi robi szkodę. Zakaz stawia się **w obie strony**, jeśli ustalenie ma
    parę po drugiej stronie granicy. Wzorzec: T43.
20. **KAŻDA TABELA DOWODÓW WARTOŚCI NIESIE KOLUMNĘ KOSZTU ALBO DEKLARACJĘ, ŻE
    GO NIE MIERZY** (właściciel, 2026-08-24). **Zbiór przeszukany pod jednym
    kątem nie mierzy proporcji.** Odróżnia się **koszt zmaterializowany** od
    **poniesionego ryzyka, które nie wypaliło**; zapisuje się **zasięg
    przeszukania** i to, **czego ono z natury nie znajdzie** — koszt w postaci
    rzeczy, która nie powstała, nie zostawia śladu.
21. **DWA DOWODY Z JEDNEGO ŹRÓDŁA MIERZĄ POWTARZALNOŚĆ ZJAWISKA, NIE
    NIEZALEŻNOŚĆ POTWIERDZENIA** (właściciel, 2026-08-24). Do niezależności
    trzeba **innego źródła albo innego mechanizmu awarii**. Licząc, na czym
    reguła stoi, licz **źródła, nie wystąpienia** — inaczej reguła z pięcioma
    przypadkami z jednego miejsca wygląda mocniej niż reguła z dwoma z dwóch,
    a jest odwrotnie.

22. **DEFEKT, Z KTÓREGO REGUŁA POWSTAŁA, NIE JEST JEJ KOSZTEM** (właściciel,
    2026-08-24). Przy tabeli kosztów **najłatwiejsza do popełnienia pomyłka**,
    bo szkoda jest realna i data się zgadza. Sprawdzenie to jedno pytanie przy
    **każdej** pozycji: **czy reguła istniała, gdy koszt powstał.**
    Sprawdzenie wsteczne ośmiu pozycji wykryło tą metodą **jedno błędne
    przypisanie**.
23. **RETROSPEKCJA I UCHRONIENIE MIERZĄ DWIE RÓŻNE RZECZY** (właściciel,
    2026-08-24). Reguła zastosowana **po fakcie** dowodzi, że jest **trafna**;
    reguła, która **zatrzymała rękę w chwili pisania**, dowodzi, że jest
    **czytana w chwili pracy** — a to jedyny moment, w którym cokolwiek
    zmienia. Trafna i nieczytana wygląda w dokumentach identycznie jak trafna
    i czytana, więc **liczy się je osobno**.
24. **GRANICA ZAKAZU 8** (właściciel, 2026-08-24). **Zakaz naprawiania przy
    okazji NIE OBEJMUJE defektu, który produkuje nowe wadliwe artefakty
    w trakcie odraczania.** Odroczenie zakłada, że defekt czeka; gdy defekt
    **pracuje**, odroczenie przestaje być zachowaniem stanu i staje się jego
    pogarszaniem. **Rozstrzyga właściciel, punktowo** — wykonawca zgłasza
    z liczbą wytworzonych artefaktów, nie zdejmuje zakazu sam.

Sam **ADR-018 zyskał 2026-08-23 punkt 7** (T35): **zlecenie pod złym adresem
odsyła się, nie wykonuje w przybliżeniu** — w obu kierunkach. Odbiorca nie
wykonuje zlecenia w repozytorium, do którego ono nie należy; nadawca sprawdza
adres przed wysłaniem. Ponieważ ADR-018 obowiązuje w **obu** repozytoriach,
regułę mogą wyegzekwować obie sesje, także wobec zlecenia właściciela.

Osobno, od 2026-08-23, `CLAUDE.md` ma rozdział **„Dziesięć zakazów"** — reguły
adresowane do ZLECAJĄCEGO, wiążące także dla zleceń właściciela (T34) — oraz
rozdział **„Hierarchia źródeł reguł"** (T32), od 2026-08-24 siedmioszczeblowy:
ADR → `CLAUDE.md` → STRATEGIA → PLAN → rejestr → przekazanie → panele. Nie są częścią kanonu ADR-018, ale mają tę samą
moc i ten sam brak strażnika.

---

## 4. Co zostało zrobione w dobie 2026-08-19/20

### 4.1 Push zatwierdzony i wykonany

`4c22d6d..69c2dab`, dokładnie trzy commity z listy właściciela. Odczyt zdalny:
`git ls-remote` = `69c2dab1983a7610c0142bd86b09185be97ab430` = lokalny HEAD
w chwili pushu. Nic ponadto nie poszło.

- `547b846` — kanon: klasa „odwołanie do stanu, który przestał istnieć"
- `bb66141` — rejestr T21: weryfikacja wsteczna skrótów + projekt strażnika
- `69c2dab` — rejestr T22: bramka wydajności nie wyklucza równoległych pomiarów

### 4.2 Samotny pomiar wydajności — jedyne, czego właściciel chciał ze strony

Przebieg **`32302412113`** na `69c2dab`, zadanie **`96227948719`**, okno
**21:10:22 → 21:18:29** (2026-08-19). Startował **13 min 53 s po** zakończeniu
ostatniego z kolidujących zadań (20:56:29) i po wcześniejszym (20:54:01) —
brak nakładania sprawdzony po znacznikach czasu, nie założony.

**Werdykt: ZIELONY. `/` → LCP 1521 ms, zapas +279 ms.** Pełne dane w sekcji 5.

Druga połowa tej samej liczby: **przyrząd zgłasza margines pozorny** — rozrzut
593 ms przy zapasie 279 ms (LCP) i 660 ms przy zapasie 107 ms (TBT). Czyli
pierwszy czysty pomiar po wdrożeniu (c) od razu w nią trafia. To jest materiał
do kierunku (d), sekcja 8.

### 4.3 T22 — trzy rozstrzygnięcia właściciela, wdrożone (commit `6383580`)

Właściciel rozstrzygnął 2026-08-19 trzy kierunki i odłożył czwarty.

**(a) CONCURRENCY — „WPINAJ TERAZ, to nie jest kwestia do rozważenia."**

Blok na poziomie workflow w `.github/workflows/bramki.yml`, między
`workflow_dispatch:` a `jobs:`:

```yaml
concurrency:
  group: bramki-${{ github.event.pull_request.head.ref || github.ref_name }}
  cancel-in-progress: true
```

**Klucz NIE po `github.ref`**, wbrew temu, co proponował wcześniejszy wpis
rejestru. `github.ref` to `refs/pull/N/merge` przy `pull_request`
i `refs/heads/…` przy `push`, więc jedna gałąź wpadłaby do dwóch grup i defekt
wróciłby **cicho, dokładnie w PR**, czyli w chwili merge'u. Klucz idzie po
`pull_request.head.ref || ref_name`, lustrzanie do istniejącej logiki
`OCZEKIWANY_COMMIT`. W pliku stoi komentarz z liczbami kolizji i z tym
uzasadnieniem.

**Dowód przyjęcia — NIEWYKONANY.** Właściciel określił go tak: dwa pushe
w odstępie minuty → drugi anuluje pierwszy, anulowanie widoczne w logu, nie dwa
równoległe pomiary. Wymaga zgody na push i **nie wolno go robić w trakcie
żadnego pomiaru**, bo sam by go zepsuł.

**(b) KLAMRA PROWIENIENCJI** — nowy `scripts/straznik-po-pomiarze.mjs` (180
linii) + krok w workflow:

```yaml
  - name: "Prowieniencja po pomiarze (klamra: to samo wdrożenie na końcu)"
    if: always()
    env:
      LHCI_BAZA: ${{ vars.LHCI_BAZA }}
      VERCEL_AUTOMATION_BYPASS_SECRET: ${{ secrets.VERCEL_AUTOMATION_BYPASS_SECRET }}
      OCZEKIWANY_COMMIT: ${{ github.event.pull_request.head.sha || github.sha }}
      WYNIK_POMIARU: ${{ steps.pomiar.outcome }}
    run: npm run bramka:po-pomiarze
```

Krok „Pomiar" dostał `id: pomiar`, żeby `steps.pomiar.outcome` był dostępny.

Strażnik czyta listę tras z `lighthouserc.cjs` (`ci.collect.url`), pobiera każdą
z `redirect: "manual"` i nagłówkiem obejścia, porównuje `x-catherly-wydanie`
z `OCZEKIWANY_COMMIT`, zbiera rozjazdy i przy niepustej liście kończy
`POMIAR UNIEWAŻNIONY` z wyjściem 1. Tryb lokalny (`LHCI_BAZA` puste) wychodzi 0.

Argument, dlaczego porównanie „po" z `OCZEKIWANY` wystarcza zamiast trzymania
stanu „przed": **rozgrzewka już wymusiła równość na wszystkich siedmiu trasach**
przed pomiarem, więc nie ma pliku stanu do zgubienia. `WYNIK_POMIARU` steruje
wyłącznie brzmieniem komunikatu („zieleń bez pokrycia" / „czerwień
nieprzypisywalna"), nie werdyktem.

**Szczelina spisana wprost w nagłówku skryptu:** klamra nie wykryje podmiany,
która zdarzyła się i cofnęła **wewnątrz** pomiaru — `lhci collect` przechodzi
wszystkie trasy × przebiegi w jednym procesie i nie daje w to wejść.

**Dowody mutacyjne, każdy z kontrolą negatywną w tym samym przebiegu**, na
udawanym preview (lokalny serwer HTTP ze sterowanym nagłówkiem — bez Vercela,
bez sekretu):

| przypadek | wynik |
|---|---|
| wydanie zgodne (kontrola negatywna) | 7/7 ✔, wyjście 0 |
| alias przestawiony na inne wdrożenie | 7/7 rozjazdów, wyjście 1 |
| wdrożenie bez nagłówka wydania | 7/7 braków, wyjście 1 |
| **cel zgaszony w trakcie** (dopisane 2026-08-20) | 7/7 „adres nieosiągalny (fetch failed)", wyjście 1 |

Czwarty przypadek powstał po tym, jak roboczy obserwator CI wypisał 99 razy
`error connecting to api.github.com`, a potem zameldował „OBA PRZEBIEGI
ZAKONCZONE" z kodem 0. Pytanie brzmiało, czy nowy strażnik ma ten sam kształt.
Nie ma: **milczenie celu jest u niego czerwienią, nie ciszą.**

**(c) WERDYKT MARGINESU** — nowy `scripts/werdykt-marginesu.mjs` (220 linii) +
krok w workflow po „Liczby ze wszystkich tras":

```yaml
  - name: "Werdykt marginesu (żółty: margines pozorny)"
    if: always()
    continue-on-error: true
    env:
      LHCI_BAZA: ${{ vars.LHCI_BAZA }}
    run: npm run bramka:margines
```

Skrypt importuje `liczba`, `mediana`, `wybierzReprezentanta` z
`./reprezentant.mjs`, progi z `lighthouserc.cjs`, reprezentanta z
`.lighthouseci/regula-werdyktu.json` (z zapasowym wyliczeniem). Rdzeń:

```js
const zapas = prog - w;
if (zapas < 0) continue;               // już czerwone — o tym mówi pomiar
const rozrzut = Math.max(...wartosci) - Math.min(...wartosci);
if (rozrzut <= zapas) continue;
pozorne.push({ trasa, etykieta, zapas, rozrzut, wartosc: w, prog });
```

Obejmuje LCP, TBT i CLS (każdą metrykę z progiem liczbowym). Wypisuje
`::warning title=Margines pozorny …` per trasa, dokłada tabelę markdown do
`$GITHUB_STEP_SUMMARY` i **wychodzi 1**. Funkcja `pominiete()` jest głośna —
brak danych nigdy nie daje cichej zieleni.

**Odpowiedź na pytanie właściciela „Powiedz, co jest wykonalne":**
**prawdziwy żółty nie istnieje w GitHub Actions.** Zadanie zna trzy stany:
`success`, `failure`, `cancelled`. Status `neutral` istnieje wyłącznie w Checks
API i wyłącznie dla aplikacji GitHub — z poziomu workflow nie da się go
ustawić. Wdrożono najbliższą wykonalną rzecz, mocniejszą niż sama adnotacja:
krok świeci ⚠ (`continue-on-error`), wypisuje `::warning` **na stronie
przebiegu nad listą zadań**, dokłada tabelę do podsumowania i zwraca 1.
Skreślenie jednej linii czyni bramkę blokującą. **Czego to nie daje:** zadanie
i przebieg pozostają zielone, więc reguła ochrony gałęzi tego nie zatrzyma —
jeśli margines pozorny ma blokować merge, jedyną dostępną drogą jest czerwień.

Dowody mutacyjne (c), kontrola negatywna w tym samym przebiegu:

| przypadek | wynik |
|---|---|
| prawdziwe dane lokalne (kontrola negatywna) | wyjście 0, puste podsumowanie |
| jeden **niereprezentatywny** przebieg `/funkcje` zmutowany 1704 → 1500 ms | wyjście 1, „margines pozorny, rozrzut 202 ms przy zapasie 98 ms", `::warning`, tabela w podsumowaniu |
| po przywróceniu pliku | SHA-256 identyczna (`8012bdef130376e3…`), znów wyjście 0 |

Mutowano **dane pomiaru**, nie strażnika, i celowo plik inny niż reprezentant —
żeby werdykt i zapas zostały te same, a zmienił się wyłącznie rozrzut.

**(d) — ODŁOŻONE przez właściciela.** „Nie rozstrzygam dziś, przedstaw go osobno
po samotnym pomiarze. Chcę zobaczyć czystą liczbę, zanim zdecyduję o czymkolwiek
dotyczącym progów." Materiał jest gotowy — sekcja 8.

`package.json` dostał dwa wpisy przed `bramka:podsumowanie`:

```json
"bramka:po-pomiarze": "node scripts/straznik-po-pomiarze.mjs",
"bramka:margines": "node scripts/werdykt-marginesu.mjs",
```

### 4.4 T23 — osobna pozycja rejestru o `fetch-depth` (commit `7848900`)

Polecenie właściciela było wyraźne: *„Ustalenie o fetch-depth jest ważniejsze od
samego strażnika… To nie jest warunek T21, to jest osobna pozycja rejestru
o szerszym zasięgu. Zapisz osobno."*

Stan zmierzony 2026-08-19/20 na `69c2dab`: **15 wystąpień
`actions/checkout@v4`, `fetch-depth` użyte 0 razy**. Domyślnie akcja klonuje
`--depth 1`.

Dowód trzech klonów, skrót `cd06530` (osiągalny z HEAD):

| klon | commitów | `cat-file -t` | `merge-base --is-ancestor` | strażnik |
|---|---|---|---|---|
| pełny (kontrola negatywna) | 159 | `commit` | osiągalny | **zielony** |
| `--depth 1` (to, co robi dziś CI) | 1 | `fatal: Not a valid object name` | nieosiągalny | **czerwony** |
| po `git fetch --unshallow` | 159 | — | osiągalny | **zielony** |

*(Uwaga na rozbieżność, która nie jest błędem: wpis T21 mówi „157 commitów", bo
mierzono go dwa commity wcześniej. Oba wpisy są ostemplowane datą.)*

**Kierunek błędu jest przeciwny do lokalnego** i to jest tu najważniejsze:
lokalnie `git cat-file -t` daje **fałszywą zieleń**, bo obiekt z reflogu leży na
dysku; w CI na płytkim klonie to samo polecenie daje czerwień z zupełnie innego
powodu — obiektu w ogóle nie ma. Dowód D w tym samym przebiegu: skrót widmo
`72f664a` nie jest obiektem **ani w klonie pełnym, ani w płytkim** — reflog nie
podróżuje z klonem. **CI jest surowsze od maszyny lokalnej.**

### 4.5 T24 — nowe ustalenie tej doby (commit `97399c8`)

Znalezione przy sprawdzaniu, czemu `Dostępność` nie chce się skończyć.

**Cztery zadania anulowane, każde po 6 h 00 min ±20 s**, wszystkie na tym samym
kroku `npx playwright install --with-deps chromium`:

| przebieg | zadanie | okno |
|---|---|---|
| `32302412113` (`69c2dab`) | Dostępność | 21:10:21 → 03:10:41 |
| `32300222841` (`b51d0b8`) | Pełny zestaw e2e | 20:45:53 → 02:46:09 |
| `32300453626` (`4c22d6d`) | Pełny zestaw e2e | 20:48:29 → 02:48:46 |
| `32300453626` (`4c22d6d`) | Dostępność | 20:48:28 → 02:48:44 |

`grep -c timeout-minutes .github/workflows/bramki.yml` = **0**, więc obowiązuje
domyślny limit platformy — sześć godzin.

Trzy skutki, z czego trzeci jest niewygodny:

1. Około **24 h czasu runnera** spalone w jeden wieczór.
2. Zawieszona bramka kończy się jako `cancelled`, **a to nie jest werdykt**.
   Brak werdyktu wygląda w interfejsie jak brak problemu — bramka, która nigdy
   nie odpowiedziała, jest w odbiorze wygodniejsza niż ta, która odpowiedziała
   „nie".
3. **Koszt wniesiony przez własne rozstrzygnięcie (a):** `cancel-in-progress`
   czyni `cancelled` stanem normalnym i oczekiwanym, więc czytelnik traci
   możliwość odróżnienia „anulowane, bo wyparte nowszym pushem" od „anulowane,
   bo wisiało sześć godzin". Przed (a) `cancelled` było sygnałem samo w sobie.

**Konkretna strata: dla wypchniętego `69c2dab` bramka `Dostępność` NIE MA
WERDYKTU.** Zieleń dostępności jest udowodniona wyłącznie dla `b51d0b8`
(przebieg `32300222841`).

Poszlaka co do przyczyny, **nie dowód**: w tym samym oknie lokalny `gh` stracił
łączność z `api.github.com` na 99 kolejnych prób, więc to wygląda na zdarzenie
sieciowe wieczoru, a nie defekt kodu. Trwałym ustaleniem jest brak limitu, który
**każde** takie zdarzenie zamienia w sześć godzin ciszy.

### 4.6 Commity tej doby

| commit | co |
|---|---|
| `e8b3b73` | kanon: skażenie sprawdza się wstecz + raport, którego nikt nie czyta (`CLAUDE.md`) |
| `6383580` | T22 (a)(b)(c) — workflow +72 linie, 2 nowe skrypty (400 linii), `package.json` |
| `7848900` | rejestr: T22 rozstrzygnięte trzema kierunkami, T23 osobno |
| `97399c8` | rejestr T24 + czwarty dowód mutacyjny dopisany do T22 |
| `2599c88` | pierwsze spisanie tego przekazania |
| `8f15c60` | audyt kompletności przekazania — rozdz. 12–15 i sześć przeoczonych pułapek |
| `ec8d763` | zabezpieczenie sesji — jeden kanoniczny punkt wejścia + skorowidze |
| `bd27f6a` | reguła właściciela: przekazanie utrzymywane w prawdzie na bieżąco (T25) |
| **ten** | briefing dla sesji aplikacji + T26; rozstrzygnięcia z 2026-08-23 → T27–T34, dziesięć zakazów w `CLAUDE.md`, dwie nowe klasy kanonu (4.7, 4.8); skrótu nie da się tu wpisać — rozdz. 1 |

Przed każdym commitem: `eslint . --max-warnings=0` → 0; bramki `tokeny`,
`liczby`, `parytet`, `kontrakt`, `kotwice` → zielone; `bramki.yml` parsuje się
i ma kroki w zamierzonej kolejności; hook pre-commit przeszedł bez `--no-verify`.

### 4.7 Recenzja zadania z sesji aplikacji i briefing zwrotny

Właściciel przyniósł 2026-08-20 zadanie spisane w sesji pracującej po stronie
aplikacji, z jawnym warunkiem: **„sprawdź, zanim wykonasz"**. Nie zostało
wykonane nic — ani pomiar, ani commit kanonu, ani push. Sześć ustaleń
z odczytu, nie z lektury zadania:

1. **`docs/KANON-CATHERLY-STRONA.md` nie istnieje** — sprawdzone w `docs/` na
   HEAD, w drzewie `docs/` gałęzi zdalnej, w całym drzewie roboczym, w `Downloads`,
   `Desktop` i obu pozostałych katalogach FBO OS. Cała druga połowa zadania nie
   ma przedmiotu.
2. **Pomiar, o który prosiło zadanie, jest już wykonany** (rozdz. 5) i jego
   odpowiedź brzmi „nie zieleń": rozrzut 593 ms przy zapasie 279 ms, dwa z pięciu
   przebiegów ponad progiem. Powtórzenie nie da czystszej liczby — kolizji
   w tamtym oknie nie było, więc rozrzut jest własnością przyrządu.
3. **„Sprawdź wydanie PRZED i PO" nie da się wykonać na stanie wypchniętym** —
   `straznik-po-pomiarze.mjs`, `werdykt-marginesu.mjs` i blok `concurrency` żyją
   wyłącznie w niewypchniętym `6383580`. Zadanie każe mierzyć czysto, zanim
   wypchnie narzędzia zapewniające czystość.
4. **„Uruchom sam krok wydajności" jest niewykonalne**: `workflow_dispatch`
   wymaga pliku workflow na gałęzi domyślnej, a `main` (`0896219`) nie ma
   katalogu `.github`. Jedyny wyzwalacz to push, a ten uruchamia wszystkie 15
   zadań; `bramka-wydajnosc` ma na dokładkę `needs: build`.
5. **„Push obu commitów" wypchnąłby dziesięć** i nie jest zgodą wyliczoną
   z commitów.
6. **Wskaźnik „przeczytaj najpierw" koliduje** z blokiem dodanym na górze
   `CLAUDE.md` przy `ec8d763` i tworzy trzecie źródło reguł wiążących.

Odpowiedź zwrotna spisana jako `docs/BRIEFING-MIEDZY-SESJAMI.md` — sześć części:
co było nie tak, stan faktyczny z datami, dziesięć rzeczy, których **nie wolno
zlecać** stronie, kanon pomiarowy, pułapki środowiska, decyzje dla właściciela.
Powód, dla którego to jest plik w repozytorium, a nie wiadomość: reguła
„raport, którego nikt nie czyta, przestaje być raportem" działa też w drugą
stronę — zlecający potrzebuje trwałego adresu, nie wklejki, która ginie razem
z oknem czatu.

**Przy pisaniu briefingu popełniony i naprawiony błąd — zapisany jako T26.**
Pierwsza wersja twierdziła, że `RAPORT-POWYKONAWCZY-WWW.md` §5.5 niesie
nieaktualny fakt („34 pozycje", „349 linii", gdy rejestr ma dziś 50 pozycji).
Sprawdzenie nagłówka to obaliło: raport deklaruje zakres **`0896219` →
`3ca12a3` (2026-08-16)** i wobec tego zakresu obie liczby są prawdziwe.
**Dokument z zadeklarowanym zakresem się nie starzeje — starzeje się cytat
wyjęty z niego bez zakresu.** To odwrotność klasy „odwołanie do stanu, który
przestał istnieć": tam przeterminował się dokument, tu może się przeterminować
czytelnik. W rejestrze została słabsza, prawdziwa obserwacja: raport jest
z założenia „matrycą do cytowania", a §5.5 wyjęty bez nagłówka rozjeżdża się
z repozytorium o 16 pozycji.

### 4.8 Rozstrzygnięcia właściciela z 2026-08-23 — osiem nowych pozycji rejestru

Właściciel odczytał sześć ustaleń z 4.7 **jako pozycje rejestru, nie jako
wytknięcie**, i polecił zapisać po jednej na punkt. Do tego trzy rozstrzygnięcia
własne. Wszystko wykonane w tym samym commicie co ta zmiana (T25).

| poz. | co zostało zapisane |
|---|---|
| **T27** | zlecenie wskazuje plik, którego w repozytorium adresata nie ma; właściciel do protokołu: **„trzeci raz dziś"** |
| **T28** | zamówiony pomiar był już wykonany; odpowiedź „nie zielone" jest **gorsza, niż zakładał** |
| **T29** | „PRZED i PO" niewykonalne — narzędzie zapewniające czystość siedzi w niewypchniętym `6383580` |
| **T30** | `workflow_dispatch` martwy bez `.github` na `main`; **ta sama przyczyna co `RECZ-161`** po stronie aplikacji, niepołączona |
| **T31** | „push obu commitów" = push dziesięciu; **„moja liczba z pamięci"** |
| **T32** | źródeł reguł wiążących jest **pięć**, nie trzy — i `CLAUDE.md` nie ma w hierarchii miejsca |
| **T33** | próg 1800 ms przy rozrzucie 593 ms jest **nieinterpretowalny, a nie surowy** — pozycja checklisty premiery |
| **T34** | dziesięć zakazów przyjęte jako **wiążące dla każdego zlecenia, także właściciela** — wpisane do `CLAUDE.md`, bez strażnika |
| **T35** | zlecenie o konwencji walidacji kluczy trafiło pod **zły adres** — cały jego przedmiot jest w repozytorium aplikacji; **lustrzane odbicie T26** |
| **T36** | **pierwsza wada idąca w drugą stronę** — bramka szkodząca przez POPRAWNOŚĆ; pokrycie rodzime: T33 i T34 |
| **T37** | sprawdzenie **obaliło ustalenie**, decyzja utrzymana z innego uzasadnienia — zapisuje się **oba fakty**, nie jeden zamiast drugiego |
| **T38** | proporcja **34 : 4** mówi o przepływie; 58% sprawdzeń drugą drogą zmieniło ustalenie — **dane toru 14, nie mój pomiar** |
| **T39** | **rejestr liczy OGNIWA, nie źródła** — skorowidz ogniw dla 40 pozycji, „nieustalone" zamiast domysłu |
| **T40** | ⚠ **jedynym kanałem między trzema obszarami jest jedna osoba i jedna warstwa dowodząca** — kanon rozłączny w praktyce |

**Trzy rzeczy z tej doby, które zmieniają sposób pracy, nie tylko rejestr:**

1. **`CLAUDE.md` urósł o rozdział „Dziesięć zakazów"** (180 → 260 linii).
   Zmiana jest kierunkowa: dotąd plik mówił, czego nie wolno **zrobić**
   wykonawcy; teraz mówi też, czego nie wolno **zlecić**. Wykonawca ma
   obowiązek odesłać zlecenie właściciela, jeśli łamie któryś z dziesięciu —
   i to nie jest nieposłuszeństwo, tylko wykonanie reguły. Właściciel wyróżnił
   zakaz 6 (`_vercel_jwt` niesie jawnie Protection Bypass — **jedyny o skutku
   bezpieczeństwa**) oraz zakazy 9 i 10 z adnotacją *„celują we mnie — tak ma
   być"*.
2. **Dwie nowe klasy w kanonie ADR-018**: „wygląda na regułę werdyktu przy
   pobieżnym czytaniu" (nazwana przez właściciela przy `aggregationMethod:
   'pessimistic'`) oraz „dokument z zadeklarowanym zakresem się nie starzeje"
   (T26), rozszerzona o adresata — **adresat jest częścią zakresu, nie
   metadanymi**.
3. **Bramka wydajności nie może dziś dać wiarygodnej zieleni ANI czerwieni**
   (T33). To jest mocniejsze niż dotychczasowe „margines pozorny": zieleń nie
   dowodzi, że trasa mieści się pod progiem, bo ten sam kod dał 2102 ms;
   czerwień nie dowodzi regresji z tego samego powodu. Stan gorszy niż bramka
   za surowa — tamta mówi prawdę zbyt często, ta nie mówi jej wcale.

**Odmowa wysłania briefingu do pięciu obcych sesji** (`souffle-de-nature-*`,
niezwiązany projekt) uznana przez właściciela za właściwą i odnotowana **jako
zastosowanie reguły o zakresie** — dopisek w T26.

### 4.9 Push i pięć rozstrzygnięć — 2026-08-23, druga sesja tej doby

**Push wykonany.** Właściciel wydał zgodę wyliczoną z dwunastu skrótów
(`e8b3b73 · 6383580 · 7848900 · 97399c8 · 2599c88 · 8f15c60 · ec8d763 ·
bd27f6a · 85fed58 · 1a57256 · 96f8894 · f2db728`), zdalny stał na `69c2dab`.
Po pushu `origin/faza-4/podstrony` = **`f2db728`**, potwierdzone **odczytem
`git ls-remote`, nie komunikatem `git push`** — polecenie właściciela; komunikat
pushu mówi, co klient wysłał, a nie co serwer przyjął. Zgoda jest wyczerpana.

**Pięć rozstrzygnięć zapisanych jednym commitem** (razem z tym dokumentem):

| | rozstrzygnięcie | gdzie weszło | stan |
|---|---|---|---|
| **T32** | hierarchia: ADR → `CLAUDE.md` → rejestr → przekazanie → panele; przy równym poziomie wygrywa nowsze, ale **rozjazd się zgłasza** | rozdział `CLAUDE.md` (nie ADR-031, nie szósty plik — zakaz 10) | ◐ otwarte: 4 pliki bez zdania o swoim miejscu |
| **T35** | zlecenie pod złym adresem **odsyła się**, nie wykonuje w przybliżeniu — w obu kierunkach | **ADR-018 pkt 7** (obowiązuje w obu repozytoriach) | ✔ zamknięte |
| **T36** | strażnik sprawdza **obecność, nie kształt**, dopóki dostawca kształtu nie gwarantuje kontraktem | `CLAUDE.md`, „Prymat nieodwracalnego", obok zakazu 10 — kanon 9 → **10 klas** | ✔ zamknięte |
| **D5 / T23** | `fetch-depth: 0` **tylko** w krokach czytających historię, z uzasadnieniem przy każdym | nigdzie — takich kroków jest dziś **zero** | ◐ otwarte do T21 |
| **D6 / T24** | `timeout-minutes` **20** pomiarowe / **10** pozostałe; krok rozróżniający `cancelled` **wymagany** | `.github/workflows/bramki.yml`, wszystkie 15 zadań | ◐ otwarte: **brak mutacji** |

**Dlaczego D5 nie zmieniło ani jednej linii `checkout`.** Przegląd wykonany na
`f2db728` (osiągalny) pokazał, że w bramkach nie ma dziś kroku czytającego
historię: jedyne wywołanie gita to `git rev-parse HEAD` w
`scripts/check-audyt.mjs`, które na klonie `--depth 1` działa, bo czyta
wskaźnik, nie przodków; hooki `pre-commit` (`git diff --cached`) w CI się nie
uruchamiają. Rozstrzygnięcie brzmiało „tylko tam, gdzie potrzeba", więc zmiana
bez adresata byłaby zmianą, której nikt nie zamawiał. Pierwszym takim krokiem
będzie strażnik osiągalności z **T21** i to jego `checkout` dostanie ustawienie
w tym samym commicie, co strażnik.

**Trzy rzeczy zgłoszone, nie rozstrzygnięte samodzielnie:**
1. **T24 nie jest zamknięte** — obecność `timeout-minutes` w pliku to status
   NIESPRAWDZONE, a niesprawdzone liczy się jak niedziałające. Do zamknięcia
   trzeba przebiegu z celowo zawieszonym krokiem.
2. **Zapas przy `Pełny zestaw e2e` jest cienki.** Literalne zastosowanie D6 dało
   temu zadaniu 10 min przy zmierzonych **5 min 23 s** — zapas **1,86×**, choć
   uzasadnienie D6 mówiło o wielokrotności rzędu 20–30 min. Limitu **nie
   podniosłem z własnej ręki**, bo to rozszerzenie rozstrzygnięcia poza jego
   literę; przekroczenie da czerwień, która nie jest werdyktem.
3. **T32 nie jest zamknięte.** Warunek zamknięcia mówił o zdaniu w nagłówku
   **pięciu** plików; zapis stoi w jednym. Czytający sam rejestr albo samo
   przekazanie nadal nie wie, że trzyma rzecz podrzędną.

### 4.10 Trzy decyzje i pomiar czasów — 2026-08-23, trzecia tura

**Push wykonany na osobną zgodę.** Jeden commit, skrót wymieniony: `d7a2fe3`.
Zdalny potwierdzony **odczytem `git ls-remote`** —
`d7a2fe3801612494f2df73223c9318b0220265ac`. Zgoda z pakietu dwunastu **nie
przeszła** na ten commit i właściciel to potwierdził: *„zgoda z pakietu dwunastu
wyczerpana i nieprzechodząca na ten commit — właściwie"*.

**Rozstrzygnięcie 1 — `bramka-pelny-zestaw` → 20 minut.** Właściciel zapisał
przy tym własną przesłankę, i ona jest tu ważniejsza niż sama liczba:
*„podałem próg per kategoria, nie znając zmierzonych czasów"*. `bramka-e2e`
zostaje na 10 — rozstrzygnięcie dotyczyło jednego zadania.

**Rozstrzygnięcie 2 — `::warning` bez kodu wyjścia to za mało.** Klasa „raport,
którego nikt nie czyta" wymaga czegoś, co **zmienia stan przebiegu**. Właściciel
orzekł „status ŻÓŁTY zadania" i dodał warunek: *„jeśli GitHub Actions tego nie
umożliwia bez zmiany kodu wyjścia — powiedz."*

**ODPOWIEDŹ: NIE DA SIĘ — i to nie z naszej winy.** Sprawdzone tego samego dnia
ze źródeł pierwotnych (dokumentacja GitHuba, kod `actions/runner`, kod `cli/cli`,
odczyty REST na cudzych publicznych przebiegach), z osobnym przebiegiem
adwersaryjnym, którego zadaniem było te ustalenia **obalić**:

- kod wyjścia kroku ustala konkluzję, *„which can be `success` or `failure`"* —
  lista dwuelementowa;
- adnotacja **z definicji** nie zmienia stanu: `ExecutionContext.AddIssue`
  (`actions/runner`, `ExecutionContext.cs` ~796–860) maskuje sekrety, obcina
  komunikat, zwiększa licznik i pisze do logu — **nie dotyka `Result` ani
  `TaskResult`**. Zarzut właściciela wobec `::warning` jest **pokazywalny
  w cudzym kodzie**, nie kwestią oceny;
- jedyne konkluzje poza parą success/failure to `neutral` i `skipped`,
  a dokumentacja nazywa obie **sukcesem**; wartości o znaczeniu „ostrzeżenie"
  nie ma;
- mapowania konkluzja→kolor w web UI GitHub **nie publikuje**; jedyne oficjalne
  mapowanie (`cli/cli`, `output.go`) mówi: `pending` → żółty,
  `cancelled`/`neutral`/`skipped` → **szary**. **Żółć jest kolorem stanu
  TRWAJĄCEGO, nie konkluzji.** Wniosek o konkluzję ostrzegawczą leży u GitHuba
  otwarty **od stycznia 2022**;
- jedyna dosłowna żółć osiągalna z workflow — commit status `state: pending` —
  **odrzucona**: kłamie o stanie i zostawia wieczystą żółtą kropkę.

**USTALENIE, KTÓRE POTWIERDZA CAŁĄ PRZESŁANKĘ T24:** job ubity przez
`timeout-minutes` dostaje konkluzję **`cancelled`** — **tę samą**, co job wyparty
przez `concurrency`. Zmierzone na sześciu cudzych przebiegach w rozpiętości
siedmiu miesięcy. Enum REST **ma** `timed_out`, ale GitHub go tu **nie
wystawia**. Bez własnego kroku obu przypadków odróżnić się nie da — teza
potwierdzona pomiarem, nie tylko rozumowaniem.

⚠ **LUKA WAŻNIEJSZA NIŻ SAMO PYTANIE.** W całym materiale **nie znaleziono ani
jednego publicznego przebiegu, w którym wykonałby się krok z warunkiem dokładnie
`cancelled()`** — wszystkie obserwowane przypadki to `always()`. Że nasze
piętnaście kroków się odpali, **wynika z kodu runnera** (`StepsRunner.cs`:
przy anulowaniu wynik zadania idzie na `Canceled`, a pętla po krokach **nie ma
`break`**; `CancelledFunction.cs`: `cancelled()` czyta status **ZADANIA**).
**Wynikanie z kodu to nie jest pomiar.** Te 15 kroków ma dziś status
NIESPRAWDZONE, czyli liczy się jak niedziałające.

**Jedna dziura sprawdzona u siebie i zamknięta:** timeout na poziomie **KROKU**
dawałby `TaskResult.Failed`, nie `Canceled` — `cancelled()` byłoby fałszem
i krok by milczał. Odczyt `bramki.yml` 2026-08-23: **15 limitów na poziomie
zadania, 0 na poziomie kroku.** U nas dziura jest teoretyczna i **ma taka
zostać** — kto dopisze `timeout-minutes` do kroku, wyłączy przy okazji
rozróżnianie anulowań, nie wiedząc o tym.

**NAZWANA SŁABOŚĆ** (zapis wymagany przez właściciela — „nie zostawiaj tego jako
«wystarczy»"): adnotacja `::warning` **nie zmienia konkluzji zadania i zmienić
jej nie może**, bo platforma nie ma stanu pośredniego. Warstwa jest słabsza, niż
wymaga klasa „raport, którego nikt nie czyta", i **pozostaje słabsza świadomie**.
Dodatkowo: limit **10 ostrzeżeń na krok** i **4096 znaków**; nasze adnotacje
niosą `path: ".github"`, więc w zakładce **„Files changed" PR-a się nie pokażą** —
widać je wyłącznie w „Checks".

**DO WYBORU (wybór właściciela):** **(A) czerwień** — zadanie zależne czytające
`needs.<job>.result == 'cancelled'`. **Odradzam:** wyparcie przez `concurrency`
jest zjawiskiem **oczekiwanym i częstym**, więc zamiana go w czerwień produkuje
„czerwień, która nie jest werdyktem" — ten sam defekt z drugiej strony, uderzający
w ADR-020. **(B) jawnie przyjęta warstwa słabsza** — dzisiejsza adnotacja
wzmocniona wpisem do `$GITHUB_STEP_SUMMARY` (strona podsumowania przebiegu,
nie log). **To jest rekomendacja, ale NIE do wdrożenia przed mutacją:**
przetrwanie zapisu do podsumowania przy anulowaniu **nie zostało potwierdzone
żadnym źródłem**, więc dopisanie go teraz byłoby kolejnym kodem, który wygląda
poprawnie.

**REKOMENDOWANA KOLEJNOŚĆ: najpierw mutacja, potem wybór** — dziś oba warianty
stoją na niesprawdzonym założeniu, że krok w ogóle się odpala. Eksperyment
rozstrzyga trzy rzeczy w jednym przebiegu: **(i)** zadanie z `timeout-minutes: 1`
i `sleep 300` → czy krok odpala się przy przekroczeniu limitu; **(ii)** dwa pushe
w odstępie minuty → czy odpala się przy wyparciu (to jest równocześnie zaległy
**„dowód przyjęcia dla (a)"**, poz. 7.1.2); **(iii)** kontrola negatywna
**w tym samym przebiegu** — zadanie kończące się normalnie, gdzie krok ma zostać
`skipped`. **Warunek: nie w trakcie żadnego pomiaru** — `bramka-wydajnosc`
zostałaby skażona (T22).

**Rozstrzygnięcie 3 — D5 zapisane jako POMIAR, nie jako brak roboty.**
*„D5 nie zmieniło ani jednej linii — i to jest wynik, nie brak wyniku."*
Warunek powrotu przypięty do zdarzenia, które sami wywołamy (budowa T21),
z odsyłaczem **po obu stronach**: przy T23 i przy T21.

**POMIAR CZASÓW ZADAŃ — pierwszy w tym repozytorium.** Odczyt `gh api
repos/.../actions/runs/<id>/jobs`, pola `started_at`/`completed_at`, dwa
przebiegi z 2026-08-23: `32661737288` (`f2db728`) i `32663550392` (`d7a2fe3`),
oba commity osiągalne.

| zadanie | `f2db728` | `d7a2fe3` | limit | zapas |
|---|---|---|---|---|
| Wydajność | 8,05 min | 7,90 min | 20 | **2,48×** ← najcieńszy |
| Pełny zestaw e2e | 3,55 min | 3,21 min | 20 | 5,63× |
| Dostępność | 2,65 min | 2,53 min | 10 | **3,77×** |
| E2E | 0,98 min | 1,03 min | 10 | 9,7× |
| Build | 0,63 min | 0,83 min | 10 | 12,0× |
| pozostałe dziewięć | 0,36–0,55 | 0,38–0,55 | 10 | ≥ 18× |

**Wniosek mocniejszy niż liczba, od której się zaczęło:** `Pełny zestaw e2e` dał
**5 min 23 s** (2026-08-20) i **3 min 13 s** (2026-08-23) — **rozrzut 1,67×
między przebiegami tego samego kodu**. Zadanie o takim rozrzucie nie może stać
na zapasie 1,86×; to jest właściwe uzasadnienie dwudziestki, a nie pojedyncza
liczba. **Zgłoszone, nie zmienione:** po poprawce najcieńszy zapas ma
`Wydajność` (2,48×), potem `Dostępność` (3,77×) — a nie zadanie, którego
poprawka dotyczyła.

**DOWÓD CZĘŚCIOWY, KTÓRY NIE JEST MUTACJĄ.** W przebiegu `32663550392` krok
`Przyczyna anulowania` stoi w **15/15** zadań i wszędzie kończy się jako
`skipped` — w tym w zadaniu `Nieodwracalne`, które **padło** (przy porażce
`cancelled()` jest fałszem, więc krok słusznie milczy). To dowodzi **okablowania
i braku fałszywych zapłonów**. **Nie dowodzi zapłonu** — do tego trzeba
anulowania, a anulowania w tych przebiegach nie było.

**BRAMKI NA GAŁĘZI SĄ CZERWONE — dwa zadania, oba przebiegi tak samo.**
`Nieodwracalne`: brak raportu audytu dla commita (ADR-018 pkt 4 — raport jest
**per commit**, więc ta czerwień wraca przy każdym nowym commicie).
`Wydajność`: mediana LCP `/` **1856 ms** przy budżecie 1800 na HTTP/1.1+gzip,
przy **1276 ms** na HTTP/2+brotli. **Żadnej nie ruszam** — obie leżą poza
zakresem zlecenia (zakaz 8) i obie mają swoje miejsca: audyt → Faza 7,
próg → T33 i kierunek (d).

**NOWA POZYCJA REJESTRU — T41, znaleziona przy okazji, zapisana zamiast
naprawiona.** Przy czytaniu logów po czasy zadań wyszło, że runner wypisuje
w **każdym z 15 zadań**: *„Node.js 20 is deprecated… actions/checkout@v4,
actions/download-artifact@v4, actions/setup-node@v4, actions/upload-artifact@v4”*
— cztery akcje celują w Node 20, GitHub wymusza Node 24. Nic dziś nie jest
zepsute; ryzyko ma **datę wygaśnięcia w cudzych rękach**, a gdy nadejdzie,
padnie piętnaście zadań naraz, bo `checkout` i `setup-node` są w każdym.
Podwójny przypadek klas już nazwanych: **„raport, którego nikt nie czyta"**
(ostrzeżenie leżało w logu i wyszło przypadkiem, przy zupełnie innej robocie)
oraz **„strażnik zerodowany przez zmianę OTOCZENIA"** (bramki zielone, podłoże
inne). **Nie naprawiam — zakaz 8.**

---

### 4.11 Cztery rozstrzygnięcia i diagnoza backupu — 2026-08-24

**Push wykonany na osobną, wyliczoną zgodę:** jeden commit `231a17b`, zdalny
potwierdzony odczytem `git ls-remote` → `231a17bcd84c4a46a2bd854b9c393906990a29ce`.

**BACKUP — zrobione przed czymkolwiek innym, na polecenie właściciela.**
`bash scripts/backup.sh` uruchomiony ręcznie: `catherly-www-2026-08-24-0858.zip`,
**9,0 MB**, kod wyjścia **0**, `unzip -t` → *„No errors detected"*. Skrypt jest
sprawny. Wada leży gdzie indziej — patrz **T42** niżej.

**T24 — właściciel przyjął obalenie własnego rozstrzygnięcia w całości.**
Żółtego statusu konkluzji nie ma; wariant „czerwień" odrzucony jego słowami:
*„bramka czerwieniejąca na zdarzeniu zamierzonym uczy ignorowania czerwieni"*.
Zostaje `::warning` jako **nazwana słabość z powodem „to jedyne, co istnieje"** —
nie „to wystarczy". Kolejność zatwierdzona: **mutacja przed wyborem**. Luka
o braku publicznych przebiegów z warunkiem dokładnie `cancelled()` zapisana jako
**granica pomiaru, nie brak wykonania** — pierwsze domyka się robotą, drugie
**wyłącznie eksperymentem**, więc mieszanie ich zaciera, czego brakuje.

**Dwie nowe klasy w kanonie** (`CLAUDE.md`, rozdz. „Prymat nieodwracalnego"):
**(11) „wniosek słuszny z metody nierzetelnej"** — trafność wyniku nie
uzasadnia metody, a przy jednym pomiarze nie da się odróżnić jednego od
drugiego; groźniejsza od pomyłki, bo **nagradza złą metodę**. **(12) „wynikanie
z kodu to nie pomiar"** (`B-17` z toru 8) — odczyt cudzego kodu jest mocniejszy
od domysłu i **słabszy od przebiegu**; nie zamyka pozycji i nie zastępuje
mutacji.

**T32 — hierarchia ma siedem szczebli, nie pięć.** Właściciel przyjął
zgłoszenie i nazwał je swoim błędem: *„wymieniłem pięć źródeł, nie sprawdziwszy,
ile ich jest"*. Obowiązuje: **ADR → `CLAUDE.md` → STRATEGIA → PLAN → rejestr →
przekazanie → panele.** Kanon stoi **nad** strategią, bo strategia mówi CO,
a kanon JAK. Zdanie o pierwszeństwie strategii **wykreślone** z
`docs/STRATEGIA.md` — **osobnym commitem**, z cytatem starego brzmienia
w opisie. Przesłanka zapisana jako klasa **„zły podzbiór"**: lista podana bez
policzenia **wygląda jak komplet** i zatrzymuje szukanie. Nagłówek
`docs/STRATEGIA.md` niesie teraz zdanie: *„Miejsce w hierarchii źródeł reguł:
szczebel 3 z siedmiu"*, z odesłaniem do `CLAUDE.md` — czyli **drugi z pięciu
brakujących plików warunku zamknięcia T32 jest odhaczony**. Zostaje pięć:
`docs/adr/README.md`, `docs/PLAN.md`, rejestr, to przekazanie i dokumenty
paneli. Kolejność commitów była wymuszona: `CLAUDE.md` musiało **najpierw**
wymienić siedem szczebli, bo inaczej STRATEGIA odsyłałaby do hierarchii,
która jej nie zawiera.

**T41 — dopisane, co konkretnie może się zepsuć.** Akcja celująca w Node 20 na
runnerze z Node 24 może przestać działać **przy dowolnej aktualizacji tej
akcji, bez zmiany po naszej stronie**. Nie trzeba decyzji GitHuba ani naszego
commita. Ponieważ `checkout` i `setup-node` stoją w każdym z 15 zadań, **padnie
cała bramka naraz**. Kwalifikacja właściciela: **pozycja przedpremierowa, nie
higiena** — do checklisty Fazy 7, obok T33.

**⚠ T42 — NOWA POZYCJA, NAJCIĘŻSZA Z DZISIEJSZYCH: haka `Stop` NIE MA.**
`CLAUDE.md:239-241` twierdzi, że migawki robi hak automatycznie. Sprawdzenie
2026-08-24: **klucz `hooks` nie występuje w żadnym pliku konfiguracji** —
`~/.claude/settings.json` (0 trafień), `~/.claude.json` (0),
`.claude/settings.local.json` (brak klucza), `.claude/settings.json`
i `~/.claude/settings.local.json` (pliki nie istnieją), `managed-settings.json`
(nie istnieje). Ciąg `backup.sh` **nie pada w żadnej konfiguracji**. To nie hak
zepsuty ani wyłączony — **haka nie ma**. Skutek: przerwa **20.08 22:02 →
24.08 08:58**, obejmująca całą pracę z 23.08. Dwa powody, dla których to jest
cięższe niż każda inna pozycja: zabezpieczenie było uznane za działające przez
**ponad 200 migawek**, a gdy przestało powstawać, **nie było żadnego sygnału**;
i fałszywe twierdzenie stoi w `CLAUDE.md`, czyli na **drugim szczeblu
hierarchii**, więc każda sesja liczy na mechanizm, którego nie ma.
**Nieustalone i nie zgaduję:** czy hak kiedykolwiek istniał, czy migawki do
20.08 powstawały z ręcznych uruchomień. Nie naprawiam — polecenie brzmiało
„zgłoś jako pozycję", a założenie haka w cudzej konfiguracji jest zmianą poza
repozytorium. **Do tego czasu: `bash scripts/backup.sh` ręcznie po każdym
zadaniu.**

**Progi czasowe nietknięte** (rozstrzygnięcie właściciela): `Wydajność` 2,48×
i `Dostępność` 3,77× zostają — *„Wydajność ma osobny problem (rozrzut 593 przy
zapasie 279), a limit czasu jest przy niej wtórny"*. Te dwie liczby są
**właściciela, nie z pomiaru tutaj** — jedno ogniwo, stąd niesprawdzone.

**Bramki na gałęzi nadal czerwone** (`Nieodwracalne`, `Wydajność`) — obie mają
swoje miejsca, zostawiamy zgodnie z rozstrzygnięciem.

---

### 4.12 Kanon poprawiony, backup zweryfikowany odtworzeniem — 2026-08-24

**Kolejność narzucona przez właściciela: zdanie w kanonie przed wszystkim
innym.** Uzasadnienie jego słowami: *„dopóki to zdanie stoi, każda nowa sesja
czyta je na starcie i przestaje robić backup; naprawa kanonu jest tańsza od
haka i chroni natychmiast"*. Rozdział „Backup po każdym zadaniu" w `CLAUDE.md`
mówi teraz wprost: **automatu nie ma, polecenie uruchamia sesja**, plus opis,
skąd wzięła się nieprawda i ile kosztowała.

**Push dwóch zatwierdzonych skrótów, bez zabierania trzeciego.** Zgoda
wymieniała `69e0b52` i `74fdfe8`; poprawka kanonu powstała **przed** pushem
i nie była objęta zgodą, więc wypchnięte zostało jawnie
`git push origin 74fdfe8:refs/heads/faza-4/podstrony` — nie `git push` bez
argumentów, który zabrałby wszystko, co leży na gałęzi. Zdalny potwierdzony
odczytem: `74fdfe8bd9ebb63093c1ba0bb5b040c6081223e7`.

**T42 — właściciel nazwał odmianę klasy, której rejestr nie miał.** Dotąd
opisywaliśmy **napis zamiast zachowania** (strażnik istnieje, ale nie mierzy
tego, co deklaruje). To jest **napis zamiast MECHANIZMU** — nie ma czego
uruchomić, a kanon twierdzi, że jest. Różnica jest praktyczna: napis zamiast
zachowania wykrywa **mutacja**; napisu zamiast mechanizmu mutacja **nie wykryje
wcale**, bo nie ma czego mutować — wykrywa go dopiero **odczyt konfiguracji**,
czyli osobne pytanie „czy ta rzecz w ogóle istnieje". **Specyfikacja haka
gotowa i zapisana w T42** — do budowy przez właściciela, z obowiązkową
głośnością przy porażce i kryterium przyjęcia **mutacja, nie zapłon**.

**⚠ WERYFIKACJA ODTWORZENIEM ZNALAZŁA DEFEKT PRZY PIERWSZYM UŻYCIU — T43.**
Archiwum `catherly-www-2026-08-24-0910.zip` rozpakowane do katalogu
tymczasowego (skasowanego po sprawdzeniu): `git log` pełny, `HEAD` =
`74fdfe8`, `git fsck` bez uszkodzeń — **ale** `git status` w odtworzonym
repozytorium pokazuje `D .env.example`, plik **śledzony** i nieobecny
w archiwum. Przyczyna: `scripts/backup.sh:52-53` wyklucza `.env` **oraz**
`.env.*`, a drugi wzorzec łapie `.env.example`. Rodzina **T20** — wzorzec
szerszy niż zamiar. Archiwum pozostaje **pełnym repozytorium** (`.git`
kompletny, więc `git checkout` odzyskuje plik), ale **nie jest wiernym
odbiciem drzewa roboczego**. **Nie naprawiam — zakaz 8**, zlecenie brzmiało
„sprawdź odtworzeniem", nie „popraw skrypt".

**Rzecz zmierzona przy okazji, warta osobnego zdania:** wykaz zawartości
archiwum (**same nazwy, nigdy wartości**) potwierdza, że **żaden plik `.env*`
nie trafia na SSD** — `VERCEL_TOKEN` i `STRIPE_TEST_SECRET_KEY` **nie są
kopiowane na dysk zewnętrzny**. To przeciwieństwo ustalenia z repozytorium
aplikacji, które kazało to sprawdzić (ponad 75 archiwów przyjętych samą sumą,
z żywymi kluczami — **cudzy pomiar, stąd niesprawdzony**).

**Przesłanka po stronie właściciela, zgłoszona przez niego samego.** Nagłówki
zleceń nosiły datę 23.08, gdy zegar wskazywał 24.08. Klasa **„stempel poprawny
w chwili powstania, fałszywy w chwili cytowania"**, zapisana przy **T26**.
Zasięgu nie da się odtworzyć — właściciel nie umie wskazać, od którego
momentu. **Gdzie nagłówek rozchodzi się ze stemplem wykonania, obowiązuje
odczyt zegara.**

**T32 — drugi z siedmiu nagłówków odhaczony.** `docs/STRATEGIA.md` niesie
teraz zdanie o swoim miejscu („szczebel 3 z siedmiu"). Brakuje pięciu:
`docs/adr/README.md`, `docs/PLAN.md`, rejestr, to przekazanie, dokumenty
paneli. Właściciel: **dopisywać przy okazji pracy nad tymi plikami, bez
osobnego przebiegu.**

---

### 4.13 Trzy zapisy do kanonu — 2026-08-24, popołudnie

**Push `361c7db`** wykonany jawnym refspec, zdalny potwierdzony odczytem:
`361c7db2ff399ea4039fb2302e6b2b33b0228da4`.

**(1) Zakaz 1 zyskał MECHANIZM, nie zalecenie.** *„Zgoda wymieniająca skróty
wymaga pushu wymieniającego skróty."* Push idzie odtąd wyłącznie jako
`git push origin <skrót>:refs/heads/<gałąź>`. Powód: `git push` bez refspec
bierze **wszystko, co stoi na gałęzi**, łącznie z commitami powstałymi **po**
udzieleniu zgody — **zgoda na listę zamienia się w zgodę na stan**, i to bez
śladu, bo polecenie kończy się sukcesem. Wywołanie deklaruje „wyślij
zatwierdzone", robi „wyślij wszystko". Właściciel nazwał to **dziesiątym tego
dnia wystąpieniem klasy „mechanizm robi więcej, niż deklaruje wywołanie"** —
i pierwszym, w którym obejście zbudował wykonawca, nie on. Przypadek źródłowy:
zgoda obejmowała `69e0b52` i `74fdfe8`, a poprawka kanonu leżała już na gałęzi.

**(2) PYTANIE ZEROWE — czy ta rzecz w ogóle istnieje.** Właściciel: *„mieliśmy
trzy pytania o strażniku (umie upaść / upada gdy trzeba / wyłącznie gdy
trzeba). Brakowało czwartego, wcześniejszego niż wszystkie."* Odpowiada na nie
**odczyt konfiguracji, nigdy mutacja** — mechanizmu, którego nie ma, **nie da
się zmutować**, a zestaw pytań o zachowaniu milczy przy nieistnieniu dokładnie
tak samo, jak przy strażniku sprawnym i niepotrzebnym. **Uwaga o zakresie:
tych trzech pytań PO TEJ STRONIE NIE MA** — sprawdzone grepem w `CLAUDE.md`,
rejestrze i tym pliku; należą do torów 8 i 13. Pytanie zerowe zapisane więc
tak, żeby stało **samodzielnie**, z jawną adnotacją, że treści tamtych trzech
nie przepisuję z pamięci. Właściciel zapowiedział przekazanie ustalenia obu
torom — *„żaden nie sprawdzał istnienia, tylko zachowanie"*.

**(3) Zależność twarda w dokumentacji.** Jeśli dokument A odsyła do treści
w B, **zmiana B idzie pierwsza** — albo obie w jednym commicie. Uzasadnienie,
którego właściciel zażądał osobno: **w kodzie taką zależność wyłapuje
kompilator albo test, w prozie nie wyłapuje jej nic.** Żadna bramka nie
sprawdza, czy odesłanie trafia w treść, która już istnieje.

**T43 — dopisany skutek, którego nie nazwałem.** Archiwum nie jest wiernym
odbiciem drzewa roboczego, więc odtworzenie daje repozytorium, w którym
`git status` pokazuje **zmianę, której nikt nie wprowadził**. Człowiek
odtwarzający po awarii — w jedynej sytuacji, w której ktokolwiek sięga po
backup — zobaczy `D .env.example` i **uzna, że sam go skasował**. Dalej dwie
drogi, obie złe: szukanie nieistniejącej pomyłki albo zacommitowanie usunięcia,
czyli utrwalenie defektu archiwum w repozytorium. **Backup ma usuwać
niepewność, a ten ją dokłada w chwili, gdy jest najdroższa.**

**T43 — zapisany jako PARA, nie dwie pozycje** (polecenie właściciela). Wzorzec
`-x ".env.*"` **chroni i szkodzi tą samą regułą**: żaden `.env*` nie trafia na
SSD (sekrety niekopiowane — sprawdzone wykazem **nazw**, nigdy wartości)
**i** wycina śledzony `.env.example`. Nie da się poprawić jednej strony, nie
dotykając drugiej — rozbite na dwie pozycje, każda miałaby oczywiste
rozwiązanie; razem mają jedno trudne. **Ustalenie odwrotne niż po stronie
aplikacji**, ze źródłem: tam 75 archiwów przeszło z żywymi kluczami
(**`RECZ-287`**, dwa ogniwa, drugie stąd niesprawdzalne); **tu wykluczenie
działa**. Zapisane razem, żeby nikt nie przeniósł stamtąd wniosku „archiwa
niosą sekrety" ani stąd wniosku „wykluczanie `.env*` jest bezpieczne".

**Dwa niezależne dowody wartości reguły o odtworzeniu — tego samego dnia,
w którym reguła powstała.** Reguła weszła do `CLAUDE.md` rano; do wieczora ma
`RECZ-287` (cudzy pomiar) i **T43** (pomiar własny, defekt przy pierwszym
użyciu). Osobno każdy wygląda na przypadek; razem pokazują, **czego suma
kontrolna nie widzi z definicji** — ani nadmiaru, ani braku, wyłącznie to, że
bajty się nie zmieniły.

---

### 4.14 Trzy pytania dopisane, trzy klasy do kanonu — 2026-08-24

**Push `6d55a80`** jawnym refspec; zdalny potwierdzony odczytem:
`6d55a806dff405a98795f3b42fc5c87dc90f8c9e`.

**Pytanie zerowe ma już swoją listę.** Poprzednia sesja odmówiła przepisania
trzech pytań o strażniku z pamięci i zapisała pytanie zerowe samodzielnie,
z jawną adnotacją o braku. Właściciel uznał to za **`P-22` rozpoznane po
stronie NADAWCY** — *„przekazałem Ci odesłanie do listy, której nie masz"* —
i **podał treść ze źródłem**: tor 8, rejestr `B-16`/`B-17`, 2026-08-23. Zestaw
stoi teraz w `CLAUDE.md` w całości:

| | pytanie | dowód |
|---|---|---|
| **0** | czy ta rzecz w ogóle **istnieje** | **odczyt konfiguracji** (pomiar własny, T42) |
| **1** | czy strażnik **umie upaść** | zapłon na żywo |
| **2** | czy upada, **gdy zniknie zachowanie** | **mutacja** — zapłon tego nie dowodzi |
| **3** | czy upada **wyłącznie** wtedy, kiedy trzeba | ⚠ **dowodu nie ma w repertuarze, po żadnej stronie** |

Pytania 1–3 są oznaczone **`P-22`** — drogi weryfikacji stąd nie ma.
**Pytanie 3 jest zapisane jako luka, nie zasypane**: strażnik czuły, trafny
i nadgorliwy daje fałszywe alarmy i po tygodniu nikt go nie czyta, a udawanie,
że mamy na to dowód, byłoby dokładnie tym, przed czym broni reszta kanonu.
Kolejność ma znaczenie — **0 przed 1**, bo pytania o zachowanie są wobec
nieistnienia ślepe.

**Reguła, która z tego została** (T26, przesłanka właściciela): **odsyłając do
dokumentu spoza repozytorium adresata, dołącz treść albo jawnie napisz, że jej
nie dołączasz.** Odesłanie bez treści kosztuje jedno pytanie, jeśli złapie je
nadawca — i całą fałszywą pewność, jeśli odbiorca uzupełni je domysłem.

**Trzy nowe klasy kanonu, wszystkie z T43:**
**(15) „defekt kopii utrwalany przy odtwarzaniu"** — wada archiwum przenosi się
do repozytorium **przez ręce odtwarzającego**. **(16) „dwie strony jednego
wzorca rozbite na dwie pozycje dają dwa łatwe rozwiązania, które się
wykluczają"** — rozbite, każda kusi do naprawy psującej drugą stronę, **nie
wiedząc o niej**. **(17) „dowody wartości reguły zapisuje się razem, nie
osobno"** — pojedynczy przypadek czyta się jak anegdota.

**Odnotowane przez właściciela jako pierwsze w tym repozytorium:** przekazanie
międzyrepozytoryjne z **jawnym zakazem przeniesienia w obie strony** (T43).
Dotąd oznaczaliśmy pochodzenie (`P-22`, liczba ogniw), ale nie zakazywaliśmy
wprost wnioskowania. Różnica jest praktyczna: oznaczenie mówi „to jest cudze
i niesprawdzone", zakaz mówi **„a konkretnie TEGO wniosku nie wyciągaj"** —
i dopiero to drugie zatrzymuje kogoś, kto już uwierzył.

**Zakaz 1 z uzasadnieniem idzie do kanonu OBU repozytoriów** — właściciel
przekaże aplikacji. Po tej stronie stoi już w `CLAUDE.md`.

~~**Uwaga porządkowa, zgłoszona przez właściciela i niewykonana:** dowody
wartości reguł leżą rozproszone.~~ **ZLECONE I WYKONANE 2026-08-24
(`WWW/014`)** — `docs/faza-2/dowody-wartosci-regul.md`, rozdz. 4.15.

---

### 4.15 Dowody wartości reguł zebrane w jedno — 2026-08-24, `WWW/014`

**Push `6f13ed8`** jawnym refspec; zdalny: `6f13ed80181286511bdecb5f6f1663288fd75eaf`.

**Zlecenie wykonane: `docs/faza-2/dowody-wartosci-regul.md`.** Jedna tabela,
**25 pozycji**, kolumny: reguła · dowód · data · **gdzie leżał przed
zebraniem** · **własny czy przejęty**. Ostatnia kolumna to dopisek właściciela
przy zleceniu — klasa 17 jej nie miała, a **to ona rozstrzyga, czy reguła stoi
na jednym pomiarze, czy na dwóch niezależnych**.

**Nagłówek deklaruje miejsce w hierarchii od pierwszego commita** („szczebel 7,
**nie jest źródłem reguł**"). Nowy dokument bez takiego zdania byłby dokładnie
defektem, który otworzył **T32**; przy okazji to **trzeci z siedmiu nagłówków**
w warunku zamknięcia T32. Zakaz 10 nie jest naruszony: zakazuje mnożenia
**źródeł reguł wiążących**, a ten plik jest rejestrem dowodów i mówi to wprost.

**Znalezione przy przeglądzie: nie trzy, tylko dwadzieścia pięć.** Trzy, które
zgłosiłem, były wierzchołkiem — reszta siedziała we wzorcach przy klasach
kanonu, w T15, T22, T26, T35, T41, T42, T43 i w rozdz. 9. Wszystkie dowody
leżały **przy regułach, których dowodzą**, i żaden nie wiedział o pozostałych.

**Cztery rzeczy widać dopiero po zebraniu — i po to była ta tabela:**
1. **Tylko JEDNA para dowodów jest naprawdę niezależna** — „weryfikuj
   odtworzeniem, nie sumą": jeden dowód własny (T43), jeden z drugiego
   repozytorium (`RECZ-287`), dwa różne mechanizmy awarii. Pozostałe pary
   („raport, którego nikt nie czyta" — T22 i T41) pochodzą z jednego
   repozytorium i jednej pary rąk, więc dowodzą **powtarzalności, nie
   niezależności**.
2. **21 z 25 dowodów jest własnych — i to brzmi lepiej, niż jest.** Własny nie
   znaczy niezależny: wszystkie powstały w jednym repozytorium, w kilkunastu
   dobach, w jednym przepływie pracy, więc mierzą też **wspólny sposób
   pracy**, nie tylko same reguły.
3. **17 z 25 dowodów nosi datę 2026-08-24.** Dwa czytania i stąd się ich nie
   rozstrzygnie: albo tego dnia sprawdzono wiele rzeczy dotąd
   niesprawdzonych, albo **dowody wcześniejsze istnieją, tylko nie zostały
   zapisane jako dowody**. Drugie jest prawdopodobniejsze, co znaczy, że
   tabela jest **niepełna od pierwszego dnia** — nie ma w niej niczego sprzed
   2026-08-19.
4. **Nie ma ani jednego dowodu NEGATYWNEGO** — przypadku, w którym reguła
   kosztowała więcej, niż dała. Brak nie znaczy, że ich nie było; znaczy, że
   nikt ich nie szukał. **Wbudowana stronniczość nazwana w dokumencie
   wprost**, żeby nikt nie odczytał tabeli jako bilansu.

**Dwie nowe reguły kanonu, obie w brzmieniu właściciela.**
**(18) „Odesłanie bez treści"** — z asymetrią kosztu jako całą treścią:
*jedno pytanie u nadawcy, cała fałszywa pewność u odbiorcy*; wiąże **obie**
strony, więc odbiorca **zwraca odesłanie z pytaniem, nie uzupełnia
z pamięci**. **(19) „Przy ustaleniu ze znanym fałszywym wnioskiem — zakaz, nie
samo oznaczenie"** — oznaczenie działa na czytelnika **ostrożnego**, zakaz na
**przekonanego**, a szkodę robi ten drugi.

**Właściciel policzył swoje wystąpienia wady „odesłanie bez treści": trzy tego
samego dnia** — trzy pytania o strażnikach, ustalenie toru 13 o parytecie,
korekta „158→156" do toru 8. **Treści dwóch ostatnich po tej stronie nie ma
i nie uzupełniam jej domysłem** — odnotowany jest sam fakt, tak jak został
przekazany. Zapisanie ich z domyślonym znaczeniem byłoby popełnieniem tej
wady w akapicie, który ją opisuje.

**T43 — powtarzalność zapisana jako potwierdzenie, nie uciążliwość.** Defekt
pokazał się identycznie przy **trzech** niezależnych migawkach tego dnia:
za każdym razem `git status` odtworzonego repo daje dokładnie `D .env.example`,
ani mniej, ani więcej. To dowód, że **opis pozycji jest poprawny**; gdyby przy
którejś migawce defekt zniknął albo urósł, opis byłby niepełny.

---

### 4.16 Tabela kosztów — druga strona tego samego dokumentu (`WWW/015`)

**Push `84a7037`** jawnym refspec; zdalny: `84a70371698d23d4fbf41edf3cfd94d3316de76c`.

**Zlecenie: znaleźć przypadki, w których reguła kosztowała więcej, niż dała.**
Wynik: **osiem pozycji** w `docs/faza-2/dowody-wartosci-regul.md`, tabela
kosztów. **Bez oceny** — żaden wpis nie mówi, czy koszt był wart zapłacenia.
Dodana kolumna, której zlecenie nie wymagało: **czy koszt się
zmaterializował**, czy było to **poniesione ryzyko, które nie wypaliło** —
mieszanie tych dwóch to ten sam błąd, co mieszanie dowodu z anegdotą.

| | reguła | koszt | zmaterializowany |
|---|---|---|---|
| K1 | zakaz 1 — zgoda imienna | poprawka kanonu chroniąca przed cichą utratą pracy czekała lokalnie całą rundę | **nie** — ryzyko |
| K2 | zakaz 8 — bez „przy okazji" | **cztery** wadliwe migawki od wykrycia T43; defekt czynny | **tak** |
| K3 | mutacja przed wyborem | wzmocnienie `$GITHUB_STEP_SUMMARY` niedopisane; warstwa słabsza **bez daty końcowej** | **tak** |
| K4 | literalne wykonanie zgody | `pelny-zestaw` na 10 min przy zapasie 1,86× przez jedną rundę | **nie** — ryzyko |
| K5 | pełna prowieniencja w rejestrze | wiersze po kilka tysięcy znaków; piąta kolumna wymagałaby przepisania wszystkich (**T39**) | **tak** |
| K6 | zakaz uzupełniania domysłem | dwa odwołania w T26 **bez treści**, bezużyteczne stąd | **tak** |
| K7 | reguły o zapisie | 12 commitów od 23.08: `docs/` **+2122/−263**, korzeń **+322/−18**, `.github/` **+81/−1**, **`src/` `content/` `design/` — zero** | fakt zmierzony |
| K8 | *(kandydat właściciela)* ostrożność wobec nieistniejącego ryzyka | treści stąd nie ma — `P-22` | nieustalone |

**Przy K7 stoi zastrzeżenie, bez którego liczba wprowadza w błąd:** Faza 4 jest
w spoczynku do bloku designu **z decyzji właściciela**, więc zero w `src/` jest
w części zamierzone, a nie wyłącznie kosztem reguł. **Rozdzielić tych dwóch
przyczyn stąd się nie da** i tak jest zapisane.

**Kandydat właściciela, którego NIE potwierdziłem:** „odmowa wykonania zlecenia
z powodu reguły, gdy zlecenie było trafne". Najbliższy to **T35** — zlecenie
trafne co do treści, ale jego przedmiot w całości leżał w drugim repozytorium,
więc odesłanie było poprawne, nie kosztowne. **Wynik zero, z podanym
zasięgiem.**

**Kandydat, który jest czym innym, niż się wydaje:** „odesłanie do dokumentu,
którego nie było" (trzy razy) **nie jest kosztem reguły** — w chwili tych
przypadków reguła jeszcze nie istniała, powstała **z nich**. To defekt, który
regułę wywołał, więc jego miejsce jest w tabeli **dodatniej**. Wpisany do
kosztów obciążałby regułę szkodą, której reguła zapobiegła.

**Zasięg przeszukania, zadeklarowany w dokumencie:** 19 klas kanonu, pozycje
**T21–T43**, rozdz. 9 przekazania, `git log --numstat --since=2026-08-23`.
**Czego nie przeszukałem:** T1–T20, 24 pozycji treściowych i całego okresu
sprzed 2026-08-19 — **ten sam horyzont pięciu dób**, co w tabeli dodatniej.
**Czego to przeszukanie z natury nie znajdzie:** kosztu w postaci rzeczy, która
**nie powstała**, bo reguła zniechęciła do jej zaczęcia — takie przypadki nie
zostawiają śladu i żadne przeszukanie stąd ich nie wykryje.

**Dwie nowe klasy kanonu (20, 21)** — obie w brzmieniu właściciela:
**tabela dowodów niesie kolumnę kosztu albo deklarację, że go nie mierzy**
(*zbiór przeszukany pod jednym kątem nie mierzy proporcji*) oraz **dwa dowody
z jednego źródła mierzą powtarzalność, nie niezależność** (*licz źródła, nie
wystąpienia*).

**Punkt 3 — dopisana trzecia możliwość właściciela, wszystkie trzy otwarte.**
Skupienie 17 z 25 dowodów na dacie 2026-08-24 może znaczyć: **(a)** tego dnia
dużo sprawdzano; **(b)** dowody wcześniejsze istnieją i nie zostały zapisane
jako dowody; **(c)** reguły sprzed 19.08 **mogły nie mieć dowodów w ogóle**, bo
powstawały jako **zalecenia, nie mechanizmy** — a zalecenie nie ma czym się
opłacić. Przy **(c)** brak jest **własnością tamtego okresu, nie luką zapisu**.
Praktyczna różnica: przy (b) warto przekopać historię sprzed 19.08, przy (c)
byłoby to szukaniem czegoś, czego nie ma.

**Druga zadeklarowana stronniczość dopisana obok pierwszej:** „własny" nie
znaczy „niezależny" — 21 z 25 dowodów powstało w jednym repozytorium,
w kilkunastu dobach, w jednym przepływie pracy, więc mierzą także **wspólny
sposób pracy**, nie wyłącznie same reguły.

**T26 — pierwszy przypadek, w którym reguła stosowana do siebie UCHRONIŁA,
zamiast opisać po fakcie.** Wszystkie wcześniejsze samozastosowania były
retrospektywne (przekazanie łamiące własną regułę, hierarchia odtwarzająca
defekt szczebel wyżej, kanon twierdzący o nieistniejącym mechanizmie). Tu
reguła zadziałała **w chwili pisania** i zatrzymała rękę przed dopisaniem
domyślonej treści. Wartość diagnostyczna: retrospekcja dowodzi, że reguła jest
**trafna**; uchronienie dowodzi, że jest **czytana w chwili pracy** — a to
jedyny moment, w którym reguła cokolwiek zmienia.

---

### 4.17 T43 naprawione — pierwszy raz, gdy koszt reguły przewyższył jej wartość w pomiarze (`WWW/016`)

**Push `9b3a2dd`**; zdalny: `9b3a2dd113057862351a496017ef852e68bf45b8`.

**Właściciel zdjął zakaz 8 punktowo, dla jednej nazwanej pozycji.** Powód:
koszt odraczania był **czynny i mierzalny** — cztery wadliwe migawki od
wykrycia, kolejne co godzinę, przy przyczynie zdiagnozowanej i naprawie na
kilka linii. Z tego wzięła się **granica zakazu 8** w kanonie: *zakaz
naprawiania przy okazji nie obejmuje defektu, który produkuje nowe wadliwe
artefakty w trakcie odraczania.* **Rozstrzyga właściciel, punktowo** —
wykonawca zgłasza z liczbą wytworzonych artefaktów, **nie zdejmuje zakazu
sam**.

**Naprawa: `18c03f2`, tylko `scripts/backup.sh`** (warunek właściciela
o pojedynczym pliku). Kolejność jest tu całą treścią: **najpierw wyklucz
wszystko** (`-x ".env" -x ".env.*"`), **potem dołóż z powrotem jedną nazwę**
z listy `DOZWOLONE_ENV`. Odwrotnie — przez zawężenie wzorca wykluczenia — nowy
`.env.cokolwiek` z sekretami trafiłby na SSD i nikt by tego nie zauważył.
**Domyślnie odmawiamy, wyjątek jest imienny.** Dołożony **strażnik dryfu**:
jeśli git zacznie śledzić jakikolwiek `.env*` spoza listy, skrypt **krzyczy na
`stderr`** zamiast pominąć plik po cichu.

**Odstępstwo od reguły o przekazaniu w tym samym commicie — jawne, nie
przemilczane.** Właściciel zażądał osobnego commita z jednym plikiem, więc
rejestr i przekazanie idą commitem **następnym**. Odnotowane w opisie
`18c03f2`.

**DOWÓD — obie strony wzorca w jednym przebiegu** (migawka
`catherly-www-2026-08-24-1318.zip`, `HEAD` odtworzony `18c03f2`, osiągalny):

| | co sprawdzone | wynik |
|---|---|---|
| **A — chroni** | wykaz `.env*` w archiwum (nazwy, nigdy wartości) | dokładnie `.env.example`, nic więcej |
| **A — kontrola negatywna** | czy `.env` w ogóle istnieje lokalnie | **istnieje** (2 linie) i w archiwum go **nie ma** |
| **B — nie gubi** | `git status` odtworzonego repozytorium | **czysty** |
| **B** | `git fsck` | bez uszkodzeń |

Kontrola negatywna jest tu istotą, nie ozdobą: bez sprawdzenia, że `.env`
w ogóle istnieje, „brak `.env` w archiwum" nie dowodziłby niczego.

**Strażnik dryfu udowodniony MUTACJĄ, nie zapłonem** (pytanie 2 z zestawu,
`B-17`) — w **izolowanym klonie z przekierowanym katalogiem docelowym**, żeby
nie tknąć prawdziwych migawek. **Mutacja:** `git add -f .env.local` →
ostrzeżenie wypisane, plik **nie** trafił do archiwum. **Kontrola negatywna
w tym samym przebiegu:** cofnięcie mutacji → ostrzeżenia **brak**. Katalog
mutacji skasowany. **T43 zamknięte.**

**Sprawdzenie wsteczne ośmiu pozycji kosztów** pytaniem właściciela („czy
reguła istniała, gdy koszt powstał") — **wykryło jedno błędne przypisanie**.
**K5** przypisywał koszt objętości rejestru regule o **ogniwach** (T39,
2026-08-23), a wiersze urosły **wcześniej**: T39 tego kosztu nie spowodowała,
tylko go **ujawniła**. Koszt należy do szerszej praktyki pełnego
udokumentowania każdej pozycji. Poprawione. **K6 przeszedł najciaśniej** —
reguła 18 weszła do kanonu tego samego dnia, w którym powstał koszt.

**Trzy nowe klasy kanonu (22, 23, 24)** — „defekt, z którego reguła powstała,
nie jest jej kosztem", „retrospekcja i uchronienie mierzą dwie różne rzeczy",
„granica zakazu 8". Przy klasie 20 dopisane: **kolumna „koszt
zmaterializowany" jest obowiązkowa**, bo tabela bez niej **zawyża
systematycznie** — ryzyko zapisuje się łatwiej niż jego brak.

**⚠ TRZECIA ZADEKLAROWANA STRONNICZOŚĆ — oś ślepoty dotycząca METODY PRACY,
nie narzędzi.** Koszt w postaci rzeczy, która **nie powstała**, bo reguła
zniechęciła do jej zaczęcia, **nie zostawia śladu**: nie ma commita, pozycji
ani zdania w przekazaniu. **Żaden nasz rejestr nie ma miejsca na pozycję,
której nikt nie otworzył.** Przy **21 klasach kanonu** i **10 zakazach** (stan
2026-08-24) ta ślepota **rośnie z każdym wpisem**, a jej rozmiaru **nie da się
zmierzyć z wnętrza** — mierzyłby ją ten sam przepływ pracy, który ją wytwarza.
Wniosek właściciela, zapisany jako **otwarty**: to jest argument, żeby
**LICZBA reguł też miała swój koszt**, nie tylko treść każdej z osobna.
**Odesłanie bez treści, odnotowane zgodnie z regułą 18:** właściciel wskazał,
że oś dotyczy „wszystkich ośmiu okien" — **czym jest tych osiem okien, po tej
stronie nie wiadomo**, treści nie dołączono i domysłem jej nie uzupełniam.

---

### 4.18 Wznowienie po przecięciu sesji — sprawdzenie zlecenia i domknięcia (`WWW/017`)

**Zlecenie przyszło z NOWEJ sesji i zostało sprawdzone przed wykonaniem** —
na prośbę właściciela. Wynik sprawdzenia: **adres, skróty i stan zgadzają się
co do jednego.** `18c03f2` i `8999f0e` to **dokładnie** dwa niewypchnięte
commity, `8999f0e` jest `HEAD`, `18c03f2` jego rodzicem, drzewo robocze czyste,
data zlecenia zgodna z zegarem. Zlecenie nie łamie żadnego z dziesięciu
zakazów — i jako jedyne dotąd **jawnie zakazuje** tworzenia nowej reguły
(zakaz 10 zastosowany przez zlecającego do samego siebie).

**Push wykonany:** zdalny `8999f0ead31b97f0bccd8fe9a4f845df4237d3b4`,
zero niewypchniętych. Odstępstwo od reguły „przekazanie w tym samym commicie"
**zamknięte** — właściciel odnotował, że koszt tej reguły poniósł w tym
wypadku on, bo to jego warunek o pojedynczym pliku go wymusił.

**⚠ DWIE RZECZY ZGŁOSZONE PRZY SPRAWDZENIU ZLECENIA:**

**(1) Zlecenie mówi dwie różne rzeczy o pierwszej linii zwrotki.** Rozdział
PUSH: *„Pierwsza linia zwrotki: sha zdalnego HEAD"*. Zamknięcie: *„ZWROTKA:
pierwsza linia «WYKONANO — WWW», sha zdalnego HEAD"*. Rozjazd wewnątrz jednego
dokumentu, więc **zgłoszony, nie rozstrzygnięty po cichu**; zwrotka niesie
w pierwszej linii **oba** elementy, co spełnia obie wersje. Drobiazg, ale
dokładnie tej klasy, którą ten projekt ściga gdzie indziej.

**(2) Klasyfikacja K5 wymaga doprecyzowania — to trzecia kategoria, nie
druga.** Właściciel podciągnął wykrycie błędu w K5 pod rozróżnienie z T26
(„retrospekcja kontra uchronienie") jako dowód, że reguła jest **czytana**.
Ściśle to **ani jedno, ani drugie**: uchronienie zatrzymuje rękę **w chwili
pisania**, a tu błąd był już zapisany i zacommitowany; zwykła retrospekcja
odnosi się do **własnego przypadku źródłowego**, a tu reguła zadziałała na
**cudzym materiale**, dla którego nie powstała. To **przenośność** — dowód, że
reguła opisuje **klasę, a nie jeden przypadek**. Wartość realna, ale inna:
uchronienie mówi „reguła jest czytana **w chwili pracy**", przenośność mówi
„reguła **działa poza miejscem, w którym powstała**". Zapisane w kanonie jako
trzecia, osobno liczona kategoria.

**Strażnik dryfu — odnotowany jako wejście POZA ZLECENIEM.** Właściciel:
*„ta kolumna obowiązuje także dla rzeczy dobrych"*. Zlecenie mówiło wyłącznie
o wzorcu wykluczenia; strażnik nie mieścił się w jego **literze**, mieścił się
w **warunku** (jeden plik, jeden commit) i przeszedł test konieczności.
**Zapisane także jako uchybienie wykonawcy:** dodatek wszedł **bez oznaczenia
go jako wykraczającego poza zlecenie** — wykrył to właściciel, nie sesja.
W tej samej dobie ta sama sesja **odmówiła** podniesienia limitu
`bramka-pelny-zestaw`, powołując się na „rozszerzenie zgody poza literę".
**Ta sama reguła zastosowana w jedną stronę i pominięta w drugą — pominięta
akurat tam, gdzie rozszerzenie wypadło korzystnie.** Asymetria warta
zapamiętania: **rozszerzenie zakresu łatwiej zauważyć, gdy szkodzi, niż gdy
pomaga**, a reguła o zakresie tej różnicy nie zna.

**„Osiem okien" — odesłanie rozwiązane przez nadawcę.** Osiem równoległych
okien roboczych nad Catherly, tory po obu repozytoriach; słownik strony
właściciela, nieodczytywalny stąd. **Przebieg tej wymiany jest wzorcem
reguły 18:** brak zapisany jawnie → zauważony przez nadawcę → treść dołączona,
koszt jedno zdanie. **Konsekwencja większa niż samo odesłanie:** skoro okien
jest osiem, ślepota „pozycji, których nikt nie otworzył" **nie jest własnością
tego repozytorium, tylko całego przepływu** — a każde okno widzi tylko własne
wnętrze.

**„Liczba reguł też powinna mieć koszt" — ZOSTAJE PYTANIEM, nie regułą.**
Właściciel zakazał robienia z tego reguły z powodu, który jest częścią samego
pytania: **reguła o koszcie liczby reguł powiększa licznik, który miałaby
mierzyć.** Byłaby pierwszym mechanizmem w tym repozytorium, który **z
definicji** pogarsza wielkość, której pilnuje. **Warunek pomiaru: punkt spoza
okna.** Kandydat na zadanie — świeże okno **bez kanonu w kontekście**, żeby
ocena nie była skażona znajomością reguł, których koszt ma szacować.
**Kiedyś, nie teraz**, i to też jest częścią rozstrzygnięcia.

---

### 4.19 Domknięcia `WWW/018` i przejście w spoczynek

**Push `bd1c2ff`**; zdalny: `bd1c2ff853b7fc952f77d3730bfb69414925b543`,
zero niewypchniętych. **Po tym pushu WWW przechodzi w SPOCZYNEK do odwołania.**

**Format zwrotki zatwierdzony i zdefiniowany w JEDNYM miejscu** — `CLAUDE.md`,
rozdział „Zlecenie i zwrotka". Pierwsza linia:
`WYKONANO — WWW · <sha zdalnego HEAD>`, gdzie `sha` pochodzi z **odczytu
`git ls-remote`**, nie z komunikatu pushu. **Kolejne zlecenia formatu nie
powtarzają — odsyłają tam.** Rozjazd, który to wywołał (dwa różne brzmienia
pierwszej linii w jednym zleceniu), właściciel uznał za swój defekt.

**Nowa reguła kanonu: ZLECENIE Z NOWEGO OKNA SPRAWDZA SIĘ PRZED WYKONANIEM,
NIE PO.** Weryfikacja przed wykonaniem obejmuje: adres (ADR-018 pkt 7), czy
wymienione skróty to **dokładnie** to, co czeka, zgodność stanu, zgodność daty
z zegarem i zgodność z dziesięcioma zakazami. **Rozjazdy zgłasza się także
wtedy, gdy są drobne** i gdy wykonanie i tak jest oczywiste.

**Przenośność przyjęta jako TRZECIA kategoria — trzy liczniki, osobno:**
**retrospekcja** → reguła **TRAFNA**; **uchronienie** → **CZYTANA**;
**przenośność** → **OPISUJE KLASĘ, nie przypadek**. Trzeciej nie da się
sprowadzić do dwóch pierwszych: błąd był już zapisany (więc nie uchronienie),
a materiał nie był przypadkiem źródłowym reguły (więc nie retrospekcja).

**Pomiar metody, nie anegdota** (zapisany w `dowody-wartosci-regul.md`, bo
dotyczy sposobu pracy, nie pojedynczej reguły): w jednej wymianie zdjęto **po
jednym błędzie na stronę, każdy wykryty przez drugą stronę** — pytanie
kontrolne właściciela zdjęło błędne przypisanie w K5, analiza wykonawcy zdjęła
podciągnięcie K5 pod T26. **Korekta płynie w obie strony albo nie płynie
wcale.** Zapis ma wartość dopiero jako **para**: pojedyncza korekta dowodzi
uważności jednej osoby, dopiero obie naraz — że sprawdzanie jest własnością
przepływu.

**Warunek pomiaru pytania otwartego POSZERZONY:** punkt **spoza PRZEPŁYWU**,
nie spoza repozytorium. Skoro ślepota „pozycji, których nikt nie otworzył" jest
własnością całego przepływu (osiem okien), to punkt w innym oknie **też jest
w środku** — widzi własne wnętrze i dzieli ten sam kanon.

**⚠ ZGŁOSZONE: reguły, do której właściciel kazał dopisać uzasadnienie, w tym
kanonie NIE BYŁO.** Polecenie brzmiało: *„zdanie «rozszerzenie zakresu łatwiej
zauważyć, gdy szkodzi, niż gdy pomaga» dopisz przy regule o oznaczaniu wejść
poza zleceniem"* — a `grep` po `CLAUDE.md` dał **zero trafień**: obowiązek
oznaczania wejść poza zleceniem istniał dotąd wyłącznie jako **polecenie
właściciela z `WWW/017`** i jako wpis w **T43**, nigdy jako tekst kanonu.
Wykonane tak, żeby **nie mnożyć reguł** (zakaz 10, na który właściciel powołał
się w tym samym zleceniu): obowiązek i jego uzasadnienie dopisane **wewnątrz
granicy zakazu 8**, czyli w miejscu, które i tak reguluje wejścia poza zakres —
nie jako nowa, osobna klasa. **Do rozstrzygnięcia, jeśli właściciel chce
inaczej:** czy ma to być samodzielna reguła (wtedy jest to nowa klasa kanonu
i decyzja należy do niego), czy zostaje tam, gdzie stoi.

---

### 4.20 Import toru 9 — pomiar, uzgodnienie tożsamości, przeniesienie selektywne (`WWW/022`–`WWW/025`)

**Tożsamość nośnika uzgodniona ścieżką „nowsze odświeżenie".** Gałąź nośnika
ruszyła **trzy razy** w czasie tej wymiany: `8bb5cc4` → `95de99d` → `432fe88`.
Zmierzone na ostatnim stanie: bundle **sha256 `db67489b…c36d5`**, **2 971 117 B**,
czubek **`924b5802788a00e6d06a54904347aff818ea60f3`**, **236 commitów**,
odtworzenie do pustego czyste (349 plików, `fsck` bez uszkodzeń), **`9a15f26`
i `6ec17d2` przodkami czubka**. Wobec deklaracji nadawcy (`eab06655…` · `6ec17d2`
· 235) to **nowsze odświeżenie**, więc zgodnie z `WWW/025`: zgłoszone
i kontynuowane na nim, bez pytania.

**Delta `6ec17d2..924b580`:** jeden commit, trzy pliki, wszystkie
`docs/redakcja/*`, **zero plików wspólnych** — bez odchyłki.

**Przeniesienie selektywne, pięć grup:**

| grupa | co weszło | commit |
|---|---|---|
| 1 | 10 plików **istniejących wyłącznie w imporcie** — `docs/redakcja/*` (8), `scripts/lint-deklaracje.mjs`, `content/deklaracje-zlozone.json` | `6e859b4` |
| 2 | `docs/faza-2/rejestr-decyzji-stojacych.md` — plik nowy, wprost | `f9e934a` |
| 3 | `rejestr-warunkow-powrotu` poz. 20 → `~~20~~ PRZENIESIONE`, **ręcznie**, `+1/−1` | `e2d86da` |
| 4 | `CLAUDE.md` — integracja treści zwrotki **własnym osądem**; `bramki.yml` — **NIC** | ten commit |
| 5 | `package.json` — **NIC** | — |

**Dlaczego `bramki.yml` nie dostał nic — i to jest ustalenie, nie pominięcie.**
Tor 9 przysyła zadanie `bramka-deklaracje` w kształcie **ŻÓŁTYM**
(`continue-on-error: true`). Uzasadnienie jest trafne i sprawdziłem je
pomiarem: `node scripts/lint-deklaracje.mjs` jest u nas **CZERWONY na 10
naruszeniach**. Ale `continue-on-error` **wymienia z nazwy zakaz 3** jako
zamianę czerwieni na ciszę. Zostają dwa kształty i **oba coś łamią**; trzeciego
nie ma, a wymyślenie go po cichu byłoby rozstrzygnięciem rozjazdu między dwoma
kanonami. **Zapisane jako T44**, do rozstrzygnięcia właściciela.

**Co z zwrotki weszło do kanonu, a co pominąłem.** Weszło **jedenaście** zapisów,
zgrupowanych w rodziny zamiast wpisanych pojedynczo — bo liczba reguł ma swój
koszt (pytanie otwarte, `WWW/018`), a rozbicie tego samego na osobne klasy
podniosłoby licznik bez podniesienia treści. **Pominięte jako duplikaty:**
„liczba starzeje się w tranzycie" (mamy T26 i regułę o stemplu z datą
i commitem) oraz „artefakt sprawdza się odtworzeniem, nie verify" **jako osobna
klasa** — to już stoi w rozdziale o backupie; przeniesione zostało wyłącznie
**ostrzejsze sformułowanie** („verify mierzy spójność wobec NADAWCY,
odtworzenie wobec świata, w którym nadawcy już nie ma").

**Trzy zapisy trafiły w błędy popełnione po tej stronie i dlatego weszły
z rodzimym wzorcem:** „zdanie o własnej niedostępności podlega dowodowi"
(nasze `P-22` „drogi weryfikacji nie ma" — obalone jednym odczytem z dysku),
„adres konkretny to nie adres zmierzony / odczyt częściowy zgłasza się jako
kompletny" (`WWW/019` — przeszukanie gałęzi **pobranych** podane jako
przeszukanie repozytorium), „klasa opisana nie jest klasą unikaną" (tego samego
dnia odmowa rozszerzenia zgody i **nieoznaczony** dodatek poza zleceniem).

⚠ **ZOBOWIĄZANIE, KTÓRE Z TEGO WYNIKA I NIE JEST WYKONANE.** Przeniesiona
reguła mówi: **po sprostowaniu przypadku przelicz WSZYSTKIE zdania tej samej
formy.** W `WWW/022` sprostowałem **jedno** zdanie o niedostępności. Pozostałe
adnotacje `P-22` w rejestrze (T25, T30, T36, T38, T43, T44) **nie zostały
przeliczone** — część z nich dotyczy wyników mutacji wykonanych po tamtej
stronie i tam `P-22` prawdopodobnie zostaje, część dotyczy istnienia
dokumentów i tam pewnie nie. **Rozstrzygnięcia nie ma i nie robię go przy
okazji** — to osobne zlecenie, zgłoszone razem z dwoma wcześniej zgłoszonymi
wpisami czekającymi na ten sam ruch.

⚠ **T45 — `node_modules` i `.next` zniknęły w trakcie sesji, przyczyna nie po
mojej stronie.** `npm run lint` dawał kod 0 o ~15:2x, o 17:5x daje **127**
(`eslint: command not found`); `mtime` katalogu repozytorium: **15:47:42**,
poza jakimkolwiek moim poleceniem. Hooki, `backup.sh` i brak miejsca
**wykluczone odczytem**. **`npm ci` NIE uruchomione** — kilkaset megabajtów na
dysku zajętym w 92%, a usunięcie mogło być celowe. **Skutek zapisany jawnie:
dwie bramki są dziś niewykonalne lokalnie** (`lint`, `kotwice`), więc commity
tej sesji przeszły wyłącznie przez bramki hooka. Że dziedzina tych bramek nie
pokrywa się z treścią commitów, **jest argumentem, nie dowodem** — i tak jest
zapisane.

---

### 4.21 T45 naprawione, T44 rozstrzygnięte zapadką (`WWW/026`)

**T45 — zależności przywrócone, bramki znów wykonalne.** Oba warunki właściciela
sprawdzone **przed** instalacją: lockfile śledzony w repozytorium (416 914 B);
wolne **18 GiB** przy spodziewanej instalacji rzędu 0,3–1,5 GiB. `npm ci` →
kod **0**, **533 pakiety, 691 MB**, wolne po instalacji **17 GiB**.

**Lint przed/po: `127` → `0`.** Zero ostrzeżeń, zero błędów, puste wyjście —
czyli commity z `WWW/025` przechodzą eslint, co wcześniej było **argumentem,
a nie dowodem**. Po odbudowie (`npm run build`, kod 0) `bramka:kotwice` też
wraca **zielona**. Pełny zestaw lokalny na `e906013`: **zielone** — `tokeny`,
`liczby`, `parytet`, `kontrakt`, `kotwice`, `linki`, `nojs`, `lint`;
**czerwone dwie, obie wyjaśnione i znane**: `cennik` (wymaga klucza testowego
Stripe po stronie właściciela — w CI ta bramka była zielona) oraz
`nieodwracalne` (brak raportu audytu dla commita, ADR-018 pkt 4 — wraca przy
każdym nowym commicie).

**T44 — trzeci kształt istnieje i jest wdrożony: ZAPADKA.** Rozjazd dwóch
kanonów rozstrzygnął właściciel; odmowa wymyślenia kształtu po cichu została
uznana za właściwą. Kształt: **próg odniesienia** w
`scripts/deklaracje-baseline.json` (dziś **10**), bramka czerwona **wyłącznie
ponad próg**. Zero `continue-on-error` — sprawdzone maszynowo: **w całym
`bramki.yml` zero zadań z tym kluczem**. Zielona dziś, więc nie uczy
obchodzenia; **jedenaste naruszenie zapala czerwień od pierwszego dnia**.

**Dwie decyzje projektowe, które nie były w zleceniu, i dlatego je nazywam:**
**(1)** skryptu toru 9 **nie modyfikowałem** — zapadka jest **opakowaniem**
(`scripts/bramka-deklaracje.mjs`), bo `lint-deklaracje.mjs` wróci przy
następnym imporcie i rozjazd kopii kosztowałby więcej; **(2) spadek poniżej
progu też jest czerwienią** — inaczej próg zostaje zapasem, w który wolno
wrócić, i zapadka zapadałaby się tylko z jednej strony. Obie wchodzą **poza
literę zlecenia** i są tak oznaczone.

**Dowód mutacyjny z kontrolą negatywną, jeden przebieg:**

| | co zrobiono | wynik |
|---|---|---|
| regres | `content/pl/obawy.md:24`, `48 zn` → `47 zn` | **11 przy progu 10 → CZERWIEŃ**, kod 1 |
| kontrola negatywna | cofnięcie przez `git checkout HEAD --` | **10 → ZIELEŃ**, kod 0, `status` czysty |
| druga gałąź | próg podniesiony do 11 przy 10 naruszeniach | **„POSTĘP NIEZAPISANY" → CZERWIEŃ**, kod 1 |

Cofnięcie zrobione `git checkout HEAD --`, **nie `git checkout --`** — wprost
z lekcji przeniesionej dziś z toru 9 („`checkout --` bierze z indeksu").

**Kolejka napraw wpisana imiennie** — dziesięć rozjazdów w pliku progu i w T44.
To warstwa treści, więc naprawa idzie z redakcją tras, w których te ciągi
siedzą; **zapadka bez kolejki byłaby konserwowaniem długu**.

**T44 pozostaje otwarte:** warunek zamknięcia żąda **przebiegu CI**, w którym
zadanie daje werdykt. Dziś dowód jest wyłącznie lokalny.

**`package.json` dostał wpis `bramka:deklaracje`** — wcięcie 4 spacje, jak
sąsiedzi. **To zapis własny, nie przeniesienie**: wersja toru 9 miała 2 spacje
i grupa 5 zlecenia `WWW/024` zakazywała jej przenoszenia; bez wpisu zadanie CI
nie miałoby czego wywołać.

---

### 4.22 T48, przenośność reguły, strażnik cennika ze źródła (`WWW/028`)

**Uwaga o dacie, zanim liczby:** nagłówek zlecenia niesie **24.08.2026**, zegar
maszyny w chwili wykonania — **2026-08-26, 07:35 CEST**. Stemple w tym commicie
noszą **datę faktyczną**. To **trzecie** wystąpienie klasy „stempel poprawny
w chwili powstania, fałszywy w chwili cytowania" po stronie zlecającego (T26).

**T48 — manifest wymieniał ładunek, nie wszystkie pliki wspólne.** Manifest toru 9
podawał **pięć** plików; porównanie drzew dało **siedem** wspólnych-i-różnych.
Trzy pominięte — `docs/STRATEGIA.md`, `docs/adr/018-…`, `scripts/backup.sh` —
stoją w imporcie w wersji **identycznej z `69c2dab`** (sprawdzone skrótami
blobów), czyli import ich nie zmieniał; różnica bierze się stąd, że **my
zmieniliśmy je 2026-08-24**. **Nasze wersje są nowsze, więc przeniesienie
byłoby cofnięciem.** Wpis **wyłącznie ewidencyjny**, zero przenoszenia
(rozstrzygnięcie właściciela). Konsekwencja idzie do **nadawcy**: manifest ma
wymieniać wszystkie pliki wspólne dotknięte na gałęzi. Do tego czasu **każdy
import z tego kierunku wymaga własnego inwentarza po stronie odbiorcy**.

**T47 — dopisany dowód PRZENOŚNOŚCI, licznik rośnie do dwóch.** Przy przeglądzie
sześciu adnotacji metoda wyszukiwania była zepsuta **dwa razy w jednym
przebiegu** (`--` przed wzorcem; potem pętla gubiąca trafienia) i **oba defekty
zdjęła kontrola pozytywna**. Pierwszy wynik brzmiał „zero trafień na czterech
kodach `RECZ`" i **wyglądał jak ustalenie**; po naprawie metody znalazły się
wszystkie cztery. Reguła „zero bez kontroli pozytywnej jest zerem narzędzia"
weszła **rano** 2026-08-24 i **tego samego dnia wieczorem uratowała pomiar
własny** — w materiale, dla którego nie powstała. To przenośność, nie
retrospekcja i nie uchronienie.

**Strażnik cennika — liczebność ze źródła.** Lista **dziesięciu** etykiet
wypisanych ręcznie przy **czternastu** kluczach `Cennik.tabela.*`. Odtąd zbiór
kluczy pochodzi z `Object.keys(messages)`, więc **nowy klucz wchodzi do
strażnika sam**. Trzy klucze wyłączone **jawnie i z powodem** — `caption`
(etykieta dostępności), `wPlanie`, `pozaPlanem` (wartości komórek); żądanie ich
w prozie dałoby **fałszywą czerwień na różnicy licencjonowanej** (klasa T36).
Czwarty spoza starej listy — `zakres` — jest w prozie obecny i wszedł do
sprawdzanych. **Pokrycie: 11 sprawdzanych + 3 wyłączone = 14 z 14.**

Dwie asercje pilnują samego **podziału**, bo bez nich wyłączenie byłoby furtką:
sprawdzane + wyłączone **równa się** liczbie kluczy, a każdy klucz wyłączony
**nadal istnieje** w messages (wyłączenie przeterminowane udaje decyzję).

**Dowód obu stron, jeden przebieg:**

| | co | wynik |
|---|---|---|
| A | stan bieżący | **14 passed** |
| mutacja | nowy klucz `Cennik.tabela.nowyKlucz`, nieobecny w treści — **stary** strażnik | **14 passed** ← ŚLEPY |
| mutacja | **ta sama**, nowy strażnik | **1 failed**, komunikat nazywa klucz |
| kontrola negatywna | `git checkout HEAD --`, suma SHA `pl.json` identyczna | **14 passed** |
| mutacja B | usunięcie klucza **wyłączonego** (`caption`) | **1 failed** — wyłączenie przeterminowane |
| przywrócenie | suma zgodna | **14 passed** |

Czerwień pochodzi **ze zmiany strażnika**, nie z otoczenia: ta sama mutacja,
to samo otoczenie, dwa strażniki, dwa wyniki.

**Punkt 4 — pozostałe wystąpienia klasy „liczebność ręczna", NIE naprawiane:**
`e2e/zlozenie.spec.ts:226` — `toHaveCount(6)` dla obaw (źródło: `Obawy.p*` =
**6** dziś, zgodne) · `e2e/hero.spec.ts:59` — `toHaveCount(2)` dla potwierdzeń
(źródło: `Hero.potwierdzenie*` = **2**, zgodne) · `e2e/zlozenie.spec.ts:170`
i `:194` — `toHaveCount(3)`, **źródła nie ustaliłem**. Osobno, **inna
kategoria**: `e2e/rejestr-mapy.spec.ts:69` — `toBe(8)` asertuje **decyzję**
(F4-5), nie liczebność ze zbioru, więc literał jest tam zadeklarowanym
niezmiennikiem, nie dryfem.

⚠ **Rozjazd z torem 9, zgłaszam zamiast przyjąć:** tor 9 pisze o
`toHaveCount(6)` **przy siedmiu parach obaw**; pomiar po tej stronie daje
**sześć** kluczy `Obawy.p*`, czyli **zgodność**, nie rozjazd. Albo tamten
pomiar dotyczy innego stanu, albo liczy pary inaczej. **Nie przyjmuję siódemki
i nie naprawiam czegoś, co u mnie się zgadza.**

---

### 4.23 Arkusz do stanu decyzyjnego i strażnik daty na trzy bloki (`WWW/031`)

⚠ **Najpierw korekta własnego pomiaru, bo poszedł do właściciela jako
ustalenie.** Zwrotka `WWW/029` orzekła, że arkusz **nie ma przełącznika
palet**. **Nieprawda.** Grep szukał literału `data-paleta`, a kod ustawia
atrybut przez **`dataset.paleta`** — camelCase API DOM, w którym ten ciąg nie
występuje. Sprawdzone na żywo: **pięć przycisków**, przełączanie bez
przeładowania, `czern` → tło `#0a0a0a`, akcent `#a3e635`. **Trzecie w tej
sesji zero narzędzia — i pierwsze, które zdążyło wyjść na zewnątrz.** Dwa
poprzednie złapała kontrola pozytywna przed zapisem; ten wrócił dopiero przy
próbie zbudowania rzeczy, która już istniała. Wniosek zapisany przy T47:
**przy orzekaniu o nieobecności w kodzie sprawdź, czy szukany byt nie ma
drugiej postaci** — zero z jednej postaci nie jest zerem bytu.

**A — NIE WYKONANE CELOWO, zgłoszone.** Zlecenie mówi „przenieś wartości ról
do arkusza, nie linkuj do src". Arkusz jest zbudowany **odwrotnie i lepiej**:
nie ma **ani jednej własnej wartości barwnej**, tylko zaciąga CSS żywego
builda ze strony głównej w czasie wykonania. Przeniesienie utworzyłoby
**kopię recepty**, która rozjedzie się z `globals.css` i nikt tego nie
zauważy — klasa zapisana w tej sesji kilkakrotnie. **Czekam na
rozstrzygnięcie zamiast cofać projekt arkusza po cichu.**

**B — już istniało:** `wybor-rem` 36–48 rem (domyślnie 42), obie miary jedna
pod drugą ×3 języki, `text-wrap: balance` w `.h1-próba`.

**C — wykonane.** Każda próbka H1 dostała **podtytuł i CTA** (teksty
przepisane z `Hero.podtytul` i `Hero.cta`, nie wymyślone), a metka liczy na
żywo: kolumnę, linie, **wysokość H1, Y podtytułu, Y CTA** względem górnej
krawędzi H1. Y względne, bo bezwzględne zależy od pozycji sekcji.
Zmierzone: `PL · 24ch` → kolumna **727,9 px**, 3 linie, Y CTA **+297,1 px**;
`PL · miara docelowa` → kolumna **672,0 px**, 3 linie, Y CTA **+247,5 px**.
**Po to ta sekcja jest:** sama miara mówi, ile linii; dopiero położenie rzeczy
**pod** nagłówkiem pokazuje, ile kosztuje jedna linia różnicy (T12: 55,19 px).

**D — wykonane.** `W-POMIAR-01`: `document.fonts.check` **plus** pomiar
szerokości próbki rodziną docelową wobec samego zapasu. Werdykt stoi **przy
liczbach i przed nimi**, bo „mierzy fallback" unieważnia wszystko pod nim.
Zmierzone: *„mierzy: Schibsted Grotesk · próbka 1347,4 px wobec zapasu
1574,7 px (różnica 227,3 px) · document.fonts.check: zna"*. **Karta ograniczeń
dopisana w arkuszu**, nie tylko w komentarzu — cztery granice, w tym ta
najważniejsza: `CSS.getPlatformFontsForNode` jest protokołem DevTools i w
statycznym HTML nie istnieje, więc stoją tam **dwa pomiary pośrednie, nie
jeden wprost**.

**E — strażnik daty na trzy bloki.** Stan sprzed zmiany był **odwrotnością
tego, co wyglądał**: blok, którego termin **jest** egzekwowany, daty
w nagłówku nie miał; dwa, które termin **ogłaszały**, nie miały egzekucji.
Zasięg rozdzielony: **osłona** dalej tylko dla palety, **termin** dla
wszystkich trzech. Dołożona asercja **poza literą zlecenia i tak oznaczona**:
nagłówek niosący datę musi nieść **tę samą** datę co mechanizm.

**Dowód obu stron, jeden przebieg:** dziś **zielony** → mutacja
`WYJATEK_WYGASA` na `2026-08-25` (zegar przesunięty **w kodzie**, nie
w systemie) → **czerwień, 80 naruszeń**, komunikat wymienia **wszystkie trzy**
bloki z nazwy i niesie linię o `onest.woff2` → przywrócenie z kopii,
potwierdzone **sumą SHA** (`28dc73f8e4bf` przed i po) → **zielony**.
Przywracałem z kopii, **nie** `git checkout HEAD --`: w `HEAD` nie było
jeszcze tej naprawy, więc checkout skasowałby pracę zamiast cofnąć mutację.

**G — rozjazd notacji, nie wartości. Nic nie zmieniam.** Pomiar na żywym
arkuszu: `getComputedStyle(html).fontSize` = **16 px**, `backdrop-filter`
zapisany jako `blur(1rem)` daje computed **`blur(16px)`**. Wartość identyczna.

**Dwie klasy do kanonu z `WWW/030`**, zaległe z tury czysto odczytowej:
**wyłączenie ze sprawdzania ma własnego strażnika liczebności** oraz **przy
naprawie strażnika dowodem jest ślepota starego obok wzroku nowego, na
identycznym wejściu**.

**Odstępstwo od układu commitów, jawne:** zlecenie przewidywało dwa commity
(arkusz, strażnik). Ten trzeci niesie **wyłącznie dokumentację** — inaczej
złamałby warunek „wyłącznie `scripts/lint-tokeny.mjs`" przy commicie E.

---

### 4.24 Trzecia zaległość z `WWW/030` zapisana — mapa klas → strażników (`WWW/032`)

**Sprawdzenie przed zapisem: dwie z trzech pozycji już stały.** Obie klasy
kanonu weszły w `a316b53` („wyłączenie ze sprawdzania ma własnego strażnika
liczebności", „przy naprawie strażnika dowodem jest ślepota starego obok
wzroku nowego"). Brakowało **trzeciej** — wiersza do mapy klas→strażników.
Mapa **nie istniała jako dokument**, więc nie było gdzie tego wiersza wpisać.

⚠ **Czwarte zero narzędzia w tej sesji, złapane od razu.** Sprawdzając, czy
obie klasy są zapisane, `grep` na drugiej dał **0** — bo fraza łamie się
w pliku na dwie linie, a `grep` czyta liniami. Powtórzone po normalizacji
białych znaków: **jest**. Ta sama rodzina, co `data-paleta` kontra
`dataset.paleta` — **zero z jednej postaci nie jest zerem bytu**, tym razem
postacią jest złamanie wiersza.

**Nowy dokument: `docs/faza-2/mapa-klas-straznikow.md`.** Nagłówek deklaruje
szczebel 7 i to, że **nie jest źródłem reguł** — od pierwszego commita, bo
dokument bez tego zdania był defektem, który otworzył T32. To **czwarty
z siedmiu nagłówków** w warunku zamknięcia T32. Zakaz 10 nietknięty: zakazuje
mnożenia **źródeł reguł wiążących**, a to jest mapa pokrycia i mówi to wprost.

**Pierwsza klasa w mapie: liczebność ZE ZBIORU kontra Z DECYZJI**, z pytaniem
rozstrzygającym („czy istnieje zbiór źródłowy, którego liczebność ta liczba ma
odwzorowywać") i z powodem, dla którego to nie jest ta sama rzecz pod dwoma
imionami: **liczba z decyzji MA PRAWO rozjechać się ze stanem świata** — wtedy
czerwień jest jej zadaniem; **liczba ze zbioru rozjechać się nie ma prawa**
i jej rozjazd jest defektem strażnika, nie sygnałem o świecie.

**Sześć wystąpień z adresami**, w tym dwa z nieustalonym źródłem
(`zlozenie.spec.ts:170` i `:194`) — **nie badane, zgodnie z poleceniem**.
Rozjazd z torem 9 o „siedmiu parach obaw" zapisany jako **otwarty**: szóstka
stoi, nic się nie zmienia do czasu pomiaru źródłowego po tamtej stronie.

**Granica mapy zadeklarowana w niej samej:** nie jest wynikiem przeszukania
repozytorium — wystąpienia zebrano przy okazji jednego zadania, heurystyką
na literałach w `e2e/`. **Nie przeszukano** `src/`, `scripts/` ani asercji
zapisanych inaczej niż literałem. **Brak adresu w mapie nie znaczy, że go nie
ma** — znaczy, że nikt tam nie patrzył. Mapa pokrycia, która nie mówi, czego
nie pokrywa, sama jest tą klasą wady, którą opisuje.

**Obieg — druga zguba zwrotki.** Właściciel przyjął wzorzec ponownego
doręczenia jako standard: **nie powtarzać pomiaru ślepo**, tylko sprawdzić
niezmienność stanu (`HEAD`, sumy plików przedmiotu) i oznaczyć **datę
obowiązywania**. Po jego stronie sygnałem zguby jest **zwrotka niepodjęta
w kolejnej wklejce** — kolejność wykrywa zgubę bez osobnego mechanizmu.

---

### 4.25 Zwężenie reguły o liczbach w strażnikach; rozjazd 6 vs 7 rozstrzygnięty (`WWW/033`)

**Potwierdzenie do `WWW/032`: trzy pozycje weszły, ale w DWÓCH commitach.**
Dwa wpisy kanonu — `a316b53`; wiersz mapy klas→strażników — `287fc9f`
(zgoda `WWW/032` przyszła po tym, jak `WWW/031` był już wypchnięty). Oba na
zdalnym.

**Korekta kanonu od toru 9 — moje brzmienie było ZA SZEROKIE.** Zapis
„liczebność strażnik bierze z pliku, nie z ręki" zastosowany do
`toHaveCount(6)` **usunąłby własność, dla której ten strażnik istnieje**.
Obowiązuje zwężenie: **liczba wpisana ręcznie w strażniku jest defektem albo
mechanizmem; rozstrzyga jedno pytanie — czy jej zmiana ma być decyzją.**
Plus wymóg wykonawczy: **przy każdej liczbie w strażniku zdanie w kodzie, po
co ona tam jest** — bez niego następny czytający zgadnie zgodnie z modą, czyli
„to literał, wyprowadźmy go z pliku".

⚠ **Moje własne pytanie rozstrzygające też było błędne — i obaliła je pierwsza
próba użycia.** W mapie stało: *„czy istnieje zbiór źródłowy, którego
liczebność ta liczba ma odwzorowywać?"*. Przy `toHaveCount(6)` odpowiada
**TAK** (`Obawy.p*` liczy 6), więc kazałoby wyprowadzić liczbę z pliku — czyli
zepsuć strażnika. **Istnienie zbioru nie rozstrzyga niczego, bo zbiór istnieje
w obu klasach.** Rozstrzyga **status zmiany**. Pytanie w mapie zastąpione
brzmieniem właściciela, stare zapisane obok z powodem obalenia.

**ROZJAZD 6 vs 7 — ROZSTRZYGNIĘTY ODCZYTEM, nie czekaniem.** Materiał
rozstrzygający **przyszedł importem `WWW/024` i leży w tym repozytorium**:
`docs/redakcja/LISTA-WYKONAWCZA-R2.md:30` i `REJESTR-PRZEPLYWU.md:139`
opisują **decyzję O-7** — *„siódma para obaw: treść + `toHaveCount(6)→7` +
`STRATEGIA.md` pkt 24 + `Obawy.naglowek` «Sześć»→«Siedem» ×3 języki, jednym
pakietem albo wcale"*. **Siódemka toru 9 to stan PLANOWANY, nie pomiar stanu
bieżącego.** Rozjazdu nie było — była **różnica dziedziny**: my mierzyliśmy,
co jest, tamci opisywali, co ma być. Szóstka stoi; O-7 wejdzie **pakietem**,
nie zmianą literału.

**Zbieżność odnotowana** (właściciel): rozróżnienie zbiór-kontra-decyzja
powstało niezależnie po obu stronach w tej samej dobie — tor 9 przy §162.6,
to okno przy `toBe(8)`. **Dwa źródła, jeden wynik** — i to jest jedyna para
w tej sesji, która spełnia warunek niezależności z klasy 21.

**Wykonanie wymogu — commit `a6e2062`, wyłącznie komentarze w `e2e/`**
(sprawdzone: 28 linii dodanych, 0 usuniętych, każda zaczyna się od `//`).
`toHaveCount(6)` → mechanizm, pakiet O-7 · `toBe(8)` → mechanizm, decyzja
F4-5 · `toHaveCount(2)` → **status nierozstrzygnięty, zapisany jako
nierozstrzygnięty**. **Poza literą zlecenia i tak oznaczone:** dopisałem także
dwie nieznane (`zlozenie.spec.ts:170` i `:194`) **bez badania ich** — bo nowy
wymóg mówi „przy KAŻDEJ liczbie", a spełniony wybiórczo nie pozwoliłby
odróżnić „nie ustalono" od „nie sprawdzono". Przy `:194` odnotowany
**kandydat** widoczny linijkę niżej (`PLANY.length`), jawnie jako kandydat.

**Klasa do kanonu: „zero z jednej postaci nie jest zerem bytu"** — w moim
brzmieniu, z adnotacją: **pierwsze zero narzędzia, które wyszło na zewnątrz
jako ustalenie**, wykryte przy próbie budowy rzeczy istniejącej. **Para
z drugiego okna, ta sama doba, ta sama klasa, inna postać**: tor 9 —
*„pusty wynik znaczy: narzędzie nic nie wskazało, nie: nie ma czego szukać"*.
Tamto o **interpretacji pustego wyniku**, to o **wielopostaciowości szukanego
bytu**; razem domykają obie strony.

**A z `WWW/031` — rozstrzygnięte przez właściciela: projekt arkusza zostaje.**
Zlecenie („przenieś wartości, nie linkuj do src") tworzyłoby klasę
kopii-recepty. **Zero pracy do wykonania.**

---

### 4.26 A-16 na stronie — dwanaście miejsc, i trzynaste znalezione (`WWW/034`)

**Materiał:** `docs/redakcja/MATERIAL-A16-PRZEDZIAL.md` (przyszedł importem
`WWW/024`, grupa 1). **Wariant B** — A odrzucony jako czytelny odwrotnie,
C jako wywracający bramkę `podstawMinuty`.

**Brzmienie kanoniczne z rzeczownikiem właściwym stronie** (`rozmowa` /
`conversation` / `Gespräch`, nie `spotkanie` jak w aplikacji):

| | przed | po |
|---|---|---|
| **PL** | `{minuty} minut przed każdą rozmową` | `w ostatnich {minuty} minutach przed rozmową` |
| **EN** | `{minuty} minutes before each conversation` | `within the last {minuty} minutes before the conversation` |
| **DE** | `{minuty} Minuten vor jedem Gespräch` | `in den letzten {minuty} Minuten vor dem Gespräch` |

Zmiana usuwa **obie** wady z materiału: **W1** (liczba punktowa tam, gdzie
mechanizm daje przedział) i **W2** („każdą / each / jedem" jest bezwarunkowe,
a mechanizm ma budżet i przypomnienie może przepaść).

**Dwanaście miejsc — sześć w `messages`, sześć w `content/`, jeden commit**
(inaczej strażnicy porównujący znak w znak dają czerwień):

| # | plik | miejsce |
|---|---|---|
| 1–3 | `src/i18n/messages/{pl,en,de}.json` | `FunkcjePozyskiwanie.mod2_poco` |
| 4–6 | `src/i18n/messages/{pl,en,de}.json` | `DlaKogo.s1_robi_1` |
| 7–9 | `content/{pl,en,de}/funkcje-pozyskiwanie.md` | akapit „PO CO TO" |
| 10–12 | `content/{pl,en,de}/dla-kogo.md` | akapit „CO CATHERLY Z TYM ROBI" |

Plus dwie adnotacje `*(„30 minut" — facts.json…)*` w plikach PL doprowadzone
do zgodności z nowym brzmieniem („30 minutach").

**Łańcuch równości utrzymany i wydłużony** — wspólny sufiks obu kluczy,
zmierzony po zmianie: **PL 75 znaków** (było 66), **EN 88** (73), **DE 84**
(71). Zmiana jednego klucza bez drugiego rozbiłaby łańcuch; oba poszły razem.

**Dowody:** `liczby`, `parytet`, `kontrakt`, `tokeny`, `deklaracje` — zielone;
`npm run build` kod 0; **`e2e/dla-kogo.spec.ts` + `e2e/funkcje-pozyskiwanie.spec.ts`
→ 51 passed**, w tym oba strażniki porównujące znak w znak po podstawieniu
`{minuty}`.

**Kontrola punktu 3 — z poprawką własnej metody.** Pierwsza wersja kontroli
dawała 1 dla EN i DE, i **to był artefakt regexu, nie pozostałość**: wzorzec
`30 (minutes|Minuten) (before|vor)` łapie także **nową** frazę okna („within
the last 30 minutes before…"). Kontrola precyzyjna, rozdzielająca konstrukcję
starą od nowej: **stara — 0 we wszystkich sześciu plikach**, nowa (okno) —
**1 w każdym**. W `messages` punktowych `30` jest **0**, `{minuty}` **2** na
język. Fraza „każdą / each / jedem" **zniknęła ze wszystkich zmienionych
miejsc**.

⚠ **T49 — TRZYNASTE MIEJSCE, POZA INWENTARZEM MATERIAŁU.**
`content/tabela-obietnic.md:37` niesie wciąż: *„dostajesz przypomnienie
**30 minut przed każdą rozmową**"* — czyli **obie wady, które właśnie
usunęliśmy**. Materiał policzył dwanaście **dla dwóch KLUCZY**, a tabela
obietnic powtarza to twierdzenie **prozą, bez klucza**, więc wypadła
z zapytania — ta sama klasa „złego podzbioru" co T47, tylko po stronie
nadawcy materiału.

**Nie ruszam — poza zakresem zlecenia** (zakaz 8). **Ale zgłaszam z wagą, nie
jako porządek:** `tabela-obietnic.md` jest plikiem, **którego zadaniem jest
wyliczać obietnice**, a obietnice to jeden z czterech obszarów nieodwracalnych
ADR-018. **Do 2026-08-26 strona mówiła nieprawdę SPÓJNIE; od tej zmiany mówi
nieprawdę w jednym miejscu i prawdę w sześciu** — a stan rozjechany jest
trudniejszy do zauważenia niż błędny, bo każde miejsce z osobna wygląda na
przemyślane. Poprawka jest **dwuczłonowa** (nazwa kolumny i opis) i plik czyta
`scripts/lint-liczby.mjs`.

**Nie tknięte, zgodnie z §4 zlecenia:** tabela `/cennik`, D-1/D-2, cokolwiek
z redakcji `O-*`.

---

### 4.27 Pakiet weryfikacji zewnętrznej (`WWW/035`)

**`docs/weryfikacja-zewnetrzna/` — 34 pliki, 9,7 MB.**
Zero zmian w `src/` (sprawdzone `git status src/` — puste), zero interpretacji
treści: wszystko z **odczytu i pomiaru**.

| plik | co niesie | pomiar |
|---|---|---|
| `01-STRUKTURA.json` | 9 tras, sekcje **w kolejności DOM** | 97 sekcji, **760 elementów**, **509 dopasowanych do klucza i18n** |
| `02-TEKSTY-{pl,en,de}.json` | klucze + surowe `content/*.md` | **330 kluczy** i **14 plików** na język |
| `03-PALETA.json` | 5 palet × **14 ról**, dwiema drogami | + tabela kontrastów WCAG 2.x, 7 par na paletę |
| `04-TYPOGRAFIA.json` | kroje, wagi, skala, `clamp`, tracking | 3 pliki `woff2`, **70,8 KB** |
| `05-ZRZUTY/` | pełna wysokość strony | **26 zrzutów**, 9,7 MB |

**Struktura wzięta z wyrenderowanego DOM, nie z kodu** — kolejność sekcji jest
wtedy faktem, a nie odczytem `page.tsx`. Klucze i18n ustalone **odwrotnym
dopasowaniem** tekstu do `messages/pl.json`; **`null` znaczy „nie dopasowano",
nie „klucza nie ma"** i jest to napisane w legendzie, razem z listą powodów
niedopasowania. Gdzie tekst pasuje do **kilku** kluczy, pole niesie **tablicę
kandydatów** — nie wybrałem jednego.

**Palety odczytane DWIEMA drogami:** cytat z `globals.css` **plus**
`getComputedStyle` z przeglądarki (rozwiązane `var()`). Obie w pliku, bo
pierwsza pokazuje, co napisano, a druga — co przeglądarka z tego robi.

**Kontrasty policzone, nie przepisane** — wzorem WCAG 2.x, tym samym, którego
używa `scripts/kontrast.mjs`. **Trzy wyniki poniżej progu i wszystkie trzy
opisane jako NIE-defekty**, z powodem: `akcent × tło` w produkcji (2,87 — rola
jest dekoracją, `R-AKCENT-01`) i `CTA wypełnienie × tło` w trzech jasnych
paletach (`len` **1,12** — granicę niesie obwódka, nie wypełnienie).

**Sekcja ROZJAZDY — osiem pozycji**, bo obce narzędzie bez nich wyciągnie złe
wnioski. Najważniejsze trzy: **(1)** żaden webfont **nie jest wdrożony**,
produkcja chodzi na `system-ui` (ADR-026) — zrzuty pokazują kroje systemowe;
**(2)** cztery palety **znikną 2026-08-31** razem z blokiem eksperymentu, więc
pakiet ma **datę ważności**; **(7)** ⚠ `content/tabela-obietnic.md:37` mówi co
innego niż sześć miejsc poprawionych w `WWW/034` — **z jawnym ostrzeżeniem, żeby
nie brać tego za dwa warianty do wyboru** (T49).

**Legenda dwujęzyczna** (PL + EN), bo narzędzie może nie czytać polskiego —
z zastrzeżeniem, że **nazwy pól i treść plików są po polsku**.

**Skrypty generujące — jednorazowe, nie zapisane w repozytorium.** README mówi
to wprost i podaje źródła odczytu; odtworzenie polega na powtórzeniu pomiarów,
nie na uruchomieniu narzędzia. **Świadoma granica:** pakiet **nie jest
odtwarzalny jednym poleceniem** i jest to napisane, a nie przemilczane.

**Archiwum NIE leży w repozytorium — decyzja własna, oznaczona.** Zlecenie
proponowało „np. archiwum zip w tym samym katalogu". Gotowy `pakiet.zip` ważył
**9,5 MB** i dublował **bajt w bajt** pliki z tego samego commita, a raz dodany
do historii gita zostaje w niej **na zawsze**. Zamiast tego README podaje
`git archive --format=zip HEAD:docs/weryfikacja-zewnetrzna > pakiet.zip` —
jeden ruch, zero duplikatu w historii, a archiwum budowane **z commita**, więc
z definicji zgodne ze stanem, który opisuje. Sprawdzone: 34 pliki, 9 556 923 B,
`unzip -t` bez błędów. **Jeśli właściciel woli zip w repozytorium — jedno
słowo i wchodzi.**

Serwer na porcie **3987** zatrzymany po generacji; port **3000 nietknięty**.

---

### 4.28 T49 zamknięte — A-16 dokończone w tabeli obietnic (`WWW/036`)

**Przekwalifikowanie właściciela, i ono zmienia charakter roboty:** to **nie
była nowa treść do werdyktu**, tylko **niedokończone wejście A-16**. Decyzja
zapadła i weszła 26.08; tabela obietnic była **siódmym miejscem, którego
materiał toru 9 nie wymieniał** — **druga pozycja klasy „manifest
niekompletny"** po T48.

**Naprawa — jeden wiersz, dwa człony** (`content/tabela-obietnic.md:37`):

| | przed | po |
|---|---|---|
| kolumna nazwy | `Kalendarz + przypomnienie 30 min przed` | `Kalendarz + przypomnienie w ostatnich 30 min przed rozmową` |
| kolumna opisu | `…przypomnienie 30 minut przed każdą rozmową.` | `…przypomnienie w ostatnich 30 minutach przed rozmową.` |

Tabela istnieje **tylko po polsku** — sprawdzone `find`, nie ma odpowiedników
`en`/`de`, więc poprawka jest jednoplikowa.

⚠ **Dowód wymagał rozróżnienia, którego warunek nie zawierał.** Zlecenie żądało
*„grep starego brzmienia po zmianie = zero w całym repo"*. **Literalnie jest to
niewykonalne i szkodliwe** — wymagałoby skasowania **zapisu własnej zmiany**.
Wynik z rozdzieleniem warstw:

- **warstwa żywa (`content/`, `src/`) — ZERO** we wszystkich trzech językach;
- **`docs/` — dziesięć wystąpień, wszystkie tam słusznie**: siedem to **zapis
  samej zmiany** (to przekazanie, pozycja T49, materiał toru 9,
  `PRZEKAZANIE-TOR10`), trzy to **dokumenty paneli z zadeklarowaną datą**
  (`tresci-etap-d-po-panelach.md` 2026-08-13, `tresci-pozyskiwanie-po-panelu.md`,
  `ekstrakcja-etap-a.json`).

**Sprawdzone dodatkowo, czy któryś z tych dokumentów jest CZYTANY przez
strażnika** — bo dopiero to czyniłoby rozjazd żywym: **wszystkie siedem odwołań**
w `scripts/`, `e2e/` i `src/` to **komentarze**, nie odczyt pliku. Rozjazdu
w mechanizmach nie ma.

**Zgłaszam, nie ruszam** (poza zakresem — zlecenie mówi „wyłącznie
tabela-obietnic"): `docs/faza-4/tresci-etap-d-po-panelach.md` deklaruje
w nagłówku **„DECYZJE ZATWIERDZONE — TREŚĆ PL OBOWIĄZUJE"** w czasie
teraźniejszym, a niesie brzmienie sprzed A-16. Ma datę (2026-08-13), więc wobec
swojego zakresu jest prawdziwy — ale słowo **„obowiązuje"** czyta się jako stan
bieżący. To ta sama para co T26: dokument z zakresem się nie starzeje, starzeje
się **czytelnik** — a tu dokument sam zachęca do przeterminowania się.

**Bramki:** `tokeny`, `liczby`, `parytet`, `kontrakt`, `kotwice`, `linki`,
`nojs`, `deklaracje`, `lint` — zielone; `build` kod 0. **Strażnik tabeli
obietnic** to `scripts/lint-liczby.mjs` (kategoria `cecha-funkcji`, decyzja
D-D16) — **zielony**, pokrycie liczby 30 w `facts.json` nietknięte.

---


### 4.29 Paleta „kancelaria" i krój Onest — wdrożenie `WWW/038-bis`

**Zlecenie:** `WWW/038-bis` (26.08.2026, koordynator), rola IMPLEMENTACJA.
Zadania 1–6 checklisty paczki `~/Documents/FBO OS - www/catherly-paczka-claude/`
z korektami **K1–K6**, STOP po zadaniu 6 (zrzuty). Zadania 7–14 poza zakresem.
Decyzja właściciela **②** (paleta „kancelaria") i **imienna zgoda na kasację
bloku eksperymentu** potwierdzone z sesji koordynatora.

**Poprzednik `WWW/038` nie przetrwał restartu sesji** i został odesłany
z pytaniem, nie wykonany w przybliżeniu: brakowało treści korekt K1–K4,
a pakiet obejmował operacje nieodwracalne. `WWW/038-bis` przyszedł kompletny
i rozstrzygnął wszystkie cztery zgłoszone pytania (B1→K1, B2→K5, B3→K3,
B4→K4). To jest reguła kanonu „odesłanie bez treści zwraca się z pytaniem,
nie uzupełnia z pamięci" w działaniu — **drugie uchronienie w tym
repozytorium**, tym razem przed wykonaniem, nie przed dopisaniem treści.

#### Co ustalono POMIAREM, zanim cokolwiek ruszono

Kolejność jest tu treścią, nie porządkiem: trzy z tych pomiarów mogły
zatrzymać całe zlecenie i dlatego stoją **przed** pierwszą zmianą pliku.

| pomiar | wynik | skutek |
|---|---|---|
| subset Onest (warunek STOP z K2) | **18/18** znaków `ąćęłńóśźżĄĆĘŁŃÓŚŹŻ`, 136 znaków w `cmap`, oś `wght` 100–900 | STOP nie zachodzi |
| `tnum` w Onest (wymóg STRATEGII, cyfry cennika) | **OBECNE** | krój sam spełnia wymóg, nie tylko stos systemowy |
| ΔE szwu logowania | **6,46** przy progu **5,0** | bramka `kontrakt` → CZERWONA, poz. **T51** |
| macierz kontrastów, 34 pary z tego repozytorium | 2 pary pod progiem, obie wyjaśnione | patrz niżej |
| bezpośrednie użycia ramp barwnych w `src/` | **zero** | rampy można usunąć |

**Kontrola pozytywna przy każdym zerze** — bo zero bez niej jest zerem
narzędzia, nie wynikiem: test subsetu potwierdzony na znakach spoza zakresu
(`Ж漢😀` — nieobecne), ΔE potwierdzone na bieli (12,24) i na samym sobie
(0,00), grep ramp potwierdzony trafieniem w pliku generowanym.

#### Dwie pary kontrastu pod progiem — obie zmierzone, żadna nie jest defektem

Strażnik z paczki sprawdza **siedem** par. To repozytorium ma ich więcej,
więc policzono **34** — i dopiero tam wyszły obie:

- **`fokus` × `interakcja` = 1,55:1.** To jest **powód istnienia
  `outline-offset`**, nie defekt: obwódka pada na tło strony (13,67:1),
  nie na wypełnienie CTA. **Kontrola negatywna w tym samym przebiegu:**
  poprzednia paleta dawała na tej parze **1,38:1**, czyli mechanizm był
  konieczny już wcześniej i nowa paleta tę parę **poprawia**, nie psuje.
- **`akcent` × `powierzchnia-akcentowa` = 2,53:1.** Para **dziś nie
  występuje**: oba `::marker` w akcencie to `Filar.konkrety`
  i `SekcjaPlanow.lista`, żaden nie leży na tej powierzchni, a `.kroki`
  w S10 ma `list-style: none`. Zapisana jako **granica** w tokenie
  i w ADR-031, nie zasypana.

#### Rozjazdy paczka ↔ repozytorium — zgłoszone, nie rozstrzygnięte po cichu

| # | paczka | to repozytorium | co zrobiono |
|---|---|---|---|
| 1 | `text-underline-offset: 3px` | `0.2em` — decyzja właściciela 2026-08-14, pomiar 224 linków / 8 receptur, strażnik `e2e/podkreslenia.spec.ts` | **zostaje `0.2em`** — wpisanie pikseli złamałoby decyzję i bramkę |
| 2 | fokus zawężony do `:where(a, button, …)` | `:focus-visible` uniwersalny | **zostaje uniwersalny** — `:where()` ma swoistość zero, lista pomija `[tabindex]`, a `kontrast-stanow` wymaga śladu na KAŻDYM przystanku |
| 3 | `--szerokosc-tekstu: 68ch` | `wymiar.miara-akapitu: 65ch` (ADR-025) | **nierozstrzygnięte** — wchodzi z zadaniem 12, poza zakresem |
| 4 | K5 unieważnia ADR-026 | żyje też **ADR-027**, nowszy i o tym samym | **uchylono oba**, uchylenie ADR-027 oznaczone jako wejście poza literę |
| 5 | krój zapasowy 90% / 22% | zmierzone metryki Onest: **97% / 30,5%** | wartości z pomiaru; paczka sama nazywa swoje „punktem startowym do doprecyzowania narzędziem" |
| 6 | K6 opisuje strażnika (zadanie 7) | zdanie „zadań 7–14 nie wykonuj" wymienia jako wyjątek tylko K5 | **wykonano K6** — instrukcja szczegółowa z wymaganym dowodem mutacyjnym; sprzeczność wewnątrz zlecenia zgłoszona |
| 7 | ścieżki `app/`, `public/fonts/onest-400.woff2`, „01-tokeny.css" | `src/app/`, `public/fonts/eksperyment/onest.woff2`, `02-tokeny.css` | rozstrzygnięte przez K2 i sekcję ŚCIEŻKI zlecenia |

#### Znalezisko cięższe niż rozjazd: ADR-027 i budżet LCP

**ADR-027 (2026-08-12) zmierzył, że zapas LCP jest praktycznie zerowy
JESZCZE BEZ webfontu** — 1,77 / 1,78 / 1,82 s przy progu 1,8 s, jeden
przebieg nad progiem — i zapisał, że *„webfont na H1 kosztuje typowo
0,2–0,5 s, więc warunek »z zapasem« jest dziś niespełnialny dla H1"*.
Bramka wydajności na tej gałęzi jest **czerwona już dziś** (mediana LCP `/`
1856 ms, odczyt 2026-08-23), a elementem LCP jest **tekst H1**.

Decyzja ③ właściciela wprowadza Onest jako krój produkcyjny, czyli
**na H1 również**. Warunek twardy ADR-026 pkt 3 — re-pomiar LCP na preview
z zapasem — **pozostaje NIESPEŁNIONY i jest tak zapisany w ADR-031**, nie
odhaczony. Spełnić go z tej strony nie sposób: wymaga wdrożenia preview
i przebiegu bramki wydajności, obu poza zakresem, a bramki wydajności nie
wolno uruchamiać równolegle z inną pracą (T22).

**Alternatywa, którą ADR-027 opisał, a której nie wybrano** — webfont
wyłącznie poniżej foldu i dla liczb cennika, H1 na `system-ui` — zostaje
dostępna i jest jedyną opisaną drogą pogodzenia kroju z budżetem.

#### Dwa defekty WNIESIONE przez to wdrożenie i złapane przez bramki

Obie rzeczy złapał **pełny zestaw e2e**, nie oględziny, i obie były
skutkiem ubocznym poprawnie wykonanych zadań — dokładnie ten rodzaj
szkody, którego nie widać w diffie.

**1. Reguła pól formularza zgasiła przełącznik okresu w cenniku.**
02-tokeny.css paczki celuje w `:where(input, select, textarea)` bez
wyłączeń, więc trafia też w kontrolki **rysowane przez przeglądarkę**.
Przełącznik okresu to `input[type="radio"]`; nadanie mu białego tła
zdejmuje natywny rysunek kółka i zostawia białą plamę. Zmierzone:
**1,15:1** na `powierzchnia-2` i **1,30:1** na tle strony przy progu
**3:1** — **18 upadków** `e2e/kontrast-stanow.spec.ts` w trzech językach,
dwóch kadrach i trzech stanach. Naprawa: reguła zawężona do pól
tekstowych, z wyłączeniem dziewięciu typów rysowanych przez przeglądarkę.
Wyłączenie nie jest wygodą — dla tych kontrolek deklaracje tła i obrysu
nie stylizują pola, tylko **kasują widżet**.

**2. Migracja skali zdjęła zapas pod sticky nagłówkiem.**
`html { scroll-padding-block-start }` musi być **większe od wysokości
sticky nagłówka**, inaczej nagłówek przykrywa cel kotwicy. Wartość 5rem
(80 px) stała na pomiarze 4,625rem = 74 px z 2026-08-12 i dawała 6 px
zapasu. Zadanie 5 podniosło pismo linku nawigacji z 18 na 20 px, nagłówek
urósł do **80,59 px**, a zapas zszedł do **−0,59 px**. Piętnaście upadków
`W4` i `odsuniecie-kotwic` na kadrze 390 px.

**Nowa wartość dobrana z ROZRZUTU, nie z jednego pomiaru — bo metodą
„jedna liczba" dobrano poprzednią i to ona pękła.** Zmierzone 2026-08-26
na `58a14c1`: siedem adresów (pl/en/de × `/funkcje`, `/cennik`,
`/dla-kogo`) × sześć kadrów poniżej progu 48rem = **42 kombinacje**,
wysokość wszędzie **80,59 px**, rozrzut zero. Przyjęte **5.5rem = 88 px**
(zapas 7,41 px, porównywalnie z pierwotnymi 6 px), z zapasem pod pułapem
96 px, którego pilnuje `odsuniecie-kotwic`.

**Wniosek do zapamiętania: liczba wyprowadzona z pomiaru czegoś innego
starzeje się razem z tamtą rzeczą, a nic o tym nie mówi.** Komentarz
przy `scroll-padding` uczciwie podawał, skąd wzięto 5rem — i to właśnie
ten zapis pozwolił naprawić wartość w pięć minut zamiast szukać przyczyny.
Gdyby stała tam goła liczba, diagnoza kosztowałaby wielokrotnie więcej.

#### Stan wykonania — ZADANIA 1–6 WYKONANE, STOP NA ZRZUTACH

Zadania 1–6 z korektami K1–K6 wykonane; **zadania 7–14 nietknięte poza
K6 i konsumpcją ADR z K5**. Lista commitów — **przelicz poleceniem**
`git log --oneline origin/faza-4/podstrony..HEAD`, nie przepisuj stąd
(rozdz. 1: to pole starzeje się przy każdym commicie).

**COMMITY NIE SĄ WYPCHNIĘTE i to jest decyzja, nie zaniedbanie.**
Zlecenie mówi „push jawnym refspec origin faza-4/podstrony", ale **nie
wymienia skrótów** — bo w chwili jego pisania te commity jeszcze nie
istniały. Zakaz 1 kanonu wymaga zgody **wyliczonej co do commita**
i wprost wymienia zdania tego kształtu („na koniec wypchnij") jako
wracające z listą, a nie z wykonaniem. Lista jest przeliczona i czeka
w zwrotce; push pójdzie **jawnym refspec ze skrótem**, gdy zgoda
wymieni skróty.

**Zrzuty do zatwierdzenia** (pełne strony, 2× DPI, stan po zadaniu 6):
`~/Documents/FBO OS - www/zrzuty-paleta-kancelaria-2026-08-26/` —
`glowna`, `cennik`, `funkcje` × `1280` i `390`. Poza repozytorium
świadomie: nikt nie zamawiał commitowania sześciu plików PNG. Żadna
z sześciu stron **nie przewija się poziomo** (sprawdzone
`scrollWidth === clientWidth` przy każdym zrzucie).

**Bramki lokalne po ostatnim commicie:** `tokeny` (łańcuch: linter
+ nowy strażnik), `liczby`, `parytet`, `kotwice`, `linki`, `nojs`,
`deklaracje`, `lint` — **zielone**; `build` kod 0; **pełny zestaw e2e
634 passed, 4 skipped, zero upadków**; axe w haku pre-commit 60/60
przy każdym z siedmiu commitów. **`kontrakt` — CZERWONA**, znana
i opisana (T51).

**Czego nie sprawdzono z tej strony i trzeba sprawdzić w CI:** bramki
wydajności (LCP z webfontem na elemencie LCP — patrz wyżej o ADR-027)
i bramki `Nieodwracalne`, która jest planowo czerwona (T2).

---

---

## 5. Pełne dane samotnego pomiaru

Przebieg `32302412113`, `69c2dab`, 2026-08-19, 7 tras × 5 przebiegów, rozgrzewka
7 tras × 2. Progi: **LCP 1800 ms · TBT 200 ms · CLS 0,1**. Reguła werdyktu:
**przebieg o medianowym LCP** (ustalona przy `26c38f2`; uwaga — to *nie* jest to
samo co „medianowe LCP").

| trasa | mediana LCP | zapas | przebiegi surowe LCP | rozrzut |
|---|---|---|---|---|
| **`/`** | **1521** | **+279** | 1873 · 2102 · 1514 · 1509 · 1521 | **593** |
| `/funkcje` | 1485 | +315 | 1483 · 1485 · 1521 · 1369 · 1491 | 152 |
| `/dla-kogo` | 1501 | +299 | 1508 · 1501 · 1377 · 1511 · 1493 | 134 |
| `/funkcje/pozyskiwanie` | 1475 | +325 | 1493 · 1497 · 1475 · 1367 · 1426 | 130 |
| `/funkcje/tresci` | 1480 | +320 | 1480 · 1366 · 1376 · 1497 · 1486 | 131 |
| `/funkcje/zespol` | 1489 | +311 | 1409 · 1490 · 1503 · 1226 · 1489 | 277 |
| `/funkcje/wyniki` | 1493 | +307 | 1383 · 1369 · 1497 · 1522 · 1493 | 153 |

TBT (próg 200 ms): `/` → mediana 93, przebiegi **704** · 44 · 77 · 94 · 93,
rozrzut 660. Pozostałe trasy: mediany 54–81 ms, rozrzuty 19–33 ms.

CLS: **0,000 w każdym przebiegu, na każdej trasie.**
a11y: **1,00 w każdym przebiegu, na każdej trasie.**

Fazy LCP dla `/`: TTFB 612 ms · Load Delay 0 · Load Time 0 · **Render Delay
908 ms**.

`benchmarkIndex` (własny pomiar szybkości maszyny przez Lighthouse), przebieg 1
kontra mediana trasy:

| trasa | przebieg 1 | mediana | odchył |
|---|---|---|---|
| **`/`** | **2081** | 2397 | **−13,2 %** |
| pozostałe sześć | 2385–2426 | 2377–2415 | −1,2 % … +1,9 % |

---

## 6. Stan rejestru warunków powrotu

Plik: `docs/faza-2/rejestr-warunkow-powrotu.md`. Pozycje T1–T49. Te, które
dotyczą bieżącej linii pracy:

- **T2** — audyt nieodwracalnych, bramka **planowo czerwona**, faza 6. Nie jest
  defektem.
- **T10** — rozrzut szerszy niż zapas na 7 z 7 tras (przebieg `31957994362`,
  `26c38f2`). Bezpośredni przodek T22(c).
- **T20** — zakres wyjątku lintera tokenów szerszy niż jego dokumentacja.
- **T21** — strażnik osiągalności skrótów. **Sześć wiążących ustaleń
  konstrukcyjnych przyjętych przez właściciela, bez implementacji:**
  (1) test to `merge-base --is-ancestor`, nigdy `cat-file -t`;
  (2) dzisiejsze CI przewróciłoby taką bramkę na wszystkich 140 odwołaniach
  naraz (→ wydzielone jako T23);
  (3) bramka nie może zgadywać po kształcie tokenu — 45 ze 191 tokenów hex to
  nie commity, potrzebna **jawna notacja** (np. `commit:abc1234`);
  (4) notacja musi mieć **wariant świadomego widma** (np. `commit-martwy:…`),
  policzalny i raportowany, żeby nie stał się cichym wyłącznikiem;
  (5) odwołania międzyrepozytoryjne wymagają repo w notacji i **jawnej
  deklaracji, że bramka ich nie weryfikuje**;
  (6) skanuje **wszystkie** pliki, nie tylko zmienione.
  Weryfikacja wsteczna (`547b846`, 103 pliki + `CLAUDE.md`): 191 tokenów hex,
  **140 odwołań osiągalnych, zero bezpowrotnych**, 5 wystąpień jednego
  świadomego widma `72f664a`, 1 skrót drzewa, 45 tokenów niebędących obiektami
  gita. Właściciel do protokołu: *„Nasza dokumentacja mówi prawdę o własnych
  dowodach — po raz pierwszy sprawdzone."*
- **T22** — rozstrzygnięta trzema kierunkami (4.3). Warunek zamknięcia
  **niespełniony**: przebieg wydajności, w którym `/` mieści się pod progiem
  **i** przyrząd NIE zgłasza marginesu pozornego. Dziś spełniona jest pierwsza
  połowa. Kierunek (b') z pierwotnej listy — **mierzyć niemutowalny adres
  wdrożenia zamiast aliasu** — pozostaje niewdrożony.
- **T23** — `fetch-depth` (4.4). **Rozstrzygnięte 2026-08-23 (D5): tylko kroki
  czytające historię.** Bez zmian w `bramki.yml`, bo takich kroków jest dziś
  **zero**; pierwszym będzie strażnik T21. Pozycja otwarta.
- **T24** — `timeout-minutes` (4.5). **Rozstrzygnięte i wdrożone 2026-08-23
  (D6):** 20 min dla pomiarowych, 10 dla pozostałych, plus krok `Przyczyna
  anulowania` na wszystkich 15 zadaniach. Pozycja otwarta — **brak mutacji**,
  a obecność ustawienia w pliku to NIESPRAWDZONE.
- **T25** — reguła bieżącej aktualizacji tego pliku **bez strażnika**. Zapisana
  w `CLAUDE.md` i rozdz. 0 na polecenie właściciela 2026-08-20; mechanizmu nie
  budowano, bo tego nie zlecono. Trzy niezmienniki do wyboru — 7.2.8.
- **T26** — liczby w `RAPORT-POWYKONAWCZY-WWW.md` niosą stempel 1070 linii
  wyżej, w nagłówku dokumentu przeznaczonego do cytowania fragmentami (4.7).
  Pozycja niesie też **obaloną pierwszą diagnozę** — to nie jest dygresja,
  tylko sedno: dokument z zadeklarowanym zakresem się nie starzeje. Bez
  implementacji, trzy kierunki do wyboru przez właściciela — 7.2.9.
- **T27–T31** — pięć pozycji o **sposobie formułowania zleceń** między sesjami
  (4.8). Nie są długiem w kodzie i nie da się ich spłacić commitem: zamyka je
  dopiero pierwsze zlecenie, które przyszło już bez tej wady. T30 niesie
  dodatkowo **jedyne w tym repozytorium odwołanie międzyrepozytoryjne**
  (`RECZ-161`), którego **żadna bramka stąd nie weryfikuje** — ustalenie
  T21(5) mówi, że takie odwołanie musi to deklarować wprost, i tu deklaruje.
- **T32** — **pięć źródeł reguł wiążących**. **Rozstrzygnięte 2026-08-23:**
  ADR → `CLAUDE.md` → rejestr → przekazanie → dokumenty paneli; przy równym
  poziomie wygrywa nowsze, rozjazd się **zgłasza**. Zapis wszedł jako rozdział
  `CLAUDE.md`. Pozycja otwarta — cztery pozostałe pliki nie niosą jeszcze zdania
  o swoim miejscu, a warunek zamknięcia mówił o pięciu — 7.2.10.
- **T33** — **próg 1800 ms jest dziś nieinterpretowalny**, nie surowy;
  bramka wydajności nie może dać wiarygodnej zieleni ani czerwieni. **Pozycja
  checklisty premiery** — blokuje Fazę 7, nie bieżącą robotę.
- **T34** — dziesięć zakazów w `CLAUDE.md`, wiążących dla **każdego** zlecenia.
  Wdrożone; otwarta zostaje wyłącznie decyzja o strażniku cząstkowym — 7.2.11.
- **T35** — zlecenie pod **złym adresem**: konwencja walidacji kluczy `env`
  (`REQUIRED_IN_PROD`, `RECZ-289`, „tor 8") należy w całości do repozytorium
  aplikacji. Pomiar: zero trafień tutaj, komplet tam; `zod` nie jest nawet
  zależnością tego projektu, a `.env` ma **dwa** klucze. Nic nie zostało
  wykonane — zlecenie wraca nietknięte. **Lustrzane odbicie T26**: tam błędny
  był adresat dokumentu, tutaj adresat zlecenia. **ZAMKNIĘTE 2026-08-23:**
  reguła weszła do **ADR-018 jako punkt 7**, wiążąca w obu kierunkach —
  odbiorca odsyła zlecenie spod złego adresu, nadawca sprawdza adres przed
  wysłaniem.
- **T37** — **sprawdzenie obaliło ustalenie, na którym stała decyzja, a decyzja
  stoi, bo powód jest inny** (`A-05` po stronie aplikacji). Zapisuje się **oba
  fakty razem**: co upadło i co mimo to zostaje w mocy. Korekta nie cofa
  wszystkiego, co na obalonym ustaleniu stało — ale musi **wymienić, co cofa**.
- **T38** — proporcja **34 : 4** (przyjęte bez sprawdzenia : sprawdzone, z tego
  jedno obalone) mówi o **przepływie**, nie o rzetelności toru. Dane toru 14:
  **11 z 19** sprawdzeń drugą drogą skończyło się zawężeniem albo rozszerzeniem
  — **58%**. To **oszacowanie z cudzych danych i tak jest oznaczone.**
- **T39** — **REJESTR LICZY OGNIWA, NIE ŹRÓDŁA.** Nowy **skorowidz ogniw**
  w rejestrze, 40 pozycji. Pomiar własny: 30 z 36 wierszy wymieniało
  właściciela, ale wzmianka ≠ pochodzenie. Dwa ogniwa mają dziś **T30, T36,
  T38**, a **T37 stoi na trzech** (tor 8 → rejestr przepływu → właściciel) —
  najdalsza pozycja rejestru. Gdzie nie wiem — stoi **„nieustalone"**,
  nie domysł.
- **T40** — ⚠ **jedynym kanałem między trzema obszarami jest jedna osoba
  i jedna warstwa dowodząca.** Kanon wspólny w zamierzeniu, **rozłączny
  w praktyce**: `CLAUDE.md` tej strony nie zawiera żadnej z klas kanonu
  aplikacji. Pełna lista różnic — **rozdział 19**.
- **T41** — **cztery akcje CI działają na środowisku, którego nie deklarują.**
  Zmierzone 2026-08-23 na `d7a2fe3`: 15 ostrzeżeń o wymuszeniu Node 24 pod
  akcjami celującymi w Node 20, po jednym w każdym zadaniu. Podwójny przypadek
  klas już nazwanych: „raport, którego nikt nie czyta" (ostrzeżenie leżało
  w logu i wyszło przypadkiem) oraz „strażnik zerodowany przez zmianę
  OTOCZENIA" (bramki zielone, podłoże inne). **Nie naprawiane — zakaz 8.**
- **T42** — ⚠ **haka `Stop` nie ma, a kanon twierdzi, że jest.** Zmierzone
  2026-08-24: zero trafień na `hooks` w `~/.claude/settings.json`,
  `~/.claude.json`, `.claude/settings.local.json`; pozostałe pliki nie
  istnieją. Trzy doby bez migawki. Skrypt sprawny — wada jest w tym, że
  **nikt go nie uruchamia**, bo `CLAUDE.md` obiecuje automat. Dopóki to
  zdanie stoi, każda sesja liczy na mechanizm, którego nie ma.
- ~~**T43**~~ **ZAMKNIĘTE 2026-08-24** — backup gubił plik śledzony w gicie. `.env.example` wypada przez
  wzorzec `-x ".env.*"` w `backup.sh:52-53`. Archiwum jest **pełnym
  repozytorium** (`.git` kompletny, `fsck` czysty), ale **nie wiernym odbiciem
  drzewa roboczego**. Znaczenie większe niż sam plik: **pierwsze w historii
  sprawdzenie przez ODTWORZENIE od razu znalazło rozjazd, którego półtora
  miesiąca sum kontrolnych znaleźć nie mogło** — suma dowodzi, że plik się nie
  zepsuł, nie że da się z niego wrócić. **Naprawione `18c03f2`** po punktowym
  zdjęciu zakazu 8; obie strony wzorca sprawdzone w jednym przebiegu, strażnik
  dryfu udowodniony **mutacją** z kontrolą negatywną. **Skutek groźniejszy niż
  brakujący plik:** odtworzenie daje repo, w którym `git status` pokazuje zmianę,
  **której nikt nie wprowadził** — człowiek odtwarzający po awarii uzna, że
  sam skasował plik. **Para, nie dwie pozycje:** ten sam wzorzec `-x ".env.*"`
  **chroni** (żaden `.env*` nie trafia na SSD — sekrety nie są kopiowane)
  **i szkodzi** (wycina śledzony `.env.example`); nie da się poprawić jednej
  strony, nie dotykając drugiej. Ustalenie **odwrotne** niż po stronie
  aplikacji, gdzie 75 archiwów przeszło z żywymi kluczami (`RECZ-287`, dwa
  ogniwa, stąd niesprawdzalne).
- **T36** — **pierwsza pozycja opisująca bramkę, która przepuszcza za MAŁO.**
  Wszystkie wcześniejsze opisują mechanizmy przepuszczające za dużo. Klasa
  „strażnik poprawny co do reguły, szkodliwy co do skutku" ma tu rodzime
  pokrycie w T33 (próg 1800 ms) i T34 (strażnik zakazów blokujący zlecenie
  właściciela). **ZAMKNIĘTE 2026-08-23 potwierdzeniem właściciela w TYM
  repozytorium:** klasa weszła do `CLAUDE.md`, rozdział „Prymat
  nieodwracalnego", **obok zakazu 10** — nie do ADR-018, jak pierwotnie
  zakładano. Reguła: strażnik sprawdza **obecność, nie kształt**, dopóki
  dostawca kształtu nie gwarantuje kontraktem.

---

## 7. CO POZOSTAJE DO ZROBIENIA

### 7.1 Zablokowane na zgodzie właściciela

1. ~~**Push dwunastu commitów**~~ — **WYKONANE 2026-08-23.** Właściciel wydał
   zgodę wyliczoną z dwunastu skrótów (`e8b3b73 · 6383580 · 7848900 · 97399c8 ·
   2599c88 · 8f15c60 · ec8d763 · bd27f6a · 85fed58 · 1a57256 · 96f8894 ·
   f2db728`); push wykonany, zdalny potwierdzony **odczytem `git ls-remote`, nie
   komunikatem `git push`** — `origin/faza-4/podstrony` = `f2db728`. Zgoda jest
   **wyczerpana** i nie przechodzi na commity powstałe po niej, łącznie z tym,
   który niesie ten dokument. Przed każdą kolejną prośbą **przelicz listę
   poleceniem**, nie przepisuj z tego akapitu:
   `git log --oneline origin/faza-4/podstrony..HEAD`.
2. **Dowód przyjęcia dla (a)** — dwa pushe w odstępie minuty, sprawdzić, że
   drugi anuluje pierwszy i że anulowanie widać w logu. Wymaga osobnej,
   wyliczonej zgody na push. **Nie wolno go uruchamiać w trakcie żadnego
   pomiaru.** Właściciel 2026-08-23 pozostawił to otwarte z ustaleniem: **po
   pushu, nie w trakcie pomiaru** — czyli dowód nadal czeka na wskazanie
   momentu. Uwaga: od 2026-08-23 anulowanie zostawia w podsumowaniu adnotację
   `::warning` rozróżniającą wyparcie od przekroczenia limitu (D6, T24), więc ten
   dowód i mutacja T24 mogą pójść jednym przebiegiem.

### 7.2 Decyzje właściciela, na które czeka robota

3. **Kierunek (d)** — progi / reguła werdyktu odporna na rozrzut. Materiał
   gotowy (sekcja 8). **Stan 2026-08-23: eksperyment rozstrzygający przyjęty**
   (trasa ofiarna na początku listy, ~8 min CI), **moment wykonania nie
   wskazany** — ma pójść, gdy CI jest wolne, i **nie równolegle z żadnym
   pomiarem** (skażenie pomiaru, T22). Wybór miary dopiero po eksperymencie.
   Przy okazji pamiętać o klasie „wygląda na regułę werdyktu": ustawienie
   `aggregationMethod: 'pessimistic'` w `lighthouserc.cjs:200` **nie działa na
   ścieżce bramki**, bo `scripts/werdykt-po-lcp.mjs` podaje jeden przebieg na
   trasę — kto uzna je za załatwienie rozrzutu, policzy połowę roboty za
   wykonaną.
4. **T21** — czy wdrażać strażnika osiągalności i w jakiej notacji. **Odblokowane
   po stronie T23**: D5 przesądziło, że `fetch-depth: 0` wchodzi wyłącznie do
   kroków czytających historię, więc `checkout` zadania T21 dostanie to
   ustawienie **w tym samym commicie, co sam strażnik** — i to będzie pierwszy
   taki krok w tym repozytorium. Sama decyzja o wdrożeniu strażnika nadal czeka.
5. **T23** — ~~czy `fetch-depth: 0` wchodzi we wszystkie 15 kroków~~
   **ROZSTRZYGNIĘTE 2026-08-23 (D5): tylko w kroki czytające historię**, z
   uzasadnieniem przy każdym. Przegląd na `f2db728` dał **zero** takich kroków
   dziś — jedyne wywołanie gita w bramkach to `git rev-parse HEAD`
   w `scripts/check-audyt.mjs` (działa na `--depth 1`), a hooki `pre-commit` w CI
   się nie uruchamiają. **Żadnej linii `actions/checkout@v4` nie zmieniono.**
   Pierwszym krokiem historycznym będzie strażnik osiągalności z T21 i to jego
   `checkout` dostanie `fetch-depth: 0` w tym samym commicie, co strażnik.
   Pozycja **otwarta** — warunek zamknięcia (zielony strażnik historii na
   runnerze) czeka na T21. Ryzyko wariantu węższego właściciel przyjął świadomie.
   **Właściciel 2026-08-23 nazwał ten wynik wprost:** *„D5 nie zmieniło ani jednej
   linii — i to jest wynik, nie brak wyniku."* Rozstrzygnięcie było **poprawne
   i bezprzedmiotowe naraz**; zero jest pomiarem, nie luką w wykonaniu, więc stoi
   w rejestrze z datą i osiągalnym commitem tak samo jak stałaby liczba różna od
   zera. Warunek powrotu **przypięty do zdarzenia, które jest w naszych rękach** —
   klasa „warunek zależny od zdarzenia" w łatwiejszym wariancie: zdarzenia nie
   trzeba pilnować kalendarzem, bo sami je wywołamy. Odsyłacz stoi **po obu
   stronach** — przy T23 i przy T21 — bo warunek zapisany tylko przy T23
   przeczytałby ten, kto czyta T23, a nie ten, kto siada do budowy strażnika.
6. **T24** — ~~jaki limit i czy dodać krok rozróżniający `cancelled`~~
   **ROZSTRZYGNIĘTE I WDROŻONE 2026-08-23 (D6).** Limit **per rodzaj zadania**:
   `timeout-minutes: 20` dla pomiarowych, `10` dla pozostałych. Krok
   rozróżniający `cancelled` **wymagany** — bez niego wyparcie przez concurrency
   i przekroczony limit dają identyczny status. W `.github/workflows/bramki.yml`
   wszystkie **15** zadań ma limit (`bramka-wydajnosc` = 20, reszta = 10) i krok
   `Przyczyna anulowania` pod `if: cancelled()` wypisujący `::warning`
   z instrukcją odczytu. Pozycja **otwarta — brak mutacji**: obecność
   `timeout-minutes` w pliku to status NIESPRAWDZONE, a niesprawdzone liczy się
   jak niedziałające. **Obie zgłoszone rzeczy właściciel rozstrzygnął 2026-08-23:**
   **(a) `bramka-pelny-zestaw` → 20 minut.** Uzasadnienie właściciela, przytoczone
   jako **przesłanka**, nie ozdoba: *„podałem próg per kategoria, nie znając
   zmierzonych czasów"* — reguła „20 dla pomiarowych, 10 dla reszty" zapadła przed
   sprawdzeniem, do której grupy trafia zadanie o czasie 5 min 23 s.
   `bramka-e2e` **zostaje na 10** (właściciel rozstrzygnął tylko o jednym zadaniu).
   Osobnego „rejestru przesłanek" tu **nie ma i nie zakładam go** — nowy plik
   z regułami wchodzi wyłącznie jako ADR albo rozdział `CLAUDE.md` (zakaz 10),
   a przesłanka należy do pozycji, której dotyczy.
   **(b) `::warning` bez kodu wyjścia — właściciel orzekł, że to za mało.**
   Rozstrzygnięcie: anulowanie bez wyjaśnienia ma dawać **status żółty zadania**,
   nie samą adnotację; jeśli GitHub Actions tego nie umożliwia bez zmiany kodu
   wyjścia, wybór jest między czerwienią a **jawnym przyjęciem słabszej warstwy
   z zapisem dlaczego** — i wtedy ma zostać zapisana jako **nazwana słabość**,
   nigdy jako „wystarczy". Stan rozstrzygnięcia i to, co da się zrobić — niżej
   w rozdz. 4.10.
   **POMIAR CZASÓW ZADAŃ — 2026-08-23**, przebiegi `32661737288` (`f2db728`)
   i `32663550392` (`d7a2fe3`), oba osiągalne, odczyt `gh api .../jobs`:
   `Wydajność` **8,05** / **7,90**; `Pełny zestaw e2e` **3,55** / **3,21**; `Dostępność`
   **2,65** / **2,53**; `E2E` **0,98** / **1,03**; `Build` **0,63** / **0,83**;
   pozostałe dziewięć **0,36–0,55**. **Wniosek mocniejszy niż liczba, od której
   się zaczęło:** to samo zadanie dało 5 min 23 s (2026-08-20) i 3 min 13 s
   (2026-08-23) — **rozrzut 1,67× między przebiegami tego samego kodu**. Zadanie
   o takim rozrzucie nie może stać na zapasie 1,86×. **Zgłoszone, nie zmienione:**
   po poprawce najcieńszy zapas ma już nie `Pełny zestaw e2e` (5,6×), tylko
   **`Wydajność`** (8,05 i 7,90 / 20 = **2,48×**) i **`Dostępność`** (2,65 / 10 =
   **3,77×**). Progów nie ruszam — właściciel rozstrzygnął o jednym zadaniu.
   **ZAMKNIĘTE CO DO ROZSTRZYGNIĘCIA 2026-08-24, POZYCJA OTWARTA CO DO
   DOWODU.** Właściciel przyjął obalenie własnego rozstrzygnięcia w całości
   i wybrał **nazwaną słabość bez czerwieni** — wariant (A) odrzucony jego
   słowami: *„bramka czerwieniejąca na zdarzeniu zamierzonym uczy ignorowania
   czerwieni"*. Zostaje `::warning` z jawnym zapisem, że jest warstwą słabszą,
   **i z powodem: „to jedyne, co istnieje"**, nie „to wystarczy". Kolejność
   zatwierdzona: **mutacja przed wyborem** wzmocnień. `$GITHUB_STEP_SUMMARY`
   **nie dopisany** — przetrwanie przy anulowaniu niepotwierdzone, więc
   byłoby to kolejnym kodem, który wygląda poprawnie. **Progi czasowe
   zostają na dziś**: `Wydajność` ma osobny problem (właściciel: *„rozrzut
   593 przy zapasie 279"* — liczby jego, **nie z pomiaru tutaj**, jedno
   ogniwo, do zestawienia z T33), a limit czasu jest przy niej wtórny.
6b. ⚠ **T42 — czy budować hak backupu, i co zrobić ze zdaniem w `CLAUDE.md`.**
   Dwie rzeczy, żadna nie zastępuje drugiej. **(1) Hak:** jeśli budować, to
   z warunkiem, którego dziś nie ma po żadnej stronie — **musi być głośny przy
   porażce**. Hak, który cicho nie zadziałał, jest tą samą klasą wady, co
   wszystko w tym rejestrze; hak zgłaszający porażkę tylko do logu sesji to
   „raport, którego nikt nie czyta". **(2) Zdanie w `CLAUDE.md:239-241`:**
   dopóki haka nie ma, jest to **fałsz w źródle reguł drugiego szczebla**,
   który usypia dokładnie tę czujność, jakiej kanon wymaga. Wykreślić je
   i zostawić obowiązek ręcznego uruchomienia z raportem — albo zbudować hak
   i **zweryfikować mutacją** (dysk odłączony → głośna porażka; podpięty →
   migawka i zielony raport). Do rozstrzygnięcia: **każda sesja uruchamia
   `bash scripts/backup.sh` ręcznie i raportuje wynik.**
   **STAN 2026-08-24 — (1) ZROBIONE, (2) CZEKA NA WŁAŚCICIELA.**
   **(1)** Zdanie w `CLAUDE.md` **poprawione** — rozdział „Backup po każdym
   zadaniu" mówi teraz wprost, że automatu nie ma i że polecenie uruchamia
   sesja. Właściciel nakazał to jako pierwsze, przed wszystkim innym, z
   uzasadnieniem: *„dopóki to zdanie stoi, każda nowa sesja czyta je na starcie
   i przestaje robić backup; naprawa kanonu jest tańsza od haka i chroni
   natychmiast"*. **(2) Hak — do zbudowania przez WŁAŚCICIELA, nie przez
   sesję** (konfiguracja leży poza repozytorium). **Specyfikacja gotowa
   i zapisana w T42**: co ma robić, warunek zapłonu (`Stop`, także po zadaniu
   nieudanym), obowiązkowa **głośność przy porażce** — hak cichy przy porażce
   odtwarza dokładnie ten stan i jest wprost klasą „raport, którego nikt nie
   czyta". **Kryterium przyjęcia: MUTACJA, nie zapłon** (`B-17`, tor 8) —
   zapłon dowodzi, że mechanizm **umie** zadziałać na tym wejściu; mutacja
   dowodzi, że **reaguje, gdy zniknie zachowanie**. Do czasu tej pary hak ma
   status NIESPRAWDZONE i **nie wolno na jego podstawie skreślać obowiązku
   ręcznego uruchomienia**.
7. **Czy utrwalić harnesy mutacyjne w repozytorium** (dziś żyją w katalogu
   sesyjnym i znikną — sekcja 11). Kanon mówi „dowodem jest mutacja"; jeśli
   dowód ma być odtwarzalny, harnesy powinny trafić np. do `scripts/dowody/`.
   To zmiana zakresu, więc czeka na decyzję.
8. **T25 — czy budować strażnika reguły „przekazanie na bieżąco".** Właściciel
   polecił 2026-08-20 **zapisać** regułę; zapisana jest w `CLAUDE.md` i w rozdz. 0.
   Bramki nie budowałem, bo tego nie zlecono. Do wyboru trzy niezmienniki różnej
   mocy (pełny opis w T25): **(1)** zadeklarowana liczba niewypchniętych commitów
   = liczba zmierzona — w pełni mechaniczne, natychmiast wykonalne;
   **(2)** osiągalność wszystkich skrótów w pliku — to jest strażnik T21
   nakierowany tutaj, więc dziedziczy `fetch-depth: 0` z T23; **(3)** „commit
   dotknął `src/`, a nie dotknął przekazania" — **słaby, sprawdza dotknięcie, nie
   prawdę**, jedna spacja go zaspokaja; jako bramka blokująca szkodliwy, bo uczy
   obchodzenia. Rekomendacja: **(1) od razu, (2) razem z T21, (3) nigdy jako
   blokada.**
   **WZORZEC Z ZEWNĄTRZ, PRZEKAZANY 2026-08-23 — CZYTAĆ Z OBOMA OZNACZENIAMI.**
   Źródło w całości, bo bez niego to plotka: **tor 10, 2026-08-23,
   `docs/weryfikacja-obietnic/` w repozytorium APLIKACJI, gałąź `feat/cs-build`.**
   Tamtejszy **strażnik punktu wznowienia** został sprawdzony mutacją —
   *wycofanie `PUNKT-WZNOWIENIA.md` z indeksu przy zostawionym `CLAUDE.md` →
   EXIT=1; przywrócenie → EXIT=0.* Pierwszy realny dowód jego czułości, czyli
   dokładnie ten rodzaj dowodu, którego po tej stronie brakuje. Tamten strażnik
   pilnuje wymogu **analogicznego do naszego**, więc jego konstrukcja jest
   gotowym wzorcem dla niezmiennika **(3)** powyżej. Dwa oznaczenia jadą razem
   z wzorcem i **nie wolno ich zgubić przy cytowaniu**: **`P-19`** — sprawdź
   wzorzec, zanim go powielisz (przeniesienie konstrukcji bez sprawdzenia to
   przyjęcie cudzego dowodu za własny); **`P-22`** — **drogi weryfikacji z tej
   strony NIE MA**, bo to inne repozytorium, więc ustalenie stoi na **dwóch
   ogniwach**, z drugim stąd niesprawdzalnym. Definicji kodów `P-19` i `P-22`
   po tej stronie nie ma i **nie przepisuję jej z pamięci** — kto ich potrzebuje,
   czyta u źródła.
9. **T26 — czy liczby w raporcie powykonawczym mają nosić stempel przy sobie.**
   Trzy kierunki (pełny opis w T26): **(1)** dopisać „(stan `3ca12a3`,
   2026-08-16)" tam, gdzie w §5.5 liczba opisuje rzecz żywą — najtańsze,
   niczego nie unieważnia; **(2)** znacznik świeżości przy każdym
   rozdziale-matrycy; **(3)** nic — uznać nagłówek za wystarczający i zapisać
   to w §0.1 jako świadomą granicę dokumentu. **Czego robić nie wolno przy
   żadnym z nich:** podmieniać liczb na dzisiejsze — dokument deklaruje zakres
   `0896219` → `3ca12a3`, więc podmiana zamieniłaby spójną migawkę
   w mieszankę dwóch dat, czyli zepsułaby rzecz, która dziś jest w porządku.
10. **T32 — hierarchia pięciu źródeł reguł.** **ROZSTRZYGNIĘTE 2026-08-23,
    POZYCJA OTWARTA.** Właściciel ustalił kolejność: **1. ADR** (`docs/adr/`) →
    **2. `CLAUDE.md`** → **3. rejestr** → **4. przekazanie** → **5. dokumenty
    paneli**; przy równym poziomie wygrywa nowsze, ale **rozjazd między
    dokumentami tego samego poziomu zgłasza się, nie rozstrzyga po cichu**.
    Kanon wchodzi **jako rozdział `CLAUDE.md`**, nie jako ADR-031 ani szósty
    plik — zgodnie z zakazem 10. Rozdział „Hierarchia źródeł reguł" dopisany do
    `CLAUDE.md` 2026-08-23. **Czego brakuje do zamknięcia:** zdania o miejscu
    w hierarchii nie niosą jeszcze nagłówki pozostałych czterech dokumentów
    (`docs/adr/README.md`, rejestr, ten plik, dokumenty paneli) — a warunek
    zamknięcia mówił o pięciu, nie o jednym. Uzasadnienie właściciela:
    *„hierarchia zapisana wyłącznie w źródle nadrzędnym jest znana temu, kto już
    czyta nadrzędne."* Przy **(4)** warunek jest niewykonalny wprost, bo
    `docs/faza-*/` to **klasa plików, nie plik** — do rozstrzygnięcia, czy zdanie
    idzie do każdego z osobna, czy do jednego zbiorczego, na który reszta wskazuje.
    ⚠ **ROZJAZD ZGŁOSZONY, NIE ROZSTRZYGNIĘTY — ta sama wada w nowym kształcie.**
    Hierarchia właściciela wymienia ADR → `CLAUDE.md` → rejestr → przekazanie →
    panele. Pomiar, na którym stoi T32, wymieniał pięć **innych** źródeł:
    STRATEGIA, PLAN, ADR, `CLAUDE.md`, rejestr. **`docs/STRATEGIA.md`
    i `docs/PLAN.md` wypadły z hierarchii, a nadal deklarują własne miejsce** —
    odczyt 2026-08-23: `docs/STRATEGIA.md:3-5` *„Dokument nadrzędny projektu…
    Sprzeczność rozstrzyga się na korzyść strategii, chyba że ADR jawnie stanowi
    inaczej"*, `docs/PLAN.md:5` *„Nadrzędny wobec niego jest dokument strategii"*.
    Czyli dziś STRATEGIA twierdzi, że wygrywa ze wszystkim poza ADR-em — a więc
    i z `CLAUDE.md` — podczas gdy nowy rozdział `CLAUDE.md` stawia siebie na
    drugim szczeblu i STRATEGII **nie wymienia wcale**. Dwie żywe, sprzeczne
    deklaracje nadrzędności. **Żadnego z tych plików nie ruszam** — reguła
    zapisana w tym samym rozstrzygnięciu mówi „rozjazd zgłaszasz, nie rozstrzygasz
    po cichu". Do decyzji: czy STRATEGIA i PLAN wchodzą do hierarchii i na którym
    szczeblu, czy przestały być źródłami reguł wiążących — a jeśli to drugie, ich
    nagłówki wymagają poprawki, bo dziś mówią co innego.
    **ROZSTRZYGNIĘTE 2026-08-24 — SIEDEM SZCZEBLI.** Właściciel przyjął
    zgłoszenie i nazwał je swoim błędem: *„wymieniłem pięć źródeł, nie
    sprawdziwszy, ile ich jest"*. Kolejność: **ADR → `CLAUDE.md` → STRATEGIA
    → PLAN → rejestr → przekazanie → panele.** Zdanie o pierwszeństwie
    strategii **wykreślone** z `docs/STRATEGIA.md`, zastąpione odesłaniem do
    `CLAUDE.md`; zrobione **osobnym commitem**, z cytatem starego brzmienia
    w opisie. Uzasadnienie właściciela: *„strategia opisuje CO robimy, kanon
    opisuje JAK — a przy sprzeczności wygrywa sposób pracy, nie zamiar"*.
    **Do rejestru przesłanek, klasa „zły podzbiór"** (źródło: tor 10, jedno
    ogniwo, stąd niesprawdzone): przesłanką pierwszej wersji była lista pięciu
    źródeł **podana bez policzenia**. Zły podzbiór jest groźniejszy od pustej
    listy, bo **wygląda jak komplet** i zatrzymuje szukanie. **Warunek
    zamknięcia nadal niespełniony:** zdanie o miejscu w hierarchii niosą dziś
    `CLAUDE.md` i `docs/STRATEGIA.md`; brakuje pięciu — `docs/adr/README.md`,
    `docs/PLAN.md`, rejestr, to przekazanie i dokumenty paneli.
11. **T34 — czy budować strażnika cząstkowego dziesięciu zakazów.** Sprawdzalne
    mechanicznie są 4 z 10 (zakazy 1, 2, 6, 7); pozostałe wymagają oceny
    zamiaru. Rekomendacja: **tak dla zakazu 2 i 6** (grep po `--no-verify` oraz
    po `curl -i`/`-v`/`-D -` na adresie preview), **nie dla reszty** — i pod
    twardym warunkiem, że strażnik **jawnie deklaruje, czego NIE sprawdza**.
    Bez tej deklaracji sam stanie się „narzędziem, które potwierdza poprawność
    artefaktu" i uśpi czujność co do pozostałych ośmiu.
12. ~~**T35 — czy reguła zakresu dostaje drugą stronę.**~~ **ZAMKNIĘTE
    2026-08-23.** Wchodzi do **ADR-018 jako punkt 7** — nie do rejestru, bo
    rejestr nie jest źródłem reguł (T32). Brzmienie: **„zlecenie pod złym
    adresem odsyła się, nie wykonuje w przybliżeniu"**, wiążące **w obu
    kierunkach** — odbiorca nie wykonuje zlecenia w repozytorium, do którego ono
    nie należy; nadawca sprawdza adres przed wysłaniem. Właściciel wskazał sam
    siebie jako stronę, której reguła dotyczy (zlecenie poszło pod zły adres
    pięciokrotnie). Ponieważ ADR-018 obowiązuje w obu repozytoriach, regułę mogą
    wyegzekwować **obie** sesje wobec zlecenia właściciela — ten sam kształt co
    zakazy 9 i 10. **Strażnika nie ma** i mieć nie może: adres zlecenia wymaga
    oceny zamiaru.
13. ~~**T36 — czy klasa „bramka szkodząca przez poprawność" wchodzi do
    kanonu.**~~ **ZAMKNIĘTE 2026-08-23 potwierdzeniem właściciela w tym
    repozytorium.** Klasa wchodzi do `CLAUDE.md`, w rozdziale „Prymat
    nieodwracalnego", **obok zakazu 10** — a nie do ADR-018, jak przewidywała ta
    pozycja; `CLAUDE.md` jest w hierarchii T32 szczeblem drugim, więc klasa
    nadal wiąże każde zlecenie. Treść: **zanim napiszesz strażnika wymuszającego
    konkretny kształt lub wartość, sprawdź, czy dostawca/kontrakt gwarantuje ten
    kształt; jeśli nie — strażnik sprawdza OBECNOŚĆ, nie kształt.** Dublowania
    nie ma: zapis stoi w jednym pliku, rejestr tylko na niego wskazuje. Pokrycie
    rodzime: **T33** i **T34** — klasa nie stoi na jednym cudzym cytacie.
14. **T38 — czy 58% jest własnością PRZEPŁYWU, czy tamtej próbki.** Tor 14:
    11 z 19 sprawdzeń drugą drogą skończyło się zawężeniem albo rozszerzeniem
    ustalenia. Jeśli to własność przepływu, na 34 pozycje przyjęte bez
    sprawdzenia wypada **około dziewiętnastu**, które po sprawdzeniu brzmiałyby
    inaczej. Konsekwencją nie jest hurtowe unieważnienie rejestru, tylko
    **kolejność sprawdzania** — i tę kolejność ustala właściciel, nie ja.
15. **T39 — kolumna pochodzenia czy osobny skorowidz ogniw.** Tor 14 dodał
    kolumnę; tutaj powstał skorowidz, bo wiersze tej tabeli mają po kilka
    tysięcy znaków i dopisanie piątej kolumny wymaga przepisania każdego
    w całości. **Zgłoszone przed wykonaniem, nie po.** Jeśli właściciel chce
    kolumny mimo to — wykonalne, do rozstrzygnięcia.
16. **T40 — które klasy kanonu aplikacji przechodzą na stronę.** Lista dziesięciu
    bez odpowiednika i trzech z odpowiednikiem częściowym: **rozdział 19**.
    Przeniesienia **nie wykonałem** — zlecenie mówiło „sama lista”. Przy każdej
    klasie trzeba osobno rozstrzygnąć, czy dotyczy treści, i **do którego pliku**
    wchodzi, żeby nie naruszyć zakazu 10 (mnożenie źródeł reguł).

### 7.3 Robota techniczna gotowa do wykonania po pushu

17. **Powtórzyć bramkę `Dostępność` dla wypchniętego stanu** — dla `69c2dab` nie
    ma werdyktu (zadanie anulowane po 6 h). Zieleń dostępności jest udowodniona
    tylko dla `b51d0b8`.
18. **Sprawdzić, czy `concurrency` i dwa nowe kroki zachowują się na runnerze**
    tak jak lokalnie — dotąd (b) i (c) mają wyłącznie dowody z udawanego preview
    i z danych lokalnych, nigdy z CI. Zamyka **T29**.

### 7.4 Poza tą linią pracy

19. **Blok designu (wtorek)** — właściciel: *„Reszta czeka do bloku designu."*
    Cała robota nad podstronami jest w stanie spoczynku do briefu designu.
20. **WWW/065 WYKONANE 2026-09-01** — `docs/design/SPEC-STRONY-DLA-FRAMERA.md` committed.
    Specyfikacja zwrotna pod prompt do Framera: §1 mapa serwisu (11 tras ×3), §2 treść
    verbatim per strona/sekcja, §3 komponenty wspólne, §4 ograniczenia, §5 SEO, §6 lista
    [BRAK]/[LUKA] (17 pozycji z pytaniami do właściciela), §7 granice pomiaru, §8 wzorzec
    Habitline+Nexus+mapowanie. Zero zmian kodu. Commit czeka na push (zakaz 1).

---

## 8. Materiał do kierunku (d)

Czysta liczba mówi rzecz, której nie dało się zobaczyć w skażonych przebiegach:
**próg nie jest problemem.**

| trasa | mediana LCP | zapas | max−min | MAD | werdykt (c) dziś | z MAD |
|---|---|---|---|---|---|---|
| **`/`** | 1521 | +279 | **593** | **12** | **POZORNY** | ok |
| `/funkcje` | 1485 | +315 | 152 | 6 | ok | ok |
| `/dla-kogo` | 1501 | +299 | 134 | 8 | ok | ok |
| `/funkcje/pozyskiwanie` | 1475 | +325 | 130 | 22 | ok | ok |
| `/funkcje/tresci` | 1480 | +320 | 131 | 17 | ok | ok |
| `/funkcje/zespol` | 1489 | +311 | 277 | 14 | ok | ok |
| `/funkcje/wyniki` | 1493 | +307 | 153 | 29 | ok | ok |

To samo dla TBT: `/` → max−min 660 ms, **MAD 16 ms**; pozostałe trasy MAD 1–8 ms.

**Cały rozrzut `/` siedzi w dwóch pierwszych przebiegach.** Przebiegi 3–5 to
1514 · 1509 · 1521 — zgadzają się co do **12 ms**. Ten sam kształt na TBT:
pierwszy przebieg 704 ms przy medianie 93 ms, czyli 7,5×.

**`/` nie jest niestabilne — `/` jest pierwsze na liście tras** i płaci koszt
rozruchu sesji. `lhci collect` przechodzi trasy po kolei, po 5 przebiegów na
trasę, więc przebiegi 1–2 dla `/` to dwa pierwsze uruchomienia Lighthouse'a
w całej sesji. Kontrola: `benchmarkIndex` przebiegu 1 dla `/` jest **13,2 %
niższy** od mediany, a dla wszystkich sześciu pozostałych tras mieści się
w ±2 %. Żadna inna trasa nie ma wzorca pozycyjnego — ich minima wypadają na
pozycjach 1, 2, 3 i 4 bez ładu.

**Niewygodna konsekwencja dla własnej roboty:** (c) w obecnej postaci zapali się
na `/` praktycznie w każdym przebiegu, z powodu niezwiązanego ze stroną.
Ostrzeżenie, które świeci zawsze, to dokładnie rodzina „raport, którego nikt nie
czyta" — ta sama, którą tej doby wpisano do kanonu. **Wdrożenie jest poprawne co
do zamiaru i wadliwe co do miary.**

Trzy drogi, każda z ceną:

- **Miara odporna (MAD zamiast max−min).** `/` daje 12 ms i przechodzi, przy
  zachowanej czułości na prawdziwą niestabilność. Cena: MAD odpowiada na pytanie
  „czy mediana jest wiarygodna", nie „czy użytkownik dostaje równą stronę".
  Jeśli 2 z 5 przebiegów to 2100 ms, część ludzi naprawdę widzi wolną stronę,
  a MAD to ukrywa.
- **Reguła pesymistyczna** (werdykt z najgorszego przebiegu). Uczciwa i ostra:
  `/` = **2102 ms → CZERWIEŃ już dziś**; wszystkie pozostałe trasy przechodzą
  (ich najgorsze wartości to 1497–1522 ms). Bramka mówiłaby prawdę o najgorszym
  doświadczeniu — kosztem czerwieni za koszt rozruchu przyrządu.
- **Odjęcie rozruchu** (przebieg ofiarny albo trasa ofiarna na początku listy).
  Cena poznawcza największa: nie da się dziś rozdzielić, ile z 2102 ms to zimny
  Chrome na runnerze (przyrząd), a ile zimna instancja Vercela (rzecz, którą
  widzi użytkownik). Przebieg 1 ma zaniżony `benchmarkIndex` i jest przyrządem;
  **przebieg 2 ma zdrowy `benchmarkIndex` i mimo to 2102 ms** — więc to raczej
  strona, nie maszyna.

**Rekomendacja przedstawiona właścicielowi:** najpierw jeden eksperyment
rozstrzygający — wstawić trasę ofiarną na początek listy i zobaczyć, czy rozrzut
przenosi się na nią, a `/` się wyprostuje. Koszt: jeden przebieg CI, ~8 min.
Jeśli się przeniesie → to przyrząd i miarą ma być MAD. Jeśli zostanie na `/` →
to strona ma zimny start i właściwą odpowiedzią jest reguła pesymistyczna, nie
łagodniejsza miara. Bez tego każdy wybór progu byłby zgadywaniem.

---

## 9. Pułapki, na których ta sesja już się przewróciła

Zapisane, żeby nie powtarzać.

- **`github.ref` w kluczu `concurrency`** dzieli jedną gałąź na dwie grupy
  (`refs/pull/N/merge` vs `refs/heads/…`). Defekt wraca cicho w PR.
- **`git cat-file -t` daje fałszywą zieleń** na skrócie z reflogu. Test
  osiągalności to `git merge-base --is-ancestor`.
- **USUNIĘCIE ROLI TO DWIE ROBOTY, A DRUGA NIE MA STRAŻNIKA** (2026-08-26,
  `WWW/055`). Zdjęcie definicji roli z tokenów jest widoczne; **przeczesanie
  jej UŻYĆ nie jest niczym pilnowane**. Zwisające `var()` unieważnia
  **całą deklarację** (invalid at computed-value time), więc własność
  spada na wartość dziedziczoną — cicho i wyglądając na celowe. Wzorzec:
  `--kolor-rola-tekst-na-inwersji` w `Hero.module.css` po ADR-038 →
  dekoracja „duch" renderowana **pełną bielą na 256 px** zamiast 6% alfy.
  **Czego to NIE złapało:** strażnik tokenów czyta WARTOŚCI ról, nie
  użycia; `axe` widzi biel na ciemnym jako kontrast wzorowy; `bramka:tokeny`
  była zielona. Zapaliła to **wyłącznie sonda rastrowa** — biały piksel pod
  obwódką fokusu CTA dawał **1:1**. Defekt przeżył push.
- **ODCZYT CZĘŚCIOWY BRAMEK ZGŁOSZONY JAKO KOMPLETNY** (2026-08-26). Zwrotka
  po KROKU 1.1 podała „pozostałe bramki zielone", a uruchomiony był
  **podzbiór**. W rzeczywistości `kontrakt` była czerwona i **siedem** testów
  e2e upadało. Klasa jest w kanonie („zbiór, który widzisz, nazwany
  zbiorem") i mimo to została popełniona. **Praktycznie: przed zdaniem
  o stanie bramek przeleć pętlą PO LIŚCIE ze `package.json`, nie po
  pamięci.**
- **`npm run <nieistniejący-skrypt>` ZAWODZI CICHO W ŁAŃCUCHU Z `;`**
  (2026-08-26). Dowód mutacyjny wyszedł **zielony** i wyglądał jak dowód
  niewrażliwości strażnika; naprawdę `npm run tokeny` nie istnieje (jest
  `tokeny:build`), błąd poszedł do `/dev/null`, a generowany CSS został
  stary — **mutacja nigdy się nie wydarzyła**. Rodzina: „komenda raportuje
  sukces swojej operacji, nie osiągnięcie twojego celu".
- **PLAYWRIGHT SERWUJE WYDANIE ZBUDOWANE, WIĘC EDYCJA ŹRÓDŁA DO PRZEGLĄDARKI
  NIE DOCIERA** (2026-08-26). `webServer.command` to `npm run start` przy
  `reuseExistingServer`. Mutacja `outline-offset` w `globals.css` dała
  zieleń, bo mierzona była **poprzednia** kompilacja. Dwa wyjścia:
  przebudować albo — gdy port zajmuje proces właściciela — **wstrzyknąć
  zmianę do wyrenderowanej strony** (`page.addStyleTag`), co mierzy ta sama
  asercja, nie jej kopia.
- **`npm run build` POD ŻYWYM SERWEREM WŁAŚCICIELA GO PSUJE** (2026-08-26).
  Przebudowa nadpisuje `.next`, a proces uruchomiony wcześniej trzyma stary
  manifest: strona na porcie 3000 zaczęła serwować **niedopasowane klasy CSS**
  (duch 16 px zamiast 256). Zakaz 7 zabrania zabicia procesu, więc **naprawa
  należy do właściciela — wystarczy restart**. Na przyszłość: weryfikuj na
  **własnym porcie**, a nie przebudową pod cudzym serwerem.
- **TA SAMA POMYŁKA DWA RAZY W JEDNEJ SESJI: zapis funkcyjny barwy
  w KOMENTARZU CSS** (2026-08-26). Linter tokenów czyta także komentarze.
  Pierwszy raz przy palecie kancelarii, drugi przy opisie naprawy ducha —
  **w akapicie opisującym inną własną pomyłkę**. Dokładnie klasa „klasa
  opisana nie jest klasą unikaną".
- **ZLECENIE DYSPONUJĄCE SLOTEM BEZ POMIARU JEGO ZAWARTOŚCI**
  (klasa nazwana przez właściciela, `WWW/046`, 2026-08-26). Zlecenie
  wskazuje miejsce w interfejsie — slot obrazu, sekcję, ramkę — i mówi,
  co ma tam wejść, **nie sprawdziwszy wcześniej, co tam już jest**.
  Wykonawca dostaje wtedy polecenie, którego wykonanie **kasuje cudzą
  pracę**, a poleceniu nic o tym nie wiadomo.

  **Wzorzec (`WWW/045`, 2026-08-26):** punkt „strona główna → karty
  filarów: pozysk-A, tresci-A, zespol-A, wyniki-A". Slot kart filarów
  trzymał **zrzuty produktu z dostawy Z6**, pilnowane sumami SHA-256
  bajt w bajt przez **11 asercji**, na mocy datowanej decyzji
  właściciela z 2026-08-16. Wykonanie skasowałoby dowód produktu,
  zerwało te strażniki i cofnęło decyzję sprzed dziesięciu dni, nie
  nazywając jej. **Właściciel potwierdził 2026-08-26: Z6 zostają,
  kadry generowane nie wchodzą na główną; punkt zlecenia był błędem
  koordynatora.**

  **Dlaczego to jest klasa, a nie pojedyncza pomyłka:** slot pusty
  i slot zajęty **wyglądają w zleceniu identycznie** — obie postacie to
  jedno zdanie wskazujące miejsce. Różnicę widać dopiero po stronie
  wykonawcy i tylko wtedy, gdy sprawdzi **przed** wykonaniem. W tej
  samej dobie ten sam wzorzec wystąpił **drugi raz, łagodniej**: ramki
  modułów na podstronach też nie były wolne — niosły kontrakt DOM
  („dokładnie jedna ramka, pusta i aria-hidden") pilnowany przez dwa
  strażniki w dwóch plikach.

  **Praktycznie, po obu stronach:** zlecający pisze, **co tam dziś
  jest** albo wprost „slot uznaję za wolny, sprawdź"; wykonawca
  **mierzy zajętość slotu przed pierwszą zmianą** i zwraca zlecenie
  z pomiarem, a nie z wykonaniem w przybliżeniu. Rodzina: ADR-018 pkt 7
  („zlecenie pod złym adresem odsyła się, nie wykonuje w przybliżeniu")
  — tu adres jest dobry, a **zajętość** nie.
- **`git checkout -- <plik>` bierze z INDEKSU, nie z HEAD ani ze stanu
  roboczego** — i dlatego kasuje niezacommitowaną pracę bez ostrzeżenia.
  **Ta sesja wdepnęła w to 2026-08-26**, mimo że kanon opisuje tę pułapkę
  wprost („komenda raportuje sukces swojej operacji, nie osiągnięcie
  Twojego celu"). Okoliczności są pouczające: komenda była **cofnięciem
  mutacji dowodowej**, czyli krokiem, który ma przywracać stan — więc
  wyglądała na bezpieczną z definicji. Zniknęła cała kasacja trzech bloków
  eksperymentu, bo w indeksie stała wersja sprzed niej. **Wniosek
  wykonawczy: mutację cofa się KOPIĄ PLIKU zrobioną tuż przed nią**
  (`cp` do katalogu roboczego), a tożsamość cofnięcia potwierdza suma
  SHA-256 — nie „git nie zgłosił błędu". To jest ta sama klasa co
  „KLASA OPISANA NIE JEST KLASĄ UNIKANĄ": opis i odruch to dwa różne
  stany wiedzy, a pośpiech pisze odruch.
- **CI jest surowsze od maszyny lokalnej** — płytki klon nie ma nawet obiektu.
- **Powłoka to zsh, nie bash**: `${pipestatus[1]}`, nie `${PIPESTATUS[0]}`.
- **Systemowy `grep` to ugrep** — brak lookbehind.
- **`gh run watch` zwraca 1 przy braku sukcesu**, a przy zerwanej sieci potrafi
  wyjść zerem po serii błędów. Roboczy obserwator zameldował „OBA PRZEBIEGI
  ZAKONCZONE" po 99 błędach połączenia. Pętla polling musi rozróżniać „skończone"
  od „nie udało się zapytać".
- **Artefakt CI wozi tylko HTML, nie pliki `lhr-*.json`.** Żeby mieć lokalne dane
  do pracy nad werdyktem: `npx lhci collect --url=… --numberOfRuns=5`.
- **`werdykt-po-lcp.mjs` wychodzący 1 lokalnie jest OCZEKIWANY** — lokalne `/`
  ~1852 ms jest czerwienią termometru w trybie lokalnym (udokumentowane
  w `lighthouserc.cjs`).
- **`--lhr` w `lhci` jest pułapką** (odnotowane wcześniej w pamięci projektu).
- **Reguła werdyktu to przebieg o medianowym LCP**, a nie medianowa wartość
  metryki. Różnica bywa istotna.
- **Bramka `nieodwracalne` jest planowo czerwona** — całościowy werdykt przebiegu
  „failure" przy zielonych pozostałych bramkach jest tu stanem normalnym.
- **Bramka `dostępność` mierzy lokalny build**, nie preview
  (`bramki.yml:167-205`), więc nie konkuruje o alias z pomiarem wydajności.
- **Rotacja klucza obejścia jest domknięta po stronie Vercela (1 klucz)**, ale
  „sekret ustawiony ≠ sekret właściwy" — sprawdzenie jest po prefiksie SHA-256.

**Dopisane przy audycie kompletności (2026-08-20)** — pułapki znane wcześniej,
przeoczone przy pierwszym spisaniu tego dokumentu:

- **`aggregationMethod: pessimistic` w `lighthouserc.cjs:200` NIE jest regułą
  bramki.** Kto przeczyta samą konfigurację, wyciągnie wniosek „bramka już jest
  pesymistyczna" — i pomyli się. Ścieżka bramki (`npm run bramka:pomiar`) podaje
  do `lhci assert` **dokładnie jeden przebieg na trasę** (`scripts/werdykt-po-lcp.mjs`),
  a przy jednym przebiegu każda agregacja daje tę samą liczbę. `pessimistic`
  działa dopiero, gdy ktoś ominie bramkę i puści `lhci autorun` na pełnym
  komplecie — wtedy da werdykt SUROWSZY, nigdy łagodniejszy. **Ma to znaczenie
  wprost dla kierunku (d)**: rozdział 8 rozważa regułę odporną na rozrzut i nie
  wolno założyć, że część tej roboty jest już zrobiona. Nie jest.
- **`actions/upload-artifact` od v4.4 pomija pliki ukryte.** `.lighthouseci/`
  zaczyna się kropką, więc bez `include-hidden-files: true` artefakt jedzie PUSTY
  i nikt tego nie zauważa. Ustawione w `bramki.yml:62` i `:438` — usunięcie tej
  linii daje cichą stratę danych, nie czerwień.
- **`overwrite: true` (`bramki.yml:68`, `:440`) jest po to, żeby `gh run rerun`
  nie wywracał się na 409 (konflikt nazwy artefaktu).**
- **`manifest.json` powstaje wyłącznie przy `lhci upload`.** Bramka go nie ma
  i mieć nie będzie — czyta bezpośrednio `lhr-*.json`. Skrypt, który zacznie
  szukać `manifest.json`, będzie się cicho pomijał.
- **`gh secret set` — wartość WYŁĄCZNIE przez stdin, nigdy `--body`.** Wartość
  podana flagą ląduje w historii powłoki i na liście procesów.
- **Sygnatura czerwieni ŚRODOWISKOWEJ vs regresji.** Środowiskowa: strażnik celu
  pomiaru pada PRZED pomiarem, w logu jest **ZERO liczb LCP**. Regresja: liczby
  są, werdykt czerwony. Rozróżnienie robi się po obecności liczb, nie po treści
  komunikatu — i tylko ono decyduje, czy w ogóle jest co analizować.

**Dopisane przy zabezpieczaniu sesji (2026-08-20)** — trzy nowe, wszystkie
z tej samej rodziny „wynik wyglądał sensownie i był fałszywy":

- **`origin/…` to lokalna migawka, nie stan zdalny.** `.git/FETCH_HEAD` miał datę
  **13 sierpnia** przy pracy 20 sierpnia, więc każde zdanie o „stanie zdalnym"
  oparte na `git rev-parse origin/…` opisywałoby stan sprzed tygodnia. Tym razem
  migawka była zgodna — **przypadkiem**. Przed pisaniem czegokolwiek o zdalnym:
  `git ls-remote --heads origin` (czyta, niczego nie zapisuje) albo `git fetch`.
  To ta sama klasa co „odwołanie do stanu, który przestał istnieć", tylko
  wycelowana w gałąź zamiast w commit.
- **`zip -r` PODĄŻA ZA DOWIĄZANIAMI** → archiwum katalogu sesyjnego wyszło
  **44 556 wpisów / 345 MB** zamiast 879 / 173 MB, bo wciągnęło `node_modules`
  przez dowiązanie. Wymagane `-y`. Defekt jest podstępny, bo archiwum z fałszywą
  liczbą wpisów wygląda na **pełniejsze**, a nie na zepsute.
- **Potok porównujący pliki wywraca się na polskich nazwach.**
  `sed: RE error: illegal byte sequence` przy domyślnej lokalizacji obciął listę
  do 604 z 879 pozycji i wyprodukował długą, nieprawdziwą listę „braków" —
  czyli **narzędzie weryfikujące samo stało się źródłem fałszywego alarmu**.
  Wymagane `LC_ALL=C`. Osobno: `unzip -Z1` rysuje bajty spoza ASCII jako `?`,
  co daje pozorne rozbieżności — rozstrzyga porównanie SHA-256, nie nazw.

**Nazwane przez właściciela 2026-08-23 — klasa, nie pojedyncza pułapka:**

- **„WYGLĄDA NA REGUŁĘ WERDYKTU PRZY POBIEŻNYM CZYTANIU."** Ustawienie
  w konfiguracji, które **nazywa się** jak reguła rozstrzygająca, a nią nie
  jest, kosztuje więcej niż jego brak: czytający uznaje rzecz za zrobioną
  i przestaje szukać. Wzorzec to `aggregationMethod: 'pessimistic'` (opis niżej,
  w bloku z audytu kompletności). Reguła praktyczna: **zanim powiesz
  „konfiguracja to załatwia", prześledź ścieżkę wykonania do miejsca, gdzie
  zapada werdykt.** Wpisane do kanonu w `CLAUDE.md`.

**Dopisane przy recenzji zadania z sesji aplikacji (2026-08-20):**

- **DOKUMENT Z ZADEKLAROWANYM ZAKRESEM SIĘ NIE STARZEJE — STARZEJE SIĘ CYTAT
  WYJĘTY Z NIEGO BEZ ZAKRESU.** Pułapka złapała mnie na gorącym uczynku:
  zobaczyłem w `RAPORT-POWYKONAWCZY-WWW.md` §5.5 „rejestr ma 34 pozycje",
  policzyłem dzisiejsze 50 i napisałem w briefingu „nieaktualny fakt
  w repozytorium". Nagłówek dokumentu (wiersze 3–6) to obalił: raport deklaruje
  zakres `0896219` → `3ca12a3` (2026-08-16) i wobec **tego** zakresu liczba jest
  prawdziwa co do jedności. To **odwrotność** klasy „odwołanie do stanu, który
  przestał istnieć": tam przeterminował się dokument, tu przeterminował się
  czytelnik. Reguła praktyczna: **zanim nazwiesz liczbę w cudzym dokumencie
  nieaktualną, przeczytaj jego nagłówek** — a zanim ją zacytujesz gdzie indziej,
  zabierz zakres razem z nią. Zapisane jako T26; naprawiać nie ma czego.
- **Zadanie z innej sesji może odwoływać się do pliku, którego nie ma.**
  `docs/KANON-CATHERLY-STRONA.md` z zadania nie istniał nigdzie — ani na HEAD,
  ani na gałęzi zdalnej, ani w drzewie roboczym, ani w `Downloads`/`Desktop`.
  Sesja pisząca zadanie miała go u siebie i założyła, że jest wspólny.
  Pierwszy odruch („pewnie gdzieś jest, poszukam po treści") kosztuje mniej niż
  wykonanie zadania na wyobrażonym pliku — **istnienie pliku sprawdza się
  przed, nie w trakcie**.
- **„Zrób pomiar na czysto" bywa niewykonalne z powodu, którego zlecający nie
  widzi.** Narzędzia zapewniające czystość (strażnik po pomiarze, werdykt
  marginesu, `concurrency`) siedzą w commitach NIEWYPCHNIĘTYCH, a `workflow_dispatch`
  wymaga pliku workflow na gałęzi domyślnej — `main` (`0896219`) nie ma katalogu
  `.github`. Zanim zaczniesz mierzyć: sprawdź, czy wyzwalacz w ogóle istnieje na
  gałęzi, na której ma zadziałać.
- **Ten plik złamał własną regułę i przez trzy doby wyglądał na prawdziwy**
  (wychwycone 2026-08-23). Rozdz. 0 i rozdz. 1 niosły **„dziewięć commitów"**
  wpisane 2026-08-20 — wartością, mimo że T25 wprost zakazuje wpisywania pól
  samostarzejących się i każe wpisywać polecenie, którym się je przelicza.
  Po dwóch commitach liczba była fałszywa, a leżała dokładnie w zdaniu
  „nie pushuj, bo czeka N commitów". Skutek jest kierunkowy: kto przepisze
  tę liczbę do prośby o zgodę, dostanie zgodę na listę rozbieżną z gałęzią,
  czyli **push bez zgody na część commitów** — zakaz 1 złamany przez zaufanie
  dokumentowi, nie przez pośpiech. Poprawione na polecenie; liczby nie ma tam
  dziś w żadnej postaci. Wniosek szerszy: **reguła zapisana w dokumencie nie
  pilnuje samego dokumentu** — to jest ta sama klasa co T25 („brak dowodu =
  brak zabezpieczenia" po stronie przekazania) i argument za strażnikiem
  z decyzji **D4**, a nie kolejny wpis rejestru.

**Dopisane przy zapisie pięciu rozstrzygnięć (2026-08-23) — jedna klasa, dwa
wystąpienia w jednym przebiegu:**

- **ROZSTRZYGNIĘCIE NIE JEST ZAMKNIĘCIEM.** Właściciel rozstrzygnął T24 i T32,
  robota została wykonana — i odruch był taki, żeby postawić przy obu
  `ZAMKNIĘTE`. Obie pozycje mają jednak **własny warunek powrotu**, zapisany
  wcześniej i szerszy niż samo rozstrzygnięcie: T24 wymaga **przebiegu
  z celowo zawieszonym krokiem** (bez tego obecność `timeout-minutes` w pliku
  jest kodem wyglądającym poprawnie, czyli statusem NIESPRAWDZONE), a T32
  wymaga zdania o hierarchii w nagłówkach **pięciu** dokumentów, nie jednego.
  Zamknięcie ich na podstawie samej implementacji byłoby **samooceną własnej
  pracy** i zostawiłoby w rejestrze dwie pozycje wyglądające na spłacone.
  Reguła: **przed postawieniem `ZAMKNIĘTE` przeczytaj warunek powrotu tej
  pozycji, nie treść polecenia, które ją rozstrzygnęło.** Zamknięte zostały
  wyłącznie T35 i T36 — dwie pozycje, których warunkiem był sam zapis reguły.
- **Literalne wykonanie rozstrzygnięcia bywa gorsze niż jego brak — i wtedy
  zgłasza się, a nie poprawia.** D6 brzmiało „20 minut dla zadań pomiarowych,
  10 dla pozostałych". Pomiarowe jest jedno, więc `Pełny zestaw e2e` przy
  zmierzonych **5 min 23 s** dostał limit 10 min — zapas **1,86×**, podczas gdy
  uzasadnienie tego samego rozstrzygnięcia mówiło o wielokrotności rzędu
  20–30 min. Kuszące było „domyślić" intencję i wpisać 20. **Nie wolno**: to
  rozszerzenie zgody poza jej literę, ta sama rodzina co push na skrót spoza
  wyliczonej listy. Zamiast tego — wykonać literalnie i **zgłosić rozjazd**
  (T24, 7.2.6).

**Dopisane po pomiarze czasów zadań (2026-08-23) — dwa razy ta sama wada:
liczba zamiast pomiaru:**

- **POJEDYNCZY CZAS TRWANIA NIE JEST CZASEM TRWANIA.** Zgłaszając cienki zapas
  przy `Pełny zestaw e2e` oparłem się na **jednej liczbie z cudzego zapisu** —
  „5 min 23 s", zmierzone 2026-08-20 i przepisane z T24. Godzinę później ten
  sam kod dał **3 min 13 s**. Rozrzut **1,67×** między przebiegami. Zgłoszenie
  było słuszne, ale **stało na złej podstawie**: gdyby przebiegi wypadły
  odwrotnie, ta sama metoda kazałaby mi powiedzieć „zapas 3,1×, jest dobrze"
  i defekt zostałby przeoczony. Dla wielkości z rozrzutem jedna wartość nie
  ustala zapasu — ustala go **rozrzut**, a rozrzutu nie da się zobaczyć
  z jednego pomiaru. Ta sama rodzina co „margines pozorny" przy wydajności,
  tyle że przeniesiona na czas trwania zadania. **Reguła:** zanim policzysz
  „zapas N×", sprawdź, ile pomiarów masz. Jeden — to nie jest zapas, to jest
  anegdota z datą.
- **MIAŁEM CZYM ZMIERZYĆ I NIE ZMIERZYŁEM.** Czasy wszystkich zadań stoją
  w API GitHuba i wyciąga je jedno polecenie (`gh api
  repos/.../actions/runs/<id>/jobs`, pola `started_at`/`completed_at`). Sięgnąłem
  po nie dopiero, gdy poszedłem do logów w innej sprawie. Do tego czasu
  operowałem cytatem z dokumentu, mając pod ręką pomiar. **To jest tańsza wersja
  tej samej wady, którą kanon opisuje przy dowodach: przekonanie zamiast
  odczytu.** Przy okazji tego samego wejścia do logów wyszło **T41** —
  ostrzeżenie dostawcy widoczne 15 razy w każdym przebiegu, którego nikt nie
  czytał. Oba znaleziska są skutkiem jednej decyzji: żeby w końcu spojrzeć.

**Dopisane po diagnozie backupu (2026-08-24) — najcięższa z całego zestawu:**

- **ZABEZPIECZENIE, KTÓRE NIGDY NIE ISTNIAŁO, WYGLĄDA IDENTYCZNIE JAK
  ZABEZPIECZENIE, KTÓRE DZIAŁA — dopóki nie przestanie być potrzebne.**
  `CLAUDE.md` od początku mówi, że migawki robi hak `Stop`. Migawek jest
  ponad dwieście, więc nikt tego nie sprawdził — a **klucza `hooks` nie ma
  w żadnym pliku konfiguracji** (odczyt 2026-08-24, cztery lokalizacje).
  Trzy doby bez kopii minęły **bez jednego sygnału**, bo cichy brak backupu
  jest nieodróżnialny od backupu, którego nie było potrzeby robić. Trzy
  reguły opisują to trafnie i **wszystkie trzy były w kanonie już przed tym
  zdarzeniem**: „brak dowodu = brak zabezpieczenia" (nikt nie zmierzył, czy
  hak istnieje), „raport, którego nikt nie czyta" (porażka nie miała gdzie
  się pokazać) i „strażnik zerodowany przez zmianę otoczenia" (z tą różnicą,
  że tu nie było czego zerować). **Czego się nauczyć:** zdanie „mechanizm X
  robi to automatycznie" jest **twierdzeniem sprawdzalnym jednym poleceniem**
  i dopóki go nie sprawdzisz, ma status niesprawdzony — także gdy stoi
  w kanonie, także gdy jego skutki widzisz na dysku. Skutek na dysku dowodzi,
  że coś je tworzyło; **nie dowodzi, że tworzył je ten mechanizm.**
- **Rzecz osobna, warta jednego zdania.** Nagłówek zlecenia mówił
  „23.08.2026, 21:02", a zegar maszyny w chwili wykonania — **2026-08-24,
  08:58 CEST**. Stemple w tym commicie noszą **datę faktyczną**, nie datę
  z nagłówka: przy regule „każda liczba niesie datę i commit" rozjazd o dobę
  nie jest drobiazgiem redakcyjnym, bo to on decyduje, czy pomiar da się
  potem odtworzyć. **Właściciel przyjął to 2026-08-24 jako własną pozycję:**
  *„stemplowałem datą, która przestała obowiązywać, i nie sprawdziłem tego ani
  razu"* — klasa **„stempel poprawny w chwili powstania, fałszywy w chwili
  cytowania"**, zapisana przy **T26**. Praktyczna konsekwencja dla czytającego
  archiwum: **daty w nagłówkach zleceń z 23.08 są niepewne od nieustalonego
  momentu**; gdzie nagłówek rozchodzi się ze stemplem wykonania, **obowiązuje
  odczyt zegara, nie nagłówek**.

**Dopisane po weryfikacji backupu odtworzeniem (2026-08-24):**

- **ZALEŻNOŚĆ TWARDA ISTNIEJE TAKŻE W DOKUMENTACJI, NIE TYLKO W KODZIE**
  (nazwane przez właściciela 2026-08-24). Wykreślenie zdania z
  `docs/STRATEGIA.md` **musiało** pójść po wpisaniu siedmiu szczebli do
  `CLAUDE.md`, nie przed: nowy nagłówek STRATEGII odsyła do hierarchii
  w kanonie, więc przy odwrotnej kolejności commit `74fdfe8` wskazywałby na
  listę, **która STRATEGII nie zawiera** — dokument odsyłający do miejsca, gdzie
  go nie ma. W kodzie taką zależność wyłapuje kompilator albo test; w prozie
  **nie wyłapuje jej nic** — żadna bramka nie sprawdza, czy odesłanie trafia
  w treść, która już istnieje. Reguła praktyczna: **jeśli dokument A ma odsyłać
  do B, zmiana B idzie pierwsza** — albo obie w jednym commicie. Rozbicie na
  dwa commity w odwrotnej kolejności daje stan pośredni, który wygląda
  poprawnie i jest fałszywy.
- **SUMA KONTROLNA NIE JEST WERYFIKACJĄ BACKUPU — ODTWORZENIE JEST.** Pierwsze
  w historii tego repozytorium sprawdzenie archiwum przez rozpakowanie
  (2026-08-24, `catherly-www-2026-08-24-0910.zip`) **od razu** znalazło
  rozjazd: brak śledzonego `.env.example`, wycięty zbyt szerokim wzorcem
  `-x ".env.*"` (**T43**). Suma kontrolna nie mogła tego pokazać **z definicji**
  — dowodzi, że plik się nie zepsuł, a nie że da się z niego wrócić do tego, co
  się miało. To ta sama klasa co `RECZ-286` w repozytorium aplikacji
  („narzędzie potwierdza poprawność artefaktu, którego nie da się użyć") i ta
  sama co osiągalność skrótów: **istnienie obiektu to nie to samo, co
  możliwość powrotu.** Powód, dla którego właściciel kazał to sprawdzić, jest
  cudzym pomiarem i tak zostaje oznaczony: półtora miesiąca weryfikacji samą
  sumą po tamtej stronie, ponad 75 archiwów przyjętych z żywymi kluczami.
  **U nas kluczy w archiwach nie ma** — sprawdzone wykazem nazw, nigdy
  wartości. **Dwa niezależne dowody wartości tej reguły tego samego dnia,
  w którym reguła powstała** (wskazane przez właściciela): `RECZ-287` po
  stronie aplikacji — półtora miesiąca weryfikacji samą sumą i 75 archiwów
  przyjętych z żywymi kluczami — oraz **T43** tutaj, defekt znaleziony przy
  **pierwszym** sprawdzeniu odtworzeniem. Osobno każdy wygląda na przypadek;
  razem pokazują, **czego suma nie widzi z definicji**: ani tego, co
  w archiwum jest nadmiarowo, ani tego, czego brakuje — wyłącznie to, że
  bajty się nie zmieniły.

---

## 10. Gdzie co leży

**Zmienione/nowe tej doby**
- `.github/workflows/bramki.yml` — blok `concurrency`, `id: pomiar`, dwa nowe
  kroki (prowieniencja po pomiarze, werdykt marginesu); 2026-08-23 doszły
  **`timeout-minutes` na wszystkich 15 zadaniach** (20 pomiarowe / 10 pozostałe)
  i **krok `Przyczyna anulowania`** pod `if: cancelled()` w każdym z nich (D6, T24)
- `scripts/straznik-po-pomiarze.mjs` — **nowy**, 180 linii
- `scripts/werdykt-marginesu.mjs` — **nowy**, 220 linii
- `package.json` — `bramka:po-pomiarze`, `bramka:margines`
- `CLAUDE.md` — **180 → 288 linii** (stan 2026-08-23; przelicz: `wc -l CLAUDE.md`).
  Dwie nowe reguły kanonu ADR-018 z doby
  19/20 + wskaźnik do tego pliku na samej górze (bez niego przekazanie byłoby
  raportem, do którego nikt nie zagląda — kanon nazywa tę klasę wprost);
  2026-08-23 doszły **dwie kolejne klasy kanonu** („wygląda na regułę werdyktu
  przy pobieżnym czytaniu", „dokument z zadeklarowanym zakresem się nie
  starzeje") i **cały rozdział „Dziesięć zakazów"** — pierwszy w tym pliku
  adresowany do ZLECAJĄCEGO, nie do wykonawcy (T34). W drugiej sesji 2026-08-23
  doszły **rozdział „Hierarchia źródeł reguł"** (T32) i **dziesiąta klasa kanonu**
  „bramka szkodząca przez poprawność" (T36)
- `docs/faza-2/rejestr-warunkow-powrotu.md` — T22 przepisana, **T23, T24,
  T26–T40 nowe** (T26 z dopiskiem o odmowie wysłania briefingu poza jego zakres);
  2026-08-23 **T35 i T36 zamknięte**, **T23, T24, T32 rozstrzygnięte i nadal
  otwarte** — rozstrzygnięcie nie jest zamknięciem, dopóki warunek powrotu stoi
- `docs/adr/018-prymat-nieodwracalnego.md` — **punkt 7 dopisany 2026-08-23**
  (T35): zlecenie pod złym adresem odsyła się, nie wykonuje w przybliżeniu —
  w obu kierunkach. Pierwsza zmiana treści tego ADR-a od 2026-08-07
- `docs/PRZEKAZANIE-SESJI.md` — ten plik; **jedyne kanoniczne przekazanie**.
  Drugiego nie ma i nie ma go być: dwa pliki przekazania to natychmiastowe
  pytanie „który obowiązuje", czyli nowy defekt zamiast zabezpieczenia
- `docs/BRIEFING-MIEDZY-SESJAMI.md` — **nowy**; odpowiedź dla sesji pracującej
  po stronie aplikacji (4.7). Nie jest źródłem reguł wiążących i nie ma nim
  być — reguły są w `CLAUDE.md` i w 30 ADR-ach, briefing tylko je streszcza
  i wskazuje. Jeśli kiedykolwiek się z nimi rozejdzie, obowiązują tamte

**Czytane, nośne, nietknięte**
- `scripts/sprawdz-preview.mjs` — strażnik startowy, tylko `/`
- `scripts/rozgrzewka-preview.mjs` — rozgrzewka, sprawdza prowieniencję na
  wszystkich 7 trasach (dlatego brakowało tylko ramienia „po")
- `scripts/podsumowanie-pomiaru.mjs` — tu mieszkało nieczytane ostrzeżenie
  o rozrzucie (linie ~246–254)
- `scripts/reprezentant.mjs` — reguła „przebieg o medianowym LCP"
- `lighthouserc.cjs` — 7 tras, `numberOfRuns: 5`, progi LCP 1800 / CLS 0,1 /
  TBT 200
- `docs/faza-2/rejestr-warunkow-powrotu.md` — rejestr T1–T49
- `docs/weryfikacja-zewnetrzna/` — **NOWY 2026-08-26**, 34 pliki / 19 MB;
  pakiet do weryfikacji palety i treści w OBCYM narzędziu: struktura 9 tras
  z DOM, teksty ×3 języki, 5 palet z kontrastami, typografia, 26 zrzutów.
  Całość jednym ruchem: `git archive --format=zip HEAD:docs/weryfikacja-zewnetrzna`. Niesie sekcję **ROZJAZDY** — osiem rzeczy, których
  obce narzędzie nie ma prawa założyć
- `docs/faza-2/mapa-klas-straznikow.md` — **NOWY 2026-08-26**; mapa pokrycia
  klas wad strażnikami. Pierwsza klasa: **liczebność ze zbioru kontra
  liczebność z decyzji**. **Nie jest źródłem reguł** — szczebel 7, deklaruje
  to w nagłówku; niesie jawną granicę własnego przeszukania
- `docs/faza-2/dowody-wartosci-regul.md` — **NOWY 2026-08-24**, 292 linie;
  **trzy** tabele — dowodów wartości (**25**), **kosztów** (**8**) i sprawdzenia
  wstecznego przypisań. **Nie jest źródłem reguł** — szczebel 7, deklaruje to
  w nagłówku; niesie **trzy zadeklarowane stronniczości**
- `docs/RAPORT-POWYKONAWCZY-WWW.md` — matryca dla następnych stron.
  **Czytając: zacznij od wierszy 3–6** — dokument deklaruje tam swój zakres
  (`0896219` → `3ca12a3`, 2026-08-16) i wszystkie liczby w rozdziałach opisują
  stan TAMTEGO zakresu, nie dzisiejszy (T26, rozdz. 9)

**Rozmiary — żeby wiedzieć, czego NIE da się streścić w tym pliku**
(zmierzone 2026-08-20 na `8f15c60` + zmiany robocze)
- `docs/RAPORT-POWYKONAWCZY-WWW.md` — 1419 linii; **zakres zadeklarowany
  w wierszach 3–6**, liczby w rozdziałach opisują stan tamtego zakresu (T26)
- `docs/faza-2/rejestr-warunkow-powrotu.md` — 463 linie (stan 2026-08-24), pozycje T1–T43
  (skorowidz: rozdz. 15)
- `docs/BRIEFING-MIEDZY-SESJAMI.md` — 271 linii, sześć części (4.7)
- `docs/adr/` — 30 ADR-ów + `README.md` (skorowidz: rozdz. 16)
- `CLAUDE.md` — **785 linii, stan 2026-08-26** (wskaźnik do tego pliku na górze,
  rozdział „Hierarchia źródeł reguł", kanon ADR-018 z dziesięcioma klasami,
  rozdział „Dziesięć zakazów", reguła bieżącej aktualizacji na końcu).
  Liczba starzeje się przy każdej zmianie kanonu — przelicz: `wc -l CLAUDE.md`
- `docs/PRZEKAZANIE-SESJI.md` — ten plik; długości nie wpisuję, bo starzeje się
  przy każdej własnej zmianie — `wc -l docs/PRZEKAZANIE-SESJI.md`

**Sekrety — gdzie są, czego nie wolno wypisywać**
- `.env` (gitignored) trzyma DWA klucze; wolno wymieniać NAZWY, nigdy wartości:
  `VERCEL_TOKEN`, `STRIPE_TEST_SECRET_KEY` (Stripe wyłącznie w trybie testowym).
- `VERCEL_AUTOMATION_BYPASS_SECRET` — sekret repozytorium GitHub, po stronie
  Vercela JEDEN klucz obejścia. Sprawdzanie wyłącznie po prefiksie SHA-256.
- Mapa `protectionBypass` z API Vercela — **nigdy surowo**, prefiksy SHA-256.
- `Set-Cookie` z preview — **nigdy** (niesie `_vercel_jwt` z wartością obejścia
  otwartym tekstem). Stąd `curl -o /dev/null -w '%{http_code}'`, nigdy `-i`/`-v`.

**Poza tym repozytorium**
- `RECZ-286` (rodzina „narzędzie potwierdza poprawność artefaktu, którego nie da
  się użyć") — `/Users/sylwesterzabski/Documents/fbo os/fbo-os/docs/ZADANIA_RECZNE.md:3433`
- Backupy — `/Volumes/Extreme SSD/Catherly-www-ZIP`, kopie milowe
  w podkatalogu `KAMIENIE-MILOWE/`

---

## 11. Rzeczy ulotne — ZABEZPIECZONE ARCHIWUM

Katalog sesyjny znika razem z sesją. To była **jedyna rzecz w tym projekcie
faktycznie zagrożona** — pliki repozytorium są w gicie i w rotacyjnych
migawkach, katalog sesyjny nie był nigdzie.

Katalog:
`/private/tmp/claude-502/-Users-sylwesterzabski-Documents-FBO-OS---www/b5f46785-71a6-4c33-a50c-96d9e76258b6/scratchpad`

**Zawartość zmierzona 2026-08-20** (nie oszacowana): **844 pliki + 34 katalogi
+ 1 dowiązanie = 879 wpisów, 443 MB**. W tym **74 wykonywalne harnesy**
(`.mjs`/`.sh`), **207 plików `lhr-*.json`** z surowymi danymi Lighthouse'a
i **65 logów**. Poprzednia wersja tego rozdziału wymieniała pięć pozycji —
było ich 74. Surowych danych pomiarowych **nie da się odtworzyć**: artefakty
CI ich nie wożą, a runner mierzy za każdym razem inaczej.

### 11.1 Archiwum — gdzie leży i czym jest udowodnione

Plik: `/Volumes/Extreme SSD/Catherly-www-SESJE/scratchpad-sesja-2026-08-20-b5f46785-NIE-USUWAC.zip`

| co | wartość |
|---|---|
| rozmiar | 173 MB (źródło 443 MB — różnica to kompresja, nie brak) |
| wpisów | **879 — zgodne co do jednego ze źródłem** |
| `unzip -t` | OK, bez błędów |
| SHA-256 | `3d18119d5718317cedbb07b3e1f9cf0bb0f5630529f864df977da5dd87fba470` |

Katalog `Catherly-www-SESJE/` jest **nowy i celowo osobny**: leży poza zasięgiem
globu `catherly-www-*.zip`, którym prędzej czy później ktoś posprząta ponad 200
migawek rotacyjnych — ta sama mechanika, co przy `KAMIENIE-MILOWE/`, ale inna
semantyka (to nie jest kamień milowy repozytorium, tylko materiał dowodowy
sesji). **Czy ma tam zostać, jest decyzją właściciela** — nie przenoszę go do
`KAMIENIE-MILOWE/` z własnej inicjatywy.

**Dwie pułapki, na których to archiwum już się przewróciło** — obie warte
zapamiętania, bo obie dawały wynik wyglądający sensownie:

1. **`zip -r` PODĄŻA ZA DOWIĄZANIAMI.** Pierwsze archiwum miało **44 556 wpisów
   i 345 MB** przy 844 plikach źródłowych, bo `pw/node_modules` jest dowiązaniem
   do `node_modules` repozytorium i `zip` wciągnął je w całość. Poprawka: `-y`
   (`zip -qry`). Archiwum z fałszywą liczbą wpisów wygląda na *pełniejsze*, więc
   ten defekt nie krzyczy — trzeba go szukać.
2. **Porównanie archiwum ze źródłem wywróciło się na polskich nazwach.**
   `sed: RE error: illegal byte sequence` przy domyślnej lokalizacji obciął listę
   z archiwum do 604 z 879 pozycji i wyprodukował długą, **nieprawdziwą** listę
   „braków". To był defekt narzędzia porównującego, nie archiwum. Poprawka:
   `LC_ALL=C` + `unzip -Z1` (bez kolumn stałej szerokości). Po poprawce: 879 = 879.
   Dodatkowo `unzip -Z1` rysuje bajty spoza ASCII jako `?`, co daje **pozorne**
   cztery rozbieżności na `arkusz-*-onest-kośo.png` / `-popioł.png`; rozstrzygnięte
   przez wypakowanie tych plików i porównanie SHA-256 — **identyczne co do bajtu**.

### 11.2 Cztery harnesy dowodowe — czym są i jak je odzyskać

Nie wklejam ich źródeł do tego dokumentu świadomie, z dwóch powodów: kod
wykonywalny w pliku `docs/` nie jest wykonywalny, a punkt 7.2.7 pyta właściciela,
czy utrwalić je w repozytorium (np. `scripts/dowody/`) — wklejenie ich tutaj
przesądziłoby tę decyzję bokiem. Zamiast tego: gdzie są, co dowodzą, jak wrócić.

| harnes | linii | SHA-256 (16 zn.) | co dowodzi |
|---|---|---|---|
| `mutacja-po-pomiarze.mjs` | 83 | `c02586cb423b5390` | (b) klamra prowieniencji: udawany preview na porcie **4331** ze sterowanym `x-catherly-wydanie`; wydanie zgodne → 7/7 ✔ wyjście 0; alias przestawiony → 7/7 rozjazdów, wyjście 1; brak nagłówka → 7/7 braków, wyjście 1 |
| `mutacja-cisza-przyrzadu.mjs` | 68 | `0bef4dc6941c5b35` | (b) przypadek czwarty, port **4332**: serwer żywy → 0; **ten sam serwer zgaszony w trakcie** → 7/7 „adres nieosiągalny (fetch failed)", wyjście 1. Milczenie celu jest czerwienią, nie ciszą |
| `mutacja-marginesu.mjs` | 92 | `093a1758501de866` | (c) werdykt marginesu: mutuje LCP **niereprezentatywnego** `lhr` dla `/funkcje` (→ 1500 ms), więc werdykt i zapas stoją, a zmienia się wyłącznie rozrzut; przywraca plik i porównuje SHA-256 |
| `proba-klonu.sh` | 46 | `8b4c74a2ca4dd6b2` | T23, dowód trzech klonów na `cd06530`: pełny → osiągalny/zieleń; `--depth 1` → „not a valid object"/czerwień; po `fetch --unshallow` → zieleń. Plus przypadek D: widmo `72f664a` nie istnieje w ŻADNYM klonie |

Odzysk pojedynczego harnesu z archiwum (nie trzeba rozpakowywać 173 MB):

```bash
Z="/Volumes/Extreme SSD/Catherly-www-SESJE/scratchpad-sesja-2026-08-20-b5f46785-NIE-USUWAC.zip"
unzip -j "$Z" 'scratchpad/mutacja-*.mjs' 'scratchpad/proba-klonu.sh' -d ./dowody
```

**Wyniki wszystkich tych dowodów są spisane w rejestrze** (T22, T23), więc nawet
bez archiwum nie ginie ustalenie — ginie możliwość powtórzenia go jednym
poleceniem. Archiwum przywraca właśnie tę możliwość.

`.lighthouseci/` w repo (gitignored) trzyma lokalne dane pomiarowe; zmutowany
plik został przywrócony, SHA-256 sprawdzona i identyczna.

---

## 12. Historia sprzed tej doby — żyła wyłącznie w pamięci projektu

Rozdziały 1–11 opisują dobę 2026-08-19/20. Poniższe ustalenia są STARSZE
i nie miały żadnego zapisu w tym dokumencie; ich jedynym nośnikiem był plik
pamięci `catherly-www-projekt.md`, którego nowa sesja może nie dostać.

- **Fazy 0–3 domknięte; trwa faza 4 (podstrony)**, gałąź `faza-4/podstrony`.
- **ADR-030 (2026-08-16, PRZYJĘTY): `main` dostaje własne wdrożenie produkcyjne
  dopiero przy Fazie 7.** Do tego czasu na `main` nie ma produkcji, a czerwień
  środowiskowa na `main` bywa akceptowana — nie miesza się to z ADR-020
  („main zawsze zielony" dotyczy bramek merge'a).
- **Reguła werdyktu zmieniła się z `median-run` na przebieg o medianowym LCP —
  commit `26c38f2`.** Powód w liczbach: przebieg `31955831699`, `/dla-kogo`
  LCP `1504 · 1374 · 1934 · 1486 · 1488`; mediana 1488 ms (zapas +312), a
  `median-run` wybrał 1934 ms i zapalił czerwień −134 ms. `median-run` wybiera
  reprezentanta po odległości od median FCP i TTI — LCP nie bierze w tym
  wyborze udziału. Bramka fałszywie alarmująca uczy ignorowania czerwieni.
- **O2 (właściciel, 2026-08-16): 3 → 5 przebiegów.** Powód: przebieg
  `31953862971`, rozrzut LCP w obrębie jednej trasy 1057 ms
  (`/funkcje/zespol`: 2029 · 1892 · 972) przy zapasach rzędu 200–300 ms. Pięć
  przebiegów nie zmniejsza rozrzutu — zmniejsza wpływ jednego wyskoku na wybór
  reprezentanta. Koszt: ~286 s → ~480 s. **O3 wdrożone. Z6 zamknięte 4/4.**
- **Czego 5 przebiegów NIE naprawia: obciążenia współdzielonego runnera.** Przy
  `throttlingMethod: "simulate"` praca CPU jest mnożona przez
  `cpuSlowdownMultiplier`, więc sąsiad na tej samej maszynie wchodzi do wyniku
  zwielokrotniony. Pilnuje tego `benchmarkIndex` w podsumowaniu — i to on dał
  rozstrzygnięcie w analizie kierunku (d) z rozdziału 8.
- **Próg 1800 ms nie zmienia się w żadnym trybie.**
- **`docs/RAPORT-POWYKONAWCZY-WWW.md` jest matrycą dla następnych stron** —
  nie jest sprawozdaniem do archiwum, tylko wzorcem do powielenia.
- **Kopie milowe** trafiają do `KAMIENIE-MILOWE/` z `NIE-USUWAC` w nazwie;
  powód jest mechaniczny (glob `catherly-www-*.zip` przy sprzątaniu ponad 200
  migawek rotacyjnych), więc katalog chroni przed globem, a nazwa przed
  człowiekiem — potrzebne są obie warstwy.

**Sprostowanie do pamięci projektu (sprawdzone dziś).** Pamięć niosła zapis, że
commit `34710c7` (T6) jest NIEWYPCHNIĘTY, bo zlecenie brzmiało „commit bez
pusha". Dziś to nieprawda: `git merge-base --is-ancestor 34710c7 HEAD` → TAK,
`… origin/faza-4/podstrony` → TAK. Późniejsze pushe go zabrały. To ta sama
rodzina co klasa „odwołanie do stanu, który przestał istnieć", tylko odwrócona:
nie martwy skrót, lecz **żywy skrót opisany martwym stanem**.

---

## 13. Czego ten dokument świadomie NIE powtarza

Żeby nowa sesja nie wzięła braku streszczenia za brak tematu.

- **Rejestr w pełnym brzmieniu.** Rozdział 6 opisuje szczegółowo pozycje z tej
  linii pracy (T2, T10, T20–T40); rozdział 15 daje **skorowidz wszystkich** —
  24 pozycji treści i T1–T49 — po jednej linii. To jest wskaźnik, nie zamiennik:
  sam wpis T22 ma w rejestrze kilkanaście tysięcy znaków dowodów i liczb.
  Przed dotknięciem czegokolwiek spoza tej linii: przeczytaj rejestr.
- **Treść ADR-ów.** Rozdział 16 podaje trzydzieści **tytułów**, żeby dało się
  trafić do właściwego pliku. Wiążąca jest treść w `docs/adr/`.
- **`docs/RAPORT-POWYKONAWCZY-WWW.md`** — 1419 linii, nie do streszczenia.
- **Pełny kanon `CLAUDE.md`** — rozdział 3 podaje dziesięć klas kanonu ADR-018
  roboczo i wymienia rozdziały „Dziesięć zakazów" oraz „Hierarchia źródeł reguł"
  jednym zdaniem; wiążący jest plik, w całości.

---

## 14. Blokady spoza repozytorium

- **Serwer MCP `higgsfield` wymaga autoryzacji OAuth.** Dopóki właściciel jej
  nie przeprowadzi (ustawienia konektorów claude.ai), narzędzia generowania
  obrazu/wideo i pokrewne są NIEDOSTĘPNE. W sesji nieinteraktywnej nie da się
  tego zrobić. Dotyczy to bloku projektowego z rozdziału 7.4 — jeśli brief
  wtorkowy zakłada generowanie materiału, autoryzacja jest warunkiem wstępnym,
  a nie szczegółem technicznym.

---

## 15. Skorowidz rejestru warunków powrotu — WSZYSTKIE pozycje

Plik wiążący: `docs/faza-2/rejestr-warunkow-powrotu.md` (stan 2026-08-26; liczba linii to pole samostarzejące się — przelicz `wc -l`). Poniżej
**skorowidz, nie streszczenie**: jedna linia na pozycję, żeby żadna nie była
niewidoczna dla nowej sesji. Kto ma dotknąć którejkolwiek — czyta rejestr.

### 15.1 Treści zdjęte z powodu braku pokrycia (poz. 1–24)

Zasada wspólna: treść wraca WYŁĄCZNIE po dowodzie wykonaniem.

| # | rzecz | wraca po |
|---|---|---|
| 1 | „Rozliczenia" w H1 i podtytule hero | działające rozliczenia end-to-end (Stripe aktywny) |
| 2 | pytanie o fakturę VAT w FAQ cennika | testowy zakup z OTRZYMANĄ fakturą + konfiguracja dashboardu Stripe |
| 3 | trial 14 dni | Stripe end-to-end + decyzja właściciela o komunikacji trialu |
| 4 | „20 GB przestrzeni" (karta Pro) + wiersz tabeli | klucz Storage aktywny + wykonany test uploadu |
| 5 | „Wywołania AI 100/500/∞" | aktywny klucz Anthropic |
| 6 | „Platformy social 2/5/∞" | zgody platform + działające łączenie kont |
| 7 | RODO/GDPR/DSGVO jako potwierdzenie | weryfikacja procesów; wraca na `/bezpieczenstwo` |
| 8 | TLS / szyfrowanie at-rest platformy | odczyt dashboardu Supabase (w repo brak śladu) |
| 9 | szyfrowanie pól (AES-256-GCM) — FAKT z kodu | budowa `/bezpieczenstwo` z precyzyjnym zakresem |
| 10 | import wyciągu FL | Storage aktywny + ekrany niepuste |
| 11 | fraza Pulsu poza kartą Growth | zawsze pełna forma „W planie Growth…" |
| 12 | pozostałe bramki GROWTH z Z1 | każde wejście = nowa obietnica → tabela obietnic + decyzja |
| 13 | `robots: noindex,nofollow` | **wyłączyć przy publikacji (Faza 7)** — pozycja checklisty premiery |
| 14 | „bez podawania powodu" (rezygnacja) | weryfikacja przepływu anulowania w aplikacji |
| 15 | granice e-mail modułów pozyskiwania | aktywacja Resend → rewizja trzech granic |
| 16 | granica jednokierunkowości subskrypcji kalendarza | integracja dwustronna (dziś SZKIELET) |
| 17 | cel linku kodu QR polecającego | weryfikacja przy Z9+ |
| 18 | 7 nazw modułów bez pozycji słownika | potwierdzenie zgodności z i18n aplikacji |
| 19 | granica importu („importu hurtowego nie ma") | pojawienie się importu w aplikacji |
| 20 | rejestr „cyfrowy odcisk SHA-256" | obowiązujące; rewizja przy zmianie decyzji głównej |
| 21 | granica „nie wygeneruje szablonu" | aktywacja klucza Anthropic |
| 22 | granica „zasięgów nie pokaże" | statystyki publikacji po zgodach platform |
| 23 | widok liderki w Pierwszych 90 Dniach | odczyt `first90` przy najbliższym Z |
| 24 | „Przesuwasz post" + nazwy poza słownikiem | weryfikacja przy Z9 |

Poz. **17, 18, 19, 23, 24** składają się na „najbliższe zlecenie Z" = **Z7**.

### 15.2 Pozycje techniczne i procesowe — **T1–T42 oraz T51–T52; T43–T50 BRAKUJE**

⚠ **NAGŁÓWEK MÓWI, CO JEST W ŚRODKU, BO POPRZEDNI MÓWIŁ, CO POWINNO BYĆ**
(znalezione 2026-08-26 przy dopisywaniu T51). Do tej doby nagłówek
deklarował „(T1–T49)", a tabela kończyła się na **T42** — czyli skorowidz
obiecywał pokrycie, którego nie miał, i robił to **w dokumencie, którego
jedynym zadaniem jest nie pozwolić, by pozycja była niewidoczna dla nowej
sesji**. Policzone ze źródła, z kontrolą pozytywną metody (T1, T42 i T51
znajdowane): w tabeli stoją **43 wiersze** — T1–T42 i T51. **Brakuje
ośmiu: T43, T44, T45, T46, T47, T48, T49, T50.**

**NIE UZUPEŁNIAM ICH — poza zakresem `WWW/038-bis`** (zakaz 8): osiem
pozycji to praca redakcyjna, nie poprawka nagłówka, a rejestr wiążący
`docs/faza-2/rejestr-warunkow-powrotu.md` **niesie je wszystkie**, więc
nic nie zginęło — zgubił je wyłącznie ten skorowidz. Zmieniono sam
nagłówek, żeby czytający wiedział, że **musi pójść do rejestru**, zamiast
uznać tę listę za komplet. To ta sama klasa co „zły podzbiór nazwany
zbiorem" (T47) i co licznik przepisywany ręką zamiast liczony ze źródła.

**Legenda:** ✅ zamknięte · 🔒 zamrożone świadomie · ⏸ czeka na blok
(design / przegląd bramek) · ⚠ otwarte, dotyczy bieżącej linii pracy.

| # | rzecz | stan |
|---|---|---|
| T1 | `next-intl` serializuje KOMPLET komunikatów do ładunku KAŻDEJ strony (+276 B za trzy klucze; wpływ na LCP w granicach szumu) | ⏸ blok designu |
| T2 | audyt nieodwracalnych — bramka **PLANOWO czerwona**, nie defekt | ⏸ Faza 6 |
| T3 | pomiar wydajności na preview Vercel + reguła werdyktu | ✅ 2026-08-16 (rozrzut wyszedł osobno → T10) |
| T4 | „H1 ≤ 3 linie" — desktop naprawiony (ADR-029), **poniżej 768 px nadal nieprawdziwe** (DE 4–5 linii) i niepilnowane | ⚠ część mobilna otwarta |
| T5 | pięć adresów Fazy 4 poza zakresem startu wg ADR-014 | ✅ 2026-08-15 — WCHODZĄ do zakresu |
| T6 | `bramka:liczby` nie widziała warstwy `messages` | ✅ 2026-08-16 (inwentarz 16 kluczy, nie 14) |
| T7 | **zdania z datą ważności** („Logowanie będzie dostępne przy premierze", `(wkrótce)` ×4 dokumenty) — brak rejestru i mechanizmu; w dniu premiery stają się fałszem i **nic tego nie zapali** | ⏸ checklista premiery, świadomie BEZ bramki |
| T8 | `/pomoc` wycofana z zakresu startu; strona nie istnieje | ⏸ po premierze, warunek potrójny |
| T9 | wskaźnik zagnieżdżenia w mapie stopki — wariant z kreską (1,34:1 przy progu 3:1) | ⏸ blok designu |
| T10 | **rozrzut pomiaru szerszy niż zapas na 7 z 7 tras** — bezpośredni przodek T22(c) | 🔒 zamrożone 2026-08-16 |
| T11 | `reuseExistingServer: !process.env.CI` — pakiet lokalny podpina się do CZYJEGOKOLWIEK procesu na porcie 3000, także zepsutego | ⏸ przegląd bramek |
| T12 | `max-width: 24ch` na H1 — `ch` zależy od kroju (755 px vs 661 px); dziś 2 linie na iOS, 3 na Androidzie, przesuw CTA o 55,19 px | ⏸ blok designu |
| T13 | brak tokenów CTA i **żadnego tokenu typografii**; recepta CTA powtórzona ręcznie w 3 modułach | ⏸ blok designu |
| T14 | `✓` (U+2713) 15× na `/cennik` — Schibsted i Geist **nie mają tego glifu**; spada na fallback | ⏸ blok designu → inline SVG |
| T15 | wyjątek lintera tokenów dla bloku palety — **wygasa 2026-08-31**; dowody mutacyjne `a826464`, mutacja „data cofnięta" → **77** naruszeń (nie 45 — liczba urosła sama, bo blok urósł) | ⚠ data jest strażnikiem |
| T16 | bramka kontrastu w stanach interaktywnych z trzema świadomymi granicami (W-GRANICA-01, próg wyłączonych = 3 ponad normę, widżety poza zasięgiem sondy) | otwarte **jako opis granic, nie dług** |
| T17 | lista 30 tras w `e2e/axe.spec.ts` **przepisana z ręki** — nowa podstrona zostanie pominięta w ciszy i na zielono | ⏸ przegląd bramek |
| T18 | arkusz `public/proba-kroju.html` — tymczasowy, **wygasa 2026-08-31**; linter tokenów skanuje `public/`, żeby zamknąć drogę ucieczki | ⏸ razem z T15 |
| T19 | warianty AVIF/WebP **nie mają dowodu, że powstały z bieżących źródeł**; podmiana źródła przechodzi dziś przez wszystkie bramki | propozycja manifestu SHA-256, bez implementacji |
| T20 | zakres wyjątku lintera **szerszy niż jego dokumentacja** (osłona jest LINIOWA, nie „wyłącznie barwy") | ⚠ znika sam 2026-08-31 |
| T21 | nic nie pilnuje, że skróty commitów w dokumentacji są osiągalne; 6 wiążących ustaleń konstrukcyjnych | ⚠ **czeka na decyzję** (7.2.4) |
| T22 | bramka wydajności mierzyła CUDZE wdrożenie + brak `concurrency` | (a)(b)(c) wdrożone, (d) i (b') otwarte — **warunek zamknięcia niespełniony** |
| T23 | `fetch-depth` — 15 × `checkout` bez niego, klon ma 1 commit | ◐ **rozstrzygnięte 2026-08-23 (D5)** — tylko kroki czytające historię; takich kroków jest dziś **zero**, więc `bramki.yml` bez zmian. Otwarte do T21 (7.2.5) |
| T24 | brak `timeout-minutes` — 4 zadania anulowane po 6 h 00 min | ◐ **rozstrzygnięte i wdrożone 2026-08-23 (D6)** — 20 min pomiarowe / 10 pozostałe + krok `Przyczyna anulowania` na 15 zadaniach. Otwarte: **brak mutacji** i cienki zapas przy `Pełny zestaw e2e` (7.2.6) |
| T25 | reguła „przekazanie aktualizowane na bieżąco" **nie ma strażnika**; wariant naiwny sprawdzałby DOTKNIĘCIE pliku, nie prawdę | ⚠ zapisana, **strażnik czeka na decyzję** (7.2.8) |
| T26 | liczby w raporcie powykonawczym niosą stempel 1070 linii wyżej, w nagłówku dokumentu pisanego DO CYTOWANIA fragmentami; pozycja niesie też obaloną pierwszą diagnozę — **dokument z zadeklarowanym zakresem się nie starzeje, starzeje się cytat wyjęty bez zakresu**; dopisek 2026-08-23: **adresat też jest częścią zakresu** | ⚠ **czeka na decyzję** (7.2.9), bez implementacji |
| T27 | zlecenie wskazuje plik, którego w repozytorium adresata NIE MA (`KANON-CATHERLY-STRONA.md`); właściciel: „trzeci raz dziś"; odwrotność klasy T21 — stan nie zaistniał nigdy, więc `merge-base` tego nie złapie | ⚠ zamyka je dopiero zlecenie, które **stanęło** na tym sprawdzeniu |
| T28 | zamówiony pomiar był już wykonany (`32302412113`, `69c2dab`), a jego odpowiedź brzmi „nie zielone"; koszt powtórki = 8 min CI + push bez zgody | ⚠ zlecenie pomiaru ma najpierw czytać `gh run list` |
| T29 | „PRZED i PO" niewykonalne — strażnik, werdykt marginesu i `concurrency` żyją wyłącznie w niewypchniętym `6383580`; zlecenie zakłada, że stan zdalny = lokalny | ⚠ zamyka push pakietu **+ dowód z runnera** (7.3.18) |
| T30 | `workflow_dispatch` martwy, bo `main` (`0896219`) nie ma `.github`; **ta sama przyczyna co `RECZ-161`** po stronie aplikacji — odwołanie międzyrepozytoryjne, **którego żadna bramka stąd nie weryfikuje** (T21 ust. 5) | ⚠ dwa kierunki, oba **czekają na decyzję** |
| T31 | „push obu commitów" = push dziesięciu; właściciel: „moja liczba z pamięci"; między zleceniem a wykonaniem liczba zmieniła się na dziewięć | ⚠ zgoda zbiorcza **nie zamyka** tej pozycji |
| T32 | **źródeł reguł wiążących jest PIĘĆ, nie trzy** (STRATEGIA, PLAN, 30 ADR-ów, `CLAUDE.md`, ten rejestr), a `CLAUDE.md` jako jedyny nie deklaruje swojego miejsca; briefing mówił „dwa" — liczba za mała, wzięta z pola widzenia, nie z odczytu | ◐ **rozstrzygnięte 2026-08-23** — ADR → `CLAUDE.md` → rejestr → przekazanie → panele; zapis w `CLAUDE.md`. Otwarte: 4 pliki bez zdania o swoim miejscu (7.2.10) |
| T33 | **próg 1800 ms przy rozrzucie 593 ms jest NIEINTERPRETOWALNY, a nie surowy** — bramka nie może dać wiarygodnej zieleni ani czerwieni (rozstrzygnięcie właściciela) | ⚠ **pozycja checklisty premiery**, blokuje Fazę 7 |
| T34 | dziesięć zakazów wiążących dla KAŻDEGO zlecenia, także właściciela — wpisane do `CLAUDE.md`; 4 z 10 sprawdzalne mechanicznie, 6 wymaga oceny zamiaru | wdrożone, **strażnik cząstkowy czeka na decyzję** (7.2.11) |
| T35 | **zlecenie o konwencji walidacji kluczy `env` trafiło pod ZŁY ADRES** — `REQUIRED_IN_PROD`, `RECZ-289`, „tor 8" mają zero trafień tutaj i komplet w repozytorium aplikacji; `zod` nie jest zależnością tego projektu, `.env` ma dwa klucze, nie piętnaście. Czwarte wystąpienie klasy T27 tego dnia i **lustrzane odbicie T26** (tam błędny adresat dokumentu, tu — zlecenia). Nic nie wykonano, zlecenie wróciło nietknięte (rozdz. 7.2.12) | ✔ **ZAMKNIĘTE 2026-08-23** — reguła weszła do **ADR-018 pkt 7**, wiążąca w obu kierunkach |
| T36 | **pierwsza pozycja rejestru opisująca bramkę, która przepuszcza ZA MAŁO** — „strażnik poprawny co do reguły, szkodliwy co do skutku". Cytat właściciela o wymuszaniu kształtu, którego dostawca nie gwarantuje, jest **międzyrepozytoryjny i niezweryfikowany stąd** (ten sam status co `RECZ-161` w T30), ale klasa ma pokrycie rodzime: T33 i T34. **Do kanonu nie wpisana** — polecenie przyszło pod złym adresem (rozdz. 7.2.13) | ✔ **ZAMKNIĘTE 2026-08-23** — klasa weszła do `CLAUDE.md` obok zakazu 10; kanon 9 → 10 klas |
| T37 | **sprawdzenie OBALIŁO ustalenie, na którym stała decyzja — a decyzja stoi, bo powód jest inny** (`A-05`, `fbo-os/docs/wdrozenia/REJESTR-PRZEPLYWU.md:49`). Zapisuje się OBA fakty razem; korekta musi wymienić, co dokładnie cofa | ✅ reguła obowiązuje od zapisu |
| T38 | proporcja **34 : 4** mówi o przepływie, nie o rzetelności toru; tor 14: **11 z 19 (58%)** sprawdzeń drugą drogą zawęziło albo rozszerzyło ustalenie; typowy kształt błędu to **nadmierny zasięg**, nie zmyślenie | ⚠ **czeka na decyzję** — czy 58% jest własnością przepływu |
| T39 | **REJESTR LICZY OGNIWA, NIE ŹRÓDŁA** — skorowidz ogniw dla 40 pozycji; pomiar: 30 z 36 wierszy wymieniało właściciela, ale wzmianka ≠ pochodzenie, więc „25 z 34" **nie da się potwierdzić w tej postaci**; dwa ogniwa: T30, T36, T38 · **trzy ogniwa: T37** | ✅ skorowidz w rejestrze; ⚠ kolumna zamiast skorowidza — do decyzji |
| T40 | ⚠ **JEDYNYM KANAŁEM MIĘDZY TRZEMA OBSZARAMI JEST JEDNA OSOBA I JEDNA WARSTWA DOWODZĄCA** — kanon wspólny w zamierzeniu, rozłączny w praktyce; `CLAUDE.md` tej strony nie zawiera żadnej klasy kanonu aplikacji; kanał ma **jeden punkt awarii** | ⚠ lista różnic gotowa (rozdz. 19), **przeniesienie = decyzja właściciela** |
| T41 | **cztery akcje CI działają na środowisku, którego nie deklarują** — `checkout@v4`, `setup-node@v4`, `download-artifact@v4`, `upload-artifact@v4` celują w Node 20, a runner wymusza Node 24; ostrzeżenie stoi w **15/15 zadań** każdego przebiegu i nikt go nie czytał, aż wejście do logu w innej sprawie (czasy zadań do T24) je odsłoniło. Nic nie jest dziś zepsute — pozycja opisuje **ryzyko z datą wygaśnięcia w cudzych rękach** | ⚠ **czeka na decyzję** — czy podnosić do `v5` (osobne zadanie, kontrola negatywna) i czy ostrzeżenia DOSTAWCY mają mieć miejsce w interfejsie (to samo pytanie co przy `::warning` z T24 — rozstrzygać raz, dla obu) |
| T42 | ⚠ **HAK, KTÓRY MIAŁ ROBIĆ BACKUPY, NIE ISTNIEJE — a `CLAUDE.md:239-241` twierdzi, że istnieje.** Zero trafień na `hooks` w czterech plikach konfiguracji (odczyt 2026-08-24); `backup.sh` nie pada w żadnej. Skutek: przerwa w migawkach **20.08 22:02 → 24.08 08:58**, obejmująca całą pracę z 23.08. Skrypt sprawny — ręcznie kod 0, `unzip -t` bez błędów. Najcięższy przypadek „brak dowodu = brak zabezpieczenia": zabezpieczenie uznane za działające przez 200+ migawek, a cichy brak backupu wygląda jak brak potrzeby backupu | ⚠ **czeka na decyzję** — czy budować hak (i wtedy koniecznie GŁOŚNY przy porażce), i co zrobić ze zdaniem w `CLAUDE.md`, które dopóki haka nie ma, jest fałszem w źródle drugiego szczebla. Do tego czasu: **`bash scripts/backup.sh` ręcznie po każdym zadaniu** |
| T51 | **bramka `Kontrakt tokenów` czerwona przez decyzję o palecie, nie przez defekt** — ΔE szwu logowania **6,46** przy progu **5,0**; próg NIETKNIĘTY (zakaz 3), naprawa nie należy do wykonawcy. Uboczne: **kotwica progu straciła przedmiot** (odwoływała się do roli `neutralna-50`, której już nie ma) | ⚠ otwarte, czeka na decyzję właściciela — trzy drogi w `design/kontrakt-aplikacji.json` |
| T52 | **kadry fali 1 wchodzą w okno startowe mimo `loading="lazy"`** — +204 do +226 kB na podstronę, waga w `networkidle` równa wadze po przewinięciu. Ten sam mechanizm co przy Z6, gdzie koszt okazał się kosztem RUND transportu (+153 ms na HTTP/1.1, **+0 ms na HTTP/2 + brotli**) | ⏸ pakiet wydajności razem z D9/LCP — **nie osobno**; pierwszy człon warunku to pomiar na transporcie produkcyjnym |
| ~~T43~~ **ZAMKNIĘTE** | **Migawka backupu nie zawiera pliku ŚLEDZONEGO w gicie — złapane PIERWSZYM sprawdzeniem przez odtworzenie.** `catherly-www-2026-08-24-0910.zip` rozpakowane 2026-08-24: `git log` pełny, `HEAD` = `74fdfe8`, `fsck` bez uszkodzeń — ale `git status` pokazuje **`D .env.example`**, plik śledzony. Przyczyna: `backup.sh:52-53` wyklucza `.env` **oraz** `.env.*`, a drugi wzorzec łapie przy okazji `.env.example`. Wzorzec szerszy niż zamiar — rodzina **T20**. Dobra wiadomość zmierzona przy okazji: **żaden `.env*` nie trafia na SSD**, czyli sekrety nie są kopiowane | ✔ **ZAMKNIĘTE 2026-08-24** — właściciel zdjął zakaz 8 punktowo (koszt czynny: cztery wadliwe migawki). Naprawa `18c03f2`: najpierw wyklucz wszystko, potem dołóż imienny wyjątek; plus **strażnik dryfu** głośny na `stderr`. Obie strony sprawdzone w jednym przebiegu, strażnik udowodniony **mutacją** z kontrolą negatywną. Dawniej: Skutek do zapamiętania: odtworzone repo pokazuje zmianę, **której nikt nie wprowadził**, więc odtwarzający po awarii uzna, że sam skasował plik. Warunek zamknięcia: odtworzenie archiwum po poprawce z **czystym** `git status` **i** wykazem bez `.env*` z sekretami — obie rzeczy w jednym sprawdzeniu, bo osobno każda da się spełnić kosztem drugiej |

---

## 16. Skorowidz ADR — **039 dopisany 2026-08-26** (`WWW/055`)

Katalog `docs/adr/` (30 plików + `README.md`). **Wiążąca jest treść pliku** —
poniżej wyłącznie tytuły, żeby dało się trafić do właściwego bez zgadywania.

| # | decyzja | # | decyzja |
|---|---|---|---|
| 001 | izolacja marki | 016 | zamknięty zestaw platform |
| 002 | progi wydajności i dostępności | 017 | brak panelu administracyjnego |
| 003 | zakaz ciemnych wzorców | 018 | **prymat nieodwracalnego** (kanon) |
| 004 | jeden design system | 019 | toolchain języka poza ADR-016 |
| 005 | auth wyłącznie w aplikacji | 020 | **main zawsze zielony** |
| 006 | płatność przed kontem | 021 | własny serwer MCP higgsfield |
| 007 | treść w repo bez CMS | 022 | kontrakt minimalny — szew logowania |
| 008 | trzy języki od dnia pierwszego | 023 | ścieżka zakupu przez login |
| 009 | jeden motyw | 024 | fazowanie hybrydowe per komponent |
| 010 | analityka przez warstwę produktu | 025 | tokeny: powierzchnia, akcent, kreska, miara |
| 011 | obrazy generowane tylko dekoracyjne | 026 | typografia tymczasowa `system-ui` |
| 012 | waluty i prawo konsumenckie | 027 | krój pisma `system-ui` na premierę |
| 013 | ciepła jakość | 028 | tokeny wymiarów, promieni, kontenera, progu |
| 014 | **zakres zamrożony iteracji 1** (+ 3 doprecyzowania) | 029 | próg i proporcje hero |
| 015 | paleta barw przez tokeny | 030 | **wdrożenie produkcyjne `main` dopiero przy Fazie 7** |
| — | — | **031** | **paleta „kancelaria" (19 ról) + krój Onest — UCHYLA 026 i 027, koryguje stałą tła z 013** |

Trzy najczęściej mylone: **ADR-020** mówi o bramkach merge'a, **ADR-030** o tym,
że `main` nie ma dziś produkcji — nie są ze sobą sprzeczne. **ADR-018** jest
nadrzędny wobec wszystkiego innego.

---

## 17. Mapa CI, tras i poleceń

### 17.1 Piętnaście zadań w `.github/workflows/bramki.yml`

`build` · `bramka-kontrakt-tokenow` · `bramka-tokeny-linter` · `bramka-lint` ·
`bramka-parytet` · `bramka-prawdziwosc` · `bramka-cennik` · `bramka-linki` ·
`bramka-kotwice` · `bramka-nojs` · `bramka-dostepnosc` · `bramka-e2e` ·
`bramka-pelny-zestaw` · `bramka-wydajnosc` · `bramka-nieodwracalne`

Sześć z nich potrzebuje `build`. **`bramka-nieodwracalne` jest planowo czerwona
(T2) — to nie jest awaria.** Wyzwalacze: `pull_request`, `push` na `main`
i `faza-*/**`, `workflow_dispatch`.

Blok `concurrency` (wdrożony tej doby, kierunek T22(a)):
```yaml
group: "bramki-${{ github.event.pull_request.head.ref || github.ref_name }}"
cancel-in-progress: true
```
Klucz **nie** z `github.ref` — przy `pull_request` to `refs/pull/N/merge`, więc
klucz z `github.ref` rozdzieliłby dwa przebiegi tej samej gałęzi i defekt wróciłby
w ciszy dokładnie w PR, czyli w chwili merge'u.

**Własność środowiska, której nie widać w pliku:** żaden z 15 kroków
`actions/checkout@v4` nie ustawia `fetch-depth`, więc **klon ma 1 commit** (T23).
Od 2026-08-23 jest to stan **wybrany, nie przeoczony**: D5 przesądziło, że
`fetch-depth: 0` wchodzi wyłącznie do kroków czytających historię, a takich
kroków w bramkach dziś nie ma. Jedyne wywołanie gita to `git rev-parse HEAD`
w `scripts/check-audyt.mjs` — działa na płytkim klonie, bo czyta wskaźnik, nie
przodków. Pierwszym krokiem historycznym będzie strażnik T21.

**Od 2026-08-24 zadań jest 16** — doszła `bramka-deklaracje` (zapadka z progiem odniesienia, T44).

**Limity czasu (od 2026-08-23, D6 → T24).** Każde z **16** zadań ma
`timeout-minutes`: **`bramka-wydajnosc` → 20** i **`bramka-pelny-zestaw` → 20**
(to drugie podniesione z 10 tego samego dnia, po zgłoszeniu cienkiego zapasu),
trzynaście pozostałych → **10**. Domyślne 6 h już nie obowiązuje.
**Zapas policzony z pomiaru** (2026-08-23, przebiegi `32661737288` / `32663550392`,
commity `f2db728` / `d7a2fe3`, oba osiągalne): `Wydajność` 8,05 i 7,90 min → **2,48×**;
`Dostępność` 2,65 min → **3,77×**; `Pełny zestaw e2e` 3,55 min → **5,6×**;
`E2E` 1,03 min → **9,7×**; pozostałe ≥ **18×**. **Najcieńszy zapas ma dziś
`Wydajność`, nie `Pełny zestaw e2e`** — i to jest zapisane jako zgłoszenie, nie
jako zmiana. Każde zadanie ma na końcu krok
`Przyczyna anulowania` pod `if: cancelled()`, który wypisuje adnotację
`::warning` z instrukcją odczytu: **czas krótki (sekundy) = wyparcie przez
`concurrency`, oczekiwane; czas bliski `timeout-minutes` = limit przekroczony,
brak werdyktu.** Bez tego kroku oba przypadki dają identyczny status.
**Nie jest to jeszcze udowodnione mutacją** — patrz T24.

### 17.2 Siedem tras pod pomiarem (`lighthouserc.cjs`)

`/` · `/funkcje` · `/dla-kogo` · `/funkcje/pozyskiwanie` · `/funkcje/tresci` ·
`/funkcje/zespol` · `/funkcje/wyniki`

`numberOfRuns: 5` (linia 189). Progi: **LCP 1800 ms · CLS 0,1 · TBT 200 ms ·
a11y 1**. Werdykt zapada na **przebiegu o medianowym LCP** (`26c38f2`), a nie na
`median-run` Lighthouse'a — patrz rozdz. 12.

### 17.3 Polecenia, które są w `package.json`

**Pomiar wydajności** — kolejność ma znaczenie:
`bramka:preview` (strażnik startowy, tylko `/`) → `bramka:rozgrzewka`
(prowieniencja na **wszystkich 7** trasach) → `bramka:pomiar`
(`lhci collect` + `werdykt-po-lcp.mjs`) → `bramka:po-pomiarze` (klamra
prowieniencji, `if: always()`) → `bramka:margines` (żółty: margines pozorny) →
`bramka:podsumowanie`. Osobno: `bramka:werdykt`, `bramka:tryb-pomiaru`.

**Bramki treści i kodu:** `bramka:tokeny` · `bramka:liczby` · `bramka:parytet` ·
`bramka:kontrakt` · `bramka:linki` · `bramka:kotwice` · `bramka:nojs` ·
`bramka:cennik` · `bramka:nieodwracalne` · `lint`.

⚠ **`bramka:tokeny` to od 2026-08-26 DWA skrypty w łańcuchu**
(`WWW/038-bis`, K6): `lint-tokeny.mjs && straznik-tokenow.mjs`. Pierwszy
pilnuje, żeby wartości wizualne szły przez tokeny (surowe hexy i piksele);
drugi pilnuje **decyzji ADR-031 na wartościach ról** — kompletności 19 ról,
kontrastów par, rozdzielności `fokus`/`akcent`/`interakcja` (R-AKCENT-02),
zakazu akcentu jako koloru tekstu (R-AKCENT-01) oraz powrotu limonki i wagi
100. Drugi da się uruchomić osobno: `bramka:straznik-tokenow`. **Nazwa
zadania CI się nie zmieniła**, więc kto czyta wyłącznie listę zadań, nie
zobaczy, że zakres urósł — stąd ten akapit.

**Czego strażnik tokenów NIE sprawdza** (wypisane, żeby zieleń nie była
czytana szerzej, niż sięga): par ról spoza swojej listy — w tym
`akcent × powierzchnia-akcentowa` = 2,53:1, granicy opisanej w ADR-031 —
barw wyliczonych na wyrenderowanej stronie (od tego jest
`e2e/kontrast-stanow.spec.ts`) ani tego, czy rola jest **używana** zgodnie
z przeznaczeniem.

**Testy:** `test:e2e` · `test:axe` · `bramka:kontrast-stanow`.

**Budowanie:** `build` (poprzedzone `prebuild` → `tokeny:build`, Style
Dictionary). `prepare` ustawia `core.hooksPath .githooks` — dlatego hooki działają
po `npm ci` i dlatego `--no-verify` jest zakazane. `obrazy:pipeline` jest
**narzędziem ręcznym, nie bramką** (T19).

---

## 18. Uczciwa granica tego dokumentu

Rozdziały 12–14 dopisano po pytaniu właściciela „czy to są kompletnie wszystkie
informacje?". Odpowiedź brzmiała: nie — i te rozdziały są tym, co audyt wykrył.
Rozdziały 0, 15–17 i przepisany 11 dopisano po poleceniu „zabezpieczyć system
w razie zakończenia sesji". Obowiązek utrzymywania tego pliku w prawdzie
**na bieżąco** (rozdz. 0, `CLAUDE.md`, T25) dopisano po poleceniu z tego samego
dnia: *„chcę aby plik był aktualizowany na bieżąco po każdej zmianie"*.
Od tej chwili dokument nie jest sprawozdaniem z sesji — jest **stanem
utrzymywanym**, a commit, który go rozjeżdża z rzeczywistością, jest
niekompletny.

Dokument jest kompletny dla **linii pracy T21–T25 i doby 2026-08-19/20**.
Poza nią jest **wskaźnikiem, nie streszczeniem** (rozdział 13). Kto go czyta
i wychodzi poza tę linię, czyta rejestr i ADR-y, a nie ten plik.

**Czego ten dokument NIE gwarantuje, choć mógłby na to wyglądać:**

1. **Liczby są migawkami.** Każda niesie datę i commit, bo taka jest reguła
   kanonu — ale reguła chroni przed *udawaniem faktu*, nie przed
   zdezaktualizowaniem się. Wzorzec do zapamiętania: T15 zmierzone
   2026-08-17 dawało **45**, a dwa dni później **77**, bez jednej zmiany
   w linterze. Zanim oprzesz decyzję na liczbie stąd — zmierz ją ponownie.
2. **Stan zdalny odczytano `git ls-remote` 2026-08-20.** `.git/FETCH_HEAD` miał
   wtedy datę 13 sierpnia, więc lokalne refy `origin/*` były migawką sprzed
   siedmiu dni (zgodną, ale przypadkiem). **Nie ufaj `origin/…` bez `fetch`
   albo `ls-remote`** — to dokładnie klasa „odwołanie do stanu, który przestał
   istnieć", tylko wycelowana w gałąź zamiast w commit.
3. **Zieleń bramek nie jest tu udowodniona dla stanu wypchniętego.** Dla
   `69c2dab` bramka `Dostępność` **nie ma werdyktu** (anulowana po 6 h, T24);
   zieleń dostępności stoi wyłącznie na `b51d0b8`. Sześć commitów czekających na
   push **nie było w CI ani razu**.
4. **Kierunki (b) i (c) mają dowody wyłącznie lokalne** — z udawanego preview
   i z danych z dysku, nigdy z runnera. Do czasu przebiegu CI ich poprawność
   ma status „niesprawdzona na docelowym środowisku", a niesprawdzone liczy się
   jak niedziałające.

---

## 19. Klasy kanonu APLIKACJI bez odpowiednika w kanonie STRONY

**Zlecenie właściciela 2026-08-23: „sama lista, bez przenoszenia".** Przeniesienie
jest decyzją właściciela i wymaga sprawdzenia, czy klasa w ogóle dotyczy treści —
tutaj nie ma żadnej takiej oceny. Podstawa: porównanie `catherly-www/CLAUDE.md`
(kanon ADR-018, **dziesięć** klas od 2026-08-23, rozdział „Prymat nieodwracalnego") z `fbo-os/CLAUDE.md` (442 wiersze),
odczyt obu 2026-08-23. Kontekst: **T40**.

Odwołania `plik:wiersz` po stronie aplikacji są **odczytem stąd, nie weryfikacją
treści** — dokładnie ten sam status co `RECZ-161` w T30. Jeśli tamten plik się
zmieni, ta lista tego nie zauważy.

### 19.1 Brak odpowiednika — dziesięć klas

| # | Klasa w kanonie aplikacji | Gdzie | Czego dokładnie brakuje po stronie strony |
| --- | --- | --- | --- |
| 1 | **ŁOWCA MUTACJI — „znajdź mutację, której naprawa nie łapie, ALBO WYKAŻ, ŻE JEJ NIE MA"** | `fbo-os/CLAUDE.md:101-113` | Kanon strony ma mutację jako formę dowodu, ale **nie ma brzmienia, w którym wynik negatywny jest pełnoprawny**. Źródło notuje, że poprzednie brzmienie zostało **uchylone**, bo premiowało jedną odpowiedź — i że **skrzywienie wpisane do kanonu kosztuje przy każdym użyciu, nie raz**. |
| 2 | **KROK ODBIORU RĘCZNEGO TEŻ MUSI UMIEĆ ZAWIEŚĆ — „krok, który nie potrafi zawieść w warunkach wykonania, nie jest testem, tylko rytuałem"** | `fbo-os/CLAUDE.md:115-145` | Kanon strony obejmuje dowód **automatyczny** (mutacja, kontrola negatywna) i milczy o odbiorze **ręcznym**. Brak trzech podreguł: warunek wykonania jest częścią testu; krok, który po naprawie scenariusza zaczyna padać, jest krokiem **naprawionym**, nie zepsutym; brak sterownika w interfejsie to **„niewykonalne", nie ✅**. |
| 3 | **ZLECENIE NIE PREMIUJE ODPOWIEDZI, KTÓRĄ MA ROZSTRZYGNĄĆ** + **sygnał ILOŚCIOWY: sprawdź ROZKŁAD, zanim spojrzysz na treść** | `fbo-os/CLAUDE.md:185-216` | Strona ma dziesięć zakazów adresowanych do zlecającego (T34), ale **żaden z nich nie dotyczy premiowania odpowiedzi**. Brak też całego sygnału ilościowego: „flaga zapalona na większości zbioru jest zepsuta niezależnie od tego, jak trafnie brzmi w pojedynczym przypadku". Przypadek źródłowy tam: 80 z 85 pozycji z flagą. |
| 4 | **WYKROCZENIE POZA ZLECENIE ZGŁASZASZ PRZED, NIE PO** | `fbo-os/CLAUDE.md:218-242` | Brak w całości. Obejmuje też regułę o **kolizji pamięci trwałej z instrukcją środowiska**: zgłoś sprzeczność, nie wybieraj po cichu jednej strony, bo ciche wybranie ukrywa fakt, że to reguła mogła się zestarzeć. |
| 5 | **NIEZALEŻNOŚĆ POMIARU TO DROGA, NIE FILTR — „cztery metody dzielące jedno źródło danych to jedna metoda"** | `fbo-os/CLAUDE.md:283-312` | Brak w całości, wraz z wynikającym zakazem: **połknięty wyjątek w narzędziu pomiarowym zamienia porażkę w brak wyniku, a brak wyniku w zestawieniu wygląda jak zero**. „Jeśli pomiar nie może się wykonać, ma PAŚĆ, nie milczeć." Strona ma kilka własnych narzędzi pomiarowych w `scripts/`, których ta reguła by dotyczyła. |
| 6 | **NAPRAWA MODELU = INWENTARZ POWIERZCHNI** | `fbo-os/CLAUDE.md:329-347` | Brak w całości. „Nie te, o których pamiętasz — wyszukane komendą, wypisane na liście, każda z werdyktem." Osobno wyróżniona jest **powierzchnia niewidoczna z panelu**. |
| 7 | **POMIAR WARTOŚCI FAZY REFUTACJI — typowy błąd to NADMIERNY ZASIĘG, a refutacja ZAWĘŻA** | `fbo-os/CLAUDE.md:168-183` | Brak w całości. To jest klasa, z której wprost wynika liczba przywołana w **T38** (58% sprawdzeń drugą drogą zmieniło ustalenie). Kanon strony nie zna pojęcia fazy refutacji. |
| 8 | **WARTOŚĆ PRODUKCYJNA TYLKO TAM, GDZIE NIEZBĘDNA — „każde dodatkowe miejsce przechowywania sekretu to dodatkowa powierzchnia wycieku"** | `fbo-os/CLAUDE.md:314-327` | Strona ma **zakaz punktowy** (nie drukuj nagłówków preview, bo `_vercel_jwt` niesie jawnie Protection Bypass — zakaz 2 z T34), ale **nie ma reguły ogólnej o mnożeniu miejsc przechowywania**. Brak też podreguły „hex, nie base64" przy generowaniu sekretów. |
| 9 | **ZERO SKRÓTÓW / ZERO CICHEGO POMIJANIA — nazwana luka zamiast atrapy** | `fbo-os/CLAUDE.md:6-16` | Strona ma węższe „niepewność zgłaszasz, nie zasypujesz" (`CLAUDE.md:135`). Brak części o **zalogowaniu nazwanej luki** i o tym, że kompletność jest obowiązkiem wykonawcy, a nie czytelnika. |
| 10 | **TEST IMPORTUJE, NIE DUPLIKUJE — stała importowana z kodu, nigdy przepisana do testu; test bada WŁASNOŚĆ, nie pierwsze wystąpienie** | `fbo-os/CLAUDE.md:59-97` | Strona ma **skutek** tej klasy (asercja na podciągu wygasa cicho, `CLAUDE.md:37-46`), ale nie ma **przyczyny**: zakazu drugiej kopii prawdy w pliku testu ani reguły „`indexOf` zamiast pętli po wszystkich trafieniach to ta sama klasa błędu w miniaturze". Uwaga dla oceny stosowalności: **T17 tej strony to dokładnie ta wada** — lista tras w `e2e/axe.spec.ts` jest przepisana z ręki. |

### 19.2 Odpowiednik częściowy — klasa ta sama, zasięg inny

| # | Klasa w kanonie aplikacji | Gdzie | Co jest po stronie strony i czym się różni |
| --- | --- | --- | --- |
| 11 | **PUNKT WZNOWIENIA AKTUALIZOWANY PO KAŻDEJ ZMIANIE** | `fbo-os/CLAUDE.md:244-281` | Odpowiednik: **T25** (przekazanie utrzymywane w prawdzie na bieżąco, w tym samym commicie). Dwie różnice: tam stoi **strażnik w haku `pre-commit`**, tutaj nie ma żadnego (decyzja **D4** otwarta); tam obowiązuje **zakaz automatycznego stemplowania daty** — „automat wstawiałby świeży znacznik nad nieprzejrzaną treścią, czyli zielone światło, które niczego nie dowodzi". Ta druga rzecz jest wprost potrzebna przy projektowaniu strażnika z D4. |
| 12 | **ARCHITEKTURA — kontrakty oznaczone „wygląda inaczej, niż działa"** | `fbo-os/CLAUDE.md:147-166` | Odpowiednik: klasa **„wygląda na regułę werdyktu przy pobieżnym czytaniu"** (`catherly-www/CLAUDE.md:110-122`). Różnica zasięgu: tam **praktyka inwentarzowa** (21 kontraktów z dowodem `plik:linia`, dziewięć oznaczonych), tutaj **pojedyncza klasa ograniczona do plików konfiguracyjnych**. |
| 13 | **Guardrails — kolory wyłącznie przez tokeny, a11y ≥ WCAG AA** | `fbo-os/CLAUDE.md:48-57` | Po stronie strony żyje jako **bramki** (`bramka:tokeny`, axe, bramka kontrastu), nie jako klasa kanonu. Różnica nie jest kosmetyczna: bramka bez wpisu w kanonie znika razem z bramką. |

### 19.3 Poza porównaniem — związane z produktem, nie z klasą wady

`ZASADA ARCHITEKTONICZNA #1` (IR zamiast surowego JSON-a Fabric, `:25-33`) ·
pełna edytowalność (`:35-40`) · integrate-not-duplicate (`:42-46`) · zasada
kosztowa modułów · model produktu „jeden silnik + profile firm" · nazwy i komendy
głosowe. Wypisane dla kompletności — dotyczą kodu generatora, nie klas wad.

### 19.4 Czego ta lista NIE zawiera

Kierunku odwrotnego: **które klasy kanonu strony nie mają odpowiednika
w kanonie aplikacji**. Zlecenie prosiło o jeden kierunek i tylko ten został
wykonany. Kandydaci widoczni z tej strony bez wykonywania pomiaru: „skażenie
pomiaru sprawdza się wstecz", „raport, którego nikt nie czyta", „dokument
z zadeklarowanym zakresem się nie starzeje" oraz **dziesięć zakazów adresowanych
do zlecającego**. Lista w drugą stronę — na słowo właściciela.
