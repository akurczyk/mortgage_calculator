// ==================== INTERNATIONALIZATION ====================

// Translation dictionary
const translations = {
    pl: {
        pageTitle: 'Kalkulator Kredytu Hipotecznego',
        title: 'Kalkulator Kredytu Hipotecznego',
        calculatorDescription: 'Kalkulator pozwala obliczyć wysokości rat z uwzględnieniem nadpłat i nadpłat cyklicznych, zmian oprocentowania (WIBOR) w zadanym czasie oraz podaje realną wartość raty (uwzględniając inflację). Ponadto możliwe jest zapisanie parametrów i zdarzeń w pamięci przeglądarki. <a href="https://github.com/akurczyk/mortgage_calculator" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); text-decoration: underline;">Projekt na GitHub</a>.',
        btnSave: 'Zapisz',
        btnSaveTitle: 'Zapisz obecne parametry i wydarzenia',
        btnLoad: 'Wczytaj',
        btnLoadTitle: 'Wczytaj zapisane parametry i wydarzenia',
        btnClear: 'Wyczyść',
        btnClearTitle: 'Wyczyść obecne ustawienia',
        loanParams: 'Parametry kredytu',
        loanAmount: 'Kwota pozostała (PLN)',
        interestRate: 'Oprocentowanie (%)',
        loanPeriod: 'Okres (miesiące)',
        installmentType: 'Typ rat',
        equalInstallments: 'Raty równe',
        decreasingInstallments: 'Raty malejące',
        startDate: 'Data rozpoczęcia',
        inflationRate: 'Inflacja (%)',
        events: 'Zdarzenia',
        btnAdd: 'Dodaj',
        installmentNo: 'Nr raty',
        type: 'Typ',
        description: 'Opis',
        action: 'Akcja',
        noEvents: 'Brak zdarzeń.<br>Tutaj można dodać przewidywane nadpłaty i zmiany oprocentowania w czasie.',
        btnCalculate: 'Oblicz harmonogram spłat',
        summary: 'Podsumowanie',
        totalInstallments: 'Suma rat',
        totalInterest: 'Suma odsetek',
        totalPrincipal: 'Suma kapitału',
        installmentCount: 'Liczba rat',
        paymentSchedule: 'Harmonogram spłat',
        no: 'Nr',
        date: 'Data',
        installment: 'Rata',
        realInstallment: 'Realna rata*',
        principal: 'Kapitał',
        interest: 'Odsetki',
        remainingPrincipal: 'Pozostały kapitał',
        event: 'Zdarzenie',
        realInstallmentNote: '* Realna rata - wartość raty skorygowana o inflację, pokazująca rzeczywistą wartość pieniądza w czasie',
        addEvent: 'Dodaj wydarzenie',
        eventType: 'Typ wydarzenia',
        eventRateChange: 'Zmiana oprocentowania',
        eventOverpayment: 'Nadpłata',
        eventLoanHoliday: 'Urlop kredytowy',
        eventPeriodChange: 'Zmiana liczby rat',
        eventInflationChange: 'Zmiana inflacji',
        eventMonth: 'Miesiąc (numer raty)',
        newRate: 'Nowe oprocentowanie (%)',
        overpaymentAmount: 'Kwota nadpłaty (PLN)',
        overpaymentImpact: 'Wpływ nadpłaty',
        shortenPeriod: 'Skrócenie okresu',
        lowerInstallment: 'Zmniejszenie raty',
        recurringOverpayment: 'Nadpłata cykliczna',
        frequency: 'Częstotliwość (miesiące)',
        repeatCount: 'Liczba powtórzeń',
        monthsCount: 'Liczba miesięcy',
        newInstallmentsCount: 'Nowa liczba rat',
        newInflation: 'Nowa inflacja (%)',
        btnCancel: 'Anuluj',
        saveSimulation: 'Zapisz symulację',
        simulationName: 'Nazwa symulacji',
        simulationPlaceholder: 'np. Kredyt z nadpłatami',
        loadSimulation: 'Wczytaj symulację',
        noSavedSimulations: 'Brak zapisanych symulacji',
        btnClose: 'Zamknij',
        btnRemove: 'Usuń',
        // Dynamic texts
        years_1: 'rok',
        years_2_4: 'lata',
        years_5plus: 'lat',
        months_short: 'mies.',
        // Messages
        fillAllFields: 'Proszę wypełnić wszystkie pola',
        invalidValues: 'Kwota kredytu i okres muszą być większe od 0',
        installmentMustBePositive: 'Numer raty musi być większy od 0',
        rateCannotBeNegative: 'Oprocentowanie nie może być ujemne',
        overpaymentMustBePositive: 'Kwota nadpłaty musi być większa od 0',
        frequencyMustBePositive: 'Częstotliwość i liczba powtórzeń muszą być większe od 0',
        holidayDurationMin: 'Czas trwania urlopu musi być co najmniej 1 miesiąc',
        installmentCountMin: 'Liczba rat musi być większa od 0',
        inflationCannotBeNegative: 'Inflacja nie może być ujemna',
        enterSimulationName: 'Proszę podać nazwę symulacji',
        confirmClear: 'Czy na pewno chcesz wyczyścić obecne ustawienia?\n\nZapisane symulacje NIE zostaną usunięte.',
        confirmDelete: 'Czy na pewno chcesz usunąć tę symulację?',
        simulationSaved: 'Symulacja została zapisana!',
        // Event descriptions
        changeToRate: 'Zmiana na',
        inflationLabel: 'Inflacja',
        rescheduleTo: 'Rozłożenie na',
        installmentsLabel: 'rat',
        holidayStart: 'Początek urlopu',
        holidayEnd: 'Koniec urlopu',
        overpaymentLabel: 'Nadpłata',
        planLabel: 'plan',
        recurringOverpaymentLabel: 'Nadpłata cykliczna',
        // Simulation list info
        amount: 'Kwota',
        interestRateLabel: 'Oprocentowanie',
        period: 'Okres',
        eventsCount: 'Wydarzenia'
    },
    en: {
        pageTitle: 'Mortgage Calculator',
        title: 'Mortgage Calculator',
        calculatorDescription: 'The calculator allows you to calculate installment amounts taking into account overpayments and recurring overpayments, interest rate changes (WIBOR) over time, and provides the real value of the installment (accounting for inflation). Additionally, it is possible to save parameters and events in browser memory. <a href="https://github.com/akurczyk/mortgage_calculator" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); text-decoration: underline;">Project on GitHub</a>.',
        btnSave: 'Save',
        btnSaveTitle: 'Save current parameters and events',
        btnLoad: 'Load',
        btnLoadTitle: 'Load saved parameters and events',
        btnClear: 'Clear',
        btnClearTitle: 'Clear current settings',
        loanParams: 'Loan Parameters',
        loanAmount: 'Remaining Amount (PLN)',
        interestRate: 'Interest Rate (%)',
        loanPeriod: 'Period (months)',
        installmentType: 'Installment Type',
        equalInstallments: 'Equal installments',
        decreasingInstallments: 'Decreasing installments',
        startDate: 'Start Date',
        inflationRate: 'Inflation (%)',
        events: 'Events',
        btnAdd: 'Add',
        installmentNo: 'Installment No.',
        type: 'Type',
        description: 'Description',
        action: 'Action',
        noEvents: 'No events.<br>You can add expected overpayments and interest rate changes over time here.',
        btnCalculate: 'Calculate Payment Schedule',
        summary: 'Summary',
        totalInstallments: 'Total Payments',
        totalInterest: 'Total Interest',
        totalPrincipal: 'Total Principal',
        installmentCount: 'Number of Installments',
        paymentSchedule: 'Payment Schedule',
        no: 'No.',
        date: 'Date',
        installment: 'Installment',
        realInstallment: 'Real installment*',
        principal: 'Principal',
        interest: 'Interest',
        remainingPrincipal: 'Remaining Principal',
        event: 'Event',
        realInstallmentNote: '* Real installment - installment value adjusted for inflation, showing the real value of money over time',
        addEvent: 'Add Event',
        eventType: 'Event Type',
        eventRateChange: 'Interest rate change',
        eventOverpayment: 'Overpayment',
        eventLoanHoliday: 'Payment holiday',
        eventPeriodChange: 'Change installment count',
        eventInflationChange: 'Inflation change',
        eventMonth: 'Month (installment number)',
        newRate: 'New interest rate (%)',
        overpaymentAmount: 'Overpayment amount (PLN)',
        overpaymentImpact: 'Overpayment impact',
        shortenPeriod: 'Shorten period',
        lowerInstallment: 'Lower installment',
        recurringOverpayment: 'Recurring overpayment',
        frequency: 'Frequency (months)',
        repeatCount: 'Repeat count',
        monthsCount: 'Number of months',
        newInstallmentsCount: 'New installment count',
        newInflation: 'New inflation (%)',
        btnCancel: 'Cancel',
        saveSimulation: 'Save Simulation',
        simulationName: 'Simulation Name',
        simulationPlaceholder: 'e.g., Loan with overpayments',
        loadSimulation: 'Load Simulation',
        noSavedSimulations: 'No saved simulations',
        btnClose: 'Close',
        btnRemove: 'Remove',
        // Dynamic texts
        years_1: 'year',
        years_2_4: 'years',
        years_5plus: 'years',
        months_short: 'mo.',
        // Messages
        fillAllFields: 'Please fill in all fields',
        invalidValues: 'Loan amount and period must be greater than 0',
        installmentMustBePositive: 'Installment number must be greater than 0',
        rateCannotBeNegative: 'Interest rate cannot be negative',
        overpaymentMustBePositive: 'Overpayment amount must be greater than 0',
        frequencyMustBePositive: 'Frequency and repeat count must be greater than 0',
        holidayDurationMin: 'Holiday duration must be at least 1 month',
        installmentCountMin: 'Installment count must be greater than 0',
        inflationCannotBeNegative: 'Inflation cannot be negative',
        enterSimulationName: 'Please enter simulation name',
        confirmClear: 'Are you sure you want to clear current settings?\n\nSaved simulations will NOT be deleted.',
        confirmDelete: 'Are you sure you want to delete this simulation?',
        simulationSaved: 'Simulation has been saved!',
        // Event descriptions
        changeToRate: 'Change to',
        inflationLabel: 'Inflation',
        rescheduleTo: 'Reschedule to',
        installmentsLabel: 'installments',
        holidayStart: 'Holiday start',
        holidayEnd: 'Holiday end',
        overpaymentLabel: 'Overpayment',
        planLabel: 'plan',
        recurringOverpaymentLabel: 'Recurring overpayment',
        // Simulation list info
        amount: 'Amount',
        interestRateLabel: 'Interest rate',
        period: 'Period',
        eventsCount: 'Events'
    }
};

// Current language
let currentLanguage = 'en';

// Detect browser language
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('pl')) {
        return 'pl';
    } else {
        return 'en';
    }
}

// Change language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);

    // Update language buttons
    document.getElementById('langPL').classList.toggle('active', lang === 'pl');
    document.getElementById('langEN').classList.toggle('active', lang === 'en');

    // Apply translations
    applyTranslations();
}

// Apply translations to all elements
function applyTranslations() {
    const trans = translations[currentLanguage];

    // Change lang attribute in HTML
    document.documentElement.setAttribute('lang', currentLanguage);

    // Change page title
    document.title = trans.pageTitle;

    // Translate elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (trans[key]) {
            // For option, button, td, th, label, h1, h5, div, p
            if (element.tagName === 'OPTION' || element.tagName === 'BUTTON' ||
                element.tagName === 'TD' || element.tagName === 'TH' ||
                element.tagName === 'LABEL' || element.tagName === 'H1' ||
                element.tagName === 'H5' || element.tagName === 'DIV' ||
                element.tagName === 'P') {
                // Use innerHTML for TD and P to handle <br>
                if (element.tagName === 'TD' || element.tagName === 'P') {
                    element.innerHTML = trans[key];
                } else {
                    element.textContent = trans[key];
                }
            }
        }
    });

    // Translate title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (trans[key]) {
            element.setAttribute('title', trans[key]);
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (trans[key]) {
            element.setAttribute('placeholder', trans[key]);
        }
    });

    // Re-render events (if any)
    if (events.length > 0) {
        renderEvents();
    }
}

// Application state
let events = [];
let eventModal;
let saveModal;
let loadModal;
const STORAGE_KEY = 'mortgageSimulations';

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Detect language
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    } else {
        currentLanguage = detectBrowserLanguage();
    }

    // Set active language button
    document.getElementById('langPL').classList.toggle('active', currentLanguage === 'pl');
    document.getElementById('langEN').classList.toggle('active', currentLanguage === 'en');

    // Apply translations
    applyTranslations();

    // Set default date to current month
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    document.getElementById('startDate').value = currentMonth;

    // Initialize Bootstrap modals
    eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    saveModal = new bootstrap.Modal(document.getElementById('saveModal'));
    loadModal = new bootstrap.Modal(document.getElementById('loadModal'));

    // Event listeners
    document.getElementById('addEventBtn').addEventListener('click', showEventModal);
    document.getElementById('saveEventBtn').addEventListener('click', saveEvent);
    document.getElementById('calculateBtn').addEventListener('click', calculateLoan);
    document.getElementById('eventType').addEventListener('change', updateEventForm);
    document.getElementById('isRecurring').addEventListener('change', function() {
        const recurringOptions = document.getElementById('recurringOptions');
        recurringOptions.style.display = this.checked ? 'block' : 'none';
    });

    // Event listeners for save/load
    document.getElementById('saveBtn').addEventListener('click', showSaveModal);
    document.getElementById('loadBtn').addEventListener('click', showLoadModal);
    document.getElementById('clearBtn').addEventListener('click', clearSimulation);
    document.getElementById('confirmSaveBtn').addEventListener('click', saveSimulation);
});

// Show event modal
function showEventModal() {
    // Reset checkbox and hide recurring options
    document.getElementById('isRecurring').checked = false;
    document.getElementById('recurringOptions').style.display = 'none';

    updateEventForm();
    eventModal.show();
}

// Update event form based on type
function updateEventForm() {
    const eventType = document.getElementById('eventType').value;
    const newRateGroup = document.getElementById('newRateGroup');
    const overpaymentGroup = document.getElementById('overpaymentGroup');
    const loanHolidayGroup = document.getElementById('loanHolidayGroup');
    const periodChangeGroup = document.getElementById('periodChangeGroup');
    const inflationChangeGroup = document.getElementById('inflationChangeGroup');

    // Hide all
    newRateGroup.style.display = 'none';
    overpaymentGroup.style.display = 'none';
    loanHolidayGroup.style.display = 'none';
    periodChangeGroup.style.display = 'none';
    inflationChangeGroup.style.display = 'none';

    // Show appropriate
    if (eventType === 'rateChange') {
        newRateGroup.style.display = 'block';
    } else if (eventType === 'overpayment') {
        overpaymentGroup.style.display = 'block';
    } else if (eventType === 'loanHoliday') {
        loanHolidayGroup.style.display = 'block';
    } else if (eventType === 'periodChange') {
        periodChangeGroup.style.display = 'block';
    } else if (eventType === 'inflationChange') {
        inflationChangeGroup.style.display = 'block';
    }
}

// Save event
function saveEvent() {
    const trans = translations[currentLanguage];
    const eventType = document.getElementById('eventType').value;
    const month = parseInt(document.getElementById('eventMonth').value);

    if (month < 1) {
        alert(trans.installmentMustBePositive);
        return;
    }

    if (eventType === 'rateChange') {
        const newRate = parseFloat(document.getElementById('newRate').value);
        if (newRate < 0) {
            alert(trans.rateCannotBeNegative);
            return;
        }
        const event = {
            id: Date.now(),
            type: eventType,
            month: month,
            newRate: newRate
        };
        events.push(event);
    } else if (eventType === 'overpayment') {
        const amount = parseFloat(document.getElementById('overpaymentAmount').value);
        if (amount <= 0) {
            alert(trans.overpaymentMustBePositive);
            return;
        }
        const strategy = document.getElementById('overpaymentStrategy').value;
        const isRecurring = document.getElementById('isRecurring').checked;

        if (isRecurring) {
            const frequency = parseInt(document.getElementById('recurringFrequency').value);
            const count = parseInt(document.getElementById('recurringCount').value);

            if (frequency < 1 || count < 1) {
                alert(trans.frequencyMustBePositive);
                return;
            }

            // Create multiple overpayment events
            for (let i = 0; i < count; i++) {
                const event = {
                    id: Date.now() + i,
                    type: eventType,
                    month: month + (i * frequency),
                    amount: amount,
                    strategy: strategy,
                    isRecurring: true,
                    recurringIndex: i + 1,
                    recurringTotal: count
                };
                events.push(event);
            }
        } else {
            const event = {
                id: Date.now(),
                type: eventType,
                month: month,
                amount: amount,
                strategy: strategy,
                isRecurring: false
            };
            events.push(event);
        }
    } else if (eventType === 'loanHoliday') {
        const duration = parseInt(document.getElementById('holidayDuration').value);
        if (duration < 1) {
            alert(trans.holidayDurationMin);
            return;
        }
        const event = {
            id: Date.now(),
            type: eventType,
            month: month,
            duration: duration
        };
        events.push(event);
    } else if (eventType === 'periodChange') {
        const newPeriod = parseInt(document.getElementById('newPeriod').value);
        if (newPeriod < 1) {
            alert(trans.installmentCountMin);
            return;
        }
        const event = {
            id: Date.now(),
            type: eventType,
            month: month,
            newPeriod: newPeriod
        };
        events.push(event);
    } else if (eventType === 'inflationChange') {
        const newInflation = parseFloat(document.getElementById('newInflation').value);
        if (newInflation < 0) {
            alert(trans.inflationCannotBeNegative);
            return;
        }
        const event = {
            id: Date.now(),
            type: eventType,
            month: month,
            newInflation: newInflation
        };
        events.push(event);
    }

    events.sort((a, b) => a.month - b.month);

    renderEvents();
    eventModal.hide();
}

// Render events list
function renderEvents() {
    const tbody = document.getElementById('eventsTableBody');
    const noEventsRow = document.getElementById('noEventsRow');

    // Remove all rows except noEventsRow
    const rows = tbody.querySelectorAll('tr:not(#noEventsRow)');
    rows.forEach(row => row.remove());

    if (events.length === 0) {
        if (noEventsRow) {
            noEventsRow.style.display = 'table-row';
        }
        return;
    }

    if (noEventsRow) {
        noEventsRow.style.display = 'none';
    }

    const trans = translations[currentLanguage];
    let html = '';
    events.forEach(event => {
        let typeName = '';
        let details = '';

        if (event.type === 'rateChange') {
            typeName = trans.eventRateChange;
            details = `${trans.newRate}: ${event.newRate}%`;
        } else if (event.type === 'overpayment') {
            typeName = event.isRecurring ? `${trans.recurringOverpaymentLabel} (${event.recurringIndex}/${event.recurringTotal})` : trans.eventOverpayment;
            const strategyText = event.strategy === 'shortenPeriod' ? trans.shortenPeriod : trans.lowerInstallment;
            details = `${formatNumber(event.amount)} PLN, ${strategyText}`;
        } else if (event.type === 'loanHoliday') {
            typeName = trans.eventLoanHoliday;
            details = `${event.duration} ${trans.months_short}`;
        } else if (event.type === 'periodChange') {
            typeName = trans.eventPeriodChange;
            details = `${trans.newInstallmentsCount}: ${event.newPeriod}`;
        } else if (event.type === 'inflationChange') {
            typeName = trans.eventInflationChange;
            details = `${trans.newInflation}: ${event.newInflation}%`;
        }

        html += `
            <tr>
                <td>${event.month}</td>
                <td><span class="event-type-badge">${typeName}</span></td>
                <td>${details}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeEvent(${event.id})">
                        ${trans.btnRemove}
                    </button>
                </td>
            </tr>
        `;
    });

    // Add new rows
    tbody.insertAdjacentHTML('beforeend', html);
}

// Remove event
function removeEvent(eventId) {
    events = events.filter(e => e.id !== eventId);
    renderEvents();
}

// Main loan calculation function
function calculateLoan() {
    const trans = translations[currentLanguage];
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value);
    const loanPeriod = parseInt(document.getElementById('loanPeriod').value);
    const installmentType = document.getElementById('installmentType').value;
    const startDateStr = document.getElementById('startDate').value;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value);

    // Validation
    if (!loanAmount || !annualRate || !loanPeriod || !startDateStr) {
        alert(trans.fillAllFields);
        return;
    }

    if (loanAmount <= 0 || loanPeriod <= 0) {
        alert(trans.invalidValues);
        return;
    }

    // Parse start date
    const [startYear, startMonth] = startDateStr.split('-').map(Number);

    // Calculation
    let schedule;
    if (installmentType === 'equal') {
        schedule = calculateEqualInstallments(loanAmount, annualRate, loanPeriod, startYear, startMonth, inflationRate);
    } else {
        schedule = calculateDecreasingInstallments(loanAmount, annualRate, loanPeriod, startYear, startMonth, inflationRate);
    }

    // Display results
    displayResults(schedule);
}

// Calculate equal installments (annuity)
function calculateEqualInstallments(principal, annualRate, months, startYear, startMonth, inflationRate) {
    const trans = translations[currentLanguage];
    const schedule = [];
    let remainingPrincipal = principal;
    let currentRate = annualRate;
    let currentInflation = inflationRate;
    const monthlyRate = annualRate / 100 / 12;

    // Calculate initial installment
    let monthlyPayment = calculateMonthlyPayment(principal, monthlyRate, months);
    let remainingMonths = months;
    let i = 1;
    let isInHoliday = false;
    let holidayEndMonth = 0;

    while (remainingPrincipal > 0.01 && i <= months + 1000) { // Add safety limit
        // Check events for this month
        const monthEvents = events.filter(e => e.month === i);
        let eventDescriptions = [];

        // Handle interest rate change
        monthEvents.forEach(event => {
            if (event.type === 'rateChange') {
                currentRate = event.newRate;
                const newMonthlyRate = currentRate / 100 / 12;
                monthlyPayment = calculateMonthlyPayment(remainingPrincipal, newMonthlyRate, remainingMonths);
                eventDescriptions.push(`${trans.changeToRate} ${currentRate}%`);
            }
        });

        // Handle inflation change
        monthEvents.forEach(event => {
            if (event.type === 'inflationChange') {
                currentInflation = event.newInflation;
                eventDescriptions.push(`${trans.inflationLabel} ${currentInflation}%`);
            }
        });

        // Handle installment count change
        monthEvents.forEach(event => {
            if (event.type === 'periodChange') {
                remainingMonths = event.newPeriod;
                const currentMonthlyRate = currentRate / 100 / 12;
                monthlyPayment = calculateMonthlyPayment(remainingPrincipal, currentMonthlyRate, remainingMonths);
                eventDescriptions.push(`${trans.rescheduleTo} ${event.newPeriod} ${trans.installmentsLabel}`);
            }
        });

        // Handle payment holiday
        monthEvents.forEach(event => {
            if (event.type === 'loanHoliday') {
                isInHoliday = true;
                holidayEndMonth = i + event.duration - 1;
                eventDescriptions.push(`${trans.holidayStart} (${event.duration} ${trans.months_short})`);
            }
        });

        // Calculate interest and principal
        const currentMonthlyRate = currentRate / 100 / 12;
        const interestPayment = remainingPrincipal * currentMonthlyRate;
        let principalPayment = 0;
        let totalPayment = interestPayment;

        // During payment holiday pay only interest
        if (isInHoliday) {
            principalPayment = 0;
            totalPayment = interestPayment;
            if (i === holidayEndMonth) {
                isInHoliday = false;
                eventDescriptions.push(trans.holidayEnd);
                // Recalculate installment after holiday
                monthlyPayment = calculateMonthlyPayment(remainingPrincipal, currentMonthlyRate, remainingMonths);
            }
        } else {
            principalPayment = monthlyPayment - interestPayment;

            // Correction for last installment
            if (principalPayment > remainingPrincipal) {
                principalPayment = remainingPrincipal;
                monthlyPayment = principalPayment + interestPayment;
            }

            totalPayment = principalPayment + interestPayment;
        }

        // Handle overpayments
        let overpayment = 0;
        let overpaymentStrategy = 'shortenPeriod'; // Default strategy
        let plannedOverpayment = 0;
        monthEvents.forEach(event => {
            if (event.type === 'overpayment') {
                plannedOverpayment += event.amount;
                overpaymentStrategy = event.strategy; // Get strategy from event
            }
        });

        // Limit overpayment to remaining principal after installment payment
        const remainingAfterInstallment = remainingPrincipal - principalPayment;
        overpayment = Math.min(plannedOverpayment, Math.max(0, remainingAfterInstallment));

        // Add overpayment message
        if (overpayment > 0) {
            if (overpayment < plannedOverpayment) {
                eventDescriptions.push(`${trans.overpaymentLabel} ${formatNumber(overpayment)} PLN (${trans.planLabel}: ${formatNumber(plannedOverpayment)} PLN)`);
            } else {
                eventDescriptions.push(`${trans.overpaymentLabel} ${formatNumber(overpayment)} PLN`);
            }
        }

        remainingPrincipal -= principalPayment + overpayment;

        // Calculate date
        const date = new Date(startYear, startMonth - 1 + i - 1);
        const dateStr = `${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

        // Calculate real installment (accounting for inflation)
        const monthlyInflationRate = currentInflation / 100 / 12;
        const inflationFactor = Math.pow(1 + monthlyInflationRate, i - 1);
        const realPayment = (totalPayment + overpayment) / inflationFactor;

        schedule.push({
            month: i,
            date: dateStr,
            payment: totalPayment,
            realPayment: realPayment,
            principal: principalPayment,
            interest: interestPayment,
            overpayment: overpayment,
            balance: Math.max(0, remainingPrincipal),
            events: eventDescriptions
        });

        // Recalculate installment if there was overpayment
        if (overpayment > 0 && remainingPrincipal > 0 && !isInHoliday) {
            if (overpaymentStrategy === 'shortenPeriod') {
                // Shorten period - installment stays same, number of installments decreases
                // Calculate how many installments remain at current installment
                const currentMonthlyRate = currentRate / 100 / 12;
                if (currentMonthlyRate > 0 && monthlyPayment > remainingPrincipal * currentMonthlyRate) {
                    remainingMonths = Math.ceil(
                        Math.log(monthlyPayment / (monthlyPayment - remainingPrincipal * currentMonthlyRate)) /
                        Math.log(1 + currentMonthlyRate)
                    );
                }
            } else {
                // Lower installment - number of installments remains unchanged
                monthlyPayment = calculateMonthlyPayment(remainingPrincipal, currentMonthlyRate, remainingMonths);
            }
        }

        if (!isInHoliday) {
            remainingMonths--;
        }

        i++;

        // Finish if loan paid off
        if (remainingPrincipal <= 0.01) {
            break;
        }
    }

    return schedule;
}

// Calculate decreasing installments
function calculateDecreasingInstallments(principal, annualRate, months, startYear, startMonth, inflationRate) {
    const trans = translations[currentLanguage];
    const schedule = [];
    let remainingPrincipal = principal;
    let currentRate = annualRate;
    let currentInflation = inflationRate;
    let constantPrincipal = principal / months;
    let remainingMonths = months;
    let i = 1;
    let isInHoliday = false;
    let holidayEndMonth = 0;

    while (remainingPrincipal > 0.01 && i <= months + 1000) { // Add safety limit
        // Check events for this month
        const monthEvents = events.filter(e => e.month === i);
        let eventDescriptions = [];

        // Handle interest rate change
        monthEvents.forEach(event => {
            if (event.type === 'rateChange') {
                currentRate = event.newRate;
                eventDescriptions.push(`${trans.changeToRate} ${currentRate}%`);
            }
        });

        // Handle inflation change
        monthEvents.forEach(event => {
            if (event.type === 'inflationChange') {
                currentInflation = event.newInflation;
                eventDescriptions.push(`${trans.inflationLabel} ${currentInflation}%`);
            }
        });

        // Handle installment count change
        monthEvents.forEach(event => {
            if (event.type === 'periodChange') {
                remainingMonths = event.newPeriod;
                constantPrincipal = remainingPrincipal / remainingMonths;
                eventDescriptions.push(`${trans.rescheduleTo} ${event.newPeriod} ${trans.installmentsLabel}`);
            }
        });

        // Handle payment holiday
        monthEvents.forEach(event => {
            if (event.type === 'loanHoliday') {
                isInHoliday = true;
                holidayEndMonth = i + event.duration - 1;
                eventDescriptions.push(`${trans.holidayStart} (${event.duration} ${trans.months_short})`);
            }
        });

        // Calculate interest and principal
        const currentMonthlyRate = currentRate / 100 / 12;
        const interestPayment = remainingPrincipal * currentMonthlyRate;
        let principalPayment = 0;
        let totalPayment = interestPayment;

        // During payment holiday pay only interest
        if (isInHoliday) {
            principalPayment = 0;
            totalPayment = interestPayment;
            if (i === holidayEndMonth) {
                isInHoliday = false;
                eventDescriptions.push(trans.holidayEnd);
                // Recalculate constant principal part after holiday
                constantPrincipal = remainingPrincipal / remainingMonths;
            }
        } else {
            // Correct constant principal part
            principalPayment = Math.min(constantPrincipal, remainingPrincipal);
            totalPayment = principalPayment + interestPayment;
        }

        // Handle overpayments
        let overpayment = 0;
        let overpaymentStrategy = 'shortenPeriod'; // Default strategy
        let plannedOverpayment = 0;
        monthEvents.forEach(event => {
            if (event.type === 'overpayment') {
                plannedOverpayment += event.amount;
                overpaymentStrategy = event.strategy; // Get strategy from event
            }
        });

        // Limit overpayment to remaining principal after installment payment
        const remainingAfterInstallment = remainingPrincipal - principalPayment;
        overpayment = Math.min(plannedOverpayment, Math.max(0, remainingAfterInstallment));

        // Add overpayment message
        if (overpayment > 0) {
            if (overpayment < plannedOverpayment) {
                eventDescriptions.push(`${trans.overpaymentLabel} ${formatNumber(overpayment)} PLN (${trans.planLabel}: ${formatNumber(plannedOverpayment)} PLN)`);
            } else {
                eventDescriptions.push(`${trans.overpaymentLabel} ${formatNumber(overpayment)} PLN`);
            }
        }

        remainingPrincipal -= principalPayment + overpayment;

        // Calculate date
        const date = new Date(startYear, startMonth - 1 + i - 1);
        const dateStr = `${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

        // Calculate real installment (accounting for inflation)
        const monthlyInflationRate = currentInflation / 100 / 12;
        const inflationFactor = Math.pow(1 + monthlyInflationRate, i - 1);
        const realPayment = (totalPayment + overpayment) / inflationFactor;

        schedule.push({
            month: i,
            date: dateStr,
            payment: totalPayment,
            realPayment: realPayment,
            principal: principalPayment,
            interest: interestPayment,
            overpayment: overpayment,
            balance: Math.max(0, remainingPrincipal),
            events: eventDescriptions
        });

        // Recalculate constant principal part after overpayment
        if (overpayment > 0 && remainingPrincipal > 0 && !isInHoliday) {
            if (overpaymentStrategy === 'shortenPeriod') {
                // Shorten period - principal part grows
                // Calculate new number of installments assuming principal part remains unchanged
                const estimatedMonths = Math.ceil(remainingPrincipal / constantPrincipal);
                remainingMonths = estimatedMonths;
            } else {
                // Decrease principal part - number of installments remains unchanged
                constantPrincipal = remainingPrincipal / remainingMonths;
            }
        }

        if (!isInHoliday) {
            remainingMonths--;
        }

        i++;

        // Finish if loan paid off
        if (remainingPrincipal <= 0.01) {
            break;
        }
    }

    return schedule;
}

// Helper function to calculate installment for equal installments
function calculateMonthlyPayment(principal, monthlyRate, months) {
    if (monthlyRate === 0) {
        return principal / months;
    }
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
           (Math.pow(1 + monthlyRate, months) - 1);
}

// Display results
function displayResults(schedule) {
    // Calculate sums
    const totalPayment = schedule.reduce((sum, row) => sum + row.payment + row.overpayment, 0);
    const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
    const totalPrincipal = schedule.reduce((sum, row) => sum + row.principal + row.overpayment, 0);

    // Summary
    document.getElementById('totalAmount').textContent = formatNumber(totalPayment) + ' PLN';
    document.getElementById('totalInterest').textContent = formatNumber(totalInterest) + ' PLN';
    document.getElementById('totalPrincipal').textContent = formatNumber(totalPrincipal) + ' PLN';

    // Installment count with years and months
    const totalMonths = schedule.length;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    let installmentText = totalMonths.toString();
    if (years > 0) {
        const yearText = currentLanguage === 'pl'
            ? (years === 1 ? 'rok' : years < 5 ? 'lata' : 'lat')
            : (years === 1 ? 'year' : 'years');
        installmentText += ` (${years} ${yearText}`;
        if (months > 0) {
            installmentText += ` ${months} ${currentLanguage === 'pl' ? 'mies.' : 'mo.'}`;
        }
        installmentText += ')';
    }
    document.getElementById('installmentCount').textContent = installmentText;

    // Table
    const tbody = document.getElementById('resultsTableBody');
    tbody.innerHTML = '';

    schedule.forEach(row => {
        const tr = document.createElement('tr');
        if (row.events.length > 0) {
            tr.classList.add('event-highlight');
        }

        // Calculate years and months for installment number
        const rowYears = Math.floor(row.month / 12);
        const rowMonths = row.month % 12;
        let monthText = row.month.toString();
        if (rowYears > 0) {
            monthText += ` <small style="color: #6c757d;">(${rowYears}r`;
            if (rowMonths > 0) {
                monthText += ` ${rowMonths}m`;
            }
            monthText += ')</small>';
        }

        tr.innerHTML = `
            <td>${monthText}</td>
            <td>${row.date}</td>
            <td class="bg-payment text-end">${formatNumber(row.payment + row.overpayment)}</td>
            <td class="text-primary bg-payment text-end">${formatNumber(row.realPayment)}</td>
            <td class="bg-principal text-end">${formatNumber(row.principal + row.overpayment)}</td>
            <td class="bg-interest text-end">${formatNumber(row.interest)}</td>
            <td class="text-end">${formatNumber(row.balance)}</td>
            <td>${row.events.length > 0 ? row.events.join(', ') : '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    // Show results sections
    document.getElementById('summarySection').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'block';

    // Scroll to results
    document.getElementById('summarySection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Number formatting
function formatNumber(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// ==================== LOCALSTORAGE FUNCTIONS ====================

// Get all simulations from localStorage
function getSimulations() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Save simulations to localStorage
function saveSimulations(simulations) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(simulations));
}

// Get form data
function getFormData() {
    return {
        loanAmount: parseFloat(document.getElementById('loanAmount').value),
        interestRate: parseFloat(document.getElementById('interestRate').value),
        loanPeriod: parseInt(document.getElementById('loanPeriod').value),
        installmentType: document.getElementById('installmentType').value,
        startDate: document.getElementById('startDate').value,
        inflationRate: parseFloat(document.getElementById('inflationRate').value),
        events: events
    };
}

// Set form data
function setFormData(data) {
    document.getElementById('loanAmount').value = data.loanAmount;
    document.getElementById('interestRate').value = data.interestRate;
    document.getElementById('loanPeriod').value = data.loanPeriod;
    document.getElementById('installmentType').value = data.installmentType;
    document.getElementById('startDate').value = data.startDate;
    document.getElementById('inflationRate').value = data.inflationRate;
    events = data.events || [];
    renderEvents();
}

// Show save modal
function showSaveModal() {
    document.getElementById('simulationName').value = '';
    saveModal.show();
}

// Save simulation
function saveSimulation() {
    const trans = translations[currentLanguage];
    const name = document.getElementById('simulationName').value.trim();

    if (!name) {
        alert(trans.enterSimulationName);
        return;
    }

    const simulations = getSimulations();
    const newSimulation = {
        id: Date.now(),
        name: name,
        date: new Date().toISOString(),
        data: getFormData()
    };

    simulations.push(newSimulation);
    saveSimulations(simulations);

    saveModal.hide();
    alert(trans.simulationSaved);
}

// Show load modal
function showLoadModal() {
    renderSimulationsList();
    loadModal.show();
}

// Render simulations list
function renderSimulationsList() {
    const trans = translations[currentLanguage];
    const simulations = getSimulations();
    const container = document.getElementById('simulationsList');
    const noSimulationsMsg = document.getElementById('noSimulationsMsg');

    if (simulations.length === 0) {
        container.innerHTML = '';
        noSimulationsMsg.style.display = 'block';
        return;
    }

    noSimulationsMsg.style.display = 'none';

    const locale = currentLanguage === 'pl' ? 'pl-PL' : 'en-US';
    let html = '';
    simulations.forEach(sim => {
        const date = new Date(sim.date);
        const dateStr = date.toLocaleDateString(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        html += `
            <div class="simulation-card" onclick="loadSimulation(${sim.id})">
                <div class="simulation-card-header">
                    <div>
                        <div class="simulation-name">${sim.name}</div>
                        <div class="simulation-date">${dateStr}</div>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-danger btn-delete-simulation" onclick="event.stopPropagation(); deleteSimulation(${sim.id})">
                            ${trans.btnRemove}
                        </button>
                    </div>
                </div>
                <div class="simulation-info">
                    ${trans.amount}: ${formatNumber(sim.data.loanAmount)} PLN |
                    ${trans.interestRateLabel}: ${sim.data.interestRate}% |
                    ${trans.period}: ${sim.data.loanPeriod} ${trans.months_short} |
                    ${trans.eventsCount}: ${sim.data.events.length}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Load simulation
function loadSimulation(id) {
    const simulations = getSimulations();
    const simulation = simulations.find(s => s.id === id);

    if (simulation) {
        setFormData(simulation.data);
        loadModal.hide();
    }
}

// Delete simulation
function deleteSimulation(id) {
    const trans = translations[currentLanguage];
    if (!confirm(trans.confirmDelete)) {
        return;
    }

    let simulations = getSimulations();
    simulations = simulations.filter(s => s.id !== id);
    saveSimulations(simulations);
    renderSimulationsList();
}

// Clear form
function clearSimulation() {
    const trans = translations[currentLanguage];
    if (!confirm(trans.confirmClear)) {
        return;
    }

    document.getElementById('loanAmount').value = 300000;
    document.getElementById('interestRate').value = 6.15;
    document.getElementById('loanPeriod').value = 240;
    document.getElementById('installmentType').value = 'equal';
    document.getElementById('inflationRate').value = 3.0;

    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    document.getElementById('startDate').value = currentMonth;

    events = [];
    renderEvents();

    // Hide results
    document.getElementById('summarySection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
}
