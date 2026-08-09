# image-style.md — prompt bazowy warstwy obrazów (Higgsfield)

**Status: PROJEKT do przeglądu właściciela.** Testy generacji w Higgsfield
dojdą po autoryzacji konektora; do tego czasu dokument nie jest zatwierdzony.

Zasady nadrzędne: ADR-011 (wyłącznie warstwa dekoracyjna, nigdy
pseudo-zrzuty), ADR-013 (ciepła jakość), ADR-001 (izolacja marki),
ADR-015 (paleta wyłącznie z `design/tokens.json`). Agent obrazów dostaje
TEN plik + brief konkretnej grafiki — nic więcej (PLAN.md 3.4).

---

## 1. Paleta — pochodzi z tokenów, nie z wyobraźni

Wartości poniżej są odwzorowaniem `design/tokens.json` (stan po Etapie D
Fazy 1). Zmiana palety = zmiana tokenów przez ADR; wtedy aktualizuje się
i ten dokument. Ręczna rozbieżność z tokenami = bug.

| Rola w obrazie | Token | Hex |
|---|---|---|
| Dominanta tła / światła | `kolor.tlo` | `#eee6e0` |
| Cienie, kontury, głębia | `kolor.neutralna.900` | `#3b2a20` |
| Ciepłe rozświetlenia | `kolor.neutralna.50` | `#fff1e9` |
| Akcent główny (plamy, przedmioty) | `kolor.terakota.500` | `#e65b3d` |
| Terakota stonowana (tła drugiego planu) | `kolor.terakota.200` | `#ffc8b9` |
| Akcent zieleni (rośliny, tkaniny) | `kolor.szalwia.400` | `#5ca596` |
| Akcent chłodniejszy (detale, kwiaty) | `kolor.sliwka.700` | `#5e4775` |

Proporcje: tło i neutralne ≥ 70 % kadru; terakota jako główny akcent;
szałwia i śliwka jako akcenty poboczne. Obraz ma wyglądać, jakby
sfotografowano go w pomieszczeniu pomalowanym naszą paletą — nie jak
grafikę wektorową z pełnym kołem barw.

## 2. Prompt bazowy (klei się z briefem konkretnej grafiki)

```
Warm editorial still-life illustration, soft morning daylight through
a window, cozy domestic setting. Muted warm cream background (#eee6e0),
deep espresso brown shadows (#3b2a20), terracotta accents (#e65b3d),
occasional sage green (#5ca596) and muted plum (#5e4775) details.
Gentle painterly texture, soft rounded shapes, quiet composition with
generous negative space. No people, no faces, no text, no logos,
no screens, no user interface.

[BRIEF KONKRETNEJ GRAFIKI — co przedstawia, gdzie na stronie żyje,
orientacja i proporcje kadru]
```

## 3. Światło i nastrój (ADR-013 — sygnały wzmacniane)

- **światło dzienne**, miękkie, poranne lub wczesnopopołudniowe; źródło
  naturalne (okno), cienie łagodne i ciepłe,
- konteksty **domowe i jasne**: stół kuchenny, parapet, notes, kubek,
  tkanina, rośliny — świat dnia pracy odbiorczyni, nie biuro korporacji,
- kompozycja spokojna, ze światłem (negative space) — gościnność,
  nie horror vacui,
- faktura malarska/ilustracyjna, kształty miękkie, promienie łagodne.

## 4. Poziom abstrakcji

Ilustracja dekoracyjna: martwa natura, wnętrza, przedmioty, motywy
roślinne. Obraz **opowiada nastrój, nigdy funkcję produktu**. Nie wolno
mu sugerować, że pokazuje aplikację, dane ani wyniki — od pokazywania
produktu jest wyłącznie Playwright na danych demo (ADR-011).

## 5. Zakazy bezwzględne (negative prompt + checklista odbioru)

- **żadnych interfejsów**: ekranów, okien aplikacji, wykresów, tabel,
  dashboardów, telefonów z widoczną treścią — niczego, co ktokolwiek
  mógłby wziąć za zrzut z Catherly (ADR-011),
- **żadnych ludzi i twarzy** (także dłoni z rozpoznawalną biżuterią
  firmową), żadnych logotypów, opakowań realnych marek (ADR-001),
- **żadnego tekstu w obrazie** — napisy generowane wyglądają jak bełkot
  i wchodzą w kompetencje treści,
- estetyka zakazana (ADR-013): czerń–złoto, marmur, sesja modowa,
  sterylna biel, neony; oraz przegięcie w dół: cukierkowość, dziecięcość,
- **żadnego fotorealizmu udającego stock** — obraz ma być jawnie
  ilustracyjny.

## 6. Format wyjściowy i pipeline (PLAN.md 3.4)

- generacja w najwyższej dostępnej rozdzielczości; kadr wg briefu
  (na start: 4:3 i 16:9 poziome, 1:1 do kart),
- surowy plik z generatora trafia do `design/obrazy-robocze/` (poza
  `src/`!), commitowany dla śladu pochodzenia,
- do `src/` wchodzi wyłącznie wynik pipeline'u: AVIF + WebP, warianty
  szerokości od 390 px, `loading="lazy"` poza pierwszym ekranem,
  wymiary zadeklarowane (CLS),
- każdy obraz ma tekst alternatywny ustalany przy briefie — obraz czysto
  dekoracyjny dostaje pusty `alt=""` świadomie, nie przez zaniedbanie.

## 7. Bramka odbioru (test 30 sekund, ADR-013)

Ocena wygenerowanego obrazu w kontekście sekcji: reakcja ma brzmieć
„ktoś się postarał, jest mi tu dobrze". „Ale elegancko" = za chłodno,
odrzucone. „Słodkie" = za infantylnie, odrzucone. Obraz, który przyciąga
wzrok mocniej niż treść sekcji — odrzucony (dekoracja służy, nie rządzi).
Odbiór robi agent inny niż generujący (Prawo 2).
