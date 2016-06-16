'use strict';

angular.module('graph')
  .component('graph', {
    templateUrl: 'app/components/graph/graph.template.html',
    bindings: { message: '<' },
    controller: function($http, $scope, socket, Auth, NodeDataFactory){//, getNodeData) {

      this.network = NodeDataFactory.net;
      this.nodes = NodeDataFactory.restricted_node_list;


      // In the future it may be better to rework it from
      // the ground up with purely AngularJS and SVG,
      // as is explored at
      // alexandros.resin.io/angular-d3-svg/
      //

      // Try to do the force-directed graph using AngularJSVG
      $scope.width = 500;
      $scope.height = 500;
      var color = d3.scale.category20()
      var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([$scope.width, $scope.height]);

      $http.get('assets/miserables.json').then(
      function(graph) {
        //console.log(graph);
        $scope.nodes = graph.data.nodes;
        $scope.links = graph.data.links;

        for(var i=0; i < $scope.links.length ; i++){
          $scope.links[i].strokeWidth = Math.round(Math.sqrt($scope.links[i].value))
        }

        for(var i=0; i < $scope.nodes.length ; i++){
          $scope.nodes[i].color = color($scope.nodes[i].group)
        }

        force
          .nodes($scope.nodes)
          .links($scope.links)
          .on("tick", function(){$scope.$apply()})
          .start();
      }, err => {
        console.log('Error retrieving JSON');
        console.log(err.data);
      });




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
