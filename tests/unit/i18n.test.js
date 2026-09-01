import { describe, expect, it } from 'vitest';
import { LANGUAGES, STORAGE_KEY, TRANSLATIONS } from '../../src/i18n.js';

describe('i18n module', () => {
  describe('LANGUAGES', () => {
    it('should have 7 languages', () => {
      expect(Object.keys(LANGUAGES)).toHaveLength(7);
    });

    it('should include en, fr, de, es, pt, nl, it', () => {
      expect(LANGUAGES.en).toBeDefined();
      expect(LANGUAGES.fr).toBeDefined();
      expect(LANGUAGES.de).toBeDefined();
      expect(LANGUAGES.es).toBeDefined();
      expect(LANGUAGES.pt).toBeDefined();
      expect(LANGUAGES.nl).toBeDefined();
      expect(LANGUAGES.it).toBeDefined();
    });
  });

  describe('TRANSLATIONS', () => {
    it('should have translations for all 7 languages', () => {
      for (const code of Object.keys(LANGUAGES)) {
        expect(TRANSLATIONS[code]).toBeDefined();
      }
    });

    it('should have app.title key in all languages', () => {
      for (const code of Object.keys(LANGUAGES)) {
        expect(TRANSLATIONS[code]['app.title']).toBeDefined();
      }
    });

    it('should have dropzone.title key in all languages', () => {
      for (const code of Object.keys(LANGUAGES)) {
        expect(TRANSLATIONS[code]['dropzone.title']).toBeDefined();
      }
    });

    it('should have btn.compress key in all languages', () => {
      for (const code of Object.keys(LANGUAGES)) {
        expect(TRANSLATIONS[code]['btn.compress']).toBeDefined();
      }
    });
  });

  describe('STORAGE_KEY', () => {
    it('should be a non-empty string', () => {
      expect(typeof STORAGE_KEY).toBe('string');
      expect(STORAGE_KEY.length).toBeGreaterThan(0);
    });
  });
});
