# MATERIAŁ `RECZ-250` — brakujące klucze pustostanu `Cennik.*` (pl / en / de)

**Status: PRZYGOTOWANIE, NIE ZAPIS.** Zlecenie TOR9/023: *„przygotuj treść
brakujących kluczy pustostanu `Cennik.*` […] commit na stronę pójdzie po aplikacji
bundla, nie przed"*. **Nic z tego nie jest w `src/i18n/messages/`.**

---

## 1. DLACZEGO TE KLUCZE MAJĄ POWSTAĆ NIEZALEŻNIE OD MIGRACJI

**Zmierzone (R-H — komenda i wynik):** spłaszczenie `src/i18n/messages/pl.json`
po prefiksie `Cennik.` daje **50 kluczy**; filtr po
`pust|brak|niedost|błąd|nie ma|wkrótce|chwilowo|spróbuj` w kluczu i wartości daje
**ZERO trafień**.

> ## **Strona nie ma czym powiedzieć „tu nic nie ma".** Klientka na rynku EUR
> ## dostaje **pustkę bez zdania** — a pustka bez zdania czyta się jako
> ## „produkt zepsuty", nie jako „ten rynek jeszcze nie ma cen".

To jest brak **po mojej stronie** i istnieje **niezależnie** od tego, czy migracja
`20260814210000_ceny_per_waluta` wejdzie na produkcję: **każdy przyszły powód
pustej siatki** (nowy rynek, awaria odczytu, waluta bez planów) trafi w to samo miejsce.

---

## 2. OGRANICZENIA, W KTÓRYCH TO PISAŁEM

| zakaz | jak go trzymam |
|---|---|
| presja czasu, sztuczny niedobór, fałszywa pilność | **brak jakiegokolwiek terminu i słowa „wkrótce"** |
| obietnica wyniku lub dochodu | zdanie nie obiecuje, że ceny się pojawią |
| przesadzona korzyść | nie ma korzyści — jest stan i droga |
| **ADR-018** — obietnica bez pokrycia jest naruszeniem po stronie strony | **komunikat pustostanu nie jest obietnicą, jest granicą**; nie zapowiada funkcji |
| rejestr tonu `/cennik` | wzorzec sąsiadów: `potwierdzenie1` „Rezygnacja w każdej chwili", `naglowek` „Plany różnią się zakresem, nie obietnicami" — **zdania krótkie, bez wykrzykników, druga osoba** |

**Świadomie NIE piszę „wkrótce dodamy".** To jest obietnica terminu bez pokrycia —
dokładnie ta klasa, którą tor 9 usuwa ze strony, a nie wprowadza.

---

## 3. PROPOZYCJA — trzy klucze, trzy języki

Nazwy w konwencji pliku (camelCase, gniazdo `Cennik.`):

### `Cennik.pustaSiatka.naglowek`

| | |
|---|---|
| **pl** | `Nie mamy jeszcze cen w tej walucie` |
| **en** | `We don’t have prices in this currency yet` |
| **de** | `Für diese Währung haben wir noch keine Preise` |

### `Cennik.pustaSiatka.tresc`

| | |
|---|---|
| **pl** | `Plany i ich zakres są takie same wszędzie — brakuje wyłącznie cennika dla twojej waluty. Napisz do nas, a powiemy ci, co się zmieni dla twojego rynku.` |
| **en** | `The plans and their scope are the same everywhere — only the price list for your currency is missing. Write to us and we’ll tell you what changes for your market.` |
| **de** | `Die Pläne und ihr Umfang sind überall gleich – es fehlt nur die Preisliste für deine Währung. Schreib uns, und wir sagen dir, was sich für deinen Markt ändert.` |

### `Cennik.pustaSiatka.dzialanie` *(etykieta odsyłacza do `Stopka.kontakt`)*

| | |
|---|---|
| **pl** | `Napisz do nas` |
| **en** | `Write to us` |
| **de** | `Schreib uns` |

---

## 4. DLACZEGO TAK, ZDANIE PO ZDANIU

**„Nie mamy jeszcze cen w tej walucie"** — mówi **stan**, nie awarię. Podmiotem jest
Catherly („nie mamy"), nie klientka i nie strona. **„Jeszcze"** jest tu granicą stanu,
a nie obietnicą terminu — nie niesie daty ani zobowiązania.

**„Plany i ich zakres są takie same wszędzie"** — zdejmuje najgorszy możliwy odczyt
pustki: *„na moim rynku produkt jest okrojony"*. To jest **prawda pokryta** — zakres
planów nie zależy od waluty (`PLAN_LIMITS` jest jedną stałą, bez wymiaru waluty).

**„brakuje wyłącznie cennika dla twojej waluty"** — nazywa brak **wąsko i dokładnie**.
Zgodne z R-G: granica przed korzyścią.

**„Napisz do nas, a powiemy ci, co się zmieni dla twojego rynku"** — droga wyjścia
zamiast ślepego ekranu. **Obiecuje odpowiedź, nie cenę** — a odpowiedź ma pokrycie,
bo jej udziela człowiek.

**Czego tu nie ma i celowo nie będzie:** żadnego „przepraszamy", żadnego
„pracujemy nad tym", żadnego „spróbuj później". Pierwsze przeprasza za stan, który
nie jest winą czytelniczki; dwa pozostałe są obietnicami bez pokrycia.

---

## 5. CO TE KLUCZE ZROBIĄ BRAMKOM — wypisane, nie łatane

| bramka | co się stanie |
|---|---|
| `parytet-kluczy-i18n` | **przejdzie** — trzy klucze dodane w trzech językach naraz |
| `bramka:parytet` (`check-parytet.mjs`) | **przejdzie** — porównuje drzewa plików |
| strażnicy znak-w-znak `messages` ↔ `content/*/*.md` | **ZAPYTAJĄ**, jeśli `/cennik` ma stronę treści z listą kluczy. **Nie sprawdziłem tego** — patrz R-D niżej |
| `lint-liczby.mjs` | nie dotyczy — w tych trzech ciągach **nie ma liczby** |
| `bramka:deklaracje` | **policzy trzy nowe deklaracje długości**; ŻÓŁTA, więc nie zablokuje |

---

## 6. CZEGO NIE ROZSTRZYGAM (R-D)

1. **Nie sprawdziłem, czy `/cennik` ma odpowiednik w `content/{pl,en,de}/cennik.md`
   wymagający równoległego dopisania** — sprawdzenie jest jednym `grep`, ale robię je
   dopiero przy zapisie, bo dziś zapisu nie ma.
2. **Nie wiem, w którym komponencie ma się pojawić warunek pustej siatki.** To jest
   `src/`, czyli kod — poza moim zakresem i poza zakresem zlecenia.
3. **Nie wiem, czy pusta siatka to jedyny objaw.** `RECZ-250` mówi o siatce planów;
   czy tabela porównawcza pod nią też jest pusta na rynku EUR — **nie zmierzone**.
4. **Nazwa gniazda `pustaSiatka` jest moja.** Jeśli w projekcie istnieje konwencja
   nazw stanów pustych, wygrywa konwencja.
