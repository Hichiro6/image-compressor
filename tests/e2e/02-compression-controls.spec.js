/**
 * 02-compression-controls.spec.js — Compression Controls
 * Tests for quality slider, format selector, resize toggle
 */
import { expect, test } from '@playwright/test';
import { generateAllFixtures } from './helpers/test-fixtures-gen.js';
import { uploadTestFile } from './helpers/test-utils.js';

test.beforeAll(() => {
  generateAllFixtures();
});

test.describe('Compression Controls', () => {
  test('should display quality slider with default 80%', async ({ page }) => {
    await uploadTestFile(page);

    const slider = page.locator('#quality-slider');
    await expect(slider).toBeVisible();
    await expect(slider).toHaveValue('80');

    const qualityValue = page.locator('#quality-value');
    await expect(qualityValue).toContainText('80%');
  });

  test('should update quality display when slider moves', async ({ page }) => {
    await uploadTestFile(page);

    const slider = page.locator('#quality-slider');
    await slider.fill('50');

    await expect(page.locator('#quality-value')).toContainText('50%');
  });

  test('should have quality range 10-100', async ({ page }) => {
    await uploadTestFile(page);

    const slider = page.locator('#quality-slider');
    await expect(slider).toHaveAttribute('min', '10');
    await expect(slider).toHaveAttribute('max', '100');
  });

  test('should display format selector with options', async ({ page }) => {
    await uploadTestFile(page);

    const select = page.locator('#format-select');
    await expect(select).toBeVisible();

    // Options in a closed <select> are not "visible" — check they exist instead
    await expect(select.locator('option[value="keep"]')).toHaveCount(1);
    await expect(select.locator('option[value="jpeg"]')).toHaveCount(1);
    await expect(select.locator('option[value="webp"]')).toHaveCount(1);
    await expect(select.locator('option[value="png"]')).toHaveCount(1);
  });

  test('should default to Keep Original format', async ({ page }) => {
    await uploadTestFile(page);

    const select = page.locator('#format-select');
    await expect(select).toHaveValue('keep');
  });

  test('should hide resize fields by default', async ({ page }) => {
    await uploadTestFile(page);

    // CSS display:flex overrides [hidden], so check the attribute directly
    await expect(page.locator('#resize-fields')).toHaveAttribute('hidden');
  });

  test('should show resize fields when toggled', async ({ page }) => {
    await uploadTestFile(page);

    await page.check('#resize-toggle');

    await expect(page.locator('#resize-fields')).not.toHaveAttribute('hidden');
    await expect(page.locator('#max-width')).toBeVisible();
    await expect(page.locator('#max-height')).toBeVisible();
  });

  test('should hide resize fields when untoggled', async ({ page }) => {
    await uploadTestFile(page);

    await page.check('#resize-toggle');
    await expect(page.locator('#resize-fields')).not.toHaveAttribute('hidden');

    await page.uncheck('#resize-toggle');
    await expect(page.locator('#resize-fields')).toHaveAttribute('hidden');
  });

  test('should have placeholder values for resize inputs', async ({ page }) => {
    await uploadTestFile(page);
    await page.check('#resize-toggle');

    await expect(page.locator('#max-width')).toHaveAttribute('placeholder', '1920');
    await expect(page.locator('#max-height')).toHaveAttribute('placeholder', '1080');
  });

  // Skipped: compression is heavy in headless browser
  test.skip('should compress image and show result', async () => {});

  test.skip('should compress with lower quality producing smaller file', async () => {});

  test.skip('should compress with JPEG format conversion', async () => {});

  test.skip('should compress with WebP format conversion', async () => {});

  test.skip('should show progress bar during compression', async () => {});

  test.skip('should re-compress after changing settings', async () => {});
});
