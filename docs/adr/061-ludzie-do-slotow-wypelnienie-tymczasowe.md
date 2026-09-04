# ADR-061: Ludzie do slotów — wypełnienie tymczasowe 6/6

Data: 2026-09-04. Status: **PRZYJĘTY** (zlecenie `WWW/086` v2; akcept
właściciela 6/6 z 04.09, przekazany delegacją koordynatora).

Sześć slotów fotograficznych, które od ADR-048 czekały puste i od ADR-059
zwijały się bez obrazu, dostaje **wypełnienie tymczasowe**. Podmiana
docelowa = **wymiana pliku pod tą samą ścieżką**, bez zmiany kodu.

---

## Rozstrzygnięcie 1 — pochodzenie i tożsamość plików

Pobrane `curl` z adresów podanych w zleceniu, wszystkie **HTTP 200**.
Sumy SHA-256 **plików źródłowych PNG** — zapisane, bo źródła nie wchodzą
do repozytorium, a bez sumy nie da się później sprawdzić, czy ponowne
pobranie dało ten sam kadr:

| slot | SHA-256 źródła (PNG) | wymiar |
| --- | --- | --- |
| hero | `97e304308a91b882b50ba5d518c6868cbba115ab538d316d0ce4c580a6034573` | 1536 × 2048 |
| filar-1-pozyskiwanie | `36e871f54104cd9850d78730147486f8a8828171176edc1e0fc9d9145e6743ad` | 2016 × 1344 |
| filar-2-tresci | `f671b03bfbd3ecbe4f46949c7ae1f922271ea676781c6d83ae8976978b430fd6` | 2016 × 1344 |
| filar-3-zespol | `c7dab59f55468805acf8271986ede49a1886696e6007d127edb6c7dc49d73147` | 2016 × 1344 |
| filar-4-wyniki | `7ad8ac244a5ab35b8f79e9a8c2a442b7775a9f37765e22d51f27a6d6b50d293b` | 2016 × 1344 |
| dbanie-o-siebie | `8c9bd691c54d723c0655e0941afcf9f649b66131f85a2ed660b16acbdcea1646` | 2016 × 1344 |

⚠ **CO MOGĘ STWIERDZIĆ, A CZEGO NIE.** Kanon dopuszcza twarze
**wyłącznie generowane — osoby nieistniejące**, i wymaga imiennego
zatwierdzenia każdego kadru. Zatwierdzenie jest: właściciel przyjął 6/6,
a zlecenie wymienia sześć plików z nazwy. **Generowanego pochodzenia nie
da się orzec z bajtów** — podstawą jest rodowód adresów (prefiks `hf_`,
ta sama rodzina CDN co przy fali 1 z `MANIFEST-HIGGSFIELD-FALA1.md`)
oraz akcept właściciela. Zapisuję to jako **granicę pomiaru**, nie jako
potwierdzenie: sprawdziłem, że pliki są obrazami i co przedstawiają;
nie sprawdziłem — bo nie mam czym — że nie są zdjęciami realnych osób.

## Rozstrzygnięcie 2 — optymalizacja wg praktyki repozytorium

Praktyka fali 1: **pojedynczy AVIF**, szerokość 1600, bez rejestru
srcset (pełny pipeline z `pipeline-obrazow.json` obsługuje zrzuty Z6,
nie fotografie). Konwersja `sharp`, jakość 55, wysiłek 6.

| plik | PNG | AVIF | redukcja |
| --- | --- | --- | --- |
| hero | 4022 kB → | **73 kB** (1536 × 2048) | 98% |
| filar-1 | 3834 kB → | **65 kB** (1600 × 1067) | 98% |
| filar-2 | 3798 kB → | **48 kB** | 99% |
| filar-3 | 4244 kB → | **79 kB** | 98% |
| filar-4 | 3494 kB → | **34 kB** | 99% |
| dbanie | 3365 kB → | **37 kB** | 99% |
| **razem** | 22,8 MB | **336 kB** | **98,5%** |

⚠ **PNG-i źródłowe NIE wchodzą do repozytorium.** 22,8 MB plików
tymczasowych w historii gita byłoby kosztem trwałym za rzecz z definicji
przejściową; adresy i sumy stoją wyżej, więc każdy kadr da się odtworzyć.

## Rozstrzygnięcie 3 — wpięcie: kształt istniejący, nie nowy

- **Hero** i **dbanie o siebie**: `<img>` wprost w slocie, `aria-hidden`
  znika (obraz informacyjny musi być widoczny dla czytnika).
- **Filary**: `Filar` dostaje prop `kadr` o kształcie
  `{ zrodlo, alt, szerokosc, wysokosc }` — **tym samym, którym
  `ModulFunkcji` niósł kadry fali 1**. Prop `obraz` (zrzuty Z6 z rejestru
  srcset) zostaje nietknięty obok; drugiego kształtu nie wymyślam.
- **Surowy `<img>`, nie `next/image`** — ta sama przyczyna co przy Z6:
  optymalizator przekodowuje plik na żądanie, więc na produkcji szłyby
  inne bajty niż te, których sumę tu zapisano.
- Każde wpięcie niesie komentarz **`TYMCZASOWE-DO-PODMIANY`**.
- Sloty **ikon kart** — bez zmian, zgodnie ze zleceniem.

**Alt-y:** nowa przestrzeń `ObrazyTymczasowe`, sześć kluczy × trzy języki,
w stylu opisu sceny z fali 1. ⚠ **Istniejących kluczy `ObrazyFilarow`
NIE użyto i to jest decyzja, nie przeoczenie:** tamte alty opisują
**zrzuty aplikacji** („Ekran Dziennego Planu Działania w aplikacji
Catherly…"), więc postawione przy fotografii człowieka **kłamałyby
o obrazie** — a fałszywy alt jest gorszy od żadnego.

⚠ **Linter liczb złapał liczebnik w opisie sceny.** Pierwsza wersja altu
filaru 3 brzmiała „**dwie** kobiety rozmawiają…"; bramka słusznie zapytała
o rozstrzygnięcie. Zamiast dopisywać pozycję do
`content/liczby-w-tresci.json` za rzecz tymczasową, liczebnik wypadł —
opis pozostał prawdziwy.

## Rozstrzygnięcie 4 — kontrast tekstu na hero: PYTANIE NIE ZACHODZI

Zlecenie przewidywało warstwę przyciemniającą, gdyby tekst na kadrze miał
poniżej 4,5:1. **Zmierzone: tekst hero nie leży na kadrze w ogóle.**
Hero jest jednokolumnowe (tekst → slot pod spodem), więc żaden element
tekstowy nie przecina prostokąta kadru:

| kadr | prostokąt slotu (y) | H1 · lead · CTA (y) | nachodzących |
| --- | --- | --- | --- |
| 1190 | 658–1282 | 184–357 · 373–430 · 474–521 | **0** |
| 1440 | 831–1489 | 184–530 · 546–603 · 647–694 | **0** |
| 810 | 744–1155 | 184–443 · 459–517 · 561–607 | **0** |
| 390 | 755–952 | 104–392 · 408–494 · 538–585 | **0** |

**Warstwy przyciemniającej nie dokładam** — byłaby lekarstwem na chorobę,
której pomiar nie znajduje. Maska wtapiania z `WWW/072` działa na kadrze
bez zmian.

## Rozstrzygnięcie 5 — minimum hero WRÓCIŁO SAMO

ADR-060 zawiesił minimum wysokości hero warunkiem `:has(.kadr:empty)`.
Slot niesie teraz obraz, więc **warunek przestał być spełniony i minimum
wróciło bez jednej zmiany w kodzie**: zmierzone `min-height` 1600 px przy
1190 i 1120 px przy 390, czyli proporcje wzorca z ADR-052 znowu
obowiązują. Mechanizm zadziałał dokładnie tak, jak go opisano.

## Rozstrzygnięcie 6 — LCP: obraz NIE przejął

Zlecenie spodziewało się, że kadr przejmie LCP i trzeba będzie ważyć
`priority`/`preload`. **Pomiar mówi inaczej:**

| trasa (1190) | mediana z 5 | element LCP |
| --- | --- | --- |
| `/` | **36 ms** (32 · 32 · 36 · 36 · 48) | **`span.Hero_duch`** — bez zmian |
| `/funkcje/pozyskiwanie` | **24 ms** (24 · 24 · 40 · 40 · 24) | `h1` |

Elementem LCP strony głównej pozostaje dekoracyjny napis „Catherly"
o rozmiarze 256 px (pozycja **T55**) — jest po prostu większy od kadru.
Kadr hero dostał mimo to `fetchPriority="high"`, bo stoi w pierwszym
ekranie; pozostałe pięć idzie `loading="lazy"`. **Preloadu nie dokładam:
nie ma czego przyspieszać, skoro obraz nie jest elementem LCP.**

## Rozstrzygnięcie 7 — strażnik Z6 przepisany, nie osłabiony

`zrzuty-filarow.spec.ts` sprawdzał, że przy wyłączonym osadzeniu filar ma
**zero `<img>`**. Było to równoważne, dopóki jedynym obrazem, jaki mógł
tam trafić, był zrzut Z6. Od tego batcha slot niesie **fotografię**, więc
„zero obrazów" przestało znaczyć „zero zrzutów" i strażnik zapalał się na
stanie zamierzonym.

Asercja rozróżnia odtąd po **źródle**: zrzuty leżą pod ścieżką z rejestru
pipeline'u, fotografie pod `/obrazy/tymczasowe/`. **Jest przez to
mocniejsza** — łapie zrzut nawet wtedy, gdy obok stoi inny obraz, czego
wersja licząca do zera nie umiała. Dołożony warunek „dokładnie jeden
slot: pusty **albo** z kadrem" zamyka trzeci stan (pusta ramka z altem
albo kadr bez altu byłyby wadą dostępności).

## ⚠ Rozstrzygnięcie 8 — KADR HERO ODSTAJE REJESTREM OD POZOSTAŁYCH PIĘCIU

To jest zgłoszenie, nie odmowa: kadr jest wpięty zgodnie ze zleceniem.

Pięć kadrów pokazuje pracę i oddech w rejestrze domowo-zawodowym —
kobieta z notatnikiem i telefonem przy stole, pisząca na laptopie przy
oknie, rozmowa przy kawie, pisanie w notatniku przy lampie, kubek przy
oknie. **Kadr hero jest inny:** kobieta w półmroku, w łóżku, o gołych
ramionach, bez widocznego ubrania, oświetlona ekranem telefonu.

**Dlaczego to zgłaszam, skoro akcept jest:** hero to pierwszy i największy
obraz strony sprzedającej narzędzie pracy, a rejestr intymny czyta się tam
inaczej niż w pozostałych pięciu miejscach — i inaczej, niż mówi tekst
obok („system do włas­nej pracy"). **Rozstrzygnięcie należy do
właściciela**; wymiana to podmiana jednego pliku pod tą samą ścieżką,
bez zmiany kodu i bez ponownego pomiaru.

## Podróże — wysokości wróciły, ale luka nie

| | bez kadrów (ADR-060) | z kadrami | różnica |
| --- | --- | --- | --- |
| strona (390) | 9 239 px | **10 855** | +1 616 |
| ekranów | 10,95 | **12,86** | +1,91 |
| ból SAMA | 1,45 | 1,98 | +0,53 |
| ból LIDERKA | 5,43 | 6,51 | +1,08 |
| ból STRUKTURA | 0,80 | 1,33 | +0,53 |
| **największa luka** | 3,34 | **3,34** | **0,00** |

⚠ **Luka bez zmian, mimo że strona urosła o dwa ekrany** — kadry weszły
w sekcje, które i tak leżą między wyjściami, więc wydłużyły drogę, nie
korytarz bez drzwi. Bóle oddaliły się o tyle, ile zajęły obrazy nad nimi.

## Pomiary domykające

| | wynik |
| --- | --- |
| pełny zestaw e2e (4 projekty) | **1376 passed · 12 skipped · 0 failed** |
| axe (4 projekty) | **120 passed** |
| bramki statyczne | wszystkie ZIELONE (30 ról, parytet 14 plików × 3) |
| ESLint | 1 ostrzeżenie zastane, zero nowych |
| obrazów w `main` na `/` | **6**, wszystkie z altem |
| waga sześciu kadrów | **336 kB** AVIF |

## Czego ten ADR NIE rozstrzyga

- **Rejestru kadru hero** — zgłoszony, decyzja właściciela.
- **Generowanego pochodzenia** — granica pomiaru, patrz rozstrzygnięcie 1.
- **Kadrów na podstronach filarowych** — zlecenie objęło stronę główną;
  sloty modułów nadal czekają puste.
- **Elementu LCP** — pozostaje duch hero (T55), bez zmian.
