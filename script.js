// Stan aplikacji
let events = [];
let eventModal;
let saveModal;
let loadModal;
const STORAGE_KEY = 'mortgageSimulations';

// Inicjalizacja
document.addEventListener('DOMContentLoaded', function() {
    // Ustawienie domyślnej daty na aktualny miesiąc
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    document.getElementById('startDate').value = currentMonth;

    // Inicjalizacja modali Bootstrap
    eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    saveModal = new bootstrap.Modal(document.getElementById('saveModal'));
    loadModal = new bootstrap.Modal(document.getElementById('loadModal'));

    // Event listenery
    document.getElementById('addEventBtn').addEventListener('click', showEventModal);
    document.getElementById('saveEventBtn').addEventListener('click', saveEvent);
    document.getElementById('calculateBtn').addEventListener('click', calculateLoan);
    document.getElementById('eventType').addEventListener('change', updateEventForm);
    document.getElementById('isRecurring').addEventListener('change', function() {
        const recurringOptions = document.getElementById('recurringOptions');
        recurringOptions.style.display = this.checked ? 'block' : 'none';
    });

    // Event listenery dla zapisywania/wczytywania
    document.getElementById('saveBtn').addEventListener('click', showSaveModal);
    document.getElementById('loadBtn').addEventListener('click', showLoadModal);
    document.getElementById('clearBtn').addEventListener('click', clearSimulation);
    document.getElementById('confirmSaveBtn').addEventListener('click', saveSimulation);
});

// Pokaż modal wydarzenia
function showEventModal() {
    // Reset checkboxa i ukrycie opcji cyklicznych
    document.getElementById('isRecurring').checked = false;
    document.getElementById('recurringOptions').style.display = 'none';

    updateEventForm();
    eventModal.show();
}

// Aktualizuj formularz wydarzenia w zależności od typu
function updateEventForm() {
    const eventType = document.getElementById('eventType').value;
    const newRateGroup = document.getElementById('newRateGroup');
    const overpaymentGroup = document.getElementById('overpaymentGroup');
    const loanHolidayGroup = document.getElementById('loanHolidayGroup');
    const periodChangeGroup = document.getElementById('periodChangeGroup');
    const inflationChangeGroup = document.getElementById('inflationChangeGroup');

    // Ukryj wszystkie
    newRateGroup.style.display = 'none';
    overpaymentGroup.style.display = 'none';
    loanHolidayGroup.style.display = 'none';
    periodChangeGroup.style.display = 'none';
    inflationChangeGroup.style.display = 'none';

    // Pokaż odpowiednie
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

// Zapisz wydarzenie
function saveEvent() {
    const eventType = document.getElementById('eventType').value;
    const month = parseInt(document.getElementById('eventMonth').value);

    if (month < 1) {
        alert('Numer raty musi być większy od 0');
        return;
    }

    if (eventType === 'rateChange') {
        const newRate = parseFloat(document.getElementById('newRate').value);
        if (newRate < 0) {
            alert('Oprocentowanie nie może być ujemne');
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
            alert('Kwota nadpłaty musi być większa od 0');
            return;
        }
        const strategy = document.getElementById('overpaymentStrategy').value;
        const isRecurring = document.getElementById('isRecurring').checked;

        if (isRecurring) {
            const frequency = parseInt(document.getElementById('recurringFrequency').value);
            const count = parseInt(document.getElementById('recurringCount').value);

            if (frequency < 1 || count < 1) {
                alert('Częstotliwość i liczba powtórzeń muszą być większe od 0');
                return;
            }

            // Tworzenie wielu wydarzeń nadpłaty
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
            alert('Czas trwania urlopu musi być co najmniej 1 miesiąc');
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
            alert('Liczba rat musi być większa od 0');
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
            alert('Inflacja nie może być ujemna');
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

// Renderuj listę wydarzeń
function renderEvents() {
    const tbody = document.getElementById('eventsTableBody');
    const noEventsRow = document.getElementById('noEventsRow');

    // Usuń wszystkie wiersze oprócz noEventsRow
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

    let html = '';
    events.forEach(event => {
        let typeName = '';
        let details = '';

        if (event.type === 'rateChange') {
            typeName = 'Zmiana oprocentowania';
            details = `Nowe oprocentowanie: ${event.newRate}%`;
        } else if (event.type === 'overpayment') {
            typeName = event.isRecurring ? `Nadpłata cykliczna (${event.recurringIndex}/${event.recurringTotal})` : 'Nadpłata';
            const strategyText = event.strategy === 'shortenPeriod' ? 'Skrócenie okresu' : 'Zmniejszenie raty';
            details = `${formatNumber(event.amount)} PLN, ${strategyText}`;
        } else if (event.type === 'loanHoliday') {
            typeName = 'Urlop kredytowy';
            details = `${event.duration} mies.`;
        } else if (event.type === 'periodChange') {
            typeName = 'Zmiana liczby rat';
            details = `Nowa liczba rat: ${event.newPeriod}`;
        } else if (event.type === 'inflationChange') {
            typeName = 'Zmiana inflacji';
            details = `Nowa inflacja: ${event.newInflation}%`;
        }

        html += `
            <tr>
                <td>${event.month}</td>
                <td><span class="event-type-badge">${typeName}</span></td>
                <td>${details}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeEvent(${event.id})">
                        Usuń
                    </button>
                </td>
            </tr>
        `;
    });

    // Dodaj nowe wiersze
    tbody.insertAdjacentHTML('beforeend', html);
}

// Usuń wydarzenie
function removeEvent(eventId) {
    events = events.filter(e => e.id !== eventId);
    renderEvents();
}

// Główna funkcja kalkulacji kredytu
function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value);
    const loanPeriod = parseInt(document.getElementById('loanPeriod').value);
    const installmentType = document.getElementById('installmentType').value;
    const startDateStr = document.getElementById('startDate').value;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value);

    // Walidacja
    if (!loanAmount || !annualRate || !loanPeriod || !startDateStr) {
        alert('Proszę wypełnić wszystkie pola');
        return;
    }

    if (loanAmount <= 0 || loanPeriod <= 0) {
        alert('Kwota kredytu i okres muszą być większe od 0');
        return;
    }

    // Parsowanie daty startowej
    const [startYear, startMonth] = startDateStr.split('-').map(Number);

    // Kalkulacja
    let schedule;
    if (installmentType === 'equal') {
        schedule = calculateEqualInstallments(loanAmount, annualRate, loanPeriod, startYear, startMonth, inflationRate);
    } else {
        schedule = calculateDecreasingInstallments(loanAmount, annualRate, loanPeriod, startYear, startMonth, inflationRate);
    }

    // Wyświetlenie wyników
    displayResults(schedule);
}

// Kalkulacja rat równych (annuitetowych)
function calculateEqualInstallments(principal, annualRate, months, startYear, startMonth, inflationRate) {
    const schedule = [];
    let remainingPrincipal = principal;
    let currentRate = annualRate;
    let currentInflation = inflationRate;
    const monthlyRate = annualRate / 100 / 12;

    // Obliczenie początkowej raty
    let monthlyPayment = calculateMonthlyPayment(principal, monthlyRate, months);
    let remainingMonths = months;
    let i = 1;
    let isInHoliday = false;
    let holidayEndMonth = 0;

    while (remainingPrincipal > 0.01 && i <= months + 1000) { // Dodajemy limit bezpieczeństwa
        // Sprawdź wydarzenia dla tego miesiąca
        const monthEvents = events.filter(e => e.month === i);
        let eventDescriptions = [];

        // Obsługa zmiany oprocentowania
        monthEvents.forEach(event => {
            if (event.type === 'rateChange') {
                currentRate = event.newRate;
                const newMonthlyRate = currentRate / 100 / 12;
                monthlyPayment = calculateMonthlyPayment(remainingPrincipal, newMonthlyRate, remainingMonths);
                eventDescriptions.push(`Zmiana na ${currentRate}%`);
            }
        });

        // Obsługa zmiany inflacji
        monthEvents.forEach(event => {
            if (event.type === 'inflationChange') {
                currentInflation = event.newInflation;
                eventDescriptions.push(`Inflacja ${currentInflation}%`);
            }
        });

        // Obsługa zmiany liczby rat
        monthEvents.forEach(event => {
            if (event.type === 'periodChange') {
                remainingMonths = event.newPeriod;
                const currentMonthlyRate = currentRate / 100 / 12;
                monthlyPayment = calculateMonthlyPayment(remainingPrincipal, currentMonthlyRate, remainingMonths);
                eventDescriptions.push(`Rozłożenie na ${event.newPeriod} rat`);
            }
        });

        // Obsługa urlopu kredytowego
        monthEvents.forEach(event => {
            if (event.type === 'loanHoliday') {
                isInHoliday = true;
                holidayEndMonth = i + event.duration - 1;
                eventDescriptions.push(`Początek urlopu (${event.duration} mies.)`);
            }
        });

        // Obliczenie odsetek i kapitału
        const currentMonthlyRate = currentRate / 100 / 12;
        const interestPayment = remainingPrincipal * currentMonthlyRate;
        let principalPayment = 0;
        let totalPayment = interestPayment;

        // Podczas urlopu kredytowego płacimy tylko odsetki
        if (isInHoliday) {
            principalPayment = 0;
            totalPayment = interestPayment;
            if (i === holidayEndMonth) {
                isInHoliday = false;
                eventDescriptions.push('Koniec urlopu');
                // Przelicz ratę po urlopie
                monthlyPayment = calculateMonthlyPayment(remainingPrincipal, currentMonthlyRate, remainingMonths);
            }
        } else {
            principalPayment = monthlyPayment - interestPayment;

            // Korekta dla ostatniej raty
            if (principalPayment > remainingPrincipal) {
                principalPayment = remainingPrincipal;
                monthlyPayment = principalPayment + interestPayment;
            }

            totalPayment = principalPayment + interestPayment;
        }

        // Obsługa nadpłat
        let overpayment = 0;
        let overpaymentStrategy = 'shortenPeriod'; // Domyślna strategia
        let plannedOverpayment = 0;
        monthEvents.forEach(event => {
            if (event.type === 'overpayment') {
                plannedOverpayment += event.amount;
                overpaymentStrategy = event.strategy; // Pobieramy strategię z wydarzenia
            }
        });

        // Ograniczenie nadpłaty do pozostałego kapitału po spłacie raty
        const remainingAfterInstallment = remainingPrincipal - principalPayment;
        overpayment = Math.min(plannedOverpayment, Math.max(0, remainingAfterInstallment));

        // Dodanie komunikatu o nadpłacie
        if (overpayment > 0) {
            if (overpayment < plannedOverpayment) {
                eventDescriptions.push(`Nadpłata ${formatNumber(overpayment)} PLN (plan: ${formatNumber(plannedOverpayment)} PLN)`);
            } else {
                eventDescriptions.push(`Nadpłata ${formatNumber(overpayment)} PLN`);
            }
        }

        remainingPrincipal -= principalPayment + overpayment;

        // Obliczenie daty
        const date = new Date(startYear, startMonth - 1 + i - 1);
        const dateStr = `${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

        // Obliczenie raty realnej (uwzględniającej inflację)
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

        // Przeliczenie raty jeśli była nadpłata
        if (overpayment > 0 && remainingPrincipal > 0 && !isInHoliday) {
            if (overpaymentStrategy === 'shortenPeriod') {
                // Skrócenie okresu - rata pozostaje taka sama, zmniejsza się liczba rat
                // Obliczamy ile rat zostało przy obecnej racie
                const currentMonthlyRate = currentRate / 100 / 12;
                if (currentMonthlyRate > 0 && monthlyPayment > remainingPrincipal * currentMonthlyRate) {
                    remainingMonths = Math.ceil(
                        Math.log(monthlyPayment / (monthlyPayment - remainingPrincipal * currentMonthlyRate)) /
                        Math.log(1 + currentMonthlyRate)
                    );
                }
            } else {
                // Zmniejszenie raty - liczba rat pozostaje bez zmian
                monthlyPayment = calculateMonthlyPayment(remainingPrincipal, currentMonthlyRate, remainingMonths);
            }
        }

        if (!isInHoliday) {
            remainingMonths--;
        }

        i++;

        // Zakończ jeśli kredyt spłacony
        if (remainingPrincipal <= 0.01) {
            break;
        }
    }

    return schedule;
}

// Kalkulacja rat malejących
function calculateDecreasingInstallments(principal, annualRate, months, startYear, startMonth, inflationRate) {
    const schedule = [];
    let remainingPrincipal = principal;
    let currentRate = annualRate;
    let currentInflation = inflationRate;
    let constantPrincipal = principal / months;
    let remainingMonths = months;
    let i = 1;
    let isInHoliday = false;
    let holidayEndMonth = 0;

    while (remainingPrincipal > 0.01 && i <= months + 1000) { // Dodajemy limit bezpieczeństwa
        // Sprawdź wydarzenia dla tego miesiąca
        const monthEvents = events.filter(e => e.month === i);
        let eventDescriptions = [];

        // Obsługa zmiany oprocentowania
        monthEvents.forEach(event => {
            if (event.type === 'rateChange') {
                currentRate = event.newRate;
                eventDescriptions.push(`Zmiana na ${currentRate}%`);
            }
        });

        // Obsługa zmiany inflacji
        monthEvents.forEach(event => {
            if (event.type === 'inflationChange') {
                currentInflation = event.newInflation;
                eventDescriptions.push(`Inflacja ${currentInflation}%`);
            }
        });

        // Obsługa zmiany liczby rat
        monthEvents.forEach(event => {
            if (event.type === 'periodChange') {
                remainingMonths = event.newPeriod;
                constantPrincipal = remainingPrincipal / remainingMonths;
                eventDescriptions.push(`Rozłożenie na ${event.newPeriod} rat`);
            }
        });

        // Obsługa urlopu kredytowego
        monthEvents.forEach(event => {
            if (event.type === 'loanHoliday') {
                isInHoliday = true;
                holidayEndMonth = i + event.duration - 1;
                eventDescriptions.push(`Początek urlopu (${event.duration} mies.)`);
            }
        });

        // Obliczenie odsetek i kapitału
        const currentMonthlyRate = currentRate / 100 / 12;
        const interestPayment = remainingPrincipal * currentMonthlyRate;
        let principalPayment = 0;
        let totalPayment = interestPayment;

        // Podczas urlopu kredytowego płacimy tylko odsetki
        if (isInHoliday) {
            principalPayment = 0;
            totalPayment = interestPayment;
            if (i === holidayEndMonth) {
                isInHoliday = false;
                eventDescriptions.push('Koniec urlopu');
                // Przelicz stałą część kapitałową po urlopie
                constantPrincipal = remainingPrincipal / remainingMonths;
            }
        } else {
            // Korekta stałej części kapitałowej
            principalPayment = Math.min(constantPrincipal, remainingPrincipal);
            totalPayment = principalPayment + interestPayment;
        }

        // Obsługa nadpłat
        let overpayment = 0;
        let overpaymentStrategy = 'shortenPeriod'; // Domyślna strategia
        let plannedOverpayment = 0;
        monthEvents.forEach(event => {
            if (event.type === 'overpayment') {
                plannedOverpayment += event.amount;
                overpaymentStrategy = event.strategy; // Pobieramy strategię z wydarzenia
            }
        });

        // Ograniczenie nadpłaty do pozostałego kapitału po spłacie raty
        const remainingAfterInstallment = remainingPrincipal - principalPayment;
        overpayment = Math.min(plannedOverpayment, Math.max(0, remainingAfterInstallment));

        // Dodanie komunikatu o nadpłacie
        if (overpayment > 0) {
            if (overpayment < plannedOverpayment) {
                eventDescriptions.push(`Nadpłata ${formatNumber(overpayment)} PLN (plan: ${formatNumber(plannedOverpayment)} PLN)`);
            } else {
                eventDescriptions.push(`Nadpłata ${formatNumber(overpayment)} PLN`);
            }
        }

        remainingPrincipal -= principalPayment + overpayment;

        // Obliczenie daty
        const date = new Date(startYear, startMonth - 1 + i - 1);
        const dateStr = `${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

        // Obliczenie raty realnej (uwzględniającej inflację)
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

        // Przeliczenie stałej części kapitałowej po nadpłacie
        if (overpayment > 0 && remainingPrincipal > 0 && !isInHoliday) {
            if (overpaymentStrategy === 'shortenPeriod') {
                // Skrócenie okresu - część kapitałowa rośnie
                // Obliczamy nową liczbę rat zakładając że część kapitałowa pozostaje bez zmian
                const estimatedMonths = Math.ceil(remainingPrincipal / constantPrincipal);
                remainingMonths = estimatedMonths;
            } else {
                // Zmniejszenie części kapitałowej - liczba rat pozostaje bez zmian
                constantPrincipal = remainingPrincipal / remainingMonths;
            }
        }

        if (!isInHoliday) {
            remainingMonths--;
        }

        i++;

        // Zakończ jeśli kredyt spłacony
        if (remainingPrincipal <= 0.01) {
            break;
        }
    }

    return schedule;
}

// Pomocnicza funkcja do obliczenia raty dla rat równych
function calculateMonthlyPayment(principal, monthlyRate, months) {
    if (monthlyRate === 0) {
        return principal / months;
    }
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
           (Math.pow(1 + monthlyRate, months) - 1);
}

// Wyświetlenie wyników
function displayResults(schedule) {
    // Obliczenie sum
    const totalPayment = schedule.reduce((sum, row) => sum + row.payment + row.overpayment, 0);
    const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
    const totalPrincipal = schedule.reduce((sum, row) => sum + row.principal + row.overpayment, 0);

    // Podsumowanie
    document.getElementById('totalAmount').textContent = formatNumber(totalPayment) + ' PLN';
    document.getElementById('totalInterest').textContent = formatNumber(totalInterest) + ' PLN';
    document.getElementById('totalPrincipal').textContent = formatNumber(totalPrincipal) + ' PLN';

    // Liczba rat z latami i miesiącami
    const totalMonths = schedule.length;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    let installmentText = totalMonths.toString();
    if (years > 0) {
        installmentText += ` (${years} ${years === 1 ? 'rok' : years < 5 ? 'lata' : 'lat'}`;
        if (months > 0) {
            installmentText += ` ${months} mies.`;
        }
        installmentText += ')';
    }
    document.getElementById('installmentCount').textContent = installmentText;

    // Tabela
    const tbody = document.getElementById('resultsTableBody');
    tbody.innerHTML = '';

    schedule.forEach(row => {
        const tr = document.createElement('tr');
        if (row.events.length > 0) {
            tr.classList.add('event-highlight');
        }

        // Oblicz lata i miesiące dla numeru raty
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

    // Pokaż sekcje wyników
    document.getElementById('summarySection').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'block';

    // Scroll do wyników
    document.getElementById('summarySection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Formatowanie liczb
function formatNumber(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// ==================== FUNKCJE LOCALSTORAGE ====================

// Pobierz wszystkie symulacje z localStorage
function getSimulations() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Zapisz symulacje do localStorage
function saveSimulations(simulations) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(simulations));
}

// Pobierz dane formularza
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

// Ustaw dane formularza
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

// Pokaż modal zapisu
function showSaveModal() {
    document.getElementById('simulationName').value = '';
    saveModal.show();
}

// Zapisz symulację
function saveSimulation() {
    const name = document.getElementById('simulationName').value.trim();

    if (!name) {
        alert('Proszę podać nazwę symulacji');
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
    alert('Symulacja została zapisana!');
}

// Pokaż modal wczytywania
function showLoadModal() {
    renderSimulationsList();
    loadModal.show();
}

// Renderuj listę symulacji
function renderSimulationsList() {
    const simulations = getSimulations();
    const container = document.getElementById('simulationsList');
    const noSimulationsMsg = document.getElementById('noSimulationsMsg');

    if (simulations.length === 0) {
        container.innerHTML = '';
        noSimulationsMsg.style.display = 'block';
        return;
    }

    noSimulationsMsg.style.display = 'none';

    let html = '';
    simulations.forEach(sim => {
        const date = new Date(sim.date);
        const dateStr = date.toLocaleDateString('pl-PL', {
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
                            Usuń
                        </button>
                    </div>
                </div>
                <div class="simulation-info">
                    Kwota: ${formatNumber(sim.data.loanAmount)} PLN |
                    Oprocentowanie: ${sim.data.interestRate}% |
                    Okres: ${sim.data.loanPeriod} mies. |
                    Wydarzenia: ${sim.data.events.length}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Wczytaj symulację
function loadSimulation(id) {
    const simulations = getSimulations();
    const simulation = simulations.find(s => s.id === id);

    if (simulation) {
        setFormData(simulation.data);
        loadModal.hide();
    }
}

// Usuń symulację
function deleteSimulation(id) {
    if (!confirm('Czy na pewno chcesz usunąć tę symulację?')) {
        return;
    }

    let simulations = getSimulations();
    simulations = simulations.filter(s => s.id !== id);
    saveSimulations(simulations);
    renderSimulationsList();
}

// Wyczyść formularz
function clearSimulation() {
    if (!confirm('Czy na pewno chcesz wyczyścić obecne ustawienia?\n\nZapisane symulacje NIE zostaną usunięte.')) {
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

    // Ukryj wyniki
    document.getElementById('summarySection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
}
