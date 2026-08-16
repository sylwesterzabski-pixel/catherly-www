# Przekazanie zrzutów Z6 do strony produktowej

Cztery kadry czterech filarów Catherly, zwolnione przez właściciela 2026-08-14 do publikacji.
Review produktowe odbywa się na żywej aplikacji przy wielkim przeglądzie — **nie na tych kadrach**.

---

## Co tu jest

| Plik | Filar | Trasa w aplikacji |
| ---- | ----- | ----------------- |
| `z6-filar-1-dmo.png` | Rytm dnia | `/dmo` |
| `z6-filar-2-tarcza.png` | Zgodność | `/etyka/shield` |
| `z6-filar-3-pierwsze-90-dni.png` | Wdrożenie | `/first90` |
| `z6-filar-4-wrapped.png` | Podsumowanie | `/magic/wrapped` |

Wymiar źródłowy: **2048 × 1280** (16:10), viewport 1280 × 800 przy skali 1,6.
Pochodzenie każdego kadru — commit aplikacji, seed, konto, warunki oczekiwania — w pliku
`RAPORT-POCHODZENIA-<commit>.md` obok.

---

## Co robi strona www, a czego nie robi

**ROBI — konwersja formatów po swojej stronie.** PNG to format ŹRÓDŁOWY, nie docelowy. Strona
generuje z niego AVIF i WebP z zapasowym PNG, w wariantach szerokości pod `srcset`. Sugerowane
punkty: 2048 (źródło, ekrany o wysokiej gęstości), 1280, 768, 480.

**ROBI — rezerwacja miejsca.** Każde osadzenie podaje `width`/`height` albo `aspect-ratio 16/10`.
Bez tego układ skacze po dociągnięciu obrazu. To nie jest teoria — w samej aplikacji zmierzono
dokładnie ten defekt na publicznych mikro-landingach (`docs/AUDYT_BLOK3_ZNALEZISKA.md:442`),
gdzie logo szło surowym `<img>` bez rezerwacji i psuło CLS. Nie powtarzajmy tego na stronie,
która ma sprzedawać.

**ROBI — tekst alternatywny opisujący FUNKCJĘ, nie wygląd.** „Dzienny plan działania z pięcioma
licznikami postępu", nie „zrzut ekranu aplikacji".

**NIE ROBI — retuszu.** Zero domalowywania, zero podmiany liczb, zero czyszczenia interfejsu.
Kadry powstały pod regułą ADR-011: ekran pokazuje to, co aplikacja renderuje naprawdę. Jedyna
ingerencja przy powstawaniu to wyciszenie animacji (`animation-duration: 0`), żeby ten sam ekran
dawał ten sam plik przy każdym uruchomieniu — nie zmienia to tego, co widać.

**NIE ROBI — kadrowania zmieniającego wymowę.** Przycięcie do proporcji strony jest w porządku.
Przycięcie usuwające element, który świadomie znalazł się w kadrze albo świadomie z niego zniknął
— nie. Przykład: w kadrze Wrapped **nie ma slajdu CC ani poziomu kariery** i to jest decyzja
właściciela, a nie przypadek. Slajd CC nie został wykadrowany — on w ogóle nie powstał, bo dane
kompensacyjne celowo nie zostały zasiane. Kadrowanie nie może tego stanu odwrócić ani zasugerować.

**NIE ROBI — dopisywania podpisów obiecujących wynik.** Materiał pokazuje narzędzie, nie rezultat
finansowy. Podpisy typu „zarabiaj więcej dzięki…" są dokładnie tym, co blokuje Tarcza z kadru nr 2.

---

## Dane na kadrach

Konto demonstracyjne **„Demo Admin"**, baza efemeryczna postawiona wyłącznie na czas sesji
i skasowana po niej. Zero danych rzeczywistych osób. Nie dosiewano kontaktów z imionami — żaden
z czterech kadrów ich nie potrzebuje, a każdy dodany rekord to kolejna szansa, że coś
niepożądanego wejdzie na publikowany obraz.

Liczby na licznikach są częściowe i zróżnicowane (2/3, 3/5, 6/10), nie wyzerowane i nie na 100 %.
Komplet odhaczony wygląda na sfabrykowany, a pusty nie pokazuje funkcji.

---

## Jak odtworzyć kadry

W repozytorium aplikacji (`fbo-os`), po `pnpm install`:

```bash
pnpm exec tsx scripts/zrzuty/baza-jednorazowa.ts --trzymaj   # baza efemeryczna na :5433
# w drugim oknie, z DATABASE_URL wskazującym na powyższą bazę:
pnpm exec prisma migrate deploy && pnpm exec tsx prisma/seed.ts
pnpm exec tsx scripts/dev-seed-account.ts
pnpm exec tsx scripts/zrzuty/dane-demo.ts
pnpm dev -p 3100
ZRZUTY_URL=http://localhost:3100 ZRZUTY_KATALOG=/tmp/zrzuty-www \
  pnpm exec tsx scripts/zrzuty/sesja.ts
```

Sesja sama weryfikuje wymiar zapisanego pliku i przerywa, jeśli się nie zgadza — deklaracja
w kodzie nie wystarcza za dowód.

---

## Integralność

`SUMY-KONTROLNE.sha256` — suma SHA-256 każdego PNG. Weryfikacja po przeniesieniu plików:

```bash
shasum -a 256 -c SUMY-KONTROLNE.sha256
```

Jeśli któraś suma się nie zgadza, plik został po drodze przekonwertowany albo zmodyfikowany —
wtedy **nie publikuj go**, tylko poproś o ponowną dostawę. Konwersja do AVIF/WebP odbywa się
po stronie strony **z tego źródła**, nie z pliku o innej sumie.

W paczce jest **dokładnie jeden** raport pochodzenia. Gdyby kiedyś pojawiły się dwa, znaczy to,
że wymieszały się dostawy z różnych commitów — wtedy obowiązuje ten, którego suma zgadza się
z plikami.

## Uwaga o aktualności

Kadry są zrzutem stanu aplikacji z konkretnego commita, podanego w raporcie pochodzenia. Gdy
zmieni się zachowanie fotografowanej funkcji, kadr trzeba **odtworzyć, a nie poprawić w grafice**.
Zdarzyło się to już raz: dopisanie frazy do taksonomii Tarczy zmieniło jej wynik i kadr nr 2
został wykonany ponownie tego samego dnia.
