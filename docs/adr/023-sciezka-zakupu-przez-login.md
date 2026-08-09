# ADR-023: Ścieżka zakupu przez /login (doprecyzowanie STRATEGIA pkt 41)

Data: 2026-08-09. Status: PRZYJĘTY (decyzja właściciela).

## Kontekst

STRATEGIA pkt 41 (zamrożona — pliku nie zmieniamy) opisuje ścieżkę:
/cennik → /rejestracja?plan=… → płatność → /witaj → app.catherly.com.
Zlecenie odczytowe Z3 (docs/faza-2/raport-zlecen-z1-z4.md) wykazało,
że aplikacja nie ma trasy rejestracji: konto powstaje przy pierwszym
logowaniu na /login (magic link Resend / Google OAuth; PrismaAdapter,
src/auth.ts:124,252), /login nie przyjmuje parametru planu
(LoginForm.tsx:33 czyta tylko callbackUrl i ref), a wybór planu
następuje po zalogowaniu przez /billing?highlight=STARTER|GROWTH|PRO.

## Decyzja

1. CTA cennika („Wybierz plan") prowadzi na **/login**.
2. Treść cennika i FAQ nie zakłada wyboru planu przed rejestracją —
   plan wybiera się w aplikacji po zalogowaniu.
3. Szczegóły przepływu zakupu (ewentualne przekazanie wyboru planu
   przez callbackUrl, strona /witaj) — do rozstrzygnięcia w Fazie 5
   (szew logowania — komplement ADR-022).

## Konsekwencje

- Strona nie tworzy tras /rejestracja, /register, /registrierung.
- Zapis pkt 41 czyta się przez pryzmat tego ADR do czasu ewentualnej
  zmiany po stronie aplikacji (dodanie trasy rejestracji z parametrem
  planu przywróciłoby literalny przepływ pkt 41 — wymaga nowego ADR).
- Test end-to-end drogi zakupu (STRATEGIA pkt 45) obejmuje przepływ
  faktyczny: cennik → /login → onboarding → /billing → płatność.
