import WebSocket from 'ws';

const ws = new WebSocket('ws://127.0.0.1:3055');

ws.on('open', () => {
  ws.send(JSON.stringify({ role: 'mcp-client', type: 'register' }));

  const code = `
    const hPc = figma.getNodeById('17:6618') || figma.currentPage.findOne(n => n.name === 'HEADER · VARIANT 7 · PC');
    const hMob = figma.getNodeById('17:6186') || figma.currentPage.findOne(n => n.name === 'HEADER · VARIANT 7 · MOBILE');

    function dump(node) {
      if (!node) return null;
      return {
        id: node.id,
        name: node.name,
        type: node.type,
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height,
        layoutMode: node.layoutMode,
        primaryAxisAlignItems: node.primaryAxisAlignItems,
        counterAxisAlignItems: node.counterAxisAlignItems,
        paddingLeft: node.paddingLeft,
        paddingRight: node.paddingRight,
        paddingTop: node.paddingTop,
        paddingBottom: node.paddingBottom,
        itemSpacing: node.itemSpacing,
        fills: node.fills,
        strokes: node.strokes,
        strokeWeight: node.strokeWeight,
        cornerRadius: node.cornerRadius,
        characters: node.characters,
        fontSize: node.fontSize,
        fontName: node.fontName,
        children: node.children ? node.children.map(dump) : undefined
      };
    }

    return {
      hPc: dump(hPc),
      hMob: dump(hMob)
    };
  `;

  const reqId = 'req-' + Date.now();
  ws.send(JSON.stringify({ type: 'eval', id: reqId, code }));
});

ws.on('message', (msg) => {
  const res = JSON.parse(msg.toString());
  if (res.type === 'eval-result' || res.result !== undefined) {
    console.log(JSON.stringify(res, null, 2));
    process.exit(0);
  }
});

setTimeout(() => {
  console.error('Timeout');
  process.exit(1);
}, 5000);
