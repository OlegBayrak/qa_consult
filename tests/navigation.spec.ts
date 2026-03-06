import { test, expect } from '@playwright/test';

const BASE = '/qa_consult';

test.describe('Navigation', () => {
  test('navigate from home to showcase via CTA button', async ({ page }) => {
    await page.goto(BASE);
    await page.getByRole('link', { name: /Check What I Can/i }).click();
    await expect(page).toHaveURL(/showcase/);
  });

  test('navigate from showcase back to home', async ({ page }) => {
    await page.goto(`${BASE}/showcase`);
    const homeLink = page.getByRole('link', { name: /back|home/i }).first();
    await homeLink.click();
    await expect(page).toHaveURL(new RegExp(`${BASE}/?$`));
  });

  test('mobile menu toggle shows and hides nav links', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);

    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeHidden();

    await page.locator('#mobile-toggle').click();
    await expect(mobileMenu).toBeVisible();

    await page.locator('#mobile-toggle').click();
    await expect(mobileMenu).toBeHidden();
  });
});
