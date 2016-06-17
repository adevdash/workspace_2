'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, Auth, NodeDataFactory) {
      this.$http = $http;
      this.socket = socket;
      this.networks = [];
      this.ndf = NodeDataFactory;
      this.scope = $scope;
      this.isAdmin = Auth.isAdmin;

      $scope.radioModel = 'Left';
      $scope.infoRadioModel = 'Left';

      // Sets off the cascade of loading everything.
      // Do not mess with this.
      // Asynchronous calls are bad enough as it is.
      Auth.getCurrentUser(function(user){
        NodeDataFactory.extLoadNet(user);
      })

      // I don't really know what this does
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    // Deciding which components are displayed based on the radio button arrays
    matchesRadioButton(direction){
      return this.scope.radioModel == direction;
    }
    setInfoRadioButton(direction){
      this.scope.infoRadioModel = direction;
    }
    matchesInfoRadioButton(direction){
      return this.scope.infoRadioModel == direction;
    }

    $onInit() {

    }
  }

  angular.module('workspace2App')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
