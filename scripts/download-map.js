const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";
const targetPath = path.join(__dirname, '../public/world-map.json');

console.log(`Downloading map data from ${url}...`);

https.get(url, (res) => {
    const file = fs.createWriteStream(targetPath);
    res.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('Map data downloaded successfully to public/world-map.json');
    });
}).on('error', (err) => {
    console.error('Error downloading map data:', err.message);
});
