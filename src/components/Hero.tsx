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
 * ⚠ ELEMENT LCP — TU STAŁ MÓJ DOMYSŁ, KTÓRY POMIAR OBALIŁ, i zostawiam
 * oba, bo pomyłka jest pouczająca. Napisałem: „mockup przejmował rolę
 * LCP, po jego zdjęciu kandydatem wraca tekst". NIEPRAWDA w obie strony.
 *
 * Zmierzone 2026-09-02, Lighthouse, 5 przebiegów na stan, oba stany
 * w jednej sesji (stan wzorcowy z `git worktree` na `bf66f27`):
 * elementem LCP jest `span.Hero_duch__…` — dekoracja `aria-hidden`
 * o kryciu 6% — i jest nim w OBU stanach, ze zrzutem i bez.
 * Mediana „/": 1854 ms ze zrzutami, 1850 ms bez. Zysk 4 ms, w rozrzucie.
 *
 * Wniosek, który stąd płynie i który należy do rejestru, nie do tego
 * pliku: zrzuty nie były elementem LCP od czasu, gdy powstał duch
 * (2026-08-26), więc ich zdjęcie nie miało czego przyspieszyć.
 * Pełny zapis i warunki zamknięcia — pozycja T55.
 */
export function Hero({ locale }: Props) {
  const t = useTranslations("Hero");
  const tWzorzec = useTranslations("ObrazyWzorzec");

  return (
    <section className={styles.hero} aria-labelledby="hero-h1">
      <div className={styles.wnetrze}>
        <div className={styles.kolumny}>
          {/* ⚠ DUCH USUNIĘTY (ADR-069, WWW/096 v4 pkt 3). Stał tu
              dekoracyjny napis „Catherly" w 6 % alfy, 990 × 205 px,
              i był ELEMENTEM LCP strony (pozycja T55 rejestru) — czyli
              najcięższym malowaniem hero była rzecz, której nikt nie
              miał przeczytać. Wzorzec finalny nie ma go w ogóle.
              Zdejmuję razem z pustką, którą trzymało `min-block-size`:
              zmierzone przed zmianą — sekcja 1524 px przy treści 589 px,
              czyli 935 px próżni pod tekstem. */}
          <div className={`${styles.tekst} ruch-stagger`}>
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
          </div>
          {/* ═══ KOLUMNA MEDIALNA (ADR-067, WWW/093/2 krok 3) ═══
              Wzorzec finalny stawia po prawej kadr bohaterki WTOPIONY
              w tło po obrysie — bez ramki — a na nim duży telefon.

              ⚠ RAMA I PARALLAX Z ADR-063/064 SCHODZĄ Z TEGO SLOTU, i to
              jest odwrócenie mojej własnej decyzji sprzed dwóch dni.
              Tamta rama powstała, gdy kadr był POZIOMY i stał POD tekstem;
              wzorzec finalny daje kadr PIONOWY OBOK tekstu i wtapia go
              maską. Rama i wtopienie wykluczają się mechanicznie — maska
              wygasza obrys przy narożnikach (zapisane już w ADR-063). */}
          <div className={styles.media}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.bohaterka}
              src="/obrazy/wzorzec-2026-09-06/1-bohaterka.avif"
              alt={tWzorzec("bohaterka")}
              width={1200}
              height={1489}
              fetchPriority="high"
              decoding="async"
            />
            {/* TELEFON — ramka z bitmapy wzorca. EKRAN ZOSTAJE PUSTY:
                decyzja właściciela A/C jest otwarta, a wciśnięcie kadru
                desktopowego 2048×1280 w ekran pionowy byłoby pokazaniem
                aplikacji, której tak nie widać — kadr jest DOWODEM, nie
                mockupem (zakaz zlecenia i sens reguły z kanonu). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.telefon}
              src="/obrazy/wzorzec-2026-09-06/2c-iphone-L-alfa.avif"
              alt={tWzorzec("telefon")}
              width={900}
              height={1117}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
