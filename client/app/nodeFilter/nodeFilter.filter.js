'use strict';

// Input: list of all nodes, list of node id's in a particular network
// Returns: list of nodes in that network
angular.module('NodeFilterModule', [])
  .filter('NodeFilter', function () {
    return function (nodes, allowed_nodes) {
      var result_nodes = [];
      for(var i in nodes){
        if(allowed_nodes.indexOf(nodes[i]._id) !== -1){
          result_nodes.push(nodes[i]);
        }
      }
      return result_nodes;
    };
  });
