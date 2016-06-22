'use strict';

angular.module('GraphingService', ['NodeFormat'])
  .factory('GraphingService', function ($filter, $rootScope) {
    var formattedNodesWr = [];
    var graphLinksWr = [];
    var graphNodesWr = [];
    var widthWr = [], heightWr = [];
    var forceWr = [];


    // Puts nodes into JSON format
    function format_nodes(nodes){
      formattedNodesWr.content = $filter('NodeFormat')(nodes);
      graphLinksWr.content = formattedNodesWr.content.links;
      graphNodesWr.content = formattedNodesWr.content.nodes;

      var color = d3.scale.category20()
      var force = d3.layout.force()
        .size([widthWr.content, heightWr.content])
        .linkStrength(0.1)    // 0.1
        .friction(0.9)        // 0.9
        .linkDistance(100)     // 30
        .charge(-600)         // -160
        .gravity(0.1)         // 0.1
        .theta(0.8)           // 0.8
        .alpha(0.1);          // 0.1

      for(var i=0; i < graphLinksWr.content.length ; i++){
        graphLinksWr.content[i].strokeWidth = Math.round(Math.sqrt(graphLinksWr.content[i].value))
      }
      for(var i=0; i < graphNodesWr.content.length ; i++){
        graphNodesWr.content[i].color = color(i)
      }

      force
        .nodes(graphNodesWr.content)
        .links(graphLinksWr.content)
        .on("tick", function(){$rootScope.$apply()})
        .start();

      forceWr.content = force;
    }



    var serviceObj = {
      setHeightWidth: function(width, height){
        widthWr.content = width;
        heightWr.content = height;
      },
      formatNodes: function(nodes){
        format_nodes(nodes);
      },

      graph_nodes_wr: graphNodesWr,
      graph_links_wr: graphLinksWr,
      force_wr: forceWr
    };
    return serviceObj;
  });
