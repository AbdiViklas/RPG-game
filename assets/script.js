// TO DO: balance so game is winable with any character

// CHARACTER OBJECTS

var characters = {
  dr10: {
    idName: "dr10", // maybe delete when I'm sure I don't need it
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
    maxHealth: 70,
    currentHealth: 70,
    baseAttack: 6,
    currentAttack: 6,
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
    maxHealth: 65,
    currentHealth: 65,
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
    maxHealth: 70,
    currentHealth: 70,
    baseAttack: 7,
    currentAttack: 7,
    attacks: [
      "touch",
      "move really really fast"
    ],
    phrases: []
  },
  silence: {
    idName: "silence",
    name: "the Silence",
    maxHealth: 70,
    currentHealth: 70,
    baseAttack: 7,
    currentAttack: 7,
    attacks: [
      "forget",
      "zap"
    ],
    phrases: []
  }
}

// OTHER VARIABLES

var userChar, userCharDiv, opponent, opponentDiv;
var winCounter = 0;
var runAlerts = true;

// FUNCTIONS

function selectRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

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
    $("#fight-btn").removeAttr("disabled");
  });
}

function defeatOpponent() {
  winCounter++; 
  $("#fight-btn").attr("disabled", "disabled"); // to prevent additional wins from clicking the button more times. chooseOpponent() will remove it.
  if (winCounter === 4) {
    winGame();
  } else {
    $("#fight-container").append(`
      <div id="defeatAlert" class="alert alert-info alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        You've defeated ${opponent.name}! Brilliant! Now click another character to fight it.
      </div>`);
    runAlerts = false; // You've got it from here
    $(opponentDiv).addClass("defeated"); // display: none, but it hasn't gone anywhere...
    $("*").popover("destroy");
    chooseOpponent();
  }
}

function loseGame() {
  $("#loseModal").modal();
  $("#defeater").text(opponent.name);
}

function winGame() {
  $("#winModal").modal();
}

function reset() {
  $(".alert").alert("close");
  $("*").popover("destroy");
  $("#card-container").append(userCharDiv, opponentDiv, $(".defeated"));
  $(".character").removeClass("defeated");
  $(".character").css("border-color", "rgba(0, 0, 0, 0.5)");
  // reset .currentHealth amounts to .maxHealth:
  for (var char in characters) {
    characters[char].currentHealth = characters[char].maxHealth;
    characters[char].currentAttack = characters[char].baseAttack;
  }
  $(".character").each(function (index) {
    writeStats(this);
  });
  winCounter = 0;
  userChar = undefined;
  opponent = undefined;
  chooseChar();
}

// to-do: hunt down why popovers "flash" on second instance, disappearing immediately after appearing

$("#fight-btn").click(function() {
  // checks for click at inappropriate times
  if ($(this).attr("disabled")) {
    return;
  } else if (!userChar) {
    alert("First you must choose a character. \nClick on any character to play as him or her.");
    return;
  } else if (!opponent) {
    alert("First you must choose an opponent. \nClick on any character to fight him or her.");
    return;
  }
  // tidy up any stray alerts or popovers
  $(".alert").alert("close");
  $("*").popover("destroy");
  // display alerts and popovers
  $("#fight").append(`
    <div id="charAttack" class="alert alert-warning alert-dismissible" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      ${userChar.name} uses attack "${selectRandom(userChar.attacks)}" for ${userChar.currentAttack} damage!
    </div>`);
  $(userCharDiv).attr({
    "data-toggle": "popover",
    "data-placement": "top",
    "data-content": selectRandom(userChar.phrases)});
  $(userCharDiv).popover("show");
  opponent.currentHealth -= userChar.currentAttack;
  $("#fight").append(`
    <div id="opponentAttack" class="alert alert-warning alert-dismissible" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      ${opponent.name} uses attack "${selectRandom(opponent.attacks)}" for ${opponent.currentAttack} damage!
    </div>`);
  $(opponentDiv).attr({
    "data-toggle": "popover",
    "data-placement": "right",
    "data-content": selectRandom(opponent.phrases)});
  $(opponentDiv).popover("show");
  userChar.currentHealth -= opponent.baseAttack;
  userChar.currentAttack += 5;
  writeStats(userCharDiv);
  writeStats(opponentDiv);
  if (opponent.currentHealth < 1) {
    defeatOpponent();
  } else if (userChar.currentHealth < 1) {
    loseGame();
  }
});

$(document).ready(function() {
  reset();
});