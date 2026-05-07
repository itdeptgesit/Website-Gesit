const { test, expect } = require('@playwright/test');

const publicRoutes = [
  { path: '/', name: 'Home' },
  { path: '/about-us', name: 'About Us' },
  { path: '/csr', name: 'CSR' },
  { path: '/news', name: 'News' },
  { path: '/career', name: 'Career' },
  { path: '/contact-us', name: 'Contact Us' },
  { path: '/our-business/property', name: 'Property' },
  { path: '/our-business/manufacturing', name: 'Manufacturing' },
  { path: '/our-business/natural-resources', name: 'Natural Resources' },
  { path: '/our-business/trading-services', name: 'Trading & Services' },
];

test.describe('Global Navigation & Route Accessibility', () => {
  for (const route of publicRoutes) {
    test(`should navigate to ${route.name} and display brand logo`, async ({ page }) => {
      await page.goto(route.path);
      
      // Verify brand text is present in the header
      const brandText = page.getByText('THE GESIT COMPANIES').first();
      await expect(brandText).toBeVisible();

      // SEO & Accessibility: Every page MUST have exactly one <h1>
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
      
      // Animation handling: Wait for title to become visible (accounting for 1.2s animations)
      await expect(h1).toBeVisible({ timeout: 10000 });
    });
  }

  test('should handle 404 for non-existent routes', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response.status()).toBe(404);
  });
});
