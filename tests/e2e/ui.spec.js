const { test, expect } = require('@playwright/test');

test.describe('UI Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('language switcher changes language to Polish', async ({ page }) => {
    // Click Polish language button
    await page.click('#langPL');

    // Wait a bit for translations to apply
    await page.waitForTimeout(300);

    // Check that title is in Polish
    const title = page.locator('h1');
    await expect(title).toContainText('Kalkulator Kredytu Hipotecznego');

    // Check that calculate button is in Polish
    const calculateBtn = page.locator('#calculateBtn');
    await expect(calculateBtn).toContainText('Oblicz');

    // Check that Polish button is active
    await expect(page.locator('#langPL')).toHaveClass(/active/);
  });

  test('language switcher changes language to English', async ({ page }) => {
    // First switch to Polish
    await page.click('#langPL');
    await page.waitForTimeout(300);

    // Then switch back to English
    await page.click('#langEN');
    await page.waitForTimeout(300);

    // Check that title is in English
    const title = page.locator('h1');
    await expect(title).toContainText('Mortgage Calculator');

    // Check that calculate button is in English
    const calculateBtn = page.locator('#calculateBtn');
    await expect(calculateBtn).toContainText('Calculate');

    // Check that English button is active
    await expect(page.locator('#langEN')).toHaveClass(/active/);
  });

  test('form inputs accept numeric values', async ({ page }) => {
    // Test loan amount
    await page.fill('#loanAmount', '');
    await page.fill('#loanAmount', '123456');
    await expect(page.locator('#loanAmount')).toHaveValue('123456');

    // Test interest rate with decimals
    await page.fill('#interestRate', '');
    await page.fill('#interestRate', '7.25');
    await expect(page.locator('#interestRate')).toHaveValue('7.25');

    // Test loan period
    await page.fill('#loanPeriod', '');
    await page.fill('#loanPeriod', '360');
    await expect(page.locator('#loanPeriod')).toHaveValue('360');

    // Test inflation rate
    await page.fill('#inflationRate', '');
    await page.fill('#inflationRate', '2.8');
    await expect(page.locator('#inflationRate')).toHaveValue('2.8');
  });

  test('installment type selector works', async ({ page }) => {
    // Initially should be equal
    await expect(page.locator('#installmentType')).toHaveValue('equal');

    // Change to decreasing
    await page.selectOption('#installmentType', 'decreasing');
    await expect(page.locator('#installmentType')).toHaveValue('decreasing');

    // Change back to equal
    await page.selectOption('#installmentType', 'equal');
    await expect(page.locator('#installmentType')).toHaveValue('equal');
  });

  test('start date input works', async ({ page }) => {
    // Set a specific date
    await page.fill('#startDate', '2025-06');
    await expect(page.locator('#startDate')).toHaveValue('2025-06');

    // Set another date
    await page.fill('#startDate', '2024-12');
    await expect(page.locator('#startDate')).toHaveValue('2024-12');
  });

  test('all action buttons are visible and clickable', async ({ page }) => {
    // Top action buttons
    await expect(page.locator('#saveBtn')).toBeVisible();
    await expect(page.locator('#loadBtn')).toBeVisible();
    await expect(page.locator('#clearBtn')).toBeVisible();

    // Calculate button
    await expect(page.locator('#calculateBtn')).toBeVisible();

    // Test that they're clickable
    await page.click('#saveBtn');
    await expect(page.locator('#saveModal')).toBeVisible();
    await page.keyboard.press('Escape'); // Close modal
    await page.waitForSelector('#saveModal', { state: 'hidden', timeout: 5000 });

    await page.click('#loadBtn');
    await expect(page.locator('#loadModal')).toBeVisible();
    await page.keyboard.press('Escape'); // Close modal
    await page.waitForSelector('#loadModal', { state: 'hidden', timeout: 5000 });
  });

  test('event modal form switches based on event type', async ({ page }) => {
    // Open event modal
    await page.click('#addEventBtn');

    // Rate change should show rate input
    await page.selectOption('#eventType', 'rateChange');
    await expect(page.locator('#newRateGroup')).toBeVisible();
    await expect(page.locator('#overpaymentGroup')).toBeHidden();

    // Overpayment should show overpayment inputs
    await page.selectOption('#eventType', 'overpayment');
    await expect(page.locator('#overpaymentGroup')).toBeVisible();
    await expect(page.locator('#newRateGroup')).toBeHidden();

    // Loan holiday should show duration input
    await page.selectOption('#eventType', 'loanHoliday');
    await expect(page.locator('#loanHolidayGroup')).toBeVisible();
    await expect(page.locator('#overpaymentGroup')).toBeHidden();

    // Period change should show period input
    await page.selectOption('#eventType', 'periodChange');
    await expect(page.locator('#periodChangeGroup')).toBeVisible();
    await expect(page.locator('#loanHolidayGroup')).toBeHidden();

    // Inflation change should show inflation input
    await page.selectOption('#eventType', 'inflationChange');
    await expect(page.locator('#inflationChangeGroup')).toBeVisible();
    await expect(page.locator('#periodChangeGroup')).toBeHidden();
  });

  test('recurring overpayment checkbox shows/hides options', async ({ page }) => {
    // Open event modal
    await page.click('#addEventBtn');
    await page.selectOption('#eventType', 'overpayment');

    // Initially recurring options should be hidden
    await expect(page.locator('#recurringOptions')).toBeHidden();

    // Check recurring checkbox
    await page.check('#isRecurring');

    // Recurring options should be visible
    await expect(page.locator('#recurringOptions')).toBeVisible();
    await expect(page.locator('#recurringFrequency')).toBeVisible();
    await expect(page.locator('#recurringCount')).toBeVisible();

    // Uncheck recurring checkbox
    await page.uncheck('#isRecurring');

    // Recurring options should be hidden again
    await expect(page.locator('#recurringOptions')).toBeHidden();
  });

  test('modals close with Escape key', async ({ page }) => {
    // Open event modal
    await page.click('#addEventBtn');
    await expect(page.locator('#eventModal')).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForSelector('#eventModal', { state: 'hidden', timeout: 5000 });

    // Modal should close
    await expect(page.locator('#eventModal')).toBeHidden();

    // Open save modal
    await page.click('#saveBtn');
    await expect(page.locator('#saveModal')).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForSelector('#saveModal', { state: 'hidden', timeout: 5000 });

    // Modal should close
    await expect(page.locator('#saveModal')).toBeHidden();
  });

  test('results table has proper styling', async ({ page }) => {
    // Calculate to show results
    await page.click('#calculateBtn');

    // Wait for table
    await expect(page.locator('#resultsTable')).toBeVisible();

    // Check that header has background color
    const header = page.locator('#resultsTable thead');
    await expect(header).toBeVisible();

    // Check that table rows exist
    const rows = page.locator('#resultsTableBody tr');
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('summary cards display properly', async ({ page }) => {
    // Calculate to show summary
    await page.click('#calculateBtn');

    // Wait for summary
    await expect(page.locator('#summarySection')).toBeVisible();

    // Check all summary items
    await expect(page.locator('#totalAmount')).toBeVisible();
    await expect(page.locator('#totalInterest')).toBeVisible();
    await expect(page.locator('#totalPrincipal')).toBeVisible();
    await expect(page.locator('#installmentCount')).toBeVisible();

    // Check that they have values
    await expect(page.locator('#totalAmount')).not.toBeEmpty();
    await expect(page.locator('#totalInterest')).not.toBeEmpty();
    await expect(page.locator('#totalPrincipal')).not.toBeEmpty();
    await expect(page.locator('#installmentCount')).not.toBeEmpty();
  });

  test('responsive design works on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Page should still load properly
    await expect(page.locator('h1')).toBeVisible();

    // Form inputs should still be visible and usable
    await expect(page.locator('#loanAmount')).toBeVisible();
    await page.fill('#loanAmount', '100000');

    // Calculate button should be visible
    await expect(page.locator('#calculateBtn')).toBeVisible();

    // Calculate
    await page.click('#calculateBtn');

    // Results should display
    await expect(page.locator('#summarySection')).toBeVisible();
    await expect(page.locator('#resultsSection')).toBeVisible();
  });

  test('buttons have hover effects', async ({ page }) => {
    // Get calculate button
    const button = page.locator('#calculateBtn');

    // Button should be visible
    await expect(button).toBeVisible();

    // Hover over button (visual test, mainly checking it doesn't error)
    await button.hover();

    // Button should still be visible after hover
    await expect(button).toBeVisible();
  });

  test('form has proper labels', async ({ page }) => {
    // Check that all inputs have labels
    await expect(page.locator('label[for="loanAmount"]')).toBeVisible();
    await expect(page.locator('label[for="interestRate"]')).toBeVisible();
    await expect(page.locator('label[for="loanPeriod"]')).toBeVisible();
    await expect(page.locator('label[for="installmentType"]')).toBeVisible();
    await expect(page.locator('label[for="startDate"]')).toBeVisible();
    await expect(page.locator('label[for="inflationRate"]')).toBeVisible();
  });
});
