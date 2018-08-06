window.boardSize = 10; // board size, normal game is 10x10
window.spaceSize = 35; // size of one space of ship in px
window.player2 = 2;
window.player1 = 1;
// defaults
window.player1Board = Array(window.boardSize);
window.player2Board = Array(window.boardSize);
window.gameStatus = 'setup';
window.playerTurn = 1;
// need alternate array names since we are switching between the two players
window.playerArray = window.player1Board;
window.opponentArray = window.player2Board;
// text constants
window.defaultColor = 'lightblue';
window.shipColor = 'grey';
window.missColor = 'white';
window.hitColor = 'red';
window.defaultStatus = 'false';
window.missStatus = 'miss';
window.hitStatus = 'hit';
window.setupStatus = 'setup';
window.attackStatus = 'attack';
window.player1Turn = "Player 1's Turn";
//css
window.noDisplay = 'none';
window.block = 'block';
window.inlineBlock = 'inline-block';
// ids
window.submitButtonId = 'submitButton';
window.shipDockId = 'shipsDock';
window.turnId = 'playersTurn';
// ships
window.shipArray = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
window.shipsData = {
  carrier: {
    name: 'carrier',
    isDisplayed: true,
    rotated: false,
    length: 5,
    pixels: 5 * window.spaceSize,
    player1Location: [],
    player2Location: []
  },
  battleship: {
    name: 'battleship',
    isDisplayed: true,
    rotated: false,
    length: 4,
    pixels: 4 * window.spaceSize,
    player1Location: [],
    player2Location: []
  },
  cruiser: {
    name: 'cruiser',
    isDisplayed: true,
    rotated: false,
    length: 3,
    pixels: 3 * window.spaceSize,
    player1Location: [],
    player2Location: []
  },
  submarine: {
    name: 'submarine',
    isDisplayed: true,
    rotated: false,
    length: 3,
    pixels: 3 * window.spaceSize,
    player1Location: [],
    player2Location: []
  },
  destroyer: {
    name: 'destroyer',
    isDisplayed: true,
    rotated: false,
    length: 2,
    pixels: 2 * window.spaceSize,
    player1Location: [],
    player2Location: []
  },
};
