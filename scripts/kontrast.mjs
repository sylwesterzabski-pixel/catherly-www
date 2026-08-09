#!/usr/bin/env node
/**
 * Diagnostyka kontrastu WCAG 2.x dla par kolorów (proces ADR-015).
 * Użycie: node scripts/kontrast.mjs "#pierwszy_plan/#tlo" [kolejne pary...]
 * Drukuje: współczynnik kontrastu, werdykty AA (tekst zwykły ≥ 4,5:1;
 * duży tekst i elementy UI ≥ 3:1) oraz HSL (H mówi o cieple barwy —
 * podstawa ocen z ADR-013).
 */

function hexNaRgb(hex) {
  const h = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`Niepoprawny hex: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function luminancja([r, g, b]) {
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function kontrast(fg, bg) {
  const l1 = luminancja(hexNaRgb(fg));
  const l2 = luminancja(hexNaRgb(bg));
  const [jasny, ciemny] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (jasny + 0.05) / (ciemny + 0.05);
}

function hsl(hex) {
  const [r, g, b] = hexNaRgb(hex).map((c) => c / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

const pary = process.argv.slice(2);
if (pary.length === 0) {
  console.error('Użycie: node scripts/kontrast.mjs "#fg/#bg" [...]');
  process.exit(1);
}

for (const para of pary) {
  const [fg, bg] = para.split("/");
  const k = kontrast(fg, bg);
  const { h, s, l } = hsl(fg);
  const aa = k >= 4.5 ? "AA tekst ✓" : "AA tekst ✗";
  const aaDuze = k >= 3 ? "AA duży/UI ✓" : "AA duży/UI ✗";
  console.log(
    `${fg} na ${bg}  →  ${k.toFixed(2)}:1   ${aa}   ${aaDuze}   (HSL ${h}° ${s}% ${l}%)`
  );
}
