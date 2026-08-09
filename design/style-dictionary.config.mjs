/**
 * Style Dictionary — jedyna droga z design/tokens.json do kodu (ADR-004,
 * ADR-015). Wygenerowany plik src/styles/generated/tokeny.css jest
 * artefaktem; ręczna edycja wartości wizualnych gdziekolwiek indziej
 * nie przechodzi lintera tokenów.
 *
 * Budowanie: npm run tokeny:build (uruchamiane automatycznie w prebuild).
 */
const konfiguracja = {
  source: ["design/tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/styles/generated/",
      files: [
        {
          destination: "tokeny.css",
          format: "css/variables",
          options: { outputReferences: true },
        },
      ],
    },
  },
};

export default konfiguracja;
