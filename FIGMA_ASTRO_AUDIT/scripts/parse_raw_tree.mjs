import fs from 'fs';

const tree = JSON.parse(fs.readFileSync('FIGMA_ASTRO_AUDIT/raw_structure_tree.json', 'utf8'));

function findNode(n, predicate) {
  if (predicate(n)) return n;
  if (n.children) {
    for (const c of n.children) {
      const res = findNode(c, predicate);
      if (res) return res;
    }
  }
  return null;
}

function findNodes(n, predicate, out = []) {
  if (predicate(n)) out.push(n);
  if (n.children) {
    for (const c of n.children) {
      findNodes(c, predicate, out);
    }
  }
  return out;
}

// Find node 83:252 (Variant 7 1440x900)
const v7 = findNode(tree, n => n.id === "83:252" || n.name?.includes("Portfolio · Variant 7 · Swiss Editorial CV · PC · 1440"));

console.log("Found V7:", v7 ? { id: v7.id, name: v7.name, width: v7.width, height: v7.height, childCount: v7.children?.length } : "not found");

if (v7 && v7.children) {
  const sectionsSummary = v7.children.map(c => ({
    id: c.id,
    name: c.name,
    type: c.type,
    x: c.x,
    y: c.y,
    width: c.width,
    height: c.height,
    children: c.children?.map(ch => ({
      id: ch.id,
      name: ch.name,
      type: ch.type,
      x: ch.x,
      y: ch.y,
      width: ch.width,
      height: ch.height,
      characters: ch.characters,
      childrenCount: ch.children?.length,
      childrenNames: ch.children?.map(g => g.name)
    }))
  }));

  fs.writeFileSync('FIGMA_ASTRO_AUDIT/v7_sections_summary.json', JSON.stringify(sectionsSummary, null, 2));
  console.log("Saved v7_sections_summary.json with", sectionsSummary.length, "sections");
}
