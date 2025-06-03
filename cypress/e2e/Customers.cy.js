// Test data used throughout the test cases
const TEST_DATA = {
  baseUrl: "https://admin-stg.onehomesolution.com/customers/list",
  propertyUrl: "https://admin-stg.onehomesolution.com/customers/properties",
  name: "darjo",
  last: "tester",
  phone: "2225555555",
  emailDomain: "@motomtech.com",
  company: "Tester",
  lead: "Test",
  city: "Salt Lake City",
  state: "UT",
  zipCode: "84105",
  nameProperty: "Tester",
  customerProperty: "Darjo Newer",
};
// Commonly used selectors stored in a constant for easy reuse
const SELECTORS = {
  createCustomerButton: '[aria-label="Add New"]',
  firstName: 'input[name="first_name"]',
  lastName: 'input[name="last_name"]',
  phoneNumber: 'input[name="phone"]',
  emailAddress: 'input[name="email"]',
  companyName: 'input[name="company"]',
  leadSource: 'input[name="lead_source"]',
  submitButton: 'button[type="submit"]',
  addManually: 'button[type="button"]',
  propertyAddress: 'input[name="street"]',
  propertyCity: 'input[name="city"]',
  propertyState: 'input[name="state"]',
  propertyZipCode: 'input[name="zip_code"]',
  successToast: ".toaster > .group",
  propetyName: 'input[placeholder="Name"]',
  propertyLocation: 'button[role="combobox"]',
  propetyOption: '[role="option"]',
  tableRow: "tr.cursor-pointer",
  deleteMenu: 'button[aria-haspopup="menu"]',
  menuItem: '[role="menuitem"]',
  propertyButton: 'a[href$="/profile/new-property" i]',
  searchInput: 'input[placeholder="Search ..."]',
};
// Expected messages used in assertions
const MESSAGES = {
  manualAddressButton: "Add an address manually",
  successfulToast: "Successfully created",
  locationSelector: "Select location",
  deleteOption: "Delete",
};
//Navigate to Customer List
const navigateToCustomerPage = () => {
  cy.visit(`${TEST_DATA.baseUrl}`);
};
// Navigate to Property List and opens the Create Property Modal. Added the button just cause of the main function for creating the property can't have it as it is used on another function which doesn't have the button
const navigateToPropertyList = () => {
  cy.visit(TEST_DATA.propertyUrl);
  cy.get(SELECTORS.createCustomerButton).click();
};
// Assertion for the customer button when creating a property. If it doesn't, it means that it belongs to the property creation after creating a customer account. If it does it means it is just property creation for an existing customer.
const clickIfSelectCustomerButtonExists = () => {
  cy.get("body").then(($body) => {
    if ($body.find('button:contains("Select Customer")').length > 0) {
      cy.contains("button", "Select Customer").click();
      cy.get(SELECTORS.searchInput).type(TEST_DATA.customerProperty);
      cy.get('[role="option"]').contains(TEST_DATA.customerProperty).click();
    } else {
      cy.log("Select Customer button not found, moving on...");
    }
  });
};
// Creates a customer profile with dynamically generated name and email
const createCustomerProfile = () => {
  cy.get(SELECTORS.createCustomerButton).click();
  // Generate a random name and type it into the First Name field
  cy.generateRandomNumber(10).then((randomNumber) => {
    const dynamicName = `${TEST_DATA.name}+${randomNumber}`;
    console.log("Generated name:", dynamicName);

    cy.get(SELECTORS.firstName).click().type(dynamicName);
  });

  cy.get(SELECTORS.lastName).click().type(TEST_DATA.last);

  cy.get(SELECTORS.phoneNumber).click().type(TEST_DATA.phone);
  // Generate a unique email and type it
  cy.generateRandomNumber(10).then((randomNumber) => {
    const dynamicEmail = `${TEST_DATA.name}+${randomNumber}${TEST_DATA.emailDomain}`;
    console.log("Generated email:", dynamicEmail);

    cy.wrap(dynamicEmail).as("generatedEmail");

    cy.get(SELECTORS.emailAddress).click().type(dynamicEmail);
  });

  cy.get(SELECTORS.companyName).click().type(TEST_DATA.company);

  cy.get(SELECTORS.leadSource).click().type(TEST_DATA.lead);

  cy.get(SELECTORS.submitButton).click();
};
// Creates a property profile with a random address
const createPropertyProfile = () => {
  cy.get(SELECTORS.addManually).contains(MESSAGES.manualAddressButton).click();
  // Generate a random address and type it
  cy.generateRandomWords(5).then((addressWords) => {
    const propertyAddress = addressWords.join(" ");
    console.log("Generated property address:", propertyAddress);

    cy.get(SELECTORS.propertyAddress).click().type(propertyAddress);
  });

  cy.get(SELECTORS.propertyCity).click().type(TEST_DATA.city);

  cy.get(SELECTORS.propertyState).click().type(TEST_DATA.state);

  cy.get(SELECTORS.propertyZipCode).click().type(TEST_DATA.zipCode);

  cy.get(SELECTORS.submitButton).click();

  cy.get(SELECTORS.propertyLocation)
    .contains(MESSAGES.locationSelector)
    .click({ force: true });

  cy.get(SELECTORS.propetyOption).eq(7).click();

  clickIfSelectCustomerButtonExists();

  cy.get(SELECTORS.propetyName).click().type(TEST_DATA.nameProperty);

  cy.get(SELECTORS.submitButton).click();

  cy.get(SELECTORS.successToast)
    .should("be.visible")
    .and("contain", MESSAGES.successfulToast);
};
// Verifies if the new generated customer email appears in the first table row of the customer list after creation
const verifyCustomerCreation = () => {
  cy.get("@generatedEmail").then((email) => {
    cy.get(SELECTORS.tableRow)
      .first()
      .find("td")
      .eq(2)
      .should("contain.text", email);
  });
};
// Deletes the new customer after creation
const deleteCustomer = () => {
  cy.get(SELECTORS.tableRow)
    .first()
    .within(() => {
      cy.get(SELECTORS.deleteMenu).click({ force: true });
    });

  cy.get(SELECTORS.menuItem)
    .contains(MESSAGES.deleteOption)
    .click({ force: true });
  cy.get('[role="dialog"]') // modal container, adjust if needed
    .within(() => {
      cy.get("button").contains(MESSAGES.deleteOption).click();
    });
  navigateToCustomerPage();
  cy.get("@generatedEmail").then((email) => {
    cy.contains(email).should("not.exist"); // simple and effective
  });
};
describe("Customers Test Cases", () => {
  beforeEach(() => {
    cy.Login_UI();
  });
  it("Create a Customer & Delete it", () => {
    navigateToCustomerPage(); // Navigate to customer list
    createCustomerProfile(); // Create a new customer
    createPropertyProfile(); // Creating property for this new customer (same flow)
    verifyCustomerCreation(); // Verify the new customer is in the list
    deleteCustomer(); // Delete the new customer and verify removal
  });

  it("Create a Property & Delete it", () => {
    navigateToPropertyList(); // Go to property list
    createPropertyProfile(); // Create a new property (different flow from customer creation)
  });
});
