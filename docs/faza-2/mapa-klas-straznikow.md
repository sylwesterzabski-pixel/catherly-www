# Mapa klas → strażników

**Miejsce w hierarchii źródeł reguł: szczebel 7 z siedmiu — dokumenty
paneli.** Ten plik **nie jest źródłem reguł** i nie wiąże niczego: reguły
stoją w `docs/adr/` i w `CLAUDE.md`, a przy rozjeździe z nimi obowiązują
tamte. To jest **mapa robocza**: która nazwana klasa wady ma już strażnika,
który go nie ma, i gdzie dokładnie siedzą znane wystąpienia. Zdanie
o miejscu w hierarchii stoi tu od pierwszego commita — dokument bez niego
był defektem, który otworzył **T32**.

**Powód powstania** (właściciel, `WWW/030` → zgoda na zapis `WWW/032`):
rozróżnienie, które wyszło przy naprawie strażnika cennika, okazało się
szersze niż ten jeden przypadek i **nie ma gdzie mieszkać** — rejestr
warunków powrotu zbiera pozycje z warunkiem powrotu, a to jest mapa
pokrycia. Pierwsza klasa wchodzi tu razem z dokumentem.

---

## Klasa: LICZEBNOŚĆ ZE ZBIORU kontra LICZEBNOŚĆ Z DECYZJI

To są **dwie różne klasy o różnych strażnikach** i mylenie ich kosztuje
w obie strony: naprawianie decyzji „bo literał" psuje zadeklarowany
niezmiennik, a przymykanie oka na dryf „bo to przecież decyzja" zostawia
strażnika, który po cichu przestał pokrywać zbiór.

**Jak je odróżnić — jedno pytanie:** *czy istnieje zbiór źródłowy, którego
liczebność ta liczba ma odwzorowywać?*

| | **liczebność ZE ZBIORU** | **liczebność Z DECYZJI** |
|---|---|---|
| skąd liczba | z policzenia zbioru źródłowego (klucze, pliki, wiersze) | z rozstrzygnięcia człowieka |
| co się psuje | zbiór rośnie, literał zostaje — **strażnik cicho przestaje pokrywać** | nic samo z siebie; zmiana wymaga nowej decyzji |
| właściwy strażnik | **czerp zbiór ze źródła**, nie wypisuj ręką; wyłączenia jawne, z powodem i z własnym strażnikiem liczebności | literał **z odesłaniem do decyzji** w komentarzu; zmiana literału bez zmiany decyzji = czerwień |
| objaw dryfu | „lista mówi *oto lista*, nie *przeczytałem dziesięć z czternastu*" | brak — dryf tu nie występuje |

**Dlaczego to nie jest ta sama rzecz z dwoma imionami:** liczba z decyzji
**ma prawo** rozjechać się ze stanem świata — wtedy czerwień jest sygnałem,
że świat odszedł od decyzji, i to jest jej zadanie. Liczba ze zbioru
rozjechać się **nie ma prawa** i jej rozjazd jest defektem strażnika, nie
sygnałem o świecie.

---

## Znane wystąpienia

Stan **2026-08-26**, commit `a316b53` (osiągalny). Liczby po prawej to
pomiar własny, nie przepisanie.

| adres | klasa | źródło | stan |
|---|---|---|---|
| `e2e/cennik.spec.ts` — etykiety `Cennik.tabela.*` | **ze zbioru** | `Object.keys(messages.Cennik.tabela)` = **14** | ✅ **NAPRAWIONE** (`WWW/028`): zbiór czerpany ze źródła, 11 sprawdzanych + 3 wyłączone jawnie i z powodem, dwa strażniki pilnują samego podziału. Dowód: ślepota starego obok wzroku nowego na tym samym wejściu |
| `e2e/zlozenie.spec.ts:226` — `toHaveCount(6)` | **ze zbioru** | `Obawy.p*` = **6** | ⚠ literał; **zgodny dziś** (6 = 6). Siódma para obaw przejdzie niezauważona |
| `e2e/hero.spec.ts:59` — `toHaveCount(2)` | **ze zbioru** | `Hero.potwierdzenie*` = **2** | ⚠ literał; **zgodny dziś** (2 = 2). Trzecie potwierdzenie przejdzie niezauważone |
| `e2e/zlozenie.spec.ts:170` — `toHaveCount(3)` | **nieustalona** | ⚠ **źródła nie ustaliłem** | ⚠ nie badane — polecenie `WWW/030`: *„nie badaj teraz; wiersz do mapy"* |
| `e2e/zlozenie.spec.ts:194` — `toHaveCount(3)` | **nieustalona** | ⚠ **źródła nie ustaliłem** | j.w. |
| `e2e/rejestr-mapy.spec.ts:69` — `toBe(8)` | **z decyzji** | **DECYZJA F4-5**, wypisana w komentarzu przy asercji | ✅ **poprawne jak jest** — literał z odesłaniem do decyzji, zadeklarowany niezmiennik, **nie dryf** |

**Rozjazd z torem 9, otwarty.** Tor 9 opisuje `toHaveCount(6)` jako stojące
**przy siedmiu parach obaw**; pomiar po tej stronie daje **sześć** kluczy
`Obawy.p*`, czyli zgodność. Zgłoszone, **nie przyjęte** — właściciel skierował
pytanie o pomiar źródłowy do toru 9 (`WWW/030`). Do czasu odpowiedzi **szóstka
stoi i nic się nie zmienia**.

---

## Czego ta mapa NIE zawiera — granica zadeklarowana wprost

**Nie jest wynikiem przeszukania całego repozytorium.** Wystąpienia zebrano
przy okazji jednego zadania (`WWW/028`), heurystyką `toHaveCount(<literał>)`
i `toBe(<literał>)` w katalogu `e2e/`. **Nie przeszukano**: `src/`,
`scripts/`, asercji zapisanych inaczej niż literałem (zmienna, stała,
wyrażenie), ani żadnej innej klasy wad poza liczebnością.

**Wniosek, który z tego wynika i który trzeba czytać razem z tabelą:** brak
adresu w tej mapie **nie znaczy, że go nie ma** — znaczy, że nikt tam nie
patrzył. Mapa pokrycia, która nie mówi, czego nie pokrywa, sama jest tą
klasą wady, którą opisuje.

---

## Jak dopisywać

Nowa klasa dostaje własny rozdział z pytaniem rozstrzygającym („jak odróżnić
ją od sąsiedniej") i tabelą wystąpień. Każde wystąpienie niesie **adres
z numerem linii**, **klasę**, **źródło albo jawne „nieustalone"** i **stan**.
Liczby pochodzą z pomiaru wykonanego przy dopisywaniu, nie z pamięci ani
z przepisania — i tak samo jak wszędzie indziej niosą **datę i osiągalny
commit** (`git merge-base --is-ancestor <skrót> HEAD`).
