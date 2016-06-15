'use strict';

angular.module('graph')
  .component('graph', {
    templateUrl: 'app/components/graph/graph.template.html',
    bindings: { message: '<' },
    controller: function($http, $scope, socket, Auth, NodeDataFactory, NodeFilterFilter){//, getNodeData) {

      this.network = NodeDataFactory.net;
      this.nodes = NodeDataFactory.restricted_node_list;





      // Note: this approach to visualizing data is
      // DISTINCTLY UN-ANGULAR. I'm just doing it 'cause
      // I'm a bum and I feel under pressure with regard
      // to time.
      //
      // In the future it may be better to rework it from
      // the ground up with purely AngularJS and SVG,
      // as is explored at
      // alexandros.resin.io/angular-d3-svg/
      //
      //
      /*var color = d3.scale.category20()
      $scope.options = {
        chart: {
          type: 'forceDirectedGraph',

          height: 400,
          width: (function(){ return nv.utils.windowSize().width*.6})(),
          margin:{top: -10, right: 20, bottom: 20, left: 20},

          color: function(d){
            return color(d.group)
          },

          radius: 10,
          charge: -120,
          gravity: 0.1, // attracts nodes to origin proportionally to their distance from it
          friction: 0.6, // note: the closer to 0, the more frictious it actually is
          linkDist: 30,
          linkStrength: 0.1,
          theta: 0.8, // concerned with treating groups of nodes as single nodes
          alpha: 0.1, // concerned with physical cooldown time

          nodeExtras: function(node) {
            node && node
              .append("text")
              .attr("dx", 8)
              .attr("dy", ".35em")
              .text(function(d) { return d.name })
              .style('font-size', '10px');

            node.on('click', function(cur_node){

            });
            node.on('mouseover', function(cur_node){
              console.log('moused over');
            })
          },
        }
      };

      /* Chart data *//*
      $scope.data = [];
      $http.get('assets/miserables.json')
        .then(response => {
          $scope.data = response.data;
        }, err => {
          console.log('Error reading data from JSON');
          console.log(err.data);
        });*/







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
