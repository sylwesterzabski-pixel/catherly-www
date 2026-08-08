# ADR-007 — Treść w repo, bez CMS na start

## Kontekst
CMS to kolejna baza, kolejna awaria i kolejny koszt przy sześciu stronach
(STRATEGIA.md, pkt 8).

## Decyzja
Treść w plikach repozytorium (MDX w `content/{pl,en,de}`), generowanie
statyczne. Bez CMS na start. Osobne repozytorium catherly-www, osobny
projekt Vercel — awaria aplikacji nie może zdjąć strony sprzedażowej,
a wdrożenie strony nie może dotknąć bazy.

## Konsekwencje
- Każda zmiana treści przechodzi przez PR i bramki (parytet, prawdziwość,
  kontrast) — spójne z ADR-017.
- Struktura `content/` jest przedmiotem testu parytetu językowego.
- Ewentualny powrót tematu wyłącznie jako git-based CMS przez ADR
  uchylający (warunek rewizji w ADR-017).

## Data
2026-08-06 (decyzja w dokumencie strategii, pkt 8); spisano 2026-08-08.
