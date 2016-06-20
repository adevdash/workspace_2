'use strict';

angular.module('informationDisplay')
  .controller('FaceControllerCtrl', function ($scope) {
    $scope.message = 'Hello';
    var setDefaults = function(){
      $scope.newFaceUri = "";
      $scope.newFaceId = "";
      $scope.newFacePermanent = true;
      $scope.newFaceForm = true;
    }

    setDefaults();

    $scope.createFace = function(){
      if($scope.newFaceUri && $scope.newFaceId) {
        // http request

        setDefaults();
      }
    }


  });
