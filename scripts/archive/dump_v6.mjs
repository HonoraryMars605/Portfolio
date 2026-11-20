const ws = new WebSocket('ws://127.0.0.1:3055');

ws.onopen = () => {
  ws.send(JSON.stringify({ role: 'mcp-client', type: 'register' }));

  const code = `
    const v6 = figma.currentPage.children.find(c => c.name === 'Portfolio · Variant 6 · CV Resume Pure');
    function getStructure(node, indent = 0) {
      let res = ' '.repeat(indent) + node.name + ' (' + node.type + ', ' + Math.round(node.width) + 'x' + Math.round(node.height) + ')';
      if (node.type === 'TEXT') {
        res += ' => "' + node.characters.replace(/\\n/g, ' ') + '"';
      }
      let lines = [res];
      if (node.children) {
        for (const child of node.children) {
          lines = lines.concat(getStructure(child, indent + 2));
        }
      }
      return lines;
    }
    return v6 ? getStructure(v6) : ['v6 not found'];
  `;

  ws.send(JSON.stringify({ id: 'dump-v6', action: 'eval', code }));
};

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  if (json.id === 'dump-v6') {
    console.log(json.data.slice(80).join('\n'));
    ws.close();
    process.exit(0);
  }
};

ws.onerror = (err) => {
  console.error('WS error:', err);
  process.exit(1);
};
