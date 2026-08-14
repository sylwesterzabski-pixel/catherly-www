# ADR-029: Próg i proporcje kolumn hero — wyjątek od progu układu

Data: 2026-08-14. Status: PRZYJĘTY (decyzja właściciela 2026-08-14,
wariant V5 wybrany z trzech zmierzonych).

## Kontekst

Bramka pełnego zestawu e2e była czerwona na `faza-4/podstrony` przez
dwa kolejne przebiegi. Test panelu K2 („H1 ≤ 3 linie we wszystkich
językach na desktopie") łamał się na H1 niemieckim: `Received: 4`.

Pierwsza próba naprawy — poszerzenie miary `22ch → 24ch` (commit
`3cf7299`, decyzja właściciela) — **nie zadziałała**. Przebieg
31835331503 dał ten sam wynik co poprzedni: zero zmiany. To zero jest
informacją i ono uruchomiło pomiar.

### Co ustalił pomiar (a nie model)

`ch` to szerokość cyfry „0", więc ta sama miara daje inną liczbę
pikseli na każdym kroju, a `system-ui` znaczy inny krój na każdym
systemie. Zmierzone szerokości H1 DE (72 znaki) przy 48 px:

| krój | 1ch | `24ch` daje | co realnie ogranicza | naturalna szerokość H1 DE |
| --- | --- | --- | --- | --- |
| system-ui na macOS | 31,47 px | 755 px | **kolumna** (miara bezczynna) | 1604 px |
| Arial / Helvetica | 26,69 px | 641 px | miara | 1675 px |
| Trebuchet MS | 28,13 px | 675 px | **kolumna** | 1633 px |
| Tahoma | 30,56 px | 734 px | **kolumna** | 1762 px |
| Verdana | 34,13 px | 819 px | **kolumna** | 1977 px |

Krój runnera GitHuba jest **szerszy od Arialu**: w metryce Arialu DE
mieści się w trzech liniach, a CI łamie na cztery. Przy takim kroju
`24ch` (≈ 819 px) przekracza kolumnę hero (653 px przy 1280 px), więc
miara jest **bezczynna** — ograniczała kolumna, nie miara, i żadna
wartość `ch` nie mogła tu pomóc. Wcześniejszy zapis w rejestrze
zakładał metrykę Arialu i był z tego powodu błędny; poprawiony w T4.

Wada była przy tym szersza, niż widział strażnik. Przy 768 px stary
próg 48rem zwężał kolumnę tekstu z ~735 px do 422 px, podczas gdy
`clamp` trzymał już maksymalne 48 px — H1 miał tam **6 linii we
wszystkich trzech językach**. Strażnik biegnie na 1280 px, więc tego
nie widział.

### Droga treści — zamknięta

Skrócenie H1 DE przeszło ocenę adwersaryjną i **wszystkie warianty
zostały odrzucone**. Rozstrzygający zarzut: usunięcie „deine" daje
„Catherly führt Kontakte", co po niemiecku czyta się jako *Catherly
prowadzi rozmowy* — a ta sama strona wprost temu zaprzecza
(`content/de/dla-kogo.md`: „führt keine Gespräche"). To naruszenie
ADR-018 („nigdy nie obiecujesz na stronie tego, czego aplikacja nie
robi"), więc treść wypadła z gry i została geometria.

## Decyzja

Dwie kolumny hero wchodzą od **72rem**, w proporcji **4fr 2fr**.

To **jedyny wyjątek od progu układu 48rem** (ADR-028) w całym
serwisie. Wszystkie pozostałe media queries zostają na 48rem; token
`--wymiar-prog-ukladu` nie zmienia wartości ani znaczenia — hero
deklaruje własny, szerszy próg, bo jego kolumna niesie tekst
o maksymalnym rozmiarze kroju, a nie treść płynną.

Miara `max-width: 24ch` **zostaje** — nie dlatego, że działa, tylko
dlatego, że na szerokich krojach jest bezczynna, a na wąskich nie
szkodzi. Powrót do 22ch był jednym z wariantów i nie został wybrany.

Prawa kolumna („spokojna przestrzeń" z panelu K2) **zostaje**,
zwężona z 2/5 do 1/3 i widoczna od 1152 px zamiast od 768 px.

## Dowód

Pomiar wykonany w przeglądarce na zbudowanej stronie: 5 wariantów
× 3 języki × 3 kroje × 9 szerokości, liczba linii z realnej wysokości
H1 podzielonej przez `line-height`. Verdana jako zamiennik najgorszego
przypadku (krój runnera jest szerszy od Arialu, więc Arial nie jest
uczciwym workiem treningowym).

Maksymalna liczba linii, najgorszy język × najgorszy krój:

| wariant | 1440 | 1280 | 1152 | 1024 | 900 | 768 |
| --- | --- | --- | --- | --- | --- | --- |
| V0 stan przed zmianą | 4 | 4 | 4 | 4 | 5 | 6 |
| V3 próg 64rem + 4fr 2fr | 3 | 3 | 3 | **4** | 3 | 3 |
| **V5 próg 72rem + 4fr 2fr** | 3 | 3 | 3 | 3 | 3 | 3 |
| V8 bez drugiej kolumny | 3 | 3 | 3 | 3 | 3 | 3 |
| V9 = V8 + powrót do 22ch | 3 | 3 | 3 | 3 | 3 | 3 |

V3 przewraca się dokładnie na 1024 px, bo próg 64rem tam wypada:
`4fr` z (992 − 32) = 640 px, a DE potrzebuje ok. 660 px. V5 przesuwa
próg poza ten punkt i dlatego trzyma.

Szerokość H1 przy 1280 px (DE, Verdana): V0 653 px / 4 linie ·
**V5 725 px / 3 linie** · V8 819 px / 3 linie · V9 751 px / 3 linie.

## Konsekwencje

- Zakres 768–1151 px: hero jednokolumnowy. Zmiana wobec panelu K2,
  przyjęta świadomie — panel dostał wariant do wglądu przy najbliższej
  okazji, nie po fakcie.
- **Poniżej 768 px nic się nie poprawiło**: H1 DE ma tam 4–5 linii,
  tak jak przed zmianą, bo hero był już jednokolumnowy. Obietnica
  panelu K2 dotyczyła desktopu i tylko na desktopie jest teraz
  spełniona. Strażnik nadal biegnie wyłącznie na 1280 px, więc pozycja
  T4 w rejestrze warunków powrotu **zostaje otwarta** w części
  mobilnej.
- ADR-028 mówi „próg układu 48rem (wszystkie media queries)". Po tym
  ADR-ze zdanie brzmi: wszystkie poza hero. `bramka:tokeny` nie
  sprawdza media queries — ten zapis jest jedynym strażnikiem i
  następna taka zmiana też musi przejść przez ADR, nie przez commit.
- Podstrony (`NaglowekPodstrony.module.css`) zostają na 22ch. Ich
  zapas policzono w metryce Arialu, więc na kroju runnera jest
  **niezweryfikowany** — nie „bezpieczny". T4.
