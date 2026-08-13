import { readFileSync } from "node:fs";
import { join } from "node:path";

import { test, expect } from "@playwright/test";

import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";
import fakty from "../content/facts.json";

/**
 * /dla-kogo — TRZY ŚCIEŻKI ROZPOZNANIA (Faza 4, Etap D; treść
 * content/{pl,en,de}/dla-kogo.md — D-D1…D-D21, protokół
 * docs/faza-4/tresci-etap-d-po-panelach.md; markup wg HF
 * docs/faza-4/hf/d-dla-kogo.html po panelu projektu 2026-08-13;
 * wymagania testowe: handoff §6, T1–T11).
 *
 * NAJWAŻNIEJSZY STRAŻNIK TEGO PLIKU to T1 (D-D21): etykieta każdego
 * z 13 linków w prozie MUSI być DOKŁADNIE frazą zadeklarowaną
 * w wierszu „**Linki:**" pliku treści — w KAŻDYM języku osobno.
 * Adaptacja EN/DE, która zawinie w link inną frazę niż sankcjonowana
 * (choćby lemat zamiast formy odmienionej — link rozcinający wyraz),
 * pada tutaj.
 *
 * Pozostali strażnicy ×3 języki: 28 kluczy DlaKogo znak w znak ↔
 * content po zdjęciu znaczników rich i podstawieniu {minuty} (T2),
 * MILCZENIE (T3), kotwica ścieżki pod sticky nav mierzona
 * geometrycznie (T4), treść bez JS (T6), struktura 1×h1 + 3×h2 +
 * spis treści z 3 linkami (T7), reflow 320 px (T9), Tab przez spis
 * i 13 linków bez pułapki fokusu (T11).
 */
const PRZYPADKI = [
  { adres: "/dla-kogo", jezyk: "pl", prefiks: "", komunikaty: pl },
  { adres: "/en/dla-kogo", jezyk: "en", prefiks: "/en", komunikaty: en },
  { adres: "/de/dla-kogo", jezyk: "de", prefiks: "/de", komunikaty: de },
] as const;

/**
 * Trzy ścieżki — LUSTRO tablicy SCIEZKI z src/app/[locale]/dla-kogo/page.tsx.
 * Kotwice są kontraktem publicznym (D-D14): identyczne ×3 języki, bo
 * next-intl nie lokalizuje segmentów, a linki z zewnątrz celują
 * w jeden slug.
 */
const SCIEZKI = [
  { klucz: "s1", kotwica: "pracujesz-sama", akapity: 3, zdaniaPlanu: 1 },
  { klucz: "s2", kotwica: "budujesz-zespol", akapity: 2, zdaniaPlanu: 2 },
  { klucz: "s3", kotwica: "prowadzisz-strukture", akapity: 2, zdaniaPlanu: 3 },
] as const;

/**
 * 13 LINKÓW W PROZIE w KOLEJNOŚCI DOKUMENTU — lustro LINKI_PROZY ze
 * strony. Kolejność jest częścią asercji: przestawienie znacznika
 * w adaptacji językowej przypisałoby adres innej frazie.
 */
const LINKI_PROZY = [
  { klucz: "s1_robi_1", znacznik: "dmo", cel: "/funkcje/pozyskiwanie#dmo" },
  { klucz: "s1_robi_1", znacznik: "kalendarz", cel: "/funkcje/pozyskiwanie#kalendarz" },
  { klucz: "s1_robi_2", znacznik: "formularz", cel: "/funkcje/pozyskiwanie#formularz" },
  { klucz: "s1_robi_2", znacznik: "salaTreningowa", cel: "/funkcje/pozyskiwanie#sala-treningowa" },
  { klucz: "s1_robi_3", znacznik: "szablony", cel: "/funkcje/tresci#szablony" },
  { klucz: "s1_robi_3", znacznik: "tarcza", cel: "/funkcje/tresci#tarcza" },
  { klucz: "s2_robi_1", znacznik: "pulpit", cel: "/funkcje/wyniki#pulpit" },
  { klucz: "s2_robi_1", znacznik: "kreator", cel: "/funkcje/zespol#kreator-wdrozeniowy" },
  { klucz: "s2_robi_2", znacznik: "pierwsze90", cel: "/funkcje/zespol#pierwsze-90-dni" },
  { klucz: "s2_robi_2", znacznik: "osiagniecia", cel: "/funkcje/zespol#osiagniecia" },
  { klucz: "s3_robi_1", znacznik: "zatwierdzanieZespolu", cel: "/funkcje/zespol#zatwierdzanie-zespolu" },
  { klucz: "s3_robi_1", znacznik: "paszport", cel: "/funkcje/zespol#paszport-zgodnosci" },
  { klucz: "s3_robi_2", znacznik: "akademia", cel: "/funkcje/zespol#akademia" },
] as const;

/** 28 kluczy przestrzeni DlaKogo — komplet, jak konsumuje je page.tsx. */
const KLUCZE = [
  "naglowek",
  "zdanie",
  "spisEtykieta",
  "cta",
  "ctaZdanie",
  "cennikLink",
  ...SCIEZKI.flatMap((sciezka) => [
    `${sciezka.klucz}_h2`,
    `${sciezka.klucz}_boli`,
    ...Array.from(
      { length: sciezka.akapity },
      (_, i) => `${sciezka.klucz}_robi_${i + 1}`,
    ),
    ...(sciezka.zdaniaPlanu === 1
      ? [`${sciezka.klucz}_plan`]
      : Array.from(
          { length: sciezka.zdaniaPlanu },
          (_, i) => `${sciezka.klucz}_plan_${i + 1}`,
        )),
    `${sciezka.klucz}_granica`,
  ]),
] as const;

/** „30 minut" w s1_robi_1 — z facts.json (D-B3), jak na stronie. */
const MINUTY = String(fakty.fakty["przypomnienie-kalendarza-minuty"].wartosc);

/**
 * MILCZENIE (T3): tabela wspólna + pozycje rejestru poz. 12 (raporty
 * struktury i sponsora, Liga zespołu, Benchmarki, Hive Coach).
 * Literały EN/DE: przekład zachowawczy, jak w strażnikach Etapu C.
 */
const FRAZY_MILCZENIA = [
  "sekwencje kontaktowe",
  "contact sequences",
  "kontaktsequenzen",
  "blokada osoby",
  "block a person",
  "person blockieren",
  "kapsułka przyszłości",
  "future capsule",
  "zukunftskapsel",
  "elevenlabs",
  "thriving lifestyle",
  "magic wrapped",
  "forever living",
  "whatsapp",
  "instagram",
  "tiktok",
  "facebook",
  "pinterest",
  "youtube",
  "puls zespołu",
  "team pulse",
  "team-puls",
  "uczciwe lustro",
  "honest mirror",
  "ehrlicher spiegel",
  // T3 wymaga na /dla-kogo TEGO SAMEGO zakresu co na indeksie: strona
  // linkuje w prozie do modułów WSZYSTKICH czterech filarów (patrz
  // LINKI_PROZY), więc agreguje ten sam obszar obietnic. Poniższe 19
  // fraz było w e2e/funkcje-indeks.spec.ts, a tutaj wypadło — w tym
  // „rozliczenia" (I4), fraza z osobnym rozstrzygnięciem etapu.
  "integracje z kontami social",
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
  "rozkład dochodów",
  "income distribution",
  "einkommensverteilung",
  "rozliczenia",
  "settlements",
  "abrechnungen",
  // Rejestr poz. 12 — funkcje struktury, o których strona milczy.
  "raporty struktury",
  "raport struktury",
  "structure report",
  "strukturbericht",
  "raport sponsora",
  "raporty sponsora",
  "sponsor report",
  "sponsorbericht",
  "liga zespołu",
  "team league",
  "team-liga",
  "benchmark",
  "hive coach",
  "hive-coach",
] as const;

const zwin = (tekst: string) => tekst.replace(/\s+/g, " ").trim();
const bezZnacznikow = (tekst: string) =>
  tekst.replace(/<\/?[a-zA-Z][a-zA-Z0-9]*>/g, "");

const sciezkaTresci = (jezyk: string) =>
  join(process.cwd(), `content/${jezyk}/dla-kogo.md`);

/**
 * MARKUP bez skryptów — to, co czytelniczka bez JS naprawdę dostaje.
 *
 * Ciało odpowiedzi Next.js to w ~70% payload RSC w `<script>` (pomiar
 * na buildzie: /dla-kogo 28 042 znaków, z tego 19 793 w skryptach)
 * i niesie ciągi, których w markupie NIE MA — np. nagłówek strony 404
 * „Tej strony nie ma.". `expect(cialo).toContain(...)` nie dowodzi
 * więc niczego o treści bez JS. T6 asertuje na markupie; MILCZENIE
 * (`not.toContain`) zostaje na CAŁYM ciele, bo tam szerszy zakres
 * działa na korzyść.
 */
const bezSkryptow = (cialo: string) =>
  cialo.replace(/<script[^>]*>[\s\S]*?<\/script>/g, "");

/**
 * Deklaracje linków prozy z pliku treści: wiersze „**Linki:**"
 * w kolejności dokumentu → [{ fraza, cel }]. To jedyne ZEWNĘTRZNE wobec
 * kodu źródło etykiety (CLAUDE.md — treść: content/{pl,en,de}), dlatego
 * T1 porównuje DOM właśnie z nim. Cudzysłów otwierający to U+201E,
 * zamykający ASCII " — asymetria jest w plikach treści, nie pomyłką.
 */
const deklaracjeLinkow = (jezyk: string) =>
  readFileSync(sciezkaTresci(jezyk), "utf8")
    .split(/\n\s*\n/)
    .filter((blok) => blok.trimStart().startsWith("**Linki:**"))
    .flatMap((blok) => [
      ...zwin(blok).matchAll(
        /„([^"]+)"\s*→\s*(\/funkcje\/[a-z-]+#[a-z0-9-]+)/g,
      ),
    ])
    .map(([, fraza, cel]) => ({ fraza, cel }));

for (const { adres, jezyk, prefiks, komunikaty } of PRZYPADKI) {
  const k = komunikaty.DlaKogo as Record<string, string>;

  /** Wartość klucza gotowa do porównania z DOM/treścią: bez znaczników
   *  rich (sN_robi_*) i po podstawieniu {minuty} (s1_robi_1) —
   *  precedens e2e/funkcje-pozyskiwanie.spec.ts. */
  const doPorownania = (klucz: string) =>
    zwin(bezZnacznikow(k[klucz]).replaceAll("{minuty}", MINUTY));

  // (a) T2 — znak w znak messages ↔ content, komplet 28 kluczy.
  test(`dla kogo (${jezyk}): 28 kluczy DlaKogo znak w znak w content/${jezyk}/dla-kogo.md`, () => {
    const zrodlo = zwin(
      readFileSync(join(process.cwd(), `content/${jezyk}/dla-kogo.md`), "utf8"),
    );
    expect(Object.keys(k)).toHaveLength(KLUCZE.length);
    for (const klucz of KLUCZE) {
      const tresc = doPorownania(klucz);
      expect(tresc, `klucz ${klucz} niepusty`).not.toBe("");
      expect(zrodlo, `„${klucz}" znak w znak w pliku treści`).toContain(tresc);
    }
  });

  // (b) T1 — D-D21: ETYKIETA LINKU ZGADZA SIĘ ZE ŹRÓDŁEM TREŚCI.
  //
  // POZORNE ZABEZPIECZENIE, którego tu NIE MA: „etykieta jest podciągiem
  // akapitu, w którym stoi". To zdanie jest prawdziwe ZAWSZE — link jest
  // dzieckiem akapitu, więc textContent akapitu zawiera textContent
  // linku niezależnie od tego, co ktokolwiek wpisze. Asercja, która nie
  // potrafi zaczerwienić, nie jest zabezpieczeniem (ADR-018: brak
  // dowodu = brak zabezpieczenia), więc porównujemy z ZEWNĘTRZNYM
  // źródłem: frazą zadeklarowaną w wierszu „**Linki:**" pliku treści.
  //
  // Fraza jest tam zapisana w formie, w jakiej stoi w zdaniu (PL:
  // „Sali Treningowej", DE: „Einstiegsassistenten" — nie lemat), więc
  // ta asercja łapie zarówno podmianę frazy, jak i zawinięcie w link
  // formy słownikowej, która rozcięłaby wyraz. Własność podciągu
  // wynika z niej i z asercji akapitu — nie trzeba jej pisać osobno.
  test(`D-D21 (${jezyk}): 13 etykiet linków zgadza się z content/${jezyk}/dla-kogo.md na ${adres}`, async ({
    page,
  }) => {
    const deklaracje = deklaracjeLinkow(jezyk);
    expect(
      deklaracje,
      `13 deklaracji „**Linki:**" w content/${jezyk}/dla-kogo.md`,
    ).toHaveLength(LINKI_PROZY.length);

    await page.goto(adres);
    const linki = page.locator('main a[href*="/funkcje/"]');
    await expect(linki).toHaveCount(LINKI_PROZY.length);

    for (const [indeks, link] of LINKI_PROZY.entries()) {
      const element = linki.nth(indeks);
      const deklaracja = deklaracje[indeks];

      await expect(
        element,
        `link ${indeks + 1} (${link.klucz}/${link.znacznik}) celuje w ${link.cel}`,
      ).toHaveAttribute("href", `${prefiks}${link.cel}`);
      expect(
        deklaracja.cel,
        `deklaracja ${indeks + 1} w treści celuje w ${link.cel}`,
      ).toBe(link.cel);

      const etykieta = zwin((await element.textContent()) ?? "");
      expect(
        etykieta,
        `D-D21: etykieta linku ${indeks + 1} (${jezyk}/${link.znacznik}) to fraza sankcjonowana w pliku treści`,
      ).toBe(deklaracja.fraza);

      // Akapit, w którym link fizycznie stoi, jest wartością swojego
      // klucza — czytany z DOM, porównywany z messages.
      const akapit = zwin(
        (await element.evaluate(
          (el) => el.closest("p")?.textContent ?? "",
        )) || "",
      );
      expect(
        akapit,
        `akapit ${link.klucz} zgadza się z messages (${jezyk})`,
      ).toBe(doPorownania(link.klucz));
    }
  });

  // (c) Trzy ścieżki: H2 + kotwica, CO BOLI, akapity, plan, granica.
  test(`dla kogo (${jezyk}): trzy ścieżki kompletne (boli → robi → plan → granica) na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);
    await expect(page.locator("h1")).toHaveText(k.naglowek);
    await expect(page.locator("main h2")).toHaveText(
      SCIEZKI.map((sciezka) => k[`${sciezka.klucz}_h2`]),
    );

    for (const sciezka of SCIEZKI) {
      const sekcja = page.locator(
        `main > section[aria-labelledby="${sciezka.kotwica}"]`,
      );
      await expect(sekcja).toHaveCount(1);
      await expect(sekcja.locator(`h2#${sciezka.kotwica}`)).toHaveCount(1);

      // CO BOLI — ZAWSZE pierwszy akapit po H2 (kontrakt komponentu:
      // rozdział bólu od działania niesie POZYCJA, nie etykieta).
      const akapity = sekcja.locator("> div > p");
      // LICZBA akapitów jest asercją: first()/nth()/last() same z siebie
      // przepuszczają akapit DOPISANY (obietnica bez sankcji treści),
      // bo pozycje 1..N nadal się zgadzają. Człony: CO BOLI + CO ROBI
      // ×N + granica; zdania planu siedzą w zagnieżdżonym <div>.
      await expect(akapity).toHaveCount(sciezka.akapity + 2);
      await expect(akapity.first()).toHaveText(k[`${sciezka.klucz}_boli`]);

      // CO ROBI — akapity 3/2/2 w kolejności treści.
      for (let i = 0; i < sciezka.akapity; i += 1) {
        await expect(akapity.nth(i + 1)).toHaveText(
          doPorownania(`${sciezka.klucz}_robi_${i + 1}`),
        );
      }

      // OD KTÓREGO PLANU — człon ścieżki (NIE PlanJednymWierszem):
      // jedno <p> na zdanie sankcjonowane + osobne <p> z linkiem
      // do cennika. Liczba akapitów planu jest asercją: pełna forma
      // „W planie Growth…" musi zostać własnym zdaniem (rejestr 11).
      const plan = sekcja.locator("> div > div");
      await expect(plan).toHaveCount(1);
      await expect(plan.locator("> p")).toHaveCount(sciezka.zdaniaPlanu + 1);
      const zdania =
        sciezka.zdaniaPlanu === 1
          ? [k[`${sciezka.klucz}_plan`]]
          : Array.from(
              { length: sciezka.zdaniaPlanu },
              (_, i) => k[`${sciezka.klucz}_plan_${i + 1}`],
            );
      for (const [i, zdanie] of zdania.entries()) {
        await expect(plan.locator("> p").nth(i)).toHaveText(zdanie);
      }
      await expect(
        plan.getByRole("link", { name: k.cennikLink, exact: true }),
      ).toHaveAttribute("href", `${prefiks}/cennik`);

      // CZEGO NIE ZAŁATWIA — ostatni akapit sekcji, OBOWIĄZKOWY (D-D3a).
      await expect(akapity.last()).toHaveText(k[`${sciezka.klucz}_granica`]);
    }

    // S5 — K11 wariant krótki.
    await expect(
      page.getByRole("link", { name: k.cta, exact: true }),
    ).toHaveAttribute("href", `${prefiks}/login`);
  });

  // (d) T7 — SPIS TREŚCI: tu JEST (inaczej niż na indeksie /funkcje),
  // bo kotwice ścieżek są celem linków z zewnątrz (D-D20).
  test(`dla kogo (${jezyk}): spis treści z trzema linkami do kotwic ścieżek na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);
    const spis = page.locator(`nav[aria-label="${k.spisEtykieta}"]`);
    await expect(spis).toHaveCount(1);
    await expect(spis.locator("p")).toHaveText(k.spisEtykieta);
    const linki = spis.locator('ol[role="list"] > li > a');
    await expect(linki).toHaveCount(SCIEZKI.length);
    for (const [indeks, sciezka] of SCIEZKI.entries()) {
      await expect(linki.nth(indeks)).toHaveAttribute(
        "href",
        `#${sciezka.kotwica}`,
      );
      await expect(linki.nth(indeks)).toHaveText(k[`${sciezka.klucz}_h2`]);
    }
  });

  // (e) T3 — MILCZENIE na surowym HTML.
  test(`MILCZENIE (${jezyk}): nazwy z tabeli milczenia i rejestru poz. 12 nieobecne w HTML na ${adres}`, async ({
    request,
  }) => {
    const odpowiedz = await request.get(adres);
    expect(odpowiedz.status()).toBe(200);
    const html = (await odpowiedz.text()).toLowerCase();
    for (const fraza of FRAZY_MILCZENIA) {
      expect(html, `HTML nie zawiera „${fraza}"`).not.toContain(fraza);
    }
  });

  // (f) T6 — bez JS: H1, trzy H2, CO BOLI, 13 etykiet linków, zdania
  // planu, granice, CTA zamknięcia w surowym HTML.
  test(`dla kogo bez JS (${jezyk}): komplet treści w surowym HTML na ${adres}`, async ({
    request,
    page,
  }) => {
    const odpowiedz = await request.get(adres);
    expect(odpowiedz.status()).toBe(200);
    // Markup, nie całe ciało — uzasadnienie przy bezSkryptow().
    const html = bezSkryptow(await odpowiedz.text());
    expect(html, "H1 bez JS").toContain(k.naglowek);
    for (const sciezka of SCIEZKI) {
      expect(html, `H2 ${sciezka.klucz} bez JS`).toContain(
        k[`${sciezka.klucz}_h2`],
      );
      expect(html, `CO BOLI ${sciezka.klucz} bez JS`).toContain(
        k[`${sciezka.klucz}_boli`],
      );
      expect(html, `granica ${sciezka.klucz} bez JS`).toContain(
        k[`${sciezka.klucz}_granica`],
      );
    }
    expect(html, "zdanie po CTA bez JS").toContain(k.ctaZdanie);

    // Etykiety linków prozy i ich cele — bez JS, z DOM strony bez
    // skryptów (etykiety mieszkają wewnątrz znaczników rich, więc
    // bierzemy je ze zrenderowanej strony, nie z pliku messages).
    await page.goto(adres);
    const linki = page.locator('main a[href*="/funkcje/"]');
    for (const [indeks, link] of LINKI_PROZY.entries()) {
      const etykieta = zwin((await linki.nth(indeks).textContent()) ?? "");
      expect(html, `etykieta „${etykieta}" (${link.znacznik}) bez JS`).toContain(
        etykieta,
      );
      expect(html, `cel ${link.cel} bez JS`).toContain(link.cel);
    }
  });
}

// (g) T7 — hierarchia nagłówków.
test("dla kogo: 1×h1 i 3×h2 (hierarchia bez przeskoków)", async ({ page }) => {
  await page.goto("/dla-kogo");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("main h2")).toHaveCount(3);
  await expect(page.locator("main h3")).toHaveCount(0);
});

// (h) T4 — kotwica ścieżki pod sticky nav: POMIAR, nie deklaracja.
for (const kotwica of ["budujesz-zespol", "prowadzisz-strukture"] as const) {
  test(`W4: kotwica #${kotwica} w pełni widoczna pod sticky nav (/dla-kogo)`, async ({
    page,
  }) => {
    await page.goto(`/dla-kogo#${kotwica}`);
    const h2 = page.locator(`h2#${kotwica}`);
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
}

// (i) T11 — Tab przez spis (3) i 13 linków prozy bez pułapki fokusu.
test("klawiatura: Tab przechodzi przez spis i 13 linków prozy w kolejności, bez pułapki", async ({
  page,
}) => {
  await page.goto("/dla-kogo");
  const oczekiwane = [
    ...SCIEZKI.map((sciezka) => `#${sciezka.kotwica}`),
    ...LINKI_PROZY.map((link) => link.cel),
  ];

  const odwiedzone: string[] = [];
  const KROKI = 60;
  for (let i = 0; i < KROKI; i += 1) {
    await page.keyboard.press("Tab");
    const adres = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (el === null || el.tagName !== "A") return null;
      return (el as HTMLAnchorElement).getAttribute("href");
    });
    if (adres !== null) odwiedzone.push(adres);
    if (
      odwiedzone.filter((a) => oczekiwane.includes(a)).length ===
      oczekiwane.length
    )
      break;
  }

  const trafione = odwiedzone.filter((adres) => oczekiwane.includes(adres));
  expect(
    trafione,
    "spis i 13 linków prozy osiągalne Tabem w kolejności dokumentu",
  ).toEqual(oczekiwane);

  const obrys = await page.locator(":focus").evaluate((el) => {
    const styl = getComputedStyle(el);
    return { styl: styl.outlineStyle, szerokosc: parseFloat(styl.outlineWidth) };
  });
  expect(obrys.styl, "obrys fokusa na linku prozy").not.toBe("none");
  expect(obrys.szerokosc, "szerokość obrysu fokusa").toBeGreaterThan(0);
});

// (j) T9 — reflow 320 px.
test.describe("reflow 320 px — /dla-kogo", () => {
  test.use({ viewport: { width: 320, height: 700 } });

  test("dla kogo nie panoramuje na 320 px; h1 w kadrze", async ({ page }) => {
    await page.goto("/dla-kogo");
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
