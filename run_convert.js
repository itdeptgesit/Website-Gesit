const fs = require('fs');
const path = require('path');
const HTMLtoJSX = require('htmltojsx');

const converter = new HTMLtoJSX({
  createClass: false,
});

function ensureDirSync(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function processHTMLtoJSX(html) {
    // Fix: multiline inline styles break HTMLtoJSX parser outputs
    html = html.replace(/style="([^"]*)"/gi, (match, p1) => {
        return 'style="' + p1.replace(/\r?\n|\r/g, ' ') + '"';
    });

    let jsx = converter.convert(html);
    return jsx;
}

function createComponent(name, htmlString) {
    const jsxContent = processHTMLtoJSX(htmlString);
    let componentString = `
export default function ${name}() {
  return (
    <>
${jsxContent}
    </>
  );
}
`;
    return componentString;
}

try {
    const basePath = path.resolve(__dirname, '../');
    const indexHtml = fs.readFileSync(path.join(basePath, 'index.html'), 'utf8');
    const aboutHtml = fs.readFileSync(path.join(basePath, 'about-us/index.html'), 'utf8');
    
    // Output path
    const srcPath = path.join(__dirname, 'src');
    ensureDirSync(path.join(srcPath, 'components'));
    ensureDirSync(path.join(srcPath, 'app/about-us'));

    // 1. Extract Header from index.html
    const headerStart = indexHtml.indexOf('<header id="qodef-page-header">');
    const headerEnd = indexHtml.indexOf('<div id="qodef-page-outer">');
    const headerHtml = indexHtml.substring(headerStart, headerEnd);
    const headerComponent = createComponent('Header', headerHtml);
    fs.writeFileSync(path.join(srcPath, 'components/Header.jsx'), headerComponent);
    console.log('Created components/Header.jsx');

    // 2. Extract Footer from index.html
    const footerStart = indexHtml.indexOf('<footer id="qodef-page-footer"');
    const wrapperEnd = indexHtml.lastIndexOf('</div>');
    let footerHtml = indexHtml.substring(footerStart, wrapperEnd); 
    let fullFooterHtml = footerHtml.trim();
    if(fullFooterHtml.endsWith('</div>')) {
        fullFooterHtml = fullFooterHtml.slice(0, -6);
    }
    const footerComponent = createComponent('Footer', fullFooterHtml);
    fs.writeFileSync(path.join(srcPath, 'components/Footer.jsx'), footerComponent);
    console.log('Created components/Footer.jsx');

    // 3. Extract Main content (index.html) -> app/page.jsx
    const mainStart = indexHtml.indexOf('<div id="qodef-page-outer">');
    const mainEnd = indexHtml.indexOf('<footer id="qodef-page-footer"');
    const mainHtml = indexHtml.substring(mainStart, mainEnd);
    const homeComponent = createComponent('Home', mainHtml);
    fs.writeFileSync(path.join(srcPath, 'app/page.jsx'), homeComponent);
    console.log('Created app/page.jsx');

    // 4. Extract Main content (about-us/index.html) -> app/about-us/page.jsx
    const aboutStart = aboutHtml.indexOf('<div id="qodef-page-outer">');
    const aboutEnd = aboutHtml.indexOf('<footer id="qodef-page-footer"');
    const aboutMainHtml = aboutHtml.substring(aboutStart, aboutEnd);
    const aboutComponent = createComponent('AboutUs', aboutMainHtml);
    fs.writeFileSync(path.join(srcPath, 'app/about-us/page.jsx'), aboutComponent);
    console.log('Created app/about-us/page.jsx');

} catch(err) {
    console.error("Error during conversion:", err);
}
