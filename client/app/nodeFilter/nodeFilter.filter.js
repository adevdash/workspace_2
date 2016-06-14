'use strict';

angular.module('NodeFilter', [])
  .filter('nodeFilter', function () {
    return function (nodes, allowed_nodes) {
      console.log(allowed_nodes);
      console.log(node);
      if(allowed_nodes.indexOf(node._id) != -1){
        return node;
      }
    };
  });
