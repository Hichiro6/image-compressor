/**
 * E2E Tests — Upload & Preview
 *
 * Covers:
 * - Upload single image
 * - Multiple images upload
 * - Image preview grid
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import { generateAllFixtures } from './helpers/test-fixtures-gen.js';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

test.beforeAll(() => {
  generateAllFixtures();
});

test.describe('Upload & Preview', () => {
  test('should show dropzone on initial load', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#dropzone')).toBeVisible();
    await expect(page.locator('#workspace')).toHaveAttribute('hidden');
  });

  test('should display uploaded image in workspace', async ({ page }) => {
    await page.goto('/');
    await page.setInputFiles('#file-input', path.join(fixturesDir, 'test-image.png'));
    
    await expect(page.locator('#workspace')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#images-grid img')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#file-count')).not.toHaveText('-');
  });

  test('should show add more and reset buttons', async ({ page }) => {
    await page.goto('/');
    await page.setInputFiles('#file-input', path.join(fixturesDir, 'test-image.png'));
    
    await expect(page.locator('#btn-add-more')).toBeVisible();
    await expect(page.locator('#btn-reset')).toBeVisible();
  });
});
