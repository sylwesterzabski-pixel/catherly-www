# Zlecenie Z7 — tekst do wklejenia w oknie aplikacji

**Powstało:** 2026-08-13, na polecenie właściciela (decyzja 2 po
Etapie C). Zbiera w JEDEN tekst wszystkie otwarte pytania nazewnicze
i faktograficzne, które narosły przez Etapy B i C.

**Skąd się wzięło:** uwaga 3 adwersarza Etapu C (literały EN/DE fraz
milczenia to przekład zachowawczy, nie fakt z aplikacji) + pozycje
17, 18, 19, 23, 24 rejestru warunków powrotu z adnotacją „przy
najbliższym zleceniu Z" + status OTWARTY pozycji K-B3 rejestru korekt
(`docs/faza-4/rejestr-korekt-tresci.md`).

**Dlaczego to nie jest kosmetyka.** Strażnik milczenia w testach www
sprawdza, czy zakazana nazwa NIE pojawia się na stronie — porównuje
literał znak w znak. Jeśli aplikacja nazywa funkcję inaczej, niż
zgadła strona, strażnik pilnuje frazy, której nikt nie napisze,
a przepuszcza tę, która naprawdę mogłaby wejść do treści. Strażnik
oparty na zgadniętym brzmieniu to strażnik pozorny — ADR-018: brak
dowodu = brak zabezpieczenia.

**Granica katalogu:** to zlecenie wykonuje okno aplikacji. Okno www
nie czyta repo aplikacji.

---

## TEKST DO WKLEJENIA (poniżej tej linii)

Strona www weszła w Fazę 4 (podstrony funkcji) i ma dziś w treści
kilkadziesiąt nazw funkcji w trzech językach. Obowiązuje decyzja
właściciela z 2026-08-09: **nazwy aplikacji są wzorcem** — przy
rozjeździe strona się poprawia, nie aplikacja. Potrzebuję faktów
z i18n aplikacji, nie tłumaczeń.

Odpowiedź proszę **z dowodem plik:linia** dla każdej pozycji
(`src/i18n/messages/{pl,en,de}.json` lub gdziekolwiek te klucze dziś
mieszkają). Gdzie nazwy nie ma w kodzie — proszę napisać wprost
„BRAK W KODZIE", nie proponować przekładu. Brakująca nazwa jest dla
mnie użyteczną informacją; zgadnięta jest szkodliwa.

### Z7.1 — nazwy funkcji użyte dziś na podstronach www

Dla każdej pozycji: brzmienie PL / EN / DE dokładnie tak, jak widzi
je użytkowniczka w interfejsie, plus plik:linia.

Podstrona /funkcje/tresci: Studio · Szablony · Hashtagi · Kalendarz
publikacji · Zatwierdzanie · Tarcza · Pieczęć Etyczna · Uczenie głosu
· Tablica postów · asystent AI.

Podstrona /funkcje/zespol: Kreator wdrożeniowy · Zatwierdzanie
(zespołu) · Pierwsze 90 Dni · Osiągnięcia · Paszport zgodności ·
Akademia.

Podstrona /funkcje/wyniki: Pulpit · Twój Wrapped · Cel · Ściana
sukcesów · Świadectwo · Wall of Proof.

Podstrona /funkcje/pozyskiwanie: formularz zgłoszeniowy · kalendarz ·
subskrypcja kalendarza · eksport vCard · kod QR polecający · program
poleceń · DMO — Dzienny Plan Działania · zadania · Sala Treningowa ·
plany rozmów i podsumowania.

Siedem nazw z ostatniego akapitu (kalendarz, subskrypcja, vCard, QR,
program poleceń, zadania, plany rozmów) strona traktuje dziś jako
OPISOWE — małą literą, bez statusu nazwy własnej. Jeśli aplikacja ma
dla nich nazwy własne, proszę o nie: wtedy strona je przejmie
(rejestr warunków powrotu, poz. 18).

### Z7.2 — nazwy funkcji, o których strona MILCZY

To jest dla mnie ważniejsze niż Z7.1. Poniższe funkcje nie mają na
stronie żadnej obietnicy (szkielet, brak klucza, brak zgody
platformy, decyzja właściciela). Test www pilnuje, żeby ich nazwy
nigdzie nie wyciekły — ale pilnuje literałów, które strona ZGADŁA
dla EN i DE. Potrzebuję prawdziwych brzmień, żeby strażnik przestał
być pozorny:

| Funkcja (PL wg strony) | Co strona dziś zgaduje w EN | Co strona dziś zgaduje w DE |
|---|---|---|
| Ognisko | bonfire | Lagerfeuer |
| Partner biegu | running partner | Laufpartner |
| Import wyciągu (FL) | statement import | — |
| Rozkład dochodów | income distribution | Einkommensverteilung |
| Uczciwe Lustro | honest mirror | ehrlicher Spiegel |
| Wyzwania | challenges | Herausforderungen |
| Kapsułka Przyszłości | future capsule | Zukunftskapsel |
| Sekwencje kontaktowe | contact sequences | Kontaktsequenzen |
| Blokada osoby | block a person | Person blockieren |
| Puls zespołu | Team Pulse | Team-Puls |

Dla każdego wiersza: rzeczywiste brzmienie PL/EN/DE z plik:linia albo
„BRAK W KODZIE". „Puls zespołu" i „Kapsułka Przyszłości" są już
w słowniku — proszę o potwierdzenie, nie o nową propozycję. Jeśli
któraś z tych funkcji w ogóle nie istnieje dziś w kodzie, to też
jest odpowiedź: usunę ją ze strażnika zamiast pilnować widma.

### Z7.3 — dwa nowe wiersze do słownika nazw

Podstrona /funkcje/zespol wprowadziła dwie nazwy, których słownik
(`docs/faza-2/slownik-nazw.md`) jeszcze nie ma. Strona napisała je
tak:

- **Akademia** → EN „Academy" → DE „Akademie" (moduł 6, nagłówek
  i treść).
- **Żeton łaski** → EN „grace token" → DE „Gnaden-Token" (moduł 4,
  Osiągnięcia: seria nie zaczyna się od zera po przerwie).

Proszę o brzmienia z aplikacji i o rozstrzygnięcie wielkości liter
(strona pisze „Akademia" wielką jako nazwę własną, „żeton łaski"
małą jako rzecz). Przy okazji: „odznaki" / „badges" / „Abzeichen"
oraz „seria" / „streak" / „Serie" — nazwa własna czy opis?

### Z7.4 — asystent AI po niemiecku (pozycja otwarta od Etapu B)

Sekcja kierunku na /funkcje/pozyskiwanie i /funkcje/tresci używa
w DE formy **„KI-Assistent"**. Panel adaptacji DE odnotował możliwy
rozjazd z i18n aplikacji i zostawił pozycję otwartą, bo obowiązuje
zasada „przy rozjeździe wygrywa aplikacja". Proszę o rzeczywistą
formę DE (i EN — strona ma „AI assistant") z plik:linia.

### Z7.5 — nazwy z Etapu C bez pozycji w słowniku

Rejestr warunków powrotu poz. 24: strona pisze na /funkcje/tresci
o **kalendarzu publikacji** i **tablicy postów** oraz używa
czasownika „przesuwasz post" (zakładając przeciąganie w kalendarzu).
Proszę o dwie rzeczy: (a) nazwy tych dwóch widoków w PL/EN/DE,
(b) potwierdzenie, że przesuwanie posta w kalendarzu naprawdę jest
przeciągnięciem, a nie edycją daty w formularzu. Jeśli to formularz —
zdanie na stronie kłamie o geście i poprawię je.

### Z7.6 — trzy pytania faktyczne (nie o nazwy)

1. **Dokąd prowadzi kod QR polecający?** Treść modułu 5
   /funkcje/pozyskiwanie zakłada, że QR kieruje na adres polecający.
   Proszę o faktyczny cel linku (URL wewnętrzny) — rejestr warunków
   powrotu, poz. 17.
2. **Zakres strony „Formularze & Import".** Granica modułu 4 mówi
   dziś „importu hurtowego nie ma". Jeśli w aplikacji istnieje
   jakikolwiek import kontaktów (nawet szkielet za bramką), proszę
   o zakres — strona ma tam obietnicę przeczącą i musiałaby ją
   zrewidować (poz. 19).
3. **Widok liderki w Pierwszych 90 Dniach.** Strona miała napisać, że
   liderka widzi postęp nowej osoby w programie — panel odrzucił to
   zdanie z braku dowodu. Czy taki widok istnieje w kodzie? Jeśli
   tak: gdzie i co dokładnie pokazuje (poz. 23).

### Format odpowiedzi

Tabela per sekcja: pozycja → PL / EN / DE → plik:linia → status
(POTWIERDZONE / ROZJAZD / BRAK W KODZIE). Dla Z7.6: FAKT (z miejscem
odczytu) albo NIE WIEM. Zero szacunków, zero „prawdopodobnie" —
niepewność zgłaszam, nie zasypuję.

## KONIEC TEKSTU DO WKLEJENIA

---

## Co strona zrobi z odpowiedzią

- Rozjazdy z Z7.1–Z7.4 → korekta treści www + wiersze słownika
  (nazwa aplikacji wzorcem), wpis do rejestru korekt.
- Prawdziwe brzmienia z Z7.2 → wymiana literałów w `frazyMilczenia`
  (`e2e/funkcje-podstrony.spec.ts`, `e2e/funkcje-pozyskiwanie.spec.ts`)
  i usunięcie komentarzy „best-effort".
- Z7.4 rozstrzyga status K-B3 w rejestrze korekt.
- Z7.5 i Z7.6 zamykają pozycje 17, 18, 19, 23, 24 rejestru warunków
  powrotu — albo je przepisują z nowym warunkiem.

Do czasu odpowiedzi obowiązuje stan bieżący: strona milczy o funkcjach
z Z7.2, a literały strażnika zostają jako zabezpieczenie częściowe
(lepsze niż żadne, gorsze niż potwierdzone).
