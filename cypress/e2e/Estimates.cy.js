describe('Homepage', () => {
    beforeEach(() => {

        cy.Login_UI()
        // cy.getTokenByCredentials()
       
    });
    it('UI // Creates a new Job fo a customer', () => {
        //Create New Job for customer darjoo tester
        cy.visit('https://admin-stg.onehomesolution.com/jobs/list')
        cy.get('a[href="/jobs/list"]')
          .should('have.attr', 'data-status', 'active')
       .get('.py-4 > .bg-primary').click()
       .get('.bg-gray-100 > .flex > :nth-child(2) > .inline-flex').click().wait(1000).type('darjoo tester{enter}')
       .contains('button', 'Select Property').click().type('{enter}')
       .contains('button', 'Create Job').should('be.visible').click()
       .get('div.text-2xl').contains('Contact Information').should('be.visible')
        // Delete Post & Assert
        cy.get('#radix-:rn9:').click()
        .contains('button', 'Delete job').click()
        .contains('Are you sure you want to delete this job?').should('be.visible')
        .contains('button', 'Delete').click()
        .contains('li', 'Successfully deleted').should('be.visible')
        });
    })