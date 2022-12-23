let scores, roundScore, activePlayer;

function newGame() {
  // both player starts with 0, define an array for scores:
  scores = [0, 0];

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
  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";

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

// toss the dices:
document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1. generate a random  nuber betw. 1-6
  const diceOne = Math.floor(Math.random() * 6 + 1);
  const diceTwo = Math.floor(Math.random() * 6 + 1);

  // 2. print the number on UI:
  document.querySelector("#dice-1").style.display = "block";
  document.querySelector("#dice-2").style.display = "block";

  // 3. change the dice pictures to the tossed value:
  document.querySelector("#dice-1").setAttribute("src", `dice-${diceOne}.png`);
  document.querySelector("#dice-2").setAttribute("src", `dice-${diceTwo}.png`);

  // If either of the tossed values are other than 1 we add both value.
  if (diceOne !== 1 && diceTwo !== 1) {
    roundScore = roundScore + diceOne + diceTwo;
    // show player's result on UI:
    document.querySelector("#current-" + activePlayer).textContent = roundScore;

    // if any of the tossed values is 1 then points are lost, and other player's turn.
  } else {
    nextPlayer();
  }
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
  if (scores[activePlayer] >= 20) {
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add("winner");
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove("active");
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector("#dice-1").style.display = "none";
    document.querySelector("#dice-2").style.display = "none";
    document.querySelector(".btn-roll").style.display = "none";
    document.querySelector(".btn-hold").style.display = "none";
  } else {
    // if player doesn't win, than the other player's round
    nextPlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", newGame);
