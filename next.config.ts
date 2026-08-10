import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Generowanie statyczne per strona (ADR-007). Świadomie BEZ `output: "export"`:
  // Faza 5 wymaga rewrites tras logowania/rejestracji do aplikacji (ADR-005),
  // a rewrites nie działają przy pełnym eksporcie statycznym.
};

// i18n www (ADR-008): konfiguracja żądań next-intl w src/i18n/request.ts.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
