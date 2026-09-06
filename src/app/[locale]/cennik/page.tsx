import { getTranslations, setRequestLocale } from "next-intl/server";

import { Faq } from "@/components/Faq";
import { Nawigacja } from "@/components/Nawigacja";
import { PasekPotwierdzen } from "@/components/PasekPotwierdzen";
import { SekcjaPlanow } from "@/components/SekcjaPlanow";
import { TabelaPorownawcza } from "@/components/TabelaPorownawcza";
import { Zamkniecie } from "@/components/Zamkniecie";
import { routing } from "@/i18n/routing";
import { adresWJezyku, type Locale } from "@/i18n/sciezki";

import styles from "./cennik.module.css";

/**
 * /cennik C2–C8 (Etapy E–F; markup wg HF docs/faza-3/hf/cennik.html
 * i docs/faza-3/hf/zlozenie-glowna.html, po panelach 2026-08-11):
 * H1+wstęp, K6+K5 (SekcjaPlanow), K7 tabela, K8 FAQ, K9
 * potwierdzenia ×3, C8 zamknięcie (K11: zdanie §7 + CTA → /login,
 * ADR-023). Prerender SSG per locale; hierarchia: h1 → h2 plany →
 * h2 sr-only FAQ; tabela etykietowana caption. Zero JS.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StronaCennik({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Cennik");
  const tObawy = await getTranslations("Obawy");
  const tZamkniecie = await getTranslations("ZamkniecieCennik");

  return (
    <>
      <Nawigacja locale={locale as Locale} biezacaSciezka="/cennik" />
      <main id="tresc">
        <section className={styles.naglowek} aria-labelledby="cennik-h1">
          <div className={styles.wnetrze}>
            <h1 id="cennik-h1">{t("naglowek")}</h1>
            <p>{t("wstep")}</p>
          </div>
        </section>

        <SekcjaPlanow locale={locale as Locale} />

        {/* ══ SZEŚĆ OBAW PRZENIESIONYCH Z GŁÓWNEJ (ADR-069, WWW/096 v4) ══
            Stoją POD PLANAMI, przed tabelą porównawczą i przed FAQ
            cennikowym — bo to tutaj czytająca podejmuje decyzję i tutaj
            obawa ma znaczenie, a nie na stronie głównej, gdzie dopiero
            poznaje produkt.

            ⚠ DECYZJA O-7 ZDJĘTA (WWW/091, delegacja właściciela).
            Do niej sześć obaw było związane w jeden pakiet z
            `toHaveCount(6)`, punktem 24 STRATEGII i `Obawy.naglowek`
            („Sześć") — „jednym pakietem albo wcale". Przeniesienie ich
            samo w sobie nie łamie pakietu, bo LICZBA SIĘ NIE ZMIENIA:
            dalej jest ich sześć, dalej pilnuje tego ten sam strażnik,
            zmienia się wyłącznie strona. Strażnik przeniesiony razem
            z nimi — inaczej pilnowałby pustego miejsca.

            ⚠ TO JEST KROK 3 ZLECENIA `WWW/091`, KTÓRY WTEDY NIE ZSZEDŁ.
            Dlaczego — ADR-069 §1. Krótko: `WWW/091` zdjęło decyzję O-7,
            ale jego krok 3 był mapowaniem treści, a samo przeniesienie
            nie dostało własnego kroku w żadnym z trzech kolejnych zleceń.
            Nic tego nie wykryło, bo strażnik pilnował sekcji, która
            wciąż stała tam, gdzie stała.

            ⚠ NA TEJ STRONIE SĄ TERAZ DWA BLOKI PYTAŃ I ODPOWIEDZI i to
            jest zamierzone, nie przeoczenie: sześć obaw dotyczy PRODUKTU
            („czy to dla mnie"), cztery pytania niżej dotyczą UMOWY
            (płatność, rezygnacja, dane). Mają różne nagłówki i różne
            klucze; scalenie ich zrobiłoby listę dziesięciu pytań bez
            widocznego podziału. */}
        <Faq
          naglowek={tObawy("naglowek")}
          idNaglowka="obawy-h2"
          pary={[
            { pytanie: tObawy("p1"), odpowiedz: tObawy("o1") },
            { pytanie: tObawy("p2"), odpowiedz: tObawy("o2") },
            { pytanie: tObawy("p3"), odpowiedz: tObawy("o3") },
            { pytanie: tObawy("p4"), odpowiedz: tObawy("o4") },
            { pytanie: tObawy("p5"), odpowiedz: tObawy("o5") },
            { pytanie: tObawy("p6"), odpowiedz: tObawy("o6") },
          ]}
        />

        <TabelaPorownawcza />
        <Faq
          naglowek={t("faqNaglowek")}
          idNaglowka="faq-h2"
          pary={[
            { pytanie: t("faq.p1"), odpowiedz: t("faq.o1") },
            { pytanie: t("faq.p2"), odpowiedz: t("faq.o2") },
            { pytanie: t("faq.p3"), odpowiedz: t("faq.o3") },
            { pytanie: t("faq.p4"), odpowiedz: t("faq.o4") },
          ]}
        />

        <section
          className={styles.potwierdzenia}
          aria-label={t("potwierdzeniaAria")}
        >
          <div className={styles.wnetrze}>
            <PasekPotwierdzen
              pozycje={[
                t("potwierdzenie1"),
                t("potwierdzenie2"),
                t("potwierdzenie3"),
              ]}
            />
          </div>
        </section>

        {/* C8 — zamknięcie (K11): zdanie §7 treści cennika NAD CTA;
            CTA → /login (ADR-023 — plan wybierasz po zalogowaniu). */}
        <Zamkniecie
          zdaniePrzed={tZamkniecie("zdanie")}
          ctaEtykieta={tZamkniecie("cta")}
          ctaHref={adresWJezyku(locale as Locale, "/login")}
        />
      </main>
    </>
  );
}
