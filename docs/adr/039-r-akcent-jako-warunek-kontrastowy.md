# ADR-039: R-AKCENT-01 i R-AKCENT-02 przepisane z zakazu barwy na warunek kontrastowy

Data: 2026-08-26. Status: **PRZYJĘTY** (zlecenie `WWW/055`, punkty 1–2,
w odpowiedzi na dwie czerwienie zgłoszone jawnie w zwrotce KROKU 1.1).

## Kontekst — dlaczego obie reguły zapaliły się na stanie POPRAWNYM

`WWW/050-FINAL` kazało przenieść paletę wzorca co do wartości. Paleta
wzorca jest **ciemna**; obie reguły R-AKCENT powstały wcześniej, przy
palecie **jasnej**, i obie zapisywały swój cel **przez zakaz barwy**.
Po przeniesieniu paleta była poprawna, a strażnik czerwony.

To nie był fałszywy alarm w potocznym sensie — reguła działała dokładnie
tak, jak ją napisano. Wadą było **brzmienie**, nie zachowanie.

**Klasa: przybliżenie celu utrwalone jako reguła.** Zakaz barwy był
dobrym przybliżeniem kontrastu **na jednej palecie**. Przybliżenie
przestaje przybliżać, gdy zmieni się otoczenie — a wygląda wtedy
identycznie jak reguła, która słusznie broni.

## Decyzja 1 — R-AKCENT-01: akcent może nieść tekst, jeśli go widać

**Stare brzmienie:** *„akcent NIGDY nie niesie tekstu"*.

**Nowe brzmienie:** akcent może nieść tekst i glify, jeśli kontrast na
danej powierzchni wynosi **≥ 4,5:1** (tekst normalny) albo **≥ 3:1**
(duży tekst i glify UI). **Zakaz barwy znika; pomiar zostaje
strażnikiem.**

Reguła powstała z pomiaru **2,87:1 na jasnym tle** — czyli z sytuacji,
w której akcentu jako tekstu naprawdę nie było widać. Na tle wzorca ten
sam akcent ma **12,58:1**. Zakaz bronił kontrastu, nie barwy.

Zmierzone na palecie wzorca (2026-08-26, commit `b4ffc6c`):

| akcent `#a0e00d` na powierzchni | kontrast | tekst normalny | duży / glif |
| --- | ---: | :---: | :---: |
| `tlo-strony` `#070806` | 12,58:1 | ✔ | ✔ |
| `powierzchnia` `#131412` | 11,58:1 | ✔ | ✔ |
| `powierzchnia-2` `#20211f` | 10,14:1 | ✔ | ✔ |
| `powierzchnia-akcentowa` `#393938` | 7,25:1 | ✔ | ✔ |

Znacznik „+" w FAQ (`Faq.module.css`, `summary::before`) jest tym samym
**legalny** — 12,58:1 przy progu 3:1 dla glifu.

**R-AKCENT-03 znika jako osobna reguła.** Była słabszym przypadkiem tej
samej rzeczy — fragment nagłówka w akcencie przy progu 3:1. Nowy próg
4,5:1 jest od niej surowszy, więc osobne sprawdzenie byłoby duplikatem,
a duplikat przy zmianie progu rozjeżdża się po cichu. ADR-033 dostaje
adnotację; nie jest przepisywany.

## Decyzja 2 — R-AKCENT-02: cel zamiast litery, dwa człony

**Stare brzmienie:** *„fokus ≠ akcent ≠ interakcja"* — rozdzielność
trójki jako wymóg.

**Wymóg rozdzielności trójki: USUNIĘTY.** `akcent == interakcja`
(`#a0e00d`) to **konstrukcja wzorca**, nie nasz błąd. Cel reguły —
żeby stany dało się rozróżnić — niosą teraz dwa człony, oba mierzone:

**(a) Etykieta na polu akcentu jest ZAWSZE ciemna** (`#070806` /
`#231f20`) i ma **≥ 4,5:1**. Zmierzone: `tekst-na-interakcji` ×
`interakcja` = **10,22:1**, × `interakcja-aktywna` = **10,47:1**.

**(b) Fokus widoczny wszędzie:** obrys ma **≥ 3:1 wobec powierzchni,
NA KTÓRĄ PADA**. Zmierzone: biel na `tlo-strony` **20,07:1**, na
`powierzchnia` 18,48:1, na `powierzchnia-2` 16,17:1, na
`powierzchnia-akcentowa` 11,56:1.

### Mechanizm `outline-offset` jest częścią reguły, nie szczegółem CSS

Człon (b) mówi „na którą pada" i to sformułowanie robi całą robotę.
Para **fokus × interakcja ma 1,60:1** — daleko poniżej progu. Wolno jej
nie sprawdzać **wyłącznie dlatego**, że obwódka na wypełnienie CTA nie
pada: odsuwa ją `outline-offset` na tło. Zdejmij odsunięcie, a reguła
(b) zaczyna kłamać.

**Dlatego mechanizm ma własnego strażnika** —
`e2e/kontrast-stanow.spec.ts`, test „R-AKCENT-02(b)". Wyprowadza
powierzchnię pod obwódką ze **znaku odsunięcia**: dodatnie kładzie
obwódkę poza pudełkiem elementu, ujemne na jego wypełnieniu.

**Pytanie zerowe, zadane 2026-08-26: tego strażnika NIE BYŁO.** Ciąg
`outline-offset` nie występował w żadnej asercji w `e2e/` — jedyne
trafienia to komentarze. Wykryte przy pisaniu komentarza, który
twierdził, że strażnik istnieje, czyli **przy próbie zbudowania zdania
o rzeczy, której nie sprawdzono**. Bez tego testu cały człon (b) był
napisem, a nie mechanizmem.

## Dowody mutacyjne — i dwa fałszywe dowody, które je poprzedziły

**Pierwsze podejście do obu mutacji wróciło ZIELONE, i to nie był
dowód, tylko dwa różne sposoby nietrafienia w przedmiot.** Zapisane,
bo zielona mutacja wygląda identycznie jak strażnik niewrażliwy.

| próba | co zrobiono | wynik | przyczyna |
| --- | --- | --- | --- |
| 1 (fałszywa) | zmiana tokenu + `npm run tokeny` | zieleń | **skryptu `tokeny` nie ma** — polecenie zawiodło cicho, generowany CSS został stary |
| 1 (właściwa) | zmiana tokenu + `npm run tokeny:build` | **czerwień** | `R-AKCENT-01: --akcent na --powierzchnia = 1.30:1, wymagane 4.5:1` |
| 2 (fałszywa) | edycja `outline-offset` w `globals.css` | zieleń | serwer testów to `npm run start` — **wydanie zbudowane**, edycja źródła do przeglądarki nie dotarła |
| 2 (właściwa) | wstrzyknięcie `outline-offset: -0.25rem` do wyrenderowanej strony | **czerwień** | `obwódka rgb(255,255,255) na powierzchni rgb(160,224,13) = 1.60:1 przy odsunięciu -4 px; wymagane 3:1` |

Mutacja 2 wykonana **wstrzyknięciem, nie przebudową**, bo port 3000
zajmuje proces właściciela (PID 40144) i przebudowa wymagałaby jego
restartu — zakaz 7. Wstrzyknięcie odtwarza dokładnie stan, który dałoby
zdjęcie odsunięcia w źródle, i mierzy je **ta sama asercja**, nie kopia.

Wszystkie stany przywrócone, zgodność potwierdzona sumami SHA-256:
`design/tokens.json`, `src/styles/generated/tokeny.css`,
`src/app/globals.css`, `e2e/kontrast-stanow.spec.ts`.

**Obie fałszywe próby należą do jednej rodziny:** *komenda raportuje
sukces swojej operacji, nie osiągnięcie twojego celu*. W pierwszej
`npm run` zwrócił błąd w strumień, który przekierowałem do `/dev/null`;
w drugiej `sed` naprawdę zmienił plik — tylko że mierzony był inny
artefakt.

## Sprostowanie liczby w ADR-037

ADR-037, decyzja 3, uzasadniał biel fokusu liczbą **„10,22:1 wobec
limonkowego CTA"** i zdaniem o „zachowanej rozdzielności trójki".
**Oba są nieścisłe:**

- 10,22:1 to kontrast **etykiety** na CTA, nie obwódki. **Biel wobec
  limonki ma 1,60:1.**
- Rozdzielność trójki **nie była zachowana**: fokus różni się od obu,
  ale `akcent == interakcja`.

**Wybór bieli zostaje ważny — z innego powodu, niż zapisano:** obwódka
pada na tło (20,07:1) dzięki `outline-offset`. Właściciel prostuje za
sobą zdanie z `WWW/052` pkt 3 i nazywa klasę: **liczba cytowana
z poprzedniej zwrotki bez ponownego pomiaru**. ADR-037 dostaje
adnotację odsyłającą tutaj; nie jest przepisywany.

## Co ten ADR zmienia w strażniku

- Skan CSS „akcent jako kolor tekstu" — **usunięty**.
- Sprawdzenie rozdzielności trójki — **usunięte**.
- Ostrzeżenie „akcent poniżej 3:1 na tle" — **usunięte, bo stało się
  nieosiągalne**: nowy błąd zapala się już poniżej 4,5:1 na tej samej
  parze, więc gałąź poniżej 3:1 nie wykonałaby się nigdy. Zostawiona
  wyglądałaby jak druga warstwa ochrony, będąc martwym kodem.
- Stopka „czego nie sprawdza" — **przepisana**. Podawała jako przykład
  parę `akcent × powierzchnia-akcentowa = 2,53:1` z palety kancelarii;
  ta para jest dziś **sprawdzana** i ma 7,25:1. Wymienia teraz to, co
  naprawdę zostaje poza zasięgiem, wraz z parą fokus × interakcja
  pominiętą **celowo** i z zależnością członu (b) od testu e2e.

## Konsekwencje

- `npm run bramka:tokeny` — **zielona bez wyjątków** (`WWW/055` pkt 3).
- Akcent wolno użyć jako tekstu na każdej z czterech powierzchni palety
  wzorca; przy zmianie palety pilnuje tego pomiar, nie pamięć.
- Człon (b) R-AKCENT-02 **zależy od `e2e/kontrast-stanow.spec.ts`**.
  Wyłączenie tego testu wyłącza połowę reguły — zapisane tu i w stopce
  strażnika, żeby zależność nie żyła w cudzej głowie.
