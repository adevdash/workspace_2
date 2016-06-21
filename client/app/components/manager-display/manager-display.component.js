'use strict';

angular.module('manager-display')
  .component('managerDisplay', {
    templateUrl: 'app/components/manager-display/manager-display.template.html',
    bindings: { message: '<' },
    controller: function($scope, $filter, $http) {
      this.message = 'World'
      $scope.managers = [];



      $http.get('api/users/')
        .then(response => {
          $scope.managers = $filter('UsersToManagers')(response.data);
        }, err => {
          console.log('Error retrieving users');
          console.log(err.data);
        })

      $scope.deleteManager = function(manager){
        
      }
    }
});
