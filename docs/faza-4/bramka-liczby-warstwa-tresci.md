# `bramka:liczby` w warstwie treści — zamknięcie poz. T6

Zlecenie właściciela z 2026-08-16 (po pushu `083d9f0`): „bramka:liczby
ślepa na messages — skan → inwentarz → sprostowanie karty tonu",
osobne zlecenie, commit bez pusha. Warunek powrotu: rejestr warunków
powrotu, poz. T6.

---

## 1. Granica bramki — zmierzona, nie odczytana

Bramka do 2026-08-16 składała się z jednego przebiegu:

```js
const SCAN_EXT = new Set([".tsx", ".jsx"]);
const TEKST_Z_CYFRA = />[^<>{}]*\d[^<>{}]*</g;
```

Z tych dwóch wierszy wynikają trzy dziury, każda potwierdzona
uruchomieniem, nie samym czytaniem:

| dziura | skutek |
| --- | --- |
| skan tylko `.tsx`/`.jsx` w `src/` | `src/i18n/messages/*.json` nigdy nie było otwierane — a tam leży praktycznie cała kopia serwisu |
| klasa znaków `[^<>{}]` wyklucza klamry | tekst renderowany przez `{t("…")}` nie pasuje do wzorca nawet w pliku `.tsx` |
| wzorzec szuka `\d` | liczebnik słowny („cztery fazy") jest niewidoczny **wszędzie**, także w JSX |

Skutek łączny: zdanie „kreator wdrożeniowy prowadzi ją przez sześć
kroków" mogło wejść na stronę w trzech językach i nie dotknąć żadnej
bramki. Karta tonu mówiła przy tym „Każda liczba pochodzi
z `content/facts.json` — bez wyjątku (bramka)". Nieprawda dotyczyła
nie liczby wyjątków, tylko zasięgu: bramka nie czytała warstwy, w której
te liczby stoją.

## 2. Inwentarz — 16 kluczy, nie 14

Rejestr warunków powrotu zapowiadał „inwentarz 14 istniejących ciągów".
Skan dał **16 kluczy** (identyczny zbiór kluczy w `pl`/`en`/`de`).
Szacunek z 2026-08-15 był o dwa za niski i został sprostowany w rejestrze,
zamiast dopasowywać skan do liczby. Rozkład: **9 kluczy z cyfrą**
(„90", „256") i **10 kluczy z liczebnikiem słownym**; trzy klucze mają
i jedno, i drugie.

| klucz | liczby (pl / en / de) | rozstrzygnięcie | pokrycie |
| --- | --- | --- | --- |
| `DlaKogo.s2_robi_2` | 90, cztery / four / vier | nazwa własna + cecha funkcji | `tabela-obietnic.md:112` |
| `DlaKogo.s3_robi_1` | czterech / four / vier | cecha funkcji | `tabela-obietnic.md:114` |
| `Filary.filar3.konkret2` | 90, czterema / four / vier | nazwa własna + cecha funkcji | `tabela-obietnic.md:112` |
| `FunkcjeIndeks.blok3Wprowadzenie` | 90 | nazwa własna | `tabela-obietnic.md:112` |
| `FunkcjePozyskiwanie.mod10_nie` | — / — / beides | **idiom** | brak liczby w PL i EN |
| `FunkcjePozyskiwanie.mod9_poco` | siedem / seven / sieben | cecha funkcji | `tabela-obietnic.md:44` |
| `FunkcjeWyniki.mod5_poco` | 256 | identyfikator | `tabela-obietnic.md:148` |
| `FunkcjeZespol.mod1_poco` | sześć / six / sechs | cecha funkcji | `tabela-obietnic.md:110` + i18n aplikacji |
| `FunkcjeZespol.mod3_nazwa` | 90 | nazwa własna | `tabela-obietnic.md:112` |
| `FunkcjeZespol.mod3_poco` | 90, cztery / four / vier | nazwa własna + cecha funkcji | `tabela-obietnic.md:112` |
| `FunkcjeZespol.mod5_poco` | czterech / four / vier | cecha funkcji | `tabela-obietnic.md:114` |
| `Obawy.naglowek` | sześć / six / sechs | **samoopis** (kontrola maszynowa) | pary `Obawy.oN` |
| `Obawy.o1` | 90 | nazwa własna | `tabela-obietnic.md:112` |
| `Obawy.o4` | 256 | identyfikator | `tabela-obietnic.md:148` |
| `Obawy.o6` | czterech / four / vier | cecha funkcji | `tabela-obietnic.md:114` |
| `ObrazyFilarow.filar3` | 90 | nazwa własna | `tabela-obietnic.md:112` |

Pełne rozstrzygnięcia z uzasadnieniami: `content/liczby-w-tresci.json`.

### Co inwentarz naprawdę pokazał

Nie znaleziono ani jednej liczby zmyślonej. Cztery twierdzenia ilościowe
o aplikacji — **cztery fazy** (Pierwsze 90 Dni), **czterech jurysdykcji**
(Paszport zgodności), **sześć kroków** (kreator wdrożeniowy), **siedem
kategorii** (biblioteka obiekcji) — mają pokrycie w
`content/tabela-obietnic.md`, a „sześć kroków" było dodatkowo policzone
w i18n aplikacji przy Etapie C. Istniała też reguła: **D-D16**
(`docs/faza-4/tresci-etap-d-po-panelach.md:130`) dopuszcza liczebnik
słowny, gdy jest cechą funkcji z tabeli obietnic.

Wadą nie było więc kłamstwo, tylko **brak wiązania**. Reguła D-D16
mieszkała w dokumencie etapu; nic nie łączyło zdania „sześć kroków"
z wierszem tabeli, z którego ta liczba pochodzi. Zmiana szóstki na
ósemkę — w treści albo w aplikacji — nie zapaliłaby niczego. Rejestr
`content/liczby-w-tresci.json` domyka właśnie to.

Osobno: `content/facts.json` **nie jest** miejscem dla tych liczb.
Nazwa własna („Pierwsze 90 Dni"), identyfikator („SHA-256") i cecha
funkcji nie mają pola `data_pomiaru`, bo nie są pomiarem — wpis tam
nadawałby im fałszywy status wartości zmierzonej. Granica została
dopisana do `_opis` samego `facts.json`, żeby oba pliki mówiły to samo.

## 3. Jak działa przebieg 2

`scripts/lint-liczby.mjs`, przebieg 1 (JSX) — bez zmian. Przebieg 2:

1. czyta **wszystkie** pliki z `src/i18n/messages/`, spłaszcza do kluczy
   `A.b.c`;
2. w każdym ciągu szuka cyfr **i** liczebników słownych danego języka
   (mapa `LICZEBNIKI`: 2–1000 plus ilości nieokreślone typu „setki",
   „hundreds", „hunderte");
3. każdy klucz z liczbą musi mieć wpis w `content/liczby-w-tresci.json`
   z kategorią, pokryciem, uzasadnieniem i **kompletem znalezionych
   liczb per język**;
4. wpis bez ciągu (klucz zniknął albo stracił liczbę) też jest czerwienią.

Zgoda dotyczy **liczb, nie akapitu**. Zamiana „sześć" na „osiem" zapala
bramkę przy niezmienionym kluczu i kategorii; poprawka literówki obok
liczby nie zapala niczego (mutacje M2 i M3 poniżej). To celowa różnica
wobec sumy kontrolnej z całego ciągu: strażnik, który czerwieni się przy
każdym przecinku, uczy ludzi aktualizować go bez czytania.

`kategoria: samoopis` może dodatkowo wskazać **kontrolę maszynową**.
Dziś jest jedna: `obawy-liczba-par` liczy klucze `Obawy.oN` i wymaga,
żeby nagłówek „Sześć obaw" mówił dokładnie tyle. Dodanie siódmej pary
zapala bramkę, zanim nagłówek zdąży skłamać.

Nowy język w `messages/` bez wpisu w `LICZEBNIKI` **też jest czerwienią**.
Bez tego skan cyfr działałby dalej, a „vier Phasen" w czwartym języku
byłoby niewidoczne — czyli strażnik wygasłby cicho przez zmianę
otoczenia (CLAUDE.md, prymat nieodwracalnego).

Pomoc przy dopisywaniu: `npm run bramka:liczby -- --inwentarz` wypisuje
szkielet wpisów z kompletem znalezionych liczb.

## 4. Czego bramka nie widzi — świadomie

| poza zasięgiem | dlaczego | gdzie zapisane |
| --- | --- | --- |
| rodzina „jeden / one / ein" | w trzech językach rodzajnik albo idiom („w jednym miejscu", „one click"); skan dał **76 kluczy i ani jednego twierdzenia ilościowego** | `liczby-w-tresci.json` → `_poza_zasiegiem`, karta tonu pkt 5 |
| liczebniki porządkowe („siódma", „seventh") | opisują kolejność, nie ilość | jw. |

W obu miejscach cisza bramki nie jest pokryciem — odpowiada redakcja.
Zapis stoi w trzech miejscach naraz (rejestr, karta tonu, komentarz
w kodzie bramki), bo każde z nich czyta kto inny.

## 5. Dowody mutacyjne

Zielona bramka po zmianie nie jest dowodem, że nadal mierzy to samo —
dowodem jest mutacja (CLAUDE.md). Jedenaście przebiegów, każdy
przywracał stan przed następnym:

| # | mutacja | oczekiwano | wynik |
| --- | --- | --- | --- |
| M0 | bez mutacji | zieleń | zieleń |
| M1 | nowy ciąg z liczbą, bez wpisu w rejestrze | czerwień | czerwień |
| M2 | „sześć kroków" → „osiem kroków" ×3 języki (klucz i kategoria bez zmian) | czerwień | czerwień (3 naruszenia — po jednym na język) |
| M3 | poprawka słowa obok liczby, liczba nietknięta | **zieleń** | zieleń |
| M4 | liczba znika z ciągu, wpis zostaje | czerwień | czerwień |
| M5 | nowy język `fr.json` bez listy liczebników | czerwień | czerwień |
| M6 | siódma para obaw przy nagłówku „Sześć obaw" | czerwień | czerwień (kontrola `obawy-liczba-par`) |
| M7 | nieznana kategoria w rejestrze | czerwień | czerwień |
| M8 | wpis bez pola `pokrycie` | czerwień | czerwień |
| M9 | literalna cyfra w JSX (przebieg 1 nietknięty) | czerwień | czerwień |
| M10 | rejestr usunięty | czerwień | czerwień |

M3 jest tu równie ważna jak reszta: strażnik, który czerwieni się na
wszystko, zostaje wyłączony przez ludzi, a nie przez zmianę kodu.

M9 pilnuje, żeby rozbudowa nie zjadła pierwotnej bramki — przebieg 1
działa dokładnie jak przed zmianą.

## 6. Co zostaje otwarte

- **Wiązanie w drugą stronę.** Rejestr pilnuje, żeby treść nie odjechała
  od pokrycia. Nie pilnuje, żeby **pokrycie** nie odjechało od aplikacji:
  jeśli kreator wdrożeniowy dostanie siódmy krok, tabela obietnic
  i strona będą zgodne i obie nieprawdziwe. To zadanie dla zlecenia
  typu Z (odczyt aplikacji), nie dla bramki strony — i tak samo działa
  dziś `facts.json` (wpis `przypomnienie-kalendarza-minuty` czeka na
  weryfikację od 2026-08-12).
- **`Cennik.cta` i `ZamkniecieCennik.cta`** niosą identyczną wartość
  („Wybierz plan") i nic nie pilnuje ich równości. Poza zakresem T6 —
  to nie jest liczba — odnotowane, żeby nie zginęło.
