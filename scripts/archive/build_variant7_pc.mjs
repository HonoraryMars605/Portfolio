const ws = new WebSocket('ws://127.0.0.1:3055');

ws.onopen = () => {
  ws.send(JSON.stringify({ role: 'mcp-client', type: 'register' }));

  const code = `
    async function buildVariant7() {
      // 1. Load all required fonts
      const fonts = [
        { family: 'Inter', style: 'Regular' },
        { family: 'Inter', style: 'Medium' },
        { family: 'Inter', style: 'Semi Bold' },
        { family: 'Inter', style: 'Bold' },
      ];
      for (const f of fonts) {
        await figma.loadFontAsync(f);
      }

      // Palette definitions
      const C = {
        white: { r: 1, g: 1, b: 1 },
        ivory: { r: 0.976, g: 0.980, b: 0.984 }, // #f9fafb
        charcoal: { r: 0.059, g: 0.090, b: 0.165 }, // #0f172a
        slateDark: { r: 0.2, g: 0.255, b: 0.333 }, // #334155
        slateMuted: { r: 0.392, g: 0.455, b: 0.545 }, // #64748b
        slateLight: { r: 0.58, g: 0.639, b: 0.722 }, // #94a3b8
        borderLight: { r: 0.898, g: 0.906, b: 0.922 }, // #e5e7eb
        borderMedium: { r: 0.886, g: 0.910, b: 0.941 }, // #e2e8f0
        burgundy: { r: 0.545, g: 0.118, b: 0.176 }, // #8b1e2d
        burgundyDark: { r: 0.40, g: 0.08, b: 0.12 },
        burgundyTint: { r: 0.992, g: 0.949, b: 0.957 }, // #fdf2f4
        burgundyBorder: { r: 0.996, g: 0.804, b: 0.827 }, // #fecdd3
        emerald: { r: 0.063, g: 0.725, b: 0.506 }, // #10b981
        emeraldTint: { r: 0.925, g: 0.992, b: 0.961 }, // #ecfdf5
        emeraldBorder: { r: 0.655, g: 0.953, b: 0.816 }, // #a7f3d0
        emeraldDark: { r: 0.024, g: 0.373, b: 0.275 }, // #065f46
        headerBg: { r: 0.086, g: 0.086, b: 0.133 }, // #161622
        footerBg: { r: 0.035, g: 0.055, b: 0.086 }, // #090e16
        contactBoxBg: { r: 0.059, g: 0.090, b: 0.165 },
      };

      // Helper: Solid Fill
      function solid(color, opacity = 1) {
        return [{ type: 'SOLID', visible: true, opacity, blendMode: 'NORMAL', color }];
      }

      // Helper: Image Fill
      function imgFill(hash) {
        return [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: hash }];
      }

      // Helper: Text Node
      function txt(characters, { size = 14, style = 'Regular', color = C.charcoal, align = 'LEFT', lineHeight = null, letterSpacing = null }) {
        const t = figma.createText();
        t.fontName = { family: 'Inter', style };
        t.characters = characters;
        t.fontSize = size;
        t.fills = solid(color);
        t.textAlignHorizontal = align;
        if (lineHeight !== null) {
          t.lineHeight = { value: lineHeight, unit: 'PIXELS' };
        }
        if (letterSpacing !== null) {
          t.letterSpacing = { value: letterSpacing, unit: 'PERCENT' };
        }
        return t;
      }

      // Helper: Tag / Badge
      function badge(label, { bg = C.burgundyTint, border = C.burgundyBorder, text = C.burgundy, style = 'Bold', size = 11, dotColor = null }) {
        const frame = figma.createFrame();
        frame.name = 'Badge: ' + label;
        frame.layoutMode = 'HORIZONTAL';
        frame.primaryAxisSizingMode = 'AUTO';
        frame.counterAxisSizingMode = 'AUTO';
        frame.primaryAxisAlignItems = 'CENTER';
        frame.counterAxisAlignItems = 'CENTER';
        frame.paddingLeft = 10;
        frame.paddingRight = 10;
        frame.paddingTop = 4;
        frame.paddingBottom = 4;
        frame.itemSpacing = 6;
        frame.cornerRadius = 6;
        frame.fills = solid(bg);
        if (border) {
          frame.strokes = solid(border);
          frame.strokeWeight = 1;
        }

        if (dotColor) {
          const dot = figma.createEllipse();
          dot.resize(6, 6);
          dot.fills = solid(dotColor);
          frame.appendChild(dot);
        }

        const t = txt(label, { size, style, color: text });
        frame.appendChild(t);
        return frame;
      }

      // Helper: Button
      function button(label, { bg = C.burgundy, text = C.white, border = null, size = 13, style = 'Bold', px = 20, py = 12, cornerRadius = 8 }) {
        const btn = figma.createFrame();
        btn.name = 'Button: ' + label;
        btn.layoutMode = 'HORIZONTAL';
        btn.primaryAxisSizingMode = 'AUTO';
        btn.counterAxisSizingMode = 'AUTO';
        btn.primaryAxisAlignItems = 'CENTER';
        btn.counterAxisAlignItems = 'CENTER';
        btn.paddingLeft = px;
        btn.paddingRight = px;
        btn.paddingTop = py;
        btn.paddingBottom = py;
        btn.cornerRadius = cornerRadius;
        btn.fills = solid(bg);
        if (border) {
          btn.strokes = solid(border);
          btn.strokeWeight = 1;
        }
        const t = txt(label, { size, style, color: text });
        btn.appendChild(t);
        return btn;
      }

      // Clean up previous test nodes
      figma.currentPage.children
        .filter(c => c.name.includes('Variant 7 · Swiss Editorial CV · PC') || c.name === 'HEADER · VARIANT 7 · PC' || c.name === 'Floating Right Navigation Rail')
        .forEach(c => c.remove());

      // ==========================================
      // 2. CREATE HEADER CARD
      // ==========================================
      const headerCard = figma.createFrame();
      headerCard.name = 'HEADER · VARIANT 7 · PC';
      headerCard.x = 20480;
      headerCard.y = 187;
      headerCard.resize(1440, 56);
      headerCard.layoutMode = 'HORIZONTAL';
      headerCard.primaryAxisSizingMode = 'FIXED';
      headerCard.counterAxisSizingMode = 'FIXED';
      headerCard.primaryAxisAlignItems = 'SPACE_BETWEEN';
      headerCard.counterAxisAlignItems = 'CENTER';
      headerCard.paddingLeft = 24;
      headerCard.paddingRight = 24;
      headerCard.cornerRadius = 8;
      headerCard.fills = solid(C.headerBg);
      headerCard.strokes = solid(C.burgundy);
      headerCard.strokeWeight = 1.5;

      const headerLeft = figma.createFrame();
      headerLeft.name = 'Header Left Title';
      headerLeft.layoutMode = 'HORIZONTAL';
      headerLeft.primaryAxisSizingMode = 'AUTO';
      headerLeft.counterAxisSizingMode = 'AUTO';
      headerLeft.counterAxisAlignItems = 'CENTER';
      headerLeft.itemSpacing = 12;
      headerLeft.fills = [];

      const hDot = figma.createEllipse();
      hDot.resize(8, 8);
      hDot.fills = solid(C.burgundy);
      headerLeft.appendChild(hDot);

      const hTitle = txt('VARIANT 07 // SWISS EDITORIAL CV · Master Desktop Edition · Fullpage Snap & Pure Editorial', {
        size: 14,
        style: 'Bold',
        color: C.white
      });
      headerLeft.appendChild(hTitle);
      headerCard.appendChild(headerLeft);

      const headerRight = figma.createFrame();
      headerRight.name = 'Header Right Badge';
      headerRight.layoutMode = 'HORIZONTAL';
      headerRight.primaryAxisSizingMode = 'AUTO';
      headerRight.counterAxisSizingMode = 'AUTO';
      headerRight.counterAxisAlignItems = 'CENTER';
      headerRight.paddingLeft = 14;
      headerRight.paddingRight = 14;
      headerRight.paddingTop = 6;
      headerRight.paddingBottom = 6;
      headerRight.cornerRadius = 6;
      headerRight.fills = solid({ r: 0.15, g: 0.15, b: 0.22 });
      headerRight.strokes = solid(C.burgundy);
      headerRight.strokeWeight = 1;

      const hDim = txt('1440 × SNAP PC', { size: 11, style: 'Bold', color: { r: 0.99, g: 0.75, b: 0.8 } });
      headerRight.appendChild(hDim);
      headerCard.appendChild(headerRight);

      // ==========================================
      // 3. CREATE MASTER FRAME
      // ==========================================
      const master = figma.createFrame();
      master.name = 'Portfolio · Variant 7 · Swiss Editorial CV · PC · 1440';
      master.x = 20480;
      master.y = 263;
      master.resize(1440, 100); // will expand with auto layout
      master.layoutMode = 'VERTICAL';
      master.primaryAxisSizingMode = 'AUTO';
      master.counterAxisSizingMode = 'FIXED';
      master.itemSpacing = 0;
      master.fills = solid(C.white);

      // ------------------------------------------
      // FLOATING RIGHT NAVIGATION RAIL (ABSOLUTE)
      // ------------------------------------------
      const navRail = figma.createFrame();
      navRail.name = 'Floating Right Navigation Rail';
      master.appendChild(navRail);
      navRail.layoutPositioning = 'ABSOLUTE';
      navRail.x = 1370;
      navRail.y = 120;
      navRail.resize(46, 320);
      navRail.layoutMode = 'VERTICAL';
      navRail.primaryAxisSizingMode = 'AUTO';
      navRail.counterAxisSizingMode = 'FIXED';
      navRail.counterAxisAlignItems = 'CENTER';
      navRail.paddingTop = 14;
      navRail.paddingBottom = 14;
      navRail.paddingLeft = 4;
      navRail.paddingRight = 4;
      navRail.itemSpacing = 12;
      navRail.cornerRadius = 23;
      navRail.fills = solid(C.white, 0.95);
      navRail.strokes = solid(C.borderLight);
      navRail.strokeWeight = 1;

      const railLabel = txt('SNAP', { size: 8, style: 'Bold', color: C.burgundy, letterSpacing: 10 });
      navRail.appendChild(railLabel);

      const navSections = [
        { num: '01', active: true },
        { num: '02', active: false },
        { num: '03', active: false },
        { num: '04', active: false },
        { num: '05', active: false },
        { num: '06', active: false },
      ];

      for (const ns of navSections) {
        const itemFrame = figma.createFrame();
        itemFrame.name = 'Rail ' + ns.num;
        itemFrame.layoutMode = 'VERTICAL';
        itemFrame.primaryAxisSizingMode = 'AUTO';
        itemFrame.counterAxisSizingMode = 'AUTO';
        itemFrame.counterAxisAlignItems = 'CENTER';
        itemFrame.itemSpacing = 3;
        itemFrame.fills = [];

        const pip = figma.createEllipse();
        if (ns.active) {
          pip.resize(10, 10);
          pip.fills = solid(C.burgundy);
          pip.strokes = solid(C.white);
          pip.strokeWeight = 2;
        } else {
          pip.resize(6, 6);
          pip.fills = solid(C.slateLight);
        }
        itemFrame.appendChild(pip);

        const numTxt = txt(ns.num, {
          size: 8,
          style: ns.active ? 'Bold' : 'Medium',
          color: ns.active ? C.burgundy : C.slateMuted
        });
        itemFrame.appendChild(numTxt);
        navRail.appendChild(itemFrame);
      }

      // ==========================================
      // SECTION 00: TOP NAVIGATION BAR
      // ==========================================
      const navBar = figma.createFrame();
      navBar.name = '00 // Top Editorial Navigation Bar';
      navBar.layoutMode = 'HORIZONTAL';
      navBar.primaryAxisSizingMode = 'FIXED';
      navBar.counterAxisSizingMode = 'FIXED';
      navBar.resize(1440, 72);
      navBar.primaryAxisAlignItems = 'SPACE_BETWEEN';
      navBar.counterAxisAlignItems = 'CENTER';
      navBar.paddingLeft = 64;
      navBar.paddingRight = 64;
      navBar.fills = solid(C.white);
      navBar.strokes = solid(C.borderLight);
      navBar.strokeWeight = 1;

      // Nav Left Brand
      const brandFrame = figma.createFrame();
      brandFrame.name = 'Brand & Role';
      brandFrame.layoutMode = 'HORIZONTAL';
      brandFrame.primaryAxisSizingMode = 'AUTO';
      brandFrame.counterAxisSizingMode = 'AUTO';
      brandFrame.counterAxisAlignItems = 'CENTER';
      brandFrame.itemSpacing = 12;
      brandFrame.fills = [];

      brandFrame.appendChild(txt('VALERIO COMELLA', { size: 15, style: 'Bold', color: C.charcoal, letterSpacing: -1 }));
      brandFrame.appendChild(txt('/', { size: 14, style: 'Regular', color: C.slateLight }));
      brandFrame.appendChild(txt('SOFTWARE & XR ENGINEER', { size: 12, style: 'Bold', color: C.burgundy, letterSpacing: 4 }));
      navBar.appendChild(brandFrame);

      // Nav Center Links
      const linksFrame = figma.createFrame();
      linksFrame.name = 'Navigation Links';
      linksFrame.layoutMode = 'HORIZONTAL';
      linksFrame.primaryAxisSizingMode = 'AUTO';
      linksFrame.counterAxisSizingMode = 'AUTO';
      linksFrame.counterAxisAlignItems = 'CENTER';
      linksFrame.itemSpacing = 24;
      linksFrame.fills = [];

      const links = ['01 HERO', '02 PROFILO', '03 ESPERIENZE', '04 PROGETTI', '05 FORMAZIONE', '06 CONTATTO'];
      links.forEach((l, idx) => {
        const linkTxt = txt(l, {
          size: 11,
          style: idx === 0 ? 'Bold' : 'Medium',
          color: idx === 0 ? C.burgundy : C.slateMuted,
          letterSpacing: 2
        });
        linksFrame.appendChild(linkTxt);
      });
      navBar.appendChild(linksFrame);

      // Nav Right CTAs
      const navRight = figma.createFrame();
      navRight.name = 'Nav Right CTAs';
      navRight.layoutMode = 'HORIZONTAL';
      navRight.primaryAxisSizingMode = 'AUTO';
      navRight.counterAxisSizingMode = 'AUTO';
      navRight.counterAxisAlignItems = 'CENTER';
      navRight.itemSpacing = 16;
      navRight.fills = [];

      const hireBadge = badge('AVAILABLE FOR HIRE · ROMA / REMOTE', {
        bg: C.emeraldTint,
        border: C.emeraldBorder,
        text: C.emeraldDark,
        size: 11,
        dotColor: C.emerald
      });
      navRight.appendChild(hireBadge);

      const downloadBtn = button('Scarica CV', {
        bg: C.burgundy,
        text: C.white,
        size: 12,
        px: 16,
        py: 8,
        cornerRadius: 6
      });
      navRight.appendChild(downloadBtn);

      navBar.appendChild(navRight);
      master.appendChild(navBar);

      // ==========================================
      // SECTION 01 // HERO & PRESENTATION
      // ==========================================
      const heroSec = figma.createFrame();
      heroSec.name = '01 // HERO & PRESENTATION';
      heroSec.layoutMode = 'VERTICAL';
      heroSec.primaryAxisSizingMode = 'AUTO';
      heroSec.counterAxisSizingMode = 'FIXED';
      heroSec.resize(1440, 100);
      heroSec.paddingLeft = 64;
      heroSec.paddingRight = 64;
      heroSec.paddingTop = 56;
      heroSec.paddingBottom = 64;
      heroSec.itemSpacing = 32;
      heroSec.fills = solid(C.white);

      // Eyebrow row
      const heroEyebrow = figma.createFrame();
      heroEyebrow.name = 'Hero Eyebrow Row';
      heroEyebrow.layoutMode = 'HORIZONTAL';
      heroEyebrow.primaryAxisSizingMode = 'AUTO';
      heroEyebrow.counterAxisSizingMode = 'AUTO';
      heroEyebrow.counterAxisAlignItems = 'CENTER';
      heroEyebrow.itemSpacing = 16;
      heroEyebrow.fills = [];

      heroEyebrow.appendChild(badge('01 // HERO & PRESENTATION', { bg: C.burgundyTint, border: C.burgundyBorder, text: C.burgundy, size: 11 }));
      heroEyebrow.appendChild(txt('SNAP VIEWPORT 01/06 · SWISS EDITORIAL MASTER', { size: 11, style: 'Medium', color: C.slateLight, letterSpacing: 2 }));
      heroSec.appendChild(heroEyebrow);

      // Hero Content 2-Column Row
      const heroMainRow = figma.createFrame();
      heroMainRow.name = 'Hero Main Grid';
      heroMainRow.layoutMode = 'HORIZONTAL';
      heroMainRow.primaryAxisSizingMode = 'FIXED';
      heroMainRow.counterAxisSizingMode = 'AUTO';
      heroMainRow.resize(1312, 100);
      heroMainRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
      heroMainRow.counterAxisAlignItems = 'CENTER';
      heroMainRow.itemSpacing = 48;
      heroMainRow.fills = [];

      // Left Column (Text & Bio)
      const heroLeft = figma.createFrame();
      heroLeft.name = 'Hero Left Content';
      heroLeft.layoutMode = 'VERTICAL';
      heroLeft.primaryAxisSizingMode = 'AUTO';
      heroLeft.counterAxisSizingMode = 'FIXED';
      heroLeft.resize(760, 100);
      heroLeft.itemSpacing = 24;
      heroLeft.fills = [];

      // Headlines
      const titlesBox = figma.createFrame();
      titlesBox.name = 'Hero Titles';
      titlesBox.layoutMode = 'VERTICAL';
      titlesBox.primaryAxisSizingMode = 'AUTO';
      titlesBox.counterAxisSizingMode = 'FIXED';
      titlesBox.resize(760, 100);
      titlesBox.itemSpacing = 8;
      titlesBox.fills = [];

      titlesBox.appendChild(txt('VALERIO COMELLA', { size: 52, style: 'Bold', color: C.charcoal, letterSpacing: -2, lineHeight: 56 }));
      titlesBox.appendChild(txt('SOFTWARE ENGINEER | UNITY (C#) & FULL STACK', { size: 20, style: 'Semi Bold', color: C.burgundy, letterSpacing: -0.5 }));
      heroLeft.appendChild(titlesBox);

      // Animated Rotating Quotes Carousel Ticker
      const ticker = figma.createFrame();
      ticker.name = 'Animated Rotating Quotes Carousel Ticker';
      ticker.layoutMode = 'VERTICAL';
      ticker.primaryAxisSizingMode = 'AUTO';
      ticker.counterAxisSizingMode = 'FIXED';
      ticker.resize(760, 100);
      ticker.paddingLeft = 20;
      ticker.paddingRight = 20;
      ticker.paddingTop = 14;
      ticker.paddingBottom = 14;
      ticker.itemSpacing = 10;
      ticker.cornerRadius = 10;
      ticker.fills = solid(C.ivory);
      ticker.strokes = solid(C.borderLight);
      ticker.strokeWeight = 1;

      const tickerTop = figma.createFrame();
      tickerTop.name = 'Ticker Dispatch Header';
      tickerTop.layoutMode = 'HORIZONTAL';
      tickerTop.primaryAxisSizingMode = 'FIXED';
      tickerTop.counterAxisSizingMode = 'AUTO';
      tickerTop.resize(720, 20);
      tickerTop.primaryAxisAlignItems = 'SPACE_BETWEEN';
      tickerTop.counterAxisAlignItems = 'CENTER';
      tickerTop.fills = [];

      tickerTop.appendChild(txt('✦ ROTATING EDITORIAL DISPATCH', { size: 10, style: 'Bold', color: C.burgundy, letterSpacing: 8 }));
      tickerTop.appendChild(txt('AUTOPLAY SNAP [01 OF 04]', { size: 10, style: 'Medium', color: C.slateLight }));
      ticker.appendChild(tickerTop);

      // Rotating Quotes Row
      const quotesRow = figma.createFrame();
      quotesRow.name = 'Quotes Carousel Items';
      quotesRow.layoutMode = 'HORIZONTAL';
      quotesRow.primaryAxisSizingMode = 'FIXED';
      quotesRow.counterAxisSizingMode = 'AUTO';
      quotesRow.resize(720, 24);
      quotesRow.primaryAxisAlignItems = 'MIN';
      quotesRow.counterAxisAlignItems = 'CENTER';
      quotesRow.itemSpacing = 16;
      quotesRow.fills = [];

      quotesRow.appendChild(txt('”Building Worlds with Code”', { size: 13, style: 'Bold', color: C.charcoal }));
      quotesRow.appendChild(txt('•', { size: 12, style: 'Regular', color: C.slateLight }));
      quotesRow.appendChild(txt('”Interactive XR Specialist (1200+ Hours)”', { size: 13, style: 'Semi Bold', color: C.burgundy }));
      quotesRow.appendChild(txt('•', { size: 12, style: 'Regular', color: C.slateLight }));
      quotesRow.appendChild(txt('”Clean Architecture & Systems”', { size: 13, style: 'Medium', color: C.slateMuted }));
      quotesRow.appendChild(txt('•', { size: 12, style: 'Regular', color: C.slateLight }));
      quotesRow.appendChild(txt('”Code is the new art”', { size: 13, style: 'Medium', color: C.slateMuted }));
      ticker.appendChild(quotesRow);

      // Progress bar
      const progTrack = figma.createFrame();
      progTrack.name = 'Carousel Progress Bar';
      progTrack.layoutMode = 'HORIZONTAL';
      progTrack.primaryAxisSizingMode = 'FIXED';
      progTrack.counterAxisSizingMode = 'FIXED';
      progTrack.resize(720, 3);
      progTrack.cornerRadius = 2;
      progTrack.fills = solid(C.borderMedium);

      const progActive = figma.createFrame();
      progActive.name = 'Active Bar';
      progActive.resize(220, 3);
      progActive.cornerRadius = 2;
      progActive.fills = solid(C.burgundy);
      progTrack.appendChild(progActive);
      ticker.appendChild(progTrack);

      heroLeft.appendChild(ticker);

      // Bio Paragraph
      const bioTxt = txt('Unity Developer specializzato in C#, con oltre 1200 ore di esperienza su motori interattivi, soluzioni Mixed Reality (zSpace, MR-HMI) e prodotti B2B su WebGL. Solida formazione tecnica EQF5 & RNCP6, unisco architetture software scalabili, strumenti di authoring custom e sviluppo Full Stack moderno (Java/Spring Boot, PostgreSQL, Web).', {
        size: 15,
        style: 'Regular',
        color: C.slateDark,
        lineHeight: 24
      });
      heroLeft.appendChild(bioTxt);

      // CTA buttons row
      const heroCtas = figma.createFrame();
      heroCtas.name = 'Hero Actions Row';
      heroCtas.layoutMode = 'HORIZONTAL';
      heroCtas.primaryAxisSizingMode = 'AUTO';
      heroCtas.counterAxisSizingMode = 'AUTO';
      heroCtas.counterAxisAlignItems = 'CENTER';
      heroCtas.itemSpacing = 14;
      heroCtas.fills = [];

      heroCtas.appendChild(button('Contatta Subito (valeriocom@hotmail.it)', { bg: C.burgundy, text: C.white, px: 22, py: 12 }));
      heroCtas.appendChild(button('Esplora Progetti (6 Shipped)', { bg: C.white, text: C.charcoal, border: C.borderLight, px: 20, py: 12 }));
      heroCtas.appendChild(button('Scarica CV Ufficiale', { bg: C.ivory, text: C.slateDark, border: C.borderLight, px: 18, py: 12 }));
      heroLeft.appendChild(heroCtas);

      // Hero Metrics Badges Strip
      const heroMetrics = figma.createFrame();
      heroMetrics.name = 'Hero Metrics Strip';
      heroMetrics.layoutMode = 'HORIZONTAL';
      heroMetrics.primaryAxisSizingMode = 'FIXED';
      heroMetrics.counterAxisSizingMode = 'AUTO';
      heroMetrics.resize(760, 48);
      heroMetrics.primaryAxisAlignItems = 'SPACE_BETWEEN';
      heroMetrics.itemSpacing = 12;
      heroMetrics.fills = [];

      const quickStats = [
        { val: '1200+ ORE XR', label: 'Engine & Mixed Reality' },
        { val: '6 SHIPPED GAMES', label: 'B2B, VR & Game Jams' },
        { val: '101/110 & 100/100', label: 'EQF5 & ITIS A. Volta' },
      ];
      for (const qs of quickStats) {
        const qCard = figma.createFrame();
        qCard.layoutMode = 'HORIZONTAL';
        qCard.primaryAxisSizingMode = 'FIXED';
        qCard.counterAxisSizingMode = 'AUTO';
        qCard.resize(244, 44);
        qCard.paddingLeft = 14;
        qCard.paddingRight = 14;
        qCard.paddingTop = 8;
        qCard.paddingBottom = 8;
        qCard.counterAxisAlignItems = 'CENTER';
        qCard.itemSpacing = 8;
        qCard.cornerRadius = 6;
        qCard.fills = solid(C.ivory);
        qCard.strokes = solid(C.borderLight);
        qCard.strokeWeight = 1;

        const valTxt = txt(qs.val, { size: 12, style: 'Bold', color: C.burgundy });
        const lblTxt = txt(qs.label, { size: 10, style: 'Medium', color: C.slateMuted });
        qCard.appendChild(valTxt);
        qCard.appendChild(lblTxt);
        heroMetrics.appendChild(qCard);
      }
      heroLeft.appendChild(heroMetrics);

      heroMainRow.appendChild(heroLeft);

      // Right Column: Hero Visual Card with real original illustration
      const heroCardFrame = figma.createFrame();
      heroCardFrame.name = 'Hero Visual Card (Original Illustration)';
      heroCardFrame.layoutMode = 'VERTICAL';
      heroCardFrame.primaryAxisSizingMode = 'FIXED';
      heroCardFrame.counterAxisSizingMode = 'FIXED';
      heroCardFrame.resize(504, 520);
      heroCardFrame.cornerRadius = 16;
      heroCardFrame.clipsContent = true;
      heroCardFrame.strokes = solid(C.borderLight);
      heroCardFrame.strokeWeight = 1.5;
      heroCardFrame.primaryAxisAlignItems = 'MAX';
      heroCardFrame.paddingLeft = 16;
      heroCardFrame.paddingRight = 16;
      heroCardFrame.paddingBottom = 16;
      // Real illustration image fill hash
      heroCardFrame.fills = imgFill('804913e4432d2702eabf402e152737e88b651526');

      // Floating Overlay on Card
      const heroOverlay = figma.createFrame();
      heroOverlay.name = 'Card Metadata Overlay';
      heroOverlay.layoutMode = 'VERTICAL';
      heroOverlay.primaryAxisSizingMode = 'AUTO';
      heroOverlay.counterAxisSizingMode = 'FIXED';
      heroOverlay.resize(472, 100);
      heroOverlay.paddingLeft = 18;
      heroOverlay.paddingRight = 18;
      heroOverlay.paddingTop = 14;
      heroOverlay.paddingBottom = 14;
      heroOverlay.itemSpacing = 6;
      heroOverlay.cornerRadius = 12;
      heroOverlay.fills = solid(C.white, 0.95);
      heroOverlay.strokes = solid(C.borderMedium);
      heroOverlay.strokeWeight = 1;

      heroOverlay.appendChild(txt('VALERIO COMELLA · SOFTWARE & GAME ENGINEER', { size: 12, style: 'Bold', color: C.charcoal }));
      heroOverlay.appendChild(txt('📍 Roma, Italia · Nato a Napoli (23 Luglio 2002) · Patente B', { size: 11, style: 'Medium', color: C.slateDark }));
      heroOverlay.appendChild(txt('✉️ valeriocom@hotmail.it · 📞 3339959271 · 🌐 Italiano (Madrelingua) / Inglese (A2)', { size: 11, style: 'Semi Bold', color: C.burgundy }));
      heroCardFrame.appendChild(heroOverlay);

      heroMainRow.appendChild(heroCardFrame);
      heroSec.appendChild(heroMainRow);
      master.appendChild(heroSec);

      // ==========================================
      // SECTION 02 // PROFILO & COMPETENZE
      // ==========================================
      const sec02 = figma.createFrame();
      sec02.name = '02 // PROFILO & COMPETENZE';
      sec02.layoutMode = 'VERTICAL';
      sec02.primaryAxisSizingMode = 'AUTO';
      sec02.counterAxisSizingMode = 'FIXED';
      sec02.resize(1440, 100);
      sec02.paddingLeft = 64;
      sec02.paddingRight = 64;
      sec02.paddingTop = 64;
      sec02.paddingBottom = 72;
      sec02.itemSpacing = 36;
      sec02.fills = solid(C.ivory);
      sec02.strokes = solid(C.borderLight);
      sec02.strokeWeight = 1;

      // Section Header Block
      const s2Header = figma.createFrame();
      s2Header.name = 'Section 02 Header';
      s2Header.layoutMode = 'VERTICAL';
      s2Header.primaryAxisSizingMode = 'AUTO';
      s2Header.counterAxisSizingMode = 'FIXED';
      s2Header.resize(1312, 100);
      s2Header.itemSpacing = 8;
      s2Header.fills = [];

      s2Header.appendChild(badge('02 // PROFILO & COMPETENZE', { bg: C.burgundyTint, border: C.burgundyBorder, text: C.burgundy, size: 11 }));
      s2Header.appendChild(txt('Architettura, Motori di Gioco e Sviluppo Full Stack', { size: 32, style: 'Bold', color: C.charcoal, letterSpacing: -1 }));
      s2Header.appendChild(txt('Un profilo ibrido ad alto rendimento: la rigorosa logica del game programming unita all architettura web moderna e all efficienza sistemistica.', { size: 15, style: 'Regular', color: C.slateMuted }));
      sec02.appendChild(s2Header);

      // Metrics Banner (4 columns)
      const metricsBanner = figma.createFrame();
      metricsBanner.name = 'Swiss Metrics Ledger (4-Columns)';
      metricsBanner.layoutMode = 'HORIZONTAL';
      metricsBanner.primaryAxisSizingMode = 'FIXED';
      metricsBanner.counterAxisSizingMode = 'AUTO';
      metricsBanner.resize(1312, 100);
      metricsBanner.primaryAxisAlignItems = 'SPACE_BETWEEN';
      metricsBanner.itemSpacing = 16;
      metricsBanner.fills = [];

      const metricCards = [
        { number: '1200+ Ore', label: 'Sviluppo XR & Motori 3D', desc: 'Specializzazione su Unity (C#), Unreal Engine 5, zSpace e WebGL.', highlight: true },
        { number: '6 Titoli', label: 'Progetti & Produzioni B2B', desc: 'Videogiochi rilasciati tra game jam, prodotti B2B e Italian Game 2025.', highlight: false },
        { number: '101 / 110', label: 'Diploma Tecnico Superiore', desc: 'Augmented, Virtual & Mixed Reality conseguito presso ITS Lazio Digital (EQF 5).', highlight: true },
        { number: '100 / 100', label: 'Perito Informatico', desc: 'Informatica e Telecomunicazioni presso ITIS Alessandro Volta con lode di merito.', highlight: false },
      ];

      for (const mc of metricCards) {
        const mFrame = figma.createFrame();
        mFrame.name = 'Metric Card: ' + mc.number;
        mFrame.layoutMode = 'VERTICAL';
        mFrame.primaryAxisSizingMode = 'AUTO';
        mFrame.counterAxisSizingMode = 'FIXED';
        mFrame.resize(316, 140);
        mFrame.paddingLeft = 20;
        mFrame.paddingRight = 20;
        mFrame.paddingTop = 18;
        mFrame.paddingBottom = 18;
        mFrame.itemSpacing = 6;
        mFrame.cornerRadius = 10;
        mFrame.fills = solid(C.white);
        mFrame.strokes = solid(C.borderLight);
        mFrame.strokeWeight = 1;

        mFrame.appendChild(txt(mc.number, { size: 28, style: 'Bold', color: mc.highlight ? C.burgundy : C.charcoal, letterSpacing: -1 }));
        mFrame.appendChild(txt(mc.label, { size: 12, style: 'Bold', color: C.charcoal }));
        mFrame.appendChild(txt(mc.desc, { size: 11, style: 'Regular', color: C.slateMuted, lineHeight: 16 }));
        metricsBanner.appendChild(mFrame);
      }
      sec02.appendChild(metricsBanner);

      // 3-Column Swiss Competence Grid
      const compGrid = figma.createFrame();
      compGrid.name = '3-Column Swiss Competence Grid';
      compGrid.layoutMode = 'HORIZONTAL';
      compGrid.primaryAxisSizingMode = 'FIXED';
      compGrid.counterAxisSizingMode = 'AUTO';
      compGrid.resize(1312, 100);
      compGrid.primaryAxisAlignItems = 'SPACE_BETWEEN';
      compGrid.itemSpacing = 24;
      compGrid.fills = [];

      // Col 1: Game Dev & Engine Systems
      const col1 = figma.createFrame();
      col1.name = 'Col 1: Game Dev & Engine Systems';
      col1.layoutMode = 'VERTICAL';
      col1.primaryAxisSizingMode = 'AUTO';
      col1.counterAxisSizingMode = 'FIXED';
      col1.resize(421, 100);
      col1.paddingLeft = 24;
      col1.paddingRight = 24;
      col1.paddingTop = 24;
      col1.paddingBottom = 24;
      col1.itemSpacing = 18;
      col1.cornerRadius = 12;
      col1.fills = solid(C.white);
      col1.strokes = solid(C.borderLight);
      col1.strokeWeight = 1;

      col1.appendChild(txt('GAME DEV & ENGINE SYSTEMS', { size: 15, style: 'Bold', color: C.charcoal, letterSpacing: 0.5 }));
      col1.appendChild(txt('Sistemi in tempo reale, simulazione fisica e integrazione SDK per Mixed Reality.', { size: 12, style: 'Regular', color: C.slateMuted }));

      const gdevSkills = [
        { name: 'Unity (C#)', desc: 'Custom Editor Tools, uGUI, WebGL, Profiler & ottimizzazione', hash: '07bdd7bdd8bd1caefee7ba0855f0ef191c114dcb' },
        { name: 'Unreal Engine 5', desc: 'Blueprint Visual Scripting, Gameplay Framework, Level Design', hash: '84a0e959bccb6f05ca8ea7e300db4bbe12d930c7' },
        { name: 'Mixed Reality SDKs', desc: 'zSpace, MR-HMI, Multi-SDK Wrappers, OpenXR, WebXR', hash: null },
        { name: 'Sistemi & Architettura', desc: 'OOP, State Machines, Event Bus, Design Patterns scalabili', hash: null },
      ];

      for (const s of gdevSkills) {
        const item = figma.createFrame();
        item.layoutMode = 'HORIZONTAL';
        item.primaryAxisSizingMode = 'FIXED';
        item.counterAxisSizingMode = 'AUTO';
        item.resize(373, 50);
        item.counterAxisAlignItems = 'CENTER';
        item.itemSpacing = 12;
        item.fills = [];

        if (s.hash) {
          const iconBox = figma.createFrame();
          iconBox.resize(36, 36);
          iconBox.cornerRadius = 8;
          iconBox.fills = imgFill(s.hash);
          iconBox.strokes = solid(C.borderMedium);
          iconBox.strokeWeight = 1;
          item.appendChild(iconBox);
        } else {
          const badgeIcon = figma.createFrame();
          badgeIcon.resize(36, 36);
          badgeIcon.cornerRadius = 8;
          badgeIcon.fills = solid(C.burgundyTint);
          badgeIcon.strokes = solid(C.burgundyBorder);
          badgeIcon.strokeWeight = 1;
          badgeIcon.primaryAxisAlignItems = 'CENTER';
          badgeIcon.counterAxisAlignItems = 'CENTER';
          const dot = figma.createEllipse();
          dot.resize(10, 10);
          dot.fills = solid(C.burgundy);
          badgeIcon.appendChild(dot);
          item.appendChild(badgeIcon);
        }

        const textBox = figma.createFrame();
        textBox.layoutMode = 'VERTICAL';
        textBox.primaryAxisSizingMode = 'AUTO';
        textBox.counterAxisSizingMode = 'FIXED';
        textBox.resize(320, 44);
        textBox.itemSpacing = 2;
        textBox.fills = [];
        textBox.appendChild(txt(s.name, { size: 13, style: 'Bold', color: C.charcoal }));
        textBox.appendChild(txt(s.desc, { size: 11, style: 'Regular', color: C.slateMuted }));
        item.appendChild(textBox);

        col1.appendChild(item);
      }
      compGrid.appendChild(col1);

      // Col 2: Full Stack & Software Engineering
      const col2 = figma.createFrame();
      col2.name = 'Col 2: Full Stack & Software Engineering';
      col2.layoutMode = 'VERTICAL';
      col2.primaryAxisSizingMode = 'AUTO';
      col2.counterAxisSizingMode = 'FIXED';
      col2.resize(421, 100);
      col2.paddingLeft = 24;
      col2.paddingRight = 24;
      col2.paddingTop = 24;
      col2.paddingBottom = 24;
      col2.itemSpacing = 18;
      col2.cornerRadius = 12;
      col2.fills = solid(C.white);
      col2.strokes = solid(C.borderLight);
      col2.strokeWeight = 1;

      col2.appendChild(txt('FULL STACK & SOFTWARE DEV', { size: 15, style: 'Bold', color: C.charcoal, letterSpacing: 0.5 }));
      col2.appendChild(txt('Standard web moderni, programmazione a oggetti, architetture backend e database.', { size: 12, style: 'Regular', color: C.slateMuted }));

      const webSkills = [
        { name: 'Java & Spring Boot', desc: 'Thymeleaf, REST API, architettura MVC e logica di business', hash: '6539b5b4c27411018ea9093f10de77614e670907' },
        { name: 'PostgreSQL & MySQL', desc: 'Database relazionali, schema design, persistenza dati e query', hash: '456161e9174b71c1f7ba327089f3c7e53def6d3e' },
        { name: 'HTML5, CSS3 & JavaScript', desc: 'Front-end responsive, Bootstrap, DOM scripting e performance', hash: 'c921d063facd55b06b214756e6cfdf6d7ae15715' },
        { name: 'C & Python', desc: 'Gestione memoria a basso livello (42 Roma Luiss / ELIS) e scripting', hash: null },
      ];

      for (const s of webSkills) {
        const item = figma.createFrame();
        item.layoutMode = 'HORIZONTAL';
        item.primaryAxisSizingMode = 'FIXED';
        item.counterAxisSizingMode = 'AUTO';
        item.resize(373, 50);
        item.counterAxisAlignItems = 'CENTER';
        item.itemSpacing = 12;
        item.fills = [];

        if (s.hash) {
          const iconBox = figma.createFrame();
          iconBox.resize(36, 36);
          iconBox.cornerRadius = 8;
          iconBox.fills = imgFill(s.hash);
          iconBox.strokes = solid(C.borderMedium);
          iconBox.strokeWeight = 1;
          item.appendChild(iconBox);
        } else {
          const badgeIcon = figma.createFrame();
          badgeIcon.resize(36, 36);
          badgeIcon.cornerRadius = 8;
          badgeIcon.fills = solid(C.burgundyTint);
          badgeIcon.strokes = solid(C.burgundyBorder);
          badgeIcon.strokeWeight = 1;
          badgeIcon.primaryAxisAlignItems = 'CENTER';
          badgeIcon.counterAxisAlignItems = 'CENTER';
          const dot = figma.createEllipse();
          dot.resize(10, 10);
          dot.fills = solid(C.burgundy);
          badgeIcon.appendChild(dot);
          item.appendChild(badgeIcon);
        }

        const textBox = figma.createFrame();
        textBox.layoutMode = 'VERTICAL';
        textBox.primaryAxisSizingMode = 'AUTO';
        textBox.counterAxisSizingMode = 'FIXED';
        textBox.resize(320, 44);
        textBox.itemSpacing = 2;
        textBox.fills = [];
        textBox.appendChild(txt(s.name, { size: 13, style: 'Bold', color: C.charcoal }));
        textBox.appendChild(txt(s.desc, { size: 11, style: 'Regular', color: C.slateMuted }));
        item.appendChild(textBox);

        col2.appendChild(item);
      }
      compGrid.appendChild(col2);

      // Col 3: Workflow, Tooling & Design
      const col3 = figma.createFrame();
      col3.name = 'Col 3: Workflow, Tooling & Design';
      col3.layoutMode = 'VERTICAL';
      col3.primaryAxisSizingMode = 'AUTO';
      col3.counterAxisSizingMode = 'FIXED';
      col3.resize(421, 100);
      col3.paddingLeft = 24;
      col3.paddingRight = 24;
      col3.paddingTop = 24;
      col3.paddingBottom = 24;
      col3.itemSpacing = 18;
      col3.cornerRadius = 12;
      col3.fills = solid(C.white);
      col3.strokes = solid(C.borderLight);
      col3.strokeWeight = 1;

      col3.appendChild(txt('WORKFLOW, TOOLING & DESIGN', { size: 15, style: 'Bold', color: C.charcoal, letterSpacing: 0.5 }));
      col3.appendChild(txt('Pipeline di collaborazione, versionamento del codice e prototipazione rapida UI/UX.', { size: 12, style: 'Regular', color: C.slateMuted }));

      const toolSkills = [
        { name: 'Git & GitHub', desc: 'Version control distribuito, pull request, branching e code review', hash: 'c8f451336d2b7dc0d4170610b7bf25acde40d626' },
        { name: 'Figma & Canva', desc: 'Design UI/UX, wireframe, prototipazione interattiva e design system', hash: '3529c4f94f753e0f0b59efac391da21854edb303' },
        { name: 'Project Management', desc: 'Trello, Notion, Milanote, Miro per gestione sprint agili', hash: '42e1d966e9dfbdde9afd18ab0c9d29dd94d63220' },
        { name: 'AI & Prompt Eng.', desc: 'ChatGPT, Gemini API, automazione workflow e accelerazione codice', hash: '5ef244159a9d89b672c51d892141e64df9233e8e' },
      ];

      for (const s of toolSkills) {
        const item = figma.createFrame();
        item.layoutMode = 'HORIZONTAL';
        item.primaryAxisSizingMode = 'FIXED';
        item.counterAxisSizingMode = 'AUTO';
        item.resize(373, 50);
        item.counterAxisAlignItems = 'CENTER';
        item.itemSpacing = 12;
        item.fills = [];

        if (s.hash) {
          const iconBox = figma.createFrame();
          iconBox.resize(36, 36);
          iconBox.cornerRadius = 8;
          iconBox.fills = imgFill(s.hash);
          iconBox.strokes = solid(C.borderMedium);
          iconBox.strokeWeight = 1;
          item.appendChild(iconBox);
        } else {
          const badgeIcon = figma.createFrame();
          badgeIcon.resize(36, 36);
          badgeIcon.cornerRadius = 8;
          badgeIcon.fills = solid(C.burgundyTint);
          badgeIcon.strokes = solid(C.burgundyBorder);
          badgeIcon.strokeWeight = 1;
          badgeIcon.primaryAxisAlignItems = 'CENTER';
          badgeIcon.counterAxisAlignItems = 'CENTER';
          const dot = figma.createEllipse();
          dot.resize(10, 10);
          dot.fills = solid(C.burgundy);
          badgeIcon.appendChild(dot);
          item.appendChild(badgeIcon);
        }

        const textBox = figma.createFrame();
        textBox.layoutMode = 'VERTICAL';
        textBox.primaryAxisSizingMode = 'AUTO';
        textBox.counterAxisSizingMode = 'FIXED';
        textBox.resize(320, 44);
        textBox.itemSpacing = 2;
        textBox.fills = [];
        textBox.appendChild(txt(s.name, { size: 13, style: 'Bold', color: C.charcoal }));
        textBox.appendChild(txt(s.desc, { size: 11, style: 'Regular', color: C.slateMuted }));
        item.appendChild(textBox);

        col3.appendChild(item);
      }
      compGrid.appendChild(col3);

      sec02.appendChild(compGrid);
      master.appendChild(sec02);

      // ==========================================
      // SECTION 03 // ESPERIENZE PROFESSIONALI
      // ==========================================
      const sec03 = figma.createFrame();
      sec03.name = '03 // ESPERIENZE PROFESSIONALI';
      sec03.layoutMode = 'VERTICAL';
      sec03.primaryAxisSizingMode = 'AUTO';
      sec03.counterAxisSizingMode = 'FIXED';
      sec03.resize(1440, 100);
      sec03.paddingLeft = 64;
      sec03.paddingRight = 64;
      sec03.paddingTop = 64;
      sec03.paddingBottom = 72;
      sec03.itemSpacing = 36;
      sec03.fills = solid(C.white);
      sec03.strokes = solid(C.borderLight);
      sec03.strokeWeight = 1;

      // Section Header Block
      const s3Header = figma.createFrame();
      s3Header.name = 'Section 03 Header';
      s3Header.layoutMode = 'VERTICAL';
      s3Header.primaryAxisSizingMode = 'AUTO';
      s3Header.counterAxisSizingMode = 'FIXED';
      s3Header.resize(1312, 100);
      s3Header.itemSpacing = 8;
      s3Header.fills = [];

      s3Header.appendChild(badge('03 // ESPERIENZE', { bg: C.burgundyTint, border: C.burgundyBorder, text: C.burgundy, size: 11 }));
      s3Header.appendChild(txt('Esperienze Lavorative & Percorso Professionale', { size: 32, style: 'Bold', color: C.charcoal, letterSpacing: -1 }));
      s3Header.appendChild(txt('Produzione attiva di videogiochi ed esperienze interattive B2B, ricerca su Mixed Reality e docenza specialistica.', { size: 15, style: 'Regular', color: C.slateMuted }));
      sec03.appendChild(s3Header);

      // 4 Experience Cards: 2 Rows of 2 Columns
      const expContainer = figma.createFrame();
      expContainer.name = 'Experience Cards Grid';
      expContainer.layoutMode = 'VERTICAL';
      expContainer.primaryAxisSizingMode = 'AUTO';
      expContainer.counterAxisSizingMode = 'FIXED';
      expContainer.resize(1312, 100);
      expContainer.itemSpacing = 24;
      expContainer.fills = [];

      const expList = [
        {
          company: 'Skill Factory',
          typeBadge: 'Somministrazione / Docenza',
          role: 'Docente Unity & C# · Back-end Developer',
          period: '2025 - Presente (Luglio 2026)',
          logoHash: null,
          bullets: [
            'Insegnamento pratico di Unity e programmazione orientata agli oggetti (OOP) in linguaggio C#.',
            'Sviluppo piattaforma web aziendale focalizzato sul Back-end tramite Java / Spring Boot + Thymeleaf.',
            'Monitoraggio continuo di progetti studenteschi, supporto tecnico e sessioni di code review.'
          ],
          tags: ['Unity', 'C#', 'Java', 'Spring Boot', 'Thymeleaf', 'Didattica', 'OOP']
        },
        {
          company: "L'ABCD Edutainment",
          typeBadge: 'Tirocinio Extracurriculare',
          role: 'Sviluppatore VR / Unity & MR-HMI',
          period: '2024 - 2025 (Gennaio - Aprile 2026)',
          logoHash: null,
          bullets: [
            'Collaborazione alla ricerca e sviluppo di progetti orientati alla didattica per la piattaforma MR zSpace e MR-HMI.',
            'Sviluppo in C# dei sistemi e wrapper multi SDK per l interazione spaziale 3D.',
            'Concept grafico (Figma-Canva) e implementazione UI & UX interattiva tramite uGUI.'
          ],
          tags: ['Mixed Reality', 'zSpace', 'Multi SDK', 'C#', 'uGUI', 'MR-HMI', 'R&D']
        },
        {
          company: 'Protom Group',
          typeBadge: 'Somministrazione',
          role: 'Programmatore Unity & XR · Front-end Developer',
          period: '2023 - 2024 (Novembre 2025)',
          logoHash: '925a27742bcc95a9a1a00149015a08aaf052f45b',
          bullets: [
            'Co-sviluppo piattaforma web focalizzato sul Front-end tramite HTML5, CSS3 e JavaScript.',
            'Prototipazione e programmazione moduli interattivi Unity & XR per clienti enterprise.',
            'Integrazione pipeline asset grafici e ottimizzazione del rendering real-time.'
          ],
          tags: ['Front-end', 'HTML5', 'CSS3', 'JavaScript', 'Unity XR', 'Enterprise']
        },
        {
          company: 'Katabasi Studio',
          typeBadge: 'Tirocinio Curriculare · Oltre 720 Ore',
          role: 'Unity & Gameplay Programmer',
          period: 'Nov 2024 - Apr 2025',
          logoHash: '8b86bec8ba17ef4b4cc772f6ff532129cb694d4e',
          bullets: [
            'Durante i 5 mesi di stage (oltre 720 ore) ho collaborato attivamente allo sviluppo di due prodotti B2B realizzati in Unity e distribuiti su WebGL.',
            'Architettura software in C#, integrazione UI (uGUI), gestione localizzazione e Custom Editor Tools per ottimizzare il workflow.',
            'Testing, profilazione performance e packaging build WebGL cross-browser.'
          ],
          tags: ['Unity', 'C#', 'WebGL', 'B2B Solutions', 'Custom Editor Tools', 'Localization', '720+ Ore']
        }
      ];

      for (let r = 0; r < 2; r++) {
        const row = figma.createFrame();
        row.name = 'Exp Row ' + (r + 1);
        row.layoutMode = 'HORIZONTAL';
        row.primaryAxisSizingMode = 'FIXED';
        row.counterAxisSizingMode = 'AUTO';
        row.resize(1312, 100);
        row.primaryAxisAlignItems = 'SPACE_BETWEEN';
        row.itemSpacing = 24;
        row.fills = [];

        for (let c = 0; c < 2; c++) {
          const exp = expList[r * 2 + c];
          const expCard = figma.createFrame();
          expCard.name = 'Exp Card: ' + exp.company;
          expCard.layoutMode = 'VERTICAL';
          expCard.primaryAxisSizingMode = 'AUTO';
          expCard.counterAxisSizingMode = 'FIXED';
          expCard.resize(644, 100);
          expCard.paddingLeft = 24;
          expCard.paddingRight = 24;
          expCard.paddingTop = 22;
          expCard.paddingBottom = 22;
          expCard.itemSpacing = 14;
          expCard.cornerRadius = 12;
          expCard.fills = solid(C.ivory);
          expCard.strokes = solid(C.borderLight);
          expCard.strokeWeight = 1;

          // Card Top Bar with Company & Logo
          const topBar = figma.createFrame();
          topBar.name = 'Top Company Bar';
          topBar.layoutMode = 'HORIZONTAL';
          topBar.primaryAxisSizingMode = 'FIXED';
          topBar.counterAxisSizingMode = 'AUTO';
          topBar.resize(596, 44);
          topBar.primaryAxisAlignItems = 'SPACE_BETWEEN';
          topBar.counterAxisAlignItems = 'CENTER';
          topBar.fills = [];

          const companyBox = figma.createFrame();
          companyBox.layoutMode = 'HORIZONTAL';
          companyBox.primaryAxisSizingMode = 'AUTO';
          companyBox.counterAxisSizingMode = 'AUTO';
          companyBox.counterAxisAlignItems = 'CENTER';
          companyBox.itemSpacing = 12;
          companyBox.fills = [];

          if (exp.logoHash) {
            const logoFrame = figma.createFrame();
            logoFrame.resize(40, 40);
            logoFrame.cornerRadius = 8;
            logoFrame.fills = imgFill(exp.logoHash);
            logoFrame.strokes = solid(C.borderMedium);
            logoFrame.strokeWeight = 1;
            companyBox.appendChild(logoFrame);
          } else {
            const logoPlaceholder = figma.createFrame();
            logoPlaceholder.resize(40, 40);
            logoPlaceholder.cornerRadius = 8;
            logoPlaceholder.fills = solid(C.burgundyTint);
            logoPlaceholder.strokes = solid(C.burgundyBorder);
            logoPlaceholder.strokeWeight = 1;
            logoPlaceholder.primaryAxisAlignItems = 'CENTER';
            logoPlaceholder.counterAxisAlignItems = 'CENTER';
            const initial = txt(exp.company.slice(0, 2).toUpperCase(), { size: 14, style: 'Bold', color: C.burgundy });
            logoPlaceholder.appendChild(initial);
            companyBox.appendChild(logoPlaceholder);
          }

          const compTitleBox = figma.createFrame();
          compTitleBox.layoutMode = 'VERTICAL';
          compTitleBox.primaryAxisSizingMode = 'AUTO';
          compTitleBox.counterAxisSizingMode = 'AUTO';
          compTitleBox.itemSpacing = 2;
          compTitleBox.fills = [];
          compTitleBox.appendChild(txt(exp.company, { size: 17, style: 'Bold', color: C.charcoal }));
          compTitleBox.appendChild(txt(exp.role, { size: 12, style: 'Semi Bold', color: C.burgundy }));
          companyBox.appendChild(compTitleBox);

          topBar.appendChild(companyBox);

          const badgeBox = badge(exp.typeBadge, { bg: C.white, border: C.borderLight, text: C.slateDark, size: 10 });
          topBar.appendChild(badgeBox);

          expCard.appendChild(topBar);

          // Period badge
          const periodRow = figma.createFrame();
          periodRow.layoutMode = 'HORIZONTAL';
          periodRow.primaryAxisSizingMode = 'AUTO';
          periodRow.counterAxisSizingMode = 'AUTO';
          periodRow.itemSpacing = 8;
          periodRow.counterAxisAlignItems = 'CENTER';
          periodRow.fills = [];
          periodRow.appendChild(txt('📅 ' + exp.period, { size: 12, style: 'Medium', color: C.slateMuted }));
          expCard.appendChild(periodRow);

          // Bullets
          const bulletsBox = figma.createFrame();
          bulletsBox.name = 'Bullet points';
          bulletsBox.layoutMode = 'VERTICAL';
          bulletsBox.primaryAxisSizingMode = 'AUTO';
          bulletsBox.counterAxisSizingMode = 'FIXED';
          bulletsBox.resize(596, 100);
          bulletsBox.itemSpacing = 8;
          bulletsBox.fills = [];

          for (const b of exp.bullets) {
            const bTxt = txt('• ' + b, { size: 12, style: 'Regular', color: C.slateDark, lineHeight: 18 });
            bulletsBox.appendChild(bTxt);
          }
          expCard.appendChild(bulletsBox);

          // Tags row
          const tagsRow = figma.createFrame();
          tagsRow.name = 'Tech Tags';
          tagsRow.layoutMode = 'HORIZONTAL';
          tagsRow.primaryAxisSizingMode = 'FIXED';
          tagsRow.counterAxisSizingMode = 'AUTO';
          tagsRow.resize(596, 26);
          tagsRow.itemSpacing = 6;
          tagsRow.fills = [];

          for (const tag of exp.tags) {
            const tBadge = badge(tag, { bg: C.white, border: C.borderMedium, text: C.slateMuted, size: 10, style: 'Medium' });
            tagsRow.appendChild(tBadge);
          }
          expCard.appendChild(tagsRow);

          row.appendChild(expCard);
        }
        expContainer.appendChild(row);
      }

      sec03.appendChild(expContainer);
      master.appendChild(sec03);

      // ==========================================
      // SECTION 04 // PROGETTI IN EVIDENZA
      // ==========================================
      const sec04 = figma.createFrame();
      sec04.name = '04 // PROGETTI IN EVIDENZA';
      sec04.layoutMode = 'VERTICAL';
      sec04.primaryAxisSizingMode = 'AUTO';
      sec04.counterAxisSizingMode = 'FIXED';
      sec04.resize(1440, 100);
      sec04.paddingLeft = 64;
      sec04.paddingRight = 64;
      sec04.paddingTop = 64;
      sec04.paddingBottom = 72;
      sec04.itemSpacing = 36;
      sec04.fills = solid(C.ivory);
      sec04.strokes = solid(C.borderLight);
      sec04.strokeWeight = 1;

      // Section Header Block
      const s4Header = figma.createFrame();
      s4Header.name = 'Section 04 Header';
      s4Header.layoutMode = 'VERTICAL';
      s4Header.primaryAxisSizingMode = 'AUTO';
      s4Header.counterAxisSizingMode = 'FIXED';
      s4Header.resize(1312, 100);
      s4Header.itemSpacing = 8;
      s4Header.fills = [];

      s4Header.appendChild(badge('04 // PROGETTI', { bg: C.burgundyTint, border: C.burgundyBorder, text: C.burgundy, size: 11 }));
      s4Header.appendChild(txt('Portfolio Opere & Produzioni Videoludiche', { size: 32, style: 'Bold', color: C.charcoal, letterSpacing: -1 }));
      s4Header.appendChild(txt('Curated showcase con artwork originali, architettura in C# e produzioni complete.', { size: 15, style: 'Regular', color: C.slateMuted }));
      sec04.appendChild(s4Header);

      // Projects Container
      const projContainer = figma.createFrame();
      projContainer.name = 'Projects Container';
      projContainer.layoutMode = 'VERTICAL';
      projContainer.primaryAxisSizingMode = 'AUTO';
      projContainer.counterAxisSizingMode = 'FIXED';
      projContainer.resize(1312, 100);
      projContainer.itemSpacing = 24;
      projContainer.fills = [];

      // Row 1: 2 Big Cards (Violinum & Lock Fight)
      const pRow1 = figma.createFrame();
      pRow1.name = 'Featured Projects Row 1';
      pRow1.layoutMode = 'HORIZONTAL';
      pRow1.primaryAxisSizingMode = 'FIXED';
      pRow1.counterAxisSizingMode = 'AUTO';
      pRow1.resize(1312, 100);
      pRow1.primaryAxisAlignItems = 'SPACE_BETWEEN';
      pRow1.itemSpacing = 24;
      pRow1.fills = [];

      const featuredProjects = [
        {
          title: 'Violinum',
          badge: 'ITALIAN GAME 2025 SELECTION · VR EXPERIENCE',
          period: 'Ottobre 2024 - Maggio 2025',
          desc: 'Esperienza VR immersiva e narrativa selezionata per Italian Game 2025. Sviluppo interazioni musicali aptiche, audio spaziale e rendering VR ottimizzato in C# per headset standalone.',
          imgHash: 'bf75d80ee060d6305c0a3112de92eae62902e8a6',
          tags: ['Unity', 'C#', 'Virtual Reality', '3D Audio', 'Italian Game 2025']
        },
        {
          title: 'Lock Fight',
          badge: 'TACTICAL STRATEGY GAME · SETTEMBRE - OTTOBRE 2024',
          period: 'Settembre 2024 - Ottobre 2024',
          desc: 'Videogioco tattico strategico a turni con gestione dello stato della partita, griglia di movimento e intelligenza artificiale per i comportamenti nemici sviluppato in Unity (C#).',
          imgHash: '62f781e13506e3cf0f8410c26b60d57d2f602520',
          tags: ['Unity', 'C#', 'Turn-based Tactics', 'Grid Movement', 'AI State Machine']
        }
      ];

      for (const p of featuredProjects) {
        const pCard = figma.createFrame();
        pCard.name = 'Project Card: ' + p.title;
        pCard.layoutMode = 'VERTICAL';
        pCard.primaryAxisSizingMode = 'AUTO';
        pCard.counterAxisSizingMode = 'FIXED';
        pCard.resize(644, 100);
        pCard.cornerRadius = 14;
        pCard.clipsContent = true;
        pCard.fills = solid(C.white);
        pCard.strokes = solid(C.borderLight);
        pCard.strokeWeight = 1;
        pCard.itemSpacing = 0;

        // Image banner
        const imgBanner = figma.createFrame();
        imgBanner.name = 'Project Artwork: ' + p.title;
        imgBanner.resize(644, 240);
        imgBanner.fills = imgFill(p.imgHash);
        pCard.appendChild(imgBanner);

        // Content
        const content = figma.createFrame();
        content.name = 'Project Content';
        content.layoutMode = 'VERTICAL';
        content.primaryAxisSizingMode = 'AUTO';
        content.counterAxisSizingMode = 'FIXED';
        content.resize(644, 100);
        content.paddingLeft = 24;
        content.paddingRight = 24;
        content.paddingTop = 20;
        content.paddingBottom = 24;
        content.itemSpacing = 12;
        content.fills = [];

        content.appendChild(badge(p.badge, { bg: C.burgundyTint, border: C.burgundyBorder, text: C.burgundy, size: 10 }));
        content.appendChild(txt(p.title, { size: 24, style: 'Bold', color: C.charcoal, letterSpacing: -0.5 }));
        content.appendChild(txt(p.desc, { size: 13, style: 'Regular', color: C.slateDark, lineHeight: 20 }));

        const pTags = figma.createFrame();
        pTags.layoutMode = 'HORIZONTAL';
        pTags.primaryAxisSizingMode = 'FIXED';
        pTags.counterAxisSizingMode = 'AUTO';
        pTags.resize(596, 26);
        pTags.itemSpacing = 8;
        pTags.fills = [];
        for (const t of p.tags) {
          pTags.appendChild(badge(t, { bg: C.ivory, border: C.borderLight, text: C.slateDark, size: 10, style: 'Medium' }));
        }
        content.appendChild(pTags);

        pCard.appendChild(content);
        pRow1.appendChild(pCard);
      }
      projContainer.appendChild(pRow1);

      // Row 2: 3 Cards (Rusheep, Sfuryatell, Project Works ITS)
      const pRow2 = figma.createFrame();
      pRow2.name = 'Featured Projects Row 2';
      pRow2.layoutMode = 'HORIZONTAL';
      pRow2.primaryAxisSizingMode = 'FIXED';
      pRow2.counterAxisSizingMode = 'AUTO';
      pRow2.resize(1312, 100);
      pRow2.primaryAxisAlignItems = 'SPACE_BETWEEN';
      pRow2.itemSpacing = 24;
      pRow2.fills = [];

      const triProjects = [
        {
          title: 'Rusheep',
          badge: '2D PHYSICS RUNNER · AGOSTO 2024',
          desc: 'Endless runner dinamico 2D basato sulla fisica dei corpi rigidi, generazione procedurale degli ostacoli e feedback arcade immediato.',
          imgHash: 'eeb2bca4eba61de408ed31499fc232fce6aa14fe',
          tags: ['Unity 2D', 'Rigidbody Physics', 'Procedural']
        },
        {
          title: 'Sfuryatell - ISAS',
          badge: 'FAST ARCADE GAME · GEN - SET 2023',
          desc: 'Arcade frenetico sviluppato presso ISAS Videogames Academy. Realizzazione interfaccia avanzata con UI Toolkit e logica di gameplay.',
          imgHash: 'fd8e4a0a1fc38f89ec673837222b53e9053f6f6a',
          tags: ['Unity', 'UI Toolkit', 'ISAS Academy', 'Arcade']
        },
        {
          title: 'Project Works - ITS Lazio Digital',
          badge: 'EXTENDED REALITY · 2024 - 2025',
          desc: 'Collezione di moduli applicativi XR, interazioni spaziali multi-target e simulazioni interattive realizzate nel biennio ITS.',
          imgHash: '4a2575f002cef569a18d92e37e8dcba50ff5ed0d',
          tags: ['Mixed Reality', 'Unity', 'OpenXR', 'Simulation']
        }
      ];

      for (const p of triProjects) {
        const pCard = figma.createFrame();
        pCard.name = 'Project Card: ' + p.title;
        pCard.layoutMode = 'VERTICAL';
        pCard.primaryAxisSizingMode = 'AUTO';
        pCard.counterAxisSizingMode = 'FIXED';
        pCard.resize(421, 100);
        pCard.cornerRadius = 12;
        pCard.clipsContent = true;
        pCard.fills = solid(C.white);
        pCard.strokes = solid(C.borderLight);
        pCard.strokeWeight = 1;
        pCard.itemSpacing = 0;

        const imgBanner = figma.createFrame();
        imgBanner.name = 'Artwork: ' + p.title;
        imgBanner.resize(421, 180);
        imgBanner.fills = imgFill(p.imgHash);
        pCard.appendChild(imgBanner);

        const content = figma.createFrame();
        content.name = 'Project Content';
        content.layoutMode = 'VERTICAL';
        content.primaryAxisSizingMode = 'AUTO';
        content.counterAxisSizingMode = 'FIXED';
        content.resize(421, 100);
        content.paddingLeft = 20;
        content.paddingRight = 20;
        content.paddingTop = 18;
        content.paddingBottom = 20;
        content.itemSpacing = 10;
        content.fills = [];

        content.appendChild(badge(p.badge, { bg: C.burgundyTint, border: C.burgundyBorder, text: C.burgundy, size: 9 }));
        content.appendChild(txt(p.title, { size: 19, style: 'Bold', color: C.charcoal, letterSpacing: -0.5 }));
        content.appendChild(txt(p.desc, { size: 12, style: 'Regular', color: C.slateDark, lineHeight: 18 }));

        const pTags = figma.createFrame();
        pTags.layoutMode = 'HORIZONTAL';
        pTags.primaryAxisSizingMode = 'FIXED';
        pTags.counterAxisSizingMode = 'AUTO';
        pTags.resize(381, 24);
        pTags.itemSpacing = 6;
        pTags.fills = [];
        for (const t of p.tags) {
          pTags.appendChild(badge(t, { bg: C.ivory, border: C.borderLight, text: C.slateDark, size: 9, style: 'Medium' }));
        }
        content.appendChild(pTags);

        pCard.appendChild(content);
        pRow2.appendChild(pCard);
      }
      projContainer.appendChild(pRow2);

      // Row 3: Game Jams & Atmosphere Card (Il Rito, Please Open The Door, Portfolio Web)
      const pRow3 = figma.createFrame();
      pRow3.name = 'Game Jams & Prototipi (Il Rito, Please Open The Door)';
      pRow3.layoutMode = 'HORIZONTAL';
      pRow3.primaryAxisSizingMode = 'FIXED';
      pRow3.counterAxisSizingMode = 'AUTO';
      pRow3.resize(1312, 100);
      pRow3.paddingLeft = 24;
      pRow3.paddingRight = 24;
      pRow3.paddingTop = 20;
      pRow3.paddingBottom = 20;
      pRow3.itemSpacing = 24;
      pRow3.counterAxisAlignItems = 'CENTER';
      pRow3.cornerRadius = 12;
      pRow3.fills = solid(C.white);
      pRow3.strokes = solid(C.borderLight);
      pRow3.strokeWeight = 1;

      const p3Img = figma.createFrame();
      p3Img.resize(180, 100);
      p3Img.cornerRadius = 8;
      p3Img.fills = imgFill('66d2f5d4b8e46702da7f063e9804910966dd5fa6');
      pRow3.appendChild(p3Img);

      const p3TxtBox = figma.createFrame();
      p3TxtBox.layoutMode = 'VERTICAL';
      p3TxtBox.primaryAxisSizingMode = 'AUTO';
      p3TxtBox.counterAxisSizingMode = 'FIXED';
      p3TxtBox.resize(1040, 100);
      p3TxtBox.itemSpacing = 6;
      p3TxtBox.fills = [];

      p3TxtBox.appendChild(badge('GAME JAMS & EXPERIMENTAL TITLES', { bg: C.burgundyTint, border: C.burgundyBorder, text: C.burgundy, size: 10 }));
      p3TxtBox.appendChild(txt('Il Rito · Please Open The Door · Portfolio Web', { size: 18, style: 'Bold', color: C.charcoal }));
      p3TxtBox.appendChild(txt('Produzioni indie e game jam: Il Rito (esperimento horror d atmosfera e audio immersivo), Please Open The Door (puzzle game ad enigmi logici) e il sito web portfolio moderno sviluppato con standard web reattivi.', { size: 13, style: 'Regular', color: C.slateDark, lineHeight: 18 }));

      const p3Tags = figma.createFrame();
      p3Tags.layoutMode = 'HORIZONTAL';
      p3Tags.primaryAxisSizingMode = 'AUTO';
      p3Tags.counterAxisSizingMode = 'AUTO';
      p3Tags.itemSpacing = 8;
      p3Tags.fills = [];
      p3Tags.appendChild(badge('Il Rito (Horror Atmosphere)', { bg: C.ivory, border: C.borderLight, text: C.slateDark, size: 10 }));
      p3Tags.appendChild(badge('Please Open The Door (Puzzle Game)', { bg: C.ivory, border: C.borderLight, text: C.slateDark, size: 10 }));
      p3Tags.appendChild(badge('Portfolio Sito Web', { bg: C.ivory, border: C.borderLight, text: C.slateDark, size: 10 }));
      p3TxtBox.appendChild(p3Tags);

      pRow3.appendChild(p3TxtBox);
      projContainer.appendChild(pRow3);

      sec04.appendChild(projContainer);
      master.appendChild(sec04);

      // ==========================================
      // SECTION 05 // FORMAZIONE ACCADEMICA
      // ==========================================
      const sec05 = figma.createFrame();
      sec05.name = '05 // FORMAZIONE ACCADEMICA';
      sec05.layoutMode = 'VERTICAL';
      sec05.primaryAxisSizingMode = 'AUTO';
      sec05.counterAxisSizingMode = 'FIXED';
      sec05.resize(1440, 100);
      sec05.paddingLeft = 64;
      sec05.paddingRight = 64;
      sec05.paddingTop = 64;
      sec05.paddingBottom = 72;
      sec05.itemSpacing = 36;
      sec05.fills = solid(C.white);
      sec05.strokes = solid(C.borderLight);
      sec05.strokeWeight = 1;

      // Section Header Block
      const s5Header = figma.createFrame();
      s5Header.name = 'Section 05 Header';
      s5Header.layoutMode = 'VERTICAL';
      s5Header.primaryAxisSizingMode = 'AUTO';
      s5Header.counterAxisSizingMode = 'FIXED';
      s5Header.resize(1312, 100);
      s5Header.itemSpacing = 8;
      s5Header.fills = [];

      s5Header.appendChild(badge('05 // FORMAZIONE', { bg: C.burgundyTint, border: C.burgundyBorder, text: C.burgundy, size: 11 }));
      s5Header.appendChild(txt('Istruzione, Alta Formazione & Specializzazioni', { size: 32, style: 'Bold', color: C.charcoal, letterSpacing: -1 }));
      s5Header.appendChild(txt('Un solido percorso accademico dall informatica di sistema alla Mixed Reality e al software engineering moderno.', { size: 15, style: 'Regular', color: C.slateMuted }));
      sec05.appendChild(s5Header);

      // 4 Education Cards Grid (2x2)
      const eduContainer = figma.createFrame();
      eduContainer.name = 'Education Cards Grid';
      eduContainer.layoutMode = 'VERTICAL';
      eduContainer.primaryAxisSizingMode = 'AUTO';
      eduContainer.counterAxisSizingMode = 'FIXED';
      eduContainer.resize(1312, 100);
      eduContainer.itemSpacing = 24;
      eduContainer.fills = [];

      const eduList = [
        {
          institution: '42 Roma Luiss / ELIS',
          typeBadge: 'In Corso · RNCP Livello 6 / EQF 6',
          degree: 'Software Engineering & Computer Science',
          location: 'Roma, Italia (Presenziale)',
          logoHash: null,
          bullets: [
            'Piscine C superata con successo (Ott-Nov 2026). Avvio Common Core a Marzo 2027.',
            'Approfondimento intensivo su programmazione imperativa in C, memoria manuale, Makefile e standard Unix.',
            'Metodologia didattica peer-to-peer priva di lezioni frontali, basata sull autonomia e sul problem solving critico.'
          ],
          tags: ['C', 'Unix', 'Algorithms', 'Peer-to-Peer', 'Software Engineering', 'EQF 6']
        },
        {
          institution: 'ITS Lazio Digital',
          typeBadge: 'Votazione: 101 / 110 · EQF 5',
          degree: 'Tecnico Superiore Augmented, Virtual e Mixed Reality',
          location: 'Roma, Italia · 1.080 Ore',
          logoHash: '7fed08166190bcd914b83a6fdfe8b28330e56267',
          bullets: [
            'Biennio di eccellenza tecnica (1.080 ore) dedicato alle tecnologie immersive e allo sviluppo real-time.',
            'Specializzazione in Unity (C#) e Unreal Engine 5 per visori XR, simulatori e applicazioni spaziali.',
            'Sviluppo di project works applicativi in team e tesi con punteggio finale di 101/110.'
          ],
          tags: ['Augmented Reality', 'Virtual Reality', 'Mixed Reality', 'Unity', 'UE5', 'EQF 5']
        },
        {
          institution: 'ITIS Alessandro Volta',
          typeBadge: 'Votazione: 100 / 100 · EQF 4',
          degree: 'Diploma Tecnico in Informatica e Telecomunicazioni',
          location: 'Napoli, Italia (Presenziale)',
          logoHash: '3c8e87db2b1545d7045cce47fa9d4c3689f43e8b',
          bullets: [
            'Diploma statale quinquennale conseguito con votazione massima di 100/100.',
            'Solida formazione teorica e pratica su linguaggi OOP, architettura dei calcolatori e sistemi operativi.',
            'Reti di telecomunicazione, protocolli Cisco e progettazione database relazionali SQL.'
          ],
          tags: ['Informatica', 'Telecomunicazioni', '100/100', 'Networking', 'SQL', 'OOP']
        },
        {
          institution: 'ISAS Videogames Academy',
          typeBadge: 'Corso Specialistico · 475 Ore',
          degree: 'Game Design & Game Development',
          location: 'Napoli, Italia · Ott 2022 - Set 2023',
          logoHash: '10f8c9915824d3a8482ad3a642ebb832c812d61a',
          bullets: [
            'Percorso pratico intensivo di 475 ore focalizzato sulla pipeline completa di produzione videoludica.',
            'Game loop, architettura gameplay in C#, fisica 2D/3D e programmazione interfaccia UI Toolkit.',
            'Sviluppo completo e rilascio del progetto videoludico Sfuryatell.'
          ],
          tags: ['Game Development', 'Game Design', 'Unity', 'C#', 'UI Toolkit', 'ISAS']
        }
      ];

      for (let r = 0; r < 2; r++) {
        const row = figma.createFrame();
        row.name = 'Edu Row ' + (r + 1);
        row.layoutMode = 'HORIZONTAL';
        row.primaryAxisSizingMode = 'FIXED';
        row.counterAxisSizingMode = 'AUTO';
        row.resize(1312, 100);
        row.primaryAxisAlignItems = 'SPACE_BETWEEN';
        row.itemSpacing = 24;
        row.fills = [];

        for (let c = 0; c < 2; c++) {
          const edu = eduList[r * 2 + c];
          const eduCard = figma.createFrame();
          eduCard.name = 'Edu Card: ' + edu.institution;
          eduCard.layoutMode = 'VERTICAL';
          eduCard.primaryAxisSizingMode = 'AUTO';
          eduCard.counterAxisSizingMode = 'FIXED';
          eduCard.resize(644, 100);
          eduCard.paddingLeft = 24;
          eduCard.paddingRight = 24;
          eduCard.paddingTop = 22;
          eduCard.paddingBottom = 22;
          eduCard.itemSpacing = 14;
          eduCard.cornerRadius = 12;
          eduCard.fills = solid(C.ivory);
          eduCard.strokes = solid(C.borderLight);
          eduCard.strokeWeight = 1;

          // Card Top Bar with Institution & Logo
          const topBar = figma.createFrame();
          topBar.name = 'Top Institution Bar';
          topBar.layoutMode = 'HORIZONTAL';
          topBar.primaryAxisSizingMode = 'FIXED';
          topBar.counterAxisSizingMode = 'AUTO';
          topBar.resize(596, 44);
          topBar.primaryAxisAlignItems = 'SPACE_BETWEEN';
          topBar.counterAxisAlignItems = 'CENTER';
          topBar.fills = [];

          const instBox = figma.createFrame();
          instBox.layoutMode = 'HORIZONTAL';
          instBox.primaryAxisSizingMode = 'AUTO';
          instBox.counterAxisSizingMode = 'AUTO';
          instBox.counterAxisAlignItems = 'CENTER';
          instBox.itemSpacing = 12;
          instBox.fills = [];

          if (edu.logoHash) {
            const logoFrame = figma.createFrame();
            logoFrame.resize(40, 40);
            logoFrame.cornerRadius = 8;
            logoFrame.fills = imgFill(edu.logoHash);
            logoFrame.strokes = solid(C.borderMedium);
            logoFrame.strokeWeight = 1;
            instBox.appendChild(logoFrame);
          } else {
            const logoPlaceholder = figma.createFrame();
            logoPlaceholder.resize(40, 40);
            logoPlaceholder.cornerRadius = 8;
            logoPlaceholder.fills = solid(C.burgundyTint);
            logoPlaceholder.strokes = solid(C.burgundyBorder);
            logoPlaceholder.strokeWeight = 1;
            logoPlaceholder.primaryAxisAlignItems = 'CENTER';
            logoPlaceholder.counterAxisAlignItems = 'CENTER';
            const initial = txt(edu.institution.slice(0, 2).toUpperCase(), { size: 14, style: 'Bold', color: C.burgundy });
            logoPlaceholder.appendChild(initial);
            instBox.appendChild(logoPlaceholder);
          }

          const instTitleBox = figma.createFrame();
          instTitleBox.layoutMode = 'VERTICAL';
          instTitleBox.primaryAxisSizingMode = 'AUTO';
          instTitleBox.counterAxisSizingMode = 'AUTO';
          instTitleBox.itemSpacing = 2;
          instTitleBox.fills = [];
          instTitleBox.appendChild(txt(edu.institution, { size: 17, style: 'Bold', color: C.charcoal }));
          instTitleBox.appendChild(txt(edu.degree, { size: 12, style: 'Semi Bold', color: C.burgundy }));
          instBox.appendChild(instTitleBox);

          topBar.appendChild(instBox);

          const badgeBox = badge(edu.typeBadge, { bg: C.white, border: C.borderLight, text: C.slateDark, size: 10 });
          topBar.appendChild(badgeBox);

          eduCard.appendChild(topBar);

          // Location row
          const locRow = figma.createFrame();
          locRow.layoutMode = 'HORIZONTAL';
          locRow.primaryAxisSizingMode = 'AUTO';
          locRow.counterAxisSizingMode = 'AUTO';
          locRow.itemSpacing = 8;
          locRow.counterAxisAlignItems = 'CENTER';
          locRow.fills = [];
          locRow.appendChild(txt('📍 ' + edu.location, { size: 12, style: 'Medium', color: C.slateMuted }));
          eduCard.appendChild(locRow);

          // Bullets
          const bulletsBox = figma.createFrame();
          bulletsBox.name = 'Bullet points';
          bulletsBox.layoutMode = 'VERTICAL';
          bulletsBox.primaryAxisSizingMode = 'AUTO';
          bulletsBox.counterAxisSizingMode = 'FIXED';
          bulletsBox.resize(596, 100);
          bulletsBox.itemSpacing = 8;
          bulletsBox.fills = [];

          for (const b of edu.bullets) {
            const bTxt = txt('• ' + b, { size: 12, style: 'Regular', color: C.slateDark, lineHeight: 18 });
            bulletsBox.appendChild(bTxt);
          }
          eduCard.appendChild(bulletsBox);

          // Tags row
          const tagsRow = figma.createFrame();
          tagsRow.name = 'Degree Tags';
          tagsRow.layoutMode = 'HORIZONTAL';
          tagsRow.primaryAxisSizingMode = 'FIXED';
          tagsRow.counterAxisSizingMode = 'AUTO';
          tagsRow.resize(596, 26);
          tagsRow.itemSpacing = 6;
          tagsRow.fills = [];

          for (const tag of edu.tags) {
            const tBadge = badge(tag, { bg: C.white, border: C.borderMedium, text: C.slateMuted, size: 10, style: 'Medium' });
            tagsRow.appendChild(tBadge);
          }
          eduCard.appendChild(tagsRow);

          row.appendChild(eduCard);
        }
        eduContainer.appendChild(row);
      }

      // Forma.Temp Professional Courses Strip
      const ftStrip = figma.createFrame();
      ftStrip.name = 'Forma.Temp Courses Strip';
      ftStrip.layoutMode = 'HORIZONTAL';
      ftStrip.primaryAxisSizingMode = 'FIXED';
      ftStrip.counterAxisSizingMode = 'AUTO';
      ftStrip.resize(1312, 100);
      ftStrip.paddingLeft = 24;
      ftStrip.paddingRight = 24;
      ftStrip.paddingTop = 18;
      ftStrip.paddingBottom = 18;
      ftStrip.itemSpacing = 24;
      ftStrip.counterAxisAlignItems = 'CENTER';
      ftStrip.cornerRadius = 10;
      ftStrip.fills = solid(C.ivory);
      ftStrip.strokes = solid(C.borderLight);
      ftStrip.strokeWeight = 1;

      ftStrip.appendChild(txt('FORMAZIONE PROFESSIONALE CONTINUA (FORMA.TEMP):', { size: 11, style: 'Bold', color: C.burgundy, letterSpacing: 1 }));

      const ft1 = txt('• Skill Factory: Tecnico della Programmazione (240 Ore · Apr - Giu 2026 · Java, Spring Boot, Web)', { size: 12, style: 'Medium', color: C.slateDark });
      const ft2 = txt('• Protom: Full Stack Developer (160 Ore · Set - Ott 2025 · HTML5, CSS3, JS, Relational DB)', { size: 12, style: 'Medium', color: C.slateDark });
      ftStrip.appendChild(ft1);
      ftStrip.appendChild(ft2);

      eduContainer.appendChild(ftStrip);
      sec05.appendChild(eduContainer);
      master.appendChild(sec05);

      // ==========================================
      // SECTION 06 // CERTIFICAZIONI & CONTATTO
      // ==========================================
      const sec06 = figma.createFrame();
      sec06.name = '06 // CERTIFICAZIONI & CONTATTO';
      sec06.layoutMode = 'VERTICAL';
      sec06.primaryAxisSizingMode = 'AUTO';
      sec06.counterAxisSizingMode = 'FIXED';
      sec06.resize(1440, 100);
      sec06.paddingLeft = 64;
      sec06.paddingRight = 64;
      sec06.paddingTop = 64;
      sec06.paddingBottom = 64;
      sec06.itemSpacing = 36;
      sec06.fills = solid(C.ivory);
      sec06.strokes = solid(C.borderLight);
      sec06.strokeWeight = 1;

      // Section Header Block
      const s6Header = figma.createFrame();
      s6Header.name = 'Section 06 Header';
      s6Header.layoutMode = 'VERTICAL';
      s6Header.primaryAxisSizingMode = 'AUTO';
      s6Header.counterAxisSizingMode = 'FIXED';
      s6Header.resize(1312, 100);
      s6Header.itemSpacing = 8;
      s6Header.fills = [];

      s6Header.appendChild(badge('06 // CONTATTO', { bg: C.burgundyTint, border: C.burgundyBorder, text: C.burgundy, size: 11 }));
      s6Header.appendChild(txt('Certificazioni Ufficiali & Opportunità di Collaborazione', { size: 32, style: 'Bold', color: C.charcoal, letterSpacing: -1 }));
      s6Header.appendChild(txt('Attestazioni di competenza tecnica e canali diretti per colloqui, contratti ed incarichi di sviluppo.', { size: 15, style: 'Regular', color: C.slateMuted }));
      sec06.appendChild(s6Header);

      // Certifications Strip (3 Cards)
      const certStrip = figma.createFrame();
      certStrip.name = 'Certifications Strip';
      certStrip.layoutMode = 'HORIZONTAL';
      certStrip.primaryAxisSizingMode = 'FIXED';
      certStrip.counterAxisSizingMode = 'AUTO';
      certStrip.resize(1312, 100);
      certStrip.primaryAxisAlignItems = 'SPACE_BETWEEN';
      certStrip.itemSpacing = 20;
      certStrip.fills = [];

      const certs = [
        {
          title: 'Epass 7 Moduli User',
          type: 'Competenze Digitali Europee',
          desc: 'Certificazione informatica europea accreditata su software, sicurezza dati e produttività.',
          imgHash: 'b12d7b877e0de82f27c4873a9a28285955916248'
        },
        {
          title: 'Cisco Cybersecurity & Networking',
          type: 'Architettura Reti & Sicurezza',
          desc: 'Attestazione su concetti di rete, protocolli di comunicazione, switching e cyber threat management.',
          imgHash: '8d6fb627f2fa41db7d44cf2d4235046dddc72735'
        },
        {
          title: 'Rome Video Game Lab & Gaming Week',
          type: 'Industry Workshop & Networking',
          desc: 'Partecipazione ufficiale e attestato di frequenza ai workshop dedicati al game development e XR.',
          imgHash: null
        }
      ];

      for (const cert of certs) {
        const cCard = figma.createFrame();
        cCard.name = 'Cert Card: ' + cert.title;
        cCard.layoutMode = 'HORIZONTAL';
        cCard.primaryAxisSizingMode = 'FIXED';
        cCard.counterAxisSizingMode = 'AUTO';
        cCard.resize(424, 90);
        cCard.paddingLeft = 18;
        cCard.paddingRight = 18;
        cCard.paddingTop = 16;
        cCard.paddingBottom = 16;
        cCard.counterAxisAlignItems = 'CENTER';
        cCard.itemSpacing = 14;
        cCard.cornerRadius = 10;
        cCard.fills = solid(C.white);
        cCard.strokes = solid(C.borderLight);
        cCard.strokeWeight = 1;

        if (cert.imgHash) {
          const cImg = figma.createFrame();
          cImg.resize(48, 48);
          cImg.cornerRadius = 8;
          cImg.fills = imgFill(cert.imgHash);
          cImg.strokes = solid(C.borderMedium);
          cImg.strokeWeight = 1;
          cCard.appendChild(cImg);
        } else {
          const cPla = figma.createFrame();
          cPla.resize(48, 48);
          cPla.cornerRadius = 8;
          cPla.fills = solid(C.burgundyTint);
          cPla.strokes = solid(C.burgundyBorder);
          cPla.strokeWeight = 1;
          cPla.primaryAxisAlignItems = 'CENTER';
          cPla.counterAxisAlignItems = 'CENTER';
          const iconTxt = txt('🏆', { size: 20 });
          cPla.appendChild(iconTxt);
          cCard.appendChild(cPla);
        }

        const cTxt = figma.createFrame();
        cTxt.layoutMode = 'VERTICAL';
        cTxt.primaryAxisSizingMode = 'AUTO';
        cTxt.counterAxisSizingMode = 'FIXED';
        cTxt.resize(326, 60);
        cTxt.itemSpacing = 2;
        cTxt.fills = [];
        cTxt.appendChild(txt(cert.title, { size: 14, style: 'Bold', color: C.charcoal }));
        cTxt.appendChild(txt(cert.type, { size: 11, style: 'Semi Bold', color: C.burgundy }));
        cTxt.appendChild(txt(cert.desc, { size: 10, style: 'Regular', color: C.slateMuted }));
        cCard.appendChild(cTxt);

        certStrip.appendChild(cCard);
      }
      sec06.appendChild(certStrip);

      // Direct Contact Card (Dark Swiss Charcoal & Burgundy Box)
      const contactBox = figma.createFrame();
      contactBox.name = 'Direct Contact Card';
      contactBox.layoutMode = 'HORIZONTAL';
      contactBox.primaryAxisSizingMode = 'FIXED';
      contactBox.counterAxisSizingMode = 'AUTO';
      contactBox.resize(1312, 100);
      contactBox.paddingLeft = 40;
      contactBox.paddingRight = 40;
      contactBox.paddingTop = 40;
      contactBox.paddingBottom = 40;
      contactBox.primaryAxisAlignItems = 'SPACE_BETWEEN';
      contactBox.counterAxisAlignItems = 'CENTER';
      contactBox.cornerRadius = 16;
      contactBox.fills = solid(C.contactBoxBg);
      contactBox.strokes = solid(C.burgundy);
      contactBox.strokeWeight = 1.5;

      // Contact Left Column
      const cLeft = figma.createFrame();
      cLeft.name = 'Contact Left Info';
      cLeft.layoutMode = 'VERTICAL';
      cLeft.primaryAxisSizingMode = 'AUTO';
      cLeft.counterAxisSizingMode = 'FIXED';
      cLeft.resize(720, 100);
      cLeft.itemSpacing = 16;
      cLeft.fills = [];

      const cBadge = badge('DISPONIBILE DA SUBITO · ROMA / REMOTE', {
        bg: { r: 0.25, g: 0.08, b: 0.12 },
        border: C.burgundy,
        text: { r: 0.99, g: 0.75, b: 0.8 },
        size: 11
      });
      cLeft.appendChild(cBadge);

      cLeft.appendChild(txt('VALERIO COMELLA', { size: 36, style: 'Bold', color: C.white, letterSpacing: -1 }));
      cLeft.appendChild(txt('Software Engineer | Unity (C#) & Full Stack', { size: 16, style: 'Semi Bold', color: { r: 0.8, g: 0.85, b: 0.9 } }));
      cLeft.appendChild(txt('Cerchi uno sviluppatore con forte padronanza di Unity (C#), solide basi di ingegneria del software e rapidità di inserimento in team di produzione? Inviami un messaggio o fissa un colloquio conoscitivo.', {
        size: 14,
        style: 'Regular',
        color: C.slateLight,
        lineHeight: 22
      }));

      // Coordinates Row
      const coordRow = figma.createFrame();
      coordRow.name = 'Coordinates Ledger';
      coordRow.layoutMode = 'HORIZONTAL';
      coordRow.primaryAxisSizingMode = 'AUTO';
      coordRow.counterAxisSizingMode = 'AUTO';
      coordRow.itemSpacing = 20;
      coordRow.counterAxisAlignItems = 'CENTER';
      coordRow.fills = [];

      coordRow.appendChild(txt('✉️ valeriocom@hotmail.it', { size: 13, style: 'Bold', color: C.white }));
      coordRow.appendChild(txt('📞 3339959271', { size: 13, style: 'Bold', color: C.white }));
      coordRow.appendChild(txt('📍 Roma (Nato a Napoli · 2002)', { size: 12, style: 'Medium', color: C.slateLight }));
      coordRow.appendChild(txt('🚗 Patente B', { size: 12, style: 'Medium', color: C.slateLight }));
      cLeft.appendChild(coordRow);

      contactBox.appendChild(cLeft);

      // Contact Right Actions Column
      const cRight = figma.createFrame();
      cRight.name = 'Contact Right Actions';
      cRight.layoutMode = 'VERTICAL';
      cRight.primaryAxisSizingMode = 'AUTO';
      cRight.counterAxisSizingMode = 'FIXED';
      cRight.resize(460, 100);
      cRight.itemSpacing = 12;
      cRight.fills = [];

      const sendMailBtn = button('✉️ Invia E-mail Diretta (valeriocom@hotmail.it)', {
        bg: C.burgundy,
        text: C.white,
        size: 14,
        style: 'Bold',
        px: 24,
        py: 14,
        cornerRadius: 8
      });
      cRight.appendChild(sendMailBtn);

      const githubBtn = button('🌐 GitHub: github.com/valeriocomella', {
        bg: { r: 0.12, g: 0.16, b: 0.23 },
        text: C.white,
        border: { r: 0.2, g: 0.27, b: 0.38 },
        size: 13,
        style: 'Semi Bold',
        px: 20,
        py: 12,
        cornerRadius: 8
      });
      cRight.appendChild(githubBtn);

      const linkedinBtn = button('💼 LinkedIn: Valerio Comella', {
        bg: { r: 0.12, g: 0.16, b: 0.23 },
        text: C.white,
        border: { r: 0.2, g: 0.27, b: 0.38 },
        size: 13,
        style: 'Semi Bold',
        px: 20,
        py: 12,
        cornerRadius: 8
      });
      cRight.appendChild(linkedinBtn);

      const cvBtn = button('📑 Scarica Curriculum Vitae Ufficiale (PDF)', {
        bg: { r: 0.12, g: 0.16, b: 0.23 },
        text: C.white,
        border: { r: 0.2, g: 0.27, b: 0.38 },
        size: 13,
        style: 'Semi Bold',
        px: 20,
        py: 12,
        cornerRadius: 8
      });
      cRight.appendChild(cvBtn);

      contactBox.appendChild(cRight);
      sec06.appendChild(contactBox);

      master.appendChild(sec06);

      // ==========================================
      // SECTION 07 // GDPR & FOOTER
      // ==========================================
      const footerBar = figma.createFrame();
      footerBar.name = '07 // GDPR & Copyright Footer Bar';
      footerBar.layoutMode = 'HORIZONTAL';
      footerBar.primaryAxisSizingMode = 'FIXED';
      footerBar.counterAxisSizingMode = 'FIXED';
      footerBar.resize(1440, 56);
      footerBar.paddingLeft = 64;
      footerBar.paddingRight = 64;
      footerBar.primaryAxisAlignItems = 'SPACE_BETWEEN';
      footerBar.counterAxisAlignItems = 'CENTER';
      footerBar.fills = solid(C.footerBg);

      const footerLeft = txt('© 2026 Valerio Comella. Autorizzo il trattamento dei miei dati personali ai sensi del Gdpr 679/16 e del D.lgs 196/03.', {
        size: 11,
        style: 'Regular',
        color: C.slateLight
      });
      footerBar.appendChild(footerLeft);

      const footerRight = txt('Grazie per aver visitato il mio portfolio · Made with Precision & Passion', {
        size: 11,
        style: 'Medium',
        color: C.white
      });
      footerBar.appendChild(footerRight);

      master.appendChild(footerBar);

      // Scroll viewport into view to see both frames
      figma.viewport.scrollAndZoomIntoView([headerCard, master]);

      return {
        success: true,
        header: { id: headerCard.id, name: headerCard.name, x: headerCard.x, y: headerCard.y, width: headerCard.width, height: headerCard.height },
        master: { id: master.id, name: master.name, x: master.x, y: master.y, width: master.width, height: master.height, childrenCount: master.children.length }
      };
    }

    return await buildVariant7();
  `;

  ws.send(JSON.stringify({ id: 'build-variant-7', action: 'eval', code }));
};

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  if (json.id === 'build-variant-7') {
    if (json.error) {
      console.error('Error from Figma:', json.error);
    } else {
      console.log('Result:', JSON.stringify(json.data, null, 2));
    }
    ws.close();
    process.exit(0);
  }
};

ws.onerror = (err) => {
  console.error('WS error:', err);
  process.exit(1);
};

setTimeout(() => {
  console.error('Timeout after 45s');
  process.exit(1);
}, 45000);
