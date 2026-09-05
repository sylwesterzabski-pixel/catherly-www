import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Prowieniencja wydania (ADR-018) — z jakiego commita pochodzi to, co
 * właśnie odpowiada na żądanie.
 *
 * Powód istnienia: bramka wydajności ma mierzyć preview Vercela pod
 * adresem ze zmiennej repozytorium LHCI_BAZA. Adres jest STAŁY, a
 * wdrożenie pod nim — nie. Bramka może więc trafić na wdrożenie
 * z poprzedniego commita (deploy jeszcze się buduje), albo z zupełnie
 * innej gałęzi (alias wskazuje gdzie indziej). Wynik byłby prawdziwym
 * pomiarem NIE TEGO kodu — czyli zielenią bez pokrycia, tej samej klasy
 * co pomiar ekranu logowania Vercela.
 *
 * Sam adres tego nie rozstrzyga i treść strony też nie: obie wersje
 * wyglądają identycznie. Rozstrzyga wyłącznie identyfikator commita
 * podany przez samo wdrożenie — stąd ten nagłówek. Czyta go strażnik
 * celu pomiaru (scripts/sprawdz-preview.mjs) i porównuje z commitem,
 * na którym stoi CI.
 *
 * Wartość: na Vercelu VERCEL_GIT_COMMIT_SHA, na runnerze GitHuba
 * GITHUB_SHA, lokalnie „lokalne". Nagłówek odpowiedzi, nie treść —
 * nie dotyka HTML-a, więc nie wchodzi w drogę bramkom treści.
 */
const WYDANIE =
  process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || "lokalne";

/**
 * L-OPS-04 — KATALOG BUDOWANIA ZE ZMIENNEJ, ŻEBY POMIAR NIE ZABIJAŁ CUDZEJ
 * PRACY (zlecenie WWW/089 krok 0b).
 *
 * ⚠ POTRZEBA ZMIERZONA DWA RAZY, NIE PRZYPUSZCZONA. `next dev` i `next build`
 * dzielą domyślnie ten sam katalog `.next`, więc każde budowanie pomiarowe
 * kładzie serwer deweloperski właściciela — cicho, bo proces dalej działa
 * i dalej słucha, tylko oddaje 500. Dwa udokumentowane wystąpienia:
 *   · WWW/085 — `rm -rf .next` zabrało budowanie, z którego korzystał dev;
 *     serwer zidentyfikowany, zatrzymany i postawiony na nowo (ADR-060);
 *   · WWW/088 — `npm run build` nadpisało `.next` budowaniem produkcyjnym,
 *     dev z 4 września został przy 500 przez całą sesję.
 * W obu wypadkach objaw był ten sam i mylący: proces żyje, port odpowiada,
 * treści nie ma. Klasa „komenda raportuje sukces swojej operacji, nie
 * osiągnięcie twojego celu" — build kończy się zerem i mówi prawdę o sobie.
 *
 * Domyślna wartość to `.next`, więc CI, Vercel i zwykłe `npm run dev`
 * zachowują się DOKŁADNIE jak dotąd — zmienna jest wyjściem awaryjnym dla
 * pomiaru, nie nową konwencją. Pomiar uruchamia się przez
 * `WWW_DIST=.next-pomiar npm run build`, a serwuje przez
 * `WWW_DIST=.next-pomiar npx next start -p 3100`.
 *
 * ⚠ ZMIENNA MUSI BYĆ PODANA PRZY OBU POLECENIACH. `next start` czyta
 * `distDir` z tej samej konfiguracji co `next build`; podana tylko przy
 * budowaniu daje serwer szukający katalogu, którego nie zapisał, i kończy
 * się błędem „Could not find a production build" — co jest wyraźne, więc
 * ta pomyłka nie ma jak przejść po cichu.
 */
const KATALOG_BUDOWANIA = process.env.WWW_DIST || ".next";

const nextConfig: NextConfig = {
  distDir: KATALOG_BUDOWANIA,
  // Generowanie statyczne per strona (ADR-007). Świadomie BEZ `output: "export"`:
  // Faza 5 wymaga rewrites tras logowania/rejestracji do aplikacji (ADR-005),
  // a rewrites nie działają przy pełnym eksporcie statycznym.
  async headers() {
    return [
      {
        source: "/:sciezka*",
        headers: [{ key: "x-catherly-wydanie", value: WYDANIE }],
      },
    ];
  },
};

// i18n www (ADR-008): konfiguracja żądań next-intl w src/i18n/request.ts.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
