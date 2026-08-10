# Handoff K1 (nawigacja + stopka) i K3 (sekcja tekstowa)

Data: 2026-08-10. HF po panelu projektu (8 poprawek naniesionych):
docs/faza-3/hf/k1-nawigacja.html · k3-sekcja-tekstowa.html.
Werdykt panelu: architektura zgodna z briefami; warunek DECYZJI 6
potwierdzony niezależnym rachunkiem (11,15:1).

## Pary kontrastowe (wyliczone, obowiązujące w implementacji)

| Para | Wynik |
|---|---|
| tekst-podstawowy × tło strony | 11,07:1 |
| tekst-podstawowy × terakota-100 (tło akcentowe) | 11,15:1 |
| link (śliwka-700) × tło strony | 6,47:1 |
| link × terakota-100 | 6,51:1 |
| fokus × terakota-100 | 6,51:1 |
| tekst-drugorzędny × tło strony | 6,33:1 |
| tekst-drugorzędny × powierzchnia stopki (neutralna-50) | 7,07:1 |
| link × powierzchnia stopki | 7,22:1 |
| tekst-podstawowy × powierzchnia stopki | 12,36:1 |

## K1 — kontrakt implementacji

- DOM: skip-link → logo → nav (Funkcje·Cennik·Dla kogo) → Logowanie
  (/login, ADR-023). Rozmieszczenie gridem; na 390 px Logowanie
  wizualnie w wierszu 1, fokusowo ostatnie — DECYZJA BRIEFU
  (odnotowana, nie usterka).
- Skip-link: pierwszy fokus, odsłona przez :focus; cel #tresc ze
  scroll-margin-block-start (sticky nie zasłania).
- Sticky przez CSS; zero JS; nav ul z flex-wrap (DE/EN + zoom 200%).
- aria-current="page" na bieżącej; fokus: rola-fokus, nigdy usunięty.
- Stopka: mapa strony · języki jako LINKI (/, /en, /de) · dokumenty
  prawne i kontakt jako TEKST „(wkrótce)" — bez linków (bramka
  linków; zero zmyślonych danych) — linki wchodzą wraz ze stronami.
- Właściwości logiczne (inset-block-start itd.).

## K3 — kontrakt implementacji

- Prop wariantu: `neutralna` (tło strony) / `akcentowa`
  (tło terakota-100 → docelowo rola z ADR-025).
- Prop „słyszalnej kropki": ostatni akapit `<p class="kropka">`
  (semantyka akapitu, nie span).
- Miara: 38rem kontener / 65ch akapit — wartości surowe do czasu
  tokenu miary (ADR-025).
- Sekcje w landmarku main; aria-labelledby na section; H2 z treści.
- Zero JS, zero ruchu.

## Etykiety nawigacji i stopki EN/DE (poza treścią Fazy 2 — do
zatwierdzenia przy akcepcie PR)

| PL | EN | DE |
|---|---|---|
| Funkcje | Features | Funktionen |
| Cennik | Pricing | Preise |
| Dla kogo | Who it's for | Für wen |
| Logowanie | Log in | Anmelden |
| Przejdź do treści | Skip to content | Zum Inhalt springen |
| Mapa strony | Site map | Seitenübersicht |
| Język | Language | Sprache |
| Dokumenty | Documents | Dokumente |
| Kontakt | Contact | Kontakt |
| (wkrótce) | (coming soon) | (folgt in Kürze) |

## PROPOZYCJA ADR-025 (do decyzji właściciela — nowe tokeny)

CLAUDE.md: nowa wartość wizualna = ADR. Trzy pozycje w JEDNYM ADR:
1. `--kolor-rola-powierzchnia-akcentowa: var(--kolor-terakota-100)`
   — tło lustra L1; komentarz kontrastowy: ×tekst 11,15 · ×link 6,51
   · ×fokus 6,51 (wzorzec dokumentowania jak w istniejących rolach).
2. `--kolor-rola-kreska: var(--kolor-neutralna-200)` — kreski
   nagłówka/stopki (dekoracyjne, 1,20:1 — dopuszczalne).
3. Token miary tekstu (`--miara-tekstu`: 65ch lub 38rem — do
   ustalenia w ADR) — pierwszy token wymiaru w systemie.
Do czasu ADR implementacja używa wartości bezpośrednich jak w HF
(dopuszczalny tymczas wg panelu).

## Implementacja — zakres zlecenia

src/components/{Nawigacja,Stopka,SekcjaTekstowa} + integracja
w layout; i18n www: next-intl, ścieżki / (pl, bez prefiksu), /en,
/de — spójnie z linkami języków w stopce; komunikaty UI w plikach
messages (pl/en/de wg tabeli wyżej). Testy: Playwright klawiatura
(skip-link pierwszy, kolejność, fokus widoczny), axe, no-JS render,
parytet. Bramki lokalne przed commitem. BEZ pusha.
