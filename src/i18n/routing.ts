import { defineRouting } from "next-intl/routing";

/**
 * Routing i18n www (ADR-008: trzy języki od dnia pierwszego).
 * pl — domyślny, BEZ prefiksu ścieżki; en/de — prefiksy /en, /de
 * (spójnie z linkami języków w stopce: /, /en, /de — handoff K1).
 * Bez detekcji języka i bez ciasteczka: język wybierają wyłącznie
 * ścieżka i linki w stopce (zero automatycznych przekierowań,
 * zero ciasteczek bez potrzeby — ADR-003).
 */
export const routing = defineRouting({
  locales: ["pl", "en", "de"],
  defaultLocale: "pl",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
});
