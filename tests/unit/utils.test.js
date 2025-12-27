const {
  formatNumber,
  detectBrowserLanguage,
} = require('../../script.js');

describe('Utility Functions', () => {
  describe('formatNumber', () => {
    test('formats whole numbers correctly', () => {
      expect(formatNumber(1000)).toBe('1 000.00');
      expect(formatNumber(10000)).toBe('10 000.00');
      expect(formatNumber(100000)).toBe('100 000.00');
      expect(formatNumber(1000000)).toBe('1 000 000.00');
    });

    test('formats decimal numbers correctly', () => {
      expect(formatNumber(1234.56)).toBe('1 234.56');
      expect(formatNumber(9876.54)).toBe('9 876.54');
      expect(formatNumber(123.456789)).toBe('123.46'); // Rounds to 2 decimals
    });

    test('formats small numbers correctly', () => {
      expect(formatNumber(0)).toBe('0.00');
      expect(formatNumber(1)).toBe('1.00');
      expect(formatNumber(99)).toBe('99.00');
      expect(formatNumber(999)).toBe('999.00');
    });

    test('formats negative numbers correctly', () => {
      expect(formatNumber(-1000)).toBe('-1 000.00');
      expect(formatNumber(-12345.67)).toBe('-12 345.67');
    });

    test('handles very large numbers', () => {
      expect(formatNumber(1234567890.12)).toBe('1 234 567 890.12');
    });

    test('rounds correctly', () => {
      expect(formatNumber(1234.005)).toBe('1 234.01'); // Rounds up
      expect(formatNumber(1234.004)).toBe('1 234.00'); // Rounds down
      expect(formatNumber(999.999)).toBe('1 000.00'); // Rounds up to next thousand
    });
  });

  describe('detectBrowserLanguage', () => {
    let languageGetter;
    let userLanguageGetter;

    beforeEach(() => {
      // Store original getters
      languageGetter = Object.getOwnPropertyDescriptor(Navigator.prototype, 'language');
      userLanguageGetter = Object.getOwnPropertyDescriptor(Navigator.prototype, 'userLanguage');
    });

    afterEach(() => {
      // Restore original getters
      if (languageGetter) {
        Object.defineProperty(Navigator.prototype, 'language', languageGetter);
      }
      if (userLanguageGetter) {
        Object.defineProperty(Navigator.prototype, 'userLanguage', userLanguageGetter);
      }
    });

    test('detects Polish language', () => {
      Object.defineProperty(Navigator.prototype, 'language', {
        get: () => 'pl',
        configurable: true
      });
      Object.defineProperty(Navigator.prototype, 'userLanguage', {
        get: () => 'pl',
        configurable: true
      });

      expect(detectBrowserLanguage()).toBe('pl');
    });

    test('detects Polish language with region code', () => {
      Object.defineProperty(Navigator.prototype, 'language', {
        get: () => 'pl-PL',
        configurable: true
      });

      expect(detectBrowserLanguage()).toBe('pl');
    });

    test('defaults to English for English language', () => {
      Object.defineProperty(Navigator.prototype, 'language', {
        get: () => 'en',
        configurable: true
      });

      expect(detectBrowserLanguage()).toBe('en');
    });

    test('defaults to English for English with region code', () => {
      Object.defineProperty(Navigator.prototype, 'language', {
        get: () => 'en-US',
        configurable: true
      });

      expect(detectBrowserLanguage()).toBe('en');
    });

    test('defaults to English for other languages', () => {
      Object.defineProperty(Navigator.prototype, 'language', {
        get: () => 'de',
        configurable: true
      });

      expect(detectBrowserLanguage()).toBe('en');
    });

    test('defaults to English for French', () => {
      Object.defineProperty(Navigator.prototype, 'language', {
        get: () => 'fr-FR',
        configurable: true
      });

      expect(detectBrowserLanguage()).toBe('en');
    });

    test('uses userLanguage as fallback', () => {
      Object.defineProperty(Navigator.prototype, 'language', {
        get: () => undefined,
        configurable: true
      });
      Object.defineProperty(Navigator.prototype, 'userLanguage', {
        get: () => 'pl',
        configurable: true
      });

      expect(detectBrowserLanguage()).toBe('pl');
    });
  });
});
