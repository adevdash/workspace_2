'use strict';

// Receives a list of nodes
// Outputs nodes formatted as JSON for use with d3's force-directed graph

angular.module('NodeFormat', [])
  .filter('NodeFormat', function () {
    return function (nodes) {
      var result = {};
      result.nodes = nodes;
      result.links = [];

      var link = {};
      var k;
      for(var i = 0; i < nodes.length; i++){
        for(var j in nodes[i].faces){
          // i is an integer
          // j is a node id

          // Searches nodes array until it finds the element whose
          // id matches j, and returns that elements index
          k = nodes.findIndex(function comparator(element, index, array){
            return (this == element._id);
          }, j);

          // Prevents duplicate links
          if(k > i){
            link = {
              "source": k,
              "target": i,
              "value": 10
            }
            result.push(link);
          }
        }
      }

      return result;
    };
  });
