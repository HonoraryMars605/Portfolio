import fs from 'fs';

const ws = new WebSocket('ws://127.0.0.1:3055');

ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'register', role: 'mcp-client' }));
  ws.send(JSON.stringify({
    action: 'eval',
    id: 'get-sections-detail',
    code: `
      const targetIds = [
        "83:253", // 01 · Presentazione
        "83:297", // 02 · Competenze
        "83:373", // 03 · Esperienze professionali
        "83:560", // 04 · Progetti
        "83:679", // 05 · Formazione e certificazioni
        "83:918", // 06 · Interessi personali
        "83:1070", // 07 · Contatti e crediti
        "83:1114"  // Navigazione / Barra superiore
      ];

      function dumpNode(n, depth = 0) {
        const item = {
          id: n.id,
          name: n.name,
          type: n.type,
          x: Math.round(n.x),
          y: Math.round(n.y),
          width: Math.round(n.width),
          height: Math.round(n.height),
        };
        if (n.characters !== undefined) item.characters = n.characters;
        if (n.layoutMode !== undefined) item.layoutMode = n.layoutMode;
        if (n.itemSpacing !== undefined) item.itemSpacing = n.itemSpacing;
        if (n.paddingTop !== undefined) {
          item.padding = [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft];
        }
        if (depth < 4 && n.children && n.children.length > 0) {
          item.children = n.children.map(c => dumpNode(c, depth + 1));
        } else if (n.children) {
          item.childCount = n.children.length;
          item.childrenNames = n.children.map(c => c.name);
        }
        return item;
      }

      const results = {};
      for (const id of targetIds) {
        const node = figma.getNodeById(id);
        if (node) {
          results[id] = dumpNode(node, 0);
        } else {
          results[id] = null;
        }
      }
      return results;
    `
  }));
};

ws.onmessage = (e) => {
  const resp = JSON.parse(e.data);
  if (resp.id === 'get-sections-detail' && resp.status === 'success') {
    fs.writeFileSync('FIGMA_ASTRO_AUDIT/all_sections_detail.json', JSON.stringify(resp.data, null, 2));
    console.log('Saved FIGMA_ASTRO_AUDIT/all_sections_detail.json successfully!');
    process.exit(0);
  }
};

setTimeout(() => {
  console.log('TIMEOUT');
  process.exit(1);
}, 6000);
