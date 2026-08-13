# Rejestr warunków powrotu (treści zdjęte lub wstrzymane z powodu braku pokrycia)

Zasada: ADR-018 — brak dowodu = brak obietnicy. Każda pozycja wraca
WYŁĄCZNIE po spełnieniu warunku (dowód wykonaniem, nie przekonanie).
Data założenia: 2026-08-09 (po Z1–Z4).

| # | Treść | Gdzie | Warunek powrotu |
|---|---|---|---|
| 1 | „Rozliczenia" w H1 i podtytule hero | pl/en/de naglowek | Działające rozliczenia end-to-end (Stripe aktywny) + aktualizacja inwentarza przed premierą |
| 2 | Pytanie o fakturę VAT w FAQ cennika | pl/en/de cennik §5 | Testowy zakup z OTRZYMANĄ fakturą (dowód dokumentem) + konfiguracja dashboardu Stripe (dane sprzedawcy; decyzja o Stripe Tax — domyślnie wyłączony) |
| 3 | Trial 14 dni (kod: trial_period_days:14, billing-service.ts:213–227) | przyszły argument cennika | Stripe działający end-to-end; decyzja właściciela o komunikacji trialu |
| 4 | „20 GB przestrzeni na pliki" (karta Pro) + wiersz „Przestrzeń" w tabeli | pl/en/de cennik §3–4 | Klucz Storage aktywny + wykonany test uploadu. Panel: wraca bez ponownego panelu treści, tylko ze zliczeniem znaków |
| 5 | Wiersz „Wywołania AI 100/500/∞" w tabeli | pl/en/de cennik §4 | Aktywny klucz Anthropic (AI przestaje zwracać teksty zapasowe). Język kierunku o asystencie AI w opisach — dozwolony już teraz |
| 6 | Wiersz „Platformy social 2/5/∞" w tabeli | pl/en/de cennik §4 | Zgody platform + działające łączenie kont (dowód połączeniem) |
| 7 | „RODO"/„GDPR"/„DSGVO" jako potwierdzenie | pl/en/de naglowek | Weryfikacja procesów (prawa osób, powierzenie, polityka); wraca jako fakt z mechanizmem na /bezpieczenstwo |
| 8 | TLS / szyfrowanie at-rest platformy | /bezpieczenstwo | Odczyt dashboardu Supabase (raport Z4: brak śladu w repo; twierdzenie w UI aplikacji to stała tekstowa) |
| 9 | Szyfrowanie pól aplikacyjnych (AES-256-GCM: TOTP, tokeny social — FAKT z kodu) | /bezpieczenstwo | Wchodzi przy budowie /bezpieczenstwo z precyzyjnym zakresem („wybrane pola"), nie jako potwierdzenie ≤45 zn (panel F5) |
| 10 | Import wyciągu FL | cała strona | Storage aktywny + ekrany niepuste; bramka GROWTH pozostaje |
| 11 | Fraza Pulsu poza kartą Growth | wszystkie treści | Zawsze pełna forma „W planie Growth…" (warunek panelu cennika, aktualny) |
| 12 | Pozostałe bramki GROWTH z Z1 (Benchmarki, Liga, Hive Coach, Win Reel, Interactive, Stacks, Tag, raporty struktury/sponsora) | ewentualne przyszłe treści | Nieobecne w narracji strony; każde wejście = nowa obietnica → tabela obietnic + panel + decyzja właściciela |

| 13 | robots: noindex,nofollow (layout www — stan przedpremierowy, odnotowany przez adwersarza) | src/app/[locale]/…/layout.tsx | Wyłączyć przy publikacji (Faza 7) — pozycja checklisty premiery |
| 14 | „bez podawania powodu" (rezygnacja) | zamknięcie pkt 25 (odrzucone przez panel) | Weryfikacja przepływu anulowania w aplikacji (czy nie wymusza powodu — dowód) + wpis do tabeli obietnic |
| 15 | Granice e-mail modułów pozyskiwania (formularz/kalendarz/zadania: „nie wyśle e-maila/nie przychodzą e-mailem") | /funkcje/pozyskiwanie | Aktywacja Resend → rewizja trzech granic (panel Etapu B F4, 2026-08-12) |
| 16 | Granica jednokierunkowości subskrypcji kalendarza | /funkcje/pozyskiwanie | Integracja kalendarza dwustronna (dziś SZKIELET) → rewizja granicy modułu 3 |
| 17 | Cel linku kodu QR polecającego (teksty zakładają adres polecający) | /funkcje/pozyskiwanie | Weryfikacja przy zleceniu zrzutów Z9+ (dokąd QR prowadzi w aplikacji) |
| 18 | 7 nazw opisowych modułów bez pozycji słownika (kalendarz, subskrypcja, vCard, QR, program poleceń, zadania, plany rozmów) | /funkcje/* | Potwierdzenie zgodności z i18n aplikacji przy najbliższym zleceniu Z (decyzja właściciela 2026-08-12) |
| 19 | Granica importu (moduł 4: „importu hurtowego nie ma”) | /funkcje/pozyskiwanie + obawy Para 2 | Pojawienie się importu w aplikacji (strona app „Formularze & Import” — potwierdzenie zakresu przy najbliższym Z) → rewizja granicy i Pary 2 (adwersarz B F4) |
| 20 | Rejestr „cyfrowy odcisk SHA-256” na podstronach funkcji (D-C3) | /funkcje/wyniki | Obowiązujące; przy zmianie decyzji głównej — rewizja |
| 21 | Granica „nie wygeneruje szablonu” | /funkcje/tresci | Aktywacja klucza Anthropic → rewizja |
| 22 | Granica „zasięgów nie pokaże” | /funkcje/tresci | Statystyki publikacji po zgodach platform → rewizja |
| 23 | Widok liderki w Pierwszych 90 Dniach (W2 odrzucony — brak dowodu) | /funkcje/zespol | Odczyt first90 przy najbliższym Z |
| 24 | „Przesuwasz post” + nazwy poza słownikiem (kalendarz publikacji, tablica postów) | /funkcje/tresci | Weryfikacja przy Z9 / najbliższym Z |

Pozycje zamknięte (dla historii): „kto czeka na odpowiedź" (usunięta
na stałe — brak funkcji); „co z tego jest twoje" (zredukowana do „co
się sprzedało"); FAQ-faktura i trial rozstrzygnięte 2026-08-09 jako
milczenie warunkowe (wiersze 2–3).
