import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/auth/loginPage'); 
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'your-password'); 
  await page.click('text=Login');

  await page.waitForURL('**/home');
  await context.storageState({ path: 'storage/logged-in.json' });

  await browser.close();
})();
