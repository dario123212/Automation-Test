describe("Jobs", () => {
  // Test data used throughout the test cases
  const TEST_DATA = {
    baseUrl: "https://admin-stg.onehomesolution.com",
    customer: "Tech Dar",
    property: "10960 Chalon Rd, Los Angeles, CA 90077",
    user: "New User",
    duration: { hours: "1", minutes: "0" },
  };
  // Commonly used selectors stored in a constant for easy reuse
  const SELECTORS = {
    createJobButton: '[data-testid="create-job-btn"], .py-4 > .bg-primary',
    customerDropdown: ".bg-gray-100 > .flex > :nth-child(2) > .inline-flex",
    propertyDropdown: ".bg-gray-100 > .flex > :nth-child(3) > .inline-flex",
    searchInput: 'input[placeholder="Search ..."]',
    submitButton: 'button[type="submit"]',
    successToast: ".toaster > .group",
    appointmentsSection: ":nth-child(2) > .flex > .text-2xl",
    scheduleButton: "div.flex.flex-col.items-center button",
    smartSuggestions: 'button[aria-label="Delete schedule"]',
    userDropdown: "button.justify-between.pl-2",
    durationHours: 'input[name="duration_hours"]',
    durationMinutes: 'input[name="duration_minutes"]',
    selectDatesButton: 'button:contains("Select dates")',
    timeSlot: "div.p-6.py-4.px-4.flex.flex-col.gap-1.min-w-\\[180px\\].w-full",
    jobRow: 'tr[data-has-link="true"]',
    timeColumn: ":nth-child(4) > time",
  };
  // Expected messages used in assertions
  const MESSAGES = {
    jobCreated: "Successfully created",
    appointments: "Appointments",
    smartSuggestions: "Smart suggestions",
  };

  beforeEach(() => {
    cy.Login_UI();
  });

  // Helper functions
  const navigateToJobsList = () => {
    cy.visit(`${TEST_DATA.baseUrl}/jobs/list`);
  };
  // Function to create a job
  const createJob = () => {
    cy.get(SELECTORS.createJobButton).click();

    // Select customer
    cy.get(SELECTORS.customerDropdown).click();
    cy.get(SELECTORS.searchInput).type(TEST_DATA.customer);
    cy.get('[role="option"]').contains(TEST_DATA.customer).click();

    // Select property
    cy.get(SELECTORS.propertyDropdown).click();
    cy.get('[role="option"]').contains(TEST_DATA.property).click();

    // Submit job creation
    cy.get(SELECTORS.submitButton).contains("Create Job").click();
  };
  // Verification that the new job was created
  const verifyJobCreation = () => {
    cy.get(SELECTORS.successToast)
      .should("be.visible")
      .and("contain", MESSAGES.jobCreated);

    cy.get(SELECTORS.appointmentsSection)
      .should("exist")
      .and("contain", MESSAGES.appointments);
  };
  // Creating a schedule for the new job
  const scheduleAppointment = () => {
    // Click schedule button
    cy.get(SELECTORS.scheduleButton).first().click();

    // Access smart suggestions
    cy.get(SELECTORS.smartSuggestions)
      .should("contain", MESSAGES.smartSuggestions)
      .click();

    // Select user
    cy.get(SELECTORS.userDropdown).eq(1).click();
    cy.get(SELECTORS.searchInput).type(TEST_DATA.user);
    cy.get('[role="option"]').contains(TEST_DATA.user).click();

    // Set duration
    cy.get(SELECTORS.durationHours).clear().type(TEST_DATA.duration.hours);
    cy.get(SELECTORS.durationMinutes).clear().type(TEST_DATA.duration.minutes);

    // Select date range
    cy.contains("button", "Select dates").click();
    cy.generateRandomFutureDates().then(({ first, second }) => {
      cy.contains("button", new RegExp(`^${first.day}$`)).click({
        force: true,
      });
      cy.contains("button", new RegExp(`^${second.day}$`)).click({
        force: true,
      });
    });

    // Select time slot
    cy.get(SELECTORS.timeSlot).first().click();

    // Verify appointment creation
    cy.get(SELECTORS.successToast)
      .should("be.visible")
      .and("contain", MESSAGES.jobCreated);
  };
  // Saving the date of the new job
  const captureScheduledTime = () => {
    return cy
      .get(SELECTORS.jobRow)
      .first()
      .find("td")
      .eq(2)
      .invoke("text")
      .then((text) => {
        const formatted = text.trim().split(" (")[0];
        return cy.wrap(formatted);
      });
  };
  // Verifyin the new job in the job list
  const verifyJobInMainTable = (scheduledTime) => {
    navigateToJobsList();

    cy.get(SELECTORS.timeColumn)
      .first()
      .invoke("text")
      .should("contain", scheduledTime);
  };

  it("should create a job successfully", () => {
    navigateToJobsList(); // Go to the Jobs list page
    createJob(); // Fill out and submit the job creation form
    verifyJobCreation(); // Confirm the job was created (e.g., toast or list entry)
  });

  // Test case: Creates a job, then schedules an appointment for it
  it("should create job and schedule appointment", () => {
    navigateToJobsList(); // Navigate to the Jobs list page
    createJob(); // Perform the job creation process
    verifyJobCreation(); // Verify successful job creation
    scheduleAppointment(); // Schedule an appointment for the created job

    // Capture and verify scheduled time
    captureScheduledTime().then((scheduledTime) => {
      verifyJobInMainTable(scheduledTime);
    });
  });
});
