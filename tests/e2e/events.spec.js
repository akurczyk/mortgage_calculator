const { test, expect } = require('@playwright/test');

test.describe('Events Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('shows empty events table initially', async ({ page }) => {
    // Events table should show "No events" message
    const noEventsRow = page.locator('#noEventsRow');
    await expect(noEventsRow).toBeVisible();
  });

  test('opens add event modal', async ({ page }) => {
    // Click add event button
    await page.click('#addEventBtn');

    // Modal should be visible
    const modal = page.locator('#eventModal');
    await expect(modal).toBeVisible();

    // Modal should have title
    await expect(modal.locator('.modal-title')).toBeVisible();
  });

  test('adds rate change event', async ({ page }) => {
    // Open event modal
    await page.click('#addEventBtn');

    // Select rate change type
    await page.selectOption('#eventType', 'rateChange');

    // Fill in values
    await page.fill('#eventMonth', '12');
    await page.fill('#newRate', '7.5');

    // Save event
    await page.click('#saveEventBtn');

    // Modal should close
    await expect(page.locator('#eventModal')).toBeHidden();

    // Event should appear in table
    const eventsTable = page.locator('#eventsTable tbody');
    await expect(eventsTable).toContainText('12');
    await expect(eventsTable).toContainText('7.5');

    // "No events" row should be hidden
    await expect(page.locator('#noEventsRow')).toBeHidden();
  });

  test('adds overpayment event', async ({ page }) => {
    // Open event modal
    await page.click('#addEventBtn');

    // Select overpayment type
    await page.selectOption('#eventType', 'overpayment');

    // Fill in values
    await page.fill('#eventMonth', '6');
    await page.fill('#overpaymentAmount', '10000');
    await page.selectOption('#overpaymentStrategy', 'shortenPeriod');

    // Save event
    await page.click('#saveEventBtn');

    // Event should appear in table
    const eventsTable = page.locator('#eventsTable tbody');
    await expect(eventsTable).toContainText('6');
    await expect(eventsTable).toContainText('10 000');
  });

  test('adds recurring overpayment', async ({ page }) => {
    // Open event modal
    await page.click('#addEventBtn');

    // Select overpayment type
    await page.selectOption('#eventType', 'overpayment');

    // Fill in basic values
    await page.fill('#eventMonth', '3');
    await page.fill('#overpaymentAmount', '5000');

    // Enable recurring
    await page.check('#isRecurring');

    // Wait for recurring options to appear
    await expect(page.locator('#recurringOptions')).toBeVisible();

    // Fill recurring options
    await page.fill('#recurringFrequency', '3');
    await page.fill('#recurringCount', '4');

    // Save event
    await page.click('#saveEventBtn');

    // Multiple events should appear (4 recurring overpayments)
    const eventRows = page.locator('#eventsTable tbody tr:not(#noEventsRow)');
    const count = await eventRows.count();
    expect(count).toBe(4);
  });

  test('adds loan holiday event', async ({ page }) => {
    // Open event modal
    await page.click('#addEventBtn');

    // Select loan holiday type
    await page.selectOption('#eventType', 'loanHoliday');

    // Fill in values
    await page.fill('#eventMonth', '24');
    await page.fill('#holidayDuration', '3');

    // Save event
    await page.click('#saveEventBtn');

    // Event should appear in table
    const eventsTable = page.locator('#eventsTable tbody');
    await expect(eventsTable).toContainText('24');
    await expect(eventsTable).toContainText('3');
  });

  test('removes event from list', async ({ page }) => {
    // Add an event first
    await page.click('#addEventBtn');
    await page.selectOption('#eventType', 'rateChange');
    await page.fill('#eventMonth', '12');
    await page.fill('#newRate', '7');
    await page.click('#saveEventBtn');

    // Verify event is in table
    let eventRows = page.locator('#eventsTable tbody tr:not(#noEventsRow)');
    expect(await eventRows.count()).toBe(1);

    // Click remove button
    await page.click('#eventsTable tbody tr:first-child button');

    // Event should be removed
    await expect(page.locator('#noEventsRow')).toBeVisible();
    eventRows = page.locator('#eventsTable tbody tr:not(#noEventsRow)');
    expect(await eventRows.count()).toBe(0);
  });

  test('events appear in calculation results', async ({ page }) => {
    // Add rate change event
    await page.click('#addEventBtn');
    await page.selectOption('#eventType', 'rateChange');
    await page.fill('#eventMonth', '6');
    await page.fill('#newRate', '7.5');
    await page.click('#saveEventBtn');

    // Calculate
    await page.click('#calculateBtn');

    // Wait for results
    await expect(page.locator('#resultsTable')).toBeVisible();

    // Find month 6 row and check for event marker
    const month6Row = page.locator('#resultsTableBody tr:nth-child(6)');
    await expect(month6Row).toContainText('7.5');
  });

  test('multiple events can be added', async ({ page }) => {
    // Add first event
    await page.click('#addEventBtn');
    await page.selectOption('#eventType', 'rateChange');
    await page.fill('#eventMonth', '6');
    await page.fill('#newRate', '6.5');
    await page.click('#saveEventBtn');

    // Add second event
    await page.click('#addEventBtn');
    await page.selectOption('#eventType', 'overpayment');
    await page.fill('#eventMonth', '12');
    await page.fill('#overpaymentAmount', '15000');
    await page.click('#saveEventBtn');

    // Add third event
    await page.click('#addEventBtn');
    await page.selectOption('#eventType', 'loanHoliday');
    await page.fill('#eventMonth', '18');
    await page.fill('#holidayDuration', '2');
    await page.click('#saveEventBtn');

    // Check that 3 events exist
    const eventRows = page.locator('#eventsTable tbody tr:not(#noEventsRow)');
    expect(await eventRows.count()).toBe(3);
  });

  test('events are sorted by month', async ({ page }) => {
    // Add events in random order
    await page.click('#addEventBtn');
    await page.fill('#eventMonth', '18');
    await page.fill('#newRate', '7');
    await page.click('#saveEventBtn');

    await page.click('#addEventBtn');
    await page.fill('#eventMonth', '6');
    await page.fill('#newRate', '6.5');
    await page.click('#saveEventBtn');

    await page.click('#addEventBtn');
    await page.fill('#eventMonth', '12');
    await page.fill('#newRate', '7.5');
    await page.click('#saveEventBtn');

    // Check that events are sorted by month (6, 12, 18)
    const firstMonth = await page.locator('#eventsTable tbody tr:nth-child(1) td:first-child').textContent();
    const secondMonth = await page.locator('#eventsTable tbody tr:nth-child(2) td:first-child').textContent();
    const thirdMonth = await page.locator('#eventsTable tbody tr:nth-child(3) td:first-child').textContent();

    expect(parseInt(firstMonth)).toBe(6);
    expect(parseInt(secondMonth)).toBe(12);
    expect(parseInt(thirdMonth)).toBe(18);
  });

  test('modal closes when cancel is clicked', async ({ page }) => {
    // Open event modal
    await page.click('#addEventBtn');

    // Verify modal is open
    await expect(page.locator('#eventModal')).toBeVisible();

    // Click cancel
    await page.click('#eventModal button[data-bs-dismiss="modal"]');

    // Modal should close
    await expect(page.locator('#eventModal')).toBeHidden();

    // No event should be added
    await expect(page.locator('#noEventsRow')).toBeVisible();
  });
});
