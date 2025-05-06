import { test } from '@playwright/test';

test('Add Club form works correctly after login', async ({ page }) => {
  // 1. Go to the login page
  await page.goto('http://localhost:3000/auth/signin');

  // 2. Fill in email and password
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'yourpassword');

  // 3. Click the login button
  await page.click('button[type="submit"]');

  // 4. Make sure login succeeded (e.g., redirected to /home)
  await expect(page).toHaveURL(/\/home/);

  // 5. Go to the Add Club form
  await page.goto('http://localhost:3000/add');

  // 6. Wait for the submit button to show up
  const submit = page.locator('button[type="submit"]');
  await submit.waitFor({ state: 'visible' });

  // 7. Optionally click submit with empty fields to trigger validation
  await submit.click();
  

  // 8. Fill in the form
  await page.fill('input[name="name"]', 'Test Club');
  await page.fill('textarea[name="description"]', 'This is a test club.');
  await page.fill('input[name="type"]', 'Academic');
  await page.fill('input[name="contact_person"]', 'Rei Fukuzawa');
  await page.fill('input[name="email"]', 'test@example.com');

  // 9. Submit the form
  await submit.click();
<<<<<<< Updated upstream
});

test.skip('Recommended Clubs link shows for logged-in users', async () => {
  // wait for role/feature stabilization
=======

  // 10. Confirm success message is visible
  await expect(page.locator('text=Club added successfully!')).toBeVisible();
>>>>>>> Stashed changes
});
