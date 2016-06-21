'use strict';

angular.module('IdToNode', ['NodeDataFactory'])
  .filter('IdToNode', function (NodeDataFactory) {
    return function (id, node_list) {
      //console.log(id);
      //console.log(node_list);
      var node_list = NodeDataFactory.node_list;

      return node_list.content.find(function(element, index, array){
        return element._id == id;
      }, id);
    };
  });
