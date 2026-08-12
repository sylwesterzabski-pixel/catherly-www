# Architektura podstron funkcji (Faza 4, Etap A)

Status: DO AKCEPTU WŁAŚCICIELA. Metoda: 5 równoległych ekstraktorów
tabeli obietnic + niezależny weryfikator adwersaryjny (Prawo 2)
+ inwentarz artefaktów K12. Decyzje F4-1…F4-5 przyjęte 2026-08-12.

## Rachunek funkcji — USTALENIE WERYFIKATORA (do potwierdzenia: A-2)

Pozycji „można obiecać (tryb dokonany)" w tabeli obietnic jest
**31** (10+9+6+6+0), nie 38. Liczba 38 pochodzi z inwentarza
(inwentarz-funkcji.md l. 4: bilans per POZYCJA INWENTARZA — 105
pozycji; tabela obietnic AGREGUJE, np. 21 funkcji AI → 1 wiersz
kierunku). Strona pokaże trybem dokonanym komplet 31 obietnic
pokrywających ≥38 pozycji inwentarza — różnica miar, nie utrata
funkcji. Filar 5 ROZLICZENIA: **zero DZIAŁA** (billing 0 end-to-end;
spójne z DECYZJĄ 3 i rejestrem warunków powrotu poz. 1).

## Mapowanie podstron (F4-1: 4 podstrony filarowe)

| Podstrona | Źródło | DZIAŁA | Kierunek (sekcje bez dokonanego) |
|---|---|---|---|
| /funkcje/pozyskiwanie | Filar 1 KONTAKTY | 10 | asystent AI (personalizacja) — 1 |
| /funkcje/tresci | Filar 2 TREŚCI | 9 (w tym Studio — patrz wyjątek F4-2) | generowanie AI — 1 |
| /funkcje/zespol | Filar 3 ZESPÓŁ | 6 | Puls zespołu, Drzewo struktury — WYŁĄCZNIE w opisie planu Growth (F8), nie jako moduły |
| /funkcje/wyniki | Filar 4 WYNIKI | 6 | Puls zespołu (jak wyżej) |

- **Rozliczenia (STRATEGIA pkt 31 wymienia je w /funkcje/wyniki):**
  sekcji NIE BĘDZIE — 0 pokrycia; wraca rejestrem warunków powrotu.
- **Wyjątek F4-2 (decyzja właściciela):** Studio ma w tabeli status
  DZIAŁA, ale do przebudowy (wariant C) jest komunikowane JĘZYKIEM
  KIERUNKU i BEZ ekranu — świadome, odnotowane odstępstwo od
  gramatyki tabeli na wniosek właściciela; zrzut dołączy po liftingu.
- Moduły MILCZENIA (20 pozycji na 5 filarów) — nieobecne; listy
  w ekstrakcji Etapu A (scratchpad → briefy treści).

## Komplet 31 obietnic dokonanych (nazwy wg słownika)

**Pozyskiwanie (10):** formularz zgłoszeniowy z publiczną stroną ·
Kalendarz z przypomnieniem 30 min · subskrypcja kalendarza
w telefonie · eksport vCard · QR polecający · program poleceń ze
śledzeniem · DMO — Dzienny Plan Działania · Zadania · Sala
Treningowa (biblioteka obiekcji, 7 kategorii) · plany rozmów
i debriefy.
**Treści (9):** Studio (WYJĄTEK F4-2 — kierunek) · szablony
z wersjonowaniem · zestawy hashtagów · kalendarz publikacji ·
workflow zatwierdzania · Tarcza · Pieczęć Etyczna (certyfikat QR) ·
uczenie profilu głosu · tablica postów z filtrami.
**Zespół (6):** kreator wdrożeniowy (opisowo, małą literą) ·
workflow zatwierdzania zespołu · Pierwsze 90 Dni · Osiągnięcia
(odznaki, serie, żetony łaski) · Paszport zgodności (4 jurysdykcje)
· Akademia (sekwencyjne odblokowanie; treści szkoleniowe dostarcza
liderka — uczciwie o infrastrukturze).
**Wyniki (6):** Pulpit · Twój Wrapped · Cel z kamieniami milowymi ·
Ściana sukcesów · Świadectwo (SHA-256, eksport CSV) · Wall of Proof.

## Szablon K12 — stan i uzupełnienia

Wireframe funkcje-pozyskiwanie.md: **OBOWIĄZUJE (DECYZJA 6), pasuje
do F4-1 wprost** (moduł ×N = sekcja per funkcja; H2 z id = kotwice).
Struktura modułu: H2 (nazwa ze słownika) → PO CO TO (1–2 zdania) →
JAK WYGLĄDA (slot zrzutu; do dostawy placeholder tokenowy —
F4-3: start bez zrzutów, partie od Z9) → CZEGO NIE ROBI (1 zdanie,
obowiązkowe). F8: plan jednym wierszem + link /cennik (Growth
językiem kierunku na /zespol). F9: przejścia poprzedni/następny
filar. F10: K11 wariant krótki.
Uzupełnienia do briefu K12 (bez zmiany układu — pipeline pkt 2):
1. KOTWICE: id modułów (slug nazwy), cele linków z indeksu /funkcje.
2. Slot sekcji kierunku (wireframe go nie miał — moduł w wariancie
   „kierunek": bez trybu dokonanego, bez slotu zrzutu).

## Implementacja — inwentarz

- Reużycie: Nawigacja (F1), Stopka (F11), Zamkniecie/K11 (F10);
  wzorce markupu: SekcjaTekstowa, Filar (moduł funkcji = nowy
  komponent na bazie wzorca Filara: bez sztywnych 3 konkretów,
  + „czego nie robi", + wariant kierunku).
- Nowe: okruszki (F1), ModulFunkcji, NaglowekPodstrony (H1+zdanie),
  PrzejsciaFilarow (F9), PlanJednymWierszem (F8).
- Rejestr ścieżek: dopisać /funkcje/pozyskiwanie (Etap B), potem
  /funkcje/{tresci,zespol,wyniki} (Etap C), /pomoc (Etap E) —
  każda w swoim PR (middleware 404 wymusza).
- Pytanie A-1 (menu): na /funkcje/* żadna pozycja menu nie jest
  dokładnie bieżąca — rekomendacja: rodzic „Funkcje"
  z aria-current="true" (sekcja, nie strona).

## Ustalenia weryfikatora do zgłoszenia właścicielowi (A-3)

Tabela obietnic (OBOWIĄZUJE) zawiera w TREŚCIACH obietnic wycofane
nazwy i literówki: „Magic Wrapped podsumowuje…" (winno być Twój
Wrapped), „w symulatorze" (Sala Treningowa), „Rejestrujesz
i świętuj" (świętujesz), „debriefe" (debriefy), „Cele z kamieniami"
(Cel — słownik). Proponowana korekta TECHNICZNA tabeli (nazwy wg
słownika + literówki, zero zmiany sensu obietnic) — wymaga zgody
właściciela, bo plik ma status OBOWIĄZUJE.
