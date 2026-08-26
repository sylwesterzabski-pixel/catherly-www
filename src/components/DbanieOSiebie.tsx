import { useTranslations } from "next-intl";

import styles from "./DbanieOSiebie.module.css";

/**
 * S9 — mini-sekcja „Dbanie o siebie" (markup wg HF
 * docs/faza-3/hf/k4-filary.html; treść OBOWIĄZUJE — DECYZJA 10,
 * 2026-08-11: wariant B po panelu). H2 visually-hidden domyka
 * strukturę nagłówków; temat sekcji = Wall of Proof (moduł
 * osobisty — doprecyzowanie w content/pl/filary.md). Zero JS.
 */
export function DbanieOSiebie() {
  const t = useTranslations("DbanieOSiebie");
  return (
    <section className={styles.dbanie} aria-labelledby="dbanie-h2" data-ton="ciemny">
      <div className={styles.wnetrze}>
        <h2 id="dbanie-h2" className={styles.srOnly}>
          {t("naglowek")}
        </h2>
        <p>{t("tresc")}</p>
      </div>
    </section>
  );
}
