# 02 · VISUAL DESIGN REPORT
## Frame: Portfolio · Variant 7 · Swiss Editorial CV · PC · 1440
**Source:** Figma Local Bridge Direct Node Extraction  
**Analyst:** Agent 2 — Visual Design Analyst  
**Date:** 2026-11-18  

---

## 1. Color Palette & Token Architecture

Tutti i valori cromatici sono estratti direttamente dalle proprietà `fills` e `strokes` dei nodi Figma (gamma RGB normalizzata a 8-bit e codice esadecimale standard).

| Token Name | Hex Code | RGB Value | Opacity | Utilizzo Primario in Figma |
| :--- | :--- | :--- | :--- | :--- |
| **Editorial Crimson (Primary)** | `#8B1E2D` | `rgb(139, 30, 45)` | 100% | Accento primario, monogramma VC, titoletto ruolo, bordi attivi, badge text |
| **Crimson Bold (Secondary)** | `#B91C1C` | `rgb(185, 28, 28)` | 100% | Punti focali, ostacoli runner, bottoni CTA hover |
| **Badge Rose Tint** | `#FDF2F4` | `rgb(253, 242, 244)` | 100% | Background pill dei badge (`01 // CHI SONO?`, ecc.) |
| **Badge Border Rose** | `#FECDD3` | `rgb(254, 205, 211)` | 100% | Bordo perimetrale dei badge di sezione (1px stroke) |
| **Swiss Editorial Canvas** | `#FAF9F5` | `rgb(250, 249, 245)` | 100% | Background principale della canvas orizzontale e delle sezioni |
| **Charcoal Deep (Heading)** | `#0F172A` | `rgb(15, 23, 42)` | 100% | Titoli principali (52px, 32px), titoli delle card e testo principale |
| **Charcoal Body (Text)** | `#111827` | `rgb(17, 24, 39)` | 100% | Testo corpo bio, descrizioni progetti ed esperienze |
| **Muted Slate (Metadata)** | `#64748B` | `rgb(100, 116, 139)` | 100% | Sottotitoli, date, aziende, metadati tecnici e didascalie |
| **Border Neutral Subtle** | `#E5E7EB` | `rgb(229, 231, 235)` | 100% | Bordi delle card, separatori, frame perimetrali |
| **Surface White** | `#FFFFFF` | `rgb(255, 255, 255)` | 100% / 90% | Sfondo card contenitori, barra superiore (con blur) |
| **Telemetry Cyan (Runner)** | `#0284C7` | `rgb(2, 132, 199)` | 100% | Visore player XR nel mini-game, coordinate cursor telemetry |
| **Telemetry Cyan Dark** | `#0C4A6E` | `rgb(12, 74, 110)` | 100% | Sfondo ostacoli cubici e griglia telemetrica |

---

## 2. Typography & Font Hierarchy

### 2.1. Font Families Rilevati in Figma
- **Carattere Primario:** `Inter` (100% dei nodi testo analizzati in `17:6624`).
- **Pesi Utilizzati:**
  - `Regular` (Font Weight 400)
  - `Medium` (Font Weight 500)
  - `Semi Bold` (Font Weight 600)
  - `Bold` (Font Weight 700)
- **Monospace Telemetria:** `Fira Code` o `Inter tabular-nums` per telemetria coordinate e metadati numerici.

### 2.2. Scala Tipografica Rigorosa

| Livello / Ruolo | Font Size | Font Weight | Line Height | Letter Spacing | Esempio Testuale da Figma |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | `52 px` | Regular (400) | 1.15 | `-0.02em` | `VALERIO COMELLA` |
| **Section Title** | `32 px` | Bold (700) | 1.20 | `-0.01em` | `Il mio Stack`, `Esperienze Lavorative...` |
| **Ledger Metric Value**| `24 px` | Bold (700) | 1.10 | `-0.02em` | `100/100 LODE`, `1.200+ ORE` |
| **Role / Section Badge**| `20 px` | Semi Bold (600) / Bold (700) | 1.25 | `0em` | `SOFTWARE ENGINEER... / 01 // CHI SONO?` |
| **Card Heading** | `16 px` | Bold (700) | 1.30 | `0em` | `Docente Unity & C#`, `Violinum` |
| **Editorial Body** | `15 px` | Regular (400) | 1.50 | `0em` | Bio introduttiva sezione presentazione |
| **Subhead / Metadata** | `14 px` | Medium (500) | 1.40 | `0em` | `Roma, RM`, `2023 - Presente` |
| **Pill Tag / Stack** | `12 px` | Semi Bold (600) | 1.20 | `+0.01em` | `Unity (C#)`, `Java / Spring Boot` |
| **Ticker / Micro Badge**| `11 px` | Regular (400) / Medium | 1.20 | `+0.02em` | `ROTATING EDITORIAL DISPATCH`, `METER: 0048m` |
| **Mini Ledger Subtitle**| `10 px` | Regular (400) | 1.25 | `0em` | Descrizioni compresse metadati riepilogativi |

---

## 3. Spacing, Auto Layout & Geometry

### 3.1. Corner Radii
- **Barra Superiore (`34:2795`):** `16 px`
- **Card Grandi & Media (`17:6703`, `17:6942`, ecc.):** `16 px`
- **Card Standard Esperienze & Formazione:** `12 px`
- **Nav Rail Laterale (`44:3818`):** `8 px`
- **Tag Pills & Badge:** `6 px` o `9999 px` (rounded-full)
- **Certificazioni Badges:** `8 px`

### 3.2. Strokes & Borders
- **Spessore Bordo Standard:** `1 px`
- **Allineamento Bordo:** `INSIDE`
- **Bordi Accentati (Badge / Active State):** `1 px` o `1.5 px` in `#FECDD3` o `#8B1E2D`.

### 3.3. Padding & Spacing Patterns
- **Canvas Vertical Padding:** `96 px` top padding (per garantire clearance sotto la barra fissa di 56px a y: 28px).
- **Horizontal Section Gaps:** Sezioni sequential snap a `1440 px` di passo.
- **Card Internal Padding:**
  - Card grandi (Sezione 03, 04, 05): `padding: 24px`.
  - Swiss Metrics Ledger cards: `padding: 16px`.
  - Tag Pills: `padding: 4px 10px`.
  - Top Navbar: `padding: 0 16px`.

---

## 4. Shadows & Elevation Effects
- **Card Surface Effect:** Nessuna ombra pesante o drop shadow marcata; stile puramente Swiss Editorial Flat con bordi di precisione (`1px solid #E5E7EB`).
- **Floating Top Bar:** Effetto `backdrop-filter: blur(12px)` con `background: rgba(255, 255, 255, 0.90)` e sottile bordo `#E5E7EB`.
