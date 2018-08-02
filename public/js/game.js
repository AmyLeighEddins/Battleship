const boardSize = 10; // make boards 10x10
const player1Board = Array(boardSize);
const player2Board = Array(boardSize);
let gameStatus = 'setup';
let playerTurn = 1;
let opponentTurn = 2;
// need alternate array names since we are switching between the two players
let playerArray = player1Board;
let opponentArray = player2Board;

/**
 * @name setupBoards
 * @desc sets up the player and opponent boards at the start of the game
 */
function setupBoards() {
  // set boards to their html elements
  const opponentBoardElement = document.getElementById('opponentBoard');
  const playerBoardElement = document.getElementById('playerBoard');
  for (let i = 0; i < boardSize; i += 1) { // loop through double array to create array and create td elements to create table
    // board will be 10x10
    player2Board[i] = Array(boardSize);
    player1Board[i] = Array(boardSize);
    // create row element so it creates a new row every 10 spaces
    const opponentRowElement = document.createElement('tr');
    const playerRowElement = document.createElement('tr');
    // add row element to the table
    opponentBoardElement.appendChild(opponentRowElement);
    playerBoardElement.appendChild(playerRowElement);
    for (let j = 0; j < boardSize; j += 1) {
      // set them all to the string false since we'll have more statuses than true and false
      player2Board[i][j] = 'false';
      player1Board[i][j] = 'false';
      // create table data element (space)
      const opponentSpaceElement = document.createElement('td');
      const playerSpaceElement = document.createElement('td');
      // add an id to the space with the number
      opponentSpaceElement.setAttribute('id', `opponentBoard${(i * boardSize) + j}`);
      playerSpaceElement.setAttribute('id', `playerBoard${(i * boardSize) + j}`);
      // add the click function
      opponentSpaceElement.setAttribute('onclick', `checkIfHit(${i},${j})`);
      playerSpaceElement.setAttribute('onclick', `setShip(${i},${j})`);
      // add the space element to the table row
      opponentRowElement.appendChild(opponentSpaceElement);
      playerRowElement.appendChild(playerSpaceElement);
    }
  }
}

/**
 * @name checkIfHit
 * @param {number} x first index of the associated array of space element getting hit
 * @param {number} y second index of the associated array of space element getting hit
 * @desc check if the click hits a ship, set the status of the space on the array, and change the color of the space depending on the status
 */
function checkIfHit(x, y) {
  if (gameStatus !== 'attack') return;
  const opponentSpaceElem = document.getElementById(`opponentBoard${(x * boardSize) + y}`);
  const playerSpaceElem = document.getElementById(`playerBoard${(x * boardSize) + y}`);
  if (opponentArray[x][y] === 'ship') { // move was a hit
    opponentArray[x][y] = 'hit';
    playerSpaceElem.style.backgroundColor = 'red';
    opponentSpaceElem.style.backgroundColor = 'red';
    //  add check for if the player sunk a ship
    if (!checkForWinCondition()) { // check if the player won the game before going to the next turn
      alert('HIT!');
      nextTurn();
    }
  } else if (opponentArray[x][y] === 'miss' || opponentArray[x][y] === 'hit') { // move has already been tried
    alert('Already Taken. Try again.');
  } else { // move was a miss
    opponentArray[x][y] = 'miss';
    opponentSpaceElem.style.backgroundColor = 'white';
    alert('Miss.');
    nextTurn();
  }
}

/**
 * @name setShip
 * @param {number} x first index of the associated array of space element becoming a ship
 * @param {number} y second index of the associated array of space element becoming a ship
 * @desc set the space at the index to grey for a ship space or lightblue if it was already grey to show it isn't a ship space anymore
 * and set the status of the space on the array
 */
function setShip(x, y) {
  if (gameStatus !== 'setup') return;
  const spaceElem = document.getElementById(`playerBoard${(x * boardSize) + y}`);
  if (spaceElem.style.backgroundColor === 'grey') {
    spaceElem.style.backgroundColor = 'lightblue';
    playerArray[x][y] = 'false';
  } else {
    spaceElem.style.backgroundColor = 'grey';
    playerArray[x][y] = 'ship';
  }
}

/**
 * @name submitShips
 * @desc submit your placement of ships
 */
function submitShips() {
  // add check if ships are correct
  gameStatus = playerTurn === 1 ? 'setup' : 'attack'; // change the game status to attack if it was player 2 who just submitted their ships
  playerTurn = playerTurn === 1 ? 2 : 1; // switch whose turn it is
  opponentTurn = opponentTurn === 2 ? 1 : 2; // switch whose turn it is to be the opponent
  if (gameStatus === 'attack') {
    document.getElementById('submitButton').style.display = 'none'; // no submit button for attack turns
  }
  switchBoards();
}

/**
 * @name nextTurn
 * @desc user has chosen their one hit and it's the next player's turn
 */
function nextTurn() {
  playerTurn = playerTurn === 1 ? 2 : 1; // switch whose turn it is
  opponentTurn = opponentTurn === 2 ? 1 : 2; // switch whose turn it is to be the opponent
  switchBoards();
}

/**
 * @name switchBoards
 * @desc switch which board is which since it's the next player's turn
 */
function switchBoards() {
  // switch which array we use
  if (playerTurn === 1) {
    playerArray = player1Board;
    opponentArray = player2Board;
  } else {
    playerArray = player2Board;
    opponentArray = player1Board;
  }
  // switch colors displayed on boards
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      const playerSpaceElem = document.getElementById(`playerBoard${(i * boardSize) + j}`);
      const opponentSpaceElem = document.getElementById(`opponentBoard${(i * boardSize) + j}`);
      if (playerArray[i][j] === 'hit') playerSpaceElem.style.backgroundColor = 'red';
      else if (playerArray[i][j] === 'ship') playerSpaceElem.style.backgroundColor = 'grey';
      else playerSpaceElem.style.backgroundColor = 'lightblue';
      if (opponentArray[i][j] === 'hit') opponentSpaceElem.style.backgroundColor = 'red';
      else if (opponentArray[i][j] === 'miss') opponentSpaceElem.style.backgroundColor = 'white';
      else opponentSpaceElem.style.backgroundColor = 'lightblue';
    }
  }
}

/**
 * @name checkForWinCondition
 * @desc check if the hit won the game
 * @return bool for win or not
 */
function checkForWinCondition() {
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      if (opponentArray[i][j] === 'ship') return false;
    }
  }
  alert('WIN!');
  newGame();
  return true;
}

/**
 * @name newGame
 * @desc starts a new game
 */
function newGame() {
  // set defaults
  gameStatus = 'setup';
  playerTurn = 1;
  opponentTurn = 2;
  playerArray = player1Board;
  opponentArray = player2Board;
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      const playerSpaceElem = document.getElementById(`playerBoard${(i * boardSize) + j}`);
      const opponentSpaceElem = document.getElementById(`opponentBoard${(i * boardSize) + j}`);
      playerSpaceElem.style.backgroundColor = 'lightblue';
      opponentSpaceElem.style.backgroundColor = 'lightblue';
      player2Board[i][j] = 'false';
      player1Board[i][j] = 'false';
    }
  }
  document.getElementById('submitButton').style.display = 'block';// add back submit button
}

window.onload = () => {
  setupBoards();
};
