# Brief Etapu F: złożenie stron (pipeline 4.1)

Status: BRIEF wykonawczy — zakres z polecenia właściciela 2026-08-11
(Etap E przyjęty w całości). Push za zgodą zbiorczą na koniec etapu.

## Zakres

1. **S3 problem + S4 definicja** — instancje K3 (SekcjaTekstowa)
   na głównej; S3 z „kropką" (ostatnie zdanie w osobnej linii:
   „Wieczorem siadasz do zeszytu i liczysz, co z tego wyszło.").
2. **S10 rytm dnia — LUSTRO L1 (DECYZJA 6):** nowy komponent;
   tło akcentowe (rola-powierzchnia-akcentowa, pary 11,15/6,51:1
   z tokenów); TEN SAM szkielet kompozycyjny i skala typograficzna
   co S3 (miara-kolumny, H2 1.5rem, kropka 1.125/600 — wspólny
   duet W6); 3 kroki (Rano / W ciągu dnia / Wieczorem) — desktop:
   oś pozioma; kotwica „Wieczorem widzisz, co z tego wyszło."
   DOSŁOWNIE jako kropka (odpowiedź na S3 „…liczysz…").
3. **S11 K10 cennik w skrócie:** 3 plany z ceną miesięczną
   Z MIGAWKI (lib/cennik) + zdanie różnicy + link → /cennik;
   desktop trzy karty w rzędzie, mobile wiersze; ZERO tabeli,
   zero wyróżnień (ADR-003).
4. **S12 obawy:** instancja K8 (Faq) — 6 par z obawy.md.
5. **S13 K11 zamknięcie głównej:** CTA „Sprawdź, jak działa"
   → /funkcje + „Rezygnujesz w każdej chwili." (bez zdania
   prowadzącego — werdykt panelu pkt 25). **C8 zamknięcie /cennik:**
   zdanie §7 + CTA „Wybierz plan" → /login. Jeden komponent,
   props: zdanie?/cta/href.
6. **ADR-028 wymiary** (polecenie właściciela): tokeny
   promien-maly 0.25 / promien 0.5 / promien-pigulki 2rem
   + kontener-strony 70rem; próg układu 48rem = stała
   DOKUMENTOWANA (custom properties nie działają w @media);
   migracja komponentów na tokeny.
7. **ADR-027 krój pisma** (granica ADR-026 = ten etap):
   pomiar LCP lokalnie (Lighthouse, profil mobilny) jako dowód
   bazowy; PROPOZYCJA do decyzji właściciela na koniec etapu
   (rekomendacja w ADR; LHCI na preview — osobna zgoda).
8. POZA zakresem (decyzja właściciela — niewymienione): K12
   i wzorcowa podstrona /funkcje/pozyskiwanie.

## Kolejność sekcji głównej po złożeniu

S1 nav → S2 hero → S3 problem → S4 definicja → S5–S8 filary
(ramki do Z6) → S9 dbanie → S10 rytm (AKCENT) → S11 skrót →
S12 obawy → S13 zamknięcie → S14 stopka. /cennik: C2–C7 + C8.

## Wymagania twarde

- Lustro: S3 i S10 kończą się zdaniem wieczornym w osobnej linii
  tym samym duetem; RÓŻNI je wyłącznie ton tła (L1) i czasownik
  (liczysz/widzisz). Test lustra: computed background S10 =
  terakota-100; obie kropki obecne znak w znak.
- H1 pozostaje jedyny (hero); wszystkie nowe sekcje na h2.
- Aktualizacja testu struktury nagłówków (main h2: 4 filary +
  S9 sr-only + S3/S4/S10/S12sr?/S13? — wg HF) i strażników
  znak w znak (nowe przestrzenie messages ↔ content).
- Zero JS; obawy = details/summary (K8); LCP element bez zmian
  (H1 hero); nowe sekcje POD foldem.
- Parytet ×3 pełny; bramki komplet; adwersarz na ZŁOŻONYCH
  stronach na końcu.
