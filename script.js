"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Starting Conditions
let scores, currentScore, activePlayer, playing;

const initialize = function () {
  scores = [0, 0];

  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
initialize();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generating random dice roll
    const dice = Number(Math.trunc(Math.random() * 6)) + 1;
    console.log(dice);

    //Display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // Check rolled for 1 :true ? switch to next player
    if (dice !== 1) {
      //Add  dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // Change later
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//Functionality for Hold button
btnHold.addEventListener("click", function () {
  if (playing) {
    //1.Add current core to score of active player
    scores[activePlayer] += currentScore; // score[1]=score[1]+current score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if score is >=100

    if (scores[activePlayer] >= 50) {
      //Finish Game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }

    //3.Switch player
    switchPlayer();
  }
});

//New Game

btnNew.addEventListener("click", initialize);
