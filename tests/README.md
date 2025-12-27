# Testing Documentation

This directory contains all tests for the Mortgage Calculator project.

## Test Structure

```
tests/
├── unit/               # Unit tests (Jest)
│   ├── setup.js        # Jest setup and mocks
│   ├── calculations.test.js
│   ├── events.test.js
│   ├── utils.test.js
│   ├── storage.test.js
│   └── i18n.test.js
└── e2e/                # End-to-end tests (Playwright)
    ├── basic.spec.js
    ├── events.spec.js
    ├── save-load.spec.js
    └── ui.spec.js
```

## Unit Tests

Unit tests are written using **Jest** and test individual functions in isolation.

### Test Files

- **calculations.test.js**: Tests core calculation functions
  - `calculateMonthlyPayment()` - Annuity formula calculations
  - `calculateEqualInstallments()` - Equal installments schedule
  - `calculateDecreasingInstallments()` - Decreasing installments schedule

- **events.test.js**: Tests event handling in calculations
  - Rate change events
  - Overpayment events (one-time and recurring)
  - Loan holiday events
  - Period change events
  - Inflation change events
  - Multiple events in same month

- **utils.test.js**: Tests utility functions
  - `formatNumber()` - Number formatting with thousand separators
  - `detectBrowserLanguage()` - Language detection logic

- **storage.test.js**: Tests localStorage functions
  - `getSimulations()` / `saveSimulations()` - Storage operations
  - `getFormData()` / `setFormData()` - Form data extraction/population

- **i18n.test.js**: Tests internationalization
  - Translation dictionary completeness
  - Language switching logic
  - Polish and English translation consistency

### Running Unit Tests

```bash
# Run all unit tests
npm run test:unit

# Run in watch mode (auto-rerun on changes)
npm run test:unit:watch

# Run with coverage report
npm run test:unit:coverage
```

### Writing Unit Tests

When adding new unit tests:

1. Import the functions you want to test from `script.js`
2. Use `describe()` blocks to group related tests
3. Use `test()` or `it()` for individual test cases
4. Use `beforeEach()` to reset state (e.g., clear events)
5. Mock DOM elements when needed
6. Use Jest matchers like `expect().toBe()`, `toEqual()`, `toBeCloseTo()`, etc.

Example:
```javascript
const { formatNumber } = require('../../script.js');

describe('formatNumber', () => {
  test('formats whole numbers correctly', () => {
    expect(formatNumber(1000)).toBe('1 000.00');
  });
});
```

## E2E Tests

End-to-end tests are written using **Playwright** and test complete user workflows in real browsers.

### Test Files

- **basic.spec.js**: Basic calculator workflows
  - Page loading and default values
  - Basic loan calculations
  - Equal vs decreasing installments
  - Results display

- **events.spec.js**: Event management
  - Adding different event types
  - Recurring overpayments
  - Event removal
  - Events in calculations

- **save-load.spec.js**: Simulation persistence
  - Saving simulations
  - Loading simulations
  - Deleting simulations
  - localStorage persistence across reloads

- **ui.spec.js**: UI interactions
  - Language switching
  - Form inputs and validation
  - Modal interactions
  - Responsive design

### Running E2E Tests

```bash
# Run all E2E tests (headless mode)
npm run test:e2e

# Run with UI mode (visual test runner)
npm run test:e2e:ui

# Run in headed mode (see the browser)
npm run test:e2e:headed

# Debug a specific test
npm run test:e2e:debug
```

### Writing E2E Tests

When adding new E2E tests:

1. Import `test` and `expect` from `@playwright/test`
2. Use `test.beforeEach()` to navigate to the page
3. Use page locators to interact with elements
4. Use `await` for all async operations
5. Use Playwright assertions like `toBeVisible()`, `toHaveValue()`, etc.

Example:
```javascript
const { test, expect } = require('@playwright/test');

test('calculates loan', async ({ page }) => {
  await page.goto('/index.html');
  await page.click('#calculateBtn');
  await expect(page.locator('#summarySection')).toBeVisible();
});
```

## Test Coverage

Coverage is tracked using Jest's built-in coverage tool. Run `npm run test:unit:coverage` to generate a report.

Coverage reports are generated in the `coverage/` directory:
- `coverage/lcov-report/index.html` - HTML report (open in browser)
- `coverage/lcov.info` - LCOV format (for CI tools)

### Coverage Goals

- **Lines**: 70%+
- **Functions**: 70%+
- **Branches**: 70%+
- **Statements**: 70%+

## Mocking

### Unit Tests

Unit tests mock:
- **localStorage**: Mocked in `tests/unit/setup.js`
- **Bootstrap modals**: Mocked in `tests/unit/setup.js`
- **DOM elements**: Created using `document.createElement()` as needed
- **Global state**: Reset using exported helper functions like `setEvents()`

### E2E Tests

E2E tests run in real browsers with no mocking. They test the actual user experience.

## Debugging Tests

### Unit Tests

```bash
# Run specific test file
npx jest tests/unit/calculations.test.js

# Run tests matching pattern
npx jest -t "formatNumber"

# Run in watch mode
npm run test:unit:watch
```

### E2E Tests

```bash
# Debug mode (opens debugger)
npm run test:e2e:debug

# Run specific test file
npx playwright test tests/e2e/basic.spec.js

# Run specific test by name
npx playwright test -g "calculates loan"

# Show browser while running
npm run test:e2e:headed
```

## CI/CD

Tests run automatically on GitHub Actions for every push and pull request.

The workflow (`.github/workflows/test.yml`) includes:
- **Unit tests job**: Runs Jest tests with coverage
- **E2E tests job**: Runs Playwright tests in all browsers

On test failures:
- Playwright screenshots are uploaded as artifacts
- Test results and reports are available for download

## Best Practices

1. **Keep tests independent**: Each test should be able to run alone
2. **Reset state**: Use `beforeEach()` to ensure clean state
3. **Test behavior, not implementation**: Focus on what the code does, not how
4. **Use descriptive names**: Test names should clearly describe what they test
5. **Avoid test interdependencies**: Tests should not rely on execution order
6. **Mock external dependencies**: Unit tests should be fast and isolated
7. **Use appropriate assertions**: Choose the right matcher for your expectation

## Adding New Tests

When adding a new feature:

1. **Write unit tests first** for new functions
2. **Add E2E tests** for user-facing functionality
3. **Run tests locally** before committing
4. **Check coverage** to ensure new code is tested
5. **Update this README** if adding new test categories

## Troubleshooting

### Unit Tests Fail

- Check if you're importing the correct functions from `script.js`
- Verify global state is reset in `beforeEach()`
- Check if DOM elements are properly mocked
- Run with `--verbose` flag for more details

### E2E Tests Fail

- Check if the page is loading correctly
- Verify selectors are correct
- Use `--headed` mode to see what's happening
- Check Playwright trace files in `test-results/`
- Increase timeouts if needed for slow operations

### Coverage Too Low

- Identify uncovered lines in the HTML report
- Add tests for edge cases
- Test error conditions
- Test all code paths (if/else branches)
