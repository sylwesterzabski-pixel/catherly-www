# Brief K2: hero + K9 pasek potwierdzeń (Etap C; pipeline 4.1)

Status: BRIEF. Układ strony: OBOWIĄZUJE (DECYZJA 6). Uwaga
właściciela: ekran LCP — budżet 1,8 s jest pierwszą cechą projektu.

## Zakres

Sekcja S2 strony głównej: H1 + podtytuł + CTA + pasek potwierdzeń
(K9 — komponent samodzielny, reużyty na /cennik). Treść (OBOWIĄZUJE,
pl/en/de): content/*/naglowek.md — H1 „Rozmawiasz z ludźmi — Catherly
prowadzi kontakty i wyniki." (+ EN/DE), podtytuł 4-elementowy, CTA
„Sprawdź, jak działa" (+ EN/DE), potwierdzenia: „Dane przechowywane
w UE" + „Rezygnacja w każdej chwili" (+ EN/DE).

## Budżet LCP (dyscyplina, nie życzenie)

1. Element LCP = TEKST H1 (wireframe: zero obrazu nad foldem).
2. Typografia: system-ui do czasu osobnej decyzji właściciela
   o krojach (STRATEGIA wymaga docelowo kroju tekstowego + kroju do
   liczb z cyframi tabelarycznymi — wybór kroju to decyzja wizualna
   z konsekwencją LCP: webfont na H1 = ryzyko; wymaga ADR i strategii
   ładowania font-display/preload). DO DECYZJI WŁAŚCICIELA przy HF —
   rekomendacja: premiera etapu na system-ui, krój osobnym ADR.
3. Zero JS w hero; CTA to link (rola-interakcja + tekst-na-interakcji
   — para 5,22:1 udokumentowana w tokenach), nie button z handlerem.
4. CLS: wysokości zarezerwowane; brak elementów doładowywanych.

## Wymagania

- H1 jako jedyny h1 strony (placeholder „Catherly" w page.tsx
  ustępuje miejsca prawdziwemu hero przy integracji).
- CTA prowadzi do sekcji/podstrony produktu: cel = /funkcje
  (istnieje; zero obietnicy rejestracji — zgodnie z naglowek.md).
- K9: lista pozioma krótkich fraz; separator dekoracyjny (rola-
  kreska); zawija się na 390 px; semantycznie ul/li.
- Desktop: tekst w lewej kolumnie (~60%), prawa spokojna (bez zrzutów
  UI — te tylko z Playwrighta, później).
- Kontrasty: tekst-podstawowy na tle (11,07:1), CTA para z tokenów;
  żadnych nowych par bez wyliczenia.
- Parytet: jeden komponent, treści z content przez messages/import.

## Pipeline

Brief → HF (statyczny, tokeny; wariant 390 px i desktop) → panel
projektu (Prawo 2: LCP-higiena, kontrasty, hierarchia, fokus) →
handoff → implementacja (komponent Hero + PasekPotwierdzen,
integracja na stronie głównej) → bramki + testy (axe, klawiatura,
no-JS, parytet; LHCI dopiero na preview — osobna zgoda właściciela)
→ adwersarz → akcept właściciela.
