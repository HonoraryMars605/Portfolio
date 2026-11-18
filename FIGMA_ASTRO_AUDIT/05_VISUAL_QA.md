# 05 — VISUAL QA & VERIFICATION MATRIX

## 1. CRITERI DI ACCETTAZIONE VISIVA E STRUTTURALE

| Sezione / Componente | Target Figma / Screenshot | Risultato Implementazione Astro | Stato | Note |
| :--- | :--- | :--- | :--- | :--- |
| **Top Navbar (83:1114)** | Monogramma VC a sinistra; SFX ON, Dark/Light, ITA/EN, CV, Linkedin, GitHub a destra | Monogramma VC isolato (senza testo); 6 controlli e pillole attive a destra | ✅ 100% Fedele | Allineamento pixel-perfect |
| **Nav Rail (83:1102)** | Barra 45px, ‹, 01-07, ›. Active indicator: rettangolo arrotondato `#8B1E2D` con testo bianco | Dock laterale fixed, selettore numerico con indicatore rettangolare arrotondato `#8B1E2D` | ✅ 100% Fedele | Transizione smooth |
| **01 // CHI SONO?** | Titolo `VALERIO COMELLA` (Alfa Slab One), sottotitolo `#8B1E2D`, monitor standalone | Alfa Slab One 52px caricato, sottotitolo `#8B1E2D`, asset `hero-monitor-stand.png` pulito | ✅ 100% Fedele | Nessun overlay spurio |
| **Swiss Metrics Ledger** | 4 colonne visibili, scorrimento orizzontale, valori `#8B1E2D` | Carosello a 4 colonne con auto-scroll a 3.5s, snap orizzontale e pause on hover | ✅ 100% Fedele | Coerente con Figma 63:322 |
| **02 // COSA SO FARE?** | 3 colonne con titoli uppercase senza banner o descrizioni ridondanti; icone nere invertite | 3 colonne (Game Dev, Full Stack, Workflow), icone monocromatiche su tile scuro | ✅ 100% Fedele | Zero placeholder |
| **03 // DOVE HO LAVORATO?** | Griglia 2x2: Skill Factory, L'ABCD, Protom, Katabasi. Date `#8B1E2D` | 4 card aziendali con monogrammi/loghi ufficiali e badge contratto | ✅ 100% Fedele | Esclusi placeholder "non generare" |
| **04 // COSA HO CREATO?** | 2 featured (Violinum con artwork, Lock Fight), 3 medium (Rusheep, Sfuryatell, Project Works), 1 banner Game Jams | Layout 2+3+1 identico alla reference; tag pill `#FFF1F2`/`#8B1E2D` | ✅ 100% Fedele | Immagini di progetto sincronizzate |
| **05 // COME MI SONO FORMATO?** | Griglia 2x3 con 6 card accademiche + 3 badge solidi (Epass blu, Cisco navy, Gaming Week viola) | 6 card accademiche + 3 badge certificazioni a fondo pieno | ✅ 100% Fedele | Colori solidi ufficiali |
| **06 // OLTRE IL CODICE?** | 3 scaffali con locandine grafiche (Videogiochi, Film, Serie TV) + footer disclaimer | 3 scaffali con le 10 locandine originali ad alta risoluzione | ✅ 100% Fedele | Paginatori e footer presenti |
| **07 // RIMANIAMO IN CONTATTO?**| Badge, titolo, sottotitolo, canvas Auto Runner 1311x172px | Header pulito + Canvas 2D interattivo ad alta risoluzione | ✅ 100% Fedele | Nessuna card duplicata |

## 2. TEST FUNZIONALI
- **Compilazione Astro**: `astro check && astro build` completato con **0 errori** e **0 warning**.
- **Dark / Light Mode**: Funzionamento verificato con toggle dinamico e switch classi CSS su root.
- **Web Audio API**: Motore SFX a sintesi procedurale (nessun caricamento fallito di file `.mp3`).
- **Modal PDF**: Apertura a schermo intero con overlay sfocato e controlli di visualizzazione.
- **Scroll Wheel**: Conversione fluida di deltaY in scroll orizzontale per il layout a nastro.
