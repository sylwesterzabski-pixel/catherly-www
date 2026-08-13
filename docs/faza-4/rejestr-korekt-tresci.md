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
