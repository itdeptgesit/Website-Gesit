const { test, expect } = require('@playwright/test');

test.describe('News API Integrity', () => {
  test('GET /api/news should return valid news items', async ({ request }) => {
    const response = await request.get('/api/news');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    
    // Validate response is an array
    expect(Array.isArray(data)).toBeTruthy();

    if (data.length > 0) {
      const firstItem = data[0];
      // Check for required fields
      expect(firstItem).toHaveProperty('id');
      expect(firstItem).toHaveProperty('title');
      expect(firstItem).toHaveProperty('image_url');
      
      // Verify image_url is normalized (starting with /)
      expect(firstItem.image_url.startsWith('/')).toBeTruthy();
    }
  });

  test('GET /api/news with non-existent ID should handle gracefully (if supported)', async ({ request }) => {
    // Current API returns all news, but if it supported /api/news?id=X
    const response = await request.get('/api/news?id=999999');
    expect(response.ok()).toBeTruthy();
  });
});
