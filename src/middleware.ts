import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "./i18n/routing";
import { ISTNIEJACE_SCIEZKI } from "./i18n/sciezki";

/**
 * Middleware routingu serwerowego (zero JS w przeglądarce — progi
 * CLAUDE.md: treść czytelna bez JS):
 * 1. Ścieżki spoza rejestru istniejących stron (ISTNIEJACE_SCIEZKI)
 *    → rewrite na prerenderowaną stronę /[locale]/nie-znaleziono ze
 *    statusem 404 (B2). To jedyna droga do PEŁNEGO HTML-a 404 bez JS:
 *    notFound() w renderze na żądanie (on-demand SSG i force-dynamic)
 *    serwuje w Next 15.5 pusty szkielet __next_error__ z treścią
 *    wyłącznie w ładunku RSC — szczegóły w app/[locale]/not-found.tsx.
 * 2. Pozostałe ścieżki → next-intl: przepisuje / → /pl (prefiks
 *    "as-needed") i kanonizuje /pl → /.
 */
const intlMiddleware = createMiddleware(routing);

/** Rozbija pathname żądania na język i ścieżkę względem języka
 *  (pl bez prefiksu; /en, /de z prefiksem — routing "as-needed"). */
function rozbijSciezke(pathname: string): { locale: string; sciezka: string } {
  for (const locale of routing.locales) {
    if (locale === routing.defaultLocale) continue;
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
  // Bez tras wewnętrznych Nexta, plików statycznych i /login
  // (szew logowania do aplikacji — ADR-022/ADR-023, poza i18n www).
  matcher: "/((?!api|login|_next|_vercel|.*\\..*).*)",
};
