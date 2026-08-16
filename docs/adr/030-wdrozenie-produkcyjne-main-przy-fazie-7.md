# ADR-030: `main` dostaje własne wdrożenie produkcyjne przy Fazie 7

Data: 2026-08-16. Status: PRZYJĘTY (decyzja właściciela 2026-08-16 —
droga wybrana z trzech przedstawionych w
[`docs/faza-4/bramka-na-preview.md`](../faza-4/bramka-na-preview.md), §7).

## Kontekst

Bramka wydajności mierzy dziś przez `npm run start` na runnerze GitHuba,
czyli **HTTP/1.1 + gzip na localhoście**. Rozbiór z 2026-08-16
([`docs/faza-4/render-delay-glowna.md`](../faza-4/render-delay-glowna.md))
wykazał, że różnicę robi transport pomiaru, a nie waga strony. Mediany
LCP dla „/", budżet 1800 ms:

| transport | bez zrzutów Z6 | ze zrzutami Z6 |
| --- | --- | --- |
| HTTP/1.1 + gzip (dzisiejszy pomiar) | 1703 ms | 1856 ms |
| HTTP/2 + gzip | 1426 ms | 1427 ms |
| **HTTP/2 + brotli (tak serwuje Vercel)** | **1276 ms** | **1276 ms** |

Koszt to rundy sieciowe, nie kilobajty: te same zrzuty kosztują +153 ms
na HTTP/1.1 i **+0 ms** na transporcie produkcyjnym. Werdykt właściciela:
*strona zdrowa, termometr zły* — pomiar przenosi się na preview Vercela,
a warunkiem włączenia zrzutów przestaje być odchudzanie strony.

Preview istnieje dla gałęzi fazowych i dla PR-ów, bo Vercel wdraża ich
głowę. Dla **`main` nie istnieje**: `vercel.json` ustawia
`git.deploymentEnabled.main = false` („wyłączenie automatycznych deployów
z main do czasu publikacji"). Po ustawieniu zmiennej `LHCI_BAZA` bramka
wydajności na `main` nie miałaby więc czego zmierzyć i zapaliłaby się
czerwono z powodu **środowiskowego**.

Kolizja dotyczy ADR-020 („main zawsze zielony") w części o stanie **po**
merge'u — nie w części o samym merge'u, bo bramki na PR mierzą preview
gałęzi i to one decydują o przepuszczeniu.

## Decyzja

`main` dostaje własne wdrożenie produkcyjne na Vercelu:
`git.deploymentEnabled.main` → `true` **przy Fazie 7**.

Uzasadnienie właściciela: **merge Fazy 7 = premiera**, a wdrożenie
produkcyjne i tak wtedy musi istnieć. Włączenie deployów z `main` nie
jest kosztem dodanym, tylko czynnością już zaplanowaną, wykonaną
dokładnie w chwili, w której problem zaczyna mieć znaczenie.

Do Fazy 7 czerwień środowiskowa bramki wydajności na `main` jest
**przyjęta świadomie** i odnotowana tu oraz w dokumencie operacyjnym.
Podstawa: `main` nie przyjmuje commitów poza merge'ami faz, więc
przebiegów na `main` jest tyle, ile merge'ów — czerwień nie zaszumia
codziennej pracy, bo codzienna praca dzieje się na gałęziach fazowych.

**Zero wyjątków w bramce.** Nie powstaje żadna gałąź kodu, która na
`main` pomija strażnika celu pomiaru albo po cichu wraca do pomiaru
lokalnego. Bramka pomijająca samą siebie na najważniejszej gałęzi to
dokładnie ta klasa dziury, którą strażnik zamyka (ADR-018: brak dowodu
= brak zabezpieczenia). Cena jest zapłacona w widoczności, nie w kodzie.

## Konsekwencje

- **ADR-020 zostaje bez zmian w literze i w mocy.** Żaden merge do `main`
  nie przechodzi przy czerwonej bramce. Ta czerwień pojawia się **za**
  bramką — w przebiegu na `main` już po merge'u — a nie przed nią, więc
  nie jest merge'em „przez uzasadnioną czerwień" i nie tworzy precedensu,
  przed którym ADR-020 powstał.
- **Okno tej czerwieni zaczyna się nie od tego ADR-a**, tylko od
  pierwszego merge'a do `main`, który nastąpi **po** ustawieniu
  `LHCI_BAZA`. Dopóki zmienna jest pusta, bramka na `main` mierzy
  lokalnie i zachowuje się jak dziś. Okno zamyka merge Fazy 7.
- Powstaje **druga planowa czerwień** w repo, obok `Bramka: Nieodwracalne`
  (planowa do Fazy 6). Każda planowa czerwień kosztuje czujność, więc jej
  sygnatura jest zapisana i jednoznaczna:
  - pada **strażnik celu pomiaru**, nie asercja Lighthouse — w logu jest
    `✖ CEL POMIARU NIEPOTWIERDZONY`, a **żadnej liczby LCP nie ma**, bo
    `lhci` w ogóle się nie uruchamia;
  - komunikat wymienia przyczynę (b) lub (c) i mówi, co zastał pod
    adresem („pod adresem stoi wydanie …" albo „adres nieosiągalny").

  Każda inna czerwień w tym jobie — a zwłaszcza taka z liczbą LCP — **nie
  jest** tą czerwienią i wymaga rozbioru, nie machnięcia ręką.
- **Przy Fazie 7 do zrobienia** (lista, żeby nie zginęła):
  1. `vercel.json`: `git.deploymentEnabled.main` → `true` (albo usunąć
     blok — domyślnie deploye są włączone);
  2. `LHCI_BAZA` → alias produkcyjny. Uwaga: dziś to jedna zmienna
     repozytorium wskazująca jeden adres, a od Fazy 7 `main` ma mierzyć
     produkcję, a gałęzie fazowe swoje preview. To wymaga rozdzielenia
     (środowiska GitHuba albo wyrażenie per gałąź w workflow) —
     rozstrzygnięcie należy do Fazy 7, nie do tego ADR-a;
  3. zdjąć adnotacje o planowej czerwieni: §7 dokumentu operacyjnego
     i przyczyna (c) w `scripts/sprawdz-preview.mjs`.
- Jeśli Faza 7 przesunie się w czasie, **ten ADR nie wygasa sam**.
  Planowa czerwień, której nikt nie zdejmuje, po pewnym czasie przestaje
  być planowa, a zaczyna być tłem — i wtedy chowa czerwień prawdziwą.
  Przy każdym przesunięciu Fazy 7 należy świadomie potwierdzić, że okno
  zostaje otwarte, albo zamknąć je wcześniej włączeniem deployów z `main`.

## Odrzucone drogi

- **Zostawić `main` bez wdrożenia na stałe** i uznać czerwień za trwale
  planową. Odrzucone: planowa czerwień bez daty ważności jest tłem, a nie
  planem.
- **Wyłączyć zrzuty Z6 na „/" przy merge'u do `main`.** Tanie (jedna
  wartość w rejestrze), ale znaczy publikować stronę bez zrzutów —
  decyzja produktowa podjęta pod presją bramki, czyli dokładnie odwrotnie
  niż nakazuje ADR-018 („w konflikcie przegrywa termin i zakres, nigdy
  nieodwracalne").
