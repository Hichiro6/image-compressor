/**
 * Test utilities for Image Compressor E2E tests
 * Fournit des helpers communs pour uploader des fichiers de test
 * et attendre que la compression soit terminée.
 */
import path from 'node:path';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

/**
 * Upload a test image and wait for it to be rendered.
 * @param {import('@playwright/test').Page} page
 * @param {string} filename - fixture filename (default: test-image.png)
 * @returns {Promise<{filename: string}>}
 */
export async function uploadTestFile(page, filename = 'test-image.png') {
  await page.goto('/');

  // Wait for dropzone to be visible (initial state)
  await page.waitForSelector('#dropzone', { timeout: 10000 });

  const filePath = path.join(fixturesDir, filename);
  await page.setInputFiles('input[type="file"]', filePath);

  // Wait for workspace to appear
  await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });

  // Wait for thumbnail to render
  await page.waitForSelector('.page-card', { timeout: 10000 });

  return {
    filename: path.basename(filename),
  };
}

/**
 * Wait for compression to complete (result-info becomes visible).
 * @param {import('@playwright/test').Page} page
 * @param {number} timeout - timeout in ms (default: 30000)
 */
export async function waitForCompression(page, timeout = 30000) {
  await page.waitForSelector('#result-info:not([hidden])', { timeout });
}

/**
 * Get a fixture file path
 */
export function getFixturePath(filename) {
  return path.join(fixturesDir, filename);
}

/**
 * Click compress button and wait for completion
 * @param {import('@playwright/test').Page} page
 */
export async function clickCompressAndWait(page) {
  await page.click('#btn-compress');
  await waitForCompression(page);
}

/**
 * Format bytes for assertion
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}
