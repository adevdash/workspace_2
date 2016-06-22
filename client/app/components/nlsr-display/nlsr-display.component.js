'use strict';

angular.module('nlsr-display')
  .component('nlsrDisplay', {
    templateUrl: 'app/components/nlsr-display/nlsr-display.template.html',
    bindings: { message: '<' },
    controller: function($scope, NodeDataFactory) {
      this.message = 'World'

      $scope.curNode = NodeDataFactory.node;
      $scope.names = ['name1','name2','name3','name4'];

      $scope.isDummyNode = function(){
        return $scope.curNode.content.hasOwnProperty('karmaPolice')
      }
    }
});
