'use strict';

angular.module('graph')
  .component('graph', {
    templateUrl: 'app/components/graph/graph.template.html',
    bindings: { message: '<' },
    controller: function($http, $scope, socket, Auth, NodeDataFactory){//, getNodeData) {

      this.network = NodeDataFactory.net;
      this.nodes = NodeDataFactory.restricted_node_list;
      this.formattedNodes = NodeDataFactory.formatted_nodes;

      // In the future it may be better to rework it from
      // the ground up with purely AngularJS and SVG,
      // as is explored at
      // alexandros.resin.io/angular-d3-svg/
      //

      // Try to do the force-directed graph using AngularJSVG
      $scope.width = 600;
      $scope.height = 600;
      var color = d3.scale.category20()
      var force = d3.layout.force()
        .size([$scope.width, $scope.height])
        .linkStrength(0.1)
        .friction(0.9)
        .linkDistance(45)
        .charge(-120)
        .gravity(0.1)
        .theta(0.8)
        .alpha(0.1);

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
      // Need all the nodes in the network, (check)
      // what nodes they're connected to, (also check)
      // whether they're active or not (?),
      // their names (checkamundo, if you're not into the whole brevity thing)

      $scope.onMouseClick = function(node){
        NodeDataFactory.setNode(node);
      }
      $scope.getNodeData = function(node_id){
        return NodeDataFactory.getNodeData(node_id);
      }
    }
});
