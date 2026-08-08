# ADR-014 — Zakres zamrożony Iteracji 1

Pełny tekst decyzji: PLAN.md, sekcja 11.

## Kontekst
Układ przyjęty: strona żywa z programem pierwszych użytkowniczek tak
szybko, jak pozwala rzemiosło — ani dnia dłużej. Wszystko poniżej kreski
trafia do publicznego /zmiany po starcie, nie do zakresu startu.

## Decyzja

### W zakresie startu (blokuje publikację)
**Strony:** główna (sekcje 16–26 **bez** sekcji dowodu — pkt 22 mówi
jasno: dopóki nie ma prawdziwych historii, sekcji nie ma) · /funkcje jako
jedna strona przeglądowa z czterema blokami (bez czterech podstron
szczegółowych) · /cennik pełny · /bezpieczenstwo (decyduje u ostrożnych —
zostaje w całości) · /pomoc w wersji minimalnej: pierwsze kroki + kontakt
z realnym czasem odpowiedzi · /kontakt · dokumenty prawne (regulamin,
prywatność, ciasteczka, przetwarzanie danych — z prawem odstąpienia
i cenami brutto per ADR-012) · ścieżka zakupu: /rejestracja → płatność →
/witaj → app, plus /logowanie i /odzyskiwanie-hasla · /zmiany (żywy od
dnia startu — pierwszy wpis to sam start) · /status w wersji prostej.

**Jakość (nienegocjowalne):** wszystkie bramki z sekcji 5 PLAN.md · trzy
języki z parytetem · warstwa rzemiosła: system ruchu w tokenach,
mikrotypografia per język, inwentarz stanów w DoD, ciepła jakość per
ADR-013 · e-maile transakcyjne w design systemie · ścieżka nieszczęśliwa
(odrzucona karta, 404 ×3 języki).

**Równolegle od dziś (nie po starcie):** program pierwszych
użytkowniczek — rekrutacja ograniczonej grupy na preferencyjnych
warunkach w zamian za udokumentowane historie po 60–90 dniach.

### Poza zakresem startu (do /zmiany, kolejność wg pomiaru)
Cztery podstrony filarów · /dla-kogo · /o-catherly · /blog · demo
interaktywne · /integracje · strony porównań (vs zeszyt/Excel, vs CRM)
· kalkulator czasu · darmowe narzędzie-magnes · webinary i nagrania
· element podpisu w wersji rozbudowanej (na start: jedna prosta wersja
gestu troski, reszta iteracyjnie).

### Definicja startu
Strona jest gotowa do publikacji, gdy: (1) wszystkie bramki zielone na
zakresie startu, (2) E2E cennik→płatność→konto→aplikacja zielony,
(3) audyt pięciu soczewek bez blokad, (4) program pierwszych
użytkowniczek ma otwartą rekrutację. Nic więcej nie wstrzymuje publikacji.

## Konsekwencje
Każde „jeszcze tylko jedno" po tej dacie wymaga ADR-a, który jawnie
uchyla niniejszy ADR-014.

## Data
2026-08-06.
