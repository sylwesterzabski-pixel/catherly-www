import { getTranslations, setRequestLocale } from "next-intl/server";

import { ModulFunkcji } from "@/components/ModulFunkcji";
import { NaglowekPodstrony } from "@/components/NaglowekPodstrony";
import { Nawigacja } from "@/components/Nawigacja";
import { Okruszki } from "@/components/Okruszki";
import { PlanJednymWierszem } from "@/components/PlanJednymWierszem";
import { PrzejsciaFilarow } from "@/components/PrzejsciaFilarow";
import { SekcjaKierunku } from "@/components/SekcjaKierunku";
import { SpisTresci } from "@/components/SpisTresci";
import { Zamkniecie } from "@/components/Zamkniecie";
import { routing } from "@/i18n/routing";
import { adresWJezyku, type Locale } from "@/i18n/sciezki";

/**
 * /funkcje/tresci — podstrona filara 2 na szablonie K12 (Faza 4,
 * Etap C; treść content/{pl,en,de}/funkcje-tresci.md — D-C1…D-C5,
 * protokół docs/faza-4/tresci-trzy-podstrony-po-panelach.md).
 * Stos F1–F11: okruszki → nagłówek podstrony → SPIS TREŚCI (element
 * standardowy szablonu — brief, Uzupełnienie C) → 9 modułów (moduł 1
 * Studio w WARIANCIE KIERUNKU — wyjątek F4-2: język kierunku, BEZ
 * slotu zrzutu, mimo statusu DZIAŁA; pozostałe DZIAŁA z zebrą L-P
 * jak K4) → sekcja kierunku AI → F8 (verbatim z wzorcowej, zero
 * liczb) → F9 przejścia w OBU kierunkach (wstecz: Pozyskiwanie,
 * dalej: Zespół) → F10 zamknięcie (K11 krótki); stopka z layoutu.
 * Prerender SSG per locale; hierarchia: 1×h1 + 10×h2 (9 modułów +
 * kierunek AI). Zero JS.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Kotwice modułów = sluggi z PL content (cele linków spisu treści
// i indeksu /funkcje w Etapie D); kolejność = kolejność modułów 1–9.
const MODULY = [
  { klucz: "mod1", kotwica: "studio" },
  { klucz: "mod2", kotwica: "szablony" },
  { klucz: "mod3", kotwica: "hashtagi" },
  { klucz: "mod4", kotwica: "kalendarz-publikacji" },
  { klucz: "mod5", kotwica: "zatwierdzanie" },
  { klucz: "mod6", kotwica: "tarcza" },
  { klucz: "mod7", kotwica: "pieczec-etyczna" },
  { klucz: "mod8", kotwica: "uczenie-glosu" },
  { klucz: "mod9", kotwica: "tablica-postow" },
] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaFunkcjeTresci({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("FunkcjeTresci");
  const tNawigacja = await getTranslations("Nawigacja");

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/funkcje/tresci" />
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
        {/* SPIS TREŚCI — wyłącznie kotwice modułów (sekcja kierunku AI
            poza spisem — litera briefu, Uzupełnienie C). */}
        <SpisTresci
          etykieta={t("spisEtykieta")}
          pozycje={MODULY.map(({ klucz, kotwica }) => ({
            etykieta: t(`${klucz}_nazwa`),
            kotwica,
          }))}
        />
        {/* Moduł 1 Studio — WARIANT KIERUNKU (wyjątek F4-2; brief,
            Uzupełnienie C + D-C5): BEZ slotu zrzutu do przebudowy
            wariant C aplikacji; status obietnicy DZIAŁA bez zmian.
            DLATEGO BEZ propu `oznaczenie` — forma karty jest tu skutkiem
            braku zrzutu, nie statusu obietnicy (K-D5). Dopisanie tu
            oznaczenia zaczerwieni S-SYMETRIA: na indeksie pozycja `studio`
            oznaczenia nie niesie i nieść nie ma. */}
        <SekcjaKierunku
          naglowek={t("mod1_nazwa")}
          idNaglowka={MODULY[0].kotwica}
          tresc={t("mod1_poco")}
          granica={t("mod1_nie")}
        />
        {/* F3–F7 — moduły 2–9 DZIAŁA; zebra jak K4 liczona po modułach
            z obrazem (nieparzyste obraz po prawej). */}
        {MODULY.slice(1).map(({ klucz, kotwica }, indeks) => (
          <ModulFunkcji
            key={kotwica}
            naglowek={t(`${klucz}_nazwa`)}
            idNaglowka={kotwica}
            poCo={t(`${klucz}_poco`)}
            granica={t(`${klucz}_nie`)}
            obrazPoLewej={indeks % 2 === 1}
          />
        ))}
        {/* Sekcja kierunku AI — po ostatnim module, przed F8; H2
            z wzorcowej podstrony (×4 wygrywa wzorzec — content w. 133).
            OZNACZENIE (2026-08-14) — jak na wzorcowej podstronie;
            odpowiednik członu z indeksu, pilnowany przez S-SYMETRIA. */}
        <SekcjaKierunku
          naglowek={t("aiNaglowek")}
          idNaglowka="asystent-ai"
          tresc={t("aiTresc")}
          granica={t("aiGranica")}
          oznaczenie={t("aiOznaczenie")}
        />
        {/* F8 — verbatim z wzorcowej podstrony, ZERO liczb (limit
            postów wolno pokazać wyłącznie na /cennik). */}
        {/* F8 rozbite na dwa zdania 2026-08-14 (rozstrzygnięcie
            właściciela + mini-panel treści): „wszystko powyżej" nie
            może kwantyfikować pozycji kierunku, bo asystenta AI nie
            ma w żadnym planie (content/pl/cennik.md — wiersz
            WYKLUCZONE, „wywołania AI (klucz pusty)"). f8_1 zostaje
            ZNAK W ZNAK formułą korpusu stojącą w pięciu nietkniętych
            miejscach; f8_2 wyłącza pozycję z imienia. Gałąź `zdania`
            istniała wcześniej — /funkcje/zespol i /funkcje/wyniki. */}
        <PlanJednymWierszem
          zdania={[t("f8_1"), t("f8_2")]}
          linkEtykieta={t("f8link")}
          linkHref={adresWJezyku(locale as Locale, "/cennik")}
        />
        {/* F9 — oba kierunki (brief, Uzupełnienie C): wstecz →
            Pozyskiwanie, dalej → Zespół; bramka linków od rejestru. */}
        <PrzejsciaFilarow
          locale={locale as Locale}
          wstecz={{
            etykieta: t("f9Wstecz"),
            sciezka: "/funkcje/pozyskiwanie",
          }}
          dalej={{ etykieta: t("f9Dalej"), sciezka: "/funkcje/zespol" }}
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
