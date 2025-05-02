import { test, expect } from '@playwright/test';

test.describe('Public pages', () => {
  test('shows correct links for logged-out users', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await expect(page.getByRole('link', { name: 'Information' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register Club' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Recommended Clubs' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Clubs', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Search' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login/Sign Up' })).toBeVisible();
  });
});

// Use the logged-in state for authenticated tests
test.describe('Logged-in pages', () => {
  test.use({ storageState: 'storage/logged-in.json' });

  test('shows correct links for logged-in users', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await expect(page.getByRole('link', { name: 'Information' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register Club' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Recommended Clubs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Clubs', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Search' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login/Sign Up' })).not.toBeVisible();
  });
});
