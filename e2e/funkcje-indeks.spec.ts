import { readFileSync } from "node:fs";
import { join } from "node:path";

import { test, expect } from "@playwright/test";

import pl from "../src/i18n/messages/pl.json";
import en from "../src/i18n/messages/en.json";
import de from "../src/i18n/messages/de.json";

/**
 * /funkcje — INDEKS wg zadań dnia (Faza 4, Etap D; treść
 * content/{pl,en,de}/funkcje.md — D-D1…D-D21, protokół
 * docs/faza-4/tresci-etap-d-po-panelach.md; markup wg HF
 * docs/faza-4/hf/d-funkcje-indeks.html po panelu projektu 2026-08-13;
 * wymagania testowe: handoff §6, T2–T9 i T11).
 *
 * Strażnicy ×3 języki: 20 kluczy FunkcjeIndeks znak w znak ↔ content
 * (T2), MILCZENIE agregujące cztery filary + słowo „rozliczenia" (T3,
 * I4 — cztery bloki, nie pięć), kotwica bloku pod sticky nav mierzona
 * geometrycznie (T4), CEL DOTYKOWY pozycji listy mierzony, nie
 * deklarowany (T5), treść bez JS z kompletem 33 etykiet (T6),
 * struktura 1×h1 + 4×h2 + 4×ol[role="list"] o 11/10/6/6 (T7),
 * reflow 320 px (T9), przejście Tab przez 33 pozycje bez pułapki
 * fokusu (T11).
 *
 * SPISU TREŚCI NA TEJ STRONIE NIE MA i to jest asercja, nie
 * przeoczenie: „Na tej stronie" jest stałą PODSTRON funkcji, a indeks
 * sam jest nawigacją (D-D20 doprecyzowane przez właściciela).
 */
const PRZYPADKI = [
  { adres: "/funkcje", jezyk: "pl", prefiks: "", komunikaty: pl },
  { adres: "/en/funkcje", jezyk: "en", prefiks: "/en", komunikaty: en },
  { adres: "/de/funkcje", jezyk: "de", prefiks: "/de", komunikaty: de },
] as const;

/**
 * Cztery bloki — LUSTRO tablicy BLOKI z src/app/[locale]/funkcje/page.tsx.
 * Celowo przepisane, nie zaimportowane: strażnik ma paść, gdy strona
 * zmieni kolejność, kotwicę albo klucz etykiety. Etykiety pozycji
 * mieszkają w przestrzeniach PODSTRON (D-D12) — indeks nie ma
 * własnych kopii tych ciągów.
 */
const BLOKI = [
  {
    klucz: "blok1",
    kotwica: "pozyskiwanie",
    sciezka: "/funkcje/pozyskiwanie",
    przestrzen: "FunkcjePozyskiwanie",
    pozycje: [
      { klucz: "mod1_nazwa", kotwica: "formularz" },
      { klucz: "mod2_nazwa", kotwica: "kalendarz" },
      { klucz: "mod3_nazwa", kotwica: "subskrypcja-kalendarza" },
      { klucz: "mod4_nazwa", kotwica: "eksport-vcard" },
      { klucz: "mod5_nazwa", kotwica: "qr-polecajacy" },
      { klucz: "mod6_nazwa", kotwica: "program-polecen" },
      { klucz: "mod7_nazwa", kotwica: "dmo" },
      { klucz: "mod8_nazwa", kotwica: "zadania" },
      { klucz: "mod9_nazwa", kotwica: "sala-treningowa" },
      { klucz: "mod10_nazwa", kotwica: "plany-rozmow" },
      {
        klucz: "aiNaglowek",
        kotwica: "asystent-ai",
        oznaczenie: "blok1Oznaczenie",
      },
    ],
  },
  {
    klucz: "blok2",
    kotwica: "tresci",
    sciezka: "/funkcje/tresci",
    przestrzen: "FunkcjeTresci",
    pozycje: [
      { klucz: "mod1_nazwa", kotwica: "studio" },
      { klucz: "mod2_nazwa", kotwica: "szablony" },
      { klucz: "mod3_nazwa", kotwica: "hashtagi" },
      { klucz: "mod4_nazwa", kotwica: "kalendarz-publikacji" },
      { klucz: "mod5_nazwa", kotwica: "zatwierdzanie" },
      { klucz: "mod6_nazwa", kotwica: "tarcza" },
      { klucz: "mod7_nazwa", kotwica: "pieczec-etyczna" },
      { klucz: "mod8_nazwa", kotwica: "uczenie-glosu" },
      { klucz: "mod9_nazwa", kotwica: "tablica-postow" },
      {
        klucz: "aiNaglowek",
        kotwica: "asystent-ai",
        oznaczenie: "blok2Oznaczenie",
      },
    ],
  },
  {
    klucz: "blok3",
    kotwica: "zespol",
    sciezka: "/funkcje/zespol",
    przestrzen: "FunkcjeZespol",
    pozycje: [
      { klucz: "mod1_nazwa", kotwica: "kreator-wdrozeniowy" },
      { klucz: "mod2_nazwa", kotwica: "zatwierdzanie-zespolu" },
      { klucz: "mod3_nazwa", kotwica: "pierwsze-90-dni" },
      { klucz: "mod4_nazwa", kotwica: "osiagniecia" },
      { klucz: "mod5_nazwa", kotwica: "paszport-zgodnosci" },
      { klucz: "mod6_nazwa", kotwica: "akademia" },
    ],
  },
  {
    klucz: "blok4",
    kotwica: "wyniki",
    sciezka: "/funkcje/wyniki",
    przestrzen: "FunkcjeWyniki",
    pozycje: [
      { klucz: "mod1_nazwa", kotwica: "pulpit" },
      { klucz: "mod2_nazwa", kotwica: "twoj-wrapped" },
      { klucz: "mod3_nazwa", kotwica: "cel" },
      { klucz: "mod4_nazwa", kotwica: "sciana-sukcesow" },
      { klucz: "mod5_nazwa", kotwica: "swiadectwo" },
      { klucz: "mod6_nazwa", kotwica: "wall-of-proof" },
    ],
  },
] as const;

/** 20 kluczy przestrzeni FunkcjeIndeks — komplet, jak konsumuje je
 *  page.tsx. (Handoff §4.1 mówił pierwotnie „16" — błąd arytmetyczny
 *  poprawiony 2026-08-13: 2 + 4×3 + 2 + 2 = 18. Od 2026-08-14
 *  dochodzą dwa oznaczenia pozycji kierunku: 18 + 2 = 20.) */
const KLUCZE_INDEKSU = [
  "h1",
  "zdanie",
  ...BLOKI.flatMap((blok) => [
    `${blok.klucz}Naglowek`,
    `${blok.klucz}Wprowadzenie`,
    `${blok.klucz}Link`,
    // Oznaczenia WYPROWADZONE z BLOKI, nie wpisane ręcznie: dopisanie
    // oznaczenia do pozycji bez odpowiadającego klucza w messages ma
    // paść tutaj — na komplecie kluczy — a nie dopiero w DOM.
    ...blok.pozycje.flatMap((pozycja) =>
      "oznaczenie" in pozycja ? [pozycja.oznaczenie] : [],
    ),
  ]),
  // F8 ROZBITE 2026-08-14: „wszystko powyżej" nie może
  // kwantyfikować pozycji kierunku. f8_2 wyłącza asystenta AI
  // z imienia; komplet kluczy pilnuje obecności OBU zdań ×3 języki.
  "f8_1",
  "f8_2",
  "f8link",
  "zamkniecieCta",
  "zamkniecieZdanie",
] as const;

/**
 * MILCZENIE (T3). Indeks agreguje zakres CZTERECH podstron, więc jego
 * strażnik jest sumą ich list — plus słowo „rozliczenia": filar 5 nie
 * ma bloku i nie pada w żadnym ciągu widocznym (I4).
 * Literały EN/DE: przekład zachowawczy, jak w strażnikach Etapu C —
 * brzmienia z i18n aplikacji do weryfikacji odrębnym zleceniem Z.
 */
const FRAZY_MILCZENIA = [
  // Filar 1.
  "sekwencje kontaktowe",
  "contact sequences",
  "kontaktsequenzen",
  "blokada osoby",
  "block a person",
  "person blockieren",
  "integracje z kontami social",
  // Filar 2.
  "kapsułka przyszłości",
  "future capsule",
  "zukunftskapsel",
  "elevenlabs",
  "youtube",
  // Filar 3.
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
  // Filar 4.
  "rozkład dochodów",
  "income distribution",
  "einkommensverteilung",
  "uczciwe lustro",
  "honest mirror",
  "ehrlicher spiegel",
  "magic wrapped",
  // Reguły twarde i platformy.
  "thriving lifestyle",
  "forever living",
  "whatsapp",
  "instagram",
  "tiktok",
  "facebook",
  "pinterest",
  // I4 — filar 5 (rozliczenia) NIE MA bloku i słowo nie pada.
  "rozliczenia",
  "settlements",
  "abrechnungen",
] as const;

const zwin = (tekst: string) => tekst.replace(/\s+/g, " ").trim();

/**
 * MARKUP bez skryptów — to, co czytelniczka bez JS naprawdę dostaje.
 *
 * Ciało odpowiedzi Next.js to w ~73% payload RSC upchnięty
 * w `<script>self.__next_f.push(...)</script>` (pomiar na buildzie:
 * /funkcje 28 430 znaków, z tego 20 812 w skryptach). Payload niesie
 * ciągi, których w markupie NIE MA — np. nagłówek strony 404 „Tej
 * strony nie ma." jest w ciele odpowiedzi obu nowych stron.
 * `expect(cialo).toContain(...)` nie dowodzi więc NICZEGO o treści bez
 * JS: przejdzie także wtedy, gdy zdanie zniknie z markupu, a zostanie
 * w propsach. Asercje T6 idą na markup po odcięciu skryptów.
 *
 * ODWROTNIE dla MILCZENIA (`not.toContain`): tam szerszy zakres działa
 * na korzyść — frazy zakazanej nie ma prawa być także w payloadzie,
 * więc ten test zostaje na całym ciele odpowiedzi.
 */
const bezSkryptow = (cialo: string) =>
  cialo.replace(/<script[^>]*>[\s\S]*?<\/script>/g, "");

/**
 * 33 pozycje indeksu ZE ŹRÓDŁA TREŚCI: numerowane wiersze
 * „N. etykieta → /funkcje/x#kotwica" w content/{j}/funkcje.md,
 * w kolejności dokumentu. Wiersz bywa złamany na dwie linie, a przy
 * pozycjach kierunku niesie adnotację `*(pozycja kierunku)*` — jedno
 * i drugie zdejmujemy, bo dotyczy zapisu w markdownie, nie treści.
 */
const pozycjeZTresci = (jezyk: string) => {
  const linie = readFileSync(
    join(process.cwd(), `content/${jezyk}/funkcje.md`),
    "utf8",
  ).split("\n");

  const wpisy: string[] = [];
  let biezacy: string | null = null;
  for (const linia of linie) {
    if (/^\s*\d+\.\s+/.test(linia)) {
      if (biezacy !== null) wpisy.push(biezacy);
      biezacy = linia.replace(/^\s*\d+\.\s+/, "");
    } else if (biezacy !== null) {
      if (linia.trim() === "" || /^\s*#/.test(linia)) {
        wpisy.push(biezacy);
        biezacy = null;
      } else {
        biezacy += ` ${linia}`;
      }
    }
  }
  if (biezacy !== null) wpisy.push(biezacy);

  return wpisy.map((wpis) => {
    // Regex ZAWĘŻONY do jedynej adnotacji, która ma prawo zniknąć.
    // Wariant ogólny `/\*\([^)]*\)\*/g` zdejmowałby KAŻDY nawias
    // kursywą — a wtedy zapisanie członu kierunku w tej formie
    // sprawiłoby, że strażnik przestaje go widzieć i ZOSTAJE ZIELONY.
    // Ślepego strażnika nie poznaje się po przebiegu, więc pułapkę
    // zdejmujemy zawczasu (rekonesans wf_b78294ba-029, poz. 4).
    const tekst = zwin(wpis.replace(/\s*\*\(pozycja kierunku\)\*/g, ""));
    const pary = tekst.match(
      /^(.+?)\s*→\s*(\/funkcje\/[a-z-]+#[a-z0-9-]+)$/,
    );
    // Wiersz nierozpoznany zwracamy jawnie — ma zaczerwienić
    // porównanie, a nie zniknąć z listy jako „zero pozycji".
    return pary
      ? { etykieta: zwin(pary[1]), cel: pary[2] }
      : { etykieta: `NIEROZPOZNANY: ${tekst}`, cel: "" };
  });
};

for (const { adres, jezyk, prefiks, komunikaty } of PRZYPADKI) {
  const k = komunikaty.FunkcjeIndeks as Record<string, string>;

  // (a) T2 — znak w znak messages ↔ content, komplet 20 kluczy.
  // 33 etykiety pozycji NIE wchodzą do tego strażnika: mieszkają
  // w przestrzeniach podstron i pilnują ich strażnicy tamtych stron
  // (D-D12). Tu sprawdzamy je za to w DOM — punkt (c).
  test(`indeks (${jezyk}): ${KLUCZE_INDEKSU.length} kluczy FunkcjeIndeks znak w znak w content/${jezyk}/funkcje.md`, () => {
    const zrodlo = zwin(
      readFileSync(join(process.cwd(), `content/${jezyk}/funkcje.md`), "utf8"),
    );
    expect(Object.keys(k)).toHaveLength(KLUCZE_INDEKSU.length);
    for (const klucz of KLUCZE_INDEKSU) {
      const tresc = zwin(k[klucz]);
      expect(tresc, `klucz ${klucz} niepusty`).not.toBe("");
      expect(zrodlo, `„${klucz}" znak w znak w pliku treści`).toContain(tresc);
    }
  });

  // (a2) PRZYPISANIE klucz → treść, nie sama przynależność do pliku.
  //
  // Strażnik (a) pyta wyłącznie „czy ta fraza gdziekolwiek w pliku
  // występuje" — zamiana wartości MIĘDZY kluczami przechodzi go
  // niezauważona (sprawdzone: podmiana blokNNaglowek 1↔2 zostaje
  // zielona). Etykiety 33 pozycji mają to samo wąskie gardło: pochodzą
  // z przestrzeni podstron, a to, KTÓRA etykieta stoi pod KTÓRYM
  // adresem, jest decyzją indeksu i nie było zakotwiczone nigdzie poza
  // kodem. Zewnętrznym zapisem tego przypisania są numerowane wiersze
  // „N. etykieta → /funkcje/x#kotwica" w pliku treści — i to z nimi
  // porównujemy sekwencję zbudowaną tak, jak buduje ją strona.
  test(`indeks (${jezyk}): 33 pozycje (etykieta + cel) parami z content/${jezyk}/funkcje.md`, () => {
    const zTresci = pozycjeZTresci(jezyk);
    expect(
      zTresci,
      `33 numerowane pozycje w content/${jezyk}/funkcje.md`,
    ).toHaveLength(33);

    const zeStrony = BLOKI.flatMap((blok) => {
      const etykiety = komunikaty[blok.przestrzen] as Record<string, string>;
      return blok.pozycje.map((pozycja) => ({
        etykieta: etykiety[pozycja.klucz],
        cel: `${blok.sciezka}#${pozycja.kotwica}`,
      }));
    });
    expect(zeStrony, "33 pozycje w BLOKI").toHaveLength(33);
    expect(zTresci).toEqual(zeStrony);
  });

  // (b) Nagłówek strony, wprowadzenia bloków, F8 i zamknięcie z messages.
  test(`indeks (${jezyk}): H1, cztery bloki i domknięcie z messages na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);
    await expect(page.locator("h1")).toHaveText(k.h1);
    await expect(page.locator("main h2")).toHaveText(
      BLOKI.map((blok) => k[`${blok.klucz}Naglowek`]),
    );
    for (const blok of BLOKI) {
      const sekcja = page.locator(`main > section[aria-labelledby="${blok.kotwica}"]`);
      await expect(sekcja).toHaveCount(1);
      // Blok ma DOKŁADNIE dwa akapity: wprowadzenie i wejście. Bez tej
      // liczby akapit dopisany między nie przechodzi niezauważony —
      // first() nadal trafia we wprowadzenie.
      await expect(sekcja.locator("> div > p")).toHaveCount(2);
      await expect(sekcja.locator("p").first()).toHaveText(
        k[`${blok.klucz}Wprowadzenie`],
      );
      // Link wejściowy: etykieta BEZ strzałki (D-D10 — „→" dokłada
      // CSS ::after z pustym tekstem alternatywnym), adres w języku.
      const wejscie = sekcja.getByRole("link", {
        name: k[`${blok.klucz}Link`],
        exact: true,
      });
      await expect(wejscie).toHaveAttribute("href", `${prefiks}${blok.sciezka}`);
    }
    await expect(
      page.getByRole("link", { name: k.f8link, exact: true }),
    ).toHaveAttribute("href", `${prefiks}/cennik`);
    await expect(
      page.getByRole("link", { name: k.zamkniecieCta, exact: true }),
    ).toHaveAttribute("href", `${prefiks}/login`);

    // D-D20: „Na tej stronie" jest stałą PODSTRON — na indeksie GO NIE MA.
    await expect(
      page.locator(`nav[aria-label="${komunikaty.FunkcjePozyskiwanie.spisEtykieta}"]`),
    ).toHaveCount(0);
  });

  // (c) T7 + D-D12 — cztery listy 11/10/6/6; każda pozycja niesie
  // etykietę REUŻYTĄ z przestrzeni podstrony docelowej i celuje
  // w kotwicę tej podstrony (slug wspólny ×3 języki).
  test(`indeks (${jezyk}): 33 pozycje w czterech listach, etykiety z przestrzeni podstron na ${adres}`, async ({
    page,
  }) => {
    await page.goto(adres);
    const listy = page.locator('main ol[role="list"]');
    await expect(listy).toHaveCount(BLOKI.length);

    for (const [indeksBloku, blok] of BLOKI.entries()) {
      const etykiety = komunikaty[blok.przestrzen] as Record<string, string>;
      const linki = listy.nth(indeksBloku).locator("> li > a");
      await expect(linki).toHaveCount(blok.pozycje.length);
      for (const [indeks, pozycja] of blok.pozycje.entries()) {
        const link = linki.nth(indeks);
        // Pozycja kierunku niesie OZNACZENIE sklejone z etykietą
        // w jeden węzeł tekstowy (panel 2026-08-14, forma L1-A).
        // Porównujemy CAŁY tekst linku, więc zniknięcie członu,
        // zgubiony odstęp i podmiana obszaru czerwienią się tak samo.
        await expect(link).toHaveText(
          "oznaczenie" in pozycja
            ? `${etykiety[pozycja.klucz]} ${k[pozycja.oznaczenie]}`
            : etykiety[pozycja.klucz],
        );
        await expect(link).toHaveAttribute(
          "href",
          `${prefiks}${blok.sciezka}#${pozycja.kotwica}`,
        );
      }
    }
  });

  // (d) T3 — MILCZENIE na surowym HTML (suma czterech filarów + I4).
  test(`MILCZENIE (${jezyk}): nazwy z tabeli milczenia i „rozliczenia" nieobecne w HTML na ${adres}`, async ({
    request,
  }) => {
    const odpowiedz = await request.get(adres);
    expect(odpowiedz.status()).toBe(200);
    const html = (await odpowiedz.text()).toLowerCase();
    for (const fraza of FRAZY_MILCZENIA) {
      expect(html, `HTML nie zawiera „${fraza}"`).not.toContain(fraza);
    }
  });

  // (e) T6 — bez JS: H1, cztery H2, KOMPLET 33 etykiet, F8, CTA.
  test(`indeks bez JS (${jezyk}): H1, 4×H2, 33 etykiety i domknięcie w surowym HTML na ${adres}`, async ({
    request,
  }) => {
    const odpowiedz = await request.get(adres);
    expect(odpowiedz.status()).toBe(200);
    // Markup, nie całe ciało — uzasadnienie przy bezSkryptow().
    const html = bezSkryptow(await odpowiedz.text());
    expect(html, "H1 bez JS").toContain(k.h1);
    for (const blok of BLOKI) {
      expect(html, `H2 ${blok.klucz} bez JS`).toContain(
        k[`${blok.klucz}Naglowek`],
      );
      expect(html, `wprowadzenie ${blok.klucz} bez JS`).toContain(
        k[`${blok.klucz}Wprowadzenie`],
      );
      const etykiety = komunikaty[blok.przestrzen] as Record<string, string>;
      for (const pozycja of blok.pozycje) {
        expect(
          html,
          `etykieta ${blok.klucz}/${pozycja.klucz} bez JS`,
        ).toContain(etykiety[pozycja.klucz]);
        // Człon kierunku jest treścią WIDOCZNĄ, więc obejmuje go
        // bramka „treść czytelna bez JS". Sama etykieta przechodzi
        // toContain także wtedy, gdy członu w HTML nie ma — dowód
        // musi żądać ciągu SKLEJONEGO. Możliwe to jest wyłącznie
        // dlatego, że sklejenie idzie w JEDEN węzeł tekstowy:
        // dwa sąsiednie wyrażenia JSX rozdzieliłby w SSR komentarz
        // <!-- -->, a wtedy tej asercji nie dałoby się napisać.
        if ("oznaczenie" in pozycja) {
          expect(
            html,
            `oznaczenie ${blok.klucz}/${pozycja.klucz} bez JS`,
          ).toContain(`${etykiety[pozycja.klucz]} ${k[pozycja.oznaczenie]}`);
        }
        expect(
          html,
          `kotwica docelowa #${pozycja.kotwica} bez JS`,
        ).toContain(`${blok.sciezka}#${pozycja.kotwica}`);
      }
    }
    expect(html, "F8 zdanie 1 bez JS").toContain(k.f8_1);
    // Wyłączenie pozycji kierunku jest treścią widoczną, więc
    // wchodzi do bramki „treść czytelna bez JS" na równi z resztą.
    expect(html, "F8 zdanie 2 (wyłączenie) bez JS").toContain(k.f8_2);
    expect(html, "zdanie zamknięcia bez JS").toContain(k.zamkniecieZdanie);
  });
}

// (f) T7 — hierarchia nagłówków niezależna od języka.
test("indeks: 1×h1 i 4×h2 (hierarchia bez przeskoków)", async ({ page }) => {
  await page.goto("/funkcje");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("main h2")).toHaveCount(4);
  await expect(page.locator("main h3")).toHaveCount(0);
});

// (g) T4 — kotwica bloku pod sticky nav: POMIAR, nie deklaracja.
// „scroll-margin-block-start: 5rem" w CSS nie jest dowodem.
for (const kotwica of ["tresci", "wyniki"] as const) {
  test(`W4: kotwica #${kotwica} w pełni widoczna pod sticky nav (/funkcje)`, async ({
    page,
  }) => {
    await page.goto(`/funkcje#${kotwica}`);
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

// (h) T5 — CEL DOTYKOWY pozycji listy (2.5.8 AA, 24×24 px).
// Panel poprawił makietę właśnie na tym punkcie: mój wcześniejszy
// pomiar („≈ 44 px") był błędny. Test pilnuje WARTOŚCI, nie deklaracji
// — mierzy każdą z 33 pozycji i sprawdza, że sąsiedzi się nie nakładają.
test("2.5.8: każda z 33 pozycji indeksu ma cel ≥ 34 px i nie nakłada się na sąsiada", async ({
  page,
}) => {
  await page.goto("/funkcje");
  const listy = page.locator('main ol[role="list"]');

  for (const [indeksBloku, blok] of BLOKI.entries()) {
    const linki = listy.nth(indeksBloku).locator("> li > a");
    await expect(linki).toHaveCount(blok.pozycje.length);

    let poprzednia: { y: number; height: number } | null = null;
    for (let i = 0; i < blok.pozycje.length; i += 1) {
      const ramka = await linki.nth(i).boundingBox();
      expect(ramka, `pozycja ${blok.klucz}/${i + 1} ma ramkę`).not.toBeNull();
      // Próg 24 px to minimum normy (2.5.8 AA), ale decyzją panelu
      // (rozstrzygnięcie 6) cel budujemy paddingiem samego <a>:
      // 24 px wiersza + 2 × 5 px = 34 px. Przy progu 24 skasowanie
      // padding-block zostaje zielone — mierzymy więc wartość decyzji,
      // nie wartość normy.
      expect(
        ramka!.height,
        `wysokość celu ${blok.klucz}/${i + 1} — 24 px wiersza + 2×5 px paddingu (rozstrzygnięcie 6; norma 2.5.8 AA żąda 24)`,
      ).toBeGreaterThanOrEqual(34);
      if (poprzednia !== null) {
        expect(
          ramka!.y,
          `pozycja ${blok.klucz}/${i + 1} nie nakłada się na poprzednią`,
        ).toBeGreaterThanOrEqual(poprzednia.y + poprzednia.height);
      }
      poprzednia = { y: ramka!.y, height: ramka!.height };
    }
  }
});

// (i) T11 — przejście Tab przez 33 pozycje bez pułapki fokusu.
// Zbieramy sekwencję adresów odwiedzonych fokusem i sprawdzamy, że
// zawiera 33 cele W KOLEJNOŚCI dokumentu. Limit kroków jest
// zabezpieczeniem przed pułapką: pętla kończy się sama.
test("klawiatura: Tab przechodzi przez 33 pozycje indeksu w kolejności, bez pułapki", async ({
  page,
}) => {
  await page.goto("/funkcje");
  const oczekiwane = BLOKI.flatMap((blok) =>
    blok.pozycje.map((pozycja) => `${blok.sciezka}#${pozycja.kotwica}`),
  );

  const odwiedzone: string[] = [];
  const KROKI = 80;
  for (let i = 0; i < KROKI; i += 1) {
    await page.keyboard.press("Tab");
    const adres = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (el === null || el.tagName !== "A") return null;
      return (el as HTMLAnchorElement).getAttribute("href");
    });
    if (adres !== null) odwiedzone.push(adres);
    if (odwiedzone.filter((a) => oczekiwane.includes(a)).length === oczekiwane.length)
      break;
  }

  const trafione = odwiedzone.filter((adres) => oczekiwane.includes(adres));
  expect(
    trafione,
    "33 pozycje osiągalne Tabem w kolejności dokumentu",
  ).toEqual(oczekiwane);

  // Fokus widoczny na ostatniej osiągniętej pozycji (obrys niepusty).
  const obrys = await page.locator(":focus").evaluate((el) => {
    const styl = getComputedStyle(el);
    return { styl: styl.outlineStyle, szerokosc: parseFloat(styl.outlineWidth) };
  });
  expect(obrys.styl, "obrys fokusa na pozycji listy").not.toBe("none");
  expect(obrys.szerokosc, "szerokość obrysu fokusa").toBeGreaterThan(0);
});

// (j) T9 — reflow 320 px: bez panoramy poziomej, h1 w kadrze.
test.describe("reflow 320 px — /funkcje", () => {
  test.use({ viewport: { width: 320, height: 700 } });

  test("indeks nie panoramuje na 320 px; h1 w kadrze", async ({ page }) => {
    await page.goto("/funkcje");
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
