window.boardSize = 10; // board size, normal game is 10x10
window.shipSize = 35; // size of one space of ship in px
// defaults
window.player1Board = Array(window.boardSize);
window.player2Board = Array(window.boardSize);
window.gameStatus = 'setup';
window.playerTurn = 1;
// need alternate array names since we are switching between the two players
window.playerArray = window.player1Board;
window.opponentArray = window.player2Board;
window.carrierRotated = false;
window.battleshipRotated = false;
window.cruiserRotated = false;
window.submarineRotated = false;
window.destroyerRotated = false;
// text
window.defaultColor = 'lightblue';
window.shipColor = 'grey';
window.missColor = 'white';
window.hitColor = 'red';
window.noDisplay = 'none';
window.block = 'block';
window.inlineBlock = 'inline-block';
window.player1Turn = "Player 1's Turn";
window.player2Turn = "Player 2's Turn";
