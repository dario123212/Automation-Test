const TEST_DATA = {
    baseUrl: 'https://admin-stg.onehomesolution.com/customers/list',
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

}
const MESSAGES = {
    manualAddressButton: 'Add an address manually',
    successfulToast: 'Successfully created',
  };

const navigateToCustomerPage = () => {
    cy.visit(`${TEST_DATA.baseUrl}`);
    cy.wait(3000);
  };

  // Calling a random number
//   cy.generateRandomNumber().then((number) => {
//     console.log('Random number:', number); // e.g., "3847592016"
//     cy.get('input[name="phone"]').type(number);
//   });

  // Generating 5 random strings
// cy.generateRandomWords().then((words) => {
//     console.log('Random words:', words);
//     cy.get('input[name="first_name"]').type(words.join(' ')); // Types all words with spaces
//   });

describe('Customers Test Cases', () => {
    beforeEach(() => {
        cy.Login_UI();
    });
it('Create a Customer', () => {
navigateToCustomerPage();
})
  })