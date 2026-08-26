# Rejestr decyzji (ADR)

Format: `NNN-tytul.md` → Kontekst · Decyzja · Konsekwencje · Data
(PLAN.md, sekcja 8). Zmiana którejkolwiek decyzji = nowy ADR, który
jawnie uchyla stary. Historia decyzji jest częścią produktu.

**ADR-018 jest nadrzędny wobec wszystkich pozostałych** — w razie
sprzeczności wygrywa.

| Nr | Decyzja | Plik |
|---|---|---|
| 001 | Izolacja marki: neutralne przykłady, brak partnerów i twarzy | [001](001-izolacja-marki.md) |
| 002 | Progi wydajności i dostępności jako bramki blokujące | [002](002-progi-wydajnosci-i-dostepnosci.md) |
| 003 | Zakaz ciemnych wzorców (lista zamknięta z zasady 3) | [003](003-zakaz-ciemnych-wzorcow.md) |
| 004 | Jeden design system, rozjazd wykrywany kontraktem | [004](004-jeden-design-system.md) |
| 005 | Auth wyłącznie w aplikacji, strona przez rewrites | [005](005-auth-wylacznie-w-aplikacji.md) |
| 006 | Płatność przed kontem; cała strona publiczna | [006](006-platnosc-przed-kontem.md) |
| 007 | Treść w repo, bez CMS na start | [007](007-tresc-w-repo-bez-cms.md) |
| 008 | Trzy języki od dnia pierwszego, hreflang + x-default | [008](008-trzy-jezyki-od-dnia-pierwszego.md) |
| 009 | Jeden motyw, bez przełącznika jasny/ciemny | [009](009-jeden-motyw.md) |
| 010 | Analityka przez warstwę produktu, bez trzeciego systemu | [010](010-analityka-przez-warstwe-produktu.md) |
| 011 | Obrazy generowane: tylko warstwa dekoracyjna, nigdy pseudo-zrzuty | [011](011-obrazy-generowane-tylko-dekoracyjne.md) |
| 012 | Waluty i prawo konsumenckie | [012](012-waluty-i-prawo-konsumenckie.md) |
| 013 | Ciepła jakość: kierunek emocjonalny marki | [013](013-ciepla-jakosc.md) |
| 014 | Zakres zamrożony Iteracji 1 | [014](014-zakres-zamrozony-iteracji-1.md) |
| 015 | Paleta barw przez tokeny | [015](015-paleta-barw-przez-tokeny.md) |
| 016 | Zamknięty zestaw platform Iteracji 1 | [016](016-zamkniety-zestaw-platform.md) |
| 017 | Brak panelu administracyjnego strony | [017](017-brak-panelu-administracyjnego.md) |
| 018 | **Prymat nieodwracalnego (NADRZĘDNY)** | [018](018-prymat-nieodwracalnego.md) |
| 019 | Standardowy toolchain Next.js jako część stacku języka | [019](019-toolchain-jezyka-poza-adr-016.md) |
| 020 | Main zawsze zielony — merge tylko przy komplecie zielonych bramek | [020](020-main-zawsze-zielony.md) |
| 021 | **SZKIC** — własny minimalny serwer MCP jako adapter oficjalnego API Higgsfield (fallback wobec buga OAuth; decyzja przy Fazie 4) | [021](021-wlasny-serwer-mcp-higgsfield.md) |
| 022 | Kontrakt tokenów zawężony do szwu logowania (doprecyzowuje ADR-004; pełny kontrakt po uporządkowaniu DS aplikacji) | [022](022-kontrakt-minimalny-szew-logowania.md) |
| 023 | Ścieżka zakupu przez /login (doprecyzowanie STRATEGIA pkt 41) | [023](023-sciezka-zakupu-przez-login.md) |
| 024 | Fazowanie hybrydowe per komponent (Fazy 3+4 przeplatane) | [024](024-fazowanie-hybrydowe-per-komponent.md) |
| 025 | Tokeny — powierzchnia akcentowa, kreska, miara tekstu | [025](025-tokeny-powierzchnia-akcentowa-kreska-miara.md) |
| 026 | Typografia tymczasowa — system-ui z datą ważności | [026](026-typografia-tymczasowa-system-ui.md) |
| 027 | Krój pisma — system-ui na premierę iteracji 1 | [027](027-kroj-pisma-system-ui-premiera.md) |
| 028 | Tokeny wymiarów — promienie, kontener strony, próg układu | [028](028-tokeny-wymiarow-promienie-kontener-prog.md) |
| 029 | Próg i proporcje kolumn hero — jedyny wyjątek od progu układu 48rem (ADR-028) | [029](029-prog-i-proporcje-hero.md) |
| 030 | `main` dostaje wdrożenie produkcyjne przy Fazie 7 — do tego czasu planowa czerwień bramki wydajności na `main`, bez wyjątku w kodzie (dopełnia ADR-020) | [030](030-wdrozenie-produkcyjne-main-przy-fazie-7.md) |
| 031 | ⚠ *część o kroju uchylona (ADR-040)* — paleta produkcyjna „kancelaria" (19 ról) i krój Onest — **uchyla ADR-026 i ADR-027**, koryguje stałą tła z ADR-013 | [031](031-paleta-kancelaria-i-kroj-onest.md) |
| 032 | Paleta „natura" (25 ról: 19 jasnych + 6 inwersji) i tony sekcji `data-ton` — **zastępuje WARTOŚCI z ADR-031, zachowuje jego infrastrukturę** | [032](032-paleta-natura-i-warstwa-inwersji.md) |
| 033 | ⚠ *rozstrzygnięcia 1 i 3 zastąpione (ADR-038, ADR-039)* — rozdział karty dwoma mechanizmami (plama ALBO kreska), sonda rastrowa dla teł niejednolitych, akcent w nagłówku (R-AKCENT-03) | [033](033-rozdzial-karty-sonda-rastrowa-akcent-w-naglowku.md) |
| 034 | Interakcja pod palcem ciemnieje w obu warstwach — 26. rola `interakcja-aktywna-inwersji` | [034](034-hover-ciemnieje-w-obu-warstwach.md) |
| 037 | Twarze wyłącznie generowane i zatwierdzane imiennie; dwie warstwy obrazowe (dowód produktu ↔ dekoracja) — **zawęża ADR-011**, zmienia dwa zakazy bezwzględne w `CLAUDE.md` | [037](037-twarze-generowane-i-dwie-warstwy-obrazowe.md) |
| 038 | Paleta wzorca (19 ról), rozdział karty TRZEMA mechanizmami, koniec warstwy inwersji — **zastępuje wartości z ADR-032, przepisuje regułę z ADR-033** | [038](038-paleta-wzorca-trzy-mechanizmy-rozdzialu.md) |
| 039 | R-AKCENT-01 i R-AKCENT-02 z zakazu barwy na **warunek kontrastowy**; rozdzielność trójki usunięta, mechanizm `outline-offset` dostaje strażnika — **przepisuje reguły z ADR-031/033, prostuje liczbę w ADR-037** | [039](039-r-akcent-jako-warunek-kontrastowy.md) |
| 040 | **Kroje wzorca**: Satoshi w nagłówkach (statyczny 500) + Inter w prozie (zmienny `wght`, oś `opsz` przypięta), oba self-hostowane z własnych źródeł, 57,1 kB — **uchyla ADR-031 w części o kroju**; `U+2713 ✓` w podzbiorze zdejmuje T14 z warstwy kroju | [040](040-kroje-wzorca-satoshi-i-inter.md) |
| 041 | **Skala progami, nie `clamp()`** (70/53/34 px), tracking −3 px w `rem`, geometria wzorca w tokenach; trzy nadpisania komponentowe zdjęte, `scroll-padding` przeliczony 5.5→5.75rem | [041](041-skala-progowa-i-geometria-wzorca.md) |
| 042 | **Szew logowania: stan przejsciowy uznany** — wymóg ΔE ≤ 5,0 zostaje, czerwień 93,92 jawna z adnotacją do przemalowania aplikacji; kotwica progu przepisana z nieistniejącej `neutralna-50` na **empiryczną z własnych werdyktów** (4,66 < 5,0 < 6,46); adnotacja dostaje strażnika przeterminowania | [042](042-szew-logowania-stan-przejsciowy-i-kotwica-progu.md) |
| 043 | **Testy czerpią barwy ról ze źródła** (`design/tokens.json`), nie pamiętają literałów — przepięcie elementu na inną rolę nadal daje czerwień, zmiana wartości roli już nie (i tak ma być); helper dostaje własnego strażnika z kontrolą pozytywną | [043](043-testy-czerpia-barwy-rol-ze-zrodla.md) |

Wpisy 023–028 dopisano 2026-08-14 — powstały wcześniej, ale nie trafiły
do tej tabeli. Pliki są źródłem, tabela tylko mapą; przy rozjeździe
prawdę mają pliki.

Seed 001–018 pochodzi z rejestru w PLAN.md (sekcja 8). PLAN.md pozostaje
niezmieniony — jego suma SHA-256 jest sumą odniesienia; ADR-y od 019
wzwyż istnieją wyłącznie w tym katalogu, zatwierdzone przez właściciela.
