'use strict';

angular.module('UsersToManagers', [])
  .filter('UsersToManagers', function () {
    return function (users) {
      var result = [];
      for(var i in users){
        if(users[i].role == 'manager'){
          result.push(users[i]);
        }
      }
      return result;
    };
  });
