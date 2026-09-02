import { useTranslations } from "next-intl";

import { adresWJezyku, type Locale } from "@/i18n/sciezki";

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
 * ⚠ MOCKUP ZDJĘTY 2026-09-02 (ADR-048, decyzja właściciela WWW/072
 * pkt 1: „ZERO zrzutów aplikacji i mockupów urządzeń na stronie
 * głównej"). Stał tu `<picture>` z kadrem DMO z dostawy Z6, a niżej,
 * od 90rem, dekoracyjne tło fali 2. Oba schodzą; miejsce zajmuje
 * SLOT-FOTO-HERO czekający na kadr fotograficzny.
 *
 * Czego to NIE robi: pliki `public/obrazy/**` zostają NIETKNIĘTE
 * (archiwum dowodowe z sumami SHA-256), a klucze `ObrazyFilarow.*`
 * zostają w i18n — pilnuje ich `e2e/zrzuty-filarow.spec.ts`, który
 * przy wyłączonym osadzeniu przechodzi na sprawdzanie GOTOWOŚCI
 * dostawy. Usunięcie ich „bo nieużywane" zapaliłoby go w trzech
 * językach.
 *
 * Element LCP: mockup ląduje był w kadrze startowym i przejmował rolę
 * LCP. Po jego zdjęciu kandydatem wraca tekst — zmierzone po zmianie,
 * liczba w zwrotce WWW/072, nie tutaj (liczba w komentarzu zestarzeje
 * się przy pierwszej zmianie hero).
 */
export function Hero({ locale }: Props) {
  const t = useTranslations("Hero");

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
            {/* SLOT-FOTO-HERO — miejsce na duży kadr fotograficzny
                (ADR-048, rozstrzygnięcia 2 i 3). Podmiana polega na
                wstawieniu TUTAJ <picture>/<img>; `aspect-ratio` jest już
                zarezerwowane w arkuszu, więc układ nie skoczy.

                `aria-hidden` — slot nie niesie dziś żadnej treści, więc
                nie ma go w drzewie dostępności. Wraz z kadrem wchodzi
                `alt` i to oznaczenie ZNIKA: obraz informacyjny musi być
                widoczny dla czytnika.

                Slot hero jest JEDYNYM bez ramki, promienia i cienia —
                wtapia się w tło maską, tak jak wzorzec (decyzja
                właściciela, WWW/072 pkt 3). Dlatego nie nazywa się
                `obraz`: klasa `[class*="_obraz__"]` jest lokatorem
                strażnika rozdziału kart, a ten slot kartą nie jest
                i celowo nie spełnia żadnego z mechanizmów rozdziału. */}
            <div className={styles.kadr} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
