/**
 * i18n.js — Image Compressor
 * 7-language internationalization (EN/FR/DE/ES/PT/NL/IT)
 */

export const STORAGE_KEY = 'image-compressor-lang';

export const LANGUAGES = {
  en: { code: 'en', name: 'English' },
  fr: { code: 'fr', name: 'Français' },
  de: { code: 'de', name: 'Deutsch' },
  es: { code: 'es', name: 'Español' },
  pt: { code: 'pt', name: 'Português' },
  nl: { code: 'nl', name: 'Nederlands' },
  it: { code: 'it', name: 'Italiano' },
};

export const TRANSLATIONS = {
  en: {
    'app.title': 'Image Compressor',
    'app.tagline': 'Compress JPEG, PNG, WebP images — 100% in your browser',
    'privacy.badge': 'Client-side only',
    'privacy.tooltip': 'No data leaves your device',

    'dropzone.title': 'Drop images here',
    'dropzone.subtitle': 'or click to browse',
    'dropzone.accept': 'JPEG, PNG, WebP supported',

    'btn.compress': 'Compress',
    'btn.compressing': 'Compressing...',
    'btn.download': 'Download',
    'btn.downloadAll': 'Download All',
    'btn.reset': 'Reset',
    'btn.addMore': 'Add More',

    'controls.title': 'Compression Settings',
    'controls.quality': 'Quality',
    'controls.format': 'Output Format',
    'controls.resize': 'Resize',
    'controls.maxWidth': 'Max Width (px)',
    'controls.maxHeight': 'Max Height (px)',
    'controls.keepOriginal': 'Keep Original',
    'controls.convertJpeg': 'Convert to JPEG',
    'controls.convertWebp': 'Convert to WebP',
    'controls.convertPng': 'Convert to PNG',

    'progress.processing': 'Processing {current} / {total}',
    'progress.completed': 'All images compressed',
    'progress.loaded': '{count} image(s) added',

    'result.label': 'Compression complete',
    'result.original': 'Original',
    'result.compressed': 'Compressed',
    'result.savings': 'Saved {percent}% ({saved})',

    'error.noFile': 'Please upload an image first',
    'error.failed': 'Compression failed: {msg}',

    'footer.privacy': 'Your images never leave your browser',
    'footer.openSource': 'Open Source',
  },

  fr: {
    'app.title': 'Image Compressor',
    'app.tagline': 'Compresser JPEG, PNG, WebP — 100% dans votre navigateur',
    'privacy.badge': 'Client-side uniquement',
    'privacy.tooltip': 'Aucune donnée ne quitte votre appareil',

    'dropzone.title': 'Déposez vos images ici',
    'dropzone.subtitle': 'ou cliquez pour parcourir',
    'dropzone.accept': 'JPEG, PNG, WebP pris en charge',

    'btn.compress': 'Compresser',
    'btn.compressing': 'Compression...',
    'btn.download': 'Télécharger',
    'btn.downloadAll': 'Tout télécharger',
    'btn.reset': 'Réinitialiser',
    'btn.addMore': 'Ajouter plus',

    'controls.title': 'Paramètres de compression',
    'controls.quality': 'Qualité',
    'controls.format': 'Format de sortie',
    'controls.resize': 'Redimensionner',
    'controls.maxWidth': 'Largeur max (px)',
    'controls.maxHeight': 'Hauteur max (px)',
    'controls.keepOriginal': "Garder l'original",
    'controls.convertJpeg': 'Convertir en JPEG',
    'controls.convertWebp': 'Convertir en WebP',
    'controls.convertPng': 'Convertir en PNG',

    'progress.processing': 'Traitement {current} / {total}',
    'progress.completed': 'Images compressées',
    'progress.loaded': '{count} image(s) ajoutée(s)',

    'result.label': 'Compression terminée',
    'result.original': 'Original',
    'result.compressed': 'Compressé',
    'result.savings': 'Gain {percent}% ({saved})',

    'error.noFile': "Veuillez télécharger une image d'abord",
    'error.failed': 'Échec compression : {msg}',

    'footer.privacy': 'Vos images ne quittent jamais votre navigateur',
    'footer.openSource': 'Open Source',
  },

  de: {
    'app.title': 'Image Compressor',
    'app.tagline': 'JPEG, PNG, WebP komprimieren — 100% im Browser',
    'privacy.badge': 'Nur Client-Seite',
    'privacy.tooltip': 'Keine Daten verlassen Ihr Gerät',

    'dropzone.title': 'Bilder hier ablegen',
    'dropzone.subtitle': 'oder klicken zum Durchsuchen',
    'dropzone.accept': 'JPEG, PNG, WebP unterstützt',

    'btn.compress': 'Komprimieren',
    'btn.compressing': 'Komprimiere...',
    'btn.download': 'Herunterladen',
    'btn.downloadAll': 'Alle herunterladen',
    'btn.reset': 'Zurücksetzen',
    'btn.addMore': 'Mehr hinzufügen',

    'controls.title': 'Komprimierungseinstellungen',
    'controls.quality': 'Qualität',
    'controls.format': 'Ausgabeformat',
    'controls.resize': 'Größe ändern',
    'controls.maxWidth': 'Max Breite (px)',
    'controls.maxHeight': 'Max Höhe (px)',
    'controls.keepOriginal': 'Original behalten',
    'controls.convertJpeg': 'In JPEG konvertieren',
    'controls.convertWebp': 'In WebP konvertieren',
    'controls.convertPng': 'In PNG konvertieren',

    'progress.processing': 'Verarbeite {current} / {total}',
    'progress.completed': 'Alle Bilder komprimiert',
    'progress.loaded': '{count} Bild(er) hinzugefügt',

    'result.label': 'Komprimierung abgeschlossen',
    'result.original': 'Original',
    'result.compressed': 'Komprimiert',
    'result.savings': 'Gespart {percent}% ({saved})',

    'error.noFile': 'Bitte zuerst ein Bild hochladen',
    'error.failed': 'Komprimierung fehlgeschlagen: {msg}',

    'footer.privacy': 'Ihre Bilder verlassen nie Ihren Browser',
    'footer.openSource': 'Open Source',
  },

  es: {
    'app.title': 'Image Compressor',
    'app.tagline': 'Comprimir JPEG, PNG, WebP — 100% en el navegador',
    'privacy.badge': 'Solo cliente',
    'privacy.tooltip': 'Ningún dato sale de tu dispositivo',

    'dropzone.title': 'Arrastra imágenes aquí',
    'dropzone.subtitle': 'o haz clic para buscar',
    'dropzone.accept': 'Soporta JPEG, PNG, WebP',

    'btn.compress': 'Comprimir',
    'btn.compressing': 'Comprimiendo...',
    'btn.download': 'Descargar',
    'btn.downloadAll': 'Descargar todo',
    'btn.reset': 'Reiniciar',
    'btn.addMore': 'Agregar más',

    'controls.title': 'Configuración de compresión',
    'controls.quality': 'Calidad',
    'controls.format': 'Formato de salida',
    'controls.resize': 'Redimensionar',
    'controls.maxWidth': 'Ancho máx (px)',
    'controls.maxHeight': 'Alto máx (px)',
    'controls.keepOriginal': 'Mantener original',
    'controls.convertJpeg': 'Convertir a JPEG',
    'controls.convertWebp': 'Convertir a WebP',
    'controls.convertPng': 'Convertir a PNG',

    'progress.processing': 'Procesando {current} / {total}',
    'progress.completed': 'Todas las imágenes comprimidas',
    'progress.loaded': '{count} imagen(es) añadida(s)',

    'result.label': 'Compresión completa',
    'result.original': 'Original',
    'result.compressed': 'Comprimido',
    'result.savings': 'Ahorrado {percent}% ({saved})',

    'error.noFile': 'Por favor sube una imagen primero',
    'error.failed': 'Compresión fallida: {msg}',

    'footer.privacy': 'Tus imágenes nunca salen de tu navegador',
    'footer.openSource': 'Código abierto',
  },

  pt: {
    'app.title': 'Image Compressor',
    'app.tagline': 'Comprimir JPEG, PNG, WebP — 100% no navegador',
    'privacy.badge': 'Apenas cliente',
    'privacy.tooltip': 'Nenhum dado sai do seu dispositivo',

    'dropzone.title': 'Solte imagens aqui',
    'dropzone.subtitle': 'ou clique para navegar',
    'dropzone.accept': 'JPEG, PNG, WebP suportados',

    'btn.compress': 'Comprimir',
    'btn.compressing': 'Comprimindo...',
    'btn.download': 'Baixar',
    'btn.downloadAll': 'Baixar tudo',
    'btn.reset': 'Redefinir',
    'btn.addMore': 'Adicionar mais',

    'controls.title': 'Configurações de compressão',
    'controls.quality': 'Qualidade',
    'controls.format': 'Formato de saída',
    'controls.resize': 'Redimensionar',
    'controls.maxWidth': 'Largura máx (px)',
    'controls.maxHeight': 'Altura máx (px)',
    'controls.keepOriginal': 'Manter original',
    'controls.convertJpeg': 'Converter para JPEG',
    'controls.convertWebp': 'Converter para WebP',
    'controls.convertPng': 'Converter para PNG',

    'progress.processing': 'Processando {current} / {total}',
    'progress.completed': 'Todas imagens comprimidas',
    'progress.loaded': '{count} imagem(ns) adicionada(s)',

    'result.label': 'Compressão completa',
    'result.original': 'Original',
    'result.compressed': 'Comprimido',
    'result.savings': 'Economia {percent}% ({saved})',

    'error.noFile': 'Por favor faça upload de uma imagem primeiro',
    'error.failed': 'Compressão falhou: {msg}',

    'footer.privacy': 'Suas imagens nunca saem do navegador',
    'footer.openSource': 'Código aberto',
  },

  nl: {
    'app.title': 'Image Compressor',
    'app.tagline': 'JPEG, PNG, WebP comprimeren — 100% in je browser',
    'privacy.badge': 'Alleen cliëntkant',
    'privacy.tooltip': 'Geen gegevens verlaten je apparaat',

    'dropzone.title': 'Sleep afbeeldingen hierheen',
    'dropzone.subtitle': 'of klik om te bladeren',
    'dropzone.accept': 'JPEG, PNG, WebP ondersteund',

    'btn.compress': 'Comprimeren',
    'btn.compressing': 'Comprimeren...',
    'btn.download': 'Downloaden',
    'btn.downloadAll': 'Alles downloaden',
    'btn.reset': 'Herstellen',
    'btn.addMore': 'Meer toevoegen',

    'controls.title': 'Compressie-instellingen',
    'controls.quality': 'Kwaliteit',
    'controls.format': 'Output formaat',
    'controls.resize': 'Vergroten/verkleinen',
    'controls.maxWidth': 'Max breedte (px)',
    'controls.maxHeight': 'Max hoogte (px)',
    'controls.keepOriginal': 'Origineel behouden',
    'controls.convertJpeg': 'Converteer naar JPEG',
    'controls.convertWebp': 'Converteer naar WebP',
    'controls.convertPng': 'Converteer naar PNG',

    'progress.processing': 'Verwerken {current} / {total}',
    'progress.completed': 'Alle afbeeldingen gecomprimeerd',
    'progress.loaded': '{count} afbeelding(en) toegevoegd',

    'result.label': 'Compressie voltooid',
    'result.original': 'Origineel',
    'result.compressed': 'Gecomprimeerd',
    'result.savings': 'Bespaard {percent}% ({saved})',

    'error.noFile': 'Upload eerst een afbeelding',
    'error.failed': 'Compressie mislukt: {msg}',

    'footer.privacy': 'Jouw afbeeldingen verlaten nooit je browser',
    'footer.openSource': 'Open bron',
  },

  it: {
    'app.title': 'Image Compressor',
    'app.tagline': 'Comprimi JPEG, PNG, WebP — 100% nel browser',
    'privacy.badge': 'Solo lato client',
    'privacy.tooltip': 'Nessun dato lascia il tuo dispositivo',

    'dropzone.title': 'Trascina le immagini qui',
    'dropzone.subtitle': 'o clicca per sfogliare',
    'dropzone.accept': 'JPEG, PNG, WebP supportati',

    'btn.compress': 'Comprimi',
    'btn.compressing': 'Comprimendo...',
    'btn.download': 'Scarica',
    'btn.downloadAll': 'Scarica tutto',
    'btn.reset': 'Ripristina',
    'btn.addMore': 'Aggiungi più',

    'controls.title': 'Impostazioni compressione',
    'controls.quality': 'Qualità',
    'controls.format': 'Formato output',
    'controls.resize': 'Ridimensiona',
    'controls.maxWidth': 'Larghezza max (px)',
    'controls.maxHeight': 'Altezza max (px)',
    'controls.keepOriginal': 'Mantieni originale',
    'controls.convertJpeg': 'Converti in JPEG',
    'controls.convertWebp': 'Converti in WebP',
    'controls.convertPng': 'Converti in PNG',

    'progress.processing': 'Elaborazione {current} / {total}',
    'progress.completed': 'Tutte le immagini compresse',
    'progress.loaded': "{count} immagine/i aggiunta/e",

    'result.label': 'Compressione completata',
    'result.original': 'Originale',
    'result.compressed': 'Compresso',
    'result.savings': 'Risparmio {percent}% ({saved})',

    'error.noFile': "Carica prima un'immagine",
    'error.failed': 'Compressione fallita: {msg}',

    'footer.privacy': 'Le tue immagini non lasciano mai il browser',
    'footer.openSource': 'Open Source',
  },
};

// === Initialize Language ===
let currentLang = detectLanguage();

function detectLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGES[stored]) {
      return stored;
    }
  } catch (e) {
    // localStorage not available
  }
  const browserLang = navigator.language.slice(0, 2);
  if (LANGUAGES[browserLang]) {
    return browserLang;
  }
  return 'en';
}

export function getCurrentLang() {
  return currentLang;
}

export function setCurrentLang(langCode) {
  if (LANGUAGES[langCode]) {
    currentLang = langCode;
    try {
      localStorage.setItem(STORAGE_KEY, langCode);
    } catch (e) {
      // localStorage not available
    }
    document.documentElement.lang = langCode;
    return true;
  }
  return false;
}

export function t(key, params = {}) {
  const translation = TRANSLATIONS[currentLang]?.[key];
  if (!translation) {
    console.warn(`Missing translation for key: ${key} (lang: ${currentLang})`);
    return key;
  }
  return translation.replace(/\{(\w+)\}/g, (_, param) => params[param] ?? `{${param}}`);
}

export async function initI18n() {
  document.documentElement.lang = currentLang;

  const elements = document.querySelectorAll('[data-i18n]');
  for (const el of elements) {
    const key = el.getAttribute('data-i18n');
    if (key) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t(key);
      } else {
        el.textContent = t(key);
      }
    }
  }

  const ariaElements = document.querySelectorAll('[data-i18n-attr]');
  for (const el of ariaElements) {
    const attrMapping = el.getAttribute('data-i18n-attr');
    const [attrName, translateKey] = attrMapping.split(':');
    if (attrName && translateKey) {
      el.setAttribute(attrName, t(translateKey));
    }
  }

  const langSelector = document.getElementById('lang-selector');
  if (langSelector) {
    setupLangSelector(langSelector);
  }
}

function setupLangSelector(container) {
  for (const [code, lang] of Object.entries(LANGUAGES)) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-btn' + (code === currentLang ? ' active' : '');
    btn.textContent = code.toUpperCase();
    btn.setAttribute('aria-label', `Switch language to ${lang.name}`);
    btn.setAttribute('aria-pressed', String(code === currentLang));

    btn.addEventListener('click', () => {
      if (setCurrentLang(code)) {
        window.location.reload();
      }
    });

    container.appendChild(btn);
  }
}
