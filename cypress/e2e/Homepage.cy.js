describe('Homepage', () => {
    beforeEach(() => {

        cy.Login_UI()
        cy.getTokenByCredentials()
       
    });

    /////// CREATING POST (CAPTION) THEN DELETE ////////
    it('Creates a Post with just a caption and then deletes it.', () => {
        //Create Post
        cy.get('a > .gap-2 > .whitespace-nowrap')
       .click()
       .get('.text-lg.font-semibold.leading-none.tracking-tight').contains('Create a post')
       .get('.rounded-md.border.border-input.bg-background.px-3.py-2.text-sm').click().type('My First ever post is here!')
       .get('button[type="submit"]').contains('Post').click()
       .get('.text-card-foreground.shadow-sm.border-gray-350.border.rounded-xl.flex.flex-col.bg-white.p-6').should('be.visible')
        
        // Assertion that the post was created
        .first().within(() => {
            cy.get('.text-sm.font-normal.break-words.text-gray-800')
              .contains('My First ever post is here!').should('be.visible')
        })
        // Delete Post & Assert
            .get('.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.hover\\:bg-accent.hover\\:text-accent-foreground.py-2.h-auto.px-2\\.5.self-baseline').click()
            cy.contains('div', 'Delete').should('exist').click()
            cy.get('button[type="button"]').contains('Delete').click()
           cy.get('.space-y-1 > .text-gray-800').contains('No posts yet').should('be.visible')
        });


    /////// CREATING POST (Photo) THEN DELETE ////////
    it('Creates a Post with a photo and a caption and then deletes it.', () => {
            //Create Post
            cy.get('.text-card-foreground > :nth-child(2) > :nth-child(1) > svg').trigger('mouseover').click()

            // Upload image 
            cy.get('div.border.border-gray-200.bg-white.rounded-xl.flex.items-center.justify-center').trigger('mouseover').click()
            const filePath = 'march.jpg'
            cy.get('input[type="file"]').attachFile(filePath)
            cy.wait(2000)
            cy.get('.text-lg.font-semibold.leading-none.tracking-tight').contains('Create a post')
           .get('.rounded-md.border.border-input.bg-background.px-3.py-2.text-sm').click().type('My First ever post is here!')
           .get('button[type="submit"]').contains('Post').click()
           .get('.text-card-foreground.shadow-sm.border-gray-350.border.rounded-xl.flex.flex-col.bg-white.p-6').should('be.visible')
            
            // Assertion that the post was created
            .first().within(() => {
                cy.get('.text-sm.font-normal.break-words.text-gray-800')
                  .contains('My First ever post is here!').should('be.visible')
                  cy.get('img[alt="march.jpg"]').should('be.visible')
            })
            // Delete Post & Assert
                .get('.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.hover\\:bg-accent.hover\\:text-accent-foreground.py-2.h-auto.px-2\\.5.self-baseline').click()
                cy.contains('div', 'Delete').should('exist').click()
                cy.get('button[type="button"]').contains('Delete').click()
               cy.get('.space-y-1 > .text-gray-800').contains('No posts yet').should('be.visible')
            });

            /////// CREATING POST (VIDEO) THEN DELETE ////////
            it('Creates a Post with a video and a caption and then deletes it.', () => {
                //Create Post
                cy.get('.text-card-foreground > :nth-child(2) > :nth-child(2) > svg').trigger('mouseover').click()
    
                // Upload video  
                cy.get('div.border.border-gray-200.bg-white.rounded-xl.flex.items-center.justify-center').trigger('mouseover').click()
                const filePath = 'video.mp4'
                cy.get('input[type="file"]').attachFile(filePath)
                cy.wait(5000)
                cy.get('.text-lg.font-semibold.leading-none.tracking-tight').contains('Create a post')
               .get('.rounded-md.border.border-input.bg-background.px-3.py-2.text-sm').click().type('My First ever post is here!')
               .get('button[type="submit"]').contains('Post').click()
               .get('.text-card-foreground.shadow-sm.border-gray-350.border.rounded-xl.flex.flex-col.bg-white.p-6').should('be.visible')
                
                // Assertion that the post was created
                .first().within(() => {
                    cy.get('.text-sm.font-normal.break-words.text-gray-800')
                      .contains('My First ever post is here!').should('be.visible')
                      cy.get('video[controls]').should('be.visible')
                })
                // Delete Post & Assert
                    .get('.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.hover\\:bg-accent.hover\\:text-accent-foreground.py-2.h-auto.px-2\\.5.self-baseline').click()
                    cy.contains('div', 'Delete').should('exist').click()
                    cy.get('button[type="button"]').contains('Delete').click()
                   cy.get('.space-y-1 > .text-gray-800').contains('No posts yet').should('be.visible')
                });

                /////// CREATING POST (DOC) THEN DELETE ////////
                it('Creates a Post with a Doc and a caption and then deletes it.', () => {
                    //Create Post
                    cy.get('.text-card-foreground > :nth-child(2) > :nth-child(3) > svg').trigger('mouseover').click()
        
                    // Upload video  
                    cy.get('div.border.border-gray-200.bg-white.rounded-xl.flex.items-center.justify-center').trigger('mouseover').click()
                    const filePath = 'doc.doc'
                    cy.get('input[type="file"]').attachFile(filePath)
                    cy.wait(5000)
                    cy.get('.text-lg.font-semibold.leading-none.tracking-tight').contains('Create a post')
                   .get('.rounded-md.border.border-input.bg-background.px-3.py-2.text-sm').click().type('My First ever post is here!')
                   .get('button[type="submit"]').contains('Post').click()
                   .get('.text-card-foreground.shadow-sm.border-gray-350.border.rounded-xl.flex.flex-col.bg-white.p-6').should('be.visible')
                    
                    // Assertion that the post was created
                    .first().within(() => {
                        cy.get('.text-sm.font-normal.break-words.text-gray-800')
                          .contains('My First ever post is here!').should('be.visible')
                          cy.contains('div.text-sm.font-normal.text-gray-700.undefined', 'doc.doc')
                    })
                    // Delete Post & Assert
                        .get('.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.hover\\:bg-accent.hover\\:text-accent-foreground.py-2.h-auto.px-2\\.5.self-baseline').click()
                        cy.contains('div', 'Delete').should('exist').click()
                        cy.get('button[type="button"]').contains('Delete').click()
                       cy.get('.space-y-1 > .text-gray-800').contains('No posts yet').should('be.visible')
                    });
                /////// CREATING POST (POLL) AND EXPIRATION FUNCTIONALITY////////
                it('Creates a Post with a Doc and a caption and then deletes it.', () => {
                    //Create Post
                    cy.get('.text-card-foreground > :nth-child(2) > :nth-child(4) > svg').trigger('mouseover').click()
                    cy.contains('Create a poll').should('be.visible')
                    // Create a poll  

                    cy.get('input[placeholder="Enter your question here"]').click().type('Is this automation code working?')
                    .get('input[placeholder="Option 1"]').click().type('Yes of course')
                    .get('input[placeholder="Option 2"]').click().type('Nope, back to the QA CAGE WITH YOU!')
                    .get('button.justify-center.rounded-md.font-medium.text-primary-700').click()
                    .get('input[placeholder="Option 3"]').click().type('Yes, now jump to the next Test Case, Dar')
                    cy.contains('button', '1 day').click()
                    cy.get('[aria-labelledby="radix-:r1g:"]').click()
                   .get('button[type="submit"]').contains('Done').click()
                   .get('.space-y-4 > .gap-4 > .justify-between').should('be.visible')
                   .get('.rounded-md.border.border-input.bg-background.px-3.py-2.text-sm').click().type('My First ever post is here!')
                   .get('button[type="submit"]').contains('Post').click()
                    // Assertion that the post was created
                
                        cy.contains('My First ever post is here!').should('be.visible')
                          cy.contains('Is this automation code working?').should('be.visible')
                          cy.get(':nth-child(3) > .text-primary').click()
                          cy.get(':nth-child(3) > .relative > .h-full').should('be.visible')
                          cy.wait(60000)
                          cy.get('.gap-1 > :nth-child(3)').contains('Poll has expired')
                  
                    // Delete Post & Assert
                        .get('.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.hover\\:bg-accent.hover\\:text-accent-foreground.py-2.h-auto.px-2\\.5.self-baseline').click()
                        cy.contains('div', 'Delete').should('exist').click()
                        cy.get('button[type="button"]').contains('Delete').click()
                       cy.get('.space-y-1 > .text-gray-800').contains('No posts yet').should('be.visible')
                    });
                /// CREATES A POST (SCHEDULED) AND THEN DELETES IT
                it('Creates a Post with a Doc and a caption and then deletes it.', () => {
                    //Create Post
                    cy.get('.text-card-foreground > :nth-child(2) > :nth-child(5) > svg').trigger('mouseover').click()
                    cy.contains('Schedule post').should('be.visible')
                    // Create a poll  
                    cy.getCurrentTimePlusOneMinute().then((time) => {
                        cy.log(`Current Time + 1 minute: ${time}`);
                        cy.get('input[name="time"]').click().type(time);
                        cy.contains('button', "Next").click()
                      });
                    cy.get('.text-lg.font-semibold.leading-none.tracking-tight').contains('Create a post')
                      .get('.rounded-md.border.border-input.bg-background.px-3.py-2.text-sm').click().type('My First ever post is here!')
                      .get('button[type="submit"]').contains('Schedule').click()
                      .wait(5000)
                      .reload()
                      cy.get('.text-card-foreground > :nth-child(2) > :nth-child(5) > svg').trigger('mouseover').click()
                      cy.contains('button', "View all schedule posts").click()
                      cy.contains('div', 'My First ever post is here!')
                      .get('button.absolute.right-4.top-4.rounded-sm').click()
                      .wait(120000)
                      .reload()
                      // Assertion that the post was created
                      
                        .get('.text-sm.font-normal.break-words.text-gray-800')
                        .contains('My First ever post is here!').should('be.visible') 
                   
                      // Delete Post & Assert
                     .get('.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.hover\\:bg-accent.hover\\:text-accent-foreground.py-2.h-auto.px-2\\.5.self-baseline').click()
                     .wait(2000)
                     cy.contains('div[role="menuitem"]', 'Delete').click()
                     .get('button[type="button"]').contains('Delete').click()
                     .get('.space-y-1 > .text-gray-800').contains('No posts yet').should('be.visible')
       
                });
})