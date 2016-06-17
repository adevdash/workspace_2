'use strict';

angular.module('IdToNode', [])
  .filter('IdToNode', function () {
    return function (id, node_list) {
      //console.log(id);
      //console.log(node_list);
      return node_list.find(function(element, index, array){
        return element._id == id;
      }, id);
    };
  });
