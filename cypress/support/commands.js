/////////////// Generate Random Number  ///////////////

function generateRandomNumber(length) {
  const characters = '0123456789';
  const charactersLength = characters.length;
  const randomValues = new Uint32Array(length);

  window.crypto.getRandomValues(randomValues);

  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = randomValues[i] % charactersLength;
      result += characters.charAt(randomIndex);
  }

  return result;
}

const randomNumber = generateRandomNumber(10);
console.log(randomNumber);

/////////////// Log in from UI Command ///////////////

Cypress.Commands.add("Login_UI", () => {

  let username = 'superadmin@gmail.com'
  let password = 'Test1234!'
  cy.visit('https://admin-stg.onehomesolution.com/signin')
  cy.get('input[name="email"]').click({ force: true }).type(username)
      .get('input[type="password"]').click({ force: true }).type(password)
      .get('button').contains('Sign In').click({ force: true })

      cy.wait(5000)

})
Cypress.Commands.add('generateRandomFutureDates', (daysAhead = 30) => {
const today = new Date();
const firstDate = new Date();
firstDate.setDate(today.getDate() + Math.floor(Math.random() * daysAhead) + 1);

const secondDate = new Date(firstDate);
secondDate.setDate(firstDate.getDate() + 4);

return {
  first: {
    day: firstDate.getDate(),
    month: firstDate.getMonth(),
    year: firstDate.getFullYear(),
    dateObj: firstDate,
  },
  second: {
    day: secondDate.getDate(),
    month: secondDate.getMonth(),
    year: secondDate.getFullYear(),
    dateObj: secondDate,
  }
};
});
import 'cypress-file-upload';
import 'cypress-real-events/support';