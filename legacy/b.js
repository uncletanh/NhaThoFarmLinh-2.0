const fs = require('fs');
const files = ['about.html', 'archive.html', 'index.html', 'poetry.html', 'quotes.html', 'thoughts.html'];
files.forEach(f => {
    let text = fs.readFileSync(f, 'utf8');
    text = text.replace(/href="css\/style\.css[^"]*"/g, 'href="css/style.css?v=2.3"');
    text = text.replace(/src="(js\/[^"]+\.js)[^"]*"/g, 'src="$1?v=2.3"');
    fs.writeFileSync(f, text, 'utf8');
});
