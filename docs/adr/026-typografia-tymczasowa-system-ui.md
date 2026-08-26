# ADR-026: Typografia tymczasowa — system-ui z datą ważności

Data: 2026-08-10. Status: **UCHYLONY 2026-08-26 przez [ADR-031](031-paleta-kancelaria-i-kroj-onest.md)**
(decyzja właściciela, zlecenie `WWW/038-bis`, decyzja ③: krojem
produkcyjnym jest Onest). Treść zostaje bez zmian — historia decyzji jest
częścią produktu.

⚠ **Co z tego ADR-a POZOSTAJE W MOCY mimo uchylenia:** warunek twardy
z punktu 3 — *re-pomiar LCP na preview (LHCI) i utrzymanie budżetu 1,8 s
Z ZAPASEM*. ADR-031 przyjmuje krój, ale **tego warunku nie spełnia i tego
nie ukrywa**: pomiar wymaga wdrożenia preview i przebiegu bramki
wydajności, obu poza zakresem zlecenia wdrożeniowego. Warunek jest
zapisany w ADR-031 jako **otwarty**. Przewidywanie z ADR-027 (webfont na
H1 kosztuje 0,2–0,5 s przy zerowym zapasie) nie zostało unieważnione
żadnym pomiarem.

Adnotacja 2026-08-26: przewidywanie z Konsekwencji tego ADR-a —
*„Tokeny typografii (rodzina, skala) wejdą do tokens.json wraz z ADR-em
kroju"* — zostało wykonane dosłownie: skala i rodzina wchodzą do
`design/tokens.json`, nie do arkusza.

Data pierwotna: 2026-08-10. Status pierwotny: PRZYJĘTY (decyzja właściciela).

Adnotacja 2026-08-10: dwie redakcyjne generalizacje zapisu („Etapy
C–E … WYŁĄCZNIE" i „z zapasem" przy budżecie 1,8 s) potwierdzone
przez właściciela jako zgodne z intencją.

## Kontekst

STRATEGIA (fundament wizualny) wymaga docelowo kroju tekstowego oraz
kroju do liczb z cyframi tabelarycznymi (cennik, limity). Etap C
Fazy 3 buduje hero — ekran LCP z budżetem < 1,8 s, którego elementem
LCP jest tekst H1. Webfont na H1 to bezpośrednie ryzyko budżetu.

## Decyzja

1. Etapy C–E Fazy 3 składają tekst WYŁĄCZNIE na stosie systemowym
   (system-ui) — zero webfontów.
2. Wybór docelowych krojów = OSOBNY ADR (kandydat: ADR-027) —
   decyzja wraca NAJPÓŹNIEJ przy etapie F (złożenie stron).
   „Tymczasowo" ma datę ważności: koniec etapu F. Etap F nie może
   zostać zamknięty bez rozstrzygnięcia tego ADR-a (przyjęcie kroju
   albo świadome pozostanie przy system-ui — też ADR-em).
3. Warunek twardy wprowadzenia webfontu: re-pomiar LCP na preview
   (LHCI) i utrzymanie budżetu 1,8 s Z zapasem; strategia ładowania
   (font-display, preload, subset) opisana w ADR kroju; cyfry
   tabelaryczne dla liczb cennika — wymóg z STRATEGII.

## Konsekwencje

- HF i implementacja hero nie czekają na wybór kroju.
- Tokeny typografii (rodzina, skala) wejdą do tokens.json wraz
  z ADR-em kroju — do tego czasu font-family: system-ui w globals
  jest jedynym legalnym miejscem deklaracji.
