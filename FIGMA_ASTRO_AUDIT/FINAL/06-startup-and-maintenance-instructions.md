# 06 · STARTUP AND MAINTENANCE INSTRUCTIONS
## Portfolio · Variant 7 · Swiss Editorial CV · PC · 1440
**Date:** 2026-11-18  

---

## 1. Requisiti di Sistema
- **Node.js:** Versione >= 18.x (consigliata 20.x o superiore).
- **Package Manager:** `npm` (o `pnpm` / `yarn`).
- **Browser Consigliato:** Qualsiasi browser moderno Chromium-based, Safari o Firefox con supporto Web Audio API e Canvas 2D.

---

## 2. Avvio dell'Ambiente di Sviluppo
Dalla root del repository:
```bash
# 1. Installazione dipendenze (se eseguita da clone pulito)
npm install

# 2. Avvio del server di sviluppo Astro
npm run dev
```
Il portfolio sarà disponibile all'indirizzo:  
👉 **`http://localhost:4321/`** (oppure `http://localhost:4321/swiss-editorial`).

---

## 3. Build di Produzione & Deployment
```bash
# Esecuzione del type-check diagnostico e build statica
npm run build

# Preview locale del bundle generato in dist/
npm run preview
```
Il deployment su GitHub Pages avviene automaticamente tramite workflow GitHub Actions al push sul branch principale.

---

## 4. Linee Guida per la Manutenzione Futura
- **Aggiunta Nuovi Progetti / Esperienze:**  
  Modificare i rispettivi componenti in `src/components/variant7/Section03Esperienze.astro` e `Section04Progetti.astro` mantenendo la griglia auto-layout e le classi Tailwind native.
- **Aggiornamento Asset Grafici:**  
  Collocare i nuovi SVG o PNG in `public/assets/variant7/` preservando la convenzione di naming.
- **Regolazione Mini-Game Runner:**  
  I parametri di fisica (gravità, forza di salto, velocità di scorrimento ostacoli) sono configurati nello script interno di `src/components/variant7/RunnerAnteprimaDinamica.astro`.
