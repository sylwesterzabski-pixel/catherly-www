# Wireframe: strona główna (low-fi; mobile-first 390 px)

Status: PROJEKT — do DECYZJI 6. Kolejność sekcji = STRATEGIA pkt 16–25
(pkt 22 „Dowód" świadomie nieobecny — zero prawdziwych historii).
Wszystkie wartości wizualne = tokeny (tu tylko role, nie wartości).

## Stos sekcji (390 px, jedna kolumna)

```
┌──────────────────────────────────────┐
│ S1 NAWIGACJA (sticky, lekka)         │  logo | menu (Funkcje·Cennik·
│                                      │  Dla kogo) | Logowanie→/login
├──────────────────────────────────────┤
│ S2 HERO                              │
│  H1 (2–3 linie)                      │  ← element LCP: tekst H1
│  podtytuł (2 linie)                  │    (zero obrazu nad foldem =
│  [ CTA: Sprawdź, jak działa ]        │    budżet LCP < 1,8 s)
│  ── pasek potwierdzeń (K9) ──        │  Dane w UE · Rezygnacja
├──────────────────────────────────────┤
│ S3 PROBLEM  ◄────────────── LUSTRO A │
│  H2: Wszystko gdzieś jest…           │
│  4 zdania = 4 sceny doby             │  rano→dzień→zespół→WIECZÓR
│  (ostatnie: „…liczysz, co z tego     │  ostatnie zdanie w osobnej
│   wyszło.")                          │  linii — słyszalna kropka
├──────────────────────────────────────┤
│ S4 DEFINICJA                         │
│  H2: Catherly to pamięć…  + 3 zdania │
├──────────────────────────────────────┤
│ S5–S8 FILARY ×4 (K4)                 │
│  [tekst] / [obraz]  naprzemiennie    │  na 390 px zawsze: tekst nad
│  H2 + korzyść + 3 konkrety           │  obrazem; desktop: zebra L/P
├──────────────────────────────────────┤
│ S9 DBANIE O SIEBIE (mini-sekcja)     │  węższa, cichsza typografia
│  1–2 zdania + Wall of Proof          │  — oddech, nie piąty filar
├──────────────────────────────────────┤
│ S10 RYTM DNIA (pkt 21) ◄─── LUSTRO B │
│  oś: RANO → W CIĄGU DNIA → WIECZÓR   │
│  3 kroki; trzeci wyróżniony:         │
│  „Wieczorem widzisz, co z tego       │
│   wyszło."                           │  ← odpowiedź na S3
├──────────────────────────────────────┤
│ S11 CENNIK W SKRÓCIE (K10)           │  3 wiersze plan+cena,
│  zdanie różnicy + [Zobacz pełny      │  bez tabeli
│  cennik]→/cennik                     │
├──────────────────────────────────────┤
│ S12 OBAWY (K8)                       │  6× <details><summary>
│  H2 + 6 pytań zwijanych              │  otwarte działa bez JS
├──────────────────────────────────────┤
│ S13 ZAMKNIĘCIE (K11, pkt 25)         │
│  [ CTA powtórzone ] + zdanie         │
│  o braku zobowiązania                │
├──────────────────────────────────────┤
│ S14 STOPKA                           │  mapa strony, języki,
│                                      │  dokumenty prawne, kontakt
└──────────────────────────────────────┘
```

## Mechanika „lustra wieczoru" (wymóg właściciela)

S3 (problem) i S10 (rytm dnia) dzielą JEDEN szkielet kompozycyjny:
ta sama siatka, ta sama skala typograficzna, oba kończą się zdaniem
wieczornym wyeksponowanym w osobnej linii. Różni je zamknięcie pary:
S3 kończy „…liczysz, co z tego wyszło." — S10 odpowiada „Wieczorem
widzisz, co z tego wyszło." Dwa warianty nośnika lustra (wybór
w DECYZJI 6):

- **Wariant L1 (rekomendacja): klamra tonalna** — S3 na tle
  neutralnym (token powierzchni), S10 na tle akcentowym (token
  akcentu); identyczny układ, zmiana tonu = „przed/po".
- **Wariant L2: klamra typograficzna** — oba na tym samym tle;
  zdanie wieczorne w obu sekcjach złożone tym samym wyróżnionym
  stylem (jedyne dwa użycia tego stylu na stronie).

Między S3 a S10 stoją definicja i filary — lustro domyka się po
tym, jak czytelniczka wie już, CO domyka lukę. Hero nie używa
obrazu wieczoru (materiał zarezerwowany dla S10 — decyzja panelu
nagłówka utrzymana).

## Desktop (od tokenowego progu szerokości)

- S2 hero: tekst w lewej kolumnie (~60%), prawa kolumna pusta lub
  spokojna grafika tła (bez zrzutu UI do czasu Playwrighta).
- S5–S8: zebra tekst/obraz L-P-L-P; S9 wąska kolumna wyśrodkowana;
  S10 oś pozioma 3 kroków; S11 trzy karty w rzędzie.

## No-JS / klawiatura / ruch

- Cała strona czytelna bez JS: nawigacja to lista linków (sticky
  przez CSS), obawy = details/summary, zero treści za JS.
- Kolejność fokusa = kolejność dokumentu; skip-link „do treści"
  przed S1; CTA hero pierwszym fokusem po skip-linku i nawigacji.
- Ruch: wyłącznie wejścia sekcji (jeśli w ogóle) — wygaszane przez
  prefers-reduced-motion.

## Mapowanie treści

S2=naglowek.md · S3=problem.md · S4=definicja.md · S5–S8=filary.md ·
S9=filary.md (mini-sekcja) · S10=NOWA (mini fan-out pkt 21, DECYZJA 7)
· S11=cennik.md skrót · S12=obawy.md · S13=NOWA (pkt 25, tryb
skrócony) — pl/en/de równolegle.
