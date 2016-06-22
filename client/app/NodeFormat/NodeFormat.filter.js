'use strict';

// Receives a list of nodes
// Outputs nodes formatted as JSON for use with d3's force-directed graph

angular.module('NodeFormat', ['IdToNode'])
  .filter('NodeFormat', function ($filter) {
    return function(topology){
      // topology is an object with two arrays:
      // - nodes contains a list of node_ids
      // - links contains a list of links with the sources and targets specified
      //   by the node names
      var result = {};
      result.nodes = [];
      result.links = [];

      for(var i in topology.nodes){
        result.nodes[i] = $filter('IdToNode')(topology.nodes[i]);
      }


      // Not entirely sure on this part
      for(var i in topology.links){
        var j = result.nodes.findIndex(function comparator(element, index, array){
          return this == element.name;
        }, topology.links[i].source);
        var k = result.nodes.findIndex(function comparator(element, index, array){
          return this == element.name;
        }, topology.links[i].target);

        result.links.push({"source": j, "target": k, "value": 10});
      }

      return result;
    }
  });
