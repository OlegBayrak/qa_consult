import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE = '/qa_consult';

test.describe('Accessibility', () => {
  test('home page has no critical axe violations', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForTimeout(700); // wait for CSS animations to complete
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('showcase page has no critical axe violations', async ({ page }) => {
    await page.goto(`${BASE}/showcase`);
    await page.waitForTimeout(700); // wait for CSS animations to complete
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('home page images have alt text', async ({ page }) => {
    await page.goto(BASE);
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt, `img[${i}] missing alt`).not.toBeNull();
    }
  });

  test('home page has exactly one h1', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('showcase page has exactly one h1', async ({ page }) => {
    await page.goto(`${BASE}/showcase`);
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('interactive elements are keyboard-focusable on home page', async ({ page }) => {
    await page.goto(BASE);
    // Tab to first focusable element and check it's visible
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });
});
