# ADR-021 — Własny minimalny serwer MCP jako adapter oficjalnego API Higgsfield

**Status: SZKIC (2026-08-09).** Decyzja ostateczna właściciela zapada
przy rozpoczęciu Fazy 4 — lub wcześniej, jeśli Higgsfield naprawi OAuth
(wtedy szkic zostaje uchylony bez implementacji).

## Kontekst
ADR-016 dopuszcza Higgsfield MCP jako kanał generacji obrazów. Oficjalny
hostowany serwer (`mcp.higgsfield.ai/mcp`) uwierzytelnia wyłącznie przez
OAuth — i ten przepływ dla Claude Code CLI kończy się błędem
`redirect_uri` po stronie Higgsfield (diagnoza 2026-08-09: rejestracja
dynamiczna klienta działa, ale warstwa autoryzacyjna MCP przekazuje
`client_id` i `redirect_uri` klienta 1:1 do nadrzędnego serwera Clerk
bez walidacji; błąd występuje za ścianą logowania, na kroku zgody lub
wymiany kodu). Bug zgłoszony do Higgsfield; termin naprawy poza naszą
kontrolą.

Alternatywy odrzucone: społecznościowe serwery MCP (kod osób trzecich,
któremu trzeba powierzyć klucz i sekret API — sprzeczne z duchem ADR-016
i prymatem nieodwracalnego w obszarze bezpieczeństwa); rezygnacja
z automatyzacji (generacja ręczna w przeglądarce nie skaluje się na
produkcję obrazów Fazy 4).

## Decyzja (szkic)
Jeżeli OAuth nie zostanie naprawiony przed rozpoczęciem Fazy 4, powstaje
własny, minimalny serwer MCP w tym repozytorium:

- **adapter, nie platforma**: opakowuje wyłącznie oficjalne REST API
  Higgsfield (`platform.higgsfield.ai`) — platformy już dopuszczonej
  w ADR-016; analogia do ADR-019 (narzędzie pomocnicze, nie nowa
  zależność platformowa),
- transport stdio, uruchamiany lokalnie z tego repo; zakres narzędzi
  minimalny: zlecenie generacji obrazu + odczyt statusu/wyniku — nic
  więcej,
- poświadczenia (`HIGGSFIELD_API_KEY`, `HIGGSFIELD_SECRET`
  z platform.higgsfield.ai) wyłącznie w `.env` — nigdy w repozytorium
  (granica bezwzględna),
- kod objęty tym samym reżimem co reszta repo: ESLint, przegląd, bramki
  CI; żadnych zależności spoza ADR-016/019.

## Konsekwencje
- Automatyzacja obrazów przestaje zależeć od buga OAuth po stronie
  Higgsfield; sekrety i kod pozostają pod naszą kontrolą i audytem.
- Koszt: utrzymanie adaptera (śledzenie zmian API Higgsfield) po naszej
  stronie do czasu naprawy OAuth.
- Z chwilą, gdy oficjalny konektor OAuth zadziała, staje się kanałem
  podstawowym, a adapter zostaje usunięty — ADR-021 przewiduje własne
  wygaśnięcie i nie wymaga wtedy nowego ADR.
- Do czasu decyzji: testy estetyki promptów (image-style.md) wykonywane
  ręcznie w przeglądarce — walidacja treści promptu jest niezależna od
  kanału wysyłki.

## Data
2026-08-09 (szkic na polecenie właściciela; diagnostyka OAuth w tle).
