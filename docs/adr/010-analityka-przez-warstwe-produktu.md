# ADR-010 — Analityka przez warstwę produktu, bez trzeciego systemu

## Kontekst
Produkt ma już warstwę analityki. Trzeci system to kolejna zależność,
kolejne zgody i kolejna powierzchnia awarii (STRATEGIA.md, pkt 50).

## Decyzja
Zdarzenia konwersji strony przechodzą przez istniejącą warstwę analityki
produktu, nie przez zewnętrzny system analityczny.

## Konsekwencje
- Zewnętrzna analityka świadomie poza zestawem platform (ADR-016).
- Upraszcza mechanikę zgód (ADR-003: odrzucenie = 1 kliknięcie).
- Realizacja w Fazie 7 (publikacja i pomiar); szczegóły integracji
  wymagają fragmentu dostarczonego przez właściciela — agent nie sięga
  do kodu aplikacji (granica bezwzględna).

## Data
2026-08-06 (decyzja w dokumencie strategii, pkt 50); spisano 2026-08-08.
