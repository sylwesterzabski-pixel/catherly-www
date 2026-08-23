# catherly-www — zasady dla agentów

## ZANIM COKOLWIEK ZROBISZ — przeczytaj przekazanie sesji
`docs/PRZEKAZANIE-SESJI.md` — stan repozytorium, commity czekające na zgodę
właściciela, otwarte decyzje i pułapki, na których poprzednie sesje już się
przewróciły. Rozdział 0 tego pliku mówi, co zrobić w pierwszej kolejności.
Ten plik (`CLAUDE.md`) mówi, jak wolno pracować; tamten mówi, **gdzie praca
stanęła**. Bez obu naraz zaczniesz od pomyłki, którą ktoś już popełnił.
Przekazanie **utrzymujesz w prawdzie na bieżąco** — zasady na końcu tego
pliku („Przekazanie sesji aktualizowane na bieżąco").

## Kim jesteś w tej sesji
Pełnisz dokładnie jedną rolę: treść / projekt / obrazy / implementacja /
bramkarz / adwersarz. Jeśli rola nie została wskazana — zapytaj i nie rób nic.

## Hierarchia źródeł reguł (T32 — właściciel 2026-08-23)
Kolejność od nadrzędnego — przy konflikcie wygrywa źródło wyższe:
1. **ADR** (`docs/adr/`) — decyzje architektoniczne, wiążą wszystko poniżej.
2. **CLAUDE.md** (ten plik) — kanon operacyjny repozytorium, czytany na
   starcie sesji.
3. **Rejestr warunków powrotu** (`docs/faza-2/rejestr-warunkow-powrotu.md`)
   — pozycje z warunkami powrotu, nie reguły.
4. **Przekazanie sesji** (`docs/PRZEKAZANIE-SESJI.md`) — stan repozytorium,
   nie reguły.
5. **Dokumenty paneli** (`docs/faza-*/`) — historia rozstrzygnięć, nie
   źródło reguł.

Przy równym poziomie wygrywa nowsze, ale **rozjazd między dokumentami tego
samego poziomu zgłaszasz, nie rozstrzygasz po cichu**. Brak miejsca
`CLAUDE.md` w hierarchii był sam w sobie wadą (T32) — ten rozdział ją
zamyka.

## Zakazy bezwzględne
- Żadnych wzmianek o konkretnych firmach z branży, logotypów, twarzy osób.
  Przykłady w UI: neutralne, wymyślone nazwy.
- Żadnych zmyślonych liczb, opinii, klientek. Każda liczba pochodzi
  z content/facts.json — literalna liczba w JSX nie przejdzie lintera.
- Żadnych wartości wizualnych spoza design/tokens.json. Potrzebujesz nowej —
  zaproponuj ADR, nie wyjątek.
- Żadnych grafik udających interfejs aplikacji. Zrzuty produktu robi
  wyłącznie Playwright na danych demo.
- Żadnych ciemnych wzorców: brak wymuszania rejestracji, pop-upów,
  liczników pilności, ukrytych cen. Odrzucenie ciasteczek = 1 kliknięcie.
- Nie pushuj do main. Kończysz pracę wyłącznie przez PR z zielonymi bramkami.
- Main zawsze zielony — żaden merge do main nie przechodzi przy czerwonej
  bramce, bez wyjątków (ADR-020). Czerwień uzasadniona też jest czerwienią.
- Nie oceniasz własnej pracy i nie osłabiasz testów, żeby przeszły.

## Prymat nieodwracalnego (ADR-018 — nadrzędne wobec wszystkiego poniżej)
Cztery obszary mają pierwszeństwo przed wyglądem, zakresem i terminem:
dane · pieniądze · bezpieczeństwo · obietnice. Zasady obowiązujące zawsze:
- Brak dowodu = brak zabezpieczenia. Kod, który wygląda poprawnie, ma
  status niesprawdzony, a niesprawdzony liczy się jak niedziałający.
- Strażnik może ZERODOWAĆ przez zmianę OTOCZENIA, bez zmiany własnego
  kodu. Asercja na podciągu globalnego artefaktu (`toContain` na całym
  HTML, grep po całym repo) wygasa w chwili, gdy szukany ciąg staje się
  wszechobecny — i wygasa CICHO, zostając zielona. Zanim dopiszesz ciąg
  do elementu współdzielonego (stopka, nagłówek, layout), sprawdź, kto
  dziś asertuje ten ciąg globalnie; jeśli ktoś asertuje, przepisz jego
  asercję na lokator celujący w konkretny element (`href`, rola, sekcja),
  zanim dopiszesz. Zielona bramka po Twojej zmianie nie jest dowodem, że
  nadal mierzy to samo — dowodem jest MUTACJA: zepsuj celowo to, czego
  strażnik pilnuje, i pokaż czerwień.
- KONTROLA NEGATYWNA W TYM SAMYM PRZEBIEGU. Pomiar, który ma dowieść
  naprawy, niesie obok wartości PO naprawie wartość, jaką dałby stan
  SPRZED niej — policzoną w tym samym przebiegu, tym samym kodem, na tym
  samym otoczeniu. Sama wartość po naprawie nie dowodzi niczego: nie
  odróżnia „naprawione" od „nigdy nie było zepsute" ani od „mierzę nie
  to, co trzeba". Kontrola liczona osobno, z pamięci albo z wcześniejszego
  przebiegu, nie liczy się — ma dzielić z pomiarem wszystko poza samą
  naprawą. Wzorzec (A1, 2026-08-19): etykieta CTA 7,02:1 po naprawie
  i 1,34:1 w barwie, którą narzucał `a:hover` przed nią, obie liczby
  z jednego przebiegu i z jednego kodu. To druga strona mutacji: mutacja
  pokazuje, że strażnik zapala się na defekcie; kontrola negatywna
  pokazuje, że pomiar w ogóle widzi defekt.
- KAŻDA LICZBA Z POMIARU NIESIE DATĘ I COMMIT POMIARU. Liczba wpisana do
  dokumentu bez tych dwóch rzeczy udaje fakt, a jest migawką stanu, który
  od tamtej pory mógł urosnąć albo zniknąć. Przykład, który to wymusił
  (T15): „data cofnięta → 45 naruszeń" zmierzone 2026-08-17 dawało tej
  samej mutacji **77** dwa dni później, bo osłaniany blok urósł. To ta
  sama rodzina co nieaktualny raport audytu — nieaktualność artefaktu daje
  fałszywy spokój — z jedną różnicą: raportu pilnuje bramka, a pojedynczej
  liczby w prozie nie pilnuje nic poza tą regułą. Commit w stemplu musi być
  OSIĄGALNY z gałęzi w chwili zapisu, a nie ten, który istniał w chwili
  pomiaru: `git commit --amend`, `rebase` i `squash` przepisują skróty, więc
  stempel postawiony przed nimi wskazuje w pustkę i sam staje się tym, przed
  czym ta reguła chroni. Sprawdzenie kosztuje jedno polecenie:
  `git merge-base --is-ancestor <skrót> HEAD`. Wychwycone 2026-08-19 na
  pierwszej liczbie objętej tą regułą (T15 stemplowany `72f664a` po amendzie
  na `a826464`; drzewo identyczne, skrót martwy).
- KLASA „ODWOŁANIE DO STANU, KTÓRY PRZESTAŁ ISTNIEĆ" (właściciel,
  2026-08-19). Zasięg szerszy niż stemple przy liczbach: **każde** odwołanie
  do commita zapisane w dokumencie — stempel pomiaru, wpis rejestru,
  adnotacja przy decyzji, nagłówek raportu — musi być osiągalne z gałęzi
  w chwili zapisu. Amend, rebase i squash przepisują skróty BEZ OSTRZEŻENIA,
  a dokument zostaje ze skrótem widmem: wygląda na udowodniony i nie jest,
  bo nie ma już czego odtworzyć spod tego skrótu. Sprawdzenie:
  `git merge-base --is-ancestor <skrót> HEAD`. Sprawdzasz OSIĄGALNOŚĆ,
  nie istnienie obiektu — obiekt z reflogu istnieje na Twoim dysku i zniknie
  na czystym klonie, więc `git cat-file -t` daje tu fałszywą zieleń.
  Rodzina: `RECZ-286` w projekcie aplikacji („narzędzie potwierdza
  poprawność artefaktu, którego nie da się użyć" — suma kontrolna dowodzi,
  że plik się nie zepsuł, nie że da się wrócić); pełny opis poza tym
  repozytorium, w `fbo-os/docs/ZADANIA_RECZNE.md`.
- SKAŻENIE POMIARU SPRAWDZA SIĘ WSTECZ (właściciel, 2026-08-19). Gdy
  wychodzi na jaw, że pomiar był skażony, nie kończysz na tym pomiarze:
  sprawdzasz, czy przyczyna skażenia nie sięgała wcześniejszych, w tym
  ZIELONYCH. Zieleń sprzed skażenia nie jest automatycznie czysta.
  Wzorzec (T22): dwa zadania wydajności mierzyły ten sam alias przez
  5 min 32 s. Łatwo było poprzestać na „drugi pomiar skażony" — ale
  strażnik prowieniencji sprawdzał wydanie tylko na starcie, więc
  późniejsze przebiegi TAMTEGO, zielonego zadania mogły mierzyć już
  wdrożenie drugiego commita. Skażenie było wzajemne, więc unieważnia
  obie liczby, nie jedną. Zieleń jest wygodniejsza i dlatego łatwiej ją
  przeoczyć — reguła istnieje po to, żeby to przeoczenie kosztowało
  jedno sprawdzenie, a nie fałszywy punkt odniesienia na tygodnie.
- RAPORT, KTÓREGO NIKT NIE CZYTA, PRZESTAJE BYĆ RAPORTEM (właściciel,
  2026-08-19). Ostrzeżenie wypisane w miejscu, do którego nikt nie
  zagląda, działa jak jego brak — z jedną różnicą na gorsze: pozwala
  potem powiedzieć „przecież było napisane". Wzorzec (T22): linijka
  „rozrzut większy niż zapas" stała w logu od 2026-08-16 i była wypisana
  dla `/` w OBU przebiegach doby 2026-08-19, także w ZIELONYM — nikt jej
  nie przeczytał, bo siedziała w kilkuset linijkach logu zielonego
  zadania. Jeśli ostrzeżenie ma znaczyć, dostaje własny kod wyjścia
  i własne miejsce w interfejsie (adnotacja przebiegu, podsumowanie),
  a nie kolejną linię logu. Rodzina: nieaktualny raport audytu.
- KLASA „WYGLĄDA NA REGUŁĘ WERDYKTU PRZY POBIEŻNYM CZYTANIU" (właściciel,
  2026-08-23). Ustawienie w pliku konfiguracyjnym, które **nazywa się** tak
  jak reguła rozstrzygająca, a nią nie jest, kosztuje więcej niż jego brak:
  czytający wyciąga wniosek „to już jest zrobione" i przestaje szukać.
  Wzorzec: `aggregationMethod: 'pessimistic'` w `lighthouserc.cjs:200`.
  Ścieżka bramki (`npm run bramka:pomiar`) podaje do `lhci assert` **jeden
  przebieg na trasę** (`scripts/werdykt-po-lcp.mjs`), a przy jednym
  przebiegu każda agregacja daje tę samą liczbę — ustawienie działa dopiero
  poza bramką. Skutek jest kierunkowy: kto oprze na nim plan naprawy
  rozrzutu, uzna połowę roboty za wykonaną, choć nie jest. Reguła: **zanim
  powiesz „konfiguracja to załatwia", prześledź ścieżkę wykonania do
  miejsca, gdzie zapada werdykt.** Rodzina: „brak dowodu = brak
  zabezpieczenia", bo tu też mamy przekonanie zamiast odczytu.
- DOKUMENT Z ZADEKLAROWANYM ZAKRESEM SIĘ NIE STARZEJE — STARZEJE SIĘ CYTAT
  WYJĘTY Z NIEGO BEZ ZAKRESU (2026-08-20, T26). Odwrotność klasy
  „odwołanie do stanu, który przestał istnieć": tam przeterminował się
  dokument, tu przeterminowuje się czytelnik. Zanim nazwiesz liczbę
  w cudzym dokumencie nieaktualną — przeczytaj jego nagłówek; zanim ją
  zacytujesz gdzie indziej — zabierz zakres razem z nią. To samo dotyczy
  **adresata**: adresat jest częścią zakresu, nie metadanymi, więc
  dokument wyjęty poza swojego adresata traci ważność tak samo jak cytat
  bez daty.
- KLASA „BRAMKA SZKODZĄCA PRZEZ POPRAWNOŚĆ" (właściciel, 2026-08-23).
  Pierwsza klasa z kierunkiem odwrotnym — wszystkie poprzednie opisują
  mechanizmy robiące za mało; ta opisuje mechanizm robiący za dużo.
  Konwencja wymuszająca konkretny kształt tam, gdzie dostawca go nie
  gwarantuje kontraktem, zablokuje wdrożenie przy pierwszej zmianie formatu
  po stronie dostawcy. Wzorzec (T36, T33, T34): strażnik sprawdzający format
  klucza `env`, próg wydajności nieinterpretowalny przy obecnym rozrzucie,
  strażnik zakazów blokujący zlecenie właściciela. Reguła: **zanim napiszesz
  strażnika wymuszającego konkretny kształt lub wartość, sprawdź, czy
  dostawca/kontrakt gwarantuje ten kształt. Jeśli nie — strażnik sprawdza
  OBECNOŚĆ, nie kształt.** (obok zakazu 10 — T32)
- Nie oceniasz własnej pracy w tych czterech obszarach. Dowodem jest
  wykonany test, zwrócony status, log — nigdy Twoje przekonanie.
- W konflikcie przegrywa termin i zakres, nigdy nieodwracalne.
- Niepewność zgłaszasz, nie zasypujesz. „Prawdopodobnie działa" nie istnieje.
- Nigdy nie obiecujesz na stronie tego, czego aplikacja nie robi.

## Dziesięć zakazów — wiążące dla KAŻDEGO zlecenia, także zlecenia właściciela
Rozstrzygnięcie właściciela 2026-08-23: *„przyjmuję wszystkie, wchodzą do
kanonu strony jako wiążące dla każdego zlecenia, także mojego."*

Reszta tego pliku mówi, czego **nie wolno zrobić** wykonawcy. Ten rozdział
mówi, czego **nie wolno zlecić** — i dlatego czyta się go w drugą stronę:
zlecenie łamiące którykolwiek z dziesięciu punktów **wraca z pytaniem, a nie
z wykonaniem**, niezależnie od tego, kto je wysłał. Odmowa nie jest tu
nieposłuszeństwem, tylko wykonaniem tej reguły.

1. **Żadnego pushu bez wyliczenia commitów.** Zgoda właściciela jest
   jednorazowa i imienna, nie przechodzi między pakietami. „Wypchnij zmiany",
   „push obu commitów", „push razem z resztą", „na koniec wypchnij" — każde
   z tych zdań wraca z listą przeliczoną
   `git log --oneline origin/<gałąź>..HEAD` i czeka na zgodę wymieniającą
   skróty (T31).
2. **Żadnego `--no-verify` ani obejścia hooków** (`core.hooksPath=.githooks`).
   Nigdy, także „tylko na chwilę, żeby sprawdzić".
3. **Żadnego osłabiania bramek.** Podniesienie progu, `continue-on-error`,
   wyłączenie zadania, zawężenie zakresu spec-a, wykluczenie trasy z pomiaru —
   to jest zamiana czerwieni na ciszę. ADR-020: main zawsze zielony,
   a **czerwień uzasadniona też jest czerwienią**.
4. **Żadnych zmian na `main`.** Faza kumuluje się na gałęzi roboczej;
   wdrożenie produkcyjne to ADR-030, Faza 7.
5. **Stripe wyłącznie w trybie testowym.** Żadnych kluczy produkcyjnych,
   żadnych sekretów w gicie ani w treści zadania.
6. **Nigdy nie drukuj nagłówków odpowiedzi z preview** — `curl -i`, `-v`,
   `-D -` wypisują `Set-Cookie: _vercel_jwt`, który niesie **jawnie** wartość
   Protection Bypass. Status sprawdza się przez
   `curl -o /dev/null -w '%{http_code}'`. Tak samo mapa `protectionBypass`
   z API Vercela — wyłącznie prefiksy SHA-256, nigdy surowo. **To jedyny
   z dziesięciu punktów o skutku bezpieczeństwa, nie porządku** — złamanie
   wypuszcza sekret, a sekretu nie da się cofnąć z logu przebiegu.
7. **Nie zabijaj procesu na porcie 3000.** Port sprawdza się `lsof -ti:3000`
   i **raportuje**; za tym procesem może stać praca właściciela.
8. **Żadnego „przy okazji napraw X".** Defekt spoza zakresu zadania trafia do
   `docs/faza-2/rejestr-warunkow-powrotu.md` jako pozycja z warunkiem powrotu,
   a nie do kodu. Naprawa bez zlecenia to zmiana, której nikt nie zamawiał
   i nikt nie sprawdzi.
9. **Żadnych treści ani liczb bez pokrycia.** Każda liczba pochodzi
   z `content/facts.json` (literalna liczba w JSX nie przejdzie lintera), każda
   wartość wizualna z `design/tokens.json`. Brak pokrycia → pozycja
   w rejestrze, nigdy wyjątek w kodzie.
10. **Nie mnóż źródeł reguł wiążących.** Nowy dokument z regułami wchodzi
    wyłącznie jako **ADR** albo jako **rozdział tego pliku** — nigdy jako
    kolejny plik obok. Rozjazd między dwoma źródłami reguł jest gorszy niż
    brak jednego z nich (T32).

**Punkty 9 i 10 właściciel wskazał jako celujące w jego własne zlecenia** —
i tak mają działać. Wykonawca, który je egzekwuje wobec zlecenia właściciela,
robi dokładnie to, po co ten rozdział powstał.

**Ten rozdział NIE MA STRAŻNIKA** i w całości mieć go nie może: punkty 1, 2,
6 i 7 są sprawdzalne mechanicznie w treści polecenia, punkty 3, 8, 9 i 10
wymagają oceny zamiaru. To jest ta sama klasa co T25 — „brak dowodu = brak
zabezpieczenia" stosuje się także do tej strony. Odnotowane jako **T34**;
budowa strażnika cząstkowego czeka na decyzję właściciela.

## Progi (bramki CI — blokujące)
LCP < 1,8 s · INP < 200 ms na 4G · CLS < 0,1 · kontrast AA wszędzie ·
pełna obsługa klawiaturą · treść czytelna bez JS · parytet pl/en/de ·
aktualny raport audytu nieodwracalnych przed wdrożeniem produkcyjnym.

## Źródła prawdy
Ceny: Stripe. Wygląd: design/tokens.json. Treść: content/{pl,en,de}.
Liczby: content/facts.json. Decyzje: docs/adr/. Sprzeczność między kodem
a źródłem prawdy = naprawiasz kod, nigdy źródło bez ADR.

## Styl pracy
Mobile-first od 390 px. Ruch tylko celowy, zawsze z prefers-reduced-motion.
Wątpliwość co do zasad → zatrzymaj się i zapytaj. Zgadywanie jest droższe.

## Backup po każdym zadaniu
Po każdym ukończonym zadaniu uruchamia się scripts/backup.sh — migawka
ZIP całego repo (z .git, bez node_modules) na zewnętrzny SSD; hook Stop
w ustawieniach Claude Code robi to automatycznie. Wynik raportujesz
krótko: nazwa pliku + rozmiar, albo „backup nieudany: <powód>".
Niepowodzenie backupu (dysk odłączony, brak miejsca, błąd zapisu)
zgłaszasz WYRAŹNIE i czekasz na decyzję właściciela — cichy brak backupu
jest gorszy niż jego brak, bo usypia czujność. Nie udajesz sukcesu.

**Kopie milowe (decyzja właściciela 2026-08-16).** Migawka oznaczona
przez właściciela jako kamień milowy NIE leży wśród migawek rotacyjnych.
Trafia do podfolderu `KAMIENIE-MILOWE/` w katalogu backupów na SSD
i nosi w nazwie `NIE-USUWAC`. Powód jest mechaniczny, nie porządkowy:
katalog rotacyjny ma dziś ponad 200 migawek i prędzej czy później ktoś
je posprząta wzorcem `catherly-www-*.zip`; kopia milowa ma być **poza
zasięgiem tego wzorca**, a nie tylko opatrzona prośbą w nazwie. Nazwa
chroni przed człowiekiem, katalog chroni przed globem — potrzebne są
obie warstwy. Po utworzeniu kopii milowej weryfikujesz ją tak samo jak
zwykłą (test integralności) i dodatkowo porównujesz sumę SHA-256
ze źródłem; przy przenoszeniu suma musi być ta sama przed i po.

## Przekazanie sesji aktualizowane na bieżąco (właściciel, 2026-08-20)
`docs/PRZEKAZANIE-SESJI.md` jest **jedynym kanonicznym przekazaniem** i ma
mówić prawdę o stanie CIĄGLE, a nie raz na koniec sesji. Drugiego pliku
przekazania nie zakładasz — dwa rodzą pytanie „który obowiązuje", czyli
defekt zamiast zabezpieczenia.

**Aktualizacja idzie W TYM SAMYM COMMICIE co zmiana, którą opisuje.**
To nie jest szczegół porządkowy, tylko cały mechanizm: „dopiszę
przekazanie osobnym commitem później" znaczy w praktyce „nigdy", bo
sesja kończy się na limicie kontekstu bez ostrzeżenia. Commit, który
zmienia stan repozytorium i zostawia przekazanie nieaktualnym, jest
niekompletny — tak samo jak commit z niezaktualizowanym rejestrem.

**Co sprawdzasz przed KAŻDYM commitem** (minuta, nie przegląd całości):
- rozdz. 1 — skróty, liczba niewypchniętych commitów, stan zdalny,
- rozdz. 7 — czy pozycja właśnie zrobiona nadal stoi jako „do zrobienia",
- rozdz. 9 — czy przewróciłeś się na czymś, co warto zapisać,
- rozdz. 15 — czy doszła pozycja rejestru,
- rozdz. 17 — czy zmieniłeś bramkę, trasę albo polecenie `npm`.

**Czego do tego pliku NIE wpisujesz, choć kusi:** wartości, które starzeją
się same przy każdym commicie — skrótu commita niosącego ten dokument
(commit nie może zawierać własnego skrótu; próba daje widmo) i nazwy
ostatniego backupu. Zamiast wartości wpisujesz polecenie, którym się ją
przelicza. Każda liczba i każdy skrót niesie datę i osiągalny commit —
reguła kanonu obowiązuje ten plik tak samo jak każdy inny.

Reguła nie ma dziś strażnika — pilnuje jej wyłącznie ten zapis, co jest
dokładnie klasą „brak dowodu = brak zabezpieczenia". Odnotowane jako
pozycja **T25** rejestru; budowa strażnika czeka na decyzję właściciela.
