# MATERIAŁ A-16 — „30 minut przed każdą rozmową": propozycja brzmienia

**Status: PRZYGOTOWANIE, NIE ZAPIS.** Zlecenie TOR9/023: *„niczego nie zmieniaj
na stronie […] decyzja o brzmieniu zapada tutaj, bo dotyczy trzech miejsc naraz
i jednej stałej"*. Poniżej materiał do decyzji. **Nic z tego nie jest w messages
ani w `content/`.**

---

## 1. STAN ZMIERZONY — to nie trzy miejsca, to DWANAŚCIE

Właściciel powiedział „trzy miejsca naraz". **Zmierzone: dwa klucze × trzy języki
w `messages` + te same dwa akapity × trzy języki w `content/` = 12 wystąpień**,
bo strażnicy porównują `messages` z `content` **znak w znak**.

| warstwa | plik | miejsce |
|---|---|---|
| komunikaty | `src/i18n/messages/{pl,en,de}.json` | `FunkcjePozyskiwanie.mod2_poco` |
| komunikaty | `src/i18n/messages/{pl,en,de}.json` | `DlaKogo.s1_robi_1` |
| treść | `content/{pl,en,de}/funkcje-pozyskiwanie.md` | wiersz ~76–79 |
| treść | `content/{pl,en,de}/dla-kogo.md` | wiersz ~50–53 |

**Te dwa klucze są ŁAŃCUCHEM RÓWNOŚCI** (kolumna I karty łańcuchów) — wspólny
sufiks zmierzony co do znaku:

| język | wspólny sufiks | brzmienie |
|---|---|---|
| PL | **66 znaków** | ` {minuty} minut przed każdą rozmową Catherly przypomina ci o niej.` |
| EN | **73 znaki** | ` {minuty} minutes before each conversation Catherly reminds you about it.` |
| DE | **71 znaków** | `, und {minuty} Minuten vor jedem Gespräch erinnert Catherly dich daran.` |

> ## **ZMIANA JEDNEGO Z NICH BEZ DRUGIEGO ROZBIJA ŁAŃCUCH.** To nie jest ryzyko —
> ## to jest pewność: strażnik porównuje po podstawieniu `{minuty}`.

**Która bramka zapyta — wypisane, nie łatane:**
- `e2e/dla-kogo.spec.ts:96` — *„«30 minut» w `s1_robi_1` — z `facts.json` (D-B3), jak na stronie"*
- `e2e/dla-kogo.spec.ts:214` — porównanie po podstawieniu `{minuty}`
- `e2e/funkcje-pozyskiwanie.spec.ts:58,414,454` — `podstawMinuty(tresc)` **wyłącznie dla `mod2_poco`**
- `scripts/lint-liczby.mjs` — literał liczby w JSX nie przechodzi; liczba musi iść z `facts.json`

**Liczba ma jedno źródło i ono zostaje:**
```
content/facts.json → "przypomnienie-kalendarza-minuty": { "wartosc": 30 }
```
**Wartość 30 jest PRAWDZIWA** — to dokładnie `REMINDER_LEAD_MS = 30 * 60 * 1000`.
**Nieprawdziwa jest gramatyka, w której ją podano.**

---

## 2. DWIE WADY, NIE JEDNA

Tor 10 (pozycja 2 z 41) opisał **jedną**. Odczyt kodu daje **drugą**, niezależną.

| # | wada | dowód z kodu |
|---|---|---|
| **W1** | **liczba punktowa tam, gdzie mechanizm daje przedział** — „30 minut przed" czyta się jako *dokładnie o 30*, a jest *nie wcześniej niż 30* | okno `startTime > now ∧ ≤ now+30min` przy cronie `*/15` → doręczenie **między ~15 a 30 minutą** |
| **W2** | **„każdą" / „each" / „jedem" jest bezwarunkowe, a mechanizm ma budżet** | `budzetMs: 45_000`, pole zwrotne `zatrzymanyNaBudzecie`; po `startTime` warunek przestaje łapać — **przypomnienie przepada bezpowrotnie** |

**W2 jest moim dołożeniem do pozycji 2 toru 10** — ich kolumna opisuje tylko czas
doręczenia. **Zgłaszam zwrotnie.**

**Trzecia rzecz, która NIE jest wadą strony, ale trzeba ją znać przy decyzji:**
aplikacja wysyła powiadomienie z `templateData: { minutes: '30' }` — **tekst
w produkcie też mówi „30", niezależnie od tego, kiedy naprawdę wyszedł.**
Zmiana brzmienia na stronie **rozjedzie stronę z aplikacją**, jeśli aplikacja
zostanie przy „30". **To jest decyzja o dwóch produktach, nie o jednym zdaniu.**

---

## 3. PROPOZYCJE BRZMIENIA — trzy warianty, po jednym zdaniu każdy

Wszystkie trzy: **zachowują `{minuty}`** (bramka liczb spełniona), **usuwają „każdą"**
(W2), **nie wprowadzają presji czasu, niedoboru ani obietnicy wyniku**.

### WARIANT A — najmniejsza zmiana, jedno słowo dodane, jedno usunięte

| | |
|---|---|
| **PL** | `…a Catherly przypomina ci o rozmowie **do {minuty} minut przed nią**.` |
| **EN** | `…and Catherly reminds you about a conversation **up to {minuty} minutes before it**.` |
| **DE** | `…und Catherly erinnert dich **bis zu {minuty} Minuten vorher** an ein Gespräch.` |

**Za:** granica („do") jest w zdaniu głównym, tam gdzie czytelnik na pewno spojrzy.
**Przeciw:** „do 30 minut przed" bywa czytane jako *najpóźniej 30 minut przed*,
czyli odwrotnie. **To jest realne ryzyko nieporozumienia i zgłaszam je jako wadę wariantu.**

### WARIANT B — przedział wprost, bez słowa „do"

| | |
|---|---|
| **PL** | `…a Catherly przypomina ci o rozmowie **w ostatnich {minuty} minutach przed nią**.` |
| **EN** | `…and Catherly reminds you about a conversation **within the last {minuty} minutes before it**.` |
| **DE** | `…und Catherly erinnert dich **in den letzten {minuty} Minuten davor** an ein Gespräch.` |

**Za:** jednoznaczne — nazywa **okno**, nie punkt; nie da się przeczytać odwrotnie.
**Przeciw:** dłuższe o kilka znaków; DE wymaga przestawienia szyku.
**To jest wariant, który polecam** — bo przy zderzeniu zrozumiałości z precyzją
granicy wygrywa granica, a tu granica jest przy okazji **zrozumialsza**.

### WARIANT C — zdanie główne bez liczby, liczba i granica w `mod2_nie`

| | |
|---|---|
| **PL, `mod2_poco`** | `…a Catherly przypomina ci o rozmowie, zanim się zacznie.` |
| **PL, `mod2_nie`** | `Przypomnienia nie przychodzą e-mailem ani SMS-em. Przychodzą **w ostatnich {minuty} minutach przed rozmową — nie wcześniej i nie po jej rozpoczęciu**.` |

**Za:** granica trafia do slotu, który dla granic istnieje (`*_nie`); zdanie główne robi się krótsze.
**Przeciw:** **przenosi `{minuty}` do innego klucza** — a `podstawMinuty()` w `e2e/funkcje-pozyskiwanie.spec.ts:454`
podstawia **wyłącznie dla `mod2_poco`**. **Ten wariant WYWRÓCI bramkę i wymaga zmiany
strażnika — czyli nie jest wariantem redakcyjnym, tylko inżynieryjnym. Zgłaszam,
nie proponuję.**

---

## 4. CZEGO NIE ROZSTRZYGAM (R-D)

1. **Czy aplikacja zmieni `minutes: '30'` w treści powiadomienia.** To nie moja trasa
   i nie moje repozytorium. **Dopóki nie zmieni, strona i produkt będą mówić różnie —
   i to jest gorsze niż dzisiejszy stan**, w którym mówią zgodnie nieprawdę.
2. **Czy „każdą" ma zniknąć, czy zostać z zastrzeżeniem.** Usunięcie jest tańsze;
   zastrzeżenie („o ile rozmowa nie zaczęła się wcześniej") jest wierniejsze,
   ale wprowadza warunek do zdania, które ma być łatwe.
3. **Czy `facts.json` ma dostać drugie pole** (np. `rozdzielczosc_minuty: 15`).
   To zmienia kształt pliku faktów, a ten plik czyta bramka liczb.
