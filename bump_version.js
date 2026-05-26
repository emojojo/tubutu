const fs = require('fs');
const path = require('path');

const version = Date.now();

// Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
indexHtml = indexHtml.replace(/app\.js\?v=\d+/g, `app.js?v=${version}`);
indexHtml = indexHtml.replace(/data\.js\?v=\d+/g, `data.js?v=${version}`);
fs.writeFileSync(indexPath, indexHtml);

// Update app.js
const appPath = path.join(__dirname, 'app.js');
let appJs = fs.readFileSync(appPath, 'utf8');
appJs = appJs.replace(/data\.js\?v=\d+/g, `data.js?v=${version}`);
appJs = appJs.replace(/weather_data\.js\?v=\d+/g, `weather_data.js?v=${version}`);
fs.writeFileSync(appPath, appJs);

console.log(`Successfully bumped cache-busting version to ${version}`);
