# battleship
Battleship game using JavaScript

How to run:

Open the index.html file in your browser to play BattleshipJS.


Rules:

  Ships:
    - Carrier is 5 spaces long
    - Battleship is 4 spaces long
    - Cruiser is 3 spaces long
    - Submarine is 3 spaces long
    - Destroyer is 2 spaces long

1. Player 1 picks their ship placement by clicking on the spaces which turn grey for the ship color. They can be placed horizontally or vertically. Then click submit. 
2. Player 2 does the same. Submit button goes away after the ships are setup.
3. Then the game begins. The turns go as follows:
  - Player clicks on a space on the opponent board.
    - If it's a hit: it turns red on their opponent board and they receive an alert telling them it's a hit. 
    - If it's a miss: it turns white on their opponent board and they receive an alert telling them it's a miss. 
    - If it's already been tried then an alert will tell them so and they can try again.
    - If the move causes a ship to sink they receive an alert telling them it sunk. 
    - If the move causes them to win the game they receive an alert telling them so. Then a new game is started.
  - Once a valid move has been chosen it switches to the next player's turn.
4. There is a New Game button that can be used at any time. 



