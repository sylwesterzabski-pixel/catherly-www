# ADR-012 — Waluty, ceny brutto i prawo konsumenckie

Pełny tekst decyzji: PLAN.md, sekcja 14.

## Kontekst
Strona startuje w trzech językach; odbiorczyni niemiecka nie zapłaci
w złotówkach. Odbiorczyni to najczęściej konsumentka lub drobna
działalność bez odliczenia VAT.

## Decyzja
Ceny per język: PLN dla wersji pl, EUR dla wersji en i de — oba cenniki
prowadzone w Stripe (multi-currency), skąd build je pobiera. Wszystkie
ceny prezentowane BRUTTO. Regulamin zawiera 14-dniowe prawo odstąpienia
od usługi cyfrowej (z mechanizmem zgody na rozpoczęcie świadczenia przed
upływem terminu). Każda przyszła promocja pokazuje najniższą cenę z 30 dni
(Omnibus). Faktury VAT dostępne w ścieżce zakupu.

## Uwaga formalna
Niniejszy ADR jawnie UZUPEŁNIA pkt 32 strategii („ceny w PLN z groszami"):
PLN pozostaje dla wersji polskiej, EUR obowiązuje dla en/de. To jest
przewidziany w hierarchii przypadek, w którym ADR stanowi inaczej niż
litera strategii.

## Konsekwencje
Snapshot Stripe obejmuje obie waluty; bramka cennika porównuje obie.
Dokumenty prawne (regulamin, cennik-FAQ) piszą się z uwzględnieniem
powyższego od pierwszej wersji, nie jako poprawka.

## Data
2026-08-06.
