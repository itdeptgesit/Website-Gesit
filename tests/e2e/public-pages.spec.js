const { test, expect } = require('@playwright/test');

test.describe('Public Pages E2E Tests', () => {
  
  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check if hero section exists (common across your public pages)
    await expect(page.locator('body')).toBeVisible();
    
    // Verify title or some main element
    await expect(page).toHaveTitle(/Gesit/i);
  });

  test('News listing page renders and navigates to article', async ({ page }) => {
    await page.goto('/news');
    
    // Check if the news title is visible
    await expect(page.locator('h1').filter({ hasText: /News/i })).toBeVisible();
    
    // If there are articles, click the first one
    const firstArticle = page.locator('.news-card').first();
    if (await firstArticle.isVisible()) {
      await firstArticle.click();
      
      // Should navigate to a slug page
      await expect(page).toHaveURL(/\/news\/.+/);
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });

  test('Contact Us form validation works', async ({ page }) => {
    await page.goto('/contact-us');
    
    // Submit without filling fields
    await page.click('button[type="submit"]');
    
    // Expect validation errors
    await expect(page.locator('.gesit-error-message').first()).toBeVisible();
    await expect(page.getByText(/Full name is required/i)).toBeVisible();
    await expect(page.getByText(/Email is required/i)).toBeVisible();
  });

  test('Contact Us form honeypot field is hidden', async ({ page }) => {
    await page.goto('/contact-us');
    
    // The honeypot field should be hidden from normal view
    const honeypot = page.locator('input[name="website"]');
    
    // Playwright evaluates visibility strictly (display: none, opacity: 0, etc.)
    await expect(honeypot).toBeHidden();
  });

});
