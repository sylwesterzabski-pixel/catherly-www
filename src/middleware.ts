import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

/**
 * Middleware wyłącznie do routingu serwerowego next-intl:
 * przepisuje / → /pl (prefiks "as-needed") i kanonizuje /pl → /.
 * Nie wykonuje żadnego JS w przeglądarce — render bez JS pozostaje
 * pełny (progi CLAUDE.md: treść czytelna bez JS).
 */
export default createMiddleware(routing);

export const config = {
  // Bez tras wewnętrznych Nexta, plików statycznych i /login
  // (szew logowania do aplikacji — ADR-022/ADR-023, poza i18n www).
  matcher: "/((?!api|login|_next|_vercel|.*\\..*).*)",
};
