const fs = require('fs');
try {
  const content = fs.readFileSync('data.js', 'utf8').replace('export const ', 'const ');
  // Use a quick dirty check by creating a new function
  // We can't eval easily due to multiple exports, let's just check the whole file
  // Actually, node -c data.js doesn't work if it's ES module without type:module.
  // We can just use node to check syntax.
} catch (e) {
  console.error(e);
}
