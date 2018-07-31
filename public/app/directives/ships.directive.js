(() => {
  angular
    .module('battleship')
    .directive('ships', [ships]);

  function ships() {
    // Usage:
    //     <ships></ships>
    // Creates: a section with all the ships needed to drag and drop onto the game board
    const directive = {
      templateUrl: 'app/directives/ships.directive.html',
      controller: shipsController,
      controllerAs: 'vm',
      scope: {
        data: '=',
      },
      bindToController: true,
      restrict: 'EA',
    };
    return directive;

    function shipsController() {
      const vm = this;
      angular.extend(vm, {
        rotate,
      });

      /**
       * @name vm.rotate
       * @description rotate the ship
       */
      function rotate() {

      }
    }
  }
})();
