import fs from 'fs';

let content = fs.readFileSync('data.js', 'utf8');

// Find all growthSequence arrays
// We will replace each growthSequence array by evaluating it, fixing it if it's cumulative, and converting it back.
content = content.replace(/growthSequence:\s*\[([\s\S]*?)\](,?)/g, (match, inner, comma) => {
    // evaluate the array
    let arr;
    try {
        arr = eval('[' + inner + ']');
    } catch (e) {
        return match;
    }
    
    // Check if cumulative:
    // A sequence is cumulative if length > 1, all elements have days, and days are strictly increasing,
    // AND the first element has days: 0 and gdd: 0 (most of the time, or very low)
    let isCumulative = true;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].days <= arr[i-1].days) {
            isCumulative = false;
            break;
        }
    }
    
    // Some crops have days: 7, 7, 20 which is not cumulative.
    if (isCumulative && arr.length > 2 && arr[arr.length - 1].days > 40) {
        // Fix it
        for (let i = arr.length - 1; i > 0; i--) {
            arr[i].gdd = arr[i].gdd - arr[i-1].gdd;
            arr[i].days = arr[i].days - arr[i-1].days;
        }
        
        // Reconstruct string
        let newInner = arr.map(stage => {
            let props = [];
            for (let k in stage) {
                if (typeof stage[k] === 'string') {
                    props.push(`${k}: '${stage[k]}'`);
                } else if (Array.isArray(stage[k])) {
                    props.push(`${k}: [${stage[k].map(x => `'${x}'`).join(', ')}]`);
                } else {
                    props.push(`${k}: ${stage[k]}`);
                }
            }
            return `\n      { ${props.join(', ')} }`;
        }).join(',') + '\n    ';
        
        return `growthSequence: [${newInner}]${comma}`;
    }
    
    return match;
});

fs.writeFileSync('data.js', content);
console.log("Fixed data.js");
