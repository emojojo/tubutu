const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'assets', 'icons');
const srcDir = '/Users/flock-studio/.gemini/antigravity/brain/dac2dedb-2bcf-4e6b-9474-10f6efe6f6b2';

const files = fs.readdirSync(srcDir).filter(f => f.startsWith('icon_') && f.endsWith('.png'));

const fileMap = {};
files.forEach(f => {
  const match = f.match(/^icon_(.+)_(\d+)\.png$/);
  if (match) {
    const id = match[1];
    const timestamp = parseInt(match[2]);
    if (!fileMap[id] || fileMap[id].timestamp < timestamp) {
      fileMap[id] = { file: f, timestamp };
    }
  }
});

const updates = {};
for (const [id, info] of Object.entries(fileMap)) {
  const destName = `icon_${id}.png`;
  updates[id] = `assets/icons/${destName}`;
}

let data = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');

for (const [id, avatarPath] of Object.entries(updates)) {
  // If it already has an avatar property, we replace it
  if (data.includes(`avatar: '${avatarPath}'`)) continue;
  
  const hasAvatarRegex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?)(avatar:\\s*'[^']*',?\\s*)`, 'g');
  if (hasAvatarRegex.test(data)) {
    data = data.replace(hasAvatarRegex, `$1avatar: '${avatarPath}',\n    `);
  } else {
    // Inject avatar after icon
    const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?icon:\\s*'[^']+',?\\s*)`, 'g');
    data = data.replace(regex, `$1avatar: '${avatarPath}',\n    `);
  }
}

fs.writeFileSync(path.join(__dirname, 'data.js'), data);
console.log('done updating avatars');
