# ADR-031: Paleta produkcyjna „kancelaria" i krój Onest

Data: 2026-08-26. Status: **PRZYJĘTY (decyzja właściciela 2026-08-26,
zlecenie `WWW/038-bis`, decyzja ② + imienna zgoda na kasację bloku
eksperymentu).**

Źródło wartości: paczka zewnętrzna
`~/Documents/FBO OS - www/catherly-paczka-claude/` (pliki `02-tokeny.css`,
`03-typografia.css`, `06-tabela-rol.md`), zatwierdzona przez właściciela
po audycie zewnętrznym. **Wartości barw i rozmiarów przyjęto bez
negocjacji** — polecenie mówi wprost, że są policzone i zatwierdzone.
Wszystkie kontrasty w tym dokumencie zostały jednak **przeliczone po tej
stronie**, nie przepisane: zgodność i trzy rozjazdy opisano niżej.

## Kontekst

Do 2026-08-26 serwis stał na palecie z Etapów A/B (ciepły greige
`#eee6e0`, terakota, śliwka, szałwia — ADR-013, ADR-015, ADR-025)
i na stosie systemowym `system-ui` (ADR-026, ADR-027). Równolegle,
od 2026-08-17, w `src/app/globals.css` żył **blok eksperymentu**
z czterema wariantami palet (`len` / `kosc` / `popiol` / `czern`),
przełączany atrybutem `data-paleta`, z terminem ważności 2026-08-31
pilnowanym przez `scripts/lint-tokeny.mjs`.

Audyt zewnętrzny (2026-08-26) wskazał trzy defekty, których poprzedni
stan nie rozwiązywał:

1. **Karty nie istniały wizualnie** — `powierzchnia` miała praktycznie
   tę samą jasność co tło strony (1,09:1), więc karty cennika trzymały
   się wyłącznie cienką kreską i na słabszym ekranie struktura znikała.
2. **Jeden kolor pełnił pięć ról naraz** — akcent, wypełnienie CTA,
   kolor linku, obwódka fokusu i punktor. Kontrast był wzorowy, ale
   **kontrast nie jest hierarchią**: oko nie miało jak rozstrzygnąć,
   co jest akcją, a co odnośnikiem.
3. **Skala typograficzna miała dziewięć rozmiarów bazowych**, w tym
   15/16/17/18 px różniące się o jeden piksel, oraz wagę 100, która na
   kroju systemowym była syntezą i wyglądała inaczej na każdym
   urządzeniu.

## Decyzja

### 1. Paleta produkcyjna to „kancelaria" — 19 ról

Ciepły owsiany papier jako tło, **głęboki granat jako jedyny kolor
akcji**, mosiądz jako dekoracja. Czternaście nazw ról bez zmiany
(komponenty nietknięte), pięć ról nowych.

| rola | wartość | zmierzony kontrast |
|---|---|---|
| `tlo-strony` | `#e8e1d5` | — |
| `powierzchnia` | `#ffffff` | 1,30:1 × tło |
| `powierzchnia-2` | `#f3eee6` | 1,13:1 × tło |
| `powierzchnia-akcentowa` | `#dccdac` | 1,21:1 × tło |
| `tekst-podstawowy` | `#16181d` | 13,67:1 × tło |
| `tekst-drugorzedny` | `#4e545c` | 5,88:1 × tło |
| `kreska` | `#d2c9b9` | 1,26:1 × tło (dekoracja) |
| **`kreska-mocna`** (NOWA) | `#7d7361` | 4,67:1 × powierzchnia |
| `akcent` | `#9a7b3f` | 3,06:1 × tło |
| `interakcja` | `#1f3a5f` | 8,84:1 × tło |
| `interakcja-aktywna` | `#142a47` | 11,13:1 × tło |
| `tekst-na-interakcji` | `#ffffff` | 11,48:1 × interakcja |
| `link` | `#16181d` | 13,67:1 × tło |
| `link-aktywny` | `#1f3a5f` | 8,84:1 × tło |
| `fokus` | `#16181d` | 13,67:1 × tło |
| **`stan-sukces`** (NOWA) | `#2f6b46` | 6,34:1 × powierzchnia |
| **`stan-ostrzezenie`** (NOWA) | `#8a5a12` | 5,91:1 × powierzchnia |
| **`stan-blad`** (NOWA) | `#a32617` | 7,38:1 × powierzchnia |
| **`stan-wylaczony`** (NOWA) | `#767c84` | 3,24:1 × tło |

Wszystkie liczby **zmierzone 2026-08-26 na commicie `aff7947`**
(osiągalny), wzorem WCAG 2.x, w jednym przebiegu razem z kontrolą
negatywną stanu sprzed zmiany. Pełna macierz — łącznie z parami, których
strażnik z paczki nie obejmuje — w `docs/faza-2/rejestr-warunkow-powrotu.md`,
pozycja **T51**.

**Trzy reguły, które trzymają tę paletę:**

- **R-AKCENT-01** — akcent nigdy nie niesie tekstu. Jedyny wyjątek to
  punktory list, i tylko dlatego, że punktor nie jest jedynym nośnikiem
  informacji (lista ma też wcięcie i odstępy).
- **R-AKCENT-02** — `fokus` ≠ `akcent` ≠ `interakcja`, sprawdzane
  **na wartościach, nie na nazwach**. Powód jest historyczny i mierzony:
  w wariancie eksperymentu wszystkie trzy role miały tę samą limonkę,
  więc reguła „fokus nigdy nie używa akcentu" była **spełniona z nazwy
  i złamana z wartości**.
- **Link nie jest kolorem** — barwę linku niesie kolor tekstu
  podstawowego plus podkreślenie akcentem; granat wchodzi dopiero
  w `:hover` i `:focus-visible`.

### 2. Blok eksperymentu palety znika w całości

Warianty `len` / `kosc` / `popiol` / `czern`, atrybut `data-paleta`,
blok eksperymentu przezroczystości (zakresowany na `:root[data-paleta]`,
więc martwy bez atrybutu) oraz reguła terminu 2026-08-31
w `scripts/lint-tokeny.mjs` — usunięte. **Warianty palet nie wracają.**
Ewentualny tryb ciemny będzie osobną decyzją i osobnym zestawem ról.

Usunięcie wyjątku z lintera czyni go **surowszym, nie łagodniejszym**:
wyjątek pozwalał na surowe hexy wewnątrz bloku, a po jego zdjęciu
`src/app/globals.css` nie ma ani jednego miejsca, gdzie surowa barwa
przechodzi. Dowód mutacyjny w `T51`.

### 3. Krojem produkcyjnym jest Onest

Plik `public/fonts/onest.woff2` — **font zmienny, oś `wght` 100–900**,
23 808 B, self-host, zero domen zewnętrznych.

Sprawdzone przed wdrożeniem (2026-08-26, `fontTools` 4.62.1):
- **komplet latin-ext**: wszystkie 18 znaków `ąćęłńóśźżĄĆĘŁŃÓŚŹŻ`
  obecne w `cmap` (136 znaków ogółem), z kontrolą pozytywną na znakach
  spoza zakresu;
- **`tnum` OBECNE** — wymóg STRATEGII o cyfrach tabelarycznych dla
  liczb cennika jest spełniony przez sam krój, nie tylko przez
  `font-variant-numeric` stosu systemowego;
- metryki: `unitsPerEm` 1000, `typoAscender` 970, `typoDescender` −305.

Wagi produkcyjne: 400 (tekst), 500 (etykiety), 600 (nagłówki), 700
(mocna). **Waga 100 znika całkowicie.**

### 4. Skala typograficzna — pięć kroków o stosunku 1,25

`0.875 / 1 / 1.25 / 1.5625 / 1.9375 rem` plus dwa `clamp` na nagłówki
stron. Każdy krok ma jedno zastosowanie; kroków pośrednich się nie
dodaje. Tokeny typografii wchodzą do `design/tokens.json` — **tak, jak
przewidywał ADR-026 w Konsekwencjach** („Tokeny typografii (rodzina,
skala) wejdą do tokens.json wraz z ADR-em kroju").

### 5. Fokus

`outline: 0.125rem solid var(--kolor-rola-fokus); outline-offset: 0.125rem`.
Odsunięcie jest **obowiązkowe, nie ozdobne**: para `fokus × interakcja`
ma 1,55:1, więc obwódka rysowana wewnątrz granatowego CTA byłaby
niewidoczna; odsunięta pada na tło strony, gdzie ma 13,67:1.

## Co ten ADR uchyla i zmienia

### Uchyla ADR-026 (typografia tymczasowa — system-ui)

ADR-026 nadał `system-ui` datę ważności i wprost dopuścił dwie drogi
wyjścia: przyjęcie kroju albo świadome pozostanie. **Wybrano pierwszą.**
ADR-026 nie jest usuwany — dostaje adnotację odsyłającą tutaj.

### Uchyla ADR-027 (krój pisma — system-ui na premierę) — POZYCJA ZGŁOSZONA

⚠ **Zlecenie `WWW/038-bis` (K5) nakazuje unieważnić ADR-026 i o ADR-027
nie wspomina. Zgłaszam to jako rozjazd i uchylam OBA — z uzasadnieniem,
bo pozostawienie ADR-027 przy życiu dałoby dwie sprzeczne, żywe reguły
o tym samym przedmiocie** (dokładnie defekt, przed którym broni zakaz 10
kanonu i pozycja T32). ADR-027 jest **nowszy** od ADR-026 (2026-08-12)
i bardziej szczegółowy: to on rozstrzygnął „system-ui na premierę".

**ADR-027 niesie pomiar, który tą decyzją NIE ZOSTAJE UNIEWAŻNIONY —
i to jest najpoważniejsza konsekwencja tego ADR-a:**

> „Zapas budżetu LCP: **praktycznie ZEROWY** — wariancja przebiegów
> (orkiestrator 1,7 s; adwersarz 1,77–1,82 s, w tym jeden przebieg NAD
> progiem) pokazuje, że budżet jest na styk **już bez webfontu**.
> Webfont na H1 (pobranie + swap na łączu mobilnym) kosztuje typowo
> 0,2–0,5 s — warunek ADR-026 »z zapasem« jest dziś **niespełnialny
> dla H1**."

Stan bramki wydajności na gałęzi `faza-4/podstrony` w chwili pisania
(odczyt z przekazania sesji, rozdz. 1, 2026-08-23): **CZERWONA** —
mediana LCP `/` **1856 ms** przy budżecie 1800 ms na HTTP/1.1+gzip.
Element LCP to **tekst H1**, czyli dokładnie ten, którego dotyczy
ostrzeżenie ADR-027.

**Warunek twardy ADR-026 pkt 3 — re-pomiar LCP na preview (LHCI)
i utrzymanie budżetu 1,8 s z zapasem — POZOSTAJE NIESPEŁNIONY.**
Nie da się go spełnić z tej strony: wymaga wdrożenia preview i przebiegu
bramki wydajności, a ta jest poza zakresem zlecenia `WWW/038-bis`
i nie wolno jej uruchamiać równolegle z inną pracą (T22). Zapisane jako
**warunek otwarty**, nie jako rzecz wykonana — brak dowodu = brak
zabezpieczenia.

**Alternatywa, którą ADR-027 opisał, a której NIE wybrano** (do wiadomości
właściciela, gdyby pomiar wypadł źle): webfont wyłącznie dla treści
poniżej foldu i liczb cennika, H1 zostaje na `system-ui` — LCP nietknięty.

### Koryguje ADR-013 (ciepła jakość) — stała tła

ADR-013 opisuje kierunek „tło ciepłe, kierunek kremowy, nie szpitalna
biel". Nowa stała decyzji właściciela dla tła strony to **`#e8e1d5`**
(poprzednio `#eee6e0`). Kierunek ADR-013 zostaje bez zmiany: `#e8e1d5`
jest **cieplejsze i ciemniejsze** od bieli, a ciemniejsze celowo — to
warunek istnienia kart (1,30:1). ADR-013 dostaje adnotację, nie jest
przepisywany.

### Wygasza rampy barwne z tokens.json

Rampy `neutralna`, `terakota`, `szalwia`, `sliwka` znikają z
`design/tokens.json` — po tej decyzji żadna rola się do nich nie
odwołuje, a pomiar wykazał **zero bezpośrednich użyć w `src/`** poza
plikiem generowanym. **Wartości zapisane tutaj, żeby decyzja nie
zniknęła razem z plikiem** (K1 zlecenia):

- **terakota** 50 `#fff1ed` · 100 `#ffe2da` · 200 `#ffc8b9` ·
  300 `#ffa48d` · 400 `#ff7858` · **500 `#e65b3d`** (baza przypięta,
  akcent główny, Etap A) · 600 `#bb351d` · 700 `#a21c0a` ·
  800 `#840a00` · 900 `#630e00`
- **neutralna** 50 `#fff1e9` · 100 `#fce3d6` · 200 `#e8d0c2` ·
  300 `#ceb7aa` · 400 `#b39c90` · 500 `#927d71` · 600 `#766156` ·
  700 `#624e43` · 800 `#4e3c31` · **900 `#3b2a20`** (baza przypięta,
  tekst podstawowy, Etap B)
- **szalwia** 50 `#c7fff2` · 100 `#acf7e6` · 200 `#98e2d2` ·
  300 `#7fc9b9` · **400 `#5ca596`** (baza przypięta, akcent drugi,
  Etap A) · 500 `#448e7f` · 600 `#257164` · 700 `#075d51` ·
  800 `#00493e` · 900 `#00382f`
- **sliwka** 50 `#f9f1ff` · 100 `#f2e2ff` · 200 `#e6caff` ·
  300 `#ccb1e5` · 400 `#b196c9` · 500 `#9077a8` · 600 `#745c8b` ·
  **700 `#5e4775`** (baza przypięta, akcent tekstowy: linki,
  wyróżnienia, Etap B) · 800 `#4c3663` · 900 `#3c2752`
- **tło Etapu B**: `#eee6e0` (ADR-013)

## Konsekwencje

### Bramka „Kontrakt tokenów" przechodzi na CZERWONE

`scripts/check-kontrakt-tokenow.mjs` mierzy ΔE CIE76 między tłem strony
a tłem ekranów logowania aplikacji (`#f7f3ea`) i wymaga ≤ 5,0 (ADR-022).

| stan | ΔE | próg |
|---|---|---|
| przed zmianą (kontrola negatywna, ten sam przebieg) | **4,66** | 5,0 ✔ |
| po zmianie na `#e8e1d5` | **6,46** | 5,0 ✘ |

**Progu nie podniesiono** — podniesienie progu jest zamianą czerwieni na
ciszę (zakaz 3 kanonu). **`szew_logowania.tlo` nie zmieniono** — ta
wartość należy do aplikacji i aktualizuje ją ręcznie właściciel.
Zmieniono wyłącznie `strona_tlo_odniesienia`, bo tego żąda wprost
komunikat bramki („zmiana palety strony wymaga świadomej aktualizacji
kontraktu (ADR), nie przejdzie bokiem") — świadomą aktualizacją jest ten
ADR. Bez tej zmiany bramka zgłaszałaby rozjazd odniesienia i **maskowała
prawdziwy powód czerwieni**.

Trzy drogi wyjścia, wszystkie należące do właściciela, spisane
w `design/kontrakt-aplikacji.json`. Uboczna obserwacja do rozstrzygnięcia
razem z nimi: **kotwica progu 5,0 straciła przedmiot** — była zaczepiona
o odległość „tło ↔ neutralna-50", a rola `neutralna-50` po tej decyzji
nie istnieje.

### Zadanie 14 checklisty częściowo skonsumowane

Checklista paczki przewiduje ADR-y w zadaniu 14 (poza zakresem
`WWW/038-bis`). Ten dokument konsumuje z niego: ADR palety, ADR kroju
i unieważnienie ADR-026. **Nie konsumuje** pozostałych porządków
z zadań 7–14.

### Granice zapisane jako granice, nie zasypane

1. **`akcent` × `powierzchnia-akcentowa` = 2,53:1** — poniżej 3:1.
   Lista punktowana postawiona na S10 (`SekcjaRytmu`,
   `SekcjaTekstowa.akcentowa`) nie miałaby pokrycia. Dziś taki przypadek
   **nie występuje** (oba `::marker` w akcencie leżą gdzie indziej,
   `.kroki` w S10 ma `list-style: none`) — pomiar, nie założenie.
2. **`--szerokosc-tekstu: 68ch`** z paczki kontra **`miara-akapitu: 65ch`**
   z ADR-025 — ta sama funkcja, dwie wartości. Nierozstrzygnięte;
   wchodzi dopiero z zadaniem 12, które jest poza zakresem.
3. **Krój zapasowy** — wartości `ascent-override` / `descent-override`
   ustawiono na **zmierzone metryki Onest** (97% / 30,5%), nie na
   wartości startowe z paczki (90% / 22%), które są metrykami samego
   Arialu i nie dopasowują niczego. Szerokości (`size-adjust`) **nie
   mierzono** — zostaje 100%.

## Data

2026-08-26. Wdrożenie: zlecenie `WWW/038-bis`, zadania 1–6 z korektami
K1–K6. Pomiary tej doby stemplowane commitem `aff7947`.
