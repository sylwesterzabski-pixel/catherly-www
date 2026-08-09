#!/usr/bin/env node
/**
 * Generator skal 50–900 dla palety (Faza 1, Etap C; proces ADR-015
 * w wykonaniu algorytmicznym — decyzja właściciela z 2026-08-09).
 *
 * Mechanika jak w Accessible Palette: przestrzeń CIELAB LCh, stały
 * odcień (h) barwy bazowej, systematyczna siatka jasności L* per
 * stopień, chroma dociskana do gamutu sRGB. Kolory zatwierdzone przez
 * właściciela są PRZYPINANE dosłownie do najbliższego stopnia siatki.
 *
 * Wyjście: design/paleta-skale.json + design/podglad-skal.html
 * + walidacja kontrastów na stdout (progi AA względem tła #eee6e0).
 */
import { writeFileSync } from "node:fs";

const TLO = "#eee6e0"; // stała decyzji właściciela (Etap B)
const SIATKA_L = { 50: 96, 100: 92, 200: 85, 300: 76, 400: 66, 500: 54, 600: 43, 700: 35, 800: 27, 900: 20 };
const BAZY = {
  neutralna: "#3b2a20",
  terakota: "#e65b3d",
  szalwia: "#5ca596",
  sliwka: "#5e4775",
};

// --- sRGB <-> CIELAB (D65) ---
const hexNaRgb = (hex) => [0, 2, 4].map((i) => parseInt(hex.replace("#", "").slice(i, i + 2), 16));
const rgbNaHex = ([r, g, b]) => "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
const lin = (c) => (c / 255 <= 0.04045 ? c / 255 / 12.92 : Math.pow((c / 255 + 0.055) / 1.055, 2.4));
const delin = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);

function rgbNaXyz([r, g, b]) {
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  return [
    0.4124564 * R + 0.3575761 * G + 0.1804375 * B,
    0.2126729 * R + 0.7151522 * G + 0.072175 * B,
    0.0193339 * R + 0.119192 * G + 0.9503041 * B,
  ];
}
const BIALY = [0.95047, 1.0, 1.08883];
const f = (t) => (t > Math.pow(6 / 29, 3) ? Math.cbrt(t) : t / (3 * Math.pow(6 / 29, 2)) + 4 / 29);
const fInv = (t) => (t > 6 / 29 ? t * t * t : 3 * Math.pow(6 / 29, 2) * (t - 4 / 29));

function rgbNaLch(rgb) {
  const [x, y, z] = rgbNaXyz(rgb);
  const [fx, fy, fz] = [f(x / BIALY[0]), f(y / BIALY[1]), f(z / BIALY[2])];
  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);
  return { L, C: Math.hypot(a, b), h: Math.atan2(b, a) };
}

function lchNaRgb({ L, C, h }) {
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const fy = (L + 16) / 116;
  const [x, y, z] = [BIALY[0] * fInv(fy + a / 500), BIALY[1] * fInv(fy), BIALY[2] * fInv(fy - b / 200)];
  const R = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
  const G = -0.969266 * x + 1.8760108 * y + 0.041556 * z;
  const B = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
  return [R, G, B];
}

const wGamucie = (rgbLin) => rgbLin.every((c) => c >= -0.0005 && c <= 1.0005);

function lchNaHexDocisk(lch) {
  let C = lch.C;
  let rgbLin = lchNaRgb({ ...lch, C });
  while (!wGamucie(rgbLin) && C > 0) {
    C -= 0.3;
    rgbLin = lchNaRgb({ ...lch, C });
  }
  return rgbNaHex(rgbLin.map((c) => Math.round(255 * Math.min(1, Math.max(0, delin(Math.min(1, Math.max(0, c)))))))
  );
}

const luminancja = (hex) => {
  const [r, g, b] = hexNaRgb(hex);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const kontrast = (aHex, bHex) => {
  const [l1, l2] = [luminancja(aHex), luminancja(bHex)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

// --- generowanie ---
const skale = {};
const przypiecia = {};
for (const [nazwa, baza] of Object.entries(BAZY)) {
  const { C, h, L: lBazy } = rgbNaLch(hexNaRgb(baza));
  const skala = {};
  let najblizszy = null;
  let minDelta = Infinity;
  for (const [stopien, L] of Object.entries(SIATKA_L)) {
    skala[stopien] = lchNaHexDocisk({ L, C, h });
    const d = Math.abs(L - lBazy);
    if (d < minDelta) {
      minDelta = d;
      najblizszy = stopien;
    }
  }
  skala[najblizszy] = baza; // decyzja właściciela wygrywa z siatką
  przypiecia[nazwa] = { stopien: Number(najblizszy), hex: baza };
  skale[nazwa] = skala;
}

// --- walidacja ---
console.log(`Walidacja względem tła ${TLO} (AA tekst 4,5:1 · AA duży/UI 3:1):\n`);
const progi = {};
for (const [nazwa, skala] of Object.entries(skale)) {
  let odUI = null;
  let odTekst = null;
  for (const stopien of Object.keys(SIATKA_L)) {
    const k = kontrast(skala[stopien], TLO);
    if (odUI === null && k >= 3) odUI = stopien;
    if (odTekst === null && k >= 4.5) odTekst = stopien;
    console.log(`  ${nazwa}-${stopien}  ${skala[stopien]}  ${k.toFixed(2)}:1`);
  }
  progi[nazwa] = { ui_od: Number(odUI), tekst_od: Number(odTekst) };
  console.log(`  → ${nazwa}: UI od ${odUI}, tekst od ${odTekst}\n`);
}
console.log("Pary tekst-na-wypełnieniu:");
const pary = [
  ["neutralna-50 na terakota-600", skale.neutralna[50], skale.terakota[600]],
  ["neutralna-50 na terakota-700", skale.neutralna[50], skale.terakota[700]],
  ["neutralna-50 na szalwia-600", skale.neutralna[50], skale.szalwia[600]],
  ["neutralna-50 na sliwka-700", skale.neutralna[50], skale.sliwka[700]],
  ["neutralna-900 na neutralna-100", skale.neutralna[900], skale.neutralna[100]],
];
for (const [opis, fg, bg] of pary) {
  console.log(`  ${opis}: ${kontrast(fg, bg).toFixed(2)}:1 ${kontrast(fg, bg) >= 4.5 ? "AA ✓" : kontrast(fg, bg) >= 3 ? "tylko duży/UI" : "✗"}`);
}

// --- artefakty ---
writeFileSync(
  "design/paleta-skale.json",
  JSON.stringify(
    {
      _opis: "Skale 50-900 palety catherly (Faza 1, Etap C). Proces ADR-015, wykonanie algorytmiczne (CIELAB LCh, siatka L*, decyzja właściciela 2026-08-09). Tło strony jest stałą poza skalami.",
      tlo: TLO,
      siatka_jasnosci_L: SIATKA_L,
      przypiete_bazy: przypiecia,
      progi_AA_wzgledem_tla: progi,
      skale,
    },
    null,
    2
  ) + "\n"
);

const kolumna = (nazwa, skala) =>
  `<div class="kol"><h2>${nazwa}</h2>` +
  Object.entries(skala)
    .map(([s, hex]) => {
      const k = kontrast(hex, TLO);
      const badge = k >= 4.5 ? "AA tekst" : k >= 3 ? "AA duży/UI" : "dekoracja";
      const pin = przypiecia[nazwa].stopien === Number(s) ? " ⭐" : "";
      const jasny = luminancja(hex) > 0.35;
      return `<div class="sw" style="background:${hex};color:${jasny ? "#3b2a20" : "#f8f4f0"}"><span>${s}${pin}</span><code>${hex}</code><small>${k.toFixed(2)}:1 · ${badge}</small></div>`;
    })
    .join("") +
  `</div>`;

writeFileSync(
  "design/podglad-skal.html",
  `<!doctype html><html lang="pl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>catherly — skale palety (Etap C)</title>
<style>
  body{background:${TLO};color:#3b2a20;font-family:Georgia,serif;margin:2rem;}
  h1{font-weight:normal} .kolumny{display:flex;gap:1rem;flex-wrap:wrap}
  .kol{flex:1;min-width:180px} .kol h2{font-size:1rem;font-weight:normal}
  .sw{padding:.6rem .8rem;display:flex;justify-content:space-between;align-items:baseline;gap:.5rem}
  .sw code{font-size:.8rem} .sw small{font-size:.65rem;opacity:.85}
  .proba{margin-top:2rem;max-width:34rem;line-height:1.6}
  .przycisk{display:inline-block;padding:.7rem 1.4rem;border-radius:.6rem;text-decoration:none}
</style></head><body>
<h1>Skale palety — podgląd (⭐ = kolor przypięty z Twojej decyzji)</h1>
<div class="kolumny">${Object.entries(skale).map(([n, s]) => kolumna(n, s)).join("")}</div>
<div class="proba">
  <h2>Próba ról</h2>
  <p>Tekst podstawowy na tle strony (neutralna-900 na ${TLO}).
  <a href="#" style="color:${skale.sliwka[700]}">Link w śliwce-700</a> w środku akapitu.
  <span style="color:${skale.neutralna[700]}">Tekst drugorzędny w neutralnej-700.</span></p>
  <p><a href="#" class="przycisk" style="background:${skale.terakota[600]};color:${skale.neutralna[50]}">Wybierz plan</a>
  <a href="#" class="przycisk" style="background:transparent;border:2px solid ${skale.terakota[600]};color:${skale.terakota[600]}">Zaloguj</a></p>
</div>
</body></html>\n`
);
console.log("\nZapisano: design/paleta-skale.json, design/podglad-skal.html");
