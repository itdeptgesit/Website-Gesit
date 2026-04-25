async function testNews() {
    const res = await fetch('http://localhost:3000/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'Test',
            slug: 'test',
            date: '25 Apr 2026',
            category: 'News',
            author: 'Gesit',
            content: 'Test content',
            image_url: 'test.jpg'
        })
    });

    console.log('Status:', res.status);
    const json = await res.json();
    console.log('Response:', json);
}

testNews();
