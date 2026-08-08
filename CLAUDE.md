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
