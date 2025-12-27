const {
  getSimulations,
  saveSimulations,
  getFormData,
  setFormData,
  setEvents,
} = require('../../script.js');

describe('Storage Functions', () => {
  beforeEach(() => {
    // Clear all mocks
    localStorage.clear();
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();

    // Reset events
    setEvents([]);

    // Setup basic DOM elements for testing
    document.body.innerHTML = `
      <input id="loanAmount" value="300000" />
      <input id="interestRate" value="6.15" />
      <input id="loanPeriod" value="240" />
      <select id="installmentType">
        <option value="equal" selected>Equal</option>
        <option value="decreasing">Decreasing</option>
      </select>
      <input id="startDate" value="2024-01" />
      <input id="inflationRate" value="3.0" />
      <table>
        <tbody id="eventsTableBody">
          <tr id="noEventsRow"></tr>
        </tbody>
      </table>
    `;
  });

  describe('getSimulations', () => {
    test('returns empty array when localStorage is empty', () => {
      localStorage.getItem.mockReturnValue(null);

      const result = getSimulations();

      expect(result).toEqual([]);
      expect(localStorage.getItem).toHaveBeenCalledWith('mortgageSimulations');
    });

    test('returns parsed simulations from localStorage', () => {
      const mockData = [
        {
          id: 1,
          name: 'Test Simulation',
          date: '2024-01-01T00:00:00.000Z',
          data: {
            loanAmount: 300000,
            interestRate: 6.15,
            loanPeriod: 240,
          },
        },
      ];

      localStorage.getItem.mockReturnValue(JSON.stringify(mockData));

      const result = getSimulations();

      expect(result).toEqual(mockData);
      expect(localStorage.getItem).toHaveBeenCalledWith('mortgageSimulations');
    });

    test('handles multiple simulations', () => {
      const mockData = [
        { id: 1, name: 'Simulation 1', data: {} },
        { id: 2, name: 'Simulation 2', data: {} },
        { id: 3, name: 'Simulation 3', data: {} },
      ];

      localStorage.getItem.mockReturnValue(JSON.stringify(mockData));

      const result = getSimulations();

      expect(result).toHaveLength(3);
      expect(result).toEqual(mockData);
    });
  });

  describe('saveSimulations', () => {
    test('saves simulations to localStorage', () => {
      const mockData = [
        {
          id: 1,
          name: 'Test Simulation',
          data: {
            loanAmount: 300000,
            interestRate: 6.15,
          },
        },
      ];

      saveSimulations(mockData);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'mortgageSimulations',
        JSON.stringify(mockData)
      );
    });

    test('saves empty array', () => {
      saveSimulations([]);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'mortgageSimulations',
        '[]'
      );
    });

    test('saves multiple simulations', () => {
      const mockData = [
        { id: 1, name: 'Sim 1', data: {} },
        { id: 2, name: 'Sim 2', data: {} },
        { id: 3, name: 'Sim 3', data: {} },
      ];

      saveSimulations(mockData);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'mortgageSimulations',
        JSON.stringify(mockData)
      );
    });
  });

  describe('getFormData', () => {
    test('extracts form data correctly', () => {
      const result = getFormData();

      expect(result).toEqual({
        loanAmount: 300000,
        interestRate: 6.15,
        loanPeriod: 240,
        installmentType: 'equal',
        startDate: '2024-01',
        inflationRate: 3.0,
        events: [],
      });
    });

    test('includes events in form data', () => {
      const testEvents = [
        {
          id: 1,
          type: 'rateChange',
          month: 12,
          newRate: 7,
        },
      ];

      setEvents(testEvents);

      const result = getFormData();

      expect(result.events).toEqual(testEvents);
    });

    test('parses numeric values correctly', () => {
      document.getElementById('loanAmount').value = '150000';
      document.getElementById('interestRate').value = '4.5';
      document.getElementById('loanPeriod').value = '180';
      document.getElementById('inflationRate').value = '2.5';

      const result = getFormData();

      expect(result.loanAmount).toBe(150000);
      expect(result.interestRate).toBe(4.5);
      expect(result.loanPeriod).toBe(180);
      expect(result.inflationRate).toBe(2.5);
      expect(typeof result.loanAmount).toBe('number');
      expect(typeof result.interestRate).toBe('number');
      expect(typeof result.loanPeriod).toBe('number');
      expect(typeof result.inflationRate).toBe('number');
    });
  });

  describe('setFormData', () => {
    test('populates form fields correctly', () => {
      const testData = {
        loanAmount: 250000,
        interestRate: 5.5,
        loanPeriod: 300,
        installmentType: 'decreasing',
        startDate: '2025-06',
        inflationRate: 2.0,
        events: [],
      };

      setFormData(testData);

      expect(document.getElementById('loanAmount').value).toBe('250000');
      expect(document.getElementById('interestRate').value).toBe('5.5');
      expect(document.getElementById('loanPeriod').value).toBe('300');
      expect(document.getElementById('installmentType').value).toBe('decreasing');
      expect(document.getElementById('startDate').value).toBe('2025-06');
      expect(document.getElementById('inflationRate').value).toBe('2');
    });

    test('sets events correctly', () => {
      const testData = {
        loanAmount: 100000,
        interestRate: 6,
        loanPeriod: 120,
        installmentType: 'equal',
        startDate: '2024-01',
        inflationRate: 3,
        events: [
          { id: 1, type: 'rateChange', month: 6, newRate: 7 },
          { id: 2, type: 'overpayment', month: 12, amount: 10000 },
        ],
      };

      setFormData(testData);

      const currentEvents = getFormData().events;
      expect(currentEvents).toHaveLength(2);
      expect(currentEvents[0].type).toBe('rateChange');
      expect(currentEvents[1].type).toBe('overpayment');
    });

    test('handles missing events property', () => {
      const testData = {
        loanAmount: 100000,
        interestRate: 6,
        loanPeriod: 120,
        installmentType: 'equal',
        startDate: '2024-01',
        inflationRate: 3,
        // events property is missing
      };

      setFormData(testData);

      const currentEvents = getFormData().events;
      expect(currentEvents).toEqual([]);
    });
  });
});
