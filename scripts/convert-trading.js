const fs = require('fs');

const htmlFile = 'c:\\Downloaded Web Sites\\dev.gesit.co.id\\our-business\\trading-services\\index.html';
const htmlContent = fs.readFileSync(htmlFile, 'utf8');

// Extract the <main> block
const mainMatch = htmlContent.match(/<main id="qodef-page-content"[^>]*>([\s\S]*?)<\/main>/);
if (!mainMatch) {
    console.log("Could not find <main>");
    process.exit(1);
}

let mainHtml = `<main id="qodef-page-content" className="qodef-grid qodef-layout--template">\n` + mainMatch[1] + `\n</main>`;

// Basic HTML to JSX conversions
mainHtml = mainHtml.replace(/class=/g, 'className=');
mainHtml = mainHtml.replace(/<!--[\s\S]*?-->/g, ''); // removed comments
mainHtml = mainHtml.replace(/<img([^>]+)>/g, (match, attrs) => {
    if (!attrs.endsWith('/')) {
        return `<img${attrs}/>`;
    }
    return match;
});
mainHtml = mainHtml.replace(/<source([^>]+)>/g, (match, attrs) => {
    if (!attrs.endsWith('/')) {
        return `<source${attrs}/>`;
    }
    return match;
});
mainHtml = mainHtml.replace(/<br>/g, '<br/>');
mainHtml = mainHtml.replace(/<wbr>/g, '<wbr/>');
mainHtml = mainHtml.replace(/style="([^"]+)"/g, (match, p1) => {
    const styleObj = p1.split(';').filter(s => s.trim() !== '').reduce((obj, prop) => {
        const parts = prop.split(':');
        if (parts.length === 2) {
            let key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            const value = parts[1].trim();
            obj.push(`${key}: '${value}'`);
        }
        return obj;
    }, []);
    return `style={{${styleObj.join(', ')}}}`;
});
// Also escape { and } inside text, which shouldn't happen much but just in case
// Actually, let's not blindly escape them unless we need to. There are no braces in content here.

// I need to extract the 3 parts and handle the carousels. Instead of parsing it, I will just dump the converted HTML to a file so I can manually polish it.
fs.writeFileSync('c:\\Downloaded Web Sites\\dev.gesit.co.id\\gesit-nextjs\\trading-services-raw.jsx', mainHtml);
console.log("Written to trading-services-raw.jsx");
