# ADR-068 — odwołanie ramy hero i parallaxu kadru

- Status: PRZYJĘTY
- Data: 2026-09-06
- Zlecenie: `WWW/094` (wymóg końcowy: „ADR odwołujący ramę/parallax, jeśli ich nie ma")
- Odwołuje: ADR-063 §4 (parallax kadru hero) i ramę slotu hero z ADR-048
- Nie rusza: ADR-063 §5 (warstwa ruchu wejść i kart) — ta żyje i działa

## 1. Co się stało

ADR-063 wprowadził parallax kadru hero: obraz wyższy od ramy o podwojony
zakres ruchu, przesuwany animacją `kadrHeroParallax` po osi
`scroll(root block)`, w trzech warstwach zabezpieczenia (`@supports`,
`prefers-reduced-motion`, powiększenie wewnątrz obu warunków).

Trzy zlecenia później hero zostało przebudowane dwukrotnie — ADR-066
odwrócił paletę, a `WWW/093/2` wymienił zawartość hero na dwa kadry
z manifestu bitmap, wtapiane maską radialną, **bez ramy**. Rama zniknęła
razem ze slotem `.kadr`, a parallax celował właśnie w `.kadr img`.

Reguły zostały wtedy **oznaczone jako martwe**, nie usunięte — świadomie:
usuwanie stu kilkudziesięciu linii z komentarzami nie jest zmianą, którą
wolno robić przy okazji innej zmiany, a martwa reguła OZNACZONA nie
wprowadza w błąd, w przeciwieństwie do martwej reguły milczącej (klasa
T56). Warunkiem zamknięcia był „osobny przebieg porządkowy razem
z decyzją, czy parallax ma wrócić na nowy slot". **Ten ADR jest tym
przebiegiem i tą decyzją.**

## 2. Dowód, że reguły są martwe — pomiar, nie lektura

Sonda na wyrenderowanej stronie (`/`, kadr 1440 × 900, wydanie
`WWW_DIST=.next-pomiar`, 2026-09-06):

| co | ile |
| --- | --- |
| `[class*="Hero_kadr__"]` | **0** |
| `[class*="Hero_kadr__"] img` (cel parallaxu) | **0** |
| elementy z `animationName` zawierającym `kadrHeroParallax` | **0** |

**Kontrola pozytywna w tym samym przebiegu** — bez niej trzy zera
mierzyłyby sondę, nie stronę:

| co | ile |
| --- | --- |
| `[class*="Hero_bohaterka__"]` | 1 |
| `[class*="Hero_telefon__"]` | 1 |
| elementy z JAKĄKOLWIEK animacją | 32 |

Sonda widzi elementy hero i widzi animacje. Zera są własnością strony.

## 3. Decyzja

1. **Rama hero nie wraca.** Wzorzec finalny nie obrysowuje kadru hero —
   obraz wtapia się w tło. Rama była własnością poprzedniego wzorca
   (React Bits, 16 px — ADR-063 §1.2) i odeszła razem z nim.
2. **Parallax nie wraca na nowy slot.** Powód nie jest wygodą: zakres
   ruchu 3 % **nigdy nie był miarą wzorca** — token `zasieg-parallaxu-hero`
   nosi w komentarzu zdanie, że jest wyborem wykonawcy, bo pomiar
   pokazał, że React Bits reklamuje parallax, którego nie ma
   (ADR-063 §1.1, trzy sondy, kontrola pozytywna w każdej). Wzorzec
   finalny też go nie ma. Ruch bez pokrycia w żadnym z dwóch wzorców
   nie ma po co wracać.
3. **Reguły i token schodzą z kodu**, bo dopiero teraz jest decyzja,
   która to uzasadnia. Usunięte:
   - `Hero.module.css`: blok `@supports (animation-timeline: scroll())`
     z regułą `.kadr img` i `@keyframes kadrHeroParallax`,
   - martwe reguły ramy `.kadr`, `.kadr picture`, `.kadr img`,
   - `design/tokens.json`: `ruch.zasieg-parallaxu-hero`.

## 4. Czego ten ADR NIE odwołuje

Warstwa ruchu z ADR-063 §5 — wejścia (`ruch-stagger`, `ruch-wsuniecie-karty`),
czasy, krzywe i opóźnienia — **żyje i jest używana**: sonda naliczyła
32 elementy z animacją. Odwołanie dotyczy WYŁĄCZNIE parallaxu kadru hero
i ramy tego kadru. Mieszanie tych dwóch rzeczy byłoby dokładnie tym
rozszerzeniem zakresu, którego zakaz 8 zabrania.

## 5. Ślad wartości

Ten ADR jest przypadkiem klasy **T56** zamkniętym poprawnie: martwa
deklaracja została najpierw OZNACZONA (żeby nie myliła), potem
UDOWODNIONA pomiarem z kontrolą pozytywną, a dopiero na końcu usunięta
razem z decyzją, która mówi, że nie wróci. Kolejność ma znaczenie:
usunięcie bez decyzji zostawiłoby pytanie „a miało wrócić?" w cudzej
głowie, a oznaczenie bez usunięcia zostawiłoby sto linii, które następny
czytający musi przeczytać, żeby dowiedzieć się, że nie działają.
