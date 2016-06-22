'use strict';

angular.module('graph')
  .component('graph', {
    templateUrl: 'app/components/graph/graph.template.html',
    bindings: { message: '<' },
    controller: function($http, $scope, socket, Auth, NodeDataFactory, GraphingService){//, getNodeData) {

      this.network = NodeDataFactory.net;
      this.nodes = NodeDataFactory.restricted_node_list;
      this.force = NodeDataFactory.force;

      // In the future it may be better to rework it from
      // the ground up with purely AngularJS and SVG,
      // as is explored at
      // alexandros.resin.io/angular-d3-svg/
      //

      // Try to do the force-directed graph using AngularJSVG
      $scope.width = 600;
      $scope.height = 600;
      GraphingService.setHeightWidth($scope.width, $scope.height);

      $scope.nodes = GraphingService.graph_nodes_wr;
      $scope.links = GraphingService.graph_links_wr;

      $scope.currentNode = NodeDataFactory.node;

      // Alright, let's see what we need here:
      // Need all the nodes in the network, (check)
      // what nodes they're connected to, (also check)
      // whether they're active or not (check),
      // their names (checkamundo, if you're not into the whole brevity thing)

      $scope.onMouseClick = function(node){
        NodeDataFactory.setNode(node);
      }
      $scope.getNodeData = function(node_id){
        return NodeDataFactory.getNodeData(node_id);
      }

      $scope.blackOrWhite = function(node){
        console.log(node._id);
        console.log($scope.currentNode._id);
        return (node._id == $scope.currentNode._id ? "black" : "white");
      }
    }
});
