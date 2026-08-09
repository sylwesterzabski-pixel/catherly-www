import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Pliki generowane maszynowo (Next, Style Dictionary) — nie podlegają lintowi.
    ignores: ["node_modules/**", ".next/**", "out/**", "next-env.d.ts", "src/styles/generated/**"],
  },
];

export default eslintConfig;
