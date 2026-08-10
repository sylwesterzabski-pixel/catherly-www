import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

/**
 * Konfiguracja żądania next-intl: język z segmentu [locale],
 * komunikaty UI z src/i18n/messages/{pl,en,de}.json
 * (wyłącznie etykiety z handoffu K1/K3 — zero innych treści).
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const zadany = await requestLocale;
  const locale = hasLocale(routing.locales, zadany)
    ? zadany
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
