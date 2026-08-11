import { useTranslations } from "next-intl";

import fakty from "../../content/facts.json";

import styles from "./TabelaPorownawcza.module.css";

/**
 * K7 — tabela porównawcza planów (markup wg HF
 * docs/faza-3/hf/cennik.html, po panelu 2026-08-11).
 * Limity WYŁĄCZNIE z content/facts.json (Z1 — egzekwowane w kodzie
 * aplikacji; linter liczb wymusza import); Pro „bez limitu" słowem
 * (kod ma -1). Kategorie wykluczone (storage/AI/social/pdf/www)
 * NIE ISTNIEJĄ w tabeli — rejestr warunków powrotu poz. 4–6.
 * ✓/— jako glif aria-hidden + tekst sr-only (sankcja panelu).
 * Colspan „w każdym planie" — czytniki anonsują rozpiętość poprawnie
 * (odnotowane w handoffie). Zero JS.
 */
const f = fakty.fakty;

export function TabelaPorownawcza() {
  const t = useTranslations("Cennik.tabela");

  const wierszeLimitow = [
    {
      klucz: "kontakty",
      starter: f["limit-kontakty-starter"].wartosc,
      growth: f["limit-kontakty-growth"].wartosc,
    },
    {
      klucz: "zespol",
      starter: f["limit-zespol-starter"].wartosc,
      growth: f["limit-zespol-growth"].wartosc,
    },
    {
      klucz: "posty",
      starter: f["limit-posty-starter"].wartosc,
      growth: f["limit-posty-growth"].wartosc,
    },
    {
      klucz: "sesje",
      starter: f["limit-sesje-treningowe-starter"].wartosc,
      growth: f["limit-sesje-treningowe-growth"].wartosc,
    },
  ] as const;

  const wierszeBramek = [
    { klucz: "puls", plany: [false, true, true] },
    { klucz: "drzewo", plany: [false, true, true] },
    { klucz: "ranking", plany: [false, false, true] },
  ] as const;

  const znacznik = (wPlanie: boolean) => (
    <>
      <span aria-hidden="true">{wPlanie ? "✓" : "—"}</span>
      <span className={styles.srOnly}>
        {wPlanie ? t("wPlanie") : t("pozaPlanem")}
      </span>
    </>
  );

  // Sekcja BEZ własnej etykiety — nazwany landmark to kontener
  // przewijany niżej (axe: landmark-unique — dwie identyczne nazwy
  // regionów to naruszenie).
  return (
    <section className={styles.sekcja}>
      <div className={styles.wnetrze}>
        {/* Kontener przewijany dostępny z klawiatury (axe:
            scrollable-region-focusable) — nazwany region wskazujący
            caption; fokus z globalnego :focus-visible. */}
        <div
          className={styles.kontener}
          tabIndex={0}
          role="region"
          aria-labelledby="tabela-caption"
        >
          <table className={styles.tabela}>
            <caption id="tabela-caption">{t("caption")}</caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className={styles.srOnly}>{t("zakres")}</span>
                </th>
                <th scope="col">Starter</th>
                <th scope="col">Growth</th>
                <th scope="col">Pro</th>
              </tr>
            </thead>
            <tbody>
              {wierszeLimitow.map(({ klucz, starter, growth }) => (
                <tr key={klucz}>
                  <th scope="row">{t(klucz)}</th>
                  <td>{starter}</td>
                  <td>{growth}</td>
                  <td>{t("bezLimitu")}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">{t("kalendarz")}</th>
                <td colSpan={3}>{t("wKazdymPlanie")}</td>
              </tr>
              {wierszeBramek.map(({ klucz, plany }) => (
                <tr key={klucz}>
                  <th scope="row">{t(klucz)}</th>
                  {plany.map((wPlanie, indeks) => (
                    <td key={indeks}>{znacznik(wPlanie)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
