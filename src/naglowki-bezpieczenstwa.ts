/**
 * NAGŁÓWKI BEZPIECZEŃSTWA — JEDNO ŹRÓDŁO LISTY (zlecenie WWW/102 KROK 3).
 *
 * Ten plik istnieje po to, żeby lista nagłówków miała DOKŁADNIE JEDNO
 * miejsce. Czytają go dwaj konsumenci i żaden z nich nie trzyma kopii:
 *   · `next.config.ts` → `headers()` — USTAWIA je na każdej odpowiedzi,
 *   · `e2e/naglowki-bezpieczenstwa.spec.ts` — SPRAWDZA, że doszły.
 * Strażnik porównujący odpowiedź z własną, przepisaną listą byłby drugim
 * źródłem prawdy o tym, co ma dochodzić — a rozjazd dwóch list jest gorszy
 * niż brak jednej z nich (zakaz 10). Przy takim rozjeździe strażnik
 * zapala się albo milczy o nagłówku, którego konfiguracja już nie wysyła,
 * i w obie strony wygląda to jak wynik.
 *
 * ŻADNYCH IMPORTÓW W TYM PLIKU — celowo. Ładuje go loader konfiguracji
 * Next-a przed zbudowaniem aplikacji; import czegokolwiek z `src/`
 * wciągnąłby tam środowisko aplikacji (next-intl, runtime Edge) i zamienił
 * prostą listę w zależność od kolejności inicjalizacji.
 *
 * ──────────────────────────────────────────────────────────────────────
 * CO ZMIERZONO PRZED NAPISANIEM TEJ POLITYKI (2026-10-08, stojak na
 * budowaniu `f823b7b`, 30 adresów = 10 tras × pl/en/de, 1 094 313 B HTML-a).
 * Każda liczba niżej pochodzi ze spisu `spis-csp.mjs`, który obok każdego
 * licznika puszcza licznik kontrolny na wzorcu, który wystąpić MUSI
 * (`<html` 30/30, `<body` 30/30) — bez tego jego zera byłyby zerami
 * parsera, nie dokumentu.
 *
 *   · 0 źródeł spoza własnego origin w całym oddanym HTML-u,
 *   · 0 `data:`, 0 `blob:`,
 *   · 0 znaczników `<style>`, 0 atrybutów `style=""`, 0 handlerów `on*=`,
 *   · 138 arkuszy `<link rel=stylesheet>` — wszystkie z własnego origin,
 *   · 2 wystąpienia `url()` w 58 046 B zbudowanego CSS — oba to fonty
 *     `/fonts/*.woff2` z własnego origin; 0 `@import`, 0 zewnętrznych https,
 *   · 0 `eval(`, 0 `new Function(`, 0 `WebAssembly` w 838 961 B
 *     zbudowanego JS (kontrola pozytywna tego samego greps: `function`
 *     4273 trafienia) → `'unsafe-eval'` NIE JEST tu potrzebny i go nie ma,
 *   · 0 `<iframe>`, 0 `<video>` → `frame-src` i `media-src` mogą być `'none'`,
 *   · zdolności przeglądarki: 0 plików `src/` dotyka geolokalizacji, kamery,
 *     mikrofonu, USB, bluetooth, XR, schowka ani pełnego ekranu. Jedyne
 *     trafienie wzorca „payment" to NAPIS treści `"Payment questions"`
 *     w `src/i18n/messages/en.json:109`, nie Payment Request API —
 *     sprawdzone odczytem pliku, bo zakazanie zdolności, której strona
 *     używa, to klasa „bramka szkodząca przez poprawność".
 *
 * ⚠ GRANICA TEGO SPISU: czytał HTML i CSS ODDANE PRZEZ SERWER. Nie widzi
 * zasobów doładowywanych JavaScriptem w przeglądarce. Dlatego werdykt
 * o naruszeniach stawia PRZEGLĄDARKA (raport z konsoli na wszystkich
 * trasach), a nie ten spis — spis służył do ZBUDOWANIA polityki,
 * przeglądarka do jej SPRAWDZENIA.
 *
 * ──────────────────────────────────────────────────────────────────────
 * CZEGO TU CELOWO NIE MA I DLACZEGO — bo brak wpisany bez powodu wygląda
 * potem jak przeoczenie i ktoś go „uzupełni":
 *
 *   · `includeSubDomains` i `preload` przy HSTS. Oba są DECYZJĄ WŁAŚCICIELA,
 *     nie moją: `preload` wpisuje domenę na listę wbudowaną w przeglądarki,
 *     a zdjęcie jej z tej listy trwa miesiącami — to nieodwracalne w sensie
 *     ADR-018, a prymat nieodwracalnego każe tu stanąć. `includeSubDomains`
 *     wiąże WSZYSTKIE poddomeny, a inwentarza poddomen z tej strony NIE
 *     ZMIERZYŁEM (to konfiguracja domen w panelu Vercela, nie repozytorium).
 *     Niepewność się zgłasza, nie zasypuje: dopisanie któregokolwiek z tych
 *     dwóch wymaga osobnej zgody i spisu poddomen.
 *   · `report-uri` / `report-to`. Zlecenie żąda „zero naruszeń W KONSOLI",
 *     czyli kanałem jest konsola przeglądarki. Punkt zbiorczy raportów
 *     byłby zbieraniem danych o odwiedzających (obszar DANE z ADR-018)
 *     i wymagałby adresu, którego nie ma.
 *   · `upgrade-insecure-requests`. Przy 0 zasobach spoza własnego origin
 *     nie ma czego podnosić, a dyrektywa zmieniałaby zachowanie pomiaru
 *     lokalnego po http.
 *   · tryb EGZEKWOWANY. Nagłówek jest i zostaje `-Report-Only`. Zlecenie
 *     WWW/102-W mówi wprost: „CSP tylko Report-Only — bez trybu
 *     wymuszającego". Przełączenie jest PROPOZYCJĄ do zgody właściciela.
 */

/**
 * DYREKTYWY CSP — mapa, nie sklejony ciąg. Powód: ciąg jest nieczytelny
 * w diffie i kusi do edycji „w środku", a mapa daje jedną dyrektywę na
 * linię i widoczną różnicę przy każdej zmianie.
 */
export const DYREKTYWY_CSP: Readonly<Record<string, readonly string[]>> = {
  // Domyślna zapora: wszystko z własnego origin, chyba że dyrektywa niżej mówi inaczej.
  "default-src": ["'self'"],

  /**
   * ⚠ TA JEDNA DYREKTYWA JEST DZIŚ NIESPEŁNIALNA I TO JEST ZMIERZONE,
   * NIE PRZYPUSZCZONE. W oddanym HTML-u stoi 476 skryptów INLINE bez
   * atrybutu `src` (15,9 na stronę, 80 różnych wzorców) i WSZYSTKIE są
   * ładunkiem RSC `self.__next_f.push(...)`, który Next wpisuje do
   * prerenderowanego HTML-a. Żaden nie ma `nonce` ani `integrity` (0 z 476).
   *
   * `'self'` bez `'unsafe-inline'` BĘDZIE JE ZGŁASZAŁO. To arytmetyka
   * polityki, a nie ryzyko — i dlatego nagłówek jest Report-Only.
   *
   * DLACZEGO NIE `nonce` („jeśli potrzebny" ze zlecenia) — rozstrzygnięte
   * TRZEMA POMIARAMI, nie lekturą dokumentacji Next-a:
   *   1. każda odpowiedź niesie `x-nextjs-prerender: 1` — także 404,
   *   2. dwa żądania pod `/cennik` dają IDENTYCZNĄ sumę SHA-256 treści,
   *   3. na dysku po budowaniu leży 31 plików `.html`.
   * Jeden zapisany artefakt nie może nieść wartości unikalnej PER
   * ODPOWIEDŹ — więc nonce wymagałby renderowania na żądanie, czyli
   * oddania generowania statycznego (ADR-007). To nie jest zmiana
   * w zakresie tego kroku i nie wolno jej zrobić „przy okazji" (zakaz 8).
   *
   * DLACZEGO NIE HASZE: haszy musiałoby być 476 i zmieniałyby się przy
   * każdym budowaniu, bo ładunek niesie treść konkretnej strony. Polityka
   * przeliczana przy każdym budowaniu nie jest polityką, jest artefaktem.
   *
   * CZEGO TU NIE MA I NIE BĘDZIE: `'unsafe-inline'`. Dopisanie go dałoby
   * „zero naruszeń" — i byłoby zamianą czerwieni na ciszę, czyli dokładnie
   * tym, czego zabrania zakaz 3. Zero kupione osłabieniem miary nie jest
   * zerem.
   */
  "script-src": ["'self'"],

  // 0 znaczników <style>, 0 atrybutów style="" → ścisłe bez wyjątku.
  "style-src": ["'self'"],

  // 30 <img>, wszystkie z własnego origin; 0 data:, 0 blob:.
  "img-src": ["'self'"],

  // 2 url() w CSS, oba /fonts/*.woff2 z własnego origin.
  "font-src": ["'self'"],

  // Nawigacja RSC pobiera ładunki z własnego origin.
  "connect-src": ["'self'"],

  // 0 <video>, 0 <audio>.
  "media-src": ["'none'"],

  // Brak <object>/<embed> — i nie ma powodu, by kiedykolwiek był.
  "object-src": ["'none'"],

  // 0 <iframe>.
  "frame-src": ["'none'"],

  // Zlecenie żąda tego WPROST, obok X-Frame-Options: DENY. Dwa mechanizmy
  // na jedną rzecz nie są tu nadmiarem — X-Frame-Options jest starszy
  // i rozumiany przez przeglądarki, które nie znają frame-ancestors.
  "frame-ancestors": ["'none'"],

  // Blokuje wstrzyknięcie <base>, które przekierowałoby adresy względne.
  "base-uri": ["'self'"],

  // Formularze wyłącznie do własnego origin.
  "form-action": ["'self'"],
};

/** Sklejenie mapy w wartość nagłówka. Kolejność z `Object.entries`, czyli
 *  z kolejności zapisu wyżej — stabilna, więc wartość nagłówka jest
 *  porównywalna znak w znak między przebiegami. */
export const CSP_REPORT_ONLY: string = Object.entries(DYREKTYWY_CSP)
  .map(([dyrektywa, zrodla]) => `${dyrektywa} ${zrodla.join(" ")}`)
  .join("; ");

/**
 * ZDOLNOŚCI PRZEGLĄDARKI ODEBRANE STRONIE — każda z listy zmierzona jako
 * NIEUŻYWANA w `src/` (0 plików), z kontrolą pozytywną tego samego greps
 * w tym samym przebiegu (`next-intl` → 25 plików).
 *
 * ⚠ LISTA JEST KRÓTKA CELOWO. Przeglądarka wypisuje W KONSOLI ostrzeżenie
 * o każdej nierozpoznanej nazwie zdolności — a konsola jest tu PRZYRZĄDEM
 * POMIAROWYM dla CSP. Dłuższa lista „na zapas" zasypałaby własny pomiar
 * ostrzeżeniami o sobie samej. Zawartość tej listy jest więc wynikiem
 * pomiaru konsoli, nie przepisanym szablonem.
 */
export const ZDOLNOSCI_ODEBRANE: readonly string[] = [
  "accelerometer",
  "autoplay",
  "camera",
  "display-capture",
  "encrypted-media",
  "fullscreen",
  "geolocation",
  "gyroscope",
  "magnetometer",
  "microphone",
  "midi",
  "payment",
  "picture-in-picture",
  "usb",
  "xr-spatial-tracking",
];

export const PERMISSIONS_POLICY: string = ZDOLNOSCI_ODEBRANE.map(
  (z) => `${z}=()`,
).join(", ");

/**
 * KOMPLET WYMAGANY NA KAŻDEJ ODPOWIEDZI. Ta tablica jest źródłem dla
 * `next.config.ts` ORAZ dla strażnika e2e — stąd `key` w zapisie
 * nagłówkowym (czytelnym w diffie) i osobna, wyliczana lista nazw małymi
 * literami dla strażnika, który czyta `Response.headers()` w HTTP/2.
 */
export const NAGLOWKI_BEZPIECZENSTWA: readonly { key: string; value: string }[] =
  [
    /**
     * HSTS. ⚠ NA LOKALNYM STOJAKU PO http TEN NAGŁÓWEK JEST BEZCZYNNY —
     * przeglądarki ignorują HSTS na połączeniu nieszyfrowanym. Zmierzona
     * jest więc jego OBECNOŚĆ, nie SKUTEK. To granica pomiaru, nie zieleń;
     * skutek dałoby się zmierzyć wyłącznie na https (preview/produkcja).
     * 63072000 s = 2 lata, wartość zalecana tam, gdzie nie dopisuje się
     * `preload` (powody braku `preload` i `includeSubDomains` — w nagłówku pliku).
     */
    { key: "Strict-Transport-Security", value: "max-age=63072000" },

    // Starszy mechanizm tego samego, co frame-ancestors 'none' w CSP.
    { key: "X-Frame-Options", value: "DENY" },

    /**
     * Przy 0 zasobach spoza własnego origin `no-referrer` też byłby
     * bezpieczny, ale `strict-origin-when-cross-origin` nie zabiera
     * informacji o pochodzeniu przy przejściach wewnątrz serwisu i nie
     * wysyła nic po degradacji https→http. Wybór z dwóch bezpiecznych,
     * nie z bezpiecznego i wygodnego.
     */
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

    { key: "Permissions-Policy", value: PERMISSIONS_POLICY },

    // Zakaz zgadywania typu treści przez przeglądarkę.
    { key: "X-Content-Type-Options", value: "nosniff" },

    /**
     * ⚠ `-Report-Only` NIE JEST TU ETAPEM PRZEJŚCIOWYM DO USUNIĘCIA PRZY
     * PORZĄDKOWANIU. Tryb egzekwowany wymaga osobnej zgody właściciela,
     * a przy 476 skryptach inline bez nonce włączenie go DZIŚ zablokowałoby
     * ładunek RSC na wszystkich 30 adresach.
     */
    { key: "Content-Security-Policy-Report-Only", value: CSP_REPORT_ONLY },
  ];

/** Nazwy małymi literami — HTTP/2 i `fetch()` normalizują do małych.
 *  WYLICZANE z tablicy wyżej, nie przepisane: lista przepisana byłaby
 *  drugim źródłem i mogłaby przeżyć nagłówek, którego dotyczyła. */
export const NAZWY_NAGLOWKOW: readonly string[] = NAGLOWKI_BEZPIECZENSTWA.map(
  (n) => n.key.toLowerCase(),
);
