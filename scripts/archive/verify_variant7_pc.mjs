import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/valerio/Desktop/valeriocomella.github.io/figma_variants_preview';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const ws = new WebSocket('ws://127.0.0.1:3055');

ws.onopen = () => {
  ws.send(JSON.stringify({ role: 'mcp-client', type: 'register' }));

  const code = `
    async function verifyAndScreenshot() {
      const header = figma.currentPage.children.find(c => c.name === 'HEADER · VARIANT 7 · PC');
      const master = figma.currentPage.children.find(c => c.name === 'Portfolio · Variant 7 · Swiss Editorial CV · PC · 1440');

      if (!header || !master) {
        return { error: 'Frames not found', headerFound: !!header, masterFound: !!master };
      }

      function getAllText(node) {
        let texts = [];
        if (node.type === 'TEXT') {
          texts.push(node.characters);
        }
        if (node.children) {
          for (const child of node.children) {
            texts = texts.concat(getAllText(child));
          }
        }
        return texts;
      }

      const allTexts = getAllText(master);
      const joined = allTexts.join(' ').toLowerCase();

      // Check required terms
      const checks = {
        name: joined.includes('valerio comella'),
        heroTitle: joined.includes('software engineer') && joined.includes('unity (c#) & full stack'),
        quotes: [
          'building worlds with code',
          'interactive xr specialist',
          'clean architecture & systems',
          'code is the new art'
        ].map(q => ({ quote: q, found: joined.includes(q) })),
        metrics: [
          '1200+ ore',
          '6 titoli',
          '101 / 110',
          '100 / 100'
        ].map(m => ({ metric: m, found: joined.includes(m) })),
        companies: [
          'skill factory',
          "l'abcd",
          'protom',
          'katabasi'
        ].map(c => ({ company: c, found: joined.includes(c) })),
        projects: [
          'violinum',
          'lock fight',
          'rusheep',
          'sfuryatell',
          'its lazio',
          'il rito',
          'please open the door'
        ].map(p => ({ project: p, found: joined.includes(p) })),
        education: [
          '42 roma',
          'its lazio digital',
          'alessandro volta',
          'isas videogames academy'
        ].map(e => ({ edu: e, found: joined.includes(e) })),
        certifications: [
          'epass',
          'cisco',
          'rome video game lab'
        ].map(c => ({ cert: c, found: joined.includes(c) })),
        contact: {
          email: joined.includes('valeriocom@hotmail.it'),
          phone: joined.includes('3339959271'),
          gdpr: joined.includes('gdpr') || joined.includes('trattamento dei miei dati personali')
        }
      };

      // Export screenshot of master
      const bytes = await master.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 0.5 } });
      let binary = '';
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const b64 = figma.base64Encode ? figma.base64Encode(bytes) : btoa(binary);

      return {
        header: {
          id: header.id,
          name: header.name,
          x: header.x,
          y: header.y,
          width: header.width,
          height: header.height
        },
        master: {
          id: master.id,
          name: master.name,
          x: master.x,
          y: master.y,
          width: master.width,
          height: master.height,
          sections: master.children.map(c => ({ name: c.name, width: c.width, height: c.height, layout: c.layoutMode }))
        },
        checks,
        screenshotB64: b64
      };
    }
    return await verifyAndScreenshot();
  `;

  ws.send(JSON.stringify({ id: 'verify-v7-pc', action: 'eval', code }));
};

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  if (json.id === 'verify-v7-pc') {
    if (json.error) {
      console.error('Error from Figma:', json.error);
      ws.close();
      process.exit(1);
    }
    const { header, master, checks, screenshotB64 } = json.data;
    console.log('Header verification:', header);
    console.log('Master dimensions:', master.name, master.x, master.y, master.width, master.height);
    console.log('Sections:', master.sections);
    console.log('Checks summary:', JSON.stringify(checks, null, 2));

    if (screenshotB64) {
      const p = path.join(outDir, 'variant7_pc_preview.png');
      fs.writeFileSync(p, Buffer.from(screenshotB64, 'base64'));
      console.log('Saved screenshot to:', p);
    }

    ws.close();
    process.exit(0);
  }
};

ws.onerror = (err) => {
  console.error('WS Error:', err);
  process.exit(1);
};

setTimeout(() => {
  console.error('Timeout');
  process.exit(1);
}, 30000);
