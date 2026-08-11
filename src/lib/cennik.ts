import migawka from "../../content/cennik-snapshot.json";

import type { Locale } from "@/i18n/sciezki";

/**
 * Jedyne źródło cen: content/cennik-snapshot.json (migawka Stripe;
 * bramka:cennik pilnuje zgodności migawki ze Stripe, testy e2e —
 * zgodności DOM z migawką). Oszczędność = 12 × cena miesięczna −
 * cena roczna (wzór z §2 treści cennika pl/en/de; 12 = miesiące roku,
 * nie liczba marketingowa). Waluta strony: pl → PLN, en/de → EUR
 * (DECYZJA 4). Grosze/centy tylko gdy wychodzą z rachunku.
 */
const WALUTA_STRONY: Record<Locale, "pln" | "eur"> = {
  pl: "pln",
  en: "eur",
  de: "eur",
};

const LOCALE_FORMATU: Record<Locale, string> = {
  pl: "pl-PL",
  en: "en-IE",
  de: "de-DE",
};

export type NazwaPlanu = "Starter" | "Growth" | "Pro";

export type CenyPlanu = {
  miesiecznie: string;
  rocznie: string;
  oszczednosc: string;
};

function formatujKwote(grosze: number, locale: Locale): string {
  const czyPelne = grosze % 100 === 0;
  return new Intl.NumberFormat(LOCALE_FORMATU[locale], {
    style: "currency",
    currency: WALUTA_STRONY[locale].toUpperCase(),
    minimumFractionDigits: czyPelne ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(grosze / 100);
}

export function cenyPlanu(nazwa: NazwaPlanu, locale: Locale): CenyPlanu {
  const plan = migawka.plany.find((p) => p.nazwa === nazwa);
  if (!plan) throw new Error(`Migawka cennika nie zna planu ${nazwa}`);
  const waluta = WALUTA_STRONY[locale];
  const kwota = (interwal: "month" | "year"): number => {
    const wpis = plan.ceny.find(
      (c) => c.waluta === waluta && c.interwal === interwal,
    );
    if (!wpis)
      throw new Error(`Migawka: brak ceny ${nazwa}/${waluta}/${interwal}`);
    return wpis.kwota_brutto;
  };
  const miesiecznie = kwota("month");
  const rocznie = kwota("year");
  return {
    miesiecznie: formatujKwote(miesiecznie, locale),
    rocznie: formatujKwote(rocznie, locale),
    oszczednosc: formatujKwote(miesiecznie * 12 - rocznie, locale),
  };
}
