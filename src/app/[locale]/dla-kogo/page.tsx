import type { ReactNode } from "react";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { NaglowekPodstrony } from "@/components/NaglowekPodstrony";
import { Nawigacja } from "@/components/Nawigacja";
import { SciezkaRozpoznania } from "@/components/SciezkaRozpoznania";
import { SpisTresci } from "@/components/SpisTresci";
import { Zamkniecie } from "@/components/Zamkniecie";
import { routing } from "@/i18n/routing";
import { adresWJezyku, type Locale } from "@/i18n/sciezki";
import fakty from "../../../../content/facts.json";

/**
 * /dla-kogo — TRZY ŚCIEŻKI ROZPOZNANIA (Faza 4, Etap D; treść
 * content/{pl,en,de}/dla-kogo.md — D-D1…D-D21, protokół
 * docs/faza-4/tresci-etap-d-po-panelach.md; markup wg HF
 * docs/faza-4/hf/d-dla-kogo.html po panelu projektu 2026-08-13,
 * handoff docs/faza-4/komponenty/handoff-etap-d.md).
 *
 * Stos S1–S5: nawigacja (BEZ okruszków — D-D2a) → nagłówek podstrony →
 * SPIS TREŚCI (inaczej niż indeks /funkcje: kotwice ścieżek są celem
 * linków z zewnątrz, a strona sama nawigacją nie jest — D-D20) → trzy
 * ścieżki → S5 zamknięcie (K11 krótki); stopka z layoutu.
 *
 * Strona nie sprzedaje segmentom: trzy ścieżki są RÓWNOLEGŁE, nie są
 * etapami drogi — dlatego nie ma licznika ani numeracji (rozstrzygnięcie
 * 6 panelu). Prerender SSG per locale; hierarchia 1×h1 + 3×h2. Zero JS.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// „30 minut" w s1_robi_1 — WYŁĄCZNIE z facts.json (D-B3; literał w JSX
// nie przejdzie lintera liczb). Wstawka ICU {minuty} w kluczu messages.
const MINUTY_PRZYPOMNIENIA =
  fakty.fakty["przypomnienie-kalendarza-minuty"].wartosc;

/**
 * Kotwice ścieżek — KONTRAKT PUBLICZNY (D-D14): identyczne w pl/en/de,
 * bo next-intl nie lokalizuje segmentów, a linki z zewnątrz celują
 * w jeden slug. Kolejność = kolejność sekcji i kolejność spisu treści.
 */
const SCIEZKI = [
  { klucz: "s1", kotwica: "pracujesz-sama", akapity: 3, zdaniaPlanu: 1 },
  { klucz: "s2", kotwica: "budujesz-zespol", akapity: 2, zdaniaPlanu: 2 },
  { klucz: "s3", kotwica: "prowadzisz-strukture", akapity: 2, zdaniaPlanu: 3 },
] as const;

/**
 * 13 LINKÓW W PROZIE (D-D21) — jedyny nowy mechanizm etapu.
 *
 * Nazwy znaczników są SEMANTYCZNE (cel linku), nie porządkowe: w EN i DE
 * szyk zdania bywa inny, więc <link1> przypisałby adres do niewłaściwej
 * frazy. Ta mapa jest wspólna dla trzech języków; różni się wyłącznie
 * tekst wewnątrz znacznika, który mieszka w messages.
 *
 * Reguła kontraktowa: etykieta linku MUSI być dokładnym podciągiem
 * akapitu, w którym stoi — w KAŻDYM języku osobno. Pilnuje jej strażnik
 * e2e (T1 handoffu), bo reguła zapisana wyłącznie w pliku treści jest
 * komentarzem, nie zabezpieczeniem.
 */
const LINKI_PROZY: Record<string, Record<string, [string, string]>> = {
  s1_robi_1: {
    dmo: ["/funkcje/pozyskiwanie", "dmo"],
    kalendarz: ["/funkcje/pozyskiwanie", "kalendarz"],
  },
  s1_robi_2: {
    formularz: ["/funkcje/pozyskiwanie", "formularz"],
    salaTreningowa: ["/funkcje/pozyskiwanie", "sala-treningowa"],
  },
  s1_robi_3: {
    szablony: ["/funkcje/tresci", "szablony"],
    tarcza: ["/funkcje/tresci", "tarcza"],
  },
  s2_robi_1: {
    pulpit: ["/funkcje/wyniki", "pulpit"],
    kreator: ["/funkcje/zespol", "kreator-wdrozeniowy"],
  },
  s2_robi_2: {
    pierwsze90: ["/funkcje/zespol", "pierwsze-90-dni"],
    osiagniecia: ["/funkcje/zespol", "osiagniecia"],
  },
  s3_robi_1: {
    zatwierdzanieZespolu: ["/funkcje/zespol", "zatwierdzanie-zespolu"],
    paszport: ["/funkcje/zespol", "paszport-zgodnosci"],
  },
  s3_robi_2: {
    akademia: ["/funkcje/zespol", "akademia"],
  },
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaDlaKogo({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DlaKogo");

  // Znaczniki rich → linki. Budowane raz na klucz; komponent ścieżki
  // dostaje gotowy ReactNode i nie interpretuje treści.
  const znaczniki = (kluczAkapitu: string) =>
    Object.fromEntries(
      Object.entries(LINKI_PROZY[kluczAkapitu]).map(
        ([znacznik, [sciezka, kotwica]]) => [
          znacznik,
          (fragment: ReactNode) => (
            <a href={`${adresWJezyku(locale as Locale, sciezka)}#${kotwica}`}>
              {fragment}
            </a>
          ),
        ],
      ),
    );

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/dla-kogo" />
      <main id="tresc">
        {/* S2 — nagłówek podstrony; id="podstrona-h1" na sztywno
            w komponencie. BEZ okruszków (D-D2a). */}
        <NaglowekPodstrony naglowek={t("naglowek")} zdanie={t("zdanie")} />
        {/* S3 — spis treści: pozycje to H2 ścieżek VERBATIM, bez
            osobnych kluczy (rozstrzygnięcie 6: numer znaczyłby
            kolejność, której treść nie stawia). */}
        <SpisTresci
          etykieta={t("spisEtykieta")}
          pozycje={SCIEZKI.map((sciezka) => ({
            etykieta: t(`${sciezka.klucz}_h2`),
            kotwica: sciezka.kotwica,
          }))}
        />
        {SCIEZKI.map((sciezka) => (
          <SciezkaRozpoznania
            key={sciezka.kotwica}
            naglowek={t(`${sciezka.klucz}_h2`)}
            idNaglowka={sciezka.kotwica}
            boli={t(`${sciezka.klucz}_boli`)}
            akapity={Array.from({ length: sciezka.akapity }, (_, indeks) => {
              const klucz = `${sciezka.klucz}_robi_${indeks + 1}`;
              return {
                klucz,
                tresc: t.rich(klucz, {
                  minuty: MINUTY_PRZYPOMNIENIA,
                  ...znaczniki(klucz),
                }),
              };
            })}
            zdaniaPlanu={
              sciezka.zdaniaPlanu === 1
                ? [t(`${sciezka.klucz}_plan`)]
                : Array.from({ length: sciezka.zdaniaPlanu }, (_, indeks) =>
                    t(`${sciezka.klucz}_plan_${indeks + 1}`),
                  )
            }
            linkCennikaEtykieta={t("cennikLink")}
            linkCennikaHref={adresWJezyku(locale as Locale, "/cennik")}
            granica={t(`${sciezka.klucz}_granica`)}
          />
        ))}
        {/* S5 — K11 wariant krótki: CTA → /login (ADR-023). */}
        <Zamkniecie
          ctaEtykieta={t("cta")}
          ctaHref={adresWJezyku(locale as Locale, "/login")}
          zdaniePo={t("ctaZdanie")}
        />
      </main>
    </>
  );
}
