const TEST_DATA = {
    baseUrl: 'https://admin-stg.onehomesolution.com/signin',
    existingEmail: 'superadmin@gmail.com',
    nonExistentEmail: 'darjo+2342423555@motomtech.com',
    password: 'Test1234!',
  };

const SELECTORS = { 
    websiteEmail: 'input[name="email"]',
    websitePassword: 'input[name="password"]',
    submitButton: 'button[type="submit"]',
    forgetPassword: '.ext-black',
    userMenu: '.aspect-square',
    userMenuItem: 'div[role="menuitem"]',
    successToast: '.toaster > .group',
    assertiveElement: '.grid',
    loginAssertion: '.text-5xl',
    existingEmailMessage: '.basis-0 > .justify-start > .flex > div > :nth-child(1)',
    nonExistingEmailMessage: '.text-sm',
    loginElement: '.grid'

}
const MESSAGES = {
    successfulMessage: 'Successfully created',
    notFoundMessage: 'Not found',
    noEmail: "We couldn't find an account with that email.",
    assertiveMessage: 'Welcome back',
    yesEmail: 'An email with a verification link has been sent to'
  };
// Const to be redirected to the login url
  const navigateToLoginPage = () => {
    cy.visit(`${TEST_DATA.baseUrl}`);
    cy.wait(3000);
  };
//Const to login to an account 
  const loginToAccount = () => { 
    cy.get(SELECTORS.websiteEmail)
        .click()
        .type(TEST_DATA.existingEmail);

    cy.get(SELECTORS.websitePassword)
        .click()
        .type(TEST_DATA.password);

    cy.get(SELECTORS.submitButton)
        .click();

    cy.get(SELECTORS.loginElement)
        .should('be.visible');
  }
// Const used to logout from an account
  const logOutToAccount = () => {
    cy.get(SELECTORS.userMenu)
        .click();

    cy.get(SELECTORS.userMenuItem)
        .eq(1)
        .click();

    cy.get(SELECTORS.loginAssertion)
        .should('be.visible')
        .and('contain', MESSAGES.assertiveMessage);
  }
// Const used to check entering an email in forgot password, which is  existing in the system
  const forgetExistingAccount = () => {
    cy.get(SELECTORS.forgetPassword)
        .click();

    cy.get(SELECTORS.websiteEmail)
        .click()
        .type(TEST_DATA.existingEmail);

    cy.get(SELECTORS.submitButton)
        .click()

    cy.get(SELECTORS.successToast)
        .should('be.visible')
        .and('contain', MESSAGES.successfulMessage);
    
    cy.get(SELECTORS.existingEmailMessage)
        .contains('span', MESSAGES.yesEmail)
        .should('be.visible');
    
  }
// Const used to check entering an email in forgot password, which is not existing in the system
  const forgetNonExistingAccount = () => {
    cy.get(SELECTORS.forgetPassword)
        .click()
    
    cy.get(SELECTORS.websiteEmail)
        .click()
        .type(TEST_DATA.nonExistentEmail)

      cy.get(SELECTORS.submitButton)
        .click()

    cy.get(SELECTORS.successToast)
        .should('be.visible')
        .and('contain', MESSAGES.notFoundMessage);

    cy.get(SELECTORS.nonExistingEmailMessage)
        .contains(MESSAGES.noEmail)
        .should('be.visible');

  }

  describe('Authentication Test Cases', () => {
    beforeEach(() => {
        navigateToLoginPage(); //Redirect to login page automatically per test
    });
it('Forget Password Existing Email',() =>{
    forgetExistingAccount();
})
it('Forget Password Error for enetering an email which is not existing',() =>{
    forgetNonExistingAccount();
})
it ('Login and Logout', () => {
    loginToAccount();
    logOutToAccount();
});

  })