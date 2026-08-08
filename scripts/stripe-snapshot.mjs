#!/usr/bin/env node
/**
 * Bramka: Cennik — snapshot Stripe ↔ strona (Prawo 1; PLAN.md sekcja 5).
 * Stripe WYŁĄCZNIE w trybie testowym i wyłącznie odczyt (granica bezwzględna).
 * Pobiera aktywne produkty i ceny (obie waluty per ADR-012), porównuje
 * z zapisanym snapshotem content/cennik-snapshot.json; rozjazd = czerwień.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SNAPSHOT = join(ROOT, "content", "cennik-snapshot.json");
const KLUCZ = process.env.STRIPE_TEST_SECRET_KEY;

if (!KLUCZ) {
  console.error(
    "✗ Brak STRIPE_TEST_SECRET_KEY w środowisku.\n" +
      "  Integracja po stronie właściciela (klucz TESTOWY, tylko odczyt).\n" +
      "  Bramka cennika CZERWONA."
  );
  process.exit(1);
}

if (!KLUCZ.startsWith("sk_test_") && !KLUCZ.startsWith("rk_test_")) {
  console.error(
    "✋ PRZERWANO: wykryto klucz, który nie jest kluczem TESTOWYM Stripe.\n" +
      "   Klucz produkcyjny jest w tym repozytorium nielegalny (granica\n" +
      "   bezwzględna, sekcja 2 promptu startowego). Nie wykonano ŻADNEGO\n" +
      "   wywołania API. Zgłoś to właścicielowi."
  );
  process.exit(2);
}

const { default: Stripe } = await import("stripe");
const stripe = new Stripe(KLUCZ);

// Wyłącznie odczyt: list products + list prices.
const produkty = await stripe.products.list({ active: true, limit: 100 });
const ceny = await stripe.prices.list({ active: true, limit: 100 });

const aktualny = {
  plany: produkty.data
    .map((p) => ({
      id: p.id,
      nazwa: p.name,
      ceny: ceny.data
        .filter((c) => c.product === p.id)
        .map((c) => ({
          id: c.id,
          waluta: c.currency,
          kwota_brutto: c.unit_amount,
          interwal: c.recurring?.interval ?? null,
        }))
        .sort((a, b) => a.id.localeCompare(b.id)),
    }))
    .sort((a, b) => a.id.localeCompare(b.id)),
};

if (!existsSync(SNAPSHOT)) {
  writeFileSync(SNAPSHOT, JSON.stringify(aktualny, null, 2) + "\n");
  console.log(`Zapisano pierwszy snapshot: ${SNAPSHOT}. Uruchom bramkę ponownie, by porównać.`);
  process.exit(0);
}

const zapisany = readFileSync(SNAPSHOT, "utf8");
const nowy = JSON.stringify(aktualny, null, 2) + "\n";
if (zapisany !== nowy) {
  console.error(
    "✗ Rozjazd snapshot ↔ Stripe. Źródłem prawdy jest Stripe (Prawo 1):\n" +
      "  zaktualizuj snapshot świadomym commitem, nigdy ręczną edycją cen na stronie.\n" +
      "  Bramka cennika CZERWONA."
  );
  process.exit(1);
}
console.log("Cennik: zielony (snapshot zgodny ze Stripe, tryb testowy, odczyt).");
