'use strict';

angular.module('graph')
  .component('graph', {
    templateUrl: 'app/components/graph/graph.template.html',
    bindings: { message: '<' },
    controller: function($http, $scope, socket, Auth, NodeDataFactory, GraphingService){//, getNodeData) {

      $scope.currentNode = NodeDataFactory.node;


      $scope.width = 600;
      $scope.height = 600;
      GraphingService.setHeightWidth($scope.width, $scope.height);
      $scope.nodes = GraphingService.graph_nodes_wr;
      $scope.links = GraphingService.graph_links_wr;


      $scope.onMouseClick = function(node){
        NodeDataFactory.setNode(node);
      }
      $scope.getNodeData = function(node_id){
        return NodeDataFactory.getNodeData(node_id);
      }


      $scope.blackOrWhite = function(node){
        return (node._id == $scope.currentNode._id ? "black" : "white");
      }
    }
});
