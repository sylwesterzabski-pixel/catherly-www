# Treść /cennik — PL (STRATEGIA pkt 32; struktura wg DECYZJI 4)

**Status: OBOWIĄZUJE — decyzja właściciela 2026-08-09.**
Flaga „Pierwsze 90 Dni" (Para 1 obaw) dopisana do zlecenia Z1.
Protokół: docs/faza-2/panel-cennik.md. Struktura:
docs/faza-2/projekt-cennik.md (OBOWIĄZUJE).
Ceny i oszczędności: wyłącznie z migawki Stripe ({placeholdery}),
nigdy literały. Z1/Z2 ROZSTRZYGNIĘTE (2026-08-09): karta Pro
uzupełniona; FAQ-faktura i trial = milczenie (rejestr warunków
powrotu); CTA → /login (ADR-023). Panel zmian:
docs/faza-2/projekt-zmian-po-z1-z4.md.

---

## 1. Nagłówek strony

H1: Plany różnią się zakresem, nie obietnicami *(42 zn)*

Wstęp: Każdy plan to ten sam system. Różnica leży w zakresie — od
twoich pierwszych kontaktów po całą strukturę zespołu. *(113 zn)*

## 2. Przełącznik miesięcznie / rocznie

Etykiety: „miesięcznie" / „rocznie". Przy „rocznie" per plan:
„oszczędzasz {oszczednosc} zł" — kwota wyliczana z migawki Stripe
(12 × cena miesięczna − cena roczna), z groszami jeśli wychodzą.

## 3. Karty planów

### Starter — {cena.starter} zł
Dla kogo: Dla ciebie, jeśli zaczynasz i chcesz mieć jasny plan na
każdy dzień. *(68 zn)*
- Pulpit — jeden ekran, na którym widzisz swoje kontakty i wyniki *(63 zn)*
- DMO — Dzienny Plan Działania, który mówi, co dziś zrobić *(56 zn)*
- Formularz zgłoszeniowy z publiczną stroną — kontakty trafiają prosto do bazy *(76 zn)*
- Sala Treningowa — ćwiczysz trudne odpowiedzi, zanim padną naprawdę *(66 zn)*
- Tarcza — sprawdza ryzykowne sformułowania, zanim je wyślesz *(59 zn)*

CTA: Wybierz plan → /login (plan wybierasz w aplikacji po
zalogowaniu — ADR-023)

### Growth — {cena.growth} zł
Dla kogo: Dla ciebie, jeśli budujesz zespół i chcesz widzieć, jak
radzi sobie każda z twoich osób. *(88 zn)*

Wszystko ze Startera, a do tego:
- Puls zespołu — widzisz sygnały ryzyka odejścia i dostajesz zdanie otwierające rozmowę *(85 zn)*
- Widzisz całe drzewo struktury swojego zespołu *(45 zn)*

CTA: Wybierz plan → /login (ADR-023)

### Pro — {cena.pro} zł
Dla kogo: Dla ciebie, jeśli prowadzisz dużą strukturę i część pracy
chcesz przekazać innym. *(81 zn)*

Wszystko z Growth, a do tego:
- Ranking — widzisz swoje miejsce na tle pozostałych osób *(55 zn)*
- Klucze API i webhooki — łączysz Catherly z własnymi narzędziami *(63 zn)*
- Zniesione limity kontaktów, zespołu, postów i sesji treningowych *(64 zn)*
- Czysty eksport — twoje materiały bez sygnatury polecającej *(58 zn)*

CTA: Wybierz plan → /login (ADR-023)

## 4. Pełna tabela porównawcza

Wiersze limitów (Z1 — wyłącznie egzekwowane w kodzie; panel
2026-08-09): Kontakty 50/200/bez limitu · Zespół 10/50/bez limitu ·
Posty miesięcznie 20/100/bez limitu · Sesje Sali Treningowej
miesięcznie 5/30/bez limitu. Wiersze bramek: Puls zespołu i drzewo
struktury — Growth; Ranking, klucze API i webhooki — Pro.
Kalendarz — w każdym planie. Wykluczone (decyzja właściciela +
panel F1–F3): strony www (limit nieegzekwowany), PDF (generator
martwy), przestrzeń na pliki (Storage martwy), wywołania AI (klucz
pusty), platformy social (zgody platform) → rejestr warunków powrotu.

## 5. FAQ — pytania o płatność

**P1:** W jakiej walucie zapłacę? *(25 zn)*
**O1:** Ceny na tej stronie są w złotych. Każdy plan ma też cenę
w euro — walutę widzisz przed płatnością. *(98 zn)*

**P2:** A jeśli plan przestanie mi pasować? *(35 zn)*
**O2:** Wybierasz plan i zmieniasz go kiedy chcesz. *(43 zn)*

**P3:** A jeśli uznam, że to nie dla mnie? *(34 zn)*
**O3:** Rezygnujesz kiedy chcesz. Nie musisz podawać powodu. *(52 zn)*

**P4:** Co z moimi kontaktami, kiedy zrezygnuję? *(40 zn)*
**O4:** Eksportujesz kontakty do vCard, pobierasz CSV z rejestrem —
wszystko jest twoje. *(80 zn)*

Pytanie o fakturę: MILCZENIE (Z2 rozstrzygnięte — warunek powrotu:
testowy zakup z otrzymaną fakturą; rejestr warunków powrotu).

## 6. Potwierdzenia pod cennikiem

- Rezygnacja w każdej chwili *(26 zn)*
- Eksport danych zawsze: vCard i CSV *(34 zn)*
- Dane przechowywane w UE *(23 zn — Z4: region eu-central-1 + fra1)*

## 7. Zamknięcie

Wybierz plan i sprawdź, jak działa Catherly w twojej codziennej
pracy. Niczym się nie wiążesz — rezygnujesz kiedy chcesz. *(121 zn)*

---

## „Cennik w skrócie" — strona główna (STRATEGIA pkt 23)

Trzy plany z ceną ({cena.starter}/{cena.growth}/{cena.pro} zł),
zdanie różnicy:
Wszystkie plany prowadzą twoje kontakty i wyniki — Growth dodaje
do tego widok całego zespołu. *(94 zn)*
Link: Zobacz pełny cennik *(19 zn)* → /cennik
