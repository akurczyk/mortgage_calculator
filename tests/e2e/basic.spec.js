const { test, expect } = require('@playwright/test');

test.describe('Basic Mortgage Calculator Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Mortgage Calculator/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('displays default values in form', async ({ page }) => {
    // Check default loan amount
    const loanAmount = page.locator('#loanAmount');
    await expect(loanAmount).toHaveValue('300000');

    // Check default interest rate
    const interestRate = page.locator('#interestRate');
    await expect(interestRate).toHaveValue('6.15');

    // Check default loan period
    const loanPeriod = page.locator('#loanPeriod');
    await expect(loanPeriod).toHaveValue('240');

    // Check default inflation rate
    const inflationRate = page.locator('#inflationRate');
    await expect(inflationRate).toHaveValue('3.0');
  });

  test('calculates loan with default values', async ({ page }) => {
    // Click calculate button
    await page.click('#calculateBtn');

    // Wait for results to appear
    await expect(page.locator('#summarySection')).toBeVisible();
    await expect(page.locator('#resultsSection')).toBeVisible();

    // Check that summary values are displayed
    const totalAmount = page.locator('#totalAmount');
    await expect(totalAmount).toContainText('PLN');
    await expect(totalAmount).not.toContainText('0 PLN');

    const totalInterest = page.locator('#totalInterest');
    await expect(totalInterest).toContainText('PLN');
    await expect(totalInterest).not.toContainText('0 PLN');

    const totalPrincipal = page.locator('#totalPrincipal');
    await expect(totalPrincipal).toContainText('PLN');

    const installmentCount = page.locator('#installmentCount');
    await expect(installmentCount).toContainText('240');
  });

  test('calculates loan with custom values', async ({ page }) => {
    // Set custom values
    await page.fill('#loanAmount', '200000');
    await page.fill('#interestRate', '5.5');
    await page.fill('#loanPeriod', '180');
    await page.fill('#inflationRate', '2.5');

    // Click calculate
    await page.click('#calculateBtn');

    // Wait for results
    await expect(page.locator('#summarySection')).toBeVisible();

    // Verify installment count
    const installmentCount = page.locator('#installmentCount');
    await expect(installmentCount).toContainText('180');
  });

  test('displays payment schedule table', async ({ page }) => {
    // Calculate with default values
    await page.click('#calculateBtn');

    // Wait for results table
    await expect(page.locator('#resultsTable')).toBeVisible();

    // Check table headers
    await expect(page.locator('#resultsTable thead')).toContainText('No.');
    await expect(page.locator('#resultsTable thead')).toContainText('Date');
    await expect(page.locator('#resultsTable thead')).toContainText('Installment');
    await expect(page.locator('#resultsTable thead')).toContainText('Principal');
    await expect(page.locator('#resultsTable thead')).toContainText('Interest');

    // Check that table has rows
    const rows = page.locator('#resultsTableBody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(240);
  });

  test('switches between equal and decreasing installments', async ({ page }) => {
    // Calculate with equal installments (default)
    await page.click('#calculateBtn');
    await expect(page.locator('#summarySection')).toBeVisible();

    // Get first payment amount
    const firstPaymentEqual = await page.locator('#resultsTableBody tr:first-child td:nth-child(3)').textContent();

    // Switch to decreasing installments
    await page.selectOption('#installmentType', 'decreasing');
    await page.click('#calculateBtn');

    // Get first payment amount with decreasing
    const firstPaymentDecreasing = await page.locator('#resultsTableBody tr:first-child td:nth-child(3)').textContent();

    // First decreasing payment should be different from equal
    expect(firstPaymentDecreasing).not.toBe(firstPaymentEqual);
  });

  test('shows real installment values when inflation is set', async ({ page }) => {
    // Set inflation
    await page.fill('#inflationRate', '3.0');

    // Calculate
    await page.click('#calculateBtn');

    // Wait for results
    await expect(page.locator('#resultsTable')).toBeVisible();

    // Check that real installment column exists and has values
    const realInstallmentHeader = page.locator('#resultsTable thead th:nth-child(4)');
    await expect(realInstallmentHeader).toContainText('Real installment');

    // Check first row has real installment value
    const firstRealPayment = page.locator('#resultsTableBody tr:first-child td:nth-child(4)');
    await expect(firstRealPayment).not.toBeEmpty();
  });

  test('hides results before calculation', async ({ page }) => {
    // Results should be hidden initially
    await expect(page.locator('#summarySection')).toBeHidden();
    await expect(page.locator('#resultsSection')).toBeHidden();
  });

  test('scrolls to results after calculation', async ({ page }) => {
    // Click calculate
    await page.click('#calculateBtn');

    // Wait for summary section to be visible
    await expect(page.locator('#summarySection')).toBeVisible();

    // Check that summary section is in viewport (should be scrolled to)
    const summarySection = page.locator('#summarySection');
    await expect(summarySection).toBeInViewport();
  });
});
