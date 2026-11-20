const ws = new WebSocket('ws://127.0.0.1:3055');

ws.onopen = () => {
  ws.send(JSON.stringify({ role: 'mcp-client', type: 'register' }));

  const code = `
    const testFrame = figma.createFrame();
    testFrame.layoutMode = 'VERTICAL';
    const child = figma.createFrame();
    testFrame.appendChild(child);
    child.layoutPositioning = 'ABSOLUTE';
    const isAbs = child.layoutPositioning;
    testFrame.remove();
    return { isAbs };
  `;

  ws.send(JSON.stringify({ id: 'test-abs', action: 'eval', code }));
};

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  if (json.id === 'test-abs') {
    console.log(JSON.stringify(json.data, null, 2));
    ws.close();
    process.exit(0);
  }
};

ws.onerror = (err) => {
  console.error('WS error:', err);
  process.exit(1);
};
