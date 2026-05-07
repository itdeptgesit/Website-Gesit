const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const wpUploads = path.join(publicDir, 'wp-content', 'uploads');

const mappings = [
    // Hero slider images
    { pattern: /hero_image_natural/, target: 'hero' },
    { pattern: /hero_image_property/, target: 'hero' },
    { pattern: /hero_image_trading/, target: 'hero' },
    { pattern: /hero_manufacturing/, target: 'hero' },
    { pattern: /hero_natural_resources/, target: 'hero' },

    // Videos
    { pattern: /\.mp4$/, target: 'video' },

    // Business sections
    { pattern: /property_jsl/, target: 'business/property' },
    { pattern: /property_PPHUI/, target: 'business/property' },
    { pattern: /property_TOD/, target: 'business/property' },
    { pattern: /trinity_/, target: 'business/property' },
    { pattern: /senayan-development/, target: 'business/property' },
    { pattern: /manufacturing_steel/, target: 'business/manufacturing' },
    { pattern: /alu_lr/, target: 'business/manufacturing' },
    { pattern: /plastic_packaging/, target: 'business/manufacturing' },
    { pattern: /natural_lds_bauxite/, target: 'business/natural-resources' },
    { pattern: /bauxite_mining/, target: 'business/natural-resources' },
    { pattern: /nickel-mining/, target: 'business/natural-resources' },
    { pattern: /trading_natural/, target: 'business/trading-services' },
    { pattern: /agency-services/, target: 'business/trading-services' },

    // CSR
    { pattern: /csr_slider/, target: 'csr' },
    { pattern: /Education\./, target: 'csr' },
    { pattern: /Healthcare\./, target: 'csr' },
    { pattern: /environment-scaled/, target: 'csr' },
    { pattern: /Bantuan-/, target: 'csr' },
    { pattern: /Gesit-Foundation-/, target: 'csr' },
    { pattern: /PMI/, target: 'csr' },
    { pattern: /Sembako/, target: 'csr' },
    { pattern: /Walikota-SBY/, target: 'csr' },

    // Career
    { pattern: /career_hero_revise/, target: 'career' },
    { pattern: /career_contact_form/, target: 'career' },

    // About
    { pattern: /integrity-scaled/, target: 'about' },
    { pattern: /respect-scaled/, target: 'about' },
    { pattern: /competency-scaled/, target: 'about' },
    { pattern: /passion-scaled/, target: 'about' },
    { pattern: /about-us-video/, target: 'video' },
    { pattern: /video_thumbnail/, target: 'video' },

    // News
    { pattern: /news_/, target: 'news' },

    // Logos
    { pattern: /gesit-logo-gold/, target: 'logos' },
    { pattern: /cropped-gesit-favicon/, target: 'logos' },
];

function moveFiles(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            moveFiles(fullPath);
        } else {
            const mapping = mappings.find(m => m.pattern.test(item));
            if (mapping) {
                const targetDir = path.join(publicDir, mapping.target);
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }
                const targetPath = path.join(targetDir, item);
                console.log(`Moving: ${item} -> ${mapping.target}`);
                try {
                    fs.renameSync(fullPath, targetPath);
                } catch (err) {
                    console.error(`Error moving ${item}: ${err.message}`);
                }
            }
        }
    }
}

if (fs.existsSync(wpUploads)) {
    moveFiles(wpUploads);
    console.log('Migration complete.');
} else {
    console.error('Source directory not found.');
}
