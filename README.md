# Image Compressor

> Compress JPEG, PNG, and WebP images in your browser — 100% client-side, privacy-first

<div align="center">

![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-red)
![Platform](https://img.shields.io/badge/Platform-Web-green)
![Tests](https://img.shields.io/badge/Tests-Playwright%20%7C%20Vitest-blue)

**Your images never leave your browser — no uploads, no servers, no tracking**

</div>

---

## 🔒 Privacy-First Design

Need to shrink image files for email attachments, website uploads, or storage?

Image Compressor reduces file size **locally in your browser** using the Canvas API. Your images stay on your device — nothing is uploaded to any server.

---

## ⚡ Key Features

- **🔒 100% Local Processing** — All operations happen in your browser via canvas re-encoding
- **🖼️ Multiple Formats** — Support for JPEG, PNG, and WebP
- **⚙️ Quality Control** — Adjustable quality slider for lossy compression
- **📐 Resize Options** — Set maximum width and/or height to scale images down
- **📤 Batch Processing** — Compress multiple images at once
- **📥 Individual & Bulk Download** — Download compressed images one by one or all at once
- **🔄 Format Conversion** — Convert between formats (e.g., PNG → JPEG)
- **📊 File Size Comparison** — See original vs. compressed sizes
- **♿ Accessible** — Full keyboard navigation and screen reader support (ARIA-compliant)
- **🌐 Multi-Language** — Supports EN, FR, DE, ES, PT, NL, IT

---

## 🚀 Quick Start

```bash
git clone https://github.com/Hichiro6/image-compressor.git
cd image-compressor

npm install
npm run dev
```

---

## 📖 Usage Guide

### Step 1: Upload Your Images
Drag and drop image files (JPEG, PNG, WebP) onto the dropzone, or click to browse.

### Step 2: Configure Compression Settings
- **Quality level**: Use the slider to balance quality vs. file size
- **Resize dimensions**: Set maximum width/height to scale images down
- **Output format**: Choose JPEG, PNG, or WebP

### Step 3: Compress & Download
Click **Compress** to process your images.
See before/after file size comparisons.
Download individual compressed images or all at once.

---

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| **[Vite](https://vitejs.dev/)** | Build tool & dev server |
| **Canvas API** | Image compression & resizing |
| **[Biome](https://biomejs.dev/)** | Linting & formatting |
| **[Vitest](https://vitest.dev/)** | Unit testing |
| **[Playwright](https://playwright.dev/)** | E2E testing |

---

## 🧪 Testing

```bash
npm run test:run       # Unit tests
npm run test:e2e       # E2E suite (upload, controls, compression, download)
npm run test:ui        # Interactive mode
```

---

## 📂 Project Structure

```
image-compressor/
├── src/
│   ├── main.js           # Application logic
│   └── i18n.js           # Internationalization
├── styles/
│   └── main.css          # Global styles
├── public/
│   ├── manifest.json     # PWA manifest
│   └── favicon.svg
├── tests/
│   ├── unit/             # Unit tests
│   └── e2e/              # Playwright E2E tests + fixtures
├── vite.config.js        # Vite configuration
├── playwright.config.js  # Playwright configuration
└── biome.json            # Biome linting rules
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code with Biome |
| `npm run format` | Format code with Biome |
| `npm run test:run` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |

---

## 📝 Use Cases

- **Website optimization** — Reduce image sizes for faster page loads
- **Email attachments** — Shrink photos to meet size limits
- **Storage savings** — Compress photo libraries without losing too much quality
- **Social media** — Optimize images for platform requirements
- **Printing** — Downscale high-res photos while maintaining print quality

---

## 🔐 Security & Privacy

- ✅ **No network calls** — All processing is local
- ✅ **No analytics** — No tracking or telemetry
- ✅ **No cookies** — Nothing stored externally
- ✅ **Open source** — Code is auditable
- ✅ **Client-side only** — No backend requirements

---

## 📄 License

Copyright © 2026 Hichiro6

Licensed under **CC BY-NC-ND 4.0** — Non-commercial use with attribution, no derivative works.

See [LICENSE](LICENSE) for details.

---

<div align="center">

**Made with ❤️ for privacy-conscious users**

[Report Bug](https://github.com/Hichiro6/image-compressor/issues) · [Request Feature](https://github.com/Hichiro6/image-compressor/issues)

</div>
