# ADR-025: Tokeny — powierzchnia akcentowa, kreska, miara tekstu

Data: 2026-08-10. Status: PRZYJĘTY (decyzja właściciela).

## Kontekst

Etap B Fazy 3 (K1 nawigacja/stopka, K3 sekcja tekstowa) ujawnił trzy
wartości wizualne bez tokenów: tło akcentowe lustra L1 (DECYZJA 6),
kreski nagłówka/stopki i miarę tekstu prozy. Panel projektu zalecił
jeden ADR zamiast trzech mikro-decyzji; CLAUDE.md: nowa wartość
wizualna = ADR, nie wyjątek.

## Decyzja

Do design/tokens.json wchodzą:
1. `kolor.rola.powierzchnia-akcentowa` = {kolor.terakota.100} —
   tło lustra L1. Kontrasty pary (wyliczone, potwierdzone trzykrotnie
   niezależnie): ×tekst-podstawowy 11,15:1 · ×link 6,51:1 · ×fokus
   6,51:1 — AA z zapasem (warunek DECYZJI 6 spełniony na poziomie
   tokenu, nie komponentu).
2. `kolor.rola.kreska` = {kolor.neutralna.200} — kreski dekoracyjne
   (1,20:1 na tle — dopuszczalne dla elementów niekomunikujących).
3. `wymiar.miara-akapitu` = 65ch i `wymiar.miara-kolumny` = 38rem —
   pierwsze tokeny wymiaru w systemie (miara prozy K3).

## Konsekwencje

- Komponenty przechodzą z wartości bezpośrednich na role
  (sekcja--akcentowa, kreski w Nawigacja/Stopka, miary w K3) —
  wymiana w rundzie napraw B1/I4/I1.
- Zmiana odcienia akcentu = jedna linia w tokens.json + jedna
  re-weryfikacja par kontrastowych roli (komentarz przy tokenie).
- HF w docs/faza-3/hf/ pozostają zapisem historycznym z wartościami
  sprzed ADR (odnotowane; nie są kodem produkcyjnym).
