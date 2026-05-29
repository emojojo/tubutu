import fs from 'fs';
let content = fs.readFileSync('data.js', 'utf8');
// remove "export const cities = ..."
content = content.replace(/export const cities = [\s\S]*?];/, '');
content = content.replace('export const crops =', 'global.crops =');
try {
  eval(content);
  let roots = global.crops.filter(c => c.categoryId === 'root');
  for (let r of roots) {
    let images = r.stages.map(s => s.image);
    console.log(`${r.name} (${r.id}): ${images.length} images ->`, images);
  }
} catch (e) {
  console.log("Error:", e);
}
