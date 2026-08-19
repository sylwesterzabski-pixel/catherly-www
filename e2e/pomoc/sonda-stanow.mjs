/**
 * Sonda kontrastu STANÓW INTERAKTYWNYCH — wspólny rdzeń bramki i diagnostyki.
 *
 * Powód istnienia (decyzja właściciela 2026-08-17). Bramka dostępności
 * (`e2e/axe.spec.ts`) skanuje stronę WYŁĄCZNIE w stanie spoczynku: axe-core
 * nie wymusza `:hover`, `:active` ani `:focus`, więc reguła stanu może zepsuć
 * kontrast do 1,34:1 i przejść przez zieloną bramkę. Tak było — etykieta CTA
 * na `:hover` schodziła na `--kolor-rola-link-aktywny`, bo `a:hover` (0,1,1)
 * bije modułowe `.cta` (0,1,0). Luka klasy „strażnik nie patrzy tam,
 * gdzie boli"; ta sonda ją zamyka.
 *
 * Jak wymusza stan. Przez CDP `CSS.forcePseudoState` — tak samo, jak robi to
 * panel „Force element state" w DevTools. Nie przez mysz: prawdziwe najechanie
 * wymaga elementu w kadrze i bez przykrycia, a `:active` wymagałoby trzymania
 * przycisku (ryzyko kliknięcia i nawigacji w środku pomiaru). Wymuszenie jest
 * deterministyczne i działa też na elementach poza kadrem.
 *
 * Czego sonda NIE widzi — i dlaczego to nie jest cicha dziura.
 * Wymuszenie zakłada się na element klikalny. Reguła postaci `X:hover Y`
 * (stan na PRZODKU, styl na potomku niebędącym elementem klikalnym) nie
 * zostałaby pokryta. Dlatego `skanerRegulStanu` przegląda arkusze i zapala
 * czerwień, gdy taka reguła w ogóle powstanie — dziura zamienia się w awarię
 * bramki zamiast w milczenie. Przypadek odwrotny, `X:has(Y:stan)` (styl na
 * PRZODKU, stan na potomku), jest pokryty: sonda mierzy też łańcuch przodków
 * elementu, na którym wymusiła stan — tak działa dziś fokus przełącznika
 * okresu (`.przelacznik label:has(input:focus-visible)`).
 *
 * Tło skuteczne liczone jest ze STOSU MALOWANIA (`elementsFromPoint`), nie
 * z łańcucha przodków: element przykryty nakładką stoi na kolorze nakładki,
 * a nie rodzica. Warstwy z alfą składane są od spodu. Gdy w stosie stoi
 * `background-image` (gradient, obraz), koloru nie da się policzyć uczciwie
 * — pomiar dostaje `obrazWTle: true` i bramka zgłasza go jako NIEOZNACZALNY,
 * nigdy jako zielony.
 */

/**
 * @typedef {[number, number, number, number]} Barwa  kanały RGB 0-255 + alfa
 *
 * @typedef {object} PomiarTekstu
 * @property {string} selektor
 * @property {string} probka
 * @property {string} [pominiety]
 * @property {Barwa} [kolor]
 * @property {Barwa} [tlo]
 * @property {boolean} [obrazWTle]
 * @property {boolean} [brakStosu]
 * @property {number} [rozmiar]
 * @property {number} [waga]
 *
 * @typedef {object} Slad
 * @property {Barwa} kolor
 * @property {number} szerokosc
 * @property {string} styl
 *
 * @typedef {object} PomiarPrzodka
 * @property {string} selektor
 * @property {Slad|null} slad
 * @property {Barwa|null} tlo
 * @property {Barwa|null} tloZa
 * @property {boolean} obrazWTle
 *
 * @typedef {object} PomiarStanu
 * @property {string} selektor
 * @property {string} tag
 * @property {string} [pominiety]
 * @property {boolean} [przystanek]
 * @property {boolean} [wylaczony]
 * @property {boolean} [zNatywnaKontrolka]
 * @property {{x:number,y:number,w:number,h:number}} [prostokat]
 * @property {Barwa|null} [wypelnienie]
 * @property {Barwa|null} [wypelnienieZlozone]
 * @property {boolean} [obrazWypelnienia]
 * @property {Barwa|null} [zaKontrolka]
 * @property {boolean} [obrazZaKontrolka]
 * @property {{bok:string,szerokosc:number,styl:string,kolor:Barwa|null}[]} [krawedzie]
 * @property {Slad|null} [slad]
 * @property {PomiarTekstu[]} [teksty]
 * @property {PomiarPrzodka[]} [przodkowie]
 *
 * @typedef {Record<string, PomiarStanu>} PomiaryElementu
 *
 * @typedef {object} Naruszenie
 * @property {string} trasa
 * @property {string} kadr
 * @property {string} stan
 * @property {string} typ
 * @property {string} selektor
 * @property {string} opis
 * @property {number} wartosc
 * @property {number} prog
 * @property {string} [szczegol]
 *
 * @typedef {object} Nieoznaczalne
 * @property {string} trasa
 * @property {string} kadr
 * @property {string} stan
 * @property {string} selektor
 * @property {string} powod
 * @property {string} probka
 */

/* ── Progi ────────────────────────────────────────────────────────────────
   Trzy pierwsze są wprost z WCAG 2.2. Czwarty jest DECYZJĄ PROJEKTU ponad
   normę: WCAG wyłącza wyłączone kontrolki spod 1.4.3 i 1.4.11 („Incidental
   — inactive user interface component"). CLAUDE.md obiecuje „kontrast AA
   wszędzie", więc stan wyłączony też jest mierzony — progiem elementu UI,
   nie tekstu. Dziś serwis nie ma ANI JEDNEJ wyłączonej kontrolki, więc ten
   próg nie blokuje niczego; obowiązuje od pierwszej, która powstanie. */
export const PROGI = {
  tekst: 4.5,
  tekstDuzy: 3,
  ui: 3,
  wylaczony: 3,
};

/** Duży tekst wg WCAG: ≥ 24 px, albo ≥ 18,66 px przy wadze ≥ 700. */
export const STANY = ["spoczynek", "hover", "active", "fokus"];

/** Pseudoklasy wymuszane przez CDP dla każdego stanu. */
export const PSEUDOKLASY = {
  spoczynek: [],
  hover: ["hover"],
  active: ["active"],
  fokus: ["focus", "focus-visible"],
};

/**
 * Elementy klikalne. `label` wchodzi, bo kliknięcie w nią uruchamia kontrolkę
 * i to ona niesie tekst przełącznika okresu. `[tabindex="-1"]` zostaje poza:
 * jest celem programowym, nie przystankiem klawiatury.
 */
export const SELEKTOR_KLIKALNE = [
  "a[href]",
  "button",
  "input:not([type='hidden'])",
  "select",
  "textarea",
  "summary",
  "label",
  '[role="button"]',
  '[role="link"]',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/* ─────────────────────────────────────────────────────────────────────────
   Kod wykonywany W PRZEGLĄDARCE. Funkcje są zamieniane na źródło przez
   `.toString()`, więc nie wolno im sięgać po nic spoza własnego ciała.
   ───────────────────────────────────────────────────────────────────────── */

/**
 * Pomiar jednego elementu klikalnego w AKTUALNIE wymuszonym stanie.
 * Element wchodzi PARAMETREM, nie przez `this`: `Runtime.callFunctionOn`
 * wiąże `this`, więc opakowanie w `ZRODLO_SONDY` przekazuje go dalej — dzięki
 * temu funkcja daje się wywołać także wprost, z uchwytem elementu.
 * @param {Element} el
 * @returns {PomiarStanu}
 */
function sondaWezla(el) {
  const naRgb = (s) => {
    const m = String(s || "").match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1]
      .split(/[,\s/]+/)
      .filter(Boolean)
      .map(Number);
    if (p.length < 3 || p.some((n) => Number.isNaN(n))) return null;
    return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
  };

  const zloz = (wierzch, spod) => {
    const a = wierzch[3];
    return [
      wierzch[0] * a + spod[0] * (1 - a),
      wierzch[1] * a + spod[1] * (1 - a),
      wierzch[2] * a + spod[2] * (1 - a),
      1,
    ];
  };

  const sciezka = (n) => {
    const czesci = [];
    let w = n;
    while (w && w.nodeType === 1 && czesci.length < 4) {
      let s = w.tagName.toLowerCase();
      if (w.id) {
        czesci.unshift(`${s}#${w.id}`);
        break;
      }
      const kl = (typeof w.className === "string" ? w.className : "").trim().split(/\s+/)[0];
      if (kl) s += `.${kl}`;
      czesci.unshift(s);
      w = w.parentElement;
    }
    return czesci.join(">");
  };

  /* Stos malowania pod punktem, od wskazanej warstwy w dół; składanie od spodu. */
  const tloPod = (x, y, od, wlacznie) => {
    const stos = document.elementsFromPoint(x, y);
    let i = stos.indexOf(od);
    if (i < 0) {
      let p = od.parentElement;
      while (p && i < 0) {
        i = stos.indexOf(p);
        p = p.parentElement;
      }
    }
    if (i < 0) return { kolor: null, obraz: false, brakStosu: true };
    const warstwy = stos.slice(wlacznie ? i : i + 1);
    let obraz = false;
    let kolor = [255, 255, 255, 1]; // kanwa przeglądarki pod wszystkim
    for (let k = warstwy.length - 1; k >= 0; k--) {
      const cs = getComputedStyle(warstwy[k]);
      if (cs.backgroundImage && cs.backgroundImage !== "none") obraz = true;
      const b = naRgb(cs.backgroundColor);
      if (b && b[3] > 0) kolor = zloz(b, kolor);
    }
    return { kolor, obraz, brakStosu: false };
  };

  const widoczny = (n) => {
    const cs = getComputedStyle(n);
    if (cs.display === "none" || cs.visibility === "hidden") return false;
    if (parseFloat(cs.opacity) === 0) return false;
    const r = n.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  const wKadrze = (x, y) => x >= 0 && y >= 0 && x < innerWidth && y < innerHeight;

  const opisSladu = (n) => {
    const cs = getComputedStyle(n);
    const szer = parseFloat(cs.outlineWidth) || 0;
    if (cs.outlineStyle === "none" || szer === 0) return null;
    return { kolor: naRgb(cs.outlineColor), szerokosc: szer, styl: cs.outlineStyle };
  };

  el.scrollIntoView({ block: "center", inline: "nearest" });

  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  if (!widoczny(el)) {
    return { selektor: sciezka(el), tag: el.tagName, pominiety: "niewidoczny" };
  }
  /* Element odsunięty poza kadr (wzorzec skip-linku: `inset-block-start:-3rem`)
     nie jest malowany. Mierzenie go dałoby kontrast wobec kanwy przeglądarki,
     czyli liczbę bez pokrycia w tym, co ktokolwiek widzi. */
  if (r.bottom <= 0 || r.top >= innerHeight || r.right <= 0 || r.left >= innerWidth) {
    return { selektor: sciezka(el), tag: el.tagName, pominiety: "poza kadrem" };
  }

  const px = Math.min(Math.max(r.left + r.width / 2, 0.5), innerWidth - 0.5);
  const py = Math.min(Math.max(r.top + r.height / 2, 0.5), innerHeight - 0.5);

  /* Węzły niosące tekst BEZPOŚREDNI — kolor mierzy się tam, gdzie stoją
     litery, nie na kontenerze, który koloru może nie używać. */
  const nosniki = [];
  const zbierz = (n) => {
    for (const d of n.childNodes) {
      if (d.nodeType === 3 && d.nodeValue.trim().length > 0) {
        nosniki.push(n);
        break;
      }
    }
    for (const d of n.children) zbierz(d);
  };
  zbierz(el);

  const teksty = [];
  for (const n of nosniki) {
    if (!widoczny(n)) continue;
    /* Węzeł może być przycięty przez własny kontener przewijania (komórki
       tabeli porównawczej przy 390 px wyjeżdżają poza `overflow-x`). Bez
       tego przewinięcia stos malowania go nie zwraca i pomiar wypada jako
       nieoznaczalny — czyli powstaje dziura tam, gdzie treść realnie jest. */
    n.scrollIntoView({ block: "nearest", inline: "nearest" });
    const ncs = getComputedStyle(n);
    let punkt = null;
    let probka = "";
    for (const d of n.childNodes) {
      if (d.nodeType !== 3 || !d.nodeValue.trim()) continue;
      const zakres = document.createRange();
      zakres.selectNodeContents(d);
      const rr = zakres.getBoundingClientRect();
      if (rr.width > 0 && rr.height > 0) {
        punkt = { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 };
        probka = d.nodeValue.trim().slice(0, 48);
        break;
      }
    }
    if (!punkt) continue;
    if (!wKadrze(punkt.x, punkt.y)) {
      teksty.push({ selektor: sciezka(n), probka, pominiety: "tekst poza kadrem" });
      continue;
    }
    const tlo = tloPod(punkt.x, punkt.y, n, true);
    teksty.push({
      selektor: sciezka(n),
      probka,
      kolor: naRgb(ncs.color),
      tlo: tlo.kolor,
      obrazWTle: tlo.obraz,
      brakStosu: tlo.brakStosu,
      rozmiar: parseFloat(ncs.fontSize),
      waga: parseInt(ncs.fontWeight, 10) || 400,
    });
  }

  const zaKontrolka = tloPod(px, py, el, false);
  // Wypełnienie ZŁOŻONE — po nałożeniu alfy na to, co pod spodem. Deklaracja
  // `rgba(…, .5)` sama w sobie nie jest kolorem, który ktokolwiek widzi.
  const wypelnienieZlozone = tloPod(px, py, el, true);
  const przodkowie = [];
  let p = el.parentElement;
  for (let i = 0; i < 6 && p && p !== document.documentElement; i++, p = p.parentElement) {
    const rp = p.getBoundingClientRect();
    const ppx = Math.min(Math.max(rp.left + rp.width / 2, 0.5), innerWidth - 0.5);
    const ppy = Math.min(Math.max(rp.top + rp.height / 2, 0.5), innerHeight - 0.5);
    const tlp = wKadrze(ppx, ppy) ? tloPod(ppx, ppy, p, false) : { kolor: null, obraz: false };
    przodkowie.push({
      selektor: sciezka(p),
      slad: opisSladu(p),
      tlo: naRgb(getComputedStyle(p).backgroundColor),
      tloZa: tlp.kolor,
      obrazWTle: tlp.obraz,
    });
  }

  const krawedzie = ["Top", "Right", "Bottom", "Left"].map((bok) => ({
    bok,
    szerokosc: parseFloat(cs[`border${bok}Width`]) || 0,
    styl: cs[`border${bok}Style`],
    kolor: naRgb(cs[`border${bok}Color`]),
  }));

  return {
    selektor: sciezka(el),
    tag: el.tagName,
    przystanek: el.tabIndex >= 0, // czy w ogóle bywa celem klawiatury
    wylaczony: el.matches(":disabled") || el.getAttribute("aria-disabled") === "true",
    /* Kontener natywnej kontrolki: stan i afordancję niesie widżet
       przeglądarki w środku, nie tło kontenera. Patrz wyjątek W-GRANICA-01. */
    zNatywnaKontrolka: !!el.querySelector(
      'input:not([type="hidden"]):not([type="button"]):not([type="submit"]), select, textarea'
    ),
    prostokat: { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) },
    wypelnienie: naRgb(cs.backgroundColor),
    wypelnienieZlozone: wypelnienieZlozone.kolor,
    obrazWypelnienia: cs.backgroundImage !== "none" || wypelnienieZlozone.obraz,
    zaKontrolka: zaKontrolka.kolor,
    obrazZaKontrolka: zaKontrolka.obraz,
    krawedzie,
    slad: opisSladu(el),
    teksty,
    przodkowie,
  };
}

/**
 * Szuka reguł, których sonda z zasady NIE pokryje: stan pseudoklasą postawiony
 * na innym elemencie niż podmiot selektora, poza `:has()`. Dziś takich nie ma;
 * gdy powstaną, bramka ma stanąć, a nie milczeć.
 */
function skanerRegulStanu() {
  // Kolejność alternatywy ma znaczenie: „focus" zjadłoby „focus-visible".
  const STANY_RE = /:(focus-visible|focus-within|hover|active|focus|disabled)\b/;
  const podejrzane = [];
  const przejrzyj = (regula, zrodlo) => {
    if (regula.cssRules) {
      for (const r of regula.cssRules) przejrzyj(r, zrodlo);
      return;
    }
    const sel = regula.selectorText;
    if (!sel) return;
    for (const czesc of sel.split(",")) {
      const s = czesc.trim();
      if (!STANY_RE.test(s)) continue;
      // Wytnij zawartość :has(...) / :is(...) / :where(...) / :not(...) —
      // tam stan opisuje INNY element i jest przez sondę obsłużony.
      const bezNawiasow = s.replace(/:(has|is|where|not)\([^)]*\)/g, ":$1()");
      const m = bezNawiasow.match(STANY_RE);
      if (!m) continue;
      // Po pseudoklasie stanu zostaje kombinator → podmiotem selektora jest
      // INNY element niż ten, na którym stoi stan. Tego sonda nie wymusi.
      const ogon = bezNawiasow.slice(m.index + m[0].length);
      if (/[\s>+~]/.test(ogon)) podejrzane.push({ selektor: s, zrodlo });
    }
  };
  for (const arkusz of document.styleSheets) {
    let reguly;
    try {
      reguly = arkusz.cssRules;
    } catch {
      podejrzane.push({ selektor: "(arkusz niedostępny z innego źródła)", zrodlo: arkusz.href || "?" });
      continue;
    }
    for (const r of reguly) przejrzyj(r, arkusz.href || "inline");
  }
  return podejrzane;
}

/** Deklaracja dla `Runtime.callFunctionOn` — przekazuje związane `this` dalej. */
export const ZRODLO_SONDY = `function () { return (${sondaWezla})(this); }`;
export const ZRODLO_SKANERA = skanerRegulStanu.toString();

/* ─────────────────────────────────────────────────────────────────────────
   Sterowanie CDP. `DOM.querySelectorAll` daje nodeId (do wymuszania stanu),
   `DOM.resolveNode` daje uchwyt tego SAMEGO węzła do pomiaru — dzięki temu
   nigdzie nie zakładamy, że kolejność list po obu stronach się zgadza.
   ───────────────────────────────────────────────────────────────────────── */

/**
 * Mierzy jedną wyrenderowaną stronę we wszystkich stanach.
 * @param {import("@playwright/test").Page} page
 * @param {import("@playwright/test").CDPSession} cdp
 * @returns {Promise<{
 *   elementy: PomiaryElementu[],
 *   podejrzaneReguly: {selektor: string, zrodlo: string}[],
 * }>}
 */
export async function zmierzStrone(page, cdp) {
  const podejrzaneReguly = await page.evaluate(`(${ZRODLO_SKANERA})()`);

  const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
  const { nodeIds } = await cdp.send("DOM.querySelectorAll", {
    nodeId: root.nodeId,
    selector: SELEKTOR_KLIKALNE,
  });

  const elementy = [];
  for (const nodeId of nodeIds) {
    const { object } = await cdp.send("DOM.resolveNode", { nodeId });
    const pomiary = {};
    for (const stan of STANY) {
      await cdp.send("CSS.forcePseudoState", {
        nodeId,
        forcedPseudoClasses: PSEUDOKLASY[stan],
      });
      const { result } = await cdp.send("Runtime.callFunctionOn", {
        objectId: object.objectId,
        functionDeclaration: ZRODLO_SONDY,
        returnByValue: true,
      });
      pomiary[stan] = result.value;
    }
    await cdp.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: [] });
    await cdp.send("Runtime.releaseObject", { objectId: object.objectId });
    elementy.push(pomiary);
  }
  return { elementy, podejrzaneReguly };
}

/* ─────────────────────────────────────────────────────────────────────────
   Ocena — czysta arytmetyka po stronie Node, żeby dała się sprawdzić bez
   przeglądarki i żeby liczby w raporcie pochodziły z jednego miejsca.
   ───────────────────────────────────────────────────────────────────────── */

export const luminancja = (c) => {
  const lin = (v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
};

export const kontrast = (a, b) => {
  const l1 = luminancja(a);
  const l2 = luminancja(b);
  const [j, c] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (j + 0.05) / (c + 0.05);
};

export const zapis = (c) =>
  c ? `rgb(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])})` : "—";

/**
 * Odcisk wyglądu jednego pomiaru — do wykrycia, czy wymuszanie stanów
 * W OGÓLE działa. Gdyby `CSS.forcePseudoState` przestało działać (zmiana
 * w CDP, inna przeglądarka, literówka w nazwie pseudoklasy), wszystkie stany
 * zrównałyby się ze spoczynkiem, każdy pomiar byłby poprawny i bramka
 * świeciłaby na zielono nie mierząc NICZEGO. Dokładnie ten sposób zerowania
 * strażnika opisuje ADR-018.
 */
export function odciskWygladu(m) {
  if (!m || m.pominiety) return `pominięty:${m?.pominiety || "brak"}`;
  return [
    zapis(m.wypelnienieZlozone),
    m.krawedzie.map((k) => `${k.szerokosc}${k.styl}${zapis(k.kolor)}`).join("|"),
    m.slad ? `${m.slad.szerokosc}${m.slad.styl}${zapis(m.slad.kolor)}` : "brak",
    m.teksty.map((t) => zapis(t.kolor)).join("|"),
    m.przodkowie.map((p) => (p.slad ? zapis(p.slad.kolor) : "-")).join("|"),
  ].join("¦");
}

/** Czy któryś z wymuszonych stanów zmienił wygląd wobec spoczynku. */
export function stanZmieniaWyglad(pomiary) {
  const wzorzec = odciskWygladu(pomiary.spoczynek);
  return STANY.filter((s) => s !== "spoczynek").some(
    (s) => odciskWygladu(pomiary[s]) !== wzorzec
  );
}

export const progTekstu = (rozmiar, waga) =>
  rozmiar >= 24 || (rozmiar >= 18.66 && waga >= 700) ? PROGI.tekstDuzy : PROGI.tekst;

/**
 * Zamienia surowe pomiary jednego elementu we WSZYSTKICH stanach na listę
 * naruszeń. Osobno zwraca pozycje NIEOZNACZALNE (obraz w tle, brak stosu) —
 * te nie są zielone i nie są czerwone, mają być widoczne w raporcie.
 * @param {string} trasa
 * @param {string} kadr
 * @param {PomiaryElementu} pomiary
 * @returns {{naruszenia: Naruszenie[], nieoznaczalne: Nieoznaczalne[]}}
 */
export function ocenElement(trasa, kadr, pomiary) {
  /** @type {Naruszenie[]} */
  const naruszenia = [];
  /** @type {Nieoznaczalne[]} */
  const nieoznaczalne = [];
  const spoczynek = pomiary.spoczynek;

  for (const stan of STANY) {
    const m = pomiary[stan];
    if (!m || m.pominiety) continue;

    const wylaczony = m.wylaczony;
    const dodaj = (typ, opis, wartosc, prog, szczegol) =>
      naruszenia.push({
        trasa,
        kadr,
        stan,
        typ,
        selektor: m.selektor,
        opis,
        wartosc: +wartosc.toFixed(2),
        prog,
        szczegol,
      });

    /* 1.4.3 — tekst na tle, w każdym stanie. */
    for (const t of m.teksty) {
      if (t.pominiety) continue;
      if (t.obrazWTle || t.brakStosu || !t.tlo || !t.kolor) {
        nieoznaczalne.push({
          trasa,
          kadr,
          stan,
          selektor: t.selektor,
          powod: t.brakStosu ? "element poza stosem malowania" : "obraz/gradient w tle",
          probka: t.probka,
        });
        continue;
      }
      const k = kontrast(t.kolor, t.tlo);
      const prog = wylaczony ? PROGI.wylaczony : progTekstu(t.rozmiar, t.waga);
      if (k < prog) {
        dodaj(
          wylaczony ? "tekst-wylaczony" : "tekst",
          `${zapis(t.kolor)} na ${zapis(t.tlo)}`,
          k,
          prog,
          `„${t.probka}" ${t.rozmiar}px/${t.waga}`
        );
      }
    }

    /* 2.4.11 + 1.4.11 — ślad fokusa musi istnieć i być widoczny.
       Tylko dla rzeczywistych przystanków klawiatury: `<label>` klika się
       myszą, ale celem Taba jest kontrolka w środku, więc żądanie śladu
       od etykiety byłoby żądaniem nie z tej normy. */
    if (stan === "fokus" && m.przystanek) {
      const kandydaci = [];
      if (m.slad && (!spoczynek?.slad || zapis(m.slad.kolor) !== zapis(spoczynek.slad.kolor)))
        kandydaci.push({ slad: m.slad, tlo: m.zaKontrolka, obraz: m.obrazZaKontrolka, gdzie: m.selektor });
      m.przodkowie.forEach((pr, i) => {
        const przedtem = spoczynek?.przodkowie?.[i];
        if (pr.slad && !przedtem?.slad)
          kandydaci.push({ slad: pr.slad, tlo: pr.tloZa, obraz: pr.obrazWTle, gdzie: pr.selektor });
      });

      if (kandydaci.length === 0) {
        naruszenia.push({
          trasa,
          kadr,
          stan,
          typ: "fokus-brak",
          selektor: m.selektor,
          opis: "brak śladu fokusa (ani na elemencie, ani na przodkach)",
          wartosc: 0,
          prog: PROGI.ui,
          szczegol: m.tag,
        });
      } else {
        const naj = kandydaci[0];
        if (!naj.tlo || naj.obraz) {
          nieoznaczalne.push({
            trasa,
            kadr,
            stan,
            selektor: naj.gdzie,
            powod: "tło pod śladem fokusa nieoznaczalne",
            probka: "ślad fokusa",
          });
        } else {
          const k = kontrast(naj.slad.kolor, naj.tlo);
          if (k < PROGI.ui)
            dodaj(
              "fokus-kontrast",
              `ślad ${zapis(naj.slad.kolor)} na ${zapis(naj.tlo)}`,
              k,
              PROGI.ui,
              naj.gdzie
            );
        }
      }
    }

    /* 1.4.11 — granica kontrolki, w każdym stanie.
       Sprawdzana wyłącznie tam, gdzie autor RYSUJE kontrolkę: wypełnienie
       różne od tła pod nią albo widoczna krawędź. Wtedy ten rysunek jest
       jedynym, co odróżnia przycisk od zwykłego tekstu, więc musi trzymać
       3:1. Nośnikiem granicy jest NAJMOCNIEJSZY ze składników rysunku
       (wypełnienie, krawędź, ślad) — użytkownikowi wystarczy jeden widoczny.
       To ten warunek wykrył, że limonkowe wypełnienie CTA na jasnym tle
       (1,12:1) samo przycisku nie rysuje i granicę niesie dopiero obwódka.

       WYJĄTEK W-GRANICA-01 — kontener natywnej kontrolki. Etykieta
       przełącznika okresu maluje tło `powierzchnia-2` przy 1,00:1 wobec tła
       strony; to DEKORACJA, bo stan i afordancję niesie natywne `input`
       w środku (komentarz przy regule w SekcjaPlanow.module.css). Wyjątek
       nie jest wpisem na listę nazw klas: warunkiem jest OBECNOŚĆ natywnej
       kontrolki w środku, sprawdzana w czasie pomiaru. Zamiana pigułki na
       `div` sterowany JS-em kasuje wyjątek sama z siebie i bramka staje.
       ŚLEPY PUNKT, świadomy: rysunku samego widżetu przeglądarki (kółko
       radia, ptaszek pola wyboru) nie da się zmierzyć ze stylu wyliczonego
       — nie ma go w CSS. Ten fragment kontrastu pozostaje poza sondą. */
    if (!m.zNatywnaKontrolka) {
      if (m.obrazWypelnienia || m.obrazZaKontrolka || !m.zaKontrolka || !m.wypelnienieZlozone) {
        nieoznaczalne.push({
          trasa,
          kadr,
          stan,
          selektor: m.selektor,
          powod: "obraz/gradient pod granicą kontrolki",
          probka: "granica",
        });
      } else {
        const maWypelnienie = zapis(m.wypelnienieZlozone) !== zapis(m.zaKontrolka);
        const krawedzie = m.krawedzie.filter(
          (k) => k.szerokosc > 0 && k.styl !== "none" && k.kolor
        );
        if (maWypelnienie || krawedzie.length > 0) {
          const skladniki = [];
          if (maWypelnienie) skladniki.push(kontrast(m.wypelnienieZlozone, m.zaKontrolka));
          for (const k of krawedzie) skladniki.push(kontrast(k.kolor, m.zaKontrolka));
          if (m.slad?.kolor) skladniki.push(kontrast(m.slad.kolor, m.zaKontrolka));
          const najlepszy = Math.max(...skladniki);
          if (najlepszy < PROGI.ui)
            dodaj(
              "granica",
              `rysunek ${zapis(m.wypelnienieZlozone)} na ${zapis(m.zaKontrolka)}`,
              najlepszy,
              PROGI.ui,
              `wypełnienie/krawędź/ślad — najmocniejszy ${najlepszy.toFixed(2)}:1`
            );
        }
      }
    }
  }

  return { naruszenia, nieoznaczalne };
}
