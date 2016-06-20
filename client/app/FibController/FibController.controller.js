'use strict';

angular.module('informationDisplay')
  .controller('FibControllerCtrl', function ($scope) {
    $scope.message = 'Hello';
    var setDefaults = function() {
      $scope.newNextHopPath = "";
      $scope.newNextHopFaceId = "";
      $scope.newNextHopCost = "";
      $scope.newNextHopForm = true;
    }

    setDefaults();

    $scope.createNextHop = function(){
      if($scope.newNextHopPath && $scope.newNextHopFaceId && $scope.newNextHopCost){
        var cost = Number($scope.newNextHopCost);

        // http voodoo goes here

        setDefaults();
      }
    }
  });
