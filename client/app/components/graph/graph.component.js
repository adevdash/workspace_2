'use strict';

angular.module('graph')
  .component('graph', {
    templateUrl: 'app/components/graph/graph.template.html',
    bindings: { message: '<' },
    controller: function($http, $scope, socket, Auth, NodeDataFactory, NodeFilterFilter){//, getNodeData) {

      this.network = NodeDataFactory.net;
      this.nodes = NodeDataFactory.restricted_node_list;
      


      // Alright, let's see what we need here:
      // Need all the nodes in the network,
      // what nodes they're connected to,
      // whether they're active or not (?),
      // their names

      $scope.onMouseClick = function(node){
        console.log('Marker one');
        NodeDataFactory.setNode(node);
        console.log('Marker last');
      }
      $scope.getNodeData = function(node_id){
        return NodeDataFactory.getNodeData(node_id);
      }
    }
});
