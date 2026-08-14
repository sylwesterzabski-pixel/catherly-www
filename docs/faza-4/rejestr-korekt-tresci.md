# Rejestr korekt treści podstron funkcji (Faza 4, Etapy B–D)

**Status: OBOWIĄZUJE jako dokumentacja.** Powstał 2026-08-13 na
polecenie właściciela po Etapie C (uwaga adwersarza C, pkt 1):
historia korekt i noty paneli wyprowadzone z nagłówków plików
`content/` — pliki treści mają nieść treść, nie swoją historię.

Zasada na przyszłość: nagłówek każdego pliku w `content/` niesie
wyłącznie (1) status z numerem decyzji właściciela i datą, (2) źródło
adaptacji dla EN/DE, (3) wskaźnik protokołu, (4) wskaźnik na ten
rejestr. Każda korekta po akcepcie dopisuje pozycję TUTAJ.

Wyjątek świadomy: w `content/pl/funkcje-pozyskiwanie.md` zostaje
zdanie „Granice prawdziwe NA DZIŚ — rejestr warunków powrotu
poz. 15–18". To nie historia korekty, tylko zastrzeżenie ważności
samych obietnic — należy do treści, nie do archiwum.

---

## Etap D — panele adaptacji EN/DE (2026-08-13)

K-D1…K-D4 dotyczą `content/{en,de}/funkcje.md` i
`content/{en,de}/dla-kogo.md` (sześć soczewek panelowych, Prawo 2,
werdykt każdej: POPRAWKI; razem 56 uwag — 2 BLOKUJĄCE, 18 WAŻNYCH,
36 DROBNYCH). K-D5 dotyczy wszystkich trzech języków `funkcje.md`.
K-D6 wyszła kontrolą trójźródłową już PO akcepcie. K-D7 nie jest
korektą treści, tylko **świadomym wyjątkiem proceduralnym** —
odnotowanym tutaj, żeby wyjątek nie stał się cichym precedensem.
Protokół treści: `docs/faza-4/tresci-etap-d-po-panelach.md`.

### K-D1 · content/de/dla-kogo.md — BLOKUJĄCA, obietnica prawna

Projekt DE ścieżki 3 brzmiał „Ob deine Nachricht die Anforderungen
von vier Rechtsräumen erfüllt, prüft der Compliance-Pass" — narzędzie
orzeka, CZY wymogi są spełnione. PL mówi węziej: „sprawdza komunikat
POD KĄTEM wymogów". Kolizja z własną granicą trzy akapity niżej
(`FunkcjeZespol.mod5_nie`: „gibt keine rechtliche Garantie") i z
wzorcem korpusu DE, gdzie przy narzędziu jako podmiocie zawsze stoi
„prüft … nach Regeln". Naniesione: „prüft deine Nachricht anhand der
Anforderungen von vier Rechtsräumen". ADR-018, obszar: obietnice.

### K-D2 · content/de/dla-kogo.md — BLOKUJĄCA, przypadek gramatyczny

„Sauberer Export … gibt es im Pro-Plan" jest niegramatyczne —
`es gibt` rządzi biernikiem, a reużywany znak w znak ciąg
`Cennik.plany.pro.pozycja4` jest mianownikowy i odmienić go nie
wolno (D-D12). Rozwiązane zmianą ramy zdania, nie ciągu:
„… ist im Pro-Plan enthalten." Wzorzec na przyszłość: konflikt
reużycia z gramatyką docelową rozstrzyga się przebudową ramy.

### K-D3 · odmiana nazw funkcji w DE (D-D12) — wzorzec

Etykiety linków DE odmieniają się wg wzorca już przyjętego
w `content/de/`: „im Täglichen Aktionsplan" jak
`FunkcjePozyskiwanie.mod7_poco`, „die ersten 90 Tage" jak
`FunkcjeZespol.mod3_poco`, „über den Einstiegsassistenten" — biernik
po „über", nazwa mianownikowa `FunkcjeZespol.mod1_nazwa` zawarta
w formie odmienionej. Nazwy skrócone („Anmeldeformular", „fertigen
Vorlage") są lustrem skrótów PL („formularza zgłoszeniowego",
„gotowego szablonu"). Reguła D-D21 sprawdza się w tekście danego
języka osobno — kontrola mechaniczna, nie deklaracja autora.

### K-D4 · rozjazd EN↔DE we wprowadzeniu bloku 3 — ROZSTRZYGNIĘTY

PL `content/pl/funkcje.md` blok 3: „prowadzi nową osobę przez etapy"
— bez kwantyfikatora. Panel EN uznał kwantyfikator za podniesienie
obietnicy i dał „walks a new person through the stages"; panel DE
zostawił „führt … durch alle Etappen". Obie wersje mają argument:
sankcjonowane już ciągi `Filary.filar3.konkret1` niosą kwantyfikator
w OBU językach („through each stage" / „durch alle Etappen"), więc
EN rozjeżdża się teraz wewnątrzjęzykowo (/filary ↔ /funkcje), a DE
rozjeżdża się z PL. Ciąg jest nowy (`FunkcjeIndeks.blok3Wprowadzenie`),
więc reguła reużycia go nie wiąże i wybór jest realny.

**Rozstrzygnięcie właściciela 2026-08-13 (verbatim):** „wyrównać DO
KWANTYFIKATORA — EN «through all the stages» (korekta panelu EN), DE
zostaje «durch alle Etappen». Powód: sankcjonowane Filary.filar3.konkret1
niosą kwantyfikator w obu językach — spójność wewnętrzna języka wygrywa;
merytorycznie First90 prowadzi przez wszystkie 4 fazy (pokrycie w kodzie)."

Naniesione w `content/en/funkcje.md` (blok 3, wprowadzenie): „The
onboarding wizard walks a new person through **all the stages**…".
DE bez zmian. PL bez zmian (D-D1…D-D21 sankcjonują brzmienie PL).

Nota rzeczowa do pokrycia (ADR-018, dowód nie deklaracja): zdanie
niosące kwantyfikator mówi o KREATORZE WDROŻENIOWYM, nie o First 90
Dni — pokrycie dla „all the stages" daje `FunkcjeZespol.mod1_poco`
(„führt sie durch sechs Schritte" / „prowadzi ją przez sześć kroków"),
czyli zamknięty zbiór sześciu kroków. Pokrycie dla czterech faz
First 90 Dni leży w `FunkcjeZespol.mod3_*` i dotyczy drugiego członu
zdania. Wniosek właściciela zostaje w mocy w obu odczytach: kreator
prowadzi przez wszystkie swoje etapy, więc kwantyfikator nie podnosi
obietnicy.

### K-D5 · oznaczenie pozycji kierunku na indeksie — WYCOFANE W CZĘŚCI STUDIO

**Bieg sprawy — zapisany w całości, bo pomyłka jest tu pouczeniem.**

**(1) Moje zgłoszenie 2026-08-13, BŁĘDNE.** Zgłosiłem właścicielowi, że
sankcjonowana treść indeksu adnotuje *(pozycja kierunku)* przy „asystent
AI" w blokach 1 i 2, ale nie przy „Studio", choć w kodzie Studio
renderuje `SekcjaKierunku` — ten sam komponent co asystent AI
(`src/app/[locale]/funkcje/tresci/page.tsx:84-89`). Przeczytałem użycie
komponentu i nie przeczytałem trzech linii nad nim.

**(2) Rozstrzygnięcie właściciela na tej przesłance (verbatim):**
„adnotacja pozycji kierunku OBOWIĄZKOWA przy Studiu — trzy pozycje
kierunku z 33 (asystent AI ×2 + Studio) dostają identyczny wzorzec
oznaczenia. Zero pozycji kierunku wyglądających jak dokonane (ADR-018).
Formę oznaczenia rozstrzyga panel projektu; zasada — moja,
nienegocjowalna."

**(3) Panel projektu Etapu D obalił przesłankę. Dowód w kodzie:**

- `src/app/[locale]/funkcje/tresci/page.tsx:81-83`, komentarz nad
  użyciem: „Moduł 1 Studio — WARIANT KIERUNKU (wyjątek F4-2; brief,
  Uzupełnienie C + D-C5): BEZ slotu zrzutu do przebudowy wariant C
  aplikacji; **status obietnicy DZIAŁA bez zmian**." Komponent jest tu
  wariantem UKŁADU (brak slotu zrzutu, bo ekran aplikacji jest
  przebudowywany), nie deklaracją poziomu obietnicy.
- `MODULY` (tamże:35-45) zawiera `{ klucz: "mod1", kotwica: "studio" }`
  jako pozycję pierwszą — Studio jest **modułem DZIAŁA** i wchodzi do
  spisu treści podstrony. `asystent-ai` w `MODULY` nie występuje
  i komentarz przy spisie (tamże:72-73) trzyma go poza spisem wprost.
- `docs/faza-4/tresci-etap-d-po-panelach.md:216` i `:253` oznaczają
  `[POZYCJA KIERUNKU]` **wyłącznie** asystenta AI, w obu blokach.

**(4) Skutek — wycofanie.** Adnotacja przy Studiu usunięta z
`content/{pl,en,de}/funkcje.md` (powrót do stanu sankcjonowanego
D-D1…D-D21). Pozycji kierunku jest **dwie z 33**, nie trzy. Utrzymanie
adnotacji znaczyłoby, że strona odbiera działającej funkcji jej status —
to też jest obszar ADR-018 („obietnice"), tylko w drugą stronę.

**(5) Co z zasady właściciela zostaje w mocy.** „Zero pozycji kierunku
wyglądających jak dokonane" obowiązuje bez zmian — zawęża się wyłącznie
jej zakres: dwie pozycje `asystent AI`, nie trzy. Forma oznaczenia
pozostaje OTWARTA i wraca do właściciela, bo panel jej nie wprowadził
i podał do decyzji twarde warunki (patrz `handoff-etap-d.md`, pkt 7.1):
ciąg widoczny wymaga sankcji właściciela i wpisu do messages ×3;
brzmienie „w przygotowaniu" panel odrzucił (obiecuje termin dostawy);
decyzja obejmuje PIĘĆ stron naraz (indeks + cztery podstrony filarowe),
inaczej powstaje rozjazd indeks ↔ podstrona. Soczewka dostępności dodała
warunek mechaniczny: oznaczenie musi stać WEWNĄTRZ `<a>`, bo nazwa
dostępna linku liczy się tylko z jego zawartości — span po `</a>` nie
istnieje dla czytnika ekranu w trybie listy linków.

**(6) Nauka na przyszłość (ADR-018).** Użycie komponentu nie jest
dowodem statusu obietnicy. Dowodem jest komentarz decyzyjny przy użyciu,
przynależność do tablicy `MODULY` i zapis w protokole treści — trzy
źródła, nie jedno. Zgłoszenie do właściciela sprawdzam wszystkimi
trzema, zanim je wyślę.

### K-D6 · content/de/dla-kogo.md — adnotacja `**Linki:**` niezgodna z własną prozą

Wykryta PO akcepcie, kontrolą trójźródłową (treść ↔ `messages` ↔
lustro testu) na etapie pisania strażnika T1. Wiersz `**Linki:**`
w `content/de/dla-kogo.md:99` deklarował lemat „Einstiegsassistent",
podczas gdy proza tego samego pliku niesie biernik „über den
**Einstiegsassistenten**" — czyli formę zasądzoną w K-D3. Deklaracja
przeczyła więc rozstrzygnięciu stojącemu dwie pozycje wyżej w tym
rejestrze.

Naprawiona **adnotacja, nie proza**: konwencja PL w tym samym pliku
deklaruje formy odmienione, a proza jest zgodna z K-D3, więc błędem
był zapis deklaracji. **Zero bajtów widocznych dla użytkowniczki** —
pliki `content/**/*.md` nie są renderowane (runtime czyta wyłącznie
`content/facts.json`), a wiersze `**Linki:**` czyta test T1.

Nauka (ADR-018): zgodność „znak w znak" ma sens tylko wtedy, gdy
strażnik porównuje ze ŹRÓDŁEM ZEWNĘTRZNYM. Pierwsza wersja T1
porównywała etykietę linku z akapitem, który ten link zawiera —
zielona zawsze, bo kontener zawiera własne dziecko. Tautologia
zielonego testu jest groźniejsza od jego braku: brak widać.
Patrz `komponenty/handoff-etap-d.md` §9 (dowody mutacyjne M0–M2).

### K-D7 · trzy napisy chrome bez panelu językowego — ŚWIADOMY WYJĄTEK

**Co.** Przy naprawie znalezisk adwersarza Etapu D dopisałem do
`src/i18n/messages/{pl,en,de}.json` klucz `Nawigacja.nawGlowna`:
„Nawigacja główna" · „Main navigation" · „Hauptnavigation". Ciąg jest
nazwą dostępną landmarku `<nav>` (`aria-label`), nie tekstem na
stronie. Powstał **bez panelu językowego**, którym idzie każda inna
treść EN/DE tego etapu.

**Dlaczego był potrzebny.** Na podstronach filarowych stoją TRZY
landmarki `nav` (główna · okruszki · spis treści). Dwa ostatnie dostały
nazwy w Etapie B; główna została bezimienna, a bezimienny landmark
w liście landmarków czytnika ekranu jest nieodróżnialny od pozostałych.

**Dlaczego bez panelu — zgłoszone właścicielowi, AKCEPT 2026-08-14.**
Panel językowy rozstrzyga wybory redakcyjne: ton, rejestr, obietnicę.
Tu żadnego wyboru nie ma — to terminologia dostępności ustalona
konwencją, a nie brzmienie do zaprojektowania. Ciąg nie jest widoczny
dla osoby widzącej, nie niesie obietnicy i nie ma wariantu, który
byłby „lepszy w tonie serwisu".

**Granica wyjątku (żeby nie stał się cichym precedensem).** Wyjątek
obejmuje WYŁĄCZNIE ciąg spełniający wszystkie trzy warunki naraz:
(1) niewidoczny w układzie wizualnym, (2) brzmienie narzucone
konwencją dostępności, nie redakcją, (3) zero obietnicy o produkcie.
Ciąg, który nie spełnia choć jednego, idzie panelem — bez dyskusji.

**Zakres pokrewny.** Tą samą przesłanką („zero bajtów widocznych")
objęte jest usunięcie martwej przestrzeni `StronaWBudowie` z trzech
plików `messages` — patrz `komponenty/handoff-etap-d.md` §10.3. To
usunięcie kodu nieużywanego, nie zmiana treści.

### K-D8 · oznaczenie pozycji kierunku — nowa treść w 9 plikach (ZAMKNIĘTE 2026-08-14)

**Co.** Rozstrzygnięcie właściciela z 2026-08-14 (forma L1-A) domyka
K-D5 i wprowadza **cztery nowe ciągi widoczne** ×3 języki:
`FunkcjeIndeks.blok1Oznaczenie`, `FunkcjeIndeks.blok2Oznaczenie`
(przestrzeń rośnie 18 → 20 kluczy) oraz `aiOznaczenie`
w `FunkcjePozyskiwanie` i `FunkcjeTresci`. Odpowiedniki dopisane do
`content/{pl,en,de}/funkcje.md` (po dwa bloki) oraz
`funkcje-pozyskiwanie.md` i `funkcje-tresci.md` (po jednym) — razem
**12 wstawek w 9 plikach treści**.

**Dlaczego to jest wpis do rejestru, a nie cicha zmiana.** Etap D miał
zapisane „Nie ma zmian w PROZIE `content/` — treść jest zamknięta".
Ta zmiana treść otwiera: cztery ciągi widoczne na powierzchni serwisu,
w tym słowo, którego w korpusie nie było. Wstawki stoją jako osobne
podsekcje (`### Oznaczenie pozycji kierunku`, `### Oznaczenie statusu
(człon H2)`) po pustej linii, więc parser `pozycjeZTresci` nadal wydaje
dokładnie 33 ponumerowane pozycje, a same wiersze numerowane pozostają
nietknięte.

**BRZMIENIE ROZSTRZYGNIĘTE 2026-08-14 — pakiet ZWIĘZŁY, ×3 języki.**
Placeholdery („— [BRZMIENIE NIEROZSTRZYGNIĘTE: …]" i odpowiedniki)
stały w plikach celowo dłuższe od każdego kandydata, żeby testy
geometryczne mierzyły przypadek ostrzejszy niż docelowy; zeszły
w całości — `grep` po `src/` i `content/` daje dziś zero trafień.
Decyzja właściciela: „glosa raz, na podstronie — nie w 33 linkach;
pokrycie pomiarowe rozstrzyga".

| klucz | pl | en | de |
|---|---|---|---|
| `blok1Oznaczenie` | — kierunek w pozyskiwaniu | — a direction in Acquiring | – Ausblick: Kontakte gewinnen |
| `blok2Oznaczenie` | — kierunek w treściach | — a direction in Content | – Ausblick: Inhalte |
| `aiOznaczenie` ×2 | — kierunek | — a direction | – Ausblick |

Nazwa obszaru wchodzi WYŁĄCZNIE na indeksie i jest tam jedynym
różnicownikiem: obie pozycje kierunku niosą etykietę „asystent AI",
więc identyczny sufiks zostawiłby dwie nierozróżnialne nazwy dostępne
(awaria #11). Na podstronach obszar wynika z kontekstu strony i nie
jest powtarzany.

**DE — osobny panel językowy (wf_d4b3c933-758), słowo „Richtung"
ODRZUCONE.** Właściciel nałożył warunek: człon DE bez słowa
„Richtung", bo koliduje jednostronicowo z użyciem przestrzennym
w `mod3_nie` i `mod4_nie` (`de.json:211` i `:214`, obie
`FunkcjePozyskiwanie`) — parytet znaczeniowy przed leksykalnym.
Przyjęte „Ausblick": zero wystąpień w korpusie przed tą zmianą
(sprawdzone repo-wide), wiązanie dwukropkowe ma precedens
(`de.json:121`, `:300`, `:327`, `:367`, `:374`). Odrzucone także
„zum Thema" — echo z sąsiednim linkiem wejściowym (`blok1–4Link`).
Myślnik DE zgodny z konwencją korpusu: U+2013 (`de.json` ma 122
wiersze z U+2013 i 0 z U+2014). Panel stracił jednego agenta
(`krytyka:bez-rzeczownika` — zerwane połączenie); synteza wykonała
jego rozliczenie sama i tak jest to odnotowane. Wszystkie twierdzenia
panelu zweryfikowane u źródła przed przyjęciem.

**Pomiar, nie arytmetyka.** Nazwy dostępne złożone: pl 37/34/22,
en 39/37/26, de 42/32/23 znaków. Bramki geometryczne (2.5.8,
reflow 320 px) mieszkają w tych samych plikach speców co strażnicy
treści, więc pokrycie pomiarowe pakietu ZWIĘZŁY jest zmierzone,
a nie założone: 268/268 zielonych po podmianie pl+en, 314/314 po
komplecie z de i F8.

**Korekta briefu przyjęta przez właściciela.** Brief mówił o TRZECH
pozycjach kierunku; faktycznie są DWIE. Studio (`/funkcje/tresci#studio`)
ma formę karty kierunku wyłącznie z powodu braku zrzutu do przebudowy
(F4-2, D-C5), a status obietnicy DZIAŁA (K-D5) — i oznaczenia nie
dostaje. Pilnuje tego mutacja M4 w `komponenty/handoff-etap-d.md` §12.4.

### K-D9 · kolizja F8 z pozycją kierunku — rozbicie na `f8_1` + `f8_2`

**Sprzeczność.** `FunkcjeIndeks.f8` („Wszystko powyżej działa od planu
Starter.", renderowane PO czterech blokach) kwantyfikowało także obie
pozycje kierunku; to samo na `/funkcje/pozyskiwanie` i `/funkcje/tresci`,
gdzie F8 stoi bezpośrednio pod sekcją AI. Sprawdzone ×3 języki.
Oznaczenie tej sprzeczności nie stworzyło — uczyniło ją widoczną
w jednym kadrze. Właściciel potwierdził ją 2026-08-14 i zażądał
doprecyzowania wiersza F8 przed pushem, przez mini-panel treści
(`wf_5c24266d-394`) i strażnika parytetu.

**Rozstrzygnięcie: rozbicie klucza, nie przepisanie zdania.**
`f8` → `f8_1` + `f8_2` w trzech przestrzeniach (`FunkcjeIndeks`,
`FunkcjePozyskiwanie`, `FunkcjeTresci`), na gałęzi `zdania`
komponentu `PlanJednymWierszem` — wzorzec istniejący wcześniej na
`/funkcje/zespol` i `/funkcje/wyniki`, nie nowy kontrakt.

| klucz | pl | en | de |
|---|---|---|---|
| `f8_1` | Wszystko powyżej działa od planu Starter. | Everything above works from the Starter plan up. | Alles, was oben steht, funktioniert ab dem Starter-Plan. |
| `f8_2` | Asystenta AI nie dostajesz w żadnym planie. | You don’t get the AI assistant on any plan. | Den KI-Assistenten bekommst du in keinem Plan. |

`f8_1` zostaje ZNAK W ZNAK formułą stojącą w pięciu miejscach
nietkniętych tą zmianą (`FunkcjeZespol.f8_1`, `FunkcjeWyniki.f8_1`,
`DlaKogo.s1_plan`, `s2_plan_1`, `s3_plan_1`), więc rozjazd korpusu
jest addytywny — żadne zdanie nie zostało przepisane.

**Dlaczego wyłączenie Z IMIENIA, a nie zawężenie kwantyfikatora.**
Mini-panel rozjechał się na pół: dwie poprawki chciały zawęzić
(„wszystko, co powyżej **działa**"), dwie — nazwać wyjątek. Rozstrzygnął
ADR-018, nie gust. Zawężenie działa tylko wtedy, gdy czytelniczka
odczyta człon „— kierunek" jako „nie działa"; sprawdzone u źródła:
`SekcjaKierunku` renderuje wyłącznie `tresc` i `granica`, obie w trybie
oznajmującym jak moduły działające („Z asystentem AI dostosowujesz
wiadomości do konkretnej osoby."), a komentarz w `pozyskiwanie/page.tsx`
przyznaje wprost „sama sekcja swojego statusu nie nazywa". Zawężenie
kazałoby więc wywnioskować to, czego strona nie mówi — a „brak dowodu
= brak zabezpieczenia".

**Prawdziwość `f8_2` potwierdzona u źródła, nie wywnioskowana.**
`content/pl/cennik.md:73` wymienia „wywołania AI (klucz pusty)"
w wierszu **WYKLUCZONE** (decyzja właściciela + panel F1–F3). Zero
trafień na „AI/asystent" w przestrzeniach cennikowych `messages` ×3
języki i zero w `content/facts.json`.

**Dobór słowa.** Czasownik `dostajesz` / `bekommst` ma precedens w tej
samej rodzinie F8 (`FunkcjeZespol.f8_2`) i zamyka odczyt „nie jest
bramkowany, czyli mają wszyscy" — którego bezokolicznikowe „nie ma go
w żadnym planie" nie zamyka. Kandydat panelu z rzeczownikiem
„wyjątek / exception / Ausnahme" odrzucony: **zero precedensu
w korpusie ×3 języki**, abstrakcja urzędowa w tekście pisanym drugą
osobą. Kandydat „nie ma go w Catherly" odrzucony jako wykraczający
poza mandat („doprecyzowanie wiersza F8") — to wypowiedź o produkcie,
nie o planie, i zderzałaby się czołowo z sąsiednią prozą.

**Zero zależności od panelu DE.** `f8_2` cytuje wyłącznie `aiNaglowek`
(`asystent AI` / `AI assistant` / `KI-Assistent`), rozstrzygnięty
wcześniej. Rzeczownik kierunku nie pada; myślnik nie pada w ogóle,
więc konwencja U+2014/U+2013 w tym wierszu nie wchodzi w grę.

**Zasięg.** 6 ciągów w `messages` (2 klucze ×3 języki ×3 przestrzenie
= 18 wartości), 3 wywołania komponentu, 9 plików `content`, 4 punkty
styku w specach (`funkcje-indeks.spec.ts` — komplet kluczy i bez-JS;
`funkcje-pozyskiwanie.spec.ts` — DOM; `funkcje-podstrony.spec.ts` —
`f8Klucze`). NIETKNIĘTE: `FunkcjeZespol`, `FunkcjeWyniki`, `DlaKogo`.
`sekcjeMain: 14` zostaje trafne — `PlanJednymWierszem` renderuje jedną
`<section>` niezależnie od liczby akapitów.

**Korekta własnej adnotacji.** W `content/{pl,en}/funkcje-pozyskiwanie.md`
i `funkcje-tresci.md` stało wcześniej, że „glosę niesie proza pod
nagłówkiem, nie człon". To była **nieprawda o repo** — takiej prozy nie
ma. Adnotacje poprawione i wskazują dziś `f8_2`. Poprawione też
uzasadnienie prawdziwości F8 w `content/pl/funkcje-tresci.md`
(„żaden moduł strony nie ma bramki GROWTH/PRO"), które przeterminowało
się w momencie powstania pozycji kierunku.

---

## Etap C — korekty po adwersarzu (2026-08-13)

Źródło decyzji: werdykt adwersarza Etapu C (ODRZUCENIE, 2 blokady)
→ decyzje właściciela z 2026-08-13 → poprawki w commitach `8813a7f`
(treść) i `bea43c0` (strażnicy). Ponowny przebieg adwersarza: AKCEPT.

### K-C1 · content/en/funkcje-zespol.md — forma zdania Growth (F8)

Brzmienie przeniesione z nagłówka pliku (verbatim):

> Korekta 2026-08-13 (adwersarz C, uwaga EN F8): „In the Growth
> plan" → „On the Growth plan" ×2 — werdykt panelu uzupełniającego
> EN zatwierdzony przez właściciela (uzus SaaS; forma kanoniczna
> zdania Growth, rejestr poz. 11).

Zasięg: `f8_2` i `f8_3` w treści oraz w `src/i18n/messages/en.json`.
Właściciel przyjął podwójne „On the Growth plan…" jako świadomy
koszt reguły verbatim.

### K-C2 · content/en/funkcje-wyniki.md — nazwa zakładki (tabWall)

Brzmienie przeniesione z nagłówka pliku (verbatim):

> Korekta 2026-08-13 (adwersarz C, blokada 2): „Success Wall" →
> „Success wall" ×4 — verbatim z i18n aplikacji (tabWall,
> sankcjonowany odczyt; decyzja właściciela wariant a). Słownik
> nazw: wiersz dodany. Format linku F8 ujednolicony do nawiasów.

### K-C3 · content/de/funkcje-wyniki.md — potwierdzenie „Erfolgswand"

Brzmienie przeniesione z nagłówka pliku (verbatim):

> Rozstrzygnięcie 2026-08-13 (adwersarz C, blokada 2): „Erfolgswand"
> POTWIERDZONE verbatim z i18n aplikacji (tabWall, sankcjonowany
> odczyt; decyzja właściciela wariant a) — marker PROPOZYCJA
> usunięty, wiersz słownika dodany. Format linku F8 ujednolicony.

### K-C4 · format linku F8 (6 plików tresci/zespol/wyniki ×3 języki)

Ujednolicenie do formy `[Link: … → /cennik]` — obserwacja panelu EN
poza mandatem, wykonana na polecenie właściciela. Pliki
`funkcje-pozyskiwanie.md` zachowują własną konwencję `**Link:**`
(poza mandatem korekty — do ewentualnego ujednolicenia osobno).

### K-C5 · metoda powstania treści Etapu C

Przeniesione z nagłówków plików PL: fan-out workflow → panele
(Prawo 2); 3 moduły dorobione cyklem uzupełniającym. Pełny protokół
z ryzykami: `docs/faza-4/tresci-trzy-podstrony-po-panelach.md`
(dokument odzyskany 2026-08-13 po mechanicznym obcięciu wpisów do
300 znaków; źródła odzysku: `docs/faza-4/odzysk-etap-c/`).

---

## Etap B — korekty i noty paneli (2026-08-12)

### K-B1 · metoda powstania treści wzorcowej podstrony

Przeniesione z nagłówka `content/pl/funkcje-pozyskiwanie.md`:
fan-out (workflow 10 autorów + rama) → panel Prawo 2; moduł
formularza dorobiony panelem uzupełniającym. Protokół:
`docs/faza-4/tresci-pozyskiwanie-po-panelu.md`.

### K-B2 · content/en/funkcje-pozyskiwanie.md — werdykt panelu EN

Panel EN: POPRAWKI — 6 zmian naniesionych przed akceptem.
Nota panelu dla właściciela przeniesiona z nagłówka (verbatim):

> Odnotowane przez panel dla właściciela: niespójność cennika EN
> („a Daily Method of Operation") ↔ słownik („DMO — Daily Action
> Plan") — korekta cennika EN wymaga osobnej decyzji.

Status: ZAMKNIĘTE — właściciel zdecydował korektę cennika EN
w trybie A-3 (wykonana w commicie `d266688`).

### K-B3 · content/de/funkcje-pozyskiwanie.md — werdykt panelu DE

Panel DE: POPRAWKI — 3 zmiany naniesione, w tym granica sekcji AI
(„er macht Vorschläge" zamyka dwuznaczność wariantu V2).
Noty przeniesione z nagłówka (verbatim):

> „Debriefings" zostaje (parytet z PL „debrief"); rezerwa
> „Nachbesprechungen" odnotowana. „KI-Assistent" — rozjazd z i18n
> aplikacji rejestrowany (przy rozjeździe wygrywa aplikacja).

Status OTWARTY: „KI-Assistent" do potwierdzenia zleceniem Z
(nazwa aplikacji jest wzorcem — patrz `docs/faza-4/zlecenie-Z7.md`).
