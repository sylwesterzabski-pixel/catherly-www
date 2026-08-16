import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { test, expect, type Locator, type Page } from "@playwright/test";

import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";

/**
 * Zrzuty produktu z dostawy Z6 — strażnik osadzenia w filarach
 * strony głównej (polecenie odbioru PNG, pkt 4 i 6).
 *
 * Osadzenie ma dziś przełącznik: design/pipeline-obrazow.json →
 * osadzenieNaGlownej.wlaczone. Ten sam plik czyta markup
 * (src/app/[locale]/page.tsx przez src/obrazy/zrzuty.ts) i ten plik
 * czyta ten spec — jedno źródło, więc markup i asercje nie mogą się
 * rozjechać. Wyłączenie NIE jest tu ciszą: zmienia PYTANIE, którego
 * pilnujemy, i nie zmniejsza liczby pilnowanych rzeczy.
 *
 *  - stan WYŁĄCZONY (dziś): dostawa ma być gotowa do włączenia
 *    (komplet wariantów na dysku, PNG bajt w bajt jak w dostawie,
 *    alty w trzech językach), a „/" ma być czysta — ani jednego
 *    odwołania do zrzutów, bo to właśnie ich bajty kosztowały
 *    +150 ms LCP i były powodem wyłączenia.
 *  - stan WŁĄCZONY: pełny kontrakt osadzenia (poniżej).
 *
 * Kontrakt osadzenia jest rozbity na osobne asercje, bo „usunięcie
 * obrazu z filaru" ma więcej niż jedną postać i każda musi dać
 * czerwień osobno:
 *
 *  - znika element <img>            → brak obrazu w ogóle,
 *  - <img> zostaje, ale plik nie    → martwy kadr; DOM wygląda
 *    (zła ścieżka, brak wariantu)     poprawnie, strona pokazuje
 *                                     ikonę zepsutego obrazu,
 *  - znika alt                      → obraz istnieje, ale dla
 *                                     czytnika ekranu go nie ma,
 *  - wraca aria-hidden              → to samo, drogą okrężną (W2),
 *  - znikają <source>               → pipeline AVIF/WebP przestaje
 *                                     mieć znaczenie, leci PNG,
 *  - znika loading/fetchPriority    → obraz zaczyna konkurować
 *                                     o pasmo z treścią (pkt 5),
 *  - znika width/height             → wraca skok układu (CLS, W3).
 *
 * Dlatego asercja NIE jest podciągiem globalnego HTML-a: każda leci
 * na konkretny <img> w konkretnej sekcji filaru (ADR-018 — strażnik
 * na podciągu artefaktu globalnego wygasa cicho).
 */
const PRZYPADKI = [
  { adres: "/", jezyk: "pl", komunikaty: pl },
  { adres: "/en", jezyk: "en", komunikaty: en },
  { adres: "/de", jezyk: "de", komunikaty: de },
] as const;

const KLUCZE_FILAROW = ["filar1", "filar2", "filar3", "filar4"] as const;

const KORZEN = join(__dirname, "..");

const REJESTR = JSON.parse(
  readFileSync(join(KORZEN, "design", "pipeline-obrazow.json"), "utf8"),
) as {
  zrodlo: string;
  sumy: string;
  wyjscie: string;
  szerokosci: number[];
  formaty: string[];
  zapasowy: string;
  szerokoscZrodla: number;
  wysokoscZrodla: number;
  osadzenieNaGlownej: { wlaczone: boolean; powod: string };
  obrazy: { filar: string; baza: string; plik: string }[];
};

const OSADZONE = REJESTR.osadzenieNaGlownej.wlaczone;

/** Alt w HTML jest ESCAPOWANY (apostrof w „today's" → &#x27;), więc
 *  porównujemy z tym, co renderer faktycznie wypisuje, a nie z surowym
 *  łańcuchem z messages. */
const naHtml = (tekst: string) =>
  tekst
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

const wpisFilaru = (klucz: string) => {
  const wpis = REJESTR.obrazy.find((o) => o.filar === klucz);
  if (!wpis) throw new Error(`Rejestr nie zna filaru ${klucz}`);
  return wpis;
};

const suma = (sciezka: string) =>
  createHash("sha256").update(readFileSync(sciezka)).digest("hex");

/** Sekcja filaru po jego H2 (jak w filary.spec — jeden wzorzec). */
const sekcjaFilaru = (page: Page, naglowek: string): Locator =>
  page.locator("section", {
    has: page.getByRole("heading", { name: naglowek, exact: true }),
  });

/* ------------------------------------------------------------------
   GOTOWOŚĆ DOSTAWY — sprawdzana w OBU stanach przełącznika.
   Bez tego wyłączenie osadzenia zamieniłoby cały pipeline w martwy
   kod: pliki mogłyby zniknąć albo się rozjechać ze źródłem i nikt
   by tego nie zauważył aż do dnia, w którym ktoś przestawi flagę.
------------------------------------------------------------------ */

test("dostawa Z6: komplet wygenerowanych wariantów na dysku", () => {
  const katalog = join(KORZEN, REJESTR.wyjscie);
  const oczekiwane: string[] = [];
  for (const { baza } of REJESTR.obrazy) {
    for (const format of REJESTR.formaty) {
      for (const szerokosc of REJESTR.szerokosci) {
        oczekiwane.push(`${baza}-${szerokosc}.${format}`);
      }
    }
    oczekiwane.push(`${baza}.${REJESTR.zapasowy}`);
  }
  for (const plik of oczekiwane) {
    const sciezka = join(katalog, plik);
    expect(existsSync(sciezka), `brak wariantu ${plik}`).toBe(true);
    expect(statSync(sciezka).size, `pusty plik ${plik}`).toBeGreaterThan(0);
  }
  expect(oczekiwane.length).toBe(
    REJESTR.obrazy.length *
      (REJESTR.formaty.length * REJESTR.szerokosci.length + 1),
  );
});

test("dostawa Z6: zapasowy PNG bajt w bajt jak w dostawie (sumy SHA-256)", () => {
  const sumy = new Map(
    readFileSync(join(KORZEN, REJESTR.zrodlo, REJESTR.sumy), "utf8")
      .split("\n")
      .filter(Boolean)
      .map((linia) => {
        const [hasz, plik] = linia.trim().split(/\s+/);
        return [plik, hasz] as const;
      }),
  );
  for (const { baza, plik } of REJESTR.obrazy) {
    const oczekiwana = sumy.get(plik);
    expect(oczekiwana, `dostawa nie podaje sumy dla ${plik}`).toBeTruthy();
    // Publikujemy DOKŁADNIE te bajty, które przeszły weryfikację przy
    // odbiorze — nie „wizualnie taki sam" plik po jakiejkolwiek
    // obróbce (instrukcja przekazania: zero retuszu, ADR-011).
    expect(
      suma(join(KORZEN, REJESTR.wyjscie, `${baza}.${REJESTR.zapasowy}`)),
      `${baza}: zapasowy PNG rozjechał się ze źródłem dostawy`,
    ).toBe(oczekiwana);
    expect(
      suma(join(KORZEN, REJESTR.zrodlo, plik)),
      `${plik}: plik źródłowy w repo rozjechał się z metryczką dostawy`,
    ).toBe(oczekiwana);
  }
});

test("dostawa Z6: alt dla każdego filaru w trzech językach, każdy inny", () => {
  for (const { komunikaty, jezyk } of PRZYPADKI) {
    const widziane = new Set<string>();
    for (const klucz of KLUCZE_FILAROW) {
      const alt = komunikaty.ObrazyFilarow[klucz];
      expect(alt?.trim().length, `${jezyk}/${klucz}: pusty alt`).toBeGreaterThan(
        0,
      );
      // Cztery kadry pokazują cztery różne ekrany. Ten sam opis pod
      // dwoma z nich znaczy, że któryś jest nieprawdziwy.
      expect(widziane.has(alt), `${jezyk}: alt powtórzony (${klucz})`).toBe(
        false,
      );
      widziane.add(alt);
    }
  }
});

/* ------------------------------------------------------------------
   STAN WYŁĄCZONY — „/" bez zrzutów, ramka jak przed dostawą.
------------------------------------------------------------------ */

if (!OSADZONE) {
  for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
    test(`osadzenie wyłączone (${jezyk}): filar ma pustą ramkę, bez <img>`, async ({
      page,
    }) => {
      await page.goto(adres);
      for (const klucz of KLUCZE_FILAROW) {
        const sekcja = sekcjaFilaru(page, komunikaty.Filary[klucz].naglowek);
        await expect(
          sekcja.locator("img"),
          `${klucz}: zrzut ma być wyłączony`,
        ).toHaveCount(0);
        // Ramka zostaje (rezerwa układu i zebra), ale pusty prostokąt
        // nie ma czego ogłaszać czytnikowi ekranu.
        await expect(sekcja.locator("[aria-hidden='true']")).toHaveCount(1);
      }
    });
  }

  test("osadzenie wyłączone: ani jednego odwołania do zrzutów w HTML „/” (to był koszt LCP)", async ({
    request,
  }) => {
    for (const { adres } of PRZYPADKI) {
      const html = await (await request.get(adres)).text();
      // Powodem wyłączenia były POBRANE BAJTY, nie sam znacznik <img>.
      // Gdyby na stronie został choćby <source srcset>, przeglądarka
      // dalej ściągałaby kadry i +150 ms wróciłoby po cichu.
      expect(
        html.includes(`/${REJESTR.wyjscie.replace(/^public\//, "")}/`),
        `${adres}: w HTML została ścieżka do zrzutów`,
      ).toBe(false);
    }
  });
}

/* ------------------------------------------------------------------
   STAN WŁĄCZONY — pełny kontrakt osadzenia.
------------------------------------------------------------------ */

if (OSADZONE) {
  for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
    test(`zrzuty filarów (${jezyk}): każdy filar ma WCZYTANY obraz z altem z messages`, async ({
      page,
    }) => {
      await page.goto(adres);

      for (const klucz of KLUCZE_FILAROW) {
        const sekcja = sekcjaFilaru(page, komunikaty.Filary[klucz].naglowek);
        const obraz = sekcja.locator("img");
        await expect(obraz, `${klucz}: dokładnie jeden obraz`).toHaveCount(1);

        // Alt znak w znak z messages — nie „niepusty", bo pusty łańcuch
        // to legalny alt dekoracji, a te zrzuty są INFORMACYJNE (W2).
        await expect(obraz).toHaveAttribute(
          "alt",
          komunikaty.ObrazyFilarow[klucz],
        );

        // Obraz leniwy, więc najpierw w kadr — inaczej mierzylibyśmy
        // brak wczytania, który jest tu ZAMIERZONY.
        await obraz.scrollIntoViewIfNeeded();
        await expect
          .poll(() => obraz.evaluate((el: HTMLImageElement) => el.naturalWidth), {
            message: `${klucz}: plik obrazu faktycznie się wczytał (nie 404)`,
          })
          .toBeGreaterThan(0);
      }
    });
  }

  test("zrzuty filarów: kontrakt <picture> — AVIF i WebP z pełnym srcset, zapasowy PNG", async ({
    page,
  }) => {
    await page.goto("/");

    for (const klucz of KLUCZE_FILAROW) {
      const { baza } = wpisFilaru(klucz);
      const sekcja = sekcjaFilaru(page, pl.Filary[klucz].naglowek);
      const obrazek = sekcja.locator("picture");
      await expect(obrazek, `${klucz}: <picture>`).toHaveCount(1);

      for (const format of REJESTR.formaty) {
        const zrodlo = obrazek.locator(`source[type="image/${format}"]`);
        await expect(zrodlo, `${klucz}: <source> ${format}`).toHaveCount(1);
        const srcset = await zrodlo.getAttribute("srcset");
        for (const szerokosc of REJESTR.szerokosci) {
          expect(
            srcset,
            `${klucz}/${format}: wariant ${szerokosc}w w srcset`,
          ).toContain(`/${baza}-${szerokosc}.${format} ${szerokosc}w`);
        }
        // Deklaracja szerokości renderowania — bez niej przeglądarka
        // przyjmuje 100vw i pobiera wariant za duży.
        await expect(zrodlo).toHaveAttribute("sizes", /min-width/);
      }

      await expect(sekcja.locator("img")).toHaveAttribute(
        "src",
        `/${REJESTR.wyjscie.replace(/^public\//, "")}/${baza}.${REJESTR.zapasowy}`,
      );
    }
  });

  test("zrzuty filarów: niższy priorytet niż treść + rezerwacja miejsca + brak aria-hidden", async ({
    page,
  }) => {
    await page.goto("/");

    for (const klucz of KLUCZE_FILAROW) {
      const sekcja = sekcjaFilaru(page, pl.Filary[klucz].naglowek);
      const obraz = sekcja.locator("img");

      // Pkt 5 polecenia: obrazy ładują się PÓŹNIEJ niż treść.
      await expect(obraz, `${klucz}: leniwe ładowanie`).toHaveAttribute(
        "loading",
        "lazy",
      );
      await expect(obraz, `${klucz}: niski priorytet pobrania`).toHaveAttribute(
        "fetchpriority",
        "low",
      );
      await expect(obraz, `${klucz}: dekodowanie poza wątkiem`).toHaveAttribute(
        "decoding",
        "async",
      );

      // W3: rezerwacja miejsca z wymiarów REALNYCH plików.
      await expect(obraz, `${klucz}: szerokość źródła`).toHaveAttribute(
        "width",
        String(REJESTR.szerokoscZrodla),
      );
      await expect(obraz, `${klucz}: wysokość źródła`).toHaveAttribute(
        "height",
        String(REJESTR.wysokoscZrodla),
      );

      // W2: zrzut jest informacyjny. Nie tylko sam <img>: aria-hidden
      // na DOWOLNYM przodku (picture, .obraz, układ, sekcja) wycina go
      // z drzewa dostępności tak samo skutecznie.
      await expect(
        obraz.locator("xpath=ancestor-or-self::*[@aria-hidden='true']"),
        `${klucz}: ani obraz, ani żaden jego przodek nie jest aria-hidden`,
      ).toHaveCount(0);
      await expect(
        sekcja.getByRole("img", { name: pl.ObrazyFilarow[klucz], exact: true }),
      ).toHaveCount(1);
    }
  });

  for (const { adres, jezyk, komunikaty } of PRZYPADKI) {
    test(`zrzuty filarów bez JS (${jezyk}): <img> i srcset w surowym HTML`, async ({
      request,
    }) => {
      const odpowiedz = await request.get(adres);
      expect(odpowiedz.status()).toBe(200);
      const html = await odpowiedz.text();

      for (const klucz of KLUCZE_FILAROW) {
        const { baza } = wpisFilaru(klucz);
        // Kotwiczymy na PARZE (plik ↔ alt tego filaru) w jednym
        // fragmencie HTML: samo „gdzieś jest ten alt" przeszłoby też
        // wtedy, gdyby wszystkie cztery filary dostały ten sam kadr.
        const wzorzec = new RegExp(
          `${baza}-\\d+\\.avif[\\s\\S]{0,2000}?alt="${naHtml(
            komunikaty.ObrazyFilarow[klucz],
          ).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
        );
        expect(
          wzorzec.test(html),
          `${klucz}: wariant AVIF i alt tego filaru w surowym HTML`,
        ).toBe(true);
      }
    });
  }
}
