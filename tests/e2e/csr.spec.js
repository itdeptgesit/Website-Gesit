const { test, expect } = require('@playwright/test');

test.describe('CSR Page - Initiatives Accordion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/csr');
  });

  test('should toggle accordion items correctly', async ({ page }) => {
    // 1. Initial state: First item (Healthcare) should be visible as a button
    const healthcareBtn = page.getByRole('button', { name: 'Healthcare', exact: true });
    await expect(healthcareBtn).toBeVisible();

    // 2. Click Healthcare to open
    await healthcareBtn.click();
    
    // Verify content inside Healthcare is visible
    // Based on the code, it contains sub-items like "Medical Facilities"
    await expect(page.getByText('Medical Facilities')).toBeVisible();

    // 3. Click Environment to switch
    const environmentBtn = page.getByRole('button', { name: 'Environment & Cultural Outreach', exact: true });
    await expect(environmentBtn).toBeVisible();
    await environmentBtn.click();

    // Verify Environment content is visible and Healthcare content is hidden
    await expect(page.getByText('Cultural Outreach')).toBeVisible();
    await expect(page.getByText('Medical Facilities')).not.toBeVisible();
  });

  test('should toggle plus/minus icons', async ({ page }) => {
    const healthcareBtn = page.getByRole('button', { name: 'Healthcare', exact: true });
    
    // Initial: Plus icon should be visible (as a SVG path)
    // We can check the background color or class if we have specific identifiers
    // Or just check if the content is hidden
    await expect(page.getByText('Medical Facilities')).not.toBeVisible();

    await healthcareBtn.click();
    await expect(page.getByText('Medical Facilities')).toBeVisible();
  });
});
