# ADR-016 — Zamknięty zestaw platform Iteracji 1

Pełny tekst decyzji: PLAN.md, sekcja 12.

## Kontekst
Każda platforma to zależność, koszt poznawczy i powierzchnia awarii.
Zakres zamrożony (ADR-014) wymaga domkniętej listy — dokładanie narzędzi
„bo przydatne" to ta sama choroba, co dokładanie sekcji.

## Decyzja
Zestaw kompletny i zamknięty:

| Warstwa | Platformy |
|---|---|
| Rdzeń inżynierski | GitHub (+ MCP) · Vercel (+ MCP) · Playwright (+ MCP) · Stripe (+ MCP, źródło prawdy cennika) · Lighthouse CI · axe-core · Style Dictionary |
| Warstwa wizualna | Claude Design (design system, wireframe, high fidelity, handoff) · Higgsfield MCP (wyłącznie warstwa dekoracyjna per ADR-011) · Huemint / Realtime Colors / Accessible Palette (jednorazowo, per ADR-015) |
| Wypełnienie zakresu | Resend + React Email (e-maile transakcyjne w tokenach) · Fontsource (kroje lokalnie, subsetting latin-ext) · next-intl (parytet pl/en/de, hreflang) · Klaro lub własny baner (zgody: odrzucenie = 1 kliknięcie) · Upptime (/status z GitHub Actions) · Tally (rekrutacja pierwszych użytkowniczek) |

**Świadomie poza zestawem:** CMS (ADR-007) · zewnętrzna analityka
(ADR-010) · komercyjne consent-platformy (fabryki ciemnych wzorców)
· wszystko z listy „poza zakresem startu" w sekcji 11 PLAN.md.

## Konsekwencje
Dodanie jakiejkolwiek platformy wymaga ADR-a z uzasadnieniem, czemu
istniejący zestaw nie wystarcza. Agenci nie proponują nowych narzędzi
w PR-ach — propozycje narzędzi idą wyłącznie ścieżką ADR do
orkiestratora.

## Data
2026-08-06.
