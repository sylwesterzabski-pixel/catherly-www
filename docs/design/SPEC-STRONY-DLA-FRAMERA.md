# SPEC-STRONY-DLA-FRAMERA · catherly-www · 2026-09-01

**SHA HEAD w chwili pomiaru:** `git rev-parse --short HEAD` — uruchom komendę przed użyciem spec.  
**Granice dokumentu:** Opisuje wyłącznie to, co jest w repozytorium lub zmierzone komendą na żywych Framer URL.  
Czego nie ma → `[BRAK]`. Liczby wzorca Framera: `[LIMIT-URL]` (CSS z SSR — bez computed styles).  
Dokument nie zawiera projektu nowej strony — opisuje stan istniejący jako wejście do Framera.

**Źródło:** 9 agentów równoległych (A1–A7abc + A6 kontrola). Data pomiaru: 2026-09-01.  
**Agenci krzyżowo weryfikowali twierdzenia przed scaleniem.** Korekty linii z A6: K-1 (sciezki.ts l.14), K-2 (l.60), K-3 (page.tsx l.107).

---

## §1 Mapa serwisu

| Trasa (bez locale) | PL | EN | DE | Cel strony | Typ |
|---|---|---|---|---|---|
| `/` | `/` | `/en` | `/de` | Prezentacja produktu od hero do CTA | główna |
| `/funkcje` | `/funkcje` | `/en/funkcje` | `/de/funkcje` | Indeks 4 filarów wg rytmu dnia | podstrona |
| `/funkcje/pozyskiwanie` | `/funkcje/pozyskiwanie` | `/en/funkcje/pozyskiwanie` | `/de/funkcje/pozyskiwanie` | 10 modułów + AI (Filar 1) | podstrona |
| `/funkcje/tresci` | `/funkcje/tresci` | `/en/funkcje/tresci` | `/de/funkcje/tresci` | 9 modułów + AI (Filar 2) | podstrona |
| `/funkcje/zespol` | `/funkcje/zespol` | `/en/funkcje/zespol` | `/de/funkcje/zespol` | 6 modułów (Filar 3) | podstrona |
| `/funkcje/wyniki` | `/funkcje/wyniki` | `/en/funkcje/wyniki` | `/de/funkcje/wyniki` | 6 modułów (Filar 4) | podstrona |
| `/cennik` | `/cennik` | `/en/cennik` | `/de/cennik` | Plany, tabela porównawcza, FAQ płatności | podstrona |
| `/dla-kogo` | `/dla-kogo` | `/en/dla-kogo` | `/de/dla-kogo` | 3 ścieżki rozpoznania (solo/zespół/struktura) | podstrona |
| `/login` | `/login` | `/en/login` | `/de/login` | Zaślepka logowania (placeholder Fazy 5) | zaślepka |
| `/nie-znaleziono` | `/nie-znaleziono` | `/en/nie-znaleziono` | `/de/nie-znaleziono` | 404 prerenderowana (middleware rewrite) | błąd |
| `/[...sciezka]` | catch-all | catch-all | catch-all | Zawsze `notFound()` — dla nawigacji klienckiej | catch-all |

Wszystkie trasy SSG (`generateStaticParams` — 3 locale). Zero JS klienckiego na każdej.  
Routing: `locales: ["pl","en","de"]`, `defaultLocale: "pl"`, `localePrefix: "as-needed"` — pl bez prefiksu.  
Źródło: `src/i18n/routing.ts`, weryfikacja: A5+A6.

---

## §2 Strony — sekcje i treść

### §2.1 Strona główna (`/`)

Cel: pełna prezentacja produktu — od problemu do CTA, bez podstron funkcji.

Kolejność renderowania wg `src/app/[locale]/page.tsx`: Nawigacja (l.59) → Hero (l.61) → SekcjaTekstowa-problem (l.64) → SekcjaTekstowa-definicja (l.82) → KartyFunkcji (l.99) → PasMozliwosci (l.104) → Filar×4 (l.107) → DbanieOSiebie (l.139) → SekcjaRytmu (l.142) → CennikSkrot (l.154) → Faq-obawy (l.178) → Zamkniecie (l.193) → Stopka (layout).

#### §2.1.1 Nawigacja (S1)
- Cel: orientacja + CTA + dostępność językowa
- Logo: tekst CSS `Catherly` (bez grafiki) → `/`
- Linki: `/funkcje`, `/cennik`, `/dla-kogo` (klucze: `Nawigacja.funkcje`, `Nawigacja.cennik`, `Nawigacja.dlaKogo`)
- CTA: "Logowanie" → `/login` (klucz: `Nawigacja.logowanie`)
- Hamburger: `<details>/<summary>` bez JS, pojawia się przy breakpoincie `48rem` (`design/tokens.json`)
- Skip-link: "Przejdź do treści" / "Skip to content" / "Zum Inhalt springen" → `#tresc`
- Obraz: SLOT PUSTY — logo jest tekstem
- Źródło: `src/components/Nawigacja.tsx:31-117`; menu: `src/i18n/sciezki.ts:14-17` (K-1: linia 14 wg A6)

#### §2.1.2 Hero (S2)
- Cel: jedyny H1, element LCP, pierwsze wrażenie + dwupoziomowy zaufanie
- Elementy: H1 + lead + CTA button + 2× potwierdzenie + zrzut Z6 (warstwa a) + dekoracja fala2 (warstwa b, ≥90rem)
- TREŚĆ PL:
  - H1: `Hero.naglowek` → "Rozmawiasz z ludźmi — Catherly prowadzi kontakty i wyniki."
  - Lead: `Hero.podtytul` → "Catherly to system do własnej sprzedaży bezpośredniej — kontakty, treści, zespół i wyniki w jednym miejscu."
  - CTA: `Hero.cta` → "Sprawdź, jak działa" → `/funkcje`
  - Potwierdzenie 1: `Hero.potwierdzenieUE` → "Dane przechowywane w UE"
  - Potwierdzenie 2: `Hero.potwierdzenieRezygnacja` → "Rezygnacja w każdej chwili"
- TREŚĆ EN: "You do the talking — Catherly keeps track of contacts and results." / "Catherly is a system for running your own direct selling — contacts, content, team, and results in one place." / "See how it works"
- TREŚĆ DE: "Du sprichst mit Menschen – Catherly führt deine Kontakte und Ergebnisse." / "Catherly ist ein System für deinen eigenen Direktvertrieb – Kontakte, Inhalte, Team und Ergebnisse an einem Ort." / "Sieh dir an, wie es funktioniert"
- Obraz warstwa (a): `public/obrazy/filary/filar-1-dmo` + srcset 480/768/1280/2048px AVIF+WebP+PNG, eager, `<picture>` + `<img>` z alt (`ObrazyFilarow.filar1`)
- Obraz warstwa (b): `public/obrazy/fala2/mockup-glowny-16x9.avif` — CSS `background-image`, `aria-hidden` przez konstrukcję, tylko ≥90rem (`Hero.module.css:167`, media query l.123)
- Mobile: jedna kolumna, obraz warstwa (b) niewidoczny, zrzut Z6 pod tekstem
- Desktop ≥72rem (wyjątek!): dwie kolumny 4fr 2fr (ADR-029) — tekst lewa, zrzut prawa
- Stany: CTA hover (kolor interakcji `#a0e00d`), CTA focus (visible ring)
- Źródło: `src/components/Hero.tsx`

#### §2.1.3 SekcjaTekstowa — Problem (S3, id: `problem-h2`)
- Cel: "słyszalna kropka" — opisuje bolesność codzienności bez Catherly
- Elementy: H2 (akcent) + treść + zdanie-kropka
- TREŚĆ PL:
  - H2: `Problem.naglowek` → "**Wszystko gdzieś jest.** Każde gdzie indziej." (tag `<akcent>` = limonkowe wyróżnienie)
  - Treść: `Problem.tresc` → "Posty robisz wtedy, kiedy dom już śpi. Rano szukasz numeru, który gdzieś przecież zapisałaś. O tym, co w zespole, dowiadujesz się później, niż byś chciała."
  - Kropka: `Problem.kropka` → "Wieczorem siadasz do zeszytu i liczysz, co z tego wyszło."
- TREŚĆ EN: "**Everything is somewhere.** Each thing somewhere else." / treść analogiczna
- TREŚĆ DE: "**Alles ist irgendwo.** Nur nichts am selben Ort." [LUKA-PARYTET: DE różni drugą część]
- Obraz: SLOT PUSTY — zero `<picture>`/`<img>` w komponencie (weryfikacja A3)
- Mobile: pełna szerokość, bez kolumn

#### §2.1.4 SekcjaTekstowa — Definicja (S4, id: `definicja-h2`)
- Cel: pozycjonowanie — jeden rzeczownik opisujący Catherly
- TREŚĆ PL:
  - H2: `Definicja.naglowek` → "Catherly to **pamięć twojej sprzedaży**" (akcent = limonkowe)
  - Treść: `Definicja.tresc` → "Catherly pamięta to, co dotąd trzymałaś w głowie i notesach: komu co obiecałaś, jakie treści wysłałaś której klientce i co się sprzedało. Zespół też masz pod ręką — widzisz, kogo wprowadzasz i jak jej idzie. Sprzedajesz po swojemu, tylko już nie z pamięci."
- TREŚĆ EN: "Catherly is **the memory of your selling**" / treść analogiczna
- TREŚĆ DE: "Catherly ist **das Gedächtnis deines Vertriebs**"
- Obraz: SLOT PUSTY

#### §2.1.5 KartyFunkcji (sekcja 2.3)
- Cel: 6 kart funkcji — szybki przegląd możliwości
- Elementy: 6 kart (tytuł + opis), bez własnego H2 [BRAK NAGŁÓWKA SEKCJI — odnotowane w ADR-047]
- Treść: tytuły kart to cytaty z kluczy `*_nazwa` z podstron funkcji; opisy z kluczy `*.korzysc` z `Filary.*` — BRAK własnych kluczy `KartyFunkcji` w i18n (decyzja ADR-047: unika duplikacji)
- Ikony kart: SLOT PUSTY — wzorzec Habitline ma SVG 18×10px, u nas brak zestawu ikon [BRAK-1]
- Geometria (ADR-047): 3 karty × 370px / gap 30px; promień 9px; padding 24px; tytuł 24px/500
- Obraz: SLOT PUSTY

#### §2.1.6 PasMozliwosci (sekcja 2.5)
- Cel: ruchomy pas z nazwami modułów — dowód na zakres produktu
- Elementy: poziomy marquee z 8 nazwami możliwości
- Treść: BRAK KLUCZY I18N — nazwy prawdopodobnie z kodu lub `content/` [BRAK-2]
- Prędkość: pl −75,0 px/s (zmierzone, ADR-047); en −67,7 px/s; de −71,1 px/s (proporcjonalne do długości)
- `prefers-reduced-motion`: animacja zatrzymana
- Wzorzec Habitline: analogiczny "social proof band" z hashtagami

#### §2.1.7 Filary ×4 (S5–S8, id: `filar-1-h2` … `filar-4-h2`)
- Cel: 4 filary produktu — szczegółowy opis każdego z 3 konkretnymi dowodami
- Układ desktop (≥48rem): tekst 135px / obraz 770px / odstęp 100px / promień 12px (ADR-047)
- Układ mobile: jedna kolumna; obraz nad tekstem
- Wariant per filar:

**Filar 1 — Pozyskiwanie** (`filar-1-h2`):
- H2: `Filary.filar1.naglowek` → "Rano widzisz, do kogo się odezwać."
- Korzyść: `Filary.filar1.korzysc` → "Masz plan działania i bazę, która rośnie, gdy ty prowadzisz rozmowy."
- Konkret 1: `Filary.filar1.konkret1` → "DMO układa kolejność rozmów — zaczynasz dzień bez zastanawiania się."
- Konkret 2: `Filary.filar1.konkret2` → "Przypomnienie chwilę przed spotkaniem, żebyś była gotowa, nie zaskoczona."
- Konkret 3: `Filary.filar1.konkret3` → "Każda polecona osoba przychodzi ze śladem — wiesz, kto ją polecił."
- Obraz: `public/obrazy/filary/filar-1-dmo` (warstwa a, Playwright, ekran DMO), srcset 480–2048px
- Alt: `ObrazyFilarow.filar1` → "Ekran Dziennego Planu Działania (DMO) w aplikacji Catherly: liczniki zadań na dany dzień z celami i paskami postępu."

**Filar 2 — Treści** (`filar-2-h2`):
- H2: `Filary.filar2.naglowek` → "Piszesz. Tarcza sprawdza. Pieczęć potwierdza."
- Korzyść: `Filary.filar2.korzysc` → "Studio uczy się twojego głosu i pilnuje, żeby żadna treść nie złamała twoich zasad."
- Konkrety: `Filary.filar2.konkret1–3` (szablony, Tarcza, Pieczęć Etyczna)
- Obraz: `public/obrazy/filary/filar-2-tarcza` (warstwa a, ekran Tarczy)
- Alt: `ObrazyFilarow.filar2`

**Filar 3 — Zespół** (`filar-3-h2`):
- H2: `Filary.filar3.naglowek` → "Nowa osoba wie, co robić od pierwszego dnia" [LUKA-PARYTET DE: "Partnerin"]
- Korzyść: `Filary.filar3.korzysc` → "Zamiast tłumaczyć od nowa każdemu — kreator wdrożeniowy robi to za ciebie."
- Obraz: `public/obrazy/filary/filar-3-pierwsze-90-dni` (warstwa a, ekran Pierwszych 90 Dni)

**Filar 4 — Wyniki** (`filar-4-h2`):
- H2: `Filary.filar4.naglowek` → "Widzisz wzrost nawet po trudnym dniu"
- Korzyść: `Filary.filar4.korzysc` → "Pulpit pokazuje dzisiejszy stan, a twoje wyniki mają dowód, który zostaje."
- Obraz: `public/obrazy/filary/filar-4-wrapped` (warstwa a, ekran Twojego Wrapped)

#### §2.1.8 DbanieOSiebie (S9)
- Cel: Wall of Proof — celebracja pracy, nie tylko metryki
- H2: `DbanieOSiebie.naglowek` → "Dbanie o siebie" [LUKA-PARYTET DE: "Für dich selbst" — fraza przyimkowa]
- Treść: `DbanieOSiebie.tresc` → "Zbierasz dowody swojej pracy na Wall of Proof. To przestrzeń, w której świętujesz, nie tylko mierzysz."
- Obraz: **SLOT PUSTY** — komponent nie ma `<picture>`/`<img>` (weryfikacja A3)

#### §2.1.9 SekcjaRytmu (S10, id: `rytm-h2`)
- Cel: rytm dnia z Catherly — 3 pory dnia
- H2: `RytmDnia.naglowek` → "Jak wygląda twój dzień z Catherly"
- 3 kroki:
  - `RytmDnia.krok1Nazwa` "Rano" + `RytmDnia.krok1Tresc` "Otwierasz Dzienny Plan Działania…"
  - `RytmDnia.krok2Nazwa` "W ciągu dnia" + `RytmDnia.krok2Tresc` "Zaglądasz do bazy kontaktów…"
  - `RytmDnia.krok3Nazwa` "Wieczorem" + `RytmDnia.krok3Tresc` "Na Pulpicie masz swój dzień i dzień zespołu obok siebie."
- Kropka: `RytmDnia.kropka` → "Wieczorem widzisz, co z tego wyszło."
- Fala1 (przeznaczona do wycofania przy przebudowie): alt texty `ObrazyFala1.*` — 8 kluczy opisujące fotografie (stół, biurko, notes, kalendarz itp.)
- Obraz: na podstronach `/funkcje/*` — `public/obrazy/fala1/*.avif` (SLOT DO WYCOFANIA)

#### §2.1.10 CennikSkrot (S11)
- Cel: skrót cennika na głównej + link do pełnego
- H2: `CennikSkrot.naglowek` → "Cennik w skrócie"
- Różnica: `CennikSkrot.roznica` → "Wszystkie plany prowadzą twoje kontakty i wyniki — Growth dodaje do tego widok całego zespołu."
- Link: `CennikSkrot.link` → "Zobacz pełny cennik" → `/cennik`
- Geometria (ADR-047): 3 karty × 370px, gap 30px, promień 5px, padding 35/40px
- Plakietka Growth: `Cennik.plakietkaPolecany` → "Polecany na start zespołu" [kontrast 10,22:1 w każdym języku]

#### §2.1.11 Faq — Obawy (S12, id: `obawy-h2`)
- Cel: FAQ 6 obaw — accordion
- H2: `Obawy.naglowek` → "Sześć obaw"
- 6 par (p1–p6 / o1–o6):
  - p1 "Co jeśli znowu nie ogarnę nowej aplikacji?" / o1 "Kreator wdrożeniowy prowadzi cię krok po kroku…"
  - p2 "A te kontakty, które już mam w innych miejscach?" / o2 "Importu hurtowego nie ma — kontakty wpisujesz ręcznie lub przez formularz…"
  - p3 "A jeśli przestanę płacić — znikną mi dane?" / o3 "Rezygnujesz kiedy chcesz. Eksportujesz kontakty do vCard…"
  - p4 "Mam dane klientek. Kto jeszcze je widzi?" / o4 "Do twojego konta masz dostęp tylko ty. Tarcza kontroluje etyczność treści…"
  - p5 "Prawie nie siadam do komputera — to zadziała?" / o5 "Projektowane pod telefon od początku — nie ma okrojonej wersji."
  - p6 "Moja firma ma regulaminy. Czy mogę używać zewnętrznych narzędzi?" / o6 "Paszport zgodności skanuje treść pod wymagania czterech jurysdykcji…"
- [BRAK TREŚCI T53]: sekcja opinii (Testimonials) — BRAK komponentu. Decyzja: warunek powrotu T53; duplikat z FAQ + brak cudzego świadectwa
- Stany: akordeon — otwarte/zamknięte per para

#### §2.1.12 Zamkniecie — CTA (S13)
- Cel: ostatnia zachęta przed stopką → `/funkcje`
- CTA: `ZamkniecieGlowna.cta` → "Sprawdź, jak działa"
- Zdanie: `ZamkniecieGlowna.zdanie` → "Rezygnujesz w każdej chwili."
- Geometria (ADR-047): padding 0/135/135px, nagłówek 800px, CTA 46,4px wys., promień 50px

#### §2.1.13 Stopka (S14, z layoutu)
- Cztery sekcje: Mapa strony / Język / Dokumenty (wszystkie martwe) / Kontakt (martwy)
- Separator: **kreska** bez tła (wzorzec — tło stopki identyczne z resztą strony, ADR-047 §2.8)
- Mapa strony: `/` + `/funkcje` (+ 4 dzieci) + `/cennik` + `/dla-kogo` — bez `/login`
- Język: 3 linki → `/` (Polski) / `/en` (English) / `/de` (Deutsch)
- Dokumenty: regulamin, prywatnosc, ciasteczka, przetwarzanieDanych → tekst "wkrótce", bez linków
- Kontakt: "wkrótce", bez linku
- Linki wychodzące: **BRAK** (zero linków zewnętrznych w całym serwisie — A5)

---

### §2.2 Cennik (`/cennik`)

Cel: plany, tabela porównawcza, FAQ płatności, CTA do `/login`.

Kolejność: Nawigacja → H1+wstęp → SekcjaPlanow → TabelaPorownawcza → Faq (4 pary) → PasekPotwierdzen (×3) → Zamkniecie

**H1:** `Cennik.naglowek` → "Plany różnią się zakresem, nie obietnicami"  
**Wstęp:** `Cennik.wstep` → "Każdy plan to ten sam system. Różnica leży w zakresie — od twoich pierwszych kontaktów po całą strukturę zespołu."

**Przełącznik cyklu:** `Cennik.okresLegenda` "Okres rozliczenia" + miesięcznie/rocznie + `Cennik.oszczedzasz "{kwota}"`  
Implementacja: dwa `<input type="radio">` (SekcjaPlanow.tsx:60+70) — CSS toggle, zero JS.

**3 karty planów:**
- Starter: `Cennik.plany.starter.dlaKogo` → "Dla ciebie, jeśli zaczynasz…" / 5 pozycji listy / cena [BRAK — z Stripe]
- Growth: `Cennik.plany.growth.dlaKogo` → "Dla ciebie, jeśli budujesz zespół…" [LUKA-PARYTET DE: "Partnerinnen"] / dopisek "Wszystko ze Startera, a do tego:" / 2 pozycje
- Pro: `Cennik.plany.pro.dlaKogo` → "Dla ciebie, jeśli prowadzisz dużą strukturę…" / dopisek / 4 pozycje
- Plakietka Growth: `Cennik.plakietkaPolecany` → "Polecany na start zespołu"

**Tabela porównawcza:** 12 wierszy (zakres/kontakty/zespół/posty/sesje/kalendarz/puls/drzewo/ranking+API+webhooki) z wartościami "bez limitu/w planie/poza planem" per Starter/Growth/Pro.  
Klucz caption: `Cennik.tabela.caption` → "Porównanie planów"

**FAQ cennik (4 pary):**
- p1/o1: waluta — PL: "Ceny na tej stronie są w złotych…" | EN/DE: "Ceny w euro" [LUKA-PARYTET: odwrócona kolejność walut — celowa różnica rynkowa]
- p2/o2: zmiana planu
- p3/o3: rezygnacja
- p4/o4: eksport danych

**PasekPotwierdzen (×3):** `Cennik.potwierdzenie1/2/3` → "Rezygnacja w każdej chwili" / "Eksport danych zawsze: vCard i CSV" / "Dane przechowywane w UE"

**Zamkniecie CTA:** `ZamkniecieCennik.cta` "Wybierz plan" / `ZamkniecieCennik.zdanie` "Wybierz plan i sprawdź, jak działa Catherly…"

---

### §2.3 Dla kogo (`/dla-kogo`)

Cel: 3 ścieżki rozpoznania — które problemy rozwiązuje per profil użytkowniczki.

Kolejność: Nawigacja → NaglowekPodstrony → SpisTresci → SciezkaRozpoznania×3 → Zamkniecie

**H1:** `DlaKogo.naglowek` → "Pracujesz sama, budujesz zespół albo prowadzisz strukturę."  
**Lead:** `DlaKogo.zdanie` → "Przy każdej z tych dróg co innego jest trudne…"

**3 ścieżki (kotwice: `pracujesz-sama`, `budujesz-zespol`, `prowadzisz-strukture`):**
- s1: `DlaKogo.s1_h2` "Wszystko trzymasz jeszcze w głowie i w wiadomościach." / `DlaKogo.s1_plan`
- s2: `DlaKogo.s2_h2` "Masz zespół. Pytanie, komu dziś pomóc, a komu nie przeszkadzać." / s2_plan_1 + s2_plan_2
- s3: `DlaKogo.s3_h2` "Struktura urosła, a decyzje wciąż przechodzą przez ciebie." / s3_plan_1/2/3

**CTA:** `DlaKogo.cta` "Sprawdź, jak działa" / `DlaKogo.ctaZdanie` "Rezygnujesz w każdej chwili."  
**Link cennik:** `DlaKogo.cennikLink` "Zobacz cennik"

---

### §2.4 Funkcje — indeks (`/funkcje`)

**H1:** `FunkcjeIndeks.h1` → "Funkcje ułożone tak, jak idzie twój dzień"  
**Lead:** `FunkcjeIndeks.zdanie` → "Wybierasz to, co masz teraz do zrobienia…"

4 bloki (`BlokZadaniaDnia`): Rano/Siadasz do postów/Nowa osoba/Wieczorem — każdy z `blok1Naglowek`, `blok1Wprowadzenie`, `blok1Link` ("Zobacz wszystko o pozyskiwaniu/treściach/zespole/wynikach"), `blok1Oznaczenie` [LUKA-PARYTET DE: "Ausblick:" zamiast "— kierunek w"]

Nota o Asystencie AI: `FunkcjeIndeks.f8_2` → "Asystenta AI nie dostajesz w żadnym planie."

---

### §2.5–§2.8 Podstrony funkcji (`/funkcje/pozyskiwanie`, `/tresci`, `/zespol`, `/wyniki`)

Każda ma: Nawigacja → Okruszki → NaglowekPodstrony → SpisTresci → ModulFunkcji×N → [SekcjaKierunku AI] → PlanJednymWierszem → PrzejsciaFilarow → Zamkniecie

Okruszki: `okruszkiAria` "Jesteś tutaj" + `okruszek` nazwa obszaru [LUKA-PARYTET DE: `FunkcjePozyskiwanie.okruszek` = "Kontakte gewinnen" zamiast jednego słowa]

Moduły (przykład Pozyskiwanie — 10 modułów):
Każdy moduł: `mod1_nazwa` + `mod1_poco` (opis pozytywny) + `mod1_nie` (granica możliwości — czego NIE robi)
Moduły Pozyskiwanie: formularz zgłoszeniowy, kalendarz z przypomnieniami, subskrypcja kalendarza, eksport vCard, kod QR, program poleceń, DMO, Zadania, Sala Treningowa, plany rozmów i debriefy

Moduły Treści: Studio, szablony z wersjonowaniem, zestawy hashtagów, kalendarz publikacji, zatwierdzanie u liderki, Tarcza, Pieczęć Etyczna, uczenie profilu głosu, tablica postów

Moduły Zespół: kreator wdrożeniowy, zatwierdzanie treści, Pierwsze 90 Dni, Osiągnięcia, Paszport zgodności, Akademia  
Uwaga: `/funkcje/zespol` nie ma `SekcjaKierunku` (brak AI na tej podstronie)

Moduły Wyniki: Pulpit, Twój Wrapped, Cel z kamieniami milowymi, Ściana sukcesów, Świadectwo, Wall of Proof

Obrazy na podstronach: `public/obrazy/fala1/` — 2 kadry per podstrona (A + B, 4:5 lub 21:9), **PRZEZNACZONE DO WYCOFANIA** przy przebudowie wg wzorca Framer (decyzja WWW/050-FINAL).

PrzejsciaFilarow: nawigacja między filarami — "← Wstecz" / "Dalej →" z kluczami `f9Wstecz`/`f9Dalej`.  
Na `/funkcje/wyniki` prawy slot pusty (ostatni filar).

---

### §2.9 Login (`/login`)

Cel: zaślepka — placeholder do Fazy 5.  
Treść: `StronaLogowania.tresc` → "Logowanie będzie dostępne przy premierze aplikacji."  
Link powrotu: `Wspolne.stronaGlowna` "Strona główna" → `/`  
Brak H1 na tej stronie.

---

### §2.10 Nie znaleziono (`/nie-znaleziono`)

**H1:** `NieZnaleziono.naglowek` → "Tej strony nie ma."  
**Link:** `NieZnaleziono.wroc` → "Wróć na stronę główną."

---

## §3 Komponenty wspólne

### §3.1 Nawigacja (`src/components/Nawigacja.tsx:31-117`)

DOM:
```
skip-link → #tresc (l.35)
header
  a.logo → "/" = "Catherly" (tekst, brak grafiki)
  details (hamburger bez JS) (l.66)
  div#menu-glowne (l.73)
    nav[aria-label="Nawigacja główna"] (l.77)
      ul > li × 3: /funkcje · /cennik · /dla-kogo
    a.logowanie → "/login"
```

`aria-current`: ścieżka dokładna → "page", podścieżka rodzica → "true", reszta → `undefined`  
Źródło linków: `src/i18n/sciezki.ts:14-17` (K-1: korekta A6)  
Breakpoint hamburger: 48rem (`design/tokens.json:wymiar.prog-ukladu`)

### §3.2 Stopka (`src/components/Stopka.tsx:52-144`)

4 sekcje (`<section>`):
- Mapa strony: linki wewnętrzne (l.62-107)
- Język: pl/en/de (l.109-124)  
- Dokumenty: martwe, "(wkrótce)" (l.125-133)
- Kontakt: martwy (l.135-141)

Separator: **kreska** — tło stopki identyczne jak strona (`#070806`).  
MAPA_STOPKI: `src/i18n/sciezki.ts:60` (K-2: korekta A6)

### §3.3 CTA Button

Typ: `<a href>` (nie `<button>`) — link do sekcji/strony, nie formularz.  
Geometria: wysokość 46,4px, promień 3,125rem (50px, token `promien-pigulki`), padding `0.75rem 2rem`.  
Kolor: `akcent=#a0e00d` tło, `tekst-na-interakcji=#231f20` tekst — kontrast zmierzony.  
Stany: hover (ciemniejszy akcent), focus (visible ring).

### §3.4 Karty Funkcji (KartyFunkcji, SekcjaPlanow)

Karty filarów: promień 12px, bez obramowania (rozdzielone kompozycją — 4. mechanizm ADR-047).  
Karty cennikowe: promień 5px, 3 kolumny × 370px, gap 30px, padding 35/40px.  
Karta Growth wyróżniona: plakietka tekst "Polecany na start zespołu" (akcent bg, kontrast 10,22:1).

### §3.5 FAQ Akordeon (Faq)

Strona główna: 6 par (Obawy). Cennik: 4 pary (pytania o płatność).  
Implementacja: `<details>`/`<summary>` bez JS (jak hamburger).  
Stany: otwarty/zamknięty per para; `aria-expanded` implikowane przez `details`.

### §3.6 Przełącznik cyklu cennikowego (SekcjaPlanow)

Dwa `<input type="radio">` — miesięcznie/rocznie (SekcjaPlanow.tsx:60+70).  
CSS toggle bez JS. Ceny z Stripe — wartości liczbowe z `content/facts.json` (zakaz literalnych liczb w JSX).

### §3.7 Pas zaufania (PasekPotwierdzen, Hero)

Wymagana treść per ADR-002 i kanon — musi pojawić się w Hero I w stopce/cennik:  
- "Dane przechowywane w UE" / "Data stored in the EU" / "Daten in der EU gespeichert"
- "Rezygnacja w każdej chwili" / "Cancel at any time" / "Kündigung jederzeit"
- (tylko cennik) "Eksport danych zawsze: vCard i CSV"

---

## §4 Ograniczenia i zakazy

Każda pozycja z adresem źródłowym. Nic z domysłu.

### §4.1 Dostępność — progi twarde (bramki CI)

| Wymóg | Wartość | Źródło |
|---|---|---|
| Kontrast tekst | ≥ 4,5:1 | ADR-002, CLAUDE.md |
| Kontrast UI i granice | ≥ 3:1 | WCAG 1.4.11 |
| Cel dotykowy | ≥ 44px domyślnie [D-1] | Decyzja właściciela ⚑9, REJESTR-ODBIORU-PRZEKAZAN.md |
| Akcje pod hoverem widoczne na dotyku | obowiązek [D-2] | j.w. — 15 wystąpień w applikacji, 0 w www |
| Ruch | `prefers-reduced-motion: reduce` → statyczne | CLAUDE.md |
| Focus visible | wymagany wszędzie | ADR-002 |
| Skip-link | do `#tresc` | Nawigacja.tsx:35 |
| Landmarki | `<header>`, `<nav>`, `<main>`, `<footer>` | WCAG |

**Zmierzone pary kontrastu** (z `design/tokens.json`):
- `tekst-podstawowy (#fff)` na `tlo (#070806)`: ~21:1
- `tekst-podstawowy (#fff)` na `powierzchnia (#131412)`: ~17:1
- `akcent (#a0e00d)` na `tlo (#070806)`: ~11:1 (tekst)
- `tekst-na-interakcji (#231f20)` na `akcent (#a0e00d)`: ~10:1

**D-1 i D-2 z toru 5:** PRZYJĘTE, DO WYKONANIA przy przebudowie na wzorzec Framer — nie zaimplementowane dziś.  
Źródło: `docs/faza-2/REJESTR-ODBIORU-PRZEKAZAN.md §1`

### §4.2 Zakazy treści

| Zakaz | Źródło |
|---|---|
| Wzmianki o konkretnych firmach z branży, logotypów | CLAUDE.md "Zakazy bezwzględne" |
| Zdjęcia realnych osób | CLAUDE.md "TWARZE" — zakaz bezwzględny. Twarze generowane (nieistniejące osoby) DOZWOLONE przy zatwierdzeniu imiennym per kadr |
| Zmyślone liczby, opinie, klientki | CLAUDE.md; każda liczba z `content/facts.json` |
| Ciemne wzorce: pop-upy, pilność, ukryte ceny, wymuszanie rejestracji | ADR-003 |
| Zmyślone opinie za flagą | T53 — warunek powrotu, brak komponentu |
| Literalne liczby w JSX | linter — muszą być z `content/facts.json` |
| Wartości wizualne spoza `design/tokens.json` | CLAUDE.md; bramka CI |

### §4.3 Ograniczenia obrazowe (ADR-037)

**Warstwa (a) — DOWÓD PRODUKTU:** wyłącznie zrzuty Playwright na danych demo, sumy SHA-256 z pipeline.  
**Warstwa (b) — DEKORACJA:** stylizowane 3D bez czytelnego tekstu — DOZWOLONE.  
**Próba rozstrzygająca:** "czy odwiedzająca, patrząc na ten obraz, mogłaby uznać, że tak wygląda aplikacja?" — granica: czytelny tekst w panelu.  
**Separator warstw w kodzie musi być jawny.**  
Źródło: `docs/adr/037-*.md` + CLAUDE.md "OBRAZ PRODUKTU"

### §4.4 Ruch (zakazy)

"Teatr" — ruch bez celu informacyjnego — ZAKAZANY. Ruch celowy z `prefers-reduced-motion`.  
Wejście strony głównej zmierzone (ADR-047): zanik 330–333 ms / przesuw 248–250 ms (oba zadeklarowane jako 400/420 ms, mierzone niżej przez ucięcie ease-out).

### §4.5 Typografia — wymogi twarde

| Wymóg | Wartość | Źródło |
|---|---|---|
| Fonty: tylko self-hosted | inter-var.woff2 (39,8 kB) + satoshi-medium.woff2 (17,3 kB) | ADR-040, `public/fonts/` |
| Subset: pl + de | wymagany | ADR-040 |
| Budżet fontów | [BRAK pomiaru — do sprawdzenia] | ADR-040 |
| Jeden motyw (ciemny) | tło #070806, brak dark-mode toggle | ADR-009 |

Tokeny typografii (z `design/tokens.json`):

| Token | Wartość rem | Wartość px (szacunkowe) |
|---|---|---|
| `tekst.xs` | 0.875 | ~14 |
| `tekst.s` | 1.0 | 16 |
| `tekst.m` | 1.25 | 20 |
| `tekst.l` | 1.5625 | 25 |
| `tekst.xl` | 1.9375 | 31 |
| `tekst.h1` | 4.375 | 70 |
| `tekst.h1-srednie` | 3.3125 | 53 |
| `tekst.h1-male` | 2.125 | 34 |
| `tekst.h2` | 3.75 | 60 |
| `tekst.h2-srednie` | 2.625 | 42 |
| `tekst.h2-male` | 2.375 | 38 |
| `waga.tekst` | 500 | — |
| `waga.naglowek` | 500 | — |
| `waga.mocna` | 700 | — |
| `interlinia.tekst` | 1.8 | — |
| `interlinia.naglowek` | 1.2 | — |
| `interlinia.naglowek-male` | 1.4 | — |
| `tracking.naglowek` | -0.1875rem | — |
| `tracking.naglowek-srednie` | -0.1rem | — |
| `tracking.naglowek-male` | -0.0625rem | — |
| `tracking.wersalik` | 0.04em | przy `text-transform: uppercase` |

### §4.6 Tokeny kolorów (z `design/tokens.json`)

| Token | HEX | Rola |
|---|---|---|
| `kolor.tlo` | #070806 | Tło strony — ciemna czerń z nutą zieleni |
| `kolor.powierzchnia` | #131412 | Tło kart i wyniesionych elementów |
| `kolor.akcent` | #a0e00d | Przyciski, akcent limonkowy, wyróżnienia |
| `kolor.interakcja` | #a0e00d | Hover/active (ten sam co akcent) |
| `kolor.tekst-podstawowy` | #ffffff | Tekst na ciemnym tle |
| `kolor.tekst-drugorzedny` | #c5c6c5 | Muted text, meta, labels |
| `kolor.tekst-na-interakcji` | #231f20 | Tekst na przycisku akcentowym |

### §4.7 Wymiary i geometria (z `design/tokens.json`)

| Token | Wartość | Opis |
|---|---|---|
| `wymiar.kontener-strony` | 90rem (1440px) | Maksymalna szerokość kontenera |
| `wymiar.kontener-waski` | 80rem (1280px) | Wąski kontener |
| `wymiar.miara-kolumny` | 50rem (800px) | Długość akapitu |
| `wymiar.odstep-sekcji` | 10rem (160px) | Padding sekcji góra/dół |
| `wymiar.promien` | 0.5rem (8px) | Główny promień (88 wystąpień) |
| `wymiar.promien-sredni` | 0.75rem (12px) | Promień średni |
| `wymiar.promien-pigulki` | 3.125rem (50px) | Przyciski i tagi |
| `wymiar.prog-ukladu` | 48rem (768px) | Breakpoint mobile→desktop (UWAGA: hero wyjątek: 72rem) |
| `wymiar.wciecie-naglowka` | 7.5rem (120px) | Desktop ≥1440px |
| `wymiar.wciecie-tresci` | 8.4375rem (135px) | Desktop ≥1440px (różne od nagłówka!) |
| `wymiar.miara-leadu` | 36.875rem | Maksymalna szerokość leadu |
| `wymiar.miara-akapitu` | 65ch | Maksymalna szerokość akapitu |

**WYJĄTEK Hero:** próg 72rem (ADR-029), 2 kolumny 4fr 2fr — inny niż globalny 48rem.  
**Siatka odstępów 4px:** 4/8/10/12/16/24/32 px — żaden padding/gap nie wychodzi poza siatkę.

### §4.8 Parytet języków (ADR-008)

pl/en/de od dnia pierwszego. Brak wersji de = strona się nie buduje (bramka CI).  
Trzy adaptacje kulturowe, nie tłumaczenia. Ceny: PLN dla pl, EUR dla en/de.  
7 wykrytych [LUKA-PARYTET] w i18n (A2) — patrz §6.

---

## §5 SEO i warstwa techniczna

### §5.1 Metadata per trasa

Globalna (`layout.tsx:13-16`): `title: "Catherly"`, `robots: { index: false, follow: false }`.  
**BLOKADA INDEKSOWANIA całego serwisu** — brak warunkowania env, brak generateMetadata w żadnej stronie.

| Trasa | title PL | description PL | title EN | title DE |
|---|---|---|---|---|
| `/` | "Catherly" [globalny] | [BRAK] | "Catherly" | "Catherly" |
| `/funkcje` | "Catherly" | [BRAK] | "Catherly" | "Catherly" |
| `/cennik` | "Catherly" | [BRAK] | "Catherly" | "Catherly" |
| `/dla-kogo` | "Catherly" | [BRAK] | "Catherly" | "Catherly" |
| `/funkcje/*` | "Catherly" (×4) | [BRAK] | "Catherly" | "Catherly" |
| `/login` | "Catherly" | [BRAK] | "Catherly" | "Catherly" |

Wszystkie 9 tras: [BRAK] per-route title i description. i18n messages nie mają kluczy Metadata.

### §5.2 Hreflang i sitemap

- Hreflang: [BRAK] — zero wyników `grep -rn "hreflang" src/app/`
- Sitemap: [BRAK] — brak `sitemap.ts`/`sitemap.xml` w src/app/ i public/
- robots.txt: [BRAK] — brak w public/

### §5.3 Co zostaje w naszym kodzie (nie może żyć w Framerze)

| Element | Lokalizacja | Uwaga |
|---|---|---|
| i18n routing | `src/i18n/routing.ts`, `src/i18n/request.ts`, middleware | Nierozerwalnie Next.js |
| 3 języki (pl/en/de) | w pełni po naszej stronie | Framer nie zastąpi |
| Formularze | `SekcjaPlanow.tsx:60+70` — dwa `<input type="radio">` cennikowe | Nie ma innych formularzy |
| Analityka | [BRAK] — żaden tag GA/Plausible/PostHog | Do dodania decyzją właściciela |
| Stripe/ceny | [BRAK w kodzie www] — cennik statyczny z `content/facts.json` | Ceny z Stripe przy wdrożeniu |
| Obrazy Z6 (warstwa a) | `public/obrazy/filary/` — Playwright pipeline | Nie do przeniesienia |

### §5.4 Linki wychodzące

**Brak.** Zero linków zewnętrznych w całym serwisie (`src/`). Stopka: wyłącznie wewnętrzne + martwe teksty "(wkrótce)".  
Linki do `app.catherly.com`, social media: [BRAK].  
Źródło: A5, weryfikacja: `grep -rn "href.*http" src/components/Stopka*` → 0 wyników.

### §5.5 Favicon i OG image

Favicon: [BRAK] — `public/` zawiera tylko `fonts/` i `obrazy/`.  
OG image: [BRAK] — brak `opengraph-image.*` w `src/app/`.  
Metadata `icons`/`openGraph`: [BRAK] w layout.tsx.

---

## §6 Lista [BRAK] / [LUKA] — pytania do właściciela

| ID | Co brakuje | Agent(y) | Pytanie do właściciela |
|---|---|---|---|
| [LUKA-1] | `robots: {index:false}` — brak warunkowania env | A5, A6 | Czy blokada indeksowania jest celowa dla bieżącej fazy i kiedy zostanie zdjęta przed premierą? |
| [LUKA-2] | Brak sitemap.ts/sitemap.xml | A5, A6 | Kiedy i przez kogo — Faza 5 czy 7? |
| [LUKA-3] | Brak robots.txt | A5, A6 | Kiedy zostanie dodany ze wskazaniem sitemap? |
| [LUKA-4] | Brak hreflang | A5, A6 | Czy wejdzie razem z robots/sitemap, czy osobnym ADR? |
| [LUKA-5] | Brak favicon i OG image | A3, A5 | Czy leżą w `src/app/` (Next.js Metadata) czy `public/`? Przed premierą? |
| [BRAK-1] | Ikony kart KartyFunkcji | A1, A7c | Wzorzec Habitline ma SVG 18×10px per karta — skąd weźmiemy? Osobna decyzja o materiale? |
| [BRAK-2] | Klucze i18n dla PasMozliwosci | A2, A7c | 8 nazw w pasie — z jakiego źródła: `content/facts.json`, i18n, czy stały tekst w kodzie? |
| [BRAK-3] | Social Proof Band | A7c | Habitline ma hashatagi/segmenty użytkowników. U nas odpowiednik: Problem+Definicja (inne podejście). Czy chcemy analogiczną sekcję social proof z licznikami? |
| [BRAK-4] | Reminders showcase | A7c | Sekcja "Reminders" z Habitline — u nas opisana w `FunkcjePozyskiwanie.mod2`, bez sekcji na głównej. Czy chcemy? |
| [BRAK-5] | Statistics z liczbami | A7c | Habitline ma "62,000+ Check-ins". U nas PasMozliwosci jest analogiem strukturalnym, ale bez liczb. Czy chcemy sekcję z mierzalnymi danymi? |
| [BRAK-6] | AI Features sekcja na głównej | A7c | SekcjaKierunku (AI) tylko na podstronach. Habitline ma "AI features" na homepage. Czy chcemy? |
| [BRAK-7] | Testimonials / opinie | T53, A7c | Warunek powrotu T53: opinie za flag. Habitline ma pełną sekcję kart. Decyzja: kiedy i skąd treść? |
| [LUKA-P1] | DE "Für dich selbst" ≠ PL/EN "Dbanie o siebie"/"Self-care" | A2 | Celowa różnica kulturowa czy błąd tłumaczenia? |
| [LUKA-P2] | DE "Partnerin" zamiast neutralnej formy (3 miejsca) | A2 | Celowa polityka inclusivity w DE czy ujednolicić? |
| [LUKA-P3] | Asymetria walut w Cennik.faq.o1 | A2 | PL: złote→euro; EN/DE: euro→złoty. Potwierdzić celowość. |
| [BRAK-SEO-1] | Meta title/description dla wszystkich 9 tras | A5 | 9 tras bez per-route title i description. Framer może to zaimplementować — ale wartości treści muszą powstać. Kto pisze? |
| [BRAK-ADR] | ADR-035 i ADR-036 nie istnieją | A6 | Lista ADR przeskakuje z 034 do 037. Celowo pominięte? Wycofane? |

---

## §7 Czego dokument NIE mówi (granice pomiaru)

1. **[LIMIT-URL] Wartości CSS z Framer sites** — paddingi, breakpointy, gapy, border-radiusy, box-shadow, font-size z habitline-wbs.framer.website i nexus-template.framer.website to dane z SSR HTML curl. Framer generuje układ przez Web Animations API i JavaScript po hydracji — computed styles niedostępne. Wartości w §8 to dolne ograniczenie, nie pełny obraz.

2. **[LIMIT-ANIMACJE] Framer animacje wejścia** — habitline-wbs.framer.website używa `animateAppearEffects` i Web Animations API — w SSR brak `@keyframes`. Czasy i easing w §8.1 to parametry `spring` widoczne w SSR, nie zmierzone przez obserwatora animacji.

3. **Ceny** — wartości liczbowe planów Stripe (`content/facts.json`) nie są w tym dokumencie. Ceny zmieniają się przez Stripe Dashboard, nie przez repo.

4. **Treść markdown** — `content/{pl,en,de}/` zawiera wersje dłuższe/alternatywne treści dla podstron. Niniejszy dokument cytuje i18n JSON (UI strings). Pełne treści modułów: `src/i18n/messages/*.json` + `content/*/funkcje-*.md`.

5. **Zachowanie hover i focus** — zmierzone tokeny (kolory interakcji), ale dokładne stany wizualne (ring, shadow hover) nie są zmierzone systematycznie.

6. **Co dokument CELOWO POMIJA:** kod komponentów (jest w repo, czytaj bezpośrednio), historia commitów, architektura CI/CD, konfiguracja Vercel, testy e2e.

7. **Liczba "sekcji"** — zależy od definicji. Ten dokument liczy komponenty renderowane (`src/app/[locale]/page.tsx`): strona główna ma 14 (S1–S14 + layout). Podstrony funkcji: ~8–10 każda.

---

## §8 Wzorzec: układ, kolory, typografia, mapowanie

### §8.1 Układ — Habitline (habitline-wbs.framer.website)

**Źródło pomiaru:** `curl -s https://habitline-wbs.framer.website/` → 1 160 KB SSR HTML+CSS. Data: 2026-09-01.  
**Status wartości:** [CSS] = z CSS w SSR. [LIMIT-SSR] = nieosiągalne bez JS.

#### Sekcje — kolejność na homepage

1. NAV (fixed/sticky) — logo lewo, linki środek, CTA przycisk prawo
2. HERO — ciemne tło `#131515`, tekst centrum, mockup telefonu, CTA
3. SOCIAL PROOF BAND — ruchomy pas hashtagów (#Founders, #Students…)
4. ABOUT/FEATURES — tekst lewa, siatka kart prawa
5. FEATURES GRID — siatka kart nawyków (5-kol→1-kol)
6. CORE FEATURE BLOCKS ×3 — tekst lewa + UI prawa, 2-kol desktop
7. WEEKLY REFLECTION — wizualizacja postępu tygodniowego
8. REMINDERS — showcase powiadomień
9. LIFESTYLE FIT — 4–5 segmentów użytkowników z metrykami
10. TESTIMONIALS — karty opinii (Daniel, Olivia, Ethan…)
11. STATISTICS — "62,000+ Check-ins logged", liczby global
12. AI FEATURES — "AI suggestions that adjust to your day"
13. FAQ — accordion ("Common questions")
14. CTA FINAL — przycisk + AppStore/Google Play + QR
15. FOOTER — Quick links, Privacy Policy, Terms

**Brak sekcji cennikowej** — produkt darmowy.

#### Geometria [CSS]

| Element | Wartość |
|---|---|
| Nav kontener desktop | `width:1200px` |
| Nav padding | `0 30px` desktop / `0 20px` mobile |
| Nav wysokość | `padding:30px 0` desktop / `padding:20px 0` mobile |
| Hero content wrapper | `max-width:980px`, `padding:0 30px`, `gap:80px` (pionowy) |
| Sekcje content max-width | `1080px` lub `980px` |
| Lead max-width | `max-width:500px` |
| Padding hero | `200px 0 0` (tekst od góry) |
| Padding duże sekcje | `200px 0` lub `120px 0` |
| Padding mobile duże | `100px 0` |
| Gap kart | `40px`–`50px` |
| Gap elementów | `24px`–`30px` |
| Gap małych | `6px`–`16px` |

#### Border-radius [CSS]

| Typ | Wartość |
|---|---|
| Pill (przyciski, tagi) | `100px` |
| Duże karty | `40px`–`50px` |
| Średnie karty | `16px`–`20px` |
| Małe elementy | `8px`–`10px` |

#### Box-shadow [CSS]

Karty delikatne: `0px 0.6px 1.5px -1.5px rgba(0,0,0,.17), 0px 2.3px 5.9px -3px rgba(0,0,0,.14), 0px 10px 26px -4.5px rgba(0,0,0,.02)` — wielowarstwowy, subtelny.

#### Breakpointy [CSS]

- Desktop: `min-width:1200px` — nav 1200px
- Tablet: `810px`–`1199px`
- Mobile: `max-width:809px` — nav 360px, hamburger 32×32px

Grid collapse: `repeat(4,…)` → `repeat(2,…)` → `repeat(1,…)` przy 810px i 809px.

#### Ruch [LIMIT-SSR]

CSS transition widoczne: `transition: all .45s cubic-bezier(.44,0,.56,1)` (hover), `transition: color .15s` (szybki hover).  
Animacje wejścia: `animateAppearEffects` (Framer JS API) — czasy spring ~0.3–0.8s [LIMIT-SSR].  
`prefers-reduced-motion: reduce` → Framer skraca animacje do 1ms (override `duration:1`).

#### Typografia Habitline [CSS]

Fonty: `Stack Sans Headline`, `Geist`, `Google Sans Flex`, `Inter`.  
Rozmiary: Display 90–120px / H1 40–68px / H2 26–38px / H3 22–24px / Body 15–18px / Small 12–14px.

---

### §8.2 Kolory i typografia — Nexus (nexus-template.framer.website)

**Źródło pomiaru:** `curl -s https://nexus-template.framer.website/` → SSR HTML. Data: 2026-09-01.  
**Status:** [CSS-VALUE] = z `<style>` tagów SSR. [APPROX] = niepełny zapis w SSR.

#### Paleta kolorów [CSS-VALUE]

| Rola | HEX | RGB | Użycie |
|---|---|---|---|
| Tło strony | #0f0f0f | rgb(15,15,15) | `html body` |
| Ciemna powierzchnia (karty) | #171717 | rgb(23,23,23) | Karty Pro, navbar |
| Powierzchnia medium | #232323 | rgb(35,35,35) | Nav active-hover |
| Tekst na ciemnym | #ffffff | rgb(255,255,255) | Headingi/body na ciemnym |
| Tekst na jasnym | #151515 | rgb(21,21,21) | Sekcja cennikowa |
| Tekst drugorzędny | #8b8b8b | rgb(139,139,139) | Opisy, meta |
| Tekst trzeciorzędny | #5e5e5e | rgb(94,94,94) | Labele, badge |
| **Akcent limonkowy** | **#cbfb45** | rgb(203,251,69) | CTA button, checkmarki |
| Akcent hover | #bfff0f | — | Jaśniejszy na hover |
| Jasna powierzchnia | #f2f2f2 | rgb(242,242,242) | Karty Starter/Lite |
| Biały panel (cennik) | #ffffff | — | Zaokrąglony panel `border-radius:48px` |
| Obwódka jasna | #e8e8e8 | rgb(232,232,232) | Border jasny |
| Obwódka ciemna | rgba(255,255,255, 0.10) | — | Subtelny border dark |
| Ciepły beż | #dac5a7 | — | Tekst buttonów w dark |
| Czarny | #000000 | — | Rzadkie |

#### Typografia — DM Sans (Google Fonts WOFF2 embedded) [CSS-VALUE]

Krój wiodący: **DM Sans** (w100–w700, WOFF2 via fonts.gstatic.com, embedded `@font-face`).  
Krój logo: **Orbitron** (500, Google Fonts, tylko logomark — nie stosować dla contentu!).

| Rola | Rozmiar desktop | Rozmiar tablet | Rozmiar mobile | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|---|
| Hero H1 | 96px | 80px | 48px | 500 | 100%/110% | -3px/-2px/-1px |
| H2 duże (sekcje główne) | 80px | 54px | 36px | 500 | 110% | -3px/-1px/-2px |
| H2 alternatywne | 64px | 48px | 36px | 500 | 110% | -2px/-1px/-1px |
| H2 standardowe | 48px | 40px | 32px | 500 | 120% | -1px |
| H3 | 32px | 28px | 28px | 500 | 120% | -1px/-0.5px |
| H4 | 24px | — | — | 500 | 120% | -0.5px |
| Karta/H6 | 18px | — | — | 500 | 120% | 0 |
| Lead body | 22px | 20px | 18px | 400 | 150% | 0 |
| Body | 18px | 16px | 16px | 400 | 140% | 0 |
| Body alt | 16px | — | — | 400 | 150% | 0 |
| Small/caption | 14px | — | — | 400 | 150% | 0 |
| Button text | 16px | — | — | 500 | 120% | -0.25px |
| Label/badge | 13px | — | — | 500 | 120% | +0.5px, UPPERCASE |
| Metadata | 16px | — | — | 500 | 140% | +0.25px |

**Uwaga dla A4:** DM Sans ładowany przez Framer bezpośrednio `@font-face` z `fonts.gstatic.com` — nie przez `<link rel=stylesheet>`.  
Nasz repo używa Inter-var (39,8 kB) + Satoshi-Medium (17,3 kB) — RÓŻNE kroje. Decyzja właściciela: czy wymieniamy kroje przy przebudowie?

#### Geometria cennikowa Nexus [CSS-VALUE]

- Biały panel sekcji: `border-radius: 48px` desktop / 32px tablet / 24px mobile, `background:#fff`, padding `192px 0 128px`
- 3 karty cennikowe: flex row, gap 24px, width 100%
- Starter/Lite: tło `#f2f2f2`, `border-radius:24px` / 16px mobile, padding 40px / 24px mobile
- Pro: tło **`#171717`** na białym panelu (wyróżnienie WYŁĄCZNIE kolorem — bez border/shadow/skalowania), `border-radius:24px`

#### Przyciski Nexus [CSS-VALUE]

| Typ | BG | Border-radius | Padding |
|---|---|---|---|
| Primary CTA (z ikonką) | #cbfb45 | 500px | 6px 24px 6px 6px |
| Primary proste | #cbfb45 | 500px | 12px 24px |
| Secondary (dark) | #171717 | 500px | 12px 24px, border rgba(218,197,167,0.15) |

#### Przełącznik billing Nexus [CSS-VALUE]

Custom `<div>` z `tabindex=0` (nie `<input type=checkbox>`).  
Pill: `background:#f2f2f2`, `border-radius:500px`, `padding:8px`.  
Opcja aktywna: `background:#171717`, `width:110px`, `padding:16px`, `border-radius:500px`.

---

### §8.3 Mapowanie sekcja-po-sekcji

Habitline section → nasz komponent → klucze treści → obraz → kolor/krój wzorca

| # | Sekcja Habitline | Status | Nasz komponent | Kluczowe klucze (A2) | Obraz (A3) | Kolor tła / krój (A7b) |
|---|---|---|---|---|---|---|
| 1 | NAV | zmapowane | `Nawigacja.tsx` (details/summary, bez JS) | `Nawigacja.funkcje/cennik/dlaKogo/logowanie` | SLOT PUSTY — logo tekst CSS | dark #171717 / DM Sans 500 |
| 2 | HERO | zmapowane | `Hero` — H1, LCP, 2 potwierdzenia | `Hero.naglowek/podtytul/cta/potwierdzenieUE/potwierdzenieRezygnacja` | Z6 filar-1-dmo (a) + fala2 mockup (b, ≥90rem) | dark #0f0f0f / H1 96→48px DM Sans |
| 3 | SOCIAL PROOF BAND | [BRAK TREŚCI] | BRAK odpowiednika na głównej | brak kluczy social proof | SLOT PUSTY | — / — |
| 4 | ABOUT/FEATURES | częściowe | `SekcjaTekstowa` Definicja (S4) + `KartyFunkcji` (2.3) | `Definicja.*` + BRAK KLUCZY KartyFunkcji | SLOT PUSTY | dark / H2 48px |
| 5 | FEATURES GRID | częściowe | `PasMozliwosci` (ruchomy pas) | BRAK KLUCZY i18n | SLOT PUSTY | dark / body |
| 6 | CORE FEATURE BLOCKS ×3 | zmapowane (×4 u nas) | `Filar` ×4 (S5–S8) | `Filary.filar1–4.*` + `ObrazyFilarow.filar1–4` | Z6 filar-1-dmo/filar-2-tarcza/filar-3-pierwsze-90-dni/filar-4-wrapped (warstwa a) | dark / H2 48px, body 18px |
| 7 | WEEKLY REFLECTION | zmapowane | `SekcjaRytmu` (S10, id rytm-h2) | `RytmDnia.*` (naglowek, krok1–3, kropka) | SLOT PUSTY | dark / H2 |
| 8 | REMINDERS | [BRAK TREŚCI] | BRAK na głównej (jest na /funkcje/pozyskiwanie) | `FunkcjePozyskiwanie.mod2_poco` — podstrona | SLOT PUSTY | — |
| 9 | LIFESTYLE FIT | osobna podstrona | `/dla-kogo` — `SciezkaRozpoznania` ×3 | `DlaKogo.naglowek/s1_h2/s2_h2/s3_h2/cta` | SLOT PUSTY | dark / H2 |
| 10 | TESTIMONIALS | [BRAK TREŚCI, T53] | BRAK komponentu (warunek powrotu) | brak kluczy testimonials | SLOT PUSTY | — |
| 11 | STATISTICS | [BRAK TREŚCI] | PasMozliwosci — analog strukturalny bez liczb | BRAK KLUCZY | SLOT PUSTY | — |
| 12 | AI FEATURES | [BRAK na głównej] | `SekcjaKierunku` tylko na /funkcje/pozyskiwanie i /tresci | `FunkcjePozyskiwanie.aiNaglowek/aiTresc/aiGranica` | SLOT PUSTY | — |
| 13 | FAQ | zmapowane | `Faq` (S12, id obawy-h2) | `Obawy.naglowek`, `Obawy.p1–p6`, `Obawy.o1–o6` | SLOT PUSTY | dark / body |
| 14 | CTA FINAL | zmapowane | `Zamkniecie` (S13) → /funkcje | `ZamkniecieGlowna.cta`, `ZamkniecieGlowna.zdanie` | SLOT PUSTY | dark / H2 |
| 15 | FOOTER | zmapowane | `Stopka` (S14) — 4 sekcje | `Stopka.mapaStrony/jezyk/dokumenty.*/kontakt/wkrotce` | SLOT PUSTY | dark ≡ strona (bez własnego tła!) |

**Sekcje u nas BEZ odpowiednika w Habitline [SEKCJA DO DODANIA — 4]:**

| Sekcja | Komponent | Klucze | Opis |
|---|---|---|---|
| Problem (S3, id problem-h2) | `SekcjaTekstowa` | `Problem.naglowek/tresc/kropka` | Narracja bólu — Habitline pomija naming problemu |
| Definicja (S4, id definicja-h2) | `SekcjaTekstowa` | `Definicja.naglowek/tresc` | Pozycjonowanie jednym rzeczownikiem |
| DbanieOSiebie (S9) | `DbanieOSiebie.tsx` | `DbanieOSiebie.naglowek/tresc` | Wall of Proof — celebracja; obraz SLOT PUSTY |
| CennikSkrot (S11) | `CennikSkrot.tsx` | `CennikSkrot.naglowek/roznica/link` | Skrót cennika na głównej (Habitline: brak cennika — produkt free) |

**Podsumowanie mapowania:**  
15 sekcji Habitline: 7 zmapowanych bezpośrednio · 3 częściowe/na podstronie · 5 [BRAK TREŚCI]  
U nas: 4 [SEKCJA DO DODANIA] bez odpowiednika w Habitline

---

## Liczniki końcowe

| Metryka | Wartość |
|---|---|
| Tras (routes) zweryfikowanych | 11 |
| Sekcji strony głównej | 14 (S1–S14) |
| Kluczy i18n (szacowane, 3 języki) | ~300+ kluczy × 3 = ~900 par |
| Puste klucze w i18n | 0 |
| [LUKA-PARYTET] znalezionych | 7 |
| Obrazów AVIF+WebP+PNG na dysku | 54 (zweryfikowane A6) |
| Liczb wzorca CSS z Framer [CSS-VALUE] | ~80 (A7a+A7b) |
| Liczb wzorca [LIMIT-SSR] | ~20 (animacje) |
| Pozycji [BRAK]/[LUKA] z pytaniem | 17 (§6) |
| ADR-ów weryfikowanych | 12 |
