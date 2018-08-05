/**
 * @name nextTurn
 * @desc user has chosen their one hit and it's the next player's turn
 */
window.nextTurn = function nextTurn() {
  window.playerTurn = window.playerTurn === window.player1 ? window.player2 : window.player1; // switch whose turn it is
  const playerTurnString = window.playerTurn === window.player1 ? window.player1Turn : window.player2Turn;
  document.getElementById('playersTurn').textContent = playerTurnString;
  alert(playerTurnString);
  window.switchBoards();
};

/**
 * @name newGame
 * @desc starts a new game
 */
window.newGame = function newGame() {
  // set defaults
  window.gameStatus = 'setup';
  window.playerTurn = window.player1;
  document.getElementById('playersTurn').setAttribute('text', window.player1Turn);
  window.playerArray = window.player1Board;
  window.opponentArray = window.player2Board;
  for (let i = 0; i < window.boardSize; i += 1) {
    for (let j = 0; j < window.boardSize; j += 1) {
      const playerSpaceElem = document.getElementById(`playerBoard${(i * window.boardSize) + j}`);
      const opponentSpaceElem = document.getElementById(`opponentBoard${(i * window.boardSize) + j}`);
      playerSpaceElem.style.backgroundColor = window.defaultColor;
      opponentSpaceElem.style.backgroundColor = window.defaultColor;
      window.player2Board[i][j] = 'false';
      window.player1Board[i][j] = 'false';
    }
  }
  window.shipArray.forEach((ship) => {
    window.normalizeShip(window.shipsDataArray[ship].name);
  });
  document.getElementById('submitButton').style.display = window.block;// add back submit button
  document.getElementById('shipsDock').style.display = window.block; // add back dock
};

/**
 * @name onload
 * @desc on loading the page setup boards
 */
window.onload = () => {
  window.setupBoards();
};
