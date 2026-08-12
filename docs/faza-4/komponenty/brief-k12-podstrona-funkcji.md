# Brief K12: szablon podstrony funkcji (Faza 4, Etap B; pipeline 4.1)

Status: BRIEF. Wireframe funkcje-pozyskiwanie.md: OBOWIĄZUJE
(DECYZJA 6) + uzupełnienia z architektury Etapu A (zaakceptowanej
2026-08-12 z decyzjami A-1/A-2/A-3). Wzorcowa instancja:
/funkcje/pozyskiwanie (10 modułów DZIAŁA + 1 sekcja kierunku).

## Struktura strony (F1–F11 wireframe'u)

- F1: Nawigacja współdzielona + OKRUSZKI „Funkcje → Pozyskiwanie"
  (nowy element; nav[aria-label] + ol; ostatni okruszek to tekst,
  nie link). A-1: pozycja menu „Funkcje" z aria-current="true"
  (rodzic sekcji — nie „page").
- F2: H1 podstrony + 1 zdanie korzyści (treść z fan-outu po panelu
  i decyzji właściciela; jedyny h1).
- F3–F7: MODUŁY FUNKCJI ×10 — sekcja per funkcja: H2 (nazwa ze
  słownika) z id-KOTWICĄ (slug modułu — cele linków z indeksu
  /funkcje w Etapie D) → PO CO TO (1–2 zdania) → JAK WYGLĄDA
  (slot zrzutu: do dostawy Z9+ placeholder tokenowy ramki 16/10
  jak K4, aria-hidden na ramce; zrzut docelowo INFORMACYJNY z alt)
  → CZEGO NIE ROBI (1 zdanie, OBOWIĄZKOWE — uczciwa granica).
- WARIANT KIERUNKU modułu (uzupełnienie A): bez trybu dokonanego,
  BEZ slotu zrzutu; wyróżnienie tekstowe granicy (asystent AI tu;
  Studio na /funkcje/tresci w Etapie C — wyjątek F4-2).
- F8: plan jednym wierszem + link do /cennik; liczby WYŁĄCZNIE
  z facts.json (importy — linter liczb).
- F9: przejścia poziome między filarami (na wzorcowej: brak
  poprzedniego — pierwszy filar; następny → Treści). Linki
  wchodzą do rejestru ścieżek wraz ze stronami (Etap C) —
  do tego czasu przejście „następny" NIEAKTYWNE jako tekst
  (bramka linków!) albo ukryte — do rozstrzygnięcia w HF/panelu.
- F10: Zamkniecie (K11, wariant krótki — treść z fan-outu).
- F11: Stopka z layoutu.

## Wymagania twarde

- Zero JS; mobile-first 390 px; kotwice ze scroll-margin (sticky
  nav — precedens #tresc); zoom 320 px bez panoramy (strażnicy
  behawioralni jak w E/F).
- Kontrasty: wyłącznie istniejące pary tokenów; moduł na tle
  strony (bez kart) LUB na powierzchni — decyzja w HF z parami
  z komentarzy tokenów; zero nowych par bez wyliczenia.
- Tryb dokonany w modułach DZIAŁA; kierunek bez dokonanego;
  MILCZENIE nieobecne (20 pozycji z ekstrakcji A — strażnik
  adwersarza: żadna nazwa z list milczenia nie występuje w DOM).
- Parytet ×3 od pierwszego commita; strażnik znak w znak
  messages ↔ content/{pl,en,de}/funkcje-pozyskiwanie.md (nowe
  pliki treści po decyzji właściciela); adaptacje EN/DE przez
  panele (wzorzec Fazy 2/S9).
- Rejestr ścieżek: + "/funkcje/pozyskiwanie" (middleware 404).
- Komponenty nowe: Okruszki, ModulFunkcji (wzorzec Filara: H2+id,
  tekst, ramka; + „czego nie robi", + wariant kierunku, bez
  sztywnych 3 konkretów), NaglowekPodstrony, PrzejsciaFilarow,
  PlanJednymWierszem. Reużycie: Nawigacja, Stopka, Zamkniecie.

## Pipeline

Fan-out treści (workflow: 10 modułów + rama → panel) → DECYZJA
właściciela (treść) → HF szablonu (statyczny, tokeny; moduł pełny
+ moduł kierunku + okruszki + F8/F9/F10; 390 px i desktop) → panel
projektu (Prawo 2) → handoff → implementacja → bramki + testy
(w tym: kotwice działają — fragment nawiguje; okruszki; aria-current
rodzica; strażnik milczenia) → adwersarz → akcept właściciela →
push per etap.

---

## Uzupełnienie Etapu C (decyzja właściciela 2026-08-12, akcept B)

- **SPIS TREŚCI jako element STANDARDOWY szablonu** (wszystkie
  cztery podstrony, w tym retroaktywnie /pozyskiwanie): lista
  linków do kotwic modułów, nad pierwszym modułem; etykieta —
  mikrotekst do sankcji (fan-out C proponuje, panel rozstrzyga).
- **F9 dwukierunkowe:** kolejność pozyskiwanie → tresci → zespol
  → wyniki; lewy/prawy link warunkowo od rejestru ścieżek.
- **/funkcje/tresci:** moduł Studio w WARIANCIE KIERUNKU (F4-2 —
  język kierunku, BEZ slotu zrzutu, mimo statusu DZIAŁA w tabeli;
  zrzut po przebudowie wariant C aplikacji).
- **/funkcje/zespol i /wyniki:** Puls zespołu / Drzewo struktury
  NIE są modułami ani sekcjami — wyłącznie F8 w języku planu
  Growth (pełna forma „W planie Growth…" — rejestr poz. 11).
