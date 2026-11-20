// build_variant7_mobile.mjs
// Builder for "Portfolio · Variant 7 · Swiss Editorial CV · Mobile · 390"
// Coordinates: x = 22160, y = 263. Width: 390.
// Header card: "HEADER · VARIANT 7 · MOBILE" at x: 22160, y: 187, width: 390, height: 56.

export const variant7MobileScript = `
(async () => {
  // Load fonts
  await Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Medium" }),
    figma.loadFontAsync({ family: "Inter", style: "Bold" }),
    figma.loadFontAsync({ family: "Inter", style: "Semi Bold" })
  ]);

  // Remove existing frame if present
  const existingFrame = figma.currentPage.children.find(c => c.name === "Portfolio · Variant 7 · Swiss Editorial CV · Mobile · 390" || (Math.abs(c.x - 22160) < 50 && c.width === 390));
  if (existingFrame) {
    existingFrame.remove();
  }
  const existingHeader = figma.currentPage.children.find(c => c.name === "HEADER · VARIANT 7 · MOBILE" || (Math.abs(c.x - 22160) < 50 && Math.abs(c.y - 187) < 20));
  if (existingHeader) {
    existingHeader.remove();
  }

  // Color constants
  const cWhite = { r: 1, g: 1, b: 1 };
  const cIvory = { r: 0.976, g: 0.98, b: 0.984 }; // #f9fafb
  const cIvoryDark = { r: 0.953, g: 0.957, b: 0.965 }; // #f3f4f6
  const cBurgundy = { r: 0.545, g: 0.118, b: 0.176 }; // #8b1e2d
  const cBurgundyTint = { r: 0.984, g: 0.949, b: 0.953 }; // #fdf2f4
  const cCharcoal = { r: 0.059, g: 0.09, b: 0.165 }; // #0f172a
  const cSlate = { r: 0.392, g: 0.455, b: 0.545 }; // #64748b
  const cSlateLight = { r: 0.58, g: 0.639, b: 0.722 }; // #94a3b8
  const cBorder = { r: 0.898, g: 0.906, b: 0.922 }; // #e5e7eb
  const cSuccess = { r: 0.063, g: 0.725, b: 0.506 }; // #10b981
  const cGreenBg = { r: 0.925, g: 0.992, b: 0.961 }; // #ecfdf5
  const cGreenBorder = { r: 0.655, g: 0.953, b: 0.816 }; // #a7f3d0

  // Helper: solid fill
  function solid(c, opacity = 1) {
    return [{ type: "SOLID", color: c, opacity }];
  }

  // Helper: text
  function createText(chars, {
    size = 14,
    weight = "Regular",
    color = cCharcoal,
    align = "LEFT",
    lineHeight = null,
    tracking = 0,
    width = null
  } = {}) {
    const t = figma.createText();
    t.fontName = { family: "Inter", style: weight };
    t.fontSize = size;
    t.characters = chars;
    t.fills = solid(color);
    t.textAlignHorizontal = align;
    if (tracking) {
      t.letterSpacing = { value: tracking, unit: "PIXELS" };
    }
    if (lineHeight) {
      t.lineHeight = { value: lineHeight, unit: "PIXELS" };
    }
    if (width) {
      t.textAutoResize = "HEIGHT";
      t.resize(width, t.height);
    } else {
      t.textAutoResize = "WIDTH_AND_HEIGHT";
    }
    return t;
  }

  // Helper: frame
  function createFrame(name, {
    width = 350,
    height = null,
    layout = "VERTICAL",
    spacing = 0,
    padding = [0, 0, 0, 0], // [top, right, bottom, left]
    fill = null,
    border = null,
    borderWidth = 1,
    radius = 0,
    primarySizing = "AUTO",
    counterSizing = "AUTO"
  } = {}) {
    const f = figma.createFrame();
    f.name = name;
    f.layoutMode = layout;
    f.itemSpacing = spacing;
    f.paddingTop = padding[0];
    f.paddingRight = padding[1];
    f.paddingBottom = padding[2];
    f.paddingLeft = padding[3];
    if (fill) {
      f.fills = solid(fill.color || fill, fill.opacity !== undefined ? fill.opacity : 1);
    } else {
      f.fills = [];
    }
    if (border) {
      f.strokes = solid(border.color || border, border.opacity !== undefined ? border.opacity : 1);
      f.strokeWeight = borderWidth;
    }
    if (radius) f.cornerRadius = radius;

    f.primaryAxisSizingMode = primarySizing;
    f.counterAxisSizingMode = counterSizing;
    if (width && height) {
      f.resize(width, height);
    } else if (width) {
      f.resize(width, f.height);
    }
    return f;
  }

  // Helper: image rect
  function createImageRect(name, hash, w, h, radius = 0) {
    const rect = figma.createRectangle();
    rect.name = name;
    rect.resize(w, h);
    if (radius) rect.cornerRadius = radius;
    const img = figma.getImageByHash(hash);
    if (img) {
      rect.fills = [{
        type: "IMAGE",
        scaleMode: "FILL",
        imageHash: img.hash
      }];
    } else {
      rect.fills = solid(cIvoryDark);
    }
    return rect;
  }

  // Helper: divider
  function createDivider(w = 350, col = cBorder) {
    const d = figma.createFrame();
    d.name = "Divider";
    d.resize(w, 1);
    d.fills = solid(col);
    return d;
  }

  // Helper: Tag / Chip badge
  function createBadge(text, {
    bgColor = cIvoryDark,
    textColor = cCharcoal,
    borderColor = null,
    iconHash = null,
    iconSize = 14,
    size = 11,
    weight = "Medium",
    padding = [4, 8, 4, 8]
  } = {}) {
    const b = figma.createFrame();
    b.name = "Badge: " + text;
    b.layoutMode = "HORIZONTAL";
    b.primaryAxisAlignItems = "CENTER";
    b.counterAxisAlignItems = "CENTER";
    b.itemSpacing = 6;
    b.paddingTop = padding[0];
    b.paddingRight = padding[1];
    b.paddingBottom = padding[2];
    b.paddingLeft = padding[3];
    b.cornerRadius = 6;
    b.fills = solid(bgColor);
    if (borderColor) {
      b.strokes = solid(borderColor);
      b.strokeWeight = 1;
    }
    b.primaryAxisSizingMode = "AUTO";
    b.counterAxisSizingMode = "AUTO";

    if (iconHash) {
      const iconRect = createImageRect("Icon", iconHash, iconSize, iconSize, 2);
      b.appendChild(iconRect);
    }

    const t = createText(text, { size, weight, color: textColor });
    b.appendChild(t);
    return b;
  }

  // -------------------------------------------------------------
  // 1. TOP HEADER BANNER (Outside master frame at y = 187)
  // -------------------------------------------------------------
  const headerCard = createFrame("HEADER · VARIANT 7 · MOBILE", {
    width: 390,
    height: 56,
    layout: "HORIZONTAL",
    spacing: 12,
    padding: [12, 16, 12, 16],
    fill: cCharcoal,
    border: { color: { r: 0.18, g: 0.22, b: 0.3 } },
    radius: 8,
    primarySizing: "FIXED",
    counterSizing: "FIXED"
  });
  headerCard.primaryAxisAlignItems = "SPACE_BETWEEN";
  headerCard.counterAxisAlignItems = "CENTER";
  headerCard.x = 22160;
  headerCard.y = 187;

  // Left group
  const hLeft = createFrame("Header Left", {
    layout: "HORIZONTAL",
    spacing: 8,
    counterSizing: "AUTO",
    primarySizing: "AUTO"
  });
  hLeft.counterAxisAlignItems = "CENTER";
  const hDot = figma.createEllipse();
  hDot.resize(8, 8);
  hDot.fills = solid(cBurgundy);
  hLeft.appendChild(hDot);
  const hTitle = createText("VARIANT 07 // SWISS EDITORIAL MOBILE", {
    size: 11,
    weight: "Bold",
    color: cWhite,
    tracking: 0.5
  });
  hLeft.appendChild(hTitle);
  headerCard.appendChild(hLeft);

  // Right pill
  const hRight = createFrame("Pill", {
    layout: "HORIZONTAL",
    padding: [4, 8, 4, 8],
    radius: 4,
    fill: { color: cBurgundy, opacity: 0.3 },
    border: cBurgundy,
    counterSizing: "AUTO",
    primarySizing: "AUTO"
  });
  const hDim = createText("390 × AUTO", { size: 10, weight: "Bold", color: { r: 1, g: 0.7, b: 0.75 } });
  hRight.appendChild(hDim);
  headerCard.appendChild(hRight);

  figma.currentPage.appendChild(headerCard);

  // -------------------------------------------------------------
  // 2. MASTER MOBILE FRAME (x: 22160, y: 263, width: 390)
  // -------------------------------------------------------------
  const master = createFrame("Portfolio · Variant 7 · Swiss Editorial CV · Mobile · 390", {
    width: 390,
    layout: "VERTICAL",
    spacing: 0,
    padding: [0, 0, 0, 0],
    fill: cWhite,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });
  master.x = 22160;
  master.y = 263;

  // -------------------------------------------------------------
  // SECTION 0: Mobile Navigation & Sticky Header + Progress Bar
  // -------------------------------------------------------------
  const navFrame = createFrame("00_MobileNav", {
    width: 390,
    layout: "VERTICAL",
    spacing: 0,
    fill: cWhite,
    border: cBorder,
    borderWidth: 1,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });

  // Top Nav Bar
  const navTop = createFrame("TopBar", {
    width: 390,
    layout: "HORIZONTAL",
    padding: [14, 20, 14, 20],
    primarySizing: "FIXED",
    counterSizing: "AUTO"
  });
  navTop.primaryAxisAlignItems = "SPACE_BETWEEN";
  navTop.counterAxisAlignItems = "CENTER";

  // Monogram & Title
  const brandGroup = createFrame("Brand", {
    layout: "HORIZONTAL",
    spacing: 10,
    counterSizing: "AUTO",
    primarySizing: "AUTO"
  });
  brandGroup.counterAxisAlignItems = "CENTER";

  const mono = createFrame("Monogram", {
    width: 32,
    height: 32,
    layout: "HORIZONTAL",
    radius: 6,
    fill: cBurgundy,
    primarySizing: "FIXED",
    counterSizing: "FIXED"
  });
  mono.primaryAxisAlignItems = "CENTER";
  mono.counterAxisAlignItems = "CENTER";
  const monoText = createText("VC", { size: 14, weight: "Bold", color: cWhite });
  mono.appendChild(monoText);
  brandGroup.appendChild(mono);

  const brandTextGroup = createFrame("BrandText", {
    layout: "VERTICAL",
    spacing: 2,
    counterSizing: "AUTO",
    primarySizing: "AUTO"
  });
  brandTextGroup.appendChild(createText("VALERIO COMELLA", { size: 12, weight: "Bold", color: cCharcoal, tracking: 0.5 }));
  brandTextGroup.appendChild(createText("SWISS EDITORIAL CV", { size: 9, weight: "Bold", color: cBurgundy, tracking: 1 }));
  brandGroup.appendChild(brandTextGroup);
  navTop.appendChild(brandGroup);

  // Actions right
  const navActions = createFrame("NavActions", {
    layout: "HORIZONTAL",
    spacing: 8,
    counterSizing: "AUTO",
    primarySizing: "AUTO"
  });
  navActions.counterAxisAlignItems = "CENTER";

  const cvBtn = createFrame("CV_Btn", {
    layout: "HORIZONTAL",
    padding: [6, 10, 6, 10],
    radius: 6,
    fill: cBurgundyTint,
    border: cBurgundy,
    counterSizing: "AUTO",
    primarySizing: "AUTO"
  });
  cvBtn.appendChild(createText("SCARICA CV 📥", { size: 10.5, weight: "Bold", color: cBurgundy }));
  navActions.appendChild(cvBtn);

  const menuBtn = createFrame("Menu_Btn", {
    layout: "HORIZONTAL",
    padding: [6, 10, 6, 10],
    radius: 6,
    fill: cIvoryDark,
    border: cBorder,
    counterSizing: "AUTO",
    primarySizing: "AUTO"
  });
  menuBtn.appendChild(createText("MENU ☰", { size: 10.5, weight: "Bold", color: cCharcoal }));
  navActions.appendChild(menuBtn);

  navTop.appendChild(navActions);
  navFrame.appendChild(navTop);

  // Mobile Section Progress Bar (01 | 02 | 03 | 04 | 05 | 06)
  const progressBar = createFrame("SectionProgressBar", {
    width: 390,
    layout: "HORIZONTAL",
    padding: [8, 16, 8, 16],
    spacing: 6,
    fill: cIvory,
    border: cBorder,
    borderWidth: 1,
    primarySizing: "FIXED",
    counterSizing: "AUTO"
  });
  progressBar.counterAxisAlignItems = "CENTER";
  progressBar.primaryAxisAlignItems = "SPACE_BETWEEN";

  const pips = [
    { num: "01", label: "HERO", active: true },
    { num: "02", label: "PROFILO", active: false },
    { num: "03", label: "EXP", active: false },
    { num: "04", label: "WORK", active: false },
    { num: "05", label: "EDU", active: false },
    { num: "06", label: "CONTATTO", active: false }
  ];

  for (const pip of pips) {
    const pipFrame = createFrame("Pip_" + pip.num, {
      layout: "HORIZONTAL",
      padding: [4, 6, 4, 6],
      radius: 4,
      fill: pip.active ? cBurgundy : cWhite,
      border: pip.active ? cBurgundy : cBorder,
      counterSizing: "AUTO",
      primarySizing: "AUTO",
      spacing: 4
    });
    pipFrame.counterAxisAlignItems = "CENTER";
    pipFrame.appendChild(createText(pip.num, {
      size: 9.5,
      weight: "Bold",
      color: pip.active ? cWhite : cBurgundy
    }));
    pipFrame.appendChild(createText(pip.label, {
      size: 8.5,
      weight: pip.active ? "Bold" : "Medium",
      color: pip.active ? cWhite : cSlate
    }));
    progressBar.appendChild(pipFrame);
  }
  navFrame.appendChild(progressBar);
  master.appendChild(navFrame);

  // -------------------------------------------------------------
  // SECTION 01: HERO & PRESENTATION
  // -------------------------------------------------------------
  const secHero = createFrame("01_Section_Hero", {
    width: 390,
    layout: "VERTICAL",
    spacing: 16,
    padding: [28, 20, 36, 20],
    fill: cWhite,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });

  // Section index kicker
  secHero.appendChild(createText("01 // HERO & PRESENTATION", {
    size: 10,
    weight: "Bold",
    color: cBurgundy,
    tracking: 2
  }));

  // Available for hire status badge
  const statusBadge = createFrame("StatusBadge", {
    layout: "HORIZONTAL",
    spacing: 8,
    padding: [6, 12, 6, 12],
    radius: 20,
    fill: cGreenBg,
    border: cGreenBorder,
    counterSizing: "AUTO",
    primarySizing: "AUTO"
  });
  statusBadge.counterAxisAlignItems = "CENTER";
  const greenDot = figma.createEllipse();
  greenDot.resize(8, 8);
  greenDot.fills = solid(cSuccess);
  statusBadge.appendChild(greenDot);
  statusBadge.appendChild(createText("AVAILABLE FOR HIRE · ROMA / REMOTE", {
    size: 10,
    weight: "Bold",
    color: { r: 0.04, g: 0.45, b: 0.3 },
    tracking: 0.5
  }));
  secHero.appendChild(statusBadge);

  // Big Bold Name
  secHero.appendChild(createText("VALERIO COMELLA", {
    size: 32,
    weight: "Bold",
    color: cCharcoal,
    lineHeight: 36,
    tracking: -0.5,
    width: 350
  }));

  // Role subtitle
  const roleGroup = createFrame("RoleGroup", {
    layout: "VERTICAL",
    spacing: 4,
    counterSizing: "AUTO",
    primarySizing: "AUTO"
  });
  roleGroup.appendChild(createText("SOFTWARE ENGINEER | UNITY (C#)", {
    size: 14,
    weight: "Bold",
    color: cBurgundy,
    tracking: 0.5
  }));
  roleGroup.appendChild(createText("Specializzato in Mixed Reality (XR) & Interactive Systems", {
    size: 12.5,
    weight: "Medium",
    color: cSlate
  }));
  secHero.appendChild(roleGroup);

  // Bio body text
  secHero.appendChild(createText("Unity Developer specializzato in C# con solida esperienza nello sviluppo di videogiochi, simulazioni Mixed Reality (zSpace / Quest), applicazioni interattive e prodotti B2B su piattaforma WebGL.", {
    size: 13.5,
    weight: "Regular",
    color: { r: 0.2, g: 0.25, b: 0.32 },
    lineHeight: 21,
    width: 350
  }));

  // Animated citations carousel card
  const quoteCard = createFrame("QuoteCarouselCard", {
    width: 350,
    layout: "VERTICAL",
    spacing: 8,
    padding: [14, 16, 14, 16],
    fill: cIvory,
    border: cBorder,
    radius: 8,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });
  quoteCard.strokes = solid(cBurgundy);
  quoteCard.strokeWeight = 1;

  // Header of quote
  const quoteTop = createFrame("QuoteTop", {
    width: 318,
    layout: "HORIZONTAL",
    primarySizing: "FIXED",
    counterSizing: "AUTO"
  });
  quoteTop.primaryAxisAlignItems = "SPACE_BETWEEN";
  quoteTop.counterAxisAlignItems = "CENTER";
  quoteTop.appendChild(createText("PHILOSOPHY // 01 OF 03", { size: 9.5, weight: "Bold", color: cBurgundy, tracking: 1 }));
  quoteTop.appendChild(createText("● ○ ○", { size: 10, weight: "Bold", color: cBurgundy }));
  quoteCard.appendChild(quoteTop);

  quoteCard.appendChild(createText("”Building Worlds with Code”", {
    size: 16,
    weight: "Bold",
    color: cCharcoal,
    lineHeight: 22,
    width: 318
  }));
  quoteCard.appendChild(createText("”Code is the new art — Interactive XR & Game Architect”", {
    size: 12,
    weight: "Medium",
    color: cSlate,
    width: 318
  }));
  secHero.appendChild(quoteCard);

  // Hero Illustration Image Card
  const heroImgWrapper = createFrame("HeroImageCard", {
    width: 350,
    height: 230,
    layout: "VERTICAL",
    radius: 12,
    border: cBorder,
    borderWidth: 1,
    primarySizing: "FIXED",
    counterSizing: "FIXED"
  });
  heroImgWrapper.clipsContent = true;

  const heroImg = createImageRect("Hero_Illustration", "804913e4432d2702eabf402e152737e88b651526", 350, 230, 0);
  heroImgWrapper.appendChild(heroImg);
  secHero.appendChild(heroImgWrapper);

  // Action Buttons
  const heroCtaGroup = createFrame("HeroCTAs", {
    width: 350,
    layout: "VERTICAL",
    spacing: 10,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });

  const ctaPrimary = createFrame("CTA_Primary", {
    width: 350,
    height: 44,
    layout: "HORIZONTAL",
    radius: 8,
    fill: cBurgundy,
    primarySizing: "FIXED",
    counterSizing: "FIXED"
  });
  ctaPrimary.primaryAxisAlignItems = "CENTER";
  ctaPrimary.counterAxisAlignItems = "CENTER";
  ctaPrimary.appendChild(createText("ESPLORA I PROGETTI ↓", { size: 13, weight: "Bold", color: cWhite, tracking: 0.5 }));
  heroCtaGroup.appendChild(ctaPrimary);

  const ctaSecondary = createFrame("CTA_Secondary", {
    width: 350,
    height: 44,
    layout: "HORIZONTAL",
    radius: 8,
    fill: cWhite,
    border: cBurgundy,
    borderWidth: 1.5,
    primarySizing: "FIXED",
    counterSizing: "FIXED"
  });
  ctaSecondary.primaryAxisAlignItems = "CENTER";
  ctaSecondary.counterAxisAlignItems = "CENTER";
  ctaSecondary.appendChild(createText("CONTATTAMI SUBITO ✉", { size: 13, weight: "Bold", color: cBurgundy, tracking: 0.5 }));
  heroCtaGroup.appendChild(ctaSecondary);

  secHero.appendChild(heroCtaGroup);
  master.appendChild(secHero);

  // -------------------------------------------------------------
  // SECTION 02: PROFILO & COMPETENZE
  // -------------------------------------------------------------
  const secProfilo = createFrame("02_Section_Profilo", {
    width: 390,
    layout: "VERTICAL",
    spacing: 20,
    padding: [36, 20, 36, 20],
    fill: cIvory,
    border: cBorder,
    borderWidth: 1,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });

  secProfilo.appendChild(createText("02 // PROFILO & COMPETENZE", {
    size: 10,
    weight: "Bold",
    color: cBurgundy,
    tracking: 2
  }));
  secProfilo.appendChild(createText("Metriche & Competenze Chiave", {
    size: 24,
    weight: "Bold",
    color: cCharcoal,
    width: 350
  }));
  secProfilo.appendChild(createText("Metriche quantitative e padronanza di runtime engine, architetture interattive e metodologie di produzione software.", {
    size: 13,
    weight: "Regular",
    color: cSlate,
    lineHeight: 19,
    width: 350
  }));

  // 2x2 Metric Stat Pills
  const metricsGrid = createFrame("MetricsGrid", {
    width: 350,
    layout: "VERTICAL",
    spacing: 10,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });

  function createMetricPill(num, label, sub) {
    const p = createFrame("MetricCard", {
      width: 170,
      layout: "VERTICAL",
      spacing: 4,
      padding: [14, 14, 14, 14],
      fill: cWhite,
      border: cBorder,
      radius: 10,
      primarySizing: "AUTO",
      counterSizing: "FIXED"
    });
    p.appendChild(createText(num, { size: 20, weight: "Bold", color: cBurgundy }));
    p.appendChild(createText(label, { size: 11.5, weight: "Bold", color: cCharcoal }));
    p.appendChild(createText(sub, { size: 10, weight: "Medium", color: cSlate }));
    return p;
  }

  const row1 = createFrame("Row1", {
    width: 350,
    layout: "HORIZONTAL",
    spacing: 10,
    primarySizing: "FIXED",
    counterSizing: "AUTO"
  });
  row1.appendChild(createMetricPill("1200+ Ore", "XR & Game Dev", "Simulazioni e B2B"));
  row1.appendChild(createMetricPill("6 Giochi", "Titoli & Prototipi", "Pubblicati & Game Jam"));
  metricsGrid.appendChild(row1);

  const row2 = createFrame("Row2", {
    width: 350,
    layout: "HORIZONTAL",
    spacing: 10,
    primarySizing: "FIXED",
    counterSizing: "AUTO"
  });
  row2.appendChild(createMetricPill("101 / 110", "Diploma Tecnico", "ITS Lazio Digital (EQF5)"));
  row2.appendChild(createMetricPill("100 / 100", "Perito Informatico", "ITIS A. Volta (EQF4)"));
  metricsGrid.appendChild(row2);

  secProfilo.appendChild(metricsGrid);

  // Technical Stack Section with Verified Icons
  const techStackBox = createFrame("TechStackBox", {
    width: 350,
    layout: "VERTICAL",
    spacing: 14,
    padding: [18, 16, 18, 16],
    fill: cWhite,
    border: cBorder,
    radius: 10,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });

  techStackBox.appendChild(createText("TECH ARSENAL & STRUMENTI", {
    size: 11,
    weight: "Bold",
    color: cBurgundy,
    tracking: 1.5
  }));

  // Game Dev Group
  const techGroup1 = createFrame("Group_GameDev", {
    width: 318,
    layout: "VERTICAL",
    spacing: 8,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });
  techGroup1.appendChild(createText("GAME DEVELOPMENT & XR", { size: 10, weight: "Bold", color: cSlate, tracking: 1 }));
  const flowGameDev = createFrame("Flow_GameDev", {
    width: 318,
    layout: "HORIZONTAL",
    spacing: 8,
    primarySizing: "AUTO",
    counterSizing: "AUTO"
  });
  flowGameDev.appendChild(createBadge("Unity (C#)", { iconHash: "07bdd7bdd8bd1caefee7ba0855f0ef191c114dcb", bgColor: cBurgundyTint, textColor: cBurgundy, borderColor: cBurgundy }));
  flowGameDev.appendChild(createBadge("Unreal Engine 5", { iconHash: "84a0e959bccb6f05ca8ea7e300db4bbe12d930c7", bgColor: cIvoryDark }));
  flowGameDev.appendChild(createBadge("zSpace MR", { bgColor: cIvoryDark }));
  techGroup1.appendChild(flowGameDev);
  techStackBox.appendChild(techGroup1);

  techStackBox.appendChild(createDivider(318));

  // Back-end & Architecture
  const techGroup2 = createFrame("Group_Backend", {
    width: 318,
    layout: "VERTICAL",
    spacing: 8,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });
  techGroup2.appendChild(createText("BACK-END & ARCHITETTURA", { size: 10, weight: "Bold", color: cSlate, tracking: 1 }));
  const flowBackend = createFrame("Flow_Backend", {
    width: 318,
    layout: "HORIZONTAL",
    spacing: 8,
    primarySizing: "AUTO",
    counterSizing: "AUTO"
  });
  flowBackend.appendChild(createBadge("PostgreSQL", { iconHash: "456161e9174b71c1f7ba327089f3c7e53def6d3e", bgColor: cIvoryDark }));
  flowBackend.appendChild(createBadge("Java / Spring Boot", { iconHash: "6539b5b4c27411018ea9093f10de77614e670907", bgColor: cIvoryDark }));
  flowBackend.appendChild(createBadge("Git & GitHub", { iconHash: "c8f451336d2b7dc0d4170610b7bf25acde40d626", bgColor: cIvoryDark }));
  techGroup2.appendChild(flowBackend);
  techStackBox.appendChild(techGroup2);

  techStackBox.appendChild(createDivider(318));

  // Web & Tooling
  const techGroup3 = createFrame("Group_Web", {
    width: 318,
    layout: "VERTICAL",
    spacing: 8,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });
  techGroup3.appendChild(createText("WEB & DESIGN TOOLS", { size: 10, weight: "Bold", color: cSlate, tracking: 1 }));
  const flowWeb = createFrame("Flow_Web", {
    width: 318,
    layout: "HORIZONTAL",
    spacing: 8,
    primarySizing: "AUTO",
    counterSizing: "AUTO"
  });
  flowWeb.appendChild(createBadge("JavaScript", { iconHash: "c921d063facd55b06b214756e6cfdf6d7ae15715", bgColor: cIvoryDark }));
  flowWeb.appendChild(createBadge("HTML5 & CSS", { iconHash: "e31eb43604dfdad940742cd4114baac36b599ba8", bgColor: cIvoryDark }));
  flowWeb.appendChild(createBadge("Figma", { iconHash: "3529c4f94f753e0f0b59efac391da21854edb303", bgColor: cIvoryDark }));
  techGroup3.appendChild(flowWeb);
  techStackBox.appendChild(techGroup3);

  secProfilo.appendChild(techStackBox);
  master.appendChild(secProfilo);

  // -------------------------------------------------------------
  // SECTION 03: ESPERIENZE PROFESSIONALI
  // -------------------------------------------------------------
  const secExp = createFrame("03_Section_Esperienze", {
    width: 390,
    layout: "VERTICAL",
    spacing: 20,
    padding: [36, 20, 36, 20],
    fill: cWhite,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });

  secExp.appendChild(createText("03 // ESPERIENZE", {
    size: 10,
    weight: "Bold",
    color: cBurgundy,
    tracking: 2
  }));
  secExp.appendChild(createText("Esperienze Lavorative", {
    size: 24,
    weight: "Bold",
    color: cCharcoal,
    width: 350
  }));
  secExp.appendChild(createText("Un percorso concreto tra docenza accademica, sviluppo di soluzioni industriali XR e programmazione applicativa B2B.", {
    size: 13,
    weight: "Regular",
    color: cSlate,
    lineHeight: 19,
    width: 350
  }));

  // Helper for Experience Mobile Card
  function createExpCard({
    company,
    role,
    period,
    type,
    desc,
    tags,
    logoHash = null
  }) {
    const card = createFrame("ExpCard_" + company, {
      width: 350,
      layout: "VERTICAL",
      spacing: 12,
      padding: [16, 16, 16, 16],
      fill: cIvory,
      border: cBorder,
      radius: 10,
      primarySizing: "AUTO",
      counterSizing: "FIXED"
    });

    // Top Row: Logo/Initial + Company + Role
    const topRow = createFrame("TopRow", {
      width: 318,
      layout: "HORIZONTAL",
      spacing: 12,
      primarySizing: "FIXED",
      counterSizing: "AUTO"
    });
    topRow.counterAxisAlignItems = "CENTER";

    if (logoHash) {
      const logoBox = createImageRect("Logo_" + company, logoHash, 40, 40, 8);
      topRow.appendChild(logoBox);
    } else {
      const initialBox = createFrame("InitialBox", {
        width: 40,
        height: 40,
        layout: "HORIZONTAL",
        radius: 8,
        fill: cBurgundyTint,
        border: cBurgundy,
        primarySizing: "FIXED",
        counterSizing: "FIXED"
      });
      initialBox.primaryAxisAlignItems = "CENTER";
      initialBox.counterAxisAlignItems = "CENTER";
      initialBox.appendChild(createText(company.substring(0, 2).toUpperCase(), { size: 14, weight: "Bold", color: cBurgundy }));
      topRow.appendChild(initialBox);
    }

    const headerText = createFrame("HeaderText", {
      width: 266,
      layout: "VERTICAL",
      spacing: 2,
      primarySizing: "FIXED",
      counterSizing: "AUTO"
    });
    headerText.appendChild(createText(company, { size: 15, weight: "Bold", color: cCharcoal }));
    headerText.appendChild(createText(role, { size: 12.5, weight: "Bold", color: cBurgundy }));
    topRow.appendChild(headerText);
    card.appendChild(topRow);

    // Period / Type Badge
    const metaRow = createFrame("MetaRow", {
      width: 318,
      layout: "HORIZONTAL",
      spacing: 8,
      primarySizing: "FIXED",
      counterSizing: "AUTO"
    });
    metaRow.counterAxisAlignItems = "CENTER";
    metaRow.appendChild(createBadge(period, { bgColor: cWhite, textColor: cSlate, borderColor: cBorder, size: 10 }));
    metaRow.appendChild(createBadge(type, { bgColor: cBurgundyTint, textColor: cBurgundy, borderColor: cBurgundy, size: 10 }));
    card.appendChild(metaRow);

    // Description
    card.appendChild(createText(desc, {
      size: 12.5,
      weight: "Regular",
      color: { r: 0.2, g: 0.25, b: 0.32 },
      lineHeight: 18,
      width: 318
    }));

    // Tags
    const tagsRow = createFrame("TagsRow", {
      width: 318,
      layout: "HORIZONTAL",
      spacing: 6,
      primarySizing: "AUTO",
      counterSizing: "AUTO"
    });
    for (const tag of tags) {
      tagsRow.appendChild(createBadge(tag, { bgColor: cWhite, textColor: cCharcoal, borderColor: cBorder, size: 9.5 }));
    }
    card.appendChild(tagsRow);

    return card;
  }

  // 1. Skill Factory
  secExp.appendChild(createExpCard({
    company: "Skill Factory",
    role: "Docente Unity & C# / Back-end Developer",
    period: "2025 - Presente",
    type: "Docenza & Formazione",
    desc: "Insegnamento avanzato di game development con Unity e C#, logica di gameplay, OOP e architettura software. Sviluppo back-end piattaforma web con Java, Spring Boot e Thymeleaf.",
    tags: ["Unity C#", "Docenza", "Java Spring Boot", "OOP"]
  }));

  // 2. L'ABCD Edutainment
  secExp.appendChild(createExpCard({
    company: "L'ABCD Edutainment",
    role: "Unity Developer · Mixed Reality (MR)",
    period: "Gen 2026 - Apr 2026",
    type: "Tirocinio Extracurriculare",
    desc: "Ricerca e sviluppo di progetti orientati alla didattica per piattaforma Mixed Reality zSpace e MR-HMI. Creazione in C# di wrapper multi-SDK e implementazione interfaccia uGUI.",
    tags: ["zSpace MR", "Unity C#", "MR-HMI", "uGUI"]
  }));

  // 3. Protom Group
  secExp.appendChild(createExpCard({
    company: "Protom Group",
    role: "Programmatore Unity & Full Stack",
    period: "Nov 2025 - 2026",
    type: "Somministrazione",
    desc: "Co-sviluppo di piattaforme web e soluzioni XR orientate all'industria tramite HTML5, CSS3, JavaScript e integrazione moduli interattivi in Unity.",
    tags: ["Full Stack", "JavaScript", "XR Solutions", "Web"],
    logoHash: "925a27742bcc95a9a1a00149015a08aaf052f45b"
  }));

  // 4. Katabasi Studio
  secExp.appendChild(createExpCard({
    company: "Katabasi Studio",
    role: "Unity & Gameplay Programmer",
    period: "Nov 2024 - Apr 2025",
    type: "Oltre 720 Ore · WebGL",
    desc: "Sviluppo di due prodotti B2B realizzati in Unity per WebGL. Programmazione in C#, UI uGUI, custom editor tools e ottimizzazione ad alta efficienza per browser.",
    tags: ["720+ Ore", "Unity C#", "WebGL", "Editor Tools"],
    logoHash: "8b86bec8ba17ef4b4cc772f6ff532129cb694d4e"
  }));

  master.appendChild(secExp);

  // -------------------------------------------------------------
  // SECTION 04: PROGETTI IN EVIDENZA
  // -------------------------------------------------------------
  const secProgetti = createFrame("04_Section_Progetti", {
    width: 390,
    layout: "VERTICAL",
    spacing: 20,
    padding: [36, 20, 36, 20],
    fill: cIvory,
    border: cBorder,
    borderWidth: 1,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });

  secProgetti.appendChild(createText("04 // PROGETTI", {
    size: 10,
    weight: "Bold",
    color: cBurgundy,
    tracking: 2
  }));
  secProgetti.appendChild(createText("Progetti & Opere Selezionate", {
    size: 24,
    weight: "Bold",
    color: cCharcoal,
    width: 350
  }));
  secProgetti.appendChild(createText("Videogiochi completi, simulatori di liuteria acustica in VR e prototipi premiati con artwork autentico.", {
    size: 13,
    weight: "Regular",
    color: cSlate,
    lineHeight: 19,
    width: 350
  }));

  // Helper for Project Card
  function createProjectCard({
    title,
    kicker,
    desc,
    tags,
    imgHash,
    award = null
  }) {
    const card = createFrame("ProjCard_" + title, {
      width: 350,
      layout: "VERTICAL",
      spacing: 0,
      fill: cWhite,
      border: cBorder,
      radius: 12,
      primarySizing: "AUTO",
      counterSizing: "FIXED"
    });
    card.clipsContent = true;

    // Full-width banner (350x175)
    const banner = createImageRect("Banner_" + title, imgHash, 350, 175, 0);
    card.appendChild(banner);

    // Card Content Body
    const body = createFrame("CardBody", {
      width: 350,
      layout: "VERTICAL",
      spacing: 12,
      padding: [16, 16, 18, 16],
      primarySizing: "AUTO",
      counterSizing: "FIXED"
    });

    // Kicker & Award row
    const kickerRow = createFrame("KickerRow", {
      width: 318,
      layout: "HORIZONTAL",
      spacing: 8,
      primarySizing: "FIXED",
      counterSizing: "AUTO"
    });
    kickerRow.counterAxisAlignItems = "CENTER";
    kickerRow.appendChild(createText(kicker, { size: 10, weight: "Bold", color: cBurgundy, tracking: 1 }));
    if (award) {
      kickerRow.appendChild(createBadge(award, { bgColor: cBurgundyTint, textColor: cBurgundy, borderColor: cBurgundy, size: 9 }));
    }
    body.appendChild(kickerRow);

    // Title
    body.appendChild(createText(title, { size: 18, weight: "Bold", color: cCharcoal, width: 318 }));

    // Description
    body.appendChild(createText(desc, {
      size: 12.5,
      weight: "Regular",
      color: { r: 0.25, g: 0.3, b: 0.38 },
      lineHeight: 18,
      width: 318
    }));

    // Tech Tags
    const tagsFlow = createFrame("TagsFlow", {
      width: 318,
      layout: "HORIZONTAL",
      spacing: 6,
      primarySizing: "AUTO",
      counterSizing: "AUTO"
    });
    for (const tag of tags) {
      tagsFlow.appendChild(createBadge(tag, { bgColor: cIvoryDark, textColor: cCharcoal, size: 9.5 }));
    }
    body.appendChild(tagsFlow);

    // Bottom action link
    const actionBtn = createFrame("ActionBtn", {
      width: 318,
      layout: "HORIZONTAL",
      spacing: 6,
      counterSizing: "AUTO",
      primarySizing: "AUTO"
    });
    actionBtn.counterAxisAlignItems = "CENTER";
    actionBtn.appendChild(createText("VEDI DETTAGLI PROGETTO →", { size: 11, weight: "Bold", color: cBurgundy, tracking: 0.5 }));
    body.appendChild(actionBtn);

    card.appendChild(body);
    return card;
  }

  // 1. VIOLINUM
  secProgetti.appendChild(createProjectCard({
    title: "Violinum",
    kicker: "VR EXPERIENCE · XR LIUTERIA",
    award: "ITALIAN GAME 2025",
    desc: "Esperienza di liuteria virtuale in realtà mista. Simulazione acustica fisica, intaglio del legno e montaggio del violino sviluppato per visori VR di ultima generazione.",
    tags: ["Unity C#", "VR / MR", "Acoustics", "3D Audio"],
    imgHash: "bf75d80ee060d6305c0a3112de92eae62902e8a6"
  }));

  // 2. LOCK FIGHT
  secProgetti.appendChild(createProjectCard({
    title: "Lock Fight",
    kicker: "TACTICAL BRAWLER 3D",
    desc: "Brawler tattico ad alta precisione basato su Finite State Machine complesse in C#, sincronizzazione di collisioni e animazioni di presa in tempo reale.",
    tags: ["Unity C#", "State Machine", "Animation Rigging"],
    imgHash: "62f781e13506e3cf0f8410c26b60d57d2f602520"
  }));

  // 3. RUSHEEP
  secProgetti.appendChild(createProjectCard({
    title: "Rusheep",
    kicker: "2D PHYSICS RUNNER",
    desc: "Endless runner dinamico caratterizzato da motore fisico personalizzato in C#, generazione procedurale di ostacoli e controlli touch ultra-reattivi.",
    tags: ["2D Physics", "Procedural Gen", "Touch Controls"],
    imgHash: "eeb2bca4eba61de408ed31499fc232fce6aa14fe"
  }));

  // 4. SFURYATELL
  secProgetti.appendChild(createProjectCard({
    title: "Sfuryatell",
    kicker: "ARCADE ACTION · ISAS",
    desc: "Arcade vintage d'azione sviluppato durante l'accademia ISAS. Implementazione di UI Toolkit per menù reattivi ad alto framerate e gestione avanzata particle FX.",
    tags: ["UI Toolkit", "C# Gameplay", "Particle Systems"],
    imgHash: "fd8e4a0a1fc38f89ec673837222b53e9053f6f6a"
  }));

  // 5. PROJECT WORKS ITS LAZIO
  secProgetti.appendChild(createProjectCard({
    title: "Project Works ITS Lazio Digital",
    kicker: "MIXED REALITY & SPATIAL RESEARCH",
    desc: "Suite di applicazioni sperimentali per display olografico interattivo zSpace. Manipolazione tridimensionale naturale con stylus 6DoF per scopi educativi.",
    tags: ["zSpace MR", "6DoF Stylus", "Shader Graph"],
    imgHash: "4a2575f002cef569a18d92e37e8dcba50ff5ed0d"
  }));

  // 6. PORTFOLIO SITO WEB
  secProgetti.appendChild(createProjectCard({
    title: "Portfolio Sito Web 2026",
    kicker: "WEB ARCHITECTURE & INTERACTIVE",
    desc: "Piattaforma portfolio sviluppata con framework Astro, styling TailwindCSS e architettura scalabile ispirata ai canoni dello Swiss Style internazionale.",
    tags: ["Astro", "TailwindCSS", "TypeScript"],
    imgHash: "66d2f5d4b8e46702da7f063e9804910966dd5fa6"
  }));

  master.appendChild(secProgetti);

  // -------------------------------------------------------------
  // SECTION 05: FORMAZIONE ACCADEMICA
  // -------------------------------------------------------------
  const secEdu = createFrame("05_Section_Formazione", {
    width: 390,
    layout: "VERTICAL",
    spacing: 20,
    padding: [36, 20, 36, 20],
    fill: cWhite,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });

  secEdu.appendChild(createText("05 // FORMAZIONE", {
    size: 10,
    weight: "Bold",
    color: cBurgundy,
    tracking: 2
  }));
  secEdu.appendChild(createText("Formazione & Accademie", {
    size: 24,
    weight: "Bold",
    color: cCharcoal,
    width: 350
  }));
  secEdu.appendChild(createText("Eccellenza accademica certificata: votazioni al vertice nei percorsi tecnologici e specializzazione in software engineering.", {
    size: 13,
    weight: "Regular",
    color: cSlate,
    lineHeight: 19,
    width: 350
  }));

  // Helper for Education Card
  function createEduCard({
    school,
    degree,
    grade = null,
    hours = null,
    location,
    period,
    desc,
    logoHash = null
  }) {
    const card = createFrame("EduCard_" + school, {
      width: 350,
      layout: "VERTICAL",
      spacing: 12,
      padding: [16, 16, 16, 16],
      fill: cIvory,
      border: cBorder,
      radius: 10,
      primarySizing: "AUTO",
      counterSizing: "FIXED"
    });

    // Top Row
    const topRow = createFrame("TopRow", {
      width: 318,
      layout: "HORIZONTAL",
      spacing: 12,
      primarySizing: "FIXED",
      counterSizing: "AUTO"
    });
    topRow.counterAxisAlignItems = "CENTER";

    if (logoHash) {
      const logoBox = createImageRect("Logo_" + school, logoHash, 40, 40, 8);
      topRow.appendChild(logoBox);
    } else {
      const initialBox = createFrame("InitialBox", {
        width: 40,
        height: 40,
        layout: "HORIZONTAL",
        radius: 8,
        fill: cBurgundyTint,
        border: cBurgundy,
        primarySizing: "FIXED",
        counterSizing: "FIXED"
      });
      initialBox.primaryAxisAlignItems = "CENTER";
      initialBox.counterAxisAlignItems = "CENTER";
      initialBox.appendChild(createText("42", { size: 14, weight: "Bold", color: cBurgundy }));
      topRow.appendChild(initialBox);
    }

    const headerText = createFrame("HeaderText", {
      width: 266,
      layout: "VERTICAL",
      spacing: 2,
      primarySizing: "FIXED",
      counterSizing: "AUTO"
    });
    headerText.appendChild(createText(school, { size: 15, weight: "Bold", color: cCharcoal }));
    headerText.appendChild(createText(degree, { size: 12.5, weight: "Bold", color: cBurgundy }));
    topRow.appendChild(headerText);
    card.appendChild(topRow);

    // Meta Row: Grade & Hours
    const metaRow = createFrame("MetaRow", {
      width: 318,
      layout: "HORIZONTAL",
      spacing: 8,
      primarySizing: "AUTO",
      counterSizing: "AUTO"
    });
    metaRow.counterAxisAlignItems = "CENTER";

    if (grade) {
      metaRow.appendChild(createBadge("VOTAZIONE: " + grade, {
        bgColor: cBurgundyTint,
        textColor: cBurgundy,
        borderColor: cBurgundy,
        size: 10.5,
        weight: "Bold"
      }));
    }
    if (hours) {
      metaRow.appendChild(createBadge(hours, { bgColor: cWhite, textColor: cSlate, borderColor: cBorder, size: 10 }));
    }
    metaRow.appendChild(createBadge(location + " · " + period, { bgColor: cWhite, textColor: cSlate, borderColor: cBorder, size: 10 }));
    card.appendChild(metaRow);

    // Description
    card.appendChild(createText(desc, {
      size: 12.5,
      weight: "Regular",
      color: { r: 0.2, g: 0.25, b: 0.32 },
      lineHeight: 18,
      width: 318
    }));

    return card;
  }

  // 1. ITS LAZIO DIGITAL
  secEdu.appendChild(createEduCard({
    school: "ITS Lazio Digital",
    degree: "Tecnico Superiore AR, VR e Mixed Reality (EQF5)",
    grade: "101 / 110",
    hours: "1.080 Ore",
    location: "Roma",
    period: "2024 - 2025",
    desc: "Percorso biennale di alta specializzazione tecnica focalizzato su game development con Unity C#, pipeline 3D real-time, hardware spaziale (zSpace, Meta Quest) e programmazione interattiva avanzata.",
    logoHash: "7fed08166190bcd914b83a6fdfe8b28330e56267"
  }));

  // 2. ITIS ALESSANDRO VOLTA
  secEdu.appendChild(createEduCard({
    school: "ITIS Alessandro Volta",
    degree: "Diploma Tecnico in Informatica e Telecomunicazioni",
    grade: "100 / 100",
    location: "Napoli",
    period: "2018 - 2023",
    desc: "Massima votazione all'esame di stato. Solide basi di computer science: algoritmi e strutture dati, programmazione OOP (C, Java), architetture di rete e progettazione basi di dati SQL.",
    logoHash: "3c8e87db2b1545d7045cce47fa9d4c3689f43e8b"
  }));

  // 3. ISAS VIDEOGAMES ACADEMY
  secEdu.appendChild(createEduCard({
    school: "ISAS Videogames Academy",
    degree: "Game Design & Game Programming",
    hours: "475 Ore",
    location: "Napoli",
    period: "2022 - 2023",
    desc: "Master specialistico in game design e programmazione Unity C#. Studio di motori fisici, game loop, intelligenza artificiale per NPC e sviluppo di prototipi completi per game jam.",
    logoHash: "10f8c9915824d3a8482ad3a642ebb832c812d61a"
  }));

  // 4. 42 ROMA LUISS / ELIS
  secEdu.appendChild(createEduCard({
    school: "42 Roma Luiss / ELIS",
    degree: "Software Engineering (Piscine C)",
    location: "Roma",
    period: "2023",
    desc: "Scuola d'eccellenza informatica internazionale basata su peer-to-peer learning intensivo. Programmazione a basso livello in C, gestione memoria Unix/POSIX e risoluzione di algoritmi complessi senza librerie esterne."
  }));

  master.appendChild(secEdu);

  // -------------------------------------------------------------
  // SECTION 06: CONTATTO & CERTIFICAZIONI + FOOTER
  // -------------------------------------------------------------
  const secContact = createFrame("06_Section_Contatto", {
    width: 390,
    layout: "VERTICAL",
    spacing: 20,
    padding: [36, 20, 36, 20],
    fill: cIvory,
    border: cBorder,
    borderWidth: 1,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });

  secContact.appendChild(createText("06 // CONTATTO & CERTIFICAZIONI", {
    size: 10,
    weight: "Bold",
    color: cBurgundy,
    tracking: 2
  }));
  secContact.appendChild(createText("Certificazioni & Contatto", {
    size: 24,
    weight: "Bold",
    color: cCharcoal,
    width: 350
  }));

  // Certifications list cards
  const certBox = createFrame("CertificationsBox", {
    width: 350,
    layout: "VERTICAL",
    spacing: 8,
    padding: [16, 16, 16, 16],
    fill: cWhite,
    border: cBorder,
    radius: 10,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });
  certBox.appendChild(createText("CERTIFICAZIONI RICONOSCIUTE", { size: 10, weight: "Bold", color: cSlate, tracking: 1.5 }));

  function createCertRow(title, issuer, year) {
    const r = createFrame("CertRow", {
      width: 318,
      layout: "HORIZONTAL",
      primarySizing: "FIXED",
      counterSizing: "AUTO"
    });
    r.primaryAxisAlignItems = "SPACE_BETWEEN";
    r.counterAxisAlignItems = "CENTER";

    const left = createFrame("CertLeft", {
      layout: "VERTICAL",
      spacing: 2,
      counterSizing: "AUTO",
      primarySizing: "AUTO"
    });
    left.appendChild(createText(title, { size: 12.5, weight: "Bold", color: cCharcoal }));
    left.appendChild(createText(issuer, { size: 11, weight: "Medium", color: cSlate }));
    r.appendChild(left);

    r.appendChild(createBadge(year, { bgColor: cIvoryDark, textColor: cBurgundy, size: 10, weight: "Bold" }));
    return r;
  }

  certBox.appendChild(createCertRow("Epass 7 Moduli User", "Certificazione Informatica Europea", "2024"));
  certBox.appendChild(createDivider(318));
  certBox.appendChild(createCertRow("Cisco Cybersecurity Essentials", "Cisco Networking Academy", "2024"));
  certBox.appendChild(createDivider(318));
  certBox.appendChild(createCertRow("Rome Video Game Lab Hackathon", "Gaming Week Lab", "2024"));

  secContact.appendChild(certBox);

  // Quick Contact Card (Dark Charcoal Box with Burgundy Accents)
  const contactCard = createFrame("DirectContactCard", {
    width: 350,
    layout: "VERTICAL",
    spacing: 16,
    padding: [22, 20, 22, 20],
    fill: cCharcoal,
    radius: 12,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });

  contactCard.appendChild(createText("INIZIAMO UN PROGETTO", { size: 10.5, weight: "Bold", color: { r: 0.9, g: 0.6, b: 0.65 }, tracking: 1.5 }));
  contactCard.appendChild(createText("Parliamo del tuo prossimo videogioco o applicativo spaziale.", {
    size: 20,
    weight: "Bold",
    color: cWhite,
    lineHeight: 26,
    width: 310
  }));
  contactCard.appendChild(createText("Disponibile per assunzione Full-time, contratti Unity XR e collaborazioni in sede a Roma/Napoli o full-remote.", {
    size: 12.5,
    weight: "Regular",
    color: { r: 0.7, g: 0.75, b: 0.85 },
    lineHeight: 18,
    width: 310
  }));

  // Quick Contact Buttons
  const contactActions = createFrame("ContactActions", {
    width: 310,
    layout: "VERTICAL",
    spacing: 10,
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });

  // Email CTA
  const emailBtn = createFrame("EmailCTA", {
    width: 310,
    height: 44,
    layout: "HORIZONTAL",
    radius: 8,
    fill: cBurgundy,
    primarySizing: "FIXED",
    counterSizing: "FIXED"
  });
  emailBtn.primaryAxisAlignItems = "CENTER";
  emailBtn.counterAxisAlignItems = "CENTER";
  emailBtn.appendChild(createText("✉  Valeriocom@hotmail.it", { size: 13, weight: "Bold", color: cWhite, tracking: 0.5 }));
  contactActions.appendChild(emailBtn);

  // Phone CTA
  const phoneBtn = createFrame("PhoneCTA", {
    width: 310,
    height: 44,
    layout: "HORIZONTAL",
    radius: 8,
    fill: { color: cWhite, opacity: 0.08 },
    border: { color: cWhite, opacity: 0.2 },
    borderWidth: 1,
    primarySizing: "FIXED",
    counterSizing: "FIXED"
  });
  phoneBtn.primaryAxisAlignItems = "CENTER";
  phoneBtn.counterAxisAlignItems = "CENTER";
  phoneBtn.appendChild(createText("📞  +39 333 995 9271", { size: 13, weight: "Bold", color: cWhite, tracking: 0.5 }));
  contactActions.appendChild(phoneBtn);

  // Social Links Row
  const socialRow = createFrame("SocialRow", {
    width: 310,
    layout: "HORIZONTAL",
    spacing: 10,
    primarySizing: "FIXED",
    counterSizing: "AUTO"
  });

  function createSocialBtn(title, iconHash) {
    const s = createFrame("Social_" + title, {
      width: 150,
      height: 40,
      layout: "HORIZONTAL",
      spacing: 8,
      padding: [8, 12, 8, 12],
      radius: 8,
      fill: { color: cWhite, opacity: 0.06 },
      border: { color: cWhite, opacity: 0.15 },
      primarySizing: "FIXED",
      counterSizing: "FIXED"
    });
    s.primaryAxisAlignItems = "CENTER";
    s.counterAxisAlignItems = "CENTER";
    const icon = createImageRect("Icon_" + title, iconHash, 16, 16, 2);
    s.appendChild(icon);
    s.appendChild(createText(title, { size: 12, weight: "Bold", color: cWhite }));
    return s;
  }

  socialRow.appendChild(createSocialBtn("LinkedIn", "23224beed6f42ebf3b5662bf1ec9f87959fd1801"));
  socialRow.appendChild(createSocialBtn("GitHub", "1668d7ce3796481cbc173701e35192bdc37a252c"));
  contactActions.appendChild(socialRow);

  contactCard.appendChild(contactActions);
  secContact.appendChild(contactCard);

  // GDPR Disclaimer & Swiss Footer
  const footerBox = createFrame("SwissFooterBox", {
    width: 350,
    layout: "VERTICAL",
    spacing: 10,
    padding: [16, 0, 8, 0],
    primarySizing: "AUTO",
    counterSizing: "FIXED"
  });
  footerBox.counterAxisAlignItems = "CENTER";

  footerBox.appendChild(createText("Autorizzo il trattamento dei miei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).", {
    size: 10.5,
    weight: "Regular",
    color: cSlate,
    align: "CENTER",
    lineHeight: 15,
    width: 350
  }));

  footerBox.appendChild(createDivider(200));

  footerBox.appendChild(createText("VALERIO COMELLA © 2026 · SWISS EDITORIAL MOBILE CV", {
    size: 10.5,
    weight: "Bold",
    color: cCharcoal,
    align: "CENTER",
    tracking: 0.5
  }));

  secContact.appendChild(footerBox);
  master.appendChild(secContact);

  figma.currentPage.appendChild(master);

  // Scroll into view
  figma.viewport.scrollAndZoomIntoView([headerCard, master]);

  return {
    success: true,
    masterId: master.id,
    masterName: master.name,
    headerId: headerCard.id,
    headerName: headerCard.name,
    x: master.x,
    y: master.y,
    width: master.width,
    height: master.height,
    sections: master.children.map(c => ({ name: c.name, height: c.height }))
  };
})();
`;
