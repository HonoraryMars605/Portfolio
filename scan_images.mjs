const ws = new WebSocket('ws://127.0.0.1:3055');

ws.onopen = () => {
  ws.send(JSON.stringify({ role: 'mcp-client', type: 'register' }));

  const code = `
    const imageMap = {};
    function scanNode(node) {
      if (node.fills && Array.isArray(node.fills)) {
        for (const fill of node.fills) {
          if (fill.type === 'IMAGE' && fill.imageHash) {
            imageMap[fill.imageHash] = (imageMap[fill.imageHash] || []).concat(node.name);
          }
        }
      }
      if (node.children) {
        for (const child of node.children) {
          scanNode(child);
        }
      }
    }
    for (const child of figma.currentPage.children) {
      scanNode(child);
    }
    return imageMap;
  `;

  ws.send(JSON.stringify({ id: 'scan-images', action: 'eval', code }));
};

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  if (json.id === 'scan-images') {
    console.log(JSON.stringify(json.data, null, 2));
    ws.close();
    process.exit(0);
  }
};

ws.onerror = (err) => {
  console.error('WS error:', err);
  process.exit(1);
};
