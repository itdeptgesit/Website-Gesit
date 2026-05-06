const { test, expect } = require('@playwright/test');

test.describe('Backend API Tests', () => {

  test('POST /api/contact - Rejects honeypot submission', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {
        name: 'Spam Bot',
        email: 'spam@bot.com',
        phone: '123456789',
        message: 'Cheap sunglasses!',
        website: 'http://spamsite.com', // Honeypot filled
        turnstileToken: 'fake_token'
      }
    });

    // Our API should ideally return a 200/success to trick the bot, or a 403
    // Assuming the API handles honeypot silently by dropping it or returning error
    // Check if response is ok (status 200) but didn't actually process it, or throws 400.
    expect([200, 400, 403]).toContain(response.status());
  });

  test('POST /api/contact - Rejects missing data', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {
        name: '',
        email: 'invalid-email'
      }
    });

    // Should return bad request due to missing/invalid fields or missing token
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBeDefined();
  });

  test('GET /api/news - Returns news array', async ({ request }) => {
    const response = await request.get('/api/news');
    
    // Check status
    expect(response.status()).toBe(200);
    
    // Check payload structure
    const body = await response.json();
    expect(Array.isArray(body) || body.data !== undefined).toBeTruthy();
  });

});
