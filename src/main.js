/**
 * main.js — Image Compressor
 * Compress JPEG, PNG, WebP using canvas
 */

import { initI18n, t } from './i18n.js';

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
  dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });

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
      preview: null,
      width: 0,
      height: 0,
      compressedBlob: null,
      compressedUrl: null,
    })),
  );

  renderThumbnails();
  announce(t('app.tagline'));
}

async function renderThumbnails() {
  imagesGrid.innerHTML = '';

  for (let i = 0; i < uploadedFiles.length; i++) {
    const item = uploadedFiles[i];

    try {
      const bitmap = await createImageBitmap(item.file);
      item.width = bitmap.width;
      item.height = bitmap.height;

      const reader = new FileReader();
      item.preview = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(item.file);
      });
    } catch (err) {
      console.error('Failed to load image:', err);
    }
  }

  uploadedFiles.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'page-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `Image ${index + 1}`);

    const img = document.createElement('img');
    img.src = item.preview;
    img.alt = item.file.name;
    img.loading = 'lazy';
    img.style.width = '100%';
    img.style.height = '200px';
    img.style.objectFit = 'cover';

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
  const quality = parseInt(qualitySlider.value) / 100;
  const doResize = resizeToggle.checked;
  const maxWidth = parseInt(maxWidthInput.value) || 1920;
  const maxHeight = parseInt(maxHeightInput.value) || 1080;

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

      if (item.compressedUrl) {
        URL.revokeObjectURL(item.compressedUrl);
      }
      item.compressedUrl = URL.createObjectURL(blob);

      compressedImages.push({
        original: item.file,
        compressed: blob,
        url: item.compressedUrl,
        savings: ((1 - blob.size / item.file.size) * 100).toFixed(1),
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

async function compressImage(file, targetFormat, quality, resizeOptions) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (resizeOptions) {
        const ratio = Math.min(resizeOptions.maxWidth / width, resizeOptions.maxHeight / height, 1);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const mime = targetFormat ? `image/${targetFormat}` : file.type;
      const blob = await canvas.toBlob(resolve, mime, quality);

      if (!blob) {
        reject(new Error('Compression failed'));
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
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

  const totalOriginal = uploadedFiles.reduce((sum, item) => sum + item.file.size, 0);
  const totalCompressed = compressedImages.reduce((sum, item) => sum + item.compressed.size, 0);
  const savings = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);
  const savedBytes = totalOriginal - totalCompressed;

  const details = [];
  if (uploadedFiles.length === 1) {
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
  const originalName = uploadedFiles[0].file.name.replace(/\.[^.]+$/, '');
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
      const originalName = uploadedFiles[index].file.name.replace(/\.[^.]+$/, '');
      a.href = item.url;
      a.download = `${originalName}-compressed.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, index * 200);
  });
}

function resetWorkspace() {
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
