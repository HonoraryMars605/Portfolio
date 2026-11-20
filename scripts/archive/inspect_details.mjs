const ws = new WebSocket('ws://127.0.0.1:3055');

ws.onopen = () => {
  ws.send(JSON.stringify({ role: 'mcp-client', type: 'register' }));

  const code = `
    const header6 = figma.currentPage.children.find(c => c.name === 'HEADER · VARIANT 6');
    const v6 = figma.currentPage.children.find(c => c.name === 'Portfolio · Variant 6 · CV Resume Pure');
    
    function dumpNode(node, depth = 0) {
      if (!node) return null;
      const res = {
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
      };
      if (node.type === 'TEXT') {
        res.characters = node.characters;
        res.fontSize = node.fontSize;
        res.fontName = node.fontName;
        res.lineHeight = node.lineHeight;
        res.letterSpacing = node.letterSpacing;
      }
      if (depth < 2 && node.children) {
        res.children = node.children.map(c => dumpNode(c, depth + 1));
      } else if (node.children) {
        res.childrenCount = node.children.length;
        res.childrenSummary = node.children.map(c => ({ name: c.name, type: c.type, height: c.height }));
      }
      return res;
    }

    return {
      header6: dumpNode(header6, 2),
      v6: dumpNode(v6, 2)
    };
  `;

  ws.send(JSON.stringify({ id: 'inspect-details', action: 'eval', code }));
};

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  if (json.id === 'inspect-details') {
    console.log(JSON.stringify(json.data, null, 2));
    ws.close();
    process.exit(0);
  }
};

ws.onerror = (err) => {
  console.error('WS error:', err);
  process.exit(1);
};
