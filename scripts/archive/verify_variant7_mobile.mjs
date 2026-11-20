// verify_variant7_mobile.mjs
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
    async function verify() {
      const headerNode = figma.currentPage.children.find(c => c.name === "HEADER · VARIANT 7 · MOBILE");
      const mobileNode = figma.currentPage.children.find(c => c.name === "Portfolio · Variant 7 · Swiss Editorial CV · Mobile · 390");

      if (!mobileNode) {
        return { error: "Mobile node not found" };
      }

      function getAllText(node) {
        let texts = [];
        if (node.type === "TEXT") {
          texts.push(node.characters);
        }
        if (node.children) {
          for (const c of node.children) {
            texts = texts.concat(getAllText(c));
          }
        }
        return texts;
      }

      function getAllImages(node) {
        let hashes = [];
        if (node.fills && Array.isArray(node.fills)) {
          for (const f of node.fills) {
            if (f.type === "IMAGE" && f.imageHash) {
              hashes.push(f.imageHash);
            }
          }
        }
        if (node.children) {
          for (const c of node.children) {
            hashes = hashes.concat(getAllImages(c));
          }
        }
        return hashes;
      }

      const allTexts = getAllText(mobileNode);
      const joinedText = allTexts.join(" ").toLowerCase();
      const allImages = getAllImages(mobileNode);

      // Required verification checks
      const checks = {
        name: joinedText.includes("valerio comella"),
        role: joinedText.includes("software engineer") && joinedText.includes("unity"),
        availableBadge: joinedText.includes("available for hire"),
        quotesCarousel: joinedText.includes("building worlds with code"),
        // Stats
        statHours: joinedText.includes("1200+"),
        statGames: joinedText.includes("6 giochi"),
        stat101: joinedText.includes("101 / 110") || joinedText.includes("101/110"),
        stat100: joinedText.includes("100 / 100") || joinedText.includes("100/100"),
        // Companies
        companySkillFactory: joinedText.includes("skill factory"),
        companyABCD: joinedText.includes("l'abcd") || joinedText.includes("abcd"),
        companyProtom: joinedText.includes("protom"),
        companyKatabasi: joinedText.includes("katabasi"),
        // Projects
        projectViolinum: joinedText.includes("violinum"),
        projectLockFight: joinedText.includes("lock fight"),
        projectRusheep: joinedText.includes("rusheep"),
        projectSfuryatell: joinedText.includes("sfuryatell"),
        projectLazio: joinedText.includes("lazio digital"),
        // Education
        edu42: joinedText.includes("42 roma"),
        eduLazio: joinedText.includes("its lazio"),
        eduVolta: joinedText.includes("volta"),
        eduISAS: joinedText.includes("isas"),
        // Contact & GDPR
        contactEmail: joinedText.includes("valeriocom@hotmail.it"),
        contactPhone: joinedText.includes("333 995 9271") || joinedText.includes("3339959271"),
        gdpr: joinedText.includes("gdpr") || joinedText.includes("regolamento ue"),
        // Hashes
        hasHeroIllustration: allImages.includes("804913e4432d2702eabf402e152737e88b651526"),
        hasUnityIcon: allImages.includes("07bdd7bdd8bd1caefee7ba0855f0ef191c114dcb"),
        hasProtomLogo: allImages.includes("925a27742bcc95a9a1a00149015a08aaf052f45b"),
        hasKatabasiLogo: allImages.includes("8b86bec8ba17ef4b4cc772f6ff532129cb694d4e"),
        hasViolinumImg: allImages.includes("bf75d80ee060d6305c0a3112de92eae62902e8a6"),
        hasLockFightImg: allImages.includes("62f781e13506e3cf0f8410c26b60d57d2f602520"),
        hasRusheepImg: allImages.includes("eeb2bca4eba61de408ed31499fc232fce6aa14fe"),
        hasSfuryatellImg: allImages.includes("fd8e4a0a1fc38f89ec673837222b53e9053f6f6a"),
        hasLazioLogo: allImages.includes("7fed08166190bcd914b83a6fdfe8b28330e56267"),
        hasVoltaLogo: allImages.includes("3c8e87db2b1545d7045cce47fa9d4c3689f43e8b"),
        hasISASLogo: allImages.includes("10f8c9915824d3a8482ad3a642ebb832c812d61a"),
      };

      // Export screenshot preview (scale 0.5)
      let thumbnailB64 = null;
      try {
        const bytes = await mobileNode.exportAsync({ format: "PNG", constraint: { type: "SCALE", value: 0.5 } });
        let binary = "";
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        thumbnailB64 = figma.base64Encode ? figma.base64Encode(bytes) : btoa(binary);
      } catch (e) {
        console.error("Export failed:", e);
      }

      return {
        header: headerNode ? {
          name: headerNode.name,
          x: headerNode.x,
          y: headerNode.y,
          width: headerNode.width,
          height: headerNode.height
        } : null,
        mobile: {
          name: mobileNode.name,
          x: mobileNode.x,
          y: mobileNode.y,
          width: mobileNode.width,
          height: mobileNode.height,
          sectionsCount: mobileNode.children.length,
          sections: mobileNode.children.map(c => ({ name: c.name, height: c.height }))
        },
        imageCount: allImages.length,
        textCount: allTexts.length,
        checks,
        thumbnailB64
      };
    }
    return await verify();
  `;

  ws.send(JSON.stringify({ id: 'verify-v7-mobile', action: 'eval', code }));
};

ws.onmessage = (event) => {
  const json = JSON.parse(event.data);
  if (json.id === 'verify-v7-mobile') {
    const data = json.data;
    if (data.thumbnailB64) {
      const previewPath = path.join(outDir, 'variant7_mobile_preview.png');
      fs.writeFileSync(previewPath, Buffer.from(data.thumbnailB64, 'base64'));
      console.log('Saved preview to', previewPath);
      delete data.thumbnailB64;
    }
    console.log(JSON.stringify(data, null, 2));
    ws.close();
    process.exit(0);
  }
};

ws.onerror = (err) => {
  console.error('WebSocket error:', err);
  process.exit(1);
};
