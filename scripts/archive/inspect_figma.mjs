const ws = new WebSocket('ws://127.0.0.1:3055');

ws.onopen = () => {
  ws.send(JSON.stringify({ role: 'mcp-client', type: 'register' }));

  const code = `
    const frames = figma.currentPage.children.map(c => ({
      id: c.id,
      name: c.name,
      x: c.x,
      y: c.y,
      width: c.width,
      height: c.height,
      childrenCount: c.children ? c.children.length : 0
    }));
    return frames;
  `;

  ws.send(JSON.stringify({ id: 'inspect-canvas', action: 'eval', code }));
};

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  if (json.id === 'inspect-canvas') {
    console.log(JSON.stringify(json.data, null, 2));
    ws.close();
    process.exit(0);
  }
};

ws.onerror = (err) => {
  console.error('WS error:', err);
  process.exit(1);
};
