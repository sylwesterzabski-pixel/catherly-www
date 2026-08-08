# ADR-018 — Prymat nieodwracalnego

> **UWAGA: Ten ADR jest NADRZĘDNY wobec wszystkich pozostałych ADR-ów
> (001–017). W razie sprzeczności z jakąkolwiek inną decyzją wygrywa
> ADR-018.**

Pełny tekst decyzji: PLAN.md, sekcja 15.

## Status
Przyjęty. Obowiązuje w **obu repozytoriach**: `catherly-www`
i `catherly-app`.

## Kontekst
System ma komplet bramek jakości: wydajność, dostępność, tokeny, parytet
językowy, prawdziwość liczb. Wszystkie dotyczą rzeczy **odwracalnych** —
wolna strona da się przyspieszyć, brzydka sekcja przeprojektować, zły
tekst przepisać. Nie było natomiast bramki dla rzeczy, których po
wypuszczeniu produktu cofnąć się nie da: utraconych danych klientki,
pobranych pieniędzy bez usługi, ujawnionych danych osobowych, złamanej
obietnicy. Bez tej decyzji perfekcjonizm rozkłada się równomiernie na
wszystko i przestaje odróżniać rzeczy ważne od poprawialnych.

## Decyzja

1. **Cztery obszary nieodwracalne** — dane, pieniądze, bezpieczeństwo,
   obietnice — mają pierwszeństwo przed wyglądem, zakresem i terminem.
   W konflikcie zawsze przegrywa termin, nigdy nieodwracalne.

2. **Brak dowodu = brak zabezpieczenia.** Status NIESPRAWDZONE liczy się
   dokładnie jak NIESPEŁNIONE. Czytanie kodu nie jest dowodem; dowodem
   jest wykonany test, zwrócone żądanie, log, zrzut wyniku.

3. **Zakaz samo-odbioru rozszerzony.** W tych czterech obszarach żaden
   agent nie potwierdza własnej pracy. Dowód musi pochodzić z próby
   złamania mechanizmu, nie z opisu jego działania.

4. **Audyt jako bramka wdrożenia.** Wdrożenie produkcyjne wymaga
   aktualnego raportu audytu nieodwracalnych dla audytowanego commita.
   Raport z choćby jednym statusem NIESPEŁNIONE lub NIESPRAWDZONE
   blokuje wdrożenie — chyba że istnieje zapisana decyzja o przyjęciu
   ryzyka z podpisem właściciela produktu i terminem powrotu.

5. **Cykliczność.** Audyt powtarza się przed każdym wdrożeniem
   produkcyjnym zmieniającym ścieżkę płatności, model danych,
   uwierzytelnianie lub treść obietnic. Poza tym: nie rzadziej niż
   raz na kwartał.

6. **Sprzężenie strona↔aplikacja.** Obietnica na stronie bez pokrycia
   w aplikacji jest naruszeniem tego ADR-a po stronie **strony**, nie
   aplikacji: usuwa się obietnicę, nie zapowiada się funkcji.

## Konsekwencje
- `docs/audyt/` staje się artefaktem obowiązkowym w obu repozytoriach.
- Bramka „Nieodwracalne" wchodzi do tabeli sekcji 5 PLAN.md.
- Sekcja „Prymat nieodwracalnego" wchodzi do `CLAUDE.md` obu repozytoriów.
- Agent-adwersarz otrzymuje ADR-018 jako podstawę odrzucenia PR-a, który
  dotyka czterech obszarów bez dowodu.
- Koszt: audyt zajmuje czas przed każdym większym wdrożeniem. To jest
  cena świadoma i zaakceptowana.

## Warunek rewizji
Gdy pojawi się druga osoba z prawem wdrożenia, punkt 4 wymaga
rozszerzenia o rozdzielenie ról: kto audytuje, nie wdraża.

## Data
2026-08-07.
