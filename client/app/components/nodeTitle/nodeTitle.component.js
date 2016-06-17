'use strict';

angular.module('nodeTitle')
  .component('nodeTitle', {
    templateUrl: 'app/components/nodeTitle/nodeTitle.template.html',
    bindings: { message: '<' },
    controller: function(NodeDataFactory, $scope) {
      $scope.node = NodeDataFactory.node;
      this.isDummyNode = function(){
        return $scope.node.content.hasOwnProperty('karmaPolice')
      }
    }
});
