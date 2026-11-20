const ws = new WebSocket('ws://127.0.0.1:3055');

ws.onopen = () => {
  ws.send(JSON.stringify({ role: 'mcp-client', type: 'register' }));

  const code = `
    const v4 = figma.currentPage.children.find(c => c.name.includes('Variant 4'));
    const h6 = figma.currentPage.children.find(c => c.name === 'HEADER · VARIANT 6');
    
    function getTexts(node) {
      if (node.type === 'TEXT') {
        return [{ text: node.characters, size: node.fontSize, font: node.fontName }];
      }
      let res = [];
      if (node.children) {
        for (const child of node.children) {
          res = res.concat(getTexts(child));
        }
      }
      return res;
    }

    return {
      v4Sections: v4 ? v4.children.map(c => ({ name: c.name, width: c.width, height: c.height, layout: c.layoutMode })) : null,
      h6Texts: h6 ? getTexts(h6) : null
    };
  `;

  ws.send(JSON.stringify({ id: 'inspect-v4', action: 'eval', code }));
};

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  if (json.id === 'inspect-v4') {
    console.log(JSON.stringify(json.data, null, 2));
    ws.close();
    process.exit(0);
  }
};

ws.onerror = (err) => {
  console.error('WS error:', err);
  process.exit(1);
};
