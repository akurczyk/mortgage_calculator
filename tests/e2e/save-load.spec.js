const { test, expect } = require('@playwright/test');

test.describe('Save and Load Simulations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
    // Clear localStorage before each test
    await page.evaluate(() => localStorage.clear());
  });

  test('save button opens save modal', async ({ page }) => {
    // Click save button
    await page.click('#saveBtn');

    // Save modal should be visible
    const saveModal = page.locator('#saveModal');
    await expect(saveModal).toBeVisible();

    // Modal should have simulation name input
    await expect(page.locator('#simulationName')).toBeVisible();
  });

  test('saves simulation with custom name', async ({ page }) => {
    // Fill in custom loan parameters
    await page.fill('#loanAmount', '250000');
    await page.fill('#interestRate', '5.5');
    await page.fill('#loanPeriod', '180');

    // Click save button
    await page.click('#saveBtn');

    // Enter simulation name
    await page.fill('#simulationName', 'Test Simulation');

    // Click confirm save
    await page.click('#confirmSaveBtn');

    // Modal should close
    await expect(page.locator('#saveModal')).toBeHidden();

    // Alert should appear (simulation saved)
    page.once('dialog', dialog => {
      expect(dialog.message()).toContain('saved');
      dialog.accept();
    });
  });

  test('load button opens load modal', async ({ page }) => {
    // Click load button
    await page.click('#loadBtn');

    // Load modal should be visible
    const loadModal = page.locator('#loadModal');
    await expect(loadModal).toBeVisible();
  });

  test('shows "no saved simulations" when storage is empty', async ({ page }) => {
    // Click load button
    await page.click('#loadBtn');

    // "No saved simulations" message should be visible
    const noSimulationsMsg = page.locator('#noSimulationsMsg');
    await expect(noSimulationsMsg).toBeVisible();
  });

  test('saves and loads simulation successfully', async ({ page }) => {
    // Set custom values
    await page.fill('#loanAmount', '150000');
    await page.fill('#interestRate', '6.0');
    await page.fill('#loanPeriod', '120');
    await page.selectOption('#installmentType', 'decreasing');
    await page.fill('#inflationRate', '2.5');

    // Add an event
    await page.click('#addEventBtn');
    await page.fill('#eventMonth', '12');
    await page.fill('#newRate', '6.5');
    await page.click('#saveEventBtn');
    await page.waitForSelector('#eventModal', { state: 'hidden', timeout: 5000 });

    // Save simulation
    await page.click('#saveBtn');
    await page.fill('#simulationName', 'My Custom Loan');

    // Handle the save confirmation dialog
    page.once('dialog', dialog => dialog.accept());
    await page.click('#confirmSaveBtn');
    await page.waitForSelector('#saveModal', { state: 'hidden', timeout: 5000 });

    // Wait a bit for the save to complete
    await page.waitForTimeout(500);

    // Clear the form
    await page.click('#clearBtn');
    page.once('dialog', dialog => dialog.accept());

    // Wait for form to clear
    await page.waitForTimeout(500);

    // Verify form is cleared
    await expect(page.locator('#loanAmount')).toHaveValue('300000');

    // Load the simulation
    await page.click('#loadBtn');

    // Click on the saved simulation
    await page.click('.simulation-card');

    // Modal should close
    await expect(page.locator('#loadModal')).toBeHidden();

    // Verify values are restored
    await expect(page.locator('#loanAmount')).toHaveValue('150000');
    await expect(page.locator('#interestRate')).toHaveValue('6');
    await expect(page.locator('#loanPeriod')).toHaveValue('120');
    await expect(page.locator('#installmentType')).toHaveValue('decreasing');
    await expect(page.locator('#inflationRate')).toHaveValue('2.5');

    // Verify event is restored
    const eventRows = page.locator('#eventsTable tbody tr:not(#noEventsRow)');
    expect(await eventRows.count()).toBe(1);
  });

  test('displays multiple saved simulations', async ({ page }) => {
    // Save first simulation
    await page.fill('#loanAmount', '100000');
    await page.click('#saveBtn');
    await page.fill('#simulationName', 'Simulation 1');
    page.once('dialog', dialog => dialog.accept());
    await page.click('#confirmSaveBtn');
    await page.waitForTimeout(500);

    // Save second simulation
    await page.fill('#loanAmount', '200000');
    await page.click('#saveBtn');
    await page.fill('#simulationName', 'Simulation 2');
    page.once('dialog', dialog => dialog.accept());
    await page.click('#confirmSaveBtn');
    await page.waitForTimeout(500);

    // Save third simulation
    await page.fill('#loanAmount', '300000');
    await page.click('#saveBtn');
    await page.fill('#simulationName', 'Simulation 3');
    page.once('dialog', dialog => dialog.accept());
    await page.click('#confirmSaveBtn');
    await page.waitForTimeout(500);

    // Open load modal
    await page.click('#loadBtn');

    // Should show 3 simulations
    const simulationCards = page.locator('.simulation-card');
    expect(await simulationCards.count()).toBe(3);

    // Check simulation names
    await expect(page.locator('#loadModal')).toContainText('Simulation 1');
    await expect(page.locator('#loadModal')).toContainText('Simulation 2');
    await expect(page.locator('#loadModal')).toContainText('Simulation 3');
  });

  test('deletes simulation', async ({ page }) => {
    // Save a simulation
    await page.click('#saveBtn');
    await page.fill('#simulationName', 'Test Delete');
    page.once('dialog', dialog => dialog.accept());
    await page.click('#confirmSaveBtn');
    await page.waitForTimeout(500);

    // Open load modal
    await page.click('#loadBtn');

    // Verify simulation exists
    await expect(page.locator('.simulation-card')).toBeVisible();

    // Click delete button with confirmation
    page.once('dialog', dialog => dialog.accept());
    await page.click('.simulation-card .btn-delete-simulation');

    // Simulation should be removed
    await expect(page.locator('#noSimulationsMsg')).toBeVisible();
  });

  test('clear button resets form to defaults', async ({ page }) => {
    // Change some values
    await page.fill('#loanAmount', '150000');
    await page.fill('#interestRate', '5.0');
    await page.selectOption('#installmentType', 'decreasing');

    // Add an event
    await page.click('#addEventBtn');
    await page.fill('#eventMonth', '6');
    await page.fill('#newRate', '6.0');
    await page.click('#saveEventBtn');

    // Click clear button with confirmation
    page.once('dialog', dialog => dialog.accept());
    await page.click('#clearBtn');

    // Wait for clear to complete
    await page.waitForTimeout(500);

    // Verify form is reset to defaults
    await expect(page.locator('#loanAmount')).toHaveValue('300000');
    await expect(page.locator('#interestRate')).toHaveValue('6.15');
    await expect(page.locator('#loanPeriod')).toHaveValue('240');
    await expect(page.locator('#installmentType')).toHaveValue('equal');
    await expect(page.locator('#inflationRate')).toHaveValue('3');

    // Events should be cleared
    await expect(page.locator('#noEventsRow')).toBeVisible();

    // Results should be hidden
    await expect(page.locator('#summarySection')).toBeHidden();
    await expect(page.locator('#resultsSection')).toBeHidden();
  });

  test('saved simulations persist across page reloads', async ({ page }) => {
    // Save a simulation
    await page.fill('#loanAmount', '175000');
    await page.click('#saveBtn');
    await page.fill('#simulationName', 'Persistent Test');
    page.once('dialog', dialog => dialog.accept());
    await page.click('#confirmSaveBtn');
    await page.waitForTimeout(500);

    // Reload the page
    await page.reload();

    // Open load modal
    await page.click('#loadBtn');

    // Simulation should still be there
    await expect(page.locator('.simulation-card')).toBeVisible();
    await expect(page.locator('#loadModal')).toContainText('Persistent Test');
  });

  test('simulation card shows loan details', async ({ page }) => {
    // Save a simulation with specific values
    await page.fill('#loanAmount', '125000');
    await page.fill('#interestRate', '5.75');
    await page.fill('#loanPeriod', '144');
    await page.click('#saveBtn');
    await page.fill('#simulationName', 'Details Test');
    page.once('dialog', dialog => dialog.accept());
    await page.click('#confirmSaveBtn');
    await page.waitForTimeout(500);

    // Open load modal
    await page.click('#loadBtn');

    // Check that simulation card shows details
    const card = page.locator('.simulation-card');
    await expect(card).toContainText('125 000');
    await expect(card).toContainText('5.75');
    await expect(card).toContainText('144');
  });
});
