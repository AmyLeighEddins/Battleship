(() => {
  angular
    .module('battleship')
    .controller('GameController', [GameController]);

  function GameController() {
    const vm = this;

    const playerBoard = Array(10);
    playerBoard.forEach((array, i) => {
      playerBoard[i] = Array(10);
      playerBoard[i].forEach((space, j) => {
        playerBoard[i][j] = 'false';
      });
    });

    angular.extend(vm, {
      playerBoard,
    });
  }
})();
