import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generowanie statyczne per strona (ADR-007). Świadomie BEZ `output: "export"`:
  // Faza 5 wymaga rewrites tras logowania/rejestracji do aplikacji (ADR-005),
  // a rewrites nie działają przy pełnym eksporcie statycznym.
};

export default nextConfig;
