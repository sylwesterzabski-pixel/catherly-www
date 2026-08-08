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

Seed 001–018 pochodzi z rejestru w PLAN.md (sekcja 8). PLAN.md pozostaje
niezmieniony — jego suma SHA-256 jest sumą odniesienia; ADR-y od 019
wzwyż istnieją wyłącznie w tym katalogu, zatwierdzone przez właściciela.
