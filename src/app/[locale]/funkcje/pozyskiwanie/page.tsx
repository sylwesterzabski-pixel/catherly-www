import { getTranslations, setRequestLocale } from "next-intl/server";

import fakty from "../../../../../content/facts.json";
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
 * /funkcje/pozyskiwanie — wzorcowa podstrona funkcji K12 (Faza 4,
 * Etap B; markup wg HF docs/faza-4/hf/k12-funkcje-pozyskiwanie.html,
 * po panelu 2026-08-12; treść content/{pl,en,de}/funkcje-pozyskiwanie.md
 * — D-B1/D-B2). Stos F1–F11: okruszki → nagłówek podstrony → 10 modułów
 * DZIAŁA (zebra L-P jak K4) → sekcja kierunku AI → F8 plan jednym
 * wierszem → F9 przejścia → F10 zamknięcie (K11 krótki); stopka
 * z layoutu. Retro Etapu C (brief, Uzupełnienie C + D-C4): SPIS
 * TREŚCI nad pierwszym modułem; przejście F9 „Dalej: Treści →"
 * obecne, odkąd /funkcje/tresci istnieje w rejestrze ścieżek.
 * Prerender SSG per locale; hierarchia: 1×h1 + 11×h2 (10 modułów
 * + kierunek). Zero JS.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Kotwice modułów = sluggi z content (cele linków z indeksu /funkcje
// w Etapie D); kolejność = kolejność modułów 1–10 treści.
const MODULY = [
  { klucz: "mod1", kotwica: "formularz" },
  { klucz: "mod2", kotwica: "kalendarz" },
  { klucz: "mod3", kotwica: "subskrypcja-kalendarza" },
  { klucz: "mod4", kotwica: "eksport-vcard" },
  { klucz: "mod5", kotwica: "qr-polecajacy" },
  { klucz: "mod6", kotwica: "program-polecen" },
  { klucz: "mod7", kotwica: "dmo" },
  { klucz: "mod8", kotwica: "zadania" },
  { klucz: "mod9", kotwica: "sala-treningowa" },
  { klucz: "mod10", kotwica: "plany-rozmow" },
] as const;

// „30 minut" modułu 2 — WYŁĄCZNIE z facts.json (D-B3; linter liczb).
const MINUTY_PRZYPOMNIENIA =
  fakty.fakty["przypomnienie-kalendarza-minuty"].wartosc;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaFunkcjePozyskiwanie({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("FunkcjePozyskiwanie");
  const tNawigacja = await getTranslations("Nawigacja");

  return (
    <>
      <Nawigacja
        locale={locale as Locale}
        biezacaSciezka="/funkcje/pozyskiwanie"
      />
      <main id="tresc">
        {/* F1b — okruszki: „Funkcje → Pozyskiwanie"; etykieta rodzica
            wspólna z menu (Nawigacja.funkcje), bieżąca strona tekstem
            z aria-current="page" (rozstrzygnięcie 1 panelu). */}
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
        {/* SPIS TREŚCI — retro Etapu C (brief, Uzupełnienie C; etykieta
            D-C4 wspólna ×4): wyłącznie kotwice modułów, sekcja
            kierunku AI poza spisem. */}
        <SpisTresci
          etykieta={t("spisEtykieta")}
          pozycje={MODULY.map(({ klucz, kotwica }) => ({
            etykieta: t(`${klucz}_nazwa`),
            kotwica,
          }))}
        />
        {/* F3–F7 — 10 modułów DZIAŁA; zebra jak K4 (rozstrzygnięcie 3):
            moduły nieparzyste obraz po prawej, parzyste po lewej.
            {minuty} interpoluje wartość z facts.json (tylko mod2_poco
            używa placeholderu; nadmiarowa wartość jest ignorowana). */}
        {MODULY.map(({ klucz, kotwica }) => (
          <ModulFunkcji
            key={kotwica}
            naglowek={t(`${klucz}_nazwa`)}
            idNaglowka={kotwica}
            poCo={t(`${klucz}_poco`, { minuty: MINUTY_PRZYPOMNIENIA })}
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
        {/* Sekcja kierunku AI (D-B2) — po module 10, przed F8;
            kotwica #asystent-ai wchodzi (rozstrzygnięcie 5).
            OZNACZENIE (2026-08-14): odpowiednik członu z indeksu.
            Konieczny, bo #asystent-ai jest kontraktem publicznym —
            wejście bezpośrednie fragmentem omija indeks, a sama sekcja
            swojego statusu nie nazywa. Symetrii pilnuje S-SYMETRIA. */}
        <SekcjaKierunku
          naglowek={t("aiNaglowek")}
          idNaglowka="asystent-ai"
          tresc={t("aiTresc")}
          granica={t("aiGranica")}
          oznaczenie={t("aiOznaczenie")}
        />
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
        {/* F9 — pierwszy filar: lewy slot pusty; przejście „Dalej:
            Treści →" AKTYWNE od Etapu C (cel w rejestrze ścieżek —
            bramka linków w komponencie). */}
        <PrzejsciaFilarow
          locale={locale as Locale}
          dalej={{ etykieta: t("dalej"), sciezka: "/funkcje/tresci" }}
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
