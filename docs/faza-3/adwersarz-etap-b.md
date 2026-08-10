# Protokół adwersarza: Etap B (K1/K3 + i18n + 404)

**Zakres:** diff 25c6e10..ffbc728 (implementacja K1/K3, i18n www,
strona 404). Trzy rundy (2026-08-10). Adwersarz wszystko uruchamiał
samodzielnie; mutacje weryfikowane empirycznie.

## Przebieg

- **Runda 1 (bd6d540):** COFAM. Blokery: B1 (linki menu → 404,
  bramka linków czerwona), B2 (404 pusta bez JS, bez lang).
  Istotne: I1 (aria-current martwy i nietestowany), I2 (test fokusa
  ślepy na token), I3 (parytet bez hrefów), I4 (stopka bez nazw
  dokumentów — rozjazd z HF). Drobne: D1–D5.
- **Runda 2 (50ad23c):** B2/I2/I3/D1 ZAMKNIĘTE (I2 mutacja
  udowodniona empirycznie). NOWE: N1 — naprawa B2 zepsuła
  kanonizację /pl (404 zamiast 307) + nieprawdziwy komentarz.
- **Runda 3 (ffbc728):** N1 ZAMKNIĘTE (mutacja łapana podwójnie;
  komentarze zgodne z kodem; zero regresji — tabela curl
  w raporcie). Suita: 40 passed / 2 known-failed.

## Werdykt końcowy

**ETAP B PRZYJĘTY PRZEZ WŁAŚCICIELA W CAŁOŚCI (2026-08-10)** —
po rundzie 4 (B1a/I4/I1/ADR-025/check-linki): bramka linków ZIELONA
(0 martwych), parytet ZIELONY, 68/70 testów (2 znane czerwienie
ścieżki zakupu przyjęte świadomie). Warunki akceptu z rundy 3
(historyczne, rozstrzygnięte):
1. B1 — decyzja właściciela (linki do nieistniejących stron;
   warianty: tekst / placeholdery / akcept czerwieni + poprawka
   check-linki o rewrite /pl→/).
2. I4 — decyzja właściciela (nazwy dokumentów prawnych w stopce:
   zatwierdzenie tłumaczeń i przywrócenie ALBO akcept redukcji
   z korektą HF i komentarza „1:1" w Stopka.tsx).
3. I1 — test aria-current wchodzi wraz z rozstrzygnięciem B1.
4. Znane czerwienie do akceptu ze świadomością: sciezka-zakupu ×2
   (Faza 5), bramka:linki (B1).

Odnotowane bez zmiany wagi: 307 vs 308 przy kanonizacji (kosmetyka
przy noindex; soczewka SEO później); ślepe 404 dla ścieżek poza
matcherem (/login, pliki z kropką) — spięte z B1/F5.

## Zamknięte wykonawczo

B2 (404: pełny HTML bez JS ×3 języki, status propagowany, twarde
testy przez request.get), I2 (asercja koloru obrysu fokusa —
mutacja UA-default czerwieni test), I3 (hrefy per język wprost),
N1 (kanonizacja /pl z podwójnym strażnikiem), D1 (skip-link:
ukrycie + aktywacja), D2 (pary kontrastowe stopki 7,07–12,36:1),
D4 (noindex w rejestrze — checklista premiery).
