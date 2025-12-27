const {
  calculateEqualInstallments,
  calculateDecreasingInstallments,
  setEvents,
  getEvents,
} = require('../../script.js');

describe('Event Handling in Calculations', () => {
  beforeEach(() => {
    // Reset events before each test
    setEvents([]);
  });

  describe('Rate Change Events', () => {
    test('applies rate change event correctly', () => {
      const principal = 100000;
      const months = 12;

      // Add rate change event in month 6
      setEvents([
        {
          id: 1,
          type: 'rateChange',
          month: 6,
          newRate: 8,
        },
      ]);

      const schedule = calculateEqualInstallments(
        principal,
        6, // Initial 6% rate
        months,
        2024,
        1,
        0
      );

      // Check that rate change is reflected in events
      expect(schedule[5].events).toContain('Change to 8%');

      // Interest in month 6 onwards should be higher due to rate change
      const interestBeforeChange = schedule[4].interest;
      const interestAfterChange = schedule[6].interest;
      expect(interestAfterChange).toBeGreaterThan(interestBeforeChange);
    });
  });

  describe('Overpayment Events', () => {
    test('applies one-time overpayment with shorten period strategy', () => {
      const principal = 100000;
      const months = 12;

      // Add overpayment in month 3
      setEvents([
        {
          id: 1,
          type: 'overpayment',
          month: 3,
          amount: 10000,
          strategy: 'shortenPeriod',
          isRecurring: false,
        },
      ]);

      const schedule = calculateEqualInstallments(
        principal,
        6,
        months,
        2024,
        1,
        0
      );

      // Check that overpayment is recorded
      expect(schedule[2].overpayment).toBe(10000);
      expect(schedule[2].events).toContain('Overpayment 10 000.00 PLN');

      // Schedule should be shorter than original 12 months
      expect(schedule.length).toBeLessThan(12);
    });

    test('applies one-time overpayment with lower installment strategy', () => {
      const principal = 100000;
      const months = 12;

      // Add overpayment in month 3
      setEvents([
        {
          id: 1,
          type: 'overpayment',
          month: 3,
          amount: 10000,
          strategy: 'lowerInstallment',
          isRecurring: false,
        },
      ]);

      const schedule = calculateEqualInstallments(
        principal,
        6,
        months,
        2024,
        1,
        0
      );

      // Check that overpayment is recorded
      expect(schedule[2].overpayment).toBe(10000);

      // Payment after overpayment should be lower
      const paymentBefore = schedule[2].payment;
      const paymentAfter = schedule[3].payment;
      expect(paymentAfter).toBeLessThan(paymentBefore);
    });

    test('handles recurring overpayments', () => {
      const principal = 100000;
      const months = 24;

      // Add recurring overpayments every 3 months, 4 times
      setEvents([
        {
          id: 1,
          type: 'overpayment',
          month: 3,
          amount: 5000,
          strategy: 'shortenPeriod',
          isRecurring: true,
          recurringIndex: 1,
          recurringTotal: 4,
        },
        {
          id: 2,
          type: 'overpayment',
          month: 6,
          amount: 5000,
          strategy: 'shortenPeriod',
          isRecurring: true,
          recurringIndex: 2,
          recurringTotal: 4,
        },
        {
          id: 3,
          type: 'overpayment',
          month: 9,
          amount: 5000,
          strategy: 'shortenPeriod',
          isRecurring: true,
          recurringIndex: 3,
          recurringTotal: 4,
        },
        {
          id: 4,
          type: 'overpayment',
          month: 12,
          amount: 5000,
          strategy: 'shortenPeriod',
          isRecurring: true,
          recurringIndex: 4,
          recurringTotal: 4,
        },
      ]);

      const schedule = calculateEqualInstallments(
        principal,
        6,
        months,
        2024,
        1,
        0
      );

      // Check that all overpayments are recorded
      expect(schedule[2].overpayment).toBe(5000);
      expect(schedule[5].overpayment).toBe(5000);
      expect(schedule[8].overpayment).toBe(5000);
      expect(schedule[11].overpayment).toBe(5000);
    });
  });

  describe('Loan Holiday Events', () => {
    test('applies loan holiday correctly', () => {
      const principal = 100000;
      const months = 12;

      // Add 3-month loan holiday starting at month 5
      setEvents([
        {
          id: 1,
          type: 'loanHoliday',
          month: 5,
          duration: 3,
        },
      ]);

      const schedule = calculateEqualInstallments(
        principal,
        6,
        months,
        2024,
        1,
        0
      );

      // During holiday (months 5, 6, 7), principal payment should be 0
      expect(schedule[4].principal).toBe(0);
      expect(schedule[5].principal).toBe(0);
      expect(schedule[6].principal).toBe(0);

      // Interest should still be paid during holiday
      expect(schedule[4].interest).toBeGreaterThan(0);
      expect(schedule[5].interest).toBeGreaterThan(0);
      expect(schedule[6].interest).toBeGreaterThan(0);

      // Schedule should be longer due to holiday
      expect(schedule.length).toBeGreaterThan(12);
    });
  });

  describe('Period Change Events', () => {
    test('changes loan period correctly', () => {
      const principal = 100000;
      const months = 24;

      // Change period to 12 months at month 6
      setEvents([
        {
          id: 1,
          type: 'periodChange',
          month: 6,
          newPeriod: 12,
        },
      ]);

      const schedule = calculateEqualInstallments(
        principal,
        6,
        months,
        2024,
        1,
        0
      );

      // Check that period change is recorded
      expect(schedule[5].events).toContain('Reschedule to 12 installments');

      // Payment should increase after period change
      const paymentBefore = schedule[4].payment;
      const paymentAfter = schedule[6].payment;
      expect(paymentAfter).toBeGreaterThan(paymentBefore);
    });
  });

  describe('Inflation Change Events', () => {
    test('changes inflation rate correctly', () => {
      const principal = 100000;
      const months = 12;

      // Change inflation to 5% at month 6
      setEvents([
        {
          id: 1,
          type: 'inflationChange',
          month: 6,
          newInflation: 5,
        },
      ]);

      const schedule = calculateEqualInstallments(
        principal,
        6,
        months,
        2024,
        1,
        5 // Initial inflation
      );

      // Check that inflation change is recorded
      expect(schedule[5].events).toContain('Inflation 5%');
    });
  });

  describe('Multiple Events in Same Month', () => {
    test('handles multiple events in the same month', () => {
      const principal = 100000;
      const months = 24;

      // Add multiple events in month 6
      setEvents([
        {
          id: 1,
          type: 'rateChange',
          month: 6,
          newRate: 7,
        },
        {
          id: 2,
          type: 'overpayment',
          month: 6,
          amount: 5000,
          strategy: 'shortenPeriod',
          isRecurring: false,
        },
      ]);

      const schedule = calculateEqualInstallments(
        principal,
        6,
        months,
        2024,
        1,
        0
      );

      // Both events should be recorded in month 6
      expect(schedule[5].events.length).toBeGreaterThan(1);
      expect(schedule[5].events).toContain('Change to 7%');
      expect(schedule[5].overpayment).toBe(5000);
    });
  });

  describe('Events in Decreasing Installments', () => {
    test('applies overpayment in decreasing installment schedule', () => {
      const principal = 100000;
      const months = 12;

      setEvents([
        {
          id: 1,
          type: 'overpayment',
          month: 3,
          amount: 10000,
          strategy: 'shortenPeriod',
          isRecurring: false,
        },
      ]);

      const schedule = calculateDecreasingInstallments(
        principal,
        6,
        months,
        2024,
        1,
        0
      );

      // Check that overpayment is recorded
      expect(schedule[2].overpayment).toBe(10000);

      // Schedule should be shorter
      expect(schedule.length).toBeLessThan(12);
    });
  });
});
