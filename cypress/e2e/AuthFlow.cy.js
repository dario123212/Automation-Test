it('Forget Password Existing Email',() =>{
    cy.visit('https://admin-stg.onehomesolution.com/signin')
    cy.get('.ext-black').click()
    // Enter an email which is existing on the reset password
    .get('input[name="email"]').click().type('darjo+5757555@motomtech.com')
    .get('button[type="submit"]').contains('Reset Password').click()
    .get('.basis-0 > .justify-start > .flex > div > :nth-child(1)').contains('span', 'An email with a verification link has been sent to').should('be.visible')
    .get('.toaster > .group').contains('Successfully created').should('be.visible')
})
it('Forget Password Error for enetering an email which is not existing',() =>{
    cy.visit('https://admin-stg.onehomesolution.com/signin')
    cy.get('.ext-black').click()
    // Enter an email which is NOT existing on the reset password
    .get('input[name="email"]').click().type('darjo+57575234234324255@motomtech.com')
    .get('button[type="submit"]').contains('Reset Password').click()
    .get('.text-sm').contains("We couldn't find an account with that email.").should('be.visible')
    .get('.toaster > .group').contains('Not found').should('be.visible')
})
it ('Login and Logout', () => {
    cy.visit('https://admin-stg.onehomesolution.com/signin')
    .get('input[name="email"]').click().type('superadmin@gmail.com')
    .get('input[name="password"]').click().type('Test1234!')
    .get('button[type="submit"]').click()
    //Asserting element inside the the web when you're loggd
    .get('.grid').should('be.visible')
    .get('.aspect-square').click()
    .get('div[role="menuitem"]').eq(1).click()
    //Asserting a text in the login page
    .get('.text-5xl').contains('Welcome back').should('be.visible')
})