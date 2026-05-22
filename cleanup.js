const fs = require('fs');
let lines = fs.readFileSync('js/script.js', 'utf8').split('\n');
lines = lines.map(line => line.includes('initAudio();') ? '' : line);
const startIndex = lines.findIndex(l => l.includes('function initAudio() {'));
if (startIndex !== -1) {
    let endIndex = startIndex;
    let braceCount = 0;
    let foundBrace = false;
    for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('{')) { braceCount++; foundBrace = true; }
        if (line.includes('}')) braceCount--;
        if (foundBrace && braceCount === 0) {
            endIndex = i;
            break;
        }
    }
    lines.splice(startIndex - 1, endIndex - startIndex + 2); // Also remove the comment above it
}
fs.writeFileSync('js/script.js', lines.join('\n'));
