import { test, expect } from '@playwright/test';

test('Public pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'Information' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Register Club' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Recommended Clubs' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Clubs', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Search' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Login/Sign Up' })).toBeVisible();
});
