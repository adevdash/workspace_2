'use strict';

angular.module('informationDisplay')
  .component('informationDisplay', {
    templateUrl: 'app/components/information-display/information-display.template.html',
    bindings: { message: '<' },
    controller: function ($http, $scope, socket, Auth, NodeDataFactory) {
      $scope.node = NodeDataFactory.node;
      $scope.nodes = NodeDataFactory.node_list;
      $scope.network = NodeDataFactory.net;

      $scope.isLoggedIn = Auth.isLoggedIn;

      this.isDummyNode = function(){
        return $scope.node.content.hasOwnProperty('karmaPolice')
      }
    }
  }
);
