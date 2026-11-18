# 03 · ASSET INVENTORY & EXPORT LOG
## Frame: Portfolio · Variant 7 · Swiss Editorial CV · PC · 1440
**Analyst:** Agent 3 — Asset Extraction Specialist  
**Total Assets Mapped:** 117  
**Location:** `FIGMA_ASTRO_AUDIT/assets/` and `FIGMA_ASTRO_AUDIT/previews/`  
**Date:** 2026-11-18  

---

## 1. Executive Summary Asset Extraction
Tutti gli asset visivi del frame `17:6624` sono stati censiti e serializzati direttamente dal bridge Figma locale senza perdite o ridisegni arbitrari.

- **Totale Previews di Sezione Esportate:** 10 file PNG ad alta fedeltà.
- **Totale Vettori / Icone / Immagini Esportati:** 117 nodi estratti in `SVG` e `PNG`.
- **Errori di Esportazione:** 0.

---

## 2. Canvas & Section Previews

| File Name | Node ID | Original Dimensions | Export Scale | Description |
| :--- | :--- | :--- | :--- | :--- |
| `00_full_canvas_10080x1256.png` | `17:6624` | 10080 x 1256 px | 0.15x | Overview completa dell'intera canvas orizzontale a 7 sezioni |
| `01_presentazione_1440x1256.png` | `17:6663` | 1440 x 1256 px | 0.50x | Preview Sezione 01 (Hero, Bio, Rotating Dispatch, Ledger) |
| `02_competenze_1440x1256.png` | `17:6710` | 1440 x 1256 px | 0.50x | Preview Sezione 02 (Stack Tecnologico a 3 colonne) |
| `03_esperienze_1440x1256.png` | `17:6806` | 1440 x 1256 px | 0.50x | Preview Sezione 03 (Esperienze professionali) |
| `04_progetti_1440x1256.png` | `17:6935` | 1440 x 1256 px | 0.50x | Preview Sezione 04 (Portfolio progetti) |
| `05_formazione_1440x1256.png` | `17:7040` | 1440 x 1256 px | 0.50x | Preview Sezione 05 (Formazione accademica e certificazioni) |
| `06_interessi_1440x1256.png` | `17:7166` | 1440 x 1256 px | 0.50x | Preview Sezione 06 (Interessi personali, film, giochi, serie) |
| `07_contatti_1440x1256.png` | `65:614` | 1440 x 1256 px | 0.50x | Preview Sezione 07 (Runner interattivo, contatti e GDPR) |
| `nav_barra_superiore_1400x56.png`| `34:2795` | 1400 x 56 px | 1.00x | Floating top navbar pill (Monogramma + 6 controlli) |
| `nav_barra_laterale_45x282.png` | `44:3818` | 45 x 282 px | 1.00x | Floating right vertical rail (01 - 07 dock) |

---

## 3. Notable Vector & Image Assets Inventory

### 3.1. Immagini Raster (Fills `type: IMAGE`)
- `17_6705_Immagine___Presentazione.png` (Hero CRT / Retro computer visual)
- `17_6944_Immagine_progetto___Violinum.png` (VR Selection poster)
- `17_6962_Immagine_progetto___Lock_Fight.png` (Turn-based tactics cover)
- `17_6981_Immagine_progetto___Rusheep.png` (2D runner cover)
- `17_6995_Immagine_progetto___Sfuryatell.png` (Arcade game cover)
- `17_7011_Immagine_progetto___Project_Wo.png` (XR multi-target cover)
- `44_4029`..`44_4138`: Locandine di riferimento per film, serie TV e giochi (The Last of Us, Mass Effect, Gears of War, Blade Runner, Children of Men, Interstellar, World War Z, Star Trek, Severance, Arcane).

### 3.2. Loghi & Monogrammi Identitari
- `17_6817_Identit____Monogramma.svg` (Monogramma VC 31x32px `#8B1E2D`)
- `17_7051_Icona___42_Roma_ELIS.svg` (Logo 42 Roma Luiss/ELIS)
- `17_7080_Icona___ITS_Lazio_Digital.svg` (Logo ITS Lazio Digital)
- `17_7109_Icona___ITIS_Alessandro_Volta.svg` (Logo ITIS Alessandro Volta)
- `17_7137_Icona___ISAS_Videogames_Academ.svg` (Logo ISAS)
- `65_894_Icona___Skill_Factory.svg` (Logo Skill Factory)
- `65_924_Icona___Protom.svg` (Logo Protom Group)
- `17_6908_Icona___Katabasi_Studio.svg` (Logo Katabasi Studio)

### 3.3. Icone Tecnologie & Tooling
- Unity (C#), Unreal Engine 5, Java & Spring Boot, PostgreSQL & MySQL, HTML5/CSS3/JS, C & Python, Git & GitHub, Figma & Canva, Trello & Notion, AI & Prompt Engineering, Visual Studio / VS Code.

### 3.4. Runner Mini-Game Sprite Nodes (`65:744`)
- Visore (`65_757`), Corpo (`65_758`), Braccio (`65_759`), Gambe (`65_760`, `65_761`), Sagome ostacoli (`65_763`..`65_769`), Linea e tracce terreno (`65_748`..`65_755`).

---

## 4. Limiti ed Elementi Non Esportabili via MCP
- **Font Files (.woff2 / .ttf):** `Inter` e `Fira Code` non sono incorporati come stream binari nel file Figma ma referenziati per nome; vengono serviti via CDN Google Fonts o pacchetti npm standard.
- **Video Embeds:** I video dei progetti sono puntatori esterni (YouTube / stream mp4) e non file binari Figma.
