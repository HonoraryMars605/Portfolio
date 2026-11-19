import fs from 'fs';

const ws = new WebSocket('ws://127.0.0.1:3055');
const id = 'cmd-' + Date.now();

ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'register', role: 'mcp-client' }));
  setTimeout(() => {
    ws.send(JSON.stringify({
      action: 'eval',
      id,
      code: `
        const root = figma.getNodeById("83:252");
        if (!root) return { error: "Node 83:252 not found" };

        function summarizeNode(n, depth = 0) {
          const summary = {
            id: n.id,
            name: n.name,
            type: n.type,
            x: Math.round(n.x),
            y: Math.round(n.y),
            width: Math.round(n.width),
            height: Math.round(n.height),
          };
          if (n.characters !== undefined) {
            summary.characters = n.characters;
          }
          if (depth < 2 && n.children && n.children.length > 0) {
            summary.children = n.children.map(c => summarizeNode(c, depth + 1));
          } else if (n.children) {
            summary.childCount = n.children.length;
            summary.childrenNames = n.children.map(c => c.name);
          }
          return summary;
        }

        return {
          id: root.id,
          name: root.name,
          width: root.width,
          height: root.height,
          children: root.children.map(c => summarizeNode(c, 0))
        };
      `
    }));
  }, 400);
};

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.result || msg.data) {
    fs.writeFileSync('FIGMA_ASTRO_AUDIT/variant7_tree.json', JSON.stringify(msg.result || msg.data, null, 2));
    console.log('Saved variant7_tree.json');
    process.exit(0);
  }
};

setTimeout(() => {
  console.log('timeout reached');
  process.exit(0);
}, 6000);
