import { useTranslations } from "next-intl";

import { adresWJezyku, type Locale } from "@/i18n/sciezki";
import { cenyPlanu, type NazwaPlanu } from "@/lib/cennik";

import { KartaPlanu } from "./KartaPlanu";
import styles from "./SekcjaPlanow.module.css";

type Props = {
  locale: Locale;
};

/**
 * K6 + K5 — przełącznik okresu i trzy karty planów (markup wg HF
 * docs/faza-3/hf/cennik.html, po panelu 2026-08-11; decyzja wiążąca:
 * WARIANT A CSS-only). Sekcja celowo BEZ aria-labelledby wskazującego
 * legend (W3 — region planów nie nazywa się „Okres rozliczenia");
 * nawigację niosą h2 kart. Radia WIDOCZNE (semantyka natywna:
 * nazwa grupy z legend, pozycja 1 z 2, stan). ŚWIADOMY BRAK
 * aria-live — uzasadnienie w handoff-etap-e-cennik.md. Zero JS.
 */
const PLANY: readonly {
  nazwa: NazwaPlanu;
  klucz: "starter" | "growth" | "pro";
  id: string;
  kluczePozycji: readonly string[];
  maDopisek: boolean;
}[] = [
  {
    nazwa: "Starter",
    klucz: "starter",
    id: "plan-starter",
    kluczePozycji: ["pozycja1", "pozycja2", "pozycja3", "pozycja4", "pozycja5"],
    maDopisek: false,
  },
  {
    nazwa: "Growth",
    klucz: "growth",
    id: "plan-growth",
    kluczePozycji: ["pozycja1", "pozycja2"],
    maDopisek: true,
  },
  {
    nazwa: "Pro",
    klucz: "pro",
    id: "plan-pro",
    kluczePozycji: ["pozycja1", "pozycja2", "pozycja3", "pozycja4"],
    maDopisek: true,
  },
];

export function SekcjaPlanow({ locale }: Props) {
  const t = useTranslations("Cennik");
  return (
    <section className={styles.sekcja}>
      <div className={styles.wnetrze}>
        <fieldset className={styles.przelacznik}>
          <legend className={styles.srOnly}>{t("okresLegenda")}</legend>
          <label>
            <input
              type="radio"
              name="okres"
              value="miesiecznie"
              className={styles.okresMiesiecznie}
              defaultChecked
            />{" "}
            {t("miesiecznie")}
          </label>
          <label>
            <input
              type="radio"
              name="okres"
              value="rocznie"
              className={styles.okresRocznie}
            />{" "}
            {t("rocznie")}
          </label>
        </fieldset>

        <div className={styles.karty}>
          {PLANY.map(({ nazwa, klucz, id, kluczePozycji, maDopisek }) => {
            const ceny = cenyPlanu(nazwa, locale);
            return (
              <KartaPlanu
                key={klucz}
                nazwa={nazwa}
                idNaglowka={id}
                cenaMiesiecznie={ceny.miesiecznie}
                cenaRocznie={ceny.rocznie}
                zdanieOszczednosci={t("oszczedzasz", {
                  kwota: ceny.oszczednosc,
                })}
                etykietaMiesiecznie={t("miesiecznie")}
                etykietaRocznie={t("rocznie")}
                dlaKogo={t(`plany.${klucz}.dlaKogo`)}
                dopisek={maDopisek ? t(`plany.${klucz}.dopisek`) : undefined}
                pozycje={kluczePozycji.map((kluczPozycji) =>
                  t(`plany.${klucz}.${kluczPozycji}`),
                )}
                ctaEtykieta={t("cta")}
                ctaHref={adresWJezyku(locale, "/login")}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
