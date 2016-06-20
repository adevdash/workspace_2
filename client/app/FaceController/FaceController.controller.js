'use strict';

angular.module('informationDisplay')
  .controller('FaceControllerCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.newFaceUri = "";
    $scope.newFaceId = "";
    $scope.newFacePermanent = false;

    $scope.newFaceForm = false;

    $scope.createFace = function(){

    }
  });
