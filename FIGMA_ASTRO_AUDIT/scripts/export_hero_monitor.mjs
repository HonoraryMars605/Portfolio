import fs from 'fs';

const ws = new WebSocket('ws://127.0.0.1:3055');
ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'register', role: 'mcp-client' }));
  ws.send(JSON.stringify({
    action: 'eval',
    id: 'export-monitor',
    code: `
      const node = figma.getNodeById("83:263");
      if (!node) return null;
      const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } });
      return figma.base64Encode(bytes);
    `
  }));
};
ws.onmessage = (e) => {
  const resp = JSON.parse(e.data);
  if (resp.id === 'export-monitor' && resp.status === 'success') {
    fs.writeFileSync('public/assets/variant7/hero-monitor-stand.png', Buffer.from(resp.data, 'base64'));
    console.log('Saved hero-monitor-stand.png successfully!');
    process.exit(0);
  }
};
