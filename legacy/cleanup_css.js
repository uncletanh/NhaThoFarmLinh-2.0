const fs = require('fs');
let lines = fs.readFileSync('css/style.css', 'utf8').split('\n');
const startIndex = lines.findIndex(l => l.includes('/* Advanced Music Player */'));
const endIndex = lines.findIndex(l => l.includes('/* Curator\'s Notes */'));
if (startIndex !== -1 && endIndex !== -1) {
    lines.splice(startIndex, endIndex - startIndex);
}
fs.writeFileSync('css/style.css', lines.join('\n'));
