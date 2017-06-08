// CHARACTER OBJECTS
var dr10 = {
  name: "the Tenth Doctor",
  maxHealth: 80,
  health: 80,
  baseAttack: 5,
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
  health: 90,
  baseAttack: 7,
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
  health: 30,
  baseAttack: 10,
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
  health: 50,
  baseAttack: 8,
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
  health: 40,
  baseAttack: 5,
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
  health: 6.,
  baseAttack: 7,
  attacks: [
    "wait",
    "tell off"
  ],
  phrases: [
    ""
  ]
}

// play starts when user chooses a character (by clicking)
// start with a tutorial-style modal instructing that
var userChar;
var opponent;

function chooseChar() {
  $(".character").click(function() {
    userChar=$(this).id();
  });
  // unbind?
}

// the challenge: can I un-bind an event listener? because I don't want to always be listening on every .character click, and calling the function

function chooseOpponent() {
  $(".character").click(function() {
    opponent=$(this).id();
  });
  // unbind?
}

function loseGame() {
  // inform user of loss
  reset();
}

function winGame() {
  // inform user of win
  reset();
}

function reset() {
  // reset .health amounts to .maxHealth
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
  } else if (userChar.health < 1) {
    loseGame();
  }
})