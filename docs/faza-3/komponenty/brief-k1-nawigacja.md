# Brief K1: nawigacja + stopka (Etap B; pipeline 4.1)

Status: BRIEF + WIREFRAME DETALU. Układ stron: OBOWIĄZUJE (DECYZJA 6).
Uwaga właściciela: nawigacja zzielenia bramkę klawiatury — porządek
fokusa jest tu pierwszą cechą, nie testem na końcu.

## Zakres

Nagłówek sticky (S1/C1/F1 — współdzielony przez wszystkie strony)
+ stopka (S14/C9/F11). Pozycje menu (STRATEGIA pkt 16): Logo ·
Funkcje (/funkcje) · Cennik (/cennik) · Dla kogo (/dla-kogo) ·
Logowanie → /login (ADR-023; link zewnętrzny do aplikacji).

## Wireframe detalu — 390 px (decyzja projektowa: BEZ hamburgera)

```
┌──────────────────────────────────────┐
│ [skip-link: Przejdź do treści]       │ ← widoczny TYLKO na fokusie;
├──────────────────────────────────────┤   PIERWSZY element fokusa
│ Catherly                 Logowanie   │ ← wiersz 1: logo + logowanie
│ Funkcje   Cennik   Dla kogo          │ ← wiersz 2: trzy linki
└──────────────────────────────────────┘
```

Uzasadnienie: hamburger wymaga JS albo hacków CSS z pułapkami
fokusa; dwa wiersze mieszczą wszystko, działają bez JS z definicji
i dają liniowy porządek tabulacji. Nagłówek „lekki" (STRATEGIA):
niska wysokość, tło = token tła strony, cień/kreska z tokenów.

Desktop: jeden wiersz — logo | Funkcje Cennik Dla kogo | Logowanie.

## Wymagania (DoD 4.2 zmapowane)

- Fokus: skip-link → logo → Funkcje → Cennik → Dla kogo → Logowanie;
  wskaźnik fokusa widoczny (token obrysu), nigdy usunięty.
- Bieżąca strona oznaczona aria-current="page".
- Sticky przez position:sticky (CSS, zero JS); przy prefers-reduced-
  motion żadnych animacji chowania/pokazywania.
- Kontrast AA na tle tokenowym — wyliczony w HF, potwierdzony axe.
- Język: etykiety z content/ (pl/en/de przez next-intl); parytet.
- Stopka: mapa strony (Funkcje, Cennik, Dla kogo), przełącznik
  języka (linki, nie select z JS), dokumenty prawne (/regulamin,
  /prywatnosc, /ciasteczka, /przetwarzanie-danych — na razie
  martwe cele DOZWOLONE tylko jako tekst bez linku, bo bramka
  linków nie przepuści 404; linki dodamy wraz ze stronami),
  kontakt. Zero logotypów firm trzecich.

## Pipeline dalej

HF (statyczny podgląd na tokenach) → panel projektu (Prawo 2;
w zakresie: kontrast wyliczony, fokus, 390 px) → handoff →
implementacja (src/components/Nawigacja, Stopka + layout.tsx)
→ bramki (tokeny, axe, klawiatura Playwright, no-JS, parytet)
→ adwersarz → akcept właściciela.
