'use strict';

angular.module('graph')
  .component('graph', {
    templateUrl: 'app/components/graph/graph.template.html',
    bindings: { message: '<' },
    controller: function($http, $scope, socket, Auth, NodeDataFactory){//, getNodeData) {
      this.nodes = NodeDataFactory.node_list;
      this.network = NodeDataFactory.net;

      // Alright, let's see what we need here:
      // Need all the nodes in the network,
      // what nodes they're connected to,
      // whether they're active or not (?),
      // their names


      // Not quite sure why these are here
      //this.message = Auth.getCurrentUser().name;
      //var self = this;


      $scope.onMouseClick = function(node){
        NodeDataFactory.setNode(node);
      }
      $scope.getNodeData = function(node_id){
        return NodeDataFactory.getNodeData(node_id);
      }

    }
});
