# catherly.com — dokument strategii (50 punktów)

Dokument nadrzędny projektu. Plan inżynierski (docs/PLAN.md) mówi JAK —
ten dokument mówi CO i DLACZEGO. Sprzeczność rozstrzyga się na korzyść
strategii, chyba że ADR jawnie stanowi inaczej.

## ZASADY NACZELNE

1. Izolacja marki. Żadnej wzmianki o konkretnej firmie, żadnych logotypów
partnerów, żadnych zdjęć konkretnej osoby jako twarzy produktu. Przykłady
w interfejsie i na zrzutach: neutralne, wymyślone nazwy własne. Powód nie
jest kosmetyczny — związanie z jedną siecią odcina wszystkie pozostałe,
a to jest cały rynek poza jedną firmą.

2. „Światowy poziom" musi być mierzalny, nie deklarowany. Przyjmuję twarde
progi jako bramki CI, nie jako ambicje: LCP < 1,8 s i INP < 200 ms na 4G,
CLS < 0,1, kontrast AA na każdym tekście, pełna obsługa klawiaturą, strona
działa bez JavaScriptu w zakresie czytania treści. Niespełniony próg =
czerwony build, nie notatka na później.

3. UX ma przyciągać, więc nie stosujemy niczego, co odpycha. Konkretnie
i bez wyjątków: brak wymuszania rejestracji przed obejrzeniem czegokolwiek,
brak wyskakujących okien przy wejściu i przy próbie wyjścia, brak sztucznych
liczników czasu i fałszywej pilności, brak ukrytych cen, brak zmyślonych
opinii i liczb klientek. Odrzucenie ciasteczek ma być tak samo łatwe jak
akceptacja — to wymóg RODO, ale przede wszystkim produkt ma moduł etyki,
więc strona nie może zachowywać się gorzej niż produkt.

4. Jedno źródło prawdy dla wyglądu. Strona i aplikacja korzystają z tego
samego design systemu. Rozjazd wykrywany testem kontraktowym, nie okiem.

## ARCHITEKTURA — decyzje inżynierskie

5. Domeny.
- catherly.com — strona (statyczna, trzy języki)
- app.catherly.com — aplikacja
- Ciasteczko sesji o zasięgu .catherly.com, żeby zalogowanie na stronie
  było ważne w aplikacji

6. Logowanie na stronie — jak to zrobić bezpiecznie. Wizualnie logowanie
jest pod catherly.com/logowanie. Technicznie uwierzytelnianie zostaje
w jednym miejscu — w aplikacji. Strona wystawia ten ekran przez przepisanie
trasy (rewrites) do aplikacji.
Dlaczego nie druga implementacja formularza na stronie: to znaczyłoby dwie
kopie logiki sesji, dwa miejsca do pomylenia przy CSRF i dwa cykle
wdrożeniowe dla rzeczy, która chroni cudze dane. Jedna implementacja,
jeden cykl, jeden przedmiot audytu.

7. Granica płatna/bezpłatna. Cała strona jest publiczna. Płatność (Stripe —
już zintegrowany) → utworzenie konta → aplikacja. Kolejność świadoma: plan
wybiera się przed założeniem konta, więc nikt nie zakłada konta „na próbę"
i nie odbija się o mur w środku.

8. Stack. Next.js 15 App Router, generowanie statyczne, treść w plikach
repozytorium (nie CMS na start — CMS to kolejna baza, kolejna awaria
i kolejny koszt przy sześciu stronach). Osobne repozytorium catherly-www,
osobny projekt Vercel. Awaria aplikacji nie może zdjąć strony sprzedażowej,
a wdrożenie strony nie może dotknąć bazy.

9. Trzy języki od pierwszego dnia — pl / en / de, z hreflang i x-default.
Aplikacja ma już te trzy, więc strona nie może być uboższa.

## UI — inżynieria warstwy wizualnej

10. Tokeny przed komponentami. Skala typograficzna, skala odstępów, paleta,
promienie, cienie i czasy animacji jako zmienne CSS — jeden komplet dla
strony i aplikacji.

11. Typografia niesie stronę. Krój nagłówkowy z charakterem + neutralny
krój tekstowy + krój do liczb z cyframi tabelarycznymi (cennik, limity).
Kroje osadzone lokalnie, nie z zewnętrznego CDN — inaczej pierwszy render
zależy od cudzego serwera.

12. Motyw. Jeden, spójny, zaprojektowany do końca. Bez przełącznika
jasny/ciemny — zgodnie z wcześniejszą decyzją dla produktu; dwa motywy
to podwójna praca i podwójne miejsce na błąd kontrastu.

13. Ruch celowy, nie dekoracyjny. Jedna zaplanowana sekwencja przy wejściu,
subtelne odsłonięcia przy przewijaniu, mikrointerakcje na elementach
klikalnych. Wszystko respektuje prefers-reduced-motion. Animacja, która
nie niesie informacji, jest usuwana.

14. Mobile-first dosłownie — projektowanie zaczyna się od 390 px.
Ten odbiorca czyta z telefonu.

15. Dostępność jako bramka. Kontrast, ślad fokusa, kolejność tabulacji,
hierarchia nagłówków, teksty alternatywne, formularze z etykietami.
Sprawdzane automatycznie w CI.

## STRONA GŁÓWNA — sekcja po sekcji

16. Nagłówek strony (sticky, lekki). Logo · Funkcje · Cennik · Dla kogo ·
Pomoc · Zaloguj (spokojny) · Wybierz plan (główny). Dwa wejścia, wyraźnie
różne wagą — kto ma konto i kto go nie ma.

17. Sekcja otwierająca. Zdanie nazywające dzień odbiorcy, nie technologię.
Podtytuł mówiący w jednym zdaniu, czym Catherly jest. Jedno główne
wezwanie. Obok — żywy, prawdziwy fragment produktu, nie ilustracja i nie
stock. Poniżej trzy krótkie potwierdzenia: dane w UE, RODO, rezygnacja
w każdej chwili.

18. Problem, zanim rozwiązanie. Trzy–cztery zdania nazywające to, co
odbiorca zna: rozsypane kontakty, treści robione po nocach, zespół,
o którym wiadomo za późno, wyniki liczone w zeszycie. Bez ironii i bez
straszenia — rozpoznanie, nie wyrzut.

19. Czym jest Catherly — jedna sekcja definiująca. Krótko i konkretnie:
system do prowadzenia własnej sprzedaży bezpośredniej — kontakty, treści,
zespół, wyniki i rozliczenia w jednym miejscu. To jest ta sekcja, po
której człowiek ma umieć powiedzieć znajomej, czym to jest.

20. Cztery filary, po jednym ekranie każdy. Naprzemiennie tekst/obraz:
Pozyskiwanie · Treści · Zespół · Wyniki. Każdy filar: jedno zdanie
korzyści, trzy konkrety, jeden prawdziwy zrzut, link do pełnej podstrony.

21. Jak to wygląda w dniu pracy. Krótka oś: rano — plan dnia; w ciągu
dnia — kontakt i materiał; wieczorem — podsumowanie. Numeracja tylko
dlatego, że to naprawdę jest sekwencja.

22. Dowód. Wyłącznie prawdziwy: konkretne liczby produktu (ile modułów,
ile języków, gdzie dane), a gdy pojawią się prawdziwe historie
użytkowniczek — one. Dopóki ich nie ma, tej sekcji nie ma. Zmyślona
opinia jest wykrywalna i kosztuje więcej niż jej brak.

23. Cennik w skrócie. Trzy plany, cena widoczna, najważniejsza różnica
między nimi, link do pełnego cennika.

24. Najczęstsze obawy. Sześć pytań, na które odbiorca musi znać odpowiedź,
żeby kliknąć: czy to trudne, czy przeniosę swoje dane, co gdy zrezygnuję,
czy moje kontakty są bezpieczne, czy działa na telefonie, czy to zgodne
z zasadami mojej firmy.

25. Zamknięcie. Powtórzone główne wezwanie + zdanie o braku zobowiązania.
Bez nowych argumentów — kto doczytał, już wie.

26. Stopka. Pełna mapa strony, języki, dokumenty prawne, kontakt,
status usługi.

## PODSTRONY — co dokładnie zawierają

27. /funkcje — przegląd. Podział wg zadań dnia, nie wg architektury
systemu. Cztery bloki (pozyskiwanie, treści, zespół, wyniki), każdy
z wejściem w szczegóły. Na dole: tabela „co jest w którym planie".

28. /funkcje/pozyskiwanie. Baza kontaktów i historia rozmów, ocena szans,
materiały do wysyłki ze śledzeniem otwarć, formularze i strony
przechwytujące, przypomnienia o kontakcie. Dla każdego: po co to, jak
wygląda, czego nie robi.

29. /funkcje/tresci. Generator treści, biblioteka szablonów, edytor grafik
i krótkich form wideo, planowanie i publikacja, sprawdzanie zgodności
przekazu. Sekcja o granicach AI — co model robi, a czego nie, i że
ostatnie słowo należy do człowieka.

30. /funkcje/zespol. Struktura, ścieżka startowa dla nowych osób, zadania
i rytm pracy, sygnały o osobach wymagających uwagi, materiały szkoleniowe,
wspólne zasoby.

31. /funkcje/wyniki. Wyniki własne i zespołu, cele i postępy, rozliczenia
i faktury, eksport danych. Jasno: czyje to dane i jak je zabrać ze sobą.

32. /cennik. Trzy plany z pełnym rozpisaniem limitów, przełącznik
miesięcznie/rocznie z widoczną oszczędnością, tabela porównawcza bez
gwiazdek i przypisów, sekcja pytań o płatność (waluta, faktura VAT,
zmiana planu, rezygnacja, co się dzieje z danymi po rezygnacji). Ceny
w PLN z groszami. Wszystkie limity liczbowo — „bez ograniczeń" tylko tam,
gdzie naprawdę nie ma limitu.

33. /dla-kogo. Trzy ścieżki rozpoznania siebie: osoba startująca
(potrzebuje prowadzenia), budująca zespół (potrzebuje widoczności),
prowadząca dużą strukturę (potrzebuje skali i delegowania). Każda: co
boli, co Catherly z tym robi, od którego planu.

34. /bezpieczenstwo. Ta podstrona decyduje u ostrożnych. Gdzie leżą dane
(UE), szyfrowanie, kopie zapasowe, kto ma dostęp, uwierzytelnianie
dwuskładnikowe, rejestr operacji, RODO w praktyce — eksport i usunięcie
konta, podwykonawcy przetwarzania, zgłaszanie podatności. Językiem
człowieka, nie prawnika.

35. /o-catherly. Po co ten produkt powstał, jakich zasad się trzyma (brak
ciemnych wzorców, brak sprzedawania danych, brak blokowania wyjścia), jak
rozwijamy się dalej. Bez życiorysów i bez zdjęć — to strona produktu.

36. /pomoc. Baza wiedzy z wyszukiwarką, pierwsze kroki, najczęstsze
problemy, kontakt do wsparcia z realnym czasem odpowiedzi. Publicznie
dostępna przed zakupem — to buduje zaufanie mocniej niż strona o zaufaniu.

37. /zmiany. Publiczny dziennik zmian. Produkt, który widocznie żyje,
wygrywa z produktem, który tylko obiecuje.

38. /status. Dostępność usługi, historia awarii. Uczciwość w złym dniu
jest warta więcej niż deklaracja w dobrym.

39. /kontakt. Formularz, dane firmy, czas odpowiedzi, kanał dla spraw
prawnych i dla zgłoszeń bezpieczeństwa.

40. Dokumenty prawne. /regulamin, /prywatnosc, /ciasteczka,
/przetwarzanie-danych.

41. Ścieżka zakupu. /cennik → /rejestracja?plan=… → płatność → /witaj
(potwierdzenie i pierwszy krok) → app.catherly.com. Plus /logowanie
i /odzyskiwanie-hasla.

42. /blog — po starcie. Poradnikowy, pod wyszukiwanie długiego ogona.
Nie na start, żeby nie startować z trzema wpisami.

## JAK TO ZBUDUJĘ — kolejność

43. Krok 1 — fundament wizualny. Bundle design systemu z aktualnych
komponentów Catherly, wypchnięcie do Claude Design, test kontraktowy
tokenów. Efekt: projekty powstają z Twoich klocków.

44. Krok 2 — treść i pozycjonowanie. Nagłówek, cztery filary, cennik,
pytania — w trzech językach. Tu fan-out agentów: kilka niezależnych
wariantów nagłówka i propozycji wartości, panel oceniający, synteza
ze zwycięzcy z przeszczepem najlepszych pomysłów z pozostałych.

45. Krok 3 — projekt. Ekrany w Claude Design na design systemie: główna,
cennik, jedna podstrona funkcji jako wzorzec dla pozostałych.

46. Krok 4 — szkielet techniczny. Repozytorium, trzy języki, mapa strony,
dane strukturalne, zgody na ciasteczka, budżet wydajności jako bramka CI
od pierwszego commita (dokładany później nigdy nie zostaje dołożony).

47. Krok 5 — implementacja. Sekcja po sekcji, każda z testem dostępności.
Tu fan-out agentów w izolowanych worktree, po jednej sekcji na agenta.

48. Krok 6 — połączenie z aplikacją. Ciasteczko na .catherly.com,
przepisanie tras logowania i rejestracji, ścieżka płatności, powrót po
zakupie. Test end-to-end całej drogi: cennik → płatność → konto →
zalogowana aplikacja.

49. Krok 7 — audyt przedpublikacyjny. Pięć niezależnych soczewek
z kontrolą adwersaryjną: dostępność · wydajność · RODO i prawo ·
wyszukiwarki · prawdziwość treści (czy każda liczba na stronie jest
zmierzona, a nie wpisana).

50. Krok 8 — publikacja i pomiar. Zdarzenia konwersji przez istniejącą
warstwę analityki produktu, nie przez trzeci system.

## OTWARTE DECYZJE PO STRONIE WŁAŚCICIELA

- Przeniesienie aplikacji na app.catherly.com — dziś w kodzie i na liście
  dozwolonych hostów obrazów catherly.com figuruje jako aplikacja. Zmiana
  dotyka ciasteczek, linków w e-mailach i adresów materiałów wysyłanych
  klientkom, więc musi być decyzją właściciela, nie założeniem.
- Nazwy i ceny trzech planów — muszą zgadzać się z tym, co jest w Stripe.
- Dane firmy do stopki i dokumentów — nazwa, adres, NIP, adres kontaktowy.
