import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Prowieniencja wydania (ADR-018) — z jakiego commita pochodzi to, co
 * właśnie odpowiada na żądanie.
 *
 * Powód istnienia: bramka wydajności ma mierzyć preview Vercela pod
 * adresem ze zmiennej repozytorium LHCI_BAZA. Adres jest STAŁY, a
 * wdrożenie pod nim — nie. Bramka może więc trafić na wdrożenie
 * z poprzedniego commita (deploy jeszcze się buduje), albo z zupełnie
 * innej gałęzi (alias wskazuje gdzie indziej). Wynik byłby prawdziwym
 * pomiarem NIE TEGO kodu — czyli zielenią bez pokrycia, tej samej klasy
 * co pomiar ekranu logowania Vercela.
 *
 * Sam adres tego nie rozstrzyga i treść strony też nie: obie wersje
 * wyglądają identycznie. Rozstrzyga wyłącznie identyfikator commita
 * podany przez samo wdrożenie — stąd ten nagłówek. Czyta go strażnik
 * celu pomiaru (scripts/sprawdz-preview.mjs) i porównuje z commitem,
 * na którym stoi CI.
 *
 * Wartość: na Vercelu VERCEL_GIT_COMMIT_SHA, na runnerze GitHuba
 * GITHUB_SHA, lokalnie „lokalne". Nagłówek odpowiedzi, nie treść —
 * nie dotyka HTML-a, więc nie wchodzi w drogę bramkom treści.
 */
const WYDANIE =
  process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || "lokalne";

const nextConfig: NextConfig = {
  // Generowanie statyczne per strona (ADR-007). Świadomie BEZ `output: "export"`:
  // Faza 5 wymaga rewrites tras logowania/rejestracji do aplikacji (ADR-005),
  // a rewrites nie działają przy pełnym eksporcie statycznym.
  async headers() {
    return [
      {
        source: "/:sciezka*",
        headers: [{ key: "x-catherly-wydanie", value: WYDANIE }],
      },
    ];
  },
};

// i18n www (ADR-008): konfiguracja żądań next-intl w src/i18n/request.ts.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
