'use strict';

angular.module('manager-display')
  .component('managerDisplay', {
    templateUrl: 'app/components/manager-display/manager-display.template.html',
    bindings: { message: '<' },
    controller: function($scope, $filter, $http, Auth) {
      this.message = 'World'
      $scope.managers = [];
      $scope.isCollapsed = true;
      $scope.nodeChoice = {name: ''};

      if(Auth.isAdmin()){
        $http.get('api/users/')
          .then(response => {
            $scope.managers = $filter('UsersToManagers')(response.data);
          }, err => {
            console.log('Error retrieving users');
            console.log(err.data);
          })
      }

      $scope.deleteManager = function(manager){

      }
      $scope.addNode = function(manager, node){

      }
      $scope.deleteNode = function(manager, node){

      }
      $scope.copyNode = function(node){
        $scope.nodeChoice = [];
        Object.assign($scope.nodeChoice, node);
      }
      $scope.updateNodeChoice = function(node){
        $scope.nodeChoice = {name: node.name, _id: node._id}
        console.log('function called');
      }
      $scope.clearNodeChoice = function(){
        $scope.nodeChoice = {name: ''};
        console.log('IT WAS THE SUMMER OF SIXTY NINE');
      }
    }
});
