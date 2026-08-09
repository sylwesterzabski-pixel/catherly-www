# Sześć obaw — PL (STRATEGIA pkt 24)

**Status: OBOWIĄZUJE — DECYZJA właściciela 2026-08-09.**
Synteza panelu z rozstrzygnięciami właściciela:
- Para 2: wersja uczciwa BEZ zdania kierunku (inwentarz nie zawiera
  hurtowego importu kontaktów — jest tylko import wyciągu FL; obietnica
  kierunku bez śladu w kodzie odpada).
- Para 4: wersja zachowawcza; weryfikacja lokalizacji danych
  i szyfrowania zlecona oknu aplikacji osobno — do tego czasu zero
  twierdzeń o architekturze.
- SHA-256 zostaje w obawach (konkret techniczny na lęk o kontrolę);
  na stronie głównej filar Wyniki mówi „cyfrowy odcisk".
Protokół: docs/faza-2/panel-obawy.md.

---

## Para 1 — łatwość obsługi

**P:** Co jeśli znowu nie ogarnę nowej aplikacji? *(41 zn)*
**O:** Kreator wdrożeniowy prowadzi cię krok po kroku. Pierwsze 90 Dni dają ci gotowy plan na start. *(93 zn)*

## Para 2 — wprowadzenie istniejących kontaktów

**P:** A te kontakty, które już mam w innych miejscach? *(48 zn)*
**O:** Importu hurtowego nie ma — kontakty wpisujesz ręcznie lub przez formularz. Dane eksportujesz do vCard zawsze. *(109 zn)*

## Para 3 — dane po rezygnacji

**P:** A jeśli przestanę płacić — znikną mi dane? *(42 zn)*
**O:** Rezygnujesz kiedy chcesz. Eksportujesz kontakty do vCard, pobierasz CSV z rejestrem — wszystko jest twoje. *(106 zn)*

## Para 4 — bezpieczeństwo kontaktów

**P:** Mam dane klientek. Kto jeszcze je widzi? *(40 zn)*
**O:** Do twojego konta masz dostęp tylko ty. Tarcza kontroluje etyczność treści — Świadectwo SHA-256 rejestruje każdą zmianę. *(119 zn)*

## Para 5 — telefon

**P:** Prawie nie siadam do komputera — to zadziała? *(45 zn)*
**O:** Projektowane pod telefon od początku — nie ma okrojonej wersji. Otwierasz, działa jak trzeba. *(93 zn)*

## Para 6 — zgodność z zasadami firmy

**P:** Moja firma ma regulaminy. Czy mogę używać zewnętrznych narzędzi? *(64 zn)*
**O:** Paszport zgodności skanuje treść pod wymagania czterech jurysdykcji — ale ostatnie słowo ma twoje IT. *(101 zn)*

---

## Pokrycie tabelą obietnic (OBOWIĄZUJE)

Kreator wdrożeniowy · Pierwsze 90 Dni · eksport vCard · Świadectwo
(SHA-256 + CSV) · Tarcza (etyczność treści, nie bezpieczeństwo danych)
· mobile-first 390 px · Paszport zgodności (4 jurysdykcje) · rezygnacja
w każdej chwili — wszystkie DZIAŁA. Zero twierdzeń: „dane w UE",
lokalizacja bazy, szyfrowanie, import z plików (Storage atrapa).
„Czterech jurysdykcji" — cecha funkcji z tabeli, nie liczba marketingowa.
