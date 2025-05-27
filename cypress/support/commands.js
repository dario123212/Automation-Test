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

/////////////// Log Out from UI Command ///////////////

Cypress.Commands.add("LogOut_UI", () => {

cy.get('svg.lucide-chevron-down').should('be.visible').click({ force: true })
  .cy.contains('li', 'Logout').click({force:true})

})

// ///Get AccessToken ///

// Cypress.Commands.add('getTokenByCredentials', () => {
//     let email = "superadmin@gmail.com"
//     let password = "Test1234!"
//     cy.request({
//         method: 'POST',
//         url: 'https://admin-stg.onehomesolution.com',
//         body:
//         {
//           query: `
//           mutation {
//             login(email: "${email}", password: "${password}") {
//               accessToken
//             }
//           }`
//         },
//         headers: {
//           'Content-Type': 'application/json'
//       }
//     }).then((response) => {
//       const token = response.body?.data?.login?.accessToken;
  
//       // Store the token in localStorage and Cypress environment variable
//       window.localStorage.setItem('jwt', token);
//       Cypress.env('jwt', token);
//     })
// })
//// Saves Date
Cypress.Commands.add('getCurrentDate', () => {
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // 0-indexed, so add 1
const day = currentDate.getDate();

// Return the date string in YYYY-MM-DD format
const dateString = `${year}-${month}-${day}`;
return cy.wrap(dateString);
});
//// Saves Time
Cypress.Commands.add('getCurrentTimePlusOneMinute', () => {
const currentDate = new Date();

// Add 1 minute to the current time
currentDate.setMinutes(currentDate.getMinutes() + 2);

const hours = String(currentDate.getHours()).padStart(2, '0');  // Pad with leading zero if necessary
const minutes = String(currentDate.getMinutes()).padStart(2, '0');  // Pad with leading zero if necessary
const seconds = String(currentDate.getSeconds()).padStart(2, '0');  // Optional, pad with leading zero if needed

// Return the time string in HH:mm format or HH:mm:ss format if needed
const timeString = `${hours}:${minutes}`;  // For HH:mm
// const timeString = `${hours}:${minutes}:${seconds}`;  // Uncomment for HH:mm:ss

return cy.wrap(timeString);
});
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