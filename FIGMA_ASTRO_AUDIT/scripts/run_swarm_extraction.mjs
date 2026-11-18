import fs from 'fs';
import path from 'path';

const AUDIT_DIR = path.resolve('FIGMA_ASTRO_AUDIT');
const PREVIEWS_DIR = path.join(AUDIT_DIR, 'previews');
const ASSETS_DIR = path.join(AUDIT_DIR, 'assets');

async function sendBridgeCommand(action, code) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('ws://127.0.0.1:3055');
    const id = 'cmd-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

    const timer = setTimeout(() => {
      try { ws.close(); } catch(e) {}
      reject(new Error(`Timeout waiting for bridge command ${id}`));
    }, 60000);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'register', role: 'mcp-client' }));
      ws.send(JSON.stringify({ action: 'eval', id, code }));
    };

    ws.onmessage = (event) => {
      clearTimeout(timer);
      try {
        const resp = JSON.parse(event.data);
        if (resp.id === id) {
          ws.close();
          if (resp.status === 'error') {
            reject(new Error(resp.error || 'Figma bridge returned error'));
          } else {
            resolve(resp.data);
          }
        }
      } catch (err) {
        reject(err);
      }
    };

    ws.onerror = (err) => {
      clearTimeout(timer);
      reject(err);
    };
  });
}

function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

async function run() {
  console.log('[Swarm Extractor] Starting deep extraction from Figma Desktop...');

  // 1. EXTRACT COMPLETE STRUCTURE AND STYLES TREE
  console.log('[Agent 1 & 2] Extracting full node tree & design properties...');
  const treeExtractionCode = `
    const root = figma.getNodeById("17:6624");
    if (!root) throw new Error("Frame 17:6624 not found");

    function serialize(node, depth = 0) {
      const item = {
        id: node.id,
        name: node.name,
        type: node.type,
        visible: node.visible,
        opacity: node.opacity,
        x: Math.round(node.x * 100) / 100,
        y: Math.round(node.y * 100) / 100,
        width: Math.round(node.width * 100) / 100,
        height: Math.round(node.height * 100) / 100,
        depth
      };

      if ("layoutMode" in node && node.layoutMode !== "NONE") {
        item.autoLayout = {
          layoutMode: node.layoutMode,
          primaryAxisAlign: node.primaryAxisAlignItems,
          counterAxisAlign: node.counterAxisAlignItems,
          paddingTop: node.paddingTop,
          paddingRight: node.paddingRight,
          paddingBottom: node.paddingBottom,
          paddingLeft: node.paddingLeft,
          itemSpacing: node.itemSpacing,
          layoutSizingH: node.layoutSizingHorizontal,
          layoutSizingV: node.layoutSizingVertical
        };
      }

      if ("constraints" in node) {
        item.constraints = node.constraints;
      }

      if ("fills" in node && Array.isArray(node.fills) && node.fills.length > 0) {
        item.fills = node.fills.map(f => {
          if (f.type === "SOLID") {
            return {
              type: "SOLID",
              color: { r: f.color.r, g: f.color.g, b: f.color.b },
              opacity: f.opacity !== undefined ? f.opacity : 1
            };
          }
          if (f.type === "IMAGE") {
            return { type: "IMAGE", scaleMode: f.scaleMode, imageHash: f.imageHash };
          }
          return { type: f.type };
        });
      }

      if ("strokes" in node && Array.isArray(node.strokes) && node.strokes.length > 0) {
        item.strokes = node.strokes.map(s => {
          if (s.type === "SOLID") {
            return {
              type: "SOLID",
              color: { r: s.color.r, g: s.color.g, b: s.color.b },
              opacity: s.opacity !== undefined ? s.opacity : 1
            };
          }
          return { type: s.type };
        });
        item.strokeWeight = node.strokeWeight;
        item.strokeAlign = node.strokeAlign;
      }

      if ("cornerRadius" in node && node.cornerRadius !== 0 && typeof node.cornerRadius === "number") {
        item.cornerRadius = node.cornerRadius;
      }

      if ("effects" in node && Array.isArray(node.effects) && node.effects.length > 0) {
        item.effects = node.effects.map(e => ({
          type: e.type,
          visible: e.visible,
          radius: e.radius,
          offset: e.offset,
          spread: e.spread
        }));
      }

      if (node.type === "TEXT") {
        item.text = {
          characters: node.characters,
          fontFamily: (typeof node.fontName === "object" && node.fontName !== figma.mixed) ? node.fontName.family : "mixed",
          fontStyle: (typeof node.fontName === "object" && node.fontName !== figma.mixed) ? node.fontName.style : "mixed",
          fontSize: node.fontSize === figma.mixed ? "mixed" : node.fontSize,
          lineHeight: node.lineHeight,
          letterSpacing: node.letterSpacing,
          textAlignHorizontal: node.textAlignHorizontal,
          textAlignVertical: node.textAlignVertical
        };
      }

      if (node.type === "INSTANCE") {
        item.isInstance = true;
        item.mainComponentId = node.mainComponent ? node.mainComponent.id : null;
        item.mainComponentName = node.mainComponent ? node.mainComponent.name : null;
      }

      if ("reactions" in node && Array.isArray(node.reactions) && node.reactions.length > 0) {
        item.reactions = node.reactions.map(r => ({
          trigger: r.trigger ? r.trigger.type : null,
          action: r.action ? r.action.type : null,
          destinationId: r.action && r.action.destinationId ? r.action.destinationId : null
        }));
      }

      if ("children" in node) {
        item.children = node.children.map(c => serialize(c, depth + 1));
      }

      return item;
    }

    return serialize(root);
  `;

  const fullTree = await sendBridgeCommand('eval', treeExtractionCode);
  fs.writeFileSync(path.join(AUDIT_DIR, 'raw_structure_tree.json'), JSON.stringify(fullTree, null, 2), 'utf8');
  console.log('[Agent 1] Structure tree written to raw_structure_tree.json');

  // 2. EXPORT SECTION PREVIEWS
  console.log('[Agent 3] Exporting section PNG previews...');
  const sectionIds = [
    { id: '17:6624', name: '00_full_canvas_10080x1256.png', scale: 0.15 },
    { id: '17:6663', name: '01_presentazione_1440x1256.png', scale: 0.5 },
    { id: '17:6710', name: '02_competenze_1440x1256.png', scale: 0.5 },
    { id: '17:6806', name: '03_esperienze_1440x1256.png', scale: 0.5 },
    { id: '17:6935', name: '04_progetti_1440x1256.png', scale: 0.5 },
    { id: '17:7040', name: '05_formazione_1440x1256.png', scale: 0.5 },
    { id: '17:7166', name: '06_interessi_1440x1256.png', scale: 0.5 },
    { id: '65:614',  name: '07_contatti_1440x1256.png', scale: 0.5 },
    { id: '34:2795', name: 'nav_barra_superiore_1400x56.png', scale: 1 },
    { id: '44:3818', name: 'nav_barra_laterale_45x282.png', scale: 1 }
  ];

  for (const s of sectionIds) {
    try {
      console.log(`Exporting ${s.name}...`);
      const exportCode = `
        const node = figma.getNodeById("${s.id}");
        if (!node) return { error: "node not found" };
        const bytes = await node.exportAsync({
          format: 'PNG',
          constraint: { type: 'SCALE', value: ${s.scale} }
        });
        return figma.base64Encode(bytes);
      `;
      const base64Data = await sendBridgeCommand('eval', exportCode);
      if (typeof base64Data === 'string' && base64Data.length > 50) {
        fs.writeFileSync(path.join(PREVIEWS_DIR, s.name), Buffer.from(base64Data, 'base64'));
        console.log(`Saved preview: ${s.name} (${Math.round(base64Data.length * 0.75 / 1024)} KB)`);
      }
    } catch (err) {
      console.error(`Failed to export ${s.name}:`, err.message);
    }
  }

  // 3. EXPORT VECTOR AND IMAGE ASSETS
  console.log('[Agent 3] Scanning for vector icons & image fills...');
  const assetScanCode = `
    const root = figma.getNodeById("17:6624");
    const assets = [];

    function scan(n) {
      // Check for image fills
      if (n.fills && Array.isArray(n.fills)) {
        for (const f of n.fills) {
          if (f.type === "IMAGE") {
            assets.push({
              nodeId: n.id,
              nodeName: n.name,
              type: "IMAGE",
              imageHash: f.imageHash,
              width: Math.round(n.width),
              height: Math.round(n.height)
            });
          }
        }
      }

      // Check for vector nodes (icons, logos, custom paths)
      if (n.type === "VECTOR" || (n.type === "FRAME" && (n.name.toLowerCase().includes("icon") || n.name.toLowerCase().includes("logo") || n.name.toLowerCase().includes("svg") || n.name.toLowerCase().includes("monogram")))) {
        assets.push({
          nodeId: n.id,
          nodeName: n.name,
          type: "VECTOR",
          width: Math.round(n.width),
          height: Math.round(n.height)
        });
      }

      if ("children" in n) {
        for (const c of n.children) {
          scan(c);
        }
      }
    }

    scan(root);
    return assets;
  `;

  const assetList = await sendBridgeCommand('eval', assetScanCode);
  fs.writeFileSync(path.join(AUDIT_DIR, 'raw_asset_list.json'), JSON.stringify(assetList, null, 2), 'utf8');
  console.log(`[Agent 3] Identified ${assetList.length} asset instances.`);

  // Export specific prominent assets
  for (const a of assetList) {
    if (a.type === "VECTOR" || a.type === "IMAGE") {
      try {
        const fmt = a.type === "VECTOR" ? "SVG" : "PNG";
        const cleanName = a.nodeName.replace(/[^a-zA-Z0-9_\-]/g, '_').substring(0, 30);
        const fileName = `${a.nodeId.replace(':', '_')}_${cleanName}.${fmt.toLowerCase()}`;
        const exportAssetCode = `
          const node = figma.getNodeById("${a.nodeId}");
          if (!node) return null;
          const bytes = await node.exportAsync({ format: '${fmt}' });
          return figma.base64Encode(bytes);
        `;
        const b64 = await sendBridgeCommand('eval', exportAssetCode);
        if (b64) {
          fs.writeFileSync(path.join(ASSETS_DIR, fileName), Buffer.from(b64, 'base64'));
          a.exportedFile = `assets/${fileName}`;
        }
      } catch (err) {
        a.exportError = err.message;
      }
    }
  }

  // 4. WRITE ASSETS MANIFEST
  const assetsManifest = {
    generatedAt: new Date().toISOString(),
    sourceNodeId: "17:6624",
    sourceNodeName: "Portfolio · Variant 7 · Swiss Editorial CV · PC · 1440",
    totalAssets: assetList.length,
    assets: assetList
  };
  fs.writeFileSync(path.join(AUDIT_DIR, 'assets-manifest.json'), JSON.stringify(assetsManifest, null, 2), 'utf8');

  console.log('[Swarm Extractor] Extraction complete. All raw data and files written successfully.');
}

run().catch(console.error);
