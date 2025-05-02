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

  test('shows correct links for logged-in users', async ({ page }) => {
    await page.context().addCookies([
      {
        name: 'next-auth.session-token',
        value: 'mock-session-token',
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: false,
      },
    ]);

    await page.goto('http://localhost:3000/');

    await page.screenshot({ path: 'logged-in-state.png' });

    await expect(page.getByRole('link', { name: 'Information' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register Club' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Recommended Clubs' })).toBeVisible({ timeout: 10000 }); 
    await expect(page.getByRole('link', { name: 'Clubs', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Search' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login/Sign Up' })).not.toBeVisible(); 
  });
});
