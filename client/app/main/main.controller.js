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
      // After the user is authenticated (or not), NodeDataFactory (henceforth
      // referred to as NDF) conducts http requests for the entire list of nodes
      // and the topology. It sends the topology to the Graphing Service, which
      // then sends the graph thing to the... graph, thing. Anyway. (Y)

      // I don't really know what this does
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    // I don't know what this is for.
    $onInit() {

    }
  }

  angular.module('workspace2App')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
