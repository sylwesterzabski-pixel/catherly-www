# Etap E — `/pomoc` w gatunku nawigacyjnym + mapa stopki: punkty decyzji

**Data:** 2026-08-15. **Gałąź:** faza-4/podstrony.
**Status: ROZSTRZYGNIĘTY W CAŁOŚCI — właściciel, 2026-08-15.**

---

## ROZSTRZYGNIĘCIA WŁAŚCICIELA (pakiet z 2026-08-15)

**E-1 — `/pomoc` NIE WCHODZI w tym wydaniu.** Właściciel uchylił własną
decyzję z 15.08 w świetle trzech nowych faktów (mapa stopki w tym samym
wydaniu na tej samej stronie · dublowanie kontaktu · arytmetyka po
zarzutach). Słowami właściciela: *„Krótkość była cechą, pustka nie
jest."* Warunek powrotu — **po premierze**, z treścią **z odczytu**:
realne pytania, istniejący kanał kontaktu, przetestowany onboarding.
Zapisane w ADR-014 (doprecyzowanie 2026-08-15 III) i w rejestrze
warunków powrotu jako **T8**. Ocena przebiegu: *„Trzy rundy paneli =
system zadziałał, nie zawiódł."*

**T5 — ROZSTRZYGNIĘTE.** Cztery podstrony filarów + `/dla-kogo`
**wchodzą** do zakresu ADR-014 (stan faktyczny po Etapach C–D, luka
formalna). Doprecyzowanie ADR-014 z datą 2026-08-15 (II); T5 zamknięte
w rejestrze.

**E-3 — bezprzedmiotowe** przy E-1.

**E-12 → T7.** Rejestr zdań z datą ważności (`/login` „przy premierze",
stopka „(wkrótce)") jako **pozycja na checkliście premiery, bez budowy
mechanizmu**. Zapisane w rejestrze jako T7.

**E-10 → OSOBNE ZLECENIE po mapie stopki.** `bramka:linki` ma czytać
`ISTNIEJACE_SCIEZKI` / middleware, nie sam zbudowany HTML. Właściciel
zakwalifikował to jako **lukę systemową**, nie usterkę jednego
przypadku: zielone bramki + 404 u użytkowniczki.

**ETAP E = mapa stopki (DECYZJA F4-5).** Komplet istniejących adresów;
krótkie etykiety filarów ×3 języki **przez pipeline treści (panel
krótki — to są etykiety nawigacyjne, nie proza)**. Po mapie stopki
i E-10: raport końca Etapu E → sygnał odbioru PNG.

---

## ROZSTRZYGNIĘCIE UZUPEŁNIAJĄCE (właściciel, 2026-08-15 — do panelu mapy)

**`/login` NIE wchodzi do mapy stopki.** Słowami właściciela: *„mapa to
spis TREŚCI serwisu, `/login` to AKCJA obecna w nagłówku każdej strony
(ADR-023); dublowanie rozmywa oba"*. **Mapa = 8 adresów treściowych:**
`/` · `/funkcje` · `/funkcje/pozyskiwanie` · `/funkcje/tresci` ·
`/funkcje/zespol` · `/funkcje/wyniki` · `/cennik` · `/dla-kogo`.

Odnotowanie: uzasadnienie właściciela wytrzymuje sprawdzenie w kodzie.
ADR-023 („Ścieżka zakupu przez /login", 2026-08-09) czyni z `/login`
**wejście ścieżki zakupu** — punkt akcji, nie pozycję treści; CTA cennika
prowadzi właśnie tam. Wyłączenie `/login` z mapy jest więc zgodne
z rolą, jaką ten adres już ma w dokumentach, a nie wyjątkiem od niej.
Skutek uboczny, korzystny: znika pytanie, czy etykieta „Logowanie"
w mapie obiecuje funkcję, której aplikacja jeszcze nie udostępnia
(ADR-018) — pytanie staje się bezprzedmiotowe zamiast wymagać dowodu.

**Trzy miny wdrożeniowe — przyjęte przez właściciela do obsługi przy
implementacji** (zgłoszone przeze mnie po weryfikacji w kodzie, nie
przez panel):

| # | Co | Rozstrzygnięcie właściciela |
|---|---|---|
| 1 | `e2e/parytet-ui.spec.ts:29` `LICZBA_LINKOW_STOPKI = 6` + asercja `toHaveCount` na wszystkich `<a>` w stopce (:120) | Aktualizacja **świadoma, z adnotacją** — nie ciche podbicie liczby. Przy mapie 8-adresowej: 8 + 3 języki = **11**. Komentarz :27-28 („mapa strony (3 pozycje) + języki (3)") wymaga przepisania razem z liczbą. |
| 2 | `e2e/parytet-ui.spec.ts:103` — `stopka.locator('a[aria-current="true"]')` **nie jest zawężony do sekcji języków**; w trybie strict wymaga dokładnie jednego trafienia w całej stopce | **Poprawka testu o złym zakresie, niezależna od mapy.** Asercję zawęzić do sekcji języków. Do czasu poprawki mapa **nie może** używać `aria-current="true"` — inaczej czerwieni się asercja o językach w miejscu pozornie niezwiązanym ze zmianą. |
| 3 | `Stopka.module.css` nie ma reguły dla listy zagnieżdżonej; selektor potomka `.stopka ul` (`padding: 0`) obejmuje też podlistę | Reguła CSS **wchodzi tylko wtedy, gdy panel wybierze hierarchię**. Wybór płaska-czy-hierarchiczna pozostaje mandatem panelu. |

**Kwestia „skąd stopka czyta" — mandat panelu.** Preferencja kierunkowa
właściciela: własna stała mapy (**nie** `POZYCJE_MENU`), etykiety przez
istniejące klucze (`*.okruszek` + `Nawigacja`), **zero duplikacji
ciągów**. Preferencja została przekazana panelowi jako preferencja,
nie rozkaz — z jawnym prawem podważenia jej dowodem.

### Sprostowanie briefu (błąd autora, nie panelu)

Brief panelu twierdził, że krótkich rzeczownikowych etykiet filarów
„nie ma NIGDZIE w messages" i że trzeba napisać 12 nowych ciągów.
**To była nieprawda.** Etykiety istnieją dziś w mianowniku, w trzech
językach, jako `FunkcjeX.okruszek` (`pl/en/de.json`: 200, 247, 292,
325), renderowane jako ostatni okruszek nawigacji. Błąd wykrył agent
fundamentu i niezależnie od niego dwa z trzech wariantów; sprostowanie
wstrzyknięto do faz sądu, syntezy i adwersarzy jako blok nadpisujący
brief. Liczba ciągów **do napisania spadła z dwunastu do zera**, a
zadanie zmieniło charakter: nie „wymyśl etykiety", tylko „rozstrzygnij,
skąd stopka je czyta".

Wobec tego istotny staje się **precedens D-D12**, potwierdzony w kodzie:
`src/app/[locale]/funkcje/page.tsx` reużywa etykiet podstron **znak
w znak**, trzymając nazwę przestrzeni docelowej jako daną w stałej
(`przestrzen: "FunkcjePozyskiwanie"`, :59/84/109/123) i rozwiązując ją
w runtimie (`BLOKI.map((blok) => getTranslations(blok.przestrzen))`,
:146). Komentarz kodu stawia regułę wprost: *„w FunkcjeIndeks ich nie
ma i mieć nie będzie"*, a symetrii pilnuje strażnik S-SYMETRIA
(`e2e/oznaczenie-kierunku.spec.ts`) w obie strony. Preferencja
właściciela pokrywa się więc z **wzorcem już działającym w serwisie**,
a nie wprowadza nowego.

### Rozstrzygnięcie właściciela 2026-08-15 — mapa HIERARCHICZNA

Cztery filary **wcięte pod `/funkcje`**. Uzasadnienie właściciela: *„mapa
to jedyne miejsce pokazujące kształt serwisu (nagłówek = jedna pozycja,
indeks widać po wejściu); spis spłaszczający strukturę twierdzi
nieprawdę o serwisie"*. Koszt (reguła CSS na 390 px — mina 3) przyjęty
świadomie. Async/sync stopki: decyzja wdrożeniowa wykonawcy, z testami.

Odnotowanie: decyzja zapadła **przed** werdyktami sędziów, a obaj
sędziowie — o rozłącznych soczewkach — ustawili ranking identycznie
(**B ▸ C ▸ A**, czyli hierarchia przed płaską), każdy innym dowodem.
Sędzia czytelniczki: w liście płaskiej cztery z ośmiu etykiet przestają
tłumaczyć się same, a najgorzej wypada EN, gdzie „Acquiring" jako
rodzeństwo „Pricing" nie znaczy nic. Sędzia języka: DE „Kontakte
gewinnen" jest jedyną frazą czasownikową wśród siedmiu rzeczowników —
w płaskiej liście czyta się jak błąd składu, nie jak nazwa filaru.

### Rozstrzygnięcie właściciela 2026-08-15 — „Pozyskiwanie" vs „kontakty"

Sędzia języka zgłosił, że mapa będzie **pierwszym miejscem w serwisie,
gdzie cztery nazwy filarów staną obok siebie w jednej kolumnie**, a
`Hero.podtytul` wylicza te same cztery obszary słowami „kontakty,
treści, zespół i wyniki" / „contacts, content, team, and results" /
„Kontakte, Inhalte, Team und Ergebnisse". Filary 2–4 zgadzają się co do
słowa we wszystkich trzech językach; filar 1 nie — mapa powie
„Pozyskiwanie", hero mówi „kontakty".

**Decyzja: różnica ZOSTAJE. Zero nowych ciągów.** Uzasadnienie
właściciela: *„Rejestr prozy ≠ rejestr nawigacji: zdanie mówi językiem
korzyści, spis językiem struktury"*. Precedens wskazany przez
właściciela: okruszek vs H1 podstron — te same strony noszą już dziś
dwie nazwy w dwóch rejestrach i jest to stan zamierzony, nie usterka.
Zapis świadomej decyzji, nie przeoczenia: gdyby ktoś w przyszłości
„naprawił" mapę na „Kontakty", zrównałby ją z `Cennik.tabela.kontakty`
(`pl/en/de.json:95` — „Kontakty" | „Contacts" | „Kontakte") i wprowadził
kolizję, której dziś nie ma.

### Cztery miny wdrożeniowe (trzecia lista — po werdyktach sędziów)

Do trzech min przyjętych wcześniej dochodzi **czwarta**, wykryta przez
sędziów i potwierdzona przeze mnie w kodzie:

**4. Erozja strażnika 404.** `e2e/nie-znaleziono.spec.ts:47` sprawdza
`expect(html).toContain(komunikaty.Wspolne.stronaGlowna)` na **surowym
HTML całej strony**, a komentarz :43-44 deklaruje, że chodzi o *link
powrotny do strony głównej*. Dziś asercja faktycznie mierzy, bo ciąg
występuje wyłącznie w `not-found.tsx:50` i na stronie logowania. Po
wejściu wiersza `/` do mapy stopki ciąg będzie w HTML-u **każdej**
strony — asercja przejdzie na zielono także wtedy, gdy link powrotny
zniknie z `not-found.tsx` całkowicie. **Strażnik przestanie strzec, nie
zmieniając koloru.** Rozstrzygnięcie właściciela: asercja przechodzi na
**lokator z `href`**, nie podciąg HTML. Anty-wzorzec zapisany na stałe
w `CLAUDE.md` (sekcja ADR-018): *„strażnik może zerodować przez zmianę
OTOCZENIA bez zmiany własnego kodu"*.

To ta sama klasa defektu co **E-10**: bramka sprawdza ślad w artefakcie
zamiast własności, o którą chodzi. Dwa niezależne znaleziska tej samej
klasy w jednym etapie są argumentem za tym, żeby E-10 traktować jako
lukę systemową — tak, jak właściciel je zakwalifikował, zanim to
znalezisko powstało.

**Dwa dodatkowe ustalenia przyjęte przez właściciela:**

- **Dwa `<a href="/">` w wersji polskiej.** Stopka będzie miała wiersz
  mapy („Strona główna") i link bieżącego języka („Polski") pod tym
  samym adresem. Reguła axe `identical-links-same-purpose` jest
  w axe-core 4.12.1 **wyłączona domyślnie** (potwierdza komentarz CI,
  `.github/workflows/bramki.yml:145`), więc żadna bramka tego nie
  zobaczy. Nazwy dostępne są różne, więc to nie usterka — ale ma być
  **komentarzem-decyzją w kodzie**, nie zbiegiem okoliczności.
- **Pułapka korzenia w teście parytetu.** `adresWJezyku("en", "/")`
  zwraca `/en`, nie `/en/` (`sciezki.ts:22` — jawny wyjątek dla `/`).
  Oczekiwania testu buduje się **wywołaniem `adresWJezyku()`**, nie
  konkatenacją `${prefiks}${sciezka}` — inaczej wiersz `/` produkuje
  `/en/` i test pada z komunikatem wyglądającym na błąd produkcji.

Różnica techniczna do rozstrzygnięcia przy wdrożeniu: indeks `/funkcje`
jest komponentem **async** i używa `getTranslations`, podczas gdy
`Stopka.tsx:38-40` jest synchroniczna i używa `useTranslations`.
Przeniesienie wzorca wymaga albo czterech wywołań `useTranslations` na
najwyższym poziomie komponentu (reguły hooków wykluczają wywołanie
w `.map()`), albo przerobienia stopki na async. To pytanie o kod, nie
o treść — rozstrzygane przy implementacji, po werdyktach adwersarzy.

> **Rozstrzygnięte przy wdrożeniu — patrz „WYKONANIE", decyzja 1.**
> Alternatywa okazała się fałszywa: jest trzecie wyjście, którego to
> zdanie nie widziało. `useTranslations()` **bez przestrzeni** przyjmuje
> pełny klucz (`"FunkcjeTresci.okruszek"`), więc jeden hook obsługuje
> wszystkie osiem etykiet — bez czterech wywołań i bez async.

**E-2, E-4…E-9, E-11 — przyjęte zgodnie z rekomendacjami** zapisanymi
niżej, polecenie właściciela: „rozstrzygnij zgodnie z własnymi
rekomendacjami, odnotuj w dokumencie". Wykonanie tego polecenia:

| Punkt | Rozstrzygnięcie (moja rekomendacja = decyzja) | Skutek praktyczny |
|---|---|---|
| E-2 sekcja kontaktu | brak sekcji na `/pomoc` | **bezprzedmiotowe** przy E-1 |
| E-4 człon o rezygnacji | wycięty | bezprzedmiotowe przy E-1; **warunek zostaje** — powrót frazy wymaga weryfikacji przepływu anulowania i wiersza w tabeli obietnic (poz. 14 rejestru) |
| E-5 trzeci drogowskaz | wypada | bezprzedmiotowe przy E-1 |
| E-6 „Klikasz »Wybierz plan«" | wypada | bezprzedmiotowe przy E-1; **ustalenie zostaje**: sprzeczność z ADR-023 pkt 2 dotyczy każdej przyszłej treści opisującej ścieżkę zakupu |
| E-7 krok pierwszy | wypada | bezprzedmiotowe przy E-1 |
| E-8 nagłówek drogowskazów | nazywa miejsca, nie wynik | bezprzedmiotowe przy E-1; **zasada zostaje** dla przyszłych nagłówków |
| E-9 forma drogowskazu | link inline, tekst ≠ etykieta nawigacyjna | bezprzedmiotowe przy E-1; **zasada zostaje** |
| E-11 mapa stopki | wchodzi jako **jedyna treść Etapu E** | `/login` i `/` do rozstrzygnięcia w panelu; podstrony filarów bez przeszkód po zamknięciu T5 |

Sześć z ośmiu punktów jest przy E-1 bezprzedmiotowych — to naturalny
skutek wycofania strony. Odnotowuję je mimo to z rozstrzygnięciem, bo
cztery z nich niosą **ustalenia niezależne od `/pomoc`** (E-4, E-6, E-8,
E-9) i będą obowiązywać treść, która powstanie po premierze.

**Ustalenie poza pakietem, przeniesione do osobnego zlecenia razem z T6:**
rozjazd dwóch kluczy „Wybierz plan" (`Cennik.cta` = `ZamkniecieCennik.cta`,
nic nie pilnuje ich równości) — dotyczy `/cennik`, nie `/pomoc`, i jest
od tej decyzji niezależny. Patrz §7.

---

## WYKONANIE — mapa stopki, E-10 i dowody (2026-08-15)

### Werdykty adwersarzy

Dwie rozłączne soczewki przeciw syntezie, obie: **WDRAŻAĆ PO POPRAWKACH**.
Każdy zarzut blokujący i poważny sprawdziłem samodzielnie przed przyjęciem
(ADR-018: nie relacja agenta, tylko wykonanie).

| Zarzut | Weryfikacja własna | Skutek |
|---|---|---|
| Snippet spłaszczania mapy się nie kompiluje (`w.dzieci?.map`) | uruchomiony `tsc`: `TS2339` + `TS7006` | **przyjęty** — forma `"dzieci" in wpis`, ta sama co `funkcje/page.tsx:165-167` |
| `LICZBA_LINKOW_STOPKI` wyprowadzona z produkcyjnej `MAPA_STOPKI` daje strażnika-tautologię | konwencja domu potwierdzona w dwóch plikach (`oznaczenie-kierunku.spec.ts:51-53`, `funkcje-indeks.spec.ts:37-39`) | **przyjęty** — liczba wyprowadzona z **lustra** przepisanego w teście |
| Erozja dotyczy nie jednego strażnika, lecz dwóch | własny przegląd 8 etykiet × 3 języki: druga i **ostatnia** to `cennik.spec.ts:158` | **przyjęty** — mina 5 |
| Pionowa kreska jako nośnik zagnieżdżenia nie przejdzie kontrastu | uruchomiony `scripts/kontrast.mjs`: `--kolor-rola-kreska` = **1,34:1** przy progu 3:1 | **przyjęty** — informację niesie wcięcie; patrz „Do decyzji właściciela" niżej |
| Stopka na `async` jest bezpieczna (jedyny rodzic to `layout.tsx:40`, już async) | potwierdzone; mimo to wybrany wariant **synchroniczny** | patrz niżej |

### Decyzje wdrożeniowe wykonawcy (mandat właściciela)

1. **Stopka zostaje synchroniczna.** Przestrzenie z mapy rozwiązuje
   `useTranslations()` **bez przestrzeni** + pełny klucz. Zasada D-D12
   („jedno źródło ciągu na serwis") mówi o ŹRÓDLE etykiety, nie
   o mechanizmie jej pobrania — a wariant async uzależniłby stopkę od
   asynchroniczności każdego przyszłego rodzica (granice błędu,
   `not-found`), nie dając nic w zamian.
2. **Rejestr wyprowadzony z mapy**, nie pisany obok niej:
   `ISTNIEJACE_SCIEZKI = splaszczMape(MAPA_STOPKI) + WYLACZONE_Z_MAPY`.
   Dopisanie strony bez decyzji „do mapy albo do wyłączeń" przestało być
   błędem do wykrycia — stało się stanem **niewyrażalnym**. Licencję na
   odwrócenie zależności daje fakt, że obaj konsumenci rejestru
   (`middleware.ts:41`, `PrzejsciaFilarow.tsx:33/:35`) używają
   `.includes()`, więc kolejność wpisów jest bez znaczenia.
3. **`splaszczMape` jako DEKLARACJA funkcji**, nie `const` — jest wołana
   w inicjalizatorze `ISTNIEJACE_SCIEZKI`; wyrażenie funkcyjne dałoby
   `ReferenceError` z TDZ przy inicjalizacji modułu, czyli **500 na każdym
   żądaniu** (plik importuje middleware, runtime Edge).
4. **Bez pionowej kreski przy podliście.** Wcięcie niesie informację samo;
   kreska w roli dekoracyjnej sugerowałaby przyszłemu czytelnikowi, że to
   ONA trzyma hierarchię — i usunięcie wcięcia zabiłoby ją po cichu.
   Dla technologii asystujących hierarchię niesie samo drzewo DOM
   (`<ul>` **wewnątrz** `<li>` rodzica, nie obok).
5. **Nowa reguła CSS dostała strażnika.** Reguła `.stopka li ul` (swoistość
   0,1,2 — musi wygrać z `.stopka ul`) nie miała czym paść, więc test
   parytetu mierzy teraz **styl wyliczony** podlisty: wcięcie > 0 oraz
   zerowy odstęp dolny. Reguła przegrana na swoistości wygląda tam
   identycznie jak reguła usunięta.

### Dowód mutacyjny — 9 mutacji, 9 zgodnych z oczekiwaniem

Zielona bramka po zmianie nie jest dowodem, że nadal mierzy to samo
(CLAUDE.md, ADR-018). Każda mutacja: podmiana w pliku produkcyjnym →
przebudowa → wskazany spec → przywrócenie pliku.

| # | Mutacja | Strażnik | Oczekiwano | Wynik |
|---|---|---|---|---|
| M1 | `/funkcje/wyniki` usunięte z `MAPA_STOPKI` | parytet-ui (lustro 8+3), rejestr-mapy | CZERWONA | ✓ |
| M2 | `aria-current="page"` dopisane do linków mapy | parytet-ui, aria-current.spec | CZERWONA | ✓ |
| M3 | reguła `.stopka li ul` traci wcięcie | parytet-ui (styl wyliczony) | CZERWONA | ✓ |
| M4 | link powrotu na 404 zamieniony w tekst | nie-znaleziono (asercja po naprawie) | CZERWONA | ✓ |
| **M4-EROZJA** | **ta sama mutacja + asercja SPRZED naprawy** | dowód, że stary strażnik przepuszczał | **ZIELONA** | ✓ |
| M5 | wiersz „kontakty" znika z tabeli cennika | cennik bez JS (asercja po naprawie) | CZERWONA | ✓ |
| **M5-EROZJA** | **ta sama mutacja + asercja SPRZED naprawy, DE** | dowód erozji: „Kontakte" ⊂ „Kontakte gewinnen" | **ZIELONA** | ✓ |
| M6 | czwarta pozycja w `POZYCJE_MENU` bez wiersza w mapie | rejestr-mapy (strażnik nowy) | CZERWONA | ✓ |
| M7 | filary przewieszone pod `/cennik` (komplet 8 linków bez zmian) | parytet-ui (hierarchia) | CZERWONA | ✓ |

Dwa wiersze **EROZJA** są najważniejsze: pokazują, że obie naprawy nie
były kosmetyką. Strażnik sprzed naprawy zostawał **zielony** mimo
usuniętego linku powrotu i mimo usuniętego wiersza tabeli — bo szukanego
ciągu dostarczała mu od tej pory stopka.

### E-10 — zamknięte, z dowodem tezy

`scripts/check-linki.mjs` budowała zbiór „adresów żywych" z **listingu
plików** `.next/server/app/*.html`. Pytała więc „czy build wytworzył
plik?", a nie „czy adres odpowiada" — o tym decyduje `ISTNIEJACE_SCIEZKI`
przez middleware. Bramka nosiła własną łatę na regexpie
(`/nie-znaleziono`), bo ten przypadek już zachodził; wiedza mieszkała
w bramce, nie w rejestrze.

Po zmianie źródłem prawdy jest rejestr (bramka **transpiluje i wykonuje**
`src/i18n/sciezki.ts`, nie parsuje go regexpem), a artefakty builda muszą
rozłożyć się bez reszty na trzy **zadeklarowane** kategorie:
`ISTNIEJACE_SCIEZKI` · `PRERENDEROWANE_BEZ_ADRESU` (nowa stała — łata
z regexpa awansowała na deklarację) · artefakty ramy Next. Kontrola idzie
w trzy strony: rejestr→build, build→rejestr, linki→adresy żywe.

| # | Mutacja | Nowa bramka | Bramka sprzed Etapu E |
|---|---|---|---|
| E1 | rejestr obiecuje adres bez artefaktu | CZERWONA ✓ | — |
| E2 | skasowana deklaracja trzeciej kategorii | CZERWONA ✓ | — |
| **E3** | **`/login` wypada z rejestru — artefakt zostaje, nagłówek dalej linkuje** | **CZERWONA ✓** | **ZIELONA ✓** |

E3 jest dowodem tezy E-10 przez wykonanie, nie przez argument: przy
adresie, który middleware od tej chwili 404-uje, stara bramka pozostawała
zielona, bo widziała plik.

### Stan bramek po wykonaniu

`tsc --noEmit` 0 · `eslint` 0 · `build` OK · bramki tokeny / liczby /
parytet / kontrakt / linki / kotwice / nojs — **wszystkie zielone** ·
Playwright: **548 przeszło, 4 pominięte, 0 czerwonych**.

Odnotowane po drodze: bramka tokenów złapała **moje własne komentarze**
(dwie wartości hex w prozie CSS). Linter nie odróżnia komentarza od
reguły — i słusznie, bo w komentarzu też można zaparkować wartość.
Przepisany został komentarz, nie linter.

### Rozstrzygnięte przez właściciela przy odbiorze (2026-08-16)

**Pionowa kreska przy podliście filarów.** Sędzia panelu chciał kreski
jako wzmocnienia hierarchii. Wdrożone bez kreski, bo w roli
`--kolor-rola-kreska` kontrast wynosi **1,34:1** przy progu 3:1 dla
elementów nietekstowych niosących informację (WCAG 1.4.11) — kreska
mogłaby więc być wyłącznie dekoracją, a dekoracja obok wcięcia tylko
myli co do tego, co trzyma hierarchię. Wariant przechodzący próg istnieje:
kreska w `--kolor-rola-tekst-drugorzedny` (**7,07:1**). To jednak zmiana
**wizualna**, a nie techniczna — i dlatego nie wchodzi tędy po cichu.

> **DECYZJA WŁAŚCICIELA 2026-08-16: BEZ kreski.** *„Wcięcie trzyma
> hierarchię, dekoracja poniżej progu kontrastu myliłaby co do
> nośnika."* Wariant 7,07:1 → **do przeglądu przy bloku designu**,
> jako żywy materiał i decyzja wizualna właściciela, nie jako dług
> techniczny. Zapisane w `Stopka.module.css` oraz w rejestrze warunków
> powrotu jako **T9** (razem z T1 i mobilną częścią T4 — ten sam blok).

---

**Poniżej — dokument w brzmieniu przedłożonym do decyzji, bez zmian.**
Zostaje jako zapis podstawy rozstrzygnięcia.

Podstawa: DECYZJA F4-4 (rozstrzygnięta dwuetapowo), DECYZJA F4-5,
ADR-014 doprecyzowanie 2026-08-15 (trzy punkty zakresu), ADR-018
(nadrzędny), ADR-023, rejestr warunków powrotu T5 i T6.

---

## 1. Co się wydarzyło w trzeciej rundzie

Runda treści w nowym gatunku (krótka, nawigacyjna) przeszła przez panel
dwóch sędziów, syntezę i **trzech adwersarzy o rozłącznych soczewkach**:
dublowanie i zakres · prawdziwość o stronach docelowych · obietnice
i presupozycje.

**Wszyscy trzej: NIE PRZECHODZI.** 27 zarzutów, w tym **9 blokujących**.

To trzecia z rzędu propozycja `/pomoc`, która nie przechodzi — i po raz
pierwszy zawala **nie na długości**. Propozycja zeszła do ośmiu zdań,
rozbroiła miny poprzednich rund (zero przeszczepów leksykalnych — grep
na „pierwsze kroki", „bez konta", „bez logowania", „Klikasz", „zabier",
„sprzed decyzji" daje zero trafień w `content/pl/` i `pl.json`; zero
modułu K12; zero liczebnika; zero słowa „wkrótce" w treści) i mimo to
zawaliła na trzech osiach, których skrócenie nie dotyka.

## 2. Zbieżność trzech soczewek

Cztery ustalenia padły niezależnie u więcej niż jednego adwersarza. To
zbieżność, nie powtórzenie — soczewki nie widziały nawzajem swoich prac.

**(a) Sekcja kontaktu — 3/3, jeden zarzut blokujący.** Stopka renderuje
się z layoutu na **każdej** stronie (`src/app/[locale]/layout.tsx:40`)
i niesie własny `<h2>Kontakt</h2>` z treścią `(wkrótce)`
(`src/components/Stopka.tsx:84-89`). Sekcja kontaktu w `<main>` daje
w jednym dokumencie **dwa nagłówki H2 o identycznym brzmieniu**,
kilkaset pikseli od siebie na 390 px, mówiące dwie różne rzeczy: „Nie ma
tu adresu kontaktowego" i „(wkrótce)". Wszyscy trzej wskazali ten sam
wariant naprawczy: **`/pomoc` nie ma sekcji Kontakt** — stopka wykonuje
punkt (3) właściciela tożsamościowo, przez to, że jest stopką.

**(b) Drogowskaz do `/funkcje` — 2/3, trzy zarzuty blokujące.** Zdanie
prowadzące mówiło o **podstronach filarów**, a link prowadził na
**indeks** `/funkcje`. Zweryfikowane przeze mnie: indeks nie ma ani
jednego klucza granicy (`FunkcjeIndeks` = h1, zdanie, cztery bloki, f8,
zamknięcie — koniec). Podmiot zdania i cel linku to dwa różne byty:
czytelniczka czyta obietnicę, klika, obiecanej rzeczy nie ma. Do tego
podmiotem zdania są cztery podstrony filarów — **byt spoza zakresu
startu wg ADR-014:34-35, o którym T5 jest jawnie otwarte**. Trzeci
zarzut: właściciel wyznaczył temat tego drogowskazu wprost („`/funkcje`
— **dzień pracy**"), a propozycja podstawiła w to miejsce granice
produktu.

**(c) Drogowskaz do `/cennik`, człon o rezygnacji — 2/3, jeden
blokujący.** „W cenniku sprawdzisz […] **co zabierasz ze sobą przy
rezygnacji**" — „sprawdzisz" jest czasownikiem faktywnym, więc pytanie
zależne jest **presuponowane jako fakt**: że rezygnacja jest wykonalna
i że coś przy niej zabierasz. Presupozycja przeżywa negację, więc żadna
korekta czasownika jej nie usuwa. A `content/pl/zamkniecie.md:44-49`
mówi czarno na białym, że `content/tabela-obietnic.md` **nie ma dziś ani
jednego wiersza o rezygnacji**, a pozycja 14 rejestru nadal żąda
weryfikacji przepływu anulowania. Drogowskaz miał kierować do
odpowiedzi — powtórzył odpowiedź, i to odpowiedź niepokrytą.

**(d) Krok „Klikasz »Wybierz plan«" — 2/3, jeden blokujący.**
Zweryfikowane przeze mnie w ADR-023, Decyzja pkt 2: *„Treść cennika
i FAQ **nie zakłada wyboru planu przed rejestracją** — plan wybiera się
w aplikacji po zalogowaniu"*; Kontekst tegoż ADR-a: `/login` nie
przyjmuje parametru planu. Zdanie jest prawdziwe nawigacyjnie i fałszywe
**jako krok**: postawione w ciągu „Pierwsze kroki" przestaje opisywać
przycisk, a zaczyna uczyć kolejności, którą ADR-023 rozstrzygnął
odwrotnie. Drugi adwersarz dołożył: krok każe kliknąć przycisk, którego
na `/pomoc` nie ma i do którego ta sekcja nie prowadzi linkiem.

## 3. Zarzut najgłębszy — i najniewygodniejszy

Pierwszy adwersarz (soczewka dublowania) postawił zarzut, którego nie
da się naprawić redakcją zdania:

> Sekcja drogowskazów jest **podzbiorem mapy strony w stopce**, która
> renderuje się na tej samej stronie i wchodzi **w tym samym wydaniu**.

DECYZJA F4-5 brzmi: „Mapa stopki = **komplet istniejących adresów**".
Mapa stopki i `/pomoc` wchodzą razem, w Etapie E. Czytelniczka `/pomoc`
dostaje więc trzeci przebieg tej samej nawigacji w jednym dokumencie:
nagłówek (3 pozycje) → drogowskazy w `<main>` → mapa strony w stopce
(komplet). Etykiety linków w propozycji były przy tym **reużytymi
kluczami nawigacyjnymi** (`Nawigacja.cennik`, `Nawigacja.funkcje`,
`Wspolne.stronaGlowna`) — czyli dosłownie tymi samymi ciągami, które na
tej samej stronie stoją już dwa razy, pod tymi samymi adresami.

Zarzut nie mówi, że `/pomoc` jest zbędna. Mówi, że **drogowskaz w formie
[zdanie + etykieta nawigacyjna + adres] jest wierszem mapy strony**,
a nie treścią pomocy — i że sekcja z trzech takich wierszy nie różni się
od stopki niczym poza kolejnością.

## 4. Arytmetyka: co zostaje

Jeśli uhonorować **każdy dowiedziony zarzut**, z ośmiu zdań propozycji
zostają **dwa** plus jeden drogowskaz:

| Człon | Los | Podstawa |
|---|---|---|
| Krok 1 „Pierwsze kroki robisz tu, na stronie Catherly." | **wypada** | czytelniczka czyta „zacząć można tu i teraz" — nie można: zero uwierzytelniania w `src/`, Stripe atrapa |
| Krok 2 „Czytasz ją całą bez konta i bez logowania." | **zostaje** (scalone z krokiem 1, żeby nie zostawić wiszącego „ją") | — |
| Krok 3 „Klikasz »Wybierz plan« i trafiasz na stronę logowania." | **wypada** | ADR-023 pkt 2 |
| Krok 4 „Logowanie będzie dostępne przy premierze aplikacji." | **zostaje** | nakaz właściciela pkt (1); źródło `StronaLogowania.tresc` |
| Drogowskaz 1 → `/cennik` | **zostaje, zawężony** o człon o rezygnacji | tabela obietnic bez wiersza o rezygnacji |
| Drogowskaz 2 → `/funkcje` | **wstrzymany** albo przepisany na temat nakazany | T5 otwarte; temat „dzień pracy" |
| Drogowskaz 3 → `/` | **wypada** | ADR-014 wymienia dwa cele, nie trzy; przykład niewidoczny na stronie docelowej |
| Sekcja Kontakt | **wypada w całości** | drugi H2 „Kontakt" w jednym dokumencie |

**Wynik: H1 + dwa zdania + jeden drogowskaz.** To jest stan faktyczny
po trzeciej rundzie i nie zamierzam go ubierać. Właściciel napisał, że
„krótkość jest cechą, nie brakiem" — ale tu chodzi już o coś innego niż
krótkość: chodzi o to, czy przy tej zawartości `/pomoc` ma jeszcze
własny powód istnienia obok mapy stopki, która wchodzi tym samym
wydaniem.

## 5. Ustalenia zweryfikowane samodzielnie (nie relacja agenta)

Sprawdziłem osobiście, bo od tego zależą rozstrzygnięcia niżej:

1. **Stopka jest w layoucie** — `layout.tsx:40`, więc na każdej
   podstronie; sekcja kontaktu `Stopka.tsx:84-89` z `h2` + `(wkrótce)`.
2. **Kontrprzykład granicy** — `FunkcjeWyniki.mod6_nie` (pl/en/de :346):
   „Wall of Proof **nie jest ścianą zespołu** — wspólne świętowanie ma
   swoje miejsce na Ścianie sukcesów." To rozgraniczenie dwóch funkcji
   Catherly, nie granica produktu.
3. **Kwantyfikator — zarzut stoi tylko w połowie.** Adwersarz twierdził,
   że „przy każdej funkcji" jest fałszem. Policzyłem: **31 modułów, 31
   klauzul `_nie`** (Pozyskiwanie 10/10, Treści 9/9, Zespół 6/6, Wyniki
   6/6). Pokrycie ilościowe jest **pełne**. Zarzut stoi więc wyłącznie
   **semantycznie** — co najmniej jedna klauzula nie mówi „czego
   Catherly nie robi" — i tak go zapisuję. Nie przepuszczam zarzutu
   w mocniejszej wersji, niż udowodniono.
4. **Indeks `/funkcje` nie ma granic** — `FunkcjeIndeks` nie zawiera ani
   jednego klucza granicy. Ta część zarzutu stoi w całości.
5. **Przykład „praca z telefonu" jest niewidoczny** — widoczne pytanie
   `Obawy.p5` mówi o **komputerze** we wszystkich trzech językach
   (pl :162 „Prawie nie siadam do komputera", en „at a computer", de „am
   Computer"); telefon wyłącznie w odpowiedzi `o5`, a odpowiedzi są przy
   wejściu zwinięte.
6. **ADR-023** — cytat dosłowny, patrz §2(d).
7. **`bramka:linki` nie czyta rejestru ścieżek** — `check-linki.mjs:31-58`
   buduje zbiór celów z **plików HTML** w `.next/server/app`, nie
   z `ISTNIEJACE_SCIEZKI`. Skutek opisany w E-10.
8. **Dwa klucze niosą etykietę „Wybierz plan"** — `pl.json:67`
   (`Cennik.cta`) i `pl.json:173` (`ZamkniecieCennik.cta`); nic nie
   pilnuje ich równości.

## 6. PUNKTY DECYZJI WŁAŚCICIELA

Rozstrzygnięcia potrzebne **przed** nową rundą treści. Bez nich runda
czwarta powtórzy los trzech poprzednich.

### E-1 (nadrzędny). Czy `/pomoc` wchodzi w tym wydaniu?

Zadaję to pytanie ponownie **nie** po to, żeby wracać do rozstrzygniętej
decyzji, tylko dlatego, że rozstrzygnięcie z 2026-08-15 zapadło bez
trzech faktów, które ustaliła dopiero ta runda: mapa stopki niesie te
same linki na tej samej stronie w tym samym wydaniu; T5 blokuje jeden
z dwóch nakazanych drogowskazów; sekcja kontaktu dubluje nagłówek
stopki. Przy tych faktach zawartość schodzi do trzech zdań.

- **(a) REKOMENDACJA — wchodzi zredukowana:** H1 „Pomoc" + dwa zdania
  pierwszych kroków + **jeden** drogowskaz (`/cennik`), bez sekcji
  kontaktu, bez drogowskazu do `/funkcje` do czasu T5. Punkt (1)
  właściciela wykonany wprost, punkt (3) tożsamościowo przez stopkę,
  punkt (2) wykonany w połowie, z jawnym zapisem dlaczego.
- **(b) wchodzi po rozstrzygnięciu T5** — wtedy dwa drogowskazy, zgodnie
  z literą ADR-014. Koszt: Etap E czeka na decyzję o czterech
  podstronach filarów.
- **(c) w tym wydaniu wchodzi sama mapa stopki**, `/pomoc` po premierze,
  gdy „pierwsze kroki" będą miały desygnat (konto, płatność, logowanie
  działają). Koszt: ADR-014 stawia `/pomoc` **w** zakresie startu — ta
  droga wymaga ADR-a jawnie uchylającego.

### E-2. Sekcja kontaktu na `/pomoc`

REKOMENDACJA i zbieżna rekomendacja 3/3 adwersarzy: **brak sekcji**.
Stopka niesie stan kontaktu na każdej stronie serwisu, więc sekcja
mówiąca to samo innymi słowami nie dodaje faktu — dokłada drugi,
sprzeczny głos i drugi nagłówek o tej samej nazwie. Punkt (3) właściciela
(„kontakt = stan faktyczny, ten sam co w stopce") jest wtedy wykonany
**dosłownie**: tym samym ciągiem, w tym samym miejscu, zero nowych
ciągów ×3 języki.
Alternatywa, jeśli właściciel chce sekcji w `<main>`: musi mieć nagłówek
**odróżnialny** od stopkowego i zdanie bez zaimka „tu" (zawężenie
negacji do tej strony sugeruje, że gdzie indziej adres jest — a w całym
repozytorium nie ma ani jednego `mailto:`).

### E-3. Drogowskaz do `/funkcje` — temat i cel

Zależność blokująca od **T5**. Trzy warianty:
- **(a) REKOMENDACJA** — drogowskaz o **samym indeksie** `/funkcje`,
  strona bezspornie w zakresie startu (ADR-014:15-16), temat **dzień
  pracy** zgodnie z dosłownym nakazem właściciela. Podmiot zdania = cel
  linku, T5 nieruszone. Warunek redakcyjny: **bez trzeciego przebiegu
  cyklu „Rano / W ciągu dnia / Wieczorem"** — ten człon zawalił rundę
  poprzednią.
- (b) drogowskaz na **jedną nazwaną podstronę** (np. `/funkcje/pozyskiwanie`)
  — wtedy zdanie jest o stronie, na którą prowadzi, ale przedmiotem jest
  byt spoza zakresu startu; wymaga uprzedniego T5.
- (c) drogowskaz wypada; `/pomoc` ma jeden drogowskaz.

### E-4. Drogowskaz do `/cennik` — zakres członu

REKOMENDACJA: **wyciąć człon o rezygnacji**, zostawić temat pieniędzy
(„co jest w którym planie i ile kosztuje"), który mieści się
w zamówionym przez właściciela członie „płatności" i nie presuponuje
żadnej odpowiedzi. Człon o danych po rezygnacji ma warunek zapisany
i niewykonany: pozycja 14 rejestru (weryfikacja przepływu anulowania +
wpis do tabeli obietnic).

### E-5. Trzeci drogowskaz (strona główna)

REKOMENDACJA: **wypada**. ADR-014 wymienia **dwa** cele; trzeci jest
„jeszcze tylko jednym", a sekcja Konsekwencje tego samego ADR-a żąda dla
takich dopisków ADR-a jawnie uchylającego. Niezależnie od tego przykład
„o pracę z telefonu" nie jest do znalezienia wzrokiem na stronie
docelowej (§5.5), a logo w nagłówku linkuje na `/` na każdej stronie.

### E-6. Krok o kliknięciu „Wybierz plan"

REKOMENDACJA: **wypada w całości**. Sprzeczny z ADR-023 pkt 2 jako krok;
przy okazji znika zależność treści `/pomoc` od etykiety przycisku, którą
niosą **dwa** niepilnowane klucze (§5.8). Jeśli właściciel chce zachować
informację nawigacyjną — wyłącznie jako stan strony, nigdy jako krok
w ciągu instrukcji.

### E-7. Krok pierwszy („Pierwsze kroki robisz tu")

REKOMENDACJA: **wypada**, rzeczownik przenosi się do zdania drugiego.
W obszarze obietnic liczy się odczyt czytelniczki, a ta czyta „zacząć
można tu i teraz" — czego serwis nie umożliwia (zero uwierzytelniania
w `src/`). Nagłówek H2 „Pierwsze kroki" **zostaje** — jest nazwą członu
z ADR-014, nie twierdzeniem o wykonalności.

### E-8. Nagłówek sekcji drogowskazów

REKOMENDACJA: nagłówek nazywa **miejsca, nie wynik**. „Gdzie znajdziesz
odpowiedź" w liczbie pojedynczej i bez kwantyfikatora presuponuje, że
odpowiedź istnieje — dokładnie to, czego właściciel zakazał w punkcie (3)
jeden człon dalej. Kobieta wchodząca przed premierą na stronę o nazwie
„Pomoc" przychodzi zwykle z pytaniem, na które strona odpowiedzi nie ma.

### E-9. Forma drogowskazu i tekst linku

REKOMENDACJA: link **inline w zdaniu**, tekst linku = fraza opisowa,
która nigdzie w serwisie nie jest etykietą nawigacyjną (nie „Cennik",
nie „Funkcje", nie „Strona główna"). Postać [zdanie + etykieta
nawigacyjna + adres] jest wierszem mapy strony (§3). Konsekwencja: nowe
ciągi ×3 języki, strażnik znak w znak.

### E-10. Rejestr ścieżek — luka bramkowa (blokuje implementację)

`/pomoc` prerenderuje się z samego istnienia pliku strony i **pojawi się
w zbiorze celów `bramka:linki` nawet bez wpisu w `ISTNIEJACE_SCIEZKI`** —
bo bramka czyta pliki HTML, nie rejestr (§5.7). Middleware odda wtedy na
tym adresie 404. **Wszystkie bramki zielone, użytkowniczka na 404.**
REKOMENDACJA, kolejność wiążąca: (1) `"/pomoc"` do
`src/i18n/sciezki.ts` **w tym samym PR**, (2) test e2e statusu 200 dla
`/pomoc`, `/en/pomoc`, `/de/pomoc`, (3) dopiero potem link ze stopki.
Do rozstrzygnięcia osobno: czy dopisać do bramki asercję „każdy
prerenderowany segment ma odpowiednik w rejestrze" — to naprawia klasę
błędu, nie jeden przypadek.

### E-11. Mapa stopki — krótkie etykiety filarów (z DECYZJI F4-5)

Mapa iteruje dziś `POZYCJE_MENU` (3 pozycje); brakuje `/`, `/login`
i czterech podstron filarów. **Krótkich etykiet filarów nie ma
w `messages`** — istnieją tylko H1 i linki prozą („Zobacz wszystko
o pozyskiwaniu"). To treść ×3 języki, nie mechanika. Do rozstrzygnięcia:
czy `/login` wchodzi do mapy (strona istnieje, ale niesie jedno zdanie
o tym, że logowania jeszcze nie ma) i czy podstrony filarów wchodzą do
mapy przed T5 — **ta sama zależność co E-3**.

### E-12. Data ważności strony

W dniu premiery zdanie „Logowanie będzie dostępne przy premierze
aplikacji" staje się fałszem o własnym serwisie. W repozytorium **nie ma
żadnego mechanizmu wygasania treści** — ani bramki, ani adnotacji, ani
listy. To dotyczy też `StronaLogowania.tresc` i pozycji „(wkrótce)"
w stopce, więc `/pomoc` nie tworzy problemu, tylko go poszerza.
REKOMENDACJA: pozycja **T7** w rejestrze warunków powrotu — inwentarz
treści przedpremierowych z datą ważności, do wykonania przed premierą.
Nie proponuję mechaniki teraz; proponuję, żeby dług został zapisany,
a nie zapamiętany.

## 7. Ryzyka strukturalne (poza punktami decyzji)

**Żadna bramka nie pilnuje prawdziwości drogowskazów.** Zmiana karty
planu na `/cennik` albo propu `granica` na podstronie filaru czyni
zdanie na `/pomoc` fałszem — i nic nie zapali czerwieni. To mina
z opóźnionym zapłonem: strona jest prawdziwa w dniu wdrożenia i przestaje
być bez żadnego sygnału. Jeśli drogowskazy wchodzą, wchodzi z nimi
**test e2e wiążący zdanie z treścią strony docelowej** — inaczej
`/pomoc` jest jedyną podstroną serwisu, której prawdziwość zależy od
niezmienności innych podstron, i nikt tego nie pilnuje.

**Rozjazd dwóch kluczy „Wybierz plan".** Niezależnie od E-6: jeśli
ktokolwiek zmieni `ZamkniecieCennik.cta` i zostawi `Cennik.cta` (albo
odwrotnie), na `/cennik` pojawią się dwa różne przyciski i żadna bramka
tego nie zauważy. Zarzut powstał przy `/pomoc`, ale dotyczy `/cennik`
i jest od `/pomoc` niezależny. Do osobnego zlecenia razem z T6.

---

## Stan przed rozstrzygnięciem

Kod `/pomoc` **nie istnieje** i nie powstanie przed decyzjami E-1…E-10.
Zmodyfikowane w tej rundzie, niezacommitowane: `content/pl/zamkniecie.md`,
`docs/faza-4/PLAN-FAZY-4.md`, `docs/adr/014-…md`,
`docs/faza-2/rejestr-warunkow-powrotu.md` oraz ten plik.
