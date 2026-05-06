const { test, expect } = require('@playwright/test');

test.describe('Admin Dashboard E2E Tests', () => {

  test('Unauthenticated user is redirected to login', async ({ page }) => {
    // Try to access dashboard directly
    await page.goto('/dashboard');
    
    // Should be redirected to login page
    await expect(page).toHaveURL(/\/admin\/login/);
    
    // Login form should be visible
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('Admin login page renders correctly', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Verify Gesit Admin title
    await expect(page.getByText(/Admin Portal/i).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
  });

});
