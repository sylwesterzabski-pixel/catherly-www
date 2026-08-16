import rejestr from "../../design/pipeline-obrazow.json";

/**
 * Zrzuty produktu (dostawa Z6) — warstwa między rejestrem pipeline'u
 * a komponentami. Rejestr jest TEN SAM, którego używa generator
 * (scripts/obrazy-pipeline.mjs), więc nazwa pliku nie istnieje
 * w dwóch miejscach: markup nie może wskazać wariantu, którego
 * pipeline nie wyprodukował, ani odwrotnie — bez rozjazdu do
 * wykrycia dopiero okiem na produkcji.
 *
 * ADR-011: to NIE są ilustracje dekoracyjne (te opisuje
 * design/image-style.md i mają pusty alt). To zrzuty realnej
 * aplikacji na danych demo — jedyna dopuszczona droga pokazania
 * produktu — więc `<img>` jest INFORMACYJNY, z opisowym alt
 * ×3 języki i BEZ aria-hidden (W2 handoffu K4).
 */
export type ZrzutFilaru = {
  /** Prefiks nazw plików w public/obrazy/filary (bez rozszerzenia). */
  baza: string;
  /** Trasa aplikacji, z której powstał kadr (ślad pochodzenia). */
  trasaAplikacji: string;
};

const KATALOG = `/${rejestr.wyjscie.replace(/^public\//, "")}`;

/**
 * Czy zrzuty są osadzone na stronie głównej. Dziś FALSE — powód,
 * decyzja właściciela i warunek włączenia stoją w rejestrze
 * (design/pipeline-obrazow.json → osadzenieNaGlownej), żeby nie było
 * dwóch wersji tej odpowiedzi.
 *
 * Krótko: „/" miało 1704 ms przy budżecie 1800, a cztery kadry
 * dokładają +150 ms — mimo leniwego ładowania i niskiego priorytetu,
 * bo przeglądarka pobiera je i tak w oknie startowym. Wariant 4
 * właściciela (2026-08-16): najpierw odzyskać zapas na „/", potem
 * włączyć. Kod osadzenia zostaje kompletny — włączenie to zmiana
 * jednej flagi, nie odtwarzanie ścieżki od nowa.
 */
export const OSADZENIE_NA_GLOWNEJ = rejestr.osadzenieNaGlownej.wlaczone;

/** Wymiary REALNYCH plików źródłowych — do atrybutów width/height
 *  (W3: rezerwacja miejsca w układzie, nie „mniej więcej"). */
export const SZEROKOSC_ZRODLA = rejestr.szerokoscZrodla;
export const WYSOKOSC_ZRODLA = rejestr.wysokoscZrodla;

/**
 * Deklaracja szerokości renderowania — musi odpowiadać CSS-owi K4,
 * inaczej przeglądarka pobiera wariant za duży (marnuje transfer)
 * albo za mały (rozmyty zrzut interfejsu, gdzie liczy się tekst).
 * ≥48rem: siatka 1fr/1fr z odstępem 3rem wewnątrz kontenera 70rem,
 * sekcja z marginesem 1rem z każdej strony. Poniżej: pełna szerokość
 * minus te marginesy. Wartości z Filar.module.css i tokenu
 * --wymiar-kontener-strony; zmiana układu K4 wymaga zmiany tutaj.
 */
export const SZEROKOSCI_RENDEROWANIA =
  "(min-width: 48rem) calc((min(100vw - 2rem, 70rem) - 3rem) / 2), calc(100vw - 2rem)";

/** srcset dla formatu: wszystkie warianty szerokości z rejestru. */
export function srcSet(baza: string, format: string): string {
  return rejestr.szerokosci
    .map((s) => `${KATALOG}/${baza}-${s}.${format} ${s}w`)
    .join(", ");
}

/** Formaty podawane w <source> (kolejność = priorytet wyboru). */
export const FORMATY_ZRODEL = rejestr.formaty;

/** Zapasowy <img src> dla przeglądarek bez AVIF i bez WebP —
 *  kopia bajt w bajt pliku, który przeszedł weryfikację sum. */
export function srcZapasowy(baza: string): string {
  return `${KATALOG}/${baza}.${rejestr.zapasowy}`;
}

/**
 * Zrzut przypisany filarowi. Brak wpisu to błąd budowania, nie pusty
 * kadr: filar bez obrazu ma wyglądać na zepsuty od razu, a nie
 * wyglądać poprawnie i po cichu nie pokazywać produktu.
 */
export function zrzutFilaru(klucz: string): ZrzutFilaru {
  const wpis = rejestr.obrazy.find((o) => o.filar === klucz);
  if (!wpis) {
    throw new Error(
      `Brak zrzutu dla „${klucz}" w design/pipeline-obrazow.json — ` +
        `dopisz kadr do rejestru albo popraw klucz filaru.`,
    );
  }
  return { baza: wpis.baza, trasaAplikacji: wpis.trasaAplikacji };
}
