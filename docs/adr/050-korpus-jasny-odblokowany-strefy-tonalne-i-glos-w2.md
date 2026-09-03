# ADR-050: Korpus jasny odblokowany, strefy tonalne na stronie głównej, głos W2 na całość pl

Data: 2026-09-03. Status: **PRZYJĘTY** (zlecenie `WWW/075`, kroki 1–3).

Zdejmuje **dwa blokery zapisane w ADR-049** i **trzeci, którego ani ADR-049,
ani zlecenie nie nazwały** — wyszedł dopiero przy rozlewaniu stref.

---

## Rozstrzygnięcie 1 — blokada zdjęta przez DODANIE RÓL, nie przez złagodzenie progu

ADR-049 wpuścił role korpusu jasnego do palety, ale **zostawił je poza
sprawdzaniem**, bo dwie pary nie przechodziły. Ten ADR ich nie przymyka —
dokłada role, których brakowało.

| bloker (ADR-049) | było | rola dodana | jest |
| --- | --- | --- | --- |
| akcent jako **plama CTA** na jasnym | 1,43:1 | `obrys-cta-na-jasnym` #231f20 | **14,56:1** wobec powierzchni · **10,22:1** wobec limonki |
| **fokus** na jasnym | 1,12:1 | `fokus-na-jasnym` #151515 | **16,31:1** |

**Obrys jest nośnikiem kształtu, nie ozdobą.** Limonka na jasnym daje 1,43:1,
więc etykieta przycisku jest czytelna (10,22:1), ale **sam przycisk nie daje
się zobaczyć jako przycisk** — WCAG 1.4.11 wymaga 3:1 dla granicy kontrolki.
Wypełnienie zostaje limonką; widoczność niesie krawędź.

**Fokus dostaje własną barwę, bo mechanizm z ciemnego tu nie działa.** Na
ciemnym biel pada dzięki `outline-offset` na tło (20,07:1). Na jasnym ten sam
ruch odkłada białą obwódkę na jasną powierzchnię — problemem nie jest, **na co**
pada, tylko że pada na coś o tej samej jasności.

Obie wartości są **równe rolom, które już istnieją** (`tekst-na-interakcji`
i `tekst-na-jasnym`) i to jest wybór, nie zbieg: przycisk ma jedną barwę pisma
i krawędzi, obwódka jest tak ciemna jak pismo, wśród którego stoi. Tokeny
zostają osobne mimo równości — tak samo jak `kroj-naglowek` wobec `kroj`.

## Rozstrzygnięcie 2 — TRZECI bloker, nienazwany: akcent niosący TEKST

Wyszedł przy rozlewaniu stref: sekcje **problem** i **definicja** niosą
limonkowy fragment nagłówka (`.akcent-naglowka`, R-AKCENT-03/ADR-033) — i obie
idą na jasne. Bez reakcji przebudowa wyprodukowałaby **nieczytelne nagłówki na
dwóch sekcjach naraz**.

**To nie jest ten sam przypadek co CTA.** Tam akcent jest **plamą** i ratuje go
obrys; tutaj akcent jest **tekstem** i obrys nie daje nic.

`akcent-na-jasnym` = **#4f6f06**, metodą z ADR-038 (stany): **odcień rodziny
zachowany** (H = 78,2°, S = 89% — identyczne z limonką), jasność zbita z L = 64%
na **L = 23%**. Zmierzone: **5,20:1** na powierzchni jasnej, **5,82:1** na karcie.

⚠ **Odrzucono wartość bliższą oryginałowi.** L = 25% (`#567907`) daje 4,54:1 —
przechodzi, ale ledwo. Reguła z ADR-038 mówi „spełniający próg", nie „ledwo
spełniający", a przy tekście niosącym sens nagłówka zapas 0,04 jest pozorny.

## Rozstrzygnięcie 3 — dwa regulaminy akcentu, zależne od powierzchni

`powierzchnia-jasna` **weszła do listy `POWIERZCHNIE`**. Ale R-AKCENT-01
w dawnym brzmieniu („akcent musi umieć nieść tekst na każdej powierzchni")
zapaliłby się na niej — i słusznie, bo nie umie.

Reguła rozdziela się więc na dwa przypadki:

- **powierzchnie ciemne** — akcent może nieść tekst (12,58:1), próg 4,5:1 jak dotąd;
- **`powierzchnia-jasna`** — akcent **tylko jako plama CTA z obrysem**; zamiast
  progu tekstowego sprawdzany jest **obrys**, i to w dwóch kierunkach: wobec
  powierzchni (żeby przycisk odciął się od sekcji) **oraz wobec akcentu** (żeby
  krawędź odcięła się od wypełnienia, które otacza). Jedno bez drugiego jest furtką.

⚠ **WYJĄTEK MA TERMIN WAŻNOŚCI.** Gdyby akcent kiedyś przeszedł na tej
powierzchni próg tekstowy, wyjątek opisywałby problem, którego już nie ma —
a wyjątek przeterminowany wygląda jak decyzja i nie chroni przed niczym.
Strażnik zapala się wtedy komunikatem `WYJĄTEK ZBĘDNY`. Ta sama klasa co
`WYŁĄCZENIE PRZETERMINOWANE` z ADR-049.

⚠ **Lista `POWIERZCHNIE` zostaje LITERALNA**, mimo że zlecenie zakładało
działanie „z automatu". Literał jest tu mechanizmem: każda nowa powierzchnia
niesie pytanie „co na niej wolno akcentowi", a na to **nie ma odpowiedzi
wyprowadzalnej z samej wartości barwy**.

### Dowód: trzy stany na tym samym wejściu

| stan | wynik |
| --- | --- |
| obecny | **ZIELEŃ** |
| **mutacja** — obrys rozjaśniony do `#d0d0d0` | **CZERWIEŃ ×2**: `obrys na powierzchni 1,38:1` **oraz** `obrys wobec akcentu 1,03:1` |
| **kontrola negatywna** — wpis `AKCENT_TYLKO_PLAMA` usunięty | **CZERWIEŃ**: `akcent na powierzchni-jasnej 1,43:1` |
| przywrócony | **ZIELEŃ** |

Środkowy wiersz dowodzi, że **oba** człony obrysu pracują. Trzeci dowodzi, że
**wyjątek nie jest dekoracją** — bez niego reguła zapala się na tej powierzchni.

## Rozstrzygnięcie 4 — strefy tonalne: powrót warstwy, którą ADR-038 usunął

ADR-038 skasował blok `[data-ton]` i zapisał warunek powrotu: *„gdyby weszła
sekcja jasna, warstwa wraca **osobną decyzją**, a nie odtwarzana z pamięci"*.
Osobną decyzją jest ten ADR. Nie jest to przywrócenie starego bloku: tamten
przełączał sześć ról inwersji pod paletę „natura", ten przestawia **siedem ról**
pod korpus jasny wzorca.

**Mechanizm: przestawiamy ROLE, nie komponenty.** Żaden komponent nie wie
o strefie i nie musi wiedzieć — używa tych samych nazw ról co zawsze, a strefa
podmienia im wartości. Alternatywa („każdy komponent dostaje wariant jasny")
rozsypałaby decyzję na kilkanaście plików i pierwszy nowy komponent by o niej
zapomniał.

**Mapa stref** (za zleceniem):

| strefa | sekcje |
| --- | --- |
| **ciemna** | nawigacja + hero · pas ścieżek · pas możliwości · rytm dnia · cennik-skrót · obawy · CTA końcowe + stopka |
| **jasna** | problem · definicja · karty funkcji · filary ×4 · dbanie o siebie |

⚠ **TRZY SEKCJE NIE BYŁY W ŻADNEJ LIŚCIE ZLECENIA** — pas ścieżek (R1
z ADR-049), rytm dnia i obawy. **Zostawione ciemne**, bo rozlanie jest
addytywne: jasne stają się wyłącznie sekcje wymienione, reszta zostaje jak
była. Zgłaszam jako lukę zlecenia, nie rozstrzygam kierunkowo.

⚠ **Karta na jasnym jest BIELĄ, sekcja `#f2f2f2`** — układ z §8.2 (Nexus):
panel jaśniejszy od kart to odwrotność tego, co podpowiada intuicja. Plama
karty wobec sekcji wynosi **1,12:1**, czyli poniżej progu 1,30 — i to jest stan
poprawny: rozdziela ją **trzeci mechanizm ADR-038** (kompozycja), dokładnie tak
samo jak karty ciemne na ciemnym tle, gdzie plama ma 1,09:1. **Symetria jest tu
argumentem:** gdyby karta na jasnym musiała mieć obrys, to karta na ciemnym też.

**Bez gradientów-mostów** — zlecenie wyłącza je z tego kroku wprost. Przejście
między strefami jest czystą zmianą powierzchni, krawędź w krawędź.

### Strażnik przepisany, bo strefy unieważniły jego założenie

`e2e/filary.spec.ts` porównywał marker listy z **globalną** wartością
`--kolor-rola-akcent`. Filar leży teraz w strefie jasnej, gdzie ta sama rola
rozwiązuje się na `akcent-na-jasnym` — test upadał na **zapisie**, nie na wadzie.

Asercja czyta teraz rolę **z tej sekcji**, nie z pliku tokenów. Przedmiot
zostaje ten sam („marker jest w roli akcentu"), a strażnik jest **mocniejszy**:
łapie też sytuację, w której strefa przestawi rolę, a marker zostanie przy
dawnej barwie — czego wersja z wartością globalną nie widziała.
**Mutacja:** marker przestawiony na `tekst-drugorzedny` → czerwień; przywrócony
→ zieleń.

## Rozstrzygnięcie 5 — głos W2 na całość pl

Pilot z ADR-049 objął 6 kluczy strony głównej. Ten ADR domyka **pozostałe 25**.

**Zero form rodzaju odbiorcy w całym `pl.json`.** Pozostało dokładnie **pięć**
wystąpień i wszystkie są **różnicami licencjonowanymi** — trzy dotyczą osoby
trzeciej (`nowa osoba wpisuje sama`, `jej autorka sama`, `klientka sama ogląda`),
dwie nie dotyczą osoby wcale (`w samej aplikacji`, `jej ścieżka pilnuje się sama`).

Metoda z pilota, bez zmian: skrypt **przerywa bez zapisu**, gdy liczba trafień
nie zgadza się z oczekiwaną, i synchronizuje `content/` razem z `messages`.
Zastosowano 21 zamian na **53 wystąpieniach w 15 plikach**.

⚠ **`en`/`de` NIETKNIĘTE.** Kontrola pozytywna po zmianie: `de` niesie nadal
**30 kluczy** z rodzajem przez rzeczownik (`Partnerin`, `Kundin`) — to **inny
mechanizm** i wymaga osobnej decyzji. Póki jej nie ma, trzy języki mówią
o odbiorcy **różnymi** rzeczami: pl neutralnie, de w rodzaju żeńskim.

⚠ **Pułapka złamanego wiersza wróciła i znów została złapana** — `piszesz je\nsama` w `content/pl/funkcje-pozyskiwanie.md`. Trzeci raz ta sama klasa
w dwóch zleceniach; łapie ją strażnik „znak w znak", nie czujność.

## Czego ten ADR NIE rozstrzyga

- **Trzy sekcje bez przypisania strefy** (pas ścieżek, rytm dnia, obawy) —
  zostawione ciemne, czekają na decyzję.
- **Gradienty-mosty między strefami** — wyłączone z tego kroku, wejdą przy
  batchach sekcji.
- **Rodzaj w `de`** — 30 kluczy przez rzeczownik; osobny mechanizm, osobna
  decyzja.
- **Glow** — nadal bez tokenów (ADR-049), wraca przy hero.
