/**
 * @name nextTurn
 * @desc user has chosen their one hit and it's the next player's turn
 */
window.nextTurn = function nextTurn() {
  window.playerTurn = window.playerTurn === window.player1 ? window.player2 : window.player1; // switch whose turn it is
  document.getElementById(window.turnId).textContent = `Player ${window.playerTurn}'s Turn`;
  alert(`Player ${window.playerTurn}'s Turn`);
  window.switchBoards();
};

/**
 * @name newGame
 * @desc starts a new game
 */
window.newGame = function newGame() {
  // set defaults
  window.gameStatus = window.setupStatus;
  window.playerTurn = window.player1;
  document.getElementById(window.turnId).setAttribute('text', window.player1Turn);
  window.playerArray = window.player1Board;
  window.opponentArray = window.player2Board;
  for (let i = 0; i < window.boardSize; i += 1) {
    for (let j = 0; j < window.boardSize; j += 1) {
      const playerSpaceElem = document.getElementById(`playerBoard${(i * window.boardSize) + j}`);
      const opponentSpaceElem = document.getElementById(`opponentBoard${(i * window.boardSize) + j}`);
      playerSpaceElem.style.backgroundColor = window.defaultColor;
      opponentSpaceElem.style.backgroundColor = window.defaultColor;
      window.player2Board[i][j] = window.defaultStatus;
      window.player1Board[i][j] = window.defaultStatus;
    }
  }
  window.shipArray.forEach((ship) => {
    window.normalizeShip(window.shipsData[ship].name);
  });
  document.getElementById(window.submitButtonId).style.display = window.block;// add back submit button
  document.getElementById(window.shipDockId).style.display = window.block; // add back dock
};

/**
 * @name onload
 * @desc on loading the page setup boards
 */
window.onload = () => {
  window.setupBoards();
};
