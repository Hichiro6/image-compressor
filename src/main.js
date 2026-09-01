/**
 * main.js — Image Compressor
 * Compress JPEG, PNG, WebP using canvas
 */

import { initI18n, t } from './i18n.js';

// Maximum canvas area (Mobile Safari ~16.7MP limit)
const MAX_CANVAS_PIXELS = 16777216;

// State
let uploadedFiles = [];
let compressedImages = [];

// Elements
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const workspace = document.getElementById('workspace');
const imagesGrid = document.getElementById('images-grid');
const formatSelect = document.getElementById('format-select');
const qualitySlider = document.getElementById('quality-slider');
const qualityValue = document.getElementById('quality-value');
const resizeToggle = document.getElementById('resize-toggle');
const resizeFields = document.getElementById('resize-fields');
const maxWidthInput = document.getElementById('max-width');
const maxHeightInput = document.getElementById('max-height');
const btnAddMore = document.getElementById('btn-add-more');
const btnReset = document.getElementById('btn-reset');
const btnCompress = document.getElementById('btn-compress');
const btnDownload = document.getElementById('btn-download');
const btnDownloadAll = document.getElementById('btn-download-all');
const progressBar = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const progressPercent = document.getElementById('progress-percent');
const resultInfo = document.getElementById('result-info');
const resultDetails = document.getElementById('result-details');
const fileCount = document.getElementById('file-count');
const srLive = document.getElementById('sr-live');

// Initialize
async function init() {
  await initI18n();
  setupEventListeners();
}

function setupEventListeners() {
  dropzone.addEventListener('click', () => fileInput.click());
  // Native <button> handles Enter/Space activation; keep drag handlers

  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);

  fileInput.addEventListener('change', handleFileSelect);
  btnAddMore.addEventListener('click', () => fileInput.click());

  qualitySlider.addEventListener('input', updateQualityDisplay);
  resizeToggle.addEventListener('change', toggleResizeFields);

  btnCompress.addEventListener('click', compressImages);
  btnDownload.addEventListener('click', downloadCurrentImage);
  btnDownloadAll.addEventListener('click', downloadAllImages);
  btnReset.addEventListener('click', resetWorkspace);
}

function handleDragOver(e) {
  e.preventDefault();
  dropzone.classList.add('dropzone--active');
}

function handleDragLeave(e) {
  if (e.target === dropzone) {
    dropzone.classList.remove('dropzone--active');
  }
}

function handleDrop(e) {
  e.preventDefault();
  dropzone.classList.remove('dropzone--active');

  const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith('image/'));
  processFiles(files);
}

function handleFileSelect(e) {
  const files = Array.from(e.target.files).filter((file) => file.type.startsWith('image/'));
  processFiles(files);
  fileInput.value = '';
}

function processFiles(files) {
  if (files.length === 0) return;

  if (uploadedFiles.length === 0) {
    workspace.hidden = false;
  }

  uploadedFiles.push(
    ...files.map((file) => ({
      file,
      previewUrl: null,
      width: 0,
      height: 0,
      compressedBlob: null,
      compressedUrl: null,
    })),
  );

  renderThumbnails();
  announce(t('progress.loaded', { count: files.length }));
}

async function renderThumbnails() {
  // Revoke any previous preview URLs before clearing
  for (const item of uploadedFiles) {
    if (item.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }
  }

  imagesGrid.innerHTML = '';

  for (let i = 0; i < uploadedFiles.length; i++) {
    const item = uploadedFiles[i];

    try {
      const bitmap = await createImageBitmap(item.file);
      item.width = bitmap.width;
      item.height = bitmap.height;
      bitmap.close();

      item.previewUrl = URL.createObjectURL(item.file);
    } catch (err) {
      console.error('Failed to load image:', err);
    }
  }

  uploadedFiles.forEach((item, index) => {
    const card = document.createElement('li');
    card.className = 'page-card';
    card.setAttribute('aria-label', `Image ${index + 1}: ${item.file.name}`);

    const img = document.createElement('img');
    img.src = item.previewUrl;
    img.alt = item.file.name;
    img.loading = 'lazy';
    img.decoding = 'async';

    const info = document.createElement('div');
    info.className = 'page-card__info';

    const name = document.createElement('p');
    name.className = 'page-card__filename';
    name.textContent = item.file.name;
    name.title = item.file.name;

    const size = document.createElement('p');
    size.className = 'page-card__size';
    size.textContent = formatBytes(item.file.size);

    card.appendChild(img);
    card.appendChild(info);
    info.appendChild(name);
    info.appendChild(size);

    imagesGrid.appendChild(card);
  });

  updateResultInfo();
}

function updateQualityDisplay() {
  qualityValue.textContent = `${qualitySlider.value}%`;
}

function toggleResizeFields() {
  resizeFields.hidden = !resizeToggle.checked;
}

async function compressImages() {
  if (uploadedFiles.length === 0) {
    announce(t('error.noFile'));
    return;
  }

  btnCompress.disabled = true;
  btnCompress.textContent = t('btn.compressing');
  progressBar.hidden = false;
  resultInfo.hidden = true;

  const format = formatSelect.value;
  const quality = parseInt(qualitySlider.value, 10) / 100;
  const doResize = resizeToggle.checked;
  const maxWidth = parseInt(maxWidthInput.value, 10) || 1920;
  const maxHeight = parseInt(maxHeightInput.value, 10) || 1080;

  // Revoke previous compressed URLs before rebuilding
  for (const item of uploadedFiles) {
    if (item.compressedUrl) {
      URL.revokeObjectURL(item.compressedUrl);
      item.compressedUrl = null;
    }
  }

  compressedImages = [];

  for (let i = 0; i < uploadedFiles.length; i++) {
    const item = uploadedFiles[i];

    try {
      const blob = await compressImage(
        item.file,
        format !== 'keep' ? format : null,
        quality,
        doResize ? { maxWidth, maxHeight } : null,
      );

      item.compressedBlob = blob;
      item.compressedUrl = URL.createObjectURL(blob);

      compressedImages.push({
        original: item.file,
        compressed: blob,
        url: item.compressedUrl,
        savings: ((1 - blob.size / item.file.size) * 100).toFixed(1),
        sourceIndex: i,
      });
    } catch (err) {
      console.error(`Failed to compress ${item.file.name}:`, err);
      announce(t('error.failed', { msg: err.message }));
    }

    const percent = Math.round(((i + 1) / uploadedFiles.length) * 100);
    progressFill.style.width = `${percent}%`;
    progressText.textContent = t('progress.processing', {
      current: i + 1,
      total: uploadedFiles.length,
    });
    progressPercent.textContent = `${percent}%`;
  }

  progressBar.hidden = true;
  btnCompress.textContent = t('btn.compress');
  btnCompress.disabled = false;
  progressFill.style.width = '0%';

  if (compressedImages.length > 0) {
    resultInfo.hidden = false;
    updateResultInfo();

    if (compressedImages.length === 1) {
      btnDownload.hidden = false;
      btnDownloadAll.hidden = true;
    } else {
      btnDownload.hidden = true;
      btnDownloadAll.hidden = false;
    }

    announce(t('progress.completed'));
  }
}

/**
 * Read EXIF orientation from JPEG and return the orientation value (1–8), or 1 if none/not JPEG.
 */
async function getExifOrientation(file) {
  if (!file.type.includes('jpeg') && !file.type.includes('jpg')) {
    return 1;
  }

  try {
    const buf = await file.arrayBuffer();
    const bytes = new Uint8Array(buf);

    // Check for EXIF marker
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return 1;

    let pos = 2;
    while (pos < bytes.length) {
      if (bytes[pos] !== 0xff) break;
      const marker = bytes[pos + 1];
      const size = (bytes[pos + 2] << 8) | bytes[pos + 3];

      // APP1 marker = EXIF
      if (marker === 0xe1) {
        const exifStart = pos + 4;
        // Check for "Exif" string
        if (
          bytes[exifStart] === 0x45 &&
          bytes[exifStart + 1] === 0x78 &&
          bytes[exifStart + 2] === 0x69 &&
          bytes[exifStart + 3] === 0x66
        ) {
          const tiffStart = exifStart + 6;
          const bigEndian = bytes[tiffStart] === 0x4d && bytes[tiffStart + 1] === 0x4d;
          const littleEndian = bytes[tiffStart] === 0x49 && bytes[tiffStart + 1] === 0x49;
          if (!bigEndian && !littleEndian) return 1;

          const read16 = (offset) =>
            bigEndian
              ? (bytes[tiffStart + offset] << 8) | bytes[tiffStart + offset + 1]
              : bytes[tiffStart + offset] | (bytes[tiffStart + offset + 1] << 8);

          const ifdOffset = read16(4) === 0x002a ? 4 : -1;
          if (ifdOffset === -1) return 1;

          const numEntries = read16(ifdOffset + 2);

          for (let j = 0; j < numEntries; j++) {
            const entryOffset = ifdOffset + 4 + j * 12;
            const tag = read16(entryOffset);
            if (tag === 0x0112) {
              // Orientation tag
              const value = read16(entryOffset + 8);
              return value >= 1 && value <= 8 ? value : 1;
            }
          }
        }
        return 1;
      }

      // Skip to next marker
      pos += 2 + size;
    }
  } catch (_err) {
    // Ignore errors, default to orientation 1
  }

  return 1;
}

/**
 * Apply EXIF orientation to canvas context transforms.
 * Based on https://stackoverflow.com/a/31294623 with simplified logic.
 */
function applyOrientation(ctx, orientation, width, height) {
  switch (orientation) {
    case 2:
      ctx.transform(-1, 0, 0, 1, width, 0);
      break;
    case 3:
      ctx.transform(-1, 0, 0, -1, width, height);
      break;
    case 4:
      ctx.transform(1, 0, 0, -1, 0, height);
      break;
    case 5:
      ctx.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      ctx.transform(0, 1, -1, 0, height, 0);
      break;
    case 7:
      ctx.transform(0, -1, -1, 0, height, width);
      break;
    case 8:
      ctx.transform(0, -1, 1, 0, 0, width);
      break;
    default:
      // orientation 1 = no transform
      break;
  }
}

async function compressImage(file, targetFormat, quality, resizeOptions) {
  // Get EXIF orientation for JPEGs
  const orientation = await getExifOrientation(file);

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objUrl = URL.createObjectURL(file);

    img.onload = async () => {
      // Determine actual dimensions after EXIF orientation
      const isRotated = orientation >= 5 && orientation <= 8;
      const naturalW = img.width;
      const naturalH = img.height;

      // For orientations 5-8, swap dimensions for resize calculations
      const effectiveW = isRotated ? naturalH : naturalW;
      const effectiveH = isRotated ? naturalW : naturalH;

      let width = effectiveW;
      let height = effectiveH;

      if (resizeOptions) {
        const ratio = Math.min(
          resizeOptions.maxWidth / effectiveW,
          resizeOptions.maxHeight / effectiveH,
          1,
        );
        width = Math.floor(effectiveW * ratio);
        height = Math.floor(effectiveH * ratio);
      }

      // Guard against canvas size limits (mobile Safari ~16.7MP)
      if (width * height > MAX_CANVAS_PIXELS) {
        const scale = Math.sqrt(MAX_CANVAS_PIXELS / (width * height));
        width = Math.floor(width * scale);
        height = Math.floor(height * scale);
      }

      const canvas = document.createElement('canvas');

      // For rotated orientations, swap canvas dimensions
      if (isRotated) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      const ctx = canvas.getContext('2d');

      // Apply EXIF orientation transform
      if (orientation > 1) {
        applyOrientation(ctx, orientation, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0, naturalW, naturalH, 0, 0, width, height);

      // Clean up
      URL.revokeObjectURL(objUrl);

      // Determine MIME type
      const mime = targetFormat ? `image/${targetFormat}` : file.type;
      const safeMime = mime === 'image/jpg' ? 'image/jpeg' : mime;

      try {
        const blob = await new Promise((res, rej) => {
          canvas.toBlob(
            (b) => {
              if (b) res(b);
              else rej(new Error('Compression failed: toBlob returned null'));
            },
            safeMime,
            quality,
          );
        });
        resolve(blob);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objUrl);
      reject(new Error('Failed to load image'));
    };
    img.src = objUrl;
  });
}

function updateResultInfo() {
  if (compressedImages.length === 0) {
    resultInfo.hidden = true;
    fileCount.textContent =
      uploadedFiles.length > 0
        ? `${uploadedFiles.length} ${uploadedFiles.length === 1 ? 'image' : 'images'}`
        : '';
    return;
  }

  const totalOriginal = compressedImages.reduce((sum, item) => sum + item.original.size, 0);
  const totalCompressed = compressedImages.reduce((sum, item) => sum + item.compressed.size, 0);
  const savings = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);
  const savedBytes = totalOriginal - totalCompressed;

  const details = [];
  if (compressedImages.length === 1) {
    details.push(`${t('result.original')}: ${formatBytes(totalOriginal)}`);
    details.push(`${t('result.compressed')}: ${formatBytes(totalCompressed)}`);
    details.push(t('result.savings', { percent: savings, saved: formatBytes(savedBytes) }));
  }

  resultDetails.textContent = details.join(' • ');
  fileCount.textContent = `${compressedImages.length} ${compressedImages.length === 1 ? 'image' : 'images'} (${savings}% smaller)`;
}

function downloadCurrentImage() {
  if (compressedImages.length !== 1) return;

  const item = compressedImages[0];
  const a = document.createElement('a');
  const ext = item.compressed.type.split('/')[1] || 'jpg';
  const originalName = item.original.name.replace(/\.[^.]+$/, '');
  a.href = item.url;
  a.download = `${originalName}-compressed.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function downloadAllImages() {
  if (compressedImages.length === 0) return;

  compressedImages.forEach((item, index) => {
    setTimeout(() => {
      const a = document.createElement('a');
      const ext = item.compressed.type.split('/')[1] || 'jpg';
      const originalName = item.original.name.replace(/\.[^.]+$/, '');
      a.href = item.url;
      a.download = `${originalName}-compressed.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, index * 200);
  });
}

function resetWorkspace() {
  // Revoke all object URLs to prevent memory leaks
  for (const item of uploadedFiles) {
    if (item.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }
    if (item.compressedUrl) {
      URL.revokeObjectURL(item.compressedUrl);
    }
  }

  uploadedFiles = [];
  compressedImages = [];
  workspace.hidden = true;
  imagesGrid.innerHTML = '';
  btnDownload.hidden = true;
  btnDownloadAll.hidden = true;
  resultInfo.hidden = true;
  fileCount.textContent = '';
  qualitySlider.value = 80;
  updateQualityDisplay();
  fileInput.value = '';
  resizeToggle.checked = false;
  resizeFields.hidden = true;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

function announce(message) {
  srLive.textContent = message;
}

// Start
init();
