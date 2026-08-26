# Pakiet weryfikacji zewnętrznej — catherly.com

**Wygenerowany 2026-08-26 z repozytorium `catherly-www`, gałąź `faza-4/podstrony`.**
Wszystko poniżej pochodzi z **odczytu i pomiaru**, nie z przepisania z dokumentów.
Pakiet jest samowystarczalny: narzędzie bez dostępu do repozytorium ma z niego
zidentyfikować, co gdzie stoi.

*(English legend below — see **PACKAGE LEGEND (EN)**.)*

---

## Co jest w którym pliku

| plik | zawartość |
|---|---|
| `01-STRUKTURA.json` | 9 tras. Per trasa: sekcje **w kolejności DOM**, per sekcja: `sekcja_id` (nazwa komponentu React), `aria_labelledby`, lista elementów z typem (`h1…h4`, `p`, `button`, `link`, `nav`, `label`, `caption`, `li`, `th`, `td`), tekstem i `klucz_i18n` |
| `02-TEKSTY-pl.json` · `-en.json` · `-de.json` | `komunikaty`: **330 kluczy** i18n, spłaszczonych (`Sekcja.klucz` → tekst), dokładnie jak w `messages/<język>.json`. `pliki_tresci`: **14 plików** `content/<język>/*.md` w postaci **surowej**, bez przetwarzania |
| `03-PALETA.json` | 5 palet (produkcja + `len`, `kosc`, `popiol`, `czern`) × **14 ról**, dwiema drogami: `deklaracje_z_globals_css` (cytat ze źródła) i `wartosci_rozwiazane` (odczyt `getComputedStyle` w przeglądarce). Plus **tabela kontrastów** WCAG 2.x i reguły `R-AKCENT-01/02` |
| `04-TYPOGRAFIA.json` | pliki krojów z rozmiarami, wagi w użyciu, skala `font-size` (wszystkie wystąpienia z plików CSS), wartości `clamp`, tracking wersalików |
| `05-ZRZUTY/` | **26 zrzutów** pełnej wysokości strony, nazwa `trasa--viewport--paleta.png` |
| — | **całość jednym ruchem:** `git archive --format=zip HEAD:docs/weryfikacja-zewnetrzna > pakiet.zip` (uruchom w katalogu repozytorium) |

## Jak łączyć strukturę z tekstami

`01-STRUKTURA.json` → `trasy["<trasa>"].sekcje[].elementy[].klucz_i18n`
→ **ten sam klucz** w `02-TEKSTY-<język>.json` → `komunikaty["<klucz>"]`.

Tak dostaje się tłumaczenie dowolnego elementu na dowolny z trzech języków:
struktura jest wspólna, zmienia się tylko plik tekstów.

⚠ **`klucz_i18n: null` znaczy „nie dopasowano jednoznacznie", NIE „klucza nie
ma".** Dopasowanie zrobiono **odwrotnie** — porównaniem tekstu z DOM do wartości
w `messages/pl.json`. Nie dopasowują się: teksty składane z kilku kluczy,
liczby wstawiane z `content/facts.json`, ciągi krótsze niż 4 znaki i takie,
które w `messages` występują pod **więcej niż jednym** kluczem (wtedy pole
zawiera **tablicę** kandydatów, nie `null`). Liczby dopasowań są podane per
trasa w polach `liczba_elementow` i `dopasowanych_do_klucza`.

## Jak czytać role palety

Strona nie używa kolorów wprost — używa **ról**. Rola to nazwa zadania, jakie
kolor pełni; wartość roli zmienia się między paletami, nazwa nie.

| rola | zadanie |
|---|---|
| `tlo-strony` | tło całej strony |
| `powierzchnia` · `powierzchnia-2` | tła kart i bloków |
| `powierzchnia-akcentowa` | tło sekcji wyróżnionej |
| `tekst-podstawowy` · `tekst-drugorzedny` | dwa stopnie tekstu |
| `kreska` | linie, obramowania, separatory |
| `akcent` | **dekoracja: punktory, ozdoby** — patrz `R-AKCENT-01` |
| `interakcja` · `interakcja-aktywna` | wypełnienie przycisku CTA i jego stan aktywny |
| `tekst-na-interakcji` | etykieta **na** przycisku |
| `link` · `link-aktywny` | odnośniki |
| `fokus` | obwódka fokusu klawiatury — **nigdy rola akcentu** (`R-AKCENT-02`) |

Przełącznik palet to atrybut `data-paleta` na `<html>`. **Produkcja chodzi BEZ
tego atrybutu** — cztery nazwane palety to warianty eksperymentu.

---

## ⚠ ROZJAZDY — czego nie zakładać

Sekcja obowiązkowa: każdy rozjazd między dokumentem a odczytem, znaleziony przy
generowaniu pakietu.

| # | rozjazd | stan zmierzony |
|---|---|---|
| 1 | **Krój.** Zlecenie mówi „Onest". W repozytorium leżą **trzy** pliki `woff2` (`onest` 23 808 B, `geist` 19 484 B, `schibsted-grotesk` 29 172 B, razem **70,8 KB**), ale **żaden nie jest wdrożony** | Krojem produkcyjnym jest **`system-ui`** (ADR-026). Pliki należą do bloku eksperymentu i **nie są używane** przez stronę |
| 2 | **Bloki eksperymentu wygasają 2026-08-31** — za **5 dni** od wygenerowania pakietu | Po tej dacie strażnik `scripts/lint-tokeny.mjs` zapala czerwień na **samym istnieniu** bloków, a cztery palety **znikają razem z blokiem**. Pakiet opisuje stan, który ma **datę ważności** |
| 3 | **`akcent × tło` nie osiąga 3:1 w palecie produkcyjnej** (**2,87**) | To **nie jest defekt**: `R-AKCENT-01` mówi, że akcent jest **dekoracją**, nie nośnikiem tekstu ani granicy. Próg 3:1 dotyczy elementów UI, a ta rola ich nie pełni |
| 4 | **`CTA: wypełnienie × tło` nie osiąga 3:1 w trzech jasnych paletach** (`len` **1,12**, `kosc`, `popiol`) | Udokumentowane w `globals.css`: **granicę przycisku niesie obwódka**, nie kontrast wypełnienia. Etykieta na wypełnieniu ma 13,52:1 |
| 5 | **`R-AKCENT-01` nie ma strażnika** | Reguła żyje **wyłącznie jako proza** w `globals.css:265–277`. Sprawdzone przeszukaniem repozytorium: nie istnieje jako kod wykonywalny |
| 6 | **`R-AKCENT-01` jest ZAWIESZONA dla wariantu `czern`** i tylko dla niego | Na czerni limonka ma **13,13:1**, więc niesie tekst, obwódki, fokus i punktory. Trzy jasne palety trzymają regułę bez zmian |
| 7 | ⚠ **Treść mówi w jednym miejscu inaczej niż w sześciu pozostałych** | 2026-08-26 poprawiono **12 miejsc** obietnicy o przypomnieniu kalendarza („w ostatnich 30 minutach przed rozmową"). **`content/tabela-obietnic.md:37` nie było w tym zakresie** i mówi wciąż „30 minut przed **każdą** rozmową". **Weryfikując treść, nie traktuj tego jako dwóch wariantów do wyboru — to znany, zgłoszony rozjazd** (pozycja T49 rejestru) |
| 8 | **Tras jest 9, ale plików `page.tsx` jest 11** | Poza zakresem pakietu są `/nie-znaleziono` i trasa `[...sciezka]` (catch-all 404). To nie są trasy treściowe |

---

# PACKAGE LEGEND (EN)

**Generated 2026-08-26 from the `catherly-www` repository, branch
`faza-4/podstrony`.** Everything here comes from **reading and measurement**,
not from copying documents. Note: **all content is in Polish, English and
German; all field names and file contents are in Polish.**

## What is in which file

| file | contents |
|---|---|
| `01-STRUKTURA.json` | 9 routes (`trasy`). Per route: sections (`sekcje`) **in DOM order**; per section: `sekcja_id` (React component name), `aria_labelledby`, and `elementy` — a list of elements with `typ` (element type), `tekst` (text) and `klucz_i18n` (i18n key) |
| `02-TEKSTY-pl/-en/-de.json` | `komunikaty`: **330** flattened i18n keys (`Section.key` → text), exactly as in `messages/<lang>.json`. `pliki_tresci`: **14** raw `content/<lang>/*.md` files, unprocessed |
| `03-PALETA.json` | 5 palettes (`produkcja` = production, plus `len`, `kosc`, `popiol`, `czern`) × **14 roles**, read two ways: `deklaracje_z_globals_css` (source quote) and `wartosci_rozwiazane` (browser `getComputedStyle`). Plus a **WCAG 2.x contrast table** (`kontrasty`) and rules (`reguly`) |
| `04-TYPOGRAFIA.json` | font files with sizes, weights in use, full `font-size` scale from CSS, `clamp()` values, uppercase tracking |
| `05-ZRZUTY/` | **26** full-page screenshots, named `route--viewport--palette.png` |
| — | **everything in one move:** `git archive --format=zip HEAD:docs/weryfikacja-zewnetrzna > pakiet.zip` (run inside the repository) |

## Joining structure to text

`01-STRUKTURA.json` → `trasy["<route>"].sekcje[].elementy[].klucz_i18n`
→ **same key** in `02-TEKSTY-<lang>.json` → `komunikaty["<key>"]`.

⚠ **`klucz_i18n: null` means "no unambiguous match", NOT "no key exists".**
Matching was done **in reverse**: DOM text compared against `messages/pl.json`
values. Unmatched: text assembled from several keys, numbers injected from
`content/facts.json`, strings shorter than 4 characters, and strings that occur
under **more than one** key — those yield an **array** of candidates, not
`null`. Per-route counts are in `liczba_elementow` and `dopasowanych_do_klucza`.

## Reading palette roles

The site never uses colours directly — it uses **roles**. A role names the job
a colour does; its value changes between palettes, its name does not. Key roles:
`tlo-strony` = page background · `tekst-podstawowy` / `tekst-drugorzedny` =
primary / secondary text · `kreska` = borders and rules · `akcent` =
**decoration only** (bullets, ornaments) · `interakcja` = CTA button fill ·
`tekst-na-interakcji` = label **on** the button · `fokus` = keyboard focus ring,
**never the accent role**.

Palette switching is the `data-paleta` attribute on `<html>`. **Production runs
WITHOUT this attribute** — the four named palettes are experiment variants.

## ⚠ DISCREPANCIES — what not to assume

1. **Typeface.** Three `woff2` files exist (70.8 KB total) but **none is
   deployed**; the production typeface is **`system-ui`**. Screenshots therefore
   show system fonts, not Onest.
2. **The experiment blocks expire 2026-08-31** — 5 days after this package was
   made. After that date the four palettes are removed together with the block.
   **This package describes a state with an expiry date.**
3. **`accent × background` is below 3:1 in the production palette (2.87).** This
   is **not a defect**: the accent role is decoration, never a text or border
   carrier.
4. **`CTA fill × background` is below 3:1 in the three light palettes** (as low
   as 1.12). Documented and deliberate: **the button border carries the
   boundary**, not the fill contrast. The label on the fill measures 13.52:1.
5. **`R-AKCENT-01` has no automated guard** — it exists only as prose in CSS.
6. **`R-AKCENT-01` is SUSPENDED for the `czern` variant only**, where the lime
   measures 13.13:1 and may carry text.
7. ⚠ **One content location contradicts six others.** On 2026-08-26, **12
   locations** of the calendar-reminder promise were corrected to a *window*
   ("within the last 30 minutes before the conversation").
   **`content/tabela-obietnic.md:37` was outside that scope** and still says
   "30 minutes before **each** conversation". **When reviewing copy, do not
   treat this as two options to choose between — it is a known, reported
   discrepancy.**
8. **9 routes, 11 `page.tsx` files** — `/nie-znaleziono` and the catch-all 404
   route are outside this package.

---

## Pobranie całości / Getting everything at once

```bash
git archive --format=zip HEAD:docs/weryfikacja-zewnetrzna > pakiet.zip
```

**Dlaczego archiwum nie leży w repozytorium.** Gotowy `pakiet.zip` ważyłby
**9,5 MB** i dublowałby **bajt w bajt** pliki, które są w tym samym commicie —
a raz dodany do historii gita zostaje w niej na zawsze. `git archive` buduje
go **z commita**, więc archiwum jest z definicji zgodne ze stanem, który
opisuje, i nie może się z nim rozjechać. *(The archive is not stored in the
repository: it would duplicate 9.5 MB already committed, permanently. `git
archive` rebuilds it from the commit, so it can never drift from the state it
describes.)*

## Jak pakiet powstał / How it was produced

Skrypty generujące były **jednorazowe i nie zostały zapisane w repozytorium** —
odtworzenie polega na powtórzeniu opisanych odczytów, nie na uruchomieniu
narzędzia. Źródła: `src/i18n/messages/*.json`, `content/**`,
`src/app/globals.css`, `src/styles/generated/tokeny.css`, `public/fonts/**`
oraz **wyrenderowany DOM** i `getComputedStyle` z `next start` na porcie
lokalnym. Kontrasty policzone wzorem WCAG 2.x (relatywna luminancja) —
tym samym, którego używa `scripts/kontrast.mjs`.
