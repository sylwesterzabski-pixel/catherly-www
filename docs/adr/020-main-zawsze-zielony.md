# ADR-020 — Main zawsze zielony

## Kontekst
Faza 0 świadomie zostawiła część bramek czerwoną (artefakty przyszłych
faz). Przy pierwszym PR pojawiłaby się pokusa merge'u „przez uzasadnioną
czerwień". Precedens mergowania przy czerwonej bramce — nawet raz, nawet
z dobrym powodem — unieważnia Prawo 3 (bramka albo nie istnieje):
od tego momentu każda czerwień staje się negocjowalna.

## Decyzja
Main jest zawsze zielony. Żaden merge do main nie przechodzi przy
jakiejkolwiek czerwonej bramce, bez wyjątków — także dla faz
infrastrukturalnych. Czerwień uzasadniona też jest czerwienią.

Praca faz kumuluje się na gałęziach: Faza 0 pozostaje na
`faza-0/konstytucja`, kolejne fazy budują na niej (lub na gałęziach od
niej odbitych) i wchodzą do main pierwszym w pełni zielonym PR-em —
przewidywane po Fazie 1, gdy pierwsze prawdziwe bramki zzielenieją.

## Konsekwencje
- Zieleń osiąga się wyłącznie przez dostarczenie artefaktów, których
  bramka wymaga — nigdy przez osłabienie, pominięcie lub zwężenie bramki
  (CLAUDE.md).
- Bramki, których warunek dotyczy wdrożenia produkcyjnego, a nie merge'u
  (Nieodwracalne, ADR-018 pkt 4), zostaną doprecyzowane co do miejsca
  egzekwowania (zdarzenie wdrożenia vs PR) w nadchodzących fazach —
  przez uściślenie zakresu zgodnego z literą ADR-018, nie przez wyjątek.
- Po stronie właściciela: włączenie na GitHubie branch protection dla
  main z wymogiem zielonych checków, żeby zasada była egzekwowana
  mechanicznie, nie kulturowo.
- Reguła zapisana w CLAUDE.md (sekcja „Zakazy bezwzględne") — zna ją
  każdy agent w każdej sesji.

## Data
2026-08-08 (decyzja właściciela po pushu Fazy 0 na GitHub).
