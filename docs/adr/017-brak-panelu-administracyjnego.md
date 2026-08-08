# ADR-017 — Brak panelu administracyjnego strony

Pełny tekst decyzji: PLAN.md, sekcja 13.

## Kontekst
Rozważano dostęp administratora „do wszelkich zmian" przez panel na
stronie. Strona jest statyczna: nie ma bazy, logowania ani powierzchni
ataku — a pełna władza nad każdym elementem istnieje już przez
repozytorium (Claude Code, GitHub web/mobile).

## Decyzja
Strona catherly.com NIE ma panelu administracyjnego ani żadnego
mechanizmu logowania po stronie www. Administracja wyłącznie przez
repozytorium: edycja → PR → bramki → automatyczne wdrożenie. Ceny i plany
administruje się w Stripe (Prawo 1). Status prowadzi Upptime
automatycznie. Zgłoszenia z formularzy przychodzą na e-mail.

## Uzasadnienie (trzy filary)
1. Bezpieczeństwo — panel to drzwi wymagające wiecznej obrony; strona
   bez logowania ma zerową powierzchnię ataku, co jest obietnicą spójną
   z /bezpieczenstwo.
2. Integralność — zmiana przez panel omija bramki (parytet językowy,
   kontrast, prawdziwość liczb, kontrakt tokenów); droga przez PR czyni
   stronę niemożliwą do zepsucia, również przez administratora.
3. Koszt — panel to osobny produkt utrzymywany dla jednej osoby, która
   ma już lepszy interfejs.

## Warunek rewizji
Gdy treść ma regularnie edytować osoba nietechniczna, temat wraca
WYŁĄCZNIE jako git-based CMS (np. Decap/TinaCMS) — nakładka na te same
pliki, nadal przez PR i bramki, nigdy jako osobna baza z własnym
logowaniem. Rewizja wymaga ADR-a uchylającego niniejszy.

## Konsekwencje
Żaden agent nie projektuje ani nie implementuje ekranów
administracyjnych, endpointów zapisu ani uwierzytelniania w catherly-www.
Propozycje takich elementów w PR = odrzucenie przez adwersarza
z powołaniem na ADR-017.

## Data
2026-08-06.
