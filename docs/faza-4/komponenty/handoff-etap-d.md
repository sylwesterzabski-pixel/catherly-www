# Handoff Etapu D — /funkcje (indeks) i /dla-kogo

**Status: OBOWIĄZUJE — wejście do implementacji.**
Data: 2026-08-13.

**Źródła (kolejność rozstrzygania sporów):**

1. `content/{pl,en,de}/funkcje.md` i `content/{pl,en,de}/dla-kogo.md` —
   treść sankcjonowana (D-D1…D-D21, 2026-08-13). **Zamknięta.**
2. `docs/faza-4/hf/d-funkcje-indeks.html` i
   `docs/faza-4/hf/d-dla-kogo.html` — **po panelu projektu 2026-08-13**;
   bloki komentarza na górze obu plików niosą rozstrzygnięcia
   z uzasadnieniami. **CSS bierzesz z makiety 1:1**, jak w Etapach B/C.
3. `docs/faza-4/komponenty/brief-etap-d-indeks-i-dla-kogo.md` — brief
   etapu. Gdzie panel odszedł od briefu, jest to nazwane niżej wprost.
4. `docs/faza-4/tresci-etap-d-po-panelach.md` — protokół treści;
   nazwy kluczy messages pochodzą stamtąd.

Sprzeczność makieta ↔ treść rozstrzyga treść. Sprzeczność makieta ↔
brief rozstrzyga makieta (panel był po briefie). Sprzeczność
czegokolwiek z ADR-018 rozstrzyga ADR-018.

---

## 1. Kontrakt dwóch nowych komponentów

Wzorzec: `src/components/ModulFunkcji.tsx` i
`src/components/SekcjaKierunku.tsx`. Ten sam układ pliku: `type Props`
z komentarzem dokumentacyjnym przy KAŻDEJ własności, komentarz bloku
nad funkcją ze wskazaniem HF i decyzji, CSS Modules, zero JS,
zero `"use client"`.

### 1.1 `src/components/BlokZadaniaDnia.tsx`

```tsx
import styles from "./BlokZadaniaDnia.module.css";

type Pozycja = {
  /** Etykieta pozycji = nazwa modułu podstrony docelowej, REUŻYTA
   *  z JEJ przestrzeni messages (D-D12) — np.
   *  tTresci("mod6_nazwa"). Nigdy nowy ciąg, nigdy kopia
   *  w FunkcjeIndeks. */
  etykieta: string;
  /** Pełny adres celu z fragmentem, w języku strony:
   *  `${adresWJezyku(locale, "/funkcje/tresci")}#tarcza`.
   *  Slug kotwicy jest WSPÓLNY dla trzech języków (kontrakt
   *  publiczny; bramka kotwic sprawdza ×3). */
  href: string;
};

type Props = {
  /** H2 bloku — nazwa ZADANIA DNIA, nie nazwa filaru
   *  (FunkcjeIndeks.blokNNaglowek). */
  naglowek: string;
  /** Id H2 = KOTWICA bloku (pozyskiwanie | tresci | zespol | wyniki)
   *  i cel aria-labelledby sekcji. Slug wspólny ×3 języki. */
  idNaglowka: string;
  /** 1–2 zdania: po co ten kawałek dnia istnieje
   *  (FunkcjeIndeks.blokNWprowadzenie). */
  wprowadzenie: string;
  /** KOMPLET pozycji podstrony docelowej, w JEJ kolejności modułów
   *  (11 / 10 / 6 / 6). Skrócenie listy jest zmianą treści, nie
   *  decyzją układu — brief, „Ile funkcji wymienić w bloku". */
  pozycje: readonly Pozycja[];
  /** Etykieta linku wejściowego (FunkcjeIndeks.blokNLink) —
   *  BEZ strzałki: „→" dokłada CSS ::after z PUSTYM tekstem
   *  alternatywnym (D-D10, rozstrzygnięcie 7 panelu). */
  linkEtykieta: string;
  /** Adres podstrony filarowej w języku strony. */
  linkHref: string;
};

/**
 * I3 — blok zadania dnia (markup wg HF
 * docs/faza-4/hf/d-funkcje-indeks.html, po panelu 2026-08-13).
 * SEKCJA na tle strony, rozdzielona kreską — BEZ karty
 * (rozstrzygnięcie 3: karta na powierzchni znaczy na serwisie
 * „wariant kierunku", SekcjaKierunku). BEZ slotu obrazu (brief:
 * indeks nie obiecuje ekranu). Lista: <ol role="list"> bez cyfr,
 * JEDNA KOLUMNA ZAWSZE (rozstrzygnięcia 1 i 4). Cel dotykowy
 * budowany paddingiem samego <a> (rozstrzygnięcie 6). Kotwica: h2
 * z id + scroll-margin 5rem (W4). Zero JS.
 */
export function BlokZadaniaDnia({
  naglowek,
  idNaglowka,
  wprowadzenie,
  pozycje,
  linkEtykieta,
  linkHref,
}: Props) {
  return (
    <section className={styles.blok} aria-labelledby={idNaglowka}>
      <div className={styles.wnetrze}>
        <h2 id={idNaglowka} className={styles.naglowek}>
          {naglowek}
        </h2>
        <p className={styles.wprowadzenie}>{wprowadzenie}</p>
        {/* role="list" JEST WARUNKIEM, nie ozdobą: przy
            list-style: none Safari i VoiceOver zdejmują semantykę
            listy razem z liczbą pozycji, a liczba pozycji jest
            jedynym słyszalnym dowodem kompletności listy
            (precedens PasekPotwierdzen.tsx:14). */}
        <ol className={styles.lista} role="list">
          {pozycje.map((pozycja) => (
            <li key={pozycja.href}>
              <a href={pozycja.href}>{pozycja.etykieta}</a>
            </li>
          ))}
        </ol>
        <p className={styles.wejscie}>
          <a href={linkHref}>{linkEtykieta}</a>
        </p>
      </div>
    </section>
  );
}
```

CSS: `src/components/BlokZadaniaDnia.module.css` — 1:1 z makietą
(`.blok`, `.blok h2`, `.blok__wprowadzenie`, `.blok__lista`,
`.blok__lista a`, `.blok__wejscie`, `.blok__wejscie a::after`).
Kreska między blokami jest w makiecie zapisana jako `.blok + .blok`;
w module CSS zapisz ją tak samo (`.blok + .blok`), bo sąsiedztwo
istnieje w DOM strony. `@media` NIE MA — jedna kolumna zawsze.

### 1.2 `src/components/SciezkaRozpoznania.tsx`

```tsx
import type { ReactNode } from "react";

import styles from "./SciezkaRozpoznania.module.css";

type Akapit = {
  /** Klucz messages tego akapitu (s1_robi_1 …) — stabilny key
   *  Reacta; lista jest statyczna i nigdy nie zmienia kolejności. */
  klucz: string;
  /** Akapit CO ROBI zbudowany przez t.rich(...) na stronie:
   *  1–2 linki wplecione w zdanie (D-D21 — etykieta linku jest
   *  dokładnym podciągiem akapitu). Komponent go NIE interpretuje. */
  tresc: ReactNode;
};

type Props = {
  /** H2 ścieżki — zdanie ROZPOZNANIA SIEBIE, nie etykieta segmentu
   *  (D-D4; DlaKogo.sN_h2). */
  naglowek: string;
  /** Id H2 = KOTWICA ścieżki. Kontrakt publiczny D-D14, wspólny ×3
   *  języki: pracujesz-sama | budujesz-zespol | prowadzisz-strukture.
   *  Cel aria-labelledby sekcji ORAZ cel linku ze spisu treści. */
  idNaglowka: string;
  /** CO BOLI — ZAWSZE pierwszy akapit po H2. Pozycja jest częścią
   *  kontraktu, nie składu: razem ze stopniem 1.125rem niesie
   *  rozdział bólu od działania BEZ etykiety leksykalnej i BEZ
   *  koloru (rozstrzygnięcie 1 panelu — kolor jako jedyny nośnik
   *  znika w forced-colors: active). */
  boli: string;
  /** CO CATHERLY Z TYM ROBI — 3 / 2 / 2 akapity wg ścieżki. */
  akapity: readonly Akapit[];
  /** OD KTÓREGO PLANU — zdania sankcjonowane, 1 / 2 / 3 wg ścieżki,
   *  KAŻDE w osobnym <p>: pełna forma „W planie Growth…" musi zostać
   *  własnym zdaniem (rejestr warunków powrotu, poz. 11). */
  zdaniaPlanu: readonly string[];
  /** Etykieta linku do cennika (DlaKogo.cennikLink). */
  linkCennikaEtykieta: string;
  /** Adres /cennik w języku strony. */
  linkCennikaHref: string;
  /** CZEGO TA ŚCIEŻKA NIE ZAŁATWIA — 1 zdanie, OBOWIĄZKOWE (D-D3a).
   *  Rejestr wizualny granicy identyczny jak w ModulFunkcji:
   *  kreska inline-start + tekst drugorzędny (rozstrzygnięcie 2). */
  granica: string;
};

/**
 * S4 — ścieżka rozpoznania (markup wg HF
 * docs/faza-4/hf/d-dla-kogo.html, po panelu 2026-08-13). SEKCJA na
 * tle strony, bez karty (rozstrzygnięcie 4: karta zamyka ścieżkę jak
 * ofertę dla segmentu, brief chce rozpoznania „to ja"). PIĘĆ członów
 * o różnym statusie bez ani jednej widocznej etykiety — rozdział
 * niosą pozycja, stopień i krawędź, nie kolor. Wiersz planu jest
 * CZŁONEM ścieżki, NIE komponentem PlanJednymWierszem
 * (rozstrzygnięcie 3 — brief w tym punkcie się nie utrzymał).
 * Kotwica: h2 z id + scroll-margin 5rem (W4). Zero JS.
 */
export function SciezkaRozpoznania({
  naglowek,
  idNaglowka,
  boli,
  akapity,
  zdaniaPlanu,
  linkCennikaEtykieta,
  linkCennikaHref,
  granica,
}: Props) {
  return (
    <section className={styles.sciezka} aria-labelledby={idNaglowka}>
      <div className={styles.wnetrze}>
        <h2 id={idNaglowka} className={styles.naglowek}>
          {naglowek}
        </h2>
        <p className={styles.boli}>{boli}</p>
        {akapity.map((akapit) => (
          <p key={akapit.klucz} className={styles.robi}>
            {akapit.tresc}
          </p>
        ))}
        <div className={styles.plan}>
          {zdaniaPlanu.map((zdanie) => (
            <p key={zdanie}>{zdanie}</p>
          ))}
          <p>
            <a href={linkCennikaHref}>{linkCennikaEtykieta}</a>
          </p>
        </div>
        <p className={styles.granica}>{granica}</p>
      </div>
    </section>
  );
}
```

CSS: `src/components/SciezkaRozpoznania.module.css` — 1:1 z makietą
(`.sciezka`, `.sciezka h2`, `.sciezka__boli`, `.sciezka__robi`,
`.sciezka__plan`, `.sciezka__plan p`, `.sciezka__granica`).
`.sciezka__granica` jest **znak w znak** kopią
`ModulFunkcji.module.css:35-41` — jeden wzorzec, jedno znaczenie.
Wnętrze ścieżki idzie na `--wymiar-kontener-strony` (jak każda sekcja
serwisu); długość wiersza trzyma `--wymiar-miara-akapitu` NA KAŻDYM
akapicie.

---

## 2. Co reużywamy BEZ zmian

| Komponent | Użycie w Etapie D |
| --- | --- |
| `Nawigacja` | obie strony; `biezacaSciezka="/funkcje"` i `"/dla-kogo"` → `aria-current="page"` na pozycji menu (A-1 daje `"true"` tylko podstronom sekcji). |
| `Stopka` | z layoutu, bez dotknięcia. |
| `NaglowekPodstrony` | obie strony; `naglowek` + `zdanie`. `id="podstrona-h1"` i `aria-labelledby="podstrona-h1"` są w komponencie NA SZTYWNO (`NaglowekPodstrony.tsx:18` i `:20`) — nie próbuj podawać własnego id. |
| `SpisTresci` | **wyłącznie `/dla-kogo`** (3 pozycje = H2 ścieżek verbatim). `/funkcje` idzie BEZ spisu — D-D20 doprecyzowane 2026-08-13: „Na tej stronie" jest stałą PODSTRON funkcji, indeks sam jest nawigacją. |
| `PlanJednymWierszem` | **wyłącznie `/funkcje`** (I5), wariant jednozdaniowy: `zdanie={t("f8")}`, `linkEtykieta={t("f8link")}`, `linkHref` = /cennik w języku strony. |
| `Zamkniecie` | obie strony, wariant krótki: `ctaEtykieta` + `ctaHref="/login"` (ADR-023) + `zdaniePo`. Bez `zdaniePrzed`. |
| `Okruszki` | **NIE UŻYWAMY** na żadnej z dwóch stron (D-D2a: ścieżka jednopoziomowa). |
| `PrzejsciaFilarow` | nie dotyczy — F9 jest elementem podstron filarowych. |

`src/i18n/sciezki.ts`: `/funkcje` i `/dla-kogo` są już w
`ISTNIEJACE_SCIEZKI` przez `POZYCJE_MENU` — **rejestru nie ruszasz.**

## 3. Co wymaga zmiany

### 3.1 `PlanJednymWierszem` — BEZ ZMIAN (decyzja nazwana)

Panel rozważył wariant „do lewej, w mierze akapitu" na potrzeby
wiersza planu wewnątrz ścieżki `/dla-kogo` i **odrzucił go**.
Uzasadnienie: wariant układu wprowadzony po to, żeby komponent
przestał być tym, czym jest (wyśrodkowaną sekcją zamykającą), jest
zmianą tożsamości, nie parametryzacją; a jego cztery istniejące
użycia (`/funkcje/pozyskiwanie`, `/funkcje/tresci`, `/funkcje/zespol`,
`/funkcje/wyniki`) dostałyby nowy props tylko po to, by go nie używać.
Wiersz planu w `/dla-kogo` jest więc CZŁONEM `SciezkaRozpoznania`.
**Wpływ na cztery istniejące użycia: żaden — plik nie jest dotykany.**

### 3.2 `SpisTresci.tsx` — jedna linia, retro

`SpisTresci.tsx:35` renderuje `<ol className={styles.lista}>`, a
`SpisTresci.module.css` ma `list-style: none`. To jest ta sama luka,
którą panel zamknął w `BlokZadaniaDnia`: przy zdjętych znacznikach
Safari i VoiceOver zdejmują semantykę listy razem z liczbą pozycji.

```tsx
<ol className={styles.lista} role="list">
```

Zmiana jest w zakresie Etapu D, bo: zero zmian widocznych, zero
nowych wartości, trzy precedensy w repo (`CennikSkrot`,
`PasekPotwierdzen`, `SekcjaRytmu`), a `/dla-kogo` jest piątym
użyciem tego komponentu i pierwszym, w którym spis prowadzi do
sekcji spoza szablonu K12. **Wpływ:** cztery podstrony filarowe
dostają poprawną semantykę listy; asercje `spis.locator("ol > li > a")`
w `e2e/funkcje-podstrony.spec.ts:304` działają bez zmian.

### 3.3 `Okruszki.tsx` — ta sama linia, ten sam powód

`Okruszki.module.css` też ma `list-style: none` na `<ol>`. Dopisz
`role="list"`. Poza tym plik bez zmian.

### 3.4 Nowe pliki

- `src/app/[locale]/funkcje/page.tsx` — zastępuje `StronaWBudowie`.
- `src/app/[locale]/dla-kogo/page.tsx` — zastępuje `StronaWBudowie`.
- `src/components/BlokZadaniaDnia.tsx` + `.module.css`.
- `src/components/SciezkaRozpoznania.tsx` + `.module.css`.
- `src/i18n/messages/{pl,en,de}.json` — dwie nowe przestrzenie.
- `e2e/funkcje-indeks.spec.ts`, `e2e/dla-kogo.spec.ts`.

---

## 4. Klucze messages

Nazwy kluczy pochodzą z `docs/faza-4/tresci-etap-d-po-panelach.md`.
Wartości **znak w znak** z `content/pl/*.md` (i odpowiednio EN/DE).

### 4.1 `FunkcjeIndeks` — 18 kluczy

> POPRAWKA ARYTMETYCZNA (2026-08-13, po implementacji). Pierwsza
> wersja tej sekcji i T2 mówiły „16 kluczy", a tabela poniżej wylicza
> 18: 2 (rama) + 4 × 3 (bloki) + 2 (I5) + 2 (I6). Trzej agenci
> implementacji niezależnie zwrócili 18 i odmówili przycięcia listy do
> 16, bo zejście do 16 wymagałoby skasowania pary I5 albo I6, czyli
> ciągów sankcjonowanych. Mieli rację: błąd był w tym handoffie,
> nie w treści. Liczba obowiązująca: **18**.

| Klucz | Źródło w `content/pl/funkcje.md` |
| --- | --- |
| `h1` | Rama → H1 (I2) |
| `zdanie` | Rama → Zdanie korzyści |
| `blok1Naglowek` | Blok 1 → H2 |
| `blok1Wprowadzenie` | Blok 1 → Wprowadzenie |
| `blok1Link` | Blok 1 → Link wejściowy (BEZ „→") |
| `blok2Naglowek` / `blok2Wprowadzenie` / `blok2Link` | Blok 2 |
| `blok3Naglowek` / `blok3Wprowadzenie` / `blok3Link` | Blok 3 |
| `blok4Naglowek` / `blok4Wprowadzenie` / `blok4Link` | Blok 4 |
| `f8` | Rama → I5, zdanie planu |
| `f8link` | Rama → I5, „Zobacz cennik" |
| `zamkniecieCta` | Rama → I6, CTA |
| `zamkniecieZdanie` | Rama → I6, zdanie |

**33 etykiet pozycji list TU NIE MA i mieć nie będzie** (D-D12).
Strona pobiera je z przestrzeni podstron:

```tsx
const tPozyskiwanie = await getTranslations("FunkcjePozyskiwanie");
const tTresci = await getTranslations("FunkcjeTresci");
const tZespol = await getTranslations("FunkcjeZespol");
const tWyniki = await getTranslations("FunkcjeWyniki");
```

Mapa klucz → kotwica (kolejność = kolejność modułów podstrony
docelowej; sprawdzona z tablicami `MODULY` w czterech `page.tsx`):

- **Blok 1 — `FunkcjePozyskiwanie`, 11 pozycji:** `mod1_nazwa`→`formularz`,
  `mod2_nazwa`→`kalendarz`, `mod3_nazwa`→`subskrypcja-kalendarza`,
  `mod4_nazwa`→`eksport-vcard`, `mod5_nazwa`→`qr-polecajacy`,
  `mod6_nazwa`→`program-polecen`, `mod7_nazwa`→`dmo`,
  `mod8_nazwa`→`zadania`, `mod9_nazwa`→`sala-treningowa`,
  `mod10_nazwa`→`plany-rozmow`, **`aiNaglowek`→`asystent-ai`**.
- **Blok 2 — `FunkcjeTresci`, 10 pozycji:** `mod1_nazwa`→`studio`,
  `mod2_nazwa`→`szablony`, `mod3_nazwa`→`hashtagi`,
  `mod4_nazwa`→`kalendarz-publikacji`, `mod5_nazwa`→`zatwierdzanie`,
  `mod6_nazwa`→`tarcza`, `mod7_nazwa`→`pieczec-etyczna`,
  `mod8_nazwa`→`uczenie-glosu`, `mod9_nazwa`→`tablica-postow`,
  **`aiNaglowek`→`asystent-ai`**.
- **Blok 3 — `FunkcjeZespol`, 6 pozycji:** `mod1_nazwa`→`kreator-wdrozeniowy`,
  `mod2_nazwa`→`zatwierdzanie-zespolu`, `mod3_nazwa`→`pierwsze-90-dni`,
  `mod4_nazwa`→`osiagniecia`, `mod5_nazwa`→`paszport-zgodnosci`,
  `mod6_nazwa`→`akademia`.
- **Blok 4 — `FunkcjeWyniki`, 6 pozycji:** `mod1_nazwa`→`pulpit`,
  `mod2_nazwa`→`twoj-wrapped`, `mod3_nazwa`→`cel`,
  `mod4_nazwa`→`sciana-sukcesow`, `mod5_nazwa`→`swiadectwo`,
  `mod6_nazwa`→`wall-of-proof`.

Razem 11 + 10 + 6 + 6 = **33**. Zbuduj to tablicami stałych w
`page.tsx` (wzorzec `MODULY` z podstron), nie ręcznym JSX ×33.

### 4.2 `DlaKogo` — 28 kluczy

Rama: `naglowek`, `zdanie`, `spisEtykieta`, `cta`, `ctaZdanie`,
`cennikLink`.

Ścieżka 1: `s1_h2`, `s1_boli`, `s1_robi_1`, `s1_robi_2`, `s1_robi_3`,
`s1_plan`, `s1_granica`.
Ścieżka 2: `s2_h2`, `s2_boli`, `s2_robi_1`, `s2_robi_2`, `s2_plan_1`,
`s2_plan_2`, `s2_granica`.
Ścieżka 3: `s3_h2`, `s3_boli`, `s3_robi_1`, `s3_robi_2`, `s3_plan_1`,
`s3_plan_2`, `s3_plan_3`, `s3_granica`.

Pozycje spisu treści = `s1_h2`, `s2_h2`, `s3_h2` **verbatim**, w tej
kolejności; żadnych osobnych kluczy spisu.

`cennikLink` = „Zobacz cennik" z `content/pl/dla-kogo.md` (trzy
wystąpienia, identyczne — jeden klucz). Protokół nie nadał mu nazwy;
**ciąg jest sankcjonowany, nowa jest wyłącznie nazwa klucza** — nie
jest to punkt dla właściciela.

### 4.3 Linki w prozie — jedyny nowy mechanizm etapu

13 linków `/dla-kogo` żyje WEWNĄTRZ akapitów (D-D21). `t.rich` nie
jest w tym repo używany **nigdzie** — to jest pierwszy raz, więc
opisz go w komentarzu strony.

Wartość klucza niesie znaczniki, np.:

```
"s1_robi_1": "Kolejność rozmów układasz w <dmo>Dziennym Planie Działania</dmo> — dzień zaczynasz od konkretu, nie od zastanawiania się. Terminy rozmów wpisujesz do <kalendarz>kalendarza z przypomnieniami</kalendarz> — {minuty} minut przed każdą rozmową Catherly przypomina ci o niej."
```

Nazwy znaczników są **semantyczne (cel linku), nie porządkowe**:
w EN/DE szyk zdania bywa inny, a `<link1>` przypisałby wtedy adres
do niewłaściwej frazy. Znaczniki bez myślników (ICU).

| Klucz | Znaczniki → cel |
| --- | --- |
| `s1_robi_1` | `dmo` → /funkcje/pozyskiwanie#dmo · `kalendarz` → #kalendarz |
| `s1_robi_2` | `formularz` → #formularz · `salaTreningowa` → #sala-treningowa |
| `s1_robi_3` | `szablony` → /funkcje/tresci#szablony · `tarcza` → #tarcza |
| `s2_robi_1` | `pulpit` → /funkcje/wyniki#pulpit · `kreator` → /funkcje/zespol#kreator-wdrozeniowy |
| `s2_robi_2` | `pierwsze90` → /funkcje/zespol#pierwsze-90-dni · `osiagniecia` → #osiagniecia |
| `s3_robi_1` | `zatwierdzanieZespolu` → /funkcje/zespol#zatwierdzanie-zespolu · `paszport` → #paszport-zgodnosci |
| `s3_robi_2` | `akademia` → /funkcje/zespol#akademia |

Razem 2 + 2 + 2 + 2 + 2 + 2 + 1 = **13**. Adresy budujesz przez
`adresWJezyku(locale, "/funkcje/…")` + `#kotwica`.

### 4.4 Liczba „30 minut"

`s1_robi_1` niesie placeholder ICU `{minuty}`. Mechanizm istniejący
w repo (**komponentu liczby NIE MA** — makieta mówiła o nim błędnie,
poprawione):

```tsx
import fakty from "../../../../content/facts.json";
const MINUTY_PRZYPOMNIENIA =
  fakty.fakty["przypomnienie-kalendarza-minuty"].wartosc;
```

i podstawienie w `t.rich("s1_robi_1", { minuty: MINUTY_PRZYPOMNIENIA, … })`.
Precedens: `src/app/[locale]/funkcje/pozyskiwanie/page.tsx:48-50`
i `:102`. Literał w JSX nie przejdzie `lint-liczby`.

---

## 5. Kotwice

### 5.1 Wymagane `id` w HTML nowych stron

`/funkcje` (4 kotwice + 1 id nagłówka):
`pozyskiwanie`, `tresci`, `zespol`, `wyniki`, `podstrona-h1`.

`/dla-kogo` (3 kotwice + 1 id nagłówka):
`pracujesz-sama`, `budujesz-zespol`, `prowadzisz-strukture`,
`podstrona-h1`.

`#tresc` na `<main>` dochodzi z layoutu (skip-link) — nie duplikuj.
Wszystkie slugi są **wspólne dla pl/en/de** (D-D14 dla `/dla-kogo`;
dla `/funkcje` wynikają z treści sankcjonowanej ×3).

### 5.2 Kotwice DOCELOWE, od których zależy bramka

Bramka `scripts/check-kotwice.mjs` sprawdza dla każdego linku
z fragmentem, że strona docelowa istnieje **oraz** że element o tym
`id` jest w jej HTML — na trzech językach.

`/funkcje/pozyskiwanie` (11): `formularz`, `kalendarz`,
`subskrypcja-kalendarza`, `eksport-vcard`, `qr-polecajacy`,
`program-polecen`, `dmo`, `zadania`, `sala-treningowa`,
`plany-rozmow`, `asystent-ai`.

`/funkcje/tresci` (10): `studio`, `szablony`, `hashtagi`,
`kalendarz-publikacji`, `zatwierdzanie`, `tarcza`, `pieczec-etyczna`,
`uczenie-glosu`, `tablica-postow`, `asystent-ai`.

`/funkcje/zespol` (6): `kreator-wdrozeniowy`, `zatwierdzanie-zespolu`,
`pierwsze-90-dni`, `osiagniecia`, `paszport-zgodnosci`, `akademia`.

`/funkcje/wyniki` (6): `pulpit`, `twoj-wrapped`, `cel`,
`sciana-sukcesow`, `swiadectwo`, `wall-of-proof`.

Wszystkie 33 są dziś obecne w kodzie: pochodzą z tablic `MODULY`
w czterech `src/app/[locale]/funkcje/*/page.tsx` plus dwa
`SekcjaKierunku idNaglowka="asystent-ai"` (pozyskiwanie:111,
tresci:106). Kotwice `/dla-kogo` (13 linków w prozie) celują
w podzbiór tej samej listy — żadnego nowego `id` na podstronach
tworzyć nie trzeba.

**Bramka jest poza pre-commit** (wymaga builda) — miejsce w CI, obok
bramki linków, jako `npm run bramka:kotwice`. **Dowód mutacji jest
częścią etapu:** podmień jedną kotwicę w treści indeksu na
nieistniejącą i pokaż czerwień. Bramka bez dowodu ma status
niesprawdzonej, a niesprawdzona liczy się jak niedziałająca
(ADR-018).

---

## 6. Wymagania testowe

Wszystko ×3 języki, jeśli nie napisano inaczej.

**T1. D-D21 — etykieta linku zgadza się ze źródłem treści.**
~~Dla każdego z 13 linków `/dla-kogo`: tekst `<a>` MUSI być dokładnym
podciągiem tekstu akapitu, w którym stoi.~~

**Wymaganie przeformułowane na etapie implementacji — poprzednie
brzmienie opisywało asercję, która nie potrafi zaczerwienić.** Link
jest dzieckiem akapitu, więc `textContent` akapitu z definicji zawiera
`textContent` linku: warunek „etykieta jest podciągiem swojego
akapitu" jest prawdziwy zawsze, niezależnie od treści. Zielona
asercja bez zdolności do czerwieni nie jest zabezpieczeniem
(ADR-018 — brak dowodu = brak zabezpieczenia), a poprzednie
brzmienie właśnie taką asercję zamawiało.

Sprawdzalna treść D-D21: **etykieta linku to DOKŁADNIE fraza
zadeklarowana w wierszu `**Linki:**` pliku `content/{j}/dla-kogo.md`,
a adres to zadeklarowany tam cel** — porównanie ze źródłem
zewnętrznym wobec kodu (CLAUDE.md, źródła prawdy: treść =
`content/{pl,en,de}`). Frazy są w treści zapisywane w formie,
w jakiej stoją w zdaniu (PL „Sali Treningowej", DE
„Einstiegsassistenten" — nie lemat), więc asercja łapie zarówno
podmianę frazy, jak i zawinięcie w link formy słownikowej, które
rozcięłoby wyraz. Własność podciągu wynika z tej asercji
w koniunkcji z porównaniem akapitu do messages — nie jest pisana
osobno. Realizacja: `e2e/dla-kogo.spec.ts`, `deklaracjeLinkow()` + test
(b), dowód mutacyjny w §8.

**T2. Znak w znak messages ↔ content**, wzorzec K12
(`e2e/funkcje-podstrony.spec.ts`, normalizacja wyłącznie białych
znaków `.replace(/\s+/g, " ")`, `expect(zrodlo).toContain(tresc)` per
klucz). Dwie różnice wobec K12, obie do zapisania w komentarzu testu:
- klucze `sN_robi_*` niosą znaczniki rich — przed porównaniem zdejmij
  `</?[a-zA-Z][a-zA-Z0-9]*>`;
- `s1_robi_1` niesie `{minuty}` — porównuj PO podstawieniu wartości
  z `facts.json` (precedens `e2e/funkcje-pozyskiwanie.spec.ts:56-61`).
Dla `FunkcjeIndeks` strażnik obejmuje **18 kluczy** (patrz poprawka
arytmetyczna w §4.1) — 33 etykiety
pozycji NIE wchodzą do niego, bo mieszkają w przestrzeniach podstron
i porównuje je strażnik tamtej strony (D-D12; zapisane wprost
w nagłówku `content/pl/funkcje.md`).

**T3. Strażnik milczenia.** `/funkcje`: suma `FRAZY_WSPOLNE` +
`frazyMilczenia` czterech podstron filarowych (indeks agreguje ich
zakres) **oraz słowo „rozliczenia" / „settlements" / „Abrechnungen"**
(I4 — cztery bloki, nie pięć). `/dla-kogo`: to samo plus pozycje
rejestru poz. 12: raporty struktury i sponsora, Liga zespołu,
Benchmarki, Hive Coach. Porównanie na surowym HTML z `request.get`,
pełne frazy małymi literami — jak w istniejącym strażniku.

**T4. Kotwice pod sticky nav (W4), geometrycznie.** Po wejściu na
`/dla-kogo#budujesz-zespol` i `/funkcje#tresci`:
`ramkaH2.y >= ramkaNaglowka.y + ramkaNaglowka.height` (wzorzec
`e2e/funkcje-podstrony.spec.ts:398-406`). Deklaracja
`scroll-margin-block-start: 5rem` w CSS **nie jest dowodem** —
dowodem jest pomiar.

**T5. Cel dotykowy pozycji indeksu.** Zmierz `boundingBox()` linku
listy: wysokość ≥ 24 px i brak nakładania się sąsiadów (2.5.8 AA).
Panel poprawił makietę właśnie na tym punkcie — poprzedni pomiar
(„≈ 44 px") był błędny; test ma pilnować wartości, nie deklaracji.

**T6. Zero JS.** `request.get` obu adresów: w surowym HTML obecne H1,
cztery H2 bloków (odpowiednio trzy H2 ścieżek), wszystkie 33 etykiety
pozycji, wszystkie 13 etykiet linków prozy, zdania planu, CTA
zamknięcia. Wzorzec „K12 bez JS".

**T7. Struktura i semantyka.** `/funkcje`: 1×h1 + 4×h2; cztery
`section[aria-labelledby]`; cztery `ol[role="list"]` o 11/10/6/6
pozycjach. `/dla-kogo`: 1×h1 + 3×h2; trzy `section[aria-labelledby]`;
`nav[aria-label="Na tej stronie"]` z `ol[role="list"]` o 3 linkach
celujących w `#pracujesz-sama`, `#budujesz-zespol`,
`#prowadzisz-strukture`.

**T8. `aria-current`.** Na `/funkcje` pozycja menu „Funkcje" ma
`aria-current="page"` (nie `"true"` — to jest ta strona, nie rodzic);
na `/dla-kogo` — pozycja „Dla kogo". Dopisz oba adresy do
`e2e/aria-current.spec.ts`.

**T9. 320 px bez panoramy** i **390 px mobile-first**: brak
przewijania poziomego, h1 w kadrze — wzorzec „K12 nie panoramuje".

**T10. axe** na obu adresach ×3 języki (`e2e/axe.spec.ts`).

**T11. Klawiatura**: przejście Tab przez 33 linki indeksu i przez
spis + 13 linków prozy bez pułapki fokusu; widoczny `:focus-visible`.

**T12. Bramki repo**: `bramka:linki`, `bramka:kotwice` (z dowodem
mutacji), `bramka:parytet`, `lint-liczby`, `lint-tokeny`,
`scripts/kontrast.mjs`. Żadna nowa para kontrastowa w tym etapie nie
powstaje — patrz niżej.

**Kontrasty użyte przez obie strony (wyliczone
`node scripts/kontrast.mjs`, 2026-08-13):** tekst-podstawowy × tło
11,07:1 · tekst-drugorzedny × tło 6,33:1 · link × tło 6,47:1 ·
link-aktywny × tło 8,45:1 · kreska × tło 1,20:1 (dekoracja
w sankcjonowanym zakresie „separatory", nie nośnik informacji).
Powierzchnia i powierzchnia-akcentowa **nie są używane** na żadnej
z dwóch stron — panel usunął karty i pasy tła.

---

## 7. Punkty dla właściciela

**1. Mikroetykieta pozycji kierunku na indeksie (NOWY CIĄG WIDOCZNY).**
Na liście 11 pozycji `asystent AI` wygląda identycznie jak pozycje
DZIAŁA. Trzy soczewki chciały mikroetykiety odróżniającej; panel jej
NIE wprowadził, bo to nowy ciąg widoczny (sankcja właściciela +
messages ×3), a D-D6 już raz to pytanie zamknął („etykieta «asystent
AI» to gołe wyrażenie rzeczownikowe bez czasownika — nie orzeka trybu
dokonanego"). **Rekomendacja panelu: nie otwierać ponownie.**
Gdyby właściciel chciał otworzyć — dwa warunki twarde: (a) brzmienie
„w przygotowaniu" jest odrzucone, bo obiecuje termin dostawy, którego
nikt nie sankcjonował; (b) decyzja obowiązuje na PIĘCIU stronach
naraz (indeks + cztery podstrony), inaczej powstaje rozjazd
indeks ↔ podstrona, czyli stan gorszy od dziedziczonej niejasności.

**2. FORMA oznaczenia pozycji kierunku na indeksie.**
~~Adnotacja `*(pozycja kierunku)*` przy „Studio".~~ **BEZPRZEDMIOTOWE
w tej postaci** — adnotacji przy Studiu w repo nie ma i nie było
sankcjonowanej; wpisałem ją błędnie i wycofałem w `65fece8`
(K-D5 w `docs/faza-4/rejestr-korekt-tresci.md`). Stan faktyczny
sprawdzalny: ciąg `*(pozycja kierunku)*` stoi wyłącznie przy
asystencie AI — `content/pl/funkcje.md:65` i `:99`, `en:65` i `:97`,
`de:63` i `:94`. Dwie pozycje kierunku z 33, zgodnie z kodem
i protokołem.

Otwarte zostaje to, co rozstrzygnął właściciel co do ZASADY:
„zero pozycji kierunku wyglądających jak dokonane (ADR-018)" —
oznaczenie jest OBOWIĄZKOWE, a jego FORMĘ rozstrzyga panel projektu.
Zakres: **dwie** pozycje (nie trzy), pięć stron naraz (indeks +
cztery podstrony). Warunki twarde panelu z punktu 1 obowiązują:
(a) brzmienie „w przygotowaniu" odrzucone — obiecuje termin dostawy;
(b) oznaczenie musi siedzieć WEWNĄTRZ `<a>`, inaczej znika
z nazwy dostępnej linku. Nowy ciąg widoczny wymaga sankcji
właściciela i wejścia do messages ×3 języki.

Lekcja zapisana w K-D5: użycie komponentu nie jest dowodem statusu
obietnicy. Dowodem są trzy źródła naraz — komentarz decyzyjny przy
użyciu, przynależność do tablicy `MODULY` i zapis w protokole treści.
Studio spełnia wszystkie trzy jako DZIAŁA
(`src/app/[locale]/funkcje/tresci/page.tsx:81-83` + `MODULY[0]`).

**3. Zakres naprawy 2.4.11 (Focus Not Obscured, AA).**
`scroll-margin-block-start: 5rem` ratuje SKOK do kotwicy, ale nie
ratuje wędrówki fokusu klawiaturą: sticky nav potrafi przykryć
element, który właśnie dostał fokus. Lekarstwo systemowe:
`html { scroll-padding-block-start: 5rem }` w `globals.css` plus
zdjęcie `scroll-margin` z `ModulFunkcji.module.css:24`,
`SekcjaKierunku.module.css:19` i `#tresc` w `globals.css`. To rusza
strony wdrożone w Etapach A–C, więc panel **nie rozszerzył sobie
zakresu**. Decyzja właściciela: naprawa w Etapie D (jeden PR, cztery
podstrony w regresji) czy osobne zlecenie po Etapie D. Luka jest
w repo od Etapu B — Etap D jej nie tworzy, tylko powiela na dwóch
kolejnych stronach.

**4. Ujednolicenie podkreśleń linków w `globals.css`.**
Serwis ma dziś dwie recepty podkreślenia (domyślna przeglądarki +
nawigacyjna 0.2em). Panel odmówił dopisania trzeciej lokalnie w
`/dla-kogo`, ale sam problem zostaje. Zmiana `globals.css` dotyka
wszystkich stron wdrożonych — decyzja nazwana, nie skutek uboczny
Etapu D. **Rekomendacja: osobne zlecenie porządkowe.**

---

## 8. Czego w tym handoffie NIE MA, i to jest celowe

- Nie ma nowych tokenów ani nowych par kontrastowych — nie było
  potrzeby, więc nie ma ADR.
- Nie ma zmian w PROZIE `content/` — treść jest zamknięta. Jedna
  zmiana w `content/` jednak jest: adnotacja w wierszu `**Linki:**`
  pliku `content/de/dla-kogo.md:99` („Einstiegsassistent" →
  „Einstiegsassistenten"), wykryta po akcepcie i opisana jako K-D6
  w `docs/faza-4/rejestr-korekt-tresci.md`. Zero bajtów widocznych
  dla użytkowniczki — pliki `.md` nie są renderowane.
- Nie ma tabeli planów na indeksie (D-D1a) ani okruszków (D-D2a)
  ani spisu treści na `/funkcje` (D-D20).
- Nie ma slotu obrazu w bloku indeksu (brief: indeks nie obiecuje
  ekranu; F4-3 dotyczy podstron).
- Nie ma wariantu układu wielokolumnowego. W systemie nie istnieje
  ani jeden, a `SpisTresci.module.css:2-3` mówi wprost „kolumna
  zawsze — bez wariantów układu".

---

## 9. Dowody mutacyjne (dopisane po implementacji, 2026-08-13)

Zielona bramka i zielony test nie dowodzą niczego o swoim zasięgu.
Dowodzi go dopiero CZERWIEŃ na celowo zepsutym wejściu (ADR-018 —
brak dowodu = brak zabezpieczenia). Poniżej trzy przeprowadzone
dowody; każdy zakończony przywróceniem stanu i potwierdzoną zielenią.

**M0 — bramka kotwic na zbudowanym HTML, 36 celów ×3 języki.**
Skrypt kontrolny zdejmował `id="<kotwica>"` z pliku docelowego we
wszystkich trzech językach, uruchamiał `bramka:kotwice` jako osobny
proces i żądał kodu wyjścia 1 oraz komunikatu nazywającego tę kotwicę.
Wynik: **36/36 celów czerwieni bramkę**, każdy nazwany trasą
i fragmentem. 36 celów pokrywa wszystkie 46 nowych linków (33 pozycje
indeksu + 13 linków prozy celują w 33 kotwice modułów; 3 linki spisu
`/dla-kogo` w 3 kotwice ścieżek). Build przywrócony bajt w bajt,
bramka po przywróceniu zielona (270 linków z fragmentem, 0 martwych).

**M1 — cały łańcuch źródło → build → bramka.** Zmutowano JEDNOCZEŚNIE
kotwicę pozycji w `BLOKI` (`src/app/[locale]/funkcje/page.tsx`,
`tarcza` → `tarcza-ZMUTOWANA`) i cel w `LINKI_PROZY`
(`src/app/[locale]/dla-kogo/page.tsx`, `akademia` →
`akademia-ZMUTOWANA`), po czym wykonano pełny `npm run build`.
Wynik: `bramka:kotwice` EXIT=1, **6 martwych z 270** — po jednym na
mutację na język, każdy nazwany. Źródła przywrócone (`cmp` bajtowy),
build powtórzony, bramka zielona.

**M2 — czy nowy strażnik T1 potrafi zaczerwienić.** Mutacja
CHIRURGICZNA w `src/i18n/messages/de.json`: przesunięcie granicy
znacznika bez zmiany tekstu akapitu —
`<kreator>Einstiegsassistenten</kreator>` →
`<kreator>Einstiegsassistent</kreator>en`. Tekst zdania po zdjęciu
znaczników jest IDENTYCZNY, więc T2 (znak w znak messages ↔ content)
pozostaje zielony; zmienia się wyłącznie fraza zawinięta w link, który
zaczyna rozcinać wyraz. Wynik: **dokładnie jeden test czerwony** —
`D-D21 (de)`, komunikat: oczekiwano „Einstiegsassistenten", otrzymano
„Einstiegsassistent"; pozostałe 22 testy pliku zielone. Poprzednie
brzmienie T1 („podciąg akapitu") tej mutacji NIE wykryłoby:
„Einstiegsassistent" jest podciągiem „…Einstiegsassistenten…".
Mutacja cofnięta, build powtórzony, pełny pakiet: 508 passed,
4 skipped (te same 4 pominięcia desktopowe co przed etapem).

**Znalezisko uboczne M2 — poprawka w pliku treści.**
`content/de/dla-kogo.md` deklarował w wierszu `**Linki:**` lemat
„Einstiegsassistent", podczas gdy własna proza tego samego pliku
niesie formę biernikową „über den Einstiegsassistenten ein".
Konwencja pliku jest jednoznaczna — PL deklaruje frazy odmienione
dokładnie tak, jak stoją w zdaniu („Dziennym Planie Działania",
„kalendarza z przypomnieniami", „Sali Treningowej") — więc
niezgodna była ADNOTACJA, nie kod: zawinięcie lematu rozcięłoby
wyraz. Adnotację doprowadzono do zgodności z prozą tego samego
pliku. **Zmiana nie rusza ani jednego bajtu tekstu widocznego dla
użytkowniczki**: pliki `content/**/*.md` nie są renderowane — czyta
je wyłącznie test T2 i człowiek. Do wiadomości właściciela jako
korekta w źródle prawdy.

---

## 10. Poprawki po adwersarzu Etapu D (2026-08-14)

Adwersarz (4 wymiary + sceptycy, Prawo 2) zwrócił 14 potwierdzonych
znalezisk. Każde sprawdziłem sam przed działaniem — dwa okazały się
nietrafione co do NAPRAWY, mimo trafnej DIAGNOZY (patrz punkt „do
decyzji" niżej). Wykaz zmian w kodzie:

### 10.1 Strażniki, które nie potrafiły zaczerwienić

- **T6 mierzył ładunek RSC, nie znaczniki.** Ciało odpowiedzi Next.js
  w ~70% składa się z `<script>self.__next_f.push(...)</script>`,
  więc `expect(cialo).toContain(...)` przechodziło dla ciągów, których
  w znacznikach NIE MA. Pomiar różnicowy: `/funkcje` 28430 znaków, w tym
  20812 w skryptach; ciąg 404 „Tej strony nie ma." jest w ciele, a nie
  w znacznikach. Dodany `bezSkryptow()` w obu specyfikacjach — test
  „treść bez JS" znów mierzy to, co ma w nazwie.
- **Brak zakotwiczenia 33 pozycji indeksu w źródle.** Strażnik „znak
  w znak" pytał tylko, czy fraza WYSTĘPUJE — zamiana wartości dwóch
  kluczy przechodziła. Nowy test (a2) parsuje numerowane wiersze
  `content/{j}/funkcje.md` i porównuje PARY (etykieta, cel) w kolejności
  dokumentu. **Uściślenie po dowodzie M3 (patrz §11): (a2) kotwiczy
  w treści LUSTRO `BLOKI` z linii 43 specyfikacji, nie sam `page.tsx`
  (ten ma własne, nieeksportowane `BLOKI` w linii 41).** Stronę pilnuje
  DOM-owy test `:343` porównujący render z tym samym lustrem. Dopiero
  para zamyka łańcuch DOM ↔ lustro ↔ treść; żaden z tych testów nie
  wystarcza sam.
- **19 fraz MILCZENIA bez pokrycia** na `/dla-kogo` — zakres zrównany
  z indeksem.
- **Brak asercji liczby akapitów** w obu specyfikacjach (`toHaveCount`).
- **Próg 2.5.8 zaniżony** do 24 px; podniesiony do 34 px (mierzona
  wartość rzeczywista), tytuł testu zgodny z asercją.

### 10.2 Dostępność w komponentach współdzielonych

- **`role="list"` — przegląd domknięty.** Adwersarz wskazał 5 list
  (`Nawigacja` ×1, `Stopka` ×4). Mój przegląd całego `src/` potwierdził
  te 5 i wykluczył pozostałe: `Filar.konkrety` i `SekcjaPlanow.lista`
  ZACHOWUJĄ punktory (stylowany `li::marker`), więc reguła ich nie
  dotyczy. Kryterium to `list-style: none`, nie sam znacznik `<ul>`.
- **Główna nawigacja bez nazwy dostępnej.** Na podstronach filarowych
  są TRZY landmarki `nav` (główna, okruszki, spis treści); dwa ostatnie
  mają nazwy od Etapu B, główna nie miała. Nowy klucz
  `Nawigacja.nawGlowna` ×3 („Nawigacja główna" / „Main navigation" /
  „Hauptnavigation"). Napisy chrome, nie proza — bez panelu językowego;
  zgłoszone właścicielowi.

### 10.3 Sprzątanie i bramki

- **`StronaWBudowie` usunięty** — komponent + przestrzeń `messages` ×3.
  Plan Fazy 4 mówi o Etapie D „zastępuje placeholder", więc usunięcie
  należy do zakresu tego etapu, a nie jest jego poszerzeniem. `/login`
  pozostaje stroną zastępczą, ale ma WŁASNĄ przestrzeń
  `StronaLogowania` — nie ożywia usuniętej. Odzysk:
  `git show ba3cba6:src/components/StronaWBudowie.tsx`.
- **Bramka wydajności mierzyła wyłącznie `/`.** Obie trasy Etapu D
  dopisane do `lighthouserc.json` PO POMIARZE, nie z założenia:
  `/` LCP 1717 ms · `/funkcje` 1706 ms · `/dla-kogo` 1703 ms, CLS 0,000
  i TBT 0 ms wszędzie, dostępność 1,00 (progi: 1800 / 0,1 / 200 / 1,0).
  Cztery podstrony filarowe Etapu B/C nadal poza bramką — dopisanie ich
  to +12 przebiegów Lighthouse w CI, czyli decyzja o czasie bramki.
- **Rejestr korekt**: dopisane K-D6 (adnotacja DE), poprawione zdanie
  w §8 tego handoffu, które twierdziło, że `content/` jest nietknięty.

### 10.4 Diagnoza trafna, naprawa błędna — do decyzji właściciela

Znaleziska 2.4.11 (Focus Not Obscured): adwersarz zaproponował
jednolinijkowe `html { scroll-padding-block-start: 5rem }` i napisał,
że „liczba zakrytych przystanków spada do 0". **Zmierzyłem — nieprawda
w obu członach.** Reguła SUMUJE SIĘ z istniejącym
`scroll-margin-block-start: 5rem` na celach kotwic: odsunięcie skoku
w `#wyniki` rośnie 80,2 px → 160,2 px, czyli +80 px pustki na każdej
z 270 kotwic serwisu. A liczba zakrytych przystanków Shift+Tab spada
`/funkcje` 15 → 1 i `/dla-kogo` 12 → 2, nie do zera. Poprawną naprawą
jest refaktor całego serwisu (scroll-padding w korzeniu + zdjęcie
scroll-margin z celów), a to dotyka wszystkich stron wdrożonych —
zakres właściciela, nie skutek uboczny Etapu D.

---

## 11. Dowody mutacyjne poprawek po adwersarzu (2026-08-14)

Zasada: strażnik, który nie potrafi zaczerwienić, nie jest
zabezpieczeniem — a to, że NOWY strażnik gryzie, też trzeba pokazać,
nie zadeklarować. Cztery mutacje, każda z odnotowanym zasięgiem.

### M3 · zamiana kotwic w `page.tsx` — WYNIK INNY, NIŻ ZAKŁADAŁEM

Mutacja: `mod1_nazwa ↔ mod2_nazwa` wymieniają się kotwicami
(`#formularz` ↔ `#kalendarz`) w `BLOKI` strony. Etykiety i cele nadal
istnieją — błędne jest wyłącznie PRZYPISANIE.

Oczekiwałem czerwieni na (a2). Zaczerwienił się **`:343` (DOM), a (a2)
został zielony** — bo (a2) czyta lustro `BLOKI` ze specyfikacji, a nie
`page.tsx`. Mutacja trafiła w inne ogniwo, niż celowałem. Zasięg:
`funkcje-indeks:343` ×6 i `:480` ×6; `bramka:kotwice` ZIELONA (cele
istnieją, tylko pod złymi etykietami) — czyli DOM-owy test łapie to,
czego bramka nie widzi. Wniosek naniesiony w §10.1: układ jest
poprawny, ale opisywałem go nieściśle.

### M3b · zamiana celów w `content/pl/funkcje.md` — (a2) gryzie punktowo

Mutacja: te same dwa cele zamienione w PLIKU TREŚCI. Wynik na pełnym
zestawie: **czerwone dokładnie 2 testy — (a2) w wersji `pl`, w obu
projektach. 512 zielonych.** `bramka:kotwice`, `bramka:linki`,
`bramka:parytet`, `bramka:kontrakt` — wszystkie ZIELONE.
To jest dowód wartości (a2): rozjazd przypisania treść ↔ kod nie jest
widoczny dla żadnego innego strażnika ani bramki.

### M4 · czy `bezSkryptow()` zmienia werdykt (pomiar, nie mutacja)

Skanowanie wszystkich wartości `messages` przeciwko odpowiedzi serwera:
`/funkcje` — ciało 28756 znaków, znaczniki 7708 (**skrypty to 73,2%**);
`/dla-kogo` — 28325 / 8339 (**70,6%**). Ciągów, które STARY
`toContain(cialo)` znajdował, a których w znacznikach NIE MA: **po 3 na
każdej stronie** — `NieZnaleziono.naglowek` („Tej strony nie ma."),
`NieZnaleziono.wroc`, `Wspolne.stronaGlowna`. Ładunek RSC niesie
granicę 404 każdej strony, więc stary test „treść bez JS" potwierdzał
obecność zdania, którego na badanej stronie nie ma w ogóle. Nie była
to nieszczelność ilościowa, tylko test mierzący nie ten obiekt.

### M5 · zdjęcie `role="list"` z `PasekPotwierdzen`

Mutacja sprawdza strażnika WZMOCNIONEGO przy okazji przeglądu ról.
Zasięg: `hero:120` („role=list w surowym HTML") ×6, `hero:31` ×6,
`cennik:56` ×6. Istotne jest `hero:120`: w postaci sprzed Etapu D
(`toContain('role="list"')` na całym HTML) test **zostałby ZIELONY**,
bo od przeglądu jawną rolę mają listy nagłówka i stopki. Po zawężeniu
do znacznika `<ul>` otaczającego potwierdzenia — czerwienieje.

**Efekt uboczny przeglądu ról, wart zapamiętania.** Dodanie
`role="list"` w `Nawigacja` i `Stopka` zaczerwieniło 6 testów cennika,
bo selektor `ul[role="list"]` zakładał po cichu „na stronie jest tylko
jedna taka lista" (17 pozycji zamiast 3). Poprawka to zawężenie do
`main ul[role="list"]` PLUS jawna asercja `toHaveCount(1)` na samą tę
jedyność — żeby założenie było odtąd sprawdzane, a nie zakładane.

### 11.1 Pułapka pomiaru — czerwień, która nie była regresją

Przy końcowej weryfikacji zaczerwieniły się dwa testy CSS na `/`
(`klawiatura:72` skip-link, `zlozenie:58` tło S10). Wyglądało to na
regresję po przeglądzie ról. **Nie było.** Serwowany HTML wskazywał
arkusz `9c623fb430173dd1.css`, którego w buildzie NIE MA, a arkusz
z regułami `skipLink` i `SekcjaRytmu` (10,5 KB) nie był podlinkowany —
czyli testy mierzyły artefakt sprzed przebudowy.

Mechanizm, wart zapamiętania na przyszłe etapy:

1. `npm run start` startuje proces, który przemianowuje się na
   `next-server` — `pkill -f "next start"` GO NIE ŁAPIE i kończy się
   kodem 0, więc wygląda na skuteczny.
2. `playwright.config.ts` ma `reuseExistingServer: !CI`, więc lokalnie
   Playwright cicho przejmuje ten zapomniany serwer zamiast wystawić
   własny na świeżym buildzie.

Skutek: pełny zestaw mierzy STARY artefakt, a wynik — czerwony czy
zielony — nie mówi nic o kodzie, który się właśnie napisało. Groźniejszy
jest wariant zielony: cichy fałszywy dowód. Rozpoznanie: `lsof -ti:3000`
plus porównanie czasu startu procesu z czasem builda. Ubijanie:
`lsof -ti:3000 | xargs kill -9`, nigdy `pkill -f "next start"`.

Po sprzątnięciu portu i przebiegu na świeżym serwerze: **514 zielonych,
4 pominięte, zero czerwonych** (baza sprzed etapu 508 + 6 nowych
przebiegów (a2) = 514).
