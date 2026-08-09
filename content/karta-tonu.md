# Karta tonu głosu — catherly.com

**Status: PROJEKT — do akceptu właściciela (Faza 2, DECYZJA 1).**

Źródła nadrzędne: ADR-013 (ciepła jakość), STRATEGIA pkt 3 (nic, co
odpycha), 17–19 (dzień odbiorczyni, definicja), 24 (obawy), PLAN.md 3.2
(zakazy agenta treści). Karta jest narzędziem roboczym: panel oceny
wariantów (Etap B) sądzi według niej, nie według gustu. Sprzeczność
karty z ADR-em = błąd karty.

---

## 1. Do kogo mówimy

Kobieta prowadząca własną sprzedaż bezpośrednią. Czyta z telefonu,
między zadaniami dnia — rano plan, w ciągu dnia kontakty i materiały,
wieczorem podsumowanie. Zna swoją pracę lepiej niż my; nie potrzebuje
tłumaczenia, na czym polega sprzedaż — potrzebuje, żeby ktoś ogarnął
jej narzędzia. Przychodzi z konkretnymi obawami (czy to trudne, co
z moimi kontaktami, co gdy zrezygnuję) i z doświadczeniem stron, które
obiecują wszystko.

## 2. Wektor emocjonalny

**„Ktoś się postarał dla ciebie."** Troska wyrażona jakością wykonania —
nie status, nie selekcja, nie ekskluzywność. Perfekcja ma zapraszać,
nie onieśmielać. Reakcja graniczna z ADR-013 działa też dla tekstu:
„ale elegancko" = za chłodno, odpada; „słodkie" = za infantylnie, odpada.

## 3. Głos: koleżanka, która zna się na rzeczy

- Mówimy o **jej dniu**, nie o naszej technologii. Zdanie zaczyna się
  od tego, co ona robi — nie od tego, co system ma.
- **Konkret zamiast przymiotnika.** Zamiast „potężny generator treści" —
  co dokładnie powstaje i ile to trwa. Przymiotnik, który nie przeżyje
  pytania „to znaczy co?", wypada.
- **Spokój zamiast pilności.** Zero poganiania. Ona decyduje, kiedy
  jest gotowa — strona ma czekać gościnnie, nie naganiać.
- **Uczciwość w obie strony.** Mówimy też, czego produkt nie robi
  (STRATEGIA 28: „czego nie robi" to element opisu funkcji). Granice
  budują zaufanie mocniej niż obietnice.

## 4. Zasady zdaniowe (egzekwowalne)

1. Zdania krótkie, jednowątkowe. Na telefonie akapit ma 2–3 zdania.
2. Czasowniki zamiast rzeczowników odsłownych: „zaplanujesz tydzień",
   nie „planowanie tygodnia jest możliwe".
3. Forma bezpośrednia **„ty" małą literą** — bliskość bez listownej
   sztywności. Nigdy „Państwo", nigdy bezosobowo tam, gdzie mówimy
   do niej.
4. Każda liczba pochodzi z `content/facts.json` — bez wyjątku (bramka).
5. Superlatyw bez pokrycia w faktach nie istnieje. „Najlepszy",
   „jedyny", „niezastąpiony" — wypadają zawsze.
6. **Wykrzyknik nie występuje** w tekście strony.
7. Pytania retoryczne straszące nie występują („Tracisz klientki?") —
   pkt 18: rozpoznanie, nie wyrzut i nie strach.
8. Obietnica ma pokrycie w inwentarzu funkcji aplikacji — tekst
   o funkcji powstaje z tabeli obietnic, nie z wyobraźni.

## 5. Słownik zakazany i zamienniki (lista otwarta, rozszerzana w fazie)

| Zakazane | Dlaczego | Mówimy |
|---|---|---|
| ekskluzywny, premium, luksusowy | słownictwo statusowe (ADR-013) | konkret korzyści |
| innowacyjny, rewolucyjny, nowoczesny | puste przymiotniki | co robi i dla kogo |
| lead, follow-up, content, deadline | anglicyzmy w PL (ADR-013) | kontakt, kolejna rozmowa, treści, termin |
| „już dziś!", „nie czekaj", „tylko teraz" | fałszywa pilność (STRATEGIA 3) | zdanie o braku zobowiązania |
| zdrobnienia („chwilka", „ogarniesz w try miga") | infantylizacja (ADR-013) | dorosły konkret |
| „wszystko, czego potrzebujesz" | obietnica-worek | lista tego, co naprawdę jest |

## 6. Przykłady kalibracyjne — ilustracje tonu, NIE kandydaci treści

- ZA CHŁODNO: „Zaawansowana platforma do zarządzania sprzedażą
  bezpośrednią klasy enterprise."
- ZA SŁODKO: „Twój magiczny pomocnik, który zrobi wszystko za Ciebie!"
- W TONIE: „Rano widzisz, do kogo się odezwać. Wieczorem — co z tego
  wyszło. Catherly prowadzi kontakty, treści, zespół i rozliczenia
  w jednym miejscu."

## 7. Adaptacje kulturowe (trzy adaptacje, nie trzy tłumaczenia)

**PL (baza):** wszystkie zasady powyżej wprost.

**EN:** rzeczowość i rytm krótszych zdań; słownictwo branży direct
selling bez korporacyjnego żargonu (no „empowerment", no „game-changer");
„you" naturalne, ciepło budują konkrety, nie wykrzykniki.

**DE:** ciężar na bezpieczeństwo danych — fakty z mechanizmem i miejscem
(gdzie leżą dane, kto ma dostęp, jak się je zabiera), nie zapewnienia
(„Ihre Daten sind sicher" bez treści = antywzorzec). Forma **„du"** —
uzasadnienie: społeczność sprzedaży bezpośredniej w DACH mówi sobie
per „du", a marka-koleżanka na „Sie" przeczy własnemu głosowi; „du"
pisane małą literą, współcześnie. Mniej lekkości niż w PL — ciepło
przez rzetelność, nie swobodę.

## 8. Test odbioru tekstu (analog testu 30 sekund)

Przeczytaj fragment na głos. Pytania kontrolne:
1. Czy powiedziałabyś tak znajomej przy kawie? (nie: na konferencji,
   nie: do dziecka),
2. Czy po usunięciu przymiotników zdanie nadal coś mówi?
3. Czy zdanie jest o jej dniu, czy o naszym systemie?
4. Czy cokolwiek tu pogania, straszy albo schlebia?

Dwa „nie" przy 1–3 lub jedno „tak" przy 4 = tekst wraca do poprawki.
Odbiór robi agent inny niż autor (Prawo 2).

## 9. Kryteria panelu oceny wariantów (Etap B — jawne, ważone)

1. Zgodność z sekcjami 2–5 tej karty (dyskwalifikująca),
2. „dzień odbiorczyni vs technologia" — o czym naprawdę jest zdanie,
3. konkret: co czytelniczka wie po przeczytaniu, czego nie wiedziała,
4. dźwięk na głos (rytm, długość, naturalność),
5. odporność na adaptację EN/DE (czy pomysł przeżyje przeniesienie).
