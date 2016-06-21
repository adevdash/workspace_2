'use strict';

angular.module('UsersToManagers', [])
  .filter('UsersToManagers', function () {
    return function (users) {
      console.log(users);
      var result = [];
      for(var i in users){
        console.log(users[i]);
        if(users[i].role == 'manager'){
          result.push(users[i]);
        }
      }
      return result;
    };
  });
