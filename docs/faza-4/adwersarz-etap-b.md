# Protokół adwersarza: Faza 4, Etap B (wzorcowa /funkcje/pozyskiwanie)

**Zakres:** diff f19149b..717fdb0 + runda napraw (2026-08-12).
Adwersarz w granicach repo; wszystko uruchamiał sam; mutacje
z przywróceniem; working tree czysty.

## Zielone z dowodem (skrót)

Znak w znak ×3 własnym parserem (0 różnic; pauzy/półpauzy co do
znaku; „30" z facts.json); implementacja 1:1 z HF (kreska 3 px,
zebra DOM-first 10/10, karta AI, pusty alt separatora, sluggi
kotwic = tabela panelu); **W4 pomiarem:** nagłówek sticky 74 px
na 390 px, zapas kotwic 5,7–6,5 px — 5rem wystarcza; A-1 (true na
rodzicu tylko na podstronach, page na /funkcje, bez regresji);
F9 nieobecne w DOM; klawiatura/zoom/no-JS/regresje ✓; axe 36/36;
strażnik milczenia — grep ~50 fraz ×3 języki na zbudowanym HTML:
czysty (trafienia wyłącznie legalne negacje granic).

## Mutacje (5/5 ŁAPANE)

kotwica dmo→dmo2 (6 czerwieni) · usunięcie A-1 (2) · literówka DE
(strażnik) · fraza „Sekwencje kontaktowe" na stronie (MILCZENIE ×3)
· scroll-margin 5→2rem (W4 pomiarem: 31,7 px < 74 px).

## Ustalenia i domknięcia (runda)

- **ISTOTNE 1 (zamknięte):** strażnik milczenia węższy niż brief —
  rozszerzony o EN/DE blokady osoby i frazy pozostałych filarów
  (Kapsułka Przyszłości ×3, Thriving Lifestyle, ElevenLabs).
- **ISTOTNE 2 (zamknięte):** granica importu modułu 4 bez pozycji
  rejestru — dopisana poz. 19 (rewizja przy pojawieniu się importu;
  potwierdzenie zakresu „Formularze & Import" przy najbliższym Z).
- **DROBNE (zamknięte):** dokończenie A-3 (kolumna „Funkcja":
  Twój Wrapped); axe + /nie-znaleziono ×3 (luka sprzed diffu);
  sklejenie tabeli rejestru 14→15.
- **DROBNE (u właściciela):** etykieta okruszków EN/DE — status
  „propozycja robocza" do sankcji przy akcepcie etapu.

## Werdykt

**PRZYJĘTY** — po rundzie suita 238 passed / 4 skipy; bramki
komplet (cennik wymaga klucza w env; nieodwracalne planowo
czerwone do Fazy 6). Czeka na akcept właściciela Etapu B.
