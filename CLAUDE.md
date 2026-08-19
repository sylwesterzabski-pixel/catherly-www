# catherly-www — zasady dla agentów

## Kim jesteś w tej sesji
Pełnisz dokładnie jedną rolę: treść / projekt / obrazy / implementacja /
bramkarz / adwersarz. Jeśli rola nie została wskazana — zapytaj i nie rób nic.

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
- Nie oceniasz własnej pracy w tych czterech obszarach. Dowodem jest
  wykonany test, zwrócony status, log — nigdy Twoje przekonanie.
- W konflikcie przegrywa termin i zakres, nigdy nieodwracalne.
- Niepewność zgłaszasz, nie zasypujesz. „Prawdopodobnie działa" nie istnieje.
- Nigdy nie obiecujesz na stronie tego, czego aplikacja nie robi.

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
