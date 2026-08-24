#!/usr/bin/env bash
# Backup repozytorium catherly-www na zewnętrzny SSD (trzecia kopia obok
# lokalnego gita i GitHuba). Zasada odporności: niepowodzenie NIGDY nie
# jest ciche — każdy błąd kończy się komunikatem "backup nieudany: <powód>"
# i kodem wyjścia != 0. Cichy brak backupu usypia czujność.
#
# ── Kopie milowe: podfolder, nie tylko nazwa (decyzja właściciela 2026-08-16) ──
# Ten skrypt robi WYŁĄCZNIE migawki rotacyjne, prosto w $CEL. Migawka
# oznaczona przez właściciela jako kamień milowy trafia do $CEL/KAMIENIE-MILOWE/
# i nosi w nazwie NIE-USUWAC (patrz CLAUDE.md, "Backup po każdym zadaniu").
# Rozdział jest mechaniczny: katalog rotacyjny liczy dziś ponad 200 migawek
# i posprzątanie go wzorcem `catherly-www-*.zip` jest kwestią czasu — kopia
# milowa ma być poza zasięgiem tego globu, nie tylko opatrzona prośbą.
# Konsekwencja dla tego pliku: jeżeli kiedyś dojdzie tu automatyczna rotacja
# (kasowanie migawek starszych niż N), MUSI ona działać z `-maxdepth 1`
# i nie schodzić do KAMIENIE-MILOWE/. Rotacja bez tego ograniczenia zjada
# dokładnie to, co miało przeżyć najdłużej.
set -euo pipefail

DYSK="/Volumes/Extreme SSD"
CEL="$DYSK/Catherly-www-ZIP"
MILOWE="$CEL/KAMIENIE-MILOWE"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
STEMPEL="$(date +%Y-%m-%d-%H%M)"
PLIK="catherly-www-$STEMPEL.zip"

blad() {
  echo "backup nieudany: $1" >&2
  exit 1
}

[ -d "$DYSK" ] || blad "dysk niepodłączony ($DYSK nie istnieje)"
mkdir -p "$CEL" 2>/dev/null || blad "nie można utworzyć folderu $CEL"
# Dom dla kopii milowych zakładamy tutaj, choć ten skrypt ich nie tworzy:
# konwencja, której katalog nie istnieje, zostaje złamana przy pierwszym
# użyciu po przepięciu dysku — kopia milowa wyląduje wtedy w rotacyjnych.
mkdir -p "$MILOWE" 2>/dev/null || blad "nie można utworzyć folderu $MILOWE"

# Całe repo łącznie z .git; wykluczone: node_modules oraz artefakty
# buildów i Playwrighta (cache przeglądarek Playwrighta żyje poza repo,
# w ~/Library/Caches, więc do ZIP-a i tak nie trafia).
# Ten sam stempel minutowy = świeża migawka, nie doklejanie do starego ZIP-a.
rm -f "$CEL/$PLIK"
cd "$REPO"
if ! zip -r -q "$CEL/$PLIK" . \
  -x "node_modules/*" \
  -x ".next/*" \
  -x "out/*" \
  -x "test-results/*" \
  -x "playwright-report/*" \
  -x ".lighthouseci/*" \
  -x ".env" \
  -x ".env.*" \
  -x ".vercel/*"; then
  rm -f "$CEL/$PLIK"
  blad "zip zakończył się błędem (brak miejsca albo błąd zapisu)"
fi

# T43 (2026-08-24). Wykluczenie `.env.*` wycinało też `.env.example` — plik
# ŚLEDZONY w gicie. Skutkiem było archiwum, z którego odtworzenie daje repo
# z `D .env.example`, czyli zmianą, której nikt nie wprowadził; odtwarzający
# po awarii uznaje, że sam skasował plik.
#
# Kolejność jest tu całą treścią: NAJPIERW wyklucz wszystko (`.env`,
# `.env.*`), POTEM dołóż z powrotem jedną nazwę z listy. Odwrotnie — zawężając
# wzorzec wykluczenia — nowy plik `.env.cokolwiek` z sekretami trafiłby na SSD
# i nikt by tego nie zauważył. Domyślnie odmawiamy; wyjątek jest imienny.
DOZWOLONE_ENV=(".env.example")
for plik in "${DOZWOLONE_ENV[@]}"; do
  [ -f "$plik" ] || continue
  zip -q -u "$CEL/$PLIK" "$plik" || {
    rm -f "$CEL/$PLIK"
    blad "nie udało się dołożyć $plik do archiwum"
  }
done

# Dryf listy wyjątków wykrywa się GŁOŚNO, nie po cichu. Jeśli git śledzi
# jakiś `.env*` spoza listy, to albo trzeba go dopisać (i wtedy wraca do
# migawek), albo ktoś przez pomyłkę dodał do repozytorium plik z sekretami —
# obie sytuacje wymagają decyzji człowieka, a nie milczącego pominięcia.
while IFS= read -r sledzony; do
  [ -n "$sledzony" ] || continue
  dozwolony=nie
  for plik in "${DOZWOLONE_ENV[@]}"; do
    [ "$sledzony" = "$plik" ] && dozwolony=tak
  done
  if [ "$dozwolony" = nie ]; then
    echo "UWAGA: git śledzi '$sledzony', a nie ma go na liście wyjątków" >&2
    echo "       → NIE trafił do migawki. Dopisz go do DOZWOLONE_ENV" >&2
    echo "       albo sprawdź, czy nie zawiera sekretów (T43)." >&2
  fi
done < <(git ls-files -- '.env*' 2>/dev/null)

# Dowód, nie przekonanie: test integralności archiwum po zapisie.
unzip -t -qq "$CEL/$PLIK" >/dev/null 2>&1 || {
  rm -f "$CEL/$PLIK"
  blad "archiwum nie przechodzi testu integralności"
}

ROZMIAR="$(du -h "$CEL/$PLIK" | cut -f1 | tr -d ' ')"
echo "backup OK: $PLIK ($ROZMIAR) → $CEL"
