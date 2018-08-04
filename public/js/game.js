const boardSize = 10; // make boards 10x10
const shipSize = 35;
const player1Board = Array(boardSize);
const player2Board = Array(boardSize);
let gameStatus = 'setup';
let playerTurn = 1;
let opponentTurn = 2;
// need alternate array names since we are switching between the two players
let playerArray = player1Board;
let opponentArray = player2Board;
let carrierRotated = false;
let battleshipRotated = false;
let cruiserRotated = false;
let submarineRotated = false;
let destroyerRotated = false;
let shipSpaceSize = 0;
const carrier = 5;
const battleship = 4;
const cruiser = 3;
const submarine = 3;
const destroyer = 2;
const defaultColor = 'lightblue';
const shipColor = 'grey';
const missColor = 'white';
const hitColor = 'red';

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
      playerSpaceElement.setAttribute('onclick', `removeShip(${i},${j})`);
      // add drag and drop function calls
      playerSpaceElement.setAttribute('ondragover', 'allowDrop(event)');
      playerSpaceElement.setAttribute('ondrop', `drop(event, ${(i * boardSize) + j}, ${i}, ${j})`);
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
  if (gameStatus !== 'attack') return false;
  const shipType = opponentArray[x][y];
  const opponentSpaceElem = document.getElementById(`opponentBoard${(x * boardSize) + y}`);
  const playerSpaceElem = document.getElementById(`playerBoard${(x * boardSize) + y}`);
  if (['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'].includes(opponentArray[x][y])) { // move was a hit
    opponentArray[x][y] = 'hit';
    playerSpaceElem.style.backgroundColor = hitColor;
    opponentSpaceElem.style.backgroundColor = hitColor;
    if (!checkForWinCondition() && !checkIfShipSunk(shipType)) { // check if the player won the game before going to the next turn
      alert('HIT!');
      nextTurn();
    }
  } else if (opponentArray[x][y] === 'miss' || opponentArray[x][y] === 'hit') { // move has already been tried
    alert('Already Taken. Try again.');
  } else { // move was a miss
    opponentArray[x][y] = 'miss';
    opponentSpaceElem.style.backgroundColor = missColor;
    alert('Miss.');
    nextTurn();
  }
}

/**
 * @name removeShip
 * @param {number} x first index of the associated array of space element
 * @param {number} y second index of the associated array of space element
 * @desc set the space at the index to light blue for a ship space to show it isn't a ship space anymore
 * and set the status of the space on the array and put the ship back in the dock
 */
function removeShip(x, y) {
  if (gameStatus !== 'setup') return false;
  const shipRemoving = `${playerArray[x][y]}`;
  if (['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'].includes(playerArray[x][y])) {
    for (let i = 0; i < boardSize; i += 1) {
      for (let j = 0; j < boardSize; j += 1) {
        if (playerArray[i][j] === shipRemoving) {
          const spaceElem = document.getElementById(`playerBoard${(i * boardSize) + j}`);
          spaceElem.style.backgroundColor = defaultColor;
          document.getElementById(`${playerArray[i][j]}`).style.display = 'inline-block';
          playerArray[i][j] = 'false';
        }
      }
    }
  }
}

/**
 * @name submitShips
 * @desc submit your placement of ships
 */
function submitShips() {
  if (document.getElementById('carrier').style.display === 'none' &&
  document.getElementById('battleship').style.display === 'none' &&
  document.getElementById('cruiser').style.display === 'none' &&
  document.getElementById('submarine').style.display === 'none' &&
  document.getElementById('destroyer').style.display === 'none') {
    gameStatus = playerTurn === 1 ? 'setup' : 'attack'; // change the game status to attack if it was player 2 who just submitted their ships
    playerTurn = playerTurn === 1 ? 2 : 1; // switch whose turn it is
    opponentTurn = opponentTurn === 2 ? 1 : 2; // switch whose turn it is to be the opponent
    if (gameStatus === 'attack') {
      document.getElementById('submitButton').style.display = 'none'; // no submit button for attack turns
    }
    document.getElementById('carrier').style.display = 'inline-block';
    document.getElementById('battleship').style.display = 'inline-block';
    document.getElementById('cruiser').style.display = 'inline-block';
    document.getElementById('submarine').style.display = 'inline-block';
    document.getElementById('destroyer').style.display = 'inline-block';
    switchBoards();
  } else {
    alert('You have not placed all your ships.');
    return false;
  }
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
      if (playerArray[i][j] === 'hit') playerSpaceElem.style.backgroundColor = hitColor;
      else if (['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'].includes(playerArray[i][j])) playerSpaceElem.style.backgroundColor = shipColor;
      else playerSpaceElem.style.backgroundColor = defaultColor;
      if (opponentArray[i][j] === 'hit') opponentSpaceElem.style.backgroundColor = hitColor;
      else if (opponentArray[i][j] === 'miss') opponentSpaceElem.style.backgroundColor = missColor;
      else opponentSpaceElem.style.backgroundColor = defaultColor;
    }
  }
}

/**
 * @name checkIfShipSunk
 * @param {string} ship 
 * @desc check if the player sunk a ship
 */
function checkIfShipSunk(ship) {
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      if (opponentArray[i][j] === ship) return false;
    }
  }
  alert(`You sunk their ${ship}.`);
  return true;
}

/**
 * @name checkForWinCondition
 * @desc check if the hit won the game
 * @return bool for win or not
 */
function checkForWinCondition() {
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      if (['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'].includes(opponentArray[i][j])) return false;
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
      playerSpaceElem.style.backgroundColor = defaultColor;
      opponentSpaceElem.style.backgroundColor = defaultColor;
      player2Board[i][j] = 'false';
      player1Board[i][j] = 'false';
    }
  }
  document.getElementById('submitButton').style.display = 'block';// add back submit button
  // add back ships
  document.getElementById('carrier').style.display = 'inline-block';
  document.getElementById('battleship').style.display = 'inline-block';
  document.getElementById('cruiser').style.display = 'inline-block';
  document.getElementById('submarine').style.display = 'inline-block';
  document.getElementById('destroyer').style.display = 'inline-block';
}

/**
 * @name rotateShip
 * @param {string} ship 
 * @desc rotate the ship 90 deg and set the rotate boolean
 */
function rotateShip(ship) {
  eval(`${ship}Rotated = !${ship}Rotated`);
  document.getElementById(ship).style.transform = eval(`${ship}Rotated`) ? 'rotate(90deg)' : 'rotate(0deg)';
}

/**
 * @name drag
 * @param {event} ev event object from when you pick up the ship object
 * @param {number} size board space size of the ship
 * @desc when you click on the ship to drag it over this is called by ondragstart
 */
function drag(ev, size) {
  ev.dataTransfer.setData('ship', ev.target.id); // save ship type
  ev.dataTransfer.setData('offsetY', ev.offsetY); // get offset so we know where mouse is vertically on ship
  shipSpaceSize = size; // get how big ship is
  // offsetY = ev.offsetY; // get offset so we know where mouse is vertically on ship
}

/**
 * @name allowDrop
 * @param {event} ev event object from when you are about to drop the ship
 * @desc when you are about to drop the ship this is called by ondragover
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * @name drop
 * @param {event} ev event object from when you drop the ship on the board
 * @param {number} index 0-99 of space on board
 * @desc when you drop the ship this is called by ondrop
 */
function drop(ev, index, x, y) {
  ev.preventDefault();
  const shipType = ev.dataTransfer.getData('ship');
  const offsetY = ev.dataTransfer.getData('offsetY');
  // Calculate ship length in px
  let shipLength = 0;
  if (shipType === 'carrier') shipLength = carrier * shipSize;
  if (shipType === 'battleship') shipLength = battleship * shipSize;
  if (shipType === 'cruiser') shipLength = cruiser * shipSize;
  if (shipType === 'submarine') shipLength = submarine * shipSize;
  if (shipType === 'destroyer') shipLength = destroyer * shipSize;
  const posOfCursor = Math.ceil(shipSpaceSize / (shipLength / offsetY)); // calculate the position of the cursor on the ship
  const indexOfBottomOfShip = index + ((shipSpaceSize - posOfCursor) * boardSize); // get the index of the bottom of the ship
  // loop through a fill in ship spaces
  if (!eval(`${shipType}Rotated`)) { // loop for when ship is vertical
    for (let i = shipSpaceSize - 1; i >= 0; i -= 1) {
      try {
        document.getElementById(`playerBoard${indexOfBottomOfShip - (i * boardSize)}`).style.backgroundColor = shipColor;
        playerArray[x + i][y] = `${shipType}`;
      } catch (error) { // if there is an error remove all ship spaces just created
        alert('You cannot place your ship there. Try again.');
        for (let j = shipSpaceSize - 1; j >= 0; j -= 1) {
          try {
            document.getElementById(`playerBoard${indexOfBottomOfShip - (j * boardSize)}`).style.backgroundColor = defaultColor;
            playerArray[x + j][y] = 'false';
          } catch (error) {
            return false;
          }
        }
      }
    }
  } else { // loop for when ship is horizontal
    const row = Math.floor(indexOfBottomOfShip / 10); // save what row ship is on
    for (let i = shipSpaceSize - 1; i >= 0; i -= 1) {
      try {
        if (Math.floor((indexOfBottomOfShip + i) / 10) !== row) { // make sure part of ship is not put on next row
          alert('You cannot place your ship there. Try again.');
          return false;
        }
        document.getElementById(`playerBoard${indexOfBottomOfShip + i}`).style.backgroundColor = shipColor;
        playerArray[x][y + i] = `${shipType}`;
      } catch (error) { // if there is an error remove all ship spaces just created
        alert('You cannot place your ship there. Try again.');
        for (let j = shipSpaceSize - 1; j >= 0; j -= 1) {
          try {
            document.getElementById(`playerBoard${indexOfBottomOfShip + j}`).style.backgroundColor = defaultColor;
            playerArray[x][y + j] = 'false';
          } catch (error) {
            return false;
          }
        }
      }
    }
  }

  document.getElementById(shipType).style.display = 'none'; // remove the ship from the dock
}

/**
 * @name onload
 * @desc on loading the page setup boards
 */
window.onload = () => {
  setupBoards();
};
