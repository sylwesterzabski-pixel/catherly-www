import { test, expect } from "@playwright/test";

/**
 * Bramka: WARSTWA RUCHU (zlecenie WWW/047, CSS-only).
 *
 * Pilnuje trzech rzeczy, których żaden inny strażnik nie pilnuje,
 * a każda z nich potrafi zniknąć po cichu:
 *
 *  1. `prefers-reduced-motion: reduce` daje stronę BEZWZGLĘDNIE
 *     statyczną — zero `animation`, zero `transition`, także na
 *     pseudoelementach. Reguła kanonu („ruch zawsze z
 *     prefers-reduced-motion") nie miała dotąd mechanizmu, bo do
 *     2026-08-26 serwis nie miał ANI JEDNEJ animacji.
 *  2. Przy ruchu włączonym ruch NAPRAWDĘ JEST — inaczej pierwszy punkt
 *     spełniłby się przez usunięcie animacji i nikt by nie zauważył.
 *     To jest kontrola pozytywna wpisana w bramkę.
 *  3. Animowane są WYŁĄCZNIE własności, które nie ruszają układu.
 *     Jedyny dopuszczony wyjątek — `grid-template-rows` przy rozwijaniu
 *     FAQ — jest wymieniony Z NAZWY, więc dołożenie drugiego wyjątku
 *     wymaga zmiany tego testu, czyli decyzji.
 */

/* ⚠ DWA SELEKTORY ZAWĘŻONE DO `main` (2.1, ADR-045). Stało tam samo
   `details …`. Od chwili, w której nawigacja dostała własny `details`
   (hamburger bez JS), oba łapały NAJPIERW element nawigacji — a ten
   ruchu nie ma, więc rodzina „FAQ — znacznik" wypadła z listy i próg
   „co najmniej 8 rodzin z ruchem" spadł na 7.

   Trzeci przypadek tej samej klasy w jednym zleceniu (obok `cennik`
   i `rozdzial-kart`). Wniosek warty zapisania: DODANIE JEDNEGO ELEMENTU
   POWSZECHNEGO TYPU unieważnia każdą asercję, która celowała w „pierwszy
   taki w dokumencie" — i robi to CICHO, bo asercja nadal ma na czym
   pracować. Przed dopisaniem `details`, `nav`, `ul` czy `section` do
   elementu współdzielonego sprawdź, kto dziś celuje w ten typ globalnie. */

/** Cele dobrane tak, żeby objąć każdą rodzinę ruchu z R1–R5. */
const CELE: Array<[string, string, string]> = [
  ["hero — dzieci stagger", "/", ".ruch-stagger > *"],
  ["CTA", "/", 'a[class*="_cta__"]'],
  ["link nawigacji", "/", "header nav a"],
  ["sekcja przy przewijaniu", "/", "main > section:nth-of-type(3) > div > *"],
  ["kadr w ramce", "/funkcje/zespol", '[class*="_obraz__"] img'],
  ["pas obrazu", "/funkcje/wyniki", ".pas-obrazu img"],
  ["linia granicy", "/funkcje/zespol", 'p[class*="_granica__"]'],
  ["FAQ — odpowiedź", "/", 'main details [class*="odpowiedz"]'],
  ["FAQ — znacznik", "/", "main details summary"],
];

/** Własności układu — animowanie ich kosztuje przeliczenie w każdej klatce. */
const ZAKAZANE = [
  "width", "height", "top", "left", "right", "bottom",
  "margin", "padding", "inset", "block-size", "inline-size",
];

/** Jedyny dopuszczony wyjątek, wymieniony z nazwy (uzasadnienie: Faq.module.css). */
const WYJATEK_UKLADU = "grid-template-rows";

async function ruchElementu(page: import("@playwright/test").Page, sel: string) {
  return page.locator(sel).first().evaluate((el) => {
    const zbierz = (s: CSSStyleDeclaration) => ({
      anim: s.animationName,
      trans: s.transitionProperty,
    });
    return {
      el: zbierz(getComputedStyle(el)),
      before: zbierz(getComputedStyle(el, "::before")),
      after: zbierz(getComputedStyle(el, "::after")),
    };
  });
}

test.describe("prefers-reduced-motion: reduce — strona BEZWZGLĘDNIE statyczna", () => {
  for (const [nazwa, trasa, sel] of CELE) {
    test(`bez ruchu: ${nazwa}`, async ({ page }) => {
      /* Preferencja emulowana na stronie, nie w `test.use` — ta druga
         droga nie przechodzi typowania w tej wersji Playwrighta. */
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(trasa);
      await expect(
        page.locator(sel).first(),
        `${nazwa}: cel istnieje (inaczej test niczego nie mierzy)`,
      ).toBeAttached();
      const r = await ruchElementu(page, sel);
      for (const [gdzie, v] of Object.entries(r)) {
        expect(v.anim, `${nazwa} (${gdzie}): animation-name`).toBe("none");
        expect(
          v.trans === "none" || v.trans === "all" ? "none" : v.trans,
          `${nazwa} (${gdzie}): transition-property`,
        ).toBe("none");
      }
    });
  }
});

test.describe("ruch włączony — kontrola pozytywna", () => {
  test("przy braku preferencji ruch NAPRAWDĘ jest (inaczej cisza udawałaby zgodność)", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const zRuchem: string[] = [];
    for (const [nazwa, trasa, sel] of CELE) {
      await page.goto(trasa);
      if ((await page.locator(sel).first().count()) === 0) continue;
      const r = await ruchElementu(page, sel);
      const ma = Object.values(r).some(
        (v) =>
          (v.anim && v.anim !== "none") ||
          (v.trans && v.trans !== "none" && v.trans !== "all"),
      );
      if (ma) zRuchem.push(nazwa);
    }
    /* Liczba WPISANA RĘCZNIE i jest MECHANIZMEM, nie dryfem: spadek
       poniżej ośmiu znaczy, że któraś rodzina ruchu zniknęła — a jej
       zniknięcie ma być DECYZJĄ, nie skutkiem ubocznym refaktoru. */
    expect(
      zRuchem.length,
      `rodziny ruchu z ruchem: ${zRuchem.join(", ")}`,
    ).toBeGreaterThanOrEqual(8);
  });
});

test("animowane są wyłącznie własności nieruszające układu", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });

  /* KLATKI KLUCZOWE — z CSSOM. Kontrola pozytywna: jeśli nic nie
     znajdziemy, znaczy że nie umiemy czytać arkuszy, a nie że nie ma
     animacji. */
  await page.goto("/");
  const klatki = await page.evaluate(() => {
    const out: Array<{ nazwa: string; wlasnosci: string[] }> = [];
    const idz = (rr: CSSRuleList) => {
      for (const r of Array.from(rr)) {
        if (r.type === CSSRule.KEYFRAMES_RULE) {
          const kr = r as CSSKeyframesRule;
          const w = new Set<string>();
          for (const k of Array.from(kr.cssRules)) {
            for (const prop of Array.from((k as CSSKeyframeRule).style)) w.add(prop);
          }
          out.push({ nazwa: kr.name, wlasnosci: [...w] });
          continue;
        }
        const z = (r as CSSGroupingRule).cssRules;
        if (z) idz(z);
      }
    };
    for (const a of Array.from(document.styleSheets)) {
      try { idz(a.cssRules); } catch { /* arkusz z innej domeny */ }
    }
    return out;
  });
  expect(
    klatki.length,
    "kontrola pozytywna: klatki kluczowe w ogóle znalezione",
  ).toBeGreaterThan(0);

  /* PRZEJŚCIA — ze STYLU WYLICZONEGO na rzeczywistych elementach, nie
     z CSSOM. Powód zapisany, bo to była realna dziura: odczyt
     `transitionProperty` z reguł arkusza zwracał w tym projekcie PUSTĄ
     listę, więc ta połowa sprawdzenia nic nie robiła, a test i tak
     świecił na zielono. Kontrola pozytywna niżej zamyka tę furtkę:
     jeśli nie znajdziemy ANI JEDNEGO przejścia, test upada. */
  const przejscia = new Set<string>();
  for (const [, trasa, sel] of CELE) {
    await page.goto(trasa);
    const el = page.locator(sel).first();
    if ((await el.count()) === 0) continue;
    const zebrane = await el.evaluate((e) => {
      const z = (s: CSSStyleDeclaration) =>
        s.transitionProperty && s.transitionProperty !== "none" ? s.transitionProperty : "";
      return [z(getComputedStyle(e)), z(getComputedStyle(e, "::before")), z(getComputedStyle(e, "::after"))]
        .filter(Boolean)
        .join(",");
    });
    zebrane.split(",").map((x) => x.trim()).filter(Boolean).forEach((x) => przejscia.add(x));
  }
  expect(
    przejscia.size,
    "kontrola pozytywna: przejścia w ogóle znalezione (pusty zbiór = ślepy pomiar, nie brak ruchu)",
  ).toBeGreaterThan(0);

  const zle: string[] = [];
  for (const k of klatki) {
    for (const w of k.wlasnosci) {
      if (ZAKAZANE.some((z) => w === z || w.startsWith(`${z}-`))) {
        zle.push(`@keyframes ${k.nazwa} → ${w}`);
      }
    }
  }
  for (const t of przejscia) {
    if (t === WYJATEK_UKLADU) continue;
    if (ZAKAZANE.some((z) => t === z || t.startsWith(`${z}-`))) {
      zle.push(`transition → ${t}`);
    }
  }
  expect(
    zle,
    "animacja własności układu — każda klatka kosztuje przeliczenie strony",
  ).toEqual([]);
});
