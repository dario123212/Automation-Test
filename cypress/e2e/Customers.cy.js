const TEST_DATA = {
    baseUrl: 'https://admin-stg.onehomesolution.com/customers/list',
    name: 'darjo',
    last: 'tester',
    phone: '2225555555',
    emailDomain: '@motomtech.com',
    company: 'Tester',
    lead: 'Test',
    city: 'Salt Lake City',
    state: 'UT',
    zipCode: '84105',
    nameProperty: 'Tester'
  };

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
    successToast: '.toaster > .group',
    propetyName: 'input[placeholder="Name"]',
    propertyLocation: 'button[role="combobox"]',
    propetyOption: '[role="option"]',
    tableRow: 'tr.cursor-pointer',
    deleteMenu: 'button[aria-haspopup="menu"]',
    menuItem: '[role="menuitem"]',
    
}
const MESSAGES = {
    manualAddressButton: 'Add an address manually',
    successfulToast: 'Successfully created',
    locationSelector: 'Select location',
    deleteOption: 'Delete',
    
  };

const navigateToCustomerPage = () => {
    cy.visit(`${TEST_DATA.baseUrl}`);
    cy.wait(3000);
  };

  const createCustomerProfile = () => {
   cy.get(SELECTORS.createCustomerButton)
         .click();

    cy.generateRandomNumber(10).then((randomNumber) => {
          const dynamicName = `${TEST_DATA.name}+${randomNumber}`;
          console.log('Generated name:', dynamicName);
   
    cy.get(SELECTORS.firstName)
         .click()
         .type(dynamicName);
         })

    cy.get(SELECTORS.lastName)
         .click()
         .type(TEST_DATA.last);

    cy.get(SELECTORS.phoneNumber)
         .click()
         .type(TEST_DATA.phone);

    cy.generateRandomNumber(10).then((randomNumber) => {
          const dynamicEmail = `${TEST_DATA.name}+${randomNumber}${TEST_DATA.emailDomain}`;
          console.log('Generated email:', dynamicEmail);
          
    cy.wrap(dynamicEmail).as('generatedEmail');

    cy.get(SELECTORS.emailAddress)
              .click()
              .type(dynamicEmail);
    });

    cy.get(SELECTORS.companyName)
         .click()
         .type(TEST_DATA.company);

    cy.get(SELECTORS.leadSource)
         .click()
         .type(TEST_DATA.lead);

    cy.get(SELECTORS.submitButton)
         .click();
    
         cy.wait(3000);

  };

  const createPropertyProfile = () => {

    cy.get(SELECTORS.addManually)
         .contains(MESSAGES.manualAddressButton)
         .click();

    cy.generateRandomWords(5).then((addressWords) => {
          const propertyAddress = addressWords.join(' ');
          console.log('Generated property address:', propertyAddress);
          
    cy.get(SELECTORS.propertyAddress)
          .click()
          .type(propertyAddress);
      });

    cy.get(SELECTORS.propertyCity)
          .click()
          .type(TEST_DATA.city);

    cy.get(SELECTORS.propertyState)
          .click()
          .type(TEST_DATA.state);

    cy.get(SELECTORS.propertyZipCode)
          .click()
          .type(TEST_DATA.zipCode)
    
    cy.get(SELECTORS.submitButton)
          .click();

    cy.get(SELECTORS.propertyLocation)
          .contains(MESSAGES.locationSelector)
          .click({ force: true });

    cy.get(SELECTORS.propetyOption)
         .eq(7)
         .click();

    cy.get(SELECTORS.propetyName)
          .click()
          .type(TEST_DATA.nameProperty);
        
    cy.get(SELECTORS.submitButton)
          .click()

    cy.get(SELECTORS.successToast)
          .should('be.visible')
          .and('contain', MESSAGES.successfulToast);

    cy.wait(3000);
    
  };


  const verifyCustomerCreation = () => {
     cy.get('@generatedEmail').then((email) => {
     cy.get(SELECTORS.tableRow)
        .first()
        .find('td')
        .eq(2)
        .should('contain.text', email);
});
  };
  const deleteCustomer = () => {

    cy.get(SELECTORS.tableRow)
  .first()
  .within(() => {
    cy.get(SELECTORS.deleteMenu).click({ force: true });
  });

  cy.get(SELECTORS.menuItem)
  .contains(MESSAGES.deleteOption)
  .click({force: true})
  cy.get('[role="dialog"]')                  // modal container, adjust if needed
  .within(() => {
    cy.get('button')
      .contains(MESSAGES.deleteOption)
      .click();
      cy.wait(1000)
      });
      navigateToCustomerPage();
      cy.get('@generatedEmail').then((email) => {
            cy.contains(email).should('not.exist'); // simple and effective
          });

  }
describe('Customers Test Cases', () => {
    beforeEach(() => {
        cy.Login_UI();
    });
it.only('Create a Customer & Delete it', () => {
navigateToCustomerPage();
createCustomerProfile();
createPropertyProfile();
verifyCustomerCreation();
  deleteCustomer();
})
  })