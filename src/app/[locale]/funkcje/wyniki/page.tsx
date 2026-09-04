import { getTranslations, setRequestLocale } from "next-intl/server";

import { ModulFunkcji } from "@/components/ModulFunkcji";
import { NaglowekPodstrony } from "@/components/NaglowekPodstrony";
import { Nawigacja } from "@/components/Nawigacja";
import { Okruszki } from "@/components/Okruszki";
import { PlanJednymWierszem } from "@/components/PlanJednymWierszem";
import { PrzejsciaFilarow } from "@/components/PrzejsciaFilarow";
import { SpisTresci } from "@/components/SpisTresci";
import { Zamkniecie } from "@/components/Zamkniecie";
import { routing } from "@/i18n/routing";
import { adresWJezyku, type Locale } from "@/i18n/sciezki";

/**
 * /funkcje/wyniki — podstrona filara 4 na szablonie K12 (Faza 4,
 * Etap C; treść content/{pl,en,de}/funkcje-wyniki.md — D-C1…D-C5,
 * protokół docs/faza-4/tresci-trzy-podstrony-po-panelach.md).
 * Stos F1–F11: okruszki → nagłówek podstrony → SPIS TREŚCI → 6
 * modułów DZIAŁA (zebra L-P jak K4) → F8 DWUZDANIOWE (rejestr poz.
 * 11: Starter + pełna forma „W planie Growth…" bez nazwy „Puls
 * zespołu"; zero liczb) → F9: wstecz Zespół, prawy slot PUSTY —
 * ostatni filar (lustro pustego lewego slotu /pozyskiwanie) → F10
 * zamknięcie (K11 krótki); stopka z layoutu. Prerender SSG per
 * locale; hierarchia: 1×h1 + 6×h2. Bez sekcji kierunku. Zero JS.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Kotwice modułów = sluggi z PL content (cele linków spisu treści
// i indeksu /funkcje w Etapie D); kolejność = kolejność modułów 1–6
// treści OBOWIĄZUJĄCEJ (Świadectwo przed Wall of Proof).
const MODULY = [
  { klucz: "mod1", kotwica: "pulpit" },
  { klucz: "mod2", kotwica: "twoj-wrapped" },
  { klucz: "mod3", kotwica: "cel" },
  { klucz: "mod4", kotwica: "sciana-sukcesow" },
  { klucz: "mod5", kotwica: "swiadectwo" },
  { klucz: "mod6", kotwica: "wall-of-proof" },
] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaFunkcjeWyniki({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("FunkcjeWyniki");
  const tNawigacja = await getTranslations("Nawigacja");

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/funkcje/wyniki" />
      <main id="tresc">
        <Okruszki
          ariaEtykieta={t("okruszkiAria")}
          pozycje={[
            {
              etykieta: tNawigacja("funkcje"),
              href: adresWJezyku(locale as Locale, "/funkcje"),
            },
            { etykieta: t("okruszek") },
          ]}
        />
        <NaglowekPodstrony naglowek={t("naglowek")} zdanie={t("zdanie")} />
        <SpisTresci
          etykieta={t("spisEtykieta")}
          pozycje={MODULY.map(({ klucz, kotwica }) => ({
            etykieta: t(`${klucz}_nazwa`),
            kotwica,
          }))}
        />
        {/* F3–F7 — 6 modułów DZIAŁA; zebra jak K4 (moduły nieparzyste
            obraz po prawej, parzyste po lewej). */}
        {MODULY.map(({ klucz, kotwica }) => (
          <ModulFunkcji
            key={kotwica}
            naglowek={t(`${klucz}_nazwa`)}
            idNaglowka={kotwica}
            poCo={t(`${klucz}_poco`)}
            granica={t(`${klucz}_nie`)}
            /* Kadr A w module 1; kadr B tej podstrony idzie PASEM
               szerokości niżej, nie w ramce modułu (WWW/045). */
            /* ⚠ KADRY FALI 1 ZDJĘTE Z RENDERU — decyzja właściciela
               rozszerzona delegacją (WWW/083): „zero zrzutów aplikacji"
               obejmuje CAŁY serwis, nie samą główną. Pliki ZOSTAJĄ
               w `public/obrazy/fala1/` nietknięte, klucze alt ZOSTAJĄ
               w i18n — schodzi wyłącznie osadzenie. W miejsce kadru
               wchodzi SLOT-FOTO mechaniką z ADR-052: ramka trzyma
               rezerwę CLS przez `aspect-ratio`, jest `aria-hidden`
               i czeka na fotografię, nie na zrzut. */
          />
        ))}
        {/* ⚠ PAS SZEROKOŚCI ZDJĘTY — ta sama decyzja co przy kadrach
            w modułach (WWW/083): „zero zrzutów aplikacji" obejmuje cały
            serwis. Kadr `wyniki-B-21x9.avif` ZOSTAJE w repozytorium,
            klucz `wynikiB` ZOSTAJE w i18n — schodzi wyłącznie osadzenie.
            Slotu w to miejsce NIE wstawiam: pas był dekoracją pełnej
            szerokości, a nie ramką z rezerwą, więc pusta ramka udawałaby
            miejsce na coś, o czym nikt nie zdecydował.
            Stało tu: <figure className="pas-obrazu"> z <img> 1920×1080,
            loading lazy, fetchPriority low, alt z klucza `wynikiB`. */}
        {/* F8 dwuzdaniowe — rejestr poz. 11 (brief, Uzupełnienie C):
            zdanie Growth VERBATIM, celowo BEZ nazwy „Puls zespołu". */}
        <PlanJednymWierszem
          zdania={[t("f8_1"), t("f8_2")]}
          linkEtykieta={t("f8link")}
          linkHref={adresWJezyku(locale as Locale, "/cennik")}
        />
        {/* F9 — ostatni filar: tylko wstecz (prawy slot pusty,
            lustro /pozyskiwanie). */}
        <PrzejsciaFilarow
          locale={locale as Locale}
          wstecz={{ etykieta: t("f9Wstecz"), sciezka: "/funkcje/zespol" }}
        />
        {/* F10 — K11 wariant krótki: CTA → /login (ADR-023). */}
        <Zamkniecie
          ctaEtykieta={t("zamkniecieCta")}
          ctaHref={adresWJezyku(locale as Locale, "/login")}
          zdaniePo={t("zamkniecieZdanie")}
        />
      </main>
    </>
  );
}
