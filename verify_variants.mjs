import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/valerio/Desktop/valeriocomella.github.io/figma_variants_preview';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

export async function runVerification(options = { exportScreenshots: false, zoomIntoView: false }) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('ws://127.0.0.1:3055');

    ws.onopen = () => {
      ws.send(JSON.stringify({ role: 'mcp-client', type: 'register' }));

      const code = `
        async function inspectCanvas() {
          const variantsConfig = [
            { id: 1, key: 'brutalist', author: 'brutalist', expectedX: 10400, nameMatch: /variant 1|brutalist/i },
            { id: 2, key: 'cyber', author: 'cyber', expectedX: 12200, nameMatch: /variant 2|cyber/i },
            { id: 3, key: 'neobrutal', author: 'neobrutal', expectedX: 14000, nameMatch: /variant 3|neo-brutal|neobrutal/i },
            { id: 4, key: 'luxury', author: 'luxury', expectedX: 15800, nameMatch: /variant 4|luxury|editorial|minimal swiss/i },
            { id: 5, key: 'bento', author: 'bento', expectedX: 17600, nameMatch: /variant 5|bento/i },
          ];

          const games = ['Il Rito', 'Lock Fight', 'Please Open The Door', 'Rusheep', 'Sfuryatell', 'Violinum'];
          const companies = ["L'ABCD", 'Katabasi', 'Skill Factory', 'Protom'];
          const educationGroups = [
            ['ITS Lazio', 'Lazio Digital'],
            ['ISAS'],
            ['Volta', 'ITIS']
          ];
          const contact = 'Valeriocom@hotmail.it';

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

          const pageChildren = figma.currentPage.children;
          const report = {};
          const matchedNodes = [];

          for (const cfg of variantsConfig) {
            let node = pageChildren.find(c => Math.abs(c.x - cfg.expectedX) < 300);
            if (!node) {
              node = pageChildren.find(c => cfg.nameMatch.test(c.name));
            }

            if (!node) {
              report[cfg.key] = {
                status: 'missing',
                author: cfg.author,
                expectedX: cfg.expectedX,
                message: 'Frame not found on canvas'
              };
              continue;
            }

            matchedNodes.push(node);

            const allTexts = getAllText(node);
            const joinedText = allTexts.join(' ').toLowerCase();

            const missingGames = games.filter(g => !joinedText.includes(g.toLowerCase()));
            const missingCompanies = companies.filter(c => !joinedText.includes(c.toLowerCase()));
            const missingEducation = educationGroups.filter(grp => !grp.some(e => joinedText.includes(e.toLowerCase())));
            const hasContact = joinedText.includes(contact.toLowerCase());

            const sections = (node.children || []).map(child => ({
              id: child.id,
              name: child.name,
              type: child.type,
              x: child.x,
              y: child.y,
              width: child.width,
              height: child.height,
              childrenCount: child.children ? child.children.length : 0
            }));

            // Check dimensions & layout
            const widthOk = Math.abs(node.width - 1440) < 5;
            const heightOk = node.height >= 1200;
            const sectionCountOk = sections.length >= 4;

            const issues = [];
            if (!widthOk) issues.push(\`Width is \${node.width}, expected 1440\`);
            if (!heightOk) issues.push(\`Height is \${node.height}, expected >= 1200\`);
            if (missingGames.length > 0) issues.push(\`Missing games: \${missingGames.join(', ')}\`);
            if (missingCompanies.length > 0) issues.push(\`Missing companies: \${missingCompanies.join(', ')}\`);
            if (missingEducation.length > 0) issues.push(\`Missing education components: \${missingEducation.map(g => g[0]).join(', ')}\`);
            if (!hasContact) issues.push(\`Missing contact email \${contact}\`);
            if (sections.length < 4) issues.push(\`Too few top-level sections (\${sections.length})\`);

            let thumbnailB64 = null;
            if (${options.exportScreenshots}) {
              try {
                const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 0.25 } });
                let binary = '';
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                  binary += String.fromCharCode(bytes[i]);
                }
                thumbnailB64 = figma.base64Encode ? figma.base64Encode(bytes) : btoa(binary);
              } catch (e) {
                issues.push('Export failed: ' + e.message);
              }
            }

            report[cfg.key] = {
              status: issues.length === 0 ? 'verified' : 'issues_found',
              author: cfg.author,
              id: node.id,
              name: node.name,
              x: node.x,
              y: node.y,
              width: node.width,
              height: node.height,
              sectionsCount: sections.length,
              sections: sections.map(s => s.name),
              issues,
              thumbnailB64
            };
          }

          if (${options.zoomIntoView} && matchedNodes.length > 0) {
            figma.viewport.scrollAndZoomIntoView(matchedNodes);
          }

          return report;
        }
        return await inspectCanvas();
      `;

      ws.send(JSON.stringify({ id: 'verify-run', action: 'eval', code }));
    };

    ws.onmessage = (event) => {
      const json = JSON.parse(event.data);
      if (json.id === 'verify-run') {
        const report = json.data;

        // Save thumbnails if present
        for (const [key, item] of Object.entries(report)) {
          if (item.thumbnailB64) {
            const filePath = path.join(outDir, `${key}_preview.png`);
            fs.writeFileSync(filePath, Buffer.from(item.thumbnailB64, 'base64'));
            item.savedThumbnail = filePath;
            delete item.thumbnailB64;
          }
        }

        ws.close();
        resolve(report);
      }
    };

    ws.onerror = (err) => {
      reject(err);
    };

    setTimeout(() => {
      reject(new Error('Verification timed out after 30s'));
    }, 30000);
  });
}

// If executed directly from CLI
if (process.argv[1].endsWith('verify_variants.mjs')) {
  const exportScreenshots = process.argv.includes('--export');
  const zoomIntoView = process.argv.includes('--zoom');
  runVerification({ exportScreenshots, zoomIntoView })
    .then(report => {
      console.log(JSON.stringify(report, null, 2));
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
