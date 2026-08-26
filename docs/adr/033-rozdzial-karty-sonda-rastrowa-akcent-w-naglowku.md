# ADR-033: Rozdział karty dwoma mechanizmami, sonda rastrowa, akcent w nagłówku

Data: 2026-08-26. Status: **PRZYJĘTY (rozstrzygnięcia właściciela
2026-08-26, zlecenie `WWW/041`, kroki 1–3).**

Trzy rozstrzygnięcia zamykające trzy pozycje zgłoszone w ADR-032 jako
otwarte. Wspólny mianownik jest tu ważniejszy niż każde z osobna:
**we wszystkich trzech przypadkach naprawiany jest MECHANIZM POMIARU
albo MECHANIZM REGUŁY, a nie obniżany próg i nie zmieniana scena.**

## Rozstrzygnięcie 1 — rozdział karty niosą DWA mechanizmy

### Kontekst

ADR-032 zgłosił: karta ma wobec tła kremowego **1,08:1** przy progu
**1,30**, a progu **nie da się osiągnąć żadną powierzchnią** — czysta
biel wobec `#f0efe8` daje **1,153**. Ograniczeniem jest jasność tła,
a tło jest decyzją właściciela z oglądu i pozostaje **nietykalne**.

### Decyzja

Reguła strażnika brzmi odtąd: **kartę odcina PLAMA ≥ 1,30 ALBO KRESKA
≥ 1,30 — jeden z dwóch, mierzony.** Próg **1,30 bez zmian**.

**To nie jest poluzowanie progu.** Zmienia się nie wysokość poprzeczki,
tylko liczba rzeczy, którym wolno ją przeskoczyć — a sprawdzane są
**obie**, więc zniknięcie obu dalej daje czerwień. Poluzowaniem byłoby
sprawdzanie wyłącznie tej, która akurat przechodzi.

### Zasięg po obu stronach — bo mechanizm jest odwrotny na jasnym i ciemnym

Karty stoją także na tonach ciemnych (kremowe karty na espresso
i oliwce). Zmierzone 2026-08-26 na `e6f8134`:

| powierzchnia | plama | kreska | rozdział niesie |
|---|---|---|---|
| krem (warstwa jasna) | 1,08 ✘ | **1,31 ✔** | kreska |
| espresso (`data-ton="ciemny"`) | **14,04 ✔** | 1,83 ✔ | plama |
| oliwka (`data-ton="ciemny-oliwka"`) | **7,65 ✔** | 1,00 ✘ | plama |

**Każda powierzchnia przechodzi innym mechanizmem — i to jest najlepszy
dowód, że jeden by nie wystarczył.** Na oliwce kreska jest wręcz
niewidoczna (równa tłu, 1,00), na kremie to plama nie robi nic.

Kreską na tonach ciemnych jest `tlo-inwersji-2` — tak przemapowuje ją
blok `[data-ton]`. Strażnik czyta wartości tokenów, nie kaskadę, więc
to przypisanie jest w nim wpisane wprost; zmiana bloku tonów musi iść
razem z tą tabelą.

### Dowód mutacyjny

Jeden przebieg, 2026-08-26 na `e6f8134`: **(A)** stan bieżący →
zielony; **(B)** kreska rozjaśniona do `#eceae2` przy nietkniętej
plamie → **CZERWIEŃ**: *„ROZDZIAŁ KARTY: karta na kremie — plama 1.08:1
ORAZ kreska 1.04:1, oba poniżej 1.30:1"*; **(C)** cofnięcie z kopii,
SHA-256 `8d798c6a…` identyczna → znów zielony.

Mutacja celowo ruszyła **kreskę, nie plamę** — bo to kreska jest dziś
jedynym mechanizmem na kremie, a reguła ma zapalać się, gdy zniknie
mechanizm **faktycznie działający**, nie ten, który i tak nie działa.

### Czego to nie zamyka

Pozostaje ustalenie audytu, że rozdział samą kreską bywa niewystarczający
na słabszym ekranie. Reguła mierzy teraz **oba** mechanizmy i przechodzi,
ale na kremie stoi wyłącznie na kresce **1,31 — z zapasem 0,01 nad
progiem**. Jakiekolwiek rozjaśnienie kreski wywraca tę pozycję i strażnik
to złapie; nie złapie natomiast tego, czy 1,31 wystarcza oku na słabym
wyświetlaczu. To pozostaje pytaniem o wygląd, nie o mechanizm.
