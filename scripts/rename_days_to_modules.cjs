const fs = require('fs');
const path = require('path');

const languages = ['python', 'javascript', 'sql'];
const dataDir = path.join(__dirname, '../src/data');

languages.forEach(lang => {
  const langDir = path.join(dataDir, lang);
  if (!fs.existsSync(langDir)) return;

  // Rename dayX.md to moduleX.md
  const files = fs.readdirSync(langDir);
  files.forEach(file => {
    if (file.startsWith('day') && file.endsWith('.md')) {
      const numMatch = file.match(/day(\d+)\.md/);
      if (numMatch) {
        const num = numMatch[1];
        const newFile = `module${num}.md`;
        fs.renameSync(path.join(langDir, file), path.join(langDir, newFile));
        console.log(`Renamed ${file} to ${newFile} in ${lang}`);
      }
    }
  });

  // Update quizzes.json keys from "dayX" to "moduleX"
  const quizFile = path.join(langDir, 'quizzes.json');
  if (fs.existsSync(quizFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(quizFile, 'utf8'));
      const newData = {};
      for (const key in data) {
        if (key.startsWith('day')) {
          const newKey = key.replace('day', 'module');
          newData[newKey] = data[key];
        } else {
          newData[key] = data[key];
        }
      }
      fs.writeFileSync(quizFile, JSON.stringify(newData, null, 2), 'utf8');
      console.log(`Updated quizzes.json keys in ${lang}`);
    } catch (e) {
      console.error(`Failed to process quizzes.json for ${lang}:`, e);
    }
  }
});
