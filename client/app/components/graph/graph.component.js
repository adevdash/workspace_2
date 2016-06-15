'use strict';

angular.module('graph')
  .component('graph', {
    templateUrl: 'app/components/graph/graph.template.html',
    bindings: { message: '<' },
    controller: function($http, $scope, socket, Auth, NodeDataFactory, NodeFilterFilter){//, getNodeData) {

      this.network = NodeDataFactory.net;
      this.nodes = NodeDataFactory.restricted_node_list;

      $scope.dimensions = {'width': 265, 'height': 160};
      var color = d3.scale.category20()
      $scope.options = {
        chart: {
          type: 'forceDirectedGraph',
          height: 600,
          width: (function(){ return nv.utils.windowSize().width*.6 -200 })(),
          margin:{top: 20, right: 20, bottom: 20, left: 20},
          //gravity: .00001,
          color: function(d){
            return color(d.group)
          },
          nodeExtras: function(node) {
            node && node
              .append("text")
              .attr("dx", 8)
              .attr("dy", ".35em")
              .text(function(d) { return d.name })
              .style('font-size', '10px');

            node.on("click", function(){
              
            });
          },
        }
      };

      /* Chart data */
      $scope.data = [];
      $http.get('assets/miserables.json')
        .then(response => {
          $scope.data = response.data;
        }, err => {
          console.log('Error reading data from JSON');
          console.log(err.data);
        });

      // Alright, let's see what we need here:
      // Need all the nodes in the network,
      // what nodes they're connected to,
      // whether they're active or not (?),
      // their names

      $scope.onMouseClick = function(node){
        NodeDataFactory.setNode(node);
      }
      $scope.getNodeData = function(node_id){
        return NodeDataFactory.getNodeData(node_id);
      }
    }
});
