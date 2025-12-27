const {
  translations,
  getCurrentLanguage,
  setCurrentLanguage,
} = require('../../script.js');

describe('Internationalization', () => {
  describe('Translation Dictionary', () => {
    test('contains Polish translations', () => {
      expect(translations.pl).toBeDefined();
      expect(typeof translations.pl).toBe('object');
    });

    test('contains English translations', () => {
      expect(translations.en).toBeDefined();
      expect(typeof translations.en).toBe('object');
    });

    test('Polish and English have same keys', () => {
      const plKeys = Object.keys(translations.pl).sort();
      const enKeys = Object.keys(translations.en).sort();

      expect(plKeys).toEqual(enKeys);
    });

    test('has all essential keys in Polish', () => {
      const essentialKeys = [
        'pageTitle',
        'title',
        'btnSave',
        'btnLoad',
        'btnClear',
        'btnCalculate',
        'loanAmount',
        'interestRate',
        'loanPeriod',
        'installmentType',
        'equalInstallments',
        'decreasingInstallments',
        'summary',
        'totalInstallments',
        'totalInterest',
        'totalPrincipal',
      ];

      essentialKeys.forEach((key) => {
        expect(translations.pl[key]).toBeDefined();
        expect(translations.pl[key]).not.toBe('');
      });
    });

    test('has all essential keys in English', () => {
      const essentialKeys = [
        'pageTitle',
        'title',
        'btnSave',
        'btnLoad',
        'btnClear',
        'btnCalculate',
        'loanAmount',
        'interestRate',
        'loanPeriod',
        'installmentType',
        'equalInstallments',
        'decreasingInstallments',
        'summary',
        'totalInstallments',
        'totalInterest',
        'totalPrincipal',
      ];

      essentialKeys.forEach((key) => {
        expect(translations.en[key]).toBeDefined();
        expect(translations.en[key]).not.toBe('');
      });
    });
  });

  describe('Event Type Translations', () => {
    test('has all event type translations in Polish', () => {
      expect(translations.pl.eventRateChange).toBeDefined();
      expect(translations.pl.eventOverpayment).toBeDefined();
      expect(translations.pl.eventLoanHoliday).toBeDefined();
      expect(translations.pl.eventPeriodChange).toBeDefined();
      expect(translations.pl.eventInflationChange).toBeDefined();
    });

    test('has all event type translations in English', () => {
      expect(translations.en.eventRateChange).toBeDefined();
      expect(translations.en.eventOverpayment).toBeDefined();
      expect(translations.en.eventLoanHoliday).toBeDefined();
      expect(translations.en.eventPeriodChange).toBeDefined();
      expect(translations.en.eventInflationChange).toBeDefined();
    });
  });

  describe('Message Translations', () => {
    test('has validation message translations in Polish', () => {
      expect(translations.pl.fillAllFields).toBeDefined();
      expect(translations.pl.invalidValues).toBeDefined();
      expect(translations.pl.installmentMustBePositive).toBeDefined();
      expect(translations.pl.rateCannotBeNegative).toBeDefined();
      expect(translations.pl.overpaymentMustBePositive).toBeDefined();
    });

    test('has validation message translations in English', () => {
      expect(translations.en.fillAllFields).toBeDefined();
      expect(translations.en.invalidValues).toBeDefined();
      expect(translations.en.installmentMustBePositive).toBeDefined();
      expect(translations.en.rateCannotBeNegative).toBeDefined();
      expect(translations.en.overpaymentMustBePositive).toBeDefined();
    });

    test('has confirmation message translations', () => {
      expect(translations.pl.confirmClear).toBeDefined();
      expect(translations.pl.confirmDelete).toBeDefined();
      expect(translations.en.confirmClear).toBeDefined();
      expect(translations.en.confirmDelete).toBeDefined();
    });
  });

  describe('Language State', () => {
    test('can get current language', () => {
      const lang = getCurrentLanguage();
      expect(['pl', 'en']).toContain(lang);
    });

    test('can set current language', () => {
      setCurrentLanguage('pl');
      expect(getCurrentLanguage()).toBe('pl');

      setCurrentLanguage('en');
      expect(getCurrentLanguage()).toBe('en');
    });
  });

  describe('Translation Consistency', () => {
    test('no translation is just a key name', () => {
      // Check that translations are actual text, not just the key names
      Object.keys(translations.pl).forEach((key) => {
        expect(translations.pl[key]).not.toBe(key);
      });

      Object.keys(translations.en).forEach((key) => {
        expect(translations.en[key]).not.toBe(key);
      });
    });

    test('translations are strings or contain HTML', () => {
      Object.keys(translations.pl).forEach((key) => {
        expect(typeof translations.pl[key]).toBe('string');
      });

      Object.keys(translations.en).forEach((key) => {
        expect(typeof translations.en[key]).toBe('string');
      });
    });

    test('Polish translations are in Polish', () => {
      // Just check a few key translations contain Polish characters
      expect(translations.pl.loanAmount).toContain('pozostała');
      expect(translations.pl.summary).toContain('Podsumowanie');
      expect(translations.pl.btnCalculate).toContain('Oblicz');
    });

    test('English translations are in English', () => {
      expect(translations.en.loanAmount).toContain('Remaining');
      expect(translations.en.summary).toContain('Summary');
      expect(translations.en.btnCalculate).toContain('Calculate');
    });
  });

  describe('Special Characters and Formatting', () => {
    test('newline characters work in messages', () => {
      // Check that confirmation messages contain newlines
      expect(translations.pl.confirmClear).toContain('\n');
      expect(translations.en.confirmClear).toContain('\n');
    });

    test('HTML links work in descriptions', () => {
      expect(translations.pl.calculatorDescription).toContain('<a href');
      expect(translations.pl.calculatorDescription).toContain('</a>');
      expect(translations.en.calculatorDescription).toContain('<a href');
      expect(translations.en.calculatorDescription).toContain('</a>');
    });

    test('line breaks work in noEvents text', () => {
      expect(translations.pl.noEvents).toContain('<br>');
      expect(translations.en.noEvents).toContain('<br>');
    });
  });
});
