// CHARACTER OBJECTS
var dr10 = {
  name: "the Tenth Doctor",
  maxHealth: 80,
  currentHealth: 80,
  baseAttack: 5,
  currentAttack: 5,
  attacks: [
    "sonic screwdriver",
    "Plimsolls", //check sp
    "spiky hair",
    "Run!"
  ],
  phrases: [
    "Allons-y!",
    "Run!"
  ]
}

var dr11 = {
  name: "the Eleventh Doctor",
  maxHealth: 90,
  currentHealth: 90,
  baseAttack: 7,
  currentAttack: 7,
  attacks: [
    "sonic screwdriver",
    "fez"
  ],
  phrases: [
    "Bowties are cool.",
    "A good man goes to war!",
    "I am definitely a madman with a box!"
  ]
}

var dalek = {
  name: "a Dalek",
  maxHealth: 30,
  currentHealth: 30,
  baseAttack: 10,
  currentAttack: 10,
  attacks: [
    "scream",
    "plunger",
    "laser"
  ],
  phrases: [
    "Exterminate! EXTERMINATE!",
    "You are a good Dalek!"
  ]
}

var cyberman = {
  name: "a Cyberman",
  maxHealth: 50,
  currentHealth: 50,
  baseAttack: 8,
  currentAttack: 8,
  attacks: [
    "wrist missiles",
    "fly"
  ],
  phrases: [
    ""
  ]
}

var river = {
  name: "River Song",
  maxHealth: 40,
  currentHealth: 40,
  baseAttack: 5,
  currentAttack: 5,
  attacks: [
    "notebook",
    "sonic screwdriver"
  ],
  phrases: [
    "Spoilers, sweetie!"
  ]
}

var amy = {
  name: "Amy Pond",
  maxHealth: 60,
  currentHealth: 6.,
  baseAttack: 7,
  currentAttack: 7,
  attacks: [
    "wait",
    "tell off"
  ],
  phrases: [
    ""
  ]
}

// OTHER VARIABLES

// play starts when user chooses a character (by clicking)
// start with a tutorial-style modal instructing that
var userChar;
var opponent;
var winCounter = 0;

// FUNCTIONS

function chooseChar() {
  $(".character").click(function() {
    userChar=$(this).id();
    // move to #fight-container
  });
  // unbind?
}

// the challenge: can I un-bind an event listener? because I don't want to always be listening on every .character click, and calling the function

function chooseOpponent() {
  $(".character").click(function() {
    opponent=$(this).id();
    // move to #fight-container
  });
  // unbind?
}

function loseGame() {
  // inform user of loss
  reset();
}

// How do I determine win? Do I, at the start, push opponents to an array, delete them one by one, and determine win when the array .length === 0?
// Or simply hard-code the number of antagonists (5), keep track of defeats with a counter, and determine win when counter === 5?

function winGame() {
  // inform user of win
  reset();
}

function reset() {
  // reset .currentHealth amounts to .maxHealth
  // reset protagonist character attack to original level
  // --or better yet "dismount" character
  // set userChar to undefined?
  // can all these changes to character objects be accomplished by
  // keeping the objects in another file, unmutated, "copy" them into this file,
  // mutate them, and then "reload" the originals?
}

$("#fight").click(function() {
  if (!userChar) {
    alert("First you must choose a character. \nClick on any character to play as him or her.");
  } else if (!opponent) {
    alert("First you must choose an opponent. \nClick on any character to fight him or her.");
  } else if (userChar.currentHealth < 1) {
    loseGame();
  } else if (opponent.currentHealth < 1) {
    winCounter++;
    // "remove" opponent from the DOM--hide? or actually delete?
    if (winCounter === 5) {
      winGame();
    }
  } else {
    userChar.currentHealth -= opponent.baseAttack;
    opponent.currentHealth -= userChar.currentAttack;
    // popover speech balloons with random phrase for both
  }
});