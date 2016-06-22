'use strict';

// Receives a list of nodes
// Outputs nodes formatted as JSON for use with d3's force-directed graph

angular.module('NodeFormat', ['IdToNode'])
  .filter('NodeFormat', function ($filter) {
    /*return function (nodes) {
      var result = {};
      result.nodes = nodes;
      result.links = [];

      var link = {};
      var k;
      for(var i = 0; i < nodes.length; i++){
        for(var j = 0; j < nodes[i].faces.length; j++){
          // Searches nodes array until it finds the element whose
          // id matches j, and returns that elements index
          k = nodes.findIndex(function comparator(element, index, array){
            return (this == element._id);
          }, nodes[i].faces[j]);

          // Prevents duplicate links
          if(k > i){
            link = {
              "source": k,
              "target": i,
              "value": 10
            }
            result.links.push(link);
          }
        }
      }

      return result;
    };*/
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

      console.log(topology.nodes);
      console.log('result.nodes');
      console.log(result.nodes);

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
