import { useLocale, useTranslations } from "next-intl";

import { Nawigacja } from "@/components/Nawigacja";
import { adresWJezyku, type Locale } from "@/i18n/sciezki";

/**
 * B2 — treść strony 404, renderowana WEWNĄTRZ layoutu języka
 * (poprawny html lang, Nawigacja + Stopka; Stopka przychodzi
 * z layoutu [locale]).
 *
 * Mechanika Next (jak 404 jest routowana — wynik weryfikacji buildem
 * i curlem, nie przekonanie):
 * 1. Droga GŁÓWNA (pełny HTML bez JS, status 404): middleware
 *    przepisuje każdą ścieżkę spoza rejestru ISTNIEJACE_SCIEZKI na
 *    PRERENDEROWANĄ stronę /[locale]/nie-znaleziono ze statusem 404
 *    (NextResponse.rewrite z init.status). Ta strona renderuje
 *    dokładnie ten komponent.
 * 2. Dlaczego nie samo notFound(): w Next 15.5 notFound() rzucone
 *    w renderze NA ŻĄDANIE (on-demand SSG nieznanego parametru trasy
 *    statycznej ORAZ trasa force-dynamic) serwuje pusty szkielet
 *    __next_error__ — treść 404 jest wyłącznie w ładunku RSC i staje
 *    się widoczna dopiero po wykonaniu JS. Pełny HTML bez JS dają
 *    tylko dokumenty prerenderowane — stąd rewrite z pkt 1.
 *    (Próba wymuszenia dynamiki przez connection() w trasie SSG
 *    kończy się DYNAMIC_SERVER_USAGE i statusem 500.)
 * 3. Ten plik pozostaje jako granica not-found segmentu [locale]
 *    (hierarchia: layout → not-found → page) — obrona w głąb: łapie
 *    notFound() z segmentów podrzędnych (np. catch-all [...sciezka])
 *    przy nawigacjach klienckich i ścieżkach omijających middleware,
 *    z tą samą treścią co droga główna — zero rozjazdu.
 * 4. Locale: layout woła setRequestLocale przed renderem dzieci,
 *    więc useLocale/useTranslations widzą język segmentu [locale].
 *
 * Nawigacja z pustą ścieżką — na 404 żadna pozycja menu nie jest
 * bieżąca (bez aria-current).
 */
export default function NieZnaleziono() {
  const locale = useLocale() as Locale;
  const t = useTranslations("NieZnaleziono");
  return (
    <>
      <Nawigacja locale={locale} biezacaSciezka="" />
      <main id="tresc">
        <h1>{t("naglowek")}</h1>
        <p>{t("wroc")}</p>
        <p>
          <a href={adresWJezyku(locale, "/")}>{t("stronaGlowna")}</a>
        </p>
      </main>
    </>
  );
}
