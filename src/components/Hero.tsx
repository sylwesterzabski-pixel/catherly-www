import { useTranslations } from "next-intl";

import { adresWJezyku, type Locale } from "@/i18n/sciezki";
import {
  FORMATY_ZRODEL,
  SZEROKOSC_ZRODLA,
  WYSOKOSC_ZRODLA,
  srcSet,
  srcZapasowy,
  zrzutFilaru,
} from "@/obrazy/zrzuty";

import { PasekPotwierdzen } from "./PasekPotwierdzen";
import styles from "./Hero.module.css";

type Props = {
  locale: Locale;
};

/**
 * 2.2 HERO — układ wzorca (WWW/058, ADR-046). Wyśrodkowany,
 * jednokolumnowy: H1 → lead → CTA → drobne zaufania → WIELKI MOCKUP.
 * Poprzednio dwukolumnowy z pustą kolumną po prawej (K2, HF
 * docs/faza-3/hf/k2-hero.html) — ta kolumna czekała na obraz od
 * 2026-08-10 i teraz obraz przyszedł, tyle że pod treść, nie obok.
 *
 * ⚠ ETYKIETA NAD H1 POMINIĘTA — rozstrzygnięcie z 2026-08-27. Wzorzec
 * ma tam plakietkę w akcencie; u nas nie ma zatwierdzonego ciągu na to
 * miejsce, a treść hero zamyka decyzja właściciela z 2026-08-09.
 * Implementacja treści nie pisze.
 *
 * ⚠ MOCKUP TO KADR „RYTM DNIA" (DMO), NIE „PULPIT". Zlecenie prosiło
 * o „zrzut Pulpitu (Z6)"; dostawa Z6 zawiera cztery kadry zwolnione
 * imiennie przez właściciela 2026-08-14 i Pulpitu wśród nich NIE MA
 * (sprawdzone w `design/obrazy-robocze/z6/`). Rozstrzygnięcie
 * z 2026-08-27: wchodzi kadr DMO — znaczeniowo najbliższy dziennemu
 * przeglądowi pracy — a podpis i tekst alternatywny opisują go
 * PRAWDZIWIE jako Dzienny Plan Działania. Nazwanie go „Pulpitem"
 * byłoby twierdzeniem o aplikacji, którego nie da się pokryć.
 *
 * ⚠ TEN SAM KADR STOI TEŻ PRZY FILARZE 1. Cena rozstrzygnięcia,
 * odnotowana świadomie: strona główna pokazuje go dwa razy. Zamiana
 * to jedno odwołanie, gdy pojawi się kadr Pulpitu.
 *
 * Element LCP: do 2.2 był nim tekst H1. Mockup ląduje w kadrze
 * startowym przy 900 px wysokości, więc może przejąć rolę LCP —
 * mierzone po wdrożeniu, liczby w zwrotce (zlecenie: „czerwień jawna,
 * nie blokuje STOP-u").
 */
export function Hero({ locale }: Props) {
  const t = useTranslations("Hero");
  const tObrazy = useTranslations("ObrazyFilarow");
  const kadr = zrzutFilaru("filar1");

  return (
    <section className={styles.hero} aria-labelledby="hero-h1">
      <div className={styles.wnetrze}>
        <div className={styles.kolumny}>
          {/* DUCH — wielki napis dekoracyjny za treścią hero (R2).
              `aria-hidden` i pusty dla drzewa tekstu: napis rysuje
              `content` z CSS, więc nie wchodzi do treści, nie dubluje
              nazwy marki dla czytnika i nie da się go wyszukać jako
              tekstu. */}
          <span className={styles.duch} aria-hidden="true" />
          <div className="ruch-stagger">
            <h1 id="hero-h1" className={styles.naglowek}>
              {t("naglowek")}
            </h1>
            <p className={styles.podtytul}>{t("podtytul")}</p>
            <a className={styles.cta} href={adresWJezyku(locale, "/funkcje")}>
              {t("cta")}
            </a>
            <PasekPotwierdzen
              pozycje={[t("potwierdzenieUE"), t("potwierdzenieRezygnacja")]}
              klasa={styles.potwierdzenia}
            />
            <div className={styles.mockup}>
              <picture>
                {FORMATY_ZRODEL.map((format) => (
                  <source
                    key={format}
                    type={`image/${format}`}
                    srcSet={srcSet(kadr.baza, format)}
                    sizes="(min-width: 90rem) calc(100vw - 16.875rem), (min-width: 48.0625rem) calc(100vw - 5rem), calc(100vw - 2.5rem)"
                  />
                ))}
                {/* Surowy <img> zamiast next/image — świadomie:
                    optymalizator Nexta PRZEKODOWUJE plik na żądanie, więc
                    na produkcji lądowałby obraz o innej sumie niż ten,
                    który przeszedł weryfikację SHA-256 z dostawy Z6.
                    Tu publikujemy dokładnie te bajty, które sprawdziliśmy.

                    `loading="eager"`, nie `lazy` — obraz leży w kadrze
                    startowym. Leniwe ładowanie elementu WIDOCZNEGO od
                    razu opóźnia go bez żadnego zysku i jest znanym
                    antywzorcem; filary poniżej foldu zostają leniwe. */}
                <img
                  src={srcZapasowy(kadr.baza)}
                  alt={tObrazy("filar1")}
                  width={SZEROKOSC_ZRODLA}
                  height={WYSOKOSC_ZRODLA}
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
