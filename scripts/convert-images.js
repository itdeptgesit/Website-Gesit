const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

async function convertDir(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await convertDir(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const webpPath = fullPath.substring(0, fullPath.lastIndexOf('.')) + '.webp';

                // Skip if already exists
                if (fs.existsSync(webpPath)) {
                    // console.log(`Skipping ${file} - WebP already exists`);
                    continue;
                }

                try {
                    await sharp(fullPath)
                        .webp({ quality: 80 })
                        .toFile(webpPath);
                    console.log(`Converted: ${path.relative(publicDir, fullPath)} -> ${path.basename(webpPath)}`);
                } catch (err) {
                    console.error(`Error converting ${file}:`, err.message);
                }
            }
        }
    }
}

console.log('Starting image conversion to WebP...');
convertDir(publicDir)
    .then(() => console.log('Image conversion complete!'))
    .catch(err => console.error('Conversion failed:', err));
