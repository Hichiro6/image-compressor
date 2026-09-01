/**
 * E2E Tests — i18n & Accessibility
 *
 * Covers:
 * - Language persistence via localStorage
 * - UI translation to FR
 * - ARIA attributes on interactive elements
 * - Keyboard navigation
 * - Screen reader live region
 */
import { expect, test } from '@playwright/test';

const STORAGE_KEY = 'image-compressor-lang';

test.describe('i18n', () => {
  test('should persist language choice in localStorage', async ({ page }) => {
    await page.goto('/');
    await page.evaluate((key) => {
      localStorage.setItem(key, 'fr');
    }, STORAGE_KEY);
    await page.reload();

    const storedLang = await page.evaluate((key) => {
      return localStorage.getItem(key);
    }, STORAGE_KEY);
    expect(storedLang).toBe('fr');
  });

  test('should have lang-selector div in header', async ({ page }) => {
    await page.goto('/');
    // The div exists in HTML, i18n.js populates it dynamically
    const langSelector = page.locator('#lang-selector');
    await expect(langSelector).toBeAttached();
  });

  test('should translate UI when language is set to fr', async ({ page }) => {
    await page.goto('/');
    await page.evaluate((key) => {
      localStorage.setItem(key, 'fr');
    }, STORAGE_KEY);
    await page.reload();

    // Wait for i18n to apply translations
    const tagline = page.locator('[data-i18n="app.tagline"]');
    await expect(tagline).not.toHaveText('Compress JPEG, PNG, WebP images — 100% in your browser');
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('dropzone should have ARIA role and label', async ({ page }) => {
    const dropzone = page.locator('#dropzone');
    await expect(dropzone).toHaveAttribute('role', 'button');
    await expect(dropzone).toHaveAttribute('tabindex', '0');
    await expect(dropzone).toHaveAttribute('aria-label');
  });

  test('file input should be hidden but present', async ({ page }) => {
    const fileInput = page.locator('#file-input');
    await expect(fileInput).toHaveAttribute('hidden');
    await expect(fileInput).toHaveAttribute('accept', 'image/jpeg,image/png,image/webp');
  });

  test('should have screen reader live region', async ({ page }) => {
    const srLive = page.locator('#sr-live');
    await expect(srLive).toHaveAttribute('role', 'status');
    await expect(srLive).toHaveAttribute('aria-live', 'polite');
  });

  test('privacy badge should be keyboard accessible', async ({ page }) => {
    const badge = page.locator('.badge--privacy');
    await expect(badge).toHaveAttribute('tabindex', '0');
  });

  test('workspace should be hidden initially', async ({ page }) => {
    const workspace = page.locator('#workspace');
    await expect(workspace).toHaveAttribute('hidden');
  });
});
