import re
import json

with open('js/dataPoem.js', encoding='utf-8') as f:
    text = f.read()

titles = re.findall(r'title:\s*["\']([^"\']+)["\']', text)

with open('titles.txt', 'w', encoding='utf-8') as f:
    for t in titles:
        f.write(t + "\n")
