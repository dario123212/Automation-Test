const TEST_DATA = {
    baseUrl: 'https://admin-stg.onehomesolution.com',
    customer: 'Tech Dar',
    property: '10960 Chalon Rd, Los Angeles, CA 90077',
    user: 'New User',
    duration: { hours: '1', minutes: '0' }
  };
  const SELECTORS = {
    createEstimateButton: '[aria-label="Add New"]',
    customerDropdown: '.bg-gray-100 > .flex > :nth-child(2) > .inline-flex',
    propertyDropdown: '.bg-gray-100 > .flex > :nth-child(3) > .inline-flex',
    searchInput: 'input[placeholder="Search ..."]',
    submitButton: 'button[type="submit"]',
    successToast: '.toaster > .group',
    estimateSection:'div.flex.flex-col.items-center.relative.gap-2',
    estimateDateTime: 'div.text-\\[10px\\].text-center.-mx-2',
    scheduleButton: 'div.flex.flex-col.items-center button',
    smartSuggestions: 'button[aria-label="Delete schedule"]',
    userDropdown: 'button.justify-between.pl-2',
    durationHours: 'input[name="duration_hours"]',
    durationMinutes: 'input[name="duration_minutes"]',
    selectDatesButton: 'button:contains("Select dates")',
    timeSlot: 'div.p-6.py-4.px-4.flex.flex-col.gap-1.min-w-\\[180px\\].w-full',
    
    timeColumn: ':nth-child(4) > time'
  };
  const MESSAGES = {
    estimateCreated: 'Successfully created',
    estSection: 'Schedule',
    smartSuggestions: 'Smart suggestions'
  };
  beforeEach(() => {
    cy.Login_UI();
  });
  // Helper functions
  const navigateToEstimateList = () => {
    cy.visit(`${TEST_DATA.baseUrl}/jobs/estimates`);
  };
  
  const createEstimate = () => {
    cy.get(SELECTORS.createEstimateButton).click();
    
    // Select customer
    cy.get(SELECTORS.customerDropdown).click();
    cy.wait(1000);
    cy.get(SELECTORS.searchInput).type(TEST_DATA.customer);
    cy.wait(1000);
    cy.get('[role="option"]').contains(TEST_DATA.customer).click();
    cy.wait(1000);
    
    // Select property
    cy.get(SELECTORS.propertyDropdown).click();
    cy.wait(1000);
    cy.get('[role="option"]').contains(TEST_DATA.property).click();
    
    // Submit estimate creation
    cy.get(SELECTORS.submitButton).contains('Create Estimate').click();
  };

  const verifyEstimateCreation = () => {
    cy.get(SELECTORS.successToast)
      .should('be.visible')
      .and('contain', MESSAGES.estimateCreated);
    
    cy.get(SELECTORS.estimateSection)
      .should('exist')
      .and('contain', MESSAGES.estSection);
    
    // Verify that a date/time exists without checking the specific date
    
};

  const scheduleAppointment = () => {
    // Click schedule button
    cy.get(SELECTORS.scheduleButton).first().click();
    
    // Access smart suggestions
    cy.get(SELECTORS.smartSuggestions)
      .should('contain', MESSAGES.smartSuggestions)
      .click();
    
    // Select user
    cy.get(SELECTORS.userDropdown).eq(1).click();
    cy.get(SELECTORS.searchInput).type(TEST_DATA.user);
    cy.wait(1000);
    cy.realPress('ArrowDown')
    cy.realPress('Enter');
    
    // Set duration
    cy.get(SELECTORS.durationHours).clear().type(TEST_DATA.duration.hours);
    cy.get(SELECTORS.durationMinutes).clear().type(TEST_DATA.duration.minutes);
    
    // Select date range
    cy.contains('button', 'Select dates').click();
    cy.generateRandomFutureDates().then(({ first, second }) => {
      cy.contains('button', new RegExp(`^${first.day}$`)).click({ force: true });
      cy.contains('button', new RegExp(`^${second.day}$`)).click({ force: true });
    });
    
    // Select time slot
    cy.get(SELECTORS.timeSlot).first().click();
    
    // Verify appointment creation
    cy.get(SELECTORS.successToast)
      .should('be.visible')
      .and('contain', MESSAGES.estimateCreated);
  };
  const captureScheduledTime = () => {
    return cy.get(SELECTORS.estimateDateTime)
      .invoke('text')
      .then((text) => {
        const formatted = text.trim().split(' (')[0];
        return cy.wrap(formatted);
      });
  };
  const verifyEstimateInMainTable = (scheduledTime) => {
    navigateToEstimateList();
    cy.wait(3000); // Consider replacing with better wait strategy
    
    cy.get(SELECTORS.timeColumn)
      .first()
      .invoke('text')
      .should('contain', scheduledTime);
  };

  it('should create a estimate successfully', () => {
    navigateToEstimateList();
    createEstimate();
    verifyEstimateCreation();
  });

  it('should create job and schedule appointment', () => {
    navigateToEstimateList();
    createEstimate();
    scheduleAppointment();
    verifyEstimateCreation();
    
    
    // Capture and verify scheduled time
    captureScheduledTime().then((scheduledTime) => {
      verifyEstimateInMainTable(scheduledTime);
    });
  });
