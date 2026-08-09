# Słownik nazw produktowych PL → EN → DE (kontrakt szwu app ↔ www)

**Status: OBOWIĄZUJE — decyzja właściciela 2026-08-09: nazwy
aplikacji są wzorcem.** Źródło nazw: i18n aplikacji
(src/i18n/messages/{pl,en,de}.json — raport Z3 z dowodami plik:linia).
Rozjazd strona↔aplikacja = obietnica, której użytkowniczka nie
odnajdzie po zalogowaniu.

| PL (app) | EN (app) | DE (app) | Uwagi |
|---|---|---|---|
| Tarcza | Shield | Schild | DE wg app (nie „Schutzschild") |
| Pieczęć Etyczna | Ethical Seal | Ethik-Siegel | kafelek skrócony: Pieczęć/Seal/Siegel |
| Puls zespołu | Team Pulse | Team-Puls | zawsze z członem „zespołu"; poza kartą Growth: pełna forma „W planie Growth…" |
| Pulpit | Dashboard | Dashboard | PL: „Pulpit" (metaTitle app); nav app używa „Dashboard" |
| Świadectwo | Testimony | Zeugnis | wariant techniczny w obawach: Świadectwo SHA-256 / SHA-256 Testimony / SHA-256-Zeugnis; na stronie głównej „cyfrowy odcisk/digital fingerprint/digitaler Fingerabdruck" |
| Pierwsze 90 Dni | First 90 Days | Die ersten 90 Tage | app pisze „Pierwsze 90 dni" (małe „dni") — do ujednolicenia przy implementacji |
| DMO — Dzienny Plan Działania | DMO — Daily Action Plan | Täglicher Aktionsplan (DMO) | podtytuł app EN: „Daily Method of Operations" |
| Studio | Studio | Studio | |
| Sala Treningowa | Training Room | Trainingsraum | d. „Symulator rozmów" — nazwa wycofana z www |
| Twój Wrapped | Your Wrapped | Dein Wrapped | d. „Magic Wrapped" — nazwa wycofana z www |
| Wall of Proof | Wall of Proof | Wall of Proof | bez tłumaczenia we wszystkich językach (app) |
| Paszport zgodności | Compliance Passport | Compliance-Pass | DE wg nav app; tytuł strony app „Compliance-Ausweis" = niespójność app (zgłoszona) |
| — (opisowo) | — (opisowo) | — (opisowo) | kreator wdrożeniowy / onboarding wizard / Einstiegsassistent: OPISOWO, małą literą, bez nazwy własnej (app: „Witaj w Catherly!") |
| (formularz z publiczną stroną — opis) | (sign-up form — opis) | (Anmeldeformular — opis) | nazwa strony app „Formularze & Import" NIE wchodzi na www (panel F6: „Import" kolidowałby z Parą 2 obaw); nav-skrót „Leady" nie wchodzi (anglicyzm) |
| Ranking | Leaderboard | Rangliste | bramka PRO |
| Klucze API, webhooki | API keys, webhooks | API-Schlüssel, Webhooks | dozwolone nazwy techniczne (rozstrzygnięcie panelu — bez polskiego odpowiednika) |
| Cel z kamieniami milowymi | goal with milestones | Ziel mit Meilensteinen | opisowe |
| Baza kontaktów | contact base | Kontaktbasis | opisowe |

Adresy: /cennik → /pricing → /preise (strona www). Rejestracja:
WYŁĄCZNIE /login (ADR-023) — tras /rejestracja, /register,
/registrierung nie ma i www ich nie linkuje.
