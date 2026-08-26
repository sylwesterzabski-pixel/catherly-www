# Manifest kadrów Higgsfield — fala 1

Data dostawy: **2026-08-26**. Zlecenie: `WWW/045`. Rola: implementacja.

## Adnotacja przejrzystości

**Obrazy w tym manifeście są GENEROWANE PRZEZ AI** (Higgsfield, model
`soul_2`), zatwierdzone przez właściciela **2026-08-26**.

Są **warstwą dekoracyjną i wyłącznie nią** (ADR-011). Nie pokazują
interfejsu aplikacji, nie udają zrzutów produktu i nie niosą informacji,
której nie ma w tekście obok. **Sprawdzone oglądem wszystkich dziesięciu**
przed osadzeniem: żaden kadr nie zawiera twarzy osoby, logotypu ani
elementu udającego interfejs — zakazy bezwzględne z `CLAUDE.md`.

## Pochodzenie i integralność

Pobrane `curl` z CloudFront (zero MCP — serwer `higgsfield` pozostaje
nieautoryzowany). Każdy plik sprawdzony po pobraniu: kod HTTP 200,
rozmiar > 0 i **nagłówek PNG `89504e470d0a1a0a`**. Sumy poniżej liczone
z pobranych bajtów źródłowych, przed jakąkolwiek konwersją.

| slot | job_id (nazwa pliku) | SHA-256 PNG źródła |
|---|---|---|
| `hero-16x9` | `hf_20260826_125100_cc03de6d-3e3d-4b37-b54f-0154d81c8503` | `c73835768ef5f19c0922b8d8a256444329e324967e1e21fe9dc13bd1a19f277f` |
| `hero-9x16` | `hf_20260826_131918_55d9c807-f60b-4a9e-bc98-5b7e64f092e9` | `cf0bb043f55c1f2bf731aa1c63d4419cf7e68f01c8352de7ff8cf36127295896` |
| `pozysk-A-4x5` | `hf_20260826_131810_3d3c32f7-13b8-4e94-857b-995077659d05` | `0f9a68d12176d4eda411d3601a14c2675896953f97e15ae83c5e08ad3d1bcee2` |
| `pozysk-B-4x5` | `hf_20260826_131810_19ae415b-0a07-4601-bc07-223ba812effd` | `1b511c6f305d5cbe21534a46be1d8e8d2bdece5bf5b7934f87eb1989a3481ad5` |
| `tresci-A-4x5` | `hf_20260826_131917_b3ec0919-8f4b-4275-8937-3e2ea40c7e29` | `2e2c52e9d5f3d7194f3fce6a7c0e70c5b5ca861830ba6390cbcc1996d4c06739` |
| `tresci-B-4x5` | `hf_20260826_131810_379f729d-a968-48be-9a76-6c3a7799d663` | `e7810ec4249d3167e9a7f9d828de3eaf96d97086f1da366d1335b5fd407caa74` |
| `zespol-A-4x5` | `hf_20260826_131809_f8e5e4a3-0f20-4c79-a6dd-01b4cf7df27b` | `d5de5e698b5b7bf7ac574f85cacf2460304fb095480aeee0fddef695f081029e` |
| `zespol-B-4x5` | `hf_20260826_131810_5128f3ce-3488-4f2a-8791-1da3e8cd3798` | `cdb37e1537ec830e8d5d7466a3f15c583bf52b18d707ffa596849f13d565fc1f` |
| `wyniki-A-4x5` | `hf_20260826_131809_2f701efc-7634-4b90-95d2-dbd13a75dee0` | `ea083f06c050c2c731e469623cec7fc19bca0fca16a6a2f7401097d9dcfe92c0` |
| `wyniki-B-21x9` | `hf_20260826_131918_f663e4e5-4bdb-4627-aa36-3f0cbcaa55fe` | `a4dbf8bc7425a86096ab559854db006d5869b8c1a50eb70766a3d517350a5a88` |

## Konwersja i wymiary

AVIF (`sharp`, `effort: 6`). Jakość dobierana **połowieniem do
NAJWYŻSZEJ mieszczącej się w limicie 120 kB** — nie pierwszej lepszej.
Narzędzia wiersza poleceń (`avifenc`, `cavif`, `magick`, `cwebp`) nie
istnieją w tym środowisku; `sharp` ma zapis AVIF, więc **fallback do
WebP nie był potrzebny**.

| slot | PNG źródło | AVIF | jakość | rozmiar AVIF | udział wagi PNG |
|---|---|---|---|---|---|
| `hero-16x9` | 2048×1152 | 1920×1080 | q=48 | **108.4 kB** | 2.8% |
| `hero-9x16` | 1152×2048 | 1600×2844 | q=48 | **116.3 kB** | 3.6% |
| `pozysk-A-4x5` | 1536×2048 | 1600×2133 | q=48 | **94.4 kB** | 1.9% |
| `pozysk-B-4x5` | 1536×2048 | 1600×2133 | q=59 | **110.0 kB** | 2.6% |
| `tresci-A-4x5` | 1536×2048 | 1600×2133 | q=53 | **88.0 kB** | 1.8% |
| `tresci-B-4x5` | 1536×2048 | 1600×2133 | q=51 | **116.8 kB** | 2.5% |
| `zespol-A-4x5` | 1536×2048 | 1600×2133 | q=65 | **107.6 kB** | 2.5% |
| `zespol-B-4x5` | 1536×2048 | 1600×2133 | q=51 | **118.1 kB** | 2.3% |
| `wyniki-A-4x5` | 1536×2048 | 1600×2133 | q=59 | **109.6 kB** | 2.5% |
| `wyniki-B-21x9` | 2048×1152 | 1920×1080 | q=61 | **115.2 kB** | 3.8% |

Razem: **1085 kB** wobec 41.8 MB źródeł. Największy plik: **118.1 kB** przy limicie 120 kB.

## Osadzenie

| slot | gdzie |
|---|---|
| `hero-16x9` | REZERWA — `public/obrazy/rezerwa/`, nieużywany |
| `hero-9x16` | REZERWA — `public/obrazy/rezerwa/`, nieużywany |
| `pozysk-A-4x5` | `/funkcje/pozyskiwanie`, moduł 1 (eager) |
| `pozysk-B-4x5` | `/funkcje/pozyskiwanie`, moduł 4 (lazy) |
| `tresci-A-4x5` | `/funkcje/tresci`, moduł 1 (eager) |
| `tresci-B-4x5` | `/funkcje/tresci`, moduł 4 (lazy) |
| `zespol-A-4x5` | `/funkcje/zespol`, moduł 1 (eager) |
| `zespol-B-4x5` | `/funkcje/zespol`, moduł 4 (lazy) |
| `wyniki-A-4x5` | `/funkcje/wyniki`, moduł 1 (eager) |
| `wyniki-B-21x9` | `/funkcje/wyniki`, pas szerokości (lazy) |

## Rozjazdy nazw wobec plików — zgłoszone, nie poprawione

Nazwy slotów pochodzą ze zlecenia i **nie zgadzają się z proporcjami**
dostarczonych plików. Nazw nie zmieniam, żeby ślad zlecenia został
czytelny, ale liczby muszą być prawdziwe:

- **`wyniki-B-21x9` ma w rzeczywistości 16:9** (1920×1080, nie 21:9).
  Pas szerokości rysuje się więc jako 16:9; gdyby miał być 21:9,
  potrzebne jest kadrowanie i osobna decyzja.
- **Kadry `-4x5` mają w rzeczywistości 3:4** (1536×2048, proporcja
  0,750 zamiast 0,800).

**Skutek kadrowania:** ramka modułu zachowuje proporcję **16/10** (rezerwa
CLS z briefu K12), a kadry pionowe wchodzą w nią przez `object-fit: cover`,
czyli **są przycinane**. Przycięcie jest świadome: alternatywa —
proporcja ramki równa proporcji pliku — dawałaby na 390 px kolumnę
obrazu wyższą niż kadr telefonu.

## Uwaga o treści kadru `wyniki-A-4x5`

Kadr pokazuje kalendarz ścienny, a **liczby na nim są zniekształcone**
(typowy artefakt generowania). Nie jest to naruszenie zakazu
„żadnych zmyślonych liczb" — ten zakaz dotyczy liczb TWIERDZĄCYCH coś
o produkcie, a kalendarz jest rekwizytem scenicznym bez treści
informacyjnej. Odnotowane, bo przy powiększeniu wygląda niechlujnie
i może wrócić jako uwaga projektowa.
