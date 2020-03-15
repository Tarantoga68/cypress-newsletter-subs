/*
Create a random email address using the MailSlurp API
*/

const { MailSlurp } = require('mailslurp-client')

Cypress.Commands.add("newEmailAddress", () => {
  // instantiate MailSlurp
  const mailslurp = new MailSlurp({ apiKey: Cypress.env('API_KEY')})
  // return new randomly generated inbox in the "mailslurp.com" domain
  return mailslurp.createInbox()
})
