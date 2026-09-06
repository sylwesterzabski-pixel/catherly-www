# Raport pochodzenia — zrzuty Z6

Wygenerowane: 2026-08-14T16:52:43.969Z
Commit aplikacji: `e35ad8ceefbed065d196c0342891f9f1fe56d2bd`
Baza: efemeryczna `catherly_zrzuty` (embedded-postgres, port 5433) — NIE produkcja
Seed: `prisma/seed.ts` + `scripts/dev-seed-account.ts` + `scripts/zrzuty/dane-demo.ts`
Konto: `demo@fboos.local` (Demo Admin) · plan PRO · onboarding ukończony
Viewport: 1280×800 @ deviceScaleFactor 1.6 → **2048×1280**

| Plik | Trasa | Wymiar | Co w kadrze |
| ---- | ----- | ------ | ----------- |
| `z6-filar-1-dmo.png` | `/dmo` | 2048x1280 | Dzienny plan działania — pięć liczników z celami i paskami postępu |
| `z6-filar-2-tarcza.png` | `/etyka/shield` | 2048x1280 | Tarcza — sprawdzenie ryzykownego sformułowania przed wysyłką |
| `z6-filar-3-pierwsze-90-dni.png` | `/first90` | 2048x1280 | Pierwsze 90 dni — faza, misja dnia i postęp nowej osoby |
| `z6-filar-4-wrapped.png` | `/magic/wrapped` | 2048x1280 | Twój Wrapped — podsumowanie miesiąca (bez CC i bez poziomu kariery) |

## Zgodność z regułą ADR-011

Zero mockupów, zero retuszu. Wyciszone zostały wyłącznie animacje (`animation-duration: 0`),
żeby ten sam ekran dawał ten sam plik przy każdym uruchomieniu — to nie zmienia tego, co widać.

## Dane

Konto demo jest bezosobowe („Demo Admin"). Nie dosiewano kontaktów z imionami — żaden
z czterech kadrów ich nie potrzebuje, a każdy dodany rekord to kolejna szansa, że coś
niepożądanego wejdzie na publikowany obraz.

## Błędy konsoli w trakcie sesji (3)

- `%c%s%c [briefing] Redis get error (fail-open): background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px`
- `%c%s%c [briefing] Redis setex error (fail-open): background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2`
- `ClientFetchError: Failed to fetch. Read more at https://errors.authjs.dev#autherror
    at fetchData (webpack-internal:///(app-pages-browser)/./node_modules/.pnpm/next-auth@5.0.0-beta.32_next@15.5.21_`
