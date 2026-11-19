const ws = new WebSocket('ws://127.0.0.1:3055');

ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'register', role: 'mcp-client' }));
  setTimeout(() => {
    ws.send(JSON.stringify({
      action: 'eval',
      id: 'cmd-1',
      code: `
        const bar = figma.getNodeById("83:1114");
        if (!bar) return { error: "not found" };
        return {
          id: bar.id,
          name: bar.name,
          width: bar.width,
          height: bar.height,
          children: bar.children.map(c => ({
            id: c.id,
            name: c.name,
            type: c.type,
            width: c.width,
            height: c.height,
            children: c.children ? c.children.map(ch => ({ id: ch.id, name: ch.name, type: ch.type, characters: ch.characters })) : []
          }))
        };
      `
    }));
  }, 300);
};

ws.onmessage = (e) => {
  console.log("RECEIVED:", e.data);
  process.exit(0);
};

setTimeout(() => {
  console.log("TIMEOUT");
  process.exit(1);
}, 4000);
