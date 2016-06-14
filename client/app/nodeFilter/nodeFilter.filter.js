'use strict';

angular.module('NodeFilter', [])
  .filter('nodeFilter', function () {
    return function (node, allowed_nodes) {
      if(allowed_nodes.indexOf(node._id) != -1){
        return node;
      }
    };
  });
