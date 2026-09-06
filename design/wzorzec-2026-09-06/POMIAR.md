# Wzorzec finalny — tożsamość pliku i granica pomiaru

| | |
| --- | --- |
| plik | `glowna.png` |
| źródło | Element Higgsfield `5bbfd3ae-fd90-4779-a1dc-e7c01a28e622`, wskazany przez właściciela 06.09.2026 |
| wymiary | **1536 × 2752 px** |
| SHA-256 | `daa34f99af01a9a00c5c1038ae014be7a73ef4921681ef76d02ce26582aded8d` |
| pomiar | `docs/adr/065-wzorzec-finalny-pomiar-i-tokeny.md` |

⚠ **TO NIE JEST ZRZUT STRONY, TYLKO KOLAŻ DWUKOLUMNOWY.** Pas górny
(nawigacja, hero, sekcja „pamięć") zajmuje pełne 1536 px; wszystko poniżej
stoi w dwóch kolumnach po 768 px. Dowód: stopka zajmuje prostokąt
`x 769–1536`, czyli prawą połowę obrazu.

**Z tego pliku wolno odczytywać:** barwy, proporcje wewnątrz elementów,
odstępy i wcięcia liczone jako procent kontenera, proporcje sekcji.

**Nie wolno odczytywać:** rozmiarów pisma w pikselach ani bezwzględnej
szerokości kontenera — nie wiadomo, przy jakiej szerokości okna renderowano
pas górny. Pełne uzasadnienie i obie drogi dowodu: pozycja **T66** rejestru.

⚠ **Treść na obrazie jest miejscami zniekształcona** (karty cennika niosą
ciągi w rodzaju „Pianniojce treści", „Świadectwenncznocy"). Wzorzec jest
źródłem WYGLĄDU, nigdy treści — ta pochodzi z `content/` i ze Stripe'a.
