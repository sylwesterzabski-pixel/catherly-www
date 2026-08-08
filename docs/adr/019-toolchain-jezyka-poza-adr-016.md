# ADR-019 — Standardowy toolchain Next.js jako część stacku języka

## Kontekst
Faza 0 zainicjalizowała Next.js 15 zgodnie ze stackiem (STRATEGIA.md,
pkt 8). Standardowa praca z tym stackiem wymaga narzędzi języka:
TypeScript (kompilacja i typy), ESLint z eslint-config-next (statyczna
analiza), pakietów typów `@types/*` oraz `@eslint/eslintrc` (adapter
konfiguracji). ADR-016 zamyka zestaw platform Iteracji 1 i nakazuje ADR
dla każdego rozszerzenia — powstało pytanie, czy toolchain języka
podlega tej liście.

## Decyzja
TypeScript, ESLint (z eslint-config-next), `@types/node`, `@types/react`,
`@types/react-dom` i `@eslint/eslintrc` są częścią stacku języka
Next.js — tak jak sam kompilator — a nie zewnętrzną platformą
w rozumieniu ADR-016.

Niniejszy ADR NIE narusza ADR-016: tamten dotyczy integracji i platform
zewnętrznych (GitHub, Vercel, Stripe, Claude Design, Higgsfield,
Playwright, Lighthouse CI, Resend, Upptime, Tally itd.), a nie narzędzi
języka.

Granica pojęcia „toolchain języka" (definicja zamknięta):
- narzędzie uruchamiane wyłącznie lokalnie lub w CI,
- służy kompilacji, typowaniu lub statycznej analizie kodu,
- nie komunikuje się z żadną usługą zewnętrzną,
- nie trafia do kodu wykonywanego przez stronę (zero wpływu na runtime).

Wszystko poza tą definicją — w szczególności każda biblioteka runtime
i każda usługa — nadal wymaga ścieżki ADR z ADR-016.

## Konsekwencje
- Wymienione pakiety żyją w `devDependencies` i nie zwiększają wagi
  strony (bramka wydajności tego pilnuje niezależnie).
- Ten ADR nie otwiera furtki do dokładania zależności „bo przydatne":
  rozstrzyga wyłącznie o narzędziach spełniających wszystkie cztery
  warunki definicji.
- Agenci powołują się na ADR-019 przy aktualizacjach wersji tych
  narzędzi; dodanie NOWEGO narzędzia, nawet czysto deweloperskiego,
  które nie spełnia definicji, wraca na ścieżkę ADR.

## Data
2026-08-08 (zlecone przez właściciela po raporcie Fazy 0).
