# ADR-052: Czwarty bloker korpusu jasnego i batch A1 — nawigacja, hero, stopka w anatomii Proactiva

Data: 2026-09-04. Status: **PRZYJĘTY** (zlecenie `WWW/077`, kroki 1–2).

Domyka ADR-050 o bloker, którego nie zauważył, i przenosi anatomię wzorca
na trzy elementy wskazane imiennie przez koordynatora.

---

## Rozstrzygnięcie 1 — czwarty bloker: obrys pola formularza na jasnym

ADR-050 zdjął trzy blokery korpusu jasnego i **przeoczył czwarty**.
Strefa jasna przestawiała siedem ról — i nie przestawiała `kreska-mocna`,
czyli akurat tej, **której cały sens jest progiem 3:1 z WCAG 1.4.11** dla
granicy kontrolki.

| `kreska-mocna` na… | kontrast | próg 3:1 |
| --- | --- | --- |
| `powierzchnia` (ciemna) | 10,79:1 | ✓ |
| `powierzchnia-jasna` | **1,53:1** | ✘ |
| `powierzchnia-karty-na-jasnym` | **1,71:1** | ✘ |

`kreska-mocna-na-jasnym` = **#565656**. Wartość **odtwarza relację
z korpusu ciemnego**, nie jest dobrana od nowa: tam `kreska-mocna` jest
równa `tekst-drugorzedny`, więc tutaj jest równa `tekst-2-na-jasnym`.
Zmierzone: **6,56:1** i **7,34:1** — dwukrotny zapas. Odrzucono wariant
dający dokładnie 3,00:1; reguła z ADR-038 mówi „spełniający próg", nie
„ledwo spełniający".

### Dlaczego żadna bramka nie milczała z powodu wady

**W całym `src/` nie ma ani jednego pola tekstowego.** Jedyne `input` to
przełącznik okresu w cenniku (`type="radio"`), a ten jest jawnie wyłączony
z reguły obrysu. Strażnik nie przeoczył defektu — **nie miał przedmiotu**.

To ta sama klasa co zapisana w przekazaniu („strażnik, który nigdy nie
przebiegł przeciw stanowi, do którego wracasz"), tylko widziana **od strony
elementu przyszłego zamiast przeszłego**. Wada czekała na pierwsze pole.

### Dowód: dwa stany na żywej stronie, ta sama sonda

Metodą, którą zaproponował trzeci agent rozpoznania `WWW/076` — pole
wstrzyknięte do sekcji jasnej i zmierzone `getComputedStyle`:

| stan | obrys × tło sekcji jasnej |
| --- | --- |
| sprzed naprawy | `rgb(197,198,197)` → **1,53:1** ✘ |
| po naprawie | `rgb(86,86,86)` → **6,56:1** ✓ |

## Rozstrzygnięcie 2 — „zero rodzaju odbiorcy w pl" potwierdzone DRUGĄ postacią

ADR-051 zapisał regułę: *kontrola pozytywna dobrana do własnej metody
potwierdza METODĘ, nie POKRYCIE*. Ta reguła została teraz zastosowana do
własnego twierdzenia.

Pierwsza postać (WWW/075) szukała **końcówek czasownika** i słowa „sama".
Druga (tutaj) szuka **rzeczowników żeńskich osobowych** — innej postaci
tego samego bytu. Wynik: **pięć trafień, zero dotyczących odbiorcy**:

| trafienie | klasa |
| --- | --- |
| `Ciasteczka` | nazwa dokumentu, nie osoba |
| `marki` | marka, nie osoba |
| `filiżanka`, `półka` | przedmioty w alt-tekstach |
| **`Współpracowniczka z twojego zespołu`** | **osoba trzecia** — ta sama klasa co 18 kluczy zostawionych w ADR-049 |

Twierdzenie „zero rodzaju odbiorcy w `pl`" stoi teraz na **dwóch
niezależnych metodach**, nie na jednej.

Klucz `Cennik.plany.pro.pozycja1` — przeoczony w WWW/075, naprawiony
w `8fa4719` — potwierdzony diffem: zmiana objęła `pl`, `de` i trzy pliki
`content/`.

## Rozstrzygnięcie 3 — batch A1: anatomia Proactiva na trzech elementach

⚠ **TO JEST IMIENNE WYJĘCIE Z REGUŁY ADR-049, NIE JEJ ZŁAMANIE.** ADR-049
mówi: przy konflikcie geometrii wygrywa POMIAR 0.3 (wzorzec
WWW/050-FINAL). Reguła **zostaje w mocy dla całej strony**; batch A1
(nawigacja, hero, stopka) jest z niej wyjęty decyzją koordynatora, bo to
właśnie te trzy elementy mają nieść anatomię Proactiva.

| | WWW/050-FINAL | Proactiv (A1) | zmierzone po zmianie |
| --- | --- | --- | --- |
| pasek | 80 px, **w toku** | 62 px, **przyklejony** | **62 px @390/810/1440** ✓ |
| kontener paska | wcięcie 120 px → 1200 | **1280 px wyśrodkowany** | **1280 @1440** ✓ |
| H1 | 70 / 53 / 34 px | **96 / 80 / 48 px** | ✓ |
| pozycja H1 | y 210,4 | **y 184 (1440) / 104 (390)** | **184 / 104** ✓ |
| hero | wysokość z treści | **min 1600 / 1120 px** | **1,78× / 1,33×** viewportu |

### Przyklejony pasek — ODWRÓCENIE ADR-045 WYKONANE RACHUNKIEM

ADR-045 zdjął `sticky` tak: pigułka 80 px przy wcięciu 120 px zajmowała
pas **20…200 px**, a strażnik `odsuniecie-kotwic` trzyma pułap **96 px**.
Pas łamał go dwukrotnie.

Geometria wzorca daje inny rachunek: **16 + 62 = 78 px**, czyli 18 px pod
pułapem. **Ta sama reguła, ta sama liczba graniczna — zmieniła się
wyłącznie wysokość paska.** To nie jest zmiana zdania; to inna przesłanka.

### Poświata — klaster wzorca, jednostronny

Trzy nakładające się elipsy obrócone o **−45°**, wyłącznie przy **lewej**
krawędzi. U nas złożone w **jednym** elemencie jako trzy warstwy
`background-image` — wynik ten sam, o dwa węzły mniej.

⚠ **Jednostronność jest pomiarem, nie oszczędnością:** skan całej strony
wzorca pokazał podniesione tło wyłącznie w pasie x 0–440; prawy margines
nie drgnął ani razu. Symetryczna poświata wyglądałaby „porządniej" i była
niezgodna z tym, co zmierzono.

⚠ **Amplituda ma być niepozorna** — u wzorca tło rośnie najwyżej o 15
stopni sRGB (1,12:1). Nasza jest ograniczona **konstrukcyjnie**: alfa
najjaśniejszej warstwy to 0,08, wprost z pomiaru. **Nie wykonałem pomiaru
rastrowego amplitudy po naszej stronie** — granica zapisana, nie zasypana.

## Rozstrzygnięcie 4 — trzy regresje dostępności, które przyklejenie wywołało

Przyklejenie paska wyprowadziło go z toku i **treść zaczęła się na y=0**.
Zmierzone konsekwencje, wszystkie naprawione:

| defekt | zmierzone | naprawa |
| --- | --- | --- |
| H1 podstron pod paskiem | **y=40** w pasie 16…78 | `main` dostaje odstęp `pas-naglowka` |
| cel skip-linku `#tresc` | **y=0** | odstęp jako **margines + `flow-root`**, nie padding — padding przesuwa treść, ale zostawia PUDEŁKO celu na zerze |
| skip-link zakryty | **y=70** w pasie 16…78,4 | odsunięcie na token pasa |

⚠ **`pas-naglowka` = 84 px, nie 78** — i te 6 px są konieczne, nie
ostrożnościowe. Pasek nie ma równych 62 px: jego wysokość wyznacza CTA
(46,4 px) plus padding, co daje **62,39** i dolną krawędź **78,39**. Przy
78 px kotwica lądowała **0,81 px za wysoko** i zapalała **27 asercji W4**
na siedmiu trasach. Jedna liczba na trzy zastosowania (`scroll-padding`,
odstęp `main`, ujemny margines hero) — rozdzielenie ich dałoby trzy
wartości rozjeżdżające się po cichu.

⚠ **Hero JAWNIE rezygnuje z tego odstępu** (ujemny margines), bo u wzorca
pasek **płynie nad hero** — półprzezroczysta pigułka na ciemnym tle jest
częścią kompozycji, nie kolizją. Reszta stron takiego tła nie ma.

### Pomyłka po drodze, zapisana bo pouczająca

Pierwsza próba odsunięcia skip-linku chybiła o **8,4 px**. Liczyłem
odsunięcie jako „wysokość paska + oddech", zakładając, że link jest
pozycjonowany **wewnątrz** nagłówka. **Nie jest** — w znaczniku stoi jako
**rodzeństwo** `header`, dzieckiem `body`, więc jego `inset` liczy się od
kadru, nie od paska.

## Rozstrzygnięcie 5 — SKAŻENIE POMIARU, które kosztowało 92 fałszywych czerwieni

W trakcie pracy jeden przebieg e2e pokazał **104 upadki**. Po zabiciu
procesu na porcie 3000 ten sam kod dał **12**.

**Przyczyna: mój własny serwer z poprzedniego builda stał na porcie 3000,
a `playwright.config.ts` ma `reuseExistingServer: !CI`.** Playwright nie
uruchomił świeżego serwera — użył mojego, więc mierzył **stronę sprzed
dwóch napraw**.

To jest ta sama klasa co „skażenie pomiaru sprawdza się wstecz": różnica
92 czerwieni nie wynikała z kodu, tylko z tego, **co odpowiadało na porcie**.

**Reguła wykonawcza:** przed przebiegiem e2e port 3000 ma być **wolny**,
a nie „prawdopodobnie aktualny". Serwer postawiony do pomiaru ręcznego
**zabija się przed uruchomieniem bramki**, bo `reuseExistingServer` zamienia
go w cichy stan przeszły.

## Czego ten ADR NIE rozstrzyga

- **Amplituda poświaty po naszej stronie** — ograniczona konstrukcyjnie
  (alfa 0,08 z pomiaru), ale **nie zmierzona rastrowo**.
- **Stopka** — zlecenie wymieniało ją w batchu A1; jej odstępy idą już za
  drabiną z ADR-049 (160/80 px progowane), więc **nie wymagała zmiany**.
  Kolejność i treść bez zmian, zgodnie ze zleceniem.
- **Reszta sekcji** — nietknięte poza odstępami, które i tak niosły tokeny.
- **Cel konwersji** — decyzja B etapowana, trasa powstanie w APLIKACJI;
  w tym zleceniu nic z tego nie budowano.
