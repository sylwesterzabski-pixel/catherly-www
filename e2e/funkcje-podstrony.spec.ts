import { readFileSync } from "node:fs";
import { join } from "node:path";

import { test, expect } from "@playwright/test";

import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";

/**
 * K12 — podstrony /funkcje/{tresci,zespol,wyniki} (Faza 4, Etap C;
 * szablon wzorcowej podstrony /funkcje/pozyskiwanie + Uzupełnienie C
 * briefu: SPIS TREŚCI standardowo, F9 dwukierunkowe; treść
 * content/{pl,en,de}/funkcje-{tresci,zespol,wyniki}.md — D-C1…D-C5,
 * protokół docs/faza-4/tresci-trzy-podstrony-po-panelach.md).
 * Strażnicy per podstrona ×3 języki: parytet (h1, moduły exact,
 * granice, F8 — zespol z pełnymi formami Growth), spis treści
 * (nav[aria-label] + liczba linków = liczba modułów + hrefy #slug),
 * kotwice W4, F9 oba kierunki wg mapy filarów, MILCZENIE, znak
 * w znak messages ↔ content, no-JS, struktura h2, reflow 320 px.
 */
const JEZYKI = [
  { jezyk: "pl", prefiks: "", komunikaty: pl },
  { jezyk: "en", prefiks: "/en", komunikaty: en },
  { jezyk: "de", prefiks: "/de", komunikaty: de },
] as const;

// Frazy milczenia wspólne ×4 podstrony (brief K12; ekstrakcja Etapu A
// — adwersarz B F4: strażnik obejmuje całą tabelę milczenia, nie
// tylko własny filar). Dobrane jednoznacznie per język; celowo BEZ
// fraz używanych legalnie przecząco w granicach modułów.
const FRAZY_WSPOLNE = [
  // Filar 1: sekwencje kontaktowe, blokada osoby (brak przycisku UI).
  "sekwencje kontaktowe",
  "contact sequences",
  "kontaktsequenzen",
  "blokada osoby",
  "block a person",
  "person blockieren",
  // Filar 2: Kapsułka Przyszłości (decyzja właściciela: milczenie),
  // głos ElevenLabs (SZKIELET).
  "kapsułka przyszłości",
  "future capsule",
  "zukunftskapsel",
  "elevenlabs",
  // Reguły twarde nagłówka tabeli obietnic.
  "thriving lifestyle",
  // Nazwa wycofana z www (słownik: wyłącznie „Twój Wrapped").
  "magic wrapped",
  // WhatsApp / integracje social (brak zgody platformy / SZKIELET).
  "whatsapp",
  "instagram",
  "tiktok",
  "facebook",
  "pinterest",
] as const;

type Przestrzen = "FunkcjeTresci" | "FunkcjeZespol" | "FunkcjeWyniki";

type Podstrona = {
  sciezka: string;
  przestrzen: Przestrzen;
  /** Plik treści OBOWIĄZUJĄCEJ w content/{pl,en,de}/. */
  plikTresci: string;
  /** Kotwice modułów = sluggi z PL content (kontrakt z page.tsx). */
  kotwice: readonly string[];
  /** Kotwice sekcji w WARIANCIE KIERUNKU (F4-2/D-C1: BEZ slotu
   *  zrzutu, bez ramki obrazu) — pozostałe kotwice to moduły DZIAŁA
   *  z dokładnie jedną ramką. Obejmuje też #asystent-ai (spoza listy
   *  kotwic modułów). */
  kotwiceKierunku: readonly string[];
  /** Sekcja kierunku AI (wyłącznie /funkcje/tresci). */
  maAI: boolean;
  /** Klucze zdań F8 w kolejności renderowania (F8 wieloczęściowy —
   *  rejestr poz. 11: zespol ×3, wyniki ×2, tresci ×1). */
  f8Klucze: readonly string[];
  /** F9 — mapa filarów: pozyskiwanie → tresci → zespol → wyniki. */
  wsteczSciezka: string;
  dalejSciezka?: string;
  /** Kotwica do pomiaru geometrycznego W4 (1 na podstronę). */
  kotwicaW4: string;
  /** Frazy milczenia specyficzne dla podstrony (ekstrakcja A). */
  frazyMilczenia: readonly string[];
  /** Liczba main > section: nagłówek + moduły (+AI) + F8 + F9 +
   *  zamknięcie (okruszki i spis treści to nav, nie section). */
  sekcjeMain: number;
};

const PODSTRONY: readonly Podstrona[] = [
  {
    sciezka: "/funkcje/tresci",
    przestrzen: "FunkcjeTresci",
    plikTresci: "funkcje-tresci.md",
    kotwice: [
      "studio",
      "szablony",
      "hashtagi",
      "kalendarz-publikacji",
      "zatwierdzanie",
      "tarcza",
      "pieczec-etyczna",
      "uczenie-glosu",
      "tablica-postow",
    ],
    maAI: true,
    kotwiceKierunku: ["studio", "asystent-ai"],
    f8Klucze: ["f8_1", "f8_2"], // rozbite 2026-08-14 (pozycja kierunku)
    wsteczSciezka: "/funkcje/pozyskiwanie",
    dalejSciezka: "/funkcje/zespol",
    kotwicaW4: "pieczec-etyczna",
    // Filar 2: żadna obietnica publikacji (YouTube z listy platform;
    // IG/TikTok/FB/Pinterest w frazach wspólnych). Celowo BEZ „zdjęć"
    // — granica Studia legalnie mówi „nie wgrasz zdjęć z telefonu".
    frazyMilczenia: ["youtube"],
    sekcjeMain: 14, // nagłówek + 9 modułów + AI + F8 + F9 + zamknięcie
  },
  {
    sciezka: "/funkcje/zespol",
    przestrzen: "FunkcjeZespol",
    plikTresci: "funkcje-zespol.md",
    kotwice: [
      "kreator-wdrozeniowy",
      "zatwierdzanie-zespolu",
      "pierwsze-90-dni",
      "osiagniecia",
      "paszport-zgodnosci",
      "akademia",
    ],
    maAI: false,
    kotwiceKierunku: [],
    f8Klucze: ["f8_1", "f8_2", "f8_3"],
    wsteczSciezka: "/funkcje/tresci",
    dalejSciezka: "/funkcje/wyniki",
    kotwicaW4: "paszport-zgodnosci",
    // Filar 3: milczenie z ekstrakcji A. „Puls zespołu" — nazwa
    // dozwolona wyłącznie na karcie Growth /cennik; F8 celowo bez
    // niej. „Drzewo struktury" NIE wchodzi do fraz — F8_3 legalnie
    // mówi „widok całego drzewa struktury" (zdanie sankcjonowane).
    // EN/DE: „team-puls" = forma DE ze słownika nazw (Team-Puls,
    // porównanie po lowercase); pozostałe literały EN/DE to przekład
    // zachowawczy (best-effort) — brzmienia z i18n aplikacji do
    // weryfikacji odrębnym zleceniem Z (adwersarz C, uwaga 3).
    frazyMilczenia: [
      "import wyciągu",
      "statement import",
      "wyzwania",
      "challenges",
      "herausforderungen",
      "quiz",
      "ognisko",
      "bonfire",
      "lagerfeuer",
      "partner biegu",
      "running partner",
      "laufpartner",
      "puls zespołu",
      "team pulse",
      "team-puls",
    ],
    sekcjeMain: 10, // nagłówek + 6 modułów + F8 + F9 + zamknięcie
  },
  {
    sciezka: "/funkcje/wyniki",
    przestrzen: "FunkcjeWyniki",
    plikTresci: "funkcje-wyniki.md",
    kotwice: [
      "pulpit",
      "twoj-wrapped",
      "cel",
      "sciana-sukcesow",
      "swiadectwo",
      "wall-of-proof",
    ],
    maAI: false,
    kotwiceKierunku: [],
    f8Klucze: ["f8_1", "f8_2"],
    wsteczSciezka: "/funkcje/zespol",
    kotwicaW4: "swiadectwo",
    // Filar 4: Rozkład dochodów FL (Uczciwe Lustro) — milczenie.
    // Celowo BEZ „pdf" — granica Twojego Wrapped legalnie mówi
    // przecząco o raporcie PDF (ryzyko 3 protokołu: strażnik musi
    // dopuścić ten jeden przypadek; precedens e-mail/SMS).
    // Literały EN/DE: przekład zachowawczy (best-effort) — brzmienia
    // z i18n aplikacji do weryfikacji odrębnym zleceniem Z;
    // „team-puls" = forma DE ze słownika (adwersarz C, uwaga 3).
    frazyMilczenia: [
      "rozkład dochodów",
      "income distribution",
      "einkommensverteilung",
      "uczciwe lustro",
      "honest mirror",
      "ehrlicher spiegel",
      "forever living",
      "puls zespołu",
      "team pulse",
      "team-puls",
    ],
    sekcjeMain: 10, // nagłówek + 6 modułów + F8 + F9 + zamknięcie
  },
];

function przestrzenJezyka(
  komunikaty: (typeof JEZYKI)[number]["komunikaty"],
  nazwa: Przestrzen,
): Record<string, string> {
  return komunikaty[nazwa];
}

for (const podstrona of PODSTRONY) {
  const liczbaModulow = podstrona.kotwice.length;

  for (const { jezyk, prefiks, komunikaty } of JEZYKI) {
    const adres = `${prefiks}${podstrona.sciezka}`;
    const k = przestrzenJezyka(komunikaty, podstrona.przestrzen);

    // (a) Parytet ×3: okruszki, H1+zdanie, moduły (h2+poco+granica
    // znak w znak z messages), [sekcja AI], F8, zamknięcie.
    test(`K12 (${jezyk}): okruszki, nagłówek i ${liczbaModulow} modułów z messages na ${adres}`, async ({
      page,
    }) => {
      await page.goto(adres);

      const okruszki = page.locator(`nav[aria-label="${k.okruszkiAria}"]`);
      await expect(okruszki).toHaveCount(1);
      const linkFunkcje = okruszki.getByRole("link", {
        name: komunikaty.Nawigacja.funkcje,
        exact: true,
      });
      await expect(linkFunkcje).toHaveAttribute("href", `${prefiks}/funkcje`);
      const biezacyOkruszek = okruszki.locator('li[aria-current="page"]');
      await expect(biezacyOkruszek).toHaveText(k.okruszek);
      await expect(biezacyOkruszek.locator("a")).toHaveCount(0);

      await expect(page.locator("h1")).toHaveText(k.naglowek);
      await expect(page.getByText(k.zdanie, { exact: true })).toBeVisible();

      for (const [indeks, kotwica] of podstrona.kotwice.entries()) {
        const numer = indeks + 1;
        const sekcja = page.locator(`section[aria-labelledby="${kotwica}"]`);
        await expect(sekcja.getByRole("heading", { level: 2 })).toHaveText(
          k[`mod${numer}_nazwa`],
        );
        await expect(
          sekcja.getByText(k[`mod${numer}_poco`], { exact: true }),
        ).toBeVisible();
        await expect(
          sekcja.getByText(k[`mod${numer}_nie`], { exact: true }),
        ).toBeVisible();
      }
    });

    test(`K12 (${jezyk}): ${
      podstrona.maAI ? "sekcja AI, " : ""
    }F8 i zamknięcie z messages na ${adres}`, async ({ page }) => {
      await page.goto(adres);

      if (podstrona.maAI) {
        const kierunek = page.locator(
          'section[aria-labelledby="asystent-ai"]',
        );
        // H2 = nazwa + OZNACZENIE statusu w jednym węźle tekstowym
        // (panel projektu 2026-08-14, forma L1-A) — i zarazem nazwa
        // dostępna sekcji przez aria-labelledby.
        await expect(kierunek.getByRole("heading", { level: 2 })).toHaveText(
          `${k.aiNaglowek} ${k.aiOznaczenie}`,
        );
        await expect(
          kierunek.getByText(k.aiTresc, { exact: true }),
        ).toBeVisible();
        await expect(
          kierunek.getByText(k.aiGranica, { exact: true }),
        ).toBeVisible();
      }

      // F8 — każde zdanie w osobnym <p> (zespol: pełne formy Growth
      // ×2 — wariant F8-A panelu, VERBATIM) + link do cennika.
      for (const klucz of podstrona.f8Klucze) {
        await expect(page.getByText(k[klucz], { exact: true })).toBeVisible();
      }
      const linkCennika = page.getByRole("link", {
        name: k.f8link,
        exact: true,
      });
      await expect(linkCennika).toHaveAttribute("href", `${prefiks}/cennik`);

      const zamkniecie = page.locator("main > section").last();
      const cta = zamkniecie.getByRole("link", {
        name: k.zamkniecieCta,
        exact: true,
      });
      await expect(cta).toHaveAttribute("href", `${prefiks}/login`);
      await expect(
        zamkniecie.getByText(k.zamkniecieZdanie, { exact: true }),
      ).toBeVisible();
    });

    // (b) SPIS TREŚCI (element standardowy szablonu — brief C):
    // nav[aria-label z messages], liczba linków = liczba modułów,
    // każdy link → #slug z etykietą modułu; kotwica-cel istnieje.
    test(`SPIS (${jezyk}): nav „${k.spisEtykieta}" z ${liczbaModulow} linkami do kotwic na ${adres}`, async ({
      page,
    }) => {
      await page.goto(adres);
      const spis = page.locator(`nav[aria-label="${k.spisEtykieta}"]`);
      await expect(spis).toHaveCount(1);
      await expect(spis.locator("p")).toHaveText(k.spisEtykieta);
      const linki = spis.locator("ol > li > a");
      await expect(linki).toHaveCount(liczbaModulow);
      for (const [indeks, kotwica] of podstrona.kotwice.entries()) {
        const link = linki.nth(indeks);
        await expect(link).toHaveAttribute("href", `#${kotwica}`);
        await expect(link).toHaveText(k[`mod${indeks + 1}_nazwa`]);
        await expect(page.locator(`h2#${kotwica}`)).toHaveCount(1);
      }
    });

    // (c) F9 — przejścia wg mapy filarów (pozyskiwanie → tresci →
    // zespol → wyniki); na /wyniki prawy slot PUSTY (ostatni filar).
    test(`F9 (${jezyk}): przejścia ${
      podstrona.dalejSciezka === undefined ? "tylko wstecz" : "oba kierunki"
    } na ${adres}`, async ({ page }) => {
      await page.goto(adres);
      const wstecz = page.getByRole("link", {
        name: k.f9Wstecz,
        exact: true,
      });
      await expect(wstecz).toHaveAttribute(
        "href",
        `${prefiks}${podstrona.wsteczSciezka}`,
      );
      const f9 = page.locator("main > section", { has: wstecz });
      if (podstrona.dalejSciezka === undefined) {
        // Ostatni filar: dokładnie jeden link w sekcji przejść.
        await expect(f9.locator("a")).toHaveCount(1);
      } else {
        const dalej = page.getByRole("link", {
          name: k.f9Dalej,
          exact: true,
        });
        await expect(dalej).toHaveAttribute(
          "href",
          `${prefiks}${podstrona.dalejSciezka}`,
        );
        await expect(f9.locator("a")).toHaveCount(2);
      }
    });

    // (d) MILCZENIE: żadna nazwa z listy milczenia nie występuje
    // w surowym HTML (frazy wspólne + frazy filara podstrony).
    test(`MILCZENIE (${jezyk}): nazwy funkcji milczenia nieobecne w HTML na ${adres}`, async ({
      request,
    }) => {
      const odpowiedz = await request.get(adres);
      expect(odpowiedz.status()).toBe(200);
      const html = (await odpowiedz.text()).toLowerCase();
      for (const fraza of [...FRAZY_WSPOLNE, ...podstrona.frazyMilczenia]) {
        expect(html, `HTML nie zawiera „${fraza}"`).not.toContain(fraza);
      }
    });

    // (e) no-JS: h1, moduł 1, granica ostatniego modułu, [AI], F8
    // i etykieta spisu w surowym HTML (treść czytelna bez JS).
    test(`K12 bez JS (${jezyk}): treść w surowym HTML na ${adres}`, async ({
      request,
    }) => {
      const odpowiedz = await request.get(adres);
      expect(odpowiedz.status()).toBe(200);
      const html = await odpowiedz.text();
      expect(html, "H1 w HTML bez JS").toContain(k.naglowek);
      expect(html, "nazwa modułu 1 w HTML bez JS").toContain(k.mod1_nazwa);
      expect(html, "PO CO TO modułu 1 w HTML bez JS").toContain(k.mod1_poco);
      expect(html, "granica ostatniego modułu w HTML bez JS").toContain(
        k[`mod${liczbaModulow}_nie`],
      );
      if (podstrona.maAI) {
        expect(html, "treść sekcji AI w HTML bez JS").toContain(k.aiTresc);
        // H2 sekcji kierunku RAZEM z członem — sam nagłówek
        // przechodziłby toContain także po zniknięciu oznaczenia.
        expect(html, "oznaczenie kierunku przy H2 w HTML bez JS").toContain(
          `${k.aiNaglowek} ${k.aiOznaczenie}`,
        );
      }
      for (const klucz of podstrona.f8Klucze) {
        expect(html, `zdanie ${klucz} w HTML bez JS`).toContain(k[klucz]);
      }
      expect(html, "etykieta spisu w HTML bez JS").toContain(k.spisEtykieta);
    });

    // (f) Struktura nagłówków: 1×h1; main h2 = moduły (+AI) w
    // porządku treści — toHaveText(tablica) pilnuje liczby I kolejności.
    test(`K12 (${jezyk}): struktura nagłówków (1×h1, ${
      liczbaModulow + (podstrona.maAI ? 1 : 0)
    }×h2 w porządku) na ${adres}`, async ({ page }) => {
      await page.goto(adres);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main h2")).toHaveText([
        ...podstrona.kotwice.map((_, indeks) => k[`mod${indeks + 1}_nazwa`]),
        // Sekcja kierunku: nazwa + oznaczenie statusu. Moduł Studio na
        // /funkcje/tresci oznaczenia NIE dostaje — ma formę karty
        // kierunku z powodu przebudowy zrzutu, a status DZIAŁA (K-D5).
        ...(podstrona.maAI ? [`${k.aiNaglowek} ${k.aiOznaczenie}`] : []),
      ]);
    });
  }

  // (g) Kotwice pod sticky nav (W4): wejście fragmentem stawia h2
  // W PEŁNI pod nagłówkiem — pomiar geometryczny, nie założenie
  // (wzorzec funkcje-pozyskiwanie.spec; 1 kotwica per podstrona).
  test(`W4: kotwica #${podstrona.kotwicaW4} w pełni widoczna pod sticky nav`, async ({
    page,
  }) => {
    await page.goto(`${podstrona.sciezka}#${podstrona.kotwicaW4}`);
    const h2 = page.locator(`#${podstrona.kotwicaW4}`);
    await expect(h2).toBeVisible();
    const ramkaNaglowka = await page.locator("header").boundingBox();
    const ramkaH2 = await h2.boundingBox();
    expect(ramkaNaglowka, "sticky nagłówek ma ramkę").not.toBeNull();
    expect(ramkaH2, "h2 kotwicy ma ramkę").not.toBeNull();
    expect(
      ramkaH2!.y,
      "górna krawędź h2 poniżej dolnej krawędzi sticky nagłówka",
    ).toBeGreaterThanOrEqual(ramkaNaglowka!.y + ramkaNaglowka!.height);
  });

  // (h) Liczba sekcji main (stos F1–F11 kompletny; okruszki i spis
  // treści to nav — nie wliczają się).
  test(`K12: ${podstrona.sekcjeMain} sekcji main na ${podstrona.sciezka}`, async ({
    page,
  }) => {
    await page.goto(podstrona.sciezka);
    await expect(page.locator("main > section")).toHaveCount(
      podstrona.sekcjeMain,
    );
  });

  // (k) STRAŻNIK WARIANTU KIERUNKU (adwersarz C Etapu C, blokada 1:
  // mutacja dopisująca ramkę do SekcjaKierunku była niewidzialna dla
  // suity). Kontrakt DOM: sekcja kierunku BEZ slotu zrzutu — zero
  // elementów aria-hidden i zero img (F4-2/D-C1); każdy moduł DZIAŁA
  // ma DOKŁADNIE jedną ramkę div[aria-hidden="true"] (ModulFunkcji).
  test(`WARIANT KIERUNKU: sekcje kierunku bez slotu zrzutu, moduły DZIAŁA z 1 ramką na ${podstrona.sciezka}`, async ({
    page,
  }) => {
    await page.goto(podstrona.sciezka);
    for (const kotwica of podstrona.kotwiceKierunku) {
      const sekcja = page.locator(`section[aria-labelledby="${kotwica}"]`);
      await expect(sekcja).toHaveCount(1);
      await expect(
        sekcja.locator('[aria-hidden="true"]'),
        `sekcja kierunku #${kotwica} bez elementów aria-hidden`,
      ).toHaveCount(0);
      await expect(
        sekcja.locator("img"),
        `sekcja kierunku #${kotwica} bez img`,
      ).toHaveCount(0);
    }
    for (const kotwica of podstrona.kotwice) {
      if (podstrona.kotwiceKierunku.includes(kotwica)) {
        continue;
      }
      const modul = page.locator(`section[aria-labelledby="${kotwica}"]`);
      /* RAMKA MA DWA STANY, NIE JEDEN (rozszerzone 2026-08-26, WWW/045).
         Do tej doby ramka slotu była ZAWSZE pusta i aria-hidden, więc
         strażnik liczył elementy aria-hidden. Od fali 1 część modułów
         niesie w tej ramce kadr dekoracyjny — a kadr WIDOCZNY nie może
         być aria-hidden, bo czytnik ma prawo wiedzieć, co pokazuje.

         WŁASNOŚĆ PILNOWANA JEST TA SAMA: moduł ma DOKŁADNIE JEDNĄ ramkę
         slotu. Zmienia się tylko to, że ramka wolno jej być wypełnioną.
         Osłabieniem byłoby przestać liczyć ramki albo dopuścić dowolną
         ich liczbę; tu liczba dalej wynosi jeden, a stan ramki jest
         sprawdzany JAWNIE w obu wariantach.

         Zachowana zostaje też uwaga 2 adwersarza C: przy ramce PUSTEJ
         dalej liczymy elementy aria-hidden DOWOLNEGO typu, więc ukryty
         <span> obok ramki nadal jest widzialny dla strażnika. */
      const ramkaPusta = modul.locator('div[aria-hidden="true"]');
      const ramkaZKadrem = modul.locator("div:has(> img)");
      const pustych = await ramkaPusta.count();
      const zKadrem = await ramkaZKadrem.count();
      expect(
        pustych + zKadrem,
        `moduł DZIAŁA #${kotwica}: dokładnie jedna ramka slotu (pusta ${pustych} + z kadrem ${zKadrem})`,
      ).toBe(1);
      if (pustych === 1) {
        await expect(
          modul.locator('[aria-hidden="true"]'),
          `moduł DZIAŁA #${kotwica}: pusta ramka to JEDYNY element aria-hidden`,
        ).toHaveCount(1);
      } else {
        /* Ramka z kadrem: dokładnie jeden obraz, alt NIEPUSTY i NIE
           aria-hidden. Pusty alt przy widocznym kadrze byłby ukryciem
           treści przed czytnikiem, a nie dekoracją. */
        const obraz = ramkaZKadrem.locator("img");
        await expect(
          obraz,
          `moduł DZIAŁA #${kotwica}: dokładnie jeden kadr w ramce`,
        ).toHaveCount(1);
        const alt = await obraz.getAttribute("alt");
        expect(
          (alt ?? "").trim().length,
          `moduł DZIAŁA #${kotwica}: kadr ma niepusty alt`,
        ).toBeGreaterThan(0);
        await expect(
          modul.locator('[aria-hidden="true"]'),
          `moduł DZIAŁA #${kotwica}: przy kadrze zero elementów aria-hidden`,
        ).toHaveCount(0);
      }
    }
  });

  // (i) Reflow 320 px (WCAG 1.4.10): bez panoramy poziomej.
  test.describe(`reflow 320 px — ${podstrona.sciezka}`, () => {
    test.use({ viewport: { width: 320, height: 700 } });

    test(`K12 nie panoramuje na 320 px; h1 w kadrze (${podstrona.sciezka})`, async ({
      page,
    }) => {
      await page.goto(podstrona.sciezka);
      const ramkaH1 = await page.locator("h1").boundingBox();
      expect(ramkaH1, "h1 ma ramkę").not.toBeNull();
      expect(
        ramkaH1!.x + ramkaH1!.width,
        "h1 w kadrze 320 px",
      ).toBeLessThanOrEqual(320);
      const przesuniecie = await page.evaluate(() => {
        window.scrollTo(300, 0);
        return window.scrollX;
      });
      expect(przesuniecie, "brak panoramy na 320 px").toBe(0);
    });
  });
}

// (j) Strażnik „znak w znak": messages ↔ content/*/funkcje-*.md
// (treść OBOWIĄZUJE; normalizowane WYŁĄCZNIE białe znaki). Wyjątki
// udokumentowane:
// - okruszek: etykieta = nazwa filara z content/*/filary.md (nagłówek
//   „## Filar N — …" wersalikami → porównanie bez wielkości liter);
// - okruszkiAria („Jesteś tutaj") i aiNaglowek: mikroteksty
//   sankcjonowane na WZORCOWEJ podstronie (panel HF K12) — źródłem
//   jest content/*/funkcje-pozyskiwanie.md; dla aiNaglowka content
//   tresci w. 133 wprost: „×4 wygrywa wzorzec".
test("K12: messages podstron Etapu C znak w znak z content", () => {
  for (const podstrona of PODSTRONY) {
    for (const { jezyk, komunikaty } of JEZYKI) {
      const zrodlo = readFileSync(
        join(__dirname, "..", "content", jezyk, podstrona.plikTresci),
        "utf8",
      ).replace(/\s+/g, " ");
      const filary = readFileSync(
        join(__dirname, "..", "content", jezyk, "filary.md"),
        "utf8",
      ).replace(/\s+/g, " ");
      const wzorcowa = readFileSync(
        join(__dirname, "..", "content", jezyk, "funkcje-pozyskiwanie.md"),
        "utf8",
      ).replace(/\s+/g, " ");

      const przestrzen = przestrzenJezyka(komunikaty, podstrona.przestrzen);
      for (const [pole, tresc] of Object.entries(przestrzen)) {
        if (pole === "okruszek") {
          expect(
            filary.toLowerCase(),
            `content/${jezyk}/filary.md zawiera nazwę filara „${tresc}"`,
          ).toContain(tresc.toLowerCase());
          continue;
        }
        if (pole === "okruszkiAria" || pole === "aiNaglowek") {
          expect(
            wzorcowa,
            `content/${jezyk}/funkcje-pozyskiwanie.md (wzorzec) zawiera ${podstrona.przestrzen}.${pole}`,
          ).toContain(tresc);
          continue;
        }
        expect(
          zrodlo,
          `content/${jezyk}/${podstrona.plikTresci} zawiera ${podstrona.przestrzen}.${pole}`,
        ).toContain(tresc);
      }
    }
  }
});
