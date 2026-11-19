const ws = new WebSocket('ws://127.0.0.1:3055');
const id = 'cmd-' + Date.now();

ws.onopen = () => {
  console.log('connected to bridge');
  ws.send(JSON.stringify({ type: 'register', role: 'mcp-client' }));
  setTimeout(() => {
    ws.send(JSON.stringify({
      action: 'eval',
      id,
      code: `
        const matches = figma.root.findAll(n => n.name.toLowerCase().includes('preloader') || n.name.toLowerCase().includes('editorial'));
        matches.map(m => ({ id: m.id, name: m.name, type: m.type, width: m.width, height: m.height }));
      `
    }));
  }, 500);
};

ws.onmessage = (event) => {
  console.log('MSG:', event.data);
};

setTimeout(() => {
  console.log('timeout reached');
  process.exit(0);
}, 5000);
