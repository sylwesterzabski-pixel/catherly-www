/**
 * Zdejmuje znaczniki rich-text z wartości klucza i18n, zostawiając SŁOWA.
 *
 * Po co (ADR-033, R-AKCENT-03): od 2026-08-26 dwa nagłówki niosą w kluczu
 * znacznik `<akcent>…</akcent>`, który wyznacza fragment malowany akcentem.
 * Znacznik jest NOŚNIKIEM PODZIAŁU, nie treścią — słowa są dokładnie te
 * same, co przed zmianą, we wszystkich trzech językach.
 *
 * DLACZEGO TO NIE JEST OSŁABIENIE STRAŻNIKA „ZNAK W ZNAK". Porównania
 * messages ↔ content oraz messages ↔ wyrenderowany H2 mają pilnować
 * ZGODNOŚCI SŁÓW; znacznik prezentacyjny nie jest słowem i w renderze
 * nie występuje. Zdjęcie go przywraca porównaniu jego przedmiot zamiast
 * kazać mu porównywać dwie różne rzeczy. Siła asercji zostaje ta sama:
 * zmiana JEDNEJ litery w treści dalej daje czerwień.
 *
 * CZEGO NIE PILNUJE — wypisane, żeby zieleń nie była czytana szerzej:
 * poprawności samych znaczników (parzystość, nazwa, umiejscowienie).
 * Od tego jest `sprawdzZnaczniki` niżej, wołany w strażniku parytetu
 * znaczników w `zlozenie.spec.ts`.
 */
export function bezZnacznikow(s: string): string {
  return s.replace(/<\/?akcent>/g, "");
}

/**
 * Liczy i sprawdza znaczniki akcentu w łańcuchu.
 * Zwraca liczbę par oraz to, czy zapis jest poprawny (domknięty,
 * niezagnieżdżony, niepusty).
 */
export function sprawdzZnaczniki(s: string): {
  pary: number;
  poprawny: boolean;
  powod?: string;
} {
  const otwarcia = (s.match(/<akcent>/g) ?? []).length;
  const zamkniecia = (s.match(/<\/akcent>/g) ?? []).length;
  if (otwarcia !== zamkniecia)
    return { pary: 0, poprawny: false, powod: `${otwarcia} otwarć wobec ${zamkniecia} zamknięć` };
  if (otwarcia === 0) return { pary: 0, poprawny: true };
  if (/<akcent>[^<]*<akcent>/.test(s))
    return { pary: otwarcia, poprawny: false, powod: "znaczniki zagnieżdżone" };
  if (/<akcent>\s*<\/akcent>/.test(s))
    return { pary: otwarcia, poprawny: false, powod: "znacznik bez treści" };
  return { pary: otwarcia, poprawny: true };
}
