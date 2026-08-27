import { useTranslations } from "next-intl";

import { adresWJezyku, type Locale } from "@/i18n/sciezki";
import { cenyPlanu, type NazwaPlanu } from "@/lib/cennik";

import styles from "./CennikSkrot.module.css";

type Props = {
  locale: Locale;
};

/**
 * S11 / K10 — cennik w skrócie (markup wg HF
 * docs/faza-3/hf/zlozenie-glowna.html, po panelu 2026-08-11).
 * H2 sr-only „Cennik w skrócie" — mikro-tekst usankcjonowany przez
 * panel (pochodna content/cennik.md). Od 2.6 (WWW/059) TRZY KARTY
 * w geometrii wzorca zamiast trzech wierszy; Growth wyróżniony obwódką
 * w akcencie (decyzja właściciela D2:A).
 *
 * ⚠ SPROSTOWANIE CYTATU. Stało tu „zero wyróżnień (ADR-003)". ADR-003
 * TEGO NIE ZAWIERA: jego lista zamknięta wymienia wymuszanie
 * rejestracji, wyskakujące okna, sztuczną pilność, ukryte ceny,
 * zmyślone opinie i nierówność zgód na ciasteczka — o wyróżnianiu planu
 * ani słowa. Komentarz przypisywał ADR-owi regułę, której w nim nie ma,
 * czyli działał jak reguła bez źródła. Wyróżnienie planu POLECANEGO nie
 * jest ciemnym wzorcem: nie udaje pilności i nie ukrywa ceny.
 *
 * Zero tabeli i zero interaktywności ZOSTAJE; JEDEN
 * link → /cennik (decyzja panelu, kandydat 2 — ADR-003/023); kolor
 * linku z globals (rola-link — W1). Ceny miesięczne WYŁĄCZNIE
 * z migawki przez lib/cennik; słowo interwału z messages Cennik
 * (sankcja panelu — kwota nigdy bez okresu). role="list" jawnie:
 * Safari/VoiceOver zdejmuje semantykę listy przy list-style: none.
 * Zero JS.
 */
// W5: kolejność planów DETERMINISTYCZNA Starter→Growth→Pro —
// migawka Stripe prowadzi je w innej kolejności (Pro/Starter/Growth);
// cenyPlanu wybiera plan po nazwie, nie po indeksie.
const PLANY: readonly NazwaPlanu[] = ["Starter", "Growth", "Pro"];

/* Plan polecany — decyzja właściciela D2:A, przywołana w zleceniu 2.6.
   Literał jest tu MECHANIZMEM, nie dryfem: zmiana polecanego planu ma
   być decyzją, więc ma wymagać ruszenia tej linii, a nie wynikać
   z kolejności w tablicy. */
const PLAN_POLECANY: NazwaPlanu = "Growth";

export function CennikSkrot({ locale }: Props) {
  const t = useTranslations("CennikSkrot");
  const tCennik = useTranslations("Cennik");
  return (
    <section className={styles.sekcja} aria-labelledby="skrot-h2">
      <div className={styles.wnetrze}>
        <h2 id="skrot-h2" className={styles.srOnly}>
          {t("naglowek")}
        </h2>
        <ul className={styles.plany} role="list">
          {PLANY.map((nazwa) => (
            <li
              key={nazwa}
              className={
                nazwa === PLAN_POLECANY
                  ? `${styles.plan} ${styles.polecany}`
                  : styles.plan
              }
            >
              <span className={styles.nazwa}>{nazwa}</span>
              <span className={styles.cena}>
                {cenyPlanu(nazwa, locale).miesiecznie}{" "}
                <span className={styles.interwal}>
                  {tCennik("miesiecznie")}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className={styles.roznica}>{t("roznica")}</p>
        <p>
          <a href={adresWJezyku(locale, "/cennik")}>{t("link")}</a>
        </p>
      </div>
    </section>
  );
}
