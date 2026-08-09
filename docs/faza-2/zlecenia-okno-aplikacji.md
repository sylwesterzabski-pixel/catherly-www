# Zlecenia do okna aplikacji (blokują zamknięcie Fazy 2)

Status: OTWARTE. Warunek DECYZJI 4: tabela porównawcza /cennik bez
limitów i FAQ bez faktury obowiązują TYLKO do powrotu Z1/Z2.

---

## Z1 — tekst do wklejenia

Inwentarz funkcji (sekcja 2) podaje: „Bramka planu (GROWTH/PRO) —
11 funkcji", ale nie wymienia listy. Do tabeli porównawczej na
/cennik potrzebuję:

1. Pełnej listy wszystkich funkcji z bramką planu, z podziałem:
   które wymagają GROWTH, a które PRO. Dla każdej: nazwa funkcji,
   plik/miejsce bramki w kodzie (żeby dało się zweryfikować).
2. Wszystkich limitów LICZBOWYCH per plan, jeśli istnieją w kodzie
   (np. liczba kontaktów, postów, osób w zespole, formularzy).
   Interesują mnie wyłącznie limity egzekwowane w kodzie — nie
   zapisy z seed/cennika. Jeśli limitu nie ma w kodzie, napisz
   wprost „bez limitu w kodzie".
3. Rozstrzygnięcia, czym plan PRO różni się od GROWTH w kodzie
   (jakie funkcje/limity są bramkowane wyłącznie na PRO). Jeśli
   niczym — napisz to wprost, bo wtedy karta planu Pro na stronie
   nie ma czym się różnić i to jest decyzja produktowa, nie treściowa.

Formatuj jak inwentarz: tabela funkcja → bramka → miejsce w kodzie.
Zero szacunków — tylko to, co widać w kodzie.

---

## Z2 — tekst do wklejenia

Aplikacja nie generuje PDF (brak puppeteer), więc strona milczy
o fakturach. Do FAQ na /cennik potrzebuję rozstrzygnięcia:

1. Czy konfiguracja Stripe (Checkout/Billing) ma włączone
   wystawianie faktur lub rachunków przez Stripe (Customer Portal,
   invoice_creation, wysyłka mailem przez Stripe)? Sprawdź
   w konfiguracji konta/kodu, nie w dokumentacji Stripe.
2. Jeśli tak — co dokładnie dostaje klientka po płatności (faktura
   VAT z NIP? paragon/receipt? tylko potwierdzenie mailowe?)
   i czy działa to w trybie testowym end-to-end (dowód: wykonany
   testowy zakup i otrzymany dokument, nie przekonanie).
3. Jeśli nie — czy planujemy włączyć invoice_creation przed premierą?
   To decyzja właściciela; strona do tego czasu o fakturach milczy.

Wynik wraca jako: DZIAŁA (z dowodem) / NIE DZIAŁA / DECYZJA.

---

## Powiązane, zgłoszone wcześniej (nie blokują /cennik po stronie www)

- **Z3 — rozjazd kalendarza**: prisma/seed.ts:86 wymienia „Integracja
  kalendarza" jako wyróżnik Growth, a kalendarz nie ma bramki i działa
  na Starterze. Strona już stosuje regułę twardą (kalendarz w każdym
  planie); kod/seed do wyrównania po stronie aplikacji.
- **Z4 — lokalizacja danych + szyfrowanie**: do potwierdzeń pod
  cennikiem, sekcji obaw i /bezpieczenstwo. Właściciel zleca osobno.
