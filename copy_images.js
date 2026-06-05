const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\ThinkPad\\.gemini\\antigravity\\brain\\c210d610-1262-4807-a75e-2b30998d2920';
const destDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);

files.forEach(file => {
  if (file.startsWith('cat_') && file.endsWith('.png')) {
    // extract base name without timestamp (e.g. cat_pakaian_wanita_12345.png -> cat_pakaian_wanita.png)
    const match = file.match(/^(cat_.*?)_\d+\.png$/);
    if (match) {
      const newName = match[1] + '.png';
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, newName));
      console.log(`Copied ${file} to ${newName}`);
    }
  }
});

console.log('Copy complete!');
