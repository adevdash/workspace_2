'use strict';

angular.module('manager-display')
  .component('managerDisplay', {
    templateUrl: 'app/components/manager-display/manager-display.template.html',
    bindings: { message: '<' },
    controller: function($scope, $filter, $http, Auth, NodeDataFactory) {
      this.message = 'World'
      $scope.managers = [];
      $scope.isCollapsed = true;
      $scope.nodeChoice = {name: ''};
      $scope.curNode = NodeDataFactory.node;

      if(Auth.isAdmin()){
        $http.get('api/users/')
          .then(response => {
            $scope.managers = $filter('UsersToManagers')(response.data);
          }, err => {
            console.log('Error retrieving users');
            console.log(err.data);
          })
      }


      $scope.addNode = function(manager, node){

      }
      $scope.deleteNode = function(manager, node){

      }


      $scope.updateNodeChoice = function(node){
        $scope.nodeChoice = {name: node.name, _id: node._id};
        $scope.setCurNode(node);
      }
      $scope.clearNodeChoice = function(){
        $scope.nodeChoice = {name: ''};
      }
      $scope.setCurNode = function(node){
        NodeDataFactory.setNode(node);
      }
    }
});
