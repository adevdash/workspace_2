'use strict';

angular.module('RemainingNodes', ['NodeDataFactory'])
  .filter('RemainingNodes', function (NodeDataFactory) {
    return function (managerNodeIds) {
      var allNodes = NodeDataFactory.node_list.content;
      var remainingNodes = [];

      for(var i in allNodes){
        if(managerNodeIds.indexOf(allNodes[i]._id) == -1){
          remainingNodes.push(allNodes[i]);
        }
      }
      return remainingNodes;
    };
  });
