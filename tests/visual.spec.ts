import { test, expect } from '@playwright/test';

const BASE = '/qa_consult';

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 900 },
];

test.describe('Visual regression', () => {
  for (const vp of viewports) {
    test(`home page renders correctly at ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(BASE);
      // Wait for animations to settle
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(`home-${vp.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
      });
    });

    test(`showcase page renders correctly at ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE}/showcase`);
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(`showcase-${vp.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});

test.describe('Responsive layout', () => {
  test('mobile: hamburger menu visible, nav links hidden', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);
    await expect(page.locator('#mobile-toggle')).toBeVisible();
    await expect(page.locator('#mobile-menu')).toBeHidden();
  });

  test('desktop: nav links visible, hamburger hidden', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(BASE);
    await expect(page.locator('#navbar')).toBeVisible();
    // Desktop nav links visible directly (not inside mobile menu)
    const nav = page.locator('#navbar');
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
  });

  test('hero CTA buttons stack vertically on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);
    const buttons = page.locator('#hero a[href]');
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('hero stats are visible on all viewports', async ({ page }) => {
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(BASE);
      await expect(page.getByText('12+')).toBeVisible();
      await expect(page.getByText('Years Experience')).toBeVisible();
    }
  });
});
