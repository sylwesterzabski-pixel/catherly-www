#!/usr/bin/env bash
# Backup repozytorium catherly-www na zewnętrzny SSD (trzecia kopia obok
# lokalnego gita i GitHuba). Zasada odporności: niepowodzenie NIGDY nie
# jest ciche — każdy błąd kończy się komunikatem "backup nieudany: <powód>"
# i kodem wyjścia != 0. Cichy brak backupu usypia czujność.
set -euo pipefail

DYSK="/Volumes/Extreme SSD"
CEL="$DYSK/Catherly-www-ZIP"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
STEMPEL="$(date +%Y-%m-%d-%H%M)"
PLIK="catherly-www-$STEMPEL.zip"

blad() {
  echo "backup nieudany: $1" >&2
  exit 1
}

[ -d "$DYSK" ] || blad "dysk niepodłączony ($DYSK nie istnieje)"
mkdir -p "$CEL" 2>/dev/null || blad "nie można utworzyć folderu $CEL"

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

# Dowód, nie przekonanie: test integralności archiwum po zapisie.
unzip -t -qq "$CEL/$PLIK" >/dev/null 2>&1 || {
  rm -f "$CEL/$PLIK"
  blad "archiwum nie przechodzi testu integralności"
}

ROZMIAR="$(du -h "$CEL/$PLIK" | cut -f1 | tr -d ' ')"
echo "backup OK: $PLIK ($ROZMIAR) → $CEL"
