(() => {
  angular
    .module('battleship')
    .directive('gameBoard', [gameBoard]);

  function gameBoard() {
    // Usage:
    //     <game-board data="double array"></bame-board>
    // Creates: a 10x10 board for the battleship game to display to player
    const directive = {
      templateUrl: 'app/directives/board.directive.html',
      controller: gameBoardController,
      controllerAs: 'vm',
      scope: {
        data: '=',
      },
      bindToController: true,
      restrict: 'EA',
    };
    return directive;

    function gameBoardController() {
      const vm = this;
      angular.extend(vm, {
        checkIfHit,
      });

      /**
       * @name vm.checkIfHit
       * @description check if the click hits a ship
       */
      function checkIfHit() {

      }
    }
  }
})();
