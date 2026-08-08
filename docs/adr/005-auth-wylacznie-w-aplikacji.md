# ADR-005 — Auth wyłącznie w aplikacji, strona przez rewrites

## Kontekst
Wizualnie logowanie jest pod catherly.com/logowanie, ale druga
implementacja formularza na stronie oznaczałaby dwie kopie logiki sesji,
dwa miejsca do pomylenia przy CSRF i dwa cykle wdrożeniowe dla rzeczy,
która chroni cudze dane (STRATEGIA.md, pkt 6).

## Decyzja
Uwierzytelnianie zostaje w jednym miejscu — w aplikacji. Strona wystawia
ekrany logowania/rejestracji przez przepisanie trasy (rewrites) do
aplikacji. Jedna implementacja, jeden cykl, jeden przedmiot audytu.
Ciasteczko sesji o zasięgu `.catherly.com` (STRATEGIA.md, pkt 5).

## Konsekwencje
- W repozytorium catherly-www nie powstaje żadna logika uwierzytelniania.
- Konfiguracja rewrites w Next.js — realizacja w Fazie 5, po decyzji
  właściciela o przeniesieniu aplikacji na app.catherly.com (otwarty
  punkt strategii).
- Spójne z ADR-017 (brak logowania po stronie www) i ADR-018 (obszar
  bezpieczeństwa — dowód przez test, nie przekonanie).

## Data
2026-08-06 (decyzja w dokumencie strategii, pkt 6); spisano 2026-08-08.
