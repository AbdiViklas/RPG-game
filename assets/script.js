// CHARACTER OBJECTS
var dr10 = {
  name: "the Tenth Doctor",
  maxHealth: 80,
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

function chooseChar() {
  $(".character").click(function() {
    userChar=$(this).id();
  })
}

// the challenge: can I un-bind an event listener? because I don't want to always be listening on every .character click, and calling the function