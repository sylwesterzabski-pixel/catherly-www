# ADR-042: Szew logowania — stan przejściowy uznany, kotwica progu przepisana

Data: 2026-08-26. Status: **PRZYJĘTY** (decyzja właściciela, zlecenie
`WWW/056` pkt 1). Uzupełnia ADR-022 (kontrakt szwu); **nie zmienia
progu**.

## Decyzja 1 — wymóg zostaje, czerwień jest uznana

**Wymóg `ΔE ≤ 5,0` POZOSTAJE.** Czerwień **93,92** jest **stanem
przejściowym uznanym**, nie defektem do naprawienia po stronie strony.

- **Powód czerwieni:** paleta strony przeszła na bazę wzorca (prawie
  czarną, ADR-038); tło ekranu logowania aplikacji to nadal ciepły krem
  `#F7F3EA`.
- **Rozstrzygnięcie właściciela 26.08.2026:** aplikacja przechodzi na
  **tę samą bazę**.
- **Zdarzenie konsumujące czerwień:** przemalowanie ekranu logowania
  aplikacji. Domyka je aktualizacja `szew_logowania.tlo` — **po stronie
  właściciela**, bo bramka nie widzi repozytorium aplikacji.
- Do tego czasu bramka **świeci jawnie z adnotacją** „oczekuje na
  przemalowanie aplikacji". **Nie wyłączać, nie podnosić progu** — obie
  drogi to zakaz 3, a czerwień uzasadniona też jest czerwienią
  (ADR-020).

### Odniesienie kontraktu zmienione — i to nie jest formalność

`strona_tlo_odniesienia` przeszło z `#f0efe8` na `#070806`. Bez tej
zmiany bramka **kłamałaby o powodzie własnej czerwieni**: strażnik ma
dwa sprawdzenia, rozjazd odniesienia zapala się **pierwszy** i
**maskuje** ΔE. Komunikat brzmiał „tło ≠ odniesienie" — czyli wskazywał
na rozbieżność zapisu zamiast na rzecz, o którą naprawdę chodzi.

To ten sam mechanizm, który opisano w kontrakcie przy palecie kancelarii
i wtedy rozwiązano tak samo. **Świadomą aktualizacją, której żąda
bramka, jest ten ADR.**

## Decyzja 2 — kotwica progu przepisana, bo wskazywała w pustkę

Poprzednia kotwica brzmiała: *„próg równy (z zaokrągleniem) odległości
tło strony ↔ **neutralna-50** (4,9) — największej relacji tło↔powierzchnia
akceptowanej wewnątrz samej strony"*.

**Roli `neutralna-50` nie ma od ADR-031.** Pozycja była otwarta od
`WWW/040` z adnotacją „zieleń nie zamyka tej pozycji: liczba bez żywego
uzasadnienia jest liczbą, którą następna zmiana palety przesunie bez
oporu". Ta chwila właśnie nadeszła.

### Ustalenie: kotwica RELATYWNA nie przenosi się między paletami

Naturalny odruch — przeliczyć starą metodą na nowych rolach — daje:

| relacja wewnętrzna | ΔE |
| --- | ---: |
| `tlo-strony` × `powierzchnia` | 4,10 |
| `tlo-strony` × `powierzchnia-2` | 10,49 |
| `tlo-strony` × `powierzchnia-akcentowa` | **21,85** |

Największa relacja wewnętrzna to **21,85**, więc ta sama metoda
**podniosłaby próg z 5,0 na 21,85** — czterokrotnie.

**To jest ważniejsze niż sama liczba: podniesienie progu wyszłoby
z REGUŁY, nie ze złej woli.** Wykonawca stosujący zapisaną metodę
w dobrej wierze zamieniłby czerwień na ciszę i miałby na to cytat
z dokumentu.

Przyczyna: wewnętrzne kontrasty ciemnej palety są w CIELAB znacznie
większe niż jasnej, więc miara „największej relacji wewnętrznej"
**rośnie razem z paletą** i przestaje cokolwiek ograniczać. Kotwica
relatywna do samej siebie nie jest kotwicą.

### Nowa kotwica — empiryczna, z naszych własnych werdyktów

Próg **5,0** leży dokładnie **między największym stanem przyjętym
a najmniejszym odrzuconym**:

| tło strony | ΔE wobec `#F7F3EA` | werdykt |
| --- | ---: | --- |
| natura `#f0efe8` | 2,15 | **przyjęty** |
| stan pierwotny `#eee6e0` | **4,66** | **przyjęty** |
| — próg — | **5,0** | |
| kancelaria `#e8e1d5` | **6,46** | **odrzucony** (bramka czerwona, T51) |
| wzorzec `#070806` | 93,92 | czerwień jawna, stan przejściowy |

**4,66 < 5,0 < 6,46.** Próg nie jest odgadnięty ani wzięty z literatury
— jest granicą, którą projekt **już raz przeszedł w obie strony i za
każdym razem rozstrzygnął tak samo**. Nie zależy od palety, bo mierzy
werdykty, nie relacje wewnętrzne.

## Decyzja 3 — adnotacja dostaje własnego strażnika

Kontrakt mówi wprost: *„wtedy deltaE spadnie samo i adnotację trzeba
USUNĄĆ"*. **Zdanie bez mechanizmu jest napisem**, a ten napis miałby
wyjątkowo złe skutki: adnotacja „oczekuje na przemalowanie aplikacji"
wisząca **po** przemalowaniu opisuje rzecz, której już nie ma — i przy
następnej czerwieni zostanie odczytana jako „to normalne, czekamy".

To ta sama klasa co **wyłączenie przeterminowane**. Warunek zamknięcia
jest tu sprawdzalny wprost: ΔE zeszło pod próg, więc zdarzenie
konsumujące zaszło.

```
if (deltaE <= prog && wymaganie._oczekiwanie) → CZERWIEŃ
```

**Adnotacja nie wpływa na kod wyjścia** i nie stoi w żadnym warunku
poza tym jednym. Gdyby zaczęła wpływać, przestałaby być adnotacją
i stałaby się tym, czego zakazuje zakaz 3.

## Dowody

**Adnotacja przy czerwieni** — kontrola negatywna, stan dzisiejszy:

```
✗ Szew przekracza próg: deltaE(#070806, #F7F3EA) = 93.9 > 5 (ADR-022).
  ⏳ OCZEKUJE NA PRZEMALOWANIE APLIKACJI — stan przejściowy uznany
```

Kod wyjścia **1** — sprawdzony osobno, nie przez `tail`, bo potok zjada
status i pokazałby zieleń tam, gdzie jej nie ma.

**Strażnik adnotacji** — mutacja „aplikacja przemalowana"
(`szew_logowania.tlo` → `#0A0B09`), adnotacja zostawiona:

```
✗ Adnotacja stanu przejściowego PRZETERMINOWANA: deltaE = 0.8 ≤ próg 5,
  Adnotacja, która przeżyła swoje zdarzenie, opisuje rzecz, której nie ma.
```

Kod wyjścia **1**. Stan przywrócony, zgodność potwierdzona SHA-256.

## Co ten ADR zamyka i czego nie zamyka

**Zamyka:** pozycję otwartą z `WWW/040` (kotwica wskazująca na
nieistniejącą rolę) oraz pytanie, czym jest dzisiejsza czerwień
kontraktu.

**Nie zamyka:** samej czerwieni. Zamknie ją przemalowanie aplikacji
i aktualizacja `szew_logowania.tlo` — **czynność właściciela**, nie
wykonawcy strony. Wartość `#F7F3EA` należy do aplikacji i wykonawca
strony jej nie rusza.
