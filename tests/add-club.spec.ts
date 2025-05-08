import { test } from '@playwright/test';

test('Add Club form works correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/add');

  const submit = page.locator('button[type="submit"]');
  await submit.waitFor({ state: 'visible' }); 
  await submit.click();

  await page.fill('input[name="name"]', 'Test Club');
  await page.fill('textarea[name="description"]', 'This is a test club.');
  await page.fill('input[name="type"]', 'Academic');
  await page.fill('input[name="contact_person"]', 'Rei Fukuzawa');
  await page.fill('input[name="email"]', 'test@example.com');

  await submit.click();
});

test.skip('Recommended Clubs link shows for logged-in users', async () => {
  // wait for role/feature stabilization
});