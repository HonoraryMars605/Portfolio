# 03 · RESIDUAL DISCREPANCIES LIST
## Target: Portfolio · Variant 7 · Swiss Editorial CV · PC · 1440
**Analyst:** Agent 0 — Swarm Coordinator  
**Date:** 2026-11-18  

---

## 1. Discrepanze Risolte nel Corso della Missione
1. **Card Segnaposto Figma (Risolto):**
   - Tre card nel canvas Figma originale recavano il titolo esplicito *"Example for future card (non generare)"* (`36:3032`, `36:3062`, `36:3104`).
   - *Azione intrapresa:* Escluse tassativamente dalla compilazione Astro per preservare l'integrità del portfolio reale.
2. **Sostituzione Asset Mockup con Originali (Risolto):**
   - Precedentemente venivano usate icone generiche o segnaposto testuali.
   - *Azione intrapresa:* Estratti e collegati tutti i 117 asset SVG/PNG direttamente dai nodi Figma in `public/assets/variant7/`.
3. **Badge Certificazioni Sezione 05 (Risolto):**
   - Mancavano i tre badge ufficiali del gruppo `37:3140` (Epass 7 Moduli, NDG Linux Unhatched, Gaming Week).
   - *Azione intrapresa:* Implementata la shelf dedicata sotto la striscia Forma.Temp con SVG originali e label fedeli.

---

## 2. Discrepanze Tecniche Non Risolvibili per Limiti di Piattaforma (Documentate)
1. **Render Font Differenziale (Browser vs Figma Canvas):**
   - Figma utilizza il proprio motore di text rasterization interno (Skia/WebGL), mentre il browser utilizza il rasterizer del sistema operativo (DirectWrite su Windows / CoreText su macOS). Lievi scostamenti sub-pixel nel kerning e nell'anti-aliasing sono fisiologici.
2. **Parametri di Fisica e Web Audio:**
   - La canvas Figma è uno spazio grafico bidimensionale statico; la simulazione dinamica del salto del runner, le frequenze hertziane dei toni audio e i timing di transizione sono stati codificati nel runtime TypeScript rispettando le specifiche funzionali dell'utente.
