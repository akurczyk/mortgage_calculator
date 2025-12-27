const {
  calculateMonthlyPayment,
  calculateEqualInstallments,
  calculateDecreasingInstallments,
  setEvents,
} = require('../../script.js');

describe('Calculation Functions', () => {
  beforeEach(() => {
    // Reset events before each test
    setEvents([]);
  });

  describe('calculateMonthlyPayment', () => {
    test('calculates correct monthly payment with standard rate', () => {
      const principal = 300000;
      const monthlyRate = 0.06 / 12; // 6% annual rate
      const months = 240;

      const payment = calculateMonthlyPayment(principal, monthlyRate, months);

      // Expected payment for 300k loan at 6% for 20 years
      expect(payment).toBeCloseTo(2149.29, 2);
    });

    test('handles zero interest rate', () => {
      const principal = 300000;
      const monthlyRate = 0;
      const months = 240;

      const payment = calculateMonthlyPayment(principal, monthlyRate, months);

      // With 0% interest, payment should be principal / months
      expect(payment).toBe(1250);
    });

    test('calculates payment for short-term loan', () => {
      const principal = 100000;
      const monthlyRate = 0.05 / 12; // 5% annual rate
      const months = 12;

      const payment = calculateMonthlyPayment(principal, monthlyRate, months);

      expect(payment).toBeCloseTo(8560.75, 2);
    });

    test('calculates payment for long-term loan', () => {
      const principal = 500000;
      const monthlyRate = 0.07 / 12; // 7% annual rate
      const months = 360;

      const payment = calculateMonthlyPayment(principal, monthlyRate, months);

      expect(payment).toBeCloseTo(3326.51, 2);
    });
  });

  describe('calculateEqualInstallments', () => {
    test('generates correct schedule without events', () => {
      const principal = 100000;
      const annualRate = 6;
      const months = 12;
      const startYear = 2024;
      const startMonth = 1;
      const inflationRate = 0;

      const schedule = calculateEqualInstallments(
        principal,
        annualRate,
        months,
        startYear,
        startMonth,
        inflationRate
      );

      // Check schedule length
      expect(schedule).toHaveLength(12);

      // Check first payment
      expect(schedule[0].month).toBe(1);
      expect(schedule[0].date).toBe('01.2024');
      expect(schedule[0].payment).toBeCloseTo(8606.64, 2);
      expect(schedule[0].balance).toBeLessThan(principal);

      // Check last payment
      expect(schedule[11].month).toBe(12);
      expect(schedule[11].balance).toBeCloseTo(0, 2);
    });

    test('principal decreases with each payment', () => {
      const principal = 100000;
      const annualRate = 6;
      const months = 12;

      const schedule = calculateEqualInstallments(
        principal,
        annualRate,
        months,
        2024,
        1,
        0
      );

      // Balance should decrease monotonically
      for (let i = 1; i < schedule.length; i++) {
        expect(schedule[i].balance).toBeLessThan(schedule[i - 1].balance);
      }
    });

    test('calculates with inflation adjustment', () => {
      const principal = 100000;
      const annualRate = 6;
      const months = 12;
      const inflationRate = 3;

      const schedule = calculateEqualInstallments(
        principal,
        annualRate,
        months,
        2024,
        1,
        inflationRate
      );

      // Real payment should be less than nominal payment in later months
      expect(schedule[11].realPayment).toBeLessThan(schedule[11].payment);
    });

    test('final balance is approximately zero', () => {
      const principal = 200000;
      const annualRate = 5.5;
      const months = 60;

      const schedule = calculateEqualInstallments(
        principal,
        annualRate,
        months,
        2024,
        1,
        0
      );

      // Final balance should be very close to zero
      const finalBalance = schedule[schedule.length - 1].balance;
      expect(finalBalance).toBeCloseTo(0, 2);
    });
  });

  describe('calculateDecreasingInstallments', () => {
    test('generates correct schedule without events', () => {
      const principal = 100000;
      const annualRate = 6;
      const months = 12;
      const startYear = 2024;
      const startMonth = 1;
      const inflationRate = 0;

      const schedule = calculateDecreasingInstallments(
        principal,
        annualRate,
        months,
        startYear,
        startMonth,
        inflationRate
      );

      // Check schedule length
      expect(schedule).toHaveLength(12);

      // Check first payment
      expect(schedule[0].month).toBe(1);
      expect(schedule[0].date).toBe('01.2024');

      // Check last payment
      expect(schedule[11].month).toBe(12);
      expect(schedule[11].balance).toBeCloseTo(0, 2);
    });

    test('payments decrease over time', () => {
      const principal = 100000;
      const annualRate = 6;
      const months = 12;

      const schedule = calculateDecreasingInstallments(
        principal,
        annualRate,
        months,
        2024,
        1,
        0
      );

      // Payment should decrease monotonically
      for (let i = 1; i < schedule.length; i++) {
        expect(schedule[i].payment).toBeLessThan(schedule[i - 1].payment);
      }
    });

    test('principal payment is constant', () => {
      const principal = 120000;
      const annualRate = 6;
      const months = 12;

      const schedule = calculateDecreasingInstallments(
        principal,
        annualRate,
        months,
        2024,
        1,
        0
      );

      const expectedPrincipalPayment = principal / months;

      // All principal payments should be equal (except possibly the last one)
      for (let i = 0; i < schedule.length - 1; i++) {
        expect(schedule[i].principal).toBeCloseTo(expectedPrincipalPayment, 2);
      }
    });

    test('final balance is approximately zero', () => {
      const principal = 200000;
      const annualRate = 5.5;
      const months = 60;

      const schedule = calculateDecreasingInstallments(
        principal,
        annualRate,
        months,
        2024,
        1,
        0
      );

      // Final balance should be very close to zero
      const finalBalance = schedule[schedule.length - 1].balance;
      expect(finalBalance).toBeCloseTo(0, 2);
    });
  });
});
