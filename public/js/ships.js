const carrier = 5;
const battleship = 4;
const cruiser = 3;
const submarine = 3;
const destroyer = 2;
let shipSpaceSize = 0;

/**
 * @name removeShip
 * @param {number} x first index of the associated array of space element
 * @param {number} y second index of the associated array of space element
 * @desc set the space at the index to light blue for a ship space to show it isn't a ship space anymore
 * and set the status of the space on the array and put the ship back in the dock
 */
window.removeShip = function removeShip(x, y) {
  if (window.gameStatus !== 'setup') return false;
  const shipRemoving = `${window.playerArray[x][y]}`;
  if (['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'].includes(window.playerArray[x][y])) {
    for (let i = 0; i < window.boardSize; i += 1) {
      for (let j = 0; j < window.boardSize; j += 1) {
        if (window.playerArray[i][j] === shipRemoving) {
          const spaceElem = document.getElementById(`playerBoard${(i * window.boardSize) + j}`);
          spaceElem.style.backgroundColor = window.defaultColor;
          document.getElementById(`${window.playerArray[i][j]}`).style.display = window.inlineBlock;
          window.playerArray[i][j] = 'false';
        }
      }
    }
  }
  return true;
};

/**
 * @name submitShips
 * @desc submit your placement of ships
 */
window.submitShips = function submitShips() {
  if (document.getElementById('carrier').style.display === window.noDisplay &&
  document.getElementById('battleship').style.display === window.noDisplay &&
  document.getElementById('cruiser').style.display === window.noDisplay &&
  document.getElementById('submarine').style.display === window.noDisplay &&
  document.getElementById('destroyer').style.display === window.noDisplay) {
    window.gameStatus = window.playerTurn === 1 ? 'setup' : 'attack'; // change the game status to attack if it was player 2 who just submitted their ships
    window.playerTurn = window.playerTurn === 1 ? 2 : 1; // switch whose turn it is
    const playerTurnString = window.playerTurn === 1 ? window.player1Turn : window.player2Turn;
    document.getElementById('playersTurn').textContent = playerTurnString;
    alert(playerTurnString);
    if (window.gameStatus === 'attack') {
      document.getElementById('submitButton').style.display = window.noDisplay; // no submit button for attack turns
      document.getElementById('shipsDock').style.display = window.noDisplay; // take away whole dock
    } else {
      window.normalizeShips();
    }
    window.switchBoards();
  } else {
    alert('You have not placed all your ships.');
    return false;
  }
};

/**
 * @name rotateShip
 * @param {string} ship 
 * @desc rotate the ship 90 deg and set the rotate boolean
 */
window.rotateShip = function rotateShip(ship) {
  eval(`window.${ship}Rotated = !window.${ship}Rotated`);
  document.getElementById(ship).style.transform = eval(`window.${ship}Rotated`) ? 'rotate(90deg)' : 'rotate(0deg)';
};

/**
 * @name normalizeShips
 * @desc set ships back to normal position
 */
window.normalizeShips = function normalizeShips() {
  // normal rotation (vertical)
  if (window.carrierRotated) document.getElementById('carrier').style.transform = 'rotate(0deg)';
  if (window.battleshipRotated) document.getElementById('battleship').style.transform = 'rotate(0deg)';
  if (window.cruiserRotated) document.getElementById('cruiser').style.transform = 'rotate(0deg)';
  if (window.submarineRotated) document.getElementById('submarine').style.transform = 'rotate(0deg)';
  if (window.destroyerRotated) document.getElementById('destroyer').style.transform = 'rotate(0deg)';
  // rotated to false
  window.carrierRotated = false;
  window.battleshipRotated = false;
  window.cruiserRotated = false;
  window.submarineRotated = false;
  window.destroyerRotated = false;
  // add back ships
  document.getElementById('carrier').style.display = window.inlineBlock;
  document.getElementById('battleship').style.display = window.inlineBlock;
  document.getElementById('cruiser').style.display = window.inlineBlock;
  document.getElementById('submarine').style.display = window.inlineBlock;
  document.getElementById('destroyer').style.display = window.inlineBlock;
};

/**
 * @name drag
 * @param {event} ev event object from when you pick up the ship object
 * @param {number} size board space size of the ship
 * @desc when you click on the ship to drag it over this is called by ondragstart
 */
window.drag = function drag(ev, size) {
  ev.dataTransfer.setData('ship', ev.target.id); // save ship type
  ev.dataTransfer.setData('offsetY', ev.offsetY); // get offset so we know where mouse is vertically on ship
  shipSpaceSize = size; // get how big ship is
};

/**
 * @name allowDrop
 * @param {event} ev event object from when you are about to drop the ship
 * @desc when you are about to drop the ship this is called by ondragover
 */
window.allowDrop = function allowDrop(ev) {
  ev.preventDefault();
};

/**
 * @name drop
 * @param {event} ev event object from when you drop the ship on the board
 * @param {number} index 0-99 of space on board
 * @desc when you drop the ship this is called by ondrop
 */
window.drop = function drop(ev, index, x, y) {
  ev.preventDefault();
  const shipType = ev.dataTransfer.getData('ship');
  const offsetY = ev.dataTransfer.getData('offsetY');
  let shipLength = 0;
  eval(`shipLength = ${shipType} * window.shipSize`); // Calculate ship length in px
  const posOfCursor = Math.ceil(shipSpaceSize / (shipLength / offsetY)); // calculate the position of the cursor on the ship
  // loop through a fill in ship spaces
  if (!eval(`window.${shipType}Rotated`)) { // loop for when ship is vertical
    const indexOfBottomOfShip = index + ((shipSpaceSize - posOfCursor) * window.boardSize); // get the index of the bottom of the ship
    for (let i = shipSpaceSize - 1; i >= 0; i -= 1) {
      let spaceIndex = indexOfBottomOfShip - (i * window.boardSize);
      let xPos = Math.floor(spaceIndex / 10);
      try {
        document.getElementById(`playerBoard${spaceIndex}`).style.backgroundColor = window.shipColor;
        window.playerArray[xPos][y] = `${shipType}`;
      } catch (error) { // if there is an error remove all ship spaces just created
        alert('You cannot place your ship there. Try again.');
        for (let j = shipSpaceSize - 1; j >= 0; j -= 1) {
          try {
            spaceIndex = indexOfBottomOfShip - (j * window.boardSize);
            xPos = Math.floor(spaceIndex / 10);
            document.getElementById(`playerBoard${spaceIndex}`).style.backgroundColor = window.defaultColor;
            window.playerArray[xPos][y] = 'false';
          } catch (error) {
            return false;
          }
        }
      }
    }
  } else { // loop for when ship is horizontal
    const indexOfLeftOfShip = index - ((shipSpaceSize - posOfCursor)); // get the index of the leftmost space of the ship
    const row = Math.floor(indexOfLeftOfShip / 10); // save what row ship is on
    for (let i = shipSpaceSize - 1; i >= 0; i -= 1) {
      let spaceIndex = indexOfLeftOfShip + i;
      let yPos = spaceIndex % 10;
      try {
        if (Math.floor((spaceIndex) / 10) !== row) { // make sure part of ship is not put on next row
          alert('You cannot place your ship there. Try again.');
          return false;
        }
        document.getElementById(`playerBoard${spaceIndex}`).style.backgroundColor = window.shipColor;
        window.playerArray[x][yPos] = `${shipType}`;
      } catch (error) { // if there is an error remove all ship spaces just created
        alert('You cannot place your ship there. Try again.');
        for (let j = shipSpaceSize - 1; j >= 0; j -= 1) {
          try {
            spaceIndex = indexOfLeftOfShip + j;
            yPos = spaceIndex % 10;
            document.getElementById(`playerBoard${spaceIndex}`).style.backgroundColor = window.defaultColor;
            window.playerArray[x][yPos] = 'false';
          } catch (error) {
            return false;
          }
        }
      }
    }
  }
  document.getElementById(shipType).style.display = window.noDisplay; // remove the ship from the dock
};
