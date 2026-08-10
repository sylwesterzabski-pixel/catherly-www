import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "./i18n/routing";
import { ISTNIEJACE_SCIEZKI } from "./i18n/sciezki";

/**
 * Middleware routingu serwerowego (zero JS w przeglądarce — progi
 * CLAUDE.md: treść czytelna bez JS):
 * 1. Ścieżki spoza rejestru istniejących stron (ISTNIEJACE_SCIEZKI) —
 *    ścieżka liczona WZGLĘDEM języka, więc także /pl/xyz i /en/xyz —
 *    → rewrite na prerenderowaną stronę /[locale]/nie-znaleziono ze
 *    statusem 404 (B2). To jedyna droga do PEŁNEGO HTML-a 404 bez JS:
 *    notFound() w renderze na żądanie (on-demand SSG i force-dynamic)
 *    serwuje w Next 15.5 pusty szkielet __next_error__ z treścią
 *    wyłącznie w ładunku RSC — szczegóły w app/[locale]/not-found.tsx.
 * 2. Pozostałe ścieżki → next-intl: przepisuje / → /pl wewnętrznie
 *    (prefiks "as-needed") i KANONIZUJE redirectem prefiks języka
 *    domyślnego: /pl → / oraz /pl/<istniejąca> → /<istniejąca>.
 */
const intlMiddleware = createMiddleware(routing);

/** Rozbija pathname żądania na język i ścieżkę względem języka
 *  (routing "as-needed": pl kanonicznie bez prefiksu, /en i /de
 *  z prefiksem). Prefiks /pl też jest tu zdejmowany — dzięki temu
 *  /pl/<istniejąca> trafia do intlMiddleware, który kanonizuje ją
 *  redirectem na wersję bez prefiksu, a /pl/xyz dostaje pełne 404. */
function rozbijSciezke(pathname: string): { locale: string; sciezka: string } {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}`) return { locale, sciezka: "/" };
    if (pathname.startsWith(`/${locale}/`)) {
      return { locale, sciezka: pathname.slice(locale.length + 1) };
    }
  }
  return { locale: routing.defaultLocale, sciezka: pathname };
}

export default function middleware(request: NextRequest) {
  const { locale, sciezka } = rozbijSciezke(request.nextUrl.pathname);

  if (!ISTNIEJACE_SCIEZKI.includes(sciezka)) {
    const cel = request.nextUrl.clone();
    cel.pathname = `/${locale}/nie-znaleziono`;
    return NextResponse.rewrite(cel, { status: 404 });
  }

  return intlMiddleware(request);
}

export const config = {
  // Bez tras wewnętrznych Nexta i plików statycznych. /login przechodzi
  // przez middleware jak każda strona per locale (placeholder B1a —
  // rejestr ISTNIEJACE_SCIEZKI); docelowo to szew do aplikacji
  // (ADR-022/ADR-023) — rewrite wejdzie w Fazie 5 i wtedy /login
  // wróci do wyjątków matchera.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
