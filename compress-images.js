const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = path.join(__dirname, 'public', 'images');
const OUTPUT_DIR = path.join(__dirname, 'public', 'images-compressed');
const QUALITY = 75;
const MAX_WIDTH = 1200;
const VALID_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const files = fs.readdirSync(INPUT_DIR).filter((f) => {
  const fullPath = path.join(INPUT_DIR, f);
  return fs.statSync(fullPath).isFile() && VALID_EXTS.includes(path.extname(f).toLowerCase());
});

console.log(`Found ${files.length} images to compress...\n`);

(async () => {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputName = path.parse(file).name + '.webp';
    const outputPath = path.join(OUTPUT_DIR, outputName);

    const beforeSize = fs.statSync(inputPath).size;

    try {
      await sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const afterSize = fs.statSync(outputPath).size;
      totalBefore += beforeSize;
      totalAfter += afterSize;

      const savedPct = Math.round((1 - afterSize / beforeSize) * 100);
      console.log(`✓ ${file} → ${outputName} (${(beforeSize / 1024).toFixed(0)}KB → ${(afterSize / 1024).toFixed(0)}KB, -${savedPct}%)`);
    } catch (err) {
      console.log(`✗ ${file} — ${err.message}`);
    }
  }

  console.log(`\nDone! Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Compressed images are in /public/images-compressed/`);
})();