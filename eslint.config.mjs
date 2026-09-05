import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Pliki generowane maszynowo (Next, Style Dictionary) — nie podlegają lintowi.
    //
    // ⚠ `.next-*/**` DOŁOŻONE W L-OPS-04 (WWW/089) I JEST TO TRZECI CZYTELNIK
    // ZMIENNEJ `WWW_DIST`, KTÓREGO NIE POLICZYŁEM ZA PIERWSZYM RAZEM.
    // Katalog budowania pochodzi od `WWW/089` ze zmiennej; budowanie pomiarowe
    // idzie do `.next-pomiar`, a ta lista znała wyłącznie `.next`. Skutek był
    // natychmiastowy i mylący: **11 błędów `no-require-imports` w plikach,
    // których nikt nie pisał** — ESLint sprawdzał wydany kod Next.js.
    // Wzorzec, nie pojedyncza nazwa: obejmuje każdy przyszły katalog pomiarowy.
    //
    // Pełna lista czytelników `WWW_DIST`, policzona po tym potknięciu:
    // `next.config.ts`, `scripts/check-{nojs,linki,kotwice}.mjs`,
    // `scripts/axe-precommit.mjs`, `.gitignore` i ten plik.
    ignores: [
      "node_modules/**",
      ".next/**",
      ".next-*/**",
      "out/**",
      "next-env.d.ts",
      "src/styles/generated/**",
    ],
  },
];

export default eslintConfig;
