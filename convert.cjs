const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images';

fs.readdirSync(inputDir).forEach(async (file) => {
  if (file.endsWith('.png')) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(inputDir, file.replace('.png', '.webp'));

    try {
      await sharp(inputPath)
        .webp({ quality: 75 })
        .toFile(outputPath);

      fs.unlinkSync(inputPath);

      console.log(`Converted and deleted: ${file}`);
    } catch (err) {
      console.error(`Failed: ${file}`, err);
    }
  }
});