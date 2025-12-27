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
    const originalNavigator = global.navigator;

    afterEach(() => {
      // Restore original navigator
      global.navigator = originalNavigator;
    });

    test('detects Polish language', () => {
      global.navigator = {
        language: 'pl',
        userLanguage: 'pl',
      };

      expect(detectBrowserLanguage()).toBe('pl');
    });

    test('detects Polish language with region code', () => {
      global.navigator = {
        language: 'pl-PL',
        userLanguage: 'pl-PL',
      };

      expect(detectBrowserLanguage()).toBe('pl');
    });

    test('defaults to English for English language', () => {
      global.navigator = {
        language: 'en',
        userLanguage: 'en',
      };

      expect(detectBrowserLanguage()).toBe('en');
    });

    test('defaults to English for English with region code', () => {
      global.navigator = {
        language: 'en-US',
        userLanguage: 'en-US',
      };

      expect(detectBrowserLanguage()).toBe('en');
    });

    test('defaults to English for other languages', () => {
      global.navigator = {
        language: 'de',
        userLanguage: 'de',
      };

      expect(detectBrowserLanguage()).toBe('en');
    });

    test('defaults to English for French', () => {
      global.navigator = {
        language: 'fr-FR',
        userLanguage: 'fr-FR',
      };

      expect(detectBrowserLanguage()).toBe('en');
    });

    test('uses userLanguage as fallback', () => {
      global.navigator = {
        language: undefined,
        userLanguage: 'pl',
      };

      expect(detectBrowserLanguage()).toBe('pl');
    });
  });
});
