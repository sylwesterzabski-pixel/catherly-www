# Rejestr korekt treści podstron funkcji (Faza 4, Etapy B–C)

**Status: OBOWIĄZUJE jako dokumentacja.** Powstał 2026-08-13 na
polecenie właściciela po Etapie C (uwaga adwersarza C, pkt 1):
historia korekt i noty paneli wyprowadzone z nagłówków plików
`content/` — pliki treści mają nieść treść, nie swoją historię.

Zasada na przyszłość: nagłówek pliku `content/*/funkcje-*.md` niesie
wyłącznie (1) status z numerem decyzji właściciela i datą, (2) źródło
adaptacji dla EN/DE, (3) wskaźnik protokołu, (4) wskaźnik na ten
rejestr. Każda korekta po akcepcie dopisuje pozycję TUTAJ.

Wyjątek świadomy: w `content/pl/funkcje-pozyskiwanie.md` zostaje
zdanie „Granice prawdziwe NA DZIŚ — rejestr warunków powrotu
poz. 15–18". To nie historia korekty, tylko zastrzeżenie ważności
samych obietnic — należy do treści, nie do archiwum.

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
