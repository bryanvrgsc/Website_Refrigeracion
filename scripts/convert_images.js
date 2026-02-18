
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');

async function convertImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await convertImages(filePath);
    } else if (/\.(png|jpe?g)$/i.test(file)) {
      const avifPath = filePath.replace(/\.(png|jpe?g)$/i, '.avif');
      console.log(`Converting: ${filePath} -> ${avifPath}`);

      try {
        await sharp(filePath)
          .avif({ quality: 80 })
          .toFile(avifPath);
        console.log(`Successfully converted ${file}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

console.log('Starting image conversion...');
convertImages(publicDir).then(() => {
  console.log('Conversion complete!');
}).catch(err => {
  console.error('Fatal error:', err);
});
