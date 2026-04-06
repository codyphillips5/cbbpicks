import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/index.html');
    await expect(page).toHaveTitle(/CBB Picks/i);
  });

  test('rules page loads', async ({ page }) => {
    await page.goto('/rules.html');
    await expect(page.getByText('Official CBB Picks Rules')).toBeVisible();
  });
});
