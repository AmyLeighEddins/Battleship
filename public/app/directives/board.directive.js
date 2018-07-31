(() => {
  angular
    .module('battleship')
    .directive('gameBoard', [gameBoard]);

  function gameBoard() {
    // Usage:
    //     <game-board data="double array" type="player or opponent"></bame-board>
    // Creates: a 10x10 board for the battleship game to display to player
    const directive = {
      templateUrl: 'app/directives/board.directive.html',
      controller: gameBoardController,
      controllerAs: 'vm',
      scope: {
        data: '=',
        type: '@',
      },
      bindToController: true,
      restrict: 'EA',
    };
    return directive;

    function gameBoardController() {
      const vm = this;     
      angular.extend(vm, {
        checkIfHit,
        // dropShip,
        setShip,
        // allowDrop,
      });

      /**
       * @name vm.checkIfHit
       * @description check if the click hits a ship
       */
      function checkIfHit() {

      }

      // function dropShip(ev, ship, index) {
      //   ev.preventDefault();
      //   for (let i = 0; i < ship; i++) {
      //     document.getElementById(`playerBoard${index - i * 10}`).style.backgroundColor = "grey";
      //   }
      // }

      function setShip(index) {
        document.getElementById(`playerBoard${index}`).style.backgroundColor = "grey";
      }

      // function allowDrop(ev, ship) {
      //   // if(vm.player) {
      //     // ev.preventDefault();
      //   // }
      // }
    }
  }
})();
