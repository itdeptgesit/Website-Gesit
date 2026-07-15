const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const nameWithoutExt = path.basename(file, ext);
        const webpPath = path.join(dir, `${nameWithoutExt}.webp`);
        
        // Skip if webp already exists
        if (fs.existsSync(webpPath)) {
          console.log(`Skipping (already exists): ${webpPath}`);
          continue;
        }

        try {
          await sharp(fullPath).webp({ quality: 80 }).toFile(webpPath);
          console.log(`Converted: ${fullPath} -> ${webpPath}`);
          // Optionally delete old file? No, keep it safe for now.
        } catch (err) {
          console.error(`Error converting ${fullPath}:`, err);
        }
      }
    }
  }
}

processDirectory(publicDir).then(() => console.log('Done converting images!'));
