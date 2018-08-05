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
  if (window.shipArray.includes(window.playerArray[x][y])) {
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
  if (window.areAllShipsUsed()) {
    window.gameStatus = window.playerTurn === window.player1 ? 'setup' : 'attack'; // change the game status to attack if it was player 2 who just submitted their ships
    window.playerTurn = window.playerTurn === window.player1 ? window.player2 : window.player1; // switch whose turn it is
    const playerTurnString = window.playerTurn === window.player1 ? window.player1Turn : window.player2Turn;
    document.getElementById('playersTurn').textContent = playerTurnString;
    alert(playerTurnString);
    if (window.gameStatus === 'attack') {
      document.getElementById('submitButton').style.display = window.noDisplay; // no submit button for attack turns
      document.getElementById('shipsDock').style.display = window.noDisplay; // take away whole dock
    } else {
      window.shipArray.forEach((ship) => {
        window.normalizeShip(window.shipsDataArray[ship].name);
      });
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
  window.shipsDataArray[ship].rotated = !window.shipsDataArray[ship].rotated;
  document.getElementById(ship).style.transform = window.shipsDataArray[ship].rotated ? 'rotate(90deg)' : 'rotate(0deg)';
};

/**
 * @name areAllShipsUsed
 * @desc return the boolean for whether all the ships are used
 */
window.areAllShipsUsed = function areAllShipsUsed() {
  let allUsed = true;
  window.shipArray.forEach((ship) => {
    if (window.shipsDataArray[ship].isDisplayed) allUsed = false;
  });
  return allUsed;
};

/**
 * @name normalizeShip
 * @desc set ships back to normal position
 */
window.normalizeShip = function normalizeShip(ship) {
  if (window.shipsDataArray[ship].rotated) document.getElementById(ship).style.transform = 'rotate(0deg)'; // normal rotation (vertical)
  window.shipsDataArray[ship].rotated = false; // set rotated to false
  document.getElementById(ship).style.display = window.inlineBlock; // add back ships
};

/**
 * @name drag
 * @param {event} ev event object from when you pick up the ship object
 * @param {number} size board space size of the ship
 * @desc when you click on the ship to drag it over this is called by ondragstart
 */
window.drag = function drag(ev) {
  ev.dataTransfer.setData('ship', ev.target.id); // save ship type
  ev.dataTransfer.setData('offsetY', ev.offsetY); // get offset so we know where mouse is vertically on ship
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
  const posOfCursor = Math.ceil(window.shipsDataArray[shipType].length / (window.shipsDataArray[shipType].pixels / offsetY)); // calculate the position of the cursor on the ship
  // loop through a fill in ship spaces
  if (!window.shipsDataArray[shipType].rotated) { // loop for when ship is vertical
    const indexOfBottomOfShip = index + ((window.shipsDataArray[shipType].length - posOfCursor) * window.boardSize); // get the index of the bottom of the ship
    for (let i = window.shipsDataArray[shipType].length - 1; i >= 0; i -= 1) {
      let spaceIndex = indexOfBottomOfShip - (i * window.boardSize);
      let xPos = Math.floor(spaceIndex / window.boardSize);
      try {
        document.getElementById(`playerBoard${spaceIndex}`).style.backgroundColor = window.shipColor;
        window.playerArray[xPos][y] = `${shipType}`;
      } catch (error) { // if there is an error remove all ship spaces just created
        alert('You cannot place your ship there. Try again.');
        for (let j = window.shipsDataArray[shipType].length - 1; j >= 0; j -= 1) {
          try {
            spaceIndex = indexOfBottomOfShip - (j * window.boardSize);
            xPos = Math.floor(spaceIndex / window.boardSize);
            document.getElementById(`playerBoard${spaceIndex}`).style.backgroundColor = window.defaultColor;
            window.playerArray[xPos][y] = 'false';
          } catch (error2) {
            return false;
          }
        }
      }
    }
  } else { // loop for when ship is horizontal
    const indexOfLeftOfShip = index - ((window.shipsDataArray[shipType].length - posOfCursor)); // get the index of the leftmost space of the ship
    const row = Math.floor(indexOfLeftOfShip / window.boardSize); // save what row ship is on
    for (let i = window.shipsDataArray[shipType].length - 1; i >= 0; i -= 1) {
      let spaceIndex = indexOfLeftOfShip + i;
      let yPos = spaceIndex % window.boardSize;
      try {
        if (Math.floor((spaceIndex) / window.boardSize) !== row) { // make sure part of ship is not put on next row
          alert('You cannot place your ship there. Try again.');
          return false;
        }
        document.getElementById(`playerBoard${spaceIndex}`).style.backgroundColor = window.shipColor;
        window.playerArray[x][yPos] = `${shipType}`;
      } catch (error) { // if there is an error remove all ship spaces just created
        alert('You cannot place your ship there. Try again.');
        for (let j = window.shipsDataArray[shipType].length - 1; j >= 0; j -= 1) {
          try {
            spaceIndex = indexOfLeftOfShip + j;
            yPos = spaceIndex % window.boardSize;
            document.getElementById(`playerBoard${spaceIndex}`).style.backgroundColor = window.defaultColor;
            window.playerArray[x][yPos] = 'false';
          } catch (error2) {
            return false;
          }
        }
      }
    }
  }
  document.getElementById(shipType).style.display = window.noDisplay; // remove the ship from the dock
  window.shipsDataArray[shipType].isDisplayed = false;
  return true;
};
