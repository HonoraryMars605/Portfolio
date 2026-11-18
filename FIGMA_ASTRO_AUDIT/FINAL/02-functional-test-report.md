# 02 · FUNCTIONAL TEST REPORT
## Target: Portfolio · Variant 7 · Swiss Editorial CV · PC · 1440
**Runtime Server:** Astro 5.x on `http://localhost:4321`  
**QA Engine:** End-to-End Automated Browser Navigation  
**Date:** 2026-11-18  
**Status:** **100% OPERATIONAL // ZERO CONSOLE ERRORS**

---

## 1. Interactive Components Test Results

| Feature / Widget | Event Tested | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Preloader Splash** | Auto-timer (2.8s) / Click "SKIP" | Dissolvenza in opacità e rimozione dal DOM | Splash scompare regolarmente liberando il viewport | **PASSED** |
| **SFX Sound Engine** | Click `🔊 SFX ON` | Toggle tra stato audio attivo e muto, salvataggio `sessionStorage` | Icona commuta in 🔇/🔊 e sintetizzatore Web Audio risponde | **PASSED** |
| **Dark/Light Mode** | Click `🌓 Dark/Light` | Aggiunta/rimozione classe `.dark` su `<html>` e cambio palette | Colori di sfondo e testo commutano istantaneamente | **PASSED** |
| **ITA/EN Switcher** | Click `🌐 ITA/EN` | Notifica switch lingua | Stato commutato | **PASSED** |
| **CV PDF Modal** | Click `CV` su Topbar o Sezione 07 | Apertura modal accessibile a tutto schermo con PDF viewer | Modal si apre, mostra PDF incorporato e si chiude con ESC | **PASSED** |
| **Navigazione Orizzontale**| Click indicatori `01`..`07` su NavRail | Scroll smooth programmato alla coordinata orizzontale corrispondente | Snap istantaneo alla sezione selezionata | **PASSED** |
| **Traduzione Rotella** | Mouse Wheel Delta Y su slider | Scorrimento orizzontale tra sezioni mantenendo scroll verticale su card overflow | Navigazione orizzontale fluida; scroll verticale su card lunghe | **PASSED** |
| **Swiss Metrics Ledger** | Autoplay timer (3.5s) e frecce `‹` / `›` | Scorrimento automatico tra Pagina 01/02 e 02/02, pausa su hover | Carosello scorre regolarmente e risponde ai pulsanti | **PASSED** |
| **Runner Canvas 2D** | Pressione tasto Spazio o click su canvas | Salto avatar XR, collision detection con ostacoli, avanzamento metri | Fisica di salto attiva, HUD metri incrementa in real-time | **PASSED** |
| **Link Esterni** | Click su LinkedIn e GitHub | Apertura in nuova scheda (`target="_blank"`) con `rel="noopener"` | URL corretti a profili ufficiali | **PASSED** |

---

## 2. Console & Performance Diagnostics
- **Console Errors:** 0
- **Console Warnings:** 0
- **Network 404 / Broken Resources:** 0 (tutti i file CSS, JS, SVG, PNG e font caricati con successo).
