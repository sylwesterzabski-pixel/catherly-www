# Audyt nieodwracalnych — dlaczego ten katalog jest pusty

**Bramka `nieodwracalne` jest czerwona PLANOWO. To nie jest awaria.**

Jeśli trafiłaś tu z czerwonego CI: nie szukaj błędu w konfiguracji
i nie próbuj tej bramki „naprawić". Ona działa dokładnie tak, jak ma
działać.

## Co sprawdza bramka

`scripts/check-audyt.mjs` bierze bieżący commit (`git rev-parse HEAD`)
i szuka w tym katalogu raportu `.md`, który ten commit wymienia.
Kiedy raport znajdzie, blokuje jeszcze na każdej linii ze statusem
`NIESPEŁNIONE` albo `NIESPRAWDZONE` — bo NIESPRAWDZONE liczy się jak
NIESPEŁNIONE (ADR-018).

Katalog zawiera dziś wyłącznie `.gitkeep` i ten plik, więc bramka jest
czerwona dla **każdego** commita w historii repozytorium, od Fazy 0.

## Dlaczego pusty, skoro to obszar nieodwracalny

Decyzja właściciela z 2026-08-14: audyt nieodwracalnych ma być
**całościowy i przedpremierowy — w Fazie 6**, a nie składany z audytów
cząstkowych po każdym etapie. Audyt cząstkowy dawałby najgorszy możliwy
efekt: zieloną bramkę przy niepełnym pokryciu, czyli dokładnie to, przed
czym ADR-018 ostrzega („brak dowodu = brak zabezpieczenia" działa też
w drugą stronę — dowód częściowy podany jako pełny jest gorszy niż
żaden, bo usypia).

Pozycja jest zapisana w `docs/faza-2/rejestr-warunkow-powrotu.md`
jako **T2**, z warunkiem powrotu: Faza 6.

## Co ta czerwień faktycznie blokuje

Wdrożenie produkcyjne (ADR-018 pkt 4) — i tylko je. Nie blokuje pracy
na gałęziach faz ani pushu na gałąź roboczą. Blokuje natomiast merge do
`main`, bo main musi być zielony bez wyjątków (ADR-020, CLAUDE.md:
„Czerwień uzasadniona też jest czerwienią"). Innymi słowy: dopóki tu
nie ma raportu, premiera nie jest odblokowana — i o tym właśnie ta
czerwień informuje.

## Czego NIE robić

- Nie dopisywać tu pliku z haszem commita, żeby bramka zzieleniała.
  Bramka szuka pełnego, 40-znakowego hasza; plik zawierający go bez
  faktycznie wykonanego audytu jest fałszowaniem dowodu.
- Nie obniżać progu ani nie zdejmować jobu z workflow.
- Nie oceniać własnej pracy — agent, który wykonał zmianę, nie audytuje
  jej w obszarach dane · pieniądze · bezpieczeństwo · obietnice
  (CLAUDE.md, Prawo 2). Audyt Fazy 6 wykonuje rola niezależna.

## Wyjątek

Jedyną przewidzianą drogą obok raportu jest zapisana decyzja o przyjęciu
ryzyka z podpisem właściciela produktu i terminem powrotu (ADR-018
pkt 4). Taka decyzja też trafia do tego katalogu.
