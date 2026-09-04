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
 * /funkcje/zespol — podstrona filara 3 na szablonie K12 (Faza 4,
 * Etap C; treść content/{pl,en,de}/funkcje-zespol.md — D-C1…D-C5,
 * protokół docs/faza-4/tresci-trzy-podstrony-po-panelach.md).
 * Stos F1–F11: okruszki → nagłówek podstrony → SPIS TREŚCI → 6
 * modułów DZIAŁA (zebra L-P jak K4) → F8 WIELOCZĘŚCIOWY (wariant
 * F8-A panelu: trzy zdania VERBATIM, pełne formy „W planie Growth…"
 * ×2 — każde zdanie niesie kwalifikator samodzielnie; Puls zespołu
 * i Drzewo struktury NIE są modułami — żyją wyłącznie w F8) → F9
 * przejścia w obu kierunkach (wstecz: Treści, dalej: Wyniki) → F10
 * zamknięcie (K11 krótki); stopka z layoutu. Prerender SSG per
 * locale; hierarchia: 1×h1 + 6×h2. Bez sekcji kierunku. Zero JS.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Kotwice modułów = sluggi z PL content (cele linków spisu treści
// i indeksu /funkcje w Etapie D); kolejność = kolejność modułów 1–6.
const MODULY = [
  { klucz: "mod1", kotwica: "kreator-wdrozeniowy" },
  { klucz: "mod2", kotwica: "zatwierdzanie-zespolu" },
  { klucz: "mod3", kotwica: "pierwsze-90-dni" },
  { klucz: "mod4", kotwica: "osiagniecia" },
  { klucz: "mod5", kotwica: "paszport-zgodnosci" },
  { klucz: "mod6", kotwica: "akademia" },
] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaFunkcjeZespol({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("FunkcjeZespol");
  const tNawigacja = await getTranslations("Nawigacja");

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/funkcje/zespol" />
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
        {/* F3–F7 — 6 modułów DZIAŁA. Zebra ZDJĘTA (ADR-058): wszystkie
            cztery bloki feature wzorca mają tekst po lewej na każdym
            kadrze — pomiar, nie przyzwyczajenie. */}
        {MODULY.map(({ klucz, kotwica }) => (
          <ModulFunkcji
            key={kotwica}
            naglowek={t(`${klucz}_nazwa`)}
            idNaglowka={kotwica}
            poCo={t(`${klucz}_poco`)}
            granica={t(`${klucz}_nie`)}
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
        {/* F8 wieloczęściowy — rejestr poz. 11 (brief, Uzupełnienie C):
            Starter + 2× pełna forma „W planie Growth…" bez nazw
            „Puls zespołu"/„Drzewo struktury"; zero liczb. */}
        <PlanJednymWierszem
          zdania={[t("f8_1"), t("f8_2"), t("f8_3")]}
          linkEtykieta={t("f8link")}
          linkHref={adresWJezyku(locale as Locale, "/cennik")}
        />
        <PrzejsciaFilarow
          locale={locale as Locale}
          wstecz={{ etykieta: t("f9Wstecz"), sciezka: "/funkcje/tresci" }}
          dalej={{ etykieta: t("f9Dalej"), sciezka: "/funkcje/wyniki" }}
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
