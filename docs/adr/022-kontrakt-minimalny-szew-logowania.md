# ADR-022 — Kontrakt tokenów w zakresie minimalnym: szew logowania

## Kontekst
Faza 1 przewidywała artefakt pełnego kontraktu strona↔aplikacja
(ADR-004). Odczyt design systemu aplikacji (właściciel, 2026-08-09)
wykazał stan faktyczny: system rozproszony — tokeny w konfiguracji
Tailwind plus arkusz 751 linii, bez eksportu i mechanizmu
synchronizacji; brak jednego koloru marki (akcent motywu jasnego
`#1D6CC4`, ciemnego `#FF8C42`; deltaE do terakoty strony odpowiednio
106,4 i 22,9). Pełny kontrakt w tym stanie byłby fikcją: rozjechałby
się bez detekcji, a zieleń bramki poświadczałaby nieprawdę.

Realny punkt styku wizualnego istnieje jeden: ekrany logowania
(wartości na sztywno, poza motywami) — tło `#F7F3EA`, zielenie
`#3E6630` / `#243E1A`. Tło logowania jest kremem bliskim tłu strony
`#eee6e0` (deltaE CIE76 = 4,7).

## Decyzja
Kontrakt zostaje ZAWĘŻONY DO MINIMUM: wyłącznie szew przejścia
strona → aplikacja, zapisany w `design/kontrakt-aplikacji.json`.
Bramka kontraktu sprawdza dwie rzeczy:
1. tło strony w `design/tokens.json` jest równe odniesieniu
   zapisanemu w kontrakcie — zmiana palety strony bez świadomej
   aktualizacji kontraktu = czerwień,
2. deltaE CIE76 (tło strony ↔ tło logowania) ≤ **5,0** — próg
   zakotwiczony wewnętrznie: równy (z zaokrągleniem) odległości
   tło↔neutralna-50 (4,9), największej relacji tło↔powierzchnia
   akceptowanej wewnątrz samej strony. Szew nie może być bardziej
   odczuwalny niż wewnętrzne przejścia strony.

Trzy warunki uczciwości zieleni (akcept właściciela 2026-08-09):
- zawężenie zakresu zapisane jawnie tym ADR-em, nie cichym wyjątkiem,
- zielony komunikat bramki przy KAŻDYM biegu nazywa zakres minimalny,
  odroczenie pełnego kontraktu i brak detekcji zmian aplikacji,
- jednostronność detekcji nazwana wprost: bramka chroni szew przed
  dryfem palety strony; dryf aplikacji wykrywa tylko ponowny odczyt
  właściciela (obowiązek zapisany w artefakcie).

Niniejszy ADR DOPRECYZOWUJE ADR-004, nie uchyla go: pełny kontrakt
wraca osobnym ADR-em, gdy aplikacja zyska eksport tokenów i mechanizm
synchronizacji.

## Konsekwencje
- Zieleń bramki kontraktu oznacza wyłącznie: szew logowania chroniony
  przed dryfem palety strony w zadeklarowanym progu.
- Zmiana ekranów logowania po stronie aplikacji wymaga ręcznej
  aktualizacji `kontrakt-aplikacji.json` przez właściciela.
- Publikacja strony przestaje być zakładnikiem refaktoringu design
  systemu aplikacji (proporcjonalność: w szwie nie ma nic
  nieodwracalnego, ADR-018 nie wymaga blokady).

## Data
2026-08-09 (odczyt DS i decyzja właściciela; ocena projektanta bramki
i akcept właściciela w tej samej sesji).
