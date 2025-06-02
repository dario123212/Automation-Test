// Log in from UI Command

Cypress.Commands.add("Login_UI", () => {
  let username = "superadmin@gmail.com";
  let password = "Test1234!";

  cy.visit("https://admin-stg.onehomesolution.com/signin");

  cy.get('input[name="email"]')
    .click({ force: true })
    .type(username)
    .get('input[type="password"]')
    .click({ force: true })
    .type(password)
    .get("button")
    .contains("Sign In")
    .click({ force: true });

  cy.wait(1000);
});

//Generate 5 random words, this will be used for the Property Address, when creating a new customer

Cypress.Commands.add("generateRandomWords", (count = 5) => {
  const words = [
    "apple",
    "banana",
    "cherry",
    "dragon",
    "elephant",
    "forest",
    "guitar",
    "hello",
    "island",
    "jungle",
    "kangaroo",
    "lemon",
    "mountain",
    "ocean",
    "penguin",
    "queen",
    "river",
    "sunset",
    "tiger",
    "umbrella",
    "violin",
    "waterfall",
    "xylophone",
    "yellow",
    "zebra",
    "airplane",
    "butterfly",
    "castle",
    "diamond",
    "energy",
    "freedom",
    "galaxy",
    "harmony",
    "infinity",
    "journey",
    "knowledge",
    "lightning",
    "melody",
    "nature",
    "adventure",
    "butterfly",
    "creative",
    "discover",
    "exciting",
    "fantastic",
    "gorgeous",
    "happiness",
    "inspiring",
    "joyful",
    "kindness",
    "laughter",
    "miracle",
    "optimism",
    "peaceful",
    "radiant",
    "sunshine",
    "triumph",
    "universe",
    "victory",
    "wonderful",
    "anchor",
    "blizzard",
    "canyon",
    "dolphin",
    "ember",
    "falcon",
    "glacier",
    "harvest",
    "illusion",
    "jasmine",
    "keystone",
    "labyrinth",
    "meteor",
    "nebula",
    "oasis",
    "paradise",
    "quartz",
    "rainbow",
    "safari",
    "temple",
    "utopia",
    "voyage",
    "whirlpool",
    "xenon",
    "yearning",
    "zephyr",
    "alchemy",
    "bravery",
    "compass",
    "destiny",
    "enigma",
    "firefly",
    "gravity",
    "heartbeat",
    "icicle",
    "jubilee",
    "karma",
    "legend",
    "mirage",
    "nebulae",
    "odyssey",
    "pinnacle",
    "quiver",
    "resonance",
    "serenity",
    "twilight",
    "uplift",
    "valor",
    "wisdom",
    "zenith",
  ];

  const randomWords = [];
  const usedIndices = new Set();

  for (let i = 0; i < count; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * words.length);
    } while (usedIndices.has(randomIndex));

    usedIndices.add(randomIndex);
    randomWords.push(words[randomIndex]);
  }

  return randomWords;
});

// Function : Generate a random numbe with 10 characters. This is used to help on creating a unique email address for customers

Cypress.Commands.add("generateRandomNumber", (length = 10) => {
  let randomNumber = "";

  for (let i = 0; i < length; i++) {
    randomNumber += Math.floor(Math.random() * 10).toString();
  }

  return randomNumber;
});

//Function : Generate a future date for scheduling. Selects one date and the other 4 days after

Cypress.Commands.add("generateRandomFutureDates", (daysAhead = 30) => {
  const today = new Date();
  const firstDate = new Date();
  firstDate.setDate(
    today.getDate() + Math.floor(Math.random() * daysAhead) + 1,
  );

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
    },
  };
});

import "cypress-file-upload";
import "cypress-real-events/support";

import "cypress-file-upload";
import "cypress-real-events/support";
