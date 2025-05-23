describe('Jobs', () => {
    beforeEach(() => {
        cy.Login_UI()
        //cy.getTokenByCredentials()
            });
            it('Create Job', () => {
            cy.visit('https://admin-stg.onehomesolution.com/jobs/list')
            //Job Creation for customer Tech Dar with property 10960 Chalon Rd, Los Angeles, CA 90077
            .get('.py-4 > .bg-primary').click()
            .get('.bg-gray-100 > .flex > :nth-child(2) > .inline-flex').click().wait(1000)
            .get('input[placeholder="Search ..."]').type('tech dar').wait(1000)
            .get('[role="option"]').contains('Tech Dar').click().wait(1000)
            .get('.bg-gray-100 > .flex > :nth-child(3) > .inline-flex').click().wait(1000)
            .get('[role="option"]').contains( '10960 Chalon Rd, Los Angeles, CA 90077').click()
            .get('button[type="submit"]').contains('Create Job').click()
            //Job Assertion
            .get('.toaster > .group').contains('Successfully created').should('be.visible').wait(1000)
            .get(':nth-child(2) > .flex > .text-2xl').contains('Appointments').should('exist')
        })
            it('Create & Schedule an appointment', () => {
                cy.visit('https://admin-stg.onehomesolution.com/jobs/list')
                //Job Creation for customer Tech Dar with property 10960 Chalon Rd, Los Angeles, CA 90077
                .get('.py-4 > .bg-primary').click()
                .get('.bg-gray-100 > .flex > :nth-child(2) > .inline-flex').click().wait(1000)
                .get('input[placeholder="Search ..."]').type('tech dar').wait(1000)
                .get('[role="option"]').contains('Tech Dar').click().wait(1000)
                .get('.bg-gray-100 > .flex > :nth-child(3) > .inline-flex').click().wait(1000)
                .get('[role="option"]').contains( '10960 Chalon Rd, Los Angeles, CA 90077').click()
                .get('button[type="submit"]').contains('Create Job').click()
                //Job Assertion
                .get('.toaster > .group').contains('Successfully created').should('be.visible').wait(1000)
                .get(':nth-child(2) > .flex > .text-2xl').contains('Appointments').should('exist')
                //Schedule Creation
            })
            it.only(' Tester', () => {
                cy.visit('https://admin-stg.onehomesolution.com/jobs/8845').wait(3000)
                .get('div.flex.flex-col.items-center').first().find('button').click()
                .get('button[aria-label="Delete schedule"]').contains('Smart suggestions').should('exist').click()
                cy.get('button.justify-between.pl-2').eq(1).click()
                   .get ('input[placeholder="Search ..."]').type('Tester')
            })
    });