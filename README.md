# battleship
Battleship game using JavaScript

How to run:

Open the index.html file in your browser to play BattleShipt.

Rules:

Ships:
  - Carrier is 5 spaces long
  - Battleship is 4 spaces long
  - Cruiser is 3 spaces long
  - Submarine is 3 spaces long
  - Destroyer is 2 spaces long

1. Player 1 picks their ship placement by dragging and dropping the ships. They can be placed horizontally or vertically. They can rotate the ship by clicking on it. If they want to remove a ship they can just click on one of the spaces of that ship and it will go back to the dock. The game will not let the user continue until they place all their ships. It will also not let them place a ship partially off the board. If they try it will tell them to try again. When finished they will click submit. Then it will tell them it's the next player's turn.
2. Player 2 does the same. Submit button and dock go away after the ships are setup. 
3. Then the game begins. The turns go as follows:
  - Player clicks on a space on the opponent board.
    - If it's a hit: they receive an alert telling them it's a hit and it turns red on their opponent board.
    - If it's a miss: they receive an alert telling them it's a miss and it turns white on their opponent board.
    - If it's already been tried then an alert will tell them so and they can try again.
    - If the move causes a ship to sink they receive an alert telling them what ship they sunk. 
    - If the move causes them to win the game they receive an alert telling them so. Then a new game is started.
  - Once a valid move has been chosen it alerts them it's the next player's turn and switches to the next player's turn.

Notes:

- There is a New Game button that can be used at any time. 
- There is text at the top saying whose turn it is.

Problems:

- Having trouble getting the drag image to show up correctly if it has been rotated. From looking online it seems that the transform doesn't come through with the drag object. However, when you put it back down it's still rotated. On mac it doesn't even show up in this case. Could not find a solution.




