# Protokół panelu: sześć obaw (Faza 2, Etap B; STRATEGIA pkt 24)

**Data:** 2026-08-09
**Mechanika:** fan-out 3 niezależnych zestawów (O1 koleżanka uspokaja /
O2 przez fakty / O3 przez jej perspektywę) → osobny agent-panel (Prawo 2)
→ synteza. Brief: docs/faza-2/brief-obawy.md.
**Status: PROJEKT — czeka na decyzję właściciela.**

---

## K1 — dyskwalifikacje i naruszenia

| Para | Zestaw | Werdykt |
|---|---|---|
| 1 (łatwość) | O1 | ❌ „Serio, ogarniesz." — infantylizacja |
| 2 (import) | O1, O2, O3 | ⚠️ wszystkie trzy milczą o braku importu hurtowego lub podmieniają pytanie (import → eksport) |
| 3 (rezygnacja) | O2 | ⚠️ odpowiada o subskrypcji, nie o losie danych |
| 4 (bezpieczeństwo) | O1, O2 | ❌ implikują Tarcza = ochrona kontaktów (Tarcza = etyczność treści, nie bezpieczeństwo danych) |
| 4 (bezpieczeństwo) | O3 | ❌ „dane leżą lokalnie" — fałsz (baza w chmurze) |
| 1 (łatwość) | O3 | ⚠️ brak nazwy funkcji (Pierwsze 90 Dni) |

Kluczowe rozstrzygnięcie panelu: pytanie 2 jest o WPROWADZENIE
istniejących kontaktów do systemu. Import z pliku nie działa (Storage
atrapa) → jedyna uczciwa odpowiedź mówi to wprost.

Pytanie 4: żaden zestaw nie miał uczciwej odpowiedzi. Synteza panelu nie
mówi o lokalizacji danych i nie przypisuje Tarczy roli, której nie ma.

## Najlepsze pytania (jej głos)

Wygrały pytania z O3 (obszary 1, 3, 4, 6) i O1 (obszary 2, 5) — panel
docenił zakotwiczenie lęku w doświadczeniu („znowu", „prawie nie siadam
do komputera", „mam dane klientek").

---

## SYNTEZA (finalista do decyzji właściciela)

**Para 1 — łatwość obsługi** *(P: 41 zn / O: 93 zn)*
P: Co jeśli znowu nie ogarnę nowej aplikacji?
O: Kreator wdrożeniowy prowadzi cię krok po kroku. Pierwsze 90 Dni dają ci gotowy plan na start.

**Para 2 — wprowadzenie istniejących kontaktów** *(P: 48 zn / O: 109 zn)*
P: A te kontakty, które już mam w innych miejscach?
O: Importu hurtowego nie ma — kontakty wpisujesz ręcznie lub przez formularz. Dane eksportujesz do vCard zawsze.

**Para 3 — dane po rezygnacji** *(P: 42 zn / O: 106 zn)*
P: A jeśli przestanę płacić — znikną mi dane?
O: Rezygnujesz kiedy chcesz. Eksportujesz kontakty do vCard, pobierasz CSV z rejestrem — wszystko jest twoje.

**Para 4 — bezpieczeństwo kontaktów** *(P: 40 zn / O: 119 zn)*
P: Mam dane klientek. Kto jeszcze je widzi?
O: Do twojego konta masz dostęp tylko ty. Tarcza kontroluje etyczność treści — Świadectwo SHA-256 rejestruje każdą zmianę.

**Para 5 — telefon** *(P: 45 zn / O: 93 zn)*
P: Prawie nie siadam do komputera — to zadziała?
O: Projektowane pod telefon od początku — nie ma okrojonej wersji. Otwierasz, działa jak trzeba.

**Para 6 — zgodność z zasadami firmy** *(P: 64 zn / O: 101 zn)*
P: Moja firma ma regulaminy. Czy mogę używać zewnętrznych narzędzi?
O: Paszport zgodności skanuje treść pod wymagania czterech jurysdykcji — ale ostatnie słowo ma twoje IT.

---

## Uwagi panelu do właściciela

1. **Para 2**: „Importu hurtowego nie ma" jest uczciwe, ale może być
   odczytane jako bariera wejścia. Jeśli import jest planowany, można
   dodać zdanie kierunku — decyzja właściciela; werdykt ocenia stan
   faktyczny.
2. **Para 4**: odpowiedź świadomie zachowawcza. „Masz dostęp tylko ty"
   = prawda dla konta pojedynczej użytkowniczki; zero twierdzeń
   o architekturze (bez „w UE", bez szyfrowania — do weryfikacji
   właściciela zanim padną).
3. **Spójność z filarami**: obawy używają „Świadectwo SHA-256", filary
   „podpis cyfrowy". Do ujednolicenia przy składaniu strony (rekomendacja:
   „podpis cyfrowy" na stronie głównej, SHA-256 w sekcji obaw dopuszczalne
   jako konkret techniczny odpowiadający na lęk o kontrolę).
