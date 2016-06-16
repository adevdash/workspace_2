'use strict';

angular.module('NodeFilterModule', [])
  .filter('NodeFilter', function () {
    return function (nodes, allowed_nodes) {
      var result_nodes = [];
      console.log(allowed_nodes);
      for(var i in nodes){
        if(allowed_nodes.indexOf(nodes[i]._id) !== -1){
          result_nodes.push(nodes[i]);
        }
      }
      return result_nodes;
    };
  });
