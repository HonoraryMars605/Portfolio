# 01 · FIGMA STRUCTURE REPORT
## Frame: Portfolio · Variant 7 · Swiss Editorial CV · PC · 1440
**Node ID:** `17:6624`  
**Source File:** *Valerio Comella - Portfolio* (Page 1)  
**Analyst:** Agent 1 — Figma Structure Analyst  
**Date:** 2026-11-18  

---

## 1. Frame Overview & Root Geometry
- **Figma Node ID:** `17:6624`
- **Type:** `FRAME`
- **Canvas Width:** `10080 px`
- **Canvas Height:** `1256 px`
- **Origin Coordinates:** `X: 40`, `Y: -3`
- **Layout Model:** Fixed Horizontal Canvas Strip containing 7 primary sequential slides of `1440 x 1256 px` each, overlaid with 2 fixed floating navigation bars.
- **Total Child Count:** 9 top-level children (7 sections + 2 floating overlays).
- **Total Descendant Nodes:** 900 nodes (453 Frames, 398 Text nodes, 13 Instances, 19 Vectors, 13 Ellipses, 4 Groups).

---

## 2. Top-Level Hierarchy Breakdown

| Child Index | Node ID | Node Name | Type | Width (px) | Height (px) | Relative X (px) | Relative Y (px) | Purpose / Role |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | `17:6663` | `01 · Presentazione` | FRAME | 1440 | 1256 | 0 | 0 | Sezione Hero, Profilo, Rotazione Dispatch, Swiss Metrics Ledger |
| **02** | `17:6710` | `02 · Competenze` | FRAME | 1440 | 1256 | 1440 | 0 | Sezione Stack Tecnologico a 3 colonne |
| **03** | `17:6806` | `03 · Esperienze professionali` | FRAME | 1440 | 1256 | 2880 | 0 | Sezione Esperienze lavorative (4 card reali) |
| **04** | `17:6935` | `04 · Progetti` | FRAME | 1440 | 1256 | 4320 | 0 | Sezione Portfolio opere videoludiche (6 card reali) |
| **05** | `17:7040` | `05 · Formazione e certificazioni` | FRAME | 1440 | 1256 | 5760 | 0 | Sezione Istruzione, corsi e certificazioni |
| **06** | `17:7166` | `06 · Interessi personali` | FRAME | 1440 | 1256 | 7200 | 0 | Sezione Oltre il codice (3 caroselli tematici) |
| **07** | `65:614` | `07 · Contatti e crediti` | FRAME | 1440 | 1256 | 8640 | 0 | Sezione Runner canvas, contatti e footer GDPR |
| **Nav 1** | `34:2795` | `Navigazione / Barra superiore` | FRAME | 1400 | 56 | 21 | 28 | Barra navigazione superiore fissa (pill floating) |
| **Nav 2** | `44:3818` | `Navigazione / Barra laterale` | FRAME | 45 | 282 | 1384 | 450 | Dock navigazione laterale fissa con indicatori 01-07 |

---

## 3. Detailed Structural Analysis Per Section

### 3.1. Sezione 01 · Presentazione (`17:6663`)
- **Dimensions:** 1440 x 1256 px
- **Sub-Containers:**
  1. **Header Badge Group (`20:2598`):**
     - Badge Frame: `20:2599` (242 x 34 px) -> Text: `01 // CHI SONO?`
     - Headline Group: Title `VALERIO COMELLA` (52px, node `17:6667`), Role `SOFTWARE ENGINEER | UNITY (C#) & FULL STACK DEVELOPER` (20px, node `17:6668`, color `#8B1E2D`).
  2. **Rotating Dispatch Container (`20:2603`):**
     - Dimensions: 808 x 38 px.
     - Auto Layout: `HORIZONTAL`, gap: 12px, padding: [6, 16, 6, 16].
     - Ticker pill con icona `✦` e testo scorrevole.
  3. **Visual Media Card (`17:6703`):**
     - Dimensions: 504 x 274 px.
     - Radius: 16px. Border: 1px solid `#E5E7EB`.
     - Inner Image (`17:6705`): Retrò CRT / setup fotografico.
  4. **Swiss Metrics Ledger Container (`63:322`):**
     - Dimensions: 1312 x 190 px (x: 64, y: 1010).
     - Auto Layout: `HORIZONTAL`, gap: 16px.
     - Holds 8 structured cards (316 x 140 px each) in 2 logical pages of 4 columns.

### 3.2. Sezione 02 · Competenze (`17:6710`)
- **Dimensions:** 1440 x 1256 px
- **Header:** Badge `02 // COSA SO FARE?` (`20:2605`), Title `Il mio Stack` (32px Bold), Subtitle (15px Regular).
- **3-Column Architecture:**
  1. `GAME DEV & ENGINE` (`17:6717`, 421 x 204 px, gap: 12px): Unity (C#), Unreal Engine 5, XR SDKs & zSpace.
  2. `FULL STACK DEV` (`17:6746`, 421 x 340 px, gap: 12px): Java & Spring Boot, PostgreSQL & MySQL, HTML5/CSS3/JS, C & Python.
  3. `WORKFLOW, TOOLING & DESIGN` (`17:6781`, 421 x 408 px, gap: 12px): Git & GitHub, Figma & Canva, Trello/Notion, AI & Prompt Eng.

### 3.3. Sezione 03 · Esperienze professionali (`17:6806`)
- **Dimensions:** 1440 x 1256 px
- **Header:** Badge `03 // DOVE HO LAVORATO?` (`20:2607`), Title `Esperienze Lavorative & Percorso Professionale` (32px Bold).
- **2x2 Grid Layout:**
  - Card 1: Skill Factory (`17:6813`, 644 x 243 px)
  - Card 2: L'ABCD Edutainment (`17:6844`, 644 x 243 px)
  - Card 3: Protom Group (`17:6875`, 644 x 243 px)
  - Card 4: Katabasi Studio (`17:6906`, 644 x 243 px)
- **Placeholders Detected (EXCLUDED):**
  - `36:3032` - `Modello futuro 01` (Title: "Example for future card (non generare)")
  - `36:3062` - `Modello futuro 02` (Title: "Example for future card (non generare)")

### 3.4. Sezione 04 · Progetti (`17:6935`)
- **Dimensions:** 1440 x 1256 px
- **Header:** Badge `04 // COSA HO CREATO?` (`20:2609`), Title `Portfolio Opere & Produzioni Videoludiche` (32px Bold).
- **Layout Tiers:**
  - Row 1 (2 Major Cards, 644px wide): Violinum (`17:6942`, 644 x 430 px), Lock Fight (`17:6960`, 644 x 419 px).
  - Row 2 (3 Secondary Cards, 421px wide): Rusheep (`17:6979`, 421 x 336 px), Sfuryatell (`17:6993`, 421 x 336 px), Project Works ITS (`17:7009`, 421 x 336 px).
  - Row 3 (1 Full-width Banner, 1312px wide): Game Jams & Portfolio Web (`17:7025`, 1312 x 162 px).
- **Placeholders Detected (EXCLUDED):**
  - `36:3104` - `Modello futuro` (Title: "Example for future card (non generare)")

### 3.5. Sezione 05 · Formazione e certificazioni (`17:7040`)
- **Dimensions:** 1440 x 1256 px
- **Header:** Badge `05 // COME MI SONO FORMATO?` (`20:2611`), Title `Istruzione, Alta Formazione, Specializzazioni & Certificazioni` (32px Bold).
- **Academic & Specialization Grid (6 Cards, 644 x 243 px each):**
  - Card 1: 42 Roma Luiss / ELIS (`17:7047`)
  - Card 2: ITS Lazio Digital (`17:7076`)
  - Card 3: ITIS Alessandro Volta (`17:7105`)
  - Card 4: ISAS Videogames Academy (`17:7133`)
  - Card 5: Skill Factory Forma.Temp 240h (`65:890`)
  - Card 6: Protom Forma.Temp 160h (`65:920`)
- **Certification Badges Shelf (`37:3141`):**
  - Badge 1: Epass 7 Moduli User (`37:3142`, 219 x 82 px)
  - Badge 2: NDG Linux Unhatched (`37:3148`, 229 x 82 px)
  - Badge 3: Gaming Week Specialization (`37:3154`, 195 x 82 px)

### 3.6. Sezione 06 · Interessi personali (`17:7166`)
- **Dimensions:** 1440 x 1256 px
- **Header:** Badge `06 // OLTRE IL CODICE?` (`20:2613`), Title `Cosa Mi Piace Nel Mio Tempo Libero` (32px Bold).
- **3 Thematic Shelves:**
  - Shelf 1 (`44:4023`): Giochi Preferiti (The Last of Us, Mass Effect, Gears of War)
  - Shelf 2 (`44:4050`): Film di Riferimento (Blade Runner, Children of Men, Interstellar, World War Z)
  - Shelf 3 (`44:4104`): Serie TV (Star Trek, Severance, Arcane)
- **Footer Pill Notices:**
  - `*È solo un assaggio: la lista completa andrebbe in overflow!`
  - `COMING SOON: NUOVE SEZIONI E LISTA IN AGGIORNAMENTO [+]`

### 3.7. Sezione 07 · Contatti e crediti (`65:614`)
- **Dimensions:** 1440 x 1256 px
- **Header:** Badge `07 // RIMANIAMO IN CONTATTO?` (`65:616`), Title `Grazie per avere visitato il mio potfolio!` (32px Bold), Subtitle (`65:620`, 15px Regular).
- **Interactive Component Container (`65:744`):**
  - Name: `Runner / Anteprima Dinamica` (1311 x 172 px)
  - Sub-elements: Ground line, tracks, XR player visor/body/legs, obstacles (bugs, cubes, spikes), HUD meter counter.
- **Contact Info & Legal Row:**
  - Contact Details Card: email, phone, location (Roma / Napoli 2002), license.
  - Quick Action Buttons: Email, LinkedIn, GitHub, CV Viewer.
  - GDPR Legal Text (`65:879`): *"© 2026 Valerio Comella. Autorizzo il trattamento dei miei dati personali ai sensi del Gdpr 679/16 e del D.lgs 196/03..."*

---

## 4. Floating Navigation Overlays

### 4.1. Top Navigation Bar (`34:2795`)
- **Dimensions:** 1400 x 56 px
- **Position:** Fixed at `X: 21`, `Y: 28`
- **Corner Radius:** 16px
- **Fills:** `#FFFFFF` with 90% opacity (`rgba(255, 255, 255, 0.90)`), background blur: 12px.
- **Border:** 1px solid `#E5E7EB`.
- **Children:**
  - Left: Monogram `VC` (`34:2797`, 31 x 32 px, fill `#8B1E2D`).
  - Right Controls Group (`34:2800`):
    - `🔊 SFX ON` (`34:2801`, 84 x 54 px)
    - `🌓 Dark/Light` (`34:2807`, 101 x 54 px)
    - `🌐 ITA/EN` (`34:2813`, 81 x 54 px)
    - `CV` (`34:2819`, 49 x 54 px)
    - `Linkedin` (`34:2825`, 78 x 54 px)
    - `GitHub` (`34:2831`, 71 x 54 px)

### 4.2. Vertical Nav Rail (`44:3818`)
- **Dimensions:** 45 x 282 px
- **Position:** Docked at `X: 1384`, `Y: 450` (vertically centered on right edge)
- **Corner Radius:** 8px
- **Border:** 1px solid `#E5E7EB`
- **Items:** Previous (`‹`), Indicators (`01`, `02`, `03`, `04`, `05`, `06`, `07`), Next (`›`).
