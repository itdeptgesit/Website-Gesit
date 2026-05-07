const { test, expect } = require('@playwright/test');

test('homepage has brand text and navigation works', async ({ page }) => {
  // Buka halaman utama
  await page.goto('/');

  // Pastikan teks brand terlihat (ambil yang pertama jika ada beberapa)
  const brandText = page.getByText('THE GESIT COMPANIES').first();
  await expect(brandText).toBeVisible();

  // Pastikan menu CSR ada dan bisa diklik
  const csrLink = page.getByRole('link', { name: 'CSR', exact: true }).first();
  await expect(csrLink).toBeVisible();
  
  await csrLink.click();
  
  // Pastikan URL berpindah ke /csr
  await expect(page).toHaveURL(/\/csr/);
});
