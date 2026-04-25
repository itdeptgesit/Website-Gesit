const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER_ERROR:', err.message));

    console.log('Navigating to http://localhost:3000 ...');
    try {
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

        // Wait a bit to check if button renders
        await page.waitForTimeout(2000);

        const btt = await page.$('.gesit-btt');
        console.log('BackToTop button found:', !!btt);

        const hero = await page.$('h1.rs-layer');
        console.log('Hero layer found:', !!hero);

    } catch (e) {
        console.log('Exception:', e.message);
    } finally {
        await browser.close();
    }
})();
