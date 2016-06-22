'use strict';

angular.module('informationDisplay')
  .controller('RibControllerCtrl', function ($scope) {
    $scope.message = 'Hello';

    var setDefaults = function(){
      $scope.prefix = '';
      $scope.face_id = '';
      $scope.origin = '';
      $scope.cost = '';
      $scope.flags = ''; // Use dropdown or switch for flags (there's only two choices)
      $scope.expirationPeriod = '';
      $scope.flagDropdownStatus = {
        isOpen: false
      };
      $scope.flagSelection = 'Flags'
      $scope.ribFormHidden = true;
    }

    setDefaults();

    $scope.createRoute = function() {
      if ($scope.prefix && $scope.origin && $scope.cost) {
        if ($scope.flagSelection == 'Flags' || $scope.flagSelection == 'CHILD_INHERIT') {
          $scope.flagSelection = 1;
        }
        else {
          $scope.flagSelection = 2;
        }
      }
      setDefaults();
    }

  });
