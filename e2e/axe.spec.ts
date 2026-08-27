import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Bramka: Dostępność — axe: zero błędów (ADR-002; PLAN.md sekcja 5).
 * Skan każdej istniejącej trasy; nowe trasy dopisuje się do listy
 * w ramach Definition of Done sekcji (PLAN.md 4.2).
 */
const TRASY = [
  "/nie-znaleziono",
  "/en/nie-znaleziono",
  "/de/nie-znaleziono",
  "/",
  "/en",
  "/de",
  // B1(a) — pl bez prefiksu, /en, /de. Faza 4, Etap D: /funkcje
  // i /dla-kogo NIE są już placeholderami (StronaWBudowie) — to
  // strony właściwe, skanowane tym samym wpisem.
  "/funkcje",
  "/cennik",
  "/dla-kogo",
  "/login",
  "/en/funkcje",
  "/en/cennik",
  "/en/dla-kogo",
  "/en/login",
  "/de/funkcje",
  "/de/cennik",
  "/de/dla-kogo",
  "/de/login",
  // Faza 4, Etap B — wzorcowa podstrona funkcji (K12).
  "/funkcje/pozyskiwanie",
  "/en/funkcje/pozyskiwanie",
  "/de/funkcje/pozyskiwanie",
  // Faza 4, Etap C — pozostałe podstrony funkcji (szablon K12).
  "/funkcje/tresci",
  "/en/funkcje/tresci",
  "/de/funkcje/tresci",
  "/funkcje/zespol",
  "/en/funkcje/zespol",
  "/de/funkcje/zespol",
  "/funkcje/wyniki",
  "/en/funkcje/wyniki",
  "/de/funkcje/wyniki",
];

for (const trasa of TRASY) {
  test(`axe: zero błędów na ${trasa}`, async ({ page }) => {
    await page.goto(trasa);

    /* CZEKANIE NA USTALENIE ANIMACJI WEJŚCIA (2.2, ADR-046).
       Warstwa ruchu (WWW/047) daje elementom hero wejście z blaknięciem
       — `animation: ruch-wejscie 550ms both`, z opóźnieniami do 280 ms,
       więc ostatni element kończy dopiero po 830 ms. `both` trzyma stan
       POCZĄTKOWY także PRZED opóźnieniem, czyli tekst ma wtedy niską
       przezroczystość.

       axe skanował do tej pory od razu po `goto` i mierzył WYBLAKŁE
       barwy: zgłosił 99 naruszeń kontrastu z wartościami w rodzaju
       „#3b3c3a na #070806, 1,8:1" — a rola tekstu drugorzędnego ma
       #c5c6c5 i po ustaleniu daje 10,79:1. To był pomiar KLATKI
       ANIMACJI, nie stanu, który ktokolwiek czyta.

       Wada spała, dopóki hero miało czworo dzieci (ostatnie kończyło
       o 760 ms). Piąte — mockup z 2.2 — przesunęło koniec o 70 ms
       i axe zaczął trafiać w blaknięcie.

       ⚠ TO NIE JEST ZŁAGODZENIE BRAMKI. Czekamy na stan USTALONY,
       czyli ten, który widzi czytający; gdyby kontrast po ustaleniu był
       zły, axe nadal go zgłosi. Wzorzec ma zresztą to samo wejście
       (zmierzone: przezroczystość 0→1 w 334,9 ms) — usunięcie naszego
       byłoby odejściem od wzorca w reakcji na wadę POMIARU.

       `getAnimations` czyta stan faktyczny, nie stały czas: przy
       `prefers-reduced-motion` animacji nie ma i czekanie kończy się
       natychmiast.

       ⚠ ANIMACJE NIESKOŃCZONE MUSZĄ BYĆ ODFILTROWANE, i to nie jest
       drobiazg — pierwsza wersja tego czekania ZAWIESIŁA przebieg.
       Serwis ma animacje pętlące (oddech poświaty, pasy przewijane),
       a ich `finished` nie spełni się nigdy. Bierzemy więc wyłącznie
       te o SKOŃCZONEJ liczbie powtórzeń; do tego limit czasu, żeby
       animacja o bardzo długim czasie trwania nie zamieniła bramki
       w zawieszenie. */
    await page.evaluate(async () => {
      const skonczone = document
        .getAnimations()
        .filter((a) => {
          const czas = a.effect?.getComputedTiming();
          return Number.isFinite(czas?.iterations ?? Infinity) &&
            Number.isFinite(czas?.endTime ?? Infinity);
        })
        .map((a) => a.finished.catch(() => undefined));
      await Promise.race([
        Promise.all(skonczone),
        new Promise((r) => setTimeout(r, 3000)),
      ]);
    });

    const wyniki = await new AxeBuilder({ page }).analyze();
    expect(wyniki.violations).toEqual([]);
  });
}
