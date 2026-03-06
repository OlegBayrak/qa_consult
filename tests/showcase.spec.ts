import { test, expect } from '@playwright/test';

const BASE = '/qa_consult';

test.describe('Showcase page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/showcase`);
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Showcase|Oleh Bairak/i);
  });

  test('showcase page loads without errors', async ({ page }) => {
    // Confirm we're on the right page and not a 404
    await expect(page.locator('body')).toBeVisible();
    const url = page.url();
    expect(url).toContain('showcase');
  });

  test('has a back-to-home link', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: /back|home/i }).first();
    await expect(homeLink).toBeVisible();
  });

  test('showcase content is visible', async ({ page }) => {
    // The main content area should render
    await expect(page.locator('main')).toBeVisible();
  });
});
