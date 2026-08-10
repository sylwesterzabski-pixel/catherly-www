import styles from "./PasekPotwierdzen.module.css";

type Props = {
  /** Krótkie frazy potwierdzeń — treść przychodzi z messages
   *  (źródło: content/naglowek.md); komponent nie zna treści. */
  pozycje: readonly string[];
  /** Klasa kontekstu użycia (np. odstęp w hero) — K9 jest reużywany
   *  (/cennik w etapie E), więc odstępy należą do miejsca użycia. */
  klasa?: string;
};

/**
 * K9 — pasek potwierdzeń (markup wg HF docs/faza-3/hf/k2-hero.html,
 * po panelu 2026-08-10). role="list" jawnie: Safari/VoiceOver zdejmuje
 * semantykę listy przy list-style: none. Zero JS.
 */
export function PasekPotwierdzen({ pozycje, klasa }: Props) {
  return (
    <ul
      role="list"
      className={klasa === undefined ? styles.pasek : `${styles.pasek} ${klasa}`}
    >
      {pozycje.map((pozycja) => (
        <li key={pozycja}>{pozycja}</li>
      ))}
    </ul>
  );
}
