'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, Auth, NodeDataFactory) {
      this.$http = $http;
      this.socket = socket;
      this.networks = [];
      this.ndf = NodeDataFactory;
      var self = this;


      Auth.getCurrentUser(function(user){
        NodeDataFactory.extLoadNet(user);
      })

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    $onInit() {
      /*this.auth.getCurrentUser(function(user){
        ndf.extLoadNet(user);
      });*/
      /*this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
          this.socket.syncUpdates('thing', this.awesomeThings);
        }, response => {

        });

      /*this.$http.get('/api/networks')
        .then(
          // Success callback
          function(response){
            this.networks = response.data;
            this.socket.syncUpdates('network', this.networks);
          }
        )*/
    }
  }

  angular.module('workspace2App')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
