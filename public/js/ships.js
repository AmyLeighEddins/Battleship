/**
 * @name removeShipByIndex
 * @param {number} x first index of the associated array of space element
 * @param {number} y second index of the associated array of space element
 * @desc set the space at the index to light blue for a ship space to show it isn't a ship space anymore
 * and set the status of the space on the array and put the ship back in the dock, loop through for all 
 * spaces of this ship
 */
window.removeShipByIndex = function removeShipByIndex(x, y) {
  const shipRemoving = window.playerArray[x][y];
  window.removeShip(shipRemoving);
};

/**
 * @name removeShip
 * @param {String} shipRemoving first index of the associated array of space element
 * @desc set ship space to light blue to show it isn't a ship space anymore and set the status of
 * the space on the array and put the ship back in the dock, loop through for all spaces of this ship
 */
window.removeShip = function removeShip(shipRemoving) {
  // make sure game is in setup mode and the ship removing isn't 'false'
  if (window.gameStatus !== window.setupStatus || shipRemoving === window.defaultStatus) return false;
  // loop through array of ship indexes to remove the ship from board and double array
  window.shipsData[shipRemoving][`player${window.playerTurn}Location`].forEach((shipIndex) => {
    const xPos = Math.floor(shipIndex / window.boardSize);
    const yPos = shipIndex % window.boardSize;
    const spaceElem = document.getElementById(`playerBoard${shipIndex}`);
    spaceElem.style.backgroundColor = window.defaultColor;
    window.playerArray[xPos][yPos] = window.defaultStatus;
  });
  window.shipsData[shipRemoving][`player${window.playerTurn}Location`] = []; // remove ship indexes from array
  window.normalizeShip(window.shipsData[shipRemoving].name);
  return true;
};

/**
 * @name submitShips
 * @desc submit your placement of ships
 */
window.submitShips = function submitShips() {
  if (window.areAllShipsUsed()) {
    window.gameStatus = window.playerTurn === window.player1 ? window.setupStatus : window.attackStatus; // change the game status to attack if it was player 2 who just submitted their ships
    window.playerTurn = window.playerTurn === window.player1 ? window.player2 : window.player1; // switch whose turn it is
    document.getElementById(window.turnId).textContent = `Player ${window.playerTurn}'s Turn`;
    alert(`Player ${window.playerTurn}'s Turn`);
    if (window.gameStatus === window.attackStatus) {
      document.getElementById(window.submitButtonId).style.display = window.noDisplay; // no submit button for attack turns
      document.getElementById(window.shipDockId).style.display = window.noDisplay; // take away whole dock
    } else {
      window.shipArray.forEach((ship) => {
        window.normalizeShip(window.shipsData[ship].name);
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
  window.shipsData[ship].rotated = !window.shipsData[ship].rotated;
  document.getElementById(ship).style.transform = window.shipsData[ship].rotated ? 'rotate(90deg)' : 'rotate(0deg)';
};

/**
 * @name areAllShipsUsed
 * @desc return the boolean for whether all the ships are used
 */
window.areAllShipsUsed = function areAllShipsUsed() {
  let allUsed = true;
  window.shipArray.forEach((ship) => {
    if (window.shipsData[ship].isDisplayed) allUsed = false;
  });
  return allUsed;
};

/**
 * @name normalizeShip
 * @desc set ships back to normal position
 */
window.normalizeShip = function normalizeShip(ship) {
  if (window.shipsData[ship].rotated) document.getElementById(ship).style.transform = 'rotate(0deg)'; // normal rotation (vertical)
  window.shipsData[ship].rotated = false; // set rotated to false
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
  const posOfCursor = Math.ceil(window.shipsData[shipType].length / (window.shipsData[shipType].pixels / offsetY)); // calculate the position of the cursor on the ship
  // loop through a fill in ship spaces
  if (!window.shipsData[shipType].rotated) { // loop for when ship is vertical
    const indexOfBottomOfShip = index + ((window.shipsData[shipType].length - posOfCursor) * window.boardSize); // get the index of the bottom of the ship
    for (let i = window.shipsData[shipType].length - 1; i >= 0; i -= 1) {
      let spaceIndex = indexOfBottomOfShip - (i * window.boardSize);
      let xPos = Math.floor(spaceIndex / window.boardSize);
      try {
        if (window.playerArray[xPos][y] !== window.defaultStatus) { // make sure you're not putting a ship on top of another ship
          window.removeShip(shipType);
          alert('You cannot place your ship there. Try again.');
          return false;
        }
        // set ship
        document.getElementById(`playerBoard${spaceIndex}`).style.backgroundColor = window.shipColor;
        window.playerArray[xPos][y] = shipType;
        window.shipsData[shipType][`player${window.playerTurn}Location`].push(spaceIndex); // add location of ship to ship data for that player
      } catch (error) { // if there is an error remove all ship spaces just created
        window.removeShip(shipType);
        alert('You cannot place your ship there. Try again.');
        return false;
      }
    }
  } else { // loop for when ship is horizontal
    const indexOfLeftOfShip = index - ((window.shipsData[shipType].length - posOfCursor)); // get the index of the leftmost space of the ship
    const row = Math.floor(indexOfLeftOfShip / window.boardSize); // save what row ship is on
    for (let i = window.shipsData[shipType].length - 1; i >= 0; i -= 1) {
      let spaceIndex = indexOfLeftOfShip + i;
      let yPos = spaceIndex % window.boardSize;
      try {
        if (Math.floor((spaceIndex) / window.boardSize) !== row) { // make sure part of ship is not put on next row
          window.normalizeShip(shipType);
          alert('You cannot place your ship there. Try again.');
          return false;
        }
        if (window.playerArray[x][yPos] !== window.defaultStatus) { // make sure you're not putting a ship on top of another ship
          window.removeShip(shipType);
          alert('You cannot place your ship there. Try again.');
          return false;
        }
        // set ship
        document.getElementById(`playerBoard${spaceIndex}`).style.backgroundColor = window.shipColor;
        window.playerArray[x][yPos] = shipType;
        window.shipsData[shipType][`player${window.playerTurn}Location`].push(spaceIndex); // add location of ship to ship data for that player
      } catch (error) { // if there is an error remove all ship spaces just created
        window.removeShip(shipType);
        alert('You cannot place your ship there. Try again.');
        return false;
      }
    }
  }
  document.getElementById(shipType).style.display = window.noDisplay; // remove the ship from the dock
  window.shipsData[shipType].isDisplayed = false;
  return true;
};
