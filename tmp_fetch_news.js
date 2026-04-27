const fs = require('fs');
async function fetchNews() {
    try {
        const response = await fetch('http://localhost:3000/api/news');
        const data = await response.json();
        fs.writeFileSync('D:\\web\\Website-Gesit\\news_data_debug.json', JSON.stringify(data, null, 2), 'utf8');
        console.log('Data written to news_data_debug.json');
    } catch (err) {
        console.error(err);
    }
}
fetchNews();
