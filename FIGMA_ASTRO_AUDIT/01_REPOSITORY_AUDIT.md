# 01 — REPOSITORY AUDIT & ARCHITECTURE

## 1. INFORMAZIONI GENERALI SUL REPOSITORY
- **Path**: `C:\Users\valerio\Desktop\valeriocomella.github.io`
- **Framework**: Astro 4.16.18 (Static Site Generation)
- **Styling**: Tailwind CSS 3.4.17 + Custom CSS variables (`src/styles/swiss-tokens.css`)
- **Tipografia**: Google Fonts (`Alfa Slab One`, `Inter`, `JetBrains Mono`)
- **Asset Statici**: `public/assets/variant7/` (115+ asset SVG/PNG estratti nativamente da Figma)

## 2. MAPPA DELLE ROUTE
- `/` (`src/pages/index.astro`): Attiva per default su `Variant 7: Swiss Editorial CV`. Monta il layout `src/layouts/Variant7Layout.astro`.
- `/swiss-editorial` (`src/pages/swiss-editorial.astro`): Route dedicata e isolata per la Variant 7.
- `/cv-resume` (`src/pages/cv-resume.astro`): Visualizzazione PDF ed esportazione CV.
- `/projects/[...slug]` (`src/pages/projects/[...slug].astro`): Pagine di dettaglio dei singoli progetti (Violinum, Lock Fight, Rusheep, Sfuryatell, Il Rito, Please Open The Door).
- `/llms.txt`, `/robots.txt`, `/rss.xml`: Endpoint statici per indicizzazione e LLM accessibility.

## 3. COMPONENTI MODULARI ATTIVI (VARIANT 7)
- `src/layouts/Variant7Layout.astro`: Shell principale con scroll orizzontale nativo (`#horizontal-slider-container`), switch tema Dark/Light, audio engine Web Audio API, modal PDF e gestione viewport 1440px.
- `src/components/variant7/TopNavbar.astro`: Barra di navigazione superiore (Figma `83:1114`) con monogramma VC, controlli preferenze (SFX, Tema, Lingua) e pillole per CV, LinkedIn, GitHub.
- `src/components/variant7/FloatingNavRail.astro`: Dock di navigazione laterale destra (Figma `83:1102`) con selettore numerico a 7 sezioni e indicatore attivo rettangolare `#8B1E2D`.
- `src/components/variant7/Section01Hero.astro`: Sezione 01 // CHI SONO? con titolo in `Alfa Slab One`, sottotitolo `#8B1E2D`, mockup monitor standalone e carosello a 4 colonne Swiss Metrics Ledger.
- `src/components/variant7/Section02Profilo.astro`: Sezione 02 // COSA SO FARE? con griglia a 3 colonne (Game Dev & Engine, Full Stack Dev, Workflow Tooling & Design).
- `src/components/variant7/Section03Esperienze.astro`: Sezione 03 // DOVE HO LAVORATO? con griglia 2x2 di card aziendali (Skill Factory, L'ABCD, Protom, Katabasi Studio).
- `src/components/variant7/Section04Progetti.astro`: Sezione 04 // COSA HO CREATO? con 2 featured card (Violinum, Lock Fight), 3 card mediane (Rusheep, Sfuryatell, Project Works) e banner Game Jams.
- `src/components/variant7/Section05Formazione.astro`: Sezione 05 // COME MI SONO FORMATO? con 6 card accademiche (42 Roma, ITS, Volta, ISAS, Skill Factory, Protom) e 3 banner solidi certificazioni.
- `src/components/variant7/Section06CosaMiPiace.astro`: Sezione 06 // OLTRE IL CODICE? con 3 scaffali culturali (Videogiochi, Film, Serie TV) e footer estendibile.
- `src/components/variant7/Section07Contatto.astro`: Sezione 07 // RIMANIAMO IN CONTATTO? con canvas interattivo `RunnerAnteprimaDinamica.astro`.

## 4. STATO DEL CODICE LEGACY
- Le componenti storiche e le varianti legacy (Variant 1-6) rimangono intatte nelle directory `src/components/legacy/` e `src/layouts/Layout.astro` senza regressioni.
- La Variant 7 è completamente autocontenuta e modulare.
