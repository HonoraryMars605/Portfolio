# 04 · FIGMA INTERACTION & PROTOTYPE REPORT
## Frame: Portfolio · Variant 7 · Swiss Editorial CV · PC · 1440
**Analyst:** Agent 4 — Figma Interaction Analyst  
**Date:** 2026-11-18  

---

## 1. Interaction Scope & Methodology
L'analisi ha verificato sia i dati di prototipazione nativi di Figma (`reactions`, `componentPropertyDefinitions`, stati di variante), sia i comportamenti interattivi documentati ed esplicitamente richiesti dalle specifiche della Variant 7.

---

## 2. Figma Native Reactions Analysis

### 2.1. Verifica Proprietà `reactions` nei Nodi Figma
Dall'ispezione analitica dei 900 nodi in `17:6624`:
- I nodi sono strutturati principalmente come **Design Frames statici con layout auto-layout** e non possiedono collegamenti di prototipazione wireframe spaghetti complessi salvati nel documento.
- Gli elementi di navigazione (`Navigazione / Barra superiore` e `Navigazione / Barra laterale`) sono disegnati a livello canvas come componenti di overlay visivo posizionati sopra il nastro a 7 sezioni.

---

## 3. Disamina Dettagliata Componenti Interattivi

### 3.1. Top Navigation Bar (`34:2795`)
La barra superiore ospita 6 controlli con feedback interattivo:
1. **`🔊 SFX ON` (`34:2801`):**
   - Toggle audio engine.
   - Stato: `ON` (audio abilitato) <-> `MUTED` (audio silenziato).
   - Evento: click triggera sintesi procedurale Web Audio e memorizzazione in `sessionStorage`.
2. **`🌓 Dark/Light` (`34:2807`):**
   - Toggle tema chiaro / scuro.
   - Evento: applicazione o rimozione classe `dark` su `<html>`.
3. **`🌐 ITA/EN` (`34:2813`):**
   - Selettore lingua / localizzazione interfaccia.
4. **`CV` (`34:2819`):**
   - Pulsante visualizzazione curriculum.
   - Evento: apertura modal nativo `PdfViewerModal` a tutto schermo con PDF incorporato (`assets/cv-valerio-comella.pdf`), senza download forzato.
5. **`Linkedin` (`34:2825`) & `GitHub` (`34:2831`):**
   - Link esterni diretti ai profili professionali con apertura in tab dedicata.

### 3.2. Floating Vertical Nav Rail (`44:3818`)
- 7 indicatori numerici `01`..`07` che fungono da selettori di scorrimento orizzontale.
- Click su qualsiasi numero esegue lo scroll smooth programmato alla coordinata `X = (index - 1) * 1440`.
- Frecce `‹` e `›` avanzano o retrocedono di una sezione orizzontale.
- Stato attivo dinamico (bordo o pill riempita) calcolato via `IntersectionObserver` sulle sezioni.

### 3.3. Swiss Metrics Ledger Carousel (`63:322`)
- 8 card di telemetria riepilogativa raggruppate in due schermate logiche (4 colonne per schermata).
- Autoplay automatico (rotazione ogni 3.5 secondi).
- Tasti di navigazione manuale `‹` e `›`.
- Pausa automatica su hover del mouse o touchstart.

### 3.4. Runner / Anteprima Dinamica Canvas (`65:744`)
- Mini-game dinamico interattivo renderizzato su canvas 2D nativo (1311 x 172 px).
- Player avatar XR che corre proceduralmente con simulazione gambe/braccia.
- Spazio / Click sul canvas attiva il salto per evitare ostacoli generati proceduralmente (bug, cubi di test, spike).
- HUD contatore telemetrico con metri percorsi in tempo reale.

### 3.5. Mouse Wheel & Horizontal Scroll Translation
- La pagina intercetta la rotella del mouse (`wheel`).
- Se l'utente scorre all'interno di una card o sezione con contenuto in overflow verticale, viene consentito il normale scroll verticale interno.
- Quando l'overflow verticale è esaurito o non presente, il delta verticale viene tradotto in scorrimento orizzontale tra le sezioni.
