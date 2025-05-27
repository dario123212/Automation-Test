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
            it.only('Create & Schedule an appointment', () => {
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
                .get('div.flex.flex-col.items-center').first().find('button').click()
                .get('button[aria-label="Delete schedule"]').contains('Smart suggestions').should('exist').click()
                cy.get('button.justify-between.pl-2').eq(1).click()
                  .get ('input[placeholder="Search ..."]').type('New User').wait(1000).realPress('Enter');
                cy.get('input[name="duration_hours"]').click().type('1')
                cy.get('input[name="duration_minutes"]').click().type('0')
                
                  //Calendar range selection. Calling the function from command.js
                  cy.contains('button', 'Select dates').click();
                  cy.generateRandomFutureDates().then(({ first, second }) => {
                    // First Date
                    cy.contains('button', new RegExp(`^${first.day}$`)).click({ force: true })
                    // Second Date
                    cy.contains('button', new RegExp(`^${second.day}$`)).click({ force: true })
                    });
                cy.get('div.p-6.py-4.px-4.flex.flex-col.gap-1.min-w-\\[180px\\].w-full').first().click();
                cy.get('.toaster > .group').contains('Successfully created').should('be.visible').wait(1000)
                // Getting the data for the created job, to then assert it in the main jobs table
                cy.get('tr[data-has-link="true"]').first()
                  .find('td')
                  .eq(2)
                  .invoke('text')
                  .then((text) => {
                 const formatted = text.trim().split(' (')[0]; 
                 cy.wrap(formatted).as('scheduledTime');
                 });
                 // Go to the Main table to assert the newly created job
                 cy.visit('https://admin-stg.onehomesolution.com/jobs/list').wait(3000);
                 cy.get('@scheduledTime').then((scheduledTime) => {
                    cy.get(':nth-child(4) > time').eq(0)
                      .invoke('text')
                      .should('contain', scheduledTime);
                 });

            })
    });