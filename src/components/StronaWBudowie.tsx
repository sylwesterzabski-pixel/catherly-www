import { useTranslations } from "next-intl";

import { Nawigacja } from "@/components/Nawigacja";
import { adresWJezyku, POZYCJE_MENU, type Locale } from "@/i18n/sciezki";

type Props = {
  locale: Locale;
  /** Ścieżka pozycji menu (względem języka) — także źródło H1
   *  (etykieta pozycji z messages) i aria-current w Nawigacji. */
  sciezka: (typeof POZYCJE_MENU)[number]["sciezka"];
};

/**
 * B1(a) — wspólna treść stron placeholderowych pozycji menu
 * (/funkcje, /cennik, /dla-kogo): H1 = etykieta pozycji z messages,
 * jedno zdanie o powstawaniu strony (brzmienie zatwierdzone przez
 * właściciela 2026-08-10) + link powrotny na stronę główną.
 * Zero JS, zero obietnic dat. Stopka przychodzi z layoutu [locale].
 */
export function StronaWBudowie({ locale, sciezka }: Props) {
  const pozycja = POZYCJE_MENU.find((p) => p.sciezka === sciezka);
  if (!pozycja) throw new Error(`Brak pozycji menu dla ścieżki ${sciezka}`);

  const tNaw = useTranslations("Nawigacja");
  const t = useTranslations("StronaWBudowie");
  const tWspolne = useTranslations("Wspolne");

  return (
    <>
      <Nawigacja locale={locale} biezacaSciezka={sciezka} />
      <main id="tresc">
        <h1>{tNaw(pozycja.klucz)}</h1>
        <p>{t("tresc")}</p>
        <p>
          <a href={adresWJezyku(locale, "/")}>{tWspolne("stronaGlowna")}</a>
        </p>
      </main>
    </>
  );
}
