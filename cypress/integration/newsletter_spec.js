/*
Make sure MailSlurp client is installed, otherwise:
npm install --save mailslurp-client
*/

describe('cypress.io newsletter subscription', function() {

  it('subscribe with random MailSlurp email address', function() {

    cy.newEmailAddress().then(({emailAddress}) => {

      //load the cypress.io page
      cy.visit('/')

      //accept cookies
      cy.contains('Got').click()

      //negative path
      //enter the incomplete email address into "Your email address" field
      cy.get('#email-345a365f-b011-4b67-b50f-a40a5f4f1b12').scrollIntoView().type('blah@')
      //click the "Subscribe" button
      cy.get('.hs-button').click()
      //assert the error message was displayed
      cy.get('.hs-error-msg').should('be.visible')

      //clearing the input field
      cy.get('#email-345a365f-b011-4b67-b50f-a40a5f4f1b12').clear()

      //positive path
      //enter generated MailSlurp email address into "Your email address" field; assert it was entered
      cy.get('#email-345a365f-b011-4b67-b50f-a40a5f4f1b12').type(emailAddress).should('contain.value', '@mailslurp.com')
      //click the "Subscribe" button
      cy.get('.hs-button').click()
      //assert the success message was displayed; take the screenshot
      cy.get('.submitted-message').should('be.visible').screenshot()

/*
- cypress.io doesn't send any confirmation emails, otherwise I would need to do the following, using MailSlurp API:
  - receive the confirmation email
  - fetch the verification link/code
  - verify user
*/

    })

  })

})
