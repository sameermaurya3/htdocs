const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'Certificates/images/microsoft');
const outputDir = path.join(inputDir, 'thumbnails');
const maxWidth = 300; // Thumbnail width

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}


fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file.replace(ext, '.webp'));

  sharp(inputPath)
    .resize({ width: maxWidth })
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => console.log(`Optimized: ${file}`))
    .catch(err => console.error(`Error processing ${file}:`, err));
});

