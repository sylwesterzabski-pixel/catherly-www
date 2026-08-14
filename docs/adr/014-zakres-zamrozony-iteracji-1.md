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

## Doprecyzowanie 2026-08-14 — /pomoc bez liczbowej obietnicy czasu

Decyzja właściciela z 2026-08-14. Zakres /pomoc na start to **pierwsze
kroki + FAQ ponadcennikowe + kontakt** — suma pozycji z niniejszego ADR-a
i DECYZJI F4-4a (docs/faza-4/PLAN-FAZY-4.md) — ale **bez liczbowej
obietnicy czasu odpowiedzi**.

Powód. Zapis z 2026-08-06 brzmiał „/pomoc w wersji minimalnej: pierwsze
kroki + kontakt **z realnym czasem odpowiedzi**". Człon o czasie czyta się
jak zapowiedź konkretnej liczby („odpowiadamy w 24 h", „do 2 dni
roboczych"). Ta liczba nie ma dziś pokrycia operacyjnego: nie ma dyżuru,
nie ma pomiaru czasu odpowiedzi i nie ma nikogo, kto by ją egzekwował.
Wobec ADR-018 („nigdy nie obiecujesz na stronie tego, czego aplikacja nie
robi"; „brak dowodu = brak zabezpieczenia") liczba bez pomiaru jest
obietnicą niepokrytą i na stronę nie wchodzi.

W jej miejsce wchodzi **formuła miękka**, ustalana przez panel treści,
z **zerem liczb** — bez godzin, bez dni roboczych, bez widełek, bez
„zwykle" z liczbą. Zobowiązanie liczbowe (SLA) wraca po premierze, kiedy
będzie z czego je policzyć; wtedy osobnym doprecyzowaniem albo ADR-em.

Status członów po tej korekcie: „pierwsze kroki" — bez zmian. „kontakt" —
bez zmian co do istnienia, zawężony co do formy (zero liczb). „FAQ
ponadcennikowe" — pozycja **dodana** względem 2026-08-06.

### Do rozstrzygnięcia przez właściciela (nie rozstrzygam sam)

1. Sekcja „Konsekwencje" wyżej wymaga, by każde rozszerzenie zakresu
   miało ADR jawnie uchylający ADR-014. „FAQ ponadcennikowe" jest
   rozszerzeniem, a zostało zapisane tutaj jako doprecyzowanie na
   polecenie właściciela. Jeśli forma ma być ADR-em uchylającym — tu jest
   miejsce, w którym go brakuje.
2. Ta sama sekcja obejmuje pozycje, które Faza 4 już zbudowała, a które
   ADR-014 umieszcza **poza** zakresem startu: cztery podstrony filarów
   oraz /dla-kogo (Etapy C i D gałęzi faza-4/podstrony). Nie znalazłem
   ADR-a uchylającego ten punkt; ADR-024 zmienia kolejność prac, nie
   zakres startu. Do rozstrzygnięcia, czy te strony wchodzą do zakresu
   startu (wtedy potrzebny ADR uchylający), czy powstały przed startem,
   ale publikują się dopiero przez /zmiany. Odnotowane w rejestrze
   warunków powrotu jako pozycja T5.

## Data
2026-08-06. Doprecyzowanie: 2026-08-14.
