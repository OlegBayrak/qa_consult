import { test, expect } from '@playwright/test';

const BASE = '/qa_consult';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE);
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Oleh Bairak/);
  });

  test('hero section renders with name and headline', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await expect(hero.getByRole('heading', { name: 'Oleh Bairak' })).toBeVisible();
    await expect(hero.getByText('QA Tech Lead')).toBeVisible();
  });

  test('hero CTA buttons are present and visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /View My Work/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Check What I Can/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Contact Me/i })).toBeVisible();
  });

  test('navbar is visible on load', async ({ page }) => {
    await expect(page.locator('#navbar')).toBeVisible();
  });

  test('navbar contains main section links', async ({ page }) => {
    const nav = page.locator('#navbar');
    for (const label of ['About', 'Skills', 'Experience', 'Contact']) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible();
    }
  });

  test('about section is present', async ({ page }) => {
    await expect(page.locator('#about')).toBeVisible();
  });

  test('skills section is present', async ({ page }) => {
    await expect(page.locator('#skills')).toBeVisible();
  });

  test('experience section is present', async ({ page }) => {
    await expect(page.locator('#experience')).toBeVisible();
  });

  test('contact section is present', async ({ page }) => {
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('hero stats display years of experience', async ({ page }) => {
    await expect(page.getByText('12+', { exact: true })).toBeVisible();
    await expect(page.getByText('Years Experience')).toBeVisible();
  });

  test('"Check What I Can" button links to showcase page', async ({ page }) => {
    const link = page.getByRole('link', { name: /Check What I Can/i });
    await expect(link).toHaveAttribute('href', /showcase/);
  });
});
