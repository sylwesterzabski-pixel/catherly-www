import { test, expect } from "@playwright/test";

import { rolaHex, rolaRgb } from "./pomoc/role";

/**
 * Bramka: STRAŻNIK SAMEGO ODCZYTU RÓL (`WWW/056` pkt 2, ADR-043).
 *
 * `e2e/pomoc/role.ts` jest odtąd nośny dla pięciu asercji w czterech plikach
 * spec. Gdyby zaczął zwracać wartość skądinąd — albo cicho oddawał pustkę —
 * tamte testy porównywałyby stronę z niewiadomą i mogłyby świecić na zielono
 * nie mierząc niczego. Ten plik pilnuje samego narzędzia.
 *
 * KONTROLA POZYTYWNA jest tu całą treścią, nie ozdobą: „helper nic nie
 * zwrócił" i „helper zwrócił poprawnie" muszą dać RÓŻNE wyniki w tym samym
 * przebiegu, inaczej zero jest zerem narzędzia, a nie wynikiem.
 *
 * Testy są czysto obliczeniowe — nie dotykają przeglądarki. Stoją w `e2e/`,
 * bo tam mieszka rzecz, której pilnują; koszt to jeden przebieg bez `page`.
 */

test("odczyt ról: wartość dosłowna, odwołanie i konwersja na zapis rgb", () => {
  /* 1. Wartość dosłowna — rola zapisana wprost jako #rrggbb. */
  expect(rolaHex("akcent"), "rola zapisana wprost").toMatch(/^#[0-9a-f]{6}$/);

  /* 2. ODWOŁANIE ROZWINIĘTE. `tlo-strony` ma w tokenach postać
     `{kolor.tlo}`, nie barwę. Bez rozwinięcia helper oddałby klamrę,
     a asercja porównałaby `rgb(...)` z `{kolor.tlo}` — czerwień
     z komunikatem wskazującym na stronę zamiast na helper. */
  expect(rolaHex("tlo-strony"), "odwołanie {kolor.tlo} rozwinięte").toMatch(
    /^#[0-9a-f]{6}$/,
  );

  /* 3. Konwersja na zapis, jakim mówi `getComputedStyle`. */
  expect(rolaRgb("akcent")).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);

  /* 4. ZGODNOŚĆ OBU POSTACI — liczona tu, nie przepisana. */
  const hex = rolaHex("interakcja").slice(1);
  const zSkladni = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  expect(rolaRgb("interakcja")).toBe(
    `rgb(${zSkladni[0]}, ${zSkladni[1]}, ${zSkladni[2]})`,
  );
});

test("odczyt ról: rola nieistniejąca RZUCA, a nie zwraca pustkę", () => {
  /* Gdyby helper oddawał `undefined`, asercje w tamtych czterech plikach
     porównywałyby barwę elementu z „undefined" — czerwień wprawdzie by
     padła, ale wskazywałaby element zamiast literówki w nazwie roli.
     Gorszy przypadek: rola usunięta z tokenów przechodzi wtedy jako
     zwykła niezgodność barwy i nikt nie widzi, że zniknęła. */
  expect(() => rolaHex("rola-ktorej-nie-ma")).toThrow(/brak roli/);

  /* KONTROLA POZYTYWNA do powyższego zera: ta sama funkcja na roli
     ISTNIEJĄCEJ NIE rzuca. Bez tego „rzuciło" mogłoby znaczyć „rzuca
     zawsze", czyli że helper jest zepsuty, a nie czujny. */
  expect(() => rolaHex("fokus")).not.toThrow();
});
