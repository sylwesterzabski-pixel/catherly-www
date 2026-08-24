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

## Hierarchia źródeł reguł (T32 — właściciel, uzupełniona 2026-08-24)
**SIEDEM szczebli.** Kolejność od nadrzędnego — przy konflikcie wygrywa
źródło wyższe:
1. **ADR** (`docs/adr/`) — decyzje architektoniczne, wiążą wszystko poniżej.
   W obrębie ADR-ów **ADR-018 jest nadrzędny wobec pozostałych**.
2. **CLAUDE.md** (ten plik) — kanon operacyjny repozytorium, czytany na
   starcie sesji.
3. **`docs/STRATEGIA.md`** — CO robimy i DLACZEGO.
4. **`docs/PLAN.md`** — JAK, w sensie inżynierskim; wykonawczy wobec strategii.
5. **Rejestr warunków powrotu** (`docs/faza-2/rejestr-warunkow-powrotu.md`)
   — pozycje z warunkami powrotu, nie reguły.
6. **Przekazanie sesji** (`docs/PRZEKAZANIE-SESJI.md`) — stan repozytorium,
   nie reguły.
7. **Dokumenty paneli** (`docs/faza-*/`) — historia rozstrzygnięć, nie
   źródło reguł.

**Dlaczego kanon stoi NAD strategią** (rozstrzygnięcie właściciela
2026-08-24): strategia opisuje **CO** robimy, kanon opisuje **JAK** — a przy
sprzeczności wygrywa sposób pracy, nie zamiar. Zdanie o pierwszeństwie
strategii zostało z `docs/STRATEGIA.md` **wykreślone** i zastąpione
odesłaniem tutaj.

Przy równym poziomie wygrywa nowsze, ale **rozjazd między dokumentami tego
samego poziomu zgłaszasz, nie rozstrzygasz po cichu**. Brak miejsca
`CLAUDE.md` w hierarchii był sam w sobie wadą (T32) — ten rozdział ją
zamyka.

**Historia tego rozdziału jest jego własnym ostrzeżeniem.** Pierwsza wersja
(2026-08-23) wymieniała **pięć** źródeł i pomijała STRATEGIĘ oraz PLAN —
oba deklarowały wtedy własne pierwszeństwo, więc powstały dwie żywe,
sprzeczne deklaracje nadrzędności: dokładnie defekt, który ten rozdział miał
zamknąć, odtworzony szczebel wyżej. Wychwycone przez odczyt nagłówków, nie
z pamięci. Wniosek wiążący: **zanim wypiszesz zamkniętą listę źródeł,
policz je w repozytorium.** Lista podana z pola widzenia jest złym
podzbiorem, a zły podzbiór wygląda jak komplet.

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
- PYTANIE ZEROWE: **CZY TA RZECZ W OGÓLE ISTNIEJE** (właściciel, 2026-08-24).
  Zadaje się je **przed** wszystkimi pytaniami o zachowanie strażnika i
  **odpowiada na nie odczyt konfiguracji, nigdy mutacja**. Powód jest
  mechaniczny: mutacja sprawdza, czy mechanizm reaguje, gdy zniknie
  pilnowane zachowanie — a **mechanizmu, którego nie ma, nie da się
  zmutować**. Zestaw pytań o zachowaniu jest wobec nieistnienia ślepy i
  milczy dokładnie tak samo, jak przy strażniku sprawnym i niepotrzebnym.
  Wzorzec (T42): `CLAUDE.md` przez ponad dwieście migawek twierdził, że
  backup robi hak `Stop`; klucza `hooks` nie było w **żadnym** pliku
  konfiguracji. Trzy doby bez kopii minęły bez jednego sygnału. **Skutek
  widziany na dysku dowodzi, że COŚ go tworzyło — nie że tworzył go TEN
  mechanizm.** Praktycznie: zanim zaczniesz sprawdzać, czy zabezpieczenie
  działa, sprawdź poleceniem, czy jest — i zapisz, którym poleceniem.
  **PEŁNY ZESTAW — pytanie zerowe plus trzy o zachowaniu.** Trzy poniższe
  pochodzą **spoza tego repozytorium** (`P-22`): źródło — **tor 8, rejestr
  `B-16`/`B-17`, 2026-08-23**, podane przez właściciela 2026-08-24. **Drogi
  weryfikacji z tej strony nie ma**, bo to inne repozytorium; przepisane
  dosłownie z jego przekazu, nie z pamięci, i tak mają być czytane — jako
  wskazówka o rodowodzie, nie jako pomiar własny.
  - **0. Czy ta rzecz w ogóle ISTNIEJE** — dowód: **odczyt konfiguracji**.
    Pomiar własny (T42).
  - **1. Czy strażnik UMIE UPAŚĆ** — dowód: **zapłon na żywo**.
  - **2. Czy upada, GDY ZNIKNIE ZACHOWANIE** — dowód: **mutacja**. Zapłon
    tego nie dowodzi; dowodzi tylko, że strażnik umie upaść **na tym
    wejściu**.
  - **3. Czy upada WYŁĄCZNIE wtedy, kiedy trzeba** — **dowodu na to nie ma
    w repertuarze, po żadnej ze stron.** Strażnik czuły, trafny
    i nadgorliwy daje fałszywe alarmy i po tygodniu nikt go nie czyta.
    Ta luka jest zapisana jako luka, a nie zasypana — udawanie, że pytanie 3
    ma odpowiedź, byłoby dokładnie tym, przed czym broni reszta tego
    rozdziału.
  Kolejność ma znaczenie: **0 przed 1**, bo pytania 1–3 są wobec
  nieistnienia ślepe i milczą przy nim tak samo, jak przy strażniku sprawnym
  i niepotrzebnym.
- KLASA „DEFEKT KOPII UTRWALANY PRZY ODTWARZANIU" (właściciel, 2026-08-24).
  Wada archiwum nie zostaje w archiwum — **przenosi się do repozytorium przez
  ręce tego, kto z niego odtwarza**. Mechanizm: kopia różni się od oryginału
  w sposób, którego odtwarzający nie umie odróżnić od własnej pomyłki, więc
  albo szuka nieistniejącego błędu, albo „porządkuje" różnicę i **commituje
  defekt kopii jako zmianę w repozytorium**. Wzorzec (T43): `git status`
  w odtworzonym repo pokazuje `D .env.example` — zmianę, **której nikt nie
  wprowadził** — a widzi to człowiek po awarii, czyli w jedynej sytuacji,
  w której ktokolwiek sięga po backup, i w najgorszym możliwym momencie na
  zagadki. **Backup ma usuwać niepewność, a ten ją dokłada w chwili, gdy jest
  najdroższa.** Praktycznie: różnica między kopią a oryginałem musi być
  **zerowa albo udokumentowana** — kopia, o której trzeba pamiętać, czego jej
  brakuje, przenosi ten obowiązek na najgorszy moment.
- DWIE STRONY JEDNEGO WZORCA ROZBITE NA DWIE POZYCJE DAJĄ DWA ŁATWE
  ROZWIĄZANIA, KTÓRE SIĘ WYKLUCZAJĄ (właściciel, 2026-08-24). Gdy ten sam
  mechanizm **chroni i szkodzi naraz**, obie strony są jedną pozycją, nie
  dwiema. Rozbite: „nie gub śledzonych plików" ma oczywiste rozwiązanie
  (zawęź wzorzec), „nie kopiuj sekretów" ma oczywiste rozwiązanie (poszerz
  wzorzec) — a razem te dwa rozwiązania **znoszą się**. Zapisane osobno,
  każda pozycja wygląda na łatwą i **kusi do naprawy, która psuje drugą
  stronę, nie wiedząc o niej**. Wzorzec (T43): `-x ".env.*"` w
  `scripts/backup.sh`. Warunek zamknięcia takiej pozycji też jest jeden
  i podwójny — obie strony sprawdzone **w tym samym przebiegu**, bo osobno
  każdą da się spełnić kosztem drugiej.
- ODESŁANIE BEZ TREŚCI: DOŁĄCZ TREŚĆ ALBO NAPISZ WPROST, ŻE JEJ NIE
  DOŁĄCZASZ (właściciel, 2026-08-24). Odsyłając do dokumentu spoza
  repozytorium adresata, nie zostawiaj samego wskazania. **Asymetria kosztu
  jest tu całą treścią: kosztuje jedno pytanie u nadawcy — i całą fałszywą
  pewność u odbiorcy.** Nadawca traci sekundę, odbiorca traci wiedzę, że
  czegoś nie wie: odesłanie wygląda na kompletne, więc brakującą treść
  uzupełnia domysłem i **nie oznacza go jako domysłu**. Reguła wiąże obie
  strony — nadawcę przy wysyłce, odbiorcę przy odbiorze: **odesłanie bez
  treści zwraca się z pytaniem, nie uzupełnia z pamięci.** Wzorzec
  (2026-08-24): odesłanie do „trzech pytań o strażniku", których po tej
  stronie nie było; sesja odmówiła przepisania z pamięci, nadawca uzupełnił
  treść ze źródłem. To jest `P-22` widziane **od strony nadawcy** — tańszy
  moment niż wykrycie po stronie odbiorcy.
- PRZY USTALENIU ZE ZNANYM FAŁSZYWYM WNIOSKIEM — ZAKAZ, NIE SAMO OZNACZENIE
  (właściciel, 2026-08-24). Oznaczenie pochodzenia (`P-22`, liczba ogniw)
  mówi **„to jest cudze i niesprawdzone"**. Gdy wiadomo, jaki błędny wniosek
  ktoś z tego wyciągnie, to za mało — trzeba napisać **„a konkretnie TEGO
  wniosku nie wyciągaj"**, bo dopiero zakaz zatrzymuje kogoś, kto już
  uwierzył. Oznaczenie działa na czytelnika ostrożnego; zakaz działa na
  czytelnika przekonanego, a to ten drugi robi szkodę. Zakaz stawia się
  **w obie strony**, jeśli ustalenie ma parę po drugiej stronie granicy.
  Wzorzec (T43): tam 75 archiwów niosło żywe klucze, tu wykluczenie działa —
  zapisane razem z jawnym zakazem przenoszenia **obu** wniosków („archiwa
  niosą sekrety" i „wykluczanie `.env*` jest bezpieczne").
- DOWODY WARTOŚCI REGUŁY ZAPISUJE SIĘ RAZEM, NIE OSOBNO (właściciel,
  2026-08-24). **Miejsce zbiórki: `docs/faza-2/dowody-wartosci-regul.md`** —
  jedna tabela, kolumny: reguła · dowód · data · gdzie leżał przed zebraniem ·
  **własny czy przejęty**. Ostatnia kolumna rozstrzyga, czy reguła stoi na
  jednym pomiarze, czy na dwóch niezależnych; przy dowodzie przejętym podaje
  się źródło i `P-22`, gdy drogi weryfikacji stąd nie ma.
- KAŻDA TABELA DOWODÓW WARTOŚCI NIESIE KOLUMNĘ KOSZTU ALBO DEKLARACJĘ, ŻE GO
  NIE MIERZY (właściciel, 2026-08-24). **Zbiór przeszukany pod jednym kątem
  nie mierzy proporcji.** Spis przypadków, w których reguły się opłaciły,
  zbudowany wyłącznie z takich przypadków, czyta się jak bilans i bilansem nie
  jest — a czytający wyciąga z niego wniosek o **skuteczności**, choć są tam
  wyłącznie sukcesy. Dopuszczalne są dwa wyjścia i **żadne trzecie**: albo
  kolumna kosztu z realnym przeszukaniem, albo zdanie „ten dokument kosztów
  nie mierzy" postawione **w nim samym**, nie w cudzej głowie. Przy kolumnie
  kosztu odróżnia się **koszt zmaterializowany** od **poniesionego ryzyka,
  które nie wypaliło** — mieszanie ich jest tym samym błędem, co mieszanie
  dowodu z anegdotą. Zapisuje się też **zasięg przeszukania** i to, **czego
  ono z natury nie znajdzie**: koszt w postaci rzeczy, która nie powstała, bo
  reguła zniechęciła do jej zaczęcia, nie zostawia śladu w repozytorium
  i żadne przeszukanie go nie wykryje. **Kolumna „koszt zmaterializowany"
  jest obowiązkowa, nie ozdobna: tabela kosztów bez niej ZAWYŻA
  SYSTEMATYCZNIE**, bo ryzyko zapisuje się łatwiej niż jego brak — poniesione
  ryzyko, które nie wypaliło, wygląda w zapisie identycznie jak szkoda, która
  zaszła.
- DEFEKT, Z KTÓREGO REGUŁA POWSTAŁA, NIE JEST JEJ KOSZTEM (właściciel,
  2026-08-24). Przy tabeli kosztów to **najłatwiejsza do popełnienia pomyłka**,
  bo szkoda jest realna i data się zgadza — a mimo to przypisanie jest
  odwrotne: reguła powstała **z** tego defektu, więc wpisana do kosztów
  obciążałaby regułę szkodą, **której zapobiegła**. Sprawdzenie jest jednym
  pytaniem, zadawanym przy **każdej** pozycji kosztów: **czy reguła istniała
  w chwili, gdy koszt powstał.** Wzorzec (2026-08-24): „odesłanie do dokumentu,
  którego nie było" — trzy przypadki, wszystkie **przed** powstaniem reguły 18,
  która się z nich wzięła. Sprawdzenie wsteczne ośmiu pozycji tabeli kosztów
  wykryło tą metodą **jedno błędne przypisanie** (koszt objętości rejestru
  przypisany regule młodszej niż sam koszt).
- RETROSPEKCJA I UCHRONIENIE MIERZĄ DWIE RÓŻNE RZECZY (właściciel,
  2026-08-24). Reguła zastosowana **po fakcie**, do wady już popełnionej,
  dowodzi, że jest **trafna**. Reguła, która **zatrzymała rękę w chwili
  pisania**, dowodzi czegoś innego i mocniejszego: że jest **czytana w chwili
  pracy** — a to jedyny moment, w którym reguła cokolwiek zmienia. Trafna
  i nieczytana wygląda w dokumentach identycznie jak trafna i czytana, więc
  **te dwie rzeczy liczy się osobno**. Wzorzec (T26, 2026-08-24): pierwszy
  przypadek uchronienia w tym repozytorium — reguła 18 zatrzymała dopisanie
  domyślonej treści do akapitu, który tę właśnie wadę opisuje. Wszystkie
  wcześniejsze samozastosowania były retrospektywne.
- DWA DOWODY Z JEDNEGO ŹRÓDŁA MIERZĄ POWTARZALNOŚĆ ZJAWISKA, NIE NIEZALEŻNOŚĆ
  POTWIERDZENIA (właściciel, 2026-08-24). Dwa przypadki z tego samego
  repozytorium, tego samego przepływu pracy i tej samej pary rąk pokazują, że
  zjawisko **wraca** — nie że ktokolwiek **niezależnie** potwierdził regułę.
  Do niezależności potrzeba **innego źródła albo innego mechanizmu awarii**;
  bez tego mamy jedną obserwację powtórzoną, a nie dwie. Konsekwencja
  praktyczna: licząc, na czym reguła stoi, licz **źródła, nie wystąpienia** —
  inaczej reguła z pięcioma przypadkami z jednego miejsca wygląda mocniej niż
  reguła z dwoma z dwóch, a jest odwrotnie. Wzorzec (2026-08-24): na 25
  dowodów wartości w `docs/faza-2/dowody-wartosci-regul.md` **jedna** para jest
  naprawdę niezależna — reszta powtarza się w obrębie tego repozytorium. Pojedynczy przypadek, w którym reguła się opłaciła, czyta się
  jak **anegdota**; dwa niezależne, zapisane obok siebie, pokazują, **czego
  poprzednia metoda nie widziała z definicji**. Wzorzec: reguła „weryfikuj
  backup odtworzeniem, nie sumą" weszła rano 2026-08-24 i tego samego dnia
  dostała dwa potwierdzenia z niezależnych stron — `RECZ-287` (75 archiwów
  przyjętych samą sumą, z żywymi kluczami; repozytorium aplikacji) i **T43**
  (defekt znaleziony przy pierwszym sprawdzeniu tutaj). Dopisując dowód
  wartości reguły, **dopisz go do miejsca, gdzie leżą pozostałe** — a jeśli
  leży sam, wskaż, gdzie są inne.
- ZALEŻNOŚĆ TWARDA W DOKUMENTACJI WYMAGA ZAPISU, W KODZIE NIE (właściciel,
  2026-08-24). Jeśli dokument A odsyła do treści w dokumencie B, **zmiana B
  idzie pierwsza** — albo obie w jednym commicie. Odwrotna kolejność daje
  stan pośredni, w którym odesłanie wskazuje na miejsce, gdzie szukanej
  rzeczy jeszcze nie ma: **wygląda poprawnie i jest fałszywy**. Uzasadnienie
  osobnego zapisu: w kodzie taką zależność wyłapuje kompilator albo test, więc
  nie trzeba jej pamiętać; **w prozie nie wyłapuje jej nic** — żadna bramka
  nie sprawdza, czy odesłanie trafia w treść, która już istnieje. Wzorzec
  (2026-08-24): wykreślenie zdania o pierwszeństwie z `docs/STRATEGIA.md`
  musiało pójść **po** wpisaniu siedmiu szczebli do tego pliku, bo nowy
  nagłówek STRATEGII odsyła do rozdziału „Hierarchia źródeł reguł".
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
- KLASA „WNIOSEK SŁUSZNY Z METODY NIERZETELNEJ" (właściciel, 2026-08-24).
  **Trafność wyniku nie uzasadnia metody** — a przy JEDNYM pomiarze nie da
  się odróżnić jednego od drugiego. To jest odwrotność „brak dowodu = brak
  zabezpieczenia": tam brakowało dowodu przy dobrym wniosku, tu dowód jest
  pozorny, a wniosek przypadkiem wyszedł dobry. Groźniejsza od zwykłej
  pomyłki, bo **nagradza złą metodę** i utrwala ją na przyszłość.
  Wzorzec (2026-08-24): zgłoszenie cienkiego zapasu przy `Pełny zestaw e2e`
  oparte na JEDNEJ liczbie przepisanej z cudzego zapisu — 5 min 23 s. Ten
  sam kod dał godzinę później 3 min 13 s; **rozrzut 1,67×**. Zgłoszenie było
  słuszne, ale przy odwrotnym losie ta sama metoda kazałaby powiedzieć „jest
  dobrze" i defekt zostałby przeoczony. Reguła: **dla wielkości z rozrzutem
  jedna wartość nie ustala zapasu — ustala go rozrzut, a rozrzutu nie widać
  z jednego pomiaru.** Zanim policzysz „zapas N×", sprawdź, ile masz
  pomiarów; jeden to nie zapas, to anegdota z datą. Rodzina: „margines
  pozorny" przy wydajności, przeniesiony na czas trwania zadania.
- WYNIKANIE Z KODU TO NIE POMIAR (`B-17` z toru 8, przyjęte 2026-08-24).
  Odczyt cudzego źródła — dokumentacji, kodu runnera, biblioteki — mówi, co
  mechanizm **ma** robić. Pomiarem jest dopiero jego zachowanie na naszym
  otoczeniu. Odczyt jest mocniejszy od domysłu i **słabszy od przebiegu**,
  więc nie zamyka pozycji i nie wystarcza za mutację. Wzorzec (T24): zapłon
  piętnastu kroków `if: cancelled()` wynika z `StepsRunner.cs`
  i `CancelledFunction.cs`, a mimo to **nie znaleziono ani jednego
  publicznego przebiegu**, w którym wykonałby się krok z warunkiem dokładnie
  `cancelled()` — wszystkie obserwowane to `always()`. Status: NIESPRAWDZONE.
  Zapisując taki odczyt, oznaczasz go jako **granicę pomiaru**, nie jako
  brak wykonania — to dwie różne rzeczy i mieszanie ich zaciera, czego
  naprawdę brakuje.
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

   **ZGODA WYMIENIAJĄCA SKRÓTY WYMAGA PUSHU WYMIENIAJĄCEGO SKRÓTY**
   (właściciel, 2026-08-24 — mechanizm, nie zalecenie):

   ```bash
   git push origin <skrót>:refs/heads/<gałąź>    # dokładnie do tego commita
   ```

   `git push` bez refspec bierze **wszystko, co stoi na gałęzi** — łącznie
   z commitami powstałymi **po** udzieleniu zgody. Zgoda na **listę** zamienia
   się wtedy w zgodę na **stan**, i to bez śladu: polecenie kończy się
   sukcesem, a wypchnięte zostaje więcej, niż ktokolwiek zatwierdził.
   Wywołanie deklaruje „wyślij zatwierdzone", robi „wyślij wszystko" — klasa
   **„mechanizm robi więcej, niż deklaruje wywołanie"**. Skrót w refspec jest
   jedyną formą, w której zakres pushu jest **sprawdzalny w samym poleceniu**,
   a nie zależny od tego, co akurat leży na gałęzi.
   Przypadek źródłowy (2026-08-24): zgoda obejmowała `69e0b52` i `74fdfe8`,
   a poprawka kanonu powstała **po** jej udzieleniu i leżała już na gałęzi.
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

   **GRANICA TEGO ZAKAZU** (właściciel, 2026-08-24): **zakaz naprawiania przy
   okazji NIE OBEJMUJE defektu, który produkuje nowe wadliwe artefakty
   w trakcie odraczania.** Odroczenie zakłada, że defekt czeka; gdy defekt
   **pracuje** — psuje kolejne kopie, wpisy, pomiary — odroczenie przestaje
   być zachowaniem stanu, a staje się jego pogarszaniem. Rozstrzyga
   **właściciel**, punktowo i dla nazwanej pozycji; wykonawca **zgłasza** taki
   przypadek z liczbą wytworzonych artefaktów, nie zdejmuje zakazu sam.
   Wzorzec (T43, 2026-08-24): **cztery wadliwe migawki** od wykrycia defektu,
   kolejne co godzinę, przy przyczynie zdiagnozowanej i naprawie na kilka
   linii. **Pierwszy przypadek w tym repozytorium, w którym koszt reguły
   przewyższył jej wartość w POMIARZE, a nie w przypuszczeniu.**
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

## Backup po każdym zadaniu — URUCHAMIASZ GO RĘCZNIE
**Nie ma żadnego automatu. Backup nie wykona się sam.** Po każdym
ukończonym zadaniu **sam** uruchamiasz:

```bash
bash scripts/backup.sh
```

Skrypt robi migawkę ZIP całego repo (z `.git`, bez `node_modules`) na
zewnętrzny SSD. Wynik raportujesz krótko: nazwa pliku + rozmiar, albo
„backup nieudany: <powód>". Niepowodzenie (dysk odłączony, brak miejsca,
błąd zapisu) zgłaszasz WYRAŹNIE i czekasz na decyzję właściciela — cichy
brak backupu jest gorszy niż jego brak, bo usypia czujność. Nie udajesz
sukcesu.

**Dlaczego to zdanie zostało przepisane (T42, 2026-08-24).** Do tego dnia
stało tu: *„hook Stop w ustawieniach Claude Code robi to automatycznie"*.
**To była nieprawda** — klucz `hooks` nie występuje w żadnym pliku
konfiguracji (sprawdzone w czterech lokalizacjach), a ciąg `backup.sh` nie
pada w żadnej. Kosztowało to **trzy doby bez migawki** (20.08 22:02 →
24.08 08:58), bo cichy brak backupu jest nieodróżnialny od backupu,
którego nie było potrzeby robić. Zdanie stało na drugim szczeblu
hierarchii, więc każda sesja czytała je na starcie i przestawała robić
kopie. **Napis zamiast mechanizmu — w kanonie.** Dopóki hak nie powstanie
i nie zostanie sprawdzony mutacją, jedynym działającym zabezpieczeniem
jest polecenie powyżej, uruchomione Twoją ręką.

**Weryfikacja migawki: ODTWORZENIEM, nie sumą** (właściciel, 2026-08-24).
Suma kontrolna dowodzi, że plik się nie zepsuł — **nie dowodzi, że da się
z niego wrócić**. Sprawdzenie: rozpakuj archiwum do katalogu tymczasowego,
wykonaj `git log` w odtworzonym repozytorium, skasuj katalog. To ta sama
klasa co `RECZ-286` („narzędzie potwierdza poprawność artefaktu, którego
nie da się użyć") i ta sama co reguła o osiągalności skrótów.

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
