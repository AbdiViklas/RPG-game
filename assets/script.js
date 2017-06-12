/* Game logic flow:
User selects a character
  chooseChar();
User selects an opponent
  chooseOpponent();
User clicks fight until...
  A: User is defeated
    loseGame() (button calls reset())
  B: opponent is defeated
    defeatOpponent()
User chooses a new opponent and repeats until...
winGame()
*/


// CHARACTER OBJECTS

var characters = {
  dr10: {
    idName: "dr10",
    name: "the Tenth Doctor",
    maxHealth: 80,
    currentHealth: 80,
    baseAttack: 5,
    currentAttack: 5,
    attacks: [
      "sonic screwdriver",
      "Plimsolls",
      "spiky hair",
      "Run!"
    ],
    phrases: [
      "Allons-y!",
      "Run!",
      "Tell them this: IT IS DEFENDED!"
    ]
  },
  dalek: {
    idName: "dalek",
    name: "a Dalek",
    maxHealth: 30,
    currentHealth: 30,
    baseAttack: 10,
    currentAttack: 10,
    attacks: [
      "scream",
      "plunger",
      "death ray"
    ],
    phrases: [
      "Exterminate! EXTERMINATE!",
      "You are a good Dalek!"
    ]
  },
  cyberman: {
    idName: "cyberman",
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
      "Delete!",
      "Upgrade!"
    ]
  },
  angel: {
    idName: "angel",
    name: "a Weeping Angel",
    maxHealth: 40,
    currentHealth: 40,
    baseAttack: 5,
    currentAttack: 5,
    attacks: [
      "touch",
      "move really really fast"
    ]
  },
  silence: {
    idName: "silence",
    name: "the Silence",
    maxHealth: 60,
    currentHealth: 6, // nerfed for testing
    baseAttack: 7,
    currentAttack: 7,
    attacks: [
      "wait",
      "tell off"
    ]
  }
}

// OTHER VARIABLES

var userChar, userCharDiv, opponent, opponentDiv;
var winCounter = 0;
var runAlerts = true;

// FUNCTIONS

function writeStats(div) {
  var objectName = div.id;
  $(div).html(`
    <p class="stat">Health: ${characters[objectName].currentHealth}</p>
  `);
}

function chooseChar() {
  if (runAlerts) {
    $("#card-container").append(`
      <div id="chooseCharAlert" class="alert alert-info alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        First, choose a character to play as!
      </div>`);
  }
  $(".character").on("click", function() {
    userChar=characters[this.id];
    userCharDiv = this;
    $("#fight-container").append(this); // move to #fight-container
    $(this).css("border-color", "rgba(0, 191, 255, 0.5)");
    $(".character").off();
    $("#chooseCharAlert").alert("close");
    chooseOpponent();
  });
}

function chooseOpponent() {
  if (runAlerts) {
    $("#card-container").append(`
      <div id="chooseOpponentAlert" class="alert alert-info alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        Next, choose a character to fight!
      </div>`);
  }
  $(".character").on("click", function() {
    opponent=characters[this.id];
    opponentDiv = this;
    $("#fight-container").append(this); // move to #fight-container
    $(this).css("border-color", "rgba(255, 0, 0, 0.5)");    
    $(".character").off();
    if ($("#defeatAlert")) {
      $("#defeatAlert").alert("close");
    }
    $("#chooseOpponentAlert").alert("close");
    if (runAlerts) {
      $("#fight").append(`
      <div id="fightAlert" class="alert alert-info alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        Finally, click the "Fight" button to attack your opponent!
      </div>`);
    }
  });
}

function defeatOpponent() {
  winCounter++;
  $("#fight-container").append(`
    <div id="defeatAlert" class="alert alert-info alert-dismissible" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      You've defeated ${opponent.name}! Brilliant! Now click another character to fight it.
    </div>`);
    runAlerts = false; // You've got it from here
    $(opponentDiv).addClass("defeated"); // so we can find it again later...
    $(opponentDiv).detach(); // remove it from DOM
    chooseOpponent();
}

function loseGame() {
  $("#loseModal").modal();
  $("#defeater").text(opponent.name);
}

function winGame() {
  $("#winModal").modal();
}

function reset() {
  $("#card-container").append(userCharDiv, opponentDiv, $(".defeated"));
  $(userCharDiv).css("border-color", "rgba(0, 0, 0, 0.5)");
  $(opponentDiv).css("border-color", "rgba(0, 0, 0, 0.5)");
  // reset .currentHealth amounts to .maxHealth
  for (var char in characters) {
    characters[char].currentHealth = characters[char].maxHealth;
  }
  // reset protagonist character attack to original level
  userChar.currentAttack = userChar.baseAttack; //small problem: although this line appears to be executed before the writeStats line below, the console shows an error suggesting that userChar has already been set to undefined by the lines below
  $(".character").each(function (index) {
    writeStats(this);
  });
  userChar = undefined;
  opponent = undefined;
  chooseChar();
}

$("#fight").click(function() {
  if (!userChar) {
    alert("First you must choose a character. \nClick on any character to play as him or her.");
    return;
  } else if (!opponent) {
    alert("First you must choose an opponent. \nClick on any character to fight him or her.");
    return;
  } 
  $("#fightAlert").alert("close");
  opponent.currentHealth -= userChar.currentAttack;
  userChar.currentHealth -= opponent.baseAttack;
  userChar.currentAttack += 5;
  // popover speech balloons with random phrase for both
  writeStats(userCharDiv);
  writeStats(opponentDiv);
  if (userChar.currentHealth < 1) {
    loseGame();
  } else if (opponent.currentHealth < 1) {
    defeatOpponent();
    if (winCounter === 4) {
      winGame();
    }
  } else {
  }
});

$(document).ready(function() {
  $(".character").each(function (index) {
    writeStats(this);
  });
  chooseChar();
});