const fs = require('fs');
let content = fs.readFileSync('data.js', 'utf8');

// Instead of eval, let's use a very simple regex parser
// We need to find crops with category: 'leafy_greens'
// or just find all IDs and categories.

let match;
const crops = [];
const regex = /id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?category:\s*'([^']+)'[\s\S]*?growthSequence:\s*\[([\s\S]*?)\]\s*,/g;

while ((match = regex.exec(content)) !== null) {
    const id = match[1];
    const name = match[2];
    const category = match[3];
    const growthSeqStr = match[4];
    
    if (category === 'leafy_greens') {
        const stages = [];
        const stageRegex = /stage:\s*'([^']+)'/g;
        let sMatch;
        while ((sMatch = stageRegex.exec(growthSeqStr)) !== null) {
            stages.push(sMatch[1]);
        }
        crops.push({ id, name, stages });
    }
}

console.log(JSON.stringify(crops, null, 2));
