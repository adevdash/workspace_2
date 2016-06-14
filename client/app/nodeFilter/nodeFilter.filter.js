'use strict';

angular.module('NodeFilter', [])
  .filter('NodeFilter', function () {
    return function (nodes, allowed_nodes) {
      var result_nodes = [];
      for(var i in nodes){
        if(allowed_nodes.indexOf(i) !== -1){
          result_nodes.push(i);
        }
      }
      return result_nodes;
    };
  });
