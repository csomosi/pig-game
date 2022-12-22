let scores, roundScore, activePlayer, previousDices;

// both player starts with 0, define an array for scores:
function newGame() {
  scores = [0, 0];
  previousDices = [0, 0];

  // variable for the actual player's points in the actual round:

  roundScore = 0;

  // variable to indicate who is the active player (0 or 1):

  activePlayer = 0;

  // select the HTML element with # ID and modyfy the text content to 0:
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;

  // by starting the app, the dice is invisible:

  document.querySelector(".dice").style.display = "none";

  // finishing a game, we set a lot of things, so for new game we need to set them to default:
  document.querySelector(".btn-roll").style.display = "block";
  document.querySelector(".btn-hold").style.display = "block";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

newGame();
// toss the dice:

document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1. generate a random  nuber betw. 1-6
  const dice = Math.floor(Math.random() * 6 + 1);
  console.log(
    "Player" +
      activePlayer +
      "'s previous dice was: " +
      previousDices[activePlayer]
  );
  console.log("Player" + activePlayer + " tossed a " + dice);

  // 2. print the number on UI:
  document.querySelector(".dice").style.display = "block";

  // 3. change the dice picture to the tossed value:
  document.querySelector(".dice").setAttribute("src", `dice-${dice}.png`);

  // if tossed value = 6 AND previousDices = 6 than end of turn, next player goes:

  if (dice == 6 && previousDices[activePlayer] == 6) {
    previousDices[activePlayer] = 0;
    scores[activePlayer] = 0;
    // refresh UI:
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    nextPlayer();
    return;
  } else {
    // we store the tossed value in an array previousDices to have it for the next toss:
    previousDices[activePlayer] = dice;
    // If tossed value is other than 1 we add the value.
    if (dice !== 1) {
      roundScore = roundScore + dice;
      // show player's result on UI:
      document.querySelector("#current-" + activePlayer).textContent =
        roundScore;

      // if tossed value is 1 then points are lost, and other player's turn.
    } else {
      nextPlayer();
    }
  }

  console.log("updated values of array previousDices are: " + previousDices);
});

// creating a function for the above {else} code-portion (other player's turn)
function nextPlayer() {
  roundScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  // refresh UI:

  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

document.querySelector(".btn-hold").addEventListener("click", function () {
  // 1. player holds points:
  scores[activePlayer] = scores[activePlayer] + roundScore;

  // 2. refresh UI:
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  // 3. is there a winner?
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add("winner");
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove("active");
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".btn-roll").style.display = "none";
    document.querySelector(".btn-hold").style.display = "none";
  } else {
    // if player doesn't win, than the other player's round
    nextPlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", newGame);
