import { getTranslations, setRequestLocale } from "next-intl/server";

import { BlokWzrostu } from "@/components/BlokWzrostu";
import { CennikSkrot } from "@/components/CennikSkrot";
import { Filar } from "@/components/Filar";
import { Hero } from "@/components/Hero";
import { KartaWrapped } from "@/components/KartaWrapped";
import { KartyFunkcji } from "@/components/KartyFunkcji";
import { KartyGrafitowe } from "@/components/KartyGrafitowe";
import { Nawigacja } from "@/components/Nawigacja";
import { SekcjaRytmu } from "@/components/SekcjaRytmu";
import { SekcjaTekstowa } from "@/components/SekcjaTekstowa";
import { Zamkniecie } from "@/components/Zamkniecie";
import { adresWJezyku, type Locale } from "@/i18n/sciezki";
import { routing } from "@/i18n/routing";
import { OSADZENIE_NA_GLOWNEJ, zrzutFilaru } from "@/obrazy/zrzuty";

/**
 * Strona główna (/, /en, /de).
 *
 * ══ SKŁAD PRZEBUDOWANY 2026-09-06 (ADR-069, zlecenie WWW/096 v4) ══
 * Reguła składu jest jedna i wypisuję ją tu, bo bez niej następna sesja
 * dołoży sekcję „bo pasuje": **skład = wzorzec finalny + decyzja
 * właściciela o czterech filarach ze zdjęciami. Nic ponadto.**
 *
 * KOLEJNOŚĆ: nav → hero → pamięć → rząd trzech kart grafitowych →
 * cztery filary (grafit, zdjęcie) → dzień → sześć kafelków →
 * wzrost z kartą „Twój Wrapped" (grafit) → cennik w skrócie →
 * zamknięcie → stopka.
 *
 * ⚠ PIĘĆ SEKCJI ZESZŁO Z GŁÓWNEJ I ŻADNA NIE ZOSTAŁA SKASOWANA —
 * komponenty i klucze stoją nietknięte, zmienia się MIEJSCE:
 * · `PasSciezek` (trzy karty „dla kogo") → `/dla-kogo`,
 * · `SekcjaTekstowa` z `Problem.*` → `/dla-kogo`,
 * · `PasMozliwosci` (pas przewijany) → zdjęty, komponent zostaje,
 * · `DbanieOSiebie` (Wall of Proof) → zdjęty, komponent zostaje,
 * · `Faq` z sześcioma obawami → `/cennik`, pod plany.
 * Ostatnie z nich to KROK 3 zlecenia `WWW/091`, który wtedy nie zszedł;
 * dlaczego — patrz ADR-069 §1.
 *
 * ⚠ TONY SEKCJI JASNYCH NIE IDĄ CYKLEM 1-2-3 I TO JEST WARUNEK, NIE
 * KAPRYS. Ton 2 to rola `powierzchnia`, czyli biel — ta sama rola, którą mają
 * karty w sekcjach „dzień", „kafelki" i „cennik". Ton 2 pod białą kartą
 * znosi jej plamę, a plama jest jednym z czterech mechanizmów rozdziału
 * ADR-038. Dlatego ton 2 dostają wyłącznie sekcje BEZ kart. Tabela
 * ton → sekcja stoi w ADR-069 §4.
 *
 * Prerenderowana statycznie (generateStaticParams — bramka No-JS);
 * jedyny `h1` jest w hero. Nawigacja renderowana przez stronę z jej
 * ścieżką ("/") — `aria-current` serwerowo, bez JS.
 */

/* R2 (ADR-049): każdy filar dostaje drogę na SWOJĄ podstronę.
   `blok` wskazuje klucz etykiety w `FunkcjeIndeks` — te same cztery
   zdania, które niesie indeks funkcji, więc zero nowej treści i jedno
   miejsce do podmiany. `sciezka` to adres podstrony; kolejność filarów
   i kolejność bloków indeksu są tą samą kolejnością rytmu dnia.

   ⚠ CZTERY, NIE TRZY — DECYZJA WŁAŚCICIELA (WWW/096 v4, werdykt z 15
   zrzutów). W `WWW/094` filar „Wyniki" zszedł z głównej, bo jego
   nagłówek niósł blok „wzrost" i strona miałaby dwa identyczne `h2`.
   Wraca, a kolizja nagłówków jest rozwiązana od drugiej strony: blok
   „wzrost" bierze odtąd `FunkcjeWyniki.mod2_nazwa` („Twój Wrapped"),
   a nie `Filary.filar4.naglowek`.

   ⚠ CZWARTY SLOT NIESIE `dbanie-o-siebie`, NIE `filar-4-wyniki` — tak
   brzmi zlecenie (pkt 6: „filar-1…3 + dbanie (jako filar 4)"), a nie
   jest to oczywiste, więc zapisuję. Sekcja „dbanie o siebie" zeszła
   z głównej, jej fotografia zostawała bez miejsca; zlecenie oddaje ją
   czwartemu filarowi. Skutek uboczny zgłoszony w zwrotce: to
   `filar-4-wyniki.avif` zostaje bez osadzenia, czyli pozycja T73
   rejestru NIE zamyka się, tylko zmienia przedmiot. */
const FILARY = [
  { klucz: "filar1", id: "filar-1-h2", kadr: "filar-1-pozyskiwanie", blok: "blok1Link", sciezka: "/funkcje/pozyskiwanie" },
  { klucz: "filar2", id: "filar-2-h2", kadr: "filar-2-tresci", blok: "blok2Link", sciezka: "/funkcje/tresci" },
  { klucz: "filar3", id: "filar-3-h2", kadr: "filar-3-zespol", blok: "blok3Link", sciezka: "/funkcje/zespol" },
  { klucz: "filar4", id: "filar-4-h2", kadr: "dbanie-o-siebie", blok: "blok4Link", sciezka: "/funkcje/wyniki" },
] as const;

/* RZĄD TRZECH KART GRAFITOWYCH — mapa karta → klucze (ADR-069).
   Trzy karty, bo tyle ma wzorzec. Tytuł to okruszek podstrony, zdanie
   to wprowadzenie bloku z indeksu funkcji, etykieta drogi dalej to link
   tego samego bloku — ani jeden ciąg nie powstał przy tej sekcji. */
const KARTY_RZEDU = [
  { id: "pozyskiwanie", okruszek: "FunkcjePozyskiwanie", blok: "blok1", sciezka: "/funkcje/pozyskiwanie" },
  { id: "tresci", okruszek: "FunkcjeTresci", blok: "blok2", sciezka: "/funkcje/tresci" },
  { id: "zespol", okruszek: "FunkcjeZespol", blok: "blok3", sciezka: "/funkcje/zespol" },
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
  const tObrazyTymczasowe = await getTranslations("ObrazyTymczasowe");
  const tDefinicja = await getTranslations("Definicja");
  const tRytm = await getTranslations("RytmDnia");
  const tWzorzec = await getTranslations("ObrazyWzorzec");
  const tZamkniecie = await getTranslations("ZamkniecieGlowna");
  const tIndeks = await getTranslations("FunkcjeIndeks");
  const tWyniki = await getTranslations("FunkcjeWyniki");
  const tWrapped = await getTranslations("Wrapped");
  const tPozyskiwanie = await getTranslations("FunkcjePozyskiwanie");
  const tTresci = await getTranslations("FunkcjeTresci");
  const tZespol = await getTranslations("FunkcjeZespol");

  const okruszki: Record<string, string> = {
    FunkcjePozyskiwanie: tPozyskiwanie("okruszek"),
    FunkcjeTresci: tTresci("okruszek"),
    FunkcjeZespol: tZespol("okruszek"),
  };

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/" />
      <main id="tresc">
        <Hero locale={locale as Locale} />

        {/* SEKCJA „PAMIĘĆ" — ton 2 (biel). Nie ma kart, więc wolno jej
            wziąć ton, który kartę by zniósł. Kadr po prawej: render
            laptopa i telefonu z ZDJĘTYM TŁEM, z ekranem laptopa
            wypełnionym zrzutem Playwrighta (ADR-067, ADR-069). */}
        <SekcjaTekstowa
          /* ⚠ AKCENT W TYM NAGŁÓWKU WYPADA (ADR-070, WWW/097/2 krok 3) —
             i to jest POMIAR, nie decyzja estetyczna. Sonda na wzorcu v2:
             w prostokącie nagłówka „Catherly to pamięć twojej sprzedaży"
             jest ZERO pikseli zielonych, przy kontroli pozytywnej w tym
             samym przebiegu — pigułka CTA hero 85,7 % zielonych, link na
             karcie grafitowej 15,2 %. Wzorzec maluje ten nagłówek jednym
             kolorem.

             ⚠ ZNACZNIK `<akcent>` ZOSTAJE W KLUCZU i dalej jest
             konsumowany przez `t.rich` — zmienia się tylko to, że span
             nie bierze klasy akcentu. Wyrzucenie znacznika z treści
             zapaliłoby strażnika parytetu znaczników (R-AKCENT-03), a on
             pilnuje rzeczy niezależnej od tego, jak fragment malujemy:
             że podział frazy jest ten sam w trzech językach. */
          naglowek={tDefinicja.rich("naglowek", {
            akcent: (tresc) => <span>{tresc}</span>,
          })}
          idNaglowka="definicja-h2"
          ton="2"
          /* KADR „PAMIĘĆ" (ADR-067 §krok 2, przeskalowany w ADR-069).
             Warstwa (b) kanonu — obudowa urządzeń — pochodzi z manifestu
             bitmap; warstwa (a) — zrzut na ekranie laptopa — z bazy demo
             przez Playwrighta. Ekran telefonu zostaje PUSTY: decyzja
             właściciela [A/C] nie zapadła, a kadru desktopowego
             2048 × 1280 nie wolno wcisnąć w ekran pionowy.
             Wariant `-alfa` ma zdjęte tło (zalew z czterech narożników,
             próg 40 przy przecieku zmierzonym na 140), więc kadr kładzie
             się na dowolnym tonie sekcji, a cień rysuje CSS. */
          kadr={{
            zrodlo: "/obrazy/wzorzec-2026-09-06/3-macbook-iphone-ekran-alfa.avif",
            alt: tWzorzec("macbookTelefon"),
            szerokosc: 1600,
            wysokosc: 1195,
          }}
        >
          <p>{tDefinicja("tresc")}</p>
        </SekcjaTekstowa>

        {/* RZĄD TRZECH KART GRAFITOWYCH — spis czterech rzeczy, z których
            wzorzec pokazuje trzy. Rozwinięcie każdej z nich stoi niżej
            jako sekcja filaru. */}
        <KartyGrafitowe
          aria={tIndeks("h1")}
          karty={
            KARTY_RZEDU.map((k) => ({
              id: k.id,
              tytul: okruszki[k.okruszek],
              zdanie: tIndeks(`${k.blok}Wprowadzenie`),
              etykieta: tIndeks(`${k.blok}Link`),
              adres: adresWJezyku(locale as Locale, k.sciezka),
            })) as unknown as Parameters<typeof KartyGrafitowe>[0]["karty"]
          }
        />

        {FILARY.map(({ klucz, id, kadr, blok, sciezka }) => (
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
               może się rozjechać z asercją. */
            /* TYMCZASOWE-DO-PODMIANY (ADR-061, zlecenie WWW/086,
               podtrzymane w WWW/096 v4 pkt 6): kadr fotograficzny
               wypełnia slot filaru do czasu bitmap 15–18 z osobnego
               zlecenia. Podmiana = wymiana pliku, bez zmiany kodu. */
            kadr={{
              zrodlo: `/obrazy/tymczasowe/${kadr}.avif`,
              alt: tObrazyTymczasowe(
                kadr === "dbanie-o-siebie" ? "dbanie" : `filar${klucz.slice(-1)}`,
              ),
              szerokosc: 1600,
              wysokosc: 1067,
            }}
            obraz={
              OSADZENIE_NA_GLOWNEJ
                ? { baza: zrzutFilaru(klucz).baza, alt: tObrazy(klucz) }
                : undefined
            }
          />
        ))}

        {/* SEKCJA „DZIEŃ" — ton 3. Ma białe karty, więc ton 2 odpada. */}
        <SekcjaRytmu
          naglowek={tRytm("naglowek")}
          idNaglowka="rytm-h2"
          ton="3"
          kroki={[
            {
              nazwa: tRytm("krok1Nazwa"),
              tresc: tRytm("krok1Tresc"),
              chip: tRytm("krok1Chip"),
              kadr: "/obrazy/wzorzec-2026-09-06/4-rano.avif",
              kadrAlt: tWzorzec("rano"),
            },
            {
              /* ⚠ SLOT BEZ KADRU — DECYZJA WŁAŚCICIELA OTWARTA (T71).
                 Kadr 5 z dostawy pokazuje laptop z pulpitem i wykresem,
                 czyli obraz, o którym odwiedzająca może pomyśleć „tak
                 wygląda aplikacja”; kanon żąda wtedy zrzutu z Playwrighta,
                 a manifest oznacza ten kadr jako warunkowy. Slot zostaje
                 WIDOCZNY z ramką i chipem, żeby sekwencja trzech pór dnia
                 się nie rozpadła; wejście kadru to podmiana jednej linii. */
              nazwa: tRytm("krok2Nazwa"),
              tresc: tRytm("krok2Tresc"),
              chip: tRytm("krok2Chip"),
            },
            {
              nazwa: tRytm("krok3Nazwa"),
              tresc: tRytm("krok3Tresc"),
              chip: tRytm("krok3Chip"),
              kadr: "/obrazy/wzorzec-2026-09-06/6-wieczorem.avif",
              kadrAlt: tWzorzec("wieczorem"),
            },
          ]}
          kropka={tRytm("kropka")}
        />

        {/* SZEŚĆ KAFELKÓW — ton 1. Stoją PO sekcji „dzień", nie przed
            filarami jak dotąd: tak układa je wzorzec i tak każe zlecenie.
            Zero nowej treści — tytuły i zdania są cytatami, mapa
            kafelek → klucz stoi w komponencie. */}
        <KartyFunkcji ton="1" />

        {/* BLOK „WZROST" Z KARTĄ „TWÓJ WRAPPED" — czwarta wyspa klamry.
            ⚠ NAGŁÓWEK ZMIENIONY W ADR-069 z `Filary.filar4.naglowek` na
            `FunkcjeWyniki.mod2_nazwa`. Powód jest strukturalny, nie
            estetyczny: filar „Wyniki" wrócił na główną decyzją
            właściciela i niesie tamten nagłówek, więc strona miałaby dwa
            identyczne `h2`. Oba ciągi są istniejące — nie napisano tu
            ani jednego słowa. */}
        <BlokWzrostu
          naglowek={tWyniki("mod2_nazwa")}
          idNaglowka="wzrost-h2"
          zdanie={t("filar4.korzysc")}
        >
          <KartaWrapped
            podtytul={t("filar4.konkret1")}
            tygodnie={tWrapped("tygodnie")}
            tygodnieEtykieta={tWrapped("tygodnieEtykieta")}
            ostatni={tWrapped("ostatni")}
            podsumowanie={[
              { wartosc: tWrapped("rozmowy"), etykieta: tWrapped("rozmowyEtykieta") },
              { wartosc: tWrapped("noweKontakty"), etykieta: tWrapped("noweKontaktyEtykieta") },
              { wartosc: tWrapped("zamowienia"), etykieta: tWrapped("zamowieniaEtykieta") },
            ]}
            podpis={tWrapped("podpis")}
          />
        </BlokWzrostu>

        {/* CENNIK W SKRÓCIE — ton 3. Ma białe karty planów. */}
        <CennikSkrot locale={locale as Locale} ton="3" />

        {/* 2.7 — SEKCJI OPINII ŚWIADOMIE TU NIE MA (WWW/059/060, T53).
            Wzorzec ma w tym miejscu dwa przeciwbieżne pasy cytatów
            klientek (∓50 px/s, zmierzone). Prawdziwych cytatów nie mamy,
            a zmyślone są zakazem bezwzględnym. Nie ma tu też komponentu
            zwracającego `null` za flagą: kod, który nigdy się nie
            wykonuje, psuje się po cichu. Warunek powrotu — rejestr T53.

            ⚠ JEDEN Z DWÓCH POWODÓW UKRYCIA WŁAŚNIE ODPADŁ: „Sześć obaw
            stoi tuż niżej" przestało być prawdą, bo FAQ zszedł na
            /cennik (ADR-069). Drugi powód stoi bez zmian i sam
            wystarcza: sekcja opinii ma nieść CUDZE świadectwo, a
            wypełniona naszymi odpowiedziami jest bliżej pseudo-dowodu
            niż pustego miejsca. Zapisuję to, żeby następna sesja nie
            odkryła „przecież powód zniknął" i nie włączyła sekcji. */}

        {/* ZAMKNIĘCIE — ton 2. Nie ma kart. */}
        <Zamkniecie
          naglowek={tZamkniecie("naglowek")}
          idNaglowka="zamkniecie-h2"
          ton="2"
          ctaEtykieta={tZamkniecie("cta")}
          ctaHref={adresWJezyku(locale as Locale, "/funkcje")}
          zdaniePo={tZamkniecie("zdanie")}
        />
      </main>
    </>
  );
}
