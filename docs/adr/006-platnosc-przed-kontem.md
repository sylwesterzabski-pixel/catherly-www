# ADR-006 — Płatność przed kontem; cała strona publiczna

## Kontekst
Nikt nie ma zakładać konta „na próbę" i odbijać się o mur w środku
(STRATEGIA.md, pkt 7).

## Decyzja
Cała strona jest publiczna. Kolejność ścieżki zakupu: wybór planu →
płatność (Stripe, już zintegrowany) → utworzenie konta → aplikacja.
Ścieżka: /cennik → /rejestracja?plan=… → płatność → /witaj →
app.catherly.com (STRATEGIA.md, pkt 41).

## Konsekwencje
- Bramka E2E w CI: cennik → płatność (test mode) → konto → zalogowana
  aplikacja.
- Brak treści zamkniętych za rejestracją (spójne z ADR-003).
- Stripe jest źródłem prawdy cennika (Prawo 1); strona czyta ceny
  z API Stripe w trybie odczytu.

## Data
2026-08-06 (decyzja w dokumencie strategii, pkt 7); spisano 2026-08-08.
