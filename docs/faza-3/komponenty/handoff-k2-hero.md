# Handoff K2 (hero) + K9 (pasek potwierdzeń)

Data: 2026-08-10. HF po panelu projektu (przebieg Fable, wiążący;
werdykt PRZESZEDŁ Z WARUNKAMI przyjęty przez właściciela w całości —
3 blokujące + 3 drobne + 2 decyzje wiążące, wszystkie naniesione):
docs/faza-3/hf/k2-hero.html.

## Pary kontrastowe (wyliczone, obowiązujące w implementacji)

| Para | Wynik |
|---|---|
| tekst-podstawowy × tło strony (H1) | 11,07:1 |
| tekst-drugorzędny × tło strony (podtytuł, potwierdzenia) | 6,33:1 |
| tekst-na-interakcji × interakcja (CTA spoczynek) | 5,22:1 |
| tekst-na-interakcji × interakcja-aktywna (CTA hover/active) | 7,02:1 |
| interakcja-aktywna × tło strony (non-text) | 6,29:1 |
| fokus × tło strony | 6,47:1 |
| kreska × tło strony (dekoracyjna) | 1,20:1 |

Rola `--kolor-rola-interakcja-aktywna: {terakota.700}` dodana do
design/tokens.json (decyzja wiążąca P1 panelu — para stała jak
link/link-aktywny; skala bezpośrednia wykluczona). Opis roli `kreska`
rozszerzony o separatory list (drobny 5).

## K2 — kontrakt implementacji

- H1 = JEDYNY h1 strony i element LCP; placeholder `<h1>Catherly</h1>`
  w page.tsx ustępuje miejsca komponentowi Hero.
- H1: clamp(1.75rem, 5vw + 1rem, 3rem) · line-height 1.15 ·
  `max-width: 22ch` (decyzja wiążąca P5 — 3 linie we wszystkich
  językach na desktopie; 18ch dawało EN/DE 4 linie) ·
  text-wrap: balance (bez ryzyka CLS przy system-ui).
- Typografia: system-ui (ADR-026 — data ważności: etap F); zero
  webfontów, zero obrazów nad foldem, zero JS.
- CTA: `<a>` → /funkcje per locale (adresWJezyku; ADR-023 — zero
  obietnicy rejestracji); spoczynek rola-interakcja ×
  tekst-na-interakcji; hover/active rola-interakcja-aktywna.
- Desktop ≥48rem: grid 3fr/2fr (tekst ~60%); prawa kolumna pusta
  z aria-hidden (wystarczające — brak węzłów DOM; obraz wejdzie
  pipeline'em obrazów w etapie D, poza foldem LCP).
- Fokus: rola-fokus (globals.css — bez lokalnych nadpisań).

## K9 — kontrakt implementacji (komponent samodzielny)

- Semantyka: `<ul role="list">` — rola jawna, bo Safari/VoiceOver
  zdejmuje semantykę listy przy list-style: none (drobny 4).
- PONIŻEJ 48rem: układ PIONOWY bez separatorów — decyzja właściciela
  po panelu (blokujący 3: PL 412 px > 358 px zawijał w stanie
  domyślnym, border-inline-start dawał osieroconą kreskę + wcięcie).
- OD 48rem: poziomo, separator `border-inline-start` w rola-kreska
  na `li + li`; pierwszy element bez padding-inline-start.
- Kolor tekstu: tekst-drugorzędny, 0.9375rem.
- Reużycie: /cennik w etapie E (3 potwierdzenia — mieszczą się
  poziomo od 48rem: ok. 600 px < 736 px).
- Treść pozycji przychodzi propsem (messages) — komponent nie zna
  treści.

## Odnotowana dewiacja (drobny 6 — świadoma, nie usterka)

Na 390 px H1 EN/DE łamie się na 4 linie NIEZALEŻNIE od max-width
(ogranicza viewport, nie token; wireframe zakłada 2–3). Wynika
z długości treści OBOWIĄZUJE (EN 66 zn, DE 72 zn) — akceptowane.

## Treść (messages, przestrzeń "Hero"; źródło content/*/naglowek.md — OBOWIĄZUJE)

| Pole | PL | EN | DE |
|---|---|---|---|
| H1 | Rozmawiasz z ludźmi — Catherly prowadzi kontakty i wyniki. | You do the talking — Catherly keeps track of contacts and results. | Du sprichst mit Menschen – Catherly führt deine Kontakte und Ergebnisse. |
| Podtytuł | Catherly to system do własnej sprzedaży bezpośredniej — kontakty, treści, zespół i wyniki w jednym miejscu. | Catherly is a system for running your own direct selling — contacts, content, team, and results in one place. | Catherly ist ein System für deinen eigenen Direktvertrieb – Kontakte, Inhalte, Team und Ergebnisse an einem Ort. |
| CTA | Sprawdź, jak działa | See how it works | Sieh dir an, wie es funktioniert |
| Potw. 1 | Dane przechowywane w UE | Data stored in the EU | Daten in der EU gespeichert |
| Potw. 2 | Rezygnacja w każdej chwili | Cancel at any time | Kündigung jederzeit |

Uwaga interpunkcyjna: PL/EN łącznik „—" (pauza), DE „–" (półpauza) —
znak w znak za treścią OBOWIĄZUJE.

## Implementacja — zakres zlecenia

src/components/{Hero,PasekPotwierdzen} + integracja na stronie
głównej (page.tsx — Hero w main#tresc); messages pl/en/de wg tabeli.
Testy: parytet hero (H1/podtytuł/CTA href/potwierdzenia per locale),
jedyny h1, hover CTA = terakota-700 empirycznie, K9 pion/poziom
i separatory empirycznie (390 px vs desktop), axe, no-JS (H1 w surowym
HTML). Bramki lokalne + suita przed commitem. LHCI dopiero na preview
(osobna zgoda właściciela — PLAN:126).
