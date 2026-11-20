const ws = new WebSocket('ws://127.0.0.1:3055');

ws.onopen = () => {
  ws.send(JSON.stringify({ role: 'mcp-client', type: 'register' }));

  const code = `
    const fonts = [
      { family: 'Inter', style: 'Regular' },
      { family: 'Inter', style: 'Medium' },
      { family: 'Inter', style: 'Semi Bold' },
      { family: 'Inter', style: 'Bold' },
    ];
    let loaded = [];
    for (const f of fonts) {
      try {
        await figma.loadFontAsync(f);
        loaded.push(f.family + ' ' + f.style);
      } catch (e) {
        loaded.push('FAILED: ' + f.family + ' ' + f.style + ' ' + e.message);
      }
    }
    return loaded;
  `;

  ws.send(JSON.stringify({ id: 'test-fonts', action: 'eval', code }));
};

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  if (json.id === 'test-fonts') {
    console.log(JSON.stringify(json.data, null, 2));
    ws.close();
    process.exit(0);
  }
};

ws.onerror = (err) => {
  console.error('WS error:', err);
  process.exit(1);
};
