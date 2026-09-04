import { getTranslations, setRequestLocale } from "next-intl/server";

import { CennikSkrot } from "@/components/CennikSkrot";
import { DbanieOSiebie } from "@/components/DbanieOSiebie";
import { Faq } from "@/components/Faq";
import { Filar } from "@/components/Filar";
import { Hero } from "@/components/Hero";
import { KartyFunkcji } from "@/components/KartyFunkcji";
import { PasMozliwosci } from "@/components/PasMozliwosci";
import { PasSciezek } from "@/components/PasSciezek";
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
/* R2 (ADR-049): każdy filar dostaje drogę na SWOJĄ podstronę.
   `blok` wskazuje klucz etykiety w `FunkcjeIndeks` — te same cztery
   zdania, które niesie indeks funkcji, więc zero nowej treści i jedno
   miejsce do podmiany. `sciezka` to adres podstrony; kolejność filarów
   i kolejność bloków indeksu są tą samą kolejnością rytmu dnia. */
const FILARY = [
  { klucz: "filar1", id: "filar-1-h2", blok: "blok1Link", sciezka: "/funkcje/pozyskiwanie" },
  { klucz: "filar2", id: "filar-2-h2", blok: "blok2Link", sciezka: "/funkcje/tresci" },
  { klucz: "filar3", id: "filar-3-h2", blok: "blok3Link", sciezka: "/funkcje/zespol" },
  { klucz: "filar4", id: "filar-4-h2", blok: "blok4Link", sciezka: "/funkcje/wyniki" },
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
  const tIndeks = await getTranslations("FunkcjeIndeks");

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/" />
      <main id="tresc">
        <Hero locale={locale as Locale} />

        {/* R1 — ROZJAZD POD HERO (ADR-049). Pierwsze drzwi w korytarzu:
            do 2026-09-03 od CTA hero do linku cennika było dziewięć
            i pół ekranu bez żadnego wyjścia (pomiar WWW/073 krok 3).
            Tu wchodzi też jedyne na głównej zdanie podróży STRUKTURA
            (R4) — cytat z `DlaKogo.s3_h2`, nie nowy tekst. */}
        <PasSciezek locale={locale as Locale} />

        {/* S3 — problem (K3 neutralna, „słyszalna kropka"). */}
        <SekcjaTekstowa
          /* R-AKCENT-03 (ADR-033): fragment nagłówka w akcencie składany
             z klucza i18n przez `t.rich`. Podział niesie SAM KLUCZ, więc
             jest tłumaczony razem z tekstem i nie ma go w kodzie — dzięki
             temu granica frazowa może być inna w każdym języku, a słowa
             pozostają nietknięte. */
          naglowek={tProblem.rich("naglowek", {
            akcent: (tresc) => (
              <span className="akcent-naglowka">{tresc}</span>
            ),
          })}
          idNaglowka="problem-h2"
          kropka={tProblem("kropka")}
        >
          <p>{tProblem("tresc")}</p>
        </SekcjaTekstowa>

        {/* S4 — definicja (K3 neutralna, bez kropki). */}
        <SekcjaTekstowa
          naglowek={tDefinicja.rich("naglowek", {
            akcent: (tresc) => (
              <span className="akcent-naglowka">{tresc}</span>
            ),
          })}
          idNaglowka="definicja-h2"
        >
          <p>{tDefinicja("tresc")}</p>
        </SekcjaTekstowa>

        {/* 2.3 — SZEŚĆ KART FUNKCJI (WWW/059, ADR-047). Blok stoi po
            definicji, a przed filarami: najpierw CZYM to jest (S4),
            potem CO w tym jest (karty), a dopiero filary rozwijają
            każdą rzecz osobno. Zero nowej treści — tytuły i zdania są
            cytatami z istniejących kluczy, mapa karta→klucz stoi
            w komponencie i tam się ją podmienia. */}
        <KartyFunkcji />

        {/* 2.5 — pas możliwości (WWW/059). Odpowiednik pasa integracji
            wzorca; u nas nazwy naszych możliwości, bo logotypy firm są
            zakazem bezwzględnym. Osiem cytatów z kluczy `*_nazwa`. */}
        <PasMozliwosci />

        {FILARY.map(({ klucz, id, blok, sciezka }) => (
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
            link={{
              etykieta: tIndeks(blok),
              adres: adresWJezyku(locale as Locale, sciezka),
            }}
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

        {/* 2.7 — SEKCJI OPINII ŚWIADOMIE TU NIE MA (WWW/059/060, T53).
            Wzorzec ma w tym miejscu dwa przeciwbieżne pasy cytatów
            klientek (∓50 px/s, zmierzone). Prawdziwych cytatów nie mamy,
            a zmyślone są zakazem bezwzględnym.

            Zlecenie dawało dwa wyjścia — zasilić sekcję „Sześcioma
            obawami" albo ukryć za flagą. Wybrano UKRYCIE, z dwóch
            powodów: (1) „Sześć obaw" stoi TUŻ NIŻEJ jako FAQ, więc pas
            opinii pokazywałby te same sześć par drugi raz na jednym
            ekranie; (2) sekcja opinii ma nieść CUDZE świadectwo —
            wypełniona naszymi odpowiedziami wygląda jak dowód społeczny
            i nim nie jest, czyli jest bliżej pseudo-dowodu niż pustego
            miejsca.

            Nie ma tu też komponentu zwracającego `null` za flagą: kod,
            który nigdy się nie wykonuje, psuje się po cichu. Warunek
            powrotu i pełne uzasadnienie — rejestr, pozycja T53. */}

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
