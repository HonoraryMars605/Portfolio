import { WebSocket } from 'ws';
import fs from 'fs';
import path from 'path';

const ws = new WebSocket('ws://127.0.0.1:3055');

ws.on('open', () => {
  console.log('Connected to Figma bridge');
  
  const code = `
    async function run() {
      const s6 = figma.getNodeById("17:7166");
      const cards = s6.findAll(n => n.name.startsWith("Card ·"));
      const res = [];
      for (const c of cards) {
        const poster = c.findOne(n => n.name === "CoverPoster");
        if (poster) {
          const bytes = await poster.exportAsync({ format: "PNG", constraint: { type: "SCALE", value: 1.5 } });
          const slug = c.name.replace("Card · ", "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
          res.push({ slug, b64: figma.base64Encode(bytes) });
        }
      }
      return res;
    }
    return run();
  `;

  ws.send(JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'eval',
    params: { code }
  }));
});

ws.on('message', (data) => {
  const resp = JSON.parse(data.toString());
  if (resp.result) {
    const list = resp.result;
    console.log('Received', list.length, 'posters');
    for (const item of list) {
      const buffer = Buffer.from(item.b64, 'base64');
      const filename = `poster-${item.slug}.png`;
      const outPath = path.join('public', 'assets', 'figma', filename);
      fs.writeFileSync(outPath, buffer);
      console.log('Saved:', outPath, buffer.length, 'bytes');
    }
    ws.close();
    process.exit(0);
  } else if (resp.error) {
    console.error('Error:', resp.error);
    ws.close();
    process.exit(1);
  }
});
