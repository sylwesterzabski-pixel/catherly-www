# ADR-045: Nawigacja w stylistyce wzorca — pigułka, hamburger bez JS, kanwa w sondzie

Data: 2026-08-26. Status: **PRZYJĘTY** (KROK 2 pkt 2.1, zlecenie
`WWW/057`).

## Co zbudowano

Nagłówek jest **pigułką** — nie paskiem. Wszystkie wartości z pomiaru
wzorca:

| własność | ≤ 768 px | 810–1280 px | ≥ 1440 px |
| --- | --- | --- | --- |
| wcięcie od krawędzi | 20 px | 40 px | 120 px |
| wysokość | **80 px** | 80 px | 80 px |
| promień | 50 px | 50 px | 50 px |
| tło | tło strony z alfą 0,6 | j.w. | j.w. |
| rozmycie tła | `blur(10px)` | j.w. | j.w. |

Pozycje: **16 px / waga 500**, odstęp **40 px**, bez podkreślenia,
bieżąca w akcencie. CTA: pigułka **46,4 px** wysokości, promień 50 px.

**Zgodność zmierzona** na trzech kadrach — `x`, szerokość, wysokość,
promień i rozmycie **identyczne z wzorcem**; menu mobilne: pierwsza
pozycja `y = 136`, skok **84,8 px**, CTA **310 × 46,4 px** przy `x = 40`
— wszystkie zgodne co do dziesiątej części piksela.

## Decyzja 1 — `sticky` ZDJĘTY, i to jest decyzja ODWRÓCONA W TRAKCIE

Zapisuję obie strony, bo droga jest tu ważniejsza od wyniku.

**Najpierw zostawiłem `sticky`** z uzasadnieniem: *„to własność
dostępności nawigacji, nie stylistyki; zlecenie 2.1 mówi «stylistyka
wzorca»"*. Rozumowanie brzmiało dobrze.

**Rachunek je obalił.** Pigułka wzorca ma wcięcie **120 px** przy
≥ 1440 i wysokość 80 px, więc **przyklejona zajmuje pas 20…200 px** od
górnej krawędzi. Nasz własny strażnik `odsuniecie-kotwic` trzyma pułap
**96 px** na odsunięcie celu kotwicy od kadru. Pas 200 px łamie go
dwukrotnie. Zmierzone w trakcie: `Expected >= 100, Received 92`.

**Czyli `sticky` nie bronił tu dostępności — psuł ją.** Wzorzec nie jest
przyklejony **właśnie dlatego**, że pigułka pływa z dużym wcięciem: te
dwie rzeczy się wykluczają, a ja próbowałem mieć obie.

> **Wniosek ogólniejszy: odstępstwo od wzorca uzasadniane „u nas jest
> lepiej" wymaga LICZBY po naszej stronie. Tu liczba wyszła odwrotna.**

`scroll-padding-block-start` przeliczony **po raz trzeci**: 5,75rem →
**2rem**. Poprzednie wartości chroniły przed przyklejonym nagłówkiem;
bez niego 92 px pustki nad każdym celem kotwicy było kosztem bez
świadczenia.

## Decyzja 2 — hamburger bez JS, panel jako RODZEŃSTWO `details`

Rozwijanie niesie `details`/`summary` — natywna semantyka ujawniania,
obsługa klawiaturą i działanie przy wyłączonym JS (próg „treść czytelna
bez JS"). Ten sam mechanizm niesie FAQ, więc nie powstał drugi wzorzec
na tę samą rzecz.

**Panel jest RODZEŃSTWEM `details`, nie jego dzieckiem — i to wymusiła
przeglądarka, nie preferencja.** Chromium chowa treść zamkniętego
`details` przez **anonimowe pudełko treści**; autorska reguła `display`
postawiona na panelu do niego **nie sięga**. Zmierzone dwa skutki:

1. na kadrze ≥ 769 px, gdzie panel ma być widoczny bez otwierania,
   **wszystkie linki nawigacji znikały**;
2. `grid-column: 1 / -1` na panelu wyliczało się poprawnie, a układał
   się i tak **262 px zamiast 310** — bo układane było pudełko, nie
   panel.

`::details-content` rozwiązałoby to jednym wierszem, ale nie ma go poza
najnowszym Chromium — nawigacja przepadłaby w Safari i Firefoksie.
Przy konstrukcji z rodzeństwem widocznością steruje wyłącznie CSS:
`[open] ~ .panel` na wąskim kadrze, `display: contents` na szerokim.
`aria-controls` wiąże przycisk z regionem, którego już nie zawiera.

## Decyzja 3 — dwudziesta rola: `tlo-przezroczyste`

`LICZBA_ROL` **19 → 20**, jawnie i z tym ADR-em, tak jak każe
`WWW/050-FINAL` pkt 1.1. Wartość zmierzona: barwa tła strony z alfą 0,6.

**Rola NIE wchodzi do par kontrastowych i to jest świadome:** kontrast
liczy się na barwie **wynikowej**, a ta zależy od tego, co akurat leży
pod pigułką. Mierzy to sonda rastrowa; strażnik tokenów widzi wyłącznie
wartości ról. Wpisanie tu pary dałoby liczbę **wyglądającą na pomiar,
a będącą fikcją**.

Strażnik nauczył się rozpoznawać rolę z alfą (żeby liczyła się do
kompletu), a `kontrast()` dostał **odmowę zamiast cichej liczby**:
wartość spoza zapisu szesnastkowego rzuca wyjątkiem z nazwą przyczyny,
zamiast policzyć ją tak, jakby była nieprzezroczysta.

## Defekt POMIARU wykryty przy okazji — biała kanwa w sondzie

Trzydzieści testów `kontrast-stanow` na **wszystkich trasach** upadło
z komunikatem „ślad biały na białym, 1:1" dla **skip-linku**, który na
zrzucie ma białą obwódkę na czerni.

Przyczyna była w sondzie, nie na stronie:

```js
let kolor = [255, 255, 255, 1]; // kanwa przeglądarki pod wszystkim
```

**Kanwa nie jest biała.** Bierze tło z `body` (a gdy tam pusto — z
`html`) przez **propagację tła**; biała jest tylko wtedy, gdy oba są
przezroczyste. Na palecie wzorca kanwa ma barwę tła strony.

Wada spała, dopóki nagłówek był paskiem na pełną szerokość i zasłaniał
lewy górny róg. Gdy pigułka odsunęła się o 120 px, skip-link zawisł nad
**samą kanwą** — i sonda zaczęła orzekać o niej białym.

Naprawa **po stronie pomiaru, nie sceny** (rozstrzygnięcie `WWW/041`).
Scena była poprawna; mierzyło ją narzędzie z wpisaną na sztywno białą
kanwą.

## Klasa, która wystąpiła TRZY RAZY w jednym zleceniu

Dodanie **jednego** elementu powszechnego typu (`<details>` hamburgera)
unieważniło trzy strażniki celujące w „pierwszy taki w dokumencie":

| strażnik | selektor | skutek |
| --- | --- | --- |
| `cennik` | `page.locator("details")` | liczył **5 zamiast 4** |
| `rozdzial-kart` | `"details"` | mierzył hamburgera jako kartę FAQ |
| `ruch` | `"details summary"` | rodzina „FAQ — znacznik" wypadła, próg 8 → 7 |

**Wszystkie naprawione zawężeniem lokatora do `main`, żaden przez
złagodzenie progu** — tak każe kanon („przepisz jego asercję na lokator
celujący w konkretny element").

> **Wniosek: dodanie jednego elementu powszechnego typu unieważnia każdą
> asercję celującą w «pierwszy taki w dokumencie» — i robi to CICHO, bo
> asercja nadal ma na czym pracować.** Przed dopisaniem `details`,
> `nav`, `ul` czy `section` do elementu współdzielonego sprawdź, kto
> dziś celuje w ten typ globalnie.

## Testy dostosowane do zmienionego zachowania, nie osłabione

- **`e2e/pomoc/menu.ts`** — otwiera menu, gdy jest zwinięte. Rozróżnienia
  dokonuje **widoczność kontrolki**, nie nazwa projektu Playwrighta, więc
  działa też przy kadrze, którego nikt jeszcze nie dodał.
- **`klawiatura`** — na wąskim kadrze test **nie pomija** hamburgera:
  wstawia go do oczekiwanej kolejności, sprawdza, że jest to `SUMMARY`
  (czyli **osiągalny klawiaturą**), i **otwiera menu Enterem**. Gdyby
  rozwijanie wymagało myszy, ten krok by nie zadziałał.
- **CTA w stanach** — globalna reguła `a:hover` przestawiała barwę na
  akcent: **limonka na limonce, 1,03:1 pod palcem i 1:1 przy
  wciśnięciu**. Etykieta pola akcentu ma być ciemna w KAŻDYM stanie —
  człon (a) reguły R-AKCENT-02.

## Stan

Pełny e2e **672 passed / 4 skipped / 0 failed**; strażnik tokenów
zielony przy 20 rolach.
