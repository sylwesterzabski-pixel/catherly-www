import { getTranslations, setRequestLocale } from "next-intl/server";

import { CennikSkrot } from "@/components/CennikSkrot";
import { DbanieOSiebie } from "@/components/DbanieOSiebie";
import { Faq } from "@/components/Faq";
import { Filar } from "@/components/Filar";
import { Hero } from "@/components/Hero";
import { Nawigacja } from "@/components/Nawigacja";
import { SekcjaRytmu } from "@/components/SekcjaRytmu";
import { SekcjaTekstowa } from "@/components/SekcjaTekstowa";
import { Zamkniecie } from "@/components/Zamkniecie";
import { adresWJezyku, type Locale } from "@/i18n/sciezki";
import { routing } from "@/i18n/routing";
import { OSADZENIE_NA_GLOWNEJ, zrzutFilaru } from "@/obrazy/zrzuty";

/**
 * Strona główna (/, /en, /de) — złożenie Etapu F (brief
 * docs/faza-3/komponenty/brief-etap-f-zlozenie.md; HF
 * docs/faza-3/hf/zlozenie-glowna.html, po panelu 2026-08-11):
 * S1 nav → S2 hero (jedyny h1 = element LCP) → S3 problem (K3,
 * kropka) → S4 definicja (K3) → S5–S8 filary (K4) → S9 dbanie →
 * S10 rytm dnia (LUSTRO L1, akcent) → S11 cennik w skrócie (K10) →
 * S12 obawy (K8, 6 par) → S13 zamknięcie (K11) → S14 stopka.
 * Prerenderowana statycznie (generateStaticParams — bramka No-JS);
 * nowe sekcje POD foldem — element LCP bez zmian. Nawigacja
 * renderowana przez stronę z jej ścieżką ("/") — aria-current
 * serwerowo, bez JS. Nieznane ścieżki obsługuje segment [...sciezka].
 */
const FILARY = [
  { klucz: "filar1", id: "filar-1-h2", obrazPoLewej: false },
  { klucz: "filar2", id: "filar-2-h2", obrazPoLewej: true },
  { klucz: "filar3", id: "filar-3-h2", obrazPoLewej: false },
  { klucz: "filar4", id: "filar-4-h2", obrazPoLewej: true },
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaGlowna({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Filary");
  const tObrazy = await getTranslations("ObrazyFilarow");
  const tProblem = await getTranslations("Problem");
  const tDefinicja = await getTranslations("Definicja");
  const tRytm = await getTranslations("RytmDnia");
  const tObawy = await getTranslations("Obawy");
  const tZamkniecie = await getTranslations("ZamkniecieGlowna");

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/" />
      <main id="tresc">
        <Hero locale={locale as Locale} />

        {/* S3 — problem (K3 neutralna, „słyszalna kropka"). */}
        <SekcjaTekstowa
          naglowek={tProblem("naglowek")}
          idNaglowka="problem-h2"
          kropka={tProblem("kropka")}
        >
          <p>{tProblem("tresc")}</p>
        </SekcjaTekstowa>

        {/* S4 — definicja (K3 neutralna, bez kropki). */}
        <SekcjaTekstowa
          naglowek={tDefinicja("naglowek")}
          idNaglowka="definicja-h2"
        >
          <p>{tDefinicja("tresc")}</p>
        </SekcjaTekstowa>

        {FILARY.map(({ klucz, id, obrazPoLewej }) => (
          <Filar
            key={klucz}
            idNaglowka={id}
            naglowek={t(`${klucz}.naglowek`)}
            korzysc={t(`${klucz}.korzysc`)}
            konkrety={[
              t(`${klucz}.konkret1`),
              t(`${klucz}.konkret2`),
              t(`${klucz}.konkret3`),
            ]}
            obrazPoLewej={obrazPoLewej}
            /* Zrzuty Z6 — jeden przełącznik w rejestrze
               (design/pipeline-obrazow.json → osadzenieNaGlownej)
               czyta i ten markup, i strażnik e2e, więc markup nie
               może się rozjechać z asercją. Bez propu filar pokazuje
               pustą ramkę, dokładnie jak przed dostawą.

               Rozbiór pomiarowy (docs/faza-4/render-delay-glowna.md)
               wykazał, że koszt tych zrzutów jest kosztem TRANSPORTU
               POMIARU, nie strony: na HTTP/1.1 + gzip +153 ms, na
               HTTP/2 + brotli (tak serwuje Vercel) +0 ms przy zapasie
               524 ms do budżetu 1800 ms. Dopóki bramka mierzy
               lokalnie, „/" będzie ponad progiem — to czerwień
               termometru, nie strony, i nie naprawia się jej cięciem
               strony (docs/faza-4/bramka-na-preview.md). */
            obraz={
              OSADZENIE_NA_GLOWNEJ
                ? { baza: zrzutFilaru(klucz).baza, alt: tObrazy(klucz) }
                : undefined
            }
          />
        ))}
        <DbanieOSiebie />

        {/* S10 — rytm dnia (LUSTRO L1: kropka odpowiada kropce S3). */}
        <SekcjaRytmu
          naglowek={tRytm("naglowek")}
          idNaglowka="rytm-h2"
          kroki={[
            { nazwa: tRytm("krok1Nazwa"), tresc: tRytm("krok1Tresc") },
            { nazwa: tRytm("krok2Nazwa"), tresc: tRytm("krok2Tresc") },
            { nazwa: tRytm("krok3Nazwa"), tresc: tRytm("krok3Tresc") },
          ]}
          kropka={tRytm("kropka")}
        />

        {/* S11 — cennik w skrócie (K10; ceny z migawki). */}
        <CennikSkrot locale={locale as Locale} />

        {/* S12 — sześć obaw (instancja K8). Naglowek sr-only „Sześć
            obaw" = część opisowa tytułu content/<jezyk>/obawy.md
            (pkt 24) — pochodna treści; WYMAGA SANKCJI właściciela
            na koniec etapu (rejestr mikro-tekstów). */}
        <Faq
          naglowek={tObawy("naglowek")}
          idNaglowka="obawy-h2"
          pary={[
            { pytanie: tObawy("p1"), odpowiedz: tObawy("o1") },
            { pytanie: tObawy("p2"), odpowiedz: tObawy("o2") },
            { pytanie: tObawy("p3"), odpowiedz: tObawy("o3") },
            { pytanie: tObawy("p4"), odpowiedz: tObawy("o4") },
            { pytanie: tObawy("p5"), odpowiedz: tObawy("o5") },
            { pytanie: tObawy("p6"), odpowiedz: tObawy("o6") },
          ]}
        />

        {/* S13 — zamknięcie (K11): CTA → /funkcje (ADR-023), bez
            zdania prowadzącego — werdykt panelu pkt 25. */}
        <Zamkniecie
          ctaEtykieta={tZamkniecie("cta")}
          ctaHref={adresWJezyku(locale as Locale, "/funkcje")}
          zdaniePo={tZamkniecie("zdanie")}
        />
      </main>
    </>
  );
}
