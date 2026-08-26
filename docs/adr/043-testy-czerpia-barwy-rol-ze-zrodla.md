# ADR-043: Testy czerpią barwy ról ze źródła, nie pamiętają wartości

Data: 2026-08-26. Status: **PRZYJĘTY** (zlecenie `WWW/056` pkt 2).

## Kontekst — poprawka, która odtwarzała własną przyczynę

Cztery testy trzymały barwy palety jako literały `rgb(...)` przepisane
z ręki. Przy przejściu na paletę wzorca (ADR-038) **wszystkie cztery
zapaliły się naraz** — poprawnie, bo pilnowały wartości, której już nie
było.

Naprawa polegała jednak na **przepisaniu nowej liczby**, czyli na
odtworzeniu tej samej konstrukcji. Przy następnej zmianie palety
zapaliłyby się znowu, i znowu poprawiłoby się je tak samo.

## Decyzja

Barwy ról czerpie **`e2e/pomoc/role.ts`** z `design/tokens.json` —
**źródła prawdy** wskazanego w `CLAUDE.md` („Wygląd:
design/tokens.json").

| plik | było | jest |
| --- | --- | --- |
| `filary.spec.ts` | `"rgb(160, 224, 13)"` | `rolaRgb("akcent")` |
| `klawiatura.spec.ts` | `"rgb(255, 255, 255)"` | `rolaRgb("fokus")` |
| `hero.spec.ts` | dwa literały | `rolaRgb("interakcja")` · `rolaRgb("interakcja-aktywna")` |
| `zlozenie.spec.ts` | `"rgb(57, 57, 56)"` | `rolaRgb("powierzchnia-akcentowa")` |

## Dlaczego NIE ze strony — to jest sedno, nie szczegół

Odruchowy odczyt to `getComputedStyle(documentElement)
.getPropertyValue("--kolor-rola-…")`. **Zamieniłby te asercje
w tautologię:** element bierze barwę z `var(--rola)`, więc porównanie
„element == var(--rola)" jest prawdziwe **z konstrukcji**.

Przestałoby wtedy wykrywać **przepięcie elementu na inną rolę** — czyli
dokładnie to, czego te testy pilnują.

To ta sama granica, którą opisuje nagłówek `kontrast-stanow.spec.ts`:
import jest dozwolony tam, gdzie wyznacza **zasięg**, a zakazany tam,
gdzie jest **przedmiotem** asercji. `tokens.json` jest tu **niezależną
deklaracją** roli, nie odbiciem strony.

## Co te asercje pilnują PO zmianie — bo to nie jest to samo

| | przedtem | teraz |
| --- | --- | --- |
| treść asercji | „element ma barwę X" | „element nosi rolę R z tokenów" |
| przepięcie na inną rolę | czerwień | **czerwień** |
| zmiana wartości roli | czerwień | **zieleń — i tak ma być** |

Zmiana wartości roli idzie przez ADR i pilnuje jej **strażnik tokenów**;
te testy nie są od tego. Poprzednio pilnowały obu rzeczy naraz i przez
to były głośne przy każdej zmianie palety, nie wnosząc nic ponad
strażnika.

**Rozstrzygnięcie wobec reguły kanonu** („liczba wpisana ręcznie
w strażniku jest defektem albo mechanizmem; rozstrzyga jedno pytanie:
czy jej zmiana ma być decyzją"): zmiana **wartości** roli ma być decyzją
— i **jest nią, w strażniku tokenów, gdzie `LICZBA_ROL` zostaje
literałem**. W tych czterech testach ta sama liczba była **duplikatem
tamtej decyzji**, więc tutaj jest defektem.

## Strażnik samego odczytu

`e2e/role-z-tokenow.spec.ts` pilnuje narzędzia, bo jest ono odtąd nośne
dla pięciu asercji w czterech plikach:

- rola zapisana wprost → wartość dosłowna;
- **odwołanie rozwinięte** — `tlo-strony` ma w tokenach postać
  `{kolor.tlo}`, nie barwę; bez rozwinięcia helper oddałby klamrę;
- zgodność zapisu `#rrggbb` z `rgb(r, g, b)` **liczona**, nie przepisana;
- rola nieistniejąca **rzuca**, a nie zwraca pustki — z **kontrolą
  pozytywną obok**: ta sama funkcja na roli istniejącej **nie rzuca**.

Bez tej kontroli „rzuciło" mogłoby znaczyć „rzuca zawsze", czyli że
helper jest zepsuty, a nie czujny.

## Dowody mutacyjne — obie strony, bo zmieniły się obie

**Własność zachowana** — przepięcie S10 z `powierzchnia-akcentowa` na
`powierzchnia-2` (zmiana **roli**, nie wartości):

```
✘ Expected: "rgb(57, 57, 56)"  Received: "rgb(32, 33, 31)"   1 failed
```

**Własność zmieniona celowo** — zmiana **wartości** roli
`powierzchnia-akcentowa` `#393938` → `#2b2b2a`:

```
1 passed   → test ŚLEDZI źródło; przy literale byłaby tu czerwień
```

Oba stany przywrócone, zgodność potwierdzona SHA-256
(`SekcjaRytmu.module.css`, `design/tokens.json`).

## Przy okazji: dwa komunikaty asercji przeterminowane

`"S10 na rola-powierzchnia-akcentowa (kancelaria #dccdac)"` oraz komentarz
„w kolorze roli fokusa (śliwka-700)" **przeżyły trzy zmiany palety**
i nazywały barwy, których nie ma. Komunikat asercji jest tym, co czyta
się w chwili czerwieni — nazwa nieistniejącej palety kieruje wtedy
szukanie w złą stronę. Sprostowane.

## Stan

Pełny e2e: **672 passed, 4 skipped, 0 failed** (668 przed zmianą + 4
testy strażnika odczytu).
