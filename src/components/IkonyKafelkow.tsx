/**
 * Sześć ikon kafelków — SVG inline, przerysowane z wzoru
 * `design/obrazy-robocze/wzorzec-2026-09-06/7-ikony.png` (ADR-067,
 * zlecenie WWW/094 krok 4).
 *
 * ⚠ PRZERYSOWANE, NIE OBRYSOWANE AUTOMATYCZNIE. Wzór jest bitmapą 2048 ×
 * 2048 z sześcioma ikonami liniowymi; obrys wektorowy dałby setki węzłów
 * i krzywe, których nikt nie umie potem poprawić. Te ikony są narysowane
 * ręcznie na wspólnej siatce 24 × 24 i zachowują z wzoru to, co jest
 * w nim ROZSTRZYGNIĘCIEM: przedmiot, jedną grubość kreski, zaokrąglone
 * zakończenia i brak wypełnień.
 *
 * ⚠ JEDEN KOLOR — `currentColor`, czyli rola tekstu kafelka. Kafelek stoi
 * na korpusie jasnym, więc dziedziczy `tekst-podstawowy`; gdyby kiedyś
 * trafił na klamrę grafitową, ikona pojedzie za tekstem sama, bez zmiany
 * tego pliku. Zero wartości barwnych tutaj — to nie jest oszczędność,
 * tylko warunek, żeby ikona nigdy nie rozjechała się z tekstem, obok
 * którego stoi.
 *
 * ⚠ `aria-hidden` na każdej: nazwa funkcji stoi w tekście kafelka jako
 * `<p class="tytul">`, więc ikona jest powtórzeniem wizualnym, nie
 * nośnikiem treści. Dodanie jej do drzewa dostępności dałoby czytnikowi
 * ten sam ciąg dwa razy.
 */

const WSPOLNE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

/** Kolejność i identyfikatory jak w `KARTY` w `KartyFunkcji.tsx`. */
export const IKONY: Record<string, React.ReactElement> = {
  /* DMO — podkładka z listą odhaczonych pozycji. */
  dmo: (
    <svg {...WSPOLNE}>
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
      <path d="M9 3.5V2.8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.7" />
      <path d="M8 9.5l1.4 1.4L12 8.3" />
      <path d="M8 14.5l1.4 1.4L12 13.3" />
      <path d="M14.5 10h2.5M14.5 15h2.5" />
    </svg>
  ),
  /* Tarcza — kontur z pionową osią podziału, jak we wzorze. */
  tarcza: (
    <svg {...WSPOLNE}>
      <path d="M12 2.6l7 2.6v6.1c0 4.3-2.9 8.1-7 9.3-4.1-1.2-7-5-7-9.3V5.2z" />
      <path d="M12 2.6v18" />
    </svg>
  ),
  /* Pieczęć etyczna — rozeta z odhaczeniem i dwiema wstęgami. */
  pieczec: (
    <svg {...WSPOLNE}>
      <path d="M12 2.4l2 1.5 2.4-.4.9 2.3 2.1 1.3-.7 2.4.7 2.4-2.1 1.3-.9 2.3-2.4-.4-2 1.5-2-1.5-2.4.4-.9-2.3-2.1-1.3.7-2.4-.7-2.4 2.1-1.3.9-2.3 2.4.4z" />
      <path d="M9.6 9.6l1.7 1.7 3.1-3.1" />
      <path d="M9 16.6L7.6 21.4l2.9-1.3 1.5 1.5" />
      <path d="M15 16.6l1.4 4.8-2.9-1.3" />
    </svg>
  ),
  /* Pierwsze 90 dni — rakieta. */
  dziewiecdziesiat: (
    <svg {...WSPOLNE}>
      <path d="M13.6 13.9c3-1.2 6.4-4.6 6.8-10.3-5.7.4-9.1 3.8-10.3 6.8" />
      <path d="M10.1 10.4l3.5 3.5" />
      <path d="M10.1 10.4L6.6 9.2 4.2 11.6l3 1.3" />
      <path d="M13.6 13.9l1.2 3.5-2.4 2.4-1.3-3" />
      <path d="M7.4 16.6c-1 1-1.4 3.7-1.4 3.7s2.7-.4 3.7-1.4" />
    </svg>
  ),
  /* Pulpit — monitor na nóżce. */
  pulpit: (
    <svg {...WSPOLNE}>
      <rect x="2.8" y="4" width="18.4" height="12" rx="1.6" />
      <path d="M12 16v3.6" />
      <path d="M8.4 19.6h7.2" />
    </svg>
  ),
  /* Świadectwo — dokument z zagiętym rogiem i pieczęcią. */
  swiadectwo: (
    <svg {...WSPOLNE}>
      <path d="M14 2.6H6.6a1.6 1.6 0 0 0-1.6 1.6v15.6a1.6 1.6 0 0 0 1.6 1.6h5.2" />
      <path d="M14 2.6l5 5v6.2" />
      <path d="M14 2.6v5h5" />
      <path d="M8 10h6M8 13.4h4" />
      <circle cx="17.4" cy="17.4" r="2.8" />
      <path d="M15.8 19.8l-.6 2.6 2.2-1.1 2.2 1.1-.6-2.6" />
    </svg>
  ),
};
